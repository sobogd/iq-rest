import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Hinnad — Üks plaan sinu restoranile alates 6,90 €/k | IQ Rest",
    description:
      "Üks plaan alates 6,90 €/k restoranidele: QR-menüü, tellimuste vastuvõtmine, AI-tõlge, broneerimine, KDS, analüütika. Piiranguteta. 14 päeva tasuta, ilma kaardita, tühista igal ajal.",
    canonical: "https://iq-rest.com/et/hinnad",
    ogLocale: "et_EE",
    ogTitle: "Hinnad — Üks plaan sinu restoranile",
    ogDescription:
      "6,90 €/k: QR-menüü, tellimused, AI-tõlge, broneerimine, KDS, analüütika. Mitte mingeid varjatud tasusid. 14 päeva tasuta.",
  },
};
