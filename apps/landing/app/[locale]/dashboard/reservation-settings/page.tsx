import { requireAuth } from "../_lib/require-auth";
import { getRestaurant, getSubscriptionStatus } from "../_lib/queries";
import { ReservationSettingsPage } from "../_pages/reservation-settings";

export default async function Page() {
  const companyId = await requireAuth();

  const [restaurant, subscription] = await Promise.all([
    getRestaurant(companyId),
    getSubscriptionStatus(companyId),
  ]);

  return (
    <ReservationSettingsPage
      initialRestaurant={restaurant}
      initialSubscription={subscription}
    />
  );
}
