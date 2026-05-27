import { type Proposal, type ProposalPermission, type TeamMember } from "./mock-api.server";

export type ProposalAccessLevel = "creator" | "edit" | "view" | "none";

export { DEPARTMENTS, type Department } from "./departments";

/**
 * Resolve what access the current member has to a proposal.
 *
 * Rules:
 * - Creator → "creator" (full access + can manage permissions)
 * - No permissions set on proposal → "edit" for everyone
 * - Creator's department has no explicit entry → still "edit" (default for creator's dept)
 * - Otherwise match department permission level, or "none" if no match
 */
export function getProposalAccessLevel(
  proposal: Proposal,
  permissions: ProposalPermission[],
  currentMember: TeamMember | null,
): ProposalAccessLevel {
  if (!currentMember) return "none";

  if (proposal.creatorId && proposal.creatorId === currentMember.id) {
    return "creator";
  }

  // No permissions configured → everyone gets edit access
  if (permissions.length === 0) return "edit";

  // Creator's department always gets edit by default (even if not listed)
  // But since creator is caught above, here we only need to check current member's dept
  const deptPerm = permissions.find((p) => p.department === currentMember.group);
  if (!deptPerm) return "none";
  return deptPerm.permissionLevel;
}

