"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Lock, Ban, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricing } from "@/lib/pricing";
import { currencyInfo, type SupportedCurrency } from "@/lib/country-currency-map";
import { analytics } from "@/lib/analytics";

interface PricingSectionProps {
  noIndex?: boolean;
  hideComparison?: boolean;
  hideButtons?: boolean;
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

  if (info.symbolPosition === "before") return `${info.symbol}${formatted}`;
  return `${formatted} ${info.symbol}`;
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
  const sizeClass = len > 5
    ? "text-2xl md:text-3xl"
    : len > 3
      ? "text-3xl md:text-4xl"
      : "text-4xl md:text-5xl";

  return (
    <div className="leading-none">
      <div className="flex items-baseline gap-1">
        {parts.position === "before" && (
          <span className="text-lg font-bold text-muted-foreground">{parts.symbol}</span>
        )}
        <span className={`${sizeClass} font-extrabold tracking-tighter leading-none`}>
          {parts.amount}
        </span>
        {parts.position === "after" && (
          <span className="text-lg font-bold text-muted-foreground">{parts.symbol}</span>
        )}
      </div>
      <span className="text-base text-muted-foreground font-medium mt-0.5 mb-2 inline-block">{perMonth}</span>
    </div>
  );
}

export function PricingSection({ noIndex = false, currency }: PricingSectionProps) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [selected, setSelected] = useState<"monthly" | "yearly">("yearly");

  const plan = pricing[currency].basic;
  const monthlyParts = formatPriceParts(plan.monthly, currency);
  const yearlyParts = formatPriceParts(plan.yearly, currency);
  const savings = formatPrice(plan.monthly * 12 - plan.yearlyTotal, currency);

  const handleCtaClick = () => {
    analytics.marketing.pricingCtaClick("basic");
  };

  const trustItems = [
    { icon: Lock, label: t("trustSecure") },
    { icon: Ban, label: t("trustNoLock") },
    { icon: Zap, label: t("trustQuick") },
    { icon: Globe, label: t("trustRestaurants") },
  ];

  const content = (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-base font-medium text-muted-foreground">
          {t("badge")}
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {t("heroTitle")}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {t("heroTitleAccent")}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base md:text-lg mx-auto">
          {t("heroSub")}
          <br />
          <span className="text-foreground font-semibold">{t("heroSub2")}</span>
        </p>
      </div>

      {/* Two selectable cards + one CTA below */}
      <div className="max-w-[540px] lg:max-w-fit mx-auto mt-10 space-y-6 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          {/* Monthly */}
          <button
            type="button"
            onClick={() => { setSelected("monthly"); analytics.marketing.pricingToggle("monthly"); }}
            className={cn(
              "relative flex flex-col lg:flex-row lg:items-center lg:gap-8 rounded-2xl border-2 p-5 lg:px-8 lg:py-5 text-left transition-all",
              selected === "monthly"
                ? "border-primary/60 bg-gradient-to-br from-primary/5 to-amber-400/5"
                : "border-border bg-card hover:border-muted-foreground/30"
            )}
          >
            <div className="shrink-0">
              <p className="text-base font-bold uppercase tracking-widest text-muted-foreground mb-3 lg:mb-1">
                {t("monthly")}
              </p>
              <PriceDisplay parts={monthlyParts} perMonth={t("perMonthFull")} />
            </div>
          </button>

          {/* Yearly */}
          <button
            type="button"
            onClick={() => { setSelected("yearly"); analytics.marketing.pricingToggle("yearly"); }}
            className={cn(
              "relative flex flex-col lg:flex-row lg:items-center lg:gap-8 rounded-2xl border-2 p-5 lg:px-8 lg:py-5 text-left transition-all",
              selected === "yearly"
                ? "border-primary/60 bg-gradient-to-br from-primary/5 to-amber-400/5"
                : "border-border bg-card hover:border-muted-foreground/30"
            )}
          >
            <div className="shrink-0">
              <p className="text-base font-bold uppercase tracking-widest text-primary mb-3 lg:mb-1">
                {t("yearly")}
              </p>
              <PriceDisplay parts={yearlyParts} perMonth={t("perMonthFull")} />
            </div>
            <div className="mt-2 lg:mt-0 lg:text-right min-w-0">
              <p className="text-base text-muted-foreground">
                {t("billedYearly", { total: formatPrice(plan.yearlyTotal, currency) })}
              </p>
              <p className="text-base text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                {t("youSave", { amount: savings })}
              </p>
            </div>
          </button>
        </div>

        {/* Single CTA */}
        <Button
          asChild
          className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg mx-auto"
        >
          <Link href="/login" onClick={handleCtaClick}>
            {t("trialCta")}
          </Link>
        </Button>

        <p className="text-base text-muted-foreground text-center">
          {t("trialSub")}
        </p>
      </div>

      {/* Trust badges */}
      <div className="max-w-[540px] md:max-w-[680px] mx-auto mt-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-base text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (noIndex) {
    return <div data-noindex="true">{content}</div>;
  }

  return content;
}
