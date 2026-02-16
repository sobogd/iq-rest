"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, UtensilsCrossed, Pizza, Fish, Beef, Coffee, Beer, Croissant, Hotel, Sparkles } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import type { LucideIcon } from "lucide-react";

interface RestaurantType {
  type: string;
  translationKey: string;
  icon: LucideIcon;
}

const TYPES: RestaurantType[] = [
  { type: "restaurant", translationKey: "restaurant", icon: UtensilsCrossed },
  { type: "pizzeria", translationKey: "pizzeria", icon: Pizza },
  { type: "sushi-bar", translationKey: "sushi-bar", icon: Fish },
  { type: "burger-joint", translationKey: "burger-joint", icon: Beef },
  { type: "cafe", translationKey: "cafe", icon: Coffee },
  { type: "bar", translationKey: "bar", icon: Beer },
  { type: "bakery", translationKey: "bakery", icon: Croissant },
  { type: "hotel", translationKey: "hotel", icon: Hotel },
  { type: "other", translationKey: "other", icon: Sparkles },
];

export function OnboardingTypePage() {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    track(DashboardEvent.SHOWED_ONBOARDING_TYPE);
  }, []);

  const handleSelect = async (type: string) => {
    track(DashboardEvent.CLICKED_ONBOARDING_TYPE);
    setLoading(type);
    setError(false);

    try {
      const response = await fetch("/api/onboarding/setup-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, locale }),
      });

      if (response.ok) {
        window.location.href = `/${locale}/dashboard`;
      } else {
        setError(true);
        setLoading(null);
      }
    } catch {
      setError(true);
      setLoading(null);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[400px]">
        <div className="grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold">{t("typeTitle")}</h1>
            <p className="text-muted-foreground">
              {t("typeSubtitle")}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center">
              {t("error")}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            {TYPES.map(({ type, translationKey, icon: Icon }) => (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                disabled={loading !== null}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-accent/50 text-accent-foreground hover:bg-accent/70 transition-colors disabled:opacity-50 min-h-[88px]"
              >
                {loading === type ? (
                  <Loader2 className="h-6 w-6 shrink-0 animate-spin text-muted-foreground" />
                ) : (
                  <Icon className="h-6 w-6 shrink-0 text-muted-foreground" />
                )}
                <span className="text-sm font-medium text-center leading-tight line-clamp-2">{t(`types.${translationKey}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
