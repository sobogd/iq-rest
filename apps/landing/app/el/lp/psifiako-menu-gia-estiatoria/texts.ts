import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /el, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /el page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Από 6,90 €/μήνα · 14 ημέρες δωρεάν · Ακύρωση όποτε θέλεις",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Ψηφιακό μενού για εστιατόρια",
    sub: "500+ εστιατόρια σε 30+ χώρες εξυπηρετούν περισσότερα τραπέζια, πουλούν περισσότερα σε τουρίστες και μηδενίζουν τις προμήθειες παράδοσης. Live σε 5 λεπτά — 14 ημέρες δωρεάν.",
    verticals: ["Online παραγγελίες", "Κρατήσεις", "Μετάφραση AI", "Σαρωτής μενού", "Αλλεργιογόνα", "Premium σχεδιασμός", "Αναλύσεις"],
    dynamicHeadlines: [],
    headlinePrefix: "Ψηφιακό μενού για ",
    accentWord: "εστιατόρια",
    accentWordRotation: ["εστιατόρια", "καφέ", "μπαρ", "πιτσαρίες", "μπιστρό", "παμπ"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Η σύζυγος και εγώ ανοίξαμε ένα καφέ και ψάχναμε εβδομάδες ένα ψηφιακό μενού για εστιατόρια που να χειρίζεται και παραγγελίες στο τραπέζι και κρατήσεις, χωρίς να είναι άχαρο ή άσχημο —",
    quoteAccent: "οπότε φτιάξαμε το ψηφιακό μενού που εμείς θέλαμε.",
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
        q: "Τι είναι ένα ψηφιακό μενού για εστιατόρια;",
        a: "Ένα ψηφιακό μενού για εστιατόρια είναι η online έκδοση του χάρτινου: ο πελάτης σκανάρει QR στο τραπέζι με το κινητό και βλέπει αμέσως πιάτα, φωτογραφίες, αλλεργιογόνα και τιμές στον browser — χωρίς εφαρμογή. Με το IQ Rest το ψηφιακό μενού περιλαμβάνει επίσης άμεσες παραγγελίες στο τραπέζι, κρατήσεις 24/7 και μετάφραση AI σε 35 γλώσσες — όλα ενημερώνονται σε πραγματικό χρόνο από το κινητό.",
      },
      {
        q: "Πόσο κοστίζει ένα ψηφιακό μενού για εστιατόρια;",
        a: "6,90 €/μήνα, όλα συμπεριλαμβάνονται (έκπτωση στο ετήσιο πλάνο). Πλήρης editor, απεριόριστα QR, άμεσες παραγγελίες χωρίς προμήθεια, μετάφραση AI σε 35 γλώσσες, κρατήσεις και αναλύσεις. 14 ημέρες δωρεάν δοκιμή, χωρίς κάρτα.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Ψηφιακό μενού για εστιατόρια.",
    headingAccent: "Έτοιμο σε 5 λεπτά.",
    sub: "14 ημέρες δωρεάν. Χωρίς κάρτα. Έλα μαζί με 500+ εστιατόρια που τρέχουν το ψηφιακό τους μενού στο IQ Rest.",
  },

  meta: {
    title: "Ψηφιακό Μενού για Εστιατόρια — Σε 5 Λεπτά | IQ Rest",
    description: "Ψηφιακό μενού για εστιατόρια: εκτυπώσιμος QR κωδικός, άμεσες παραγγελίες χωρίς προμήθεια, μετάφραση AI σε 35 γλώσσες. 5 λεπτά, 14 ημέρες δωρεάν.",
    canonical: "https://iq-rest.com/el/lp/psifiako-menu-gia-estiatoria",
    ogLocale: "el_GR",
    ogTitle: "Ψηφιακό Μενού για Εστιατόρια — Σε 5 Λεπτά",
    ogDescription: "Ψηφιακό μενού για εστιατόρια με QR, άμεσες παραγγελίες και 35 AI γλώσσες. Live σε 5 λεπτά — 14 ημέρες δωρεάν.",
  },
};
