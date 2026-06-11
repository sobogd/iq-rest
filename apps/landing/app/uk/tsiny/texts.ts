import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Ціни — Один тариф для Вашого ресторану від 6,90 €/міс | IQ Rest",
    description:
      "Один тариф від 6,90 €/міс для ресторанів: QR-меню, прийом замовлень, AI-переклад, бронювання, KDS, аналітика. Без обмежень. 14 днів безкоштовно, без картки, скасування будь-коли.",
    canonical: "https://iq-rest.com/uk/tsiny",
    ogLocale: "uk_UA",
    ogTitle: "Ціни — Один тариф для Вашого ресторану",
    ogDescription:
      "6,90 €/міс: QR-меню, замовлення, AI-переклад, бронювання, KDS, аналітика. Без прихованих платежів. 14 днів безкоштовно.",
  },
};
