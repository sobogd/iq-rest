"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
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

export function PricingCards() {
  const t = useTranslations("pricing");
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={cn("text-sm", !isYearly && "font-medium")}>{t("monthly")}</span>
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
        <span className={cn("text-sm", isYearly && "font-medium")}>
          {t("yearly")} <span className="text-green-600 dark:text-green-400">{t("save")}</span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => {
          const price = isYearly ? plan.price.yearly : plan.price.monthly;

          return (
            <Card
              key={plan.id}
              className={cn(
                plan.popular && "border-primary shadow-lg relative"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t("popular")}
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{t(`plans.${plan.id}.name`)}</CardTitle>
                <CardDescription>{t(`plans.${plan.id}.description`)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
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
                  {(t.raw(`plans.${plan.id}.features`) as string[]).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
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
    </div>
  );
}
