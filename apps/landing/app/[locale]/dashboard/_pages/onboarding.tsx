"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDashboard, PageKey } from "../_context/dashboard-context";
import { ExternalLink, Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface OnboardingProgress {
  hasTitle: boolean;
  hasSlug: boolean;
  hasCategories: boolean;
  hasItems: boolean;
  hasDesign: boolean;
  hasContacts: boolean;
  hasReservations: boolean;
  hasTranslations: boolean;
}

interface OnboardingData {
  progress: OnboardingProgress;
  requiredCompleted: boolean;
  slug: string | null;
}

type StepKey = "title" | "slug" | "categories" | "items" | "design" | "contacts" | "reservations" | "translations";

interface Step {
  key: StepKey;
  progressKey: keyof OnboardingProgress;
  page: PageKey;
}

const requiredSteps: Step[] = [
  { key: "title", progressKey: "hasTitle", page: "settings" },
  { key: "slug", progressKey: "hasSlug", page: "settings" },
  { key: "categories", progressKey: "hasCategories", page: "categories" },
  { key: "items", progressKey: "hasItems", page: "items" },
];

const optionalSteps: Step[] = [
  { key: "design", progressKey: "hasDesign", page: "design" },
  { key: "contacts", progressKey: "hasContacts", page: "contacts" },
  { key: "reservations", progressKey: "hasReservations", page: "reservationSettings" },
  { key: "translations", progressKey: "hasTranslations", page: "languages" },
];

export function OnboardingPage() {
  const t = useTranslations("dashboard.onboarding");
  const { navigateFromOnboarding } = useDashboard();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch("/api/onboarding/progress");
        if (response.ok) {
          const result = await response.json();
          setData(result);
          analytics.onboarding.viewOnboarding();
          if (result.requiredCompleted) {
            analytics.onboarding.completeAllRequired();
          }
        }
      } catch (error) {
        console.error("Failed to fetch onboarding progress:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, []);

  const handleStepClick = (step: StepKey, page: PageKey) => {
    analytics.onboarding.clickStep(step);
    navigateFromOnboarding(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { progress, requiredCompleted, slug } = data;

  const requiredCount = requiredSteps.filter(step => progress[step.progressKey]).length;
  const optionalCount = optionalSteps.filter(step => progress[step.progressKey]).length;
  const totalRequired = requiredSteps.length;
  const totalOptional = optionalSteps.length;
  const progressPercent = Math.round((requiredCount / totalRequired) * 100);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-left space-y-1">
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {requiredCompleted
                      ? t("allDone")
                      : t("requiredRemaining", { count: totalRequired - requiredCount })}
                  </span>
                  <span className="font-medium">{requiredCount}/{totalRequired}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* View Menu Button */}
          {requiredCompleted && slug && (
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                analytics.onboarding.viewMenu();
                window.open(`/m/${slug}`, "_blank");
              }}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {t("viewMenu")}
            </Button>
          )}

          {/* Required Steps */}
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">{t("requiredSteps")}</h2>
              <p className="text-sm text-muted-foreground">{requiredCount}/{totalRequired} {t("completed").toLowerCase()}</p>
            </div>
            {requiredSteps.map((step) => {
              const isCompleted = progress[step.progressKey];
              return (
                <button
                  key={step.key}
                  onClick={() => handleStepClick(step.key, step.page)}
                  className="w-full flex flex-col p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="font-medium">{t(`steps.${step.key}.name`)}</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {t(`steps.${step.key}.description`)}
                  </span>
                  <span className={`text-sm mt-1 ${
                    isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-500 dark:text-orange-400"
                  }`}>
                    {isCompleted ? t("completed") : t("notCompleted")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Optional Steps */}
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">{t("optionalSteps")}</h2>
              <p className="text-sm text-muted-foreground">{optionalCount}/{totalOptional} {t("completed").toLowerCase()}</p>
            </div>
            {optionalSteps.map((step) => {
              const isCompleted = progress[step.progressKey];
              return (
                <button
                  key={step.key}
                  onClick={() => handleStepClick(step.key, step.page)}
                  className="w-full flex flex-col p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="font-medium">{t(`steps.${step.key}.name`)}</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {t(`steps.${step.key}.description`)}
                  </span>
                  <span className={`text-sm mt-1 ${
                    isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-500 dark:text-orange-400"
                  }`}>
                    {isCompleted ? t("completed") : t("notCompleted")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
