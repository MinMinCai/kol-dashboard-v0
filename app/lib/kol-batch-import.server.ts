import * as XLSX from "xlsx";
import AdmZip from "adm-zip";
import { createKol } from "./mock-api.server";

// ─── dropdown options (mirrors the new-KOL form) ─────────────────────────────

const GENDER_OPTIONS = ["男", "女", "其他"] as const;
const PAYMENT_METHOD_OPTIONS = ["勞報", "發票"] as const;
const PLATFORM_OPTIONS = ["Instagram", "Facebook", "YouTube", "TikTok", "Threads"] as const;
const AUDIENCE_AGE_OPTIONS = ["0-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"] as const;

// ─── columns ─────────────────────────────────────────────────────────────────
// Reorganized into 3 logical groups so the section header row above can label them.

export const BATCH_IMPORT_COLUMNS = [
  // 基本資料 (cols A-G, index 0-6)
  "KOL名稱",
  "性別",
  "年齡",
  "聯絡電話",
  "Email",
  "請款方式",
  "標籤",
  // 社群平台 (cols H-O, index 7-14)
  "Instagram URL",
  "Instagram 粉絲數",
  "YouTube URL",
  "YouTube 訂閱數",
  "TikTok URL",
  "TikTok 粉絲數",
  "Facebook URL",
  "Facebook 粉絲數",
  "Threads URL",
  "Threads 粉絲數",
  // 受眾與其他資訊 (cols R-V, index 17-21)
  "主要受眾年齡層",
  "受眾性別比 男(%)",
  "受眾性別比 女(%)",
  "人選介紹",
  "備註",
] as const;

const SECTION_HEADERS: Array<{ label: string; startCol: number; endCol: number }> = [
  { label: "基本資料", startCol: 0, endCol: 6 },
  { label: "社群平台 (各平台填寫網址與粉絲數，未經營者留空)", startCol: 7, endCol: 16 },
  { label: "受眾與其他資訊", startCol: 17, endCol: 21 },
];

// Indexes into BATCH_IMPORT_COLUMNS for fields backed by Excel dropdowns
const COL_INDEX = {
  gender: BATCH_IMPORT_COLUMNS.indexOf("性別"),
  paymentMethod: BATCH_IMPORT_COLUMNS.indexOf("請款方式"),
  audienceAge: BATCH_IMPORT_COLUMNS.indexOf("主要受眾年齡層"),
} as const;

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
    "主要受眾年齡層": "18-24,25-34",
    "受眾性別比 男(%)": 30,
    "受眾性別比 女(%)": 70,
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
    "主要受眾年齡層": "25-34,35-44",
    "受眾性別比 男(%)": 55,
    "受眾性別比 女(%)": 45,
    "人選介紹": "美食頻道主，擅長家常料理與餐廳開箱。",
    "備註": "",
  },
];

// ─── parser helpers ──────────────────────────────────────────────────────────

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
  const thUrl = String(row["Threads URL"] ?? "").trim();
  const thFollowers = toNumber(row["Threads 粉絲數"]);

  const platforms: string[] = [];
  if (igUrl || igFollowers) platforms.push("Instagram");
  if (fbUrl || fbFollowers) platforms.push("Facebook");
  if (ytUrl || ytFollowers) platforms.push("YouTube");
  if (ttUrl || ttFollowers) platforms.push("TikTok");
  if (thUrl || thFollowers) platforms.push("Threads");

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

  // Audience metrics — accept the new columns; fall back to undefined if blank.
  const audienceAgeRaw = String(row["主要受眾年齡層"] ?? "").trim();
  const audienceAge = audienceAgeRaw || undefined;

  const audienceMaleNum = toNumber(row["受眾性別比 男(%)"]);
  const audienceFemaleNum = toNumber(row["受眾性別比 女(%)"]);
  const hasAudienceGender =
    String(row["受眾性別比 男(%)"] ?? "").trim() !== "" ||
    String(row["受眾性別比 女(%)"] ?? "").trim() !== "";
  const audienceGender = hasAudienceGender
    ? { male: audienceMaleNum, female: audienceFemaleNum }
    : undefined;

  const primaryPlatform = platforms[0] ?? "Instagram";
  const primaryFollowers =
    primaryPlatform === "Instagram" ? igFollowers
      : primaryPlatform === "Facebook" ? fbFollowers
        : primaryPlatform === "YouTube" ? ytFollowers
          : primaryPlatform === "TikTok" ? ttFollowers
            : thFollowers;

  return {
    displayName,
    instagramHandle: igHandle,
    industry: "待分類",
    tags,
    categories: tags.length > 0 ? tags : ["待分類"],
    platform: primaryPlatform,
    followers: primaryFollowers,
    engagementRate: 0,
    audienceGender,
    audienceAge,
    introduction: introduction || undefined,
    platformMetrics: {
      platforms,
    },
    socialLinks: {
      instagram: igUrl || undefined,
      facebook: fbUrl || undefined,
      youtube: ytUrl || undefined,
      tiktok: ttUrl || undefined,
      threads: thUrl || undefined,
    },
    rating: 0,
    collaborations: 0,
    averagePrice: 0,
    isFavorite: false,
    social: {
      instagram: igFollowers,
      facebook: fbFollowers,
      youtube: ytFollowers,
      tiktok: ttFollowers,
      threads: thFollowers,
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
  const sheetName =
    wb.SheetNames.find((n) => n.includes("KOL")) ?? wb.SheetNames[0];
  if (!sheetName) {
    return { total: 0, success: 0, failed: 0, errors: ["Excel 檔案內沒有工作表"] };
  }
  const sheet = wb.Sheets[sheetName];

  // The new template has a section-header row above the column-header row.
  // We detect that by checking whether row 1 contains the column-header sentinel "KOL名稱".
  // If it does, headers are at row 1 (legacy template). Otherwise headers are at row 2.
  const aoa: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
  const headerRowIdx = aoa.findIndex(
    (r) => Array.isArray(r) && r.some((c) => String(c).trim() === "KOL名稱"),
  );
  if (headerRowIdx < 0) {
    return { total: 0, success: 0, failed: 0, errors: ["範本格式錯誤：找不到「KOL名稱」欄位"] };
  }

  const headers = (aoa[headerRowIdx] as unknown[]).map((h) => String(h ?? "").trim());
  const dataRows = aoa.slice(headerRowIdx + 1).filter((r) =>
    Array.isArray(r) && r.some((c) => String(c ?? "").trim() !== ""),
  );

  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const [idx, rawRow] of dataRows.entries()) {
    // Excel line number = section header rows + column header row + data offset
    const lineNumber = headerRowIdx + 2 + idx;
    const row: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      if (h) row[h] = (rawRow as unknown[])[i] ?? "";
    });

    try {
      const payload = buildPayloadFromRow(row);
      if (!payload.displayName) {
        failed++;
        errors.push(`第 ${lineNumber} 列：KOL名稱為必填，已略過`);
        continue;
      }
      await createKol(payload as Parameters<typeof createKol>[0]);
      success++;
    } catch (e) {
      failed++;
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`第 ${lineNumber} 列：建立失敗（${msg}）`);
    }
  }

  return { total: dataRows.length, success, failed, errors };
}

// ─── template builder ────────────────────────────────────────────────────────
// xlsx CE doesn't write data validations or freeze panes; we post-process the
// generated file with adm-zip to inject these into the worksheet XML.

function buildDataSheet(): XLSX.WorkSheet {
  const headerCount = BATCH_IMPORT_COLUMNS.length;

  // Row 1: section banners — values only at the start of each merge range.
  const sectionRow: string[] = new Array(headerCount).fill("");
  for (const s of SECTION_HEADERS) sectionRow[s.startCol] = s.label;

  // Row 2: column headers.
  const headerRow = [...BATCH_IMPORT_COLUMNS] as string[];

  // Rows 3+: example rows mapped into the column order.
  const exampleArr = EXAMPLE_ROWS.map((row) =>
    BATCH_IMPORT_COLUMNS.map((col) => row[col] ?? ""),
  );

  const ws = XLSX.utils.aoa_to_sheet([sectionRow, headerRow, ...exampleArr]);

  // Merge the section banners across their column ranges.
  ws["!merges"] = SECTION_HEADERS.map((s) => ({
    s: { r: 0, c: s.startCol },
    e: { r: 0, c: s.endCol },
  }));

  // Sensible column widths so headers fit and content isn't cramped.
  ws["!cols"] = BATCH_IMPORT_COLUMNS.map((header) => {
    if (header.includes("URL")) return { wch: 32 };
    if (header === "人選介紹" || header === "備註") return { wch: 28 };
    if (header === "標籤" || header === "主要受眾年齡層") return { wch: 18 };
    if (header === "Email") return { wch: 22 };
    return { wch: Math.max(12, header.length + 4) };
  });

  return ws;
}

function buildInstructionsSheet(): XLSX.WorkSheet {
  const rows: (string | number)[][] = [
    ["KOL 批量匯入範本 — 填寫說明"],
    [""],
    ["1. 資料填寫位置：請於「KOL 資料」分頁，從第 3 列開始填寫，每位 KOL 一列。前 2 列為範例，可保留參考或直接覆寫。"],
    ["2. 必填欄位：「KOL名稱」為必填，未填寫的列會被略過。"],
    ["3. 下拉選單：「性別」、「請款方式」、「主要受眾年齡層」欄位已內建下拉清單，建議直接從清單選取。"],
    ["4. 多選欄位：「主要受眾年齡層」可填寫多個區間，以半形逗號分隔（例：18-24,25-34）。"],
    ["5. 標籤格式：可使用半形逗號、全形逗號或頓號分隔多個標籤（例：美妝, 保養、旅遊）。"],
    ["6. 社群平台：未經營的平台可留空，URL 與粉絲數成對填寫。"],
    [""],
    ["欄位", "可選值 / 格式"],
    ["性別", GENDER_OPTIONS.join(" / ")],
    ["請款方式", PAYMENT_METHOD_OPTIONS.join(" / ")],
    ["平台 (社群平台欄組)", PLATFORM_OPTIONS.join(" / ") + "（範本內建 IG / YT / TT / FB 四欄組）"],
    ["主要受眾年齡層", AUDIENCE_AGE_OPTIONS.join(" / ") + "（可多選，逗號分隔）"],
    ["年齡", "0–120 之間的整數"],
    ["受眾性別比 男(%) / 女(%)", "0–100 的整數，建議男+女=100"],
    ["Instagram / YouTube / TikTok / Facebook URL", "完整網址，例：https://www.instagram.com/username"],
    ["粉絲數 / 訂閱數", "正整數，未經營者填 0 或留空"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [{ wch: 32 }, { wch: 60 }];
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    ...rows.slice(1, 9).map((_, i) => ({
      s: { r: i + 1, c: 0 },
      e: { r: i + 1, c: 1 },
    })),
  ];
  return ws;
}

function buildFreezePaneXml(freezeRows: number): string {
  const topLeft = `A${freezeRows + 1}`;
  return (
    `<sheetViews><sheetView tabSelected="1" workbookViewId="0">` +
    `<pane ySplit="${freezeRows}" topLeftCell="${topLeft}" activePane="bottomLeft" state="frozen"/>` +
    `<selection pane="bottomLeft" activeCell="${topLeft}" sqref="${topLeft}"/>` +
    `</sheetView></sheetViews>`
  );
}

function buildDataValidationsXml(
  validations: Array<{ sqref: string; allowed: readonly string[] }>,
): string {
  if (validations.length === 0) return "";
  const inner = validations
    .map((v) => {
      // Escape XML special chars in option list (defensive — values are ASCII/CJK).
      const list = v.allowed
        .map((x) =>
          x
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;"),
        )
        .join(",");
      return (
        `<dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1" ` +
        `errorTitle="無效的選項" error="請從下拉選單中選擇有效的值。" sqref="${v.sqref}">` +
        `<formula1>"${list}"</formula1>` +
        `</dataValidation>`
      );
    })
    .join("");
  return `<dataValidations count="${validations.length}">${inner}</dataValidations>`;
}

function injectExtras(buffer: Buffer): Buffer {
  const zip = new AdmZip(buffer);
  const entryName = "xl/worksheets/sheet1.xml";
  const entry = zip.getEntry(entryName);
  if (!entry) return buffer;

  let xml = entry.getData().toString("utf8");

  // Replace the default sheetViews with one that has frozen rows 1-2.
  const freezeXml = buildFreezePaneXml(2);
  xml = xml.replace(/<sheetViews>[\s\S]*?<\/sheetViews>/, freezeXml);

  // Build dropdown validations. Data starts at row 3; cap at row 1000.
  const colLetter = (i: number) => XLSX.utils.encode_col(i);
  const validationsXml = buildDataValidationsXml([
    {
      sqref: `${colLetter(COL_INDEX.gender)}3:${colLetter(COL_INDEX.gender)}1000`,
      allowed: GENDER_OPTIONS,
    },
    {
      sqref: `${colLetter(COL_INDEX.paymentMethod)}3:${colLetter(COL_INDEX.paymentMethod)}1000`,
      allowed: PAYMENT_METHOD_OPTIONS,
    },
    {
      sqref: `${colLetter(COL_INDEX.audienceAge)}3:${colLetter(COL_INDEX.audienceAge)}1000`,
      allowed: AUDIENCE_AGE_OPTIONS,
    },
  ]);

  // dataValidations must appear before any later element per the ECMA-376
  // CT_Worksheet schema order. xlsx CE may emit <ignoredErrors>, which the
  // schema places after dataValidations — so we insert before the first
  // candidate found.
  if (validationsXml) {
    const successors = [
      "<hyperlinks",
      "<printOptions",
      "<pageMargins",
      "<pageSetup",
      "<headerFooter",
      "<rowBreaks",
      "<colBreaks",
      "<customProperties",
      "<cellWatches",
      "<ignoredErrors",
      "<smartTags",
      "<drawing",
      "<legacyDrawing",
      "<picture",
      "<oleObjects",
      "<controls",
      "<webPublishItems",
      "<tableParts",
      "<extLst",
    ];
    let insertAt = -1;
    for (const tag of successors) {
      const idx = xml.indexOf(tag);
      if (idx !== -1 && (insertAt === -1 || idx < insertAt)) insertAt = idx;
    }
    if (insertAt === -1) insertAt = xml.indexOf("</worksheet>");
    if (insertAt !== -1) {
      xml = xml.slice(0, insertAt) + validationsXml + xml.slice(insertAt);
    }
  }

  zip.updateFile(entryName, Buffer.from(xml, "utf8"));
  return zip.toBuffer();
}

export function buildTemplateBuffer(): Buffer {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, buildDataSheet(), "KOL 資料");
  XLSX.utils.book_append_sheet(wb, buildInstructionsSheet(), "填寫說明");

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  return injectExtras(buffer);
}
