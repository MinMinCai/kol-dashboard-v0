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

// app/routes/_app.kols.$kolId.edit.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.kols.$kolId.edit.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.kols.$kolId.edit.tsx"
  );
  import.meta.hot.lastModified = "1773129758829.5032";
}
function KolEditPage() {
  _s();
  const {
    kol
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 8, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 103,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: ">" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}`, children: kol.displayName }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: ">" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: "\u7DE8\u8F2F KOL" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "lg", maw: 840, mx: "auto", w: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u57FA\u672C\u8CC7\u6599" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 114,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "flex-start", gap: "xl", wrap: "wrap", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, radius: 999, size: 96 }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 117,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u982D\u50CF\u9810\u89BD" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 118,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 116,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", style: {
            flex: 1,
            minWidth: 260
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "KOL \u540D\u7A31 *", name: "displayName", defaultValue: kol.displayName, required: true }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 124,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Instagram \u5E33\u865F", name: "instagramHandle", defaultValue: kol.instagramHandle ?? "", placeholder: "@username" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 125,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u7522\u696D", name: "industry", defaultValue: kol.industry ?? "", placeholder: "\u4F8B\u5982\uFF1A\u6BCD\u5B30 / \u7F8E\u599D" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 126,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u6A19\u7C64\uFF08\u9017\u865F\u5206\u9694\uFF09", name: "tagsInput", defaultValue: (kol.tags ?? kol.categories ?? []).join(", "), placeholder: "\u6BCD\u5B30, \u89AA\u5B50" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 127,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 120,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 115,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 113,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 132,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u793E\u7FA4\u8207\u6210\u6548" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 135,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          sm: 3
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u7C89\u7D72\u6578\uFF08IG\uFF09", name: "followers", type: "number", min: 0, defaultValue: kol.social?.instagram ?? kol.followers ?? 0 }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 140,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u8A55\u5206", name: "rating", type: "number", min: 0, max: 5, step: 0.1, defaultValue: kol.rating ?? 0 }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 141,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5408\u4F5C\u6B21\u6578", name: "collaborations", type: "number", min: 0, defaultValue: kol.collaborations ?? 0 }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 142,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 136,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 146,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u806F\u7D61\u8207\u5099\u8A3B" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 149,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          sm: 2
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u806F\u7D61\u96FB\u8A71", name: "contactPhone", defaultValue: kol.contact?.phone ?? "" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 154,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Email", name: "email", type: "email", defaultValue: kol.contact?.email ?? "" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 155,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 150,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { mt: "md", label: "\u982D\u50CF\u7DB2\u5740", name: "avatarUrl", defaultValue: kol.avatarUrl ?? "", placeholder: "https://..." }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 157,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { mt: "md", label: "\u5099\u8A3B", name: "notes", minRows: 4, defaultValue: kol.notes ?? "" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 158,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 148,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "red", title: "\u5132\u5B58\u5931\u6557", children: actionData.error }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 161,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 166,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/kols/${kol.id}`, variant: "light", children: "\u56DE\u8A73\u7D30\u9801" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 170,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", loading: submitting, children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 173,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 169,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 165,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.kols.$kolId.edit.tsx",
    lineNumber: 101,
    columnNumber: 10
  }, this);
}
_s(KolEditPage, "Jp7LTUxeBoJ8l+tlLtAAK8y6h7g=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = KolEditPage;
var _c;
$RefreshReg$(_c, "KolEditPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  KolEditPage as default
};
//# sourceMappingURL=/build/routes/_app.kols.$kolId.edit-DBLULRYV.js.map
