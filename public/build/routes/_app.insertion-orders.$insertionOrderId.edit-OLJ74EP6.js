import {
  IconChevronDown
} from "/build/_shared/chunk-ZHSZHK33.js";
import "/build/_shared/chunk-NNH5CGJ5.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Alert,
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
  Title
} from "/build/_shared/chunk-DPI5I7LX.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation
} from "/build/_shared/chunk-6WKXAUV5.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-5YHBI2JG.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.insertion-orders.$insertionOrderId.edit.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.insertion-orders.$insertionOrderId.edit.tsx"
  );
  import.meta.hot.lastModified = "1774520394298.956";
}
function InsertionOrderEditPage() {
  _s();
  const {
    kols,
    salesOwners,
    kolManagers,
    brands,
    industries,
    insertionOrder
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const [selectedBrands, setSelectedBrands] = (0, import_react2.useState)(insertionOrder.brand ? [insertionOrder.brand] : []);
  const [selectedIndustries, setSelectedIndustries] = (0, import_react2.useState)(insertionOrder.industry ? [insertionOrder.industry] : []);
  const [selectedSales, setSelectedSales] = (0, import_react2.useState)(insertionOrder.salesOwner || null);
  const [selectedKolManagers, setSelectedKolManagers] = (0, import_react2.useState)(insertionOrder.kolManager || null);
  const initialNotes = insertionOrder.notes ? insertionOrder.notes.split("\n") : [];
  const initialDescription = initialNotes.filter((n) => !n.startsWith("internal:")).join("\n");
  const initialInternalNotes = initialNotes.filter((n) => n.startsWith("internal:")).map((n) => n.slice(9)).join("\n");
  const brandSuggestions = brands;
  const industrySuggestions = industries;
  const [orderTitleVal, setOrderTitleVal] = (0, import_react2.useState)(insertionOrder.orderTitle ?? insertionOrder.title ?? "");
  const [projectNameVal, setProjectNameVal] = (0, import_react2.useState)(insertionOrder.projectName ?? insertionOrder.title ?? "");
  const [clientNameVal, setClientNameVal] = (0, import_react2.useState)(insertionOrder.clientName ?? "");
  const [mcnNameVal, setMcnNameVal] = (0, import_react2.useState)(insertionOrder.mcnName ?? "");
  const [startDate, setStartDate] = (0, import_react2.useState)(insertionOrder.startDate || "");
  const [endDate, setEndDate] = (0, import_react2.useState)(insertionOrder.endDate || "");
  const [projectQuote, setProjectQuote] = (0, import_react2.useState)(insertionOrder.totalBudget || 0);
  const [taxRate, setTaxRate] = (0, import_react2.useState)(insertionOrder.totalBudget ? Math.round(((insertionOrder.totalWithTax || 0) - insertionOrder.totalBudget) / insertionOrder.totalBudget * 100) : 5);
  const totalWithTax = Math.round(projectQuote * (1 + taxRate / 100));
  (0, import_react2.useEffect)(() => {
    if (typeof window.kolRenderSelected === "function") {
      setTimeout(() => window.kolRenderSelected(), 100);
    }
  }, []);
  const kolsJson = JSON.stringify(kols.map((k) => ({
    id: k.id,
    name: k.displayName,
    handle: k.instagramHandle ?? "",
    industry: k.industry ?? "\u672A\u5206\u985E",
    avatarUrl: k.avatarUrl ?? "",
    price: Number(k.averagePrice ?? 0)
  })));
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
          +'<div style="flex:1;"><div style="font-weight:600;font-size:14px;">'+k.name+'</div><div style="font-size:12px;color:var(--mantine-color-dimmed);">@'+k.handle+' \xB7 '+k.industry+'</div></div>'
          +'<button type="button" '+btnAttr+'>'+(isSel ? '\u79FB\u9664' : '\u52A0\u5165')+'</button>'
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
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG\u8CBC\u6587'], uploadDate:'', executionDate:'', authorization:'', price:Number(price)||0 });
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
        container.innerHTML = '<p style="font-size:14px;color:var(--mantine-color-dimmed);margin:8px 0;">\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002</p>';
        return;
      }
      container.innerHTML = selected.map(function(row){
        return '<div style="display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;flex-shrink:0;"/>'
          +'<div style="flex:1;">'
          +'<div style="display:flex;justify-content:space-between;align-items:center;">'
          +'<span style="font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);">NT$ '+(row.price||0).toLocaleString()+'</span>'
          +'</div>'
          +'<div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">'
          +'<label style="font-size:12px;color:var(--mantine-color-dimmed);">\u57F7\u884C\u65E5\u671F</label>'
          +'<input type="date" value="'+(row.executionDate||'')+'" onchange="kolUpdateExecDate(\\''+row.id+'\\',this.value)" style="font-size:12px;padding:2px 6px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);"/>'
          +'</div>'
          +'</div>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;flex-shrink:0;">\u79FB\u9664</button>'
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
  `;
  const initialCollabs = (insertionOrder.collaborations || []).map((c) => ({
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
    reviews: c.reviews || []
  }));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
      __html: nativeDialogScript
    } }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 334,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u7DE8\u8F2F\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 339,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 340,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 338,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onKeyDown: (e) => {
      if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "submit") {
        e.preventDefault();
      }
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "brands", value: selectedBrands.join(",") }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 350,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "industries", value: selectedIndustries.join(",") }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 351,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "salesOwners", value: selectedSales ?? "" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 352,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolManagers", value: selectedKolManagers ?? "" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 353,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u57FA\u672C\u8CC7\u8A0A" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
            base: 1,
            md: 2
          }, spacing: "md", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "orderTitle", label: "\u59D4\u520A\u55AE\u6A19\u984C", placeholder: "\u4F8B\u5982\uFF1ADAC_ALLIE_KOL\u884C\u92B7\u6D3B\u52D5 \u59D4\u520A\u55AE", required: true, value: orderTitleVal, onChange: (e) => {
              setOrderTitleVal(e.currentTarget.value);
              if (projectNameVal === orderTitleVal)
                setProjectNameVal(e.currentTarget.value);
            } }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 363,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "projectName", label: "\u5C08\u6848\u540D\u7A31", placeholder: "\u4F8B\u5982\uFF1A2026 Q1 \u5BB6\u96FB\u63A8\u5EE3", value: projectNameVal, onChange: (e) => setProjectNameVal(e.currentTarget.value) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 368,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "clientName", label: "\u5BA2\u6236", placeholder: "\u8ACB\u8F38\u5165\u5BA2\u6236\u540D\u7A31", required: true, value: clientNameVal, onChange: (e) => setClientNameVal(e.currentTarget.value) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 369,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "mcnName", label: "\u7DB2\u7D05\u516C\u53F8\u540D\u7A31", placeholder: "\u4F8B\u5982\uFF1A\u96F2\u592A\u8CC7\u8A0A\u6709\u9650\u516C\u53F8", value: mcnNameVal, onChange: (e) => setMcnNameVal(e.currentTarget.value) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 370,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TagsInput, { label: "\u54C1\u724C", placeholder: "\u9078\u64C7\u6216\u8F38\u5165\u54C1\u724C\uFF0CEnter \u65B0\u589E", data: brandSuggestions, value: selectedBrands, onChange: setSelectedBrands, clearable: true, rightSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconChevronDown, { size: 14 }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 371,
              columnNumber: 170
            }, this), rightSectionPointerEvents: "none" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 371,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TagsInput, { label: "\u7522\u696D", placeholder: "\u9078\u64C7\u6216\u8F38\u5165\u7522\u696D\uFF0CEnter \u65B0\u589E", data: industrySuggestions, value: selectedIndustries, onChange: setSelectedIndustries, clearable: true, rightSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconChevronDown, { size: 14 }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 372,
              columnNumber: 181
            }, this), rightSectionPointerEvents: "none" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 372,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "\u8CA0\u8CAC\u696D\u52D9", placeholder: "\u9078\u64C7\u8CA0\u8CAC\u696D\u52D9", data: salesOwners, value: selectedSales, onChange: setSelectedSales, clearable: true, searchable: true, rightSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconChevronDown, { size: 14 }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 373,
              columnNumber: 163
            }, this), rightSectionPointerEvents: "none" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 373,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "\u8CA0\u8CAC KOL Team \u6210\u54E1", placeholder: "\u9078\u64C7 KOL Team \u6210\u54E1", data: kolManagers, value: selectedKolManagers, onChange: setSelectedKolManagers, clearable: true, searchable: true, rightSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconChevronDown, { size: 14 }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 374,
              columnNumber: 193
            }, this), rightSectionPointerEvents: "none" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 374,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "startDate", label: "\u958B\u59CB\u65E5", type: "date", value: startDate, onChange: (e) => setStartDate(e.currentTarget.value) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 375,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "endDate", label: "\u7D50\u675F\u65E5", type: "date", value: endDate, onChange: (e) => setEndDate(e.currentTarget.value) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 376,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 359,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 357,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 380,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u8CA1\u52D9\u8CC7\u8A0A" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 384,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
            base: 1,
            md: 3
          }, spacing: "md", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "projectQuote", label: "\u5C08\u6848\u5831\u50F9 (\u672A\u7A05)", type: "number", placeholder: "0", value: projectQuote || "", onChange: (e) => setProjectQuote(Number(e.currentTarget.value) || 0) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 389,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "taxRate", label: "\u7A05\u7387 (%)", type: "number", value: taxRate, onChange: (e) => setTaxRate(Number(e.currentTarget.value) || 0) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 390,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5C08\u6848\u7E3D\u91D1\u984D (\u542B\u7A05)", readOnly: true, value: `NT$ ${totalWithTax.toLocaleString()}`, styles: {
              input: {
                color: "var(--mantine-color-blue-6)",
                fontWeight: 600
              }
            } }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 391,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 385,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 383,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 400,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u5408\u4F5C\u5167\u5BB9" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 404,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
            base: 1,
            md: 2
          }, spacing: "md", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "services", label: "\u5408\u4F5C\u5167\u5BB9", placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 409,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "authorization", label: "\u6388\u6B0A\u9805\u76EE", placeholder: "\u4F8B\u5982\uFF1A\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 410,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 405,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 403,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 414,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: "sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: "\u5408\u4F5C KOL" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 419,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", onClick: () => {
              if (typeof window.kolDialogOpen === "function")
                window.kolDialogOpen();
            }, children: "\u9078\u64C7\u5408\u4F5C KOL" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 420,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 418,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "kol-selected-display", style: {
            minHeight: 40
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            fontSize: 14,
            color: "var(--mantine-color-dimmed)",
            margin: "8px 0"
          }, children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 431,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 428,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "kol-selected-json", name: "selectedKolsJson", style: {
            display: "none"
          }, defaultValue: JSON.stringify(initialCollabs), readOnly: true }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 440,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
            __html: "setTimeout(function(){ if(typeof kolRenderSelected==='function') kolRenderSelected(); }, 100);"
          } }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 444,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 417,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 450,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u6A94\u6848 (\u5408\u7D04)" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 453,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mb: "xs", children: "\u4E0A\u50B3\u7D93\u96D9\u65B9\u78BA\u8A8D\u7684\u59D4\u520A\u55AE PDF/Word \u6A94\u6848 (\u9078\u586B)" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 454,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "file", name: "documentUrl", accept: ".pdf,.doc,.docx" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 455,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "existingDocumentUrl", value: insertionOrder?.documentUrl || "" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 456,
            columnNumber: 15
          }, this),
          insertionOrder?.documentUrl && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", mt: "xs", c: "green", children: [
            "\u2714\uFE0F \u5DF2\u4E0A\u50B3\u6A94\u6848: ",
            insertionOrder.documentUrl
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 457,
            columnNumber: 47
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 452,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 460,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u5176\u4ED6\u8CC7\u8A0A" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 463,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "description", label: "\u5C08\u6848\u8AAA\u660E", minRows: 4, defaultValue: initialDescription }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 465,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "internalNotes", label: "\u5167\u90E8\u5099\u8A3B", minRows: 3, defaultValue: initialInternalNotes }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 466,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 464,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 462,
          columnNumber: 13
        }, this),
        actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "red", children: actionData.error }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 470,
          columnNumber: 35
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 473,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", name: "intent", value: "update", loading: submitting, children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 475,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 474,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 472,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 355,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 344,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 343,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dialog", { id: "kol-select-dialog", style: {
      padding: 24,
      borderRadius: 8,
      border: "1px solid var(--mantine-color-default-border)",
      background: "var(--mantine-color-body)",
      color: "var(--mantine-color-text)",
      width: "100%",
      maxWidth: 600,
      boxShadow: "0 10px 24px rgba(0,0,0,0.15)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { style: {
          fontSize: 18
        }, children: "\u9078\u64C7\u5408\u4F5C KOL" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 499,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
          if (typeof window.kolDialogClose === "function")
            window.kolDialogClose();
        }, style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 20
        }, children: "\u2715" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
          lineNumber: 502,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 493,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "kol-dialog-search", type: "text", placeholder: "\u641C\u5C0B KOL \u540D\u7A31\u3001\u5E33\u865F\u6216\u7522\u696D", onChange: (e) => {
        if (typeof window.kolDialogSearch === "function")
          window.kolDialogSearch(e.target.value);
      }, style: {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: 4,
        fontSize: 14,
        background: "var(--mantine-color-body)",
        color: "var(--mantine-color-text)",
        boxSizing: "border-box"
      } }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 512,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "kol-dialog-list", style: {
        maxHeight: 400,
        overflowY: "auto",
        marginTop: 12,
        paddingRight: 4
      } }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 525,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginTop: 16,
        textAlign: "right"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
        if (typeof window.kolDialogClose === "function")
          window.kolDialogClose();
      }, style: {
        padding: "8px 20px",
        borderRadius: 4,
        border: "none",
        background: "var(--mantine-color-blue-filled)",
        color: "#fff",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 600
      }, children: "\u5B8C\u6210\u9078\u64C7" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 535,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 531,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 483,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
    lineNumber: 333,
    columnNumber: 10
  }, this);
}
_s(InsertionOrderEditPage, "CvIaangnPZgmuDl4OMys2MB8umY=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = InsertionOrderEditPage;
var _c;
$RefreshReg$(_c, "InsertionOrderEditPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  InsertionOrderEditPage as default
};
//# sourceMappingURL=/build/routes/_app.insertion-orders.$insertionOrderId.edit-OLJ74EP6.js.map
