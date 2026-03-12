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

// app/routes/login.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\login.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\login.tsx"
  );
  import.meta.hot.lastModified = "1773045589164.473";
}
function LoginPage() {
  _s();
  const [dark, setDark] = (0, import_react.useState)(false);
  const bg = dark ? "#0f172a" : "#ffffff";
  const fg = dark ? "#f8fafc" : "#0f172a";
  const subtle = dark ? "#94a3b8" : "#64748b";
  const border = dark ? "#1e293b" : "#e2e8f0";
  const googleBg = dark ? "#1e293b" : "#f8fafc";
  const googleBorder = dark ? "#334155" : "#cbd5e1";
  const googleHoverBg = dark ? "#273549" : "#f1f5f9";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      flex: "0 0 50%",
      position: "relative",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f3460 65%, #1a1a2e 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "48px",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.15
      }, viewBox: "0 0 600 800", preserveAspectRatio: "xMidYMid slice", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "500", cy: "80", r: "280", fill: "#3b82f6" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 59,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "50", cy: "700", r: "200", fill: "#6366f1" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "380", cy: "480", r: "150", fill: "#0ea5e9", opacity: "0.5" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ellipse", { cx: "200", cy: "300", rx: "180", ry: "80", fill: "#7c3aed", opacity: "0.4", transform: "rotate(-30 200 300)" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { style: {
        position: "absolute",
        right: 0,
        bottom: "20%",
        opacity: 0.1
      }, width: "360", height: "360", viewBox: "0 0 360 360", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "180", cy: "180", r: "32", fill: "none", stroke: "#60a5fa", strokeWidth: "2" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "80", cy: "100", r: "20", fill: "none", stroke: "#818cf8", strokeWidth: "2" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "290", cy: "90", r: "24", fill: "none", stroke: "#34d399", strokeWidth: "2" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 75,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "60", cy: "270", r: "18", fill: "none", stroke: "#f472b6", strokeWidth: "2" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "300", cy: "270", r: "22", fill: "none", stroke: "#fb923c", strokeWidth: "2" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "180", y1: "180", x2: "80", y2: "100", stroke: "#60a5fa", strokeWidth: "1.5", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "180", y1: "180", x2: "290", y2: "90", stroke: "#818cf8", strokeWidth: "1.5", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "180", y1: "180", x2: "60", y2: "270", stroke: "#f472b6", strokeWidth: "1.5", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "180", y1: "180", x2: "300", y2: "270", stroke: "#fb923c", strokeWidth: "1.5", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "80", y1: "100", x2: "290", y2: "90", stroke: "#94a3b8", strokeWidth: "1", opacity: "0.4" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 83,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "60", y1: "270", x2: "300", y2: "270", stroke: "#94a3b8", strokeWidth: "1", opacity: "0.4" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "180", cy: "180", r: "24", fill: "#1e40af" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "80", cy: "100", r: "14", fill: "#4c1d95" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 87,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "290", cy: "90", r: "16", fill: "#065f46" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 88,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "60", cy: "270", r: "12", fill: "#831843" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 89,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "300", cy: "270", r: "15", fill: "#7c2d12" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 90,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { x: "166", y: "185", fill: "white", fontSize: "14", fontFamily: "sans-serif", children: "KOL" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 92,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        position: "relative",
        zIndex: 1
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 8
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 116,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 115,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
          color: "white",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.3px"
        }, children: "KOL DB" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 119,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 100,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 96,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        position: "relative",
        zIndex: 1
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: 24
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            display: "inline-block",
            padding: "4px 12px",
            background: "rgba(59,130,246,0.25)",
            border: "1px solid rgba(59,130,246,0.4)",
            borderRadius: 20,
            color: "#93c5fd",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 16
          }, children: "Influencer Management Platform" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
            color: "#ffffff",
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-1px",
            margin: 0
          }, children: [
            "\u7D71\u4E00\u7BA1\u7406",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 159,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
              background: "linear-gradient(90deg, #60a5fa, #818cf8, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }, children: "KOL \u5408\u4F5C\u5168\u9031\u671F" }, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 160,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/login.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            color: "#94a3b8",
            fontSize: 15,
            lineHeight: 1.6,
            marginTop: 16,
            maxWidth: 340
          }, children: "\u5F9E\u63D0\u6848\u5230\u59D4\u520A\u55AE\uFF0C\u5F9E KOL \u641C\u5C0B\u5230\u7D50\u6848\u5831\u544A\uFF0C\u4E00\u500B\u5E73\u53F0\u638C\u63E1\u6240\u6709\u884C\u92B7\u5408\u4F5C\u6D41\u7A0B\u3002" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 168,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }, children: [{
          icon: "\u{1F465}",
          text: "KOL \u8CC7\u6599\u5EAB\u8207\u7BA1\u7406"
        }, {
          icon: "\u{1F4CB}",
          text: "\u63D0\u6848\u8207\u59D4\u520A\u55AE\u6D41\u7A0B"
        }, {
          icon: "\u{1F4CA}",
          text: "\u7D50\u6848\u5831\u544A\u81EA\u52D5\u751F\u6210"
        }].map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          padding: "10px 14px",
          backdropFilter: "blur(4px)"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            fontSize: 18
          }, children: f.icon }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 204,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            color: "#e2e8f0",
            fontSize: 14,
            fontWeight: 500
          }, children: f.text }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 207,
            columnNumber: 17
          }, this)
        ] }, f.text, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 194,
          columnNumber: 23
        }, this)) }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 180,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 129,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      flex: "0 0 50%",
      background: bg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "48px",
      position: "relative",
      transition: "background 300ms"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setDark((d) => !d), style: {
        position: "absolute",
        top: 24,
        right: 24,
        background: "none",
        border: `1px solid ${border}`,
        borderRadius: 8,
        padding: "6px 12px",
        cursor: "pointer",
        color: subtle,
        fontSize: 13,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "all 200ms"
      }, children: [
        dark ? "\u2600\uFE0F" : "\u{1F319}",
        " ",
        dark ? "Light" : "Dark"
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 230,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        width: "100%",
        maxWidth: 360
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: 40
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
            color: fg,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            margin: 0,
            marginBottom: 8
          }, children: "\u6B61\u8FCE\u56DE\u4F86 \u{1F44B}" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 258,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            color: subtle,
            fontSize: 15,
            margin: 0,
            lineHeight: 1.6
          }, children: "\u4F7F\u7528 Google \u5E33\u865F\u767B\u5165\u4EE5\u7E7C\u7E8C\u4F7F\u7528 KOL DB" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 268,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 255,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/dashboard", style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          width: "100%",
          padding: "13px 20px",
          background: googleBg,
          border: `1.5px solid ${googleBorder}`,
          borderRadius: 12,
          cursor: "pointer",
          textDecoration: "none",
          color: fg,
          fontSize: 15,
          fontWeight: 600,
          transition: "background 150ms, box-shadow 150ms",
          boxSizing: "border-box",
          marginBottom: 24
        }, onMouseEnter: (e) => {
          e.currentTarget.style.background = googleHoverBg;
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
        }, onMouseLeave: (e) => {
          e.currentTarget.style.background = googleBg;
          e.currentTarget.style.boxShadow = "none";
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 305,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 306,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 307,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 308,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/login.tsx",
            lineNumber: 304,
            columnNumber: 13
          }, this),
          "\u4F7F\u7528 Google \u5E33\u865F\u767B\u5165"
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 279,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            flex: 1,
            height: 1,
            background: border
          } }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 320,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            color: subtle,
            fontSize: 12,
            whiteSpace: "nowrap"
          }, children: "\u76EE\u524D\u50C5\u652F\u63F4 Google \u767B\u5165" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 325,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            flex: 1,
            height: 1,
            background: border
          } }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 330,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 314,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          background: dark ? "#1e293b" : "#f8fafc",
          border: `1px solid ${border}`,
          borderRadius: 12,
          padding: "16px 18px",
          marginBottom: 32
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "flex",
          gap: 10,
          alignItems: "flex-start"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            fontSize: 16,
            marginTop: 1
          }, children: "\u{1F512}" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 350,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
              color: fg,
              fontSize: 13,
              fontWeight: 600,
              margin: 0,
              marginBottom: 4
            }, children: "\u5B89\u5168\u767B\u5165" }, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 355,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
              color: subtle,
              fontSize: 12,
              margin: 0,
              lineHeight: 1.5
            }, children: "\u900F\u904E BetterAuth + Google OAuth 2.0 \u9032\u884C\u8EAB\u5206\u9A57\u8B49\uFF0C\u6211\u5011\u4E0D\u5132\u5B58\u60A8\u7684\u5BC6\u78BC\u3002" }, void 0, false, {
              fileName: "app/routes/login.tsx",
              lineNumber: 364,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/login.tsx",
            lineNumber: 354,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 345,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 338,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          color: subtle,
          fontSize: 12,
          textAlign: "center",
          lineHeight: 1.6
        }, children: [
          "\u767B\u5165\u5373\u4EE3\u8868\u60A8\u540C\u610F\u6211\u5011\u7684",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "#", style: {
            color: "#3b82f6",
            textDecoration: "none"
          }, children: "\u670D\u52D9\u689D\u6B3E" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 385,
            columnNumber: 13
          }, this),
          " ",
          "\u53CA",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "#", style: {
            color: "#3b82f6",
            textDecoration: "none"
          }, children: "\u96B1\u79C1\u653F\u7B56" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 390,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 377,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 218,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
_s(LoginPage, "SvVe3Z4Nr7rux/2pmm0cFI6QU44=");
_c = LoginPage;
var _c;
$RefreshReg$(_c, "LoginPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LoginPage as default
};
//# sourceMappingURL=/build/routes/login-2TDIHLPT.js.map
