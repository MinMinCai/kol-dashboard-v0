import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getInsertionOrder } from "~/lib/mock-api.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await Promise.race([
    getInsertionOrder(params.id ?? ""),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
  ]).catch(() => null);
  if (!order) return json(null, { status: 404 });
  return json(order);
}
