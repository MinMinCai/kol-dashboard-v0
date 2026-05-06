import { type LoaderFunctionArgs } from "@remix-run/node";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  TableLayoutType,
} from "docx";
import { getProposal, listProposalKols } from "~/lib/mock-api.server";

// Generate KOL Contract (合約)
function buildContract(
  proposalTitle: string,
  clientName: string,
  kol: { kolName: string; role: string; price: number; actualPrice?: number },
): Document {
  const fee = kol.actualPrice ?? kol.price;
  const today = new Date().toLocaleDateString("zh-TW");

  const bold = (text: string) => new TextRun({ text, bold: true });
  const normal = (text: string) => new TextRun({ text });
  const br = () => new Paragraph({});

  return new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `【${kol.kolName} x ${clientName}】行銷合作合約`, bold: true, size: 28 })],
          }),
          br(),
          new Paragraph({ children: [bold("【立約人】")] }),
          new Paragraph({ children: [normal("甲方：台灣股份有限公司")] }),
          new Paragraph({ children: [normal(`乙方：${kol.kolName}`)] }),
          br(),
          new Paragraph({
            children: [normal(`甲方為促銷客戶「${clientName}」之商品，委託乙方進行行銷工作。雙方約定條款如下：`)],
          }),
          br(),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold("第一條：乙方定義")] }),
          new Paragraph({
            children: [normal(`雙方確認本案為創作者本人簽約，其對外使用名稱為「${kol.kolName}」。`)],
          }),
          br(),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold("第二條：工作內容")] }),
          new Paragraph({ children: [bold("合作項目："), normal(kol.role || "待定")] }),
          new Paragraph({ children: [bold("合作專案："), normal(proposalTitle)] }),
          new Paragraph({ children: [bold("合作期間："), normal("____年____月____日 起至 ____年____月____日 止")] }),
          br(),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold("第三條：合作報酬")] }),
          new Paragraph({
            children: [
              normal(`本合作報酬總額為：新台幣 `),
              bold(`${fee.toLocaleString("zh-TW")}`),
              normal(` 元整。`),
            ],
          }),
          new Paragraph({ children: [normal("甲方於收到雙方用印合約及乙方回簽勞報單之日之次月末日前向乙方支付報酬。")] }),
          br(),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold("第四條：給付方式")] }),
          new Paragraph({ children: [normal("甲方同意支付報酬至乙方指定銀行帳戶，手續費由甲方負責支付。")] }),
          new Paragraph({ children: [bold("銀行："), normal("____________________")] }),
          new Paragraph({ children: [bold("戶名："), normal("____________________")] }),
          new Paragraph({ children: [bold("帳號："), normal("____________________")] }),
          br(),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold("第五條：創作方向及規範")] }),
          new Paragraph({
            children: [
              normal(
                "甲方同意尊重乙方風格進行本合作內容創作，但乙方創作方向應參照甲方及甲方客戶提供之商品資訊及合作要點說明。"
                + "合作內容上線前，應先經甲方及甲方客戶確認核可。",
              ),
            ],
          }),
          br(),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold("第六條：雙方權利與義務")] }),
          new Paragraph({ children: [bold("6.1 智慧財產權："), normal("本合作內容之著作權及智慧財產權歸乙方所有。")] }),
          new Paragraph({
            children: [
              bold("6.2 保密義務："),
              normal("乙方因本合約之履行而知悉之甲方及甲方客戶資訊，未經甲方事前書面同意，不得洩漏予任何第三人。"),
            ],
          }),
          br(),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold("第七條：其他事項")] }),
          new Paragraph({
            children: [
              normal(
                "本合約涉訟時，雙方合意以台灣台北地方法院為第一審管轄法院。"
                + "本合約書一式兩份，雙方各持一份為憑。",
              ),
            ],
          }),
          br(),
          br(),
          new Paragraph({ children: [bold("（簽署頁）")] }),
          br(),
          new Table({
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [bold("甲方簽章：")] }),
                      br(),
                      new Paragraph({ children: [normal("台灣股份有限公司")] }),
                      br(),
                      new Paragraph({ children: [normal(`日期：${today}`)] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [bold("乙方簽章：")] }),
                      br(),
                      new Paragraph({ children: [normal(kol.kolName)] }),
                      br(),
                      new Paragraph({ children: [normal("日期：____年____月____日")] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });
}

// Generate KOL Insertion Order (委刊單)
function buildInsertionOrder(
  proposalTitle: string,
  clientName: string,
  kol: { kolName: string; role: string; price: number; actualPrice?: number },
): Document {
  const fee = kol.actualPrice ?? kol.price;
  const tax = Math.round(fee * 0.05);
  const feeWithTax = fee + tax;
  const today = new Date().toLocaleDateString("zh-TW");

  const bold = (text: string) => new TextRun({ text, bold: true });
  const normal = (text: string) => new TextRun({ text });
  const br = () => new Paragraph({});

  const cellBorder = {
    top: { style: BorderStyle.SINGLE, size: 1 },
    bottom: { style: BorderStyle.SINGLE, size: 1 },
    left: { style: BorderStyle.SINGLE, size: 1 },
    right: { style: BorderStyle.SINGLE, size: 1 },
  };

  return new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "台股份有限公司 委刊單 / Proforma Invoice", bold: true, size: 28 })],
          }),
          br(),
          new Paragraph({ children: [bold("專案名稱："), normal(`${kol.kolName} x ${clientName} 行銷合作`)] }),
          new Paragraph({ children: [bold("委刊單編號："), normal("____________________")] }),
          br(),
          // Party info table
          new Table({
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorder,
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [bold("甲方："), normal("台股份有限公司")] }),
                      new Paragraph({ children: [bold("聯絡人："), normal("____________________")] }),
                      new Paragraph({ children: [bold("聯絡電話："), normal("____________________")] }),
                      new Paragraph({ children: [bold("地址："), normal("____________________")] }),
                      new Paragraph({ children: [bold("統一編號："), normal("____________________")] }),
                    ],
                  }),
                  new TableCell({
                    borders: cellBorder,
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [bold("乙方："), normal(kol.kolName)] }),
                      new Paragraph({ children: [bold("公司/負責人："), normal("____________________")] }),
                      new Paragraph({ children: [bold("聯絡電話："), normal("____________________")] }),
                      new Paragraph({ children: [bold("地址："), normal("____________________")] }),
                      new Paragraph({ children: [bold("統一編號："), normal("____________________")] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          br(),
          // Items table
          new Table({
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: ["合作項目", "數量", "費用", "期間", "備註"].map(
                  (h) =>
                    new TableCell({
                      borders: cellBorder,
                      children: [new Paragraph({ children: [bold(h)] })],
                    }),
                ),
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorder, children: [new Paragraph({ children: [normal(kol.role || "待定")] })] }),
                  new TableCell({ borders: cellBorder, children: [new Paragraph({ children: [normal("1")] })] }),
                  new TableCell({ borders: cellBorder, children: [new Paragraph({ children: [normal(`NT$ ${fee.toLocaleString("zh-TW")}`)] })] }),
                  new TableCell({ borders: cellBorder, children: [new Paragraph({ children: [normal("____年____月")] })] }),
                  new TableCell({ borders: cellBorder, children: [new Paragraph({ children: [normal("")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorder, columnSpan: 2, children: [new Paragraph({ children: [bold("總計（未稅）")] })] }),
                  new TableCell({ borders: cellBorder, columnSpan: 3, children: [new Paragraph({ children: [normal(`NT$ ${fee.toLocaleString("zh-TW")}`)] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorder, columnSpan: 2, children: [new Paragraph({ children: [bold("稅額（5%）")] })] }),
                  new TableCell({ borders: cellBorder, columnSpan: 3, children: [new Paragraph({ children: [normal(`NT$ ${tax.toLocaleString("zh-TW")}`)] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorder, columnSpan: 2, children: [new Paragraph({ children: [bold("總計（含稅）")] })] }),
                  new TableCell({ borders: cellBorder, columnSpan: 3, children: [new Paragraph({ children: [normal(`NT$ ${feeWithTax.toLocaleString("zh-TW")}`)] })] }),
                ],
              }),
            ],
          }),
          br(),
          new Paragraph({ children: [bold("備註：")] }),
          new Paragraph({
            children: [
              bold("付款條件："),
              normal("銀行匯款至乙方指定帳戶，手續費由甲方負責支付。"),
            ],
          }),
          new Paragraph({
            children: [
              bold("付款期限："),
              normal("乙方應開立發票給甲方請款，甲方於收到雙方用印委刊單及發票後，於本合作上線次月最後工作日前向乙方支付報酬。"),
            ],
          }),
          br(),
          new Paragraph({ children: [bold("付款資訊：")] }),
          new Paragraph({ children: [normal("銀行名稱：____ ｜ 代號：____ ｜ 戶名：______ ｜ 帳號：________")] }),
          br(),
          new Paragraph({ children: [bold("約定條款：")] }),
          new Paragraph({
            children: [
              normal(
                "本委刊單視同正式合約，本委刊單之傳真或影本，皆視同正式文件。"
                + "乙方提供合作內容上線後的後台成效數據。"
                + "本委刊單合作授權範圍之未記載事項，以雙方溝通書面文件、Email往來內容及LINE或Messenger等通訊軟體之對話紀錄為準。",
              ),
            ],
          }),
          br(),
          br(),
          new Table({
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorder,
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [bold("甲方簽章：")] }),
                      br(),
                      new Paragraph({ children: [normal("台股份有限公司")] }),
                      br(),
                      new Paragraph({ children: [normal(`日期：${today}`)] }),
                    ],
                  }),
                  new TableCell({
                    borders: cellBorder,
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [bold("乙方簽章：")] }),
                      br(),
                      new Paragraph({ children: [normal(kol.kolName)] }),
                      br(),
                      new Paragraph({ children: [normal("日期：____年____月____日")] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const proposalId = params.proposalId ?? "";
  const url = new URL(request.url);
  const type = url.searchParams.get("type"); // "contract" | "io"
  const candidateId = url.searchParams.get("candidateId");

  if (!type || !candidateId) {
    return new Response("Missing type or candidateId", { status: 400 });
  }

  if (type !== "contract" && type !== "io") {
    return new Response("Invalid type", { status: 400 });
  }

  const to = <T,>(p: Promise<T>) => Promise.race([p, new Promise<never>((_, r) => setTimeout(() => r(new Error("timeout")), 8000))]);
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

  const kol = {
    kolName: candidate.kolName,
    role: candidate.role,
    price: candidate.price ?? 0,
    actualPrice: candidate.actualPrice,
  };

  const doc =
    type === "contract"
      ? buildContract(proposal.title, proposal.clientName ?? "客戶", kol)
      : buildInsertionOrder(proposal.title, proposal.clientName ?? "客戶", kol);

  const buffer = await Packer.toBuffer(doc);
  const safeKolName = kol.kolName.replace(/[^a-zA-Z0-9一-龥]/g, "_");
  const safeProposalTitle = proposal.title.replace(/[^a-zA-Z0-9一-龥]/g, "_");
  const filename =
    type === "contract"
      ? `KOL合約_${safeProposalTitle}_${safeKolName}.docx`
      : `KOL委刊單_${safeProposalTitle}_${safeKolName}.docx`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
