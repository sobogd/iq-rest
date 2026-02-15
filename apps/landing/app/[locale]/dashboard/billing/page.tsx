import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getSubscriptionStatus } from "../_lib/queries";
import { BillingPage } from "../_pages/billing";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const subscription = await getSubscriptionStatus(companyId);

  return <BillingPage initialSubscription={subscription} />;
}
