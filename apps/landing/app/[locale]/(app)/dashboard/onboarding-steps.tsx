"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepTranslation {
  title: string;
  description: string;
  button: string;
}

interface ExtraStepTranslation {
  title: string;
  description: string;
  button?: string;
  button2?: string;
}

interface OnboardingStepsProps {
  data: {
    steps: {
      restaurant: boolean;
      category: boolean;
      item: boolean;
      qrCode: boolean;
    };
    slug: string | null;
  };
  translations: {
    title: string;
    steps: {
      restaurant: StepTranslation;
      category: StepTranslation;
      item: StepTranslation;
      qrCode: StepTranslation;
    };
    extraSteps: {
      translations: ExtraStepTranslation;
      reservations: ExtraStepTranslation;
      analytics: ExtraStepTranslation;
    };
    completed: string;
  };
}

const STEP_KEYS = ["restaurant", "category", "item", "qrCode"] as const;
type StepKey = (typeof STEP_KEYS)[number];

const STEP_LINKS: Record<StepKey, string> = {
  restaurant: "/dashboard/settings?from=onboarding",
  category: "/dashboard/categories/new?from=onboarding",
  item: "/dashboard/items/new?from=onboarding",
  qrCode: "/dashboard/qr-code",
};

export function OnboardingSteps({ data, translations: t }: OnboardingStepsProps) {
  // Find the first incomplete step, or show last step if all complete
  const firstIncompleteIndex = STEP_KEYS.findIndex((key) => !data.steps[key]);
  const activeStep = firstIncompleteIndex === -1 ? STEP_KEYS[STEP_KEYS.length - 1] : STEP_KEYS[firstIncompleteIndex];

  const getStepStatus = (step: StepKey, index: number): "completed" | "active" | "locked" => {
    if (data.steps[step]) return "completed";

    const previousCompleted = STEP_KEYS.slice(0, index).every((key) => data.steps[key]);
    return previousCompleted ? "active" : "locked";
  };

  const showExtraSteps = data.steps.restaurant && data.steps.category && data.steps.item;

  return (
    <div className="space-y-2 pb-6">
      {STEP_KEYS.map((step, index) => {
        const status = getStepStatus(step, index);
        const isOpen = activeStep === step;
        const stepT = t.steps[step];

        return (
          <div
            key={step}
            className={cn(
              "rounded-lg border overflow-hidden transition-colors",
              status === "completed" && "border-primary/50 bg-primary/5",
              status === "locked" && "opacity-50"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
              {/* Step indicator */}
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                  status === "completed" && "bg-primary text-primary-foreground",
                  status === "active" && "bg-primary text-primary-foreground",
                  status === "locked" && "bg-muted text-muted-foreground"
                )}
              >
                {status === "completed" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Title */}
              <span
                className={cn(
                  "flex-1 font-medium",
                  status === "locked" && "text-muted-foreground"
                )}
              >
                {stepT.title}
              </span>
            </div>

            {/* Content */}
            {isOpen && (
              <div className="px-4 pb-4 pt-0">
                <div className="pl-10">
                  <p className="text-sm text-muted-foreground">
                    {stepT.description}
                  </p>
                  <Link href={STEP_LINKS[step]}>
                    <Button size="sm" className="mt-4">{stepT.button}</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Extra steps - shown when menu is ready */}
      {showExtraSteps && (
        <>
          {/* Translations step */}
          <div className="rounded-lg border overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0 bg-muted text-muted-foreground">
                5
              </div>
              <span className="flex-1 font-medium">
                {t.extraSteps.translations.title}
              </span>
            </div>
            <div className="px-4 pb-4 pt-0">
              <div className="pl-10">
                <p className="text-sm text-muted-foreground">
                  {t.extraSteps.translations.description}
                </p>
                {t.extraSteps.translations.button && (
                  <Link href="/dashboard/translations">
                    <Button size="sm" variant="outline" className="mt-4">{t.extraSteps.translations.button}</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Reservations step */}
          <div className="rounded-lg border overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0 bg-muted text-muted-foreground">
                6
              </div>
              <span className="flex-1 font-medium">
                {t.extraSteps.reservations.title}
              </span>
            </div>
            <div className="px-4 pb-4 pt-0">
              <div className="pl-10">
                <p className="text-sm text-muted-foreground">
                  {t.extraSteps.reservations.description}
                </p>
                <div className="flex gap-2 mt-4">
                  {t.extraSteps.reservations.button && (
                    <Link href="/dashboard/settings">
                      <Button size="sm" variant="outline">{t.extraSteps.reservations.button}</Button>
                    </Link>
                  )}
                  {t.extraSteps.reservations.button2 && (
                    <Link href="/dashboard/tables">
                      <Button size="sm" variant="outline">{t.extraSteps.reservations.button2}</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Analytics step */}
          <div className="rounded-lg border overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0 bg-muted text-muted-foreground">
                7
              </div>
              <span className="flex-1 font-medium">
                {t.extraSteps.analytics.title}
              </span>
            </div>
            <div className="px-4 pb-4 pt-0">
              <div className="pl-10">
                <p className="text-sm text-muted-foreground">
                  {t.extraSteps.analytics.description}
                </p>
                <div className="flex gap-2 mt-4">
                  {t.extraSteps.analytics.button && (
                    <Link href="/dashboard/analytics">
                      <Button size="sm" variant="outline">{t.extraSteps.analytics.button}</Button>
                    </Link>
                  )}
                  {t.extraSteps.analytics.button2 && (
                    <Link href="/dashboard/support">
                      <Button size="sm" variant="outline">{t.extraSteps.analytics.button2}</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
