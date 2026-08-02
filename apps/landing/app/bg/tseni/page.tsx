import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "bg";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Какво питат ресторантьорите за цените и плащането. Не намирате вашия въпрос? Пишете ни в WhatsApp.",
  items: [
    { q: "Как работи ценообразуването?", a: "Сами си сглобявате плана. Дигиталното QR меню е основата — включва ИИ превод на 35 езика и управление от всяко устройство. След това добавяте само това, от което имате нужда: резервация на маси, кухненски дисплей с приемане на поръчки или собствен домейн. Цената е за ресторант, а отстъпките за обем се прилагат автоматично от втория ресторант нататък." },
    { q: "Взимате ли комисиона върху поръчките?", a: "Не. Всяка поръчка — от QR меню или приета от сервитьор — отива директно в ресторанта, без проценти или комисиони на агрегатори. Имате фиксирана месечна такса и никакви други удръжки." },
    { q: "Какво включва 14-дневният пробен период?", a: "Пълен достъп до всички функции, без банкова карта. След 14 дни акаунтът се поставя автоматично на пауза, ако не е свързан метод за плащане. Няма автоматични таксувания без вашето съгласие." },
    { q: "Какво се случва след 14-те дни?", a: "Ако не е свързан метод за плащане, акаунтът се поставя автоматично на пауза. Админ панелът остава достъпен в режим само за четене, но QR менюто за гости и приемането на поръчки са временно изключени. Никога не таксуваме без вашето съгласие." },
    { q: "Какво се случва с менюто, поръчките и данните по време на паузата?", a: "Всичко е напълно запазено: меню, снимки на ястия, история на поръчките, резервации, настройки за дизайн, статистики. Свържете плащане дори след месец или шест месеца — всичко се връща както е било, нищо не се губи." },
    { q: "Ще работят ли QR кодовете на масите след пробния период?", a: "Ако акаунтът е на пауза, QR кодовете показват на гостите съобщение „временно недостъпно“. Не е необходимо да отпечатвате нови QR кодове: щом плащането е свързано, същите кодове отново отварят менюто." },
    { q: "Мога ли да променя плана си по-късно?", a: "Да — добавяйте или премахвайте функции по всяко време в админ панела. Разликата се изчислява пропорционално спрямо оставащите дни от платения период. Ако премахнете функция, тя се изключва, но всички нейни данни се запазват." },
    { q: "Колко ресторанта мога да управлявам?", a: "Колкото са ви нужни — изберете броя на ресторантите, докато сглобявате плана си, всички управлявани от един панел. Отстъпките за обем се прилагат автоматично, до 50% при 5 или повече ресторанта. Управлявате по-голяма група? Пишете ни в WhatsApp за индивидуален план." },
    { q: "Каква е годишната отстъпка?", a: "Около 30% спрямо месечния план. Точната сума се показва, докато сглобявате плана си." },
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
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Дигитално меню", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
    <PricingTemplate
      locale={LOCALE}
      texts={DEFAULT}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
      trackPrefix="l_bg_pricing_hero"
    />
  );
}
