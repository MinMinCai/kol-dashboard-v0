/**
 * scripts/backfill-handles.mjs
 * Backfills instagram_handle (and any other null fields derivable from mock/db.json)
 * for KOL rows that were seeded before those columns existed.
 * Safe to re-run: only updates rows where instagram_handle IS NULL.
 */
import { config as loadEnv } from "dotenv";
import postgres from "postgres";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: join(__dirname, "../.env.local"), override: true });
loadEnv({ path: join(__dirname, "../.env"), override: false });
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn("[backfill] DATABASE_URL not set — skipping");
  process.exit(0);
}

const mockPath = join(__dirname, "../mock/db.json");
let mockDb;
try {
  mockDb = JSON.parse(readFileSync(mockPath, "utf-8"));
} catch {
  console.warn("[backfill] mock/db.json not found — skipping");
  process.exit(0);
}

const kols = mockDb.kols ?? [];
if (kols.length === 0) {
  console.log("[backfill] No KOL data in mock/db.json — skipping");
  process.exit(0);
}

const sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 15 });

try {
  console.log(`[backfill] Backfilling instagram_handle for ${kols.length} KOLs…`);
  let updated = 0;
  for (const kol of kols) {
    if (!kol.id || !kol.instagramHandle) continue;
    const result = await sql`
      UPDATE kols
      SET instagram_handle = ${kol.instagramHandle}
      WHERE id = ${kol.id} AND (instagram_handle IS NULL OR instagram_handle = '')
    `;
    if (result.count > 0) updated++;
  }
  console.log(`[backfill] ✓ Updated ${updated} rows`);
} catch (err) {
  console.error("[backfill] ✗ Failed:", err.message);
} finally {
  await sql.end();
}
