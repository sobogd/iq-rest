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

const LOCALE = "el";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Τι ρωτούν οι εστιάτορες σχετικά με τιμές και πληρωμές. Δεν βρίσκετε την ερώτησή σας; Γράψτε μας στο WhatsApp.",
  items: [
    { q: "Ποια είναι η διαφορά μεταξύ Basic και Pro;", a: "Το Basic περιλαμβάνει το ψηφιακό + QR μενού, μετάφραση AI σε 35 γλώσσες, παραγγελίες από το μενού (προαιρετικά) και διαχείριση από κάθε συσκευή. Το Pro προσθέτει την οθόνη κουζίνας (KDS) και την online κράτηση τραπεζιών 24/7, καθώς και υποστήριξη WhatsApp με προτεραιότητα. Αν δεν χρειάζεστε ροή κουζίνας και κρατήσεις — το Basic καλύπτει τα πάντα." },
    { q: "Παίρνετε προμήθεια από τις παραγγελίες;", a: "Όχι. Κάθε παραγγελία — από QR μενού ή που λαμβάνεται από σερβιτόρο — πηγαίνει απευθείας στο εστιατόριο, χωρίς ποσοστά ή προμήθειες aggregators. Έχετε σταθερό μηνιαίο τέλος και καμία άλλη παρακράτηση." },
    { q: "Τι περιλαμβάνει η δοκιμή 14 ημερών;", a: "Πλήρης πρόσβαση σε όλες τις δυνατότητες και των δύο πακέτων, χωρίς κάρτα. Μετά τις 14 ημέρες ο λογαριασμός παγώνει αυτόματα αν δεν συνδεθεί μέθοδος πληρωμής. Δεν υπάρχουν αυτόματες χρεώσεις χωρίς τη συγκατάθεσή σας." },
    { q: "Τι συμβαίνει μετά τις 14 ημέρες;", a: "Αν δεν έχει συνδεθεί μέθοδος πληρωμής, ο λογαριασμός παγώνει αυτόματα. Το πάνελ διαχείρισης παραμένει διαθέσιμο σε λειτουργία μόνο ανάγνωσης, αλλά το QR μενού πελατών και η λήψη παραγγελιών είναι προσωρινά απενεργοποιημένα. Δεν χρεώνουμε ποτέ χωρίς τη συγκατάθεσή σας." },
    { q: "Τι συμβαίνει με το μενού, τις παραγγελίες και τα δεδομένα κατά την παύση;", a: "Όλα διατηρούνται πλήρως: μενού, φωτογραφίες πιάτων, ιστορικό παραγγελιών, κρατήσεις, ρυθμίσεις σχεδιασμού, στατιστικά. Συνδέστε πληρωμή ακόμη και μετά από έναν μήνα ή έξι μήνες — όλα επιστρέφουν όπως ήταν, δεν χάνεται τίποτα." },
    { q: "Θα δουλεύουν οι QR κωδικοί στα τραπέζια μετά τη δοκιμή;", a: "Αν ο λογαριασμός είναι σε παύση, οι QR κωδικοί δείχνουν στους πελάτες ένα μήνυμα «προσωρινά μη διαθέσιμο». Δεν χρειάζεται να εκτυπώσετε νέους QR κωδικούς: μόλις συνδεθεί η πληρωμή, οι ίδιοι κωδικοί ανοίγουν ξανά το μενού." },
    { q: "Μπορώ να αλλάξω από Basic σε Pro αργότερα;", a: "Ναι, η αναβάθμιση γίνεται με ένα κλικ στο πάνελ διαχείρισης. Η επιπλέον χρέωση υπολογίζεται αναλογικά με τις υπόλοιπες ημέρες της πληρωμένης περιόδου. Η μετάβαση από Pro σε Basic είναι επίσης διαθέσιμη — το KDS και οι κρατήσεις θα απενεργοποιηθούν, αλλά όλα τα δεδομένα διατηρούνται." },
    { q: "Ποια είναι η ετήσια έκπτωση;", a: "Περίπου 30 % σε σχέση με το μηνιαίο πακέτο. Το ακριβές ποσό εμφανίζεται κατά την πληρωμή στη σελίδα του πακέτου." },
    { q: "Μπορώ να ακυρώσω τη συνδρομή οποτεδήποτε;", a: "Ναι, η ακύρωση γίνεται με ένα κλικ στο πάνελ διαχείρισης. Μετά την ακύρωση ο λογαριασμός λειτουργεί έως το τέλος της πληρωμένης περιόδου, στη συνέχεια παγώνει. Τα δεδομένα διατηρούνται και μπορείτε να επιστρέψετε όποτε θέλετε." },
    { q: "Ποιες μεθόδους πληρωμής δέχεστε;", a: "Visa, Mastercard και American Express μέσω Stripe. Υποστηρίζονται επίσης Apple Pay και Google Pay. Στην Ευρώπη — SEPA Direct Debit στο ετήσιο πακέτο." },
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

      <Section dataSection="pricing_hero" noContainer accent>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_el_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer accent className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
