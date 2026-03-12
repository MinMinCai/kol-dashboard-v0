CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_type" varchar(30) NOT NULL,
	"ref_table" varchar(50) NOT NULL,
	"ref_id" uuid NOT NULL,
	"prompt_version" varchar(50),
	"content_md" text NOT NULL,
	"created_by" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campaign_performance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"insertion_order_id" uuid NOT NULL,
	"kol_id" uuid,
	"platform" varchar(30) NOT NULL,
	"wave_no" integer DEFAULT 1 NOT NULL,
	"content_url" text,
	"impressions" integer DEFAULT 0,
	"reach" integer DEFAULT 0,
	"views" integer DEFAULT 0,
	"likes" integer DEFAULT 0,
	"comments" integer DEFAULT 0,
	"shares" integer DEFAULT 0,
	"saves" integer DEFAULT 0,
	"clicks" integer DEFAULT 0,
	"ctr" numeric(6, 3),
	"leads" integer DEFAULT 0,
	"purchases" integer DEFAULT 0,
	"revenue" numeric(12, 2),
	"cost" numeric(12, 2),
	"roas" numeric(10, 3),
	"client_score" numeric(4, 2),
	"team_score" numeric(4, 2),
	"recorded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"industry" varchar(100),
	"preferences" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insertion_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_no" varchar(50) NOT NULL,
	"proposal_id" uuid,
	"client_id" uuid NOT NULL,
	"status" varchar(30) DEFAULT 'created' NOT NULL,
	"total_budget" numeric(12, 2),
	"start_date" date,
	"end_date" date,
	"contract_status" varchar(30) DEFAULT 'pending' NOT NULL,
	"invoice_status" varchar(30) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "io_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"insertion_order_id" uuid NOT NULL,
	"kol_id" uuid,
	"task_type" varchar(40) NOT NULL,
	"task_status" varchar(20) DEFAULT 'todo' NOT NULL,
	"due_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"owner" varchar(100),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kol_social_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kol_id" uuid NOT NULL,
	"platform" varchar(30) NOT NULL,
	"handle" varchar(120) NOT NULL,
	"profile_url" text,
	"followers" integer DEFAULT 0 NOT NULL,
	"avg_views" integer,
	"engagement_rate" numeric(5, 2),
	"audience_profile" jsonb DEFAULT '{}'::jsonb,
	"fetched_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kols" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_name" varchar(150) NOT NULL,
	"legal_name" varchar(150),
	"country" varchar(80),
	"city" varchar(80),
	"primary_language" varchar(40),
	"categories" text[] DEFAULT '{}' NOT NULL,
	"contact_email" varchar(200),
	"contact_phone" varchar(50),
	"base_price_min" numeric(12, 2),
	"base_price_max" numeric(12, 2),
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposal_id" uuid NOT NULL,
	"source" varchar(20) NOT NULL,
	"feedback_text" text NOT NULL,
	"decision" varchar(20),
	"created_by" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_kols" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposal_id" uuid NOT NULL,
	"kol_id" uuid NOT NULL,
	"proposed_fee" numeric(12, 2),
	"role" varchar(100),
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"objective" text,
	"budget" numeric(12, 2),
	"stage" varchar(30) DEFAULT 'draft' NOT NULL,
	"owner" varchar(100),
	"due_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"role" varchar(20) DEFAULT 'member' NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_performance" ADD CONSTRAINT "campaign_performance_insertion_order_id_insertion_orders_id_fk" FOREIGN KEY ("insertion_order_id") REFERENCES "public"."insertion_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_performance" ADD CONSTRAINT "campaign_performance_kol_id_kols_id_fk" FOREIGN KEY ("kol_id") REFERENCES "public"."kols"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insertion_orders" ADD CONSTRAINT "insertion_orders_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insertion_orders" ADD CONSTRAINT "insertion_orders_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "io_tasks" ADD CONSTRAINT "io_tasks_insertion_order_id_insertion_orders_id_fk" FOREIGN KEY ("insertion_order_id") REFERENCES "public"."insertion_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "io_tasks" ADD CONSTRAINT "io_tasks_kol_id_kols_id_fk" FOREIGN KEY ("kol_id") REFERENCES "public"."kols"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kol_social_accounts" ADD CONSTRAINT "kol_social_accounts_kol_id_kols_id_fk" FOREIGN KEY ("kol_id") REFERENCES "public"."kols"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposal_feedback" ADD CONSTRAINT "proposal_feedback_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposal_kols" ADD CONSTRAINT "proposal_kols_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposal_kols" ADD CONSTRAINT "proposal_kols_kol_id_kols_id_fk" FOREIGN KEY ("kol_id") REFERENCES "public"."kols"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_perf_io" ON "campaign_performance" USING btree ("insertion_order_id");--> statement-breakpoint
CREATE INDEX "idx_perf_kol" ON "campaign_performance" USING btree ("kol_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_insertion_order_no" ON "insertion_orders" USING btree ("order_no");--> statement-breakpoint
CREATE INDEX "idx_io_status" ON "insertion_orders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_social_platform" ON "kol_social_accounts" USING btree ("platform");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_social_platform_handle" ON "kol_social_accounts" USING btree ("platform","handle");--> statement-breakpoint
CREATE INDEX "idx_kols_name" ON "kols" USING btree ("display_name");--> statement-breakpoint
CREATE INDEX "idx_kols_categories" ON "kols" USING btree ("categories");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_proposal_kol" ON "proposal_kols" USING btree ("proposal_id","kol_id");--> statement-breakpoint
CREATE INDEX "idx_proposals_stage" ON "proposals" USING btree ("stage");