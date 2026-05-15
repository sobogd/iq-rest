import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /it. Inherits content from the indexed page (/it) and only
// overrides what should differ for the Google Ads landing: meta (canonical +
// og) and microcopy that surfaces the entry price.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Da 6,90€/mese · 14 giorni gratis · Cancelli quando vuoi",

  meta: {
    title: "Menu Digitale per Ristoranti — Online in 5 Min | IQ Rest",
    description:
      "Crea il tuo menu digitale per ristorante online in 5 minuti. QR Code stampabile, ordini diretti senza commissioni, 35 lingue con IA. 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/lp/menu-digitale",
    ogLocale: "it_IT",
    ogTitle: "Menu Digitale per Ristoranti — Online in 5 Min",
    ogDescription:
      "Menu digitale online per il tuo ristorante. QR Code, ordini diretti, 35 lingue con IA. Pronto in 5 minuti.",
  },
};
