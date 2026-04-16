import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  addProposalKol,
  createProposal,
  listKols,
  type Kol,
} from "~/lib/mock-api.server";

// ─── Loader: provide available favorite folders ───────────────────────────────
export async function loader(_: LoaderFunctionArgs) {
  const allKols = await listKols().catch(() => [] as Kol[]);
  const favorites = allKols.filter((k) => k.isFavorite);
  const fromRows = favorites.map((r) => r.favoriteFolder).filter(Boolean) as string[];
  const folderSet = new Set(["家電專案", "美妝專案", ...fromRows]);
  const folders = Array.from(folderSet);
  const folderKols: Record<string, Pick<Kol, "id" | "displayName" | "engagementRate" | "exposureRate" | "favoriteFolder">[]> = {};
  for (const f of folders) {
    folderKols[f] = favorites
      .filter((k) => (k.favoriteFolder ?? "未分類") === f)
      .map(({ id, displayName, engagementRate, exposureRate, favoriteFolder }) => ({ id, displayName, engagementRate, exposureRate, favoriteFolder }));
  }
  return json({ folders, folderKols });
}

// ─── Action ───────────────────────────────────────────────────────────────────
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim();
  const budget = Number(formData.get("budget") ?? 0);
  const dueDate = String(formData.get("dueDate") ?? "").trim();
  const candidatesRaw = String(formData.get("candidatesJson") ?? "[]");

  if (!title || !clientName) {
    return json({ error: "標題與客戶為必填" }, { status: 400 });
  }

  const proposal = await createProposal({ title, clientName, budget, dueDate: dueDate || "TBD", stage: "draft" });

  // Batch-add candidates if any
  let candidates: Array<{ kolName: string; role: string; price: number; reason: string }> = [];
  try { candidates = JSON.parse(candidatesRaw); } catch { candidates = []; }
  await Promise.all(
    candidates.map((c) =>
      addProposalKol({
        proposalId: proposal.id,
        kolId: "",
        kolName: c.kolName,
        price: c.price,
        role: c.role,
        reason: c.reason,
      }).catch(() => null)
    )
  );

  return redirect(`/proposals/${proposal.id}`);
}

// ─── Excel row type ───────────────────────────────────────────────────────────
type ImportRow = {
  kolName: string;
  role: string;
  price: number;
  reason: string;
};
type ImportError = { row: number; field: string; value: string; message: string };

function validateImportRows(raw: Record<string, unknown>[]): { valid: ImportRow[]; errors: ImportError[] } {
  const valid: ImportRow[] = [];
  const errors: ImportError[] = [];
  raw.forEach((row, idx) => {
    const rowNum = idx + 2; // 1-indexed, skipping header
    const kolName = String(row["KOL 名稱"] ?? row["kol_name"] ?? row["名稱"] ?? "").trim();
    const role = String(row["合作項目"] ?? row["role"] ?? row["Role"] ?? "").trim();
    const priceRaw = String(row["預估報價"] ?? row["price"] ?? row["Price"] ?? "0").replace(/,/g, "");
    const reason = String(row["推薦理由"] ?? row["reason"] ?? row["Reason"] ?? "").trim();
    const price = Number(priceRaw);

    if (!kolName) { errors.push({ row: rowNum, field: "KOL 名稱", value: String(row["KOL 名稱"] ?? ""), message: "必填欄位為空" }); return; }
    if (!role) { errors.push({ row: rowNum, field: "合作項目", value: String(row["合作項目"] ?? ""), message: "必填欄位為空" }); }
    if (isNaN(price) || price < 0) { errors.push({ row: rowNum, field: "預估報價", value: priceRaw, message: "必須為非負數字" }); }

    if (kolName) {
      valid.push({ kolName, role: role || "待定", price: isNaN(price) ? 0 : price, reason });
    }
  });
  return { valid, errors };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProposalCreatePage() {
  const { folders, folderKols } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  // Folder import state
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const folderCandidates: ImportRow[] = selectedFolder
    ? (folderKols[selectedFolder] ?? []).map((k) => ({
        kolName: k.displayName,
        role: "待定",
        price: 0,
        reason: `從收藏夾「${selectedFolder}」匯入`,
      }))
    : [];

  // Excel import state
  const [excelCandidates, setExcelCandidates] = useState<ImportRow[]>([]);
  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);

  // Merge: folder + excel (dedup by name)
  const allCandidates: ImportRow[] = [
    ...folderCandidates,
    ...excelCandidates.filter((e) => !folderCandidates.some((f) => f.kolName === e.kolName)),
  ];

  const handleExcelFile = async (file: File) => {
    setImporting(true);
    try {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws);
      const { valid, errors } = validateImportRows(raw);
      setExcelCandidates(valid);
      setImportErrors(errors);
      if (errors.length > 0) setErrorModalOpen(true);
    } catch {
      setImportErrors([{ row: 0, field: "檔案", value: file.name, message: "無法解析檔案，請確認格式正確" }]);
      setErrorModalOpen(true);
    } finally {
      setImporting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    const XLSX = await import("xlsx");
    const template = [{ "KOL 名稱": "範例 KOL", "合作項目": "IG 貼文", "預估報價": 10000, "推薦理由": "與品牌調性契合" }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "KOL名單");
    XLSX.writeFile(wb, "KOL批量匯入範本.xlsx");
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>提案建檔頁</Title>
        <Link to="/proposals">回提案一覽</Link>
      </Group>

      <Card withBorder>
        <Form method="post">
          <input type="hidden" name="candidatesJson" value={JSON.stringify(allCandidates)} />
          <Stack gap="lg">
            {/* ── Basic Info ── */}
            <Box>
              <Title order={4} mb="sm">基本資料</Title>
              <Stack gap="sm">
                <TextInput name="title" label="提案標題" required />
                <TextInput name="clientName" label="客戶名稱" required />
                <TextInput name="budget" label="預算" defaultValue="0" />
                <TextInput name="dueDate" label="截止日" placeholder="2026-03-20" />
              </Stack>
            </Box>

            <Divider />

            {/* ── Folder Import ── */}
            <Box>
              <Title order={4} mb="sm">從收藏夾匯入 KOL 名單</Title>
              {folders.length === 0 ? (
                <Text size="sm" c="dimmed">尚無收藏資料夾，請先至<Link to="/favorites"> 收藏頁 </Link>建立資料夾</Text>
              ) : (
                <Stack gap="xs">
                  <Select
                    placeholder="選擇收藏資料夾"
                    data={folders.map((f) => ({ value: f, label: `${f} (${folderKols[f]?.length ?? 0} 人)` }))}
                    value={selectedFolder}
                    onChange={setSelectedFolder}
                    clearable
                  />
                  {selectedFolder && folderCandidates.length > 0 && (
                    <Text size="sm" c="dimmed">將匯入 {folderCandidates.length} 位 KOL 作為候選人</Text>
                  )}
                  {selectedFolder && folderCandidates.length === 0 && (
                    <Text size="sm" c="dimmed">此資料夾尚無 KOL</Text>
                  )}
                </Stack>
              )}
            </Box>

            <Divider />

            {/* ── Excel Bulk Import ── */}
            <Box>
              <Group justify="space-between" mb="sm">
                <Title order={4}>Excel 批量匯入 KOL 候選人</Title>
                <Button variant="subtle" size="xs" onClick={handleDownloadTemplate}>⬇ 下載範本</Button>
              </Group>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">欄位：KOL 名稱（必填）、合作項目、預估報價、推薦理由</Text>
                <label style={{ display: "block" }}>
                  <Text size="sm" fw={500} mb={4}>選擇 Excel 檔案</Text>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    aria-label="上傳 Excel 批量匯入 KOL 候選人"
                    disabled={importing}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleExcelFile(file);
                      e.target.value = "";
                    }}
                  />
                </label>
                {importing && <Text size="sm" c="dimmed">解析中...</Text>}
                {excelCandidates.length > 0 && (
                  <Text size="sm" c="green">已解析 {excelCandidates.length} 筆有效資料</Text>
                )}
              </Stack>
            </Box>

            {/* ── Preview ── */}
            {allCandidates.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Group justify="space-between" mb="sm">
                    <Title order={4}>預覽候選人名單 ({allCandidates.length} 筆)</Title>
                  </Group>
                  <ScrollArea>
                    <Table withColumnBorders withRowBorders>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>KOL 名稱</Table.Th>
                          <Table.Th>合作項目</Table.Th>
                          <Table.Th>預估報價</Table.Th>
                          <Table.Th>推薦理由</Table.Th>
                          <Table.Th>來源</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {allCandidates.map((c, i) => (
                          <Table.Tr key={i}>
                            <Table.Td>{c.kolName}</Table.Td>
                            <Table.Td>{c.role}</Table.Td>
                            <Table.Td>${c.price.toLocaleString("zh-TW")}</Table.Td>
                            <Table.Td><Text size="xs" lineClamp={2}>{c.reason}</Text></Table.Td>
                            <Table.Td>
                              {folderCandidates.some((f) => f.kolName === c.kolName)
                                ? <Badge size="xs" variant="light" color="blue">收藏夾</Badge>
                                : <Badge size="xs" variant="light" color="orange">Excel</Badge>
                              }
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </ScrollArea>
                </Box>
              </>
            )}

            {actionData?.error && <Alert color="red">{actionData.error}</Alert>}

            <Group justify="flex-end">
              <Button variant="default" component={Link} to="/proposals">取消</Button>
              <Button type="submit">建立提案{allCandidates.length > 0 ? ` (含 ${allCandidates.length} 位候選人)` : ""}</Button>
            </Group>
          </Stack>
        </Form>
      </Card>

      {/* ── Error Modal ── */}
      <Modal
        opened={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title={
          <Group gap="xs">
            <Text fw={700} c="red">⚠ 匯入格式錯誤</Text>
            <Badge color="red">{importErrors.length} 筆</Badge>
          </Group>
        }
        size="lg"
      >
        <Stack gap="sm">
          <Text size="sm" c="dimmed">以下資料列有格式錯誤，有效資料仍可繼續使用。請修正後重新上傳。</Text>
          <ScrollArea h={300}>
            <Table withColumnBorders withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: 60 }}>列號</Table.Th>
                  <Table.Th>欄位</Table.Th>
                  <Table.Th>原始值</Table.Th>
                  <Table.Th>錯誤原因</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {importErrors.map((err, i) => (
                  <Table.Tr key={i}>
                    <Table.Td><Badge variant="light" color="red" size="sm">{err.row === 0 ? "-" : `第 ${err.row} 列`}</Badge></Table.Td>
                    <Table.Td>{err.field}</Table.Td>
                    <Table.Td><Text size="xs" c="dimmed">{err.value || "(空)"}</Text></Table.Td>
                    <Table.Td><Text size="sm" c="red">{err.message}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
          {excelCandidates.length > 0 && (
            <Alert color="green" title="有效資料">
              {excelCandidates.length} 筆資料格式正確，將在建立提案時自動加入候選人名單。
            </Alert>
          )}
          <Group justify="flex-end">
            <Button onClick={() => setErrorModalOpen(false)}>了解</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
