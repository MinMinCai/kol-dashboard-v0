import {
  addProposalKol,
  deleteProposalKol,
  getProposal,
  listKols,
  listProposalKols,
  updateProposal,
  updateProposalKolDetails,
  updateProposalKolStatus,
} from "./mock-api.server";
import { notifyProposalUpdated } from "./notifications.server";

// ============ Internal helpers ============

function withTimeout<T,>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

function parseOptionalNumber(value: FormDataEntryValue | null): number | undefined {
  if (value == null) return undefined;
  const raw = String(value).replace(/,/g, "").trim();
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
}

// ============ Loader ============

export async function loadProposalDetail(proposalId: string) {
  const [proposal, candidates, allKols] = await Promise.all([
    withTimeout(getProposal(proposalId), null),
    withTimeout(listProposalKols(proposalId), []),
    withTimeout(listKols(), []),
  ]);

  if (!proposal) throw new Response("Not Found", { status: 404 });

  return { proposal, candidates, allKols };
}

// ============ Action ============

export async function handleProposalAction(
  proposalId: string,
  formData: FormData,
): Promise<{ success: boolean }> {
  const intent = formData.get("intent");
  const updatedBy = String(formData.get("updatedBy") ?? "同事");
  const ts = new Date().toISOString();

  if (intent === "add_candidate") {
    const kolId = String(formData.get("kolId"));
    const price = Number(String(formData.get("price") || "0").replace(/,/g, ""));
    const role = String(formData.get("role"));
    const recommendation = String(formData.get("recommendation") || formData.get("reason") || "");
    const kolName = String(formData.get("kolName"));
    const actualPriceStr = String(formData.get("actualPrice") || "").replace(/,/g, "");
    const actualPrice = actualPriceStr ? Number(actualPriceStr) : undefined;
    const realFollowerRatio = parseOptionalNumber(formData.get("realFollowerRatio"));
    const reputationScore = parseOptionalNumber(formData.get("reputationScore"));
    const avgEngagementRate = parseOptionalNumber(formData.get("avgEngagementRate"));
    const engagementIndex = parseOptionalNumber(formData.get("engagementIndex"));
    const engagementScore = parseOptionalNumber(formData.get("engagementScore"));
    const brandFitScore = parseOptionalNumber(formData.get("brandFitScore"));
    const qualityScore = parseOptionalNumber(formData.get("qualityScore"));
    const cpfr = parseOptionalNumber(formData.get("cpfr"));

    await addProposalKol({
      proposalId,
      kolId,
      kolName,
      price,
      actualPrice,
      role,
      reason: recommendation,
      realFollowerRatio,
      reputationScore,
      avgEngagementRate,
      engagementIndex,
      engagementScore,
      brandFitScore,
      qualityScore,
      cpfr,
      recommendation,
    });
    notifyProposalUpdated({ type: "proposal_updated", proposalId, updatedBy, field: `新增人選「${kolName}」`, timestamp: ts });
    return { success: true };
  }

  if (intent === "update_status") {
    const candidateId = String(formData.get("candidateId"));
    const status = String(formData.get("status"));
    const feedback = String(formData.get("feedback"));
    await updateProposalKolStatus(candidateId, status, feedback);
    notifyProposalUpdated({ type: "proposal_updated", proposalId, updatedBy, field: "更新人選狀態", timestamp: ts });
    return { success: true };
  }

  if (intent === "delete_candidate") {
    const candidateId = String(formData.get("candidateId"));
    await deleteProposalKol(candidateId);
    notifyProposalUpdated({ type: "proposal_updated", proposalId, updatedBy, field: "移除人選", timestamp: ts });
    return { success: true };
  }

  if (intent === "batch_delete_candidates") {
    const idsString = String(formData.get("candidateIds") || "");
    const ids = idsString.split(",").filter(Boolean);
    await Promise.all(ids.map(id => deleteProposalKol(id)));
    notifyProposalUpdated({ type: "proposal_updated", proposalId, updatedBy, field: `批次移除 ${ids.length} 位人選`, timestamp: ts });
    return { success: true };
  }

  if (intent === "update_candidate_details") {
    const candidateId = String(formData.get("candidateId"));
    const price = Number(String(formData.get("price") || "0").replace(/,/g, ""));
    const actualPriceStr = String(formData.get("actualPrice") || "").replace(/,/g, "");
    const actualPrice = actualPriceStr ? Number(actualPriceStr) : undefined;
    await updateProposalKolDetails(candidateId, {
      role: String(formData.get("role") || ""),
      price,
      actualPrice,
      realFollowerRatio: parseOptionalNumber(formData.get("realFollowerRatio")),
      reputationScore: parseOptionalNumber(formData.get("reputationScore")),
      avgEngagementRate: parseOptionalNumber(formData.get("avgEngagementRate")),
      engagementIndex: parseOptionalNumber(formData.get("engagementIndex")),
      engagementScore: parseOptionalNumber(formData.get("engagementScore")),
      brandFitScore: parseOptionalNumber(formData.get("brandFitScore")),
      qualityScore: parseOptionalNumber(formData.get("qualityScore")),
      cpfr: parseOptionalNumber(formData.get("cpfr")),
      recommendation: String(formData.get("recommendation") || ""),
      feedbackText: formData.has("feedbackText") ? String(formData.get("feedbackText") || "") : undefined,
    });
    notifyProposalUpdated({ type: "proposal_updated", proposalId, updatedBy, field: "更新候選人資料", timestamp: ts });
    return { success: true };
  }

  if (intent === "update_proposal") {
    const stage = formData.get("stage") ? String(formData.get("stage")) : undefined;
    const title = formData.get("title") ? String(formData.get("title")) : undefined;
    const clientName = formData.get("clientName") ? String(formData.get("clientName")) : undefined;
    const budgetStr = formData.get("budget") ? String(formData.get("budget")).replace(/,/g, "").replace(/\$/g, "") : undefined;
    const budget = budgetStr !== undefined ? Number(budgetStr) : undefined;
    const dueDate = formData.get("dueDate") ? String(formData.get("dueDate")) : undefined;

    await updateProposal(proposalId, { stage, title, clientName, budget, dueDate });
    const changedFields = ([stage ? "階段" : "", title ? "標題" : "", clientName ? "客戶" : "", budget !== undefined ? "預算" : "", dueDate ? "截止日" : ""]).filter((s) => s !== "").join("、");
    notifyProposalUpdated({ type: "proposal_updated", proposalId, updatedBy, field: `修改${changedFields}`, timestamp: ts });
    return { success: true };
  }

  return { success: false };
}
