"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
