import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { listInsertionOrders, type InsertionOrder } from "~/lib/mock-api";

type TimeFilter = "all" | "last30" | "last90" | "thisYear";

function statusMeta(status: string) {
  if (status === "completed") return { label: "已結案", color: "green" as const };
  if (status === "in_progress") return { label: "執行中", color: "yellow" as const };
  return { label: "規劃中", color: "gray" as const };
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
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? "";
  const clientFilter = url.searchParams.get("client") ?? "";
  const industryFilter = url.searchParams.get("industry") ?? "";
  const statusFilter = url.searchParams.get("status") ?? "";
  const timeFilter = (url.searchParams.get("time") ?? "all") as TimeFilter;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Number(url.searchParams.get("pageSize") ?? "5");

  const allOrders = await listInsertionOrders();

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
    if (statusFilter && order.status !== statusFilter) return false;
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
    // echo back current filter values for controlled inputs
    search,
    clientFilter,
    industryFilter,
    statusFilter,
    timeFilter,
  });
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
    statusFilter,
    timeFilter,
  } = useLoaderData<typeof loader>();

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
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>客戶</label>
              <select
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
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>產業</label>
              <select
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

            {/* Status */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>狀態</label>
              <select
                name="status"
                defaultValue={statusFilter}
                style={{
                  padding: "8px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  background: "var(--mantine-color-body)",
                  color: "var(--mantine-color-text)",
                  minWidth: 120,
                }}
              >
                <option value="">全部</option>
                <option value="planned">規劃中</option>
                <option value="in_progress">執行中</option>
                <option value="completed">已結案</option>
              </select>
            </div>

            {/* Time */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>時間</label>
              <select
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

            {(search || clientFilter || industryFilter || statusFilter || timeFilter !== "all") && (
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
            const status = statusMeta(order.status);
            return (
              <Card key={order.id} withBorder className="io-card">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Text fw={600}>📋 #{order.orderNo} {order.title ?? "未命名專案"}</Text>
                    <Badge color={status.color} variant="light">{status.label}</Badge>
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
                      <Button variant="default" component={Link} to={`/reports/generate?orderId=${order.id}`}>📊 產生報告</Button>
                    </Group>
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
              <input type="hidden" name="status" value={statusFilter} />
              <input type="hidden" name="time" value={timeFilter} />
              <input type="hidden" name="page" value="1" />
              <select
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
                href={`/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${currentPage - 1}&pageSize=${pageSize}`}
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
                href={`/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${p}&pageSize=${pageSize}`}
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
                href={`/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${currentPage + 1}&pageSize=${pageSize}`}
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
    </Stack>
  );
}
