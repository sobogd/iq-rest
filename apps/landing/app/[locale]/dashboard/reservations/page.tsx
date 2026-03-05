import { requireAuth } from "../_lib/require-auth";
import { getReservations } from "../_lib/queries";
import { ReservationsPage } from "../_pages/reservations";

export default async function Page() {
  const companyId = await requireAuth();

  const reservations = await getReservations(companyId);

  return (
    <ReservationsPage
      initialReservations={reservations}
    />
  );
}
