import {
  IconCheck,
  IconPencil,
  IconPlus,
  IconTrash,
  IconX
} from "/build/_shared/chunk-ZHSZHK33.js";
import "/build/_shared/chunk-NNH5CGJ5.js";
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
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from "/build/_shared/chunk-EK4DUNM5.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useLoaderData,
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
  import.meta.hot.lastModified = "1774495294977.0771";
}
var PILL_COLORS = ["blue", "cyan", "grape", "indigo", "violet", "teal"];
var EDITABLE_TAG_GROUP = "tags";
var GROUP_OPTIONS = ["AE", "KOL", "Tech", "Media", "\u5176\u4ED6"];
function SettingsRoute() {
  _s();
  const submit = useSubmit();
  const {
    tab,
    q,
    filteredBrands,
    tagGroups,
    teamMembers,
    currentUserRole
  } = useLoaderData();
  const [selectedGroupId, setSelectedGroupId] = (0, import_react2.useState)(() => tagGroups[0]?.id ?? EDITABLE_TAG_GROUP);
  const selectedGroup = (0, import_react2.useMemo)(() => tagGroups.find((g) => g.id === selectedGroupId) ?? tagGroups[0], [tagGroups, selectedGroupId]);
  const [isEditingTags, setIsEditingTags] = (0, import_react2.useState)(false);
  const [newTagValue, setNewTagValue] = (0, import_react2.useState)("");
  const [tagModalOpened, setTagModalOpened] = (0, import_react2.useState)(false);
  const [tagModalMode, setTagModalMode] = (0, import_react2.useState)("add");
  const [activeTagValue, setActiveTagValue] = (0, import_react2.useState)("");
  const [draftTagValue, setDraftTagValue] = (0, import_react2.useState)("");
  const [brandModalOpened, setBrandModalOpened] = (0, import_react2.useState)(false);
  const [activeBrand, setActiveBrand] = (0, import_react2.useState)(null);
  const [memberModalOpened, setMemberModalOpened] = (0, import_react2.useState)(false);
  const [activeMember, setActiveMember] = (0, import_react2.useState)(null);
  const [groupFilter, setGroupFilter] = (0, import_react2.useState)("all");
  const isAdmin = currentUserRole === "admin";
  const groupOrder = {
    AE: 1,
    KOL: 2,
    Tech: 3,
    Media: 4,
    \u5176\u4ED6: 5
  };
  const filteredMembers = teamMembers.filter((m) => groupFilter === "all" ? true : m.group === groupFilter).sort((a, b) => {
    const orderDiff = (groupOrder[a.group] ?? 9) - (groupOrder[b.group] ?? 9);
    if (orderDiff !== 0)
      return orderDiff;
    return a.name.localeCompare(b.name, "zh-Hant");
  });
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
        lineNumber: 317,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: "\u7BA1\u7406\u54C1\u724C\u3001\u6A19\u7C64\u3001\u6B0A\u9650\u8207\u7CFB\u7D71\u504F\u597D\u8A2D\u5B9A\u3002\u5404\u5206\u9801\u5C07\u81EA\u52D5\u8207\u76EE\u524D\u8CC7\u6599\u540C\u6B65\u66F4\u65B0\u3002" }, void 0, false, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 318,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 316,
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
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=clients", style: tabStyle("clients"), children: "\u54C1\u724C\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 332,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=tags", style: tabStyle("tags"), children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 335,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings?tab=roles", style: tabStyle("roles"), children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 338,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 326,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { p: "lg", children: [
        tab === "clients" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 2, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u54C1\u724C\u7BA1\u7406" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 347,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u96C6\u4E2D\u7BA1\u7406\u54C1\u724C\u8207\u5BA2\u6236\u8CC7\u8A0A\uFF0C\u652F\u63F4\u7DE8\u8F2F\u8207\u5FEB\u901F\u7DAD\u8B77\u3002" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 348,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 346,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { leftSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconPlus, { size: 16 }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 352,
              columnNumber: 38
            }, this), onClick: () => {
              setActiveBrand(null);
              setBrandModalOpened(true);
            }, children: "\u65B0\u589E\u54C1\u724C" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 352,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 345,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", align: "center", justify: "space-between", wrap: "nowrap", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "get", action: "/settings", style: {
              flex: 1,
              display: "flex",
              gap: 8
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "tab", value: "clients" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 366,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "q", defaultValue: q, placeholder: "\u641C\u5C0B\u54C1\u724C\u540D\u7A31\uFF08\u6309 Enter \u641C\u5C0B\uFF09", style: {
                flex: 1
              } }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 367,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", children: "\u641C\u5C0B" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 370,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 361,
              columnNumber: 17
            }, this),
            q && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", component: Link, to: "/settings?tab=clients", children: "\u6E05\u9664" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 372,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 360,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, { h: 500, offsetScrollbars: true, mt: "lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { withTableBorder: true, verticalSpacing: "md", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { w: 80, children: "Logo" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 381,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u54C1\u724C\u540D\u7A31" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 382,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { w: 150, children: "\u6D3B\u52D5\u5C08\u6848\u6578" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 383,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { w: 120, children: "\u64CD\u4F5C" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 384,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 380,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 379,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: [
              filteredBrands.map((brand) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { radius: "xl", color: "blue", children: brand.name.slice(0, 1).toUpperCase() }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 390,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 389,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: brand.name }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 395,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 394,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "light", color: "gray", children: [
                  brand.activeProjects,
                  " \u500B\u5C08\u6848"
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 398,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 397,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "blue", onClick: () => {
                    setActiveBrand({
                      id: brand.id,
                      name: brand.name
                    });
                    setBrandModalOpened(true);
                  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconPencil, { size: 14 }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 409,
                    columnNumber: 31
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 402,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: (e) => {
                    if (!window.confirm(`\u78BA\u5B9A\u8981\u522A\u9664\u54C1\u724C\u300C${brand.name}\u300D\u55CE\uFF1F`))
                      e.preventDefault();
                  }, children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "brand.delete" }, void 0, false, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 414,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: brand.id }, void 0, false, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 415,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "red", type: "submit", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTrash, { size: 14 }, void 0, false, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 417,
                      columnNumber: 33
                    }, this) }, void 0, false, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 416,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 411,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 401,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 400,
                  columnNumber: 25
                }, this)
              ] }, brand.id, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 388,
                columnNumber: 50
              }, this)),
              filteredBrands.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { colSpan: 4, align: "center", style: {
                padding: "32px 0",
                color: "var(--mantine-color-dimmed)"
              }, children: "\u627E\u4E0D\u5230\u7B26\u5408\u689D\u4EF6\u7684\u54C1\u724C" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 424,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 423,
                columnNumber: 53
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 387,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 378,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 377,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: brandModalOpened, onClose: () => setBrandModalOpened(false), title: activeBrand ? "\u7DE8\u8F2F\u54C1\u724C" : "\u65B0\u589E\u54C1\u724C", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: () => setBrandModalOpened(false), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: activeBrand ? "brand.edit" : "brand.add" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 437,
              columnNumber: 19
            }, this),
            activeBrand && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: activeBrand.id }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 438,
              columnNumber: 35
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u54C1\u724C\u540D\u7A31", name: "name", defaultValue: activeBrand?.name || "", placeholder: "\u4F8B\u5982\uFF1APanasonic", required: true }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 440,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: () => setBrandModalOpened(false), children: "\u53D6\u6D88" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 442,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", children: "\u5132\u5B58" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 443,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 441,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 439,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 436,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 435,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 344,
          columnNumber: 33
        }, this),
        tab === "tags" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 2, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 453,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u5167\u5BB9\u6A19\u7C64\u3001\u7522\u696D\u8207\u5E73\u53F0\u6703\u81EA\u52D5\u8207 KOL \u8CC7\u6599\u540C\u6B65\u66F4\u65B0\u3002\u7CFB\u7D71\u504F\u597D\u5DF2\u79FB\u9664\u3002" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 454,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 452,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: isEditingTags ? "filled" : "light", color: isEditingTags ? "blue" : "blue", leftSection: isEditingTags ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconCheck, { size: 16 }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 458,
              columnNumber: 139
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconPencil, { size: 16 }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 458,
              columnNumber: 165
            }, this), onClick: () => setIsEditingTags(!isEditingTags), children: isEditingTags ? "\u5B8C\u6210\u7DE8\u8F2F" : "\u7DE8\u8F2F" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 458,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 451,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, { my: "md" }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 463,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
              base: 12,
              md: 4
            }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xs", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, size: "sm", c: "dimmed", children: "\u6A19\u7C64\u5206\u985E" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 471,
                columnNumber: 21
              }, this),
              tagGroups.map((group) => {
                const active = group.id === selectedGroupId;
                return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, radius: "md", p: "sm", onClick: () => setSelectedGroupId(group.id), style: {
                  cursor: "pointer",
                  background: active ? "var(--mantine-color-blue-light)" : "var(--mantine-color-body)"
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: group.name }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 480,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
                    group.tags.length,
                    " \u9805"
                  ] }, void 0, true, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 481,
                    columnNumber: 27
                  }, this)
                ] }, group.id, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 476,
                  columnNumber: 26
                }, this);
              })
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 470,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 466,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid.Col, { span: {
              base: 12,
              md: 8
            }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: selectedGroup?.name ?? "-" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 494,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: selectedGroup?.description }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 495,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 493,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: (selectedGroup?.tags ?? []).map((tag, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 4, wrap: "nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { color: PILL_COLORS[index % PILL_COLORS.length], variant: "light", size: "lg", rightSection: isEditingTags && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { size: "xs", color: "red", variant: "transparent", onClick: () => {
                if (window.confirm(`\u78BA\u5B9A\u8981\u522A\u9664\u6A19\u7C64\u300C${tag}\u300D\u55CE\uFF1F`)) {
                  const formData = new FormData();
                  formData.append("intent", "tag.delete");
                  formData.append("groupId", selectedGroupId);
                  formData.append("name", tag);
                  submit(formData, {
                    method: "post"
                  });
                }
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconX, { size: 12 }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 512,
                columnNumber: 33
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 501,
                columnNumber: 139
              }, this), children: tag }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 501,
                columnNumber: 27
              }, this) }, tag, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 500,
                columnNumber: 72
              }, this)) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 499,
                columnNumber: 21
              }, this),
              isEditingTags && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { mt: "md", p: "md", style: {
                border: "1px dashed var(--mantine-color-blue-4)",
                borderRadius: "8px"
              }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, mb: "xs", children: "\u65B0\u589E\u65B0\u6A19\u7C64\uFF1A" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 522,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { placeholder: "\u8F38\u5165\u65B0\u6A19\u7C64\u540D\u7A31", value: newTagValue, onChange: (e) => setNewTagValue(e.currentTarget.value), onKeyDown: (e) => {
                    if (e.key === "Enter" && newTagValue.trim()) {
                      const formData = new FormData();
                      formData.append("intent", "tag.add");
                      formData.append("groupId", selectedGroupId);
                      formData.append("name", newTagValue.trim());
                      submit(formData, {
                        method: "post"
                      });
                      setNewTagValue("");
                    }
                  }, style: {
                    flex: 1
                  } }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 524,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { onClick: () => {
                    if (newTagValue.trim()) {
                      const formData = new FormData();
                      formData.append("intent", "tag.add");
                      formData.append("groupId", selectedGroupId);
                      formData.append("name", newTagValue.trim());
                      submit(formData, {
                        method: "post"
                      });
                      setNewTagValue("");
                    }
                  }, disabled: !newTagValue.trim(), children: "\u65B0\u589E" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 538,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 523,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 518,
                columnNumber: 39
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 492,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 488,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 465,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: tagModalOpened, onClose: () => setTagModalOpened(false), title: tagModalMode === "add" ? "\u65B0\u589E\u6A19\u7C64" : tagModalMode === "edit" ? "\u7DE8\u8F2F\u6A19\u7C64" : "\u522A\u9664\u6A19\u7C64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: () => setTagModalOpened(false), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: `tag.${tagModalMode}` }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 561,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "groupId", value: selectedGroupId }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 562,
              columnNumber: 21
            }, this),
            tagModalMode === "edit" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "oldName", value: activeTagValue }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 563,
              columnNumber: 49
            }, this),
            tagModalMode === "delete" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "name", value: activeTagValue }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 564,
              columnNumber: 51
            }, this),
            (tagModalMode === "add" || tagModalMode === "edit") && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u6A19\u7C64\u540D\u7A31", name: tagModalMode === "add" ? "name" : "newName", value: draftTagValue, onChange: (e) => setDraftTagValue(e.currentTarget.value), required: true }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 565,
              columnNumber: 77
            }, this),
            tagModalMode === "delete" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
              "\u78BA\u5B9A\u8981\u522A\u9664\u6A19\u7C64\u300C",
              activeTagValue,
              "\u300D\u55CE\uFF1F\u76F8\u95DC KOL \u7684\u8CC7\u6599\u4E5F\u5C07\u540C\u6B65\u6E05\u9664\u3002"
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 566,
              columnNumber: 51
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
              tagModalMode === "edit" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", variant: "light", color: "red", onClick: () => setTagModalMode("delete"), children: "\u522A\u9664" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 569,
                columnNumber: 51
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: () => setTagModalOpened(false), children: "\u53D6\u6D88" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 572,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", color: tagModalMode === "delete" ? "red" : "blue", children: tagModalMode === "delete" ? "\u78BA\u8A8D\u522A\u9664" : "\u5132\u5B58" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 575,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 568,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 560,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 559,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 558,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 450,
          columnNumber: 30
        }, this),
        tab === "roles" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 2, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 587,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: "\u7BA1\u7406\u5718\u968A\u6210\u54E1\u3002\u9EDE\u64CA\u925B\u7B46\u9032\u884C\u7DE8\u8F2F\uFF0C\u63D0\u4EA4\u5F8C\u81EA\u52D5\u95DC\u9589\u8996\u7A97\u3002" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 588,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 586,
              columnNumber: 17
            }, this),
            isAdmin && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { leftSection: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconPlus, { size: 16 }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 592,
              columnNumber: 50
            }, this), onClick: () => {
              setActiveMember(null);
              setMemberModalOpened(true);
            }, children: "\u65B0\u589E\u6210\u54E1" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 592,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 585,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", align: "center", justify: "space-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, children: "\u7D44\u5225\u7BE9\u9078" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 602,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { value: groupFilter, onChange: (e) => setGroupFilter(e.target.value), style: {
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid var(--mantine-color-default-border)",
              background: "var(--mantine-color-body)"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "\u5168\u90E8" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 609,
                columnNumber: 21
              }, this),
              GROUP_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: opt, children: [
                opt,
                " \u7D44"
              ] }, opt, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 610,
                columnNumber: 47
              }, this))
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 603,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 601,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 600,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, { h: 500, offsetScrollbars: true, mt: "lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { withTableBorder: true, verticalSpacing: "md", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u6210\u54E1" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 619,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "Email" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 620,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u7D44\u5225" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 621,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u89D2\u8272" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 622,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { w: 120, children: "\u64CD\u4F5C" }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 623,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 618,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 617,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: filteredMembers.map((member) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: member.name }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 628,
                columnNumber: 35
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 628,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: member.email }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 629,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "light", children: [
                member.group,
                " \u7D44"
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 630,
                columnNumber: 35
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 630,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "outline", color: member.role === "admin" ? "red" : "gray", children: member.role.toUpperCase() }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 632,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 631,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: isAdmin && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "blue", onClick: () => {
                  setActiveMember(member);
                  setMemberModalOpened(true);
                }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconPencil, { size: 14 }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 642,
                  columnNumber: 33
                }, this) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 638,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: (e) => {
                  if (!window.confirm(`\u78BA\u5B9A\u8981\u522A\u9664\u6210\u54E1\u300C${member.name}\u300D\u55CE\uFF1F`))
                    e.preventDefault();
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "member.delete" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 647,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: member.id }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 648,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionIcon, { variant: "light", color: "red", type: "submit", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconTrash, { size: 14 }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 650,
                    columnNumber: 35
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 649,
                    columnNumber: 33
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 644,
                  columnNumber: 31
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 637,
                columnNumber: 39
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 636,
                columnNumber: 25
              }, this)
            ] }, member.id, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 627,
              columnNumber: 52
            }, this)) }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 626,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 616,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 615,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { opened: memberModalOpened, onClose: () => setMemberModalOpened(false), title: activeMember ? "\u7DE8\u8F2F\u6210\u54E1" : "\u65B0\u589E\u6210\u54E1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: () => setMemberModalOpened(false), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: activeMember ? "member.update" : "member.add" }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 662,
              columnNumber: 19
            }, this),
            activeMember && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: activeMember.id }, void 0, false, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 663,
              columnNumber: 36
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "name", label: "\u59D3\u540D", defaultValue: activeMember?.name || "", placeholder: "\u8F38\u5165\u59D3\u540D", required: true }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 665,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "email", label: "Email", defaultValue: activeMember?.email || "", placeholder: "name@example.com", required: true }, void 0, false, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 666,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u7D44\u5225" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 668,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "group", defaultValue: activeMember?.group || "AE", style: {
                  padding: "8px",
                  borderRadius: 4,
                  border: "1px solid #ccc"
                }, children: GROUP_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: opt, children: [
                  opt,
                  " \u7D44"
                ] }, opt, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 674,
                  columnNumber: 51
                }, this)) }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 669,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 667,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u89D2\u8272" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 678,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "role", defaultValue: activeMember?.role || "member", style: {
                  padding: "8px",
                  borderRadius: 4,
                  border: "1px solid #ccc"
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "admin", children: "Admin" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 684,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "manager", children: "Manager" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 685,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "member", children: "Member" }, void 0, false, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 686,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 679,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 677,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "flex-end", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: () => setMemberModalOpened(false), children: "\u53D6\u6D88" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 690,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", children: activeMember ? "\u5132\u5B58" : "\u65B0\u589E" }, void 0, false, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 691,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 689,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 664,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 661,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 660,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 584,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 343,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 323,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.settings.tsx",
    lineNumber: 315,
    columnNumber: 10
  }, this);
}
_s(SettingsRoute, "5YaXrSIIksk+RKVyrriMQrc27/E=", false, function() {
  return [useSubmit, useLoaderData];
});
_c = SettingsRoute;
var _c;
$RefreshReg$(_c, "SettingsRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  SettingsRoute as default
};
//# sourceMappingURL=/build/routes/_app.settings-XKNBR6ZC.js.map
