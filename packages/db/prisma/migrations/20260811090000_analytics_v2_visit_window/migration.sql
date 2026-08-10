-- A visit now ends after 30 minutes of silence instead of running until the
-- daily salt rotation, so one device produces several rows per day and the
-- ingest path looks up "the live visit for this hash" on every batch.
--
-- `hash` alone no longer covers that lookup — it must be filtered by `lastAt`
-- too — and the admin list sorts by `lastAt` over a 30-day window, which had no
-- index at all and re-sorted the whole window on every request.

DROP INDEX IF EXISTS "sessions_new_hash_idx";
CREATE INDEX "sessions_new_hash_lastAt_idx" ON "sessions_new"("hash", "lastAt");
CREATE INDEX "sessions_new_lastAt_idx" ON "sessions_new"("lastAt");
