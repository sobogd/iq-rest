import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /el, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /el page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR μενού για εστιατόρια",
    sub: "Πάνω από 500 εστιατόρια σε 30+ χώρες αντικαθιστούν το έντυπο μενού με QR μενού, πουλούν περισσότερο στους τουρίστες και μηδενίζουν τις προμήθειες delivery. Έτοιμο σε 5 λεπτά — 14 ημέρες δωρεάν.",
    dynamicHeadlines: [],
    headlinePrefix: "QR μενού για ",
    accentWord: "εστιατόρια",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Με τη γυναίκα μου ανοίξαμε καφέ και ψάχναμε για εβδομάδες ένα QR μενού για εστιατόρια με παραγγελίες στο τραπέζι και κρατήσεις χωρίς άσχημο σχεδιασμό —",
    quoteAccent: "οπότε φτιάξαμε εμείς το QR μενού που θέλαμε.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "Τι είναι ένα QR μενού για εστιατόρια;",
        a: "Ένα QR μενού για εστιατόρια είναι ο εκτυπώσιμος κωδικός QR στο τραπέζι που οι πελάτες σκανάρουν με την κάμερα του κινητού για να ανοίξουν τον κατάλογο στον περιηγητή — χωρίς εφαρμογή. Με την IQ Rest το QR μενού περιλαμβάνει παραγγελίες στο τραπέζι, κρατήσεις 24/7 και AI μετάφραση σε 35 γλώσσες, όλα ενημερώνονται από το κινητό.",
      },
      {
        q: "Πόσο κοστίζει ένα QR μενού για εστιατόρια;",
        a: "6,90 €/μήνα, όλα μέσα. Απεριόριστοι κωδικοί QR σε κάθε τραπέζι, πλήρης editor, απευθείας παραγγελίες χωρίς προμήθεια, AI μετάφραση σε 35 γλώσσες, κρατήσεις και analytics. 14 ημέρες δωρεάν, χωρίς κάρτα.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR μενού για εστιατόρια.",
    headingAccent: "Έτοιμο σε 5 λεπτά.",
    sub: "14 ημέρες δωρεάν. Χωρίς κάρτα. Πάνω από 500 εστιατόρια χρησιμοποιούν QR μενού στην IQ Rest.",
  },

  meta: {
    title: "QR Μενού για Εστιατόρια — Έτοιμο σε 5 Λεπτά | IQ Rest",
    description: "QR μενού για εστιατόρια: κωδικός QR σε κάθε τραπέζι, απευθείας παραγγελίες χωρίς προμήθεια, AI μετάφραση σε 35 γλώσσες. Έτοιμο σε 5 λεπτά, 14 ημέρες δωρεάν.",
    canonical: "https://iq-rest.com/el/lp/qr-menu-gia-estiatoria",
    ogLocale: "el_GR",
    ogTitle: "QR Μενού για Εστιατόρια — Έτοιμο σε 5 Λεπτά",
    ogDescription: "QR μενού με απευθείας παραγγελίες, 35 γλώσσες AI και κρατήσεις. Έτοιμο σε 5 λεπτά — 14 ημέρες δωρεάν.",
  },
};
