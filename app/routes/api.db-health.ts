import { json } from "@remix-run/node";
import { listKols, listInsertionOrders, listProposals, listTeamMembers } from "~/lib/mock-api.server";

async function timed<T>(label: string, fn: () => Promise<T>) {
  const t = Date.now();
  try {
    const r = await fn();
    return { label, ok: true, ms: Date.now() - t, count: Array.isArray(r) ? r.length : "n/a" };
  } catch (err) {
    return { label, ok: false, ms: Date.now() - t, error: String(err) };
  }
}

export async function loader() {
  const total = Date.now();
  const parallel = await Promise.all([
    timed("listKols", () => listKols()),
    timed("listInsertionOrders", () => listInsertionOrders()),
    timed("listProposals", () => listProposals()),
    timed("listTeamMembers", () => listTeamMembers()),
  ]);
  return json({ totalMs: Date.now() - total, parallel });
}
