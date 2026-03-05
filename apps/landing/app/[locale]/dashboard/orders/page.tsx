import { requireAuth } from "../_lib/require-auth";
import { getOrders } from "../_lib/queries";
import { OrdersPage } from "../_pages/orders";

export default async function Page() {
  const companyId = await requireAuth();

  const orders = await getOrders(companyId);

  return <OrdersPage initialOrders={orders} />;
}
