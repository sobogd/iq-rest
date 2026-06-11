import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Priser — Ét abonnement til din restaurant fra 6,90 €/md. | IQ Rest",
    description:
      "Ét abonnement fra 6,90 €/md. til restauranter: QR-menu, bestillingsmodtagelse, AI-oversættelse, reservationer, KDS, analyse. Uden grænser. 14 dage gratis, intet kort, opsig når som helst.",
    canonical: "https://iq-rest.com/da/priser",
    ogLocale: "da_DK",
    ogTitle: "Priser — Ét abonnement til din restaurant",
    ogDescription:
      "6,90 €/md.: QR-menu, bestillinger, AI-oversættelse, reservationer, KDS, analyse. Ingen skjulte gebyrer. 14 dage gratis.",
  },
};
