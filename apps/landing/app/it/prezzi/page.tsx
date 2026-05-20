import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "it";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Cosa chiedono i ristoratori su prezzi e pagamenti. Non trovi la tua domanda? Scrivici su WhatsApp.",
  items: [
    { q: "Qual è la differenza tra Basic e Pro?", a: "Basic include il menu digitale + QR, la traduzione con IA in 35 lingue, gli ordini dal menu (opzionali) e la gestione da qualsiasi dispositivo. Pro aggiunge il display di cucina (KDS), la prenotazione online 24/7 dei tavoli e il supporto prioritario su WhatsApp. Se non hai bisogno della parte cucina e prenotazioni, Basic copre l'essenziale." },
    { q: "Prendete una commissione sugli ordini?", a: "No. Ogni ordine — dal menu QR o preso da un cameriere — arriva direttamente al ristorante, senza percentuali né commissioni da aggregatore. Hai una tariffa mensile fissa e nessuna altra trattenuta." },
    { q: "Cosa include la prova di 14 giorni?", a: "Accesso completo a tutte le funzionalità di entrambi i piani, senza carta. Trascorsi i 14 giorni l'account viene messo in pausa automaticamente se non è stato collegato un metodo di pagamento. Non ci sono addebiti automatici senza il tuo consenso." },
    { q: "Cosa succede al termine dei 14 giorni?", a: "Se non hai collegato un metodo di pagamento, l'account viene messo in pausa automaticamente. Il pannello di amministrazione resta accessibile in sola lettura, ma il menu QR per gli ospiti e gli ordini vengono temporaneamente disattivati. Non addebitiamo mai senza il tuo consenso." },
    { q: "Cosa succede al menu, agli ordini e ai dati durante la pausa?", a: "Resta tutto al suo posto: menu, foto dei piatti, storico ordini, prenotazioni, impostazioni di design, statistiche. Anche se colleghi il pagamento dopo un mese o sei mesi, tutto torna esattamente com'era e non si perde nulla." },
    { q: "I QR sui tavoli smettono di funzionare dopo la prova?", a: "Se l'account è in pausa, i QR mostrano agli ospiti un avviso «temporaneamente non disponibile». Non serve stampare nuovi QR: appena colleghi il pagamento, gli stessi codici riaprono il menu." },
    { q: "Posso passare da Basic a Pro più avanti?", a: "Sì, il passaggio si fa con un clic dal pannello. La differenza viene proporzionata sui giorni rimanenti del periodo pagato. Anche il passaggio da Pro a Basic è disponibile — il KDS e le prenotazioni vengono disattivati, ma tutti i dati restano." },
    { q: "Che sconto c'è sul piano annuale?", a: "Circa il 30% rispetto al pagamento mensile. L'importo esatto viene mostrato al momento del pagamento nella pagina del piano." },
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
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Basic", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: "24.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <LandingHeaderLp texts={DEFAULT.header} locale={LOCALE} featureLinks={DEFAULT.footer.featureLinks} />

      <Section dataSection="pricing_hero" noContainer>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_it_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" accent noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
