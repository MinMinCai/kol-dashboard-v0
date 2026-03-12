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
  Rating,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BarChart } from "@mantine/charts";
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ClientOnly } from "~/components/ClientOnly";
import {
  getInsertionOrder,
  addIOReview,
  updateIOPerformance,
  type OrderKolCollaboration,
} from "~/lib/mock-api";

function n(value: number | undefined): string {
  // Use a stable locale to prevent hydration mismatch
  return (value ?? 0).toLocaleString("zh-TW");
}
function currency(value: number | undefined): string {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}

// ── KolCollabCard: 獨立子元件，用 useState 管理分頁，避開 Mantine Tabs 的 SSR ID 生成問題 ──
const TAB_LABELS: Record<string, string> = {
  actions: "操作工具",
  performance: "成效明細",
  reviews: "合作評價",
};

function KolCollabCard({
  kol,
  onOpenUpload,
  onOpenPerf,
  onOpenReview,
}: {
  kol: OrderKolCollaboration;
  onOpenUpload: (k: { id: string; name: string }) => void;
  onOpenPerf: (k: { id: string; name: string }) => void;
  onOpenReview: (k: { id: string; name: string }) => void;
}) {
  const [activeTab, setActiveTab] = useState<"actions" | "performance" | "reviews">("actions");

  return (
    <Card withBorder p="md" radius="md">
      <Stack gap="md">
        <Group justify="space-between">
          <Group>
            <Avatar src={kol.avatarUrl} radius="xl" size={50} />
            <div>
              <Text fw={700} size="lg">{kol.name}</Text>
              <Text size="xs" c="dimmed">
                {kol.services} | NT$ {(kol.price ?? 0).toLocaleString("zh-TW")}
              </Text>
            </div>
          </Group>
          <Group gap="xl">
            <Stack gap={0} align="center">
              <Text size="xs" c="dimmed">觸及</Text>
              <Text fw={700} size="xl">{(kol.totalReach ?? 0).toLocaleString("zh-TW")}</Text>
            </Stack>
            <Stack gap={0} align="center">
              <Text size="xs" c="dimmed">互動</Text>
              <Text fw={700} size="xl">{(kol.totalEngagement ?? 0).toLocaleString("zh-TW")}</Text>
            </Stack>
            <Stack gap={0} align="center">
              <Text size="xs" c="dimmed">評價</Text>
              <Group gap={4}>
                <Text fw={700} size="xl">{(kol.rating ?? 0).toFixed(1)}</Text>
                <Text color="yellow">⭐</Text>
              </Group>
            </Stack>
          </Group>
        </Group>

        <Divider />

        {/* 自製分頁列：純 HTML button + useState，無 Mantine Tabs ID 生成 */}
        <Box style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}>
          <Group gap={0}>
            {(["actions", "performance", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderBottom: activeTab === tab
                    ? "2px solid var(--mantine-color-blue-filled)"
                    : "2px solid transparent",
                  background: "none",
                  cursor: "pointer",
                  color: activeTab === tab
                    ? "var(--mantine-color-blue-filled)"
                    : "var(--mantine-color-dimmed)",
                  fontWeight: activeTab === tab ? 600 : 400,
                  fontSize: "var(--mantine-font-size-sm)",
                  fontFamily: "inherit",
                  transition: "color 0.1s, border-color 0.1s",
                }}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </Group>
        </Box>

        {/* 操作工具 */}
        {activeTab === "actions" && (
          <Group pt="xs">
            <Button
              type="button"
              size="xs"
              variant="light"
              onClick={() => onOpenUpload(kol)}
            >
              📸 上傳貼文
            </Button>
            <Button
              type="button"
              size="xs"
              variant="light"
              onClick={() => onOpenPerf(kol)}
            >
              📊 新增成效
            </Button>
            <Button
              type="button"
              size="xs"
              variant="light"
              color="yellow"
              onClick={() => onOpenReview(kol)}
            >
              ✍️ 留下評價
            </Button>
            <Button
              type="button"
              size="xs"
              variant="default"
              component={Link}
              to={`/kols/${kol.kolId}`}
            >
              👤 查看 KOL 檔案
            </Button>
          </Group>
        )}

        {/* 成效明細 */}
        {activeTab === "performance" && (
          <Box pt="xs">
            {(kol.performanceItems ?? []).length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                {kol.performanceItems?.map((perf) => (
                  <Card key={perf.id} withBorder p="sm" radius="md">
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" fw={700}>{perf.title}</Text>
                      <Badge size="xs">已追蹤</Badge>
                    </Group>
                    <SimpleGrid cols={4}>
                      <Stack gap={0}>
                        <Text size="xs" c="dimmed">曝光</Text>
                        <Text size="sm" fw={600}>
                          {(perf.metrics?.impressions ?? 0).toLocaleString("zh-TW")}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text size="xs" c="dimmed">觸及</Text>
                        <Text size="sm" fw={600}>
                          {(perf.metrics?.reach ?? 0).toLocaleString("zh-TW")}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text size="xs" c="dimmed">互動次數</Text>
                        <Text size="sm" fw={600}>
                          {(perf.metrics?.likes ?? 0).toLocaleString("zh-TW")}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text size="xs" c="dimmed">互動率</Text>
                        <Text size="sm" fw={600}>
                          {(perf.metrics?.engagementRate ?? 0).toFixed(1)}%
                        </Text>
                      </Stack>
                    </SimpleGrid>
                  </Card>
                ))}
              </SimpleGrid>
            ) : (
              <Text size="sm" c="dimmed" p="md" ta="center">尚無成效數據</Text>
            )}
          </Box>
        )}

        {/* 合作評價 */}
        {activeTab === "reviews" && (
          <Box pt="xs">
            {(kol.reviews ?? []).length > 0 ? (
              <Stack gap="xs">
                {kol.reviews?.map((rv) => (
                  <Card key={rv.id} withBorder p="sm" radius="md">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <Avatar src={rv.avatarUrl} size="sm" />
                        <Text size="sm" fw={600}>{rv.author}</Text>
                        <Text size="xs" c="dimmed">{rv.date}</Text>
                        {rv.type && (
                          <Badge size="xs" color={rv.type === "internal" ? "red" : "blue"}>
                            {rv.type === "internal" ? "內評" : "外評"}
                          </Badge>
                        )}
                      </Group>
                      <Rating value={rv.rating} readOnly size="xs" />
                    </Group>
                    <Text size="sm" mt="xs">{rv.comment}</Text>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Text size="sm" c="dimmed" p="md" ta="center">尚無評價內容</Text>
            )}
          </Box>
        )}
      </Stack>
    </Card>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const insertionOrderId = params.insertionOrderId ?? "";
  const insertionOrder = await getInsertionOrder(insertionOrderId);
  if (!insertionOrder) throw new Response("Not Found", { status: 404 });
  return json({ insertionOrder });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const orderId = params.insertionOrderId ?? "";
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "review") {
    const kolId = formData.get("kolId") as string;
    const rating = Number(formData.get("rating"));
    const internalComment = formData.get("internalComment") as string;
    const externalComment = formData.get("externalComment") as string;

    // Save both as separate reviews if needed, or follow common pattern
    if (externalComment) {
      await addIOReview(orderId, kolId, {
        author: "System User", // In real app, get from session
        comment: externalComment,
        rating,
        type: "external",
      });
    }
    if (internalComment) {
      await addIOReview(orderId, kolId, {
        author: "System User",
        comment: internalComment,
        rating,
        type: "internal",
      });
    }
    return json({ success: true });
  }

  if (intent === "performance") {
    const kolId = formData.get("kolId") as string;
    const title = formData.get("title") as string;
    const impressions = Number(formData.get("impressions"));
    const reach = Number(formData.get("reach"));
    const likes = Number(formData.get("likes"));
    const comments = Number(formData.get("comments"));

    await updateIOPerformance(orderId, kolId, {
      title,
      metrics: {
        impressions,
        reach,
        likes,
        comments,
        engagementRate:
          impressions > 0 ? ((likes + comments) / impressions) * 100 : 0,
      },
    });
    return json({ success: true });
  }

  return json({ success: false });
}

export default function InsertionOrderDetailPage() {
  const { insertionOrder } = useLoaderData<typeof loader>();
  const collaborations = insertionOrder.collaborations ?? [];
  const fetcher = useFetcher();

  // Modal states
  const [reviewOpened, { open: openReview, close: closeReview }] =
    useDisclosure(false);
  const [perfOpened, { open: openPerf, close: closePerf }] =
    useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] =
    useDisclosure(false);

  const [selectedKol, setSelectedKol] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const totalReach =
    insertionOrder.totalReach ??
    collaborations.reduce((sum: number, c) => sum + (c.totalReach ?? 0), 0);
  const totalEngagement =
    insertionOrder.totalEngagement ??
    collaborations.reduce((sum: number, c) => sum + (c.totalEngagement ?? 0), 0);
  const avgRating =
    insertionOrder.avgRating ??
    (collaborations.length > 0
      ? collaborations.reduce((sum: number, c) => sum + (c.rating ?? 0), 0) /
      collaborations.length
      : 0);
  const avgEngagementRate = insertionOrder.avgEngagementRate ?? 0;

  // Chart Data
  const chartData = collaborations.map((c) => ({
    name: c.name,
    reach: c.totalReach ?? 0,
    engagement: c.totalEngagement ?? 0,
  }));

  const handleOpenReview = (kol: { id: string; name: string }) => {
    setSelectedKol(kol);
    openReview();
  };

  const handleOpenPerf = (kol: { id: string; name: string }) => {
    setSelectedKol(kol);
    openPerf();
  };

  const handleOpenUpload = (kol: { id: string; name: string }) => {
    setSelectedKol(kol);
    openUpload();
  };

  const isSubmitting = fetcher.state !== "idle";

  return (
    <Stack gap="md">
      <Group gap={8}>
        <Link to="/insertion-orders" className="text-blue-500 hover:underline">
          委刊單管理
        </Link>
        <Text c="dimmed">&gt;</Text>
        <Text fw={600}>案件 #{insertionOrder.orderNo}</Text>
      </Group>

      <Group justify="space-between" align="center">
        <Group>
          <Button variant="default" component={Link} to="/insertion-orders">
            返回
          </Button>
          <Title order={2}>案件 #{insertionOrder.orderNo}</Title>
        </Group>
        <Group>
          <Button
            component={Link}
            to={`/reports/generate?orderId=${insertionOrder.id}`}
          >
            📊 產生結案報告
          </Button>
          <Button type="button" variant="default">💾 匯出 Excel</Button>
        </Group>
      </Group>

      {/* ── Overview Card ── */}
      <Card withBorder radius="md" p="xl" shadow="sm">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="sm">
              <Title order={3} c="blue">
                {insertionOrder.projectName ?? insertionOrder.title ?? "未命名專案"}
              </Title>
              <Group gap="xs">
                <Badge variant="light">客戶: {insertionOrder.clientName}</Badge>
                <Badge variant="light" color="cyan">
                  品牌: {insertionOrder.brand ?? insertionOrder.clientName}
                </Badge>
              </Group>
              <Text size="sm">
                產業: {insertionOrder.industryPath ?? insertionOrder.industry ?? "-"}
              </Text>
              <Text size="sm">
                負責業務: {insertionOrder.salesOwner ?? "-"} | KOL 窗口:{" "}
                {insertionOrder.kolManager ?? "-"}
              </Text>
              {insertionOrder.documentUrl && (
                <Button
                  component="a"
                  href={insertionOrder.documentUrl}
                  target="_blank"
                  variant="subtle"
                  leftSection="📄"
                  size="compact-sm"
                  p={0}
                >
                  下載委刊單合約
                </Button>
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <SimpleGrid cols={2} spacing="md">
              <Card withBorder radius="md">
                <Text size="xs" c="dimmed" fw={700}>
                  合作 KOL
                </Text>
                <Title order={4}>
                  {insertionOrder.kolCount ?? collaborations.length} 位
                </Title>
              </Card>
              <Card withBorder radius="md">
                <Text size="xs" c="dimmed" fw={700}>
                  總預算
                </Text>
                <Title order={4}>{currency(insertionOrder.totalBudget)}</Title>
              </Card>
              <Card withBorder radius="md">
                <Text size="xs" c="dimmed" fw={700}>
                  總觸及
                </Text>
                <Title order={4}>{n(totalReach)}</Title>
              </Card>
              <Card withBorder radius="md">
                <Text size="xs" c="dimmed" fw={700}>
                  總互動
                </Text>
                <Title order={4}>{n(totalEngagement)}</Title>
              </Card>
              <Card withBorder radius="md">
                <Text size="xs" c="dimmed" fw={700}>
                  平均互動率
                </Text>
                <Title order={4}>{avgEngagementRate.toFixed(1)}%</Title>
              </Card>
              <Card withBorder radius="md">
                <Text size="xs" c="dimmed" fw={700}>
                  平均評價
                </Text>
                <Title order={4}>⭐ {avgRating.toFixed(1)}</Title>
              </Card>
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Card>

      {/* ── Performance Chart Dashboard ── */}
      <Card withBorder radius="md">
        <Title order={3} mb="lg">
          📈 成效數據對比
        </Title>
        <ClientOnly fallback={<Box h={250} style={{ background: "#f8f9fa" }} />}>
          {() => (
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text fw={600} mb="sm" ta="center">
                  觸及人數對比 (Reach)
                </Text>
                <BarChart
                  id="reach-chart"
                  h={250}
                  data={chartData}
                  dataKey="name"
                  series={[{ name: "reach", color: "blue.6", label: "觸及" }]}
                  tickLine="none"
                  gridAxis="y"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text fw={600} mb="sm" ta="center">
                  互動次數對比 (Engagement)
                </Text>
                <BarChart
                  id="engagement-chart"
                  h={250}
                  data={chartData}
                  dataKey="name"
                  series={[{ name: "engagement", color: "teal.6", label: "互動" }]}
                  tickLine="none"
                  gridAxis="y"
                />
              </Grid.Col>
            </Grid>
          )}
        </ClientOnly>
      </Card>

      {/* ── KOL List ── */}
      <Card withBorder radius="md">
        <Title order={3} mb="sm">
          合作 KOL 列表
        </Title>
        <Stack gap="md">
          {collaborations.map((kol) => (
            <KolCollabCard
              key={kol.id}
              kol={kol}
              onOpenUpload={handleOpenUpload}
              onOpenPerf={handleOpenPerf}
              onOpenReview={handleOpenReview}
            />
          ))}
        </Stack>
      </Card>

      {/* ── Modals ── */}
      <Modal
        id="upload-modal"
        opened={uploadOpened}
        onClose={closeUpload}
        title={`上傳貼文圖片 - ${selectedKol?.name}`}
      >
        <Stack gap="md">
          <TextInput label="貼文連結" placeholder="https://instagram.com/p/xxxxx" />
          <TextInput label="圖片連結" placeholder="可先貼上圖片 URL" />
          <Group justify="flex-end">
            <Button type="button" variant="default" onClick={closeUpload}>
              取消
            </Button>
            <Button type="button" color="blue" onClick={closeUpload}>
              儲存
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        id="perf-modal"
        opened={perfOpened}
        onClose={closePerf}
        title={`新增成效 - ${selectedKol?.name}`}
        size="lg"
      >
        <fetcher.Form method="post" onSubmit={closePerf}>
          <input type="hidden" name="intent" value="performance" />
          <input type="hidden" name="kolId" value={selectedKol?.id} />
          <Stack gap="md">
            <Card withBorder p="sm" bg="blue.0" style={{ borderColor: "#339af0" }}>
              <Stack gap={5}>
                <Group gap={5}>
                  <Text size="sm" fw={700} c="blue">
                    🤖 AI OCR 智能識別
                  </Text>
                  <Badge variant="dot" size="xs">
                    Auto-fill
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  上傳後台成效截圖，AI 將自動為您提取數據並填入下方表單。
                </Text>
                <Button type="button" size="xs" mt={5} color="blue">
                  📸 掃描截圖並帶入數據
                </Button>
              </Stack>
            </Card>

            <TextInput label="內容標題" name="title" defaultValue="IG 貼文" required />
            <SimpleGrid cols={2}>
              <TextInput label="曝光數" name="impressions" type="number" required />
              <TextInput label="觸及人數" name="reach" type="number" required />
              <TextInput label="互動次數 (按讚)" name="likes" type="number" required />
              <TextInput label="留言數" name="comments" type="number" required />
            </SimpleGrid>
            <Textarea label="備註" name="notes" rows={3} />
            <Group justify="flex-end">
              <Button type="button" variant="default" onClick={closePerf}>
                取消
              </Button>
              <Button color="blue" type="submit" loading={isSubmitting}>
                儲存數據
              </Button>
            </Group>
          </Stack>
        </fetcher.Form>
      </Modal>

      <Modal
        id="review-modal"
        opened={reviewOpened}
        onClose={closeReview}
        title={`留下評價 - ${selectedKol?.name}`}
      >
        <fetcher.Form method="post" onSubmit={closeReview}>
          <input type="hidden" name="intent" value="review" />
          <input type="hidden" name="kolId" value={selectedKol?.id} />
          <Stack gap="md">
            <Stack gap={5}>
              <Text size="sm" fw={500}>
                星級評分
              </Text>
              <Rating defaultValue={4.5} name="rating" fractions={2} />
            </Stack>
            <Textarea
              label="內部評論 (僅限同仁查看)"
              name="internalComment"
              placeholder="例如：溝通積極、素材品質高..."
              rows={3}
            />
            <Textarea
              label="外部評論 (可用於結案報告)"
              name="externalComment"
              placeholder="例如：受眾反饋熱烈，轉單效果佳..."
              rows={3}
            />
            <Group justify="flex-end">
              <Button type="button" variant="default" onClick={closeReview}>
                取消
              </Button>
              <Button color="yellow" type="submit" loading={isSubmitting}>
                提交評價
              </Button>
            </Group>
          </Stack>
        </fetcher.Form>
      </Modal>
    </Stack >
  );
}
