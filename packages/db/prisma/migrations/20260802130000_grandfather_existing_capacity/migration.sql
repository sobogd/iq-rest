-- Grandfather existing customers into the à-la-carte model (billing-features-constructor).
-- Two guarantees at cutover (owner-approved):
--   1. venueLimit = GREATEST(current limit, current venue count) per account — no
--      one loses the capacity they had. A PRO account keeps its 4 (the default);
--      an account that grew past 4 keeps its actual N and can re-add up to N.
--   2. Every venue of a PAYING account (subscription ACTIVE / PAST_DUE) is comped
--      via manualAccess=true, so collapsing many per-restaurant subscriptions into
--      ONE account subscription never darkens a venue. This is the multi-venue
--      BASIC case: the consolidated BASIC sub pins to a single venue
--      (appliesToRestaurantId), which would otherwise turn the owner's other
--      (previously paid) venues INACTIVE. Same price — the live Stripe
--      subscription is untouched; manualAccess only guarantees ACCESS. The
--      per-venue feature flags already backfilled by the feature-constructor
--      migration decide WHICH features each venue keeps (PRO → full, BASIC → menu).
--
-- Idempotent: GREATEST() never shrinks a limit; manualAccess=true is a no-op when
-- already set. Safe to re-run. MUST run AFTER accounts + subscriptions + the
-- restaurants.accountId backfill are populated (the account-consolidation step of
-- the billing→Account cutover). If accounts are not yet populated this is a
-- harmless no-op — re-run it once they are.

-- 1) Capacity: never below the account's current venue count (and never below the
--    default 4, which every account already carries).
UPDATE "accounts" a
SET "venueLimit" = GREATEST(a."venueLimit", cnt.n)
FROM (
  SELECT "accountId", COUNT(*)::int AS n
  FROM "restaurants"
  WHERE "accountId" IS NOT NULL
  GROUP BY "accountId"
) cnt
WHERE cnt."accountId" = a."id"
  AND cnt.n > a."venueLimit";

-- 2) Grandfather access for paying accounts: comp every current venue so none goes
--    dark under the single consolidated subscription (multi-venue BASIC especially).
UPDATE "restaurants" r
SET "manualAccess" = true
FROM "accounts" a
JOIN "subscriptions" s ON s."accountId" = a."id"
WHERE r."accountId" = a."id"
  AND s."status" IN ('ACTIVE', 'PAST_DUE')
  AND r."manualAccess" = false;
