import { requireAuth } from "../_lib/require-auth";
import { getReservations, getRestaurant, getTables } from "../_lib/queries";
import { ReservationsPage } from "../_pages/reservations";

export default async function Page() {
  const companyId = await requireAuth();

  const [reservations, restaurant, tables] = await Promise.all([
    getReservations(companyId),
    getRestaurant(companyId),
    getTables(companyId),
  ]);

  return (
    <ReservationsPage
      initialReservations={reservations}
      reservationsEnabled={restaurant?.reservationsEnabled ?? false}
      hasTables={tables.length > 0}
    />
  );
}
