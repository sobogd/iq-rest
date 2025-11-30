"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICE_LOOKUP_KEYS, type PlanType } from "@/lib/stripe-config";
import type { BillingCycle, SubscriptionStatus } from "@prisma/client";
import { Link } from "@/i18n/routing";

interface BillingClientProps {
  currentPlan: PlanType;
  billingCycle: BillingCycle | null;
  subscriptionStatus: SubscriptionStatus;
  showSuccess: boolean;
  showCanceled: boolean;
  paymentProcessing: boolean;
}

interface SubscriptionStatusResponse {
  plan: PlanType;
  billingCycle: BillingCycle | null;
  subscriptionStatus: SubscriptionStatus;
  paymentProcessing: boolean;
}

// Define all subscription options
const SUBSCRIPTION_OPTIONS = [
  { id: "FREE", plan: "FREE" as PlanType, cycle: null, price: 0, lookupKey: null },
  { id: "BASIC_MONTHLY", plan: "BASIC" as PlanType, cycle: "MONTHLY" as BillingCycle, price: 4, lookupKey: PRICE_LOOKUP_KEYS.BASIC_MONTHLY },
  { id: "BASIC_YEARLY", plan: "BASIC" as PlanType, cycle: "YEARLY" as BillingCycle, price: 3, lookupKey: PRICE_LOOKUP_KEYS.BASIC_YEARLY },
  { id: "PRO_MONTHLY", plan: "PRO" as PlanType, cycle: "MONTHLY" as BillingCycle, price: 7, lookupKey: PRICE_LOOKUP_KEYS.PRO_MONTHLY },
  { id: "PRO_YEARLY", plan: "PRO" as PlanType, cycle: "YEARLY" as BillingCycle, price: 6, lookupKey: PRICE_LOOKUP_KEYS.PRO_YEARLY },
] as const;

export function BillingClient({
  currentPlan: initialPlan,
  billingCycle: initialBillingCycle,
  subscriptionStatus: initialStatus,
  showSuccess,
  showCanceled,
  paymentProcessing: initialPaymentProcessing,
}: BillingClientProps) {
  const t = useTranslations("billing");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(initialPaymentProcessing);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Dynamic subscription state
  const [currentPlan, setCurrentPlan] = useState(initialPlan);
  const [billingCycle, setBillingCycle] = useState(initialBillingCycle);
  const [subscriptionStatus, setSubscriptionStatus] = useState(initialStatus);

  const pollSubscriptionStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/subscription/status");
      if (response.ok) {
        const data: SubscriptionStatusResponse = await response.json();
        setCurrentPlan(data.plan);
        setBillingCycle(data.billingCycle);
        setSubscriptionStatus(data.subscriptionStatus);

        // Stop polling if subscription is active or paymentProcessing was reset in DB
        if ((data.subscriptionStatus === "ACTIVE" && data.plan !== "FREE") || !data.paymentProcessing) {
          setIsPolling(false);
          setPaymentProcessing(false);
          router.replace(`/${locale}/dashboard/billing`, { scroll: false });
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }, [router, locale]);

  // Fetch initial status
  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        const response = await fetch("/api/subscription/status");
        if (response.ok) {
          const data: SubscriptionStatusResponse = await response.json();
          setCurrentPlan(data.plan);
          setBillingCycle(data.billingCycle);
          setSubscriptionStatus(data.subscriptionStatus);
          setPaymentProcessing(data.paymentProcessing);
        }
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchInitialStatus();
  }, []);

  // Set processing flag in DB when returning from Stripe
  useEffect(() => {
    if (showSuccess && !paymentProcessing) {
      fetch("/api/subscription/processing", { method: "POST" });
      setPaymentProcessing(true);
    }
  }, [showSuccess, paymentProcessing]);

  // Start polling if showSuccess or paymentProcessing is true
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
              router.replace(`/${locale}/dashboard/billing`, { scroll: false });
            }
          }
        }, 2000);
      }, showSuccess ? 5000 : 0); // Start immediately if already processing

      return () => clearTimeout(initialDelay);
    } else if (showCanceled) {
      setMessage({ type: "error", text: t("subscriptionCanceled") });
      router.replace(`/${locale}/dashboard/billing`, { scroll: false });
    }
  }, [showSuccess, showCanceled, paymentProcessing, pollSubscriptionStatus, t, router, locale]);

  const handleSubscribe = async (lookupKey: string) => {
    setLoading(lookupKey);
    setMessage(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceLookupKey: lookupKey }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setMessage({ type: "error", text: data.error || t("checkoutError") });
        setLoading(null);
      }
    } catch {
      setMessage({ type: "error", text: t("checkoutError") });
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setLoading("manage");
    setMessage(null);

    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setMessage({ type: "error", text: data.error || t("portalError") });
        setLoading(null);
      }
    } catch {
      setMessage({ type: "error", text: t("portalError") });
      setLoading(null);
    }
  };

  const isActive = subscriptionStatus === "ACTIVE";

  // Check if option is current subscription
  const isCurrentOption = (option: typeof SUBSCRIPTION_OPTIONS[number]) => {
    if (option.plan === "FREE") {
      return currentPlan === "FREE" || !isActive;
    }
    return currentPlan === option.plan && billingCycle === option.cycle && isActive;
  };

  // Show loading state while initial loading or polling
  if (isInitialLoading || isPolling) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          {isPolling && (
            <div className="text-center">
              <p className="font-medium">{t("processingPayment")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("processingPaymentDescription")}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-24 space-y-4">
      {message && (
        <div
          className={cn(
            "p-4 rounded-lg text-sm",
            message.type === "success"
              ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          )}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-2">
        {SUBSCRIPTION_OPTIONS.map((option) => {
          const isCurrent = isCurrentOption(option);
          const isLoading = loading === option.lookupKey || (isCurrent && loading === "manage");

          return (
            <div
              key={option.id}
              className={cn(
                "flex items-center justify-between px-4 py-3 bg-card rounded-lg border",
                isCurrent && "border-primary ring-1 ring-primary"
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span
                  className={cn(
                    "h-2 w-2 min-h-2 min-w-2 shrink-0 rounded-full",
                    isCurrent ? "bg-green-500" : "bg-gray-300"
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{t(`plans.${option.id}.name`)}</span>
                  <span className="text-xs text-muted-foreground">
                    €{option.price}{t("perMonth")}
                  </span>
                </div>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                {option.plan === "FREE" ? (
                  isCurrent ? (
                    <span className="text-xs text-muted-foreground px-3 py-1.5">{t("currentPlan")}</span>
                  ) : null
                ) : isCurrent ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManageSubscription}
                    disabled={!!loading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    {t("manage")}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => option.lookupKey && handleSubscribe(option.lookupKey)}
                    disabled={!!loading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    {t("upgrade")}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-4">
        {t("detailsNote")}{" "}
        <Link href="/pricing" className="text-primary hover:underline">
          {t("pricingPage")}
        </Link>
      </p>
    </div>
  );
}
