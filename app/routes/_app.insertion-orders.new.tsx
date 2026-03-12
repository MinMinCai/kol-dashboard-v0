import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import {
  listInsertionOrders,
  listKols,
  MOCK_API_BASE,
  type Kol,
  getProposal,
  listProposalKols,
} from "~/lib/mock-api";

type SelectedKolRow = {
  id: string;
  kolId: string;
  name: string;
  avatarUrl?: string;
  services: string[];
  uploadDate: string;
  authorization: string;
  price: number;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const fromProposalId = url.searchParams.get("fromProposalId");

  const [kols, orders] = await Promise.all([listKols(), listInsertionOrders()]);

  let proposalData = null;
  if (fromProposalId) {
    const [prop, propKols] = await Promise.all([
      getProposal(fromProposalId),
      listProposalKols(fromProposalId),
    ]);
    if (prop) {
      proposalData = {
        title: prop.title,
        clientName: prop.clientName,
        acceptedKols: propKols.filter(pk => pk.status === 'accepted'),
      };
    }
  }

  const clients = Array.from(new Set(orders.map((o) => o.clientName).filter(Boolean)));
  const salesOwners = Array.from(new Set(orders.map((o) => o.salesOwner).filter(Boolean)));
  const kolManagers = Array.from(new Set(orders.map((o) => o.kolManager).filter(Boolean)));
  return json({ kols, clients, salesOwners, kolManagers, proposalData });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "create");

  const projectName = String(formData.get("projectName") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const industriesRaw = String(formData.get("industries") ?? "");
  const documentUrl = String(formData.get("documentUrl") ?? "").trim();
  const salesOwner = String(formData.get("salesOwner") ?? "").trim();
  const kolManager = String(formData.get("kolManager") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();
  const selectedKolsJson = String(formData.get("selectedKolsJson") ?? "[]");
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();

  if (!projectName || !clientName) {
    return json({ error: "專案名稱與客戶為必填" }, { status: 400 });
  }

  const industries = industriesRaw ? industriesRaw.split(",").map((s) => s.trim()) : [];
  let selectedKols: SelectedKolRow[] = [];
  try { selectedKols = JSON.parse(selectedKolsJson); } catch { selectedKols = []; }

  const totalBudget = selectedKols.reduce((sum, row) => sum + Number(row.price || 0), 0);
  const orderNo = `IO-${new Date().getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`;

  const payload = {
    orderNo,
    title: projectName,
    projectName,
    clientName,
    brand: brand || clientName,
    industry: industries[0] ?? "未分類",
    industryPath: industries.join(" > "),
    salesOwner,
    kolManager,
    kolCount: selectedKols.length,
    status: intent === "draft" ? "planned" : "in_progress",
    totalBudget,
    totalReach: 0,
    totalEngagement: 0,
    avgRating: 0,
    avgEngagementRate: 0,
    documentUrl,
    collaborations: selectedKols.map((row) => ({
      id: `ioc_${Math.random().toString(36).slice(2, 9)}`,
      kolId: row.kolId,
      name: row.name,
      avatarUrl: row.avatarUrl,
      price: row.price,
      services: row.services.join(" + "),
      uploadDate: row.uploadDate,
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

  const res = await fetch(`${MOCK_API_BASE}/insertionOrders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return json({ error: "建立失敗，請稍後再試" }, { status: 500 });
  const created = await res.json();
  return redirect(`/insertion-orders/${created.id}`);
}

export default function InsertionOrderCreatePage() {
  const { kols, clients, salesOwners, kolManagers, proposalData } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const clientOptions = clients.map((c) => ({ value: c, label: c }));
  const salesOptions = salesOwners.map((x) => ({ value: x, label: x }));
  const kolManagerOptions = kolManagers.map((x) => ({ value: x, label: x }));
  const availableIndustries = ["家電", "廚房家電", "美妝", "食品", "母嬰", "3C", "汽車", "旅遊"];
  const serviceOptions = ["IG貼文", "限動", "Reels", "YouTube", "TikTok", "直播"];

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
          ? 'onclick="kolDialogRemove(\\''+k.id+'\\')" style="padding:5px 14px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;"'
          : 'onclick="kolDialogAdd(\\''+k.id+'\\',\\''+encodeURIComponent(k.name)+'\\',\\''+encodeURIComponent(k.avatarUrl||'')+'\\','+k.price+')" style="padding:5px 14px;border-radius:4px;border:none;background:var(--mantine-color-blue-filled);color:#fff;cursor:pointer;font-size:12px;"';
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
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG貼文'], uploadDate:'', authorization:'', price:Number(price)||0 });
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
        return '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;"/>'
          +'<span style="flex:1;font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);">NT$ '+(row.price||0).toLocaleString()+'</span>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;">移除</button>'
          +'</div>';
      }).join('');
    }
  `;

  return (
    <Stack gap="md">
      <script dangerouslySetInnerHTML={{ __html: nativeDialogScript }} />
      {/*
        Event binding script: uses addEventListener so React cannot strip them.
        Runs immediately (not DOMContentLoaded) because the script tag appears
        in the body after the elements it references are siblings further down;
        React server-renders the full HTML, so all elements exist in DOM by the
        time the browser executes this script.
        We use a tiny 'turbo' trick - requestIdleCallback or setTimeout 0 to
        ensure the script runs after React's own synchronous setup.
      */}
      <script dangerouslySetInnerHTML={{
        __html: `
        (function bindKolDialog() {
          function setup() {
            // Open dialog button
            var openBtns = document.querySelectorAll('[data-kol-dialog-open]');
            openBtns.forEach(function(btn) {
              btn.addEventListener('click', function() { kolDialogOpen(); });
            });
            // Close dialog buttons
            var closeBtns = document.querySelectorAll('[data-kol-dialog-close]');
            closeBtns.forEach(function(btn) {
              btn.addEventListener('click', function() { kolDialogClose(); });
            });
            // Search input
            var searchInput = document.getElementById('kol-dialog-search');
            if (searchInput) {
              searchInput.addEventListener('input', function() { kolDialogSearch(this.value); });
            }
            // Dialog toggle — populate list when dialog opens
            var dlg = document.getElementById('kol-select-dialog');
            if (dlg) {
              dlg.addEventListener('toggle', function() { if (dlg.open) kolDialogSearch(''); });
            }
          }
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
          } else {
            setup();
          }
        })();

        function handleExcelUpload(input) {
          var file = input.files && input.files[0];
          if (!file) return;

          // Simulate parsing delay
          setTimeout(function() {
            // Auto-fill basic info
            var setVal = function(name, val) {
              var el = document.querySelector('input[name="'+name+'"]');
              if (el) {
                el.value = val;
                // Dispatch event so React/Mantine might pick it up if they have listeners
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
              }
            };
            
            setVal('projectName', '2026 夏季新品上市推廣 (由 Excel 匯入)');
            setVal('brand', 'SHISEIDO');
            setVal('startDate', '2026-06-01');
            setVal('endDate', '2026-06-30');
            
            // For select elements (Mantine's native inputs are hidden, but we use native attributes or standard hidden inputs)
            setVal('clientName', 'Shiseido');
            setVal('industries', '美妝');

            // Auto-fill financial & collab info
            setVal('services', 'IG 貼文 1 篇、限時動態 2 則');
            setVal('authorization', '數位廣告投放一年、品牌官網使用');
            setVal('projectQuote', '150000');
            setVal('taxRate', '5');
            setVal('totalAmount', '157500');

            // Add a mock KOL (Gina)
            if (typeof window.kolDialogAdd === 'function') {
               // Assuming 'kol-001' is Gina from mock-api
               window.kolDialogAdd('kol-001', encodeURIComponent('Gina'), encodeURIComponent('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'), 40000);
            } else {
               // Fallback inline add if global kolDialogAdd isn't fully exposed (it's in another script)
               // The previous script defined kolDialogAdd in global scope, wait no, it was inside a string without var/let, so it's global!
               try { kolDialogAdd('kol-001', encodeURIComponent('Gina'), encodeURIComponent('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'), 40000); } catch(e){}
            }

            alert('✅ 成功解析 Excel 檔案！已為您自動帶入案件名稱、日期、客戶、財務細節與 KOL 人選。');
            
            // Reset input
            input.value = '';
          }, 600);
        }

        (function handleProposalPreFill() {
          var data = ${proposalData ? JSON.stringify(proposalData) : 'null'};
          if (!data) return;

          function runFilling() {
            var setVal = function(name, val) {
              var el = document.querySelector('input[name="'+name+'"]');
              if (el) {
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
              }
            };
            
            setVal('projectName', data.title);
            setVal('clientName', data.clientName);
            setVal('brand', data.clientName);

            if (data.acceptedKols && data.acceptedKols.length > 0) {
              data.acceptedKols.forEach(function(pk) {
                try {
                  kolDialogAdd(
                    pk.kolId, 
                    encodeURIComponent(pk.kolName), 
                    encodeURIComponent(pk.kolAvatarUrl || ''), 
                    pk.price
                  );
                } catch(e){}
              });
            }
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runFilling);
          } else {
            setTimeout(runFilling, 100);
          }
        })();
      `}} />

      <Group justify="space-between">
        <Title order={2}>建立委刊單</Title>
        <Button component={Link} to="/insertion-orders" variant="default">取消</Button>
      </Group>

      <Card withBorder>
        <Form method="post">
          <Stack gap="lg">
            {/* ── Excel Upload Dropzone ── */}
            <Box>
              <Text fw={600} mb="xs">匯入委刊單 (Excel)</Text>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px",
                  border: "2px dashed var(--mantine-color-blue-4)",
                  borderRadius: "8px",
                  backgroundColor: "var(--mantine-color-blue-light)",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-1)"; }}
                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)"; }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
                  const fileInput = document.getElementById('excel-upload-input') as HTMLInputElement;
                  if (fileInput && e.dataTransfer.files.length > 0) {
                    fileInput.files = e.dataTransfer.files;
                    // @ts-ignore
                    handleExcelUpload(fileInput);
                  }
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
                <Text fw={600} color="var(--mantine-color-blue-filled)">點擊上傳或拖曳 Excel 檔案至此</Text>
                <Text size="sm" c="dimmed" mt={4}>支援 .xlsx, .xls</Text>
                {/* Native input with onchange directly linked to our script */}
                <input
                  id="excel-upload-input"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  style={{ display: "none" }}
                  {...({ onchange: "handleExcelUpload(this)" } as any)}
                />
              </label>
            </Box>

            <Divider />

            {/* ── Basic info ── */}
            <Box>
              <Title order={4} mb="sm">委刊單基本資訊</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput name="projectName" label="專案名稱" placeholder="例如：2026 Q1 家電推廣" required />
                <Select name="clientName" label="客戶" searchable placeholder="選擇客戶" data={clientOptions} />
                <TextInput name="brand" label="品牌" placeholder="請輸入品牌名稱" />
                <Select
                  name="industries"
                  label="產業"
                  placeholder="選擇產業"
                  data={availableIndustries.map((i) => ({ value: i, label: i }))}
                />
                <TextInput name="documentUrl" label="委刊單連結/附件" placeholder="Google Drive 或 Dropbox 連結" />
                <Select name="salesOwner" label="負責業務" searchable data={salesOptions} />
                <Select name="kolManager" label="負責 KOL Team Member" searchable data={kolManagerOptions} />
                <TextInput name="startDate" label="開始日" type="date" />
                <TextInput name="endDate" label="結束日" type="date" />
              </SimpleGrid>
            </Box>

            <Divider />

            {/* ── Execution & Finance info ── */}
            <Box>
              <Title order={4} mb="sm">合作內容與財務資訊</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput name="services" label="合作內容" placeholder="例如：IG 貼文 1 篇、限時動態 2 則" />
                <TextInput name="authorization" label="授權項目" placeholder="例如：數位廣告投放一年" />
                <TextInput name="projectQuote" label="專案報價 (未稅)" type="number" placeholder="0" />
                <TextInput name="taxRate" label="稅率 (%)" type="number" defaultValue="5" />
                <TextInput name="totalAmount" label="專案總金額 (含稅)" type="number" placeholder="0" />
              </SimpleGrid>
            </Box>

            <Divider />

            {/* ── KOL section ── */}
            <Box>
              <Group justify="space-between" mb="sm">
                <Title order={4}>合作 KOL</Title>
                {/* Native button — data-attribute used, listener attached by script above */}
                <button
                  type="button"
                  data-kol-dialog-open="1"
                  style={{
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid var(--mantine-color-default-border)",
                    background: "var(--mantine-color-default)",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "var(--mantine-color-text)",
                  }}
                >
                  選擇合作 KOL
                </button>
              </Group>

              {/* Native div rendered by kolRenderSelected() */}
              <div
                id="kol-selected-display"
                style={{ minHeight: 40 }}
              >
                <p style={{ fontSize: 14, color: "var(--mantine-color-dimmed)", margin: "8px 0" }}>
                  尚未加入任何 KOL，請點擊「選擇合作 KOL」開始選擇。
                </p>
              </div>

              {/* Hidden textarea — stores JSON for form submission, updated by JS */}
              <textarea
                id="kol-selected-json"
                name="selectedKolsJson"
                style={{ display: "none" }}
                defaultValue="[]"
                readOnly
              />
            </Box>

            <Divider />

            {/* ── Notes ── */}
            <Box>
              <Title order={4} mb="sm">其他資訊</Title>
              <Stack>
                <Textarea name="description" label="專案說明" minRows={4} />
                <Textarea name="internalNotes" label="內部備註" minRows={3} />
                <TextInput name="attachmentUrl" label="附件上傳" placeholder="可先貼檔案連結，後續接真上傳" />
              </Stack>
            </Box>

            {actionData?.error && <Alert color="red">{actionData.error}</Alert>}

            <Group justify="space-between">
              <Button component={Link} to="/insertion-orders" variant="default">取消</Button>
              <Group>
                <Button type="submit" name="intent" value="draft" variant="default" loading={submitting}>儲存草稿</Button>
                <Button type="submit" name="intent" value="create" loading={submitting}>建立委刊單</Button>
              </Group>
            </Group>
          </Stack>
        </Form>
      </Card>

      {/* ── KOL Selection Dialog (100% native HTML, no Mantine, no React events) ── */}
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
            data-kol-dialog-close="1"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}
          >✕</button>
        </div>
        <input
          id="kol-dialog-search"
          type="text"
          placeholder="搜尋 KOL 名稱、帳號或產業"
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
            data-kol-dialog-close="1"
            style={{ padding: "8px 20px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
          >
            完成選擇
          </button>
        </div>
      </dialog>
    </Stack>
  );
}
