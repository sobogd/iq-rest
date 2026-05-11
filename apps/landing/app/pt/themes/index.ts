import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";
import { THEME as EMENTA_DIGITAL } from "./ementa-digital";
import { THEME as CARDAPIO_DIGITAL } from "./cardapio-digital";
import { THEME as MENU_DIGITAL } from "./menu-digital";
import { THEME as CRIAR_QR_MENU } from "./criar-qr-menu";

export const THEMES: Record<string, LandingTexts> = {
  "ementa-digital": EMENTA_DIGITAL,
  "cardapio-digital": CARDAPIO_DIGITAL,
  "menu-digital": MENU_DIGITAL,
  "criar-qr-menu": CRIAR_QR_MENU,
};

export type ThemeKey = keyof typeof THEMES;

export function pickTheme(raw: string | string[] | undefined): LandingTexts {
  const key = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  if (!key) return DEFAULT;
  return THEMES[key] ?? DEFAULT;
}
