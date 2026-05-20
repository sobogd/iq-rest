import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Prezzi — Un solo piano per il tuo ristorante da 6,90 €/mese | IQ Rest",
    description:
      "Un solo piano da 6,90 €/mese per ristoranti: menu QR, ordini, traduzione con IA, prenotazioni, KDS e statistiche. Illimitato. 14 giorni gratis, senza carta, disdici quando vuoi.",
    canonical: "https://iq-rest.com/it/prezzi",
    ogLocale: "it_IT",
    ogTitle: "Prezzi — Un solo piano per il tuo ristorante",
    ogDescription:
      "Da 6,90 €/mese: menu QR, ordini, traduzione con IA, prenotazioni, KDS e statistiche. Senza costi nascosti. 14 giorni gratis.",
  },
};
