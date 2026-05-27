import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Group,
  Modal,
  NumberInput,
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
  setProposalPermissions,
  type Kol,
} from "~/lib/mock-api.server";
import { getCurrentMember } from "~/lib/demo-identity.server";
import { DEPARTMENTS } from "~/lib/departments";

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

function withTimeout<T>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  promise.catch(() => {});
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
  const [allKols, savedFolders, currentMember] = await Promise.all([
    withTimeout(listKols(), [] as Kol[]).catch(() => [] as Kol[]),
    withTimeout(listFavoriteFolders(), [] as string[]).catch(() => [] as string[]),
    getCurrentMember(request).catch(() => null),
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
  return json({
    folders,
    folderKols,
    allKolOptions,
    currentMember: currentMember ? { id: currentMember.id, name: currentMember.name, group: currentMember.group } : null,
  });
  } catch (err) {
    console.error("[proposals.new] loader unexpected error:", err);
    return json({
      folders: [] as string[],
      folderKols: {} as Record<string, FolderKol[]>,
      allKolOptions: [] as { value: string; label: string; followers: number | undefined; averagePrice: number | undefined; rating: number | undefined; engagementRate: number | undefined; realFollowerRatio: number | undefined }[],
      currentMember: null as { id: string; name: string; group: string | null } | null,
    });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const currentMember = await getCurrentMember(request).catch(() => null);
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim();
  const budget = Number(formData.get("budget") ?? 0);
  const launchMonth = String(formData.get("launchMonth") ?? "").trim();
  const candidatesRaw = String(formData.get("candidatesJson") ?? "[]");
  const permissionsRaw = String(formData.get("permissionsJson") ?? "[]");

  if (!title || !clientName) {
    return json({ error: "標題與客戶為必填" }, { status: 400 });
  }

  const proposal = await createProposal({
    title,
    clientName,
    budget,
    launchMonth: launchMonth || "TBD",
    stage: "draft",
    creatorId: currentMember?.id ?? null,
    creatorName: currentMember?.name ?? null,
  });

  // Set creator's department as edit by default, then merge user-specified permissions
  let extraPerms: { department: string; permissionLevel: "edit" | "view" }[] = [];
  try {
    extraPerms = JSON.parse(permissionsRaw);
  } catch { /* ignore */ }

  if (extraPerms.length > 0) {
    const depts = new Map<string, "edit" | "view">();
    // Creator's department always gets edit
    if (currentMember?.group) depts.set(currentMember.group, "edit");
    for (const p of extraPerms) {
      depts.set(p.department, p.permissionLevel);
    }
    await setProposalPermissions(proposal.id, Array.from(depts.entries()).map(([department, permissionLevel]) => ({ department, permissionLevel })));
  }

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

type DeptPermEntry = { department: string; permissionLevel: "edit" | "view" };

export default function ProposalCreatePage() {
  const { folders, folderKols, allKolOptions, currentMember } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<ImportRow[]>([]);
  const [isEditingCandidates, setIsEditingCandidates] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [manualKolId, setManualKolId] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | string>(0);
  const [launchMonth, setLaunchMonth] = useState("");
  const [deptPerms, setDeptPerms] = useState<DeptPermEntry[]>([]);
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

  // Task 3: Merge folder KOLs with existing candidates instead of replacing
  const handleFolderChange = (folder: string | null) => {
    setSelectedFolder(folder);
    if (!folder) return;

    const incoming = (folderKols[folder] ?? []).map((kol) => buildCandidateFromKol(kol, folder));
    setCandidates((prev) => {
      const existingIds = new Set(prev.map((c) => c.kolId));
      const newOnes = incoming.filter((c) => !existingIds.has(c.kolId));
      const duplicateNames = incoming
        .filter((c) => existingIds.has(c.kolId))
        .map((c) => c.kolName);

      if (duplicateNames.length > 0) {
        setDuplicateWarning(`以下 KOL 已在候選名單中，略過不重複匯入：${duplicateNames.join("、")}`);
      } else {
        setDuplicateWarning(null);
      }

      return [...prev, ...newOnes];
    });
  };

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
        return { ...candidate, ...patch };
      }),
    );
  };

  // Task 4: Remove a candidate by index
  const removeCandidate = (index: number) => {
    setCandidates((prev) => prev.filter((_, i) => i !== index));
  };

  const addManualCandidate = () => {
    if (!manualSelectedKol) return;

    // Task 3: Block duplicate when manually adding
    const isDuplicate = candidates.some((c) => c.kolId === manualSelectedKol.value);
    if (isDuplicate) {
      setDuplicateWarning(`「${manualSelectedKol.label}」已在候選名單中，無法重複加入。`);
      setAddModalOpen(false);
      setManualKolId(null);
      return;
    }

    setCandidates((prev) => [
      ...prev,
      {
        kolId: manualSelectedKol.value,
        kolName: manualSelectedKol.label,
        ...manualCandidate,
      },
    ]);
    setDuplicateWarning(null);
    setAddModalOpen(false);
    setManualKolId(null);
  };

  const dueDateString = launchMonth;

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>提案建檔頁</Title>
        <Link to="/proposals">回提案一覽</Link>
      </Group>

      <Card withBorder>
        <Form method="post">
          <input type="hidden" name="candidatesJson" value={JSON.stringify(candidates)} />
          <input type="hidden" name="budget" value={typeof budget === "number" ? budget : toNumber(budget)} />
          <input type="hidden" name="launchMonth" value={dueDateString} />
          <input type="hidden" name="permissionsJson" value={JSON.stringify(deptPerms)} />
          <Stack gap="lg">
            <Box>
              <Title order={4} mb="sm">基本資料</Title>
              <Stack gap="sm">
                <TextInput name="title" label="案件名稱" required />
                <TextInput name="clientName" label="客戶" required />
                <NumberInput
                  label="總預算"
                  value={budget}
                  onChange={setBudget}
                  thousandSeparator=","
                  prefix="$"
                  min={0}
                  allowNegative={false}
                />
                <TextInput
                  type="month"
                  label="預計上線月份"
                  value={launchMonth}
                  onChange={(e) => setLaunchMonth(e.currentTarget.value)}
                />
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Title order={4} mb="xs">部門權限設定</Title>
              <Text size="sm" c="dimmed" mb="sm">
                不設定則所有人皆可檢視與編輯。你的部門（{currentMember?.group ?? "—"}）預設擁有編輯權限。
              </Text>
              <Stack gap="xs">
                {(DEPARTMENTS as readonly string[])
                  .filter((dept) => dept !== currentMember?.group)
                  .map((dept) => {
                    const entry = deptPerms.find((p) => p.department === dept);
                    return (
                      <Group key={dept} gap="xs" align="center">
                        <Text size="sm" w={60}>{dept}</Text>
                        <Chip.Group
                          value={entry?.permissionLevel ?? "none"}
                          onChange={(val) => {
                            if (val === "none") {
                              setDeptPerms((prev) => prev.filter((p) => p.department !== dept));
                            } else {
                              setDeptPerms((prev) => {
                                const next = prev.filter((p) => p.department !== dept);
                                next.push({ department: dept, permissionLevel: val as "edit" | "view" });
                                return next;
                              });
                            }
                          }}
                        >
                          <Group gap={4}>
                            <Chip value="edit" size="xs">編輯</Chip>
                            <Chip value="view" size="xs">檢視</Chip>
                            <Chip value="none" size="xs">無權限</Chip>
                          </Group>
                        </Chip.Group>
                      </Group>
                    );
                  })}
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
                    onChange={handleFolderChange}
                    clearable
                  />
                  {selectedFolder && (
                    <Text size="sm" c="dimmed">已選擇資料夾「{selectedFolder}」，非重複 KOL 將合併至候選名單。</Text>
                  )}
                </Stack>
              )}
            </Box>

            {/* Task 3: Duplicate warning */}
            {duplicateWarning && (
              <Alert color="yellow" withCloseButton onClose={() => setDuplicateWarning(null)}>
                {duplicateWarning}
              </Alert>
            )}

            <Divider />

            <Box>
              <Group justify="space-between" mb="sm">
                <Stack gap={2}>
                  <Title order={4}>預覽候選人名單 ({candidates.length} 筆)</Title>
                  <Text size="sm" c="dimmed">可先調整合作條件與評估指標，再建立正式提案。</Text>
                </Stack>
                <Group gap="xs">
                  <Button type="button" variant="light" onClick={() => setIsEditingCandidates((prev) => !prev)}>
                    {isEditingCandidates ? "完成編輯" : "編輯"}
                  </Button>
                  <Button type="button" onClick={() => setAddModalOpen(true)}>新增 KOL 候選人</Button>
                </Group>
              </Group>

              {candidates.length === 0 ? (
                <Card withBorder>
                  <Text size="sm" c="dimmed">尚未加入候選人，請先從收藏夾匯入或手動新增。</Text>
                </Card>
              ) : (
                <ScrollArea>
                  <Table withColumnBorders withRowBorders striped miw={2200}>
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
                        {isEditingCandidates && <Table.Th>操作</Table.Th>}
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
                              <TextInput w={numericInputWidth} value={candidate.price} onChange={(event) => updateCandidate(index, { price: toNumber(event.currentTarget.value) })} />
                            ) : `$${candidate.price.toLocaleString("zh-TW")}`}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.actualPrice ?? ""} onChange={(event) => updateCandidate(index, { actualPrice: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.actualPrice != null ? `$${candidate.actualPrice.toLocaleString("zh-TW")}` : "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.realFollowerRatio ?? ""} onChange={(event) => updateCandidate(index, { realFollowerRatio: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.realFollowerRatio != null ? `${candidate.realFollowerRatio}%` : "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.reputationScore ?? ""} onChange={(event) => updateCandidate(index, { reputationScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.reputationScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.avgEngagementRate ?? ""} onChange={(event) => updateCandidate(index, { avgEngagementRate: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.avgEngagementRate != null ? `${candidate.avgEngagementRate}%` : "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.engagementIndex ?? ""} onChange={(event) => updateCandidate(index, { engagementIndex: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.engagementIndex ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.engagementScore ?? ""} onChange={(event) => updateCandidate(index, { engagementScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.engagementScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.brandFitScore ?? ""} onChange={(event) => updateCandidate(index, { brandFitScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.brandFitScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.qualityScore ?? ""} onChange={(event) => updateCandidate(index, { qualityScore: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.qualityScore ?? "-"}
                          </Table.Td>
                          <Table.Td>
                            {isEditingCandidates ? (
                              <TextInput w={numericInputWidth} value={candidate.cpfr ?? ""} onChange={(event) => updateCandidate(index, { cpfr: toOptionalNumber(event.currentTarget.value) })} />
                            ) : candidate.cpfr ?? "-"}
                          </Table.Td>
                          <Table.Td miw={240}>
                            {isEditingCandidates ? (
                              <Textarea autosize minRows={2} value={candidate.recommendation} onChange={(event) => updateCandidate(index, { recommendation: event.currentTarget.value })} />
                            ) : (
                              <Text size="sm">{candidate.recommendation}</Text>
                            )}
                          </Table.Td>
                          {/* Task 4: Delete button in edit mode */}
                          {isEditingCandidates && (
                            <Table.Td>
                              <Button
                                type="button"
                                size="xs"
                                color="red"
                                variant="light"
                                onClick={() => removeCandidate(index)}
                              >
                                刪除
                              </Button>
                            </Table.Td>
                          )}
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
            <Button type="button" variant="default" onClick={() => setAddModalOpen(false)}>取消</Button>
            <Button type="button" onClick={addManualCandidate} disabled={!manualSelectedKol}>加入候選名單</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
