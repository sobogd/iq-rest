import { requireAuth } from "../_lib/require-auth";
import { getRestaurant, getSubscriptionStatus } from "../_lib/queries";
import { SettingsPage } from "../_pages/settings";

export default async function Page() {
  const companyId = await requireAuth();

  const [restaurant, subscription] = await Promise.all([
    getRestaurant(companyId),
    getSubscriptionStatus(companyId),
  ]);

  return <SettingsPage initialRestaurant={restaurant} initialSubscription={subscription} />;
}
