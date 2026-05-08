# API Reference

> 本文件涵蓋所有 `app/routes/api.*` 端點。
> 這些端點供前端元件呼叫，**不是** Remix loader/action 資料流，而是可直接以 `fetch` / `<a>` / `<form>` 呼叫的 HTTP API。
>
> **Mock 說明**：標示 🔧 Mock 的端點目前回傳假資料，正式上線前需替換為真實後端服務。

---

## 目錄

1. [KOL 管理](#kol-管理)
2. [提案管理](#提案管理)
3. [委刊單管理](#委刊單管理)
4. [結案報告](#結案報告)
5. [系統工具](#系統工具)

---

## KOL 管理

### 批量匯入範本下載

```
GET /api/kols/batch-import-template
```

下載 KOL 批量匯入用的 Excel 範本（含欄位說明與 data validation）。

**Response**

| 欄位 | 值 |
|------|-----|
| Content-Type | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| Content-Disposition | `attachment; filename*=UTF-8''KOL_batch_import_template.xlsx` |

**範本欄位**：KOL名稱、平台帳號（IG / YT / TikTok / FB）、粉絲數、標籤、報價、audience metrics 等。

---

### KOL 批量匯入

```
POST /api/kols/batch-import
Content-Type: multipart/form-data
```

上傳填好的 Excel 範本，伺服端解析並寫入資料庫。

**Request Body（multipart）**

| 欄位 | 型別 | 說明 |
|------|------|------|
| `excelFile` | File | xlsx 格式，最大 10 MB |

**Response（成功）**

```json
{
  "result": {
    "total": 12,
    "success": 10,
    "failed": 2,
    "errors": ["第 3 列：KOL名稱不得為空", "第 7 列：Instagram 粉絲數格式錯誤"]
  }
}
```

**Response（失敗）**

```json
{ "error": "請選擇有效的 Excel 檔案" }
```

---

### KOL 匯出 Excel

```
POST /api/kols/export-excel
Content-Type: application/x-www-form-urlencoded
```

將指定 KOL 清單匯出為 Excel（供收藏頁批量匯出使用）。

**Request Body**

| 欄位 | 型別 | 說明 |
|------|------|------|
| `kolIds` | string | 逗號分隔的 KOL ID，例如 `kol_001,kol_002` |

**Response**

| 欄位 | 值 |
|------|-----|
| Content-Type | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| Content-Disposition | `attachment; filename*=UTF-8''KOL匯出_YYYY-MM-DD.xlsx` |

**匯出欄位**（26 欄）：KOL名稱、性別、年齡、聯絡電話、Email、請款方式、標籤、收藏資料夾、各平台 URL 與粉絲數、評分、合作次數、平均價格、互動率、受眾 metrics 等。

---

### 社群粉絲數查詢 🔧 Mock

```
GET /api/social-followers?platform={platform}&url={profileUrl}
```

查詢指定社群帳號的粉絲數（預留 Apify 整合介接點，目前回傳 Mock 數值）。

**Query Params**

| 參數 | 必填 | 說明 |
|------|------|------|
| `platform` | ✅ | `instagram` / `youtube` / `tiktok` / `facebook` / `threads` |
| `url` | ✅ | 社群帳號頁面 URL |

**Response（成功）**

```json
{
  "platform": "instagram",
  "url": "https://www.instagram.com/example",
  "followers": 128543,
  "source": "mock-api"
}
```

**Response（失敗）**

```json
{ "error": "platform and url are required" }
```

---

## 提案管理

### 提案異動通知（SSE）

```
GET /api/proposals/:proposalId/events?userId={userId}
```

建立 Server-Sent Events 連線，接收該提案的即時異動通知。當其他成員更新提案時，所有訂閱者會收到事件。

**Query Params**

| 參數 | 必填 | 說明 |
|------|------|------|
| `userId` | ✅ | 當前使用者 ID（demo 階段用 sessionStorage 儲存） |

**Response Headers**

```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
X-Accel-Buffering: no
```

**事件格式**

```
: connected       ← 初始握手（comment）
: ping            ← 每 25 秒 keepalive

data: {"updatedBy":"Amy","field":"更新人選狀態","timestamp":"2026-05-08T10:30:00.000Z"}
```

**用法（前端）**

```ts
const es = new EventSource(`/api/proposals/${proposalId}/events?userId=${userId}`);
es.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // data.updatedBy, data.field, data.timestamp
};
// 離開頁面時關閉
es.close();
```

---

### 提案匯出（Excel）

```
GET /api/proposals/:proposalId/export
```

將提案基本資料與 KOL 候選名單匯出為 Excel（含兩個 Sheet）。

**Path Params**

| 參數 | 說明 |
|------|------|
| `proposalId` | 提案 ID |

**Response**

| 欄位 | 值 |
|------|-----|
| Content-Type | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| Content-Disposition | `attachment; filename*=UTF-8''{提案標題}.xlsx` |

**Excel 結構**

- **Sheet 1 — 提案基本資料**：標題、客戶、當前階段、總預算、截止日期
- **Sheet 2 — KOL 候選名單**：KOL名稱、合作項目、預估 / 實際報價、真粉比例、互動率、品牌適配度、CPFR、KOL建議、客戶反饋、狀態

---

### 提案文件生成（docx）

```
GET /api/proposals/:proposalId/generate-doc?type={type}&candidateId={id}&startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}
```

根據提案資料與候選人，生成 KOL 合約或委刊單 Word 文件（`.docx`）。

**Query Params**

| 參數 | 必填 | 說明 |
|------|------|------|
| `type` | ✅ | `contract`（合約）或 `io`（委刊單） |
| `candidateId` | ✅ | 提案候選人 ID |
| `startDate` | ✅ | 合作起始日，格式 `YYYY-MM-DD` |
| `endDate` | ✅ | 合作結束日，格式 `YYYY-MM-DD`，不得早於 startDate |

**Response（成功）**

| 欄位 | 值 |
|------|-----|
| Content-Type | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| Content-Disposition | `attachment; filename*=UTF-8''{KOL名稱}_{文件類型}.docx` |

**Response（失敗）**

| 狀態碼 | 說明 |
|--------|------|
| 400 | 缺少必要參數或日期格式錯誤 |
| 404 | 提案或候選人不存在 |

---

## 委刊單管理

### 單筆委刊單 JSON

```
GET /api/insertion-orders/:id
```

取得單一委刊單的完整 JSON 資料（供除錯 / 外部系統使用）。

**Path Params**

| 參數 | 說明 |
|------|------|
| `id` | 委刊單 ID |

**Response（成功）**

```json
{
  "id": "io_001",
  "orderNo": "IO-2026-001",
  "projectName": "春季整合推廣",
  "clientName": "Panasonic",
  "totalBudget": 500000,
  "collaborations": [...],
  "reports": [...]
}
```

**Response（失敗）**：`null`（HTTP 404）

---

### AI 智能訂單解析 🔧 Mock

```
GET /api/ai-parse-order?filename={filename}
```

上傳委刊單文件後，AI 解析並回傳建議填入的欄位值（目前為 Mock，正式版接 Claude API）。

**Query Params**

| 參數 | 必填 | 說明 |
|------|------|------|
| `filename` | ✅ | 上傳檔案的檔名（用於 seed mock 資料） |

**Response**

```json
{
  "parsed": {
    "projectName": "Panasonic 春季整合推廣",
    "clientName": "Panasonic",
    "brand": "Panasonic",
    "industries": ["家電"],
    "documentUrl": "https://example.com/uploads/campaign.pdf",
    "salesOwner": "Amy",
    "kolManager": "John",
    "description": "由 campaign.pdf 解析出的初步專案資訊，請確認欄位是否正確。"
  },
  "detectedFields": 7
}
```

---

## 結案報告

### 報告下載

```
GET /api/reports/:orderId/:reportId/download
```

下載指定委刊單的結案報告 PPT。若檔案不存在且可重新生成，會自動重新生成後回傳。

**Path Params**

| 參數 | 說明 |
|------|------|
| `orderId` | 委刊單 ID |
| `reportId` | 報告 ID（由 `rep_${Date.now()}` 生成） |

**Response（成功）**

| 欄位 | 值 |
|------|-----|
| Content-Type | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |
| Content-Disposition | `attachment; filename*=UTF-8''{案件名稱}_結案報告.pptx` |

**Response（失敗）**

| 狀態碼 | 說明 |
|--------|------|
| 404 | 委刊單或報告不存在、檔案無法取得 |
| 500 | 報告重新生成失敗（含錯誤訊息） |

---

## 系統工具

### DB 健康檢查

```
GET /api/db-health
```

檢查資料庫連線與各資料表存取狀態（供 Vercel function 探活 / 部署驗收使用）。

**Response**

```json
{
  "totalMs": 142,
  "kols":                   { "ok": true,  "ms": 18, "count": 47 },
  "proposals":              { "ok": true,  "ms": 12, "count": 23 },
  "insertionOrders":        { "ok": true,  "ms": 15, "count": 31 },
  "kolSocialAccounts":      { "ok": true,  "ms": 11, "count": 47 },
  "kolFavoriteFolders":     { "ok": true,  "ms": 9,  "count": 8  },
  "kolFavoriteFolderItems": { "ok": true,  "ms": 10, "count": 34 },
  "systemPreferences":      { "ok": true,  "ms": 8,  "count": 12 },
  "teamMembers":            { "ok": true,  "ms": 9,  "count": 6  }
}
```

若某資料表連線失敗，對應 `ok` 為 `false`，`error` 欄位含錯誤訊息。

---

### Demo 身份切換

```
POST /api/view-as
Content-Type: application/x-www-form-urlencoded
```

切換 demo 階段的使用者身份（角色）。切換後會 redirect 並寫入 cookie。

> ⚠️ 僅供 Demo 環境使用，正式上線應移除。

**Request Body**

| 欄位 | 型別 | 說明 |
|------|------|------|
| `memberId` | string | 切換目標的成員 ID；傳空字串代表回復預設 |
| `redirectTo` | string | 切換後 redirect 的路徑（預設 `/favorites`） |

**Response**：302 Redirect（Set-Cookie: view-as-member）

---

## 錯誤格式

所有 JSON API 的錯誤回應統一格式：

```json
{ "error": "錯誤說明文字" }
```

| 常見狀態碼 | 說明 |
|-----------|------|
| 400 | 缺少必要參數 / 格式錯誤 |
| 404 | 資源不存在 |
| 405 | 不支援的 HTTP Method |
| 500 | 伺服端錯誤 |
