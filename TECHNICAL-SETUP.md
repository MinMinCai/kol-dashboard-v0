# KOL_DB 技術設定指南

> 完整 KOL 行銷合作生命週期管理系統 - 現代 Node.js 全棧應用

---

## 📋 目錄

1. [技術棧概覽](#技術棧概覽)
2. [核心架構](#核心架構)
3. [專案結構](#專案結構)
4. [開發指令](#開發指令)
5. [開發流程](#開發流程)
6. [開發優先級](#開發優先級)

---

## 技術棧概覽

### 全棧技術選型

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

### 開發工具

- **Mock 服務**：json-server（快速資料模擬）
- **並行執行**：concurrently（同時執行多個開發服務）
- **開發構建**：Remix 內建開發伺服器

---

## 核心架構

### 三層架構設計

```
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

### 核心業務模組

#### 1️⃣ KOL 資料庫系統
- **基本資料**：姓名、地區、語言、聯絡方式、類別標籤
- **社群資料**：平台、粉絲數、互動率、受眾輪廓
- **商務資料**：報價、授權條件、合作檔期
- **合作歷史**：過往成效與評價

#### 2️⃣ 提案專案流程
流程節點：`草稿` → `內部審核` → `送客戶` → `客戶反饋` → `修訂` → `成功/失敗`

記錄內容：
- 客戶偏好（風格、預算）
- 逐輪反饋與修正版本
- 中標/失標原因分析

#### 3️⃣ 委刊單管理
狀態流：`已建立` → `已簽署` → `執行中` → `已交付` → `已結算` → `已結案`

核心欄位：編號、品牌、KOL、預算、檔期、內容、合約、發票、完成率

#### 4️⃣ AI 輔助功能（進階版）
- **智能搜尋**：自然語言查詢 KOL
- **成效辨識**：高 ROI 合作模式分析
- **報告生成**：自動產出提案摘要、月報、結案報告

---

## 專案結構

```
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
└── README.md                         # 專案說明
```

---

## 開發指令

### 環境要求

```bash
# 確認 Node.js 版本 >= 20
node --version

# 安裝相依套件
npm install
```

### 常用開發指令

#### 1. 開發伺服器（前端 + 後端）

```bash
# 啟動 Remix 開發伺服器（含熱更新）
npm run dev

# 預期輸出：
# 💿 remix dev
# Remix App Server started at http://localhost:3000
```

#### 2. Mock 資料服務

```bash
# 啟動 json-server（提供模擬 REST API）
npm run dev:mock

# 預期輸出：
# ⚡ json-server started at http://localhost:4000
```

#### 3. 同時執行全部開發服務

```bash
# 並行啟動 Mock API + Remix 開發伺服器
npm run dev:all

# 預期輸出：
# ✓ npm run dev:mock
# ✓ npm run dev
# 前端：http://localhost:3000
# Mock API：http://localhost:4000
```

#### 4. 構建與部署

```bash
# 生產環境構建
npm run build

# 生成優化後的構建檔案於 ./build 目錄

# 啟動生產伺服器
npm start

# 預期輸出：
# Remix App Server started at http://localhost:3000
```

### 開發工作流

```bash
# 步驟 1：初始化
npm install

# 步驟 2：啟動所有開發服務
npm run dev:all

# 步驟 3：打開瀏覽器訪問
# 前端應用：http://localhost:3000
# Mock API：http://localhost:4000/

# 步驟 4：編輯代碼（自動熱更新）
# - 編輯 app/ 中的檔案
# - 編輯 mock/db.json 中的資料

# 步驟 5：測試業務流程
# - 登入 (BetterAuth Google OAuth）
# - CRUD KOL、提案、委刊單
# - 驗證狀態流轉

# 步驟 6：構建與驗證
npm run build
npm start
```

---

## 開發流程

### 1. 認證系統設定（基礎）

- [ ] 整合 BetterAuth
- [ ] 配置 Google OAuth 提供商
- [ ] 實現 RBAC（角色：管理員、編輯）
- [ ] 保護路由（`_app.*` 前缀）

### 2. KOL 管理模組

- [x] 設計 KOL 資料表結構 (Mock JSON 完成)
- [x] 建立 CRUD 介面
- [x] 多條件搜尋功能（平台、類別、粉絲區間）
- [x] 標籤系統
- [x] **卡片 / 表格 視圖切換**（使用 HTML `a` 元素搭配 Remix Loader SSR 控制 `view`）。
- [x] **右側篩選抽屜**（粉絲數、產業別、標籤、評價範圍，直接透過 Form GET 改變 URL Params）。
- [x] **收藏與取消收藏**（Remix Form `POST` action 即時切換，並設立 `_app.favorites.tsx` 資料夾分類管理）。
- [x] **批量由 Excel 匯入建檔**（透過原生 Drag and Drop 及 mock parser 完成前端互動體驗）。
- [x] **KOL 詳細頁互動**：查看聯絡方式（Modal）、下載 KOL 報告（前端 JSON 下載，利於未來串接正式匯出）。

> **注意**：為避免 React Hydration Mismatch 造成事件失效，KOL 功能大量依賴 Browser Native 特性（例如 `dialog.showModal()`，表單送出）以及 Server Rendering。

### 3. 提案與流程管理

- [ ] 提案工單狀態機實現
- [ ] 客戶反饋版本控制
- [ ] 提案績效追蹤
- [x] **提案詳細頁互動修復**：AI 搜尋（Mock）與手動新增候選人改為 React/Mantine Modal，避免 client-side navigation 下內嵌 script 不執行而導致按鈕失效。

### 4. 委刊單執行

- [x] 委刊單列表基礎建置（含卡片切換、批量匯入操作）。
- [x] **前端 Excel 上傳智慧填充功能**（在新建委刊單頁面由 Excel 一鍵帶入全部資訊包含發票稅率與 KOL 明細）。
- [x] **委刊單詳細頁互動修復**：合作 KOL 列表 tab/按鈕與 Modal 可正常操作，並可送出成效/評價（Remix action）。
- [ ] 委刊單建立與合約簽署（後端資料庫整合）
- [ ] 執行節點與提醒
- [ ] 完成率追蹤

### 5. 報表與分析

- [ ] 成效追蹤儀表板
- [ ] 結案報告生成
- [ ] 資料匯出功能

### 6. AI 輔助功能（進階）

- [ ] 智能 KOL 搜尋
- [ ] 成效辨識演算法
- [ ] 自動報告生成

---

## 開發優先級

### MVP 第一階段（必需）

| 優先級 | 模組 | 說明 |
|--------|------|------|
| 🔴 **最高** | 認證 + RBAC | 解鎖所有業務路由 |
| 🔴 **最高** | KOL CRUD | 核心資料對象 |
| 🟠 **高** | 提案流程 | 業務核心 |
| 🟠 **高** | 委刊單 | 執行與合約 |
| 🟡 **中** | 報表儀表板 | 資料可視化 |
| 🔵 **低** | AI 功能 | 進階體驗 |

### 開發時間規劃（12 週 MVP）

```
週 1-2：認證系統 + KOL 基礎 CRUD
週 3-4：提案工單與狀態流
週 5-6：委刊單與提醒系統
週 7-8：成效追蹤儀表板
週 9-10：報告生成與匯出
週 11-12：測試、優化、AI 基礎（可選）
```

---

## 補充資源

### 文檔參考

- [系統架構詳解](docs/architecture.md)
- [技術實作設計](docs/implementation-remix-node.md)
- [MVP 12 週路線圖](docs/mvp-roadmap.md)

### 資料庫設定

- [PostgreSQL Schema](db/schema.sql)
- [Drizzle ORM Schema](db/drizzle/schema.ts)
- [資料表關聯](db/drizzle/relations.ts)

### 官方文檔

- [Remix 官方文檔](https://remix.run/docs)
- [Mantine UI 文檔](https://mantine.dev)
- [Drizzle ORM 文檔](https://orm.drizzle.team)
- [BetterAuth 文檔](https://www.better-auth.com)

---

## 常見問題排查

### Q1: `npm run dev:all` 啟動失敗

**解决方案**：
```bash
# 清理 node_modules
rm -r node_modules package-lock.json

# 重新安裝
npm install

# 重試
npm run dev:all
```

### Q2: 埠口被佔用

**解决方案**：
```bash
# 檢查埠口佔用（PowerShell）
netstat -ano | findstr :3000

# 終止程序並重試
npm run dev:all
```

### Q3: TypeScript 型別錯誤

**解决方案**：
```bash
# 重建 TypeScript 快取
npx tsc --noEmit

# 檢查 Remix 型別
npx remix init
```

### Q4: 按鈕/Modal 無法點擊（但看起來 UI 正常）

常見根因與解法：

1) **Hydration mismatch**
- **現象**：Console 出現 `Hydration failed` / `Text content did not match`，按鈕、Tabs、Modal 事件可能完全失效。
- **解法**：統一 `toLocaleString("zh-TW")`、手動指定穩定 `id`、SSR 不相容區塊用 `ClientOnly`。

2) **在 Route JSX 內使用 `<script>` 綁事件**
- **現象**：從列表頁「點進詳細頁」後，按鈕失效（client-side navigation 時動態插入 script 不一定執行）。
- **解法**：改用 React 事件（`onClick`、`useFetcher`、`Form`）或 `useEffect` 綁原生事件（極端需要避開 hydration 才使用）。

3) **`process is not defined`（第三方套件在瀏覽器引用 Node globals）**
- **現象**：頁面初次載入就拋錯，後續互動可能全面失效（含 Modal、按鈕）。
- **解法**：在 `app/root.tsx` 的 `<head>` 提前注入 `window.process.env.NODE_ENV` polyfill，避免 bundle 初始化崩潰。

4) **Modal 遮罩沒有蓋住左側選單**
- **現象**：開 Modal 時，灰色透明遮罩蓋不到 sidebar。
- **解法**：避免 sidebar 設定過高 `z-index`；確保 overlay 的層級高於 navbar（目前在 `_app.tsx` 已調整）。

### Q5: 左側選單收合時文字/表情符號覆蓋主內容

- **現象**：收合後仍看到部分 icon/文字（例如系統設定、登出）留在畫面上。
- **解法**：收合時對 Mantine 實際 navbar 節點做 `display: none`，並避免只靠 transform/opacity。由於 Mantine 版本差異，selector 需同時涵蓋 `.mantine-AppShell-navbar` 與 `data-mantine-appshell-navbar` 等常見標記（目前在 `_app.tsx` 已補齊）。

---

## 最後備註

此專案采用**型別安全優先**的開發策略：

✅ 所有路由、狀態、API 響應都有 TypeScript 型別檢查  
✅ Drizzle ORM 確保資料庫查詢的型別安全  
✅ Remix 內建表單型別驗證  
✅ Zustand 狀態具備完整型別推導  

開發時始終寧可花時間補型別，也要確保執行時安全性。這樣可以避免線上環境的無謂故障。

---

**更新時間**：2026 年 3 月 9 日  
**專案名稱**：KOL_DB (Remix + Node.js + Drizzle)
