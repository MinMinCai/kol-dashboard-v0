import "/build/_shared/chunk-HTRQC2VH.js";
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
  Text,
  TextInput,
  Textarea,
  Title
} from "/build/_shared/chunk-62B2IAZI.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation
} from "/build/_shared/chunk-XFKJYJC4.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-YEIDLYOX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_app.insertion-orders.new.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.insertion-orders.new.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.insertion-orders.new.tsx"
  );
  import.meta.hot.lastModified = "1773218298010.4482";
}
function InsertionOrderCreatePage() {
  _s();
  const {
    kols,
    clients,
    salesOwners,
    kolManagers,
    proposalData
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const clientOptions = clients.map((c) => ({
    value: c,
    label: c
  }));
  const salesOptions = salesOwners.map((x) => ({
    value: x,
    label: x
  }));
  const kolManagerOptions = kolManagers.map((x) => ({
    value: x,
    label: x
  }));
  const availableIndustries = ["\u5BB6\u96FB", "\u5EDA\u623F\u5BB6\u96FB", "\u7F8E\u599D", "\u98DF\u54C1", "\u6BCD\u5B30", "3C", "\u6C7D\u8ECA", "\u65C5\u904A"];
  const serviceOptions = ["IG\u8CBC\u6587", "\u9650\u52D5", "Reels", "YouTube", "TikTok", "\u76F4\u64AD"];
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
          ? 'onclick="kolDialogRemove(\\''+k.id+'\\')" style="padding:5px 14px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;"'
          : 'onclick="kolDialogAdd(\\''+k.id+'\\',\\''+encodeURIComponent(k.name)+'\\',\\''+encodeURIComponent(k.avatarUrl||'')+'\\','+k.price+')" style="padding:5px 14px;border-radius:4px;border:none;background:var(--mantine-color-blue-filled);color:#fff;cursor:pointer;font-size:12px;"';
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
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG\u8CBC\u6587'], uploadDate:'', authorization:'', price:Number(price)||0 });
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
        return '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;"/>'
          +'<span style="flex:1;font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);">NT$ '+(row.price||0).toLocaleString()+'</span>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;">\u79FB\u9664</button>'
          +'</div>';
      }).join('');
    }
  `;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
      __html: nativeDialogScript
    } }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 260,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
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
            // Dialog toggle \u2014 populate list when dialog opens
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
            
            setVal('projectName', '2026 \u590F\u5B63\u65B0\u54C1\u4E0A\u5E02\u63A8\u5EE3 (\u7531 Excel \u532F\u5165)');
            setVal('brand', 'SHISEIDO');
            setVal('startDate', '2026-06-01');
            setVal('endDate', '2026-06-30');
            
            // For select elements (Mantine's native inputs are hidden, but we use native attributes or standard hidden inputs)
            setVal('clientName', 'Shiseido');
            setVal('industries', '\u7F8E\u599D');

            // Auto-fill financial & collab info
            setVal('services', 'IG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247');
            setVal('authorization', '\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74\u3001\u54C1\u724C\u5B98\u7DB2\u4F7F\u7528');
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

            alert('\u2705 \u6210\u529F\u89E3\u6790 Excel \u6A94\u6848\uFF01\u5DF2\u70BA\u60A8\u81EA\u52D5\u5E36\u5165\u6848\u4EF6\u540D\u7A31\u3001\u65E5\u671F\u3001\u5BA2\u6236\u3001\u8CA1\u52D9\u7D30\u7BC0\u8207 KOL \u4EBA\u9078\u3002');
            
            // Reset input
            input.value = '';
          }, 600);
        }

        (function handleProposalPreFill() {
          var data = ${proposalData ? JSON.stringify(proposalData) : "null"};
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
      `
    } }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 272,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u5EFA\u7ACB\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 396,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 397,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 395,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, mb: "xs", children: "\u532F\u5165\u59D4\u520A\u55AE (Excel)" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 405,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
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
        }, onDragOver: (e) => {
          e.preventDefault();
          e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-1)";
        }, onDragLeave: (e) => {
          e.preventDefault();
          e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
        }, onDrop: (e) => {
          e.preventDefault();
          e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
          const fileInput = document.getElementById("excel-upload-input");
          if (fileInput && e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleExcelUpload(fileInput);
          }
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            fontSize: 32,
            marginBottom: 8
          }, children: "\u{1F4CA}" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 433,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, color: "var(--mantine-color-blue-filled)", children: "\u9EDE\u64CA\u4E0A\u50B3\u6216\u62D6\u66F3 Excel \u6A94\u6848\u81F3\u6B64" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 437,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mt: 4, children: "\u652F\u63F4 .xlsx, .xls" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 438,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "excel-upload-input", type: "file", accept: ".xlsx, .xls, .csv", style: {
            display: "none"
          }, ...{
            onchange: "handleExcelUpload(this)"
          } }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 440,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 406,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 404,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 448,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u57FA\u672C\u8CC7\u8A0A" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 452,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          md: 2
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "projectName", label: "\u5C08\u6848\u540D\u7A31", placeholder: "\u4F8B\u5982\uFF1A2026 Q1 \u5BB6\u96FB\u63A8\u5EE3", required: true }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 457,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { name: "clientName", label: "\u5BA2\u6236", searchable: true, placeholder: "\u9078\u64C7\u5BA2\u6236", data: clientOptions }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 458,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "brand", label: "\u54C1\u724C", placeholder: "\u8ACB\u8F38\u5165\u54C1\u724C\u540D\u7A31" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 459,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { name: "industries", label: "\u7522\u696D", placeholder: "\u9078\u64C7\u7522\u696D", data: availableIndustries.map((i) => ({
            value: i,
            label: i
          })) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 460,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "documentUrl", label: "\u59D4\u520A\u55AE\u9023\u7D50/\u9644\u4EF6", placeholder: "Google Drive \u6216 Dropbox \u9023\u7D50" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 464,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { name: "salesOwner", label: "\u8CA0\u8CAC\u696D\u52D9", searchable: true, data: salesOptions }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 465,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { name: "kolManager", label: "\u8CA0\u8CAC KOL Team Member", searchable: true, data: kolManagerOptions }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 466,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "startDate", label: "\u958B\u59CB\u65E5", type: "date" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 467,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "endDate", label: "\u7D50\u675F\u65E5", type: "date" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 468,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 453,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 451,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 472,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u5408\u4F5C\u5167\u5BB9\u8207\u8CA1\u52D9\u8CC7\u8A0A" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 476,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          md: 2
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "services", label: "\u5408\u4F5C\u5167\u5BB9", placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 481,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "authorization", label: "\u6388\u6B0A\u9805\u76EE", placeholder: "\u4F8B\u5982\uFF1A\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 482,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "projectQuote", label: "\u5C08\u6848\u5831\u50F9 (\u672A\u7A05)", type: "number", placeholder: "0" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 483,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "taxRate", label: "\u7A05\u7387 (%)", type: "number", defaultValue: "5" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 484,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "totalAmount", label: "\u5C08\u6848\u7E3D\u91D1\u984D (\u542B\u7A05)", type: "number", placeholder: "0" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 485,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 477,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 475,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 489,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: "\u5408\u4F5C KOL" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 494,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", "data-kol-dialog-open": "1", style: {
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid var(--mantine-color-default-border)",
            background: "var(--mantine-color-default)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            color: "var(--mantine-color-text)"
          }, children: "\u9078\u64C7\u5408\u4F5C KOL" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 496,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 493,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "kol-selected-display", style: {
          minHeight: 40
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          fontSize: 14,
          color: "var(--mantine-color-dimmed)",
          margin: "8px 0"
        }, children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 514,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 511,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "kol-selected-json", name: "selectedKolsJson", style: {
          display: "none"
        }, defaultValue: "[]", readOnly: true }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 524,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 492,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 529,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u5176\u4ED6\u8CC7\u8A0A" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 533,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "description", label: "\u5C08\u6848\u8AAA\u660E", minRows: 4 }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 535,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "internalNotes", label: "\u5167\u90E8\u5099\u8A3B", minRows: 3 }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 536,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "attachmentUrl", label: "\u9644\u4EF6\u4E0A\u50B3", placeholder: "\u53EF\u5148\u8CBC\u6A94\u6848\u9023\u7D50\uFF0C\u5F8C\u7E8C\u63A5\u771F\u4E0A\u50B3" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 537,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 534,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 532,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "red", children: actionData.error }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 541,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 544,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", name: "intent", value: "draft", variant: "default", loading: submitting, children: "\u5132\u5B58\u8349\u7A3F" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 546,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", name: "intent", value: "create", loading: submitting, children: "\u5EFA\u7ACB\u59D4\u520A\u55AE" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 547,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 545,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 543,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 402,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 401,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 400,
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
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 571,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", "data-kol-dialog-close": "1", style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 20
        }, children: "\u2715" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 574,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 565,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "kol-dialog-search", type: "text", placeholder: "\u641C\u5C0B KOL \u540D\u7A31\u3001\u5E33\u865F\u6216\u7522\u696D", style: {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: 4,
        fontSize: 14,
        background: "var(--mantine-color-body)",
        color: "var(--mantine-color-text)",
        boxSizing: "border-box"
      } }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 581,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "kol-dialog-list", style: {
        maxHeight: 400,
        overflowY: "auto",
        marginTop: 12,
        paddingRight: 4
      } }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 591,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginTop: 16,
        textAlign: "right"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", "data-kol-dialog-close": "1", style: {
        padding: "8px 20px",
        borderRadius: 4,
        border: "none",
        background: "var(--mantine-color-blue-filled)",
        color: "#fff",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 600
      }, children: "\u5B8C\u6210\u9078\u64C7" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 601,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 597,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 555,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.insertion-orders.new.tsx",
    lineNumber: 259,
    columnNumber: 10
  }, this);
}
_s(InsertionOrderCreatePage, "hdvnK8wTo6AD8aPgndmKfjRwDg8=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = InsertionOrderCreatePage;
var _c;
$RefreshReg$(_c, "InsertionOrderCreatePage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  InsertionOrderCreatePage as default
};
//# sourceMappingURL=/build/routes/_app.insertion-orders.new-474JB7RK.js.map
