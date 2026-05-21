import {
  type ActionFunctionArgs,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { updateInsertionOrder } from "~/lib/mock-api.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.id ?? "";
  if (!id) return new Response("Missing id", { status: 400 });

  const handler = unstable_createMemoryUploadHandler({ maxPartSize: 20 * 1024 * 1024 });
  const formData = await unstable_parseMultipartFormData(request, handler);

  const file = formData.get("file") as File | null;
  if (!file?.name) return new Response("No file provided", { status: 400 });

  // Demo: store only the filename (no actual file storage)
  await updateInsertionOrder(id, { documentUrl: file.name });

  return new Response(JSON.stringify({ ok: true, filename: file.name }), {
    headers: { "Content-Type": "application/json" },
  });
}
