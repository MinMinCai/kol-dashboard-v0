# Design System — KOL DB Demo

本文件記錄專案的設計規範，供未來開發維持整體視覺一致性。

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
| Surface | `var(--mantine-color-body)` | 頁面背景 |
| Placeholder | `var(--mantine-color-gray-4)` | 輸入框佔位文字 |

### 平台專用色

用於社群平台 Badge，統一以 `variant="light"` 呈現柔和色塊。

| 平台 | Mantine `color` prop |
|------|--------------------|
| Instagram | `"pink"` |
| YouTube | `"red"` |
| TikTok | `"violet"` |
| Facebook | `"blue"` |
| Twitter / X | `"cyan"` |

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
| `sm` | 14px | 次要文字、表格內容 |
| `md` | 16px | 預設內文 |
| `lg` | 18px | 卡片主要內文 |
| `xl` | 20px | 較大強調文字 |

### 字重

| `fw` 值 | 用途 |
|--------|------|
| `400` | 一般內文 |
| `500` | 輕度強調 |
| `600` | 標籤、欄位 label |
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

### Badge（Avatar 搭配）

```tsx
<Avatar src={url} size={50} radius="xl" />   // 卡片頭像
<Avatar src={url} size={32} radius="xl" />   // 表格頭像
<Avatar src={url} size={72} radius="xl" />   // 詳細頁主圖
```

---

### Form 元件

| 元件 | 用途 |
|------|------|
| `TextInput` | 一般文字輸入 |
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

### 上傳區（`.upload-zone`）

```css
border: 2px dashed var(--mantine-color-default-border);
border-radius: 14px;
padding: 28px;
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

---

## 特效與動畫

### KOL 卡片 hover（`.kol-card`）

```css
.kol-card {
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.kol-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
}
```

### IO 卡片 hover（`.io-card`）

```css
.io-card {
  transition: box-shadow 140ms ease, background-color 140ms ease, transform 140ms ease;
}
.io-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.09);
}
```

### 模組卡片 hover（Dashboard）

```css
transition: transform 200ms ease, box-shadow 200ms ease;

/* hover */
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
```

### 篩選標籤選取

```css
transition: all 120ms;
/* 選取後：border-color → blue，font-weight 400 → 600 */
```

### 上傳區 hover

```css
.upload-zone:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}
```

### Navbar 收合

```css
transition: width 200ms ease, margin 200ms ease, padding 200ms ease;
```

### Bulk Bar（批量操作列）

```css
/* 固定於頁面底部，距底 12px */
position: sticky;
bottom: 12px;
box-shadow: 0 10px 30px rgba(15, 23, 42, 0.14);
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
/* 使用 light-dark() 同時定義兩種模式 */
background: light-dark(#ffffff, var(--mantine-color-dark-7));
border-color: light-dark(#e2e8f0, #1e293b);
box-shadow: light-dark(
  0 12px 24px rgba(15, 23, 42, 0.12),
  0 12px 24px rgba(0, 0, 0, 0.4)
);
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
- 圖示顏色會自動繼承 Mantine 主題，無需手動指定
