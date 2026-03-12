import "/build/_shared/chunk-HTRQC2VH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Button,
  Card,
  Group,
  Stack,
  Table,
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
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-YEIDLYOX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_app.proposals._index.tsx
var import_node = __toESM(require_node(), 1);
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
  import.meta.hot.lastModified = "1772783580107.4175";
}
function ProposalListPage() {
  _s();
  const {
    proposals
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u63D0\u6848\u4E00\u89BD\u9801" }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/proposals/new", children: "\u65B0\u589E\u63D0\u6848" }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { striped: true, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u6A19\u984C" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 49,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u5BA2\u6236" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 50,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u968E\u6BB5" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u9810\u7B97" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u622A\u6B62\u65E5" }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 53,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 48,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: proposals.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/proposals/${p.id}`, children: p.title }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 59,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 58,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: p.clientName }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 61,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: p.stage }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 62,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: p.budget.toLocaleString() }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 63,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: p.dueDate }, void 0, false, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 64,
          columnNumber: 17
        }, this)
      ] }, p.id, true, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 57,
        columnNumber: 33
      }, this)) }, void 0, false, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 56,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "\u5047\u8CC7\u6599\u4F86\u6E90\uFF1Ajson-server" }, void 0, false, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.proposals._index.tsx",
    lineNumber: 37,
    columnNumber: 10
  }, this);
}
_s(ProposalListPage, "XnRHskZuWCXgTj3OkPA2/lsHAog=", false, function() {
  return [useLoaderData];
});
_c = ProposalListPage;
var _c;
$RefreshReg$(_c, "ProposalListPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProposalListPage as default
};
//# sourceMappingURL=/build/routes/_app.proposals._index-KAUMFGCV.js.map
