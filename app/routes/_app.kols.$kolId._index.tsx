import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
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
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandYoutube } from "@tabler/icons-react";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { buildSocialProfileUrl } from "~/lib/social-links";
import styles from "./_app.kols.$kolId._index.module.css";
import { addKolToFavoriteFolder, clearKolFavorites, getKol, listFavoriteFolders, replaceKolFavoriteFolders, type InsertionOrder, type KolCollabRecord, type OrderKolCollaboration, type OrderPerformanceItem, type PlatformMetrics } from "~/lib/mock-api.server";

function formatNumber(value: number | undefined): string {
  return (value ?? 0).toLocaleString("zh-TW");
}
function formatCurrency(value: number | undefined): string {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}

function isKolFavorited(kol: { isFavorite?: boolean; favoriteFolder?: string | null; favoriteFolders?: string[] }): boolean {
  return Boolean(kol.isFavorite || kol.favoriteFolder || (kol.favoriteFolders ?? []).length > 0);
}

function getFavoriteSelection(kol: { favoriteFolder?: string | null; favoriteFolders?: string[] }): string[] {
  return Array.from(new Set(kol.favoriteFolders ?? (kol.favoriteFolder ? [kol.favoriteFolder] : [])));
}

function SparkLine({ points }: { points: { date: string; price: number }[] }) {
  const width = 620;
  const height = 220;
  const padLeft = 80;
  const padRight = 20;
  const padTop = 16;
  const padBottom = 32;

  const { mapped, yTicks } = useMemo(() => {
    if (points.length === 0) return { mapped: [], yTicks: [] };
    const prices = points.map((p) => p.price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const range = Math.max(1, max - min);

    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const mapped = points.map((p, index) => {
      const x = padLeft + (index * chartW) / Math.max(1, points.length - 1);
      const y = padTop + chartH - ((p.price - min) / range) * chartH;
      return { ...p, x, y };
    });

    // Generate 4-5 nice Y-axis ticks
    const tickCount = 4;
    const step = range / tickCount;
    const magnitude = Math.pow(10, Math.floor(Math.log10(step)));
    const niceStep = Math.ceil(step / magnitude) * magnitude;
    const tickMin = Math.floor(min / niceStep) * niceStep;
    const yTicks: number[] = [];
    for (let v = tickMin; v <= max + niceStep; v += niceStep) {
      yTicks.push(v);
      if (yTicks.length > tickCount + 1) break;
    }

    return { mapped, yTicks };
  }, [points]);

  const chartH = height - padTop - padBottom;
  const prices = points.map((p) => p.price);
  const max = points.length > 0 ? Math.max(...prices) : 1;
  const min = points.length > 0 ? Math.min(...prices) : 0;
  const range = Math.max(1, max - min);

  const path = mapped.map((p) => `${p.x},${p.y}`).join(" ");

  if (points.length === 0) {
    return <Text size="sm" c="dimmed" ta="center" py="xl">尚無價格資料</Text>;
  }

  return (
    <Box>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="price trend">
        {/* Y-axis ticks and grid lines */}
        {yTicks.map((v) => {
          const y = padTop + chartH - ((v - min) / range) * chartH;
          if (y < padTop - 4 || y > height - padBottom + 4) return null;
          return (
            <g key={v}>
              <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#e2e8f0" strokeDasharray="4 3" />
              <text x={padLeft - 6} y={y + 4} textAnchor="end" fontSize={11} fill="#94a3b8">
                {v >= 10000 ? `${(v / 1000).toFixed(0)}k` : v.toLocaleString("zh-TW")}
              </text>
            </g>
          );
        })}
        {/* Axes */}
        <line x1={padLeft} y1={height - padBottom} x2={width - padRight} y2={height - padBottom} stroke="#cbd5e1" />
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={height - padBottom} stroke="#cbd5e1" />
        {/* Line and dots */}
        {mapped.length > 1 && (
          <polyline fill="none" stroke="#228be6" strokeWidth="2.5" points={path} />
        )}
        {mapped.map((p) => (
          <g key={p.date}>
            <circle cx={p.x} cy={p.y} r="4" fill="#228be6" />
            <title>NT$ {p.price.toLocaleString("zh-TW")}</title>
          </g>
        ))}
        {/* X-axis date labels */}
        {mapped.map((p) => (
          <text key={`lbl-${p.date}`} x={p.x} y={height - padBottom + 18} textAnchor="middle" fontSize={11} fill="#94a3b8">
            {p.date.slice(0, 7)}
          </text>
        ))}
      </svg>
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

  const btnClassName = (active: boolean): string =>
    active ? `${styles.modalBtn} ${styles.modalBtnActive}` : styles.modalBtn;

  const tabBtnClassName = (active: boolean): string =>
    active ? `${styles.modalTabBtn} ${styles.modalTabBtnActive}` : styles.modalTabBtn;

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
            <button className={tabBtnClassName(groupBy === "kol")} onClick={() => setGroupBy("kol")}>依 KOL 分組</button>
            <button className={tabBtnClassName(groupBy === "placement")} onClick={() => setGroupBy("placement")}>依版位分組</button>
          </Group>
          <Group gap={8} wrap="wrap">
            {groupBy === "kol" && kolNames.length > 1 && (
              <>
                <button className={btnClassName(activeKol === null)} onClick={() => setActiveKol(null)}>
                  全部{activeKol === null ? " ✓" : ""}
                </button>
                {kolNames.map(name => (
                  <button key={name} className={btnClassName(activeKol === name)} onClick={() => setActiveKol(name)}>
                    {name}{activeKol === name ? " ✓" : ""}
                  </button>
                ))}
              </>
            )}
            {groupBy === "placement" && PLATFORMS.map(p => (
              <button key={p} className={btnClassName(activePlatform === p)} onClick={() => setActivePlatform(p)}>
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
                        <Table.Td rowSpan={1} className={styles.kolNameCell}>{kol.name}</Table.Td>
                        <Table.Td colSpan={9}><Text size="sm" c="dimmed">尚無成效資料</Text></Table.Td>
                      </Table.Tr>
                    );
                  }
                  return items.map((item, idx) => {
                    const m = item.metrics;
                    return (
                      <Table.Tr key={`${kol.id}-${item.id}`}>
                        {idx === 0 && (
                          <Table.Td rowSpan={items.length} className={styles.kolNameCell}>{kol.name}</Table.Td>
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

function PlatformTabSelector({
  platforms,
  selected,
  onSelect,
}: {
  platforms: string[];
  selected: string;
  onSelect: (p: string) => void;
}) {
  const platformBtnClassName = (active: boolean): string =>
    active ? `${styles.platformBtn} ${styles.platformBtnActive}` : styles.platformBtn;

  return (
    <div>
      {platforms.map((p) => (
        <button key={p} type="button" className={platformBtnClassName(selected === p)} onClick={() => onSelect(p)}>
          {p}
        </button>
      ))}
    </div>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const kolId = params.kolId ?? "";
  const formData = await request.formData();
  if (formData.get("intent") === "add_favorite") {
    const folder = String(formData.get("folder") ?? "").trim() || undefined;
    await addKolToFavoriteFolder(kolId, folder ?? "");
  }
  if (formData.get("intent") === "update_favorite_folders") {
    const selectedFolders = String(formData.get("selectedFolders") ?? "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);
    if (selectedFolders.length > 0) {
      await replaceKolFavoriteFolders(kolId, selectedFolders);
    } else {
      await addKolToFavoriteFolder(kolId, "");
    }
  }
  if (formData.get("intent") === "remove_favorite") {
    await clearKolFavorites(kolId);
  }
  return json({ success: true });
}

function withTimeout<T,>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const kol = await withTimeout(getKol(params.kolId ?? ""), null).catch(() => null);
  if (!kol) throw new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "projects";
  const limit = Math.max(5, Number(url.searchParams.get("limit") ?? "5"));
  const folders = await withTimeout(listFavoriteFolders(), [] as string[]).catch(() => [] as string[]);

  return json({ kol, tab, limit, folders });
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
          <Box className={styles.contractText}>
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
  const { kol, tab, limit, folders } = useLoaderData<typeof loader>();
  const [contactOpened, setContactOpened] = useState(false);
  const [perfModalOpened, setPerfModalOpened] = useState(false);
  const [folderPickerOpen, setFolderPickerOpen] = useState(false);
  const [folderSelection, setFolderSelection] = useState<string[]>(() => getFavoriteSelection(kol));
  const [contractOpened, setContractOpened] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>(kol.platforms?.[0] ?? kol.platform ?? "Instagram");
  const ioFetcher = useFetcher<InsertionOrder | null>();
  const favoriteFetcher = useFetcher<{ success?: boolean }>();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (favoriteFetcher.state === "idle" && favoriteFetcher.data?.success) {
      revalidator.revalidate();
    }
  }, [favoriteFetcher.state, favoriteFetcher.data, revalidator]);

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
  const primaryInstagramUrl = buildSocialProfileUrl("instagram", kol.socialLinks?.instagram ?? kol.instagramHandle);
  const youtubeUrl = buildSocialProfileUrl("youtube", kol.socialLinks?.youtube);
  const tiktokUrl = buildSocialProfileUrl("tiktok", kol.socialLinks?.tiktok);
  const facebookUrl = buildSocialProfileUrl("facebook", kol.socialLinks?.facebook);
  const socialRows: { icon: React.ReactNode; label: string; detail: string; url: string | null }[] = [
    { icon: <IconBrandInstagram size={16} />, label: "Instagram", detail: `${formatNumber(kol.social?.instagram ?? kol.followers)} 粉絲`, url: primaryInstagramUrl },
    { icon: <IconBrandYoutube size={16} />, label: "YouTube", detail: `${formatNumber(kol.social?.youtube ?? kol.youtubeSubscribers)} 訂閱`, url: youtubeUrl },
    { icon: <IconBrandTiktok size={16} />, label: "TikTok", detail: `${formatNumber(kol.social?.tiktok)} 粉絲`, url: tiktokUrl },
    { icon: <IconBrandFacebook size={16} />, label: "Facebook", detail: `${formatNumber(kol.social?.facebook)} 粉絲`, url: facebookUrl },
  ].filter((row) => {
    if (row.label === "Instagram") return (kol.social?.instagram ?? kol.followers ?? 0) > 0 || Boolean(primaryInstagramUrl);
    if (row.label === "YouTube") return (kol.social?.youtube ?? kol.youtubeSubscribers ?? 0) > 0 || Boolean(youtubeUrl);
    if (row.label === "TikTok") return (kol.social?.tiktok ?? 0) > 0 || Boolean(tiktokUrl);
    if (row.label === "Facebook") return (kol.social?.facebook ?? 0) > 0 || Boolean(facebookUrl);
    return false;
  });
  const activePlatformMetrics = kol.platformMetrics?.audienceMetrics?.[selectedPlatform];
  const activeRealFollowerRatio =
    activePlatformMetrics?.realFollowerRatio
    ?? (selectedPlatform === "Instagram" ? kol.realFollowerRatio : undefined);
  const pendingFavoriteIntent = favoriteFetcher.state !== "idle" ? String(favoriteFetcher.formData?.get("intent") ?? "") : "";
  const optimisticFavorited = pendingFavoriteIntent === "remove_favorite" ? false
    : pendingFavoriteIntent === "update_favorite_folders" ? true
    : isKolFavorited(kol);
  const favoriteActionLabel = optimisticFavorited ? "管理收藏" : "加入收藏";


  const tabClassName = (value: string): string =>
    tab === value ? `${styles.tab} ${styles.tabActive}` : styles.tab;

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
          <Card withBorder p="lg" radius="lg">
            {/* Identity section */}
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Group align="flex-start" wrap="nowrap">
                <Avatar src={kol.avatarUrl} size={96} radius={999} />
                <Stack gap={6}>
                  <Title order={2}>{kol.displayName}</Title>
                  <Group gap={6} mt={4}>
                    {(kol.tags ?? kol.categories).map((tag) => (
                      <Badge key={tag} variant="light" radius="xl">{tag}</Badge>
                    ))}
                  </Group>
                </Stack>
              </Group>
              <Stack gap={6} align="flex-end">
                {socialRows.map((row) =>
                  row.url ? (
                    <a key={row.label} href={row.url} target="_blank" rel="noreferrer" className="social-link" title={`前往 ${row.label}`}>
                      {row.icon}
                      <Text size="sm" span>{row.label} {row.detail}</Text>
                    </a>
                  ) : (
                    <Group key={row.label} gap={4}>
                      {row.icon}
                      <Text size="sm">{row.label} {row.detail}</Text>
                    </Group>
                  )
                )}
              </Stack>
            </Group>

            <Divider my="lg" />

            {/* Stats section */}
            <Grid gutter="md">
              <Grid.Col span={{ base: 6, md: 2 }}>
                <Text size="xs" c="dimmed">平均評分</Text>
                <Text fw={700} size="lg" mt={4}>⭐ {avgRating.toFixed(1)}</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 2 }}>
                <Text size="xs" c="dimmed">合作次數</Text>
                <Text fw={700} size="lg" mt={4}>{collabCount} 次</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 2 }}>
                <Text size="xs" c="dimmed">平均價格</Text>
                <Text fw={700} size="lg" mt={4}>{formatCurrency(avgPrice)}</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 3 }}>
                <Text size="xs" c="dimmed">合作產業</Text>
                <Group gap={6} mt={4}>
                  {(kol.industryDistribution ?? [kol.industry ?? "未分類"]).map((industry) => (
                    <Badge key={industry} color="gray" variant="light">{industry}</Badge>
                  ))}
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 3 }}>
                <Text size="xs" c="dimmed">請款方式</Text>
                <Group mt={4}>
                  <Badge variant="dot">{kol.paymentMethod || "未設定"}</Badge>
                </Group>
              </Grid.Col>
            </Grid>

            <Divider my="lg" />

            {/* Action section */}
            <Group justify="space-between">
              <Group gap="xs">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setFolderSelection(getFavoriteSelection(kol));
                    setFolderPickerOpen(true);
                    const d = document.getElementById("folder-picker-dialog") as HTMLDialogElement;
                    d?.showModal();
                  }}
                  styles={{
                    root: {
                      color: optimisticFavorited ? "var(--mantine-color-red-filled)" : undefined,
                    },
                  }}
                >
                  {optimisticFavorited ? "♥" : "♡"} {favoriteActionLabel}
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => setContactOpened(true)}
                >
                  📞 查看聯絡方式
                </Button>
              </Group>
              <Button type="button" variant="filled" size="sm" component={Link} to={`/kols/${kol.id}/edit`}>
                ✏️ 編輯
              </Button>
            </Group>
          </Card>

          {/* Introduction section */}
          {kol.introduction && (
            <Card withBorder mt="md">
              <Title order={4} mb="sm">人選介紹</Title>
              <Text size="sm" className={styles.introText}>
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
            <div className={styles.tabNav}>
              <Link to={`/kols/${kol.id}?tab=projects&limit=${limit}`} className={tabClassName("projects")}>合作案件</Link>
              <Link to={`/kols/${kol.id}?tab=price&limit=${limit}`} className={tabClassName("price")}>價格趨勢</Link>
              <Link to={`/kols/${kol.id}?tab=performance&limit=${limit}`} className={tabClassName("performance")}>受眾數據與指標</Link>
            </div>

            {/* Projects tab */}
            {tab === "projects" && (
              <Stack gap="md">
                {visibleHistory.map((item: KolCollabRecord, idx) => (
                  <div key={item.id} className={styles.timelineRow}>
                    <div className={styles.timelineMarkerCol}>
                      <div className={styles.timelineMarker}>
                        {idx + 1}
                      </div>
                      {idx < visibleHistory.length - 1 && (
                        <div className={styles.timelineConnector} />
                      )}
                    </div>
                    <Card withBorder className={styles.timelineCard}>
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
                              className={styles.detailLink}
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
                      className={styles.loadMore}
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
                  platforms={kol.platforms && kol.platforms.length > 0 ? kol.platforms : ["Instagram"]}
                  selected={selectedPlatform}
                  onSelect={(p) => setSelectedPlatform(p)}
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
                  platforms={kol.platforms && kol.platforms.length > 0 ? kol.platforms : ["Instagram"]}
                  selected={selectedPlatform}
                  onSelect={(p) => setSelectedPlatform(p)}
                />
                {(() => {
                  const pm = kol.platformMetrics?.audienceMetrics?.[selectedPlatform];
                  // Per-platform avgRating and avgEngagementRate from platformMetrics
                  const platformAvgRating = kol.platformMetrics?.avgRating?.[selectedPlatform];
                  const platformAvgEngRate = kol.platformMetrics?.avgEngagementRate?.[selectedPlatform];
                  const engRate = platformAvgEngRate ?? pm?.engagementRate ?? (selectedPlatform === "Instagram" ? (stats.engagementRate ?? kol.engagementRate ?? 0) : 0);
                  const expRate = pm?.exposureRate ?? (selectedPlatform === "Instagram" ? (kol.exposureRate ?? 0) : 0);
                  const realFollowerRatio = pm?.realFollowerRatio ?? (selectedPlatform === "Instagram" ? kol.realFollowerRatio : undefined);
                  const audienceGender = pm?.audienceGender ?? (selectedPlatform === "Instagram" ? kol.audienceGender : undefined);
                  const audienceAge = pm?.audienceAge ?? (selectedPlatform === "Instagram" ? kol.audienceAge : undefined);
                  const displayRating = platformAvgRating ?? (selectedPlatform === "Instagram" ? (kol.rating ?? avgRating) : undefined);
                  return (
                    <>
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder h="100%">
                            <Text c="dimmed" size="sm">平均觸及 ({selectedPlatform})</Text>
                            <Title order={3}>{formatNumber(stats.averageReach)}</Title>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder h="100%">
                            <Text c="dimmed" size="sm">曝光率 (%) — {selectedPlatform}</Text>
                            <Title order={3}>{expRate.toFixed(1)}%</Title>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder h="100%">
                            <Text c="dimmed" size="sm">平均互動率 — {selectedPlatform}</Text>
                            <Title order={3}>{engRate.toFixed(1)}%</Title>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder h="100%">
                            <Text c="dimmed" size="sm">平均評分 — {selectedPlatform}</Text>
                            <Title order={3}>{displayRating != null ? `⭐ ${displayRating.toFixed(1)}` : "-"}</Title>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder h="100%">
                            <Text c="dimmed" size="sm">真粉比例 — {selectedPlatform}</Text>
                            <Title order={3}>{realFollowerRatio != null ? `${realFollowerRatio.toFixed(1)}%` : "-"}</Title>
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
              <Text>👥 真粉比例: {activeRealFollowerRatio != null ? `${activeRealFollowerRatio.toFixed(1)}%` : "-"}</Text>
              <Divider my={4} />
              <Text size="sm" fw={600} c="dimmed">平台互動率</Text>
              {(kol.platforms && kol.platforms.length > 0
                ? kol.platforms
                : [kol.platform]
              ).filter(Boolean).map((p) => {
                const rate = kol.platformMetrics?.avgEngagementRate?.[p]
                  ?? (p === "Instagram" ? kol.engagementRate : undefined);
                return (
                  <Text key={p} size="sm">
                    {p}: {rate != null ? `${rate.toFixed(1)}%` : "-"}
                  </Text>
                );
              })}
              <Divider my={4} />
              <Text size="sm" fw={600} c="dimmed">平台評分</Text>
              {(kol.platforms && kol.platforms.length > 0
                ? kol.platforms
                : [kol.platform]
              ).filter(Boolean).map((p) => {
                const rating = kol.platformMetrics?.avgRating?.[p]
                  ?? (p === "Instagram" ? kol.rating : undefined);
                return (
                  <Text key={p} size="sm">
                    {p}: {rating != null ? `⭐ ${rating.toFixed(1)}` : "-"}
                  </Text>
                );
              })}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* ── Folder Picker Dialog ── */}
      <dialog
        id="folder-picker-dialog"
        className={styles.dialog}
        onClose={() => setFolderPickerOpen(false)}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>選擇收藏資料夾</Title>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={() => { setFolderPickerOpen(false); (document.getElementById("folder-picker-dialog") as HTMLDialogElement)?.close(); }}
          >
            ✕
          </button>
        </Group>
        <favoriteFetcher.Form
          method="post"
          onSubmit={() => { setFolderPickerOpen(false); (document.getElementById("folder-picker-dialog") as HTMLDialogElement)?.close(); }}
        >
          <input type="hidden" name="selectedFolders" value={folderSelection.join(",")} />
          <Stack gap="md">
            <Text size="sm" c="dimmed">可多選資料夾；若暫時不分類，也可以直接儲存為收藏。</Text>
            <Stack gap="xs" className={styles.folderList}>
              {folders.length === 0 ? (
                <Text size="sm" c="dimmed">尚未建立任何資料夾，儲存後會先加入收藏但不分類。</Text>
              ) : (
                folders.map((folderName) => (
                  <Checkbox
                    key={folderName}
                    label={folderName}
                    checked={folderSelection.includes(folderName)}
                    onChange={(event) => {
                      setFolderSelection((prev) =>
                        event.currentTarget.checked
                          ? [...prev, folderName]
                          : prev.filter((name) => name !== folderName),
                      );
                    }}
                  />
                ))
              )}
            </Stack>
            <Group justify="flex-end">
              {isKolFavorited(kol) ? (
                <button
                  type="submit"
                  name="intent"
                  value="remove_favorite"
                  className={`${styles.dialogBtn} ${styles.dialogBtnRed}`}
                >
                  取消收藏
                </button>
              ) : null}
              <button
                type="button"
                className={`${styles.dialogBtn} ${styles.dialogBtnDefault}`}
                onClick={() => { setFolderPickerOpen(false); setFolderSelection(getFavoriteSelection(kol)); (document.getElementById("folder-picker-dialog") as HTMLDialogElement)?.close(); }}
              >
                取消
              </button>
              <button
                type="submit"
                name="intent"
                value="update_favorite_folders"
                className={`${styles.dialogBtn} ${styles.dialogBtnPrimary}`}
              >
                儲存收藏
              </button>
            </Group>
          </Stack>
        </favoriteFetcher.Form>
      </dialog>
    </Stack>
  );
}
