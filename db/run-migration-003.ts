import { db } from "../app/lib/db.server";
import { sql } from "drizzle-orm";

async function run() {
  await db.execute(sql`ALTER TABLE proposals ADD COLUMN IF NOT EXISTS creator_id text REFERENCES team_members(id) ON DELETE SET NULL`);
  console.log("✓ Added creator_id to proposals");

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS proposal_permissions (
      id text PRIMARY KEY NOT NULL,
      proposal_id text NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
      department varchar(20) NOT NULL,
      permission_level varchar(10) NOT NULL,
      created_at timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT uq_proposal_permission_dept UNIQUE (proposal_id, department)
    )
  `);
  console.log("✓ Created proposal_permissions table");
}

run().catch(console.error).finally(() => process.exit(0));
