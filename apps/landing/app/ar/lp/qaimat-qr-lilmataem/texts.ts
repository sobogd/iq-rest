import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ar, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /ar page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "قائمة QR للمطاعم. جاهزة في 5 دقائق.",
    sub: "قائمة QR لمطعمك في 5 دقائق. كل شيء مشمول: محرر للموبايل بدون كود، مسح القائمة بالذكاء الاصطناعي، رمز QR للطاولات وطلبات مباشرة بدون عمولات.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "أنا وزوجتي افتتحنا مقهى وقضينا أسابيع نبحث عن قائمة QR للمطاعم تدعم الطلبات على الطاولة والحجوزات بدون تصميم سيئ —",
    quoteAccent: "فبنينا قائمة QR التي أردناها بأنفسنا.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "ما هي قائمة QR للمطاعم؟",
        a: "قائمة QR للمطاعم هي رمز QR قابل للطباعة على الطاولة يمسحه الضيف بكاميرا الهاتف ليفتح القائمة في المتصفح — بدون تطبيق. مع IQ Rest تتضمن قائمة QR الطلبات على الطاولة، الحجوزات 24/7 وترجمة AI لـ 35 لغة، كل ذلك من الهاتف.",
      },
      {
        q: "كم تكلفة قائمة QR للمطاعم؟",
        a: "6.90 يورو/شهر، شامل كل شيء. رموز QR غير محدودة لكل طاولة، محرر كامل، طلبات مباشرة بدون عمولة، ترجمة AI لـ 35 لغة، حجوزات وتحليلات. 14 يومًا مجانًا، بدون بطاقة.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "قائمة QR للمطاعم.",
    headingAccent: "جاهزة في 5 دقائق.",
    sub: "14 يومًا مجانًا. بدون بطاقة. أكثر من 500 مطعم يستخدمون قائمة QR على IQ Rest.",
  },

  meta: {
    title: "قائمة QR للمطاعم — جاهزة في 5 دقائق | IQ Rest",
    description: "قائمة QR للمطاعم: رمز QR على كل طاولة، طلبات مباشرة بدون عمولة، ترجمة AI لـ 35 لغة. جاهزة في 5 دقائق، 14 يومًا مجانًا.",
    canonical: "https://iq-rest.com/ar/lp/qaimat-qr-lilmataem",
    ogLocale: "ar_SA",
    ogTitle: "قائمة QR للمطاعم — جاهزة في 5 دقائق",
    ogDescription: "قائمة QR مع طلبات مباشرة و35 لغة AI وحجوزات. جاهزة في 5 دقائق — 14 يومًا مجانًا.",
  },
};
