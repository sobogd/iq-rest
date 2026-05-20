"use client";

import { useTranslations } from "next-intl";
import { analytics } from "@/lib/analytics";
import { CUISINE_KEYS, CUISINE_META, type CuisineKey } from "./cuisine";

export function CuisineStep({
  selected,
  onSelect,
  onContinue,
}: {
  selected: CuisineKey | null;
  onSelect: (c: CuisineKey) => void;
  onContinue: () => void;
}) {
  const t = useTranslations("createFlow");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (selected) onContinue();
      }}
      className="flex flex-col"
    >
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight mb-2">
        {t("step1.title")}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-snug mb-6">
        {t("step1.subtitle")}
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        {CUISINE_KEYS.map((key) => {
          const isActive = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              onFocus={() => analytics.track(`l_onb_cuisine_focus_${key}`)}
              className={`flex items-center gap-3 h-14 px-4 rounded-xl border text-left transition-all ${
                isActive
                  ? "border-foreground bg-foreground/5"
                  : "border-border hover:border-foreground/60"
              }`}
            >
              <span className="text-2xl" aria-hidden>
                {CUISINE_META[key].emoji}
              </span>
              <span className="text-sm font-medium tracking-tight truncate">
                {t(`cuisines.${key}`)}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={!selected}
        className="mt-7 h-12 w-full text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-xl hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {t("continue")}
      </button>
    </form>
  );
}
