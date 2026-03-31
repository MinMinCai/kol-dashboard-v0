import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
  Checkbox,
} from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import {
  addProposalKol,
  getProposal,
  listKols,
  listProposalKols,
  updateProposalKolStatus,
  deleteProposalKol,
  updateProposal,
} from "~/lib/mock-api";
import { IconTrash, IconBulb, IconCheck, IconX, IconArrowLeft } from "@tabler/icons-react";

export async function loader({ params }: LoaderFunctionArgs) {
  const proposalId = params.proposalId ?? "";
  const [proposal, candidates, allKols] = await Promise.all([
    getProposal(proposalId),
    listProposalKols(proposalId),
    listKols(),
  ]);

  if (!proposal) throw new Response("Not Found", { status: 404 });

  return json({ proposal, candidates, allKols });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const proposalId = params.proposalId ?? "";
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "add_candidate") {
    const kolId = String(formData.get("kolId"));
    // Strip commas from price string (e.g., "10,000" -> "10000") before conversion
    const priceStr = String(formData.get("price") || "0").replace(/,/g, "");
    const price = Number(priceStr);
    const role = String(formData.get("role"));
    const reason = String(formData.get("reason"));
    const kolName = String(formData.get("kolName"));

    await addProposalKol({
      proposalId,
      kolId,
      kolName,
      price,
      role,
      reason,
    });
    return json({ success: true });
  }

  if (intent === "update_status") {
    const candidateId = String(formData.get("candidateId"));
    const status = String(formData.get("status"));
    const feedback = String(formData.get("feedback"));
    await updateProposalKolStatus(candidateId, status, feedback);
    return json({ success: true });
  }

  if (intent === "delete_candidate") {
    const candidateId = String(formData.get("candidateId"));
    await deleteProposalKol(candidateId);
    return json({ success: true });
  }

  if (intent === "batch_delete_candidates") {
    const idsString = String(formData.get("candidateIds") || "");
    const ids = idsString.split(",").filter(Boolean);
    await Promise.all(ids.map(id => deleteProposalKol(id)));
    return json({ success: true });
  }

  if (intent === "update_proposal") {
    const stage = formData.get("stage") ? String(formData.get("stage")) : undefined;
    const title = formData.get("title") ? String(formData.get("title")) : undefined;
    const clientName = formData.get("clientName") ? String(formData.get("clientName")) : undefined;
    const budgetStr = formData.get("budget") ? String(formData.get("budget")).replace(/,/g, "").replace(/\$/g, "") : undefined;
    const budget = budgetStr !== undefined ? Number(budgetStr) : undefined;
    const dueDate = formData.get("dueDate") ? String(formData.get("dueDate")) : undefined;

    await updateProposal(proposalId, { stage, title, clientName, budget, dueDate });
    return json({ success: true });
  }

  return json({ success: false });
}

export default function ProposalDetailPage() {
  const { proposal, candidates, allKols } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const { colorScheme } = useMantineColorScheme();
  const [domColorScheme, setDomColorScheme] = useState<"light" | "dark" | null>(null);
  const isDark = (domColorScheme ?? colorScheme) === "dark";
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(proposal.title);
  const [editedClient, setEditedClient] = useState(proposal.clientName);
  const [editedBudget, setEditedBudget] = useState(proposal.budget);
  const [editedDueDate, setEditedDueDate] = useState(proposal.dueDate);
  const [editedStage, setEditedStage] = useState(proposal.stage);

  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [aiSearchOpened, { open: openAiSearch, close: closeAiSearch }] = useDisclosure(false);
  const [deleteConfirmOpened, { open: openDeleteConfirm, close: closeDeleteConfirm }] = useDisclosure(false);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [aiQuery, setAiQuery] = useState("");
  const [feedbackCandidate, setFeedbackCandidate] = useState<{ id: string; name: string } | null>(null);
  const [manualKolId, setManualKolId] = useState<string | null>(null);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<
    { type: "single"; candidateId: string; name: string } | { type: "batch"; candidateIds: string[] } | null
  >(null);

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

  useEffect(() => {
    const html = document.documentElement;
    const readScheme = () => {
      const scheme = html.getAttribute("data-mantine-color-scheme");
      setDomColorScheme(scheme === "dark" ? "dark" : "light");
    };
    readScheme();
    const observer = new MutationObserver(readScheme);
    observer.observe(html, { attributes: true, attributeFilter: ["data-mantine-color-scheme"] });
    return () => observer.disconnect();
  }, []);

  const aiSearchCardStyle = isDark
    ? {
        background: "linear-gradient(135deg, rgba(16, 24, 40, 0.98) 0%, rgba(14, 20, 34, 0.98) 100%)",
        border: "1px solid rgba(51, 154, 240, 0.28)",
      }
    : {
        background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)",
        border: "1px solid #cce3ff",
      };

  const aiAvatarBg = isDark ? "rgba(148, 163, 184, 0.18)" : "#eee";
  const aiReasonBg = isDark ? "rgba(51, 154, 240, 0.18)" : "rgba(51, 154, 240, 0.1)";

  const allKolOptions = useMemo(
    () => allKols.map((k) => ({ value: k.id, label: k.displayName })),
    [allKols],
  );

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    setAiSearching(true);
    openAiSearch();

    // Simulate AI delay (mock). Keep deterministic output to avoid hydration issues.
    window.setTimeout(() => {
      const q = aiQuery.trim().toLowerCase();
      const matches = allKols
        .filter((k) => {
          const nameOk = k.displayName.toLowerCase().includes(q);
          const catOk = (k.categories ?? []).some((c: string) => c.toLowerCase().includes(q));
          const industryOk = (k.industry ?? "").toLowerCase().includes(q);
          return nameOk || catOk || industryOk;
        })
        .slice(0, 5)
        .map((k) => {
          const reason =
            `根據您的需求「${aiQuery}」，該 KOL 的領域與標籤高度相關，且過往在類似專案中表現穩定。`;
          return {
            ...k,
            matchScore: 88,
            aiReason: reason,
          };
        });
      setAiResults(matches);
      setAiSearching(false);
    }, 900);
  };

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

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start">
        <Group align="center" gap="md" style={{ flex: 1 }}>
          <ActionIcon 
            variant="subtle" 
            color="gray" 
            component={Link} 
            to="/proposals"
            size="lg"
          >
            <IconArrowLeft size={24} />
          </ActionIcon>
          <Stack gap="xs" style={{ flex: 1 }}>
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
                onClick={() => alert("提案資料已匯出為 Excel (模擬)")}
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

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        <Card withBorder>
          <Text size="xs" c="dimmed" fw={700}>當前階段</Text>
          <Select
            mt={5}
            size="sm"
            value={isEditing ? editedStage : proposal.stage}
            disabled={!isEditing}
            onChange={(val) => {
              if (val) {
                if (isEditing) {
                  setEditedStage(val);
                } else {
                  // Legacy auto-save behavior if not in explicit edit mode (optional)
                  const formData = new FormData();
                  formData.append("intent", "update_proposal");
                  formData.append("stage", val);
                  submit(formData, { method: "post" });
                }
              }
            }}
            data={[
              { value: "draft", label: "草稿 (DRAFT)" },
              { value: "internal_review", label: "內部審核 (INTERNAL REVIEW)" },
              { value: "sent_to_client", label: "已送出給客戶 (SENT TO CLIENT)" },
            ]}
          />
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
              mt={5}
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.currentTarget.value)}
              placeholder="YYYY-MM-DD"
            />
          ) : (
            <Text size="xl" fw={700} mt={5}>{proposal.dueDate}</Text>
          )}
        </Card>
      </SimpleGrid>

      {/* AI Search Section - Only visible in Edit Mode */}
      {isEditing && (
        <Card withBorder padding="lg" radius="md" style={aiSearchCardStyle}>
        <Stack gap="xs">
          <Group gap={8}>
            <Text size="lg" fw={700} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 20 }}>🤖</span> AI KOL 智能搜尋
            </Text>
            <Badge variant="dot" color="blue">Beta</Badge>
          </Group>
          <Text size="sm" c="dimmed">輸入您的需求（例如：找母嬰類、互動率 5% 以上、沒合作過競品），AI 將為您推薦最合適的人選。</Text>
          <Group mt="xs" wrap="nowrap">
            <TextInput
              id="ai-search-input"
              placeholder="請輸入搜尋指令..."
              style={{ flex: 1 }}
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

      <Card withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Group gap="md">
              <Title order={4}>KOL 候選名單 ({candidates.length})</Title>
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
            </Group>
            {isEditing && (
              <Button type="button" size="xs" onClick={openAdd}>+ 手動新增</Button>
            )}
          </Group>

          <Table striped withTableBorder>
            <Table.Thead>
              <Table.Tr>
                {isEditing && (
                  <Table.Th style={{ width: 40 }}>
                    <Checkbox 
                      checked={selectedCandidateIds.length === candidates.length && candidates.length > 0}
                      indeterminate={selectedCandidateIds.length > 0 && selectedCandidateIds.length < candidates.length}
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setSelectedCandidateIds(candidates.map(c => c.id));
                        } else {
                          setSelectedCandidateIds([]);
                        }
                      }}
                    />
                  </Table.Th>
                )}
                <Table.Th>KOL 名稱</Table.Th>
                <Table.Th>角色/版位</Table.Th>
                <Table.Th>預估報價</Table.Th>
                <Table.Th>推薦理由</Table.Th>
                <Table.Th>狀態</Table.Th>
                <Table.Th>客戶反饋</Table.Th>
                {isEditing && <Table.Th>操作</Table.Th>}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {candidates.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={isEditing ? 8 : 6} align="center">尚未加入任何候選人</Table.Td>
                </Table.Tr>
              ) : (
                candidates.map((c) => (
                  <Table.Tr key={c.id}>
                    {isEditing && (
                      <Table.Td>
                        <Checkbox 
                          checked={selectedCandidateIds.includes(c.id)}
                          onChange={(e) => {
                            if (e.currentTarget.checked) {
                              setSelectedCandidateIds([...selectedCandidateIds, c.id]);
                            } else {
                              setSelectedCandidateIds(selectedCandidateIds.filter(id => id !== c.id));
                            }
                          }}
                        />
                      </Table.Td>
                    )}
                    <Table.Td fw={500}>{c.kolName}</Table.Td>
                    <Table.Td>{c.role}</Table.Td>
                    <Table.Td>${(c.price ?? 0).toLocaleString("zh-TW")}</Table.Td>
                    <Table.Td>
                      <Text size="sm" lineClamp={2}>{c.reason}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={statusColor[c.status]}>{statusLabel[c.status]}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="dimmed">{c.feedbackText || "-"}</Text>
                    </Table.Td>
                    {isEditing && (
                      <Table.Td>
                        <Group gap={5}>
                          <Form method="post" style={{ display: 'inline' }}>
                            <input type="hidden" name="intent" value="update_status" />
                            <input type="hidden" name="candidateId" value={c.id} />
                            <input type="hidden" name="status" value="accepted" />
                            <Button
                              variant="light"
                              color="green"
                              size="compact-xs"
                              type="submit"
                              disabled={c.status === "accepted"}
                            >
                              接受
                            </Button>
                          </Form>
                          <Button
                            variant="light"
                            color="red"
                            size="compact-xs"
                            onClick={() => setFeedbackCandidate({ id: c.id, name: c.kolName })}
                            disabled={c.status === "rejected"}
                          >
                            拒絕
                          </Button>
                          <ActionIcon
                            variant="light"
                            color="gray"
                            size="sm"
                            type="button"
                            onClick={() => requestDeleteSingle(c.id, c.kolName)}
                          >
                            <IconTrash size={14} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    )}
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Stack>
      </Card>

      {/* AI Search Results Modal */}
      <Modal
        id="proposal-ai-search-modal"
        opened={aiSearchOpened}
        onClose={() => {
          setAiSearching(false);
          closeAiSearch();
        }}
        title="🤖 AI 搜尋結果"
        size="lg"
      >
        <Stack gap="md">
          {aiSearching && <Text c="dimmed">正在分析資料庫並匹配最佳人選...</Text>}
          {!aiSearching && aiResults.length === 0 && (
            <Text c="dimmed">找不到符合「{aiQuery}」的候選人（Mock）。</Text>
          )}
          {!aiSearching &&
            aiResults.map((res) => (
              <Card key={res.id} withBorder shadow="xs">
                <Group justify="space-between" align="flex-start">
                  <Group gap="sm">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: aiAvatarBg,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={res.avatarUrl}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                  style={{
                    background: aiReasonBg,
                    borderRadius: 4,
                    borderLeft: "3px solid #339af0",
                  }}
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

      {/* Manual Add Candidate Modal */}
      <Modal
        id="proposal-manual-add-modal"
        opened={addOpened}
        onClose={() => {
          setManualKolId(null);
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
              value={allKols.find((k) => k.id === manualKolId)?.displayName ?? ""}
            />
            <TextInput
              name="role"
              label="建議合作版位"
              placeholder="例如：IG 貼文 x1, Reels x1"
              required
            />
            <NumberInput
              name="price"
              label="預計報價"
              required
              min={0}
              thousandSeparator=","
              defaultValue={allKols.find((k) => k.id === manualKolId)?.averagePrice ?? 0}
            />
            <Textarea
              name="reason"
              label="推薦理由"
              placeholder="為什麼這個 KOL 適合此專案？"
              rows={3}
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

      {/* Reject/Feedback Modal */}
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

      {isEditing && (
        <Group justify="flex-end" mt="xl" pb="xl">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setEditedTitle(proposal.title);
              setEditedClient(proposal.clientName);
              setEditedBudget(proposal.budget);
              setEditedDueDate(proposal.dueDate);
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

