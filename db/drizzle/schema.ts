import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const now = timestamp("created_at", { withTimezone: true }).defaultNow().notNull();

// ─── KOLs ────────────────────────────────────────────────────────────────────

export const kols = pgTable(
  "kols",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    displayName: varchar("display_name", { length: 150 }).notNull(),
    legalName: varchar("legal_name", { length: 150 }),
    country: varchar("country", { length: 80 }),
    city: varchar("city", { length: 80 }),
    primaryLanguage: varchar("primary_language", { length: 40 }),
    categories: text("categories").array().default([]).notNull(),
    contactEmail: varchar("contact_email", { length: 200 }),
    contactPhone: varchar("contact_phone", { length: 50 }),
    basePriceMin: numeric("base_price_min", { precision: 12, scale: 2 }),
    basePriceMax: numeric("base_price_max", { precision: 12, scale: 2 }),
    status: varchar("status", { length: 20 }).default("active").notNull(),
    notes: text("notes"),
    // Extended fields
    industry: varchar("industry", { length: 100 }),
    tags: text("tags").array().default([]).notNull(),
    rating: numeric("rating", { precision: 4, scale: 2 }),
    collaborationCount: integer("collaboration_count").default(0),
    averagePrice: numeric("average_price", { precision: 12, scale: 2 }),
    industryDistribution: text("industry_distribution").array().default([]).notNull(),
    isFavorite: boolean("is_favorite").default(false).notNull(),
    favoriteFolder: varchar("favorite_folder", { length: 100 }),
    avatarUrl: text("avatar_url"),
    platform: varchar("platform", { length: 30 }),
    followers: integer("followers").default(0),
    engagementRate: numeric("engagement_rate", { precision: 5, scale: 2 }),
    exposureRate: numeric("exposure_rate", { precision: 5, scale: 2 }),
    audienceGender: jsonb("audience_gender").$type<{ male: number; female: number }>(),
    audienceAge: varchar("audience_age", { length: 50 }),
    introduction: text("introduction"),
    paymentMethod: varchar("payment_method", { length: 10 }),
    social: jsonb("social").$type<{ instagram?: number; youtube?: number; tiktok?: number; facebook?: number }>().default({}),
    contact: jsonb("contact").$type<{ phone?: string; email?: string; manager?: string }>().default({}),
    collaborationHistory: jsonb("collaboration_history").$type<any[]>().default([]),
    priceTrend: jsonb("price_trend").$type<any[]>().default([]),
    performanceStats: jsonb("performance_stats").$type<any>(),
    createdAt: now,
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    nameIdx: index("idx_kols_name").on(table.displayName),
    categoryIdx: index("idx_kols_categories").on(table.categories),
  }),
);

export const kolSocialAccounts = pgTable(
  "kol_social_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    kolId: uuid("kol_id").references(() => kols.id, { onDelete: "cascade" }).notNull(),
    platform: varchar("platform", { length: 30 }).notNull(),
    handle: varchar("handle", { length: 120 }).notNull(),
    profileUrl: text("profile_url"),
    followers: integer("followers").default(0).notNull(),
    avgViews: integer("avg_views"),
    engagementRate: numeric("engagement_rate", { precision: 5, scale: 2 }),
    audienceProfile: jsonb("audience_profile").$type<Record<string, unknown>>().default({}),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }),
    createdAt: now,
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    platformIdx: index("idx_social_platform").on(table.platform),
    platformHandleUq: uniqueIndex("uq_social_platform_handle").on(table.platform, table.handle),
  }),
);

// ─── Clients ─────────────────────────────────────────────────────────────────

export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  industry: varchar("industry", { length: 100 }),
  preferences: jsonb("preferences").$type<Record<string, unknown>>().default({}),
  createdAt: now,
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Proposals ───────────────────────────────────────────────────────────────

export const proposals = pgTable(
  "proposals",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id").references(() => clients.id),
    clientName: varchar("client_name", { length: 200 }),
    title: varchar("title", { length: 255 }).notNull(),
    objective: text("objective"),
    budget: numeric("budget", { precision: 12, scale: 2 }),
    stage: varchar("stage", { length: 30 }).default("draft").notNull(),
    owner: varchar("owner", { length: 100 }),
    dueDate: date("due_date"),
    createdAt: now,
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    stageIdx: index("idx_proposals_stage").on(table.stage),
  }),
);

export const proposalKols = pgTable(
  "proposal_kols",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    proposalId: uuid("proposal_id").references(() => proposals.id, { onDelete: "cascade" }).notNull(),
    kolId: uuid("kol_id").references(() => kols.id),
    kolName: varchar("kol_name", { length: 150 }),
    kolAvatarUrl: text("kol_avatar_url"),
    proposedFee: numeric("proposed_fee", { precision: 12, scale: 2 }),
    role: varchar("role", { length: 100 }),
    reason: text("reason"),
    status: varchar("status", { length: 20 }).default("pending").notNull(),
    feedbackText: text("feedback_text").default(""),
    createdAt: now,
  },
  (table) => ({
    proposalKolUq: uniqueIndex("uq_proposal_kol").on(table.proposalId, table.kolId),
  }),
);

export const proposalFeedback = pgTable("proposal_feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  proposalId: uuid("proposal_id").references(() => proposals.id, { onDelete: "cascade" }).notNull(),
  source: varchar("source", { length: 20 }).notNull(),
  feedbackText: text("feedback_text").notNull(),
  decision: varchar("decision", { length: 20 }),
  createdBy: varchar("created_by", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Insertion Orders ─────────────────────────────────────────────────────────

export const insertionOrders = pgTable(
  "insertion_orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNo: varchar("order_no", { length: 50 }).notNull(),
    proposalId: uuid("proposal_id").references(() => proposals.id),
    clientId: uuid("client_id").references(() => clients.id),
    status: varchar("status", { length: 30 }).default("created").notNull(),
    totalBudget: numeric("total_budget", { precision: 12, scale: 2 }),
    startDate: date("start_date"),
    endDate: date("end_date"),
    contractStatus: varchar("contract_status", { length: 30 }).default("pending").notNull(),
    invoiceStatus: varchar("invoice_status", { length: 30 }).default("pending").notNull(),
    // Extended fields
    title: varchar("title", { length: 255 }),
    clientName: varchar("client_name", { length: 200 }),
    projectName: varchar("project_name", { length: 255 }),
    brand: varchar("brand", { length: 100 }),
    mcnName: varchar("mcn_name", { length: 100 }),
    industry: varchar("industry", { length: 100 }),
    industryPath: varchar("industry_path", { length: 200 }),
    salesOwner: varchar("sales_owner", { length: 100 }),
    kolManager: varchar("kol_manager", { length: 100 }),
    kolCount: integer("kol_count").default(0),
    avgRating: numeric("avg_rating", { precision: 4, scale: 2 }),
    avgEngagementRate: numeric("avg_engagement_rate", { precision: 5, scale: 2 }),
    totalReach: integer("total_reach").default(0),
    totalEngagement: integer("total_engagement").default(0),
    documentUrl: text("document_url"),
    tax: numeric("tax", { precision: 12, scale: 2 }),
    totalWithTax: numeric("total_with_tax", { precision: 12, scale: 2 }),
    hasDraft: boolean("has_draft").default(false).notNull(),
    hasOfficial: boolean("has_official").default(false).notNull(),
    collaborations: jsonb("collaborations").$type<any[]>().default([]),
    reports: jsonb("reports").$type<any[]>().default([]),
    createdAt: now,
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    orderNoUq: uniqueIndex("uq_insertion_order_no").on(table.orderNo),
    statusIdx: index("idx_io_status").on(table.status),
  }),
);

export const ioTasks = pgTable("io_tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  insertionOrderId: uuid("insertion_order_id")
    .references(() => insertionOrders.id, { onDelete: "cascade" })
    .notNull(),
  kolId: uuid("kol_id").references(() => kols.id),
  taskType: varchar("task_type", { length: 40 }).notNull(),
  taskStatus: varchar("task_status", { length: 20 }).default("todo").notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  owner: varchar("owner", { length: 100 }),
  notes: text("notes"),
  createdAt: now,
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const campaignPerformance = pgTable(
  "campaign_performance",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    insertionOrderId: uuid("insertion_order_id")
      .references(() => insertionOrders.id, { onDelete: "cascade" })
      .notNull(),
    kolId: uuid("kol_id").references(() => kols.id),
    platform: varchar("platform", { length: 30 }).notNull(),
    waveNo: integer("wave_no").default(1).notNull(),
    contentUrl: text("content_url"),
    impressions: integer("impressions").default(0),
    reach: integer("reach").default(0),
    views: integer("views").default(0),
    likes: integer("likes").default(0),
    comments: integer("comments").default(0),
    shares: integer("shares").default(0),
    saves: integer("saves").default(0),
    clicks: integer("clicks").default(0),
    ctr: numeric("ctr", { precision: 6, scale: 3 }),
    leads: integer("leads").default(0),
    purchases: integer("purchases").default(0),
    revenue: numeric("revenue", { precision: 12, scale: 2 }),
    cost: numeric("cost", { precision: 12, scale: 2 }),
    roas: numeric("roas", { precision: 10, scale: 3 }),
    clientScore: numeric("client_score", { precision: 4, scale: 2 }),
    teamScore: numeric("team_score", { precision: 4, scale: 2 }),
    recordedAt: timestamp("recorded_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: now,
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    ioIdx: index("idx_perf_io").on(table.insertionOrderId),
    kolIdx: index("idx_perf_kol").on(table.kolId),
  }),
);

export const aiReports = pgTable("ai_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportType: varchar("report_type", { length: 30 }).notNull(),
  refTable: varchar("ref_table", { length: 50 }).notNull(),
  refId: uuid("ref_id").notNull(),
  promptVersion: varchar("prompt_version", { length: 50 }),
  contentMd: text("content_md").notNull(),
  createdBy: varchar("created_by", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Catalogs ─────────────────────────────────────────────────────────────────

export const tagCatalog = pgTable("tag_catalog", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: now,
});

export const brandCatalog = pgTable("brand_catalog", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull().unique(),
  createdAt: now,
});

export const industryCatalog = pgTable("industry_catalog", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: now,
});

export const platformCatalog = pgTable("platform_catalog", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: now,
});

// ─── Team Members ─────────────────────────────────────────────────────────────

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  role: varchar("role", { length: 20 }).default("member").notNull(),
  group: varchar("group", { length: 20 }).default("其他").notNull(),
  createdAt: now,
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── System Preferences ───────────────────────────────────────────────────────

export const systemPreferences = pgTable("system_preferences", {
  id: varchar("id", { length: 20 }).primaryKey().default("default"),
  currency: varchar("currency", { length: 10 }).default("TWD").notNull(),
  defaultTaxRate: numeric("default_tax_rate", { precision: 5, scale: 2 }).default("5").notNull(),
  defaultReportLang: varchar("default_report_lang", { length: 20 }).default("zh-TW").notNull(),
  notifyEmail: varchar("notify_email", { length: 200 }).default("").notNull(),
  aiSuggestions: boolean("ai_suggestions").default(true).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── BetterAuth Tables ────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  role: varchar("role", { length: 20 }).default("member").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
