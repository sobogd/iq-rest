-- The pre-v2 analytics pipeline is gone: usage_events (unified events),
-- capi_sends (Meta CAPI journal, lately repurposed as the lead-welcome
-- journal) and google_ads_sends (offline conversion journal). All rows were
-- archived offline on 2026-08-11 before this drop.
DROP TABLE IF EXISTS "usage_events";
DROP TABLE IF EXISTS "capi_sends";
DROP TABLE IF EXISTS "google_ads_sends";

-- Minimal replacement journal for the admin Leads page, which used to
-- piggyback on capi_sends (fbclid = 'leadgen:<id>'). Written on success only;
-- the unique leadgenId is the double-send guard.
CREATE TABLE "lead_welcome_sends" (
    "id" TEXT NOT NULL,
    "leadgenId" TEXT NOT NULL,
    "venueType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_welcome_sends_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "lead_welcome_sends_leadgenId_key" ON "lead_welcome_sends"("leadgenId");
