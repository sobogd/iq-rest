import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getOrders } from "../_lib/queries";
import { OrdersPage } from "../_pages/orders";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const orders = await getOrders(companyId);

  return <OrdersPage initialOrders={orders} />;
}
