"use client";

import { useTranslations } from "next-intl";

export function OnboardingPage() {
  const t = useTranslations("dashboard.pages");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        <p className="text-muted-foreground">{t("onboarding")} - Coming soon</p>
      </div>
    </div>
  );
}
