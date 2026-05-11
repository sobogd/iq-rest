import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Menu Digitale per Ristoranti — 6,9€/mese | IQ Rest",
    description:
      "Crea il tuo menu digitale con QR Code per il tuo ristorante. Ordini diretti senza commissioni, 35 lingue con IA, prenotazioni 24/7. Pronto in 5 min.",
    ogTitle: "Menu Digitale per Ristoranti — 6,9€/mese",
    ogDescription:
      "Menu digitale con QR Code. Ordini diretti senza commissioni, 35 lingue con IA. Pronto in 5 minuti.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Menu Digitale per Ristoranti",
    sub:
      "Il tuo menu digitale con QR Code pronto in 5 minuti. Editor mobile, ordini diretti senza commissioni, prenotazioni 24/7, traduzione IA in 35 lingue.",
  },
};
