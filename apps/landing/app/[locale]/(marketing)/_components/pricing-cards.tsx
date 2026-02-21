"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Check, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { pricing, PlanId } from "@/lib/pricing";
import { currencyInfo, SupportedCurrency } from "@/lib/country-currency-map";

interface Plan {
  id: PlanId;
  popular: boolean;
}

const PLANS: Plan[] = [
  { id: "free", popular: false },
  { id: "basic", popular: true },
  { id: "pro", popular: false },
];

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

interface PricingCardsProps {
  hideComparison?: boolean;
  hideButtons?: boolean;
}

function getCurrencyFromCookie(): SupportedCurrency {
  if (typeof document === "undefined") return "EUR";
  const match = document.cookie.match(/currency=([^;]+)/);
  return (match?.[1] as SupportedCurrency) || "EUR";
}

function formatPrice(amount: number, currency: SupportedCurrency): string {
  const info = currencyInfo[currency];

  // Форматируем число с разделителями тысяч
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: info.zeroDecimal ? 0 : (Number.isInteger(amount) ? 0 : 2),
    maximumFractionDigits: info.zeroDecimal ? 0 : 2,
  }).replace(/,/g, " "); // пробел как разделитель тысяч

  if (info.symbolPosition === "before") {
    return `${info.symbol}${formatted}`;
  }
  return `${formatted} ${info.symbol}`;
}

export function PricingCards({ hideComparison = false, hideButtons = false }: PricingCardsProps) {
  const t = useTranslations("pricing");
  const [isYearly, setIsYearly] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");

  // Читаем валюту из куки при монтировании
  useEffect(() => {
    setCurrency(getCurrencyFromCookie());
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      const idx = api.selectedScrollSnap();
      setCurrent(idx);
      const plan = PLANS[idx];
      if (plan) {
        const swipeEvents: Record<string, DashboardEvent> = {
          free: DashboardEvent.PRICING_SWIPE_FREE,
          basic: DashboardEvent.PRICING_SWIPE_BASIC,
          pro: DashboardEvent.PRICING_SWIPE_PRO,
        };
        track(swipeEvents[plan.id]);
      }
    });
  }, [api]);

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };

  const renderCellValue = (
    value: FeatureValue,
    planId: string,
    featureKey: string
  ) => {
    if (value === "value") {
      return (
        <span className="text-sm font-medium">
          {t(`values.${planId}.${featureKey}`)}
        </span>
      );
    }
    if (value === true) {
      return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    }
    return <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />;
  };

  return (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span
          className={cn(
            "text-sm transition-colors",
            !isYearly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {t("monthly")}
        </span>
        <button
          onClick={handleToggle}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
            isYearly ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              isYearly ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm transition-colors flex flex-col",
            isYearly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <span>{t("yearly")}</span>
          <span className="text-xs text-green-600 dark:text-green-400">
            {t("save")}
          </span>
        </span>
      </div>

      {/* Pricing Cards Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          startIndex: 0,
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 pt-6">
          {PLANS.map((plan, index) => {
            const currencyPricing = pricing[currency][plan.id];
            const price = isYearly ? currencyPricing.yearly : currencyPricing.monthly;
            const isActive = current === index;

            return (
              <CarouselItem
                key={plan.id}
                className="pl-2 md:pl-4 basis-[75%] md:basis-1/3"
              >
                <Card
                  className={cn(
                    "relative flex flex-col h-full transition-all duration-300",
                    plan.popular && "border-primary shadow-lg",
                    isActive ? "scale-100 opacity-100" : "md:scale-100 scale-95 opacity-70 md:opacity-100"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        {t("popular")}
                      </span>
                    </div>
                  )}
                  <CardHeader className={cn(plan.popular && "pt-8")}>
                    <CardTitle className="text-2xl">
                      {t(`plans.${plan.id}.name`)}
                    </CardTitle>
                    <CardDescription>
                      {t(`plans.${plan.id}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-1 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{formatPrice(price, currency)}</span>
                        <span className="text-muted-foreground">{t("perMonth")}</span>
                      </div>
                      {isYearly && currencyPricing.yearlyTotal > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {t("billedYearly", { total: formatPrice(currencyPricing.yearlyTotal, currency) })}
                        </div>
                      )}
                      {plan.id === "free" && (
                        <div className="text-sm text-muted-foreground">
                          {t("forever")}
                        </div>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {(t.raw(`plans.${plan.id}.highlights`) as string[]).map(
                        (highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm">{highlight}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                  {!hideButtons && (
                    <CardFooter>
                      <Button
                        asChild
                        className="w-full"
                        variant="default"
                        size="lg"
                      >
                        <Link href="/dashboard">{t(`plans.${plan.id}.cta`)}</Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-2 md:hidden">
        {PLANS.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              current === index ? "bg-primary" : "bg-muted-foreground/30"
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>

      {/* Comparison Table */}
      {!hideComparison && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {t("comparison.title")}
            </h2>
            <p className="text-muted-foreground">{t("comparison.subtitle")}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground w-1/4">
                    &nbsp;
                  </th>
                  {PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      className={cn(
                        "py-4 px-4 text-center font-semibold",
                        plan.popular && "text-primary"
                      )}
                    >
                      {t(`plans.${plan.id}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, index) => (
                  <tr
                    key={feature.key}
                    className={cn(
                      "border-b",
                      index % 2 === 0 ? "bg-muted/30" : ""
                    )}
                  >
                    <td className="py-4 px-4 text-sm font-medium">
                      {t(`features.${feature.key}`)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderCellValue(feature.free, "free", feature.key)}
                    </td>
                    <td
                      className={cn(
                        "py-4 px-4 text-center",
                        "bg-primary/5"
                      )}
                    >
                      {renderCellValue(feature.basic, "basic", feature.key)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderCellValue(feature.pro, "pro", feature.key)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
