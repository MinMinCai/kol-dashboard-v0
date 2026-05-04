import { json } from "@remix-run/node";
import { sql } from "drizzle-orm";
import { db } from "~/lib/db.server";

export async function loader() {
  const start = Date.now();
  try {
    const result = await Promise.race([
      db.execute(sql`SELECT 1 as ok, current_database() as dbname`),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout after 8s")), 8000)),
    ]);
    return json({ ok: true, ms: Date.now() - start, db: (result.rows[0] as any)?.dbname });
  } catch (err) {
    return json({ ok: false, ms: Date.now() - start, error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
