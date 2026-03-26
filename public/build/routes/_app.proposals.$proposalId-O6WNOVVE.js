import {
  IconArrowLeft,
  IconTrash
} from "/build/_shared/chunk-ZHSZHK33.js";
import "/build/_shared/chunk-KBIFJHSO.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Checkbox,
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
} from "/build/_shared/chunk-EK4DUNM5.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useLoaderData,
  useNavigation,
  useSubmit
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
  import.meta.hot.lastModified = "1774262546523.323";
}
function ProposalDetailPage() {
  _s();
  const {
    proposal,
    candidates,
    allKols
  } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [isEditing, setIsEditing] = (0, import_react2.useState)(false);
  const [editedTitle, setEditedTitle] = (0, import_react2.useState)(proposal.title);
  const [editedClient, setEditedClient] = (0, import_react2.useState)(proposal.clientName);
  const [editedBudget, setEditedBudget] = (0, import_react2.useState)(proposal.budget);
  const [editedDueDate, setEditedDueDate] = (0, import_react2.useState)(proposal.dueDate);
  const [editedStage, setEditedStage] = (0, import_react2.useState)(proposal.stage);
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
  const [selectedCandidateIds, setSelectedCandidateIds] = (0, import_react2.useState)([]);
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
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-start", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "center", gap: "md", style: {
        flex: 1
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "subtle", color: "gray", component: Link, to: "/proposals", size: "lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconArrowLeft, { size: 24 }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 190,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 189,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", style: {
          flex: 1
        }, children: isEditing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u63D0\u6848\u6A19\u984C", value: editedTitle, onChange: (e) => setEditedTitle(e.currentTarget.value), size: "md", fw: 700 }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 196,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5BA2\u6236\u540D\u7A31", value: editedClient, onChange: (e) => setEditedClient(e.currentTarget.value), size: "sm" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 197,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 195,
          columnNumber: 26
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 0, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: [
            "\u63D0\u6848\u8A73\u7D30\uFF1A",
            proposal.title
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 199,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: [
            "ID: ",
            proposal.id,
            " | \u5BA2\u6236\uFF1A",
            proposal.clientName
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 200,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 198,
          columnNumber: 24
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 186,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "center", children: !isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", color: "orange", onClick: () => setIsEditing(true), children: "\u7DE8\u8F2F\u63D0\u6848\u5167\u5BB9" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 208,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: () => alert("\u63D0\u6848\u8CC7\u6599\u5DF2\u532F\u51FA\u70BA Excel (\u6A21\u64EC)"), children: "\u532F\u51FA\u63D0\u6848" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 211,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/insertion-orders/new?fromProposalId=${proposal.id}`, color: "blue", disabled: !candidates.some((c) => c.status === "accepted"), children: "\u8F49\u70BA\u59D4\u520A\u55AE" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 214,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 207,
        columnNumber: 26
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 206,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 185,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 1,
      md: 3
    }, spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", fw: 700, children: "\u7576\u524D\u968E\u6BB5" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 226,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { mt: 5, size: "sm", value: isEditing ? editedStage : proposal.stage, disabled: !isEditing, onChange: (val) => {
          if (val) {
            if (isEditing) {
              setEditedStage(val);
            } else {
              const formData = new FormData();
              formData.append("intent", "update_proposal");
              formData.append("stage", val);
              submit(formData, {
                method: "post"
              });
            }
          }
        }, data: [{
          value: "draft",
          label: "\u8349\u7A3F (DRAFT)"
        }, {
          value: "internal_review",
          label: "\u5167\u90E8\u5BE9\u6838 (INTERNAL REVIEW)"
        }, {
          value: "sent_to_client",
          label: "\u5DF2\u9001\u51FA\u7D66\u5BA2\u6236 (SENT TO CLIENT)"
        }] }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 225,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u9810\u7B97" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 253,
          columnNumber: 11
        }, this),
        isEditing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NumberInput, { mt: 5, value: editedBudget, onChange: (val) => setEditedBudget(Number(val)), thousandSeparator: ",", prefix: "$" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 254,
          columnNumber: 24
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xl", fw: 700, mt: 5, children: [
          "$",
          proposal.budget.toLocaleString("zh-TW")
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 254,
          columnNumber: 150
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 252,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", fw: 700, children: "\u622A\u6B62\u65E5\u671F" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 257,
          columnNumber: 11
        }, this),
        isEditing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { mt: 5, value: editedDueDate, onChange: (e) => setEditedDueDate(e.currentTarget.value), placeholder: "YYYY-MM-DD" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 258,
          columnNumber: 24
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xl", fw: 700, mt: 5, children: proposal.dueDate }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 258,
          columnNumber: 150
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 256,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 221,
      columnNumber: 7
    }, this),
    isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, padding: "lg", radius: "md", style: {
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
            lineNumber: 274,
            columnNumber: 15
          }, this),
          " AI KOL \u667A\u80FD\u641C\u5C0B"
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 269,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "dot", color: "blue", children: "Beta" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 278,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u8F38\u5165\u60A8\u7684\u9700\u6C42\uFF08\u4F8B\u5982\uFF1A\u627E\u6BCD\u5B30\u985E\u3001\u4E92\u52D5\u7387 5% \u4EE5\u4E0A\u3001\u6C92\u5408\u4F5C\u904E\u7AF6\u54C1\uFF09\uFF0CAI \u5C07\u70BA\u60A8\u63A8\u85A6\u6700\u5408\u9069\u7684\u4EBA\u9078\u3002" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 280,
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
          lineNumber: 282,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", id: "ai-search-btn", color: "blue", onClick: handleAiSearch, loading: aiSearching, children: "\u958B\u59CB\u641C\u5C0B" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 289,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 281,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 267,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 263,
      columnNumber: 21
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: [
            "KOL \u5019\u9078\u540D\u55AE (",
            candidates.length,
            ")"
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 300,
            columnNumber: 15
          }, this),
          isEditing && selectedCandidateIds.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
            display: "inline"
          }, onSubmit: (e) => {
            if (!confirm(`\u78BA\u5B9A\u8981\u5C07\u9078\u4E2D\u7684 ${selectedCandidateIds.length} \u4F4D KOL \u5F9E\u5019\u9078\u540D\u55AE\u4E2D\u79FB\u9664\u55CE\uFF1F`)) {
              e.preventDefault();
            } else {
              setSelectedCandidateIds([]);
            }
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "batch_delete_candidates" }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 310,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "candidateIds", value: selectedCandidateIds.join(",") }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 311,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", color: "red", size: "xs", leftSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTrash, { size: 14 }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 312,
              columnNumber: 78
            }, this), type: "submit", children: [
              "\u6279\u91CF\u522A\u9664 (",
              selectedCandidateIds.length,
              ")"
            ] }, void 0, true, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 312,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 301,
            columnNumber: 64
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 299,
          columnNumber: 13
        }, this),
        isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", size: "xs", onClick: openAdd, children: "+ \u624B\u52D5\u65B0\u589E" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 317,
          columnNumber: 27
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 298,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { striped: true, withTableBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
          isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { style: {
            width: 40
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedCandidateIds.length === candidates.length && candidates.length > 0, indeterminate: selectedCandidateIds.length > 0 && selectedCandidateIds.length < candidates.length, onChange: (e) => {
            if (e.currentTarget.checked) {
              setSelectedCandidateIds(candidates.map((c) => c.id));
            } else {
              setSelectedCandidateIds([]);
            }
          } }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 326,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 323,
            columnNumber: 31
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "KOL \u540D\u7A31" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 334,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u89D2\u8272/\u7248\u4F4D" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 335,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u9810\u4F30\u5831\u50F9" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 336,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u63A8\u85A6\u7406\u7531" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 337,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u72C0\u614B" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 338,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u5BA2\u6236\u53CD\u994B" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 339,
            columnNumber: 17
          }, this),
          isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u64CD\u4F5C" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 340,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 322,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 321,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: candidates.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { colSpan: isEditing ? 8 : 6, align: "center", children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55\u5019\u9078\u4EBA" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 345,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 344,
          columnNumber: 42
        }, this) : candidates.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
          isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { checked: selectedCandidateIds.includes(c.id), onChange: (e) => {
            if (e.currentTarget.checked) {
              setSelectedCandidateIds([...selectedCandidateIds, c.id]);
            } else {
              setSelectedCandidateIds(selectedCandidateIds.filter((id) => id !== c.id));
            }
          } }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 348,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 347,
            columnNumber: 35
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { fw: 500, children: c.kolName }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 356,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: c.role }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 357,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: [
            "$",
            (c.price ?? 0).toLocaleString("zh-TW")
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 358,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", lineClamp: 2, children: c.reason }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 360,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 359,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: statusColor[c.status], children: statusLabel[c.status] }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 363,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 362,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: c.feedbackText || "-" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 366,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 365,
            columnNumber: 21
          }, this),
          isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 5, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
              display: "inline"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 373,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "candidateId", value: c.id }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 374,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "status", value: "accepted" }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 375,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", color: "green", size: "compact-xs", type: "submit", disabled: c.status === "accepted", children: "\u63A5\u53D7" }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 376,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 370,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", color: "red", size: "compact-xs", onClick: () => setFeedbackCandidate({
              id: c.id,
              name: c.kolName
            }), disabled: c.status === "rejected", children: "\u62D2\u7D55" }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 380,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
              display: "inline"
            }, onSubmit: (e) => {
              if (!confirm("\u78BA\u5B9A\u8981\u5C07\u6B64 KOL \u5F9E\u5019\u9078\u540D\u55AE\u4E2D\u79FB\u9664\u55CE\uFF1F")) {
                e.preventDefault();
              }
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "delete_candidate" }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 393,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "candidateId", value: c.id }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 394,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "gray", size: "sm", type: "submit", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTrash, { size: 14 }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 396,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 395,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 386,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 369,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 368,
            columnNumber: 35
          }, this)
        ] }, c.id, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 346,
          columnNumber: 51
        }, this)) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 343,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 320,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 297,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 296,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { id: "proposal-ai-search-modal", opened: aiSearchOpened, onClose: () => {
      setAiSearching(false);
      closeAiSearch();
    }, title: "\u{1F916} AI \u641C\u5C0B\u7D50\u679C", size: "lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
      aiSearching && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: "\u6B63\u5728\u5206\u6790\u8CC7\u6599\u5EAB\u4E26\u5339\u914D\u6700\u4F73\u4EBA\u9078..." }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 413,
        columnNumber: 27
      }, this),
      !aiSearching && aiResults.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: [
        "\u627E\u4E0D\u5230\u7B26\u5408\u300C",
        aiQuery,
        "\u300D\u7684\u5019\u9078\u4EBA\uFF08Mock\uFF09\u3002"
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 414,
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
              lineNumber: 426,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 418,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, children: res.displayName }, void 0, false, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 433,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                res.industry,
                " | ",
                (res.followers ?? 0).toLocaleString("zh-TW"),
                " \u7C89\u7D72"
              ] }, void 0, true, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 434,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 432,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 417,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "blue", variant: "filled", children: [
            "\u5339\u914D\u5EA6 ",
            res.matchScore,
            "%"
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 439,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 416,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", mt: "sm", p: "xs", style: {
          background: "rgba(51, 154, 240, 0.1)",
          borderRadius: 4,
          borderLeft: "3px solid #339af0"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { span: true, fw: 700, c: "blue", children: "AI \u63A8\u85A6\u7406\u7531\uFF1A" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 449,
            columnNumber: 19
          }, this),
          " ",
          res.aiReason
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 444,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: closeAiSearch, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "add_candidate" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 457,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolId", value: res.id }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 458,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolName", value: res.displayName }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 459,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "price", value: res.averagePrice || 0 }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 460,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "role", value: "\u5F85\u8A0E\u8AD6" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 461,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "reason", value: res.aiReason }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 462,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { size: "xs", type: "submit", children: "\u52A0\u5165\u5019\u9078\u540D\u55AE" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 463,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 456,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 455,
          columnNumber: 17
        }, this)
      ] }, res.id, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 415,
        columnNumber: 49
      }, this)),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", fullWidth: true, variant: "light", onClick: closeAiSearch, children: "\u95DC\u9589" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 470,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 412,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 408,
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
        lineNumber: 485,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "\u9078\u64C7 KOL", placeholder: "\u8ACB\u9078\u64C7 KOL", data: allKolOptions, value: manualKolId, onChange: setManualKolId, searchable: true, nothingFoundMessage: "\u627E\u4E0D\u5230\u7B26\u5408\u7684 KOL", required: true, name: "kolId" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 487,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolName", value: allKols.find((k) => k.id === manualKolId)?.displayName ?? "" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 488,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "role", label: "\u5EFA\u8B70\u5408\u4F5C\u7248\u4F4D", placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 x1, Reels x1", required: true }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 489,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NumberInput, { name: "price", label: "\u9810\u8A08\u5831\u50F9", required: true, min: 0, thousandSeparator: ",", defaultValue: allKols.find((k) => k.id === manualKolId)?.averagePrice ?? 0 }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 490,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "reason", label: "\u63A8\u85A6\u7406\u7531", placeholder: "\u70BA\u4EC0\u9EBC\u9019\u500B KOL \u9069\u5408\u6B64\u5C08\u6848\uFF1F", rows: 3 }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 491,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", onClick: () => {
            setManualKolId(null);
            closeAdd();
          }, children: "\u53D6\u6D88" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 493,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", color: "blue", disabled: !manualKolId, children: "\u78BA\u8A8D\u52A0\u5165" }, void 0, false, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 499,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 492,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 486,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 481,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 477,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: !!feedbackCandidate, onClose: () => setFeedbackCandidate(null), title: `\u62D2\u7D55\u5019\u9078\u4EBA\uFF1A${feedbackCandidate?.name}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: () => setFeedbackCandidate(null), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 510,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "candidateId", value: feedbackCandidate?.id }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 511,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "status", value: "rejected" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 512,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { name: "feedback", label: "\u5BA2\u6236\u53CD\u994B / \u62D2\u7D55\u539F\u56E0", required: true, placeholder: "\u8ACB\u8F38\u5165\u62D2\u7D55\u539F\u56E0\uFF08\u9078\u586B\u4F46\u5EFA\u8B70\u586B\u5BEB\uFF09" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 514,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", color: "red", children: "\u78BA\u8A8D\u62D2\u7D55" }, void 0, false, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 515,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 513,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 509,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 508,
      columnNumber: 7
    }, this),
    isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "xl", pb: "xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", size: "lg", onClick: () => {
        setEditedTitle(proposal.title);
        setEditedClient(proposal.clientName);
        setEditedBudget(proposal.budget);
        setEditedDueDate(proposal.dueDate);
        setEditedStage(proposal.stage);
        setIsEditing(false);
      }, children: "\u53D6\u6D88" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 521,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { color: "blue", size: "lg", onClick: () => {
        const formData = new FormData();
        formData.append("intent", "update_proposal");
        formData.append("title", editedTitle);
        formData.append("clientName", editedClient);
        formData.append("budget", String(editedBudget));
        formData.append("dueDate", editedDueDate);
        formData.append("stage", editedStage);
        submit(formData, {
          method: "post"
        });
        setIsEditing(false);
      }, children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, false, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 531,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 520,
      columnNumber: 21
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.proposals.$proposalId.tsx",
    lineNumber: 184,
    columnNumber: 10
  }, this);
}
_s(ProposalDetailPage, "1tDTW6Las2PfbvnkWeaDe/cvfbM=", false, function() {
  return [useLoaderData, useNavigation, useSubmit, useDisclosure, useDisclosure];
});
_c = ProposalDetailPage;
var _c;
$RefreshReg$(_c, "ProposalDetailPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProposalDetailPage as default
};
//# sourceMappingURL=/build/routes/_app.proposals.$proposalId-O6WNOVVE.js.map
