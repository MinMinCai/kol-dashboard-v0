import {
  useNotificationStore
} from "/build/_shared/chunk-J2J7XYF7.js";
import {
  IconBulb,
  IconCheck,
  IconClockHour4,
  IconFile,
  IconFileDescription,
  IconRobot,
  IconTemplate,
  IconX
} from "/build/_shared/chunk-ZHSZHK33.js";
import "/build/_shared/chunk-HZBBB3MW.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Modal,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
  useDisclosure
} from "/build/_shared/chunk-O3NZ7MAI.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Link,
  useFetcher,
  useLoaderData
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

// app/routes/_app.insertion-orders._index.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
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
  import.meta.hot.lastModified = "1774603357818.9087";
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
  const fetcher = useFetcher();
  const {
    showToast,
    showBanner
  } = useNotificationStore();
  const [genModalOpen, {
    open: openGenModal,
    close: closeGenModal
  }] = useDisclosure(false);
  const [activeOrder, setActiveOrder] = (0, import_react2.useState)(null);
  const [selectedKolIds, setSelectedKolIds] = (0, import_react2.useState)([]);
  const [selectedTemplate, setSelectedTemplate] = (0, import_react2.useState)("standard");
  const [progressModalOpen, {
    open: openProgressModal,
    close: closeProgressModal
  }] = useDisclosure(false);
  const [progressPercentage, setProgressPercentage] = (0, import_react2.useState)(0);
  const [currentStepIndex, setCurrentStepIndex] = (0, import_react2.useState)(0);
  const handleOpenGenModal = (order) => {
    setActiveOrder(order);
    const readyIds = (order.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).map((k) => k.id);
    setSelectedKolIds(readyIds.length > 0 ? readyIds : ["demo-gina"]);
    openGenModal();
  };
  const toggleKolSelection = (kolId) => {
    setSelectedKolIds((prev) => prev.includes(kolId) ? prev.filter((id) => id !== kolId) : [...prev, kolId]);
  };
  const startGeneration = () => {
    closeGenModal();
    openProgressModal();
    setProgressPercentage(0);
    setCurrentStepIndex(0);
    const interval = setInterval(() => {
      setProgressPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 10) + 2;
        return next > 100 ? 100 : next;
      });
    }, 400);
    return () => clearInterval(interval);
  };
  (0, import_react2.useEffect)(() => {
    if (progressPercentage < 20)
      setCurrentStepIndex(0);
    else if (progressPercentage < 45)
      setCurrentStepIndex(1);
    else if (progressPercentage < 70)
      setCurrentStepIndex(2);
    else if (progressPercentage < 90)
      setCurrentStepIndex(3);
    else if (progressPercentage < 100)
      setCurrentStepIndex(4);
    else if (progressPercentage === 100) {
      setTimeout(() => {
        if (activeOrder) {
          fetcher.submit({
            intent: "generateReport",
            orderId: activeOrder.id
          }, {
            method: "post"
          });
          const title = "\u7D50\u6848\u5831\u544A\u5DF2\u751F\u6210\u5B8C\u6210\uFF01";
          const message = `${activeOrder.orderNo} ${activeOrder.title || activeOrder.projectName}|\u7D50\u6848\u5831\u544A_v1.pptx`;
          showToast(title, message, "/reports/generate");
          showBanner(title, message, "/reports/generate");
        }
        closeProgressModal();
      }, 500);
    }
  }, [progressPercentage]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u59D4\u520A\u55AE\u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 242,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders/new", children: "\u65B0\u589E\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 244,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 243,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 241,
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
          lineNumber: 259,
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
          lineNumber: 267,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 255,
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
          lineNumber: 281,
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
            lineNumber: 296,
            columnNumber: 17
          }, this),
          allClients.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: c, children: c }, c, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 297,
            columnNumber: 38
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 287,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 280,
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
          lineNumber: 303,
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
            lineNumber: 318,
            columnNumber: 17
          }, this),
          allIndustries.map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: i, children: i }, i, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 319,
            columnNumber: 41
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 309,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 302,
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
          lineNumber: 325,
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
            lineNumber: 340,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "planned", children: "\u898F\u5283\u4E2D" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 341,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "in_progress", children: "\u57F7\u884C\u4E2D" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 342,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "completed", children: "\u5DF2\u7D50\u6848" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 343,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 331,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 324,
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
          lineNumber: 349,
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
            lineNumber: 364,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "last30", children: "\u8FD1 30 \u5929" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 365,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "last90", children: "\u8FD1 90 \u5929" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 366,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "thisYear", children: "2026 \u5E74" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 367,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 355,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 348,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "pageSize", value: pageSize }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 372,
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
        lineNumber: 374,
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
        lineNumber: 387,
        columnNumber: 100
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 253,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 252,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 249,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 2,
      md: 4
    }, spacing: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u59D4\u520A\u55AE\u6578" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 408,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: stats.total }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 409,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 407,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u7E3D\u9810\u7B97" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 412,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: [
          "NT$ ",
          stats.budget.toLocaleString()
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 413,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 411,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u7E3D\u89F8\u53CA" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 416,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: numberShort(stats.reach) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 417,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 415,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u7E3D\u4E92\u52D5" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 420,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: numberShort(stats.engagement) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 421,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 419,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 403,
      columnNumber: 7
    }, this),
    rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "xl", style: {
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "48px", children: "\u{1F4C4}" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 429,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u5C1A\u7121\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 430,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mb: "md", children: "\u8ABF\u6574\u7BE9\u9078\u689D\u4EF6\uFF0C\u6216\u5EFA\u7ACB\u60A8\u7684\u7B2C\u4E00\u500B\u59D4\u520A\u55AE" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 431,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/insertion-orders/new", children: "\u958B\u59CB\u5EFA\u7ACB" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 432,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 426,
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
            lineNumber: 439,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: status.color, variant: "light", children: status.label }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 440,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 438,
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
            lineNumber: 447,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u8CA0\u8CAC\u696D\u52D9: ",
            order.salesOwner ?? "-",
            " | KOL\u7A97\u53E3: ",
            order.kolManager ?? "-"
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 448,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 443,
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
            lineNumber: 455,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u7E3D\u9810\u7B97: NT$ ",
            (order.totalBudget ?? 0).toLocaleString()
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 456,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u5E73\u5747\u8A55\u50F9: \u2B50 ",
            (order.avgRating ?? 0).toFixed(1)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 457,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u7E3D\u89F8\u53CA: ",
            numberShort(order.totalReach)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 458,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u7E3D\u4E92\u52D5: ",
            numberShort(order.totalEngagement)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 459,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 451,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/insertion-orders/${order.id}`, children: "\u67E5\u770B\u8A73\u60C5" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 464,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: () => handleOpenGenModal(order), children: "\u{1F4CA} \u7522\u751F\u5831\u544A" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 465,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 463,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 462,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 437,
        columnNumber: 17
      }, this) }, order.id, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 436,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 433,
      columnNumber: 19
    }, this),
    totalPages > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u6BCF\u9801\u7B46\u6578" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 476,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", style: {
          display: "inline"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "search", value: search }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 480,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "client", value: clientFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 481,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "industry", value: industryFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 482,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "status", value: statusFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 483,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "time", value: timeFilter }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 484,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "page", value: "1" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 485,
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
              lineNumber: 494,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "10", children: "10" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 495,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "20", children: "20" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 496,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 486,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 477,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 475,
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
          lineNumber: 502,
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
          lineNumber: 515,
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
          lineNumber: 528,
          columnNumber: 42
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 501,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 474,
      columnNumber: 26
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: genModalOpen, onClose: closeGenModal, title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, size: "lg", children: "\u751F\u6210\u7D50\u6848\u5831\u544A" }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 541,
      columnNumber: 67
    }, this), size: "xl", children: activeOrder && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xl", mt: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, bg: "gray.0", p: "sm", radius: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xl", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u6848\u4EF6\u7DE8\u865F" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 547,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: [
            "#",
            activeOrder.orderNo
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 548,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 546,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u6848\u4EF6\u540D\u7A31" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 551,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: activeOrder.title }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 552,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 550,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u5BA2\u6236" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 555,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: activeOrder.clientName }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 556,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 554,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 545,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 544,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "lg", mb: 4, children: "\u6B65\u9A5F 1\uFF1A\u78BA\u8A8D KOL \u6210\u6548\u8CC7\u6599" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 563,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mb: "md", children: "\u7CFB\u7D71\u5C07\u81EA\u52D5\u9078\u64C7\u5DF2\u4E0A\u50B3\u6210\u6548\u7684 KOL" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 564,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: "green.7", mb: "xs", children: "\u2705 \u5DF2\u4E0A\u50B3\u6210\u6548\u7684 KOL (\u9810\u8A2D\u9078\u64C7)" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 569,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: [
              (activeOrder.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).map((kol, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", radius: "md", style: {
                transition: "all 0.2s",
                cursor: "pointer"
              }, className: "hover:shadow-sm", onClick: () => toggleKolSelection(kol.id), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedKolIds.includes(kol.id), onChange: () => toggleKolSelection(kol.id), onClick: (e) => e.stopPropagation() }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 576,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, radius: "xl", size: "md" }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 577,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                  flexGrow: 1
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: kol.name || "KOL Name" }, void 0, false, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 581,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", mt: 4, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                    "IG\u8CBC\u6587 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.insertion-orders._index.tsx",
                      lineNumber: 583,
                      columnNumber: 63
                    }, this),
                    " | IG\u9650\u52D5 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.insertion-orders._index.tsx",
                      lineNumber: 586,
                      columnNumber: 40
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 583,
                    columnNumber: 31
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 582,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 578,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                  textAlign: "right"
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "dot", color: "blue", children: "\u7E3D\u89F8\u53CA 80K" }, void 0, false, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 595,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mt: 4, children: "\u4E92\u52D5\u7387 7.8%" }, void 0, false, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 596,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 592,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 575,
                columnNumber: 25
              }, this) }, kol.id || idx, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 571,
                columnNumber: 126
              }, this)),
              (activeOrder.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", radius: "md", style: {
                cursor: "pointer"
              }, onClick: () => toggleKolSelection("demo-gina"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedKolIds.includes("demo-gina"), onChange: () => toggleKolSelection("demo-gina"), onClick: (e) => e.stopPropagation() }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 605,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { color: "blue", radius: "xl", size: "md", children: "G" }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 606,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                  flexGrow: 1
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: "Gina (Demo)" }, void 0, false, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 610,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", mt: 4, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                    "IG\u8CBC\u6587 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.insertion-orders._index.tsx",
                      lineNumber: 612,
                      columnNumber: 63
                    }, this),
                    " | IG\u9650\u52D5 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.insertion-orders._index.tsx",
                      lineNumber: 615,
                      columnNumber: 40
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 612,
                    columnNumber: 31
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 611,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 607,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 604,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 601,
                columnNumber: 124
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 570,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 568,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: "orange.7", mb: "xs", children: "\u26A0\uFE0F \u5C1A\u672A\u4E0A\u50B3\u6210\u6548\u7684 KOL" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 628,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: (activeOrder.collaborations || []).filter((k) => !(k.performanceItems || []).length).map((kol, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", radius: "md", bg: "orange.0", style: {
              opacity: 0.8,
              cursor: "pointer"
            }, onClick: () => toggleKolSelection(kol.id), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedKolIds.includes(kol.id), onChange: () => toggleKolSelection(kol.id), onClick: (e) => e.stopPropagation() }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 635,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, radius: "xl", size: "md", style: {
                filter: "grayscale(100%)"
              } }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 636,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                flexGrow: 1
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, c: "dimmed", children: kol.name || "KOL Name" }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 642,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", mt: 4, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "red.7", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconX, { size: 12, style: {
                    display: "inline"
                  } }, void 0, false, {
                    fileName: "app/routes/_app.insertion-orders._index.tsx",
                    lineNumber: 644,
                    columnNumber: 57
                  }, this),
                  " \u7121\u6210\u6548\u8CC7\u6599"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 644,
                  columnNumber: 31
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 643,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 639,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "subtle", size: "xs", color: "blue", rightSection: "\u2192", children: "\u524D\u5F80\u4E0A\u50B3\u6210\u6548" }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 649,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 634,
              columnNumber: 25
            }, this) }, kol.id || idx, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 630,
              columnNumber: 123
            }, this)) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 629,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 627,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { bg: "blue.0", p: "sm", radius: "md", mt: "xs", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", align: "flex-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "blue", variant: "light", size: "sm", mt: 2, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBulb, { size: 14 }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 658,
              columnNumber: 78
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 658,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "blue.9", style: {
              lineHeight: 1.4
            }, children: "\u672A\u52FE\u9078\u7684 KOL \u5C07\u4E0D\u6703\u51FA\u73FE\u5728\u5831\u544A\u4E2D\u3002\u5EFA\u8B70\u5148\u4E0A\u50B3\u6240\u6709 KOL \u7684\u6210\u6548\u8CC7\u6599\u5F8C\u518D\u751F\u6210\u5831\u544A\u3002" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 659,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 657,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 656,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 566,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 562,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 669,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "lg", mb: "md", children: "\u6B65\u9A5F 2\uFF1A\u5831\u544A\u8A2D\u5B9A" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 673,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5831\u544A\u6A19\u984C", defaultValue: `${activeOrder.title} \u7D50\u6848\u5831\u544A`, description: "0/100" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 676,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: "xs", children: "PowerPoint \u6A21\u677F" }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 679,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { grow: true, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", onClick: () => setSelectedTemplate("standard"), style: {
                borderColor: selectedTemplate === "standard" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)",
                cursor: "pointer"
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "standard" ? "blue" : "gray", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTemplate, {}, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 686,
                  columnNumber: 120
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 686,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: selectedTemplate === "standard" ? "" : "dimmed", children: "\u516C\u53F8\u6A19\u6E96\u6A21\u677F" }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 687,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 685,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 681,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", onClick: () => setSelectedTemplate("simple"), style: {
                borderColor: selectedTemplate === "simple" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)",
                cursor: "pointer"
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "simple" ? "blue" : "gray", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTemplate, {}, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 695,
                  columnNumber: 118
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 695,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: selectedTemplate === "simple" ? "" : "dimmed", children: "\u7C21\u7D04\u6A21\u677F" }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 696,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 694,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 690,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", onClick: () => setSelectedTemplate("none"), style: {
                borderColor: selectedTemplate === "none" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)",
                cursor: "pointer"
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "none" ? "blue" : "gray", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconFile, {}, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 704,
                  columnNumber: 116
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 704,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: selectedTemplate === "none" ? "" : "dimmed", children: "\u4E0D\u5957\u7528\u6A21\u677F" }, void 0, false, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 705,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 703,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 699,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 680,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 678,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { bg: "gray.0", p: "sm", radius: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "gray", variant: "light", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconFileDescription, { size: 16 }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 713,
              columnNumber: 61
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 713,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, children: "\u9810\u4F30\u9801\u6578: \u7D04 18 \u9801" }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 715,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "(\u5C01\u9762 + 3\u500BKOL \xD7 \u5E73\u57475\u9801 + \u7E3D\u7D50)" }, void 0, false, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 716,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 714,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 712,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 711,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 675,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 672,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "ghost", color: "gray", onClick: closeGenModal, children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 724,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { label: "\u5831\u544A\u5C07\u5728\u80CC\u666F\u751F\u6210\uFF0C\u5B8C\u6210\u5F8C\u6703\u901A\u77E5\u60A8", position: "top", withArrow: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { color: "blue", size: "lg", onClick: startGeneration, leftSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconRobot, { size: 20 }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 726,
          columnNumber: 87
        }, this), children: "\u958B\u59CB\u751F\u6210" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 726,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 725,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 723,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 542,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 541,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: progressModalOpen, onClose: closeProgressModal, withCloseButton: false, size: "md", centered: true, overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", ta: "center", gap: "md", py: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: 64, radius: "100%", variant: "light", color: "blue", style: {
        animation: "pulse 2s infinite"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconRobot, { size: 40 }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 743,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 740,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "AI \u6B63\u5728\u70BA\u60A8\u751F\u6210\u5831\u544A" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 746,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mt: 4, children: [
          "\u6848\u4EF6 #",
          activeOrder?.orderNo,
          " ",
          activeOrder?.title
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 747,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 745,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { w: "100%", my: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: 8, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, children: "\u9032\u5EA6" }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 754,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, c: "blue", children: [
            progressPercentage,
            "%"
          ] }, void 0, true, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 755,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 753,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { value: progressPercentage, size: "lg", radius: "xl", striped: true, animated: true, color: "blue" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 757,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 752,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", w: "100%", align: "flex-start", pl: "md", children: ["\u6536\u96C6\u6848\u4EF6\u8CC7\u6599", "\u6574\u7406 KOL \u6210\u6548\u6578\u64DA", "AI \u751F\u6210\u5831\u544A\u5167\u5BB9\u4E2D...", "\u5957\u7528 PowerPoint \u6A21\u677F", "\u4E0A\u50B3\u81F3\u96F2\u7AEF\u5132\u5B58"].map((stepDesc, idx) => {
        const isCompleted = currentStepIndex > idx;
        const isCurrent = currentStepIndex === idx;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", gap: "sm", children: [
          isCompleted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "green", size: 20, radius: "xl", variant: "filled", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 14 }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 766,
            columnNumber: 98
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 766,
            columnNumber: 34
          }, this) : isCurrent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "blue", size: 20, radius: "xl", variant: "light", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconRobot, { size: 14 }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 766,
            columnNumber: 210
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 766,
            columnNumber: 148
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "gray", size: 20, radius: "xl", variant: "light", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconClockHour4, { size: 14 }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 766,
            columnNumber: 310
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 766,
            columnNumber: 248
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: isCurrent ? 600 : 400, c: isCompleted ? "dimmed" : isCurrent ? "blue.7" : "gray.5", children: stepDesc }, void 0, false, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 767,
            columnNumber: 19
          }, this)
        ] }, idx, true, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 765,
          columnNumber: 20
        }, this);
      }) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 761,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mt: "xs", children: "\u9810\u8A08\u9084\u9700 2 \u5206\u9418" }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 774,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { bg: "blue.0", w: "100%", p: "sm", radius: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", align: "center", justify: "center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBulb, { size: 18, color: "var(--mantine-color-blue-7)" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 778,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "blue.9", children: "\u60A8\u53EF\u4EE5\u95DC\u9589\u6B64\u8996\u7A97\u7E7C\u7E8C\u5176\u4ED6\u5DE5\u4F5C\uFF0C\u5B8C\u6210\u5F8C\u6703\u901A\u77E5\u60A8" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 779,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 777,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 776,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { w: "100%", grow: true, mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "outline", color: "red", onClick: closeProgressModal, children: "\u53D6\u6D88\u751F\u6210" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 784,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { onClick: closeProgressModal, children: "\u5728\u80CC\u666F\u7E7C\u7E8C" }, void 0, false, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 785,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 783,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 739,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 735,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { children: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      ` }, void 0, false, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 790,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.insertion-orders._index.tsx",
    lineNumber: 240,
    columnNumber: 10
  }, this);
}
_s(InsertionOrderListPage, "WHfBh0Mp9ECv7X9HlcSQoEFJp2E=", false, function() {
  return [useLoaderData, useFetcher, useNotificationStore, useDisclosure, useDisclosure];
});
_c = InsertionOrderListPage;
var _c;
$RefreshReg$(_c, "InsertionOrderListPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  InsertionOrderListPage as default
};
//# sourceMappingURL=/build/routes/_app.insertion-orders._index-4LMVX47X.js.map
