// Demo "view-as" identity layer.
//
// The app has no real per-user authentication beyond a shared demo cookie, so
// the sharing/ownership feature uses a separate cookie pointing at a row in
// `team_members`. Switching this cookie lets a single demo user simulate the
// experience of different team members for owner / recipient perspectives.

import { createCookie } from "@remix-run/node";
import { listTeamMembers, type TeamMember } from "./mock-api.server";

export const viewAsCookie = createCookie("kol-db-view-as", {
  httpOnly: false,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30,
});

async function readMemberId(request: Request): Promise<string | null> {
  const parsed = await viewAsCookie.parse(request.headers.get("Cookie"));
  if (!parsed) return null;
  if (typeof parsed === "string") return parsed;
  if (typeof parsed === "object" && typeof (parsed as { memberId?: unknown }).memberId === "string") {
    return (parsed as { memberId: string }).memberId;
  }
  return null;
}

function pickFallback(members: TeamMember[]): TeamMember | null {
  return (
    members.find((m) => m.role === "admin") ??
    members.find((m) => m.role === "manager") ??
    members[0] ??
    null
  );
}

/**
 * Resolve the current "view-as" team member. Falls back to the first admin /
 * manager / member if the cookie is unset or stale. Returns null only when no
 * team members exist at all (which indicates a fresh setup).
 */
export async function getCurrentMember(request: Request): Promise<TeamMember | null> {
  const [memberId, members] = await Promise.all([
    readMemberId(request),
    listTeamMembers(),
  ]);
  if (memberId) {
    const found = members.find((m) => m.id === memberId);
    if (found) return found;
  }
  return pickFallback(members);
}

/** List members with the current member resolved — useful for switcher UIs. */
export async function listMembersWithCurrent(
  request: Request,
): Promise<{ current: TeamMember | null; members: TeamMember[] }> {
  const [memberId, members] = await Promise.all([
    readMemberId(request),
    listTeamMembers(),
  ]);
  const current = memberId
    ? members.find((m) => m.id === memberId) ?? pickFallback(members)
    : pickFallback(members);
  return { current, members };
}
