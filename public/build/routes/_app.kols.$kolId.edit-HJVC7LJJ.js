import "/build/_shared/chunk-KBIFJHSO.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title
} from "/build/_shared/chunk-EK4DUNM5.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation
} from "/build/_shared/chunk-Q2QT43GJ.js";
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

// app/routes/_app.kols.$kolId.edit.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.kols.$kolId.edit.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.kols.$kolId.edit.tsx"
  );
  import.meta.hot.lastModified = "1774425867441.141";
}
function KolEditPage() {
  _s();
  const data = useLoaderData();
  const kol = data.kol;
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const initialSocials = [{
    id: "s-ig",
    platform: "Instagram",
    url: `https://instagram.com/${kol.instagramHandle || ""}`,
    followers: kol.social?.instagram ?? kol.followers ?? 0
  }, {
    id: "s-yt",
    platform: "YouTube",
    url: "",
    followers: kol.social?.youtube ?? 0
  }, {
    id: "s-tt",
    platform: "TikTok",
    url: "",
    followers: kol.social?.tiktok ?? 0
  }].filter((s) => s.followers > 0 || s.platform === "Instagram" && kol.instagramHandle);
  if (initialSocials.length === 0) {
    initialSocials.push({
      id: "s0",
      platform: "Instagram",
      url: "",
      followers: 0
    });
  }
  const [socials, setSocials] = (0, import_react2.useState)(initialSocials);
  const addSocial = () => {
    setSocials([...socials, {
      id: "s" + Date.now(),
      platform: "Instagram",
      url: "",
      followers: 0
    }]);
  };
  const removeSocial = (id) => {
    if (socials.length <= 1)
      return;
    setSocials(socials.filter((s) => s.id !== id));
  };
  const updateSocial = (id, key, value) => {
    setSocials(socials.map((s) => s.id === id ? {
      ...s,
      [key]: value
    } : s));
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 8, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 179,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: ">" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 180,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/kols/${kol.id}`, children: kol.displayName }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 181,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: ">" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 182,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: "\u7DE8\u8F2F KOL" }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 183,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "lg", maw: 840, mx: "auto", w: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u57FA\u672C\u8CC7\u6599" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "flex-start", gap: "xl", wrap: "wrap", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: kol.avatarUrl, radius: 999, size: 96 }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 193,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u982D\u50CF\u9810\u89BD" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 194,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 192,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", style: {
            flex: 1,
            minWidth: 260
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "KOL \u540D\u7A31 *", name: "displayName", defaultValue: kol.displayName, required: true }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 200,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Instagram \u5E33\u865F", name: "instagramHandle", defaultValue: kol.instagramHandle ?? "", placeholder: "@username" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 201,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u7522\u696D", name: "industry", defaultValue: kol.industry ?? "", placeholder: "\u4F8B\u5982\uFF1A\u6BCD\u5B30 / \u7F8E\u599D" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 202,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u6A19\u7C64\uFF08\u9017\u865F\u5206\u9694\uFF09", name: "tagsInput", defaultValue: (kol.tags ?? kol.categories ?? []).join(", "), placeholder: "\u6BCD\u5B30, \u89AA\u5B50" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 203,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 6, children: "\u8ACB\u6B3E\u65B9\u5F0F" }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 205,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio.Group, { name: "paymentMethod", defaultValue: kol.paymentMethod, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { value: "\u52DE\u5831", label: "\u52DE\u5831" }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                  lineNumber: 208,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { value: "\u767C\u7968", label: "\u767C\u7968" }, void 0, false, {
                  fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                  lineNumber: 209,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 207,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/_app.kols.$kolId.edit.tsx",
                lineNumber: 206,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 204,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 196,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 191,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 189,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 217,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u793E\u7FA4\u5E73\u53F0" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 220,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "sm", children: [
          socials.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { align: "flex-end", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5E73\u53F0", value: item.platform, onChange: (e) => updateSocial(item.id, "platform", e.target.value), style: {
              flex: 1
            } }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 223,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "URL / \u5E33\u865F", value: item.url, onChange: (e) => updateSocial(item.id, "url", e.target.value), style: {
              flex: 2
            } }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 226,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u7C89\u7D72\u6578", type: "number", value: item.followers || 0, onChange: (e) => updateSocial(item.id, "followers", Number(e.target.value)), style: {
              flex: 1
            } }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 229,
              columnNumber: 21
            }, this),
            idx !== 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { color: "red", variant: "light", onClick: () => removeSocial(item.id), children: "\xD7" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 232,
              columnNumber: 35
            }, this)
          ] }, item.id, true, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 222,
            columnNumber: 45
          }, this)),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: addSocial, size: "xs", style: {
            width: "fit-content"
          }, children: "+ \u65B0\u589E\u793E\u7FA4\u5E73\u53F0" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 234,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "socialsJson", value: JSON.stringify(socials) }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 239,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 221,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 219,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 243,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u6210\u6548\u6307\u6A19" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 246,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          sm: 3
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u4E92\u52D5\u7387 (%)", name: "engagementRate", type: "number", step: "0.01", defaultValue: kol.engagementRate ?? 0 }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 251,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u66DD\u5149\u7387 (%)", name: "exposureRate", type: "number", step: "0.01", defaultValue: kol.exposureRate ?? 0 }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 252,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u53D7\u773E\u6027\u5225\u6BD4 (\u7537 %)", name: "audienceMale", type: "number", defaultValue: kol.audienceGender?.male ?? 0 }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 253,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u53D7\u773E\u6027\u5225\u6BD4 (\u5973 %)", name: "audienceFemale", type: "number", defaultValue: kol.audienceGender?.female ?? 0 }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 254,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u53D7\u773E\u5167\u5BB9\u5E74\u9F61\u5C64", name: "audienceAge", defaultValue: kol.audienceAge ?? "", placeholder: "\u4F8B\u5982\uFF1A18-24" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 255,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u8A55\u5206 (\u81EA\u52D5\u8A08\u7B97)" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 257,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { mt: 4, children: kol.rating?.toFixed(1) ?? "0.0" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 258,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 256,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, children: "\u5408\u4F5C\u6B21\u6578 (\u81EA\u52D5\u8A08\u7B97)" }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 261,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { mt: 4, children: kol.collaborations ?? 0 }, void 0, false, {
              fileName: "app/routes/_app.kols.$kolId.edit.tsx",
              lineNumber: 262,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 260,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 247,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 245,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 267,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u806F\u7D61\u8207\u5099\u8A3B" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 270,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          sm: 2
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u806F\u7D61\u96FB\u8A71", name: "contactPhone", defaultValue: kol.contact?.phone ?? "" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 275,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Email", name: "email", type: "email", defaultValue: kol.contact?.email ?? "" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 276,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 271,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { mt: "md", label: "\u982D\u50CF\u7DB2\u5740", name: "avatarUrl", defaultValue: kol.avatarUrl ?? "", placeholder: "https://..." }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 278,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { mt: "md", label: "\u4EBA\u9078\u4ECB\u7D39", name: "introduction", minRows: 5, defaultValue: kol.introduction ?? "" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 279,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { mt: "md", label: "\u5099\u8A3B", name: "notes", minRows: 4, defaultValue: kol.notes ?? "" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 280,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 269,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "red", title: "\u5132\u5B58\u5931\u6557", children: actionData.error }, void 0, false, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 283,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 288,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: `/kols/${kol.id}`, variant: "light", children: "\u56DE\u8A73\u7D30\u9801" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 292,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", loading: submitting, children: "\u5132\u5B58\u8B8A\u66F4" }, void 0, false, {
            fileName: "app/routes/_app.kols.$kolId.edit.tsx",
            lineNumber: 295,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.$kolId.edit.tsx",
          lineNumber: 291,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.$kolId.edit.tsx",
        lineNumber: 287,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 188,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 187,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.$kolId.edit.tsx",
      lineNumber: 186,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.kols.$kolId.edit.tsx",
    lineNumber: 177,
    columnNumber: 10
  }, this);
}
_s(KolEditPage, "nJijOWBo/m1vbkPE+XDgF0u7r6o=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = KolEditPage;
var _c;
$RefreshReg$(_c, "KolEditPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  KolEditPage as default
};
//# sourceMappingURL=/build/routes/_app.kols.$kolId.edit-HJVC7LJJ.js.map
