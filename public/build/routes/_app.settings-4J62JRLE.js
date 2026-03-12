import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Stack,
  Table,
  Text,
  TextInput,
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

// app/routes/_app.settings.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.settings.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.settings.tsx"
  );
  import.meta.hot.lastModified = "1773305150043.5835";
}
var TAG_GROUPS = [{
  id: "style",
  name: "\u5167\u5BB9\u98A8\u683C",
  tags: ["\u8CEA\u611F", "\u65E5\u5E38", "\u5E7D\u9ED8", "\u5C08\u696D", "\u6EAB\u6696", "\u77E5\u8B58\u578B"]
}, {
  id: "industry",
  name: "\u7522\u696D\u985E\u5225",
  tags: ["\u5BB6\u96FB", "\u7F8E\u599D", "\u98DF\u54C1", "\u65C5\u904A", "\u6BCD\u5B30", "\u79D1\u6280"]
}, {
  id: "platform",
  name: "\u5E73\u53F0\u504F\u597D",
  tags: ["IG", "YouTube", "TikTok", "Facebook", "Threads"]
}];
var PILL_COLORS = ["blue", "teal", "indigo", "grape", "cyan", "lime"];
function SettingsRoute() {
  _s();
  const {
    tab,
    q,
    filteredClients
  } = useLoaderData();
  const [tagGroups, setTagGroups] = (0, import_react2.useState)(() => TAG_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = (0, import_react2.useState)(() => TAG_GROUPS[0]?.id ?? "style");
  const selectedGroup = (0, import_react2.useMemo)(() => tagGroups.find((g) => g.id === selectedGroupId) ?? tagGroups[0], [tagGroups, selectedGroupId]);
  const [categoryModalOpened, setCategoryModalOpened] = (0, import_react2.useState)(false);
  const [categoryModalMode, setCategoryModalMode] = (0, import_react2.useState)("edit");
  const [tagModalOpened, setTagModalOpened] = (0, import_react2.useState)(false);
  const [tagModalMode, setTagModalMode] = (0, import_react2.useState)("add");
  const [activeTagValue, setActiveTagValue] = (0, import_react2.useState)("");
  const [draftCategoryName, setDraftCategoryName] = (0, import_react2.useState)("");
  const [draftTagValue, setDraftTagValue] = (0, import_react2.useState)("");
  const tabStyle = (value) => ({
    padding: "10px 16px",
    borderBottom: tab === value ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
    color: tab === value ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    textDecoration: "none",
    fontWeight: tab === value ? 600 : 500,
    fontSize: 14,
    display: "inline-block",
    transition: "border-color 150ms ease, color 150ms ease"
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "\u7CFB\u7D71\u8A2D\u5B9A" }, void 0, false, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 109,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: "\u7BA1\u7406\u5BA2\u6236\u3001\u6A19\u7C64\u8207\u5176\u4ED6\u7CFB\u7D71\u5F8C\u53F0\u8CC7\u6599\u3002\u53EF\u4F9D\u9700\u6C42\u64F4\u5145\u54C1\u724C\u8207\u6B0A\u9650\u8A2D\u5B9A\u3002" }, void 0, false, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 110,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, radius: "lg", p: 0, style: {
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        borderBottom: "1px solid var(--mantine-color-default-border)",
        background: "var(--mantine-color-body)",
        padding: "0 16px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=clients", style: tabStyle("clients"), children: "\u5BA2\u6236\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 125,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=tags", style: tabStyle("tags"), children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=brands", style: tabStyle("brands"), children: "\u54C1\u724C\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=preferences", style: tabStyle("preferences"), children: "\u7CFB\u7D71\u504F\u597D" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 128,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=roles", style: tabStyle("roles"), children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 119,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { p: "lg", children: [
        tab === "clients" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 2, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u5408\u4F5C\u5BA2\u6236" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 136,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u96C6\u4E2D\u7BA1\u7406\u5BA2\u6236\u54C1\u724C\u8207\u5C08\u6848\u8CC7\u8A0A\uFF0C\u652F\u63F4\u641C\u5C0B\u8207\u5FEB\u901F\u7DAD\u8B77\u3002" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 137,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 135,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert("\u65B0\u589E\u5BA2\u6236\uFF1A\u6B64\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: {
              padding: "8px 16px",
              borderRadius: 4,
              border: "none",
              background: "var(--mantine-color-blue-filled)",
              color: "white",
              cursor: "pointer",
              fontWeight: 500
            }, children: "\u65B0\u589E\u5BA2\u6236" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 140,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 134,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", align: "center", justify: "space-between", wrap: "nowrap", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", action: "/settings", style: {
              flex: 1,
              display: "flex",
              gap: 8
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "tab", value: "clients" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 160,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "q", defaultValue: q, placeholder: "\u641C\u5C0B\u5BA2\u6236\u540D\u7A31\u6216\u54C1\u724C\uFF08\u6309 Enter \u641C\u5C0B\uFF09", style: {
                flex: 1,
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid var(--mantine-color-default-border)",
                background: "var(--mantine-color-body)",
                color: "var(--mantine-color-text)",
                fontSize: 14
              } }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 161,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
                padding: "8px 16px",
                borderRadius: 6,
                border: "none",
                background: "var(--mantine-color-blue-filled)",
                color: "white",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500
              }, children: "\u641C\u5C0B" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 170,
                columnNumber: 19
              }, this),
              q && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=clients", style: {
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid var(--mantine-color-default-border)",
                textDecoration: "none",
                color: "var(--mantine-color-text)",
                fontSize: 14
              }, children: "\u6E05\u9664" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 182,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 155,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert("\u532F\u5165\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: {
                padding: "8px 16px",
                borderRadius: 4,
                border: "1px solid var(--mantine-color-blue-filled)",
                background: "var(--mantine-color-blue-light)",
                color: "var(--mantine-color-blue-filled)",
                cursor: "pointer",
                fontWeight: 500
              }, children: "\u532F\u5165" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 194,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert("\u532F\u51FA\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: {
                padding: "8px 16px",
                borderRadius: 4,
                border: "1px solid var(--mantine-color-blue-filled)",
                background: "var(--mantine-color-blue-light)",
                color: "var(--mantine-color-blue-filled)",
                cursor: "pointer",
                fontWeight: 500
              }, children: "\u532F\u51FA" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 203,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 193,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 153,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { withTableBorder: true, verticalSpacing: "md", mt: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "Logo" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 218,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u5BA2\u6236\u540D\u7A31" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 219,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u7522\u696D\u985E\u5225" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 220,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u95DC\u806F\u54C1\u724C" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 221,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u9032\u884C\u4E2D\u5C08\u6848" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 222,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u64CD\u4F5C" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 223,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 217,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 216,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: [
              filteredClients.map((client) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { radius: "xl", color: "blue", children: client.name.slice(0, 1) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 229,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 228,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: client.name }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 231,
                  columnNumber: 33
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 231,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: client.industry }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 232,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: client.brands.map((brand) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "light", color: "gray", children: brand }, brand, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 235,
                  columnNumber: 55
                }, this)) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 234,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 233,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: "blue", variant: "light", children: [
                  client.activeProjects,
                  " \u4EF6"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 238,
                  columnNumber: 33
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 238,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert(`\u7DE8\u8F2F ${client.name}`), style: {
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: "1px solid var(--mantine-color-blue-filled)",
                    background: "var(--mantine-color-blue-light)",
                    color: "var(--mantine-color-blue-filled)",
                    cursor: "pointer",
                    fontSize: 12
                  }, children: "\u7DE8\u8F2F" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 241,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert(`\u78BA\u5B9A\u8981\u522A\u9664 ${client.name} \u55CE\uFF1F\u6B64\u529F\u80FD\u5EFA\u7F6E\u4E2D`), style: {
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: "1px solid var(--mantine-color-red-filled)",
                    background: "var(--mantine-color-red-light)",
                    color: "var(--mantine-color-red-filled)",
                    cursor: "pointer",
                    fontSize: 12
                  }, children: "\u522A\u9664" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 250,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 240,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 239,
                  columnNumber: 23
                }, this)
              ] }, client.id, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 227,
                columnNumber: 50
              }, this)),
              filteredClients.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { colSpan: 6, align: "center", style: {
                padding: "32px 0",
                color: "var(--mantine-color-dimmed)"
              }, children: "\u627E\u4E0D\u5230\u7B26\u5408\u689D\u4EF6\u7684\u5BA2\u6236" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 263,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 262,
                columnNumber: 52
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 226,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 215,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 133,
          columnNumber: 33
        }, this),
        tab === "tags" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 2, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 277,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u5EFA\u7ACB\u4E00\u81F4\u7684\u6A19\u7C64\u5206\u985E\uFF0C\u63D0\u5347 KOL \u641C\u5C0B\u8207\u7BE9\u9078\u6548\u7387\u3002" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 278,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 276,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
              setTagModalMode("add");
              setDraftTagValue("");
              setTagModalOpened(true);
            }, style: {
              padding: "8px 16px",
              borderRadius: 4,
              border: "1px solid var(--mantine-color-blue-filled)",
              background: "var(--mantine-color-blue-light)",
              color: "var(--mantine-color-blue-filled)",
              cursor: "pointer",
              fontWeight: 500
            }, children: "\u65B0\u589E\u6A19\u7C64" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 280,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 275,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, { my: "md" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
              base: 12,
              md: 4
            }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "sm", c: "dimmed", children: "\u6A19\u7C64\u5206\u985E" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 305,
                columnNumber: 21
              }, this),
              tagGroups.map((group) => {
                const active = group.id === selectedGroupId;
                return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, radius: "md", p: "sm", role: "button", tabIndex: 0, onClick: () => setSelectedGroupId(group.id), onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedGroupId(group.id);
                  }
                }, style: {
                  cursor: "pointer",
                  background: active ? "var(--mantine-color-blue-light)" : "var(--mantine-color-body)",
                  borderColor: active ? "var(--mantine-color-blue-4)" : "var(--mantine-color-default-border)"
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: group.name }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 318,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                    group.tags.length,
                    " \u500B\u6A19\u7C64"
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 319,
                    columnNumber: 25
                  }, this)
                ] }, group.id, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 308,
                  columnNumber: 26
                }, this);
              })
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 304,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 300,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
              base: 12,
              md: 8
            }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: selectedGroup?.name ?? "-" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 330,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
                    setCategoryModalMode("edit");
                    setDraftCategoryName(selectedGroup?.name ?? "");
                    setCategoryModalOpened(true);
                  }, style: {
                    padding: "4px 12px",
                    borderRadius: 4,
                    border: "1px solid var(--mantine-color-blue-filled)",
                    background: "var(--mantine-color-blue-light)",
                    color: "var(--mantine-color-blue-filled)",
                    cursor: "pointer",
                    fontSize: 13
                  }, children: "\u7DE8\u8F2F\u5206\u985E" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 332,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
                    setCategoryModalMode("delete");
                    setCategoryModalOpened(true);
                  }, style: {
                    padding: "4px 12px",
                    borderRadius: 4,
                    border: "1px solid var(--mantine-color-red-filled)",
                    background: "var(--mantine-color-red-light)",
                    color: "var(--mantine-color-red-filled)",
                    cursor: "pointer",
                    fontSize: 13
                  }, children: "\u522A\u9664\u5206\u985E" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 347,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 331,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 329,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: (selectedGroup?.tags ?? []).map((tag, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: PILL_COLORS[index % PILL_COLORS.length], variant: "light", size: "lg", style: {
                cursor: "pointer"
              }, onClick: () => {
                setActiveTagValue(tag);
                setTagModalMode("edit");
                setDraftTagValue(tag);
                setTagModalOpened(true);
              }, children: [
                tag,
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
                  marginLeft: 6,
                  fontSize: 10,
                  opacity: 0.7
                }, children: "\u2715" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 372,
                  columnNumber: 33
                }, this)
              ] }, tag, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 364,
                columnNumber: 72
              }, this)) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 363,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, radius: "md", p: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u9EDE\u64CA\u6A19\u7C64\u5373\u53EF\u5FEB\u901F\u7DE8\u8F2F\u6216\u522A\u9664\uFF0C\u5EFA\u7ACB\u4E00\u81F4\u7684\u7BE9\u9078\u6A19\u6E96\u3002" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 380,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 379,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 328,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 324,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 299,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { id: "settings-tag-category-modal", opened: categoryModalOpened, onClose: () => setCategoryModalOpened(false), title: categoryModalMode === "edit" ? "\u7DE8\u8F2F\u5206\u985E" : "\u522A\u9664\u5206\u985E", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: categoryModalMode === "edit" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5206\u985E\u540D\u7A31", value: draftCategoryName, onChange: (e) => setDraftCategoryName(e.currentTarget.value) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 390,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", onClick: () => setCategoryModalOpened(false), children: "\u53D6\u6D88" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 392,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", onClick: () => {
                const name = draftCategoryName.trim();
                if (!name || !selectedGroup)
                  return;
                setTagGroups((prev) => prev.map((g) => g.id === selectedGroup.id ? {
                  ...g,
                  name
                } : g));
                setCategoryModalOpened(false);
              }, children: "\u5132\u5B58" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 395,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 391,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 389,
            columnNumber: 51
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
              "\u78BA\u5B9A\u8981\u522A\u9664\u5206\u985E\u300C",
              selectedGroup?.name,
              "\u300D\u55CE\uFF1F\uFF08\u6B64\u64CD\u4F5C\u6703\u540C\u6642\u79FB\u9664\u8A72\u5206\u985E\u4E0B\u7684\u6240\u6709\u6A19\u7C64\uFF09"
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 408,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", onClick: () => setCategoryModalOpened(false), children: "\u53D6\u6D88" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 412,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", color: "red", onClick: () => {
                if (!selectedGroup)
                  return;
                setTagGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
                const fallback = tagGroups.find((g) => g.id !== selectedGroup.id)?.id;
                setSelectedGroupId(fallback ?? "");
                setCategoryModalOpened(false);
              }, children: "\u78BA\u8A8D\u522A\u9664" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 415,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 411,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 407,
            columnNumber: 27
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 388,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 387,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { id: "settings-tag-modal", opened: tagModalOpened, onClose: () => setTagModalOpened(false), title: tagModalMode === "add" ? "\u65B0\u589E\u6A19\u7C64" : tagModalMode === "edit" ? "\u7DE8\u8F2F\u6A19\u7C64" : "\u522A\u9664\u6A19\u7C64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
            (tagModalMode === "add" || tagModalMode === "edit") && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u6A19\u7C64\u540D\u7A31", value: draftTagValue, onChange: (e) => setDraftTagValue(e.currentTarget.value) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 432,
              columnNumber: 75
            }, this),
            tagModalMode === "delete" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
              "\u78BA\u5B9A\u8981\u522A\u9664\u6A19\u7C64\u300C",
              activeTagValue,
              "\u300D\u55CE\uFF1F"
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 433,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
              tagModalMode === "edit" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "light", color: "red", onClick: () => {
                setTagModalMode("delete");
              }, children: "\u522A\u9664" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 436,
                columnNumber: 49
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "default", onClick: () => setTagModalOpened(false), children: "\u53D6\u6D88" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 441,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", onClick: () => {
                const v = draftTagValue.trim();
                if (!selectedGroup)
                  return;
                if (tagModalMode === "add") {
                  if (!v)
                    return;
                  setTagGroups((prev) => prev.map((g) => g.id === selectedGroup.id && !g.tags.includes(v) ? {
                    ...g,
                    tags: [...g.tags, v]
                  } : g));
                  setTagModalOpened(false);
                  return;
                }
                if (tagModalMode === "edit") {
                  if (!v)
                    return;
                  setTagGroups((prev) => prev.map((g) => g.id === selectedGroup.id ? {
                    ...g,
                    tags: g.tags.map((t) => t === activeTagValue ? v : t)
                  } : g));
                  setActiveTagValue(v);
                  setTagModalOpened(false);
                  return;
                }
                if (tagModalMode === "delete") {
                  setTagGroups((prev) => prev.map((g) => g.id === selectedGroup.id ? {
                    ...g,
                    tags: g.tags.filter((t) => t !== activeTagValue)
                  } : g));
                  setTagModalOpened(false);
                }
              }, children: tagModalMode === "delete" ? "\u78BA\u8A8D\u522A\u9664" : "\u5132\u5B58" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 444,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 435,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 431,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 430,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 274,
          columnNumber: 30
        }, this),
        tab === "brands" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u54C1\u724C\u7BA1\u7406" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 482,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mt: "xs", children: "\u9810\u7559\u54C1\u724C\u4E3B\u6A94\u8207\u54C1\u724C\u5C0D\u61C9\u908F\u8F2F\u7684\u7BA1\u7406\u7A7A\u9593\u3002" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 483,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert("\u65B0\u589E\u54C1\u724C\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: {
            marginTop: 16,
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid var(--mantine-color-blue-filled)",
            background: "var(--mantine-color-blue-light)",
            color: "var(--mantine-color-blue-filled)",
            cursor: "pointer",
            fontWeight: 500
          }, children: "\u65B0\u589E\u54C1\u724C" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 484,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 481,
          columnNumber: 32
        }, this),
        tab === "preferences" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u7CFB\u7D71\u504F\u597D" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 497,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mt: "xs", children: "\u9810\u7559\u7CFB\u7D71\u53C3\u6578\u3001\u901A\u77E5\u3001AI \u8A2D\u5B9A\u7B49\u504F\u597D\u7BA1\u7406\u7A7A\u9593\u3002" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 498,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert("\u7DE8\u8F2F\u504F\u597D\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: {
            marginTop: 16,
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid var(--mantine-color-blue-filled)",
            background: "var(--mantine-color-blue-light)",
            color: "var(--mantine-color-blue-filled)",
            cursor: "pointer",
            fontWeight: 500
          }, children: "\u7DE8\u8F2F\u504F\u597D" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 499,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 496,
          columnNumber: 37
        }, this),
        tab === "roles" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 512,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", mt: "xs", children: "\u9810\u7559\u89D2\u8272\u3001\u6B0A\u9650\u8207\u6210\u54E1\u6307\u6D3E\u7684\u7BA1\u7406\u7A7A\u9593\u3002" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 513,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => alert("\u65B0\u589E\u89D2\u8272\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: {
            marginTop: 16,
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid var(--mantine-color-blue-filled)",
            background: "var(--mantine-color-blue-light)",
            color: "var(--mantine-color-blue-filled)",
            cursor: "pointer",
            fontWeight: 500
          }, children: "\u65B0\u589E\u89D2\u8272" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 514,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 511,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.settings.tsx",
    lineNumber: 107,
    columnNumber: 10
  }, this);
}
_s(SettingsRoute, "CFw60eeeH+WQzhvcAi5jsD3BIlM=", false, function() {
  return [useLoaderData];
});
_c = SettingsRoute;
var _c;
$RefreshReg$(_c, "SettingsRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  SettingsRoute as default
};
//# sourceMappingURL=/build/routes/_app.settings-4J62JRLE.js.map
