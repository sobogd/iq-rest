-- Retire the plan tier (PRO / BASIC / FREE). Billing is à-la-carte per-feature
-- now: access is gated purely on Subscription.status, and WHICH features a live
-- venue gets come from the Restaurant.feat* flags. `Subscription.plan`,
-- `Subscription.appliesToRestaurantId` (BASIC single-venue pinning),
-- `Restaurant.manualAccess`, `Restaurant.featAiUnlimited` and
-- `Account.legacyFullAccess` are all no longer read by the code.
--
-- ORDER MATTERS: the venueLimit backfill below reads `subscriptions.plan`, so it
-- MUST run before the column is dropped (it does — step 1 then step 2).

-- 1. Grandfathered BASIC accounts are single-venue by construction. The old gate
--    (isBasicActive + appliesToRestaurantId) only ever lit their one pinned
--    venue and never let them add more. The new status-only gate would treat an
--    ACTIVE BASIC sub as a full paying account (canAddVenue = paid && count <
--    venueLimit) and, with the default venueLimit of 4, hand them 3 free extra
--    venues. Pin venueLimit to the venues they actually hold so nothing leaks.
UPDATE "accounts" a
SET "venueLimit" = GREATEST(1, (SELECT count(*)::int FROM "restaurants" r WHERE r."accountId" = a."id"))
WHERE EXISTS (
  SELECT 1 FROM "subscriptions" s WHERE s."accountId" = a."id" AND s."plan" = 'BASIC'
);

-- 2. Drop the retired columns (IF EXISTS — prod schema drifted from the Prisma
--    history long ago; these are plain TEXT/BOOLEAN columns, never enums).
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "plan";
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "appliesToRestaurantId";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "manualAccess";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "featAiUnlimited";
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "legacyFullAccess";

-- 3. Drop the Plan enum type if it was ever materialised in this database (the
--    columns above were TEXT, so it usually was not — hence IF EXISTS).
DROP TYPE IF EXISTS "Plan";
