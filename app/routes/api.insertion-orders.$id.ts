import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getInsertionOrder } from "~/lib/mock-api.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await getInsertionOrder(params.id ?? "");
  if (!order) return json(null, { status: 404 });
  return json(order);
}
