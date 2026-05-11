import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "QR-Speisekarte für dein Restaurant — ab 6,90€/Monat | IQ Rest",
    description:
      "Generiere deinen QR-Code für die Speisekarte deines Restaurants. Druckbar für Tische, scannbar ohne App, Direktbestellungen ohne Provision. In 5 Minuten fertig.",
    ogTitle: "QR-Speisekarte für dein Restaurant — ab 6,90€/Monat",
    ogDescription:
      "QR-Code für die Speisekarte deines Restaurants. Druckbar, scannbar ohne App, Direktbestellungen.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "QR-Speisekarte für dein Restaurant",
    sub:
      "Generiere deinen QR-Code in 5 Minuten. Druckbar für die Tische, die Gäste scannen mit der Kamera und die Speisekarte öffnet sich sofort. Ohne App, ohne Provision.",
  },
};
