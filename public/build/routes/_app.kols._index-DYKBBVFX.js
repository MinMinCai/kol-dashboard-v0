import "/build/_shared/chunk-HTRQC2VH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title
} from "/build/_shared/chunk-62B2IAZI.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
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

// app/routes/_app.kols._index.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.kols._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.kols._index.tsx"
  );
  import.meta.hot.lastModified = "1773220463226.276";
}
var FOLLOWER_RANGES = [{
  key: "1000",
  label: "1,000+",
  min: 1e3
}, {
  key: "5000",
  label: "5,000+",
  min: 5e3
}, {
  key: "10000",
  label: "10K+",
  min: 1e4
}, {
  key: "50000",
  label: "50K+",
  min: 5e4
}, {
  key: "100000",
  label: "100K+",
  min: 1e5
}];
function getPrimaryTags(kol) {
  if (kol.tags && kol.tags.length > 0)
    return kol.tags;
  return kol.categories ?? [];
}
function buildUrl(base, overrides) {
  const out = new URLSearchParams();
  for (const [k, v] of Object.entries(base)) {
    if (Array.isArray(v))
      v.forEach((val) => out.append(k, val));
    else if (v)
      out.set(k, v);
  }
  for (const [k, v] of Object.entries(overrides)) {
    out.delete(k);
    if (v !== null) {
      if (Array.isArray(v))
        v.forEach((val) => out.append(k, val));
      else if (v)
        out.set(k, v);
    }
  }
  out.delete("page");
  return `?${out.toString()}`;
}
function KolListPage() {
  _s();
  const {
    pageRows,
    total,
    totalPages,
    page,
    view,
    sortKey,
    sortOrder,
    showFilters,
    followerRanges,
    industries,
    tags,
    minRating,
    maxRating,
    q,
    allIndustries,
    allTags,
    activeFilterCount,
    deleted
  } = useLoaderData();
  const current = {
    ...deleted ? {
      deleted: "1"
    } : {},
    ...q ? {
      q
    } : {},
    view,
    sort: sortKey,
    order: sortOrder,
    ...followerRanges.length ? {
      fr: followerRanges
    } : {},
    ...industries.length ? {
      ind: industries
    } : {},
    ...tags.length ? {
      tag: tags
    } : {},
    ...minRating > 0 ? {
      minRating: String(minRating)
    } : {},
    ...maxRating < 5 ? {
      maxRating: String(maxRating)
    } : {},
    ...showFilters ? {
      panel: "filters"
    } : {}
  };
  function sortUrl(key) {
    const nextOrder = key === sortKey ? sortOrder === "asc" ? "desc" : "asc" : "desc";
    return buildUrl(current, {
      sort: key,
      order: nextOrder
    });
  }
  function sortLabel(key) {
    if (key !== sortKey)
      return "";
    return sortOrder === "asc" ? " \u2191" : " \u2193";
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
      __html: `
document.addEventListener('submit', function(e) {
  var form = e.target;
  if (!form || !form.getAttribute) return;
  var msg = form.getAttribute('data-confirm');
  if (!msg) return;
  if (!window.confirm(msg)) {
    e.preventDefault();
  }
});
          `
    } }, void 0, false, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 286,
      columnNumber: 7
    }, this),
    deleted && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "green", variant: "light", children: [
      "KOL \u5DF2\u522A\u9664\u6210\u529F\u3002",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: buildUrl(current, {
        deleted: null
      }), style: {
        marginLeft: 12,
        color: "var(--mantine-color-green-filled)",
        textDecoration: "none",
        fontWeight: 600
      }, children: "\u95DC\u9589" }, void 0, false, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 301,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 299,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-end", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: "KOL \u7BA1\u7406" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 316,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 2, children: "KOL \u4E00\u89BD" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 317,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 315,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "md", align: "flex-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 0, style: {
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 6,
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: buildUrl(current, {
            view: "card"
          }), style: {
            padding: "7px 18px",
            background: view === "card" ? "var(--mantine-color-blue-filled)" : "transparent",
            color: view === "card" ? "#fff" : "var(--mantine-color-text)",
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
            display: "inline-block",
            borderRight: "1px solid var(--mantine-color-default-border)"
          }, children: "\u5361\u7247" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 326,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: buildUrl(current, {
            view: "table"
          }), style: {
            padding: "7px 18px",
            background: view === "table" ? "var(--mantine-color-blue-filled)" : "transparent",
            color: view === "table" ? "#fff" : "var(--mantine-color-text)",
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
            display: "inline-block"
          }, children: "\u8868\u683C" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 338,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 321,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid var(--mantine-color-blue-filled)",
            background: "var(--mantine-color-blue-light)",
            color: "var(--mantine-color-blue-filled)",
            cursor: "pointer",
            fontWeight: 500
          }, onClick: () => {
            const dlg = document.getElementById("kol-batch-import-dialog");
            if (dlg)
              dlg.showModal();
          }, children: "\u{1F4E5} \u6279\u91CF\u532F\u5165" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 352,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/kols/new", children: "\u65B0\u589E KOL" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 366,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 351,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 320,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 314,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", align: "flex-end", wrap: "nowrap", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", action: "/kols", style: {
        flex: 1,
        maxWidth: 520,
        display: "flex",
        gap: 8
      }, children: [
        view !== "card" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "view", value: view }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 384,
          columnNumber: 31
        }, this),
        sortKey !== "followers" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "sort", value: sortKey }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 385,
          columnNumber: 39
        }, this),
        sortOrder !== "desc" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "order", value: sortOrder }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 386,
          columnNumber: 36
        }, this),
        showFilters && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "panel", value: "filters" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 387,
          columnNumber: 27
        }, this),
        followerRanges.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "fr", value: r }, r, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 388,
          columnNumber: 36
        }, this)),
        industries.map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "ind", value: i }, i, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 389,
          columnNumber: 32
        }, this)),
        tags.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "tag", value: t }, t, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 390,
          columnNumber: 26
        }, this)),
        minRating > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "minRating", value: String(minRating) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 391,
          columnNumber: 29
        }, this),
        maxRating < 5 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "maxRating", value: String(maxRating) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 392,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "q", defaultValue: q, placeholder: "\u641C\u5C0B KOL \u540D\u7A31\u3001@\u5E33\u865F\u3001\u7522\u696D\u6216\u6A19\u7C64\uFF08\u6309 Enter \u641C\u5C0B\uFF09", style: {
          flex: 1,
          padding: "8px 12px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 6,
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          fontSize: 14
        } }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 394,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
          padding: "8px 16px",
          background: "var(--mantine-color-blue-filled)",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500
        }, children: "\u641C\u5C0B" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 403,
          columnNumber: 11
        }, this),
        q && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: buildUrl(current, {
          q: null
        }), style: {
          padding: "8px 14px",
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: 6,
          textDecoration: "none",
          color: "var(--mantine-color-text)",
          fontSize: 14
        }, children: "\u2715" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 413,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 377,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: buildUrl(current, {
        panel: showFilters ? null : "filters"
      }), style: {
        padding: "8px 16px",
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: 6,
        textDecoration: "none",
        color: activeFilterCount > 0 ? "#fff" : "var(--mantine-color-text)",
        background: activeFilterCount > 0 ? "var(--mantine-color-blue-filled)" : "transparent",
        fontSize: 14,
        fontWeight: 500,
        whiteSpace: "nowrap"
      }, children: [
        "\u2699 \u7BE9\u9078",
        activeFilterCount > 0 ? ` (${activeFilterCount})` : ""
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 426,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 372,
      columnNumber: 7
    }, this),
    showFilters && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, mb: "md", children: "\u7BE9\u9078\u689D\u4EF6" }, void 0, false, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 445,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "get", action: "/kols", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "view", value: view }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 448,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "sort", value: sortKey }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 449,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "order", value: sortOrder }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 450,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "panel", value: "filters" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 451,
          columnNumber: 15
        }, this),
        q && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "q", value: q }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 452,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "flex-start", gap: "xl", wrap: "wrap", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
            minWidth: 160
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, mb: 6, children: "\u7C89\u7D72\u6578" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 459,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: FOLLOWER_RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontSize: 14
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "fr", value: r.key, defaultChecked: followerRanges.includes(r.key) }, void 0, false, {
                fileName: "app/routes/_app.kols._index.tsx",
                lineNumber: 468,
                columnNumber: 25
              }, this),
              r.label
            ] }, r.key, true, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 461,
              columnNumber: 47
            }, this)) }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 460,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 456,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, { orientation: "vertical" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 474,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
            minWidth: 160
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, mb: 6, children: "\u7522\u696D\u5225" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 480,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: allIndustries.map((ind) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontSize: 14
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "ind", value: ind, defaultChecked: industries.includes(ind) }, void 0, false, {
                fileName: "app/routes/_app.kols._index.tsx",
                lineNumber: 489,
                columnNumber: 25
              }, this),
              ind
            ] }, ind, true, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 482,
              columnNumber: 47
            }, this)) }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 481,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 477,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, { orientation: "vertical" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 495,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
            minWidth: 200
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 600, mb: 6, children: "\u6A19\u7C64" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 501,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: {
              __html: `
                  document.addEventListener('change', function(e) {
                    var cb = e.target;
                    if (!cb || cb.name !== 'tag') return;
                    var label = cb.closest('label[data-tag-label]');
                    if (!label) return;
                    
                    var isChecked = cb.checked;
                    label.style.background = isChecked ? 'var(--mantine-color-blue-light, #dbe4ff)' : 'transparent';
                    label.style.border = isChecked ? '1px solid var(--mantine-color-blue-filled, #228be6)' : '1px solid var(--mantine-color-default-border, #ced4da)';
                    label.style.color = isChecked ? 'var(--mantine-color-blue-filled, #228be6)' : 'var(--mantine-color-text)';
                    label.style.fontWeight = isChecked ? '600' : '400';
                  });
                `
            } }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 503,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 6, wrap: "wrap", children: allTags.map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { "data-tag-label": "1", style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 10px",
              borderRadius: 20,
              border: tags.includes(tag) ? "1px solid var(--mantine-color-blue-filled)" : "1px solid var(--mantine-color-default-border)",
              background: tags.includes(tag) ? "var(--mantine-color-blue-light)" : "transparent",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: tags.includes(tag) ? 600 : 400,
              color: tags.includes(tag) ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
              transition: "all 120ms"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "tag", value: tag, defaultChecked: tags.includes(tag), style: {
                display: "none"
              } }, void 0, false, {
                fileName: "app/routes/_app.kols._index.tsx",
                lineNumber: 534,
                columnNumber: 25
              }, this),
              tag
            ] }, tag, true, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 520,
              columnNumber: 41
            }, this)) }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 519,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 498,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 454,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", gap: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
            padding: "8px 20px",
            background: "var(--mantine-color-blue-filled)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 14
          }, children: "\u5957\u7528\u7BE9\u9078" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 545,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: buildUrl({
            view,
            sort: sortKey,
            order: sortOrder,
            panel: "filters"
          }, {}), style: {
            padding: "8px 20px",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 6,
            textDecoration: "none",
            color: "var(--mantine-color-text)",
            fontSize: 14
          }, children: "\u6E05\u9664\u7BE9\u9078" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 555,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 544,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 446,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 444,
      columnNumber: 23
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", size: "sm", children: [
      "\u5171 ",
      total,
      " \u7B46\u7D50\u679C",
      q ? `\uFF08\u641C\u5C0B\uFF1A${q}\uFF09` : ""
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 573,
      columnNumber: 7
    }, this),
    view === "card" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 1,
      sm: 2,
      lg: 3,
      xl: 4
    }, spacing: 24, children: pageRows.map((kol) => {
      const kolTags = getPrimaryTags(kol);
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, radius: "md", p: "lg", style: {
        position: "relative"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "toggleFavorite" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 593,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 594,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "isFavorite", value: String(kol.isFavorite) }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 595,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 24,
            padding: 0,
            lineHeight: 1,
            color: kol.isFavorite ? "var(--mantine-color-yellow-filled)" : "var(--mantine-color-gray-4)",
            textShadow: kol.isFavorite ? "0 0 2px rgba(250, 176, 5, 0.4)" : "none"
          }, title: kol.isFavorite ? "\u53D6\u6D88\u6536\u85CF" : "\u52A0\u5165\u6536\u85CF", children: kol.isFavorite ? "\u2605" : "\u2606" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 596,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 587,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, size: 72, radius: 999 }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 610,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: kol.displayName }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 611,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", children: [
            "@",
            kol.instagramHandle ?? kol.displayName.toLowerCase().replaceAll(" ", "")
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 612,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 609,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, { my: "sm" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 616,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: 4, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "IG ",
            (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 618,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "YT ",
            (kol.social?.youtube ?? 0).toLocaleString()
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 619,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "TT ",
            (kol.social?.tiktok ?? 0).toLocaleString()
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 620,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 617,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 6, mt: "sm", wrap: "wrap", children: kolTags.map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { variant: "light", radius: "xl", size: "sm", children: tag }, tag, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 623,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 622,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mt: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: [
            "\u2B50 ",
            (kol.rating ?? 0).toFixed(1)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 626,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: [
            "\u5408\u4F5C ",
            kol.collaborations ?? 0,
            " \u6B21"
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 627,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 625,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "sm", gap: "xs", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "light", size: "xs", fullWidth: true, component: Link, to: `/kols/${kol.id}`, children: "\u67E5\u770B\u8A73\u60C5" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 630,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", size: "xs", fullWidth: true, component: Link, to: `/kols/${kol.id}/edit`, children: "\u7DE8\u8F2F" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 633,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", "data-confirm": `\u78BA\u5B9A\u8981\u522A\u9664 ${kol.displayName} \u55CE\uFF1F\u6B64\u52D5\u4F5C\u7121\u6CD5\u5FA9\u539F\u3002`, style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "delete" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 639,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 640,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", color: "red", variant: "light", size: "xs", fullWidth: true, children: "\u522A\u9664" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 641,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 636,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 629,
          columnNumber: 19
        }, this)
      ] }, kol.id, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 584,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 576,
      columnNumber: 27
    }, this),
    view === "table" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { highlightOnHover: true, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Thead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "Photo" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 655,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: sortUrl("name"), style: {
          textDecoration: "none",
          color: "inherit"
        }, children: [
          "\u540D\u7A31",
          sortLabel("name")
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 656,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 656,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "Instagram" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 660,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: sortUrl("followers"), style: {
          textDecoration: "none",
          color: "inherit"
        }, children: [
          "\u7C89\u7D72\u6578",
          sortLabel("followers")
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 661,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 661,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u6A19\u7C64" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 665,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: sortUrl("rating"), style: {
          textDecoration: "none",
          color: "inherit"
        }, children: [
          "\u8A55\u5206",
          sortLabel("rating")
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 666,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 666,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: sortUrl("collaborations"), style: {
          textDecoration: "none",
          color: "inherit"
        }, children: [
          "\u5408\u4F5C\u6B21\u6578",
          sortLabel("collaborations")
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 670,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 670,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Th, { children: "\u64CD\u4F5C" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 674,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 654,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 653,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tbody, { children: pageRows.map((kol) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, size: 32, radius: "xl" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 679,
          columnNumber: 31
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 679,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}`, children: kol.displayName }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 680,
          columnNumber: 31
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 680,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: [
          "@",
          kol.instagramHandle ?? "-"
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 681,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString() }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 682,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 4, children: getPrimaryTags(kol).slice(0, 2).map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { size: "sm", variant: "light", children: tag }, tag, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 685,
          columnNumber: 69
        }, this)) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 684,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 683,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: [
          "\u2B50 ",
          (kol.rating ?? 0).toFixed(1)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 688,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: kol.collaborations ?? 0 }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 689,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: "xs", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
            display: "inline"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "toggleFavorite" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 695,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 696,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "isFavorite", value: String(kol.isFavorite) }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 697,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              padding: 0,
              lineHeight: 1,
              color: kol.isFavorite ? "var(--mantine-color-yellow-filled)" : "var(--mantine-color-gray-4)"
            }, title: kol.isFavorite ? "\u53D6\u6D88\u6536\u85CF" : "\u52A0\u5165\u6536\u85CF", children: kol.isFavorite ? "\u2605" : "\u2606" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 698,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 692,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/kols/${kol.id}`, variant: "light", size: "xs", children: "\u67E5\u770B" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 710,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/kols/${kol.id}/edit`, variant: "default", size: "xs", children: "\u7DE8\u8F2F" }, void 0, false, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 711,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", "data-confirm": `\u78BA\u5B9A\u8981\u522A\u9664 ${kol.displayName} \u55CE\uFF1F\u6B64\u52D5\u4F5C\u7121\u6CD5\u5FA9\u539F\u3002`, style: {
            display: "inline"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "delete" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 715,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 716,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", color: "red", variant: "subtle", size: "xs", children: "\u522A\u9664" }, void 0, false, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 717,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 712,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 691,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 690,
          columnNumber: 21
        }, this)
      ] }, kol.id, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 678,
        columnNumber: 38
      }, this)) }, void 0, false, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 677,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 652,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 651,
      columnNumber: 28
    }, this),
    totalPages > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 4, children: Array.from({
      length: totalPages
    }, (_, i) => i + 1).map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: `?${new URLSearchParams({
      ...Object.fromEntries(Object.entries(current).filter(([, v]) => !Array.isArray(v))),
      page: String(p)
    }).toString()}`, style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      borderRadius: 6,
      border: "1px solid var(--mantine-color-default-border)",
      background: p === page ? "var(--mantine-color-blue-filled)" : "transparent",
      color: p === page ? "#fff" : "var(--mantine-color-text)",
      textDecoration: "none",
      fontSize: 14,
      fontWeight: p === page ? 600 : 400
    }, children: p }, p, false, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 731,
      columnNumber: 38
    }, this)) }, void 0, false, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 728,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 727,
      columnNumber: 26
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dialog", { id: "kol-batch-import-dialog", style: {
      padding: 24,
      borderRadius: 8,
      border: "1px solid var(--mantine-color-default-border)",
      background: "var(--mantine-color-body)",
      color: "var(--mantine-color-text)",
      width: "100%",
      maxWidth: 500,
      boxShadow: "0 10px 24px rgba(0,0,0,0.15)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 4, children: "\u6279\u91CF\u532F\u5165 KOL (Excel)" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 765,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
          color: "var(--mantine-color-text)"
        }, onClick: (e) => {
          e.currentTarget.closest("dialog").close();
        }, children: "\u2715" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 766,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 764,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mb: "lg", children: "\u8ACB\u4E0A\u50B3\u5305\u542B KOL \u540D\u7A31\u3001\u5E73\u53F0\u9023\u7D50\u3001\u7C89\u7D72\u6578\u7B49\u8CC7\u8A0A\u7684 Excel \u6A94\u6848\u3002\u7CFB\u7D71\u6703\u81EA\u52D5\u89E3\u6790\u4E26\u5EFA\u6A94\u3002\uFF08\u529F\u80FD\u5C55\u793A\u7248\uFF09" }, void 0, false, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 778,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        border: "2px dashed var(--mantine-color-blue-4)",
        borderRadius: "8px",
        backgroundColor: "var(--mantine-color-blue-light)",
        cursor: "pointer",
        transition: "background-color 0.2s"
      }, onDragOver: (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-1)";
      }, onDragLeave: (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
      }, onDrop: (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
        const fileInput = document.getElementById("kol-batch-excel-input");
        if (fileInput && e.dataTransfer.files.length > 0) {
          fileInput.files = e.dataTransfer.files;
          fileInput.dispatchEvent(new Event("change"));
        }
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          fontSize: 36,
          marginBottom: 12
        }, children: "\u{1F4E4}" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 808,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, color: "var(--mantine-color-blue-filled)", children: "\u9EDE\u64CA\u6216\u62D6\u66F3 Excel \u6A94\u6848\u81F3\u6B64" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 812,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", c: "dimmed", mt: 4, children: "\u652F\u63F4 .xlsx, .csv" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 813,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "kol-batch-excel-input", type: "file", accept: ".xlsx, .xls, .csv", style: {
          display: "none"
        }, onChange: (e) => {
          if (e.target.files && e.target.files.length > 0) {
            const dlg = e.target.closest("dialog");
            const label = e.target.closest("label");
            if (label)
              label.style.opacity = "0.5";
            setTimeout(() => {
              alert("\u2705 \u767C\u9001\u81F3\u5F8C\u7AEF\u8655\u7406\u4E2D...\u6210\u529F\u5EFA\u7ACB 23 \u7B46 KOL \u8CC7\u6599\uFF01");
              if (label)
                label.style.opacity = "1";
              if (dlg)
                dlg.close();
              e.target.value = "";
            }, 800);
          }
        } }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 814,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 782,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mt: "xl", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "#", style: {
          fontSize: 13,
          color: "var(--mantine-color-blue-filled)",
          textDecoration: "none"
        }, children: "\u4E0B\u8F09 Excel \u5EFA\u6A94\u7BC4\u672C" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 833,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", style: {
          padding: "8px 16px",
          borderRadius: 4,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          cursor: "pointer",
          fontSize: 14
        }, onClick: (e) => {
          e.currentTarget.closest("dialog").close();
        }, children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 838,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 832,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 754,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.kols._index.tsx",
    lineNumber: 285,
    columnNumber: 10
  }, this);
}
_s(KolListPage, "QdiFf4EcK+co1J9zU26VKCJyZEY=", false, function() {
  return [useLoaderData];
});
_c = KolListPage;
var _c;
$RefreshReg$(_c, "KolListPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  KolListPage as default
};
//# sourceMappingURL=/build/routes/_app.kols._index-DYKBBVFX.js.map
