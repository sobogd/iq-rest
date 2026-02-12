"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useDashboard, PageKey } from "../_context/dashboard-context";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Check,
  ArrowRight,
  QrCode,
  FolderOpen,
  Package,
  Palette,
  Phone,
  Languages,
  BarChart3,
} from "lucide-react";
import { MenuPreviewModal } from "@/components/menu-preview-modal";

interface OnboardingProgress {
  hasInfo: boolean;
  hasCategories: boolean;
  hasItems: boolean;
  hasContacts: boolean;
}

interface OnboardingData {
  progress: OnboardingProgress;
  requiredCompleted: boolean;
  slug: string | null;
}

type StepKey = "info" | "categories" | "items" | "contacts";

interface Step {
  key: StepKey;
  progressKey: keyof OnboardingProgress;
  page: PageKey;
}

const allSteps: Step[] = [
  { key: "info", progressKey: "hasInfo", page: "settings" },
  { key: "categories", progressKey: "hasCategories", page: "categories" },
  { key: "items", progressKey: "hasItems", page: "items" },
  { key: "contacts", progressKey: "hasContacts", page: "contacts" },
];

interface QuickAction {
  key: string;
  page: PageKey;
  icon: React.ComponentType<{ className?: string }>;
}

const quickActions: QuickAction[] = [
  { key: "qrMenu", page: "qrMenu", icon: QrCode },
  { key: "categories", page: "categories", icon: FolderOpen },
  { key: "items", page: "items", icon: Package },
  { key: "design", page: "design", icon: Palette },
  { key: "contacts", page: "contacts", icon: Phone },
  { key: "languages", page: "languages", icon: Languages },
  { key: "analytics", page: "analytics", icon: BarChart3 },
];

export function OnboardingPage() {
  const t = useTranslations("dashboard.onboarding");
  const { navigateFromOnboarding, setActivePage } = useDashboard();
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

          // Find first incomplete step
          const firstIncomplete = allSteps.findIndex(
            step => !result.progress[step.progressKey]
          );
          if (firstIncomplete !== -1) {
            setCurrentStep(firstIncomplete);
          }

          if (result.requiredCompleted) {

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
    navigateFromOnboarding(page);
  };

  const goToPrevious = () => {
    if (currentStep > 0) {

      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (currentStep < allSteps.length - 1) {

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

  // Show completed view when all steps are done
  if (allCompleted && slug) {
    return (
      <div className="flex flex-col h-full overflow-auto">
        {/* Header with View Restaurant button */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
            <Check className="h-5 w-5" />
            <span className="font-medium">{t("allDone")}</span>
          </div>
          <MenuPreviewModal menuUrl={`/m/${slug}`}>
            <Button className="w-full" size="lg">
              <Eye className="mr-2 h-4 w-4" />
              {t("viewMenu")}
            </Button>
          </MenuPreviewModal>
        </div>

        {/* Quick Actions */}
        <div className="flex-1 px-6 pb-6">
          <div className="grid gap-3">
            {quickActions.map((action) => (
              <button
                key={action.key}
                onClick={() => setActivePage(action.page)}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{t(`quickActions.${action.key}.name`)}</p>
                  <p className="text-sm text-muted-foreground">{t(`quickActions.${action.key}.description`)}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <Button
            className="w-full"
            size="lg"
            onClick={() => handleStepClick(step.key, step.page)}
          >
            {t(`steps.${step.key}.name`)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
