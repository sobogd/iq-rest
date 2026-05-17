import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/tr/restoran-online-siparis-sistemi";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Restoran Online Sipariş Sistemi", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "tr", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = {
    "@type": "HowTo",
    name: "Restoran online sipariş sistemi nasıl aktive edilir",
    description: "4 adımda restoranınız için doğrudan online sipariş — POS donanımı yok, agregatör yok.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Restoran oluştur", text: "30 saniyede e-posta veya Google ile kayıt." },
      { "@type": "HowToStep", position: 2, name: "Menü ekle", text: "Sürükle-bırak veya kağıt menüyü AI ile tara — AI kategorileri, yemekleri ve fiyatları içe aktarır." },
      { "@type": "HowToStep", position: 3, name: "Kanal seç", text: "Siparişleri mutfak tabletine, restoran WhatsApp'ına veya ikisine birden gönderin." },
      { "@type": "HowToStep", position: 4, name: "QR'ları yazdır", text: "QR'ı (masa başına bir tane veya tüm mekan için) indirip masalara yapıştırın." },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
