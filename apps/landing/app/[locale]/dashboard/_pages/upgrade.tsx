"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Languages,
  ScanLine,
  CalendarCheck,
  Sparkles,
  ImageOff,
  Rocket,
  Shield,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICE_LOOKUP_KEYS, PLANS } from "@/lib/stripe-config";
import type { PlanType } from "@/lib/stripe-config";
import type { BillingCycle, SubscriptionStatus } from "@prisma/client";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { toast } from "sonner";

type FeatureValue = boolean | "value";

interface FeatureRow {
  key: string;
  free: FeatureValue;
  basic: FeatureValue;
  pro: FeatureValue;
}

const COMPARISON_FEATURES: FeatureRow[] = [
  { key: "website", free: true, basic: true, pro: true },
  { key: "qrMenu", free: true, basic: true, pro: true },
  { key: "scans", free: "value", basic: "value", pro: "value" },
  { key: "languages", free: "value", basic: "value", pro: "value" },
  { key: "aiTranslation", free: false, basic: "value", pro: "value" },
  { key: "aiImages", free: false, basic: "value", pro: "value" },
  { key: "allergens", free: false, basic: true, pro: true },
  { key: "analytics", free: true, basic: true, pro: true },
  { key: "customTheme", free: true, basic: true, pro: true },
  { key: "background", free: true, basic: true, pro: true },
  { key: "support", free: true, basic: true, pro: true },
  { key: "reservations", free: false, basic: true, pro: true },
  { key: "noBranding", free: false, basic: true, pro: true },
  { key: "multiRestaurant", free: false, basic: false, pro: true },
  { key: "customDomain", free: false, basic: false, pro: true },
];

const PLAN_IDS = ["free", "basic", "pro"] as const;

const FEATURES = [
  { key: "aiTranslations", icon: Languages },
  { key: "aiImages", icon: Sparkles },
  { key: "reservations", icon: CalendarCheck },
  { key: "unlimitedScans", icon: ScanLine },
  { key: "noBranding", icon: ImageOff },
] as const;

type SelectedPlan = "yearly" | "monthly";

const PLAN_OPTIONS: { id: SelectedPlan; pricePerMonth: string; lookupKey: string; subtextKey: string }[] = [
  {
    id: "yearly",
    pricePerMonth: (PLANS.BASIC.price.yearly / 12).toFixed(2).replace(/\.?0+$/, ""),
    lookupKey: PRICE_LOOKUP_KEYS.BASIC_YEARLY,
    subtextKey: "billedYearly",
  },
  {
    id: "monthly",
    pricePerMonth: PLANS.BASIC.price.monthly.toFixed(2).replace(/\.?0+$/, ""),
    lookupKey: PRICE_LOOKUP_KEYS.BASIC_MONTHLY,
    subtextKey: "billedMonthly",
  },
];

const YEARLY_TOTAL = PLANS.BASIC.price.yearly.toFixed(0);

interface UpgradePageProps {
  initialSubscription: {
    plan: PlanType;
    billingCycle: BillingCycle | null;
    subscriptionStatus: SubscriptionStatus;
    currentPeriodEnd: string | null;
    paymentProcessing: boolean;
  } | null;
  isAdmin?: boolean;
}

export function UpgradePage({ initialSubscription, isAdmin }: UpgradePageProps) {
  const t = useTranslations("dashboard.upsell");
  const tp = useTranslations("pricing");
  const locale = useLocale();
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>("yearly");
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    track(DashboardEvent.SHOWED_UPSELL_PAGE);
    fetch("/api/onboarding/upsell-shown", { method: "POST" }).catch(() => {});
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
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Rocket className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">{t("title")}</h1>
            <p className="text-muted-foreground text-[15px]">{t("subtitle")}</p>
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-muted rounded-full text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {tp("socialProof")}
            </div>
          </div>

          {/* Plan selector */}
          <div className="grid grid-cols-2 gap-2.5 mb-8">
            {PLAN_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPlan(option.id)}
                className={cn(
                  "relative rounded-2xl border-2 p-5 text-center transition-all",
                  selectedPlan === option.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/50"
                )}
              >
                {option.id === "yearly" && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
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
                  €{option.pricePerMonth}
                  <span className="text-sm font-normal text-muted-foreground">
                    {tp("perMonth")}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {option.id === "yearly"
                    ? tp("billedYearly", { total: `€${YEARLY_TOTAL}` })
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
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
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

          {/* Comparison toggle */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-full px-5 py-2.5 hover:border-muted-foreground/50 transition-colors"
            >
              {showComparison ? t("hideComparison") : t("comparePlans")}
              {showComparison ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {/* Comparison table */}
          {showComparison && (
            <div className="mb-7 rounded-xl border border-border overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left py-3 px-3 text-xs font-medium text-muted-foreground w-2/5">
                      &nbsp;
                    </th>
                    {PLAN_IDS.map((planId) => (
                      <th
                        key={planId}
                        className="py-3 px-2 text-center text-xs font-semibold uppercase tracking-wide"
                      >
                        {tp(`plans.${planId}.name`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature, index) => (
                    <tr
                      key={feature.key}
                      className={cn(
                        "border-t border-foreground/5",
                        index % 2 === 0 && "bg-muted/20"
                      )}
                    >
                      <td className="py-2.5 px-3 text-xs font-medium">
                        {tp(`features.${feature.key}`)}
                      </td>
                      {PLAN_IDS.map((planId) => {
                        const value = feature[planId];
                        return (
                          <td key={planId} className="py-2.5 px-2 text-center">
                            {value === "value" ? (
                              <span className="text-xs font-medium">
                                {tp(`values.${planId}.${feature.key}`)}
                              </span>
                            ) : value === true ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CTA */}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full h-14 text-base font-semibold rounded-xl shadow-md"
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

            <div className="text-center mt-5">
              <button
                onClick={() => {
                  track(DashboardEvent.CLICKED_UPSELL_SKIP);
                  router.push("/dashboard");
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("skip")}
              </button>
            </div>

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
