import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { AboutTemplate, type AboutCopy } from "@/app/_landing/templates/about-template";
import { TEXTS } from "../texts";
import { restaurantCount } from "@/lib/restaurant-count";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ru";
const SITE = "https://iq-rest.com";
const PAGE_URL = `${SITE}/${LOCALE}/o-kompanii`;

// Operator data is the same set the Privacy Policy publishes
// (components/cookie-consent/legal-text.tsx → OPERATOR); this page just puts it
// where a customer looks for it before paying.
const COPY: AboutCopy = {
  heading: "Из своего кафе",
  headingAccent: "в платформу для ресторанов",
  // Story, photo and signature come from the shared founder copy — the same
  // text the home page quotes, so it stays in one place across 35 locales.
  story: {
    photo: { src: "/contacts.webp", alt: TEXTS.founder.photoAlt },
    paragraphs: [
      `${TEXTS.founder.quoteStart} ${TEXTS.founder.quoteAccent}`,
      "Сегодня платформа работает каждый день в {count} заведениях — от кофеен на пять столов до сетей в нескольких городах. Данные хранятся на серверах в Германии, а на вопросы в поддержке отвечаем лично.",
    ],
    sign: "Богдан Соколов",
  },

  facts: [
    { value: "2022", label: "год основания платформы" },
    { value: "{count}", label: "заведений работают с IQ Rest" },
    { value: "15", label: "стран, где есть наши клиенты" },
  ],
  waPrefill: "Здравствуйте, у меня вопрос об IQ Rest",
  contacts: [
    {
      Icon: Mail,
      title: "Почта",
      value: "support@iq-rest.com",
      href: "mailto:support@iq-rest.com",
      note: "Счета, документы, вопросы по данным.",
    },
    {
      Icon: MessageCircle,
      title: "WhatsApp",
      value: "+998 94 866 37 43",
      wa: true,
      note: "Покажем демо, поможем с настройкой.",
    },
    {
      Icon: Clock,
      title: "Время ответа",
      value: "Пн–Вс, 9:00–21:00 CET",
      note: "Отвечаем в течение нескольких часов.",
    },
  ],
  legal: {
    rows: [
      { label: "Оператор сервиса", value: "Bogdan Sokolov" },
      { label: "Правовая форма", value: "Autónomo (España)" },
      { label: "Налоговый номер (NIF)", value: "ESZ1894474S" },
      { label: "Адрес", value: "Calle Boca del Río 2, 33010 Oviedo, Asturias, España" },
      { label: "Домен", value: "https://iq-rest.com" },
      { label: "Хостинг данных", value: "Hetzner Online GmbH, Nuremberg, Germany" },
    ],
  },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: PAGE_URL,
  inLanguage: LOCALE,
  dateModified: SCHEMA_DATE_MODIFIED,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "IQ Rest",
    url: SITE,
    logo: `${SITE}/logo.png`,
    founder: { "@type": "Person", name: "Bogdan Sokolov" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Boca Del Rio 2",
      addressLocality: "Oviedo",
      postalCode: "33010",
      addressRegion: "Asturias",
      addressCountry: "ES",
    },
    vatID: "ESZ1894474S",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@iq-rest.com",
        telephone: "+998948663743",
        availableLanguage: ["ru", "en", "es"],
      },
    ],
  },
}).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "О компании IQ Rest — кто мы, контакты и реквизиты",
  description:
    "Кто стоит за IQ Rest, как с нами связаться и реквизиты оператора сервиса: почта, WhatsApp, юридические данные.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "О компании IQ Rest",
    description: "Кто стоит за IQ Rest, контакты поддержки и реквизиты оператора сервиса.",
    url: PAGE_URL,
    siteName: "IQ Rest",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <AboutTemplate
        locale={LOCALE}
        texts={TEXTS}
        copy={COPY}
        count={restaurantCount()}
        aboutHref={`/${LOCALE}/o-kompanii`}
      />
    </>
  );
}
