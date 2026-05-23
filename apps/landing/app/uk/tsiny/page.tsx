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

const LOCALE = "uk";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Що ресторатори запитують про ціни та оплату. Не знайшли свого запитання? Напишіть нам у WhatsApp.",
  items: [
    { q: "У чому різниця між Basic і Pro?", a: "Basic включає цифрове + QR-меню, AI-переклад на 35 мов, прийом замовлень із меню (за бажанням) та керування з будь-якого пристрою. Pro додає кухонний дисплей (KDS) та онлайн-бронювання столиків 24/7, а також пріоритетну підтримку у WhatsApp. Якщо Вам не потрібен кухонний робочий процес і бронювання — Basic охоплює все." },
    { q: "Чи берете Ви комісію із замовлень?", a: "Ні. Кожне замовлення — з QR-меню або прийняте офіціантом — йде напряму до ресторану, без відсотків чи комісій агрегаторів. Ви маєте фіксовану щомісячну плату і жодних інших списань." },
    { q: "Що включає 14-денний пробний період?", a: "Повний доступ до всіх функцій в обох тарифах, без картки. Через 14 днів акаунт автоматично призупиняється, якщо не підключено спосіб оплати. Жодних автоматичних списань без Вашої згоди." },
    { q: "Що відбувається після 14 днів?", a: "Якщо не підключено спосіб оплати, акаунт автоматично призупиняється. Панель адміністрування залишається доступною в режимі лише для читання, але гостьове QR-меню та прийом замовлень тимчасово вимкнено. Ми ніколи не списуємо без Вашої згоди." },
    { q: "Що відбувається з моїм меню, замовленнями та даними під час паузи?", a: "Усе зберігається повністю: меню, фотографії страв, історія замовлень, бронювання, налаштування дизайну, статистика. Підключіть оплату навіть через місяць чи шість місяців — усе повертається таким, як було, нічого не втрачається." },
    { q: "Чи будуть QR-коди на столиках працювати після пробного періоду?", a: "Якщо акаунт призупинено, QR-коди показують гостям повідомлення «тимчасово недоступно». Вам не потрібно друкувати нові QR-коди: щойно оплату підключено, ті ж самі коди знову відкривають меню." },
    { q: "Чи можу я перейти з Basic на Pro пізніше?", a: "Так, оновлення — це один клік у панелі адміністрування. Доплата розраховується пропорційно до днів, що залишилися в оплаченому періоді. Перехід з Pro на Basic також доступний — KDS і бронювання будуть вимкнені, але всі дані зберігаються." },
    { q: "Яка щорічна знижка?", a: "Близько 30% порівняно зі щомісячним тарифом. Точна сума показується під час оплати на сторінці тарифу." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_uk_pricing_hero" />
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
