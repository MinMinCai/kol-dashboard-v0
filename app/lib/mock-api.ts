const MOCK_API_BASE = process.env.MOCK_API_BASE_URL ?? "http://127.0.0.1:4000";

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
};

export type Proposal = {
  id: string;
  title: string;
  clientName: string;
  stage: string;
  budget: number;
  dueDate: string;
};

export type ProposalKol = {
  id: string;
  proposalId: string;
  kolId: string;
  kolName: string;
  kolAvatarUrl?: string;
  price: number;
  role: string;
  reason: string;
  status: string; // 'pending' | 'accepted' | 'rejected'
  feedbackText: string;
};

export type TagCatalogItem = {
  id: string | number;
  name: string;
};

export type BrandCatalogItem = {
  id: string | number;
  name: string;
};

export type IndustryCatalogItem = {
  id: string | number;
  name: string;
};

export type PlatformCatalogItem = {
  id: string | number;
  name: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  group: "AE" | "KOL" | "Tech" | "Media" | "其他";
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
};

export async function listKols(): Promise<Kol[]> {
  const res = await fetch(`${MOCK_API_BASE}/kols`);
  return res.json();
}

export async function getKol(id: string): Promise<Kol | null> {
  const res = await fetch(`${MOCK_API_BASE}/kols/${id}`);
  if (res.status === 404) return null;
  return res.json();
}

export async function listProposals(): Promise<Proposal[]> {
  const res = await fetch(`${MOCK_API_BASE}/proposals`);
  return res.json();
}

export async function updateProposal(id: string, data: Partial<Proposal>): Promise<Proposal> {
  const res = await fetch(`${MOCK_API_BASE}/proposals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProposal(id: string): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/proposals/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function getProposal(id: string): Promise<Proposal | null> {
  const res = await fetch(`${MOCK_API_BASE}/proposals/${id}`);
  if (res.status === 404) return null;
  return res.json();
}

export async function listProposalKols(proposalId: string): Promise<ProposalKol[]> {
  const res = await fetch(`${MOCK_API_BASE}/proposalKols?proposalId=${proposalId}`);
  return res.json();
}

export async function addProposalKol(data: Omit<ProposalKol, "id" | "status" | "feedbackText">): Promise<ProposalKol> {
  const payload = { ...data, status: "pending", feedbackText: "" };
  const res = await fetch(`${MOCK_API_BASE}/proposalKols`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateProposalKolStatus(id: string, status: string, feedbackText: string): Promise<ProposalKol> {
  const res = await fetch(`${MOCK_API_BASE}/proposalKols/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, feedbackText }),
  });
  return res.json();
}

export async function deleteProposalKol(id: string): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/proposalKols/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function listInsertionOrders(): Promise<InsertionOrder[]> {
  const res = await fetch(`${MOCK_API_BASE}/insertionOrders`);
  return res.json();
}

export async function listTagCatalog(): Promise<TagCatalogItem[]> {
  try {
    const res = await fetch(`${MOCK_API_BASE}/tagCatalog`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function addTagCatalog(data: Omit<TagCatalogItem, "id">): Promise<TagCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/tagCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTagCatalog(id: string | number, data: Partial<TagCatalogItem>): Promise<TagCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/tagCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTagCatalog(id: string | number): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/tagCatalog/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function listBrandCatalog(): Promise<BrandCatalogItem[]> {
  try {
    const res = await fetch(`${MOCK_API_BASE}/brandCatalog`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function addBrandCatalog(data: Omit<BrandCatalogItem, "id">): Promise<BrandCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/brandCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBrandCatalog(id: string | number, data: Partial<BrandCatalogItem>): Promise<BrandCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/brandCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBrandCatalog(id: string | number): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/brandCatalog/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function listIndustryCatalog(): Promise<IndustryCatalogItem[]> {
  try {
    const res = await fetch(`${MOCK_API_BASE}/industryCatalog`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function addIndustryCatalog(
  data: Omit<IndustryCatalogItem, "id">,
): Promise<IndustryCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/industryCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateIndustryCatalog(
  id: string | number,
  data: Partial<IndustryCatalogItem>,
): Promise<IndustryCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/industryCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteIndustryCatalog(id: string | number): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/industryCatalog/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function listPlatformCatalog(): Promise<PlatformCatalogItem[]> {
  try {
    const res = await fetch(`${MOCK_API_BASE}/platformCatalog`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function addPlatformCatalog(
  data: Omit<PlatformCatalogItem, "id">,
): Promise<PlatformCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/platformCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePlatformCatalog(
  id: string | number,
  data: Partial<PlatformCatalogItem>,
): Promise<PlatformCatalogItem> {
  const res = await fetch(`${MOCK_API_BASE}/platformCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePlatformCatalog(id: string | number): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/platformCatalog/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function listTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers`);
  return res.json();
}

export async function getSystemPreferences(): Promise<SystemPreferences> {
  const res = await fetch(`${MOCK_API_BASE}/systemPreferences`);
  return res.json();
}

export async function updateSystemPreferences(
  data: Partial<SystemPreferences>,
): Promise<SystemPreferences> {
  const res = await fetch(`${MOCK_API_BASE}/systemPreferences`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function addTeamMember(data: Omit<TeamMember, "id">): Promise<TeamMember> {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function getInsertionOrder(id: string): Promise<InsertionOrder | null> {
  const res = await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`);
  if (res.status === 404) return null;
  return res.json();
}

export async function deleteKol(id: string): Promise<boolean> {
  const res = await fetch(`${MOCK_API_BASE}/kols/${id}`, { method: "DELETE" });
  return res.ok;
}
export async function updateKol(id: string, data: Partial<Kol>): Promise<Kol> {
  const res = await fetch(`${MOCK_API_BASE}/kols/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function updateInsertionOrder(id: string, data: Partial<InsertionOrder>): Promise<InsertionOrder> {
  const res = await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function addIOReview(
  orderId: string,
  kolId: string,
  review: Omit<OrderReview, "id" | "date">
): Promise<InsertionOrder> {
  const io = await getInsertionOrder(orderId);
  if (!io) throw new Error("Order not found");

  const collabs = io.collaborations ?? [];
  const collabIndex = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (collabIndex === -1) throw new Error("Collaboration not found");

  const newReview: OrderReview = {
    ...review,
    id: `rv_${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
  };

  const updatedCollabs = [...collabs];
  updatedCollabs[collabIndex] = {
    ...updatedCollabs[collabIndex],
    reviews: [...(updatedCollabs[collabIndex].reviews ?? []), newReview],
  };

  return updateInsertionOrder(orderId, { collaborations: updatedCollabs });
}

export async function updateIOPerformance(
  orderId: string,
  kolId: string,
  performance: Omit<OrderPerformanceItem, "id">
): Promise<InsertionOrder> {
  const io = await getInsertionOrder(orderId);
  if (!io) throw new Error("Order not found");

  const collabs = io.collaborations ?? [];
  const collabIndex = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (collabIndex === -1) throw new Error("Collaboration not found");

  const newItem: OrderPerformanceItem = {
    ...performance,
    id: `perf_${Date.now()}`,
  };

  const updatedCollabs = [...collabs];
  updatedCollabs[collabIndex] = {
    ...updatedCollabs[collabIndex],
    performanceItems: [...(updatedCollabs[collabIndex].performanceItems ?? []), newItem],
  };

  return updateInsertionOrder(orderId, { collaborations: updatedCollabs });
}

export { MOCK_API_BASE };





