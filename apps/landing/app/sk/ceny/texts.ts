import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Ceny — Jeden plán pre vašu reštauráciu od 6,90 €/mes. | IQ Rest",
    description:
      "Jeden plán od 6,90 €/mes. pre reštaurácie: QR menu, prijímanie objednávok, AI preklad, rezervácie, KDS, analytika. Bez limitov. 14 dní zadarmo, bez karty, zrušenie kedykoľvek.",
    canonical: "https://iq-rest.com/sk/ceny",
    ogLocale: "sk_SK",
    ogTitle: "Ceny — Jeden plán pre vašu reštauráciu",
    ogDescription:
      "6,90 €/mes.: QR menu, objednávky, AI preklad, rezervácie, KDS, analytika. Bez skrytých poplatkov. 14 dní zadarmo.",
  },
};
