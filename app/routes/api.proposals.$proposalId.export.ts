import { type LoaderFunctionArgs } from "@remix-run/node";
import * as XLSX from "xlsx";
import { getProposal, listProposalKols } from "~/lib/mock-api.server";

function withTimeout<T>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

const stageLabel: Record<string, string> = {
  draft: "草稿",
  internal_review: "內部審核",
  sent_to_client: "已送出給客戶",
};

const statusLabel: Record<string, string> = {
  pending: "待定",
  accepted: "已接受",
  rejected: "已拒絕",
};

export async function loader({ params }: LoaderFunctionArgs) {
  const proposalId = params.proposalId ?? "";

  const [proposal, candidates] = await Promise.all([
    withTimeout(getProposal(proposalId), null),
    withTimeout(listProposalKols(proposalId), []),
  ]);

  if (!proposal) {
    return new Response("Not Found", { status: 404 });
  }

  const wb = XLSX.utils.book_new();

  // ── Sheet 1: 提案基本資料 ──────────────────────────────────────
  const infoRows = [
    ["提案標題", proposal.title],
    ["客戶名稱", proposal.clientName],
    ["當前階段", stageLabel[proposal.stage] ?? proposal.stage],
    ["總預算", proposal.budget],
    ["預計上線月份", proposal.launchMonth],
  ];
  const wsInfo = XLSX.utils.aoa_to_sheet(infoRows);
  wsInfo["!cols"] = [{ wch: 14 }, { wch: 36 }];
  XLSX.utils.book_append_sheet(wb, wsInfo, "提案基本資料");

  // ── Sheet 2: KOL 候選名單 ──────────────────────────────────────
  const headers = [
    "KOL 名稱",
    "合作項目",
    "預估報價",
    "實際報價",
    "真粉比例 (%)",
    "KOL 名聲",
    "平均互動率 (%)",
    "互動率 index",
    "互動率評分",
    "品牌適配度",
    "綜合品質分數",
    "CPFR",
    "KOL 選擇建議",
    "狀態",
    "客戶反饋",
  ];

  const dataRows = candidates.map((c) => [
    c.kolName,
    c.role || "-",
    c.price ?? 0,
    c.actualPrice ?? "",
    c.realFollowerRatio ?? "",
    c.reputationScore ?? "",
    c.avgEngagementRate ?? "",
    c.engagementIndex ?? "",
    c.engagementScore ?? "",
    c.brandFitScore ?? "",
    c.qualityScore ?? "",
    c.cpfr ?? "",
    c.recommendation || "",
    statusLabel[c.status] ?? c.status,
    c.feedbackText || "",
  ]);

  const wsKol = XLSX.utils.aoa_to_sheet([headers, ...dataRows]);
  wsKol["!cols"] = [
    { wch: 16 }, // KOL 名稱
    { wch: 14 }, // 合作項目
    { wch: 12 }, // 預估報價
    { wch: 12 }, // 實際報價
    { wch: 14 }, // 真粉比例
    { wch: 10 }, // KOL 名聲
    { wch: 14 }, // 平均互動率
    { wch: 14 }, // 互動率 index
    { wch: 12 }, // 互動率評分
    { wch: 12 }, // 品牌適配度
    { wch: 14 }, // 綜合品質分數
    { wch: 10 }, // CPFR
    { wch: 30 }, // KOL 選擇建議
    { wch: 10 }, // 狀態
    { wch: 24 }, // 客戶反饋
  ];
  XLSX.utils.book_append_sheet(wb, wsKol, "KOL 候選名單");

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  const safeTitle = proposal.title.replace(/[^\w一-鿿]/g, "_");
  const filename = `提案_${safeTitle}_${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
