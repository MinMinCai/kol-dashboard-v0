import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const BASE = "http://localhost:63992";
const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "artifacts");

function nowSlug() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

mkdirSync(OUT_DIR, { recursive: true });

const runId = nowSlug();
const logPath = path.join(OUT_DIR, `run-${runId}.log`);
const logs = [];
function log(line) {
  const msg = `[${new Date().toISOString()}] ${line}`;
  logs.push(msg);
  // Also print for shell output
  console.log(msg);
}

async function screenshot(page, name) {
  const shotPath = path.join(OUT_DIR, `${runId}-${name}.png`);
  await page.screenshot({ path: shotPath, fullPage: true });
  log(`screenshot: ${shotPath}`);
}

async function gotoWithBypass(page, path) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  log(`goto: ${url}`);
  const res = await page.goto(url, { waitUntil: "networkidle" });
  const finalUrl = page.url();
  log(`landed: ${finalUrl} (status ${res?.status() ?? "n/a"})`);
  if (finalUrl.includes("/login")) {
    log(`redirected to /login, trying bypass via /dashboard`);
    await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
    log(`after bypass landed: ${page.url()}`);
    await page.goto(url, { waitUntil: "networkidle" });
    log(`after bypass goto landed: ${page.url()}`);
  }
}

async function clickAndCheckModal({ page, buttonNameRegex, modalId, modalTitleContains, shotPrefix }) {
  const btn = page.getByRole("button", { name: buttonNameRegex }).first();
  await btn.scrollIntoViewIfNeeded();
  log(`click: button ${buttonNameRegex}`);
  await btn.click({ timeout: 10_000 });

  // Prefer checking explicit id (added in code) but fall back to dialog role.
  const modalById = page.locator(`#${modalId}`);
  const dialogByRole = page.getByRole("dialog").filter({ hasText: modalTitleContains });
  const titleText = page.locator(`text=${modalTitleContains}`).first();

  let opened = false;
  try {
    await Promise.race([
      modalById.waitFor({ state: "visible", timeout: 5_000 }),
      dialogByRole.waitFor({ state: "visible", timeout: 5_000 }),
      titleText.waitFor({ state: "visible", timeout: 5_000 }),
    ]);
    opened = true;
  } catch {
    opened = false;
  }

  log(`modal_opened(${modalId}): ${opened}`);
  await screenshot(page, `${shotPrefix}-after-click`);

  // Close if opened (ESC tends to work for Mantine Modal)
  if (opened) {
    await page.keyboard.press("Escape");
    try {
      await Promise.race([
        modalById.waitFor({ state: "hidden", timeout: 5_000 }),
        dialogByRole.waitFor({ state: "hidden", timeout: 5_000 }),
        titleText.waitFor({ state: "hidden", timeout: 5_000 }),
      ]);
      log(`modal_closed(${modalId}): true`);
    } catch {
      log(`modal_closed(${modalId}): false (still visible?)`);
    }
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

page.on("console", (msg) => {
  log(`console.${msg.type()}: ${msg.text()}`);
});
page.on("pageerror", (err) => {
  log(`pageerror: ${err?.message ?? String(err)}`);
});
page.on("requestfailed", (req) => {
  log(`requestfailed: ${req.url()} (${req.failure()?.errorText ?? "unknown"})`);
});

try {
  await gotoWithBypass(page, "/insertion-orders/io_001");
  await screenshot(page, "io_001-loaded");

  // Ensure the KOL list section is present.
  const sectionTitle = page.getByRole("heading", { name: "合作 KOL 列表" });
  const hasSection = await sectionTitle.isVisible().catch(() => false);
  log(`has_section(合作 KOL 列表): ${hasSection}`);
  if (!hasSection) {
    // Try reaching via list page navigation if direct link didn't land correctly.
    await gotoWithBypass(page, "/insertion-orders");
    await screenshot(page, "insertion-orders-list");
    // Click the first link that contains io_001 if present, otherwise first row card link.
    const ioLink = page.getByRole("link", { name: /io_001/i }).first();
    if (await ioLink.isVisible().catch(() => false)) {
      log("click: link io_001");
      await ioLink.click();
    } else {
      const firstDetailLink = page.locator('a[href*="/insertion-orders/"]').first();
      log("click: first insertion-order detail link");
      await firstDetailLink.click();
    }
    await page.waitForLoadState("networkidle");
    await screenshot(page, "detail-after-nav");
  }

  // Tab buttons (custom <button> inside the first KOL card)
  for (const tabName of ["操作工具", "成效明細", "合作評價"]) {
    const tabBtn = page.getByRole("button", { name: tabName }).first();
    const visible = await tabBtn.isVisible().catch(() => false);
    log(`tab_visible(${tabName}): ${visible}`);
    if (visible) {
      await tabBtn.scrollIntoViewIfNeeded();
      await tabBtn.click();
      log(`tab_clicked(${tabName}): true`);
      await screenshot(page, `tab-${encodeURIComponent(tabName)}`);
    } else {
      log(`tab_clicked(${tabName}): false (not found)`);
    }
  }

  // Make sure we're on "操作工具" before trying action buttons (they are hidden on other tabs).
  const actionsTab = page.getByRole("button", { name: "操作工具" }).first();
  if (await actionsTab.isVisible().catch(() => false)) {
    await actionsTab.click();
    log("tab_clicked(操作工具): true (prep for action buttons)");
    await screenshot(page, "tab-actions-before-actions");
  }

  // Action buttons => should open modals
  await clickAndCheckModal({
    page,
    buttonNameRegex: /上傳貼文/,
    modalId: "upload-modal",
    modalTitleContains: "上傳貼文圖片 -",
    shotPrefix: "upload",
  });
  await clickAndCheckModal({
    page,
    buttonNameRegex: /新增成效/,
    modalId: "perf-modal",
    modalTitleContains: "新增成效 -",
    shotPrefix: "performance",
  });
  await clickAndCheckModal({
    page,
    buttonNameRegex: /留下評價/,
    modalId: "review-modal",
    modalTitleContains: "留下評價 -",
    shotPrefix: "review",
  });
} finally {
  writeFileSync(logPath, logs.join("\n") + "\n", "utf8");
  log(`wrote log: ${logPath}`);
  await browser.close();
}

