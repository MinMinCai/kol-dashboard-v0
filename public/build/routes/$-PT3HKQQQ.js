import {
  createHotContext
} from "/build/_shared/chunk-5YHBI2JG.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-PNG5AS42.js";

// app/routes/$.tsx
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\$.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\$.tsx"
  );
  import.meta.hot.lastModified = "1773822961826.7412";
}
function SplatRoute() {
  return null;
}
_c = SplatRoute;
var _c;
$RefreshReg$(_c, "SplatRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  SplatRoute as default
};
//# sourceMappingURL=/build/routes/$-PT3HKQQQ.js.map
