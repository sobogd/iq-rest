import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ru";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Что рестораторы спрашивают про цены и оплату. Не нашли свой вопрос — пишите в WhatsApp.",
  items: [
    {
      q: "В чём разница между Basic и Pro?",
      a: "Basic — это меню (цифровое + QR), AI-перевод на 35 языков, приём заказов из меню (опционально), управление с телефона. Pro добавляет к этому кухонный дисплей (KDS) и онлайн-бронирование столов 24/7, плюс приоритетную поддержку в WhatsApp. Если кухня и брони не нужны — Basic покроет всё.",
    },
    {
      q: "Берёте ли вы комиссию с заказов?",
      a: "Нет. Все заказы — из QR-меню гостя или принятые официантом — поступают напрямую в ресторан, без процентов и комиссий агрегаторов. У вас фиксированный месячный платёж и больше никаких удержаний.",
    },
    {
      q: "Что включает 14-дневный пробный период?",
      a: "Полный доступ ко всем функциям обоих тарифов, без привязки банковской карты. По истечении 14 дней аккаунт автоматически ставится на паузу, если способ оплаты не подключён. Автоматических списаний без вашего согласия нет.",
    },
    {
      q: "Что произойдёт после окончания 14 дней?",
      a: "Если способ оплаты не подключён, аккаунт автоматически ставится на паузу. Административная панель остаётся доступной в режиме просмотра, однако QR-меню гостей и приём заказов временно отключаются. Средства мы не списываем без вашего согласия — автоматических списаний по умолчанию нет.",
    },
    {
      q: "Что будет с моим меню, заказами и данными после паузы?",
      a: "Всё сохраняется на серверах в полном объёме: меню, фото блюд, история заказов, брони, настройки дизайна, статистика. Подключите оплату даже через месяц или полгода — всё вернётся в том же виде, ничего не потеряется.",
    },
    {
      q: "QR-коды на столах перестанут работать после пробного периода?",
      a: "Если аккаунт находится на паузе, QR-коды отображают гостям сообщение «временно недоступно». Печатать новые QR-коды не требуется: сразу после подключения оплаты те же самые коды снова открывают меню.",
    },
    {
      q: "Можно ли перейти с Basic на Pro позже?",
      a: "Да, переход выполняется в один клик из административной панели. Доплата начисляется пропорционально оставшимся дням оплаченного периода. Понижение с Pro до Basic также доступно — функции KDS и бронирования будут отключены, но все данные сохранятся.",
    },
    {
      q: "Какая скидка на годовой план?",
      a: "Около 30% против помесячной оплаты. Точная сумма показывается в момент оплаты на странице тарифа.",
    },
    {
      q: "Можно ли отменить подписку в любой момент?",
      a: "Да, отмена выполняется в один клик из административной панели. После отмены аккаунт работает до конца оплаченного периода, затем ставится на паузу. Данные сохраняются, и вы сможете вернуться к работе в любое удобное время.",
    },
    {
      q: "Какие способы оплаты принимаете?",
      a: "Карты Visa, Mastercard, American Express через Stripe. Apple Pay и Google Pay тоже поддерживаются. В Европе — SEPA Direct Debit на годовом плане.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Цены" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "IQ Rest",
      url: SITE,
      logo: `${SITE}/logo.png`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: `${SITE}/${LOCALE}` },
        { "@type": "ListItem", position: 2, name: "Цены", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        {
          "@type": "Offer",
          name: "Basic",
          price: SCHEMA_PRICE_BASIC_EUR,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: TEXTS.meta.canonical,
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: SCHEMA_PRICE_PRO_EUR,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: TEXTS.meta.canonical,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
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
      trackPrefix="l_pricing_hero"
    />
  );
}
