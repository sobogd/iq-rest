import { requireAuth } from "../_lib/require-auth";
import { getRestaurant } from "../_lib/queries";
import { OrderSettingsPage } from "../_pages/order-settings";

export default async function Page() {
  const companyId = await requireAuth();

  const restaurant = await getRestaurant(companyId);

  return (
    <OrderSettingsPage
      initialRestaurant={restaurant}
    />
  );
}
