import { PlanCard } from "./pricing-hero-card";
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

export function PricingHero({
  locale,
  ctaText,
  demoText,
  microcopy,
  texts,
  trackPrefix = "l_pricing",
}: PricingHeroProps) {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-10 sm:gap-14">
      <div className="flex flex-col items-center text-center w-full">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mb-5">
          {texts.chips.map((v) => (
            <span
              key={v}
              className="text-[11px] lg:text-xs uppercase tracking-wider text-muted-foreground"
            >
              {v}
            </span>
          ))}
        </div>

        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] font-medium tracking-tight leading-[1.05] mb-5">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 leading-snug">
          {texts.sub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full text-start">
        <PlanCard
          name={texts.plans.basic.name}
          tagline={texts.plans.basic.tagline}
          planId="basic"
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
          planId="pro"
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
