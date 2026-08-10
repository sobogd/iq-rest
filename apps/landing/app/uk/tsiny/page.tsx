import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "uk";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Що ресторатори запитують про ціни та оплату. Не знайшли свого запитання? Напишіть нам у WhatsApp.",
  items: [
    { q: "Як формується ціна?", a: "Ви складаєте власний план. Цифрове QR-меню — це основа: воно включає AI-переклад на 35 мов і керування з будь-якого пристрою. Далі Ви додаєте лише те, що потрібно: бронювання столиків, кухонний дисплей із прийомом замовлень або власний домен. Ціна рахується за ресторан, а знижки за обсяг застосовуються автоматично починаючи з другого ресторану." },
    { q: "Чи берете Ви комісію із замовлень?", a: "Ні. Кожне замовлення — з QR-меню або прийняте офіціантом — йде напряму до ресторану, без відсотків чи комісій агрегаторів. Ви маєте фіксовану щомісячну плату і жодних інших списань." },
    { q: "Що включає 14-денний пробний період?", a: "Повний доступ до всіх функцій, без картки. Через 14 днів акаунт автоматично призупиняється, якщо не підключено спосіб оплати. Жодних автоматичних списань без Вашої згоди." },
    { q: "Що відбувається після 14 днів?", a: "Якщо не підключено спосіб оплати, акаунт автоматично призупиняється. Панель адміністрування залишається доступною в режимі лише для читання, але гостьове QR-меню та прийом замовлень тимчасово вимкнено. Ми ніколи не списуємо без Вашої згоди." },
    { q: "Що відбувається з моїм меню, замовленнями та даними під час паузи?", a: "Усе зберігається повністю: меню, фотографії страв, історія замовлень, бронювання, налаштування дизайну, статистика. Підключіть оплату навіть через місяць чи шість місяців — усе повертається таким, як було, нічого не втрачається." },
    { q: "Чи будуть QR-коди на столиках працювати після пробного періоду?", a: "Якщо акаунт призупинено, QR-коди показують гостям повідомлення «тимчасово недоступно». Вам не потрібно друкувати нові QR-коди: щойно оплату підключено, ті ж самі коди знову відкривають меню." },
    { q: "Чи можу я змінити план пізніше?", a: "Так — додавайте чи прибирайте функції будь-коли в панелі адміністрування. Різниця розраховується пропорційно до днів, що залишилися в оплаченому періоді. Якщо Ви прибираєте функцію, вона вимикається, але всі її дані зберігаються." },
    { q: "Скількома ресторанами я можу керувати?", a: "Скількома завгодно — оберіть кількість ресторанів під час складання плану, усіма керуєте з єдиної панелі. Знижки за обсяг застосовуються автоматично, до 50% при 5 і більше ресторанах. Керуєте більшою мережею? Напишіть нам у WhatsApp про індивідуальний план." },
    { q: "Яка щорічна знижка?", a: "Близько 30% порівняно зі щомісячним тарифом. Точна сума показується під час складання плану." },
    { q: "Чи можу я скасувати підписку будь-коли?", a: "Так, скасування — це один клік у панелі адміністрування. Після скасування акаунт працює до кінця оплаченого періоду, потім призупиняється. Дані зберігаються, і Ви можете повернутися, коли захочете." },
    { q: "Які способи оплати Ви приймаєте?", a: "Visa, Mastercard та American Express через Stripe. Apple Pay та Google Pay також підтримуються. У Європі — SEPA Direct Debit на річному тарифі." },
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
        { "@type": "Offer", name: "Digital menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
    />
  );
}
