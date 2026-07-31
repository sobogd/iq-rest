"use client";

// billing-features-constructor — landing "build your plan" quiz.
//
// Interactive price estimator: pick how many restaurants + which features →
// live price computed from the SAME catalog the dashboard/checkout use
// (dashboard-api /api/pricing, single source of truth). English-only for now.
// The CTA hands off to the dashboard (checkout happens there).

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_PRICING_CATALOG,
  computeAccountQuote,
  type PricingCatalog,
  type VenueSelection,
} from "@iq-rest/pricing";
import { dashboardApiBase } from "@/lib/dashboard-url";
import {
  currencyInfo,
  formatMoney,
  readBillingCurrencyFromDocument,
  type SupportedCurrency,
} from "@/lib/country-currency-map";
import { usePrimaryCta } from "./onboarding/use-primary-cta";

type Cycle = "month" | "year";

const FEATURES: { key: keyof Omit<VenueSelection, "menuOnline">; label: string; hint: string }[] = [
  { key: "reservations", label: "Reservations", hint: "Take table bookings" },
  { key: "ordersKds", label: "Orders + Kitchen display", hint: "In-venue orders & KDS screens" },
  { key: "domain", label: "Custom domain", hint: "Your own web address" },
];

export function PricingQuiz({ ctaText }: { ctaText: string }) {
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");
  const [catalog, setCatalog] = useState<PricingCatalog>(DEFAULT_PRICING_CATALOG);
  const [count, setCount] = useState(1);
  const [cycle, setCycle] = useState<Cycle>("year");
  const [feat, setFeat] = useState<Omit<VenueSelection, "menuOnline">>({
    reservations: false,
    ordersKds: false,
    domain: false,
  });
  const cta = usePrimaryCta(ctaText);

  useEffect(() => setCurrency(readBillingCurrencyFromDocument()), []);

  // Pull the live catalog (public endpoint). Fall back to the built-in default.
  useEffect(() => {
    let alive = true;
    fetch(`${dashboardApiBase()}/api/pricing`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => {
        if (alive && c && c.currencies) setCatalog(c as PricingCatalog);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  const quote = useMemo(() => {
    const sel: VenueSelection = { menuOnline: true, ...feat };
    const venues = Array.from({ length: Math.max(1, count) }, () => sel);
    return computeAccountQuote(catalog, currency, venues, cycle);
  }, [catalog, currency, count, cycle, feat]);

  const info = currencyInfo[currency] ?? currencyInfo.EUR;
  const priceStr = formatMoney(quote.amountMajor, currency);
  const perLabel = cycle === "year" ? "/year" : "/month";
  const discountPct = Math.round(quote.discount * 100);

  return (
    <div className="mx-auto max-w-3xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-3 leading-[1.15]">
          Build your plan
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-snug">
          Pay only for what you use — pick your restaurants and features.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col gap-6">
        {/* Restaurants */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-foreground">Restaurants</div>
            <div className="text-xs text-muted-foreground">Volume discount from 2+</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Fewer restaurants"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              className="h-9 w-9 rounded-lg border border-input text-lg leading-none"
            >
              −
            </button>
            <span className="w-8 text-center text-lg font-medium tabular-nums">{count}</span>
            <button
              type="button"
              aria-label="More restaurants"
              onClick={() => setCount((c) => Math.min(99, c + 1))}
              className="h-9 w-9 rounded-lg border border-input text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-foreground">Features</div>
          <label className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 opacity-70">
            <input type="checkbox" checked disabled />
            <span className="text-sm">
              Digital menu <span className="text-muted-foreground">— always included</span>
            </span>
          </label>
          {FEATURES.map((f) => (
            <label
              key={f.key}
              className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 cursor-pointer hover:border-input transition-colors"
            >
              <input
                type="checkbox"
                checked={feat[f.key]}
                onChange={() => setFeat((s) => ({ ...s, [f.key]: !s[f.key] }))}
              />
              <span className="text-sm">
                {f.label} <span className="text-muted-foreground">— {f.hint}</span>
              </span>
            </label>
          ))}
        </div>

        {/* Cycle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCycle("month")}
            className={`flex-1 h-10 rounded-lg text-sm font-medium border transition-colors ${
              cycle === "month" ? "border-primary bg-primary/5 text-foreground" : "border-input text-muted-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("year")}
            className={`flex-1 h-10 rounded-lg text-sm font-medium border transition-colors ${
              cycle === "year" ? "border-primary bg-primary/5 text-foreground" : "border-input text-muted-foreground"
            }`}
          >
            Yearly <span className="text-emerald-500">· save more</span>
          </button>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between gap-4 border-t border-border pt-5">
          <div>
            <div className="flex items-baseline gap-1">
              {info.symbolPosition === "before" ? (
                <span className="text-base text-muted-foreground">{info.symbol}</span>
              ) : null}
              <span className="text-4xl font-medium tracking-tight tabular-nums">{priceStr}</span>
              {info.symbolPosition === "after" ? (
                <span className="text-base text-muted-foreground">{info.symbol}</span>
              ) : null}
              <span className="text-sm text-muted-foreground">{perLabel}</span>
            </div>
            {discountPct > 0 ? (
              <div className="text-xs text-emerald-500 font-medium mt-1">
                {discountPct}% volume discount · {quote.billingVenues} restaurants
              </div>
            ) : (
              <div className="text-xs text-muted-foreground mt-1">
                {cycle === "year" ? "Billed once a year" : "Billed monthly"}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => cta.onClick("l_pricing_quiz_cta")}
            className="inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all"
          >
            {cta.label}
          </button>
        </div>
      </div>
    </div>
  );
}
