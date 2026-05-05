import { json, type ActionFunctionArgs } from "@remix-run/node";
import * as XLSX from "xlsx";
import { listKols, type Kol } from "~/lib/mock-api.server";

const EXPORT_COLUMNS = [
  "KOL名稱",
  "性別",
  "年齡",
  "聯絡電話",
  "Email",
  "請款方式",
  "標籤",
  "收藏資料夾",
  "Instagram URL",
  "Instagram 粉絲數",
  "YouTube URL",
  "YouTube 訂閱數",
  "TikTok URL",
  "TikTok 粉絲數",
  "Facebook URL",
  "Facebook 粉絲數",
  "評分",
  "合作次數",
  "平均價格",
  "互動率(%)",
  "曝光率(%)",
  "主要受眾年齡層",
  "受眾性別比 男(%)",
  "受眾性別比 女(%)",
  "人選介紹",
  "備註",
] as const;

function rowFromKol(kol: Kol): Record<(typeof EXPORT_COLUMNS)[number], string | number> {
  const audienceGender = kol.audienceGender;
  return {
    "KOL名稱": kol.displayName,
    "性別": kol.gender ?? "",
    "年齡": kol.age ?? "",
    "聯絡電話": kol.contact?.phone ?? "",
    "Email": kol.contact?.email ?? "",
    "請款方式": kol.paymentMethod ?? "",
    "標籤": (kol.tags ?? kol.categories ?? []).join(", "),
    "收藏資料夾": (kol.favoriteFolders ?? []).join(", "),
    "Instagram URL": kol.socialLinks?.instagram ?? "",
    "Instagram 粉絲數": kol.social?.instagram ?? 0,
    "YouTube URL": kol.socialLinks?.youtube ?? "",
    "YouTube 訂閱數": kol.social?.youtube ?? 0,
    "TikTok URL": kol.socialLinks?.tiktok ?? "",
    "TikTok 粉絲數": kol.social?.tiktok ?? 0,
    "Facebook URL": kol.socialLinks?.facebook ?? "",
    "Facebook 粉絲數": kol.social?.facebook ?? 0,
    "評分": kol.rating ?? 0,
    "合作次數": kol.collaborations ?? 0,
    "平均價格": kol.averagePrice ?? 0,
    "互動率(%)": kol.engagementRate ?? 0,
    "曝光率(%)": kol.exposureRate ?? 0,
    "主要受眾年齡層": kol.audienceAge ?? "",
    "受眾性別比 男(%)": audienceGender?.male ?? "",
    "受眾性別比 女(%)": audienceGender?.female ?? "",
    "人選介紹": kol.introduction ?? "",
    "備註": kol.notes ?? "",
  };
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method.toUpperCase() !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const formData = await request.formData();
  const idsRaw = String(formData.get("kolIds") ?? "");
  const selectedIds = idsRaw.split(",").map((s) => s.trim()).filter(Boolean);

  if (selectedIds.length === 0) {
    return json({ error: "請至少選擇一位 KOL" }, { status: 400 });
  }

  const allKols = await listKols();
  const idSet = new Set(selectedIds);
  const orderIndex = new Map(selectedIds.map((id, idx) => [id, idx]));
  const selected = allKols
    .filter((kol) => idSet.has(kol.id))
    .sort((a, b) => (orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0));

  if (selected.length === 0) {
    return json({ error: "找不到對應的 KOL 資料" }, { status: 404 });
  }

  const rows = selected.map(rowFromKol);
  const ws = XLSX.utils.json_to_sheet(rows, { header: [...EXPORT_COLUMNS] });
  ws["!cols"] = EXPORT_COLUMNS.map((header) => ({
    wch: header.length >= 8 ? header.length + 4 : 14,
  }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "我的收藏");

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  const filename = `KOL_favorites_${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
