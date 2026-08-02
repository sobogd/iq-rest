"use client";

// billing-features-constructor — geo-currency "from {price}/mo" line for the
// pricing CTA block. Same data sources as the pricing quiz: the geo_currency
// cookie picks the currency, the live catalog comes from dashboard-api
// /api/pricing (DEFAULT_PRICING_CATALOG as SSR/offline fallback). The "from"
// price is the cheapest way to get the page's feature: base menu + the add-on,
// both at the yearly per-month rate, single restaurant, no volume discount.

import { useEffect, useState } from "react";
import { DEFAULT_PRICING_CATALOG, type PricingCatalog, type CurrencyPricing } from "@iq-rest/pricing";
import { dashboardApiBase } from "@/lib/dashboard-url";
import {
  formatMoney,
  readBillingCurrencyFromDocument,
  type SupportedCurrency,
} from "@/lib/country-currency-map";

export type PricingAddon = "reservations" | "ordersKds" | "domain" | null;

export function FromPrice({ addon, template }: { addon: PricingAddon; template: string }) {
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");
  const [catalog, setCatalog] = useState<PricingCatalog>(DEFAULT_PRICING_CATALOG);

  useEffect(() => setCurrency(readBillingCurrencyFromDocument()), []);
  useEffect(() => {
    let alive = true;
    fetch(`${dashboardApiBase()}/api/pricing`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => alive && c?.currencies && setCatalog(c as PricingCatalog))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  const pricing: CurrencyPricing = catalog.currencies[currency] ?? catalog.currencies.EUR;
  const amount = pricing.menu.yr + (addon ? pricing[addon].yr : 0);
  const price = formatMoney(amount, currency);

  return (
    <div className="text-sm sm:text-base font-medium text-primary tabular-nums">
      {template.replace("{price}", price)}
    </div>
  );
}
