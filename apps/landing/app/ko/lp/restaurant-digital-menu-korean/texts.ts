import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ko, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /ko page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "월 6.90유로부터 · 14일 무료 · 언제든 취소",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "레스토랑용 디지털 메뉴",
    sub: "30개국 이상 500개 이상의 레스토랑이 더 많은 테이블을 서비스하고, 관광객에게 더 많이 판매하며, 배달 수수료를 없앱니다. 5분 만에 가동 — 14일 무료.",
    verticals: ["온라인 주문", "예약", "AI 번역", "메뉴 스캐너", "알레르겐", "프리미엄 디자인", "분석"],
    dynamicHeadlines: [],
    headlinePrefix: "레스토랑용 디지털 ",
    accentWord: "메뉴",
    accentWordRotation: ["메뉴", "카페 메뉴", "바 메뉴", "피자 메뉴", "비스트로 메뉴", "펍 메뉴"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "아내와 저는 카페를 열었고 테이블 주문과 예약도 처리하면서 둔하거나 못생기지 않은 레스토랑용 디지털 메뉴를 몇 주 동안 찾았습니다 —",
    quoteAccent: "그래서 우리 자신이 원하던 디지털 메뉴를 만들었습니다.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "레스토랑용 디지털 메뉴란 무엇인가요?",
        a: "레스토랑용 디지털 메뉴는 종이 메뉴의 온라인 버전입니다. 손님이 테이블에서 휴대폰 카메라로 QR 코드를 스캔하면 브라우저에서 즉시 요리, 사진, 알레르겐, 가격을 볼 수 있습니다 — 앱 설치 없이. IQ Rest에서 디지털 메뉴는 테이블 직접 주문, 24/7 예약, 35개 언어 AI 번역도 포함하며 모든 것이 휴대폰에서 실시간 업데이트됩니다.",
      },
      {
        q: "레스토랑용 디지털 메뉴 비용은 얼마인가요?",
        a: "월 6.90유로, 모두 포함 (연간 플랜 할인). 완전한 편집기, 무제한 QR 코드, 수수료 없는 직접 주문, 35개 언어 AI 번역, 예약 및 분석. 14일 무료 체험, 카드 불필요.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "레스토랑용 디지털 메뉴.",
    headingAccent: "5분 만에 준비.",
    sub: "14일 무료. 카드 불필요. IQ Rest에서 디지털 메뉴를 운영하는 500개 이상의 레스토랑에 합류하세요.",
  },

  meta: {
    title: "레스토랑용 디지털 메뉴 — 5분 | IQ Rest",
    description: "레스토랑용 디지털 메뉴: 인쇄 가능한 QR 코드, 수수료 없는 직접 주문, 35개 언어 AI 번역. 5분, 14일 무료.",
    canonical: "https://iq-rest.com/ko/lp/restaurant-digital-menu-korean",
    ogLocale: "ko_KR",
    ogTitle: "레스토랑용 디지털 메뉴 — 5분 안에",
    ogDescription: "QR 코드, 직접 주문 및 35개 AI 언어를 갖춘 레스토랑용 디지털 메뉴. 5분 만에 가동 — 14일 무료.",
  },
};
