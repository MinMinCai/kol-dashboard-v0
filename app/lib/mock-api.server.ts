import { db } from "./db.server";
import {
  kols as kolsTable,
  kolSocialAccounts as kolSocialAccountsTable,
  proposals as proposalsTable,
  proposalKols as proposalKolsTable,
  insertionOrders as ioTable,
  kolFavoriteFolders as kolFavoriteFoldersTable,
  kolFavoriteFolderItems as kolFavoriteFolderItemsTable,
  kolFavoriteFolderMemberShares as kolFavoriteFolderMemberSharesTable,
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
  favoriteFolders?: string[];
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
  /** @deprecated Use `platforms` (from platformMetrics.platforms) for multi-platform support */
  platform: string;
  /** 此 KOL 實際經營的所有社群平台清單 (e.g. ["Instagram", "YouTube", "TikTok"]) */
  platforms?: string[];
  followers: number;
  engagementRate: number;
  exposureRate?: number;
  audienceGender?: { male: number; female: number };
  audienceAge?: string;
  introduction?: string;
  city: string;
  notes?: string;
  paymentMethod?: "勞報" | "發票";
  gender?: "男" | "女" | "其他";
  age?: number;
  realFollowerRatio?: number;
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
  realFollowerRatio?: number;
  audienceGender?: { male: number; female: number };
  audienceAge?: string;
};

export type PlatformMetrics = {
  audienceMetrics?: Record<string, PlatformAudienceMetrics>;
  /** 各平台的價格趨勢 e.g. { Instagram: [{date, price}, ...], YouTube: [...] } */
  priceTrend?: Record<string, PricePoint[]>;
  /** 各平台的平均評分 e.g. { Instagram: 4.7, YouTube: 4.2 } */
  avgRating?: Record<string, number>;
  /** 各平台的平均互動率(%) e.g. { Instagram: 4.9, YouTube: 3.5 } */
  avgEngagementRate?: Record<string, number>;
  /** KOL 實際經營的平台清單 e.g. ["Instagram", "YouTube", "TikTok"] */
  platforms?: string[];
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
  realFollowerRatio?: number;
  reputationScore?: number;
  avgEngagementRate?: number;
  engagementIndex?: number;
  engagementScore?: number;
  brandFitScore?: number;
  qualityScore?: number;
  cpfr?: number;
  recommendation?: string;
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
  filePath?: string;
  templateKey?: string;
  selectedKolIds?: string[];
  reportTitle?: string;
};

export type SystemPreferences = {
  currency: string;
  defaultTaxRate: number;
  defaultReportLang: string;
  notifyEmail: string;
  aiSuggestions: boolean;
  favoriteFolders: string[];
};

export type FolderAccess = "owner" | "shared" | "public";

export type FavoriteFolder = {
  id: string;
  name: string;
  description?: string;
  kolCount: number;
  // Sharing & ownership (populated when listFavoriteFolderDetails is called
  // with a memberId). Folders without an ownerMemberId are treated as legacy
  // public folders that anyone can edit.
  ownerMemberId?: string | null;
  ownerName?: string | null;
  access?: FolderAccess;
  sharedWithMemberIds?: string[];
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
  const platformMetrics = (row.platformMetrics as PlatformMetrics) ?? undefined;
  // Derive platforms list: prefer platformMetrics.platforms, fallback to social keys, then single platform field
  const derivedPlatforms: string[] = (() => {
    if (platformMetrics?.platforms && platformMetrics.platforms.length > 0) {
      return platformMetrics.platforms;
    }
    const social = (row.social as Record<string, number> | null) ?? {};
    const fromSocial = Object.entries(social)
      .filter(([, v]) => v > 0)
      .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));
    if (fromSocial.length > 0) return fromSocial;
    return row.platform ? [row.platform] : [];
  })();
  const primaryPlatform = derivedPlatforms[0] ?? "Instagram";
  const derivedRealFollowerRatio =
    platformMetrics?.audienceMetrics?.[primaryPlatform]?.realFollowerRatio
    ?? platformMetrics?.audienceMetrics?.Instagram?.realFollowerRatio;

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
    favoriteFolders: [],
    avatarUrl: row.avatarUrl ?? undefined,
    social: (row.social as Kol["social"]) ?? undefined,
    contact: (row.contact as Kol["contact"]) ?? undefined,
    collaborationHistory: (row.collaborationHistory as KolCollabRecord[]) ?? [],
    priceTrend: (row.priceTrend as PricePoint[]) ?? [],
    performanceStats: (row.performanceStats as PerformanceStats) ?? undefined,
    categories: row.categories ?? [],
    platform: row.platform ?? "",
    platforms: derivedPlatforms,
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
    gender: (row.gender as Kol["gender"]) ?? undefined,
    age: row.age ?? undefined,
    realFollowerRatio: derivedRealFollowerRatio,
    platformMetrics,
    socialLinks: (row.socialLinks as Kol["socialLinks"]) ?? undefined,
  };
}

async function getFavoriteFolderState() {
  const [folderRows, itemRows, shareRows, prefs] = await Promise.all([
    db.select().from(kolFavoriteFoldersTable).catch(() => []),
    db.select().from(kolFavoriteFolderItemsTable).catch(() => []),
    db.select().from(kolFavoriteFolderMemberSharesTable).catch(() => []),
    getSystemPreferences(),
  ]);

  const folderById = new Map(folderRows.map((row) => [row.id, row]));
  const folderNames = new Set<string>(prefs.favoriteFolders);

  for (const row of folderRows) {
    folderNames.add(row.name);
  }

  const folderNamesByKolId = new Map<string, string[]>();
  for (const item of itemRows) {
    const folder = folderById.get(item.folderId);
    if (!folder) continue;
    const current = folderNamesByKolId.get(item.kolId) ?? [];
    if (!current.includes(folder.name)) current.push(folder.name);
    folderNamesByKolId.set(item.kolId, current);
  }

  const memberIdsByFolderId = new Map<string, string[]>();
  for (const share of shareRows) {
    const current = memberIdsByFolderId.get(share.folderId) ?? [];
    if (!current.includes(share.memberId)) current.push(share.memberId);
    memberIdsByFolderId.set(share.folderId, current);
  }

  return {
    folderRows,
    itemRows,
    shareRows,
    folderById,
    folderNames: Array.from(folderNames),
    folderNamesByKolId,
    memberIdsByFolderId,
  };
}

async function enrichKols(kols: Kol[]): Promise<Kol[]> {
  const [{ folderNamesByKolId }, socialAccountRows, ioRows] = await Promise.all([
    getFavoriteFolderState(),
    db.select().from(kolSocialAccountsTable).catch(() => []),
    db.select({ collaborations: ioTable.collaborations }).from(ioTable).catch(() => []),
  ]);

  const socialLinksByKolId = new Map<string, NonNullable<Kol["socialLinks"]>>();
  for (const row of socialAccountRows) {
    const platformKey = row.platform.toLowerCase() as keyof NonNullable<Kol["socialLinks"]>;
    if (!["instagram", "youtube", "tiktok", "facebook"].includes(platformKey)) continue;
    const current = socialLinksByKolId.get(row.kolId) ?? {};
    if (row.profileUrl) current[platformKey] = row.profileUrl;
    socialLinksByKolId.set(row.kolId, current);
  }

  // Count distinct insertion orders each KOL appears in (single source of truth
  // for "合作次數"). One order containing the same KOL multiple times still
  // counts once.
  const collabCountByKolId = new Map<string, number>();
  for (const row of ioRows) {
    const collabs = (row.collaborations as OrderKolCollaboration[] | null) ?? [];
    const kolIdsInOrder = new Set<string>();
    for (const c of collabs) {
      const kid = c.kolId ?? c.id;
      if (kid) kolIdsInOrder.add(kid);
    }
    for (const kid of kolIdsInOrder) {
      collabCountByKolId.set(kid, (collabCountByKolId.get(kid) ?? 0) + 1);
    }
  }

  return kols.map((kol) => {
    const linkedFolders = folderNamesByKolId.get(kol.id) ?? [];
    const accountSocialLinks = socialLinksByKolId.get(kol.id) ?? {};
    const mergedFolders = Array.from(
      new Set([
        ...linkedFolders,
        ...(kol.favoriteFolder ? [kol.favoriteFolder] : []),
        ...(kol.favoriteFolders ?? []),
      ]),
    );

    return {
      ...kol,
      collaborations: collabCountByKolId.get(kol.id) ?? 0,
      isFavorite: Boolean(kol.isFavorite || mergedFolders.length > 0),
      favoriteFolders: mergedFolders,
      favoriteFolder: mergedFolders[0] ?? kol.favoriteFolder,
      socialLinks: {
        ...accountSocialLinks,
        ...(kol.socialLinks ?? {}),
      },
    };
  });
}

async function getOrCreateFavoriteFolderRow(name: string, ownerMemberId?: string | null) {
  const normalized = name.trim();
  if (!normalized) return null;

  const existing = await db
    .select()
    .from(kolFavoriteFoldersTable)
    .where(eq(kolFavoriteFoldersTable.name, normalized))
    .limit(1)
    .catch(() => []);
  if (existing.length > 0) {
    // Backfill ownership for legacy folders if a member is provided.
    const row = existing[0];
    if (!row.ownerMemberId && ownerMemberId) {
      const updated = await db
        .update(kolFavoriteFoldersTable)
        .set({ ownerMemberId, updatedAt: new Date() })
        .where(eq(kolFavoriteFoldersTable.id, row.id))
        .returning()
        .catch(() => []);
      return updated[0] ?? row;
    }
    return row;
  }

  const created = await db
    .insert(kolFavoriteFoldersTable)
    .values({
      id: crypto.randomUUID(),
      name: normalized,
      ownerId: "user_001",
      ownerMemberId: ownerMemberId ?? null,
      description: null,
    })
    .returning()
    .catch(() => []);

  return created[0];
}

/**
 * Resolve a member's access level to a folder. Used by route actions to gate
 * mutations. Folders without an `ownerMemberId` are treated as legacy public
 * (full edit by anyone) so existing data continues to work.
 */
export async function getFolderAccessForMember(
  folderName: string,
  memberId: string | null | undefined,
): Promise<{ folder: typeof kolFavoriteFoldersTable.$inferSelect | null; access: FolderAccess | "none" }> {
  const normalized = folderName.trim();
  if (!normalized) return { folder: null, access: "none" };

  const rows = await db
    .select()
    .from(kolFavoriteFoldersTable)
    .where(eq(kolFavoriteFoldersTable.name, normalized))
    .limit(1)
    .catch(() => []);
  const folder = rows[0] ?? null;
  if (!folder) return { folder: null, access: "public" };
  if (!folder.ownerMemberId) return { folder, access: "public" };
  if (memberId && folder.ownerMemberId === memberId) return { folder, access: "owner" };

  if (memberId) {
    const shares = await db
      .select()
      .from(kolFavoriteFolderMemberSharesTable)
      .where(eq(kolFavoriteFolderMemberSharesTable.folderId, folder.id))
      .catch(() => []);
    if (shares.some((s) => s.memberId === memberId)) {
      return { folder, access: "shared" };
    }
  }
  return { folder, access: "none" };
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

function seededRandom(seed: string, min: number, max: number, decimals = 1): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  const t = Math.abs(h) / 2147483647;
  return parseFloat((min + t * (max - min)).toFixed(decimals));
}

function rowToProposalKol(row: typeof proposalKolsTable.$inferSelect): ProposalKol {
  const price = row.proposedFee != null ? Number(row.proposedFee) : 0;
  const seed = row.id;
  const rfr  = row.realFollowerRatio  != null ? Number(row.realFollowerRatio)  : seededRandom(seed + "rfr",  60, 98);
  const rep  = row.reputationScore    != null ? Number(row.reputationScore)    : seededRandom(seed + "rep",  5,  9.5);
  const aer  = row.avgEngagementRate  != null ? Number(row.avgEngagementRate)  : seededRandom(seed + "aer",  1.5, 8);
  const ei   = row.engagementIndex    != null ? Number(row.engagementIndex)    : seededRandom(seed + "ei",   0.8, 2.5, 2);
  const es   = row.engagementScore    != null ? Number(row.engagementScore)    : seededRandom(seed + "es",   5,   9.5);
  const bfs  = row.brandFitScore      != null ? Number(row.brandFitScore)      : seededRandom(seed + "bfs",  5,   9.5);
  const qs   = row.qualityScore       != null ? Number(row.qualityScore)       : seededRandom(seed + "qs",   60,  95);
  const cpfrVal = row.cpfr            != null ? Number(row.cpfr)               : (price > 0 ? parseFloat((price / Math.max(seededRandom(seed + "fol", 10000, 500000, 0), 1)).toFixed(4)) : undefined);
  const rec  = row.recommendation     ?? ["建議合作，整體數據優秀", "互動率高，品牌契合度佳", "粉絲黏著度強，適合長期合作", "性價比高，建議優先考量"][Math.abs(seed.charCodeAt(0)) % 4];

  return {
    id: row.id,
    proposalId: row.proposalId,
    kolId: row.kolId ?? "",
    kolName: row.kolName ?? "",
    kolAvatarUrl: row.kolAvatarUrl ?? undefined,
    price,
    role: row.role ?? "",
    reason: row.reason ?? "",
    status: row.status,
    feedbackText: row.feedbackText ?? "",
    actualPrice: row.actualFee != null ? Number(row.actualFee) : undefined,
    realFollowerRatio: rfr,
    reputationScore: rep,
    avgEngagementRate: aer,
    engagementIndex: ei,
    engagementScore: es,
    brandFitScore: bfs,
    qualityScore: qs,
    cpfr: cpfrVal,
    recommendation: rec,
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
  return enrichKols(rows.map(rowToKol));
}

export async function getKol(id: string): Promise<Kol | null> {
  const rows = await db.select().from(kolsTable).where(eq(kolsTable.id, id)).limit(1);
  if (rows.length === 0) return null;
  const [kol] = await enrichKols([rowToKol(rows[0])]);
  return kol ?? null;
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
  if (data.favoriteFolder !== undefined) update.favoriteFolder = data.favoriteFolder ?? null;
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
  if (data.gender !== undefined) update.gender = data.gender ?? null;
  if (data.age !== undefined) update.age = data.age ?? null;
  if (data.platformMetrics !== undefined) update.platformMetrics = data.platformMetrics;
  if (data.socialLinks !== undefined) update.socialLinks = data.socialLinks;
  update.updatedAt = new Date();

  const rows = await db.update(kolsTable).set(update).where(eq(kolsTable.id, id)).returning();
  if (rows.length === 0) throw new Error("Update failed");
  const [kol] = await enrichKols([rowToKol(rows[0])]);
  return kol;
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
      gender: data.gender ?? null,
      age: data.age ?? null,
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
  const [kol] = await enrichKols([rowToKol(rows[0])]);
  return kol;
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
      actualFee: data.actualPrice != null ? String(data.actualPrice) : null,
      realFollowerRatio: data.realFollowerRatio != null ? String(data.realFollowerRatio) : null,
      reputationScore: data.reputationScore != null ? String(data.reputationScore) : null,
      avgEngagementRate: data.avgEngagementRate != null ? String(data.avgEngagementRate) : null,
      engagementIndex: data.engagementIndex != null ? String(data.engagementIndex) : null,
      engagementScore: data.engagementScore != null ? String(data.engagementScore) : null,
      brandFitScore: data.brandFitScore != null ? String(data.brandFitScore) : null,
      qualityScore: data.qualityScore != null ? String(data.qualityScore) : null,
      cpfr: data.cpfr != null ? String(data.cpfr) : null,
      recommendation: data.recommendation ?? null,
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

export async function updateProposalKolDetails(
  id: string,
  data: Partial<ProposalKol>,
): Promise<ProposalKol> {
  const update: Partial<typeof proposalKolsTable.$inferInsert> = {};
  if (data.role !== undefined) update.role = data.role;
  if (data.price !== undefined) update.proposedFee = String(data.price);
  if (data.actualPrice !== undefined) update.actualFee = data.actualPrice != null ? String(data.actualPrice) : null;
  if (data.realFollowerRatio !== undefined) update.realFollowerRatio = data.realFollowerRatio != null ? String(data.realFollowerRatio) : null;
  if (data.reputationScore !== undefined) update.reputationScore = data.reputationScore != null ? String(data.reputationScore) : null;
  if (data.avgEngagementRate !== undefined) update.avgEngagementRate = data.avgEngagementRate != null ? String(data.avgEngagementRate) : null;
  if (data.engagementIndex !== undefined) update.engagementIndex = data.engagementIndex != null ? String(data.engagementIndex) : null;
  if (data.engagementScore !== undefined) update.engagementScore = data.engagementScore != null ? String(data.engagementScore) : null;
  if (data.brandFitScore !== undefined) update.brandFitScore = data.brandFitScore != null ? String(data.brandFitScore) : null;
  if (data.qualityScore !== undefined) update.qualityScore = data.qualityScore != null ? String(data.qualityScore) : null;
  if (data.cpfr !== undefined) update.cpfr = data.cpfr != null ? String(data.cpfr) : null;
  if (data.recommendation !== undefined) update.recommendation = data.recommendation ?? null;
  if (data.feedbackText !== undefined) update.feedbackText = data.feedbackText ?? null;

  const rows = await db
    .update(proposalKolsTable)
    .set(update)
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
    .limit(1)
    .catch(() => []);

  if (rows.length === 0) {
    // Don't INSERT here — avoids row-level lock contention with concurrent requests.
    // The seed/migration creates the default row; if it's missing just return defaults.
    return { currency: "TWD", defaultTaxRate: 5, defaultReportLang: "zh-TW", notifyEmail: "", aiSuggestions: true, favoriteFolders: [] };
  }

  const r = rows[0];
  return {
    currency: r.currency,
    defaultTaxRate: Number(r.defaultTaxRate),
    defaultReportLang: r.defaultReportLang,
    notifyEmail: r.notifyEmail,
    aiSuggestions: r.aiSuggestions,
    favoriteFolders: r.favoriteFolders ?? [],
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
  if (data.favoriteFolders !== undefined) update.favoriteFolders = data.favoriteFolders;
  update.updatedAt = new Date();

  await db
    .insert(systemPreferencesTable)
    .values({ id: "default", ...update })
    .onConflictDoUpdate({ target: systemPreferencesTable.id, set: update })
    .catch(() => null);

  return getSystemPreferences();
}

/**
 * List folder names. When `memberId` is provided, results are filtered to
 * folders the member can write to (owned + legacy public folders without an
 * owner). Without a memberId, returns every folder name globally (used by
 * back-office / admin code paths).
 */
export async function listFavoriteFolders(memberId?: string): Promise<string[]> {
  const state = await getFavoriteFolderState();
  const kols = await db.select({ favoriteFolder: kolsTable.favoriteFolder }).from(kolsTable).catch(() => []);
  for (const row of kols) {
    if (row.favoriteFolder) state.folderNames.push(row.favoriteFolder);
  }

  if (!memberId) {
    return Array.from(new Set(state.folderNames)).sort((a, b) => a.localeCompare(b, "zh-TW"));
  }

  const writable = new Set<string>();
  for (const name of state.folderNames) {
    // Names from system preferences without a folder row are legacy public.
    const row = state.folderRows.find((r) => r.name === name);
    if (!row || !row.ownerMemberId || row.ownerMemberId === memberId) {
      writable.add(name);
    }
  }
  return Array.from(writable).sort((a, b) => a.localeCompare(b, "zh-TW"));
}

export async function createFavoriteFolder(name: string, ownerMemberId?: string | null): Promise<string[]> {
  const normalized = name.trim();
  if (!normalized) return listFavoriteFolders();
  const prefs = await getSystemPreferences();
  if (!prefs.favoriteFolders.includes(normalized)) {
    await updateSystemPreferences({ favoriteFolders: [...prefs.favoriteFolders, normalized] });
  }
  await getOrCreateFavoriteFolderRow(normalized, ownerMemberId);
  return listFavoriteFolders();
}

/**
 * Detailed folder list. When `memberId` is provided:
 *  - results are filtered to folders the member owns OR has been shared with
 *    OR legacy folders without an owner (public)
 *  - each folder is annotated with `access` ("owner" | "shared" | "public")
 *    and (for owners) the list of `sharedWithMemberIds`.
 *
 * Without `memberId`, returns every folder ungated (admin / migration use).
 */
export async function listFavoriteFolderDetails(memberId?: string): Promise<FavoriteFolder[]> {
  const { folderRows, itemRows, memberIdsByFolderId } = await getFavoriteFolderState();
  const counts = itemRows.reduce<Record<string, number>>((acc, item) => {
    acc[item.folderId] = (acc[item.folderId] ?? 0) + 1;
    return acc;
  }, {});

  // Always pull the unfiltered name list — we filter ourselves below by access.
  const savedNames = await listFavoriteFolders();

  // Lookup helper for owner's display name.
  const memberLookup = await listTeamMembers().catch(() => [] as TeamMember[]);
  const memberById = new Map(memberLookup.map((m) => [m.id, m]));

  // We track an internal "no access" state so we can correctly drop folders
  // owned by someone else and not shared with the current member. The public
  // FolderAccess type only covers visible levels.
  type InternalAccess = FolderAccess | "none";
  const detailsFromRows = folderRows.map((row) => {
    const sharedWith = memberIdsByFolderId.get(row.id) ?? [];
    let internalAccess: InternalAccess;
    if (!row.ownerMemberId) internalAccess = "public";
    else if (memberId && row.ownerMemberId === memberId) internalAccess = "owner";
    else if (memberId && sharedWith.includes(memberId)) internalAccess = "shared";
    else if (!memberId) internalAccess = "public"; // admin / no-member context: see all
    else internalAccess = "none";
    return {
      id: row.id,
      name: row.name,
      description: row.description ?? undefined,
      kolCount: counts[row.id] ?? 0,
      ownerMemberId: row.ownerMemberId ?? null,
      ownerName: row.ownerMemberId ? memberById.get(row.ownerMemberId)?.name ?? null : null,
      access: internalAccess,
      sharedWithMemberIds: sharedWith,
    };
  });

  const existingNames = new Set(detailsFromRows.map((folder) => folder.name));
  const virtualFolders: FavoriteFolder[] = savedNames
    .filter((name) => !existingNames.has(name))
    .map((name) => ({
      id: `virtual_${name}`,
      name,
      kolCount: 0,
      ownerMemberId: null,
      ownerName: null,
      access: "public" as FolderAccess,
      sharedWithMemberIds: [],
    }));

  // Drop "none" before publishing the list, then narrow the type back to
  // the public FolderAccess union (owner | shared | public).
  const visible: FavoriteFolder[] = [...detailsFromRows, ...virtualFolders]
    .filter((folder) => folder.access !== "none")
    .map((folder) => ({ ...folder, access: folder.access as FolderAccess }));

  return visible.sort((a, b) => a.name.localeCompare(b.name, "zh-TW"));
}

/**
 * Rename. If `memberId` is provided, only the owner (or anyone for legacy
 * unowned folders) can rename — otherwise throws.
 */
export async function renameFavoriteFolder(
  oldName: string,
  newName: string,
  memberId?: string | null,
): Promise<string[]> {
  const from = oldName.trim();
  const to = newName.trim();
  if (!from || !to || from === to) return listFavoriteFolders();

  if (memberId !== undefined) {
    const access = await getFolderAccessForMember(from, memberId);
    if (access.access !== "owner" && access.access !== "public") {
      throw new Error("只有資料夾擁有者可以變更名稱");
    }
  }

  const prefs = await getSystemPreferences();
  const updatedNames = prefs.favoriteFolders.map((name) => (name === from ? to : name));
  if (!updatedNames.includes(to)) updatedNames.push(to);
  await updateSystemPreferences({ favoriteFolders: Array.from(new Set(updatedNames)).filter((name) => name !== from || to === from) });

  const folderRows = await db.select().from(kolFavoriteFoldersTable).where(eq(kolFavoriteFoldersTable.name, from)).limit(1);
  if (folderRows.length > 0) {
    await db.update(kolFavoriteFoldersTable).set({ name: to, updatedAt: new Date() }).where(eq(kolFavoriteFoldersTable.id, folderRows[0].id));
  }

  const kols = await db.select().from(kolsTable).where(eq(kolsTable.favoriteFolder, from));
  await Promise.all(kols.map((kol) => updateKol(kol.id, { favoriteFolder: to })));

  return listFavoriteFolders();
}

export async function deleteFavoriteFolder(name: string, memberId?: string | null): Promise<string[]> {
  const normalized = name.trim();
  if (!normalized) return listFavoriteFolders();

  if (memberId !== undefined) {
    const access = await getFolderAccessForMember(normalized, memberId);
    if (access.access !== "owner" && access.access !== "public") {
      throw new Error("只有資料夾擁有者可以刪除");
    }
  }

  const prefs = await getSystemPreferences();
  await updateSystemPreferences({ favoriteFolders: prefs.favoriteFolders.filter((folder) => folder !== normalized) });

  const folderRows = await db.select().from(kolFavoriteFoldersTable).where(eq(kolFavoriteFoldersTable.name, normalized)).limit(1).catch(() => []);
  if (folderRows.length > 0) {
    await db.delete(kolFavoriteFoldersTable).where(eq(kolFavoriteFoldersTable.id, folderRows[0].id)).catch(() => null);
  }

  const legacyKols = await db.select().from(kolsTable).where(eq(kolsTable.favoriteFolder, normalized)).catch(() => []);
  await Promise.all(legacyKols.map((kol) => updateKol(kol.id, { favoriteFolder: null, isFavorite: kol.isFavorite })));

  return listFavoriteFolders();
}

/**
 * Replace the set of members a folder is shared with. Only the owner may share.
 */
export async function setFavoriteFolderShares(
  folderName: string,
  sharedWithMemberIds: string[],
  ownerMemberId: string,
): Promise<void> {
  const normalized = folderName.trim();
  if (!normalized) return;

  const access = await getFolderAccessForMember(normalized, ownerMemberId);
  if (access.access !== "owner" && access.access !== "public") {
    throw new Error("只有資料夾擁有者可以共享");
  }

  // Lazily upgrade legacy public folders to be owned by the current member
  // when they first share — otherwise the share has no recognised owner.
  const folder = await getOrCreateFavoriteFolderRow(normalized, ownerMemberId);
  if (!folder) return;

  const desired = Array.from(new Set(sharedWithMemberIds.map((id) => id.trim()).filter(Boolean)))
    .filter((id) => id !== ownerMemberId);

  const existing = await db
    .select()
    .from(kolFavoriteFolderMemberSharesTable)
    .where(eq(kolFavoriteFolderMemberSharesTable.folderId, folder.id))
    .catch(() => []);

  const existingIds = new Set(existing.map((r) => r.memberId));
  const desiredSet = new Set(desired);

  // Remove shares that are no longer desired.
  await Promise.all(
    existing
      .filter((r) => !desiredSet.has(r.memberId))
      .map((r) =>
        db.delete(kolFavoriteFolderMemberSharesTable)
          .where(eq(kolFavoriteFolderMemberSharesTable.id, r.id))
          .catch(() => null),
      ),
  );

  // Insert new shares.
  await Promise.all(
    desired
      .filter((id) => !existingIds.has(id))
      .map((id) =>
        db.insert(kolFavoriteFolderMemberSharesTable).values({
          id: crypto.randomUUID(),
          folderId: folder.id,
          memberId: id,
        }).catch(() => null),
      ),
  );
}

export async function addKolToFavoriteFolder(
  kolId: string,
  folderName: string,
  memberId?: string | null,
): Promise<Kol> {
  const normalized = folderName.trim();
  if (!normalized) {
    return updateKol(kolId, { isFavorite: true });
  }

  if (memberId !== undefined) {
    const access = await getFolderAccessForMember(normalized, memberId);
    // "shared" is read-only for the recipient.
    if (access.folder && access.access === "shared") {
      throw new Error("此資料夾是別人共享給你的，無法新增 KOL");
    }
    if (access.folder && access.access === "none") {
      throw new Error("沒有權限存取此資料夾");
    }
  }

  await createFavoriteFolder(normalized, memberId ?? undefined);
  const folder = await getOrCreateFavoriteFolderRow(normalized, memberId ?? undefined);
  if (folder) {
    const existing = await db
      .select()
      .from(kolFavoriteFolderItemsTable)
      .where(eq(kolFavoriteFolderItemsTable.folderId, folder.id))
      .catch(() => []);
    if (!existing.some((item) => item.kolId === kolId)) {
      await db.insert(kolFavoriteFolderItemsTable).values({
        id: crypto.randomUUID(),
        folderId: folder.id,
        kolId,
        note: null,
        addedBy: "user_001",
      }).catch(() => null);
    }
  }

  return updateKol(kolId, { isFavorite: true, favoriteFolder: normalized });
}

export async function removeKolFromFavoriteFolder(
  kolId: string,
  folderName: string,
  memberId?: string | null,
): Promise<Kol> {
  const normalized = folderName.trim();
  if (!normalized) return getKol(kolId).then((kol) => {
    if (!kol) throw new Error("KOL not found");
    return kol;
  });

  if (memberId !== undefined) {
    const access = await getFolderAccessForMember(normalized, memberId);
    if (access.folder && access.access === "shared") {
      throw new Error("此資料夾是別人共享給你的，無法移除 KOL");
    }
    if (access.folder && access.access === "none") {
      throw new Error("沒有權限存取此資料夾");
    }
  }

  const folders = await db.select().from(kolFavoriteFoldersTable).where(eq(kolFavoriteFoldersTable.name, normalized)).limit(1).catch(() => []);
  if (folders.length > 0) {
    const items = await db.select().from(kolFavoriteFolderItemsTable).where(eq(kolFavoriteFolderItemsTable.folderId, folders[0].id)).catch(() => []);
    const target = items.find((item) => item.kolId === kolId);
    if (target) {
      await db.delete(kolFavoriteFolderItemsTable).where(eq(kolFavoriteFolderItemsTable.id, target.id)).catch(() => null);
    }
  }

  const current = await getKol(kolId);
  if (!current) throw new Error("KOL not found");
  const remainingFolders = (current.favoriteFolders ?? []).filter((name) => name !== normalized);

  return updateKol(kolId, {
    isFavorite: remainingFolders.length > 0 || Boolean(current.isFavorite && current.favoriteFolder !== normalized),
    favoriteFolder: remainingFolders[0] ?? null,
  });
}

export async function replaceKolFavoriteFolders(
  kolId: string,
  folderNames: string[],
  memberId?: string | null,
): Promise<Kol> {
  const normalizedFolders = Array.from(new Set(folderNames.map((name) => name.trim()).filter(Boolean)));
  const current = await getKol(kolId);
  if (!current) throw new Error("KOL not found");

  const currentFolders = current.favoriteFolders ?? [];

  // Diffing must respect: shared folders the user can't modify should be left
  // untouched (neither added nor removed). We only add folders the user can
  // write to, and only remove folders the user can write to.
  const toAddRaw = normalizedFolders.filter((name) => !currentFolders.includes(name));
  const toRemoveRaw = currentFolders.filter((name) => !normalizedFolders.includes(name));

  let toAdd = toAddRaw;
  let toRemove = toRemoveRaw;
  if (memberId !== undefined) {
    const accesses = await Promise.all(
      [...toAddRaw, ...toRemoveRaw].map(async (name) => [name, await getFolderAccessForMember(name, memberId)] as const),
    );
    const writable = new Set(
      accesses
        .filter(([, a]) => a.access === "owner" || a.access === "public")
        .map(([name]) => name),
    );
    toAdd = toAddRaw.filter((n) => writable.has(n));
    toRemove = toRemoveRaw.filter((n) => writable.has(n));
  }

  for (const folder of toAdd) {
    await addKolToFavoriteFolder(kolId, folder, memberId);
  }
  for (const folder of toRemove) {
    await removeKolFromFavoriteFolder(kolId, folder, memberId);
  }

  // Final favorites list reflects added + retained shared folders.
  const finalFolders = Array.from(new Set([
    ...currentFolders.filter((n) => !toRemove.includes(n)),
    ...toAdd,
  ]));

  return updateKol(kolId, {
    isFavorite: finalFolders.length > 0 || current.isFavorite,
    favoriteFolder: finalFolders[0] ?? null,
  });
}

export async function clearKolFavorites(kolId: string): Promise<Kol> {
  const current = await getKol(kolId);
  if (!current) throw new Error("KOL not found");
  for (const folder of current.favoriteFolders ?? []) {
    await removeKolFromFavoriteFolder(kolId, folder);
  }
  return updateKol(kolId, { isFavorite: false, favoriteFolder: null });
}
