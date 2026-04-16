import { db } from "./db.server";
import {
  kols as kolsTable,
  proposals as proposalsTable,
  proposalKols as proposalKolsTable,
  insertionOrders as ioTable,
  tagCatalog as tagCatalogTable,
  brandCatalog as brandCatalogTable,
  industryCatalog as industryCatalogTable,
  platformCatalog as platformCatalogTable,
  teamMembers as teamMembersTable,
  systemPreferences as systemPreferencesTable,
} from "../../db/drizzle/schema";
import { eq } from "drizzle-orm";

// ─── Types ────────────────────────────────────────────────────────────────────

export type KolCollabMetrics = {
  postViews?: number;
  postLikes?: number;
  postComments?: number;
  storyViews?: number;
  storyLikes?: number;
};

export type KolCollabRecord = {
  id: string;
  date: string;
  projectTitle: string;
  clientName: string;
  industry: string;
  price: number;
  services: string;
  rating: number;
  orderId?: string;
  metrics?: KolCollabMetrics;
};

export type PricePoint = {
  date: string;
  price: number;
};

export type PerformanceStats = {
  averageReach?: number;
  engagementRate?: number;
  averageViews?: number;
  conversionRate?: number;
  platformPerformance?: {
    instagram?: number;
    youtube?: number;
    tiktok?: number;
  };
};

export type OrderPerformanceMetrics = {
  impressions?: number;
  reach?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  engagementRate?: number;
};

export type OrderPerformanceItem = {
  id: string;
  title: string;
  thumbnails?: string[];
  performanceScreenshots?: string[];
  metrics?: OrderPerformanceMetrics;
};

export type OrderReview = {
  id: string;
  author: string;
  avatarUrl?: string;
  date: string;
  comment: string;
  rating: number;
  type?: "internal" | "external";
};

export type OrderKolCollaboration = {
  id: string;
  kolId?: string;
  name: string;
  avatarUrl?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  price?: number;
  services?: string;
  uploadDate?: string;
  executionDate?: string;
  authorization?: string;
  rating?: number;
  totalReach?: number;
  totalEngagement?: number;
  performanceItems?: OrderPerformanceItem[];
  reviews?: OrderReview[];
};

export type Kol = {
  id: string;
  displayName: string;
  instagramHandle?: string;
  youtubeSubscribers?: number;
  industry?: string;
  tags?: string[];
  rating?: number;
  collaborations?: number;
  averagePrice?: number;
  industryDistribution?: string[];
  isFavorite?: boolean;
  favoriteFolder?: string;
  avatarUrl?: string;
  social?: {
    instagram?: number;
    youtube?: number;
    tiktok?: number;
    facebook?: number;
  };
  contact?: {
    phone?: string;
    email?: string;
    manager?: string;
  };
  collaborationHistory?: KolCollabRecord[];
  priceTrend?: PricePoint[];
  performanceStats?: PerformanceStats;
  categories: string[];
  platform: string;
  followers: number;
  engagementRate: number;
  exposureRate?: number;
  audienceGender?: { male: number; female: number };
  audienceAge?: string;
  introduction?: string;
  city: string;
  notes?: string;
  paymentMethod?: "勞報" | "發票";
  platformMetrics?: PlatformMetrics;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
  };
};

export type Proposal = {
  id: string;
  title: string;
  clientName: string;
  stage: string;
  budget: number;
  dueDate: string;
};

export type PlatformAudienceMetrics = {
  engagementRate?: number;
  exposureRate?: number;
  audienceGender?: { male: number; female: number };
  audienceAge?: string;
};

export type PlatformMetrics = {
  audienceMetrics?: Record<string, PlatformAudienceMetrics>;
  priceTrend?: Record<string, PricePoint[]>;
};

export type ProposalKol = {
  id: string;
  proposalId: string;
  kolId: string;
  kolName: string;
  kolAvatarUrl?: string;
  price: number;
  actualPrice?: number;
  role: string;
  reason: string;
  status: string;
  feedbackText: string;
};

export type TagCatalogItem = { id: string | number; name: string };
export type BrandCatalogItem = { id: string | number; name: string };
export type IndustryCatalogItem = { id: string | number; name: string };
export type PlatformCatalogItem = { id: string | number; name: string };

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  group: "AE" | "KOL" | "Tech" | "Media" | "其他";
};

export type Report = {
  id: string;
  name: string;
  type: "draft" | "official";
  createdAt: string;
  createdBy: string;
  fileSize?: string;
  note?: string;
};

export type SystemPreferences = {
  currency: string;
  defaultTaxRate: number;
  defaultReportLang: string;
  notifyEmail: string;
  aiSuggestions: boolean;
};

export type InsertionOrder = {
  id: string;
  orderNo: string;
  orderTitle?: string;
  title?: string;
  projectName?: string;
  clientName: string;
  mcnName?: string;
  brand?: string;
  industry?: string;
  industryPath?: string;
  salesOwner?: string;
  kolManager?: string;
  kolCount?: number;
  avgRating?: number;
  avgEngagementRate?: number;
  totalReach?: number;
  totalEngagement?: number;
  documentUrl?: string;
  collaborations?: OrderKolCollaboration[];
  status: string;
  totalBudget: number;
  tax?: number;
  totalWithTax?: number;
  startDate: string;
  endDate: string;
  hasDraft?: boolean;
  hasOfficial?: boolean;
  reports?: Report[];
};

// ─── Row mappers ──────────────────────────────────────────────────────────────

function rowToKol(row: typeof kolsTable.$inferSelect): Kol {
  return {
    id: row.id,
    displayName: row.displayName,
    industry: row.industry ?? undefined,
    tags: row.tags ?? [],
    rating: row.rating != null ? Number(row.rating) : undefined,
    collaborations: row.collaborationCount ?? undefined,
    averagePrice: row.averagePrice != null ? Number(row.averagePrice) : undefined,
    industryDistribution: row.industryDistribution ?? [],
    isFavorite: row.isFavorite,
    favoriteFolder: row.favoriteFolder ?? undefined,
    avatarUrl: row.avatarUrl ?? undefined,
    social: (row.social as Kol["social"]) ?? undefined,
    contact: (row.contact as Kol["contact"]) ?? undefined,
    collaborationHistory: (row.collaborationHistory as KolCollabRecord[]) ?? [],
    priceTrend: (row.priceTrend as PricePoint[]) ?? [],
    performanceStats: (row.performanceStats as PerformanceStats) ?? undefined,
    categories: row.categories ?? [],
    platform: row.platform ?? "",
    followers: row.followers ?? 0,
    engagementRate: row.engagementRate != null ? Number(row.engagementRate) : 0,
    exposureRate: row.exposureRate != null ? Number(row.exposureRate) : undefined,
    audienceGender: (row.audienceGender as Kol["audienceGender"]) ?? undefined,
    audienceAge: row.audienceAge ?? undefined,
    introduction: row.introduction ?? undefined,
    city: row.city ?? "",
    notes: row.notes ?? undefined,
    instagramHandle: row.instagramHandle ?? undefined,
    paymentMethod: (row.paymentMethod as Kol["paymentMethod"]) ?? undefined,
    platformMetrics: (row.platformMetrics as PlatformMetrics) ?? undefined,
    socialLinks: (row.socialLinks as Kol["socialLinks"]) ?? undefined,
  };
}

function rowToProposal(row: typeof proposalsTable.$inferSelect): Proposal {
  const budget = row.budget != null ? Number(row.budget) : 0;
  const rawDate = row.dueDate as unknown;
  const dueDate = rawDate instanceof Date
    ? rawDate.toISOString().slice(0, 10)
    : typeof rawDate === "string"
      ? rawDate.slice(0, 10)
      : "";
  return {
    id: row.id,
    title: row.title,
    clientName: row.clientName ?? "",
    stage: row.stage,
    budget: isNaN(budget) ? 0 : budget,
    dueDate,
  };
}

function rowToProposalKol(row: typeof proposalKolsTable.$inferSelect): ProposalKol {
  return {
    id: row.id,
    proposalId: row.proposalId,
    kolId: row.kolId ?? "",
    kolName: row.kolName ?? "",
    kolAvatarUrl: row.kolAvatarUrl ?? undefined,
    price: row.proposedFee != null ? Number(row.proposedFee) : 0,
    role: row.role ?? "",
    reason: row.reason ?? "",
    status: row.status,
    feedbackText: row.feedbackText ?? "",
    actualPrice: row.actualFee != null ? Number(row.actualFee) : undefined,
  };
}

function rowToInsertionOrder(row: typeof ioTable.$inferSelect): InsertionOrder {
  return {
    id: row.id,
    orderNo: row.orderNo,
    title: row.title ?? undefined,
    projectName: row.projectName ?? undefined,
    clientName: row.clientName ?? "",
    mcnName: row.mcnName ?? undefined,
    brand: row.brand ?? undefined,
    industry: row.industry ?? undefined,
    industryPath: row.industryPath ?? undefined,
    salesOwner: row.salesOwner ?? undefined,
    kolManager: row.kolManager ?? undefined,
    kolCount: row.kolCount ?? 0,
    avgRating: row.avgRating != null ? Number(row.avgRating) : undefined,
    avgEngagementRate: row.avgEngagementRate != null ? Number(row.avgEngagementRate) : undefined,
    totalReach: row.totalReach ?? 0,
    totalEngagement: row.totalEngagement ?? 0,
    documentUrl: row.documentUrl ?? undefined,
    collaborations: (row.collaborations as OrderKolCollaboration[]) ?? [],
    status: row.status,
    totalBudget: row.totalBudget != null ? Number(row.totalBudget) : 0,
    tax: row.tax != null ? Number(row.tax) : undefined,
    totalWithTax: row.totalWithTax != null ? Number(row.totalWithTax) : undefined,
    startDate: row.startDate ?? "",
    endDate: row.endDate ?? "",
    hasDraft: row.hasDraft,
    hasOfficial: row.hasOfficial,
    reports: (row.reports as Report[]) ?? [],
  };
}

// ─── KOL API ──────────────────────────────────────────────────────────────────

export async function listKols(): Promise<Kol[]> {
  const rows = await db.select().from(kolsTable);
  return rows.map(rowToKol);
}

export async function getKol(id: string): Promise<Kol | null> {
  const rows = await db.select().from(kolsTable).where(eq(kolsTable.id, id)).limit(1);
  return rows.length > 0 ? rowToKol(rows[0]) : null;
}

export async function updateKol(id: string, data: Partial<Kol>): Promise<Kol> {
  const update: Partial<typeof kolsTable.$inferInsert> = {};
  if (data.displayName !== undefined) update.displayName = data.displayName;
  if (data.industry !== undefined) update.industry = data.industry;
  if (data.tags !== undefined) update.tags = data.tags;
  if (data.rating !== undefined) update.rating = String(data.rating);
  if (data.collaborations !== undefined) update.collaborationCount = data.collaborations;
  if (data.averagePrice !== undefined) update.averagePrice = String(data.averagePrice);
  if (data.industryDistribution !== undefined) update.industryDistribution = data.industryDistribution;
  if (data.isFavorite !== undefined) update.isFavorite = data.isFavorite;
  if (data.favoriteFolder !== undefined) update.favoriteFolder = data.favoriteFolder;
  if (data.avatarUrl !== undefined) update.avatarUrl = data.avatarUrl;
  if (data.social !== undefined) update.social = data.social;
  if (data.contact !== undefined) update.contact = data.contact;
  if (data.collaborationHistory !== undefined) update.collaborationHistory = data.collaborationHistory;
  if (data.priceTrend !== undefined) update.priceTrend = data.priceTrend;
  if (data.performanceStats !== undefined) update.performanceStats = data.performanceStats;
  if (data.categories !== undefined) update.categories = data.categories;
  if (data.platform !== undefined) update.platform = data.platform;
  if (data.followers !== undefined) update.followers = data.followers;
  if (data.engagementRate !== undefined) update.engagementRate = String(data.engagementRate);
  if (data.exposureRate !== undefined) update.exposureRate = String(data.exposureRate);
  if (data.audienceGender !== undefined) update.audienceGender = data.audienceGender;
  if (data.audienceAge !== undefined) update.audienceAge = data.audienceAge;
  if (data.introduction !== undefined) update.introduction = data.introduction;
  if (data.city !== undefined) update.city = data.city;
  if (data.notes !== undefined) update.notes = data.notes;
  if (data.instagramHandle !== undefined) update.instagramHandle = data.instagramHandle;
  if (data.paymentMethod !== undefined) update.paymentMethod = data.paymentMethod;
  if (data.platformMetrics !== undefined) update.platformMetrics = data.platformMetrics;
  if (data.socialLinks !== undefined) update.socialLinks = data.socialLinks;
  update.updatedAt = new Date();

  const rows = await db.update(kolsTable).set(update).where(eq(kolsTable.id, id)).returning();
  if (rows.length === 0) throw new Error("Update failed");
  return rowToKol(rows[0]);
}

export async function createKol(data: Omit<Kol, "id">): Promise<Kol> {
  const rows = await db
    .insert(kolsTable)
    .values({
      id: crypto.randomUUID(),
      displayName: data.displayName,
      city: data.city ?? "",
      industry: data.industry ?? null,
      tags: data.tags ?? [],
      categories: data.categories ?? [],
      rating: data.rating != null ? String(data.rating) : null,
      collaborationCount: data.collaborations ?? 0,
      averagePrice: data.averagePrice != null ? String(data.averagePrice) : null,
      isFavorite: data.isFavorite ?? false,
      favoriteFolder: data.favoriteFolder ?? null,
      avatarUrl: data.avatarUrl ?? null,
      platform: data.platform ?? null,
      followers: data.followers ?? 0,
      engagementRate: data.engagementRate != null ? String(data.engagementRate) : null,
      exposureRate: data.exposureRate != null ? String(data.exposureRate) : null,
      audienceGender: data.audienceGender ?? null,
      audienceAge: data.audienceAge ?? null,
      introduction: data.introduction ?? null,
      instagramHandle: data.instagramHandle ?? null,
      notes: data.notes ?? null,
      paymentMethod: data.paymentMethod ?? null,
      social: data.social ?? {},
      contact: data.contact ?? {},
      collaborationHistory: data.collaborationHistory ?? [],
      priceTrend: data.priceTrend ?? [],
      performanceStats: data.performanceStats ?? null,
      platformMetrics: data.platformMetrics ?? null,
      socialLinks: data.socialLinks ?? null,
      contactEmail: data.contact?.email ?? null,
      contactPhone: data.contact?.phone ?? null,
      status: "active",
    })
    .returning();
  return rowToKol(rows[0]);
}

export async function deleteKol(id: string): Promise<boolean> {
  await db.delete(kolsTable).where(eq(kolsTable.id, id));
  return true;
}

// ─── Proposal API ─────────────────────────────────────────────────────────────

export async function listProposals(): Promise<Proposal[]> {
  const rows = await db.select().from(proposalsTable);
  return rows.map(rowToProposal);
}

export async function getProposal(id: string): Promise<Proposal | null> {
  const rows = await db.select().from(proposalsTable).where(eq(proposalsTable.id, id)).limit(1);
  return rows.length > 0 ? rowToProposal(rows[0]) : null;
}

export async function updateProposal(id: string, data: Partial<Proposal>): Promise<Proposal> {
  const update: Partial<typeof proposalsTable.$inferInsert> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.clientName !== undefined) update.clientName = data.clientName;
  if (data.stage !== undefined) update.stage = data.stage;
  if (data.budget !== undefined) update.budget = String(data.budget);
  if (data.dueDate !== undefined) update.dueDate = data.dueDate;
  update.updatedAt = new Date();

  const rows = await db.update(proposalsTable).set(update).where(eq(proposalsTable.id, id)).returning();
  if (rows.length === 0) throw new Error("Update failed");
  return rowToProposal(rows[0]);
}

export async function createProposal(data: Omit<Proposal, "id">): Promise<Proposal> {
  const rows = await db
    .insert(proposalsTable)
    .values({
      id: crypto.randomUUID(),
      title: data.title,
      clientName: data.clientName ?? null,
      stage: data.stage ?? "draft",
      budget: data.budget != null ? String(data.budget) : null,
      dueDate: data.dueDate || null,
    })
    .returning();
  return rowToProposal(rows[0]);
}

export async function deleteProposal(id: string): Promise<boolean> {
  await db.delete(proposalsTable).where(eq(proposalsTable.id, id));
  return true;
}

// ─── ProposalKol API ──────────────────────────────────────────────────────────

export async function listProposalKols(proposalId: string): Promise<ProposalKol[]> {
  const rows = await db.select().from(proposalKolsTable).where(eq(proposalKolsTable.proposalId, proposalId));
  return rows.map(rowToProposalKol);
}

export async function addProposalKol(
  data: Omit<ProposalKol, "id" | "status" | "feedbackText">,
): Promise<ProposalKol> {
  const rows = await db
    .insert(proposalKolsTable)
    .values({
      id: crypto.randomUUID(),
      proposalId: data.proposalId,
      kolId: data.kolId || null,
      kolName: data.kolName,
      kolAvatarUrl: data.kolAvatarUrl,
      proposedFee: String(data.price),
      role: data.role,
      reason: data.reason,
      status: "pending",
      feedbackText: "",
    })
    .returning();
  return rowToProposalKol(rows[0]);
}

export async function updateProposalKolStatus(
  id: string,
  status: string,
  feedbackText: string,
): Promise<ProposalKol> {
  const rows = await db
    .update(proposalKolsTable)
    .set({ status, feedbackText })
    .where(eq(proposalKolsTable.id, id))
    .returning();
  if (rows.length === 0) throw new Error("Update failed");
  return rowToProposalKol(rows[0]);
}

export async function updateProposalKolActualPrice(
  id: string,
  actualFee: number | null,
): Promise<ProposalKol> {
  const rows = await db
    .update(proposalKolsTable)
    .set({ actualFee: actualFee != null ? String(actualFee) : null })
    .where(eq(proposalKolsTable.id, id))
    .returning();
  if (rows.length === 0) throw new Error("Update failed");
  return rowToProposalKol(rows[0]);
}

export async function deleteProposalKol(id: string): Promise<boolean> {
  await db.delete(proposalKolsTable).where(eq(proposalKolsTable.id, id));
  return true;
}

// ─── Insertion Order API ──────────────────────────────────────────────────────

export async function listInsertionOrders(): Promise<InsertionOrder[]> {
  const rows = await db.select().from(ioTable);
  return rows.map(rowToInsertionOrder);
}

export async function getInsertionOrder(id: string): Promise<InsertionOrder | null> {
  const rows = await db.select().from(ioTable).where(eq(ioTable.id, id)).limit(1);
  return rows.length > 0 ? rowToInsertionOrder(rows[0]) : null;
}

export async function updateInsertionOrder(
  id: string,
  data: Partial<InsertionOrder>,
): Promise<InsertionOrder> {
  const update: Partial<typeof ioTable.$inferInsert> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.clientName !== undefined) update.clientName = data.clientName;
  if (data.status !== undefined) update.status = data.status;
  if (data.totalBudget !== undefined) update.totalBudget = String(data.totalBudget);
  if (data.startDate !== undefined) update.startDate = data.startDate;
  if (data.endDate !== undefined) update.endDate = data.endDate;
  if (data.industry !== undefined) update.industry = data.industry;
  if (data.salesOwner !== undefined) update.salesOwner = data.salesOwner;
  if (data.kolManager !== undefined) update.kolManager = data.kolManager;
  if (data.kolCount !== undefined) update.kolCount = data.kolCount;
  if (data.avgRating !== undefined) update.avgRating = String(data.avgRating);
  if (data.avgEngagementRate !== undefined) update.avgEngagementRate = String(data.avgEngagementRate);
  if (data.totalReach !== undefined) update.totalReach = data.totalReach;
  if (data.totalEngagement !== undefined) update.totalEngagement = data.totalEngagement;
  if (data.documentUrl !== undefined) update.documentUrl = data.documentUrl;
  if (data.collaborations !== undefined) update.collaborations = data.collaborations;
  if (data.tax !== undefined) update.tax = String(data.tax);
  if (data.totalWithTax !== undefined) update.totalWithTax = String(data.totalWithTax);
  if (data.hasDraft !== undefined) update.hasDraft = data.hasDraft;
  if (data.hasOfficial !== undefined) update.hasOfficial = data.hasOfficial;
  if (data.reports !== undefined) update.reports = data.reports;
  update.updatedAt = new Date();

  const rows = await db.update(ioTable).set(update).where(eq(ioTable.id, id)).returning();
  if (rows.length === 0) throw new Error("Update failed");
  return rowToInsertionOrder(rows[0]);
}

export async function createInsertionOrder(data: Omit<InsertionOrder, "id">): Promise<InsertionOrder> {
  const rows = await db
    .insert(ioTable)
    .values({
      id: crypto.randomUUID(),
      orderNo: data.orderNo,
      title: data.title ?? null,
      projectName: data.projectName ?? null,
      clientName: data.clientName ?? null,
      brand: data.brand ?? null,
      mcnName: data.mcnName ?? null,
      industry: data.industry ?? null,
      industryPath: data.industryPath ?? null,
      salesOwner: data.salesOwner ?? null,
      kolManager: data.kolManager ?? null,
      kolCount: data.kolCount ?? 0,
      status: data.status ?? "created",
      totalBudget: data.totalBudget != null ? String(data.totalBudget) : null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      avgRating: data.avgRating != null ? String(data.avgRating) : null,
      avgEngagementRate: data.avgEngagementRate != null ? String(data.avgEngagementRate) : null,
      totalReach: data.totalReach ?? 0,
      totalEngagement: data.totalEngagement ?? 0,
      documentUrl: data.documentUrl ?? null,
      tax: data.tax != null ? String(data.tax) : null,
      totalWithTax: data.totalWithTax != null ? String(data.totalWithTax) : null,
      hasDraft: data.hasDraft ?? false,
      hasOfficial: data.hasOfficial ?? false,
      collaborations: data.collaborations ?? [],
      reports: data.reports ?? [],
      contractStatus: "pending",
      invoiceStatus: "pending",
    })
    .returning();
  return rowToInsertionOrder(rows[0]);
}

export async function deleteInsertionOrder(id: string): Promise<boolean> {
  await db.delete(ioTable).where(eq(ioTable.id, id));
  return true;
}

export async function addIOReview(
  orderId: string,
  kolId: string,
  review: Omit<OrderReview, "id" | "date">,
): Promise<InsertionOrder> {
  const io = await getInsertionOrder(orderId);
  if (!io) throw new Error("Order not found");
  const collabs = io.collaborations ?? [];
  const idx = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (idx === -1) throw new Error("Collaboration not found");
  const newReview: OrderReview = {
    ...review,
    id: `rv_${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
  };
  const updated = [...collabs];
  updated[idx] = { ...updated[idx], reviews: [...(updated[idx].reviews ?? []), newReview] };
  return updateInsertionOrder(orderId, { collaborations: updated });
}

export async function updateIOPerformance(
  orderId: string,
  kolId: string,
  performance: Omit<OrderPerformanceItem, "id">,
): Promise<InsertionOrder> {
  const io = await getInsertionOrder(orderId);
  if (!io) throw new Error("Order not found");
  const collabs = io.collaborations ?? [];
  const idx = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (idx === -1) throw new Error("Collaboration not found");
  const newItem: OrderPerformanceItem = { ...performance, id: `perf_${Date.now()}` };
  const updated = [...collabs];
  updated[idx] = { ...updated[idx], performanceItems: [...(updated[idx].performanceItems ?? []), newItem] };
  return updateInsertionOrder(orderId, { collaborations: updated });
}

// ─── Tag Catalog ──────────────────────────────────────────────────────────────

export async function listTagCatalog(): Promise<TagCatalogItem[]> {
  try {
    return await db.select().from(tagCatalogTable);
  } catch {
    return [];
  }
}

export async function addTagCatalog(data: Omit<TagCatalogItem, "id">): Promise<TagCatalogItem> {
  const rows = await db.insert(tagCatalogTable).values({ id: crypto.randomUUID(), name: data.name }).returning();
  return rows[0];
}

export async function updateTagCatalog(
  id: string | number,
  data: Partial<TagCatalogItem>,
): Promise<TagCatalogItem> {
  const rows = await db
    .update(tagCatalogTable)
    .set({ name: data.name })
    .where(eq(tagCatalogTable.id, String(id)))
    .returning();
  return rows[0];
}

export async function deleteTagCatalog(id: string | number): Promise<boolean> {
  await db.delete(tagCatalogTable).where(eq(tagCatalogTable.id, String(id)));
  return true;
}

// ─── Brand Catalog ────────────────────────────────────────────────────────────

export async function listBrandCatalog(): Promise<BrandCatalogItem[]> {
  try {
    return await db.select().from(brandCatalogTable);
  } catch {
    return [];
  }
}

export async function addBrandCatalog(data: Omit<BrandCatalogItem, "id">): Promise<BrandCatalogItem> {
  const rows = await db.insert(brandCatalogTable).values({ id: crypto.randomUUID(), name: data.name }).returning();
  return rows[0];
}

export async function updateBrandCatalog(
  id: string | number,
  data: Partial<BrandCatalogItem>,
): Promise<BrandCatalogItem> {
  const rows = await db
    .update(brandCatalogTable)
    .set({ name: data.name })
    .where(eq(brandCatalogTable.id, String(id)))
    .returning();
  return rows[0];
}

export async function deleteBrandCatalog(id: string | number): Promise<boolean> {
  await db.delete(brandCatalogTable).where(eq(brandCatalogTable.id, String(id)));
  return true;
}

// ─── Industry Catalog ─────────────────────────────────────────────────────────

export async function listIndustryCatalog(): Promise<IndustryCatalogItem[]> {
  try {
    return await db.select().from(industryCatalogTable);
  } catch {
    return [];
  }
}

export async function addIndustryCatalog(
  data: Omit<IndustryCatalogItem, "id">,
): Promise<IndustryCatalogItem> {
  const rows = await db.insert(industryCatalogTable).values({ id: crypto.randomUUID(), name: data.name }).returning();
  return rows[0];
}

export async function updateIndustryCatalog(
  id: string | number,
  data: Partial<IndustryCatalogItem>,
): Promise<IndustryCatalogItem> {
  const rows = await db
    .update(industryCatalogTable)
    .set({ name: data.name })
    .where(eq(industryCatalogTable.id, String(id)))
    .returning();
  return rows[0];
}

export async function deleteIndustryCatalog(id: string | number): Promise<boolean> {
  await db.delete(industryCatalogTable).where(eq(industryCatalogTable.id, String(id)));
  return true;
}

// ─── Platform Catalog ─────────────────────────────────────────────────────────

export async function listPlatformCatalog(): Promise<PlatformCatalogItem[]> {
  try {
    return await db.select().from(platformCatalogTable);
  } catch {
    return [];
  }
}

export async function addPlatformCatalog(
  data: Omit<PlatformCatalogItem, "id">,
): Promise<PlatformCatalogItem> {
  const rows = await db.insert(platformCatalogTable).values({ id: crypto.randomUUID(), name: data.name }).returning();
  return rows[0];
}

export async function updatePlatformCatalog(
  id: string | number,
  data: Partial<PlatformCatalogItem>,
): Promise<PlatformCatalogItem> {
  const rows = await db
    .update(platformCatalogTable)
    .set({ name: data.name })
    .where(eq(platformCatalogTable.id, String(id)))
    .returning();
  return rows[0];
}

export async function deletePlatformCatalog(id: string | number): Promise<boolean> {
  await db.delete(platformCatalogTable).where(eq(platformCatalogTable.id, String(id)));
  return true;
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export async function listTeamMembers(): Promise<TeamMember[]> {
  const rows = await db.select().from(teamMembersTable);
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    role: r.role as TeamMember["role"],
    group: r.group as TeamMember["group"],
  }));
}

export async function addTeamMember(data: Omit<TeamMember, "id">): Promise<TeamMember> {
  const rows = await db
    .insert(teamMembersTable)
    .values({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      group: data.group,
    })
    .returning();
  const r = rows[0];
  return { id: r.id, name: r.name, email: r.email, role: r.role as TeamMember["role"], group: r.group as TeamMember["group"] };
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  const update: Partial<typeof teamMembersTable.$inferInsert> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.email !== undefined) update.email = data.email;
  if (data.role !== undefined) update.role = data.role;
  if (data.group !== undefined) update.group = data.group;
  update.updatedAt = new Date();
  const rows = await db.update(teamMembersTable).set(update).where(eq(teamMembersTable.id, id)).returning();
  const r = rows[0];
  return { id: r.id, name: r.name, email: r.email, role: r.role as TeamMember["role"], group: r.group as TeamMember["group"] };
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  await db.delete(teamMembersTable).where(eq(teamMembersTable.id, id));
  return true;
}

// ─── System Preferences ───────────────────────────────────────────────────────

export async function getSystemPreferences(): Promise<SystemPreferences> {
  const rows = await db
    .select()
    .from(systemPreferencesTable)
    .where(eq(systemPreferencesTable.id, "default"))
    .limit(1);

  if (rows.length === 0) {
    // Insert default row if not exists
    await db.insert(systemPreferencesTable).values({ id: "default" }).onConflictDoNothing();
    return { currency: "TWD", defaultTaxRate: 5, defaultReportLang: "zh-TW", notifyEmail: "", aiSuggestions: true };
  }

  const r = rows[0];
  return {
    currency: r.currency,
    defaultTaxRate: Number(r.defaultTaxRate),
    defaultReportLang: r.defaultReportLang,
    notifyEmail: r.notifyEmail,
    aiSuggestions: r.aiSuggestions,
  };
}

export async function updateSystemPreferences(
  data: Partial<SystemPreferences>,
): Promise<SystemPreferences> {
  const update: Partial<typeof systemPreferencesTable.$inferInsert> = {};
  if (data.currency !== undefined) update.currency = data.currency;
  if (data.defaultTaxRate !== undefined) update.defaultTaxRate = String(data.defaultTaxRate);
  if (data.defaultReportLang !== undefined) update.defaultReportLang = data.defaultReportLang;
  if (data.notifyEmail !== undefined) update.notifyEmail = data.notifyEmail;
  if (data.aiSuggestions !== undefined) update.aiSuggestions = data.aiSuggestions;
  update.updatedAt = new Date();

  await db
    .insert(systemPreferencesTable)
    .values({ id: "default", ...update })
    .onConflictDoUpdate({ target: systemPreferencesTable.id, set: update });

  return getSystemPreferences();
}
