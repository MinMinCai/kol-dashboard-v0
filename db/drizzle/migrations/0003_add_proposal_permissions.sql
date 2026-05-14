ALTER TABLE "proposals" ADD COLUMN IF NOT EXISTS "creator_id" text REFERENCES "team_members"("id") ON DELETE SET NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proposal_permissions" (
  "id" text PRIMARY KEY NOT NULL,
  "proposal_id" text NOT NULL REFERENCES "proposals"("id") ON DELETE CASCADE,
  "department" varchar(20) NOT NULL,
  "permission_level" varchar(10) NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "uq_proposal_permission_dept" UNIQUE ("proposal_id", "department")
);
