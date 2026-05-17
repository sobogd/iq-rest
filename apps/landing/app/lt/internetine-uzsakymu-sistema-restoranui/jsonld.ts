import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/lt/internetine-uzsakymu-sistema-restoranui";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Internetinė užsakymų sistema restoranui", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "lt", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Kaip įjungti internetinę užsakymų sistemą restoranui", description: "Aktyvuok tiesioginius internetinius užsakymus restoranui per 4 žingsnius — be POS įrangos, be agregatoriaus.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Sukurti restoraną", text: "Registracija el. paštu arba Google per 30 sekundžių." },
    { "@type": "HowToStep", position: 2, name: "Pridėti meniu", text: "Drag-and-drop arba AI skenavimas — AI importuoja kategorijas, patiekalus ir kainas." },
    { "@type": "HowToStep", position: 3, name: "Pasirinkti kanalą", text: "Užsakymai į virtuvės planšetę, į restorano WhatsApp arba abu vienu metu." },
    { "@type": "HowToStep", position: 4, name: "Atspausdinti QR", text: "Atsisiųsk QR (vieną stalui arba vieną restoranui) ir priklijuok prie stalų." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
