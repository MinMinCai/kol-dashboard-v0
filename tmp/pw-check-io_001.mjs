import { chromium } from "playwright";

const url =
  process.argv[2] ?? "http://localhost:63992/insertion-orders/io_001";

function nowIso() {
  return new Date().toISOString();
}

async function waitForAnyModal(page, { timeoutMs = 8000 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const state = await page.evaluate(() => {
      const ariaModal = Array.from(
        document.querySelectorAll('[role="dialog"][aria-modal="true"]')
      ).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      const mantineModal = Array.from(
        document.querySelectorAll("[data-mantine-modal]")
      ).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      const overlays = Array.from(
        document.querySelectorAll(
          [
            "[data-mantine-overlay]",
            ".mantine-Modal-overlay",
            "[data-mantine-modal-overlay]",
          ].join(",")
        )
      ).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      return {
        ariaModalCount: ariaModal.length,
        mantineModalCount: mantineModal.length,
        overlayCount: overlays.length,
      };
    });

    if (
      state.ariaModalCount > 0 ||
      state.mantineModalCount > 0 ||
      state.overlayCount > 0
    )
      return state;
    await page.waitForTimeout(100);
  }
  return { ariaModalCount: 0, mantineModalCount: 0, overlayCount: 0 };
}

async function closeModalIfAny(page) {
  // Prefer Escape; it’s robust for Mantine modals.
  await page.keyboard.press("Escape").catch(() => {});
  // Wait a moment for animations.
  await page.waitForTimeout(200);
}

async function clickButtonByName(page, name, { anchor } = {}) {
  const byRole = page.getByRole("button", { name: new RegExp(name) }).first();
  const byCss = page.locator(`button:has-text("${name}")`).first();
  const byAnchor =
    anchor?.locator(
      `xpath=following::button[contains(normalize-space(.), "${name}")]`
    ) ?? null;

  try {
    const target = byAnchor ?? byRole;
    await target.waitFor({ state: "visible", timeout: 4000 });
    const disabled = await target.getAttribute("disabled");
    if (disabled != null) return { clicked: false, reason: "disabled" };
    await target.click();
    return { clicked: true, strategy: byAnchor ? "anchor-xpath" : "role" };
  } catch {
    // fall through
  }

  try {
    await byRole.waitFor({ state: "visible", timeout: 4000 });
    const disabled = await byRole.getAttribute("disabled");
    if (disabled != null) return { clicked: false, reason: "disabled" };
    await byRole.click();
    return { clicked: true, strategy: "role" };
    return;
  } catch {
    // fall through
  }

  await byCss.waitFor({ state: "visible", timeout: 8000 });
  const disabled = await byCss.getAttribute("disabled");
  if (disabled != null) return { clicked: false, reason: "disabled" };
  await byCss.click();
  return { clicked: true, strategy: "css-has-text" };
}

async function checkTabSwitching(page) {
  const ariaTabs = page.getByRole("tab");
  const ariaTabCount = await ariaTabs.count();

  if (ariaTabCount >= 2) {
    const first = ariaTabs.nth(0);
    const second = ariaTabs.nth(1);

    await second.click();
    await page.waitForTimeout(150);
    const secondSelected = await second.getAttribute("aria-selected");

    await first.click();
    await page.waitForTimeout(150);
    const firstSelected = await first.getAttribute("aria-selected");

    return {
      ok: secondSelected === "true" && firstSelected === "true",
      details: {
        strategy: "aria-role-tab",
        tabCount: ariaTabCount,
        secondSelected,
        firstSelected,
      },
    };
  }

  // Fallback: Mantine tabs sometimes render as buttons with data-mantine-* attributes.
  const mantineTabs = page.locator("[data-mantine-tab]");
  const mantineTabCount = await mantineTabs.count();
  if (mantineTabCount < 2) {
    return {
      ok: false,
      reason: `found ${ariaTabCount} aria tabs and ${mantineTabCount} mantine tabs (need >=2)`,
    };
  }

  const first = mantineTabs.nth(0);
  const second = mantineTabs.nth(1);

  const getActive = async (loc) =>
    (await loc.getAttribute("data-active")) ??
    (await loc.getAttribute("aria-selected"));

  await second.click();
  await page.waitForTimeout(150);
  const secondActive = await getActive(second);

  await first.click();
  await page.waitForTimeout(150);
  const firstActive = await getActive(first);

  return {
    ok: String(secondActive) === "true" && String(firstActive) === "true",
    details: {
      strategy: "data-mantine-tab",
      tabCount: mantineTabCount,
      secondActive,
      firstActive,
    },
  };
}

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleMessages = [];
  page.on("console", (msg) => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
    });
  });

  const pageErrors = [];
  page.on("pageerror", (err) => {
    pageErrors.push(String(err?.message ?? err));
  });

  console.log(`[${nowIso()}] Goto ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  // Give client-side hydration a beat.
  await page.waitForTimeout(500);

  const processNotDefined =
    consoleMessages.some((m) => /process is not defined/i.test(m.text)) ||
    pageErrors.some((e) => /process is not defined/i.test(e));

  console.log(
    `[${nowIso()}] Console/pageerror: process is not defined = ${processNotDefined}`
  );

  // Try to anchor to the “合作 KOL 列表” section; if not found, we still click by button name.
  const sectionHeading = page.getByText("合作 KOL 列表", { exact: false });
  if (await sectionHeading.count()) {
    await sectionHeading.first().scrollIntoViewIfNeeded().catch(() => {});
  }

  const anchor = (await sectionHeading.count()) ? sectionHeading.first() : null;

  const modalChecks = {};
  for (const name of ["上傳貼文", "新增成效", "留下評價"]) {
    const matchesRole = await page
      .getByRole("button", { name: new RegExp(name) })
      .count();
    const matchesCss = await page.locator(`button:has-text("${name}")`).count();

    const urlBefore = page.url();
    const clickResult = await clickButtonByName(page, name, { anchor });
    await page.waitForTimeout(150);
    const urlAfter = page.url();
    const state = await waitForAnyModal(page);
    modalChecks[name] = {
      matchesRole,
      matchesCss,
      clickResult,
      urlBefore,
      urlAfter,
      opened:
        state.ariaModalCount > 0 ||
        state.mantineModalCount > 0 ||
        state.overlayCount > 0,
      ...state,
    };
    await closeModalIfAny(page);
  }

  const tabs = await checkTabSwitching(page);
  const tabDebug = await page.evaluate(() => ({
    roleTablist: document.querySelectorAll('[role="tablist"]').length,
    roleTab: document.querySelectorAll('[role="tab"]').length,
    mantineTab: document.querySelectorAll("[data-mantine-tab]").length,
    mantineTabsRoot: document.querySelectorAll("[data-mantine-tabs]").length,
    roleRadiogroup: document.querySelectorAll('[role="radiogroup"]').length,
    roleRadio: document.querySelectorAll('[role="radio"]').length,
  }));

  console.log(`[${nowIso()}] Modal checks:`);
  console.log(JSON.stringify(modalChecks, null, 2));
  console.log(`[${nowIso()}] Tab switching:`);
  console.log(JSON.stringify(tabs, null, 2));
  console.log(`[${nowIso()}] Tab debug counts:`);
  console.log(JSON.stringify(tabDebug, null, 2));

  if (processNotDefined) {
    console.log(`[${nowIso()}] Console messages (first 30):`);
    console.log(
      JSON.stringify(
        consoleMessages.slice(0, 30).map((m) => ({
          type: m.type,
          text: m.text,
          url: m.location?.url,
          lineNumber: m.location?.lineNumber,
          columnNumber: m.location?.columnNumber,
        })),
        null,
        2
      )
    );
    console.log(`[${nowIso()}] Page errors:`);
    console.log(JSON.stringify(pageErrors, null, 2));
  }

  await browser.close();

  const allModalsOpened = Object.values(modalChecks).every((v) => v.opened);
  const success = !processNotDefined && allModalsOpened && tabs.ok;
  process.exitCode = success ? 0 : 1;
};

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

