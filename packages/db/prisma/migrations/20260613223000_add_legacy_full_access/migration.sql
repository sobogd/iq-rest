-- Grandfather flag: keep full PRO features (orders/kitchen/reservations) on a
-- restaurant regardless of plan. Defaults false; set true manually for the few
-- pre-PRO-gating BASIC venues that already rely on these features.
ALTER TABLE "restaurants" ADD COLUMN "legacyFullAccess" BOOLEAN NOT NULL DEFAULT false;
