import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserCompanyId } from "@/lib/auth";
import { getSubscriptionStatus, checkIsAdmin } from "../_lib/queries";
import { UpgradePage } from "../_pages/upgrade";
import type { SupportedCurrency } from "@/lib/country-currency-map";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [subscription, isAdmin, cookieStore] = await Promise.all([
    getSubscriptionStatus(companyId),
    checkIsAdmin(),
    cookies(),
  ]);

  const currency = (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

  return <UpgradePage initialSubscription={subscription} isAdmin={isAdmin} currency={currency} />;
}
