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
  Modal,
  MultiSelect,
  Pagination,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandThreads, IconBrandTiktok, IconBrandYoutube, IconEdit, IconEye, IconPhone, IconTrash } from "@tabler/icons-react";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData, useNavigate, useRevalidator, useSubmit, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { buildSocialProfileUrl } from "~/lib/social-links";
import type { Kol } from "~/lib/mock-api.server";
import { FOLLOWER_RANGES, getFollowerBase, getPrimaryTags } from "~/lib/kols";
import { handleKolListAction, loadKolList } from "~/lib/kols.server";
import styles from "./_app.kols._index.module.css";

// ============ Component-only helpers ============

function isKolFavorited(kol: Kol): boolean {
  return Boolean(kol.isFavorite || kol.favoriteFolder || (kol.favoriteFolders ?? []).length > 0);
}

function getFavoriteSelection(kol: Kol): string[] {
  return Array.from(new Set(kol.favoriteFolders ?? (kol.favoriteFolder ? [kol.favoriteFolder] : [])));
}

// ============ Loader & Action ============

export async function loader({ request }: LoaderFunctionArgs) {
  return json(await loadKolList(request));
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  return handleKolListAction(request, formData);
}

// ============ URL Builder Helper ============

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

// ============ Page Component ============

export default function KolListPage() {
  // ============ Loader Data & Hooks ============
  const {
    pageRows, total, totalPages, page, view, sortKey, sortOrder,
    followerRanges, industries, tags, minRating, maxRating,
    q, allIndustries, allTags, activeFilterCount, deleted, folders,
  } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const batchImportFetcher = useFetcher<{ result?: { total: number; success: number; failed: number; errors: string[] }; error?: string }>();
  const favoriteFetcher = useFetcher<{ success?: boolean; error?: string }>();

  // ============ Filter local state ============
  const [qLocal, setQLocal] = useState(q);
  const [frLocal, setFrLocal] = useState<string[]>(followerRanges);
  const [indLocal, setIndLocal] = useState<string[]>(industries);
  const [tagLocal, setTagLocal] = useState<string[]>(tags);

  useEffect(() => {
    setQLocal(q);
    setFrLocal(followerRanges);
    setIndLocal(industries);
    setTagLocal(tags);
  }, [q, followerRanges, industries, tags]);

  function applyFilters() {
    const sp = new URLSearchParams();
    if (qLocal) sp.set("q", qLocal);
    if (view !== "card") sp.set("view", view);
    if (sortKey !== "followers") sp.set("sort", sortKey);
    if (sortOrder !== "desc") sp.set("order", sortOrder);
    frLocal.forEach((v) => sp.append("fr", v));
    indLocal.forEach((v) => sp.append("ind", v));
    tagLocal.forEach((v) => sp.append("tag", v));
    navigate(`/kols?${sp.toString()}`);
  }

  function clearFilters() {
    setQLocal("");
    setFrLocal([]);
    setIndLocal([]);
    setTagLocal([]);
    const sp = new URLSearchParams();
    if (view !== "card") sp.set("view", view);
    if (sortKey !== "followers") sp.set("sort", sortKey);
    if (sortOrder !== "desc") sp.set("order", sortOrder);
    navigate(`/kols?${sp.toString()}`);
  }

  // ============ State ============
  const [deleteKolId, setDeleteKolId] = useState<string | null>(null);
  const [deleteKolName, setDeleteKolName] = useState<string | null>(null);
  const [contactKol, setContactKol] = useState<Kol | null>(null);
  const [favoritePickerKolId, setFavoritePickerKolId] = useState<string | null>(null);
  const [favoritePickerSelection, setFavoritePickerSelection] = useState<string[]>([]);
  const [favoritePickerIsFavorite, setFavoritePickerIsFavorite] = useState(false);

  const batchImportState = batchImportFetcher.state;
  const batchImportData = batchImportFetcher.data;
  const batchImporting = batchImportState !== "idle";

  useEffect(() => {
    if (batchImportState === "idle" && batchImportData?.result && batchImportData.result.success > 0) {
      revalidator.revalidate();
    }
  }, [batchImportState, batchImportData, revalidator]);

  // ============ URL & Sort Helpers ============
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
  };

  function sortUrl(key: string) {
    const nextOrder =
      key === sortKey ? (sortOrder === "asc" ? "desc" : "asc") : "desc";
    return buildUrl(current, { sort: key, order: nextOrder });
  }

  // ============ Favorite Handlers ============
  function openFavoritePicker(kol: Kol) {
    setFavoritePickerKolId(kol.id);
    setFavoritePickerSelection(getFavoriteSelection(kol));
    setFavoritePickerIsFavorite(isKolFavorited(kol));
  }

  function getOptimisticFavorited(kol: Kol): boolean {
    if (favoriteFetcher.state !== "idle" && favoriteFetcher.formData?.get("kolId") === kol.id) {
      const intent = favoriteFetcher.formData?.get("intent");
      if (intent === "removeFavorite") return false;
      if (intent === "updateFavoriteFolders" || intent === "addFavorite") return true;
    }
    return isKolFavorited(kol);
  }

  function sortLabel(key: string) {
    if (key !== sortKey) return "";
    return sortOrder === "asc" ? " ↑" : " ↓";
  }

  const isSubmitting = navigation.state === "submitting";

  // ============ Delete Handlers ============
  const requestDeleteKol = (id: string, name: string) => {
    setDeleteKolId(id);
    setDeleteKolName(name);
  };

  const confirmDeleteKol = () => {
    if (!deleteKolId) return;
    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("kolId", deleteKolId);
    submit(formData, { method: "post" });
    setDeleteKolId(null);
    setDeleteKolName(null);
  };

  // ============ Render ============
  return (
    <Stack gap="md">
      {deleted && (
        <Alert color="green" variant="light">
          KOL 已刪除成功。
          <a
            href={buildUrl(current, { deleted: null })}
            className={styles.alertCloseLink}
          >
            關閉
          </a>
        </Alert>
      )}

      {/* ============ Page Header ============ */}
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={2}>KOL 一覽</Title>
        </Box>

        <Group gap="md" align="flex-end">
          <Group gap={0} className={styles.viewToggle}>
            <a
              href={buildUrl(current, { view: "card" })}
              className={view === "card" ? `${styles.viewOption} ${styles.viewOptionActive}` : styles.viewOption}
            >卡片</a>
            <a
              href={buildUrl(current, { view: "table" })}
              className={view === "table" ? `${styles.viewOption} ${styles.viewOptionActive}` : styles.viewOption}
            >表格</a>
          </Group>

          <Group gap="sm">
            <Button 
              variant="light" 
              onClick={() => { const dlg = document.getElementById('kol-batch-import-dialog') as HTMLDialogElement; if (dlg) dlg.showModal(); }}
            >
              📥 批量匯入
            </Button>
            <Button component={Link} to="/kols/new">新增 KOL</Button>
          </Group>
        </Group>
      </Group>

      {/* ============ Search + Filter Bar ============ */}
      <Group gap={8} wrap="wrap" align="flex-end">
        <Box style={{ flex: "1 1 220px", minWidth: 180 }}>
          <input
            value={qLocal}
            onChange={(e) => setQLocal(e.currentTarget.value)}
            onKeyDown={(e) => { if (e.key === "Enter") applyFilters(); }}
            placeholder="搜尋 KOL 名稱、@帳號、產業或標籤"
            className={`${styles.searchInput} ${styles.searchInputFull}`}
          />
        </Box>
        <MultiSelect
          placeholder="粉絲數"
          data={FOLLOWER_RANGES.map((r) => ({ value: r.key, label: r.label }))}
          value={frLocal}
          onChange={setFrLocal}
          w={160}
          clearable
          comboboxProps={{ withinPortal: true }}
        />
        <MultiSelect
          placeholder="產業別"
          data={allIndustries}
          value={indLocal}
          onChange={setIndLocal}
          w={160}
          clearable
          searchable
          comboboxProps={{ withinPortal: true }}
        />
        <MultiSelect
          placeholder="標籤"
          data={allTags}
          value={tagLocal}
          onChange={setTagLocal}
          w={180}
          clearable
          searchable
          comboboxProps={{ withinPortal: true }}
        />
        <Button onClick={applyFilters}>
          套用篩選{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="subtle" color="gray" onClick={clearFilters}>清除</Button>
        )}
      </Group>

      {/* ============ Results Count ============ */}
      <Text c="dimmed" size="sm">共 {total} 筆結果{q ? `（搜尋：${q}）` : ""}</Text>

      {/* ============ Card View ============ */}
      {
        view === "card" && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={24}>
            {pageRows.map((kol) => {
              const kolTags = getPrimaryTags(kol);
              const isFavorited = getOptimisticFavorited(kol);
              const instagramUrl = buildSocialProfileUrl("instagram", kol.socialLinks?.instagram ?? kol.instagramHandle);
              const youtubeUrl = buildSocialProfileUrl("youtube", kol.socialLinks?.youtube);
              const tiktokUrl = buildSocialProfileUrl("tiktok", kol.socialLinks?.tiktok);
              const facebookUrl = buildSocialProfileUrl("facebook", kol.socialLinks?.facebook);
              const threadsUrl = buildSocialProfileUrl("threads", kol.socialLinks?.threads);
              const socialRows: { icon: React.ReactNode; label: string; count: number; url: string | null; engRate?: number }[] = [
                { icon: <IconBrandInstagram size={16} />, label: "Instagram", count: kol.social?.instagram ?? 0, url: instagramUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["Instagram"] ?? (kol.social?.instagram ? kol.engagementRate : undefined) },
                { icon: <IconBrandYoutube size={16} />, label: "YouTube", count: kol.social?.youtube ?? 0, url: youtubeUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["YouTube"] ?? kol.platformMetrics?.audienceMetrics?.["YouTube"]?.engagementRate },
                { icon: <IconBrandTiktok size={16} />, label: "TikTok", count: kol.social?.tiktok ?? 0, url: tiktokUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["TikTok"] ?? kol.platformMetrics?.audienceMetrics?.["TikTok"]?.engagementRate },
                { icon: <IconBrandFacebook size={16} />, label: "Facebook", count: kol.social?.facebook ?? 0, url: facebookUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["Facebook"] ?? kol.platformMetrics?.audienceMetrics?.["Facebook"]?.engagementRate },
                { icon: <IconBrandThreads size={16} />, label: "Threads", count: kol.social?.threads ?? 0, url: threadsUrl, engRate: kol.platformMetrics?.avgEngagementRate?.["Threads"] ?? kol.platformMetrics?.audienceMetrics?.["Threads"]?.engagementRate },
              ].filter((row) => row.count > 0 || row.url);
              return (
                <Card
                  key={kol.id}
                  withBorder
                  radius="md"
                  p="lg"
                  className={`kol-card ${styles.kolCardItem}`}
                  onClick={() => navigate(`/kols/${kol.id}`)}
                >
                  <div className={styles.favoriteOverlay} onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className={isFavorited ? `${styles.favoriteCardBtn} ${styles.favoriteCardBtnActive}` : styles.favoriteCardBtn}
                      title={isFavorited ? "管理收藏資料夾" : "加入收藏"}
                      onClick={() => openFavoritePicker(kol)}
                    >
                      {isFavorited ? "♥" : "♡"}
                    </button>
                  </div>
                  <Stack align="center" gap="xs">
                    <Avatar src={kol.avatarUrl} size={72} radius={999} />
                    <Text fw={600}>{kol.displayName}</Text>
                  </Stack>
                  <Divider my="sm" />
                  <Stack gap={4}>
                    {socialRows.map((row) =>
                      row.url ? (
                        <a key={row.label} href={row.url} target="_blank" rel="noreferrer" className="social-link" title={`前往 ${row.label}`} onClick={(event) => event.stopPropagation()}>
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
                  <Group gap={6} mt="sm" wrap="wrap">
                    {kolTags.map((tag) => (
                      <Badge key={tag} variant="light" radius="xl" size="sm">{tag}</Badge>
                    ))}
                  </Group>
                  <Group justify="space-between" mt="sm">
                    <Text size="sm">{(kol.rating ?? 0) > 0 ? `⭐ ${kol.rating!.toFixed(1)}` : "⭐ 尚未評價"}</Text>
                    <Text size="xs" c="dimmed">合作 {kol.collaborations ?? 0} 次</Text>
                  </Group>
                  <Group mt="auto" pt="sm" gap="xs" justify="center" onClick={(e) => e.stopPropagation()}>
                    <Tooltip label="查看詳情" withArrow>
                      <ActionIcon variant="light" size="lg" component={Link} to={`/kols/${kol.id}`}>
                        <IconEye size={18} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="編輯" withArrow>
                      <ActionIcon variant="light" color="orange" size="lg" component={Link} to={`/kols/${kol.id}/edit`}>
                        <IconEdit size={18} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="聯絡方式" withArrow>
                      <ActionIcon variant="light" color="teal" size="lg" onClick={() => setContactKol(kol)}>
                        <IconPhone size={18} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="刪除" withArrow>
                      <ActionIcon variant="light" color="red" size="lg" onClick={() => requestDeleteKol(kol.id, kol.displayName)}>
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>
        )
      }

      {/* ============ Table View ============ */}
      {
        view === "table" && (
          <Card withBorder>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Photo</Table.Th>
                  <Table.Th><a href={sortUrl("name")} className={styles.sortLink}>名稱{sortLabel("name")}</a></Table.Th>
                  <Table.Th>社群平台</Table.Th>
                  <Table.Th><a href={sortUrl("followers")} className={styles.sortLink}>平台最高粉絲數{sortLabel("followers")}</a></Table.Th>
                  <Table.Th><a href={sortUrl("engagement")} className={styles.sortLink}>互動/曝光{sortLabel("engagement")}</a></Table.Th>
                  <Table.Th>標籤</Table.Th>
                  <Table.Th><a href={sortUrl("rating")} className={styles.sortLink}>評分{sortLabel("rating")}</a></Table.Th>
                  <Table.Th><a href={sortUrl("collaborations")} className={styles.sortLink}>合作次數{sortLabel("collaborations")}</a></Table.Th>
                  <Table.Th>操作</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {pageRows.map((kol) => (
                  <Table.Tr key={kol.id}>
                    <Table.Td><Avatar src={kol.avatarUrl} size={32} radius="xl" /></Table.Td>
                    <Table.Td><Link to={`/kols/${kol.id}`}>{kol.displayName}</Link></Table.Td>
                    <Table.Td>
                      <Group gap={8}>
                        {[
                          { icon: <IconBrandInstagram size={18} />, label: "Instagram", url: buildSocialProfileUrl("instagram", kol.socialLinks?.instagram ?? kol.instagramHandle), count: kol.social?.instagram ?? 0 },
                          { icon: <IconBrandYoutube size={18} />, label: "YouTube", url: buildSocialProfileUrl("youtube", kol.socialLinks?.youtube), count: kol.social?.youtube ?? 0 },
                          { icon: <IconBrandTiktok size={18} />, label: "TikTok", url: buildSocialProfileUrl("tiktok", kol.socialLinks?.tiktok), count: kol.social?.tiktok ?? 0 },
                          { icon: <IconBrandFacebook size={18} />, label: "Facebook", url: buildSocialProfileUrl("facebook", kol.socialLinks?.facebook), count: kol.social?.facebook ?? 0 },
                          { icon: <IconBrandThreads size={18} />, label: "Threads", url: buildSocialProfileUrl("threads", kol.socialLinks?.threads), count: kol.social?.threads ?? 0 },
                        ]
                          .filter((row) => row.count > 0 || row.url)
                          .map((row) =>
                            row.url ? (
                              <a
                                key={row.label}
                                href={row.url}
                                target="_blank"
                                rel="noreferrer"
                                className="social-link"
                                title={`前往 ${row.label}`}
                              >
                                {row.icon}
                              </a>
                            ) : (
                              <span
                                key={row.label}
                                title={row.label}
                                className={styles.iconMuted}
                              >
                                {row.icon}
                              </span>
                            )
                          )}
                      </Group>
                    </Table.Td>
                    <Table.Td>{getFollowerBase(kol).toLocaleString()}</Table.Td>
                    <Table.Td>
                      <Text size="xs">{kol.engagementRate ? `${kol.engagementRate.toFixed(1)}%` : "-"}</Text>
                      <Text size="xs" c="dimmed">{kol.exposureRate ? `${kol.exposureRate.toFixed(1)}%` : "-"}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        {getPrimaryTags(kol).slice(0, 2).map((tag) => (
                          <Badge key={tag} size="sm" variant="light">{tag}</Badge>
                        ))}
                      </Group>
                    </Table.Td>
                    <Table.Td>{(kol.rating ?? 0) > 0 ? `⭐ ${kol.rating!.toFixed(1)}` : "⭐ 尚未評價"}</Table.Td>
                    <Table.Td>{kol.collaborations ?? 0}</Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        <Tooltip label={getOptimisticFavorited(kol) ? "管理收藏資料夾" : "加入收藏"} withArrow>
                          <ActionIcon
                            variant="subtle"
                            size="md"
                            color={getOptimisticFavorited(kol) ? "red" : "gray"}
                            onClick={() => openFavoritePicker(kol)}
                          >
                            {getOptimisticFavorited(kol) ? "♥" : "♡"}
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="查看詳情" withArrow>
                          <ActionIcon variant="light" size="md" component={Link} to={`/kols/${kol.id}`}>
                            <IconEye size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="編輯" withArrow>
                          <ActionIcon variant="light" color="orange" size="md" component={Link} to={`/kols/${kol.id}/edit`}>
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="聯絡方式" withArrow>
                          <ActionIcon variant="light" color="teal" size="md" onClick={() => setContactKol(kol)}>
                            <IconPhone size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="刪除" withArrow>
                          <ActionIcon variant="light" color="red" size="md" onClick={() => requestDeleteKol(kol.id, kol.displayName)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        )
      }

      {/* ============ Pagination ============ */}
      {
        totalPages > 1 && (
          <Group justify="center">
            <Group gap={4}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries(current).filter(([, v]) => !Array.isArray(v))), page: String(p) }).toString()}`}
                  className={p === page ? `${styles.pageButton} ${styles.pageButtonActive}` : styles.pageButton}
                >
                  {p}
                </a>
              ))}
            </Group>
          </Group>
        )
      }

      {/* ============ Modal: Delete KOL ============ */}
      <Modal
        opened={!!deleteKolId}
        onClose={() => {
          setDeleteKolId(null);
          setDeleteKolName(null);
        }}
        title="確認刪除 KOL"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            確定要刪除 {deleteKolName ? `「${deleteKolName}」` : "此 KOL"} 嗎？此動作無法復原。
          </Text>
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => {
                setDeleteKolId(null);
                setDeleteKolName(null);
              }}
            >
              取消
            </Button>
            <Button color="red" onClick={confirmDeleteKol} loading={isSubmitting}>
              確認刪除
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ============ Modal: Favorite Folder Picker ============ */}
      <Modal
        opened={!!favoritePickerKolId}
        onClose={() => {
          setFavoritePickerKolId(null);
          setFavoritePickerSelection([]);
          setFavoritePickerIsFavorite(false);
        }}
        title="收藏資料夾"
        centered
        size="sm"
      >
        <favoriteFetcher.Form
          method="post"
          onSubmit={() => {
            setFavoritePickerKolId(null);
            setFavoritePickerSelection([]);
            setFavoritePickerIsFavorite(false);
          }}
        >
          <input type="hidden" name="kolId" value={favoritePickerKolId ?? ""} />
          <input type="hidden" name="selectedFolders" value={favoritePickerSelection.join(",")} />
          <Stack gap="md">
            <Text size="sm" c="dimmed">可多選資料夾；若先收藏但暫時不分類，也可以直接儲存。</Text>
            <Stack gap="xs" className={styles.favoriteFolderList}>
              {folders.length === 0 ? (
                <Text size="sm" c="dimmed">尚未建立任何收藏資料夾，儲存後會先加入收藏但不分類。</Text>
              ) : (
                folders.map((folderName) => (
                  <Checkbox
                    key={folderName}
                    label={folderName}
                    checked={favoritePickerSelection.includes(folderName)}
                    onChange={(event) => {
                      setFavoritePickerSelection((prev) =>
                        event.currentTarget.checked
                          ? [...prev, folderName]
                          : prev.filter((name) => name !== folderName),
                      );
                    }}
                  />
                ))
              )}
            </Stack>
            <Group justify="flex-end">
              {favoritePickerIsFavorite ? (
                <Button type="submit" name="intent" value="removeFavorite" color="red" variant="light">
                  取消收藏
                </Button>
              ) : null}
              <Button type="button" variant="default" onClick={() => {
                setFavoritePickerKolId(null);
                setFavoritePickerSelection([]);
                setFavoritePickerIsFavorite(false);
              }}>
                取消
              </Button>
              <Button type="submit" name="intent" value="updateFavoriteFolders">
                儲存收藏
              </Button>
            </Group>
          </Stack>
        </favoriteFetcher.Form>
      </Modal>

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

      {/* ============ Modal: Batch Import Dialog ============ */}
      <dialog
        id="kol-batch-import-dialog"
        className={styles.batchImportDialog}
      >
        <Group justify="space-between" mb="md">
          <Title order={4}>批量匯入 KOL (Excel)</Title>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={(e) => { (e.currentTarget.closest('dialog') as HTMLDialogElement).close(); }}
          >
            ✕
          </button>
        </Group>
        <Text size="sm" c="dimmed" mb="lg">
          上傳依照範本格式的 Excel 檔，第一列為欄位標題、第二列起為每位 KOL 的資料。系統會逐列建檔，KOL名稱為必填欄位。
        </Text>

        <label
          className={batchImporting ? `${styles.uploadLabel} ${styles.uploadLabelDisabled}` : styles.uploadLabel}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-1)"; }}
          onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)"; }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
            if (batchImporting) return;
            const fileInput = document.getElementById('kol-batch-excel-input') as HTMLInputElement;
            if (fileInput && e.dataTransfer.files.length > 0) {
              fileInput.files = e.dataTransfer.files;
              fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }}
        >
          <div className={styles.uploadEmoji}>📤</div>
          <Text fw={600} color="var(--mantine-color-blue-filled)">
            {batchImporting ? "正在處理中…" : "點擊或拖曳 Excel 檔案至此"}
          </Text>
          <Text size="sm" c="dimmed" mt={4}>支援 .xlsx, .xls, .csv</Text>
          <input
            id="kol-batch-excel-input"
            type="file"
            accept=".xlsx, .xls, .csv"
            disabled={batchImporting}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const fd = new FormData();
              fd.append("excelFile", file);
              batchImportFetcher.submit(fd, {
                method: "post",
                action: "/api/kols/batch-import",
                encType: "multipart/form-data",
              });
              e.target.value = "";
            }}
          />
        </label>

        {batchImportData?.error && (
          <Alert color="red" mt="md" title="匯入失敗">
            {batchImportData.error}
          </Alert>
        )}

        {batchImportData?.result && (() => {
          const r = batchImportData.result;
          const tone: "green" | "yellow" | "red" =
            r.failed === 0 && r.success > 0 ? "green"
              : r.success > 0 ? "yellow"
                : "red";
          return (
            <Alert color={tone} mt="md" title="匯入結果">
              <Stack gap={4}>
                <Text size="sm">
                  共讀取 {r.total} 列，成功 {r.success} 筆、失敗 {r.failed} 筆。
                </Text>
                {r.errors.length > 0 && (
                  <Box className={styles.errorsBox}>
                    {r.errors.slice(0, 30).map((msg, i) => (
                      <div key={i}>• {msg}</div>
                    ))}
                    {r.errors.length > 30 && (
                      <div>… 共 {r.errors.length} 條錯誤，僅顯示前 30 條</div>
                    )}
                  </Box>
                )}
              </Stack>
            </Alert>
          );
        })()}

        <Group justify="space-between" mt="xl">
          <a
            href="/api/kols/batch-import-template"
            download
            className="template-download-link"
          >
            📄 下載 Excel 建檔範本
          </a>
          <button
            type="button"
            className={styles.dialogCloseBtn}
            onClick={(e) => { (e.currentTarget.closest('dialog') as HTMLDialogElement).close(); }}
          >
            關閉
          </button>
        </Group>
      </dialog>
    </Stack >
  );
}













