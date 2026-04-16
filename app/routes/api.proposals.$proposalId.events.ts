/**
 * SSE endpoint: GET /api/proposals/:proposalId/events
 * Clients subscribe here to receive real-time proposal update notifications.
 */
import type { LoaderFunctionArgs } from "@remix-run/node";
import { subscribeToProposal } from "~/lib/notifications.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const proposalId = params.proposalId ?? "";
  // In a real app, resolve current user from session; use a query param as fallback for demo
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId") ?? "anonymous";

  let unsubscribe: (() => void) | undefined;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      // Send initial heartbeat so the connection is established immediately
      controller.enqueue(encoder.encode(": connected\n\n"));

      unsubscribe = subscribeToProposal(proposalId, userId, controller);

      // Keepalive ping every 25 seconds to prevent proxy/browser timeouts
      const interval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {
          clearInterval(interval);
        }
      }, 25_000);

      // Clean up when the client disconnects
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        unsubscribe?.();
        try { controller.close(); } catch { /* already closed */ }
      });
    },
    cancel() {
      unsubscribe?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      // Allow cross-origin if needed
      "X-Accel-Buffering": "no",
    },
  });
}
