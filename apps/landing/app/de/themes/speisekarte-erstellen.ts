import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Digitale Speisekarte erstellen — ab 6,90€/Monat | IQ Rest",
    description:
      "Erstelle deine digitale Speisekarte für dein Restaurant in 5 Minuten. Ohne Agenturen, ohne Techniker. Direktbestellungen ohne Provision, 35 Sprachen. 14 Tage Test.",
    ogTitle: "Digitale Speisekarte erstellen — ab 6,90€/Monat",
    ogDescription:
      "Erstelle deine digitale Speisekarte in 5 Minuten. Ohne Agenturen, Direktbestellungen ohne Provision.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Digitale Speisekarte erstellen",
    sub:
      "Erstelle deine digitale Speisekarte für dein Restaurant in 5 Minuten. Ohne Agenturen, ohne Techniker. Mobile Bearbeitung, Direktbestellungen, Reservierungen 24/7.",
  },
};
