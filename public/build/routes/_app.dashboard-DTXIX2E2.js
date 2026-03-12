import {
  Card,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title
} from "/build/_shared/chunk-62B2IAZI.js";
import "/build/_shared/chunk-B43JI2TA.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-YEIDLYOX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
var import_react = __toESM(require_react(), 1);

// node_modules/@tabler/icons-react/dist/esm/defaultAttributes.mjs
var defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};

// node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
var createReactComponent = (type, iconName, iconNamePascal, iconNode) => {
  const Component = (0, import_react.forwardRef)(
    ({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }, ref) => (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes[type],
        width: size,
        height: size,
        className: [`tabler-icon`, `tabler-icon-${iconName}`, className].join(" "),
        ...type === "filled" ? {
          fill: color
        } : {
          strokeWidth: stroke,
          stroke: color
        },
        ...rest
      },
      [
        title && (0, import_react.createElement)("title", { key: "svg-title" }, title),
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  Component.displayName = `${iconNamePascal}`;
  return Component;
};

// node_modules/@tabler/icons-react/dist/esm/icons/IconFileInvoice.mjs
var __iconNode = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", "key": "svg-1" }], ["path", { "d": "M9 7l1 0", "key": "svg-2" }], ["path", { "d": "M9 13l6 0", "key": "svg-3" }], ["path", { "d": "M13 17l2 0", "key": "svg-4" }]];
var IconFileInvoice = createReactComponent("outline", "file-invoice", "FileInvoice", __iconNode);

// node_modules/@tabler/icons-react/dist/esm/icons/IconFileText.mjs
var __iconNode2 = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", "key": "svg-1" }], ["path", { "d": "M9 9l1 0", "key": "svg-2" }], ["path", { "d": "M9 13l6 0", "key": "svg-3" }], ["path", { "d": "M9 17l6 0", "key": "svg-4" }]];
var IconFileText = createReactComponent("outline", "file-text", "FileText", __iconNode2);

// node_modules/@tabler/icons-react/dist/esm/icons/IconReportAnalytics.mjs
var __iconNode3 = [["path", { "d": "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2", "key": "svg-0" }], ["path", { "d": "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2", "key": "svg-1" }], ["path", { "d": "M9 17v-5", "key": "svg-2" }], ["path", { "d": "M12 17v-1", "key": "svg-3" }], ["path", { "d": "M15 17v-3", "key": "svg-4" }]];
var IconReportAnalytics = createReactComponent("outline", "report-analytics", "ReportAnalytics", __iconNode3);

// node_modules/@tabler/icons-react/dist/esm/icons/IconStar.mjs
var __iconNode4 = [["path", { "d": "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245", "key": "svg-0" }]];
var IconStar = createReactComponent("outline", "star", "Star", __iconNode4);

// node_modules/@tabler/icons-react/dist/esm/icons/IconUsers.mjs
var __iconNode5 = [["path", { "d": "M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0", "key": "svg-0" }], ["path", { "d": "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2", "key": "svg-1" }], ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75", "key": "svg-2" }], ["path", { "d": "M21 21v-2a4 4 0 0 0 -3 -3.85", "key": "svg-3" }]];
var IconUsers = createReactComponent("outline", "users", "Users", __iconNode5);

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
  import.meta.hot.lastModified = "1773040040028.6624";
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
/*! Bundled license information:

@tabler/icons-react/dist/esm/defaultAttributes.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/createReactComponent.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconFileInvoice.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconFileText.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconReportAnalytics.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconStar.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/icons/IconUsers.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@tabler/icons-react/dist/esm/tabler-icons-react.mjs:
  (**
   * @license @tabler/icons-react v3.40.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=/build/routes/_app.dashboard-DTXIX2E2.js.map
