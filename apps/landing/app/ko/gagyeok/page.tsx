import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ko";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "레스토랑 경영자가 가격과 결제에 대해 묻는 질문. 질문을 찾을 수 없나요? WhatsApp으로 메시지를 보내주세요.",
  items: [
    { q: "Basic과 Pro의 차이점은 무엇입니까?", a: "Basic에는 디지털 + QR 메뉴, 35개 언어 AI 번역, 메뉴에서 주문 받기(선택 사항), 모든 기기에서 관리가 포함됩니다. Pro는 주방 디스플레이(KDS)와 24/7 온라인 테이블 예약, 우선 WhatsApp 지원을 추가합니다. 주방 워크플로우와 예약이 필요하지 않은 경우 — Basic으로 모두 충족됩니다." },
    { q: "주문에 대해 수수료를 받습니까?", a: "아니요. QR 메뉴에서 또는 직원이 받은 모든 주문은 레스토랑으로 직접 전달됩니다. 백분율이나 집계 수수료 없음. 고정 월 요금이 있고 다른 공제는 없습니다." },
    { q: "14일 체험판에는 무엇이 포함됩니까?", a: "두 플랜 모두 모든 기능에 대한 완전한 접근, 카드 불필요. 14일 후 결제 방법이 연결되지 않으면 계정이 자동으로 일시 중지됩니다. 동의 없이 자동 청구는 없습니다." },
    { q: "14일 후에는 어떻게 됩니까?", a: "결제 방법이 연결되지 않으면 계정이 자동으로 일시 중지됩니다. 관리 패널은 읽기 전용 모드로 사용 가능하지만, 손님용 QR 메뉴와 주문 받기는 일시적으로 비활성화됩니다. 동의 없이는 청구하지 않습니다." },
    { q: "일시 중지 중 메뉴, 주문, 데이터는 어떻게 됩니까?", a: "모든 것이 완전히 보존됩니다: 메뉴, 요리 사진, 주문 이력, 예약, 디자인 설정, 통계. 1개월 또는 6개월 후에도 결제를 연결하면 — 모든 것이 그대로 돌아갑니다. 아무것도 손실되지 않습니다." },
    { q: "체험판 후에도 테이블의 QR 코드가 여전히 작동합니까?", a: "계정이 일시 중지된 경우, QR 코드는 손님에게 「일시적으로 사용 불가」 메시지를 표시합니다. 새 QR 코드를 인쇄할 필요가 없습니다: 결제가 연결되는 즉시 같은 코드가 다시 메뉴를 엽니다." },
    { q: "나중에 Basic에서 Pro로 전환할 수 있습니까?", a: "예, 업그레이드는 관리 패널에서 원 클릭으로 가능합니다. 추가 요금은 결제 기간의 남은 일수에 따라 비례 계산됩니다. Pro에서 Basic으로 다운그레이드도 가능합니다 — KDS와 예약은 비활성화되지만 모든 데이터는 보존됩니다." },
    { q: "연간 할인은 얼마입니까?", a: "월간 플랜과 비교하여 약 30%. 정확한 금액은 플랜 페이지의 결제 시 표시됩니다." },
    { q: "언제든지 구독을 취소할 수 있습니까?", a: "예, 취소는 관리 패널에서 원 클릭으로 가능합니다. 취소 후 계정은 결제 기간이 끝날 때까지 작동한 다음 일시 중지됩니다. 데이터는 보존되며 언제든지 돌아올 수 있습니다." },
    { q: "어떤 결제 방법을 받습니까?", a: "Stripe를 통한 Visa, Mastercard, American Express. Apple Pay와 Google Pay도 지원됩니다. 유럽에서는 — 연간 플랜에서 SEPA 직불." },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Pricing" }],
  },
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: `${SITE}/${LOCALE}` },
        { "@type": "ListItem", position: 2, name: "Pricing", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Basic", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: SCHEMA_PRICE_PRO_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
    },
  ],
}).replace(/</g, "\\u003c");

export default function PricingPage() {
  return (
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <LandingHeaderLp texts={DEFAULT.header} locale={LOCALE} featureLinks={DEFAULT.footer.featureLinks} />

      <Section dataSection="pricing_hero" noContainer accent>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_ko_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer accent className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
