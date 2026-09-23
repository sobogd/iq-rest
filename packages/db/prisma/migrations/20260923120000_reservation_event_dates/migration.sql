-- Booking event mode: an explicit list of bookable dates per restaurant
-- ([{ date, from, to }]). Non-empty ⇒ the public booking flow offers ONLY these
-- dates and ignores the weekly reservationSchedule. Null / empty ⇒ weekly mode.
-- Additive + nullable, so it is safe to apply before the apps that read it.
-- Table name follows the model's @@map("restaurants").
ALTER TABLE "restaurants" ADD COLUMN "reservationDates" JSONB;
