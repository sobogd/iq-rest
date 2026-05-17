import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/ko/restaurant-online-order-system";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — 레스토랑 온라인 주문 시스템", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "ko", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "레스토랑 온라인 주문 시스템 활성화 방법", description: "POS 하드웨어나 집계 플랫폼 없이 4단계로 레스토랑의 직접 온라인 주문 활성화.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "레스토랑 생성", text: "이메일 또는 Google로 30초 가입." },
    { "@type": "HowToStep", position: 2, name: "메뉴 추가", text: "드래그 앤 드롭 또는 종이 메뉴 AI 스캔 — AI가 카테고리, 음식, 가격 가져오기." },
    { "@type": "HowToStep", position: 3, name: "채널 선택", text: "들어오는 주문을 주방 태블릿, 매장 WhatsApp 또는 둘 다 동시에 보내기." },
    { "@type": "HowToStep", position: 4, name: "QR 인쇄", text: "QR(테이블당 또는 매장 공용) 다운로드하여 테이블에 부착." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
