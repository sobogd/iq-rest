import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getReservations, getSubscriptionStatus } from "../_lib/queries";
import { ReservationsPage } from "../_pages/reservations";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [reservations, subscription] = await Promise.all([
    getReservations(companyId),
    getSubscriptionStatus(companyId),
  ]);

  return (
    <ReservationsPage
      initialReservations={reservations}
      initialSubscription={subscription}
    />
  );
}
