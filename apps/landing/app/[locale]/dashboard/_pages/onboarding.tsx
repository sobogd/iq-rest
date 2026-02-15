"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboard, PAGE_PATHS, type PageKey } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { onboarding as onboardingAnalytics } from "@/lib/analytics";

interface OnboardingProgress {
  hasInfo: boolean;
  hasCategories: boolean;
  hasItems: boolean;
}

interface OnboardingData {
  progress: OnboardingProgress;
  requiredCompleted: boolean;
  slug: string | null;
}

type StepKey = "info" | "menu";

interface Step {
  key: StepKey;
  progressKey: keyof OnboardingProgress;
  page: PageKey;
}

const allSteps: Step[] = [
  { key: "info", progressKey: "hasInfo", page: "settings" },
  { key: "menu", progressKey: "hasItems", page: "menu" },
];

interface OnboardingPageProps {
  initialData: OnboardingData;
}

export function OnboardingPage({ initialData }: OnboardingPageProps) {
  const t = useTranslations("dashboard.onboarding");
  const { setOnboardingCompleted } = useDashboard();
  const router = useRouter();
  const [data, setData] = useState<OnboardingData>(initialData);
  const [currentStep, setCurrentStep] = useState(() => {
    const firstIncomplete = allSteps.findIndex(
      step => !initialData.progress[step.progressKey]
    );
    return firstIncomplete !== -1 ? firstIncomplete : 0;
  });
  const [restaurantName, setRestaurantName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // Find first incomplete step
    const firstIncomplete = allSteps.findIndex(
      step => !initialData.progress[step.progressKey]
    );
    if (firstIncomplete !== -1) {
      onboardingAnalytics.stepView(firstIncomplete + 1);
    } else if (initialData.requiredCompleted) {
      onboardingAnalytics.complete();
      setOnboardingCompleted(true);
      router.replace("/dashboard/home");
    }
  }, []);

  function navigateFromOnboarding(page: PageKey) {
    sessionStorage.setItem("returnToOnboarding", "true");
    router.push(PAGE_PATHS[page]);
  }

  const handleStepClick = (_step: StepKey, page: PageKey) => {
    onboardingAnalytics.stepContinue(currentStep + 1);
    navigateFromOnboarding(page);
  };

  const handleCreateRestaurant = async () => {
    if (!restaurantName.trim()) {
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: restaurantName.trim() }),
      });

      if (res.ok) {
        const result = await res.json();
        onboardingAnalytics.stepContinue(1);
        setData((prev) =>
          prev
            ? {
                ...prev,
                progress: { ...prev.progress, hasInfo: true },
                slug: result.slug,
              }
            : prev
        );
        setCurrentStep(1);
        onboardingAnalytics.stepView(2);
      } else {
        const error = await res.json();
        toast.error(error.error || t("createError"));
      }
    } catch {
      toast.error(t("createError"));
    } finally {
      setCreating(false);
    }
  };

  const { progress } = data;
  const step = allSteps[currentStep];
  const isCompleted = progress[step.progressKey];

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">
              {t("stepIndicator", { current: currentStep + 1, total: allSteps.length })}
            </p>
            <h1 className="text-2xl font-bold">
              {t(`steps.${step.key}.name`)}
            </h1>
            <p className="text-muted-foreground">
              {t(`steps.${step.key}.description`)}
            </p>
          </div>

          <div className="grid gap-4">
            {step.key === "info" && !isCompleted ? (
              <>
                <Input
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder={t("restaurantNamePlaceholder")}
                  disabled={creating}
                  className="h-auto py-2 text-base lg:py-2.5 lg:text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && restaurantName.trim()) {
                      handleCreateRestaurant();
                    }
                  }}
                />
                <Button
                  className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                  onClick={handleCreateRestaurant}
                  disabled={!restaurantName.trim() || creating}
                >
                  {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("continue")}
                </Button>
              </>
            ) : (
              <Button
                className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                onClick={() => handleStepClick(step.key, step.page)}
              >
                {t("continue")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
