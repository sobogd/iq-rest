"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboard, PageKey } from "../_context/dashboard-context";
import {
  Eye,
  Loader2,
  ArrowRight,
  QrCode,
  Palette,
  Phone,
  Languages,
  Settings,
} from "lucide-react";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
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

type StepKey = "info" | "categories" | "items";

interface Step {
  key: StepKey;
  progressKey: keyof OnboardingProgress;
  page: PageKey;
}

const allSteps: Step[] = [
  { key: "info", progressKey: "hasInfo", page: "settings" },
  { key: "categories", progressKey: "hasCategories", page: "categories" },
  { key: "items", progressKey: "hasItems", page: "items" },
];

interface NextStep {
  key: string;
  page: PageKey;
  icon: React.ComponentType<{ className?: string }>;
}

const nextSteps: NextStep[] = [
  { key: "contacts", page: "contacts", icon: Phone },
  { key: "settings", page: "settings", icon: Settings },
  { key: "design", page: "design", icon: Palette },
  { key: "languages", page: "languages", icon: Languages },
  { key: "qrMenu", page: "qrMenu", icon: QrCode },
];

export function OnboardingPage() {
  const t = useTranslations("dashboard.onboarding");
  const { navigateFromOnboarding, setActivePage } = useDashboard();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch("/api/onboarding/progress");
        if (response.ok) {
          const result = await response.json();
          setData(result);

          // Find first incomplete step
          const firstIncomplete = allSteps.findIndex(
            step => !result.progress[step.progressKey]
          );
          if (firstIncomplete !== -1) {
            setCurrentStep(firstIncomplete);
            // Track initial step view
            onboardingAnalytics.stepView(firstIncomplete + 1);
          } else if (result.requiredCompleted) {
            // Track completed onboarding view
            onboardingAnalytics.complete();
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
        // Track continue click for step 1
        onboardingAnalytics.stepContinue(1);
        // Update local data to reflect restaurant was created
        setData((prev) =>
          prev
            ? {
                ...prev,
                progress: { ...prev.progress, hasInfo: true },
                slug: result.slug,
              }
            : prev
        );
        // Move to next step and track view
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

  // Show completed view when all steps are done
  if (allCompleted && slug) {
    return (
      <div className="flex h-full flex-col p-6 overflow-auto">
        <div className="w-full max-w-[280px]">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">{t("completedTitle")}</h1>
              <p className="text-muted-foreground">{t("completedSubtitle")}</p>
            </div>

            <MenuPreviewModal menuUrl={`/m/${slug}`}>
              <Button className="w-full h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg">
                <Eye className="mr-2 h-4 w-4" />
                {t("viewMenu")}
              </Button>
            </MenuPreviewModal>

            <div className="grid gap-2">
              {nextSteps.map((nextStep) => (
                <button
                  key={nextStep.key}
                  onClick={() => setActivePage(nextStep.page)}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
                >
                  <nextStep.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{t(`nextSteps.${nextStep.key}.title`)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
