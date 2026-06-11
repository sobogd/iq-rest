import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ar";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "ما يسأل عنه أصحاب المطاعم بشأن الأسعار والدفع. لا تجد سؤالك؟ راسلنا على واتساب.",
  items: [
    { q: "ما الفرق بين Basic و Pro؟", a: "تتضمن Basic القائمة الرقمية + QR، الترجمة الذكية إلى 35 لغة، استقبال الطلبات من القائمة (اختياري) والإدارة من أي جهاز. تضيف Pro شاشة المطبخ (KDS) وحجز الطاولات أونلاين 24/7، إضافة إلى دعم واتساب ذي الأولوية. إذا لم تكن تحتاج تدفق المطبخ والحجوزات — تغطي Basic كل شيء." },
    { q: "هل تأخذون عمولة على الطلبات؟", a: "لا. كل طلب — من قائمة QR أو يستقبله النادل — يذهب مباشرة إلى المطعم، بدون نسب أو عمولات وسطاء. لديك رسم شهري ثابت ولا خصومات أخرى." },
    { q: "ماذا تتضمن الفترة التجريبية لـ 14 يوماً؟", a: "وصول كامل لجميع الميزات في كلتا الخطتين، بدون بطاقة. بعد 14 يوماً يتم إيقاف الحساب تلقائياً إذا لم تُربط وسيلة دفع. لا توجد خصومات تلقائية بدون موافقتك." },
    { q: "ماذا يحدث بعد 14 يوماً؟", a: "إذا لم تُربط وسيلة دفع، يتم إيقاف الحساب تلقائياً. تبقى لوحة الإدارة متاحة بوضع القراءة فقط، لكن قائمة QR للضيوف واستقبال الطلبات معطّلتان مؤقتاً. لا نخصم أبداً بدون موافقتك." },
    { q: "ماذا يحدث لقائمتي وطلباتي وبياناتي خلال فترة الإيقاف؟", a: "يُحفظ كل شيء بالكامل: القائمة، صور الأطباق، سجل الطلبات، الحجوزات، إعدادات التصميم، الإحصاءات. اربط الدفع حتى بعد شهر أو ستة أشهر — يعود كل شيء كما كان، لا يضيع شيء." },
    { q: "هل تستمر رموز QR على الطاولات في العمل بعد الفترة التجريبية؟", a: "إذا كان الحساب موقوفاً، تعرض رموز QR للضيوف رسالة «غير متاح مؤقتاً». لست بحاجة لطباعة رموز QR جديدة: فور ربط الدفع، تفتح الرموز نفسها القائمة مجدداً." },
    { q: "هل يمكنني الترقية من Basic إلى Pro لاحقاً؟", a: "نعم، الترقية بنقرة واحدة في لوحة الإدارة. تُحسب الزيادة تناسبياً مع الأيام المتبقية من الفترة المدفوعة. التخفيض من Pro إلى Basic متاح أيضاً — تُعطّل KDS والحجوزات، لكن جميع البيانات محفوظة." },
    { q: "ما هو الخصم السنوي؟", a: "حوالي 30% مقارنة بالخطة الشهرية. يُعرض المبلغ الدقيق عند الدفع في صفحة الخطة." },
    { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "نعم، الإلغاء بنقرة واحدة في لوحة الإدارة. بعد الإلغاء يستمر الحساب حتى نهاية الفترة المدفوعة، ثم يتم إيقافه. تُحفظ البيانات ويمكنك العودة متى شئت." },
    { q: "ما طرق الدفع التي تقبلونها؟", a: "Visa و Mastercard و American Express عبر Stripe. Apple Pay و Google Pay مدعومان أيضاً. في أوروبا — الخصم المباشر SEPA على الخطة السنوية." },
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
        { "@type": "Offer", name: "Basic", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: SCHEMA_PRICE_PRO_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_ar_pricing_hero"
    />
  );
}
