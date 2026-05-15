import { requireAuth } from "../_lib/require-auth";
import { getSubscriptionStatus } from "../_lib/queries";
import { UpgradePage } from "../_pages/upgrade";

export default async function Page() {
  const companyId = await requireAuth();
  const subscription = await getSubscriptionStatus(companyId);

  return <UpgradePage initialSubscription={subscription} currency="EUR" />;
}
