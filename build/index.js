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
import { useEffect } from "react";

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
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
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
          lineNumber: 31,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ColorSchemeScript, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(MantineProvider, { defaultColorScheme: "auto", children: /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  let error = useRouteError(), status = 500, title = "\u7CFB\u7D71\u767C\u751F\u932F\u8AA4", message = "\u62B1\u6B49\uFF0C\u7CFB\u7D71\u9047\u5230\u4E86\u4E00\u4E9B\u554F\u984C\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002";
  return isRouteErrorResponse(error) && (status = error.status, status === 404 && (title = "\u627E\u4E0D\u5230\u9801\u9762", message = "\u60A8\u6B63\u5728\u5C0B\u627E\u7684\u9801\u9762\u4E0D\u5B58\u5728\u3002\u5B83\u53EF\u80FD\u5DF2\u88AB\u79FB\u9664\u3001\u91CD\u65B0\u547D\u540D\u6216\u66AB\u6642\u7121\u6CD5\u4F7F\u7528\u3002")), useEffect(() => {
    let timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3e3);
    return () => clearTimeout(timer);
  }, []), /* @__PURE__ */ jsxDEV2("html", { lang: "zh-Hant", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("title", { children: `${status} ${title}` }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ColorSchemeScript, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(MantineProvider, { defaultColorScheme: "auto", children: /* @__PURE__ */ jsxDEV2(Center, { h: "100vh", children: /* @__PURE__ */ jsxDEV2(Stack, { align: "center", gap: "md", children: [
        /* @__PURE__ */ jsxDEV2(Title, { style: { fontSize: 120, lineHeight: 1, color: "var(--mantine-color-blue-filled)" }, children: status }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV2(Title, { order: 2, children: title }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 91,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV2(Text, { c: "dimmed", size: "lg", ta: "center", maw: 500, children: message }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 92,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV2(Text, { c: "blue", size: "sm", ta: "center", mt: "xs", children: "\u7CFB\u7D71\u5C07\u65BC 3 \u79D2\u5F8C\u81EA\u52D5\u70BA\u60A8\u5C0E\u5411\u81F3\u9996\u9801..." }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 95,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV2(Button, { component: "a", href: "/dashboard", mt: "xl", size: "lg", variant: "light", children: "\u7ACB\u5373\u8FD4\u56DE\u9996\u9801" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 98,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 89,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 79,
    columnNumber: 5
  }, this);
}

// app/routes/_app.insertion-orders.$insertionOrderId._index.tsx
var app_insertion_orders_insertionOrderId_index_exports = {};
__export(app_insertion_orders_insertionOrderId_index_exports, {
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
  json,
  redirect
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { useState as useState2 } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

// app/components/ClientOnly.tsx
import { useEffect as useEffect2, useState } from "react";
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function ClientOnly({ children, fallback = null }) {
  let [mounted, setMounted] = useState(!1);
  return useEffect2(() => {
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
async function updateProposal(id, data) {
  return (await fetch(`${MOCK_API_BASE}/proposals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function deleteProposal(id) {
  return (await fetch(`${MOCK_API_BASE}/proposals/${id}`, {
    method: "DELETE"
  })).ok;
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
async function deleteProposalKol(id) {
  return (await fetch(`${MOCK_API_BASE}/proposalKols/${id}`, {
    method: "DELETE"
  })).ok;
}
async function listInsertionOrders() {
  return (await fetch(`${MOCK_API_BASE}/insertionOrders`)).json();
}
async function listTagCatalog() {
  try {
    let res = await fetch(`${MOCK_API_BASE}/tagCatalog`);
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
async function addTagCatalog(data) {
  return (await fetch(`${MOCK_API_BASE}/tagCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function updateTagCatalog(id, data) {
  return (await fetch(`${MOCK_API_BASE}/tagCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function deleteTagCatalog(id) {
  return (await fetch(`${MOCK_API_BASE}/tagCatalog/${id}`, {
    method: "DELETE"
  })).ok;
}
async function listBrandCatalog() {
  try {
    let res = await fetch(`${MOCK_API_BASE}/brandCatalog`);
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
async function addBrandCatalog(data) {
  return (await fetch(`${MOCK_API_BASE}/brandCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function updateBrandCatalog(id, data) {
  return (await fetch(`${MOCK_API_BASE}/brandCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function deleteBrandCatalog(id) {
  return (await fetch(`${MOCK_API_BASE}/brandCatalog/${id}`, {
    method: "DELETE"
  })).ok;
}
async function listIndustryCatalog() {
  try {
    let res = await fetch(`${MOCK_API_BASE}/industryCatalog`);
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
async function addIndustryCatalog(data) {
  return (await fetch(`${MOCK_API_BASE}/industryCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function updateIndustryCatalog(id, data) {
  return (await fetch(`${MOCK_API_BASE}/industryCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function deleteIndustryCatalog(id) {
  return (await fetch(`${MOCK_API_BASE}/industryCatalog/${id}`, {
    method: "DELETE"
  })).ok;
}
async function listPlatformCatalog() {
  try {
    let res = await fetch(`${MOCK_API_BASE}/platformCatalog`);
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
async function addPlatformCatalog(data) {
  return (await fetch(`${MOCK_API_BASE}/platformCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function updatePlatformCatalog(id, data) {
  return (await fetch(`${MOCK_API_BASE}/platformCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function deletePlatformCatalog(id) {
  return (await fetch(`${MOCK_API_BASE}/platformCatalog/${id}`, {
    method: "DELETE"
  })).ok;
}
async function listTeamMembers() {
  return (await fetch(`${MOCK_API_BASE}/teamMembers`)).json();
}
async function addTeamMember(data) {
  return (await fetch(`${MOCK_API_BASE}/teamMembers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function updateTeamMember(id, data) {
  return (await fetch(`${MOCK_API_BASE}/teamMembers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}
async function deleteTeamMember(id) {
  return (await fetch(`${MOCK_API_BASE}/teamMembers/${id}`, {
    method: "DELETE"
  })).ok;
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
async function deleteInsertionOrder(id) {
  return (await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`, {
    method: "DELETE"
  })).ok;
}

// app/routes/_app.insertion-orders.$insertionOrderId._index.tsx
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
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 79,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { children: [
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "lg", children: kol.name }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 81,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: [
            kol.services,
            " | NT$ ",
            (kol.price ?? 0).toLocaleString("zh-TW")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          kol.executionDate && /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: [
            "\u57F7\u884C\u65E5\u671F\uFF1A",
            kol.executionDate
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 86,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 80,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 78,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4(Group, { gap: "xl", children: [
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, align: "center", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u89F8\u53CA" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 92,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "xl", children: (kol.totalReach ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 93,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 91,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, align: "center", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E92\u52D5" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 96,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "xl", children: (kol.totalEngagement ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 97,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 95,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, align: "center", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u8A55\u50F9" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 100,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(Group, { gap: 4, children: [
            /* @__PURE__ */ jsxDEV4(Text2, { fw: 700, size: "xl", children: (kol.rating ?? 0).toFixed(1) }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 102,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV4(Text2, { color: "yellow", children: "\u2B50" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 103,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 101,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 99,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 90,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 77,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(Divider, {}, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 109,
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
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 115,
        columnNumber: 15
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 113,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 112,
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
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 145,
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
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 153,
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
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 161,
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
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 170,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 144,
      columnNumber: 11
    }, this),
    activeTab === "performance" && /* @__PURE__ */ jsxDEV4(Box, { pt: "xs", children: (kol.performanceItems ?? []).length > 0 ? /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: { base: 1, sm: 2 }, spacing: "sm", children: kol.performanceItems?.map((perf) => /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, p: "sm", radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Group, { justify: "space-between", mb: "xs", children: [
        /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 700, children: perf.title }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 190,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Badge, { size: "xs", children: "\u5DF2\u8FFD\u8E64" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 191,
          columnNumber: 23
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 189,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: 4, children: [
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u66DD\u5149" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 195,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: (perf.metrics?.impressions ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 196,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 194,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u89F8\u53CA" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 201,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: (perf.metrics?.reach ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 202,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 200,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E92\u52D5\u6B21\u6578" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 207,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: (perf.metrics?.likes ?? 0).toLocaleString("zh-TW") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 208,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 206,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Stack2, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E92\u52D5\u7387" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 213,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: [
            (perf.metrics?.engagementRate ?? 0).toFixed(1),
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 214,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 212,
          columnNumber: 23
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 193,
        columnNumber: 21
      }, this)
    ] }, perf.id, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 188,
      columnNumber: 19
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 186,
      columnNumber: 15
    }, this) : /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", c: "dimmed", p: "md", ta: "center", children: "\u5C1A\u7121\u6210\u6548\u6578\u64DA" }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 223,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 184,
      columnNumber: 11
    }, this),
    activeTab === "reviews" && /* @__PURE__ */ jsxDEV4(Box, { pt: "xs", children: (kol.reviews ?? []).length > 0 ? /* @__PURE__ */ jsxDEV4(Stack2, { gap: "xs", children: kol.reviews?.map((rv) => /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, p: "sm", radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxDEV4(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV4(Avatar, { src: rv.avatarUrl, size: "sm" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 237,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 600, children: rv.author }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 238,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: rv.date }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 239,
            columnNumber: 25
          }, this),
          rv.type && /* @__PURE__ */ jsxDEV4(Badge, { size: "xs", color: rv.type === "internal" ? "red" : "blue", children: rv.type === "internal" ? "\u5167\u8A55" : "\u5916\u8A55" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 241,
            columnNumber: 27
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 236,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV4(Rating, { value: rv.rating, readOnly: !0, size: "xs" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 246,
          columnNumber: 23
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 235,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", mt: "xs", children: rv.comment }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 248,
        columnNumber: 21
      }, this)
    ] }, rv.id, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 234,
      columnNumber: 19
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 232,
      columnNumber: 15
    }, this) : /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", c: "dimmed", p: "md", ta: "center", children: "\u5C1A\u7121\u8A55\u50F9\u5167\u5BB9" }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 253,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 230,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
    lineNumber: 76,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
    lineNumber: 75,
    columnNumber: 5
  }, this);
}
async function loader({ params }) {
  let insertionOrderId = params.insertionOrderId ?? "", [insertionOrder, brandCatalog, industryCatalog, teamMembers] = await Promise.all([
    getInsertionOrder(insertionOrderId),
    listBrandCatalog(),
    listIndustryCatalog(),
    listTeamMembers()
  ]);
  if (!insertionOrder)
    throw new Response("Not Found", { status: 404 });
  let salesOwners = teamMembers.filter((m) => m.group === "AE").map((m) => m.name), kolManagers = teamMembers.filter((m) => m.group === "KOL").map((m) => m.name), brands = brandCatalog.map((b) => b.name), industries = industryCatalog.map((i) => i.name);
  return json({ insertionOrder, salesOwners, kolManagers, brands, industries });
}
async function action({ request, params }) {
  let orderId = params.insertionOrderId ?? "", formData = await request.formData(), intent = formData.get("intent");
  if (intent === "updateOrder") {
    let projectName = String(formData.get("projectName") ?? "").trim(), clientName = String(formData.get("clientName") ?? "").trim(), brand = String(formData.get("brand") ?? "").trim(), industry = String(formData.get("industry") ?? "").trim(), mcnName = String(formData.get("mcnName") ?? "").trim(), salesOwner = String(formData.get("salesOwner") ?? "").trim(), kolManager = String(formData.get("kolManager") ?? "").trim(), startDate = String(formData.get("startDate") ?? "").trim(), endDate = String(formData.get("endDate") ?? "").trim(), totalBudget = Number(formData.get("totalBudget") ?? 0), tax = Number(formData.get("tax") ?? 0), totalWithTax = totalBudget + tax;
    return await updateInsertionOrder(orderId, {
      projectName,
      title: projectName,
      clientName,
      brand,
      industry,
      mcnName,
      salesOwner,
      kolManager,
      startDate,
      endDate,
      totalBudget,
      tax,
      totalWithTax
    }), json({ success: !0 });
  }
  if (intent === "deleteOrder")
    return await deleteInsertionOrder(orderId), redirect("/insertion-orders");
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
function parseNotes(raw) {
  if (!raw)
    return { description: "", internalNotes: "" };
  let lines = raw.split(`
`), descLines = [], noteLines = [];
  for (let line of lines)
    line.startsWith("internal:") ? noteLines.push(line.slice(9)) : descLines.push(line);
  return {
    description: descLines.join(`
`).trim(),
    internalNotes: noteLines.join(`
`).trim()
  };
}
function InsertionOrderDetailPage() {
  let { insertionOrder, salesOwners, kolManagers, brands, industries } = useLoaderData(), collaborations = insertionOrder.collaborations ?? [], fetcher = useFetcher(), submit = useSubmit(), [isEditing, setIsEditing] = useState2(!1), { description, internalNotes } = parseNotes(insertionOrder.notes), [reviewOpened, { open: openReview, close: closeReview }] = useDisclosure(!1), [perfOpened, { open: openPerf, close: closePerf }] = useDisclosure(!1), [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(!1), [selectedKol, setSelectedKol] = useState2(null), totalReach = insertionOrder.totalReach ?? collaborations.reduce((sum, c) => sum + (c.totalReach ?? 0), 0), totalEngagement = insertionOrder.totalEngagement ?? collaborations.reduce((sum, c) => sum + (c.totalEngagement ?? 0), 0), avgRating = insertionOrder.avgRating ?? (collaborations.length > 0 ? collaborations.reduce((sum, c) => sum + (c.rating ?? 0), 0) / collaborations.length : 0), avgEngagementRate = insertionOrder.avgEngagementRate ?? 0, chartData = collaborations.map((c) => ({
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
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 454,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Text2, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 457,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Text2, { fw: 600, children: [
        "\u6848\u4EF6 #",
        insertionOrder.orderNo
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 458,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 453,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Group, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsxDEV4(Group, { children: [
        /* @__PURE__ */ jsxDEV4(Button2, { variant: "default", component: Link, to: "/insertion-orders", children: "\u8FD4\u56DE" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 463,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4(Title2, { order: 2, children: [
          "\u6848\u4EF6 #",
          insertionOrder.orderNo
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 466,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 462,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Group, { children: [
        /* @__PURE__ */ jsxDEV4(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV4(
            Button2,
            {
              component: Link,
              to: `/insertion-orders/${insertionOrder.id}/edit`,
              variant: "light",
              leftSection: /* @__PURE__ */ jsxDEV4(IconPencil, { size: 16 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 474,
                columnNumber: 30
              }, this),
              children: "\u7DE8\u8F2F"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 470,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            fetcher.Form,
            {
              method: "post",
              style: { display: "inline" },
              onSubmit: (e) => {
                confirm("\u78BA\u5B9A\u8981\u522A\u9664\u6B64\u59D4\u520A\u55AE\u55CE\uFF1F") || e.preventDefault();
              },
              children: [
                /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "intent", value: "deleteOrder" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                  lineNumber: 485,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV4(
                  Button2,
                  {
                    type: "submit",
                    variant: "light",
                    color: "red",
                    leftSection: /* @__PURE__ */ jsxDEV4(IconTrash, { size: 16 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                      lineNumber: 490,
                      columnNumber: 32
                    }, this),
                    loading: isSubmitting,
                    children: "\u522A\u9664"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                    lineNumber: 486,
                    columnNumber: 17
                  },
                  this
                )
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 478,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 469,
          columnNumber: 11
        }, this),
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
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 497,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", children: "\u{1F4BE} \u532F\u51FA Excel" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 503,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 468,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 461,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", p: "xl", shadow: "sm", children: /* @__PURE__ */ jsxDEV4(Grid, { gutter: "xl", children: [
      /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 7 }, children: /* @__PURE__ */ jsxDEV4(Stack2, { gap: "sm", children: [
        insertionOrder.orderTitle && /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 500, c: "dimmed", children: insertionOrder.orderTitle }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 513,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV4(Title2, { order: 3, c: "blue", children: insertionOrder.projectName ?? insertionOrder.title ?? "\u672A\u547D\u540D\u5C08\u6848" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 515,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV4(Badge, { variant: "light", children: [
            "\u5BA2\u6236: ",
            insertionOrder.clientName
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 519,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(Badge, { variant: "light", color: "cyan", children: [
            "\u54C1\u724C: ",
            insertionOrder.brand ?? insertionOrder.clientName
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 520,
            columnNumber: 19
          }, this),
          insertionOrder.mcnName && /* @__PURE__ */ jsxDEV4(Badge, { variant: "light", color: "violet", children: [
            "\u7DB2\u7D05\u516C\u53F8: ",
            insertionOrder.mcnName
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 524,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 518,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", children: [
          "\u7522\u696D: ",
          insertionOrder.industryPath ?? insertionOrder.industry ?? "-"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 527,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", children: [
          "\u8CA0\u8CAC\u696D\u52D9: ",
          insertionOrder.salesOwner ?? "-",
          " | KOL \u7A97\u53E3:",
          " ",
          insertionOrder.kolManager ?? "-"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 530,
          columnNumber: 17
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
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 535,
            columnNumber: 19
          },
          this
        ),
        description && /* @__PURE__ */ jsxDEV4(Box, { mt: "xs", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", fw: 700, c: "dimmed", mb: 4, children: "\u5C08\u6848\u8AAA\u660E" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 549,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", style: { whiteSpace: "pre-wrap" }, children: description }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 550,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 548,
          columnNumber: 19
        }, this),
        internalNotes && /* @__PURE__ */ jsxDEV4(
          Box,
          {
            mt: "xs",
            p: "sm",
            style: {
              background: "var(--mantine-color-gray-0)",
              border: "1px solid var(--mantine-color-gray-3)",
              borderRadius: 6
            },
            children: [
              /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", fw: 700, c: "dimmed", mb: 4, children: "\u{1F512} \u5167\u90E8\u5099\u8A3B" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 563,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", c: "dimmed", style: { whiteSpace: "pre-wrap" }, children: internalNotes }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 564,
                columnNumber: 21
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 554,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 511,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 510,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 5 }, children: /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: 2, spacing: "md", children: [
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u5408\u4F5C KOL" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 572,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: [
            insertionOrder.kolCount ?? collaborations.length,
            " \u4F4D"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 575,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 571,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u5C08\u6848\u5831\u50F9(\u672A\u7A05)" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 580,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: currency(insertionOrder.totalBudget) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 583,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 579,
          columnNumber: 17
        }, this),
        insertionOrder.tax != null && /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u7A05\u91D1" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 587,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: currency(insertionOrder.tax) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 590,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 586,
          columnNumber: 19
        }, this),
        insertionOrder.totalWithTax != null && /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u542B\u7A05\u7E3D\u984D" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 595,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: currency(insertionOrder.totalWithTax) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 598,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 594,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u89F8\u53CA" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 602,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: n(totalReach) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 605,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 601,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u4E92\u52D5" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 608,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: n(totalEngagement) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 611,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 607,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u5E73\u5747\u4E92\u52D5\u7387" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 614,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: [
            avgEngagementRate.toFixed(1),
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 617,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 613,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", fw: 700, children: "\u5E73\u5747\u8A55\u50F9" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 620,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(Title2, { order: 4, children: [
            "\u2B50 ",
            avgRating.toFixed(1)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 623,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 619,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 570,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 569,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 509,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 508,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Title2, { order: 3, mb: "lg", children: "\u{1F4C8} \u6210\u6548\u6578\u64DA\u5C0D\u6BD4" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 632,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(ClientOnly, { fallback: /* @__PURE__ */ jsxDEV4(Box, { h: 250, style: { background: "#f8f9fa" } }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 635,
        columnNumber: 31
      }, this), children: () => /* @__PURE__ */ jsxDEV4(Grid, { children: [
        /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 6 }, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 600, mb: "sm", ta: "center", children: "\u89F8\u53CA\u4EBA\u6578\u5C0D\u6BD4 (Reach)" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 639,
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
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 642,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 638,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Grid.Col, { span: { base: 12, md: 6 }, children: [
          /* @__PURE__ */ jsxDEV4(Text2, { fw: 600, mb: "sm", ta: "center", children: "\u4E92\u52D5\u6B21\u6578\u5C0D\u6BD4 (Engagement)" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 653,
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
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 656,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 652,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 637,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 635,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 631,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, radius: "md", children: [
      /* @__PURE__ */ jsxDEV4(Title2, { order: 3, mb: "sm", children: "\u5408\u4F5C KOL \u5217\u8868" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 673,
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
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 678,
          columnNumber: 13
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 676,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
      lineNumber: 672,
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
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 697,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u5716\u7247\u9023\u7D50", placeholder: "\u53EF\u5148\u8CBC\u4E0A\u5716\u7247 URL" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 698,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(Group, { justify: "flex-end", children: [
            /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", onClick: closeUpload, children: "\u53D6\u6D88" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 700,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(Button2, { type: "button", color: "blue", onClick: closeUpload, children: "\u5132\u5B58" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 703,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 699,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 696,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 690,
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
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 718,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "kolId", value: selectedKol?.id }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 719,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: [
            /* @__PURE__ */ jsxDEV4(Card, { withBorder: !0, p: "sm", bg: "blue.0", style: { borderColor: "#339af0" }, children: /* @__PURE__ */ jsxDEV4(Stack2, { gap: 5, children: [
              /* @__PURE__ */ jsxDEV4(Group, { gap: 5, children: [
                /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 700, c: "blue", children: "\u{1F916} AI OCR \u667A\u80FD\u8B58\u5225" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                  lineNumber: 724,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV4(Badge, { variant: "dot", size: "xs", children: "Auto-fill" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                  lineNumber: 727,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 723,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV4(Text2, { size: "xs", c: "dimmed", children: "\u4E0A\u50B3\u5F8C\u53F0\u6210\u6548\u622A\u5716\uFF0CAI \u5C07\u81EA\u52D5\u70BA\u60A8\u63D0\u53D6\u6578\u64DA\u4E26\u586B\u5165\u4E0B\u65B9\u8868\u55AE\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 731,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV4(Button2, { type: "button", size: "xs", mt: 5, color: "blue", children: "\u{1F4F8} \u6383\u63CF\u622A\u5716\u4E26\u5E36\u5165\u6578\u64DA" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 734,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 722,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 721,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u5167\u5BB9\u6A19\u984C", name: "title", defaultValue: "IG \u8CBC\u6587", required: !0 }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 740,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(SimpleGrid, { cols: 2, children: [
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u66DD\u5149\u6578", name: "impressions", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 742,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u89F8\u53CA\u4EBA\u6578", name: "reach", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 743,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u4E92\u52D5\u6B21\u6578 (\u6309\u8B9A)", name: "likes", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 744,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(TextInput, { label: "\u7559\u8A00\u6578", name: "comments", type: "number", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 745,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 741,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(Textarea, { label: "\u5099\u8A3B", name: "notes", rows: 3 }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 747,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV4(Group, { justify: "flex-end", children: [
              /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", onClick: closePerf, children: "\u53D6\u6D88" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 749,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(Button2, { color: "blue", type: "submit", loading: isSubmitting, children: "\u5132\u5B58\u6578\u64DA" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 752,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 748,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 720,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 717,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 710,
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
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 767,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "kolId", value: selectedKol?.id }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 768,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV4(Stack2, { gap: "md", children: [
            /* @__PURE__ */ jsxDEV4(Stack2, { gap: 5, children: [
              /* @__PURE__ */ jsxDEV4(Text2, { size: "sm", fw: 500, children: "\u661F\u7D1A\u8A55\u5206" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 771,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(Rating, { defaultValue: 4.5, name: "rating", fractions: 2 }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 774,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 770,
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
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 776,
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
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 782,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV4(Group, { justify: "flex-end", children: [
              /* @__PURE__ */ jsxDEV4(Button2, { type: "button", variant: "default", onClick: closeReview, children: "\u53D6\u6D88" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 789,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV4(Button2, { color: "yellow", type: "submit", loading: isSubmitting, children: "\u63D0\u4EA4\u8A55\u50F9" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
                lineNumber: 792,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
              lineNumber: 788,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
            lineNumber: 769,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
          lineNumber: 766,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
        lineNumber: 760,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId._index.tsx",
    lineNumber: 452,
    columnNumber: 5
  }, this);
}

// app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx
var app_insertion_orders_insertionOrderId_edit_exports = {};
__export(app_insertion_orders_insertionOrderId_edit_exports, {
  action: () => action2,
  default: () => InsertionOrderEditPage,
  loader: () => loader2
});
import {
  Alert,
  Box as Box2,
  Button as Button3,
  Card as Card2,
  Divider as Divider2,
  Group as Group2,
  Select as Select2,
  SimpleGrid as SimpleGrid2,
  Stack as Stack3,
  TagsInput as TagsInput2,
  Text as Text3,
  TextInput as TextInput2,
  Textarea as Textarea2,
  Title as Title3
} from "@mantine/core";
import { json as json2, redirect as redirect2 } from "@remix-run/node";
import { Form, Link as Link2, useActionData, useLoaderData as useLoaderData2, useNavigation } from "@remix-run/react";
import { useState as useState3, useEffect as useEffect3 } from "react";
import { IconChevronDown as IconChevronDown2 } from "@tabler/icons-react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
async function loader2({ request, params }) {
  let insertionOrderId = params.insertionOrderId;
  if (!insertionOrderId)
    throw new Response("Not Found", { status: 404 });
  let [kols, orders, brandCatalog, industryCatalog, teamMembers, insertionOrder] = await Promise.all([
    listKols(),
    listInsertionOrders(),
    listBrandCatalog(),
    listIndustryCatalog(),
    listTeamMembers(),
    getInsertionOrder(insertionOrderId)
  ]);
  if (!insertionOrder)
    throw new Response("Order Not Found", { status: 404 });
  let salesOwners = teamMembers.filter((m) => m.group === "AE").map((m) => m.name), kolManagers = teamMembers.filter((m) => m.group === "KOL").map((m) => m.name), orderBrands = orders.map((o) => o.brand).filter(Boolean), catalogBrands = brandCatalog.map((b) => b.name), brands = Array.from(/* @__PURE__ */ new Set([...orderBrands, ...catalogBrands])), catalogIndustries = industryCatalog.map((i) => i.name), kolIndustries = kols.map((k) => k.industry).filter(Boolean), industries = Array.from(/* @__PURE__ */ new Set([...catalogIndustries, ...kolIndustries]));
  return json2({ kols, salesOwners, kolManagers, brands, industries, insertionOrder });
}
async function action2({ request, params }) {
  let insertionOrderId = params.insertionOrderId;
  if (!insertionOrderId)
    return json2({ error: "No ID provided" }, { status: 400 });
  let formData = await request.formData(), intent = String(formData.get("intent") ?? "create"), orderTitle = String(formData.get("orderTitle") ?? "").trim(), projectName = String(formData.get("projectName") ?? "").trim(), clientName = String(formData.get("clientName") ?? "").trim(), mcnName = String(formData.get("mcnName") ?? "").trim(), brandsRaw = String(formData.get("brands") ?? "").trim(), industriesRaw = String(formData.get("industries") ?? "").trim(), salesOwnersRaw = String(formData.get("salesOwners") ?? "").trim(), kolManagersRaw = String(formData.get("kolManagers") ?? "").trim(), description = String(formData.get("description") ?? "").trim(), internalNotes = String(formData.get("internalNotes") ?? "").trim(), selectedKolsJson = String(formData.get("selectedKolsJson") ?? "[]"), startDate = String(formData.get("startDate") ?? "").trim(), endDate = String(formData.get("endDate") ?? "").trim(), taxRate = Number(formData.get("taxRate") ?? 5), projectQuote = Number(formData.get("projectQuote") ?? 0);
  if (!orderTitle || !clientName)
    return json2({ error: "\u59D4\u520A\u55AE\u6A19\u984C\u8207\u5BA2\u6236\u70BA\u5FC5\u586B" }, { status: 400 });
  let industries = industriesRaw ? industriesRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], brandsArr = brandsRaw ? brandsRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], salesOwnersArr = salesOwnersRaw ? salesOwnersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], kolManagersArr = kolManagersRaw ? kolManagersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], [brandCatalog, industryCatalog] = await Promise.all([
    listBrandCatalog(),
    listIndustryCatalog()
  ]), brandSet = new Set(brandCatalog.map((b) => b.name)), industrySet = new Set(industryCatalog.map((i) => i.name));
  await Promise.all(
    brandsArr.filter((b) => !brandSet.has(b)).map((name) => addBrandCatalog({ name }))
  ), await Promise.all(
    industries.filter((i) => !industrySet.has(i)).map((name) => addIndustryCatalog({ name }))
  );
  let selectedKols = [];
  try {
    selectedKols = JSON.parse(selectedKolsJson);
  } catch {
    selectedKols = [];
  }
  let docFile = formData.get("documentUrl"), existingDocumentUrl = String(formData.get("existingDocumentUrl") || ""), documentUrl = docFile && docFile.name ? docFile.name : existingDocumentUrl, totalBudget = projectQuote, tax = Math.round(totalBudget * (taxRate / 100)), totalWithTax = totalBudget + tax, payload = {
    orderTitle,
    title: projectName || orderTitle,
    projectName: projectName || orderTitle,
    clientName,
    mcnName,
    brand: brandsArr[0] ?? "",
    industry: industries[0] ?? "\u672A\u5206\u985E",
    industryPath: industries.join(" > "),
    salesOwner: salesOwnersArr[0] ?? "",
    kolManager: kolManagersArr[0] ?? "",
    kolCount: selectedKols.length,
    documentUrl,
    totalBudget,
    tax,
    totalWithTax,
    totalReach: 0,
    totalEngagement: 0,
    avgRating: 0,
    avgEngagementRate: 0,
    collaborations: selectedKols.map((row) => ({
      id: row.id || `ioc_${Math.random().toString(36).slice(2, 9)}`,
      kolId: row.kolId,
      name: row.name,
      avatarUrl: row.avatarUrl,
      price: row.price,
      services: Array.isArray(row.services) ? row.services.join(" + ") : row.services || "",
      uploadDate: row.uploadDate,
      executionDate: row.executionDate,
      authorization: row.authorization,
      rating: row.rating || 0,
      totalReach: row.totalReach || 0,
      totalEngagement: row.totalEngagement || 0,
      performanceItems: row.performanceItems || [],
      reviews: row.reviews || []
    })),
    startDate: startDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    endDate: endDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    notes: [description, internalNotes && `internal:${internalNotes}`].filter(Boolean).join(`
`)
  };
  return await updateInsertionOrder(insertionOrderId, payload), redirect2(`/insertion-orders/${insertionOrderId}`);
}
function InsertionOrderEditPage() {
  let { kols, salesOwners, kolManagers, brands, industries, insertionOrder } = useLoaderData2(), actionData = useActionData(), submitting = useNavigation().state === "submitting", [selectedBrands, setSelectedBrands] = useState3(insertionOrder.brand ? [insertionOrder.brand] : []), [selectedIndustries, setSelectedIndustries] = useState3(insertionOrder.industry ? [insertionOrder.industry] : []), [selectedSales, setSelectedSales] = useState3(insertionOrder.salesOwner || null), [selectedKolManagers, setSelectedKolManagers] = useState3(insertionOrder.kolManager || null), initialNotes = insertionOrder.notes ? insertionOrder.notes.split(`
`) : [], initialDescription = initialNotes.filter((n2) => !n2.startsWith("internal:")).join(`
`), initialInternalNotes = initialNotes.filter((n2) => n2.startsWith("internal:")).map((n2) => n2.slice(9)).join(`
`), brandSuggestions = brands, industrySuggestions = industries, [orderTitleVal, setOrderTitleVal] = useState3(insertionOrder.orderTitle ?? insertionOrder.title ?? ""), [projectNameVal, setProjectNameVal] = useState3(insertionOrder.projectName ?? insertionOrder.title ?? ""), [clientNameVal, setClientNameVal] = useState3(insertionOrder.clientName ?? ""), [mcnNameVal, setMcnNameVal] = useState3(insertionOrder.mcnName ?? ""), [startDate, setStartDate] = useState3(insertionOrder.startDate || ""), [endDate, setEndDate] = useState3(insertionOrder.endDate || ""), [projectQuote, setProjectQuote] = useState3(insertionOrder.totalBudget || 0), [taxRate, setTaxRate] = useState3(insertionOrder.totalBudget ? Math.round(((insertionOrder.totalWithTax || 0) - insertionOrder.totalBudget) / insertionOrder.totalBudget * 100) : 5), totalWithTax = Math.round(projectQuote * (1 + taxRate / 100));
  useEffect3(() => {
    typeof window.kolRenderSelected == "function" && setTimeout(() => window.kolRenderSelected(), 100);
  }, []);
  let nativeDialogScript = `
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
          ? 'onclick="kolDialogRemove(\\''+k.id+'\\');return false;" style="padding:5px 14px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;"'
          : 'onclick="kolDialogAdd(\\''+k.id+'\\',\\''+encodeURIComponent(k.name)+'\\',\\''+encodeURIComponent(k.avatarUrl||'')+'\\','+k.price+');return false;" style="padding:5px 14px;border-radius:4px;border:none;background:var(--mantine-color-blue-filled);color:#fff;cursor:pointer;font-size:12px;"';
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
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG\u8CBC\u6587'], uploadDate:'', executionDate:'', authorization:'', price:Number(price)||0 });
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
        return '<div style="display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;flex-shrink:0;"/>'
          +'<div style="flex:1;">'
          +'<div style="display:flex;justify-content:space-between;align-items:center;">'
          +'<span style="font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);">NT$ '+(row.price||0).toLocaleString()+'</span>'
          +'</div>'
          +'<div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">'
          +'<label style="font-size:12px;color:var(--mantine-color-dimmed);">\u57F7\u884C\u65E5\u671F</label>'
          +'<input type="date" value="'+(row.executionDate||'')+'" onchange="kolUpdateExecDate(\\''+row.id+'\\',this.value)" style="font-size:12px;padding:2px 6px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);"/>'
          +'</div>'
          +'</div>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;flex-shrink:0;">\u79FB\u9664</button>'
          +'</div>';
      }).join('');
    }
    window.kolUpdateExecDate = function(rowId, val) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var idx = selected.findIndex(function(x){ return x.id === rowId; });
      if (idx !== -1) selected[idx].executionDate = val;
      if (ta) ta.value = JSON.stringify(selected);
    }
  `, initialCollabs = (insertionOrder.collaborations || []).map((c) => ({
    id: c.id,
    kolId: c.kolId,
    name: c.name,
    avatarUrl: c.avatarUrl,
    services: c.services ? c.services.split(" + ") : [],
    uploadDate: c.uploadDate || "",
    executionDate: c.executionDate || "",
    authorization: c.authorization || "",
    price: c.price || 0,
    rating: c.rating || 0,
    totalReach: c.totalReach || 0,
    totalEngagement: c.totalEngagement || 0,
    performanceItems: c.performanceItems || [],
    reviews: c.reviews || []
  }));
  return /* @__PURE__ */ jsxDEV5(Stack3, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV5("script", { dangerouslySetInnerHTML: { __html: nativeDialogScript } }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 365,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Group2, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV5(Title3, { order: 2, children: "\u7DE8\u8F2F\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 368,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5(Button3, { component: Link2, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 369,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 367,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Card2, { withBorder: !0, children: /* @__PURE__ */ jsxDEV5(
      Form,
      {
        method: "post",
        onKeyDown: (e) => {
          e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "submit" && e.preventDefault();
        },
        children: [
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "brands", value: selectedBrands.join(",") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 382,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "industries", value: selectedIndustries.join(",") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 383,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "salesOwners", value: selectedSales ?? "" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 384,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "kolManagers", value: selectedKolManagers ?? "" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 385,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5(Stack3, { gap: "lg", children: [
            /* @__PURE__ */ jsxDEV5(Box2, { children: [
              /* @__PURE__ */ jsxDEV5(Title3, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u57FA\u672C\u8CC7\u8A0A" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 390,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5(SimpleGrid2, { cols: { base: 1, md: 2 }, spacing: "md", children: [
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "orderTitle",
                    label: "\u59D4\u520A\u55AE\u6A19\u984C",
                    placeholder: "\u4F8B\u5982\uFF1ADAC_ALLIE_KOL\u884C\u92B7\u6D3B\u52D5 \u59D4\u520A\u55AE",
                    required: !0,
                    value: orderTitleVal,
                    onChange: (e) => {
                      setOrderTitleVal(e.currentTarget.value), projectNameVal === orderTitleVal && setProjectNameVal(e.currentTarget.value);
                    }
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 392,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "projectName",
                    label: "\u5C08\u6848\u540D\u7A31",
                    placeholder: "\u4F8B\u5982\uFF1A2026 Q1 \u5BB6\u96FB\u63A8\u5EE3",
                    value: projectNameVal,
                    onChange: (e) => setProjectNameVal(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 404,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "clientName",
                    label: "\u5BA2\u6236",
                    placeholder: "\u8ACB\u8F38\u5165\u5BA2\u6236\u540D\u7A31",
                    required: !0,
                    value: clientNameVal,
                    onChange: (e) => setClientNameVal(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 411,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "mcnName",
                    label: "\u7DB2\u7D05\u516C\u53F8\u540D\u7A31",
                    placeholder: "\u4F8B\u5982\uFF1A\u96F2\u592A\u8CC7\u8A0A\u6709\u9650\u516C\u53F8",
                    value: mcnNameVal,
                    onChange: (e) => setMcnNameVal(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 419,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TagsInput2,
                  {
                    label: "\u54C1\u724C",
                    placeholder: "\u9078\u64C7\u6216\u8F38\u5165\u54C1\u724C\uFF0CEnter \u65B0\u589E",
                    data: brandSuggestions,
                    value: selectedBrands,
                    onChange: setSelectedBrands,
                    clearable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV5(IconChevronDown2, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                      lineNumber: 433,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 426,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TagsInput2,
                  {
                    label: "\u7522\u696D",
                    placeholder: "\u9078\u64C7\u6216\u8F38\u5165\u7522\u696D\uFF0CEnter \u65B0\u589E",
                    data: industrySuggestions,
                    value: selectedIndustries,
                    onChange: setSelectedIndustries,
                    clearable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV5(IconChevronDown2, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                      lineNumber: 443,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 436,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  Select2,
                  {
                    label: "\u8CA0\u8CAC\u696D\u52D9",
                    placeholder: "\u9078\u64C7\u8CA0\u8CAC\u696D\u52D9",
                    data: salesOwners,
                    value: selectedSales,
                    onChange: setSelectedSales,
                    clearable: !0,
                    searchable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV5(IconChevronDown2, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                      lineNumber: 454,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 446,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  Select2,
                  {
                    label: "\u8CA0\u8CAC KOL Team \u6210\u54E1",
                    placeholder: "\u9078\u64C7 KOL Team \u6210\u54E1",
                    data: kolManagers,
                    value: selectedKolManagers,
                    onChange: setSelectedKolManagers,
                    clearable: !0,
                    searchable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV5(IconChevronDown2, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                      lineNumber: 465,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 457,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "startDate",
                    label: "\u958B\u59CB\u65E5",
                    type: "date",
                    value: startDate,
                    onChange: (e) => setStartDate(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 468,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "endDate",
                    label: "\u7D50\u675F\u65E5",
                    type: "date",
                    value: endDate,
                    onChange: (e) => setEndDate(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 475,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 391,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 389,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Divider2, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 485,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Box2, { children: [
              /* @__PURE__ */ jsxDEV5(Title3, { order: 4, mb: "sm", children: "\u8CA1\u52D9\u8CC7\u8A0A" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 489,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5(SimpleGrid2, { cols: { base: 1, md: 3 }, spacing: "md", children: [
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "projectQuote",
                    label: "\u5C08\u6848\u5831\u50F9 (\u672A\u7A05)",
                    type: "number",
                    placeholder: "0",
                    value: projectQuote || "",
                    onChange: (e) => setProjectQuote(Number(e.currentTarget.value) || 0)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 491,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    name: "taxRate",
                    label: "\u7A05\u7387 (%)",
                    type: "number",
                    value: taxRate,
                    onChange: (e) => setTaxRate(Number(e.currentTarget.value) || 0)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 499,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV5(
                  TextInput2,
                  {
                    label: "\u5C08\u6848\u7E3D\u91D1\u984D (\u542B\u7A05)",
                    readOnly: !0,
                    value: `NT$ ${totalWithTax.toLocaleString()}`,
                    styles: { input: { color: "var(--mantine-color-blue-6)", fontWeight: 600 } }
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 506,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 490,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 488,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Divider2, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 515,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Box2, { children: [
              /* @__PURE__ */ jsxDEV5(Title3, { order: 4, mb: "sm", children: "\u5408\u4F5C\u5167\u5BB9" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 519,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5(SimpleGrid2, { cols: { base: 1, md: 2 }, spacing: "md", children: [
                /* @__PURE__ */ jsxDEV5(TextInput2, { name: "services", label: "\u5408\u4F5C\u5167\u5BB9", placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                  lineNumber: 521,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV5(TextInput2, { name: "authorization", label: "\u6388\u6B0A\u9805\u76EE", placeholder: "\u4F8B\u5982\uFF1A\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                  lineNumber: 522,
                  columnNumber: 17
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 520,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 518,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Divider2, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 526,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Box2, { children: [
              /* @__PURE__ */ jsxDEV5(Group2, { justify: "space-between", mb: "sm", children: [
                /* @__PURE__ */ jsxDEV5(Title3, { order: 4, children: "\u5408\u4F5C KOL" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                  lineNumber: 531,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV5(
                  Button3,
                  {
                    type: "button",
                    variant: "default",
                    onClick: () => {
                      typeof window.kolDialogOpen == "function" && window.kolDialogOpen();
                    },
                    children: "\u9078\u64C7\u5408\u4F5C KOL"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                    lineNumber: 532,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 530,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5("div", { id: "kol-selected-display", style: { minHeight: 40 }, children: /* @__PURE__ */ jsxDEV5("p", { style: { fontSize: 14, color: "var(--mantine-color-dimmed)", margin: "8px 0" }, children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 545,
                columnNumber: 17
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 544,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5(
                "textarea",
                {
                  id: "kol-selected-json",
                  name: "selectedKolsJson",
                  style: { display: "none" },
                  defaultValue: JSON.stringify(initialCollabs),
                  readOnly: !0
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                  lineNumber: 550,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV5("script", { dangerouslySetInnerHTML: { __html: "setTimeout(function(){ if(typeof kolRenderSelected==='function') kolRenderSelected(); }, 100);" } }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 558,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 529,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Divider2, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 562,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Box2, { children: [
              /* @__PURE__ */ jsxDEV5(Title3, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u6A94\u6848 (\u5408\u7D04)" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 565,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", c: "dimmed", mb: "xs", children: "\u4E0A\u50B3\u7D93\u96D9\u65B9\u78BA\u8A8D\u7684\u59D4\u520A\u55AE PDF/Word \u6A94\u6848 (\u9078\u586B)" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 566,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5("input", { type: "file", name: "documentUrl", accept: ".pdf,.doc,.docx" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 567,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "existingDocumentUrl", value: insertionOrder?.documentUrl || "" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 568,
                columnNumber: 15
              }, this),
              insertionOrder?.documentUrl && /* @__PURE__ */ jsxDEV5(Text3, { size: "sm", mt: "xs", c: "green", children: [
                "\u2714\uFE0F \u5DF2\u4E0A\u50B3\u6A94\u6848: ",
                insertionOrder.documentUrl
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 570,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 564,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Divider2, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 574,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(Box2, { children: [
              /* @__PURE__ */ jsxDEV5(Title3, { order: 4, mb: "sm", children: "\u5176\u4ED6\u8CC7\u8A0A" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 577,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5(Stack3, { children: [
                /* @__PURE__ */ jsxDEV5(Textarea2, { name: "description", label: "\u5C08\u6848\u8AAA\u660E", minRows: 4, defaultValue: initialDescription }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                  lineNumber: 579,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV5(Textarea2, { name: "internalNotes", label: "\u5167\u90E8\u5099\u8A3B", minRows: 3, defaultValue: initialInternalNotes }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                  lineNumber: 580,
                  columnNumber: 17
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 578,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 576,
              columnNumber: 13
            }, this),
            actionData?.error && /* @__PURE__ */ jsxDEV5(Alert, { color: "red", children: actionData.error }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 584,
              columnNumber: 35
            }, this),
            /* @__PURE__ */ jsxDEV5(Group2, { justify: "space-between", children: [
              /* @__PURE__ */ jsxDEV5(Button3, { component: Link2, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 587,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5(Group2, { children: /* @__PURE__ */ jsxDEV5(Button3, { type: "submit", name: "intent", value: "update", loading: submitting, children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 589,
                columnNumber: 17
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 588,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 586,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 387,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 373,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
      lineNumber: 372,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(
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
          /* @__PURE__ */ jsxDEV5("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxDEV5("strong", { style: { fontSize: 18 }, children: "\u9078\u64C7\u5408\u4F5C KOL" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 611,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5(
              "button",
              {
                type: "button",
                onClick: () => {
                  typeof window.kolDialogClose == "function" && window.kolDialogClose();
                },
                style: { background: "none", border: "none", cursor: "pointer", fontSize: 20 },
                children: "\u2715"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
                lineNumber: 612,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 610,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV5(
            "input",
            {
              id: "kol-dialog-search",
              type: "text",
              placeholder: "\u641C\u5C0B KOL \u540D\u7A31\u3001\u5E33\u865F\u6216\u7522\u696D",
              onChange: (e) => {
                typeof window.kolDialogSearch == "function" && window.kolDialogSearch(e.target.value);
              },
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
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 621,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV5(
            "div",
            {
              id: "kol-dialog-list",
              style: { maxHeight: 400, overflowY: "auto", marginTop: 12, paddingRight: 4 }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 640,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV5("div", { style: { marginTop: 16, textAlign: "right" }, children: /* @__PURE__ */ jsxDEV5(
            "button",
            {
              type: "button",
              onClick: () => {
                typeof window.kolDialogClose == "function" && window.kolDialogClose();
              },
              style: { padding: "8px 20px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 },
              children: "\u5B8C\u6210\u9078\u64C7"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
              lineNumber: 645,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
            lineNumber: 644,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
        lineNumber: 597,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders.$insertionOrderId.edit.tsx",
    lineNumber: 364,
    columnNumber: 5
  }, this);
}

// app/routes/_app.insertion-orders._index.tsx
var app_insertion_orders_index_exports = {};
__export(app_insertion_orders_index_exports, {
  default: () => InsertionOrderListPage,
  loader: () => loader3
});
import {
  Badge as Badge2,
  Button as Button4,
  Card as Card3,
  Group as Group3,
  SimpleGrid as SimpleGrid3,
  Stack as Stack4,
  Text as Text4,
  Title as Title4
} from "@mantine/core";
import { json as json3 } from "@remix-run/node";
import { Link as Link3, useLoaderData as useLoaderData3 } from "@remix-run/react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
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
async function loader3({ request }) {
  let url = new URL(request.url), search = url.searchParams.get("search") ?? "", clientFilter = url.searchParams.get("client") ?? "", industryFilter = url.searchParams.get("industry") ?? "", statusFilter = url.searchParams.get("status") ?? "", timeFilter = url.searchParams.get("time") ?? "all", page = Math.max(1, Number(url.searchParams.get("page") ?? "1")), pageSize = Number(url.searchParams.get("pageSize") ?? "5"), allOrders = await listInsertionOrders(), allClients = Array.from(new Set(allOrders.map((o) => o.clientName))), allIndustries = Array.from(
    new Set(allOrders.map((o) => o.industry).filter(Boolean))
  ), q = search.trim().toLowerCase(), filtered = allOrders.filter((order) => !(!(!q || order.orderNo.toLowerCase().includes(q) || (order.title ?? "").toLowerCase().includes(q) || order.clientName.toLowerCase().includes(q)) || clientFilter && order.clientName !== clientFilter || industryFilter && order.industry !== industryFilter || statusFilter && order.status !== statusFilter || !matchesTime(order, timeFilter))), stats = {
    total: filtered.length,
    budget: filtered.reduce((sum, o) => sum + (o.totalBudget ?? 0), 0),
    reach: filtered.reduce((sum, o) => sum + (o.totalReach ?? 0), 0),
    engagement: filtered.reduce((sum, o) => sum + (o.totalEngagement ?? 0), 0)
  }, totalPages = Math.max(1, Math.ceil(filtered.length / pageSize)), currentPage = Math.min(page, totalPages), rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return json3({
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
  } = useLoaderData3();
  return /* @__PURE__ */ jsxDEV6(Stack4, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV6(Group3, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV6(Title4, { order: 2, children: "\u59D4\u520A\u55AE\u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6(Group3, { children: /* @__PURE__ */ jsxDEV6(Button4, { component: Link3, to: "/insertion-orders/new", children: "\u65B0\u589E\u59D4\u520A\u55AE" }, void 0, !1, {
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
    /* @__PURE__ */ jsxDEV6("form", { method: "get", style: { display: "contents" }, children: /* @__PURE__ */ jsxDEV6(Stack4, { gap: "sm", children: /* @__PURE__ */ jsxDEV6(Group3, { align: "end", wrap: "wrap", children: [
      /* @__PURE__ */ jsxDEV6("div", { style: { flex: 1, minWidth: 200 }, children: [
        /* @__PURE__ */ jsxDEV6("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u641C\u5C0B" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 132,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6(
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
      /* @__PURE__ */ jsxDEV6("div", { children: [
        /* @__PURE__ */ jsxDEV6("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u5BA2\u6236" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 154,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6(
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
              /* @__PURE__ */ jsxDEV6("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 168,
                columnNumber: 17
              }, this),
              allClients.map((c) => /* @__PURE__ */ jsxDEV6("option", { value: c, children: c }, c, !1, {
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
      /* @__PURE__ */ jsxDEV6("div", { children: [
        /* @__PURE__ */ jsxDEV6("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u7522\u696D" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 177,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6(
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
              /* @__PURE__ */ jsxDEV6("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 191,
                columnNumber: 17
              }, this),
              allIndustries.map((i) => /* @__PURE__ */ jsxDEV6("option", { value: i, children: i }, i, !1, {
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
      /* @__PURE__ */ jsxDEV6("div", { children: [
        /* @__PURE__ */ jsxDEV6("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u72C0\u614B" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 200,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6(
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
              /* @__PURE__ */ jsxDEV6("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 214,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "planned", children: "\u898F\u5283\u4E2D" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 215,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "in_progress", children: "\u57F7\u884C\u4E2D" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 216,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "completed", children: "\u5DF2\u7D50\u6848" }, void 0, !1, {
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
      /* @__PURE__ */ jsxDEV6("div", { children: [
        /* @__PURE__ */ jsxDEV6("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u6642\u9593" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 223,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6(
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
              /* @__PURE__ */ jsxDEV6("option", { value: "all", children: "\u5168\u90E8" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 237,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "last30", children: "\u8FD1 30 \u5929" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 238,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "last90", children: "\u8FD1 90 \u5929" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders._index.tsx",
                lineNumber: 239,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "thisYear", children: "2026 \u5E74" }, void 0, !1, {
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
      /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "pageSize", value: pageSize }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 245,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6(
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
      (search || clientFilter || industryFilter || statusFilter || timeFilter !== "all") && /* @__PURE__ */ jsxDEV6(
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
    /* @__PURE__ */ jsxDEV6(SimpleGrid3, { cols: { base: 2, md: 4 }, spacing: "sm", children: [
      /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", size: "sm", children: "\u59D4\u520A\u55AE\u6578" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 286,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Title4, { order: 3, children: stats.total }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 287,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 285,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", size: "sm", children: "\u7E3D\u9810\u7B97" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 290,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Title4, { order: 3, children: [
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
      /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", size: "sm", children: "\u7E3D\u89F8\u53CA" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 294,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Title4, { order: 3, children: numberShort(stats.reach) }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 295,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 293,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", size: "sm", children: "\u7E3D\u4E92\u52D5" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 298,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV6(Title4, { order: 3, children: numberShort(stats.engagement) }, void 0, !1, {
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
    rows.length === 0 ? /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, p: "xl", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxDEV6(Text4, { size: "48px", children: "\u{1F4C4}" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 306,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6(Title4, { order: 3, children: "\u5C1A\u7121\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 307,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6(Text4, { c: "dimmed", mb: "md", children: "\u8ABF\u6574\u7BE9\u9078\u689D\u4EF6\uFF0C\u6216\u5EFA\u7ACB\u60A8\u7684\u7B2C\u4E00\u500B\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 308,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6(Button4, { component: Link3, to: "/insertion-orders/new", children: "\u958B\u59CB\u5EFA\u7ACB" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders._index.tsx",
        lineNumber: 309,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders._index.tsx",
      lineNumber: 305,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV6(Stack4, { gap: "md", children: rows.map((order) => {
      let status = statusMeta(order.status);
      return /* @__PURE__ */ jsxDEV6(Card3, { withBorder: !0, className: "io-card", children: /* @__PURE__ */ jsxDEV6(Stack4, { gap: "md", children: [
        /* @__PURE__ */ jsxDEV6(Group3, { justify: "space-between", children: [
          /* @__PURE__ */ jsxDEV6(Text4, { fw: 600, children: [
            "\u{1F4CB} #",
            order.orderNo,
            " ",
            order.title ?? "\u672A\u547D\u540D\u5C08\u6848"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 319,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Badge2, { color: status.color, variant: "light", children: status.label }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 320,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 318,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV6(SimpleGrid3, { cols: { base: 1, md: 2 }, children: [
          /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", children: [
            "\u5BA2\u6236: ",
            order.clientName,
            " | \u7522\u696D: ",
            order.industry ?? "-"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 324,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", children: [
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
        /* @__PURE__ */ jsxDEV6(SimpleGrid3, { cols: { base: 2, md: 5 }, children: [
          /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", children: [
            "\u5408\u4F5C KOL: ",
            order.kolCount ?? 0,
            " \u4F4D"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 329,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", children: [
            "\u7E3D\u9810\u7B97: NT$ ",
            (order.totalBudget ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 330,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", children: [
            "\u5E73\u5747\u8A55\u50F9: \u2B50 ",
            (order.avgRating ?? 0).toFixed(1)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 331,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", children: [
            "\u7E3D\u89F8\u53CA: ",
            numberShort(order.totalReach)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 332,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", children: [
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
        /* @__PURE__ */ jsxDEV6(Group3, { justify: "space-between", children: /* @__PURE__ */ jsxDEV6(Group3, { children: [
          /* @__PURE__ */ jsxDEV6(Button4, { component: Link3, to: `/insertion-orders/${order.id}`, children: "\u67E5\u770B\u8A73\u60C5" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 338,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV6(Button4, { variant: "default", component: Link3, to: `/reports/generate?orderId=${order.id}`, children: "\u{1F4CA} \u7522\u751F\u5831\u544A" }, void 0, !1, {
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
    totalPages > 1 && /* @__PURE__ */ jsxDEV6(Group3, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsxDEV6(Group3, { children: [
        /* @__PURE__ */ jsxDEV6(Text4, { size: "sm", c: "dimmed", children: "\u6BCF\u9801\u7B46\u6578" }, void 0, !1, {
          fileName: "app/routes/_app.insertion-orders._index.tsx",
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("form", { method: "get", style: { display: "inline" }, children: [
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "search", value: search }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 355,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "client", value: clientFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 356,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "industry", value: industryFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 357,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "status", value: statusFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "time", value: timeFilter }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 359,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("input", { type: "hidden", name: "page", value: "1" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders._index.tsx",
            lineNumber: 360,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6(
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
                /* @__PURE__ */ jsxDEV6("option", { value: "5", children: "5" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 374,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV6("option", { value: "10", children: "10" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders._index.tsx",
                  lineNumber: 375,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV6("option", { value: "20", children: "20" }, void 0, !1, {
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
      /* @__PURE__ */ jsxDEV6(Group3, { gap: 4, children: [
        currentPage > 1 && /* @__PURE__ */ jsxDEV6(
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
        Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxDEV6(
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
        currentPage < totalPages && /* @__PURE__ */ jsxDEV6(
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
  action: () => action3,
  default: () => ProposalDetailPage,
  loader: () => loader4
});
import {
  ActionIcon,
  Badge as Badge3,
  Button as Button5,
  Card as Card4,
  Group as Group4,
  Modal as Modal2,
  NumberInput as NumberInput2,
  Select as Select3,
  SimpleGrid as SimpleGrid4,
  Stack as Stack5,
  Table,
  Text as Text5,
  TextInput as TextInput3,
  Textarea as Textarea3,
  Title as Title5,
  Checkbox
} from "@mantine/core";
import { useDisclosure as useDisclosure2 } from "@mantine/hooks";
import { json as json4 } from "@remix-run/node";
import { Form as Form2, Link as Link4, useLoaderData as useLoaderData4, useNavigation as useNavigation2, useSubmit as useSubmit2 } from "@remix-run/react";
import { useMemo as useMemo2, useState as useState4 } from "react";
import { IconTrash as IconTrash2, IconArrowLeft } from "@tabler/icons-react";
import { Fragment as Fragment2, jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
async function loader4({ params }) {
  let proposalId = params.proposalId ?? "", [proposal, candidates, allKols] = await Promise.all([
    getProposal(proposalId),
    listProposalKols(proposalId),
    listKols()
  ]);
  if (!proposal)
    throw new Response("Not Found", { status: 404 });
  return json4({ proposal, candidates, allKols });
}
async function action3({ request, params }) {
  let proposalId = params.proposalId ?? "", formData = await request.formData(), intent = formData.get("intent");
  if (intent === "add_candidate") {
    let kolId = String(formData.get("kolId")), priceStr = String(formData.get("price") || "0").replace(/,/g, ""), price = Number(priceStr), role = String(formData.get("role")), reason = String(formData.get("reason")), kolName = String(formData.get("kolName"));
    return await addProposalKol({
      proposalId,
      kolId,
      kolName,
      price,
      role,
      reason
    }), json4({ success: !0 });
  }
  if (intent === "update_status") {
    let candidateId = String(formData.get("candidateId")), status = String(formData.get("status")), feedback = String(formData.get("feedback"));
    return await updateProposalKolStatus(candidateId, status, feedback), json4({ success: !0 });
  }
  if (intent === "delete_candidate") {
    let candidateId = String(formData.get("candidateId"));
    return await deleteProposalKol(candidateId), json4({ success: !0 });
  }
  if (intent === "batch_delete_candidates") {
    let ids = String(formData.get("candidateIds") || "").split(",").filter(Boolean);
    return await Promise.all(ids.map((id) => deleteProposalKol(id))), json4({ success: !0 });
  }
  if (intent === "update_proposal") {
    let stage = formData.get("stage") ? String(formData.get("stage")) : void 0, title = formData.get("title") ? String(formData.get("title")) : void 0, clientName = formData.get("clientName") ? String(formData.get("clientName")) : void 0, budgetStr = formData.get("budget") ? String(formData.get("budget")).replace(/,/g, "").replace(/\$/g, "") : void 0, budget = budgetStr !== void 0 ? Number(budgetStr) : void 0, dueDate = formData.get("dueDate") ? String(formData.get("dueDate")) : void 0;
    return await updateProposal(proposalId, { stage, title, clientName, budget, dueDate }), json4({ success: !0 });
  }
  return json4({ success: !1 });
}
function ProposalDetailPage() {
  let { proposal, candidates, allKols } = useLoaderData4(), navigation = useNavigation2(), submit = useSubmit2(), [isEditing, setIsEditing] = useState4(!1), [editedTitle, setEditedTitle] = useState4(proposal.title), [editedClient, setEditedClient] = useState4(proposal.clientName), [editedBudget, setEditedBudget] = useState4(proposal.budget), [editedDueDate, setEditedDueDate] = useState4(proposal.dueDate), [editedStage, setEditedStage] = useState4(proposal.stage), [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure2(!1), [aiSearchOpened, { open: openAiSearch, close: closeAiSearch }] = useDisclosure2(!1), [aiSearching, setAiSearching] = useState4(!1), [aiResults, setAiResults] = useState4([]), [aiQuery, setAiQuery] = useState4(""), [feedbackCandidate, setFeedbackCandidate] = useState4(null), [manualKolId, setManualKolId] = useState4(null), [selectedCandidateIds, setSelectedCandidateIds] = useState4([]), statusColor = {
    pending: "gray",
    accepted: "green",
    rejected: "red"
  }, statusLabel = {
    pending: "\u5F85\u5B9A",
    accepted: "\u5DF2\u63A5\u53D7",
    rejected: "\u5DF2\u62D2\u7D55"
  }, allKolOptions = useMemo2(
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
  return /* @__PURE__ */ jsxDEV7(Stack5, { gap: "lg", children: [
    /* @__PURE__ */ jsxDEV7(Group4, { justify: "space-between", align: "flex-start", children: [
      /* @__PURE__ */ jsxDEV7(Group4, { align: "center", gap: "md", style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxDEV7(
          ActionIcon,
          {
            variant: "subtle",
            color: "gray",
            component: Link4,
            to: "/proposals",
            size: "lg",
            children: /* @__PURE__ */ jsxDEV7(IconArrowLeft, { size: 24 }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 188,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 181,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(Stack5, { gap: "xs", style: { flex: 1 }, children: isEditing ? /* @__PURE__ */ jsxDEV7(Stack5, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV7(
            TextInput3,
            {
              label: "\u63D0\u6848\u6A19\u984C",
              value: editedTitle,
              onChange: (e) => setEditedTitle(e.currentTarget.value),
              size: "md",
              fw: 700
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 193,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(
            TextInput3,
            {
              label: "\u5BA2\u6236\u540D\u7A31",
              value: editedClient,
              onChange: (e) => setEditedClient(e.currentTarget.value),
              size: "sm"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 200,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 192,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDEV7(Stack5, { gap: 0, children: [
          /* @__PURE__ */ jsxDEV7(Title5, { order: 2, children: [
            "\u63D0\u6848\u8A73\u7D30\uFF1A",
            proposal.title
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 209,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7(Text5, { c: "dimmed", size: "sm", children: [
            "ID: ",
            proposal.id,
            " | \u5BA2\u6236\uFF1A",
            proposal.clientName
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 210,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 208,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 190,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 180,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7(Group4, { align: "center", children: !isEditing && /* @__PURE__ */ jsxDEV7(Fragment2, { children: [
        /* @__PURE__ */ jsxDEV7(Button5, { variant: "light", color: "orange", onClick: () => setIsEditing(!0), children: "\u7DE8\u8F2F\u63D0\u6848\u5167\u5BB9" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 220,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7(
          Button5,
          {
            variant: "default",
            onClick: () => alert("\u63D0\u6848\u8CC7\u6599\u5DF2\u532F\u51FA\u70BA Excel (\u6A21\u64EC)"),
            children: "\u532F\u51FA\u63D0\u6848"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 223,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          Button5,
          {
            component: Link4,
            to: `/insertion-orders/new?fromProposalId=${proposal.id}`,
            color: "blue",
            disabled: !candidates.some((c) => c.status === "accepted"),
            children: "\u8F49\u70BA\u59D4\u520A\u55AE"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 229,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 219,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 217,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(SimpleGrid4, { cols: { base: 1, md: 3 }, spacing: "md", children: [
      /* @__PURE__ */ jsxDEV7(Card4, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV7(Text5, { size: "xs", c: "dimmed", fw: 700, children: "\u7576\u524D\u968E\u6BB5" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 244,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV7(
          Select3,
          {
            mt: 5,
            size: "sm",
            value: isEditing ? editedStage : proposal.stage,
            disabled: !isEditing,
            onChange: (val) => {
              if (val)
                if (isEditing)
                  setEditedStage(val);
                else {
                  let formData = new FormData();
                  formData.append("intent", "update_proposal"), formData.append("stage", val), submit(formData, { method: "post" });
                }
            },
            data: [
              { value: "draft", label: "\u8349\u7A3F (DRAFT)" },
              { value: "internal_review", label: "\u5167\u90E8\u5BE9\u6838 (INTERNAL REVIEW)" },
              { value: "sent_to_client", label: "\u5DF2\u9001\u51FA\u7D66\u5BA2\u6236 (SENT TO CLIENT)" }
            ]
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 245,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 243,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7(Card4, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV7(Text5, { size: "xs", c: "dimmed", fw: 700, children: "\u7E3D\u9810\u7B97" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 271,
          columnNumber: 11
        }, this),
        isEditing ? /* @__PURE__ */ jsxDEV7(
          NumberInput2,
          {
            mt: 5,
            value: editedBudget,
            onChange: (val) => setEditedBudget(Number(val)),
            thousandSeparator: ",",
            prefix: "$"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 273,
            columnNumber: 13
          },
          this
        ) : /* @__PURE__ */ jsxDEV7(Text5, { size: "xl", fw: 700, mt: 5, children: [
          "$",
          proposal.budget.toLocaleString("zh-TW")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 270,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7(Card4, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV7(Text5, { size: "xs", c: "dimmed", fw: 700, children: "\u622A\u6B62\u65E5\u671F" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 285,
          columnNumber: 11
        }, this),
        isEditing ? /* @__PURE__ */ jsxDEV7(
          TextInput3,
          {
            mt: 5,
            value: editedDueDate,
            onChange: (e) => setEditedDueDate(e.currentTarget.value),
            placeholder: "YYYY-MM-DD"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 287,
            columnNumber: 13
          },
          this
        ) : /* @__PURE__ */ jsxDEV7(Text5, { size: "xl", fw: 700, mt: 5, children: proposal.dueDate }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 294,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 284,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 242,
      columnNumber: 7
    }, this),
    isEditing && /* @__PURE__ */ jsxDEV7(Card4, { withBorder: !0, padding: "lg", radius: "md", style: { background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)", border: "1px solid #cce3ff" }, children: /* @__PURE__ */ jsxDEV7(Stack5, { gap: "xs", children: [
      /* @__PURE__ */ jsxDEV7(Group4, { gap: 8, children: [
        /* @__PURE__ */ jsxDEV7(Text5, { size: "lg", fw: 700, style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsxDEV7("span", { style: { fontSize: 20 }, children: "\u{1F916}" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 305,
            columnNumber: 15
          }, this),
          " AI KOL \u667A\u80FD\u641C\u5C0B"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 304,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7(Badge3, { variant: "dot", color: "blue", children: "Beta" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 307,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 303,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7(Text5, { size: "sm", c: "dimmed", children: "\u8F38\u5165\u60A8\u7684\u9700\u6C42\uFF08\u4F8B\u5982\uFF1A\u627E\u6BCD\u5B30\u985E\u3001\u4E92\u52D5\u7387 5% \u4EE5\u4E0A\u3001\u6C92\u5408\u4F5C\u904E\u7AF6\u54C1\uFF09\uFF0CAI \u5C07\u70BA\u60A8\u63A8\u85A6\u6700\u5408\u9069\u7684\u4EBA\u9078\u3002" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 309,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7(Group4, { mt: "xs", wrap: "nowrap", children: [
        /* @__PURE__ */ jsxDEV7(
          TextInput3,
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
            lineNumber: 311,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          Button5,
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
            lineNumber: 323,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 310,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 302,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 301,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7(Card4, { withBorder: !0, children: /* @__PURE__ */ jsxDEV7(Stack5, { gap: "md", children: [
      /* @__PURE__ */ jsxDEV7(Group4, { justify: "space-between", children: [
        /* @__PURE__ */ jsxDEV7(Group4, { gap: "md", children: [
          /* @__PURE__ */ jsxDEV7(Title5, { order: 4, children: [
            "KOL \u5019\u9078\u540D\u55AE (",
            candidates.length,
            ")"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 341,
            columnNumber: 15
          }, this),
          isEditing && selectedCandidateIds.length > 0 && /* @__PURE__ */ jsxDEV7(Form2, { method: "post", style: { display: "inline" }, onSubmit: (e) => {
            confirm(`\u78BA\u5B9A\u8981\u5C07\u9078\u4E2D\u7684 ${selectedCandidateIds.length} \u4F4D KOL \u5F9E\u5019\u9078\u540D\u55AE\u4E2D\u79FB\u9664\u55CE\uFF1F`) ? setSelectedCandidateIds([]) : e.preventDefault();
          }, children: [
            /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "intent", value: "batch_delete_candidates" }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 350,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "candidateIds", value: selectedCandidateIds.join(",") }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 351,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Button5, { variant: "light", color: "red", size: "xs", leftSection: /* @__PURE__ */ jsxDEV7(IconTrash2, { size: 14 }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 352,
              columnNumber: 78
            }, this), type: "submit", children: [
              "\u6279\u91CF\u522A\u9664 (",
              selectedCandidateIds.length,
              ")"
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 352,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 343,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 340,
          columnNumber: 13
        }, this),
        isEditing && /* @__PURE__ */ jsxDEV7(Button5, { type: "button", size: "xs", onClick: openAdd, children: "+ \u624B\u52D5\u65B0\u589E" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 359,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 339,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7(Table, { striped: !0, withTableBorder: !0, children: [
        /* @__PURE__ */ jsxDEV7(Table.Thead, { children: /* @__PURE__ */ jsxDEV7(Table.Tr, { children: [
          isEditing && /* @__PURE__ */ jsxDEV7(Table.Th, { style: { width: 40 }, children: /* @__PURE__ */ jsxDEV7(
            Checkbox,
            {
              checked: selectedCandidateIds.length === candidates.length && candidates.length > 0,
              indeterminate: selectedCandidateIds.length > 0 && selectedCandidateIds.length < candidates.length,
              onChange: (e) => {
                e.currentTarget.checked ? setSelectedCandidateIds(candidates.map((c) => c.id)) : setSelectedCandidateIds([]);
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 368,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 367,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Th, { children: "KOL \u540D\u7A31" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 381,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Th, { children: "\u89D2\u8272/\u7248\u4F4D" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 382,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Th, { children: "\u9810\u4F30\u5831\u50F9" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 383,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Th, { children: "\u63A8\u85A6\u7406\u7531" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 384,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Th, { children: "\u72C0\u614B" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 385,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Th, { children: "\u5BA2\u6236\u53CD\u994B" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 386,
            columnNumber: 17
          }, this),
          isEditing && /* @__PURE__ */ jsxDEV7(Table.Th, { children: "\u64CD\u4F5C" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 387,
            columnNumber: 31
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 365,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 364,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7(Table.Tbody, { children: candidates.length === 0 ? /* @__PURE__ */ jsxDEV7(Table.Tr, { children: /* @__PURE__ */ jsxDEV7(Table.Td, { colSpan: isEditing ? 8 : 6, align: "center", children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55\u5019\u9078\u4EBA" }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 393,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 392,
          columnNumber: 17
        }, this) : candidates.map((c) => /* @__PURE__ */ jsxDEV7(Table.Tr, { children: [
          isEditing && /* @__PURE__ */ jsxDEV7(Table.Td, { children: /* @__PURE__ */ jsxDEV7(
            Checkbox,
            {
              checked: selectedCandidateIds.includes(c.id),
              onChange: (e) => {
                e.currentTarget.checked ? setSelectedCandidateIds([...selectedCandidateIds, c.id]) : setSelectedCandidateIds(selectedCandidateIds.filter((id) => id !== c.id));
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 400,
              columnNumber: 25
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 399,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Td, { fw: 500, children: c.kolName }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 412,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Td, { children: c.role }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 413,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Td, { children: [
            "$",
            (c.price ?? 0).toLocaleString("zh-TW")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 414,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Td, { children: /* @__PURE__ */ jsxDEV7(Text5, { size: "sm", lineClamp: 2, children: c.reason }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 416,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 415,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Td, { children: /* @__PURE__ */ jsxDEV7(Badge3, { color: statusColor[c.status], children: statusLabel[c.status] }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 419,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 418,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV7(Table.Td, { children: /* @__PURE__ */ jsxDEV7(Text5, { size: "xs", c: "dimmed", children: c.feedbackText || "-" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 422,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 421,
            columnNumber: 21
          }, this),
          isEditing && /* @__PURE__ */ jsxDEV7(Table.Td, { children: /* @__PURE__ */ jsxDEV7(Group4, { gap: 5, children: [
            /* @__PURE__ */ jsxDEV7(Form2, { method: "post", style: { display: "inline" }, children: [
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 428,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "candidateId", value: c.id }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 429,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "status", value: "accepted" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 430,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV7(
                Button5,
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
                  lineNumber: 431,
                  columnNumber: 29
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 427,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ jsxDEV7(
              Button5,
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
                lineNumber: 441,
                columnNumber: 27
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(Form2, { method: "post", style: { display: "inline" }, onSubmit: (e) => {
              confirm("\u78BA\u5B9A\u8981\u5C07\u6B64 KOL \u5F9E\u5019\u9078\u540D\u55AE\u4E2D\u79FB\u9664\u55CE\uFF1F") || e.preventDefault();
            }, children: [
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "intent", value: "delete_candidate" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 455,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "candidateId", value: c.id }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 456,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV7(
                ActionIcon,
                {
                  variant: "light",
                  color: "gray",
                  size: "sm",
                  type: "submit",
                  children: /* @__PURE__ */ jsxDEV7(IconTrash2, { size: 14 }, void 0, !1, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 463,
                    columnNumber: 31
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.proposals.$proposalId.tsx",
                  lineNumber: 457,
                  columnNumber: 29
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 450,
              columnNumber: 27
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 426,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 425,
            columnNumber: 23
          }, this)
        ] }, c.id, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 397,
          columnNumber: 19
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 390,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 363,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 338,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 337,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(
      Modal2,
      {
        id: "proposal-ai-search-modal",
        opened: aiSearchOpened,
        onClose: () => {
          setAiSearching(!1), closeAiSearch();
        },
        title: "\u{1F916} AI \u641C\u5C0B\u7D50\u679C",
        size: "lg",
        children: /* @__PURE__ */ jsxDEV7(Stack5, { gap: "md", children: [
          aiSearching && /* @__PURE__ */ jsxDEV7(Text5, { c: "dimmed", children: "\u6B63\u5728\u5206\u6790\u8CC7\u6599\u5EAB\u4E26\u5339\u914D\u6700\u4F73\u4EBA\u9078..." }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 489,
            columnNumber: 27
          }, this),
          !aiSearching && aiResults.length === 0 && /* @__PURE__ */ jsxDEV7(Text5, { c: "dimmed", children: [
            "\u627E\u4E0D\u5230\u7B26\u5408\u300C",
            aiQuery,
            "\u300D\u7684\u5019\u9078\u4EBA\uFF08Mock\uFF09\u3002"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 491,
            columnNumber: 13
          }, this),
          !aiSearching && aiResults.map((res) => /* @__PURE__ */ jsxDEV7(Card4, { withBorder: !0, shadow: "xs", children: [
            /* @__PURE__ */ jsxDEV7(Group4, { justify: "space-between", align: "flex-start", children: [
              /* @__PURE__ */ jsxDEV7(Group4, { gap: "sm", children: [
                /* @__PURE__ */ jsxDEV7(
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
                    children: /* @__PURE__ */ jsxDEV7(
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
                        lineNumber: 508,
                        columnNumber: 23
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 498,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV7("div", { children: [
                  /* @__PURE__ */ jsxDEV7(Text5, { fw: 700, children: res.displayName }, void 0, !1, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 515,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV7(Text5, { size: "xs", c: "dimmed", children: [
                    res.industry,
                    " | ",
                    (res.followers ?? 0).toLocaleString("zh-TW"),
                    " \u7C89\u7D72"
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 516,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.proposals.$proposalId.tsx",
                  lineNumber: 514,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 497,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV7(Badge3, { color: "blue", variant: "filled", children: [
                "\u5339\u914D\u5EA6 ",
                res.matchScore,
                "%"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 521,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 496,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7(
              Text5,
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
                  /* @__PURE__ */ jsxDEV7(Text5, { span: !0, fw: 700, c: "blue", children: "AI \u63A8\u85A6\u7406\u7531\uFF1A" }, void 0, !1, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 536,
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
                lineNumber: 526,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(Group4, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ jsxDEV7(Form2, { method: "post", onSubmit: closeAiSearch, children: [
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "intent", value: "add_candidate" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 544,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "kolId", value: res.id }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 545,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "kolName", value: res.displayName }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 546,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "price", value: res.averagePrice || 0 }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 547,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "role", value: "\u5F85\u8A0E\u8AD6" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 548,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "reason", value: res.aiReason }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 549,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7(Button5, { size: "xs", type: "submit", children: "\u52A0\u5165\u5019\u9078\u540D\u55AE" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 550,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 543,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 542,
              columnNumber: 17
            }, this)
          ] }, res.id, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 495,
            columnNumber: 15
          }, this)),
          /* @__PURE__ */ jsxDEV7(Button5, { type: "button", fullWidth: !0, variant: "light", onClick: closeAiSearch, children: "\u95DC\u9589" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 558,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 488,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 478,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7(
      Modal2,
      {
        id: "proposal-manual-add-modal",
        opened: addOpened,
        onClose: () => {
          setManualKolId(null), closeAdd();
        },
        title: "\u65B0\u589E KOL \u5019\u9078\u4EBA",
        children: /* @__PURE__ */ jsxDEV7(
          Form2,
          {
            method: "post",
            onSubmit: () => {
              setManualKolId(null), closeAdd();
            },
            children: [
              /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "intent", value: "add_candidate" }, void 0, !1, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 581,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV7(Stack5, { children: [
                /* @__PURE__ */ jsxDEV7(
                  Select3,
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
                    lineNumber: 583,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV7(
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
                    lineNumber: 594,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV7(
                  TextInput3,
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
                    lineNumber: 599,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV7(
                  NumberInput2,
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
                    lineNumber: 605,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV7(
                  Textarea3,
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
                    lineNumber: 613,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV7(Group4, { justify: "flex-end", mt: "md", children: [
                  /* @__PURE__ */ jsxDEV7(
                    Button5,
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
                      lineNumber: 620,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV7(Button5, { type: "submit", color: "blue", disabled: !manualKolId, children: "\u78BA\u8A8D\u52A0\u5165" }, void 0, !1, {
                    fileName: "app/routes/_app.proposals.$proposalId.tsx",
                    lineNumber: 630,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.proposals.$proposalId.tsx",
                  lineNumber: 619,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.proposals.$proposalId.tsx",
                lineNumber: 582,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 574,
            columnNumber: 9
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 565,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7(
      Modal2,
      {
        opened: !!feedbackCandidate,
        onClose: () => setFeedbackCandidate(null),
        title: `\u62D2\u7D55\u5019\u9078\u4EBA\uFF1A${feedbackCandidate?.name}`,
        children: /* @__PURE__ */ jsxDEV7(Form2, { method: "post", onSubmit: () => setFeedbackCandidate(null), children: [
          /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "intent", value: "update_status" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 645,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "candidateId", value: feedbackCandidate?.id }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 646,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV7("input", { type: "hidden", name: "status", value: "rejected" }, void 0, !1, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 647,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV7(Stack5, { children: [
            /* @__PURE__ */ jsxDEV7(
              Textarea3,
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
                lineNumber: 649,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(Button5, { type: "submit", color: "red", children: "\u78BA\u8A8D\u62D2\u7D55" }, void 0, !1, {
              fileName: "app/routes/_app.proposals.$proposalId.tsx",
              lineNumber: 655,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.proposals.$proposalId.tsx",
            lineNumber: 648,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 644,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.proposals.$proposalId.tsx",
        lineNumber: 639,
        columnNumber: 7
      },
      this
    ),
    isEditing && /* @__PURE__ */ jsxDEV7(Group4, { justify: "flex-end", mt: "xl", pb: "xl", children: [
      /* @__PURE__ */ jsxDEV7(
        Button5,
        {
          variant: "default",
          size: "lg",
          onClick: () => {
            setEditedTitle(proposal.title), setEditedClient(proposal.clientName), setEditedBudget(proposal.budget), setEditedDueDate(proposal.dueDate), setEditedStage(proposal.stage), setIsEditing(!1);
          },
          children: "\u53D6\u6D88"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 662,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV7(
        Button5,
        {
          color: "blue",
          size: "lg",
          onClick: () => {
            let formData = new FormData();
            formData.append("intent", "update_proposal"), formData.append("title", editedTitle), formData.append("clientName", editedClient), formData.append("budget", String(editedBudget)), formData.append("dueDate", editedDueDate), formData.append("stage", editedStage), submit(formData, { method: "post" }), setIsEditing(!1);
          },
          children: "\u5132\u5B58\u8B8A\u66F4"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_app.proposals.$proposalId.tsx",
          lineNumber: 676,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.$proposalId.tsx",
      lineNumber: 661,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.proposals.$proposalId.tsx",
    lineNumber: 178,
    columnNumber: 5
  }, this);
}

// app/routes/_app.insertion-orders.new.tsx
var app_insertion_orders_new_exports = {};
__export(app_insertion_orders_new_exports, {
  action: () => action4,
  default: () => InsertionOrderCreatePage,
  loader: () => loader5
});
import {
  Alert as Alert2,
  Box as Box4,
  Button as Button6,
  Card as Card5,
  Divider as Divider4,
  Group as Group5,
  Select as Select4,
  SimpleGrid as SimpleGrid5,
  Stack as Stack6,
  TagsInput as TagsInput3,
  Text as Text6,
  TextInput as TextInput4,
  Textarea as Textarea4,
  Title as Title6
} from "@mantine/core";
import { json as json5, redirect as redirect3 } from "@remix-run/node";
import { Form as Form3, Link as Link5, useActionData as useActionData2, useLoaderData as useLoaderData5, useNavigation as useNavigation3 } from "@remix-run/react";
import { useState as useState5 } from "react";
import { IconChevronDown as IconChevronDown3 } from "@tabler/icons-react";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
async function loader5({ request }) {
  let fromProposalId = new URL(request.url).searchParams.get("fromProposalId"), [kols, orders, brandCatalog, industryCatalog, teamMembers] = await Promise.all([
    listKols(),
    listInsertionOrders(),
    listBrandCatalog(),
    listIndustryCatalog(),
    listTeamMembers()
  ]), proposalData = null;
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
  let salesOwners = teamMembers.filter((m) => m.group === "AE").map((m) => m.name), kolManagers = teamMembers.filter((m) => m.group === "KOL").map((m) => m.name), orderBrands = orders.map((o) => o.brand).filter(Boolean), catalogBrands = brandCatalog.map((b) => b.name), brands = Array.from(/* @__PURE__ */ new Set([...orderBrands, ...catalogBrands])), catalogIndustries = industryCatalog.map((i) => i.name), kolIndustries = kols.map((k) => k.industry).filter(Boolean), industries = Array.from(/* @__PURE__ */ new Set([...catalogIndustries, ...kolIndustries]));
  return json5({ kols, salesOwners, kolManagers, brands, industries, proposalData });
}
async function action4({ request }) {
  let formData = await request.formData(), intent = String(formData.get("intent") ?? "create"), orderTitle = String(formData.get("orderTitle") ?? "").trim(), projectName = String(formData.get("projectName") ?? "").trim(), clientName = String(formData.get("clientName") ?? "").trim(), mcnName = String(formData.get("mcnName") ?? "").trim(), brandsRaw = String(formData.get("brands") ?? "").trim(), industriesRaw = String(formData.get("industries") ?? "").trim(), salesOwnersRaw = String(formData.get("salesOwners") ?? "").trim(), kolManagersRaw = String(formData.get("kolManagers") ?? "").trim(), description = String(formData.get("description") ?? "").trim(), internalNotes = String(formData.get("internalNotes") ?? "").trim(), selectedKolsJson = String(formData.get("selectedKolsJson") ?? "[]"), startDate = String(formData.get("startDate") ?? "").trim(), endDate = String(formData.get("endDate") ?? "").trim(), taxRate = Number(formData.get("taxRate") ?? 5), projectQuote = Number(formData.get("projectQuote") ?? 0);
  if (!orderTitle || !clientName)
    return json5({ error: "\u59D4\u520A\u55AE\u6A19\u984C\u8207\u5BA2\u6236\u70BA\u5FC5\u586B" }, { status: 400 });
  let industries = industriesRaw ? industriesRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], brandsArr = brandsRaw ? brandsRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], salesOwnersArr = salesOwnersRaw ? salesOwnersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], kolManagersArr = kolManagersRaw ? kolManagersRaw.split(",").map((s) => s.trim()).filter(Boolean) : [], [brandCatalog, industryCatalog] = await Promise.all([
    listBrandCatalog(),
    listIndustryCatalog()
  ]), brandSet = new Set(brandCatalog.map((b) => b.name)), industrySet = new Set(industryCatalog.map((i) => i.name));
  await Promise.all(
    brandsArr.filter((b) => !brandSet.has(b)).map((name) => addBrandCatalog({ name }))
  ), await Promise.all(
    industries.filter((i) => !industrySet.has(i)).map((name) => addIndustryCatalog({ name }))
  );
  let selectedKols = [];
  try {
    selectedKols = JSON.parse(selectedKolsJson);
  } catch {
    selectedKols = [];
  }
  let docFile = formData.get("documentUrl"), documentUrl = docFile && docFile.name ? docFile.name : "", totalBudget = projectQuote, tax = Math.round(totalBudget * (taxRate / 100)), totalWithTax = totalBudget + tax, payload = {
    orderNo: `IO-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`,
    orderTitle,
    title: projectName || orderTitle,
    projectName: projectName || orderTitle,
    clientName,
    mcnName,
    brand: brandsArr[0] ?? "",
    industry: industries[0] ?? "\u672A\u5206\u985E",
    industryPath: industries.join(" > "),
    salesOwner: salesOwnersArr[0] ?? "",
    kolManager: kolManagersArr[0] ?? "",
    kolCount: selectedKols.length,
    status: intent === "draft" ? "planned" : "in_progress",
    documentUrl,
    totalBudget,
    tax,
    totalWithTax,
    totalReach: 0,
    totalEngagement: 0,
    avgRating: 0,
    avgEngagementRate: 0,
    collaborations: selectedKols.map((row) => ({
      id: `ioc_${Math.random().toString(36).slice(2, 9)}`,
      kolId: row.kolId,
      name: row.name,
      avatarUrl: row.avatarUrl,
      price: row.price,
      services: row.services.join(" + "),
      uploadDate: row.uploadDate,
      executionDate: row.executionDate,
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
    return json5({ error: "\u5EFA\u7ACB\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66" }, { status: 500 });
  let created = await res.json();
  return redirect3(`/insertion-orders/${created.id}`);
}
function InsertionOrderCreatePage() {
  let { kols, salesOwners, kolManagers, brands, industries, proposalData } = useLoaderData5(), actionData = useActionData2(), submitting = useNavigation3().state === "submitting", [selectedBrands, setSelectedBrands] = useState5([]), [selectedIndustries, setSelectedIndustries] = useState5([]), [selectedSales, setSelectedSales] = useState5(null), [selectedKolManagers, setSelectedKolManagers] = useState5(null), brandSuggestions = brands, industrySuggestions = industries, [orderTitleVal, setOrderTitleVal] = useState5(proposalData?.title ?? ""), [projectNameVal, setProjectNameVal] = useState5(proposalData?.title ?? ""), [clientNameVal, setClientNameVal] = useState5(proposalData?.clientName ?? ""), [mcnNameVal, setMcnNameVal] = useState5(""), [startDate, setStartDate] = useState5(""), [endDate, setEndDate] = useState5(""), [projectQuote, setProjectQuote] = useState5(0), [taxRate, setTaxRate] = useState5(5), totalWithTax = Math.round(projectQuote * (1 + taxRate / 100)), nativeDialogScript = `
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
          ? 'onclick="kolDialogRemove(\\''+k.id+'\\');return false;" style="padding:5px 14px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;"'
          : 'onclick="kolDialogAdd(\\''+k.id+'\\',\\''+encodeURIComponent(k.name)+'\\',\\''+encodeURIComponent(k.avatarUrl||'')+'\\','+k.price+');return false;" style="padding:5px 14px;border-radius:4px;border:none;background:var(--mantine-color-blue-filled);color:#fff;cursor:pointer;font-size:12px;"';
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
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG\u8CBC\u6587'], uploadDate:'', executionDate:'', authorization:'', price:Number(price)||0 });
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
        return '<div style="display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;flex-shrink:0;"/>'
          +'<div style="flex:1;">'
          +'<div style="display:flex;justify-content:space-between;align-items:center;">'
          +'<span style="font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);">NT$ '+(row.price||0).toLocaleString()+'</span>'
          +'</div>'
          +'<div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">'
          +'<label style="font-size:12px;color:var(--mantine-color-dimmed);">\u57F7\u884C\u65E5\u671F</label>'
          +'<input type="date" value="'+(row.executionDate||'')+'" onchange="kolUpdateExecDate(\\''+row.id+'\\',this.value)" style="font-size:12px;padding:2px 6px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);"/>'
          +'</div>'
          +'</div>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;flex-shrink:0;">\u79FB\u9664</button>'
          +'</div>';
      }).join('');
    }
    window.kolUpdateExecDate = function(rowId, val) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var idx = selected.findIndex(function(x){ return x.id === rowId; });
      if (idx !== -1) selected[idx].executionDate = val;
      if (ta) ta.value = JSON.stringify(selected);
    }
  `, handleExcelUpload = (file) => {
    setTimeout(() => {
      let parsed = {
        orderTitle: "DAC_ALLIE_KOL\u884C\u92B7\u6D3B\u52D5 \u59D4\u520A\u55AE",
        projectName: "2026 \u590F\u5B63\u65B0\u54C1\u4E0A\u5E02\u63A8\u5EE3",
        clientName: "ALLIE",
        mcnName: "\u96F2\u592A\u8CC7\u8A0A\u6709\u9650\u516C\u53F8",
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        executionDate: "2026-05-23",
        projectQuote: 15e4,
        taxRate: 5
      };
      setOrderTitleVal(parsed.orderTitle), setProjectNameVal(parsed.projectName), setClientNameVal(parsed.clientName), setMcnNameVal(parsed.mcnName), setStartDate(parsed.startDate), setEndDate(parsed.endDate), setProjectQuote(parsed.projectQuote), setTaxRate(parsed.taxRate), setSelectedBrands(["ALLIE"]);
      try {
        typeof window.kolDialogAdd == "function" && window.kolDialogAdd("kol-001", encodeURIComponent("Gina"), encodeURIComponent("https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"), 4e4);
      } catch {
      }
      alert("\u2705 \u6210\u529F\u89E3\u6790 Excel\uFF01\u5DF2\u81EA\u52D5\u5E36\u5165\u59D4\u520A\u55AE\u6A19\u984C\u3001\u5BA2\u6236\u3001\u7DB2\u7D05\u516C\u53F8\u3001\u65E5\u671F\u8207\u5831\u50F9\u7B49\u6B04\u4F4D\u3002");
    }, 600);
  };
  return /* @__PURE__ */ jsxDEV8(Stack6, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV8("script", { dangerouslySetInnerHTML: { __html: nativeDialogScript } }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 385,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV8(Title6, { order: 2, children: "\u5EFA\u7ACB\u59D4\u520A\u55AE" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 388,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8(Button6, { component: Link5, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 389,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 387,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(Card5, { withBorder: !0, children: /* @__PURE__ */ jsxDEV8(
      Form3,
      {
        method: "post",
        onKeyDown: (e) => {
          e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "submit" && e.preventDefault();
        },
        children: [
          /* @__PURE__ */ jsxDEV8("input", { type: "hidden", name: "brands", value: selectedBrands.join(",") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 402,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { type: "hidden", name: "industries", value: selectedIndustries.join(",") }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 403,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { type: "hidden", name: "salesOwners", value: selectedSales ?? "" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 404,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV8("input", { type: "hidden", name: "kolManagers", value: selectedKolManagers ?? "" }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 405,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV8(Stack6, { gap: "lg", children: [
            /* @__PURE__ */ jsxDEV8(Box4, { children: [
              /* @__PURE__ */ jsxDEV8(Text6, { fw: 600, mb: "xs", children: "\u532F\u5165\u59D4\u520A\u55AE (Excel)" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 410,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(
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
                    let f = e.dataTransfer.files[0];
                    f && handleExcelUpload(f);
                  },
                  children: [
                    /* @__PURE__ */ jsxDEV8("div", { style: { fontSize: 32, marginBottom: 8 }, children: "\u{1F4CA}" }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.new.tsx",
                      lineNumber: 433,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV8(Text6, { fw: 600, c: "blue", children: "\u9EDE\u64CA\u4E0A\u50B3\u6216\u62D6\u66F3 Excel \u6A94\u6848\u81F3\u6B64" }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.new.tsx",
                      lineNumber: 434,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", c: "dimmed", mt: 4, children: "\u652F\u63F4 .xlsx, .xls \u2014 \u4E0A\u50B3\u5F8C\u81EA\u52D5\u5E36\u5165\u4E0B\u65B9\u6B04\u4F4D\uFF0C\u53EF\u624B\u52D5\u4FEE\u6539" }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.new.tsx",
                      lineNumber: 435,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV8(
                      "input",
                      {
                        id: "excel-upload-input",
                        type: "file",
                        accept: ".xlsx,.xls,.csv",
                        style: { display: "none" },
                        onChange: (e) => {
                          let f = e.target.files?.[0];
                          f && handleExcelUpload(f);
                        }
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/_app.insertion-orders.new.tsx",
                        lineNumber: 436,
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
                  lineNumber: 411,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 409,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Divider4, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 446,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Box4, { children: [
              /* @__PURE__ */ jsxDEV8(Title6, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u57FA\u672C\u8CC7\u8A0A" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 450,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(SimpleGrid5, { cols: { base: 1, md: 2 }, spacing: "md", children: [
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "orderTitle",
                    label: "\u59D4\u520A\u55AE\u6A19\u984C",
                    placeholder: "\u4F8B\u5982\uFF1ADAC_ALLIE_KOL\u884C\u92B7\u6D3B\u52D5 \u59D4\u520A\u55AE",
                    required: !0,
                    value: orderTitleVal,
                    onChange: (e) => {
                      setOrderTitleVal(e.currentTarget.value), projectNameVal === orderTitleVal && setProjectNameVal(e.currentTarget.value);
                    }
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 452,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "projectName",
                    label: "\u5C08\u6848\u540D\u7A31",
                    placeholder: "\u4F8B\u5982\uFF1A2026 Q1 \u5BB6\u96FB\u63A8\u5EE3",
                    value: projectNameVal,
                    onChange: (e) => setProjectNameVal(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 464,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "clientName",
                    label: "\u5BA2\u6236",
                    placeholder: "\u8ACB\u8F38\u5165\u5BA2\u6236\u540D\u7A31",
                    required: !0,
                    value: clientNameVal,
                    onChange: (e) => setClientNameVal(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 471,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "mcnName",
                    label: "\u7DB2\u7D05\u516C\u53F8\u540D\u7A31",
                    placeholder: "\u4F8B\u5982\uFF1A\u96F2\u592A\u8CC7\u8A0A\u6709\u9650\u516C\u53F8",
                    value: mcnNameVal,
                    onChange: (e) => setMcnNameVal(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 479,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TagsInput3,
                  {
                    label: "\u54C1\u724C",
                    placeholder: "\u9078\u64C7\u6216\u8F38\u5165\u54C1\u724C\uFF0CEnter \u65B0\u589E",
                    data: brandSuggestions,
                    value: selectedBrands,
                    onChange: setSelectedBrands,
                    clearable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV8(IconChevronDown3, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.new.tsx",
                      lineNumber: 493,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 486,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TagsInput3,
                  {
                    label: "\u7522\u696D",
                    placeholder: "\u9078\u64C7\u6216\u8F38\u5165\u7522\u696D\uFF0CEnter \u65B0\u589E",
                    data: industrySuggestions,
                    value: selectedIndustries,
                    onChange: setSelectedIndustries,
                    clearable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV8(IconChevronDown3, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.new.tsx",
                      lineNumber: 503,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 496,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  Select4,
                  {
                    label: "\u8CA0\u8CAC\u696D\u52D9",
                    placeholder: "\u9078\u64C7\u8CA0\u8CAC\u696D\u52D9",
                    data: salesOwners,
                    value: selectedSales,
                    onChange: setSelectedSales,
                    clearable: !0,
                    searchable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV8(IconChevronDown3, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.new.tsx",
                      lineNumber: 514,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 506,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  Select4,
                  {
                    label: "\u8CA0\u8CAC KOL Team \u6210\u54E1",
                    placeholder: "\u9078\u64C7 KOL Team \u6210\u54E1",
                    data: kolManagers,
                    value: selectedKolManagers,
                    onChange: setSelectedKolManagers,
                    clearable: !0,
                    searchable: !0,
                    rightSection: /* @__PURE__ */ jsxDEV8(IconChevronDown3, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.insertion-orders.new.tsx",
                      lineNumber: 525,
                      columnNumber: 33
                    }, this),
                    rightSectionPointerEvents: "none"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 517,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "startDate",
                    label: "\u958B\u59CB\u65E5",
                    type: "date",
                    value: startDate,
                    onChange: (e) => setStartDate(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 528,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "endDate",
                    label: "\u7D50\u675F\u65E5",
                    type: "date",
                    value: endDate,
                    onChange: (e) => setEndDate(e.currentTarget.value)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 535,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 451,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 449,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Divider4, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 545,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Box4, { children: [
              /* @__PURE__ */ jsxDEV8(Title6, { order: 4, mb: "sm", children: "\u8CA1\u52D9\u8CC7\u8A0A" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 549,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(SimpleGrid5, { cols: { base: 1, md: 3 }, spacing: "md", children: [
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "projectQuote",
                    label: "\u5C08\u6848\u5831\u50F9 (\u672A\u7A05)",
                    type: "number",
                    placeholder: "0",
                    value: projectQuote || "",
                    onChange: (e) => setProjectQuote(Number(e.currentTarget.value) || 0)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 551,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    name: "taxRate",
                    label: "\u7A05\u7387 (%)",
                    type: "number",
                    value: taxRate,
                    onChange: (e) => setTaxRate(Number(e.currentTarget.value) || 0)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 559,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV8(
                  TextInput4,
                  {
                    label: "\u5C08\u6848\u7E3D\u91D1\u984D (\u542B\u7A05)",
                    readOnly: !0,
                    value: `NT$ ${totalWithTax.toLocaleString()}`,
                    styles: { input: { color: "var(--mantine-color-blue-6)", fontWeight: 600 } }
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 566,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 550,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 548,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Divider4, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 575,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Box4, { children: [
              /* @__PURE__ */ jsxDEV8(Title6, { order: 4, mb: "sm", children: "\u5408\u4F5C\u5167\u5BB9" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 579,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(SimpleGrid5, { cols: { base: 1, md: 2 }, spacing: "md", children: [
                /* @__PURE__ */ jsxDEV8(TextInput4, { name: "services", label: "\u5408\u4F5C\u5167\u5BB9", placeholder: "\u4F8B\u5982\uFF1AIG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 581,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV8(TextInput4, { name: "authorization", label: "\u6388\u6B0A\u9805\u76EE", placeholder: "\u4F8B\u5982\uFF1A\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 582,
                  columnNumber: 17
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 580,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 578,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Divider4, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 586,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Box4, { children: [
              /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", mb: "sm", children: [
                /* @__PURE__ */ jsxDEV8(Title6, { order: 4, children: "\u5408\u4F5C KOL" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 591,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV8(
                  Button6,
                  {
                    type: "button",
                    variant: "default",
                    onClick: () => {
                      typeof window.kolDialogOpen == "function" && window.kolDialogOpen();
                    },
                    children: "\u9078\u64C7\u5408\u4F5C KOL"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.insertion-orders.new.tsx",
                    lineNumber: 592,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 590,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8("div", { id: "kol-selected-display", style: { minHeight: 40 }, children: /* @__PURE__ */ jsxDEV8("p", { style: { fontSize: 14, color: "var(--mantine-color-dimmed)", margin: "8px 0" }, children: "\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 605,
                columnNumber: 17
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 604,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(
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
                  lineNumber: 610,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 589,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Divider4, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 620,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Box4, { children: [
              /* @__PURE__ */ jsxDEV8(Title6, { order: 4, mb: "sm", children: "\u59D4\u520A\u55AE\u6A94\u6848 (\u5408\u7D04)" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 623,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(Text6, { size: "sm", c: "dimmed", mb: "xs", children: "\u4E0A\u50B3\u7D93\u96D9\u65B9\u78BA\u8A8D\u7684\u59D4\u520A\u55AE PDF/Word \u6A94\u6848 (\u9078\u586B)" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 624,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8("input", { type: "file", name: "documentUrl", accept: ".pdf,.doc,.docx" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 625,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 622,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Divider4, {}, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 628,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV8(Box4, { children: [
              /* @__PURE__ */ jsxDEV8(Title6, { order: 4, mb: "sm", children: "\u5176\u4ED6\u8CC7\u8A0A" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 631,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(Stack6, { children: [
                /* @__PURE__ */ jsxDEV8(Textarea4, { name: "description", label: "\u5C08\u6848\u8AAA\u660E", minRows: 4 }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 633,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV8(Textarea4, { name: "internalNotes", label: "\u5167\u90E8\u5099\u8A3B", minRows: 3 }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 634,
                  columnNumber: 17
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 632,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 630,
              columnNumber: 13
            }, this),
            actionData?.error && /* @__PURE__ */ jsxDEV8(Alert2, { color: "red", children: actionData.error }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 638,
              columnNumber: 35
            }, this),
            /* @__PURE__ */ jsxDEV8(Group5, { justify: "space-between", children: [
              /* @__PURE__ */ jsxDEV8(Button6, { component: Link5, to: "/insertion-orders", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 641,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV8(Group5, { children: [
                /* @__PURE__ */ jsxDEV8(Button6, { type: "submit", name: "intent", value: "draft", variant: "default", loading: submitting, children: "\u5132\u5B58\u8349\u7A3F" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 643,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV8(Button6, { type: "submit", name: "intent", value: "create", loading: submitting, children: "\u5EFA\u7ACB\u59D4\u520A\u55AE" }, void 0, !1, {
                  fileName: "app/routes/_app.insertion-orders.new.tsx",
                  lineNumber: 644,
                  columnNumber: 17
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 642,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 640,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 407,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 393,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/_app.insertion-orders.new.tsx",
      lineNumber: 392,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(
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
          /* @__PURE__ */ jsxDEV8("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxDEV8("strong", { style: { fontSize: 18 }, children: "\u9078\u64C7\u5408\u4F5C KOL" }, void 0, !1, {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 666,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV8(
              "button",
              {
                type: "button",
                onClick: () => {
                  typeof window.kolDialogClose == "function" && window.kolDialogClose();
                },
                style: { background: "none", border: "none", cursor: "pointer", fontSize: 20 },
                children: "\u2715"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.insertion-orders.new.tsx",
                lineNumber: 667,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 665,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8(
            "input",
            {
              id: "kol-dialog-search",
              type: "text",
              placeholder: "\u641C\u5C0B KOL \u540D\u7A31\u3001\u5E33\u865F\u6216\u7522\u696D",
              onChange: (e) => {
                typeof window.kolDialogSearch == "function" && window.kolDialogSearch(e.target.value);
              },
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
              lineNumber: 676,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV8(
            "div",
            {
              id: "kol-dialog-list",
              style: { maxHeight: 400, overflowY: "auto", marginTop: 12, paddingRight: 4 }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 695,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV8("div", { style: { marginTop: 16, textAlign: "right" }, children: /* @__PURE__ */ jsxDEV8(
            "button",
            {
              type: "button",
              onClick: () => {
                typeof window.kolDialogClose == "function" && window.kolDialogClose();
              },
              style: { padding: "8px 20px", borderRadius: 4, border: "none", background: "var(--mantine-color-blue-filled)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 },
              children: "\u5B8C\u6210\u9078\u64C7"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.insertion-orders.new.tsx",
              lineNumber: 700,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.insertion-orders.new.tsx",
            lineNumber: 699,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.insertion-orders.new.tsx",
        lineNumber: 652,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.insertion-orders.new.tsx",
    lineNumber: 384,
    columnNumber: 5
  }, this);
}

// app/routes/_app.kols.$kolId._index.tsx
var app_kols_kolId_index_exports = {};
__export(app_kols_kolId_index_exports, {
  default: () => KolDetailPage,
  loader: () => loader6
});
import {
  Avatar as Avatar4,
  Badge as Badge4,
  Box as Box5,
  Button as Button7,
  Card as Card6,
  Grid as Grid2,
  Group as Group6,
  Modal as Modal3,
  Progress,
  Stack as Stack7,
  Text as Text7,
  Title as Title7
} from "@mantine/core";
import { json as json6 } from "@remix-run/node";
import { Link as Link6, useLoaderData as useLoaderData6 } from "@remix-run/react";
import { useMemo as useMemo3, useState as useState6 } from "react";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
function formatNumber(value) {
  return (value ?? 0).toLocaleString("zh-TW");
}
function formatCurrency(value) {
  return `NT$ ${(value ?? 0).toLocaleString("zh-TW")}`;
}
function SparkLine({ points }) {
  let mapped = useMemo3(() => {
    if (points.length === 0)
      return [];
    let max = Math.max(...points.map((p) => p.price)), min = Math.min(...points.map((p) => p.price)), range = Math.max(1, max - min);
    return points.map((p, index) => {
      let x = 24 + index * 572 / Math.max(1, points.length - 1), y = 220 - 24 - (p.price - min) / range * (220 - 24 * 2);
      return { ...p, x, y };
    });
  }, [points]), path = mapped.map((p) => `${p.x},${p.y}`).join(" ");
  return /* @__PURE__ */ jsxDEV9(Box5, { children: [
    /* @__PURE__ */ jsxDEV9("svg", { width: "100%", viewBox: "0 0 620 220", role: "img", "aria-label": "price trend", children: [
      /* @__PURE__ */ jsxDEV9("line", { x1: 24, y1: 220 - 24, x2: 620 - 24, y2: 220 - 24, stroke: "#cbd5e1" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("line", { x1: 24, y1: 24, x2: 24, y2: 220 - 24, stroke: "#cbd5e1" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("polyline", { fill: "none", stroke: "#228be6", strokeWidth: "3", points: path }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      mapped.map((p) => /* @__PURE__ */ jsxDEV9("circle", { cx: p.x, cy: p.y, r: "4", fill: "#228be6" }, p.date, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 54,
        columnNumber: 11
      }, this))
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", children: points.map((p) => /* @__PURE__ */ jsxDEV9(Text7, { size: "xs", c: "dimmed", children: p.date }, p.date, !1, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 59,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.$kolId._index.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}
async function loader6({ params, request }) {
  let kol = await getKol(params.kolId ?? "");
  if (!kol)
    throw new Response("Not Found", { status: 404 });
  let url = new URL(request.url), tab = url.searchParams.get("tab") ?? "projects", limit = Math.max(5, Number(url.searchParams.get("limit") ?? "5"));
  return json6({ kol, tab, limit });
}
function KolDetailPage() {
  let { kol, tab, limit } = useLoaderData6(), [contactOpened, setContactOpened] = useState6(!1), history = kol.collaborationHistory ?? [], visibleHistory = history.slice(0, limit), hasMore = limit < history.length, avgPrice = kol.averagePrice ?? (history.length > 0 ? Math.round(history.reduce((sum, row) => sum + row.price, 0) / history.length) : 0), avgRating = kol.rating ?? (history.length > 0 ? history.reduce((sum, row) => sum + row.rating, 0) / history.length : 0), collabCount = kol.collaborations ?? history.length, stats = kol.performanceStats ?? {}, platformPerf = stats.platformPerformance ?? {}, handleDownloadReport = () => {
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
  return /* @__PURE__ */ jsxDEV9(Stack7, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV9(Group6, { gap: 8, children: [
      /* @__PURE__ */ jsxDEV9(Link6, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 145,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Text7, { fw: 600, children: kol.displayName }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 143,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9(Grid2, { children: [
      /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, lg: 9 }, children: [
        /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, p: "lg", children: [
          /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", align: "flex-start", wrap: "nowrap", children: [
            /* @__PURE__ */ jsxDEV9(Group6, { align: "flex-start", wrap: "nowrap", children: [
              /* @__PURE__ */ jsxDEV9(Avatar4, { src: kol.avatarUrl, size: 96, radius: 999 }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV9(Stack7, { gap: 6, children: [
                /* @__PURE__ */ jsxDEV9(Title7, { order: 2, children: kol.displayName }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 157,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV9(Text7, { children: [
                  "Instagram: @",
                  kol.instagramHandle ?? "-",
                  " | ",
                  formatNumber(kol.social?.instagram ?? kol.followers),
                  " \u7C89\u7D72"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 158,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV9(Text7, { children: [
                  "YouTube: ",
                  formatNumber(kol.social?.youtube ?? kol.youtubeSubscribers),
                  " \u8A02\u95B1"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 159,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV9(Group6, { gap: 6, children: (kol.tags ?? kol.categories).map((tag) => /* @__PURE__ */ jsxDEV9(Badge4, { variant: "light", radius: "xl", children: tag }, tag, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 162,
                  columnNumber: 23
                }, this)) }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 160,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 156,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV9(Stack7, { align: "flex-end", gap: 6, children: [
              /* @__PURE__ */ jsxDEV9(Text7, { children: [
                "\u2B50 ",
                avgRating.toFixed(1),
                " (",
                collabCount,
                " \u6B21\u5408\u4F5C)"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 168,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV9(Text7, { children: [
                "\u5E73\u5747\u50F9\u683C: ",
                formatCurrency(avgPrice)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 169,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV9(Text7, { children: [
                "\u8ACB\u6B3E\u65B9\u5F0F: ",
                /* @__PURE__ */ jsxDEV9(Badge4, { variant: "dot", children: kol.paymentMethod || "\u672A\u8A2D\u5B9A" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 170,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 170,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV9(Group6, { gap: 6, children: (kol.industryDistribution ?? [kol.industry ?? "\u672A\u5206\u985E"]).map((industry) => /* @__PURE__ */ jsxDEV9(Badge4, { color: "gray", variant: "light", children: industry }, industry, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 173,
                columnNumber: 21
              }, this)) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 171,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 167,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 153,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV9(Group6, { mt: "md", children: [
            /* @__PURE__ */ jsxDEV9(Link6, { to: kol.isFavorite ? "/favorites" : `/kols/${kol.id}`, style: { padding: "6px 14px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", textDecoration: "none", fontSize: 14 }, children: kol.isFavorite ? "\u2764\uFE0F \u5DF2\u6536\u85CF" : "\u{1F497} \u52A0\u5165\u6536\u85CF" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 179,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV9(
              Button7,
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
                lineNumber: 182,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV9(Button7, { type: "button", variant: "link", size: "xs", component: Link6, to: `/kols/${kol.id}/edit`, children: "\u270F\uFE0F \u7DE8\u8F2F" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 190,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV9(Button7, { type: "button", variant: "default", size: "xs", onClick: handleDownloadReport, children: "\u{1F4CA} \u4E0B\u8F09 KOL \u5831\u544A" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 193,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 178,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 152,
          columnNumber: 11
        }, this),
        kol.introduction && /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, mt: "md", children: [
          /* @__PURE__ */ jsxDEV9(Title7, { order: 4, mb: "sm", children: "\u4EBA\u9078\u4ECB\u7D39 (\u7528\u65BC\u63D0\u6848\u64B0\u5BEB)" }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 202,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", style: { whiteSpace: "pre-wrap", lineHeight: 1.6 }, children: kol.introduction }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 203,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 201,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV9(
          Modal3,
          {
            opened: contactOpened,
            onClose: () => setContactOpened(!1),
            title: "\u806F\u7D61\u65B9\u5F0F",
            children: /* @__PURE__ */ jsxDEV9(Stack7, { gap: "sm", children: [
              /* @__PURE__ */ jsxDEV9(Text7, { children: [
                /* @__PURE__ */ jsxDEV9(Text7, { span: !0, fw: 600, children: "\u96FB\u8A71\uFF1A" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 216,
                  columnNumber: 17
                }, this),
                " ",
                kol.contact?.phone || "\u5C1A\u672A\u63D0\u4F9B"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 215,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV9(Text7, { children: [
                /* @__PURE__ */ jsxDEV9(Text7, { span: !0, fw: 600, children: "Email\uFF1A" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 222,
                  columnNumber: 17
                }, this),
                " ",
                kol.contact?.email || "\u5C1A\u672A\u63D0\u4F9B"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 221,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV9(Button7, { type: "button", variant: "light", onClick: () => setContactOpened(!1), children: "\u95DC\u9589" }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 227,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 214,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 209,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, mt: "md", children: [
          /* @__PURE__ */ jsxDEV9("div", { style: { borderBottom: "1px solid var(--mantine-color-default-border)", marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxDEV9(Link6, { to: `/kols/${kol.id}?tab=projects&limit=${limit}`, style: tabStyle("projects"), children: "\u5408\u4F5C\u6848\u4EF6" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 236,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV9(Link6, { to: `/kols/${kol.id}?tab=price&limit=${limit}`, style: tabStyle("price"), children: "\u50F9\u683C\u8DA8\u52E2" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 237,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV9(Link6, { to: `/kols/${kol.id}?tab=performance&limit=${limit}`, style: tabStyle("performance"), children: "\u6210\u6548\u7D71\u8A08" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 238,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 235,
            columnNumber: 13
          }, this),
          tab === "projects" && /* @__PURE__ */ jsxDEV9(Stack7, { gap: "md", children: [
            visibleHistory.map((item, idx) => /* @__PURE__ */ jsxDEV9("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" }, children: [
              /* @__PURE__ */ jsxDEV9("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }, children: [
                /* @__PURE__ */ jsxDEV9("div", { style: { width: 20, height: 20, borderRadius: "50%", background: "var(--mantine-color-blue-filled)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 600, flexShrink: 0 }, children: idx + 1 }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 247,
                  columnNumber: 23
                }, this),
                idx < visibleHistory.length - 1 && /* @__PURE__ */ jsxDEV9("div", { style: { width: 2, flex: 1, minHeight: 16, background: "var(--mantine-color-default-border)", marginTop: 4 } }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 251,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 246,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, style: { flex: 1, marginBottom: 8 }, children: /* @__PURE__ */ jsxDEV9(Stack7, { gap: 8, children: [
                /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", align: "flex-start", children: [
                  /* @__PURE__ */ jsxDEV9(Stack7, { gap: 2, children: [
                    /* @__PURE__ */ jsxDEV9(Text7, { fw: 600, children: [
                      "\u{1F4CB} ",
                      /* @__PURE__ */ jsxDEV9(Link6, { to: item.orderId ? `/insertion-orders/${item.orderId}` : "#", children: item.projectTitle }, void 0, !1, {
                        fileName: "app/routes/_app.kols.$kolId._index.tsx",
                        lineNumber: 259,
                        columnNumber: 34
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 258,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", c: "dimmed", children: [
                      item.clientName,
                      " | \u7522\u696D: ",
                      item.industry
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 261,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 257,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV9(Stack7, { align: "flex-end", gap: 2, children: [
                    /* @__PURE__ */ jsxDEV9(Text7, { fw: 600, children: formatCurrency(item.price) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 264,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: [
                      "\u2B50 ",
                      item.rating.toFixed(1)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 265,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 263,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 256,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: [
                  "\u670D\u52D9\u9805\u76EE: ",
                  item.services
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 268,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV9(Group6, { gap: "lg", children: [
                  /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: [
                    "IG \u8CBC\u6587: \u{1F441}\uFE0F ",
                    formatNumber(item.metrics?.postViews),
                    " | \u{1F497} ",
                    formatNumber(item.metrics?.postLikes),
                    " | \u{1F4AC} ",
                    formatNumber(item.metrics?.postComments)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 270,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: [
                    "IG \u9650\u52D5: \u{1F441}\uFE0F ",
                    formatNumber(item.metrics?.storyViews),
                    " | \u{1F497} ",
                    formatNumber(item.metrics?.storyLikes)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 271,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 269,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV9(Group6, { justify: "flex-end", children: /* @__PURE__ */ jsxDEV9(Link6, { to: item.orderId ? `/insertion-orders/${item.orderId}` : "#", children: "\u67E5\u770B\u8A73\u7D30\u6210\u6548 \u2192" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 274,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 273,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 255,
                columnNumber: 23
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 254,
                columnNumber: 21
              }, this)
            ] }, item.id, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 245,
              columnNumber: 19
            }, this)),
            hasMore && /* @__PURE__ */ jsxDEV9(Group6, { justify: "center", mt: "md", children: /* @__PURE__ */ jsxDEV9(
              Link6,
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
                lineNumber: 283,
                columnNumber: 21
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 282,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 243,
            columnNumber: 15
          }, this),
          tab === "price" && /* @__PURE__ */ jsxDEV9(Stack7, { children: [
            /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", children: "X \u8EF8: \u65E5\u671F / Y \u8EF8: \u50F9\u683C (NT$)" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 304,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, children: /* @__PURE__ */ jsxDEV9(SparkLine, { points: kol.priceTrend ?? [] }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 306,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 305,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 303,
            columnNumber: 15
          }, this),
          tab === "performance" && /* @__PURE__ */ jsxDEV9(Stack7, { children: [
            /* @__PURE__ */ jsxDEV9(Grid2, { children: [
              /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, style: { height: "100%" }, children: [
                /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u89F8\u53CA" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 317,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV9(Title7, { order: 3, children: formatNumber(stats.averageReach) }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 318,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 316,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 315,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, style: { height: "100%" }, children: [
                /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", size: "sm", children: "\u66DD\u5149\u7387 (%)" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 323,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV9(Title7, { order: 3, children: [
                  (kol.exposureRate || 0).toFixed(1),
                  "%"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 324,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 322,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 321,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, style: { height: "100%" }, children: [
                /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", size: "sm", children: "\u5E73\u5747\u4E92\u52D5\u7387" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 329,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV9(Title7, { order: 3, children: [
                  (stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1),
                  "%"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 330,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 328,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 327,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, style: { height: "100%" }, children: [
                /* @__PURE__ */ jsxDEV9(Text7, { c: "dimmed", size: "sm", children: "\u8F49\u63DB\u7387" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 335,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV9(Title7, { order: 3, children: [
                  (stats.conversionRate ?? 0).toFixed(1),
                  "%"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 336,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 334,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 333,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 314,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV9(Grid2, { mt: "sm", children: [
              /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, children: [
                /* @__PURE__ */ jsxDEV9(Text7, { fw: 600, mb: "sm", children: "\u53D7\u773E\u6027\u5225\u6BD4" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 344,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", children: [
                  /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: [
                    "\u7537 ",
                    kol.audienceGender?.male || 0,
                    "%"
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 346,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: [
                    "\u5973 ",
                    kol.audienceGender?.female || 0,
                    "%"
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 347,
                    columnNumber: 25
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 345,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV9(Progress.Root, { size: "xl", mt: 4, children: [
                  /* @__PURE__ */ jsxDEV9(Progress.Section, { value: kol.audienceGender?.male || 0, color: "blue" }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 350,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV9(Progress.Section, { value: kol.audienceGender?.female || 0, color: "pink" }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 351,
                    columnNumber: 25
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 349,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 343,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 342,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, md: 6 }, children: /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, children: [
                /* @__PURE__ */ jsxDEV9(Text7, { fw: 600, mb: "sm", children: "\u53D7\u773E\u5E74\u9F61\u5C64" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 357,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV9(Title7, { order: 3, children: kol.audienceAge || "\u672A\u77E5" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 358,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 356,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 355,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 341,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, mt: "md", children: [
              /* @__PURE__ */ jsxDEV9(Text7, { fw: 600, mb: "sm", children: "\u5E73\u53F0\u6210\u6548\u6BD4\u8F03" }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 364,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV9(Stack7, { children: [
                /* @__PURE__ */ jsxDEV9(Box5, { children: [
                  /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", children: [
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: "Instagram" }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 367,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: formatNumber(platformPerf.instagram) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 367,
                      columnNumber: 86
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 367,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV9(Progress, { value: Math.min(100, (platformPerf.instagram ?? 0) / 1200) }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 368,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 366,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV9(Box5, { children: [
                  /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", children: [
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: "YouTube" }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 371,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: formatNumber(platformPerf.youtube) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 371,
                      columnNumber: 84
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 371,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV9(Progress, { value: Math.min(100, (platformPerf.youtube ?? 0) / 1200), color: "orange" }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 372,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 370,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV9(Box5, { children: [
                  /* @__PURE__ */ jsxDEV9(Group6, { justify: "space-between", children: [
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: "TikTok" }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 375,
                      columnNumber: 54
                    }, this),
                    /* @__PURE__ */ jsxDEV9(Text7, { size: "sm", children: formatNumber(platformPerf.tiktok) }, void 0, !1, {
                      fileName: "app/routes/_app.kols.$kolId._index.tsx",
                      lineNumber: 375,
                      columnNumber: 83
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 375,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV9(Progress, { value: Math.min(100, (platformPerf.tiktok ?? 0) / 1200), color: "grape" }, void 0, !1, {
                    fileName: "app/routes/_app.kols.$kolId._index.tsx",
                    lineNumber: 376,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.kols.$kolId._index.tsx",
                  lineNumber: 374,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId._index.tsx",
                lineNumber: 365,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId._index.tsx",
              lineNumber: 363,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 313,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 234,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(Grid2.Col, { span: { base: 12, lg: 3 }, children: /* @__PURE__ */ jsxDEV9(Card6, { withBorder: !0, children: [
        /* @__PURE__ */ jsxDEV9(Title7, { order: 4, mb: "sm", children: "\u5FEB\u901F\u7D71\u8A08" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 387,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV9(Stack7, { gap: 8, children: [
          /* @__PURE__ */ jsxDEV9(Text7, { children: [
            "\u{1F4CA} \u5408\u4F5C\u6B21\u6578: ",
            collabCount,
            " \u6B21"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 389,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV9(Text7, { children: [
            "\u{1F4B0} \u5E73\u5747\u50F9\u683C: ",
            formatCurrency(avgPrice)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 390,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV9(Text7, { children: [
            "\u{1F3E2} \u5408\u4F5C\u7522\u696D: ",
            (kol.industryDistribution ?? []).join(" ") || (kol.industry ?? "-")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 391,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV9(Text7, { children: [
            "\u{1F441}\uFE0F \u5E73\u5747\u89F8\u53CA: ",
            formatNumber(stats.averageReach)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 392,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV9(Text7, { children: [
            "\u{1F497} \u5E73\u5747\u4E92\u52D5\u7387: ",
            (stats.engagementRate ?? kol.engagementRate ?? 0).toFixed(1),
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 393,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV9(Text7, { children: [
            "\u{1F4E2} \u66DD\u5149\u7387: ",
            (kol.exposureRate || 0).toFixed(1),
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId._index.tsx",
            lineNumber: 394,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId._index.tsx",
          lineNumber: 388,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 386,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId._index.tsx",
        lineNumber: 385,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId._index.tsx",
      lineNumber: 149,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.$kolId._index.tsx",
    lineNumber: 142,
    columnNumber: 5
  }, this);
}

// app/routes/_app.kols.$kolId.edit.tsx
var app_kols_kolId_edit_exports = {};
__export(app_kols_kolId_edit_exports, {
  action: () => action5,
  default: () => KolEditPage,
  loader: () => loader7
});
import {
  Alert as Alert3,
  Avatar as Avatar5,
  Box as Box6,
  Button as Button8,
  Card as Card7,
  Divider as Divider5,
  Group as Group7,
  Radio,
  SimpleGrid as SimpleGrid6,
  Stack as Stack8,
  Text as Text8,
  TextInput as TextInput6,
  Textarea as Textarea5,
  Title as Title8
} from "@mantine/core";
import { json as json7, redirect as redirect4 } from "@remix-run/node";
import { Form as Form4, Link as Link7, useActionData as useActionData3, useLoaderData as useLoaderData7, useNavigation as useNavigation4 } from "@remix-run/react";
import { useState as useState7 } from "react";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
async function loader7({ params }) {
  let kolId = params.kolId;
  if (!kolId)
    return json7({ error: "Missing KOL id" }, { status: 400 });
  let kol = await getKol(kolId);
  if (!kol)
    throw new Response("KOL not found", { status: 404 });
  return json7({ kol });
}
async function action5({ request, params }) {
  let kolId = params.kolId;
  if (!kolId)
    return json7({ error: "Missing KOL id" }, { status: 400 });
  let formData = await request.formData(), displayName = String(formData.get("displayName") ?? "").trim(), instagramHandle = String(formData.get("instagramHandle") ?? "").trim(), industry = String(formData.get("industry") ?? "").trim(), tagsRaw = String(formData.get("tagsInput") ?? ""), history = (await getKol(kolId))?.collaborationHistory ?? [], rating = history.length > 0 ? history.reduce((s, r) => s + r.rating, 0) / history.length : 0, collaborations = history.length, avatarUrl = String(formData.get("avatarUrl") ?? "").trim(), phone = String(formData.get("contactPhone") ?? "").trim(), email = String(formData.get("email") ?? "").trim(), notes = String(formData.get("notes") ?? "").trim(), paymentMethod = formData.get("paymentMethod"), engagementRate = Number(formData.get("engagementRate") ?? 0), exposureRate = Number(formData.get("exposureRate") ?? 0), audienceMale = Number(formData.get("audienceMale") ?? 0), audienceFemale = Number(formData.get("audienceFemale") ?? 100 - audienceMale), audienceAge = String(formData.get("audienceAge") ?? "").trim(), introduction = String(formData.get("introduction") ?? "").trim(), socialsRaw = String(formData.get("socialsJson") ?? "[]");
  if (!displayName)
    return json7({ error: "KOL \u540D\u7A31\u70BA\u5FC5\u586B" }, { status: 400 });
  let tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [], socials = [];
  try {
    socials = JSON.parse(socialsRaw);
  } catch {
    socials = [];
  }
  let socialMap = socials.reduce((acc, item) => {
    let key = String(item.platform || "").toLowerCase();
    return key && (acc[key] = Number(item.followers ?? 0)), acc;
  }, {});
  return await updateKol(kolId, {
    displayName,
    instagramHandle: instagramHandle || void 0,
    industry: industry || void 0,
    tags,
    categories: tags.length > 0 ? tags : void 0,
    followers: socials[0]?.followers ?? 0,
    rating: Number.isFinite(rating) ? rating : 0,
    collaborations: Number.isFinite(collaborations) ? collaborations : 0,
    avatarUrl: avatarUrl || void 0,
    contact: { phone, email },
    notes: notes || void 0,
    paymentMethod: paymentMethod || void 0,
    engagementRate: Number.isFinite(engagementRate) ? engagementRate : void 0,
    exposureRate: Number.isFinite(exposureRate) ? exposureRate : void 0,
    audienceGender: { male: audienceMale, female: audienceFemale },
    audienceAge: audienceAge || void 0,
    introduction: introduction || void 0,
    social: {
      instagram: socialMap.instagram ?? 0,
      youtube: socialMap.youtube ?? 0,
      tiktok: socialMap.tiktok ?? 0,
      facebook: socialMap.facebook ?? 0
    }
  }), redirect4(`/kols/${kolId}`);
}
function KolEditPage() {
  let kol = useLoaderData7().kol, actionData = useActionData3(), submitting = useNavigation4().state === "submitting", initialSocials = [
    { id: "s-ig", platform: "Instagram", url: `https://instagram.com/${kol.instagramHandle || ""}`, followers: kol.social?.instagram ?? kol.followers ?? 0 },
    { id: "s-yt", platform: "YouTube", url: "", followers: kol.social?.youtube ?? 0 },
    { id: "s-tt", platform: "TikTok", url: "", followers: kol.social?.tiktok ?? 0 }
  ].filter((s) => s.followers > 0 || s.platform === "Instagram" && kol.instagramHandle);
  initialSocials.length === 0 && initialSocials.push({ id: "s0", platform: "Instagram", url: "", followers: 0 });
  let [socials, setSocials] = useState7(initialSocials), addSocial = () => {
    setSocials([...socials, { id: "s" + Date.now(), platform: "Instagram", url: "", followers: 0 }]);
  }, removeSocial = (id) => {
    socials.length <= 1 || setSocials(socials.filter((s) => s.id !== id));
  }, updateSocial = (id, key, value) => {
    setSocials(socials.map((s) => s.id === id ? { ...s, [key]: value } : s));
  };
  return /* @__PURE__ */ jsxDEV10(Stack8, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV10(Group7, { gap: 8, children: [
      /* @__PURE__ */ jsxDEV10(Link7, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 139,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10(Text8, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10(Link7, { to: `/kols/${kol.id}`, children: kol.displayName }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10(Text8, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 142,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10(Text8, { fw: 600, children: "\u7DE8\u8F2F KOL" }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 138,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10(Card7, { withBorder: !0, p: "lg", maw: 840, mx: "auto", w: "100%", children: /* @__PURE__ */ jsxDEV10(Form4, { method: "post", children: /* @__PURE__ */ jsxDEV10(Stack8, { gap: "xl", children: [
      /* @__PURE__ */ jsxDEV10(Box6, { children: [
        /* @__PURE__ */ jsxDEV10(Title8, { order: 3, mb: "md", children: "\u57FA\u672C\u8CC7\u6599" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 150,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(Group7, { align: "flex-start", gap: "xl", wrap: "wrap", children: [
          /* @__PURE__ */ jsxDEV10(Stack8, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ jsxDEV10(Avatar5, { src: kol.avatarUrl, radius: 999, size: 96 }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 153,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV10(Text8, { size: "xs", c: "dimmed", children: "\u982D\u50CF\u9810\u89BD" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 154,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 152,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV10(Stack8, { gap: "md", style: { flex: 1, minWidth: 260 }, children: [
            /* @__PURE__ */ jsxDEV10(
              TextInput6,
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
                lineNumber: 157,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV10(
              TextInput6,
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
                lineNumber: 163,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV10(
              TextInput6,
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
                lineNumber: 169,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV10(
              TextInput6,
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
                lineNumber: 175,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV10(Box6, { children: [
              /* @__PURE__ */ jsxDEV10(Text8, { size: "sm", fw: 500, mb: 6, children: "\u8ACB\u6B3E\u65B9\u5F0F" }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 182,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV10(Radio.Group, { name: "paymentMethod", defaultValue: kol.paymentMethod, children: /* @__PURE__ */ jsxDEV10(Group7, { mt: "xs", children: [
                /* @__PURE__ */ jsxDEV10(Radio, { value: "\u52DE\u5831", label: "\u52DE\u5831" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                  lineNumber: 185,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV10(Radio, { value: "\u767C\u7968", label: "\u767C\u7968" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                  lineNumber: 186,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 184,
                columnNumber: 23
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 183,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 181,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 156,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 151,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 149,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10(Divider5, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 194,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10(Box6, { children: [
        /* @__PURE__ */ jsxDEV10(Title8, { order: 3, mb: "md", children: "\u793E\u7FA4\u5E73\u53F0" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 197,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(Stack8, { gap: "sm", children: [
          socials.map((item, idx) => /* @__PURE__ */ jsxDEV10(Group7, { align: "flex-end", children: [
            /* @__PURE__ */ jsxDEV10(
              TextInput6,
              {
                label: "\u5E73\u53F0",
                value: item.platform,
                onChange: (e) => updateSocial(item.id, "platform", e.target.value),
                style: { flex: 1 }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 201,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV10(
              TextInput6,
              {
                label: "URL / \u5E33\u865F",
                value: item.url,
                onChange: (e) => updateSocial(item.id, "url", e.target.value),
                style: { flex: 2 }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 207,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV10(
              TextInput6,
              {
                label: "\u7C89\u7D72\u6578",
                type: "number",
                value: item.followers || 0,
                onChange: (e) => updateSocial(item.id, "followers", Number(e.target.value)),
                style: { flex: 1 }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 213,
                columnNumber: 21
              },
              this
            ),
            idx !== 0 && /* @__PURE__ */ jsxDEV10(Button8, { color: "red", variant: "light", onClick: () => removeSocial(item.id), children: "\xD7" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 221,
              columnNumber: 23
            }, this)
          ] }, item.id, !0, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 200,
            columnNumber: 19
          }, this)),
          /* @__PURE__ */ jsxDEV10(Button8, { variant: "default", onClick: addSocial, size: "xs", style: { width: "fit-content" }, children: "+ \u65B0\u589E\u793E\u7FA4\u5E73\u53F0" }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV10("input", { type: "hidden", name: "socialsJson", value: JSON.stringify(socials) }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 196,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10(Divider5, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 232,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10(Box6, { children: [
        /* @__PURE__ */ jsxDEV10(Title8, { order: 3, mb: "md", children: "\u6210\u6548\u6307\u6A19" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 235,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(SimpleGrid6, { cols: { base: 1, sm: 3 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV10(
            TextInput6,
            {
              label: "\u4E92\u52D5\u7387 (%)",
              name: "engagementRate",
              type: "number",
              step: "0.01",
              defaultValue: kol.engagementRate ?? 0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 237,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV10(
            TextInput6,
            {
              label: "\u66DD\u5149\u7387 (%)",
              name: "exposureRate",
              type: "number",
              step: "0.01",
              defaultValue: kol.exposureRate ?? 0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 244,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV10(
            TextInput6,
            {
              label: "\u53D7\u773E\u6027\u5225\u6BD4 (\u7537 %)",
              name: "audienceMale",
              type: "number",
              defaultValue: kol.audienceGender?.male ?? 0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 251,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV10(
            TextInput6,
            {
              label: "\u53D7\u773E\u6027\u5225\u6BD4 (\u5973 %)",
              name: "audienceFemale",
              type: "number",
              defaultValue: kol.audienceGender?.female ?? 0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 257,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV10(
            TextInput6,
            {
              label: "\u53D7\u773E\u5167\u5BB9\u5E74\u9F61\u5C64",
              name: "audienceAge",
              defaultValue: kol.audienceAge ?? "",
              placeholder: "\u4F8B\u5982\uFF1A18-24"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 263,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV10(Box6, { children: [
            /* @__PURE__ */ jsxDEV10(Text8, { size: "sm", fw: 500, children: "\u8A55\u5206 (\u81EA\u52D5\u8A08\u7B97)" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 270,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV10(Text8, { mt: 4, children: kol.rating?.toFixed(1) ?? "0.0" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 271,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 269,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV10(Box6, { children: [
            /* @__PURE__ */ jsxDEV10(Text8, { size: "sm", fw: 500, children: "\u5408\u4F5C\u6B21\u6578 (\u81EA\u52D5\u8A08\u7B97)" }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 274,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV10(Text8, { mt: 4, children: kol.collaborations ?? 0 }, void 0, !1, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 275,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 236,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 234,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10(Divider5, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 280,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10(Box6, { children: [
        /* @__PURE__ */ jsxDEV10(Title8, { order: 3, mb: "md", children: "\u806F\u7D61\u8207\u5099\u8A3B" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 283,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(SimpleGrid6, { cols: { base: 1, sm: 2 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV10(
            TextInput6,
            {
              label: "\u806F\u7D61\u96FB\u8A71",
              name: "contactPhone",
              defaultValue: kol.contact?.phone ?? ""
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 285,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV10(
            TextInput6,
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
              lineNumber: 290,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 284,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(
          TextInput6,
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
            lineNumber: 297,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV10(
          Textarea5,
          {
            mt: "md",
            label: "\u4EBA\u9078\u4ECB\u7D39",
            name: "introduction",
            minRows: 5,
            defaultValue: kol.introduction ?? ""
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 304,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV10(
          Textarea5,
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
            lineNumber: 311,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 282,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV10(Alert3, { color: "red", title: "\u5132\u5B58\u5931\u6557", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 321,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV10(Group7, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ jsxDEV10(Button8, { component: Link7, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 327,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(Group7, { children: [
          /* @__PURE__ */ jsxDEV10(Button8, { component: Link7, to: `/kols/${kol.id}`, variant: "light", children: "\u56DE\u8A73\u7D30\u9801" }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 331,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV10(Button8, { type: "submit", loading: submitting, children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, !1, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 334,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 330,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 326,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 148,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 147,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.$kolId.edit.tsx",
    lineNumber: 137,
    columnNumber: 5
  }, this);
}

// app/routes/_app.proposals._index.tsx
var app_proposals_index_exports = {};
__export(app_proposals_index_exports, {
  action: () => action6,
  default: () => ProposalListPage,
  loader: () => loader8
});
import { Button as Button9, Card as Card8, Group as Group8, Stack as Stack9, Table as Table2, Title as Title9, ActionIcon as ActionIcon2, Modal as Modal4, TextInput as TextInput7, NumberInput as NumberInput3, Select as Select5 } from "@mantine/core";
import { useDisclosure as useDisclosure3 } from "@mantine/hooks";
import { json as json8 } from "@remix-run/node";
import { Link as Link8, useLoaderData as useLoaderData8, Form as Form5 } from "@remix-run/react";
import { useState as useState8 } from "react";
import { IconEye, IconPencil as IconPencil2, IconTrash as IconTrash3 } from "@tabler/icons-react";
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
async function action6({ request }) {
  let formData = await request.formData(), intent = formData.get("intent");
  if (intent === "delete_proposal") {
    let id = String(formData.get("id"));
    return await deleteProposal(id), json8({ success: !0 });
  }
  if (intent === "edit_proposal") {
    let id = String(formData.get("id")), title = String(formData.get("title")), clientName = String(formData.get("clientName")), budget = Number(formData.get("budget")), dueDate = String(formData.get("dueDate")), stage = String(formData.get("stage"));
    return await updateProposal(id, { title, clientName, budget, dueDate, stage }), json8({ success: !0 });
  }
  return json8({ success: !1 });
}
async function loader8(_) {
  let proposals = await listProposals();
  return json8({ proposals });
}
function ProposalListPage() {
  let { proposals } = useLoaderData8(), [editingProposal, setEditingProposal] = useState8(null), [opened, { open, close }] = useDisclosure3(!1), handleEdit = (p) => {
    setEditingProposal(p), open();
  };
  return /* @__PURE__ */ jsxDEV11(Stack9, { children: [
    /* @__PURE__ */ jsxDEV11(Group8, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV11(Title9, { order: 2, children: "\u63D0\u6848\u4E00\u89BD\u9801" }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11(Button9, { component: Link8, to: "/proposals/new", children: "\u65B0\u589E\u63D0\u6848" }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(Card8, { withBorder: !0, children: /* @__PURE__ */ jsxDEV11(Table2, { striped: !0, children: [
      /* @__PURE__ */ jsxDEV11(Table2.Thead, { children: /* @__PURE__ */ jsxDEV11(Table2.Tr, { children: [
        /* @__PURE__ */ jsxDEV11(Table2.Th, { children: "\u6A19\u984C" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 62,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Th, { children: "\u5BA2\u6236" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 63,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Th, { children: "\u968E\u6BB5" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 64,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Th, { children: "\u9810\u7B97" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 65,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Th, { children: "\u622A\u6B62\u65E5" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 66,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Th, { style: { textAlign: "right" }, children: "\u64CD\u4F5C" }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 67,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 61,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 60,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV11(Table2.Tbody, { children: proposals.map((p) => /* @__PURE__ */ jsxDEV11(Table2.Tr, { children: [
        /* @__PURE__ */ jsxDEV11(Table2.Td, { children: /* @__PURE__ */ jsxDEV11(Link8, { to: `/proposals/${p.id}`, children: p.title }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 74,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Td, { children: p.clientName }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 76,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Td, { children: p.stage }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 77,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Td, { children: [
          "$",
          p.budget.toLocaleString()
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 78,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Td, { children: p.dueDate }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 79,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11(Table2.Td, { children: /* @__PURE__ */ jsxDEV11(Group8, { gap: "xs", justify: "flex-end", children: [
          /* @__PURE__ */ jsxDEV11(
            ActionIcon2,
            {
              variant: "light",
              color: "blue",
              component: Link8,
              to: `/proposals/${p.id}`,
              title: "\u67E5\u770B\u8A73\u7D30",
              children: /* @__PURE__ */ jsxDEV11(IconEye, { size: 16 }, void 0, !1, {
                fileName: "app/routes/_app.proposals._index.tsx",
                lineNumber: 89,
                columnNumber: 23
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.proposals._index.tsx",
              lineNumber: 82,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV11(
            ActionIcon2,
            {
              variant: "light",
              color: "orange",
              onClick: () => handleEdit(p),
              title: "\u7DE8\u8F2F",
              children: /* @__PURE__ */ jsxDEV11(IconPencil2, { size: 16 }, void 0, !1, {
                fileName: "app/routes/_app.proposals._index.tsx",
                lineNumber: 97,
                columnNumber: 23
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.proposals._index.tsx",
              lineNumber: 91,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV11(
            Form5,
            {
              method: "post",
              onSubmit: (e) => {
                confirm("\u78BA\u5B9A\u8981\u522A\u9664\u6B64\u63D0\u6848\u55CE\uFF1F") || e.preventDefault();
              },
              style: { display: "inline" },
              children: [
                /* @__PURE__ */ jsxDEV11("input", { type: "hidden", name: "intent", value: "delete_proposal" }, void 0, !1, {
                  fileName: "app/routes/_app.proposals._index.tsx",
                  lineNumber: 108,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV11("input", { type: "hidden", name: "id", value: p.id }, void 0, !1, {
                  fileName: "app/routes/_app.proposals._index.tsx",
                  lineNumber: 109,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV11(ActionIcon2, { variant: "light", color: "red", type: "submit", title: "\u522A\u9664", children: /* @__PURE__ */ jsxDEV11(IconTrash3, { size: 16 }, void 0, !1, {
                  fileName: "app/routes/_app.proposals._index.tsx",
                  lineNumber: 111,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.proposals._index.tsx",
                  lineNumber: 110,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.proposals._index.tsx",
              lineNumber: 99,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 81,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 80,
          columnNumber: 17
        }, this)
      ] }, p.id, !0, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 72,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 59,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(Modal4, { opened, onClose: close, title: "\u7DE8\u8F2F\u63D0\u6848\u57FA\u672C\u8CC7\u6599", children: editingProposal && /* @__PURE__ */ jsxDEV11(Form5, { method: "post", onSubmit: close, children: [
      /* @__PURE__ */ jsxDEV11("input", { type: "hidden", name: "intent", value: "edit_proposal" }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 125,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV11("input", { type: "hidden", name: "id", value: editingProposal.id }, void 0, !1, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 126,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV11(Stack9, { children: [
        /* @__PURE__ */ jsxDEV11(
          TextInput7,
          {
            name: "title",
            label: "\u63D0\u6848\u6A19\u984C",
            defaultValue: editingProposal.title,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 128,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV11(
          TextInput7,
          {
            name: "clientName",
            label: "\u5BA2\u6236\u540D\u7A31",
            defaultValue: editingProposal.clientName,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 134,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV11(
          NumberInput3,
          {
            name: "budget",
            label: "\u9810\u7B97",
            defaultValue: editingProposal.budget,
            thousandSeparator: ","
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 140,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV11(
          TextInput7,
          {
            name: "dueDate",
            label: "\u622A\u6B62\u65E5",
            defaultValue: editingProposal.dueDate,
            placeholder: "2026-03-20"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 146,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV11(
          Select5,
          {
            name: "stage",
            label: "\u63D0\u6848\u968E\u6BB5",
            defaultValue: editingProposal.stage,
            data: [
              { value: "draft", label: "\u8349\u7A3F (DRAFT)" },
              { value: "internal_review", label: "\u5167\u90E8\u5BE9\u6838 (INTERNAL REVIEW)" },
              { value: "sent_to_client", label: "\u5DF2\u9001\u51FA\u7D66\u5BA2\u6236 (SENT TO CLIENT)" }
            ],
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 152,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV11(Group8, { justify: "flex-end", mt: "md", children: [
          /* @__PURE__ */ jsxDEV11(Button9, { variant: "default", onClick: close, children: "\u53D6\u6D88" }, void 0, !1, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 164,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV11(Button9, { type: "submit", children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, !1, {
            fileName: "app/routes/_app.proposals._index.tsx",
            lineNumber: 167,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.proposals._index.tsx",
          lineNumber: 163,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.proposals._index.tsx",
        lineNumber: 127,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.proposals._index.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.proposals._index.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}

// app/routes/_app.reports.generate.tsx
var app_reports_generate_exports = {};
__export(app_reports_generate_exports, {
  default: () => ReportManagementPage,
  loader: () => loader9
});
import {
  Badge as Badge5,
  Box as Box7,
  Button as Button10,
  Card as Card9,
  Group as Group9,
  Stack as Stack10,
  Text as Text10,
  TextInput as TextInput8,
  Title as Title10,
  Modal as Modal5,
  Checkbox as Checkbox2,
  Progress as Progress2,
  Avatar as Avatar6,
  Divider as Divider6,
  ThemeIcon,
  ActionIcon as ActionIcon3,
  Tooltip,
  SimpleGrid as SimpleGrid7,
  Textarea as Textarea6,
  FileButton
} from "@mantine/core";
import { useDisclosure as useDisclosure4 } from "@mantine/hooks";
import { json as json9 } from "@remix-run/node";
import { Link as Link9, useLoaderData as useLoaderData9 } from "@remix-run/react";

// app/store/notification.ts
import { create } from "zustand";
var useNotificationStore = create((set) => ({
  toast: null,
  banner: null,
  showToast: (title, message, actionLink) => {
    set({ toast: { isOpen: !0, title, message, actionLink } });
  },
  hideToast: () => set({ toast: null }),
  showBanner: (title, message, actionLink) => set({ banner: { isOpen: !0, title, message, actionLink } }),
  hideBanner: () => set({ banner: null })
}));

// app/routes/_app.reports.generate.tsx
import { useState as useState9 } from "react";
import {
  IconFileTypePpt,
  IconTrash as IconTrash4,
  IconDownload,
  IconBulb as IconBulb2,
  IconRobot,
  IconCheck as IconCheck3,
  IconX as IconX3,
  IconTemplate,
  IconFile,
  IconClockHour4,
  IconFileDescription,
  IconPencil as IconPencil3,
  IconUpload,
  IconCloudUpload
} from "@tabler/icons-react";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
function formatShortDate(date) {
  return date.slice(0, 7);
}
async function loader9({ request }) {
  let url = new URL(request.url), clientFilter = url.searchParams.get("client") ?? "", timeFilter = url.searchParams.get("time") ?? "all", statusFilter = url.searchParams.get("status") ?? "all", page = Math.max(1, Number(url.searchParams.get("page") ?? "1")), pageSize = Number(url.searchParams.get("pageSize") ?? "10"), orders = await listInsertionOrders(), allClients = Array.from(new Set(orders.map((o) => o.clientName))), filtered = orders.map((order, idx) => ({
    ...order,
    hasDraft: idx === 0 || idx === 1,
    hasOfficial: idx === 0
  })).filter((order) => !(clientFilter && order.clientName !== clientFilter || timeFilter === "this_year" && !order.startDate.startsWith("2026") || timeFilter === "2024_10" && !order.startDate.startsWith("2024-10") || statusFilter === "draft" && !order.hasDraft || statusFilter === "official" && !order.hasOfficial || statusFilter === "none" && (order.hasDraft || order.hasOfficial))), totalPages = Math.max(1, Math.ceil(filtered.length / pageSize)), currentPage = Math.min(page, totalPages), paginatedOrders = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return json9({
    orders: paginatedOrders,
    allClients,
    clientFilter,
    timeFilter,
    statusFilter,
    totalPages,
    currentPage,
    pageSize,
    totalCount: filtered.length
  });
}
function ReportManagementPage() {
  let { orders, allClients, clientFilter, timeFilter, statusFilter, totalPages, currentPage, pageSize, totalCount } = useLoaderData9(), [selectedTemplate, setSelectedTemplate] = useState9("standard"), { showToast, showBanner } = useNotificationStore(), [uploadFile, setUploadFile] = useState9(null), [uploadProgress, setUploadProgress] = useState9(null), [uploadSuccess, setUploadSuccess] = useState9(!1), [isOfficial, setIsOfficial] = useState9(!0), [genModalOpen, { open: openGenModal, close: closeGenModal }] = useDisclosure4(!1), [progressModalOpen, { open: openProgressModal, close: closeProgressModal }] = useDisclosure4(!1), [uploadModalOpen, { open: openUploadModal, close: closeUploadModal }] = useDisclosure4(!1), [selectOrderModalOpen, { open: openSelectOrderModal, close: closeSelectOrderModal }] = useDisclosure4(!1), [activeOrder, setActiveOrder] = useState9(null), [selectedKolIds, setSelectedKolIds] = useState9([]), [progressPercentage, setProgressPercentage] = useState9(0), [currentStepIndex, setCurrentStepIndex] = useState9(0), handleDownload = () => alert("\u5831\u544A\u4E0B\u8F09\u4E2D..."), handleDelete = () => {
    confirm("\u78BA\u5B9A\u8981\u522A\u9664\u6B64\u7248\u672C\u7684\u5831\u544A\u55CE\uFF1F") && alert("\u5831\u544A\u5DF2\u522A\u9664 (\u6A21\u64EC)");
  }, handleOpenUploadModal = (order) => {
    setActiveOrder(order), setUploadFile(null), setUploadProgress(null), setUploadSuccess(!1), setIsOfficial(!0), openUploadModal();
  }, startOfficialUpload = () => {
    setUploadProgress(0);
    let p = 0, interval = setInterval(() => {
      p += 20, p >= 100 ? (clearInterval(interval), setUploadProgress(100), setTimeout(() => {
        setUploadSuccess(!0), setTimeout(() => {
          closeUploadModal();
        }, 2e3);
      }, 500)) : setUploadProgress(p);
    }, 400);
  }, handleOpenGenModal = (order) => {
    setActiveOrder(order);
    let readyIds = (order.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).map((k) => k.id);
    setSelectedKolIds(readyIds), openGenModal();
  }, toggleKolSelection = (kolId) => {
    setSelectedKolIds(
      (prev) => prev.includes(kolId) ? prev.filter((id) => id !== kolId) : [...prev, kolId]
    );
  }, startGeneration = () => {
    closeGenModal(), setProgressPercentage(0), setCurrentStepIndex(0), openProgressModal(), [15, 30, 60, 80, 100].forEach((p, idx) => {
      setTimeout(() => {
        setProgressPercentage(p), setCurrentStepIndex(idx), p === 100 && setTimeout(() => {
          closeProgressModal();
          let title = "\u7D50\u6848\u5831\u544A\u5DF2\u751F\u6210\u5B8C\u6210\uFF01", message = `${activeOrder?.orderNo} ${activeOrder?.title || activeOrder?.projectName}|\u7D50\u6848\u5831\u544A_v1.pptx`;
          showToast(title, message, "/reports/generate"), showBanner(title, message, "/reports/generate"), "Notification" in window && (Notification.permission === "granted" ? new Notification("\u{1F389} \u7D50\u6848\u5831\u544A\u5DF2\u5B8C\u6210", {
            body: `\u6848\u4EF6 #${activeOrder?.orderNo} \u7684\u7D50\u6848\u5831\u544A\u5DF2\u751F\u6210\u5B8C\u6210\uFF0C\u9EDE\u64CA\u67E5\u770B`
          }) : Notification.permission !== "denied" && Notification.requestPermission().then((permission) => {
            permission === "granted" && new Notification("\u{1F389} \u7D50\u6848\u5831\u544A\u5DF2\u5B8C\u6210", {
              body: `\u6848\u4EF6 #${activeOrder?.orderNo} \u7684\u7D50\u6848\u5831\u544A\u5DF2\u751F\u6210\u5B8C\u6210\uFF0C\u9EDE\u64CA\u67E5\u770B`
            });
          }));
        }, 800);
      }, (idx + 1) * 1200);
    });
  };
  return /* @__PURE__ */ jsxDEV12(Box7, { children: [
    /* @__PURE__ */ jsxDEV12(Stack10, { gap: "xl", children: [
      /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ jsxDEV12(Title10, { order: 2, children: "\u7D50\u6848\u5831\u544A\u7BA1\u7406" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV12(Button10, { color: "blue", onClick: openSelectOrderModal, children: "+ \u751F\u6210\u65B0\u5831\u544A" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 216,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12("form", { method: "get", children: /* @__PURE__ */ jsxDEV12(Group9, { align: "end", wrap: "wrap", gap: "md", children: [
        /* @__PURE__ */ jsxDEV12(Stack10, { gap: 4, children: [
          /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 500, children: "\u5BA2\u6236" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 225,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV12("select", { name: "client", defaultValue: clientFilter, style: { padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }, children: [
            /* @__PURE__ */ jsxDEV12("option", { value: "", children: "\u5168\u90E8" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 227,
              columnNumber: 17
            }, this),
            allClients.map((c) => /* @__PURE__ */ jsxDEV12("option", { value: c, children: c }, c, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 228,
              columnNumber: 40
            }, this))
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 226,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 224,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV12(Stack10, { gap: 4, children: [
          /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 500, children: "\u6642\u9593\u7BC4\u570D" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 232,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV12("select", { name: "time", defaultValue: timeFilter, style: { padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }, children: [
            /* @__PURE__ */ jsxDEV12("option", { value: "all", children: "\u5168\u90E8" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 234,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12("option", { value: "this_year", children: "2026 \u5E74" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 235,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12("option", { value: "2024_10", children: "2024-10" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 236,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 233,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 231,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV12(Stack10, { gap: 4, children: [
          /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 500, children: "\u72C0\u614B" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 240,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV12("select", { name: "status", defaultValue: statusFilter, style: { padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }, children: [
            /* @__PURE__ */ jsxDEV12("option", { value: "all", children: "\u5168\u90E8" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 242,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12("option", { value: "draft", children: "\u6709\u8349\u7A3F" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 243,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12("option", { value: "official", children: "\u6709\u6B63\u5F0F\u7248" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 244,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12("option", { value: "none", children: "\u7121\u5831\u544A" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 245,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 241,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 239,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV12(Button10, { type: "submit", variant: "light", children: "\u5957\u7528\u7BE9\u9078" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 248,
          columnNumber: 13
        }, this),
        (clientFilter || timeFilter !== "all") && /* @__PURE__ */ jsxDEV12(Button10, { variant: "subtle", color: "gray", component: "a", href: "/reports/generate", children: "\u6E05\u9664" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 250,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 223,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 222,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(Stack10, { gap: "lg", children: orders.map((order) => {
        let hasDraft = order.hasDraft, hasOfficial = order.hasOfficial, kols = order.collaborations ?? [], readyKols = kols.filter(
          (k) => (k.performanceItems ?? []).some((p) => (p.metrics?.impressions ?? 0) > 0)
        ), missingCount = kols.length - readyKols.length;
        return /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, shadow: "sm", radius: "md", p: 0, children: [
          /* @__PURE__ */ jsxDEV12(Box7, { p: "md", style: { borderBottom: "1px solid #eee" }, children: /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", align: "flex-start", children: [
            /* @__PURE__ */ jsxDEV12(Box7, { children: [
              /* @__PURE__ */ jsxDEV12(Text10, { fw: 700, size: "lg", children: [
                "\u{1F4CB} #",
                order.orderNo,
                " ",
                order.title ?? order.projectName ?? "\u672A\u547D\u540D\u6848\u4EF6"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 273,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV12(Text10, { c: "dimmed", size: "sm", mt: 4, children: [
                "\u5BA2\u6236: ",
                order.clientName,
                " | \u65E5\u671F: ",
                formatShortDate(order.startDate),
                " | \u5408\u4F5C KOL: ",
                order.kolCount ?? kols.length,
                " \u4F4D"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 274,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 272,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV12(Group9, { children: [
              /* @__PURE__ */ jsxDEV12(Button10, { variant: "subtle", size: "sm", component: Link9, to: `/insertion-orders/${order.id}`, children: "\u67E5\u770B\u6848\u4EF6\u8A73\u60C5" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 279,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV12(Button10, { size: "sm", variant: "outline", onClick: () => handleOpenGenModal(order), children: "+ \u751F\u6210\u65B0\u5831\u544A" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 282,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 278,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 271,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 270,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { p: "md", bg: "#fdfdfd", children: !hasDraft && !hasOfficial ? (
            // Empty State
            /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", py: "xl", gap: "sm", children: [
              /* @__PURE__ */ jsxDEV12(Text10, { c: "dimmed", fw: 500, children: "\u5C1A\u672A\u751F\u6210\u7D50\u6848\u5831\u544A" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 294,
                columnNumber: 23
              }, this),
              missingCount > 0 && /* @__PURE__ */ jsxDEV12(Badge5, { color: "yellow", variant: "light", size: "lg", children: [
                "\u26A0\uFE0F \u63D0\u793A: ",
                missingCount,
                " \u4F4D KOL \u5C1A\u672A\u4E0A\u50B3\u6210\u6548"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 296,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV12(Group9, { gap: "sm", mt: "sm", children: [
                /* @__PURE__ */ jsxDEV12(Button10, { onClick: () => handleOpenGenModal(order), children: "\u958B\u59CB\u751F\u6210\u5831\u544A" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 299,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV12(Button10, { variant: "outline", color: "blue", onClick: () => handleOpenUploadModal(order), children: "+ \u4E0A\u50B3\u6B63\u5F0F\u7248" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 300,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 298,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 293,
              columnNumber: 21
            }, this)
          ) : /* @__PURE__ */ jsxDEV12(SimpleGrid7, { cols: { base: 1, lg: 2 }, spacing: "md", children: [
            hasDraft && /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, bg: "gray.0", radius: "sm", p: "sm", children: [
              /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 600, mb: "sm", c: "dimmed", children: "\u7CFB\u7D71\u751F\u6210\uFF08\u8349\u7A3F\uFF09" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 308,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", wrap: "nowrap", style: { border: "1px solid #eaeaea", background: "white", padding: 12, borderRadius: 8 }, children: [
                /* @__PURE__ */ jsxDEV12(Group9, { children: [
                  /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: "lg", variant: "light", color: "gray", children: /* @__PURE__ */ jsxDEV12(IconFileTypePpt, { size: 20 }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 311,
                    columnNumber: 81
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 311,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDEV12(Box7, { children: [
                    /* @__PURE__ */ jsxDEV12(Group9, { gap: "xs", children: [
                      /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, children: "\u7D50\u6848\u5831\u544A_v1.pptx" }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 314,
                        columnNumber: 35
                      }, this),
                      /* @__PURE__ */ jsxDEV12(Badge5, { color: "gray", variant: "filled", size: "xs", children: "\u8349\u7A3F" }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 315,
                        columnNumber: 35
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 313,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: "\u751F\u6210\u6642\u9593: 2024-10-20 14:30 | \u751F\u6210\u8005: \u7CFB\u7D71 AI" }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 317,
                      columnNumber: 33
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 312,
                    columnNumber: 31
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 310,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDEV12(Group9, { gap: "xs", children: [
                  /* @__PURE__ */ jsxDEV12(ActionIcon3, { variant: "light", color: "blue", onClick: handleDownload, children: /* @__PURE__ */ jsxDEV12(IconDownload, { size: 18 }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 321,
                    columnNumber: 97
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 321,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDEV12(ActionIcon3, { variant: "light", color: "indigo", onClick: () => handleOpenGenModal(order), children: /* @__PURE__ */ jsxDEV12(IconPencil3, { size: 18 }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 322,
                    columnNumber: 116
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 322,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDEV12(ActionIcon3, { variant: "light", color: "red", onClick: handleDelete, children: /* @__PURE__ */ jsxDEV12(IconTrash4, { size: 18 }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 323,
                    columnNumber: 94
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 323,
                    columnNumber: 31
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 320,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 309,
                columnNumber: 27
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 307,
              columnNumber: 25
            }, this),
            hasOfficial && /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, bg: "green.0", radius: "sm", p: "sm", children: [
              /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 600, mb: "sm", c: "green.8", children: "\u6B63\u5F0F\u7248\u672C" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 332,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", wrap: "nowrap", style: { border: "1px solid #b2f2bb", background: "white", padding: 12, borderRadius: 8 }, children: [
                /* @__PURE__ */ jsxDEV12(Group9, { children: [
                  /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: "lg", variant: "light", color: "green", children: /* @__PURE__ */ jsxDEV12(IconFileTypePpt, { size: 20 }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 335,
                    columnNumber: 82
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 335,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDEV12(Box7, { children: [
                    /* @__PURE__ */ jsxDEV12(Group9, { gap: "xs", children: [
                      /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, children: "\u7D50\u6848\u5831\u544A_\u5B8C\u6574\u7248.pptx" }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 338,
                        columnNumber: 35
                      }, this),
                      /* @__PURE__ */ jsxDEV12(Badge5, { color: "green", variant: "filled", size: "xs", children: "\u2B50 \u6B63\u5F0F\u7248" }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 339,
                        columnNumber: 35
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 337,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: "\u4E0A\u50B3\u6642\u9593: 2024-10-22 10:15 | \u4E0A\u50B3\u8005: \u7BA1\u7406\u54E1" }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 341,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", mt: 2, children: "\u8AAA\u660E: \u5DF2\u6839\u64DA\u5BA2\u6236\u56DE\u994B\u4FEE\u6B63\u6578\u64DA\u5448\u73FE\u65B9\u5F0F" }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 342,
                      columnNumber: 33
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 336,
                    columnNumber: 31
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 334,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDEV12(Group9, { gap: "xs", children: [
                  /* @__PURE__ */ jsxDEV12(ActionIcon3, { variant: "light", color: "blue", onClick: handleDownload, children: /* @__PURE__ */ jsxDEV12(IconDownload, { size: 18 }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 346,
                    columnNumber: 97
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 346,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDEV12(ActionIcon3, { variant: "light", color: "red", onClick: handleDelete, children: /* @__PURE__ */ jsxDEV12(IconTrash4, { size: 18 }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 347,
                    columnNumber: 94
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 347,
                    columnNumber: 31
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 345,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 333,
                columnNumber: 27
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 331,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 304,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 290,
            columnNumber: 17
          }, this),
          (hasDraft || hasOfficial) && /* @__PURE__ */ jsxDEV12(Box7, { p: "sm", style: { borderTop: "1px solid #eee", background: "#f8f9fa" }, children: /* @__PURE__ */ jsxDEV12(Group9, { justify: "flex-end", children: /* @__PURE__ */ jsxDEV12(Button10, { variant: "default", size: "sm", onClick: () => handleOpenUploadModal(order), children: hasOfficial ? "\u66F4\u65B0\u6B63\u5F0F\u7248" : "+ \u4E0A\u50B3\u6B63\u5F0F\u7248" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 360,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 359,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 358,
            columnNumber: 19
          }, this)
        ] }, order.id, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 268,
          columnNumber: 15
        }, this);
      }) }, void 0, !1, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 256,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", align: "center", mt: "xl", py: "md", style: { borderTop: "1px solid var(--mantine-color-default-border)" }, children: [
        /* @__PURE__ */ jsxDEV12(Group9, { children: [
          /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "dimmed", children: "\u6BCF\u9801\u7B46\u6578" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 374,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12("form", { method: "get", style: { display: "inline" }, children: [
            /* @__PURE__ */ jsxDEV12("input", { type: "hidden", name: "client", value: clientFilter }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 376,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12("input", { type: "hidden", name: "time", value: timeFilter }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 377,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12("input", { type: "hidden", name: "status", value: statusFilter }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 378,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12("input", { type: "hidden", name: "page", value: "1" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 379,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(
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
                  /* @__PURE__ */ jsxDEV12("option", { value: "5", children: "5" }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 393,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV12("option", { value: "10", children: "10" }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 394,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV12("option", { value: "20", children: "20" }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 395,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 380,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 375,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "dimmed", children: [
            "\u5171 ",
            totalCount,
            " \u7B46"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 398,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 373,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV12(Group9, { gap: 4, children: [
          currentPage > 1 && /* @__PURE__ */ jsxDEV12(
            Link9,
            {
              to: `/reports/generate?client=${encodeURIComponent(clientFilter)}&time=${timeFilter}&status=${statusFilter}&page=${currentPage - 1}&pageSize=${pageSize}`,
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
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 403,
              columnNumber: 15
            },
            this
          ),
          Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxDEV12(
            Link9,
            {
              to: `/reports/generate?client=${encodeURIComponent(clientFilter)}&time=${timeFilter}&status=${statusFilter}&page=${p}&pageSize=${pageSize}`,
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
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 419,
              columnNumber: 15
            },
            this
          )),
          currentPage < totalPages && /* @__PURE__ */ jsxDEV12(
            Link9,
            {
              to: `/reports/generate?client=${encodeURIComponent(clientFilter)}&time=${timeFilter}&status=${statusFilter}&page=${currentPage + 1}&pageSize=${pageSize}`,
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
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 438,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 401,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 372,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 212,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12(
      Modal5,
      {
        opened: selectOrderModalOpen,
        onClose: closeSelectOrderModal,
        title: /* @__PURE__ */ jsxDEV12(Text10, { fw: 700, size: "lg", children: "\u9078\u64C7\u59D4\u520A\u55AE\u751F\u6210\u5831\u544A" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 460,
          columnNumber: 16
        }, this),
        size: "lg",
        centered: !0,
        children: /* @__PURE__ */ jsxDEV12(Stack10, { gap: "md", children: [
          /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "dimmed", children: "\u8ACB\u9078\u64C7\u4E00\u500B\u6848\u4EF6\u4F86\u958B\u59CB\u751F\u6210\u65B0\u7684\u7D50\u6848\u5831\u544A\uFF1A" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 465,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { style: { maxHeight: 400, overflowY: "auto" }, children: /* @__PURE__ */ jsxDEV12(Stack10, { gap: "xs", children: orders.map((order) => /* @__PURE__ */ jsxDEV12(
            Card9,
            {
              withBorder: !0,
              p: "sm",
              radius: "md",
              style: { cursor: "pointer" },
              onClick: () => {
                handleOpenGenModal(order), closeSelectOrderModal();
              },
              className: "hover:bg-blue-50",
              onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-0)",
              onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "transparent",
              children: /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", children: [
                /* @__PURE__ */ jsxDEV12(Box7, { children: [
                  /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, children: [
                    "#",
                    order.orderNo,
                    " ",
                    order.title || order.projectName
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 485,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: [
                    order.clientName,
                    " | ",
                    formatShortDate(order.startDate)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 486,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 484,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV12(Button10, { variant: "light", size: "xs", children: "\u9078\u64C7" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 488,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 483,
                columnNumber: 19
              }, this)
            },
            order.id,
            !1,
            {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 469,
              columnNumber: 17
            },
            this
          )) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 467,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 466,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Group9, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ jsxDEV12(Button10, { variant: "default", onClick: closeSelectOrderModal, children: "\u53D6\u6D88" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 495,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 494,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 464,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 457,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV12(
      Modal5,
      {
        opened: genModalOpen,
        onClose: closeGenModal,
        title: /* @__PURE__ */ jsxDEV12(Text10, { fw: 700, size: "lg", children: "\u751F\u6210\u7D50\u6848\u5831\u544A" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 504,
          columnNumber: 16
        }, this),
        size: "xl",
        children: activeOrder && /* @__PURE__ */ jsxDEV12(Stack10, { gap: "xl", mt: "sm", children: [
          /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, bg: "gray.0", p: "sm", radius: "md", children: /* @__PURE__ */ jsxDEV12(Group9, { gap: "xl", children: [
            /* @__PURE__ */ jsxDEV12(Box7, { children: [
              /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: "\u6848\u4EF6\u7DE8\u865F" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 513,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, children: [
                "#",
                activeOrder.orderNo
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 514,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 512,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12(Box7, { children: [
              /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: "\u6848\u4EF6\u540D\u7A31" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 517,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, children: activeOrder.title || activeOrder.projectName }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 518,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 516,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12(Box7, { children: [
              /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: "\u5BA2\u6236" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 521,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, children: activeOrder.clientName }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 522,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 520,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 511,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 510,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { children: [
            /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, size: "lg", mb: 4, children: "\u6B65\u9A5F 1\uFF1A\u78BA\u8A8D KOL \u6210\u6548\u8CC7\u6599" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 529,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "dimmed", mb: "md", children: "\u7CFB\u7D71\u5C07\u81EA\u52D5\u9078\u64C7\u5DF2\u4E0A\u50B3\u6210\u6548\u7684 KOL" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 530,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(Stack10, { gap: "md", children: [
              /* @__PURE__ */ jsxDEV12(Box7, { children: [
                /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, size: "sm", c: "green.7", mb: "xs", children: "\u2705 \u5DF2\u4E0A\u50B3\u6210\u6548\u7684 KOL (\u9810\u8A2D\u9078\u64C7)" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 535,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV12(Stack10, { gap: "xs", children: [
                  activeOrder.collaborations?.filter((k) => (k.performanceItems || []).length > 0).map((kol, idx) => /* @__PURE__ */ jsxDEV12(
                    Card9,
                    {
                      withBorder: !0,
                      p: "sm",
                      radius: "md",
                      style: { transition: "all 0.2s", cursor: "pointer" },
                      className: "hover:shadow-sm",
                      onClick: () => toggleKolSelection(kol.id),
                      children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", children: [
                        /* @__PURE__ */ jsxDEV12(
                          Checkbox2,
                          {
                            checked: selectedKolIds.includes(kol.id),
                            onChange: () => toggleKolSelection(kol.id),
                            onClick: (e) => e.stopPropagation()
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/_app.reports.generate.tsx",
                            lineNumber: 548,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV12(Avatar6, { src: kol.kol?.avatarUrl, radius: "xl", size: "md" }, void 0, !1, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 553,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV12(Box7, { style: { flexGrow: 1 }, children: [
                          /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, children: kol.kol?.name || "KOL Name" }, void 0, !1, {
                            fileName: "app/routes/_app.reports.generate.tsx",
                            lineNumber: 555,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV12(Group9, { gap: "xs", mt: 4, children: /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: [
                            "IG\u8CBC\u6587 ",
                            /* @__PURE__ */ jsxDEV12(IconCheck3, { size: 12, style: { display: "inline", color: "green" } }, void 0, !1, {
                              fileName: "app/routes/_app.reports.generate.tsx",
                              lineNumber: 557,
                              columnNumber: 63
                            }, this),
                            " | IG\u9650\u52D5 ",
                            /* @__PURE__ */ jsxDEV12(IconCheck3, { size: 12, style: { display: "inline", color: "green" } }, void 0, !1, {
                              fileName: "app/routes/_app.reports.generate.tsx",
                              lineNumber: 557,
                              columnNumber: 135
                            }, this)
                          ] }, void 0, !0, {
                            fileName: "app/routes/_app.reports.generate.tsx",
                            lineNumber: 557,
                            columnNumber: 31
                          }, this) }, void 0, !1, {
                            fileName: "app/routes/_app.reports.generate.tsx",
                            lineNumber: 556,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, !0, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 554,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV12(Box7, { style: { textAlign: "right" }, children: [
                          /* @__PURE__ */ jsxDEV12(Badge5, { variant: "dot", color: "blue", children: "\u7E3D\u89F8\u53CA 80K" }, void 0, !1, {
                            fileName: "app/routes/_app.reports.generate.tsx",
                            lineNumber: 561,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", mt: 4, children: "\u4E92\u52D5\u7387 7.8%" }, void 0, !1, {
                            fileName: "app/routes/_app.reports.generate.tsx",
                            lineNumber: 562,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, !0, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 560,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 547,
                        columnNumber: 25
                      }, this)
                    },
                    kol.id || idx,
                    !1,
                    {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 538,
                      columnNumber: 23
                    },
                    this
                  )),
                  (activeOrder.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).length === 0 && /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, p: "sm", radius: "md", style: { cursor: "pointer" }, onClick: () => toggleKolSelection("demo-gina"), children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", children: [
                    /* @__PURE__ */ jsxDEV12(
                      Checkbox2,
                      {
                        checked: selectedKolIds.includes("demo-gina"),
                        onChange: () => toggleKolSelection("demo-gina"),
                        onClick: (e) => e.stopPropagation()
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 571,
                        columnNumber: 27
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV12(Avatar6, { color: "blue", radius: "xl", size: "md", children: "G" }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 576,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV12(Box7, { style: { flexGrow: 1 }, children: [
                      /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, children: "Gina (Demo)" }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 578,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV12(Group9, { gap: "xs", mt: 4, children: /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: [
                        "IG\u8CBC\u6587 ",
                        /* @__PURE__ */ jsxDEV12(IconCheck3, { size: 12, style: { display: "inline", color: "green" } }, void 0, !1, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 580,
                          columnNumber: 63
                        }, this),
                        " | IG\u9650\u52D5 ",
                        /* @__PURE__ */ jsxDEV12(IconCheck3, { size: 12, style: { display: "inline", color: "green" } }, void 0, !1, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 580,
                          columnNumber: 135
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 580,
                        columnNumber: 31
                      }, this) }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 579,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 577,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 570,
                    columnNumber: 25
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 569,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 536,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 534,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV12(Box7, { children: [
                /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, size: "sm", c: "orange.7", mb: "xs", children: "\u26A0\uFE0F \u5C1A\u672A\u4E0A\u50B3\u6210\u6548\u7684 KOL" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 591,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV12(Stack10, { gap: "xs", children: (activeOrder.collaborations || []).filter((k) => !(k.performanceItems || []).length).map((kol, idx) => /* @__PURE__ */ jsxDEV12(
                  Card9,
                  {
                    withBorder: !0,
                    p: "sm",
                    radius: "md",
                    bg: "orange.0",
                    style: { opacity: 0.8, cursor: "pointer" },
                    onClick: () => toggleKolSelection(kol.id),
                    children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", children: [
                      /* @__PURE__ */ jsxDEV12(
                        Checkbox2,
                        {
                          checked: selectedKolIds.includes(kol.id),
                          onChange: () => toggleKolSelection(kol.id),
                          onClick: (e) => e.stopPropagation()
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 604,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV12(Avatar6, { src: kol.kol?.avatarUrl, radius: "xl", size: "md", style: { filter: "grayscale(100%)" } }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 609,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV12(Box7, { style: { flexGrow: 1 }, children: [
                        /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, c: "dimmed", children: kol.kol?.name || "KOL Name" }, void 0, !1, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 611,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV12(Group9, { gap: "xs", mt: 4, children: /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "red.7", children: [
                          /* @__PURE__ */ jsxDEV12(IconX3, { size: 12, style: { display: "inline" } }, void 0, !1, {
                            fileName: "app/routes/_app.reports.generate.tsx",
                            lineNumber: 613,
                            columnNumber: 57
                          }, this),
                          " \u7121\u6210\u6548\u8CC7\u6599"
                        ] }, void 0, !0, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 613,
                          columnNumber: 31
                        }, this) }, void 0, !1, {
                          fileName: "app/routes/_app.reports.generate.tsx",
                          lineNumber: 612,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 610,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV12(Button10, { variant: "subtle", size: "xs", color: "blue", rightSection: "\u2192", children: "\u524D\u5F80\u4E0A\u50B3\u6210\u6548" }, void 0, !1, {
                        fileName: "app/routes/_app.reports.generate.tsx",
                        lineNumber: 616,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 603,
                      columnNumber: 25
                    }, this)
                  },
                  kol.id || idx,
                  !1,
                  {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 594,
                    columnNumber: 23
                  },
                  this
                )) }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 592,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 590,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV12(Card9, { bg: "blue.0", p: "sm", radius: "md", mt: "xs", children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", align: "flex-start", children: [
                /* @__PURE__ */ jsxDEV12(ThemeIcon, { color: "blue", variant: "light", size: "sm", mt: 2, children: /* @__PURE__ */ jsxDEV12(IconBulb2, { size: 14 }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 626,
                  columnNumber: 78
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 626,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "blue.9", style: { lineHeight: 1.4 }, children: "\u672A\u52FE\u9078\u7684 KOL \u5C07\u4E0D\u6703\u51FA\u73FE\u5728\u5831\u544A\u4E2D\u3002\u5EFA\u8B70\u5148\u4E0A\u50B3\u6240\u6709 KOL \u7684\u6210\u6548\u8CC7\u6599\u5F8C\u518D\u751F\u6210\u5831\u544A\u3002" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 627,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 625,
                columnNumber: 19
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 624,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 532,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 528,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Divider6, {}, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 635,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { children: [
            /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, size: "lg", mb: "md", children: "\u6B65\u9A5F 2\uFF1A\u5831\u544A\u8A2D\u5B9A" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 639,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(Stack10, { gap: "lg", children: [
              /* @__PURE__ */ jsxDEV12(
                TextInput8,
                {
                  label: "\u5831\u544A\u6A19\u984C",
                  defaultValue: `${activeOrder.title || activeOrder.projectName} \u7D50\u6848\u5831\u544A`,
                  description: "0/100"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 642,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV12(Box7, { children: [
                /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 500, mb: "xs", children: "PowerPoint \u6A21\u677F" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 649,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV12(Group9, { grow: !0, children: [
                  /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, p: "sm", onClick: () => setSelectedTemplate("standard"), style: { borderColor: selectedTemplate === "standard" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)", cursor: "pointer" }, children: /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", gap: "xs", children: [
                    /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "standard" ? "blue" : "gray", children: /* @__PURE__ */ jsxDEV12(IconTemplate, {}, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 653,
                      columnNumber: 120
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 653,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, size: "sm", c: selectedTemplate === "standard" ? "" : "dimmed", children: "\u516C\u53F8\u6A19\u6E96\u6A21\u677F" }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 654,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 652,
                    columnNumber: 23
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 651,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, p: "sm", onClick: () => setSelectedTemplate("simple"), style: { borderColor: selectedTemplate === "simple" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)", cursor: "pointer" }, children: /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", gap: "xs", children: [
                    /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "simple" ? "blue" : "gray", children: /* @__PURE__ */ jsxDEV12(IconTemplate, {}, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 659,
                      columnNumber: 118
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 659,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, size: "sm", c: selectedTemplate === "simple" ? "" : "dimmed", children: "\u7C21\u7D04\u6A21\u677F" }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 660,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 658,
                    columnNumber: 23
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 657,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, p: "sm", onClick: () => setSelectedTemplate("none"), style: { borderColor: selectedTemplate === "none" ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-default-border)", cursor: "pointer" }, children: /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", gap: "xs", children: [
                    /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: "xl", variant: "light", color: selectedTemplate === "none" ? "blue" : "gray", children: /* @__PURE__ */ jsxDEV12(IconFile, {}, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 665,
                      columnNumber: 116
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 665,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, size: "sm", c: selectedTemplate === "none" ? "" : "dimmed", children: "\u4E0D\u5957\u7528\u6A21\u677F" }, void 0, !1, {
                      fileName: "app/routes/_app.reports.generate.tsx",
                      lineNumber: 666,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 664,
                    columnNumber: 23
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 663,
                    columnNumber: 21
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 650,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 648,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV12(Card9, { bg: "gray.0", p: "sm", radius: "md", children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", children: [
                /* @__PURE__ */ jsxDEV12(ThemeIcon, { color: "gray", variant: "light", children: /* @__PURE__ */ jsxDEV12(IconFileDescription, { size: 16 }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 674,
                  columnNumber: 61
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 674,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV12(Box7, { children: [
                  /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 600, children: "\u9810\u4F30\u9801\u6578: \u7D04 18 \u9801" }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 676,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: "(\u5C01\u9762 + 3\u500BKOL \xD7 \u5E73\u57475\u9801 + \u7E3D\u7D50)" }, void 0, !1, {
                    fileName: "app/routes/_app.reports.generate.tsx",
                    lineNumber: 677,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 675,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 673,
                columnNumber: 19
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 672,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 641,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 638,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Group9, { justify: "flex-end", mt: "md", children: [
            /* @__PURE__ */ jsxDEV12(Button10, { variant: "ghost", color: "gray", onClick: closeGenModal, children: "\u53D6\u6D88" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 685,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(Tooltip, { label: "\u5831\u544A\u5C07\u5728\u80CC\u666F\u751F\u6210\uFF0C\u5B8C\u6210\u5F8C\u6703\u901A\u77E5\u60A8", position: "top", withArrow: !0, children: /* @__PURE__ */ jsxDEV12(Button10, { color: "blue", size: "lg", onClick: startGeneration, leftSection: /* @__PURE__ */ jsxDEV12(IconRobot, { size: 20 }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 687,
              columnNumber: 87
            }, this), children: "\u958B\u59CB\u751F\u6210" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 687,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 686,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 684,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 508,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 501,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV12(
      Modal5,
      {
        opened: progressModalOpen,
        onClose: closeProgressModal,
        withCloseButton: !1,
        size: "md",
        centered: !0,
        overlayProps: { backgroundOpacity: 0.55, blur: 3 },
        children: /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", ta: "center", gap: "md", py: "md", children: [
          /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: 64, radius: "100%", variant: "light", color: "blue", style: { animation: "pulse 2s infinite" }, children: /* @__PURE__ */ jsxDEV12(IconRobot, { size: 40 }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 707,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 706,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { children: [
            /* @__PURE__ */ jsxDEV12(Title10, { order: 3, children: "AI \u6B63\u5728\u70BA\u60A8\u751F\u6210\u5831\u544A" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 710,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV12(Text10, { c: "dimmed", mt: 4, children: [
              "\u6848\u4EF6 #",
              activeOrder?.orderNo,
              " ",
              activeOrder?.title || activeOrder?.projectName
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 711,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 709,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { w: "100%", my: "sm", children: [
            /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", mb: 8, children: [
              /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 600, children: "\u9032\u5EA6" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 718,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: 600, c: "blue", children: [
                progressPercentage,
                "%"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 719,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 717,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV12(
              Progress2,
              {
                value: progressPercentage,
                size: "lg",
                radius: "xl",
                striped: !0,
                animated: !0,
                color: "blue"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 721,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 716,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Stack10, { gap: "xs", w: "100%", align: "flex-start", pl: "md", children: [
            "\u6536\u96C6\u6848\u4EF6\u8CC7\u6599",
            "\u6574\u7406 KOL \u6210\u6548\u6578\u64DA",
            "AI \u751F\u6210\u5831\u544A\u5167\u5BB9\u4E2D...",
            "\u5957\u7528 PowerPoint \u6A21\u677F",
            "\u4E0A\u50B3\u81F3\u96F2\u7AEF\u5132\u5B58"
          ].map((stepDesc, idx) => {
            let isCompleted = currentStepIndex > idx, isCurrent = currentStepIndex === idx;
            return /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", gap: "sm", children: [
              isCompleted ? /* @__PURE__ */ jsxDEV12(ThemeIcon, { color: "green", size: 20, radius: "xl", variant: "filled", children: /* @__PURE__ */ jsxDEV12(IconCheck3, { size: 14 }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 745,
                columnNumber: 85
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 745,
                columnNumber: 21
              }, this) : isCurrent ? /* @__PURE__ */ jsxDEV12(ThemeIcon, { color: "blue", size: 20, radius: "xl", variant: "light", children: /* @__PURE__ */ jsxDEV12(IconRobot, { size: 14 }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 747,
                columnNumber: 83
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 747,
                columnNumber: 21
              }, this) : /* @__PURE__ */ jsxDEV12(ThemeIcon, { color: "gray", size: 20, radius: "xl", variant: "light", children: /* @__PURE__ */ jsxDEV12(IconClockHour4, { size: 14 }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 749,
                columnNumber: 83
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 749,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", fw: isCurrent ? 600 : 400, c: isCompleted ? "dimmed" : isCurrent ? "blue.7" : "gray.5", children: stepDesc }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 751,
                columnNumber: 19
              }, this)
            ] }, idx, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 743,
              columnNumber: 17
            }, this);
          }) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 732,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", mt: "xs", children: "\u9810\u8A08\u9084\u9700 2 \u5206\u9418" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 759,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Card9, { bg: "blue.0", w: "100%", p: "sm", radius: "md", children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", align: "center", justify: "center", children: [
            /* @__PURE__ */ jsxDEV12(IconBulb2, { size: 18, color: "var(--mantine-color-blue-7)" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 763,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "blue.9", children: "\u60A8\u53EF\u4EE5\u95DC\u9589\u6B64\u8996\u7A97\u7E7C\u7E8C\u5176\u4ED6\u5DE5\u4F5C\uFF0C\u5B8C\u6210\u5F8C\u6703\u901A\u77E5\u60A8" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 764,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 762,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 761,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(Group9, { w: "100%", grow: !0, mt: "sm", children: [
            /* @__PURE__ */ jsxDEV12(Button10, { variant: "outline", color: "red", onClick: closeProgressModal, children: "\u53D6\u6D88\u751F\u6210" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 769,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV12(Button10, { onClick: closeProgressModal, children: "\u5728\u80CC\u666F\u7E7C\u7E8C" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 770,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 768,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 705,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 697,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV12(
      Modal5,
      {
        opened: uploadModalOpen,
        onClose: closeUploadModal,
        title: /* @__PURE__ */ jsxDEV12(Text10, { fw: 700, size: "lg", children: "\u4E0A\u50B3\u6B63\u5F0F\u7D50\u6848\u5831\u544A" }, void 0, !1, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 779,
          columnNumber: 16
        }, this),
        centered: !0,
        size: 600,
        withCloseButton: !uploadProgress && !uploadSuccess,
        closeOnClickOutside: !uploadProgress && !uploadSuccess,
        children: uploadSuccess ? /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", ta: "center", py: "xl", gap: "md", children: [
          /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: 64, radius: "100%", color: "green", variant: "filled", children: /* @__PURE__ */ jsxDEV12(IconCheck3, { size: 40 }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 788,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 787,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Title10, { order: 3, children: "\u4E0A\u50B3\u6210\u529F\uFF01" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 790,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Button10, { mt: "md", variant: "outline", onClick: closeUploadModal, children: "\u67E5\u770B\u5831\u544A" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 791,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 786,
          columnNumber: 11
        }, this) : uploadProgress !== null ? /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", ta: "center", py: "xl", gap: "md", children: [
          /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: 64, radius: "md", color: "blue", variant: "light", style: { animation: "pulse 2s infinite" }, children: /* @__PURE__ */ jsxDEV12(IconCloudUpload, { size: 40 }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 796,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 795,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { w: "100%", children: [
            /* @__PURE__ */ jsxDEV12(Group9, { justify: "space-between", mb: 8, children: /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, children: [
              "\u4E0A\u50B3\u4E2D... ",
              uploadProgress,
              "%"
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 800,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 799,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(Progress2, { value: uploadProgress, size: "lg", radius: "xl", striped: !0, animated: !0 }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 802,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 798,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Button10, { mt: "md", variant: "subtle", color: "red", onClick: closeUploadModal, children: "\u53D6\u6D88" }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 804,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 794,
          columnNumber: 11
        }, this) : /* @__PURE__ */ jsxDEV12(Stack10, { gap: "lg", children: [
          /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "dimmed", mt: "-xs", children: [
            "\u6848\u4EF6: #",
            activeOrder?.orderNo,
            " ",
            activeOrder?.title || activeOrder?.projectName
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 808,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Box7, { children: uploadFile ? /* @__PURE__ */ jsxDEV12(Card9, { withBorder: !0, radius: "md", p: "sm", bg: "gray.0", children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", justify: "space-between", children: [
            /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", children: [
              /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: "lg", variant: "light", color: "blue", children: /* @__PURE__ */ jsxDEV12(IconFile, { size: 20 }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 853,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 852,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV12(Box7, { children: [
                /* @__PURE__ */ jsxDEV12(Text10, { fw: 500, size: "sm", lineClamp: 1, children: uploadFile.name }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 856,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: [
                  (uploadFile.size / 1024 / 1024).toFixed(2),
                  " MB"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 857,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 855,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 851,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV12(ActionIcon3, { color: "red", variant: "subtle", onClick: () => setUploadFile(null), children: /* @__PURE__ */ jsxDEV12(IconX3, { size: 16 }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 861,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 860,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 850,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 849,
            columnNumber: 17
          }, this) : /* @__PURE__ */ jsxDEV12(FileButton, { onChange: setUploadFile, accept: "application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation", children: (props) => /* @__PURE__ */ jsxDEV12(
            Card9,
            {
              ...props,
              withBorder: !0,
              radius: "md",
              p: "xl",
              style: {
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "var(--mantine-color-default-border)",
                cursor: "pointer",
                textAlign: "center",
                transition: "border-color 0.2s, background-color 0.2s"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.borderColor = "var(--mantine-color-blue-filled)", e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-light)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.borderColor = "var(--mantine-color-default-border)", e.currentTarget.style.backgroundColor = "transparent";
              },
              children: /* @__PURE__ */ jsxDEV12(Stack10, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ jsxDEV12(ThemeIcon, { size: 48, variant: "light", color: "blue", radius: "md", children: /* @__PURE__ */ jsxDEV12(IconUpload, { size: 24 }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 839,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 838,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, mt: "sm", children: "\u62D6\u66F3\u6A94\u6848\u81F3\u6B64\u6216\u9EDE\u64CA\u9078\u64C7" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 841,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV12(Text10, { size: "xs", c: "dimmed", children: "\u652F\u63F4\u683C\u5F0F: .pptx, .pdf \u2022 \u6700\u5927 50MB" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 842,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV12(Button10, { variant: "light", size: "xs", mt: "sm", children: "\u9078\u64C7\u6A94\u6848" }, void 0, !1, {
                  fileName: "app/routes/_app.reports.generate.tsx",
                  lineNumber: 843,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 837,
                columnNumber: 23
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 815,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 813,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 811,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(
            Textarea6,
            {
              label: "\u7248\u672C\u8AAA\u660E (\u9078\u586B)",
              placeholder: "\u4F8B\u5982: \u5DF2\u6839\u64DA\u5BA2\u6236\u56DE\u994B\u4FEE\u6B63\u6578\u64DA\u5448\u73FE\u65B9\u5F0F\u3001\u66F4\u65B0\u54C1\u724C\u8996\u89BA...",
              description: "\u8AAA\u660E\u6B64\u7248\u672C\u8207\u8349\u7A3F\u7684\u5DEE\u7570\u6216\u4FEE\u6539\u5167\u5BB9",
              minRows: 3
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 869,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV12(
            Checkbox2,
            {
              checked: isOfficial,
              onChange: (evt) => setIsOfficial(evt.currentTarget.checked),
              label: /* @__PURE__ */ jsxDEV12(Text10, { fw: 600, size: "md", children: "\u6A19\u8A18\u70BA\u6B63\u5F0F\u7248\u672C" }, void 0, !1, {
                fileName: "app/routes/_app.reports.generate.tsx",
                lineNumber: 880,
                columnNumber: 22
              }, this),
              description: "\u6B63\u5F0F\u7248\u6703\u986F\u793A \u2B50 \u6A19\u8A18\uFF0C\u4E26\u512A\u5148\u5C55\u793A\u7D66\u5718\u968A\u6210\u54E1",
              size: "md"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 877,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV12(Card9, { bg: "blue.0", p: "sm", radius: "md", mt: "xs", children: /* @__PURE__ */ jsxDEV12(Group9, { wrap: "nowrap", align: "flex-start", children: [
            /* @__PURE__ */ jsxDEV12(ThemeIcon, { color: "blue", variant: "light", size: "sm", mt: 2, children: /* @__PURE__ */ jsxDEV12(IconBulb2, { size: 14 }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 887,
              columnNumber: 74
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 887,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV12(Text10, { size: "sm", c: "blue.9", style: { lineHeight: 1.4 }, children: "\u4E0A\u50B3\u6B63\u5F0F\u7248\u5F8C\uFF0C\u7CFB\u7D71\u8349\u7A3F\u4ECD\u6703\u4FDD\u7559\u3002\u60A8\u53EF\u4EE5\u96A8\u6642\u67E5\u770B\u6216\u4E0B\u8F09\u4EFB\u4E00\u7248\u672C\u3002" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 888,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 886,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 885,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV12(Group9, { justify: "flex-end", mt: "md", children: [
            /* @__PURE__ */ jsxDEV12(Button10, { variant: "ghost", color: "gray", onClick: closeUploadModal, children: "\u53D6\u6D88" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 895,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV12(Button10, { color: "blue", disabled: !uploadFile, onClick: startOfficialUpload, children: "\u78BA\u8A8D\u4E0A\u50B3" }, void 0, !1, {
              fileName: "app/routes/_app.reports.generate.tsx",
              lineNumber: 896,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.reports.generate.tsx",
            lineNumber: 894,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.reports.generate.tsx",
          lineNumber: 807,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_app.reports.generate.tsx",
        lineNumber: 776,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV12("style", { children: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      ` }, void 0, !1, {
      fileName: "app/routes/_app.reports.generate.tsx",
      lineNumber: 902,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.reports.generate.tsx",
    lineNumber: 211,
    columnNumber: 5
  }, this);
}

// app/routes/api.social-followers.ts
var api_social_followers_exports = {};
__export(api_social_followers_exports, {
  loader: () => loader10
});
import { json as json10 } from "@remix-run/node";
function hashString(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1)
    h = (h << 5) - h + input.charCodeAt(i), h |= 0;
  return Math.abs(h);
}
async function loader10({ request }) {
  let url = new URL(request.url), platform = (url.searchParams.get("platform") ?? "").toLowerCase(), profileUrl = url.searchParams.get("url") ?? "";
  if (!platform || !profileUrl)
    return json10({ error: "platform and url are required" }, { status: 400 });
  let seed = hashString(`${platform}:${profileUrl}`), followers = ({
    instagram: 3e4,
    youtube: 18e3,
    tiktok: 45e3,
    facebook: 12e3,
    threads: 8e3
  }[platform] ?? 1e4) + seed % 25e4;
  return json10({ platform, url: profileUrl, followers, source: "mock-api" });
}

// app/routes/api.ai-parse-order.ts
var api_ai_parse_order_exports = {};
__export(api_ai_parse_order_exports, {
  loader: () => loader11
});
import { json as json11 } from "@remix-run/node";
function hashString2(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1)
    h = (h << 5) - h + input.charCodeAt(i), h |= 0;
  return Math.abs(h);
}
async function loader11({ request }) {
  let filename = new URL(request.url).searchParams.get("filename") ?? "campaign.pdf", seed = hashString2(filename.toLowerCase()), clients = ["Panasonic", "Happy Food", "DermaLab", "Aqua Home", "NovaTech"], industries = ["\u5BB6\u96FB", "\u98DF\u54C1", "\u7F8E\u599D", "3C", "\u6BCD\u5B30"], salesOwners = ["Amy", "Nina", "Leo"], kolManagers = ["John", "Cindy", "Mia"], client = clients[seed % clients.length], industry = industries[seed % industries.length];
  return json11({
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
  action: () => action7,
  default: () => ProposalCreatePage
});
import { Button as Button11, Card as Card10, Group as Group10, Stack as Stack11, TextInput as TextInput9, Title as Title11 } from "@mantine/core";
import { json as json12, redirect as redirect5 } from "@remix-run/node";
import { Form as Form6, Link as Link10, useActionData as useActionData4 } from "@remix-run/react";
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
async function action7({ request }) {
  let formData = await request.formData(), title = String(formData.get("title") ?? "").trim(), clientName = String(formData.get("clientName") ?? "").trim(), budget = Number(formData.get("budget") ?? 0), dueDate = String(formData.get("dueDate") ?? "").trim();
  if (!title || !clientName)
    return json12({ error: "\u6A19\u984C\u8207\u5BA2\u6236\u70BA\u5FC5\u586B" }, { status: 400 });
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
  })).ok ? redirect5("/proposals") : json12({ error: "\u5EFA\u7ACB\u5931\u6557" }, { status: 500 });
}
function ProposalCreatePage() {
  let actionData = useActionData4();
  return /* @__PURE__ */ jsxDEV13(Stack11, { children: [
    /* @__PURE__ */ jsxDEV13(Group10, { justify: "space-between", children: [
      /* @__PURE__ */ jsxDEV13(Title11, { order: 2, children: "\u63D0\u6848\u5EFA\u6A94\u9801" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(Link10, { to: "/proposals", children: "\u56DE\u63D0\u6848\u4E00\u89BD" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.proposals.new.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV13(Card10, { withBorder: !0, children: /* @__PURE__ */ jsxDEV13(Form6, { method: "post", children: /* @__PURE__ */ jsxDEV13(Stack11, { children: [
      /* @__PURE__ */ jsxDEV13(TextInput9, { name: "title", label: "\u63D0\u6848\u6A19\u984C", required: !0 }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 47,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13(TextInput9, { name: "clientName", label: "\u5BA2\u6236\u540D\u7A31", required: !0 }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 48,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13(TextInput9, { name: "budget", label: "\u9810\u7B97", defaultValue: "0" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 49,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13(TextInput9, { name: "dueDate", label: "\u622A\u6B62\u65E5", placeholder: "2026-03-20" }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 50,
        columnNumber: 13
      }, this),
      actionData?.error ? /* @__PURE__ */ jsxDEV13("div", { style: { color: "red" }, children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_app.proposals.new.tsx",
        lineNumber: 51,
        columnNumber: 34
      }, this) : null,
      /* @__PURE__ */ jsxDEV13(Button11, { type: "submit", children: "\u5EFA\u7ACB\u63D0\u6848" }, void 0, !1, {
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
  action: () => action8,
  default: () => KolListPage,
  loader: () => loader12
});
import {
  Alert as Alert4,
  Avatar as Avatar7,
  Badge as Badge6,
  Box as Box8,
  Button as Button12,
  Card as Card11,
  Divider as Divider7,
  Group as Group11,
  SimpleGrid as SimpleGrid8,
  Stack as Stack12,
  Table as Table3,
  Text as Text11,
  Title as Title12
} from "@mantine/core";
import { json as json13, redirect as redirect6 } from "@remix-run/node";
import { Form as Form7, Link as Link11, useLoaderData as useLoaderData10 } from "@remix-run/react";
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
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
async function loader12({ request }) {
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
  let pageSize = view === "card" ? 8 : 10, totalPages = Math.max(1, Math.ceil(kols.length / pageSize)), safePageNo = Math.min(page, totalPages), pageRows = kols.slice((safePageNo - 1) * pageSize, safePageNo * pageSize), allKols = await listKols(), allIndustries = [...new Set(allKols.map((k) => k.industry).filter(Boolean))], catalogTags = (await listTagCatalog()).map((t) => t.name), allTags = [.../* @__PURE__ */ new Set([...allKols.flatMap((k) => getPrimaryTags(k)), ...catalogTags])];
  return json13({
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
async function action8({ request }) {
  let formData = await request.formData(), intent = formData.get("intent"), kolId = String(formData.get("kolId") ?? "");
  if (intent === "toggleFavorite") {
    let isFavorite = formData.get("isFavorite") === "true";
    if (!kolId)
      return json13({ error: "Missing KOL id" }, { status: 400 });
    await updateKol(kolId, { isFavorite: !isFavorite });
    let url = new URL(request.url);
    return redirect6(url.pathname + url.search);
  }
  if (intent === "delete") {
    if (!kolId)
      return json13({ error: "Missing KOL id" }, { status: 400 });
    await deleteKol(kolId);
    let url = new URL(request.url);
    return url.searchParams.set("deleted", "1"), redirect6(url.pathname + "?" + url.searchParams.toString());
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
  } = useLoaderData10(), current = {
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
  return /* @__PURE__ */ jsxDEV14(Stack12, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV14(
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
        lineNumber: 251,
        columnNumber: 7
      },
      this
    ),
    deleted && /* @__PURE__ */ jsxDEV14(Alert4, { color: "green", variant: "light", children: [
      "KOL \u5DF2\u522A\u9664\u6210\u529F\u3002",
      /* @__PURE__ */ jsxDEV14(
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
          lineNumber: 269,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 267,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV14(Group11, { justify: "space-between", align: "flex-end", children: [
      /* @__PURE__ */ jsxDEV14(Box8, { children: [
        /* @__PURE__ */ jsxDEV14(Text11, { c: "dimmed", size: "sm", children: "KOL \u7BA1\u7406" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 281,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV14(Title12, { order: 2, children: "KOL \u4E00\u89BD" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 282,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 280,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Group11, { gap: "md", align: "flex-end", children: [
        /* @__PURE__ */ jsxDEV14(Group11, { gap: 0, style: { border: "1px solid var(--mantine-color-default-border)", borderRadius: 6, overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxDEV14(
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
              lineNumber: 287,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV14(
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
              lineNumber: 298,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 286,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV14(Group11, { gap: "sm", children: [
          /* @__PURE__ */ jsxDEV14(
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
              lineNumber: 311,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV14(Button12, { component: Link11, to: "/kols/new", children: "\u65B0\u589E KOL" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 318,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 310,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 285,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 279,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14(Group11, { justify: "space-between", align: "flex-end", wrap: "nowrap", children: [
      /* @__PURE__ */ jsxDEV14("form", { method: "get", action: "/kols", style: { flex: 1, maxWidth: 520, display: "flex", gap: 8 }, children: [
        view !== "card" && /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "view", value: view }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 331,
          columnNumber: 31
        }, this),
        sortKey !== "followers" && /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "sort", value: sortKey }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 332,
          columnNumber: 39
        }, this),
        sortOrder !== "desc" && /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "order", value: sortOrder }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 333,
          columnNumber: 36
        }, this),
        showFilters && /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "panel", value: "filters" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 334,
          columnNumber: 27
        }, this),
        followerRanges.map((r) => /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "fr", value: r }, r, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 335,
          columnNumber: 38
        }, this)),
        industries.map((i) => /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "ind", value: i }, i, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 336,
          columnNumber: 34
        }, this)),
        tags.map((t) => /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "tag", value: t }, t, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 337,
          columnNumber: 28
        }, this)),
        minRating > 0 && /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "minRating", value: String(minRating) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 338,
          columnNumber: 29
        }, this),
        maxRating < 5 && /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "maxRating", value: String(maxRating) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 339,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV14(
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
            lineNumber: 341,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV14(
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
            lineNumber: 355,
            columnNumber: 11
          },
          this
        ),
        q && /* @__PURE__ */ jsxDEV14(
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
            lineNumber: 369,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 329,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(
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
          lineNumber: 384,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 324,
      columnNumber: 7
    }, this),
    showFilters && /* @__PURE__ */ jsxDEV14(Card11, { withBorder: !0, children: [
      /* @__PURE__ */ jsxDEV14(Text11, { fw: 600, mb: "md", children: "\u7BE9\u9078\u689D\u4EF6" }, void 0, !1, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 406,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV14("form", { method: "get", action: "/kols", children: [
        /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "view", value: view }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 409,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "sort", value: sortKey }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 410,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "order", value: sortOrder }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 411,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "panel", value: "filters" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 412,
          columnNumber: 15
        }, this),
        q && /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "q", value: q }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 413,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Group11, { align: "flex-start", gap: "xl", wrap: "wrap", children: [
          /* @__PURE__ */ jsxDEV14(Box8, { style: { minWidth: 160 }, children: [
            /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", fw: 600, mb: 6, children: "\u7C89\u7D72\u6578" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 418,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV14(Stack12, { gap: 4, children: FOLLOWER_RANGES.map((r) => /* @__PURE__ */ jsxDEV14("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }, children: [
              /* @__PURE__ */ jsxDEV14(
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
                  lineNumber: 422,
                  columnNumber: 25
                },
                this
              ),
              r.label
            ] }, r.key, !0, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 421,
              columnNumber: 23
            }, this)) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 419,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 417,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV14(Divider7, { orientation: "vertical" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 434,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV14(Box8, { style: { minWidth: 160 }, children: [
            /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", fw: 600, mb: 6, children: "\u7522\u696D\u5225" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 438,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV14(Stack12, { gap: 4, children: allIndustries.map((ind) => /* @__PURE__ */ jsxDEV14("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }, children: [
              /* @__PURE__ */ jsxDEV14(
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
                  lineNumber: 442,
                  columnNumber: 25
                },
                this
              ),
              ind
            ] }, ind, !0, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 441,
              columnNumber: 23
            }, this)) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 439,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 437,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV14(Divider7, { orientation: "vertical" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 454,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV14(Box8, { style: { minWidth: 200 }, children: [
            /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", fw: 600, mb: 6, children: "\u6A19\u7C64" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 458,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV14("script", { dangerouslySetInnerHTML: {
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
              lineNumber: 460,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV14(Group11, { gap: 6, wrap: "wrap", children: allTags.map((tag) => /* @__PURE__ */ jsxDEV14(
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
                  /* @__PURE__ */ jsxDEV14(
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
                      lineNumber: 497,
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
                lineNumber: 477,
                columnNumber: 23
              },
              this
            )) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 475,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 457,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 415,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV14(Group11, { mt: "md", gap: "sm", children: [
          /* @__PURE__ */ jsxDEV14(
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
              lineNumber: 513,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV14(
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
              lineNumber: 526,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 512,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 407,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 405,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV14(Text11, { c: "dimmed", size: "sm", children: [
      "\u5171 ",
      total,
      " \u7B46\u7D50\u679C",
      q ? `\uFF08\u641C\u5C0B\uFF1A${q}\uFF09` : ""
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 544,
      columnNumber: 7
    }, this),
    view === "card" && /* @__PURE__ */ jsxDEV14(SimpleGrid8, { cols: { base: 1, sm: 2, lg: 3, xl: 4 }, spacing: 24, children: pageRows.map((kol) => {
      let kolTags = getPrimaryTags(kol);
      return /* @__PURE__ */ jsxDEV14(Card11, { withBorder: !0, radius: "md", p: "lg", style: { position: "relative" }, children: [
        /* @__PURE__ */ jsxDEV14(Form7, { method: "post", style: { position: "absolute", top: 12, right: 12, zIndex: 2 }, children: [
          /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "intent", value: "toggleFavorite" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 555,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 556,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "isFavorite", value: String(kol.isFavorite) }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 557,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14(
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
              lineNumber: 558,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 554,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Stack12, { align: "center", gap: "xs", children: [
          /* @__PURE__ */ jsxDEV14(Avatar7, { src: kol.avatarUrl, size: 72, radius: 999 }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 576,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14(Text11, { fw: 600, children: kol.displayName }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 577,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", c: "dimmed", children: [
            "@",
            kol.instagramHandle ?? kol.displayName.toLowerCase().replaceAll(" ", "")
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 578,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 575,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Divider7, { my: "sm" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 582,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Stack12, { gap: 4, children: [
          /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", children: [
            "IG ",
            (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 584,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", children: [
            "YT ",
            (kol.social?.youtube ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 585,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", children: [
            "TT ",
            (kol.social?.tiktok ?? 0).toLocaleString()
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 586,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 583,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Group11, { gap: 6, mt: "sm", wrap: "wrap", children: kolTags.map((tag) => /* @__PURE__ */ jsxDEV14(Badge6, { variant: "light", radius: "xl", size: "sm", children: tag }, tag, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 590,
          columnNumber: 23
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 588,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Group11, { justify: "space-between", mt: "sm", children: [
          /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", children: [
            "\u2B50 ",
            (kol.rating ?? 0).toFixed(1)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 594,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14(Text11, { size: "xs", c: "dimmed", children: [
            "\u5408\u4F5C ",
            kol.collaborations ?? 0,
            " \u6B21"
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 595,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 593,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Group11, { mt: "sm", gap: "xs", children: [
          /* @__PURE__ */ jsxDEV14(
            Button12,
            {
              variant: "light",
              size: "xs",
              fullWidth: !0,
              component: Link11,
              to: `/kols/${kol.id}`,
              children: "\u67E5\u770B\u8A73\u60C5"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 598,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV14(
            Button12,
            {
              variant: "default",
              size: "xs",
              fullWidth: !0,
              component: Link11,
              to: `/kols/${kol.id}/edit`,
              children: "\u7DE8\u8F2F"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 607,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV14(
            Form7,
            {
              method: "post",
              "data-confirm": `\u78BA\u5B9A\u8981\u522A\u9664 ${kol.displayName} \u55CE\uFF1F\u6B64\u52D5\u4F5C\u7121\u6CD5\u5FA9\u539F\u3002`,
              style: { flex: 1 },
              children: [
                /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "intent", value: "delete" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 621,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 622,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV14(Button12, { type: "submit", color: "red", variant: "light", size: "xs", fullWidth: !0, children: "\u522A\u9664" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 623,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 616,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 597,
          columnNumber: 19
        }, this)
      ] }, kol.id, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 553,
        columnNumber: 17
      }, this);
    }) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 549,
      columnNumber: 11
    }, this),
    view === "table" && /* @__PURE__ */ jsxDEV14(Card11, { withBorder: !0, children: /* @__PURE__ */ jsxDEV14(Table3, { highlightOnHover: !0, children: [
      /* @__PURE__ */ jsxDEV14(Table3.Thead, { children: /* @__PURE__ */ jsxDEV14(Table3.Tr, { children: [
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: "Photo" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 642,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: [
          "\u540D\u7A31",
          sortLabel("name")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 643,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: "Instagram" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 644,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: [
          "\u7C89\u7D72\u6578",
          sortLabel("followers")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 645,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: "\u4E92\u52D5/\u66DD\u5149" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 646,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: "\u6A19\u7C64" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 647,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: [
          "\u8A55\u5206",
          sortLabel("rating")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 648,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: /* @__PURE__ */ jsxDEV14("a", { href: sortUrl("collaborations"), style: { textDecoration: "none", color: "inherit" }, children: [
          "\u5408\u4F5C\u6B21\u6578",
          sortLabel("collaborations")
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 649,
          columnNumber: 29
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 649,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Th, { children: "\u64CD\u4F5C" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 650,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 641,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 640,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV14(Table3.Tbody, { children: pageRows.map((kol) => /* @__PURE__ */ jsxDEV14(Table3.Tr, { children: [
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: /* @__PURE__ */ jsxDEV14(Avatar7, { src: kol.avatarUrl, size: 32, radius: "xl" }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 656,
          columnNumber: 31
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 656,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: /* @__PURE__ */ jsxDEV14(Link11, { to: `/kols/${kol.id}`, children: kol.displayName }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 657,
          columnNumber: 31
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 657,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: [
          "@",
          kol.instagramHandle ?? "-"
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 658,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString() }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 659,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: [
          /* @__PURE__ */ jsxDEV14(Text11, { size: "xs", children: kol.engagementRate ? `${kol.engagementRate.toFixed(1)}%` : "-" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 661,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV14(Text11, { size: "xs", c: "dimmed", children: kol.exposureRate ? `${kol.exposureRate.toFixed(1)}%` : "-" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 662,
            columnNumber: 23
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 660,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: /* @__PURE__ */ jsxDEV14(Group11, { gap: 4, children: getPrimaryTags(kol).slice(0, 2).map((tag) => /* @__PURE__ */ jsxDEV14(Badge6, { size: "sm", variant: "light", children: tag }, tag, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 667,
          columnNumber: 27
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 665,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 664,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: [
          "\u2B50 ",
          (kol.rating ?? 0).toFixed(1)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 671,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: kol.collaborations ?? 0 }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 672,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV14(Table3.Td, { children: /* @__PURE__ */ jsxDEV14(Group11, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV14(Form7, { method: "post", style: { display: "inline" }, children: [
            /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "intent", value: "toggleFavorite" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 676,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 677,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "isFavorite", value: String(kol.isFavorite) }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 678,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ jsxDEV14(
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
                lineNumber: 679,
                columnNumber: 27
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 675,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV14(Button12, { component: Link11, to: `/kols/${kol.id}`, variant: "light", size: "xs", children: "\u67E5\u770B" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 695,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV14(Button12, { component: Link11, to: `/kols/${kol.id}/edit`, variant: "default", size: "xs", children: "\u7DE8\u8F2F" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 696,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV14(
            Form7,
            {
              method: "post",
              "data-confirm": `\u78BA\u5B9A\u8981\u522A\u9664 ${kol.displayName} \u55CE\uFF1F\u6B64\u52D5\u4F5C\u7121\u6CD5\u5FA9\u539F\u3002`,
              style: { display: "inline" },
              children: [
                /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "intent", value: "delete" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 702,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 703,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV14(Button12, { type: "submit", color: "red", variant: "subtle", size: "xs", children: "\u522A\u9664" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 704,
                  columnNumber: 27
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 697,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 674,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols._index.tsx",
          lineNumber: 673,
          columnNumber: 21
        }, this)
      ] }, kol.id, !0, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 655,
        columnNumber: 19
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 653,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 639,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 638,
      columnNumber: 11
    }, this),
    totalPages > 1 && /* @__PURE__ */ jsxDEV14(Group11, { justify: "center", children: /* @__PURE__ */ jsxDEV14(Group11, { gap: 4, children: Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxDEV14(
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
        lineNumber: 722,
        columnNumber: 17
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 720,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols._index.tsx",
      lineNumber: 719,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV14(
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
          /* @__PURE__ */ jsxDEV14(Group11, { justify: "space-between", mb: "md", children: [
            /* @__PURE__ */ jsxDEV14(Title12, { order: 4, children: "\u6279\u91CF\u532F\u5165 KOL (Excel)" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 763,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV14(
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
                lineNumber: 764,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 762,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", c: "dimmed", mb: "lg", children: "\u8ACB\u4E0A\u50B3\u5305\u542B KOL \u540D\u7A31\u3001\u5E73\u53F0\u9023\u7D50\u3001\u7C89\u7D72\u6578\u7B49\u8CC7\u8A0A\u7684 Excel \u6A94\u6848\u3002\u7CFB\u7D71\u6703\u81EA\u52D5\u89E3\u6790\u4E26\u5EFA\u6A94\u3002\uFF08\u529F\u80FD\u5C55\u793A\u7248\uFF09" }, void 0, !1, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 772,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV14(
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
                /* @__PURE__ */ jsxDEV14("div", { style: { fontSize: 36, marginBottom: 12 }, children: "\u{1F4E4}" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 801,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV14(Text11, { fw: 600, color: "var(--mantine-color-blue-filled)", children: "\u9EDE\u64CA\u6216\u62D6\u66F3 Excel \u6A94\u6848\u81F3\u6B64" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 802,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV14(Text11, { size: "sm", c: "dimmed", mt: 4, children: "\u652F\u63F4 .xlsx, .csv" }, void 0, !1, {
                  fileName: "app/routes/_app.kols._index.tsx",
                  lineNumber: 803,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV14(
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
                    lineNumber: 804,
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
              lineNumber: 776,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV14(Group11, { justify: "space-between", mt: "xl", children: [
            /* @__PURE__ */ jsxDEV14("a", { href: "#", style: { fontSize: 13, color: "var(--mantine-color-blue-filled)", textDecoration: "none" }, children: "\u4E0B\u8F09 Excel \u5EFA\u6A94\u7BC4\u672C" }, void 0, !1, {
              fileName: "app/routes/_app.kols._index.tsx",
              lineNumber: 828,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV14(
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
                lineNumber: 829,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols._index.tsx",
            lineNumber: 827,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.kols._index.tsx",
        lineNumber: 749,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols._index.tsx",
    lineNumber: 250,
    columnNumber: 5
  }, this);
}

// app/routes/_app.dashboard.tsx
var app_dashboard_exports = {};
__export(app_dashboard_exports, {
  default: () => DashboardPage
});
import { Card as Card12, SimpleGrid as SimpleGrid9, Group as Group12, Text as Text12, Title as Title13, ThemeIcon as ThemeIcon2 } from "@mantine/core";
import {
  IconUsers,
  IconFileText,
  IconFileInvoice,
  IconStar,
  IconReportAnalytics
} from "@tabler/icons-react";
import { Fragment as Fragment3, jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
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
  return /* @__PURE__ */ jsxDEV15(Fragment3, { children: [
    /* @__PURE__ */ jsxDEV15(Group12, { justify: "space-between", mb: "xs", children: [
      /* @__PURE__ */ jsxDEV15(Title13, { order: 2, children: "Dashboard" }, void 0, !1, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15(Text12, { c: "dimmed", size: "sm", children: "\u9996\u9801 / \u7E3D\u89BD" }, void 0, !1, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15(SimpleGrid9, { cols: { base: 2, sm: 4 }, spacing: "md", mb: "xl", children: cards.map((card) => /* @__PURE__ */ jsxDEV15("div", { children: [
      /* @__PURE__ */ jsxDEV15(Text12, { size: "xs", c: "dimmed", tt: "uppercase", fw: 700, mb: 4, children: card.label }, void 0, !1, {
        fileName: "app/routes/_app.dashboard.tsx",
        lineNumber: 68,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV15(Title13, { order: 2, children: card.value }, void 0, !1, {
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
    /* @__PURE__ */ jsxDEV15(Title13, { order: 4, mb: "md", mt: "xl", children: "\u529F\u80FD\u6A21\u7D44" }, void 0, !1, {
      fileName: "app/routes/_app.dashboard.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15(SimpleGrid9, { cols: { base: 1, sm: 2, lg: 3 }, spacing: "md", children: modules.map((mod) => /* @__PURE__ */ jsxDEV15(
      Card12,
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
        children: /* @__PURE__ */ jsxDEV15(Group12, { align: "flex-start", wrap: "nowrap", children: [
          /* @__PURE__ */ jsxDEV15(ThemeIcon2, { size: 48, radius: "md", color: mod.color, variant: "light", children: /* @__PURE__ */ jsxDEV15(mod.icon, { size: 26, stroke: 1.5 }, void 0, !1, {
            fileName: "app/routes/_app.dashboard.tsx",
            lineNumber: 104,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.dashboard.tsx",
            lineNumber: 103,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV15("div", { children: [
            /* @__PURE__ */ jsxDEV15(Text12, { fw: 600, size: "lg", mb: 4, c: "dark", children: mod.title }, void 0, !1, {
              fileName: "app/routes/_app.dashboard.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV15(Text12, { size: "sm", c: "dimmed", style: { lineHeight: 1.4 }, children: mod.description }, void 0, !1, {
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
  action: () => action9,
  default: () => FavoritesPage,
  loader: () => loader13
});
import {
  Avatar as Avatar8,
  Badge as Badge7,
  Box as Box9,
  Button as Button13,
  Card as Card13,
  Group as Group13,
  SimpleGrid as SimpleGrid10,
  Stack as Stack13,
  Text as Text13,
  Title as Title14
} from "@mantine/core";
import { json as json14, redirect as redirect7 } from "@remix-run/node";
import { Form as Form8, Link as Link12, useLoaderData as useLoaderData11 } from "@remix-run/react";
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
function sortRows(rows, sort) {
  let list = [...rows];
  return sort === "name_asc" ? list.sort((a, b) => a.displayName.localeCompare(b.displayName)) : sort === "followers_desc" ? list.sort((a, b) => (b.social?.instagram ?? b.followers ?? 0) - (a.social?.instagram ?? a.followers ?? 0)) : list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}
async function loader13({ request }) {
  let url = new URL(request.url), search = url.searchParams.get("search") ?? "", sort = url.searchParams.get("sort") ?? "rating_desc", folder = url.searchParams.get("folder") ?? "\u5168\u90E8", favorites = (await listKols()).filter((k) => k.isFavorite), fromRows = favorites.map((r) => r.favoriteFolder).filter(Boolean), folderSet = /* @__PURE__ */ new Set(["\u5BB6\u96FB\u5C08\u6848", "\u7F8E\u599D\u5C08\u6848", ...fromRows]), allFolders = ["\u5168\u90E8", ...Array.from(folderSet)], folderFiltered = folder === "\u5168\u90E8" ? favorites : favorites.filter((r) => (r.favoriteFolder ?? "\u672A\u5206\u985E") === folder), q = search.trim().toLowerCase(), searched = folderFiltered.filter((r) => q ? r.displayName.toLowerCase().includes(q) || (r.instagramHandle ?? "").toLowerCase().includes(q) || (r.industry ?? "").toLowerCase().includes(q) || (r.tags ?? r.categories).some((t) => t.toLowerCase().includes(q)) : !0), rows = sortRows(searched, sort), folderCounts = allFolders.reduce((acc, f) => (acc[f] = f === "\u5168\u90E8" ? favorites.length : favorites.filter((r) => (r.favoriteFolder ?? "\u672A\u5206\u985E") === f).length, acc), {});
  return json14({ rows, allFolders, folderCounts, search, sort, folder });
}
async function action9({ request }) {
  let formData = await request.formData();
  if (formData.get("intent") === "removeFavorite") {
    let kolId = String(formData.get("kolId") ?? "");
    if (!kolId)
      return json14({ error: "Missing KOL id" }, { status: 400 });
    await updateKol(kolId, { isFavorite: !1 });
    let url = new URL(request.url);
    return url.searchParams.set("unfavorited", "1"), redirect7(url.pathname + "?" + url.searchParams.toString());
  }
  return null;
}
function FavoritesPage() {
  let { rows, allFolders, folderCounts, search, sort, folder } = useLoaderData11(), inputStyle = {
    padding: "8px 12px",
    border: "1px solid var(--mantine-color-default-border)",
    borderRadius: 4,
    fontSize: 14,
    background: "var(--mantine-color-body)",
    color: "var(--mantine-color-text)"
  };
  return /* @__PURE__ */ jsxDEV16(Stack13, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV16(Group13, { justify: "space-between", align: "end", children: [
      /* @__PURE__ */ jsxDEV16(Title14, { order: 2, children: [
        "\u6211\u7684\u6536\u85CF (",
        rows.length,
        ")"
      ] }, void 0, !0, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16(
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
    /* @__PURE__ */ jsxDEV16("form", { method: "get", style: { display: "contents" }, children: [
      /* @__PURE__ */ jsxDEV16("input", { type: "hidden", name: "folder", value: folder }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 109,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16(Group13, { children: [
        /* @__PURE__ */ jsxDEV16(
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
        /* @__PURE__ */ jsxDEV16("select", { name: "sort", defaultValue: sort, style: inputStyle, children: [
          /* @__PURE__ */ jsxDEV16("option", { value: "rating_desc", children: "\u8A55\u5206\u7531\u9AD8\u5230\u4F4E" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV16("option", { value: "followers_desc", children: "\u7C89\u7D72\u7531\u9AD8\u5230\u4F4E" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV16("option", { value: "name_asc", children: "\u540D\u7A31 A-Z" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 120,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV16("button", { type: "submit", style: { ...inputStyle, cursor: "pointer", background: "var(--mantine-color-blue-filled)", color: "#fff", border: "none", fontWeight: 600 }, children: "\u5957\u7528" }, void 0, !1, {
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
    /* @__PURE__ */ jsxDEV16(Group13, { children: [
      allFolders.map((f) => /* @__PURE__ */ jsxDEV16(
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
      /* @__PURE__ */ jsxDEV16(
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
    rows.length === 0 ? /* @__PURE__ */ jsxDEV16(Card13, { withBorder: !0, p: "xl", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxDEV16(Text13, { size: "48px", children: "\u{1F4C2}" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 160,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16(Title14, { order: 3, children: "\u6B64\u8CC7\u6599\u593E\u5C1A\u7121 KOL" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16(Text13, { c: "dimmed", mb: "md", children: "\u8ACB\u5207\u63DB\u8CC7\u6599\u593E\uFF0C\u6216\u524D\u5F80 KOL \u9801\u9762\u52A0\u5165\u6536\u85CF" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16(Button13, { component: Link12, to: "/kols", children: "\u700F\u89BD KOL" }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 163,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.favorites.tsx",
      lineNumber: 159,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV16(SimpleGrid10, { cols: { base: 1, md: 2, lg: 3, xl: 4 }, spacing: 24, children: rows.map((kol) => /* @__PURE__ */ jsxDEV16(Card13, { withBorder: !0, className: "kol-card", children: [
      /* @__PURE__ */ jsxDEV16(Stack13, { align: "center", gap: 6, children: [
        /* @__PURE__ */ jsxDEV16(Avatar8, { src: kol.avatarUrl, size: 72, radius: 999 }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 170,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV16(Text13, { fw: 600, children: kol.displayName }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 171,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV16(Text13, { size: "sm", c: "dimmed", children: [
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
      /* @__PURE__ */ jsxDEV16(Stack13, { mt: "sm", gap: 4, children: [
        /* @__PURE__ */ jsxDEV16(Text13, { size: "sm", children: [
          "IG ",
          (kol.social?.instagram ?? kol.followers ?? 0).toLocaleString()
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 176,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV16(Text13, { size: "sm", children: [
          "YT ",
          (kol.social?.youtube ?? 0).toLocaleString()
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 177,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV16(Text13, { size: "sm", children: [
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
      /* @__PURE__ */ jsxDEV16(Group13, { gap: 6, mt: "sm", children: (kol.tags ?? kol.categories).slice(0, 3).map((tag) => /* @__PURE__ */ jsxDEV16(Badge7, { variant: "light", radius: "xl", children: tag }, tag, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 183,
        columnNumber: 19
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_app.favorites.tsx",
        lineNumber: 181,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV16(Box9, { mt: "sm", children: [
        /* @__PURE__ */ jsxDEV16(Text13, { size: "xs", c: "dimmed", mb: 4, children: "\u79FB\u81F3\u8CC7\u6599\u593E\uFF1A" }, void 0, !1, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 189,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV16(Group13, { gap: 4, children: ["\u5BB6\u96FB\u5C08\u6848", "\u7F8E\u599D\u5C08\u6848"].map((f) => /* @__PURE__ */ jsxDEV16(
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
      /* @__PURE__ */ jsxDEV16(Group13, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ jsxDEV16(Text13, { children: [
          "\u2B50 ",
          (kol.rating ?? 0).toFixed(1)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.favorites.tsx",
          lineNumber: 211,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV16(Group13, { gap: "xs", children: [
          /* @__PURE__ */ jsxDEV16(Link12, { to: `/kols/${kol.id}`, style: { fontSize: 14 }, children: "\u67E5\u770B\u8A73\u7D30" }, void 0, !1, {
            fileName: "app/routes/_app.favorites.tsx",
            lineNumber: 213,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV16(Form8, { method: "post", style: { margin: 0 }, children: [
            /* @__PURE__ */ jsxDEV16("input", { type: "hidden", name: "intent", value: "removeFavorite" }, void 0, !1, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 215,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV16("input", { type: "hidden", name: "kolId", value: kol.id }, void 0, !1, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 216,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV16(
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
    /* @__PURE__ */ jsxDEV16(
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
          /* @__PURE__ */ jsxDEV16(Group13, { justify: "space-between", mb: "md", children: [
            /* @__PURE__ */ jsxDEV16(Title14, { order: 4, children: "\u65B0\u589E\u8CC7\u6599\u593E" }, void 0, !1, {
              fileName: "app/routes/_app.favorites.tsx",
              lineNumber: 253,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV16(
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
          /* @__PURE__ */ jsxDEV16(Stack13, { gap: "md", children: [
            /* @__PURE__ */ jsxDEV16("div", { children: [
              /* @__PURE__ */ jsxDEV16("label", { style: { display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }, children: "\u8CC7\u6599\u593E\u540D\u7A31" }, void 0, !1, {
                fileName: "app/routes/_app.favorites.tsx",
                lineNumber: 264,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV16(
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
            /* @__PURE__ */ jsxDEV16(Group13, { justify: "flex-end", children: [
              /* @__PURE__ */ jsxDEV16(
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
              /* @__PURE__ */ jsxDEV16(
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
  action: () => action10,
  default: () => KolCreatePage
});
import {
  Alert as Alert5,
  Avatar as Avatar9,
  Box as Box10,
  Button as Button14,
  Card as Card14,
  Divider as Divider8,
  Group as Group14,
  Radio as Radio3,
  Select as Select6,
  SimpleGrid as SimpleGrid11,
  Stack as Stack14,
  Text as Text14,
  TextInput as TextInput10,
  Textarea as Textarea7,
  Title as Title15
} from "@mantine/core";
import { json as json15, redirect as redirect8 } from "@remix-run/node";
import { Form as Form9, Link as Link13, useActionData as useActionData5, useNavigation as useNavigation5 } from "@remix-run/react";
import { useState as useState10 } from "react";
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
function parseHandle(url) {
  let raw = url.trim();
  if (!raw)
    return "";
  let parts = raw.split("/").filter(Boolean);
  return (parts[parts.length - 1] ?? "").replace("@", "");
}
async function action10({ request }) {
  let formData = await request.formData(), intent = String(formData.get("intent") ?? "create"), displayName = String(formData.get("displayName") ?? "").trim(), gender = String(formData.get("gender") ?? "\u5176\u4ED6"), age = Number(formData.get("age") ?? 0), phone = String(formData.get("contactPhone") ?? "").trim(), email = String(formData.get("email") ?? "").trim(), tagsRaw = String(formData.get("tagsInput") ?? ""), socialsRaw = String(formData.get("socialsJson") ?? "[]"), avatarUrl = String(formData.get("avatarUrl") ?? "").trim(), description = String(formData.get("description") ?? "").trim(), internalComments = String(formData.get("internalComments") ?? "").trim(), paymentMethod = formData.get("paymentMethod"), engagementRate = Number(formData.get("engagementRate") ?? 0), exposureRate = Number(formData.get("exposureRate") ?? 0), audienceMale = Number(formData.get("audienceMale") ?? 0), audienceFemale = Number(formData.get("audienceFemale") ?? 100 - audienceMale), audienceAge = String(formData.get("audienceAge") ?? "").trim(), introduction = String(formData.get("introduction") ?? "").trim();
  if (!displayName)
    return json15({ error: "KOL \u540D\u7A31\u70BA\u5FC5\u586B" }, { status: 400 });
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
    engagementRate,
    exposureRate,
    audienceGender: { male: audienceMale, female: audienceFemale },
    audienceAge,
    introduction,
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
    status: intent === "draft" ? "draft" : "active",
    paymentMethod: paymentMethod || void 0
  }, res = await fetch(`${MOCK_API_BASE}/kols`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok)
    return json15({ error: "\u5EFA\u7ACB\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66" }, { status: 500 });
  let created = await res.json();
  return redirect8(`/kols/${created.id}`);
}
function KolCreatePage() {
  let actionData = useActionData5(), submitting = useNavigation5().state === "submitting", [socials, setSocials] = useState10([
    { id: "s0", platform: "Instagram", url: "", followers: null }
  ]), addSocial = () => {
    socials.length >= 8 || setSocials([...socials, { id: "s" + Date.now(), platform: "Instagram", url: "", followers: null }]);
  }, removeSocial = (id) => {
    socials.length <= 1 || setSocials(socials.filter((s) => s.id !== id));
  }, updateSocial = (id, key, value) => {
    setSocials(socials.map((s) => s.id === id ? { ...s, [key]: value } : s));
  }, fetchFollowers = async (id, platform, url) => {
    if (!url) {
      alert("\u8ACB\u5148\u8F38\u5165\u793E\u7FA4\u5E33\u865F URL");
      return;
    }
    try {
      let r = await fetch(`/api/social-followers?platform=${encodeURIComponent(platform)}&url=${encodeURIComponent(url)}`), data = await r.json();
      r.ok && data.followers ? updateSocial(id, "followers", data.followers) : alert(data.error || "\u53D6\u5F97\u8FFD\u8E64\u6578\u5931\u6557");
    } catch {
      alert("\u53D6\u5F97\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66");
    }
  }, [avatarPreview, setAvatarPreview] = useState10(void 0);
  return /* @__PURE__ */ jsxDEV17(Stack14, { gap: "md", children: [
    /* @__PURE__ */ jsxDEV17(Group14, { gap: 8, children: [
      /* @__PURE__ */ jsxDEV17(Link13, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV17(Text14, { c: "dimmed", children: ">" }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV17(Text14, { fw: 600, children: "\u65B0\u589E KOL" }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 175,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 172,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV17(Card14, { withBorder: !0, p: "lg", maw: 800, mx: "auto", w: "100%", children: /* @__PURE__ */ jsxDEV17(Form9, { method: "post", children: /* @__PURE__ */ jsxDEV17(Stack14, { gap: "xl", children: [
      /* @__PURE__ */ jsxDEV17(Box10, { children: [
        /* @__PURE__ */ jsxDEV17(Title15, { order: 3, mb: "md", children: "KOL \u57FA\u672C\u8CC7\u6599" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 183,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17(Stack14, { align: "center", mb: "lg", children: [
          /* @__PURE__ */ jsxDEV17(
            "input",
            {
              id: "avatar-file-input",
              type: "file",
              accept: "image/*",
              style: { display: "none" },
              onChange: (e) => {
                let file = e.target.files?.[0];
                if (!file)
                  return;
                let reader = new FileReader();
                reader.onload = () => {
                  setAvatarPreview(reader.result);
                }, reader.readAsDataURL(file);
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 187,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17("input", { type: "hidden", name: "avatarUrl", value: avatarPreview || "" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(
            "div",
            {
              style: { width: 220, border: "1px dashed #94a3b8", borderRadius: 16, padding: 20, cursor: "pointer", textAlign: "center" },
              onClick: () => document.getElementById("avatar-file-input")?.click(),
              onDragOver: (e) => e.preventDefault(),
              children: /* @__PURE__ */ jsxDEV17(Stack14, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ jsxDEV17(Avatar9, { src: avatarPreview, radius: 999, size: 96 }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 201,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV17(Text14, { fw: 700, children: "\u2191" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 202,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", children: "\u9EDE\u64CA\u4E0A\u50B3 KOL \u7167\u7247" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 203,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV17(Text14, { size: "xs", c: "dimmed", children: "\u652F\u63F4\u62D6\u62C9\u4E0A\u50B3" }, void 0, !1, {
                  fileName: "app/routes/_app.kols.new.tsx",
                  lineNumber: 204,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 200,
                columnNumber: 19
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 195,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 186,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17(SimpleGrid11, { cols: { base: 1, sm: 2 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV17(TextInput10, { label: "KOL \u540D\u7A31 *", name: "displayName", placeholder: "\u4F8B\u5982\uFF1AGina", required: !0 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 210,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(Box10, { children: [
            /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", fw: 500, mb: 6, children: "\u6027\u5225" }, void 0, !1, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 213,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV17(Radio3.Group, { name: "gender", defaultValue: "\u5973", children: /* @__PURE__ */ jsxDEV17(Group14, { mt: "xs", children: [
              /* @__PURE__ */ jsxDEV17(Radio3, { value: "\u7537", label: "\u7537" }, void 0, !1, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 216,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV17(Radio3, { value: "\u5973", label: "\u5973" }, void 0, !1, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 217,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV17(Radio3, { value: "\u5176\u4ED6", label: "\u5176\u4ED6" }, void 0, !1, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 218,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 215,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 214,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 212,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(TextInput10, { label: "\u5E74\u9F61", name: "age", type: "number", min: 0, max: 100 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 223,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(TextInput10, { label: "\u806F\u7D61\u65B9\u5F0F", name: "contactPhone", placeholder: "09xx-xxx-xxx" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(TextInput10, { label: "Email", name: "email", type: "email", placeholder: "manager@example.com" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(Box10, { children: [
            /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", fw: 500, mb: 6, children: "\u8ACB\u6B3E\u65B9\u5F0F" }, void 0, !1, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 228,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV17(Radio3.Group, { name: "paymentMethod", children: /* @__PURE__ */ jsxDEV17(Group14, { mt: "xs", children: [
              /* @__PURE__ */ jsxDEV17(Radio3, { value: "\u52DE\u5831", label: "\u52DE\u5831" }, void 0, !1, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 231,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV17(Radio3, { value: "\u767C\u7968", label: "\u767C\u7968" }, void 0, !1, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 232,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 230,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 229,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 227,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 209,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17(Box10, { mt: "md", children: [
          /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", fw: 500, mb: 4, children: "KOL \u6A19\u7C64\uFF08\u9017\u865F\u5206\u9694\uFF09" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 239,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(
            TextInput10,
            {
              name: "tagsInput",
              defaultValue: "\u6BCD\u5B30,\u89AA\u5B50,\u65C5\u904A",
              placeholder: "\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 240,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(Text14, { size: "xs", c: "dimmed", mt: 4, children: "\u7528\u9017\u865F\u5206\u9694\u591A\u500B\u6A19\u7C64\uFF0C\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 245,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 238,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 182,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV17(Divider8, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 249,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV17(Box10, { children: [
        /* @__PURE__ */ jsxDEV17(Title15, { order: 3, mb: "md", children: "\u7D93\u71DF\u7684\u793E\u7FA4\u5E73\u53F0" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 253,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17("div", { id: "social-rows", children: socials.map((item, idx) => /* @__PURE__ */ jsxDEV17("div", { style: { border: "1px solid var(--mantine-color-default-border)", borderRadius: "8px", padding: "12px", marginTop: "10px" }, children: /* @__PURE__ */ jsxDEV17("div", { style: { display: "grid", gridTemplateColumns: "1fr 2fr 1fr 80px 36px", gap: "8px", alignItems: "flex-end" }, children: [
          /* @__PURE__ */ jsxDEV17(
            Select6,
            {
              label: "\u5E73\u53F0",
              data: ["Instagram", "YouTube", "TikTok", "Facebook", "Twitter", "LINE"],
              value: item.platform,
              onChange: (val) => updateSocial(item.id, "platform", val),
              size: "sm"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 258,
              columnNumber: 23
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(
            TextInput10,
            {
              label: "\u5E33\u865F URL",
              value: item.url,
              onChange: (e) => updateSocial(item.id, "url", e.target.value),
              placeholder: "https://instagram.com/username",
              size: "sm"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 265,
              columnNumber: 23
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(Box10, { style: { display: "flex", flexDirection: "column", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxDEV17(
            Button14,
            {
              variant: "default",
              size: "sm",
              onClick: () => fetchFollowers(item.id, item.platform, item.url),
              disabled: !item.url,
              children: "\u53D6\u5F97\u8FFD\u8E64\u6578"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 273,
              columnNumber: 25
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 272,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV17(
            TextInput10,
            {
              label: "\u8FFD\u8E64\u6578",
              readOnly: !0,
              value: item.followers ? item.followers.toLocaleString() : "-",
              size: "sm",
              c: "dimmed"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 282,
              columnNumber: 23
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(Box10, { style: { display: "flex", alignItems: "flex-end", paddingBottom: "2px" }, children: idx !== 0 && /* @__PURE__ */ jsxDEV17(
            Button14,
            {
              color: "red",
              variant: "light",
              onClick: () => removeSocial(item.id),
              style: { width: 36, height: 36, padding: 0 },
              children: "\xD7"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 291,
              columnNumber: 27
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 289,
            columnNumber: 23
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 257,
          columnNumber: 21
        }, this) }, item.id, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 256,
          columnNumber: 19
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 254,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17("input", { type: "hidden", name: "socialsJson", value: JSON.stringify(socials.map((s) => ({ platform: s.platform, url: s.url, followers: s.followers }))) }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 305,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17(Group14, { mt: "md", children: /* @__PURE__ */ jsxDEV17(Button14, { variant: "default", onClick: addSocial, disabled: socials.length >= 8, children: "+ \u65B0\u589E\u793E\u7FA4\u5E73\u53F0" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 307,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 306,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 252,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV17(Divider8, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 313,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV17(Divider8, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 315,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV17(Box10, { children: [
        /* @__PURE__ */ jsxDEV17(Title15, { order: 3, mb: "md", children: "\u53D7\u773E\u6578\u64DA\u8207\u6307\u6A19" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 319,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17(SimpleGrid11, { cols: { base: 1, sm: 2 }, spacing: "md", children: [
          /* @__PURE__ */ jsxDEV17(
            TextInput10,
            {
              label: "\u4E92\u52D5\u7387 (%)",
              name: "engagementRate",
              type: "number",
              step: "0.01",
              placeholder: "\u4F8B\u5982\uFF1A4.5"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 321,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(
            TextInput10,
            {
              label: "\u66DD\u5149\u7387 (%)",
              name: "exposureRate",
              type: "number",
              step: "0.01",
              placeholder: "\u4F8B\u5982\uFF1A12.5"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 328,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(Box10, { children: [
            /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", fw: 500, mb: 4, children: "\u53D7\u773E\u6027\u5225\u6BD4 (\u7537 %)" }, void 0, !1, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 336,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV17(
              TextInput10,
              {
                name: "audienceMale",
                type: "number",
                placeholder: "\u4F8B\u5982\uFF1A30",
                onChange: (e) => {
                  let val = Number(e.target.value), fInput = document.getElementsByName("audienceFemale")[0];
                  fInput && (fInput.value = String(Math.max(0, 100 - val)));
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 337,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 335,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(Box10, { children: [
            /* @__PURE__ */ jsxDEV17(Text14, { size: "sm", fw: 500, mb: 4, children: "\u53D7\u773E\u6027\u5225\u6BD4 (\u5973 %)" }, void 0, !1, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 349,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV17(
              TextInput10,
              {
                name: "audienceFemale",
                type: "number",
                placeholder: "\u4F8B\u5982\uFF1A70",
                onChange: (e) => {
                  let val = Number(e.target.value), mInput = document.getElementsByName("audienceMale")[0];
                  mInput && (mInput.value = String(Math.max(0, 100 - val)));
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 350,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 348,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(
            TextInput10,
            {
              label: "\u4E3B\u8981\u53D7\u773E\u5E74\u9F61\u5C64",
              name: "audienceAge",
              placeholder: "\u4F8B\u5982\uFF1A18-24, 25-34"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 361,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 320,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 318,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV17(Divider8, {}, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 369,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV17(Box10, { children: [
        /* @__PURE__ */ jsxDEV17(Title15, { order: 3, mb: "md", children: "\u63D0\u6848\u8207\u8A55\u4F30\u8CC7\u6599" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 373,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17(Stack14, { children: [
          /* @__PURE__ */ jsxDEV17(
            Textarea7,
            {
              label: "\u4EBA\u9078\u4ECB\u7D39",
              name: "introduction",
              placeholder: "\u63CF\u8FF0\u6B64 KOL \u7684\u98A8\u683C\u7279\u8272\u3001\u53D7\u773E\u9ECF\u8457\u5EA6\u3001\u9069\u5408\u63A8\u5EE3\u7684\u7522\u54C1\u7B49\uFF0C\u9019\u5C07\u5E6B\u52A9\u696D\u52D9\u5FEB\u901F\u64B0\u5BEB\u63D0\u6848\u5167\u5BB9",
              minRows: 5
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 375,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17(Textarea7, { label: "\u63CF\u8FF0", name: "description", placeholder: "KOL \u5167\u5BB9\u98A8\u683C\u3001\u64C5\u9577\u4E3B\u984C\u3001\u5408\u4F5C\u4EAE\u9EDE", minRows: 4 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 381,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(Textarea7, { label: "\u5167\u90E8\u5099\u8A3B", name: "internalComments", placeholder: "\u50C5\u5167\u90E8\u53EF\u898B\uFF0C\u4F8B\u5982\u5831\u50F9\u504F\u597D\u3001\u6E9D\u901A\u6CE8\u610F\u4E8B\u9805", minRows: 3 }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 382,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 374,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 372,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV17(Alert5, { color: "red", title: "\u5EFA\u7ACB\u5931\u6557", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 387,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV17(Group14, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ jsxDEV17(Button14, { component: Link13, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, !1, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 391,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17(Group14, { children: [
          /* @__PURE__ */ jsxDEV17(Button14, { type: "submit", name: "intent", value: "draft", variant: "default", loading: submitting, children: "\u5132\u5B58\u8349\u7A3F" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 393,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV17(Button14, { type: "submit", name: "intent", value: "create", loading: submitting, children: "\u5EFA\u7ACB KOL" }, void 0, !1, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 394,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 392,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 390,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 180,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 179,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.kols.new.tsx",
    lineNumber: 171,
    columnNumber: 5
  }, this);
}

// app/routes/_app.settings.tsx
var app_settings_exports = {};
__export(app_settings_exports, {
  action: () => action11,
  default: () => SettingsRoute,
  loader: () => loader14
});
import {
  ActionIcon as ActionIcon4,
  Avatar as Avatar10,
  Badge as Badge8,
  Box as Box11,
  Button as Button15,
  Card as Card15,
  Divider as Divider9,
  Grid as Grid3,
  Group as Group15,
  Modal as Modal6,
  Stack as Stack15,
  Table as Table4,
  Text as Text15,
  TextInput as TextInput11,
  Title as Title16,
  ScrollArea
} from "@mantine/core";
import { json as json16, redirect as redirect9 } from "@remix-run/node";
import { Form as Form10, Link as Link14, useLoaderData as useLoaderData12, useSubmit as useSubmit3 } from "@remix-run/react";
import { useMemo as useMemo4, useState as useState11 } from "react";
import { IconPencil as IconPencil4, IconPlus, IconTrash as IconTrash5, IconX as IconX4, IconCheck as IconCheck4 } from "@tabler/icons-react";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
function normalizeTagList(tags) {
  return Array.from(new Set(tags.map((t) => t.trim()).filter(Boolean))).sort();
}
function updateTagList(tags, oldName, newName) {
  let set = new Set(tags);
  return set.delete(oldName), newName && set.add(newName), Array.from(set);
}
function getPrimaryTags2(kol) {
  return Array.isArray(kol.tags) ? kol.tags : Array.isArray(kol.categories) ? kol.categories : [];
}
var PILL_COLORS = ["blue", "cyan", "grape", "indigo", "violet", "teal"], EDITABLE_TAG_GROUP = "tags", GROUP_OPTIONS = ["AE", "KOL", "Tech", "Media", "\u5176\u4ED6"];
async function loader14({ request }) {
  let url = new URL(request.url), tab = url.searchParams.get("tab") ?? "clients", q = url.searchParams.get("q") ?? "", [kols, tagCatalog, brandCatalog, industryCatalog, platformCatalog, teamMembers] = await Promise.all([
    listKols(),
    listTagCatalog(),
    listBrandCatalog(),
    listIndustryCatalog(),
    listPlatformCatalog(),
    listTeamMembers()
  ]), brands = Array.from(/* @__PURE__ */ new Set([
    ...brandCatalog.map((b) => b.name),
    ...kols.map((k) => k.tags?.find((t) => brandCatalog.some((bc) => bc.name === t)) || "").filter(Boolean)
  ])).map((name) => ({
    id: brandCatalog.find((bc) => bc.name === name)?.id || `brand-${name}`,
    name,
    activeProjects: Math.floor(Math.random() * 5)
  })), filteredBrands = q ? brands.filter((b) => b.name.toLowerCase().includes(q.toLowerCase())) : brands, catalogTags = tagCatalog.map((t) => t.name), kolTags = kols.flatMap((k) => getPrimaryTags2(k)), tagsAll = normalizeTagList([...catalogTags, ...kolTags]), catalogIndustries = industryCatalog.map((i) => i.name), industries = normalizeTagList([
    ...catalogIndustries,
    ...kols.map((k) => k.industry ?? "").filter(Boolean)
  ]), catalogPlatforms = platformCatalog.map((p) => p.name), platforms = normalizeTagList([
    ...catalogPlatforms,
    ...kols.map((k) => k.platform ?? "").filter(Boolean)
  ]);
  return json16({
    tab,
    q,
    filteredBrands,
    tagGroups: [
      {
        id: "tags",
        name: "\u5167\u5BB9\u6A19\u7C64",
        description: "KOL \u500B\u4EBA\u7279\u8CEA\u8207\u5167\u5BB9\u985E\u578B\uFF0C\u8207 KOL/\u63D0\u6848\u7BE9\u9078\u540C\u6B65\u3002",
        tags: tagsAll,
        editable: !0
      },
      {
        id: "industries",
        name: "\u7522\u696D\u985E\u5225",
        description: "\u7531 KOL \u7522\u696D\u6B04\u4F4D\u5F59\u6574\uFF0C\u4FDD\u6301\u8207\u8CC7\u6599\u4E00\u81F4\u3002",
        tags: industries,
        editable: !0
      },
      {
        id: "platforms",
        name: "\u5E73\u53F0\u504F\u597D",
        description: "\u7531 KOL \u5E73\u53F0\u6B04\u4F4D\u5F59\u6574\uFF0C\u7528\u65BC\u5E73\u53F0\u7BE9\u9078\u3002",
        tags: platforms,
        editable: !0
      }
    ],
    teamMembers,
    currentUserRole: "admin"
  });
}
async function action11({ request }) {
  let formData = await request.formData(), intent = String(formData.get("intent") ?? ""), url = new URL(request.url);
  if (intent.startsWith("brand.")) {
    if (intent === "brand.add") {
      let name = String(formData.get("name") ?? "").trim();
      return name && await addBrandCatalog({ name }), redirect9(url.pathname + "?tab=clients");
    }
    if (intent === "brand.edit") {
      let id = String(formData.get("id") ?? ""), name = String(formData.get("name") ?? "").trim();
      return id && name && await updateBrandCatalog(id, { name }), redirect9(url.pathname + "?tab=clients");
    }
    if (intent === "brand.delete") {
      let id = String(formData.get("id") ?? "");
      return id && await deleteBrandCatalog(id), redirect9(url.pathname + "?tab=clients");
    }
  }
  if (intent.startsWith("tag.")) {
    let groupId = String(formData.get("groupId") ?? "tags"), [tagCatalog, industryCatalog, platformCatalog] = await Promise.all([
      listTagCatalog(),
      listIndustryCatalog(),
      listPlatformCatalog()
    ]);
    if (intent === "tag.add") {
      let name = String(formData.get("name") ?? "").trim();
      return name ? (groupId === "tags" ? await addTagCatalog({ name }) : groupId === "industries" ? await addIndustryCatalog({ name }) : groupId === "platforms" && await addPlatformCatalog({ name }), redirect9(url.pathname + "?tab=tags")) : redirect9(url.pathname + "?tab=tags");
    }
    if (intent === "tag.rename") {
      let oldName = String(formData.get("oldName") ?? "").trim(), newName = String(formData.get("newName") ?? "").trim();
      if (!oldName || !newName)
        return redirect9(url.pathname + "?tab=tags");
      let allKols = await listKols();
      if (await Promise.all(
        allKols.map(async (kol) => {
          if (groupId === "tags") {
            let tags = getPrimaryTags2(kol);
            if (!tags.includes(oldName))
              return;
            let nextTags = updateTagList(tags, oldName, newName);
            await updateKol(kol.id, { tags: nextTags, categories: nextTags });
          } else
            groupId === "industries" ? kol.industry === oldName && await updateKol(kol.id, { industry: newName }) : groupId === "platforms" && kol.platform === oldName && await updateKol(kol.id, { platform: newName });
        })
      ), groupId === "tags") {
        let item = tagCatalog.find((t) => t.name === oldName);
        item ? await updateTagCatalog(item.id, { name: newName }) : await addTagCatalog({ name: newName });
      } else if (groupId === "industries") {
        let item = industryCatalog.find((i) => i.name === oldName);
        item ? await updateIndustryCatalog(item.id, { name: newName }) : await addIndustryCatalog({ name: newName });
      } else if (groupId === "platforms") {
        let item = platformCatalog.find((p) => p.name === oldName);
        item ? await updatePlatformCatalog(item.id, { name: newName }) : await addPlatformCatalog({ name: newName });
      }
      return redirect9(url.pathname + "?tab=tags");
    }
    if (intent === "tag.delete") {
      let name = String(formData.get("name") ?? "").trim();
      if (!name)
        return redirect9(url.pathname + "?tab=tags");
      let allKols = await listKols();
      if (await Promise.all(
        allKols.map(async (kol) => {
          if (groupId === "tags") {
            let tags = getPrimaryTags2(kol);
            if (!tags.includes(name))
              return;
            let nextTags = updateTagList(tags, name, null);
            await updateKol(kol.id, { tags: nextTags, categories: nextTags });
          } else
            groupId === "industries" ? kol.industry === name && await updateKol(kol.id, { industry: "\u672A\u5206\u985E" }) : groupId === "platforms" && kol.platform === name && await updateKol(kol.id, { platform: "\u5176\u4ED6" });
        })
      ), groupId === "tags") {
        let item = tagCatalog.find((t) => t.name === name);
        item && await deleteTagCatalog(item.id);
      } else if (groupId === "industries") {
        let item = industryCatalog.find((i) => i.name === name);
        item && await deleteIndustryCatalog(item.id);
      } else if (groupId === "platforms") {
        let item = platformCatalog.find((p) => p.name === name);
        item && await deletePlatformCatalog(item.id);
      }
      return redirect9(url.pathname + "?tab=tags");
    }
  }
  if (intent.startsWith("member.")) {
    if (intent === "member.add") {
      let name = String(formData.get("name") ?? "").trim(), email = String(formData.get("email") ?? "").trim(), role = String(formData.get("role") ?? "member"), group = String(formData.get("group") ?? "\u5176\u4ED6");
      return name && email && await addTeamMember({ name, email, role, group }), redirect9(url.pathname + "?tab=roles");
    }
    if (intent === "member.update") {
      let id = String(formData.get("id") ?? "").trim(), name = String(formData.get("name") ?? "").trim(), email = String(formData.get("email") ?? "").trim(), role = String(formData.get("role") ?? "member"), group = String(formData.get("group") ?? "\u5176\u4ED6");
      return id && await updateTeamMember(id, { name, email, role, group }), redirect9(url.pathname + "?tab=roles");
    }
    if (intent === "member.delete") {
      let id = String(formData.get("id") ?? "").trim();
      return id && await deleteTeamMember(id), redirect9(url.pathname + "?tab=roles");
    }
  }
  return redirect9(url.pathname + `?tab=${tabFallback(intent)}`);
}
function tabFallback(intent) {
  return intent.startsWith("tag.") ? "tags" : intent.startsWith("member.") ? "roles" : (intent.startsWith("brand."), "clients");
}
function SettingsRoute() {
  let submit = useSubmit3(), { tab, q, filteredBrands, tagGroups, teamMembers, currentUserRole } = useLoaderData12(), [selectedGroupId, setSelectedGroupId] = useState11(
    () => tagGroups[0]?.id ?? EDITABLE_TAG_GROUP
  ), selectedGroup = useMemo4(
    () => tagGroups.find((g) => g.id === selectedGroupId) ?? tagGroups[0],
    [tagGroups, selectedGroupId]
  ), [isEditingTags, setIsEditingTags] = useState11(!1), [newTagValue, setNewTagValue] = useState11(""), [tagModalOpened, setTagModalOpened] = useState11(!1), [tagModalMode, setTagModalMode] = useState11("add"), [activeTagValue, setActiveTagValue] = useState11(""), [draftTagValue, setDraftTagValue] = useState11(""), [brandModalOpened, setBrandModalOpened] = useState11(!1), [activeBrand, setActiveBrand] = useState11(null), [memberModalOpened, setMemberModalOpened] = useState11(!1), [activeMember, setActiveMember] = useState11(null), [groupFilter, setGroupFilter] = useState11("all"), isAdmin = currentUserRole === "admin", groupOrder = {
    AE: 1,
    KOL: 2,
    Tech: 3,
    Media: 4,
    \u5176\u4ED6: 5
  }, filteredMembers = teamMembers.filter((m) => groupFilter === "all" ? !0 : m.group === groupFilter).sort((a, b) => {
    let orderDiff = (groupOrder[a.group] ?? 9) - (groupOrder[b.group] ?? 9);
    return orderDiff !== 0 ? orderDiff : a.name.localeCompare(b.name, "zh-Hant");
  }), tabStyle = (value) => ({
    padding: "10px 16px",
    borderBottom: tab === value ? "2px solid var(--mantine-color-blue-filled)" : "2px solid transparent",
    color: tab === value ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    textDecoration: "none",
    fontWeight: tab === value ? 600 : 500,
    fontSize: 14,
    display: "inline-block",
    transition: "border-color 150ms ease, color 150ms ease"
  });
  return /* @__PURE__ */ jsxDEV18(Stack15, { gap: "lg", children: [
    /* @__PURE__ */ jsxDEV18(Stack15, { gap: 4, children: [
      /* @__PURE__ */ jsxDEV18(Title16, { order: 2, children: "\u7CFB\u7D71\u8A2D\u5B9A" }, void 0, !1, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 363,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV18(Text15, { c: "dimmed", children: "\u7BA1\u7406\u54C1\u724C\u3001\u6A19\u7C64\u3001\u6B0A\u9650\u8207\u7CFB\u7D71\u504F\u597D\u8A2D\u5B9A\u3002\u5404\u5206\u9801\u5C07\u81EA\u52D5\u8207\u76EE\u524D\u8CC7\u6599\u540C\u6B65\u66F4\u65B0\u3002" }, void 0, !1, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 364,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 362,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18(Card15, { withBorder: !0, radius: "lg", p: 0, style: { overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxDEV18(
        "div",
        {
          style: {
            display: "flex",
            borderBottom: "1px solid var(--mantine-color-default-border)",
            background: "var(--mantine-color-body)",
            padding: "0 16px"
          },
          children: [
            /* @__PURE__ */ jsxDEV18(Link14, { to: "/settings?tab=clients", style: tabStyle("clients"), children: "\u54C1\u724C\u7BA1\u7406" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 378,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV18(Link14, { to: "/settings?tab=tags", style: tabStyle("tags"), children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 381,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV18(Link14, { to: "/settings?tab=roles", style: tabStyle("roles"), children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 384,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 370,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV18(Box11, { p: "lg", children: [
        tab === "clients" && /* @__PURE__ */ jsxDEV18(Box11, { children: [
          /* @__PURE__ */ jsxDEV18(Group15, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ jsxDEV18(Stack15, { gap: 2, children: [
              /* @__PURE__ */ jsxDEV18(Title16, { order: 3, children: "\u54C1\u724C\u7BA1\u7406" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 394,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", c: "dimmed", children: "\u96C6\u4E2D\u7BA1\u7406\u54C1\u724C\u8207\u5BA2\u6236\u8CC7\u8A0A\uFF0C\u652F\u63F4\u7DE8\u8F2F\u8207\u5FEB\u901F\u7DAD\u8B77\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 395,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 393,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV18(
              Button15,
              {
                leftSection: /* @__PURE__ */ jsxDEV18(IconPlus, { size: 16 }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 400,
                  columnNumber: 32
                }, this),
                onClick: () => {
                  setActiveBrand(null), setBrandModalOpened(!0);
                },
                children: "\u65B0\u589E\u54C1\u724C"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 399,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 392,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(Group15, { mt: "md", align: "center", justify: "space-between", wrap: "nowrap", children: [
            /* @__PURE__ */ jsxDEV18(Form10, { method: "get", action: "/settings", style: { flex: 1, display: "flex", gap: 8 }, children: [
              /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "tab", value: "clients" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 412,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV18(
                TextInput11,
                {
                  name: "q",
                  defaultValue: q,
                  placeholder: "\u641C\u5C0B\u54C1\u724C\u540D\u7A31\uFF08\u6309 Enter \u641C\u5C0B\uFF09",
                  style: { flex: 1 }
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 413,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV18(Button15, { type: "submit", children: "\u641C\u5C0B" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 419,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 411,
              columnNumber: 17
            }, this),
            q && /* @__PURE__ */ jsxDEV18(Button15, { variant: "default", component: Link14, to: "/settings?tab=clients", children: "\u6E05\u9664" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 422,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 410,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(ScrollArea, { h: 500, offsetScrollbars: !0, mt: "lg", children: /* @__PURE__ */ jsxDEV18(Table4, { withTableBorder: !0, verticalSpacing: "md", children: [
            /* @__PURE__ */ jsxDEV18(Table4.Thead, { children: /* @__PURE__ */ jsxDEV18(Table4.Tr, { children: [
              /* @__PURE__ */ jsxDEV18(Table4.Th, { w: 80, children: "Logo" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 432,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Th, { children: "\u54C1\u724C\u540D\u7A31" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 433,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Th, { w: 150, children: "\u6D3B\u52D5\u5C08\u6848\u6578" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 434,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Th, { w: 120, children: "\u64CD\u4F5C" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 435,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 431,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 430,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV18(Table4.Tbody, { children: [
              filteredBrands.map((brand) => /* @__PURE__ */ jsxDEV18(Table4.Tr, { children: [
                /* @__PURE__ */ jsxDEV18(Table4.Td, { children: /* @__PURE__ */ jsxDEV18(Avatar10, { radius: "xl", color: "blue", children: brand.name.slice(0, 1).toUpperCase() }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 442,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 441,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV18(Table4.Td, { children: /* @__PURE__ */ jsxDEV18(Text15, { fw: 600, children: brand.name }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 447,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 446,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV18(Table4.Td, { children: /* @__PURE__ */ jsxDEV18(Badge8, { variant: "light", color: "gray", children: [
                  brand.activeProjects,
                  " \u500B\u5C08\u6848"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 450,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 449,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV18(Table4.Td, { children: /* @__PURE__ */ jsxDEV18(Group15, { gap: "xs", children: [
                  /* @__PURE__ */ jsxDEV18(
                    ActionIcon4,
                    {
                      variant: "light",
                      color: "blue",
                      onClick: () => {
                        setActiveBrand({ id: brand.id, name: brand.name }), setBrandModalOpened(!0);
                      },
                      children: /* @__PURE__ */ jsxDEV18(IconPencil4, { size: 14 }, void 0, !1, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 462,
                        columnNumber: 31
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 454,
                      columnNumber: 29
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV18(Form10, { method: "post", onSubmit: (e) => {
                    window.confirm(`\u78BA\u5B9A\u8981\u522A\u9664\u54C1\u724C\u300C${brand.name}\u300D\u55CE\uFF1F`) || e.preventDefault();
                  }, children: [
                    /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "intent", value: "brand.delete" }, void 0, !1, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 465,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "id", value: brand.id }, void 0, !1, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 466,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDEV18(ActionIcon4, { variant: "light", color: "red", type: "submit", children: /* @__PURE__ */ jsxDEV18(IconTrash5, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 468,
                      columnNumber: 33
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 467,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 464,
                    columnNumber: 29
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 453,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 452,
                  columnNumber: 25
                }, this)
              ] }, brand.id, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 440,
                columnNumber: 23
              }, this)),
              filteredBrands.length === 0 && /* @__PURE__ */ jsxDEV18(Table4.Tr, { children: /* @__PURE__ */ jsxDEV18(Table4.Td, { colSpan: 4, align: "center", style: { padding: "32px 0", color: "var(--mantine-color-dimmed)" }, children: "\u627E\u4E0D\u5230\u7B26\u5408\u689D\u4EF6\u7684\u54C1\u724C" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 477,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 476,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 438,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 429,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 428,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(Modal6, { opened: brandModalOpened, onClose: () => setBrandModalOpened(!1), title: activeBrand ? "\u7DE8\u8F2F\u54C1\u724C" : "\u65B0\u589E\u54C1\u724C", children: /* @__PURE__ */ jsxDEV18(Form10, { method: "post", onSubmit: () => setBrandModalOpened(!1), children: [
            /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "intent", value: activeBrand ? "brand.edit" : "brand.add" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 488,
              columnNumber: 19
            }, this),
            activeBrand && /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "id", value: activeBrand.id }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 489,
              columnNumber: 35
            }, this),
            /* @__PURE__ */ jsxDEV18(Stack15, { children: [
              /* @__PURE__ */ jsxDEV18(TextInput11, { label: "\u54C1\u724C\u540D\u7A31", name: "name", defaultValue: activeBrand?.name || "", placeholder: "\u4F8B\u5982\uFF1APanasonic", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 491,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV18(Group15, { justify: "flex-end", children: [
                /* @__PURE__ */ jsxDEV18(Button15, { variant: "default", onClick: () => setBrandModalOpened(!1), children: "\u53D6\u6D88" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 493,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV18(Button15, { type: "submit", children: "\u5132\u5B58" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 494,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 492,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 490,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 487,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 486,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 391,
          columnNumber: 13
        }, this),
        tab === "tags" && /* @__PURE__ */ jsxDEV18(Box11, { children: [
          /* @__PURE__ */ jsxDEV18(Group15, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ jsxDEV18(Stack15, { gap: 2, children: [
              /* @__PURE__ */ jsxDEV18(Title16, { order: 3, children: "\u6A19\u7C64\u7BA1\u7406" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 506,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", c: "dimmed", children: "\u5167\u5BB9\u6A19\u7C64\u3001\u7522\u696D\u8207\u5E73\u53F0\u6703\u81EA\u52D5\u8207 KOL \u8CC7\u6599\u540C\u6B65\u66F4\u65B0\u3002\u7CFB\u7D71\u504F\u597D\u5DF2\u79FB\u9664\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 507,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 505,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV18(
              Button15,
              {
                variant: isEditingTags ? "filled" : "light",
                color: "blue",
                leftSection: isEditingTags ? /* @__PURE__ */ jsxDEV18(IconCheck4, { size: 16 }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 514,
                  columnNumber: 48
                }, this) : /* @__PURE__ */ jsxDEV18(IconPencil4, { size: 16 }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 514,
                  columnNumber: 74
                }, this),
                onClick: () => setIsEditingTags(!isEditingTags),
                children: isEditingTags ? "\u5B8C\u6210\u7DE8\u8F2F" : "\u7DE8\u8F2F"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 511,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 504,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(Divider9, { my: "md" }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 521,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(Grid3, { children: [
            /* @__PURE__ */ jsxDEV18(Grid3.Col, { span: { base: 12, md: 4 }, children: /* @__PURE__ */ jsxDEV18(Stack15, { gap: "xs", children: [
              /* @__PURE__ */ jsxDEV18(Text15, { fw: 600, size: "sm", c: "dimmed", children: "\u6A19\u7C64\u5206\u985E" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 526,
                columnNumber: 21
              }, this),
              tagGroups.map((group) => {
                let active = group.id === selectedGroupId;
                return /* @__PURE__ */ jsxDEV18(
                  Card15,
                  {
                    withBorder: !0,
                    radius: "md",
                    p: "sm",
                    onClick: () => setSelectedGroupId(group.id),
                    style: {
                      cursor: "pointer",
                      background: active ? "var(--mantine-color-blue-light)" : "var(--mantine-color-body)"
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV18(Text15, { fw: 600, children: group.name }, void 0, !1, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 543,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV18(Text15, { size: "xs", c: "dimmed", children: [
                        group.tags.length,
                        " \u9805"
                      ] }, void 0, !0, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 544,
                        columnNumber: 27
                      }, this)
                    ]
                  },
                  group.id,
                  !0,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 532,
                    columnNumber: 25
                  },
                  this
                );
              })
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 525,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 524,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV18(Grid3.Col, { span: { base: 12, md: 8 }, children: /* @__PURE__ */ jsxDEV18(Stack15, { gap: "sm", children: [
              /* @__PURE__ */ jsxDEV18(Stack15, { gap: 4, children: [
                /* @__PURE__ */ jsxDEV18(Title16, { order: 4, children: selectedGroup?.name ?? "-" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 555,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", c: "dimmed", children: selectedGroup?.description }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 556,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 554,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV18(Group15, { gap: "xs", children: (selectedGroup?.tags ?? []).map((tag, index) => /* @__PURE__ */ jsxDEV18(Group15, { gap: 4, wrap: "nowrap", children: /* @__PURE__ */ jsxDEV18(
                Badge8,
                {
                  color: PILL_COLORS[index % PILL_COLORS.length],
                  variant: "light",
                  size: "lg",
                  rightSection: isEditingTags && /* @__PURE__ */ jsxDEV18(
                    ActionIcon4,
                    {
                      size: "xs",
                      color: "red",
                      variant: "transparent",
                      onClick: () => {
                        if (window.confirm(`\u78BA\u5B9A\u8981\u522A\u9664\u6A19\u7C64\u300C${tag}\u300D\u55CE\uFF1F`)) {
                          let formData = new FormData();
                          formData.append("intent", "tag.delete"), formData.append("groupId", selectedGroupId), formData.append("name", tag), submit(formData, { method: "post" });
                        }
                      },
                      children: /* @__PURE__ */ jsxDEV18(IconX4, { size: 12 }, void 0, !1, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 582,
                        columnNumber: 33
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 568,
                      columnNumber: 31
                    },
                    this
                  ),
                  children: tag
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 563,
                  columnNumber: 27
                },
                this
              ) }, tag, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 562,
                columnNumber: 25
              }, this)) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 560,
                columnNumber: 21
              }, this),
              isEditingTags && /* @__PURE__ */ jsxDEV18(Box11, { mt: "md", p: "md", style: { border: "1px dashed var(--mantine-color-blue-4)", borderRadius: "8px" }, children: [
                /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", fw: 600, mb: "xs", children: "\u65B0\u589E\u65B0\u6A19\u7C64\uFF1A" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 593,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV18(Group15, { gap: "xs", children: [
                  /* @__PURE__ */ jsxDEV18(
                    TextInput11,
                    {
                      placeholder: "\u8F38\u5165\u65B0\u6A19\u7C64\u540D\u7A31",
                      value: newTagValue,
                      onChange: (e) => setNewTagValue(e.currentTarget.value),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" && newTagValue.trim()) {
                          let formData = new FormData();
                          formData.append("intent", "tag.add"), formData.append("groupId", selectedGroupId), formData.append("name", newTagValue.trim()), submit(formData, { method: "post" }), setNewTagValue("");
                        }
                      },
                      style: { flex: 1 }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 595,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV18(
                    Button15,
                    {
                      onClick: () => {
                        if (newTagValue.trim()) {
                          let formData = new FormData();
                          formData.append("intent", "tag.add"), formData.append("groupId", selectedGroupId), formData.append("name", newTagValue.trim()), submit(formData, { method: "post" }), setNewTagValue("");
                        }
                      },
                      disabled: !newTagValue.trim(),
                      children: "\u65B0\u589E"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 611,
                      columnNumber: 27
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 594,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 592,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 553,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 552,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 523,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(
            Modal6,
            {
              opened: tagModalOpened,
              onClose: () => setTagModalOpened(!1),
              title: tagModalMode === "add" ? "\u65B0\u589E\u6A19\u7C64" : tagModalMode === "edit" ? "\u7DE8\u8F2F\u6A19\u7C64" : "\u522A\u9664\u6A19\u7C64",
              children: /* @__PURE__ */ jsxDEV18(Form10, { method: "post", onSubmit: () => setTagModalOpened(!1), children: /* @__PURE__ */ jsxDEV18(Stack15, { children: [
                /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "intent", value: `tag.${tagModalMode}` }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 642,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "groupId", value: selectedGroupId }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 643,
                  columnNumber: 21
                }, this),
                tagModalMode === "edit" && /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "oldName", value: activeTagValue }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 644,
                  columnNumber: 49
                }, this),
                tagModalMode === "delete" && /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "name", value: activeTagValue }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 645,
                  columnNumber: 51
                }, this),
                (tagModalMode === "add" || tagModalMode === "edit") && /* @__PURE__ */ jsxDEV18(
                  TextInput11,
                  {
                    label: "\u6A19\u7C64\u540D\u7A31",
                    name: tagModalMode === "add" ? "name" : "newName",
                    value: draftTagValue,
                    onChange: (e) => setDraftTagValue(e.currentTarget.value),
                    required: !0
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 647,
                    columnNumber: 23
                  },
                  this
                ),
                tagModalMode === "delete" && /* @__PURE__ */ jsxDEV18(Text15, { children: [
                  "\u78BA\u5B9A\u8981\u522A\u9664\u6A19\u7C64\u300C",
                  activeTagValue,
                  "\u300D\u55CE\uFF1F\u76F8\u95DC KOL \u7684\u8CC7\u6599\u4E5F\u5C07\u540C\u6B65\u6E05\u9664\u3002"
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 656,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV18(Group15, { justify: "flex-end", children: [
                  tagModalMode === "edit" && /* @__PURE__ */ jsxDEV18(Button15, { type: "button", variant: "light", color: "red", onClick: () => setTagModalMode("delete"), children: "\u522A\u9664" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 661,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV18(Button15, { variant: "default", onClick: () => setTagModalOpened(!1), children: "\u53D6\u6D88" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 665,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV18(Button15, { type: "submit", color: tagModalMode === "delete" ? "red" : "blue", children: tagModalMode === "delete" ? "\u78BA\u8A8D\u522A\u9664" : "\u5132\u5B58" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 668,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 659,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 641,
                columnNumber: 19
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 640,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 633,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 503,
          columnNumber: 13
        }, this),
        tab === "roles" && /* @__PURE__ */ jsxDEV18(Box11, { children: [
          /* @__PURE__ */ jsxDEV18(Group15, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ jsxDEV18(Stack15, { gap: 2, children: [
              /* @__PURE__ */ jsxDEV18(Title16, { order: 3, children: "\u6B0A\u9650\u7BA1\u7406" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 682,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", c: "dimmed", children: "\u7BA1\u7406\u5718\u968A\u6210\u54E1\u3002\u9EDE\u64CA\u925B\u7B46\u9032\u884C\u7DE8\u8F2F\uFF0C\u63D0\u4EA4\u5F8C\u81EA\u52D5\u95DC\u9589\u8996\u7A97\u3002" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 683,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 681,
              columnNumber: 17
            }, this),
            isAdmin && /* @__PURE__ */ jsxDEV18(
              Button15,
              {
                leftSection: /* @__PURE__ */ jsxDEV18(IconPlus, { size: 16 }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 689,
                  columnNumber: 34
                }, this),
                onClick: () => {
                  setActiveMember(null), setMemberModalOpened(!0);
                },
                children: "\u65B0\u589E\u6210\u54E1"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 688,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 680,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(Group15, { mt: "md", align: "center", justify: "space-between", children: /* @__PURE__ */ jsxDEV18(Group15, { gap: "xs", children: [
            /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", fw: 600, children: "\u7D44\u5225\u7BE9\u9078" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 702,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV18(
              "select",
              {
                value: groupFilter,
                onChange: (e) => setGroupFilter(e.target.value),
                style: {
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid var(--mantine-color-default-border)",
                  background: "var(--mantine-color-body)"
                },
                children: [
                  /* @__PURE__ */ jsxDEV18("option", { value: "all", children: "\u5168\u90E8" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 713,
                    columnNumber: 21
                  }, this),
                  GROUP_OPTIONS.map((opt) => /* @__PURE__ */ jsxDEV18("option", { value: opt, children: [
                    opt,
                    " \u7D44"
                  ] }, opt, !0, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 714,
                    columnNumber: 49
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 703,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 701,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 700,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(ScrollArea, { h: 500, offsetScrollbars: !0, mt: "lg", children: /* @__PURE__ */ jsxDEV18(Table4, { withTableBorder: !0, verticalSpacing: "md", children: [
            /* @__PURE__ */ jsxDEV18(Table4.Thead, { children: /* @__PURE__ */ jsxDEV18(Table4.Tr, { children: [
              /* @__PURE__ */ jsxDEV18(Table4.Th, { children: "\u6210\u54E1" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 723,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Th, { children: "Email" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 724,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Th, { children: "\u7D44\u5225" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 725,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Th, { children: "\u89D2\u8272" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 726,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Th, { w: 120, children: "\u64CD\u4F5C" }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 727,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 722,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 721,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV18(Table4.Tbody, { children: filteredMembers.map((member) => /* @__PURE__ */ jsxDEV18(Table4.Tr, { children: [
              /* @__PURE__ */ jsxDEV18(Table4.Td, { children: /* @__PURE__ */ jsxDEV18(Text15, { fw: 600, children: member.name }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 733,
                columnNumber: 35
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 733,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Td, { children: member.email }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 734,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Td, { children: /* @__PURE__ */ jsxDEV18(Badge8, { variant: "light", children: [
                member.group,
                " \u7D44"
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 735,
                columnNumber: 35
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 735,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Td, { children: /* @__PURE__ */ jsxDEV18(Badge8, { variant: "outline", color: member.role === "admin" ? "red" : "gray", children: member.role.toUpperCase() }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 737,
                columnNumber: 27
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 736,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV18(Table4.Td, { children: isAdmin && /* @__PURE__ */ jsxDEV18(Group15, { gap: "xs", children: [
                /* @__PURE__ */ jsxDEV18(
                  ActionIcon4,
                  {
                    variant: "light",
                    color: "blue",
                    onClick: () => {
                      setActiveMember(member), setMemberModalOpened(!0);
                    },
                    children: /* @__PURE__ */ jsxDEV18(IconPencil4, { size: 14 }, void 0, !1, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 752,
                      columnNumber: 33
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 744,
                    columnNumber: 31
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV18(Form10, { method: "post", onSubmit: (e) => {
                  window.confirm(`\u78BA\u5B9A\u8981\u522A\u9664\u6210\u54E1\u300C${member.name}\u300D\u55CE\uFF1F`) || e.preventDefault();
                }, children: [
                  /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "intent", value: "member.delete" }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 755,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "id", value: member.id }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 756,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ jsxDEV18(ActionIcon4, { variant: "light", color: "red", type: "submit", children: /* @__PURE__ */ jsxDEV18(IconTrash5, { size: 14 }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 758,
                    columnNumber: 35
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 757,
                    columnNumber: 33
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 754,
                  columnNumber: 31
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 743,
                columnNumber: 29
              }, this) }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 741,
                columnNumber: 25
              }, this)
            ] }, member.id, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 732,
              columnNumber: 23
            }, this)) }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 730,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 720,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 719,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV18(Modal6, { opened: memberModalOpened, onClose: () => setMemberModalOpened(!1), title: activeMember ? "\u7DE8\u8F2F\u6210\u54E1" : "\u65B0\u589E\u6210\u54E1", children: /* @__PURE__ */ jsxDEV18(Form10, { method: "post", onSubmit: () => setMemberModalOpened(!1), children: [
            /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "intent", value: activeMember ? "member.update" : "member.add" }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 772,
              columnNumber: 19
            }, this),
            activeMember && /* @__PURE__ */ jsxDEV18("input", { type: "hidden", name: "id", value: activeMember.id }, void 0, !1, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 773,
              columnNumber: 36
            }, this),
            /* @__PURE__ */ jsxDEV18(Stack15, { children: [
              /* @__PURE__ */ jsxDEV18(TextInput11, { name: "name", label: "\u59D3\u540D", defaultValue: activeMember?.name || "", placeholder: "\u8F38\u5165\u59D3\u540D", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 775,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV18(TextInput11, { name: "email", label: "Email", defaultValue: activeMember?.email || "", placeholder: "name@example.com", required: !0 }, void 0, !1, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 776,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV18(Stack15, { gap: 4, children: [
                /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", fw: 500, children: "\u7D44\u5225" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 778,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV18(
                  "select",
                  {
                    name: "group",
                    defaultValue: activeMember?.group || "AE",
                    style: { padding: "8px", borderRadius: 4, border: "1px solid #ccc" },
                    children: GROUP_OPTIONS.map((opt) => /* @__PURE__ */ jsxDEV18("option", { value: opt, children: [
                      opt,
                      " \u7D44"
                    ] }, opt, !0, {
                      fileName: "app/routes/_app.settings.tsx",
                      lineNumber: 784,
                      columnNumber: 51
                    }, this))
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 779,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 777,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV18(Stack15, { gap: 4, children: [
                /* @__PURE__ */ jsxDEV18(Text15, { size: "sm", fw: 500, children: "\u89D2\u8272" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 788,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV18(
                  "select",
                  {
                    name: "role",
                    defaultValue: activeMember?.role || "member",
                    style: { padding: "8px", borderRadius: 4, border: "1px solid #ccc" },
                    children: [
                      /* @__PURE__ */ jsxDEV18("option", { value: "admin", children: "Admin" }, void 0, !1, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 794,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV18("option", { value: "manager", children: "Manager" }, void 0, !1, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 795,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV18("option", { value: "member", children: "Member" }, void 0, !1, {
                        fileName: "app/routes/_app.settings.tsx",
                        lineNumber: 796,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/_app.settings.tsx",
                    lineNumber: 789,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 787,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV18(Group15, { justify: "flex-end", children: [
                /* @__PURE__ */ jsxDEV18(Button15, { variant: "default", onClick: () => setMemberModalOpened(!1), children: "\u53D6\u6D88" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 800,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV18(Button15, { type: "submit", children: activeMember ? "\u5132\u5B58" : "\u65B0\u589E" }, void 0, !1, {
                  fileName: "app/routes/_app.settings.tsx",
                  lineNumber: 801,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.settings.tsx",
                lineNumber: 799,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_app.settings.tsx",
              lineNumber: 774,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 771,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.settings.tsx",
            lineNumber: 770,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_app.settings.tsx",
          lineNumber: 679,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_app.settings.tsx",
        lineNumber: 389,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_app.settings.tsx",
      lineNumber: 369,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_app.settings.tsx",
    lineNumber: 361,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => IndexRoute,
  loader: () => loader15
});
import { redirect as redirect10 } from "@remix-run/node";
async function loader15() {
  return redirect10("/login");
}
function IndexRoute() {
  return null;
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  default: () => LoginPage
});
import { useState as useState12 } from "react";
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
function LoginPage() {
  let [dark, setDark] = useState12(!1), bg = dark ? "#0f172a" : "#ffffff", fg = dark ? "#f8fafc" : "#0f172a", subtle = dark ? "#94a3b8" : "#64748b", border = dark ? "#1e293b" : "#e2e8f0", googleBg = dark ? "#1e293b" : "#f8fafc", googleBorder = dark ? "#334155" : "#cbd5e1", googleHoverBg = dark ? "#273549" : "#f1f5f9";
  return /* @__PURE__ */ jsxDEV19(
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
        /* @__PURE__ */ jsxDEV19(
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
              /* @__PURE__ */ jsxDEV19(
                "svg",
                {
                  style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 },
                  viewBox: "0 0 600 800",
                  preserveAspectRatio: "xMidYMid slice",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "500", cy: "80", r: "280", fill: "#3b82f6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 45,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "50", cy: "700", r: "200", fill: "#6366f1" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 46,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "380", cy: "480", r: "150", fill: "#0ea5e9", opacity: "0.5" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 47,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("ellipse", { cx: "200", cy: "300", rx: "180", ry: "80", fill: "#7c3aed", opacity: "0.4", transform: "rotate(-30 200 300)" }, void 0, !1, {
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
              /* @__PURE__ */ jsxDEV19(
                "svg",
                {
                  style: { position: "absolute", right: 0, bottom: "20%", opacity: 0.1 },
                  width: "360",
                  height: "360",
                  viewBox: "0 0 360 360",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "180", cy: "180", r: "32", fill: "none", stroke: "#60a5fa", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 60,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "80", cy: "100", r: "20", fill: "none", stroke: "#818cf8", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 61,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "290", cy: "90", r: "24", fill: "none", stroke: "#34d399", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 62,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "60", cy: "270", r: "18", fill: "none", stroke: "#f472b6", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 63,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "300", cy: "270", r: "22", fill: "none", stroke: "#fb923c", strokeWidth: "2" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 64,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("line", { x1: "180", y1: "180", x2: "80", y2: "100", stroke: "#60a5fa", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 66,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("line", { x1: "180", y1: "180", x2: "290", y2: "90", stroke: "#818cf8", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 67,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("line", { x1: "180", y1: "180", x2: "60", y2: "270", stroke: "#f472b6", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 68,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("line", { x1: "180", y1: "180", x2: "300", y2: "270", stroke: "#fb923c", strokeWidth: "1.5", opacity: "0.6" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 69,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("line", { x1: "80", y1: "100", x2: "290", y2: "90", stroke: "#94a3b8", strokeWidth: "1", opacity: "0.4" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 70,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("line", { x1: "60", y1: "270", x2: "300", y2: "270", stroke: "#94a3b8", strokeWidth: "1", opacity: "0.4" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 71,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "180", cy: "180", r: "24", fill: "#1e40af" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 73,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "80", cy: "100", r: "14", fill: "#4c1d95" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 74,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "290", cy: "90", r: "16", fill: "#065f46" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 75,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "60", cy: "270", r: "12", fill: "#831843" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 76,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("circle", { cx: "300", cy: "270", r: "15", fill: "#7c2d12" }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 77,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV19("text", { x: "166", y: "185", fill: "white", fontSize: "14", fontFamily: "sans-serif", children: "KOL" }, void 0, !1, {
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
              /* @__PURE__ */ jsxDEV19("div", { style: { position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxDEV19("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }, children: [
                /* @__PURE__ */ jsxDEV19(
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
                    children: /* @__PURE__ */ jsxDEV19("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxDEV19("path", { d: "M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
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
                /* @__PURE__ */ jsxDEV19("span", { style: { color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }, children: "KOL DB" }, void 0, !1, {
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
              /* @__PURE__ */ jsxDEV19("div", { style: { position: "relative", zIndex: 1 }, children: [
                /* @__PURE__ */ jsxDEV19("div", { style: { marginBottom: 24 }, children: [
                  /* @__PURE__ */ jsxDEV19(
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
                  /* @__PURE__ */ jsxDEV19(
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
                        /* @__PURE__ */ jsxDEV19("br", {}, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 134,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV19(
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
                  /* @__PURE__ */ jsxDEV19("p", { style: { color: "#94a3b8", fontSize: 15, lineHeight: 1.6, marginTop: 16, maxWidth: 340 }, children: "\u5F9E\u63D0\u6848\u5230\u59D4\u520A\u55AE\uFF0C\u5F9E KOL \u641C\u5C0B\u5230\u7D50\u6848\u5831\u544A\uFF0C\u4E00\u500B\u5E73\u53F0\u638C\u63E1\u6240\u6709\u884C\u92B7\u5408\u4F5C\u6D41\u7A0B\u3002" }, void 0, !1, {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 145,
                    columnNumber: 13
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 106,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV19("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
                  { icon: "\u{1F465}", text: "KOL \u8CC7\u6599\u5EAB\u8207\u7BA1\u7406" },
                  { icon: "\u{1F4CB}", text: "\u63D0\u6848\u8207\u59D4\u520A\u55AE\u6D41\u7A0B" },
                  { icon: "\u{1F4CA}", text: "\u7D50\u6848\u5831\u544A\u81EA\u52D5\u751F\u6210" }
                ].map((f) => /* @__PURE__ */ jsxDEV19(
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
                      /* @__PURE__ */ jsxDEV19("span", { style: { fontSize: 18 }, children: f.icon }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 170,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV19("span", { style: { color: "#e2e8f0", fontSize: 14, fontWeight: 500 }, children: f.text }, void 0, !1, {
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
        /* @__PURE__ */ jsxDEV19(
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
              /* @__PURE__ */ jsxDEV19(
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
              /* @__PURE__ */ jsxDEV19("div", { style: { width: "100%", maxWidth: 360 }, children: [
                /* @__PURE__ */ jsxDEV19("div", { style: { marginBottom: 40 }, children: [
                  /* @__PURE__ */ jsxDEV19(
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
                  /* @__PURE__ */ jsxDEV19("p", { style: { color: subtle, fontSize: 15, margin: 0, lineHeight: 1.6 }, children: "\u4F7F\u7528 Google \u5E33\u865F\u767B\u5165\u4EE5\u7E7C\u7E8C\u4F7F\u7528 KOL DB" }, void 0, !1, {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 232,
                    columnNumber: 13
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 219,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV19(
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
                      /* @__PURE__ */ jsxDEV19("svg", { width: "20", height: "20", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
                        /* @__PURE__ */ jsxDEV19("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 269,
                          columnNumber: 15
                        }, this),
                        /* @__PURE__ */ jsxDEV19("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 270,
                          columnNumber: 15
                        }, this),
                        /* @__PURE__ */ jsxDEV19("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 271,
                          columnNumber: 15
                        }, this),
                        /* @__PURE__ */ jsxDEV19("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }, void 0, !1, {
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
                /* @__PURE__ */ jsxDEV19(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 24
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV19("div", { style: { flex: 1, height: 1, background: border } }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 286,
                        columnNumber: 13
                      }, this),
                      /* @__PURE__ */ jsxDEV19("span", { style: { color: subtle, fontSize: 12, whiteSpace: "nowrap" }, children: "\u76EE\u524D\u50C5\u652F\u63F4 Google \u767B\u5165" }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 287,
                        columnNumber: 13
                      }, this),
                      /* @__PURE__ */ jsxDEV19("div", { style: { flex: 1, height: 1, background: border } }, void 0, !1, {
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
                /* @__PURE__ */ jsxDEV19(
                  "div",
                  {
                    style: {
                      background: dark ? "#1e293b" : "#f8fafc",
                      border: `1px solid ${border}`,
                      borderRadius: 12,
                      padding: "16px 18px",
                      marginBottom: 32
                    },
                    children: /* @__PURE__ */ jsxDEV19("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" }, children: [
                      /* @__PURE__ */ jsxDEV19("span", { style: { fontSize: 16, marginTop: 1 }, children: "\u{1F512}" }, void 0, !1, {
                        fileName: "app/routes/login.tsx",
                        lineNumber: 302,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV19("div", { children: [
                        /* @__PURE__ */ jsxDEV19("p", { style: { color: fg, fontSize: 13, fontWeight: 600, margin: 0, marginBottom: 4 }, children: "\u5B89\u5168\u767B\u5165" }, void 0, !1, {
                          fileName: "app/routes/login.tsx",
                          lineNumber: 304,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV19("p", { style: { color: subtle, fontSize: 12, margin: 0, lineHeight: 1.5 }, children: "\u900F\u904E BetterAuth + Google OAuth 2.0 \u9032\u884C\u8EAB\u5206\u9A57\u8B49\uFF0C\u6211\u5011\u4E0D\u5132\u5B58\u60A8\u7684\u5BC6\u78BC\u3002" }, void 0, !1, {
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
                /* @__PURE__ */ jsxDEV19("p", { style: { color: subtle, fontSize: 12, textAlign: "center", lineHeight: 1.6 }, children: [
                  "\u767B\u5165\u5373\u4EE3\u8868\u60A8\u540C\u610F\u6211\u5011\u7684",
                  " ",
                  /* @__PURE__ */ jsxDEV19("a", { href: "#", style: { color: "#3b82f6", textDecoration: "none" }, children: "\u670D\u52D9\u689D\u6B3E" }, void 0, !1, {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 318,
                    columnNumber: 13
                  }, this),
                  " ",
                  "\u53CA",
                  " ",
                  /* @__PURE__ */ jsxDEV19("a", { href: "#", style: { color: "#3b82f6", textDecoration: "none" }, children: "\u96B1\u79C1\u653F\u7B56" }, void 0, !1, {
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
import { AppShell, Group as Group17, Stack as Stack16, Text as Text17, Title as Title18 } from "@mantine/core";
import { Outlet as Outlet2, useLocation as useLocation2 } from "@remix-run/react";

// app/components/GlobalNotification.tsx
import { Affix, Transition, Card as Card16, Group as Group16, ActionIcon as ActionIcon5, Title as Title17, Text as Text16, Button as Button16, Progress as Progress3, ThemeIcon as ThemeIcon3, Box as Box12 } from "@mantine/core";
import { IconX as IconX5, IconCheck as IconCheck5 } from "@tabler/icons-react";
import { useEffect as useEffect5, useState as useState13 } from "react";
import { useNavigate, useLocation } from "@remix-run/react";
import { Fragment as Fragment4, jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
function GlobalNotification() {
  let { toast, hideToast, banner, hideBanner } = useNotificationStore(), navigate = useNavigate(), location = useLocation(), [progress, setProgress] = useState13(100);
  return useEffect5(() => {
    if (toast?.isOpen) {
      setProgress(100);
      let startTime = Date.now(), duration = 1e4, interval = setInterval(() => {
        let elapsed = Date.now() - startTime, remaining = Math.max(0, 100 - elapsed / duration * 100);
        setProgress(remaining), remaining === 0 && (hideToast(), clearInterval(interval));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [toast?.isOpen, hideToast]), /* @__PURE__ */ jsxDEV20(Fragment4, { children: [
    banner?.isOpen && location.pathname !== "/reports/generate" && /* @__PURE__ */ jsxDEV20(
      Box12,
      {
        bg: "green.6",
        c: "white",
        p: "sm",
        style: { position: "sticky", top: 0, zIndex: 1e3, width: "100%" },
        children: /* @__PURE__ */ jsxDEV20(Group16, { justify: "center", align: "center", style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxDEV20(Group16, { gap: "xs", children: [
            /* @__PURE__ */ jsxDEV20(ThemeIcon3, { color: "white", variant: "transparent", size: "sm", children: /* @__PURE__ */ jsxDEV20(IconCheck5, { size: 18 }, void 0, !1, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 48,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 47,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV20(Text16, { fw: 600, size: "sm", children: banner.message }, void 0, !1, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 50,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/GlobalNotification.tsx",
            lineNumber: 46,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV20(
            Button16,
            {
              component: "a",
              href: banner.actionLink || "/reports/generate",
              variant: "transparent",
              color: "white",
              size: "sm",
              pl: "xs",
              style: { textDecoration: "underline" },
              children: "\u67E5\u770B\u4E26\u4E0B\u8F09 \u2192"
            },
            void 0,
            !1,
            {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 53,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV20(
            ActionIcon5,
            {
              onClick: hideBanner,
              variant: "transparent",
              color: "white",
              style: { position: "absolute", right: 16 },
              children: /* @__PURE__ */ jsxDEV20(IconX5, { size: 16 }, void 0, !1, {
                fileName: "app/components/GlobalNotification.tsx",
                lineNumber: 71,
                columnNumber: 15
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 65,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/GlobalNotification.tsx",
          lineNumber: 45,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 39,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV20(Affix, { position: { top: 20, right: 20 }, zIndex: 2e3, children: /* @__PURE__ */ jsxDEV20(Transition, { transition: "slide-left", duration: 300, mounted: !!toast?.isOpen, children: (transitionStyles) => /* @__PURE__ */ jsxDEV20(
      Card16,
      {
        withBorder: !0,
        shadow: "xl",
        radius: "md",
        p: 0,
        style: { ...transitionStyles, width: 400, overflow: "hidden" },
        children: [
          /* @__PURE__ */ jsxDEV20(Box12, { p: "md", children: /* @__PURE__ */ jsxDEV20(Group16, { wrap: "nowrap", align: "flex-start", justify: "space-between", children: [
            /* @__PURE__ */ jsxDEV20(Group16, { wrap: "nowrap", align: "flex-start", gap: "sm", children: [
              /* @__PURE__ */ jsxDEV20(Box12, { style: { fontSize: 32, lineHeight: 1 }, children: "\u{1F389}" }, void 0, !1, {
                fileName: "app/components/GlobalNotification.tsx",
                lineNumber: 91,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV20(Box12, { children: [
                /* @__PURE__ */ jsxDEV20(Title17, { order: 5, mb: 4, children: toast?.title }, void 0, !1, {
                  fileName: "app/components/GlobalNotification.tsx",
                  lineNumber: 93,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV20(Text16, { size: "sm", c: "dimmed", mb: 2, children: [
                  "\u6848\u4EF6: ",
                  toast?.message.split("|")[0]
                ] }, void 0, !0, {
                  fileName: "app/components/GlobalNotification.tsx",
                  lineNumber: 94,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV20(Text16, { size: "sm", c: "dimmed", children: [
                  "\u6A94\u6848: ",
                  toast?.message.split("|")[1] || "\u7D50\u6848\u5831\u544A_v1.pptx"
                ] }, void 0, !0, {
                  fileName: "app/components/GlobalNotification.tsx",
                  lineNumber: 95,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV20(Group16, { mt: "md", gap: "sm", children: [
                  /* @__PURE__ */ jsxDEV20(
                    Button16,
                    {
                      size: "xs",
                      color: "blue",
                      onClick: () => {
                        alert("\u5831\u544A\u4E0B\u8F09\u4E2D..."), hideToast();
                      },
                      children: "\u7ACB\u5373\u4E0B\u8F09"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/GlobalNotification.tsx",
                      lineNumber: 98,
                      columnNumber: 25
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV20(
                    Button16,
                    {
                      size: "xs",
                      variant: "light",
                      color: "gray",
                      onClick: () => {
                        toast?.actionLink && navigate(toast.actionLink), hideToast();
                      },
                      children: "\u7A0D\u5F8C\u67E5\u770B"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/GlobalNotification.tsx",
                      lineNumber: 108,
                      columnNumber: 25
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/components/GlobalNotification.tsx",
                  lineNumber: 97,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/GlobalNotification.tsx",
                lineNumber: 92,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 90,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV20(ActionIcon5, { variant: "subtle", color: "gray", onClick: hideToast, children: /* @__PURE__ */ jsxDEV20(IconX5, { size: 16 }, void 0, !1, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 123,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/components/GlobalNotification.tsx",
              lineNumber: 122,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/GlobalNotification.tsx",
            lineNumber: 89,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/GlobalNotification.tsx",
            lineNumber: 88,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV20(Progress3, { value: progress, size: "xs", color: "blue", radius: 0 }, void 0, !1, {
            fileName: "app/components/GlobalNotification.tsx",
            lineNumber: 127,
            columnNumber: 15
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/GlobalNotification.tsx",
        lineNumber: 81,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/GlobalNotification.tsx",
      lineNumber: 79,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/GlobalNotification.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/GlobalNotification.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/routes/_app.tsx
import { Fragment as Fragment5, jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
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
  let location = useLocation2();
  return /* @__PURE__ */ jsxDEV21(Fragment5, { children: [
    /* @__PURE__ */ jsxDEV21(GlobalNotification, {}, void 0, !1, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV21(
      AppShell,
      {
        header: { height: 64 },
        navbar: { width: 260, breakpoint: "sm" },
        padding: "md",
        children: [
          /* @__PURE__ */ jsxDEV21(AppShell.Header, { children: [
            /* @__PURE__ */ jsxDEV21("style", { dangerouslySetInnerHTML: {
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
              lineNumber: 44,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV21(Group17, { justify: "space-between", align: "center", h: "100%", px: "md", children: [
              /* @__PURE__ */ jsxDEV21(Group17, { gap: "sm", children: [
                /* @__PURE__ */ jsxDEV21(
                  "button",
                  {
                    id: "kol-sidebar-toggle-btn",
                    type: "button",
                    onClick: () => document.body.classList.toggle("sidebar-collapsed"),
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
                    lineNumber: 88,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV21(Stack16, { gap: 0, children: [
                  /* @__PURE__ */ jsxDEV21(Title18, { order: 4, children: "KOL DB" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 108,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV21(Text17, { size: "xs", c: "dimmed", children: "\u7D71\u4E00\u7BA1\u7406 KOL / \u63D0\u6848 / \u59D4\u520A\u55AE" }, void 0, !1, {
                    fileName: "app/routes/_app.tsx",
                    lineNumber: 109,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 107,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_app.tsx",
                lineNumber: 87,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV21(
                "button",
                {
                  id: "kol-theme-toggle-btn",
                  type: "button",
                  suppressHydrationWarning: !0,
                  onClick: () => {
                    let STORAGE_KEY = "mantine-color-scheme-value", theme = (() => {
                      try {
                        return localStorage.getItem(STORAGE_KEY) || "light";
                      } catch {
                        return "light";
                      }
                    })() === "dark" ? "light" : "dark";
                    document.documentElement.setAttribute("data-mantine-color-scheme", theme);
                    try {
                      localStorage.setItem(STORAGE_KEY, theme);
                    } catch {
                    }
                    let icon = document.getElementById("kol-theme-icon"), label = document.getElementById("kol-theme-label");
                    icon && (icon.textContent = theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}"), label && (label.textContent = theme === "dark" ? "Light" : "Dark");
                  },
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
                    /* @__PURE__ */ jsxDEV21("span", { id: "kol-theme-icon", children: "\u{1F319}" }, void 0, !1, {
                      fileName: "app/routes/_app.tsx",
                      lineNumber: 151,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV21("span", { id: "kol-theme-label", children: "Dark" }, void 0, !1, {
                      fileName: "app/routes/_app.tsx",
                      lineNumber: 152,
                      columnNumber: 13
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 119,
                  columnNumber: 11
                },
                this
              ),
              /* @__PURE__ */ jsxDEV21(
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
})();
              `
                  }
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 157,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 86,
              columnNumber: 9
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 43,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV21(AppShell.Navbar, { p: "sm", style: { zIndex: 90, pointerEvents: "auto" }, children: [
            /* @__PURE__ */ jsxDEV21(Stack16, { gap: "xs", style: { flex: 1 }, children: navItems.map((item) => {
              let active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
              return /* @__PURE__ */ jsxDEV21("a", { href: item.to, style: navLinkStyle(active), children: [
                /* @__PURE__ */ jsxDEV21("span", { className: "nav-icon", style: { marginRight: 8 }, children: item.icon }, void 0, !1, {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 195,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV21("span", { className: "nav-label", children: item.label }, void 0, !1, {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 196,
                  columnNumber: 17
                }, this)
              ] }, item.to, !0, {
                fileName: "app/routes/_app.tsx",
                lineNumber: 194,
                columnNumber: 15
              }, this);
            }) }, void 0, !1, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 188,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV21("div", { style: { marginTop: "auto", paddingTop: 12 }, children: [
              /* @__PURE__ */ jsxDEV21(
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
                    /* @__PURE__ */ jsxDEV21("span", { className: "nav-icon", style: { marginRight: 8 }, children: "\u2699\uFE0F" }, void 0, !1, {
                      fileName: "app/routes/_app.tsx",
                      lineNumber: 219,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV21("span", { className: "nav-label", children: "\u7CFB\u7D71\u8A2D\u5B9A" }, void 0, !1, {
                      fileName: "app/routes/_app.tsx",
                      lineNumber: 220,
                      columnNumber: 13
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 203,
                  columnNumber: 11
                },
                this
              ),
              /* @__PURE__ */ jsxDEV21(
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
                    /* @__PURE__ */ jsxDEV21("span", { className: "nav-icon", style: { marginRight: 8 }, children: "\u{1F6AA}" }, void 0, !1, {
                      fileName: "app/routes/_app.tsx",
                      lineNumber: 237,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV21("span", { className: "nav-label", children: "\u767B\u51FA\uFF08\u56DE\u767B\u5165\u9801\uFF09" }, void 0, !1, {
                      fileName: "app/routes/_app.tsx",
                      lineNumber: 238,
                      columnNumber: 13
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/_app.tsx",
                  lineNumber: 222,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_app.tsx",
              lineNumber: 202,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 187,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV21(AppShell.Main, { children: /* @__PURE__ */ jsxDEV21(Outlet2, {}, void 0, !1, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 244,
            columnNumber: 9
          }, this) }, void 0, !1, {
            fileName: "app/routes/_app.tsx",
            lineNumber: 243,
            columnNumber: 7
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_app.tsx",
        lineNumber: 38,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_app.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/routes/$.tsx
var __exports = {};
__export(__exports, {
  default: () => SplatRoute,
  loader: () => loader16
});
function loader16() {
  throw new Response("Not Found", { status: 404 });
}
function SplatRoute() {
  return null;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-HZV6GBGS.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-6WKXAUV5.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-5YHBI2JG.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-OBX4HXJB.js", imports: ["/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/$": { id: "routes/$", parentId: "root", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/$-PT3HKQQQ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app": { id: "routes/_app", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/_app-YSX6LJTQ.js", imports: ["/build/_shared/chunk-J2J7XYF7.js", "/build/_shared/chunk-ZHSZHK33.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.dashboard": { id: "routes/_app.dashboard", parentId: "routes/_app", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.dashboard-S7EZED66.js", imports: ["/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.favorites": { id: "routes/_app.favorites", parentId: "routes/_app", path: "favorites", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.favorites-KUGCTJ5V.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.insertion-orders.$insertionOrderId._index": { id: "routes/_app.insertion-orders.$insertionOrderId._index", parentId: "routes/_app", path: "insertion-orders/:insertionOrderId", index: !0, caseSensitive: void 0, module: "/build/routes/_app.insertion-orders.$insertionOrderId._index-UBJMGDKQ.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.insertion-orders.$insertionOrderId.edit": { id: "routes/_app.insertion-orders.$insertionOrderId.edit", parentId: "routes/_app", path: "insertion-orders/:insertionOrderId/edit", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.insertion-orders.$insertionOrderId.edit-5RPJP4A6.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.insertion-orders._index": { id: "routes/_app.insertion-orders._index", parentId: "routes/_app", path: "insertion-orders", index: !0, caseSensitive: void 0, module: "/build/routes/_app.insertion-orders._index-7D52TDZR.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.insertion-orders.new": { id: "routes/_app.insertion-orders.new", parentId: "routes/_app", path: "insertion-orders/new", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.insertion-orders.new-VYQQXOEE.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols.$kolId._index": { id: "routes/_app.kols.$kolId._index", parentId: "routes/_app", path: "kols/:kolId", index: !0, caseSensitive: void 0, module: "/build/routes/_app.kols.$kolId._index-2Q4HEYX6.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols.$kolId.edit": { id: "routes/_app.kols.$kolId.edit", parentId: "routes/_app", path: "kols/:kolId/edit", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.kols.$kolId.edit-FACJO3IV.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols._index": { id: "routes/_app.kols._index", parentId: "routes/_app", path: "kols", index: !0, caseSensitive: void 0, module: "/build/routes/_app.kols._index-QM5VVINX.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.kols.new": { id: "routes/_app.kols.new", parentId: "routes/_app", path: "kols/new", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.kols.new-KVEBCMS7.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.proposals.$proposalId": { id: "routes/_app.proposals.$proposalId", parentId: "routes/_app", path: "proposals/:proposalId", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.proposals.$proposalId-Y3PFWPU3.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.proposals._index": { id: "routes/_app.proposals._index", parentId: "routes/_app", path: "proposals", index: !0, caseSensitive: void 0, module: "/build/routes/_app.proposals._index-R5YIPVDV.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.proposals.new": { id: "routes/_app.proposals.new", parentId: "routes/_app", path: "proposals/new", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.proposals.new-STJGBEEZ.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.reports.generate": { id: "routes/_app.reports.generate", parentId: "routes/_app", path: "reports/generate", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.reports.generate-UUUGZ4TK.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_app.settings": { id: "routes/_app.settings", parentId: "routes/_app", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/_app.settings-XKNBR6ZC.js", imports: ["/build/_shared/chunk-NNH5CGJ5.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-EK4DUNM5.js", "/build/_shared/chunk-B43JI2TA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-DVCTFJQN.js", imports: ["/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.ai-parse-order": { id: "routes/api.ai-parse-order", parentId: "root", path: "api/ai-parse-order", index: void 0, caseSensitive: void 0, module: "/build/routes/api.ai-parse-order-OFXOK4LN.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.social-followers": { id: "routes/api.social-followers", parentId: "root", path: "api/social-followers", index: void 0, caseSensitive: void 0, module: "/build/routes/api.social-followers-VVGDZ4IC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-5TUIEAR5.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "a7e2d8f6", hmr: { runtime: "/build/_shared\\chunk-5YHBI2JG.js", timestamp: 1774580373683 }, url: "/build/manifest-A7E2D8F6.js" };

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
  "routes/_app.insertion-orders.$insertionOrderId._index": {
    id: "routes/_app.insertion-orders.$insertionOrderId._index",
    parentId: "routes/_app",
    path: "insertion-orders/:insertionOrderId",
    index: !0,
    caseSensitive: void 0,
    module: app_insertion_orders_insertionOrderId_index_exports
  },
  "routes/_app.insertion-orders.$insertionOrderId.edit": {
    id: "routes/_app.insertion-orders.$insertionOrderId.edit",
    parentId: "routes/_app",
    path: "insertion-orders/:insertionOrderId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: app_insertion_orders_insertionOrderId_edit_exports
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
