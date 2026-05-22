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
  Text,
  TextInput,
  Textarea,
  Title,
  List,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useRef, useState } from "react";
import { IconChevronDown, IconSearch, IconUpload, IconFileSpreadsheet } from "@tabler/icons-react";
import styles from "./_app.insertion-orders.new.module.css";
import {
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
  executionDate: string;  // 上線日期
  authorization: string;  // 授權日期 (YYYY-MM-DD)
  price: number;          // 成本(未稅)
  clientQuote: number;    // 對客戶報價(未稅)
  uploadDate: string;     // 保留相容
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
  const title = String(formData.get("title") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const mcnName = String(formData.get("mcnName") ?? "").trim();
  const salesOwnersRaw = String(formData.get("salesOwners") ?? "").trim();
  const kolManagersRaw = String(formData.get("kolManagers") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();
  const selectedKolsJson = String(formData.get("selectedKolsJson") ?? "[]");
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();
  const taxRate = Number(formData.get("taxRate") ?? 5);
  const projectQuote = Number(formData.get("projectQuote") ?? 0);

  if (!title || !clientName) {
    return json({ error: "案件名稱與客戶為必填" }, { status: 400 });
  }

  const salesOwnersArr = salesOwnersRaw ? salesOwnersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const kolManagersArr = kolManagersRaw ? kolManagersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];

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
    orderTitle: title,
    title,
    projectName: title,
    clientName,
    mcnName,
    brand: "",
    industry: industry || "未分類",
    industryPath: industry,
    salesOwner: salesOwnersArr[0] ?? "",
    kolManager: kolManagersArr[0] ?? "",
    kolCount: selectedKols.length,
    status: "in_progress",
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
      clientQuote: row.clientQuote || 0,
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
  const [titleVal, setTitleVal] = useState(proposalData?.title ?? "");
  const [clientNameVal, setClientNameVal] = useState(proposalData?.clientName ?? "");
  const [industryVal, setIndustryVal] = useState("");
  const [mcnNameVal, setMcnNameVal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectQuote, setProjectQuote] = useState(proposalData?.budget ?? 0);
  const [taxRate, setTaxRate] = useState(5);
  const totalWithTax = Math.round(projectQuote * (1 + taxRate / 100));

  /* ── Import IO modal state ── */
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImportFile(file: File) {
    setImportError(null);
    setImportSuccess(false);
    try {
      const { read, utils } = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const wb = read(buffer, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: Record<string, string>[] = utils.sheet_to_json(ws, { defval: "" });

      if (rows.length === 0) {
        setImportError("Excel 檔案內容為空，請確認格式正確。");
        return;
      }

      // Map basic info from first data row
      const firstRow = rows[0];
      if (firstRow["案件名稱"]) setTitleVal(String(firstRow["案件名稱"]));
      if (firstRow["客戶"]) setClientNameVal(String(firstRow["客戶"]));
      if (firstRow["外發公司"]) setMcnNameVal(String(firstRow["外發公司"]));
      if (firstRow["類別"]) setIndustryVal(String(firstRow["類別"]));
      if (firstRow["上線開始日"]) setStartDate(String(firstRow["上線開始日"]));
      if (firstRow["上線結束日"]) setEndDate(String(firstRow["上線結束日"]));
      if (firstRow["專案報價"]) setProjectQuote(Number(firstRow["專案報價"]) || 0);
      if (firstRow["稅率"]) setTaxRate(Number(firstRow["稅率"]) || 5);

      // Map KOL rows — each row with KOL姓名 becomes a collaboration entry
      const kolRows = rows.filter((r) => r["KOL姓名"]);
      if (kolRows.length > 0) {
        const kolAvatarById = new Map(kols.map((k) => [k.id, k.avatarUrl ?? ""]));
        const kolIdByName = new Map(
          kols.map((k) => [k.displayName?.toLowerCase(), k.id])
        );
        const newKols: SelectedKolRow[] = kolRows.map((r) => {
          const name = String(r["KOL姓名"]);
          const matchedKolId = kolIdByName.get(name.toLowerCase()) ?? `ext_${Math.random().toString(36).slice(2, 9)}`;
          return {
            id: `row_${Math.random().toString(36).slice(2, 10)}`,
            kolId: matchedKolId,
            name,
            avatarUrl: kolAvatarById.get(matchedKolId) || "",
            services: r["合作項目"] ? String(r["合作項目"]).split("+").map((s) => s.trim()).filter(Boolean) : ["待定"],
            executionDate: String(r["上線日期"] || ""),
            authorization: String(r["授權日期"] || ""),
            price: Number(r["成本未稅"] || 0),
            clientQuote: Number(r["對客戶報價未稅"] || 0),
            uploadDate: "",
          };
        });
        setSelectedKols(newKols);
      }

      setImportSuccess(true);
    } catch {
      setImportError("解析失敗，請確認檔案格式與欄位名稱正確。");
    }
  }

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
      clientQuote: 0,
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
        clientQuote: 0,
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
        <Group gap="sm">
          <Button
            type="button"
            variant="light"
            leftSection={<IconFileSpreadsheet size={16} />}
            onClick={() => { setImportModalOpen(true); setImportError(null); setImportSuccess(false); }}
          >
            匯入外部委刊單
          </Button>
          <Button component={Link} to="/insertion-orders" variant="default">取消</Button>
        </Group>
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
                  name="title"
                  label="案件名稱"
                  placeholder="例如：DAC_ALLIE_KOL行銷活動"
                  required
                  style={{ gridColumn: "1 / -1" }}
                  value={titleVal}
                  onChange={(e) => setTitleVal(e.currentTarget.value)}
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
                  name="industry"
                  label="類別"
                  placeholder="例如：美妝、3C、食品"
                  value={industryVal}
                  onChange={(e) => setIndustryVal(e.currentTarget.value)}
                />
                <TextInput
                  name="mcnName"
                  label="外發公司名稱（選填）"
                  placeholder="例如：雲太資訊有限公司"
                  style={{ gridColumn: "1 / -1" }}
                  value={mcnNameVal}
                  onChange={(e) => setMcnNameVal(e.currentTarget.value)}
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
                  label="上線開始日"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.currentTarget.value)}
                />
                <TextInput
                  name="endDate"
                  label="上線結束日"
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
                            label="合作項目"
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
                            label="授權日期"
                            type="date"
                            value={row.authorization}
                            onChange={(e) =>
                              updateKolField(row.id, "authorization", e.currentTarget.value)
                            }
                          />
                          <TextInput
                            label="上線日期"
                            type="date"
                            value={row.executionDate}
                            onChange={(e) =>
                              updateKolField(row.id, "executionDate", e.currentTarget.value)
                            }
                          />
                          <TextInput
                            label="成本(未稅)"
                            leftSection={<Text size="xs" c="dimmed">NT$</Text>}
                            value={row.price ? row.price.toLocaleString("zh-TW") : ""}
                            placeholder="0"
                            onChange={(e) => {
                              const raw = e.currentTarget.value.replace(/,/g, "");
                              updateKolField(row.id, "price", Number(raw) || 0);
                            }}
                          />
                          <TextInput
                            label="對客戶報價(未稅)"
                            leftSection={<Text size="xs" c="dimmed">NT$</Text>}
                            style={{ gridColumn: "1 / -1" }}
                            value={row.clientQuote ? row.clientQuote.toLocaleString("zh-TW") : ""}
                            placeholder="0"
                            onChange={(e) => {
                              const raw = e.currentTarget.value.replace(/,/g, "");
                              updateKolField(row.id, "clientQuote", Number(raw) || 0);
                            }}
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
              <Button type="submit" name="intent" value="create" loading={submitting}>建立執行案件</Button>
            </Group>
          </Stack>
        </Form>
      </Card>

      {/* ── Import External IO Modal ── */}
      <Modal
        opened={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="匯入外部委刊單"
        size="lg"
      >
        <Stack gap="md">
          <Box>
            <Text size="sm" fw={500} mb={4}>Excel 欄位格式說明</Text>
            <Text size="xs" c="dimmed" mb="xs">
              請確保 Excel 第一列為欄位名稱，以下為支援的欄位（KOL 每位一列）：
            </Text>
            <List size="xs" spacing={2}>
              <List.Item><Text span fw={500}>案件名稱</Text>、<Text span fw={500}>客戶</Text>、<Text span fw={500}>類別</Text>、<Text span fw={500}>外發公司</Text></List.Item>
              <List.Item><Text span fw={500}>上線開始日</Text>、<Text span fw={500}>上線結束日</Text>（格式：YYYY-MM-DD）</List.Item>
              <List.Item><Text span fw={500}>專案報價</Text>（未稅數字）、<Text span fw={500}>稅率</Text>（預設 5）</List.Item>
              <List.Item><Text span fw={500}>KOL姓名</Text>、<Text span fw={500}>合作項目</Text>（用 + 分隔）</List.Item>
              <List.Item><Text span fw={500}>上線日期</Text>、<Text span fw={500}>授權日期</Text>、<Text span fw={500}>成本未稅</Text>、<Text span fw={500}>對客戶報價未稅</Text></List.Item>
            </List>
          </Box>

          <Box
            className={styles.importDropzone}
            onClick={() => fileInputRef.current?.click()}
          >
            <IconUpload size={32} color="var(--mantine-color-blue-6)" />
            <Text size="sm" mt="xs" c="blue">點擊選擇 Excel 檔案 (.xlsx)</Text>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx"
              aria-label="匯入外部委刊單 Excel 檔案"
              className={styles.importFileInput}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImportFile(file);
                e.target.value = "";
              }}
            />
          </Box>

          {importError && <Alert color="red">{importError}</Alert>}
          {importSuccess && (
            <Alert color="green">
              匯入成功！欄位資料已填入，請確認後送出。
            </Alert>
          )}

          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => setImportModalOpen(false)}
            >
              {importSuccess ? "關閉" : "取消"}
            </Button>
          </Group>
        </Stack>
      </Modal>

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
