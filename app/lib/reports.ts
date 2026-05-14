export type SortOption =
  | "order_no_asc"
  | "order_no_desc"
  | "date_desc"
  | "date_asc"
  | "title_az"
  | "title_za"
  | "budget_desc"
  | "budget_asc"
  | "report_date_desc"
  | "report_date_asc";

export function buildReportDownloadPath(orderId: string, reportId: string): string {
  return `/api/reports/${orderId}/${reportId}/download`;
}
