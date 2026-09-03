-- Ad-conversion reporting (Meta CAPI / Google Ads) is removed from the
-- analytics-v2 pipeline: campaigns are paused and conversion tracking will be
-- redesigned later as a separate, non-analytics flow.
DROP TABLE IF EXISTS "conversion_sends_new";

DROP INDEX IF EXISTS "sessions_new_atype_firstAt_idx";

ALTER TABLE "sessions_new"
  DROP COLUMN IF EXISTS "aid",
  DROP COLUMN IF EXISTS "atype",
  DROP COLUMN IF EXISTS "aidField",
  DROP COLUMN IF EXISTS "clickAt";
