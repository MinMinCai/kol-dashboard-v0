import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { createFavoriteFolder, listFavoriteFolders, listKols, updateKol, type Kol } from "~/lib/mock-api.server";

type SortMode = "rating_desc" | "followers_desc" | "name_asc";

function sortRows(rows: Kol[], sort: SortMode) {
  const list = [...rows];
  if (sort === "name_asc") return list.sort((a, b) => a.displayName.localeCompare(b.displayName));
  if (sort === "followers_desc") return list.sort((a, b) => (b.social?.instagram ?? b.followers ?? 0) - (a.social?.instagram ?? a.followers ?? 0));
  return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? "";
  const sort = (url.searchParams.get("sort") ?? "rating_desc") as SortMode;
  const folder = url.searchParams.get("folder") ?? "全部";

  const [allKols, savedFolders] = await Promise.all([
    listKols().catch(() => [] as Kol[]),
    listFavoriteFolders(),
  ]);
  const favorites = allKols.filter((k) => k.isFavorite);

  // Merge saved folders + any folders already used by KOLs (for backwards compat)
  const usedFolders = favorites.map((r) => r.favoriteFolder).filter(Boolean) as string[];
  const folderSet = new Set([...savedFolders, ...usedFolders]);
  const allFolders = ["全部", ...Array.from(folderSet)];

  const folderFiltered = folder === "全部" ? favorites : favorites.filter((r) => (r.favoriteFolder ?? "未分類") === folder);

  const q = search.trim().toLowerCase();
  const searched = folderFiltered.filter((r) => {
    if (!q) return true;
    return (
      r.displayName.toLowerCase().includes(q) ||
      (r.instagramHandle ?? "").toLowerCase().includes(q) ||
      (r.industry ?? "").toLowerCase().includes(q) ||
      (r.tags ?? r.categories).some((t) => t.toLowerCase().includes(q))
    );
  });

  const rows = sortRows(searched, sort);
  const folderCounts = allFolders.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === "全部" ? favorites.length : favorites.filter((r) => (r.favoriteFolder ?? "未分類") === f).length;
    return acc;
  }, {});

  return json({ rows, allFolders, folderCounts, search, sort, folder });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "removeFavorite") {
    const kolId = String(formData.get("kolId") ?? "");
    if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
    await updateKol(kolId, { isFavorite: false });
    const url = new URL(request.url);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "moveFolder") {
    const kolId = String(formData.get("kolId") ?? "");
    const targetFolder = String(formData.get("targetFolder") ?? "");
    if (kolId) await updateKol(kolId, { favoriteFolder: targetFolder || undefined });
    return json({ success: true });
  }

  if (intent === "createFolder") {
    const name = String(formData.get("folderName") ?? "").trim();
    if (!name) return json({ error: "資料夾名稱不得為空" }, { status: 400 });
    await createFavoriteFolder(name);
    const url = new URL(request.url);
    url.searchParams.set("folder", name);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  return null;
}

export default function FavoritesPage() {
  const { rows, allFolders, folderCounts, search, sort, folder } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : rows.map((r) => r.id));
  };

  const handleExportExcel = async () => {
    const targets = rows.filter((r) => selectedIds.includes(r.id));
    if (targets.length === 0) { alert("請先勾選要匯出的 KOL"); return; }

    const XLSX = await import("xlsx");
    const data = targets.map((k) => ({
      "KOL 名稱": k.displayName,
      "IG 帳號": k.instagramHandle ?? "",
      "IG 粉絲數": k.social?.instagram ?? k.followers ?? 0,
      "YT 訂閱數": k.social?.youtube ?? 0,
      "TT 粉絲數": k.social?.tiktok ?? 0,
      "互動率 (%)": k.engagementRate ?? 0,
      "曝光率 (%)": k.exposureRate ?? 0,
      "評分": k.rating ?? 0,
      "合作次數": k.collaborations ?? 0,
      "資料夾": k.favoriteFolder ?? "未分類",
      "標籤": (k.tags ?? k.categories).join(", "),
      "IG 連結": k.socialLinks?.instagram ?? (k.instagramHandle ? `https://instagram.com/${k.instagramHandle}` : ""),
      "YT 連結": k.socialLinks?.youtube ?? "",
      "TT 連結": k.socialLinks?.tiktok ?? "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "收藏名單");
    XLSX.writeFile(wb, `KOL收藏名單_${folder}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const inputStyle = {
    padding: "8px 12px",
    border: "1px solid var(--mantine-color-default-border)",
    borderRadius: 4,
    fontSize: 14,
    background: "var(--mantine-color-body)",
    color: "var(--mantine-color-text)",
  } as const;

  return (
    <Stack gap="md">
      <Group justify="space-between" align="end">
        <Title order={2}>我的收藏 ({rows.length})</Title>
        <Group gap="xs">
          {selectedIds.length > 0 && (
            <Button variant="light" color="green" size="sm" onClick={handleExportExcel}>
              ⬇ 匯出 Excel ({selectedIds.length} 筆)
            </Button>
          )}
          <button
            type="button"
            style={{ ...inputStyle, cursor: "pointer", fontWeight: 500 }}
            onClick={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement; if (d) d.showModal(); }}
          >
            + 新增資料夾
          </button>
        </Group>
      </Group>

      {/* ── Search & Sort ── */}
      <form method="get" style={{ display: "contents" }}>
        <input type="hidden" name="folder" value={folder} />
        <Group>
          <input name="search" defaultValue={search} placeholder="搜尋收藏 KOL" style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
          <select name="sort" defaultValue={sort} style={inputStyle} aria-label="排序方式">
            <option value="rating_desc">評分由高到低</option>
            <option value="followers_desc">粉絲由高到低</option>
            <option value="name_asc">名稱 A-Z</option>
          </select>
          <button type="submit" style={{ ...inputStyle, cursor: "pointer", background: "var(--mantine-color-blue-filled)", color: "#fff", border: "none", fontWeight: 600 }}>
            套用
          </button>
        </Group>
      </form>

      {/* ── Folder tabs ── */}
      <Group>
        {allFolders.map((f) => (
          <a
            key={f}
            href={`/favorites?search=${encodeURIComponent(search)}&sort=${sort}&folder=${encodeURIComponent(f)}`}
            style={{
              padding: "6px 14px",
              borderRadius: 4,
              border: "1px solid var(--mantine-color-default-border)",
              textDecoration: "none",
              background: folder === f ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-body)",
              color: folder === f ? "#fff" : "var(--mantine-color-text)",
              fontWeight: folder === f ? 600 : 400,
              fontSize: 14,
            }}
          >
            {f} ({folderCounts[f] ?? 0})
          </a>
        ))}
        <button
          type="button"
          style={{ ...inputStyle, cursor: "pointer", background: "transparent", border: "none", color: "var(--mantine-color-blue-filled)" }}
          onClick={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement; if (d) d.showModal(); }}
        >
          + 新增
        </button>
      </Group>

      {/* ── Batch select toolbar ── */}
      {rows.length > 0 && (
        <Group gap="xs">
          <Checkbox
            checked={allSelected}
            indeterminate={selectedIds.length > 0 && !allSelected}
            onChange={toggleAll}
            label={allSelected ? "取消全選" : `全選 (${rows.length} 筆)`}
          />
          {selectedIds.length > 0 && (
            <Text size="sm" c="dimmed">已選 {selectedIds.length} 筆</Text>
          )}
        </Group>
      )}

      {/* ── KOL Grid ── */}
      {rows.length === 0 ? (
        <Card withBorder p="xl" style={{ textAlign: "center" }}>
          <Text size="48px">📂</Text>
          <Title order={3}>此資料夾尚無 KOL</Title>
          <Text c="dimmed" mb="md">請切換資料夾，或前往 KOL 頁面加入收藏</Text>
          <Button component={Link} to="/kols">瀏覽 KOL</Button>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={24}>
          {rows.map((kol) => (
            <Card
              key={kol.id}
              withBorder
              style={{ cursor: "pointer", outline: selectedIds.includes(kol.id) ? "2px solid var(--mantine-color-blue-filled)" : undefined }}
              onClick={() => navigate(`/kols/${kol.id}`)}
            >
              {/* Checkbox */}
              <Box style={{ position: "absolute", top: 10, left: 10 }} onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.includes(kol.id)}
                  onChange={() => toggleSelect(kol.id)}
                />
              </Box>

              <Stack align="center" gap={6} mt="xs">
                <Avatar src={kol.avatarUrl} size={72} radius={999} />
                <Text fw={600}>{kol.displayName}</Text>
                <Text size="sm" c="dimmed">@{kol.instagramHandle ?? "-"}</Text>
              </Stack>

              <Stack mt="sm" gap={4}>
                <Text size="sm">IG {(kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()}</Text>
                <Text size="sm">YT {(kol.social?.youtube ?? 0).toLocaleString()}</Text>
                <Text size="sm">TT {(kol.social?.tiktok ?? 0).toLocaleString()}</Text>
              </Stack>

              <Group gap={6} mt="sm">
                {(kol.tags ?? kol.categories).slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="light" radius="xl">{tag}</Badge>
                ))}
              </Group>

              {/* Current folder badge */}
              <Box mt="sm">
                <Text size="xs" c="dimmed" mb={4}>收藏資料夾：</Text>
                <Badge variant="light" color={kol.favoriteFolder ? "blue" : "gray"} size="sm">
                  {kol.favoriteFolder ?? "未分類"}
                </Badge>
              </Box>

              <Group justify="space-between" mt="sm" onClick={(e) => e.stopPropagation()}>
                <Text>⭐ {(kol.rating ?? 0).toFixed(1)}</Text>
                <Group gap="xs">
                  <Link to={`/kols/${kol.id}`} style={{ fontSize: 14 }}>查看詳細</Link>
                  <Form method="post" style={{ margin: 0 }}>
                    <input type="hidden" name="intent" value="removeFavorite" />
                    <input type="hidden" name="kolId" value={kol.id} />
                    <button
                      type="submit"
                      style={{
                        background: "none",
                        border: "1px solid var(--mantine-color-red-light)",
                        color: "var(--mantine-color-red-filled)",
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      取消收藏
                    </button>
                  </Form>
                </Group>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* ── Add Folder Dialog (form-based, server-persisted) ── */}
      <dialog
        id="add-folder-dialog"
        style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          minWidth: 320,
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
        }}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>新增資料夾</Title>
          <button
            type="button"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--mantine-color-text)" }}
            onClick={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement; if (d) d.close(); }}
          >
            ✕
          </button>
        </Group>
        <Form
          method="post"
          onSubmit={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement; if (d) d.close(); }}
        >
          <input type="hidden" name="intent" value="createFolder" />
          <Stack gap="md">
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>資料夾名稱</label>
              <input
                name="folderName"
                type="text"
                placeholder="例如：母嬰專案"
                required
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  fontSize: 14,
                  background: "var(--mantine-color-body)",
                  color: "var(--mantine-color-text)",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <Group justify="flex-end">
              <button
                type="button"
                style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", cursor: "pointer", fontSize: 14 }}
                onClick={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement; if (d) d.close(); }}
              >
                取消
              </button>
              <button
                type="submit"
                style={{ padding: "8px 16px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
              >
                建立
              </button>
            </Group>
          </Stack>
        </Form>
      </dialog>
    </Stack>
  );
}
