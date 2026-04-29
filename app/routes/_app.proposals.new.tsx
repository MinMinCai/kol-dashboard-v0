import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
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
  listFavoriteFolders,
  listKols,
  type Kol,
} from "~/lib/mock-api.server";

// ─── Loader: provide available favorite folders ───────────────────────────────
export async function loader(_: LoaderFunctionArgs) {
  const [allKols, savedFolders] = await Promise.all([
    listKols().catch(() => [] as Kol[]),
    listFavoriteFolders(),
  ]);
  const favorites = allKols.filter((k) => k.isFavorite);
  const usedFolders = favorites.map((r) => r.favoriteFolder).filter(Boolean) as string[];
  const folderSet = new Set([...savedFolders, ...usedFolders]);
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

type ImportRow = {
  kolName: string;
  role: string;
  price: number;
  reason: string;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProposalCreatePage() {
  const { folders, folderKols } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const candidates: ImportRow[] = selectedFolder
    ? (folderKols[selectedFolder] ?? []).map((k) => ({
        kolName: k.displayName,
        role: "待定",
        price: 0,
        reason: `從收藏夾「${selectedFolder}」匯入`,
      }))
    : [];

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>提案建檔頁</Title>
        <Link to="/proposals">回提案一覽</Link>
      </Group>

      <Card withBorder>
        <Form method="post">
          <input type="hidden" name="candidatesJson" value={JSON.stringify(candidates)} />
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
                  {selectedFolder && candidates.length > 0 && (
                    <Text size="sm" c="dimmed">將匯入 {candidates.length} 位 KOL 作為候選人</Text>
                  )}
                  {selectedFolder && candidates.length === 0 && (
                    <Text size="sm" c="dimmed">此資料夾尚無 KOL</Text>
                  )}
                </Stack>
              )}
            </Box>

            {/* ── Preview ── */}
            {candidates.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Title order={4} mb="sm">預覽候選人名單 ({candidates.length} 筆)</Title>
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
                        {candidates.map((c, i) => (
                          <Table.Tr key={i}>
                            <Table.Td>{c.kolName}</Table.Td>
                            <Table.Td>{c.role}</Table.Td>
                            <Table.Td>${c.price.toLocaleString("zh-TW")}</Table.Td>
                            <Table.Td><Text size="xs" lineClamp={2}>{c.reason}</Text></Table.Td>
                            <Table.Td>
                              <Badge size="xs" variant="light" color="blue">收藏夾</Badge>
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
              <Button type="submit">建立提案{candidates.length > 0 ? ` (含 ${candidates.length} 位候選人)` : ""}</Button>
            </Group>
          </Stack>
        </Form>
      </Card>
    </Stack>
  );
}
