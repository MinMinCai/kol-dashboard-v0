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
  Textarea,
  Title,
  Checkbox,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { useMemo, useState } from "react";
import { IconPencil, IconPlus, IconTrash, IconX, IconCheck } from "@tabler/icons-react";
import styles from "./_app.settings.module.css";
import {
  addBrandCatalog,
  addIndustryCatalog,
  addTagCatalog,
  addPlatformCatalog,
  addTeamMember,
  deleteBrandCatalog,
  deleteIndustryCatalog,
  deletePlatformCatalog,
  deleteTagCatalog,
  deleteTeamMember,
  listBrandCatalog,
  listIndustryCatalog,
  listPlatformCatalog,
  listKols,
  listTagCatalog,
  listTeamMembers,
  updateBrandCatalog,
  updateIndustryCatalog,
  updatePlatformCatalog,
  updateKol,
  updateTagCatalog,
  updateTeamMember,
} from "~/lib/mock-api.server";

// Helpers
function normalizeTagList(tags: string[]) {
  return Array.from(new Set(tags.map((t) => t.trim()).filter(Boolean))).sort();
}

function updateTagList(tags: string[], oldName: string, newName: string | null) {
  const set = new Set(tags);
  set.delete(oldName);
  if (newName) set.add(newName);
  return Array.from(set);
}

function getPrimaryTags(kol: any): string[] {
  if (Array.isArray(kol.tags)) return kol.tags;
  if (Array.isArray(kol.categories)) return kol.categories;
  return [];
}

const PILL_COLORS = ["blue", "cyan", "grape", "indigo", "violet", "teal"];
const EDITABLE_TAG_GROUP = "tags";
const GROUP_OPTIONS = ["AE", "KOL", "Tech", "Media", "其他"] as const;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "clients";
  const q = url.searchParams.get("q") ?? "";

  function timeout<T,>(p: Promise<T>): Promise<T> {
    return Promise.race([p, new Promise<T>((r) => setTimeout(() => r([] as any), 8000))]);
  }
  const [kols, tagCatalog, brandCatalog, industryCatalog, platformCatalog, teamMembers] = await Promise.all([
    timeout(listKols()).catch(() => [] as any[]),
    timeout(listTagCatalog()).catch(() => [] as any[]),
    timeout(listBrandCatalog()).catch(() => [] as any[]),
    timeout(listIndustryCatalog()).catch(() => [] as any[]),
    timeout(listPlatformCatalog()).catch(() => [] as any[]),
    timeout(listTeamMembers()).catch(() => [] as any[]),
  ]);

  const brands = Array.from(new Set([
    ...brandCatalog.map((b: any) => b.name),
    ...kols.map((k: any) => k.tags?.find((t: string) => brandCatalog.some((bc: any) => bc.name === t)) || '').filter(Boolean)
  ])).map(name => {
    const catalogItem = brandCatalog.find(bc => bc.name === name);
    return {
      id: catalogItem?.id || `brand-${name}`,
      name,
      activeProjects: Math.floor(Math.random() * 5),
    };
  });

  const filteredBrands = q
    ? brands.filter(b => b.name.toLowerCase().includes(q.toLowerCase()))
    : brands;

  const catalogTags = tagCatalog.map((t) => t.name);
  const kolTags = kols.flatMap((k) => getPrimaryTags(k));
  const tagsAll = normalizeTagList([...catalogTags, ...kolTags]);

  const catalogIndustries = industryCatalog.map((i) => i.name);
  const industries = normalizeTagList([
    ...catalogIndustries,
    ...kols.map((k) => k.industry ?? "").filter(Boolean),
  ]);

  const catalogPlatforms = platformCatalog.map((p) => p.name);
  const platforms = normalizeTagList([
    ...catalogPlatforms,
    ...kols.map((k) => k.platform ?? "").filter(Boolean),
  ]);

  const tagGroups = [
    {
      id: "tags",
      name: "內容標籤",
      description: "KOL 個人特質與內容類型，與 KOL/提案篩選同步。",
      tags: tagsAll,
      editable: true,
    },
    {
      id: "industries",
      name: "產業類別",
      description: "由 KOL 產業欄位彙整，保持與資料一致。",
      tags: industries,
      editable: true,
    },
    {
      id: "platforms",
      name: "平台偏好",
      description: "由 KOL 平台欄位彙整，用於平台篩選。",
      tags: platforms,
      editable: true,
    },
  ];

  const currentUserRole = "admin";

  return json({
    tab,
    q,
    filteredBrands,
    tagGroups,
    teamMembers,
    currentUserRole,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");
  const url = new URL(request.url);

  if (intent.startsWith("brand.")) {
    if (intent === "brand.add") {
      const name = String(formData.get("name") ?? "").trim();
      if (name) await addBrandCatalog({ name });
      return redirect(url.pathname + "?tab=clients");
    }
    if (intent === "brand.edit") {
      const id = String(formData.get("id") ?? "");
      const name = String(formData.get("name") ?? "").trim();
      if (id && name) await updateBrandCatalog(id, { name });
      return redirect(url.pathname + "?tab=clients");
    }
    if (intent === "brand.delete") {
      const id = String(formData.get("id") ?? "");
      if (id) await deleteBrandCatalog(id);
      return redirect(url.pathname + "?tab=clients");
    }
  }

  if (intent.startsWith("tag.")) {
    const groupId = String(formData.get("groupId") ?? "tags");
    const [tagCatalog, industryCatalog, platformCatalog] = await Promise.all([
      listTagCatalog(),
      listIndustryCatalog(),
      listPlatformCatalog(),
    ]);

    if (intent === "tag.add") {
      const name = String(formData.get("name") ?? "").trim();
      if (!name) return redirect(url.pathname + "?tab=tags");
      if (groupId === "tags") await addTagCatalog({ name });
      else if (groupId === "industries") await addIndustryCatalog({ name });
      else if (groupId === "platforms") await addPlatformCatalog({ name });
      return redirect(url.pathname + "?tab=tags");
    }

    if (intent === "tag.rename") {
      const oldName = String(formData.get("oldName") ?? "").trim();
      const newName = String(formData.get("newName") ?? "").trim();
      if (!oldName || !newName) return redirect(url.pathname + "?tab=tags");

      const allKols = await listKols().catch(() => []);
      await Promise.all(
        allKols.map(async (kol) => {
          if (groupId === "tags") {
            const tags = getPrimaryTags(kol);
            if (!tags.includes(oldName)) return;
            const nextTags = updateTagList(tags, oldName, newName);
            await updateKol(kol.id, { tags: nextTags, categories: nextTags });
          } else if (groupId === "industries") {
            if (kol.industry === oldName) await updateKol(kol.id, { industry: newName });
          } else if (groupId === "platforms") {
            if (kol.platform === oldName) await updateKol(kol.id, { platform: newName });
          }
        }),
      );

      if (groupId === "tags") {
        const item = tagCatalog.find(t => t.name === oldName);
        if (item) await updateTagCatalog(item.id, { name: newName });
        else await addTagCatalog({ name: newName });
      } else if (groupId === "industries") {
        const item = industryCatalog.find(i => i.name === oldName);
        if (item) await updateIndustryCatalog(item.id, { name: newName });
        else await addIndustryCatalog({ name: newName });
      } else if (groupId === "platforms") {
        const item = platformCatalog.find(p => p.name === oldName);
        if (item) await updatePlatformCatalog(item.id, { name: newName });
        else await addPlatformCatalog({ name: newName });
      }
      return redirect(url.pathname + "?tab=tags");
    }

    if (intent === "tag.delete") {
      const name = String(formData.get("name") ?? "").trim();
      if (!name) return redirect(url.pathname + "?tab=tags");

      const allKols = await listKols().catch(() => []);
      await Promise.all(
        allKols.map(async (kol) => {
          if (groupId === "tags") {
            const tags = getPrimaryTags(kol);
            if (!tags.includes(name)) return;
            const nextTags = updateTagList(tags, name, null);
            await updateKol(kol.id, { tags: nextTags, categories: nextTags });
          } else if (groupId === "industries") {
            if (kol.industry === name) await updateKol(kol.id, { industry: "未分類" });
          } else if (groupId === "platforms") {
            if (kol.platform === name) await updateKol(kol.id, { platform: "其他" });
          }
        }),
      );

      if (groupId === "tags") {
        const item = tagCatalog.find(t => t.name === name);
        if (item) await deleteTagCatalog(item.id);
      } else if (groupId === "industries") {
        const item = industryCatalog.find(i => i.name === name);
        if (item) await deleteIndustryCatalog(item.id);
      } else if (groupId === "platforms") {
        const item = platformCatalog.find(p => p.name === name);
        if (item) await deletePlatformCatalog(item.id);
      }
      return redirect(url.pathname + "?tab=tags");
    }
  }

  if (intent.startsWith("member.")) {
    if (intent === "member.add") {
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const role = String(formData.get("role") ?? "member") as any;
      const group = String(formData.get("group") ?? "其他") as any;
      if (name && email) await addTeamMember({ name, email, role, group });
      return redirect(url.pathname + "?tab=roles");
    }

    if (intent === "member.update") {
      const id = String(formData.get("id") ?? "").trim();
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const role = String(formData.get("role") ?? "member") as any;
      const group = String(formData.get("group") ?? "其他") as any;
      if (id) await updateTeamMember(id, { name, email, role, group });
      return redirect(url.pathname + "?tab=roles");
    }

    if (intent === "member.delete") {
      const id = String(formData.get("id") ?? "").trim();
      if (id) await deleteTeamMember(id);
      return redirect(url.pathname + "?tab=roles");
    }
  }

  return redirect(url.pathname + `?tab=${tabFallback(intent)}`);
}

function tabFallback(intent: string): string {
  if (intent.startsWith("tag.")) return "tags";
  if (intent.startsWith("member.")) return "roles";
  if (intent.startsWith("brand.")) return "clients";
  return "clients";
}

export default function SettingsRoute() {
  const submit = useSubmit();
  const { tab, q, filteredBrands, tagGroups, teamMembers, currentUserRole } =
    useLoaderData<typeof loader>();
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    () => tagGroups[0]?.id ?? EDITABLE_TAG_GROUP,
  );
  const selectedGroup = useMemo(
    () => tagGroups.find((g) => g.id === selectedGroupId) ?? tagGroups[0],
    [tagGroups, selectedGroupId],
  );

  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newTagValue, setNewTagValue] = useState("");


  const [tagModalOpened, setTagModalOpened] = useState(false);
  const [tagModalMode, setTagModalMode] = useState<"add" | "edit" | "delete">("add");
  const [activeTagValue, setActiveTagValue] = useState<string>("");
  const [draftTagValue, setDraftTagValue] = useState("");

  const [brandModalOpened, setBrandModalOpened] = useState(false);
  const [activeBrand, setActiveBrand] = useState<{ id: string | number; name: string } | null>(null);

  const [memberModalOpened, setMemberModalOpened] = useState(false);
  const [activeMember, setActiveMember] = useState<any>(null);
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const isAdmin = currentUserRole === "admin";

  const groupOrder: Record<string, number> = {
    AE: 1,
    KOL: 2,
    Tech: 3,
    Media: 4,
    其他: 5,
  };
  const filteredMembers = teamMembers
    .filter((m) => (groupFilter === "all" ? true : m.group === groupFilter))
    .sort((a, b) => {
      const orderDiff = (groupOrder[a.group] ?? 9) - (groupOrder[b.group] ?? 9);
      if (orderDiff !== 0) return orderDiff;
      return a.name.localeCompare(b.name, "zh-Hant");
    });

  const tabClassName = (value: string): string =>
    tab === value ? `${styles.tab} ${styles.tabActive}` : styles.tab;

  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Title order={2}>系統設定</Title>
        <Text c="dimmed">
          管理品牌、標籤、權限與系統偏好設定。各分頁將自動與目前資料同步更新。
        </Text>
      </Stack>

      <Card withBorder radius="lg" p={0} className={styles.cardOverflowHidden}>
        <div className={styles.tabNav}>
          <a href="/settings?tab=clients" className={tabClassName("clients")}>
            品牌管理
          </a>
          <a href="/settings?tab=tags" className={tabClassName("tags")}>
            標籤管理
          </a>
          <a href="/settings?tab=roles" className={tabClassName("roles")}>
            權限管理
          </a>
        </div>

        <Box p="lg">
          {tab === "clients" && (
            <Box>
              <Group justify="space-between" align="center">
                <Stack gap={2}>
                  <Title order={3}>品牌管理</Title>
                  <Text size="sm" c="dimmed">
                    集中管理品牌與客戶資訊，支援編輯與快速維護。
                  </Text>
                </Stack>
                <Button
                  leftSection={<IconPlus size={16} />}
                  onClick={() => {
                    setActiveBrand(null);
                    setBrandModalOpened(true);
                  }}
                >
                  新增品牌
                </Button>
              </Group>

              <Group mt="md" align="center" justify="space-between" wrap="nowrap">
                <Form method="get" action="/settings" className={styles.searchForm}>
                  <input type="hidden" name="tab" value="clients" />
                  <TextInput
                    name="q"
                    defaultValue={q}
                    placeholder="搜尋品牌名稱（按 Enter 搜尋）"
                    flex={1}
                  />
                  <Button type="submit">搜尋</Button>
                </Form>
                {q && (
                  <Button variant="default" component={Link} to="/settings?tab=clients">
                    清除
                  </Button>
                )}
              </Group>

              <ScrollArea h={500} offsetScrollbars mt="lg">
                <Table withTableBorder verticalSpacing="md">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th w={80}>Logo</Table.Th>
                      <Table.Th>品牌名稱</Table.Th>
                      <Table.Th w={150}>活動專案數</Table.Th>
                      <Table.Th w={120}>操作</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredBrands.map((brand) => (
                      <Table.Tr key={brand.id}>
                        <Table.Td>
                          <Avatar radius="xl" color="blue">
                            {brand.name.slice(0, 1).toUpperCase()}
                          </Avatar>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={600}>{brand.name}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" color="gray">{brand.activeProjects} 個專案</Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              variant="light"
                              color="blue"
                              onClick={() => {
                                setActiveBrand({ id: brand.id, name: brand.name });
                                setBrandModalOpened(true);
                              }}
                            >
                              <IconPencil size={14} />
                            </ActionIcon>
                            <Form method="post" onSubmit={(e) => { if (!window.confirm(`確定要刪除品牌「${brand.name}」嗎？`)) e.preventDefault(); }}>
                              <input type="hidden" name="intent" value="brand.delete" />
                              <input type="hidden" name="id" value={brand.id} />
                              <ActionIcon variant="light" color="red" type="submit">
                                <IconTrash size={14} />
                              </ActionIcon>
                            </Form>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                    {filteredBrands.length === 0 && (
                      <Table.Tr>
                        <Table.Td colSpan={4} align="center" className={styles.emptyCell}>
                          找不到符合條件的品牌
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </ScrollArea>

              <Modal opened={brandModalOpened} onClose={() => setBrandModalOpened(false)} title={activeBrand ? "編輯品牌" : "新增品牌"}>
                <Form method="post" onSubmit={() => setBrandModalOpened(false)}>
                  <input type="hidden" name="intent" value={activeBrand ? "brand.edit" : "brand.add"} />
                  {activeBrand && <input type="hidden" name="id" value={activeBrand.id} />}
                  <Stack>
                    <TextInput label="品牌名稱" name="name" defaultValue={activeBrand?.name || ""} placeholder="例如：Panasonic" required />
                    <Group justify="flex-end">
                      <Button variant="default" onClick={() => setBrandModalOpened(false)}>取消</Button>
                      <Button type="submit">儲存</Button>
                    </Group>
                  </Stack>
                </Form>
              </Modal>
            </Box>
          )}

          {tab === "tags" && (
            <Box>
              <Group justify="space-between" align="center">
                <Stack gap={2}>
                  <Title order={3}>標籤管理</Title>
                  <Text size="sm" c="dimmed">
                    內容標籤、產業與平台會自動與 KOL 資料同步更新。系統偏好已移除。
                  </Text>
                </Stack>
                <Button
                  variant={isEditingTags ? "filled" : "light"}
                  color={isEditingTags ? "blue" : "blue"}
                  leftSection={isEditingTags ? <IconCheck size={16} /> : <IconPencil size={16} />}
                  onClick={() => setIsEditingTags(!isEditingTags)}
                >
                  {isEditingTags ? "完成編輯" : "編輯"}
                </Button>
              </Group>

              <Divider my="md" />

              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Stack gap="xs">
                    <Text fw={600} size="sm" c="dimmed">
                      標籤分類
                    </Text>
                    {tagGroups.map((group) => {
                      const active = group.id === selectedGroupId;
                      return (
                        <Card
                          key={group.id}
                          withBorder
                          radius="md"
                          p="sm"
                          onClick={() => setSelectedGroupId(group.id)}
                          className={active ? `${styles.groupCard} ${styles.groupCardActive}` : styles.groupCard}
                        >
                          <Text fw={600}>{group.name}</Text>
                          <Text size="xs" c="dimmed">
                            {group.tags.length} 項
                          </Text>
                        </Card>
                      );
                    })}
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <Stack gap="sm">
                    <Stack gap={4}>
                      <Title order={4}>{selectedGroup?.name ?? "-"}</Title>
                      <Text size="sm" c="dimmed">
                        {selectedGroup?.description}
                      </Text>
                    </Stack>
                    <Group gap="xs">
                      {(selectedGroup?.tags ?? []).map((tag, index) => (
                        <Group key={tag} gap={4} wrap="nowrap">
                          <Badge
                            color={PILL_COLORS[index % PILL_COLORS.length]}
                            variant="light"
                            size="lg"
                            rightSection={isEditingTags && (
                              <ActionIcon
                                size="xs"
                                color="red"
                                variant="transparent"
                                onClick={() => {
                                  if (window.confirm(`確定要刪除標籤「${tag}」嗎？`)) {
                                    const formData = new FormData();
                                    formData.append("intent", "tag.delete");
                                    formData.append("groupId", selectedGroupId);
                                    formData.append("name", tag);
                                    submit(formData, { method: "post" });
                                  }
                                }}
                              >
                                <IconX size={12} />
                              </ActionIcon>
                            )}
                          >
                            {tag}
                          </Badge>
                        </Group>
                      ))}
                    </Group>
                    {isEditingTags && (
                      <Box mt="md" p="md" className={styles.tagEditBox}>
                        <Text size="sm" fw={600} mb="xs">新增新標籤：</Text>
                        <Group gap="xs">
                          <TextInput
                            placeholder="輸入新標籤名稱"
                            value={newTagValue}
                            onChange={(e) => setNewTagValue(e.currentTarget.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && newTagValue.trim()) {
                                const formData = new FormData();
                                formData.append("intent", "tag.add");
                                formData.append("groupId", selectedGroupId);
                                formData.append("name", newTagValue.trim());
                                submit(formData, { method: "post" });
                                setNewTagValue("");
                              }
                            }}
                            flex={1}
                          />
                          <Button
                            onClick={() => {
                              if (newTagValue.trim()) {
                                const formData = new FormData();
                                formData.append("intent", "tag.add");
                                formData.append("groupId", selectedGroupId);
                                formData.append("name", newTagValue.trim());
                                submit(formData, { method: "post" });
                                setNewTagValue("");
                              }
                            }}
                            disabled={!newTagValue.trim()}
                          >
                            新增
                          </Button>
                        </Group>
                      </Box>
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>

              <Modal
                opened={tagModalOpened}
                onClose={() => setTagModalOpened(false)}
                title={
                  tagModalMode === "add" ? "新增標籤" : tagModalMode === "edit" ? "編輯標籤" : "刪除標籤"
                }
              >
                <Form method="post" onSubmit={() => setTagModalOpened(false)}>
                  <Stack>
                    <input type="hidden" name="intent" value={`tag.${tagModalMode}`} />
                    <input type="hidden" name="groupId" value={selectedGroupId} />
                    {tagModalMode === "edit" && <input type="hidden" name="oldName" value={activeTagValue} />}
                    {tagModalMode === "delete" && <input type="hidden" name="name" value={activeTagValue} />}
                    {(tagModalMode === "add" || tagModalMode === "edit") && (
                      <TextInput
                        label="標籤名稱"
                        name={tagModalMode === "add" ? "name" : "newName"}
                        value={draftTagValue}
                        onChange={(e) => setDraftTagValue(e.currentTarget.value)}
                        required
                      />
                    )}
                    {tagModalMode === "delete" && (
                      <Text>確定要刪除標籤「{activeTagValue}」嗎？相關 KOL 的資料也將同步清除。</Text>
                    )}

                    <Group justify="flex-end">
                      {tagModalMode === "edit" && (
                        <Button type="button" variant="light" color="red" onClick={() => setTagModalMode("delete")}>
                          刪除
                        </Button>
                      )}
                      <Button variant="default" onClick={() => setTagModalOpened(false)}>
                        取消
                      </Button>
                      <Button type="submit" color={tagModalMode === "delete" ? "red" : "blue"}>
                        {tagModalMode === "delete" ? "確認刪除" : "儲存"}
                      </Button>
                    </Group>
                  </Stack>
                </Form>
              </Modal>
            </Box>
          )}

          {tab === "roles" && (
            <Box>
              <Group justify="space-between" align="center">
                <Stack gap={2}>
                  <Title order={3}>權限管理</Title>
                  <Text size="sm" c="dimmed">
                    管理團隊成員。點擊鉛筆進行編輯，提交後自動關閉視窗。
                  </Text>
                </Stack>
                {isAdmin && (
                  <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={() => {
                      setActiveMember(null);
                      setMemberModalOpened(true);
                    }}
                  >
                    新增成員
                  </Button>
                )}
              </Group>

              <Group mt="md" align="center" justify="space-between">
                <Group gap="xs">
                  <Text size="sm" fw={600}>組別篩選</Text>
                  <select
                    aria-label="組別篩選"
                    value={groupFilter}
                    onChange={(e) => setGroupFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">全部</option>
                    {GROUP_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt} 組</option>)}
                  </select>
                </Group>
              </Group>

              <ScrollArea h={500} offsetScrollbars mt="lg">
                <Table withTableBorder verticalSpacing="md">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>成員</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>組別</Table.Th>
                      <Table.Th>角色</Table.Th>
                      <Table.Th w={120}>操作</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredMembers.map((member) => (
                      <Table.Tr key={member.id}>
                        <Table.Td><Text fw={600}>{member.name}</Text></Table.Td>
                        <Table.Td>{member.email}</Table.Td>
                        <Table.Td><Badge variant="light">{member.group} 組</Badge></Table.Td>
                        <Table.Td>
                          <Badge variant="outline" color={member.role === 'admin' ? 'red' : 'gray'}>
                            {member.role.toUpperCase()}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          {isAdmin && (
                            <Group gap="xs">
                              <ActionIcon
                                variant="light"
                                color="blue"
                                onClick={() => {
                                  setActiveMember(member);
                                  setMemberModalOpened(true);
                                }}
                              >
                                <IconPencil size={14} />
                              </ActionIcon>
                              <Form method="post" onSubmit={(e) => { if (!window.confirm(`確定要刪除成員「${member.name}」嗎？`)) e.preventDefault(); }}>
                                <input type="hidden" name="intent" value="member.delete" />
                                <input type="hidden" name="id" value={member.id} />
                                <ActionIcon variant="light" color="red" type="submit">
                                  <IconTrash size={14} />
                                </ActionIcon>
                              </Form>
                            </Group>
                          )}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>

              <Modal opened={memberModalOpened} onClose={() => setMemberModalOpened(false)} title={activeMember ? "編輯成員" : "新增成員"}>
                <Form method="post" onSubmit={() => setMemberModalOpened(false)}>
                  <input type="hidden" name="intent" value={activeMember ? "member.update" : "member.add"} />
                  {activeMember && <input type="hidden" name="id" value={activeMember.id} />}
                  <Stack>
                    <TextInput name="name" label="姓名" defaultValue={activeMember?.name || ""} placeholder="輸入姓名" required />
                    <TextInput name="email" label="Email" defaultValue={activeMember?.email || ""} placeholder="name@example.com" required />
                    <Stack gap={4}>
                      <Text size="sm" fw={500}>組別</Text>
                      <select
                        name="group"
                        aria-label="組別"
                        defaultValue={activeMember?.group || "AE"}
                        className={styles.formSelect}
                      >
                        {GROUP_OPTIONS.map(opt => <option key={opt} value={opt}>{opt} 組</option>)}
                      </select>
                    </Stack>
                    <Stack gap={4}>
                      <Text size="sm" fw={500}>角色</Text>
                      <select
                        name="role"
                        aria-label="角色"
                        defaultValue={activeMember?.role || "member"}
                        className={styles.formSelect}
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="member">Member</option>
                      </select>
                    </Stack>
                    <Group justify="flex-end">
                      <Button variant="default" onClick={() => setMemberModalOpened(false)}>取消</Button>
                      <Button type="submit">{activeMember ? "儲存" : "新增"}</Button>
                    </Group>
                  </Stack>
                </Form>
              </Modal>
            </Box>
          )}
        </Box>
      </Card>
    </Stack>
  );
}
