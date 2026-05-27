import { config as loadEnv } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import postgres from "postgres";
import * as schema from "../../db/drizzle/schema";

const envLocalPath = resolve(process.cwd(), ".env.local");
const envPath = resolve(process.cwd(), ".env");

if (process.env.NODE_ENV !== "production" && existsSync(envLocalPath)) {
  loadEnv({ path: envLocalPath, override: true });
}

if (!process.env.DATABASE_URL && existsSync(envPath)) {
  loadEnv({ path: envPath, override: false });
}

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
    idle_timeout: 60,
    connect_timeout: 10,
    max_lifetime: 60 * 30,
    // Required for Supabase pgBouncer (Transaction Mode, port 6543)
    prepare: false,
    connection: {
      application_name: "kol-db-demo",
      statement_timeout: 8000,
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbClient = client;
}

export const db = drizzle(client, { schema });
