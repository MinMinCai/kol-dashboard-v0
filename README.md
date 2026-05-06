## KOL_DB 

KOL_DB 是一套專為 KOL 行銷企劃團隊設計的 **完整生命週期管理系統**，目標是把 KOL 相關的所有資訊與流程集中在同一套工具中：

- **資料集中化**：KOL 基本資料、社群數據、報價與合作歷史一站式管理。
- **流程數位化**：從提案、委刊、執行到結案報告，整體流程線上化。
- **知識累積**：保留每次合作成效與評價，形成團隊知識庫。
- **AI 輔助決策（進階版）**：透過自然語言搜尋與 AI 分析，輔助選人與複盤。

---

### 目錄

1. [整體技術與架構](#整體技術與架構)  
2. [專案結構](#專案結構)  
3. [核心功能模組](#核心功能模組)  
4. [資料模型與關聯](#資料模型與關聯-data-models)  
5. [開發環境與指令](#開發環境與指令)  
   - [部署（Vercel）](#部署vercel)  
6. [開發流程與優先級](#開發流程與優先級)  
7. [測試與驗收標準](#測試與驗收標準)  
8. [正式部署技術規劃（成效截圖 / 貼文截圖）](#正式部署技術規劃成效截圖--貼文截圖功能)  
9. [樣式與元件慣例](#樣式與元件慣例-style--component-conventions)  
10. [Hydration 與 UI 穩定性備忘](#hydration-與-ui-穩定性備忘)  
11. [資料庫穩定性與超時策略](#資料庫穩定性與超時策略)  
12. [補充資源](#補充資源)  

---

## 整體技術與架構

### 技術棧概覽

| 層級 | 技術方案 | 版本 | 核心優勢 |
|------|--------|------|--------|
| **前端框架** | Remix (`@remix-run/*`) | 2.16.7 | 伺服端渲染 + 最佳化資料載入；與 `@vercel/remix` 整合 |
| **UI 元件庫** | Mantine（`core`/`hooks`/`dates`/`charts`） | 7.17.8 | 專業級元件，適合管理後台 |
| **圖表** | Recharts + `@mantine/charts` | 2.15.4 | KOL 趨勢圖、儀表板 SparkLine |
| **圖示** | `@tabler/icons-react` | 3.40.0 | 與 Mantine 整合度高 |
| **狀態管理** | Zustand | 5.0.8 | 輕量級、TypeScript 友善（用於全域 toast/notification） |
| **執行時環境** | Node.js | ≥20 | 穩定、高效能 |
| **資料庫** | PostgreSQL (Supabase) | - | 關聯式、強大查詢功能，雲端託管 |
| **ORM 框架** | Drizzle ORM + `postgres` | 0.45 / 3.4 | 型別安全、schema 即代碼；走 pgBouncer 連線池 |
| **認證系統** | Demo Cookie Auth（現行）／ BetterAuth + Google OAuth（未來） | 1.5.5 | Demo 階段以 Cookie 模擬登入；正式版切回 BetterAuth |
| **檔案處理** | `xlsx` / `docx` / `adm-zip` | 0.18 / 9.6 / 0.5 | Excel 批量匯入匯出、Word 提案文件、PPT zip 操作 |
| **資料驗證** | Zod | 3.25 | API / 表單輸入型別檢核 |
| **日期處理** | Day.js | 1.11 | 統一在地化格式化（避免 SSR locale 漂移） |
| **部署平台** | [Vercel](https://vercel.com) | - | Remix（`@vercel/remix`）、與 Git 整合自動部署 |
| **語言** | TypeScript | 5.9.2 | 型別安全、開發效率提升 |

- **Server**: Remix server-side (Loader/Action Data Flow)  
- **Database**: Supabase（PostgreSQL 雲端託管，透過 Drizzle ORM 操作）  
- **整體架構模式**: Server-Driven UI，強調原生 `<form>`、`<dialog>` 等 HTML 元素，確保就算 Hydration 失敗仍保有基本操作能力。

### 三層架構設計

```text
┌─────────────────────────────────────────────────┐
│         前端層 (Presentation Layer)              │
│  React Routes + Mantine UI + Zustand State      │
│  * 支援 Native DOM Events (如 HTML <dialog>)     │
│  * 以 URL State 取代客製 Local State 免受 Hydration 干擾 │
└──────────┬──────────────────────────────────────┘
           │ HTTP/REST API / Remix Form Actions
┌──────────▼──────────────────────────────────────┐
│         伺服層 (Application Layer)                │
│  Remix Server-Side (Node.js Runtime)            │
│  - 路由管理 (Loader 資料獲取 / Action 資料修改)     │
│  - 業務邏輯                                      │
│  - BetterAuth 認證 & RBAC                       │
└──────────┬──────────────────────────────────────┘
           │ SQL Queries
┌──────────▼──────────────────────────────────────┐
│         資料層 (Data Layer)                       │
│  Supabase (PostgreSQL) + Drizzle ORM            │
│  - KOL (含 Favorites, Tags, Social Metrics)      │
│  - 提案專案 (Proposals)                           │
│  - 委刊單 (Insertion Orders) 與執行細節           │
│  - 使用者與權限                                  │
└─────────────────────────────────────────────────┘
```

---

## 專案結構

```text
kol-db-demo/
├── app/                              # Remix 應用程式核心
│   ├── entry.client.tsx              # 客戶端入口
│   ├── entry.server.tsx              # 伺服端入口
│   ├── root.tsx                      # 根元件 (布局 + 全域 ErrorBoundary + process polyfill)
│   ├── styles.css                    # 全局樣式
│   ├── components/                   # 可複用 UI 元件
│   │   ├── ClientOnly.tsx            # 僅客戶端渲染包裝（避免 SSR 不相容）
│   │   ├── GlobalNotification.tsx    # 全域通知／Toast 容器
│   │   ├── DemoGenerateReportModal.tsx       # 委刊單一覽／詳情共用：demo 報告生成 modal（KOL 選擇 + 模板 + 假進度條）
│   │   └── DemoGenerateReportModal.module.css
│   ├── store/
│   │   └── notification.ts           # Zustand 全域通知狀態
│   ├── lib/
│   │   ├── auth.server.ts            # BetterAuth 設定（正式版用，含 Google OAuth）
│   │   ├── demo-auth.server.ts       # Demo 階段：Cookie-based 登入（暫代 BetterAuth）
│   │   ├── demo-identity.server.ts   # Demo 階段：使用者身份切換（搭配 view-as）
│   │   ├── db.server.ts              # Drizzle + postgres.js 連線（singleton + 連線池調整）
│   │   ├── mock-api.server.ts        # 資料存取層（業務 API / Drizzle）
│   │   ├── kol-batch-import.server.ts # KOL Excel 批量匯入：欄位驗證 + xlsx 解析
│   │   ├── notifications.server.ts   # 提案異動通知：寫入 notifications + watcher 派送
│   │   ├── report-ppt.server.ts      # 結案 PPT 生成（pptx / docx 組裝）
│   │   └── social-links.ts           # 社群連結正規化共用函式
│   └── routes/                       # 路由模組（每個 *.tsx 對應 *.module.css，提供 scoped CSS；詳見「樣式與元件慣例」）
│       ├── $.tsx                              # 404 全域捕捉路由 (Splat Route)
│       ├── _index.tsx                         # 根路徑 `/` → redirect `/login`
│       ├── login.tsx                          # 登入頁（demo cookie auth）
│       ├── _app.tsx                           # 主應用佈局 (側邊欄、導覽、view-as)
│       ├── _app.dashboard.tsx                 # 儀表板（KOL/提案/委刊單統計 + SparkLine）
│       ├── _app.settings.tsx                  # 系統設定 (URL-driven Tabs)
│       ├── _app.kols._index.tsx               # KOL 列表（搜尋／篩選／批量匯入／engagement 排序）
│       ├── _app.kols.new.tsx                  # 新增 KOL
│       ├── _app.kols.$kolId._index.tsx        # KOL 詳情（多平台 metrics、合作歷史）
│       ├── _app.kols.$kolId.edit.tsx          # KOL 編輯（含 audience metrics、性別年齡）
│       ├── _app.proposals._index.tsx          # 提案列表（filter / sort / pagination）
│       ├── _app.proposals.new.tsx             # 新提案（預算欄位、預填收藏 KOL）
│       ├── _app.proposals.$proposalId.tsx     # 提案詳情（候選人排序、AI 分析、上傳報告）
│       ├── _app.insertion-orders._index.tsx              # 委刊單列表（單號排序 / AI 報告生成入口）
│       ├── _app.insertion-orders.new.tsx                 # 新增委刊單（Excel 智慧帶入 + KOL 選擇 modal）
│       ├── _app.insertion-orders.$insertionOrderId._index.tsx  # 委刊單詳情（成效 / 評價 / 截圖上傳）
│       ├── _app.insertion-orders.$insertionOrderId.edit.tsx    # 委刊單編輯（services / authorization）
│       ├── _app.favorites.tsx                 # 收藏資料夾（建立 / 改名 / 刪除 / 共享 / Excel 匯出）
│       ├── _app.reports.generate.tsx          # 結案報告管理（生成 / 下載 / 刪除）
│       ├── api.db-health.ts                   # API：DB 健康檢查（Vercel function 探活用）
│       ├── api.social-followers.ts            # API：社群粉絲數（Apify 介接點）
│       ├── api.ai-parse-order.ts              # API：AI 訂單解析（Mock）
│       ├── api.kols.batch-import.ts           # API：KOL Excel 批量匯入處理
│       ├── api.kols.batch-import-template.ts  # API：批量匯入 Excel 範本下載
│       ├── api.kols.export-excel.ts           # API：選定 KOL 匯出為 Excel
│       ├── api.proposals.$proposalId.events.ts    # API：提案異動事件流
│       ├── api.proposals.$proposalId.export.ts    # API：提案匯出 (Excel / Word)
│       ├── api.proposals.$proposalId.generate-doc.ts # API：提案文件生成（docx）
│       ├── api.reports.$orderId.$reportId.download.ts # API：結案報告下載（含檔名）
│       ├── api.insertion-orders.$id.ts        # API：單筆委刊單 JSON（除錯 / 外部）
│       └── api.view-as.ts                     # API：Demo 階段使用者身份切換
│
├── db/                               # 資料庫設定
│   ├── schema.sql                    # 完整 SQL schema（直接執行用）
│   ├── patch.sql                     # 對既有環境的補丁腳本
│   └── drizzle/
│       ├── schema.ts                 # Drizzle ORM schema (TypeScript，唯一真相來源)
│       ├── relations.ts              # Drizzle 關聯定義
│       └── migrations/               # SQL migration 檔案 (0000~0002)
│           ├── 0000_simple_gwen_stacy.sql
│           ├── 0001_add_actual_fee_platform_metrics.sql
│           └── 0002_add_favorite_folders.sql
│
├── docs/
│   └── ERD.md                        # Entity Relationship Diagram 與資料表說明
│
├── scripts/
│   ├── seed.ts                       # 初始資料 seed（npm run seed）
│   ├── migrate.mjs                   # SQL migration 執行（npm run migrate）
│   ├── backfill-handles.mjs          # Instagram handle 等舊資料回填
│   ├── sync-sample-data.mjs          # mock/db.json ↔ DB 同步（npm run sync:sample-data）
│   ├── sample-data-utils.mjs         # 樣本資料共用工具
│   └── ui-smoke-io_001.mjs           # 委刊單 smoke 腳本（Playwright，選用）
│
├── mock/                             # 本地 json-server 用假資料（`npm run dev:mock`）
│   └── db.json
│
├── public/                           # 靜態資源
│
├── build/                            # `npm run build` 產出
│
├── drizzle.config.ts                 # Drizzle ORM 設定檔
├── remix.config.mjs                  # Remix 配置
├── vercel.json                       # Vercel：建置、install、rewrite → serverless
├── api/                              # Vercel Remix 建置產出（`@vercel/remix`，勿手動編輯）
├── tsconfig.json                     # TypeScript 編譯配置
├── package.json                      # 相依套件與腳本
├── KOLDB-PRD.md                      # 產品需求文件
└── README.md                         # 專案說明（本文件）
```

---

## 核心功能模組

以下為「KOL Database NextGen」的主要應用模組與行為預期（整合 DEV_SPEC 與現有 UI）：

### 1. KOL 管理模組 (KOL Management)

- **KOL 列表與搜尋**
  - 關鍵字搜尋（姓名、ID、Instagram handle）。
  - 多維度篩選（平台、標籤、粉絲數區間、報價區間、性別、年齡層）。
  - **Engagement 排序**：以平台平均互動率排序，輔助選人。
  - 卡片 / 表格視圖切換（原生 `<a>` + SSR 控制）；URL 驅動的搜尋與右側篩選 (URL search params)。
  - 卡片懸停顯示社群連結（IG / YT / FB / TikTok / Threads）。
- **KOL 詳細資訊**
  - 顯示基本資料、**多平台社群數據（含 avgRating、avgEngagementRate、realFollowerRatio）**、合作歷史記錄、評價、價格趨勢圖（Recharts SparkLine）。
  - 內含 KOL 個別頁的成效資料匯出。
- **KOL 建檔與編輯**
  - 支援手動新增 / 編輯 KOL 資料；audience metrics 含性別比例、年齡層分佈、真實粉絲比例。
  - 預留 Apify API 整合（同步 IG / YT / FB 粉絲數）— 介接點為 `api.social-followers.ts`。
- **批量匯入 / 匯出（Excel）**
  - **真實 Excel 批量匯入**（`xlsx` + `adm-zip`）：[api.kols.batch-import.ts](app/routes/api.kols.batch-import.ts)。
  - 範本下載 API：[api.kols.batch-import-template.ts](app/routes/api.kols.batch-import-template.ts)，內含 audience metrics 欄位與 data validation。
  - 收藏頁可選擇 KOL 匯出 Excel：[api.kols.export-excel.ts](app/routes/api.kols.export-excel.ts)。
- **收藏與資料夾共享**
  - 個人收藏資料夾：建立 / 改名 / 刪除 / 多選加入，支援收藏到多個資料夾。
  - **共享機制**：可分享給特定同事或整組（AE / KOL / Tech / Media），權限分 view / edit。
  - 樂觀更新（optimistic UI）：收藏切換立即反映，背景送 action。
- **標籤管理**：以自定義標籤（美妝、美食、母嬰等）分類 KOL，於系統設定統一維護。

### 2. 提案專案模組 (Proposal System)

- **專案建立與管理**
  - 設定專案名稱、客戶、品牌、內容、**預算**、到期日；新建提案可預填收藏資料夾中的 KOL。
  - **列表頁支援 filter / sort / pagination**（依狀態、客戶、品牌、日期）。
- **候選人管理**
  - 管理 KOL 候選名單與狀態（已提案 / 被接受 / 被拒絕）；候選人列表支援多欄位排序。
  - 候選人卡片顯示 KOL 多平台 metrics、real follower ratio、合作次數（collaboration count）。
  - Stage 工作流（草稿 → 內審 → 送客 → 反饋 → 修訂 → 成功 / 失敗），UI 內可即時切換階段。
- **AI 輔助**
  - **AI 分析步驟**：在提案詳細頁啟動分析流程，依候選人組合給出評估摘要（目前為 Mock）。
  - 自然語言搜尋（NL2SQL）— 規劃中。
- **提案匯出與文件**
  - 提案匯出 API：[api.proposals.$proposalId.export.ts](app/routes/api.proposals.$proposalId.export.ts)（Excel）。
  - 提案文件生成（docx）：[api.proposals.$proposalId.generate-doc.ts](app/routes/api.proposals.$proposalId.generate-doc.ts)。
  - 上傳客戶報告檔案於提案頁。
- **異動事件流**
  - [api.proposals.$proposalId.events.ts](app/routes/api.proposals.$proposalId.events.ts) 提供事件查詢，作為異動通知的資料來源。

### 3. 委刊單管理模組 (Insertion Order Management)

- **委刊單一覽**
  - 卡片 / 列表呈現；支援 **單號 / 日期 / 預算等多欄位排序** 與篩選。
  - 列表頁可直接點選「AI 報告生成」進入結案流程。
- **AI 智能解析匯入**
  - 新增委刊單頁：Excel 拖拉上傳，AI 解析後智慧帶入專案欄位、財務總計、KOL 明細（目前 Mock，介接點 `api.ai-parse-order.ts`）。
  - **KOL 選擇 modal**：可從現有 KOL 庫搜尋並指派至委刊單，自動帶入正確 avatar 與 metrics。
- **執行進度追蹤**
  - 三層式摺疊結構（案件 → 合作品牌 → KOL）；展開可見成效明細與合作評價。
  - 編輯頁支援 services（合作項目）、authorization（授權內容）等欄位。
- **成效數據管理**
  - 上傳貼文截圖 / 成效截圖 + 手動輸入 metrics（觸及 / 曝光 / 互動）。
  - **AI OCR 辨識**（規格已定義，demo 階段先以 mock 模擬，正式版接 Claude Haiku 4.5；詳見「正式部署技術規劃」）。
  - 案件層級的「成效總覽 modal」：依 KOL 篩選聚合查看，可匯出整份案件成效資料。
  - actualPrice / actualFee 欄位記錄實際結算金額。
- **合作評價**
  - 記錄每次合作的星級評分與評語（內部＋外部），於案件詳情頁分區顯示。

### 4. 報告生成模組 (Report Generation)

- **結案報告生成**
  - [report-ppt.server.ts](app/lib/report-ppt.server.ts) 已實作 PPT 草稿生成（前述貼文 / 成效截圖嵌入規劃見正式部署章節）。
  - 報告管理頁：[_app.reports.generate.tsx](app/routes/_app.reports.generate.tsx) 列出已生成報告，支援下載 / 刪除。
  - 下載 API：[api.reports.$orderId.$reportId.download.ts](app/routes/api.reports.$orderId.$reportId.download.ts) 自動帶上案件名稱作為檔名。
  - 報告生成時顯示估算頁數與進度訊息。
- **版本管理**
  - 同一委刊單可保留多版本報告；刪除有確認 modal 防誤刪。

### 5. 儀表板 (Dashboard)

- [_app.dashboard.tsx](app/routes/_app.dashboard.tsx) 提供 KOL / 提案 / 委刊單三大模組的數量總覽與近期趨勢。
- SparkLine 圖表（Recharts + `@mantine/charts`），含 Y 軸 ticks、grid lines、無資料訊息。
- Loader 含 timeout / DB 連線 fallback，避免儀表板因資料庫慢查詢卡住整頁。

### 6. 收藏資料夾共享 (Favorite Folders & Sharing)

- **資料夾管理**
  - 建立個人 KOL 收藏資料夾，加入 KOL 並附上備註；支援單一 KOL 加入多個資料夾。
  - 樂觀更新：加入 / 移除動作即時反映，背景送 Remix action。
- **共享機制**
  - 可將資料夾共享給**特定同事**或**整個組別**（AE / KOL / Tech / Media）。
  - 支援 `view`（唯讀）與 `edit`（可新增 KOL）兩種權限層級。
- **批量匯出**：選擇多位 KOL 後匯出 Excel，欄位含社群帳號、報價、audience metrics。
- **資料表**
  - `kol_favorite_folders` — 資料夾本體
  - `kol_favorite_folder_items` — 資料夾 ↔ KOL 中間表
  - `kol_favorite_folder_shares` — 資料夾 ↔ 共享對象中間表

### 7. 提案異動通知 (Proposal Change Notifications)

- **訂閱機制**
  - 提案負責人自動訂閱（`watchType = 'owner'`）；被 @ 的人自動加入（`'mentioned'`）；亦可手動追蹤（`'manual'`）。
- **通知觸發**
  - 當跨組同事更新 stage、加入 KOL、新增 feedback 時，所有訂閱者收到通知。
  - 由 [notifications.server.ts](app/lib/notifications.server.ts) 統一處理寫入 + 派送。
- **通知管理**
  - 支援已讀 / 未讀狀態管理，`payload` 記錄異動前後內容供訊息顯示。
- **資料表**
  - `proposal_watchers` — 訂閱中間表
  - `notifications` — 通知本體

### 8. 個人化與系統設定 (Personalization & Settings)

- **系統設定**
  - 客戶資料維護、品牌資料維護、標籤定義管理（[_app.settings.tsx](app/routes/_app.settings.tsx)）。
- **使用者身份切換 (Demo)**
  - [api.view-as.ts](app/routes/api.view-as.ts) 支援 demo 階段切換為不同角色（AE / KOL / Tech / Media）以驗證共享 / 通知行為。
- **全域操作**
  - 行動版友善的側邊欄收合。
  - 不依賴 React Hook 的日夜主題切換 (Dark Mode)。
  - 全域 404/Error Boundary 與未知路由捕獲 (`$.tsx`)；錯誤頁含倒數自動轉跳。
  - Modal 遮罩層級調整，確保可覆蓋左側選單。
  - 全域 Toast 通知（Zustand store）。

---

## 資料模型與關聯 (Data Models)

目前系統主要圍繞以下實體進行關聯建模：

1. **User (使用者)**  
   - 由 BetterAuth 管理，包含系統管理員與編輯者。  
   - 管理登入、權限與操作軌跡（未來可擴充）。

2. **KOL (網紅)**  
   - 核心欄位：基本資料、社群數據、報價、標籤、地區、語言。  
   - 關聯：
     - `1-to-N` → **kol_social_accounts**：各平台帳號明細。  
     - `1-to-N` → **kol_favorite_folder_items**：被收藏進哪些資料夾。  
     - `1-to-N` → **campaign_performance**：每次合作的成效數據。  

3. **Proposal (提案)**  
   - 狀態流：草稿 → 內部審核 → 送客戶 → 客戶反饋 → 修訂 → 成功/失敗。  
   - `1-to-N` → **proposal_kols**：KOL 候選名單與狀態。  
   - `1-to-N` → **proposal_feedback**：客戶與內部反饋。  
   - `1-to-N` → **proposal_watchers**：訂閱此提案的使用者，異動時觸發通知。  

4. **Insertion Order (委刊單)**  
   - 狀態流：已建立 → 已簽署 → 執行中 → 已交付 → 已結算 → 已結案。  
   - `1-to-N` → **io_tasks**：執行任務分派。  
   - `1-to-N` → **campaign_performance**：成效數據追蹤。  

5. **收藏資料夾 (Favorite Folders)**  
   - `kol_favorite_folders` 為本體，透過 `kol_favorite_folder_items` 關聯 KOL。  
   - 透過 `kol_favorite_folder_shares` 共享給指定用戶或整個組別，支援 view / edit 權限。  

6. **通知 (Notifications)**  
   - `proposal_watchers` 記錄誰訂閱了哪個提案。  
   - `notifications` 在提案有異動時產生通知，含 `type`、`payload`、`isRead`。  

> 具體 Schema 實作請參考：`db/drizzle/schema.ts`，完整 ERD 請參考 `docs/ERD.md`。

---

## 開發環境與指令

### 環境要求

```bash
# 確認 Node.js 版本 >= 20
node --version

# 安裝相依套件
npm install
```

### 環境變數

在專案根目錄建立 `.env`（**部署到 Vercel 時，請在專案 Settings → Environment Variables 同步設定**）：

```env
# 必填：PostgreSQL（例如 Supabase；走 pgBouncer 須加 ?pgbouncer=true）
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require

# Google OAuth（正式版 BetterAuth 啟用時）
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# （正式版規劃，目前 demo 不需要）
# ANTHROPIC_API_KEY=                # 成效截圖 OCR（Claude Haiku 4.5）
# GCS_BUCKET_NAME=                  # GCP Cloud Storage bucket
# GOOGLE_APPLICATION_CREDENTIALS=   # 或使用 Workload Identity
```

> `DATABASE_URL` 可從 Supabase Dashboard → Project Settings → Database → Connection String 取得。
>
> **Demo 階段認證說明**：當前登入採 [demo-auth.server.ts](app/lib/demo-auth.server.ts) 的 cookie 模擬，無需設定 OAuth。BetterAuth 配置已預留於 [auth.server.ts](app/lib/auth.server.ts)，正式上線時切換即可。

### 常用開發指令

| 指令 | 用途 |
|------|------|
| `npm run dev` | Remix 開發伺服器（`http://localhost:3000`） |
| `npm run dev:mock` | json-server mock API（port 4000，本機開發備援） |
| `npm run dev:all` | 同時啟動上述兩者 |
| `npm run build` | 生產建置 |
| `npm start` | 啟動生產伺服器（讀取 `.env`） |
| `npm run migrate` | 執行 SQL migration + Instagram handle 回填（`scripts/migrate.mjs` + `backfill-handles.mjs`） |
| `npm run seed` | 載入初始 seed 資料 |
| `npm run sync:sample-data` | 將 `mock/db.json` 樣本資料同步至 Supabase（demo 用） |
| `npx drizzle-kit push` | 直接以 schema.ts 推送 schema（開發時快速使用，正式請走 migration） |

### 建議開發工作流

```bash
# 步驟 1：初始化
npm install

# 步驟 2：設定 .env（填入 Supabase DATABASE_URL）

# 步驟 3：同步 DB schema
npx drizzle-kit push

# 步驟 4：（選用）載入 seed 資料
npx tsx scripts/seed.ts

# 步驟 5：啟動開發伺服器
npm run dev
# 前端：http://localhost:3000

# 步驟 6：開發 / 調整
# - 編輯 app/ 內路由與元件
# - 修改 db/drizzle/schema.ts 後重跑 drizzle-kit push

# 步驟 7：構建與 Smoke Test
npm run build
npm start
```

### 部署（Vercel）

測試／正式環境可部署至 [Vercel](https://vercel.com)。本專案使用 **`@vercel/remix`**，與根目錄 **`vercel.json`**（建置指令、`installCommand`、`rewrites` → `api/index.js`）搭配。

| 項目 | 說明 |
|------|------|
| **Framework** | 連線 Git 後由 Vercel 偵測 Remix；若需手動指定，選 Remix 相關預設即可 |
| **Node.js** | `package.json` 的 `engines.node` 為 `>=20`，與 Vercel 預設相容 |
| **Install Command** | `vercel.json` 設為 `npm install --legacy-peer-deps`（依 lockfile 解析相依） |
| **Build Command** | `npm run build`（與 `vercel.json` 的 `buildCommand` 一致） |
| **環境變數** | 至少設定 **`DATABASE_URL`**；若使用 Google 登入，一併設定 **`GOOGLE_CLIENT_ID`**、**`GOOGLE_CLIENT_SECRET`** |
| **本機對照** | 本機生產模式使用 `npm start`（`package.json` 內含 `--env-file=.env`）；Vercel 不依賴檔案，需改在控制台設定變數 |

**建議流程**

1. 將儲存庫匯入 Vercel，選擇要部署的分支（例如 `main`）。  
2. 於 **Settings → Environment Variables** 填入上表變數（Production / Preview 視需求分開）。  
3. 觸發 Deploy；首次部署前請確認資料庫已 **`drizzle-kit push`** 或已套用 migration，且 **`DATABASE_URL`** 指向可從 Vercel 連線的位址（Supabase 通常需開啟連線並使用 `sslmode=require`）。  
4. 若 OAuth 回呼網址有變，請到 Google Cloud Console 更新 **Authorized redirect URIs**（Better Auth／Vercel 網域）。

**其他 Node 託管**

若改為一般 VPS／[Render](https://render.com) 等長跑 Node 程序，可使用 **`npm run build`** + **`npm start`**（並在執行環境注入 `DATABASE_URL` 等），無需 `vercel.json` 的 serverless 路由。

---

## 開發流程與優先級

### 階段性開發項目

1. **認證系統設定（基礎）**
   - 整合 BetterAuth。
   - 配置 Google OAuth 提供商。
   - 實現 RBAC（角色：管理員、編輯）。
   - 以 `_app.*` 前綴路由為受保護區域。

2. **KOL 管理模組**
   - 設計 KOL 資料表結構（含 Mock JSON）。
   - KOL CRUD、搜尋 / 篩選、標籤系統。
   - 收藏機制、批量 Excel 匯入、詳細頁互動。

3. **提案與流程管理**
   - 提案工單狀態機與歷程紀錄。
   - 客戶反饋版本控制。
   - 提案績效追蹤與報表。

4. **委刊單執行**
   - 委刊單建立與合約欄位。
   - 執行節點與提醒。
   - 完成率與成效追蹤。

5. **報表與分析**
   - 成效追蹤儀表板。
   - 結案報告生成與匯出。
   - 各模組資料匯出。

6. **AI 輔助功能（進階）**
   - 智能 KOL 搜尋（NL2SQL）。
   - **成效截圖辨識（Claude Haiku 4.5 + Tool Use 結構化輸出）** — 詳見〈正式部署技術規劃〉。
   - 自動結案報告生成（PPT，含截圖嵌入；`report-ppt.server.ts` 已具雛形）。
   - 提案 AI 分析步驟（候選人組合評估，目前 Mock）。

### 開發優先級列表說明

| 優先級 | 模組 | 說明 |
|--------|------|------|
| 🔴 **最高** | 認證 + RBAC | 解鎖所有業務路由 |
| 🔴 **最高** | KOL CRUD | 核心資料對象 |
| 🟠 **高** | 提案流程 | 業務核心 |
| 🟠 **高** | 委刊單 | 執行與合約 |
| 🟡 **中** | 報表儀表板 | 資料可視化 |
| 🔵 **低** | AI 功能 | 進階體驗 |

> 詳細時程請見 `docs/mvp-roadmap.md`。

---

## 測試與驗收標準

### 端對端測試 (E2E Testing)

- **工具**：Playwright（建議）
- **標準**
  - 冒煙測試：登入、瀏覽 KOL、建立提案、匯入委刊單。
  - 關鍵流測試：從提案建立到轉換為委刊單的完整流程。
  - 回應式設計驗證：Desktop / Tablet / Mobile 主要流程正常。

### 整合測試 (Integration Testing)

- **API 串接驗證**
  - Apify API（社群數據同步）。
  - AI 服務 API（例如解析委刊單 Excel、成效截圖）。
- **資料庫操作驗證**
  - 使用 Drizzle ORM 驗證 CRUD 正確性與 Schema 一致性。
- **AI 解析精準度**
  - 建立固定 Golden Case，定期測試 Excel 與截圖解析結果的準確率。

### 單元測試 (Unit Testing)

- **工具**：Vitest（建議）
- **範圍**
  - 商業邏輯純函數（資料計算、格式轉換、標籤處理等）。
  - 核心 UI 元件的渲染與 Props 變形測試。

### 手動驗證與 UI/UX 標準

- **互動性**：按鈕、選單、摺疊面板需具備清楚的 Hover/Active 回饋。
- **視覺規範**：遵守 Mantine 主題（顏色、間距、字級）。
- **效能要求**：常見列表頁載入、搜尋響應在約 500ms 內完成（正常資料量）。

### 驗收標準 (Acceptance Criteria, AC)

每個新功能在完成時應滿足：

1. **功能性**：符合 PRD / DEV_SPEC 中行為定義。  
2. **穩定性**：通過相應自動化測試，且無 P0 / P1 級別 Bug。  
3. **安全性**：敏感操作需經過認證與 RBAC 權限檢查。  
4. **易用性**：流程清楚、錯誤與載入狀態可感知。  

---

## 正式部署技術規劃（成效截圖 / 貼文截圖功能）

以下項目屬於 demo 階段不實作、待正式網站（GCP）部署時再導入的技術規劃，記錄背景與建議實作方式以利後續銜接。

### 1. AI 成效截圖辨識（Claude Haiku 4.5）

- **模型選用**：Anthropic `claude-haiku-4-5`（pricing：input $1 / 1M tokens、output $5 / 1M tokens；vision 支援 base64 與 URL 兩種輸入）。
- **預估費用**：以平均 1080×1920 螢幕截圖估算，每張約 2,500–6,500 input tokens + 150 output tokens；1,000 張 / 月約 **US$4–8（≈ NT$120–250）**。長截圖（IG Insights 完整滾動）會落在區間上限。
- **結構化輸出**：使用 Anthropic Tool Use（`tool_choice` 指定 `extract_metrics`）強制回傳 JSON schema，欄位包含 `platform`、`reach`、`impressions`、`likes`、`comments`、`shares`、`saves`、`views`，未出現於截圖的欄位回傳 `null`，禁止模型推測。
- **多張截圖合併策略**：採 **non-empty wins**（後到的非 null 值才覆寫前值；已被使用者手動修改的欄位保留優先權）。
- **錯誤容忍**：截圖中常見的千分位逗號、K/M 縮寫、跨語系欄位需在 prompt 強調統一輸出整數；`engagementRate` 不交由 AI 計算，由前端以 `(likes+comments+shares)/reach` 自行運算以維持一致。
- **API 端點規劃**：`app/routes/api.performance.extract.ts`（POST，接收 base64 圖片，回傳 `Partial<OrderPerformanceMetrics>`）。

### 2. 圖片儲存（GCP Cloud Storage）

- **建議方案**：Google Cloud Storage（GCS）+ V4 Signed URL；deployment 同 region 部署可省 egress。
- **上傳路徑**：前端 → 後端取得 signed PUT URL → 前端直傳 GCS（避免 server 流量瓶頸）。
- **Bucket 結構建議**：
  - `kol-db/performance-screenshots/{insertionOrderId}/{kolCollabId}/{performanceItemId}/{uuid}.png`
  - `kol-db/post-screenshots/{insertionOrderId}/{kolCollabId}/{uuid}.png`
- **存取控制**：bucket 設 uniform bucket-level access；對外存取一律走 signed URL（預設 7 天 TTL，到期前端重取）。
- **生命週期**：建議結案後 90 天自動轉 Nearline、1 年後轉 Coldline，降低長期儲存費。
- **替代評估**：Firebase Storage（底層即 GCS，整合 Auth 較快）— 若未來改用 Firebase Auth 可考慮；其餘第三方（R2、Cloudinary）在 GCP 部署情境下不建議。

### 3. 結案 PPT 圖片嵌入

- **流程**：`report-ppt.server.ts` 生成 PPT 時，從 GCS signed URL fetch 圖片 → server-side 用 `sharp` 縮放至合理尺寸（建議寬度 ≤ 1280px、品質 80）→ 以 base64 方式 `slide.addImage({ data })` 嵌入。
- **理由**：直接使用原始長截圖會讓 PPT 檔案膨脹至數十 MB，且部分 PPT 檢視器對超大圖渲染不穩。
- **版面建議**：每個 KOL 一頁，左側貼文截圖、右側成效截圖 + 數據表，與業務既有結案報告慣用版型一致。

### 4. 資料模型擴充（須與 demo 階段同步）

`OrderPerformanceItem` 在正式版需擴充：

- `performanceScreenshots: { url, extractedAt, rawExtraction }[]` — 保留每張圖的原始 AI 辨識結果，供日後人工修正對照。
- `postScreenshots: { url }[]` — 新增貼文截圖欄位。
- `metricsSource: Record<keyof OrderPerformanceMetrics, "ai" | "manual">` — 紀錄每個欄位是 AI 辨識還是人工輸入；編輯時 UI 用以提示。
- `createdBy / updatedBy / updatedAt` — 同事修正時的稽核欄位。

### 5. 環境變數（部署清單）

- `ANTHROPIC_API_KEY`
- `GCP_PROJECT_ID`、`GCS_BUCKET_NAME`、`GOOGLE_APPLICATION_CREDENTIALS`（或 Workload Identity）
- `IMAGE_SIGNED_URL_TTL_DAYS`（預設 7）

---

## 樣式與元件慣例 (Style & Component Conventions)

> 本節記錄 2026-05 那波重構後的樣式管理慣例，方便接手者快速了解 UI 層該怎麼寫。

### 1. CSS Modules 為主，inline style 已全面清除

每個 route 檔案 `Foo.tsx` 對應一個 `Foo.module.css`，class name 自動 hash（避免全域命名衝突）。原本 17 個 route 共 341 處 `style={{...}}` inline style 都已搬至對應的 module.css。

**何時用 Mantine props，何時用 CSS Module class**

| 情境 | 寫法 | 範例 |
|------|------|------|
| 純版面值（width / height / flex / margin / padding / line-height / text-align） | Mantine props | `<Box flex={1} miw={200} mih={40} pl={16} ta="right">`、`<Text lh={1.4}>` |
| Border / background / 多屬性組合 / 條件樣式 / hover、disabled 等偽類 | CSS Module class | `className={isActive ? \`${styles.tab} ${styles.tabActive}\` : styles.tab}` |
| 動態樣式函式（原本 `tabStyle()` 回傳 CSSProperties） | 改成 `tabClassName()` 回傳 string | `const tabClassName = (v: string) => v === active ? \`${styles.tab} ${styles.tabActive}\` : styles.tab;` |

**JS hover → CSS `:hover`**：原本不少地方用 `onMouseEnter/Leave` 直接寫 inline style 切 background / borderColor，全部改成 CSS Module 內的 `.foo:hover` 規則（少了 React state、少了 re-render）。

**`display: none` 隱藏元素**：native HTML element 用 `hidden` 屬性取代 `style={{ display: "none" }}`。

### 2. dark / light 主題切換（兩種模式並存）

**A. `_app` layout 內的頁面** — 用 attribute selector 切 dark variant。Mantine 把 color scheme 設在 `<html data-mantine-color-scheme="dark">` 上，而 CSS Module 內的 attribute selector 是全域 selector（不會被 hash），所以可以直接命中：

```css
.aiCard {
  background: var(--mantine-color-blue-0);
}
[data-mantine-color-scheme="dark"] .aiCard {
  background: rgba(51, 154, 240, 0.18);
  border: 1px solid rgba(51, 154, 240, 0.35);
}
```

採用此模式後，原本在 React 端 `useMantineColorScheme()` + MutationObserver 偵測 dark 來切 inline style 的邏輯就可以拿掉。

**B. 獨立頁面（如 [login.tsx](app/routes/login.tsx)）** — 用 CSS custom properties + state class 切換。`login` 不在 `_app` layout 內，沒接到 Mantine theme，採用 React state 切 `.dark` class 配合 CSS variables：

```css
.page {
  --login-bg: #ffffff;
  --login-fg: #0f172a;
}
.page.dark {
  --login-bg: #0f172a;
  --login-fg: #f8fafc;
}
.rightPanel { background: var(--login-bg); }
.formTitle  { color: var(--login-fg); }
```

JSX 端只要 `<div className={dark ? \`${styles.page} ${styles.dark}\` : styles.page}>`，整顆 tree 自動切色。

### 3. 動態 class（含 `dangerouslySetInnerHTML` 的 script）

如果 inline `<script>` 需要在 form submit reload 前即時切換 class（例：[_app.kols._index.tsx](app/routes/_app.kols._index.tsx) 標籤過濾的視覺回饋），把 CSS Module 的 hashed class name 注入 script template literal，script 用 `classList.add/remove`：

```jsx
<script dangerouslySetInnerHTML={{ __html: `
  document.addEventListener('change', function(e) {
    if (e.target.name !== 'tag') return;
    var label = e.target.closest('label[data-tag-label]');
    if (!label) return;
    if (e.target.checked) {
      label.classList.add('${styles.tagLabelActive}');
    } else {
      label.classList.remove('${styles.tagLabelActive}');
    }
  });
`}} />
```

### 4. Build 設定（CSS Modules 啟用）

- 已安裝 [`@remix-run/css-bundle@2.16.7`](https://www.npmjs.com/package/@remix-run/css-bundle)，於 [app/root.tsx](app/root.tsx) 透過 `cssBundleHref` 加入 `<link rel="stylesheet">`：
  ```ts
  import { cssBundleHref } from "@remix-run/css-bundle";
  
  export const links = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: mantineStylesHref },
    { rel: "stylesheet", href: stylesHref },
  ];
  ```
- **重要 gotcha**：`app/routes/` 內的 `*.module.css` 檔必須加入 [remix.config.mjs](remix.config.mjs) 的 `ignoredRouteFiles`：
  ```js
  export default {
    ignoredRouteFiles: ["**/.*", "**/*.module.css"],
  };
  ```
  否則 Remix 把 module.css 當 route 檔解析，build 時會在 `[plugin browser-route-module]` 拋 `Cannot read properties of undefined (reading 'filter')` 失敗。

### 5. 共用元件

#### `<DemoGenerateReportModal>` — [app/components/DemoGenerateReportModal.tsx](app/components/DemoGenerateReportModal.tsx)

抽自 IO listing（[_app.insertion-orders._index.tsx](app/routes/_app.insertion-orders._index.tsx)）與 IO detail（[_app.insertion-orders.$insertionOrderId._index.tsx](app/routes/_app.insertion-orders.$insertionOrderId._index.tsx)）原本重複的 demo 報告生成 modal。內部封裝：

- KOL 選擇（已上傳成效 / 尚未上傳）+ PowerPoint 模板選擇兩段表單
- 假進度條（每 400ms 跳動）+ 5 步驟 checklist
- 進度 100% 時的 toast / banner / 背景 fetcher.submit

API 設計：parent 只負責 `opened` / `onClose` / `order`，外加可選 `onComplete` callback：

```tsx
<DemoGenerateReportModal
  opened={genModalOpen}
  onClose={closeGenModal}
  order={activeOrder}
  onComplete={handleGenerateComplete}
/>
```

`onComplete` 讓父層自由帶 fetcher.submit 參數（IO listing 帶 `orderId`、IO detail 不帶——orderId 由 URL 決定）。

> **reports.generate 不使用此元件**——它是真實 generate 實作（呼叫 `generateReport` action、處理 success / error 狀態、實際下載檔案），與兩個 demo modal 的假進度邏輯不同，硬抽會讓共用元件被一堆 mode flag 撐到難維護。三個檔案的差異是有意的設計，不該強制統一。

---

## Hydration 與 UI 穩定性備忘

在 Remix SSR 環境下，只要伺服端與瀏覽器渲染結果不一致，就可能造成 Hydration 失敗並導致按鈕、Modal 等互動失效。專案採用以下防禦策略：

1. **穩定數字與日期格式**
   - 統一使用 `value.toLocaleString("zh-TW")` 等指定語系，避免 Locale 差異。

2. **分配穩定 ID**
   - 為 `Tabs`、`Modal` 等元件手動指定固定 `id`，避免 SSR / CSR 自動 ID 不一致。

3. **處理 SSR 不相容元件**
   - 圖表或重度 DOM 依賴元件使用 `ClientOnly` 包裝，只在客戶端渲染。

4. **按鈕屬性**
   - 預設為 `<button type="button">`，避免在表單情境中誤觸發 Submit。

5. **診斷方式**
   - 若按鈕無反應，優先檢查 Console 是否有 `Hydration failed` / `Text content did not match` 等訊息。

6. **避免在 Route JSX 內使用 `<script>` 綁事件**
   - 在 Remix client-side navigation 下，動態插入的 `<script>` 不一定會執行。  
   - 優先使用 React 事件（`onClick`、`useFetcher`、`Form`）或 `useEffect` 綁原生事件。

7. **`process is not defined` 問題**
   - 在 `root.tsx` 的 `<head>` 中注入 `window.process.env.NODE_ENV` polyfill，避免第三方套件在瀏覽器端引用 Node globals 導致初始化崩潰。

---

## 資料庫穩定性與超時策略

由於 Supabase 走 pgBouncer + Vercel serverless cold start，DB 慢查詢容易拖累整頁渲染。專案採以下策略：

1. **Loader 通用 timeout**
   - 多數 loader 以 `withTimeout(promise, fallback, ms)` 包裝；超時退回安全的 fallback（空陣列 / 預設物件），確保頁面不會白屏。
   - 委刊單詳情、提案列表、儀表板等資料密集頁皆已套用。

2. **Statement timeout**
   - 連線時設定 `statement_timeout=0`，避免 pgBouncer / Supabase 端短超時殺掉 migration 等長查詢。

3. **連線池**
   - 提高 postgres.js 連線數上限以支援 Vercel 高並發；冷啟時的連線重建有重試機制。

4. **Health check**
   - [api.db-health.ts](app/routes/api.db-health.ts) 提供 DB 連線 + `kols` 表存在性檢查，給 Vercel function probe / 部署驗收使用。

5. **Patch / 資料缺失韌性**
   - `_app.tsx` loader 對缺表情境降級處理，避免新部署環境尚未跑 migration 時整站炸開（搭配 [db/patch.sql](db/patch.sql)）。

---

## 補充資源

- [KOLDB-PRD.md](KOLDB-PRD.md) — 產品需求文件（功能、流程、AI 輔助規格）
- [docs/ERD.md](docs/ERD.md) — 資料表 ERD 圖示與欄位說明
- [docs/REUSABLE.md](docs/REUSABLE.md) — **可遷移清單**：給新專案 cherry-pick 用，分「直接抄 / 抄了改 / 不要抄」三層
- [db/drizzle/schema.ts](db/drizzle/schema.ts) — Drizzle schema 真相來源
- [db/drizzle/migrations/](db/drizzle/migrations/) — 歷次 SQL migration（0000 ~ 0002）

---
**更新時間**：2026 年 5 月 6 日（CSS Modules 重構、`<DemoGenerateReportModal>` 抽出共用元件、修正 reports.generate 與 generate-doc 的 TS 錯誤）  