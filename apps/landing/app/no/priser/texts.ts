import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Priser — Ett abonnement for din restaurant fra 6,90 €/mnd | IQ Rest",
    description:
      "Ett abonnement fra 6,90 €/mnd for restauranter: QR-meny, bestillingsmottak, AI-oversettelse, reservasjon, KDS, analyse. Ubegrenset. 14 dager gratis, ingen kort, avslutt når som helst.",
    canonical: "https://iq-rest.com/no/priser",
    ogLocale: "nb_NO",
    ogTitle: "Priser — Ett abonnement for din restaurant",
    ogDescription:
      "6,90 €/mnd: QR-meny, bestillinger, AI-oversettelse, reservasjon, KDS, analyse. Ingen skjulte avgifter. 14 dager gratis.",
  },
};
