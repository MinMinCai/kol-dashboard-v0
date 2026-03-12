import "/build/_shared/chunk-HTRQC2VH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Badge,
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

// app/routes/_app.insertion-orders._index.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.insertion-orders._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.insertion-orders._index.tsx"
  );
  import.meta.hot.lastModified = "1773115231238.2544";
}
function statusMeta(status) {
  if (status === "completed")
    return {
      label: "\u5DF2\u7D50\u6848",
      color: "green"
    };
  if (status === "in_progress")
    return {
      label: "\u57F7\u884C\u4E2D",
      color: "yellow"
    };
  return {
    label: "\u898F\u5283\u4E2D",
    color: "gray"
  };
}
function numberShort(value) {
  const n = value ?? 0;
  if (n >= 1e6)
    return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3)
    return `${Math.round(n / 1e3)}K`;
  return `${n}`;
}
function InsertionOrderListPage() {
  _s();
  const {
    rows,
    stats,
    totalPages,
    currentPage,
    pageSize,
    allClients,
    allIndustries,
    search,
    clientFilter,
    industryFilter,
    statusFilter,
    timeFilter
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u59D4\u520A\u55AE\u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders/new", children: "\u65B0\u589E\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 125,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", style: {
      display: "contents"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "end", wrap: "wrap", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        flex: 1,
        minWidth: 200
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4
        }, children: "\u641C\u5C0B" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "search", defaultValue: search, placeholder: "\u641C\u5C0B\u59D4\u520A\u55AE\u7DE8\u865F\u3001\u6A19\u984C\u6216\u5BA2\u6236", style: {
          width: "100%",
          padding: "8px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          fontSize: 14,
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          boxSizing: "border-box"
        } }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 148,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 136,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4
        }, children: "\u5BA2\u6236" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 162,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "client", defaultValue: clientFilter, style: {
          padding: "8px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          fontSize: 14,
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          minWidth: 140
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "\u5168\u90E8" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 177,
            columnNumber: 17
          }, this),
          allClients.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: c, children: c }, c, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 178,
            columnNumber: 38
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 168,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 161,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4
        }, children: "\u7522\u696D" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "industry", defaultValue: industryFilter, style: {
          padding: "8px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          fontSize: 14,
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          minWidth: 140
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "\u5168\u90E8" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 199,
            columnNumber: 17
          }, this),
          allIndustries.map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: i, children: i }, i, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 200,
            columnNumber: 41
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 183,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4
        }, children: "\u72C0\u614B" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 206,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "status", defaultValue: statusFilter, style: {
          padding: "8px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          fontSize: 14,
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          minWidth: 120
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "\u5168\u90E8" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 221,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "planned", children: "\u898F\u5283\u4E2D" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 222,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "in_progress", children: "\u57F7\u884C\u4E2D" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 223,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "completed", children: "\u5DF2\u7D50\u6848" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 212,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 205,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 4
        }, children: "\u6642\u9593" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 230,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "time", defaultValue: timeFilter, style: {
          padding: "8px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          fontSize: 14,
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          minWidth: 140
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "\u5168\u90E8" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 245,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "last30", children: "\u8FD1 30 \u5929" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 246,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "last90", children: "\u8FD1 90 \u5929" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 247,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "thisYear", children: "2026 \u5E74" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 248,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 236,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 229,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "pageSize", value: pageSize }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 253,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
        padding: "8px 20px",
        background: "var(--mantine-color-blue-filled)",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer"
      }, children: "\u5957\u7528\u7BE9\u9078" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 255,
        columnNumber: 13
      }, this),
      (search || clientFilter || industryFilter || statusFilter || timeFilter !== "all") && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/insertion-orders", style: {
        padding: "8px 16px",
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: 4,
        fontSize: 14,
        textDecoration: "none",
        color: "var(--mantine-color-text)",
        background: "var(--mantine-color-body)"
      }, children: "\u6E05\u9664\u7BE9\u9078" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 268,
        columnNumber: 100
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 134,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 133,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 2,
      md: 4
    }, spacing: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u59D4\u520A\u55AE\u6578" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 289,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: stats.total }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 290,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 288,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u7E3D\u9810\u7B97" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 293,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: [
          "NT$ ",
          stats.budget.toLocaleString()
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 294,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 292,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u7E3D\u89F8\u53CA" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 297,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: numberShort(stats.reach) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 298,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 296,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u7E3D\u4E92\u52D5" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 301,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: numberShort(stats.engagement) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 302,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 300,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 284,
      columnNumber: 7
    }, this),
    rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "xl", style: {
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "48px", children: "\u{1F4C4}" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 310,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u5C1A\u7121\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 311,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mb: "md", children: "\u8ABF\u6574\u7BE9\u9078\u689D\u4EF6\uFF0C\u6216\u5EFA\u7ACB\u60A8\u7684\u7B2C\u4E00\u500B\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 312,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders/new", children: "\u958B\u59CB\u5EFA\u7ACB" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 313,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 307,
      columnNumber: 28
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: rows.map((order) => {
      const status = statusMeta(order.status);
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, className: "io-card", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: [
            "\u{1F4CB} #",
            order.orderNo,
            " ",
            order.title ?? "\u672A\u547D\u540D\u5C08\u6848"
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 320,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: status.color, variant: "light", children: status.label }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 321,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 319,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          md: 2
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u5BA2\u6236: ",
            order.clientName,
            " | \u7522\u696D: ",
            order.industry ?? "-"
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 328,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u8CA0\u8CAC\u696D\u52D9: ",
            order.salesOwner ?? "-",
            " | KOL\u7A97\u53E3: ",
            order.kolManager ?? "-"
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 329,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 324,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 2,
          md: 5
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u5408\u4F5C KOL: ",
            order.kolCount ?? 0,
            " \u4F4D"
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 336,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u7E3D\u9810\u7B97: NT$ ",
            (order.totalBudget ?? 0).toLocaleString()
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 337,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u5E73\u5747\u8A55\u50F9: \u2B50 ",
            (order.avgRating ?? 0).toFixed(1)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 338,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u7E3D\u89F8\u53CA: ",
            numberShort(order.totalReach)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 339,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u7E3D\u4E92\u52D5: ",
            numberShort(order.totalEngagement)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 340,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 332,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/insertion-orders/${order.id}`, children: "\u67E5\u770B\u8A73\u60C5" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 345,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", component: Link, to: `/reports/generate?orderId=${order.id}`, children: "\u{1F4CA} \u7522\u751F\u5831\u544A" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 346,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 344,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 343,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 318,
        columnNumber: 17
      }, this) }, order.id, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 317,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 314,
      columnNumber: 19
    }, this),
    totalPages > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u6BCF\u9801\u7B46\u6578" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 357,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", style: {
          display: "inline"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "search", value: search }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 361,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "client", value: clientFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 362,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "industry", value: industryFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 363,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "status", value: statusFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 364,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "time", value: timeFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 365,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "page", value: "1" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 366,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "pageSize", defaultValue: pageSize, onChange: (e) => e.currentTarget.form.submit(), style: {
            padding: "6px 10px",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 4,
            fontSize: 14,
            background: "var(--mantine-color-body)",
            color: "var(--mantine-color-text)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "5" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 375,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "10", children: "10" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 376,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "20", children: "20" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 377,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 367,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 358,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 356,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 4, children: [
        currentPage > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: `/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${currentPage - 1}&pageSize=${pageSize}`, style: {
          padding: "6px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          textDecoration: "none",
          color: "var(--mantine-color-text)",
          fontSize: 14
        }, children: "\u2039 \u4E0A\u4E00\u9801" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 383,
          columnNumber: 33
        }, this),
        Array.from({
          length: totalPages
        }, (_, i) => i + 1).map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: `/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${p}&pageSize=${pageSize}`, style: {
          padding: "6px 10px",
          border: p === currentPage ? "1px solid var(--mantine-color-blue-filled)" : "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          textDecoration: "none",
          background: p === currentPage ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-body)",
          color: p === currentPage ? "#fff" : "var(--mantine-color-text)",
          fontSize: 14,
          fontWeight: p === currentPage ? 600 : 400
        }, children: p }, p, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 396,
          columnNumber: 38
        }, this)),
        currentPage < totalPages && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: `/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${currentPage + 1}&pageSize=${pageSize}`, style: {
          padding: "6px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 4,
          textDecoration: "none",
          color: "var(--mantine-color-text)",
          fontSize: 14
        }, children: "\u4E0B\u4E00\u9801 \u203A" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 409,
          columnNumber: 42
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 382,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 355,
      columnNumber: 26
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.insertion-orders._index.tsx",
    lineNumber: 121,
    columnNumber: 10
  }, this);
}
_s(InsertionOrderListPage, "b2ej0NCW+yRt5kLB2GgIBGplAnc=", false, function() {
  return [useLoaderData];
});
_c = InsertionOrderListPage;
var _c;
$RefreshReg$(_c, "InsertionOrderListPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  InsertionOrderListPage as default
};
//# sourceMappingURL=/build/routes/_app.insertion-orders._index-L3GYX5VY.js.map
