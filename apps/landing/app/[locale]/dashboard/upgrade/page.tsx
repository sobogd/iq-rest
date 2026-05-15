import { cookies } from "next/headers";
import { requireAuth } from "../_lib/require-auth";
import { getSubscriptionStatus } from "../_lib/queries";
import { UpgradePage } from "../_pages/upgrade";
import type { SupportedCurrency } from "@/lib/country-currency-map";

export default async function Page() {
  const companyId = await requireAuth();

  const [subscription, cookieStore] = await Promise.all([
    getSubscriptionStatus(companyId),
    cookies(),
  ]);

  const currency = (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

  return <UpgradePage initialSubscription={subscription} currency={currency} />;
}
