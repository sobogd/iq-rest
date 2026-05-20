import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Preise — Ein Tarif für Ihr Restaurant ab 6,90 €/Mon. | IQ Rest",
    description:
      "Ein Tarif ab 6,90 €/Mon. für Restaurants: QR-Speisekarte, Bestellannahme, KI-Übersetzung, Reservierung, KDS, Analytik. Unbegrenzt. 14 Tage kostenlos, ohne Kreditkarte, jederzeit kündbar.",
    canonical: "https://iq-rest.com/de/preise",
    ogLocale: "de_DE",
    ogTitle: "Preise — Ein Tarif für Ihr Restaurant",
    ogDescription:
      "6,90 €/Mon.: QR-Speisekarte, Bestellungen, KI-Übersetzung, Reservierung, KDS, Analytik. Keine versteckten Gebühren. 14 Tage kostenlos.",
  },
};
