import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "no",
  htmlDir: "ltr",

  meta: {
    title: "Digital Meny, Kjøkkenskjerm & Reservasjoner — IQ Rest",
    description:
      "Driv restauranten fra én app: flerspråklig digital meny, kjøkkenskjerm og reservasjoner døgnet rundt. Klar på 5 minutter. 14 dager gratis, uten kort.",
    canonical: "https://iq-rest.com/no",
    ogLocale: "no_NO",
    ogTitle: "Digital Meny, Kjøkkenskjerm & Reservasjoner",
    ogDescription:
      "Driv restauranten fra én app: flerspråklig digital meny, kjøkkenskjerm og reservasjoner døgnet rundt. Klar på 5 minutter. 14 dager gratis, uten kort.",
  },

  ctaText: "Prøv gratis",
  homeCtaText: "Prøv gratis",
  demoText: "Se demo",
  microcopy: "14 dager gratis · Ingen kort · Avslutt når som helst",

  header: {
    navFeatures: "Funksjoner",
    navHow: "Slik fungerer det",
    navPricing: "Priser",
    navFaq: "FAQ",
    signIn: "Logg inn",
    viewFeatures: "Se funksjoner",
    cta: "Prøv gratis",
  },

  hero: {
    verticals: ["Restauranter", "Kaféer", "Barer", "Hoteller", "Pizzeriaer"],
    headline: "Digital meny for restaurant. Live på 5 minutter.",
    sub: "Digital meny for din restaurant på 5 minutter. Alt inkludert: redaktør uten kode, AI-gjenkjenning av trykt meny, QR-koder for bord og direkte bestillinger uten provisjon.",
    dynamicHeadlines: ["0 % provisjon.", "35 AI-språk.", "Online bestillinger.", "Reservasjoner 24/7.", "Premium design."],
    painBullets: [
      "0 % provisjon: hver bestilling går direkte til din restaurant.",
      "AI-oversettelse til 35 språk — turister forstår menyen og bestiller mer.",
      "Reservasjon 24/7: gjester reserverer bord selv, uten samtaler i rushtidene.",
      "Fleksible priser: menyoppdateringer er online i løpet av sekunder.",
    ],
    rating: "Mer enn 500 restauranter i mer enn 30 land",
  },

  features: {
    heading: "Alt du trenger.",
    headingAccent: "Ingenting overflødig.",
    sub: "Bygget for restauranter. Brukes hver dag ved bordet, på kjøkkenet og i salongen.",
    items: [
      { Icon: Monitor, title: "Digital meny", desc: "Meny i nettleseren med bilder, priser, allergener og beskrivelser. Oppdateres i sanntid fra telefonen. Gjester ser menyen på sitt eget språk; restauranten sparer på trykking.", tag: "Digital meny", href: "/no/digital-meny-restaurant" },
      { Icon: Receipt, title: "Bestillingsmottak: gjest og kelner", desc: "En QR-kode ved bordet for gjesten, eller kelneren tar bestillingen fra telefonen — begge går direkte til kjøkkenet eller WhatsApp. Uten provisjon, med bordnummer på hver kvittering.", tag: "Bestillinger", href: "/no/bestillingssystem-restaurant" },
      { Icon: CalendarCheck, title: "Bordreservasjon 24/7", desc: "Gjester reserverer bord selv via nettstedet eller QR-menyen mens du er opptatt i salongen. Kalender per bord, automatiske bekreftelser og påminnelser. Ikke en eneste tapt gjest.", tag: "Reservasjon", href: "/no/bordreservasjon" },
      { Icon: ChefHat, title: "Kjøkkenskjerm (KDS)", desc: "Papirkvitteringer er ikke lenger nødvendige. Bestillinger fra salongen går direkte til kokkens skjerm — kolonner „tilberedes / klar / servert“, allergener og notater fremhevet med farge. På nettbrett eller telefon.", tag: "KDS", href: "/no/kjokken-skjerm" },
    ],
  },

  founder: {
    eyebrow: "Bygget av restauratører",
    quoteStart:
      "Min kone og jeg drev vår egen kafé og vet av egen erfaring hvordan en restaurantdag faktisk forløper — bestillingsmottak, reservasjoner, salong- og kjøkkenflyt. Vi ville ha ett enkelt verktøy: moderne, lett å sette i gang og klart ved første øyekast —",
    quoteAccent: "så vi begynte å bygge plattformen vi nå utvikler for andre restauratører.",
    sign: "Bogdan Sokolov · grunnlegger, tidligere kaféeier",
    photoAlt: "Bogdan Sokolov, grunnlegger av IQ Rest",
  },

  how: {
    heading: "Live på 5 minutter",
    sub: "Fire korte trinn. Ingen installasjoner, ingen teknisk oppsett.",
    steps: [
      { n: "1", t: "Type og navn", d: "Velg type sted og skriv inn navnet." },
      { n: "2", t: "Lagre", d: "Skriv inn e-posten din eller logg inn med Google." },
      { n: "3", t: "Meny", d: "Legg til varer manuelt eller last opp en trykt meny for AI-skanning." },
      { n: "4", t: "Ferdig", d: "Del en lenke eller QR-kode og begynn å ta imot bestillinger." },
    ],
  },

  pricing: {
    badge: "Ingen provisjon · Ingen kontrakter",
    heading: "Ett abonnement.",
    headingAccent: "Alt inkludert.",
    sub: "QR-meny, bestillingsmottak, AI-oversettelse, restaurantens nettsted og reservasjon. Ett gjennomsiktig månedlig gebyr.",
    monthlyLabel: "Månedlig",
    yearlyLabel: "Årlig",
    saveBadge: "Spar 25 %",
    perMonth: "per måned",
    billedAnnually: "Årlig fakturering: {total}",
    youSave: "Du sparer {amount}",
    trust: { secure: "Sikker betaling med Stripe", noCommitment: "Ingen binding", quick: "Aktiv på minutter", restaurants: "500+ restauranter" },
  },

  faq: {
    eyebrow: "Har du spørsmål?",
    heading: "Ofte stilte",
    headingAccent: "spørsmål.",
    sub: "Hva restauratører spør om før registrering. Finner du ikke spørsmålet ditt? Send oss en melding på WhatsApp — ekte mennesker svarer, ikke en bot.",
    whatsappCta: "Spør på WhatsApp",
    whatsappPrefill: "Hei, jeg har et spørsmål om IQ Rest",
    items: [
      { q: "Hva inkluderer prøveperioden og hva skjer etterpå?", a: "Full tilgang til alle funksjoner i 14 dager, ingen kort kreves. Etter 14 dager settes kontoen på pause hvis ingen betalingsmetode er lagt til — vi belaster aldri automatisk. Du kan legge til betaling senere og fortsette der du slapp. Avslutt når som helst med ett klikk." },
      { q: "Tar dere provisjon på bestillinger?", a: "Nei. Hver bestilling fra QR-menyen går direkte til restauranten — ingen prosent fra vår side, ingen aggregatorgebyrer. Ett fast månedlig gebyr og ingenting annet." },
      { q: "Trenger gjestene en app, trenger vi tekniske ferdigheter?", a: "Gjestene trenger ingen app — de retter telefonkameraet mot QR-koden og menyen åpner i nettleseren. Restauranter trenger heller ingen tekniske ferdigheter: administrasjonspanelet fungerer i alle moderne nettlesere på telefon, nettbrett eller bærbar PC. Hver handling er med klikk og dra-og-slipp, uten kode." },
      { q: "Hvor raskt endres priser og dukker nye retter opp?", a: "Umiddelbart. Endre en pris fra telefonen — gjestene ser det innen sekunder. En ny rett tar noen trykk: navn, pris, bilde. Ingen utskrift på nytt, ingen venting på en designer." },
      { q: "Hvor mange språk støttes?", a: "35 språk med innebygd AI-oversettelse. Ett trykk og hele menyen er oversatt; AI-en forstår kulinarisk kontekst — navn og beskrivelser høres naturlige ut på alle språk. Turister bestiller med større selvtillit når de virkelig forstår menyen." },
    ],
  },

  finalCta: {
    heading: "Live på 5 minutter.",
    headingAccent: "14 dager gratis.",
    sub: "Ingen kort, avslutt når som helst. Bli en av 500+ restauranter som allerede bruker IQ Rest.",
  },

  scan: {
    heading: "Har du en papirmeny eller PDF?",
    headingAccent: "AI digitaliserer den på 60 sekunder.",
    sub: "Last opp et bilde eller dokument — AI-en gjenkjenner kategorier, retter og priser automatisk.",
    cta: "Skann meny →",
  },

  pricingHero: {
    chips: ["Ingen provisjon", "Ingen kontrakter", "14 dager gratis"],
    heading: "Priser.",
    headingAccent: "Ingen skjulte avgifter.",
    sub: "Ett gjennomsiktig månedlig gebyr. Ingen prosent på bestillinger og ingen aggregatorprovisjon. Avslutt abonnementet når som helst.",
    popularBadge: "Populær",
    perMonthSuffix: "/mnd",
    whenAnnualTemplate: "årlig fakturering · {total} per år",
    orMonthlyTemplate: "eller {price}/mnd",
    savingsTemplate: "spar {amount} per år",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Meny, QR-bestillinger og AI-oversettelse. Live på 5 minutter.",
        features: [
          "QR-meny for hvert bord",
          "Digital meny med bilder og allergener",
          "AI-oversettelse til 35 språk",
          "Bestillinger fra menyen (valgfritt)",
          "AI-generering av rettbilder",
          "Administrer fra enhver telefon eller nettbrett",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Full restaurantkontroll: kjøkkenskjerm og reservasjoner.",
        features: [
          "Alt i Basic",
          "Kjøkkenskjerm (KDS)",
          "Online bordreservasjon 24/7",
          "Prioritert WhatsApp-støtte",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/no/digital-meny-restaurant", label: "Digital meny" },
      { href: "/no/bestillingssystem-restaurant", label: "Bestillinger" },
      { href: "/no/bordreservasjon", label: "Reservasjon" },
      { href: "/no/kjokken-skjerm", label: "Kjøkkenskjerm" },
    ],
    navLinks: [
      { href: "/no/priser", label: "Priser" },
      { href: "#faq", label: "FAQ" },
      { href: "/no/languages", label: "Bytt språk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle rettigheter forbeholdt.",
  },
};
