import {
  Alert,
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
  Textarea,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import {
  addProposalKol,
  createProposal,
  listFavoriteFolders,
  listKols,
  type Kol,
} from "~/lib/mock-api.server";

type FolderKol = Pick<
  Kol,
  "id" | "displayName" | "engagementRate" | "exposureRate" | "favoriteFolder" | "favoriteFolders" | "followers" | "averagePrice" | "rating" | "realFollowerRatio"
>;

type ImportRow = {
  kolId: string;
  kolName: string;
  role: string;
  price: number;
  actualPrice?: number;
  realFollowerRatio?: number;
  reputationScore?: number;
  avgEngagementRate?: number;
  engagementIndex?: number;
  engagementScore?: number;
  brandFitScore?: number;
  qualityScore?: number;
  cpfr?: number;
  recommendation: string;
};

function toNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toOptionalNumber(value: unknown) {
  if (value === "" || value == null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function seededRandom(seed: string, min: number, max: number, decimals = 1): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  const t = Math.abs(h) / 2147483647;
  return Number((min + t * (max - min)).toFixed(decimals));
}

function buildCandidateFromKol(kol: FolderKol, folderName: string): ImportRow {
  const followerBase = Math.max(kol.followers ?? 0, 1);
  const estimatedPrice = kol.averagePrice ?? 0;
  const avgEngagementRate = kol.engagementRate ?? seededRandom(kol.id + "aer", 1.5, 8);
  const engagementIndex = seededRandom(kol.id + "ei", 0.8, 2.5, 2);
  const engagementScore = seededRandom(kol.id + "es", 5, 9.5);
  const brandFitScore = seededRandom(kol.id + "bfs", 5, 9.5);
  const qualityScore = seededRandom(kol.id + "qs", 60, 95);

  return {
    kolId: kol.id,
    kolName: kol.displayName,
    role: "待定",
    price: estimatedPrice,
    actualPrice: undefined,
    realFollowerRatio: kol.realFollowerRatio ?? seededRandom(kol.id + "rfr", 60, 98),
    reputationScore: kol.rating ?? seededRandom(kol.id + "rep", 5, 9.5),
    avgEngagementRate,
    engagementIndex,
    engagementScore,
    brandFitScore,
    qualityScore,
    cpfr: Number((estimatedPrice / followerBase).toFixed(4)),
    recommendation: `從收藏夾「${folderName}」匯入，初步評估可納入提案名單。`,
  };
}

const numericInputWidth = 110;

export async function loader(_: LoaderFunctionArgs) {
  const [allKols, savedFolders] = await Promise.all([
    listKols().catch(() => [] as Kol[]),
    listFavoriteFolders(),
  ]);
  const favorites = allKols.filter((k) => k.isFavorite);
  const usedFolders = favorites.flatMap((r) => r.favoriteFolders ?? (r.favoriteFolder ? [r.favoriteFolder] : []));
  const folderSet = new Set([...savedFolders, ...usedFolders]);
  const folders = Array.from(folderSet);
  const folderKols: Record<string, FolderKol[]> = {};
  for (const f of folders) {
    folderKols[f] = favorites
      .filter((k) => (k.favoriteFolders ?? []).includes(f) || k.favoriteFolder === f)
      .map(({ id, displayName, engagementRate, exposureRate, favoriteFolder, favoriteFolders, followers, averagePrice, rating, realFollowerRatio }) => ({
        id,
        displayName,
        engagementRate,
        exposureRate,
        favoriteFolder,
        favoriteFolders,
        followers,
        averagePrice,
        rating,
        realFollowerRatio,
      }));
  }
  const allKolOptions = allKols.map((kol) => ({
    value: kol.id,
    label: kol.displayName,
    followers: kol.followers,
    averagePrice: kol.averagePrice,
    rating: kol.rating,
    engagementRate: kol.engagementRate,
    realFollowerRatio: kol.realFollowerRatio,
  }));
  return json({ folders, folderKols, allKolOptions });
}

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

  let candidates: ImportRow[] = [];
  try {
    candidates = JSON.parse(candidatesRaw) as ImportRow[];
  } catch {
    candidates = [];
  }

  await Promise.all(
    candidates.map((c) =>
      addProposalKol({
        proposalId: proposal.id,
        kolId: c.kolId,
        kolName: c.kolName,
        price: c.price,
        actualPrice: c.actualPrice,
        role: c.role,
        reason: c.recommendation,
        realFollowerRatio: c.realFollowerRatio,
        reputationScore: c.reputationScore,
        avgEngagementRate: c.avgEngagementRate,
        engagementIndex: c.engagementIndex,
        engagementScore: c.engagementScore,
        brandFitScore: c.brandFitScore,
        qualityScore: c.qualityScore,
        cpfr: c.cpfr,
        recommendation: c.recommendation,
      }).catch(() => null),
    ),
  );

  return redirect(`/proposals/${proposal.id}`);
}

export default function ProposalCreatePage() {
  const { folders, folderKols, allKolOptions } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<ImportRow[]>([]);
  const [isEditingCandidates, setIsEditingCandidates] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [manualKolId, setManualKolId] = useState<string | null>(null);
  const [manualCandidate, setManualCandidate] = useState<Omit<ImportRow, "kolId" | "kolName">>({
    role: "待定",
    price: 0,
    actualPrice: undefined,
    realFollowerRatio: undefined,
    reputationScore: undefined,
    avgEngagementRate: undefined,
    engagementIndex: undefined,
    engagementScore: undefined,
    brandFitScore: undefined,
    qualityScore: undefined,
    cpfr: undefined,
    recommendation: "",
  });

  useEffect(() => {
    if (!selectedFolder) {
      setCandidates([]);
      return;
    }

    setCandidates((folderKols[selectedFolder] ?? []).map((kol) => buildCandidateFromKol(kol, selectedFolder)));
  }, [folderKols, selectedFolder]);

  const manualSelectedKol = useMemo(
    () => allKolOptions.find((option) => option.value === manualKolId) ?? null,
    [allKolOptions, manualKolId],
  );

  useEffect(() => {
    if (!manualSelectedKol) return;
    setManualCandidate({
      role: "待定",
      price: 0,
      actualPrice: undefined,
      realFollowerRatio: manualSelectedKol.realFollowerRatio,
      reputationScore: undefined,
      avgEngagementRate: undefined,
      engagementIndex: undefined,
      engagementScore: undefined,
      brandFitScore: undefined,
      qualityScore: undefined,
      cpfr: undefined,
      recommendation: "",
    });
  }, [manualSelectedKol]);

  const updateCandidate = (index: number, patch: Partial<ImportRow>) => {
    setCandidates((prev) =>
      prev.map((candidate, candidateIndex) => {
        if (candidateIndex !== index) return candidate;
        const next = { ...candidate, ...patch };
        return next;
      }),
    );
  };

  const addManualCandidate = () => {
    if (!manualSelectedKol) return;
    setCandidates((prev) => [
      ...prev,
      {
        kolId: manualSelectedKol.value,
        kolName: manualSelectedKol.label,
        ...manualCandidate,
      },
    ]);
    setAddModalOpen(false);
    setManualKolId(null);
  };

  const tableInputStyle = { width: numericInputWidth };

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

            <Box>
              <Title order={4} mb="sm">從收藏夾匯入 KOL 名單</Title>
              {folders.length === 0 ? (
                <Text size="sm" c="dimmed">尚無收藏資料夾，請先至<Link to="/favorites"> 收藏頁 </Link>建立資料夾</Text>
              ) : (
                <Stack gap="xs">
                  <Select
                    placeholder="選擇收藏資料夾"
                    data={folders.map((folderName) => ({ value: folderName, label: `${folderName} (${folderKols[folderName]?.length ?? 0} 人)` }))}
                    value={selectedFolder}
                    onChange={setSelectedFolder}
                    clearable
                  />
                  {selectedFolder && candidates.length > 0 && (
                    <Text size="sm" c="dimmed">已匯入 {candidates.length} 位 KOL 作為候選人，可先編輯後再建立提案。</Text>
                  )}
                  {selectedFolder && candidates.length === 0 && (
                    <Text size="sm" c="dimmed">此資料夾尚無 KOL</Text>
                  )}
                </Stack>
              )}
            </Box>

            <Divider />

            <Box>
              <Group justify="space-between" mb="sm">
                <Stack gap={2}>
                  <Title order={4}>預覽候選人名單 ({candidates.length} 筆)</Title>
                  <Text size="sm" c="dimmed">可先調整合作條件與評估指標，再建立正式提案。</Text>
                </Stack>
                <Group gap="xs">
                  <Button variant="light" onClick={() => setIsEditingCandidates((prev) => !prev)}>
                    {isEditingCandidates ? "完成編輯" : "編輯"}
                  </Button>
                  <Button onClick={() => setAddModalOpen(true)}>新增 KOL 候選人</Button>
                </Group>
              </Group>

              {candidates.length === 0 ? (
                <Card withBorder>
                  <Text size="sm" c="dimmed">尚未加入候選人，請先從收藏夾匯入或手動新增。</Text>
                </Card>
              ) : (
                <ScrollArea>
                  <Table withColumnBorders withRowBorders striped style={{ minWidth: 2200 }}>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>KOL 名稱</Table.Th>
                        <Table.Th>合作項目</Table.Th>
                        <Table.Th>預估報價</Table.Th>
                        <Table.Th>實際報價</Table.Th>
                        <Table.Th>真粉比例</Table.Th>
                        <Table.Th>KOL 名聲</Table.Th>
                        <Table.Th>平均互動率</Table.Th>
                        <Table.Th>互動率 index</Table.Th>
                        <Table.Th>互動率評分</Table.Th>
                        <Table.Th>品牌適配度</Table.Th>
                        <Table.Th>綜合品質分數</Table.Th>
                        <Table.Th>CPFR</Table.Th>
                        <Table.Th>KOL 選擇建議</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {candidates.map((candidate, index) => (
                        <Table.Tr key={`${candidate.kolId || candidate.kolName}-${index}`}>
                          <Table.Td>{candidate.kolName}</Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput value={candidate.role} onChange={(event) => updateCandidate(index, { role: event.currentTarget.value })} />
                            ) : candidate.role}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.price} onChange={(event) => updateCandidate(index, { price: toNumber(event.currentTarget.value) })} />
                            ) : `$${candidate.price.toLocaleString("zh-TW")}`}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.actualPrice ?? ""} onChange={(event) => updateCandidate(index, { actualPrice: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.actualPrice != null ? `$${candidate.actualPrice.toLocaleString("zh-TW")}` : "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.realFollowerRatio ?? ""} onChange={(event) => updateCandidate(index, { realFollowerRatio: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.realFollowerRatio != null ? `${candidate.realFollowerRatio}%` : "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.reputationScore ?? ""} onChange={(event) => updateCandidate(index, { reputationScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.reputationScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.avgEngagementRate ?? ""} onChange={(event) => updateCandidate(index, { avgEngagementRate: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.avgEngagementRate != null ? `${candidate.avgEngagementRate}%` : "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.engagementIndex ?? ""} onChange={(event) => updateCandidate(index, { engagementIndex: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.engagementIndex ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.engagementScore ?? ""} onChange={(event) => updateCandidate(index, { engagementScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.engagementScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.brandFitScore ?? ""} onChange={(event) => updateCandidate(index, { brandFitScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.brandFitScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.qualityScore ?? ""} onChange={(event) => updateCandidate(index, { qualityScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.qualityScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput style={tableInputStyle} value={candidate.cpfr ?? ""} onChange={(event) => updateCandidate(index, { cpfr: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.cpfr ?? "-"}
                          </Table.Td>
                          <Table.Td style={{ minWidth: 240 }}>
                            {isEditingCandidates ? (
                              <Textarea autosize minRows={2} value={candidate.recommendation} onChange={(event) => updateCandidate(index, { recommendation: event.currentTarget.value })} />
                            ) : (
                              <Text size="sm">{candidate.recommendation}</Text>
                            )}
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              )}
            </Box>

            {actionData?.error && <Alert color="red">{actionData.error}</Alert>}

            <Group justify="flex-end">
              <Button variant="default" component={Link} to="/proposals">取消</Button>
              <Button type="submit">建立提案{candidates.length > 0 ? ` (含 ${candidates.length} 位候選人)` : ""}</Button>
            </Group>
          </Stack>
        </Form>
      </Card>

      <Modal opened={addModalOpen} onClose={() => setAddModalOpen(false)} title="新增 KOL 候選人" size="lg">
        <Stack gap="md">
          <Select
            label="選擇 KOL"
            placeholder="請選擇 KOL"
            data={allKolOptions}
            value={manualKolId}
            onChange={setManualKolId}
            searchable
          />
          <Group grow>
            <TextInput label="合作項目" value={manualCandidate.role} onChange={(event) => setManualCandidate((prev) => ({ ...prev, role: event.currentTarget.value }))} />
            <TextInput label="預估報價" value={manualCandidate.price} onChange={(event) => setManualCandidate((prev) => ({ ...prev, price: toNumber(event.currentTarget.value) }))} />
            <TextInput label="實際報價" value={manualCandidate.actualPrice ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, actualPrice: toOptionalNumber(event.currentTarget.value) }))} />
          </Group>
          <Group grow>
            <TextInput
              label="真粉比例"
              value={manualCandidate.realFollowerRatio != null ? `${manualCandidate.realFollowerRatio}%` : "-"}
              readOnly
              styles={{ input: { background: "var(--mantine-color-default-hover)", cursor: "default" } }}
            />
            <TextInput label="KOL 名聲" value={manualCandidate.reputationScore ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, reputationScore: toOptionalNumber(event.currentTarget.value) }))} />
            <TextInput label="平均互動率" value={manualCandidate.avgEngagementRate ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, avgEngagementRate: toOptionalNumber(event.currentTarget.value) }))} />
          </Group>
          <Group grow>
            <TextInput label="互動率 index" value={manualCandidate.engagementIndex ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, engagementIndex: toOptionalNumber(event.currentTarget.value) }))} />
            <TextInput label="互動率評分" value={manualCandidate.engagementScore ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, engagementScore: toOptionalNumber(event.currentTarget.value) }))} />
            <TextInput label="品牌適配度" value={manualCandidate.brandFitScore ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, brandFitScore: toOptionalNumber(event.currentTarget.value) }))} />
          </Group>
          <Group grow>
            <TextInput label="綜合品質分數" value={manualCandidate.qualityScore ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, qualityScore: toOptionalNumber(event.currentTarget.value) }))} />
            <TextInput label="CPFR" value={manualCandidate.cpfr ?? ""} onChange={(event) => setManualCandidate((prev) => ({ ...prev, cpfr: toOptionalNumber(event.currentTarget.value) }))} />
          </Group>
          <Textarea
            label="KOL 選擇建議"
            minRows={3}
            value={manualCandidate.recommendation}
            onChange={(event) => setManualCandidate((prev) => ({ ...prev, recommendation: event.currentTarget.value }))}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setAddModalOpen(false)}>取消</Button>
            <Button onClick={addManualCandidate} disabled={!manualSelectedKol}>加入候選名單</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
