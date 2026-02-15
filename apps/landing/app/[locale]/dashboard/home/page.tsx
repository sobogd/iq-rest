import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getRestaurant, checkIsAdmin } from "../_lib/queries";
import { DashboardHome } from "../_pages/home";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [restaurant, isAdmin] = await Promise.all([
    getRestaurant(companyId),
    checkIsAdmin(),
  ]);

  return <DashboardHome slug={restaurant?.slug ?? null} isAdmin={isAdmin} />;
}
