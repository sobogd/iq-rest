import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "no", htmlDir: "ltr",
  meta: {
    title: "QR-meny for Restauranter — Direkte Bestillinger, Null Provisjon | IQ Rest",
    description: "Slutt med papirmenyer og leveringsapp-provisjoner. QR-meny, direkte bestillinger, reservasjoner og flerspråklig nettsted. 14 dager gratis, uten kort.",
    canonical: "https://iq-rest.com/no", ogLocale: "no_NO",
    ogTitle: "QR-meny for Restauranter — Direkte Bestillinger, Null Provisjon",
    ogDescription: "QR-meny, direkte bestillinger, reservasjoner og AI-oversettelse. Klart på 2 minutter. 14 dager gratis — uten kort.",
  },
  ctaText: "Prøv gratis", ctaSite: "Lag nettside",
  demoText: "Se live-demo", microcopy: "14 dager gratis · Ingen kort · Avslutt når du vil",
  header: { navFeatures: "Funksjoner", navHow: "Slik virker det", navPricing: "Priser", navFaq: "FAQ", signIn: "Logg inn", cta: "Prøv gratis" },
  hero: {
    verticals: ["Restauranter", "Kafeer", "Barer", "Hoteller", "Pizzeriaer"],
    qr: { headline: "QR-meny på 5 minutter.", sub: "Direkte bestillinger, booking og 35 språk. Ingen provisjon eller koding." },
    web: { headline: "Restaurant-side på 5 min.", sub: "Direkte bestillinger, booking og 35 språk. Ingen provisjon eller koding." },
    dynamicHeadlines: ["0% provisjon.", "35 språk (AI).", "Online-bestilling.", "Booking 24/7.", "Premium design."],
    painBullets: ["0% provisjon: Alle bestillinger går direkte til deg.", "AI-oversettelse: 35 språk øker salget til turister.", "Booking 24/7: Full restaurant uten ekstra telefoner.", "Fleksible priser: Oppdater menyen på sekunder."],
    rating: "4,9 · over 500 restauranter i 30+ land",
  },
  features: {
    heading: "Alt du trenger.", headingAccent: "Ingenting du ikke trenger.",
    sub: "Bygget for restauranter. Brukt ved bordet.",
    items: [
      
      { Icon: ScanLine, title: "Bestilling ved bordet", desc: "Bestillinger havner rett i WhatsApp eller kontrollpanelet med bordnummer. Raskere service.", tag: "Direkte bestillinger" },
      { Icon: Languages, title: "AI-oversetter (35 språk)", desc: "Vår AI forstår gastronomi. Turister bestiller 20% mer når de forstår menyen.", tag: "AI-oversettelse" },
      { Icon: CalendarCheck, title: "Bordreservasjon", desc: "Systemet tar imot bookinger mens du er travel på kjøkkenet. Ingen tapte kunder.", tag: "Reservasjoner" },
      { Icon: Palette, title: "Moderne design", desc: "Videobakgrunner og fristende bilder. Menyen din ser eksklusiv ut og vekker appetitten.", tag: "Eget design" },
      { Icon: Smartphone, title: "Hurtigredigering", desc: "Styr utsolgt-liste og priser rett fra mobilen. Endringer er synlige umiddelbart.", tag: "Menyredigerer" },
      { Icon: ChefHat, title: "Snart: Kjøkkenskjerm", desc: "Glem papirlapper. Bestillinger fra salen går rett til kokkens skjerm.", tag: "Kommer snart" },
    
    ],
  },
  founder: {
    eyebrow: "Bygget av en restauratør",
    quoteStart: "Min kone og jeg åpnet en kafé og brukte uker på å lete etter et system som håndterer onlinebestillinger, reservasjoner og samtidig ser moderne ut. Alt vi prøvde var klumpete, stygt eller manglet halvparten av funksjonene —",
    quoteAccent: "så vi bygget det vi selv ville hatt.",
    sign: "Bogdan Sokolov · grunnlegger, eks-kafeeier",
    photoAlt: "Bogdan, grunnlegger av IQ Rest",
  },
  how: {
    heading: "Live på under 2 minutter",
    sub: "Fire korte steg. Ingen installasjon, ingen teknisk oppsett.",
    steps: [
      { n: "1", t: "Registrer deg", d: "E-post eller Google. Ingen kort. Klart på 10 sekunder." },
      { n: "2", t: "Restaurantens navn", d: "Skriv navnet. Vises øverst på menyen." },
      { n: "3", t: "Legg til første rett", d: "Kategori, navn, pris, bilde. Det var det." },
      { n: "4", t: "Velg cover og skriv ut QR", d: "Velg bakgrunn. Hent QR. Lim på bordene." },
    ],
  },
  pricing: {
    badge: "Null provisjon · Ingen kontrakter",
    heading: "Én plan.", headingAccent: "Alt inkludert.",
    sub: "QR-meny, bestillinger, AI-oversettelse, restaurantnettsted og reservasjoner. Én enkel pris.",
    monthlyLabel: "Månedlig", yearlyLabel: "Årlig", saveBadge: "Spar 25%", perMonth: "per måned",
    billedAnnually: "Fakturert årlig {total}", youSave: "Du sparer {amount}",
    trust: { secure: "Sikker betaling med Stripe", noCommitment: "Ingen binding", quick: "Aktiv på minutter", restaurants: "500+ restauranter" },
  },
  faq: {
    eyebrow: "Spørsmål?", heading: "Vanlige", headingAccent: "spørsmål.",
    sub: "Det restauratører spør om før påmelding. Mangler ditt? Skriv på WhatsApp — ekte folk svarer.",
    whatsappCta: "Spør på WhatsApp", whatsappPrefill: "Hei, jeg har et spørsmål om IQ Rest",
    items: [
      { q: "Hva inkluderer prøveperioden og hva skjer etterpå?", a: "14 dager full tilgang, ingen kort. Etter 14 dager pauses kontoen hvis du ikke legger til betalingsmetode — vi trekker aldri automatisk. Legg til betaling senere for å reaktivere. Avslutt med ett klikk." },
      { q: "Tar dere provisjon på bestillinger?", a: "Null. Hver bestilling fra QR-menyen din går rett til deg — ingen del til oss, ingen Foodora / Wolt-gebyrer. Én fast månedspris, det er det." },
      { q: "Trenger gjestene en app? Trenger jeg tekniske kunnskaper?", a: "Ingen apper for gjester — de skanner QR med kameraet, menyen åpnes i nettleseren. Ingen tekniske kunnskaper for deg — hele panelet virker i mobilen, trykk for å legge til, dra for å omsortere, det er hele kurven." },
      { q: "Hvor raskt endrer jeg priser og legger til retter?", a: "Med en gang. Endre pris på telefonen, gjestene ser det på sekunder. Ny rett? Trykk, skriv, bilde, ferdig — ingen utskrifter, ingen designer å vente på." },
      { q: "Hvor mange språk støttes?", a: "35 språk med innebygd AI-oversettelse. Ett trykk oversetter hele menyen, AI forstår kulinarisk kontekst — navn og beskrivelser høres naturlig ut på hvert språk. Turister bestiller mer når de virkelig forstår." },
    ],
  },
  finalCta: { heading: "Klart på 2 minutter.", headingAccent: "Gratis i 14 dager.", sub: "Ingen kort. Avslutt når du vil. Bli med 500+ restauranter allerede på IQ Rest." },
  scan: {
    heading: "Papirmeny eller PDF?",
    headingAccent: "AI digitaliserer den på 60 sekunder.",
    sub: "Last opp — AI finner kategorier, retter og priser.",
    cta: "Skann menyen →",
  },
  footer: {
    featureLinks: [
      { href: "/no/online-orders", label: "Onlinebestillinger" },
      { href: "/no/ai-translation", label: "AI-oversettelse" },
      { href: "/no/reservations", label: "Reservasjoner" },
      { href: "/no/mobile-management", label: "Mobilstyring" },
      { href: "/no/easy-menu", label: "Meny-editor" },
      { href: "/no/custom-design", label: "Video- og fotobakgrunner" },
      { href: "/no/color-scheme", label: "Merkefarger" },
      { href: "/no/multilingual", label: "Flerspråklig nettsted" },
      { href: "/no/ai-images", label: "AI-bildeoptimalisering" },
      { href: "/no/analytics", label: "Statistikk" },
      { href: "/no/instant-setup", label: "Øyeblikkelig oppsett" },
      { href: "/no/personal-support", label: "Personlig support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Priser" }, { href: "#faq", label: "Spørsmål" },
      { href: "/no/languages", label: "Bytt språk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle rettigheter forbeholdt.",
  },
};
