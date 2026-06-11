import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Hinnat — Yksi paketti ravintolaasi 6,90 €/kk alkaen | IQ Rest",
    description:
      "Yksi paketti 6,90 €/kk alkaen ravintoloille: QR-ruokalista, tilausten vastaanotto, AI-käännös, varaus, KDS, analytiikka. Ilman rajoja. 14 päivää ilmaiseksi, ilman korttia, peruutus koska tahansa.",
    canonical: "https://iq-rest.com/fi/hinnat",
    ogLocale: "fi_FI",
    ogTitle: "Hinnat — Yksi paketti ravintolaasi",
    ogDescription:
      "6,90 €/kk: QR-ruokalista, tilaukset, AI-käännös, varaus, KDS, analytiikka. Ei piilokuluja. 14 päivää ilmaiseksi.",
  },
};
