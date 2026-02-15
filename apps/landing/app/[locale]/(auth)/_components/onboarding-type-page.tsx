"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Loader2, UtensilsCrossed, Pizza, Fish, Beef, Coffee, Beer, Croissant, Hotel, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface RestaurantType {
  type: string;
  label: string;
  icon: LucideIcon;
}

const TYPES: RestaurantType[] = [
  { type: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { type: "pizzeria", label: "Pizzeria", icon: Pizza },
  { type: "sushi-bar", label: "Sushi Bar", icon: Fish },
  { type: "burger-joint", label: "Burger Joint", icon: Beef },
  { type: "cafe", label: "Cafe", icon: Coffee },
  { type: "bar", label: "Bar", icon: Beer },
  { type: "bakery", label: "Bakery", icon: Croissant },
  { type: "hotel", label: "Hotel", icon: Hotel },
  { type: "other", label: "Other", icon: Sparkles },
];

export function OnboardingTypePage() {
  const locale = useLocale();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelect = async (type: string) => {
    setLoading(type);

    try {
      const response = await fetch("/api/onboarding/setup-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        window.location.href = `/${locale}/dashboard`;
      } else {
        setLoading(null);
      }
    } catch {
      setLoading(null);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[400px]">
        <div className="grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold">What type of place do you run?</h1>
            <p className="text-muted-foreground">
              We&apos;ll set up a ready-made menu for you
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {TYPES.map(({ type, label, icon: Icon }) => (
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
                <span className="text-sm font-medium text-center leading-tight line-clamp-2">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
