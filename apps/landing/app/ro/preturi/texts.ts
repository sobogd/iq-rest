import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Prețuri — Un plan pentru restaurantul dumneavoastră de la 6,90 €/lună | IQ Rest",
    description:
      "Un plan de la 6,90 €/lună pentru restaurante: meniu QR, preluare comenzi, traducere AI, rezervare, KDS, analitică. Fără limite. 14 zile gratuit, fără card, anulați oricând.",
    canonical: "https://iq-rest.com/ro/preturi",
    ogLocale: "ro_RO",
    ogTitle: "Prețuri — Un plan pentru restaurantul dumneavoastră",
    ogDescription:
      "6,90 €/lună: meniu QR, comenzi, traducere AI, rezervare, KDS, analitică. Fără costuri ascunse. 14 zile gratuit.",
  },
};
