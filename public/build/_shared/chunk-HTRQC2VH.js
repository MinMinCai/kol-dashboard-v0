import {
  createHotContext
} from "/build/_shared/chunk-YEIDLYOX.js";

// app/lib/mock-api.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\mock-api.ts"
  );
  import.meta.hot.lastModified = "1773283173707.516";
}
var MOCK_API_BASE = process.env.MOCK_API_BASE_URL ?? "http://127.0.0.1:4000";
//# sourceMappingURL=/build/_shared/chunk-HTRQC2VH.js.map
