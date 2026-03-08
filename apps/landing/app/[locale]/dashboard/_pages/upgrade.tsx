"use client";

import { useState, useEffect } from "react";
import { useBlockBack } from "../_hooks/use-back-intercept";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Languages,
  ScanLine,
  CalendarCheck,
  Sparkles,
  ImageOff,
  Rocket,
  Shield,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICE_LOOKUP_KEYS } from "@/lib/stripe-config";
import type { PlanType } from "@/lib/stripe-config";
import type { BillingCycle, SubscriptionStatus } from "@prisma/client";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { toast } from "sonner";
import { pricing } from "@/lib/pricing";
import { currencyInfo, type SupportedCurrency } from "@/lib/country-currency-map";

const FEATURES = [
  { key: "aiTranslations", icon: Languages },
  { key: "aiImages", icon: Sparkles },
  { key: "reservations", icon: CalendarCheck },
  { key: "unlimitedScans", icon: ScanLine },
  { key: "noBranding", icon: ImageOff },
] as const;

type SelectedPlan = "yearly" | "monthly";

interface PlanOption {
  id: SelectedPlan;
  lookupKey: string;
}

const PLAN_OPTIONS: PlanOption[] = [
  { id: "yearly", lookupKey: PRICE_LOOKUP_KEYS.BASIC_YEARLY },
  { id: "monthly", lookupKey: PRICE_LOOKUP_KEYS.BASIC_MONTHLY },
];

function formatPrice(amount: number, cur: SupportedCurrency): string {
  const info = currencyInfo[cur];
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: info.zeroDecimal ? 0 : (Number.isInteger(amount) ? 0 : 2),
    maximumFractionDigits: info.zeroDecimal ? 0 : 2,
  }).replace(/,/g, " ");
  return info.symbolPosition === "before" ? `${info.symbol}${formatted}` : `${formatted} ${info.symbol}`;
}

interface UpgradePageProps {
  initialSubscription: {
    plan: PlanType;
    billingCycle: BillingCycle | null;
    subscriptionStatus: SubscriptionStatus;
    currentPeriodEnd: string | null;
    paymentProcessing: boolean;
  } | null;
  isAdmin?: boolean;
  currency: SupportedCurrency;
}

export function UpgradePage({ initialSubscription, isAdmin, currency }: UpgradePageProps) {
  const t = useTranslations("dashboard.upsell");
  const tp = useTranslations("pricing");
  const locale = useLocale();
  const router = useRouter();

  useBlockBack();

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>("yearly");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    track(DashboardEvent.SHOWED_UPSELL_PAGE);
  }, []);

  // If user is not on FREE and not admin, skip this page
  if (!isAdmin && initialSubscription && initialSubscription.plan !== "FREE") {
    router.push("/dashboard");
    return null;
  }

  const handleUpgrade = async () => {
    const option = PLAN_OPTIONS.find((o) => o.id === selectedPlan)!;
    track(DashboardEvent.CLICKED_UPSELL_UPGRADE, { plan: `basic_${selectedPlan}` });
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceLookupKey: option.lookupKey,
          locale,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || t("checkoutError"));
        setLoading(false);
      }
    } catch {
      toast.error(t("checkoutError"));
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="max-w-md mx-auto px-5 pb-10">
          {/* Hero */}
          <div className="text-center pt-12 pb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Rocket className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">{t("trialEndedTitle")}</h1>
            <p className="text-muted-foreground text-[15px]">{t("trialEndedSubtitle")}</p>
          </div>

          {/* Plan selector */}
          <div className="grid grid-cols-2 gap-2.5 mb-8">
            {PLAN_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPlan(option.id)}
                className={cn(
                  "relative rounded-md border-2 p-5 text-center transition-all",
                  selectedPlan === option.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/50"
                )}
              >
                {option.id === "yearly" && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-semibold px-2.5 py-0.5 rounded-xl uppercase tracking-wide whitespace-nowrap">
                    {tp("save")}
                  </span>
                )}
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 mx-auto mb-3 flex items-center justify-center",
                    selectedPlan === option.id
                      ? "border-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {selectedPlan === option.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div className="font-semibold mb-1">
                  {tp(option.id === "yearly" ? "yearly" : "monthly")}
                </div>
                <div className="text-2xl font-bold">
                  {formatPrice(option.id === "yearly" ? pricing[currency].basic.yearly : pricing[currency].basic.monthly, currency)}
                  <span className="text-sm font-normal text-muted-foreground">
                    {tp("perMonth")}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {option.id === "yearly"
                    ? tp("billedYearly", { total: formatPrice(pricing[currency].basic.yearlyTotal, currency) })
                    : t("billedMonthly")}
                </div>
              </button>
            ))}
          </div>

          {/* Features list */}
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {t("featuresTitle")}
            </div>
            {FEATURES.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="flex items-start gap-3.5 py-3.5 border-b border-border/50 last:border-0"
              >
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">
                    {t(`features.${key}.title`)}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {t(`features.${key}.description`)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full h-14 text-base font-semibold rounded-md shadow-md"
              onClick={handleUpgrade}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                t("ctaBasic")
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              {t("ctaSub")}
            </p>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground/60">
              <Shield className="h-3.5 w-3.5" />
              {t("guarantee")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
