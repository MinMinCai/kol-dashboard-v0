import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Progress,
  ScrollArea,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { getKol, updateKol, type InsertionOrder, type KolCollabRecord, type OrderKolCollaboration, type OrderPerformanceItem, type PlatformMetrics } from "~/lib/mock-api.server";

function formatNumber(value: number | undefined): string {
  return (value ?? 0).toLocaleString("zh-TW");
}
function formatCurrency(value: number | undefined): string {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}

function SparkLine({ points }: { points: { date: string; price: number }[] }) {
  const width = 620;
  const height = 220;
  const pad = 24;

  const mapped = useMemo(() => {
    if (points.length === 0) return [];
    const max = Math.max(...points.map((p) => p.price));
    const min = Math.min(...points.map((p) => p.price));
    const range = Math.max(1, max - min);
    return points.map((p, index) => {
      const x = pad + (index * (width - pad * 2)) / Math.max(1, points.length - 1);
      const y = height - pad - ((p.price - min) / range) * (height - pad * 2);
      return { ...p, x, y };
    });
  }, [points]);

  const path = mapped.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Box>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="price trend">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#cbd5e1" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#cbd5e1" />
        <polyline fill="none" stroke="#228be6" strokeWidth="3" points={path} />
        {mapped.map((p) => (
          <circle key={p.date} cx={p.x} cy={p.y} r="4" fill="#228be6" />
        ))}
      </svg>
      <Group justify="space-between">
        {points.map((p) => (
          <Text key={p.date} size="xs" c="dimmed">{p.date}</Text>
        ))}
      </Group>
    </Box>
  );
}

// ─── Platform types ────────────────────────────────────────────────────────────
const PLATFORMS = ["IG 貼文", "IG 限動", "IG Reels", "YouTube"] as const;
type PlatformKey = typeof PLATFORMS[number];

function normalizePlatform(title: string): PlatformKey | null {
  if (/reels/i.test(title)) return "IG Reels";
  if (/限動|stories?/i.test(title)) return "IG 限動";
  if (/yt|youtube|影片/i.test(title)) return "YouTube";
  if (/ig|貼文|圖文/i.test(title)) return "IG 貼文";
  return null;
}

function fmt(v: number | undefined) {
  return v != null ? v.toLocaleString("zh-TW") : "-";
}

function PerformanceOverviewModal({ opened, onClose, order }: {
  opened: boolean;
  onClose: () => void;
  order: InsertionOrder | null;
}) {
  const [groupBy, setGroupBy] = useState<"kol" | "placement">("kol");
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("IG 貼文");
  const [activeKol, setActiveKol] = useState<string | null>(null);

  const collabs: OrderKolCollaboration[] = order?.collaborations ?? [];
  const kolNames = collabs.map(k => k.name).filter(Boolean);
  const filteredCollabs = activeKol ? collabs.filter(k => k.name === activeKol) : collabs;

  const handleDownloadCSV = () => {
    const rows: string[][] = [];
    if (groupBy === "kol") {
      rows.push(["KOL", "版位", "上線日期", "觸及人數", "觀看數", "按讚數", "留言數", "分享數", "收藏數", "互動率"]);
      for (const kol of collabs) {
        for (const item of (kol.performanceItems ?? [])) {
          const m = item.metrics;
          rows.push([kol.name, item.title, kol.executionDate ?? "", fmt(m?.reach), fmt(m?.impressions), fmt(m?.likes), fmt(m?.comments), fmt(m?.shares), fmt(m?.saves), m?.engagementRate != null ? `${m.engagementRate}%` : "-"]);
        }
      }
    } else {
      rows.push(["版位", "KOL", "上線日期", "觸及人數", "觀看數", "按讚數", "留言數", "分享數", "收藏數", "互動率"]);
      for (const platform of PLATFORMS) {
        for (const kol of collabs) {
          for (const item of (kol.performanceItems ?? [])) {
            if (normalizePlatform(item.title) !== platform) continue;
            const m = item.metrics;
            rows.push([platform, kol.name, kol.executionDate ?? "", fmt(m?.reach), fmt(m?.impressions), fmt(m?.likes), fmt(m?.comments), fmt(m?.shares), fmt(m?.saves), m?.engagementRate != null ? `${m.engagementRate}%` : "-"]);
          }
        }
      }
    }
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `performance-${order?.id ?? "export"}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid var(--mantine-color-default-border)",
    background: active ? "var(--mantine-color-blue-filled)" : "transparent",
    color: active ? "#fff" : "var(--mantine-color-text)",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: active ? 600 : 400,
  });

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 16px",
    borderRadius: 6,
    border: "1px solid var(--mantine-color-default-border)",
    background: active ? "var(--mantine-color-default-hover)" : "transparent",
    color: "var(--mantine-color-text)",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: active ? 600 : 400,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Stack gap={2}>
          <Text fw={700} size="lg">成效數據總覽</Text>
          <Text size="sm" c="dimmed">{order?.title ?? order?.projectName ?? order?.orderNo ?? ""}</Text>
        </Stack>
      }
      size="90%"
      styles={{ body: { padding: 0 } }}
    >
      <Stack gap={0} p="md">
        {/* Controls row */}
        <Group justify="space-between" mb="md" wrap="wrap" gap="xs">
          <Group gap={8}>
            <button style={tabBtnStyle(groupBy === "kol")} onClick={() => setGroupBy("kol")}>依 KOL 分組</button>
            <button style={tabBtnStyle(groupBy === "placement")} onClick={() => setGroupBy("placement")}>依版位分組</button>
          </Group>
          <Group gap={8} wrap="wrap">
            {groupBy === "kol" && kolNames.length > 1 && (
              <>
                <button style={btnStyle(activeKol === null)} onClick={() => setActiveKol(null)}>
                  全部{activeKol === null ? " ✓" : ""}
                </button>
                {kolNames.map(name => (
                  <button key={name} style={btnStyle(activeKol === name)} onClick={() => setActiveKol(name)}>
                    {name}{activeKol === name ? " ✓" : ""}
                  </button>
                ))}
              </>
            )}
            {groupBy === "placement" && PLATFORMS.map(p => (
              <button key={p} style={btnStyle(activePlatform === p)} onClick={() => setActivePlatform(p)}>
                {p}{activePlatform === p ? " ✓" : ""}
              </button>
            ))}
            <Button size="xs" variant="filled" onClick={handleDownloadCSV}>⬇ 下載 CSV</Button>
          </Group>
        </Group>

        {!order && <Text c="dimmed" ta="center" py="xl">載入中...</Text>}

        {order && groupBy === "kol" && (
          <ScrollArea>
            <Table withColumnBorders withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>KOL</Table.Th>
                  <Table.Th>版位</Table.Th>
                  <Table.Th>上線日期</Table.Th>
                  <Table.Th>觸及人數</Table.Th>
                  <Table.Th>觀看數</Table.Th>
                  <Table.Th>按讚數</Table.Th>
                  <Table.Th>留言數</Table.Th>
                  <Table.Th>分享數</Table.Th>
                  <Table.Th>收藏數</Table.Th>
                  <Table.Th>互動率</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredCollabs.flatMap((kol) => {
                  const items: OrderPerformanceItem[] = kol.performanceItems ?? [];
                  if (items.length === 0) {
                    return (
                      <Table.Tr key={kol.id}>
                        <Table.Td rowSpan={1} style={{ verticalAlign: "middle", fontWeight: 600, background: "var(--mantine-color-violet-light)" }}>{kol.name}</Table.Td>
                        <Table.Td colSpan={9}><Text size="sm" c="dimmed">尚無成效資料</Text></Table.Td>
                      </Table.Tr>
                    );
                  }
                  return items.map((item, idx) => {
                    const m = item.metrics;
                    return (
                      <Table.Tr key={`${kol.id}-${item.id}`}>
                        {idx === 0 && (
                          <Table.Td rowSpan={items.length} style={{ verticalAlign: "middle", fontWeight: 600, background: "var(--mantine-color-violet-light)" }}>{kol.name}</Table.Td>
                        )}
                        <Table.Td>{item.title}</Table.Td>
                        <Table.Td>{kol.executionDate ?? kol.uploadDate ?? "-"}</Table.Td>
                        <Table.Td>{fmt(m?.reach)}</Table.Td>
                        <Table.Td>{fmt(m?.impressions)}</Table.Td>
                        <Table.Td>{fmt(m?.likes)}</Table.Td>
                        <Table.Td>{fmt(m?.comments)}</Table.Td>
                        <Table.Td>{fmt(m?.shares)}</Table.Td>
                        <Table.Td>{fmt(m?.saves)}</Table.Td>
                        <Table.Td>{m?.engagementRate != null ? `${m.engagementRate}%` : "-"}</Table.Td>
                      </Table.Tr>
                    );
                  });
                })}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        )}

        {order && groupBy === "placement" && (
          <Stack gap="lg">
            {PLATFORMS.map(platform => {
              const rows = filteredCollabs.flatMap(kol =>
                (kol.performanceItems ?? [])
                  .filter(item => normalizePlatform(item.title) === platform)
                  .map(item => ({ kol, item }))
              );
              if (rows.length === 0) return null;
              return (
                <Box key={platform}>
                  <Text fw={700} mb="xs">{platform}</Text>
                  <ScrollArea>
                    <Table withColumnBorders withRowBorders>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>KOL</Table.Th>
                          <Table.Th>平台</Table.Th>
                          <Table.Th>上線日期</Table.Th>
                          <Table.Th>觸及人數</Table.Th>
                          <Table.Th>觀看數</Table.Th>
                          <Table.Th>按讚數</Table.Th>
                          <Table.Th>留言數</Table.Th>
                          <Table.Th>分享數</Table.Th>
                          <Table.Th>收藏數</Table.Th>
                          <Table.Th>互動率</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {rows.map(({ kol, item }) => {
                          const m = item.metrics;
                          return (
                            <Table.Tr key={`${kol.id}-${item.id}`}>
                              <Table.Td fw={600}>{kol.name}</Table.Td>
                              <Table.Td>{item.title}</Table.Td>
                              <Table.Td>{kol.executionDate ?? kol.uploadDate ?? "-"}</Table.Td>
                              <Table.Td>{fmt(m?.reach)}</Table.Td>
                              <Table.Td>{fmt(m?.impressions)}</Table.Td>
                              <Table.Td>{fmt(m?.likes)}</Table.Td>
                              <Table.Td>{fmt(m?.comments)}</Table.Td>
                              <Table.Td>{fmt(m?.shares)}</Table.Td>
                              <Table.Td>{fmt(m?.saves)}</Table.Td>
                              <Table.Td>{m?.engagementRate != null ? `${m.engagementRate}%` : "-"}</Table.Td>
                            </Table.Tr>
                          );
                        })}
                      </Table.Tbody>
                    </Table>
                  </ScrollArea>
                </Box>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Modal>
  );
}

const DETAIL_PLATFORMS = ["Instagram", "YouTube", "TikTok"] as const;

function PlatformTabSelector({
  kol,
  selected,
  onSelect,
}: {
  kol: { social?: { instagram?: number; youtube?: number; tiktok?: number } };
  selected: string;
  onSelect: (p: string) => void;
}) {
  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "5px 12px",
    borderRadius: 6,
    border: "1px solid var(--mantine-color-default-border)",
    background: active ? "var(--mantine-color-blue-filled)" : "transparent",
    color: active ? "#fff" : "var(--mantine-color-text)",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    marginRight: 6,
  });

  return (
    <div>
      {DETAIL_PLATFORMS.map((p) => (
        <button key={p} type="button" style={btnStyle(selected === p)} onClick={() => onSelect(p)}>
          {p}
        </button>
      ))}
    </div>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const kolId = params.kolId ?? "";
  const formData = await request.formData();
  if (formData.get("intent") === "toggle_favorite") {
    const isFavorite = formData.get("isFavorite") === "true";
    await updateKol(kolId, { isFavorite: !isFavorite });
  }
  return json({ success: true });
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const kol = await getKol(params.kolId ?? "");
  if (!kol) throw new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "projects";
  const limit = Math.max(5, Number(url.searchParams.get("limit") ?? "5"));

  return json({ kol, tab, limit });
}

// ─── Contract Generator Modal ─────────────────────────────────────────────────
function ContractModal({ opened, onClose, kol }: {
  opened: boolean;
  onClose: () => void;
  kol: { displayName: string; instagramHandle?: string; contact?: { phone?: string; email?: string }; paymentMethod?: string; averagePrice?: number };
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [contractDate, setContractDate] = useState(today);
  const [services, setServices] = useState("IG 貼文 x1、IG 限動 x3");
  const [price, setPrice] = useState(String(kol.averagePrice ?? 0));
  const [duration, setDuration] = useState("30");
  const [extraClause, setExtraClause] = useState("");

  const contractText = `
公版合作合約

合約日期：${contractDate}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

甲方（委託方）：[品牌/公司名稱]
乙方（創作者）：${kol.displayName}
  IG 帳號：@${kol.instagramHandle ?? "-"}
  聯絡電話：${kol.contact?.phone ?? "-"}
  Email：${kol.contact?.email ?? "-"}
  請款方式：${kol.paymentMethod ?? "未設定"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
一、合作內容

乙方同意依照甲方要求執行以下服務：
${services}

二、合作期間

本合約自簽署日起 ${duration} 天內完成交付，逾期須提前通知甲方。

三、合作費用

甲方同意支付乙方費用 NT$ ${Number(price).toLocaleString("zh-TW")} 元整。
付款方式：依雙方約定之請款方式（${kol.paymentMethod ?? "未設定"}）於驗收完成後 30 日內支付。

四、內容授權

乙方授權甲方於合作期間內，在品牌官方渠道非獨家使用本次合作內容，包含但不限於官方社群媒體、官網及廣告投放。

五、保密條款

雙方同意對本次合作之商業條件及未公開資訊負保密義務，未經對方書面同意，不得向第三方揭露。

六、附加條款

${extraClause || "（無）"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

甲方簽署：______________________  日期：__________

乙方簽署：______________________  日期：__________
`.trim();

  const handleDownload = () => {
    const blob = new Blob([contractText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `公版合約_${kol.displayName}_${contractDate}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal opened={opened} onClose={onClose} title={<Text fw={700} size="lg">📄 生成公版合約</Text>} size="xl">
      <Stack gap="md">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput label="合約日期" type="date" value={contractDate} onChange={(e) => setContractDate(e.currentTarget.value)} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput label="合作費用 (NT$)" type="number" value={price} onChange={(e) => setPrice(e.currentTarget.value)} />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput label="合作服務項目" value={services} onChange={(e) => setServices(e.currentTarget.value)} placeholder="例如：IG 貼文 x1、IG 限動 x3" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput label="交付天數" type="number" value={duration} onChange={(e) => setDuration(e.currentTarget.value)} rightSection={<Text size="xs" c="dimmed">天</Text>} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea label="附加條款（選填）" value={extraClause} onChange={(e) => setExtraClause(e.currentTarget.value)} placeholder="如：禁止同類型競品合作 60 天..." minRows={2} />
          </Grid.Col>
        </Grid>

        <Divider label="合約預覽" />

        <ScrollArea h={320}>
          <Box style={{ fontFamily: "monospace", fontSize: 13, whiteSpace: "pre-wrap", padding: "12px", background: "var(--mantine-color-default-hover)", borderRadius: 4 }}>
            {contractText}
          </Box>
        </ScrollArea>

        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>關閉</Button>
          <Button onClick={handleDownload}>⬇ 下載合約 (.txt)</Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default function KolDetailPage() {
  const { kol, tab, limit } = useLoaderData<typeof loader>();
  const [contactOpened, setContactOpened] = useState(false);
  const [perfModalOpened, setPerfModalOpened] = useState(false);
  const [contractOpened, setContractOpened] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Instagram");
  const ioFetcher = useFetcher<InsertionOrder | null>();

  const openPerfModal = (orderId: string) => {
    setPerfModalOpened(true);
    ioFetcher.load(`/api/insertion-orders/${orderId}`);
  };

  const history = kol.collaborationHistory ?? [];
  const visibleHistory = history.slice(0, limit);
  const hasMore = limit < history.length;

  const avgPrice =
    kol.averagePrice ??
    (history.length > 0
      ? Math.round(history.reduce((sum, row) => sum + row.price, 0) / history.length)
      : 0);
  const avgRating =
    kol.rating ??
    (history.length > 0
      ? history.reduce((sum, row) => sum + row.rating, 0) / history.length
      : 0);
  const collabCount = kol.collaborations ?? history.length;
  const stats = kol.performanceStats ?? {};
  const platformPerf = stats.platformPerformance ?? {};

  const handleDownloadReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      kol: {
        id: kol.id,
        displayName: kol.displayName,
        instagramHandle: kol.instagramHandle ?? null,
        industry: kol.industry ?? null,
        followers: kol.social?.instagram ?? kol.followers ?? null,
        youtubeSubscribers: kol.social?.youtube ?? kol.youtubeSubscribers ?? null,
        tags: kol.tags ?? kol.categories ?? [],
      },
      summary: {
        avgPrice,
        avgRating,
        collaborations: collabCount,
      },
      recentCollaborations: visibleHistory,
      performanceStats: stats,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KOL-Report-${kol.displayName}-${kol.id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const tabStyle = (value: string): React.CSSProperties => ({
    padding: "8px 16px",
    borderBottom: tab === value ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
    color: tab === value ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    textDecoration: "none",
    fontWeight: tab === value ? 600 : 400,
    fontSize: 14,
    display: "inline-block",
  });

  return (
    <Stack gap="md">
      <Group gap={8}>
        <Link to="/kols">KOL 管理</Link>
        <Text c="dimmed">&gt;</Text>
        <Text fw={600}>{kol.displayName}</Text>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 9 }}>
          {/* Profile card */}
          <Card withBorder p="lg">
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Group align="flex-start" wrap="nowrap">
                <Avatar src={kol.avatarUrl} size={96} radius={999} />
                <Stack gap={6}>
                  <Title order={2}>{kol.displayName}</Title>
                  <Text>
                    {kol.socialLinks?.instagram || kol.instagramHandle ? (
                      <a href={kol.socialLinks?.instagram ?? `https://instagram.com/${kol.instagramHandle}`} target="_blank" rel="noreferrer">
                        📷 Instagram @{kol.instagramHandle ?? "-"}
                      </a>
                    ) : (
                      <>📷 Instagram @{kol.instagramHandle ?? "-"}</>
                    )}
                    {" "}| {formatNumber(kol.social?.instagram ?? kol.followers)} 粉絲
                  </Text>
                  <Text>
                    {kol.socialLinks?.youtube ? (
                      <a href={kol.socialLinks.youtube} target="_blank" rel="noreferrer">
                        ▶ YouTube {formatNumber(kol.social?.youtube ?? kol.youtubeSubscribers)} 訂閱 ↗
                      </a>
                    ) : (
                      <>▶ YouTube {formatNumber(kol.social?.youtube ?? kol.youtubeSubscribers)} 訂閱</>
                    )}
                  </Text>
                  {(kol.social?.tiktok ?? 0) > 0 && (
                    <Text>
                      {kol.socialLinks?.tiktok ? (
                        <a href={kol.socialLinks.tiktok} target="_blank" rel="noreferrer">
                          ♪ TikTok {formatNumber(kol.social?.tiktok)} 粉絲 ↗
                        </a>
                      ) : (
                        <>♪ TikTok {formatNumber(kol.social?.tiktok)} 粉絲</>
                      )}
                    </Text>
                  )}
                  <Group gap={6}>
                    {(kol.tags ?? kol.categories).map((tag) => (
                      <Badge key={tag} variant="light" radius="xl">{tag}</Badge>
                    ))}
                  </Group>
                </Stack>
              </Group>
              <Stack align="flex-end" gap={6}>
                <Text>⭐ {avgRating.toFixed(1)} ({collabCount} 次合作)</Text>
                <Text>平均價格: {formatCurrency(avgPrice)}</Text>
                <Text>請款方式: <Badge variant="dot">{kol.paymentMethod || "未設定"}</Badge></Text>
                <Group gap={6}>
                  {(kol.industryDistribution ?? [kol.industry ?? "未分類"]).map((industry) => (
                    <Badge key={industry} color="gray" variant="light">{industry}</Badge>
                  ))}
                </Group>
              </Stack>
            </Group>
            <Group mt="md">
              <Form method="post">
                <input type="hidden" name="intent" value="toggle_favorite" />
                <input type="hidden" name="isFavorite" value={String(kol.isFavorite)} />
                <button type="submit" style={{ padding: "6px 14px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", background: "transparent", cursor: "pointer", fontSize: 14, color: "var(--mantine-color-text)" }}>
                  {kol.isFavorite ? "❤️ 取消收藏" : "🤍 加入收藏"}
                </button>
              </Form>
              <Button
                type="button"
                variant="default"
                size="xs"
                onClick={() => setContactOpened(true)}
              >
                📞 查看聯絡方式
              </Button>
              <Button type="button" variant="link" size="xs" component={Link} to={`/kols/${kol.id}/edit`}>
                ✏️ 編輯
              </Button>
              <Button type="button" variant="default" size="xs" onClick={handleDownloadReport}>
                📊 下載 KOL 報告
              </Button>
              <Button type="button" variant="default" size="xs" onClick={() => setContractOpened(true)}>
                📄 生成公版合約
              </Button>
            </Group>
          </Card>

          {/* Introduction section */}
          {kol.introduction && (
            <Card withBorder mt="md">
              <Title order={4} mb="sm">人選介紹 (用於提案撰寫)</Title>
              <Text size="sm" style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                {kol.introduction}
              </Text>
            </Card>
          )}

          <PerformanceOverviewModal
            opened={perfModalOpened}
            onClose={() => setPerfModalOpened(false)}
            order={ioFetcher.data ?? null}
          />

          <ContractModal
            opened={contractOpened}
            onClose={() => setContractOpened(false)}
            kol={kol}
          />

          <Modal
            opened={contactOpened}
            onClose={() => setContactOpened(false)}
            title="聯絡方式"
          >
            <Stack gap="sm">
              <Text>
                <Text span fw={600}>
                  電話：
                </Text>{" "}
                {kol.contact?.phone || "尚未提供"}
              </Text>
              <Text>
                <Text span fw={600}>
                  Email：
                </Text>{" "}
                {kol.contact?.email || "尚未提供"}
              </Text>
              <Button type="button" variant="light" onClick={() => setContactOpened(false)}>
                關閉
              </Button>
            </Stack>
          </Modal>

          {/* ── Tabs: URL-driven ── */}
          <Card withBorder mt="md">
            <div style={{ borderBottom: "1px solid var(--mantine-color-default-border)", marginBottom: 16 }}>
              <Link to={`/kols/${kol.id}?tab=projects&limit=${limit}`} style={tabStyle("projects")}>合作案件</Link>
              <Link to={`/kols/${kol.id}?tab=price&limit=${limit}`} style={tabStyle("price")}>價格趨勢</Link>
              <Link to={`/kols/${kol.id}?tab=performance&limit=${limit}`} style={tabStyle("performance")}>成效統計</Link>
            </div>

            {/* Projects tab */}
            {tab === "projects" && (
              <Stack gap="md">
                {visibleHistory.map((item: KolCollabRecord, idx) => (
                  <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--mantine-color-blue-filled)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 600, flexShrink: 0 }}>
                        {idx + 1}
                      </div>
                      {idx < visibleHistory.length - 1 && (
                        <div style={{ width: 2, flex: 1, minHeight: 16, background: "var(--mantine-color-default-border)", marginTop: 4 }} />
                      )}
                    </div>
                    <Card withBorder style={{ flex: 1, marginBottom: 8 }}>
                      <Stack gap={8}>
                        <Group justify="space-between" align="flex-start">
                          <Stack gap={2}>
                            <Text fw={600}>
                              📋 <Link to={item.orderId ? `/insertion-orders/${item.orderId}` : "#"}>{item.projectTitle}</Link>
                            </Text>
                            <Text size="sm" c="dimmed">{item.clientName} | 產業: {item.industry}</Text>
                            {item.date && (
                              <Text size="xs" c="dimmed">🗓 {item.date}</Text>
                            )}
                          </Stack>
                          <Stack align="flex-end" gap={2}>
                            <Text fw={600}>{formatCurrency(item.price)}</Text>
                            <Text size="sm">⭐ {item.rating.toFixed(1)}</Text>
                          </Stack>
                        </Group>
                        <Text size="sm">服務項目: {item.services}</Text>
                        <Group gap="lg">
                          <Text size="sm">IG 貼文: 👁️ {formatNumber(item.metrics?.postViews)} | 💗 {formatNumber(item.metrics?.postLikes)} | 💬 {formatNumber(item.metrics?.postComments)}</Text>
                          <Text size="sm">IG 限動: 👁️ {formatNumber(item.metrics?.storyViews)} | 💗 {formatNumber(item.metrics?.storyLikes)}</Text>
                        </Group>
                        <Group justify="flex-end">
                          {item.orderId ? (
                            <button
                              type="button"
                              onClick={() => openPerfModal(item.orderId!)}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--mantine-color-blue-filled)", fontSize: 14, padding: 0 }}
                            >
                              查看詳細成效 →
                            </button>
                          ) : (
                            <Text size="sm" c="dimmed">查看詳細成效 →</Text>
                          )}
                        </Group>
                      </Stack>
                    </Card>
                  </div>
                ))}

                {hasMore && (
                  <Group justify="center" mt="md">
                    <Link
                      to={`/kols/${kol.id}?tab=projects&limit=${limit + 3}`}
                      style={{
                        padding: "8px 20px",
                        border: "1px solid var(--mantine-color-default-border)",
                        borderRadius: 4,
                        textDecoration: "none",
                        fontSize: 14,
                        color: "var(--mantine-color-text)",
                      }}
                    >
                      載入更多
                    </Link>
                  </Group>
                )}
              </Stack>
            )}

            {/* Price tab */}
            {tab === "price" && (
              <Stack>
                <PlatformTabSelector
                  kol={kol}
                  selected={selectedPlatform}
                  onSelect={setSelectedPlatform}
                />
                <Text c="dimmed" size="sm">X 軸: 日期 / Y 軸: 價格 (NT$)｜平台: {selectedPlatform}</Text>
                <Card withBorder>
                  <SparkLine
                    points={
                      kol.platformMetrics?.priceTrend?.[selectedPlatform] ??
                      (selectedPlatform === "Instagram" ? (kol.priceTrend ?? []) : [])
                    }
                  />
                </Card>
              </Stack>
            )}

            {/* Performance tab */}
            {tab === "performance" && (
              <Stack>
                <PlatformTabSelector
                  kol={kol}
                  selected={selectedPlatform}
                  onSelect={setSelectedPlatform}
                />
                {(() => {
                  const pm = kol.platformMetrics?.audienceMetrics?.[selectedPlatform];
                  const engRate = pm?.engagementRate ?? (selectedPlatform === "Instagram" ? (stats.engagementRate ?? kol.engagementRate ?? 0) : 0);
                  const expRate = pm?.exposureRate ?? (selectedPlatform === "Instagram" ? (kol.exposureRate ?? 0) : 0);
                  const audienceGender = pm?.audienceGender ?? (selectedPlatform === "Instagram" ? kol.audienceGender : undefined);
                  const audienceAge = pm?.audienceAge ?? (selectedPlatform === "Instagram" ? kol.audienceAge : undefined);
                  return (
                    <>
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder style={{ height: "100%" }}>
                            <Text c="dimmed" size="sm">平均觸及 ({selectedPlatform})</Text>
                            <Title order={3}>{formatNumber(stats.averageReach)}</Title>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder style={{ height: "100%" }}>
                            <Text c="dimmed" size="sm">曝光率 (%) — {selectedPlatform}</Text>
                            <Title order={3}>{expRate.toFixed(1)}%</Title>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder style={{ height: "100%" }}>
                            <Text c="dimmed" size="sm">平均互動率 — {selectedPlatform}</Text>
                            <Title order={3}>{engRate.toFixed(1)}%</Title>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder style={{ height: "100%" }}>
                            <Text c="dimmed" size="sm">轉換率</Text>
                            <Title order={3}>{(stats.conversionRate ?? 0).toFixed(1)}%</Title>
                          </Card>
                        </Grid.Col>
                      </Grid>

                      <Grid mt="sm">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder>
                            <Text fw={600} mb="sm">受眾性別比 — {selectedPlatform}</Text>
                            {audienceGender ? (
                              <>
                                <Group justify="space-between">
                                  <Text size="sm">男 {audienceGender.male || 0}%</Text>
                                  <Text size="sm">女 {audienceGender.female || 0}%</Text>
                                </Group>
                                <Progress.Root size="xl" mt={4}>
                                  <Progress.Section value={audienceGender.male || 0} color="blue" />
                                  <Progress.Section value={audienceGender.female || 0} color="pink" />
                                </Progress.Root>
                              </>
                            ) : (
                              <Text size="sm" c="dimmed">尚無資料</Text>
                            )}
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder>
                            <Text fw={600} mb="sm">受眾年齡層 — {selectedPlatform}</Text>
                            <Title order={3}>{audienceAge || "未知"}</Title>
                          </Card>
                        </Grid.Col>
                      </Grid>

                      <Card withBorder mt="md">
                        <Text fw={600} mb="sm">平台成效比較 (總覽)</Text>
                        <Stack>
                          <Box>
                            <Group justify="space-between"><Text size="sm">Instagram</Text><Text size="sm">{formatNumber(platformPerf.instagram)}</Text></Group>
                            <Progress value={Math.min(100, (platformPerf.instagram ?? 0) / 1200)} />
                          </Box>
                          <Box>
                            <Group justify="space-between"><Text size="sm">YouTube</Text><Text size="sm">{formatNumber(platformPerf.youtube)}</Text></Group>
                            <Progress value={Math.min(100, (platformPerf.youtube ?? 0) / 1200)} color="orange" />
                          </Box>
                          <Box>
                            <Group justify="space-between"><Text size="sm">TikTok</Text><Text size="sm">{formatNumber(platformPerf.tiktok)}</Text></Group>
                            <Progress value={Math.min(100, (platformPerf.tiktok ?? 0) / 1200)} color="grape" />
                          </Box>
                        </Stack>
                      </Card>
                    </>
                  );
                })()}
              </Stack>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 3 }}>
          <Card withBorder>
            <Title order={4} mb="sm">快速統計</Title>
            <Stack gap={8}>
              <Text>📊 合作次數: {collabCount} 次</Text>
              <Text>💰 平均價格: {formatCurrency(avgPrice)}</Text>
              <Text>🏢 合作產業: {(kol.industryDistribution ?? []).join(" ") || (kol.industry ?? "-")}</Text>
              <Text>👁️ 平均觸及: {formatNumber(stats.averageReach)}</Text>
              <Text>💗 平均互動率: {(stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1)}%</Text>
              <Text>📢 曝光率: {(kol.exposureRate || 0).toFixed(1)}%</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
