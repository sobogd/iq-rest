"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { UtensilsCrossed, Coffee, Beer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track, DashboardEvent, setDashboardUserId } from "@/lib/dashboard-events";
import { analytics } from "@/lib/analytics";

type TemplateId = "restaurant" | "cafe" | "bar";

export function OnboardingTemplatesPage({ restaurantName, userId }: { restaurantName: string; userId: string }) {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");

  useEffect(() => {
    setDashboardUserId(userId);
    analytics.linkSession(userId);
    track(DashboardEvent.SHOWED_ONBOARDING_TEMPLATES);
  }, [userId]);

  function handleSelect(templateId: TemplateId) {
    const eventMap: Record<TemplateId, DashboardEvent> = {
      restaurant: DashboardEvent.CLICKED_TEMPLATE_RESTAURANT,
      cafe: DashboardEvent.CLICKED_TEMPLATE_CAFE,
      bar: DashboardEvent.CLICKED_TEMPLATE_BAR,
    };
    track(eventMap[templateId]);
    window.location.href = `/${locale}/onboarding/templates/${templateId}`;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 md:p-10">
      <div className="w-full max-w-[320px] min-w-0">
        <div className="grid gap-3">
          <div className="mb-3">
            <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
            <p className="text-lg text-muted-foreground mt-1">{t("templatesSubtitle")}</p>
          </div>

          <button
            type="button"
            onClick={() => handleSelect("restaurant")}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground shrink-0" />
              {t("templateRestaurantTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("templateRestaurantDescription")}</p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background w-full pointer-events-none">
              {t("templateUseButton")}
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelect("cafe")}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Coffee className="h-4 w-4 text-muted-foreground shrink-0" />
              {t("templateCafeTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("templateCafeDescription")}</p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background w-full pointer-events-none">
              {t("templateUseButton")}
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelect("bar")}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Beer className="h-4 w-4 text-muted-foreground shrink-0" />
              {t("templateBarTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("templateBarDescription")}</p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background w-full pointer-events-none">
              {t("templateUseButton")}
            </div>
          </button>

          <Button
            variant="ghost"
            size="sm"
            className="mt-1 w-fit"
            onClick={() => { track(DashboardEvent.CLICKED_ONBOARDING_BACK); window.location.href = `/${locale}/onboarding/menu`; }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
