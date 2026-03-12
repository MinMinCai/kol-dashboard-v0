import { json, type LoaderFunctionArgs } from "@remix-run/node";

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const filename = url.searchParams.get("filename") ?? "campaign.pdf";

  const seed = hashString(filename.toLowerCase());
  const clients = ["Panasonic", "Happy Food", "DermaLab", "Aqua Home", "NovaTech"];
  const industries = ["家電", "食品", "美妝", "3C", "母嬰"];
  const salesOwners = ["Amy", "Nina", "Leo"];
  const kolManagers = ["John", "Cindy", "Mia"];

  const client = clients[seed % clients.length];
  const industry = industries[seed % industries.length];

  return json({
    parsed: {
      projectName: `${client} 春季整合推廣`,
      clientName: client,
      brand: client,
      industries: [industry],
      documentUrl: `https://example.com/uploads/${encodeURIComponent(filename)}`,
      salesOwner: salesOwners[seed % salesOwners.length],
      kolManager: kolManagers[seed % kolManagers.length],
      description: `由 ${filename} 解析出的初步專案資訊，請確認欄位是否正確。`,
    },
    detectedFields: 7,
  });
}
