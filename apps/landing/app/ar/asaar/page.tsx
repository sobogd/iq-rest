import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ar";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "ما يسأل عنه أصحاب المطاعم بشأن الأسعار والدفع. لا تجد سؤالك؟ راسلنا على WhatsApp.",
  items: [
    { q: "كيف يعمل نظام التسعير؟", a: "تبني خطتك بنفسك. قائمة QR الرقمية هي الأساس — تتضمن الترجمة الذكية إلى 35 لغة والإدارة من أي جهاز. ثم تضيف فقط ما تحتاجه: حجز الطاولات، أو شاشة المطبخ مع استقبال الطلبات، أو نطاقاً مخصصاً. السعر لكل مطعم، وتُطبَّق خصومات الكمية تلقائياً بدءاً من المطعم الثاني." },
    { q: "هل تأخذون عمولة على الطلبات؟", a: "لا. كل طلب — من قائمة QR أو يستقبله النادل — يذهب مباشرة إلى المطعم، بدون نسب أو عمولات وسطاء. لديك رسم شهري ثابت ولا خصومات أخرى." },
    { q: "ماذا تتضمن الفترة التجريبية لـ 14 يوماً؟", a: "وصول كامل لجميع الميزات، بدون بطاقة. بعد 14 يوماً يتم إيقاف الحساب تلقائياً إذا لم تُربط وسيلة دفع. لا توجد خصومات تلقائية بدون موافقتك." },
    { q: "ماذا يحدث بعد 14 يوماً؟", a: "إذا لم تُربط وسيلة دفع، يتم إيقاف الحساب تلقائياً. تبقى لوحة الإدارة متاحة بوضع القراءة فقط، لكن قائمة QR للضيوف واستقبال الطلبات معطّلتان مؤقتاً. لا نخصم أبداً بدون موافقتك." },
    { q: "ماذا يحدث لقائمتي وطلباتي وبياناتي خلال فترة الإيقاف؟", a: "يُحفظ كل شيء بالكامل: القائمة، صور الأطباق، سجل الطلبات، الحجوزات، إعدادات التصميم، الإحصاءات. اربط الدفع حتى بعد شهر أو ستة أشهر — يعود كل شيء كما كان، لا يضيع شيء." },
    { q: "هل تستمر رموز QR على الطاولات في العمل بعد الفترة التجريبية؟", a: "إذا كان الحساب موقوفاً، تعرض رموز QR للضيوف رسالة «غير متاح مؤقتاً». لست بحاجة لطباعة رموز QR جديدة: فور ربط الدفع، تفتح الرموز نفسها القائمة مجدداً." },
    { q: "هل يمكنني تغيير خطتي لاحقاً؟", a: "نعم — أضف أو أزل الميزات في أي وقت من لوحة الإدارة. يُحسب الفرق تناسبياً مع الأيام المتبقية من الفترة المدفوعة. إذا أزلت ميزة، تُعطّل لكن تُحفظ كل بياناتها." },
    { q: "كم عدد المطاعم التي يمكنني إدارتها؟", a: "بقدر ما تحتاج — اختر عدد المطاعم أثناء بناء خطتك، وكلها تُدار من لوحة واحدة. تُطبَّق خصومات الكمية تلقائياً، حتى 50% مع 5 مطاعم أو أكثر. تدير مجموعة أكبر؟ راسلنا على WhatsApp بخصوص خطة مخصصة." },
    { q: "ما هو الخصم السنوي؟", a: "حوالي 30% مقارنة بالدفع الشهري. يُعرض المبلغ الدقيق أثناء بناء خطتك." },
    { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "نعم، الإلغاء بنقرة واحدة في لوحة الإدارة. بعد الإلغاء يستمر الحساب حتى نهاية الفترة المدفوعة، ثم يتم إيقافه. تُحفظ البيانات ويمكنك العودة متى شئت." },
    { q: "ما طرق الدفع التي تقبلونها؟", a: "Visa و Mastercard و American Express عبر Stripe. Apple Pay و Google Pay مدعومان أيضاً. في أوروبا — SEPA Direct Debit على الخطة السنوية." },
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
        { "@type": "Offer", name: "القائمة الرقمية", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
