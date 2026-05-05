import type { LoaderFunctionArgs } from "@remix-run/node";
import { buildTemplateBuffer } from "~/lib/kol-batch-import.server";

export async function loader(_args: LoaderFunctionArgs) {
  const buffer = buildTemplateBuffer();
  const filename = `KOL_batch_import_template.xlsx`;
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
