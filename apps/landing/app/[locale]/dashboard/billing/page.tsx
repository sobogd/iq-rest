import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserCompanyId } from "@/lib/auth";
import { getSubscriptionStatus } from "../_lib/queries";
import { BillingPage } from "../_pages/billing";
import type { SupportedCurrency } from "@/lib/country-currency-map";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [subscription, cookieStore] = await Promise.all([
    getSubscriptionStatus(companyId),
    cookies(),
  ]);

  const currency = (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

  return <BillingPage initialSubscription={subscription} currency={currency} />;
}
