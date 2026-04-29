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
  TextInput,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import {
  clearKolFavorites,
  createFavoriteFolder,
  deleteFavoriteFolder,
  listFavoriteFolderDetails,
  listKols,
  removeKolFromFavoriteFolder,
  renameFavoriteFolder,
  replaceKolFavoriteFolders,
  type FavoriteFolder,
  type Kol,
} from "~/lib/mock-api.server";

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

  const [allKols, folderDetails] = await Promise.all([
    listKols().catch(() => [] as Kol[]),
    listFavoriteFolderDetails().catch(() => [] as FavoriteFolder[]),
  ]);

  const favorites = allKols.filter((k) => k.isFavorite);
  const allFolders = ["全部", ...folderDetails.map((item) => item.name)];
  const folderFiltered = folder === "全部"
    ? favorites
    : favorites.filter((kol) => (kol.favoriteFolders ?? []).includes(folder));

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
  const folderCounts = allFolders.reduce<Record<string, number>>((acc, folderName) => {
    acc[folderName] = folderName === "全部"
      ? favorites.length
      : favorites.filter((kol) => (kol.favoriteFolders ?? []).includes(folderName)).length;
    return acc;
  }, {});

  return json({ rows, allFolders, folderCounts, folderDetails, search, sort, folder });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");
  const url = new URL(request.url);

  if (intent === "removeFavorite") {
    const kolId = String(formData.get("kolId") ?? "");
    if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
    await clearKolFavorites(kolId);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "updateKolFolders") {
    const kolId = String(formData.get("kolId") ?? "");
    const selectedFolders = String(formData.get("selectedFolders") ?? "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);
    if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
    await replaceKolFavoriteFolders(kolId, selectedFolders);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "removeFromFolder") {
    const kolId = String(formData.get("kolId") ?? "");
    const targetFolder = String(formData.get("targetFolder") ?? "");
    if (!kolId || !targetFolder) return json({ error: "Missing folder data" }, { status: 400 });
    await removeKolFromFavoriteFolder(kolId, targetFolder);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "createFolder") {
    const name = String(formData.get("folderName") ?? "").trim();
    if (!name) return json({ error: "資料夾名稱不得為空" }, { status: 400 });
    await createFavoriteFolder(name);
    url.searchParams.set("folder", name);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "renameFolder") {
    const oldName = String(formData.get("oldFolderName") ?? "").trim();
    const newName = String(formData.get("newFolderName") ?? "").trim();
    if (!oldName || !newName) return json({ error: "資料夾名稱不得為空" }, { status: 400 });
    await renameFavoriteFolder(oldName, newName);
    url.searchParams.set("folder", newName);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "deleteFolder") {
    const name = String(formData.get("folderName") ?? "").trim();
    if (!name) return json({ error: "資料夾名稱不得為空" }, { status: 400 });
    await deleteFavoriteFolder(name);
    if (url.searchParams.get("folder") === name) {
      url.searchParams.set("folder", "全部");
    }
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  return null;
}

export default function FavoritesPage() {
  const { rows, allFolders, folderCounts, folderDetails, search, sort, folder } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [managingKol, setManagingKol] = useState<Kol | null>(null);
  const [folderSelection, setFolderSelection] = useState<string[]>([]);
  const [renamingFolder, setRenamingFolder] = useState(folder === "全部" ? "" : folder);
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const currentFolderDetail = folderDetails.find((item) => item.name === folder) ?? null;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : rows.map((r) => r.id));
  };

  const openManageFolders = (kol: Kol) => {
    setManagingKol(kol);
    setFolderSelection(kol.favoriteFolders ?? []);
    const dialog = document.getElementById("manage-kol-folders-dialog") as HTMLDialogElement | null;
    dialog?.showModal();
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
          <button
            type="button"
            style={{ ...inputStyle, cursor: "pointer", fontWeight: 500 }}
            onClick={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement | null; d?.showModal(); }}
          >
            + 新增資料夾
          </button>
        </Group>
      </Group>

      {currentFolderDetail && (
        <Card withBorder>
          <Group justify="space-between" align="end">
            <Stack gap={4}>
              <Text fw={600}>管理目前資料夾：{currentFolderDetail.name}</Text>
              <Text size="sm" c="dimmed">可直接改名或刪除資料夾；刪除後只會移除資料夾關聯，不會刪掉 KOL。</Text>
            </Stack>
            <Group gap="xs">
              <Form method="post">
                <input type="hidden" name="intent" value="renameFolder" />
                <input type="hidden" name="oldFolderName" value={currentFolderDetail.name} />
                <Group gap="xs">
                  <TextInput
                    name="newFolderName"
                    size="xs"
                    value={renamingFolder}
                    onChange={(event) => setRenamingFolder(event.currentTarget.value)}
                    placeholder="新的資料夾名稱"
                  />
                  <Button type="submit" size="xs" variant="light">改名</Button>
                </Group>
              </Form>
              <Form method="post">
                <input type="hidden" name="intent" value="deleteFolder" />
                <input type="hidden" name="folderName" value={currentFolderDetail.name} />
                <Button type="submit" size="xs" color="red" variant="light">刪除資料夾</Button>
              </Form>
            </Group>
          </Group>
        </Card>
      )}

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
      </Group>

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
              <Box style={{ position: "absolute", top: 10, left: 10 }} onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={selectedIds.includes(kol.id)} onChange={() => toggleSelect(kol.id)} />
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

              <Box mt="sm">
                <Text size="xs" c="dimmed" mb={4}>收藏資料夾：</Text>
                <Group gap={6}>
                  {(kol.favoriteFolders ?? []).length > 0 ? (
                    (kol.favoriteFolders ?? []).map((folderName) => (
                      <Badge key={folderName} variant="light" color={folderName === folder ? "blue" : "gray"} size="sm">
                        {folderName}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="light" color="gray" size="sm">未分類</Badge>
                  )}
                </Group>
              </Box>

              <Group justify="space-between" mt="sm" onClick={(e) => e.stopPropagation()}>
                <Text>⭐ {(kol.rating ?? 0).toFixed(1)}</Text>
                <Group gap="xs">
                  <Link to={`/kols/${kol.id}`} style={{ fontSize: 14 }}>查看詳細</Link>
                  {folder !== "全部" && (kol.favoriteFolders ?? []).includes(folder) && (
                    <Form method="post" style={{ margin: 0 }}>
                      <input type="hidden" name="intent" value="removeFromFolder" />
                      <input type="hidden" name="kolId" value={kol.id} />
                      <input type="hidden" name="targetFolder" value={folder} />
                      <button
                        type="submit"
                        style={{
                          background: "none",
                          border: "1px solid var(--mantine-color-yellow-light)",
                          color: "var(--mantine-color-yellow-filled)",
                          padding: "2px 8px",
                          borderRadius: 4,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        移出本資料夾
                      </button>
                    </Form>
                  )}
                  <button
                    type="button"
                    onClick={() => openManageFolders(kol)}
                    style={{
                      background: "none",
                      border: "1px solid var(--mantine-color-blue-light)",
                      color: "var(--mantine-color-blue-filled)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    管理資料夾
                  </button>
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
                        cursor: "pointer",
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
            onClick={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement | null; d?.close(); }}
          >
            ✕
          </button>
        </Group>
        <Form method="post" onSubmit={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement | null; d?.close(); }}>
          <input type="hidden" name="intent" value="createFolder" />
          <Stack gap="md">
            <TextInput name="folderName" label="資料夾名稱" placeholder="例如：母嬰專案" required />
            <Group justify="flex-end">
              <Button variant="default" type="button" onClick={() => { const d = document.getElementById("add-folder-dialog") as HTMLDialogElement | null; d?.close(); }}>取消</Button>
              <Button type="submit">建立</Button>
            </Group>
          </Stack>
        </Form>
      </dialog>

      <dialog
        id="manage-kol-folders-dialog"
        style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          minWidth: 360,
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
        }}
        onClose={() => setManagingKol(null)}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>管理收藏資料夾</Title>
          <button
            type="button"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--mantine-color-text)" }}
            onClick={() => {
              setManagingKol(null);
              (document.getElementById("manage-kol-folders-dialog") as HTMLDialogElement | null)?.close();
            }}
          >
            ✕
          </button>
        </Group>
        <Form
          method="post"
          onSubmit={() => {
            setManagingKol(null);
            (document.getElementById("manage-kol-folders-dialog") as HTMLDialogElement | null)?.close();
          }}
        >
          <input type="hidden" name="intent" value="updateKolFolders" />
          <input type="hidden" name="kolId" value={managingKol?.id ?? ""} />
          <input type="hidden" name="selectedFolders" value={folderSelection.join(",")} />
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              {managingKol ? `為 ${managingKol.displayName} 勾選要保留或追加的資料夾。` : "請選擇資料夾。"}
            </Text>
            {folderDetails.length === 0 ? (
              <Text size="sm" c="dimmed">目前還沒有資料夾，請先建立資料夾。</Text>
            ) : (
              folderDetails.map((item) => (
                <Checkbox
                  key={item.name}
                  label={`${item.name} (${item.kolCount} 位)`}
                  checked={folderSelection.includes(item.name)}
                  onChange={(event) => {
                    if (event.currentTarget.checked) {
                      setFolderSelection((prev) => [...prev, item.name]);
                    } else {
                      setFolderSelection((prev) => prev.filter((name) => name !== item.name));
                    }
                  }}
                />
              ))
            )}
            <Group justify="flex-end" mt="md">
              <Button
                variant="default"
                type="button"
                onClick={() => {
                  setManagingKol(null);
                  (document.getElementById("manage-kol-folders-dialog") as HTMLDialogElement | null)?.close();
                }}
              >
                取消
              </Button>
              <Button type="submit">儲存資料夾設定</Button>
            </Group>
          </Stack>
        </Form>
      </dialog>
    </Stack>
  );
}
