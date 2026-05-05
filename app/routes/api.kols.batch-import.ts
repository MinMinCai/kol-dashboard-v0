import {
  json,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { processBatchImportFile } from "~/lib/kol-batch-import.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method.toUpperCase() !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 10 * 1024 * 1024,
  });

  let formData: FormData;
  try {
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "解析上傳檔案失敗";
    return json({ error: msg }, { status: 400 });
  }

  const file = formData.get("excelFile");
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: "請選擇有效的 Excel 檔案" }, { status: 400 });
  }

  const result = await processBatchImportFile(file);
  return json({ result });
}
