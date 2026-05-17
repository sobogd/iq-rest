import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/ar/nizam-talabat-online-matam";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — نظام طلبات أونلاين للمطاعم", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "ar", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "كيف تفعّل نظام طلبات أونلاين لمطعمك", description: "فعّل الطلبات أونلاين المباشرة لمطعمك في 4 خطوات — بدون عتاد نقطة بيع، بدون مجمع.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "أنشئ المطعم", text: "تسجيل بالبريد أو Google في 30 ثانية." },
    { "@type": "HowToStep", position: 2, name: "أضف القائمة", text: "سحب وإفلات أو مسح AI لقائمة ورقية — يستورد AI الفئات والأطباق والأسعار." },
    { "@type": "HowToStep", position: 3, name: "اختر القناة", text: "أرسل الطلبات الواردة إلى لوحي المطبخ، WhatsApp المطعم أو الاثنين معاً." },
    { "@type": "HowToStep", position: 4, name: "اطبع QR", text: "حمّل QR (واحد لكل طاولة أو واحد للمطعم بأكمله) والصقه على الطاولات." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
