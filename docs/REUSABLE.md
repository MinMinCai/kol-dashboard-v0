# 可遷移清單 (Cherry-Pick Guide)

> 給開新專案時用。把目前 codebase 分成「直接抄」「抄了改」「不要抄」三層，附上每個項目的搬遷注意事項。
>
> **背景**：本 repo 是 KOL DB **demo 階段**，資料層用 `app/lib/mock-api.server.ts` 寫死的 mock data，搭配 `mock/db.json` 與 cookie-based demo auth。新專案若要接真實 API / DB，請按以下分類搬。

## 速查表

| 類別 | 含義 | 路徑數量 |
|------|------|---------|
| 🟢 直接抄 | 與業務邏輯無關，新專案 0 成本可用 | 9 項 |
| 🟡 抄了改 | 邏輯可參考，但要對齊新專案的資料 model / API | 8 項 |
| 🔴 不要抄 | 純 demo 用，新專案不該帶過去 | 7 項 |
| 📖 讀文件即可 | 不是檔案，是 README 已寫好的 pattern | 4 段 |

---

## 🟢 直接抄（業務無關，pattern 通用）

### UI 元件

#### `app/components/DemoGenerateReportModal.tsx` + `.module.css`
- 通用「報告生成 demo modal」：KOL 選擇 + 模板 + 假進度條 + 100% 時觸發 callback。
- API：`opened` / `onClose` / `order` / `onComplete?`，內部封裝所有 modal 狀態與假進度邏輯。
- **抄注意**：相依 `useNotificationStore`（toast/banner）跟 `InsertionOrder` type，搬時把這兩個依賴一起調整。如果新專案沒有 toast 系統，把 `showToast` / `showBanner` 那段拿掉即可。

#### `app/components/ClientOnly.tsx`
- 只在 client 端渲染的 wrapper。處理 SSR-incompatible 元件（chart 圖表、依賴 `window` 的庫）。
- 直接抄、零依賴。

#### `app/components/GlobalNotification.tsx`
- 全域 toast / banner 容器，跟下面的 zustand store 配對。
- 直接抄。

### 狀態管理

#### `app/store/notification.ts`
- Zustand store：`showToast` / `showBanner` / `dismissToast` 等。
- 直接抄。需要 `zustand` 相依套件。

### Helpers

#### `app/lib/social-links.ts`
- 純函式：把 IG handle / YT URL / TikTok handle 等正規化為完整 URL。
- 直接抄、無外部相依。

### 全域樣式 / Build 配置

#### `app/styles.css`
- `.kol-card` `.io-card` 等共用 hover transition、`.social-link` `.template-download-link` 等小工具 class。
- 用了 `light-dark()` CSS 函式做 dark 模式變體，相依 Mantine 的 color-scheme attribute。
- 直接抄、注意命名衝突（class 名稱是全域，不是 CSS Module）。

#### `remix.config.mjs`
- 含 CSS Modules build gotcha 修正：
  ```js
  ignoredRouteFiles: ["**/.*", "**/*.module.css"],
  ```
- 沒這行 build 會以 `Cannot read properties of undefined (reading 'filter')` 從 `[plugin browser-route-module]` 失敗。**新專案如果用 CSS Modules + Remix classic compiler，這個一定要抄**。

#### `app/root.tsx` 中 `cssBundleHref` 接線
- ```ts
  import { cssBundleHref } from "@remix-run/css-bundle";
  
  export const links = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: mantineStylesHref },
  ];
  ```
- 沒接 `cssBundleHref`，CSS Modules 不會 bundle 進產出。
- 同時抄 `process.env` polyfill `<script>`（避免 Mantine / 其他庫在 client 端引用 Node globals 崩潰）。

#### `app/routes/_app.tsx` 內的 sidebar collapse `<style>` 區塊
- Mantine AppShell 的 navbar collapse 用 native CSS 處理（不靠 React state），即使 hydration 失敗也能用。
- 抄整段 `<style dangerouslySetInnerHTML>` 的 CSS 即可，注意改成新專案的 navbar selector。

---

## 🟡 抄了改（邏輯可參考，要對齊新資料 model）

### 資料層基礎

#### `app/lib/db.server.ts`
- Drizzle ORM + `postgres.js` singleton，含連線池配置與 `statement_timeout=0`（避免 pgBouncer 殺長查詢）。
- **抄注意**：DB schema 跟連線字串要換成新專案的；singleton pattern 跟 timeout 設定可整段抄。

#### `db/drizzle/schema.ts` + `migrations/`
- KOL / Proposal / IO / 收藏資料夾 / 通知 / catalog 等 schema 定義。
- **抄注意**：
  - 如果新專案 entity 跟 KOL DB 重疊度高（KOL、品牌、案件等），可以直接抄 schema 起手，再依需求調欄位。
  - migrations 是 demo 期間累積的，新專案應從 `0000_*.sql` 重新生（drizzle-kit generate）。

### 業務邏輯

#### `app/lib/kol-batch-import.server.ts`
- Excel 批量匯入 KOL：欄位驗證、`xlsx` 解析、社群數據 normalization。
- **抄注意**：欄位 mapping 跟新專案的 KOL schema 對齊；範本下載 API ([api.kols.batch-import-template.ts](../app/routes/api.kols.batch-import-template.ts)) 一起搬。

#### `app/lib/report-ppt.server.ts`
- 結案 PPT 生成：用 `docx` / `pptx` 組裝。已具備版型雛形。
- **抄注意**：與新專案的 IO / 成效資料 schema 緊耦合，搬之前先確認資料 shape。

#### `app/lib/notifications.server.ts`
- 提案異動通知：watcher 訂閱 + 寫入 notifications 表。
- **抄注意**：與 schema 中 `proposal_watchers` / `notifications` 兩張表強耦合，要嘛兩張表也搬，要嘛改寫成新專案的訂閱機制。

### 路由 / API patterns

#### `app/routes/api.kols.export-excel.ts` 的 `xlsx` 匯出 pattern
- `XLSX.write(wb, { type: "buffer" })` + `new Response(new Uint8Array(buffer), {...})` 這個型別包裝。
- **抄注意**：新版 TypeScript 把 Node `Buffer` 標成 `Buffer<ArrayBufferLike>`，不再直接 satisfy `BodyInit`。要包成 `new Uint8Array(buffer)` 才會 type-check 通過（同樣 pattern 用在 [api.proposals.$proposalId.generate-doc.ts](../app/routes/api.proposals.$proposalId.generate-doc.ts) 跟 [api.kols.batch-import-template.ts](../app/routes/api.kols.batch-import-template.ts)）。

#### `app/routes/_app.reports.generate.tsx` 的 `ReportActionResult` discriminated union
- Remix `useFetcher<typeof action>` 在 action 有多種 `json(...)` 回傳 shape 時，TS 推斷會塌成最小共通子集。解法：宣告 union 型別並用 `json<T>(...)` 標註所有路徑。
- **抄注意**：新專案如果遇到同樣的 `useFetcher data 屬性不存在` TS 錯誤，照這個 pattern 處理。

#### `app/routes/_app.dashboard.tsx` 的 `withTimeout` loader pattern
- ```ts
  const [data] = await withTimeout(
    Promise.all([slowQuery1(), slowQuery2()]),
    8000  // 8 sec timeout
  );
  ```
- 防 DB 慢查詢卡住整頁渲染（Vercel serverless cold start 特別有用）。
- 整個 codebase 多個 loader 都用這個 pattern，可以直接抄成 utility。

---

## 🔴 demo-only，不要抄

| 檔案 | 為什麼不要抄 |
|------|------|
| [app/lib/mock-api.server.ts](../app/lib/mock-api.server.ts)（**1700 行**） | 整檔是 mock data CRUD，新專案應接真實 API |
| [app/lib/demo-auth.server.ts](../app/lib/demo-auth.server.ts) | Cookie-based demo 登入，正式版要改用 BetterAuth + Google OAuth |
| [app/lib/demo-identity.server.ts](../app/lib/demo-identity.server.ts) | Demo「view-as」身份切換，正式版用真實 session |
| [mock/db.json](../mock/db.json) | mock 樣本資料 |
| [scripts/sync-sample-data.mjs](../scripts/sync-sample-data.mjs) | mock/db.json ↔ Supabase 同步腳本 |
| [scripts/seed.ts](../scripts/seed.ts) | demo 樣本 seed，與新專案的 seed 應重新設計 |
| [app/routes/api.view-as.ts](../app/routes/api.view-as.ts) | demo 身份切換 API |

**另外，路由中 hardcoded 的 mock 資料**（不要連著 modal JSX 一起抄）：
- IO Modal 內 `Gina (Demo)` 卡片、`總觸及 80K`、`互動率 7.8%` 寫死數值（[_app.insertion-orders._index.tsx](../app/routes/_app.insertion-orders._index.tsx) / [_app.insertion-orders.$insertionOrderId._index.tsx](../app/routes/_app.insertion-orders.$insertionOrderId._index.tsx)）
- 報告生成假進度條（`<DemoGenerateReportModal>` 內的 `setInterval` 模擬）—— 新專案如果要做真實生成，請參考 [_app.reports.generate.tsx](../app/routes/_app.reports.generate.tsx) 的 `generateFetcher` 實作

---

## 📖 不是檔案，是 pattern（讀完即可受用）

新專案開出來時，先把 README 這幾段讀過：

1. **README §9「樣式與元件慣例」** — Mantine props vs CSS Module 的選擇規則、dark/light 兩種模式、CSS Module 動態 class（含 `dangerouslySetInnerHTML` 內 script 切 class 的技巧）。
2. **README §10「Hydration 與 UI 穩定性備忘」** — Remix SSR 下 hydration 失敗的常見原因與防禦策略（穩定 ID、locale-stable 數字、`<button type="button">` 等）。
3. **README §11「資料庫穩定性與超時策略」** — `withTimeout` loader、`statement_timeout=0` 連線設定、health check API。
4. **memory: `feedback_refactor_principle.md`** — 重構樣式 / 結構時保留視覺與行為，不夾帶其他清理；如果你接的人有用 Claude Code 並 share memory，這條會自動帶過去。

---

## 抄之前的 checklist

- [ ] 確認新專案的資料 model 是否跟 `db/drizzle/schema.ts` 重疊（決定 schema 抄不抄）
- [ ] 確認新專案的 auth 方案（BetterAuth / Clerk / Supabase Auth / 自刻）
- [ ] 確認新專案是否一樣用 Remix classic compiler（決定 `cssBundleHref` 接法是否適用——Vite 版接法不同）
- [ ] 確認新專案的 Mantine 版本（這個 repo 是 7.17.8）
- [ ] 確認新專案要不要繼續用 zustand 做 toast，還是改用 Mantine `notifications`（API 不同）
