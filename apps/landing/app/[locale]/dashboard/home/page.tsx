import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getRestaurant, checkIsAdmin, getChecklistStatus, getScanUsage } from "../_lib/queries";
import { DashboardHome } from "../_pages/home";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [restaurant, isAdmin, checklist, scanUsage] = await Promise.all([
    getRestaurant(companyId),
    checkIsAdmin(),
    getChecklistStatus(companyId),
    getScanUsage(companyId),
  ]);

  return <DashboardHome slug={restaurant?.slug ?? null} isAdmin={isAdmin} checklist={checklist} scanUsage={scanUsage} />;
}
