import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";
import { THEME as MENU_DIGITAL } from "./menu-digital";
import { THEME as CARTA_DIGITAL } from "./carta-digital";
import { THEME as CODIGO_QR } from "./codigo-qr";

export const THEMES: Record<string, LandingTexts> = {
  "menu-digital": MENU_DIGITAL,
  "carta-digital": CARTA_DIGITAL,
  "codigo-qr": CODIGO_QR,
  "qr-menu": DEFAULT,
};

export type ThemeKey = keyof typeof THEMES;

export function pickTheme(raw: string | string[] | undefined): LandingTexts {
  const key = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  if (!key) return DEFAULT;
  return THEMES[key] ?? DEFAULT;
}
