import { json } from "@remix-run/node";
import { sql } from "drizzle-orm";
import { db } from "~/lib/db.server";
import { kols } from "../../db/drizzle/schema";

export async function loader() {
  const results: Record<string, unknown> = {};

  // Test 1: basic connectivity
  const t0 = Date.now();
  try {
    await db.execute(sql`SELECT 1`);
    results.ping = { ok: true, ms: Date.now() - t0 };
  } catch (err) {
    results.ping = { ok: false, ms: Date.now() - t0, error: String(err) };
  }

  // Test 2: kols table
  const t1 = Date.now();
  try {
    const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(kols);
    results.kols = { ok: true, ms: Date.now() - t1, count };
  } catch (err) {
    results.kols = { ok: false, ms: Date.now() - t1, error: String(err) };
  }

  return json(results);
}
