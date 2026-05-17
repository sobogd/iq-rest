import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/el/online-systima-paragelion-estiatorio";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online σύστημα παραγγελιών για εστιατόριο", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "el", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Πώς να ενεργοποιήσεις online σύστημα παραγγελιών για εστιατόριο", description: "Ενεργοποίησε άμεσες online παραγγελίες για εστιατόριο σε 4 βήματα — χωρίς POS hardware, χωρίς aggregator.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Δημιούργησε εστιατόριο", text: "Εγγραφή με email ή Google σε 30 δευτερόλεπτα." },
    { "@type": "HowToStep", position: 2, name: "Πρόσθεσε μενού", text: "Drag-and-drop ή AI σάρωση — η AI εισάγει κατηγορίες, πιάτα και τιμές." },
    { "@type": "HowToStep", position: 3, name: "Επίλεξε κανάλι", text: "Παραγγελίες σε tablet κουζίνας, στο WhatsApp του εστιατορίου ή και τα δύο μαζί." },
    { "@type": "HowToStep", position: 4, name: "Τύπωσε QR", text: "Κατέβασε QR (ένα ανά τραπέζι ή ένα ανά εστιατόριο) και κόλλα στα τραπέζια." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
