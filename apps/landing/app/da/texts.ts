import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "da",
  htmlDir: "ltr",

  meta: {
    title: "QR-menu til restauranter — Direkte bestillinger, ingen kommission | IQ Rest",
    description:
      "Alt-i-én-platform til restauranter: digitalt menukort, QR-bestillinger, bordreservation og køkkenskærm. Live på 5 minutter. 14 dages gratis prøveperiode, intet kort krævet.",
    canonical: "https://iq-rest.com/da",
    ogLocale: "da_DK",
    ogTitle: "QR-menu til restauranter — Direkte bestillinger, ingen kommission",
    ogDescription:
      "Digitalt menukort, QR-bestillinger, bordreservation og AI-oversættelse. Live på 5 minutter. 14 dage gratis.",
  },

  ctaText: "Prøv gratis",
  demoText: "Se demo",
  microcopy: "14 dage gratis · Intet kort · Opsig når som helst",

  header: {
    navFeatures: "Funktioner",
    navHow: "Sådan virker det",
    navPricing: "Priser",
    navFaq: "FAQ",
    signIn: "Log ind",
    cta: "Kom i gang",
  },

  hero: {
    verticals: ["Restauranter", "Caféer", "Barer", "Hoteller", "Pizzeriaer"],
    headline: "Digitalt menukort til restauranter. Live på 5 minutter.",
    sub: "Digitalt menukort til din restaurant på 5 minutter. Alt inkluderet: editor uden kode, AI-genkendelse af menukortet, QR-koder til bordene og direkte bestillinger uden kommission.",
    dynamicHeadlines: ["0 % kommission.", "35 AI-sprog.", "Online bestillinger.", "Reservationer 24/7.", "Premium design."],
    painBullets: [
      "0 % kommission: hver bestilling går direkte til din restaurant.",
      "AI-oversættelse på 35 sprog — turister forstår menuen og bestiller mere.",
      "Reservation 24/7: gæsterne reserverer borde selv, uden opkald i spidsbelastning.",
      "Fleksible priser: opdateringer i menuen er online på sekunder.",
    ],
    rating: "Over 500 restauranter i mere end 30 lande",
  },

  features: {
    heading: "Alt hvad du har brug for.",
    headingAccent: "Intet ekstra.",
    sub: "Bygget til restauranter. Bruges hver dag ved bordet, i køkkenet og i serveringen.",
    items: [
      { Icon: Monitor, title: "Digitalt menukort", desc: "Menukort i browseren med billeder, priser, allergener og beskrivelser. Opdaterer i realtid fra telefonen. Gæsterne ser menuen på deres eget sprog; restauranten sparer trykudgifter.", tag: "Digitalt menukort", href: "/da/digitalt-menu-restaurant" },
      { Icon: Receipt, title: "Bestillingsmodtagelse: gæst og tjener", desc: "En QR-kode ved bordet til gæsten, eller tjeneren tager bestillingen fra telefonen — begge går direkte til køkkenet eller WhatsApp. Ingen kommission, med bordnummer på hver bon.", tag: "Bestillinger", href: "/da/bestillingssystem-restaurant" },
      { Icon: CalendarCheck, title: "Bordreservation 24/7", desc: "Gæsterne reserverer borde selv via hjemmesiden eller QR-menuen, mens du er optaget i serveringen. Kalender pr. bord, automatiske bekræftelser og påmindelser. Ikke en eneste mistet gæst.", tag: "Reservation", href: "/da/bordreservation" },
      { Icon: ChefHat, title: "Køkkenskærm (KDS)", desc: "Papirbon er ikke længere nødvendig. Bestillinger fra serveringen går direkte til kokkens skærm — kolonner „tilberedes / klar / serveret“, allergener og noter fremhævet med farver. På tablet eller telefon.", tag: "KDS", href: "/da/kokken-skaerm" },
    ],
  },

  founder: {
    eyebrow: "Bygget af restauratører",
    quoteStart:
      "Min kone og jeg drev vores egen café, og vi ved af egen erfaring, hvordan en restaurantdag faktisk forløber — bestillingsmodtagelse, reservationer, servering og køkken. Vi ville have ét enkelt værktøj: moderne, nemt at starte op og klart ved første blik —",
    quoteAccent: "så vi begyndte at bygge den platform, vi nu udvikler for andre restauratører.",
    sign: "Bogdan Sokolov · grundlægger, tidligere caféejer",
    photoAlt: "Bogdan Sokolov, grundlægger af IQ Rest",
  },

  how: {
    heading: "Live på 5 minutter",
    sub: "Fire korte trin. Ingen installation, ingen teknisk opsætning.",
    steps: [
      { n: "1", t: "Type og navn", d: "Vælg restauranttype og indtast navnet." },
      { n: "2", t: "Gem", d: "Indtast din e-mail eller log ind med Google." },
      { n: "3", t: "Menukort", d: "Tilføj retter manuelt eller upload et trykt menukort til AI-scanning." },
      { n: "4", t: "Færdig", d: "Del et link eller en QR-kode og begynd at modtage bestillinger." },
    ],
  },

  pricing: {
    badge: "Ingen kommission · Ingen kontrakter",
    heading: "Ét abonnement.",
    headingAccent: "Alt inkluderet.",
    sub: "QR-menu, bestillingsmodtagelse, AI-oversættelse, restaurantens hjemmeside og reservation. Ét gennemskueligt månedligt gebyr.",
    monthlyLabel: "Månedligt",
    yearlyLabel: "Årligt",
    saveBadge: "Spar 25 %",
    perMonth: "pr. måned",
    billedAnnually: "Årlig betaling: {total}",
    youSave: "Du sparer {amount}",
    trust: { secure: "Sikker betaling med Stripe", noCommitment: "Ingen binding", quick: "Aktiv på få minutter", restaurants: "500+ restauranter" },
  },

  faq: {
    eyebrow: "Har du spørgsmål?",
    heading: "Ofte stillede",
    headingAccent: "spørgsmål.",
    sub: "Hvad restauratører spørger om inden tilmelding. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp — rigtige mennesker svarer, ikke en bot.",
    whatsappCta: "Spørg på WhatsApp",
    whatsappPrefill: "Hej, jeg har et spørgsmål om IQ Rest",
    items: [
      { q: "Hvad inkluderer prøveperioden, og hvad sker der efter?", a: "Fuld adgang til alle funktioner i 14 dage, intet kort krævet. Efter 14 dage sættes kontoen på pause, hvis der ikke er tilføjet en betalingsmetode — vi opkræver aldrig automatisk. Du kan tilføje betaling senere og fortsætte, hvor du slap. Opsig når som helst med ét klik." },
      { q: "Tager I kommission af bestillingerne?", a: "Nej. Hver bestilling fra QR-menuen går direkte til restauranten — ingen procentdel fra vores side, ingen aggregator-gebyrer. Ét fast månedligt gebyr og intet andet." },
      { q: "Skal gæsterne bruge en app, og skal vi have tekniske kundskaber?", a: "Gæsterne har ikke brug for en app — de retter telefonens kamera mod QR-koden, og menuen åbner i browseren. Restauranter behøver heller ikke tekniske kundskaber: administrationspanelet kører i enhver moderne browser på telefon, tablet eller computer. Alt foregår med klik og træk-og-slip, uden kode." },
      { q: "Hvor hurtigt ændres priser og nye retter dukker op?", a: "Med det samme. Ændr en pris fra telefonen — gæsterne ser den inden for sekunder. En ny ret kræver få tryk: navn, pris, billede. Ingen genoptryk, ingen ventetid på en designer." },
      { q: "Hvor mange sprog understøttes?", a: "35 sprog med indbygget AI-oversættelse. Ét tryk og hele menukortet er oversat; AI'en forstår den kulinariske kontekst — navne og beskrivelser lyder naturligt på alle sprog. Turister bestiller med større selvtillid, når de virkelig forstår menukortet." },
    ],
  },

  finalCta: {
    heading: "Live på 5 minutter.",
    headingAccent: "14 dage gratis.",
    sub: "Intet kort, opsig når som helst. Bliv en del af 500+ restauranter, der allerede bruger IQ Rest.",
  },

  scan: {
    heading: "Har du et papirmenukort eller en PDF?",
    headingAccent: "AI digitaliserer det på 60 sekunder.",
    sub: "Upload et billede eller dokument — AI'en genkender kategorier, retter og priser automatisk.",
    cta: "Scan menukortet →",
  },

  pricingHero: {
    chips: ["Ingen kommission", "Ingen kontrakter", "14 dage gratis"],
    heading: "Priser.",
    headingAccent: "Ingen skjulte gebyrer.",
    sub: "Ét gennemskueligt månedligt gebyr. Ingen procentdel af bestillinger og ingen aggregator-kommission. Opsig abonnementet når som helst.",
    popularBadge: "Populær",
    perMonthSuffix: "/md.",
    whenAnnualTemplate: "årlig betaling · {total} € pr. år",
    orMonthlyTemplate: "eller {price} €/md.",
    savingsTemplate: "spar {amount} € pr. år",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, QR-bestillinger og AI-oversættelse. Live på 5 minutter.",
        features: [
          "QR-menu til hvert bord",
          "Digitalt menukort med billeder og allergener",
          "AI-oversættelse på 35 sprog",
          "Bestillinger fra menuen (valgfrit)",
          "AI-generering af rettens billeder",
          "Administrer fra enhver telefon eller tablet",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Fuld kontrol over restauranten: køkkenskærm og reservationer.",
        features: [
          "Alt i Basic",
          "Køkkenskærm (KDS)",
          "Online bordreservation 24/7",
          "Prioriteret WhatsApp-support",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/da/digitalt-menu-restaurant", label: "Digitalt menukort" },
      { href: "/da/bestillingssystem-restaurant", label: "Bestillinger" },
      { href: "/da/bordreservation", label: "Reservation" },
      { href: "/da/kokken-skaerm", label: "Køkkenskærm" },
    ],
    navLinks: [
      { href: "/da/priser", label: "Priser" },
      { href: "#faq", label: "FAQ" },
      { href: "/da/languages", label: "Skift sprog" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle rettigheder forbeholdes.",
  },
};
