"use client";

import { useEffect, useState } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { analytics } from "@/lib/analytics";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import { LanguageSwitcherModal } from "@/components/language-switcher/modal";

interface HeroBrandBarControlsProps {
  locale: string;
}

const CONTROL_CLASS =
  "inline-flex items-center justify-center h-9 w-9 border border-border rounded-lg text-muted-foreground sm:hover:text-foreground sm:hover:border-foreground/40 transition-colors";

// Light/dark toggle. NextThemesProvider's defaultTheme is "system", so on
// first mount we promote that to the actual resolved scheme (light or
// dark) and drop the system mode entirely — visitor lands on the variant
// that matches their OS, the button then just flips light ↔ dark.
function ThemeCycleButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted && theme === "system") {
      setTheme(resolvedTheme === "dark" ? "dark" : "light");
    }
  }, [mounted, theme, resolvedTheme, setTheme]);

  const current = mounted ? resolvedTheme ?? "light" : "light";
  const next = current === "dark" ? "light" : "dark";
  const Icon = current === "dark" ? Sun : Moon;
  const label = current === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => {
        analytics.track(`land_hero_theme_click_${current}_to_${next}`);
        setTheme(next);
      }}
      className={CONTROL_CLASS}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

// Theme + language pair. Isolated from the rest of the hero brand bar so
// the parent (logo + layout chrome) stays in SSR — only this small
// island ships JS for the modal + theme state.
export function HeroBrandBarControls({ locale }: HeroBrandBarControlsProps) {
  const cookieTexts = getCookieTexts(locale);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <ThemeCycleButton />
      <button
        type="button"
        onClick={() => {
          analytics.track("land_hero_language_click");
          setLangOpen(true);
        }}
        className={CONTROL_CLASS}
        aria-label={cookieTexts.languageSwitcher}
        title={cookieTexts.languageSwitcher}
      >
        <Globe className="h-4 w-4" />
      </button>
      <LanguageSwitcherModal
        open={langOpen}
        onClose={() => setLangOpen(false)}
        currentLocale={locale}
        title={cookieTexts.languageSwitcher}
      />
    </div>
  );
}
