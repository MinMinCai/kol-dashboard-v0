import "/build/_shared/chunk-2EYHFDP6.js";
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
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title
} from "/build/_shared/chunk-LYH654VY.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  Link,
  useActionData,
  useNavigation
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

// app/routes/_app.kols.new.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_app.kols.new.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_app.kols.new.tsx"
  );
  import.meta.hot.lastModified = "1774342534391.6758";
}
function KolCreatePage() {
  _s();
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const [socials, setSocials] = (0, import_react2.useState)([{
    id: "s0",
    platform: "Instagram",
    url: "",
    followers: null
  }]);
  const addSocial = () => {
    if (socials.length >= 8)
      return;
    setSocials([...socials, {
      id: "s" + Date.now(),
      platform: "Instagram",
      url: "",
      followers: null
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
  const fetchFollowers = async (id, platform, url) => {
    if (!url) {
      alert("\u8ACB\u5148\u8F38\u5165\u793E\u7FA4\u5E33\u865F URL");
      return;
    }
    try {
      const r = await fetch(`/api/social-followers?platform=${encodeURIComponent(platform)}&url=${encodeURIComponent(url)}`);
      const data = await r.json();
      if (r.ok && data.followers) {
        updateSocial(id, "followers", data.followers);
      } else {
        alert(data.error || "\u53D6\u5F97\u8FFD\u8E64\u6578\u5931\u6557");
      }
    } catch (e) {
      alert("\u53D6\u5F97\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66");
    }
  };
  const [avatarPreview, setAvatarPreview] = (0, import_react2.useState)(void 0);
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { gap: 8, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/kols", children: "KOL \u7BA1\u7406" }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 199,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { c: "dimmed", children: ">" }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 600, children: "\u65B0\u589E KOL" }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 201,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 198,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { withBorder: true, p: "lg", maw: 800, mx: "auto", w: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { gap: "xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "KOL \u57FA\u672C\u8CC7\u6599" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 209,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", mb: "lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "avatar-file-input", type: "file", accept: "image/*", style: {
            display: "none"
          }, onChange: handleAvatarChange }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 213,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "avatarUrl", value: avatarPreview || "" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 216,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            width: 220,
            border: "1px dashed #94a3b8",
            borderRadius: 16,
            padding: 20,
            cursor: "pointer",
            textAlign: "center"
          }, onClick: () => document.getElementById("avatar-file-input")?.click(), onDragOver: (e) => e.preventDefault(), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { src: avatarPreview, radius: 999, size: 96 }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 226,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { fw: 700, children: "\u2191" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 227,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", children: "\u9EDE\u64CA\u4E0A\u50B3 KOL \u7167\u7247" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 228,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", children: "\u652F\u63F4\u62D6\u62C9\u4E0A\u50B3" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 229,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 225,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 217,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 212,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          sm: 2
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "KOL \u540D\u7A31 *", name: "displayName", placeholder: "\u4F8B\u5982\uFF1AGina", required: true }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 238,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 6, children: "\u6027\u5225" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 241,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio.Group, { name: "gender", defaultValue: "\u5973", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "xs", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { value: "\u7537", label: "\u7537" }, void 0, false, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 244,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { value: "\u5973", label: "\u5973" }, void 0, false, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 245,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { value: "\u5176\u4ED6", label: "\u5176\u4ED6" }, void 0, false, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 246,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 243,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 242,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 240,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5E74\u9F61", name: "age", type: "number", min: 0, max: 100 }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 251,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u806F\u7D61\u65B9\u5F0F", name: "contactPhone", placeholder: "09xx-xxx-xxx" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 252,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "Email", name: "email", type: "email", placeholder: "manager@example.com" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 253,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 6, children: "\u8ACB\u6B3E\u65B9\u5F0F" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 256,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio.Group, { name: "paymentMethod", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "xs", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { value: "\u52DE\u5831", label: "\u52DE\u5831" }, void 0, false, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 259,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { value: "\u767C\u7968", label: "\u767C\u7968" }, void 0, false, {
                fileName: "app/routes/_app.kols.new.tsx",
                lineNumber: 260,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 258,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 257,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 255,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 234,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { mt: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 4, children: "KOL \u6A19\u7C64\uFF08\u9017\u865F\u5206\u9694\uFF09" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 267,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "tagsInput", defaultValue: "\u6BCD\u5B30,\u89AA\u5B50,\u65C5\u904A", placeholder: "\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 268,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "xs", c: "dimmed", mt: 4, children: "\u7528\u9017\u865F\u5206\u9694\u591A\u500B\u6A19\u7C64\uFF0C\u4F8B\u5982\uFF1A\u7F8E\u599D, \u65C5\u904A, \u79D1\u6280" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 269,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 266,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 208,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 273,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u7D93\u71DF\u7684\u793E\u7FA4\u5E73\u53F0" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 277,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "social-rows", children: socials.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: "8px",
          padding: "12px",
          marginTop: "10px"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr 80px 36px",
          gap: "8px",
          alignItems: "flex-end"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "\u5E73\u53F0", data: ["Instagram", "YouTube", "TikTok", "Facebook", "Twitter", "LINE"], value: item.platform, onChange: (val) => updateSocial(item.id, "platform", val), size: "sm" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 291,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u5E33\u865F URL", value: item.url, onChange: (e) => updateSocial(item.id, "url", e.target.value), placeholder: "https://instagram.com/username", size: "sm" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 292,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", size: "sm", onClick: () => fetchFollowers(item.id, item.platform, item.url), disabled: !item.url, children: "\u53D6\u5F97\u8FFD\u8E64\u6578" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 298,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 293,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u8FFD\u8E64\u6578", readOnly: true, value: item.followers ? item.followers.toLocaleString() : "-", size: "sm", c: "dimmed" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 302,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { style: {
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "2px"
          }, children: idx !== 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { color: "red", variant: "light", onClick: () => removeSocial(item.id), style: {
            width: 36,
            height: 36,
            padding: 0
          }, children: "\xD7" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 308,
            columnNumber: 39
          }, this) }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 303,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 285,
          columnNumber: 21
        }, this) }, item.id, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 279,
          columnNumber: 45
        }, this)) }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 278,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "socialsJson", value: JSON.stringify(socials.map((s) => ({
          platform: s.platform,
          url: s.url,
          followers: s.followers
        }))) }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 319,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { mt: "md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "default", onClick: addSocial, disabled: socials.length >= 8, children: "+ \u65B0\u589E\u793E\u7FA4\u5E73\u53F0" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 325,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 324,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 276,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 331,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 333,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u53D7\u773E\u6578\u64DA\u8207\u6307\u6A19" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 337,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
          base: 1,
          sm: 2
        }, spacing: "md", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u4E92\u52D5\u7387 (%)", name: "engagementRate", type: "number", step: "0.01", placeholder: "\u4F8B\u5982\uFF1A4.5" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 342,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u66DD\u5149\u7387 (%)", name: "exposureRate", type: "number", step: "0.01", placeholder: "\u4F8B\u5982\uFF1A12.5" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 343,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 4, children: "\u53D7\u773E\u6027\u5225\u6BD4 (\u7537 %)" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 345,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "audienceMale", type: "number", placeholder: "\u4F8B\u5982\uFF1A30", onChange: (e) => {
              const val = Number(e.target.value);
              const fInput = document.getElementsByName("audienceFemale")[0];
              if (fInput)
                fInput.value = String(Math.max(0, 100 - val));
            } }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 346,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 344,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", fw: 500, mb: 4, children: "\u53D7\u773E\u6027\u5225\u6BD4 (\u5973 %)" }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 353,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "audienceFemale", type: "number", placeholder: "\u4F8B\u5982\uFF1A70", onChange: (e) => {
              const val = Number(e.target.value);
              const mInput = document.getElementsByName("audienceMale")[0];
              if (mInput)
                mInput.value = String(Math.max(0, 100 - val));
            } }, void 0, false, {
              fileName: "app/routes/_app.kols.new.tsx",
              lineNumber: 354,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 352,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { label: "\u4E3B\u8981\u53D7\u773E\u5E74\u9F61\u5C64", name: "audienceAge", placeholder: "\u4F8B\u5982\uFF1A18-24, 25-34" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 360,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 338,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 336,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 364,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "md", children: "\u63D0\u6848\u8207\u8A55\u4F30\u8CC7\u6599" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 368,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { label: "\u4EBA\u9078\u4ECB\u7D39 (\u7528\u65BC\u63D0\u6848\u64B0\u5BEB) *", name: "introduction", placeholder: "\u63CF\u8FF0\u6B64 KOL \u7684\u98A8\u683C\u7279\u8272\u3001\u53D7\u773E\u9ECF\u8457\u5EA6\u3001\u9069\u5408\u63A8\u5EE3\u7684\u7522\u54C1\u7B49\uFF0C\u9019\u5C07\u5E6B\u52A9\u696D\u52D9\u5FEB\u901F\u64B0\u5BEB\u63D0\u6848\u5167\u5BB9", minRows: 5, required: true }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 370,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { label: "\u63CF\u8FF0", name: "description", placeholder: "KOL \u5167\u5BB9\u98A8\u683C\u3001\u64C5\u9577\u4E3B\u984C\u3001\u5408\u4F5C\u4EAE\u9EDE", minRows: 4 }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 371,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, { label: "\u5167\u90E8\u5099\u8A3B", name: "internalComments", placeholder: "\u50C5\u5167\u90E8\u53EF\u898B\uFF0C\u4F8B\u5982\u5831\u50F9\u504F\u597D\u3001\u6E9D\u901A\u6CE8\u610F\u4E8B\u9805", minRows: 3 }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 372,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 369,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 367,
        columnNumber: 13
      }, this),
      actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "red", title: "\u5EFA\u7ACB\u5931\u6557", children: actionData.error }, void 0, false, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 376,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/kols", variant: "default", children: "\u53D6\u6D88" }, void 0, false, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 379,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", name: "intent", value: "draft", variant: "default", loading: submitting, children: "\u5132\u5B58\u8349\u7A3F" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 381,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", name: "intent", value: "create", loading: submitting, children: "\u5EFA\u7ACB KOL" }, void 0, false, {
            fileName: "app/routes/_app.kols.new.tsx",
            lineNumber: 382,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_app.kols.new.tsx",
          lineNumber: 380,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_app.kols.new.tsx",
        lineNumber: 378,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 206,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 205,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_app.kols.new.tsx",
      lineNumber: 204,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_app.kols.new.tsx",
    lineNumber: 197,
    columnNumber: 10
  }, this);
}
_s(KolCreatePage, "f7FVvSIXSnzvPw0QUnh0PGthK3o=", false, function() {
  return [useActionData, useNavigation];
});
_c = KolCreatePage;
var _c;
$RefreshReg$(_c, "KolCreatePage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  KolCreatePage as default
};
//# sourceMappingURL=/build/routes/_app.kols.new-VFYPJN5X.js.map
