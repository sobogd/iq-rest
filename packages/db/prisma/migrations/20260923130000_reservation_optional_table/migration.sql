-- Event-mode reservations are seat-based: the venue accepts more bookings than
-- it has tables, so a booking may carry no table at all. Weekly-mode bookings
-- keep setting tableId as before.
ALTER TABLE "reservations" ALTER COLUMN "tableId" DROP NOT NULL;

-- Deleting a table must not delete bookings that were made without ever
-- referencing one. Replace the old CASCADE with SET NULL.
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_tableId_fkey";
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_tableId_fkey"
  FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
