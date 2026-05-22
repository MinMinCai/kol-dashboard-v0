import {
  Badge,
  Button,
  Card,
  Group,
  MultiSelect,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Modal,
  ActionIcon,
  Box,
  FileInput,
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
  useNavigate,
  useFetcher,
} from "@remix-run/react";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { listInsertionOrders, updateInsertionOrder, deleteInsertionOrder, type InsertionOrder } from "~/lib/mock-api.server";
import styles from "./_app.insertion-orders._index.module.css";
import { DemoGenerateReportModal } from "~/components/DemoGenerateReportModal";


type TimeFilter = "all" | "last30" | "last90" | "thisYear";
type SortOption =
  | "order_no_asc"
  | "order_no_desc"
  | "date_desc"
  | "date_asc"
  | "title_az"
  | "title_za"
  | "budget_desc"
  | "budget_asc";

/** 依執行案件編號（如 IO-2026-001）數字排序；無法解析時退回字串比較 */
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
    const clientFilters = url.searchParams.getAll("client");
    const industryFilters = url.searchParams.getAll("industry");
    const timeFilter = (url.searchParams.get("time") ?? "all") as TimeFilter;
    const sort = (url.searchParams.get("sort") ?? "order_no_asc") as SortOption;
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const pageSize = Number(url.searchParams.get("pageSize") ?? "5");

    const allOrders = await Promise.race([
      listInsertionOrders(),
      new Promise<never[]>((resolve) => setTimeout(() => resolve([]), 8000)),
    ]).catch(() => []);

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
      if (clientFilters.length && !clientFilters.includes(order.clientName)) return false;
      if (industryFilters.length && !industryFilters.includes(order.industry ?? "")) return false;
      if (!matchesTime(order, timeFilter)) return false;
      return true;
    });

    filtered.sort((a, b) => {
      switch (sort) {
        case "order_no_asc":
          return compareOrderNo(a.orderNo, b.orderNo);
        case "order_no_desc":
          return compareOrderNo(b.orderNo, a.orderNo);
        case "title_az":
          return (a.title ?? a.orderNo).localeCompare(b.title ?? b.orderNo, "zh-Hant");
        case "title_za":
          return (b.title ?? b.orderNo).localeCompare(a.title ?? a.orderNo, "zh-Hant");
        case "budget_desc":
          return (b.totalBudget ?? 0) - (a.totalBudget ?? 0);
        case "budget_asc":
          return (a.totalBudget ?? 0) - (b.totalBudget ?? 0);
        case "date_asc":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case "date_desc":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        default:
          return compareOrderNo(a.orderNo, b.orderNo);
      }
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
      clientFilters,
      industryFilters,
      timeFilter,
      sort,
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
          name: `結案報告_v${(io.reports?.length || 0) + 1}.pptx`,
          type: "official" as const,
          createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
          createdBy: "系統 AI",
        };
        await updateInsertionOrder(orderId, {
          hasOfficial: true,
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
    clientFilters,
    industryFilters,
    timeFilter,
    sort,
  } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const navigate = useNavigate();

  // ── Multi-select filter local state ──
  const [clientsLocal, setClientsLocal] = useState<string[]>(clientFilters);
  const [industriesLocal, setIndustriesLocal] = useState<string[]>(industryFilters);

  // ── Delete Confirm State ──
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const handleAskDelete = (order: InsertionOrder) => {
    setDeleteTarget({ id: order.id, title: order.title ?? order.orderNo });
    openDeleteModal();
  };

  // ── Report Generation State ──

  const [genModalOpen, { open: openGenModal, close: closeGenModal }] = useDisclosure(false);
  const [activeOrder, setActiveOrder] = useState<InsertionOrder | null>(null);

  // ── IO Upload Modal State ──
  const [ioUploadOrder, setIoUploadOrder] = useState<InsertionOrder | null>(null);
  const [ioUploadFiles, setIoUploadFiles] = useState<File[]>([]);
  const [ioUploadState, setIoUploadState] = useState<"idle" | "uploading" | "success">("idle");
  const [ioUploadedFilenames, setIoUploadedFilenames] = useState<string[]>([]);
  const [ioUploadModalOpen, { open: openIoUploadModal, close: closeIoUploadModal }] = useDisclosure(false);

  const handleOpenIoUpload = (order: InsertionOrder) => {
    setIoUploadOrder(order);
    setIoUploadFiles([]);
    setIoUploadState("idle");
    setIoUploadedFilenames([]);
    openIoUploadModal();
  };

  const resetIoUploadModalList = () => {
    closeIoUploadModal();
    setIoUploadState("idle");
    setIoUploadedFilenames([]);
    setIoUploadFiles([]);
  };

  const handleIoUploadSubmit = async () => {
    if (!ioUploadFiles.length || !ioUploadOrder) return;
    setIoUploadState("uploading");
    const fd = new FormData();
    ioUploadFiles.forEach((f) => fd.append("file", f));
    try {
      const res = await fetch(`/api/insertion-orders/${ioUploadOrder.id}/upload-io`, { method: "POST", body: fd });
      if (!res.ok) throw new Error("upload failed");
      const { files } = await res.json() as { files: string[] };
      setIoUploadedFilenames(files);
      setIoUploadState("success");
    } catch {
      setIoUploadState("idle");
    }
  };

  const handleOpenGenModal = (order: InsertionOrder) => {
    setActiveOrder(order);
    openGenModal();
  };

  const handleGenerateComplete = () => {
    if (!activeOrder) return;
    fetcher.submit(
      { intent: "generateReport", orderId: activeOrder.id },
      { method: "post" }
    );
  };

  function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const sp = new URLSearchParams();
    const searchVal = (form.elements.namedItem("search") as HTMLInputElement)?.value ?? "";
    if (searchVal) sp.set("search", searchVal);
    clientsLocal.forEach((c) => sp.append("client", c));
    industriesLocal.forEach((i) => sp.append("industry", i));
    const timeVal = (form.elements.namedItem("time") as HTMLSelectElement)?.value ?? "all";
    if (timeVal !== "all") sp.set("time", timeVal);
    const sortVal = (form.elements.namedItem("sort") as HTMLSelectElement)?.value ?? "order_no_asc";
    sp.set("sort", sortVal);
    sp.set("pageSize", String(pageSize));
    navigate(`/insertion-orders?${sp.toString()}`);
  }

  function buildPageUrl(p: number) {
    const sp = new URLSearchParams();
    if (search) sp.set("search", search);
    clientFilters.forEach((c) => sp.append("client", c));
    industryFilters.forEach((i) => sp.append("industry", i));
    if (timeFilter !== "all") sp.set("time", timeFilter);
    sp.set("sort", sort);
    sp.set("page", String(p));
    sp.set("pageSize", String(pageSize));
    return `/insertion-orders?${sp.toString()}`;
  }

  const hasActiveFilters = !!(search || clientFilters.length || industryFilters.length || timeFilter !== "all");

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>執行案件管理</Title>
        <Group>
          <Button component="a" href="/insertion-orders/new">新增執行案件</Button>
        </Group>
      </Group>

      {/* ── Filter form ── */}
      <form key={`${search}|${clientFilters.join(",")}|${industryFilters.join(",")}|${timeFilter}|${sort}`} onSubmit={handleFilterSubmit} className={styles.formContents}>
        <Stack gap="sm">
          <Group align="end" wrap="wrap">
            {/* Search */}
            <div className={styles.searchField}>
              <label className={styles.fieldLabel}>搜尋</label>
              <input
                name="search"
                defaultValue={search}
                placeholder="搜尋執行案件編號、標題或客戶"
                className={styles.searchInput}
              />
            </div>

            {/* Client multi-select */}
            <div>
              <label className={styles.fieldLabel}>客戶</label>
              <MultiSelect
                placeholder="全部"
                data={allClients}
                value={clientsLocal}
                onChange={setClientsLocal}
                w={180}
                clearable
                comboboxProps={{ withinPortal: true }}
              />
            </div>

            {/* Industry multi-select */}
            <div>
              <label className={styles.fieldLabel}>產業</label>
              <MultiSelect
                placeholder="全部"
                data={allIndustries}
                value={industriesLocal}
                onChange={setIndustriesLocal}
                w={180}
                clearable
                comboboxProps={{ withinPortal: true }}
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="filter-time" className={styles.fieldLabel}>時間</label>
              <select
                id="filter-time"
                name="time"
                defaultValue={timeFilter}
                className={styles.filterSelect}
              >
                <option value="all">全部</option>
                <option value="last30">近 30 天</option>
                <option value="last90">近 90 天</option>
                <option value="thisYear">2026 年</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="filter-sort" className={styles.fieldLabel}>排序</label>
              <select
                id="filter-sort"
                name="sort"
                defaultValue={sort}
                onChange={(e) => {
                  e.currentTarget.form?.requestSubmit();
                }}
                className={`${styles.filterSelect} ${styles.filterSelectWide}`}
              >
                <option value="order_no_asc">執行案件編號（小→大）</option>
                <option value="order_no_desc">執行案件編號（大→小）</option>
                <option value="date_desc">執行日期（新→舊）</option>
                <option value="date_asc">執行日期（舊→新）</option>
                <option value="title_az">名稱（A→Z）</option>
                <option value="title_za">名稱（Z→A）</option>
                <option value="budget_desc">預算（高→低）</option>
                <option value="budget_asc">預算（低→高）</option>
              </select>
            </div>

            <input type="hidden" name="pageSize" value={pageSize} />

            <button type="submit" className={styles.formSubmitButton}>
              套用篩選
            </button>

            {hasActiveFilters && (
              <a href="/insertion-orders" className={styles.linkButton}>
                清除篩選
              </a>
            )}
          </Group>
        </Stack>
      </form>

      {/* ── Stats ── (暫不開發)
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="sm">
        <Card withBorder>
          <Text c="dimmed" size="sm">執行案件數</Text>
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
      */}

      {/* ── List ── */}
      {rows.length === 0 ? (
        <Card withBorder p="xl" ta="center">
          <Text size="48px">📄</Text>
          <Title order={3}>尚無執行案件</Title>
          <Text c="dimmed" mb="md">調整篩選條件，或建立您的第一個執行案件</Text>
          <Button component={Link} to="/insertion-orders/new">開始建立</Button>
        </Card>
      ) : (
        <Stack gap="md">
          {rows.map((order) => {
            return (
              <Card key={order.id} withBorder className={`io-card ${styles.ioCard}`} onClick={() => { window.location.href = `/insertion-orders/${order.id}`; }}>
                <Stack gap="md">
                  <Group justify="space-between">
                    <Text fw={600}>📋 #{order.orderNo} {order.title ?? "未命名專案"}</Text>
                  </Group>

                  <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <Text size="sm">客戶: {order.clientName} | 產業: {order.industry ?? "-"}</Text>
                    <Text size="sm">負責業務: {order.salesOwner ?? "-"} | KOL窗口: {order.kolManager ?? "-"}</Text>
                  </SimpleGrid>

                  <SimpleGrid cols={{ base: 2, md: 3 }}>
                    <Text size="sm">合作 KOL: {order.kolCount ?? 0} 位</Text>
                    <Text size="sm">總預算: NT$ {(order.totalBudget ?? 0).toLocaleString()}</Text>
                    <Text size="sm">執行日期: {order.startDate ? `${order.startDate} ~ ${order.endDate}` : "-"}</Text>
                  </SimpleGrid>

                  <Group justify="space-between" onClick={(e) => e.stopPropagation()}>
                    <Group>
                      <Button component="a" href={`/insertion-orders/${order.id}`}>查看詳情</Button>
                      <Button variant="default" onClick={() => handleOpenGenModal(order)}>📊 產生報告</Button>
                      <Button
                        variant="light"
                        color="teal"
                        component="a"
                        href={`/api/insertion-orders/${order.id}/generate-cue`}
                        download
                      >
                        📋 生成CUE表
                      </Button>
                      <Button
                        variant="light"
                        color="orange"
                        onClick={() => handleOpenIoUpload(order)}
                      >
                        📤 委刊單上傳
                      </Button>
                    </Group>
                    <ActionIcon
                      variant="light"
                      color="red"
                      size="lg"
                      title="刪除執行案件"
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
            <form method="get" className={styles.inlineForm}>
              <input type="hidden" name="search" value={search} />
              {clientFilters.map((c) => <input key={c} type="hidden" name="client" value={c} />)}
              {industryFilters.map((i) => <input key={i} type="hidden" name="industry" value={i} />)}
              <input type="hidden" name="time" value={timeFilter} />
              <input type="hidden" name="sort" value={sort} />
              <input type="hidden" name="page" value="1" />
              <select
                aria-label="每頁筆數"
                name="pageSize"
                defaultValue={pageSize}
                onChange={(e) => (e.currentTarget.form as HTMLFormElement).submit()}
                className={styles.pageSizeSelect}
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
                href={buildPageUrl(currentPage - 1)}
                className={styles.pageNavLink}
              >
                ‹ 上一頁
              </a>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={buildPageUrl(p)}
                className={p === currentPage ? `${styles.pageNumberLink} ${styles.pageNumberLinkActive}` : styles.pageNumberLink}
              >
                {p}
              </a>
            ))}

            {currentPage < totalPages && (
              <a
                href={buildPageUrl(currentPage + 1)}
                className={styles.pageNavLink}
              >
                下一頁 ›
              </a>
            )}
          </Group>
        </Group>
      )}
      <DemoGenerateReportModal
        opened={genModalOpen}
        onClose={closeGenModal}
        order={activeOrder}
        onComplete={handleGenerateComplete}
      />


      {/* ── IO Upload Modal ── */}
      <Modal
        opened={ioUploadModalOpen}
        onClose={resetIoUploadModalList}
        title={`上傳委刊單：${ioUploadOrder?.title ?? ioUploadOrder?.orderNo ?? ""}`}
        centered
      >
        <Stack gap="md">
          {ioUploadState === "success" ? (
            <>
              <Stack gap={4}>
                {ioUploadedFilenames.map((name, i) => (
                  <Text key={i} size="sm" c="green" fw={500}>✅ {name}</Text>
                ))}
              </Stack>
              <Text size="xs" c="dimmed">
                已成功上傳 {ioUploadedFilenames.length} 份委刊單，可在案件詳細頁中查看。
              </Text>
              <Button onClick={resetIoUploadModalList}>關閉</Button>
            </>
          ) : (
            <>
              <FileInput
                label="選擇委刊單檔案（可多選）"
                placeholder="點擊選擇 PDF / Word 檔案"
                accept=".pdf,.doc,.docx"
                multiple
                value={ioUploadFiles}
                onChange={setIoUploadFiles}
              />
              <Group justify="flex-end">
                <Button variant="default" onClick={resetIoUploadModalList}>取消</Button>
                <Button
                  color="orange"
                  loading={ioUploadState === "uploading"}
                  disabled={!ioUploadFiles.length}
                  onClick={() => void handleIoUploadSubmit()}
                >
                  上傳
                </Button>
              </Group>
            </>
          )}
        </Stack>
      </Modal>

      {/* ── Delete Confirm Modal ── */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => { closeDeleteModal(); setDeleteTarget(null); }}
        title="確認刪除執行案件"
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

    </Stack>
  );
}
