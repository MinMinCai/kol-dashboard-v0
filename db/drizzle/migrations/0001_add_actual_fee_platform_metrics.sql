-- Add actual_fee to proposal_kols
ALTER TABLE "proposal_kols" ADD COLUMN IF NOT EXISTS "actual_fee" numeric(12, 2);

-- Add platform_metrics to kols (stores per-platform audience metrics and price trends)
ALTER TABLE "kols" ADD COLUMN IF NOT EXISTS "platform_metrics" jsonb;
