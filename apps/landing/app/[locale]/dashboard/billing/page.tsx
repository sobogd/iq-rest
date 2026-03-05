import { cookies } from "next/headers";
import { requireAuth } from "../_lib/require-auth";
import { getSubscriptionStatus } from "../_lib/queries";
import { BillingPage } from "../_pages/billing";
import type { SupportedCurrency } from "@/lib/country-currency-map";

export default async function Page() {
  const companyId = await requireAuth();

  const [subscription, cookieStore] = await Promise.all([
    getSubscriptionStatus(companyId),
    cookies(),
  ]);

  const currency = (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

  return <BillingPage initialSubscription={subscription} currency={currency} />;
}
