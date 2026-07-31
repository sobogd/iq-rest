-- Billing→Account cutover (Phase 4): billing state moved to Account + Subscription.
-- Drop the now-unused per-restaurant billing columns. `paymentProcessing`
-- (transient checkout spinner) stays. accountId becomes mandatory. The legacy
-- per-user Stripe customer moves to Account.stripeCustomerId.

ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "plan";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "billingCycle";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "subscriptionStatus";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "currentPeriodEnd";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "stripeSubscriptionId";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "stripeCustomerId";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "billingCurrency";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "trialEndsAt";
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "legacyFullAccess";

ALTER TABLE "restaurants" ALTER COLUMN "accountId" SET NOT NULL;

ALTER TABLE "users" DROP COLUMN IF EXISTS "stripeCustomerId";
