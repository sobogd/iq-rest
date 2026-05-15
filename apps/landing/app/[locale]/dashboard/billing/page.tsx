import { requireAuth } from "../_lib/require-auth";
import { getSubscriptionStatus } from "../_lib/queries";
import { BillingPage } from "../_pages/billing";

export default async function Page() {
  const companyId = await requireAuth();
  const subscription = await getSubscriptionStatus(companyId);

  return (
    <BillingPage
      initialSubscription={subscription}
      currency="EUR"
      trialEndsAt={subscription?.trialEndsAt ?? null}
    />
  );
}
