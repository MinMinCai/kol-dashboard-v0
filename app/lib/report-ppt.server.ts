import { access, copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { InsertionOrder, Report } from "./mock-api.server";

const execFileAsync = promisify(execFile);
const POWERSHELL_PATH = "C:\\Program Files\\PowerShell\\7\\pwsh.exe";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function escapePowerShellLiteral(value: string): string {
  return value.replaceAll("'", "''");
}

function sanitizeFileName(value: string): string {
  return value.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_").trim() || "結案報告";
}

function formatDateLabel(value?: string): string {
  if (!value) return new Date().toISOString().slice(0, 10).replaceAll("-", ".");
  const normalized = value.slice(0, 10);
  return normalized.replaceAll("-", ".");
}

function buildProjectTitle(order: InsertionOrder): string {
  const primary = order.brand || order.clientName || "未命名品牌";
  const secondary = order.title || order.projectName || order.orderNo || "結案報告";
  return `${primary} ${secondary}`.trim();
}

function buildSummaryText(order: InsertionOrder, selectedKols: Array<NonNullable<InsertionOrder["collaborations"]>[number]>): string {
  const totalReach = selectedKols.reduce((sum, kol) => sum + (kol.totalReach || 0), 0);
  const totalEngagement = selectedKols.reduce((sum, kol) => sum + (kol.totalEngagement || 0), 0);
  const engagementRate = totalReach > 0 ? ((totalEngagement / totalReach) * 100).toFixed(2) : "0.00";
  const kolNames = selectedKols.map((kol) => kol.name || "未命名 KOL").join("、") || "尚未指定 KOL";
  return [
    `${order.clientName || "客戶"}《${order.title || order.projectName || order.orderNo}》結案摘要。`,
    `本次納入報告的 KOL 共 ${selectedKols.length} 位：${kolNames}。`,
    `累積觸及 ${totalReach.toLocaleString()}、互動 ${totalEngagement.toLocaleString()}，整體互動率 ${engagementRate}%。`,
    `建議延續表現較佳的合作形式，作為後續提案與預算配置參考。`,
  ].join("");
}

function replaceKolPlaceholder(xml: string, slot: "A" | "B" | "C", name: string): string {
  const escapedName = escapeXml(name);
  return xml.replace(
    new RegExp(`<a:t>KOL_${slot}<\\/a:t><\\/a:r>([\\s\\S]*?)<a:t>名稱<\\/a:t>`, "g"),
    `<a:t>${escapedName}</a:t></a:r>$1<a:t></a:t>`,
  );
}

function replaceCoverSubtitleDate(xml: string, dateLabel: string): string {
  const dateTokens = dateLabel.split(".");
  if (dateTokens.length !== 3) return xml;

  return xml.replace(
    /(<a:t>結案報告 <\/a:t><\/a:r>)([\s\S]*?)(<a:endParaRPr lang="en-US" sz="1400" b="1" dirty="0">)/,
    (_, prefix: string, __: string, suffix: string) =>
      `${prefix}<a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>${escapeXml(dateTokens[0])}</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>.</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>${escapeXml(dateTokens[1])}</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>.</a:t></a:r><a:r><a:rPr lang="en-US" sz="1400" b="1" dirty="0"><a:solidFill><a:schemeClr val="bg1"><a:lumMod val="50000"/></a:schemeClr></a:solidFill><a:latin typeface="+mj-ea"/><a:cs typeface="Helvetica"/></a:rPr><a:t>${escapeXml(dateTokens[2])}</a:t></a:r>${suffix}`,
  );
}

function applyTemplateData(
  filePath: string,
  order: InsertionOrder,
  selectedKols: Array<NonNullable<InsertionOrder["collaborations"]>[number]>,
): Promise<void> {
  return readFile(filePath, "utf8").then(async (raw) => {
    const projectTitle = buildProjectTitle(order);
    const dateLabel = formatDateLabel(order.endDate || order.startDate);
    const summaryText = buildSummaryText(order, selectedKols);
    const slotNames = [
      selectedKols[0]?.name || "待補 KOL A",
      selectedKols[1]?.name || "待補 KOL B",
      selectedKols[2]?.name || "待補 KOL C",
    ];

    let next = raw.replaceAll("品牌名 產品名", escapeXml(projectTitle));
    next = replaceCoverSubtitleDate(next, dateLabel);
    next = replaceKolPlaceholder(next, "A", slotNames[0]);
    next = replaceKolPlaceholder(next, "B", slotNames[1]);
    next = replaceKolPlaceholder(next, "C", slotNames[2]);
    next = next.replaceAll("KOL_A名稱", escapeXml(slotNames[0]));
    next = next.replaceAll("KOL_B名稱", escapeXml(slotNames[1]));
    next = next.replaceAll("KOL_C名稱", escapeXml(slotNames[2]));
    next = next.replaceAll("合作心得- KOL Team", `合作心得- ${escapeXml(order.clientName || "專案團隊")}`);
    next = next.replaceAll(
      "這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得這邊要寫合作心得",
      escapeXml(summaryText),
    );

    await writeFile(filePath, next, "utf8");
  });
}

async function runPowerShell(command: string) {
  await execFileAsync(POWERSHELL_PATH, ["-NoProfile", "-Command", command], {
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
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

export async function generateReportPpt(params: {
  order: InsertionOrder;
  report: Pick<Report, "id" | "name" | "templateKey" | "selectedKolIds" | "reportTitle">;
}): Promise<string> {
  const { order, report } = params;
  const templatePath = resolveReportTemplatePath(report.templateKey);
  const workRoot = path.resolve(process.cwd(), "tmp", "generated_reports", report.id);
  const extractDir = path.join(workRoot, "template");
  const sourceZip = path.join(workRoot, "source.pptx");
  const outputPath = path.join(workRoot, `${sanitizeFileName(report.name || report.reportTitle || "結案報告")}.pptx`);
  const selectedIdSet = new Set(report.selectedKolIds ?? []);
  const selectedKols = ((order.collaborations ?? []).filter((kol) => selectedIdSet.size === 0 || selectedIdSet.has(kol.id)).slice(0, 3));

  await rm(workRoot, { recursive: true, force: true });
  await mkdir(extractDir, { recursive: true });
  await copyFile(templatePath, sourceZip);

  await runPowerShell(
    `Expand-Archive -LiteralPath '${escapePowerShellLiteral(sourceZip)}' -DestinationPath '${escapePowerShellLiteral(extractDir)}' -Force`,
  );

  const editableFiles = [
    path.join(extractDir, "ppt", "slides", "slide1.xml"),
    path.join(extractDir, "ppt", "slides", "slide3.xml"),
    path.join(extractDir, "ppt", "slides", "slide4.xml"),
    path.join(extractDir, "ppt", "slides", "slide5.xml"),
    path.join(extractDir, "ppt", "slides", "slide6.xml"),
    path.join(extractDir, "ppt", "slides", "slide7.xml"),
    path.join(extractDir, "ppt", "slides", "slide8.xml"),
    path.join(extractDir, "ppt", "slides", "slide9.xml"),
    path.join(extractDir, "ppt", "slides", "slide10.xml"),
    path.join(extractDir, "ppt", "slides", "slide11.xml"),
    path.join(extractDir, "docProps", "app.xml"),
  ];

  await Promise.all(editableFiles.map((file) => applyTemplateData(file, order, selectedKols)));

  if (await fileExists(outputPath)) {
    await rm(outputPath, { force: true });
  }

  await runPowerShell(
    `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${escapePowerShellLiteral(extractDir)}', '${escapePowerShellLiteral(outputPath)}')`,
  );

  return outputPath;
}
