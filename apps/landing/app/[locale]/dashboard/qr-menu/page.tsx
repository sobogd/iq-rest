import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getRestaurant } from "../_lib/queries";
import { QrMenuPage } from "../_pages/qr-menu";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const restaurant = await getRestaurant(companyId);

  return <QrMenuPage initialSlug={restaurant?.slug ?? null} />;
}
