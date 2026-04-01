/**
 * Seed script: imports mock/db.json into Supabase via Drizzle ORM
 * Usage: npx tsx scripts/seed.ts
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/drizzle/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

const dbJson = JSON.parse(
  readFileSync(resolve(process.cwd(), "mock/db.json"), "utf-8"),
);

async function seed() {
  console.log("🌱 Starting seed...");

  // ── KOLs ──────────────────────────────────────────────────────────────────
  if (dbJson.kols?.length) {
    console.log(`  Seeding ${dbJson.kols.length} KOLs...`);
    for (const kol of dbJson.kols) {
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
          notes: kol.notes ?? null,
          paymentMethod: kol.paymentMethod ?? null,
          social: kol.social ?? {},
          contact: kol.contact ?? {},
          collaborationHistory: kol.collaborationHistory ?? [],
          priceTrend: kol.priceTrend ?? [],
          performanceStats: kol.performanceStats ?? null,
          contactEmail: kol.contact?.email ?? null,
          contactPhone: kol.contact?.phone ?? null,
          status: "active",
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ KOLs done");
  }

  // ── Proposals ─────────────────────────────────────────────────────────────
  if (dbJson.proposals?.length) {
    console.log(`  Seeding ${dbJson.proposals.length} proposals...`);
    for (const p of dbJson.proposals) {
      await db
        .insert(schema.proposals)
        .values({
          id: p.id,
          title: p.title,
          clientName: p.clientName ?? null,
          stage: p.stage ?? "draft",
          budget: p.budget != null ? String(p.budget) : null,
          dueDate: p.dueDate ?? null,
        })
        .onConflictDoNothing();
    }
    console.log("  ✓ Proposals done");
  }

  // ── ProposalKols ──────────────────────────────────────────────────────────
  if (dbJson.proposalKols?.length) {
    console.log(`  Seeding ${dbJson.proposalKols.length} proposalKols...`);
    for (const pk of dbJson.proposalKols) {
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

  // ── Tag Catalog ───────────────────────────────────────────────────────────
  if (dbJson.tagCatalog?.length) {
    console.log(`  Seeding ${dbJson.tagCatalog.length} tags...`);
    for (const t of dbJson.tagCatalog) {
      await db
        .insert(schema.tagCatalog)
        .values({ name: t.name })
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
        .values({ name: b.name })
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
        .values({ name: i.name })
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
        .values({ name: p.name })
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
