"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICE_LOOKUP_KEYS, type PlanType } from "@/lib/stripe-config";
import type { BillingCycle, SubscriptionStatus } from "@prisma/client";
import { Link } from "@/i18n/routing";
import { PageHeader } from "../_ui/page-header";
import { useDashboard } from "../_context/dashboard-context";
import { toast } from "sonner";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface SubscriptionStatusResponse {
  plan: PlanType;
  billingCycle: BillingCycle | null;
  subscriptionStatus: SubscriptionStatus;
  paymentProcessing: boolean;
}

const SUBSCRIPTION_OPTIONS = [
  { id: "FREE", plan: "FREE" as PlanType, cycle: null, price: 0, lookupKey: null },
  { id: "BASIC_MONTHLY", plan: "BASIC" as PlanType, cycle: "MONTHLY" as BillingCycle, price: 9.9, lookupKey: PRICE_LOOKUP_KEYS.BASIC_MONTHLY },
  { id: "BASIC_YEARLY", plan: "BASIC" as PlanType, cycle: "YEARLY" as BillingCycle, price: 7.4, lookupKey: PRICE_LOOKUP_KEYS.BASIC_YEARLY },
  { id: "PRO_MONTHLY", plan: "PRO" as PlanType, cycle: "MONTHLY" as BillingCycle, price: 29.9, lookupKey: PRICE_LOOKUP_KEYS.PRO_MONTHLY },
  { id: "PRO_YEARLY", plan: "PRO" as PlanType, cycle: "YEARLY" as BillingCycle, price: 20.75, lookupKey: PRICE_LOOKUP_KEYS.PRO_YEARLY },
] as const;

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

interface BillingPageProps {
  initialSubscription: {
    plan: PlanType;
    billingCycle: BillingCycle | null;
    subscriptionStatus: SubscriptionStatus;
    currentPeriodEnd: string | null;
    paymentProcessing: boolean;
  } | null;
}

export function BillingPage({ initialSubscription }: BillingPageProps) {
  const t = useTranslations("billing");
  const tp = useTranslations("pricing");
  const { translations } = useDashboard();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const showSuccess = searchParams.get("success") === "true";
  const showCanceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    track(DashboardEvent.SHOWED_BILLING);
  }, []);

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const [currentPlan, setCurrentPlan] = useState<PlanType>(initialSubscription?.plan ?? "FREE");
  const [billingCycle, setBillingCycle] = useState<BillingCycle | null>(initialSubscription?.billingCycle ?? null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(initialSubscription?.subscriptionStatus ?? "INACTIVE");
  const [paymentProcessing, setPaymentProcessing] = useState(initialSubscription?.paymentProcessing ?? false);

  const fetchSubscriptionStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/subscription/status");
      if (response.ok) {
        const data: SubscriptionStatusResponse = await response.json();
        setCurrentPlan(data.plan);
        setBillingCycle(data.billingCycle);
        setSubscriptionStatus(data.subscriptionStatus);
        setPaymentProcessing(data.paymentProcessing);
        return data;
      }
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
    }
    return null;
  }, []);

  const clearUrlParams = useCallback(() => {
    router.replace(window.location.pathname, { scroll: false });
  }, [router]);

  const pollSubscriptionStatus = useCallback(async () => {
    const data = await fetchSubscriptionStatus();
    if (data) {
      if ((data.subscriptionStatus === "ACTIVE" && data.plan !== "FREE") || !data.paymentProcessing) {
        setIsPolling(false);
        setPaymentProcessing(false);
        clearUrlParams();
        return true;
      }
    }
    return false;
  }, [fetchSubscriptionStatus, clearUrlParams]);

  useEffect(() => {
    if (showSuccess && !paymentProcessing) {
      fetch("/api/subscription/processing", { method: "POST" });
      setPaymentProcessing(true);
    }
  }, [showSuccess, paymentProcessing]);

  useEffect(() => {
    if (showSuccess || paymentProcessing) {
      setIsPolling(true);

      const initialDelay = setTimeout(async () => {
        const initialSuccess = await pollSubscriptionStatus();

        if (initialSuccess) {
          setIsPolling(false);
          return;
        }

        let attempts = 0;
        const maxAttempts = 25;

        const interval = setInterval(async () => {
          attempts++;
          const success = await pollSubscriptionStatus();

          if (success || attempts >= maxAttempts) {
            clearInterval(interval);
            setIsPolling(false);

            if (!success && attempts >= maxAttempts) {
              setPaymentProcessing(false);
              clearUrlParams();
            }
          }
        }, 2000);
      }, showSuccess ? 5000 : 0);

      return () => clearTimeout(initialDelay);
    } else if (showCanceled) {
      toast.error(t("subscriptionCanceled"));
      clearUrlParams();
    }
  }, [showSuccess, showCanceled, paymentProcessing, pollSubscriptionStatus, t, clearUrlParams]);

  const handleSubscribe = async (lookupKey: string) => {
    setActionLoading(lookupKey);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceLookupKey: lookupKey, locale }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        track(DashboardEvent.ERROR_CHECKOUT, { page: "billing" });
        toast.error(data.error || t("checkoutError"));
        setActionLoading(null);
      }
    } catch {
      track(DashboardEvent.ERROR_CHECKOUT, { page: "billing" });
      toast.error(t("checkoutError"));
      setActionLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setActionLoading("manage");

    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        track(DashboardEvent.ERROR_PORTAL, { page: "billing" });
        toast.error(data.error || t("portalError"));
        setActionLoading(null);
      }
    } catch {
      track(DashboardEvent.ERROR_PORTAL, { page: "billing" });
      toast.error(t("portalError"));
      setActionLoading(null);
    }
  };

  const isActive = subscriptionStatus === "ACTIVE";

  const isCurrentOption = (option: typeof SUBSCRIPTION_OPTIONS[number]) => {
    if (option.plan === "FREE") {
      return currentPlan === "FREE" || !isActive;
    }
    return currentPlan === option.plan && billingCycle === option.cycle && isActive;
  };

  if (isPolling) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title={translations.pages.billing} />
        <div className="flex-1 flex items-center justify-center px-6 pb-6">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium">{t("processingPayment")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("processingPaymentDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const planGroups = [
    { plan: "FREE" as PlanType, options: SUBSCRIPTION_OPTIONS.filter((o) => o.plan === "FREE") },
    { plan: "BASIC" as PlanType, options: SUBSCRIPTION_OPTIONS.filter((o) => o.plan === "BASIC") },
    { plan: "PRO" as PlanType, options: SUBSCRIPTION_OPTIONS.filter((o) => o.plan === "PRO") },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.billing} />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {planGroups.map((group) => (
            <div key={group.plan} className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              <div className="flex items-center px-4 h-12 bg-muted/30">
                <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{group.plan}</span>
              </div>
              {group.options.map((option) => {
                const isCurrent = isCurrentOption(option);
                const isLoading = actionLoading === option.lookupKey || (isCurrent && actionLoading === "manage");

                return (
                  <div
                    key={option.id}
                    className={cn(
                      "flex items-center justify-between px-4 h-12 border-t border-foreground/5 transition-colors",
                      isCurrent && "bg-green-500/5"
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={cn("text-sm font-medium", isCurrent && "text-green-700 dark:text-green-400")}>{t(`plans.${option.id}.name`)}</span>
                      <span className={cn("text-sm", isCurrent ? "text-green-600/70 dark:text-green-500/70" : "text-muted-foreground")}>
                        €{option.price}{t("perMonth")}
                      </span>
                    </div>

                    <div>
                      {option.plan === "FREE" ? (
                        isCurrent ? (
                          <span className="text-xs text-muted-foreground">{t("currentPlan")}</span>
                        ) : null
                      ) : isCurrent ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500/50 text-green-700 dark:text-green-400 hover:bg-green-500/10"
                          onClick={() => { track(DashboardEvent.CLICKED_MANAGE_SUBSCRIPTION); handleManageSubscription(); }}
                          disabled={!!actionLoading}
                        >
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {t("manage")}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => { track(DashboardEvent.CLICKED_PLAN_UPGRADE, { plan: option.plan }); option.lookupKey && handleSubscribe(option.lookupKey); }}
                          disabled={!!actionLoading}
                        >
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {t("upgrade")}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-lg font-semibold text-center mb-4">{tp("comparison.title")}</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-medium text-muted-foreground w-2/5">&nbsp;</th>
                  {PLAN_IDS.map((planId) => (
                    <th key={planId} className="py-3 px-2 text-center text-xs font-semibold uppercase tracking-wide">
                      {tp(`plans.${planId}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, index) => (
                  <tr key={feature.key} className={cn("border-t border-foreground/5", index % 2 === 0 && "bg-muted/20")}>
                    <td className="py-2.5 px-3 text-xs font-medium">{tp(`features.${feature.key}`)}</td>
                    {PLAN_IDS.map((planId) => {
                      const value = feature[planId];
                      return (
                        <td key={planId} className="py-2.5 px-2 text-center">
                          {value === "value" ? (
                            <span className="text-xs font-medium">{tp(`values.${planId}.${feature.key}`)}</span>
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
        </div>

        <p className="text-sm text-muted-foreground text-center pt-6">
          {t("detailsNote")}{" "}
          <Link href="/pricing" className="underline">
            {t("pricingPage")}
          </Link>
        </p>
      </div>
    </div>
  );
}
