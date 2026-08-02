import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ru";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Что рестораторы спрашивают про цены и оплату. Не нашли свой вопрос — пишите в WhatsApp.",
  items: [
    {
      q: "Как устроена цена?",
      a: "Вы собираете свой план сами. Основа — цифровое QR-меню: в него входит AI-перевод на 35 языков и управление с любого устройства. Дальше добавляете только то, что нужно именно вам: бронирование столов, кухонный дисплей с приёмом заказов или собственный домен. Цена считается за ресторан, а со второго ресторана автоматически действуют скидки за объём.",
    },
    {
      q: "Берёте ли вы комиссию с заказов?",
      a: "Нет. Все заказы — из QR-меню или принятые официантом — поступают напрямую в ресторан, без процентов и комиссий агрегаторов. У вас фиксированный месячный платёж и больше никаких удержаний.",
    },
    {
      q: "Что включает 14-дневный пробный период?",
      a: "Полный доступ ко всем функциям, без привязки банковской карты. По истечении 14 дней аккаунт автоматически ставится на паузу, если способ оплаты не подключён. Автоматических списаний без вашего согласия нет.",
    },
    {
      q: "Что произойдёт после окончания 14 дней?",
      a: "Если способ оплаты не подключён, аккаунт автоматически ставится на паузу. Административная панель остаётся доступной в режиме просмотра, однако гостевое QR-меню и приём заказов временно отключаются. Мы никогда не списываем средства без вашего согласия.",
    },
    {
      q: "Что будет с моим меню, заказами и данными во время паузы?",
      a: "Всё сохраняется в полном объёме: меню, фото блюд, история заказов, брони, настройки дизайна, статистика. Подключите оплату даже через месяц или полгода — всё вернётся в том же виде, ничего не потеряется.",
    },
    {
      q: "QR-коды на столах продолжат работать после пробного периода?",
      a: "Если аккаунт находится на паузе, QR-коды показывают гостям заглушку «временно недоступно». Печатать новые QR-коды не нужно: как только оплата подключена, те же самые коды снова открывают меню.",
    },
    {
      q: "Можно ли изменить план позже?",
      a: "Да — добавляйте или убирайте функции в любой момент из административной панели. Разница пересчитывается пропорционально оставшимся дням оплаченного периода. Если вы убираете функцию, она отключается, но все её данные сохраняются.",
    },
    {
      q: "Сколькими ресторанами можно управлять?",
      a: "Сколько нужно — количество ресторанов вы выбираете при сборке плана, а управляете всеми из единой панели. Скидки за объём применяются автоматически, до 50% при 5+ ресторанах. Управляете крупной сетью? Напишите нам в WhatsApp об индивидуальном плане.",
    },
    {
      q: "Какая скидка на годовой план?",
      a: "Около 30% против помесячной оплаты. Точная сумма показывается при сборке вашего плана.",
    },
    {
      q: "Можно ли отменить подписку в любой момент?",
      a: "Да, отмена выполняется в один клик из административной панели. После отмены аккаунт работает до конца оплаченного периода, затем ставится на паузу. Данные сохраняются, и вы сможете вернуться в любое удобное время.",
    },
    {
      q: "Какие способы оплаты принимаете?",
      a: "Visa, Mastercard и American Express через Stripe. Apple Pay и Google Pay тоже поддерживаются. В Европе — SEPA Direct Debit на годовом плане.",
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
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digital menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_ru_pricing_hero"
    />
  );
}
