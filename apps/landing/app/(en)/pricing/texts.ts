import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Pricing — One plan for your restaurant 6.90 €/mo | IQ Rest",
    description:
      "One plan starting at 6.90 €/mo for restaurants: QR menu, order taking, AI translation, booking, KDS, analytics. Unlimited. 14 days free, no card required, cancel anytime.",
    canonical: "https://iq-rest.com/pricing",
    ogLocale: "en_US",
    ogTitle: "Pricing — One plan for your restaurant",
    ogDescription:
      "6.90 €/mo: QR menu, ordering, AI translation, booking, KDS, analytics. No hidden fees. 14 days free.",
  },
};
