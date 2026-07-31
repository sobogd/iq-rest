-- billing-features-constructor · Phase 1 (additive schema + backfill)
-- Adds per-restaurant feature flags, provider-agnostic ad-hoc pricing fields on
-- Subscription, and the PricingConfig / BillingProfile / Invoice tables.
-- Purely additive. Backfill mirrors the CURRENT plan so the Phase 2 resolver
-- flip is a zero-behavior-change (flags == today's derived caps).

-- ─── Restaurant feature flags ────────────────────────────────────────────────
ALTER TABLE "restaurants" ADD COLUMN "featMenuOnline"   BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "restaurants" ADD COLUMN "featOrders"       BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "restaurants" ADD COLUMN "featKds"          BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "restaurants" ADD COLUMN "featReservations" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "restaurants" ADD COLUMN "featCustomDomain" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "restaurants" ADD COLUMN "featAiUnlimited"  BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "restaurants" ADD COLUMN "manualAccess"     BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "restaurants" ADD COLUMN "customDomain"     TEXT;
CREATE UNIQUE INDEX "restaurants_customDomain_key" ON "restaurants"("customDomain");

-- ─── Subscription: provider-agnostic ad-hoc pricing ──────────────────────────
ALTER TABLE "subscriptions" ADD COLUMN "provider"        TEXT NOT NULL DEFAULT 'stripe';
ALTER TABLE "subscriptions" ADD COLUMN "amount"          INTEGER;
ALTER TABLE "subscriptions" ADD COLUMN "currency"        TEXT;
ALTER TABLE "subscriptions" ADD COLUMN "interval"        TEXT;
ALTER TABLE "subscriptions" ADD COLUMN "priceProvenance" TEXT;

-- ─── PricingConfig (singleton catalog) ───────────────────────────────────────
CREATE TABLE "pricing_config" (
    "id"        TEXT NOT NULL DEFAULT 'default',
    "data"      JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "pricing_config_pkey" PRIMARY KEY ("id")
);

-- ─── BillingProfile (payer legal data, all optional) ─────────────────────────
CREATE TABLE "billing_profiles" (
    "id"           TEXT NOT NULL,
    "accountId"    TEXT NOT NULL,
    "legalName"    TEXT,
    "taxId"        TEXT,
    "address"      TEXT,
    "billingEmail" TEXT,
    "updatedAt"    TIMESTAMP(3) NOT NULL,
    CONSTRAINT "billing_profiles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "billing_profiles_accountId_key" ON "billing_profiles"("accountId");
ALTER TABLE "billing_profiles" ADD CONSTRAINT "billing_profiles_accountId_fkey"
    FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── Invoice (manual, read-only for the customer) ────────────────────────────
CREATE TABLE "invoices" (
    "id"        TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "number"    TEXT,
    "issuedAt"  TIMESTAMP(3),
    "amount"    INTEGER,
    "currency"  TEXT,
    "fileUrl"   TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "invoices_accountId_idx" ON "invoices"("accountId");
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_accountId_fkey"
    FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── Backfill: mirror current plan → feature flags ───────────────────────────
-- Full-access venues get every feature (orders/kds/reservations). A venue is
-- full-access if its account has a PRO subscription (any status — an inactive PRO
-- venue stays gated at Phase 2's live "whether" check, so setting flags is
-- harmless and preserves grace/reactivation), OR the account trial is live, OR
-- the venue has a per-venue PRO override, OR the account is grandfathered.
UPDATE "restaurants" r
SET "featOrders" = true,
    "featKds" = true,
    "featReservations" = true
FROM "accounts" a
LEFT JOIN "subscriptions" s ON s."accountId" = a."id"
WHERE r."accountId" = a."id"
  AND (
        s."plan" = 'PRO'
     OR (a."trialEndsAt" IS NOT NULL AND a."trialEndsAt" > NOW())
     OR r."planOverride" = 'PRO'
     OR a."legacyFullAccess" = true
  );

-- aiUnlimited: PAID PRO / override / grandfather only — NOT trial (trial shares
-- the free image quota, matching TRIAL_PRO_CAPS).
UPDATE "restaurants" r
SET "featAiUnlimited" = true
FROM "accounts" a
LEFT JOIN "subscriptions" s ON s."accountId" = a."id"
WHERE r."accountId" = a."id"
  AND (
        s."plan" = 'PRO'
     OR r."planOverride" = 'PRO'
     OR a."legacyFullAccess" = true
  );

-- BASIC and inactive venues keep the column defaults (featMenuOnline=true, the
-- rest false) — which already equals BASIC_CAPS / (gated) INACTIVE_CAPS.

-- ─── Backfill: Subscription ad-hoc pricing fields from legacy billingCycle ────
UPDATE "subscriptions" s
SET "interval" = CASE s."billingCycle"
                   WHEN 'YEARLY' THEN 'year'
                   WHEN 'MONTHLY' THEN 'month'
                   ELSE NULL
                 END,
    "currency" = a."billingCurrency",
    "priceProvenance" = 'legacy'
FROM "accounts" a
WHERE s."accountId" = a."id" AND s."provider" = 'stripe';
