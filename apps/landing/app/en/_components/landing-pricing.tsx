import { Lock, Ban, Zap, Globe } from "lucide-react";
import { pricing } from "@/lib/pricing";
import { currencyInfo, type SupportedCurrency } from "@/lib/country-currency-map";
import { dashboardUrl } from "@/lib/dashboard-url";

interface LandingPricingProps {
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

function PriceDisplay({ parts }: { parts: ReturnType<typeof formatPriceParts> }) {
  const len = parts.amount.length;
  const sizeClass =
    len > 5 ? "text-2xl md:text-3xl" : len > 3 ? "text-3xl md:text-4xl" : "text-3xl md:text-4xl";

  return (
    <div className="leading-none">
      <div className="flex items-baseline gap-1">
        {parts.position === "before" && (
          <span className="text-base font-medium text-muted-foreground">{parts.symbol}</span>
        )}
        <span className={`${sizeClass} font-medium tracking-tight leading-none`}>
          {parts.amount}
        </span>
        {parts.position === "after" && (
          <span className="text-base font-medium text-muted-foreground">{parts.symbol}</span>
        )}
      </div>
      <span className="text-[11px] text-muted-foreground mt-1.5 inline-block">per month</span>
    </div>
  );
}

export function LandingPricing({ currency }: LandingPricingProps) {
  const plan = pricing[currency].basic;
  const monthlyParts = formatPriceParts(plan.monthly, currency);
  const yearlyParts = formatPriceParts(plan.yearly, currency);
  const savings = formatPrice(plan.monthly * 12 - plan.yearlyTotal, currency);

  const trialHref = (() => {
    const url = new URL(dashboardUrl("/en/login"));
    url.searchParams.set("from", "landing");
    return url.toString();
  })();

  const trustItems = [
    { Icon: Lock, label: "Secure payment with Stripe" },
    { Icon: Ban, label: "No commitment" },
    { Icon: Zap, label: "Active in minutes" },
    { Icon: Globe, label: "500+ restaurants" },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left — text + CTA + trust */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground mb-4">
            No commissions · No contracts
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 leading-[1.15]">
            One plan.{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              Everything included.
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0 leading-snug">
            QR menu, ordering, AI translation, restaurant website &amp; reservations. One simple price.
          </p>

          <div className="flex flex-col items-center lg:items-start">
            <a
              href={trialHref}
              className="inline-flex w-full max-w-[14rem] items-center justify-center h-11 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all"
            >
              Start my free trial →
            </a>
            <p className="text-[11px] text-muted-foreground mt-2.5">
              14-day free trial · No credit card · Cancel anytime
            </p>
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

        {/* Right — 2 pricing cards (display only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full auto-rows-fr">
          <div className="flex flex-col justify-center text-left rounded-2xl border border-border bg-card p-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
              Monthly
            </p>
            <PriceDisplay parts={monthlyParts} />
          </div>

          <div className="relative flex flex-col justify-center text-left rounded-2xl border border-primary/60 bg-primary/5 p-5">
            <span className="absolute -top-2 right-3 px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[9px] font-medium uppercase tracking-wider">
              Save 25%
            </span>
            <p className="text-[10px] font-medium uppercase tracking-widest text-primary mb-3">
              Yearly
            </p>
            <PriceDisplay parts={yearlyParts} />
            <p className="text-[11px] text-muted-foreground mt-3">
              Billed annually {formatPrice(plan.yearlyTotal, currency)}
            </p>
            <p className="text-[11px] text-emerald-500 font-medium mt-0.5">
              You save {savings}
            </p>
          </div>
        </div>

        {/* Mobile trust row (below cards) */}
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
