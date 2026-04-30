"use client";

import { Lock, Ban, Zap, Globe } from "lucide-react";
import { dashboardUrl } from "@/lib/dashboard-url";
import { pricing } from "@/lib/pricing";
import { currencyInfo, type SupportedCurrency } from "@/lib/country-currency-map";
import { analytics } from "@/lib/analytics";
import type { LandingTexts } from "../types";

interface LandingPricingProps {
  texts: LandingTexts["pricing"];
  ctaText: string;
  microcopy: string;
  locale: string;
  currency: SupportedCurrency;
}

function formatPrice(amount: number, currency: SupportedCurrency): string {
  const info = currencyInfo[currency];
  const formatted = amount
    .toLocaleString("en-US", {
      minimumFractionDigits: info.zeroDecimal ? 0 : Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: info.zeroDecimal ? 0 : 2,
    })
    .replace(/,/g, " ");
  return info.symbolPosition === "before"
    ? `${info.symbol}${formatted}`
    : `${formatted} ${info.symbol}`;
}

function formatPriceParts(amount: number, currency: SupportedCurrency) {
  const info = currencyInfo[currency];
  const formatted = amount
    .toLocaleString("en-US", {
      minimumFractionDigits: info.zeroDecimal ? 0 : Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: info.zeroDecimal ? 0 : 2,
    })
    .replace(/,/g, " ");
  return { symbol: info.symbol, amount: formatted, position: info.symbolPosition };
}

function PriceDisplay({ parts, perMonth }: { parts: ReturnType<typeof formatPriceParts>; perMonth: string }) {
  const len = parts.amount.length;
  const sizeClass = len > 5 ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl";
  return (
    <div className="leading-none">
      <div className="flex items-baseline gap-1">
        {parts.position === "before" && (
          <span className="text-base font-medium text-muted-foreground">{parts.symbol}</span>
        )}
        <span className={`${sizeClass} font-medium tracking-tight leading-none`}>{parts.amount}</span>
        {parts.position === "after" && (
          <span className="text-base font-medium text-muted-foreground">{parts.symbol}</span>
        )}
      </div>
      <span className="text-[11px] text-muted-foreground mt-1.5 inline-block">{perMonth}</span>
    </div>
  );
}

export function LandingPricing({ texts, ctaText, microcopy, locale, currency }: LandingPricingProps) {
  const plan = pricing[currency].basic;
  const monthlyParts = formatPriceParts(plan.monthly, currency);
  const yearlyParts = formatPriceParts(plan.yearly, currency);
  const savings = formatPrice(plan.monthly * 12 - plan.yearlyTotal, currency);
  const trialHref = `${dashboardUrl(`/${locale}/login`)}?from=landing`;

  const trustItems = [
    { Icon: Lock, label: texts.trust.secure },
    { Icon: Ban, label: texts.trust.noCommitment },
    { Icon: Zap, label: texts.trust.quick },
    { Icon: Globe, label: texts.trust.restaurants },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="text-center lg:text-start">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground mb-4">
            {texts.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 leading-[1.15]">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0 leading-snug">
            {texts.sub}
          </p>

          <div className="flex flex-col items-center lg:items-start">
            <a
              href={trialHref}
              onClick={() => analytics.track("land_pricing_cta_click")}
              className="inline-flex w-full max-w-[14rem] items-center justify-center h-11 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all"
            >
              {ctaText}
            </a>
            <p className="text-[11px] text-muted-foreground mt-2.5">{microcopy}</p>
          </div>

          <div className="hidden lg:flex flex-wrap gap-x-6 gap-y-2 mt-10">
            {trustItems.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full auto-rows-fr">
          <div className="flex flex-col justify-center text-start rounded-2xl border border-border bg-card p-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
              {texts.monthlyLabel}
            </p>
            <PriceDisplay parts={monthlyParts} perMonth={texts.perMonth} />
          </div>

          <div className="relative flex flex-col justify-center text-start rounded-2xl border border-primary/60 bg-primary/5 p-5">
            <span className="absolute -top-2 right-3 px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[9px] font-medium uppercase tracking-wider">
              {texts.saveBadge}
            </span>
            <p className="text-[10px] font-medium uppercase tracking-widest text-primary mb-3">
              {texts.yearlyLabel}
            </p>
            <PriceDisplay parts={yearlyParts} perMonth={texts.perMonth} />
            <p className="text-[11px] text-muted-foreground mt-3">
              {texts.billedAnnually.replace("{total}", formatPrice(plan.yearlyTotal, currency))}
            </p>
            <p className="text-[11px] text-emerald-500 font-medium mt-0.5">
              {texts.youSave.replace("{amount}", savings)}
            </p>
          </div>
        </div>

        <div className="flex lg:hidden flex-wrap gap-x-6 gap-y-2 justify-center">
          {trustItems.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
