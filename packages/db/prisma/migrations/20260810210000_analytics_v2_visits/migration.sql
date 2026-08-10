-- Visit-scoped analytics rows.
--
-- `hash` stops being unique: two logged-out people behind one NAT with the same
-- user-agent share it, and they must land on separate rows as soon as one of
-- them logs in. The dedup key becomes `visitKey` = sha256(hash | userId ?? "").
-- Existing rows are seeded with their own id (unique by construction); they are
-- pre-cutover dev rows and never need to match an incoming visit again.

DROP INDEX IF EXISTS "sessions_new_hash_key";

ALTER TABLE "sessions_new" ADD COLUMN "visitKey" TEXT;
UPDATE "sessions_new" SET "visitKey" = "id" WHERE "visitKey" IS NULL;
ALTER TABLE "sessions_new" ALTER COLUMN "visitKey" SET NOT NULL;

ALTER TABLE "sessions_new" ADD COLUMN "mergeCount" INTEGER NOT NULL DEFAULT 0;

-- The active venue moved to the event row (a multi-venue owner switches
-- mid-visit, so one value per visit was wrong).
ALTER TABLE "sessions_new" DROP COLUMN "restaurantId";
ALTER TABLE "events_new" ADD COLUMN "restaurantId" TEXT;

CREATE UNIQUE INDEX "sessions_new_visitKey_key" ON "sessions_new"("visitKey");
CREATE INDEX "sessions_new_hash_idx" ON "sessions_new"("hash");
CREATE INDEX "events_new_restaurantId_at_idx" ON "events_new"("restaurantId", "at");
