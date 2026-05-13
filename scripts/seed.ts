/**
 * Seed script: imports mock/db.json into Supabase via Drizzle ORM
 * Usage: npx tsx scripts/seed.ts
 */
import { config as loadEnv } from "dotenv";
import { readFileSync } from "fs";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/drizzle/schema";
import { buildSupplementalProposalKols, buildSupplementalProposals, enrichKolSeedData } from "./sample-data-utils.mjs";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });
loadEnv({ path: resolve(process.cwd(), ".env"), override: false });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

const dbJson = JSON.parse(
  readFileSync(resolve(process.cwd(), "mock/db.json"), "utf-8"),
);
const socialAccountsByKolId = new Map<string, any[]>();
for (const account of dbJson.kolSocialAccounts ?? []) {
  const current = socialAccountsByKolId.get(account.kolId) ?? [];
  current.push(account);
  socialAccountsByKolId.set(account.kolId, current);
}
const enrichedKols = (dbJson.kols ?? []).map((kol: any) => enrichKolSeedData(kol, socialAccountsByKolId.get(kol.id) ?? []));
const supplementalProposals = buildSupplementalProposals(dbJson);
const supplementalProposalKols = buildSupplementalProposalKols(dbJson, enrichedKols);

async function seed() {
  console.log("🌱 Starting seed...");

  // ── Users ─────────────────────────────────────────────────────────────────
  // Seed dev/preview users (BetterAuth manages production users)
  if (dbJson.users?.length) {
    console.log(`  Seeding ${dbJson.users.length} users...`);
    for (const u of dbJson.users) {
      await db
        .insert(schema.users)
        .values({
          id: u.id,
          name: u.name,
          email: u.email,
          emailVerified: u.emailVerified ?? false,
          image: u.image ?? null,
          role: u.role ?? "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Users done");
  }

  // ── KOLs ──────────────────────────────────────────────────────────────────
  if (enrichedKols.length) {
    console.log(`  Seeding ${enrichedKols.length} KOLs...`);
    for (const kol of enrichedKols) {
      await db
        .insert(schema.kols)
        .values({
          id: kol.id,
          displayName: kol.displayName,
          city: kol.city ?? "",
          country: kol.country ?? null,
          categories: kol.categories ?? [],
          industry: kol.industry ?? null,
          tags: kol.tags ?? [],
          rating: kol.rating != null ? String(kol.rating) : null,
          collaborationCount: kol.collaborations ?? 0,
          averagePrice: kol.averagePrice != null ? String(kol.averagePrice) : null,
          industryDistribution: kol.industryDistribution ?? [],
          isFavorite: kol.isFavorite ?? false,
          favoriteFolder: kol.favoriteFolder ?? null,
          avatarUrl: kol.avatarUrl ?? null,
          platform: kol.platform ?? null,
          followers: kol.followers ?? 0,
          engagementRate: kol.engagementRate != null ? String(kol.engagementRate) : null,
          exposureRate: kol.exposureRate != null ? String(kol.exposureRate) : null,
          audienceGender: kol.audienceGender ?? null,
          audienceAge: kol.audienceAge ?? null,
          introduction: kol.introduction ?? null,
          instagramHandle: kol.instagramHandle ?? null,
          notes: kol.notes ?? null,
          paymentMethod: kol.paymentMethod ?? null,
          social: kol.social ?? {},
          contact: kol.contact ?? {},
          collaborationHistory: kol.collaborationHistory ?? [],
          priceTrend: kol.priceTrend ?? [],
          performanceStats: kol.performanceStats ?? null,
          platformMetrics: kol.platformMetrics ?? null,
          socialLinks: kol.socialLinks ?? null,
          contactEmail: kol.contact?.email ?? null,
          contactPhone: kol.contact?.phone ?? null,
          contactLineId: kol.contact?.lineId ?? null,
          status: "active",
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ KOLs done");
  }

  // ── Proposals ─────────────────────────────────────────────────────────────
  const allProposals = [...(dbJson.proposals ?? []), ...supplementalProposals];
  if (allProposals.length) {
    console.log(`  Seeding ${allProposals.length} proposals...`);
    for (const p of allProposals) {
      await db
        .insert(schema.proposals)
        .values({
          id: p.id,
          title: p.title,
          clientName: p.clientName ?? null,
          stage: p.stage ?? "draft",
          budget: p.budget != null ? String(p.budget) : null,
          launchMonth: p.launchMonth ?? null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Proposals done");
  }

  // ── ProposalKols ──────────────────────────────────────────────────────────
  const allProposalKols = [...(dbJson.proposalKols ?? []), ...supplementalProposalKols];
  if (allProposalKols.length) {
    console.log(`  Seeding ${allProposalKols.length} proposalKols...`);
    for (const pk of allProposalKols) {
      await db
        .insert(schema.proposalKols)
        .values({
          id: pk.id,
          proposalId: pk.proposalId,
          kolId: pk.kolId ?? null,
          kolName: pk.kolName ?? null,
          kolAvatarUrl: pk.kolAvatarUrl ?? null,
          proposedFee: pk.price != null ? String(pk.price) : null,
          role: pk.role ?? null,
          reason: pk.reason ?? null,
          status: pk.status ?? "pending",
          feedbackText: pk.feedbackText ?? "",
          actualFee: pk.actualPrice != null ? String(pk.actualPrice) : null,
          realFollowerRatio: pk.realFollowerRatio != null ? String(pk.realFollowerRatio) : null,
          reputationScore: pk.reputationScore != null ? String(pk.reputationScore) : null,
          avgEngagementRate: pk.avgEngagementRate != null ? String(pk.avgEngagementRate) : null,
          engagementIndex: pk.engagementIndex != null ? String(pk.engagementIndex) : null,
          engagementScore: pk.engagementScore != null ? String(pk.engagementScore) : null,
          brandFitScore: pk.brandFitScore != null ? String(pk.brandFitScore) : null,
          qualityScore: pk.qualityScore != null ? String(pk.qualityScore) : null,
          cpfr: pk.cpfr != null ? String(pk.cpfr) : null,
          recommendation: pk.recommendation ?? null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ ProposalKols done");
  }

  // ── Insertion Orders ──────────────────────────────────────────────────────
  if (dbJson.insertionOrders?.length) {
    console.log(`  Seeding ${dbJson.insertionOrders.length} insertion orders...`);
    for (const io of dbJson.insertionOrders) {
      await db
        .insert(schema.insertionOrders)
        .values({
          id: io.id,
          orderNo: io.orderNo,
          title: io.title ?? null,
          projectName: io.projectName ?? null,
          clientName: io.clientName ?? null,
          brand: io.brand ?? null,
          mcnName: io.mcnName ?? null,
          industry: io.industry ?? null,
          industryPath: io.industryPath ?? null,
          salesOwner: io.salesOwner ?? null,
          kolManager: io.kolManager ?? null,
          kolCount: io.kolCount ?? 0,
          status: io.status ?? "created",
          totalBudget: io.totalBudget != null ? String(io.totalBudget) : null,
          startDate: io.startDate ?? null,
          endDate: io.endDate ?? null,
          avgRating: io.avgRating != null ? String(io.avgRating) : null,
          avgEngagementRate: io.avgEngagementRate != null ? String(io.avgEngagementRate) : null,
          totalReach: io.totalReach ?? 0,
          totalEngagement: io.totalEngagement ?? 0,
          documentUrl: io.documentUrl ?? null,
          tax: io.tax != null ? String(io.tax) : null,
          totalWithTax: io.totalWithTax != null ? String(io.totalWithTax) : null,
          hasDraft: io.hasDraft ?? false,
          hasOfficial: io.hasOfficial ?? false,
          collaborations: io.collaborations ?? [],
          reports: io.reports ?? [],
          contractStatus: "pending",
          invoiceStatus: "pending",
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Insertion orders done");
  }

  // ── Clients ───────────────────────────────────────────────────────────────
  if (dbJson.clients?.length) {
    console.log(`  Seeding ${dbJson.clients.length} clients...`);
    for (const c of dbJson.clients) {
      await db
        .insert(schema.clients)
        .values({
          id: c.id,
          name: c.name,
          industry: c.industry ?? null,
          preferences: c.preferences ?? {},
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Clients done");
  }

  // ── KOL Social Accounts ───────────────────────────────────────────────────
  if (dbJson.kolSocialAccounts?.length) {
    console.log(`  Seeding ${dbJson.kolSocialAccounts.length} kolSocialAccounts...`);
    for (const a of dbJson.kolSocialAccounts) {
      await db
        .insert(schema.kolSocialAccounts)
        .values({
          id: a.id,
          kolId: a.kolId,
          platform: a.platform,
          handle: a.handle,
          profileUrl: a.profileUrl ?? null,
          followers: a.followers ?? 0,
          avgViews: a.avgViews ?? null,
          engagementRate: a.engagementRate != null ? String(a.engagementRate) : null,
          audienceProfile: a.audienceProfile ?? {},
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ KOL Social Accounts done");
  }

  // ── Proposal Feedback ─────────────────────────────────────────────────────
  if (dbJson.proposalFeedbacks?.length) {
    console.log(`  Seeding ${dbJson.proposalFeedbacks.length} proposalFeedbacks...`);
    for (const f of dbJson.proposalFeedbacks) {
      await db
        .insert(schema.proposalFeedback)
        .values({
          id: f.id,
          proposalId: f.proposalId,
          source: f.source,
          feedbackText: f.feedbackText,
          decision: f.decision ?? null,
          createdBy: f.createdBy ?? null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Proposal Feedback done");
  }

  // ── IO Tasks ──────────────────────────────────────────────────────────────
  if (dbJson.ioTasks?.length) {
    console.log(`  Seeding ${dbJson.ioTasks.length} ioTasks...`);
    for (const t of dbJson.ioTasks) {
      await db
        .insert(schema.ioTasks)
        .values({
          id: t.id,
          insertionOrderId: t.insertionOrderId,
          kolId: t.kolId ?? null,
          taskType: t.taskType,
          taskStatus: t.taskStatus ?? "todo",
          dueAt: t.dueAt ? new Date(t.dueAt) : null,
          completedAt: t.completedAt ? new Date(t.completedAt) : null,
          owner: t.owner ?? null,
          notes: t.notes ?? null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ IO Tasks done");
  }

  // ── Campaign Performance ──────────────────────────────────────────────────
  if (dbJson.campaignPerformance?.length) {
    console.log(`  Seeding ${dbJson.campaignPerformance.length} campaignPerformance...`);
    for (const cp of dbJson.campaignPerformance) {
      await db
        .insert(schema.campaignPerformance)
        .values({
          id: cp.id,
          insertionOrderId: cp.insertionOrderId,
          kolId: cp.kolId ?? null,
          platform: cp.platform,
          waveNo: cp.waveNo ?? 1,
          contentUrl: cp.contentUrl ?? null,
          impressions: cp.impressions ?? 0,
          reach: cp.reach ?? 0,
          views: cp.views ?? 0,
          likes: cp.likes ?? 0,
          comments: cp.comments ?? 0,
          shares: cp.shares ?? 0,
          saves: cp.saves ?? 0,
          clicks: cp.clicks ?? 0,
          ctr: cp.ctr != null ? String(cp.ctr) : null,
          leads: cp.leads ?? 0,
          purchases: cp.purchases ?? 0,
          revenue: cp.revenue != null ? String(cp.revenue) : null,
          cost: cp.cost != null ? String(cp.cost) : null,
          roas: cp.roas != null ? String(cp.roas) : null,
          clientScore: cp.clientScore != null ? String(cp.clientScore) : null,
          teamScore: cp.teamScore != null ? String(cp.teamScore) : null,
          recordedAt: cp.recordedAt ? new Date(cp.recordedAt) : undefined,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Campaign Performance done");
  }

  // ── AI Reports ────────────────────────────────────────────────────────────
  if (dbJson.aiReports?.length) {
    console.log(`  Seeding ${dbJson.aiReports.length} aiReports...`);
    for (const r of dbJson.aiReports) {
      await db
        .insert(schema.aiReports)
        .values({
          id: r.id,
          reportType: r.reportType,
          refTable: r.refTable,
          refId: r.refId,
          promptVersion: r.promptVersion ?? null,
          contentMd: r.contentMd,
          createdBy: r.createdBy ?? null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ AI Reports done");
  }

  // ── KOL Favorite Folders ─────────────────────────────────────────────────
  if (dbJson.kolFavoriteFolders?.length) {
    console.log(`  Seeding ${dbJson.kolFavoriteFolders.length} kolFavoriteFolders...`);
    for (const f of dbJson.kolFavoriteFolders) {
      await db
        .insert(schema.kolFavoriteFolders)
        .values({
          id: f.id,
          name: f.name,
          description: f.description ?? null,
          ownerId: f.ownerId,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ KOL Favorite Folders done");
  }

  // ── KOL Favorite Folder Items ─────────────────────────────────────────────
  if (dbJson.kolFavoriteFolderItems?.length) {
    console.log(`  Seeding ${dbJson.kolFavoriteFolderItems.length} kolFavoriteFolderItems...`);
    for (const item of dbJson.kolFavoriteFolderItems) {
      await db
        .insert(schema.kolFavoriteFolderItems)
        .values({
          id: item.id,
          folderId: item.folderId,
          kolId: item.kolId,
          note: item.note ?? null,
          addedBy: item.addedBy ?? null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ KOL Favorite Folder Items done");
  }

  // ── KOL Favorite Folder Shares ────────────────────────────────────────────
  if (dbJson.kolFavoriteFolderShares?.length) {
    console.log(`  Seeding ${dbJson.kolFavoriteFolderShares.length} kolFavoriteFolderShares...`);
    for (const s of dbJson.kolFavoriteFolderShares) {
      await db
        .insert(schema.kolFavoriteFolderShares)
        .values({
          id: s.id,
          folderId: s.folderId,
          shareType: s.shareType,
          targetUserId: s.targetUserId ?? null,
          targetGroup: s.targetGroup ?? null,
          permission: s.permission,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ KOL Favorite Folder Shares done");
  }

  // ── Proposal Watchers ─────────────────────────────────────────────────────
  if (dbJson.proposalWatchers?.length) {
    console.log(`  Seeding ${dbJson.proposalWatchers.length} proposalWatchers...`);
    for (const w of dbJson.proposalWatchers) {
      await db
        .insert(schema.proposalWatchers)
        .values({
          id: w.id,
          proposalId: w.proposalId,
          userId: w.userId,
          watchType: w.watchType,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Proposal Watchers done");
  }

  // ── Notifications ─────────────────────────────────────────────────────────
  if (dbJson.notifications?.length) {
    console.log(`  Seeding ${dbJson.notifications.length} notifications...`);
    for (const n of dbJson.notifications) {
      await db
        .insert(schema.notifications)
        .values({
          id: n.id,
          recipientId: n.recipientId,
          type: n.type,
          refTable: n.refTable,
          refId: n.refId,
          actorId: n.actorId ?? null,
          message: n.message,
          payload: n.payload ?? {},
          isRead: n.isRead ?? false,
          readAt: n.readAt ? new Date(n.readAt) : null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Notifications done");
  }

  // ── Tag Catalog ───────────────────────────────────────────────────────────
  if (dbJson.tagCatalog?.length) {
    console.log(`  Seeding ${dbJson.tagCatalog.length} tags...`);
    for (const t of dbJson.tagCatalog) {
      await db
        .insert(schema.tagCatalog)
        .values({ id: String(t.id), name: t.name })
        .onConflictDoNothing();
    }
    console.log("  ✓ Tags done");
  }

  // ── Brand Catalog ─────────────────────────────────────────────────────────
  if (dbJson.brandCatalog?.length) {
    console.log(`  Seeding ${dbJson.brandCatalog.length} brands...`);
    for (const b of dbJson.brandCatalog) {
      await db
        .insert(schema.brandCatalog)
        .values({ id: String(b.id), name: b.name })
        .onConflictDoNothing();
    }
    console.log("  ✓ Brands done");
  }

  // ── Industry Catalog ──────────────────────────────────────────────────────
  if (dbJson.industryCatalog?.length) {
    console.log(`  Seeding ${dbJson.industryCatalog.length} industries...`);
    for (const i of dbJson.industryCatalog) {
      await db
        .insert(schema.industryCatalog)
        .values({ id: String(i.id), name: i.name })
        .onConflictDoNothing();
    }
    console.log("  ✓ Industries done");
  }

  // ── Platform Catalog ──────────────────────────────────────────────────────
  if (dbJson.platformCatalog?.length) {
    console.log(`  Seeding ${dbJson.platformCatalog.length} platforms...`);
    for (const p of dbJson.platformCatalog) {
      await db
        .insert(schema.platformCatalog)
        .values({ id: String(p.id), name: p.name })
        .onConflictDoNothing();
    }
    console.log("  ✓ Platforms done");
  }

  // ── Team Members ──────────────────────────────────────────────────────────
  if (dbJson.teamMembers?.length) {
    console.log(`  Seeding ${dbJson.teamMembers.length} team members...`);
    for (const m of dbJson.teamMembers) {
      await db
        .insert(schema.teamMembers)
        .values({
          id: m.id,
          name: m.name,
          email: m.email,
          role: m.role ?? "member",
          group: m.group ?? "其他",
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Team members done");
  }

  // ── System Preferences ────────────────────────────────────────────────────
  if (dbJson.systemPreferences) {
    console.log("  Seeding system preferences...");
    const sp = dbJson.systemPreferences;
    await db
      .insert(schema.systemPreferences)
      .values({
        id: "default",
        currency: sp.currency ?? "TWD",
        defaultTaxRate: sp.defaultTaxRate != null ? String(sp.defaultTaxRate) : "5",
        defaultReportLang: sp.defaultReportLang ?? "zh-TW",
        notifyEmail: sp.notifyEmail ?? "",
        aiSuggestions: sp.aiSuggestions ?? true,
      })
      .onConflictDoNothing();
    console.log("  ✓ System preferences done");
  }

  console.log("✅ Seed complete!");
  await client.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
