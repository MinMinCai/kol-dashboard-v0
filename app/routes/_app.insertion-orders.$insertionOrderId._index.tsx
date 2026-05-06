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
import { Menu, ActionIcon } from "@mantine/core";
import { IconPencil, IconCheck, IconChevronDown, IconTrash, IconDotsVertical } from "@tabler/icons-react";
import { ClientOnly } from "~/components/ClientOnly";
import { DemoGenerateReportModal } from "~/components/DemoGenerateReportModal";
import {
  getInsertionOrder,
  upsertIOReviewByAuthor,
  updateIOPerformance,
  updatePerformanceItem,
  deletePerformanceItem,
  listBrandCatalog,
  listIndustryCatalog,
  listTeamMembers,
  updateInsertionOrder,
  deleteInsertionOrder,
  type OrderKolCollaboration,
  type OrderPerformanceItem,
  type OrderReview,
} from "~/lib/mock-api.server";
import { getCurrentMember } from "~/lib/demo-identity.server";
import styles from "./_app.insertion-orders.$insertionOrderId._index.module.css";

function n(value: number | undefined): string {
  // Use a stable locale to prevent hydration mismatch
  return (value ?? 0).toLocaleString("zh-TW");
}
function currency(value: number | undefined): string {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}

// ── KolCollabCard: 獨立子元件 ──
type ReviewGroup = {
  author: string;
  rating: number;
  date: string;
  internal?: OrderReview;
  external?: OrderReview;
};

function groupReviewsByAuthor(reviews: OrderReview[] | undefined): ReviewGroup[] {
  const map = new Map<string, ReviewGroup>();
  for (const rv of reviews ?? []) {
    const existing = map.get(rv.author);
    if (existing) {
      // newest date wins for the group's date label; rating taken from latest
      if (rv.date > existing.date) {
        existing.date = rv.date;
        existing.rating = rv.rating;
      }
      if (rv.type === "internal") existing.internal = rv;
      else if (rv.type === "external") existing.external = rv;
      else existing.external = rv; // legacy entries without type → fall into external
    } else {
      const group: ReviewGroup = {
        author: rv.author,
        rating: rv.rating,
        date: rv.date,
      };
      if (rv.type === "internal") group.internal = rv;
      else if (rv.type === "external") group.external = rv;
      else group.external = rv;
      map.set(rv.author, group);
    }
  }
  return Array.from(map.values()).sort((a, b) => (b.date > a.date ? 1 : -1));
}

function authorInitial(name: string): string {
  if (!name) return "?";
  const trimmed = name.trim();
  // For mixed scripts, take first character (Chinese uses 1 char, English first letter)
  return trimmed.charAt(0).toUpperCase();
}

function KolCollabCard({
  kol,
  currentUserName,
  onOpenUploadAndPerf,
  onOpenReview,
  onEditReview,
  onEditPerformance,
  onDeletePerformance,
}: {
  kol: OrderKolCollaboration;
  currentUserName: string;
  onOpenUploadAndPerf: (k: { id: string; name: string }) => void;
  onOpenReview: (k: { id: string; name: string }) => void;
  onEditReview: (k: { id: string; name: string }, group: ReviewGroup) => void;
  onEditPerformance: (k: { id: string; name: string }, item: OrderPerformanceItem) => void;
  onDeletePerformance: (k: { id: string; name: string }, item: OrderPerformanceItem) => void;
}) {
  const [expanded, { toggle }] = useDisclosure(false);
  const reviewGroups = groupReviewsByAuthor(kol.reviews);
  const displayRating = reviewGroups.length > 0
    ? reviewGroups.reduce((sum, g) => sum + g.rating, 0) / reviewGroups.length
    : (kol.rating ?? 0);

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
                    className={expanded ? `${styles.chevron} ${styles.chevronExpanded}` : styles.chevron}
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
                <Text fw={700} size="xl">{displayRating.toFixed(1)}</Text>
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
                      <Group justify="space-between" mb="xs" wrap="nowrap">
                        <Text size="sm" fw={700}>{perf.title}</Text>
                        <Group gap={4} wrap="nowrap">
                          <Badge size="xs">已追蹤</Badge>
                          <Menu position="bottom-end" withinPortal shadow="md" width={140}>
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray" size="sm" aria-label="操作">
                                <IconDotsVertical size={14} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={<IconPencil size={14} />}
                                onClick={() => onEditPerformance({ id: kol.kolId ?? kol.id, name: kol.name }, perf)}
                              >
                                編輯
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<IconTrash size={14} />}
                                color="red"
                                onClick={() => onDeletePerformance({ id: kol.kolId ?? kol.id, name: kol.name }, perf)}
                              >
                                刪除
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>
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
                <Text size="sm" c="dimmed" p="md" ta="center" className={styles.emptyBox}>
                  尚無成效數據
                </Text>
              )}
            </Box>

            <Divider variant="dashed" />

            {/* 合作評價 */}
            <Box>
              <Text fw={600} size="sm" mb="md">合作評價</Text>
              {reviewGroups.length > 0 ? (
                <Stack gap="xs">
                  {reviewGroups.map((g) => {
                    const isOwn = g.author === currentUserName;
                    return (
                      <Card key={g.author} withBorder p="sm" radius="md">
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                          <Group gap="xs" align="center">
                            <Avatar size="sm" radius="xl" color="blue" variant="filled">
                              {authorInitial(g.author)}
                            </Avatar>
                            <Stack gap={0}>
                              <Group gap={6}>
                                <Text size="sm" fw={600}>{g.author}</Text>
                                {isOwn && <Badge size="xs" variant="light" color="gray">我</Badge>}
                              </Group>
                              <Text size="xs" c="dimmed">{g.date}</Text>
                            </Stack>
                          </Group>
                          <Group gap="xs" wrap="nowrap">
                            <Rating value={g.rating} readOnly size="xs" />
                            {isOwn && (
                              <Menu position="bottom-end" withinPortal shadow="md" width={120}>
                                <Menu.Target>
                                  <ActionIcon variant="subtle" color="gray" size="sm" aria-label="編輯評價">
                                    <IconDotsVertical size={14} />
                                  </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                  <Menu.Item
                                    leftSection={<IconPencil size={14} />}
                                    onClick={() => onEditReview({ id: kol.kolId ?? kol.id, name: kol.name }, g)}
                                  >
                                    編輯
                                  </Menu.Item>
                                </Menu.Dropdown>
                              </Menu>
                            )}
                          </Group>
                        </Group>
                        <Stack gap={6} mt="xs">
                          {g.external && (
                            <Group gap="xs" align="flex-start" wrap="nowrap">
                              <Badge size="xs" color="blue" mt={2}>外評</Badge>
                              <Text size="sm" flex={1}>{g.external.comment}</Text>
                            </Group>
                          )}
                          {g.internal && (
                            <Group gap="xs" align="flex-start" wrap="nowrap">
                              <Badge size="xs" color="red" mt={2}>內評</Badge>
                              <Text size="sm" c="dimmed" flex={1}>{g.internal.comment}</Text>
                            </Group>
                          )}
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              ) : (
                <Text size="sm" c="dimmed" p="md" ta="center" className={styles.emptyBox}>
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

export async function loader({ params, request }: LoaderFunctionArgs) {
  const insertionOrderId = params.insertionOrderId ?? "";
  try {
    function withTimeout<T,>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
      return Promise.race([promise, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))]);
    }
    const [insertionOrder, brandCatalog, industryCatalog, teamMembers, currentMember] = await Promise.all([
      withTimeout(getInsertionOrder(insertionOrderId), null),
      withTimeout(listBrandCatalog(), []),
      withTimeout(listIndustryCatalog(), []),
      withTimeout(listTeamMembers(), []),
      withTimeout(getCurrentMember(request), null),
    ]);

    if (!insertionOrder) {
      throw new Response("Not Found", { status: 404 });
    }

    const salesOwners = (teamMembers ?? []).filter(m => m.group === 'AE').map(m => m.name);
    const kolManagers = (teamMembers ?? []).filter(m => m.group === 'KOL').map(m => m.name);
    const brands = (brandCatalog ?? []).map(b => b.name);
    const industries = (industryCatalog ?? []).map(i => i.name);
    const currentUserName = currentMember?.name ?? "";

    return json({ insertionOrder, salesOwners, kolManagers, brands, industries, currentUserName });
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
    const currentMember = await getCurrentMember(request);
    const author = currentMember?.name ?? "Demo User";

    await upsertIOReviewByAuthor(orderId, kolId, author, {
      rating,
      internalComment,
      externalComment,
    });
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

  if (intent === "performanceUpdate") {
    const kolId = formData.get("kolId") as string;
    const performanceId = formData.get("performanceId") as string;
    const title = formData.get("title") as string;
    const impressions = Number(formData.get("impressions"));
    const reach = Number(formData.get("reach"));
    const likes = Number(formData.get("likes"));
    const comments = Number(formData.get("comments"));

    await updatePerformanceItem(orderId, kolId, performanceId, {
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

  if (intent === "performanceDelete") {
    const kolId = formData.get("kolId") as string;
    const performanceId = formData.get("performanceId") as string;
    await deletePerformanceItem(orderId, kolId, performanceId);
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
  const { insertionOrder, salesOwners, kolManagers, brands, industries, currentUserName } = useLoaderData<typeof loader>();
  const collaborations = insertionOrder.collaborations ?? [];
  const fetcher = useFetcher();
  const submit = useSubmit();
  const [isEditing, setIsEditing] = useState(false);
  const { description, internalNotes } = parseNotes((insertionOrder as any).notes);

  // ── Report Generation State ──
  const [genModalOpen, { open: openGenModal, close: closeGenModal }] = useDisclosure(false);

  const handleGenerateComplete = () => {
    fetcher.submit(
      { intent: "generateReport" },
      { method: "post" }
    );
  };

  // Modal states
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const [reviewOpened, { open: openReview, close: closeReview }] =
    useDisclosure(false);
  const [perfModalOpened, { open: openPerfModal, close: closePerfModal }] =
    useDisclosure(false);
  const [perfDeleteOpened, { open: openPerfDelete, close: closePerfDelete }] =
    useDisclosure(false);

  const [selectedKol, setSelectedKol] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editingPerformance, setEditingPerformance] = useState<OrderPerformanceItem | null>(null);
  const [deletingPerformance, setDeletingPerformance] = useState<OrderPerformanceItem | null>(null);
  const [editingReview, setEditingReview] = useState<{
    rating: number;
    internalComment: string;
    externalComment: string;
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
    setEditingReview(null);
    openReview();
  };

  const handleEditReview = (
    kol: { id: string; name: string },
    group: { rating: number; internal?: { comment: string } | undefined; external?: { comment: string } | undefined },
  ) => {
    setSelectedKol(kol);
    setEditingReview({
      rating: group.rating,
      internalComment: group.internal?.comment ?? "",
      externalComment: group.external?.comment ?? "",
    });
    openReview();
  };

  const handleEditPerformance = (
    kol: { id: string; name: string },
    item: OrderPerformanceItem,
  ) => {
    setSelectedKol(kol);
    setEditingPerformance(item);
    openPerfModal();
  };

  const handleDeletePerformance = (
    kol: { id: string; name: string },
    item: OrderPerformanceItem,
  ) => {
    setSelectedKol(kol);
    setDeletingPerformance(item);
    openPerfDelete();
  };

  const handleOpenUploadAndPerf = (kol: { id: string; name: string }) => {
    setSelectedKol(kol);
    setEditingPerformance(null);
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
          <Button onClick={openGenModal}>
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
                  <Text size="sm" className={styles.preWrapText}>{description}</Text>
                </Box>
              )}
              {internalNotes && (
                <Box
                  mt="xs"
                  p="sm"
                  className={styles.internalNotesBlock}
                >
                  <Text size="xs" fw={700} c="dimmed" mb={4}>🔒 內部備註</Text>
                  <Text size="sm" c="dimmed" className={styles.preWrapText}>{internalNotes}</Text>
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
        <ClientOnly fallback={<Box h={250} className={styles.chartFallback} />}>
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
              currentUserName={currentUserName}
              onOpenUploadAndPerf={handleOpenUploadAndPerf}
              onOpenReview={handleOpenReview}
              onEditReview={handleEditReview}
              onEditPerformance={handleEditPerformance}
              onDeletePerformance={handleDeletePerformance}
            />
          ))}
        </Stack>
      </Card>

      {/* ── Modals ── */}
      <PerformanceModal
        opened={perfModalOpened}
        onClose={() => { closePerfModal(); setEditingPerformance(null); }}
        insertionOrder={insertionOrder}
        selectedKol={selectedKol}
        fetcher={fetcher}
        editingItem={editingPerformance}
      />

      <Modal
        opened={perfDeleteOpened}
        onClose={() => { closePerfDelete(); setDeletingPerformance(null); }}
        title="確認刪除成效資料"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            確定要刪除「{deletingPerformance?.title ?? ""}」這筆成效資料嗎？此動作無法復原。
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => { closePerfDelete(); setDeletingPerformance(null); }}>
              取消
            </Button>
            <fetcher.Form
              method="post"
              onSubmit={() => { closePerfDelete(); setDeletingPerformance(null); }}
            >
              <input type="hidden" name="intent" value="performanceDelete" />
              <input type="hidden" name="kolId" value={selectedKol?.id ?? ""} />
              <input type="hidden" name="performanceId" value={deletingPerformance?.id ?? ""} />
              <Button type="submit" color="red" loading={fetcher.state !== "idle"}>
                確認刪除
              </Button>
            </fetcher.Form>
          </Group>
        </Stack>
      </Modal>

      <Modal
        id="review-modal"
        key={editingReview ? "edit" : "new"}
        opened={reviewOpened}
        onClose={() => { closeReview(); setEditingReview(null); }}
        title={`${editingReview ? "編輯評價" : "留下評價"} - ${selectedKol?.name}`}
      >
        <fetcher.Form method="post" onSubmit={() => { closeReview(); setEditingReview(null); }}>
          <input type="hidden" name="intent" value="review" />
          <input type="hidden" name="kolId" value={selectedKol?.id} />
          <Stack gap="md">
            <Stack gap={5}>
              <Text size="sm" fw={500}>
                星級評分
              </Text>
              <Rating defaultValue={editingReview?.rating ?? 4.5} name="rating" fractions={2} />
            </Stack>
            <Textarea
              label="內部評論 (僅限同仁查看)"
              name="internalComment"
              placeholder="例如：溝通積極、素材品質高..."
              defaultValue={editingReview?.internalComment ?? ""}
              rows={3}
            />
            <Textarea
              label="外部評論 (可用於結案報告)"
              name="externalComment"
              placeholder="例如：受眾反饋熱烈，轉單效果佳..."
              defaultValue={editingReview?.externalComment ?? ""}
              rows={3}
            />
            <Group justify="flex-end">
              <Button type="button" variant="default" onClick={() => { closeReview(); setEditingReview(null); }}>
                取消
              </Button>
              <Button color="yellow" type="submit" loading={isSubmitting}>
                {editingReview ? "儲存修改" : "提交評價"}
              </Button>
            </Group>
          </Stack>
        </fetcher.Form>
      </Modal>

      <DemoGenerateReportModal
        opened={genModalOpen}
        onClose={closeGenModal}
        order={insertionOrder}
        onComplete={handleGenerateComplete}
      />

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

    </Stack >
  );
}

function PerformanceModal({ opened, onClose, insertionOrder, selectedKol, fetcher, editingItem }: any) {
  const isEditing = Boolean(editingItem);

  const [activeTab, setActiveTab] = useState<"post" | "performance">("performance");

  const [postUploadState, setPostUploadState] = useState<"idle" | "uploading" | "success">("idle");
  const [postImages, setPostImages] = useState<string[]>([]);

  const [perfUploadState, setPerfUploadState] = useState<"idle" | "uploading" | "recognizing" | "success">("idle");
  const [perfImages, setPerfImages] = useState<string[]>([]);

  type MetricKey = "impressions" | "reach" | "likes" | "comments" | "shares" | "saves" | "views";
  const ZERO_METRICS: Record<MetricKey, number> = {
    impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0, saves: 0, views: 0,
  };

  // Simulated form state
  const [metrics, setMetrics] = useState<Record<MetricKey, number>>(ZERO_METRICS);
  // Fields the user has manually edited — AI will not overwrite these
  const [lockedFields, setLockedFields] = useState<Set<MetricKey>>(new Set());
  // How many screenshots have been processed (cycles mock extraction patterns)
  const [extractionCount, setExtractionCount] = useState(0);

  // Mock partial extraction per screenshot — simulates that real screenshots
  // typically only contain a subset of metrics (IG post stats vs reels stats vs etc.)
  const MOCK_EXTRACTION_PATTERNS: Array<Partial<Record<MetricKey, number>>> = [
    { impressions: 12500, reach: 8400, likes: 1200 },          // 1st: post insights top
    { comments: 45, shares: 20, saves: 150 },                  // 2nd: engagement breakdown
    { views: 9500, likes: 1280 },                              // 3rd: reels/video stats
  ];

  // Prefill when editing an existing item
  useEffect(() => {
    if (!opened) return;
    if (editingItem) {
      const m = editingItem.metrics ?? {};
      setMetrics({
        impressions: m.impressions ?? 0,
        reach: m.reach ?? 0,
        likes: m.likes ?? 0,
        comments: m.comments ?? 0,
        shares: m.shares ?? 0,
        saves: m.saves ?? 0,
        views: m.views ?? 0,
      });
      setPerfImages(editingItem.performanceScreenshots ?? []);
      setPostImages(editingItem.postScreenshots ?? []);
      setPerfUploadState((editingItem.performanceScreenshots ?? []).length > 0 ? "success" : "idle");
      setPostUploadState((editingItem.postScreenshots ?? []).length > 0 ? "success" : "idle");
      // In edit mode, treat all existing values as user-confirmed (locked) so re-uploads don't clobber
      const filled = new Set<MetricKey>();
      (Object.keys(ZERO_METRICS) as MetricKey[]).forEach((k) => {
        if ((m as any)[k] != null && (m as any)[k] !== 0) filled.add(k);
      });
      setLockedFields(filled);
    }
  }, [opened, editingItem]);

  // Non-empty wins merge: skip locked fields, only overwrite with non-null/non-zero values
  const mergeNonEmptyWins = (
    prev: Record<MetricKey, number>,
    incoming: Partial<Record<MetricKey, number>>,
    locked: Set<MetricKey>,
  ): Record<MetricKey, number> => {
    const next = { ...prev };
    (Object.keys(incoming) as MetricKey[]).forEach((k) => {
      if (locked.has(k)) return;
      const v = incoming[k];
      if (v != null && v !== 0) next[k] = v;
    });
    return next;
  };

  // Wrap setMetrics for user-driven field changes — also marks the field as locked
  const handleMetricChange = (field: MetricKey, value: number) => {
    setMetrics((m) => ({ ...m, [field]: value }));
    setLockedFields((prev) => {
      const next = new Set(prev);
      next.add(field);
      return next;
    });
  };

  const handlePostFileChange = (files: File[]) => {
    if (files.length === 0) return;
    setPostUploadState("uploading");

    const urls = files.map(f => URL.createObjectURL(f));
    setPostImages((prev) => [...prev, ...urls]);

    setTimeout(() => {
      setPostUploadState("success");
    }, 1500);
  };

  const handlePerfFileChange = (files: File[]) => {
    if (files.length === 0) return;
    setPerfUploadState("uploading");

    const urls = files.map(f => URL.createObjectURL(f));
    setPerfImages((prev) => [...prev, ...urls]);

    setTimeout(() => {
      setPerfUploadState("recognizing");
      setTimeout(() => {
        setPerfUploadState("success");
        // Each uploaded file simulates one screenshot extraction; cycle through mock patterns
        files.forEach((_, i) => {
          const pattern = MOCK_EXTRACTION_PATTERNS[(extractionCount + i) % MOCK_EXTRACTION_PATTERNS.length];
          setMetrics((prev) => mergeNonEmptyWins(prev, pattern, lockedFields));
        });
        setExtractionCount((c) => c + files.length);
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
      setMetrics(ZERO_METRICS);
      setLockedFields(new Set());
      setExtractionCount(0);
    }, 300);
  };

  return (
    <Modal
      opened={opened}
      onClose={closeAndReset}
      title={<Text fw={600} size="lg">{isEditing ? "編輯成效數據" : "新增成效數據"}</Text>}
      size="700px"
    >
      <fetcher.Form method="post" onSubmit={closeAndReset}>
        <input type="hidden" name="intent" value={isEditing ? "performanceUpdate" : "performance"} />
        <input type="hidden" name="kolId" value={selectedKol?.id} />
        {isEditing && <input type="hidden" name="performanceId" value={editingItem?.id} />}

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
            <Box className={styles.tabNav}>
              <Group gap={0}>
                <button
                  type="button"
                  onClick={() => setActiveTab("post")}
                  className={activeTab === "post" ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                >
                  貼文圖片
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("performance")}
                  className={activeTab === "performance" ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                >
                  成效截圖
                </button>
              </Group>
            </Box>

            {/* Content for Post Images */}
            {activeTab === "post" && (
              <Stack gap="md">
                {postUploadState === "idle" && (
                  <Box className={styles.uploadDropzone}>
                    <FileInput
                      multiple
                      accept="image/*"
                      className={styles.fileInputOverlay}
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
                      <Image key={i} src={src} w={100} h={100} radius="md" className={styles.imageCover} />
                    ))}
                    <Box className={styles.uploadAddMore}>
                      <FileInput
                        multiple
                        accept="image/*"
                        className={styles.fileInputOverlay}
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
                  <Box className={styles.uploadDropzone}>
                    <FileInput
                      multiple
                      accept="image/*"
                      className={styles.fileInputOverlay}
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
                      <Image key={i} src={src} w={100} h={100} radius="md" className={styles.imageCover} />
                    ))}
                  </Group>
                )}

                {perfUploadState === "recognizing" && (
                  <Card
                    p="md"
                    radius="md"
                    className={styles.aiRecognizingCard}
                  >
                    <Group gap="sm">
                      <Loader color="blue" size="sm" />
                      <Text size="sm" fw={600} className={styles.aiCardText}>
                        ✨ 🤖 AI 正在辨識中...
                      </Text>
                    </Group>
                  </Card>
                )}

                {perfUploadState === "success" && (
                  <Card
                    p="md"
                    radius="md"
                    className={styles.aiSuccessCard}
                  >
                    <Group gap="sm">
                      <IconCheck size={20} color="var(--mantine-color-blue-filled)" />
                      <Text size="sm" fw={600} className={styles.aiCardText}>
                        ✨ 🤖 AI 辨識完成，請確認以下數據
                      </Text>
                    </Group>
                  </Card>
                )}

                {/* Section 4: Data fields (Visible only under Performance Tab for AI connection) */}
                <Stack gap="xs" mt="sm">
                  <Text size="xs" c="dimmed">
                    💡 AI 辨識結果僅供參考，請人工確認各欄位數值是否正確；可繼續上傳其他截圖補齊缺漏欄位（已修改的欄位不會被覆蓋）
                  </Text>
                  <SimpleGrid cols={2} spacing="md">
                    {(() => {
                      const fieldHint = (field: MetricKey) => {
                        if (lockedFields.has(field)) return <Text size="xs" c="orange">✏️</Text>;
                        if (perfUploadState === "success" && metrics[field] > 0) return <Text size="xs" c="blue">✨</Text>;
                        return null;
                      };
                      const fieldStyles = (field: MetricKey) => ({
                        input: {
                          borderColor: lockedFields.has(field)
                            ? 'var(--mantine-color-orange-filled)'
                            : (perfUploadState === 'success' && metrics[field] > 0)
                              ? 'var(--mantine-color-blue-filled)'
                              : undefined,
                        },
                      });
                      const numberInputProps = (field: MetricKey) => ({
                        value: metrics[field],
                        onChange: (v: string | number) => handleMetricChange(field, Number(v)),
                        disabled: perfUploadState === 'recognizing',
                        rightSection: fieldHint(field),
                        styles: fieldStyles(field),
                      });
                      return (
                        <>
                          <NumberInput label="上線日期 (選填)" placeholder="YYYY / MM / DD" disabled={perfUploadState === 'recognizing'} />
                          <NumberInput label="觸及人數" name="reach" {...numberInputProps("reach")} />
                          <NumberInput label="曝光數" name="impressions" {...numberInputProps("impressions")} />
                          <NumberInput label="按讚數" name="likes" {...numberInputProps("likes")} />
                          <NumberInput label="留言數" name="comments" {...numberInputProps("comments")} />
                          <NumberInput label="分享數" {...numberInputProps("shares")} />
                          <NumberInput label="收藏數" {...numberInputProps("saves")} />
                          <NumberInput label="觀看次數" {...numberInputProps("views")} />
                        </>
                      );
                    })()}

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
