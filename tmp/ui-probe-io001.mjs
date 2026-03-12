import { chromium } from "playwright";

const TARGET_URL = "http://localhost:63992/insertion-orders/io_001";

function nowIso() {
  return new Date().toISOString();
}

async function getActiveElementSummary(page) {
  return await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const asAny = /** @type {any} */ (el);
    return {
      tag: el.tagName,
      id: el.id || null,
      role: el.getAttribute("role"),
      name: el.getAttribute("name"),
      type: asAny.type ?? null,
      ariaLabel: el.getAttribute("aria-label"),
      text: (el.textContent || "").trim().slice(0, 120) || null,
      className: el.className ? String(el.className).slice(0, 200) : null,
    };
  });
}

async function getModalDiagnostics(page) {
  return await page.evaluate(() => {
    /** @param {Element} el */
    const diag = (el) => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const className = el.className ? String(el.className) : "";
      return {
        tag: el.tagName,
        id: el.id || null,
        className: className.slice(0, 300) || null,
        role: el.getAttribute("role"),
        ariaModal: el.getAttribute("aria-modal"),
        ariaHidden: el.getAttribute("aria-hidden"),
        dataMantine: el.getAttribute("data-mantine") || null,
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        pointerEvents: cs.pointerEvents,
        zIndex: cs.zIndex,
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
      };
    };

    const modalish = [
      ...document.querySelectorAll(
        [
          '[aria-modal="true"]',
          '[class*="mantine-Modal"]',
          '[class*="Modal"]',
          '[data-mantine*="Modal"]',
        ].join(",")
      ),
    ];

    const overlayish = [
      ...document.querySelectorAll(
        [
          '[class*="mantine-Overlay"]',
          '[class*="Overlay"]',
          '[data-mantine*="Overlay"]',
          '[data-overlay]',
        ].join(",")
      ),
    ];

    // Heuristic: full-screen-ish fixed overlays
    const fixedBig = [...document.querySelectorAll("div,section,aside")]
      .filter((el) => {
        const cs = window.getComputedStyle(el);
        if (cs.position !== "fixed") return false;
        const rect = el.getBoundingClientRect();
        return rect.width >= window.innerWidth * 0.8 && rect.height >= window.innerHeight * 0.8;
      })
      .slice(0, 20);

    return {
      modalish: modalish.slice(0, 20).map(diag),
      overlayish: overlayish.slice(0, 20).map(diag),
      fixedBig: fixedBig.map(diag),
    };
  });
}

async function clickFirstCardButtonByText(page, buttonText) {
  // "first KOL card" is ambiguous; prefer the first visible button with text.
  // If multiple matches exist, click the first visible instance.
  const locator = page.getByRole("button", { name: buttonText }).first();
  await locator.waitFor({ state: "visible", timeout: 15_000 });
  await locator.click();
}

async function clickAndProbe(page, label, screenshotPath) {
  const t0 = nowIso();
  const urlBefore = page.url();
  const activeBefore = await getActiveElementSummary(page);

  /** @type {{ts:string,type:string,message:string,location?:any}[]} */
  const consoleEvents = [];
  /** @type {{ts:string,name?:string,message:string,stack?:string}[]} */
  const pageErrors = [];
  /** @type {{ts:string,url:string,method?:string,resourceType?:string,failure?:string}[]} */
  const requestFailed = [];

  const onConsole = (msg) => {
    const type = msg.type();
    // Keep warnings/errors always; keep other types if they look relevant.
    const text = msg.text();
    if (type === "error" || type === "warning" || type === "assert") {
      consoleEvents.push({ ts: nowIso(), type, message: text, location: msg.location() });
    }
  };
  const onPageError = (err) => {
    pageErrors.push({
      ts: nowIso(),
      name: err?.name,
      message: String(err?.message || err),
      stack: err?.stack ? String(err.stack).slice(0, 2000) : undefined,
    });
  };
  const onRequestFailed = (req) => {
    const failure = req.failure();
    requestFailed.push({
      ts: nowIso(),
      url: req.url(),
      method: req.method(),
      resourceType: req.resourceType(),
      failure: failure?.errorText,
    });
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("requestfailed", onRequestFailed);

  let clickError = null;
  try {
    await clickFirstCardButtonByText(page, label);
  } catch (e) {
    clickError = String(e?.message || e);
  }

  // Give the UI a short beat to render modal and emit errors.
  await page.waitForTimeout(750);

  const urlAfter = page.url();
  const activeAfter = await getActiveElementSummary(page);
  const modalDiag = await getModalDiagnostics(page);

  await page.screenshot({ path: screenshotPath, fullPage: true });

  page.off("console", onConsole);
  page.off("pageerror", onPageError);
  page.off("requestfailed", onRequestFailed);

  return {
    t0,
    label,
    clickError,
    urlBefore,
    urlAfter,
    urlChanged: urlBefore !== urlAfter,
    activeBefore,
    activeAfter,
    modalDiag,
    consoleEvents,
    pageErrors,
    requestFailed: requestFailed.filter((r) => r.failure),
  };
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

// Capture navigation failures too.
page.on("console", (msg) => {
  if (msg.type() === "error") {
    // eslint-disable-next-line no-console
    console.log(`[console.error ${nowIso()}] ${msg.text()}`);
  }
});
page.on("pageerror", (err) => {
  // eslint-disable-next-line no-console
  console.log(`[pageerror ${nowIso()}] ${String(err?.message || err)}`);
});

// eslint-disable-next-line no-console
console.log(`[probe] goto ${TARGET_URL}`);
await page.goto(TARGET_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });
await page.waitForTimeout(500);

const results = [];
results.push(await clickAndProbe(page, "新增成效", "tmp/after-click-新增成效.png"));
results.push(await clickAndProbe(page, "留下評價", "tmp/after-click-留下評價.png"));

await browser.close();

// eslint-disable-next-line no-console
console.log(JSON.stringify({ target: TARGET_URL, results }, null, 2));

