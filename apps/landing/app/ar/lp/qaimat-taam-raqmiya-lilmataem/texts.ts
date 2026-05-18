import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ar, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /ar page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "من 6.90 € شهرياً · 14 يوماً مجاناً · إلغاء في أي وقت",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "قائمة رقمية للمطاعم. جاهزة في 5 دقائق.",
    sub: "قائمة رقمية لمطعمك في 5 دقائق. كل شيء مشمول: محرر للموبايل بدون كود، مسح القائمة بالذكاء الاصطناعي، رمز QR للطاولات وطلبات مباشرة بدون عمولات.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "أنا وزوجتي افتتحنا مقهى وقضينا أسابيع نبحث عن قائمة طعام رقمية للمطاعم تتولى أيضاً الطلبات على الطاولة والحجوزات، دون أن تكون ثقيلة أو قبيحة —",
    quoteAccent: "فبنينا القائمة الرقمية التي أردناها نحن.",
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
        q: "ما هي قائمة الطعام الرقمية للمطاعم؟",
        a: "قائمة الطعام الرقمية للمطاعم هي النسخة الإلكترونية للقائمة الورقية: يقوم الضيف بمسح رمز QR على الطاولة بكاميرا هاتفه ويرى فوراً الأطباق والصور والمواد المسببة للحساسية والأسعار في المتصفح — دون تطبيق. مع IQ Rest تشمل القائمة الرقمية أيضاً الطلبات المباشرة على الطاولة، والحجوزات 24/7، والترجمة بالذكاء الاصطناعي إلى 35 لغة — كل شيء قابل للتحديث في الوقت الفعلي من الهاتف.",
      },
      {
        q: "كم تكلفة قائمة الطعام الرقمية للمطاعم؟",
        a: "6.90 € شهرياً، كل شيء شامل (خصم على الخطة السنوية). محرر كامل، رموز QR غير محدودة، طلبات مباشرة بدون عمولة، ترجمة بالذكاء الاصطناعي إلى 35 لغة، حجوزات وتحليلات. 14 يوماً تجربة مجانية، بدون بطاقة.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "قائمة طعام رقمية للمطاعم.",
    headingAccent: "جاهزة في 5 دقائق.",
    sub: "14 يوماً مجاناً. بدون بطاقة. انضم إلى 500+ مطعم يديرون قائمتهم الرقمية على IQ Rest.",
  },

  meta: {
    title: "قائمة طعام رقمية للمطاعم — 5 دقائق | IQ Rest",
    description: "قائمة طعام رقمية للمطاعم: رمز QR قابل للطباعة، طلبات مباشرة بدون عمولة، ترجمة بالذكاء الاصطناعي إلى 35 لغة. 5 دقائق، 14 يوماً مجاناً.",
    canonical: "https://iq-rest.com/ar/lp/qaimat-taam-raqmiya-lilmataem",
    ogLocale: "ar_SA",
    ogTitle: "قائمة طعام رقمية للمطاعم — في 5 دقائق",
    ogDescription: "قائمة طعام رقمية للمطاعم برمز QR وطلبات مباشرة و35 لغة AI. على الإنترنت في 5 دقائق — 14 يوماً مجاناً.",
  },
};
