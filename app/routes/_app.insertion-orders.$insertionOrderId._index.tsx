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
  Text,
  Textarea,
  TextInput,
  Title,
  FileInput,
  Loader,
  Progress,
  Image,
  Collapse,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { BarChart } from "@mantine/charts"; // 暫不開發
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { useState, useMemo, useEffect } from "react";
import { ThemeIcon, Checkbox, Tooltip } from "@mantine/core";
import { IconRobot, IconBulb, IconClockHour4, IconTemplate, IconFileDescription, IconFile, IconPencil, IconCheck, IconX, IconChevronDown, IconTrash } from "@tabler/icons-react";
import { useNotificationStore } from "~/store/notification";
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
} from "~/lib/mock-api.server";

function n(value: number | undefined): string {
  // Use a stable locale to prevent hydration mismatch
  return (value ?? 0).toLocaleString("zh-TW");
}
function currency(value: number | undefined): string {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}

// ── KolCollabCard: 獨立子元件 ──
function KolCollabCard({
  kol,
  onOpenUploadAndPerf,
  onOpenReview,
}: {
  kol: OrderKolCollaboration;
  onOpenUploadAndPerf: (k: { id: string; name: string }) => void;
  onOpenReview: (k: { id: string; name: string }) => void;
}) {
  const [expanded, { toggle }] = useDisclosure(false);

  return (
    <Card withBorder p="md" radius="md">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Group align="flex-start">
            <Avatar src={kol.avatarUrl} radius="xl" size={50} />
            <div>
              <Group gap="xs" align="center">
                <Text fw={700} size="lg">{kol.name}</Text>
                <Button
                  variant="subtle"
                  color="gray"
                  size="compact-xs"
                  p={0}
                  onClick={toggle}
                  aria-label={expanded ? "收起明細" : "展開明細"}
                >
                  <IconChevronDown
                    size={18}
                    style={{
                      transform: expanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      display: 'block'
                    }}
                  />
                </Button>
              </Group>
              <Text size="xs" c="dimmed" mb={2}>
                {kol.services} | NT$ {(kol.price ?? 0).toLocaleString("zh-TW")}
              </Text>
              {kol.executionDate && (
                <Text size="xs" c="dimmed" mb={8}>執行日期：{kol.executionDate}</Text>
              )}
              {/* 操作工具移入人物總覽內部 */}
              <Group gap="xs" mt="xs">
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

        {expanded && <Divider />}

        <Collapse in={expanded}>
          <Stack gap="xl">

            {/* 成效明細 */}
            <Box>
              <Text fw={600} size="sm" mb="md">成效明細</Text>
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
                <Text size="sm" c="dimmed" p="md" ta="center" style={{ border: '1px dashed var(--mantine-color-gray-4)', borderRadius: '8px' }}>
                  尚無成效數據
                </Text>
              )}
            </Box>

            <Divider variant="dashed" />

            {/* 合作評價 */}
            <Box>
              <Text fw={600} size="sm" mb="md">合作評價</Text>
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
                <Text size="sm" c="dimmed" p="md" ta="center" style={{ border: '1px dashed var(--mantine-color-gray-4)', borderRadius: '8px' }}>
                  尚無評價內容
                </Text>
              )}
            </Box>
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const insertionOrderId = params.insertionOrderId ?? "";
  try {
    const [insertionOrder, brandCatalog, industryCatalog, teamMembers] = await Promise.all([
      getInsertionOrder(insertionOrderId).catch(() => null),
      listBrandCatalog().catch(() => []),
      listIndustryCatalog().catch(() => []),
      listTeamMembers().catch(() => []),
    ]);

    if (!insertionOrder) {
      throw new Response("Not Found", { status: 404 });
    }

    const salesOwners = (teamMembers ?? []).filter(m => m.group === 'AE').map(m => m.name);
    const kolManagers = (teamMembers ?? []).filter(m => m.group === 'KOL').map(m => m.name);
    const brands = (brandCatalog ?? []).map(b => b.name);
    const industries = (industryCatalog ?? []).map(i => i.name);

    return json({ insertionOrder, salesOwners, kolManagers, brands, industries });
  } catch (error: any) {
    if (error instanceof Response) throw error;
    console.error("Loader error:", error);
    throw new Response(error.message || "Internal Server Error", { status: 500 });
  }
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

  if (intent === "generateReport") {
    const io = await getInsertionOrder(orderId);
    if (io) {
      const newReport = {
        id: `rep_${Date.now()}`,
        name: `結案報告_v${(io.reports?.filter((r: any) => r.type === "draft").length || 0) + 1}.pptx`,
        type: "draft" as const,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
        createdBy: "系統 AI",
      };
      await updateInsertionOrder(orderId, {
        hasDraft: true,
        reports: [...(io.reports || []), newReport]
      });
    }
    return json({ success: true });
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
  const { showToast, showBanner } = useNotificationStore();

  // ── Report Generation State ──
  const [genModalOpen, { open: openGenModal, close: closeGenModal }] = useDisclosure(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [selectedKolIds, setSelectedKolIds] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");

  // Progress modal state
  const [progressModalOpen, { open: openProgressModal, close: closeProgressModal }] = useDisclosure(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleOpenGenModal = (order: any) => {
    setActiveOrder(order);
    const readyIds = (order.collaborations || [])
      .filter((k: any) => (k.performanceItems || []).length > 0)
      .map((k: any) => k.id);
    setSelectedKolIds(readyIds.length > 0 ? readyIds : ["demo-gina"]);
    openGenModal();
  };

  const toggleKolSelection = (kolId: string) => {
    setSelectedKolIds((prev) =>
      prev.includes(kolId) ? prev.filter((id) => id !== kolId) : [...prev, kolId]
    );
  };

  const startGeneration = () => {
    closeGenModal();
    openProgressModal();
    setProgressPercentage(0);
    setCurrentStepIndex(0);

    const interval = setInterval(() => {
      setProgressPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 10) + 2;
        return next > 100 ? 100 : next;
      });
    }, 400);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (progressPercentage < 20) setCurrentStepIndex(0);
    else if (progressPercentage < 45) setCurrentStepIndex(1);
    else if (progressPercentage < 70) setCurrentStepIndex(2);
    else if (progressPercentage < 90) setCurrentStepIndex(3);
    else if (progressPercentage < 100) setCurrentStepIndex(4);
    else if (progressPercentage === 100) {
      setTimeout(() => {
        if (activeOrder) {
          fetcher.submit(
            { intent: "generateReport" },
            { method: "post" }
          );
          const title = "結案報告已生成完成！";
          const message = `${activeOrder.orderNo} ${activeOrder.title || activeOrder.projectName}|結案報告_v1.pptx`;
          showToast(title, message, "/reports/generate");
          showBanner(title, message, "/reports/generate");
        }
        closeProgressModal();
      }, 500);
    }
  }, [progressPercentage]);

  // Modal states
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

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
            <Button
              type="button"
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={openDeleteModal}
            >
              刪除
            </Button>
          </Group>
          <Button onClick={() => handleOpenGenModal(insertionOrder)}>
            📊 產生報告
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
              {(insertionOrder.startDate || insertionOrder.endDate) && (
                <Text size="sm">
                  執行日期: {insertionOrder.startDate ?? "-"} ~ {insertionOrder.endDate ?? "-"}
                </Text>
              )}
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

      {/* ── Performance Chart Dashboard ── (暫不開發)
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
      */}

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

      {/* ── Generate Report Modal ── */}
      <Modal
        opened={genModalOpen}
        onClose={closeGenModal}
        title={<Text fw={700} size="lg">生成結案報告</Text>}
        size="xl"
      >
        {activeOrder && (
          <Stack gap="xl" mt="sm">
            {/* Section 1 - Campaign Info */}
            <Card withBorder bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))" p="sm" radius="md">
              <Group gap="xl">
                <Box>
                  <Text size="xs" c="dimmed">案件編號</Text>
                  <Text fw={600}>#{activeOrder.orderNo}</Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed">案件名稱</Text>
                  <Text fw={600}>{activeOrder.title}</Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed">客戶</Text>
                  <Text fw={600}>{activeOrder.clientName}</Text>
                </Box>
              </Group>
            </Card>

            {/* Section 2 - KOL Selection */}
            <Box>
              <Text fw={600} size="lg" mb={4}>步驟 1：確認 KOL 成效資料</Text>
              <Text size="sm" c="dimmed" mb="md">系統將自動選擇已上傳成效的 KOL</Text>

              <Stack gap="md">
                {/* 2A. Ready KOLs */}
                <Box>
                  <Text fw={500} size="sm" c="green.7" mb="xs">✅ 已上傳成效的 KOL (預設選擇)</Text>
                  <Stack gap="xs">
                    {(activeOrder.collaborations || []).filter((k: any) => (k.performanceItems || []).length > 0).map((kol: any, idx: number) => (
                      <Card
                        key={kol.id || idx}
                        withBorder
                        p="sm"
                        radius="md"
                        style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                        className="hover:shadow-sm"
                        onClick={() => toggleKolSelection(kol.id)}
                      >
                        <Group wrap="nowrap">
                          <Checkbox
                            checked={selectedKolIds.includes(kol.id)}
                            onChange={() => toggleKolSelection(kol.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Avatar src={kol.avatarUrl} radius="xl" size="md" />
                          <Box style={{ flexGrow: 1 }}>
                            <Text fw={600}>{kol.name || "KOL Name"}</Text>
                            <Group gap="xs" mt={4}>
                              <Text size="xs" c="dimmed">IG貼文 <IconCheck size={12} style={{ display: 'inline', color: 'green' }} /> | IG限動 <IconCheck size={12} style={{ display: 'inline', color: 'green' }} /></Text>
                            </Group>
                          </Box>
                          <Box style={{ textAlign: 'right' }}>
                            <Badge variant="dot" color="blue">總觸及 80K</Badge>
                            <Text size="xs" c="dimmed" mt={4}>互動率 7.8%</Text>
                          </Box>
                        </Group>
                      </Card>
                    ))}
                    {/* Mock empty check context */}
                    {(activeOrder.collaborations || []).filter((k: any) => (k.performanceItems || []).length > 0).length === 0 && (
                      <Card withBorder p="sm" radius="md" style={{ cursor: 'pointer' }} onClick={() => toggleKolSelection("demo-gina")}>
                        <Group wrap="nowrap">
                          <Checkbox
                            checked={selectedKolIds.includes("demo-gina")}
                            onChange={() => toggleKolSelection("demo-gina")}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Avatar color="blue" radius="xl" size="md">G</Avatar>
                          <Box style={{ flexGrow: 1 }}>
                            <Text fw={600}>Gina (Demo)</Text>
                            <Group gap="xs" mt={4}>
                              <Text size="xs" c="dimmed">IG貼文 <IconCheck size={12} style={{ display: 'inline', color: 'green' }} /> | IG限動 <IconCheck size={12} style={{ display: 'inline', color: 'green' }} /></Text>
                            </Group>
                          </Box>
                        </Group>
                      </Card>
                    )}
                  </Stack>
                </Box>

                {/* 2B. Not Ready KOLs */}
                <Box>
                  <Text fw={500} size="sm" c="orange.7" mb="xs">⚠️ 尚未上傳成效的 KOL</Text>
                  <Stack gap="xs">
                    {(activeOrder.collaborations || []).filter((k: any) => !(k.performanceItems || []).length).map((kol: any, idx: number) => (
                      <Card
                        key={kol.id || idx}
                        withBorder
                        p="sm"
                        radius="md"
                        bg="light-dark(var(--mantine-color-orange-0), rgba(253, 126, 20, 0.15))"
                        style={{ opacity: 0.8, cursor: 'pointer' }}
                        onClick={() => toggleKolSelection(kol.id)}
                      >
                        <Group wrap="nowrap">
                          <Checkbox
                            checked={selectedKolIds.includes(kol.id)}
                            onChange={() => toggleKolSelection(kol.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Avatar src={kol.avatarUrl} radius="xl" size="md" style={{ filter: 'grayscale(100%)' }} />
                          <Box style={{ flexGrow: 1 }}>
                            <Text fw={600} c="dimmed">{kol.name || "KOL Name"}</Text>
                            <Group gap="xs" mt={4}>
                              <Text size="xs" c="red.7"><IconX size={12} style={{ display: 'inline' }} /> 無成效資料</Text>
                            </Group>
                          </Box>
                          <Button variant="subtle" size="xs" color="blue" rightSection="→">前往上傳成效</Button>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </Box>

                {/* Info box */}
                <Card bg="light-dark(var(--mantine-color-blue-0), rgba(51, 154, 240, 0.15))" p="sm" radius="md" mt="xs">
                  <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon color="blue" variant="light" size="sm" mt={2}><IconBulb size={14} /></ThemeIcon>
                    <Text size="sm" c="blue.9" style={{ lineHeight: 1.4 }}>
                      未勾選的 KOL 將不會出現在報告中。建議先上傳所有 KOL 的成效資料後再生成報告。
                    </Text>
                  </Group>
                </Card>
              </Stack>
            </Box>

            <Divider />

            {/* Section 3 - Report Settings */}
            <Box>
              <Text fw={600} size="lg" mb="md">步驟 2：報告設定</Text>

              <Stack gap="lg">
                <TextInput
                  label="報告標題"
                  defaultValue={`${activeOrder.title} 結案報告`}
                  description="0/100"
                />

                <Box>
                  <Text size="sm" fw={500} mb="xs">PowerPoint 模板</Text>
                  <Group grow>
                    <Card withBorder p="sm" onClick={() => setSelectedTemplate("standard")} style={{ borderColor: selectedTemplate === "standard" ? 'var(--mantine-color-blue-filled)' : 'var(--mantine-color-default-border)', cursor: 'pointer' }}>
                      <Stack align="center" gap="xs">
                        <ThemeIcon size="xl" variant="light" color={selectedTemplate === "standard" ? "blue" : "gray"}><IconTemplate /></ThemeIcon>
                        <Text fw={500} size="sm" c={selectedTemplate === "standard" ? "" : "dimmed"}>公司標準模板</Text>
                      </Stack>
                    </Card>
                    <Card withBorder p="sm" onClick={() => setSelectedTemplate("simple")} style={{ borderColor: selectedTemplate === "simple" ? 'var(--mantine-color-blue-filled)' : 'var(--mantine-color-default-border)', cursor: 'pointer' }}>
                      <Stack align="center" gap="xs">
                        <ThemeIcon size="xl" variant="light" color={selectedTemplate === "simple" ? "blue" : "gray"}><IconTemplate /></ThemeIcon>
                        <Text fw={500} size="sm" c={selectedTemplate === "simple" ? "" : "dimmed"}>簡約模板</Text>
                      </Stack>
                    </Card>
                    <Card withBorder p="sm" onClick={() => setSelectedTemplate("none")} style={{ borderColor: selectedTemplate === "none" ? 'var(--mantine-color-blue-filled)' : 'var(--mantine-color-default-border)', cursor: 'pointer' }}>
                      <Stack align="center" gap="xs">
                        <ThemeIcon size="xl" variant="light" color={selectedTemplate === "none" ? "blue" : "gray"}><IconFile /></ThemeIcon>
                        <Text fw={500} size="sm" c={selectedTemplate === "none" ? "" : "dimmed"}>不套用模板</Text>
                      </Stack>
                    </Card>
                  </Group>
                </Box>

                <Card bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))" p="sm" radius="md">
                  <Group wrap="nowrap">
                    <ThemeIcon color="gray" variant="light"><IconFileDescription size={16} /></ThemeIcon>
                    <Box>
                      <Text size="sm" fw={600}>預估頁數: 約 18 頁</Text>
                      <Text size="xs" c="dimmed">(封面 + 3個KOL × 平均5頁 + 總結)</Text>
                    </Box>
                  </Group>
                </Card>
              </Stack>
            </Box>

            <Group justify="flex-end" mt="md">
              <Button variant="ghost" color="gray" onClick={closeGenModal}>取消</Button>
              <Tooltip label="報告將在背景生成，完成後會通知您" position="top" withArrow>
                <Button color="blue" onClick={startGeneration} leftSection={<IconRobot size={20} />}>
                  開始生成
                </Button>
              </Tooltip>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* ── Progress Modal ── */}
      <Modal
        opened={progressModalOpen}
        onClose={closeProgressModal}
        withCloseButton={false}
        size="md"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Stack align="center" ta="center" gap="md" py="md">
          <ThemeIcon size={64} radius="100%" variant="light" color="blue" style={{ animation: 'pulse 2s infinite' }}>
            <IconRobot size={40} />
          </ThemeIcon>
          <Box>
            <Title order={3}>AI 正在為您生成報告</Title>
            <Text c="dimmed" mt={4}>
              案件 #{activeOrder?.orderNo} {activeOrder?.title}
            </Text>
          </Box>

          <Box w="100%" my="sm">
            <Group justify="space-between" mb={8}>
              <Text size="sm" fw={600}>進度</Text>
              <Text size="sm" fw={600} c="blue">{progressPercentage}%</Text>
            </Group>
            <Progress
              value={progressPercentage}
              size="lg"
              radius="xl"
              striped
              animated
              color="blue"
            />
          </Box>

          {/* Checklist */}
          <Stack gap="xs" w="100%" align="flex-start" pl="md">
            {[
              "收集案件資料",
              "整理 KOL 成效數據",
              "AI 生成報告內容中...",
              "套用 PowerPoint 模板",
              "上傳至雲端儲存"
            ].map((stepDesc, idx) => {
              const isCompleted = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;
              return (
                <Group key={idx} wrap="nowrap" gap="sm">
                  {isCompleted ? (
                    <ThemeIcon color="green" size={20} radius="xl" variant="filled"><IconCheck size={14} /></ThemeIcon>
                  ) : isCurrent ? (
                    <ThemeIcon color="blue" size={20} radius="xl" variant="light"><IconRobot size={14} /></ThemeIcon>
                  ) : (
                    <ThemeIcon color="gray" size={20} radius="xl" variant="light"><IconClockHour4 size={14} /></ThemeIcon>
                  )}
                  <Text size="sm" fw={isCurrent ? 600 : 400} c={isCompleted ? "dimmed" : isCurrent ? "blue.7" : "gray.5"}>
                    {stepDesc}
                  </Text>
                </Group>
              );
            })}
          </Stack>

          <Text size="xs" c="dimmed" mt="xs">預計還需 2 分鐘</Text>

          <Card bg="blue.0" w="100%" p="sm" radius="md">
            <Group wrap="nowrap" align="center" justify="center">
              <IconBulb size={18} color="var(--mantine-color-blue-7)" />
              <Text size="sm" c="blue.9">您可以關閉此視窗繼續其他工作，完成後會通知您</Text>
            </Group>
          </Card>

          <Group w="100%" grow mt="sm">
            <Button variant="outline" color="red" onClick={closeProgressModal}>取消生成</Button>
            <Button onClick={closeProgressModal}>在背景繼續</Button>
          </Group>
        </Stack>
      </Modal>

      {/* ── Delete Confirm Modal ── */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="確認刪除委刊單"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            確定要刪除「{insertionOrder.title ?? insertionOrder.orderNo}」嗎？此動作無法復原。
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={closeDeleteModal}>取消</Button>
            <fetcher.Form method="post" onSubmit={closeDeleteModal}>
              <input type="hidden" name="intent" value="deleteOrder" />
              <Button type="submit" color="red" loading={isSubmitting}>確認刪除</Button>
            </fetcher.Form>
          </Group>
        </Stack>
      </Modal>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Stack >
  );
}

function PerformanceModal({ opened, onClose, insertionOrder, selectedKol, fetcher }: any) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<"post" | "performance">("performance");

  const [postUploadState, setPostUploadState] = useState<"idle" | "uploading" | "success">("idle");
  const [postImages, setPostImages] = useState<string[]>([]);

  const [perfUploadState, setPerfUploadState] = useState<"idle" | "uploading" | "recognizing" | "success">("idle");
  const [perfImages, setPerfImages] = useState<string[]>([]);

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

  const handlePostFileChange = (files: File[]) => {
    if (files.length === 0) return;
    setPostUploadState("uploading");

    // Simulate converting files to object URLs for preview
    const urls = files.map(f => URL.createObjectURL(f));
    setPostImages(urls);

    setTimeout(() => {
      setPostUploadState("success");
    }, 1500);
  };

  const handlePerfFileChange = (files: File[]) => {
    if (files.length === 0) return;
    setPerfUploadState("uploading");

    const urls = files.map(f => URL.createObjectURL(f));
    setPerfImages(urls);

    setTimeout(() => {
      setPerfUploadState("recognizing");
      setTimeout(() => {
        setPerfUploadState("success");
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
      setActiveTab("performance");
      setPostUploadState("idle");
      setPostImages([]);
      setPerfUploadState("idle");
      setPerfImages([]);
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
      <fetcher.Form method="post" onSubmit={closeAndReset}>
        <input type="hidden" name="intent" value="performance" />
        <input type="hidden" name="kolId" value={selectedKol?.id} />

        <Stack gap="xl">
          {/* Section 1: Context */}
          <Card withBorder p="md" radius="md" bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))">
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

          {/* Sections: Tabs */}
          <Box>
            <Box style={{ borderBottom: "1px solid var(--mantine-color-default-border)", marginBottom: "16px" }}>
              <Group gap={0}>
                <button
                  type="button"
                  onClick={() => setActiveTab("post")}
                  style={{
                    padding: "8px 16px",
                    border: "none",
                    borderBottom: activeTab === "post" ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
                    background: "none",
                    cursor: "pointer",
                    color: activeTab === "post" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-dimmed)",
                    fontWeight: activeTab === "post" ? 600 : 400,
                    fontSize: "var(--mantine-font-size-sm)",
                    fontFamily: "inherit",
                    transition: "color 0.1s, border-color 0.1s",
                  }}
                >
                  貼文圖片
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("performance")}
                  style={{
                    padding: "8px 16px",
                    border: "none",
                    borderBottom: activeTab === "performance" ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
                    background: "none",
                    cursor: "pointer",
                    color: activeTab === "performance" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-dimmed)",
                    fontWeight: activeTab === "performance" ? 600 : 400,
                    fontSize: "var(--mantine-font-size-sm)",
                    fontFamily: "inherit",
                    transition: "color 0.1s, border-color 0.1s",
                  }}
                >
                  成效截圖
                </button>
              </Group>
            </Box>

            {/* Content for Post Images */}
            {activeTab === "post" && (
              <Stack gap="md">
                {postUploadState === "idle" && (
                  <Box
                    style={{ border: "2px dashed var(--mantine-color-gray-4)", borderRadius: 8, padding: 40, textAlign: "center", cursor: "pointer", position: "relative" }}
                  >
                    <FileInput
                      multiple
                      accept="image/*"
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", height: "100%" }}
                      onChange={handlePostFileChange}
                    />
                    <Text size="md" fw={500} c="dimmed">
                      <Text span c="blue" inherit>點擊上傳</Text> 或拖曳檔案至此
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>支援上傳多張貼文圖片</Text>
                  </Box>
                )}

                {postUploadState === "uploading" && (
                  <Card withBorder p="xl" ta="center">
                    <Loader size="sm" mb="sm" mx="auto" />
                    <Text size="sm">圖片上傳中...</Text>
                    <Progress value={75} mt="md" animated />
                  </Card>
                )}

                {postUploadState === "success" && (
                  <Group gap="sm">
                    {postImages.map((src, i) => (
                      <Image key={i} src={src} w={100} h={100} radius="md" style={{ objectFit: 'cover' }} />
                    ))}
                    <Box style={{ width: 100, height: 100, border: "2px dashed var(--mantine-color-gray-4)", borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                      <FileInput
                        multiple
                        accept="image/*"
                        style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", height: "100%" }}
                        onChange={handlePostFileChange}
                      />
                      <Text size="xl" c="dimmed">+</Text>
                    </Box>
                  </Group>
                )}
              </Stack>
            )}

            {/* Content for Performance Screenshots */}
            {activeTab === "performance" && (
              <Stack gap="md">
                {perfUploadState === "idle" && (
                  <Box
                    style={{ border: "2px dashed var(--mantine-color-gray-4)", borderRadius: 8, padding: 40, textAlign: "center", cursor: "pointer", position: "relative" }}
                  >
                    <FileInput
                      multiple
                      accept="image/*"
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", height: "100%" }}
                      onChange={handlePerfFileChange}
                    />
                    <Text size="md" fw={500} c="dimmed">
                      <Text span c="blue" inherit>點擊上傳</Text> 或拖曳檔案至此
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>成效截圖可能很長，支援上傳多張圖片</Text>
                  </Box>
                )}

                {perfUploadState === "uploading" && (
                  <Card withBorder p="xl" ta="center">
                    <Loader size="sm" mb="sm" mx="auto" />
                    <Text size="sm">圖片上傳中...</Text>
                    <Progress value={75} mt="md" animated />
                  </Card>
                )}

                {['recognizing', 'success'].includes(perfUploadState) && (
                  <Group gap="sm" mb="sm">
                    {perfImages.map((src, i) => (
                      <Image key={i} src={src} w={100} h={100} radius="md" style={{ objectFit: 'cover' }} />
                    ))}
                  </Group>
                )}

                {perfUploadState === "recognizing" && (
                  <Card
                    p="md"
                    radius="md"
                    style={{
                      background: isDark ? "rgba(51, 154, 240, 0.18)" : "var(--mantine-color-blue-0)",
                      border: isDark ? "1px solid rgba(51, 154, 240, 0.35)" : undefined,
                    }}
                  >
                    <Group gap="sm">
                      <Loader color="blue" size="sm" />
                      <Text size="sm" fw={600} c={isDark ? "blue.3" : "blue.9"}>
                        ✨ 🤖 AI 正在辨識中...
                      </Text>
                    </Group>
                  </Card>
                )}

                {perfUploadState === "success" && (
                  <Card
                    p="md"
                    radius="md"
                    style={{
                      background: isDark ? "rgba(51, 154, 240, 0.16)" : "var(--mantine-color-blue-0)",
                      border: isDark ? "1px solid rgba(51, 154, 240, 0.35)" : undefined,
                      opacity: 0.8,
                    }}
                  >
                    <Group gap="sm">
                      <IconCheck size={20} color="var(--mantine-color-blue-filled)" />
                      <Text size="sm" fw={600} c={isDark ? "blue.3" : "blue.9"}>
                        ✨ 🤖 AI 辨識完成，請確認以下數據
                      </Text>
                    </Group>
                  </Card>
                )}

                {/* Section 4: Data fields (Visible only under Performance Tab for AI connection) */}
                <Stack gap="xs" mt="sm">
                  <SimpleGrid cols={2} spacing="md">
                    <NumberInput label="上線日期 (選填)" placeholder="YYYY / MM / DD" disabled={perfUploadState === 'recognizing'} />
                    <NumberInput label="觸及人數" name="reach" value={metrics.reach} onChange={(v) => setMetrics(m => ({ ...m, reach: Number(v) }))}
                      disabled={perfUploadState === 'recognizing'}
                      rightSection={perfUploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                      styles={{ input: { borderColor: perfUploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
                    />
                    <NumberInput label="曝光數" name="impressions" value={metrics.impressions} onChange={(v) => setMetrics(m => ({ ...m, impressions: Number(v) }))}
                      disabled={perfUploadState === 'recognizing'}
                      rightSection={perfUploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                      styles={{ input: { borderColor: perfUploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
                    />
                    <NumberInput label="按讚數" name="likes" value={metrics.likes} onChange={(v) => setMetrics(m => ({ ...m, likes: Number(v) }))}
                      disabled={perfUploadState === 'recognizing'}
                      rightSection={perfUploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                      styles={{ input: { borderColor: perfUploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
                    />
                    <NumberInput label="留言數" name="comments" value={metrics.comments} onChange={(v) => setMetrics(m => ({ ...m, comments: Number(v) }))}
                      disabled={perfUploadState === 'recognizing'}
                      rightSection={perfUploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                      styles={{ input: { borderColor: perfUploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
                    />
                    <NumberInput label="分享數" value={metrics.shares} onChange={(v) => setMetrics(m => ({ ...m, shares: Number(v) }))}
                      disabled={perfUploadState === 'recognizing'}
                      rightSection={perfUploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                      styles={{ input: { borderColor: perfUploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
                    />
                    <NumberInput label="收藏數" value={metrics.saves} onChange={(v) => setMetrics(m => ({ ...m, saves: Number(v) }))}
                      disabled={perfUploadState === 'recognizing'}
                      rightSection={perfUploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                      styles={{ input: { borderColor: perfUploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
                    />
                    <NumberInput label="觀看次數" value={metrics.views} onChange={(v) => setMetrics(m => ({ ...m, views: Number(v) }))}
                      disabled={perfUploadState === 'recognizing'}
                      rightSection={perfUploadState === 'success' ? <Text size="xs" c="blue">✨</Text> : null}
                      styles={{ input: { borderColor: perfUploadState === 'success' ? 'var(--mantine-color-blue-filled)' : undefined } }}
                    />

                    <TextInput
                      label="互動率 (系統運算)"
                      value={`${engagementRate}%`}
                      readOnly
                      variant="filled"
                      styles={{ input: { backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))', fontWeight: 600 } }}
                    />
                  </SimpleGrid>
                </Stack>
              </Stack>
            )}

          </Box>

          <Group justify="space-between" mt="md">
            <Button type="button" variant="default" onClick={closeAndReset}>取消</Button>
            <Button color="blue" type="submit" loading={fetcher.state !== "idle"}>儲存成效</Button>
          </Group>
        </Stack>
      </fetcher.Form>
    </Modal>
  );
}
