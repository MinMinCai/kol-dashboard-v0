import "/build/_shared/chunk-HTRQC2VH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
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

// app/routes/_app.kols.new.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.kols.new.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.kols.new.tsx"
  );
  import.meta.hot.lastModified = "1773121759643.2441";
}
var socialScript = `
  var __socials = [{ id:'s0', platform:'Instagram', url:'', followers:'' }];

  function renderSocials() {
    var container = document.getElementById('social-rows');
    if (!container) return;
    container.innerHTML = __socials.map(function(item, idx){
      return '<div style="border:1px solid var(--mantine-color-default-border);border-radius:8px;padding:12px;margin-top:10px;">' +
        '<div style="display:grid;grid-template-columns:1fr 2fr 1fr 80px 36px;gap:8px;align-items:flex-end;">' +
          '<div><label style="font-size:13px;font-weight:500;">\u5E73\u53F0</label>' +
            '<select oninput="updateSocial(\\''+item.id+'\\',\\'platform\\',this.value)" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;background:var(--mantine-color-body);color:var(--mantine-color-text);">' +
              ['Instagram','YouTube','TikTok','Facebook','Twitter','LINE'].map(function(p){ return '<option'+(item.platform===p?' selected':'')+'>'+p+'</option>'; }).join('') +
            '</select></div>' +
          '<div><label style="font-size:13px;font-weight:500;">\u5E33\u865F URL</label>' +
            '<input type="text" value="'+item.url+'" oninput="updateSocial(\\''+item.id+'\\',\\'url\\',this.value)" placeholder="https://instagram.com/username" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;box-sizing:border-box;background:var(--mantine-color-body);color:var(--mantine-color-text);" /></div>' +
          '<div style="display:flex;flex-direction:column;justify-content:flex-end;">' +
            '<button type="button" onclick="fetchFollowers(\\''+item.id+'\\',\\''+item.platform+'\\')" style="padding:7px 10px;border-radius:4px;border:1px solid var(--mantine-color-default-border);background:var(--mantine-color-body);cursor:pointer;font-size:12px;margin-top:auto;color:var(--mantine-color-text);">\u53D6\u5F97\u8FFD\u8E64\u6578</button></div>' +
          '<div><label style="font-size:13px;font-weight:500;">\u8FFD\u8E64\u6578</label>' +
            '<input type="text" readOnly value="'+(item.followers||'-')+'" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;background:var(--mantine-color-body);color:var(--mantine-color-dimmed);" /></div>' +
          '<div style="display:flex;align-items:flex-end;padding-bottom:2px;">' +
            (idx === 0 ? '<span style="width:36px;"></span>' : '<button type="button" onclick="removeSocial(\\''+item.id+'\\');return false;" style="width:36px;height:34px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:14px;font-weight:700;">\xD7</button>') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    syncSocialsJson();
  }
  function updateSocial(id, key, value) {
    __socials = __socials.map(function(s){ return s.id===id ? Object.assign({},s,{[key]:value}) : s; });
    renderSocials();
    syncSocialsJson();
  }
  function addSocial() {
    if (__socials.length >= 8) return;
    __socials.push({ id:'s'+Date.now(), platform:'Instagram', url:'', followers:'' });
    renderSocials();
  }
  function removeSocial(id) {
    if (__socials.length <= 1) return;
    __socials = __socials.filter(function(s){ return s.id!==id; });
    renderSocials();
  }
  function syncSocialsJson() {
    var el = document.getElementById('socials-json');
    if (el) el.value = JSON.stringify(__socials.map(function(s){ return { platform:s.platform, url:s.url, followers: s.followers ? Number(s.followers) : null }; }));
  }
  async function fetchFollowers(id, platform) {
    var s = __socials.find(function(x){ return x.id===id; });
    if (!s || !s.url) { alert('\u8ACB\u5148\u8F38\u5165\u793E\u7FA4\u5E33\u865F URL'); return; }
    try {
      var r = await fetch('/api/social-followers?platform='+encodeURIComponent(platform)+'&url='+encodeURIComponent(s.url));
      var data = await r.json();
      if (r.ok && data.followers) {
        __socials = __socials.map(function(x){ return x.id===id ? Object.assign({},x,{followers:data.followers}) : x; });
        renderSocials();
      } else { alert(data.error || '\u53D6\u5F97\u8FFD\u8E64\u6578\u5931\u6557'); }
    } catch(e) { alert('\u53D6\u5F97\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66'); }
  }

  // Avatar upload
  function pickAvatar() {
    var fi = document.getElementById('avatar-file-input');
    if (fi) fi.click();
  }
  function previewAvatar(input) {
    var file = input.files && input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(){
      var preview = document.getElementById('avatar-preview');
      var urlInput = document.getElementById('avatar-url-hidden');
      if (preview) preview.src = reader.result;
      if (urlInput) urlInput.value = reader.result;
    };
    reader.readAsDataURL(file);
  }

  document.addEventListener('DOMContentLoaded', function() { renderSocials(); });
  // Also render when script loads (in case DOMContentLoaded has already fired)
  if (document.readyState !== 'loading') { setTimeout(renderSocials, 0); }
`;
function KolCreatePage() {
  _s();
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
      __html: socialScript
    } }, void 0, false, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 209,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 8, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: ">" }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 215,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: "\u65B0\u589E KOL" }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 216,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 213,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "lg", maw: 800, mx: "auto", w: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "KOL \u57FA\u672C\u8CC7\u6599" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 224,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", mb: "lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "avatar-file-input", type: "file", accept: "image/*", style: {
            display: "none"
          }, ...{
            onchange: "previewAvatar(this)"
          } }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", id: "avatar-url-hidden", name: "avatarUrl" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 233,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            width: 220,
            border: "1px dashed #94a3b8",
            borderRadius: 16,
            padding: 20,
            cursor: "pointer",
            textAlign: "center"
          }, ...{
            onclick: "pickAvatar()",
            ondragover: "event.preventDefault()"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { id: "avatar-preview", src: void 0, radius: 999, size: 96 }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 246,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, children: "\u2191" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 247,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: "\u9EDE\u64CA\u4E0A\u50B3 KOL \u7167\u7247" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 248,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u652F\u63F4\u62D6\u62C9\u4E0A\u50B3" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 249,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 245,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 234,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 227,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          sm: 2
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "KOL \u540D\u7A31 *", name: "displayName", placeholder: "\u4F8B\u5982\uFF1AGina", required: true }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 258,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 6, children: "\u6027\u5225" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 261,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
                display: "flex",
                gap: 6,
                alignItems: "center",
                cursor: "pointer"
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "gender", value: "\u7537" }, void 0, false, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 269,
                  columnNumber: 23
                }, this),
                " \u7537"
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 263,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
                display: "flex",
                gap: 6,
                alignItems: "center",
                cursor: "pointer"
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "gender", value: "\u5973", defaultChecked: true }, void 0, false, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 277,
                  columnNumber: 23
                }, this),
                " \u5973"
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 271,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
                display: "flex",
                gap: 6,
                alignItems: "center",
                cursor: "pointer"
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "gender", value: "\u5176\u4ED6" }, void 0, false, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 285,
                  columnNumber: 23
                }, this),
                " \u5176\u4ED6"
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 279,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 262,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 260,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5E74\u9F61", name: "age", type: "number", min: 0, max: 100 }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 290,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u806F\u7D61\u65B9\u5F0F", name: "contactPhone", placeholder: "09xx-xxx-xxx" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 291,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Email", name: "email", type: "email", placeholder: "manager@example.com" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 292,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 254,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { mt: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 4, children: "KOL \u6A19\u7C64\uFF08\u9017\u865F\u5206\u9694\uFF09" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 296,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "tagsInput", type: "text", defaultValue: "\u6BCD\u5B30,\u89AA\u5B50,\u65C5\u904A", placeholder: "\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280", style: {
            width: "100%",
            padding: "8px 12px",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 4,
            fontSize: 14,
            background: "var(--mantine-color-body)",
            color: "var(--mantine-color-text)",
            boxSizing: "border-box"
          } }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 297,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mt: 4, children: "\u7528\u9017\u865F\u5206\u9694\u591A\u500B\u6A19\u7C64\uFF0C\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 307,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 295,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 223,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 311,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u7D93\u71DF\u7684\u793E\u7FA4\u5E73\u53F0" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 315,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "social-rows" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 316,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "socials-json", name: "socialsJson", defaultValue: "[]", style: {
          display: "none"
        }, readOnly: true }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 317,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
          padding: "7px 14px",
          borderRadius: 4,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          cursor: "pointer",
          fontSize: 14,
          color: "var(--mantine-color-blue-filled)"
        }, ...{
          onclick: "addSocial()"
        }, children: "+ \u65B0\u589E\u793E\u7FA4\u5E73\u53F0" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 321,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 320,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 314,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 337,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u5176\u4ED6\u8CC7\u8A0A" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 341,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { label: "\u63CF\u8FF0", name: "description", placeholder: "KOL \u5167\u5BB9\u98A8\u683C\u3001\u64C5\u9577\u4E3B\u984C\u3001\u5408\u4F5C\u4EAE\u9EDE", minRows: 4 }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 343,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { label: "\u5167\u90E8\u5099\u8A3B", name: "internalComments", placeholder: "\u50C5\u5167\u90E8\u53EF\u898B\uFF0C\u4F8B\u5982\u5831\u50F9\u504F\u597D\u3001\u6E9D\u901A\u6CE8\u610F\u4E8B\u9805", minRows: 3 }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 344,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 342,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 340,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "red", title: "\u5EFA\u7ACB\u5931\u6557", children: actionData.error }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 348,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 351,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", name: "intent", value: "draft", variant: "default", loading: submitting, children: "\u5132\u5B58\u8349\u7A3F" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 353,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", name: "intent", value: "create", loading: submitting, children: "\u5EFA\u7ACB KOL" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 354,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 352,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 350,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 221,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 220,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 219,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.kols.new.tsx",
    lineNumber: 208,
    columnNumber: 10
  }, this);
}
_s(KolCreatePage, "e3rMULficn7ldQYYArv00m53mwQ=", false, function() {
  return [useActionData, useNavigation];
});
_c = KolCreatePage;
var _c;
$RefreshReg$(_c, "KolCreatePage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  KolCreatePage as default
};
//# sourceMappingURL=/build/routes/_app.kols.new-WHSU7DBO.js.map
