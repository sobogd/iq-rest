"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Clock, AlertTriangle } from "lucide-react";
import { PRICE_LOOKUP_KEYS, type PlanType } from "@/lib/stripe-config";
import type { BillingCycle, SubscriptionStatus } from "@prisma/client";
import { PageHeader } from "../_ui/page-header";
import { useDashboard } from "../_context/dashboard-context";
import { toast } from "sonner";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { pricing } from "@/lib/pricing";
import { currencyInfo, type SupportedCurrency } from "@/lib/country-currency-map";
import { DashboardContent } from "../_ui/dashboard-content";

interface SubscriptionStatusResponse {
  plan: PlanType;
  billingCycle: BillingCycle | null;
  subscriptionStatus: SubscriptionStatus;
  paymentProcessing: boolean;
}

function formatPrice(amount: number, currency: SupportedCurrency): string {
  const info = currencyInfo[currency];
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: info.zeroDecimal ? 0 : (Number.isInteger(amount) ? 0 : 2),
    maximumFractionDigits: info.zeroDecimal ? 0 : 2,
  }).replace(/,/g, " ");

  if (info.symbolPosition === "before") {
    return `${info.symbol}${formatted}`;
  }
  return `${formatted} ${info.symbol}`;
}

interface BillingPageProps {
  initialSubscription: {
    plan: PlanType;
    billingCycle: BillingCycle | null;
    subscriptionStatus: SubscriptionStatus;
    currentPeriodEnd: string | null;
    paymentProcessing: boolean;
  } | null;
  currency: SupportedCurrency;
  trialEndsAt: string | null;
}

export function BillingPage({ initialSubscription, currency, trialEndsAt }: BillingPageProps) {
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

  const isActive = subscriptionStatus === "ACTIVE" && currentPlan !== "FREE";

  // Trial status
  const trialDate = trialEndsAt ? new Date(trialEndsAt) : null;
  const isTrialing = trialDate !== null && trialDate > new Date();
  const trialExpired = trialDate !== null && trialDate <= new Date();
  const trialDaysLeft = isTrialing && trialDate
    ? Math.ceil((trialDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

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

  const plan = pricing[currency].basic;

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.billing} />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-4">
          {/* Status banner */}
          {isActive && (
            <div className="rounded-md border border-success/30 bg-success/5 px-4 py-3 flex items-center gap-3">
              <div className="w-2 h-2 bg-success rounded-full" />
              <div className="flex-1">
                <span className="text-sm font-medium text-success">
                  {t("activeSubscription")}
                </span>
                {billingCycle && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({billingCycle === "YEARLY" ? t("billedYearly") : t("billedMonthly")})
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-success/50 text-success hover:bg-success/10"
                onClick={() => { track(DashboardEvent.CLICKED_MANAGE_SUBSCRIPTION); handleManageSubscription(); }}
                disabled={!!actionLoading}
              >
                {actionLoading === "manage" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("manage")}
              </Button>
            </div>
          )}

          {isTrialing && (
            <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                {t("trialDaysLeft", { days: trialDaysLeft })}
              </span>
            </div>
          )}

          {trialExpired && !isActive && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
              <span className="text-sm">{t("trialExpired")}</span>
            </div>
          )}

          {/* Plan options — only show if not active subscriber */}
          {!isActive && (
            <div className="rounded-md border border-border bg-muted/50 overflow-hidden">
              <div className="flex items-center px-4 py-3.5 bg-muted/30">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("choosePlan")}
                </span>
              </div>

              {/* Yearly */}
              <div className="flex items-center justify-between px-4 h-12 border-t border-foreground/5">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-sm font-medium">{t("yearly")}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(plan.yearly, currency)}{t("perMonth")}
                  </span>
                </div>
                <Button
                  size="sm"
                  onClick={() => { track(DashboardEvent.CLICKED_PLAN_UPGRADE, { plan: "BASIC_YEARLY" }); handleSubscribe(PRICE_LOOKUP_KEYS.BASIC_YEARLY); }}
                  disabled={!!actionLoading}
                >
                  {actionLoading === PRICE_LOOKUP_KEYS.BASIC_YEARLY && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("subscribe")}
                </Button>
              </div>

              {/* Monthly */}
              <div className="flex items-center justify-between px-4 h-12 border-t border-foreground/5">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-sm font-medium">{t("monthly")}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(plan.monthly, currency)}{t("perMonth")}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { track(DashboardEvent.CLICKED_PLAN_UPGRADE, { plan: "BASIC_MONTHLY" }); handleSubscribe(PRICE_LOOKUP_KEYS.BASIC_MONTHLY); }}
                  disabled={!!actionLoading}
                >
                  {actionLoading === PRICE_LOOKUP_KEYS.BASIC_MONTHLY && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("subscribe")}
                </Button>
              </div>
            </div>
          )}
        </DashboardContent>
      </div>
    </div>
  );
}
