import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/sk/online-objednavkovy-system-restauracia";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online objednávkový systém pre reštauráciu", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "sk", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Ako zapnúť online objednávkový systém pre reštauráciu", description: "Aktivuj priame online objednávky pre reštauráciu v 4 krokoch — bez POS hardvéru, bez agregátora.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Vytvoriť reštauráciu", text: "Registrácia e-mailom alebo Google za 30 sekúnd." },
    { "@type": "HowToStep", position: 2, name: "Pridať menu", text: "Drag-and-drop alebo AI skenovanie — AI importuje kategórie, jedlá a ceny." },
    { "@type": "HowToStep", position: 3, name: "Vybrať kanál", text: "Objednávky na kuchynský tablet, do WhatsAppu reštaurácie alebo oba súčasne." },
    { "@type": "HowToStep", position: 4, name: "Vytlačiť QR", text: "Stiahni QR (jeden na stôl alebo jeden na reštauráciu) a nalep na stoly." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
