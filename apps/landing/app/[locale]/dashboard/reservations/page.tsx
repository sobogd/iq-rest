import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getReservations } from "../_lib/queries";
import { ReservationsPage } from "../_pages/reservations";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const reservations = await getReservations(companyId);

  return (
    <ReservationsPage
      initialReservations={reservations}
    />
  );
}
