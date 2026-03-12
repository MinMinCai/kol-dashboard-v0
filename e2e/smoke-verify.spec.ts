import { test, expect, type Page, type TestInfo } from "playwright/test";
import fs from "node:fs";
import path from "node:path";

type ConsoleEntry = { type: string; text: string };

function attachConsoleCollector(page: Page) {
  const entries: ConsoleEntry[] = [];
  page.on("console", (msg) => {
    entries.push({ type: msg.type(), text: msg.text() });
  });
  page.on("pageerror", (err) => {
    entries.push({ type: "pageerror", text: String(err) });
  });
  return {
    entries,
    async attach(testInfo: TestInfo) {
      const content = entries.map((e) => `[${e.type}] ${e.text}`).join("\n");
      await testInfo.attach("console", {
        body: content || "(no console output)",
        contentType: "text/plain",
      });
    },
    getErrors() {
      return entries.filter((e) => ["error", "pageerror"].includes(e.type));
    },
  };
}

async function gotoFirstMatchingDetail(
  page: Page,
  listPath: string,
  detailPathPrefix: string
) {
  await page.goto(listPath);
  const detailHref = await page
    .locator(`a[href^="${detailPathPrefix}"]`)
    .first()
    .getAttribute("href");
  expect(detailHref, `Expected a link starting with ${detailPathPrefix}`).toBeTruthy();
  await page.goto(detailHref!);
}

test("Smoke verify requested flows", async ({ page }, testInfo) => {
  const consoleLog = attachConsoleCollector(page);

  // 1) Proposal detail page
  {
    // Prefer explicit example; fallback to first from list.
    const resp = await page.goto("/proposals/prop_001");
    if (!resp || resp.status() >= 400) {
      await gotoFirstMatchingDetail(page, "/proposals", "/proposals/");
    }

    // AI search requires a non-empty query to open the modal.
    await page.locator("#ai-search-input").fill("美妝");
    await expect(page.getByRole("button", { name: "開始搜尋" })).toBeVisible();
    await page.getByRole("button", { name: "開始搜尋" }).click();
    const aiResultsModal = page
      .getByRole("dialog")
      .filter({ hasText: /AI 搜尋結果/ })
      .first();
    await expect(aiResultsModal).toBeVisible();
    await expect(aiResultsModal).toContainText("AI 搜尋結果");
    await page.keyboard.press("Escape");
    await expect(aiResultsModal).toBeHidden();

    await expect(page.getByRole("button", { name: "+ 手動新增" })).toBeVisible();
    await page.getByRole("button", { name: "+ 手動新增" }).click();
    const manualAddModal = page
      .getByRole("dialog")
      .filter({ hasText: /新增 KOL 候選人/ })
      .first();
    await expect(manualAddModal).toBeVisible();

    // Select a KOL, fill required fields, and submit.
    await manualAddModal.getByLabel("選擇 KOL").click();
    const firstOption = page.getByRole("option").first();
    const selectedKolName = (await firstOption.innerText()).trim();
    await firstOption.click();
    await manualAddModal.getByLabel("建議合作版位").fill("IG 貼文 x1");
    const confirmAdd = manualAddModal.getByRole("button", { name: "確認加入" });
    await expect(confirmAdd).toBeEnabled();
    await confirmAdd.click();

    // Close modal if it stays open.
    if (await manualAddModal.isVisible()) {
      await page.keyboard.press("Escape");
    }

    // Confirm candidates table row count increased and has at least one row.
    const table = page.locator("table").first();
    await expect(table).toBeVisible();
    const bodyRows = table.locator("tbody tr");
    await expect(bodyRows.first()).toBeVisible();
    await expect(table).toContainText(selectedKolName);
  }

  // 2) KOL management
  {
    const resp = await page.goto("/kols/kol_003");
    if (!resp || resp.status() >= 400) {
      await gotoFirstMatchingDetail(page, "/kols", "/kols/");
    }

    await page.getByRole("button", { name: /查看聯絡方式/ }).click();
    const contactModal = page
      .getByRole("dialog")
      .filter({ hasText: /聯絡方式/ })
      .first();
    await expect(contactModal).toBeVisible();
    await expect(contactModal).toContainText("電話：");
    await expect(contactModal).toContainText("Email：");
    await page.keyboard.press("Escape");

    // Download report
    const downloadsDir = path.join(process.cwd(), "tmp", "downloads");
    fs.mkdirSync(downloadsDir, { recursive: true });

    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 15_000 }),
      page.getByRole("button", { name: /下載 KOL 報告/ }).click(),
    ]);
    const suggested = download.suggestedFilename();
    const saveTo = path.join(downloadsDir, suggested);
    await download.saveAs(saveTo);
    expect(fs.existsSync(saveTo)).toBeTruthy();
  }

  // 3) Insertion order detail
  {
    await page.goto("/insertion-orders/io_001");

    // Sidebar active item background should not be "blue filled".
    const active = page
      .locator("nav")
      .getByText("委刊單管理", { exact: false })
      .first();
    await expect(active).toBeVisible();
    const bg = await active.evaluate((el) => getComputedStyle(el).backgroundColor);
    testInfo.annotations.push({ type: "sidebar-active-bg", description: bg });
    expect(bg).not.toBe("rgb(34, 139, 230)"); // Mantine blue.6 filled background

    // Collaborations buttons and tabs still clickable (basic click).
    const buttons = page.getByRole("button").filter({ hasText: /協作|合作|collab/i });
    if ((await buttons.count()) > 0) {
      await buttons.first().click();
    }
    const tabs = page.getByRole("tab");
    if ((await tabs.count()) > 0) {
      await tabs.first().click();
    }
  }

  // 4) Sidebar collapse
  {
    // Ensure we're on a normal page with sidebar.
    await page.goto("/proposals");

    const sidebar = page.locator("aside, nav").first();

    const toggle = page
      .locator('button:has-text("☰")')
      .first()
      .or(page.getByRole("button", { name: /menu|sidebar/i }).first());

    await expect(toggle).toBeVisible();

    await toggle.click();
    const sb1 = await sidebar.boundingBox();
    if (sb1) expect(sb1.width).toBeLessThanOrEqual(80);
    await expect(page.getByText("提案管理")).toBeHidden();

    await toggle.click();
    const sb2 = await sidebar.boundingBox();
    if (sb2) expect(sb2.width).toBeGreaterThan(80);
    await expect(page.getByText("提案管理")).toBeVisible();
  }

  // 5) Settings tags
  {
    await page.goto("/settings?tab=tags");

    const rightPanel = page.locator("main").first();

    // Switch categories if possible and ensure right panel updates.
    // Category list is rendered as clickable cards (not buttons).
    const cat1 = "內容風格";
    const cat2 = "產業類別";
    await page.getByRole("button", { name: new RegExp(cat1) }).click();
    await expect(rightPanel.getByRole("heading", { name: cat1 })).toBeVisible();
    await page.getByRole("button", { name: new RegExp(cat2) }).click();
    await expect(rightPanel.getByRole("heading", { name: cat2 })).toBeVisible();

    // Add a tag
    await page.getByRole("button", { name: "新增標籤" }).click();
    const tagModal = page.getByRole("dialog");
    await expect(tagModal).toBeVisible();

    const newTagName = `e2e_${Date.now()}`;
    const nameInput = tagModal.getByLabel("標籤名稱");
    await nameInput.fill(newTagName);

    const saveBtn = tagModal.getByRole("button").filter({ hasText: /儲存|新增|確定|保存/ }).first();
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();
    await expect(tagModal).toBeHidden();

    await expect(page.getByText(newTagName).first()).toBeVisible();

    // Edit the tag
    await page.getByText(newTagName).first().click();
    const editModal = page.getByRole("dialog");
    await expect(editModal).toBeVisible();
    const updatedName = `${newTagName}_upd`;
    const editNameInput = editModal.getByLabel("標籤名稱");
    await editNameInput.fill(updatedName);
    await editModal.getByRole("button").filter({ hasText: /儲存|更新|確定|保存/ }).first().click();
    await expect(editModal).toBeHidden();
    await expect(page.getByText(updatedName).first()).toBeVisible();

    // Delete the tag via modal delete button
    await page.getByText(updatedName).first().click();
    const delModal = page.getByRole("dialog");
    await expect(delModal).toBeVisible();
    const delBtn = delModal.getByRole("button").filter({ hasText: /刪除|删除|Delete/i }).first();
    await expect(delBtn).toBeVisible();
    await delBtn.click();
    await delModal.getByRole("button", { name: /確認刪除/ }).click();
    await expect(page.getByText(updatedName)).toHaveCount(0);

    // Rename category
    const editCategoryBtn = page.getByRole("button", { name: "編輯分類" });
    if (await editCategoryBtn.isVisible().catch(() => false)) {
      await editCategoryBtn.click();
      const catModal = page.getByRole("dialog");
      await expect(catModal).toBeVisible();
      const catInput = catModal.getByLabel("分類名稱");
      const original = (await catInput.inputValue()).trim() || "分類";
      const renamed = `${original}_e2e`;
      await catInput.fill(renamed);
      await catModal.getByRole("button").filter({ hasText: /儲存|更新|確定|保存/ }).first().click();
      await expect(catModal).toBeHidden();
      await expect(page.getByText(renamed).first()).toBeVisible();
    }

    // Delete category
    const deleteCategoryBtn = page.getByRole("button", { name: "刪除分類" });
    if (await deleteCategoryBtn.isVisible().catch(() => false)) {
      await deleteCategoryBtn.click();
      const deleteModal = page
        .getByRole("dialog")
        .filter({ hasText: /刪除分類/ })
        .first();
      await expect(deleteModal).toBeVisible();
      await deleteModal.getByRole("button", { name: "確認刪除" }).click();
      // Category should be removed and another selected: ensure tags UI still present.
      await expect(page.getByText("標籤分類", { exact: true })).toBeVisible();
    }
  }

  await consoleLog.attach(testInfo);
  // Do not hard-fail on console errors; record them for reporting.
  // But still make them visible in test output as annotations.
  for (const err of consoleLog.getErrors()) {
    testInfo.annotations.push({ type: "console-error", description: err.text });
  }

  const outDir = path.join(process.cwd(), "tmp");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "e2e-console.log"),
    consoleLog.entries.map((e) => `[${e.type}] ${e.text}`).join("\n") || "(no console output)",
    "utf8",
  );
});

