import { db } from "../app/lib/db.server";
import { sql } from "drizzle-orm";

async function run() {
  // List proposals and team members
  const proposals = (await db.execute(sql`SELECT id, title, owner FROM proposals ORDER BY created_at LIMIT 20`)) as any[];
  const members = (await db.execute(sql`SELECT id, name, "group" FROM team_members ORDER BY created_at`)) as any[];

  console.log("\n=== Proposals ===");
  for (const p of proposals) {
    console.log(`  [${p.id}] ${p.title} (owner: ${p.owner})`);
  }
  console.log("\n=== Team Members ===");
  for (const m of members) {
    console.log(`  [${m.id}] ${m.name} dept: ${m.group}`);
  }

  const rows = proposals as { id: string; title: string }[];
  if (rows.length === 0) {
    console.log("No proposals found.");
    return;
  }

  // Set the first AE member as creator of the first 3 proposals
  const aeMembers = members.filter((m: any) => m.group === "AE");
  const kolMembers = members.filter((m: any) => m.group === "KOL");

  if (aeMembers.length > 0) {
    const creator = aeMembers[0];
    // Set creator for first 3 proposals
    for (let i = 0; i < Math.min(3, rows.length); i++) {
      await db.execute(sql`UPDATE proposals SET creator_id = ${creator.id} WHERE id = ${rows[i].id}`);
      console.log(`✓ Set creator of "${rows[i].title}" to ${creator.name} (AE)`);
    }

    // Proposal 1: AE=edit (creator dept, implicit), KOL=view
    await db.execute(sql`DELETE FROM proposal_permissions WHERE proposal_id = ${rows[0].id}`);
    await db.execute(sql`INSERT INTO proposal_permissions (id, proposal_id, department, permission_level) VALUES (gen_random_uuid(), ${rows[0].id}, 'AE', 'edit'), (gen_random_uuid(), ${rows[0].id}, 'KOL', 'view') ON CONFLICT DO NOTHING`);
    console.log(`✓ Permissions for "${rows[0].title}": AE=edit, KOL=view`);

    // Proposal 2: AE=edit (creator dept), Media=edit, Tech=view
    if (rows.length > 1) {
      await db.execute(sql`DELETE FROM proposal_permissions WHERE proposal_id = ${rows[1].id}`);
      await db.execute(sql`INSERT INTO proposal_permissions (id, proposal_id, department, permission_level) VALUES (gen_random_uuid(), ${rows[1].id}, 'AE', 'edit'), (gen_random_uuid(), ${rows[1].id}, 'Media', 'edit'), (gen_random_uuid(), ${rows[1].id}, 'Tech', 'view') ON CONFLICT DO NOTHING`);
      console.log(`✓ Permissions for "${rows[1].title}": AE=edit, Media=edit, Tech=view`);
    }

    // Proposal 3: no permissions (everyone can access)
    if (rows.length > 2) {
      await db.execute(sql`DELETE FROM proposal_permissions WHERE proposal_id = ${rows[2].id}`);
      console.log(`✓ Proposal "${rows[2].title}": no restrictions (all can access)`);
    }
  }

  // If there's a KOL member, make them creator of proposal 4
  if (kolMembers.length > 0 && rows.length > 3) {
    const creator = kolMembers[0];
    await db.execute(sql`UPDATE proposals SET creator_id = ${creator.id} WHERE id = ${rows[3].id}`);
    await db.execute(sql`DELETE FROM proposal_permissions WHERE proposal_id = ${rows[3].id}`);
    await db.execute(sql`INSERT INTO proposal_permissions (id, proposal_id, department, permission_level) VALUES (gen_random_uuid(), ${rows[3].id}, 'KOL', 'edit'), (gen_random_uuid(), ${rows[3].id}, 'AE', 'view') ON CONFLICT DO NOTHING`);
    console.log(`✓ Set creator of "${rows[3].title}" to ${creator.name} (KOL), AE=view`);
  }

  console.log("\nDone!");
}

run().catch(console.error).finally(() => process.exit(0));
