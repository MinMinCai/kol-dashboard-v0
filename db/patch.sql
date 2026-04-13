-- ============================================================
-- patch.sql — 補齊 schema.ts 和 DB 之間的差異
-- 在 Supabase Dashboard > SQL Editor 執行此腳本
-- ============================================================

-- ─── 1. 新增缺少的 columns 到 kols ───────────────────────────
ALTER TABLE kols
  ADD COLUMN IF NOT EXISTS industry varchar(100),
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}' NOT NULL,
  ADD COLUMN IF NOT EXISTS rating numeric(4,2),
  ADD COLUMN IF NOT EXISTS collaboration_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS average_price numeric(12,2),
  ADD COLUMN IF NOT EXISTS industry_distribution text[] DEFAULT '{}' NOT NULL,
  ADD COLUMN IF NOT EXISTS is_favorite boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS favorite_folder varchar(100),
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS platform varchar(30),
  ADD COLUMN IF NOT EXISTS followers integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS engagement_rate numeric(5,2),
  ADD COLUMN IF NOT EXISTS exposure_rate numeric(5,2),
  ADD COLUMN IF NOT EXISTS audience_gender jsonb,
  ADD COLUMN IF NOT EXISTS audience_age varchar(50),
  ADD COLUMN IF NOT EXISTS introduction text,
  ADD COLUMN IF NOT EXISTS instagram_handle varchar(120),
  ADD COLUMN IF NOT EXISTS payment_method varchar(10),
  ADD COLUMN IF NOT EXISTS social jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS contact jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS collaboration_history jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS price_trend jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS performance_stats jsonb,
  ADD COLUMN IF NOT EXISTS platform_metrics jsonb;

-- ─── 2. 修改 proposals ────────────────────────────────────────
-- client_id 原本是 NOT NULL，改為可 null
ALTER TABLE proposals ALTER COLUMN client_id DROP NOT NULL;
-- 新增 client_name
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS client_name varchar(200);

-- ─── 3. 修改 proposal_kols ────────────────────────────────────
-- kol_id 原本是 NOT NULL，改為可 null
ALTER TABLE proposal_kols ALTER COLUMN kol_id DROP NOT NULL;
-- 新增缺少的 columns
ALTER TABLE proposal_kols
  ADD COLUMN IF NOT EXISTS kol_name varchar(150),
  ADD COLUMN IF NOT EXISTS kol_avatar_url text,
  ADD COLUMN IF NOT EXISTS status varchar(20) DEFAULT 'pending' NOT NULL,
  ADD COLUMN IF NOT EXISTS feedback_text text DEFAULT '',
  ADD COLUMN IF NOT EXISTS actual_fee numeric(12,2);

-- ─── 4. 修改 insertion_orders ────────────────────────────────
ALTER TABLE insertion_orders
  ADD COLUMN IF NOT EXISTS title varchar(255),
  ADD COLUMN IF NOT EXISTS client_name varchar(200),
  ADD COLUMN IF NOT EXISTS project_name varchar(255),
  ADD COLUMN IF NOT EXISTS brand varchar(100),
  ADD COLUMN IF NOT EXISTS mcn_name varchar(100),
  ADD COLUMN IF NOT EXISTS industry varchar(100),
  ADD COLUMN IF NOT EXISTS industry_path varchar(200),
  ADD COLUMN IF NOT EXISTS sales_owner varchar(100),
  ADD COLUMN IF NOT EXISTS kol_manager varchar(100),
  ADD COLUMN IF NOT EXISTS kol_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avg_rating numeric(4,2),
  ADD COLUMN IF NOT EXISTS avg_engagement_rate numeric(5,2),
  ADD COLUMN IF NOT EXISTS total_reach integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_engagement integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS document_url text,
  ADD COLUMN IF NOT EXISTS tax numeric(12,2),
  ADD COLUMN IF NOT EXISTS total_with_tax numeric(12,2),
  ADD COLUMN IF NOT EXISTS has_draft boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS has_official boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS collaborations jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS reports jsonb DEFAULT '[]';
-- proposal_id 原本是 NOT NULL，改為可 null
ALTER TABLE insertion_orders ALTER COLUMN proposal_id DROP NOT NULL;

-- ─── 5. 建立缺少的新表 ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS tag_catalog (
  id text PRIMARY KEY,
  name varchar(100) NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS brand_catalog (
  id text PRIMARY KEY,
  name varchar(200) NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS industry_catalog (
  id text PRIMARY KEY,
  name varchar(100) NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_catalog (
  id text PRIMARY KEY,
  name varchar(100) NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS team_members (
  id text PRIMARY KEY,
  name varchar(100) NOT NULL,
  email varchar(200) NOT NULL UNIQUE,
  role varchar(20) DEFAULT 'member' NOT NULL,
  "group" varchar(20) DEFAULT '其他' NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS system_preferences (
  id varchar(20) PRIMARY KEY DEFAULT 'default',
  currency varchar(10) DEFAULT 'TWD' NOT NULL,
  default_tax_rate numeric(5,2) DEFAULT 5 NOT NULL,
  default_report_lang varchar(20) DEFAULT 'zh-TW' NOT NULL,
  notify_email varchar(200) DEFAULT '' NOT NULL,
  ai_suggestions boolean DEFAULT true NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- ─── 6. 建立預設的 system_preferences 資料 ───────────────────
INSERT INTO system_preferences (id) VALUES ('default') ON CONFLICT DO NOTHING;
