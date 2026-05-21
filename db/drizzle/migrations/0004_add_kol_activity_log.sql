CREATE TABLE IF NOT EXISTS "kol_activity_log" (
  "id" text PRIMARY KEY NOT NULL,
  "kol_id" text,
  "kol_name" varchar(150) NOT NULL,
  "action" varchar(20) NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
