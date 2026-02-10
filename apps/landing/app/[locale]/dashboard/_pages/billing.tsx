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
import { PageLoader } from "../_ui/page-loader";
import { toast } from "sonner";
import { analytics } from "@/lib/analytics";

interface SubscriptionStatusResponse {
  plan: PlanType;
  billingCycle: BillingCycle | null;
  subscriptionStatus: SubscriptionStatus;
  paymentProcessing: boolean;
}

const SUBSCRIPTION_OPTIONS = [
  { id: "FREE", plan: "FREE" as PlanType, cycle: null, price: 0, lookupKey: null },
  { id: "BASIC_MONTHLY", plan: "BASIC" as PlanType, cycle: "MONTHLY" as BillingCycle, price: 5, lookupKey: PRICE_LOOKUP_KEYS.BASIC_MONTHLY },
  { id: "BASIC_YEARLY", plan: "BASIC" as PlanType, cycle: "YEARLY" as BillingCycle, price: 4, lookupKey: PRICE_LOOKUP_KEYS.BASIC_YEARLY },
  { id: "PRO_MONTHLY", plan: "PRO" as PlanType, cycle: "MONTHLY" as BillingCycle, price: 7, lookupKey: PRICE_LOOKUP_KEYS.PRO_MONTHLY },
  { id: "PRO_YEARLY", plan: "PRO" as PlanType, cycle: "YEARLY" as BillingCycle, price: 6, lookupKey: PRICE_LOOKUP_KEYS.PRO_YEARLY },
] as const;

export function BillingPage() {
  const t = useTranslations("billing");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const showSuccess = searchParams.get("success") === "true";
  const showCanceled = searchParams.get("canceled") === "true";

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const [currentPlan, setCurrentPlan] = useState<PlanType>("FREE");
  const [billingCycle, setBillingCycle] = useState<BillingCycle | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("INACTIVE");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

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

  useEffect(() => {
    analytics.billing.plansView();
    fetchSubscriptionStatus().then(() => setLoading(false));
  }, [fetchSubscriptionStatus]);

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
    if (showSuccess && !paymentProcessing && !loading) {
      fetch("/api/subscription/processing", { method: "POST" });
      setPaymentProcessing(true);
    }
  }, [showSuccess, paymentProcessing, loading]);

  useEffect(() => {
    if (loading) return;

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
  }, [showSuccess, showCanceled, paymentProcessing, pollSubscriptionStatus, t, clearUrlParams, loading]);

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
        toast.error(data.error || t("checkoutError"));
        setActionLoading(null);
      }
    } catch {
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
        toast.error(data.error || t("portalError"));
        setActionLoading(null);
      }
    } catch {
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

  if (loading) {
    return <PageLoader />;
  }

  if (isPolling) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center p-6">
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-2">
          {SUBSCRIPTION_OPTIONS.map((option) => {
            const isCurrent = isCurrentOption(option);
            const isLoading = actionLoading === option.lookupKey || (isCurrent && actionLoading === "manage");

            return (
              <div
                key={option.id}
                className={cn(
                  "flex items-center justify-between px-4 h-16 bg-muted/30 rounded-xl transition-colors",
                  isCurrent && "ring-2 ring-primary"
                )}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium">{t(`plans.${option.id}.name`)}</span>
                    <span className="text-sm text-muted-foreground">
                      ${option.price}{t("perMonth")}
                    </span>
                  </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  {option.plan === "FREE" ? (
                    isCurrent ? (
                      <span className="text-sm text-muted-foreground px-3 py-1.5">{t("currentPlan")}</span>
                    ) : null
                  ) : isCurrent ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleManageSubscription}
                      disabled={!!actionLoading}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {t("manage")}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => option.lookupKey && handleSubscribe(option.lookupKey)}
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

        <p className="text-sm text-muted-foreground text-center pt-6">
          {t("detailsNote")}{" "}
          <Link href="/pricing" className="text-primary hover:underline">
            {t("pricingPage")}
          </Link>
        </p>
      </div>
    </div>
  );
}
