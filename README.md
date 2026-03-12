# KOL_DB (Remix + Node.js + Drizzle)

KOL_DB 目標是把 KOL 行銷合作的完整生命週期集中管理：
- 資料集中化
- 流程數位化
- 知識累積
- AI 輔助決策（進階版）

## 技術棧

- **Frontend**: `React Router v7 (Remix)` + `Mantine v7` + `Zustand`
- **Backend runtime**: `Node.js`
- **Server**: `Remix server-side` (Loader/Action Data Flow)
- **Database**: `PostgreSQL 18` + `Drizzle ORM` (目前運用 `json-server` 作為 Mock API 快速迭代前端 UI)
- **Authentication**: `BetterAuth` (Google OAuth)
- **Deployment**: `GCP Cloud Run`
- **架構模式**: 強調 Server-Driven UI 與原生 HTML 元素的運用（`<form>`, `<dialog>`），保障 Hydration 失敗時仍具備核心功能。

## 目前檔案

- `docs/architecture.md`: 核心模組與流程
- `docs/implementation-remix-node.md`: 技術實作設計
- `docs/mvp-roadmap.md`: 12 週 MVP 路線圖
- `db/schema.sql`: PostgreSQL SQL schema
- `db/drizzle/schema.ts`: Drizzle schema（TypeScript）
- `db/drizzle/relations.ts`: Drizzle relations

## 資料表關聯關係 (Data Models)

目前系統主要圍繞以下實體進行關聯：

1. **User (使用者)**: 包含系統管理員與編輯者 (BetterAuth)。
2. **KOL (網紅)**: 系統核心實體。記錄社群數據、基本資料、報價與貼籤。
   - `1-to-N` 對應到 **Favorite (收藏)**
   - `1-to-N` 對應到 **KolCollaboration (合作紀錄)**
3. **Proposal (提案)**: 紀錄給客戶的提案專案狀態。
   - `1-to-N` 關聯多個 KOL 以展示候選名單。
4. **Insertion Order (委刊單)**: 執行中的合作合約。
   - `1-to-N` 對應多筆 **OrderKolCollaboration (委刊單-KOL 執行明細)**，包含授權項目、專案報價與稅率等財務細節。
   - 包含對應的 **Metrics (成效數據)** 與 **Reviews (評價)**。

## 已實作功能 (MVP UI)

目前已完成高保真度 UI 開發與多數前端核心互動邏輯，以及針對 React 環境不穩定所做的原生加強：

- **儀表板 (Dashboard)**：KPI 指標 + 各功能入口卡片。
- **KOL 管理 (`_app.kols._index.tsx`)**：
  - 卡片 / 表格視圖切換（使用原生 `<a>` 連結切換，由 SSR 控制）。
  - 全文搜尋與右側篩選（直接以 URL search params 送出 `GET` 請求，達成 SSR 狀態同步）。
  - 排序功能。
  - **加入/取消收藏** (使用 Remix `Form` Action 搭配 Mock API 達成即時更新)。
  - **批量匯入 Excel 模擬** (原生 HTML `<dialog>` 與 JS 原生拖曳解析事件)。
- **KOL 詳細頁 (`_app.kols.$kolId._index.tsx`)**：
  - **查看聯絡方式**（以 Modal 呈現電話/Email）。
  - **下載 KOL 報告**（前端產生 JSON 檔案下載，利於後續串接正式報告匯出）。
- **我的收藏 (`_app.favorites.tsx`)**：
  - 資料夾分類管理。
  - 取消收藏 KOL 聯動更新。
- **提案管理 (`_app.proposals._index.tsx` & `_app.proposals.$proposalId.tsx`)**：
  - 提案詳細頁支援 **AI 搜尋（Mock）** 開啟結果視窗並加入候選名單。
  - **手動新增 KOL 候選人**（Modal 表單送出後即更新候選表格）。
- **委刊單管理 (`_app.insertion-orders._index.tsx` & `_app.insertion-orders.new.tsx`)**：
  - 委刊單列表與分頁。
  - **建立委刊單與智慧帶入**：支援由 Excel 檔案拖曳上傳與自動解析 (運用原生 `FileReader` 與 Vanilla JS)，並自動填充表單各欄位（包含財務總計與選定 KOL）。
  - 委刊單批量匯入彈窗支援。
- **委刊單詳細頁 (`_app.insertion-orders.$insertionOrderId.tsx`)**：
  - 合作 KOL 列表內的 tab/按鈕可正常互動，並可新增成效與評價（Remix action）。
- **系統設定 (`_app.settings.tsx`)**：
  - 使用 URL params 作為 Tab 狀態（如 `?tab=clients`），避免使用客製元件造成互動失效。
  - 含有客戶管理、標籤管理等基礎介面。
- **標籤管理（設定頁 tags 分頁）**：
  - 分類可點選切換
  - 新增 / 編輯 / 刪除標籤
  - 編輯 / 刪除分類（目前為前端 state 模擬，待接後端）
- **全域操作 (`_app.tsx` 與 Root)**：
  - 行動版友善、原生事件驅動的「側邊欄收合」功能與版面自適應佈局。
  - 不依賴 React Hook 的可靠「日夜主題切換 (Dark Mode)」功能。
  - 客製化全域 **404 找不到頁面 (Error Boundary)** 與未知路由擷取 (`$.tsx`)。
  - **Modal 遮罩一致性**：調整側邊欄層級，確保彈窗遮罩可覆蓋左側選單。

## 開發備忘：解決 Hydration 與按鈕失效問題

在 Remix (SSR) 環境下，若伺服器與客戶端渲染的 HTML 不一致（Hydration Mismatch），React 可能會無法正確掛載事件監聽器，導致按鈕、分頁標籤等互動元件失效。

### 核心防範策略

1.  **穩定數字與日期格式**：
    - **問題**：`toLocaleString()` 在伺服器端（可能是 Node.js 預設語系）與客戶端（瀏覽器語系）若不一致，會觸發 Hydration 錯誤。
    - **解法**：強制指定語系，如 `value.toLocaleString("zh-TW")`。

2.  **分配穩定 ID**：
    - **問題**：Mantine 的 `Tabs`、`Modal` 等元件在 SSR 時產生的自動 ID 可能與客戶端不符。
    - **解法**：手動傳入固定的 `id` 屬性，例如 `<Tabs id="kol-detail-tabs">`。

3.  **處理 SSR 不相容元件**：
    - **問題**：如圖表（`BarChart`）或高度依賴 DOM 的元件，在 SSR 階段常會出錯。
    - **解法**：使用 `~/components/ClientOnly.tsx` 封裝，確保該區塊僅在客戶端掛載後才渲染。
    - *註：若發現頁面無限載入，請優先檢查 `ClientOnly` 內部的組件是否觸發了致命的 Hydration 錯誤導致 React 渲染崩潰。*

4.  **按鈕標法**：
    - 始終為 `Button` 或 `<button>` 加上 `type="button"`（除非是為了送出表單），避免在某些 Context 下觸發預設的 Submit 行為或干擾事件傳遞。

5.  **診斷工具**：
    - 若按鈕無反應，請優先檢查瀏覽器 **Console** 是否有 `Hydration failed` 或 `Text content did not match` 等警告。只要有這類警告，JavaScript 點擊事件通常都不會生效。

6. **避免在 Route JSX 內用 `<script>` 綁事件（重要）**：
   - **問題**：在 React Router/Remix 的 client-side navigation 下，動態插入的 `<script>` 不一定會執行，導致「按鈕看得到但點擊無反應」。
   - **建議**：優先使用 React 事件（`onClick`/`useFetcher`/`Form`）、或用 `useEffect` 綁原生事件（僅在極端需要避開 hydration 時）。

7. **`process is not defined`（圖表/第三方套件）**：
   - **現象**：頁面載入即拋錯，後續互動（Modal、按鈕）可能全面失效。
   - **解法**：在 `root.tsx` `<head>` 提前注入 `window.process.env.NODE_ENV` polyfill（避免 bundle 初始化階段就崩潰）。

