"use client";

// billing-features-constructor — landing "build your plan" (card-select).
//
// Tap-to-select feature cards. Layout is JUMP-FREE by construction:
//  · both card states use border-2 + no transform (only color/shadow change)
//  · the "Select everything" label never changes width
//  · the price bar stacks on mobile (price row, full-width CTA) so any magnitude
//    (€300 or €1,300 or 900,000 HUF) never collides with the button
//  · the sub-line under the price is ALWAYS rendered (fixed height) so it can't
//    push the layout when a discount appears
// Prices come from the same catalog as checkout (dashboard-api /api/pricing).
// English-only; min font size is text-sm (micro badges aside).

import { useEffect, useMemo, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check } from "lucide-react";
import {
  DEFAULT_PRICING_CATALOG,
  computeAccountQuote,
  type PricingCatalog,
  type CurrencyPricing,
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
type AddonKey = "reservations" | "ordersKds" | "domain";

const ADDONS: { key: AddonKey; label: string; hint: string; Icon: typeof CalendarClock }[] = [
  { key: "reservations", label: "Reservations", hint: "Table bookings", Icon: CalendarClock },
  { key: "ordersKds", label: "Orders + Kitchen", hint: "Orders & kitchen display", Icon: ChefHat },
  { key: "domain", label: "Custom domain", hint: "Your own web address", Icon: Globe },
];

export function PricingQuiz({ ctaText }: { ctaText: string }) {
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");
  const [catalog, setCatalog] = useState<PricingCatalog>(DEFAULT_PRICING_CATALOG);
  const [count, setCount] = useState(1);
  const [cycle, setCycle] = useState<Cycle>("year");
  const [feat, setFeat] = useState<Record<AddonKey, boolean>>({
    reservations: false,
    ordersKds: false,
    domain: false,
  });
  const cta = usePrimaryCta(ctaText);

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
  const k = cycle === "year" ? "yr" : "mo";

  const quote = useMemo(() => {
    const sel: VenueSelection = { menuOnline: true, ...feat };
    const venues = Array.from({ length: Math.max(1, count) }, () => sel);
    return computeAccountQuote(catalog, currency, venues, cycle);
  }, [catalog, currency, count, cycle, feat]);

  const info = currencyInfo[currency] ?? currencyInfo.EUR;
  const discountPct = Math.round(quote.discount * 100);
  const addonPrice = (key: AddonKey) => formatMoney(pricing[key][k], currency);

  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-3">
          Build your plan
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-snug">
          Pay only for what you use. Start with the menu and add what you need.
        </p>
      </div>

      {/* Controls — billing cycle + restaurants stepper on ONE row, each under a
          small muted caption. Stepper keeps exact count; its label truncates (…)
          when tight so it never wraps. */}
      <div className="flex items-end justify-center gap-3 mb-6">
        <div className="flex flex-1 sm:flex-none flex-col items-center gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Billing</span>
          <div className="flex w-full sm:w-auto rounded-full border border-border bg-card p-1">
            {(["month", "year"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  cycle === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {c === "month" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 sm:flex-none flex-col items-center gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Restaurants</span>
          <div className="flex w-full sm:w-auto items-center justify-between rounded-full border border-border bg-card p-1">
            <button
              type="button"
              aria-label="Fewer restaurants"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              className="h-8 w-8 shrink-0 rounded-full text-lg leading-none hover:bg-accent disabled:opacity-40"
              disabled={count <= 1}
            >
              −
            </button>
            <span className="flex-1 sm:flex-none sm:min-w-[2rem] text-center text-sm font-medium tabular-nums px-2">{count}</span>
            <button
              type="button"
              aria-label="More restaurants"
              onClick={() => setCount((c) => Math.min(99, c + 1))}
              className="h-8 w-8 shrink-0 rounded-full text-lg leading-none hover:bg-accent"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Feature cards — 2 columns on mobile, 4 on desktop. No transform on
          select (only color/shadow) so tapping never shifts the layout. */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="relative flex flex-col items-start rounded-2xl border-2 border-primary bg-primary/5 shadow-sm p-4 sm:p-5">
          <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
            <Check className="h-3.5 w-3.5" />
          </span>
          <UtensilsCrossed className="h-7 w-7 text-primary mb-3" />
          <div className="text-sm font-semibold text-foreground pr-6">Digital menu</div>
          <div className="hidden sm:block text-sm text-muted-foreground mt-0.5 leading-snug">Always included</div>
          <div className="mt-3 text-sm font-medium text-primary tabular-nums">
            {formatMoney(pricing.menu[k], currency)}
            <span className="font-normal opacity-70">/mo</span>
          </div>
        </div>

        {ADDONS.map(({ key, label, hint, Icon }) => {
          const on = feat[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFeat((s) => ({ ...s, [key]: !s[key] }))}
              className={`relative flex flex-col items-start text-left rounded-2xl border-2 p-4 sm:p-5 transition-colors ${
                on ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-input"
              }`}
            >
              <span
                className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  on ? "border-primary bg-primary text-primary-foreground" : "border-input"
                }`}
              >
                {on ? <Check className="h-3.5 w-3.5" /> : null}
              </span>
              <Icon className={`h-7 w-7 mb-3 ${on ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-sm font-semibold text-foreground pr-6">{label}</div>
              <div className="hidden sm:block text-sm text-muted-foreground mt-0.5 leading-snug">{hint}</div>
              <div className={`mt-3 text-sm font-medium tabular-nums ${on ? "text-primary" : "text-muted-foreground"}`}>
                +{addonPrice(key)}
                <span className="font-normal opacity-70">/mo</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Price bar — inline (not sticky) so it never covers the cards on mobile.
          Stacks on phones so any price magnitude fits; sub-line has a fixed
          height so a discount appearing can't shift the layout. */}
      <div className="mt-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
          <div className="min-w-0 sm:flex-1">
            <div className="flex items-baseline gap-1 whitespace-nowrap">
              {info.symbolPosition === "before" ? <span className="text-lg text-muted-foreground">{info.symbol}</span> : null}
              <span className="text-3xl font-semibold tracking-tight tabular-nums">{formatMoney(quote.amountMajor, currency)}</span>
              {info.symbolPosition === "after" ? <span className="text-lg text-muted-foreground">{info.symbol}</span> : null}
              <span className="text-sm text-muted-foreground">{cycle === "year" ? "/year" : "/month"}</span>
            </div>
            <div className="text-sm mt-0.5 h-5 leading-5">
              {discountPct > 0 ? (
                <span className="text-emerald-500 font-medium">
                  {discountPct}% volume discount · {quote.billingVenues} restaurants
                </span>
              ) : count === 1 ? (
                <span className="text-muted-foreground">Save up to 50% with 5+ restaurants</span>
              ) : (
                <span className="text-muted-foreground">{cycle === "year" ? "Billed once a year" : "Billed monthly"}</span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => cta.onClick("l_pricing_quiz_cta")}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center min-h-12 py-2.5 px-6 text-sm font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-colors"
          >
            {cta.label}
          </button>
        </div>
      </div>
    </div>
  );
}
