var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, _loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 19,
        columnNumber: 7
      }, this),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links
});
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError
} from "@remix-run/react";
import { ColorSchemeScript, MantineProvider, Title, Text, Button, Center, Stack } from "@mantine/core";

// node_modules/@mantine/core/styles.css
var styles_default = "/build/_assets/styles-HWPAIADB.css";

// node_modules/@mantine/charts/styles.css
var styles_default2 = "/build/_assets/styles-ZP3ZNYUK.css";

// app/styles.css
var styles_default3 = "/build/_assets/styles-XANZFPT5.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : [],
  { rel: "stylesheet", href: styles_default },
  { rel: "stylesheet", href: styles_default2 },
  { rel: "stylesheet", href: styles_default3 }
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "zh-Hant", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.process = window.process || { env: { NODE_ENV: ${JSON.stringify(
              "development"
            )} } };`
          }
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 30,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ColorSchemeScript, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(MantineProvider, { defaultColorScheme: "auto", children: /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  let error = useRouteError(), status = 500, title = "\u7CFB\u7D71\u767C\u751F\u932F\u8AA4", message = "\u62B1\u6B49\uFF0C\u7CFB\u7D71\u9047\u5230\u4E86\u4E00\u4E9B\u554F\u984C\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002";
  return isRouteErrorResponse(error) && (status = error.status, status === 404 && (title = "\u627E\u4E0D\u5230\u9801\u9762", message = "\u60A8\u6B63\u5728\u5C0B\u627E\u7684\u9801\u9762\u4E0D\u5B58\u5728\u3002\u5B83\u53EF\u80FD\u5DF2\u88AB\u79FB\u9664\u3001\u91CD\u65B0\u547D\u540D\u6216\u66AB\u6642\u7121\u6CD5\u4F7F\u7528\u3002")), /* @__PURE__ */ jsxDEV2("html", { lang: "zh-Hant", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("title", { children: `${status} ${title}` }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ColorSchemeScript, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(MantineProvider, { defaultColorScheme: "auto", children: /* @__PURE__ */ jsxDEV2(Center, { h: "100vh", children: /* @__PURE__ */ jsxDEV2(Stack, { align: "center", gap: "md", children: [
        /* @__PURE__ */ jsxDEV2(Title, { style: { fontSize: 120, lineHeight: 1, color: "var(--mantine-color-blue-filled)" }, children: status }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 82,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV2(Title, { order: 2, children: title }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV2(Text, { c: "dimmed", size: "lg", ta: "center", maw: 500, children: message }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 84,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV2(Button, { component: "a", href: "/", mt: "xl", size: "lg", variant: "light", children: "\u8FD4\u56DE\u9996\u9801" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 87,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 81,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}

// app/routes/_app.insertion-orders.$insertionOrderId.tsx
var app_insertion_orders_insertionOrderId_exports = {};
__export(app_insertion_orders_insertionOrderId_exports, {
  action: () => action,
  default: () => InsertionOrderDetailPage,
  loader: () => loader
});
import {
  Avatar,
  Badge,
  Box,
  Button as Button2,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Rating,
  SimpleGrid,
  Stack as Stack2,
  Text as Text2,
  Textarea,
  TextInput,
  Title as Title2
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BarChart } from "@mantine/charts";
import {
  json
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useState as useState2 } from "react";

// app/components/ClientOnly.tsx
import { useEffect, useState } from "react";
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function ClientOnly({ children, fallback = null }) {
  let [mounted, setMounted] = useState(!1);
  return useEffect(() => {
    setMounted(!0);
  }, []), mounted ? /* @__PURE__ */ jsxDEV3(Fragment, { children: children() }, void 0, !1, {
    fileName: "app/components/ClientOnly.tsx",
    lineNumber: 20,
    columnNumber: 22
  }, this) : /* @__PURE__ */ jsxDEV3(Fragment, { children: fallback }, void 0, !1, {
    fileName: "app/components/ClientOnly.tsx",
    lineNumber: 20,
    columnNumber: 42
  }, this);
}

// app/lib/mock-api.ts
var MOCK_API_BASE = process.env.MOCK_API_BASE_URL ?? "http://127.0.0.1:4000";
async function listKols() {
  return (await fetch(`${MOCK_API_BASE}/kols`)).json();
}
async function getKol(id) {
  let res = await fetch(`${MOCK_API_BASE}/kols/${id}`);
  return res.status === 404 ? null : res.json();
}
async function listProposals() {
  return (await fetch(`${MOCK_API_BASE}/proposals`)).json();
}
async function getProposal(id) {
  let res = await fetch(`${MOCK_API_BASE}/proposals/${id}`);
  return res.status === 404 ? null : res.json();
}
async function listProposalKols(proposalId) {
  return (await fetch(`${MOCK_API_BASE}/proposalKols?proposalId=${proposalId}`)).json();
}
async function addProposalKol(data) {
  let payload = { ...data, status: "pending", feedbackText: "" };
  return (await fetch(`${MOCK_API_BASE}/proposalKols`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })).json();
}
async function updateProposalKolStatus(id, status, feedbackText) {
  return (await fetch(`${MOCK_API_BASE}/proposalKols/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, feedbackText })
  })).json();
}
async function listInsertionOrders() {
  return (await fetch(`${MOCK_API_BASE}/insertionOrders`)).json();
}
async function getInsertionOrder(id) {
  let res = await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`);
  return res.status === 404 ? null : res.json();
}
async function deleteKol(id) {
  return (await fetch(`${MOCK_API_BASE}/kols/${id}`, { method: "DELETE" })).ok;
}
async function updateKol(id, data) {
  let res = await fetch(`${MOCK_API_BASE}/kols/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok)
    throw new Error("Update failed");
  return res.json();
}
async function updateInsertionOrder(id, data) {
  let res = await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok)
    throw new Error("Update failed");
  return res.json();
}
async function addIOReview(orderId, kolId, review) {
  let io = await getInsertionOrder(orderId);
  if (!io)
    throw new Error("Order not found");
  let collabs = io.collaborations ?? [], collabIndex = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (collabIndex === -1)
    throw new Error("Collaboration not found");
  let newReview = {
    ...review,
    id: `rv_${Date.now()}`,
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  }, updatedCollabs = [...collabs];
  return updatedCollabs[collabIndex] = {
    ...updatedCollabs[collabIndex],
    reviews: [...updatedCollabs[collabIndex].reviews ?? [], newReview]
  }, updateInsertionOrder(orderId, { collaborations: updatedCollabs });
}
async function updateIOPerformance(orderId, kolId, performance) {
  let io = await getInsertionOrder(orderId);
  if (!io)
    throw new Error("Order not found");
  let collabs = io.collaborations ?? [], collabIndex = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (collabIndex === -1)
    throw new Error("Collaboration not found");
  let newItem = {
    ...performance,
    id: `perf_${Date.now()}`
  }, updatedCollabs = [...collabs];
  return updatedCollabs[collabIndex] = {
    ...updatedCollabs[collabIndex],
    performanceItems: [...updatedCollabs[collabIndex].performanceItems ?? [], newItem]
  }, updateInsertionOrder(orderId, { collaborations: updatedCollabs });
}

// app/routes/_app.insertion-orders.$insertionOrderId.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function n(value) {
  return (value ?? 0).toLocaleString("zh-TW");
}
function currency(value) {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}
var TAB_LABELS = {
  actions: "\u64CD\u4F5C\u5DE5\u5177",
  performance: "\u6210\u6548\u660E\u7D30",
  reviews: "\u5408\u4F5C\u8A55\u50F9"
};
function KolCollabCard({
  kol,
  onOpenUpload,
  onOpenPerf,
  onOpenReview
}) {
  let [activeTab, setActiveTab] = useState2("actions");
  return /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, p: "md", radius: "md", children: /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV4(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV4(Group, { children: [
        /* @__PURE__ */ jsxDEV4(Avatar, { src: kol.avatarUrl, radius: "xl", size: 50 }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { children: [
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "lg", children: kol.name }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 71,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: [
            kol.services,
            " | NT$ ",
            (kol.price ?? 0).toLocaleString("zh-TW")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 72,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 70,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 68,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4(Group, { gap: "xl", children: [
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, align: "center", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u89F8\u53CA" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 79,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "xl", children: (kol.totalReach ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 80,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, align: "center", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E92\u52D5" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 83,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "xl", children: (kol.totalEngagement ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 84,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, align: "center", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u8A55\u50F9" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 87,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Group, { gap: 4, children: [
            /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "xl", children: (kol.rating ?? 0).toFixed(1) }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 89,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV4(Text2, { color: "yellow", children: "\u2B50" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 90,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 88,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 77,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 67,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(Divider, {}, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(Box, { style: { borderBottom: "1px solid var(--mantine-color-default-border)" }, children: /* @__PURE__ */ jsxDEV4(Group, { gap: 0, children: ["actions", "performance", "reviews"].map((tab) => /* @__PURE__ */ jsxDEV4(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        style: {
          padding: "8px 16px",
          border: "none",
          borderBottom: activeTab === tab ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
          background: "none",
          cursor: "pointer",
          color: activeTab === tab ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-dimmed)",
          fontWeight: activeTab === tab ? 600 : 400,
          fontSize: "var(--mantine-font-size-sm)",
          fontFamily: "inherit",
          transition: "color 0.1s, border-color 0.1s"
        },
        children: TAB_LABELS[tab]
      },
      tab,
      !1,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 102,
        columnNumber: 15
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 100,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 99,
      columnNumber: 9
    }, this),
    activeTab === "actions" && /* @__PURE__ */ jsxDEV4(Group, { pt: "xs", children: [
      /* @__PURE__ */ jsxDEV4(
        Button2,
        {
          type: "button",
          size: "xs",
          variant: "light",
          onClick: () => onOpenUpload(kol),
          children: "\u{1F4F8} \u4E0A\u50B3\u8CBC\u6587"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 132,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4(
        Button2,
        {
          type: "button",
          size: "xs",
          variant: "light",
          onClick: () => onOpenPerf(kol),
          children: "\u{1F4CA} \u65B0\u589E\u6210\u6548"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 140,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4(
        Button2,
        {
          type: "button",
          size: "xs",
          variant: "light",
          color: "yellow",
          onClick: () => onOpenReview(kol),
          children: "\u270D\uFE0F \u7559\u4E0B\u8A55\u50F9"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 148,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4(
        Button2,
        {
          type: "button",
          size: "xs",
          variant: "default",
          component: Link,
          to: `/kols/${kol.kolId}`,
          children: "\u{1F464} \u67E5\u770B KOL \u6A94\u6848"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 157,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 131,
      columnNumber: 11
    }, this),
    activeTab === "performance" && /* @__PURE__ */ jsxDEV4(Box, { pt: "xs", children: (kol.performanceItems ?? []).length > 0 ? /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: { base: 1, sm: 2 }, spacing: "sm", children: kol.performanceItems?.map((perf) => /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, p: "sm", radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Group, { justify: "space-between", mb: "xs", children: [
        /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 700, children: perf.title }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 177,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Badge, { size: "xs", children: "\u5DF2\u8FFD\u8E64" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 178,
          columnNumber: 23
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 176,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: 4, children: [
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u66DD\u5149" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 182,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: (perf.metrics?.impressions ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 183,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 181,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u89F8\u53CA" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 188,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: (perf.metrics?.reach ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 189,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 187,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E92\u52D5\u6B21\u6578" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 194,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: (perf.metrics?.likes ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 195,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 193,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E92\u52D5\u7387" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 200,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: [
            (perf.metrics?.engagementRate ?? 0).toFixed(1),
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 201,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 199,
          columnNumber: 23
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 180,
        columnNumber: 21
      }, this)
    ] }, perf.id, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 175,
      columnNumber: 19
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 173,
      columnNumber: 15
    }, this) : /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", c: "dimmed", p: "md", ta: "center", children: "\u5C1A\u7121\u6210\u6548\u6578\u64DA" }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 210,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 171,
      columnNumber: 11
    }, this),
    activeTab === "reviews" && /* @__PURE__ */ jsxDEV4(Box, { pt: "xs", children: (kol.reviews ?? []).length > 0 ? /* @__PURE__ */ jsxDEV4(Stack2, { gap: "xs", children: kol.reviews?.map((rv) => /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, p: "sm", radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxDEV4(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV4(Avatar, { src: rv.avatarUrl, size: "sm" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 224,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: rv.author }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 225,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: rv.date }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 226,
            columnNumber: 25
          }, this),
          rv.type && /* @__PURE__ */ jsxDEV4(Badge, { size: "xs", color: rv.type === "internal" ? "red" : "blue", children: rv.type === "internal" ? "\u5167\u8A55" : "\u5916\u8A55" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 228,
            columnNumber: 27
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 223,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Rating, { value: rv.rating, readOnly: !0, size: "xs" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 233,
          columnNumber: 23
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 222,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", mt: "xs", children: rv.comment }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 235,
        columnNumber: 21
      }, this)
    ] }, rv.id, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 221,
      columnNumber: 19
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 219,
      columnNumber: 15
    }, this) : /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", c: "dimmed", p: "md", ta: "center", children: "\u5C1A\u7121\u8A55\u50F9\u5167\u5BB9" }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 240,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 217,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
    lineNumber: 66,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
}
async function loader({ params }) {
  let insertionOrderId = params.insertionOrderId ?? "", insertionOrder = await getInsertionOrder(insertionOrderId);
  if (!insertionOrder)
    throw new Response("Not Found", { status: 404 });
  return json({ insertionOrder });
}
async function action({ request, params }) {
  let orderId = params.insertionOrderId ?? "", formData = await request.formData(), intent = formData.get("intent");
  if (intent === "review") {
    let kolId = formData.get("kolId"), rating = Number(formData.get("rating")), internalComment = formData.get("internalComment"), externalComment = formData.get("externalComment");
    return externalComment && await addIOReview(orderId, kolId, {
      author: "System User",
      // In real app, get from session
      comment: externalComment,
      rating,
      type: "external"
    }), internalComment && await addIOReview(orderId, kolId, {
      author: "System User",
      comment: internalComment,
      rating,
      type: "internal"
    }), json({ success: !0 });
  }
  if (intent === "performance") {
    let kolId = formData.get("kolId"), title = formData.get("title"), impressions = Number(formData.get("impressions")), reach = Number(formData.get("reach")), likes = Number(formData.get("likes")), comments = Number(formData.get("comments"));
    return await updateIOPerformance(orderId, kolId, {
      title,
      metrics: {
        impressions,
        reach,
        likes,
        comments,
        engagementRate: impressions > 0 ? (likes + comments) / impressions * 100 : 0
      }
    }), json({ success: !0 });
  }
  return json({ success: !1 });
}
function InsertionOrderDetailPage() {
  let { insertionOrder } = useLoaderData(), collaborations = insertionOrder.collaborations ?? [], fetcher = useFetcher(), [reviewOpened, { open: openReview, close: closeReview }] = useDisclosure(!1), [perfOpened, { open: openPerf, close: closePerf }] = useDisclosure(!1), [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(!1), [selectedKol, setSelectedKol] = useState2(null), totalReach = insertionOrder.totalReach ?? collaborations.reduce((sum, c) => sum + (c.totalReach ?? 0), 0), totalEngagement = insertionOrder.totalEngagement ?? collaborations.reduce((sum, c) => sum + (c.totalEngagement ?? 0), 0), avgRating = insertionOrder.avgRating ?? (collaborations.length > 0 ? collaborations.reduce((sum, c) => sum + (c.rating ?? 0), 0) / collaborations.length : 0), avgEngagementRate = insertionOrder.avgEngagementRate ?? 0, chartData = collaborations.map((c) => ({
    name: c.name,
    reach: c.totalReach ?? 0,
    engagement: c.totalEngagement ?? 0
  })), handleOpenReview = (kol) => {
    setSelectedKol(kol), openReview();
  }, handleOpenPerf = (kol) => {
    setSelectedKol(kol), openPerf();
  }, handleOpenUpload = (kol) => {
    setSelectedKol(kol), openUpload();
  }, isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV4(Group, { gap: 8, children: [
      /* @__PURE__ */ jsxDEV4(Link, { to: "/insertion-orders", className: "text-blue-500 hover:underline", children: "\u59D4\u520A\u55AE\u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 371,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Text2, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 374,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Text2, { fw: 600, children: [
        "\u6848\u4EF6 #",
        insertionOrder.orderNo
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 375,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 370,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Group, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsxDEV4(Group, { children: [
        /* @__PURE__ */ jsxDEV4(Button2, { variant: "default", component: Link, to: "/insertion-orders", children: "\u8FD4\u56DE" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 380,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4(Title2, { order: 2, children: [
          "\u6848\u4EF6 #",
          insertionOrder.orderNo
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 383,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 379,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Group, { children: [
        /* @__PURE__ */ jsxDEV4(
          Button2,
          {
            component: Link,
            to: `/reports/generate?orderId=${insertionOrder.id}`,
            children: "\u{1F4CA} \u7522\u751F\u7D50\u6848\u5831\u544A"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 386,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", children: "\u{1F4BE} \u532F\u51FA Excel" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 392,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 385,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 378,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", p: "xl", shadow: "sm", children: /* @__PURE__ */ jsxDEV4(Grid, { gutter: "xl", children: [
      /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 7 }, children: /* @__PURE__ */ jsxDEV4(Stack2, { gap: "sm", children: [
        /* @__PURE__ */ jsxDEV4(Title2, { order: 3, c: "blue", children: insertionOrder.projectName ?? insertionOrder.title ?? "\u672A\u547D\u540D\u5C08\u6848" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 401,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV4(Badge, { variant: "light", children: [
            "\u5BA2\u6236: ",
            insertionOrder.clientName
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 405,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Badge, { variant: "light", color: "cyan", children: [
            "\u54C1\u724C: ",
            insertionOrder.brand ?? insertionOrder.clientName
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 406,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 404,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", children: [
          "\u7522\u696D: ",
          insertionOrder.industryPath ?? insertionOrder.industry ?? "-"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 410,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", children: [
          "\u8CA0\u8CAC\u696D\u52D9: ",
          insertionOrder.salesOwner ?? "-",
          " | KOL \u7A97\u53E3:",
          " ",
          insertionOrder.kolManager ?? "-"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 413,
          columnNumber: 15
        }, this),
        insertionOrder.documentUrl && /* @__PURE__ */ jsxDEV4(
          Button2,
          {
            component: "a",
            href: insertionOrder.documentUrl,
            target: "_blank",
            variant: "subtle",
            leftSection: "\u{1F4C4}",
            size: "compact-sm",
            p: 0,
            children: "\u4E0B\u8F09\u59D4\u520A\u55AE\u5408\u7D04"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 418,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 400,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 399,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 5 }, children: /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: 2, spacing: "md", children: [
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u5408\u4F5C KOL" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 435,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: [
            insertionOrder.kolCount ?? collaborations.length,
            " \u4F4D"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 438,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 434,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u9810\u7B97" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 443,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: currency(insertionOrder.totalBudget) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 446,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 442,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u89F8\u53CA" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 449,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: n(totalReach) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 452,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 448,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u4E92\u52D5" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 455,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: n(totalEngagement) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 458,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 454,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u5E73\u5747\u4E92\u52D5\u7387" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 461,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: [
            avgEngagementRate.toFixed(1),
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 464,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 460,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u5E73\u5747\u8A55\u50F9" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 467,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: [
            "\u2B50 ",
            avgRating.toFixed(1)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 470,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 466,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 433,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 432,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 398,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 397,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Title2, { order: 3, mb: "lg", children: "\u{1F4C8} \u6210\u6548\u6578\u64DA\u5C0D\u6BD4" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 479,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(ClientOnly, { fallback: /* @__PURE__ */ jsxDEV4(Box, { h: 250, style: { background: "#f8f9fa" } }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 482,
        columnNumber: 31
      }, this), children: () => /* @__PURE__ */ jsxDEV4(Grid, { children: [
        /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 6 }, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 600, mb: "sm", ta: "center", children: "\u89F8\u53CA\u4EBA\u6578\u5C0D\u6BD4 (Reach)" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 486,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(
            BarChart,
            {
              id: "reach-chart",
              h: 250,
              data: chartData,
              dataKey: "name",
              series: [{ name: "reach", color: "blue.6", label: "\u89F8\u53CA" }],
              tickLine: "none",
              gridAxis: "y"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 489,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 485,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 6 }, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 600, mb: "sm", ta: "center", children: "\u4E92\u52D5\u6B21\u6578\u5C0D\u6BD4 (Engagement)" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 500,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(
            BarChart,
            {
              id: "engagement-chart",
              h: 250,
              data: chartData,
              dataKey: "name",
              series: [{ name: "engagement", color: "teal.6", label: "\u4E92\u52D5" }],
              tickLine: "none",
              gridAxis: "y"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 503,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 499,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 484,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 482,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 478,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Title2, { order: 3, mb: "sm", children: "\u5408\u4F5C KOL \u5217\u8868" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 520,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: collaborations.map((kol) => /* @__PURE__ */ jsxDEV4(
        KolCollabCard,
        {
          kol,
          onOpenUpload: handleOpenUpload,
          onOpenPerf: handleOpenPerf,
          onOpenReview: handleOpenReview
        },
        kol.id,
        !1,
        {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 525,
          columnNumber: 13
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 523,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
      lineNumber: 519,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(
      Modal,
      {
        id: "upload-modal",
        opened: uploadOpened,
        onClose: closeUpload,
        title: `\u4E0A\u50B3\u8CBC\u6587\u5716\u7247 - ${selectedKol?.name}`,
        children: /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: [
          /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u8CBC\u6587\u9023\u7D50", placeholder: "https://instagram.com/p/xxxxx" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 544,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u5716\u7247\u9023\u7D50", placeholder: "\u53EF\u5148\u8CBC\u4E0A\u5716\u7247 URL" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 545,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(Group, { justify: "flex-end", children: [
            /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", onClick: closeUpload, children: "\u53D6\u6D88" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 547,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(Button2, { type: "button", color: "blue", onClick: closeUpload, children: "\u5132\u5B58" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 550,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 546,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 543,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 537,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV4(
      Modal,
      {
        id: "perf-modal",
        opened: perfOpened,
        onClose: closePerf,
        title: `\u65B0\u589E\u6210\u6548 - ${selectedKol?.name}`,
        size: "lg",
        children: /* @__PURE__ */ jsxDEV4(fetcher.Form, { method: "post", onSubmit: closePerf, children: [
          /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "intent", value: "performance" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 565,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "kolId", value: selectedKol?.id }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 566,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: [
            /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, p: "sm", bg: "blue.0", style: { borderColor: "#339af0" }, children: /* @__PURE__ */ jsxDEV4(Stack2, { gap: 5, children: [
              /* @__PURE__ */ jsxDEV4(Group, { gap: 5, children: [
                /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 700, c: "blue", children: "\u{1F916} AI OCR \u667A\u80FD\u8B58\u5225" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                  lineNumber: 571,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV4(Badge, { variant: "dot", size: "xs", children: "Auto-fill" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                  lineNumber: 574,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 570,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E0A\u50B3\u5F8C\u53F0\u6210\u6548\u622A\u5716\uFF0CAI \u5C07\u81EA\u52D5\u70BA\u60A8\u63D0\u53D6\u6578\u64DA\u4E26\u586B\u5165\u4E0B\u65B9\u8868\u55AE\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 578,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV4(Button2, { type: "button", size: "xs", mt: 5, color: "blue", children: "\u{1F4F8} \u6383\u63CF\u622A\u5716\u4E26\u5E36\u5165\u6578\u64DA" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 581,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 569,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 568,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u5167\u5BB9\u6A19\u984C", name: "title", defaultValue: "IG \u8CBC\u6587", required: !0 }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 587,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: 2, children: [
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u66DD\u5149\u6578", name: "impressions", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 589,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u89F8\u53CA\u4EBA\u6578", name: "reach", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 590,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u4E92\u52D5\u6B21\u6578 (\u6309\u8B9A)", name: "likes", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 591,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u7559\u8A00\u6578", name: "comments", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 592,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 588,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(Textarea, { label: "\u5099\u8A3B", name: "notes", rows: 3 }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 594,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(Group, { justify: "flex-end", children: [
              /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", onClick: closePerf, children: "\u53D6\u6D88" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 596,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(Button2, { color: "blue", type: "submit", loading: isSubmitting, children: "\u5132\u5B58\u6578\u64DA" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 599,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 595,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 567,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 564,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 557,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV4(
      Modal,
      {
        id: "review-modal",
        opened: reviewOpened,
        onClose: closeReview,
        title: `\u7559\u4E0B\u8A55\u50F9 - ${selectedKol?.name}`,
        children: /* @__PURE__ */ jsxDEV4(fetcher.Form, { method: "post", onSubmit: closeReview, children: [
          /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "intent", value: "review" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 614,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "kolId", value: selectedKol?.id }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 615,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: [
            /* @__PURE__ */ jsxDEV4(Stack2, { gap: 5, children: [
              /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 500, children: "\u661F\u7D1A\u8A55\u5206" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 618,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(Rating, { defaultValue: 4.5, name: "rating", fractions: 2 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 621,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 617,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(
              Textarea,
              {
                label: "\u5167\u90E8\u8A55\u8AD6 (\u50C5\u9650\u540C\u4EC1\u67E5\u770B)",
                name: "internalComment",
                placeholder: "\u4F8B\u5982\uFF1A\u6E9D\u901A\u7A4D\u6975\u3001\u7D20\u6750\u54C1\u8CEA\u9AD8...",
                rows: 3
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 623,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV4(
              Textarea,
              {
                label: "\u5916\u90E8\u8A55\u8AD6 (\u53EF\u7528\u65BC\u7D50\u6848\u5831\u544A)",
                name: "externalComment",
                placeholder: "\u4F8B\u5982\uFF1A\u53D7\u773E\u53CD\u994B\u71B1\u70C8\uFF0C\u8F49\u55AE\u6548\u679C\u4F73...",
                rows: 3
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 629,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV4(Group, { justify: "flex-end", children: [
              /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", onClick: closeReview, children: "\u53D6\u6D88" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 636,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(Button2, { color: "yellow", type: "submit", loading: isSubmitting, children: "\u63D0\u4EA4\u8A55\u50F9" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
                lineNumber: 639,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
              lineNumber: 635,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
            lineNumber: 616,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
          lineNumber: 613,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
        lineNumber: 607,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.tsx",
    lineNumber: 369,
    columnNumber: 5
  }, this);
}

// app/routes/_app.insertion-orders._index.tsx
var app_insertion_orders_index_exports = {};
__export(app_insertion_orders_index_exports, {
  default: () => InsertionOrderListPage,
  loader: () => loader2
});
import {
  Badge as Badge2,
  Button as Button3,
  Card as Card2,
  Group as Group2,
  SimpleGrid as SimpleGrid2,
  Stack as Stack3,
  Text as Text3,
  Title as Title3
} from "@mantine/core";
import { json as json2 } from "@remix-run/node";
import { Link as Link2, useLoaderData as useLoaderData2 } from "@remix-run/react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function statusMeta(status) {
  return status === "completed" ? { label: "\u5DF2\u7D50\u6848", color: "green" } : status === "in_progress" ? { label: "\u57F7\u884C\u4E2D", color: "yellow" } : { label: "\u898F\u5283\u4E2D", color: "gray" };
}
function numberShort(value) {
  let n2 = value ?? 0;
  return n2 >= 1e6 ? `${(n2 / 1e6).toFixed(1)}M` : n2 >= 1e3 ? `${Math.round(n2 / 1e3)}K` : `${n2}`;
}
function matchesTime(order, filter) {
  if (filter === "all")
    return !0;
  let start = new Date(order.startDate), now = /* @__PURE__ */ new Date("2026-03-06T00:00:00Z");
  if (filter === "thisYear")
    return start.getUTCFullYear() === 2026;
  let diffDays = (now.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24);
  return filter === "last30" ? diffDays <= 30 : filter === "last90" ? diffDays <= 90 : !0;
}
async function loader2({ request }) {
  let url = new URL(request.url), search = url.searchParams.get("search") ?? "", clientFilter = url.searchParams.get("client") ?? "", industryFilter = url.searchParams.get("industry") ?? "", statusFilter = url.searchParams.get("status") ?? "", timeFilter = url.searchParams.get("time") ?? "all", page = Math.max(1, Number(url.searchParams.get("page") ?? "1")), pageSize = Number(url.searchParams.get("pageSize") ?? "5"), allOrders = await listInsertionOrders(), allClients = Array.from(new Set(allOrders.map((o) => o.clientName))), allIndustries = Array.from(
    new Set(allOrders.map((o) => o.industry).filter(Boolean))
  ), q = search.trim().toLowerCase(), filtered = allOrders.filter((order) => !(!(!q || order.orderNo.toLowerCase().includes(q) || (order.title ?? "").toLowerCase().includes(q) || order.clientName.toLowerCase().includes(q)) || clientFilter && order.clientName !== clientFilter || industryFilter && order.industry !== industryFilter || statusFilter && order.status !== statusFilter || !matchesTime(order, timeFilter))), stats = {
    total: filtered.length,
    budget: filtered.reduce((sum, o) => sum + (o.totalBudget ?? 0), 0),
    reach: filtered.reduce((sum, o) => sum + (o.totalReach ?? 0), 0),
    engagement: filtered.reduce((sum, o) => sum + (o.totalEngagement ?? 0), 0)
  }, totalPages = Math.max(1, Math.ceil(filtered.length / pageSize)), currentPage = Math.min(page, totalPages), rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return json2({
    rows,
    stats,
    totalPages,
    currentPage,
    pageSize,
    allClients,
    allIndustries,
    // echo back current filter values for controlled inputs
    search,
    clientFilter,
    industryFilter,
    statusFilter,
    timeFilter
  });
}
function InsertionOrderListPage() {
  let {
    rows,
    stats,
    totalPages,
    currentPage,
    pageSize,
    allClients,
    allIndustries,
    search,
    clientFilter,
    industryFilter,
    statusFilter,
    timeFilter
  } = useLoaderData2();
  return /* @__PURE__ */ jsxDEV5(Stack3, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV5(Group2, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV5(Title3, { order: 2, children: "\u59D4\u520A\u55AE\u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5(Group2, { children: /* @__PURE__ */ jsxDEV5(Button3, { component: Link2, to: "/insertion-orders/new", children: "\u65B0\u589E\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 121,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 119,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("form", { method: "get", style: { display: "contents" }, children: /* @__PURE__ */ jsxDEV5(Stack3, { gap: "sm", children: /* @__PURE__ */ jsxDEV5(Group2, { align: "end", wrap: "wrap", children: [
      /* @__PURE__ */ jsxDEV5("div", { style: { flex: 1, minWidth: 200 }, children: [
        /* @__PURE__ */ jsxDEV5("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u641C\u5C0B" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 132,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(
          "input",
          {
            name: "search",
            defaultValue: search,
            placeholder: "\u641C\u5C0B\u59D4\u520A\u55AE\u7DE8\u865F\u3001\u6A19\u984C\u6216\u5BA2\u6236",
            style: {
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              fontSize: 14,
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)",
              boxSizing: "border-box"
            }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 135,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 131,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { children: [
        /* @__PURE__ */ jsxDEV5("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u5BA2\u6236" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 154,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(
          "select",
          {
            name: "client",
            defaultValue: clientFilter,
            style: {
              padding: "8px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              fontSize: 14,
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)",
              minWidth: 140
            },
            children: [
              /* @__PURE__ */ jsxDEV5("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 168,
                columnNumber: 17
              }, this),
              allClients.map((c) => /* @__PURE__ */ jsxDEV5("option", { value: c, children: c }, c, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 170,
                columnNumber: 19
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 155,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 153,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { children: [
        /* @__PURE__ */ jsxDEV5("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u7522\u696D" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 177,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(
          "select",
          {
            name: "industry",
            defaultValue: industryFilter,
            style: {
              padding: "8px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              fontSize: 14,
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)",
              minWidth: 140
            },
            children: [
              /* @__PURE__ */ jsxDEV5("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 191,
                columnNumber: 17
              }, this),
              allIndustries.map((i) => /* @__PURE__ */ jsxDEV5("option", { value: i, children: i }, i, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 193,
                columnNumber: 19
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 178,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 176,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { children: [
        /* @__PURE__ */ jsxDEV5("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u72C0\u614B" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 200,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(
          "select",
          {
            name: "status",
            defaultValue: statusFilter,
            style: {
              padding: "8px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              fontSize: 14,
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)",
              minWidth: 120
            },
            children: [
              /* @__PURE__ */ jsxDEV5("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 214,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: "planned", children: "\u898F\u5283\u4E2D" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 215,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: "in_progress", children: "\u57F7\u884C\u4E2D" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 216,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: "completed", children: "\u5DF2\u7D50\u6848" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 217,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 201,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 199,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { children: [
        /* @__PURE__ */ jsxDEV5("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u6642\u9593" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 223,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(
          "select",
          {
            name: "time",
            defaultValue: timeFilter,
            style: {
              padding: "8px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              fontSize: 14,
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)",
              minWidth: 140
            },
            children: [
              /* @__PURE__ */ jsxDEV5("option", { value: "all", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 237,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: "last30", children: "\u8FD1 30 \u5929" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 238,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: "last90", children: "\u8FD1 90 \u5929" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 239,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: "thisYear", children: "2026 \u5E74" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 240,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 224,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 222,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "pageSize", value: pageSize }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 245,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5(
        "button",
        {
          type: "submit",
          style: {
            padding: "8px 20px",
            background: "var(--mantine-color-blue-filled)",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer"
          },
          children: "\u5957\u7528\u7BE9\u9078"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 247,
          columnNumber: 13
        },
        this
      ),
      (search || clientFilter || industryFilter || statusFilter || timeFilter !== "all") && /* @__PURE__ */ jsxDEV5(
        "a",
        {
          href: "/insertion-orders",
          style: {
            padding: "8px 16px",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 4,
            fontSize: 14,
            textDecoration: "none",
            color: "var(--mantine-color-text)",
            background: "var(--mantine-color-body)"
          },
          children: "\u6E05\u9664\u7BE9\u9078"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 264,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 129,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(SimpleGrid2, { cols: { base: 2, md: 4 }, spacing: "sm", children: [
      /* @__PURE__ */ jsxDEV5(Card2, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV5(Text3, { c: "dimmed", size: "sm", children: "\u59D4\u520A\u55AE\u6578" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 286,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV5(Title3, { order: 3, children: stats.total }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 287,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 285,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5(Card2, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV5(Text3, { c: "dimmed", size: "sm", children: "\u7E3D\u9810\u7B97" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 290,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV5(Title3, { order: 3, children: [
          "NT$ ",
          stats.budget.toLocaleString()
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 291,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 289,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5(Card2, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV5(Text3, { c: "dimmed", size: "sm", children: "\u7E3D\u89F8\u53CA" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 294,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV5(Title3, { order: 3, children: numberShort(stats.reach) }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 295,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 293,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5(Card2, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV5(Text3, { c: "dimmed", size: "sm", children: "\u7E3D\u4E92\u52D5" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 298,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV5(Title3, { order: 3, children: numberShort(stats.engagement) }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 299,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 297,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 284,
      columnNumber: 7
    }, this),
    rows.length === 0 ? /* @__PURE__ */ jsxDEV5(Card2, { withBorder: !0, p: "xl", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxDEV5(Text3, { size: "48px", children: "\u{1F4C4}" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 306,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV5(Title3, { order: 3, children: "\u5C1A\u7121\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 307,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV5(Text3, { c: "dimmed", mb: "md", children: "\u8ABF\u6574\u7BE9\u9078\u689D\u4EF6\uFF0C\u6216\u5EFA\u7ACB\u60A8\u7684\u7B2C\u4E00\u500B\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 308,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV5(Button3, { component: Link2, to: "/insertion-orders/new", children: "\u958B\u59CB\u5EFA\u7ACB" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 309,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 305,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV5(Stack3, { gap: "md", children: rows.map((order) => {
      let status = statusMeta(order.status);
      return /* @__PURE__ */ jsxDEV5(Card2, { withBorder: !0, className: "io-card", children: /* @__PURE__ */ jsxDEV5(Stack3, { gap: "md", children: [
        /* @__PURE__ */ jsxDEV5(Group2, { justify: "space-between", children: [
          /* @__PURE__ */ jsxDEV5(Text3, { fw: 600, children: [
            "\u{1F4CB} #",
            order.orderNo,
            " ",
            order.title ?? "\u672A\u547D\u540D\u5C08\u6848"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 319,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV5(Badge2, { color: status.color, variant: "light", children: status.label }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 320,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 318,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV5(SimpleGrid2, { cols: { base: 1, md: 2 }, children: [
          /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", children: [
            "\u5BA2\u6236: ",
            order.clientName,
            " | \u7522\u696D: ",
            order.industry ?? "-"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 324,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", children: [
            "\u8CA0\u8CAC\u696D\u52D9: ",
            order.salesOwner ?? "-",
            " | KOL\u7A97\u53E3: ",
            order.kolManager ?? "-"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 325,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 323,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV5(SimpleGrid2, { cols: { base: 2, md: 5 }, children: [
          /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", children: [
            "\u5408\u4F5C KOL: ",
            order.kolCount ?? 0,
            " \u4F4D"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 329,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", children: [
            "\u7E3D\u9810\u7B97: NT$ ",
            (order.totalBudget ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 330,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", children: [
            "\u5E73\u5747\u8A55\u50F9: \u2B50 ",
            (order.avgRating ?? 0).toFixed(1)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 331,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", children: [
            "\u7E3D\u89F8\u53CA: ",
            numberShort(order.totalReach)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 332,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", children: [
            "\u7E3D\u4E92\u52D5: ",
            numberShort(order.totalEngagement)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 333,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 328,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV5(Group2, { justify: "space-between", children: /* @__PURE__ */ jsxDEV5(Group2, { children: [
          /* @__PURE__ */ jsxDEV5(Button3, { component: Link2, to: `/insertion-orders/${order.id}`, children: "\u67E5\u770B\u8A73\u60C5" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 338,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV5(Button3, { variant: "default", component: Link2, to: `/reports/generate?orderId=${order.id}`, children: "\u{1F4CA} \u7522\u751F\u5831\u544A" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 339,
            columnNumber: 23
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 337,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 336,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 317,
        columnNumber: 17
      }, this) }, order.id, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 316,
        columnNumber: 15
      }, this);
    }) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 312,
      columnNumber: 9
    }, this),
    totalPages > 1 && /* @__PURE__ */ jsxDEV5(Group2, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsxDEV5(Group2, { children: [
        /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", c: "dimmed", children: "\u6BCF\u9801\u7B46\u6578" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV5("form", { method: "get", style: { display: "inline" }, children: [
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "search", value: search }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 355,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "client", value: clientFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 356,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "industry", value: industryFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 357,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "status", value: statusFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "time", value: timeFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 359,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "page", value: "1" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 360,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5(
            "select",
            {
              name: "pageSize",
              defaultValue: pageSize,
              onChange: (e) => e.currentTarget.form.submit(),
              style: {
                padding: "6px 10px",
                border: "1px solid var(--mantine-color-default-border)",
                borderRadius: 4,
                fontSize: 14,
                background: "var(--mantine-color-body)",
                color: "var(--mantine-color-text)"
              },
              children: [
                /* @__PURE__ */ jsxDEV5("option", { value: "5", children: "5" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 374,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV5("option", { value: "10", children: "10" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 375,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV5("option", { value: "20", children: "20" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 376,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.insertion-orders._index.tsx",
              lineNumber: 361,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 354,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 352,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV5(Group2, { gap: 4, children: [
        currentPage > 1 && /* @__PURE__ */ jsxDEV5(
          "a",
          {
            href: `/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${currentPage - 1}&pageSize=${pageSize}`,
            style: {
              padding: "6px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              textDecoration: "none",
              color: "var(--mantine-color-text)",
              fontSize: 14
            },
            children: "\u2039 \u4E0A\u4E00\u9801"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 383,
            columnNumber: 15
          },
          this
        ),
        Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxDEV5(
          "a",
          {
            href: `/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${p}&pageSize=${pageSize}`,
            style: {
              padding: "6px 10px",
              border: p === currentPage ? "1px solid var(--mantine-color-blue-filled)" : "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              textDecoration: "none",
              background: p === currentPage ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-body)",
              color: p === currentPage ? "#fff" : "var(--mantine-color-text)",
              fontSize: 14,
              fontWeight: p === currentPage ? 600 : 400
            },
            children: p
          },
          p,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 399,
            columnNumber: 15
          },
          this
        )),
        currentPage < totalPages && /* @__PURE__ */ jsxDEV5(
          "a",
          {
            href: `/insertion-orders?search=${encodeURIComponent(search)}&client=${encodeURIComponent(clientFilter)}&industry=${encodeURIComponent(industryFilter)}&status=${encodeURIComponent(statusFilter)}&time=${timeFilter}&page=${currentPage + 1}&pageSize=${pageSize}`,
            style: {
              padding: "6px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 4,
              textDecoration: "none",
              color: "var(--mantine-color-text)",
              fontSize: 14
            },
            children: "\u4E0B\u4E00\u9801 \u203A"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 418,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 381,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 351,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders._index.tsx",
    lineNumber: 118,
    columnNumber: 5
  }, this);
}

// app/routes/_app.proposals.$proposalId.tsx
var app_proposals_proposalId_exports = {};
__export(app_proposals_proposalId_exports, {
  action: () => action2,
  default: () => ProposalDetailPage,
  loader: () => loader3
});
import {
  Badge as Badge3,
  Button as Button4,
  Card as Card3,
  Group as Group3,
  Modal as Modal2,
  NumberInput,
  Select,
  SimpleGrid as SimpleGrid3,
  Stack as Stack4,
  Table,
  Text as Text4,
  TextInput as TextInput2,
  Textarea as Textarea2,
  Title as Title4
} from "@mantine/core";
import { useDisclosure as useDisclosure2 } from "@mantine/hooks";
import { json as json3 } from "@remix-run/node";
import { Form, Link as Link3, useLoaderData as useLoaderData3, useNavigation } from "@remix-run/react";
import { useMemo, useState as useState3 } from "react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
async function loader3({ params }) {
  let proposalId = params.proposalId ?? "", [proposal, candidates, allKols] = await Promise.all([
    getProposal(proposalId),
    listProposalKols(proposalId),
    listKols()
  ]);
  if (!proposal)
    throw new Response("Not Found", { status: 404 });
  return json3({ proposal, candidates, allKols });
}
async function action2({ request, params }) {
  let proposalId = params.proposalId ?? "", formData = await request.formData(), intent = formData.get("intent");
  if (intent === "add_candidate") {
    let kolId = String(formData.get("kolId")), price = Number(formData.get("price")), role = String(formData.get("role")), reason = String(formData.get("reason")), kolName = String(formData.get("kolName"));
    return await addProposalKol({
      proposalId,
      kolId,
      kolName,
      price,
      role,
      reason
    }), json3({ success: !0 });
  }
  if (intent === "update_status") {
    let candidateId = String(formData.get("candidateId")), status = String(formData.get("status")), feedback = String(formData.get("feedback"));
    return await updateProposalKolStatus(candidateId, status, feedback), json3({ success: !0 });
  }
  return json3({ success: !1 });
}
function ProposalDetailPage() {
  let { proposal, candidates, allKols } = useLoaderData3(), navigation = useNavigation(), [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure2(!1), [aiSearchOpened, { open: openAiSearch, close: closeAiSearch }] = useDisclosure2(!1), [aiSearching, setAiSearching] = useState3(!1), [aiResults, setAiResults] = useState3([]), [aiQuery, setAiQuery] = useState3(""), [feedbackCandidate, setFeedbackCandidate] = useState3(null), [manualKolId, setManualKolId] = useState3(null), statusColor = {
    pending: "gray",
    accepted: "green",
    rejected: "red"
  }, statusLabel = {
    pending: "\u5F85\u5B9A",
    accepted: "\u5DF2\u63A5\u53D7",
    rejected: "\u5DF2\u62D2\u7D55"
  }, allKolOptions = useMemo(
    () => allKols.map((k) => ({ value: k.id, label: k.displayName })),
    [allKols]
  ), handleAiSearch = () => {
    aiQuery.trim() && (setAiSearching(!0), openAiSearch(), window.setTimeout(() => {
      let q = aiQuery.trim().toLowerCase(), matches = allKols.filter((k) => {
        let nameOk = k.displayName.toLowerCase().includes(q), catOk = (k.categories ?? []).some((c) => c.toLowerCase().includes(q)), industryOk = (k.industry ?? "").toLowerCase().includes(q);
        return nameOk || catOk || industryOk;
      }).slice(0, 5).map((k) => {
        let reason = `\u6839\u64DA\u60A8\u7684\u9700\u6C42\u300C${aiQuery}\u300D\uFF0C\u8A72 KOL \u7684\u9818\u57DF\u8207\u6A19\u7C64\u9AD8\u5EA6\u76F8\u95DC\uFF0C\u4E14\u904E\u5F80\u5728\u985E\u4F3C\u5C08\u6848\u4E2D\u8868\u73FE\u7A69\u5B9A\u3002`;
        return {
          ...k,
          matchScore: 88,
          aiReason: reason
        };
      });
      setAiResults(matches), setAiSearching(!1);
    }, 900));
  };
  return /* @__PURE__ */ jsxDEV6(Stack4, { gap: "lg", children: [
    /* @__PURE__ */ jsxDEV6(Group3, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV6(Stack4, { gap: 0, children: [
        /* @__PURE__ */ jsxDEV6(Title4, { order: 2, children: [
          "\u63D0\u6848\u8A73\u7D30\uFF1A",
          proposal.title
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", size: "sm", children: [
          "ID: ",
          proposal.id,
          " | \u5BA2\u6236\uFF1A",
          proposal.clientName
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 142,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6(Group3, { children: [
        /* @__PURE__ */ jsxDEV6(
          Button4,
          {
            variant: "default",
            onClick: () => alert("\u63D0\u6848\u8CC7\u6599\u5DF2\u532F\u51FA\u70BA Excel (\u6A21\u64EC)"),
            children: "\u532F\u51FA\u63D0\u6848"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 147,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV6(
          Button4,
          {
            component: Link3,
            to: `/insertion-orders/new?fromProposalId=${proposal.id}`,
            color: "blue",
            disabled: !candidates.some((c) => c.status === "accepted"),
            children: "\u8F49\u70BA\u59D4\u520A\u55AE"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 153,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(SimpleGrid3, { cols: { base: 1, md: 3 }, spacing: "md", children: [
      /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { size: "xs", c: "dimmed", fw: 700, children: "\u7576\u524D\u968E\u6BB5" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 166,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Badge3, { size: "lg", mt: 5, children: proposal.stage.toUpperCase() }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 167,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 165,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u9810\u7B97" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 170,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Text4, { size: "xl", fw: 700, mt: 5, children: [
          "$",
          proposal.budget.toLocaleString("zh-TW")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 169,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { size: "xs", c: "dimmed", fw: 700, children: "\u622A\u6B62\u65E5\u671F" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 174,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Text4, { size: "xl", fw: 700, mt: 5, children: proposal.dueDate }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 175,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 164,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, padding: "lg", radius: "md", style: { background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)", border: "1px solid #cce3ff" }, children: /* @__PURE__ */ jsxDEV6(Stack4, { gap: "xs", children: [
      /* @__PURE__ */ jsxDEV6(Group3, { gap: 8, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { size: "lg", fw: 700, style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsxDEV6("span", { style: { fontSize: 20 }, children: "\u{1F916}" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 183,
            columnNumber: 15
          }, this),
          " AI KOL \u667A\u80FD\u641C\u5C0B"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 182,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6(Badge3, { variant: "dot", color: "blue", children: "Beta" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 185,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 181,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", c: "dimmed", children: "\u8F38\u5165\u60A8\u7684\u9700\u6C42\uFF08\u4F8B\u5982\uFF1A\u627E\u6BCD\u5B30\u985E\u3001\u4E92\u52D5\u7387 5% \u4EE5\u4E0A\u3001\u6C92\u5408\u4F5C\u904E\u7AF6\u54C1\uFF09\uFF0CAI \u5C07\u70BA\u60A8\u63A8\u85A6\u6700\u5408\u9069\u7684\u4EBA\u9078\u3002" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6(Group3, { mt: "xs", wrap: "nowrap", children: [
        /* @__PURE__ */ jsxDEV6(
          TextInput2,
          {
            id: "ai-search-input",
            placeholder: "\u8ACB\u8F38\u5165\u641C\u5C0B\u6307\u4EE4...",
            style: { flex: 1 },
            value: aiQuery,
            onChange: (e) => setAiQuery(e.currentTarget.value),
            onKeyDown: (e) => {
              e.key === "Enter" && handleAiSearch();
            }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 189,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV6(
          Button4,
          {
            type: "button",
            id: "ai-search-btn",
            color: "blue",
            onClick: handleAiSearch,
            loading: aiSearching,
            children: "\u958B\u59CB\u641C\u5C0B"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 201,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 188,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 180,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: /* @__PURE__ */ jsxDEV6(Stack4, { gap: "md", children: [
      /* @__PURE__ */ jsxDEV6(Group3, { justify: "space-between", children: [
        /* @__PURE__ */ jsxDEV6(Title4, { order: 4, children: [
          "KOL \u5019\u9078\u540D\u55AE (",
          candidates.length,
          ")"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 217,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6(Button4, { type: "button", size: "xs", onClick: openAdd, children: "+ \u624B\u52D5\u65B0\u589E" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 218,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6(Table, { striped: !0, withTableBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Table.Thead, { children: /* @__PURE__ */ jsxDEV6(Table.Tr, { children: [
          /* @__PURE__ */ jsxDEV6(Table.Th, { children: "KOL \u540D\u7A31" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Th, { children: "\u89D2\u8272/\u7248\u4F4D" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Th, { children: "\u9810\u4F30\u5831\u50F9" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 226,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Th, { children: "\u63A8\u85A6\u7406\u7531" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 227,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Th, { children: "\u72C0\u614B" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Th, { children: "\u5BA2\u6236\u53CD\u994B" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 229,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Th, { children: "\u64CD\u4F5C" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 230,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 223,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 222,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6(Table.Tbody, { children: candidates.length === 0 ? /* @__PURE__ */ jsxDEV6(Table.Tr, { children: /* @__PURE__ */ jsxDEV6(Table.Td, { colSpan: 7, align: "center", children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55\u5019\u9078\u4EBA" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 236,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 235,
          columnNumber: 17
        }, this) : candidates.map((c) => /* @__PURE__ */ jsxDEV6(Table.Tr, { children: [
          /* @__PURE__ */ jsxDEV6(Table.Td, { fw: 500, children: c.kolName }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 241,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Td, { children: c.role }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 242,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Td, { children: [
            "$",
            c.price.toLocaleString("zh-TW")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 243,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Td, { children: /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", lineClamp: 2, children: c.reason }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 245,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 244,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Td, { children: /* @__PURE__ */ jsxDEV6(Badge3, { color: statusColor[c.status], children: statusLabel[c.status] }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 248,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 247,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Td, { children: /* @__PURE__ */ jsxDEV6(Text4, { size: "xs", c: "dimmed", children: c.feedbackText || "-" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 251,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 250,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Table.Td, { children: /* @__PURE__ */ jsxDEV6(Group3, { gap: 5, children: [
            /* @__PURE__ */ jsxDEV6(Form, { method: "post", style: { display: "inline" }, children: [
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 256,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "candidateId", value: c.id }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 257,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "status", value: "accepted" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 258,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV6(
                Button4,
                {
                  variant: "light",
                  color: "green",
                  size: "compact-xs",
                  type: "submit",
                  disabled: c.status === "accepted",
                  children: "\u63A5\u53D7"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.proposals.$proposalId.tsx",
                  lineNumber: 259,
                  columnNumber: 27
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 255,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV6(
              Button4,
              {
                variant: "light",
                color: "red",
                size: "compact-xs",
                onClick: () => setFeedbackCandidate({ id: c.id, name: c.kolName }),
                disabled: c.status === "rejected",
                children: "\u62D2\u7D55"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 269,
                columnNumber: 25
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 254,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 253,
            columnNumber: 21
          }, this)
        ] }, c.id, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 240,
          columnNumber: 19
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 233,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 221,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 215,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 214,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(
      Modal2,
      {
        id: "proposal-ai-search-modal",
        opened: aiSearchOpened,
        onClose: () => {
          setAiSearching(!1), closeAiSearch();
        },
        title: "\u{1F916} AI \u641C\u5C0B\u7D50\u679C",
        size: "lg",
        children: /* @__PURE__ */ jsxDEV6(Stack4, { gap: "md", children: [
          aiSearching && /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", children: "\u6B63\u5728\u5206\u6790\u8CC7\u6599\u5EAB\u4E26\u5339\u914D\u6700\u4F73\u4EBA\u9078..." }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 300,
            columnNumber: 27
          }, this),
          !aiSearching && aiResults.length === 0 && /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", children: [
            "\u627E\u4E0D\u5230\u7B26\u5408\u300C",
            aiQuery,
            "\u300D\u7684\u5019\u9078\u4EBA\uFF08Mock\uFF09\u3002"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 302,
            columnNumber: 13
          }, this),
          !aiSearching && aiResults.map((res) => /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, shadow: "xs", children: [
            /* @__PURE__ */ jsxDEV6(Group3, { justify: "space-between", align: "flex-start", children: [
              /* @__PURE__ */ jsxDEV6(Group3, { gap: "sm", children: [
                /* @__PURE__ */ jsxDEV6(
                  "div",
                  {
                    style: {
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#eee",
                      overflow: "hidden",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsxDEV6(
                      "img",
                      {
                        src: res.avatarUrl,
                        alt: "",
                        style: { width: "100%", height: "100%", objectFit: "cover" }
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/_app.proposals.$proposalId.tsx",
                        lineNumber: 319,
                        columnNumber: 23
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 309,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV6("div", { children: [
                  /* @__PURE__ */ jsxDEV6(Text4, { fw: 700, children: res.displayName }, void 0, !1, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 326,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV6(Text4, { size: "xs", c: "dimmed", children: [
                    res.industry,
                    " | ",
                    (res.followers ?? 0).toLocaleString("zh-TW"),
                    " \u7C89\u7D72"
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 327,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.proposals.$proposalId.tsx",
                  lineNumber: 325,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 308,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV6(Badge3, { color: "blue", variant: "filled", children: [
                "\u5339\u914D\u5EA6 ",
                res.matchScore,
                "%"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 332,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 307,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV6(
              Text4,
              {
                size: "xs",
                mt: "sm",
                p: "xs",
                style: {
                  background: "rgba(51, 154, 240, 0.1)",
                  borderRadius: 4,
                  borderLeft: "3px solid #339af0"
                },
                children: [
                  /* @__PURE__ */ jsxDEV6(Text4, { span: !0, fw: 700, c: "blue", children: "AI \u63A8\u85A6\u7406\u7531\uFF1A" }, void 0, !1, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 347,
                    columnNumber: 19
                  }, this),
                  " ",
                  res.aiReason
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 337,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV6(Group3, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ jsxDEV6(Form, { method: "post", onSubmit: closeAiSearch, children: [
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "intent", value: "add_candidate" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 355,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "kolId", value: res.id }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 356,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "kolName", value: res.displayName }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 357,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "price", value: res.averagePrice || 0 }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 358,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "role", value: "\u5F85\u8A0E\u8AD6" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 359,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "reason", value: res.aiReason }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 360,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV6(Button4, { size: "xs", type: "submit", children: "\u52A0\u5165\u5019\u9078\u540D\u55AE" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 361,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 354,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 353,
              columnNumber: 17
            }, this)
          ] }, res.id, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 306,
            columnNumber: 15
          }, this)),
          /* @__PURE__ */ jsxDEV6(Button4, { type: "button", fullWidth: !0, variant: "light", onClick: closeAiSearch, children: "\u95DC\u9589" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 369,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 299,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 289,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV6(
      Modal2,
      {
        id: "proposal-manual-add-modal",
        opened: addOpened,
        onClose: () => {
          setManualKolId(null), closeAdd();
        },
        title: "\u65B0\u589E KOL \u5019\u9078\u4EBA",
        children: /* @__PURE__ */ jsxDEV6(
          Form,
          {
            method: "post",
            onSubmit: () => {
              setManualKolId(null), closeAdd();
            },
            children: [
              /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "intent", value: "add_candidate" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 392,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV6(Stack4, { children: [
                /* @__PURE__ */ jsxDEV6(
                  Select,
                  {
                    label: "\u9078\u64C7 KOL",
                    placeholder: "\u8ACB\u9078\u64C7 KOL",
                    data: allKolOptions,
                    value: manualKolId,
                    onChange: setManualKolId,
                    searchable: !0,
                    nothingFoundMessage: "\u627E\u4E0D\u5230\u7B26\u5408\u7684 KOL",
                    required: !0,
                    name: "kolId"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 394,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV6(
                  "input",
                  {
                    type: "hidden",
                    name: "kolName",
                    value: allKols.find((k) => k.id === manualKolId)?.displayName ?? ""
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 405,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV6(
                  TextInput2,
                  {
                    name: "role",
                    label: "\u5EFA\u8B70\u5408\u4F5C\u7248\u4F4D",
                    placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 x1, Reels x1",
                    required: !0
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 410,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV6(
                  NumberInput,
                  {
                    name: "price",
                    label: "\u9810\u8A08\u5831\u50F9",
                    required: !0,
                    min: 0,
                    thousandSeparator: ",",
                    defaultValue: allKols.find((k) => k.id === manualKolId)?.averagePrice ?? 0
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 416,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV6(
                  Textarea2,
                  {
                    name: "reason",
                    label: "\u63A8\u85A6\u7406\u7531",
                    placeholder: "\u70BA\u4EC0\u9EBC\u9019\u500B KOL \u9069\u5408\u6B64\u5C08\u6848\uFF1F",
                    rows: 3
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 424,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV6(Group3, { justify: "flex-end", mt: "md", children: [
                  /* @__PURE__ */ jsxDEV6(
                    Button4,
                    {
                      type: "button",
                      variant: "default",
                      onClick: () => {
                        setManualKolId(null), closeAdd();
                      },
                      children: "\u53D6\u6D88"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.proposals.$proposalId.tsx",
                      lineNumber: 431,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV6(Button4, { type: "submit", color: "blue", disabled: !manualKolId, children: "\u78BA\u8A8D\u52A0\u5165" }, void 0, !1, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 441,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.proposals.$proposalId.tsx",
                  lineNumber: 430,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 393,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 385,
            columnNumber: 9
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 376,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV6(
      Modal2,
      {
        opened: !!feedbackCandidate,
        onClose: () => setFeedbackCandidate(null),
        title: `\u62D2\u7D55\u5019\u9078\u4EBA\uFF1A${feedbackCandidate?.name}`,
        children: /* @__PURE__ */ jsxDEV6(Form, { method: "post", onSubmit: () => setFeedbackCandidate(null), children: [
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 456,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "candidateId", value: feedbackCandidate?.id }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 457,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "status", value: "rejected" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 458,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV6(Stack4, { children: [
            /* @__PURE__ */ jsxDEV6(
              Textarea2,
              {
                name: "feedback",
                label: "\u5BA2\u6236\u53CD\u994B / \u62D2\u7D55\u539F\u56E0",
                required: !0,
                placeholder: "\u8ACB\u8F38\u5165\u62D2\u7D55\u539F\u56E0\uFF08\u9078\u586B\u4F46\u5EFA\u8B70\u586B\u5BEB\uFF09"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 460,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV6(Button4, { type: "submit", color: "red", children: "\u78BA\u8A8D\u62D2\u7D55" }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 466,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 459,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 455,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 450,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.proposals.$proposalId.tsx",
    lineNumber: 138,
    columnNumber: 5
  }, this);
}

// app/routes/_app.insertion-orders.new.tsx
var app_insertion_orders_new_exports = {};
__export(app_insertion_orders_new_exports, {
  action: () => action3,
  default: () => InsertionOrderCreatePage,
  loader: () => loader4
});
import {
  Alert,
  Box as Box3,
  Button as Button5,
  Card as Card4,
  Divider as Divider3,
  Group as Group4,
  Select as Select2,
  SimpleGrid as SimpleGrid4,
  Stack as Stack5,
  Text as Text5,
  TextInput as TextInput3,
  Textarea as Textarea3,
  Title as Title5
} from "@mantine/core";
import { json as json4, redirect } from "@remix-run/node";
import { Form as Form2, Link as Link4, useActionData, useLoaderData as useLoaderData4, useNavigation as useNavigation2 } from "@remix-run/react";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
async function loader4({ request }) {
  let fromProposalId = new URL(request.url).searchParams.get("fromProposalId"), [kols, orders] = await Promise.all([listKols(), listInsertionOrders()]), proposalData = null;
  if (fromProposalId) {
    let [prop, propKols] = await Promise.all([
      getProposal(fromProposalId),
      listProposalKols(fromProposalId)
    ]);
    prop && (proposalData = {
      title: prop.title,
      clientName: prop.clientName,
      acceptedKols: propKols.filter((pk) => pk.status === "accepted")
    });
  }
  let clients = Array.from(new Set(orders.map((o) => o.clientName).filter(Boolean))), salesOwners = Array.from(new Set(orders.map((o) => o.salesOwner).filter(Boolean))), kolManagers = Array.from(new Set(orders.map((o) => o.kolManager).filter(Boolean)));
  return json4({ kols, clients, salesOwners, kolManagers, proposalData });
}
async function action3({ request }) {
  let formData = await request.formData(), intent = String(formData.get("intent") ?? "create"), projectName = String(formData.get("projectName") ?? "").trim(), clientName = String(formData.get("clientName") ?? "").trim(), brand = String(formData.get("brand") ?? "").trim(), industriesRaw = String(formData.get("industries") ?? ""), documentUrl = String(formData.get("documentUrl") ?? "").trim(), salesOwner = String(formData.get("salesOwner") ?? "").trim(), kolManager = String(formData.get("kolManager") ?? "").trim(), description = String(formData.get("description") ?? "").trim(), internalNotes = String(formData.get("internalNotes") ?? "").trim(), selectedKolsJson = String(formData.get("selectedKolsJson") ?? "[]"), startDate = String(formData.get("startDate") ?? "").trim(), endDate = String(formData.get("endDate") ?? "").trim();
  if (!projectName || !clientName)
    return json4({ error: "\u5C08\u6848\u540D\u7A31\u8207\u5BA2\u6236\u70BA\u5FC5\u586B" }, { status: 400 });
  let industries = industriesRaw ? industriesRaw.split(",").map((s) => s.trim()) : [], selectedKols = [];
  try {
    selectedKols = JSON.parse(selectedKolsJson);
  } catch {
    selectedKols = [];
  }
  let totalBudget = selectedKols.reduce((sum, row) => sum + Number(row.price || 0), 0), payload = {
    orderNo: `IO-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`,
    title: projectName,
    projectName,
    clientName,
    brand: brand || clientName,
    industry: industries[0] ?? "\u672A\u5206\u985E",
    industryPath: industries.join(" > "),
    salesOwner,
    kolManager,
    kolCount: selectedKols.length,
    status: intent === "draft" ? "planned" : "in_progress",
    totalBudget,
    totalReach: 0,
    totalEngagement: 0,
    avgRating: 0,
    avgEngagementRate: 0,
    documentUrl,
    collaborations: selectedKols.map((row) => ({
      id: `ioc_${Math.random().toString(36).slice(2, 9)}`,
      kolId: row.kolId,
      name: row.name,
      avatarUrl: row.avatarUrl,
      price: row.price,
      services: row.services.join(" + "),
      uploadDate: row.uploadDate,
      authorization: row.authorization,
      rating: 0,
      totalReach: 0,
      totalEngagement: 0,
      performanceItems: [],
      reviews: []
    })),
    startDate: startDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    endDate: endDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    notes: [description, internalNotes && `internal:${internalNotes}`].filter(Boolean).join(`
`)
  }, res = await fetch(`${MOCK_API_BASE}/insertionOrders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok)
    return json4({ error: "\u5EFA\u7ACB\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66" }, { status: 500 });
  let created = await res.json();
  return redirect(`/insertion-orders/${created.id}`);
}
function InsertionOrderCreatePage() {
  let { kols, clients, salesOwners, kolManagers, proposalData } = useLoaderData4(), actionData = useActionData(), submitting = useNavigation2().state === "submitting", clientOptions = clients.map((c) => ({ value: c, label: c })), salesOptions = salesOwners.map((x) => ({ value: x, label: x })), kolManagerOptions = kolManagers.map((x) => ({ value: x, label: x })), availableIndustries = ["\u5BB6\u96FB", "\u5EDA\u623F\u5BB6\u96FB", "\u7F8E\u599D", "\u98DF\u54C1", "\u6BCD\u5B30", "3C", "\u6C7D\u8ECA", "\u65C5\u904A"], serviceOptions = ["IG\u8CBC\u6587", "\u9650\u52D5", "Reels", "YouTube", "TikTok", "\u76F4\u64AD"], nativeDialogScript = `
    window.__ALL_KOLS__ = ${JSON.stringify(
    kols.map((k) => ({
      id: k.id,
      name: k.displayName,
      handle: k.instagramHandle ?? "",
      industry: k.industry ?? "\u672A\u5206\u985E",
      avatarUrl: k.avatarUrl ?? "",
      price: Number(k.averagePrice ?? 0)
    }))
  )};

    function kolDialogOpen() {
      var dlg = document.getElementById('kol-select-dialog');
      if (dlg) { dlg.showModal(); kolDialogSearch(''); }
    }
    function kolDialogClose() {
      var dlg = document.getElementById('kol-select-dialog');
      if (dlg) dlg.close();
    }
    function kolDialogSearch(q) {
      var list = document.getElementById('kol-dialog-list');
      if (!list) return;
      var rows = window.__ALL_KOLS__ || [];
      var lq = (q || '').toLowerCase();
      var filtered = lq ? rows.filter(function(k){ return (k.name+k.handle+k.industry).toLowerCase().indexOf(lq) !== -1; }) : rows;
      var selectedRaw = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(selectedRaw ? selectedRaw.value || '[]' : '[]'); } catch(e){}
      var selectedIds = selected.map(function(x){ return x.kolId; });
      list.innerHTML = filtered.map(function(k){
        var isSel = selectedIds.indexOf(k.id) !== -1;
        var btnAttr = isSel
          ? 'onclick="kolDialogRemove(\\''+k.id+'\\')" style="padding:5px 14px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;"'
          : 'onclick="kolDialogAdd(\\''+k.id+'\\',\\''+encodeURIComponent(k.name)+'\\',\\''+encodeURIComponent(k.avatarUrl||'')+'\\','+k.price+')" style="padding:5px 14px;border-radius:4px;border:none;background:var(--mantine-color-blue-filled);color:#fff;cursor:pointer;font-size:12px;"';
        return '<div style="display:flex;align-items:center;gap:12px;padding:10px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(k.avatarUrl||'')+'" style="width:36px;height:36px;border-radius:50%;object-fit:cover;background:#e2e8f0;"/>'
          +'<div style="flex:1;"><div style="font-weight:600;font-size:14px;">'+k.name+'</div><div style="font-size:12px;color:var(--mantine-color-dimmed);">@'+k.handle+' \xB7 '+k.industry+'</div></div>'
          +'<button type="button" '+btnAttr+'>'+(isSel ? '\u79FB\u9664' : '\u52A0\u5165')+'</button>'
          +'</div>';
      }).join('');
    }
    window.kolDialogAdd = function(id, nameEnc, avatarEnc, price) {
      var name = decodeURIComponent(nameEnc);
      var avatar = decodeURIComponent(avatarEnc);
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      if (selected.some(function(x){ return x.kolId === id; })) return;
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG\u8CBC\u6587'], uploadDate:'', authorization:'', price:Number(price)||0 });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
      var searchEl = document.getElementById('kol-dialog-search');
      kolDialogSearch(searchEl ? searchEl.value : '');
    }
    window.kolDialogRemove = function(kolId) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      selected = selected.filter(function(x){ return x.kolId !== kolId; });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
      var searchEl = document.getElementById('kol-dialog-search');
      kolDialogSearch(searchEl ? searchEl.value : '');
    }
    function kolRemove(rowId) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      selected = selected.filter(function(x){ return x.id !== rowId; });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
    }
    function kolRenderSelected() {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var container = document.getElementById('kol-selected-display');
      if (!container) return;
      if (selected.length === 0) {
        container.innerHTML = '<p style="font-size:14px;color:var(--mantine-color-dimmed);margin:8px 0;">\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002</p>';
        return;
      }
      container.innerHTML = selected.map(function(row){
        return '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;"/>'
          +'<span style="flex:1;font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);">NT$ '+(row.price||0).toLocaleString()+'</span>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;">\u79FB\u9664</button>'
          +'</div>';
      }).join('');
    }
  `;
  return /* @__PURE__ */ jsxDEV7(Stack5, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV7("script", { dangerouslySetInnerHTML: { __html: nativeDialogScript } }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 257,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("script", { dangerouslySetInnerHTML: {
      __html: `
        (function bindKolDialog() {
          function setup() {
            // Open dialog button
            var openBtns = document.querySelectorAll('[data-kol-dialog-open]');
            openBtns.forEach(function(btn) {
              btn.addEventListener('click', function() { kolDialogOpen(); });
            });
            // Close dialog buttons
            var closeBtns = document.querySelectorAll('[data-kol-dialog-close]');
            closeBtns.forEach(function(btn) {
              btn.addEventListener('click', function() { kolDialogClose(); });
            });
            // Search input
            var searchInput = document.getElementById('kol-dialog-search');
            if (searchInput) {
              searchInput.addEventListener('input', function() { kolDialogSearch(this.value); });
            }
            // Dialog toggle \u2014 populate list when dialog opens
            var dlg = document.getElementById('kol-select-dialog');
            if (dlg) {
              dlg.addEventListener('toggle', function() { if (dlg.open) kolDialogSearch(''); });
            }
          }
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
          } else {
            setup();
          }
        })();

        function handleExcelUpload(input) {
          var file = input.files && input.files[0];
          if (!file) return;

          // Simulate parsing delay
          setTimeout(function() {
            // Auto-fill basic info
            var setVal = function(name, val) {
              var el = document.querySelector('input[name="'+name+'"]');
              if (el) {
                el.value = val;
                // Dispatch event so React/Mantine might pick it up if they have listeners
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
              }
            };
            
            setVal('projectName', '2026 \u590F\u5B63\u65B0\u54C1\u4E0A\u5E02\u63A8\u5EE3 (\u7531 Excel \u532F\u5165)');
            setVal('brand', 'SHISEIDO');
            setVal('startDate', '2026-06-01');
            setVal('endDate', '2026-06-30');
            
            // For select elements (Mantine's native inputs are hidden, but we use native attributes or standard hidden inputs)
            setVal('clientName', 'Shiseido');
            setVal('industries', '\u7F8E\u599D');

            // Auto-fill financial & collab info
            setVal('services', 'IG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247');
            setVal('authorization', '\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74\u3001\u54C1\u724C\u5B98\u7DB2\u4F7F\u7528');
            setVal('projectQuote', '150000');
            setVal('taxRate', '5');
            setVal('totalAmount', '157500');

            // Add a mock KOL (Gina)
            if (typeof window.kolDialogAdd === 'function') {
               // Assuming 'kol-001' is Gina from mock-api
               window.kolDialogAdd('kol-001', encodeURIComponent('Gina'), encodeURIComponent('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'), 40000);
            } else {
               // Fallback inline add if global kolDialogAdd isn't fully exposed (it's in another script)
               // The previous script defined kolDialogAdd in global scope, wait no, it was inside a string without var/let, so it's global!
               try { kolDialogAdd('kol-001', encodeURIComponent('Gina'), encodeURIComponent('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'), 40000); } catch(e){}
            }

            alert('\u2705 \u6210\u529F\u89E3\u6790 Excel \u6A94\u6848\uFF01\u5DF2\u70BA\u60A8\u81EA\u52D5\u5E36\u5165\u6848\u4EF6\u540D\u7A31\u3001\u65E5\u671F\u3001\u5BA2\u6236\u3001\u8CA1\u52D9\u7D30\u7BC0\u8207 KOL \u4EBA\u9078\u3002');
            
            // Reset input
            input.value = '';
          }, 600);
        }

        (function handleProposalPreFill() {
          var data = ${proposalData ? JSON.stringify(proposalData) : "null"};
          if (!data) return;

          function runFilling() {
            var setVal = function(name, val) {
              var el = document.querySelector('input[name="'+name+'"]');
              if (el) {
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
              }
            };
            
            setVal('projectName', data.title);
            setVal('clientName', data.clientName);
            setVal('brand', data.clientName);

            if (data.acceptedKols && data.acceptedKols.length > 0) {
              data.acceptedKols.forEach(function(pk) {
                try {
                  kolDialogAdd(
                    pk.kolId, 
                    encodeURIComponent(pk.kolName), 
                    encodeURIComponent(pk.kolAvatarUrl || ''), 
                    pk.price
                  );
                } catch(e){}
              });
            }
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runFilling);
          } else {
            setTimeout(runFilling, 100);
          }
        })();
      `
    } }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 267,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(Group4, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV7(Title5, { order: 2, children: "\u5EFA\u7ACB\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 390,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7(Button5, { component: Link4, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 391,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 389,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(Card4, { withBorder: !0, children: /* @__PURE__ */ jsxDEV7(Form2, { method: "post", children: /* @__PURE__ */ jsxDEV7(Stack5, { gap: "lg", children: [
      /* @__PURE__ */ jsxDEV7(Box3, { children: [
        /* @__PURE__ */ jsxDEV7(Text5, { fw: 600, mb: "xs", children: "\u532F\u5165\u59D4\u520A\u55AE (Excel)" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 399,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7(
          "label",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              border: "2px dashed var(--mantine-color-blue-4)",
              borderRadius: "8px",
              backgroundColor: "var(--mantine-color-blue-light)",
              cursor: "pointer",
              transition: "background-color 0.2s"
            },
            onDragOver: (e) => {
              e.preventDefault(), e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-1)";
            },
            onDragLeave: (e) => {
              e.preventDefault(), e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
            },
            onDrop: (e) => {
              e.preventDefault(), e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
              let fileInput = document.getElementById("excel-upload-input");
              fileInput && e.dataTransfer.files.length > 0 && (fileInput.files = e.dataTransfer.files, handleExcelUpload(fileInput));
            },
            children: [
              /* @__PURE__ */ jsxDEV7("div", { style: { fontSize: 32, marginBottom: 8 }, children: "\u{1F4CA}" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 426,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV7(Text5, { fw: 600, color: "var(--mantine-color-blue-filled)", children: "\u9EDE\u64CA\u4E0A\u50B3\u6216\u62D6\u66F3 Excel \u6A94\u6848\u81F3\u6B64" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 427,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV7(Text5, { size: "sm", c: "dimmed", mt: 4, children: "\u652F\u63F4 .xlsx, .xls" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 428,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV7(
                "input",
                {
                  id: "excel-upload-input",
                  type: "file",
                  accept: ".xlsx, .xls, .csv",
                  style: { display: "none" },
                  onchange: "handleExcelUpload(this)"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 430,
                  columnNumber: 17
                },
                this
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 400,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 398,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Divider3, {}, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 440,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Box3, { children: [
        /* @__PURE__ */ jsxDEV7(Title5, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u57FA\u672C\u8CC7\u8A0A" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 444,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7(SimpleGrid4, { cols: { base: 1, md: 2 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "projectName", label: "\u5C08\u6848\u540D\u7A31", placeholder: "\u4F8B\u5982\uFF1A2026 Q1 \u5BB6\u96FB\u63A8\u5EE3", required: !0 }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 446,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Select2, { name: "clientName", label: "\u5BA2\u6236", searchable: !0, placeholder: "\u9078\u64C7\u5BA2\u6236", data: clientOptions }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 447,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "brand", label: "\u54C1\u724C", placeholder: "\u8ACB\u8F38\u5165\u54C1\u724C\u540D\u7A31" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 448,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(
            Select2,
            {
              name: "industries",
              label: "\u7522\u696D",
              placeholder: "\u9078\u64C7\u7522\u696D",
              data: availableIndustries.map((i) => ({ value: i, label: i }))
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 449,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "documentUrl", label: "\u59D4\u520A\u55AE\u9023\u7D50/\u9644\u4EF6", placeholder: "Google Drive \u6216 Dropbox \u9023\u7D50" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 455,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Select2, { name: "salesOwner", label: "\u8CA0\u8CAC\u696D\u52D9", searchable: !0, data: salesOptions }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 456,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Select2, { name: "kolManager", label: "\u8CA0\u8CAC KOL Team Member", searchable: !0, data: kolManagerOptions }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 457,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "startDate", label: "\u958B\u59CB\u65E5", type: "date" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 458,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "endDate", label: "\u7D50\u675F\u65E5", type: "date" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 459,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 445,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 443,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Divider3, {}, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 463,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Box3, { children: [
        /* @__PURE__ */ jsxDEV7(Title5, { order: 4, mb: "sm", children: "\u5408\u4F5C\u5167\u5BB9\u8207\u8CA1\u52D9\u8CC7\u8A0A" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 467,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7(SimpleGrid4, { cols: { base: 1, md: 2 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "services", label: "\u5408\u4F5C\u5167\u5BB9", placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 469,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "authorization", label: "\u6388\u6B0A\u9805\u76EE", placeholder: "\u4F8B\u5982\uFF1A\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 470,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "projectQuote", label: "\u5C08\u6848\u5831\u50F9 (\u672A\u7A05)", type: "number", placeholder: "0" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 471,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "taxRate", label: "\u7A05\u7387 (%)", type: "number", defaultValue: "5" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 472,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "totalAmount", label: "\u5C08\u6848\u7E3D\u91D1\u984D (\u542B\u7A05)", type: "number", placeholder: "0" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 473,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 468,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 466,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Divider3, {}, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 477,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Box3, { children: [
        /* @__PURE__ */ jsxDEV7(Group4, { justify: "space-between", mb: "sm", children: [
          /* @__PURE__ */ jsxDEV7(Title5, { order: 4, children: "\u5408\u4F5C KOL" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 482,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(
            "button",
            {
              type: "button",
              "data-kol-dialog-open": "1",
              style: {
                padding: "8px 16px",
                borderRadius: 4,
                border: "1px solid var(--mantine-color-default-border)",
                background: "var(--mantine-color-default)",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                color: "var(--mantine-color-text)"
              },
              children: "\u9078\u64C7\u5408\u4F5C KOL"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 484,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 481,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7(
          "div",
          {
            id: "kol-selected-display",
            style: { minHeight: 40 },
            children: /* @__PURE__ */ jsxDEV7("p", { style: { fontSize: 14, color: "var(--mantine-color-dimmed)", margin: "8px 0" }, children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 507,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 503,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          "textarea",
          {
            id: "kol-selected-json",
            name: "selectedKolsJson",
            style: { display: "none" },
            defaultValue: "[]",
            readOnly: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 513,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 480,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Divider3, {}, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 522,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7(Box3, { children: [
        /* @__PURE__ */ jsxDEV7(Title5, { order: 4, mb: "sm", children: "\u5176\u4ED6\u8CC7\u8A0A" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 526,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7(Stack5, { children: [
          /* @__PURE__ */ jsxDEV7(Textarea3, { name: "description", label: "\u5C08\u6848\u8AAA\u660E", minRows: 4 }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 528,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Textarea3, { name: "internalNotes", label: "\u5167\u90E8\u5099\u8A3B", minRows: 3 }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 529,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(TextInput3, { name: "attachmentUrl", label: "\u9644\u4EF6\u4E0A\u50B3", placeholder: "\u53EF\u5148\u8CBC\u6A94\u6848\u9023\u7D50\uFF0C\u5F8C\u7E8C\u63A5\u771F\u4E0A\u50B3" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 530,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 527,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 525,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV7(Alert, { color: "red", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 534,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ jsxDEV7(Group4, { justify: "space-between", children: [
        /* @__PURE__ */ jsxDEV7(Button5, { component: Link4, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 537,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7(Group4, { children: [
          /* @__PURE__ */ jsxDEV7(Button5, { type: "submit", name: "intent", value: "draft", variant: "default", loading: submitting, children: "\u5132\u5B58\u8349\u7A3F" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 539,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Button5, { type: "submit", name: "intent", value: "create", loading: submitting, children: "\u5EFA\u7ACB\u59D4\u520A\u55AE" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 540,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.new.tsx",
          lineNumber: 538,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 536,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 396,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 395,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 394,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(
      "dialog",
      {
        id: "kol-select-dialog",
        style: {
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          width: "100%",
          maxWidth: 600,
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)"
        },
        children: [
          /* @__PURE__ */ jsxDEV7("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxDEV7("strong", { style: { fontSize: 18 }, children: "\u9078\u64C7\u5408\u4F5C KOL" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 562,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV7(
              "button",
              {
                type: "button",
                "data-kol-dialog-close": "1",
                style: { background: "none", border: "none", cursor: "pointer", fontSize: 20 },
                children: "\u2715"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 563,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 561,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV7(
            "input",
            {
              id: "kol-dialog-search",
              type: "text",
              placeholder: "\u641C\u5C0B KOL \u540D\u7A31\u3001\u5E33\u865F\u6216\u7522\u696D",
              style: {
                width: "100%",
                padding: "8px 12px",
                border: "1px solid var(--mantine-color-default-border)",
                borderRadius: 4,
                fontSize: 14,
                background: "var(--mantine-color-body)",
                color: "var(--mantine-color-text)",
                boxSizing: "border-box"
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 569,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(
            "div",
            {
              id: "kol-dialog-list",
              style: { maxHeight: 400, overflowY: "auto", marginTop: 12, paddingRight: 4 }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 584,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7("div", { style: { marginTop: 16, textAlign: "right" }, children: /* @__PURE__ */ jsxDEV7(
            "button",
            {
              type: "button",
              "data-kol-dialog-close": "1",
              style: { padding: "8px 20px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 },
              children: "\u5B8C\u6210\u9078\u64C7"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 589,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 588,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 548,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders.new.tsx",
    lineNumber: 256,
    columnNumber: 5
  }, this);
}

// app/routes/_app.kols.$kolId._index.tsx
var app_kols_kolId_index_exports = {};
__export(app_kols_kolId_index_exports, {
  default: () => KolDetailPage,
  loader: () => loader5
});
import {
  Avatar as Avatar3,
  Badge as Badge4,
  Box as Box4,
  Button as Button6,
  Card as Card5,
  Grid as Grid3,
  Group as Group5,
  Modal as Modal3,
  Progress,
  Stack as Stack6,
  Text as Text6,
  Title as Title6
} from "@mantine/core";
import { json as json5 } from "@remix-run/node";
import { Link as Link5, useLoaderData as useLoaderData5 } from "@remix-run/react";
import { useMemo as useMemo2, useState as useState4 } from "react";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
function formatNumber(value) {
  return (value ?? 0).toLocaleString("zh-TW");
}
function formatCurrency(value) {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}
function SparkLine({ points }) {
  let mapped = useMemo2(() => {
    if (points.length === 0)
      return [];
    let max = Math.max(...points.map((p) => p.price)), min = Math.min(...points.map((p) => p.price)), range = Math.max(1, max - min);
    return points.map((p, index) => {
      let x = 24 + index * 572 / Math.max(1, points.length - 1), y = 220 - 24 - (p.price - min) / range * (220 - 24 * 2);
      return { ...p, x, y };
    });
  }, [points]), path = mapped.map((p) => `${p.x},${p.y}`).join(" ");
  return /* @__PURE__ */ jsxDEV8(Box4, { children: [
    /* @__PURE__ */ jsxDEV8("svg", { width: "100%", viewBox: "0 0 620 220", role: "img", "aria-label": "price trend", children: [
      /* @__PURE__ */ jsxDEV8("line", { x1: 24, y1: 220 - 24, x2: 620 - 24, y2: 220 - 24, stroke: "#cbd5e1" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8("line", { x1: 24, y1: 24, x2: 24, y2: 220 - 24, stroke: "#cbd5e1" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8("polyline", { fill: "none", stroke: "#228be6", strokeWidth: "3", points: path }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      mapped.map((p) => /* @__PURE__ */ jsxDEV8("circle", { cx: p.x, cy: p.y, r: "4", fill: "#228be6" }, p.date, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 53,
        columnNumber: 11
      }, this))
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", children: points.map((p) => /* @__PURE__ */ jsxDEV8(Text6, { size: "xs", c: "dimmed", children: p.date }, p.date, !1, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 58,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.$kolId._index.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
}
async function loader5({ params, request }) {
  let kol = await getKol(params.kolId ?? "");
  if (!kol)
    throw new Response("Not Found", { status: 404 });
  let url = new URL(request.url), tab = url.searchParams.get("tab") ?? "projects", limit = Math.max(5, Number(url.searchParams.get("limit") ?? "5"));
  return json5({ kol, tab, limit });
}
function KolDetailPage() {
  let { kol, tab, limit } = useLoaderData5(), [contactOpened, setContactOpened] = useState4(!1), history = kol.collaborationHistory ?? [], visibleHistory = history.slice(0, limit), hasMore = limit < history.length, avgPrice = kol.averagePrice ?? (history.length > 0 ? Math.round(history.reduce((sum, row) => sum + row.price, 0) / history.length) : 0), avgRating = kol.rating ?? (history.length > 0 ? history.reduce((sum, row) => sum + row.rating, 0) / history.length : 0), collabCount = kol.collaborations ?? history.length, stats = kol.performanceStats ?? {}, platformPerf = stats.platformPerformance ?? {}, handleDownloadReport = () => {
    let report = {
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
    }, blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }), url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url, a.download = `KOL-Report-${kol.displayName}-${kol.id}.json`, document.body.appendChild(a), a.click(), a.remove(), URL.revokeObjectURL(url);
  }, tabStyle = (value) => ({
    padding: "8px 16px",
    borderBottom: tab === value ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
    color: tab === value ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    textDecoration: "none",
    fontWeight: tab === value ? 600 : 400,
    fontSize: 14,
    display: "inline-block"
  });
  return /* @__PURE__ */ jsxDEV8(Stack6, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV8(Group5, { gap: 8, children: [
      /* @__PURE__ */ jsxDEV8(Link5, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8(Text6, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8(Text6, { fw: 600, children: kol.displayName }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 145,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(Grid3, { children: [
      /* @__PURE__ */ jsxDEV8(Grid3.Col, { span: { base: 12, lg: 9 }, children: [
        /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, p: "lg", children: [
          /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", align: "flex-start", wrap: "nowrap", children: [
            /* @__PURE__ */ jsxDEV8(Group5, { align: "flex-start", wrap: "nowrap", children: [
              /* @__PURE__ */ jsxDEV8(Avatar3, { src: kol.avatarUrl, size: 96, radius: 999 }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 154,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV8(Stack6, { gap: 6, children: [
                /* @__PURE__ */ jsxDEV8(Title6, { order: 2, children: kol.displayName }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 156,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV8(Text6, { children: [
                  "Instagram: @",
                  kol.instagramHandle ?? "-",
                  " | ",
                  formatNumber(kol.social?.instagram ?? kol.followers),
                  " \u7C89\u7D72"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 157,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV8(Text6, { children: [
                  "YouTube: ",
                  formatNumber(kol.social?.youtube ?? kol.youtubeSubscribers),
                  " \u8A02\u95B1"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 158,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV8(Group5, { gap: 6, children: (kol.tags ?? kol.categories).map((tag) => /* @__PURE__ */ jsxDEV8(Badge4, { variant: "light", radius: "xl", children: tag }, tag, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 161,
                  columnNumber: 23
                }, this)) }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 159,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV8(Stack6, { align: "flex-end", gap: 6, children: [
              /* @__PURE__ */ jsxDEV8(Text6, { children: [
                "\u2B50 ",
                avgRating.toFixed(1),
                " (",
                collabCount,
                " \u6B21\u5408\u4F5C)"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 167,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV8(Text6, { children: [
                "\u5E73\u5747\u50F9\u683C: ",
                formatCurrency(avgPrice)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 168,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV8(Group5, { gap: 6, children: (kol.industryDistribution ?? [kol.industry ?? "\u672A\u5206\u985E"]).map((industry) => /* @__PURE__ */ jsxDEV8(Badge4, { color: "gray", variant: "light", children: industry }, industry, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 171,
                columnNumber: 21
              }, this)) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 169,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 166,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV8(Group5, { mt: "md", children: [
            /* @__PURE__ */ jsxDEV8(Link5, { to: kol.isFavorite ? "/favorites" : `/kols/${kol.id}`, style: { padding: "6px 14px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", textDecoration: "none", fontSize: 14 }, children: kol.isFavorite ? "\u2764\uFE0F \u5DF2\u6536\u85CF" : "\u{1F497} \u52A0\u5165\u6536\u85CF" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 177,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV8(
              Button6,
              {
                type: "button",
                variant: "default",
                size: "xs",
                onClick: () => setContactOpened(!0),
                children: "\u{1F4DE} \u67E5\u770B\u806F\u7D61\u65B9\u5F0F"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 180,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV8(Button6, { type: "button", variant: "default", size: "xs", onClick: handleDownloadReport, children: "\u{1F4CA} \u4E0B\u8F09 KOL \u5831\u544A" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 188,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 151,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV8(
          Modal3,
          {
            id: "kol-contact-modal",
            opened: contactOpened,
            onClose: () => setContactOpened(!1),
            title: "\u806F\u7D61\u65B9\u5F0F",
            children: /* @__PURE__ */ jsxDEV8(Stack6, { gap: "sm", children: [
              /* @__PURE__ */ jsxDEV8(Text6, { children: [
                /* @__PURE__ */ jsxDEV8(Text6, { span: !0, fw: 600, children: "\u96FB\u8A71\uFF1A" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 202,
                  columnNumber: 17
                }, this),
                " ",
                kol.contact?.phone || "\u5C1A\u672A\u63D0\u4F9B"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 201,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(Text6, { children: [
                /* @__PURE__ */ jsxDEV8(Text6, { span: !0, fw: 600, children: "Email\uFF1A" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 208,
                  columnNumber: 17
                }, this),
                " ",
                kol.contact?.email || "\u5C1A\u672A\u63D0\u4F9B"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 207,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(Button6, { type: "button", variant: "light", onClick: () => setContactOpened(!1), children: "\u95DC\u9589" }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 213,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 200,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 194,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, mt: "md", children: [
          /* @__PURE__ */ jsxDEV8("div", { style: { borderBottom: "1px solid var(--mantine-color-default-border)", marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxDEV8(Link5, { to: `/kols/${kol.id}?tab=projects&limit=${limit}`, style: tabStyle("projects"), children: "\u5408\u4F5C\u6848\u4EF6" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 222,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV8(Link5, { to: `/kols/${kol.id}?tab=price&limit=${limit}`, style: tabStyle("price"), children: "\u50F9\u683C\u8DA8\u52E2" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 223,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV8(Link5, { to: `/kols/${kol.id}?tab=performance&limit=${limit}`, style: tabStyle("performance"), children: "\u6210\u6548\u7D71\u8A08" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 224,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 221,
            columnNumber: 13
          }, this),
          tab === "projects" && /* @__PURE__ */ jsxDEV8(Stack6, { gap: "md", children: [
            visibleHistory.map((item, idx) => /* @__PURE__ */ jsxDEV8("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" }, children: [
              /* @__PURE__ */ jsxDEV8("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }, children: [
                /* @__PURE__ */ jsxDEV8("div", { style: { width: 20, height: 20, borderRadius: "50%", background: "var(--mantine-color-blue-filled)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 600, flexShrink: 0 }, children: idx + 1 }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 233,
                  columnNumber: 23
                }, this),
                idx < visibleHistory.length - 1 && /* @__PURE__ */ jsxDEV8("div", { style: { width: 2, flex: 1, minHeight: 16, background: "var(--mantine-color-default-border)", marginTop: 4 } }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 237,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 232,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, style: { flex: 1, marginBottom: 8 }, children: /* @__PURE__ */ jsxDEV8(Stack6, { gap: 8, children: [
                /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", align: "flex-start", children: [
                  /* @__PURE__ */ jsxDEV8(Stack6, { gap: 2, children: [
                    /* @__PURE__ */ jsxDEV8(Text6, { fw: 600, children: [
                      "\u{1F4CB} ",
                      /* @__PURE__ */ jsxDEV8(Link5, { to: item.orderId ? `/insertion-orders/${item.orderId}` : "#", children: item.projectTitle }, void 0, !1, {
                        fileName: "app/routes/_app.kols.$kolId._index.tsx",
                        lineNumber: 245,
                        columnNumber: 34
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 244,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", c: "dimmed", children: [
                      item.clientName,
                      " | \u7522\u696D: ",
                      item.industry
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 247,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 243,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV8(Stack6, { align: "flex-end", gap: 2, children: [
                    /* @__PURE__ */ jsxDEV8(Text6, { fw: 600, children: formatCurrency(item.price) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 250,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: [
                      "\u2B50 ",
                      item.rating.toFixed(1)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 251,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 249,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 242,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: [
                  "\u670D\u52D9\u9805\u76EE: ",
                  item.services
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 254,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV8(Group5, { gap: "lg", children: [
                  /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: [
                    "IG \u8CBC\u6587: \u{1F441}\uFE0F ",
                    formatNumber(item.metrics?.postViews),
                    " | \u{1F497} ",
                    formatNumber(item.metrics?.postLikes),
                    " | \u{1F4AC} ",
                    formatNumber(item.metrics?.postComments)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 256,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: [
                    "IG \u9650\u52D5: \u{1F441}\uFE0F ",
                    formatNumber(item.metrics?.storyViews),
                    " | \u{1F497} ",
                    formatNumber(item.metrics?.storyLikes)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 257,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 255,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV8(Group5, { justify: "flex-end", children: /* @__PURE__ */ jsxDEV8(Link5, { to: item.orderId ? `/insertion-orders/${item.orderId}` : "#", children: "\u67E5\u770B\u8A73\u7D30\u6210\u6548 \u2192" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 260,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 259,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 241,
                columnNumber: 23
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 240,
                columnNumber: 21
              }, this)
            ] }, item.id, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 231,
              columnNumber: 19
            }, this)),
            hasMore && /* @__PURE__ */ jsxDEV8(Group5, { justify: "center", mt: "md", children: /* @__PURE__ */ jsxDEV8(
              Link5,
              {
                to: `/kols/${kol.id}?tab=projects&limit=${limit + 3}`,
                style: {
                  padding: "8px 20px",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 14,
                  color: "var(--mantine-color-text)"
                },
                children: "\u8F09\u5165\u66F4\u591A"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 269,
                columnNumber: 21
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 268,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 229,
            columnNumber: 15
          }, this),
          tab === "price" && /* @__PURE__ */ jsxDEV8(Stack6, { children: [
            /* @__PURE__ */ jsxDEV8(Text6, { c: "dimmed", children: "X \u8EF8: \u65E5\u671F / Y \u8EF8: \u50F9\u683C (NT$)" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 290,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, children: /* @__PURE__ */ jsxDEV8(SparkLine, { points: kol.priceTrend ?? [] }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 292,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 291,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 289,
            columnNumber: 15
          }, this),
          tab === "performance" && /* @__PURE__ */ jsxDEV8(Stack6, { children: [
            /* @__PURE__ */ jsxDEV8(Grid3, { children: [
              /* @__PURE__ */ jsxDEV8(Grid3.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, children: [
                /* @__PURE__ */ jsxDEV8(Text6, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u89F8\u53CA" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 301,
                  columnNumber: 73
                }, this),
                /* @__PURE__ */ jsxDEV8(Title6, { order: 3, children: formatNumber(stats.averageReach) }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 301,
                  columnNumber: 111
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 301,
                columnNumber: 56
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 301,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV8(Grid3.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, children: [
                /* @__PURE__ */ jsxDEV8(Text6, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u4E92\u52D5\u7387" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 302,
                  columnNumber: 73
                }, this),
                /* @__PURE__ */ jsxDEV8(Title6, { order: 3, children: [
                  (stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1),
                  "%"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 302,
                  columnNumber: 112
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 302,
                columnNumber: 56
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 302,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV8(Grid3.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, children: [
                /* @__PURE__ */ jsxDEV8(Text6, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u89C0\u770B" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 303,
                  columnNumber: 73
                }, this),
                /* @__PURE__ */ jsxDEV8(Title6, { order: 3, children: formatNumber(stats.averageViews) }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 303,
                  columnNumber: 111
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 303,
                columnNumber: 56
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 303,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV8(Grid3.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, children: [
                /* @__PURE__ */ jsxDEV8(Text6, { c: "dimmed", size: "sm", children: "\u8F49\u63DB\u7387" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 304,
                  columnNumber: 73
                }, this),
                /* @__PURE__ */ jsxDEV8(Title6, { order: 3, children: [
                  (stats.conversionRate ?? 0).toFixed(1),
                  "%"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 304,
                  columnNumber: 110
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 304,
                columnNumber: 56
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 304,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 300,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, mt: "md", children: [
              /* @__PURE__ */ jsxDEV8(Text6, { fw: 600, mb: "sm", children: "\u5E73\u53F0\u6210\u6548\u6BD4\u8F03" }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 308,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV8(Stack6, { children: [
                /* @__PURE__ */ jsxDEV8(Box4, { children: [
                  /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", children: [
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: "Instagram" }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 311,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: formatNumber(platformPerf.instagram) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 311,
                      columnNumber: 86
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 311,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV8(Progress, { value: Math.min(100, (platformPerf.instagram ?? 0) / 1200) }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 312,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 310,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV8(Box4, { children: [
                  /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", children: [
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: "YouTube" }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 315,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: formatNumber(platformPerf.youtube) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 315,
                      columnNumber: 84
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 315,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV8(Progress, { value: Math.min(100, (platformPerf.youtube ?? 0) / 1200), color: "orange" }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 316,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 314,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV8(Box4, { children: [
                  /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", children: [
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: "TikTok" }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 319,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", children: formatNumber(platformPerf.tiktok) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 319,
                      columnNumber: 83
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 319,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV8(Progress, { value: Math.min(100, (platformPerf.tiktok ?? 0) / 1200), color: "grape" }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 320,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 318,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 309,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 307,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 299,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 220,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 149,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8(Grid3.Col, { span: { base: 12, lg: 3 }, children: /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV8(Title6, { order: 4, mb: "sm", children: "\u5FEB\u901F\u7D71\u8A08" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 331,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV8(Stack6, { gap: 8, children: [
          /* @__PURE__ */ jsxDEV8(Text6, { children: [
            "\u{1F4CA} \u5408\u4F5C\u6B21\u6578: ",
            collabCount,
            " \u6B21"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 333,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV8(Text6, { children: [
            "\u{1F4B0} \u5E73\u5747\u50F9\u683C: ",
            formatCurrency(avgPrice)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 334,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV8(Text6, { children: [
            "\u{1F3E2} \u5408\u4F5C\u7522\u696D: ",
            (kol.industryDistribution ?? []).join(" ") || (kol.industry ?? "-")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 335,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV8(Text6, { children: [
            "\u{1F441}\uFE0F \u5E73\u5747\u89F8\u53CA: ",
            formatNumber(stats.averageReach)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 336,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV8(Text6, { children: [
            "\u{1F497} \u5E73\u5747\u4E92\u52D5\u7387: ",
            (stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1),
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 337,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 332,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 330,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 329,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 148,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.$kolId._index.tsx",
    lineNumber: 141,
    columnNumber: 5
  }, this);
}

// app/routes/_app.kols.$kolId.edit.tsx
var app_kols_kolId_edit_exports = {};
__export(app_kols_kolId_edit_exports, {
  action: () => action4,
  default: () => KolEditPage,
  loader: () => loader6
});
import {
  Alert as Alert2,
  Avatar as Avatar4,
  Box as Box5,
  Button as Button7,
  Card as Card6,
  Divider as Divider4,
  Group as Group6,
  SimpleGrid as SimpleGrid5,
  Stack as Stack7,
  Text as Text7,
  TextInput as TextInput4,
  Textarea as Textarea4,
  Title as Title7
} from "@mantine/core";
import { json as json6, redirect as redirect2 } from "@remix-run/node";
import { Form as Form3, Link as Link6, useActionData as useActionData2, useLoaderData as useLoaderData6, useNavigation as useNavigation3 } from "@remix-run/react";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
async function loader6({ params }) {
  let kolId = params.kolId;
  if (!kolId)
    return json6({ error: "Missing KOL id" }, { status: 400 });
  let kol = await getKol(kolId);
  return kol ? json6({ kol }) : json6({ error: "KOL not found" }, { status: 404 });
}
async function action4({ request, params }) {
  let kolId = params.kolId;
  if (!kolId)
    return json6({ error: "Missing KOL id" }, { status: 400 });
  let formData = await request.formData(), displayName = String(formData.get("displayName") ?? "").trim(), instagramHandle = String(formData.get("instagramHandle") ?? "").trim(), industry = String(formData.get("industry") ?? "").trim(), tagsRaw = String(formData.get("tagsInput") ?? ""), followers = Number(formData.get("followers") ?? 0), rating = Number(formData.get("rating") ?? 0), collaborations = Number(formData.get("collaborations") ?? 0), avatarUrl = String(formData.get("avatarUrl") ?? "").trim(), phone = String(formData.get("contactPhone") ?? "").trim(), email = String(formData.get("email") ?? "").trim(), notes = String(formData.get("notes") ?? "").trim();
  if (!displayName)
    return json6({ error: "KOL \u540D\u7A31\u70BA\u5FC5\u586B" }, { status: 400 });
  let tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  return await updateKol(kolId, {
    displayName,
    instagramHandle: instagramHandle || void 0,
    industry: industry || void 0,
    tags,
    categories: tags.length > 0 ? tags : void 0,
    followers: Number.isFinite(followers) ? followers : 0,
    rating: Number.isFinite(rating) ? rating : 0,
    collaborations: Number.isFinite(collaborations) ? collaborations : 0,
    avatarUrl: avatarUrl || void 0,
    contact: { phone, email },
    notes: notes || void 0
  }), redirect2(`/kols/${kolId}`);
}
function KolEditPage() {
  let { kol } = useLoaderData6(), actionData = useActionData2(), submitting = useNavigation3().state === "submitting";
  return /* @__PURE__ */ jsxDEV9(Stack7, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV9(Group6, { gap: 8, children: [
      /* @__PURE__ */ jsxDEV9(Link6, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Link6, { to: `/kols/${kol.id}`, children: kol.displayName }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Text7, { fw: 600, children: "\u7DE8\u8F2F KOL" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, p: "lg", maw: 840, mx: "auto", w: "100%", children: /* @__PURE__ */ jsxDEV9(Form3, { method: "post", children: /* @__PURE__ */ jsxDEV9(Stack7, { gap: "xl", children: [
      /* @__PURE__ */ jsxDEV9(Box5, { children: [
        /* @__PURE__ */ jsxDEV9(Title7, { order: 3, mb: "md", children: "\u57FA\u672C\u8CC7\u6599" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV9(Group6, { align: "flex-start", gap: "xl", wrap: "wrap", children: [
          /* @__PURE__ */ jsxDEV9(Stack7, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ jsxDEV9(Avatar4, { src: kol.avatarUrl, radius: 999, size: 96 }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 93,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV9(Text7, { size: "xs", c: "dimmed", children: "\u982D\u50CF\u9810\u89BD" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 94,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 92,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV9(Stack7, { gap: "md", style: { flex: 1, minWidth: 260 }, children: [
            /* @__PURE__ */ jsxDEV9(
              TextInput4,
              {
                label: "KOL \u540D\u7A31 *",
                name: "displayName",
                defaultValue: kol.displayName,
                required: !0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 97,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV9(
              TextInput4,
              {
                label: "Instagram \u5E33\u865F",
                name: "instagramHandle",
                defaultValue: kol.instagramHandle ?? "",
                placeholder: "@username"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 103,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV9(
              TextInput4,
              {
                label: "\u7522\u696D",
                name: "industry",
                defaultValue: kol.industry ?? "",
                placeholder: "\u4F8B\u5982\uFF1A\u6BCD\u5B30 / \u7F8E\u599D"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 109,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV9(
              TextInput4,
              {
                label: "\u6A19\u7C64\uFF08\u9017\u865F\u5206\u9694\uFF09",
                name: "tagsInput",
                defaultValue: (kol.tags ?? kol.categories ?? []).join(", "),
                placeholder: "\u6BCD\u5B30, \u89AA\u5B50"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 115,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 96,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 91,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 89,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV9(Divider4, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 125,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV9(Box5, { children: [
        /* @__PURE__ */ jsxDEV9(Title7, { order: 3, mb: "md", children: "\u793E\u7FA4\u8207\u6210\u6548" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 128,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV9(SimpleGrid5, { cols: { base: 1, sm: 3 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV9(
            TextInput4,
            {
              label: "\u7C89\u7D72\u6578\uFF08IG\uFF09",
              name: "followers",
              type: "number",
              min: 0,
              defaultValue: kol.social?.instagram ?? kol.followers ?? 0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 130,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV9(
            TextInput4,
            {
              label: "\u8A55\u5206",
              name: "rating",
              type: "number",
              min: 0,
              max: 5,
              step: 0.1,
              defaultValue: kol.rating ?? 0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 137,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV9(
            TextInput4,
            {
              label: "\u5408\u4F5C\u6B21\u6578",
              name: "collaborations",
              type: "number",
              min: 0,
              defaultValue: kol.collaborations ?? 0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 146,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 129,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 127,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV9(Divider4, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 156,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV9(Box5, { children: [
        /* @__PURE__ */ jsxDEV9(Title7, { order: 3, mb: "md", children: "\u806F\u7D61\u8207\u5099\u8A3B" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 159,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV9(SimpleGrid5, { cols: { base: 1, sm: 2 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV9(
            TextInput4,
            {
              label: "\u806F\u7D61\u96FB\u8A71",
              name: "contactPhone",
              defaultValue: kol.contact?.phone ?? ""
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 161,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV9(
            TextInput4,
            {
              label: "Email",
              name: "email",
              type: "email",
              defaultValue: kol.contact?.email ?? ""
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 166,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV9(
          TextInput4,
          {
            mt: "md",
            label: "\u982D\u50CF\u7DB2\u5740",
            name: "avatarUrl",
            defaultValue: kol.avatarUrl ?? "",
            placeholder: "https://..."
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 173,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV9(
          Textarea4,
          {
            mt: "md",
            label: "\u5099\u8A3B",
            name: "notes",
            minRows: 4,
            defaultValue: kol.notes ?? ""
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 180,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 158,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV9(Alert2, { color: "red", title: "\u5132\u5B58\u5931\u6557", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 190,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ jsxDEV9(Button7, { component: Link6, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 196,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV9(Group6, { children: [
          /* @__PURE__ */ jsxDEV9(Button7, { component: Link6, to: `/kols/${kol.id}`, variant: "light", children: "\u56DE\u8A73\u7D30\u9801" }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 200,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV9(Button7, { type: "submit", loading: submitting, children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 203,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 199,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 195,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 87,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.$kolId.edit.tsx",
    lineNumber: 77,
    columnNumber: 5
  }, this);
}

// app/routes/_app.proposals._index.tsx
var app_proposals_index_exports = {};
__export(app_proposals_index_exports, {
  default: () => ProposalListPage,
  loader: () => loader7
});
import { Button as Button8, Card as Card7, Group as Group7, Stack as Stack8, Table as Table2, Text as Text8, Title as Title8 } from "@mantine/core";
import { json as json7 } from "@remix-run/node";
import { Link as Link7, useLoaderData as useLoaderData7 } from "@remix-run/react";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
async function loader7(_) {
  let proposals = await listProposals();
  return json7({ proposals });
}
function ProposalListPage() {
  let { proposals } = useLoaderData7();
  return /* @__PURE__ */ jsxDEV10(Stack8, { children: [
    /* @__PURE__ */ jsxDEV10(Group7, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV10(Title8, { order: 2, children: "\u63D0\u6848\u4E00\u89BD\u9801" }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10(Button8, { component: Link7, to: "/proposals/new", children: "\u65B0\u589E\u63D0\u6848" }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10(Card7, { withBorder: !0, children: /* @__PURE__ */ jsxDEV10(Table2, { striped: !0, children: [
      /* @__PURE__ */ jsxDEV10(Table2.Thead, { children: /* @__PURE__ */ jsxDEV10(Table2.Tr, { children: [
        /* @__PURE__ */ jsxDEV10(Table2.Th, { children: "\u6A19\u984C" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 27,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Th, { children: "\u5BA2\u6236" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 28,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Th, { children: "\u968E\u6BB5" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 29,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Th, { children: "\u9810\u7B97" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 30,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Th, { children: "\u622A\u6B62\u65E5" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 31,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 26,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV10(Table2.Tbody, { children: proposals.map((p) => /* @__PURE__ */ jsxDEV10(Table2.Tr, { children: [
        /* @__PURE__ */ jsxDEV10(Table2.Td, { children: /* @__PURE__ */ jsxDEV10(Link7, { to: `/proposals/${p.id}`, children: p.title }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 38,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 37,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Td, { children: p.clientName }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 40,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Td, { children: p.stage }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 41,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Td, { children: p.budget.toLocaleString() }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 42,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV10(Table2.Td, { children: p.dueDate }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 43,
          columnNumber: 17
        }, this)
      ] }, p.id, !0, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 36,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10(Text8, { c: "dimmed", size: "sm", children: "\u5047\u8CC7\u6599\u4F86\u6E90\uFF1Ajson-server" }, void 0, !1, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.proposals._index.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/routes/_app.reports.generate.tsx
var app_reports_generate_exports = {};
__export(app_reports_generate_exports, {
  default: () => ReportManagementPage,
  loader: () => loader8
});
import {
  Badge as Badge5,
  Box as Box6,
  Button as Button9,
  Card as Card8,
  Group as Group8,
  Stack as Stack9,
  Text as Text9,
  TextInput as TextInput5,
  Title as Title9
} from "@mantine/core";
import { json as json8 } from "@remix-run/node";
import { Link as Link8, useLoaderData as useLoaderData8 } from "@remix-run/react";
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
function formatShortDate(date) {
  return date.slice(0, 7);
}
async function loader8({ request }) {
  let url = new URL(request.url), clientFilter = url.searchParams.get("client") ?? "", timeFilter = url.searchParams.get("time") ?? "all", orders = await listInsertionOrders(), allClients = Array.from(new Set(orders.map((o) => o.clientName))), filtered = orders.filter((order) => !(clientFilter && order.clientName !== clientFilter || timeFilter === "this_year" && !order.startDate.startsWith("2026") || timeFilter === "2024_10" && !order.startDate.startsWith("2024-10")));
  return json8({ orders: filtered, allClients, clientFilter, timeFilter });
}
function ReportManagementPage() {
  let { orders, allClients, clientFilter, timeFilter } = useLoaderData8();
  return /* @__PURE__ */ jsxDEV11(Stack9, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV11(Group8, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsxDEV11(Title9, { order: 2, children: "\u7D50\u6848\u5831\u544A\u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      orders[0] && /* @__PURE__ */ jsxDEV11(
        Button9,
        {
          className: "btn-trigger-gen",
          "data-order-name": orders[0].title || orders[0].projectName,
          children: "+ \u751F\u6210\u65B0\u5831\u544A"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 46,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(Card8, { withBorder: !0, p: "sm", children: /* @__PURE__ */ jsxDEV11("form", { method: "get", children: /* @__PURE__ */ jsxDEV11(Group8, { align: "end", wrap: "wrap", gap: "sm", children: [
      /* @__PURE__ */ jsxDEV11(Stack9, { gap: 4, children: [
        /* @__PURE__ */ jsxDEV11(Text9, { size: "sm", fw: 500, children: "\u5BA2\u6236" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 60,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11("select", { name: "client", defaultValue: clientFilter, style: { padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }, children: [
          /* @__PURE__ */ jsxDEV11("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 62,
            columnNumber: 17
          }, this),
          allClients.map((c) => /* @__PURE__ */ jsxDEV11("option", { value: c, children: c }, c, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 63,
            columnNumber: 40
          }, this))
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 61,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 59,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV11(Stack9, { gap: 4, children: [
        /* @__PURE__ */ jsxDEV11(Text9, { size: "sm", fw: 500, children: "\u6642\u9593\u7BC4\u570D" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 67,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11("select", { name: "time", defaultValue: timeFilter, style: { padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }, children: [
          /* @__PURE__ */ jsxDEV11("option", { value: "all", children: "\u5168\u90E8" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 69,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV11("option", { value: "this_year", children: "2026 \u5E74" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 70,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV11("option", { value: "2024_10", children: "2024-10" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 71,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 68,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 66,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV11(Button9, { type: "submit", children: "\u5957\u7528\u7BE9\u9078" }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this),
      (clientFilter || timeFilter !== "all") && /* @__PURE__ */ jsxDEV11(Button9, { variant: "default", component: "a", href: "/reports/generate", children: "\u6E05\u9664" }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 76,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 58,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(Stack9, { gap: "md", children: orders.map((order) => {
      let missingCount = (order.collaborations ?? []).filter(
        (k) => !(k.performanceItems ?? []).some((p) => (p.metrics?.impressions ?? 0) > 0)
      ).length;
      return /* @__PURE__ */ jsxDEV11(Card8, { withBorder: !0, shadow: "sm", children: /* @__PURE__ */ jsxDEV11(Stack9, { gap: "md", children: [
        /* @__PURE__ */ jsxDEV11(Group8, { justify: "space-between", align: "flex-start", children: [
          /* @__PURE__ */ jsxDEV11(Box6, { children: [
            /* @__PURE__ */ jsxDEV11(Text9, { fw: 700, children: [
              "\u{1F4CB} #",
              order.orderNo,
              " ",
              order.title ?? order.projectName ?? "\u672A\u547D\u540D\u6848\u4EF6"
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 94,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV11(Text9, { c: "dimmed", size: "sm", children: [
              "\u5BA2\u6236: ",
              order.clientName,
              " | \u65E5\u671F: ",
              formatShortDate(order.startDate),
              " | \u5408\u4F5C KOL: ",
              order.kolCount ?? order.collaborations?.length ?? 0,
              " \u4F4D"
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 95,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 93,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV11(Group8, { children: [
            /* @__PURE__ */ jsxDEV11(Link8, { to: `/insertion-orders/${order.id}`, style: { fontSize: 14 }, children: "\u67E5\u770B\u6848\u4EF6\u8A73\u60C5" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 100,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV11(
              Button9,
              {
                size: "xs",
                className: "btn-trigger-gen",
                "data-order-name": order.title || order.projectName,
                children: "+ \u751F\u6210\u65B0\u5831\u544A"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 101,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 99,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        missingCount > 0 && /* @__PURE__ */ jsxDEV11(Badge5, { color: "yellow", variant: "light", children: [
          "\u26A0\uFE0F ",
          missingCount,
          " \u4F4D KOL \u5C1A\u672A\u4E0A\u50B3\u6210\u6548"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 112,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV11(Group8, { justify: "flex-end", children: /* @__PURE__ */ jsxDEV11(
          Button9,
          {
            variant: "default",
            size: "sm",
            className: "btn-trigger-upload",
            "data-order-name": order.title || order.projectName,
            children: "+ \u4E0A\u50B3\u6B63\u5F0F\u7248"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 116,
            columnNumber: 19
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 115,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 91,
        columnNumber: 15
      }, this) }, order.id, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 90,
        columnNumber: 13
      }, this);
    }) }, void 0, !1, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11("dialog", { id: "report-generate-dialog", style: { padding: 24, borderRadius: 8, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", color: "var(--mantine-color-text)", width: "100%", maxWidth: 640, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }, children: /* @__PURE__ */ jsxDEV11(Stack9, { gap: "md", children: [
      /* @__PURE__ */ jsxDEV11(Title9, { order: 4, children: [
        "\u751F\u6210\u7D50\u6848\u5831\u544A - ",
        /* @__PURE__ */ jsxDEV11("span", { className: "order-name-placeholder", children: "\u6848\u4EF6" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 134,
          columnNumber: 37
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 134,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { id: "gen-form-ui", children: [
        /* @__PURE__ */ jsxDEV11(TextInput5, { label: "\u5831\u544A\u6A19\u984C", placeholder: "OOO \u5C08\u6848\u7D50\u6848\u5831\u544A", id: "gen-report-title" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 137,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11(Text9, { size: "sm", mt: "sm", children: "\u9EDE\u64CA\u6309\u9215\u958B\u59CB AI \u5206\u6790\u8207\u751F\u6210\u904E\u7A0B\u3002" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 138,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11(Group8, { justify: "flex-end", mt: "md", children: [
          /* @__PURE__ */ jsxDEV11(Button9, { variant: "default", className: "btn-close-report-gen", children: "\u53D6\u6D88" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 140,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV11(Button9, { id: "start-gen-btn", color: "blue", children: "\u{1F916} \u958B\u59CB AI \u751F\u6210" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 141,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 136,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { id: "gen-progress-ui", style: { display: "none", padding: "20px 0" }, children: [
        /* @__PURE__ */ jsxDEV11(Text9, { id: "gen-status-text", ta: "center", fw: 700, mb: "xs", children: "\u6B63\u5728\u521D\u59CB\u5316..." }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 146,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11("div", { style: { width: "100%", height: 10, background: "#eee", borderRadius: 5, overflow: "hidden", marginBottom: 20 }, children: /* @__PURE__ */ jsxDEV11("div", { id: "gen-progress-bar", style: { width: "0%", height: "100%", background: "#339af0", transition: "width 0.3s" } }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 148,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 147,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11(Text9, { size: "xs", c: "dimmed", ta: "center", children: "AI \u6B63\u5728\u9032\u884C\u5167\u5BB9\u6DF1\u6F5B\u8207\u6578\u64DA\u4EA4\u53C9\u5206\u6790..." }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 150,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 145,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { id: "gen-success-ui", style: { display: "none", textAlign: "center", padding: "20px 0" }, children: [
        /* @__PURE__ */ jsxDEV11(Box6, { style: { fontSize: 40 }, children: "\u{1F389}" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 154,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11(Title9, { order: 3, children: "\u5831\u544A\u751F\u6210\u6210\u529F\uFF01" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 155,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11(Text9, { mb: "lg", children: "\u60A8\u7684 AI \u6578\u64DA\u6D1E\u5BDF\u7D50\u6848\u5831\u544A\u5DF2\u5099\u59A5\u3002" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 156,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11(Group8, { grow: !0, w: "100%", children: [
          /* @__PURE__ */ jsxDEV11(Button9, { variant: "default", className: "btn-close-report-gen", children: "\u95DC\u9589" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 158,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV11(Button9, { id: "download-ppt-btn", color: "green", children: "\u{1F4E5} \u4E0B\u8F09 PowerPoint" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 159,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 157,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 133,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 132,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11("dialog", { id: "report-upload-dialog", style: { padding: 24, borderRadius: 8, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", color: "var(--mantine-color-text)", width: "100%", maxWidth: 480, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }, children: /* @__PURE__ */ jsxDEV11(Stack9, { gap: "md", children: [
      /* @__PURE__ */ jsxDEV11(Title9, { order: 4, children: "\u4E0A\u50B3\u6B63\u5F0F\u7D50\u6848\u5831\u544A" }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 167,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11(Text9, { size: "sm", c: "dimmed", children: [
        "\u6848\u4EF6: ",
        /* @__PURE__ */ jsxDEV11("span", { className: "order-name-placeholder", children: "\u6848\u4EF6" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 168,
          columnNumber: 42
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 168,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11(TextInput5, { type: "file", label: "\u9078\u64C7\u6A94\u6848 (.pptx, .pdf)" }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11(TextInput5, { label: "\u7248\u672C\u8AAA\u660E (\u9078\u586B)", placeholder: "\u4F8B\u5982: \u5DF2\u6839\u64DA\u5BA2\u6236\u56DE\u994B\u4FEE\u6B63..." }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11(Group8, { justify: "flex-end", children: [
        /* @__PURE__ */ jsxDEV11(Button9, { variant: "default", className: "btn-close-report-upload", children: "\u53D6\u6D88" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 172,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV11(Button9, { id: "confirm-upload-btn", color: "blue", children: "\u78BA\u8A8D\u4E0A\u50B3" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 171,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 166,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 165,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(
      "script",
      {
        dangerouslySetInnerHTML: {
          __html: `
(function() {
  function bindDialogTriggers() {
    var genBtns = document.querySelectorAll('.btn-trigger-gen');
    var uploadBtns = document.querySelectorAll('.btn-trigger-upload');
    var genDialog = document.getElementById('report-generate-dialog');
    var uploadDialog = document.getElementById('report-upload-dialog');

    function bind(btns, dialog) {
      if (!dialog) return;
      btns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var name = btn.getAttribute('data-order-name');
          dialog.querySelectorAll('.order-name-placeholder').forEach(function(p) { p.textContent = name; });
          dialog.showModal();
          
          if (dialog.id === 'report-generate-dialog') {
            document.getElementById('gen-form-ui').style.display = 'block';
            document.getElementById('gen-progress-ui').style.display = 'none';
            document.getElementById('gen-success-ui').style.display = 'none';
          }
        });
      });
    }

    bind(genBtns, genDialog);
    bind(uploadBtns, uploadDialog);

    // Bind close actions
    document.querySelectorAll('.btn-close-report-gen').forEach(function(btn) {
      btn.addEventListener('click', function() { if (genDialog) genDialog.close(); });
    });
    document.querySelectorAll('.btn-close-report-upload').forEach(function(btn) {
      btn.addEventListener('click', function() { if (uploadDialog) uploadDialog.close(); });
    });

    var downloadBtn = document.getElementById('download-ppt-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function() {
        alert('\u5831\u544A\u4E0B\u8F09\u4E2D...');
        if (genDialog) genDialog.close();
      });
    }

    var confirmUploadBtn = document.getElementById('confirm-upload-btn');
    if (confirmUploadBtn) {
      confirmUploadBtn.addEventListener('click', function() {
        alert('\u5DF2\u6210\u529F\u4E0A\u50B3\u6B63\u5F0F\u7248\u5831\u544A\uFF01');
        if (uploadDialog) uploadDialog.close();
      });
    }
  }

  bindDialogTriggers();

  // Filter Enter Trigger
  document.querySelectorAll('select[name="client"], select[name="time"]').forEach(function(el) {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.closest('form').submit();
      }
    });
  });

  var startGenBtn = document.getElementById('start-gen-btn');
  if (startGenBtn) {
    startGenBtn.addEventListener('click', function() {
      document.getElementById('gen-form-ui').style.display = 'none';
      document.getElementById('gen-progress-ui').style.display = 'block';
      
      var steps = [
        { p: 20, t: '\u{1F50D} \u6B63\u5728\u5F59\u6574\u6240\u6709 KOL \u7684\u6210\u6548\u6578\u64DA...' },
        { p: 45, t: '\u{1F9E0} AI \u6B63\u5728\u5206\u6790\u5404\u7248\u4F4D\u8868\u73FE\u4E26\u7522\u51FA\u6D1E\u5BDF...' },
        { p: 75, t: '\u270D\uFE0F \u6B63\u5728\u81EA\u52D5\u64B0\u5BEB\u57F7\u884C\u6458\u8981\u8207\u5EFA\u8B70\u8A55\u8A9E...' },
        { p: 90, t: '\u{1F3A8} \u6B63\u5728\u5957\u7528\u6A19\u6E96\u6A21\u677F\u4E26\u8F38\u51FA PowerPoint...' },
        { p: 100, t: '\u2705 \u5831\u544A\u5DF2\u751F\u6210\u5B8C\u7562\uFF01' }
      ];
      
      var currentStep = 0;
      var progressBar = document.getElementById('gen-progress-bar');
      var statusText = document.getElementById('gen-status-text');
      
      var interval = setInterval(function() {
        if (currentStep < steps.length) {
          if (progressBar) progressBar.style.width = steps[currentStep].p + '%';
          if (statusText) statusText.textContent = steps[currentStep].t;
          currentStep++;
        } else {
          clearInterval(interval);
          setTimeout(function() {
            document.getElementById('gen-progress-ui').style.display = 'none';
            document.getElementById('gen-success-ui').style.display = 'block';
          }, 500);
        }
      }, 1000);
    });
  }
})();
          `
        }
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 178,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.reports.generate.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}

// app/routes/api.social-followers.ts
var api_social_followers_exports = {};
__export(api_social_followers_exports, {
  loader: () => loader9
});
import { json as json9 } from "@remix-run/node";
function hashString(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1)
    h = (h << 5) - h + input.charCodeAt(i), h |= 0;
  return Math.abs(h);
}
async function loader9({ request }) {
  let url = new URL(request.url), platform = (url.searchParams.get("platform") ?? "").toLowerCase(), profileUrl = url.searchParams.get("url") ?? "";
  if (!platform || !profileUrl)
    return json9({ error: "platform and url are required" }, { status: 400 });
  let seed = hashString(`${platform}:${profileUrl}`), followers = ({
    instagram: 3e4,
    youtube: 18e3,
    tiktok: 45e3,
    facebook: 12e3,
    threads: 8e3
  }[platform] ?? 1e4) + seed % 25e4;
  return json9({ platform, url: profileUrl, followers, source: "mock-api" });
}

// app/routes/api.ai-parse-order.ts
var api_ai_parse_order_exports = {};
__export(api_ai_parse_order_exports, {
  loader: () => loader10
});
import { json as json10 } from "@remix-run/node";
function hashString2(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1)
    h = (h << 5) - h + input.charCodeAt(i), h |= 0;
  return Math.abs(h);
}
async function loader10({ request }) {
  let filename = new URL(request.url).searchParams.get("filename") ?? "campaign.pdf", seed = hashString2(filename.toLowerCase()), clients = ["Panasonic", "Happy Food", "DermaLab", "Aqua Home", "NovaTech"], industries = ["\u5BB6\u96FB", "\u98DF\u54C1", "\u7F8E\u599D", "3C", "\u6BCD\u5B30"], salesOwners = ["Amy", "Nina", "Leo"], kolManagers = ["John", "Cindy", "Mia"], client = clients[seed % clients.length], industry = industries[seed % industries.length];
  return json10({
    parsed: {
      projectName: `${client} \u6625\u5B63\u6574\u5408\u63A8\u5EE3`,
      clientName: client,
      brand: client,
      industries: [industry],
      documentUrl: `https://example.com/uploads/${encodeURIComponent(filename)}`,
      salesOwner: salesOwners[seed % salesOwners.length],
      kolManager: kolManagers[seed % kolManagers.length],
      description: `\u7531 ${filename} \u89E3\u6790\u51FA\u7684\u521D\u6B65\u5C08\u6848\u8CC7\u8A0A\uFF0C\u8ACB\u78BA\u8A8D\u6B04\u4F4D\u662F\u5426\u6B63\u78BA\u3002`
    },
    detectedFields: 7
  });
}

// app/routes/_app.proposals.new.tsx
var app_proposals_new_exports = {};
__export(app_proposals_new_exports, {
  action: () => action5,
  default: () => ProposalCreatePage
});
import { Button as Button10, Card as Card9, Group as Group9, Stack as Stack10, TextInput as TextInput6, Title as Title10 } from "@mantine/core";
import { json as json11, redirect as redirect3 } from "@remix-run/node";
import { Form as Form4, Link as Link9, useActionData as useActionData3 } from "@remix-run/react";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
async function action5({ request }) {
  let formData = await request.formData(), title = String(formData.get("title") ?? "").trim(), clientName = String(formData.get("clientName") ?? "").trim(), budget = Number(formData.get("budget") ?? 0), dueDate = String(formData.get("dueDate") ?? "").trim();
  if (!title || !clientName)
    return json11({ error: "\u6A19\u984C\u8207\u5BA2\u6236\u70BA\u5FC5\u586B" }, { status: 400 });
  let payload = {
    title,
    clientName,
    budget,
    dueDate: dueDate || "TBD",
    stage: "draft"
  };
  return (await fetch(`${MOCK_API_BASE}/proposals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })).ok ? redirect3("/proposals") : json11({ error: "\u5EFA\u7ACB\u5931\u6557" }, { status: 500 });
}
function ProposalCreatePage() {
  let actionData = useActionData3();
  return /* @__PURE__ */ jsxDEV12(Stack10, { children: [
    /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV12(Title10, { order: 2, children: "\u63D0\u6848\u5EFA\u6A94\u9801" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(Link9, { to: "/proposals", children: "\u56DE\u63D0\u6848\u4E00\u89BD" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.new.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, children: /* @__PURE__ */ jsxDEV12(Form4, { method: "post", children: /* @__PURE__ */ jsxDEV12(Stack10, { children: [
      /* @__PURE__ */ jsxDEV12(TextInput6, { name: "title", label: "\u63D0\u6848\u6A19\u984C", required: !0 }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 47,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV12(TextInput6, { name: "clientName", label: "\u5BA2\u6236\u540D\u7A31", required: !0 }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 48,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV12(TextInput6, { name: "budget", label: "\u9810\u7B97", defaultValue: "0" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 49,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV12(TextInput6, { name: "dueDate", label: "\u622A\u6B62\u65E5", placeholder: "2026-03-20" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 50,
        columnNumber: 13
      }, this),
      actionData?.error ? /* @__PURE__ */ jsxDEV12("div", { style: { color: "red" }, children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 51,
        columnNumber: 34
      }, this) : null,
      /* @__PURE__ */ jsxDEV12(Button10, { type: "submit", children: "\u5EFA\u7ACB\u63D0\u6848" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 52,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.new.tsx",
      lineNumber: 46,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals.new.tsx",
      lineNumber: 45,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals.new.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.proposals.new.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}

// app/routes/_app.kols._index.tsx
var app_kols_index_exports = {};
__export(app_kols_index_exports, {
  action: () => action6,
  default: () => KolListPage,
  loader: () => loader11
});
import {
  Alert as Alert3,
  Avatar as Avatar5,
  Badge as Badge6,
  Box as Box7,
  Button as Button11,
  Card as Card10,
  Divider as Divider5,
  Group as Group10,
  SimpleGrid as SimpleGrid6,
  Stack as Stack11,
  Table as Table3,
  Text as Text10,
  Title as Title11
} from "@mantine/core";
import { json as json12, redirect as redirect4 } from "@remix-run/node";
import { Form as Form5, Link as Link10, useLoaderData as useLoaderData9 } from "@remix-run/react";
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var FOLLOWER_RANGES = [
  { key: "1000", label: "1,000+", min: 1e3 },
  { key: "5000", label: "5,000+", min: 5e3 },
  { key: "10000", label: "10K+", min: 1e4 },
  { key: "50000", label: "50K+", min: 5e4 },
  { key: "100000", label: "100K+", min: 1e5 }
];
function getPrimaryTags(kol) {
  return kol.tags && kol.tags.length > 0 ? kol.tags : kol.categories ?? [];
}
function getFollowerBase(kol) {
  return kol.social?.instagram ?? kol.followers ?? 0;
}
async function loader11({ request }) {
  let sp = new URL(request.url).searchParams, q = sp.get("q")?.trim().toLowerCase() ?? "", view = sp.get("view") === "table" ? "table" : "card", sortKey = sp.get("sort") ?? "followers", sortOrder = sp.get("order") ?? "desc", page = Math.max(1, Number(sp.get("page") ?? "1")), showFilters = sp.get("panel") === "filters", deleted = sp.get("deleted") === "1", followerRanges = sp.getAll("fr"), industries = sp.getAll("ind"), tags = sp.getAll("tag"), minRating = Number(sp.get("minRating") ?? "0"), maxRating = Number(sp.get("maxRating") ?? "5"), kols = await listKols();
  q && (kols = kols.filter((kol) => {
    let t = getPrimaryTags(kol);
    return kol.displayName.toLowerCase().includes(q) || (kol.instagramHandle ?? "").toLowerCase().includes(q) || (kol.industry ?? "").toLowerCase().includes(q) || t.some((tag) => tag.toLowerCase().includes(q));
  })), followerRanges.length > 0 && (kols = kols.filter((kol) => {
    let base = getFollowerBase(kol);
    return followerRanges.some((rk) => {
      let range = FOLLOWER_RANGES.find((r) => r.key === rk);
      return range ? base >= range.min : !1;
    });
  })), industries.length > 0 && (kols = kols.filter((kol) => industries.includes(kol.industry ?? ""))), tags.length > 0 && (kols = kols.filter((kol) => {
    let t = getPrimaryTags(kol);
    return tags.every((tag) => t.includes(tag));
  })), kols = kols.filter((kol) => {
    let r = kol.rating ?? 0;
    return r >= minRating && r <= maxRating;
  });
  let m = sortOrder === "asc" ? 1 : -1;
  kols.sort((a, b) => sortKey === "name" ? a.displayName.localeCompare(b.displayName) * m : sortKey === "followers" ? (getFollowerBase(a) - getFollowerBase(b)) * m : sortKey === "rating" ? ((a.rating ?? 0) - (b.rating ?? 0)) * m : ((a.collaborations ?? 0) - (b.collaborations ?? 0)) * m);
  let pageSize = view === "card" ? 8 : 10, totalPages = Math.max(1, Math.ceil(kols.length / pageSize)), safePageNo = Math.min(page, totalPages), pageRows = kols.slice((safePageNo - 1) * pageSize, safePageNo * pageSize), allKols = await listKols(), allIndustries = [...new Set(allKols.map((k) => k.industry).filter(Boolean))], allTags = [...new Set(allKols.flatMap((k) => getPrimaryTags(k)))];
  return json12({
    deleted,
    pageRows,
    total: kols.length,
    totalPages,
    page: safePageNo,
    pageSize,
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
    // active filter count for badge
    activeFilterCount: followerRanges.length + industries.length + tags.length + (minRating > 0 || maxRating < 5 ? 1 : 0)
  });
}
async function action6({ request }) {
  let formData = await request.formData(), intent = formData.get("intent"), kolId = String(formData.get("kolId") ?? "");
  if (intent === "toggleFavorite") {
    let isFavorite = formData.get("isFavorite") === "true";
    if (!kolId)
      return json12({ error: "Missing KOL id" }, { status: 400 });
    await updateKol(kolId, { isFavorite: !isFavorite });
    let url = new URL(request.url);
    return redirect4(url.pathname + url.search);
  }
  if (intent === "delete") {
    if (!kolId)
      return json12({ error: "Missing KOL id" }, { status: 400 });
    await deleteKol(kolId);
    let url = new URL(request.url);
    return url.searchParams.set("deleted", "1"), redirect4(url.pathname + "?" + url.searchParams.toString());
  }
  return null;
}
function buildUrl(base, overrides) {
  let out = new URLSearchParams();
  for (let [k, v] of Object.entries(base))
    Array.isArray(v) ? v.forEach((val) => out.append(k, val)) : v && out.set(k, v);
  for (let [k, v] of Object.entries(overrides))
    out.delete(k), v !== null && (Array.isArray(v) ? v.forEach((val) => out.append(k, val)) : v && out.set(k, v));
  return out.delete("page"), `?${out.toString()}`;
}
function KolListPage() {
  let {
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
  } = useLoaderData9(), current = {
    ...deleted ? { deleted: "1" } : {},
    ...q ? { q } : {},
    view,
    sort: sortKey,
    order: sortOrder,
    ...followerRanges.length ? { fr: followerRanges } : {},
    ...industries.length ? { ind: industries } : {},
    ...tags.length ? { tag: tags } : {},
    ...minRating > 0 ? { minRating: String(minRating) } : {},
    ...maxRating < 5 ? { maxRating: String(maxRating) } : {},
    ...showFilters ? { panel: "filters" } : {}
  };
  function sortUrl(key) {
    return buildUrl(current, { sort: key, order: key === sortKey ? sortOrder === "asc" ? "desc" : "asc" : "desc" });
  }
  function sortLabel(key) {
    return key !== sortKey ? "" : sortOrder === "asc" ? " \u2191" : " \u2193";
  }
  return /* @__PURE__ */ jsxDEV13(Stack11, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV13(
      "script",
      {
        dangerouslySetInnerHTML: {
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
        }
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 249,
        columnNumber: 7
      },
      this
    ),
    deleted && /* @__PURE__ */ jsxDEV13(Alert3, { color: "green", variant: "light", children: [
      "KOL \u5DF2\u522A\u9664\u6210\u529F\u3002",
      /* @__PURE__ */ jsxDEV13(
        "a",
        {
          href: buildUrl(current, { deleted: null }),
          style: { marginLeft: 12, color: "var(--mantine-color-green-filled)", textDecoration: "none", fontWeight: 600 },
          children: "\u95DC\u9589"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 267,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 265,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV13(Group10, { justify: "space-between", align: "flex-end", children: [
      /* @__PURE__ */ jsxDEV13(Box7, { children: [
        /* @__PURE__ */ jsxDEV13(Text10, { c: "dimmed", size: "sm", children: "KOL \u7BA1\u7406" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 279,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV13(Title11, { order: 2, children: "KOL \u4E00\u89BD" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 280,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 278,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(Group10, { gap: "md", align: "flex-end", children: [
        /* @__PURE__ */ jsxDEV13(Group10, { gap: 0, style: { border: "1px solid var(--mantine-color-default-border)", borderRadius: 6, overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxDEV13(
            "a",
            {
              href: buildUrl(current, { view: "card" }),
              style: {
                padding: "7px 18px",
                background: view === "card" ? "var(--mantine-color-blue-filled)" : "transparent",
                color: view === "card" ? "#fff" : "var(--mantine-color-text)",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-block",
                borderRight: "1px solid var(--mantine-color-default-border)"
              },
              children: "\u5361\u7247"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 285,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV13(
            "a",
            {
              href: buildUrl(current, { view: "table" }),
              style: {
                padding: "7px 18px",
                background: view === "table" ? "var(--mantine-color-blue-filled)" : "transparent",
                color: view === "table" ? "#fff" : "var(--mantine-color-text)",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-block"
              },
              children: "\u8868\u683C"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 296,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 284,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV13(Group10, { gap: "sm", children: [
          /* @__PURE__ */ jsxDEV13(
            "button",
            {
              type: "button",
              style: { padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 },
              onClick: () => {
                let dlg = document.getElementById("kol-batch-import-dialog");
                dlg && dlg.showModal();
              },
              children: "\u{1F4E5} \u6279\u91CF\u532F\u5165"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 309,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV13(Button11, { component: Link10, to: "/kols/new", children: "\u65B0\u589E KOL" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 316,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 308,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 283,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 277,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV13(Group10, { justify: "space-between", align: "flex-end", wrap: "nowrap", children: [
      /* @__PURE__ */ jsxDEV13("form", { method: "get", action: "/kols", style: { flex: 1, maxWidth: 520, display: "flex", gap: 8 }, children: [
        view !== "card" && /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "view", value: view }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 329,
          columnNumber: 31
        }, this),
        sortKey !== "followers" && /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "sort", value: sortKey }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 330,
          columnNumber: 39
        }, this),
        sortOrder !== "desc" && /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "order", value: sortOrder }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 331,
          columnNumber: 36
        }, this),
        showFilters && /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "panel", value: "filters" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 332,
          columnNumber: 27
        }, this),
        followerRanges.map((r) => /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "fr", value: r }, r, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 333,
          columnNumber: 38
        }, this)),
        industries.map((i) => /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "ind", value: i }, i, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 334,
          columnNumber: 34
        }, this)),
        tags.map((t) => /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "tag", value: t }, t, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 335,
          columnNumber: 28
        }, this)),
        minRating > 0 && /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "minRating", value: String(minRating) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 336,
          columnNumber: 29
        }, this),
        maxRating < 5 && /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "maxRating", value: String(maxRating) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 337,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV13(
          "input",
          {
            name: "q",
            defaultValue: q,
            placeholder: "\u641C\u5C0B KOL \u540D\u7A31\u3001@\u5E33\u865F\u3001\u7522\u696D\u6216\u6A19\u7C64\uFF08\u6309 Enter \u641C\u5C0B\uFF09",
            style: {
              flex: 1,
              padding: "8px 12px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 6,
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)",
              fontSize: 14
            }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 339,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV13(
          "button",
          {
            type: "submit",
            style: {
              padding: "8px 16px",
              background: "var(--mantine-color-blue-filled)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500
            },
            children: "\u641C\u5C0B"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 353,
            columnNumber: 11
          },
          this
        ),
        q && /* @__PURE__ */ jsxDEV13(
          "a",
          {
            href: buildUrl(current, { q: null }),
            style: {
              padding: "8px 14px",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 6,
              textDecoration: "none",
              color: "var(--mantine-color-text)",
              fontSize: 14
            },
            children: "\u2715"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 367,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 327,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(
        "a",
        {
          href: buildUrl(current, { panel: showFilters ? null : "filters" }),
          style: {
            padding: "8px 16px",
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: 6,
            textDecoration: "none",
            color: activeFilterCount > 0 ? "#fff" : "var(--mantine-color-text)",
            background: activeFilterCount > 0 ? "var(--mantine-color-blue-filled)" : "transparent",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap"
          },
          children: [
            "\u2699 \u7BE9\u9078",
            activeFilterCount > 0 ? ` (${activeFilterCount})` : ""
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 382,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 322,
      columnNumber: 7
    }, this),
    showFilters && /* @__PURE__ */ jsxDEV13(Card10, { withBorder: !0, children: [
      /* @__PURE__ */ jsxDEV13(Text10, { fw: 600, mb: "md", children: "\u7BE9\u9078\u689D\u4EF6" }, void 0, !1, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 404,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13("form", { method: "get", action: "/kols", children: [
        /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "view", value: view }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 407,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "sort", value: sortKey }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 408,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "order", value: sortOrder }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 409,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "panel", value: "filters" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 410,
          columnNumber: 15
        }, this),
        q && /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "q", value: q }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 411,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Group10, { align: "flex-start", gap: "xl", wrap: "wrap", children: [
          /* @__PURE__ */ jsxDEV13(Box7, { style: { minWidth: 160 }, children: [
            /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", fw: 600, mb: 6, children: "\u7C89\u7D72\u6578" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 416,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV13(Stack11, { gap: 4, children: FOLLOWER_RANGES.map((r) => /* @__PURE__ */ jsxDEV13("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }, children: [
              /* @__PURE__ */ jsxDEV13(
                "input",
                {
                  type: "checkbox",
                  name: "fr",
                  value: r.key,
                  defaultChecked: followerRanges.includes(r.key)
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 420,
                  columnNumber: 25
                },
                this
              ),
              r.label
            ] }, r.key, !0, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 419,
              columnNumber: 23
            }, this)) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 417,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 415,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV13(Divider5, { orientation: "vertical" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 432,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV13(Box7, { style: { minWidth: 160 }, children: [
            /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", fw: 600, mb: 6, children: "\u7522\u696D\u5225" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 436,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV13(Stack11, { gap: 4, children: allIndustries.map((ind) => /* @__PURE__ */ jsxDEV13("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }, children: [
              /* @__PURE__ */ jsxDEV13(
                "input",
                {
                  type: "checkbox",
                  name: "ind",
                  value: ind,
                  defaultChecked: industries.includes(ind)
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 440,
                  columnNumber: 25
                },
                this
              ),
              ind
            ] }, ind, !0, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 439,
              columnNumber: 23
            }, this)) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 437,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 435,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV13(Divider5, { orientation: "vertical" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 452,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV13(Box7, { style: { minWidth: 200 }, children: [
            /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", fw: 600, mb: 6, children: "\u6A19\u7C64" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 456,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV13("script", { dangerouslySetInnerHTML: {
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
            } }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 458,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV13(Group10, { gap: 6, wrap: "wrap", children: allTags.map((tag) => /* @__PURE__ */ jsxDEV13(
              "label",
              {
                "data-tag-label": "1",
                style: {
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
                },
                children: [
                  /* @__PURE__ */ jsxDEV13(
                    "input",
                    {
                      type: "checkbox",
                      name: "tag",
                      value: tag,
                      defaultChecked: tags.includes(tag),
                      style: { display: "none" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.kols._index.tsx",
                      lineNumber: 495,
                      columnNumber: 25
                    },
                    this
                  ),
                  tag
                ]
              },
              tag,
              !0,
              {
                fileName: "app/routes/_app.kols._index.tsx",
                lineNumber: 475,
                columnNumber: 23
              },
              this
            )) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 473,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 455,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 413,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV13(Group10, { mt: "md", gap: "sm", children: [
          /* @__PURE__ */ jsxDEV13(
            "button",
            {
              type: "submit",
              style: {
                padding: "8px 20px",
                background: "var(--mantine-color-blue-filled)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 500,
                fontSize: 14
              },
              children: "\u5957\u7528\u7BE9\u9078"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 511,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV13(
            "a",
            {
              href: buildUrl({ view, sort: sortKey, order: sortOrder, panel: "filters" }, {}),
              style: {
                padding: "8px 20px",
                border: "1px solid var(--mantine-color-default-border)",
                borderRadius: 6,
                textDecoration: "none",
                color: "var(--mantine-color-text)",
                fontSize: 14
              },
              children: "\u6E05\u9664\u7BE9\u9078"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 524,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 510,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 405,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 403,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV13(Text10, { c: "dimmed", size: "sm", children: [
      "\u5171 ",
      total,
      " \u7B46\u7D50\u679C",
      q ? `\uFF08\u641C\u5C0B\uFF1A${q}\uFF09` : ""
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 542,
      columnNumber: 7
    }, this),
    view === "card" && /* @__PURE__ */ jsxDEV13(SimpleGrid6, { cols: { base: 1, sm: 2, lg: 3, xl: 4 }, spacing: 24, children: pageRows.map((kol) => {
      let kolTags = getPrimaryTags(kol);
      return /* @__PURE__ */ jsxDEV13(Card10, { withBorder: !0, radius: "md", p: "lg", style: { position: "relative" }, children: [
        /* @__PURE__ */ jsxDEV13(Form5, { method: "post", style: { position: "absolute", top: 12, right: 12, zIndex: 2 }, children: [
          /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "intent", value: "toggleFavorite" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 553,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 554,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "isFavorite", value: String(kol.isFavorite) }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 555,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13(
            "button",
            {
              type: "submit",
              style: {
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 24,
                padding: 0,
                lineHeight: 1,
                color: kol.isFavorite ? "var(--mantine-color-yellow-filled)" : "var(--mantine-color-gray-4)",
                textShadow: kol.isFavorite ? "0 0 2px rgba(250, 176, 5, 0.4)" : "none"
              },
              title: kol.isFavorite ? "\u53D6\u6D88\u6536\u85CF" : "\u52A0\u5165\u6536\u85CF",
              children: kol.isFavorite ? "\u2605" : "\u2606"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 556,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 552,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Stack11, { align: "center", gap: "xs", children: [
          /* @__PURE__ */ jsxDEV13(Avatar5, { src: kol.avatarUrl, size: 72, radius: 999 }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 574,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13(Text10, { fw: 600, children: kol.displayName }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 575,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", c: "dimmed", children: [
            "@",
            kol.instagramHandle ?? kol.displayName.toLowerCase().replaceAll(" ", "")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 576,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 573,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Divider5, { my: "sm" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 580,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Stack11, { gap: 4, children: [
          /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", children: [
            "IG ",
            (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 582,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", children: [
            "YT ",
            (kol.social?.youtube ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 583,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", children: [
            "TT ",
            (kol.social?.tiktok ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 584,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 581,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Group10, { gap: 6, mt: "sm", wrap: "wrap", children: kolTags.map((tag) => /* @__PURE__ */ jsxDEV13(Badge6, { variant: "light", radius: "xl", size: "sm", children: tag }, tag, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 588,
          columnNumber: 23
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 586,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Group10, { justify: "space-between", mt: "sm", children: [
          /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", children: [
            "\u2B50 ",
            (kol.rating ?? 0).toFixed(1)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 592,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV13(Text10, { size: "xs", c: "dimmed", children: [
            "\u5408\u4F5C ",
            kol.collaborations ?? 0,
            " \u6B21"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 593,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 591,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Group10, { mt: "sm", gap: "xs", children: [
          /* @__PURE__ */ jsxDEV13(
            Button11,
            {
              variant: "light",
              size: "xs",
              fullWidth: !0,
              component: Link10,
              to: `/kols/${kol.id}`,
              children: "\u67E5\u770B\u8A73\u60C5"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 596,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV13(
            Button11,
            {
              variant: "default",
              size: "xs",
              fullWidth: !0,
              component: Link10,
              to: `/kols/${kol.id}/edit`,
              children: "\u7DE8\u8F2F"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 605,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV13(
            Form5,
            {
              method: "post",
              "data-confirm": `\u78BA\u5B9A\u8981\u522A\u9664 ${kol.displayName} \u55CE\uFF1F\u6B64\u52D5\u4F5C\u7121\u6CD5\u5FA9\u539F\u3002`,
              style: { flex: 1 },
              children: [
                /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "intent", value: "delete" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 619,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 620,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV13(Button11, { type: "submit", color: "red", variant: "light", size: "xs", fullWidth: !0, children: "\u522A\u9664" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 621,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 614,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 595,
          columnNumber: 19
        }, this)
      ] }, kol.id, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 551,
        columnNumber: 17
      }, this);
    }) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 547,
      columnNumber: 11
    }, this),
    view === "table" && /* @__PURE__ */ jsxDEV13(Card10, { withBorder: !0, children: /* @__PURE__ */ jsxDEV13(Table3, { highlightOnHover: !0, children: [
      /* @__PURE__ */ jsxDEV13(Table3.Thead, { children: /* @__PURE__ */ jsxDEV13(Table3.Tr, { children: [
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: "Photo" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 640,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: /* @__PURE__ */ jsxDEV13("a", { href: sortUrl("name"), style: { textDecoration: "none", color: "inherit" }, children: [
          "\u540D\u7A31",
          sortLabel("name")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 641,
          columnNumber: 29
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 641,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: "Instagram" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 642,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: /* @__PURE__ */ jsxDEV13("a", { href: sortUrl("followers"), style: { textDecoration: "none", color: "inherit" }, children: [
          "\u7C89\u7D72\u6578",
          sortLabel("followers")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 643,
          columnNumber: 29
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 643,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: "\u6A19\u7C64" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 644,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: /* @__PURE__ */ jsxDEV13("a", { href: sortUrl("rating"), style: { textDecoration: "none", color: "inherit" }, children: [
          "\u8A55\u5206",
          sortLabel("rating")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 645,
          columnNumber: 29
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 645,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: /* @__PURE__ */ jsxDEV13("a", { href: sortUrl("collaborations"), style: { textDecoration: "none", color: "inherit" }, children: [
          "\u5408\u4F5C\u6B21\u6578",
          sortLabel("collaborations")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 646,
          columnNumber: 29
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 646,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Th, { children: "\u64CD\u4F5C" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 647,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 639,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 638,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV13(Table3.Tbody, { children: pageRows.map((kol) => /* @__PURE__ */ jsxDEV13(Table3.Tr, { children: [
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: /* @__PURE__ */ jsxDEV13(Avatar5, { src: kol.avatarUrl, size: 32, radius: "xl" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 653,
          columnNumber: 31
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 653,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: /* @__PURE__ */ jsxDEV13(Link10, { to: `/kols/${kol.id}`, children: kol.displayName }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 654,
          columnNumber: 31
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 654,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: [
          "@",
          kol.instagramHandle ?? "-"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 655,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString() }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 656,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: /* @__PURE__ */ jsxDEV13(Group10, { gap: 4, children: getPrimaryTags(kol).slice(0, 2).map((tag) => /* @__PURE__ */ jsxDEV13(Badge6, { size: "sm", variant: "light", children: tag }, tag, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 660,
          columnNumber: 27
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 658,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 657,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: [
          "\u2B50 ",
          (kol.rating ?? 0).toFixed(1)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 664,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: kol.collaborations ?? 0 }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 665,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV13(Table3.Td, { children: /* @__PURE__ */ jsxDEV13(Group10, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV13(Form5, { method: "post", style: { display: "inline" }, children: [
            /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "intent", value: "toggleFavorite" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 669,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 670,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "isFavorite", value: String(kol.isFavorite) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 671,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ jsxDEV13(
              "button",
              {
                type: "submit",
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 20,
                  padding: 0,
                  lineHeight: 1,
                  color: kol.isFavorite ? "var(--mantine-color-yellow-filled)" : "var(--mantine-color-gray-4)"
                },
                title: kol.isFavorite ? "\u53D6\u6D88\u6536\u85CF" : "\u52A0\u5165\u6536\u85CF",
                children: kol.isFavorite ? "\u2605" : "\u2606"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols._index.tsx",
                lineNumber: 672,
                columnNumber: 27
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 668,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV13(Button11, { component: Link10, to: `/kols/${kol.id}`, variant: "light", size: "xs", children: "\u67E5\u770B" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 688,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV13(Button11, { component: Link10, to: `/kols/${kol.id}/edit`, variant: "default", size: "xs", children: "\u7DE8\u8F2F" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 689,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV13(
            Form5,
            {
              method: "post",
              "data-confirm": `\u78BA\u5B9A\u8981\u522A\u9664 ${kol.displayName} \u55CE\uFF1F\u6B64\u52D5\u4F5C\u7121\u6CD5\u5FA9\u539F\u3002`,
              style: { display: "inline" },
              children: [
                /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "intent", value: "delete" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 695,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV13("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 696,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV13(Button11, { type: "submit", color: "red", variant: "subtle", size: "xs", children: "\u522A\u9664" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 697,
                  columnNumber: 27
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 690,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 667,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 666,
          columnNumber: 21
        }, this)
      ] }, kol.id, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 652,
        columnNumber: 19
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 650,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 637,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 636,
      columnNumber: 11
    }, this),
    totalPages > 1 && /* @__PURE__ */ jsxDEV13(Group10, { justify: "center", children: /* @__PURE__ */ jsxDEV13(Group10, { gap: 4, children: Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxDEV13(
      "a",
      {
        href: `?${new URLSearchParams({ ...Object.fromEntries(Object.entries(current).filter(([, v]) => !Array.isArray(v))), page: String(p) }).toString()}`,
        style: {
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
        },
        children: p
      },
      p,
      !1,
      {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 715,
        columnNumber: 17
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 713,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 712,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV13(
      "dialog",
      {
        id: "kol-batch-import-dialog",
        style: {
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          width: "100%",
          maxWidth: 500,
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)"
        },
        children: [
          /* @__PURE__ */ jsxDEV13(Group10, { justify: "space-between", mb: "md", children: [
            /* @__PURE__ */ jsxDEV13(Title11, { order: 4, children: "\u6279\u91CF\u532F\u5165 KOL (Excel)" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 756,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV13(
              "button",
              {
                type: "button",
                style: { background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--mantine-color-text)" },
                onClick: (e) => {
                  e.currentTarget.closest("dialog").close();
                },
                children: "\u2715"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols._index.tsx",
                lineNumber: 757,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 755,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", c: "dimmed", mb: "lg", children: "\u8ACB\u4E0A\u50B3\u5305\u542B KOL \u540D\u7A31\u3001\u5E73\u53F0\u9023\u7D50\u3001\u7C89\u7D72\u6578\u7B49\u8CC7\u8A0A\u7684 Excel \u6A94\u6848\u3002\u7CFB\u7D71\u6703\u81EA\u52D5\u89E3\u6790\u4E26\u5EFA\u6A94\u3002\uFF08\u529F\u80FD\u5C55\u793A\u7248\uFF09" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 765,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV13(
            "label",
            {
              style: {
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
              },
              onDragOver: (e) => {
                e.preventDefault(), e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-1)";
              },
              onDragLeave: (e) => {
                e.preventDefault(), e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
              },
              onDrop: (e) => {
                e.preventDefault(), e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
                let fileInput = document.getElementById("kol-batch-excel-input");
                fileInput && e.dataTransfer.files.length > 0 && (fileInput.files = e.dataTransfer.files, fileInput.dispatchEvent(new Event("change")));
              },
              children: [
                /* @__PURE__ */ jsxDEV13("div", { style: { fontSize: 36, marginBottom: 12 }, children: "\u{1F4E4}" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 794,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV13(Text10, { fw: 600, color: "var(--mantine-color-blue-filled)", children: "\u9EDE\u64CA\u6216\u62D6\u66F3 Excel \u6A94\u6848\u81F3\u6B64" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 795,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV13(Text10, { size: "sm", c: "dimmed", mt: 4, children: "\u652F\u63F4 .xlsx, .csv" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 796,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV13(
                  "input",
                  {
                    id: "kol-batch-excel-input",
                    type: "file",
                    accept: ".xlsx, .xls, .csv",
                    style: { display: "none" },
                    onChange: (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        let dlg = e.target.closest("dialog"), label = e.target.closest("label");
                        label && (label.style.opacity = "0.5"), setTimeout(() => {
                          alert("\u2705 \u767C\u9001\u81F3\u5F8C\u7AEF\u8655\u7406\u4E2D...\u6210\u529F\u5EFA\u7ACB 23 \u7B46 KOL \u8CC7\u6599\uFF01"), label && (label.style.opacity = "1"), dlg && dlg.close(), e.target.value = "";
                        }, 800);
                      }
                    }
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.kols._index.tsx",
                    lineNumber: 797,
                    columnNumber: 11
                  },
                  this
                )
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 769,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV13(Group10, { justify: "space-between", mt: "xl", children: [
            /* @__PURE__ */ jsxDEV13("a", { href: "#", style: { fontSize: 13, color: "var(--mantine-color-blue-filled)", textDecoration: "none" }, children: "\u4E0B\u8F09 Excel \u5EFA\u6A94\u7BC4\u672C" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 821,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV13(
              "button",
              {
                type: "button",
                style: { padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", cursor: "pointer", fontSize: 14 },
                onClick: (e) => {
                  e.currentTarget.closest("dialog").close();
                },
                children: "\u53D6\u6D88"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols._index.tsx",
                lineNumber: 822,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 820,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 742,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols._index.tsx",
    lineNumber: 248,
    columnNumber: 5
  }, this);
}

// app/routes/_app.dashboard.tsx
var app_dashboard_exports = {};
__export(app_dashboard_exports, {
  default: () => DashboardPage
});
import { Card as Card11, SimpleGrid as SimpleGrid7, Group as Group11, Text as Text11, Title as Title12, ThemeIcon } from "@mantine/core";
import {
  IconUsers,
  IconFileText,
  IconFileInvoice,
  IconStar,
  IconReportAnalytics
} from "@tabler/icons-react";
import { Fragment as Fragment2, jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var cards = [
  { label: "KOL \u7E3D\u6578", value: "128" },
  { label: "\u9032\u884C\u4E2D\u63D0\u6848", value: "32" },
  { label: "\u57F7\u884C\u4E2D\u59D4\u520A\u55AE", value: "19" },
  { label: "\u672C\u6708\u5E73\u5747 ROAS", value: "2.86" }
], modules = [
  {
    title: "KOL \u7BA1\u7406",
    description: "\u641C\u5C0B\u3001\u65B0\u589E\u53CA\u7BA1\u7406 KOL \u6A94\u6848\u8207\u5408\u4F5C\u7D00\u9304",
    icon: IconUsers,
    color: "blue",
    to: "/kols"
  },
  {
    title: "\u63D0\u6848\u7BA1\u7406",
    description: "\u5EFA\u7ACB\u63D0\u6848\u3001\u8FFD\u8E64\u5BE9\u6838\u72C0\u614B\u8207\u6E9D\u901A\u6B77\u7A0B",
    icon: IconFileText,
    color: "teal",
    to: "/proposals"
  },
  {
    title: "\u59D4\u520A\u55AE\u7BA1\u7406",
    description: "\u7BA1\u7406\u57F7\u884C\u4E2D\u7684\u59D4\u520A\u55AE\u8207\u5408\u7D04\u7D30\u7BC0",
    icon: IconFileInvoice,
    color: "violet",
    to: "/insertion-orders"
  },
  {
    title: "\u6211\u7684\u6536\u85CF",
    description: "\u67E5\u770B\u5DF2\u52A0\u5165\u6536\u85CF\u7684 KOL \u65B9\u4FBF\u5FEB\u901F\u63D0\u6848",
    icon: IconStar,
    color: "yellow",
    to: "/favorites"
  },
  {
    title: "\u7D50\u6848\u5831\u544A\u7522\u751F",
    description: "\u532F\u5165\u6578\u64DA\u5FEB\u901F\u7522\u751F\u7CBE\u7F8E\u7684\u7D50\u6848\u5831\u544A",
    icon: IconReportAnalytics,
    color: "grape",
    to: "/reports/generate"
  }
];
function DashboardPage() {
  return /* @__PURE__ */ jsxDEV14(Fragment2, { children: [
    /* @__PURE__ */ jsxDEV14(Group11, { justify: "space-between", mb: "xs", children: [
      /* @__PURE__ */ jsxDEV14(Title12, { order: 2, children: "Dashboard" }, void 0, !1, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Text11, { c: "dimmed", size: "sm", children: "\u9996\u9801 / \u7E3D\u89BD" }, void 0, !1, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14(SimpleGrid7, { cols: { base: 2, sm: 4 }, spacing: "md", mb: "xl", children: cards.map((card) => /* @__PURE__ */ jsxDEV14("div", { children: [
      /* @__PURE__ */ jsxDEV14(Text11, { size: "xs", c: "dimmed", tt: "uppercase", fw: 700, mb: 4, children: card.label }, void 0, !1, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 68,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV14(Title12, { order: 2, children: card.value }, void 0, !1, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 71,
        columnNumber: 13
      }, this)
    ] }, card.label, !0, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 67,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14(Title12, { order: 4, mb: "md", mt: "xl", children: "\u529F\u80FD\u6A21\u7D44" }, void 0, !1, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14(SimpleGrid7, { cols: { base: 1, sm: 2, lg: 3 }, spacing: "md", children: modules.map((mod) => /* @__PURE__ */ jsxDEV14(
      Card11,
      {
        withBorder: !0,
        padding: "lg",
        radius: "md",
        component: "a",
        href: mod.to,
        style: {
          textDecoration: "none",
          transition: "transform 200ms ease, box-shadow 200ms ease",
          height: "100%",
          display: "block"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "translateY(-4px)", e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.05)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "none", e.currentTarget.style.boxShadow = "none";
        },
        children: /* @__PURE__ */ jsxDEV14(Group11, { align: "flex-start", wrap: "nowrap", children: [
          /* @__PURE__ */ jsxDEV14(ThemeIcon, { size: 48, radius: "md", color: mod.color, variant: "light", children: /* @__PURE__ */ jsxDEV14(mod.icon, { size: 26, stroke: 1.5 }, void 0, !1, {
            fileName: "app/routes/_app.dashboard.tsx",
            lineNumber: 104,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.dashboard.tsx",
            lineNumber: 103,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV14("div", { children: [
            /* @__PURE__ */ jsxDEV14(Text11, { fw: 600, size: "lg", mb: 4, c: "dark", children: mod.title }, void 0, !1, {
              fileName: "app/routes/_app.dashboard.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", c: "dimmed", style: { lineHeight: 1.4 }, children: mod.description }, void 0, !1, {
              fileName: "app/routes/_app.dashboard.tsx",
              lineNumber: 110,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.dashboard.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.dashboard.tsx",
          lineNumber: 102,
          columnNumber: 13
        }, this)
      },
      mod.title,
      !1,
      {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 80,
        columnNumber: 11
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.dashboard.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}

// app/routes/_app.favorites.tsx
var app_favorites_exports = {};
__export(app_favorites_exports, {
  action: () => action7,
  default: () => FavoritesPage,
  loader: () => loader12
});
import {
  Avatar as Avatar6,
  Badge as Badge7,
  Box as Box8,
  Button as Button12,
  Card as Card12,
  Group as Group12,
  SimpleGrid as SimpleGrid8,
  Stack as Stack12,
  Text as Text12,
  Title as Title13
} from "@mantine/core";
import { json as json13, redirect as redirect5 } from "@remix-run/node";
import { Form as Form6, Link as Link11, useLoaderData as useLoaderData10 } from "@remix-run/react";
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
function sortRows(rows, sort) {
  let list = [...rows];
  return sort === "name_asc" ? list.sort((a, b) => a.displayName.localeCompare(b.displayName)) : sort === "followers_desc" ? list.sort((a, b) => (b.social?.instagram ?? b.followers ?? 0) - (a.social?.instagram ?? a.followers ?? 0)) : list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}
async function loader12({ request }) {
  let url = new URL(request.url), search = url.searchParams.get("search") ?? "", sort = url.searchParams.get("sort") ?? "rating_desc", folder = url.searchParams.get("folder") ?? "\u5168\u90E8", favorites = (await listKols()).filter((k) => k.isFavorite), fromRows = favorites.map((r) => r.favoriteFolder).filter(Boolean), folderSet = /* @__PURE__ */ new Set(["\u5BB6\u96FB\u5C08\u6848", "\u7F8E\u599D\u5C08\u6848", ...fromRows]), allFolders = ["\u5168\u90E8", ...Array.from(folderSet)], folderFiltered = folder === "\u5168\u90E8" ? favorites : favorites.filter((r) => (r.favoriteFolder ?? "\u672A\u5206\u985E") === folder), q = search.trim().toLowerCase(), searched = folderFiltered.filter((r) => q ? r.displayName.toLowerCase().includes(q) || (r.instagramHandle ?? "").toLowerCase().includes(q) || (r.industry ?? "").toLowerCase().includes(q) || (r.tags ?? r.categories).some((t) => t.toLowerCase().includes(q)) : !0), rows = sortRows(searched, sort), folderCounts = allFolders.reduce((acc, f) => (acc[f] = f === "\u5168\u90E8" ? favorites.length : favorites.filter((r) => (r.favoriteFolder ?? "\u672A\u5206\u985E") === f).length, acc), {});
  return json13({ rows, allFolders, folderCounts, search, sort, folder });
}
async function action7({ request }) {
  let formData = await request.formData();
  if (formData.get("intent") === "removeFavorite") {
    let kolId = String(formData.get("kolId") ?? "");
    if (!kolId)
      return json13({ error: "Missing KOL id" }, { status: 400 });
    await updateKol(kolId, { isFavorite: !1 });
    let url = new URL(request.url);
    return url.searchParams.set("unfavorited", "1"), redirect5(url.pathname + "?" + url.searchParams.toString());
  }
  return null;
}
function FavoritesPage() {
  let { rows, allFolders, folderCounts, search, sort, folder } = useLoaderData10(), inputStyle = {
    padding: "8px 12px",
    border: "1px solid var(--mantine-color-default-border)",
    borderRadius: 4,
    fontSize: 14,
    background: "var(--mantine-color-body)",
    color: "var(--mantine-color-text)"
  };
  return /* @__PURE__ */ jsxDEV15(Stack12, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV15(Group12, { justify: "space-between", align: "end", children: [
      /* @__PURE__ */ jsxDEV15(Title13, { order: 2, children: [
        "\u6211\u7684\u6536\u85CF (",
        rows.length,
        ")"
      ] }, void 0, !0, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15(
        "button",
        {
          type: "button",
          style: { ...inputStyle, cursor: "pointer", fontWeight: 500 },
          onclick: 'document.getElementById("add-folder-dialog").showModal()',
          children: "+ \u65B0\u589E\u8CC7\u6599\u593E"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 98,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 96,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("form", { method: "get", style: { display: "contents" }, children: [
      /* @__PURE__ */ jsxDEV15("input", { type: "hidden", name: "folder", value: folder }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 109,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15(Group12, { children: [
        /* @__PURE__ */ jsxDEV15(
          "input",
          {
            name: "search",
            defaultValue: search,
            placeholder: "\u641C\u5C0B\u6536\u85CF KOL",
            style: { ...inputStyle, flex: 1, minWidth: 200 }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 111,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV15("select", { name: "sort", defaultValue: sort, style: inputStyle, children: [
          /* @__PURE__ */ jsxDEV15("option", { value: "rating_desc", children: "\u8A55\u5206\u7531\u9AD8\u5230\u4F4E" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV15("option", { value: "followers_desc", children: "\u7C89\u7D72\u7531\u9AD8\u5230\u4F4E" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV15("option", { value: "name_asc", children: "\u540D\u7A31 A-Z" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 120,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV15("button", { type: "submit", style: { ...inputStyle, cursor: "pointer", background: "var(--mantine-color-blue-filled)", color: "#fff", border: "none", fontWeight: 600 }, children: "\u5957\u7528" }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 122,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 110,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15(Group12, { children: [
      allFolders.map((f) => /* @__PURE__ */ jsxDEV15(
        "a",
        {
          href: `/favorites?search=${encodeURIComponent(search)}&sort=${sort}&folder=${encodeURIComponent(f)}`,
          style: {
            padding: "6px 14px",
            borderRadius: 4,
            border: "1px solid var(--mantine-color-default-border)",
            textDecoration: "none",
            background: folder === f ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-body)",
            color: folder === f ? "#fff" : "var(--mantine-color-text)",
            fontWeight: folder === f ? 600 : 400,
            fontSize: 14
          },
          children: [
            f,
            " (",
            folderCounts[f] ?? 0,
            ")"
          ]
        },
        f,
        !0,
        {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 131,
          columnNumber: 11
        },
        this
      )),
      /* @__PURE__ */ jsxDEV15(
        "button",
        {
          type: "button",
          style: { ...inputStyle, cursor: "pointer", background: "transparent", border: "none", color: "var(--mantine-color-blue-filled)" },
          onclick: 'document.getElementById("add-folder-dialog").showModal()',
          children: "+ \u65B0\u589E"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 148,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 129,
      columnNumber: 7
    }, this),
    rows.length === 0 ? /* @__PURE__ */ jsxDEV15(Card12, { withBorder: !0, p: "xl", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxDEV15(Text12, { size: "48px", children: "\u{1F4C2}" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 160,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV15(Title13, { order: 3, children: "\u6B64\u8CC7\u6599\u593E\u5C1A\u7121 KOL" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV15(Text12, { c: "dimmed", mb: "md", children: "\u8ACB\u5207\u63DB\u8CC7\u6599\u593E\uFF0C\u6216\u524D\u5F80 KOL \u9801\u9762\u52A0\u5165\u6536\u85CF" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV15(Button12, { component: Link11, to: "/kols", children: "\u700F\u89BD KOL" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 163,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 159,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV15(SimpleGrid8, { cols: { base: 1, md: 2, lg: 3, xl: 4 }, spacing: 24, children: rows.map((kol) => /* @__PURE__ */ jsxDEV15(Card12, { withBorder: !0, className: "kol-card", children: [
      /* @__PURE__ */ jsxDEV15(Stack12, { align: "center", gap: 6, children: [
        /* @__PURE__ */ jsxDEV15(Avatar6, { src: kol.avatarUrl, size: 72, radius: 999 }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 170,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15(Text12, { fw: 600, children: kol.displayName }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 171,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15(Text12, { size: "sm", c: "dimmed", children: [
          "@",
          kol.instagramHandle ?? "-"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 172,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 169,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV15(Stack12, { mt: "sm", gap: 4, children: [
        /* @__PURE__ */ jsxDEV15(Text12, { size: "sm", children: [
          "IG ",
          (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 176,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15(Text12, { size: "sm", children: [
          "YT ",
          (kol.social?.youtube ?? 0).toLocaleString()
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 177,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15(Text12, { size: "sm", children: [
          "TT ",
          (kol.social?.tiktok ?? 0).toLocaleString()
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 178,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 175,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV15(Group12, { gap: 6, mt: "sm", children: (kol.tags ?? kol.categories).slice(0, 3).map((tag) => /* @__PURE__ */ jsxDEV15(Badge7, { variant: "light", radius: "xl", children: tag }, tag, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 183,
        columnNumber: 19
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 181,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV15(Box8, { mt: "sm", children: [
        /* @__PURE__ */ jsxDEV15(Text12, { size: "xs", c: "dimmed", mb: 4, children: "\u79FB\u81F3\u8CC7\u6599\u593E\uFF1A" }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 189,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15(Group12, { gap: 4, children: ["\u5BB6\u96FB\u5C08\u6848", "\u7F8E\u599D\u5C08\u6848"].map((f) => /* @__PURE__ */ jsxDEV15(
          "span",
          {
            style: {
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid var(--mantine-color-default-border)",
              fontSize: 12,
              cursor: "default",
              background: "var(--mantine-color-body)",
              color: "var(--mantine-color-text)"
            },
            children: f
          },
          f,
          !1,
          {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 192,
            columnNumber: 21
          },
          this
        )) }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 190,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 188,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV15(Group12, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ jsxDEV15(Text12, { children: [
          "\u2B50 ",
          (kol.rating ?? 0).toFixed(1)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 211,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15(Group12, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV15(Link11, { to: `/kols/${kol.id}`, style: { fontSize: 14 }, children: "\u67E5\u770B\u8A73\u7D30" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 213,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV15(Form6, { method: "post", style: { margin: 0 }, children: [
            /* @__PURE__ */ jsxDEV15("input", { type: "hidden", name: "intent", value: "removeFavorite" }, void 0, !1, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 215,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 216,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15(
              "button",
              {
                type: "submit",
                style: {
                  background: "none",
                  border: "1px solid var(--mantine-color-red-light)",
                  color: "var(--mantine-color-red-filled)",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                  cursor: "pointer"
                },
                children: "\u53D6\u6D88\u6536\u85CF"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.favorites.tsx",
                lineNumber: 217,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 214,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 212,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 210,
        columnNumber: 15
      }, this)
    ] }, kol.id, !0, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 168,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 166,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV15(
      "dialog",
      {
        id: "add-folder-dialog",
        style: {
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--mantine-color-default-border)",
          background: "var(--mantine-color-body)",
          color: "var(--mantine-color-text)",
          minWidth: 320,
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)"
        },
        children: [
          /* @__PURE__ */ jsxDEV15(Group12, { justify: "space-between", mb: "md", children: [
            /* @__PURE__ */ jsxDEV15(Title13, { order: 4, children: "\u65B0\u589E\u8CC7\u6599\u593E" }, void 0, !1, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 253,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV15(
              "button",
              {
                type: "button",
                style: { background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--mantine-color-text)" },
                onclick: 'document.getElementById("add-folder-dialog").close()',
                children: "\u2715"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.favorites.tsx",
                lineNumber: 254,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 252,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV15(Stack12, { gap: "md", children: [
            /* @__PURE__ */ jsxDEV15("div", { children: [
              /* @__PURE__ */ jsxDEV15("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u8CC7\u6599\u593E\u540D\u7A31" }, void 0, !1, {
                fileName: "app/routes/_app.favorites.tsx",
                lineNumber: 264,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV15(
                "input",
                {
                  id: "new-folder-name",
                  type: "text",
                  placeholder: "\u4F8B\u5982\uFF1A\u6BCD\u5B30\u5C08\u6848",
                  style: {
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid var(--mantine-color-default-border)",
                    borderRadius: 4,
                    fontSize: 14,
                    background: "var(--mantine-color-body)",
                    color: "var(--mantine-color-text)",
                    boxSizing: "border-box"
                  }
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.favorites.tsx",
                  lineNumber: 265,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 263,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV15(Group12, { justify: "flex-end", children: [
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  type: "button",
                  style: { padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", cursor: "pointer", fontSize: 14 },
                  onclick: 'document.getElementById("add-folder-dialog").close()',
                  children: "\u53D6\u6D88"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.favorites.tsx",
                  lineNumber: 282,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  type: "button",
                  style: { padding: "8px 16px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 },
                  onclick: 'document.getElementById("add-folder-dialog").close()',
                  children: "\u5EFA\u7ACB"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.favorites.tsx",
                  lineNumber: 289,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 281,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 262,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 240,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.favorites.tsx",
    lineNumber: 95,
    columnNumber: 5
  }, this);
}

// app/routes/_app.kols.new.tsx
var app_kols_new_exports = {};
__export(app_kols_new_exports, {
  action: () => action8,
  default: () => KolCreatePage
});
import {
  Alert as Alert4,
  Avatar as Avatar7,
  Box as Box9,
  Button as Button13,
  Card as Card13,
  Divider as Divider6,
  Group as Group13,
  SimpleGrid as SimpleGrid9,
  Stack as Stack13,
  Text as Text13,
  TextInput as TextInput7,
  Textarea as Textarea5,
  Title as Title14
} from "@mantine/core";
import { json as json14, redirect as redirect6 } from "@remix-run/node";
import { Form as Form7, Link as Link12, useActionData as useActionData4, useNavigation as useNavigation4 } from "@remix-run/react";
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
function parseHandle(url) {
  let raw = url.trim();
  if (!raw)
    return "";
  let parts = raw.split("/").filter(Boolean);
  return (parts[parts.length - 1] ?? "").replace("@", "");
}
async function action8({ request }) {
  let formData = await request.formData(), intent = String(formData.get("intent") ?? "create"), displayName = String(formData.get("displayName") ?? "").trim(), gender = String(formData.get("gender") ?? "\u5176\u4ED6"), age = Number(formData.get("age") ?? 0), phone = String(formData.get("contactPhone") ?? "").trim(), email = String(formData.get("email") ?? "").trim(), tagsRaw = String(formData.get("tagsInput") ?? ""), socialsRaw = String(formData.get("socialsJson") ?? "[]"), avatarUrl = String(formData.get("avatarUrl") ?? "").trim(), description = String(formData.get("description") ?? "").trim(), internalComments = String(formData.get("internalComments") ?? "").trim();
  if (!displayName)
    return json14({ error: "KOL \u540D\u7A31\u70BA\u5FC5\u586B" }, { status: 400 });
  let tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [], socials = [];
  try {
    socials = JSON.parse(socialsRaw);
  } catch {
    socials = [];
  }
  let primarySocial = socials[0] ?? { platform: "Instagram", followers: 0, url: "" }, socialMap = socials.reduce((acc, item) => {
    let key = String(item.platform || "").toLowerCase();
    return key && (acc[key] = Number(item.followers ?? 0)), acc;
  }, {}), payload = {
    displayName,
    instagramHandle: parseHandle(
      socials.find((s) => s.platform.toLowerCase() === "instagram")?.url ?? primarySocial.url ?? ""
    ),
    industry: "\u5F85\u5206\u985E",
    tags,
    categories: tags.length > 0 ? tags : ["\u5F85\u5206\u985E"],
    platform: primarySocial.platform || "Instagram",
    followers: Number(primarySocial.followers ?? 0),
    engagementRate: 0,
    rating: 0,
    collaborations: 0,
    averagePrice: 0,
    isFavorite: !1,
    avatarUrl: avatarUrl || void 0,
    social: {
      instagram: socialMap.instagram ?? 0,
      youtube: socialMap.youtube ?? 0,
      tiktok: socialMap.tiktok ?? 0,
      facebook: socialMap.facebook ?? 0
    },
    contact: { phone, email, manager: "" },
    profile: { gender, age },
    city: "Taipei",
    notes: [description, internalComments && `internal:${internalComments}`].filter(Boolean).join(`
`),
    status: intent === "draft" ? "draft" : "active"
  }, res = await fetch(`${MOCK_API_BASE}/kols`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok)
    return json14({ error: "\u5EFA\u7ACB\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66" }, { status: 500 });
  let created = await res.json();
  return redirect6(`/kols/${created.id}`);
}
var socialScript = `
  var __socials = [{ id:'s0', platform:'Instagram', url:'', followers:'' }];

  function renderSocials() {
    var container = document.getElementById('social-rows');
    if (!container) return;
    container.innerHTML = __socials.map(function(item, idx){
      return '<div style="border:1px solid var(--mantine-color-default-border);border-radius:8px;padding:12px;margin-top:10px;">' +
        '<div style="display:grid;grid-template-columns:1fr 2fr 1fr 80px 36px;gap:8px;align-items:flex-end;">' +
          '<div><label style="font-size:13px;font-weight:500;">\u5E73\u53F0</label>' +
            '<select oninput="updateSocial(\\''+item.id+'\\',\\'platform\\',this.value)" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;background:var(--mantine-color-body);color:var(--mantine-color-text);">' +
              ['Instagram','YouTube','TikTok','Facebook','Twitter','LINE'].map(function(p){ return '<option'+(item.platform===p?' selected':'')+'>'+p+'</option>'; }).join('') +
            '</select></div>' +
          '<div><label style="font-size:13px;font-weight:500;">\u5E33\u865F URL</label>' +
            '<input type="text" value="'+item.url+'" oninput="updateSocial(\\''+item.id+'\\',\\'url\\',this.value)" placeholder="https://instagram.com/username" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;box-sizing:border-box;background:var(--mantine-color-body);color:var(--mantine-color-text);" /></div>' +
          '<div style="display:flex;flex-direction:column;justify-content:flex-end;">' +
            '<button type="button" onclick="fetchFollowers(\\''+item.id+'\\',\\''+item.platform+'\\')" style="padding:7px 10px;border-radius:4px;border:1px solid var(--mantine-color-default-border);background:var(--mantine-color-body);cursor:pointer;font-size:12px;margin-top:auto;color:var(--mantine-color-text);">\u53D6\u5F97\u8FFD\u8E64\u6578</button></div>' +
          '<div><label style="font-size:13px;font-weight:500;">\u8FFD\u8E64\u6578</label>' +
            '<input type="text" readOnly value="'+(item.followers||'-')+'" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;background:var(--mantine-color-body);color:var(--mantine-color-dimmed);" /></div>' +
          '<div style="display:flex;align-items:flex-end;padding-bottom:2px;">' +
            (idx === 0 ? '<span style="width:36px;"></span>' : '<button type="button" onclick="removeSocial(\\''+item.id+'\\');return false;" style="width:36px;height:34px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:14px;font-weight:700;">\xD7</button>') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    syncSocialsJson();
  }
  function updateSocial(id, key, value) {
    __socials = __socials.map(function(s){ return s.id===id ? Object.assign({},s,{[key]:value}) : s; });
    renderSocials();
    syncSocialsJson();
  }
  function addSocial() {
    if (__socials.length >= 8) return;
    __socials.push({ id:'s'+Date.now(), platform:'Instagram', url:'', followers:'' });
    renderSocials();
  }
  function removeSocial(id) {
    if (__socials.length <= 1) return;
    __socials = __socials.filter(function(s){ return s.id!==id; });
    renderSocials();
  }
  function syncSocialsJson() {
    var el = document.getElementById('socials-json');
    if (el) el.value = JSON.stringify(__socials.map(function(s){ return { platform:s.platform, url:s.url, followers: s.followers ? Number(s.followers) : null }; }));
  }
  async function fetchFollowers(id, platform) {
    var s = __socials.find(function(x){ return x.id===id; });
    if (!s || !s.url) { alert('\u8ACB\u5148\u8F38\u5165\u793E\u7FA4\u5E33\u865F URL'); return; }
    try {
      var r = await fetch('/api/social-followers?platform='+encodeURIComponent(platform)+'&url='+encodeURIComponent(s.url));
      var data = await r.json();
      if (r.ok && data.followers) {
        __socials = __socials.map(function(x){ return x.id===id ? Object.assign({},x,{followers:data.followers}) : x; });
        renderSocials();
      } else { alert(data.error || '\u53D6\u5F97\u8FFD\u8E64\u6578\u5931\u6557'); }
    } catch(e) { alert('\u53D6\u5F97\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66'); }
  }

  // Avatar upload
  function pickAvatar() {
    var fi = document.getElementById('avatar-file-input');
    if (fi) fi.click();
  }
  function previewAvatar(input) {
    var file = input.files && input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(){
      var preview = document.getElementById('avatar-preview');
      var urlInput = document.getElementById('avatar-url-hidden');
      if (preview) preview.src = reader.result;
      if (urlInput) urlInput.value = reader.result;
    };
    reader.readAsDataURL(file);
  }

  document.addEventListener('DOMContentLoaded', function() { renderSocials(); });
  // Also render when script loads (in case DOMContentLoaded has already fired)
  if (document.readyState !== 'loading') { setTimeout(renderSocials, 0); }
`;
function KolCreatePage() {
  let actionData = useActionData4(), submitting = useNavigation4().state === "submitting";
  return /* @__PURE__ */ jsxDEV16(Stack13, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV16("script", { dangerouslySetInnerHTML: { __html: socialScript } }, void 0, !1, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 190,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV16(Group13, { gap: 8, children: [
      /* @__PURE__ */ jsxDEV16(Link12, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 193,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16(Text13, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 194,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16(Text13, { fw: 600, children: "\u65B0\u589E KOL" }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 195,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 192,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV16(Card13, { withBorder: !0, p: "lg", maw: 800, mx: "auto", w: "100%", children: /* @__PURE__ */ jsxDEV16(Form7, { method: "post", children: /* @__PURE__ */ jsxDEV16(Stack13, { gap: "xl", children: [
      /* @__PURE__ */ jsxDEV16(Box9, { children: [
        /* @__PURE__ */ jsxDEV16(Title14, { order: 3, mb: "md", children: "KOL \u57FA\u672C\u8CC7\u6599" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 203,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16(Stack13, { align: "center", mb: "lg", children: [
          /* @__PURE__ */ jsxDEV16(
            "input",
            {
              id: "avatar-file-input",
              type: "file",
              accept: "image/*",
              style: { display: "none" },
              onchange: "previewAvatar(this)"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 207,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV16("input", { type: "hidden", id: "avatar-url-hidden", name: "avatarUrl" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 214,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(
            "div",
            {
              style: { width: 220, border: "1px dashed #94a3b8", borderRadius: 16, padding: 20, cursor: "pointer", textAlign: "center" },
              onclick: "pickAvatar()",
              ondragover: "event.preventDefault()",
              children: /* @__PURE__ */ jsxDEV16(Stack13, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ jsxDEV16(Avatar7, { id: "avatar-preview", src: void 0, radius: 999, size: 96 }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 220,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV16(Text13, { fw: 700, children: "\u2191" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 221,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV16(Text13, { size: "sm", children: "\u9EDE\u64CA\u4E0A\u50B3 KOL \u7167\u7247" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 222,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV16(Text13, { size: "xs", c: "dimmed", children: "\u652F\u63F4\u62D6\u62C9\u4E0A\u50B3" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 223,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 219,
                columnNumber: 19
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 215,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 206,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16(SimpleGrid9, { cols: { base: 1, sm: 2 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV16(TextInput7, { label: "KOL \u540D\u7A31 *", name: "displayName", placeholder: "\u4F8B\u5982\uFF1AGina", required: !0 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 229,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(Box9, { children: [
            /* @__PURE__ */ jsxDEV16(Text13, { size: "sm", fw: 500, mb: 6, children: "\u6027\u5225" }, void 0, !1, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 232,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV16(Group13, { children: [
              /* @__PURE__ */ jsxDEV16("label", { style: { display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }, children: [
                /* @__PURE__ */ jsxDEV16("input", { type: "radio", name: "gender", value: "\u7537" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 235,
                  columnNumber: 23
                }, this),
                " \u7537"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 234,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV16("label", { style: { display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }, children: [
                /* @__PURE__ */ jsxDEV16("input", { type: "radio", name: "gender", value: "\u5973", defaultChecked: !0 }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 238,
                  columnNumber: 23
                }, this),
                " \u5973"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 237,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV16("label", { style: { display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }, children: [
                /* @__PURE__ */ jsxDEV16("input", { type: "radio", name: "gender", value: "\u5176\u4ED6" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 241,
                  columnNumber: 23
                }, this),
                " \u5176\u4ED6"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 240,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 233,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 231,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(TextInput7, { label: "\u5E74\u9F61", name: "age", type: "number", min: 0, max: 100 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 246,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(TextInput7, { label: "\u806F\u7D61\u65B9\u5F0F", name: "contactPhone", placeholder: "09xx-xxx-xxx" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 247,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(TextInput7, { label: "Email", name: "email", type: "email", placeholder: "manager@example.com" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 248,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 228,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16(Box9, { mt: "md", children: [
          /* @__PURE__ */ jsxDEV16(Text13, { size: "sm", fw: 500, mb: 4, children: "KOL \u6A19\u7C64\uFF08\u9017\u865F\u5206\u9694\uFF09" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 252,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(
            "input",
            {
              name: "tagsInput",
              type: "text",
              defaultValue: "\u6BCD\u5B30,\u89AA\u5B50,\u65C5\u904A",
              placeholder: "\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280",
              style: {
                width: "100%",
                padding: "8px 12px",
                border: "1px solid var(--mantine-color-default-border)",
                borderRadius: 4,
                fontSize: 14,
                background: "var(--mantine-color-body)",
                color: "var(--mantine-color-text)",
                boxSizing: "border-box"
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 253,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV16(Text13, { size: "xs", c: "dimmed", mt: 4, children: "\u7528\u9017\u865F\u5206\u9694\u591A\u500B\u6A19\u7C64\uFF0C\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 269,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 251,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 202,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV16(Divider6, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 273,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV16(Box9, { children: [
        /* @__PURE__ */ jsxDEV16(Title14, { order: 3, mb: "md", children: "\u7D93\u71DF\u7684\u793E\u7FA4\u5E73\u53F0" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 277,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16("div", { id: "social-rows" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 278,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16("textarea", { id: "socials-json", name: "socialsJson", defaultValue: "[]", style: { display: "none" }, readOnly: !0 }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 279,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16(Group13, { mt: "md", children: /* @__PURE__ */ jsxDEV16(
          "button",
          {
            type: "button",
            style: { padding: "7px 14px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", cursor: "pointer", fontSize: 14, color: "var(--mantine-color-blue-filled)" },
            onclick: "addSocial()",
            children: "+ \u65B0\u589E\u793E\u7FA4\u5E73\u53F0"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 281,
            columnNumber: 17
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 280,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 276,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV16(Divider6, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 291,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV16(Box9, { children: [
        /* @__PURE__ */ jsxDEV16(Title14, { order: 3, mb: "md", children: "\u5176\u4ED6\u8CC7\u8A0A" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 295,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16(Stack13, { children: [
          /* @__PURE__ */ jsxDEV16(Textarea5, { label: "\u63CF\u8FF0", name: "description", placeholder: "KOL \u5167\u5BB9\u98A8\u683C\u3001\u64C5\u9577\u4E3B\u984C\u3001\u5408\u4F5C\u4EAE\u9EDE", minRows: 4 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 297,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(Textarea5, { label: "\u5167\u90E8\u5099\u8A3B", name: "internalComments", placeholder: "\u50C5\u5167\u90E8\u53EF\u898B\uFF0C\u4F8B\u5982\u5831\u50F9\u504F\u597D\u3001\u6E9D\u901A\u6CE8\u610F\u4E8B\u9805", minRows: 3 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 298,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 296,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 294,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV16(Alert4, { color: "red", title: "\u5EFA\u7ACB\u5931\u6557", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 303,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV16(Group13, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ jsxDEV16(Button13, { component: Link12, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 307,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16(Group13, { children: [
          /* @__PURE__ */ jsxDEV16(Button13, { type: "submit", name: "intent", value: "draft", variant: "default", loading: submitting, children: "\u5132\u5B58\u8349\u7A3F" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 309,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV16(Button13, { type: "submit", name: "intent", value: "create", loading: submitting, children: "\u5EFA\u7ACB KOL" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 310,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 308,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 306,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 200,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 199,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 198,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.new.tsx",
    lineNumber: 189,
    columnNumber: 5
  }, this);
}

// app/routes/_app.settings.tsx
var app_settings_exports = {};
__export(app_settings_exports, {
  default: () => SettingsRoute,
  loader: () => loader13
});
import {
  Avatar as Avatar8,
  Badge as Badge8,
  Box as Box10,
  Button as Button14,
  Card as Card14,
  Divider as Divider7,
  Grid as Grid4,
  Group as Group14,
  Modal as Modal4,
  Stack as Stack14,
  Table as Table4,
  Text as Text14,
  TextInput as TextInput8,
  Title as Title15
} from "@mantine/core";
import { json as json15 } from "@remix-run/node";
import { Link as Link13, useLoaderData as useLoaderData11 } from "@remix-run/react";
import { useMemo as useMemo3, useState as useState5 } from "react";
import { Fragment as Fragment3, jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var CLIENTS = [
  {
    id: "c-001",
    name: "Panasonic",
    industry: "\u5BB6\u96FB",
    brands: ["Panasonic", "National"],
    activeProjects: 3
  },
  {
    id: "c-002",
    name: "Shiseido",
    industry: "\u7F8E\u599D\u4FDD\u990A",
    brands: ["SHISEIDO", "ELIXIR"],
    activeProjects: 2
  },
  {
    id: "c-003",
    name: "Uniqlo",
    industry: "\u670D\u98FE\u96F6\u552E",
    brands: ["Uniqlo", "GU"],
    activeProjects: 5
  },
  {
    id: "c-004",
    name: "Foodpanda",
    industry: "\u5916\u9001\u670D\u52D9",
    brands: ["Foodpanda"],
    activeProjects: 1
  }
], TAG_GROUPS = [
  {
    id: "style",
    name: "\u5167\u5BB9\u98A8\u683C",
    tags: ["\u8CEA\u611F", "\u65E5\u5E38", "\u5E7D\u9ED8", "\u5C08\u696D", "\u6EAB\u6696", "\u77E5\u8B58\u578B"]
  },
  {
    id: "industry",
    name: "\u7522\u696D\u985E\u5225",
    tags: ["\u5BB6\u96FB", "\u7F8E\u599D", "\u98DF\u54C1", "\u65C5\u904A", "\u6BCD\u5B30", "\u79D1\u6280"]
  },
  {
    id: "platform",
    name: "\u5E73\u53F0\u504F\u597D",
    tags: ["IG", "YouTube", "TikTok", "Facebook", "Threads"]
  }
], PILL_COLORS = ["blue", "teal", "indigo", "grape", "cyan", "lime"];
async function loader13({ request }) {
  let url = new URL(request.url), tab = url.searchParams.get("tab") ?? "clients", q = url.searchParams.get("q") ?? "", filteredClients = q ? CLIENTS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.brands.some((b) => b.toLowerCase().includes(q.toLowerCase()))) : CLIENTS;
  return json15({ tab, q, filteredClients });
}
function SettingsRoute() {
  let { tab, q, filteredClients } = useLoaderData11(), [tagGroups, setTagGroups] = useState5(() => TAG_GROUPS), [selectedGroupId, setSelectedGroupId] = useState5(() => TAG_GROUPS[0]?.id ?? "style"), selectedGroup = useMemo3(
    () => tagGroups.find((g) => g.id === selectedGroupId) ?? tagGroups[0],
    [tagGroups, selectedGroupId]
  ), [categoryModalOpened, setCategoryModalOpened] = useState5(!1), [categoryModalMode, setCategoryModalMode] = useState5("edit"), [tagModalOpened, setTagModalOpened] = useState5(!1), [tagModalMode, setTagModalMode] = useState5("add"), [activeTagValue, setActiveTagValue] = useState5(""), [draftCategoryName, setDraftCategoryName] = useState5(""), [draftTagValue, setDraftTagValue] = useState5(""), tabStyle = (value) => ({
    padding: "10px 16px",
    borderBottom: tab === value ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
    color: tab === value ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    textDecoration: "none",
    fontWeight: tab === value ? 600 : 500,
    fontSize: 14,
    display: "inline-block",
    transition: "border-color 150ms ease, color 150ms ease"
  });
  return /* @__PURE__ */ jsxDEV17(Stack14, { gap: "lg", children: [
    /* @__PURE__ */ jsxDEV17(Stack14, { gap: 4, children: [
      /* @__PURE__ */ jsxDEV17(Title15, { order: 2, children: "\u7CFB\u7D71\u8A2D\u5B9A" }, void 0, !1, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV17(Text14, { c: "dimmed", children: "\u7BA1\u7406\u5BA2\u6236\u3001\u6A19\u7C64\u8207\u5176\u4ED6\u7CFB\u7D71\u5F8C\u53F0\u8CC7\u6599\u3002\u53EF\u4F9D\u9700\u6C42\u64F4\u5145\u54C1\u724C\u8207\u6B0A\u9650\u8A2D\u5B9A\u3002" }, void 0, !1, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 118,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV17(Card14, { withBorder: !0, radius: "lg", p: 0, style: { overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxDEV17("div", { style: { display: "flex", borderBottom: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", padding: "0 16px" }, children: [
        /* @__PURE__ */ jsxDEV17(Link13, { to: "/settings?tab=clients", style: tabStyle("clients"), children: "\u5BA2\u6236\u7BA1\u7406" }, void 0, !1, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV17(Link13, { to: "/settings?tab=tags", style: tabStyle("tags"), children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, !1, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV17(Link13, { to: "/settings?tab=brands", style: tabStyle("brands"), children: "\u54C1\u724C\u7BA1\u7406" }, void 0, !1, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 128,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV17(Link13, { to: "/settings?tab=preferences", style: tabStyle("preferences"), children: "\u7CFB\u7D71\u504F\u597D" }, void 0, !1, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV17(Link13, { to: "/settings?tab=roles", style: tabStyle("roles"), children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, !1, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 130,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV17(Box10, { p: "lg", children: [
        tab === "clients" && /* @__PURE__ */ jsxDEV17(Box10, { children: [
          /* @__PURE__ */ jsxDEV17(Group14, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ jsxDEV17(Stack14, { gap: 2, children: [
              /* @__PURE__ */ jsxDEV17(Title15, { order: 3, children: "\u5408\u4F5C\u5BA2\u6236" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 138,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", c: "dimmed", children: "\u96C6\u4E2D\u7BA1\u7406\u5BA2\u6236\u54C1\u724C\u8207\u5C08\u6848\u8CC7\u8A0A\uFF0C\u652F\u63F4\u641C\u5C0B\u8207\u5FEB\u901F\u7DAD\u8B77\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 139,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 137,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert("\u65B0\u589E\u5BA2\u6236\uFF1A\u6B64\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: { padding: "8px 16px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "white", cursor: "pointer", fontWeight: 500 }, children: "\u65B0\u589E\u5BA2\u6236" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 142,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 136,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(Group14, { mt: "md", align: "center", justify: "space-between", wrap: "nowrap", children: [
            /* @__PURE__ */ jsxDEV17("form", { method: "get", action: "/settings", style: { flex: 1, display: "flex", gap: 8 }, children: [
              /* @__PURE__ */ jsxDEV17("input", { type: "hidden", name: "tab", value: "clients" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV17(
                "input",
                {
                  name: "q",
                  defaultValue: q,
                  placeholder: "\u641C\u5C0B\u5BA2\u6236\u540D\u7A31\u6216\u54C1\u724C\uFF08\u6309 Enter \u641C\u5C0B\uFF09",
                  style: { flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", color: "var(--mantine-color-text)", fontSize: 14 }
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 151,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV17("button", { type: "submit", style: { padding: "8px 16px", borderRadius: 6, border: "none", background: "var(--mantine-color-blue-filled)", color: "white", cursor: "pointer", fontSize: 14, fontWeight: 500 }, children: "\u641C\u5C0B" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 157,
                columnNumber: 19
              }, this),
              q && /* @__PURE__ */ jsxDEV17(Link13, { to: "/settings?tab=clients", style: { padding: "8px 12px", borderRadius: 6, border: "1px solid var(--mantine-color-default-border)", textDecoration: "none", color: "var(--mantine-color-text)", fontSize: 14 }, children: "\u6E05\u9664" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 161,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 149,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV17(Group14, { gap: "xs", children: [
              /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert("\u532F\u5165\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: { padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }, children: "\u532F\u5165" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 167,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert("\u532F\u51FA\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: { padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }, children: "\u532F\u51FA" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 168,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 166,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 147,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(Table4, { withTableBorder: !0, verticalSpacing: "md", mt: "lg", children: [
            /* @__PURE__ */ jsxDEV17(Table4.Thead, { children: /* @__PURE__ */ jsxDEV17(Table4.Tr, { children: [
              /* @__PURE__ */ jsxDEV17(Table4.Th, { children: "Logo" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 175,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV17(Table4.Th, { children: "\u5BA2\u6236\u540D\u7A31" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 176,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV17(Table4.Th, { children: "\u7522\u696D\u985E\u5225" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 177,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV17(Table4.Th, { children: "\u95DC\u806F\u54C1\u724C" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 178,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV17(Table4.Th, { children: "\u9032\u884C\u4E2D\u5C08\u6848" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 179,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV17(Table4.Th, { children: "\u64CD\u4F5C" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 180,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 174,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 173,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV17(Table4.Tbody, { children: [
              filteredClients.map((client) => /* @__PURE__ */ jsxDEV17(Table4.Tr, { children: [
                /* @__PURE__ */ jsxDEV17(Table4.Td, { children: /* @__PURE__ */ jsxDEV17(Avatar8, { radius: "xl", color: "blue", children: client.name.slice(0, 1) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 187,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 186,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV17(Table4.Td, { children: /* @__PURE__ */ jsxDEV17(Text14, { fw: 600, children: client.name }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 189,
                  columnNumber: 33
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 189,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV17(Table4.Td, { children: client.industry }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 190,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV17(Table4.Td, { children: /* @__PURE__ */ jsxDEV17(Group14, { gap: "xs", children: client.brands.map((brand) => /* @__PURE__ */ jsxDEV17(Badge8, { variant: "light", color: "gray", children: brand }, brand, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 194,
                  columnNumber: 29
                }, this)) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 192,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 191,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV17(Table4.Td, { children: /* @__PURE__ */ jsxDEV17(Badge8, { color: "blue", variant: "light", children: [
                  client.activeProjects,
                  " \u4EF6"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 198,
                  columnNumber: 33
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 198,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV17(Table4.Td, { children: /* @__PURE__ */ jsxDEV17(Group14, { gap: "xs", children: [
                  /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert(`\u7DE8\u8F2F ${client.name}`), style: { padding: "4px 10px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontSize: 12 }, children: "\u7DE8\u8F2F" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 201,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert(`\u78BA\u5B9A\u8981\u522A\u9664 ${client.name} \u55CE\uFF1F\u6B64\u529F\u80FD\u5EFA\u7F6E\u4E2D`), style: { padding: "4px 10px", borderRadius: 4, border: "1px solid var(--mantine-color-red-filled)", background: "var(--mantine-color-red-light)", color: "var(--mantine-color-red-filled)", cursor: "pointer", fontSize: 12 }, children: "\u522A\u9664" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 202,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 200,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 199,
                  columnNumber: 23
                }, this)
              ] }, client.id, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 185,
                columnNumber: 21
              }, this)),
              filteredClients.length === 0 && /* @__PURE__ */ jsxDEV17(Table4.Tr, { children: /* @__PURE__ */ jsxDEV17(Table4.Td, { colSpan: 6, align: "center", style: { padding: "32px 0", color: "var(--mantine-color-dimmed)" }, children: "\u627E\u4E0D\u5230\u7B26\u5408\u689D\u4EF6\u7684\u5BA2\u6236" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 209,
                columnNumber: 23
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 208,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 183,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 172,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 135,
          columnNumber: 13
        }, this),
        tab === "tags" && /* @__PURE__ */ jsxDEV17(Box10, { children: [
          /* @__PURE__ */ jsxDEV17(Group14, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ jsxDEV17(Stack14, { gap: 2, children: [
              /* @__PURE__ */ jsxDEV17(Title15, { order: 3, children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 223,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", c: "dimmed", children: "\u5EFA\u7ACB\u4E00\u81F4\u7684\u6A19\u7C64\u5206\u985E\uFF0C\u63D0\u5347 KOL \u641C\u5C0B\u8207\u7BE9\u9078\u6548\u7387\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 224,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 222,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV17(
              "button",
              {
                type: "button",
                onClick: () => {
                  setTagModalMode("add"), setDraftTagValue(""), setTagModalOpened(!0);
                },
                style: {
                  padding: "8px 16px",
                  borderRadius: 4,
                  border: "1px solid var(--mantine-color-blue-filled)",
                  background: "var(--mantine-color-blue-light)",
                  color: "var(--mantine-color-blue-filled)",
                  cursor: "pointer",
                  fontWeight: 500
                },
                children: "\u65B0\u589E\u6A19\u7C64"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 226,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 221,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(Divider7, { my: "md" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 247,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(Grid4, { children: [
            /* @__PURE__ */ jsxDEV17(Grid4.Col, { span: { base: 12, md: 4 }, children: /* @__PURE__ */ jsxDEV17(Stack14, { gap: "xs", children: [
              /* @__PURE__ */ jsxDEV17(Text14, { fw: 600, size: "sm", c: "dimmed", children: "\u6A19\u7C64\u5206\u985E" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 252,
                columnNumber: 21
              }, this),
              tagGroups.map((group) => {
                let active = group.id === selectedGroupId;
                return /* @__PURE__ */ jsxDEV17(
                  Card14,
                  {
                    withBorder: !0,
                    radius: "md",
                    p: "sm",
                    role: "button",
                    tabIndex: 0,
                    onClick: () => setSelectedGroupId(group.id),
                    onKeyDown: (e) => {
                      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelectedGroupId(group.id));
                    },
                    style: {
                      cursor: "pointer",
                      background: active ? "var(--mantine-color-blue-light)" : "var(--mantine-color-body)",
                      borderColor: active ? "var(--mantine-color-blue-4)" : "var(--mantine-color-default-border)"
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV17(Text14, { fw: 600, children: group.name }, void 0, !1, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 276,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV17(Text14, { size: "xs", c: "dimmed", children: [
                        group.tags.length,
                        " \u500B\u6A19\u7C64"
                      ] }, void 0, !0, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 277,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  group.id,
                  !0,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 256,
                    columnNumber: 23
                  },
                  this
                );
              })
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 251,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 250,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV17(Grid4.Col, { span: { base: 12, md: 8 }, children: /* @__PURE__ */ jsxDEV17(Stack14, { gap: "sm", children: [
              /* @__PURE__ */ jsxDEV17(Group14, { justify: "space-between", align: "center", children: [
                /* @__PURE__ */ jsxDEV17(Title15, { order: 4, children: selectedGroup?.name ?? "-" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 285,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV17(Group14, { gap: "xs", children: [
                  /* @__PURE__ */ jsxDEV17(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setCategoryModalMode("edit"), setDraftCategoryName(selectedGroup?.name ?? ""), setCategoryModalOpened(!0);
                      },
                      style: {
                        padding: "4px 12px",
                        borderRadius: 4,
                        border: "1px solid var(--mantine-color-blue-filled)",
                        background: "var(--mantine-color-blue-light)",
                        color: "var(--mantine-color-blue-filled)",
                        cursor: "pointer",
                        fontSize: 13
                      },
                      children: "\u7DE8\u8F2F\u5206\u985E"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 287,
                      columnNumber: 25
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV17(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setCategoryModalMode("delete"), setCategoryModalOpened(!0);
                      },
                      style: {
                        padding: "4px 12px",
                        borderRadius: 4,
                        border: "1px solid var(--mantine-color-red-filled)",
                        background: "var(--mantine-color-red-light)",
                        color: "var(--mantine-color-red-filled)",
                        cursor: "pointer",
                        fontSize: 13
                      },
                      children: "\u522A\u9664\u5206\u985E"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 306,
                      columnNumber: 25
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 286,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 284,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV17(Group14, { gap: "xs", children: (selectedGroup?.tags ?? []).map((tag, index) => /* @__PURE__ */ jsxDEV17(
                Badge8,
                {
                  color: PILL_COLORS[index % PILL_COLORS.length],
                  variant: "light",
                  size: "lg",
                  style: { cursor: "pointer" },
                  onClick: () => {
                    setActiveTagValue(tag), setTagModalMode("edit"), setDraftTagValue(tag), setTagModalOpened(!0);
                  },
                  children: [
                    tag,
                    " ",
                    /* @__PURE__ */ jsxDEV17("span", { style: { marginLeft: 6, fontSize: 10, opacity: 0.7 }, children: "\u2715" }, void 0, !1, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 341,
                      columnNumber: 33
                    }, this)
                  ]
                },
                tag,
                !0,
                {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 328,
                  columnNumber: 25
                },
                this
              )) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 326,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV17(Card14, { withBorder: !0, radius: "md", p: "sm", children: /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", c: "dimmed", children: "\u9EDE\u64CA\u6A19\u7C64\u5373\u53EF\u5FEB\u901F\u7DE8\u8F2F\u6216\u522A\u9664\uFF0C\u5EFA\u7ACB\u4E00\u81F4\u7684\u7BE9\u9078\u6A19\u6E96\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 346,
                columnNumber: 23
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 345,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 283,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 282,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 249,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(
            Modal4,
            {
              id: "settings-tag-category-modal",
              opened: categoryModalOpened,
              onClose: () => setCategoryModalOpened(!1),
              title: categoryModalMode === "edit" ? "\u7DE8\u8F2F\u5206\u985E" : "\u522A\u9664\u5206\u985E",
              children: /* @__PURE__ */ jsxDEV17(Stack14, { children: categoryModalMode === "edit" ? /* @__PURE__ */ jsxDEV17(Fragment3, { children: [
                /* @__PURE__ */ jsxDEV17(
                  TextInput8,
                  {
                    label: "\u5206\u985E\u540D\u7A31",
                    value: draftCategoryName,
                    onChange: (e) => setDraftCategoryName(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 362,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV17(Group14, { justify: "flex-end", children: [
                  /* @__PURE__ */ jsxDEV17(Button14, { type: "button", variant: "default", onClick: () => setCategoryModalOpened(!1), children: "\u53D6\u6D88" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 368,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV17(
                    Button14,
                    {
                      type: "button",
                      onClick: () => {
                        let name = draftCategoryName.trim();
                        !name || !selectedGroup || (setTagGroups(
                          (prev) => prev.map((g) => g.id === selectedGroup.id ? { ...g, name } : g)
                        ), setCategoryModalOpened(!1));
                      },
                      children: "\u5132\u5B58"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 371,
                      columnNumber: 25
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 367,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 361,
                columnNumber: 21
              }, this) : /* @__PURE__ */ jsxDEV17(Fragment3, { children: [
                /* @__PURE__ */ jsxDEV17(Text14, { children: [
                  "\u78BA\u5B9A\u8981\u522A\u9664\u5206\u985E\u300C",
                  selectedGroup?.name,
                  "\u300D\u55CE\uFF1F\uFF08\u6B64\u64CD\u4F5C\u6703\u540C\u6642\u79FB\u9664\u8A72\u5206\u985E\u4E0B\u7684\u6240\u6709\u6A19\u7C64\uFF09"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 388,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV17(Group14, { justify: "flex-end", children: [
                  /* @__PURE__ */ jsxDEV17(Button14, { type: "button", variant: "default", onClick: () => setCategoryModalOpened(!1), children: "\u53D6\u6D88" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 392,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV17(
                    Button14,
                    {
                      type: "button",
                      color: "red",
                      onClick: () => {
                        if (!selectedGroup)
                          return;
                        setTagGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
                        let fallback = tagGroups.find((g) => g.id !== selectedGroup.id)?.id;
                        setSelectedGroupId(fallback ?? ""), setCategoryModalOpened(!1);
                      },
                      children: "\u78BA\u8A8D\u522A\u9664"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 395,
                      columnNumber: 25
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 391,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 387,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 359,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 353,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(
            Modal4,
            {
              id: "settings-tag-modal",
              opened: tagModalOpened,
              onClose: () => setTagModalOpened(!1),
              title: tagModalMode === "add" ? "\u65B0\u589E\u6A19\u7C64" : tagModalMode === "edit" ? "\u7DE8\u8F2F\u6A19\u7C64" : "\u522A\u9664\u6A19\u7C64",
              children: /* @__PURE__ */ jsxDEV17(Stack14, { children: [
                (tagModalMode === "add" || tagModalMode === "edit") && /* @__PURE__ */ jsxDEV17(
                  TextInput8,
                  {
                    label: "\u6A19\u7C64\u540D\u7A31",
                    value: draftTagValue,
                    onChange: (e) => setDraftTagValue(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 429,
                    columnNumber: 21
                  },
                  this
                ),
                tagModalMode === "delete" && /* @__PURE__ */ jsxDEV17(Text14, { children: [
                  "\u78BA\u5B9A\u8981\u522A\u9664\u6A19\u7C64\u300C",
                  activeTagValue,
                  "\u300D\u55CE\uFF1F"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 436,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV17(Group14, { justify: "flex-end", children: [
                  tagModalMode === "edit" && /* @__PURE__ */ jsxDEV17(
                    Button14,
                    {
                      type: "button",
                      variant: "light",
                      color: "red",
                      onClick: () => {
                        setTagModalMode("delete");
                      },
                      children: "\u522A\u9664"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 441,
                      columnNumber: 23
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV17(Button14, { type: "button", variant: "default", onClick: () => setTagModalOpened(!1), children: "\u53D6\u6D88" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 452,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV17(
                    Button14,
                    {
                      type: "button",
                      onClick: () => {
                        let v = draftTagValue.trim();
                        if (selectedGroup) {
                          if (tagModalMode === "add") {
                            if (!v)
                              return;
                            setTagGroups(
                              (prev) => prev.map(
                                (g) => g.id === selectedGroup.id && !g.tags.includes(v) ? { ...g, tags: [...g.tags, v] } : g
                              )
                            ), setTagModalOpened(!1);
                            return;
                          }
                          if (tagModalMode === "edit") {
                            if (!v)
                              return;
                            setTagGroups(
                              (prev) => prev.map(
                                (g) => g.id === selectedGroup.id ? {
                                  ...g,
                                  tags: g.tags.map((t) => t === activeTagValue ? v : t)
                                } : g
                              )
                            ), setActiveTagValue(v), setTagModalOpened(!1);
                            return;
                          }
                          tagModalMode === "delete" && (setTagGroups(
                            (prev) => prev.map(
                              (g) => g.id === selectedGroup.id ? { ...g, tags: g.tags.filter((t) => t !== activeTagValue) } : g
                            )
                          ), setTagModalOpened(!1));
                        }
                      },
                      children: tagModalMode === "delete" ? "\u78BA\u8A8D\u522A\u9664" : "\u5132\u5B58"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 455,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 439,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 427,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 415,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 220,
          columnNumber: 13
        }, this),
        tab === "brands" && /* @__PURE__ */ jsxDEV17(Box10, { children: [
          /* @__PURE__ */ jsxDEV17(Title15, { order: 3, children: "\u54C1\u724C\u7BA1\u7406" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 513,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(Text14, { c: "dimmed", mt: "xs", children: "\u9810\u7559\u54C1\u724C\u4E3B\u6A94\u8207\u54C1\u724C\u5C0D\u61C9\u908F\u8F2F\u7684\u7BA1\u7406\u7A7A\u9593\u3002" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 514,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert("\u65B0\u589E\u54C1\u724C\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: { marginTop: 16, padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }, children: "\u65B0\u589E\u54C1\u724C" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 515,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 512,
          columnNumber: 13
        }, this),
        tab === "preferences" && /* @__PURE__ */ jsxDEV17(Box10, { children: [
          /* @__PURE__ */ jsxDEV17(Title15, { order: 3, children: "\u7CFB\u7D71\u504F\u597D" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 521,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(Text14, { c: "dimmed", mt: "xs", children: "\u9810\u7559\u7CFB\u7D71\u53C3\u6578\u3001\u901A\u77E5\u3001AI \u8A2D\u5B9A\u7B49\u504F\u597D\u7BA1\u7406\u7A7A\u9593\u3002" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 522,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert("\u7DE8\u8F2F\u504F\u597D\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: { marginTop: 16, padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }, children: "\u7DE8\u8F2F\u504F\u597D" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 523,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 520,
          columnNumber: 13
        }, this),
        tab === "roles" && /* @__PURE__ */ jsxDEV17(Box10, { children: [
          /* @__PURE__ */ jsxDEV17(Title15, { order: 3, children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 529,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17(Text14, { c: "dimmed", mt: "xs", children: "\u9810\u7559\u89D2\u8272\u3001\u6B0A\u9650\u8207\u6210\u54E1\u6307\u6D3E\u7684\u7BA1\u7406\u7A7A\u9593\u3002" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 530,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV17("button", { type: "button", onClick: () => alert("\u65B0\u589E\u89D2\u8272\u529F\u80FD\u5EFA\u7F6E\u4E2D"), style: { marginTop: 16, padding: "8px 16px", borderRadius: 4, border: "1px solid var(--mantine-color-blue-filled)", background: "var(--mantine-color-blue-light)", color: "var(--mantine-color-blue-filled)", cursor: "pointer", fontWeight: 500 }, children: "\u65B0\u589E\u89D2\u8272" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 531,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 528,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.settings.tsx",
    lineNumber: 115,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => IndexRoute,
  loader: () => loader14
});
import { redirect as redirect7 } from "@remix-run/node";
async function loader14() {
  return redirect7("/login");
}
function IndexRoute() {
  return null;
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  default: () => LoginPage
});
import { useState as useState6 } from "react";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
function LoginPage() {
  let [dark, setDark] = useState6(!1), bg = dark ? "#0f172a" : "#ffffff", fg = dark ? "#f8fafc" : "#0f172a", subtle = dark ? "#94a3b8" : "#64748b", border = dark ? "#1e293b" : "#e2e8f0", googleBg = dark ? "#1e293b" : "#f8fafc", googleBorder = dark ? "#334155" : "#cbd5e1", googleHoverBg = dark ? "#273549" : "#f1f5f9";
  return /* @__PURE__ */ jsxDEV18(
    "div",
    {
      style: {
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      },
      children: [
        /* @__PURE__ */ jsxDEV18(
          "div",
          {
            style: {
              flex: "0 0 50%",
              position: "relative",
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f3460 65%, #1a1a2e 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "48px",
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ jsxDEV18(
                "svg",
                {
                  style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 },
                  viewBox: "0 0 600 800",
                  preserveAspectRatio: "xMidYMid slice",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "500", cy: "80", r: "280", fill: "#3b82f6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 45,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "50", cy: "700", r: "200", fill: "#6366f1" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 46,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "380", cy: "480", r: "150", fill: "#0ea5e9", opacity: "0.5" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 47,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("ellipse", { cx: "200", cy: "300", rx: "180", ry: "80", fill: "#7c3aed", opacity: "0.4", transform: "rotate(-30 200 300)" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 48,
                      columnNumber: 11
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 39,
                  columnNumber: 9
                },
                this
              ),
              /* @__PURE__ */ jsxDEV18(
                "svg",
                {
                  style: { position: "absolute", right: 0, bottom: "20%", opacity: 0.1 },
                  width: "360",
                  height: "360",
                  viewBox: "0 0 360 360",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "180", cy: "180", r: "32", fill: "none", stroke: "#60a5fa", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 60,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "80", cy: "100", r: "20", fill: "none", stroke: "#818cf8", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 61,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "290", cy: "90", r: "24", fill: "none", stroke: "#34d399", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 62,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "60", cy: "270", r: "18", fill: "none", stroke: "#f472b6", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 63,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "300", cy: "270", r: "22", fill: "none", stroke: "#fb923c", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 64,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("line", { x1: "180", y1: "180", x2: "80", y2: "100", stroke: "#60a5fa", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 66,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("line", { x1: "180", y1: "180", x2: "290", y2: "90", stroke: "#818cf8", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 67,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("line", { x1: "180", y1: "180", x2: "60", y2: "270", stroke: "#f472b6", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 68,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("line", { x1: "180", y1: "180", x2: "300", y2: "270", stroke: "#fb923c", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 69,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("line", { x1: "80", y1: "100", x2: "290", y2: "90", stroke: "#94a3b8", strokeWidth: "1", opacity: "0.4" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 70,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("line", { x1: "60", y1: "270", x2: "300", y2: "270", stroke: "#94a3b8", strokeWidth: "1", opacity: "0.4" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 71,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "180", cy: "180", r: "24", fill: "#1e40af" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 73,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "80", cy: "100", r: "14", fill: "#4c1d95" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 74,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "290", cy: "90", r: "16", fill: "#065f46" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 75,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "60", cy: "270", r: "12", fill: "#831843" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 76,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("circle", { cx: "300", cy: "270", r: "15", fill: "#7c2d12" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 77,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV18("text", { x: "166", y: "185", fill: "white", fontSize: "14", fontFamily: "sans-serif", children: "KOL" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 79,
                      columnNumber: 11
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 52,
                  columnNumber: 9
                },
                this
              ),
              /* @__PURE__ */ jsxDEV18("div", { style: { position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxDEV18("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }, children: [
                /* @__PURE__ */ jsxDEV18(
                  "div",
                  {
                    style: {
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: /* @__PURE__ */ jsxDEV18("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxDEV18("path", { d: "M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 97,
                      columnNumber: 17
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 96,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 85,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV18("span", { style: { color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }, children: "KOL DB" }, void 0, !1, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 100,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/login.tsx",
                lineNumber: 84,
                columnNumber: 11
              }, this) }, void 0, !1, {
                fileName: "app/routes/login.tsx",
                lineNumber: 83,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDEV18("div", { style: { position: "relative", zIndex: 1 }, children: [
                /* @__PURE__ */ jsxDEV18("div", { style: { marginBottom: 24 }, children: [
                  /* @__PURE__ */ jsxDEV18(
                    "span",
                    {
                      style: {
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
                      },
                      children: "Influencer Management Platform"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 107,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV18(
                    "h1",
                    {
                      style: {
                        color: "#ffffff",
                        fontSize: 42,
                        fontWeight: 800,
                        lineHeight: 1.15,
                        letterSpacing: "-1px",
                        margin: 0
                      },
                      children: [
                        "\u7D71\u4E00\u7BA1\u7406",
                        /* @__PURE__ */ jsxDEV18("br", {}, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 134,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV18(
                          "span",
                          {
                            style: {
                              background: "linear-gradient(90deg, #60a5fa, #818cf8, #34d399)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent"
                            },
                            children: "KOL \u5408\u4F5C\u5168\u9031\u671F"
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/login.tsx",
                            lineNumber: 135,
                            columnNumber: 15
                          },
                          this
                        )
                      ]
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 124,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV18("p", { style: { color: "#94a3b8", fontSize: 15, lineHeight: 1.6, marginTop: 16, maxWidth: 340 }, children: "\u5F9E\u63D0\u6848\u5230\u59D4\u520A\u55AE\uFF0C\u5F9E KOL \u641C\u5C0B\u5230\u7D50\u6848\u5831\u544A\uFF0C\u4E00\u500B\u5E73\u53F0\u638C\u63E1\u6240\u6709\u884C\u92B7\u5408\u4F5C\u6D41\u7A0B\u3002" }, void 0, !1, {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 145,
                    columnNumber: 13
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 106,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV18("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
                  { icon: "\u{1F465}", text: "KOL \u8CC7\u6599\u5EAB\u8207\u7BA1\u7406" },
                  { icon: "\u{1F4CB}", text: "\u63D0\u6848\u8207\u59D4\u520A\u55AE\u6D41\u7A0B" },
                  { icon: "\u{1F4CA}", text: "\u7D50\u6848\u5831\u544A\u81EA\u52D5\u751F\u6210" }
                ].map((f) => /* @__PURE__ */ jsxDEV18(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      backdropFilter: "blur(4px)"
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV18("span", { style: { fontSize: 18 }, children: f.icon }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 170,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV18("span", { style: { color: "#e2e8f0", fontSize: 14, fontWeight: 500 }, children: f.text }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 171,
                        columnNumber: 17
                      }, this)
                    ]
                  },
                  f.text,
                  !0,
                  {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 157,
                    columnNumber: 15
                  },
                  this
                )) }, void 0, !1, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 151,
                  columnNumber: 11
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/login.tsx",
                lineNumber: 105,
                columnNumber: 9
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 26,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV18(
          "div",
          {
            style: {
              flex: "0 0 50%",
              background: bg,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "48px",
              position: "relative",
              transition: "background 300ms"
            },
            children: [
              /* @__PURE__ */ jsxDEV18(
                "button",
                {
                  type: "button",
                  onClick: () => setDark((d) => !d),
                  style: {
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
                  },
                  children: [
                    dark ? "\u2600\uFE0F" : "\u{1F319}",
                    " ",
                    dark ? "Light" : "Dark"
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 193,
                  columnNumber: 9
                },
                this
              ),
              /* @__PURE__ */ jsxDEV18("div", { style: { width: "100%", maxWidth: 360 }, children: [
                /* @__PURE__ */ jsxDEV18("div", { style: { marginBottom: 40 }, children: [
                  /* @__PURE__ */ jsxDEV18(
                    "h2",
                    {
                      style: {
                        color: fg,
                        fontSize: 28,
                        fontWeight: 800,
                        letterSpacing: "-0.5px",
                        margin: 0,
                        marginBottom: 8
                      },
                      children: "\u6B61\u8FCE\u56DE\u4F86 \u{1F44B}"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 220,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV18("p", { style: { color: subtle, fontSize: 15, margin: 0, lineHeight: 1.6 }, children: "\u4F7F\u7528 Google \u5E33\u865F\u767B\u5165\u4EE5\u7E7C\u7E8C\u4F7F\u7528 KOL DB" }, void 0, !1, {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 232,
                    columnNumber: 13
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 219,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV18(
                  "a",
                  {
                    href: "/dashboard",
                    style: {
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
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = googleHoverBg, e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = googleBg, e.currentTarget.style.boxShadow = "none";
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV18("svg", { width: "20", height: "20", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
                        /* @__PURE__ */ jsxDEV18("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 269,
                          columnNumber: 15
                        }, this),
                        /* @__PURE__ */ jsxDEV18("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 270,
                          columnNumber: 15
                        }, this),
                        /* @__PURE__ */ jsxDEV18("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 271,
                          columnNumber: 15
                        }, this),
                        /* @__PURE__ */ jsxDEV18("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 272,
                          columnNumber: 15
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 268,
                        columnNumber: 13
                      }, this),
                      "\u4F7F\u7528 Google \u5E33\u865F\u767B\u5165"
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 238,
                    columnNumber: 11
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV18(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 24
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV18("div", { style: { flex: 1, height: 1, background: border } }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 286,
                        columnNumber: 13
                      }, this),
                      /* @__PURE__ */ jsxDEV18("span", { style: { color: subtle, fontSize: 12, whiteSpace: "nowrap" }, children: "\u76EE\u524D\u50C5\u652F\u63F4 Google \u767B\u5165" }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 287,
                        columnNumber: 13
                      }, this),
                      /* @__PURE__ */ jsxDEV18("div", { style: { flex: 1, height: 1, background: border } }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 288,
                        columnNumber: 13
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV18(
                  "div",
                  {
                    style: {
                      background: dark ? "#1e293b" : "#f8fafc",
                      border: `1px solid ${border}`,
                      borderRadius: 12,
                      padding: "16px 18px",
                      marginBottom: 32
                    },
                    children: /* @__PURE__ */ jsxDEV18("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" }, children: [
                      /* @__PURE__ */ jsxDEV18("span", { style: { fontSize: 16, marginTop: 1 }, children: "\u{1F512}" }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 302,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV18("div", { children: [
                        /* @__PURE__ */ jsxDEV18("p", { style: { color: fg, fontSize: 13, fontWeight: 600, margin: 0, marginBottom: 4 }, children: "\u5B89\u5168\u767B\u5165" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 304,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV18("p", { style: { color: subtle, fontSize: 12, margin: 0, lineHeight: 1.5 }, children: "\u900F\u904E BetterAuth + Google OAuth 2.0 \u9032\u884C\u8EAB\u5206\u9A57\u8B49\uFF0C\u6211\u5011\u4E0D\u5132\u5B58\u60A8\u7684\u5BC6\u78BC\u3002" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 307,
                          columnNumber: 17
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 303,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 301,
                      columnNumber: 13
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 292,
                    columnNumber: 11
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV18("p", { style: { color: subtle, fontSize: 12, textAlign: "center", lineHeight: 1.6 }, children: [
                  "\u767B\u5165\u5373\u4EE3\u8868\u60A8\u540C\u610F\u6211\u5011\u7684",
                  " ",
                  /* @__PURE__ */ jsxDEV18("a", { href: "#", style: { color: "#3b82f6", textDecoration: "none" }, children: "\u670D\u52D9\u689D\u6B3E" }, void 0, !1, {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 318,
                    columnNumber: 13
                  }, this),
                  " ",
                  "\u53CA",
                  " ",
                  /* @__PURE__ */ jsxDEV18("a", { href: "#", style: { color: "#3b82f6", textDecoration: "none" }, children: "\u96B1\u79C1\u653F\u7B56" }, void 0, !1, {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 320,
                    columnNumber: 13
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 315,
                  columnNumber: 11
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/login.tsx",
                lineNumber: 217,
                columnNumber: 9
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 179,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/login.tsx",
      lineNumber: 16,
      columnNumber: 5
    },
    this
  );
}

// app/routes/_app.tsx
var app_exports = {};
__export(app_exports, {
  default: () => AppLayoutRoute
});
import { AppShell, Group as Group15, Stack as Stack15, Text as Text15, Title as Title16 } from "@mantine/core";
import { Outlet as Outlet2, useLocation } from "@remix-run/react";
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "\u{1F4CA}" },
  { to: "/proposals", label: "\u63D0\u6848\u7BA1\u7406", icon: "\u{1F4CB}" },
  { to: "/kols", label: "KOL \u7BA1\u7406", icon: "\u{1F465}" },
  { to: "/insertion-orders", label: "\u59D4\u520A\u55AE\u7BA1\u7406", icon: "\u{1F4DD}" },
  { to: "/favorites", label: "\u6211\u7684\u6536\u85CF", icon: "\u2B50" },
  { to: "/reports/generate", label: "\u7D50\u6848\u5831\u544A\u7522\u751F", icon: "\u{1F4C8}" }
];
function navLinkStyle(active) {
  return {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "9px 12px",
    borderRadius: 10,
    background: "transparent",
    color: active ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    fontWeight: active ? 600 : 500,
    border: "1px solid transparent",
    textDecoration: "none",
    boxSizing: "border-box",
    fontSize: 14,
    transition: "color 150ms"
  };
}
function AppLayoutRoute() {
  let location = useLocation();
  return /* @__PURE__ */ jsxDEV19(
    AppShell,
    {
      header: { height: 64 },
      navbar: { width: 260, breakpoint: "sm" },
      padding: "md",
      children: [
        /* @__PURE__ */ jsxDEV19(AppShell.Header, { children: [
          /* @__PURE__ */ jsxDEV19("style", { dangerouslySetInnerHTML: {
            __html: `
          body.sidebar-collapsed {
            --app-shell-navbar-offset: 0px !important;
            --app-shell-navbar-width: 0px !important;
          }
          /* Mantine AppShell attribute/class names can vary by version/build.
             Target the common ones to ensure true collapse (no overlay text/icons). */
          body.sidebar-collapsed [data-app-shell-navbar],
          body.sidebar-collapsed [data-mantine-appshell-navbar],
          body.sidebar-collapsed .mantine-AppShell-navbar {
            display: none !important;
          }
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar {
            white-space: nowrap;
            overflow: hidden;
          }
          body.sidebar-collapsed [data-app-shell-main],
          body.sidebar-collapsed [data-mantine-appshell-main],
          body.sidebar-collapsed .mantine-AppShell-main {
            margin-left: 0 !important;
          }
          body.sidebar-collapsed [data-app-shell-main] *,
          body.sidebar-collapsed [data-mantine-appshell-main] *,
          body.sidebar-collapsed .mantine-AppShell-main * {
            pointer-events: auto;
          }
          /* Ensure smooth transition */
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar,
          [data-app-shell-main],
          [data-mantine-appshell-main],
          .mantine-AppShell-main {
            transition: transform 200ms ease, padding 200ms ease, margin 200ms ease, width 200ms ease, opacity 200ms ease !important;
          }
          body.sidebar-collapsed .nav-label {
            display: none !important;
          }
        `
          } }, void 0, !1, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 41,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV19(Group15, { justify: "space-between", align: "center", h: "100%", px: "md", children: [
            /* @__PURE__ */ jsxDEV19(Group15, { gap: "sm", children: [
              /* @__PURE__ */ jsxDEV19(
                "button",
                {
                  id: "kol-sidebar-toggle-btn",
                  type: "button",
                  style: {
                    background: "transparent",
                    border: "1px solid var(--mantine-color-default-border)",
                    borderRadius: 6,
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--mantine-color-text)"
                  },
                  children: "\u2630"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 85,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV19(Stack15, { gap: 0, children: [
                /* @__PURE__ */ jsxDEV19(Title16, { order: 4, children: "KOL DB" }, void 0, !1, {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 104,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV19(Text15, { size: "xs", c: "dimmed", children: "\u7D71\u4E00\u7BA1\u7406 KOL / \u63D0\u6848 / \u59D4\u520A\u55AE" }, void 0, !1, {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 105,
                  columnNumber: 15
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.tsx",
                lineNumber: 103,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 84,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV19(
              "button",
              {
                id: "kol-theme-toggle-btn",
                type: "button",
                suppressHydrationWarning: !0,
                style: {
                  background: "transparent",
                  border: "1px solid var(--mantine-color-default-border)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: "var(--mantine-color-dimmed)",
                  fontSize: 13,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  lineHeight: 1
                },
                children: [
                  /* @__PURE__ */ jsxDEV19("span", { id: "kol-theme-icon", children: "\u{1F319}" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 134,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV19("span", { id: "kol-theme-label", children: "Dark" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 135,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_app.tsx",
                lineNumber: 115,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV19(
              "script",
              {
                suppressHydrationWarning: !0,
                dangerouslySetInnerHTML: {
                  __html: `
(function() {
  var STORAGE_KEY = 'mantine-color-scheme-value';
  var btn = document.getElementById('kol-theme-toggle-btn');
  var icon = document.getElementById('kol-theme-icon');
  var label = document.getElementById('kol-theme-label');

  function getTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-mantine-color-scheme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
    if (icon) icon.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  // Apply saved theme on load
  applyTheme(getTheme());

  if (btn) {
    btn.addEventListener('click', function() {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // Sidebar toggle
  var sidebarBtn = document.getElementById('kol-sidebar-toggle-btn');
  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', function() {
      document.body.classList.toggle('sidebar-collapsed');
    });
  }
})();
              `
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.tsx",
                lineNumber: 140,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 83,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 40,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV19(AppShell.Navbar, { p: "sm", style: { zIndex: 90, pointerEvents: "auto" }, children: [
          /* @__PURE__ */ jsxDEV19(Stack15, { gap: "xs", style: { flex: 1 }, children: navItems.map((item) => {
            let active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return /* @__PURE__ */ jsxDEV19("a", { href: item.to, style: navLinkStyle(active), children: [
              /* @__PURE__ */ jsxDEV19("span", { className: "nav-icon", style: { marginRight: 8 }, children: item.icon }, void 0, !1, {
                fileName: "app/routes/_app.tsx",
                lineNumber: 193,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV19("span", { className: "nav-label", children: item.label }, void 0, !1, {
                fileName: "app/routes/_app.tsx",
                lineNumber: 194,
                columnNumber: 17
              }, this)
            ] }, item.to, !0, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 192,
              columnNumber: 15
            }, this);
          }) }, void 0, !1, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 186,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV19("div", { style: { marginTop: "auto", paddingTop: 12 }, children: [
            /* @__PURE__ */ jsxDEV19(
              "a",
              {
                href: "/settings",
                style: {
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "9px 12px",
                  borderRadius: 10,
                  color: "var(--mantine-color-text)",
                  textDecoration: "none",
                  boxSizing: "border-box",
                  fontSize: 14,
                  border: "1px solid transparent",
                  marginBottom: 4
                },
                children: [
                  /* @__PURE__ */ jsxDEV19("span", { className: "nav-icon", style: { marginRight: 8 }, children: "\u2699\uFE0F" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 217,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV19("span", { className: "nav-label", children: "\u7CFB\u7D71\u8A2D\u5B9A" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 218,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_app.tsx",
                lineNumber: 201,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV19(
              "a",
              {
                href: "/login",
                style: {
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "9px 12px",
                  borderRadius: 10,
                  color: "var(--mantine-color-dimmed)",
                  textDecoration: "none",
                  boxSizing: "border-box",
                  fontSize: 14,
                  border: "1px solid transparent"
                },
                children: [
                  /* @__PURE__ */ jsxDEV19("span", { className: "nav-icon", style: { marginRight: 8 }, children: "\u{1F6AA}" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 235,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV19("span", { className: "nav-label", children: "\u767B\u51FA\uFF08\u56DE\u767B\u5165\u9801\uFF09" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 236,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_app.tsx",
                lineNumber: 220,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 200,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 185,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV19(AppShell.Main, { children: /* @__PURE__ */ jsxDEV19(Outlet2, {}, void 0, !1, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 242,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.tsx",
          lineNumber: 241,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/_app.tsx",
      lineNumber: 35,
      columnNumber: 5
    },
    this
  );
}

// app/routes/$.tsx
var __exports = {};
__export(__exports, {
  default: () => SplatRoute,
  loader: () => loader15
});
function loader15() {
  throw new Response("Not Found", { status: 404 });
}
function SplatRoute() {
  return null;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-UBDDNUOG.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-XFKJYJC4.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-YEIDLYOX.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-Y3BGVQBD.js", imports: ["/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/$": { id: "routes/$", parentId: "root", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/$-BZO2TL3R.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app": { id: "routes/_app", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/_app-6VD5PVTB.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.dashboard": { id: "routes/_app.dashboard", parentId: "routes/_app", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.dashboard-DTXIX2E2.js", imports: ["/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.favorites": { id: "routes/_app.favorites", parentId: "routes/_app", path: "favorites", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.favorites-DEBTSRRE.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.insertion-orders.$insertionOrderId": { id: "routes/_app.insertion-orders.$insertionOrderId", parentId: "routes/_app", path: "insertion-orders/:insertionOrderId", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.insertion-orders.$insertionOrderId-ZXS5QGI5.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.insertion-orders._index": { id: "routes/_app.insertion-orders._index", parentId: "routes/_app", path: "insertion-orders", index: !0, caseSensitive: void 0, module: "/build/routes/_app.insertion-orders._index-L3GYX5VY.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.insertion-orders.new": { id: "routes/_app.insertion-orders.new", parentId: "routes/_app", path: "insertion-orders/new", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.insertion-orders.new-474JB7RK.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols.$kolId._index": { id: "routes/_app.kols.$kolId._index", parentId: "routes/_app", path: "kols/:kolId", index: !0, caseSensitive: void 0, module: "/build/routes/_app.kols.$kolId._index-T25VEPIM.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols.$kolId.edit": { id: "routes/_app.kols.$kolId.edit", parentId: "routes/_app", path: "kols/:kolId/edit", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.kols.$kolId.edit-DBLULRYV.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols._index": { id: "routes/_app.kols._index", parentId: "routes/_app", path: "kols", index: !0, caseSensitive: void 0, module: "/build/routes/_app.kols._index-DYKBBVFX.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols.new": { id: "routes/_app.kols.new", parentId: "routes/_app", path: "kols/new", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.kols.new-WHSU7DBO.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.proposals.$proposalId": { id: "routes/_app.proposals.$proposalId", parentId: "routes/_app", path: "proposals/:proposalId", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.proposals.$proposalId-IWMHOVJA.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.proposals._index": { id: "routes/_app.proposals._index", parentId: "routes/_app", path: "proposals", index: !0, caseSensitive: void 0, module: "/build/routes/_app.proposals._index-KAUMFGCV.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.proposals.new": { id: "routes/_app.proposals.new", parentId: "routes/_app", path: "proposals/new", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.proposals.new-P42TYE5Z.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.reports.generate": { id: "routes/_app.reports.generate", parentId: "routes/_app", path: "reports/generate", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.reports.generate-Z5XSGTK3.js", imports: ["/build/_shared/chunk-HTRQC2VH.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.settings": { id: "routes/_app.settings", parentId: "routes/_app", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.settings-4J62JRLE.js", imports: ["/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-62B2IAZI.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-KUXT7IG6.js", imports: ["/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.ai-parse-order": { id: "routes/api.ai-parse-order", parentId: "root", path: "api/ai-parse-order", index: void 0, caseSensitive: void 0, module: "/build/routes/api.ai-parse-order-OFXOK4LN.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.social-followers": { id: "routes/api.social-followers", parentId: "root", path: "api/social-followers", index: void 0, caseSensitive: void 0, module: "/build/routes/api.social-followers-VVGDZ4IC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-2TDIHLPT.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "82789f96", hmr: { runtime: "/build/_shared\\chunk-YEIDLYOX.js", timestamp: 1773642858127 }, url: "/build/manifest-82789F96.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_app.insertion-orders.$insertionOrderId": {
    id: "routes/_app.insertion-orders.$insertionOrderId",
    parentId: "routes/_app",
    path: "insertion-orders/:insertionOrderId",
    index: void 0,
    caseSensitive: void 0,
    module: app_insertion_orders_insertionOrderId_exports
  },
  "routes/_app.insertion-orders._index": {
    id: "routes/_app.insertion-orders._index",
    parentId: "routes/_app",
    path: "insertion-orders",
    index: !0,
    caseSensitive: void 0,
    module: app_insertion_orders_index_exports
  },
  "routes/_app.proposals.$proposalId": {
    id: "routes/_app.proposals.$proposalId",
    parentId: "routes/_app",
    path: "proposals/:proposalId",
    index: void 0,
    caseSensitive: void 0,
    module: app_proposals_proposalId_exports
  },
  "routes/_app.insertion-orders.new": {
    id: "routes/_app.insertion-orders.new",
    parentId: "routes/_app",
    path: "insertion-orders/new",
    index: void 0,
    caseSensitive: void 0,
    module: app_insertion_orders_new_exports
  },
  "routes/_app.kols.$kolId._index": {
    id: "routes/_app.kols.$kolId._index",
    parentId: "routes/_app",
    path: "kols/:kolId",
    index: !0,
    caseSensitive: void 0,
    module: app_kols_kolId_index_exports
  },
  "routes/_app.kols.$kolId.edit": {
    id: "routes/_app.kols.$kolId.edit",
    parentId: "routes/_app",
    path: "kols/:kolId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: app_kols_kolId_edit_exports
  },
  "routes/_app.proposals._index": {
    id: "routes/_app.proposals._index",
    parentId: "routes/_app",
    path: "proposals",
    index: !0,
    caseSensitive: void 0,
    module: app_proposals_index_exports
  },
  "routes/_app.reports.generate": {
    id: "routes/_app.reports.generate",
    parentId: "routes/_app",
    path: "reports/generate",
    index: void 0,
    caseSensitive: void 0,
    module: app_reports_generate_exports
  },
  "routes/api.social-followers": {
    id: "routes/api.social-followers",
    parentId: "root",
    path: "api/social-followers",
    index: void 0,
    caseSensitive: void 0,
    module: api_social_followers_exports
  },
  "routes/api.ai-parse-order": {
    id: "routes/api.ai-parse-order",
    parentId: "root",
    path: "api/ai-parse-order",
    index: void 0,
    caseSensitive: void 0,
    module: api_ai_parse_order_exports
  },
  "routes/_app.proposals.new": {
    id: "routes/_app.proposals.new",
    parentId: "routes/_app",
    path: "proposals/new",
    index: void 0,
    caseSensitive: void 0,
    module: app_proposals_new_exports
  },
  "routes/_app.kols._index": {
    id: "routes/_app.kols._index",
    parentId: "routes/_app",
    path: "kols",
    index: !0,
    caseSensitive: void 0,
    module: app_kols_index_exports
  },
  "routes/_app.dashboard": {
    id: "routes/_app.dashboard",
    parentId: "routes/_app",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: app_dashboard_exports
  },
  "routes/_app.favorites": {
    id: "routes/_app.favorites",
    parentId: "routes/_app",
    path: "favorites",
    index: void 0,
    caseSensitive: void 0,
    module: app_favorites_exports
  },
  "routes/_app.kols.new": {
    id: "routes/_app.kols.new",
    parentId: "routes/_app",
    path: "kols/new",
    index: void 0,
    caseSensitive: void 0,
    module: app_kols_new_exports
  },
  "routes/_app.settings": {
    id: "routes/_app.settings",
    parentId: "routes/_app",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: app_settings_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/_app": {
    id: "routes/_app",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
