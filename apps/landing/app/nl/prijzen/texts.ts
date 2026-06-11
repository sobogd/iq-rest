import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Prijzen — Eén abonnement voor je restaurant vanaf 6,90 €/mnd | IQ Rest",
    description:
      "Eén abonnement vanaf 6,90 €/mnd voor restaurants: QR menu, bestellingen aannemen, AI vertaling, reservering, KDS, analytics. Onbeperkt. 14 dagen gratis, geen kaart nodig, op elk moment opzegbaar.",
    canonical: "https://iq-rest.com/nl/prijzen",
    ogLocale: "nl_NL",
    ogTitle: "Prijzen — Eén abonnement voor je restaurant",
    ogDescription:
      "6,90 €/mnd: QR menu, bestellingen, AI vertaling, reservering, KDS, analytics. Geen verborgen kosten. 14 dagen gratis.",
  },
};
