import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/is/netpontunarkerfi-veitingastadar";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Netpöntunarkerfi fyrir veitingastað", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "is", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Hvernig á að kveikja á netpöntunarkerfi fyrir veitingastað", description: "Virkjaðu beinar netpantanir fyrir veitingastað á 4 skrefum — án POS vélbúnaðar, án aggregatora.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Búa til veitingastað", text: "Skráning með tölvupósti eða Google á 30 sekúndum." },
    { "@type": "HowToStep", position: 2, name: "Bæta við matseðli", text: "Drag-and-drop eða AI skönnun — AI flytur inn flokka, rétti og verð." },
    { "@type": "HowToStep", position: 3, name: "Velja rás", text: "Pantanir á eldhússpjaldtölvuna, í WhatsApp veitingastaðarins eða báðar samtímis." },
    { "@type": "HowToStep", position: 4, name: "Prenta QR", text: "Sæktu QR (eitt á borð eða eitt á veitingastað) og límdu á borðin." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
