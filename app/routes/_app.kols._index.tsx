import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { deleteKol, listKols, updateKol, type Kol } from "~/lib/mock-api";

// ─── constants ───────────────────────────────────────────────────────────────

const FOLLOWER_RANGES = [
  { key: "1000", label: "1,000+", min: 1000 },
  { key: "5000", label: "5,000+", min: 5000 },
  { key: "10000", label: "10K+", min: 10000 },
  { key: "50000", label: "50K+", min: 50000 },
  { key: "100000", label: "100K+", min: 100000 },
];

type SortKey = "name" | "followers" | "rating" | "collaborations";
type SortOrder = "asc" | "desc";

// ─── helpers ─────────────────────────────────────────────────────────────────

function getPrimaryTags(kol: Kol): string[] {
  if (kol.tags && kol.tags.length > 0) return kol.tags;
  return kol.categories ?? [];
}

function getFollowerBase(kol: Kol): number {
  return kol.social?.instagram ?? kol.followers ?? 0;
}

// ─── loader (all filtering / sorting / paging done server-side) ──────────────

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const sp = url.searchParams;

  const q = sp.get("q")?.trim().toLowerCase() ?? "";
  const view = sp.get("view") === "table" ? "table" : "card";
  const sortKey = (sp.get("sort") ?? "followers") as SortKey;
  const sortOrder = (sp.get("order") ?? "desc") as SortOrder;
  const page = Math.max(1, Number(sp.get("page") ?? "1"));
  const showFilters = sp.get("panel") === "filters";
  const deleted = sp.get("deleted") === "1";

  // multi-value params
  const followerRanges = sp.getAll("fr");
  const industries = sp.getAll("ind");
  const tags = sp.getAll("tag");
  const minRating = Number(sp.get("minRating") ?? "0");
  const maxRating = Number(sp.get("maxRating") ?? "5");

  let kols = await listKols();

  // --- text search ---
  if (q) {
    kols = kols.filter((kol) => {
      const t = getPrimaryTags(kol);
      return (
        kol.displayName.toLowerCase().includes(q) ||
        (kol.instagramHandle ?? "").toLowerCase().includes(q) ||
        (kol.industry ?? "").toLowerCase().includes(q) ||
        t.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }

  // --- follower ranges ---
  if (followerRanges.length > 0) {
    kols = kols.filter((kol) => {
      const base = getFollowerBase(kol);
      return followerRanges.some((rk) => {
        const range = FOLLOWER_RANGES.find((r) => r.key === rk);
        return range ? base >= range.min : false;
      });
    });
  }

  // --- industries ---
  if (industries.length > 0) {
    kols = kols.filter((kol) => industries.includes(kol.industry ?? ""));
  }

  // --- tags ---
  if (tags.length > 0) {
    kols = kols.filter((kol) => {
      const t = getPrimaryTags(kol);
      return tags.every((tag) => t.includes(tag));
    });
  }

  // --- rating ---
  kols = kols.filter((kol) => {
    const r = kol.rating ?? 0;
    return r >= minRating && r <= maxRating;
  });

  // --- sort ---
  const m = sortOrder === "asc" ? 1 : -1;
  kols.sort((a, b) => {
    if (sortKey === "name") return a.displayName.localeCompare(b.displayName) * m;
    if (sortKey === "followers") return (getFollowerBase(a) - getFollowerBase(b)) * m;
    if (sortKey === "rating") return ((a.rating ?? 0) - (b.rating ?? 0)) * m;
    return ((a.collaborations ?? 0) - (b.collaborations ?? 0)) * m;
  });

  // --- pagination ---
  const pageSize = view === "card" ? 8 : 10;
  const totalPages = Math.max(1, Math.ceil(kols.length / pageSize));
  const safePageNo = Math.min(page, totalPages);
  const pageRows = kols.slice((safePageNo - 1) * pageSize, safePageNo * pageSize);

  // derive filter options from ALL kols (before filtering)
  const allKols = await listKols();
  const allIndustries = [...new Set(allKols.map((k) => k.industry).filter(Boolean))] as string[];
  const allTags = [...new Set(allKols.flatMap((k) => getPrimaryTags(k)))];

  return json({
    deleted,
    pageRows,
    total: kols.length,
    totalPages,
    page: safePageNo,
    pageSize,
    view,
    sortKey,
    sortOrder,
    showFilters,
    followerRanges,
    industries,
    tags,
    minRating,
    maxRating,
    q,
    allIndustries,
    allTags,
    // active filter count for badge
    activeFilterCount:
      followerRanges.length + industries.length + tags.length +
      (minRating > 0 || maxRating < 5 ? 1 : 0),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const kolId = String(formData.get("kolId") ?? "");

  if (intent === "toggleFavorite") {
    const isFavorite = formData.get("isFavorite") === "true";
    if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
    await updateKol(kolId, { isFavorite: !isFavorite });
    const url = new URL(request.url);
    return redirect(url.pathname + url.search);
  }

  if (intent === "delete") {
    if (!kolId) {
      return json({ error: "Missing KOL id" }, { status: 400 });
    }

    await deleteKol(kolId);

    const url = new URL(request.url);
    url.searchParams.set("deleted", "1");
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  return null;
}

// ─── helpers for building URL strings ────────────────────────────────────────

/**
 * Returns a URLSearchParams string preserving all current params,
 * overriding / adding the supplied key-value pairs, and resetting page to 1.
 */
function buildUrl(
  base: Record<string, string | string[]>,
  overrides: Record<string, string | string[] | null>,
) {
  const out = new URLSearchParams();
  for (const [k, v] of Object.entries(base)) {
    if (Array.isArray(v)) v.forEach((val) => out.append(k, val));
    else if (v) out.set(k, v);
  }
  for (const [k, v] of Object.entries(overrides)) {
    out.delete(k);
    if (v !== null) {
      if (Array.isArray(v)) v.forEach((val) => out.append(k, val));
      else if (v) out.set(k, v);
    }
  }
  out.delete("page"); // reset to page 1 on any change
  return `?${out.toString()}`;
}

// ─── component ───────────────────────────────────────────────────────────────

export default function KolListPage() {
  const {
    pageRows, total, totalPages, page, view, sortKey, sortOrder,
    showFilters, followerRanges, industries, tags, minRating, maxRating,
    q, allIndustries, allTags, activeFilterCount, deleted,
  } = useLoaderData<typeof loader>();

  // Current params object for URL building
  const current: Record<string, string | string[]> = {
    ...(deleted ? { deleted: "1" } : {}),
    ...(q ? { q } : {}),
    view,
    sort: sortKey,
    order: sortOrder,
    ...(followerRanges.length ? { fr: followerRanges } : {}),
    ...(industries.length ? { ind: industries } : {}),
    ...(tags.length ? { tag: tags } : {}),
    ...(minRating > 0 ? { minRating: String(minRating) } : {}),
    ...(maxRating < 5 ? { maxRating: String(maxRating) } : {}),
    ...(showFilters ? { panel: "filters" } : {}),
  };

  function sortUrl(key: string) {
    const nextOrder =
      key === sortKey ? (sortOrder === "asc" ? "desc" : "asc") : "desc";
    return buildUrl(current, { sort: key, order: nextOrder });
  }

  function sortLabel(key: string) {
    if (key !== sortKey) return "";
    return sortOrder === "asc" ? " ↑" : " ↓";
  }

  return (
    <Stack gap="md">
      <script
        dangerouslySetInnerHTML={{
          __html: `
document.addEventListener('submit', function(e) {
  var form = e.target;
  if (!form || !form.getAttribute) return;
  var msg = form.getAttribute('data-confirm');
  if (!msg) return;
  if (!window.confirm(msg)) {
    e.preventDefault();
  }
});
          `,
        }}
      />
      {deleted && (
        <Alert color="green" variant="light">
          KOL 已刪除成功。
          <a
            href={buildUrl(current, { deleted: null })}
            style={{ marginLeft: 12, color: "var(--mantine-color-green-filled)", textDecoration: "none", fontWeight: 600 }}
          >
            關閉
          </a>
        </Alert>
      )}

      {/* ── page header ── */}
      <Group justify="space-between" align="flex-end">
        <Box>
          <Text c="dimmed" size="sm">KOL 管理</Text>
          <Title order={2}>KOL 一覽</Title>
        </Box>

        <Group gap="md" align="flex-end">
          <Group gap={0} style={{ border: "1px solid var(--mantine-color-default-border)", borderRadius: 6, overflow: "hidden" }}>
            <a
              href={buildUrl(current, { view: "card" })}
              style={{
                padding: "7px 18px",
                background: view === "card" ? "var(--mantine-color-blue-filled)" : "transparent",
                color: view === "card" ? "#fff" : "var(--mantine-color-text)",
                fontWeight: 500, fontSize: 14, textDecoration: "none",
                display: "inline-block",
                borderRight: "1px solid var(--mantine-color-default-border)",
              }}
            >卡片</a>
            <a
              href={buildUrl(current, { view: "table" })}
              style={{
                padding: "7px 18px",
                background: view === "table" ? "var(--mantine-color-blue-filled)" : "transparent",
                color: view === "table" ? "#fff" : "var(--mantine-color-text)",
                fontWeight: 500, fontSize: 14, textDecoration: "none",
                display: "inline-block",
              }}
            >表格</a>
          </Group>

          <Group gap="sm">
            <button
              type="button"
              style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }}
              onClick={() => { const dlg = document.getElementById('kol-batch-import-dialog') as HTMLDialogElement; if (dlg) dlg.showModal(); }}
            >
              📥 批量匯入
            </button>
            <Button component={Link} to="/kols/new">新增 KOL</Button>
          </Group>
        </Group>
      </Group>

      {/* ── search + filter bar ── */}
      <Group justify="space-between" align="flex-end" wrap="nowrap">
        {/*
          Search: a real HTML form. Submits by pressing Enter or clicking the button.
          Works entirely via browser native GET request.
        */}
        <form method="get" action="/kols" style={{ flex: 1, maxWidth: 520, display: "flex", gap: 8 }}>
          {/* preserve other params */}
          {view !== "card" && <input type="hidden" name="view" value={view} />}
          {sortKey !== "followers" && <input type="hidden" name="sort" value={sortKey} />}
          {sortOrder !== "desc" && <input type="hidden" name="order" value={sortOrder} />}
          {showFilters && <input type="hidden" name="panel" value="filters" />}
          {followerRanges.map((r) => <input key={r} type="hidden" name="fr" value={r} />)}
          {industries.map((i) => <input key={i} type="hidden" name="ind" value={i} />)}
          {tags.map((t) => <input key={t} type="hidden" name="tag" value={t} />)}
          {minRating > 0 && <input type="hidden" name="minRating" value={String(minRating)} />}
          {maxRating < 5 && <input type="hidden" name="maxRating" value={String(maxRating)} />}

          <input
            name="q"
            defaultValue={q}
            placeholder="搜尋 KOL 名稱、@帳號、產業或標籤（按 Enter 搜尋）"
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 6,
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)",
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "var(--mantine-color-blue-filled)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >搜尋</button>
          {q && (
            <a
              href={buildUrl(current, { q: null })}
              style={{
                padding: "8px 14px",
                border: "1px solid var(--mantine-color-default-border)",
                borderRadius: 6,
                textDecoration: "none",
                color: "var(--mantine-color-text)",
                fontSize: 14,
              }}
            >✕</a>
          )}
        </form>

        {/* filter panel toggle */}
        <a
          href={buildUrl(current, { panel: showFilters ? null : "filters" })}
          style={{
            padding: "8px 16px",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 6,
            textDecoration: "none",
            color: activeFilterCount > 0 ? "#fff" : "var(--mantine-color-text)",
            background: activeFilterCount > 0 ? "var(--mantine-color-blue-filled)" : "transparent",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          ⚙ 篩選{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </a>
      </Group>

      {/* ── filter panel (shown when ?panel=filters) ── */}
      {
        showFilters && (
          <Card withBorder>
            <Text fw={600} mb="md">篩選條件</Text>
            <form method="get" action="/kols">
              {/* preserve non-filter params */}
              <input type="hidden" name="view" value={view} />
              <input type="hidden" name="sort" value={sortKey} />
              <input type="hidden" name="order" value={sortOrder} />
              <input type="hidden" name="panel" value="filters" />
              {q && <input type="hidden" name="q" value={q} />}

              <Group align="flex-start" gap="xl" wrap="wrap">
                {/* follower ranges */}
                <Box style={{ minWidth: 160 }}>
                  <Text size="sm" fw={600} mb={6}>粉絲數</Text>
                  <Stack gap={4}>
                    {FOLLOWER_RANGES.map((r) => (
                      <label key={r.key} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }}>
                        <input
                          type="checkbox"
                          name="fr"
                          value={r.key}
                          defaultChecked={followerRanges.includes(r.key)}
                        />
                        {r.label}
                      </label>
                    ))}
                  </Stack>
                </Box>

                <Divider orientation="vertical" />

                {/* industries */}
                <Box style={{ minWidth: 160 }}>
                  <Text size="sm" fw={600} mb={6}>產業別</Text>
                  <Stack gap={4}>
                    {allIndustries.map((ind) => (
                      <label key={ind} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }}>
                        <input
                          type="checkbox"
                          name="ind"
                          value={ind}
                          defaultChecked={industries.includes(ind)}
                        />
                        {ind}
                      </label>
                    ))}
                  </Stack>
                </Box>

                <Divider orientation="vertical" />

                {/* tags */}
                <Box style={{ minWidth: 200 }}>
                  <Text size="sm" fw={600} mb={6}>標籤</Text>
                  {/* Script for instant visual feedback — fires before page reload */}
                  <script dangerouslySetInnerHTML={{
                    __html: `
                  document.addEventListener('change', function(e) {
                    var cb = e.target;
                    if (!cb || cb.name !== 'tag') return;
                    var label = cb.closest('label[data-tag-label]');
                    if (!label) return;
                    
                    var isChecked = cb.checked;
                    label.style.background = isChecked ? 'var(--mantine-color-blue-light, #dbe4ff)' : 'transparent';
                    label.style.border = isChecked ? '1px solid var(--mantine-color-blue-filled, #228be6)' : '1px solid var(--mantine-color-default-border, #ced4da)';
                    label.style.color = isChecked ? 'var(--mantine-color-blue-filled, #228be6)' : 'var(--mantine-color-text)';
                    label.style.fontWeight = isChecked ? '600' : '400';
                  });
                `}} />
                  <Group gap={6} wrap="wrap">
                    {allTags.map((tag) => (
                      <label
                        key={tag}
                        data-tag-label="1"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "3px 10px",
                          borderRadius: 20,
                          border: tags.includes(tag)
                            ? "1px solid var(--mantine-color-blue-filled)"
                            : "1px solid var(--mantine-color-default-border)",
                          background: tags.includes(tag) ? "var(--mantine-color-blue-light)" : "transparent",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: tags.includes(tag) ? 600 : 400,
                          color: tags.includes(tag) ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
                          transition: "all 120ms",
                        }}
                      >
                        <input
                          type="checkbox"
                          name="tag"
                          value={tag}
                          defaultChecked={tags.includes(tag)}
                          style={{ display: "none" }}
                        />
                        {tag}
                      </label>
                    ))}
                  </Group>
                </Box>

              </Group>

              <Group mt="md" gap="sm">
                <button
                  type="submit"
                  style={{
                    padding: "8px 20px",
                    background: "var(--mantine-color-blue-filled)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >套用篩選</button>
                <a
                  href={buildUrl({ view, sort: sortKey, order: sortOrder, panel: "filters" }, {})}
                  style={{
                    padding: "8px 20px",
                    border: "1px solid var(--mantine-color-default-border)",
                    borderRadius: 6,
                    textDecoration: "none",
                    color: "var(--mantine-color-text)",
                    fontSize: 14,
                  }}
                >清除篩選</a>
              </Group>
            </form>
          </Card>
        )
      }

      {/* ── results count ── */}
      <Text c="dimmed" size="sm">共 {total} 筆結果{q ? `（搜尋：${q}）` : ""}</Text>

      {/* ── CARD VIEW ── */}
      {
        view === "card" && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={24}>
            {pageRows.map((kol) => {
              const kolTags = getPrimaryTags(kol);
              return (
                <Card key={kol.id} withBorder radius="md" p="lg" style={{ position: "relative" }}>
                  <Form method="post" style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
                    <input type="hidden" name="intent" value="toggleFavorite" />
                    <input type="hidden" name="kolId" value={kol.id} />
                    <input type="hidden" name="isFavorite" value={String(kol.isFavorite)} />
                    <button
                      type="submit"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 24,
                        padding: 0,
                        lineHeight: 1,
                        color: kol.isFavorite ? "var(--mantine-color-yellow-filled)" : "var(--mantine-color-gray-4)",
                        textShadow: kol.isFavorite ? "0 0 2px rgba(250, 176, 5, 0.4)" : "none"
                      }}
                      title={kol.isFavorite ? "取消收藏" : "加入收藏"}
                    >
                      {kol.isFavorite ? "★" : "☆"}
                    </button>
                  </Form>
                  <Stack align="center" gap="xs">
                    <Avatar src={kol.avatarUrl} size={72} radius={999} />
                    <Text fw={600}>{kol.displayName}</Text>
                    <Text size="sm" c="dimmed">
                      @{kol.instagramHandle ?? kol.displayName.toLowerCase().replaceAll(" ", "")}
                    </Text>
                  </Stack>
                  <Divider my="sm" />
                  <Stack gap={4}>
                    <Text size="sm">IG {(kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()}</Text>
                    <Text size="sm">YT {(kol.social?.youtube ?? 0).toLocaleString()}</Text>
                    <Text size="sm">TT {(kol.social?.tiktok ?? 0).toLocaleString()}</Text>
                  </Stack>
                  <Group gap={6} mt="sm" wrap="wrap">
                    {kolTags.map((tag) => (
                      <Badge key={tag} variant="light" radius="xl" size="sm">{tag}</Badge>
                    ))}
                  </Group>
                  <Group justify="space-between" mt="sm">
                    <Text size="sm">⭐ {(kol.rating ?? 0).toFixed(1)}</Text>
                    <Text size="xs" c="dimmed">合作 {kol.collaborations ?? 0} 次</Text>
                  </Group>
                  <Group mt="sm" gap="xs">
                    <Button
                      variant="light"
                      size="xs"
                      fullWidth
                      component={Link}
                      to={`/kols/${kol.id}`}
                    >
                      查看詳情
                    </Button>
                    <Button
                      variant="default"
                      size="xs"
                      fullWidth
                      component={Link}
                      to={`/kols/${kol.id}/edit`}
                    >
                      編輯
                    </Button>
                    <Form
                      method="post"
                      data-confirm={`確定要刪除 ${kol.displayName} 嗎？此動作無法復原。`}
                      style={{ flex: 1 }}
                    >
                      <input type="hidden" name="intent" value="delete" />
                      <input type="hidden" name="kolId" value={kol.id} />
                      <Button type="submit" color="red" variant="light" size="xs" fullWidth>
                        刪除
                      </Button>
                    </Form>
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>
        )
      }

      {/* ── TABLE VIEW ── */}
      {
        view === "table" && (
          <Card withBorder>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Photo</Table.Th>
                  <Table.Th><a href={sortUrl("name")} style={{ textDecoration: "none", color: "inherit" }}>名稱{sortLabel("name")}</a></Table.Th>
                  <Table.Th>Instagram</Table.Th>
                  <Table.Th><a href={sortUrl("followers")} style={{ textDecoration: "none", color: "inherit" }}>粉絲數{sortLabel("followers")}</a></Table.Th>
                  <Table.Th>標籤</Table.Th>
                  <Table.Th><a href={sortUrl("rating")} style={{ textDecoration: "none", color: "inherit" }}>評分{sortLabel("rating")}</a></Table.Th>
                  <Table.Th><a href={sortUrl("collaborations")} style={{ textDecoration: "none", color: "inherit" }}>合作次數{sortLabel("collaborations")}</a></Table.Th>
                  <Table.Th>操作</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {pageRows.map((kol) => (
                  <Table.Tr key={kol.id}>
                    <Table.Td><Avatar src={kol.avatarUrl} size={32} radius="xl" /></Table.Td>
                    <Table.Td><Link to={`/kols/${kol.id}`}>{kol.displayName}</Link></Table.Td>
                    <Table.Td>@{kol.instagramHandle ?? "-"}</Table.Td>
                    <Table.Td>{(kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()}</Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        {getPrimaryTags(kol).slice(0, 2).map((tag) => (
                          <Badge key={tag} size="sm" variant="light">{tag}</Badge>
                        ))}
                      </Group>
                    </Table.Td>
                    <Table.Td>⭐ {(kol.rating ?? 0).toFixed(1)}</Table.Td>
                    <Table.Td>{kol.collaborations ?? 0}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Form method="post" style={{ display: "inline" }}>
                          <input type="hidden" name="intent" value="toggleFavorite" />
                          <input type="hidden" name="kolId" value={kol.id} />
                          <input type="hidden" name="isFavorite" value={String(kol.isFavorite)} />
                          <button
                            type="submit"
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 20,
                              padding: 0,
                              lineHeight: 1,
                              color: kol.isFavorite ? "var(--mantine-color-yellow-filled)" : "var(--mantine-color-gray-4)",
                            }}
                            title={kol.isFavorite ? "取消收藏" : "加入收藏"}
                          >
                            {kol.isFavorite ? "★" : "☆"}
                          </button>
                        </Form>
                        <Button component={Link} to={`/kols/${kol.id}`} variant="light" size="xs">查看</Button>
                        <Button component={Link} to={`/kols/${kol.id}/edit`} variant="default" size="xs">編輯</Button>
                        <Form
                          method="post"
                          data-confirm={`確定要刪除 ${kol.displayName} 嗎？此動作無法復原。`}
                          style={{ display: "inline" }}
                        >
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="kolId" value={kol.id} />
                          <Button type="submit" color="red" variant="subtle" size="xs">刪除</Button>
                        </Form>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        )
      }

      {/* ── pagination ── */}
      {
        totalPages > 1 && (
          <Group justify="center">
            <Group gap={4}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries(current).filter(([, v]) => !Array.isArray(v))), page: String(p) }).toString()}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: "1px solid var(--mantine-color-default-border)",
                    background: p === page ? "var(--mantine-color-blue-filled)" : "transparent",
                    color: p === page ? "#fff" : "var(--mantine-color-text)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: p === page ? 600 : 400,
                  }}
                >
                  {p}
                </a>
              ))}
            </Group>
          </Group>
        )
      }

      {/* ── Batch Import Dialog ── */}
      <dialog
        id="kol-batch-import-dialog"
        style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          width: "100%",
          maxWidth: 500,
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
        }}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>批量匯入 KOL (Excel)</Title>
          <button
            type="button"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--mantine-color-text)" }}
            onClick={(e) => { (e.currentTarget.closest('dialog') as HTMLDialogElement).close(); }}
          >
            ✕
          </button>
        </Group>
        <Text size="sm" c="dimmed" mb="lg">
          請上傳包含 KOL 名稱、平台連結、粉絲數等資訊的 Excel 檔案。系統會自動解析並建檔。（功能展示版）
        </Text>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            border: "2px dashed var(--mantine-color-blue-4)",
            borderRadius: "8px",
            backgroundColor: "var(--mantine-color-blue-light)",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-1)"; }}
          onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)"; }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
            const fileInput = document.getElementById('kol-batch-excel-input') as HTMLInputElement;
            if (fileInput && e.dataTransfer.files.length > 0) {
              fileInput.files = e.dataTransfer.files;
              fileInput.dispatchEvent(new Event('change'));
            }
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>📤</div>
          <Text fw={600} color="var(--mantine-color-blue-filled)">點擊或拖曳 Excel 檔案至此</Text>
          <Text size="sm" c="dimmed" mt={4}>支援 .xlsx, .csv</Text>
          <input
            id="kol-batch-excel-input"
            type="file"
            accept=".xlsx, .xls, .csv"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                // Simulate processing
                const dlg = e.target.closest('dialog');
                const label = e.target.closest('label');
                if (label) (label as HTMLElement).style.opacity = '0.5';

                setTimeout(() => {
                  alert("✅ 發送至後端處理中...成功建立 23 筆 KOL 資料！");
                  if (label) (label as HTMLElement).style.opacity = '1';
                  if (dlg) (dlg as HTMLDialogElement).close();
                  e.target.value = '';
                }, 800);
              }
            }}
          />
        </label>

        <Group justify="space-between" mt="xl">
          <a href="#" style={{ fontSize: 13, color: "var(--mantine-color-blue-filled)", textDecoration: "none" }}>下載 Excel 建檔範本</a>
          <button
            type="button"
            style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", cursor: "pointer", fontSize: 14 }}
            onClick={(e) => { (e.currentTarget.closest('dialog') as HTMLDialogElement).close(); }}
          >
            取消
          </button>
        </Group>
      </dialog>
    </Stack >
  );
}

















