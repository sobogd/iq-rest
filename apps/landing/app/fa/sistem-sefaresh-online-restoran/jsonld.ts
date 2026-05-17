import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/fa/sistem-sefaresh-online-restoran";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — سیستم سفارش آنلاین برای رستوران", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "fa", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "چگونه سیستم سفارش آنلاین برای رستوران را روشن کنیم", description: "سفارش آنلاین مستقیم برای رستوران را در ۴ قدم فعال کنید — بدون سخت‌افزار POS، بدون واسطه.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "ساخت رستوران", text: "ثبت‌نام با ایمیل یا گوگل در ۳۰ ثانیه." },
    { "@type": "HowToStep", position: 2, name: "افزودن منو", text: "Drag-and-drop یا اسکن AI — AI دسته‌ها، غذا و قیمت را وارد می‌کند." },
    { "@type": "HowToStep", position: 3, name: "انتخاب کانال", text: "سفارش روی تبلت آشپزخانه، در واتس‌اپ رستوران یا هر دو هم‌زمان." },
    { "@type": "HowToStep", position: 4, name: "چاپ QR", text: "QR را (یکی برای هر میز یا یکی برای کل رستوران) دانلود و روی میزها بچسبان." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
