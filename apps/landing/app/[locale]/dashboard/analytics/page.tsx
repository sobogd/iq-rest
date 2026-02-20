import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserCompanyId } from "@/lib/auth";
import { getDashboardAnalytics } from "../_lib/queries";
import { AnalyticsPage } from "../_pages/analytics";
import { getTimezoneForCountry } from "@/lib/country-timezone-map";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const cookieStore = await cookies();
  const country = cookieStore.get("geo_country")?.value || "";
  const tz = getTimezoneForCountry(country);

  const data = await getDashboardAnalytics(companyId, tz);

  return <AnalyticsPage initialData={data} />;
}
