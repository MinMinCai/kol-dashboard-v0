import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  Modal,
  Checkbox,
  Radio,
  Progress,
  Avatar,
  Divider,
  ThemeIcon,
  ActionIcon,
  Tooltip,
  SimpleGrid,
  Textarea,
  Select,
  FileButton
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { updateInsertionOrder, getInsertionOrder } from "~/lib/mock-api.server";
import { useNotificationStore } from "~/store/notification";
import { useState, useEffect, useRef } from "react";
import { listInsertionOrders } from "~/lib/mock-api.server";
import { generateReportPpt } from "~/lib/report-ppt.server";
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

function formatShortDate(date: string): string {
  return date.slice(0, 7);
}

type SortOption =
  | "order_no_asc"
  | "order_no_desc"
  | "date_desc"
  | "date_asc"
  | "title_az"
  | "title_za"
  | "budget_desc"
  | "budget_asc";

/** 依委刊單編號（IO-2026-001）數字排序；無法解析時退回字串比較 */
function compareOrderNo(a: string, b: string): number {
  const re = /^IO-(\d+)-(\d+)$/i;
  const ma = a.match(re);
  const mb = b.match(re);
  if (ma && mb) {
    const ya = Number(ma[1]);
    const yb = Number(mb[1]);
    if (ya !== yb) return ya - yb;
    return Number(ma[2]) - Number(mb[2]);
  }
  return a.localeCompare(b, "en");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const clientFilter = url.searchParams.get("client") ?? "";
  const timeFilter = url.searchParams.get("time") ?? "all";
  const statusFilter = url.searchParams.get("status") ?? "all";
  const sort = (url.searchParams.get("sort") ?? "order_no_asc") as SortOption;
  
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Number(url.searchParams.get("pageSize") ?? "5");
  

  const orders = await listInsertionOrders();
  const allClients = Array.from(new Set(orders.map((o) => o.clientName)));

  const mappedOrders = orders.map((order) => ({
    ...order,
    hasDraft: order.hasDraft ?? false,
    hasOfficial: order.hasOfficial ?? false,
    reports: order.reports ?? [],
  }));

  const filtered = mappedOrders.filter((order) => {
    if (clientFilter && order.clientName !== clientFilter) return false;
    if (timeFilter === "this_year" && !order.startDate.startsWith("2026")) return false;
    if (timeFilter === "2024_10" && !order.startDate.startsWith("2024-10")) return false;
    if (statusFilter === "draft" && !order.hasDraft) return false;
    if (statusFilter === "official" && !order.hasOfficial) return false;
    if (statusFilter === "none" && (order.hasDraft || order.hasOfficial)) return false;
    return true;
  });

  filtered.sort((a: any, b: any) => {
    switch (sort) {
      case "order_no_asc":
        return compareOrderNo(a.orderNo, b.orderNo);
      case "order_no_desc":
        return compareOrderNo(b.orderNo, a.orderNo);
      case "title_az":
        return (a.title ?? a.projectName ?? a.orderNo).localeCompare(
          b.title ?? b.projectName ?? b.orderNo,
          "zh-Hant",
        );
      case "title_za":
        return (b.title ?? b.projectName ?? b.orderNo).localeCompare(
          a.title ?? a.projectName ?? a.orderNo,
          "zh-Hant",
        );
      case "budget_desc":
        return (b.totalBudget ?? 0) - (a.totalBudget ?? 0);
      case "budget_asc":
        return (a.totalBudget ?? 0) - (b.totalBudget ?? 0);
      case "date_asc":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case "date_desc":
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return json({
    orders: paginatedOrders,
    allOrders: mappedOrders,
    allClients,
    clientFilter,
    timeFilter,
    statusFilter,
    sort,
    totalPages,
    currentPage,
    pageSize,
    totalCount: filtered.length
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "deleteReport") {
    const orderId = String(formData.get("orderId"));
    const reportId = String(formData.get("reportId"));

    const io = await getInsertionOrder(orderId);
    if (!io) return json({ ok: false }, { status: 404 });

    const updatedReports = (io.reports ?? []).filter((r) => r.id !== reportId);
    const stillHasDraft = updatedReports.some((r) => r.type === "draft");
    const stillHasOfficial = updatedReports.some((r) => r.type === "official");

    await updateInsertionOrder(orderId, {
      reports: updatedReports,
      hasDraft: stillHasDraft,
      hasOfficial: stillHasOfficial,
    });

    return json({ ok: true });
  }

  if (intent === "uploadReport") {
    const orderId = String(formData.get("orderId"));
    const fileName = String(formData.get("fileName"));
    const note = formData.get("note") ? String(formData.get("note")) : undefined;
    const isOfficial = formData.get("isOfficial") === "true";

    const io = await getInsertionOrder(orderId);
    if (!io) return json({ ok: false }, { status: 404 });
    const newReport = {
      id: `rep_${Date.now()}`,
      name: fileName,
      type: (isOfficial ? "official" : "draft") as "official" | "draft",
      createdAt: new Date().toISOString().slice(0, 10),
      createdBy: "手動上傳",
      note,
    };

    await updateInsertionOrder(orderId, {
      hasOfficial: isOfficial ? true : io.hasOfficial,
      hasDraft: !isOfficial ? true : io.hasDraft,
      reports: [...(io.reports ?? []), newReport],
    });

    return json({ ok: true });
  }

  if (intent === "generateReport") {
    const orderId = String(formData.get("orderId") ?? "");
    const reportTitle = String(formData.get("reportTitle") ?? "").trim();
    const templateKey = String(formData.get("templateKey") ?? "standard");
    const rawSelectedKolIds = String(formData.get("selectedKolIds") ?? "[]");

    const io = await getInsertionOrder(orderId);
    if (!io) return json({ ok: false }, { status: 404 });
    const parsedKolIds = (() => {
      try {
        const parsed = JSON.parse(rawSelectedKolIds);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch {
        return [];
      }
    })();

    const version = (io.reports?.filter((r) => r.type === "draft").length || 0) + 1;
    const newReport = {
      id: `rep_${Date.now()}`,
      name: reportTitle ? `${reportTitle}.pptx` : `結案報告_v${version}.pptx`,
      type: "draft" as const,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      createdBy: "系統 AI",
      templateKey,
      selectedKolIds: parsedKolIds,
      reportTitle: reportTitle || `結案報告_v${version}`,
    };
    const filePath = await generateReportPpt({
      order: io,
      report: newReport,
    });
    const reportWithFile = {
      ...newReport,
      filePath,
    };

    await updateInsertionOrder(orderId, {
      hasDraft: true,
      reports: [...(io.reports ?? []), reportWithFile],
    });

    return json({ ok: true, report: reportWithFile });
  }

  return json({ ok: false }, { status: 400 });
}

export default function ReportManagementPage() {
  const {
    orders,
    allOrders,
    allClients,
    clientFilter,
    timeFilter,
    statusFilter,
    sort,
    totalPages,
    currentPage,
    pageSize,
    totalCount,
  } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const { showToast, showBanner } = useNotificationStore();

  const uploadFetcher = useFetcher<typeof action>();
  const deleteFetcher = useFetcher<typeof action>();
  const generateFetcher = useFetcher<typeof action>();

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isOfficial, setIsOfficial] = useState(true);
  const [versionNote, setVersionNote] = useState("");

  const [genModalOpen, { open: openGenModal, close: closeGenModal }] = useDisclosure(false);
  const [progressModalOpen, { open: openProgressModal, close: closeProgressModal }] = useDisclosure(false);
  const [uploadModalOpen, { open: openUploadModal, close: closeUploadModal }] = useDisclosure(false);
  const [selectOrderModalOpen, { open: openSelectOrderModal, close: closeSelectOrderModal }] = useDisclosure(false);
  const [deleteReportModalOpen, { open: openDeleteReportModal, close: closeDeleteReportModal }] = useDisclosure(false);
  const [reportDeleteTarget, setReportDeleteTarget] = useState<{ id: string; name: string; orderId: string } | null>(null);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [selectedKolIds, setSelectedKolIds] = useState<string[]>([]);
  const [reportTitle, setReportTitle] = useState("");
  
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [orderSearch, setOrderSearch] = useState("");

  useEffect(() => {
    if (deleteFetcher.state === "idle" && deleteFetcher.data?.ok) {
      navigate(".", { replace: true });
    }
  }, [deleteFetcher.state, deleteFetcher.data, navigate]);

  useEffect(() => {
    if (generateFetcher.state !== "idle" || !generateFetcher.data?.ok || !generateFetcher.data.report || !activeOrder) {
      return;
    }

    closeProgressModal();
    const createdReport = generateFetcher.data.report;
    const title = "結案報告已生成完成！";
    const message = `${activeOrder.orderNo} ${activeOrder.title || activeOrder.projectName}|${createdReport.name}`;
    const downloadLink = `/api/reports/${activeOrder.id}/${createdReport.id}/download`;
    showToast(title, message, downloadLink);
    showBanner(title, message, downloadLink);
    navigate(".", { replace: true });

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("🎉 結案報告已完成", {
          body: `案件 #${activeOrder.orderNo} 的結案報告已生成完成，點擊查看`,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("🎉 結案報告已完成", {
              body: `案件 #${activeOrder.orderNo} 的結案報告已生成完成，點擊查看`,
            });
          }
        });
      }
    }
  }, [activeOrder, closeProgressModal, generateFetcher.data, generateFetcher.state, navigate, showBanner, showToast]);

  const handleDownload = (orderId: string, reportId: string) => {
    window.open(`/api/reports/${orderId}/${reportId}/download`, "_blank");
  };

  const handleAskDeleteReport = (report: { id: string; name: string; orderId: string }) => {
    setReportDeleteTarget(report);
    openDeleteReportModal();
  };

  const handleConfirmDeleteReport = () => {
    if (!reportDeleteTarget) return;
    const fd = new FormData();
    fd.append("intent", "deleteReport");
    fd.append("orderId", reportDeleteTarget.orderId);
    fd.append("reportId", reportDeleteTarget.id);
    deleteFetcher.submit(fd, { method: "post" });
    closeDeleteReportModal();
    setReportDeleteTarget(null);
  };
  const handleOpenUploadModal = (order: any) => {
    setActiveOrder(order);
    setUploadFile(null);
    setUploadProgress(null);
    setUploadSuccess(false);
    setIsOfficial(true);
    setVersionNote("");
    openUploadModal();
  };

  const startOfficialUpload = () => {
    if (!uploadFile || !activeOrder) return;
    setUploadProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      if (p >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        // Submit to backend
        const fd = new FormData();
        fd.append("intent", "uploadReport");
        fd.append("orderId", activeOrder.id);
        fd.append("fileName", uploadFile.name);
        fd.append("isOfficial", String(isOfficial));
        if (versionNote) fd.append("note", versionNote);
        uploadFetcher.submit(fd, { method: "post" });
        setTimeout(() => {
          setUploadSuccess(true);
          setTimeout(() => {
            closeUploadModal();
            navigate(".", { replace: true });
          }, 2000);
        }, 500);
      } else {
        setUploadProgress(p);
      }
    }, 400);
  };

  const handleOpenGenModal = (order: any) => {
    setActiveOrder(order);
    setSelectedTemplate("standard");
    // Initialize selected KOLs to those with performance data
    const readyIds = (order.collaborations || [])
      .filter((k: any) => (k.performanceItems || []).length > 0)
      .map((k: any) => k.id)
      .slice(0, 10);
    setSelectedKolIds(readyIds);
    setReportTitle(`${order.title || order.projectName} 結案報告`);
    openGenModal();
  };

  const toggleKolSelection = (kolId: string) => {
    setSelectedKolIds((prev) => {
      if (prev.includes(kolId)) {
        return prev.filter((id) => id !== kolId);
      }
      if (prev.length >= 10) {
        return prev;
      }
      return [...prev, kolId];
    });
  };

  const startGeneration = () => {
    closeGenModal();
    setProgressPercentage(0);
    setCurrentStepIndex(0);
    openProgressModal();

    const stepsProgress = [15, 30, 60, 80, 100];
    stepsProgress.forEach((p, idx) => {
      setTimeout(() => {
        setProgressPercentage(p);
        setCurrentStepIndex(idx);
        
        if (p === 100) {
          setTimeout(() => {
            if (!activeOrder) return;
            const fd = new FormData();
            fd.append("intent", "generateReport");
            fd.append("orderId", activeOrder.id);
            fd.append("reportTitle", reportTitle.trim() || `${activeOrder.title || activeOrder.projectName} 結案報告`);
            fd.append("templateKey", selectedTemplate);
            fd.append("selectedKolIds", JSON.stringify(selectedKolIds));
            generateFetcher.submit(fd, { method: "post" });
          }, 800);
        }
      }, (idx + 1) * 1200);
    });
  };

  return (
    <Box>
      <Stack gap="xl">
        {/* Header Section */}
        <Group justify="space-between" align="center">
          <Title order={2}>結案報告管理</Title>
          <Button color="blue" onClick={openSelectOrderModal}>
            + 生成新報告
          </Button>
        </Group>

        {/* Filter Bar */}
        <form method="get">
          <Group align="end" wrap="wrap" gap="md">
            <Select
              label="客戶"
              name="client"
              placeholder="全部"
              defaultValue={clientFilter}
              data={["", ...allClients].map(c => ({ value: c, label: c || "全部" }))}
              allowDeselect={false}
              style={{ width: 200 }}
            />
            <Select
              label="時間範圍"
              name="time"
              defaultValue={timeFilter}
              data={[
                { value: "all", label: "全部" },
                { value: "this_year", label: "2026 年" },
                { value: "2024_10", label: "2024-10" },
              ]}
              allowDeselect={false}
              style={{ width: 140 }}
            />
            <Select
              label="狀態"
              name="status"
              defaultValue={statusFilter}
              data={[
                { value: "all", label: "全部" },
                { value: "draft", label: "有草稿" },
                { value: "official", label: "有正式版" },
                { value: "none", label: "無報告" },
              ]}
              allowDeselect={false}
              style={{ width: 140 }}
            />
            <Select
              label="排序"
              name="sort"
              defaultValue={sort}
              onChange={(value) => {
                if (!value) return;
                const nextSort = value as SortOption;

                const sp = new URLSearchParams();
                if (clientFilter) sp.set("client", clientFilter);
                sp.set("time", timeFilter);
                sp.set("status", statusFilter);
                sp.set("sort", nextSort);
                sp.set("page", "1");
                sp.set("pageSize", String(pageSize));

                navigate(`/reports/generate?${sp.toString()}`);
              }}
              data={[
                { value: "order_no_asc", label: "委刊單編號（小→大）" },
                { value: "order_no_desc", label: "委刊單編號（大→小）" },
                { value: "date_desc", label: "執行日期（新→舊）" },
                { value: "date_asc", label: "執行日期（舊→新）" },
                { value: "title_az", label: "案件名稱（A→Z）" },
                { value: "title_za", label: "案件名稱（Z→A）" },
                { value: "budget_desc", label: "總預算（高→低）" },
                { value: "budget_asc", label: "總預算（低→高）" },
              ]}
              allowDeselect={false}
              style={{ width: 200 }}
            />
            <Button type="submit" variant="light">套用篩選</Button>
            {(clientFilter || timeFilter !== "all") && (
              <Button variant="subtle" color="gray" component="a" href="/reports/generate">清除</Button>
            )}
          </Group>
        </form>

        {/* Campaign Cards */}
        <Stack gap="lg">
          {orders.map((order: any) => {
            const hasDraft = order.hasDraft;
            const hasOfficial = order.hasOfficial;
            
            const kols = order.collaborations ?? [];
            const readyKols = kols.filter(
              (k: any) => (k.performanceItems ?? []).some((p: any) => (p.metrics?.impressions ?? 0) > 0)
            );
            const missingCount = kols.length - readyKols.length;

            return (
              <Card key={order.id} withBorder shadow="sm" radius="md" p={0}>
                {/* 1. Campaign Header - All action buttons consolidated here */}
                <Box p="md" style={{ borderBottom: hasDraft || hasOfficial ? "1px solid #eee" : "none" }}>
                  <Group justify="space-between" align="flex-start">
                    <Box>
                      <Text fw={700} size="lg">📋 #{order.orderNo} {order.title ?? order.projectName ?? "未命名案件"}</Text>
                      <Text c="dimmed" size="sm" mt={4}>
                        客戶: {order.clientName} | 日期: {formatShortDate(order.startDate)} | 合作 KOL: {order.kolCount ?? kols.length} 位
                      </Text>
                    </Box>
                    {/* ALL action buttons in top-right */}
                    <Group gap="xs" wrap="nowrap">
                      <Button component="a" href={`/insertion-orders/${order.id}`} variant="subtle" size="sm">查看案件詳情</Button>
                      <Button size="sm" variant="outline" onClick={() => handleOpenUploadModal(order)}>
                        {hasOfficial ? "更新正式版" : "+ 上傳正式版"}
                      </Button>
                      <Button size="sm" variant="filled" onClick={() => handleOpenGenModal(order)}>
                        + 生成新報告
                      </Button>
                    </Group>
                  </Group>
                </Box>

                {/* 2. Reports Section */}
                <Box p="md" bg="transparent">
                  {!hasDraft && !hasOfficial ? (
                    // Empty State - no duplicate buttons (they live in the header now)
                    <Stack align="center" py="xl" gap="sm">
                      <Text c="dimmed" fw={500}>尚未生成結案報告</Text>
                      {missingCount > 0 && (
                        <Badge color="yellow" variant="light" size="lg">⚠️ 提示: {missingCount} 位 KOL 尚未上傳成效</Badge>
                      )}
                      <Text size="sm" c="dimmed">請點擊右上角的「+ 生成新報告」開始生成</Text>
                    </Stack>
                  ) : (
                    <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
                      {/* Draft Section */}
                      {hasDraft && (
                        <Card withBorder bg="var(--mantine-color-gray-light)" radius="sm" p="sm">
                          <Text size="sm" fw={600} mb="sm" c="dimmed">系統生成（草稿）</Text>
                          <Stack gap="xs">
                            {order.reports?.filter((r: any) => r.type === "draft").map((report: any) => (
                              <Group key={report.id} justify="space-between" wrap="nowrap" style={{ border: '1px solid var(--mantine-color-default-border)', background: 'var(--mantine-color-body)', padding: 12, borderRadius: 8 }}>
                                <Group wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                                  <ThemeIcon size="lg" variant="light" color="gray" style={{ flexShrink: 0 }}><IconFileTypePpt size={20} /></ThemeIcon>
                                  <Box style={{ minWidth: 0 }}>
                                    <Group gap="xs" wrap="nowrap">
                                      <Text fw={500} truncate="end" style={{ minWidth: 0 }}>{report.name}</Text>
                                      <Badge color="gray" variant="filled" size="xs" style={{ flexShrink: 0 }}>草稿</Badge>
                                    </Group>
                                    <Text size="xs" c="dimmed">生成時間: {report.createdAt} | 生成者: {report.createdBy}</Text>
                                  </Box>
                                </Group>
                                <Group gap="xs" style={{ flexShrink: 0 }}>
                                  <ActionIcon variant="light" color="blue" onClick={() => handleDownload(order.id, report.id)}><IconDownload size={18} /></ActionIcon>
                                  <ActionIcon variant="light" color="indigo" onClick={() => handleOpenGenModal(order)}><IconPencil size={18} /></ActionIcon>
                                  <ActionIcon variant="light" color="red" onClick={() => handleAskDeleteReport({ id: report.id, name: report.name, orderId: order.id })}><IconTrash size={18} /></ActionIcon>
                                </Group>
                              </Group>
                            ))}
                          </Stack>
                        </Card>
                      )}

                      {/* Official Section */}
                      {hasOfficial && (
                        <Card withBorder bg="var(--mantine-color-green-light)" radius="sm" p="sm">
                          <Text size="sm" fw={600} mb="sm" c="green">正式版本</Text>
                          <Stack gap="xs">
                            {order.reports?.filter((r: any) => r.type === "official").map((report: any) => (
                              <Group key={report.id} justify="space-between" wrap="nowrap" style={{ border: '1px solid var(--mantine-color-green-outline)', background: 'var(--mantine-color-body)', padding: 12, borderRadius: 8 }}>
                                <Group wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                                  <ThemeIcon size="lg" variant="light" color="green" style={{ flexShrink: 0 }}><IconFileTypePpt size={20} /></ThemeIcon>
                                  <Box style={{ minWidth: 0 }}>
                                    <Group gap="xs" wrap="nowrap">
                                      <Text fw={500} truncate="end" style={{ minWidth: 0 }}>{report.name}</Text>
                                      <Badge color="green" variant="filled" size="xs" style={{ flexShrink: 0 }}>⭐ 正式版</Badge>
                                    </Group>
                                    <Text size="xs" c="dimmed">上傳時間: {report.createdAt} | 上傳者: {report.createdBy}</Text>
                                    {report.note && <Text size="xs" c="dimmed" mt={2}>說明: {report.note}</Text>}
                                  </Box>
                                </Group>
                                <Group gap="xs" style={{ flexShrink: 0 }}>
                                  <ActionIcon variant="light" color="blue" onClick={() => handleDownload(order.id, report.id)}><IconDownload size={18} /></ActionIcon>
                                  <ActionIcon variant="light" color="red" onClick={() => handleAskDeleteReport({ id: report.id, name: report.name, orderId: order.id })}><IconTrash size={18} /></ActionIcon>
                                </Group>
                              </Group>
                            ))}
                          </Stack>
                        </Card>
                      )}
                    </SimpleGrid>
                  )}
                </Box>
              </Card>
            );
          })}
        </Stack>

        {/* ── Pagination ── */}
        <Group justify="space-between" align="center" mt="xl" py="md" style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}>
          <Group>
            <Text size="sm" c="dimmed">每頁筆數</Text>
            <form method="get" style={{ display: "inline" }}>
              <input type="hidden" name="client" value={clientFilter} />
              <input type="hidden" name="time" value={timeFilter} />
              <input type="hidden" name="status" value={statusFilter} />
              <input type="hidden" name="sort" value={sort} />
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
            <Text size="sm" c="dimmed">共 {totalCount} 筆</Text>
          </Group>

          <Group gap={4}>
            {currentPage > 1 && (
              <Link
                to={`/reports/generate?client=${encodeURIComponent(clientFilter)}&time=${timeFilter}&status=${statusFilter}&sort=${sort}&page=${currentPage - 1}&pageSize=${pageSize}`}
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
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                to={`/reports/generate?client=${encodeURIComponent(clientFilter)}&time=${timeFilter}&status=${statusFilter}&sort=${sort}&page=${p}&pageSize=${pageSize}`}
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
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                to={`/reports/generate?client=${encodeURIComponent(clientFilter)}&time=${timeFilter}&status=${statusFilter}&sort=${sort}&page=${currentPage + 1}&pageSize=${pageSize}`}
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
              </Link>
            )}
          </Group>
        </Group>
      </Stack>

      {/* ── Select Order Modal ── */}
      <Modal 
        opened={selectOrderModalOpen}
        onClose={() => { closeSelectOrderModal(); setOrderSearch(""); }}
        title={<Text fw={700} size="lg">選擇委刊單生成報告</Text>} 
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">請選擇一個案件來開始生成新的結案報告：</Text>
          <TextInput
            placeholder="搜尋委刊單編號、名稱或客戶..."
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.currentTarget.value)}
          />
          <Box style={{ maxHeight: 400, overflowY: 'auto' }}>
            <Stack gap="xs">
              {allOrders
                .filter((order: any) => {
                  if (!orderSearch) return true;
                  const q = orderSearch.toLowerCase();
                  return (
                    order.orderNo?.toLowerCase().includes(q) ||
                    (order.title || order.projectName || "").toLowerCase().includes(q) ||
                    order.clientName?.toLowerCase().includes(q)
                  );
                })
                .map((order: any) => (
                <Card 
                  key={order.id} 
                  withBorder 
                  p="sm" 
                  radius="md" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleOpenGenModal(order);
                    closeSelectOrderModal();
                  }}
                  className="hover:bg-blue-50"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--mantine-color-blue-0)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Group justify="space-between">
                    <Box>
                      <Text fw={600}>#{order.orderNo} {order.title || order.projectName}</Text>
                      <Text size="xs" c="dimmed">{order.clientName} | {formatShortDate(order.startDate)}</Text>
                    </Box>
                    <Button variant="light" size="xs">選擇</Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Box>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => { closeSelectOrderModal(); setOrderSearch(""); }}>取消</Button>
          </Group>
        </Stack>
      </Modal>

      {/* ── Delete report file confirm ── */}
      <Modal
        opened={deleteReportModalOpen}
        onClose={() => {
          closeDeleteReportModal();
          setReportDeleteTarget(null);
        }}
        title={<Text fw={700} size="lg">確認刪除結案報告</Text>}
        centered
        radius="md"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        closeButtonProps={{
          style: { border: "1px solid var(--mantine-color-blue-filled)" },
        }}
      >
        <Stack gap="lg">
          <Text size="sm" style={{ lineHeight: 1.6 }}>
            確定要刪除「{reportDeleteTarget?.name ?? ""}」嗎？此動作無法復原。
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button
              variant="default"
              onClick={() => {
                closeDeleteReportModal();
                setReportDeleteTarget(null);
              }}
            >
              取消
            </Button>
            <Button color="red" onClick={handleConfirmDeleteReport}>
              確認刪除
            </Button>
          </Group>
        </Stack>
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
            <Card withBorder bg="gray.0" p="sm" radius="md">
              <Group gap="xl">
                <Box>
                  <Text size="xs" c="dimmed">案件編號</Text>
                  <Text fw={600}>#{activeOrder.orderNo}</Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed">案件名稱</Text>
                  <Text fw={600}>{activeOrder.title || activeOrder.projectName}</Text>
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
                    {(activeOrder.collaborations||[]).filter((k:any) => (k.performanceItems||[]).length > 0).length === 0 && (
                      <Text size="sm" c="dimmed" py="xs">此委刊單目前沒有已上傳成效的 KOL</Text>
                    )}
                    {activeOrder.collaborations?.filter((k:any) => (k.performanceItems||[]).length > 0).map((kol:any, idx:number) => {
                      const totalReach = kol.totalReach || 0;
                      const totalEngagement = kol.totalEngagement || 0;
                      const engRate = totalReach > 0 ? ((totalEngagement / totalReach) * 100).toFixed(1) : "–";
                      const reachLabel = totalReach >= 10000 ? `${(totalReach/1000).toFixed(0)}K` : totalReach.toLocaleString();
                      // Parse services string to show individual service badges
                      const servicesList = (kol.services || "").split(/[+、,]/).map((s: string) => s.trim()).filter(Boolean);
                      return (
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
                            <Text fw={600}>{kol.name || kol.kolName || "(未知 KOL)"}</Text>
                            <Group gap={4} mt={4} wrap="wrap">
                              {servicesList.length > 0 ? servicesList.map((svc: string, si: number) => (
                                <Badge key={si} size="xs" variant="light" color="teal" leftSection={<IconCheck size={10} />}>
                                  {svc}
                                </Badge>
                              )) : (
                                <Text size="xs" c="dimmed">{kol.services || "–"}</Text>
                              )}
                            </Group>
                          </Box>
                          <Box style={{ textAlign: 'right' }}>
                            <Badge variant="dot" color="blue">總觸及 {reachLabel}</Badge>
                            <Text size="xs" c="dimmed" mt={4}>互動率 {engRate}%</Text>
                          </Box>
                        </Group>
                      </Card>
                      );
                    })}
                  </Stack>
                </Box>

                {/* 2B. Not Ready KOLs */}
                <Box>
                  <Text fw={500} size="sm" c="orange.7" mb="xs">⚠️ 尚未上傳成效的 KOL</Text>
                  <Stack gap="xs">
                    {(activeOrder.collaborations||[]).filter((k:any) => !(k.performanceItems||[]).length).length === 0 && (
                      <Text size="sm" c="dimmed" py="xs">所有 KOL 均已上傳成效資料 🎉</Text>
                    )}
                    {(activeOrder.collaborations||[]).filter((k:any) => !(k.performanceItems||[]).length).map((kol:any, idx:number) => (
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
                            <Text fw={600} c="dimmed">{kol.name || kol.kolName || "(未知 KOL)"}</Text>
                            <Group gap="xs" mt={4}>
                              <Text size="xs" c="dimmed">{kol.services || ""}</Text>
                            </Group>
                            <Text size="xs" c="red.7" mt={2}><IconX size={12} style={{display:'inline'}}/> 尚未上傳成效資料</Text>
                          </Box>
                          <Button
                            component="a"
                            href={`/insertion-orders/${activeOrder?.id}`}
                            variant="subtle"
                            size="xs"
                            color="blue"
                            rightSection="→"
                            onClick={(e) => e.stopPropagation()}
                          >前往上傳成效</Button>
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
                      未勾選的 KOL 將不會出現在報告中。系統目前會依模板自動擴充頁面，單次報告最多可帶入 10 位 KOL；建議先上傳所有 KOL 的成效資料後再生成報告。
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
                  value={reportTitle}
                  onChange={(event) => setReportTitle(event.currentTarget.value.slice(0, 100))}
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
                      <Text size="sm" fw={600}>預估頁數: 約 {selectedKolIds.length * 3 + 5} 頁</Text>
                      <Text size="xs" c="dimmed">(封面 + 總覽 + 每位 KOL 3 頁 + 合作心得)</Text>
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
              案件 #{activeOrder?.orderNo} {activeOrder?.title || activeOrder?.projectName}
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

      {/* ── Upload Modal ── */}
      <Modal 
        opened={uploadModalOpen} 
        onClose={closeUploadModal} 
        title={<Text fw={700} size="lg">上傳正式結案報告</Text>} 
        centered 
        size={600}
        withCloseButton={!uploadProgress && !uploadSuccess}
        closeOnClickOutside={!uploadProgress && !uploadSuccess}
      >
        {uploadSuccess ? (
          <Stack align="center" ta="center" py="xl" gap="md">
            <ThemeIcon size={64} radius="100%" color="green" variant="filled">
              <IconCheck size={40} />
            </ThemeIcon>
            <Title order={3}>上傳成功！</Title>
            <Button mt="md" variant="outline" onClick={closeUploadModal}>查看報告</Button>
          </Stack>
        ) : uploadProgress !== null ? (
          <Stack align="center" ta="center" py="xl" gap="md">
            <ThemeIcon size={64} radius="md" color="blue" variant="light" style={{ animation: 'pulse 2s infinite' }}>
              <IconCloudUpload size={40} />
            </ThemeIcon>
            <Box w="100%">
              <Group justify="space-between" mb={8}>
                <Text fw={600}>上傳中... {uploadProgress}%</Text>
              </Group>
              <Progress value={uploadProgress} size="lg" radius="xl" striped animated />
            </Box>
            <Button mt="md" variant="subtle" color="red" onClick={closeUploadModal}>取消</Button>
          </Stack>
        ) : (
          <Stack gap="lg">
            <Text size="sm" c="dimmed" mt="-xs">案件: #{activeOrder?.orderNo} {activeOrder?.title || activeOrder?.projectName}</Text>
            
            {/* Section 1 - File Upload */}
            <Box>
              {!uploadFile ? (
                <FileButton onChange={setUploadFile} accept="application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation">
                  {(props) => (
                    <Card
                      {...props}
                      withBorder
                      radius="md"
                      p="xl"
                      style={{ 
                        borderStyle: 'dashed', 
                        borderWidth: 2, 
                        borderColor: 'var(--mantine-color-default-border)', 
                        cursor: 'pointer', 
                        textAlign: 'center', 
                        transition: 'border-color 0.2s, background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--mantine-color-blue-filled)';
                        e.currentTarget.style.backgroundColor = 'var(--mantine-color-blue-light)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--mantine-color-default-border)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Stack align="center" gap="xs">
                        <ThemeIcon size={48} variant="light" color="blue" radius="md">
                          <IconUpload size={24} />
                        </ThemeIcon>
                        <Text fw={600} mt="sm">拖曳檔案至此或點擊選擇</Text>
                        <Text size="xs" c="dimmed">支援格式: .pptx, .pdf • 最大 50MB</Text>
                        <Button variant="light" size="xs" mt="sm">選擇檔案</Button>
                      </Stack>
                    </Card>
                  )}
                </FileButton>
              ) : (
                <Card withBorder radius="md" p="sm" bg="gray.0">
                  <Group wrap="nowrap" justify="space-between">
                    <Group wrap="nowrap">
                      <ThemeIcon size="lg" variant="light" color="blue">
                        <IconFile size={20} />
                      </ThemeIcon>
                      <Box>
                        <Text fw={500} size="sm" lineClamp={1}>{uploadFile.name}</Text>
                        <Text size="xs" c="dimmed">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</Text>
                      </Box>
                    </Group>
                    <ActionIcon color="red" variant="subtle" onClick={() => setUploadFile(null)}>
                      <IconX size={16} />
                    </ActionIcon>
                  </Group>
                </Card>
              )}
            </Box>

            {/* Section 2 - Version Info */}
            <Textarea
              label="版本說明 (選填)"
              placeholder="例如: 已根據客戶回饋修正數據呈現方式、更新品牌視覺..."
              description="說明此版本與草稿的差異或修改內容"
              minRows={3}
              value={versionNote}
              onChange={(e) => setVersionNote(e.currentTarget.value)}
            />

            {/* Section 3 - Status Setting */}
            <Checkbox
              checked={isOfficial}
              onChange={(evt) => setIsOfficial(evt.currentTarget.checked)}
              label={<Text fw={600} size="md">標記為正式版本</Text>}
              description="正式版會顯示 ⭐ 標記，並優先展示給團隊成員"
              size="md"
            />

            <Card bg="blue.0" p="sm" radius="md" mt="xs">
              <Group wrap="nowrap" align="flex-start">
                <ThemeIcon color="blue" variant="light" size="sm" mt={2}><IconBulb size={14} /></ThemeIcon>
                <Text size="sm" c="blue.9" style={{ lineHeight: 1.4 }}>
                  上傳正式版後，系統草稿仍會保留。您可以隨時查看或下載任一版本。
                </Text>
              </Group>
            </Card>

            <Group justify="flex-end" mt="md">
              <Button variant="ghost" color="gray" onClick={closeUploadModal}>取消</Button>
              <Button color="blue" disabled={!uploadFile} onClick={startOfficialUpload}>確認上傳</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}
