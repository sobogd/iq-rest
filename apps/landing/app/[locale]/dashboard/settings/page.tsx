import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getRestaurant, getSubscriptionStatus } from "../_lib/queries";
import { SettingsPage } from "../_pages/settings";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [restaurant, subscription] = await Promise.all([
    getRestaurant(companyId),
    getSubscriptionStatus(companyId),
  ]);

  return <SettingsPage initialRestaurant={restaurant} initialSubscription={subscription} />;
}
