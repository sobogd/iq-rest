"use client";

// Page-local replacement for next-intl's message context. The per-locale
// layouts (via <LandingI18nWrap>) and app/[locale]/layout.tsx put the locale's
// `common` + `auth` copy from its texts.json here (loaded through
// getLandingChrome, EN fallback for locales whose landing isn't built yet), so
// client components read strings without messages/<locale>.json.

import { createContext, useContext } from "react";
import type { AuthTexts, CommonTexts } from "../types";

export type LandingStrings = {
  locale: string;
  common: CommonTexts;
  auth: AuthTexts;
};

const LandingStringsContext = createContext<LandingStrings | null>(null);

export function LandingStringsProvider({
  value,
  children,
}: {
  value: LandingStrings;
  children: React.ReactNode;
}) {
  return (
    <LandingStringsContext.Provider value={value}>{children}</LandingStringsContext.Provider>
  );
}

function useLandingStrings(): LandingStrings {
  const ctx = useContext(LandingStringsContext);
  if (!ctx) {
    throw new Error("LandingStringsProvider is missing above this component");
  }
  return ctx;
}

export function useLandingLocale(): string {
  return useLandingStrings().locale;
}

export function useCommonTexts(): CommonTexts {
  return useLandingStrings().common;
}

export function useAuthTexts(): AuthTexts {
  return useLandingStrings().auth;
}
