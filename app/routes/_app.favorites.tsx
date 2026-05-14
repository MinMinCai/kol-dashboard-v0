import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Menu,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandYoutube, IconEye, IconPhone } from "@tabler/icons-react";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { buildSocialProfileUrl } from "~/lib/social-links";
import { getCurrentMember } from "~/lib/demo-identity.server";
import styles from "./_app.favorites.module.css";
import {
  clearKolFavorites,
  createFavoriteFolder,
  deleteFavoriteFolder,
  listFavoriteFolderDetails,
  listKols,
  listTeamMembers,
  removeKolFromFavoriteFolder,
  renameFavoriteFolder,
  replaceKolFavoriteFolders,
  setFavoriteFolderShares,
  type FavoriteFolder,
  type Kol,
  type TeamMember,
} from "~/lib/mock-api.server";

type SortMode = "rating_desc" | "followers_desc" | "name_asc";

function withTimeout<T>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

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

  const currentMember = await getCurrentMember(request).catch(() => null);
  const memberId = currentMember?.id;

  const [allKols, folderDetails, teamMembers] = await Promise.all([
    withTimeout(listKols(), [] as Kol[]),
    withTimeout(listFavoriteFolderDetails(memberId), [] as FavoriteFolder[]),
    withTimeout(listTeamMembers(), [] as TeamMember[]),
  ]);

  // Folder names visible to the current member (own + shared + public).
  const visibleFolderNames = new Set(folderDetails.map((f) => f.name));

  // Favorites are filtered to only include those that belong to a folder the
  // current member can see — if a KOL only sits in folders that aren't ours
  // and aren't shared with us, they don't appear in our "我的收藏" view.
  const favorites = allKols.filter((k) => {
    if (!k.isFavorite) return false;
    const folders = k.favoriteFolders ?? [];
    if (folders.length === 0) return memberId ? false : true; // unfiled favorites only show without a member context
    return folders.some((f) => visibleFolderNames.has(f));
  });

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

  return json({
    rows,
    allFolders,
    folderCounts,
    folderDetails,
    search,
    sort,
    folder,
    currentMember,
    teamMembers,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");
  const url = new URL(request.url);
  const currentMember = await getCurrentMember(request).catch(() => null);
  const memberId = currentMember?.id;

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
    try {
      await replaceKolFavoriteFolders(kolId, selectedFolders, memberId);
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "更新失敗" }, { status: 403 });
    }
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "removeFromFolder") {
    const kolId = String(formData.get("kolId") ?? "");
    const targetFolder = String(formData.get("targetFolder") ?? "");
    if (!kolId || !targetFolder) return json({ error: "Missing folder data" }, { status: 400 });
    try {
      await removeKolFromFavoriteFolder(kolId, targetFolder, memberId);
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "操作失敗" }, { status: 403 });
    }
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "createFolder") {
    const name = String(formData.get("folderName") ?? "").trim();
    if (!name) return json({ error: "資料夾名稱不得為空" }, { status: 400 });
    await createFavoriteFolder(name, memberId);
    url.searchParams.set("folder", name);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "renameFolder") {
    const oldName = String(formData.get("oldFolderName") ?? "").trim();
    const newName = String(formData.get("newFolderName") ?? "").trim();
    if (!oldName || !newName) return json({ error: "資料夾名稱不得為空" }, { status: 400 });
    try {
      await renameFavoriteFolder(oldName, newName, memberId);
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "操作失敗" }, { status: 403 });
    }
    url.searchParams.set("folder", newName);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "deleteFolder") {
    const name = String(formData.get("folderName") ?? "").trim();
    if (!name) return json({ error: "資料夾名稱不得為空" }, { status: 400 });
    try {
      await deleteFavoriteFolder(name, memberId);
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "操作失敗" }, { status: 403 });
    }
    if (url.searchParams.get("folder") === name) {
      url.searchParams.set("folder", "全部");
    }
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  if (intent === "shareFolder") {
    const folderName = String(formData.get("folderName") ?? "").trim();
    const memberIdsRaw = String(formData.get("sharedMemberIds") ?? "");
    const sharedMemberIds = memberIdsRaw.split(",").map((s) => s.trim()).filter(Boolean);
    if (!folderName) return json({ error: "缺少資料夾名稱" }, { status: 400 });
    if (!memberId) return json({ error: "找不到目前身分" }, { status: 400 });
    try {
      await setFavoriteFolderShares(folderName, sharedMemberIds, memberId);
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "操作失敗" }, { status: 403 });
    }
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  return null;
}

export default function FavoritesPage() {
  const { rows, folderCounts, folderDetails, search, sort, folder, currentMember, teamMembers } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [contactKol, setContactKol] = useState<Kol | null>(null);
  const [managingKol, setManagingKol] = useState<Kol | null>(null);
  const [folderSelection, setFolderSelection] = useState<string[]>([]);
  const [renamingFolder, setRenamingFolder] = useState(folder === "全部" ? "" : folder);
  const [shareSelection, setShareSelection] = useState<string[]>([]);
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const currentFolderDetail = folderDetails.find((item) => item.name === folder) ?? null;
  const isCurrentFolderOwner = currentFolderDetail?.access === "owner" || currentFolderDetail?.access === "public";

  // Owned + (legacy) public folders the current user can write to.
  const ownedFolders = folderDetails.filter((f) => f.access === "owner" || f.access === "public");
  const sharedFolders = folderDetails.filter((f) => f.access === "shared");

  // Folder access lookup for the KOL-card folder picker (disable shared rows).
  const accessByFolderName = new Map(folderDetails.map((f) => [f.name, f.access]));

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

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <Title order={2}>我的收藏 ({rows.length})</Title>
        {currentMember ? (
          <Text size="sm" c="dimmed">
            目前以 <Badge variant="light" color="grape" size="sm">{currentMember.name}</Badge> 身分檢視
          </Text>
        ) : (
          <Text size="sm" c="dimmed">尚未指定身分（請於 系統設定 &gt; 團隊成員 新增成員）</Text>
        )}
      </Group>

      {actionData?.error && (
        <Alert color="red" variant="light" title="操作失敗">{actionData.error}</Alert>
      )}

      {currentFolderDetail && (
        <Card withBorder>
          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Stack gap={4}>
              <Group gap={6}>
                <Text fw={600}>管理目前資料夾：{currentFolderDetail.name}</Text>
                {currentFolderDetail.access === "owner" && (
                  <Badge size="sm" variant="light" color="blue">擁有者</Badge>
                )}
                {currentFolderDetail.access === "shared" && (
                  <Badge size="sm" variant="light" color="grape">
                    共享自 {currentFolderDetail.ownerName ?? "其他成員"}
                  </Badge>
                )}
                {currentFolderDetail.access === "public" && (
                  <Badge size="sm" variant="light" color="gray">公開</Badge>
                )}
                {currentFolderDetail.sharedWithMemberIds && currentFolderDetail.sharedWithMemberIds.length > 0 && (
                  <Badge size="sm" variant="light" color="cyan">
                    🔗 已共享給 {currentFolderDetail.sharedWithMemberIds.length} 位成員
                  </Badge>
                )}
              </Group>
              <Text size="sm" c="dimmed">
                {currentFolderDetail.access === "shared"
                  ? "你只能檢視此資料夾的內容，僅擁有者可以編輯、刪除或調整共享。"
                  : "可直接改名或刪除資料夾，並調整共享對象；刪除後只會移除資料夾關聯，不會刪掉 KOL。"}
              </Text>
            </Stack>
            {isCurrentFolderOwner && (
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
                <Button
                  size="xs"
                  variant="light"
                  color="grape"
                  onClick={() => {
                    setShareSelection(currentFolderDetail.sharedWithMemberIds ?? []);
                    const dlg = document.getElementById("share-folder-dialog") as HTMLDialogElement | null;
                    dlg?.showModal();
                  }}
                  disabled={!currentMember}
                >
                  🔗 共享設定
                </Button>
                <Form method="post">
                  <input type="hidden" name="intent" value="deleteFolder" />
                  <input type="hidden" name="folderName" value={currentFolderDetail.name} />
                  <Button type="submit" size="xs" color="red" variant="light">刪除資料夾</Button>
                </Form>
              </Group>
            )}
          </Group>
        </Card>
      )}

      <form method="get" className={styles.formContents}>
        <input type="hidden" name="folder" value={folder} />
        <Group wrap="wrap">
          <input name="search" defaultValue={search} placeholder="搜尋收藏 KOL" className={`${styles.formInput} ${styles.searchInput}`} />
          <select name="sort" defaultValue={sort} className={styles.formInput} aria-label="排序方式">
            <option value="rating_desc">評分由高到低</option>
            <option value="followers_desc">粉絲由高到低</option>
            <option value="name_asc">名稱 A-Z</option>
          </select>
          <button type="submit" className={`${styles.formInput} ${styles.formSubmitButton}`}>
            套用
          </button>
          {(() => {
            const filterButtonClassName = (active: boolean): string =>
              active ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton;
            const buildHref = (f: string) =>
              `/favorites?search=${encodeURIComponent(search)}&sort=${sort}&folder=${encodeURIComponent(f)}`;
            const isOwnedFolderActive = ownedFolders.some((f) => f.name === folder);
            const isSharedFolderActive = sharedFolders.some((f) => f.name === folder);
            return (
              <>
                <a href={buildHref("全部")} className={filterButtonClassName(folder === "全部")}>
                  全部 ({folderCounts["全部"] ?? 0})
                </a>
              <Menu shadow="md" width={260} position="bottom-start">
                <Menu.Target>
                  <button type="button" className={filterButtonClassName(isOwnedFolderActive)}>
                    {isOwnedFolderActive
                      ? `我的資料夾：${folder} (${folderCounts[folder] ?? 0})`
                      : "我的資料夾"}
                    <span aria-hidden className={styles.dropdownArrow}>▾</span>
                  </button>
                </Menu.Target>
                <Menu.Dropdown>
                  {ownedFolders.length === 0 ? (
                    <Menu.Item disabled>尚未建立資料夾</Menu.Item>
                  ) : (
                    ownedFolders.map((item) => (
                      <Menu.Item
                        key={item.name}
                        component="a"
                        href={buildHref(item.name)}
                        rightSection={
                          <Group gap={4}>
                            {item.sharedWithMemberIds && item.sharedWithMemberIds.length > 0 && (
                              <Text size="xs" c="grape">🔗{item.sharedWithMemberIds.length}</Text>
                            )}
                            <Text size="xs" c="dimmed">{folderCounts[item.name] ?? 0}</Text>
                          </Group>
                        }
                      >
                        {item.name}
                      </Menu.Item>
                    ))
                  )}
                </Menu.Dropdown>
              </Menu>
              <Menu shadow="md" width={260} position="bottom-start">
                <Menu.Target>
                  <button type="button" className={filterButtonClassName(isSharedFolderActive)}>
                    {isSharedFolderActive
                      ? `🔗 與我共享：${folder} (${folderCounts[folder] ?? 0})`
                      : `🔗 與我共享${sharedFolders.length > 0 ? ` (${sharedFolders.length})` : ""}`}
                    <span aria-hidden className={styles.dropdownArrow}>▾</span>
                  </button>
                </Menu.Target>
                <Menu.Dropdown>
                  {sharedFolders.length === 0 ? (
                    <Menu.Item disabled>沒有人共享資料夾給你</Menu.Item>
                  ) : (
                    sharedFolders.map((item) => (
                      <Menu.Item
                        key={item.name}
                        component="a"
                        href={buildHref(item.name)}
                        rightSection={<Text size="xs" c="dimmed">{folderCounts[item.name] ?? 0}</Text>}
                      >
                        <Stack gap={0}>
                          <Text size="sm">{item.name}</Text>
                          <Text size="xs" c="dimmed">擁有者：{item.ownerName ?? "未知"}</Text>
                        </Stack>
                      </Menu.Item>
                    ))
                  )}
                </Menu.Dropdown>
              </Menu>
              <button
                type="button"
                className={filterButtonClassName(false)}
                onClick={() => {
                  const d = document.getElementById("add-folder-dialog") as HTMLDialogElement | null;
                  d?.showModal();
                }}
                disabled={!currentMember}
                title={currentMember ? undefined : "請先指定目前身分"}
              >
                + 新增資料夾
              </button>
            </>
          );
        })()}
      </Group>
      </form>

      {rows.length > 0 && (
        <Group gap="xs" justify="space-between">
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
          <form method="post" action="/api/kols/export-excel" className={styles.menuForm}>
            <input type="hidden" name="kolIds" value={selectedIds.join(",")} />
            <Button
              type="submit"
              variant="light"
              size="xs"
              disabled={selectedIds.length === 0}
            >
              📥 匯出 Excel{selectedIds.length > 0 ? `（${selectedIds.length}）` : ""}
            </Button>
          </form>
        </Group>
      )}

      {rows.length === 0 ? (
        <Card withBorder p="xl" ta="center">
          <Text size="48px">📂</Text>
          <Title order={3}>此資料夾尚無 KOL</Title>
          <Text c="dimmed" mb="md">請切換資料夾，或前往 KOL 頁面加入收藏</Text>
          <Button component={Link} to="/kols">瀏覽 KOL</Button>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={24}>
          {rows.map((kol) => {
            const instagramUrl = buildSocialProfileUrl("instagram", kol.socialLinks?.instagram ?? kol.instagramHandle);
            const youtubeUrl = buildSocialProfileUrl("youtube", kol.socialLinks?.youtube);
            const tiktokUrl = buildSocialProfileUrl("tiktok", kol.socialLinks?.tiktok);
            const facebookUrl = buildSocialProfileUrl("facebook", kol.socialLinks?.facebook);
            const socialRows: { icon: React.ReactNode; label: string; count: number; url: string | null; engRate?: number }[] = [
              { icon: <IconBrandInstagram size={16} />, label: "Instagram", count: kol.social?.instagram ?? 0, url: instagramUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["Instagram"] ?? (kol.social?.instagram ? kol.engagementRate : undefined) },
              { icon: <IconBrandYoutube size={16} />, label: "YouTube", count: kol.social?.youtube ?? 0, url: youtubeUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["YouTube"] ?? kol.platformMetrics?.audienceMetrics?.["YouTube"]?.engagementRate },
              { icon: <IconBrandTiktok size={16} />, label: "TikTok", count: kol.social?.tiktok ?? 0, url: tiktokUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["TikTok"] ?? kol.platformMetrics?.audienceMetrics?.["TikTok"]?.engagementRate },
              { icon: <IconBrandFacebook size={16} />, label: "Facebook", count: kol.social?.facebook ?? 0, url: facebookUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["Facebook"] ?? kol.platformMetrics?.audienceMetrics?.["Facebook"]?.engagementRate },
            ].filter((row) => row.count > 0 || row.url);
            return (
            <Card
              key={kol.id}
              withBorder
              className={`kol-card ${styles.kolCard} ${selectedIds.includes(kol.id) ? styles.kolCardSelected : ""}`}
              onClick={() => navigate(`/kols/${kol.id}`)}
            >
              <Box className={styles.checkboxOverlay} onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={selectedIds.includes(kol.id)} onChange={() => toggleSelect(kol.id)} />
              </Box>

              <Stack align="center" gap={6} mt="xs">
                <Avatar src={kol.avatarUrl} size={72} radius={999} />
                <Text fw={600}>{kol.displayName}</Text>
              </Stack>

              <Divider my="sm" />

              <Stack gap={4}>
                {socialRows.map((row) =>
                  row.url ? (
                    <a
                      key={row.label}
                      href={row.url}
                      target="_blank"
                      rel="noreferrer"
                      className="social-link"
                      title={`前往 ${row.label}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {row.icon}
                      <Text size="sm" span>{row.count.toLocaleString()}</Text>
                      {row.engRate != null && (
                        <Text size="xs" c="blue" span> · {row.engRate.toFixed(1)}%</Text>
                      )}
                    </a>
                  ) : (
                    <Group key={row.label} gap={4}>
                      {row.icon}
                      <Text size="sm">{row.count.toLocaleString()}</Text>
                      {row.engRate != null && (
                        <Text size="xs" c="blue"> · {row.engRate.toFixed(1)}%</Text>
                      )}
                    </Group>
                  )
                )}
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
                    (kol.favoriteFolders ?? []).map((folderName) => {
                      const access = accessByFolderName.get(folderName);
                      const isShared = access === "shared";
                      return (
                        <Badge
                          key={folderName}
                          variant="light"
                          color={folderName === folder ? "blue" : isShared ? "grape" : "gray"}
                          size="sm"
                          leftSection={isShared ? "🔗" : undefined}
                        >
                          {folderName}
                        </Badge>
                      );
                    })
                  ) : (
                    <Badge variant="light" color="gray" size="sm">未分類</Badge>
                  )}
                </Group>
              </Box>

              <Group justify="space-between" mt="auto" pt="sm" onClick={(e) => e.stopPropagation()}>
                <Text>⭐ {(kol.rating ?? 0).toFixed(1)}</Text>
                <Group gap="xs">
                  <Tooltip label="查看詳細" withArrow>
                    <ActionIcon variant="light" color="blue" size="lg" component={Link} to={`/kols/${kol.id}`}>
                      <IconEye size={18} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="聯絡方式" withArrow>
                    <ActionIcon variant="light" color="teal" size="lg" onClick={() => setContactKol(kol)}>
                      <IconPhone size={18} />
                    </ActionIcon>
                  </Tooltip>
                  {folder !== "全部"
                    && (kol.favoriteFolders ?? []).includes(folder)
                    && accessByFolderName.get(folder) !== "shared" && (
                    <Form method="post" className={styles.menuForm}>
                      <input type="hidden" name="intent" value="removeFromFolder" />
                      <input type="hidden" name="kolId" value={kol.id} />
                      <input type="hidden" name="targetFolder" value={folder} />
                      <button
                        type="submit"
                        className={`${styles.actionButton} ${styles.actionButtonYellow}`}
                      >
                        移出本資料夾
                      </button>
                    </Form>
                  )}
                  <button
                    type="button"
                    onClick={() => openManageFolders(kol)}
                    className={`${styles.actionButton} ${styles.actionButtonBlue}`}
                  >
                    管理資料夾
                  </button>
                  <Form method="post" className={styles.menuForm}>
                    <input type="hidden" name="intent" value="removeFavorite" />
                    <input type="hidden" name="kolId" value={kol.id} />
                    <button
                      type="submit"
                      className={`${styles.actionButton} ${styles.actionButtonRed}`}
                    >
                      取消收藏
                    </button>
                  </Form>
                </Group>
              </Group>
            </Card>
            );
          })}
        </SimpleGrid>
      )}

      {/* ============ Modal: Contact Info ============ */}
      <Modal
        opened={!!contactKol}
        onClose={() => setContactKol(null)}
        title={`聯絡方式 — ${contactKol?.displayName ?? ""}`}
        centered
        size="sm"
      >
        {contactKol && (
          <Stack gap="sm">
            {contactKol.contact?.email ? (
              <Group gap="xs">
                <Text size="sm" fw={600} w={60}>Email</Text>
                <Text size="sm">{contactKol.contact.email}</Text>
              </Group>
            ) : null}
            {contactKol.contact?.phone ? (
              <Group gap="xs">
                <Text size="sm" fw={600} w={60}>電話</Text>
                <Text size="sm">{contactKol.contact.phone}</Text>
              </Group>
            ) : null}
            {contactKol.contact?.lineId ? (
              <Group gap="xs">
                <Text size="sm" fw={600} w={60}>LINE ID</Text>
                <Text size="sm">{contactKol.contact.lineId}</Text>
              </Group>
            ) : null}
            {!contactKol.contact?.email && !contactKol.contact?.phone && !contactKol.contact?.lineId && (
              <Text size="sm" c="dimmed">尚未填寫聯絡方式。</Text>
            )}
            <Group justify="flex-end" mt="xs">
              <Button variant="default" size="sm" onClick={() => setContactKol(null)}>關閉</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      <dialog
        id="add-folder-dialog"
        className={`${styles.dialog} ${styles.addFolderDialog}`}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>新增資料夾</Title>
          <button
            type="button"
            className={styles.dialogClose}
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
        className={`${styles.dialog} ${styles.manageDialog}`}
        onClose={() => setManagingKol(null)}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>管理收藏資料夾</Title>
          <button
            type="button"
            className={styles.dialogClose}
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
              folderDetails.map((item) => {
                const isShared = item.access === "shared";
                const checkbox = (
                  <Checkbox
                    label={
                      <Group gap={6}>
                        <span>{item.name}</span>
                        {isShared && (
                          <Badge size="xs" variant="light" color="grape">
                            🔗 共享自 {item.ownerName ?? "其他成員"}
                          </Badge>
                        )}
                      </Group>
                    }
                    checked={folderSelection.includes(item.name)}
                    disabled={isShared}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setFolderSelection((prev) => [...prev, item.name]);
                      } else {
                        setFolderSelection((prev) => prev.filter((name) => name !== item.name));
                      }
                    }}
                  />
                );
                return isShared ? (
                  <Tooltip key={item.name} label="共享資料夾為唯讀，僅擁有者可調整內容" position="right" withArrow>
                    <div>{checkbox}</div>
                  </Tooltip>
                ) : (
                  <div key={item.name}>{checkbox}</div>
                );
              })
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

      <dialog
        id="share-folder-dialog"
        className={`${styles.dialog} ${styles.shareDialog}`}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>共享資料夾</Title>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={() => (document.getElementById("share-folder-dialog") as HTMLDialogElement | null)?.close()}
          >
            ✕
          </button>
        </Group>
        <Form
          method="post"
          onSubmit={() => (document.getElementById("share-folder-dialog") as HTMLDialogElement | null)?.close()}
        >
          <input type="hidden" name="intent" value="shareFolder" />
          <input type="hidden" name="folderName" value={currentFolderDetail?.name ?? ""} />
          <input type="hidden" name="sharedMemberIds" value={shareSelection.join(",")} />
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              {currentFolderDetail
                ? `勾選要共享資料夾「${currentFolderDetail.name}」的團隊成員。被共享的成員只能檢視，無法編輯或刪除。`
                : "請選擇要共享的資料夾。"}
            </Text>
            {teamMembers.filter((m) => m.id !== currentMember?.id).length === 0 ? (
              <Text size="sm" c="dimmed">沒有其他可共享的成員。請先在 系統設定 &gt; 團隊成員 加入更多成員。</Text>
            ) : (
              teamMembers
                .filter((m) => m.id !== currentMember?.id)
                .map((m) => (
                  <Checkbox
                    key={m.id}
                    label={
                      <Group gap={6}>
                        <Avatar size={20} radius="xl" color={m.role === "admin" ? "blue" : "gray"}>
                          {m.name.slice(0, 1)}
                        </Avatar>
                        <Stack gap={0}>
                          <Text size="sm" fw={500}>{m.name}</Text>
                          <Text size="xs" c="dimmed">{m.email} · {m.group}</Text>
                        </Stack>
                      </Group>
                    }
                    checked={shareSelection.includes(m.id)}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setShareSelection((prev) => [...prev, m.id]);
                      } else {
                        setShareSelection((prev) => prev.filter((x) => x !== m.id));
                      }
                    }}
                  />
                ))
            )}
            <Group justify="flex-end" mt="md">
              <Button
                variant="default"
                type="button"
                onClick={() => (document.getElementById("share-folder-dialog") as HTMLDialogElement | null)?.close()}
              >
                取消
              </Button>
              <Button type="submit" color="grape">儲存共享設定</Button>
            </Group>
          </Stack>
        </Form>
      </dialog>
    </Stack>
  );
}
