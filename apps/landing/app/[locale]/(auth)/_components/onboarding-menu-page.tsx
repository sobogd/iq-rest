"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Camera, Wand2, LayoutTemplate, Pencil } from "lucide-react";
import { track, DashboardEvent, setDashboardUserId } from "@/lib/dashboard-events";
import { analytics } from "@/lib/analytics";

export function OnboardingMenuPage({ restaurantName, userId }: { restaurantName: string; userId: string }) {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");

  useEffect(() => {
    setDashboardUserId(userId);
    analytics.linkSession(userId);
    track(DashboardEvent.SHOWED_ONBOARDING_MENU);
  }, [userId]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 md:p-10">
      <div className="w-full max-w-[320px] min-w-0">
        <div className="grid gap-3">
          <div className="mb-3">
            <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
            <p className="text-lg text-muted-foreground mt-1">{t("menuSubtitle")}</p>
          </div>

          {/* AI Instant Import */}
          <button
            type="button"
            onClick={() => {
              track(DashboardEvent.CLICKED_ONBOARDING_SCAN);
              window.location.href = `/${locale}/onboarding/scan`;
            }}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary shrink-0" />
              {t("aiImportTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("aiImportDescription")}</p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-white w-full pointer-events-none">
              <Camera className="h-4 w-4" />
              {t("aiImportButton")}
            </div>
          </button>

          {/* Industry Templates */}
          <button
            type="button"
            onClick={() => {
              track(DashboardEvent.CLICKED_ONBOARDING_TEMPLATES);
              window.location.href = `/${locale}/onboarding/templates`;
            }}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-muted-foreground shrink-0" />
              {t("templatesTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("templatesDescription")}</p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background w-full pointer-events-none">
              {t("templatesButton")}
            </div>
          </button>

          {/* Manual Builder */}
          <button
            type="button"
            onClick={async () => {
              track(DashboardEvent.CLICKED_ONBOARDING_MANUAL);
              await fetch("/api/onboarding/complete", { method: "POST" }).catch(() => {});
              window.location.href = `/${locale}/dashboard`;
            }}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Pencil className="h-4 w-4 text-muted-foreground shrink-0" />
              {t("manualTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("manualDescription")}</p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background w-full pointer-events-none">
              {t("manualButton")}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
