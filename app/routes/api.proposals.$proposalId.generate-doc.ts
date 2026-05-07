import { type LoaderFunctionArgs } from "@remix-run/node";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getProposal, listProposalKols } from "~/lib/mock-api.server";

const TEMPLATES = {
  contract: "kol-contract.docx",
  io: "kol-insertion-order.docx",
} as const;

type DocType = keyof typeof TEMPLATES;

function renderTemplate(templateFile: string, data: Record<string, unknown>): Buffer {
  const templatePath = path.resolve(process.cwd(), "docs", "templates", templateFile);
  const content = readFileSync(templatePath, "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => "",
  });
  doc.render(data);
  return doc.toBuffer();
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const proposalId = params.proposalId ?? "";
  const url = new URL(request.url);
  const type = url.searchParams.get("type") as DocType | null;
  const candidateId = url.searchParams.get("candidateId");
  const startDateRaw = url.searchParams.get("startDate");
  const endDateRaw = url.searchParams.get("endDate");

  if (!type || !candidateId) {
    return new Response("Missing type or candidateId", { status: 400 });
  }
  if (type !== "contract" && type !== "io") {
    return new Response("Invalid type", { status: 400 });
  }

  const isoDateRe = /^\d{4}-\d{2}-\d{2}$/;
  if (!startDateRaw || !endDateRaw || !isoDateRe.test(startDateRaw) || !isoDateRe.test(endDateRaw)) {
    return new Response("Missing or invalid startDate / endDate (expect YYYY-MM-DD)", { status: 400 });
  }
  const startDate = new Date(`${startDateRaw}T00:00:00`);
  const endDate = new Date(`${endDateRaw}T00:00:00`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < startDate) {
    return new Response("Invalid date range", { status: 400 });
  }

  const to = <T,>(p: Promise<T>) =>
    Promise.race([p, new Promise<never>((_, r) => setTimeout(() => r(new Error("timeout")), 8000))]);
  const [proposal, candidates] = await Promise.all([
    to(getProposal(proposalId)),
    to(listProposalKols(proposalId)),
  ]).catch(() => [null, []] as [null, never[]]);

  if (!proposal) return new Response("Proposal not found", { status: 404 });

  const candidate = candidates.find((c) => c.id === candidateId);
  if (!candidate) return new Response("Candidate not found", { status: 404 });
  if (candidate.status !== "accepted") {
    return new Response("Only accepted candidates can generate documents", { status: 400 });
  }

  const fee = candidate.actualPrice ?? candidate.price ?? 0;
  const tax = Math.round(fee * 0.05);
  const feeWithTax = fee + tax;

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const datePieces = (d: Date) => {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return {
      year: String(y),
      month: String(m),
      day: String(day),
      monthZ: pad(m),
      dayZ: pad(day),
      formatted: `${y}/${pad(m)}/${pad(day)}`,
      rocYear: String(y - 1911),
    };
  };
  const start = datePieces(startDate);
  const end = datePieces(endDate);
  const today = datePieces(now);

  const data: Record<string, string> = {
    kolName: candidate.kolName,
    clientName: proposal.clientName ?? "",
    proposalTitle: proposal.title,
    role: candidate.role || "",
    fee: fee.toLocaleString("zh-TW"),
    tax: tax.toLocaleString("zh-TW"),
    feeWithTax: feeWithTax.toLocaleString("zh-TW"),

    // 合作起始日
    startYear: start.year,
    startMonth: start.month,
    startDay: start.day,
    startMonthZ: start.monthZ,
    startDayZ: start.dayZ,
    startDate: start.formatted,

    // 合作結束日
    endYear: end.year,
    endMonth: end.month,
    endDay: end.day,
    endMonthZ: end.monthZ,
    endDayZ: end.dayZ,
    endDate: end.formatted,

    // 文件產出日(今日)
    today: today.formatted,
    todayYear: today.year,
    todayMonth: today.month,
    todayDay: today.day,
    todayRocYear: today.rocYear,
  };

  let buffer: Buffer;
  try {
    buffer = renderTemplate(TEMPLATES[type], data);
  } catch (err) {
    console.error("[generate-doc] template render failed", err);
    return new Response("Template render failed", { status: 500 });
  }

  const safe = (s: string) => s.replace(/[^a-zA-Z0-9一-龥]/g, "_");
  const filename =
    type === "contract"
      ? `KOL合約_${safe(proposal.title)}_${safe(candidate.kolName)}.docx`
      : `KOL委刊單_${safe(proposal.title)}_${safe(candidate.kolName)}.docx`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
