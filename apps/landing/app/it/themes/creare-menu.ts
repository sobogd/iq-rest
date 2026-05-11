import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Crea il tuo Menu Digitale — 6,9€/mese | IQ Rest",
    description:
      "Crea il tuo menu digitale per ristorante in 5 minuti. Senza agenzie, senza tecnici. Ordini diretti senza commissioni, 35 lingue con IA. 14 giorni prova.",
    ogTitle: "Crea il tuo Menu Digitale — 6,9€/mese",
    ogDescription:
      "Crea il tuo menu digitale in 5 minuti. Senza agenzie, ordini diretti senza commissioni.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Crea il tuo Menu Digitale",
    sub:
      "Crea il tuo menu digitale per ristorante in 5 minuti. Senza agenzie né tecnici. Editor mobile, ordini diretti, prenotazioni 24/7. Pronto oggi.",
  },
};
