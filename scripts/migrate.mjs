/**
 * scripts/migrate.mjs
 * Applies db/patch.sql to the production database before the server starts.
 * Safe to re-run: all statements use IF NOT EXISTS / IF EXISTS guards.
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
  console.warn("[migrate] DATABASE_URL not set — skipping migration");
  process.exit(0);
}

const sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 15 });
const patchPath = join(__dirname, "../db/patch.sql");
const patch = readFileSync(patchPath, "utf-8");

try {
  console.log("[migrate] Applying patch.sql …");
  await sql.unsafe(patch);
  console.log("[migrate] ✓ patch.sql applied successfully");
} catch (err) {
  console.error("[migrate] ✗ Failed to apply patch.sql:", err.message);
  // Non-fatal: let the server start anyway; loader .catch() will handle missing columns gracefully.
} finally {
  await sql.end();
}
