import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "el";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Τι ρωτούν οι εστιάτορες σχετικά με τιμές και πληρωμές. Δεν βρίσκετε την ερώτησή σας; Γράψτε μας στο WhatsApp.",
  items: [
    { q: "Πώς λειτουργεί η τιμολόγηση;", a: "Φτιάχνετε το δικό σας πλάνο. Το ψηφιακό QR μενού είναι η βάση — περιλαμβάνει μετάφραση AI σε 35 γλώσσες και διαχείριση από κάθε συσκευή. Στη συνέχεια προσθέτετε μόνο ό,τι χρειάζεστε: κρατήσεις τραπεζιών, οθόνη κουζίνας με λήψη παραγγελιών ή προσαρμοσμένο domain. Η τιμή είναι ανά εστιατόριο και οι εκπτώσεις όγκου εφαρμόζονται αυτόματα από το δεύτερο εστιατόριο." },
    { q: "Παίρνετε προμήθεια από τις παραγγελίες;", a: "Όχι. Κάθε παραγγελία — από QR μενού ή που λαμβάνεται από σερβιτόρο — πηγαίνει απευθείας στο εστιατόριο, χωρίς ποσοστά ή προμήθειες aggregators. Έχετε σταθερό μηνιαίο τέλος και καμία άλλη παρακράτηση." },
    { q: "Τι περιλαμβάνει η δοκιμή 14 ημερών;", a: "Πλήρης πρόσβαση σε όλες τις δυνατότητες, χωρίς κάρτα. Μετά τις 14 ημέρες ο λογαριασμός παγώνει αυτόματα αν δεν συνδεθεί μέθοδος πληρωμής. Δεν υπάρχουν αυτόματες χρεώσεις χωρίς τη συγκατάθεσή σας." },
    { q: "Τι συμβαίνει μετά τις 14 ημέρες;", a: "Αν δεν έχει συνδεθεί μέθοδος πληρωμής, ο λογαριασμός παγώνει αυτόματα. Το πάνελ διαχείρισης παραμένει διαθέσιμο σε λειτουργία μόνο ανάγνωσης, αλλά το QR μενού πελατών και η λήψη παραγγελιών είναι προσωρινά απενεργοποιημένα. Δεν χρεώνουμε ποτέ χωρίς τη συγκατάθεσή σας." },
    { q: "Τι συμβαίνει με το μενού, τις παραγγελίες και τα δεδομένα κατά την παύση;", a: "Όλα διατηρούνται πλήρως: μενού, φωτογραφίες πιάτων, ιστορικό παραγγελιών, κρατήσεις, ρυθμίσεις σχεδιασμού, στατιστικά. Συνδέστε πληρωμή ακόμη και μετά από έναν μήνα ή έξι μήνες — όλα επιστρέφουν όπως ήταν, δεν χάνεται τίποτα." },
    { q: "Θα δουλεύουν οι QR κωδικοί στα τραπέζια μετά τη δοκιμή;", a: "Αν ο λογαριασμός είναι σε παύση, οι QR κωδικοί δείχνουν στους πελάτες ένα μήνυμα «προσωρινά μη διαθέσιμο». Δεν χρειάζεται να εκτυπώσετε νέους QR κωδικούς: μόλις συνδεθεί η πληρωμή, οι ίδιοι κωδικοί ανοίγουν ξανά το μενού." },
    { q: "Μπορώ να αλλάξω το πλάνο μου αργότερα;", a: "Ναι — προσθέστε ή αφαιρέστε δυνατότητες οποιαδήποτε στιγμή από το πάνελ διαχείρισης. Η διαφορά υπολογίζεται αναλογικά με τις υπόλοιπες ημέρες της πληρωμένης περιόδου. Αν αφαιρέσετε μια δυνατότητα, απενεργοποιείται αλλά όλα τα δεδομένα της διατηρούνται." },
    { q: "Πόσα εστιατόρια μπορώ να διαχειρίζομαι;", a: "Όσα χρειάζεστε — επιλέξτε τον αριθμό των εστιατορίων καθώς φτιάχνετε το πλάνο σας, όλα διαχειριζόμενα από ένα ενιαίο πάνελ. Οι εκπτώσεις όγκου εφαρμόζονται αυτόματα, έως και 50% έκπτωση με 5+ εστιατόρια. Διαχειρίζεστε μεγαλύτερο όμιλο; Στείλτε μας μήνυμα στο WhatsApp για ένα προσαρμοσμένο πλάνο." },
    { q: "Ποια είναι η ετήσια έκπτωση;", a: "Περίπου 30% σε σχέση με τη μηνιαία χρέωση. Το ακριβές ποσό εμφανίζεται καθώς φτιάχνετε το πλάνο σας." },
    { q: "Μπορώ να ακυρώσω τη συνδρομή οποτεδήποτε;", a: "Ναι, η ακύρωση γίνεται με ένα κλικ στο πάνελ διαχείρισης. Μετά την ακύρωση ο λογαριασμός λειτουργεί έως το τέλος της πληρωμένης περιόδου, στη συνέχεια παγώνει. Τα δεδομένα διατηρούνται και μπορείτε να επιστρέψετε όποτε θέλετε." },
    { q: "Ποιες μεθόδους πληρωμής δέχεστε;", a: "Visa, Mastercard και American Express μέσω Stripe. Υποστηρίζονται επίσης Apple Pay και Google Pay. Στην Ευρώπη — SEPA Direct Debit στο ετήσιο πλάνο." },
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
    />
  );
}
