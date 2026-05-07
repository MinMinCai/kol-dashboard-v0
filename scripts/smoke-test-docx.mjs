// Smoke test: confirm docxtemplater can read the unedited templates.
// Templates have no placeholders yet, so render should produce identical output.
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const templates = ["kol-contract.docx", "kol-insertion-order.docx"];
const data = {
  kolName: "蔡英文",
  clientName: "範例客戶股份有限公司",
  proposalTitle: "範例提案 2026 Q2",
  role: "影音 + 文章",
  fee: "100,000",
  tax: "5,000",
  feeWithTax: "105,000",

  startYear: "2026", startMonth: "5", startDay: "6",
  startMonthZ: "05", startDayZ: "06", startDate: "2026/05/06",

  endYear: "2026", endMonth: "6", endDay: "30",
  endMonthZ: "06", endDayZ: "30", endDate: "2026/06/30",

  today: "2026/05/06",
  todayYear: "2026", todayMonth: "5", todayDay: "6",
  todayRocYear: "115",
};

mkdirSync("tmp", { recursive: true });

for (const file of templates) {
  const templatePath = path.resolve("docs", "templates", file);
  const content = readFileSync(templatePath, "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => "",
  });
  doc.render(data);
  const outPath = path.resolve("tmp", `rendered-${file}`);
  writeFileSync(outPath, doc.toBuffer());
  console.log(`OK: ${file} -> ${outPath}`);
}
