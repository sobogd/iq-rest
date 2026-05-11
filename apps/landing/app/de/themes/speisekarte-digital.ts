import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Digitale Speisekarte für Restaurants — ab 6,90€/Monat | IQ Rest",
    description:
      "Erstelle deine digitale Speisekarte mit QR-Code für dein Restaurant. Direktbestellungen ohne Provision, 35 Sprachen mit KI, Reservierungen 24/7. In 5 Min fertig.",
    ogTitle: "Digitale Speisekarte für Restaurants — ab 6,90€/Monat",
    ogDescription:
      "Digitale Speisekarte mit QR-Code. Direktbestellungen ohne Provision, 35 Sprachen mit KI. In 5 Minuten fertig.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Digitale Speisekarte für Restaurants",
    sub:
      "Deine digitale Speisekarte mit QR-Code in 5 Minuten fertig. Mobile Bearbeitung, Direktbestellungen ohne Provision, Reservierungen 24/7, KI-Übersetzung in 35 Sprachen.",
  },
};
