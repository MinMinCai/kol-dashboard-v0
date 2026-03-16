import "/build/_shared/chunk-HTRQC2VH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Badge,
  Button,
  Card,
  Group,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
  useDisclosure
} from "/build/_shared/chunk-62B2IAZI.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useLoaderData,
  useNavigation
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

// app/routes/_app.proposals.$proposalId.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.proposals.$proposalId.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.proposals.$proposalId.tsx"
  );
  import.meta.hot.lastModified = "1773642848910.925";
}
function ProposalDetailPage() {
  _s();
  const {
    proposal,
    candidates,
    allKols
  } = useLoaderData();
  const navigation = useNavigation();
  const [addOpened, {
    open: openAdd,
    close: closeAdd
  }] = useDisclosure(false);
  const [aiSearchOpened, {
    open: openAiSearch,
    close: closeAiSearch
  }] = useDisclosure(false);
  const [aiSearching, setAiSearching] = (0, import_react2.useState)(false);
  const [aiResults, setAiResults] = (0, import_react2.useState)([]);
  const [aiQuery, setAiQuery] = (0, import_react2.useState)("");
  const [feedbackCandidate, setFeedbackCandidate] = (0, import_react2.useState)(null);
  const [manualKolId, setManualKolId] = (0, import_react2.useState)(null);
  const statusColor = {
    pending: "gray",
    accepted: "green",
    rejected: "red"
  };
  const statusLabel = {
    pending: "\u5F85\u5B9A",
    accepted: "\u5DF2\u63A5\u53D7",
    rejected: "\u5DF2\u62D2\u7D55"
  };
  const allKolOptions = (0, import_react2.useMemo)(() => allKols.map((k) => ({
    value: k.id,
    label: k.displayName
  })), [allKols]);
  const handleAiSearch = () => {
    if (!aiQuery.trim())
      return;
    setAiSearching(true);
    openAiSearch();
    window.setTimeout(() => {
      const q = aiQuery.trim().toLowerCase();
      const matches = allKols.filter((k) => {
        const nameOk = k.displayName.toLowerCase().includes(q);
        const catOk = (k.categories ?? []).some((c) => c.toLowerCase().includes(q));
        const industryOk = (k.industry ?? "").toLowerCase().includes(q);
        return nameOk || catOk || industryOk;
      }).slice(0, 5).map((k) => {
        const reason = `\u6839\u64DA\u60A8\u7684\u9700\u6C42\u300C${aiQuery}\u300D\uFF0C\u8A72 KOL \u7684\u9818\u57DF\u8207\u6A19\u7C64\u9AD8\u5EA6\u76F8\u95DC\uFF0C\u4E14\u904E\u5F80\u5728\u985E\u4F3C\u5C08\u6848\u4E2D\u8868\u73FE\u7A69\u5B9A\u3002`;
        return {
          ...k,
          matchScore: 88,
          aiReason: reason
        };
      });
      setAiResults(matches);
      setAiSearching(false);
    }, 900);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 0, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: [
          "\u63D0\u6848\u8A73\u7D30\uFF1A",
          proposal.title
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 143,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: [
          "ID: ",
          proposal.id,
          " | \u5BA2\u6236\uFF1A",
          proposal.clientName
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 142,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: () => alert("\u63D0\u6848\u8CC7\u6599\u5DF2\u532F\u51FA\u70BA Excel (\u6A21\u64EC)"), children: "\u532F\u51FA\u63D0\u6848" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/insertion-orders/new?fromProposalId=${proposal.id}`, color: "blue", disabled: !candidates.some((c) => c.status === "accepted"), children: "\u8F49\u70BA\u59D4\u520A\u55AE" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 152,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 141,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 1,
      md: 3
    }, spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", fw: 700, children: "\u7576\u524D\u968E\u6BB5" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 163,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { size: "lg", mt: 5, children: proposal.stage.toUpperCase() }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 164,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 162,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u9810\u7B97" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 167,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xl", fw: 700, mt: 5, children: [
          "$",
          proposal.budget.toLocaleString("zh-TW")
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 166,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", fw: 700, children: "\u622A\u6B62\u65E5\u671F" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xl", fw: 700, mt: 5, children: proposal.dueDate }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 172,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 170,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 158,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, padding: "lg", radius: "md", style: {
      background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)",
      border: "1px solid #cce3ff"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 8, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "lg", fw: 700, style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            fontSize: 20
          }, children: "\u{1F916}" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 187,
            columnNumber: 15
          }, this),
          " AI KOL \u667A\u80FD\u641C\u5C0B"
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 182,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "dot", color: "blue", children: "Beta" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 191,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 181,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u8F38\u5165\u60A8\u7684\u9700\u6C42\uFF08\u4F8B\u5982\uFF1A\u627E\u6BCD\u5B30\u985E\u3001\u4E92\u52D5\u7387 5% \u4EE5\u4E0A\u3001\u6C92\u5408\u4F5C\u904E\u7AF6\u54C1\uFF09\uFF0CAI \u5C07\u70BA\u60A8\u63A8\u85A6\u6700\u5408\u9069\u7684\u4EBA\u9078\u3002" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "xs", wrap: "nowrap", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { id: "ai-search-input", placeholder: "\u8ACB\u8F38\u5165\u641C\u5C0B\u6307\u4EE4...", style: {
          flex: 1
        }, value: aiQuery, onChange: (e) => setAiQuery(e.currentTarget.value), onKeyDown: (e) => {
          if (e.key === "Enter") {
            handleAiSearch();
          }
        } }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", id: "ai-search-btn", color: "blue", onClick: handleAiSearch, loading: aiSearching, children: "\u958B\u59CB\u641C\u5C0B" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 202,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 194,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 180,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 176,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: [
          "KOL \u5019\u9078\u540D\u55AE (",
          candidates.length,
          ")"
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 212,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", size: "xs", onClick: openAdd, children: "+ \u624B\u52D5\u65B0\u589E" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 213,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 211,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { striped: true, withTableBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "KOL \u540D\u7A31" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 219,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u89D2\u8272/\u7248\u4F4D" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u9810\u4F30\u5831\u50F9" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 221,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u63A8\u85A6\u7406\u7531" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 222,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u72C0\u614B" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 223,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u5BA2\u6236\u53CD\u994B" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u64CD\u4F5C" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 218,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 217,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: candidates.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { colSpan: 7, align: "center", children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55\u5019\u9078\u4EBA" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 230,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 229,
          columnNumber: 42
        }, this) : candidates.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { fw: 500, children: c.kolName }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 232,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: c.role }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 233,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: [
            "$",
            c.price.toLocaleString("zh-TW")
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 234,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", lineClamp: 2, children: c.reason }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 236,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 235,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: statusColor[c.status], children: statusLabel[c.status] }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 239,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 238,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: c.feedbackText || "-" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 242,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 241,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 5, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
              display: "inline"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 249,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "candidateId", value: c.id }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 250,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "status", value: "accepted" }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 251,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", color: "green", size: "compact-xs", type: "submit", disabled: c.status === "accepted", children: "\u63A5\u53D7" }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 252,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 246,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", color: "red", size: "compact-xs", onClick: () => setFeedbackCandidate({
              id: c.id,
              name: c.kolName
            }), disabled: c.status === "rejected", children: "\u62D2\u7D55" }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 256,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 245,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 244,
            columnNumber: 21
          }, this)
        ] }, c.id, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 231,
          columnNumber: 51
        }, this)) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 228,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 210,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 209,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { id: "proposal-ai-search-modal", opened: aiSearchOpened, onClose: () => {
      setAiSearching(false);
      closeAiSearch();
    }, title: "\u{1F916} AI \u641C\u5C0B\u7D50\u679C", size: "lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
      aiSearching && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: "\u6B63\u5728\u5206\u6790\u8CC7\u6599\u5EAB\u4E26\u5339\u914D\u6700\u4F73\u4EBA\u9078..." }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 276,
        columnNumber: 27
      }, this),
      !aiSearching && aiResults.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: [
        "\u627E\u4E0D\u5230\u7B26\u5408\u300C",
        aiQuery,
        "\u300D\u7684\u5019\u9078\u4EBA\uFF08Mock\uFF09\u3002"
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 277,
        columnNumber: 54
      }, this),
      !aiSearching && aiResults.map((res) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, shadow: "xs", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#eee",
              overflow: "hidden",
              flexShrink: 0
            }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: res.avatarUrl, alt: "", style: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            } }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 289,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 281,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, children: res.displayName }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 296,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                res.industry,
                " | ",
                (res.followers ?? 0).toLocaleString("zh-TW"),
                " \u7C89\u7D72"
              ] }, void 0, true, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 297,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 295,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 280,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "blue", variant: "filled", children: [
            "\u5339\u914D\u5EA6 ",
            res.matchScore,
            "%"
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 302,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 279,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", mt: "sm", p: "xs", style: {
          background: "rgba(51, 154, 240, 0.1)",
          borderRadius: 4,
          borderLeft: "3px solid #339af0"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { span: true, fw: 700, c: "blue", children: "AI \u63A8\u85A6\u7406\u7531\uFF1A" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 312,
            columnNumber: 19
          }, this),
          " ",
          res.aiReason
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 307,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: closeAiSearch, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "add_candidate" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 320,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolId", value: res.id }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 321,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolName", value: res.displayName }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 322,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "price", value: res.averagePrice || 0 }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 323,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "role", value: "\u5F85\u8A0E\u8AD6" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 324,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "reason", value: res.aiReason }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 325,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { size: "xs", type: "submit", children: "\u52A0\u5165\u5019\u9078\u540D\u55AE" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 326,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 319,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 318,
          columnNumber: 17
        }, this)
      ] }, res.id, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 278,
        columnNumber: 49
      }, this)),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", fullWidth: true, variant: "light", onClick: closeAiSearch, children: "\u95DC\u9589" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 333,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 275,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 271,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { id: "proposal-manual-add-modal", opened: addOpened, onClose: () => {
      setManualKolId(null);
      closeAdd();
    }, title: "\u65B0\u589E KOL \u5019\u9078\u4EBA", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: () => {
      setManualKolId(null);
      closeAdd();
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "add_candidate" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 348,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "\u9078\u64C7 KOL", placeholder: "\u8ACB\u9078\u64C7 KOL", data: allKolOptions, value: manualKolId, onChange: setManualKolId, searchable: true, nothingFoundMessage: "\u627E\u4E0D\u5230\u7B26\u5408\u7684 KOL", required: true, name: "kolId" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 350,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolName", value: allKols.find((k) => k.id === manualKolId)?.displayName ?? "" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 351,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "role", label: "\u5EFA\u8B70\u5408\u4F5C\u7248\u4F4D", placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 x1, Reels x1", required: true }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 352,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NumberInput, { name: "price", label: "\u9810\u8A08\u5831\u50F9", required: true, min: 0, thousandSeparator: ",", defaultValue: allKols.find((k) => k.id === manualKolId)?.averagePrice ?? 0 }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "reason", label: "\u63A8\u85A6\u7406\u7531", placeholder: "\u70BA\u4EC0\u9EBC\u9019\u500B KOL \u9069\u5408\u6B64\u5C08\u6848\uFF1F", rows: 3 }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 354,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", onClick: () => {
            setManualKolId(null);
            closeAdd();
          }, children: "\u53D6\u6D88" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 356,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", color: "blue", disabled: !manualKolId, children: "\u78BA\u8A8D\u52A0\u5165" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 362,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 355,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 349,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 344,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 340,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: !!feedbackCandidate, onClose: () => setFeedbackCandidate(null), title: `\u62D2\u7D55\u5019\u9078\u4EBA\uFF1A${feedbackCandidate?.name}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: () => setFeedbackCandidate(null), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 373,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "candidateId", value: feedbackCandidate?.id }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 374,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "status", value: "rejected" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 375,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "feedback", label: "\u5BA2\u6236\u53CD\u994B / \u62D2\u7D55\u539F\u56E0", required: true, placeholder: "\u8ACB\u8F38\u5165\u62D2\u7D55\u539F\u56E0\uFF08\u9078\u586B\u4F46\u5EFA\u8B70\u586B\u5BEB\uFF09" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 377,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", color: "red", children: "\u78BA\u8A8D\u62D2\u7D55" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 378,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 376,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 372,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 371,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.proposals.$proposalId.tsx",
    lineNumber: 140,
    columnNumber: 10
  }, this);
}
_s(ProposalDetailPage, "wmnyb0Liqf1W3jrmKu9i7sy/1jA=", false, function() {
  return [useLoaderData, useNavigation, useDisclosure, useDisclosure];
});
_c = ProposalDetailPage;
var _c;
$RefreshReg$(_c, "ProposalDetailPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProposalDetailPage as default
};
//# sourceMappingURL=/build/routes/_app.proposals.$proposalId-IWMHOVJA.js.map
