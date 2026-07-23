-- Public-menu hero logo + independent element visibility.
-- logoUrl/hideLogo/logoScale: restaurant logo shown on the hero (above or
-- instead of the name). hideDescription: description visibility decoupled
-- from hideTitle (which previously hid the whole title+description block).
ALTER TABLE "restaurants" ADD COLUMN "logoUrl" TEXT;
ALTER TABLE "restaurants" ADD COLUMN "hideLogo" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "restaurants" ADD COLUMN "logoScale" TEXT NOT NULL DEFAULT 'medium';
ALTER TABLE "restaurants" ADD COLUMN "hideDescription" BOOLEAN NOT NULL DEFAULT false;

-- Backfill: restaurants that hid the title had the whole block (incl. the
-- description) hidden — keep that behavior now that the flags are independent.
UPDATE "restaurants" SET "hideDescription" = true WHERE "hideTitle" = true;
