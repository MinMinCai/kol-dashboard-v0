import { test, expect, type BrowserContext } from "playwright/test";

// UI-level verification of the shared-folder feature. Each test uses an
// isolated browser context so the demo-auth and view-as cookies are scoped
// per-test. We pick the first two team members surfaced by the favorites
// loader to play "owner" and "recipient".

async function login(context: BrowserContext): Promise<void> {
  const page = await context.newPage();
  await page.goto("/login");
  // The login form posts an empty body and sets the demo-auth cookie.
  await page.locator("button[type=submit]").first().click();
  await page.waitForURL("**/dashboard", { timeout: 10_000 });
  await page.close();
}

async function discoverMembers(context: BrowserContext): Promise<Array<{ id: string; name: string }>> {
  const page = await context.newPage();
  await page.goto("/favorites", { waitUntil: "domcontentloaded" });
  // teamMembers is serialized into the loader payload (window.__remixContext).
  const members = await page.evaluate(() => {
    const ctx = (window as unknown as { __remixContext?: { state?: { loaderData?: Record<string, { teamMembers?: Array<{ id: string; name: string }> }> } } }).__remixContext;
    const data = ctx?.state?.loaderData ?? {};
    for (const v of Object.values(data)) {
      if (v && Array.isArray(v.teamMembers) && v.teamMembers.length > 0) return v.teamMembers;
    }
    return [];
  });
  await page.close();
  return members;
}

async function setViewAs(context: BrowserContext, memberId: string, redirectTo = "/favorites"): Promise<void> {
  const page = await context.newPage();
  // POST via fetch using cookies from the context.
  await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  await page.evaluate(async ({ memberId, redirectTo }) => {
    const fd = new FormData();
    fd.set("memberId", memberId);
    fd.set("redirectTo", redirectTo);
    await fetch("/api/view-as", { method: "POST", body: fd, redirect: "manual" });
  }, { memberId, redirectTo });
  await page.close();
}

test("owner sees full controls; recipient sees read-only shared folder", async ({ browser }) => {
  // Two isolated contexts so each has its own view-as cookie.
  const aliceCtx = await browser.newContext();
  const bobCtx = await browser.newContext();
  await login(aliceCtx);
  await login(bobCtx);

  const members = await discoverMembers(aliceCtx);
  expect(members.length, "need >=2 team members for the share scenario").toBeGreaterThanOrEqual(2);
  const alice = members[0];
  const bob = members[1];
  test.info().annotations.push({ type: "owner", description: alice.name });
  test.info().annotations.push({ type: "recipient", description: bob.name });

  await setViewAs(aliceCtx, alice.id);
  await setViewAs(bobCtx, bob.id);

  const folderName = `e2e-share-${Math.floor(Math.random() * 1_000_000)}`;

  // 1. Alice creates the folder via the dialog.
  const alicePage = await aliceCtx.newPage();
  await alicePage.goto("/favorites");
  await alicePage.getByRole("button", { name: /\+ 新增資料夾/ }).click();
  await alicePage.getByPlaceholder("例如：母嬰專案").fill(folderName);
  await alicePage.getByRole("button", { name: "建立" }).click();
  await alicePage.waitForURL(new RegExp(`folder=${encodeURIComponent(folderName)}`), { timeout: 10_000 });

  // The "管理目前資料夾" panel should show 擁有者 badge and full controls.
  await expect(alicePage.getByText("擁有者", { exact: false })).toBeVisible();
  await expect(alicePage.getByRole("button", { name: /改名/ })).toBeVisible();
  await expect(alicePage.getByRole("button", { name: /共享設定/ })).toBeVisible();
  await expect(alicePage.getByRole("button", { name: /刪除資料夾/ })).toBeVisible();

  // 2. Open the share dialog and pick Bob.
  await alicePage.getByRole("button", { name: /共享設定/ }).click();
  // The dialog's checkbox label includes Bob's name and email.
  const shareDialog = alicePage.locator("dialog#share-folder-dialog");
  await expect(shareDialog).toBeVisible();
  await shareDialog.getByLabel(new RegExp(bob.name)).check();
  await shareDialog.getByRole("button", { name: "儲存共享設定" }).click();

  // After share, expect the "已共享給 1 位成員" badge.
  await expect(alicePage.getByText(/已共享給 1 位成員/)).toBeVisible({ timeout: 10_000 });

  // 3. Bob opens favorites and confirms the folder shows up under "與我共享".
  const bobPage = await bobCtx.newPage();
  await bobPage.goto("/favorites");
  // Click the "與我共享" dropdown.
  await bobPage.getByRole("button", { name: /🔗 與我共享/ }).click();
  // Menu item should mention the folder.
  await expect(bobPage.getByRole("menuitem").filter({ hasText: folderName })).toBeVisible();

  // Navigate to that folder.
  await bobPage.getByRole("menuitem").filter({ hasText: folderName }).click();
  await bobPage.waitForURL(new RegExp(`folder=${encodeURIComponent(folderName)}`));

  // Recipient should see the "共享自" badge and NOT see owner-only controls.
  await expect(bobPage.getByText(/共享自/)).toBeVisible();
  await expect(bobPage.getByRole("button", { name: /改名/ })).toHaveCount(0);
  await expect(bobPage.getByRole("button", { name: /共享設定/ })).toHaveCount(0);
  await expect(bobPage.getByRole("button", { name: /刪除資料夾/ })).toHaveCount(0);

  // 4. Cleanup: switch back to Alice and delete the test folder.
  await alicePage.goto(`/favorites?folder=${encodeURIComponent(folderName)}`);
  // Submit via the delete button (which is in a Form, so triggers a real POST).
  await alicePage.getByRole("button", { name: /刪除資料夾/ }).click();
  // Page may redirect; just allow some settle time.
  await alicePage.waitForLoadState("networkidle").catch(() => {});

  await aliceCtx.close();
  await bobCtx.close();
});

test("kol-list folder picker only shows owned folders", async ({ browser }) => {
  // This regression-tests that listFavoriteFolders(memberId) filters correctly:
  // a folder owned by Alice should NOT appear in Bob's KOL-page picker.
  const aliceCtx = await browser.newContext();
  const bobCtx = await browser.newContext();
  await login(aliceCtx);
  await login(bobCtx);

  const members = await discoverMembers(aliceCtx);
  expect(members.length).toBeGreaterThanOrEqual(2);
  const alice = members[0];
  const bob = members[1];

  await setViewAs(aliceCtx, alice.id);
  await setViewAs(bobCtx, bob.id);

  const folderName = `e2e-private-${Math.floor(Math.random() * 1_000_000)}`;

  const alicePage = await aliceCtx.newPage();
  await alicePage.goto("/favorites");
  await alicePage.getByRole("button", { name: /\+ 新增資料夾/ }).click();
  await alicePage.getByPlaceholder("例如：母嬰專案").fill(folderName);
  await alicePage.getByRole("button", { name: "建立" }).click();
  await alicePage.waitForURL(new RegExp(`folder=${encodeURIComponent(folderName)}`));

  // Bob navigates to /kols. Open any KOL's heart icon → manage-folders modal.
  const bobPage = await bobCtx.newPage();
  await bobPage.goto("/kols?view=card");
  // Folder picker for KOLs lives behind the heart button on each card. The
  // simplest verification is just that the folder name does NOT appear in
  // Bob's rendered HTML at all (loader filter test).
  const html = await bobPage.content();
  expect(html).not.toContain(folderName);

  // Cleanup as Alice.
  await alicePage.goto(`/favorites?folder=${encodeURIComponent(folderName)}`);
  await alicePage.getByRole("button", { name: /刪除資料夾/ }).click();
  await alicePage.waitForLoadState("networkidle").catch(() => {});

  await aliceCtx.close();
  await bobCtx.close();
});
