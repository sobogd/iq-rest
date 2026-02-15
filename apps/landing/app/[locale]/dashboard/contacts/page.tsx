import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getRestaurant } from "../_lib/queries";
import { ContactsPage } from "../_pages/contacts";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const restaurant = await getRestaurant(companyId);

  return <ContactsPage initialRestaurant={restaurant} />;
}
