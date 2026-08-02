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
// Localized via `texts` (per-locale LandingTexts.pricingQuiz, EN fallback);
// min font size is text-sm (micro badges aside).

import { useEffect, useMemo, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check, Minus, Plus } from "lucide-react";
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
import { analytics } from "@/lib/analytics";
import type { PricingQuizTexts } from "../types";

type Cycle = "month" | "year";
type AddonKey = "reservations" | "ordersKds" | "domain";

export const EN_PRICING_QUIZ: PricingQuizTexts = {
  heading: "Build your plan",
  sub: "Pay only for what you use. Start with the menu and add what you need.",
  billingLabel: "Billing:",
  monthly: "Monthly",
  yearly: "Yearly",
  restaurantsLabel: "Restaurants:",
  fewerAria: "Fewer restaurants",
  moreAria: "More restaurants",
  menuTitle: "Digital menu",
  menuHint: "Always included",
  reservationsTitle: "Reservations",
  reservationsHint: "Table bookings",
  kdsTitle: "Kitchen display",
  kdsHint: "Orders on a kitchen screen",
  domainTitle: "Custom domain",
  domainHint: "Your own web address",
  perMonthSuffix: "/mo",
  perYearSuffix: "/year",
  perMonthLongSuffix: "/month",
  saveYearlyTemplate: "Save {amount} a year with yearly billing",
  volumeDiscountTemplate: "{percent}% volume discount · {count} restaurants",
  saveUpToHint: "Save up to 50% with 5+ restaurants",
  billedYearly: "Billed once a year",
  billedMonthly: "Billed monthly",
  enterprisePre: "Need a custom plan or more restaurants?",
  enterpriseCta: "Talk to us",
  enterprisePost: "and we'll tailor one for you.",
  enterpriseWa: "Hi! I'd like a custom plan for my restaurants.",
};

export function PricingQuiz({ ctaText, texts }: { ctaText: string; texts?: PricingQuizTexts }) {
  const t = texts ?? EN_PRICING_QUIZ;
  const ADDONS: { key: AddonKey; label: string; hint: string; Icon: typeof CalendarClock }[] = [
    { key: "reservations", label: t.reservationsTitle, hint: t.reservationsHint, Icon: CalendarClock },
    { key: "ordersKds", label: t.kdsTitle, hint: t.kdsHint, Icon: ChefHat },
    { key: "domain", label: t.domainTitle, hint: t.domainHint, Icon: Globe },
  ];
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

  const venues = useMemo<VenueSelection[]>(() => {
    const sel: VenueSelection = { menuOnline: true, ...feat };
    return Array.from({ length: Math.max(1, count) }, () => sel);
  }, [feat, count]);

  const quote = useMemo(
    () => computeAccountQuote(catalog, currency, venues, cycle),
    [catalog, currency, venues, cycle],
  );

  const info = currencyInfo[currency] ?? currencyInfo.EUR;
  const discountPct = Math.round(quote.discount * 100);
  const addonPrice = (key: AddonKey) => formatMoney(pricing[key][k], currency);

  // Yearly saving vs paying monthly (shown when Monthly is selected).
  const monthlyAnnual = useMemo(
    () => computeAccountQuote(catalog, currency, venues, "month").amountMajor * 12,
    [catalog, currency, venues],
  );
  const yearlyAnnual = useMemo(
    () => computeAccountQuote(catalog, currency, venues, "year").amountMajor,
    [catalog, currency, venues],
  );
  const yearlySaving = Math.max(0, Math.round((monthlyAnnual - yearlyAnnual) * 100) / 100);

  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-3">
          {t.heading}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-snug">
          {t.sub}
        </p>
      </div>

      {/* Controls — each field has its label to the LEFT. Centred (natural
          width) on mobile, stacked; inline on desktop. */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-8 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="shrink-0 text-sm text-muted-foreground">{t.billingLabel}</span>
          <div className="flex rounded-full border border-border bg-accent p-1">
            {(["month", "year"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  analytics.track(`l_pricing_cycle_${c}`);
                  setCycle(c);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  cycle === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {c === "month" ? t.monthly : t.yearly}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="shrink-0 text-sm text-muted-foreground">{t.restaurantsLabel}</span>
          <div className="flex items-center justify-between rounded-full border border-border bg-accent p-1">
            <button
              type="button"
              aria-label={t.fewerAria}
              onClick={() => {
                analytics.track("l_pricing_count_minus");
                setCount((c) => Math.max(1, c - 1));
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
              disabled={count <= 1}
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2.75} />
            </button>
            <span className="inline-block w-8 text-center text-sm font-medium text-foreground tabular-nums">{count}</span>
            <button
              type="button"
              aria-label={t.moreAria}
              onClick={() => {
                analytics.track("l_pricing_count_plus");
                setCount((c) => Math.min(99, c + 1));
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.75} />
            </button>
          </div>
        </div>
      </div>

      {/* Feature cards — 2 columns on mobile, 4 on desktop. No transform on
          select (only color/shadow) so tapping never shifts the layout. */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="relative flex flex-col items-start rounded-2xl border-2 border-primary bg-primary/5 shadow-sm p-4 sm:p-5">
          <UtensilsCrossed className="h-7 w-7 text-primary mb-3" />
          <div className="text-sm font-semibold text-foreground pr-6">{t.menuTitle}</div>
          <div className="block text-sm text-muted-foreground mt-0.5 leading-snug">{t.menuHint}</div>
          <div className="mt-3 text-sm font-medium text-primary tabular-nums">
            {formatMoney(pricing.menu[k], currency)}
            <span className="font-normal opacity-70">{t.perMonthSuffix}</span>
          </div>
        </div>

        {ADDONS.map(({ key, label, hint, Icon }) => {
          const on = feat[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                analytics.track(`l_pricing_addon_${key}_${on ? "off" : "on"}`);
                setFeat((s) => ({ ...s, [key]: !s[key] }));
              }}
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
              <div className="block text-sm text-muted-foreground mt-0.5 leading-snug">{hint}</div>
              <div className={`mt-3 text-sm font-medium tabular-nums ${on ? "text-primary" : "text-muted-foreground"}`}>
                +{addonPrice(key)}
                <span className="font-normal opacity-70">{t.perMonthSuffix}</span>
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
              <span className="text-3xl font-semibold tracking-tight tabular-nums">
                {quote.amountMajor.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(quote.amountMajor) ? 0 : 2, maximumFractionDigits: 2 })}
              </span>
              {info.symbolPosition === "after" ? <span className="text-lg text-muted-foreground">{info.symbol}</span> : null}
              <span className="text-sm text-muted-foreground">{cycle === "year" ? t.perYearSuffix : t.perMonthLongSuffix}</span>
            </div>
            <div className="text-sm mt-0.5 h-5 leading-5">
              {cycle === "month" && yearlySaving > 0 ? (
                <span className="text-emerald-500 font-medium">
                  {t.saveYearlyTemplate.replace("{amount}", formatMoney(yearlySaving, currency))}
                </span>
              ) : discountPct > 0 ? (
                <span className="text-emerald-500 font-medium">
                  {t.volumeDiscountTemplate
                    .replace("{percent}", String(discountPct))
                    .replace("{count}", String(quote.billingVenues))}
                </span>
              ) : count === 1 ? (
                <span className="text-muted-foreground">{t.saveUpToHint}</span>
              ) : (
                <span className="text-muted-foreground">{cycle === "year" ? t.billedYearly : t.billedMonthly}</span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => cta.onClick("l_pricing_quiz_cta")}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center h-11 px-6 text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight whitespace-nowrap"
          >
            {cta.label}
          </button>
        </div>
      </div>
    </div>
  );
}
