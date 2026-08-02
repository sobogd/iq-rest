import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "de";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Was Gastronomen zu Preisen und Zahlung fragen. Ihre Frage nicht dabei? Schreiben Sie uns auf WhatsApp.",
  items: [
    { q: "Wie funktioniert die Preisgestaltung?", a: "Sie stellen Ihren eigenen Tarif zusammen. Die digitale QR-Speisekarte ist die Basis — sie umfasst KI-Übersetzung in 35 Sprachen und die Verwaltung von jedem Gerät. Dann fügen Sie nur hinzu, was Sie brauchen: Tischreservierung, das Küchen-Display mit Bestellannahme oder eine eigene Domain. Der Preis gilt pro Restaurant, und Mengenrabatte greifen automatisch ab dem zweiten Restaurant." },
    { q: "Berechnen Sie Provision auf Bestellungen?", a: "Nein. Jede Bestellung — aus einer QR-Speisekarte oder vom Service aufgenommen — geht direkt an das Restaurant, ohne Prozente oder Aggregator-Provisionen. Sie haben eine feste monatliche Gebühr und keine weiteren Abzüge." },
    { q: "Was umfasst die 14-tägige Testphase?", a: "Voller Zugriff auf alle Funktionen, ohne Kreditkarte. Nach 14 Tagen wird das Konto automatisch pausiert, wenn keine Zahlungsmethode hinterlegt ist. Es gibt keine automatischen Abbuchungen ohne Ihre Zustimmung." },
    { q: "Was passiert nach den 14 Tagen?", a: "Ist keine Zahlungsmethode hinterlegt, wird das Konto automatisch pausiert. Das Admin-Panel bleibt im Lesemodus verfügbar, aber die QR-Speisekarte für Gäste und die Bestellannahme sind vorübergehend deaktiviert. Wir buchen nie ohne Ihre Zustimmung ab." },
    { q: "Was passiert mit meiner Speisekarte, Bestellungen und Daten während der Pause?", a: "Alles bleibt vollständig erhalten: Speisekarte, Gerichtsfotos, Bestellhistorie, Reservierungen, Design-Einstellungen, Statistiken. Zahlung auch noch einen Monat oder ein halbes Jahr später hinterlegen — alles kehrt zurück wie es war, nichts geht verloren." },
    { q: "Funktionieren die QR-Codes an den Tischen nach der Testphase noch?", a: "Wenn das Konto pausiert ist, zeigen die QR-Codes den Gästen einen Hinweis „vorübergehend nicht verfügbar“. Sie müssen keine neuen QR-Codes drucken: Sobald die Zahlung hinterlegt ist, öffnen dieselben Codes die Speisekarte wieder." },
    { q: "Kann ich meinen Tarif später ändern?", a: "Ja — fügen Sie jederzeit im Admin-Panel Funktionen hinzu oder entfernen Sie sie. Die Differenz wird anteilig nach den verbleibenden Tagen der bezahlten Periode berechnet. Wenn Sie eine Funktion entfernen, wird sie deaktiviert, aber alle zugehörigen Daten bleiben erhalten." },
    { q: "Wie viele Restaurants kann ich verwalten?", a: "So viele, wie Sie brauchen — wählen Sie die Anzahl der Restaurants bei der Zusammenstellung Ihres Tarifs, alle über ein einziges Dashboard verwaltet. Mengenrabatte greifen automatisch, bis zu 50 % ab 5 Restaurants. Betreiben Sie eine größere Gruppe? Schreiben Sie uns auf WhatsApp wegen eines individuellen Tarifs." },
    { q: "Wie hoch ist der Jahresrabatt?", a: "Etwa 30 % gegenüber der monatlichen Abrechnung. Der genaue Betrag wird bei der Zusammenstellung Ihres Tarifs angezeigt." },
    { q: "Kann ich das Abo jederzeit kündigen?", a: "Ja, Kündigung mit einem Klick im Admin-Panel. Nach der Kündigung läuft das Konto bis zum Ende der bezahlten Periode weiter und wird dann pausiert. Daten bleiben erhalten und Sie können jederzeit zurückkehren." },
    { q: "Welche Zahlungsmethoden akzeptieren Sie?", a: "Visa, Mastercard und American Express über Stripe. Apple Pay und Google Pay werden ebenfalls unterstützt. In Europa — SEPA Direct Debit im Jahrestarif." },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Pricing" }],
  },
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: `${SITE}/${LOCALE}` },
        { "@type": "ListItem", position: 2, name: "Pricing", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digitale Speisekarte", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
    },
  ],
}).replace(/</g, "\\u003c");

export default function PricingPage() {
  return (
    <PricingTemplate
      locale={LOCALE}
      texts={DEFAULT}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
      trackPrefix="l_de_pricing_hero"
    />
  );
}
