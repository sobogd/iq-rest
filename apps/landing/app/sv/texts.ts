import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sv",
  htmlDir: "ltr",

  meta: {
    title: "QR-meny för restauranger — Direkta beställningar, noll provision | IQ Rest",
    description:
      "Allt-i-ett-plattform för restauranger: digital meny, QR-beställningar, bordsbokning och köksskärm. Live på 5 minuter. 14 dagar gratis, inget kort krävs.",
    canonical: "https://iq-rest.com/sv",
    ogLocale: "sv_SE",
    ogTitle: "QR-meny för restauranger — Direkta beställningar, noll provision",
    ogDescription:
      "Digital meny, QR-beställningar, bordsbokning och AI-översättning. Live på 5 minuter. 14 dagar gratis.",
  },

  ctaText: "Börja gratis",
  homeCtaText: "Bygg din plattform",
  demoText: "Se demo",
  microcopy: "14 dagar gratis · Inget kort · Avsluta när som helst",

  header: {
    navFeatures: "Funktioner",
    navHow: "Så fungerar det",
    navPricing: "Priser",
    navFaq: "FAQ",
    signIn: "Logga in",
    cta: "Börja gratis",
  },

  hero: {
    verticals: ["Restauranger", "Caféer", "Barer", "Hotell", "Pizzerior"],
    headline: "Digital meny för restaurang. Live på 5 minuter.",
    sub: "Digital meny för din restaurang på 5 minuter. Allt ingår: editor utan kod, AI-igenkänning av tryckt meny, QR-koder för borden och direkta beställningar utan provision.",
    dynamicHeadlines: ["0 % provision.", "35 AI-språk.", "Onlinebeställningar.", "Bokningar 24/7.", "Premiumdesign."],
    painBullets: [
      "0 % provision: varje beställning går direkt till din restaurang.",
      "AI-översättning till 35 språk — turister förstår menyn och beställer mer.",
      "Bokning 24/7: gäster bokar bord själva, utan samtal under rusningstid.",
      "Flexibla priser: menyuppdateringar är online inom sekunder.",
    ],
    rating: "Över 500 restauranger i mer än 30 länder",
  },

  features: {
    heading: "Allt du behöver.",
    headingAccent: "Inget överflödigt.",
    sub: "Byggd för restauranger. Används varje dag vid bordet, i köket och i salen.",
    items: [
      { Icon: Monitor, title: "Digital meny", desc: "Meny i webbläsaren med bilder, priser, allergener och beskrivningar. Uppdateras i realtid från telefonen. Gäster ser menyn på sitt eget språk; restaurangen sparar på tryck.", tag: "Digital meny", href: "/sv/digital-meny-restaurang" },
      { Icon: Receipt, title: "Mottagande av beställningar: gäst och servitör", desc: "En QR-kod vid bordet för gästen, eller servitören tar beställningen från telefonen — båda går direkt till köket eller WhatsApp. Utan provision, med bordsnummer på varje kvitto.", tag: "Beställningar", href: "/sv/bestallningssystem-restaurang" },
      { Icon: CalendarCheck, title: "Bordsbokning 24/7", desc: "Gäster bokar bord själva via webbplatsen eller QR-menyn medan du är upptagen i salen. Kalender per bord, automatiska bekräftelser och påminnelser. Inte en enda missad gäst.", tag: "Bokning", href: "/sv/bordsbokning" },
      { Icon: ChefHat, title: "Köksskärm (KDS)", desc: "Papperskvitton behövs inte längre. Beställningar från salen går direkt till kockens skärm — kolumner „tillagas / klar / serverad“, allergener och anteckningar markerade med färg. På surfplatta eller telefon.", tag: "KDS", href: "/sv/kok-skarm" },
    ],
  },

  founder: {
    eyebrow: "Byggd av restauratörer",
    quoteStart:
      "Min fru och jag drev vårt eget café och vet av egen erfarenhet hur en restaurangdag faktiskt ser ut — beställningsmottagning, bokningar, sal- och köksflöde. Vi ville ha ett enda verktyg: modernt, lätt att starta och tydligt vid första anblicken —",
    quoteAccent: "så vi började bygga plattformen vi nu utvecklar för andra restauratörer.",
    sign: "Bogdan Sokolov · grundare, tidigare caféägare",
    photoAlt: "Bogdan Sokolov, grundare av IQ Rest",
  },

  how: {
    heading: "Live på 5 minuter",
    sub: "Fyra korta steg. Inga installationer, ingen teknisk konfiguration.",
    steps: [
      { n: "1", t: "Typ och namn", d: "Välj typ av lokal och ange namnet." },
      { n: "2", t: "Spara", d: "Ange din e-post eller logga in med Google." },
      { n: "3", t: "Meny", d: "Lägg till objekt manuellt eller ladda upp en tryckt meny för AI-skanning." },
      { n: "4", t: "Klart", d: "Dela en länk eller QR-kod och börja ta emot beställningar." },
    ],
  },

  pricing: {
    badge: "Ingen provision · Inga kontrakt",
    heading: "En plan.",
    headingAccent: "Allt ingår.",
    sub: "QR-meny, beställningsmottagning, AI-översättning, restaurangens webbplats och bokning. En transparent månadsavgift.",
    monthlyLabel: "Månadsvis",
    yearlyLabel: "Årligen",
    saveBadge: "Spara 25 %",
    perMonth: "per månad",
    billedAnnually: "Årlig fakturering: {total}",
    youSave: "Du sparar {amount}",
    trust: { secure: "Säker betalning via Stripe", noCommitment: "Ingen bindningstid", quick: "Aktiv på några minuter", restaurants: "500+ restauranger" },
  },

  faq: {
    eyebrow: "Har du frågor?",
    heading: "Vanliga",
    headingAccent: "frågor.",
    sub: "Vad restauratörer frågar innan registrering. Hittar du inte din fråga? Skriv till oss på WhatsApp — riktiga människor svarar, inte en bot.",
    whatsappCta: "Fråga på WhatsApp",
    whatsappPrefill: "Hej, jag har en fråga om IQ Rest",
    items: [
      { q: "Vad ingår i provperioden och vad händer efter?", a: "Full tillgång till alla funktioner i 14 dagar, inget kort krävs. Efter 14 dagar pausas kontot om ingen betalningsmetod har lagts till — vi tar aldrig betalt automatiskt. Du kan lägga till betalning senare och fortsätta där du slutade. Avsluta när som helst med ett klick." },
      { q: "Tar ni provision på beställningar?", a: "Nej. Varje beställning från QR-menyn går direkt till restaurangen — ingen procent från vår sida, inga aggregatoravgifter. En fast månadsavgift och inget annat." },
      { q: "Behöver gästerna en app, behöver vi tekniska kunskaper?", a: "Gästerna behöver ingen app — de riktar telefonkameran mot QR-koden och menyn öppnas i webbläsaren. Restauranger behöver heller inga tekniska kunskaper: administrationspanelen fungerar i alla moderna webbläsare på telefon, surfplatta eller laptop. Varje åtgärd görs med klick och dra-och-släpp, utan kod." },
      { q: "Hur snabbt ändras priser och visas nya rätter?", a: "Omedelbart. Ändra ett pris från telefonen — gästerna ser det inom sekunder. En ny rätt tar några tryck: namn, pris, foto. Inga omtryck, ingen väntan på en designer." },
      { q: "Hur många språk stöds?", a: "35 språk med inbyggd AI-översättning. Ett tryck och hela menyn är översatt; AI:n förstår den kulinariska kontexten — namn och beskrivningar låter naturliga på alla språk. Turister beställer med större trygghet när de verkligen förstår menyn." },
    ],
  },

  finalCta: {
    heading: "Live på 5 minuter.",
    headingAccent: "14 dagar gratis.",
    sub: "Inget kort, avsluta när som helst. Anslut dig till 500+ restauranger som redan använder IQ Rest.",
  },

  scan: {
    heading: "Har du en pappersmeny eller PDF?",
    headingAccent: "AI digitaliserar den på 60 sekunder.",
    sub: "Ladda upp ett foto eller dokument — AI:n känner igen kategorier, rätter och priser automatiskt.",
    cta: "Skanna meny →",
  },

  pricingHero: {
    chips: ["Ingen provision", "Inga kontrakt", "14 dagar gratis"],
    heading: "Priser.",
    headingAccent: "Inga dolda avgifter.",
    sub: "En transparent månadsavgift. Ingen procent på beställningar och inga aggregatorprovisioner. Avsluta prenumerationen när som helst.",
    popularBadge: "Populär",
    perMonthSuffix: "/mån",
    whenAnnualTemplate: "årlig fakturering · {total} € per år",
    orMonthlyTemplate: "eller {price} €/mån",
    savingsTemplate: "spara {amount} € per år",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Meny, QR-beställningar och AI-översättning. Live på 5 minuter.",
        features: [
          "QR-meny för varje bord",
          "Digital meny med bilder och allergener",
          "AI-översättning till 35 språk",
          "Beställningar från menyn (valfritt)",
          "AI-generering av rättfoton",
          "Hantering från valfri telefon eller surfplatta",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Full restaurangkontroll: köksskärm och bokningar.",
        features: [
          "Allt i Basic",
          "Köksskärm (KDS)",
          "Onlinebordsbokning 24/7",
          "Prioriterad WhatsApp-support",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/sv/digital-meny-restaurang", label: "Digital meny" },
      { href: "/sv/bestallningssystem-restaurang", label: "Beställningar" },
      { href: "/sv/bordsbokning", label: "Bokning" },
      { href: "/sv/kok-skarm", label: "Köksskärm" },
    ],
    navLinks: [
      { href: "/sv/priser", label: "Priser" },
      { href: "#faq", label: "FAQ" },
      { href: "/sv/languages", label: "Byt språk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alla rättigheter förbehållna.",
  },
};
