import { type LoaderFunctionArgs } from "@remix-run/node";
import { readFile } from "node:fs/promises";
import { getInsertionOrder } from "~/lib/mock-api.server";
import { fileExists, generateReportPpt } from "~/lib/report-ppt.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const orderId = params.orderId ?? "";
  const reportId = params.reportId ?? "";

  const order = await Promise.race([
    getInsertionOrder(orderId),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
  ]).catch(() => null);
  if (!order) {
    return new Response("Insertion order not found", { status: 404 });
  }

  const report = (order.reports ?? []).find((item) => item.id === reportId);
  if (!report) {
    return new Response("Report not found", { status: 404 });
  }

  const canRegenerate =
    report.type === "draft"
    || Boolean(report.templateKey || report.reportTitle || report.selectedKolIds?.length);

  let filePath: string;
  try {
    filePath = report.filePath && await fileExists(report.filePath)
      ? report.filePath
      : !canRegenerate
        ? ""
      : await generateReportPpt({
          order,
          report: {
            id: report.id,
            name: report.name,
            templateKey: report.templateKey,
            selectedKolIds: report.selectedKolIds,
            reportTitle: report.reportTitle,
          },
        });
    if (!filePath) {
      return new Response("Report file is unavailable", { status: 404 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Report generation failed";
    return new Response(message, { status: 500 });
  }

  const buffer = await readFile(filePath);
  const filename = report.name || `${order.orderNo}_結案報告.pptx`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
