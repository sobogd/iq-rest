"use client";

import { useState } from "react";
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
import { Check, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  price: { monthly: number; yearly: number };
  yearlyTotal?: number;
  popular: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    price: { monthly: 0, yearly: 0 },
    popular: false,
  },
  {
    id: "basic",
    price: { monthly: 4, yearly: 3 },
    yearlyTotal: 36,
    popular: true,
  },
  {
    id: "pro",
    price: { monthly: 7, yearly: 6 },
    yearlyTotal: 72,
    popular: false,
  },
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
  { key: "aiTranslation", free: false, basic: true, pro: true },
  { key: "aiImages", free: true, basic: true, pro: true },
  { key: "analytics", free: true, basic: true, pro: true },
  { key: "customTheme", free: false, basic: true, pro: true },
  { key: "background", free: true, basic: true, pro: true },
  { key: "support", free: true, basic: true, pro: true },
  { key: "reservations", free: false, basic: true, pro: true },
];

export function PricingCards() {
  const t = useTranslations("pricing");
  const [isYearly, setIsYearly] = useState(false);

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
    <div className="space-y-16">
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
          onClick={() => setIsYearly(!isYearly)}
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
            "text-sm transition-colors",
            isYearly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {t("yearly")}{" "}
          <span className="text-green-600 dark:text-green-400">
            {t("save")}
          </span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {PLANS.map((plan) => {
          const price = isYearly ? plan.price.yearly : plan.price.monthly;

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col",
                plan.popular && "border-primary shadow-lg scale-[1.02]"
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
                    <span className="text-4xl font-bold">€{price}</span>
                    <span className="text-muted-foreground">{t("perMonth")}</span>
                  </div>
                  {isYearly && plan.yearlyTotal && (
                    <div className="text-sm text-muted-foreground">
                      {t("billedYearly", { total: plan.yearlyTotal })}
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
                    (highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  <Link href="/dashboard">{t(`plans.${plan.id}.cta`)}</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Comparison Table */}
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

      {/* SEO Content */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {t("seo.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("seo.text")}
        </p>
      </div>
    </div>
  );
}
