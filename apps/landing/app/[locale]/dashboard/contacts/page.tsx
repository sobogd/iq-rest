import { requireAuth } from "../_lib/require-auth";
import { getRestaurant } from "../_lib/queries";
import { ContactsPage } from "../_pages/contacts";

export default async function Page() {
  const companyId = await requireAuth();

  const restaurant = await getRestaurant(companyId);

  return <ContactsPage initialRestaurant={restaurant} />;
}
