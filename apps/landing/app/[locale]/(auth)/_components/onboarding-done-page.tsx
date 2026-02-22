"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus, Check } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";

export function OnboardingDonePage({
  restaurantName,
  categoryId,
}: {
  restaurantName: string;
  categoryId?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");

  useEffect(() => {
    track(DashboardEvent.SHOWED_ONBOARDING_DONE);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 md:p-10">
      <div className="w-full max-w-[320px] min-w-0">
        <div className="grid gap-3">
          <div className="mb-3">
            <h1 className="text-[28px] leading-tight font-bold">
              {restaurantName}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              {t("doneSubtitle")}
            </p>
          </div>

          {/* Add another item */}
          {categoryId && (
            <button
              type="button"
              onClick={() => {
                track(DashboardEvent.CLICKED_ONBOARDING_ADD_ITEM);
                window.location.href = `/${locale}/onboarding/item?categoryId=${categoryId}`;
              }}
              className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
            >
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                {t("doneAddItemTitle")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("doneAddItemDescription")}
              </p>
              <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background w-full pointer-events-none">
                {t("doneAddItemButton")}
              </div>
            </button>
          )}

          {/* Add another category */}
          <button
            type="button"
            onClick={() => {
              track(DashboardEvent.CLICKED_ONBOARDING_ADD_CATEGORY);
              window.location.href = `/${locale}/onboarding/category?from=done`;
            }}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
              {t("doneAddCategoryTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("doneAddCategoryDescription")}
            </p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background w-full pointer-events-none">
              {t("doneAddCategoryButton")}
            </div>
          </button>

          {/* Open dashboard */}
          <button
            type="button"
            onClick={() => {
              track(DashboardEvent.CLICKED_ONBOARDING_FINISH);
              window.location.href = `/${locale}/dashboard`;
            }}
            className="grid gap-1.5 text-left rounded-xl border border-border bg-muted/30 px-4 py-4 cursor-pointer transition-colors active:bg-muted/60 hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Check className="h-4 w-4 text-[#E63946] shrink-0" />
              {t("doneFinishTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("doneFinishDescription")}
            </p>
            <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-[#E63946] text-white w-full pointer-events-none">
              {t("doneFinishButton")}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
