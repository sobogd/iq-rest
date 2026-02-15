"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { onboarding as onboardingAnalytics } from "@/lib/analytics";
import { useDashboard, PAGE_PATHS } from "../_context/dashboard-context";
import { ExternalLink } from "lucide-react";

const TOTAL_STEPS = 3;

// ---- Step 1: Restaurant Name ----

export function OnboardingInfoStep() {
  const t = useTranslations("dashboard.onboarding");
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateRestaurant = async () => {
    if (!restaurantName.trim()) return;

    setCreating(true);
    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: restaurantName.trim() }),
      });

      if (res.ok) {
        onboardingAnalytics.stepContinue(1);
        router.push("/dashboard/onboarding/menu");
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

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">
              {t("stepIndicator", { current: 1, total: TOTAL_STEPS })}
            </p>
            <h1 className="text-2xl font-bold">{t("steps.info.name")}</h1>
            <p className="text-muted-foreground">{t("steps.info.description")}</p>
          </div>

          <div className="grid gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Step 2: Build Menu ----

export function OnboardingMenuStep() {
  const t = useTranslations("dashboard.onboarding");
  const router = useRouter();

  const handleContinue = () => {
    onboardingAnalytics.stepContinue(2);
    sessionStorage.setItem("returnToOnboarding", "/dashboard/onboarding/contacts");
    router.push(PAGE_PATHS.menu);
  };

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">
              {t("stepIndicator", { current: 2, total: TOTAL_STEPS })}
            </p>
            <h1 className="text-2xl font-bold">{t("steps.menu.name")}</h1>
            <p className="text-muted-foreground">{t("steps.menu.description")}</p>
          </div>

          <div className="grid gap-4">
            <Button
              className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
              onClick={handleContinue}
            >
              {t("continue")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Step 3: Add Contacts ----

export function OnboardingContactsStep() {
  const t = useTranslations("dashboard.onboarding");
  const router = useRouter();

  const handleContinue = () => {
    onboardingAnalytics.stepContinue(3);
    sessionStorage.setItem("returnToOnboarding", "/dashboard/onboarding/done");
    router.push(PAGE_PATHS.contacts);
  };

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">
              {t("stepIndicator", { current: 3, total: TOTAL_STEPS })}
            </p>
            <h1 className="text-2xl font-bold">{t("steps.contacts.name")}</h1>
            <p className="text-muted-foreground">{t("steps.contacts.description")}</p>
          </div>

          <div className="grid gap-4">
            <Button
              className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
              onClick={handleContinue}
            >
              {t("continue")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Done: Completion Screen ----

interface OnboardingDoneStepProps {
  slug: string;
}

const NEXT_STEPS = ["settings", "design", "languages", "qrMenu"] as const;

export function OnboardingDoneStep({ slug }: OnboardingDoneStepProps) {
  const t = useTranslations("dashboard.onboarding");
  const { setOnboardingCompleted } = useDashboard();
  const router = useRouter();

  const handleGoToDashboard = () => {
    onboardingAnalytics.complete();
    setOnboardingCompleted(true);
    router.replace("/dashboard/home");
  };

  const handleNextStep = (key: string) => {
    onboardingAnalytics.complete();
    setOnboardingCompleted(true);
    const path = PAGE_PATHS[key as keyof typeof PAGE_PATHS];
    if (path) router.push(path);
  };

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="w-full max-w-[320px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">{t("completedSubtitle")}</h1>
            <p className="text-muted-foreground">{t("completedTitle")}</p>
          </div>

          {slug && (
            <a
              href={`/m/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {t("viewMenu")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          <div className="grid gap-3">
            {NEXT_STEPS.map((key) => (
              <button
                key={key}
                onClick={() => handleNextStep(key)}
                className="rounded-lg border p-3 text-left transition-colors hover:bg-accent"
              >
                <p className="text-sm font-medium">
                  {t(`nextSteps.${key}.title`)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(`nextSteps.${key}.description`)}
                </p>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
            onClick={handleGoToDashboard}
          >
            {t("goToDashboard")}
          </Button>
        </div>
      </div>
    </div>
  );
}
