-- Journal of Google Ads offline (gclid) conversion uploads. Google analogue of
-- capi_sends: one row per (gclid, eventName) upload attempt; status="success"
-- blocks re-sending the same conversion for the same click.
CREATE TABLE "google_ads_sends" (
  "id" TEXT NOT NULL,
  "gclid" TEXT NOT NULL,
  "eventName" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "response" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "google_ads_sends_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "google_ads_sends_gclid_idx" ON "google_ads_sends"("gclid");
CREATE INDEX "google_ads_sends_gclid_eventName_status_idx" ON "google_ads_sends"("gclid", "eventName", "status");
