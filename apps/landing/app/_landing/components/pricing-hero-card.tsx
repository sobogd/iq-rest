"use client";

// Pricing-page plan card. Rendered client-side so the price currency follows
// the geo_currency cookie WITHOUT forcing the (force-static) pricing pages to
// become dynamic. Prices flash EUR until hydration, then localize.
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { getPricing, type PlanId } from "@/lib/pricing";
import { currencyInfo, formatMoney, readBillingCurrencyFromDocument, type SupportedCurrency } from "@/lib/country-currency-map";
import { CtaButton } from "./cta-button";

interface PlanCardProps {
  name: string;
  tagline: string;
  planId: PlanId;
  features: readonly string[];
  popular?: boolean;
  popularBadge: string;
  perMonthSuffix: string;
  whenAnnualTemplate: string;
  orMonthlyTemplate: string;
  savingsTemplate: string;
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
  trackEvent: string;
}

export function PlanCard({
  name,
  tagline,
  planId,
  features,
  popular,
  popularBadge,
  perMonthSuffix,
  whenAnnualTemplate,
  orMonthlyTemplate,
  savingsTemplate,
  ctaText,
  microcopy,
  locale,
  trackEvent,
}: PlanCardProps) {
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");
  useEffect(() => setCurrency(readBillingCurrencyFromDocument()), []);

  const plan = getPricing(currency)[planId];
  const info = currencyInfo[currency];
  const yearlyNum = plan.yearly.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(plan.yearly) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  const savings = plan.monthly * 12 - plan.yearlyTotal;
  const annualLine = whenAnnualTemplate.replace("{total}", formatMoney(plan.yearlyTotal, currency));
  const monthlyParts = orMonthlyTemplate.split(`{price}`);
  const savingsLine = savingsTemplate.replace("{amount}", formatMoney(savings, currency));

  return (
    <div
      className={`relative rounded-lg border p-6 sm:p-7 flex flex-col gap-6 ${
        popular ? "border-primary/60 bg-primary/5" : "border-border bg-card"
      }`}
    >
      {popular ? (
        <span className="absolute -top-3 right-5 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-wider">
          {popularBadge}
        </span>
      ) : null}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{name}</p>
        <p className="text-base text-muted-foreground leading-snug">{tagline}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-1">
          {info.symbolPosition === "before" ? (
            <span className="text-xl font-medium text-muted-foreground">{info.symbol}</span>
          ) : null}
          <span className="text-4xl sm:text-5xl font-medium tracking-tight leading-none">{yearlyNum}</span>
          {info.symbolPosition === "after" ? (
            <span className="text-xl font-medium text-muted-foreground">{info.symbol}</span>
          ) : null}
          <span className="text-base text-muted-foreground ml-1">{perMonthSuffix}</span>
        </div>
        <p className="text-base text-muted-foreground">{annualLine}</p>
        <p className="text-base text-muted-foreground">
          {monthlyParts[0]}
          <span className="text-foreground">{formatMoney(plan.monthly, currency)}</span>
          {monthlyParts[1] ?? ""}
          {savings > 0 ? (
            <>
              {" "}
              <span className="text-primary font-medium">· {savingsLine}</span>
            </>
          ) : null}
        </p>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-base text-foreground/90 leading-snug">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <CtaButton text={ctaText} microcopy={microcopy} locale={locale} align="center" trackEvent={trackEvent} fullWidth />
    </div>
  );
}
