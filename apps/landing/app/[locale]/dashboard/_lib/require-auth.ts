import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getUserCompanyId } from "@/lib/auth";

/** Returns companyId or redirects to login */
export async function requireAuth(): Promise<string> {
  const companyId = await getUserCompanyId();
  if (!companyId) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  return companyId;
}
// deploy trigger
