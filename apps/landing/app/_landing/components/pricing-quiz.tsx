"use client";

// billing-features-constructor — landing "build your plan" (card-select).
//
// Tap-to-select feature cards (4 across on desktop, 1 column on mobile) with a
// live sticky price bar. Default shows the cheapest (menu-only) price so the
// number never sticker-shocks; the buyer builds up from there. Prices come from
// the SAME catalog as checkout (dashboard-api /api/pricing). English-only.

import { useEffect, useMemo, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check, Sparkles } from "lucide-react";
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
  { key: "reservations", label: "Reservations", hint: "Take table bookings", Icon: CalendarClock },
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
  const allOn = feat.reservations && feat.ordersKds && feat.domain;
  const discountPct = Math.round(quote.discount * 100);

  const priceNode = (
    <span className="inline-flex items-baseline gap-1">
      {info.symbolPosition === "before" ? <span className="text-lg text-muted-foreground">{info.symbol}</span> : null}
      <span className="text-4xl font-semibold tracking-tight tabular-nums">{formatMoney(quote.amountMajor, currency)}</span>
      {info.symbolPosition === "after" ? <span className="text-lg text-muted-foreground">{info.symbol}</span> : null}
      <span className="text-sm text-muted-foreground">{cycle === "year" ? "/year" : "/month"}</span>
    </span>
  );

  // Per-add-on contribution label (+€X/mo), reflecting the current cycle.
  const addonPrice = (key: AddonKey) => `+${formatMoney(pricing[key][k], currency)}${info.symbolPosition === "after" ? " " + info.symbol : ""}`;

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

      {/* Restaurants + everything + cycle */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2">
          <span className="text-sm text-muted-foreground">Restaurants</span>
          <button
            type="button"
            aria-label="Fewer"
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            className="h-7 w-7 rounded-full border border-input text-base leading-none hover:bg-accent"
          >
            −
          </button>
          <span className="w-6 text-center text-base font-semibold tabular-nums">{count}</span>
          <button
            type="button"
            aria-label="More"
            onClick={() => setCount((c) => Math.min(99, c + 1))}
            className="h-7 w-7 rounded-full border border-input text-base leading-none hover:bg-accent"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => setFeat({ reservations: !allOn, ordersKds: !allOn, domain: !allOn })}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
            allOn ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-input"
          }`}
        >
          <Sparkles className="h-4 w-4" /> {allOn ? "Everything selected" : "Select everything"}
        </button>

        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {(["month", "year"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCycle(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                cycle === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {c === "month" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Menu — always included */}
        <div className="relative flex flex-col items-start rounded-2xl border-2 border-border bg-card p-5">
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Included
          </span>
          <UtensilsCrossed className="h-7 w-7 text-primary mb-3" />
          <div className="text-sm font-semibold text-foreground">Digital menu</div>
          <div className="text-xs text-muted-foreground mt-0.5 leading-snug">QR menu diners scan &amp; browse</div>
          <div className="mt-3 text-sm font-medium text-foreground tabular-nums">
            {formatMoney(pricing.menu[k], currency)} {info.symbolPosition === "after" ? info.symbol : ""}
            <span className="text-xs text-muted-foreground font-normal">/mo</span>
          </div>
        </div>

        {/* Add-ons */}
        {ADDONS.map(({ key, label, hint, Icon }) => {
          const on = feat[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFeat((s) => ({ ...s, [key]: !s[key] }))}
              className={`relative flex flex-col items-start text-left rounded-2xl border-2 p-5 transition-all active:scale-[0.99] ${
                on
                  ? "border-primary bg-primary/5 shadow-sm -translate-y-0.5"
                  : "border-border bg-card hover:border-input hover:-translate-y-0.5"
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
              <div className="text-sm font-semibold text-foreground">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{hint}</div>
              <div className={`mt-3 text-sm font-medium tabular-nums ${on ? "text-primary" : "text-muted-foreground"}`}>
                {addonPrice(key)}
                <span className="text-xs font-normal opacity-70">/mo</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sticky price bar */}
      <div className="sticky bottom-4 z-20 mt-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/90 backdrop-blur px-5 py-4 shadow-lg">
          <div>
            {priceNode}
            <div className="text-xs mt-0.5">
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
            className="inline-flex items-center justify-center min-h-11 py-2.5 px-6 text-sm font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all whitespace-nowrap"
          >
            {cta.label}
          </button>
        </div>
      </div>
    </div>
  );
}
