import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
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
import { useState, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import {
  addBrandCatalog,
  addIndustryCatalog,
  listBrandCatalog,
  listIndustryCatalog,
  listInsertionOrders,
  listKols,
  listTeamMembers,
  getInsertionOrder,
  updateInsertionOrder,
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
  rating?: number;
  totalReach?: number;
  totalEngagement?: number;
  performanceItems?: any[];
  reviews?: any[];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const insertionOrderId = params.insertionOrderId;
  if (!insertionOrderId) throw new Response("Not Found", { status: 404 });

  function withTimeout<T,>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
    return Promise.race([promise, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))]);
  }
  const [kols, orders, brandCatalog, industryCatalog, teamMembers, insertionOrder] = await Promise.all([
    withTimeout(listKols(), [] as Kol[]),
    withTimeout(listInsertionOrders(), []),
    withTimeout(listBrandCatalog(), []),
    withTimeout(listIndustryCatalog(), []),
    withTimeout(listTeamMembers(), []),
    withTimeout(getInsertionOrder(insertionOrderId), null),
  ]);

  if (!insertionOrder) throw new Response("Order Not Found", { status: 404 });

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

  return json({ kols, salesOwners, kolManagers, brands, industries, insertionOrder });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const insertionOrderId = params.insertionOrderId;
  if (!insertionOrderId) return json({ error: "No ID provided" }, { status: 400 });

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
    return json({ error: "委刊單標題與客戶為必填" }, { status: 400 });
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

  // Do NOT override projectQuote with KOL prices. Keep the manual quote.
  const docFile = formData.get("documentUrl") as File;
  const existingDocumentUrl = String(formData.get("existingDocumentUrl") || "");
  const documentUrl = (docFile && docFile.name) ? docFile.name : existingDocumentUrl;
  const totalBudget = projectQuote;
  const tax = Math.round(totalBudget * (taxRate / 100));
  const totalWithTax = totalBudget + tax;

  const payload = {
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
    documentUrl,
    totalBudget,
    tax,
    totalWithTax,
    totalReach: 0,
    totalEngagement: 0,
    avgRating: 0,
    avgEngagementRate: 0,
    collaborations: selectedKols.map((row) => ({
      id: row.id || `ioc_${Math.random().toString(36).slice(2, 9)}`,
      kolId: row.kolId,
      name: row.name,
      avatarUrl: row.avatarUrl,
      price: row.price,
      services: Array.isArray(row.services) ? row.services.join(" + ") : (row.services || ""),
      uploadDate: row.uploadDate,
      executionDate: row.executionDate,
      authorization: row.authorization,
      rating: row.rating || 0,
      totalReach: row.totalReach || 0,
      totalEngagement: row.totalEngagement || 0,
      performanceItems: row.performanceItems || [],
      reviews: row.reviews || [],
    })),
    startDate: startDate || new Date().toISOString().slice(0, 10),
    endDate: endDate || new Date().toISOString().slice(0, 10),
    notes: [description, internalNotes && `internal:${internalNotes}`].filter(Boolean).join("\n"),
  };

  await updateInsertionOrder(insertionOrderId, payload);
  return redirect(`/insertion-orders/${insertionOrderId}`);
}

export default function InsertionOrderEditPage() {
  const { kols, salesOwners, kolManagers, brands, industries, insertionOrder } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  // Pre-fill state with existing insertionOrder data
  const [selectedBrands, setSelectedBrands] = useState<string[]>(insertionOrder.brand ? [insertionOrder.brand] : []);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(insertionOrder.industry ? [insertionOrder.industry] : []);
  const [selectedSales, setSelectedSales] = useState<string | null>(insertionOrder.salesOwner || null);
  const [selectedKolManagers, setSelectedKolManagers] = useState<string | null>(insertionOrder.kolManager || null);

  
  const initialNotes = (insertionOrder as any).notes ? ((insertionOrder as any).notes as string).split('\n') : [];
  const initialDescription = initialNotes.filter((n: string) => !n.startsWith('internal:')).join('\n');
  const initialInternalNotes = initialNotes.filter((n: string) => n.startsWith('internal:')).map((n: string) => n.slice(9)).join('\n');
  
  const brandSuggestions = brands;
  const industrySuggestions = industries;

  const [orderTitleVal, setOrderTitleVal] = useState(insertionOrder.orderTitle ?? insertionOrder.title ?? "");
  const [projectNameVal, setProjectNameVal] = useState(insertionOrder.projectName ?? insertionOrder.title ?? "");
  const [clientNameVal, setClientNameVal] = useState(insertionOrder.clientName ?? "");
  const [mcnNameVal, setMcnNameVal] = useState(insertionOrder.mcnName ?? "");
  const [startDate, setStartDate] = useState(insertionOrder.startDate || "");
  const [endDate, setEndDate] = useState(insertionOrder.endDate || "");
  const [projectQuote, setProjectQuote] = useState(insertionOrder.totalBudget || 0);
  const [taxRate, setTaxRate] = useState(insertionOrder.totalBudget ? Math.round(((insertionOrder.totalWithTax || 0) - (insertionOrder.totalBudget)) / insertionOrder.totalBudget * 100) : 5);
  const totalWithTax = Math.round(projectQuote * (1 + taxRate / 100));



  /* ── Embed KOL data for native JS dialog ── */
  const kolsJson = JSON.stringify(
    kols.map((k) => ({
      id: k.id,
      name: k.displayName,
      handle: k.instagramHandle ?? "",
      industry: k.industry ?? "未分類",
      avatarUrl: k.avatarUrl ?? "",
      price: Number(k.averagePrice ?? 0),
    }))
  );

  const nativeDialogScript = `
    window.__ALL_KOLS__ = ${kolsJson};

    function kolDialogOpen() {
      var dlg = document.getElementById('kol-select-dialog');
      if (dlg) { dlg.showModal(); kolDialogSearch(''); }
    }
    function kolDialogClose() {
      var dlg = document.getElementById('kol-select-dialog');
      if (dlg) dlg.close();
    }
    function kolDialogSearch(q) {
      var list = document.getElementById('kol-dialog-list');
      if (!list) return;
      var rows = window.__ALL_KOLS__ || [];
      var lq = (q || '').toLowerCase();
      var filtered = lq ? rows.filter(function(k){ return (k.name+k.handle+k.industry).toLowerCase().indexOf(lq) !== -1; }) : rows;
      var selectedRaw = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(selectedRaw ? selectedRaw.value || '[]' : '[]'); } catch(e){}
      var selectedIds = selected.map(function(x){ return x.kolId; });
      list.innerHTML = filtered.map(function(k){
        var isSel = selectedIds.indexOf(k.id) !== -1;
        var btnAttr = isSel
          ? 'onclick="kolDialogRemove(\\''+k.id+'\\');return false;" style="padding:5px 14px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;"'
          : 'onclick="kolDialogAdd(\\''+k.id+'\\',\\''+encodeURIComponent(k.name)+'\\',\\''+encodeURIComponent(k.avatarUrl||'')+'\\','+k.price+');return false;" style="padding:5px 14px;border-radius:4px;border:none;background:var(--mantine-color-blue-filled);color:#fff;cursor:pointer;font-size:12px;"';
        return '<div style="display:flex;align-items:center;gap:12px;padding:10px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(k.avatarUrl||'')+'" style="width:36px;height:36px;border-radius:50%;object-fit:cover;background:#e2e8f0;"/>'
          +'<div style="flex:1;"><div style="font-weight:600;font-size:14px;">'+k.name+'</div><div style="font-size:12px;color:var(--mantine-color-dimmed);">@'+k.handle+' · '+k.industry+'</div></div>'
          +'<button type="button" '+btnAttr+'>'+(isSel ? '移除' : '加入')+'</button>'
          +'</div>';
      }).join('');
    }
    window.kolDialogAdd = function(id, nameEnc, avatarEnc, price) {
      var name = decodeURIComponent(nameEnc);
      var avatar = decodeURIComponent(avatarEnc);
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      if (selected.some(function(x){ return x.kolId === id; })) return;
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG貼文'], uploadDate:'', executionDate:'', authorization:'', price:Number(price)||0 });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
      var searchEl = document.getElementById('kol-dialog-search');
      kolDialogSearch(searchEl ? searchEl.value : '');
    }
    window.kolDialogRemove = function(kolId) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      selected = selected.filter(function(x){ return x.kolId !== kolId; });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
      var searchEl = document.getElementById('kol-dialog-search');
      kolDialogSearch(searchEl ? searchEl.value : '');
    }
    function kolRemove(rowId) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      selected = selected.filter(function(x){ return x.id !== rowId; });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
    }
    function kolRenderSelected() {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var container = document.getElementById('kol-selected-display');
      if (!container) return;
      if (selected.length === 0) {
        container.innerHTML = '<p style="font-size:14px;color:var(--mantine-color-dimmed);margin:8px 0;">尚未加入任何 KOL，請點擊「選擇合作 KOL」開始選擇。</p>';
        return;
      }
      container.innerHTML = selected.map(function(row){
        var servicesVal = Array.isArray(row.services) ? row.services.join(' + ') : (row.services || '');
        return '<div style="display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;flex-shrink:0;"/>'
          +'<div style="flex:1;">'
          +'<div style="display:flex;justify-content:space-between;align-items:center;">'
          +'<span style="font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<div style="display:flex;align-items:center;gap:6px;">'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);white-space:nowrap;">NT$</span>'
          +'<input type="number" min="0" step="1000" aria-label="報價金額" value="'+(row.price||0)+'" oninput="kolUpdatePrice(\\''+row.id+'\\',this.value)" style="width:120px;font-size:13px;padding:2px 6px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);" />'
          +'</div>'
          +'</div>'
          +'<div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
          +'<div>'
          +'<label style="font-size:12px;color:var(--mantine-color-dimmed);display:block;margin-bottom:2px;">合作內容</label>'
          +'<input type="text" aria-label="合作內容" placeholder="例如：IG 貼文 1 篇、限時動態 2 則" value="'+servicesVal+'" oninput="kolUpdateServices(\\''+row.id+'\\',this.value)" style="width:100%;font-size:12px;padding:4px 8px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);box-sizing:border-box;"/>'
          +'</div>'
          +'<div>'
          +'<label style="font-size:12px;color:var(--mantine-color-dimmed);display:block;margin-bottom:2px;">授權項目</label>'
          +'<input type="text" aria-label="授權項目" placeholder="例如：數位廣告投放一年" value="'+(row.authorization||'')+'" oninput="kolUpdateAuthorization(\\''+row.id+'\\',this.value)" style="width:100%;font-size:12px;padding:4px 8px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);box-sizing:border-box;"/>'
          +'</div>'
          +'</div>'
          +'<div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">'
          +'<label style="font-size:12px;color:var(--mantine-color-dimmed);">執行日期</label>'
          +'<input type="date" aria-label="執行日期" value="'+(row.executionDate||'')+'" onchange="kolUpdateExecDate(\\''+row.id+'\\',this.value)" style="font-size:12px;padding:2px 6px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);"/>'
          +'</div>'
          +'</div>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;flex-shrink:0;">移除</button>'
          +'</div>';
      }).join('');
    }
    window.kolUpdateExecDate = function(rowId, val) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var idx = selected.findIndex(function(x){ return x.id === rowId; });
      if (idx !== -1) selected[idx].executionDate = val;
      if (ta) ta.value = JSON.stringify(selected);
    }
    window.kolUpdatePrice = function(rowId, val) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var idx = selected.findIndex(function(x){ return x.id === rowId; });
      if (idx !== -1) selected[idx].price = Number(val) || 0;
      if (ta) ta.value = JSON.stringify(selected);
    }
    window.kolUpdateServices = function(rowId, val) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var idx = selected.findIndex(function(x){ return x.id === rowId; });
      if (idx !== -1) selected[idx].services = val;
      if (ta) ta.value = JSON.stringify(selected);
    }
    window.kolUpdateAuthorization = function(rowId, val) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var idx = selected.findIndex(function(x){ return x.id === rowId; });
      if (idx !== -1) selected[idx].authorization = val;
      if (ta) ta.value = JSON.stringify(selected);
    }
  `;



  useEffect(() => {
    const scriptId = "dynamic-kol-script-edit";
    let script = document.getElementById(scriptId);
    if (script) {
      script.remove();
    }
    script = document.createElement("script");
    script.id = scriptId;
    script.innerHTML = nativeDialogScript;
    document.body.appendChild(script);

    setTimeout(() => {
      // @ts-ignore
      if (typeof window.kolRenderSelected === "function") window.kolRenderSelected();
    }, 50);

    return () => {
      if (script) script.remove();
    };
  }, [nativeDialogScript]);

      // Transform initial collaborations into SelectedKolRow
      const initialCollabs = (insertionOrder.collaborations || []).map((c: any) => ({
        id: c.id,
        kolId: c.kolId,
        name: c.name,
        avatarUrl: c.avatarUrl,
        services: c.services ? c.services.split(" + ") : [],
        uploadDate: c.uploadDate || "",
        executionDate: c.executionDate || "",
        authorization: c.authorization || "",
        price: c.price || 0,
        rating: c.rating || 0,
        totalReach: c.totalReach || 0,
        totalEngagement: c.totalEngagement || 0,
        performanceItems: c.performanceItems || [],
        reviews: c.reviews || [],
      }));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>編輯委刊單</Title>
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
            {/* ── Basic info ── */}
            <Box>
              <Title order={4} mb="sm">委刊單基本資訊</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput
                  name="orderTitle"
                  label="委刊單標題"
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
                  onClick={() => {
                    // @ts-ignore
                    if (typeof window.kolDialogOpen === "function") window.kolDialogOpen();
                  }}
                >
                  選擇合作 KOL
                </Button>
              </Group>

              <div id="kol-selected-display" style={{ minHeight: 40 }}>
                <p style={{ fontSize: 14, color: "var(--mantine-color-dimmed)", margin: "8px 0" }}>
                  尚未加入任何 KOL，請點擊「選擇合作 KOL」開始選擇。
                </p>
              </div>

              <textarea
                id="kol-selected-json"
                name="selectedKolsJson"
                aria-hidden="true"
                style={{ display: "none" }}
                defaultValue={JSON.stringify(initialCollabs)}
                readOnly
              />
            </Box>

            
            <Divider />
            {/* ── File Upload ── */}
            <Box>
              <Title order={4} mb="sm">委刊單檔案 (合約)</Title>
              <Text size="sm" c="dimmed" mb="xs">上傳經雙方確認的委刊單 PDF/Word 檔案 (選填)</Text>
              <input type="file" name="documentUrl" accept=".pdf,.doc,.docx" aria-label="上傳委刊單檔案" />
              <input type="hidden" name="existingDocumentUrl" value={insertionOrder?.documentUrl || ""} />
              {insertionOrder?.documentUrl && (
                <Text size="sm" mt="xs" c="green">✔️ 已上傳檔案: {insertionOrder.documentUrl}</Text>
              )}
            </Box>

            <Divider />
            {/* ── Notes ── */}
            <Box>
              <Title order={4} mb="sm">其他資訊</Title>
              <Stack>
                <Textarea name="description" label="專案說明" minRows={4} defaultValue={initialDescription} />
                <Textarea name="internalNotes" label="內部備註" minRows={3} defaultValue={initialInternalNotes} />
              </Stack>
            </Box>

            {actionData?.error && <Alert color="red">{actionData.error}</Alert>}

            <Group justify="space-between">
              <Button component={Link} to="/insertion-orders" variant="default">取消</Button>
              <Group>
                <Button type="submit" name="intent" value="update" loading={submitting}>儲存變更</Button>
              </Group>
            </Group>
          </Stack>
        </Form>
      </Card>

      {/* ── KOL Selection Dialog (native <dialog> element) ── */}
      <dialog
        id="kol-select-dialog"
        style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          width: "100%",
          maxWidth: 600,
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <strong style={{ fontSize: 18 }}>選擇合作 KOL</strong>
          <button
            type="button"
            onClick={() => {
              // @ts-ignore
              if (typeof window.kolDialogClose === "function") window.kolDialogClose();
            }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}
          >✕</button>
        </div>
        <input
          id="kol-dialog-search"
          type="text"
          aria-label="搜尋 KOL"
          placeholder="搜尋 KOL 名稱、帳號或產業"
          onChange={(e) => {
            // @ts-ignore
            if (typeof window.kolDialogSearch === "function") window.kolDialogSearch(e.target.value);
          }}
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
        <div
          id="kol-dialog-list"
          style={{ maxHeight: 400, overflowY: "auto", marginTop: 12, paddingRight: 4 }}
        />
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <button
            type="button"
            onClick={() => {
              // @ts-ignore
              if (typeof window.kolDialogClose === "function") window.kolDialogClose();
            }}
            style={{ padding: "8px 20px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
          >
            完成選擇
          </button>
        </div>
      </dialog>
    </Stack>
  );
}
