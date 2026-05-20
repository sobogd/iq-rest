import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "料金 — レストラン向けプラン 6.90 €/月から | IQ Rest",
    description:
      "レストラン向け6.90 €/月からの1プラン:QRメニュー、注文受付、AI翻訳、予約、KDS、分析。無制限。14日間無料、カード不要、いつでもキャンセル可能。",
    canonical: "https://iq-rest.com/ja/kakaku",
    ogLocale: "ja_JP",
    ogTitle: "料金 — レストラン向けプラン",
    ogDescription:
      "6.90 €/月:QRメニュー、注文、AI翻訳、予約、KDS、分析。隠れた料金なし。14日間無料。",
  },
};
