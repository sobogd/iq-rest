-- The rendered locale belongs on the event, not on the visit: one visit can
-- cross locales (the language prompt sends a visitor from /en to /es), so a
-- single per-visit value would silently describe only the first page.

ALTER TABLE "events_new" ADD COLUMN "locale" TEXT;
