import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { checkIsAdmin, getScanUsage } from "../_lib/queries";
import { DashboardHome } from "../_pages/home";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [isAdmin, scanUsage] = await Promise.all([
    checkIsAdmin(),
    getScanUsage(companyId),
  ]);

  return <DashboardHome isAdmin={isAdmin} scanUsage={scanUsage} />;
}
