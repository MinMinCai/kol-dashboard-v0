import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Modal,
  MultiSelect,
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
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { deleteProposal, listProposals, updateProposal } from "~/lib/mock-api.server";
import { getCurrentMember } from "~/lib/demo-identity.server";
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

function buildUrl(base: Record<string, string | string[]>, overrides: Record<string, string | string[] | null>) {
  const out = new URLSearchParams();
  for (const [k, v] of Object.entries(base)) {
    if (Array.isArray(v)) v.forEach((item) => out.append(k, item));
    else if (v !== "") out.set(k, v);
  }
  for (const [k, v] of Object.entries(overrides)) {
    out.delete(k);
    if (v !== null) {
      if (Array.isArray(v)) v.forEach((item) => out.append(k, item));
      else if (v !== "") out.set(k, v);
    }
  }
  return `?${out.toString()}`;
}

// ─── action ───────────────────────────────────────────────────────────────────

export async function action({ request }: ActionFunctionArgs) {
  const member = await getCurrentMember(request).catch(() => null);
  if (!member || member.role === "member") {
    return json({ success: false, error: "權限不足" }, { status: 403 });
  }

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
  const member = await getCurrentMember(request).catch(() => null);
  const currentRole = member?.role ?? "member";

  const url = new URL(request.url);
  const sp = url.searchParams;

  const q = sp.get("q")?.trim().toLowerCase() ?? "";
  const clients = sp.getAll("client");
  const stages = sp.getAll("stage");
  const budgetMin = Number(sp.get("budgetMin") ?? 0) || 0;
  const budgetMax = Number(sp.get("budgetMax") ?? 0) || 0;
  const overdue = sp.get("overdue") === "1";
  const sort = sp.get("sort") ?? "";        // "budget" | "launchMonth" | "updatedAt"
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
  if (clients.length) proposals = proposals.filter((p) => clients.includes(p.clientName));

  // ── stage filter ──
  if (stages.length) proposals = proposals.filter((p) => stages.includes(p.stage ?? ""));

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
  } else if (sort === "updatedAt") {
    proposals = [...proposals].sort((a, b) => {
      const da = a.updatedAt ?? "";
      const db = b.updatedAt ?? "";
      return order === "asc" ? da.localeCompare(db) : db.localeCompare(da);
    });
  }

  // ── pagination ──
  const total = proposals.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = proposals.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const activeFilterCount =
    (q ? 1 : 0) + (clients.length ? 1 : 0) + (stages.length ? 1 : 0) +
    (budgetMin > 0 || budgetMax > 0 ? 1 : 0) + (overdue ? 1 : 0);

  return json({
    proposals: pageRows,
    total,
    totalPages,
    page: safePage,
    allClients,
    q, clients, stages, budgetMin, budgetMax, overdue,
    sort, order,
    activeFilterCount,
    currentRole,
    today,
  });
}

// ─── component ────────────────────────────────────────────────────────────────

export default function ProposalListPage() {
  const {
    proposals, total, totalPages, page,
    allClients, q, clients, stages, budgetMin, budgetMax, overdue,
    sort, order, activeFilterCount, today, currentRole,
  } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const [clientsLocal, setClientsLocal] = useState<string[]>(clients);
  const [stagesLocal, setStagesLocal] = useState<string[]>(stages);

  const canEdit = currentRole === "admin" || currentRole === "manager";

  const [editingProposal, setEditingProposal] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleEdit = (p: any) => { setEditingProposal(p); open(); };
  const handleAskDelete = (p: any) => { setDeleteTarget(p); openDelete(); };

  // ── current params for URL building ──
  const current: Record<string, string | string[]> = {
    ...(q ? { q } : {}),
    ...(clients.length ? { client: clients } : {}),
    ...(stages.length ? { stage: stages } : {}),
    ...(budgetMin > 0 ? { budgetMin: String(budgetMin) } : {}),
    ...(budgetMax > 0 ? { budgetMax: String(budgetMax) } : {}),
    ...(overdue ? { overdue: "1" } : {}),
    ...(sort ? { sort } : {}),
    ...(order !== "desc" ? { order } : {}),
  };

  const pageUrl = (p: number) => {
    const out = buildUrl(current, { page: String(p) });
    return out;
  };

  function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const sp = new URLSearchParams();
    const qVal = (form.elements.namedItem("q") as HTMLInputElement)?.value.trim() ?? "";
    if (qVal) sp.set("q", qVal);
    clientsLocal.forEach((c) => sp.append("client", c));
    stagesLocal.forEach((s) => sp.append("stage", s));
    const budgetMinVal = (form.elements.namedItem("budgetMin") as HTMLInputElement)?.value ?? "";
    const budgetMaxVal = (form.elements.namedItem("budgetMax") as HTMLInputElement)?.value ?? "";
    if (budgetMinVal) sp.set("budgetMin", budgetMinVal);
    if (budgetMaxVal) sp.set("budgetMax", budgetMaxVal);
    const sortInput = form.querySelector<HTMLInputElement>('input[name="sort"]');
    const orderInput = form.querySelector<HTMLInputElement>('input[name="order"]');
    if (sortInput?.value) sp.set("sort", sortInput.value);
    if (orderInput?.value && orderInput.value !== "desc") sp.set("order", orderInput.value);
    navigate(`/proposals?${sp.toString()}`);
  }

  // ── sort select value ──
  const sortSelectValue = sort && order ? `${sort}_${order}` : "";

  const SORT_OPTIONS = [
    { value: "", label: "預設排序" },
    { value: "launchMonth_asc", label: "預計上線月份（早→晚）" },
    { value: "launchMonth_desc", label: "預計上線月份（晚→早）" },
    { value: "updatedAt_desc", label: "最後更新日（新→舊）" },
    { value: "updatedAt_asc", label: "最後更新日（舊→新）" },
    { value: "budget_desc", label: "總預算（高→低）" },
    { value: "budget_asc", label: "總預算（低→高）" },
  ];

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Title order={2}>提案一覽</Title>
        <Button component={Link} to="/proposals/new">新增提案</Button>
      </Group>

      {/* ── 搜尋 + 篩選 inline bar ── */}
      <form onSubmit={handleFilterSubmit}>
        <Group gap={8} wrap="wrap" align="center">
          <input
            name="q"
            defaultValue={q}
            placeholder="搜尋案件名稱或客戶"
            className={`${styles.formInput} ${styles.searchInput}`}
          />
          <MultiSelect
            placeholder="客戶：全部"
            data={allClients}
            value={clientsLocal}
            onChange={setClientsLocal}
            w={200}
            clearable
            comboboxProps={{ withinPortal: true }}
          />
          <MultiSelect
            placeholder="目前階段：全部"
            data={ALL_STAGES}
            value={stagesLocal}
            onChange={setStagesLocal}
            w={200}
            clearable
            comboboxProps={{ withinPortal: true }}
          />
          <Group gap={4} align="center" wrap="nowrap">
            <input
              type="number"
              name="budgetMin"
              min={0}
              step={10000}
              defaultValue={budgetMin > 0 ? budgetMin : ""}
              placeholder="預算最低"
              className={`${styles.formInput} ${styles.budgetInput}`}
            />
            <Text size="sm" c="dimmed">—</Text>
            <input
              type="number"
              name="budgetMax"
              min={0}
              step={10000}
              defaultValue={budgetMax > 0 ? budgetMax : ""}
              placeholder="預算最高"
              className={`${styles.formInput} ${styles.budgetInput}`}
            />
          </Group>
          <select
            name="_sort"
            defaultValue={sortSelectValue}
            className={styles.formInput}
            title="排序方式"
            onChange={(e) => {
              const [s, o] = e.currentTarget.value.split("_");
              const form = e.currentTarget.form!;
              const sortInput = form.querySelector<HTMLInputElement>('input[name="sort"]');
              const orderInput = form.querySelector<HTMLInputElement>('input[name="order"]');
              if (sortInput) sortInput.value = s ?? "";
              if (orderInput) orderInput.value = o ?? "desc";
            }}
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <input type="hidden" name="sort" defaultValue={sort} />
          <input type="hidden" name="order" defaultValue={order || "desc"} />
          <button type="submit" className={`${styles.formInput} ${styles.formSubmitButton}`}>
            套用篩選
          </button>
          <a href="/proposals" className={`${styles.formInput} ${styles.linkButton}`}>清除</a>
        </Group>
      </form>

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
              <Table.Th>總預算</Table.Th>
              <Table.Th>預計上線月份</Table.Th>
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
                        {canEdit && (
                          <ActionIcon variant="light" color="orange" onClick={() => handleEdit(p)} title="編輯">
                            <IconPencil size={16} />
                          </ActionIcon>
                        )}
                        {canEdit && (
                          <ActionIcon variant="light" color="red" type="button" title="刪除" onClick={() => handleAskDelete(p)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        )}
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
              <TextInput name="title" label="案件名稱" defaultValue={editingProposal.title} required />
              <TextInput name="clientName" label="客戶" defaultValue={editingProposal.clientName} required />
              <NumberInput name="budget" label="總預算" defaultValue={editingProposal.budget} thousandSeparator="," />
              <TextInput type="month" name="launchMonth" label="預計上線月份" defaultValue={editingProposal.launchMonth?.slice(0, 7) ?? ""} />
              <Select
                name="stage"
                label="目前階段"
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
