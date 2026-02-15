import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getDashboardAnalytics } from "../_lib/queries";
import { AnalyticsPage } from "../_pages/analytics";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const data = await getDashboardAnalytics(companyId);

  return <AnalyticsPage initialData={data} />;
}
