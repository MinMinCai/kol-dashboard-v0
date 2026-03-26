import {
  useNotificationStore
} from "/build/_shared/chunk-J2J7XYF7.js";
import {
  IconBulb,
  IconCheck,
  IconClockHour4,
  IconCloudUpload,
  IconDownload,
  IconFile,
  IconFileDescription,
  IconFileTypePpt,
  IconPencil,
  IconRobot,
  IconTemplate,
  IconTrash,
  IconUpload,
  IconX
} from "/build/_shared/chunk-ZHSZHK33.js";
import "/build/_shared/chunk-KBIFJHSO.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FileButton,
  Group,
  Modal,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  Title,
  Tooltip,
  useDisclosure
} from "/build/_shared/chunk-EK4DUNM5.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Link,
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

// app/routes/_app.reports.generate.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
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
  import.meta.hot.lastModified = "1774259006428.0847";
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
    timeFilter,
    statusFilter
  } = useLoaderData();
  const [selectedTemplate, setSelectedTemplate] = (0, import_react2.useState)("standard");
  const {
    showToast,
    showBanner
  } = useNotificationStore();
  const [uploadFile, setUploadFile] = (0, import_react2.useState)(null);
  const [uploadProgress, setUploadProgress] = (0, import_react2.useState)(null);
  const [uploadSuccess, setUploadSuccess] = (0, import_react2.useState)(false);
  const [isOfficial, setIsOfficial] = (0, import_react2.useState)(true);
  const [genModalOpen, {
    open: openGenModal,
    close: closeGenModal
  }] = useDisclosure(false);
  const [progressModalOpen, {
    open: openProgressModal,
    close: closeProgressModal
  }] = useDisclosure(false);
  const [uploadModalOpen, {
    open: openUploadModal,
    close: closeUploadModal
  }] = useDisclosure(false);
  const [selectOrderModalOpen, {
    open: openSelectOrderModal,
    close: closeSelectOrderModal
  }] = useDisclosure(false);
  const [activeOrder, setActiveOrder] = (0, import_react2.useState)(null);
  const [selectedKolIds, setSelectedKolIds] = (0, import_react2.useState)([]);
  const [progressPercentage, setProgressPercentage] = (0, import_react2.useState)(0);
  const [currentStepIndex, setCurrentStepIndex] = (0, import_react2.useState)(0);
  const handleDownload = () => alert("\u5831\u544A\u4E0B\u8F09\u4E2D...");
  const handleDelete = () => {
    if (confirm("\u78BA\u5B9A\u8981\u522A\u9664\u6B64\u7248\u672C\u7684\u5831\u544A\u55CE\uFF1F")) {
      alert("\u5831\u544A\u5DF2\u522A\u9664 (\u6A21\u64EC)");
    }
  };
  const handleOpenUploadModal = (order) => {
    setActiveOrder(order);
    setUploadFile(null);
    setUploadProgress(null);
    setUploadSuccess(false);
    setIsOfficial(true);
    openUploadModal();
  };
  const startOfficialUpload = () => {
    setUploadProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      if (p >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setTimeout(() => {
          setUploadSuccess(true);
          setTimeout(() => {
            closeUploadModal();
          }, 2e3);
        }, 500);
      } else {
        setUploadProgress(p);
      }
    }, 400);
  };
  const handleOpenGenModal = (order) => {
    setActiveOrder(order);
    const readyIds = (order.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).map((k) => k.id);
    setSelectedKolIds(readyIds);
    openGenModal();
  };
  const toggleKolSelection = (kolId) => {
    setSelectedKolIds((prev) => prev.includes(kolId) ? prev.filter((id) => id !== kolId) : [...prev, kolId]);
  };
  const startGeneration = () => {
    closeGenModal();
    setProgressPercentage(0);
    setCurrentStepIndex(0);
    openProgressModal();
    const stepsProgress = [15, 30, 60, 80, 100];
    stepsProgress.forEach((p, idx) => {
      setTimeout(() => {
        setProgressPercentage(p);
        setCurrentStepIndex(idx);
        if (p === 100) {
          setTimeout(() => {
            closeProgressModal();
            const title = "\u7D50\u6848\u5831\u544A\u5DF2\u751F\u6210\u5B8C\u6210\uFF01";
            const message = `${activeOrder?.orderNo} ${activeOrder?.title || activeOrder?.projectName}|\u7D50\u6848\u5831\u544A_v1.pptx`;
            showToast(title, message, "/reports/generate");
            showBanner(title, message, "/reports/generate");
            if ("Notification" in window) {
              if (Notification.permission === "granted") {
                new Notification("\u{1F389} \u7D50\u6848\u5831\u544A\u5DF2\u5B8C\u6210", {
                  body: `\u6848\u4EF6 #${activeOrder?.orderNo} \u7684\u7D50\u6848\u5831\u544A\u5DF2\u751F\u6210\u5B8C\u6210\uFF0C\u9EDE\u64CA\u67E5\u770B`
                });
              } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    new Notification("\u{1F389} \u7D50\u6848\u5831\u544A\u5DF2\u5B8C\u6210", {
                      body: `\u6848\u4EF6 #${activeOrder?.orderNo} \u7684\u7D50\u6848\u5831\u544A\u5DF2\u751F\u6210\u5B8C\u6210\uFF0C\u9EDE\u64CA\u67E5\u770B`
                    });
                  }
                });
              }
            }
          }, 800);
        }
      }, (idx + 1) * 1200);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u7D50\u6848\u5831\u544A\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 186,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { color: "blue", onClick: openSelectOrderModal, children: "+ \u751F\u6210\u65B0\u5831\u544A" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 187,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 185,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "end", wrap: "wrap", gap: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u5BA2\u6236" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 196,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "client", defaultValue: clientFilter, style: {
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ddd"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "\u5168\u90E8" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 202,
              columnNumber: 17
            }, this),
            allClients.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: c, children: c }, c, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 203,
              columnNumber: 38
            }, this))
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 197,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u6642\u9593\u7BC4\u570D" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 207,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "time", defaultValue: timeFilter, style: {
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ddd"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "\u5168\u90E8" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 213,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "this_year", children: "2026 \u5E74" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 214,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2024_10", children: "2024-10" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 215,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 208,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u72C0\u614B" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 219,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "status", defaultValue: statusFilter, style: {
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ddd"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "\u5168\u90E8" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 225,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "draft", children: "\u6709\u8349\u7A3F" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 226,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "official", children: "\u6709\u6B63\u5F0F\u7248" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 227,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "none", children: "\u7121\u5831\u544A" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 228,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 220,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 218,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", variant: "light", children: "\u5957\u7528\u7BE9\u9078" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 231,
          columnNumber: 13
        }, this),
        (clientFilter || timeFilter !== "all") && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "subtle", color: "gray", component: "a", href: "/reports/generate", children: "\u6E05\u9664" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 232,
          columnNumber: 56
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 194,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 193,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: orders.map((order) => {
        const hasDraft = order.hasDraft;
        const hasOfficial = order.hasOfficial;
        const kols = order.collaborations ?? [];
        const readyKols = kols.filter((k) => (k.performanceItems ?? []).some((p) => (p.metrics?.impressions ?? 0) > 0));
        const missingCount = kols.length - readyKols.length;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, shadow: "sm", radius: "md", p: 0, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { p: "md", style: {
            borderBottom: "1px solid #eee"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, size: "lg", children: [
                "\u{1F4CB} #",
                order.orderNo,
                " ",
                order.title ?? order.projectName ?? "\u672A\u547D\u540D\u6848\u4EF6"
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 251,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", mt: 4, children: [
                "\u5BA2\u6236: ",
                order.clientName,
                " | \u65E5\u671F: ",
                formatShortDate(order.startDate),
                " | \u5408\u4F5C KOL: ",
                order.kolCount ?? kols.length,
                " \u4F4D"
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 252,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 250,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "subtle", size: "sm", component: Link, to: `/insertion-orders/${order.id}`, children: "\u67E5\u770B\u6848\u4EF6\u8A73\u60C5" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 257,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { size: "sm", variant: "outline", onClick: () => handleOpenGenModal(order), children: "+ \u751F\u6210\u65B0\u5831\u544A" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 260,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 256,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 249,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 246,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { p: "md", bg: "#fdfdfd", children: !hasDraft && !hasOfficial ? (
            // Empty State
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", py: "xl", gap: "sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", fw: 500, children: "\u5C1A\u672A\u751F\u6210\u7D50\u6848\u5831\u544A" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 272,
                columnNumber: 23
              }, this),
              missingCount > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "yellow", variant: "light", size: "lg", children: [
                "\u26A0\uFE0F \u63D0\u793A: ",
                missingCount,
                " \u4F4D KOL \u5C1A\u672A\u4E0A\u50B3\u6210\u6548"
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 273,
                columnNumber: 44
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "sm", mt: "sm", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { onClick: () => handleOpenGenModal(order), children: "\u958B\u59CB\u751F\u6210\u5831\u544A" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 275,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "outline", color: "blue", onClick: () => handleOpenUploadModal(order), children: "+ \u4E0A\u50B3\u6B63\u5F0F\u7248" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 276,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 274,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 271,
              columnNumber: 15
            }, this)
          ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
            base: 1,
            lg: 2
          }, spacing: "md", children: [
            hasDraft && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, bg: "gray.0", radius: "sm", p: "sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, mb: "sm", c: "dimmed", children: "\u7CFB\u7D71\u751F\u6210\uFF08\u8349\u7A3F\uFF09" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 284,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", wrap: "nowrap", style: {
                border: "1px solid #eaeaea",
                background: "white",
                padding: 12,
                borderRadius: 8
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "lg", variant: "light", color: "gray", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconFileTypePpt, { size: 20 }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 292,
                    columnNumber: 81
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 292,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, children: "\u7D50\u6848\u5831\u544A_v1.pptx" }, void 0, false, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 295,
                        columnNumber: 35
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "gray", variant: "filled", size: "xs", children: "\u8349\u7A3F" }, void 0, false, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 296,
                        columnNumber: 35
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 294,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u751F\u6210\u6642\u9593: 2024-10-20 14:30 | \u751F\u6210\u8005: \u7CFB\u7D71 AI" }, void 0, false, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 298,
                      columnNumber: 33
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 293,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 291,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "blue", onClick: handleDownload, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconDownload, { size: 18 }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 302,
                    columnNumber: 97
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 302,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "indigo", onClick: () => handleOpenGenModal(order), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconPencil, { size: 18 }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 303,
                    columnNumber: 116
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 303,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "red", onClick: handleDelete, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTrash, { size: 18 }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 304,
                    columnNumber: 94
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 304,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 301,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 285,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 283,
              columnNumber: 36
            }, this),
            hasOfficial && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, bg: "green.0", radius: "sm", p: "sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, mb: "sm", c: "green.8", children: "\u6B63\u5F0F\u7248\u672C" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 311,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", wrap: "nowrap", style: {
                border: "1px solid #b2f2bb",
                background: "white",
                padding: 12,
                borderRadius: 8
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "lg", variant: "light", color: "green", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconFileTypePpt, { size: 20 }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 319,
                    columnNumber: 82
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 319,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, children: "\u7D50\u6848\u5831\u544A_\u5B8C\u6574\u7248.pptx" }, void 0, false, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 322,
                        columnNumber: 35
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "green", variant: "filled", size: "xs", children: "\u2B50 \u6B63\u5F0F\u7248" }, void 0, false, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 323,
                        columnNumber: 35
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 321,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u4E0A\u50B3\u6642\u9593: 2024-10-22 10:15 | \u4E0A\u50B3\u8005: \u7BA1\u7406\u54E1" }, void 0, false, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 325,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mt: 2, children: "\u8AAA\u660E: \u5DF2\u6839\u64DA\u5BA2\u6236\u56DE\u994B\u4FEE\u6B63\u6578\u64DA\u5448\u73FE\u65B9\u5F0F" }, void 0, false, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 326,
                      columnNumber: 33
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 320,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 318,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "blue", onClick: handleDownload, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconDownload, { size: 18 }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 330,
                    columnNumber: 97
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 330,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "red", onClick: handleDelete, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTrash, { size: 18 }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 331,
                    columnNumber: 94
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 331,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 329,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 312,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 310,
              columnNumber: 39
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 278,
            columnNumber: 32
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 268,
            columnNumber: 17
          }, this),
          (hasDraft || hasOfficial) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { p: "sm", style: {
            borderTop: "1px solid #eee",
            background: "#f8f9fa"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", size: "sm", onClick: () => handleOpenUploadModal(order), children: hasOfficial ? "\u66F4\u65B0\u6B63\u5F0F\u7248" : "+ \u4E0A\u50B3\u6B63\u5F0F\u7248" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 344,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 343,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 339,
            columnNumber: 47
          }, this)
        ] }, order.id, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 244,
          columnNumber: 18
        }, this);
      }) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 237,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 183,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: selectOrderModalOpen, onClose: closeSelectOrderModal, title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, size: "lg", children: "\u9078\u64C7\u59D4\u520A\u55AE\u751F\u6210\u5831\u544A" }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 355,
      columnNumber: 83
    }, this), size: "lg", centered: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u8ACB\u9078\u64C7\u4E00\u500B\u6848\u4EF6\u4F86\u958B\u59CB\u751F\u6210\u65B0\u7684\u7D50\u6848\u5831\u544A\uFF1A" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 357,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
        maxHeight: 400,
        overflowY: "auto"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", radius: "md", style: {
        cursor: "pointer"
      }, onClick: () => {
        handleOpenGenModal(order);
        closeSelectOrderModal();
      }, className: "hover:bg-blue-50", onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-0)", onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "transparent", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: [
            "#",
            order.orderNo,
            " ",
            order.title || order.projectName
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 371,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
            order.clientName,
            " | ",
            formatShortDate(order.startDate)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 372,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 370,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", size: "xs", children: "\u9078\u64C7" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 374,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 369,
        columnNumber: 19
      }, this) }, order.id, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 363,
        columnNumber: 36
      }, this)) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 362,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 358,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: closeSelectOrderModal, children: "\u53D6\u6D88" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 380,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 379,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 356,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 355,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: genModalOpen, onClose: closeGenModal, title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, size: "lg", children: "\u751F\u6210\u7D50\u6848\u5831\u544A" }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 386,
      columnNumber: 67
    }, this), size: "xl", children: activeOrder && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xl", mt: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, bg: "gray.0", p: "sm", radius: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xl", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u6848\u4EF6\u7DE8\u865F" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 392,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: [
            "#",
            activeOrder.orderNo
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 393,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 391,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u6848\u4EF6\u540D\u7A31" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 396,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: activeOrder.title || activeOrder.projectName }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 397,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 395,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u5BA2\u6236" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 400,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: activeOrder.clientName }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 401,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 399,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 390,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 389,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "lg", mb: 4, children: "\u6B65\u9A5F 1\uFF1A\u78BA\u8A8D KOL \u6210\u6548\u8CC7\u6599" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 408,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mb: "md", children: "\u7CFB\u7D71\u5C07\u81EA\u52D5\u9078\u64C7\u5DF2\u4E0A\u50B3\u6210\u6548\u7684 KOL" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 409,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: "green.7", mb: "xs", children: "\u2705 \u5DF2\u4E0A\u50B3\u6210\u6548\u7684 KOL (\u9810\u8A2D\u9078\u64C7)" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 414,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: [
              activeOrder.collaborations?.filter((k) => (k.performanceItems || []).length > 0).map((kol, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", radius: "md", style: {
                transition: "all 0.2s",
                cursor: "pointer"
              }, className: "hover:shadow-sm", onClick: () => toggleKolSelection(kol.id), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedKolIds.includes(kol.id), onChange: () => toggleKolSelection(kol.id), onClick: (e) => e.stopPropagation() }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 421,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.kol?.avatarUrl, radius: "xl", size: "md" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 422,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                  flexGrow: 1
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: kol.kol?.name || "KOL Name" }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 426,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", mt: 4, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                    "IG\u8CBC\u6587 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 428,
                      columnNumber: 63
                    }, this),
                    " | IG\u9650\u52D5 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 431,
                      columnNumber: 40
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 428,
                    columnNumber: 31
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 427,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 423,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                  textAlign: "right"
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "dot", color: "blue", children: "\u7E3D\u89F8\u53CA 80K" }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 440,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mt: 4, children: "\u4E92\u52D5\u7387 7.8%" }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 441,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 437,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 420,
                columnNumber: 25
              }, this) }, kol.id || idx, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 416,
                columnNumber: 119
              }, this)),
              (activeOrder.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", radius: "md", style: {
                cursor: "pointer"
              }, onClick: () => toggleKolSelection("demo-gina"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedKolIds.includes("demo-gina"), onChange: () => toggleKolSelection("demo-gina"), onClick: (e) => e.stopPropagation() }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 450,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { color: "blue", radius: "xl", size: "md", children: "G" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 451,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                  flexGrow: 1
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: "Gina (Demo)" }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 455,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", mt: 4, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                    "IG\u8CBC\u6587 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 457,
                      columnNumber: 63
                    }, this),
                    " | IG\u9650\u52D5 ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 12, style: {
                      display: "inline",
                      color: "green"
                    } }, void 0, false, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 460,
                      columnNumber: 40
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 457,
                    columnNumber: 31
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 456,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 452,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 449,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 446,
                columnNumber: 124
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 415,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 413,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: "orange.7", mb: "xs", children: "\u26A0\uFE0F \u5C1A\u672A\u4E0A\u50B3\u6210\u6548\u7684 KOL" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 473,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: (activeOrder.collaborations || []).filter((k) => !(k.performanceItems || []).length).map((kol, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", radius: "md", bg: "orange.0", style: {
              opacity: 0.8,
              cursor: "pointer"
            }, onClick: () => toggleKolSelection(kol.id), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedKolIds.includes(kol.id), onChange: () => toggleKolSelection(kol.id), onClick: (e) => e.stopPropagation() }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 480,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.kol?.avatarUrl, radius: "xl", size: "md", style: {
                filter: "grayscale(100%)"
              } }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 481,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
                flexGrow: 1
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, c: "dimmed", children: kol.kol?.name || "KOL Name" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 487,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", mt: 4, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "red.7", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconX, { size: 12, style: {
                    display: "inline"
                  } }, void 0, false, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 489,
                    columnNumber: 57
                  }, this),
                  " \u7121\u6210\u6548\u8CC7\u6599"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 489,
                  columnNumber: 31
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 488,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 484,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "subtle", size: "xs", color: "blue", rightSection: "\u2192", children: "\u524D\u5F80\u4E0A\u50B3\u6210\u6548" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 494,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 479,
              columnNumber: 25
            }, this) }, kol.id || idx, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 475,
              columnNumber: 123
            }, this)) }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 474,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 472,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { bg: "blue.0", p: "sm", radius: "md", mt: "xs", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", align: "flex-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "blue", variant: "light", size: "sm", mt: 2, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBulb, { size: 14 }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 503,
              columnNumber: 78
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 503,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "blue.9", style: {
              lineHeight: 1.4
            }, children: "\u672A\u52FE\u9078\u7684 KOL \u5C07\u4E0D\u6703\u51FA\u73FE\u5728\u5831\u544A\u4E2D\u3002\u5EFA\u8B70\u5148\u4E0A\u50B3\u6240\u6709 KOL \u7684\u6210\u6548\u8CC7\u6599\u5F8C\u518D\u751F\u6210\u5831\u544A\u3002" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 504,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 502,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 501,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 411,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 407,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 514,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "lg", mb: "md", children: "\u6B65\u9A5F 2\uFF1A\u5831\u544A\u8A2D\u5B9A" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 518,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5831\u544A\u6A19\u984C", defaultValue: `${activeOrder.title || activeOrder.projectName} \u7D50\u6848\u5831\u544A`, description: "0/100" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 521,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: "xs", children: "PowerPoint \u6A21\u677F" }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 524,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { grow: true, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", onClick: () => setSelectedTemplate("standard"), style: {
                borderColor: selectedTemplate === "standard" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)",
                cursor: "pointer"
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "standard" ? "blue" : "gray", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTemplate, {}, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 531,
                  columnNumber: 120
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 531,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: selectedTemplate === "standard" ? "" : "dimmed", children: "\u516C\u53F8\u6A19\u6E96\u6A21\u677F" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 532,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 530,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 526,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", onClick: () => setSelectedTemplate("simple"), style: {
                borderColor: selectedTemplate === "simple" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)",
                cursor: "pointer"
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "simple" ? "blue" : "gray", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTemplate, {}, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 540,
                  columnNumber: 118
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 540,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: selectedTemplate === "simple" ? "" : "dimmed", children: "\u7C21\u7D04\u6A21\u677F" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 541,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 539,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 535,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "sm", onClick: () => setSelectedTemplate("none"), style: {
                borderColor: selectedTemplate === "none" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)",
                cursor: "pointer"
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "none" ? "blue" : "gray", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconFile, {}, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 549,
                  columnNumber: 116
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 549,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", c: selectedTemplate === "none" ? "" : "dimmed", children: "\u4E0D\u5957\u7528\u6A21\u677F" }, void 0, false, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 550,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 548,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 544,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 525,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 523,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { bg: "gray.0", p: "sm", radius: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "gray", variant: "light", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconFileDescription, { size: 16 }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 558,
              columnNumber: 61
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 558,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, children: "\u9810\u4F30\u9801\u6578: \u7D04 18 \u9801" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 560,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "(\u5C01\u9762 + 3\u500BKOL \xD7 \u5E73\u57475\u9801 + \u7E3D\u7D50)" }, void 0, false, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 561,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 559,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 557,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 556,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 520,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 517,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "ghost", color: "gray", onClick: closeGenModal, children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 569,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { label: "\u5831\u544A\u5C07\u5728\u80CC\u666F\u751F\u6210\uFF0C\u5B8C\u6210\u5F8C\u6703\u901A\u77E5\u60A8", position: "top", withArrow: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { color: "blue", size: "lg", onClick: startGeneration, leftSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconRobot, { size: 20 }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 571,
          columnNumber: 87
        }, this), children: "\u958B\u59CB\u751F\u6210" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 571,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 570,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 568,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 387,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 386,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: progressModalOpen, onClose: closeProgressModal, withCloseButton: false, size: "md", centered: true, overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", ta: "center", gap: "md", py: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: 64, radius: "100%", variant: "light", color: "blue", style: {
        animation: "pulse 2s infinite"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconRobot, { size: 40 }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 588,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 585,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "AI \u6B63\u5728\u70BA\u60A8\u751F\u6210\u5831\u544A" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 591,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mt: 4, children: [
          "\u6848\u4EF6 #",
          activeOrder?.orderNo,
          " ",
          activeOrder?.title || activeOrder?.projectName
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 592,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 590,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { w: "100%", my: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: 8, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, children: "\u9032\u5EA6" }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 599,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, c: "blue", children: [
            progressPercentage,
            "%"
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 600,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 598,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { value: progressPercentage, size: "lg", radius: "xl", striped: true, animated: true, color: "blue" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 602,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 597,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", w: "100%", align: "flex-start", pl: "md", children: ["\u6536\u96C6\u6848\u4EF6\u8CC7\u6599", "\u6574\u7406 KOL \u6210\u6548\u6578\u64DA", "AI \u751F\u6210\u5831\u544A\u5167\u5BB9\u4E2D...", "\u5957\u7528 PowerPoint \u6A21\u677F", "\u4E0A\u50B3\u81F3\u96F2\u7AEF\u5132\u5B58"].map((stepDesc, idx) => {
        const isCompleted = currentStepIndex > idx;
        const isCurrent = currentStepIndex === idx;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", gap: "sm", children: [
          isCompleted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "green", size: 20, radius: "xl", variant: "filled", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 14 }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 611,
            columnNumber: 98
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 611,
            columnNumber: 34
          }, this) : isCurrent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "blue", size: 20, radius: "xl", variant: "light", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconRobot, { size: 14 }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 611,
            columnNumber: 210
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 611,
            columnNumber: 148
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "gray", size: 20, radius: "xl", variant: "light", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconClockHour4, { size: 14 }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 611,
            columnNumber: 310
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 611,
            columnNumber: 248
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: isCurrent ? 600 : 400, c: isCompleted ? "dimmed" : isCurrent ? "blue.7" : "gray.5", children: stepDesc }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 612,
            columnNumber: 19
          }, this)
        ] }, idx, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 610,
          columnNumber: 20
        }, this);
      }) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 606,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mt: "xs", children: "\u9810\u8A08\u9084\u9700 2 \u5206\u9418" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 619,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { bg: "blue.0", w: "100%", p: "sm", radius: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", align: "center", justify: "center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBulb, { size: 18, color: "var(--mantine-color-blue-7)" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 623,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "blue.9", children: "\u60A8\u53EF\u4EE5\u95DC\u9589\u6B64\u8996\u7A97\u7E7C\u7E8C\u5176\u4ED6\u5DE5\u4F5C\uFF0C\u5B8C\u6210\u5F8C\u6703\u901A\u77E5\u60A8" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 624,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 622,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 621,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { w: "100%", grow: true, mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "outline", color: "red", onClick: closeProgressModal, children: "\u53D6\u6D88\u751F\u6210" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 629,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { onClick: closeProgressModal, children: "\u5728\u80CC\u666F\u7E7C\u7E8C" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 630,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 628,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 584,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 580,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: uploadModalOpen, onClose: closeUploadModal, title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, size: "lg", children: "\u4E0A\u50B3\u6B63\u5F0F\u7D50\u6848\u5831\u544A" }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 636,
      columnNumber: 73
    }, this), centered: true, size: 600, withCloseButton: !uploadProgress && !uploadSuccess, closeOnClickOutside: !uploadProgress && !uploadSuccess, children: uploadSuccess ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", ta: "center", py: "xl", gap: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: 64, radius: "100%", color: "green", variant: "filled", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 40 }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 639,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 638,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u4E0A\u50B3\u6210\u529F\uFF01" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 641,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { mt: "md", variant: "outline", onClick: closeUploadModal, children: "\u67E5\u770B\u5831\u544A" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 642,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 637,
      columnNumber: 26
    }, this) : uploadProgress !== null ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", ta: "center", py: "xl", gap: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: 64, radius: "md", color: "blue", variant: "light", style: {
        animation: "pulse 2s infinite"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCloudUpload, { size: 40 }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 647,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 644,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { w: "100%", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: 8, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: [
          "\u4E0A\u50B3\u4E2D... ",
          uploadProgress,
          "%"
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 651,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 650,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, { value: uploadProgress, size: "lg", radius: "xl", striped: true, animated: true }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 653,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 649,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { mt: "md", variant: "subtle", color: "red", onClick: closeUploadModal, children: "\u53D6\u6D88" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 655,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 643,
      columnNumber: 48
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mt: "-xs", children: [
        "\u6848\u4EF6: #",
        activeOrder?.orderNo,
        " ",
        activeOrder?.title || activeOrder?.projectName
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 657,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: !uploadFile ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileButton, { onChange: setUploadFile, accept: "application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation", children: (props) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { ...props, withBorder: true, radius: "md", p: "xl", style: {
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: "var(--mantine-color-default-border)",
        cursor: "pointer",
        textAlign: "center",
        transition: "border-color 0.2s, background-color 0.2s"
      }, onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "var(--mantine-color-blue-filled)";
        e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
      }, onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "var(--mantine-color-default-border)";
        e.currentTarget.style.backgroundColor = "transparent";
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: 48, variant: "light", color: "blue", radius: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconUpload, { size: 24 }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 678,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 677,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, mt: "sm", children: "\u62D6\u66F3\u6A94\u6848\u81F3\u6B64\u6216\u9EDE\u64CA\u9078\u64C7" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 680,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u652F\u63F4\u683C\u5F0F: .pptx, .pdf \u2022 \u6700\u5927 50MB" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 681,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", size: "xs", mt: "sm", children: "\u9078\u64C7\u6A94\u6848" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 682,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 676,
        columnNumber: 23
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 662,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 661,
        columnNumber: 30
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, radius: "md", p: "sm", bg: "gray.0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", justify: "space-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { size: "lg", variant: "light", color: "blue", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconFile, { size: 20 }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 689,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 688,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 500, size: "sm", lineClamp: 1, children: uploadFile.name }, void 0, false, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 692,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
              (uploadFile.size / 1024 / 1024).toFixed(2),
              " MB"
            ] }, void 0, true, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 693,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 691,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 687,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { color: "red", variant: "subtle", onClick: () => setUploadFile(null), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconX, { size: 16 }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 697,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 696,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 686,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 685,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 660,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { label: "\u7248\u672C\u8AAA\u660E (\u9078\u586B)", placeholder: "\u4F8B\u5982: \u5DF2\u6839\u64DA\u5BA2\u6236\u56DE\u994B\u4FEE\u6B63\u6578\u64DA\u5448\u73FE\u65B9\u5F0F\u3001\u66F4\u65B0\u54C1\u724C\u8996\u89BA...", description: "\u8AAA\u660E\u6B64\u7248\u672C\u8207\u8349\u7A3F\u7684\u5DEE\u7570\u6216\u4FEE\u6539\u5167\u5BB9", minRows: 3 }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 704,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: isOfficial, onChange: (evt) => setIsOfficial(evt.currentTarget.checked), label: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "md", children: "\u6A19\u8A18\u70BA\u6B63\u5F0F\u7248\u672C" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 707,
        columnNumber: 110
      }, this), description: "\u6B63\u5F0F\u7248\u6703\u986F\u793A \u2B50 \u6A19\u8A18\uFF0C\u4E26\u512A\u5148\u5C55\u793A\u7D66\u5718\u968A\u6210\u54E1", size: "md" }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 707,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { bg: "blue.0", p: "sm", radius: "md", mt: "xs", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { wrap: "nowrap", align: "flex-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeIcon, { color: "blue", variant: "light", size: "sm", mt: 2, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBulb, { size: 14 }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 711,
          columnNumber: 74
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 711,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "blue.9", style: {
          lineHeight: 1.4
        }, children: "\u4E0A\u50B3\u6B63\u5F0F\u7248\u5F8C\uFF0C\u7CFB\u7D71\u8349\u7A3F\u4ECD\u6703\u4FDD\u7559\u3002\u60A8\u53EF\u4EE5\u96A8\u6642\u67E5\u770B\u6216\u4E0B\u8F09\u4EFB\u4E00\u7248\u672C\u3002" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 712,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 710,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 709,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "ghost", color: "gray", onClick: closeUploadModal, children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 721,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { color: "blue", disabled: !uploadFile, onClick: startOfficialUpload, children: "\u78BA\u8A8D\u4E0A\u50B3" }, void 0, false, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 722,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 720,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 656,
      columnNumber: 22
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 636,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { children: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      ` }, void 0, false, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 727,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.reports.generate.tsx",
    lineNumber: 182,
    columnNumber: 10
  }, this);
}
_s(ReportManagementPage, "M9CAPF26GM16gMCUkRib70rMzlw=", false, function() {
  return [useLoaderData, useNotificationStore, useDisclosure, useDisclosure, useDisclosure, useDisclosure];
});
_c = ReportManagementPage;
var _c;
$RefreshReg$(_c, "ReportManagementPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ReportManagementPage as default
};
//# sourceMappingURL=/build/routes/_app.reports.generate-N5HMNLRS.js.map
