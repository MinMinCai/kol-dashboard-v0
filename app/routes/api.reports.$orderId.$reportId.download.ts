import { type LoaderFunctionArgs } from "@remix-run/node";
import { readFile } from "node:fs/promises";
import { getInsertionOrder } from "~/lib/mock-api.server";
import { fileExists, generateReportPpt, resolveReportTemplatePath } from "~/lib/report-ppt.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const orderId = params.orderId ?? "";
  const reportId = params.reportId ?? "";

  const order = await getInsertionOrder(orderId);
  if (!order) {
    return new Response("Insertion order not found", { status: 404 });
  }

  const report = (order.reports ?? []).find((item) => item.id === reportId);
  if (!report) {
    return new Response("Report not found", { status: 404 });
  }

  const filePath = report.filePath && await fileExists(report.filePath)
    ? report.filePath
    : await generateReportPpt({
        order,
        report: {
          id: report.id,
          name: report.name,
          templateKey: report.templateKey,
          selectedKolIds: report.selectedKolIds,
          reportTitle: report.reportTitle,
        },
      }).catch(async () => resolveReportTemplatePath(report.templateKey));

  const buffer = await readFile(filePath);
  const filename = report.name || `${order.orderNo}_結案報告.pptx`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
