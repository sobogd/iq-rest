"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useDashboard, PageKey } from "../_context/dashboard-context";
import { ChevronLeft, ChevronRight, ExternalLink, Loader2, Check, ArrowRight } from "lucide-react";
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

const allSteps: Step[] = [
  { key: "title", progressKey: "hasTitle", page: "settings" },
  { key: "slug", progressKey: "hasSlug", page: "settings" },
  { key: "categories", progressKey: "hasCategories", page: "categories" },
  { key: "items", progressKey: "hasItems", page: "items" },
  { key: "contacts", progressKey: "hasContacts", page: "contacts" },
  { key: "translations", progressKey: "hasTranslations", page: "languages" },
  { key: "design", progressKey: "hasDesign", page: "design" },
  { key: "reservations", progressKey: "hasReservations", page: "reservationSettings" },
];

export function OnboardingPage() {
  const t = useTranslations("dashboard.onboarding");
  const { navigateFromOnboarding } = useDashboard();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch("/api/onboarding/progress");
        if (response.ok) {
          const result = await response.json();
          setData(result);
          analytics.onboarding.viewOnboarding();

          // Find first incomplete step
          const firstIncomplete = allSteps.findIndex(
            step => !result.progress[step.progressKey]
          );
          if (firstIncomplete !== -1) {
            setCurrentStep(firstIncomplete);
          }

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

  const goToPrevious = () => {
    if (currentStep > 0) {
      const fromStep = allSteps[currentStep].key;
      const toStep = allSteps[currentStep - 1].key;
      analytics.onboarding.navigatePrev(fromStep, toStep);
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (currentStep < allSteps.length - 1) {
      const fromStep = allSteps[currentStep].key;
      const toStep = allSteps[currentStep + 1].key;
      analytics.onboarding.navigateNext(fromStep, toStep);
      setCurrentStep(currentStep + 1);
    }
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

  const { progress, slug } = data;
  const step = allSteps[currentStep];
  const isCompleted = progress[step.progressKey];
  const completedCount = allSteps.filter(s => progress[s.progressKey]).length;
  const allCompleted = completedCount === allSteps.length;

  return (
    <div className="flex flex-col h-full">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentStep + 1} / {allSteps.length}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          disabled={currentStep === allSteps.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            {isCompleted ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                <Check className="h-4 w-4" />
                {t("completed")}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium">
                {t("notCompleted")}
              </div>
            )}
          </div>

          {/* Step Title */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">
              {t(`steps.${step.key}.name`)}
            </h1>
            <p className="text-muted-foreground">
              {t(`steps.${step.key}.description`)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="px-6 pt-4 pb-6 bg-background shrink-0">
        <div className="max-w-md mx-auto">
          {allCompleted && slug ? (
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
          ) : (
            <Button
              className="w-full"
              size="lg"
              onClick={() => handleStepClick(step.key, step.page)}
            >
              {t(`steps.${step.key}.name`)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
