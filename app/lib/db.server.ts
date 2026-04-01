import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../db/drizzle/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "[db.server] DATABASE_URL environment variable is not set. " +
    "Please configure it in Vercel Dashboard → Settings → Environment Variables."
  );
}

// Reuse connection across HMR reloads in dev to avoid exhausting Supabase connection limits.
// In production each worker process creates one pool.
declare global {
  // eslint-disable-next-line no-var
  var __dbClient: ReturnType<typeof postgres> | undefined;
}

const client =
  global.__dbClient ??
  postgres(process.env.DATABASE_URL, {
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
    // Required for Supabase pgBouncer (Transaction Mode, port 6543)
    // Also needed when DATABASE_URL uses port 6543
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbClient = client;
}

export const db = drizzle(client, { schema });
