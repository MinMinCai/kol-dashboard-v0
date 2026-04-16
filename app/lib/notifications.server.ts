/**
 * In-memory pub/sub for proposal update notifications (SSE).
 * Stores a list of SSE response controllers per proposalId.
 * In production, this would be replaced with Redis pub/sub or a WebSocket server.
 */

export type ProposalNotification = {
  type: "proposal_updated";
  proposalId: string;
  updatedBy: string; // display name of the user who made the update
  field: string;     // e.g. "stage", "title", "candidate added", etc.
  timestamp: string;
};

type Subscriber = {
  controller: ReadableStreamDefaultController;
  userId: string;
};

// Map from proposalId -> list of subscribers
const subscribers = new Map<string, Set<Subscriber>>();

export function subscribeToProposal(
  proposalId: string,
  userId: string,
  controller: ReadableStreamDefaultController
): () => void {
  if (!subscribers.has(proposalId)) {
    subscribers.set(proposalId, new Set());
  }
  const sub: Subscriber = { controller, userId };
  subscribers.get(proposalId)!.add(sub);

  // Return unsubscribe function
  return () => {
    subscribers.get(proposalId)?.delete(sub);
    if (subscribers.get(proposalId)?.size === 0) {
      subscribers.delete(proposalId);
    }
  };
}

export function notifyProposalUpdated(notification: ProposalNotification) {
  const subs = subscribers.get(notification.proposalId);
  if (!subs || subs.size === 0) return;

  const data = `data: ${JSON.stringify(notification)}\n\n`;
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);

  for (const sub of subs) {
    // Don't notify the user who made the update
    if (sub.userId === notification.updatedBy) continue;
    try {
      sub.controller.enqueue(encoded);
    } catch {
      // Stream already closed; will be cleaned up on disconnect
    }
  }
}
