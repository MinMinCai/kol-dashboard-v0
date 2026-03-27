import {
  Button,
  Center,
  ColorSchemeScript,
  MantineProvider,
  Stack,
  Text,
  Title
} from "/build/_shared/chunk-DPI5I7LX.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
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

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = void 0;

// app/root.tsx
var import_react2 = __toESM(require_react(), 1);

// node_modules/@mantine/core/styles.css
var styles_default = "/build/_assets/styles-HWPAIADB.css";

// node_modules/@mantine/charts/styles.css
var styles_default2 = "/build/_assets/styles-ZP3ZNYUK.css";

// app/styles.css
var styles_default3 = "/build/_assets/styles-XANZFPT5.css";

// app/root.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.tsx"
  );
}
var links = () => [...cssBundleHref ? [{
  rel: "stylesheet",
  href: cssBundleHref
}] : [], {
  rel: "stylesheet",
  href: styles_default
}, {
  rel: "stylesheet",
  href: styles_default2
}, {
  rel: "stylesheet",
  href: styles_default3
}];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "zh-Hant", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.process = window.process || { env: { NODE_ENV: ${JSON.stringify("development")} } };`
          }
        },
        void 0,
        false,
        {
          fileName: "app/root.tsx",
          lineNumber: 46,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ColorSchemeScript, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MantineProvider, { defaultColorScheme: "auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 63,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 42,
    columnNumber: 10
  }, this);
}
_c = App;
function ErrorBoundary() {
  _s();
  const error = useRouteError();
  let status = 500;
  let title = "\u7CFB\u7D71\u767C\u751F\u932F\u8AA4";
  let message = "\u62B1\u6B49\uFF0C\u7CFB\u7D71\u9047\u5230\u4E86\u4E00\u4E9B\u554F\u984C\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002";
  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (status === 404) {
      title = "\u627E\u4E0D\u5230\u9801\u9762";
      message = "\u60A8\u6B63\u5728\u5C0B\u627E\u7684\u9801\u9762\u4E0D\u5B58\u5728\u3002\u5B83\u53EF\u80FD\u5DF2\u88AB\u79FB\u9664\u3001\u91CD\u65B0\u547D\u540D\u6216\u66AB\u6642\u7121\u6CD5\u4F7F\u7528\u3002";
    }
  }
  (0, import_react2.useEffect)(() => {
    const timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "zh-Hant", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("title", { children: `${status} ${title}` }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ColorSchemeScript, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MantineProvider, { defaultColorScheme: "auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Center, { h: "100vh", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { style: {
          fontSize: 120,
          lineHeight: 1,
          color: "var(--mantine-color-blue-filled)"
        }, children: status }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 98,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: title }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 103,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "lg", ta: "center", maw: 500, children: message }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 104,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "blue", size: "sm", ta: "center", mt: "xs", children: "\u7CFB\u7D71\u5C07\u65BC 3 \u79D2\u5F8C\u81EA\u52D5\u70BA\u60A8\u5C0E\u5411\u81F3\u9996\u9801..." }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: "a", href: "/dashboard", mt: "xl", size: "lg", variant: "light", children: "\u7ACB\u5373\u8FD4\u56DE\u9996\u9801" }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 110,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 96,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 94,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 87,
    columnNumber: 10
  }, this);
}
_s(ErrorBoundary, "udw+RIxoU7ZF+z45E4mgOd2ebd4=", false, function() {
  return [useRouteError];
});
_c2 = ErrorBoundary;
var _c;
var _c2;
$RefreshReg$(_c, "App");
$RefreshReg$(_c2, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  App as default,
  links
};
//# sourceMappingURL=/build/root-JMNJOZTK.js.map
