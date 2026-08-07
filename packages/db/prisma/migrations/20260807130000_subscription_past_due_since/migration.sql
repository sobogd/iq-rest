-- Anchor the PAST_DUE grace window on the EXACT first failed-renewal date
-- instead of the interval-derived period-start heuristic. Nullable; set on the
-- first PAST_DUE transition (webhook + reconcile), cleared once payment
-- succeeds. Existing PAST_DUE rows are backfilled out-of-band from Stripe's
-- earliest open invoice; un-backfilled rows fall back to the heuristic.
ALTER TABLE "subscriptions" ADD COLUMN "pastDueSince" TIMESTAMP(3);
