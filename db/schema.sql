-- KOL_DB initial schema (PostgreSQL)

create extension if not exists "uuid-ossp";

create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name varchar(200) not null,
  industry varchar(100),
  preferences jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists kols (
  id uuid primary key default uuid_generate_v4(),
  display_name varchar(150) not null,
  legal_name varchar(150),
  country varchar(80),
  city varchar(80),
  primary_language varchar(40),
  categories text[] default '{}',
  contact_email varchar(200),
  contact_phone varchar(50),
  base_price_min numeric(12,2),
  base_price_max numeric(12,2),
  status varchar(20) not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists kol_social_accounts (
  id uuid primary key default uuid_generate_v4(),
  kol_id uuid not null references kols(id) on delete cascade,
  platform varchar(30) not null,
  handle varchar(120) not null,
  profile_url text,
  followers int not null default 0,
  avg_views int,
  engagement_rate numeric(5,2),
  audience_profile jsonb default '{}'::jsonb,
  fetched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, handle)
);

create table if not exists proposals (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id),
  title varchar(255) not null,
  objective text,
  budget numeric(12,2),
  stage varchar(30) not null default 'draft',
  owner varchar(100),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists proposal_kols (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  kol_id uuid not null references kols(id),
  proposed_fee numeric(12,2),
  role varchar(100),
  reason text,
  created_at timestamptz not null default now(),
  unique (proposal_id, kol_id)
);

create table if not exists proposal_feedback (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  source varchar(20) not null, -- client / internal
  feedback_text text not null,
  decision varchar(20),
  created_by varchar(100),
  created_at timestamptz not null default now()
);

create table if not exists insertion_orders (
  id uuid primary key default uuid_generate_v4(),
  order_no varchar(50) not null unique,
  proposal_id uuid references proposals(id),
  client_id uuid not null references clients(id),
  status varchar(30) not null default 'created',
  total_budget numeric(12,2),
  start_date date,
  end_date date,
  contract_status varchar(30) not null default 'pending',
  invoice_status varchar(30) not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists io_tasks (
  id uuid primary key default uuid_generate_v4(),
  insertion_order_id uuid not null references insertion_orders(id) on delete cascade,
  kol_id uuid references kols(id),
  task_type varchar(40) not null, -- briefing/review/posting/reporting/payment
  task_status varchar(20) not null default 'todo',
  due_at timestamptz,
  completed_at timestamptz,
  owner varchar(100),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_performance (
  id uuid primary key default uuid_generate_v4(),
  insertion_order_id uuid not null references insertion_orders(id) on delete cascade,
  kol_id uuid references kols(id),
  platform varchar(30) not null,
  wave_no int not null default 1,
  content_url text,
  impressions int default 0,
  reach int default 0,
  views int default 0,
  likes int default 0,
  comments int default 0,
  shares int default 0,
  saves int default 0,
  clicks int default 0,
  ctr numeric(6,3),
  leads int default 0,
  purchases int default 0,
  revenue numeric(12,2),
  cost numeric(12,2),
  roas numeric(10,3),
  client_score numeric(4,2),
  team_score numeric(4,2),
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_reports (
  id uuid primary key default uuid_generate_v4(),
  report_type varchar(30) not null, -- proposal_summary / monthly / campaign_wrapup
  ref_table varchar(50) not null,
  ref_id uuid not null,
  prompt_version varchar(50),
  content_md text not null,
  created_by varchar(100),
  created_at timestamptz not null default now()
);

create index if not exists idx_kols_name on kols(display_name);
create index if not exists idx_kols_categories on kols using gin(categories);
create index if not exists idx_social_platform on kol_social_accounts(platform);
create index if not exists idx_proposals_stage on proposals(stage);
create index if not exists idx_io_status on insertion_orders(status);
create index if not exists idx_perf_io on campaign_performance(insertion_order_id);
create index if not exists idx_perf_kol on campaign_performance(kol_id);
