import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "bg";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Какво питат ресторантьорите за цените и плащането. Не намирате вашия въпрос? Пишете ни в WhatsApp.",
  items: [
    { q: "Каква е разликата между Basic и Pro?", a: "Basic включва дигитално + QR меню, ИИ превод на 35 езика, приемане на поръчки от менюто (по избор) и управление от всяко устройство. Pro добавя кухненския дисплей (KDS) и онлайн резервация на маси 24/7, плюс приоритетна поддръжка в WhatsApp. Ако нямате нужда от кухненския работен поток и резервации — Basic покрива всичко." },
    { q: "Взимате ли комисиона върху поръчките?", a: "Не. Всяка поръчка — от QR меню или приета от сервитьор — отива директно в ресторанта, без проценти или комисиони на агрегатори. Имате фиксирана месечна такса и никакви други удръжки." },
    { q: "Какво включва 14-дневният пробен период?", a: "Пълен достъп до всички функции в двата плана, без банкова карта. След 14 дни акаунтът се поставя автоматично на пауза, ако не е свързан метод за плащане. Няма автоматични таксувания без вашето съгласие." },
    { q: "Какво се случва след 14-те дни?", a: "Ако не е свързан метод за плащане, акаунтът се поставя автоматично на пауза. Админ панелът остава достъпен в режим само за четене, но QR менюто за гости и приемането на поръчки са временно изключени. Никога не таксуваме без вашето съгласие." },
    { q: "Какво се случва с менюто, поръчките и данните по време на паузата?", a: "Всичко е напълно запазено: меню, снимки на ястия, история на поръчките, резервации, настройки за дизайн, статистики. Свържете плащане дори след месец или шест месеца — всичко се връща както е било, нищо не се губи." },
    { q: "Ще работят ли QR кодовете на масите след пробния период?", a: "Ако акаунтът е на пауза, QR кодовете показват на гостите съобщение „временно недостъпно“. Не е необходимо да отпечатвате нови QR кодове: щом плащането е свързано, същите кодове отново отварят менюто." },
    { q: "Мога ли да премина от Basic към Pro по-късно?", a: "Да, ъпгрейдът е с едно щракване в админ панела. Доплащането е пропорционално на оставащите дни от платения период. Намаляване от Pro към Basic също е достъпно — KDS и резервации ще бъдат изключени, но всички данни се запазват." },
    { q: "Каква е годишната отстъпка?", a: "Около 30% спрямо месечния план. Точната сума се показва при плащане на страницата с плановете." },
    { q: "Мога ли да откажа абонамента по всяко време?", a: "Да, отказът е с едно щракване в админ панела. След отказ акаунтът работи до края на платения период, след което се поставя на пауза. Данните се запазват и можете да се върнете, когато пожелаете." },
    { q: "Какви методи на плащане приемате?", a: "Visa, Mastercard и American Express през Stripe. Apple Pay и Google Pay също се поддържат. В Европа — SEPA Direct Debit при годишен план." },
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
        { "@type": "Offer", name: "Basic", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: "24.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_bg_pricing_hero" />
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
