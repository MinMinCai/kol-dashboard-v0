import {
  AppShell,
  Group,
  Stack,
  Text,
  Title
} from "/build/_shared/chunk-62B2IAZI.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Outlet,
  useLocation
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

// app/routes/_app.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.tsx"
  );
  import.meta.hot.lastModified = "1773309383198.5757";
}
var navItems = [{
  to: "/dashboard",
  label: "Dashboard",
  icon: "\u{1F4CA}"
}, {
  to: "/proposals",
  label: "\u63D0\u6848\u7BA1\u7406",
  icon: "\u{1F4CB}"
}, {
  to: "/kols",
  label: "KOL \u7BA1\u7406",
  icon: "\u{1F465}"
}, {
  to: "/insertion-orders",
  label: "\u59D4\u520A\u55AE\u7BA1\u7406",
  icon: "\u{1F4DD}"
}, {
  to: "/favorites",
  label: "\u6211\u7684\u6536\u85CF",
  icon: "\u2B50"
}, {
  to: "/reports/generate",
  label: "\u7D50\u6848\u5831\u544A\u7522\u751F",
  icon: "\u{1F4C8}"
}];
function navLinkStyle(active) {
  return {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "9px 12px",
    borderRadius: 10,
    background: "transparent",
    color: active ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    fontWeight: active ? 600 : 500,
    border: "1px solid transparent",
    textDecoration: "none",
    boxSizing: "border-box",
    fontSize: 14,
    transition: "color 150ms"
  };
}
function AppLayoutRoute() {
  _s();
  const location = useLocation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { header: {
    height: 64
  }, navbar: {
    width: 260,
    breakpoint: "sm"
  }, padding: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell.Header, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { dangerouslySetInnerHTML: {
        __html: `
          body.sidebar-collapsed {
            --app-shell-navbar-offset: 0px !important;
            --app-shell-navbar-width: 0px !important;
          }
          /* Mantine AppShell attribute/class names can vary by version/build.
             Target the common ones to ensure true collapse (no overlay text/icons). */
          body.sidebar-collapsed [data-app-shell-navbar],
          body.sidebar-collapsed [data-mantine-appshell-navbar],
          body.sidebar-collapsed .mantine-AppShell-navbar {
            display: none !important;
          }
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar {
            white-space: nowrap;
            overflow: hidden;
          }
          body.sidebar-collapsed [data-app-shell-main],
          body.sidebar-collapsed [data-mantine-appshell-main],
          body.sidebar-collapsed .mantine-AppShell-main {
            margin-left: 0 !important;
          }
          body.sidebar-collapsed [data-app-shell-main] *,
          body.sidebar-collapsed [data-mantine-appshell-main] *,
          body.sidebar-collapsed .mantine-AppShell-main * {
            pointer-events: auto;
          }
          /* Ensure smooth transition */
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar,
          [data-app-shell-main],
          [data-mantine-appshell-main],
          .mantine-AppShell-main {
            transition: transform 200ms ease, padding 200ms ease, margin 200ms ease, width 200ms ease, opacity 200ms ease !important;
          }
          body.sidebar-collapsed .nav-label {
            display: none !important;
          }
        `
      } }, void 0, false, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", h: "100%", px: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "kol-sidebar-toggle-btn", type: "button", style: {
            background: "transparent",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 6,
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--mantine-color-text)"
          }, children: "\u2630" }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 121,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 0, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: "KOL DB" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u7D71\u4E00\u7BA1\u7406 KOL / \u63D0\u6848 / \u59D4\u520A\u55AE" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 137,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 135,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 120,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "kol-theme-toggle-btn", type: "button", suppressHydrationWarning: true, style: {
          background: "transparent",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          color: "var(--mantine-color-dimmed)",
          fontSize: 13,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 6,
          lineHeight: 1
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { id: "kol-theme-icon", children: "\u{1F319}" }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 161,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { id: "kol-theme-label", children: "Dark" }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 162,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { suppressHydrationWarning: true, dangerouslySetInnerHTML: {
          __html: `
(function() {
  var STORAGE_KEY = 'mantine-color-scheme-value';
  var btn = document.getElementById('kol-theme-toggle-btn');
  var icon = document.getElementById('kol-theme-icon');
  var label = document.getElementById('kol-theme-label');

  function getTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-mantine-color-scheme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
    if (icon) icon.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  // Apply saved theme on load
  applyTheme(getTheme());

  if (btn) {
    btn.addEventListener('click', function() {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // Sidebar toggle
  var sidebarBtn = document.getElementById('kol-sidebar-toggle-btn');
  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', function() {
      document.body.classList.toggle('sidebar-collapsed');
    });
  }
})();
              `
        } }, void 0, false, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 167,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 119,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell.Navbar, { p: "sm", style: {
      zIndex: 90,
      pointerEvents: "auto"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", style: {
        flex: 1
      }, children: navItems.map((item) => {
        const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: item.to, style: navLinkStyle(active), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "nav-icon", style: {
            marginRight: 8
          }, children: item.icon }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 219,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "nav-label", children: item.label }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 222,
            columnNumber: 17
          }, this)
        ] }, item.to, true, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 218,
          columnNumber: 18
        }, this);
      }) }, void 0, false, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginTop: "auto",
        paddingTop: 12
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/settings", style: {
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "9px 12px",
          borderRadius: 10,
          color: "var(--mantine-color-text)",
          textDecoration: "none",
          boxSizing: "border-box",
          fontSize: 14,
          border: "1px solid transparent",
          marginBottom: 4
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "nav-icon", style: {
            marginRight: 8
          }, children: "\u2699\uFE0F" }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 244,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "nav-label", children: "\u7CFB\u7D71\u8A2D\u5B9A" }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 247,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 231,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/login", style: {
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "9px 12px",
          borderRadius: 10,
          color: "var(--mantine-color-dimmed)",
          textDecoration: "none",
          boxSizing: "border-box",
          fontSize: 14,
          border: "1px solid transparent"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "nav-icon", style: {
            marginRight: 8
          }, children: "\u{1F6AA}" }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 261,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "nav-label", children: "\u767B\u51FA\uFF08\u56DE\u767B\u5165\u9801\uFF09" }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 264,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 249,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 227,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 209,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell.Main, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 270,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 269,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.tsx",
    lineNumber: 69,
    columnNumber: 10
  }, this);
}
_s(AppLayoutRoute, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function() {
  return [useLocation];
});
_c = AppLayoutRoute;
var _c;
$RefreshReg$(_c, "AppLayoutRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AppLayoutRoute as default
};
//# sourceMappingURL=/build/routes/_app-6VD5PVTB.js.map
