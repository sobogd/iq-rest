import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ko, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /ko page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "레스토랑 QR 메뉴",
    sub: "30개국 이상의 500개 이상의 레스토랑이 종이 메뉴를 QR 메뉴로 대체하고, 관광객에 더 많이 판매하며 배달 수수료를 없애고 있습니다. 5분 만에 시작 — 14일 무료.",
    dynamicHeadlines: [],
    headlinePrefix: "레스토랑 ",
    accentWord: "QR 메뉴",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "아내와 저는 카페를 열고 테이블 주문과 예약도 지원하는 레스토랑 QR 메뉴를 몇 주 동안 찾았지만 마음에 드는 것이 없었습니다 —",
    quoteAccent: "그래서 우리가 원하는 QR 메뉴를 직접 만들었습니다.",
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
        q: "레스토랑 QR 메뉴란?",
        a: "레스토랑 QR 메뉴는 테이블에 인쇄된 QR 코드로, 손님이 스마트폰 카메라로 스캔하면 브라우저에서 메뉴가 열립니다 — 앱 설치 불필요. IQ Rest의 QR 메뉴는 테이블 주문, 24/7 예약, 35개 언어 AI 번역을 포함하며 모두 모바일에서 업데이트됩니다.",
      },
      {
        q: "레스토랑 QR 메뉴 가격은?",
        a: "월 6.90유로, 모두 포함. 테이블당 무제한 QR 코드, 전체 편집기, 수수료 없는 직접 주문, 35개 언어 AI 번역, 예약 및 분석. 14일 무료 체험, 카드 불필요.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "레스토랑 QR 메뉴.",
    headingAccent: "5분 만에 준비.",
    sub: "14일 무료. 카드 불필요. 500개 이상의 레스토랑이 IQ Rest에서 QR 메뉴를 사용 중.",
  },

  meta: {
    title: "레스토랑 QR 메뉴 — 5분 만에 준비 | IQ Rest",
    description: "레스토랑 QR 메뉴: 각 테이블의 QR 코드, 수수료 없는 직접 주문, 35개 언어 AI 번역. 5분 만에 시작, 14일 무료.",
    canonical: "https://iq-rest.com/ko/lp/restaurant-qr-menu-korean",
    ogLocale: "ko_KR",
    ogTitle: "레스토랑 QR 메뉴 — 5분 만에 준비",
    ogDescription: "QR 메뉴와 직접 주문, 35개 AI 언어, 예약. 5분 만에 시작 — 14일 무료.",
  },
};
