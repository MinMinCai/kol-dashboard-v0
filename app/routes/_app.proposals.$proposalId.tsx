import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  Modal,
  NumberInput,
  Progress,
  RingProgress,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  Title,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import styles from "./_app.proposals.$proposalId.module.css";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData, useNavigation, useRevalidator, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Kol } from "~/lib/mock-api.server";
import { handleProposalAction, loadProposalDetail } from "~/lib/proposals.server";
import { IconTrash, IconBulb, IconCheck, IconX, IconArrowLeft, IconBell } from "@tabler/icons-react";

// ============ Loader & Action ============

export async function loader({ params }: LoaderFunctionArgs) {
  return json(await loadProposalDetail(params.proposalId ?? ""));
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  return json(await handleProposalAction(params.proposalId ?? "", formData));
}

// ============ Page Component ============

export default function ProposalDetailPage() {
  // ============ Loader Data & Hooks ============
  const { proposal, candidates, allKols } = useLoaderData<typeof loader>();
  /** Loader JSON 型別可能將陣列元素標成可為 null；收斂成 Kol[] 供後續安全存取 */
  const kols = useMemo(
    () => (allKols ?? []).filter((item): item is Kol => item != null),
    [allKols],
  );
  const navigation = useNavigation();
  const submit = useSubmit();
  const statusFetcher = useFetcher<{ success?: boolean }>();

  // ============ State ============
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(proposal.title);
  const [editedClient, setEditedClient] = useState(proposal.clientName);
  const [editedBudget, setEditedBudget] = useState(proposal.budget);
  const [editedDueDate, setEditedDueDate] = useState(proposal.dueDate?.slice(0, 10) ?? "");
  const [editedStage, setEditedStage] = useState(proposal.stage);

  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [aiSearchOpened, { open: openAiSearch, close: closeAiSearch }] = useDisclosure(false);
  const [deleteConfirmOpened, { open: openDeleteConfirm, close: closeDeleteConfirm }] = useDisclosure(false);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [aiQuery, setAiQuery] = useState("");
  const [aiAnalysisStep, setAiAnalysisStep] = useState(0);
  const [aiSearchDone, setAiSearchDone] = useState(false);
  const [feedbackCandidate, setFeedbackCandidate] = useState<{ id: string; name: string } | null>(null);
  const [manualKolId, setManualKolId] = useState<string | null>(null);
  const [manualCandidateForm, setManualCandidateForm] = useState({
    role: "待定",
    price: 0,
    actualPrice: "",
    realFollowerRatio: "",
    reputationScore: "",
    avgEngagementRate: "",
    engagementIndex: "",
    engagementScore: "",
    brandFitScore: "",
    qualityScore: "",
    cpfr: "",
    recommendation: "",
  });
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [downloadingDocType, setDownloadingDocType] = useState<"contract" | "io" | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [dateModalOpened, { open: openDateModal, close: closeDateModal }] = useDisclosure(false);
  const [pendingDocType, setPendingDocType] = useState<"contract" | "io" | null>(null);
  const [cooperationStart, setCooperationStart] = useState<Date | null>(null);
  const [cooperationEnd, setCooperationEnd] = useState<Date | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<
    { type: "single"; candidateId: string; name: string } | { type: "batch"; candidateIds: string[] } | null
  >(null);

  // ============ SSE: Real-time Update Notifications ============
  type UpdateNotice = { updatedBy: string; field: string; timestamp: string };
  const [updateNotices, setUpdateNotices] = useState<UpdateNotice[]>([]);
  const revalidator = useRevalidator();
  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Use a stable "userId" for demo — in production derive from session
    const stored = sessionStorage.getItem("demoUserId");
    const myUserId: string = stored ?? "user-A";
    if (!stored) sessionStorage.setItem("demoUserId", myUserId);

    const es = new EventSource(`/api/proposals/${proposal.id}/events?userId=${encodeURIComponent(myUserId)}`);
    sseRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { updatedBy: string; field: string; timestamp: string };
        setUpdateNotices((prev) => [data, ...prev].slice(0, 5));
        // Auto-refresh page data so the table reflects the change
        revalidator.revalidate();
      } catch { /* ignore malformed events */ }
    };

    return () => {
      es.close();
      sseRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal.id]);

  // ============ Constants & Lookups ============
  const statusColor: Record<string, string> = {
    pending: "gray",
    accepted: "green",
    rejected: "red",
  };

  const statusLabel: Record<string, string> = {
    pending: "待定",
    accepted: "已接受",
    rejected: "已拒絕",
  };

  const AI_ANALYSIS_STEPS = [
    { label: "解析需求關鍵字", icon: "🔍" },
    { label: "掃描 KOL 資料庫", icon: "🗄️" },
    { label: "比對受眾特徵與標籤", icon: "🏷️" },
    { label: "計算匹配分數", icon: "📊" },
    { label: "生成 AI 推薦理由", icon: "✨" },
  ];

  // ============ Computed Values & Sync Effects ============
  const allKolOptions = useMemo(
    () => kols.map((k) => ({ value: k.id, label: k.displayName, followers: k.followers, averagePrice: k.averagePrice, rating: k.rating, engagementRate: k.engagementRate, realFollowerRatio: k.realFollowerRatio })),
    [kols],
  );
  const manualSelectedKol = useMemo(
    () => allKolOptions.find((option) => option.value === manualKolId) ?? null,
    [allKolOptions, manualKolId],
  );
  const sortedCandidates = useMemo(() => {
    const order: Record<string, number> = { accepted: 0, pending: 1, rejected: 2 };
    return [...candidates].sort(
      (a, b) => (order[a.status] ?? 99) - (order[b.status] ?? 99),
    );
  }, [candidates]);
  const selectedCandidates = useMemo(
    () => candidates.filter((candidate) => selectedCandidateIds.includes(candidate.id)),
    [candidates, selectedCandidateIds],
  );
  const selectedAcceptedCandidates = useMemo(
    () => selectedCandidates.filter((candidate) => candidate.status === "accepted"),
    [selectedCandidates],
  );
  const hasNonAcceptedSelection = selectedCandidates.some((candidate) => candidate.status !== "accepted");

  useEffect(() => {
    setSelectedCandidateIds((prev) => prev.filter((id) => candidates.some((candidate) => candidate.id === id)));
  }, [candidates]);

  useEffect(() => {
    if (!manualSelectedKol) return;
    setManualCandidateForm({
      role: "待定",
      price: 0,
      actualPrice: "",
      realFollowerRatio: manualSelectedKol.realFollowerRatio != null ? String(manualSelectedKol.realFollowerRatio) : "",
      reputationScore: "",
      avgEngagementRate: "",
      engagementIndex: "",
      engagementScore: "",
      brandFitScore: "",
      qualityScore: "",
      cpfr: "",
      recommendation: "",
    });
  }, [manualSelectedKol]);

  // ============ Document Download Handlers ============
  const getDownloadFilename = (contentDisposition: string | null, fallback: string) => {
    if (!contentDisposition) return fallback;

    const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) {
      try {
        return decodeURIComponent(utf8Match[1]);
      } catch {
        return utf8Match[1];
      }
    }

    const basicMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
    return basicMatch?.[1] ?? fallback;
  };

  const requestGenerateDocs = (docType: "contract" | "io") => {
    if (selectedAcceptedCandidates.length === 0 || hasNonAcceptedSelection) return;
    setPendingDocType(docType);
    setDateError(null);
    openDateModal();
  };

  const toIsoDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const confirmGenerateDocs = () => {
    if (!pendingDocType) return;
    if (!cooperationStart || !cooperationEnd) {
      setDateError("請填入合作起訖日期");
      return;
    }
    if (cooperationEnd < cooperationStart) {
      setDateError("結束日期不可早於起始日期");
      return;
    }
    const docType = pendingDocType;
    const start = toIsoDate(cooperationStart);
    const end = toIsoDate(cooperationEnd);
    closeDateModal();
    void downloadSelectedDocuments(docType, start, end);
  };

  const downloadSelectedDocuments = async (
    docType: "contract" | "io",
    startDate: string,
    endDate: string,
  ) => {
    if (selectedAcceptedCandidates.length === 0 || hasNonAcceptedSelection) return;

    setDownloadingDocType(docType);
    setDownloadError(null);

    try {
      for (const candidate of selectedAcceptedCandidates) {
        const params = new URLSearchParams({
          type: docType,
          candidateId: candidate.id,
          startDate,
          endDate,
        });
        const response = await fetch(`/api/proposals/${proposal.id}/generate-doc?${params}`);

        if (!response.ok) {
          throw new Error(`${candidate.kolName} 下載失敗`);
        }

        const blob = await response.blob();
        const fallbackName = `${docType === "contract" ? "KOL合約" : "KOL委刊單"}_${candidate.kolName}.docx`;
        const filename = getDownloadFilename(response.headers.get("Content-Disposition"), fallbackName);
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : "文件下載失敗，請稍後再試");
    } finally {
      setDownloadingDocType(null);
    }
  };

  // ============ AI Search Handler ============
  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    setAiSearching(true);
    setAiAnalysisStep(0);
    setAiResults([]);
    setAiSearchDone(false);
    openAiSearch();

    // Cycle through analysis steps, one per 160ms, then produce results
    let step = 0;
    const stepInterval = setInterval(() => {
      step += 1;
      setAiAnalysisStep(step);
      if (step >= AI_ANALYSIS_STEPS.length) {
        clearInterval(stepInterval);
        const q = aiQuery.trim().toLowerCase();
        const scores = [95, 88, 82, 76, 71];
        const matches = kols
          .filter((k) => {
            const nameOk = k.displayName.toLowerCase().includes(q);
            const catOk = (k.categories ?? []).some((c: string) => c.toLowerCase().includes(q));
            const industryOk = (k.industry ?? "").toLowerCase().includes(q);
            return nameOk || catOk || industryOk;
          })
          .slice(0, 5)
          .map((k, i) => ({
            ...k,
            matchScore: scores[i] ?? 70,
            aiReason: `根據您的需求「${aiQuery}」，該 KOL 的領域與標籤高度相關，且過往在類似專案中表現穩定。`,
          }));
        setAiResults(matches);
        setAiSearching(false);
        setAiSearchDone(true);
      }
    }, 160);
  };

  // ============ Delete Confirmation Handlers ============
  const requestDeleteSingle = (candidateId: string, name: string) => {
    setDeleteTarget({ type: "single", candidateId, name });
    openDeleteConfirm();
  };

  const requestDeleteBatch = () => {
    if (selectedCandidateIds.length === 0) return;
    setDeleteTarget({ type: "batch", candidateIds: selectedCandidateIds });
    openDeleteConfirm();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    const formData = new FormData();
    if (deleteTarget.type === "single") {
      formData.append("intent", "delete_candidate");
      formData.append("candidateId", deleteTarget.candidateId);
    } else {
      formData.append("intent", "batch_delete_candidates");
      formData.append("candidateIds", deleteTarget.candidateIds.join(","));
      setSelectedCandidateIds([]);
    }
    submit(formData, { method: "post" });
    closeDeleteConfirm();
    setDeleteTarget(null);
  };

  // ============ Render ============
  return (
    <Stack gap="lg">
      {/* ============ Real-time update notifications ============ */}
      {updateNotices.length > 0 && (
        <Card withBorder p="xs" className={styles.notificationCard}>
          <Group gap="xs" mb={4}>
            <IconBell size={16} color="var(--mantine-color-blue-6)" />
            <Text size="sm" fw={600} c="blue.7">有同事更新了此提案</Text>
            <Button variant="subtle" size="compact-xs" ml="auto" onClick={() => setUpdateNotices([])}>清除</Button>
          </Group>
          <Stack gap={4}>
            {updateNotices.map((n, i) => (
              <Text key={i} size="xs" c="dimmed">
                {new Date(n.timestamp).toLocaleTimeString("zh-TW")}　<Text span fw={500} c="blue.7">{n.updatedBy}</Text>　{n.field}
              </Text>
            ))}
          </Stack>
        </Card>
      )}
      {/* ============ Header: Title + Edit / Export / IO buttons ============ */}
      <Group justify="space-between" align="flex-start">
        <Group align="center" gap="md" flex={1}>
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            to="/proposals"
            size="lg"
          >
            <IconArrowLeft size={24} />
          </ActionIcon>
          <Stack gap="xs" flex={1}>
            {isEditing ? (
            <Stack gap="xs">
              <TextInput
                label="提案標題"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.currentTarget.value)}
                size="md"
                fw={700}
              />
              <TextInput
                label="客戶名稱"
                value={editedClient}
                onChange={(e) => setEditedClient(e.currentTarget.value)}
                size="sm"
              />
            </Stack>
          ) : (
            <Stack gap={0}>
              <Title order={2}>提案詳細：{proposal.title}</Title>
              <Text c="dimmed" size="sm">
                ID: {proposal.id} | 客戶：{proposal.clientName}
              </Text>
            </Stack>
          )}
        </Stack>
        </Group>
        <Group align="center">
          {!isEditing && (
            <>
              <Button variant="light" color="orange" onClick={() => setIsEditing(true)}>
                編輯提案內容
              </Button>
              <Button
                variant="default"
                component="a"
                href={`/api/proposals/${proposal.id}/export`}
                download
              >
                匯出提案
              </Button>
              <Button
                component={Link}
                to={`/insertion-orders/new?fromProposalId=${proposal.id}`}
                color="blue"
                disabled={!candidates.some((c) => c.status === "accepted")}
              >
                轉為委刊單
              </Button>
            </>
          )}
        </Group>
      </Group>

      {/* ============ Stats Cards: Stage / Budget / Due Date ============ */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        <Card withBorder>
          <Text size="xs" c="dimmed" fw={700}>當前階段</Text>
          {isEditing ? (
            <Select
              mt={5}
              size="sm"
              value={editedStage}
              onChange={(val) => { if (val) setEditedStage(val); }}
              data={[
                { value: "draft", label: "草稿" },
                { value: "internal_review", label: "內部審核" },
                { value: "sent_to_client", label: "已送出給客戶" },
                { value: "approved", label: "已核准" },
              ]}
            />
          ) : (
            <Text size="xl" fw={700} mt={5}>
              {{ draft: "草稿", internal_review: "內部審核", sent_to_client: "已送出給客戶", approved: "已核准" }[proposal.stage] ?? proposal.stage}
            </Text>
          )}
        </Card>
        <Card withBorder>
          <Text size="xs" c="dimmed" fw={700}>總預算</Text>
          {isEditing ? (
            <NumberInput
              mt={5}
              value={editedBudget}
              onChange={(val) => setEditedBudget(Number(val))}
              thousandSeparator=","
              prefix="$"
            />
          ) : (
            <Text size="xl" fw={700} mt={5}>${proposal.budget.toLocaleString("zh-TW")}</Text>
          )}
        </Card>
        <Card withBorder>
          <Text size="xs" c="dimmed" fw={700}>截止日期</Text>
          {isEditing ? (
            <TextInput
              type="date"
              mt={5}
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.currentTarget.value)}
            />
          ) : (
            <Text size="xl" fw={700} mt={5}>{proposal.dueDate}</Text>
          )}
        </Card>
      </SimpleGrid>

      {/* ============ AI Search Section (Edit Mode only) ============ */}
      {isEditing && (
        <Card withBorder padding="lg" radius="md" className={styles.aiSearchCard}>
        <Stack gap="xs">
          <Group gap={8}>
            <Text size="lg" fw={700} className={styles.aiHeader}>
              <span className={styles.aiHeaderEmoji}>🤖</span> AI KOL 智能搜尋
            </Text>
            <Badge variant="dot" color="blue">Beta</Badge>
          </Group>
          <Text size="sm" c="dimmed">輸入您的需求（例如：找母嬰類、互動率 5% 以上、沒合作過競品），AI 將為您推薦最合適的人選。</Text>
          <Group mt="xs" wrap="nowrap">
            <TextInput
              id="ai-search-input"
              placeholder="請輸入搜尋指令..."
              flex={1}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAiSearch();
                }
              }}
            />
            <Button
              type="button"
              id="ai-search-btn"
              color="blue"
              onClick={handleAiSearch}
              loading={aiSearching}
            >
              開始搜尋
            </Button>
          </Group>
        </Stack>
      </Card>
      )}

      {/* ============ Candidate List ============ */}
      <Card withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Stack gap={4}>
              <Title order={4}>KOL 候選名單 ({candidates.length})</Title>
              <Text size="xs" c="dimmed">
                勾選後可批次生成文件；僅「已接受」的 KOL 可生成合約與委刊單。
              </Text>
              {downloadError && (
                <Text size="xs" c="red">
                  {downloadError}
                </Text>
              )}
              {hasNonAcceptedSelection && selectedCandidateIds.length > 0 && (
                <Text size="xs" c="orange">
                  目前選取名單中含有未接受的 KOL，請取消後再生成文件。
                </Text>
              )}
            </Stack>
            <Group gap="xs">
              <Button
                type="button"
                size="xs"
                variant="light"
                color="grape"
                loading={downloadingDocType === "contract"}
                disabled={selectedAcceptedCandidates.length === 0 || hasNonAcceptedSelection}
                onClick={() => requestGenerateDocs("contract")}
              >
                生成 KOL 合約
              </Button>
              <Button
                type="button"
                size="xs"
                variant="light"
                color="blue"
                loading={downloadingDocType === "io"}
                disabled={selectedAcceptedCandidates.length === 0 || hasNonAcceptedSelection}
                onClick={() => requestGenerateDocs("io")}
              >
                生成 KOL 委刊單
              </Button>
              {isEditing && selectedCandidateIds.length > 0 && (
                <Button
                  variant="light"
                  color="red"
                  size="xs"
                  leftSection={<IconTrash size={14} />}
                  type="button"
                  onClick={requestDeleteBatch}
                >
                  批量刪除 ({selectedCandidateIds.length})
                </Button>
              )}
              {isEditing && (
                <Button type="button" size="xs" onClick={openAdd}>+ 手動新增</Button>
              )}
            </Group>
          </Group>

          {candidates.length > 0 && (
            <Group gap="sm">
              <Checkbox
                label={`全選（${candidates.length}）`}
                checked={selectedCandidateIds.length === candidates.length && candidates.length > 0}
                indeterminate={selectedCandidateIds.length > 0 && selectedCandidateIds.length < candidates.length}
                onChange={(e) => {
                  if (e.currentTarget.checked) setSelectedCandidateIds(candidates.map(c => c.id));
                  else setSelectedCandidateIds([]);
                }}
              />
            </Group>
          )}

          {candidates.length === 0 ? (
            <Text ta="center" c="dimmed" py="xl">尚未加入任何候選人</Text>
          ) : (
            <Stack gap="md">
              {sortedCandidates.map((c) => (
                <Card key={c.id} withBorder padding={0} radius="md" className={styles.candidateCard}>
                  {isEditing && (
                    <>
                      <form id={`candidate-edit-form-${c.id}`} method="post" hidden />
                      <input form={`candidate-edit-form-${c.id}`} type="hidden" name="intent" value="update_candidate_details" />
                      <input form={`candidate-edit-form-${c.id}`} type="hidden" name="candidateId" value={c.id} />
                      <input form={`candidate-edit-form-${c.id}`} type="hidden" name="realFollowerRatio" value={c.realFollowerRatio != null ? String(c.realFollowerRatio) : ""} />
                    </>
                  )}

                  {/* ── Header bar ── */}
                  <Box
                    px="md"
                    py="sm"
                    className={styles.candidateHeader}
                  >
                    <Group justify="space-between" align="center" wrap="nowrap">
                      <Group gap="sm" align="center" wrap="nowrap">
                        <Checkbox
                          checked={selectedCandidateIds.includes(c.id)}
                          onChange={(e) => {
                            if (e.currentTarget.checked) setSelectedCandidateIds([...selectedCandidateIds, c.id]);
                            else setSelectedCandidateIds(selectedCandidateIds.filter(id => id !== c.id));
                          }}
                        />
                        <Text fw={700} size="md">{c.kolName}</Text>
                        {isEditing ? (
                          <Select
                            size="xs"
                            w={120}
                            value={
                              statusFetcher.state !== "idle" && statusFetcher.formData?.get("candidateId") === c.id
                                ? String(statusFetcher.formData.get("status") ?? c.status)
                                : c.status
                            }
                            data={[
                              { value: "pending", label: "待定" },
                              { value: "accepted", label: "已接受" },
                              { value: "rejected", label: "已拒絕" },
                            ]}
                            onChange={(val) => {
                              if (!val) return;
                              const formData = new FormData();
                              formData.append("intent", "update_status");
                              formData.append("candidateId", c.id);
                              formData.append("status", val);
                              formData.append("feedback", c.feedbackText || "");
                              statusFetcher.submit(formData, { method: "post" });
                            }}
                          />
                        ) : (
                          <Badge color={statusColor[c.status]}>{statusLabel[c.status]}</Badge>
                        )}
                      </Group>
                      {isEditing && (
                        <Group gap="xs" wrap="nowrap">
                          <Button variant="light" color="blue" size="compact-xs" type="submit" form={`candidate-edit-form-${c.id}`}>儲存</Button>
                          <Button variant="light" color="red" size="compact-xs" type="button" onClick={() => requestDeleteSingle(c.id, c.kolName)}>刪除</Button>
                        </Group>
                      )}
                    </Group>
                  </Box>

                  <Stack gap={0} px="md" pt="md" pb="md">
                    {/* ── 合作條件 ── */}
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={0} className={styles.terms3Cols}>
                      <Box pr="md" className={styles.colDivider}>
                        <Text size="xs" c="dimmed" fw={600} mb={2}>合作項目</Text>
                        {isEditing ? (
                          <TextInput form={`candidate-edit-form-${c.id}`} name="role" size="xs" defaultValue={c.role || ""} />
                        ) : (
                          <Text size="sm" fw={500}>{c.role || "-"}</Text>
                        )}
                      </Box>
                      <Box px="md" className={styles.colDivider}>
                        <Text size="xs" c="dimmed" fw={600} mb={2}>預估報價</Text>
                        {isEditing ? (
                          <TextInput form={`candidate-edit-form-${c.id}`} name="price" size="xs" defaultValue={c.price != null ? String(c.price) : "0"} />
                        ) : (
                          <Text size="sm" fw={700}>${(c.price ?? 0).toLocaleString("zh-TW")}</Text>
                        )}
                      </Box>
                      <Box pl="md">
                        <Text size="xs" c="dimmed" fw={600} mb={2}>實際報價</Text>
                        {isEditing ? (
                          <TextInput form={`candidate-edit-form-${c.id}`} name="actualPrice" size="xs" defaultValue={c.actualPrice != null ? String(c.actualPrice) : ""} placeholder="未填" />
                        ) : (
                          <Text size="sm" fw={c.actualPrice != null ? 700 : 400} c={c.actualPrice == null ? "dimmed" : undefined}>
                            {c.actualPrice != null ? `$${c.actualPrice.toLocaleString("zh-TW")}` : "-"}
                          </Text>
                        )}
                      </Box>
                    </SimpleGrid>

                    {/* ── 數據指標 ── */}
                    <Box
                      p="sm"
                      mb="sm"
                      className={styles.metricsBlock}
                    >
                      <Text size="xs" fw={700} c="dimmed" mb={8} className={styles.metricsLabel}>數據指標</Text>
                      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>真粉比例</Text>
                          <Text size="sm" fw={500}>{c.realFollowerRatio != null ? `${c.realFollowerRatio}%` : "-"}</Text>
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>KOL 名聲</Text>
                          {isEditing ? (
                            <TextInput form={`candidate-edit-form-${c.id}`} name="reputationScore" size="xs" defaultValue={c.reputationScore != null ? String(c.reputationScore) : ""} />
                          ) : (
                            <Text size="sm" fw={500}>{c.reputationScore != null ? c.reputationScore : "-"}</Text>
                          )}
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>平均互動率</Text>
                          {isEditing ? (
                            <TextInput form={`candidate-edit-form-${c.id}`} name="avgEngagementRate" size="xs" defaultValue={c.avgEngagementRate != null ? String(c.avgEngagementRate) : ""} />
                          ) : (
                            <Text size="sm" fw={500}>{c.avgEngagementRate != null ? `${c.avgEngagementRate}%` : "-"}</Text>
                          )}
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>互動率 index</Text>
                          {isEditing ? (
                            <TextInput form={`candidate-edit-form-${c.id}`} name="engagementIndex" size="xs" defaultValue={c.engagementIndex != null ? String(c.engagementIndex) : ""} />
                          ) : (
                            <Text size="sm" fw={500}>{c.engagementIndex != null ? c.engagementIndex : "-"}</Text>
                          )}
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>互動率評分</Text>
                          {isEditing ? (
                            <TextInput form={`candidate-edit-form-${c.id}`} name="engagementScore" size="xs" defaultValue={c.engagementScore != null ? String(c.engagementScore) : ""} />
                          ) : (
                            <Text size="sm" fw={500}>{c.engagementScore != null ? c.engagementScore : "-"}</Text>
                          )}
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>品牌適配度</Text>
                          {isEditing ? (
                            <TextInput form={`candidate-edit-form-${c.id}`} name="brandFitScore" size="xs" defaultValue={c.brandFitScore != null ? String(c.brandFitScore) : ""} />
                          ) : (
                            <Text size="sm" fw={500}>{c.brandFitScore != null ? c.brandFitScore : "-"}</Text>
                          )}
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>綜合品質分數</Text>
                          {isEditing ? (
                            <TextInput form={`candidate-edit-form-${c.id}`} name="qualityScore" size="xs" defaultValue={c.qualityScore != null ? String(c.qualityScore) : ""} />
                          ) : (
                            <Text size="sm" fw={700} c={c.qualityScore != null && c.qualityScore >= 80 ? "green" : c.qualityScore != null && c.qualityScore >= 60 ? "yellow" : "red"}>
                              {c.qualityScore != null ? c.qualityScore : "-"}
                            </Text>
                          )}
                        </div>
                        <div>
                          <Text size="xs" c="dimmed" mb={2}>CPFR</Text>
                          {isEditing ? (
                            <TextInput form={`candidate-edit-form-${c.id}`} name="cpfr" size="xs" defaultValue={c.cpfr != null ? String(c.cpfr) : ""} />
                          ) : (
                            <Text size="sm" fw={500}>{c.cpfr != null ? c.cpfr.toFixed(4) : "-"}</Text>
                          )}
                        </div>
                      </SimpleGrid>
                    </Box>

                    {/* ── 建議與反饋 ── */}
                    <Box className={styles.feedbackGrid}>
                      <Box pr="md" className={styles.colDivider}>
                        <Text size="xs" c="dimmed" fw={600} mb={4}>KOL 選擇建議</Text>
                        {isEditing ? (
                          <Textarea form={`candidate-edit-form-${c.id}`} name="recommendation" size="xs" autosize minRows={2} defaultValue={c.recommendation || ""} />
                        ) : (
                          <Text size="sm" className={styles.feedbackText}>
                            {c.recommendation || "-"}
                          </Text>
                        )}
                      </Box>
                      <Box pl="md">
                        <Text size="xs" c="dimmed" fw={600} mb={4}>客戶反饋</Text>
                        {isEditing ? (
                          <Textarea
                            form={`candidate-edit-form-${c.id}`}
                            name="feedbackText"
                            size="xs"
                            autosize
                            minRows={2}
                            defaultValue={c.feedbackText && c.feedbackText !== "null" ? c.feedbackText : ""}
                            placeholder="輸入客戶反饋"
                          />
                        ) : (
                          <Text size="sm" c="dimmed" className={styles.feedbackText}>
                            {c.feedbackText && c.feedbackText !== "null" ? c.feedbackText : "-"}
                          </Text>
                        )}
                      </Box>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </Card>

      {/* ============ Modal: AI Search Results ============ */}
      <Modal
        id="proposal-ai-search-modal"
        opened={aiSearchOpened}
        onClose={() => {
          setAiSearching(false);
          setAiSearchDone(false);
          closeAiSearch();
        }}
        title={<Group gap="xs"><Text fw={700} size="lg">🤖 AI KOL 智能搜尋</Text><Badge variant="dot" color="blue" size="sm">Beta</Badge></Group>}
        size="lg"
      >
        <Stack gap="md">
          {/* ── Analysis / Recognition Screen ── */}
          {aiSearching && (
            <Stack align="center" py="xl" gap="lg">
              <Box className={styles.ringWrap}>
                <RingProgress
                  size={100}
                  thickness={6}
                  roundCaps
                  sections={[{ value: (aiAnalysisStep / AI_ANALYSIS_STEPS.length) * 100, color: "blue" }]}
                />
                <Box className={styles.ringEmoji}>🤖</Box>
              </Box>
              <Stack gap={0} ta="center">
                <Text fw={700} size="md">AI 正在分析中...</Text>
                <Text size="xs" c="dimmed">搜尋指令：「{aiQuery}」</Text>
              </Stack>
              <Stack gap="xs" w="100%" px="md">
                {AI_ANALYSIS_STEPS.map((s, i) => {
                  const done = i < aiAnalysisStep;
                  const active = i === aiAnalysisStep;
                  return (
                    <Group key={i} gap="sm" wrap="nowrap">
                      <Box w={24} className={styles.stepIcon}>
                        {done ? (
                          <ThemeIcon size={20} radius="xl" color="green" variant="filled"><IconCheck size={12} /></ThemeIcon>
                        ) : active ? (
                          <Loader size={18} color="blue" type="oval" />
                        ) : (
                          <Box w={20} h={20} className={styles.stepCircle} />
                        )}
                      </Box>
                      <Text size="sm" c={done ? "green" : active ? "blue" : "dimmed"} fw={active ? 600 : 400}>
                        {s.icon} {s.label}
                      </Text>
                    </Group>
                  );
                })}
              </Stack>
              <Progress
                value={(aiAnalysisStep / AI_ANALYSIS_STEPS.length) * 100}
                size="sm"
                radius="xl"
                striped
                animated
                w="100%"
                color="blue"
              />
            </Stack>
          )}

          {/* ── No results ── */}
          {!aiSearching && aiSearchDone && aiResults.length === 0 && (
            <Stack align="center" py="lg" gap="xs">
              <Text size="xl">🔍</Text>
              <Text c="dimmed">找不到符合「{aiQuery}」的候選人（Mock）。</Text>
            </Stack>
          )}

          {/* ── Results header ── */}
          {!aiSearching && aiResults.length > 0 && (
            <Group gap="xs">
              <ThemeIcon size={22} radius="xl" color="green" variant="filled"><IconCheck size={14} /></ThemeIcon>
              <Text size="sm" fw={600} c="green">找到 {aiResults.length} 位推薦人選，可直接加入候選名單</Text>
            </Group>
          )}

          {!aiSearching &&
            aiResults.map((res) => (
              <Card key={res.id} withBorder shadow="xs">
                <Group justify="space-between" align="flex-start">
                  <Group gap="sm">
                    <div className={styles.aiAvatar}>
                      <img
                        src={res.avatarUrl}
                        alt=""
                        className={styles.aiAvatarImg}
                      />
                    </div>
                    <div>
                      <Text fw={700}>{res.displayName}</Text>
                      <Text size="xs" c="dimmed">
                        {res.industry} | {(res.followers ?? 0).toLocaleString("zh-TW")} 粉絲
                      </Text>
                    </div>
                  </Group>
                  <Badge color="blue" variant="filled">
                    匹配度 {res.matchScore}%
                  </Badge>
                </Group>

                <Text
                  size="xs"
                  mt="sm"
                  p="xs"
                  className={styles.aiReason}
                >
                  <Text span fw={700} c="blue">
                    AI 推薦理由：
                  </Text>{" "}
                  {res.aiReason}
                </Text>

                <Group justify="flex-end" mt="md">
                  <Form method="post" onSubmit={closeAiSearch}>
                    <input type="hidden" name="intent" value="add_candidate" />
                    <input type="hidden" name="kolId" value={res.id} />
                    <input type="hidden" name="kolName" value={res.displayName} />
                    <input type="hidden" name="price" value={res.averagePrice || 0} />
                    <input type="hidden" name="role" value="待討論" />
                    <input type="hidden" name="reason" value={res.aiReason} />
                    <Button size="xs" type="submit">
                      加入候選名單
                    </Button>
                  </Form>
                </Group>
              </Card>
            ))}

          <Button type="button" fullWidth variant="light" onClick={closeAiSearch}>
            關閉
          </Button>
        </Stack>
      </Modal>

      {/* ============ Modal: Manual Add Candidate ============ */}
      <Modal
        id="proposal-manual-add-modal"
        opened={addOpened}
        onClose={() => {
          setManualKolId(null);
          setManualCandidateForm({
            role: "待定",
            price: 0,
            actualPrice: "",
            realFollowerRatio: "",
            reputationScore: "",
            avgEngagementRate: "",
            engagementIndex: "",
            engagementScore: "",
            brandFitScore: "",
            qualityScore: "",
            cpfr: "",
            recommendation: "",
          });
          closeAdd();
        }}
        title="新增 KOL 候選人"
      >
        <Form
          method="post"
          onSubmit={() => {
            setManualKolId(null);
            closeAdd();
          }}
        >
          <input type="hidden" name="intent" value="add_candidate" />
          <Stack>
            <Select
              label="選擇 KOL"
              placeholder="請選擇 KOL"
              data={allKolOptions}
              value={manualKolId}
              onChange={setManualKolId}
              searchable
              nothingFoundMessage="找不到符合的 KOL"
              required
              name="kolId"
            />
            <input
              type="hidden"
              name="kolName"
              value={kols.find((k) => k.id === manualKolId)?.displayName ?? ""}
            />
            <TextInput
              name="role"
              label="建議合作版位"
              placeholder="例如：IG 貼文 x1, Reels x1"
              required
              value={manualCandidateForm.role}
              onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, role: e.currentTarget.value }))}
            />
            <NumberInput
              name="price"
              label="預計報價"
              required
              min={0}
              thousandSeparator=","
              value={manualCandidateForm.price}
              onChange={(value) => setManualCandidateForm((prev) => ({ ...prev, price: Number(value) || 0 }))}
            />
            <TextInput name="actualPrice" label="實際報價" value={manualCandidateForm.actualPrice} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, actualPrice: e.currentTarget.value }))} />
            <Group grow>
              <div>
                <input type="hidden" name="realFollowerRatio" value={manualCandidateForm.realFollowerRatio} />
                <TextInput
                  label="真粉比例"
                  value={manualCandidateForm.realFollowerRatio ? `${manualCandidateForm.realFollowerRatio}%` : "-"}
                  readOnly
                  styles={{ input: { background: "var(--mantine-color-default-hover)", cursor: "default" } }}
                />
              </div>
              <TextInput name="reputationScore" label="KOL 名聲" value={manualCandidateForm.reputationScore} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, reputationScore: e.currentTarget.value }))} />
            </Group>
            <Group grow>
              <TextInput name="avgEngagementRate" label="平均互動率" value={manualCandidateForm.avgEngagementRate} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, avgEngagementRate: e.currentTarget.value }))} />
              <TextInput name="engagementIndex" label="互動率 index" value={manualCandidateForm.engagementIndex} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, engagementIndex: e.currentTarget.value }))} />
            </Group>
            <Group grow>
              <TextInput name="engagementScore" label="互動率評分" value={manualCandidateForm.engagementScore} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, engagementScore: e.currentTarget.value }))} />
              <TextInput name="brandFitScore" label="品牌適配度" value={manualCandidateForm.brandFitScore} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, brandFitScore: e.currentTarget.value }))} />
            </Group>
            <Group grow>
              <TextInput name="qualityScore" label="綜合品質分數" value={manualCandidateForm.qualityScore} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, qualityScore: e.currentTarget.value }))} />
              <TextInput name="cpfr" label="CPFR" value={manualCandidateForm.cpfr} onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, cpfr: e.currentTarget.value }))} />
            </Group>
            <Textarea
              name="recommendation"
              label="KOL 選擇建議"
              placeholder="為什麼這個 KOL 適合此專案？"
              rows={3}
              value={manualCandidateForm.recommendation}
              onChange={(e) => setManualCandidateForm((prev) => ({ ...prev, recommendation: e.currentTarget.value }))}
            />
            <Group justify="flex-end" mt="md">
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  setManualKolId(null);
                  closeAdd();
                }}
              >
                取消
              </Button>
              <Button type="submit" color="blue" disabled={!manualKolId}>
                確認加入
              </Button>
            </Group>
          </Stack>
        </Form>
      </Modal>

      {/* ============ Modal: Delete Confirm (single / batch) ============ */}
      <Modal
        opened={deleteConfirmOpened}
        onClose={() => {
          closeDeleteConfirm();
          setDeleteTarget(null);
        }}
        title="確認刪除"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            {deleteTarget?.type === "single"
              ? `確定要將「${deleteTarget.name}」從候選名單移除嗎？`
              : `確定要將選中的 ${deleteTarget?.type === "batch" ? deleteTarget.candidateIds.length : 0} 位 KOL 從候選名單移除嗎？`}
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => {
              closeDeleteConfirm();
              setDeleteTarget(null);
            }}>
              取消
            </Button>
            <Button color="red" onClick={confirmDelete}>
              確認刪除
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ============ Modal: Cooperation Date (for contract / IO docs) ============ */}
      <Modal
        opened={dateModalOpened}
        onClose={() => {
          closeDateModal();
          setPendingDocType(null);
          setDateError(null);
        }}
        title={pendingDocType === "contract" ? "選擇合作期間（合約用）" : "選擇合作期間（委刊單用）"}
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            選擇的日期會自動填入文件中所有合作起訖日欄位（年/月/日 各自獨立）。
          </Text>
          <DatePickerInput
            label="合作起始日"
            placeholder="選擇起始日"
            value={cooperationStart}
            onChange={(v) => setCooperationStart(v ? new Date(v) : null)}
            valueFormat="YYYY/MM/DD"
            required
          />
          <DatePickerInput
            label="合作結束日"
            placeholder="選擇結束日"
            value={cooperationEnd}
            onChange={(v) => setCooperationEnd(v ? new Date(v) : null)}
            valueFormat="YYYY/MM/DD"
            minDate={cooperationStart ?? undefined}
            required
          />
          {dateError && (
            <Text size="xs" c="red">{dateError}</Text>
          )}
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => {
                closeDateModal();
                setPendingDocType(null);
                setDateError(null);
              }}
            >
              取消
            </Button>
            <Button onClick={confirmGenerateDocs}>
              確認並下載
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ============ Modal: Reject / Feedback ============ */}
      <Modal
        opened={!!feedbackCandidate}
        onClose={() => setFeedbackCandidate(null)}
        title={`拒絕候選人：${feedbackCandidate?.name}`}
      >
        <Form method="post" onSubmit={() => setFeedbackCandidate(null)}>
          <input type="hidden" name="intent" value="update_status" />
          <input type="hidden" name="candidateId" value={feedbackCandidate?.id} />
          <input type="hidden" name="status" value="rejected" />
          <Stack>
            <Textarea
              name="feedback"
              label="客戶反饋 / 拒絕原因"
              required
              placeholder="請輸入拒絕原因（選填但建議填寫）"
            />
            <Button type="submit" color="red">確認拒絕</Button>
          </Stack>
        </Form>
      </Modal>

      {/* ============ Edit Mode: Save / Cancel Buttons ============ */}
      {isEditing && (
        <Group justify="flex-end" mt="xl" pb="xl">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setEditedTitle(proposal.title);
              setEditedClient(proposal.clientName);
              setEditedBudget(proposal.budget);
              setEditedDueDate(proposal.dueDate?.slice(0, 10) ?? "");
              setEditedStage(proposal.stage);
              setIsEditing(false);
            }}
          >
            取消
          </Button>
          <Button
            color="blue"
            size="sm"
            onClick={() => {
              const formData = new FormData();
              formData.append("intent", "update_proposal");
              formData.append("title", editedTitle);
              formData.append("clientName", editedClient);
              formData.append("budget", String(editedBudget));
              formData.append("dueDate", editedDueDate);
              formData.append("stage", editedStage);
              submit(formData, { method: "post" });
              setIsEditing(false);
            }}
          >
            儲存變更
          </Button>
        </Group>
      )}
    </Stack>
  );
}
