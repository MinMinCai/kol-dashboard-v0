import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { listKols, updateKol, type Kol } from "~/lib/mock-api";

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

  const allKols = await listKols();
  const favorites = allKols.filter((k) => k.isFavorite);

  // Collect all folder names from existing KOLs
  const fromRows = favorites.map((r) => r.favoriteFolder).filter(Boolean) as string[];
  const folderSet = new Set(["家電專案", "美妝專案", ...fromRows]);
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

    // Redirect back to same URL to preserve search/filters while dropping a param if we want
    const url = new URL(request.url);
    url.searchParams.set("unfavorited", "1");
    // Ensure we don't duplicate query parameters unnecessarily, but keep it simple
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  return null;
}

export default function FavoritesPage() {
  const { rows, allFolders, folderCounts, search, sort, folder } = useLoaderData<typeof loader>();

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
        <button
          type="button"
          style={{ ...inputStyle, cursor: "pointer", fontWeight: 500 }}
          {...({ onclick: 'document.getElementById("add-folder-dialog").showModal()' } as any)}
        >
          + 新增資料夾
        </button>
      </Group>

      {/* ── Search & Sort (native form) ── */}
      <form method="get" style={{ display: "contents" }}>
        <input type="hidden" name="folder" value={folder} />
        <Group>
          <input
            name="search"
            defaultValue={search}
            placeholder="搜尋收藏 KOL"
            style={{ ...inputStyle, flex: 1, minWidth: 200 }}
          />
          <select name="sort" defaultValue={sort} style={inputStyle}>
            <option value="rating_desc">評分由高到低</option>
            <option value="followers_desc">粉絲由高到低</option>
            <option value="name_asc">名稱 A-Z</option>
          </select>
          <button type="submit" style={{ ...inputStyle, cursor: "pointer", background: "var(--mantine-color-blue-filled)", color: "#fff", border: "none", fontWeight: 600 }}>
            套用
          </button>
        </Group>
      </form>

      {/* ── Folder tabs (each is a link) ── */}
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
          {...({ onclick: 'document.getElementById("add-folder-dialog").showModal()' } as any)}
        >
          + 新增
        </button>
      </Group>

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
            <Card key={kol.id} withBorder className="kol-card">
              <Stack align="center" gap={6}>
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

              {/* Folder quick-switch links */}
              <Box mt="sm">
                <Text size="xs" c="dimmed" mb={4}>移至資料夾：</Text>
                <Group gap={4}>
                  {["家電專案", "美妝專案"].map((f) => (
                    <span
                      key={f}
                      style={{
                        padding: "2px 8px",
                        borderRadius: 4,
                        border: "1px solid var(--mantine-color-default-border)",
                        fontSize: 12,
                        cursor: "default",
                        background: "var(--mantine-color-body)",
                        color: "var(--mantine-color-text)",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </Group>
              </Box>

              <Group justify="space-between" mt="sm">
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

      {/* ── Add Folder Dialog (native HTML) ── */}
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
            {...({ onclick: 'document.getElementById("add-folder-dialog").close()' } as any)}
          >
            ✕
          </button>
        </Group>
        <Stack gap="md">
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>資料夾名稱</label>
            <input
              id="new-folder-name"
              type="text"
              placeholder="例如：母嬰專案"
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
              {...({ onclick: 'document.getElementById("add-folder-dialog").close()' } as any)}
            >
              取消
            </button>
            <button
              type="button"
              style={{ padding: "8px 16px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
              {...({ onclick: 'document.getElementById("add-folder-dialog").close()' } as any)}
            >
              建立
            </button>
          </Group>
        </Stack>
      </dialog>
    </Stack>
  );
}
