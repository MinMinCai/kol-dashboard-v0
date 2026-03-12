import "/build/_shared/chunk-HTRQC2VH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "/build/_shared/chunk-62B2IAZI.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useLoaderData
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

// app/routes/_app.favorites.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.favorites.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.favorites.tsx"
  );
  import.meta.hot.lastModified = "1773132192179.9048";
}
function FavoritesPage() {
  _s();
  const {
    rows,
    allFolders,
    folderCounts,
    search,
    sort,
    folder
  } = useLoaderData();
  const inputStyle = {
    padding: "8px 12px",
    border: "1px solid var(--mantine-color-default-border)",
    borderRadius: 4,
    fontSize: 14,
    background: "var(--mantine-color-body)",
    color: "var(--mantine-color-text)"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "end", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: [
        "\u6211\u7684\u6536\u85CF (",
        rows.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 110,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
        ...inputStyle,
        cursor: "pointer",
        fontWeight: 500
      }, ...{
        onclick: 'document.getElementById("add-folder-dialog").showModal()'
      }, children: "+ \u65B0\u589E\u8CC7\u6599\u593E" }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 109,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", style: {
      display: "contents"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "folder", value: folder }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 126,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "search", defaultValue: search, placeholder: "\u641C\u5C0B\u6536\u85CF KOL", style: {
          ...inputStyle,
          flex: 1,
          minWidth: 200
        } }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 128,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "sort", defaultValue: sort, style: inputStyle, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rating_desc", children: "\u8A55\u5206\u7531\u9AD8\u5230\u4F4E" }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 134,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "followers_desc", children: "\u7C89\u7D72\u7531\u9AD8\u5230\u4F4E" }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 135,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "name_asc", children: "\u540D\u7A31 A-Z" }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
          ...inputStyle,
          cursor: "pointer",
          background: "var(--mantine-color-blue-filled)",
          color: "#fff",
          border: "none",
          fontWeight: 600
        }, children: "\u5957\u7528" }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 127,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
      allFolders.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: `/favorites?search=${encodeURIComponent(search)}&sort=${sort}&folder=${encodeURIComponent(f)}`, style: {
        padding: "6px 14px",
        borderRadius: 4,
        border: "1px solid var(--mantine-color-default-border)",
        textDecoration: "none",
        background: folder === f ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-body)",
        color: folder === f ? "#fff" : "var(--mantine-color-text)",
        fontWeight: folder === f ? 600 : 400,
        fontSize: 14
      }, children: [
        f,
        " (",
        folderCounts[f] ?? 0,
        ")"
      ] }, f, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 153,
        columnNumber: 30
      }, this)),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
        ...inputStyle,
        cursor: "pointer",
        background: "transparent",
        border: "none",
        color: "var(--mantine-color-blue-filled)"
      }, ...{
        onclick: 'document.getElementById("add-folder-dialog").showModal()'
      }, children: "+ \u65B0\u589E" }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 165,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this),
    rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "xl", style: {
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "48px", children: "\u{1F4C2}" }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 182,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u6B64\u8CC7\u6599\u593E\u5C1A\u7121 KOL" }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 183,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mb: "md", children: "\u8ACB\u5207\u63DB\u8CC7\u6599\u593E\uFF0C\u6216\u524D\u5F80 KOL \u9801\u9762\u52A0\u5165\u6536\u85CF" }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 184,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/kols", children: "\u700F\u89BD KOL" }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 185,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 179,
      columnNumber: 28
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 1,
      md: 2,
      lg: 3,
      xl: 4
    }, spacing: 24, children: rows.map((kol) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, className: "kol-card", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: 6, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, size: 72, radius: 999 }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 194,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: kol.displayName }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 195,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: [
          "@",
          kol.instagramHandle ?? "-"
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 196,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 193,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { mt: "sm", gap: 4, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
          "IG ",
          (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 200,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
          "YT ",
          (kol.social?.youtube ?? 0).toLocaleString()
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 201,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
          "TT ",
          (kol.social?.tiktok ?? 0).toLocaleString()
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 202,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 199,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 6, mt: "sm", children: (kol.tags ?? kol.categories).slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "light", radius: "xl", children: tag }, tag, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 206,
        columnNumber: 70
      }, this)) }, void 0, false, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 205,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mb: 4, children: "\u79FB\u81F3\u8CC7\u6599\u593E\uFF1A" }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 211,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 4, children: ["\u5BB6\u96FB\u5C08\u6848", "\u7F8E\u599D\u5C08\u6848"].map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
          padding: "2px 8px",
          borderRadius: 4,
          border: "1px solid var(--mantine-color-default-border)",
          fontSize: 12,
          cursor: "default",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)"
        }, children: f }, f, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 213,
          columnNumber: 46
        }, this)) }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 212,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 210,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "\u2B50 ",
          (kol.rating ?? 0).toFixed(1)
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 228,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}`, style: {
            fontSize: 14
          }, children: "\u67E5\u770B\u8A73\u7D30" }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 230,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
            margin: 0
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "removeFavorite" }, void 0, false, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 236,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, false, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 237,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
              background: "none",
              border: "1px solid var(--mantine-color-red-light)",
              color: "var(--mantine-color-red-filled)",
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 12,
              cursor: "pointer"
            }, children: "\u53D6\u6D88\u6536\u85CF" }, void 0, false, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 238,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 233,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 229,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 227,
        columnNumber: 15
      }, this)
    ] }, kol.id, true, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 192,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 186,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dialog", { id: "add-folder-dialog", style: {
      padding: 24,
      borderRadius: 8,
      border: "1px solid var(--mantine-color-default-border)",
      background: "var(--mantine-color-body)",
      color: "var(--mantine-color-text)",
      minWidth: 320,
      boxShadow: "0 10px 24px rgba(0,0,0,0.15)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: "\u65B0\u589E\u8CC7\u6599\u593E" }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 266,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
          color: "var(--mantine-color-text)"
        }, ...{
          onclick: 'document.getElementById("add-folder-dialog").close()'
        }, children: "\u2715" }, void 0, false, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 267,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 265,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
            display: "block",
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 4
          }, children: "\u8CC7\u6599\u593E\u540D\u7A31" }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 281,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "new-folder-name", type: "text", placeholder: "\u4F8B\u5982\uFF1A\u6BCD\u5B30\u5C08\u6848", style: {
            width: "100%",
            padding: "8px 12px",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 4,
            fontSize: 14,
            background: "var(--mantine-color-body)",
            color: "var(--mantine-color-text)",
            boxSizing: "border-box"
          } }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 287,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 280,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid var(--mantine-color-default-border)",
            background: "var(--mantine-color-body)",
            cursor: "pointer",
            fontSize: 14
          }, ...{
            onclick: 'document.getElementById("add-folder-dialog").close()'
          }, children: "\u53D6\u6D88" }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 299,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
            padding: "8px 16px",
            borderRadius: 4,
            border: "none",
            background: "var(--mantine-color-blue-filled)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600
          }, ...{
            onclick: 'document.getElementById("add-folder-dialog").close()'
          }, children: "\u5EFA\u7ACB" }, void 0, false, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 311,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 298,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 279,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 256,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.favorites.tsx",
    lineNumber: 108,
    columnNumber: 10
  }, this);
}
_s(FavoritesPage, "vgOIvwvgGPrKHFQFAWIzD+3Kn8U=", false, function() {
  return [useLoaderData];
});
_c = FavoritesPage;
var _c;
$RefreshReg$(_c, "FavoritesPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  FavoritesPage as default
};
//# sourceMappingURL=/build/routes/_app.favorites-DEBTSRRE.js.map
