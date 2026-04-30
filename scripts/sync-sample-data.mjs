import { config as loadEnv } from "dotenv";
import postgres from "postgres";
import { readFileSync } from "fs";
import { resolve } from "path";
import { buildSupplementalProposalKols, buildSupplementalProposals, enrichKolSeedData } from "./sample-data-utils.mjs";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });
loadEnv({ path: resolve(process.cwd(), ".env"), override: false });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn("[sync-sample-data] DATABASE_URL not set — skipping");
  process.exit(0);
}

const dbJson = JSON.parse(readFileSync(resolve(process.cwd(), "mock/db.json"), "utf-8"));
const sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 15, prepare: false });

const socialAccountsByKolId = new Map();
for (const account of dbJson.kolSocialAccounts ?? []) {
  const current = socialAccountsByKolId.get(account.kolId) ?? [];
  current.push(account);
  socialAccountsByKolId.set(account.kolId, current);
}

const enrichedKols = (dbJson.kols ?? []).map((kol) => enrichKolSeedData(kol, socialAccountsByKolId.get(kol.id) ?? []));
const supplementalProposals = buildSupplementalProposals(dbJson);
const supplementalProposalKols = buildSupplementalProposalKols(dbJson, enrichedKols);

try {
  console.log(`[sync-sample-data] Syncing ${enrichedKols.length} KOLs...`);
  for (const kol of enrichedKols) {
    await sql`
      UPDATE kols
      SET
        platform_metrics = ${sql.json(kol.platformMetrics ?? null)},
        social_links = ${sql.json(kol.socialLinks ?? null)},
        instagram_handle = COALESCE(NULLIF(instagram_handle, ''), ${kol.instagramHandle ?? null}),
        updated_at = NOW()
      WHERE id = ${kol.id}
    `;
  }

  console.log(`[sync-sample-data] Upserting ${supplementalProposals.length} supplemental proposals...`);
  for (const proposal of supplementalProposals) {
    await sql`
      INSERT INTO proposals (id, title, client_name, stage, budget, due_date)
      VALUES (${proposal.id}, ${proposal.title}, ${proposal.clientName || null}, ${proposal.stage}, ${String(proposal.budget ?? 0)}, ${proposal.dueDate ?? null})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log(`[sync-sample-data] Upserting ${supplementalProposalKols.length} supplemental proposal candidates...`);
  for (const candidate of supplementalProposalKols) {
    await sql`
      INSERT INTO proposal_kols (
        id,
        proposal_id,
        kol_id,
        kol_name,
        kol_avatar_url,
        proposed_fee,
        role,
        reason,
        status,
        feedback_text,
        real_follower_ratio,
        reputation_score,
        avg_engagement_rate,
        engagement_index,
        engagement_score,
        brand_fit_score,
        quality_score,
        cpfr,
        recommendation
      )
      VALUES (
        ${candidate.id},
        ${candidate.proposalId},
        ${candidate.kolId ?? null},
        ${candidate.kolName ?? null},
        ${candidate.kolAvatarUrl ?? null},
        ${candidate.price != null ? String(candidate.price) : null},
        ${candidate.role ?? null},
        ${candidate.reason ?? null},
        ${candidate.status ?? "pending"},
        ${candidate.feedbackText ?? ""},
        ${candidate.realFollowerRatio != null ? String(candidate.realFollowerRatio) : null},
        ${candidate.reputationScore != null ? String(candidate.reputationScore) : null},
        ${candidate.avgEngagementRate != null ? String(candidate.avgEngagementRate) : null},
        ${candidate.engagementIndex != null ? String(candidate.engagementIndex) : null},
        ${candidate.engagementScore != null ? String(candidate.engagementScore) : null},
        ${candidate.brandFitScore != null ? String(candidate.brandFitScore) : null},
        ${candidate.qualityScore != null ? String(candidate.qualityScore) : null},
        ${candidate.cpfr != null ? String(candidate.cpfr) : null},
        ${candidate.recommendation ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log("[sync-sample-data] ✓ Sample data synchronized");
} catch (error) {
  console.error("[sync-sample-data] ✗ Failed:", error.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
