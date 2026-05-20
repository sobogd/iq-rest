import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Cene — En paket za vašo restavracijo od 6,90 €/mes. | IQ Rest",
    description:
      "En paket od 6,90 €/mes. za restavracije: QR jedilnik, sprejemanje naročil, AI prevod, rezervacije, KDS, analitika. Brez omejitev. 14 dni brezplačno, brez kartice, prekličete kadar koli.",
    canonical: "https://iq-rest.com/sl/cene",
    ogLocale: "sl_SI",
    ogTitle: "Cene — En paket za vašo restavracijo",
    ogDescription:
      "6,90 €/mes.: QR jedilnik, naročila, AI prevod, rezervacije, KDS, analitika. Brez skritih stroškov. 14 dni brezplačno.",
  },
};
