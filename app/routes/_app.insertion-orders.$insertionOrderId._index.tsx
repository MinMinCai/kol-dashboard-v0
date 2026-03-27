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
  NumberInput,
  Rating,
  Select,
  SimpleGrid,
  Stack,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title,
  FileInput,
  Loader,
  Progress,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BarChart } from "@mantine/charts";
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { useState, useMemo } from "react";
import { IconPencil, IconCheck, IconX, IconChevronDown, IconTrash } from "@tabler/icons-react";
import { ClientOnly } from "~/components/ClientOnly";
import {
  getInsertionOrder,
  addIOReview,
  updateIOPerformance,
  listBrandCatalog,
  listIndustryCatalog,
  listTeamMembers,
  updateInsertionOrder,
  deleteInsertionOrder,
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
  onOpenUploadAndPerf,
  onOpenReview,
}: {
  kol: OrderKolCollaboration;
  onOpenUploadAndPerf: (k: { id: string; name: string }) => void;
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
              {kol.executionDate && (
                <Text size="xs" c="dimmed">執行日期：{kol.executionDate}</Text>
              )}
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
              onClick={() => onOpenUploadAndPerf(kol)}
            >
              📸 上傳貼文成效
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
  const [insertionOrder, brandCatalog, industryCatalog, teamMembers] = await Promise.all([
    getInsertionOrder(insertionOrderId),
    listBrandCatalog(),
    listIndustryCatalog(),
    listTeamMembers(),
  ]);

  if (!insertionOrder) throw new Response("Not Found", { status: 404 });

  const salesOwners = teamMembers.filter(m => m.group === 'AE').map(m => m.name);
  const kolManagers = teamMembers.filter(m => m.group === 'KOL').map(m => m.name);
  const brands = brandCatalog.map(b => b.name);
  const industries = industryCatalog.map(i => i.name);

  return json({ insertionOrder, salesOwners, kolManagers, brands, industries });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const orderId = params.insertionOrderId ?? "";
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "updateOrder") {
    const projectName = String(formData.get("projectName") ?? "").trim();
    const clientName = String(formData.get("clientName") ?? "").trim();
    const brand = String(formData.get("brand") ?? "").trim();
    const industry = String(formData.get("industry") ?? "").trim();
    const mcnName = String(formData.get("mcnName") ?? "").trim();
    const salesOwner = String(formData.get("salesOwner") ?? "").trim();
    const kolManager = String(formData.get("kolManager") ?? "").trim();
    const startDate = String(formData.get("startDate") ?? "").trim();
    const endDate = String(formData.get("endDate") ?? "").trim();
    const totalBudget = Number(formData.get("totalBudget") ?? 0);
    const tax = Number(formData.get("tax") ?? 0);
    const totalWithTax = totalBudget + tax;

    await updateInsertionOrder(orderId, {
      projectName,
      title: projectName,
      clientName,
      brand,
      industry,
      mcnName,
      salesOwner,
      kolManager,
      startDate,
      endDate,
      totalBudget,
      tax,
      totalWithTax,
    });
    return json({ success: true });
  }

  if (intent === "deleteOrder") {
    await deleteInsertionOrder(orderId);
    return redirect("/insertion-orders");
  }

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

function parseNotes(raw: string | undefined | null): { description: string; internalNotes: string } {
  if (!raw) return { description: "", internalNotes: "" };
  const lines = raw.split("\n");
  const descLines: string[] = [];
  const noteLines: string[] = [];
  for (const line of lines) {
    if (line.startsWith("internal:")) {
      noteLines.push(line.slice("internal:".length));
    } else {
      descLines.push(line);
    }
  }
  return {
    description: descLines.join("\n").trim(),
    internalNotes: noteLines.join("\n").trim(),
  };
}

export default function InsertionOrderDetailPage() {
  const { insertionOrder, salesOwners, kolManagers, brands, industries } = useLoaderData<typeof loader>();
  const collaborations = insertionOrder.collaborations ?? [];
  const fetcher = useFetcher();
  const submit = useSubmit();
  const [isEditing, setIsEditing] = useState(false);
  const { description, internalNotes } = parseNotes((insertionOrder as any).notes);

  // Modal states
  const [reviewOpened, { open: openReview, close: closeReview }] =
    useDisclosure(false);
  const [perfModalOpened, { open: openPerfModal, close: closePerfModal }] =
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

  const handleOpenUploadAndPerf = (kol: { id: string; name: string }) => {
    setSelectedKol(kol);
    openPerfModal();
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
          <Group gap="xs">
              <Button
                component={Link}
                to={`/insertion-orders/${insertionOrder.id}/edit`}
                variant="light"
                leftSection={<IconPencil size={16} />}
              >
                編輯
              </Button>
              <fetcher.Form
                method="post"
                style={{ display: "inline" }}
                onSubmit={(e) => {
                  if (!confirm("確定要刪除此委刊單嗎？")) e.preventDefault();
                }}
              >
                <input type="hidden" name="intent" value="deleteOrder" />
                <Button
                  type="submit"
                  variant="light"
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  loading={isSubmitting}
                >
                  刪除
                </Button>
              </fetcher.Form>
            </Group>
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
                {insertionOrder.orderTitle && (
                  <Text size="sm" fw={500} c="dimmed">{insertionOrder.orderTitle}</Text>
                )}
                <Title order={3} c="blue">
                  {insertionOrder.projectName ?? insertionOrder.title ?? "未命名專案"}
                </Title>
                <Group gap="xs">
                  <Badge variant="light">客戶: {insertionOrder.clientName}</Badge>
                  <Badge variant="light" color="cyan">
                    品牌: {insertionOrder.brand ?? insertionOrder.clientName}
                  </Badge>
                  {insertionOrder.mcnName && (
                    <Badge variant="light" color="violet">網紅公司: {insertionOrder.mcnName}</Badge>
                  )}
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
                {description && (
                  <Box mt="xs">
                    <Text size="xs" fw={700} c="dimmed" mb={4}>專案說明</Text>
                    <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>{description}</Text>
                  </Box>
                )}
                {internalNotes && (
                  <Box
                    mt="xs"
                    p="sm"
                    style={{
                      background: "var(--mantine-color-gray-0)",
                      border: "1px solid var(--mantine-color-gray-3)",
                      borderRadius: 6,
                    }}
                  >
                    <Text size="xs" fw={700} c="dimmed" mb={4}>🔒 內部備註</Text>
                    <Text size="sm" c="dimmed" style={{ whiteSpace: "pre-wrap" }}>{internalNotes}</Text>
                  </Box>
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
                    專案報價(未稅)
                  </Text>
                  <Title order={4}>{currency(insertionOrder.totalBudget)}</Title>
                </Card>
                {insertionOrder.tax != null && (
                  <Card withBorder radius="md">
                    <Text size="xs" c="dimmed" fw={700}>
                      稅金
                    </Text>
                    <Title order={4}>{currency(insertionOrder.tax)}</Title>
                  </Card>
                )}
                {insertionOrder.totalWithTax != null && (
                  <Card withBorder radius="md">
                    <Text size="xs" c="dimmed" fw={700}>
                      含稅總額
                    </Text>
                    <Title order={4}>{currency(insertionOrder.totalWithTax)}</Title>
                  </Card>
                )}
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
              onOpenUploadAndPerf={handleOpenUploadAndPerf}
              onOpenReview={handleOpenReview}
            />
          ))}
        </Stack>
      </Card>

      {/* ── Modals ── */}
      <PerformanceModal 
        opened={perfModalOpened} 
        onClose={closePerfModal} 
        insertionOrder={insertionOrder} 
        selectedKol={selectedKol} 
        fetcher={fetcher} 
      />

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

function PerformanceModal({ opened, onClose, insertionOrder, selectedKol, fetcher }: any) {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "recognizing" | "success">("idle");
  
  // Simulated form state
  const [metrics, setMetrics] = useState({
    impressions: 0,
    reach: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    views: 0,
  });

  const handleFileChange = (files: File[]) => {
    if (files.length === 0) return;
    setUploadState("uploading");
    setTimeout(() => {
      setUploadState("recognizing");
      setTimeout(() => {
        setUploadState("success");
        setMetrics({
          impressions: 12500,
          reach: 8400,
          likes: 1200,
          comments: 45,
          shares: 20,
          saves: 150,
          views: 9500,
        });
      }, 2000);
    }, 1000);
  };

  const engagementRate = metrics.impressions > 0 
    ? ((metrics.likes + metrics.comments + metrics.shares + metrics.saves) / metrics.impressions * 100).toFixed(2) 
    : "0.00";

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setUploadState("idle");
      setMetrics({
        impressions: 0,
        reach: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        views: 0,
      });
    }, 300);
  };

  return (
    <Modal
      opened={opened}
      onClose={closeAndReset}
      title={<Text fw={600} size="lg">新增成效數據</Text>}
      size="700px"
    >
      <Text size="sm" c="dimmed" mb="lg">上傳成效截圖，AI 將自動辨識數據</Text>
      
      <fetcher.Form method="post" onSubmit={closeAndReset}>
        <input type="hidden" name="intent" value="performance" />
        <input type="hidden" name="kolId" value={selectedKol?.id} />
        
        <Stack gap="xl">
          {/* Section 1: Context */}
          <Card withBorder p="md" radius="md" bg="gray.0">
             <SimpleGrid cols={3}>
                <Stack gap={0}>
                  <Text size="xs" c="dimmed">案件</Text>
                  <Text size="sm" fw={600}>#{insertionOrder.orderNo} {insertionOrder.projectName}</Text>
                </Stack>
                <Stack gap={0}>
                  <Text size="xs" c="dimmed">KOL</Text>
                  <Text size="sm" fw={600}>{selectedKol?.name}</Text>
                </Stack>
                <Select
                  label="曝光點"
                  name="title"
                  defaultValue="IG貼文"
                  data={["IG貼文", "IG限動", "IG Reels", "FB貼文", "YouTube影片"]}
                  size="xs"
                />
             </SimpleGrid>
          </Card>

          {/* Section 2 & 3: Upload & AI */}
          <Stack gap="xs">
            <Group justify="space-between">
              <Box>
                <Text fw={600} size="sm">上傳成效截圖</Text>
                <Text size="xs" c="dimmed">成效截圖可能很長，支援上傳多張圖片</Text>
              </Box>
            </Group>
            
            {uploadState === "idle" && (
              <Box 
                style={{ border: "2px dashed var(--mantine-color-gray-4)", borderRadius: 8, padding: 30, textAlign: "center", cursor: "pointer", position: "relative" }}
              >
                <FileInput 
                  multiple 
                  accept="image/*" 
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", height: "100%" }}
                  onChange={handleFileChange}
                />
                <Text size="sm" c="blue" fw={500}>點擊或拖曳圖片至此處</Text>
              </Box>
            )}

            {uploadState === "uploading" && (
              <Card withBorder p="md" ta="center">
                 <Loader size="sm" mb="sm" mx="auto" />
                 <Text size="sm">圖片上傳中...</Text>
                 <Progress value={75} mt="md" animated />
              </Card>
            )}

            {uploadState === "recognizing" && (
              <Card withBorder p="md" ta="center" bg="blue.0" style={{ borderColor: "#339af0" }}>
                 <Loader color="blue" type="bars" size="sm" mb="sm" mx="auto" />
                 <Text size="sm" fw={600} c="blue">🤖 AI 正在辨識中...</Text>
                 <Text size="xs" c="dimmed">正在從截圖提取數據，請稍候</Text>
              </Card>
            )}

            {uploadState === "success" && (
              <Card withBorder p="md" ta="center" bg="green.0" style={{ borderColor: "#40c057" }}>
                 <Group justify="center" gap="xs">
                   <IconCheck size={20} color="#40c057" />
                   <Text size="sm" fw={600} c="green.9">✅ AI 辨識完成</Text>
                 </Group>
                 <Text size="xs" c="dimmed">成功提取 7 項數據</Text>
              </Card>
            )}
          </Stack>

          {/* Section 4: Data fields */}
          <Stack gap="xs">
            <Text fw={600} size="sm">數據確認與修改</Text>
            <SimpleGrid cols={2} spacing="md">
              <NumberInput label="曝光數" name="impressions" value={metrics.impressions} onChange={(v) => setMetrics(m => ({...m, impressions: Number(v)}))} 
                rightSection={uploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                styles={{ input: { borderColor: uploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
              />
              <NumberInput label="觸及人數" name="reach" value={metrics.reach} onChange={(v) => setMetrics(m => ({...m, reach: Number(v)}))}
                rightSection={uploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                styles={{ input: { borderColor: uploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
              />
              <NumberInput label="按讚數" name="likes" value={metrics.likes} onChange={(v) => setMetrics(m => ({...m, likes: Number(v)}))}
                rightSection={uploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                styles={{ input: { borderColor: uploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
               />
              <NumberInput label="留言數" name="comments" value={metrics.comments} onChange={(v) => setMetrics(m => ({...m, comments: Number(v)}))} 
                rightSection={uploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                styles={{ input: { borderColor: uploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
              />
              <NumberInput label="分享數" value={metrics.shares} onChange={(v) => setMetrics(m => ({...m, shares: Number(v)}))} 
                rightSection={uploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                styles={{ input: { borderColor: uploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
              />
              <NumberInput label="收藏數" value={metrics.saves} onChange={(v) => setMetrics(m => ({...m, saves: Number(v)}))} 
                rightSection={uploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                styles={{ input: { borderColor: uploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
              />
              <NumberInput label="觀看次數" value={metrics.views} onChange={(v) => setMetrics(m => ({...m, views: Number(v)}))} 
                rightSection={uploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                styles={{ input: { borderColor: uploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
              />
              
              <TextInput 
                label="互動率 (系統運算)" 
                value={`${engagementRate}%`} 
                readOnly 
                variant="filled" 
                styles={{ input: { backgroundColor: 'var(--mantine-color-gray-1)', fontWeight: 600 } }}
              />
            </SimpleGrid>
          </Stack>

          <Group justify="space-between" mt="md">
            <Button type="button" variant="default" onClick={closeAndReset}>取消</Button>
            <Button color="blue" type="submit" loading={fetcher.state !== "idle"}>儲存成效</Button>
          </Group>
        </Stack>
      </fetcher.Form>
    </Modal>
  );
}
