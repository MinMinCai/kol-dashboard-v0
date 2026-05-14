# MVP 路線圖（12 週）

> 最後更新：2026-05-08
> 狀態標示：✅ 已完成 ｜ ⚠️ 部分完成 ｜ 🔲 未完成 ｜ ➕ 計畫外新增

---

## Week 1-2: 基礎建模

- ✅ 建立 PostgreSQL schema（Drizzle ORM，schema.ts 為唯一真相來源）
- ✅ 完成 KOL、社群（多平台 social metrics）、合作歷史 CRUD
- ⚠️ 建立權限角色（admin, pm, sales, analyst）
  - Demo 階段以 Cookie 模擬登入（`demo-auth.server.ts`）+ `view-as` 切換角色（AE / KOL / Tech / Media）
  - 正式 RBAC 已預留於 `auth.server.ts`（BetterAuth + Google OAuth），正式上線時啟用

---

## Week 3-4: 搜尋與篩選

- ✅ KOL 多條件篩選（粉絲數區間、產業、標籤、評分範圍）
- ✅ 多欄位排序（粉絲數、互動率、評分、合作次數、名稱）
- ✅ 前端列表（卡片 / 表格視圖切換）與詳情頁
- ➕ URL-driven 篩選狀態（搜尋條件全部在 URL，支援分享連結 / 回上頁保持狀態）
- ➕ 批量匯入（Excel）：`api.kols.batch-import.ts`；範本下載 `api.kols.batch-import-template.ts`
- ➕ Apify 社群粉絲數介接點：`api.social-followers.ts`（尚未正式串接）

---

## Week 5-6: 提案流程

- ✅ Proposal + Stage 工作流（草稿 → 內審 → 送客 → 已核准）
- ✅ 記錄客戶反饋與候選人狀態（accepted / rejected / pending）
- ⚠️ 提案版本歷史
  - 目前無完整版本歷史，但記錄了 stage 變更與候選人異動
- ➕ 提案列表 filter / sort / pagination
- ➕ AI KOL 智能搜尋（Mock）：自然語言帶入候選人
- ➕ 提案匯出（Excel）：`api.proposals.$proposalId.export.ts`
- ➕ 提案文件生成（docx）：`api.proposals.$proposalId.generate-doc.ts`
- ➕ 即時異動通知（SSE）：`api.proposals.$proposalId.events.ts`，有人更新提案時自動通知頁面上其他成員

---

## Week 7-8: 執行案件管理

- ✅ 建立執行案件（Insertion Order）與 KOL 合作節點
- ✅ AI 智能解析匯入（Excel → 欄位帶入，目前 Mock）：`api.ai-parse-order.ts`
- ⚠️ 追蹤交付、審稿、付款狀態
  - 目前有合作項目（services）與授權（authorization）欄位，付款狀態尚未獨立追蹤
- ⚠️ 提醒機制（逾期、待審、待付款）
  - 提案異動通知已實作；委刊單的逾期/付款提醒尚未開發
- ➕ 三層式摺疊結構（委刊單 → 品牌 → KOL 明細）
- ➕ 合作評價（星級評分 + 內部 / 外部評語）：`upsertIOReviewByAuthor`
- ➕ 成效數據手動輸入（觸及 / 曝光 / 互動）：`updateIOPerformance`
- ➕ 執行案件編輯（services / authorization 欄位）：`_app.insertion-orders.$insertionOrderId.edit.tsx`

---

## Week 9-10: 成效追蹤

- ✅ 手動匯入成效數據（觸及人數、按讚、留言、分享、收藏、互動率）
- ✅ Campaign KPI 面板（執行案件詳情成效總覽 modal，依 KOL / 版位分組）
- ✅ 結案評價與復盤欄位（KOL 星級評分、客戶反饋）
- ⚠️ CSV / API 自動匯入
  - CSV 尚未實作；API OCR 規格已定義，demo 以 mock 模擬，正式版接 Claude Haiku 4.5
- ➕ 成效數據 CSV 匯出（下載整份案件成效表格）
- ➕ actualPrice / actualFee 欄位（實際結算金額 vs. 預估報價對比）

---

## Week 11-12: AI 功能

- ⚠️ 自然語言搜尋 KOL
  - 前端 UI 已完成（AI KOL 智能搜尋 modal）；後端為 Mock，正式版規格已預留
- ✅ 生成結案報告（PPT）
  - `report-ppt.server.ts` 實作 PPT 草稿生成，支援多模板、KOL 篩選、版本管理
- ✅ 提案文件生成（docx 合約 / 委刊單）：`api.proposals.$proposalId.generate-doc.ts`
- 🔲 模型評估與人工覆核流程（尚未開發）
- ➕ AI 訂單解析（委刊單 Excel 智慧帶入）：`api.ai-parse-order.ts`（Mock）

---

## 計畫外完成項目（超出原始 12 週範圍）

| 功能 | 路徑 |
|------|------|
| 收藏資料夾（建立 / 改名 / 刪除 / 多資料夾）| `_app.favorites.tsx` |
| 收藏資料夾共享（同事 / 整組，view / edit 權限）| `kol_favorite_folder_shares` |
| KOL 收藏匯出 Excel | `api.kols.export-excel.ts` |
| 提案異動通知系統（SSE + notifications 資料表）| `notifications.server.ts` |
| 儀表板（KOL / 提案 / 執行案件 + SparkLine）| `_app.dashboard.tsx` |
| 系統設定（客戶 / 品牌 / 標籤維護）| `_app.settings.tsx` |
| Demo view-as 角色切換 | `api.view-as.ts` |
| 結案報告管理頁（版本 / 下載 / 刪除）| `_app.reports.generate.tsx` |
| DB 健康檢查 API（Vercel function 探活）| `api.db-health.ts` |
| Dark Mode（不依賴 React Hook）| `login.tsx` + `_app.tsx` |

---

## 待辦 / 正式上線前需補齊

- 🔲 BetterAuth + Google OAuth 啟用（`auth.server.ts` 已預留）
- 🔲 委刊單逾期 / 付款提醒機制
- 🔲 AI OCR 成效截圖辨識（接 Claude Haiku 4.5）
- 🔲 自然語言搜尋 KOL（NL2SQL 後端實作）
- 🔲 Apify 社群粉絲數自動同步（`api.social-followers.ts` 介接點已預留）
- 🔲 提案版本完整歷史記錄
