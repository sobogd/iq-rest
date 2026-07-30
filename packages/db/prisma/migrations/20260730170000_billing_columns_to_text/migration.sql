-- Convert the billing columns from the Plan/BillingCycle/SubscriptionStatus
-- enums to TEXT, matching the actual (long-drifted) prod column type. The
-- enum-typed schema made Prisma cast WHERE params to the enum, crashing every
-- filter with `operator does not exist: text = "Plan"`. Values keep using the
-- enum members as string literals; the enum TYPES remain declared in the schema
-- only as reusable TS types.
--
-- Safe no-op where a column is already TEXT (prod). `USING col::text` works for
-- both enum and text source types. Enum TYPES are intentionally NOT dropped.
ALTER TABLE "restaurants" ALTER COLUMN "plan" TYPE TEXT USING "plan"::text;
ALTER TABLE "restaurants" ALTER COLUMN "billingCycle" TYPE TEXT USING "billingCycle"::text;
ALTER TABLE "restaurants" ALTER COLUMN "subscriptionStatus" DROP DEFAULT;
ALTER TABLE "restaurants" ALTER COLUMN "subscriptionStatus" TYPE TEXT USING "subscriptionStatus"::text;
ALTER TABLE "restaurants" ALTER COLUMN "subscriptionStatus" SET DEFAULT 'INACTIVE';
