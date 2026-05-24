import { Check } from "lucide-react";
import { pricing } from "@/lib/pricing";
import { CtaButton } from "./cta-button";
import type { LandingTexts } from "../types";

type PricingHeroTexts = NonNullable<LandingTexts["pricingHero"]>;

interface PricingHeroProps {
  locale: string;
  ctaText: string;
  demoText: string;
  microcopy: string;
  texts: PricingHeroTexts;
  trackPrefix?: string;
}

interface PlanCardProps {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  yearlyTotal: number;
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

function formatEur(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function PlanCard({
  name,
  tagline,
  monthly,
  yearly,
  yearlyTotal,
  features,
  popular,
  popularBadge,
  perMonthSuffix,
  whenAnnualTemplate,
  orMonthlyTemplate,
  savingsTemplate,
  ctaText,
  demoText,
  microcopy,
  locale,
  trackEvent,
}: PlanCardProps) {
  const savings = monthly * 12 - yearlyTotal;
  const annualLine = whenAnnualTemplate.replace("{total}", formatEur(yearlyTotal));
  // Split on the bare `{price}` placeholder so the currency symbol can sit
  // either before the number (en/ru: `€{price}`) or after it
  // (es/it/fr/de etc: `{price} €`) — only the number gets the foreground
  // highlight; the surrounding glyphs stay in the template.
  const monthlyParts = orMonthlyTemplate.split(`{price}`);
  const savingsLine = savingsTemplate.replace("{amount}", formatEur(savings));

  return (
    <div
      className={`relative rounded-2xl border p-6 sm:p-7 flex flex-col gap-6 ${
        popular ? "border-primary/60 bg-primary/5" : "border-border bg-card"
      }`}
    >
      {popular ? (
        <span className="absolute -top-3 right-5 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-wider">
          {popularBadge}
        </span>
      ) : null}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {name}
        </p>
        <p className="text-base text-muted-foreground leading-snug">{tagline}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-medium text-muted-foreground">€</span>
          <span className="text-4xl sm:text-5xl font-medium tracking-tight leading-none">
            {formatEur(yearly)}
          </span>
          <span className="text-base text-muted-foreground ml-1">{perMonthSuffix}</span>
        </div>
        <p className="text-base text-muted-foreground">{annualLine}</p>
        <p className="text-base text-muted-foreground">
          {monthlyParts[0]}
          <span className="text-foreground">{formatEur(monthly)}</span>
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
          <li
            key={f}
            className="flex items-start gap-2 text-base text-foreground/90 leading-snug"
          >
            <Check
              className="h-5 w-5 text-primary shrink-0 mt-0.5"
              strokeWidth={2.5}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <CtaButton
        text={ctaText}
        microcopy={microcopy}
        locale={locale}
        align="center"
        trackEvent={trackEvent}
        fullWidth
      />
    </div>
  );
}

export function PricingHero({
  locale,
  ctaText,
  demoText,
  microcopy,
  texts,
  trackPrefix = "l_pricing",
}: PricingHeroProps) {
  const basic = pricing.EUR.basic;
  const pro = pricing.EUR.pro;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-10 sm:gap-14">
      <div className="flex flex-col items-center text-center w-full">
        <div className="flex flex-row flex-wrap items-center justify-center gap-1.5 mb-5">
          {texts.chips.map((v) => (
            <span
              key={v}
              className="inline-flex items-center h-7 leading-none text-[11px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3"
            >
              {v}
            </span>
          ))}
        </div>

        <h2 className="text-4xl sm:text-[2.625rem] lg:text-[3.25rem] xl:text-[3.5rem] font-medium tracking-tight leading-[1.05] mb-5">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 leading-snug">
          {texts.sub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[924px] text-start">
        <PlanCard
          name={texts.plans.basic.name}
          tagline={texts.plans.basic.tagline}
          monthly={basic.monthly}
          yearly={basic.yearly}
          yearlyTotal={basic.yearlyTotal}
          features={texts.plans.basic.features}
          popularBadge={texts.popularBadge}
          perMonthSuffix={texts.perMonthSuffix}
          whenAnnualTemplate={texts.whenAnnualTemplate}
          orMonthlyTemplate={texts.orMonthlyTemplate}
          savingsTemplate={texts.savingsTemplate}
          ctaText={ctaText}
          demoText={demoText}
          microcopy={microcopy}
          locale={locale}
          trackEvent={`${trackPrefix}_basic_cta_click`}
        />

        <PlanCard
          name={texts.plans.pro.name}
          tagline={texts.plans.pro.tagline}
          monthly={pro.monthly}
          yearly={pro.yearly}
          yearlyTotal={pro.yearlyTotal}
          features={texts.plans.pro.features}
          popular
          popularBadge={texts.popularBadge}
          perMonthSuffix={texts.perMonthSuffix}
          whenAnnualTemplate={texts.whenAnnualTemplate}
          orMonthlyTemplate={texts.orMonthlyTemplate}
          savingsTemplate={texts.savingsTemplate}
          ctaText={ctaText}
          demoText={demoText}
          microcopy={microcopy}
          locale={locale}
          trackEvent={`${trackPrefix}_pro_cta_click`}
        />
      </div>
    </div>
  );
}
