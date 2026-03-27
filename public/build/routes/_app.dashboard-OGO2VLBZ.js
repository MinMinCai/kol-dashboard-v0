import {
  IconFileInvoice,
  IconFileText,
  IconReportAnalytics,
  IconStar,
  IconUsers
} from "/build/_shared/chunk-ZHSZHK33.js";
import {
  Card,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title
} from "/build/_shared/chunk-MZUJIQGU.js";
import "/build/_shared/chunk-B43JI2TA.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-5YHBI2JG.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_app.dashboard.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.dashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.dashboard.tsx"
  );
  import.meta.hot.lastModified = "1773822961832.0085";
}
var cards = [{
  label: "KOL \u7E3D\u6578",
  value: "128"
}, {
  label: "\u9032\u884C\u4E2D\u63D0\u6848",
  value: "32"
}, {
  label: "\u57F7\u884C\u4E2D\u59D4\u520A\u55AE",
  value: "19"
}, {
  label: "\u672C\u6708\u5E73\u5747 ROAS",
  value: "2.86"
}];
var modules = [{
  title: "KOL \u7BA1\u7406",
  description: "\u641C\u5C0B\u3001\u65B0\u589E\u53CA\u7BA1\u7406 KOL \u6A94\u6848\u8207\u5408\u4F5C\u7D00\u9304",
  icon: IconUsers,
  color: "blue",
  to: "/kols"
}, {
  title: "\u63D0\u6848\u7BA1\u7406",
  description: "\u5EFA\u7ACB\u63D0\u6848\u3001\u8FFD\u8E64\u5BE9\u6838\u72C0\u614B\u8207\u6E9D\u901A\u6B77\u7A0B",
  icon: IconFileText,
  color: "teal",
  to: "/proposals"
}, {
  title: "\u59D4\u520A\u55AE\u7BA1\u7406",
  description: "\u7BA1\u7406\u57F7\u884C\u4E2D\u7684\u59D4\u520A\u55AE\u8207\u5408\u7D04\u7D30\u7BC0",
  icon: IconFileInvoice,
  color: "violet",
  to: "/insertion-orders"
}, {
  title: "\u6211\u7684\u6536\u85CF",
  description: "\u67E5\u770B\u5DF2\u52A0\u5165\u6536\u85CF\u7684 KOL \u65B9\u4FBF\u5FEB\u901F\u63D0\u6848",
  icon: IconStar,
  color: "yellow",
  to: "/favorites"
}, {
  title: "\u7D50\u6848\u5831\u544A\u7522\u751F",
  description: "\u532F\u5165\u6578\u64DA\u5FEB\u901F\u7522\u751F\u7CBE\u7F8E\u7684\u7D50\u6848\u5831\u544A",
  icon: IconReportAnalytics,
  color: "grape",
  to: "/reports/generate"
}];
function DashboardPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: "xs", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "Dashboard" }, void 0, false, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u9996\u9801 / \u7E3D\u89BD" }, void 0, false, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 2,
      sm: 4
    }, spacing: "md", mb: "xl", children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", tt: "uppercase", fw: 700, mb: 4, children: card.label }, void 0, false, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 80,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: card.value }, void 0, false, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 83,
        columnNumber: 13
      }, this)
    ] }, card.label, true, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 79,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "md", mt: "xl", children: "\u529F\u80FD\u6A21\u7D44" }, void 0, false, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 1,
      sm: 2,
      lg: 3
    }, spacing: "md", children: modules.map((mod) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, padding: "lg", radius: "md", component: "a", href: mod.to, style: {
      textDecoration: "none",
      transition: "transform 200ms ease, box-shadow 200ms ease",
      height: "100%",
      display: "block"
    }, onMouseEnter: (e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.05)";
    }, onMouseLeave: (e) => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "flex-start", wrap: "nowrap", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: 48, radius: "md", color: mod.color, variant: "light", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(mod.icon, { size: 26, stroke: 1.5 }, void 0, false, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 108,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 107,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "lg", mb: 4, c: "dark", children: mod.title }, void 0, false, {
          fileName: "app/routes/_app.dashboard.tsx",
          lineNumber: 111,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", style: {
          lineHeight: 1.4
        }, children: mod.description }, void 0, false, {
          fileName: "app/routes/_app.dashboard.tsx",
          lineNumber: 114,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 110,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 106,
      columnNumber: 13
    }, this) }, mod.title, false, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 94,
      columnNumber: 29
    }, this)) }, void 0, false, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 89,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.dashboard.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
_c = DashboardPage;
var _c;
$RefreshReg$(_c, "DashboardPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  DashboardPage as default
};
//# sourceMappingURL=/build/routes/_app.dashboard-OGO2VLBZ.js.map
