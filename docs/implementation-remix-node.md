# Remix + Node.js 實作設計

## 1. 應用分層

- `app/routes/*`: Remix 路由 (loader/action)
- `app/features/*`: 功能模組 (kol, proposal, io, performance, ai)
- `app/components/*`: Mantine UI 元件
- `app/stores/*`: Zustand 前端狀態
- `db/drizzle/*`: 資料表與關聯
- `server/*`: 服務層、排程、AI 任務

## 2. 核心流程對應目標

### 資料集中化
- `kols` / `kol_social_accounts` / `campaign_performance` 作為單一真實來源
- 所有合作資料透過 `insertion_orders` 串接

### 流程數位化
- `proposals` 管提案流程
- `insertion_orders` 管簽約/執行/結案
- `io_tasks` 管執行節點與進度

### 知識累積
- `proposal_feedback` 記錄客戶反饋
- `campaign_performance` 累積 KPI / ROI
- `ai_reports` 沉澱摘要與洞察

### AI 輔助決策（進階版）
- 搜尋：自然語言 -> SQL filter + embedding retrieval
- 辨識：從成效資料找高轉換 pattern
- 報告：自動產生結案/週報

## 3. API 邊界建議

- `/api/kols` CRUD + filter
- `/api/proposals` CRUD + stage transition + feedback
- `/api/insertion-orders` CRUD + task management
- `/api/performance` ingest + dashboard metrics
- `/api/ai/search-kol` / `/api/ai/generate-report`

## 4. Auth/RBAC

- BetterAuth (Google OAuth)
- 角色：`admin`, `sales`, `pm`, `analyst`
- 權限策略：
  - `sales`: KOL 搜尋、提案管理
  - `pm`: IO 任務、執行進度
  - `analyst`: 成效分析、報告
  - `admin`: 全域管理

## 5. Cloud Run 部署

- Build: `npm install && npm run build`
- Run: `npm run start`
- 使用 Cloud SQL(Postgres) + Secret Manager( OAuth/client secrets )
- 背景任務可拆 second service 或 Cloud Run Jobs

