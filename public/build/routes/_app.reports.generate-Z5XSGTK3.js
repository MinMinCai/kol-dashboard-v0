import "/build/_shared/chunk-HTRQC2VH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
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

// app/routes/_app.reports.generate.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.reports.generate.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.reports.generate.tsx"
  );
  import.meta.hot.lastModified = "1773220480452.0403";
}
function formatShortDate(date) {
  return date.slice(0, 7);
}
function ReportManagementPage() {
  _s();
  const {
    orders,
    allClients,
    clientFilter,
    timeFilter
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u7D50\u6848\u5831\u544A\u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      orders[0] && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { className: "btn-trigger-gen", ...{
        "data-order-name": orders[0].title || orders[0].projectName
      }, children: "+ \u751F\u6210\u65B0\u5831\u544A" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 61,
        columnNumber: 23
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "end", wrap: "wrap", gap: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u5BA2\u6236" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 73,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "client", defaultValue: clientFilter, style: {
          padding: "8px 12px",
          borderRadius: 4,
          border: "1px solid #ddd"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "\u5168\u90E8" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 79,
            columnNumber: 17
          }, this),
          allClients.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: c, children: c }, c, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 80,
            columnNumber: 38
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 74,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 72,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u6642\u9593\u7BC4\u570D" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 84,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "time", defaultValue: timeFilter, style: {
          padding: "8px 12px",
          borderRadius: 4,
          border: "1px solid #ddd"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "\u5168\u90E8" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 90,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "this_year", children: "2026 \u5E74" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 91,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2024_10", children: "2024-10" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 92,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 85,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 83,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", children: "\u5957\u7528\u7BE9\u9078" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 95,
        columnNumber: 13
      }, this),
      (clientFilter || timeFilter !== "all") && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", component: "a", href: "/reports/generate", children: "\u6E05\u9664" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 96,
        columnNumber: 56
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 71,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 70,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: orders.map((order) => {
      const missingCount = (order.collaborations ?? []).filter((k) => !(k.performanceItems ?? []).some((p) => (p.metrics?.impressions ?? 0) > 0)).length;
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, shadow: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, children: [
              "\u{1F4CB} #",
              order.orderNo,
              " ",
              order.title ?? order.projectName ?? "\u672A\u547D\u540D\u6848\u4EF6"
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 109,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: [
              "\u5BA2\u6236: ",
              order.clientName,
              " | \u65E5\u671F: ",
              formatShortDate(order.startDate),
              " | \u5408\u4F5C KOL: ",
              order.kolCount ?? order.collaborations?.length ?? 0,
              " \u4F4D"
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 110,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 108,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/insertion-orders/${order.id}`, style: {
              fontSize: 14
            }, children: "\u67E5\u770B\u6848\u4EF6\u8A73\u60C5" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { size: "xs", className: "btn-trigger-gen", ...{
              "data-order-name": order.title || order.projectName
            }, children: "+ \u751F\u6210\u65B0\u5831\u544A" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 118,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 114,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 107,
          columnNumber: 17
        }, this),
        missingCount > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "yellow", variant: "light", children: [
          "\u26A0\uFE0F ",
          missingCount,
          " \u4F4D KOL \u5C1A\u672A\u4E0A\u50B3\u6210\u6548"
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 126,
          columnNumber: 38
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", size: "sm", className: "btn-trigger-upload", ...{
          "data-order-name": order.title || order.projectName
        }, children: "+ \u4E0A\u50B3\u6B63\u5F0F\u7248" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 129,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 128,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 106,
        columnNumber: 15
      }, this) }, order.id, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 105,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dialog", { id: "report-generate-dialog", style: {
      padding: 24,
      borderRadius: 8,
      border: "1px solid var(--mantine-color-default-border)",
      background: "var(--mantine-color-body)",
      color: "var(--mantine-color-text)",
      width: "100%",
      maxWidth: 640,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: [
        "\u751F\u6210\u7D50\u6848\u5831\u544A - ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "order-name-placeholder", children: "\u6848\u4EF6" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 152,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 152,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "gen-form-ui", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5831\u544A\u6A19\u984C", placeholder: "OOO \u5C08\u6848\u7D50\u6848\u5831\u544A", id: "gen-report-title" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 155,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", mt: "sm", children: "\u9EDE\u64CA\u6309\u9215\u958B\u59CB AI \u5206\u6790\u8207\u751F\u6210\u904E\u7A0B\u3002" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 156,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", className: "btn-close-report-gen", children: "\u53D6\u6D88" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 158,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { id: "start-gen-btn", color: "blue", children: "\u{1F916} \u958B\u59CB AI \u751F\u6210" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 159,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 157,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 154,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "gen-progress-ui", style: {
        display: "none",
        padding: "20px 0"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { id: "gen-status-text", ta: "center", fw: 700, mb: "xs", children: "\u6B63\u5728\u521D\u59CB\u5316..." }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 167,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          width: "100%",
          height: 10,
          background: "#eee",
          borderRadius: 5,
          overflow: "hidden",
          marginBottom: 20
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "gen-progress-bar", style: {
          width: "0%",
          height: "100%",
          background: "#339af0",
          transition: "width 0.3s"
        } }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 176,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 168,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", ta: "center", children: "AI \u6B63\u5728\u9032\u884C\u5167\u5BB9\u6DF1\u6F5B\u8207\u6578\u64DA\u4EA4\u53C9\u5206\u6790..." }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 183,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 163,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "gen-success-ui", style: {
        display: "none",
        textAlign: "center",
        padding: "20px 0"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
          fontSize: 40
        }, children: "\u{1F389}" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 191,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u5831\u544A\u751F\u6210\u6210\u529F\uFF01" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 194,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { mb: "lg", children: "\u60A8\u7684 AI \u6578\u64DA\u6D1E\u5BDF\u7D50\u6848\u5831\u544A\u5DF2\u5099\u59A5\u3002" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { grow: true, w: "100%", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", className: "btn-close-report-gen", children: "\u95DC\u9589" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 197,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { id: "download-ppt-btn", color: "green", children: "\u{1F4E5} \u4E0B\u8F09 PowerPoint" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 198,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 196,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 186,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 151,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 141,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dialog", { id: "report-upload-dialog", style: {
      padding: 24,
      borderRadius: 8,
      border: "1px solid var(--mantine-color-default-border)",
      background: "var(--mantine-color-body)",
      color: "var(--mantine-color-text)",
      width: "100%",
      maxWidth: 480,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: "\u4E0A\u50B3\u6B63\u5F0F\u7D50\u6848\u5831\u544A" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 215,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: [
        "\u6848\u4EF6: ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "order-name-placeholder", children: "\u6848\u4EF6" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 216,
          columnNumber: 42
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { type: "file", label: "\u9078\u64C7\u6A94\u6848 (.pptx, .pdf)" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 217,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u7248\u672C\u8AAA\u660E (\u9078\u586B)", placeholder: "\u4F8B\u5982: \u5DF2\u6839\u64DA\u5BA2\u6236\u56DE\u994B\u4FEE\u6B63..." }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 218,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", className: "btn-close-report-upload", children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 220,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { id: "confirm-upload-btn", color: "blue", children: "\u78BA\u8A8D\u4E0A\u50B3" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 221,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 219,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 214,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 204,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
      __html: `
(function() {
  function bindDialogTriggers() {
    var genBtns = document.querySelectorAll('.btn-trigger-gen');
    var uploadBtns = document.querySelectorAll('.btn-trigger-upload');
    var genDialog = document.getElementById('report-generate-dialog');
    var uploadDialog = document.getElementById('report-upload-dialog');

    function bind(btns, dialog) {
      if (!dialog) return;
      btns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var name = btn.getAttribute('data-order-name');
          dialog.querySelectorAll('.order-name-placeholder').forEach(function(p) { p.textContent = name; });
          dialog.showModal();
          
          if (dialog.id === 'report-generate-dialog') {
            document.getElementById('gen-form-ui').style.display = 'block';
            document.getElementById('gen-progress-ui').style.display = 'none';
            document.getElementById('gen-success-ui').style.display = 'none';
          }
        });
      });
    }

    bind(genBtns, genDialog);
    bind(uploadBtns, uploadDialog);

    // Bind close actions
    document.querySelectorAll('.btn-close-report-gen').forEach(function(btn) {
      btn.addEventListener('click', function() { if (genDialog) genDialog.close(); });
    });
    document.querySelectorAll('.btn-close-report-upload').forEach(function(btn) {
      btn.addEventListener('click', function() { if (uploadDialog) uploadDialog.close(); });
    });

    var downloadBtn = document.getElementById('download-ppt-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function() {
        alert('\u5831\u544A\u4E0B\u8F09\u4E2D...');
        if (genDialog) genDialog.close();
      });
    }

    var confirmUploadBtn = document.getElementById('confirm-upload-btn');
    if (confirmUploadBtn) {
      confirmUploadBtn.addEventListener('click', function() {
        alert('\u5DF2\u6210\u529F\u4E0A\u50B3\u6B63\u5F0F\u7248\u5831\u544A\uFF01');
        if (uploadDialog) uploadDialog.close();
      });
    }
  }

  bindDialogTriggers();

  // Filter Enter Trigger
  document.querySelectorAll('select[name="client"], select[name="time"]').forEach(function(el) {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.closest('form').submit();
      }
    });
  });

  var startGenBtn = document.getElementById('start-gen-btn');
  if (startGenBtn) {
    startGenBtn.addEventListener('click', function() {
      document.getElementById('gen-form-ui').style.display = 'none';
      document.getElementById('gen-progress-ui').style.display = 'block';
      
      var steps = [
        { p: 20, t: '\u{1F50D} \u6B63\u5728\u5F59\u6574\u6240\u6709 KOL \u7684\u6210\u6548\u6578\u64DA...' },
        { p: 45, t: '\u{1F9E0} AI \u6B63\u5728\u5206\u6790\u5404\u7248\u4F4D\u8868\u73FE\u4E26\u7522\u51FA\u6D1E\u5BDF...' },
        { p: 75, t: '\u270D\uFE0F \u6B63\u5728\u81EA\u52D5\u64B0\u5BEB\u57F7\u884C\u6458\u8981\u8207\u5EFA\u8B70\u8A55\u8A9E...' },
        { p: 90, t: '\u{1F3A8} \u6B63\u5728\u5957\u7528\u6A19\u6E96\u6A21\u677F\u4E26\u8F38\u51FA PowerPoint...' },
        { p: 100, t: '\u2705 \u5831\u544A\u5DF2\u751F\u6210\u5B8C\u7562\uFF01' }
      ];
      
      var currentStep = 0;
      var progressBar = document.getElementById('gen-progress-bar');
      var statusText = document.getElementById('gen-status-text');
      
      var interval = setInterval(function() {
        if (currentStep < steps.length) {
          if (progressBar) progressBar.style.width = steps[currentStep].p + '%';
          if (statusText) statusText.textContent = steps[currentStep].t;
          currentStep++;
        } else {
          clearInterval(interval);
          setTimeout(function() {
            document.getElementById('gen-progress-ui').style.display = 'none';
            document.getElementById('gen-success-ui').style.display = 'block';
          }, 500);
        }
      }, 1000);
    });
  }
})();
          `
    } }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 226,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.reports.generate.tsx",
    lineNumber: 58,
    columnNumber: 10
  }, this);
}
_s(ReportManagementPage, "pJiUzYoE5Jp552F/MWIkGAAlbao=", false, function() {
  return [useLoaderData];
});
_c = ReportManagementPage;
var _c;
$RefreshReg$(_c, "ReportManagementPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ReportManagementPage as default
};
//# sourceMappingURL=/build/routes/_app.reports.generate-Z5XSGTK3.js.map
