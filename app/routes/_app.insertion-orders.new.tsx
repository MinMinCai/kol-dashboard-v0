import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import styles from "./_app.insertion-orders.new.module.css";
import {
  addBrandCatalog,
  addIndustryCatalog,
  listBrandCatalog,
  listIndustryCatalog,
  listInsertionOrders,
  listKols,
  listTeamMembers,
  createInsertionOrder,
  getProposal,
  listProposalKols,
  type Kol,
} from "~/lib/mock-api.server";

type SelectedKolRow = {
  id: string;
  kolId: string;
  name: string;
  avatarUrl?: string;
  services: string[];
  uploadDate: string;
  executionDate: string;
  authorization: string;
  price: number;
};

function withTimeout<T>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  const timeout = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  return Promise.race([promise, timeout]).catch(() => fallback);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const fromProposalId = url.searchParams.get("fromProposalId");

  const [kols, orders, brandCatalog, industryCatalog, teamMembers] = await Promise.all([
    withTimeout(listKols(), [] as Kol[]),
    withTimeout(listInsertionOrders(), []),
    withTimeout(listBrandCatalog(), []),
    withTimeout(listIndustryCatalog(), []),
    withTimeout(listTeamMembers(), []),
  ]);

  let proposalData = null;
  if (fromProposalId) {
    const [prop, propKols] = await Promise.all([
      withTimeout(getProposal(fromProposalId), null),
      withTimeout(listProposalKols(fromProposalId), []),
    ]);
    if (prop) {
      proposalData = {
        title: prop.title,
        clientName: prop.clientName,
        budget: prop.budget,
        acceptedKols: propKols.filter(pk => pk.status === 'accepted'),
      };
    }
  }

  // Derive options from system settings
  const salesOwners = teamMembers
    .filter((m) => m.group === "AE")
    .map((m) => m.name);
  const kolManagers = teamMembers
    .filter((m) => m.group === "KOL")
    .map((m) => m.name);
  const orderBrands = orders.map((o) => o.brand).filter(Boolean) as string[];
  const catalogBrands = brandCatalog.map((b) => b.name);
  const brands = Array.from(new Set([...orderBrands, ...catalogBrands])) as string[];
  const catalogIndustries = industryCatalog.map((i) => i.name);
  const kolIndustries = kols.map((k) => k.industry).filter(Boolean) as string[];
  const industries = Array.from(new Set([...catalogIndustries, ...kolIndustries])) as string[];

  return json({ kols, salesOwners, kolManagers, brands, industries, proposalData });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "create");

  const orderTitle = String(formData.get("orderTitle") ?? "").trim();
  const projectName = String(formData.get("projectName") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim();
  const mcnName = String(formData.get("mcnName") ?? "").trim();
  const brandsRaw = String(formData.get("brands") ?? "").trim();
  const industriesRaw = String(formData.get("industries") ?? "").trim();
  const salesOwnersRaw = String(formData.get("salesOwners") ?? "").trim();
  const kolManagersRaw = String(formData.get("kolManagers") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();
  const selectedKolsJson = String(formData.get("selectedKolsJson") ?? "[]");
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();
  const taxRate = Number(formData.get("taxRate") ?? 5);
  const projectQuote = Number(formData.get("projectQuote") ?? 0);

  if (!orderTitle || !clientName) {
    return json({ error: "執行案件標題與客戶為必填" }, { status: 400 });
  }

  const industries = industriesRaw ? industriesRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const brandsArr = brandsRaw ? brandsRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const salesOwnersArr = salesOwnersRaw ? salesOwnersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const kolManagersArr = kolManagersRaw ? kolManagersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const [brandCatalog, industryCatalog] = await Promise.all([
    listBrandCatalog(),
    listIndustryCatalog(),
  ]);
  const brandSet = new Set(brandCatalog.map((b) => b.name));
  const industrySet = new Set(industryCatalog.map((i) => i.name));

  await Promise.all(
    brandsArr
      .filter((b) => !brandSet.has(b))
      .map((name) => addBrandCatalog({ name })),
  );
  await Promise.all(
    industries
      .filter((i) => !industrySet.has(i))
      .map((name) => addIndustryCatalog({ name })),
  );

  let selectedKols: SelectedKolRow[] = [];
  try { selectedKols = JSON.parse(selectedKolsJson); } catch { selectedKols = []; }

  // Resolve each selected KOL's avatar from the KOL DB. The client form may
  // omit avatarUrl when rows are pre-filled from a proposal (proposal
  // candidates do not persist `kolAvatarUrl`), so we look it up by kolId here
  // to ensure the new order always carries the correct avatar.
  const allKolsForAvatar = await listKols();
  const avatarByKolId = new Map(allKolsForAvatar.map((k) => [k.id, k.avatarUrl ?? ""]));

  // Keep the manual project quote entered by the user
  const docFile = formData.get("documentUrl") as File;
  const documentUrl = docFile && docFile.name ? docFile.name : "";
  const totalBudget = projectQuote;
  const tax = Math.round(totalBudget * (taxRate / 100));
  const totalWithTax = totalBudget + tax;
  const orderNo = `IO-${new Date().getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`;

  const payload = {
    orderNo,
    orderTitle,
    title: projectName || orderTitle,
    projectName: projectName || orderTitle,
    clientName,
    mcnName,
    brand: brandsArr[0] ?? "",
    industry: industries[0] ?? "未分類",
    industryPath: industries.join(" > "),
    salesOwner: salesOwnersArr[0] ?? "",
    kolManager: kolManagersArr[0] ?? "",
    kolCount: selectedKols.length,
    status: intent === "draft" ? "planned" : "in_progress",
    documentUrl,
    totalBudget,
    tax,
    totalWithTax,
    totalReach: 0,
    totalEngagement: 0,
    avgRating: 0,
    avgEngagementRate: 0,
    collaborations: selectedKols.map((row) => ({
      id: `ioc_${Math.random().toString(36).slice(2, 9)}`,
      kolId: row.kolId,
      name: row.name,
      avatarUrl: avatarByKolId.get(row.kolId) || row.avatarUrl || "",
      price: row.price,
      services: row.services.join(" + "),
      uploadDate: row.uploadDate,
      executionDate: row.executionDate,
      authorization: row.authorization,
      rating: 0,
      totalReach: 0,
      totalEngagement: 0,
      performanceItems: [],
      reviews: [],
    })),
    startDate: startDate || new Date().toISOString().slice(0, 10),
    endDate: endDate || new Date().toISOString().slice(0, 10),
    notes: [description, internalNotes && `internal:${internalNotes}`].filter(Boolean).join("\n"),
  };

  const created = await createInsertionOrder(payload);
  return redirect(`/insertion-orders/${created.id}`);
}

export default function InsertionOrderCreatePage() {
  const { kols, salesOwners, kolManagers, brands, industries, proposalData } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  // ── State for TagsInput (supports free-form creation) ──
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSales, setSelectedSales] = useState<string | null>(null);
  const [selectedKolManagers, setSelectedKolManagers] = useState<string | null>(null);

  const brandSuggestions = brands;
  const industrySuggestions = industries;

  // ── Form field state ──
  const [orderTitleVal, setOrderTitleVal] = useState(proposalData?.title ?? "");
  const [projectNameVal, setProjectNameVal] = useState(proposalData?.title ?? "");
  const [clientNameVal, setClientNameVal] = useState(proposalData?.clientName ?? "");
  const [mcnNameVal, setMcnNameVal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectQuote, setProjectQuote] = useState(proposalData?.budget ?? 0);
  const [taxRate, setTaxRate] = useState(5);
  const totalWithTax = Math.round(projectQuote * (1 + taxRate / 100));

  /* ── KOL modal state ── */
  const [kolModalOpen, setKolModalOpen] = useState(false);
  const [kolSearch, setKolSearch] = useState("");
  const [selectedKols, setSelectedKols] = useState<SelectedKolRow[]>(() => {
    const kolAvatarById = new Map(kols.map((k) => [k.id, k.avatarUrl ?? ""]));
    return (proposalData?.acceptedKols ?? []).map((pk) => ({
      id: `row_${pk.kolId || Math.random().toString(36).slice(2, 9)}`,
      kolId: pk.kolId,
      name: pk.kolName,
      avatarUrl: pk.kolAvatarUrl || kolAvatarById.get(pk.kolId) || "",
      services: pk.role ? [pk.role] : ["待定"],
      uploadDate: "",
      executionDate: "",
      authorization: "",
      price: pk.actualPrice ?? pk.price ?? 0,
    }));
  });

  const kolOptions = kols.map((k) => ({
    id: k.id,
    name: k.displayName,
    handle: k.instagramHandle ?? "",
    industry: k.industry ?? "未分類",
    avatarUrl: k.avatarUrl ?? "",
    price: Number(k.averagePrice ?? 0),
  }));

  const filteredKols = kolSearch.trim()
    ? kolOptions.filter((k) =>
        `${k.name} ${k.handle} ${k.industry}`.toLowerCase().includes(kolSearch.toLowerCase())
      )
    : kolOptions;

  function addKol(k: typeof kolOptions[number]) {
    if (selectedKols.some((r) => r.kolId === k.id)) return;
    setSelectedKols((prev) => [
      ...prev,
      {
        id: `row_${Math.random().toString(36).slice(2, 10)}`,
        kolId: k.id,
        name: k.name,
        avatarUrl: k.avatarUrl,
        services: ["IG貼文"],
        uploadDate: "",
        executionDate: "",
        authorization: "",
        price: k.price,
      },
    ]);
  }

  function removeKol(kolId: string) {
    setSelectedKols((prev) => prev.filter((r) => r.kolId !== kolId));
  }

  function updateKolField(rowId: string, field: keyof SelectedKolRow, value: unknown) {
    setSelectedKols((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [field]: value } : r))
    );
  }


  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>建立執行案件</Title>
        <Button component={Link} to="/insertion-orders" variant="default">取消</Button>
      </Group>

      <Card withBorder>
        <Form 
          method="post" 
          onKeyDown={(e) => { 
            if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT" && (e.target as HTMLInputElement).type !== "submit") {
              e.preventDefault(); 
            } 
          }}
        >
          {/* Hidden inputs for multi-select arrays */}
          <input type="hidden" name="brands" value={selectedBrands.join(",")} />
          <input type="hidden" name="industries" value={selectedIndustries.join(",")} />
          <input type="hidden" name="salesOwners" value={selectedSales ?? ""} />
          <input type="hidden" name="kolManagers" value={selectedKolManagers ?? ""} />

          <Stack gap="lg">
            {/* ── Proposal source banner ── */}
            {proposalData && (
              <>
                <Box className={styles.proposalBanner}>
                  <Text size="sm" c="blue" fw={500}>
                    已從提案「{proposalData.title}」帶入基本資訊與已接受的 KOL 名單（共 {proposalData.acceptedKols.length} 位）
                  </Text>
                </Box>
                <Divider />
              </>
            )}

            {/* ── Basic info ── */}
            <Box>
              <Title order={4} mb="sm">執行案件基本資訊</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput
                  name="orderTitle"
                  label="執行案件標題"
                  placeholder="例如：DAC_ALLIE_KOL行銷活動 委刊單"
                  required
                  value={orderTitleVal}
                  onChange={(e) => {
                    setOrderTitleVal(e.currentTarget.value);
                    // Mirror to projectName if they are still in sync
                    if (projectNameVal === orderTitleVal) setProjectNameVal(e.currentTarget.value);
                  }}
                />
                <TextInput
                  name="projectName"
                  label="專案名稱"
                  placeholder="例如：2026 Q1 家電推廣"
                  value={projectNameVal}
                  onChange={(e) => setProjectNameVal(e.currentTarget.value)}
                />
                <TextInput
                  name="clientName"
                  label="客戶"
                  placeholder="請輸入客戶名稱"
                  required
                  value={clientNameVal}
                  onChange={(e) => setClientNameVal(e.currentTarget.value)}
                />
                <TextInput
                  name="mcnName"
                  label="網紅公司名稱"
                  placeholder="例如：雲太資訊有限公司"
                  value={mcnNameVal}
                  onChange={(e) => setMcnNameVal(e.currentTarget.value)}
                />
                <TagsInput
                  label="品牌"
                  placeholder="選擇或輸入品牌，Enter 新增"
                  data={brandSuggestions}
                  value={selectedBrands}
                  onChange={setSelectedBrands}
                  clearable
                  rightSection={<IconChevronDown size={14} />}
                  rightSectionPointerEvents="none"
                />
                <TagsInput
                  label="產業"
                  placeholder="選擇或輸入產業，Enter 新增"
                  data={industrySuggestions}
                  value={selectedIndustries}
                  onChange={setSelectedIndustries}
                  clearable
                  rightSection={<IconChevronDown size={14} />}
                  rightSectionPointerEvents="none"
                />
                <Select
                  label="負責業務"
                  placeholder="選擇負責業務"
                  data={salesOwners}
                  value={selectedSales}
                  onChange={setSelectedSales}
                  clearable
                  searchable
                  rightSection={<IconChevronDown size={14} />}
                  rightSectionPointerEvents="none"
                />
                <Select
                  label="負責 KOL Team 成員"
                  placeholder="選擇 KOL Team 成員"
                  data={kolManagers}
                  value={selectedKolManagers}
                  onChange={setSelectedKolManagers}
                  clearable
                  searchable
                  rightSection={<IconChevronDown size={14} />}
                  rightSectionPointerEvents="none"
                />
                <TextInput
                  name="startDate"
                  label="開始日"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.currentTarget.value)}
                />
                <TextInput
                  name="endDate"
                  label="結束日"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.currentTarget.value)}
                />
              </SimpleGrid>
            </Box>

            <Divider />

            {/* ── Finance info ── */}
            <Box>
              <Title order={4} mb="sm">財務資訊</Title>
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <TextInput
                  name="projectQuote"
                  label="專案報價 (未稅)"
                  type="number"
                  placeholder="0"
                  value={projectQuote || ""}
                  onChange={(e) => setProjectQuote(Number(e.currentTarget.value) || 0)}
                />
                <TextInput
                  name="taxRate"
                  label="稅率 (%)"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.currentTarget.value) || 0)}
                />
                <TextInput
                  label="專案總金額 (含稅)"
                  readOnly
                  value={`NT$ ${totalWithTax.toLocaleString()}`}
                  styles={{ input: { color: "var(--mantine-color-blue-6)", fontWeight: 600 } }}
                />
              </SimpleGrid>
            </Box>

            <Divider />

            {/* ── KOL section ── */}
            <Box>
              <Group justify="space-between" mb="sm">
                <Title order={4}>合作 KOL</Title>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setKolModalOpen(true)}
                >
                  選擇合作 KOL
                </Button>
              </Group>

              <input
                type="hidden"
                name="selectedKolsJson"
                value={JSON.stringify(selectedKols)}
                readOnly
              />

              {selectedKols.length === 0 ? (
                <Box mih={40} py={12}>
                  <Text size="sm" c="dimmed">
                    尚未加入任何 KOL，請點擊「選擇合作 KOL」開始選擇。
                  </Text>
                </Box>
              ) : (
                <Stack gap="sm">
                  {selectedKols.map((row) => (
                    <Card key={row.id} withBorder padding="md">
                      <Stack gap="sm">
                        <Group justify="space-between" align="flex-start">
                          <Group gap="sm" align="center">
                            <Avatar src={row.avatarUrl} radius="xl" />
                            <div>
                              <Text fw={600}>{row.name}</Text>
                              <Text size="sm" c="dimmed">
                                KOL 報價可於此直接調整
                              </Text>
                            </div>
                          </Group>
                          <Button
                            type="button"
                            variant="light"
                            color="red"
                            size="xs"
                            onClick={() => removeKol(row.kolId)}
                          >
                            移除
                          </Button>
                        </Group>

                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
                          <TextInput
                            label="合作內容"
                            placeholder="例如：IG 貼文 1 篇、限時動態 2 則"
                            value={row.services.join(" + ")}
                            onChange={(e) =>
                              updateKolField(
                                row.id,
                                "services",
                                e.currentTarget.value
                                  .split("+")
                                  .map((item) => item.trim())
                                  .filter(Boolean)
                              )
                            }
                          />
                          <TextInput
                            label="授權項目"
                            placeholder="例如：數位廣告投放一年"
                            value={row.authorization}
                            onChange={(e) =>
                              updateKolField(row.id, "authorization", e.currentTarget.value)
                            }
                          />
                          <TextInput
                            label="執行日期"
                            type="date"
                            value={row.executionDate}
                            onChange={(e) =>
                              updateKolField(row.id, "executionDate", e.currentTarget.value)
                            }
                          />
                          <TextInput
                            label="KOL 報價"
                            type="number"
                            min={0}
                            step={1000}
                            value={String(row.price || "")}
                            onChange={(e) =>
                              updateKolField(row.id, "price", Number(e.currentTarget.value) || 0)
                            }
                          />
                        </SimpleGrid>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>

            <Divider />
            {/* ── Notes ── */}
            <Box>
              <Title order={4} mb="sm">其他資訊</Title>
              <Stack>
                <Textarea name="description" label="專案說明" minRows={4} />
                <Textarea name="internalNotes" label="內部備註" minRows={3} />
              </Stack>
            </Box>

            {actionData?.error && <Alert color="red">{actionData.error}</Alert>}

            <Group justify="space-between">
              <Button component={Link} to="/insertion-orders" variant="default">取消</Button>
              <Group>
                <Button type="submit" name="intent" value="draft" variant="default" loading={submitting}>儲存草稿</Button>
                <Button type="submit" name="intent" value="create" loading={submitting}>建立執行案件</Button>
              </Group>
            </Group>
          </Stack>
        </Form>
      </Card>

      <Modal
        opened={kolModalOpen}
        onClose={() => setKolModalOpen(false)}
        title="選擇合作 KOL"
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            placeholder="搜尋 KOL 名稱、帳號或產業"
            value={kolSearch}
            onChange={(e) => setKolSearch(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />

          <ScrollArea.Autosize mah={420}>
            <Stack gap="sm">
              {filteredKols.length === 0 ? (
                <Text size="sm" c="dimmed">
                  找不到符合條件的 KOL。
                </Text>
              ) : (
                filteredKols.map((kol) => {
                  const isSelected = selectedKols.some((row) => row.kolId === kol.id);

                  return (
                    <Card key={kol.id} withBorder padding="sm">
                      <Group justify="space-between" align="center" wrap="nowrap">
                        <Group gap="sm" wrap="nowrap">
                          <Avatar src={kol.avatarUrl} radius="xl" />
                          <div>
                            <Text fw={600}>{kol.name}</Text>
                            <Text size="sm" c="dimmed">
                              @{kol.handle || "-"} · {kol.industry}
                            </Text>
                          </div>
                        </Group>
                        <Button
                          type="button"
                          size="xs"
                          variant={isSelected ? "light" : "filled"}
                          color={isSelected ? "red" : "blue"}
                          onClick={() => (isSelected ? removeKol(kol.id) : addKol(kol))}
                        >
                          {isSelected ? "移除" : "加入"}
                        </Button>
                      </Group>
                    </Card>
                  );
                })
              )}
            </Stack>
          </ScrollArea.Autosize>

          <Group justify="flex-end">
            <Button type="button" variant="default" onClick={() => setKolModalOpen(false)}>
              完成
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
