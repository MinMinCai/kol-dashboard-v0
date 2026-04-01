import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Modal,
  Checkbox,
  Avatar,
  Divider,
  ThemeIcon,
  ActionIcon,
  Tooltip,
  Progress,
  TextInput,
  Box,
  FileInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useFetcher,
} from "@remix-run/react";
import { useNotificationStore } from "~/store/notification";
import { useState, useEffect } from "react";
import {
  IconFileTypePpt,
  IconTrash,
  IconDownload,
  IconRefresh,
  IconBulb,
  IconRobot,
  IconCheck,
  IconX,
  IconTemplate,
  IconFile,
  IconClockHour4,
  IconFileDescription,
  IconPencil,
  IconUpload,
  IconCloudUpload
} from "@tabler/icons-react";
import { listInsertionOrders, updateInsertionOrder, deleteInsertionOrder, type InsertionOrder } from "~/lib/mock-api.server";


type TimeFilter = "all" | "last30" | "last90" | "thisYear";

function numberShort(value: number | undefined): string {
  const n = value ?? 0;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return `${n}`;
}

function matchesTime(order: InsertionOrder, filter: TimeFilter): boolean {
  if (filter === "all") return true;
  const start = new Date(order.startDate);
  const now = new Date("2026-03-06T00:00:00Z");
  if (filter === "thisYear") return start.getUTCFullYear() === 2026;
  const diffDays = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  if (filter === "last30") return diffDays <= 30;
  if (filter === "last90") return diffDays <= 90;
  return true;
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const clientFilter = url.searchParams.get("client") ?? "";
    const industryFilter = url.searchParams.get("industry") ?? "";
    const timeFilter = (url.searchParams.get("time") ?? "all") as TimeFilter;
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const pageSize = Number(url.searchParams.get("pageSize") ?? "5");

    const allOrders = await listInsertionOrders().catch(() => []);

    const allClients = Array.from(new Set(allOrders.map((o) => o.clientName)));
    const allIndustries = Array.from(
      new Set(allOrders.map((o) => o.industry).filter(Boolean) as string[])
    );

    const q = search.trim().toLowerCase();
    const filtered = allOrders.filter((order) => {
      const textMatch =
        !q ||
        order.orderNo.toLowerCase().includes(q) ||
        (order.title ?? "").toLowerCase().includes(q) ||
        order.clientName.toLowerCase().includes(q);
      if (!textMatch) return false;
      if (clientFilter && order.clientName !== clientFilter) return false;
      if (industryFilter && order.industry !== industryFilter) return false;
      if (!matchesTime(order, timeFilter)) return false;
      return true;
    });

    const stats = {
      total: filtered.length,
      budget: filtered.reduce((sum, o) => sum + (o.totalBudget ?? 0), 0),
      reach: filtered.reduce((sum, o) => sum + (o.totalReach ?? 0), 0),
      engagement: filtered.reduce((sum, o) => sum + (o.totalEngagement ?? 0), 0),
    };

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return json({
      rows,
      stats,
      totalPages,
      currentPage,
      pageSize,
      allClients,
      allIndustries,
      search,
      clientFilter,
      industryFilter,
      timeFilter,
    });
  } catch (error: any) {
    console.error("Loader error in IO list:", error);
    throw new Response(error.message || "Internal Server Error", { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "deleteOrder") {
    const orderId = formData.get("orderId") as string;
    if (orderId) await deleteInsertionOrder(orderId);
    return json({ success: true });
  }

  if (intent === "generateReport") {
    const orderId = formData.get("orderId") as string;
    if (orderId) {
      const { getInsertionOrder } = await import("~/lib/mock-api.server");
      const io = await getInsertionOrder(orderId);
      if (io) {
        const newReport = {
          id: `rep_${Date.now()}`,
          name: `結案報告_v${(io.reports?.filter(r => r.type === "draft").length || 0) + 1}.pptx`,
          type: "draft" as const,
          createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
          createdBy: "系統 AI",
        };
        await updateInsertionOrder(orderId, { 
          hasDraft: true,
          reports: [...(io.reports || []), newReport]
        });
      }
    }
    return json({ success: true });
  }

  return json({ success: false }, { status: 400 });
}

function formatShortDate(date: string): string {

  if (!date) return "-";
  return date.slice(0, 7);
}

export default function InsertionOrderListPage() {
  const {
    rows,
    stats,
    totalPages,
    currentPage,
    pageSize,
    allClients,
    allIndustries,
    search,
    clientFilter,
    industryFilter,
    timeFilter,
  } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const { showToast, showBanner } = useNotificationStore();

  // ── Delete Confirm State ──
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const handleAskDelete = (order: InsertionOrder) => {
    setDeleteTarget({ id: order.id, title: order.title ?? order.orderNo });
    openDeleteModal();
  };

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
    // Pre-select KOLs that have performance data
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
            { intent: "generateReport", orderId: activeOrder.id },
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


  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>委刊單管理</Title>
        <Group>
          <Button component={Link} to="/insertion-orders/new">新增委刊單</Button>
        </Group>
      </Group>

      {/* ── Server-driven filter form ── */}
      <form method="get" style={{ display: "contents" }}>
        <Stack gap="sm">
          <Group align="end" wrap="wrap">
            {/* Search */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                搜尋
              </label>
              <input
                name="search"
                defaultValue={search}
                placeholder="搜尋委刊單編號、標題或客戶"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  background: "var(--mantine-color-body)",
                  color: "var(--mantine-color-text)",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Client */}
            <div>
              <label htmlFor="filter-client" style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>客戶</label>
              <select
                id="filter-client"
                name="client"
                defaultValue={clientFilter}
                style={{
                  padding: "8px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  background: "var(--mantine-color-body)",
                  color: "var(--mantine-color-text)",
                  minWidth: 140,
                }}
              >
                <option value="">全部</option>
                {allClients.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="filter-industry" style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>產業</label>
              <select
                id="filter-industry"
                name="industry"
                defaultValue={industryFilter}
                style={{
                  padding: "8px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  background: "var(--mantine-color-body)",
                  color: "var(--mantine-color-text)",
                  minWidth: 140,
                }}
              >
                <option value="">全部</option>
                {allIndustries.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div>
              <label htmlFor="filter-time" style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>時間</label>
              <select
                id="filter-time"
                name="time"
                defaultValue={timeFilter}
                style={{
                  padding: "8px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  background: "var(--mantine-color-body)",
                  color: "var(--mantine-color-text)",
                  minWidth: 140,
                }}
              >
                <option value="all">全部</option>
                <option value="last30">近 30 天</option>
                <option value="last90">近 90 天</option>
                <option value="thisYear">2026 年</option>
              </select>
            </div>

            {/* Page size */}
            <input type="hidden" name="pageSize" value={pageSize} />

            <button
              type="submit"
              style={{
                padding: "8px 20px",
                background: "var(--mantine-color-blue-filled)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              套用篩選
            </button>

            {(search || clientFilter || industryFilter || timeFilter !== "all") && (
              <a
                href="/insertion-orders"
                style={{
                  padding: "8px 16px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  textDecoration: "none",
                  color: "var(--mantine-color-text)",
                  background: "var(--mantine-color-body)",
                }}
              >
                清除篩選
              </a>
            )}
          </Group>
        </Stack>
      </form>

      {/* ── Stats ── */}
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="sm">
        <Card withBorder>
          <Text c="dimmed" size="sm">委刊單數</Text>
          <Title order={3}>{stats.total}</Title>
        </Card>
        <Card withBorder>
          <Text c="dimmed" size="sm">總預算</Text>
          <Title order={3}>NT$ {stats.budget.toLocaleString()}</Title>
        </Card>
        <Card withBorder>
          <Text c="dimmed" size="sm">總觸及</Text>
          <Title order={3}>{numberShort(stats.reach)}</Title>
        </Card>
        <Card withBorder>
          <Text c="dimmed" size="sm">總互動</Text>
          <Title order={3}>{numberShort(stats.engagement)}</Title>
        </Card>
      </SimpleGrid>

      {/* ── List ── */}
      {rows.length === 0 ? (
        <Card withBorder p="xl" style={{ textAlign: "center" }}>
          <Text size="48px">📄</Text>
          <Title order={3}>尚無委刊單</Title>
          <Text c="dimmed" mb="md">調整篩選條件，或建立您的第一個委刊單</Text>
          <Button component={Link} to="/insertion-orders/new">開始建立</Button>
        </Card>
      ) : (
        <Stack gap="md">
          {rows.map((order) => {
            return (
              <Card key={order.id} withBorder className="io-card">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Text fw={600}>📋 #{order.orderNo} {order.title ?? "未命名專案"}</Text>
                  </Group>

                  <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <Text size="sm">客戶: {order.clientName} | 產業: {order.industry ?? "-"}</Text>
                    <Text size="sm">負責業務: {order.salesOwner ?? "-"} | KOL窗口: {order.kolManager ?? "-"}</Text>
                  </SimpleGrid>

                  <SimpleGrid cols={{ base: 2, md: 5 }}>
                    <Text size="sm">合作 KOL: {order.kolCount ?? 0} 位</Text>
                    <Text size="sm">總預算: NT$ {(order.totalBudget ?? 0).toLocaleString()}</Text>
                    <Text size="sm">平均評價: ⭐ {(order.avgRating ?? 0).toFixed(1)}</Text>
                    <Text size="sm">總觸及: {numberShort(order.totalReach)}</Text>
                    <Text size="sm">總互動: {numberShort(order.totalEngagement)}</Text>
                  </SimpleGrid>

                  <Group justify="space-between">
                    <Group>
                      <Button component={Link} to={`/insertion-orders/${order.id}`}>查看詳情</Button>
                      <Button variant="default" onClick={() => handleOpenGenModal(order)}>📊 產生報告</Button>
                    </Group>
                    <ActionIcon
                      variant="light"
                      color="red"
                      size="lg"
                      title="刪除委刊單"
                      onClick={() => handleAskDelete(order)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <Group justify="space-between" align="center">
          <Group>
            <Text size="sm" c="dimmed">每頁筆數</Text>
            <form method="get" style={{ display: "inline" }}>
              <input type="hidden" name="search" value={search} />
              <input type="hidden" name="client" value={clientFilter} />
              <input type="hidden" name="industry" value={industryFilter} />
              <input type="hidden" name="time" value={timeFilter} />
              <input type="hidden" name="page" value="1" />
              <select
                aria-label="每頁筆數"
                name="pageSize"
                defaultValue={pageSize}
                onChange={(e) => (e.currentTarget.form as HTMLFormElement).submit()}
                style={{
                  padding: "6px 10px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  background: "var(--mantine-color-body)",
                  color: "var(--mantine-color-text)",
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </form>
          </Group>

          <Group gap={4}>
            {currentPage > 1 && (
              <a
                href={`/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&time=${timeFilter}&page=${currentPage - 1}&pageSize=${pageSize}`}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  textDecoration: "none",
                  color: "var(--mantine-color-text)",
                  fontSize: 14,
                }}
              >
                ‹ 上一頁
              </a>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&time=${timeFilter}&page=${p}&pageSize=${pageSize}`}
                style={{
                  padding: "6px 10px",
                  border: p === currentPage ? "1px solid var(--mantine-color-blue-filled)" : "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  textDecoration: "none",
                  background: p === currentPage ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-body)",
                  color: p === currentPage ? "#fff" : "var(--mantine-color-text)",
                  fontSize: 14,
                  fontWeight: p === currentPage ? 600 : 400,
                }}
              >
                {p}
              </a>
            ))}

            {currentPage < totalPages && (
              <a
                href={`/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&time=${timeFilter}&page=${currentPage + 1}&pageSize=${pageSize}`}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  textDecoration: "none",
                  color: "var(--mantine-color-text)",
                  fontSize: 14,
                }}
              >
                下一頁 ›
              </a>
            )}
          </Group>
        </Group>
      )}
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
            <Card withBorder bg="gray.0" p="sm" radius="md">
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
                        bg="orange.0"
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
                <Card bg="blue.0" p="sm" radius="md" mt="xs">
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

                <Card bg="gray.0" p="sm" radius="md">
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
                    <ThemeIcon color="green" size={20} radius="xl" variant="filled"><IconCheck size={14}/></ThemeIcon>
                  ) : isCurrent ? (
                    <ThemeIcon color="blue" size={20} radius="xl" variant="light"><IconRobot size={14}/></ThemeIcon>
                  ) : (
                    <ThemeIcon color="gray" size={20} radius="xl" variant="light"><IconClockHour4 size={14}/></ThemeIcon>
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
        opened={deleteModalOpen}
        onClose={() => { closeDeleteModal(); setDeleteTarget(null); }}
        title="確認刪除委刊單"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            確定要刪除「{deleteTarget?.title}」嗎？此動作無法復原。
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => { closeDeleteModal(); setDeleteTarget(null); }}>
              取消
            </Button>
            <Form method="post" onSubmit={() => { closeDeleteModal(); setDeleteTarget(null); }}>
              <input type="hidden" name="intent" value="deleteOrder" />
              <input type="hidden" name="orderId" value={deleteTarget?.id ?? ""} />
              <Button type="submit" color="red">確認刪除</Button>
            </Form>
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
    </Stack>
  );
}
