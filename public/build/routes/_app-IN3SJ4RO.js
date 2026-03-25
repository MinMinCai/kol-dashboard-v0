import {
  useNotificationStore
} from "/build/_shared/chunk-J2J7XYF7.js";
import {
  IconCheck,
  IconX
} from "/build/_shared/chunk-TN5JOK4I.js";
import {
  ActionIcon,
  Affix,
  AppShell,
  Box,
  Button,
  Card,
  Group,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Transition
} from "/build/_shared/chunk-LYH654VY.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Outlet,
  useLocation,
  useNavigate
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

// app/components/GlobalNotification.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\GlobalNotification.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\GlobalNotification.tsx"
  );
  import.meta.hot.lastModified = "1774256592328.1208";
}
function GlobalNotification() {
  _s();
  const {
    toast,
    hideToast,
    banner,
    hideBanner
  } = useNotificationStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = (0, import_react.useState)(100);
  (0, import_react.useEffect)(() => {
    if (toast?.isOpen) {
      setProgress(100);
      const startTime = Date.now();
      const duration = 1e4;
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - elapsed / duration * 100);
        setProgress(remaining);
        if (remaining === 0) {
          hideToast();
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [toast?.isOpen, hideToast]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    banner?.isOpen && location.pathname !== "/reports/generate" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { bg: "green.6", c: "white", p: "sm", style: {
      position: "sticky",
      top: 0,
      zIndex: 1e3,
      width: "100%"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "center", align: "center", style: {
      position: "relative"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "white", variant: "transparent", size: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 18 }, void 0, false, {
          fileName: "app/components/GlobalNotification.tsx",
          lineNumber: 71,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/components/GlobalNotification.tsx",
          lineNumber: 70,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "sm", children: banner.message }, void 0, false, {
          fileName: "app/components/GlobalNotification.tsx",
          lineNumber: 73,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: "a", href: banner.actionLink || "/reports/generate", variant: "transparent", color: "white", size: "sm", pl: "xs", style: {
        textDecoration: "underline"
      }, children: "\u67E5\u770B\u4E26\u4E0B\u8F09 \u2192" }, void 0, false, {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 76,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { onClick: hideBanner, variant: "transparent", color: "white", style: {
        position: "absolute",
        right: 16
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconX, { size: 16 }, void 0, false, {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 86,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 82,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/GlobalNotification.tsx",
      lineNumber: 66,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/GlobalNotification.tsx",
      lineNumber: 60,
      columnNumber: 71
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Affix, { position: {
      top: 20,
      right: 20
    }, zIndex: 2e3, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Transition, { transition: "slide-left", duration: 300, mounted: !!toast?.isOpen, children: (transitionStyles) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, shadow: "xl", radius: "md", p: 0, style: {
      ...transitionStyles,
      width: 400,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { p: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", align: "flex-start", justify: "space-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", align: "flex-start", gap: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
            fontSize: 32,
            lineHeight: 1
          }, children: "\u{1F389}" }, void 0, false, {
            fileName: "app/components/GlobalNotification.tsx",
            lineNumber: 105,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 5, mb: 4, children: toast?.title }, void 0, false, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 110,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mb: 2, children: [
              "\u6848\u4EF6: ",
              toast?.message.split("|")[0]
            ] }, void 0, true, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 111,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: [
              "\u6A94\u6848: ",
              toast?.message.split("|")[1] || "\u7D50\u6848\u5831\u544A_v1.pptx"
            ] }, void 0, true, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 112,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", gap: "sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { size: "xs", color: "blue", onClick: () => {
                alert("\u5831\u544A\u4E0B\u8F09\u4E2D...");
                hideToast();
              }, children: "\u7ACB\u5373\u4E0B\u8F09" }, void 0, false, {
                fileName: "app/components/GlobalNotification.tsx",
                lineNumber: 115,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { size: "xs", variant: "light", color: "gray", onClick: () => {
                if (toast?.actionLink)
                  navigate(toast.actionLink);
                hideToast();
              }, children: "\u7A0D\u5F8C\u67E5\u770B" }, void 0, false, {
                fileName: "app/components/GlobalNotification.tsx",
                lineNumber: 121,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 114,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/GlobalNotification.tsx",
            lineNumber: 109,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/GlobalNotification.tsx",
          lineNumber: 104,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "subtle", color: "gray", onClick: hideToast, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconX, { size: 16 }, void 0, false, {
          fileName: "app/components/GlobalNotification.tsx",
          lineNumber: 131,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/components/GlobalNotification.tsx",
          lineNumber: 130,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 103,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 102,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { value: progress, size: "xs", color: "blue", radius: 0 }, void 0, false, {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 135,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/GlobalNotification.tsx",
      lineNumber: 97,
      columnNumber: 32
    }, this) }, void 0, false, {
      fileName: "app/components/GlobalNotification.tsx",
      lineNumber: 96,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/GlobalNotification.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/GlobalNotification.tsx",
    lineNumber: 58,
    columnNumber: 10
  }, this);
}
_s(GlobalNotification, "XmLm09gxqBB+f7SV6y2Qz6Ib75k=", false, function() {
  return [useNotificationStore, useNavigate, useLocation];
});
_c = GlobalNotification;
var _c;
$RefreshReg$(_c, "GlobalNotification");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_app.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
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
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.tsx"
  );
  import.meta.hot.lastModified = "1774256624314.1282";
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
  _s2();
  const location = useLocation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(GlobalNotification, {}, void 0, false, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AppShell, { header: {
      height: 64
    }, navbar: {
      width: 260,
      breakpoint: "sm"
    }, padding: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AppShell.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("style", { dangerouslySetInnerHTML: {
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
          lineNumber: 79,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Group, { justify: "space-between", align: "center", h: "100%", px: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Group, { gap: "sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { id: "kol-sidebar-toggle-btn", type: "button", onClick: () => document.body.classList.toggle("sidebar-collapsed"), style: {
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
              lineNumber: 124,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Stack, { gap: 0, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Title, { order: 4, children: "KOL DB" }, void 0, false, {
                fileName: "app/routes/_app.tsx",
                lineNumber: 139,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u7D71\u4E00\u7BA1\u7406 KOL / \u63D0\u6848 / \u59D4\u520A\u55AE" }, void 0, false, {
                fileName: "app/routes/_app.tsx",
                lineNumber: 140,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 138,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 123,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { id: "kol-theme-toggle-btn", type: "button", suppressHydrationWarning: true, onClick: () => {
            const STORAGE_KEY = "mantine-color-scheme-value";
            const getTheme = () => {
              try {
                return localStorage.getItem(STORAGE_KEY) || "light";
              } catch (e) {
                return "light";
              }
            };
            const theme = getTheme() === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-mantine-color-scheme", theme);
            try {
              localStorage.setItem(STORAGE_KEY, theme);
            } catch (e) {
            }
            const icon = document.getElementById("kol-theme-icon");
            const label = document.getElementById("kol-theme-label");
            if (icon)
              icon.textContent = theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}";
            if (label)
              label.textContent = theme === "dark" ? "Light" : "Dark";
          }, style: {
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
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { id: "kol-theme-icon", children: "\u{1F319}" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 182,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { id: "kol-theme-label", children: "Dark" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 183,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 150,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("script", { suppressHydrationWarning: true, dangerouslySetInnerHTML: {
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
})();
              `
          } }, void 0, false, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 188,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 122,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 78,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AppShell.Navbar, { p: "sm", style: {
        zIndex: 90,
        pointerEvents: "auto"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Stack, { gap: "xs", style: {
          flex: 1
        }, children: navItems.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
          return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { href: item.to, style: navLinkStyle(active), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "nav-icon", style: {
              marginRight: 8
            }, children: item.icon }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 225,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "nav-label", children: item.label }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 228,
              columnNumber: 17
            }, this)
          ] }, item.to, true, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 224,
            columnNumber: 20
          }, this);
        }) }, void 0, false, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 219,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          marginTop: "auto",
          paddingTop: 12
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { href: "/settings", style: {
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
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "nav-icon", style: {
              marginRight: 8
            }, children: "\u2699\uFE0F" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 250,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "nav-label", children: "\u7CFB\u7D71\u8A2D\u5B9A" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 253,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 237,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { href: "/login", style: {
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
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "nav-icon", style: {
              marginRight: 8
            }, children: "\u{1F6AA}" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 267,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "nav-label", children: "\u767B\u51FA\uFF08\u56DE\u767B\u5165\u9801\uFF09" }, void 0, false, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 270,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 255,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 233,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 215,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AppShell.Main, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 276,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.tsx",
        lineNumber: 275,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.tsx",
    lineNumber: 70,
    columnNumber: 10
  }, this);
}
_s2(AppLayoutRoute, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function() {
  return [useLocation];
});
_c2 = AppLayoutRoute;
var _c2;
$RefreshReg$(_c2, "AppLayoutRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AppLayoutRoute as default
};
//# sourceMappingURL=/build/routes/_app-IN3SJ4RO.js.map
