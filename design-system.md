# Design System

本文件記錄專案完整的設計規範，供新專案進行 SDD（Style-Driven Development）時直接參照或移植。

> **使用說明**：此文件以實際程式碼為基準分析產生，所有模式皆已在 light / dark 兩種模式驗證。新專案可直接複製相關區塊的 CSS token 與元件模式。

---

## 技術棧

| 項目 | 選用 |
|------|------|
| UI 框架 | [Mantine v7](https://mantine.dev/) |
| 樣式方式 | CSS Modules（route-level）+ 全域 `styles.css` |
| 字型 | Google Fonts — Noto Sans TC |
| 深色模式 | `defaultColorScheme="auto"`，CSS `light-dark()` |
| 主題客製 | **零** Mantine theme override，全透過 CSS 變數 |

---

## 新專案架構方針（A + C 策略）

### 原則

**降低 Mantine 接觸面，提高自主掌控度。**

Mantine 只負責「行為複雜、手刻成本高」的元件；視覺樣式與常用組合全部自己掌控。

### 元件分層

| 層級 | 做法 | 範例 |
|------|------|------|
| **複雜行為元件** | 直接用 Mantine，少動樣式 | Modal、Select、Toast、DatePicker |
| **簡單展示元件** | 自己寫 CSS，不依賴 Mantine | Button、Badge、Card |
| **頁面級組合元件** | 封裝成自己的元件，內部自由選用 | `<StatCard>`、`<PageHeader>`、`<DataTable>` |

### 樣式覆蓋規則

Mantine 元件透過 `className` prop 套用自訂樣式，不使用 Mantine `styles` prop 或 theme override：

```tsx
// 正確：用 className 接管樣式
<Paper className={styles.statCard} withBorder radius="md">
  ...
</Paper>
```

```css
/* statCard.module.css */
.statCard {
  background: var(--kol-surface);
  padding: 20px;
}
.statCard:hover {
  box-shadow: 0 4px 16px rgba(15, 52, 96, 0.1);
}
```

### 封裝元件原則

- 封裝元件只暴露**業務語義的 props**，不透傳 Mantine props
- 樣式細節收在元件內部，呼叫端不需要知道底層用了什麼
- 元件放在 `app/components/` 統一管理

```tsx
// 封裝範例
export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Paper className={styles.statCard} withBorder radius="md">
      ...
    </Paper>
  );
}

// 呼叫端只需要這樣
<StatCard label="總 KOL 數" value={1234} icon={<IconUsers />} />
```

---

## 全域 CSS 變數

定義於 `styles.css`，覆蓋整個應用程式語義色層。

```css
:root {
  --kol-surface:    #ffffff;   /* 卡片、對話框背景 */
  --kol-chrome:     #fafbfc;   /* Header、Navbar 背景 */
  --kol-workspace:  #f4f5f7;   /* 主內容區背景 */
}

[data-mantine-color-scheme="dark"] {
  --kol-surface:   var(--mantine-color-dark-6);
  --kol-chrome:    var(--mantine-color-dark-7);
  --kol-workspace: var(--mantine-color-dark-8);
}
```

**AppShell 套用方式：**
```css
.header { background: var(--kol-chrome); }
.navbar  { background: var(--kol-chrome); }
.main    { background: var(--kol-workspace); }
```

---

## 色彩調色板

### 主色

| 名稱 | Token | Hex |
|------|-------|-----|
| Primary | `var(--mantine-color-blue-filled)` | `#228be6` |
| Primary Light | `var(--mantine-color-blue-light)` | `#dbe4ff` |
| Primary Dark | `var(--mantine-color-blue-8)` | `#1971c2` |

### 語義色

| 名稱 | Token | 用途 |
|------|-------|------|
| Danger | `var(--mantine-color-red-filled)` | 刪除、錯誤、危險操作 |
| Success | `var(--mantine-color-green-filled)` | 確認、成功、正向狀態 |
| Warning | `var(--mantine-color-yellow-filled)` | 警告提示 |

### 中性色

| 名稱 | Token | 用途 |
|------|-------|------|
| Text | `var(--mantine-color-text)` | 主要文字 |
| Dimmed | `var(--mantine-color-dimmed)` | 次要文字、說明文字 |
| Border | `var(--mantine-color-default-border)` | 卡片邊框、分隔線 |
| Hover BG | `var(--mantine-color-default-hover)` | 統計區塊、行 hover |
| Surface | `var(--mantine-color-body)` | 頁面背景 |
| Placeholder | `var(--mantine-color-gray-4)` | 輸入框佔位文字 |

### 平台專用色（Badge）

用於社群平台 Badge，統一以 `variant="light"` 呈現柔和色塊。

| 平台 | Mantine `color` prop |
|------|--------------------|
| Instagram | `"pink"` |
| YouTube | `"red"` |
| TikTok | `"violet"` |
| Facebook | `"blue"` |
| Twitter / X | `"cyan"` |

### AI / 系統強調色

```css
/* AI 識別卡片 */
background: var(--mantine-color-blue-0);                  /* light */
background: rgba(51, 154, 240, 0.18);                     /* dark */
border: 1px solid rgba(51, 154, 240, 0.35);               /* dark */

/* AI 理由欄位 */
background: rgba(51, 154, 240, 0.1);
border-left: 3px solid #339af0;
border-radius: 4px;
```

---

## 排版

### 字型家族

```css
font-family: "Noto Sans TC", system-ui, sans-serif;
```

全局套用，確保繁體中文正確顯示。

### 字體大小

| Mantine `size` | 對應大小 | 用途 |
|---------------|---------|------|
| `xs` | 12px | 標籤、Caption、輔助說明 |
| `sm` | 14px | 次要文字、表格內容、導覽連結 |
| `md` | 16px | 預設內文 |
| `lg` | 18px | 卡片主要內文 |
| `xl` | 20px | 較大強調文字 |

### 字重

| `fw` 值 | 用途 |
|--------|------|
| `400` | 一般內文 |
| `500` | 輕度強調、導覽連結 |
| `600` | 標籤、欄位 label、active 狀態 |
| `700` | 標題、重要數值 |

### 標題層級

```tsx
<Title order={2}>頁面標題</Title>      // 最高層級，每頁僅一個
<Title order={3}>區塊標題</Title>      // 主要內容區塊
<Title order={4}>次區塊標題</Title>
<Title order={5}>元件標題</Title>
```

---

## 文本樣式

### 常用文字屬性組合

```tsx
// 頁面主標題
<Title order={2} fw={700}>標題</Title>

// 區塊標籤（全大寫）
<Text size="xs" fw={600} tt="uppercase" c="dimmed">FOLLOWERS</Text>

// 主要數值
<Text size="lg" fw={700}>1,234,567</Text>

// 次要說明
<Text size="sm" c="dimmed">這是輔助說明文字</Text>

// 一般內文
<Text size="sm">內文段落</Text>

// 強調連結式文字
<Text size="sm" fw={600} c="blue">查看詳情</Text>
```

### 文字色彩規則

- 主要內文：預設繼承（`var(--mantine-color-text)`）
- 次要文字：`c="dimmed"`
- 連結 / 強調：`c="blue"`
- 危險提示：`c="red"`
- 成功提示：`c="green"`

### 預格式化文字（合約、說明、回饋）

```css
.contractText {
  font-family: monospace;
  font-size: 13px;
  white-space: pre-wrap;
  padding: 12px;
  background: var(--mantine-color-default-hover);
  border-radius: 4px;
}

.introText,
.feedbackText {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
}
```

---

## 組件樣式

### Button

```tsx
// 主要操作（filled，藍色）
<Button>送出</Button>

// 次要操作（柔和背景）
<Button variant="light">取消</Button>

// 低強調（無背景）
<Button variant="subtle">查看</Button>

// 邊框式（預設灰框）
<Button variant="default">更多</Button>

// 危險操作
<Button color="red" variant="light">刪除</Button>
```

**尺寸規則：**
- 表格、卡片內用 `size="xs"` 或 `size="sm"`
- 表單送出、頁面主要操作用預設 `size="sm"` 或 `size="md"`
- 全寬按鈕加 `fullWidth`

---

### Badge

```tsx
<Badge variant="light" radius="xl" size="sm" color="pink">
  Instagram
</Badge>
```

- 統一 `variant="light"` + `radius="xl"`（pill 形狀）
- 尺寸：`xs`（緊湊列表）或 `sm`（一般）

---

### Card

```tsx
<Card withBorder radius="md" p="md">
  ...
</Card>
```

- 必須加 `withBorder`
- `radius="md"` 為標準圓角
- 具互動性（可點擊）的卡片加 `.kol-card` 或 `.io-card` className 套用 hover 效果

---

### Paper（統計方塊）

```tsx
<Paper withBorder p="md" radius="md" shadow="xs" h="100%">
  ...
</Paper>
```

- `shadow="xs"` — 低海拔陰影，適合資訊卡
- `shadow="xl"` — 高海拔陰影，適合浮動元素（Toast、Popover）

---

### Table

```tsx
<Table highlightOnHover>
  ...
</Table>
```

- 第一欄放 Avatar（`size={32}` / `radius="xl"`）
- 平台欄以 Badge 顯示
- 操作欄以 `<Group gap="xs">` 排列小型 Button

---

### Avatar

```tsx
<Avatar src={url} size={50} radius="xl" />   // 卡片頭像
<Avatar src={url} size={32} radius="xl" />   // 表格頭像
<Avatar src={url} size={72} radius="xl" />   // 詳細頁主圖
```

---

### Form 元件

| 元件 | 用途 |
|------|------|
| `TextInput` | 一般文字輸入（height: 36px） |
| `Textarea` | 多行輸入 |
| `Select` | 下拉選單 |
| `FileInput` | 檔案選取 |
| `Radio` | 單選群組 |
| `Checkbox` | 多選群組 |
| `NumberInput` | 數字輸入 |

---

### Modal

```tsx
const [opened, { open, close }] = useDisclosure(false);

<Modal opened={opened} onClose={close} title="確認刪除">
  ...
</Modal>
```

- 一律用 `useDisclosure()` 管理開關狀態
- 刪除確認、進度追蹤、設定等場合使用

---

### Toast 通知

```tsx
// 透過 Zustand store 觸發
// 動畫：slide-left，duration 300ms
// 自動消失：10 秒
<Transition transition="slide-left" duration={300}>
  <Notification ... />
</Transition>
```

---

## 互動元件樣式（CSS）

### KOL 卡片（`.kol-card`）

```css
.kol-card {
  transition: transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease;
}
.kol-card:hover {
  transform: translateY(-2px);
  background-color: light-dark(#f0f6ff, var(--mantine-color-dark-5));
  box-shadow: light-dark(
    0 12px 24px rgba(15, 23, 42, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.4)
  );
}
```

### IO 卡片（`.io-card`）

```css
.io-card {
  transition: box-shadow 140ms ease, background-color 140ms ease, transform 140ms ease;
}
.io-card:hover {
  transform: translateY(-1px);
  background-color: light-dark(#f8fafc, var(--mantine-color-dark-6));
  box-shadow: light-dark(
    0 10px 24px rgba(15, 23, 42, 0.09),
    0 10px 24px rgba(0, 0, 0, 0.3)
  );
}
```

### 模組卡片（Dashboard）

```css
.moduleCard {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.moduleCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
```

### 社群連結（`.social-link`）

```css
.social-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--mantine-color-blue-6);
  text-decoration: underline;
  cursor: pointer;
  width: fit-content;
}
.social-link:hover {
  color: var(--mantine-color-blue-8);
}
```

### 下載連結

```css
.template-download-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--mantine-color-blue-filled);
  text-decoration: none;
  transition: background-color 140ms ease, color 140ms ease, transform 140ms ease;
}
.template-download-link:hover {
  background-color: light-dark(var(--mantine-color-blue-light), rgba(34, 139, 230, 0.15));
  color: light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-3));
  text-decoration: underline;
  transform: translateY(-1px);
}
```

---

## 狀態樣式

### 選取 / Active 狀態

```css
/* 卡片選取框 */
.kolCardSelected {
  outline: 2px solid var(--mantine-color-blue-filled);
}

/* 切換按鈕 active */
.viewOptionActive,
.filterToggleActive,
.modalBtnActive {
  background: var(--mantine-color-blue-filled);
  color: #ffffff;
  font-weight: 600;
}
```

### 篩選標籤選取

```css
.tagLabel {
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid var(--mantine-color-default-border);
  font-size: 13px;
  transition: all 120ms;
}
.tagLabelActive {
  border-color: var(--mantine-color-blue-filled);
  background: var(--mantine-color-blue-light);
  font-weight: 600;
  color: var(--mantine-color-blue-filled);
}
```

### 停用 / Disabled 狀態

```css
:disabled,
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Tab 停用 */
.tab:disabled {
  color: var(--mantine-color-gray-5);
  opacity: 0.55;
  cursor: not-allowed;
}

/* 上傳中（等待） */
.uploadLabelDisabled {
  cursor: wait;
  opacity: 0.6;
}
```

### 空狀態（Empty State）

```css
.emptyCell {
  padding: 32px 0;
  color: var(--mantine-color-dimmed);
  text-align: center;
}

.emptyBox {
  border: 1px dashed var(--mantine-color-gray-4);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  color: var(--mantine-color-dimmed);
}
```

### 載入 / AI 處理中狀態

```css
.aiRecognizingCard {
  background: light-dark(var(--mantine-color-blue-0), rgba(51, 154, 240, 0.18));
  border: light-dark(none, 1px solid rgba(51, 154, 240, 0.35));
}

.aiSuccessCard {
  background: var(--mantine-color-blue-0);
  opacity: 0.8;
}
```

### 我的最愛（Favorite）

```css
.favoriteBtn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: var(--mantine-color-gray-4);
}
.favoriteBtnActive {
  color: var(--mantine-color-red-filled);
  text-shadow: 0 0 2px rgba(250, 82, 82, 0.4);
}
```

---

## 上傳元件

### 全域上傳區（`.upload-zone`）

```css
.upload-zone {
  border: 2px dashed light-dark(#94a3b8, var(--mantine-color-gray-6));
  border-radius: 14px;
  padding: 28px;
  background: light-dark(#f8fafc, var(--mantine-color-dark-7));
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease;
}
.upload-zone:hover {
  border-color: light-dark(#3b82f6, var(--mantine-color-blue-5));
  background: light-dark(#eff6ff, var(--mantine-color-dark-6));
}
```

### 頭像上傳區

```css
.avatarDropzone {
  width: 220px;
  border: 1px dashed #94a3b8;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  text-align: center;
}
```

### 檔案上傳（卡片內）

```css
.uploadLabel {
  padding: 32px;
  border: 2px dashed var(--mantine-color-blue-4);
  border-radius: 8px;
  background-color: var(--mantine-color-blue-light);
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}
```

---

## 導覽與 Layout

### Sidebar（深色漸層）

```css
--kol-sidebar-bg: linear-gradient(
  135deg,
  #0f172a 0%,
  #1e293b 35%,
  #0f3460 65%,
  #1a1a2e 100%
);

.navbar {
  z-index: 90;
  background: var(--kol-sidebar-bg) !important;
  color: rgba(255, 255, 255, 0.9) !important;
}
```

### 導覽連結

```css
.navLink {
  padding: 9px 12px;
  border-radius: 10px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 14px;
  border: 1px solid transparent;
  transition: color 150ms, background 150ms;
}
.navLink:hover {
  color: rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.08);
}
.navLinkActive {
  color: #ffffff !important;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.12);
}
```

### 主題切換 Toggle

```css
.themeToggleTrack {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--mantine-color-gray-3);
  border: 1px solid var(--mantine-color-default-border);
  transition: background 200ms;
}
.themeToggleThumb {
  position: absolute;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: left 200ms;
}
[data-mantine-color-scheme="dark"] .themeToggleThumb {
  left: 22px;
}
```

### Bulk Bar（批量操作列）

```css
.bulk-bar {
  position: sticky;
  bottom: 12px;
  z-index: 20;
  background: light-dark(#ffffff, var(--mantine-color-dark-7));
  box-shadow: light-dark(
    0 10px 30px rgba(15, 23, 42, 0.14),
    0 10px 30px rgba(0, 0, 0, 0.5)
  );
}
```

### 分頁按鈕

```css
.pageButton {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--mantine-color-default-border);
  background: transparent;
  color: var(--mantine-color-text);
  font-size: 14px;
}
.pageButtonActive {
  background: var(--mantine-color-blue-filled);
  color: #ffffff;
  font-weight: 600;
}
```

---

## 登入頁（Login Page）

```css
/* 左側漸層面板 */
.leftPanel {
  flex: 0 0 50%;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f3460 65%, #1a1a2e 100%);
  padding: 48px;
}

/* 品牌圖示 */
.brandIcon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
}

/* 版本 Badge */
.heroBadge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(59, 130, 246, 0.25);
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 20px;
  color: #93c5fd;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* 功能列表項目 */
.featureItem {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px 14px;
  backdrop-filter: blur(4px);
}
```

---

## Timeline

```css
.timelineMarker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--mantine-color-blue-filled);
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  flex-shrink: 0;
}
.timelineConnector {
  width: 2px;
  flex: 1;
  min-height: 16px;
  background: var(--mantine-color-default-border);
  margin-top: 4px;
}
```

---

## 間距系統

使用 Mantine 內建 spacing token，禁止使用 magic number。

| Token | 約等值 | 適用場合 |
|-------|--------|---------|
| `xs` | 4–8px | 緊湊元素間距、小 gap |
| `sm` | 8–12px | 預設元素間距 |
| `md` | 12–16px | 卡片內距、一般 gap |
| `lg` | 16–24px | 較大容器內距 |
| `xl` | 24–32px | 區塊與區塊之間 |

### Layout 元件

```tsx
// 垂直排列
<Stack gap="md">...</Stack>

// 水平排列，兩端對齊
<Group justify="space-between" align="center" gap="sm">...</Group>

// 響應式格線
<SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={24}>
  ...
</SimpleGrid>
```

### 頁面結構

```
AppShell Header：高度 64px
AppShell Navbar：寬度 260px（可收合，200ms ease 過渡）

標準頁面排列：
  1. 頁面標題（+ 操作按鈕靠右）
  2. 搜尋列 / 篩選列
  3. 內容區（卡片格線 or 表格）
  4. 分頁控制（底部）
```

### 響應式斷點

| 名稱 | 起始寬度 | 說明 |
|------|---------|------|
| `base` | 0px | 行動裝置（預設） |
| `sm` | 576px | 平板直式 |
| `md` | 768px | 平板橫式 |
| `lg` | 992px | 桌機 |
| `xl` | 1200px | 大螢幕 |

### 可捲動容器

```css
.scrollableList {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;   /* 避免內容被捲軸遮住 */
}
```

---

## Border Radius 規格

| 值 | 用途 |
|----|------|
| `4px` | 精細細節、AI reason block |
| `6px` | 按鈕、小型表單控件、分頁按鈕 |
| `8px` | 表單、Dropzone、Tab、對話框 |
| `10px` | 導覽連結（Mantine `radius-default`） |
| `12px` | Mantine `radius-md`、Toggle track |
| `14px` | 全域上傳區 |
| `16px` | 頭像上傳區 |
| `18px` | Mantine `radius-lg` |
| `20px` | Pill 形 Badge |
| `50%` | 圓形元素（Avatar、Toggle thumb、Timeline marker） |

---

## Z-Index 規格

| 值 | 用途 |
|----|------|
| `1` | 相對定位輔助 |
| `2` | 基礎覆蓋層 |
| `20` | Bulk Bar（sticky bottom） |
| `90` | Sidebar Navbar（固定導覽） |

---

## 陰影規格

```css
/* Toggle / 細節 */
0 1px 3px rgba(0, 0, 0, 0.15)

/* 卡片 hover（輕） */
0 4px 12px rgba(15, 23, 42, 0.14)   /* light */
0 4px 12px rgba(0, 0, 0, 0.5)       /* dark */

/* 卡片 hover（中） */
0 4px 16px rgba(15, 52, 96, 0.1)    /* light */
0 4px 16px rgba(0, 0, 0, 0.4)       /* dark */

/* Dashboard 模組卡片 */
0 8px 24px rgba(0, 0, 0, 0.06)

/* IO 卡片 hover */
0 10px 24px rgba(15, 23, 42, 0.09)  /* light */
0 10px 24px rgba(0, 0, 0, 0.3)      /* dark */

/* KOL 卡片 hover */
0 12px 24px rgba(15, 23, 42, 0.12)  /* light */
0 12px 24px rgba(0, 0, 0, 0.4)      /* dark */

/* Bulk Bar（sticky） */
0 10px 30px rgba(15, 23, 42, 0.14)  /* light */
0 10px 30px rgba(0, 0, 0, 0.5)      /* dark */

/* Dialog / Modal */
0 10px 24px rgba(0, 0, 0, 0.15)
```

---

## 特效與動畫

### 過渡時間規格

| 時間 | 用途 |
|------|------|
| `120ms ease` | KOL 卡片 hover、篩選標籤 |
| `140ms ease` | IO 卡片 hover、下載連結 |
| `150ms ease` | 表單焦點、導覽連結 |
| `200ms ease` | Dashboard 卡片、Navbar 收合、主題切換 |
| `300ms` | Toast slide-left |

### Accordion Chevron

```css
.chevron {
  display: block;
  transition: transform 0.2s;
}
.chevronExpanded {
  transform: rotate(180deg);
}
```

### Pulsing（注意力吸引）

```css
@keyframes pulse {
  0%   { transform: scale(1);    opacity: 1;   }
  50%  { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1);    opacity: 1;   }
}
.pulseIcon {
  animation: pulse 2s infinite;
}
```

### Greeting 文字動畫

```css
@keyframes greetingIn {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}
.greeting {
  animation: greetingIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}
```

### Navbar 收合

```css
transition: width 200ms ease, margin 200ms ease, padding 200ms ease;
```

### Toast 滑入

```tsx
<Transition transition="slide-left" duration={300} />
```

---

## 深色模式

### 切換機制

- `defaultColorScheme="auto"`（跟隨系統）
- 支援 `light` / `dark` / `auto` 三種模式
- HTML attribute：`data-mantine-color-scheme="light | dark"`
- LocalStorage key：`mantine-color-scheme-value`

### 自適應樣式寫法

```css
/* 優先使用 light-dark() 函式 */
background: light-dark(#ffffff, var(--mantine-color-dark-7));
border-color: light-dark(#e2e8f0, #1e293b);
box-shadow: light-dark(
  0 12px 24px rgba(15, 23, 42, 0.12),
  0 12px 24px rgba(0, 0, 0, 0.4)
);

/* 若需要 CSS Modules 深色覆蓋，使用 attribute selector */
[data-mantine-color-scheme="dark"] .myComponent {
  background-color: #1a2340 !important;
}
```

### 深色模式層次色

| Token | 用途 |
|-------|------|
| `var(--mantine-color-dark-6)` | 卡片背景 |
| `var(--mantine-color-dark-7)` | 頁面主背景 |
| `var(--mantine-color-dark-8)` | 最底層背景（AppShell） |

### 各元件深色對應

| 元件 | Light | Dark |
|------|-------|------|
| 卡片 hover 背景 | `#f8fafc` | `var(--mantine-color-dark-6)` |
| 邊框 | `#e2e8f0` | `#1e293b` |
| KOL 卡片陰影 | `rgba(15,23,42,0.12)` | `rgba(0,0,0,0.4)` |
| IO 卡片陰影 | `rgba(15,23,42,0.09)` | `rgba(0,0,0,0.3)` |
| Bulk Bar 陰影 | `rgba(15,23,42,0.14)` | `rgba(0,0,0,0.5)` |

### 注意事項

- 所有新元件必須在 light / dark 兩種模式下驗證視覺效果
- 不可使用 hardcode hex 色值，統一使用 Mantine token 或 `light-dark()` 函式
- CSS Modules 深色覆蓋使用 `[data-mantine-color-scheme="dark"]` selector
- 圖示顏色會自動繼承 Mantine 主題，無需手動指定
