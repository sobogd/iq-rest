import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";
import { THEME as SPEISEKARTE_DIGITAL } from "./speisekarte-digital";
import { THEME as QR_SPEISEKARTE } from "./qr-speisekarte";
import { THEME as SPEISEKARTE_ERSTELLEN } from "./speisekarte-erstellen";

export const THEMES: Record<string, LandingTexts> = {
  "speisekarte-digital": SPEISEKARTE_DIGITAL,
  "qr-speisekarte": QR_SPEISEKARTE,
  "speisekarte-erstellen": SPEISEKARTE_ERSTELLEN,
};

export type ThemeKey = keyof typeof THEMES;

export function pickTheme(raw: string | string[] | undefined): LandingTexts {
  const key = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  if (!key) return DEFAULT;
  return THEMES[key] ?? DEFAULT;
}
