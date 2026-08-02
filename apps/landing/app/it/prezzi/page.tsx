import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "it";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Cosa chiedono i ristoratori su prezzi e pagamenti. Non trovi la tua domanda? Scrivici su WhatsApp.",
  items: [
    { q: "Come funziona il prezzo?", a: "Costruisci il tuo piano su misura. Il menu digitale con QR è la base — include la traduzione con IA in 35 lingue e la gestione da qualsiasi dispositivo. Poi aggiungi solo ciò che ti serve: la prenotazione dei tavoli, il display di cucina con presa degli ordini o un dominio personalizzato. Il prezzo è per ristorante e gli sconti per volume si applicano automaticamente a partire dal secondo ristorante." },
    { q: "Prendete una commissione sugli ordini?", a: "No. Ogni ordine — dal menu QR o preso da un cameriere — arriva direttamente al ristorante, senza percentuali né commissioni da aggregatore. Hai una tariffa mensile fissa e nessuna altra trattenuta." },
    { q: "Cosa include la prova di 14 giorni?", a: "Accesso completo a tutte le funzionalità, senza carta. Trascorsi i 14 giorni l'account viene messo in pausa automaticamente se non è stato collegato un metodo di pagamento. Non ci sono addebiti automatici senza il tuo consenso." },
    { q: "Cosa succede al termine dei 14 giorni?", a: "Se non hai collegato un metodo di pagamento, l'account viene messo in pausa automaticamente. Il pannello di amministrazione resta accessibile in sola lettura, ma il menu QR per gli ospiti e la presa degli ordini vengono temporaneamente disattivati. Non addebitiamo mai senza il tuo consenso." },
    { q: "Cosa succede al menu, agli ordini e ai dati durante la pausa?", a: "Resta tutto al suo posto: menu, foto dei piatti, storico ordini, prenotazioni, impostazioni di design, statistiche. Anche se colleghi il pagamento dopo un mese o sei mesi, tutto torna esattamente com'era e non si perde nulla." },
    { q: "I QR sui tavoli continuano a funzionare dopo la prova?", a: "Se l'account è in pausa, i QR mostrano agli ospiti un avviso «temporaneamente non disponibile». Non serve stampare nuovi QR: appena colleghi il pagamento, gli stessi codici riaprono il menu." },
    { q: "Posso modificare il mio piano più avanti?", a: "Sì, puoi aggiungere o rimuovere funzionalità in qualsiasi momento dal pannello. La differenza viene proporzionata sui giorni rimanenti del periodo pagato. Se rimuovi una funzionalità, viene disattivata ma tutti i suoi dati restano al loro posto." },
    { q: "Quanti ristoranti posso gestire?", a: "Tutti quelli che ti servono — scegli il numero di ristoranti mentre costruisci il piano, gestendoli da un unico pannello. Gli sconti per volume si applicano automaticamente, fino al 50% con 5 o più ristoranti. Gestisci un gruppo più grande? Scrivici su WhatsApp per un piano su misura." },
    { q: "Che sconto c'è sul piano annuale?", a: "Circa il 30% rispetto al pagamento mensile. L'importo esatto viene mostrato mentre costruisci il tuo piano." },
    { q: "Posso disdire l'abbonamento in qualsiasi momento?", a: "Sì, la disdetta si fa con un clic dal pannello. Dopo la disdetta l'account funziona fino alla fine del periodo pagato e poi viene messo in pausa. I dati restano e puoi tornare quando vuoi." },
    { q: "Quali metodi di pagamento accettate?", a: "Carte Visa, Mastercard e American Express tramite Stripe. Sono supportati anche Apple Pay e Google Pay. In Europa — SEPA Direct Debit con il piano annuale." },
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Prezzi" }],
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
        { "@type": "ListItem", position: 2, name: "Prezzi", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digital menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_it_pricing_hero"
    />
  );
}
