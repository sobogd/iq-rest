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

const LOCALE = "fa";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "آنچه رستوران‌داران درباره قیمت و پرداخت می‌پرسند. سؤال خود را پیدا نمی‌کنید؟ در واتساپ پیام دهید.",
  items: [
    { q: "تفاوت Basic و Pro چیست؟", a: "Basic شامل منوی دیجیتال + QR، ترجمه AI به ۳۵ زبان، دریافت سفارش از منو (اختیاری) و مدیریت از هر دستگاه است. Pro نمایشگر آشپزخانه (KDS) و رزرو آنلاین میز ۲۴/۷ را اضافه می‌کند، به‌علاوه پشتیبانی اولویت‌دار واتساپ. اگر به جریان آشپزخانه و رزرو نیاز ندارید — Basic همه چیز را پوشش می‌دهد." },
    { q: "آیا از سفارش‌ها کمیسیون می‌گیرید؟", a: "نه. هر سفارش — از منوی QR یا توسط گارسون دریافت‌شده — مستقیماً به رستوران می‌رود، بدون درصد یا کمیسیون واسطه‌ها. شما یک هزینه ماهانه ثابت دارید و هیچ کسر دیگری نیست." },
    { q: "دوره آزمایشی ۱۴ روزه شامل چه چیزی است؟", a: "دسترسی کامل به همه ویژگی‌ها در هر دو طرح، بدون کارت. پس از ۱۴ روز اگر روش پرداختی متصل نشود حساب به‌صورت خودکار متوقف می‌شود. هیچ کسر خودکاری بدون رضایت شما انجام نمی‌شود." },
    { q: "پس از ۱۴ روز چه می‌شود؟", a: "اگر روش پرداختی متصل نشود، حساب به‌صورت خودکار متوقف می‌شود. پنل مدیریت در حالت فقط‌خواندنی در دسترس می‌ماند، اما منوی QR برای مهمانان و دریافت سفارش به‌طور موقت غیرفعال می‌شوند. ما هرگز بدون رضایت شما کسر نمی‌کنیم." },
    { q: "در دوره توقف چه اتفاقی برای منو، سفارش‌ها و داده‌های من می‌افتد؟", a: "همه چیز به‌طور کامل حفظ می‌شود: منو، عکس غذاها، تاریخچه سفارش‌ها، رزروها، تنظیمات طراحی، آمارها. پرداخت را حتی یک ماه یا شش ماه بعد متصل کنید — همه چیز همان‌طور که بود برمی‌گردد، هیچ چیز از دست نمی‌رود." },
    { q: "آیا کدهای QR روی میزها پس از دوره آزمایشی کار خواهند کرد؟", a: "اگر حساب متوقف باشد، کدهای QR به مهمانان پیام «به‌طور موقت در دسترس نیست» نشان می‌دهند. لازم نیست کدهای QR جدید چاپ کنید: به‌محض اتصال پرداخت، همان کدها دوباره منو را باز می‌کنند." },
    { q: "آیا می‌توانم بعداً از Basic به Pro ارتقا دهم؟", a: "بله، ارتقا با یک کلیک در پنل مدیریت انجام می‌شود. اضافه‌بها به‌نسبت روزهای باقی‌مانده دوره پرداخت‌شده محاسبه می‌شود. کاهش از Pro به Basic نیز در دسترس است — KDS و رزرو غیرفعال خواهند شد، اما همه داده‌ها حفظ می‌شوند." },
    { q: "تخفیف سالانه چقدر است؟", a: "حدود ۳۰٪ نسبت به طرح ماهانه. مبلغ دقیق در زمان پرداخت در صفحه طرح نشان داده می‌شود." },
    { q: "آیا می‌توانم اشتراک را در هر زمان لغو کنم؟", a: "بله، لغو با یک کلیک در پنل مدیریت انجام می‌شود. پس از لغو، حساب تا پایان دوره پرداخت‌شده کار می‌کند، سپس متوقف می‌شود. داده‌ها حفظ می‌شوند و هر زمان که بخواهید می‌توانید بازگردید." },
    { q: "چه روش‌های پرداختی را می‌پذیرید؟", a: "Visa، Mastercard و American Express از طریق Stripe. Apple Pay و Google Pay نیز پشتیبانی می‌شوند. در اروپا — SEPA Direct Debit در طرح سالانه." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_fa_pricing_hero" />
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
