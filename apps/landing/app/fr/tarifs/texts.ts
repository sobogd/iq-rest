import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Tarifs — Un seul plan pour votre restaurant dès 6,90 €/mois | IQ Rest",
    description:
      "Un seul plan dès 6,90 €/mois pour les restaurants : menu QR, prise de commande, traduction IA, réservation, KDS, analytique. Sans limites. 14 jours gratuits, sans carte, annulation à tout moment.",
    canonical: "https://iq-rest.com/fr/tarifs",
    ogLocale: "fr_FR",
    ogTitle: "Tarifs — Un seul plan pour votre restaurant",
    ogDescription:
      "6,90 €/mois : menu QR, commandes, traduction IA, réservation, KDS, analytique. Pas de frais cachés. 14 jours gratuits.",
  },
};
