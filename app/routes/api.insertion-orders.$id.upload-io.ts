import {
  type ActionFunctionArgs,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { getInsertionOrder, updateInsertionOrder } from "~/lib/mock-api.server";

export type IODocFile = { name: string; dataUrl: string };

export function parseIODocs(raw: string | undefined): IODocFile[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as IODocFile[];
  } catch {}
  // Legacy: plain filename string with no actual file
  return [{ name: raw, dataUrl: "" }];
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.id ?? "";
  if (!id) return new Response("Missing id", { status: 400 });

  const handler = unstable_createMemoryUploadHandler({ maxPartSize: 20 * 1024 * 1024 });
  const formData = await unstable_parseMultipartFormData(request, handler);

  const files = formData.getAll("file") as File[];
  const validFiles = files.filter((f) => f?.name);
  if (!validFiles.length) return new Response("No files provided", { status: 400 });

  // Load existing files
  const order = await getInsertionOrder(id);
  const existing = parseIODocs(order?.documentUrl);

  // Convert each uploaded file to a base64 data URL so it can be viewed in browser
  const newDocs: IODocFile[] = await Promise.all(
    validFiles.map(async (file) => {
      const buf = await file.arrayBuffer();
      const base64 = Buffer.from(buf).toString("base64");
      const mime = file.type || "application/octet-stream";
      return { name: file.name, dataUrl: `data:${mime};base64,${base64}` };
    }),
  );

  const updated = [...existing, ...newDocs];
  await updateInsertionOrder(id, { documentUrl: JSON.stringify(updated) });

  return new Response(
    JSON.stringify({ ok: true, files: newDocs.map((f) => f.name) }),
    { headers: { "Content-Type": "application/json" } },
  );
}
