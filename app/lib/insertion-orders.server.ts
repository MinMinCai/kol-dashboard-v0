import { json, redirect } from "@remix-run/node";
import {
  deleteIOReviewsByAuthor,
  deleteInsertionOrder,
  deletePerformanceItem,
  getInsertionOrder,
  listBrandCatalog,
  listIndustryCatalog,
  listTeamMembers,
  updateIOPerformance,
  updateInsertionOrder,
  updatePerformanceItem,
  upsertIOReviewByAuthor,
} from "./mock-api.server";
import { getCurrentMember } from "./demo-identity.server";

// ============ Internal helper ============

function withTimeout<T>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([promise, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))]);
}

// ============ Detail Loader ============

export async function loadInsertionOrderDetail(insertionOrderId: string, request: Request) {
  try {
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

    const salesOwners = (teamMembers ?? []).filter((m) => m.group === "AE").map((m) => m.name);
    const kolManagers = (teamMembers ?? []).filter((m) => m.group === "KOL").map((m) => m.name);
    const brands = (brandCatalog ?? []).map((b) => b.name);
    const industries = (industryCatalog ?? []).map((i) => i.name);
    const currentUserName = currentMember?.name ?? "";

    return { insertionOrder, salesOwners, kolManagers, brands, industries, currentUserName };
  } catch (error: any) {
    if (error instanceof Response) throw error;
    console.error("Loader error:", error);
    throw new Response(error.message || "Internal Server Error", { status: 500 });
  }
}

// ============ Detail Action ============

export async function handleInsertionOrderAction(
  orderId: string,
  request: Request,
  formData: FormData,
) {
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
        reports: [...(io.reports || []), newReport],
      });
    }
    return json({ success: true });
  }

  if (intent === "review") {
    const kolId = formData.get("kolId") as string;
    const rating = Math.round(Number(formData.get("rating")) * 2) / 2;
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

  if (intent === "reviewDelete") {
    const kolId = formData.get("kolId") as string;
    const currentMember = await getCurrentMember(request);
    const author = currentMember?.name ?? "Demo User";
    await deleteIOReviewsByAuthor(orderId, kolId, author);
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
