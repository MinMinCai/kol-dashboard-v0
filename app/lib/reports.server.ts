import { json } from "@remix-run/node";
import { getInsertionOrder, listInsertionOrders, updateInsertionOrder, type Report } from "./mock-api.server";
import { generateReportPpt } from "./report-ppt.server";
import { buildReportDownloadPath, type SortOption } from "./reports";

// ============ Internal helpers ============

function normalizePptFileName(value: string): string {
  const trimmed = value.trim() || "結案報告";
  return /\.pptx$/i.test(trimmed) ? trimmed : `${trimmed}.pptx`;
}

/** 依執行案件編號（IO-2026-001）數字排序；無法解析時退回字串比較 */
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

// ============ Loader ============

export async function loadReports(request: Request) {
  const url = new URL(request.url);
  const clientFilter = url.searchParams.get("client") ?? "";
  const timeFilter = url.searchParams.get("time") ?? "all";
  const statusFilter = url.searchParams.get("status") ?? "all";
  const sort = (url.searchParams.get("sort") ?? "order_no_asc") as SortOption;

  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Number(url.searchParams.get("pageSize") ?? "5");

  const orders = await Promise.race([
    listInsertionOrders(),
    new Promise<never[]>((resolve) => setTimeout(() => resolve([]), 8000)),
  ]).catch(() => [] as never[]);
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
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case "report_date_desc": {
        const latestA = (a.reports ?? []).reduce((max: string, r: any) => r.createdAt > max ? r.createdAt : max, "");
        const latestB = (b.reports ?? []).reduce((max: string, r: any) => r.createdAt > max ? r.createdAt : max, "");
        return latestB.localeCompare(latestA);
      }
      case "report_date_asc": {
        const latestA = (a.reports ?? []).reduce((max: string, r: any) => r.createdAt > max ? r.createdAt : max, "");
        const latestB = (b.reports ?? []).reduce((max: string, r: any) => r.createdAt > max ? r.createdAt : max, "");
        return latestA.localeCompare(latestB);
      }
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return {
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
    totalCount: filtered.length,
  };
}

// ============ Action ============

export type ReportActionResult =
  | { ok: true; report?: Report; downloadUrl?: string }
  | { ok: false; error?: string };

export async function handleReportAction(formData: FormData) {
  const intent = formData.get("intent");

  if (intent === "deleteReport") {
    const orderId = String(formData.get("orderId"));
    const reportId = String(formData.get("reportId"));

    const io = await getInsertionOrder(orderId);
    if (!io) return json<ReportActionResult>({ ok: false }, { status: 404 });

    const updatedReports = (io.reports ?? []).filter((r) => r.id !== reportId);
    const stillHasDraft = updatedReports.some((r) => r.type === "draft");
    const stillHasOfficial = updatedReports.some((r) => r.type === "official");

    await updateInsertionOrder(orderId, {
      reports: updatedReports,
      hasDraft: stillHasDraft,
      hasOfficial: stillHasOfficial,
    });

    return json<ReportActionResult>({ ok: true });
  }

  if (intent === "uploadReport") {
    const orderId = String(formData.get("orderId"));
    const fileName = String(formData.get("fileName"));
    const note = formData.get("note") ? String(formData.get("note")) : undefined;
    const isOfficial = formData.get("isOfficial") === "true";

    const io = await getInsertionOrder(orderId);
    if (!io) return json<ReportActionResult>({ ok: false }, { status: 404 });
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

    return json<ReportActionResult>({ ok: true });
  }

  if (intent === "generateReport") {
    const orderId = String(formData.get("orderId") ?? "");
    const reportTitle = String(formData.get("reportTitle") ?? "").trim();
    const templateKey = String(formData.get("templateKey") ?? "standard");
    const rawSelectedKolIds = String(formData.get("selectedKolIds") ?? "[]");

    const io = await getInsertionOrder(orderId);
    if (!io) return json<ReportActionResult>({ ok: false }, { status: 404 });
    const parsedKolIds = (() => {
      try {
        const parsed = JSON.parse(rawSelectedKolIds);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch {
        return [];
      }
    })();

    try {
      const version = (io.reports?.filter((r) => r.type === "draft").length || 0) + 1;
      const normalizedTitle = reportTitle || `結案報告_v${version}`;
      const newReport = {
        id: `rep_${Date.now()}`,
        name: normalizePptFileName(normalizedTitle),
        type: "draft" as const,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
        createdBy: "系統 AI",
        templateKey,
        selectedKolIds: parsedKolIds,
        reportTitle: normalizedTitle,
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

      return json<ReportActionResult>({
        ok: true,
        report: reportWithFile,
        downloadUrl: buildReportDownloadPath(orderId, reportWithFile.id),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "結案報告生成失敗";
      return json<ReportActionResult>({ ok: false, error: message }, { status: 500 });
    }
  }

  return json<ReportActionResult>({ ok: false }, { status: 400 });
}
