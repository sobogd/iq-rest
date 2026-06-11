import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "가격 — 월 6.90 €부터 시작하는 레스토랑용 플랜 | IQ Rest",
    description:
      "레스토랑용 월 6.90 €부터 시작하는 플랜: QR 메뉴, 주문 받기, AI 번역, 예약, KDS, 분석. 무제한. 14일 무료, 카드 불필요, 언제든지 취소.",
    canonical: "https://iq-rest.com/ko/gagyeok",
    ogLocale: "ko_KR",
    ogTitle: "가격 — 귀하의 레스토랑을 위한 플랜",
    ogDescription:
      "월 6.90 €: QR 메뉴, 주문, AI 번역, 예약, KDS, 분석. 숨겨진 비용 없음. 14일 무료.",
  },
};
