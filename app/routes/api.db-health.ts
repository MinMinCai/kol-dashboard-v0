import { json } from "@remix-run/node";
import { sql } from "drizzle-orm";
import { db } from "~/lib/db.server";
import {
  kols, proposals, insertionOrders, kolSocialAccounts,
  kolFavoriteFolders, kolFavoriteFolderItems, systemPreferences, teamMembers,
} from "../../db/drizzle/schema";

const TIMEOUT_MS = 5000;

async function testTable(name: string, table: any) {
  const t = Date.now();
  try {
    const result = await Promise.race([
      db.select({ count: sql<number>`count(*)::int` }).from(table),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)),
    ]);
    return { ok: true, ms: Date.now() - t, count: result[0]?.count };
  } catch (err) {
    return { ok: false, ms: Date.now() - t, error: String(err) };
  }
}

export async function loader() {
  const total = Date.now();
  // Run serially so the health check itself doesn't saturate the connection pool.
  const k   = await testTable("kols", kols);
  const p   = await testTable("proposals", proposals);
  const io  = await testTable("insertionOrders", insertionOrders);
  const sa  = await testTable("kolSocialAccounts", kolSocialAccounts);
  const ff  = await testTable("kolFavoriteFolders", kolFavoriteFolders);
  const ffi = await testTable("kolFavoriteFolderItems", kolFavoriteFolderItems);
  const sp  = await testTable("systemPreferences", systemPreferences);
  const tm  = await testTable("teamMembers", teamMembers);
  return json({
    totalMs: Date.now() - total,
    kols: k, proposals: p, insertionOrders: io,
    kolSocialAccounts: sa, kolFavoriteFolders: ff,
    kolFavoriteFolderItems: ffi, systemPreferences: sp, teamMembers: tm,
  });
}
