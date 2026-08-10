import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "fa";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "آنچه رستوران‌داران درباره قیمت و پرداخت می‌پرسند. سؤال خود را پیدا نمی‌کنید؟ در WhatsApp به ما پیام دهید.",
  items: [
    { q: "قیمت‌گذاری چطور کار می‌کند؟", a: "طرح خودتان را می‌سازید. منوی دیجیتال QR پایه است — شامل ترجمه هوش مصنوعی به ۳۵ زبان و مدیریت از هر دستگاهی. سپس فقط آنچه را نیاز دارید اضافه می‌کنید: رزرو میز، نمایشگر آشپزخانه با دریافت سفارش، یا دامنه اختصاصی. قیمت به‌ازای هر رستوران است و تخفیف حجمی از رستوران دوم به‌صورت خودکار اعمال می‌شود." },
    { q: "آیا از سفارش‌ها کمیسیون می‌گیرید؟", a: "نه. هر سفارش — از منوی QR یا توسط گارسون دریافت‌شده — مستقیماً به رستوران می‌رود، بدون درصد یا کمیسیون واسطه‌ها. شما یک هزینه ماهانه ثابت دارید و هیچ کسر دیگری نیست." },
    { q: "دوره آزمایشی ۱۴ روزه شامل چه چیزی است؟", a: "دسترسی کامل به همه ویژگی‌ها، بدون نیاز به کارت. پس از ۱۴ روز اگر روش پرداختی متصل نشود، حساب به‌صورت خودکار متوقف می‌شود. هیچ کسر خودکاری بدون رضایت شما انجام نمی‌شود." },
    { q: "پس از ۱۴ روز چه می‌شود؟", a: "اگر روش پرداختی متصل نشود، حساب به‌صورت خودکار متوقف می‌شود. پنل مدیریت در حالت فقط‌خواندنی در دسترس می‌ماند، اما منوی QR برای مهمانان و دریافت سفارش به‌طور موقت غیرفعال می‌شوند. ما هرگز بدون رضایت شما کسر نمی‌کنیم." },
    { q: "در دوره توقف چه اتفاقی برای منو، سفارش‌ها و داده‌های من می‌افتد؟", a: "همه چیز به‌طور کامل حفظ می‌شود: منو، عکس غذاها، تاریخچه سفارش‌ها، رزروها، تنظیمات طراحی، آمارها. پرداخت را حتی یک ماه یا شش ماه بعد متصل کنید — همه چیز همان‌طور که بود برمی‌گردد، هیچ چیز از دست نمی‌رود." },
    { q: "آیا کدهای QR روی میزها پس از دوره آزمایشی کار خواهند کرد؟", a: "اگر حساب متوقف باشد، کدهای QR به مهمانان پیام «به‌طور موقت در دسترس نیست» نشان می‌دهند. لازم نیست کدهای QR جدید چاپ کنید: به‌محض اتصال پرداخت، همان کدها دوباره منو را باز می‌کنند." },
    { q: "آیا می‌توانم بعداً طرحم را تغییر دهم؟", a: "بله — هر زمان در پنل مدیریت می‌توانید ویژگی‌ها را اضافه یا حذف کنید. تفاوت هزینه به‌نسبت روزهای باقی‌مانده دوره پرداخت‌شده محاسبه می‌شود. اگر ویژگی‌ای را حذف کنید، غیرفعال می‌شود اما همه داده‌های آن حفظ می‌شوند." },
    { q: "چند رستوران می‌توانم مدیریت کنم؟", a: "هر تعداد که نیاز دارید — هنگام ساختن طرح، تعداد رستوران‌ها را انتخاب کنید، همه از یک داشبورد واحد مدیریت می‌شوند. تخفیف حجمی به‌صورت خودکار اعمال می‌شود، تا ۵۰٪ تخفیف با ۵ رستوران یا بیشتر. گروه بزرگ‌تری دارید؟ درباره طرح سفارشی در WhatsApp به ما پیام دهید." },
    { q: "تخفیف سالانه چقدر است؟", a: "حدود ۳۰٪ نسبت به پرداخت ماهانه. مبلغ دقیق هنگام ساختن طرح نشان داده می‌شود." },
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
