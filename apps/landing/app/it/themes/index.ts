import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";
import { THEME as MENU_DIGITALE } from "./menu-digitale";
import { THEME as QR_CODE_MENU } from "./qr-code-menu";
import { THEME as CREARE_MENU } from "./creare-menu";

export const THEMES: Record<string, LandingTexts> = {
  "menu-digitale": MENU_DIGITALE,
  "qr-code-menu": QR_CODE_MENU,
  "creare-menu": CREARE_MENU,
};

export type ThemeKey = keyof typeof THEMES;

export function pickTheme(raw: string | string[] | undefined): LandingTexts {
  const key = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  if (!key) return DEFAULT;
  return THEMES[key] ?? DEFAULT;
}
