import { requireAuth } from "../_lib/require-auth";
import { getRestaurant, getSubscriptionStatus } from "../_lib/queries";
import { DesignPage } from "../_pages/design";

export default async function Page() {
  const companyId = await requireAuth();

  const [restaurant, subscription] = await Promise.all([
    getRestaurant(companyId),
    getSubscriptionStatus(companyId),
  ]);

  return (
    <DesignPage
      initialRestaurant={restaurant}
      plan={subscription?.plan ?? "FREE"}
    />
  );
}
