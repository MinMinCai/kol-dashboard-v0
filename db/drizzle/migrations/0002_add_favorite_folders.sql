ALTER TABLE "system_preferences" ADD COLUMN IF NOT EXISTS "favorite_folders" text[] DEFAULT '{}' NOT NULL;
