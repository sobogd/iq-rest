import { createUrl } from "@/lib/dashboard-url";
import { pricing } from "@/lib/pricing";
import { LinkForward } from "./link-forward";
import type { LandingTexts } from "../types";

interface LandingPricingProps {
  texts: LandingTexts["pricing"];
  ctaText: string;
  microcopy: string;
  locale: string;
}

function formatEur(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function PriceDisplay({ amount, perMonth }: { amount: number; perMonth: string }) {
  const formatted = formatEur(amount);
  const sizeClass = formatted.length > 5 ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl";
  return (
    <div className="leading-none">
      <div className="flex items-baseline gap-1">
        <span className="text-base font-medium text-muted-foreground">€</span>
        <span className={`${sizeClass} font-medium tracking-tight leading-none`}>{formatted}</span>
      </div>
      <span className="text-sm text-muted-foreground mt-1.5 inline-block">{perMonth}</span>
    </div>
  );
}

export function LandingPricingLp({ texts, ctaText, microcopy, locale }: LandingPricingProps) {
  const plan = pricing.EUR.basic;
  const savings = formatEur(plan.monthly * 12 - plan.yearlyTotal);
  const trialHref = `${createUrl(locale)}&from=landing`;

  return (
    <div className="flex flex-col gap-4 items-center max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 leading-[1.15]">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-md lg:max-w-2xl mx-auto leading-snug">
            {texts.sub}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-md lg:max-w-2xl auto-rows-fr">
          <div className="flex flex-col justify-center text-start rounded-2xl border border-border bg-card p-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
              {texts.monthlyLabel}
            </p>
            <PriceDisplay amount={plan.monthly} perMonth={texts.perMonth} />
          </div>

          <div className="relative flex flex-col justify-center text-start rounded-2xl border border-primary/60 bg-primary/5 p-5">
            <span className="absolute -top-2 right-3 px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[9px] font-medium uppercase tracking-wider">
              {texts.saveBadge}
            </span>
            <p className="text-[10px] font-medium uppercase tracking-widest text-primary mb-3">
              {texts.yearlyLabel}
            </p>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              <PriceDisplay amount={plan.yearly} perMonth={texts.perMonth} />
              <div className="lg:text-end">
                <p className="text-xs text-muted-foreground mt-3 lg:mt-0">
                  {texts.billedAnnually.replace("{total}", `€${formatEur(plan.yearlyTotal)}`)}
                </p>
                <p className="text-xs text-emerald-500 font-medium mt-0.5">
                  {texts.youSave.replace("{amount}", `€${savings}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

      <div className="flex flex-col items-center mt-4">
        <LinkForward
          href={trialHref}
          trackEvent="land_pricing_cta_click"
          className="inline-flex w-full max-w-[14rem] items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all text-center leading-tight"
        >
          {ctaText}
        </LinkForward>
      </div>
    </div>
  );
}
