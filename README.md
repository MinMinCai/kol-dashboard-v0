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
4. [資料模型與關聯](#資料模型與關聯)  
5. [開發環境與指令](#開發環境與指令)  
6. [開發流程與優先級](#開發流程與優先級)  
7. [測試與驗收標準](#測試與驗收標準)  
8. [Hydration 與 UI 穩定性備忘](#hydration-與-ui-穩定性備忘)  
9. [補充資源](#補充資源)  

---

## 整體技術與架構

### 技術棧概覽

| 層級 | 技術方案 | 版本 | 核心優勢 |
|------|--------|------|--------|
| **前端框架** | React Router v7 (Remix) | 2.16.1 | 伺服端渲染 + 最佳化資料載入 |
| **UI 元件庫** | Mantine | 7.17.8 | 專業級元件，適合管理後台 |
| **狀態管理** | Zustand | 5.0.8 | 輕量級、TypeScript 友善 |
| **執行時環境** | Node.js | ≥20 | 穩定、高效能 |
| **資料庫** | PostgreSQL | 18 | 關聯式、強大查詢功能 |
| **ORM 框架** | Drizzle ORM | - | 型別安全、schema 即代碼 |
| **認證系統** | BetterAuth | - | Google OAuth + RBAC 集成 |
| **部署平台** | GCP Cloud Run | - | 容器化、無伺服器、成本最佳化 |
| **語言** | TypeScript | 5.9.2 | 型別安全、開發效率提升 |

- **Server**: Remix server-side (Loader/Action Data Flow)  
- **Mock API**: `json-server`（前期以 Mock 資料加速 UI/互動開發）  
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
│  PostgreSQL 18 + Drizzle ORM                    │
│  - KOL (含 Favorites, Tags, Social Metrics)      │
│  - 提案專案 (Proposals)                           │
│  - 委刊單 (Insertion Orders) 與執行細節           │
│  - 使用者與權限                                  │
└─────────────────────────────────────────────────┘
```

---

## 專案結構

```text
codex-koldb-test/
├── app/                              # Remix 應用程式核心
│   ├── entry.client.tsx              # 客戶端入口
│   ├── entry.server.tsx              # 伺服端入口
│   ├── root.tsx                      # 根元件 (布局)
│   ├── styles.css                    # 全局樣式
│   ├── components/                   # 可複用 UI 元件
│   ├── lib/
│   │   └── mock-api.ts              # Mock API (開發用)
│   └── routes/                       # 路由模組
│       ├── $.tsx                     # 404 全域捕捉路由 (Splat Route)
│       ├── _index.tsx                # 首頁/登入頁
│       ├── login.tsx                 # 登入路由
│       ├── _app.tsx                  # 主應用佈局 (受保護，含全域樣式與側邊欄切換)
│       ├── _app.dashboard.tsx        # 儀表板
│       ├── _app.settings.tsx         # 系統設定 (URL-driven Tabs 切換)
│       ├── _app.kols._index.tsx      # KOL 列表 (含批量匯入、我的收藏切換)
│       ├── _app.kols.new.tsx         # 新增 KOL
│       ├── _app.kols.$kolId.tsx      # KOL 詳情
│       ├── _app.proposals._index.tsx # 提案列表
│       ├── _app.proposals.new.tsx    # 新提案
│       ├── _app.proposals.$proposalId.tsx  # 提案詳情
│       ├── _app.insertion-orders._index.tsx # 委刊單列表 (含批量匯入)
│       ├── _app.insertion-orders.new.tsx   # 新增委刊單 (含 Excel 智慧帶入功能)
│       ├── _app.insertion-orders.$insertionOrderId.tsx  # 委刊單詳情
│       ├── _app.favorites.tsx        # 我的收藏 (資料夾分類管理)
│       ├── _app.reports.generate.tsx # 報告生成
│       ├── api.social-followers.ts   # API 端點 (社群粉絲數)
│       └── api.ai-parse-order.ts     # API 端點 (AI 訂單解析)
│
├── db/                               # 資料庫設定
│   ├── schema.sql                    # PostgreSQL 原生 SQL schema
│   └── drizzle/
│       ├── schema.ts                 # Drizzle ORM schema (TypeScript)
│       └── relations.ts              # 資料表關聯定義
│
├── docs/                             # 文檔
│   ├── architecture.md               # 系統架構設計詳解
│   ├── implementation-remix-node.md  # 技術實作細節
│   └── mvp-roadmap.md               # 12 週 MVP 路線圖
│
├── mock/                             # Mock 資料
│   └── db.json                       # json-server 模擬資料庫
│
├── public/                           # 靜態資源（自動構建）
│   └── build/                        # Remix 編譯輸出
│
├── build/                            # 生產構建輸出
│   ├── index.js                      # 伺服端程式入口
│   └── metafile.*.json               # 構建元資料
│
├── drizzle.config.ts                 # Drizzle ORM 設定檔
├── remix.config.mjs                  # Remix 配置
├── remix.env.d.ts                    # Remix 環境型別定義
├── tsconfig.json                     # TypeScript 編譯配置
├── package.json                      # 相依套件與腳本
└── README.md                         # 專案說明（本文件）
```

> 延伸說明請參考：`docs/architecture.md`、`docs/implementation-remix-node.md`、`docs/mvp-roadmap.md`

---

## 核心功能模組

以下為「KOL Database NextGen」的主要應用模組與行為預期（整合 DEV_SPEC 與現有 UI）：

### 1. KOL 管理模組 (KOL Management)

- **KOL 列表與搜尋**
  - 關鍵字搜尋（姓名、ID）。
  - 多維度篩選（平台、標籤、粉絲數區間、報價區間）。
- **KOL 詳細資訊**
  - 顯示基本資料、社群數據統計、合作歷史記錄、評價、價格趨勢圖。
- **KOL 建檔與編輯**
  - 支援手動新增/編輯 KOL 資料。
  - 整合 Apify API，自動同步 Instagram / YouTube / Facebook 粉絲數。
- **標籤管理**
  - 以自定義標籤（美妝、美食、母嬰等）分類 KOL。
- **已完成 UI / 互動**
  - 卡片 / 表格視圖切換（原生 `<a>` + SSR 控制）。
  - URL 驅動的搜尋與右側篩選（使用 URL search params）。
  - 收藏與取消收藏（Remix `Form` + Mock API 即時更新）。
  - Excel 模擬批量匯入（原生 `<dialog>` + Drag & Drop）。
  - 詳細頁 Modal 查看聯絡方式、下載 JSON 報告草稿。

### 2. 提案專案模組 (Proposal System)

- **專案建立**
  - 設定專案名稱、客戶、品牌、內容、預算等。
- **候選人管理**
  - 管理 KOL 候選名單與狀態（已提案 / 被接受 / 被拒絕）。
- **AI 智能搜尋（進階）**
  - 使用自然語言（NL2SQL）搜尋符合特定條件的 KOL。
- **提案匯出**
  - 生成並匯出 Excel / PDF 提案文件（目前以前端模擬為主）。
- **已完成 UI / 互動**
  - 提案詳細頁支援 Mock AI 搜尋並加入候選名單。
  - 手動新增 KOL 候選人（Modal + 表單送出）。

### 3. 委刊單管理模組 (Insertion Order Management)

- **委刊單一覽**
  - 以卡片或列表形式呈現所有執行中的案件。
- **AI 智能解析匯入**
  - 上傳 Excel 版委刊單，AI 自動辨識欄位並建立關聯（目前為 Mock 行為）。
- **執行進度追蹤**
  - 三層式摺疊結構（案件 → 合作品牌 → KOL）。
- **成效數據管理**
  - 上傳成效截圖，利用 AI OCR 提取曝光、觸及、按讚等數據（規格已定義，實作中）。
- **合作評價**
  - 記錄每次合作的星級評分與評語（內部＋外部）。
- **已完成 UI / 互動**
  - 委刊單列表、分頁與批量匯入彈窗。
  - 新增委刊單頁：Excel 拖拉上傳與智慧帶入表單欄位（含財務總計與 KOL 明細）。
  - 委刊單詳細頁：合作 KOL 列表、Tab、Modal 正常互動，可送出成效 / 評價（Remix action）。

### 4. 報告生成模組 (Report Generation)

- **AI 結案報告（進階）**
  - 根據案件數據與成效截圖，自動生成 PPT 結案報告草稿。
- **版本管理**
  - 記錄並管理不同版本的報告文件。

### 5. 個人化與系統設定 (Personalization & Settings)

- **我的收藏**
  - 個人或團隊共享的 KOL 收藏夾，支援分類與移除。
- **系統設定**
  - 客戶資料維護、品牌資料維護、標籤定義管理。
- **全域操作**
  - 行動版友善的側邊欄收合。
  - 不依賴 React Hook 的日夜主題切換 (Dark Mode)。
  - 全域 404/Error Boundary 與未知路由捕獲 (`$.tsx`)。
  - Modal 遮罩層級調整，確保可覆蓋左側選單。

---

## 資料模型與關聯 (Data Models)

目前系統主要圍繞以下實體進行關聯建模：

1. **User (使用者)**  
   - 由 BetterAuth 管理，包含系統管理員與編輯者。  
   - 管理登入、權限與操作軌跡（未來可擴充）。

2. **KOL (網紅)**  
   - 核心欄位：基本資料、社群數據、報價、標籤、地區、語言。  
   - 關聯：
     - `1-to-N` → **Favorite (收藏)**：不同使用者對 KOL 的收藏紀錄。  
     - `1-to-N` → **KolCollaboration (合作紀錄)**：每次合作的成效與評價。  

3. **Proposal (提案)**  
   - 狀態流：草稿 → 內部審核 → 送客戶 → 客戶反饋 → 修訂 → 成功/失敗。  
   - `1-to-N` 關聯多個 KOL 作為候選名單與實際合作名單。  

4. **Insertion Order (委刊單)**  
   - 狀態流：已建立 → 已簽署 → 執行中 → 已交付 → 已結算 → 已結案。  
   - `1-to-N` → **OrderKolCollaboration (委刊單-KOL 執行明細)**：授權項目、報價、稅率、檔期等。  
   - 關聯到對應的 **Metrics (成效數據)** 與 **Reviews (評價)**。  

> 具體 Schema 實作請參考：`db/schema.sql`、`db/drizzle/schema.ts`、`db/drizzle/relations.ts`

---

## 開發環境與指令

### 環境要求

```bash
# 確認 Node.js 版本 >= 20
node --version

# 安裝相依套件
npm install
```

### 常用開發指令

**1. 開發伺服器（前端 + 後端 Mock）**

```bash
npm run dev
```

**2. Mock 資料服務**

```bash
npm run dev:mock
```

**3. 同時啟動全部開發服務**

```bash
npm run dev:all
```

預期：

- 前端應用：`http://localhost:3000`  
- Mock API：`http://localhost:4000`  

**4. 構建與生產伺服器**

```bash
npm run build
npm start
```

### 建議開發工作流

```bash
# 步驟 1：初始化
npm install

# 步驟 2：啟動所有開發服務
npm run dev:all

# 步驟 3：打開瀏覽器
# 前端：http://localhost:3000
# Mock API：http://localhost:4000

# 步驟 4：開發 / 調整
# - 編輯 app/ 內路由與元件
# - 更新 mock/db.json 測試資料

# 步驟 5：驗證主要業務流程
# - 登入（BetterAuth Google OAuth）
# - CRUD KOL、提案、委刊單
# - 驗證狀態流轉與按鈕/Modal 互動

# 步驟 6：構建與 Smoke Test
npm run build
npm start
```

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
   - 智能 KOL 搜尋。
   - 成效辨識演算法。
   - 自動報告生成。

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
**更新時間**：2026 年 3 月 31 日  