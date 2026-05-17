import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/ga/coras-orduithe-ar-line-bialann";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Córas orduithe ar líne do bhialann", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "ga", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Conas córas orduithe ar líne do bhialann a chur ar siúl", description: "Cuir orduithe díreacha ar líne ar siúl don bhialann i 4 chéim — gan crua-earraí POS, gan chomhbhailitheoir.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Cruthaigh bialann", text: "Cláraigh le ríomhphost nó Google i 30 soicind." },
    { "@type": "HowToStep", position: 2, name: "Cuir biachlár leis", text: "Drag-and-drop nó scanadh AI — iompórtálann an AI catagóirí, miasa agus praghsanna." },
    { "@type": "HowToStep", position: 3, name: "Roghnaigh cainéal", text: "Orduithe chuig taibléad cistine, chuig WhatsApp na bialainne nó an dá cheann le chéile." },
    { "@type": "HowToStep", position: 4, name: "Priontáil QR", text: "Íoslódáil QR (ceann in aghaidh an bhoird nó ceann in aghaidh na bialainne) agus greamaigh ar na boird." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
