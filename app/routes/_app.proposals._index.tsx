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
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { deleteProposal, listProposals, updateProposal } from "~/lib/mock-api.server";
import styles from "./_app.proposals._index.module.css";

// ─── constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const STAGE_LABELS: Record<string, string> = {
  draft: "草稿",
  internal_review: "內部審核",
  sent_to_client: "已送出給客戶",
  approved: "已核准",
};

const ALL_STAGES = Object.entries(STAGE_LABELS).map(([value, label]) => ({ value, label }));

// ─── helpers ──────────────────────────────────────────────────────────────────

function withTimeout<T>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([promise, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))]);
}

function buildUrl(base: Record<string, string>, overrides: Record<string, string | null>) {
  const out = new URLSearchParams(base);
  for (const [k, v] of Object.entries(overrides)) {
    out.delete(k);
    if (v !== null && v !== "") out.set(k, v);
  }
  out.delete("page");
  return `?${out.toString()}`;
}

// ─── action ───────────────────────────────────────────────────────────────────

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete_proposal") {
    const id = String(formData.get("id"));
    await deleteProposal(id);
    return json({ success: true });
  }

  if (intent === "edit_proposal") {
    const id = String(formData.get("id"));
    const title = String(formData.get("title"));
    const clientName = String(formData.get("clientName"));
    const budget = Number(formData.get("budget"));
    const launchMonth = String(formData.get("launchMonth"));
    const stage = String(formData.get("stage"));
    await updateProposal(id, { title, clientName, budget, launchMonth, stage });
    return json({ success: true });
  }

  return json({ success: false });
}

// ─── loader ───────────────────────────────────────────────────────────────────

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const sp = url.searchParams;

  const q = sp.get("q")?.trim().toLowerCase() ?? "";
  const client = sp.get("client") ?? "";
  const stage = sp.get("stage") ?? "";
  const budgetMin = Number(sp.get("budgetMin") ?? 0) || 0;
  const budgetMax = Number(sp.get("budgetMax") ?? 0) || 0;
  const overdue = sp.get("overdue") === "1";
  const sort = sp.get("sort") ?? "";        // "budget" | "dueDate"
  const order = sp.get("order") ?? "desc"; // "asc" | "desc"
  const page = Math.max(1, Number(sp.get("page") ?? 1));

  const allProposals = await withTimeout(listProposals(), []).catch(() => []);

  const allClients = [...new Set(allProposals.map((p) => p.clientName).filter(Boolean))].sort();
  const today = new Date().toISOString().slice(0, 10);

  let proposals = allProposals.filter((p): p is NonNullable<typeof p> => p != null);

  // ── text search (title + clientName) ──
  if (q) {
    proposals = proposals.filter(
      (p) => p.title.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q)
    );
  }

  // ── client filter ──
  if (client) proposals = proposals.filter((p) => p.clientName === client);

  // ── stage filter ──
  if (stage) proposals = proposals.filter((p) => p.stage === stage);

  // ── budget range filter ──
  if (budgetMin > 0) proposals = proposals.filter((p) => p.budget >= budgetMin);
  if (budgetMax > 0) proposals = proposals.filter((p) => p.budget <= budgetMax);

  // ── overdue filter ──
  if (overdue) proposals = proposals.filter((p) => p.launchMonth && p.launchMonth < today);

  // ── sort (default = insertion/fetch order = newest first) ──
  if (sort === "budget") {
    proposals = [...proposals].sort((a, b) =>
      order === "asc" ? a.budget - b.budget : b.budget - a.budget
    );
  } else if (sort === "launchMonth") {
    proposals = [...proposals].sort((a, b) => {
      const da = a.launchMonth ?? "";
      const db = b.launchMonth ?? "";
      return order === "asc" ? da.localeCompare(db) : db.localeCompare(da);
    });
  }

  // ── pagination ──
  const total = proposals.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = proposals.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const activeFilterCount =
    (q ? 1 : 0) + (client ? 1 : 0) + (stage ? 1 : 0) +
    (budgetMin > 0 || budgetMax > 0 ? 1 : 0) + (overdue ? 1 : 0);

  return json({
    proposals: pageRows,
    total,
    totalPages,
    page: safePage,
    allClients,
    q, client, stage, budgetMin, budgetMax, overdue,
    sort, order,
    activeFilterCount,
    today,
  });
}

// ─── component ────────────────────────────────────────────────────────────────

export default function ProposalListPage() {
  const {
    proposals, total, totalPages, page,
    allClients, q, client, stage, budgetMin, budgetMax, overdue,
    sort, order, activeFilterCount, today,
  } = useLoaderData<typeof loader>();

  const [editingProposal, setEditingProposal] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(activeFilterCount > 0);

  const handleEdit = (p: any) => { setEditingProposal(p); open(); };
  const handleAskDelete = (p: any) => { setDeleteTarget(p); openDelete(); };

  // ── current params for URL building ──
  const current: Record<string, string> = {
    ...(q ? { q } : {}),
    ...(client ? { client } : {}),
    ...(stage ? { stage } : {}),
    ...(budgetMin > 0 ? { budgetMin: String(budgetMin) } : {}),
    ...(budgetMax > 0 ? { budgetMax: String(budgetMax) } : {}),
    ...(overdue ? { overdue: "1" } : {}),
    ...(sort ? { sort } : {}),
    ...(order !== "desc" ? { order } : {}),
  };

  const sortUrl = (key: string) => {
    if (sort !== key) return buildUrl(current, { sort: key, order: "desc" });
    return buildUrl(current, { sort: key, order: order === "desc" ? "asc" : "desc" });
  };

  const sortLabel = (key: string) => {
    if (sort !== key) return "";
    return order === "asc" ? " ↑" : " ↓";
  };

  const pageUrl = (p: number) => {
    const out = new URLSearchParams(current);
    out.set("page", String(p));
    return `?${out.toString()}`;
  };

  const thLink = (label: string, key: string) => (
    <a href={sortUrl(key)} className={styles.thLink}>
      {label}{sortLabel(key)}
    </a>
  );

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={2}>提案一覽</Title>
        </Box>
        <Button component={Link} to="/proposals/new">新增提案</Button>
      </Group>

      {/* ── 搜尋 + 篩選 bar ── */}
      <form method="get" action="/proposals" className={styles.formContents}>
        <Group gap={8} wrap="wrap">
          <input
            name="q"
            defaultValue={q}
            placeholder="搜尋提案標題或客戶（按 Enter）"
            className={`${styles.formInput} ${styles.searchInput}`}
          />
          {/* preserve sort/order across search */}
          {sort && <input type="hidden" name="sort" value={sort} />}
          {order !== "desc" && <input type="hidden" name="order" value={order} />}
          <button
            type="submit"
            className={`${styles.formInput} ${styles.formSubmitButton}`}
          >
            搜尋
          </button>
          {q && (
            <a href={buildUrl(current, { q: null })} className={`${styles.formInput} ${styles.linkButton}`}>✕</a>
          )}
          <button
            type="button"
            className={`${styles.formInput} ${activeFilterCount > 0 ? `${styles.filterToggle} ${styles.filterToggleActive}` : styles.filterToggle}`}
            onClick={() => setShowFilters((v) => !v)}
          >
            ⚙ 篩選{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </Group>
      </form>

      {/* ── 篩選面板 ── */}
      {showFilters && (
        <Card withBorder>
          <Text fw={600} mb="md">篩選條件</Text>
          <form method="get" action="/proposals">
            {q && <input type="hidden" name="q" value={q} />}
            {sort && <input type="hidden" name="sort" value={sort} />}
            {order !== "desc" && <input type="hidden" name="order" value={order} />}

            <Group align="flex-start" gap="xl" wrap="wrap">
              {/* 客戶 */}
              <Box miw={160}>
                <Text size="sm" fw={600} mb={6}>客戶</Text>
                <select name="client" defaultValue={client} className={styles.formInput} title="篩選客戶">
                  <option value="">全部</option>
                  {allClients.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Box>

              <Divider orientation="vertical" />

              {/* 階段 */}
              <Box miw={160}>
                <Text size="sm" fw={600} mb={6}>階段</Text>
                <select name="stage" defaultValue={stage} className={styles.formInput} title="篩選提案階段">
                  <option value="">全部</option>
                  {ALL_STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Box>

              <Divider orientation="vertical" />

              {/* 預算區間 */}
              <Box miw={220}>
                <Text size="sm" fw={600} mb={6}>預算區間</Text>
                <Group gap={8} align="center">
                  <input
                    type="number"
                    name="budgetMin"
                    min={0}
                    step={10000}
                    defaultValue={budgetMin > 0 ? budgetMin : ""}
                    placeholder="最低"
                    className={`${styles.formInput} ${styles.budgetInput}`}
                  />
                  <Text size="sm" c="dimmed">—</Text>
                  <input
                    type="number"
                    name="budgetMax"
                    min={0}
                    step={10000}
                    defaultValue={budgetMax > 0 ? budgetMax : ""}
                    placeholder="最高"
                    className={`${styles.formInput} ${styles.budgetInput}`}
                  />
                </Group>
              </Box>

              <Divider orientation="vertical" />

              {/* 是否已截止 */}
              <Box miw={120}>
                <Text size="sm" fw={600} mb={6}>截止狀態</Text>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="overdue" value="1" defaultChecked={overdue} />
                  僅顯示已截止
                </label>
              </Box>
            </Group>

            <Group mt="md" gap="sm">
              <button type="submit" className={`${styles.formInput} ${styles.formSubmitButton}`}>
                套用篩選
              </button>
              <a href="/proposals" className={`${styles.formInput} ${styles.linkButton}`}>清除篩選</a>
            </Group>
          </form>
        </Card>
      )}

      {/* ── 結果筆數 ── */}
      <Text c="dimmed" size="sm">共 {total} 筆{q ? `（搜尋：${q}）` : ""}</Text>

      {/* ── 表格 ── */}
      <Card withBorder p={0}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th pl={16}>案件</Table.Th>
              <Table.Th>客戶</Table.Th>
              <Table.Th>目前階段</Table.Th>
              <Table.Th>{thLink("總預算", "budget")}</Table.Th>
              <Table.Th>{thLink("預計上線月份", "launchMonth")}</Table.Th>
              <Table.Th>最後更新日</Table.Th>
              <Table.Th ta="right" pr={16}>操作</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {proposals.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={7}>
                  <Text ta="center" c="dimmed" py="xl">沒有符合條件的提案</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              proposals.map((p) => {
                const isOverdue = p.launchMonth && p.launchMonth < today;
                return (
                  <Table.Tr key={p.id}>
                    <Table.Td pl={16}>
                      <Link to={`/proposals/${p.id}`}>{p.title}</Link>
                    </Table.Td>
                    <Table.Td>{p.clientName}</Table.Td>
                    <Table.Td>
                      <Badge
                        variant="light"
                        color={
                          p.stage === "approved" ? "green"
                            : p.stage === "sent_to_client" ? "blue"
                              : p.stage === "internal_review" ? "orange"
                                : "gray"
                        }
                        size="sm"
                      >
                        {STAGE_LABELS[p.stage ?? ""] ?? p.stage ?? ""}
                      </Badge>
                    </Table.Td>
                    <Table.Td>NT$ {(p.budget ?? 0).toLocaleString()}</Table.Td>
                    <Table.Td>
                      <Text size="sm" c={isOverdue ? "red" : undefined}>
                        {p.launchMonth || "—"}{isOverdue ? " ⚠" : ""}
                      </Text>
                    </Table.Td>
                    <Table.Td>{p.updatedAt || "—"}</Table.Td>
                    <Table.Td ta="right" pr={16}>
                      <Group gap="xs" justify="flex-end">
                        <ActionIcon variant="light" color="blue" component={Link} to={`/proposals/${p.id}`} title="查看詳細">
                          <IconEye size={16} />
                        </ActionIcon>
                        <ActionIcon variant="light" color="orange" onClick={() => handleEdit(p)} title="編輯">
                          <IconPencil size={16} />
                        </ActionIcon>
                        <ActionIcon variant="light" color="red" type="button" title="刪除" onClick={() => handleAskDelete(p)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </Card>

      {/* ── 分頁 ── */}
      {totalPages > 1 && (
        <Group justify="center" gap={4}>
          <a
            href={page <= 1 ? undefined : pageUrl(page - 1)}
            aria-label="上一頁"
            title="上一頁"
            className={page <= 1 ? `${styles.pageButton} ${styles.pageButtonDisabled}` : styles.pageButton}
          >
            <IconChevronLeft size={16} />
          </a>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={pageUrl(p)}
              className={p === page ? `${styles.pageButton} ${styles.pageButtonActive}` : styles.pageButton}
            >
              {p}
            </a>
          ))}

          <a
            href={page >= totalPages ? undefined : pageUrl(page + 1)}
            aria-label="下一頁"
            title="下一頁"
            className={page >= totalPages ? `${styles.pageButton} ${styles.pageButtonDisabled}` : styles.pageButton}
          >
            <IconChevronRight size={16} />
          </a>
        </Group>
      )}

      {/* ── 編輯 Modal ── */}
      <Modal opened={opened} onClose={close} title="編輯提案基本資料">
        {editingProposal && (
          <Form method="post" onSubmit={close}>
            <input type="hidden" name="intent" value="edit_proposal" />
            <input type="hidden" name="id" value={editingProposal.id} />
            <Stack>
              <TextInput name="title" label="提案標題" defaultValue={editingProposal.title} required />
              <TextInput name="clientName" label="客戶名稱" defaultValue={editingProposal.clientName} required />
              <NumberInput name="budget" label="預算" defaultValue={editingProposal.budget} thousandSeparator="," />
              <TextInput type="date" name="launchMonth" label="預計上線月份" defaultValue={editingProposal.launchMonth?.slice(0, 10) ?? ""} />
              <Select
                name="stage"
                label="提案階段"
                defaultValue={["draft", "internal_review", "sent_to_client", "approved"].includes(editingProposal.stage) ? editingProposal.stage : "draft"}
                data={ALL_STAGES}
                required
              />
              <Group justify="flex-end" mt="md">
                <Button type="button" variant="default" onClick={close}>取消</Button>
                <Button type="submit">儲存變更</Button>
              </Group>
            </Stack>
          </Form>
        )}
      </Modal>

      {/* ── 刪除 Modal ── */}
      <Modal opened={deleteOpened} onClose={closeDelete} title="確認刪除提案" centered>
        <Form method="post" onSubmit={closeDelete}>
          <input type="hidden" name="intent" value="delete_proposal" />
          <input type="hidden" name="id" value={deleteTarget?.id ?? ""} />
          <Stack>
            <Text size="sm">確定要刪除此提案{deleteTarget ? `「${deleteTarget.title}」` : ""}嗎？此動作無法復原。</Text>
            <Group justify="flex-end">
              <Button variant="default" type="button" onClick={closeDelete}>取消</Button>
              <Button type="submit" color="red">確認刪除</Button>
            </Group>
          </Stack>
        </Form>
      </Modal>
    </Stack>
  );
}
