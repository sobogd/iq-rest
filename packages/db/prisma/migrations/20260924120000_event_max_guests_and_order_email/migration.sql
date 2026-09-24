-- Event mode (seat-based, table-free bookings) gains a per-booking party cap.
-- Null = no limit; only read while reservationDates is non-empty.
ALTER TABLE "restaurants" ADD COLUMN "eventMaxGuestsPerBooking" INTEGER;

-- Optional diner email on orders, mirroring the existing contact fields. The
-- owner turns it on per venue to line an order up with a booking by hand.
ALTER TABLE "restaurants" ADD COLUMN "orderEmailEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "orders" ADD COLUMN "customerEmail" TEXT;
