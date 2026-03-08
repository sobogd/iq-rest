import { requireAuth } from "../_lib/require-auth";
import { getOrders, getRestaurant } from "../_lib/queries";
import { OrdersPage } from "../_pages/orders";

export default async function Page() {
  const companyId = await requireAuth();

  const [orders, restaurant] = await Promise.all([
    getOrders(companyId),
    getRestaurant(companyId),
  ]);

  return <OrdersPage initialOrders={orders} ordersEnabled={restaurant?.ordersEnabled ?? false} />;
}
