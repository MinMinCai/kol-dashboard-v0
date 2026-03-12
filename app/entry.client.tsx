import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// Some browser-bundled dependencies (e.g. chart libs) still read `process.env`.
// Vite/Remix doesn't polyfill Node globals by default, which can crash the page
// and prevent parts of the UI from becoming interactive.
if (typeof globalThis !== "undefined" && !(globalThis as any).process) {
  (globalThis as any).process = {
    env: {
      NODE_ENV:
        // Prefer Vite mode if available; otherwise default to "development".
        (typeof import.meta !== "undefined" &&
          (import.meta as any).env &&
          (import.meta as any).env.MODE) ||
        "development",
    },
  };
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
