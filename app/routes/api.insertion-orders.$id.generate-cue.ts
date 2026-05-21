import { type LoaderFunctionArgs } from "@remix-run/node";
import * as XLSX from "xlsx";
import { getInsertionOrder } from "~/lib/mock-api.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await getInsertionOrder(params.id ?? "");
  if (!order) return new Response("Not found", { status: 404 });

  const collaborations = order.collaborations ?? [];
  const totalBudget = order.totalBudget ?? 0;
  const tax = order.tax ?? Math.round(totalBudget * 0.05);
  const totalWithTax = order.totalWithTax ?? totalBudget + tax;
  const executionMonth = order.startDate ? order.startDate.slice(0, 7) : "";

  // Build rows as array-of-arrays (aoa)
  const aoa: (string | number)[][] = [
    ["KOL費用報價單 PRODUCTION PRE-ESTIMATE"],
    [],
    ["客戶：", order.clientName ?? "", "", "案件名稱：", order.title ?? order.projectName ?? "", "", "執行月份：", executionMonth],
    [],
    ["KOL人選", "合作內容", "執行日期", "合作產品", "預估觀看數", "預估觸及數", "預估互動數", "費用(NTD)"],
    ...collaborations.map((c) => [
      c.name ?? "",
      c.services ?? "",
      c.uploadDate ?? c.executionDate ?? "",
      "",           // 合作產品 — 尚無資料
      "",           // 預估觀看數 — 尚無資料
      c.totalReach ?? "",
      c.totalEngagement ?? "",
      c.price ?? "",
    ]),
    [],
    ["", "", "", "", "", "", "合計", totalBudget],
    ["", "", "", "", "", "", "5%營業稅(VAT)", tax],
    ["", "", "", "", "", "", "總金額(Total Amount)", totalWithTax],
    [],
    ["*KOL合作上線當月開立發票請款，請款月份視實際狀況進行調整，付款日為發票日次月起算XX天（遇假日提前）"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(aoa);

  // Column widths (rough match to the template layout)
  ws["!cols"] = [
    { wch: 18 }, // KOL人選
    { wch: 20 }, // 合作內容
    { wch: 14 }, // 執行日期
    { wch: 14 }, // 合作產品
    { wch: 14 }, // 預估觀看數
    { wch: 14 }, // 預估觸及數
    { wch: 14 }, // 預估互動數
    { wch: 16 }, // 費用
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "CUE表");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  const safe = (s: string) => s.replace(/[^a-zA-Z0-9一-龥]/g, "_");
  const filename = `KOL合作CUE_${safe(order.title ?? order.projectName ?? "未命名")}.xlsx`;

  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
