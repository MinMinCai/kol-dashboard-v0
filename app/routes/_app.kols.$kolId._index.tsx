import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { getKol, type KolCollabRecord } from "~/lib/mock-api";

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

export async function loader({ params, request }: LoaderFunctionArgs) {
  const kol = await getKol(params.kolId ?? "");
  if (!kol) throw new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "projects";
  const limit = Math.max(5, Number(url.searchParams.get("limit") ?? "5"));

  return json({ kol, tab, limit });
}

export default function KolDetailPage() {
  const { kol, tab, limit } = useLoaderData<typeof loader>();
  const [contactOpened, setContactOpened] = useState(false);

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
                  <Text>Instagram: @{kol.instagramHandle ?? "-"} | {formatNumber(kol.social?.instagram ?? kol.followers)} 粉絲</Text>
                  <Text>YouTube: {formatNumber(kol.social?.youtube ?? kol.youtubeSubscribers)} 訂閱</Text>
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
                <Group gap={6}>
                  {(kol.industryDistribution ?? [kol.industry ?? "未分類"]).map((industry) => (
                    <Badge key={industry} color="gray" variant="light">{industry}</Badge>
                  ))}
                </Group>
              </Stack>
            </Group>
            <Group mt="md">
              <Link to={kol.isFavorite ? "/favorites" : `/kols/${kol.id}`} style={{ padding: "6px 14px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", textDecoration: "none", fontSize: 14 }}>
                {kol.isFavorite ? "❤️ 已收藏" : "💗 加入收藏"}
              </Link>
              <Button
                type="button"
                variant="default"
                size="xs"
                onClick={() => setContactOpened(true)}
              >
                📞 查看聯絡方式
              </Button>
              <Button type="button" variant="default" size="xs" onClick={handleDownloadReport}>
                📊 下載 KOL 報告
              </Button>
            </Group>
          </Card>

          <Modal
            id="kol-contact-modal"
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
                          <Link to={item.orderId ? `/insertion-orders/${item.orderId}` : "#"}>查看詳細成效 →</Link>
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
                <Text c="dimmed">X 軸: 日期 / Y 軸: 價格 (NT$)</Text>
                <Card withBorder>
                  <SparkLine points={kol.priceTrend ?? []} />
                </Card>
              </Stack>
            )}

            {/* Performance tab */}
            {tab === "performance" && (
              <Stack>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}><Card withBorder><Text c="dimmed" size="sm">平均觸及</Text><Title order={3}>{formatNumber(stats.averageReach)}</Title></Card></Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}><Card withBorder><Text c="dimmed" size="sm">平均互動率</Text><Title order={3}>{(stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1)}%</Title></Card></Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}><Card withBorder><Text c="dimmed" size="sm">平均觀看</Text><Title order={3}>{formatNumber(stats.averageViews)}</Title></Card></Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}><Card withBorder><Text c="dimmed" size="sm">轉換率</Text><Title order={3}>{(stats.conversionRate ?? 0).toFixed(1)}%</Title></Card></Grid.Col>
                </Grid>

                <Card withBorder mt="md">
                  <Text fw={600} mb="sm">平台成效比較</Text>
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
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
