import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import AdmZip from "adm-zip";
import { getKol, type InsertionOrder, type OrderKolCollaboration, type OrderPerformanceItem, type Report } from "./mock-api.server";

const MAX_REPORT_KOLS = 10;
const ASSET_DOWNLOAD_TIMEOUT_MS = 1500;

type MediaAsset = {
  extension: string;
  fileName: string;
  relId: string;
};

type SlideDefinition = {
  slideNo: number;
  title: string;
  relId: string;
};

type EnrichedKol = OrderKolCollaboration & {
  followerCount?: number;
  primaryLink?: string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sanitizeFileName(value: string): string {
  return value.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_").trim() || "結案報告";
}

function normalizePptxName(value: string): string {
  const sanitized = sanitizeFileName(value).replace(/\.pptx$/i, "");
  return `${sanitized}.pptx`;
}

function formatDateLabel(value?: string): string {
  if (!value) return new Date().toISOString().slice(0, 10).replaceAll("-", ".");
  return value.slice(0, 10).replaceAll("-", ".");
}

function formatShortDate(value?: string): string {
  if (!value) return "-";
  const normalized = value.slice(5, 10).replace("-", "/");
  return normalized || "-";
}

function formatNumber(value?: number | null): string {
  if (value == null || Number.isNaN(value)) return "-";
  return Math.round(value).toLocaleString("zh-TW");
}

function formatPercent(value?: number | null): string {
  if (value == null || Number.isNaN(value)) return "-";
  return `${value.toFixed(1)}%`;
}

function buildProjectTitle(order: InsertionOrder): string {
  const primary = order.brand || order.clientName || "未命名品牌";
  const secondary = order.title || order.projectName || order.orderNo || "結案報告";
  return `${primary} ${secondary}`.trim();
}

function buildSummaryText(order: InsertionOrder, selectedKols: EnrichedKol[]): string {
  const totalReach = selectedKols.reduce((sum, kol) => sum + (kol.totalReach || 0), 0);
  const totalEngagement = selectedKols.reduce((sum, kol) => sum + (kol.totalEngagement || 0), 0);
  const engagementRate = totalReach > 0 ? ((totalEngagement / totalReach) * 100).toFixed(2) : "0.00";
  const kolNames = selectedKols.map((kol) => kol.name || "未命名 KOL").join("、") || "尚未指定 KOL";
  return [
    `${order.clientName || "客戶"}《${order.title || order.projectName || order.orderNo}》結案摘要。`,
    `本次納入報告的 KOL 共 ${selectedKols.length} 位：${kolNames}。`,
    `累積觸及 ${totalReach.toLocaleString()}、互動 ${totalEngagement.toLocaleString()}，整體互動率 ${engagementRate}%。`,
    `本報告已依各 KOL 上刊截圖、成效截圖與互動數據自動整理，可直接提供團隊後續編修與對客說明。`,
  ].join("");
}

function buildMetricSummary(item: OrderPerformanceItem | undefined, kol: EnrichedKol): string {
  if (!item?.metrics) {
    return `${kol.name || "此位 KOL"} 目前尚無可帶入的成效數據。`;
  }
  const { impressions, reach, likes, comments, shares, saves, engagementRate } = item.metrics;
  return [
    `${item.title || "成效摘要"}`,
    `曝光 ${formatNumber(impressions)} / 觸及 ${formatNumber(reach)}`,
    `按讚 ${formatNumber(likes)} / 留言 ${formatNumber(comments)}`,
    `分享 ${formatNumber(shares)} / 收藏 ${formatNumber(saves)}`,
    `互動率 ${formatPercent(engagementRate)}`,
  ].join("  ");
}

function resolvePlatformLabel(item: OrderPerformanceItem | undefined, kol: EnrichedKol): string {
  const title = item?.title || "";
  if (/youtube/i.test(title)) return "YouTube";
  if (/tiktok/i.test(title)) return "TikTok";
  if (/facebook/i.test(title)) return "Facebook";
  if (/ig|instagram/i.test(title)) return "Instagram";
  if (kol.socialLinks?.youtube) return "YouTube";
  if (kol.socialLinks?.tiktok) return "TikTok";
  if ((kol.socialLinks as any)?.facebook) return "Facebook";
  return "Instagram";
}

function isStoryItem(item: OrderPerformanceItem | undefined): boolean {
  return /限時|限動|story/i.test(item?.title || "");
}

function pickPostItem(kol: EnrichedKol): OrderPerformanceItem | undefined {
  return (kol.performanceItems ?? []).find((item) => !isStoryItem(item)) ?? kol.performanceItems?.[0];
}

function pickStoryItem(kol: EnrichedKol): OrderPerformanceItem | undefined {
  return (kol.performanceItems ?? []).find((item) => isStoryItem(item));
}

function getBestImageUrls(item: OrderPerformanceItem | undefined, kind: "thumbnail" | "metric"): string[] {
  if (!item) return [];
  const source = kind === "thumbnail" ? item.thumbnails ?? [] : item.performanceScreenshots ?? [];
  return source.filter(Boolean);
}

function replaceCoverDate(xml: string, dateLabel: string): string {
  const dateTokens = dateLabel.split(".");
  if (dateTokens.length !== 3) return xml;
  return xml.replace(
    /(<a:t>結案報告 <\/a:t><\/a:r>)([\s\S]*?)(<a:endParaRPr lang="en-US" sz="1400" b="1" dirty="0">)/,
    (_, prefix: string, __: string, suffix: string) =>
      `${prefix}<a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>${escapeXml(dateTokens[0])}</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>.</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>${escapeXml(dateTokens[1])}</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>.</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>${escapeXml(dateTokens[2])}</a:t></a:r>${suffix}`,
  );
}

function createPictureXml(params: {
  shapeId: number;
  relId: string;
  name: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
}): string {
  const { shapeId, relId, name, x, y, cx, cy } = params;
  return `<p:pic><p:nvPicPr><p:cNvPr id="${shapeId}" name="${escapeXml(name)}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="${relId}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:ln><a:noFill/></a:ln></p:spPr></p:pic>`;
}

function createTextBoxXml(params: {
  shapeId: number;
  text: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
  fontSize?: number;
}): string {
  const { shapeId, text, x, y, cx, cy, fontSize = 1200 } = params;
  const paragraphs = text
    .split(/\n+/)
    .map(
      (line) =>
        `<a:p><a:pPr marL="0" indent="0"/><a:r><a:rPr lang="zh-TW" altLang="en-US" sz="${fontSize}" dirty="0"><a:latin typeface="微軟正黑體"/><a:ea typeface="微軟正黑體"/></a:rPr><a:t>${escapeXml(line)}</a:t></a:r></a:p>`,
    )
    .join("");
  return `<p:sp><p:nvSpPr><p:cNvPr id="${shapeId}" name="文字方塊 ${shapeId}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr><p:txBody><a:bodyPr wrap="square"><a:spAutoFit/></a:bodyPr><a:lstStyle/>${paragraphs}</p:txBody></p:sp>`;
}

function buildSlideRels(imageAssets: MediaAsset[]): string {
  const imageRels = imageAssets
    .map(
      (asset) =>
        `<Relationship Id="${asset.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${asset.fileName}"/>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout2.xml"/>${imageRels}</Relationships>`;
}

function buildLayout3SlideRels(imageAssets: MediaAsset[]): string {
  const imageRels = imageAssets
    .map(
      (asset) =>
        `<Relationship Id="${asset.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${asset.fileName}"/>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout3.xml"/>${imageRels}</Relationships>`;
}

function injectIntoSpTree(xml: string, content: string): string {
  return xml.replace("</p:spTree>", `${content}</p:spTree>`);
}

function updateSlideTitle(raw: string, title: string): string {
  return raw.replace(/KOL_[ABC]名稱/g, escapeXml(title)).replace(/KOL_[ABC]/g, escapeXml(title));
}

function buildShowcaseSlide(raw: string, kol: EnrichedKol, imageAssets: MediaAsset[]): string {
  const positions = [
    { x: 523257, y: 1863598, cx: 5147062, cy: 3836960 },
    { x: 5975118, y: 1866255, cx: 1771066, cy: 3836960 },
    { x: 7961710, y: 1868913, cx: 1771066, cy: 3836960 },
    { x: 9978281, y: 1866255, cx: 1771066, cy: 3836960 },
  ];
  const pics = imageAssets
    .map((asset, index) =>
      createPictureXml({
        shapeId: 200 + index,
        relId: asset.relId,
        name: `${kol.name}-showcase-${index + 1}`,
        ...positions[Math.min(index, positions.length - 1)],
      }),
    )
    .join("");
  return injectIntoSpTree(updateSlideTitle(raw, kol.name || "未命名 KOL"), pics);
}

function buildMetricSlide(raw: string, kol: EnrichedKol, title: string, imageAssets: MediaAsset[], summary: string): string {
  const positions = [
    { x: 2317343, y: 1001166, cx: 2449351, cy: 5325206 },
    { x: 4999208, y: 1001166, cx: 2449351, cy: 5325206 },
    { x: 7681071, y: 1001166, cx: 2449351, cy: 5325206 },
  ];
  const pics = imageAssets
    .map((asset, index) =>
      createPictureXml({
        shapeId: 300 + index,
        relId: asset.relId,
        name: `${kol.name}-${title}-${index + 1}`,
        ...positions[Math.min(index, positions.length - 1)],
      }),
    )
    .join("");
  const metricText = createTextBoxXml({
    shapeId: 399,
    text: summary,
    x: 700000,
    y: 6180000,
    cx: 10800000,
    cy: 420000,
    fontSize: 1200,
  });
  return injectIntoSpTree(updateSlideTitle(raw, kol.name || "未命名 KOL"), `${pics}${metricText}`);
}

function buildTableCell(value: string, bold = false): string {
  return `<a:tc><a:txBody><a:bodyPr/><a:lstStyle/><a:p><a:pPr algn="ctr" rtl="0" fontAlgn="ctr"/><a:r><a:rPr lang="zh-TW" altLang="en-US" sz="1200"${bold ? ' b="1"' : ""} dirty="0"><a:solidFill><a:schemeClr val="tx1"><a:lumMod val="65000"/><a:lumOff val="35000"/></a:schemeClr></a:solidFill><a:latin typeface="微軟正黑體"/><a:ea typeface="微軟正黑體"/></a:rPr><a:t>${escapeXml(value)}</a:t></a:r></a:p></a:txBody><a:tcPr marL="6714" marR="6714" marT="4476" marB="4476" anchor="ctr"/></a:tc>`;
}

function buildOverviewRow(kol: EnrichedKol, item: OrderPerformanceItem | undefined, index: number): string {
  const metrics = item?.metrics ?? {};
  return `<a:tr h="731520">${[
    buildTableCell(kol.name || `KOL ${index + 1}`),
    buildTableCell(formatShortDate(kol.uploadDate || kol.executionDate)),
    buildTableCell(resolvePlatformLabel(item, kol)),
    buildTableCell(kol.primaryLink ? "已帶入" : "-"),
    buildTableCell(formatNumber(kol.followerCount)),
    buildTableCell(formatNumber(metrics.likes)),
    buildTableCell(formatNumber(metrics.comments)),
    buildTableCell(formatNumber(metrics.shares)),
    buildTableCell(formatNumber(metrics.saves)),
    buildTableCell(formatNumber(metrics.impressions)),
    buildTableCell(formatPercent(metrics.engagementRate), true),
    buildTableCell(formatNumber(metrics.reach)),
  ].join("")}</a:tr>`;
}

function buildOverviewSlide(raw: string, title: string, rangeLabel: string, rows: string): string {
  let next = raw.replace(/成效總覽-貼文|成效總覽-限動/g, escapeXml(title));
  next = next.replace(/<a:t>2025\/11\/05-2025\/12\/01<\/a:t>/g, `<a:t>${escapeXml(rangeLabel)}</a:t>`);
  next = next.replace(/<a:tr h="731520">[\s\S]*?<\/a:tr><a:tr h="731520">[\s\S]*?<\/a:tr><a:tr h="731520">[\s\S]*?<\/a:tr><\/a:tbl>/, `${rows}</a:tbl>`);
  return next;
}

function updateSummarySlide(raw: string, order: InsertionOrder, summary: string): string {
  return raw
    .replaceAll("合作心得- KOL Team", `合作心得- ${escapeXml(order.clientName || "專案團隊")}`)
    .replaceAll(
      "這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得",
      escapeXml(summary),
    );
}


export function resolveReportTemplatePath(templateKey?: string): string {
  const templateFile = "fake結案報告.pptx";
  if (templateKey === "standard" || templateKey === "simple" || templateKey === "none" || !templateKey) {
    return path.resolve(process.cwd(), "docs", "assets", templateFile);
  }
  return path.resolve(process.cwd(), "docs", "assets", templateFile);
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadImageAsset(
  _workDir: string,
  mediaDir: string,
  url: string,
  relId: string,
  sequence: number,
): Promise<MediaAsset | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ASSET_DOWNLOAD_TIMEOUT_MS);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") ?? "";
    const extension = contentType.includes("png") ? "png" : contentType.includes("svg") ? "svg" : "jpg";
    const fileName = `generated_${sequence}.${extension}`;
    const targetPath = path.join(mediaDir, fileName);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(targetPath, buffer);
    return { extension, fileName, relId };
  } catch {
    return null;
  }
}

async function enrichSelectedKols(order: InsertionOrder, selectedKolIds?: string[]): Promise<EnrichedKol[]> {
  const selectedSet = new Set((selectedKolIds ?? []).filter(Boolean));
  const raw = (order.collaborations ?? []).filter((kol) => selectedSet.size === 0 || selectedSet.has(kol.id)).slice(0, MAX_REPORT_KOLS);
  const enriched = await Promise.all(
    raw.map(async (kol) => {
      const detail = kol.kolId
        ? await Promise.race([
            getKol(kol.kolId),
            new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
          ]).catch(() => null)
        : null;
      const primaryLink =
        kol.socialLinks?.instagram ||
        kol.socialLinks?.youtube ||
        kol.socialLinks?.tiktok ||
        (kol.socialLinks as any)?.facebook ||
        detail?.socialLinks?.instagram ||
        detail?.socialLinks?.youtube ||
        detail?.socialLinks?.tiktok ||
        detail?.socialLinks?.facebook;
      const followerCount =
        detail?.followers ||
        detail?.social?.instagram ||
        detail?.social?.youtube ||
        detail?.social?.tiktok ||
        detail?.social?.facebook;
      return {
        ...kol,
        primaryLink,
        followerCount,
      };
    }),
  );
  return enriched;
}

async function writeGeneratedKolSlides(params: {
  extractDir: string;
  mediaDir: string;
  selectedKols: EnrichedKol[];
}): Promise<SlideDefinition[]> {
  const { extractDir, mediaDir, selectedKols } = params;
  const slideDir = path.join(extractDir, "ppt", "slides");
  const slideRelsDir = path.join(slideDir, "_rels");
  const templateShowcase = await readFile(path.join(slideDir, "slide3.xml"), "utf8");
  const templatePost = await readFile(path.join(slideDir, "slide4.xml"), "utf8");
  const templateStory = await readFile(path.join(slideDir, "slide5.xml"), "utf8");
  // Pre-assign slide numbers and media sequence offsets so KOLs can be processed in parallel
  const PER_KOL_SLIDES = 3;
  const PER_KOL_IMAGES = 10; // max images per KOL (4 showcase + 3 post + 3 story)

  const kolResults = await Promise.all(
    selectedKols.map(async (kol, kolIndex) => {
      const baseSlideNo = 17 + kolIndex * PER_KOL_SLIDES;
      const baseRelNo = 30 + kolIndex * PER_KOL_SLIDES;
      const baseMediaSeq = 1 + kolIndex * PER_KOL_IMAGES;

      const postItem = pickPostItem(kol);
      const storyItem = pickStoryItem(kol) ?? postItem;

      const showcaseAssets = (
        await Promise.all(
          getBestImageUrls(postItem, "thumbnail")
            .concat(getBestImageUrls(storyItem, "thumbnail"))
            .slice(0, 4)
            .map((url, index) => downloadImageAsset(extractDir, mediaDir, url, `rId${index + 2}`, baseMediaSeq + index)),
        )
      ).filter(Boolean) as MediaAsset[];
      const postAssets = (
        await Promise.all(
          getBestImageUrls(postItem, "metric")
            .slice(0, 3)
            .map((url, index) => downloadImageAsset(extractDir, mediaDir, url, `rId${index + 2}`, baseMediaSeq + 4 + index)),
        )
      ).filter(Boolean) as MediaAsset[];
      const storyAssets = (
        await Promise.all(
          getBestImageUrls(storyItem, "metric")
            .slice(0, 3)
            .map((url, index) => downloadImageAsset(extractDir, mediaDir, url, `rId${index + 2}`, baseMediaSeq + 7 + index)),
        )
      ).filter(Boolean) as MediaAsset[];

      return { kol, baseSlideNo, baseRelNo, showcaseAssets, postAssets, storyAssets, postItem, storyItem };
    }),
  );

  const slides: SlideDefinition[] = [];
  for (const { kol, baseSlideNo, baseRelNo, showcaseAssets, postAssets, storyAssets, postItem, storyItem } of kolResults) {
    const showcaseXml = buildShowcaseSlide(templateShowcase, kol, showcaseAssets);
    await writeFile(path.join(slideDir, `slide${baseSlideNo}.xml`), showcaseXml, "utf8");
    await writeFile(path.join(slideRelsDir, `slide${baseSlideNo}.xml.rels`), buildSlideRels(showcaseAssets), "utf8");
    slides.push({ slideNo: baseSlideNo, title: `${kol.name}-上刊截圖`, relId: `rId${baseRelNo}` });

    const postXml = buildMetricSlide(templatePost, kol, "貼文成效數據截圖", postAssets, buildMetricSummary(postItem, kol));
    await writeFile(path.join(slideDir, `slide${baseSlideNo + 1}.xml`), postXml, "utf8");
    await writeFile(path.join(slideRelsDir, `slide${baseSlideNo + 1}.xml.rels`), buildLayout3SlideRels(postAssets), "utf8");
    slides.push({ slideNo: baseSlideNo + 1, title: `${kol.name}-貼文成效數據截圖`, relId: `rId${baseRelNo + 1}` });

    const storyXml = buildMetricSlide(templateStory, kol, "限動成效數據截圖", storyAssets, buildMetricSummary(storyItem, kol));
    await writeFile(path.join(slideDir, `slide${baseSlideNo + 2}.xml`), storyXml, "utf8");
    await writeFile(path.join(slideRelsDir, `slide${baseSlideNo + 2}.xml.rels`), buildLayout3SlideRels(storyAssets), "utf8");
    slides.push({ slideNo: baseSlideNo + 2, title: `${kol.name}-限動成效數據截圖`, relId: `rId${baseRelNo + 2}` });
  }

  return slides;
}

async function updateFixedSlides(extractDir: string, order: InsertionOrder, selectedKols: EnrichedKol[]) {
  const slideDir = path.join(extractDir, "ppt", "slides");
  const coverPath = path.join(slideDir, "slide1.xml");
  const overviewPostPath = path.join(slideDir, "slide12.xml");
  const overviewStoryPath = path.join(slideDir, "slide13.xml");
  const summaryPath = path.join(slideDir, "slide15.xml");
  const projectTitle = buildProjectTitle(order);
  const dateLabel = formatDateLabel(order.endDate || order.startDate);
  const rangeLabel = `${(order.startDate || "").replaceAll("-", "/")}~${(order.endDate || "").replaceAll("-", "/")}`.replace("~", "-");
  const summaryText = buildSummaryText(order, selectedKols);

  const coverRaw = await readFile(coverPath, "utf8");
  const nextCover = replaceCoverDate(coverRaw.replaceAll("品牌名 產品名", escapeXml(projectTitle)), dateLabel);
  await writeFile(coverPath, nextCover, "utf8");

  const overviewPostRaw = await readFile(overviewPostPath, "utf8");
  const overviewStoryRaw = await readFile(overviewStoryPath, "utf8");
  const overviewPostRows = selectedKols.map((kol, index) => buildOverviewRow(kol, pickPostItem(kol), index)).join("");
  const overviewStoryRows = selectedKols.map((kol, index) => buildOverviewRow(kol, pickStoryItem(kol), index)).join("");
  await writeFile(overviewPostPath, buildOverviewSlide(overviewPostRaw, "成效總覽-貼文", rangeLabel, overviewPostRows), "utf8");
  await writeFile(overviewStoryPath, buildOverviewSlide(overviewStoryRaw, "成效總覽-限動", rangeLabel, overviewStoryRows), "utf8");

  const summaryRaw = await readFile(summaryPath, "utf8");
  await writeFile(summaryPath, updateSummarySlide(summaryRaw, order, summaryText), "utf8");
}

async function rewritePresentationFiles(extractDir: string, generatedSlides: SlideDefinition[], selectedKols: EnrichedKol[]) {
  const presentationPath = path.join(extractDir, "ppt", "presentation.xml");
  const relsPath = path.join(extractDir, "ppt", "_rels", "presentation.xml.rels");
  const contentTypesPath = path.join(extractDir, "[Content_Types].xml");
  const appPropsPath = path.join(extractDir, "docProps", "app.xml");

  const basePresentation = await readFile(presentationPath, "utf8");
  const baseRels = await readFile(relsPath, "utf8");
  const baseContentTypes = await readFile(contentTypesPath, "utf8");
  const baseAppProps = await readFile(appPropsPath, "utf8");

  const staticSlides: SlideDefinition[] = [
    { slideNo: 1, title: "封面", relId: "rId2" },
    { slideNo: 2, title: "KOL成效數據", relId: "rId3" },
    ...generatedSlides,
    { slideNo: 12, title: "成效總覽-貼文", relId: `rId${30 + generatedSlides.length}` },
    { slideNo: 13, title: "成效總覽-限動", relId: `rId${31 + generatedSlides.length}` },
    { slideNo: 15, title: `合作心得- ${selectedKols.length}位KOL`, relId: `rId${32 + generatedSlides.length}` },
  ];

  const slideIdListXml = staticSlides
    .map((slide, index) => `<p:sldId id="${400 + index}" r:id="${slide.relId}"/>`)
    .join("");
  const nextPresentation = basePresentation.replace(/<p:sldIdLst>[\s\S]*?<\/p:sldIdLst>/, `<p:sldIdLst>${slideIdListXml}</p:sldIdLst>`);
  await writeFile(presentationPath, nextPresentation, "utf8");

  const preservedRels = Array.from(baseRels.matchAll(/<Relationship Id="(rId1|rId18|rId19|rId20|rId21|rId22|rId23|rId24|rId25)"[\s\S]*?\/>/g))
    .map((match) => match[0])
    .join("");
  const slideRelsXml = staticSlides
    .map(
      (slide) =>
        `<Relationship Id="${slide.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${slide.slideNo}.xml"/>`,
    )
    .join("");
  await writeFile(
    relsPath,
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${slideRelsXml}${preservedRels}</Relationships>`,
    "utf8",
  );

  const existingOverrides = new Set(Array.from(baseContentTypes.matchAll(/PartName="(\/ppt\/slides\/slide\d+\.xml)"/g)).map((match) => match[1]));
  let nextContentTypes = baseContentTypes;
  for (const slide of generatedSlides) {
    const partName = `/ppt/slides/slide${slide.slideNo}.xml`;
    if (!existingOverrides.has(partName)) {
      nextContentTypes = nextContentTypes.replace(
        "</Types>",
        `<Override PartName="${partName}" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/></Types>`,
      );
    }
  }
  await writeFile(contentTypesPath, nextContentTypes, "utf8");

  const reportSlideCount = staticSlides.length;
  const titles = [
    "微軟正黑體",
    "Arial",
    "Calibri",
    "2024_DAC_temp_new",
    ...staticSlides.map((slide) => slide.title),
    "PowerPoint 簡報",
  ];
  const titleXml = titles.map((title) => `<vt:lpstr>${escapeXml(title)}</vt:lpstr>`).join("");
  const nextAppProps = baseAppProps
    .replace(/<Slides>\d+<\/Slides>/, `<Slides>${reportSlideCount}</Slides>`)
    .replace(/<vt:variant><vt:lpstr>投影片標題<\/vt:lpstr><\/vt:variant><vt:variant><vt:i4>\d+<\/vt:i4><\/vt:variant>/, `<vt:variant><vt:lpstr>投影片標題</vt:lpstr></vt:variant><vt:variant><vt:i4>${reportSlideCount}</vt:i4></vt:variant>`)
    .replace(/<vt:vector size="\d+" baseType="lpstr">[\s\S]*?<\/vt:vector>/, `<vt:vector size="${titles.length}" baseType="lpstr">${titleXml}</vt:vector>`);
  await writeFile(appPropsPath, nextAppProps, "utf8");
}

export async function generateReportPpt(params: {
  order: InsertionOrder;
  report: Pick<Report, "id" | "name" | "templateKey" | "selectedKolIds" | "reportTitle">;
}): Promise<string> {
  const { order, report } = params;
  const templatePath = resolveReportTemplatePath(report.templateKey);
  const workRoot = path.resolve(process.cwd(), "tmp", "generated_reports", report.id);
  const extractDir = path.join(workRoot, "template");
  const mediaDir = path.join(extractDir, "ppt", "media");
  const outputPath = path.join(workRoot, normalizePptxName(report.name || report.reportTitle || "結案報告"));
  const selectedKols = await enrichSelectedKols(order, report.selectedKolIds);

  await rm(workRoot, { recursive: true, force: true });
  await mkdir(extractDir, { recursive: true });

  // Extract template PPTX using adm-zip (no PowerShell needed)
  const zip = new AdmZip(templatePath);
  zip.extractAllTo(extractDir, true);

  await mkdir(mediaDir, { recursive: true });

  const generatedSlides = await writeGeneratedKolSlides({ extractDir, mediaDir, selectedKols });
  await updateFixedSlides(extractDir, order, selectedKols);
  await rewritePresentationFiles(extractDir, generatedSlides, selectedKols);

  // Re-pack directory back into a PPTX zip using adm-zip
  const outZip = new AdmZip();
  outZip.addLocalFolder(extractDir);
  outZip.writeZip(outputPath);

  return outputPath;
}
