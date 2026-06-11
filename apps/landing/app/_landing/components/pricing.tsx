"use client";

import { useEffect, useState } from "react";
import { getPricing } from "@/lib/pricing";
import { currencyInfo, formatMoney, readBillingCurrencyFromDocument, type SupportedCurrency } from "@/lib/country-currency-map";
import { usePrimaryCta } from "./onboarding/use-primary-cta";
import type { LandingTexts } from "../types";

interface LandingPricingProps {
  texts: LandingTexts["pricing"];
  ctaText: string;
  /** Kept for backwards compatibility; not rendered. */
  microcopy?: string;
  /** Kept for backwards compatibility; modal handles locale via NextIntl. */
  locale?: string;
}

function PriceDisplay({ amount, perMonth, currency }: { amount: number; perMonth: string; currency: SupportedCurrency }) {
  const info = currencyInfo[currency];
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  const sizeClass = formatted.length > 5 ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl";
  const symbol = <span className="text-base font-medium text-muted-foreground">{info.symbol}</span>;
  return (
    <div className="leading-none">
      <div className="flex items-baseline gap-1">
        {info.symbolPosition === "before" ? symbol : null}
        <span className={`${sizeClass} font-medium tracking-tight leading-none`}>{formatted}</span>
        {info.symbolPosition === "after" ? symbol : null}
      </div>
      <span className="text-sm text-muted-foreground mt-1.5 inline-block">{perMonth}</span>
    </div>
  );
}

export function LandingPricing({ texts, ctaText }: LandingPricingProps) {
  // Billing currency from the geo_currency cookie (EUR until hydrated).
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");
  useEffect(() => setCurrency(readBillingCurrencyFromDocument()), []);

  const plan = getPricing(currency).basic;
  const savings = formatMoney(plan.monthly * 12 - plan.yearlyTotal, currency);
  const cta = usePrimaryCta(ctaText);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
        <div className="text-center lg:text-start">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 leading-[1.15]">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0 leading-snug">
            {texts.sub}
          </p>

          <div className="hidden lg:flex flex-col items-start">
            <button
              type="button"
              onClick={() => cta.onClick("l_pricing_cta_click_desktop")}
              className="inline-flex w-full max-w-[14rem] items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all text-center leading-tight"
            >
              {cta.label}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full auto-rows-fr">
          <div className="flex flex-col justify-center text-start rounded-2xl border border-border bg-card p-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
              {texts.monthlyLabel}
            </p>
            <PriceDisplay amount={plan.monthly} perMonth={texts.perMonth} currency={currency} />
          </div>

          <div className="relative flex flex-col justify-center text-start rounded-2xl border border-primary/60 bg-primary/5 p-5">
            <span className="absolute -top-2 right-3 px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[9px] font-medium uppercase tracking-wider">
              {texts.saveBadge}
            </span>
            <p className="text-[10px] font-medium uppercase tracking-widest text-primary mb-3">
              {texts.yearlyLabel}
            </p>
            <PriceDisplay amount={plan.yearly} perMonth={texts.perMonth} currency={currency} />
            <p className="text-xs text-muted-foreground mt-3">
              {texts.billedAnnually.replace("{total}", formatMoney(plan.yearlyTotal, currency))}
            </p>
            <p className="text-xs text-emerald-500 font-medium mt-0.5">
              {texts.youSave.replace("{amount}", savings)}
            </p>
          </div>
        </div>

      <div className="flex lg:hidden flex-col items-center mt-4">
        <button
          type="button"
          onClick={() => cta.onClick("l_pricing_cta_click_mobile")}
          className="inline-flex w-full max-w-[14rem] items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all text-center leading-tight"
        >
          {cta.label}
        </button>
      </div>
    </div>
  );
}
