import { requireAuth } from "../_lib/require-auth";
import { getRestaurant } from "../_lib/queries";
import { ReservationSettingsPage } from "../_pages/reservation-settings";

export default async function Page() {
  const companyId = await requireAuth();

  const restaurant = await getRestaurant(companyId);

  return (
    <ReservationSettingsPage
      initialRestaurant={restaurant}
    />
  );
}
