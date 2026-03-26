import {
  IconEye,
  IconPencil,
  IconTrash
} from "/build/_shared/chunk-ZHSZHK33.js";
import "/build/_shared/chunk-NNH5CGJ5.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
  useDisclosure
} from "/build/_shared/chunk-EK4DUNM5.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
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

// app/routes/_app.proposals._index.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.proposals._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.proposals._index.tsx"
  );
  import.meta.hot.lastModified = "1774262573172.7258";
}
function ProposalListPage() {
  _s();
  const {
    proposals
  } = useLoaderData();
  const [editingProposal, setEditingProposal] = (0, import_react2.useState)(null);
  const [opened, {
    open,
    close
  }] = useDisclosure(false);
  const handleEdit = (p) => {
    setEditingProposal(p);
    open();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u63D0\u6848\u4E00\u89BD\u9801" }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/proposals/new", children: "\u65B0\u589E\u63D0\u6848" }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { striped: true, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u6A19\u984C" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 95,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u5BA2\u6236" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 96,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u968E\u6BB5" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 97,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u9810\u7B97" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 98,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u622A\u6B62\u65E5" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 99,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { style: {
          textAlign: "right"
        }, children: "\u64CD\u4F5C" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 100,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 94,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: proposals.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/proposals/${p.id}`, children: p.title }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 108,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 107,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: p.clientName }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 110,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: p.stage }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 111,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: [
          "$",
          p.budget.toLocaleString()
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 112,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: p.dueDate }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 113,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", justify: "flex-end", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "blue", component: Link, to: `/proposals/${p.id}`, title: "\u67E5\u770B\u8A73\u7D30", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconEye, { size: 16 }, void 0, false, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 117,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 116,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "orange", onClick: () => handleEdit(p), title: "\u7DE8\u8F2F", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconPencil, { size: 16 }, void 0, false, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 120,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 119,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: (e) => {
            if (!confirm("\u78BA\u5B9A\u8981\u522A\u9664\u6B64\u63D0\u6848\u55CE\uFF1F")) {
              e.preventDefault();
            }
          }, style: {
            display: "inline"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "delete_proposal" }, void 0, false, {
              fileName: "app/routes/_app.proposals._index.tsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: p.id }, void 0, false, {
              fileName: "app/routes/_app.proposals._index.tsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "red", type: "submit", title: "\u522A\u9664", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTrash, { size: 16 }, void 0, false, {
              fileName: "app/routes/_app.proposals._index.tsx",
              lineNumber: 132,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.proposals._index.tsx",
              lineNumber: 131,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 122,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 115,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 114,
          columnNumber: 17
        }, this)
      ] }, p.id, true, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 106,
        columnNumber: 33
      }, this)) }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 92,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened, onClose: close, title: "\u7DE8\u8F2F\u63D0\u6848\u57FA\u672C\u8CC7\u6599", children: editingProposal && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: close, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "edit_proposal" }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 144,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: editingProposal.id }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 145,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "title", label: "\u63D0\u6848\u6A19\u984C", defaultValue: editingProposal.title, required: true }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 147,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "clientName", label: "\u5BA2\u6236\u540D\u7A31", defaultValue: editingProposal.clientName, required: true }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 148,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NumberInput, { name: "budget", label: "\u9810\u7B97", defaultValue: editingProposal.budget, thousandSeparator: "," }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 149,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "dueDate", label: "\u622A\u6B62\u65E5", defaultValue: editingProposal.dueDate, placeholder: "2026-03-20" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 150,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { name: "stage", label: "\u63D0\u6848\u968E\u6BB5", defaultValue: editingProposal.stage, data: [{
          value: "draft",
          label: "\u8349\u7A3F (DRAFT)"
        }, {
          value: "internal_review",
          label: "\u5167\u90E8\u5BE9\u6838 (INTERNAL REVIEW)"
        }, {
          value: "sent_to_client",
          label: "\u5DF2\u9001\u51FA\u7D66\u5BA2\u6236 (SENT TO CLIENT)"
        }], required: true }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 151,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", mt: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: close, children: "\u53D6\u6D88" }, void 0, false, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 162,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, false, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 165,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 161,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 146,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 143,
      columnNumber: 29
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.proposals._index.tsx",
    lineNumber: 83,
    columnNumber: 10
  }, this);
}
_s(ProposalListPage, "UYPmu+dFmRBZBhr42o6nmAy+k6s=", false, function() {
  return [useLoaderData, useDisclosure];
});
_c = ProposalListPage;
var _c;
$RefreshReg$(_c, "ProposalListPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProposalListPage as default
};
//# sourceMappingURL=/build/routes/_app.proposals._index-R5YIPVDV.js.map
