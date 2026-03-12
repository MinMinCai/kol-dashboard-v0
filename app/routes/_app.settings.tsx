import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";

const CLIENTS = [
  {
    id: "c-001",
    name: "Panasonic",
    industry: "家電",
    brands: ["Panasonic", "National"],
    activeProjects: 3,
  },
  {
    id: "c-002",
    name: "Shiseido",
    industry: "美妝保養",
    brands: ["SHISEIDO", "ELIXIR"],
    activeProjects: 2,
  },
  {
    id: "c-003",
    name: "Uniqlo",
    industry: "服飾零售",
    brands: ["Uniqlo", "GU"],
    activeProjects: 5,
  },
  {
    id: "c-004",
    name: "Foodpanda",
    industry: "外送服務",
    brands: ["Foodpanda"],
    activeProjects: 1,
  },
];

const TAG_GROUPS = [
  {
    id: "style",
    name: "內容風格",
    tags: ["質感", "日常", "幽默", "專業", "溫暖", "知識型"],
  },
  {
    id: "industry",
    name: "產業類別",
    tags: ["家電", "美妝", "食品", "旅遊", "母嬰", "科技"],
  },
  {
    id: "platform",
    name: "平台偏好",
    tags: ["IG", "YouTube", "TikTok", "Facebook", "Threads"],
  },
];

const PILL_COLORS = ["blue", "teal", "indigo", "grape", "cyan", "lime"];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "clients";
  const q = url.searchParams.get("q") ?? "";

  // Mock server filtering
  const filteredClients = q
    ? CLIENTS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.brands.some(b => b.toLowerCase().includes(q.toLowerCase())))
    : CLIENTS;

  return json({ tab, q, filteredClients });
}

export default function SettingsRoute() {
  const { tab, q, filteredClients } = useLoaderData<typeof loader>();
  const [tagGroups, setTagGroups] = useState(() => TAG_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(() => TAG_GROUPS[0]?.id ?? "style");
  const selectedGroup = useMemo(
    () => tagGroups.find((g) => g.id === selectedGroupId) ?? tagGroups[0],
    [tagGroups, selectedGroupId],
  );

  const [categoryModalOpened, setCategoryModalOpened] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState<"edit" | "delete">("edit");
  const [tagModalOpened, setTagModalOpened] = useState(false);
  const [tagModalMode, setTagModalMode] = useState<"add" | "edit" | "delete">("add");
  const [activeTagValue, setActiveTagValue] = useState<string>("");
  const [draftCategoryName, setDraftCategoryName] = useState("");
  const [draftTagValue, setDraftTagValue] = useState("");

  const tabStyle = (value: string): React.CSSProperties => ({
    padding: "10px 16px",
    borderBottom: tab === value ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
    color: tab === value ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    textDecoration: "none",
    fontWeight: tab === value ? 600 : 500,
    fontSize: 14,
    display: "inline-block",
    transition: "border-color 150ms ease, color 150ms ease",
  });

  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Title order={2}>系統設定</Title>
        <Text c="dimmed">
          管理客戶、標籤與其他系統後台資料。可依需求擴充品牌與權限設定。
        </Text>
      </Stack>

      <Card withBorder radius="lg" p={0} style={{ overflow: "hidden" }}>
        {/* ── Tabs Header (URL driven) ── */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", padding: "0 16px" }}>
          <Link to="/settings?tab=clients" style={tabStyle("clients")}>客戶管理</Link>
          <Link to="/settings?tab=tags" style={tabStyle("tags")}>標籤管理</Link>
          <Link to="/settings?tab=brands" style={tabStyle("brands")}>品牌管理</Link>
          <Link to="/settings?tab=preferences" style={tabStyle("preferences")}>系統偏好</Link>
          <Link to="/settings?tab=roles" style={tabStyle("roles")}>權限管理</Link>
        </div>

        <Box p="lg">
          {tab === "clients" && (
            <Box>
              <Group justify="space-between" align="center">
                <Stack gap={2}>
                  <Title order={3}>合作客戶</Title>
                  <Text size="sm" c="dimmed">集中管理客戶品牌與專案資訊，支援搜尋與快速維護。</Text>
                </Stack>
                {/* Native button for reliable click without React hydration issues */}
                <button type="button" onClick={() => alert('新增客戶：此功能建置中')} style={{ padding: "8px 16px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "white", cursor: "pointer", fontWeight: 500 }}>
                  新增客戶
                </button>
              </Group>

              <Group mt="md" align="center" justify="space-between" wrap="nowrap">
                {/* Native HTML form for search */}
                <form method="get" action="/settings" style={{ flex: 1, display: "flex", gap: 8 }}>
                  <input type="hidden" name="tab" value="clients" />
                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="搜尋客戶名稱或品牌（按 Enter 搜尋）"
                    style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", color: "var(--mantine-color-text)", fontSize: 14 }}
                  />
                  <button type="submit" style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "var(--mantine-color-blue-filled)", color: "white", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                    搜尋
                  </button>
                  {q && (
                    <Link to="/settings?tab=clients" style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid var(--mantine-color-default-border)", textDecoration: "none", color: "var(--mantine-color-text)", fontSize: 14 }}>
                      清除
                    </Link>
                  )}
                </form>
                <Group gap="xs">
                  <button type="button" onClick={() => alert('匯入功能建置中')} style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }}>匯入</button>
                  <button type="button" onClick={() => alert('匯出功能建置中')} style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }}>匯出</button>
                </Group>
              </Group>

              <Table withTableBorder verticalSpacing="md" mt="lg">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Logo</Table.Th>
                    <Table.Th>客戶名稱</Table.Th>
                    <Table.Th>產業類別</Table.Th>
                    <Table.Th>關聯品牌</Table.Th>
                    <Table.Th>進行中專案</Table.Th>
                    <Table.Th>操作</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredClients.map((client) => (
                    <Table.Tr key={client.id}>
                      <Table.Td>
                        <Avatar radius="xl" color="blue">{client.name.slice(0, 1)}</Avatar>
                      </Table.Td>
                      <Table.Td><Text fw={600}>{client.name}</Text></Table.Td>
                      <Table.Td>{client.industry}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          {client.brands.map((brand) => (
                            <Badge key={brand} variant="light" color="gray">{brand}</Badge>
                          ))}
                        </Group>
                      </Table.Td>
                      <Table.Td><Badge color="blue" variant="light">{client.activeProjects} 件</Badge></Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <button type="button" onClick={() => alert(`編輯 ${client.name}`)} style={{ padding: "4px 10px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontSize: 12 }}>編輯</button>
                          <button type="button" onClick={() => alert(`確定要刪除 ${client.name} 嗎？此功能建置中`)} style={{ padding: "4px 10px", borderRadius: 4, border: "1px solid var(--mantine-color-red-filled)", background: "var(--mantine-color-red-light)", color: "var(--mantine-color-red-filled)", cursor: "pointer", fontSize: 12 }}>刪除</button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                  {filteredClients.length === 0 && (
                    <Table.Tr>
                      <Table.Td colSpan={6} align="center" style={{ padding: "32px 0", color: "var(--mantine-color-dimmed)" }}>
                        找不到符合條件的客戶
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Box>
          )}

          {tab === "tags" && (
            <Box>
              <Group justify="space-between" align="center">
                <Stack gap={2}>
                  <Title order={3}>標籤管理</Title>
                  <Text size="sm" c="dimmed">建立一致的標籤分類，提升 KOL 搜尋與篩選效率。</Text>
                </Stack>
                <button
                  type="button"
                  onClick={() => {
                    setTagModalMode("add");
                    setDraftTagValue("");
                    setTagModalOpened(true);
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid var(--mantine-color-blue-filled)",
                    background: "var(--mantine-color-blue-light)",
                    color: "var(--mantine-color-blue-filled)",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  新增標籤
                </button>
              </Group>

              <Divider my="md" />

              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Stack gap="xs">
                    <Text fw={600} size="sm" c="dimmed">標籤分類</Text>
                    {tagGroups.map((group) => {
                      const active = group.id === selectedGroupId;
                      return (
                      <Card
                        key={group.id}
                        withBorder
                        radius="md"
                        p="sm"
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedGroupId(group.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedGroupId(group.id);
                          }
                        }}
                        style={{
                          cursor: "pointer",
                          background: active ? "var(--mantine-color-blue-light)" : "var(--mantine-color-body)",
                          borderColor: active ? "var(--mantine-color-blue-4)" : "var(--mantine-color-default-border)",
                        }}
                      >
                        <Text fw={600}>{group.name}</Text>
                        <Text size="xs" c="dimmed">{group.tags.length} 個標籤</Text>
                      </Card>
                    )})}
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <Stack gap="sm">
                    <Group justify="space-between" align="center">
                      <Title order={4}>{selectedGroup?.name ?? "-"}</Title>
                      <Group gap="xs">
                        <button
                          type="button"
                          onClick={() => {
                            setCategoryModalMode("edit");
                            setDraftCategoryName(selectedGroup?.name ?? "");
                            setCategoryModalOpened(true);
                          }}
                          style={{
                            padding: "4px 12px",
                            borderRadius: 4,
                            border: "1px solid var(--mantine-color-blue-filled)",
                            background: "var(--mantine-color-blue-light)",
                            color: "var(--mantine-color-blue-filled)",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          編輯分類
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCategoryModalMode("delete");
                            setCategoryModalOpened(true);
                          }}
                          style={{
                            padding: "4px 12px",
                            borderRadius: 4,
                            border: "1px solid var(--mantine-color-red-filled)",
                            background: "var(--mantine-color-red-light)",
                            color: "var(--mantine-color-red-filled)",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          刪除分類
                        </button>
                      </Group>
                    </Group>
                    <Group gap="xs">
                      {(selectedGroup?.tags ?? []).map((tag, index) => (
                        <Badge
                          key={tag}
                          color={PILL_COLORS[index % PILL_COLORS.length]}
                          variant="light"
                          size="lg"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setActiveTagValue(tag);
                            setTagModalMode("edit");
                            setDraftTagValue(tag);
                            setTagModalOpened(true);
                          }}
                        >
                          {tag} <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.7 }}>✕</span>
                        </Badge>
                      ))}
                    </Group>
                    <Card withBorder radius="md" p="sm">
                      <Text size="sm" c="dimmed">點擊標籤即可快速編輯或刪除，建立一致的篩選標準。</Text>
                    </Card>
                  </Stack>
                </Grid.Col>
              </Grid>

              {/* Category Modal */}
              <Modal
                id="settings-tag-category-modal"
                opened={categoryModalOpened}
                onClose={() => setCategoryModalOpened(false)}
                title={categoryModalMode === "edit" ? "編輯分類" : "刪除分類"}
              >
                <Stack>
                  {categoryModalMode === "edit" ? (
                    <>
                      <TextInput
                        label="分類名稱"
                        value={draftCategoryName}
                        onChange={(e) => setDraftCategoryName(e.currentTarget.value)}
                      />
                      <Group justify="flex-end">
                        <Button type="button" variant="default" onClick={() => setCategoryModalOpened(false)}>
                          取消
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            const name = draftCategoryName.trim();
                            if (!name || !selectedGroup) return;
                            setTagGroups((prev) =>
                              prev.map((g) => (g.id === selectedGroup.id ? { ...g, name } : g)),
                            );
                            setCategoryModalOpened(false);
                          }}
                        >
                          儲存
                        </Button>
                      </Group>
                    </>
                  ) : (
                    <>
                      <Text>
                        確定要刪除分類「{selectedGroup?.name}」嗎？（此操作會同時移除該分類下的所有標籤）
                      </Text>
                      <Group justify="flex-end">
                        <Button type="button" variant="default" onClick={() => setCategoryModalOpened(false)}>
                          取消
                        </Button>
                        <Button
                          type="button"
                          color="red"
                          onClick={() => {
                            if (!selectedGroup) return;
                            setTagGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
                            const fallback = tagGroups.find((g) => g.id !== selectedGroup.id)?.id;
                            setSelectedGroupId(fallback ?? "");
                            setCategoryModalOpened(false);
                          }}
                        >
                          確認刪除
                        </Button>
                      </Group>
                    </>
                  )}
                </Stack>
              </Modal>

              {/* Tag Modal */}
              <Modal
                id="settings-tag-modal"
                opened={tagModalOpened}
                onClose={() => setTagModalOpened(false)}
                title={
                  tagModalMode === "add"
                    ? "新增標籤"
                    : tagModalMode === "edit"
                      ? "編輯標籤"
                      : "刪除標籤"
                }
              >
                <Stack>
                  {(tagModalMode === "add" || tagModalMode === "edit") && (
                    <TextInput
                      label="標籤名稱"
                      value={draftTagValue}
                      onChange={(e) => setDraftTagValue(e.currentTarget.value)}
                    />
                  )}
                  {tagModalMode === "delete" && (
                    <Text>確定要刪除標籤「{activeTagValue}」嗎？</Text>
                  )}

                  <Group justify="flex-end">
                    {tagModalMode === "edit" && (
                      <Button
                        type="button"
                        variant="light"
                        color="red"
                        onClick={() => {
                          setTagModalMode("delete");
                        }}
                      >
                        刪除
                      </Button>
                    )}
                    <Button type="button" variant="default" onClick={() => setTagModalOpened(false)}>
                      取消
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        const v = draftTagValue.trim();
                        if (!selectedGroup) return;

                        if (tagModalMode === "add") {
                          if (!v) return;
                          setTagGroups((prev) =>
                            prev.map((g) =>
                              g.id === selectedGroup.id && !g.tags.includes(v)
                                ? { ...g, tags: [...g.tags, v] }
                                : g,
                            ),
                          );
                          setTagModalOpened(false);
                          return;
                        }

                        if (tagModalMode === "edit") {
                          if (!v) return;
                          setTagGroups((prev) =>
                            prev.map((g) =>
                              g.id === selectedGroup.id
                                ? {
                                    ...g,
                                    tags: g.tags.map((t) => (t === activeTagValue ? v : t)),
                                  }
                                : g,
                            ),
                          );
                          setActiveTagValue(v);
                          setTagModalOpened(false);
                          return;
                        }

                        if (tagModalMode === "delete") {
                          setTagGroups((prev) =>
                            prev.map((g) =>
                              g.id === selectedGroup.id
                                ? { ...g, tags: g.tags.filter((t) => t !== activeTagValue) }
                                : g,
                            ),
                          );
                          setTagModalOpened(false);
                        }
                      }}
                    >
                      {tagModalMode === "delete" ? "確認刪除" : "儲存"}
                    </Button>
                  </Group>
                </Stack>
              </Modal>
            </Box>
          )}

          {tab === "brands" && (
            <Box>
              <Title order={3}>品牌管理</Title>
              <Text c="dimmed" mt="xs">預留品牌主檔與品牌對應邏輯的管理空間。</Text>
              <button type="button" onClick={() => alert('新增品牌功能建置中')} style={{ marginTop: 16, padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }}>新增品牌</button>
            </Box>
          )}

          {tab === "preferences" && (
            <Box>
              <Title order={3}>系統偏好</Title>
              <Text c="dimmed" mt="xs">預留系統參數、通知、AI 設定等偏好管理空間。</Text>
              <button type="button" onClick={() => alert('編輯偏好功能建置中')} style={{ marginTop: 16, padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }}>編輯偏好</button>
            </Box>
          )}

          {tab === "roles" && (
            <Box>
              <Title order={3}>權限管理</Title>
              <Text c="dimmed" mt="xs">預留角色、權限與成員指派的管理空間。</Text>
              <button type="button" onClick={() => alert('新增角色功能建置中')} style={{ marginTop: 16, padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }}>新增角色</button>
            </Box>
          )}
        </Box>
      </Card>
    </Stack>
  );
}
