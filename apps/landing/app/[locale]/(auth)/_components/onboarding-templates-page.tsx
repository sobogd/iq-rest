"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { UtensilsCrossed, Coffee, Beer, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track, DashboardEvent } from "@/lib/dashboard-events";

type TemplateId = "restaurant" | "cafe" | "bar";
type PageState = "idle" | "applying" | "error";

type TemplateShape = Record<TemplateId, { categories: { nameKey: string; items: { nameKey: string; price: number }[] }[] }>;

const TEMPLATES: TemplateShape = {
  restaurant: {
    categories: [
      { nameKey: "tplCatSalads", items: [{ nameKey: "tplItemCaesarSalad", price: 12 }, { nameKey: "tplItemGreekSalad", price: 11 }] },
      { nameKey: "tplCatMainDishes", items: [{ nameKey: "tplItemRibeyeSteak", price: 28 }, { nameKey: "tplItemSalmonFillet", price: 24 }] },
      { nameKey: "tplCatSideDishes", items: [{ nameKey: "tplItemFrenchFries", price: 6 }, { nameKey: "tplItemGrilledVegetables", price: 8 }] },
    ],
  },
  cafe: {
    categories: [
      { nameKey: "tplCatBreakfasts", items: [{ nameKey: "tplItemSalmonToast", price: 14 }, { nameKey: "tplItemPancakes", price: 10 }] },
      { nameKey: "tplCatCoffeeTea", items: [{ nameKey: "tplItemCappuccino", price: 5 }, { nameKey: "tplItemLatte", price: 5 }, { nameKey: "tplItemEarlGrey", price: 4 }] },
      { nameKey: "tplCatDesserts", items: [{ nameKey: "tplItemCheesecake", price: 9 }, { nameKey: "tplItemTiramisu", price: 10 }] },
    ],
  },
  bar: {
    categories: [
      { nameKey: "tplCatCocktails", items: [{ nameKey: "tplItemMargarita", price: 12 }, { nameKey: "tplItemMojito", price: 11 }, { nameKey: "tplItemOldFashioned", price: 14 }] },
      { nameKey: "tplCatBeer", items: [{ nameKey: "tplItemLager", price: 7 }, { nameKey: "tplItemIPA", price: 8 }, { nameKey: "tplItemStout", price: 8 }] },
      { nameKey: "tplCatBarSnacks", items: [{ nameKey: "tplItemNachos", price: 10 }, { nameKey: "tplItemCroutons", price: 7 }, { nameKey: "tplItemMixedNuts", price: 6 }] },
    ],
  },
};

export function OnboardingTemplatesPage({ restaurantName }: { restaurantName: string }) {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");

  const [pageState, setPageState] = useState<PageState>("idle");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef({ startTime: 0, done: false });
  const rafRef = useRef<number | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    track(DashboardEvent.SHOWED_ONBOARDING_TEMPLATES);
  }, []);

  // Animated progress bar
  useEffect(() => {
    if (pageState !== "applying") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    progressRef.current = { startTime: Date.now(), done: false };
    setProgress(0);
    const phase1 = 8_000;
    const phase2 = 8_000;
    function tick() {
      if (progressRef.current.done) return;
      const elapsed = Date.now() - progressRef.current.startTime;
      let pct: number;
      if (elapsed < phase1) {
        pct = (elapsed / phase1) * 90;
      } else {
        pct = 90 + ((elapsed - phase1) / phase2) * 10;
      }
      setProgress(Math.min(pct, 99.5));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [pageState]);

  // Auto-reset error after 5s
  useEffect(() => {
    if (pageState === "error") {
      errorTimerRef.current = setTimeout(() => setPageState("idle"), 5000);
      return () => { if (errorTimerRef.current) clearTimeout(errorTimerRef.current); };
    }
  }, [pageState]);

  const handleApplyTemplate = useCallback(async (templateId: TemplateId) => {
    const eventMap: Record<TemplateId, DashboardEvent> = {
      restaurant: DashboardEvent.CLICKED_TEMPLATE_RESTAURANT,
      cafe: DashboardEvent.CLICKED_TEMPLATE_CAFE,
      bar: DashboardEvent.CLICKED_TEMPLATE_BAR,
    };
    track(eventMap[templateId]);
    setPageState("applying");

    try {
      const template = TEMPLATES[templateId];
      for (const cat of template.categories) {
        const catRes = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: t(cat.nameKey as Parameters<typeof t>[0]) }),
        });
        if (!catRes.ok) throw new Error("Failed to create category");
        const { id: categoryId } = await catRes.json();

        for (const item of cat.items) {
          const itemRes = await fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: t(item.nameKey as Parameters<typeof t>[0]), price: item.price, categoryId }),
          });
          if (!itemRes.ok) throw new Error("Failed to create item");
        }
      }

      progressRef.current.done = true;
      track(DashboardEvent.TEMPLATE_APPLY_SUCCESS, { template: templateId });
      window.location.href = `/${locale}/dashboard`;
    } catch {
      progressRef.current.done = true;
      track(DashboardEvent.TEMPLATE_APPLY_ERROR, { template: templateId });
      setPageState("error");
    }
  }, [locale, t]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 md:p-10">
      <div className="w-full max-w-[320px] min-w-0">
        {pageState === "idle" && (
          <div className="grid gap-3">
            <div className="mb-3">
              <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
              <p className="text-lg text-muted-foreground mt-1">{t("templatesSubtitle")}</p>
            </div>

            <button
              type="button"
              onClick={() => handleApplyTemplate("restaurant")}
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
              onClick={() => handleApplyTemplate("cafe")}
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
              onClick={() => handleApplyTemplate("bar")}
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
        )}

        {pageState === "applying" && (
          <div className="grid gap-6">
            <div>
              <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
              <p className="text-lg text-muted-foreground mt-1">{t("templatesSubtitle")}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-base font-semibold mb-1">{t("templateApplying")}</h2>
                <p className="text-sm text-muted-foreground mb-4">{t("templateApplyingSubtitle")}</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {pageState === "error" && (
          <div className="grid gap-6">
            <div>
              <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
              <p className="text-lg text-muted-foreground mt-1">{t("templatesSubtitle")}</p>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="h-10 w-10 text-destructive mb-3" />
                <p className="text-sm text-destructive font-medium">{t("error")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
