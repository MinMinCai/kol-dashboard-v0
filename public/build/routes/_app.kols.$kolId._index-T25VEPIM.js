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
  Grid,
  Group,
  Modal,
  Progress,
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

// app/routes/_app.kols.$kolId._index.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.kols.$kolId._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.kols.$kolId._index.tsx"
  );
  import.meta.hot.lastModified = "1773305089881.5005";
}
function formatNumber(value) {
  return (value ?? 0).toLocaleString("zh-TW");
}
function formatCurrency(value) {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}
function SparkLine({
  points
}) {
  _s();
  const width = 620;
  const height = 220;
  const pad = 24;
  const mapped = (0, import_react2.useMemo)(() => {
    if (points.length === 0)
      return [];
    const max = Math.max(...points.map((p) => p.price));
    const min = Math.min(...points.map((p) => p.price));
    const range = Math.max(1, max - min);
    return points.map((p, index) => {
      const x = pad + index * (width - pad * 2) / Math.max(1, points.length - 1);
      const y = height - pad - (p.price - min) / range * (height - pad * 2);
      return {
        ...p,
        x,
        y
      };
    });
  }, [points]);
  const path = mapped.map((p) => `${p.x},${p.y}`).join(" ");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { width: "100%", viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": "price trend", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: pad, y1: height - pad, x2: width - pad, y2: height - pad, stroke: "#cbd5e1" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: pad, y1: pad, x2: pad, y2: height - pad, stroke: "#cbd5e1" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polyline", { fill: "none", stroke: "#228be6", strokeWidth: "3", points: path }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      mapped.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: p.x, cy: p.y, r: "4", fill: "#228be6" }, p.date, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 62,
        columnNumber: 26
      }, this))
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: points.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: p.date }, p.date, false, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 65,
      columnNumber: 26
    }, this)) }, void 0, false, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.kols.$kolId._index.tsx",
    lineNumber: 57,
    columnNumber: 10
  }, this);
}
_s(SparkLine, "/blq8hXRXAq9Ah+ROrZ5KY7NV20=");
_c = SparkLine;
function KolDetailPage() {
  _s2();
  const {
    kol,
    tab,
    limit
  } = useLoaderData();
  const [contactOpened, setContactOpened] = (0, import_react2.useState)(false);
  const history = kol.collaborationHistory ?? [];
  const visibleHistory = history.slice(0, limit);
  const hasMore = limit < history.length;
  const avgPrice = kol.averagePrice ?? (history.length > 0 ? Math.round(history.reduce((sum, row) => sum + row.price, 0) / history.length) : 0);
  const avgRating = kol.rating ?? (history.length > 0 ? history.reduce((sum, row) => sum + row.rating, 0) / history.length : 0);
  const collabCount = kol.collaborations ?? history.length;
  const stats = kol.performanceStats ?? {};
  const platformPerf = stats.platformPerformance ?? {};
  const handleDownloadReport = () => {
    const report = {
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      kol: {
        id: kol.id,
        displayName: kol.displayName,
        instagramHandle: kol.instagramHandle ?? null,
        industry: kol.industry ?? null,
        followers: kol.social?.instagram ?? kol.followers ?? null,
        youtubeSubscribers: kol.social?.youtube ?? kol.youtubeSubscribers ?? null,
        tags: kol.tags ?? kol.categories ?? []
      },
      summary: {
        avgPrice,
        avgRating,
        collaborations: collabCount
      },
      recentCollaborations: visibleHistory,
      performanceStats: stats
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KOL-Report-${kol.displayName}-${kol.id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  const tabStyle = (value) => ({
    padding: "8px 16px",
    borderBottom: tab === value ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
    color: tab === value ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    textDecoration: "none",
    fontWeight: tab === value ? 600 : 400,
    fontSize: 14,
    display: "inline-block"
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 8, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: ">" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: kol.displayName }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 149,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
        base: 12,
        lg: 9
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-start", wrap: "nowrap", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "flex-start", wrap: "nowrap", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, size: 96, radius: 999 }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 161,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 6, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: kol.displayName }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 163,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
                  "Instagram: @",
                  kol.instagramHandle ?? "-",
                  " | ",
                  formatNumber(kol.social?.instagram ?? kol.followers),
                  " \u7C89\u7D72"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 164,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
                  "YouTube: ",
                  formatNumber(kol.social?.youtube ?? kol.youtubeSubscribers),
                  " \u8A02\u95B1"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 165,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 6, children: (kol.tags ?? kol.categories).map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "light", radius: "xl", children: tag }, tag, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 167,
                  columnNumber: 62
                }, this)) }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 166,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 162,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 160,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "flex-end", gap: 6, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
                "\u2B50 ",
                avgRating.toFixed(1),
                " (",
                collabCount,
                " \u6B21\u5408\u4F5C)"
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 172,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
                "\u5E73\u5747\u50F9\u683C: ",
                formatCurrency(avgPrice)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 173,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 6, children: (kol.industryDistribution ?? [kol.industry ?? "\u672A\u5206\u985E"]).map((industry) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "gray", variant: "light", children: industry }, industry, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 175,
                columnNumber: 90
              }, this)) }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 174,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 171,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: kol.isFavorite ? "/favorites" : `/kols/${kol.id}`, style: {
              padding: "6px 14px",
              borderRadius: 4,
              border: "1px solid var(--mantine-color-default-border)",
              textDecoration: "none",
              fontSize: 14
            }, children: kol.isFavorite ? "\u2764\uFE0F \u5DF2\u6536\u85CF" : "\u{1F497} \u52A0\u5165\u6536\u85CF" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 180,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", size: "xs", onClick: () => setContactOpened(true), children: "\u{1F4DE} \u67E5\u770B\u806F\u7D61\u65B9\u5F0F" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 189,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", size: "xs", onClick: handleDownloadReport, children: "\u{1F4CA} \u4E0B\u8F09 KOL \u5831\u544A" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 192,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 179,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { id: "kol-contact-modal", opened: contactOpened, onClose: () => setContactOpened(false), title: "\u806F\u7D61\u65B9\u5F0F", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { span: true, fw: 600, children: "\u96FB\u8A71\uFF1A" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 201,
              columnNumber: 17
            }, this),
            " ",
            kol.contact?.phone || "\u5C1A\u672A\u63D0\u4F9B"
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 200,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { span: true, fw: 600, children: "Email\uFF1A" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 207,
              columnNumber: 17
            }, this),
            " ",
            kol.contact?.email || "\u5C1A\u672A\u63D0\u4F9B"
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 206,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "light", onClick: () => setContactOpened(false), children: "\u95DC\u9589" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 212,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 199,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 198,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, mt: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            borderBottom: "1px solid var(--mantine-color-default-border)",
            marginBottom: 16
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}?tab=projects&limit=${limit}`, style: tabStyle("projects"), children: "\u5408\u4F5C\u6848\u4EF6" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 224,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}?tab=price&limit=${limit}`, style: tabStyle("price"), children: "\u50F9\u683C\u8DA8\u52E2" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 225,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}?tab=performance&limit=${limit}`, style: tabStyle("performance"), children: "\u6210\u6548\u7D71\u8A08" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 226,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 220,
            columnNumber: 13
          }, this),
          tab === "projects" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
            visibleHistory.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
              display: "flex",
              gap: 12,
              alignItems: "flex-start"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "var(--mantine-color-blue-filled)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 600,
                  flexShrink: 0
                }, children: idx + 1 }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 242,
                  columnNumber: 23
                }, this),
                idx < visibleHistory.length - 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
                  width: 2,
                  flex: 1,
                  minHeight: 16,
                  background: "var(--mantine-color-default-border)",
                  marginTop: 4
                } }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 257,
                  columnNumber: 59
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 236,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, style: {
                flex: 1,
                marginBottom: 8
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 8, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-start", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 2, children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: [
                      "\u{1F4CB} ",
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: item.orderId ? `/insertion-orders/${item.orderId}` : "#", children: item.projectTitle }, void 0, false, {
                        fileName: "app/routes/_app.kols.$kolId._index.tsx",
                        lineNumber: 273,
                        columnNumber: 34
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 272,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: [
                      item.clientName,
                      " | \u7522\u696D: ",
                      item.industry
                    ] }, void 0, true, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 275,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 271,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "flex-end", gap: 2, children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: formatCurrency(item.price) }, void 0, false, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 278,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
                      "\u2B50 ",
                      item.rating.toFixed(1)
                    ] }, void 0, true, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 279,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 277,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 270,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
                  "\u670D\u52D9\u9805\u76EE: ",
                  item.services
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 282,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "lg", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
                    "IG \u8CBC\u6587: \u{1F441}\uFE0F ",
                    formatNumber(item.metrics?.postViews),
                    " | \u{1F497} ",
                    formatNumber(item.metrics?.postLikes),
                    " | \u{1F4AC} ",
                    formatNumber(item.metrics?.postComments)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 284,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
                    "IG \u9650\u52D5: \u{1F441}\uFE0F ",
                    formatNumber(item.metrics?.storyViews),
                    " | \u{1F497} ",
                    formatNumber(item.metrics?.storyLikes)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 285,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 283,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: item.orderId ? `/insertion-orders/${item.orderId}` : "#", children: "\u67E5\u770B\u8A73\u7D30\u6210\u6548 \u2192" }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 288,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 287,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 269,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 265,
                columnNumber: 21
              }, this)
            ] }, item.id, true, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 231,
              columnNumber: 52
            }, this)),
            hasMore && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "center", mt: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}?tab=projects&limit=${limit + 3}`, style: {
              padding: "8px 20px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              textDecoration: "none",
              fontSize: 14,
              color: "var(--mantine-color-text)"
            }, children: "\u8F09\u5165\u66F4\u591A" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 295,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 294,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 230,
            columnNumber: 36
          }, this),
          tab === "price" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: "X \u8EF8: \u65E5\u671F / Y \u8EF8: \u50F9\u683C (NT$)" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 310,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SparkLine, { points: kol.priceTrend ?? [] }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 312,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 311,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 309,
            columnNumber: 33
          }, this),
          tab === "performance" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
                base: 12,
                md: 6
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u89F8\u53CA" }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 322,
                  columnNumber: 35
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: formatNumber(stats.averageReach) }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 322,
                  columnNumber: 73
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 322,
                columnNumber: 18
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 319,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
                base: 12,
                md: 6
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u4E92\u52D5\u7387" }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 326,
                  columnNumber: 35
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: [
                  (stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1),
                  "%"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 326,
                  columnNumber: 74
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 326,
                columnNumber: 18
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 323,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
                base: 12,
                md: 6
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u89C0\u770B" }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 330,
                  columnNumber: 35
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: formatNumber(stats.averageViews) }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 330,
                  columnNumber: 73
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 330,
                columnNumber: 18
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 327,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
                base: 12,
                md: 6
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u8F49\u63DB\u7387" }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 334,
                  columnNumber: 35
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: [
                  (stats.conversionRate ?? 0).toFixed(1),
                  "%"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 334,
                  columnNumber: 72
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 334,
                columnNumber: 18
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 331,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 318,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, mt: "md", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, mb: "sm", children: "\u5E73\u53F0\u6210\u6548\u6BD4\u8F03" }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 338,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: "Instagram" }, void 0, false, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 341,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: formatNumber(platformPerf.instagram) }, void 0, false, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 341,
                      columnNumber: 86
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 341,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { value: Math.min(100, (platformPerf.instagram ?? 0) / 1200) }, void 0, false, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 342,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 340,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: "YouTube" }, void 0, false, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 345,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: formatNumber(platformPerf.youtube) }, void 0, false, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 345,
                      columnNumber: 84
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 345,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { value: Math.min(100, (platformPerf.youtube ?? 0) / 1200), color: "orange" }, void 0, false, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 346,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 344,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: "TikTok" }, void 0, false, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 349,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: formatNumber(platformPerf.tiktok) }, void 0, false, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 349,
                      columnNumber: 83
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 349,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { value: Math.min(100, (platformPerf.tiktok ?? 0) / 1200), color: "grape" }, void 0, false, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 350,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 348,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 339,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 337,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 317,
            columnNumber: 39
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 219,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
        base: 12,
        lg: 3
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, mb: "sm", children: "\u5FEB\u901F\u7D71\u8A08" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 363,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 8, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
            "\u{1F4CA} \u5408\u4F5C\u6B21\u6578: ",
            collabCount,
            " \u6B21"
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 365,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
            "\u{1F4B0} \u5E73\u5747\u50F9\u683C: ",
            formatCurrency(avgPrice)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 366,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
            "\u{1F3E2} \u5408\u4F5C\u7522\u696D: ",
            (kol.industryDistribution ?? []).join(" ") || (kol.industry ?? "-")
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 367,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
            "\u{1F441}\uFE0F \u5E73\u5747\u89F8\u53CA: ",
            formatNumber(stats.averageReach)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 368,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
            "\u{1F497} \u5E73\u5747\u4E92\u52D5\u7387: ",
            (stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1),
            "%"
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 369,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 364,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 362,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 358,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.kols.$kolId._index.tsx",
    lineNumber: 145,
    columnNumber: 10
  }, this);
}
_s2(KolDetailPage, "dY4UVmqcarHF0YltJ6YqACzOX7s=", false, function() {
  return [useLoaderData];
});
_c2 = KolDetailPage;
var _c;
var _c2;
$RefreshReg$(_c, "SparkLine");
$RefreshReg$(_c2, "KolDetailPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  KolDetailPage as default
};
//# sourceMappingURL=/build/routes/_app.kols.$kolId._index-T25VEPIM.js.map
