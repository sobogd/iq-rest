import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getUserCompanyId } from "@/lib/auth";
import { dashboardUrl } from "@/lib/dashboard-url";

/** Returns companyId or redirects to login */
export async function requireAuth(): Promise<string> {
  const companyId = await getUserCompanyId();
  if (!companyId) {
    const locale = await getLocale();
    redirect(dashboardUrl(`/${locale}/login`));
  }
  return companyId;
}
