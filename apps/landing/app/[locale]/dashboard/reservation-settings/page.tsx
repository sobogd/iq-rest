import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getRestaurant, getSubscriptionStatus } from "../_lib/queries";
import { ReservationSettingsPage } from "../_pages/reservation-settings";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

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
