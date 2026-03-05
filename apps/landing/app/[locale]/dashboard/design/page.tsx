import { requireAuth } from "../_lib/require-auth";
import { getRestaurant, getSubscriptionStatus, checkIsAdmin } from "../_lib/queries";
import { DesignPage } from "../_pages/design";

export default async function Page() {
  const companyId = await requireAuth();

  const [restaurant, subscription, isAdmin] = await Promise.all([
    getRestaurant(companyId),
    getSubscriptionStatus(companyId),
    checkIsAdmin(),
  ]);

  return (
    <DesignPage
      initialRestaurant={restaurant}
      plan={subscription?.plan ?? "FREE"}
      isAdmin={isAdmin}
    />
  );
}
