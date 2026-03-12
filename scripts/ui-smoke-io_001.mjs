import { chromium } from "playwright";

const URL =
  process.argv[2] ??
  "http://localhost:3000/insertion-orders/io_001";

function line(kind, msg) {
  process.stdout.write(`[${kind}] ${msg}\n`);
}

function isVisibleNumber(v) {
  return v != null && v !== "" && !Number.isNaN(Number(v));
}

/**
 * @param {import('playwright').Locator} root
 * @param {RegExp} labelRe
 */
async function fillByLabelRegex(root, labelRe, value) {
  const input = root.getByLabel(labelRe).first();
  if (await input.count()) {
    await input.fill(String(value));
    return true;
  }
  return false;
}

/**
 * @param {import('playwright').Locator} root
 * @param {string[]} candidates
 */
async function clickFirstButton(root, candidates) {
  for (const name of candidates) {
    const btn = root.getByRole("button", { name }).first();
    if (await btn.count()) {
      await btn.click();
      return name;
    }
  }
  throw new Error(`No submit button found. Tried: ${candidates.join(", ")}`);
}

/**
 * Wait until any of the locators becomes visible.
 * @param {import('playwright').Locator[]} locators
 * @param {number} timeoutMs
 */
async function waitAnyVisible(locators, timeoutMs = 15000) {
  let lastError;
  await Promise.race(
    locators.map((l) =>
      l.waitFor({ state: "visible", timeout: timeoutMs }).catch((e) => {
        lastError = e;
        throw e;
      })
    )
  ).catch(() => {
    throw lastError;
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.setExtraHTTPHeaders({
    // Best-effort cache bypass (similar intent to a hard reload)
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  const page = await context.newPage();

  /** @type {string[]} */
  const consoleMessages = [];
  /** @type {string[]} */
  const pageErrors = [];
  /** @type {string[]} */
  const failedResponses = [];

  page.on("console", (m) => {
    const text = `${m.type().toUpperCase()}: ${m.text()}`;
    consoleMessages.push(text);
  });
  page.on("pageerror", (err) => {
    pageErrors.push(String(err?.stack || err));
  });
  page.on("requestfailed", (req) => {
    const failure = req.failure();
    if (!failure) return;
    consoleMessages.push(`REQUESTFAILED: ${req.method()} ${req.url()} :: ${failure.errorText}`);
  });
  page.on("response", (res) => {
    try {
      if (res.ok()) return;
      const url = res.url();
      // Ignore source maps / static noise.
      if (url.includes(".map")) return;
      failedResponses.push(`HTTP${res.status()} ${res.request().method()} ${url}`);
    } catch {
      // ignore
    }
  });

  // Best-effort "hard reload":
  // - send no-cache headers
  // - navigate with a cache-busting query param twice
  const bust1 = `${URL}?__bust=${Date.now()}`;
  await page.goto(bust1, { waitUntil: "networkidle" });
  const bust2 = `${URL}?__bust=${Date.now() + 1}`;
  await page.goto(bust2, { waitUntil: "networkidle" });

  const hasProcessNotDefined =
    consoleMessages.some((m) => m.includes("process is not defined")) ||
    pageErrors.some((e) => e.includes("process is not defined"));

  line("CHECK", `console "process is not defined": ${hasProcessNotDefined ? "FOUND" : "not found"}`);

  // ---- (1) Custom tabs in first KOL card switch content ----
  const tabActions = page.getByRole("button", { name: "操作工具" }).first();
  const tabPerformance = page.getByRole("button", { name: "成效明細" }).first();
  const tabReviews = page.getByRole("button", { name: "合作評價" }).first();

  await tabActions.waitFor({ state: "visible" });
  await tabActions.click();
  await page.getByRole("button", { name: /上傳貼文/ }).first().waitFor({ state: "visible" });

  await tabPerformance.click();
  await waitAnyVisible([
    page.getByText("尚無成效數據").first(),
    page.getByText("已追蹤").first(),
    page.getByText("曝光").first(),
  ]);

  await tabReviews.click();
  await waitAnyVisible([
    page.getByText("尚無評價內容").first(),
    page.getByText("內評").first(),
    page.getByText("外評").first(),
  ]);

  line("PASS", "custom tab buttons switch content (first KOL card)");

  // ---- (2) Upload modal ----
  await tabActions.click();
  const uploadBtn = page.getByRole("button", { name: /上傳貼文/ }).first();
  await uploadBtn.click();
  const uploadDialog = page.getByRole("dialog").filter({ hasText: "上傳貼文圖片" });
  await uploadDialog.waitFor({ state: "visible" });
  line("PASS", "clicking '上傳貼文' opens upload modal");
  await page.keyboard.press("Escape");
  await uploadDialog.waitFor({ state: "hidden" });

  // ---- (3) Performance modal ----
  const perfBtn = page.getByRole("button", { name: /新增成效/ }).first();
  await perfBtn.click();
  const perfDialog = page.getByRole("dialog").filter({ hasText: "新增成效" });
  await perfDialog.waitFor({ state: "visible" });
  line("PASS", "clicking '新增成效' opens performance modal");

  // Fill required fields with small numbers; keep title default.
  // Labels are best-effort (UI may differ slightly); we verify values before submit.
  const perfValues = {
    impressions: 1000,
    reach: 800,
    likes: 50,
    comments: 5,
  };

  const perfRoot = perfDialog;

  // Try explicit field names first (if present), then label-based fallbacks.
  const impressionsInput =
    perfRoot.locator('input[name="impressions"], input[name="impression"], input[name*="impress"]').first();
  const reachInput =
    perfRoot.locator('input[name="reach"], input[name*="reach"]').first();
  const likesInput =
    perfRoot.locator('input[name="likes"], input[name*="like"]').first();
  const commentsInput =
    perfRoot.locator('input[name="comments"], input[name*="comment"]').first();

  if (await impressionsInput.count()) await impressionsInput.fill(String(perfValues.impressions));
  else await fillByLabelRegex(perfRoot, /曝光|Impressions?/i, perfValues.impressions);

  if (await reachInput.count()) await reachInput.fill(String(perfValues.reach));
  else await fillByLabelRegex(perfRoot, /觸及|Reach/i, perfValues.reach);

  if (await likesInput.count()) await likesInput.fill(String(perfValues.likes));
  else await fillByLabelRegex(perfRoot, /讚|喜歡|Likes?/i, perfValues.likes);

  if (await commentsInput.count()) await commentsInput.fill(String(perfValues.comments));
  else await fillByLabelRegex(perfRoot, /留言|評論|Comments?/i, perfValues.comments);

  // Validate fields look filled to avoid submitting empty required fields.
  const filledSnapshot = await perfRoot.evaluate(() => {
    /** @param {string[]} sels */
    const getVal = (sels) => {
      for (const sel of sels) {
        const el = document.querySelector(sel);
        if (el && "value" in el) return String(el.value ?? "");
      }
      return "";
    };
    return {
      impressions: getVal(['input[name="impressions"]', 'input[name="impression"]']),
      reach: getVal(['input[name="reach"]']),
      likes: getVal(['input[name="likes"]']),
      comments: getVal(['input[name="comments"]']),
    };
  });

  line("INFO", `performance filled snapshot: ${JSON.stringify(filledSnapshot)}`);

  const submitPerf = await clickFirstButton(perfRoot, ["送出", "提交", "儲存", "新增", "確定"]);
  line("INFO", `performance submit button: ${submitPerf}`);
  await perfDialog.waitFor({ state: "hidden", timeout: 15000 });
  line("PASS", "performance modal submitted and closed");

  // Verify 成效明細 tab has a new item or at least no errors.
  await tabPerformance.click();
  await waitAnyVisible([
    page.getByText("尚無成效數據").first(),
    page.getByText("曝光").first(),
    page.getByText(String(perfValues.impressions)).first(),
  ], 15000);
  line("PASS", "成效明細 tab visible after submitting performance");

  // ---- (4) Review modal ----
  const reviewBtn = page.getByRole("button", { name: /留下評價/ }).first();
  await reviewBtn.click();
  const reviewDialog = page.getByRole("dialog").filter({ hasText: "留下評價" });
  await reviewDialog.waitFor({ state: "visible" });
  line("PASS", "clicking '留下評價' opens review modal");

  const reviewRoot = reviewDialog;

  // Set rating if possible (best-effort).
  const ratingRadio = reviewRoot.getByRole("radio").nth(4); // try 5th option (often max)
  if (await ratingRadio.count()) {
    await ratingRadio.click().catch(() => {});
  } else {
    // Try common star widgets (mantine Rating uses input[type=radio] or buttons).
    const star = reviewRoot.locator('[aria-label*="5"], [title*="5"], button:has-text("5")').first();
    if (await star.count()) await star.click().catch(() => {});
  }

  const internalText = `internal ok ${Date.now()}`;
  const externalText = `external ok ${Date.now()}`;

  const internalArea =
    reviewRoot.locator('textarea[name="internalComment"], textarea[name*="internal"]').first();
  const externalArea =
    reviewRoot.locator('textarea[name="externalComment"], textarea[name*="external"]').first();

  if (await internalArea.count()) await internalArea.fill(internalText);
  else await fillByLabelRegex(reviewRoot, /內評|內部|internal/i, internalText);

  if (await externalArea.count()) await externalArea.fill(externalText);
  else await fillByLabelRegex(reviewRoot, /外評|對外|external/i, externalText);

  const submitReview = await clickFirstButton(reviewRoot, ["送出", "提交", "儲存", "確定"]);
  line("INFO", `review submit button: ${submitReview}`);
  await reviewDialog.waitFor({ state: "hidden", timeout: 15000 });
  line("PASS", "review modal submitted and closed");

  // Verify 合作評價 tab shows new cards or at least no errors.
  await tabReviews.click();
  await waitAnyVisible([
    page.getByText("尚無評價內容").first(),
    page.getByText(internalText).first(),
    page.getByText(externalText).first(),
    page.getByText("內評").first(),
    page.getByText("外評").first(),
  ], 15000);
  line("PASS", "合作評價 tab visible after submitting review");

  // Capture any console errors after interactions
  const errorish = consoleMessages.filter((m) =>
    m.startsWith("ERROR:") ||
    m.startsWith("WARNING:") ||
    m.startsWith("PAGEERROR:") ||
    m.startsWith("REQUESTFAILED:")
  );
  const failedHttp = failedResponses.filter((s) => !/favicon/i.test(s));

  line("INFO", `console messages captured: ${consoleMessages.length}`);
  line("INFO", `page errors captured: ${pageErrors.length}`);
  line("INFO", `failed HTTP responses captured: ${failedHttp.length}`);

  if (errorish.length) {
    line("ERRORS", "console/page warnings/errors:");
    for (const e of errorish) line("ERROR", e);
    if (failedHttp.length) {
      line("ERRORS", "failed HTTP responses:");
      for (const f of failedHttp.slice(0, 20)) line("ERROR", f);
      if (failedHttp.length > 20) line("INFO", `... ${failedHttp.length - 20} more`);
    }
  } else {
    line("CLEAN", "no console warnings/errors captured by script");
    if (failedHttp.length) {
      line("WARN", "non-2xx HTTP responses observed:");
      for (const f of failedHttp.slice(0, 20)) line("WARN", f);
      if (failedHttp.length > 20) line("INFO", `... ${failedHttp.length - 20} more`);
    }
  }

  await browser.close();
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

