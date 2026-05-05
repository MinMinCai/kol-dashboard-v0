import * as XLSX from "xlsx";
import { createKol } from "./mock-api.server";

export const BATCH_IMPORT_COLUMNS = [
  "KOL名稱",
  "性別",
  "年齡",
  "聯絡電話",
  "Email",
  "請款方式",
  "標籤",
  "Instagram URL",
  "Instagram 粉絲數",
  "YouTube URL",
  "YouTube 訂閱數",
  "TikTok URL",
  "TikTok 粉絲數",
  "Facebook URL",
  "Facebook 粉絲數",
  "人選介紹",
  "備註",
] as const;

const EXAMPLE_ROWS: Record<string, string | number>[] = [
  {
    "KOL名稱": "Amy Beauty",
    "性別": "女",
    "年齡": 28,
    "聯絡電話": "0912-345-678",
    "Email": "amy@example.com",
    "請款方式": "勞報",
    "標籤": "美妝, 保養",
    "Instagram URL": "https://www.instagram.com/amybeauty.tw",
    "Instagram 粉絲數": 183000,
    "YouTube URL": "",
    "YouTube 訂閱數": 0,
    "TikTok URL": "https://www.tiktok.com/@amybeauty",
    "TikTok 粉絲數": 54000,
    "Facebook URL": "",
    "Facebook 粉絲數": 0,
    "人選介紹": "美妝保養領域代表 KOL，擅長產品評測與教學。",
    "備註": "報價偏高，但成效穩定。",
  },
  {
    "KOL名稱": "Marc FoodLab",
    "性別": "男",
    "年齡": 32,
    "聯絡電話": "",
    "Email": "marc@example.com",
    "請款方式": "發票",
    "標籤": "美食, 料理",
    "Instagram URL": "",
    "Instagram 粉絲數": 0,
    "YouTube URL": "https://www.youtube.com/@MarcFoodLab",
    "YouTube 訂閱數": 220000,
    "TikTok URL": "",
    "TikTok 粉絲數": 0,
    "Facebook URL": "https://www.facebook.com/marcfoodlab",
    "Facebook 粉絲數": 35000,
    "人選介紹": "美食頻道主，擅長家常料理與餐廳開箱。",
    "備註": "",
  },
];

function parseHandle(url: string): string {
  const raw = url.trim();
  if (!raw) return "";
  const parts = raw.split("/").filter(Boolean);
  const handle = parts[parts.length - 1] ?? "";
  return handle.replace("@", "");
}

function toNumber(value: unknown): number {
  if (value == null || value === "") return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function buildPayloadFromRow(row: Record<string, unknown>) {
  const displayName = String(row["KOL名稱"] ?? "").trim();

  const tagsRaw = String(row["標籤"] ?? "");
  const tags = tagsRaw
    ? tagsRaw.split(/[,，、]/).map((s) => s.trim()).filter(Boolean)
    : [];

  const igUrl = String(row["Instagram URL"] ?? "").trim();
  const igFollowers = toNumber(row["Instagram 粉絲數"]);
  const ytUrl = String(row["YouTube URL"] ?? "").trim();
  const ytFollowers = toNumber(row["YouTube 訂閱數"]);
  const ttUrl = String(row["TikTok URL"] ?? "").trim();
  const ttFollowers = toNumber(row["TikTok 粉絲數"]);
  const fbUrl = String(row["Facebook URL"] ?? "").trim();
  const fbFollowers = toNumber(row["Facebook 粉絲數"]);

  const platforms: string[] = [];
  if (igUrl || igFollowers) platforms.push("Instagram");
  if (ytUrl || ytFollowers) platforms.push("YouTube");
  if (ttUrl || ttFollowers) platforms.push("TikTok");
  if (fbUrl || fbFollowers) platforms.push("Facebook");

  const igHandle = igUrl ? parseHandle(igUrl) : undefined;

  const genderRaw = String(row["性別"] ?? "").trim();
  const gender =
    genderRaw === "男" || genderRaw === "女" || genderRaw === "其他"
      ? (genderRaw as "男" | "女" | "其他")
      : undefined;
  const ageNum = toNumber(row["年齡"]);
  const age = ageNum > 0 && ageNum <= 120 ? ageNum : undefined;

  const paymentRaw = String(row["請款方式"] ?? "").trim();
  const paymentMethod: "勞報" | "發票" | undefined =
    paymentRaw === "勞報" || paymentRaw === "發票" ? paymentRaw : undefined;

  const phone = String(row["聯絡電話"] ?? "").trim();
  const email = String(row["Email"] ?? "").trim();
  const introduction = String(row["人選介紹"] ?? "").trim();
  const notes = String(row["備註"] ?? "").trim();

  const primaryPlatform = platforms[0] ?? "Instagram";
  const primaryFollowers =
    primaryPlatform === "Instagram" ? igFollowers
      : primaryPlatform === "YouTube" ? ytFollowers
        : primaryPlatform === "TikTok" ? ttFollowers
          : fbFollowers;

  return {
    displayName,
    instagramHandle: igHandle,
    industry: "待分類",
    tags,
    categories: tags.length > 0 ? tags : ["待分類"],
    platform: primaryPlatform,
    followers: primaryFollowers,
    engagementRate: 0,
    introduction: introduction || undefined,
    platformMetrics: {
      platforms,
    },
    socialLinks: {
      instagram: igUrl || undefined,
      youtube: ytUrl || undefined,
      tiktok: ttUrl || undefined,
      facebook: fbUrl || undefined,
    },
    rating: 0,
    collaborations: 0,
    averagePrice: 0,
    isFavorite: false,
    social: {
      instagram: igFollowers,
      youtube: ytFollowers,
      tiktok: ttFollowers,
      facebook: fbFollowers,
    },
    contact: { phone, email, manager: "" },
    gender,
    age,
    city: "Taipei",
    notes: notes || undefined,
    paymentMethod,
  } as const;
}

export type BatchImportResult = {
  total: number;
  success: number;
  failed: number;
  errors: string[];
};

export async function processBatchImportFile(file: File): Promise<BatchImportResult> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const wb = XLSX.read(buffer, { type: "buffer" });
  const firstSheetName = wb.SheetNames[0];
  if (!firstSheetName) {
    return { total: 0, success: 0, failed: 0, errors: ["Excel 檔案內沒有工作表"] };
  }
  const sheet = wb.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const [idx, row] of rows.entries()) {
    const lineNumber = idx + 2;
    try {
      const payload = buildPayloadFromRow(row);
      if (!payload.displayName) {
        failed++;
        errors.push(`第 ${lineNumber} 列：KOL名稱為必填，已略過`);
        continue;
      }
      // createKol expects Omit<Kol, "id">; we cast since payload object literal matches required shape
      await createKol(payload as Parameters<typeof createKol>[0]);
      success++;
    } catch (e) {
      failed++;
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`第 ${lineNumber} 列：建立失敗（${msg}）`);
    }
  }

  return { total: rows.length, success, failed, errors };
}

export function buildTemplateBuffer(): Buffer {
  const ws = XLSX.utils.json_to_sheet(EXAMPLE_ROWS, {
    header: [...BATCH_IMPORT_COLUMNS],
  });
  // Set reasonable column widths
  ws["!cols"] = BATCH_IMPORT_COLUMNS.map((header) => ({
    wch: header.length >= 8 ? header.length + 4 : 14,
  }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "KOL");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
}
