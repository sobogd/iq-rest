import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "da", htmlDir: "ltr",
  meta: {
    title: "QR-menu til Restauranter — Direkte Bestillinger, Nul Provision | IQ Rest",
    description: "Slut med papirmenuer og leverings-app-provisioner. QR-menu, direkte bestillinger, reservationer og flersproget hjemmeside. 14 dage gratis, uden kort.",
    canonical: "https://iq-rest.com/da", ogLocale: "da_DK",
    ogTitle: "QR-menu til Restauranter — Direkte Bestillinger, Nul Provision",
    ogDescription: "QR-menu, direkte bestillinger, reservationer og AI-oversættelse. Klar på 5 minutter. 14 dage gratis — uden kort.",
  },
  ctaText: "Prøv gratis",
  demoText: "Se live-demo", microcopy: "14 dage gratis · Intet kort · Stop når du vil",
  header: { navFeatures: "Funktioner", navHow: "Sådan virker det", navPricing: "Priser", navFaq: "FAQ", signIn: "Log ind", cta: "Start" },
  hero: {
    verticals: ["Restauranter", "Caféer", "Barer", "Hoteller", "Pizzeriaer"],
    headline: "Digital menu til restauranter. Klar på 5 minutter.",
    sub: "Digital menu til din restaurant på 5 minutter. Alt inkluderet: mobil editor uden kode, AI menu-scanning, QR-koder til borde og direkte ordrer uden kommissioner.",
    dynamicHeadlines: ["0% provision.", "35 sprog med AI.", "Online bestilling.", "Booking 24/7.", "Premium design."],
    painBullets: ["0% provision: Alle bestillinger går direkte til dig.", "AI-oversættelse: 35 sprog øger salget til turister.", "Booking 24/7: Fuld belægning uden ekstra opkald.", "Fleksible priser: Opdater menuen på få sekunder."],
    rating: "Over 500 restauranter i 30+ lande",
  },
  features: {
    heading: "Alt du har brug for.", headingAccent: "Intet du ikke har.",
    sub: "Lavet til restauranter. Brugt ved bordet.",
    items: [
      
      { Icon: QrCode, title: "Bestilling ved bordet", desc: "Bestillinger lander straks i WhatsApp eller kontrolpanelet med bordnummer. Hurtigere service.", tag: "Direkte bestillinger", href: "/da/online-bestillingssystem-restaurant" },
      { Icon: Languages, title: "AI-oversætter (35 sprog)", desc: "Vores AI forstår gastronomi. Turister bestiller 20% mere, når de forstår menuen.", tag: "AI-oversættelse" },
      { Icon: CalendarCheck, title: "Bordreservation", desc: "Systemet tager imod bookinger, mens du har travlt i køkkenet. Ingen mistede gæster.", tag: "Reservationer" },
      { Icon: Palette, title: "Moderne design", desc: "Videobaggrunde og lækre fotos. Din menu ser eksklusiv ud og vækker appetitten med det samme.", tag: "Eget design" },
      { Icon: Smartphone, title: "Hurtig editor", desc: "Styr stop-liste og priser direkte fra mobilen. Ændringer er synlige med det samme.", tag: "Menu-editor" },
      { Icon: ChefHat, title: "Køkkenskærm", desc: "Glem alt om papirboner. Bestillingerne går direkte til køkkenskærmen.", tag: "Køkkenskærm" },
    
    ],
  },
  founder: {
    eyebrow: "Bygget af en restauratør",
    quoteStart: "Min kone og jeg åbnede en café og brugte uger på at lede efter et system, der kunne håndtere onlinebestillinger, reservationer og samtidig se moderne ud. Alt vi prøvede var klodset, grimt eller manglede halvdelen af funktionerne —",
    quoteAccent: "så vi byggede det vi selv ville have.",
    sign: "Bogdan Sokolov · grundlægger, eks-caféejer",
    photoAlt: "Bogdan, grundlægger af IQ Rest",
  },
  how: {
    heading: "Live på under 5 minutter",
    sub: "Fire korte trin. Ingen installation, ingen teknisk opsætning.",
    steps: [
      { n: "1", t: "Type og navn", d: "Vælg type og skriv navnet." },
      { n: "2", t: "Gem", d: "E-mail eller log ind med Google." },
      { n: "3", t: "Menu", d: "Lav den selv eller scan en papirmenu." },
      { n: "4", t: "Klar", d: "Se, del og tag imod bestillinger." },
    ],
  },
  pricing: {
    badge: "Nul provision · Ingen kontrakter",
    heading: "Én plan.", headingAccent: "Alt inkluderet.",
    sub: "QR-menu, bestillinger, AI-oversættelse, restaurant-hjemmeside og reservationer. Én simpel pris.",
    monthlyLabel: "Månedligt", yearlyLabel: "Årligt", saveBadge: "Spar 25%", perMonth: "om måneden",
    billedAnnually: "Faktureres årligt {total}", youSave: "Du sparer {amount}",
    trust: { secure: "Sikker betaling med Stripe", noCommitment: "Ingen binding", quick: "Aktiv på minutter", restaurants: "500+ restauranter" },
  },
  faq: {
    eyebrow: "Spørgsmål?", heading: "Ofte stillede", headingAccent: "spørgsmål.",
    sub: "Det restauratører spørger om før tilmelding. Mangler dit? Skriv på WhatsApp — rigtige mennesker svarer.",
    whatsappCta: "Spørg på WhatsApp", whatsappPrefill: "Hej, jeg har et spørgsmål om IQ Rest",
    items: [
      { q: "Hvad inkluderer prøveperioden, og hvad sker bagefter?", a: "14 dage fuld adgang, intet kort. Efter 14 dage pauser din konto, hvis du ikke tilføjer en betalingsmetode — vi trækker aldrig automatisk. Tilføj betalingsoplysninger senere for at genaktivere. Stop med ét klik." },
      { q: "Tager I provision af bestillinger?", a: "Nul. Hver bestilling fra din QR-menu går direkte til dig — ingen andel til os, ingen Just Eat / Wolt-gebyrer. Én fast månedlig pris, det er det." },
      { q: "Skal gæsterne bruge en app? Skal jeg være teknisk?", a: "Ingen apps for gæsterne — de scanner QR med kameraet, menuen åbner i browseren. Ingen tekniske evner for dig — hele dashboardet virker i mobilen, tryk for at tilføje, træk for at omsortere, det er hele kurven." },
      { q: "Hvor hurtigt ændrer jeg priser og tilføjer retter?", a: "Med det samme. Ændr en pris på telefonen, gæsterne ser det på sekunder. Ny ret? Tryk, skriv, foto, færdig — ingen genoptryk, ingen designer at vente på." },
      { q: "Hvor mange sprog understøttes?", a: "35 sprog med indbygget AI-oversættelse. Ét tryk oversætter hele menuen, AI forstår kulinarisk kontekst — navne og beskrivelser lyder naturligt på hvert sprog. Turister bestiller mere, når de virkelig forstår." },
    ],
  },
  finalCta: { heading: "Klar på 5 minutter.", headingAccent: "Gratis i 14 dage.", sub: "Intet kort. Stop når du vil. Bliv en del af 500+ restauranter allerede på IQ Rest." },
  scan: {
    heading: "Papirmenu eller PDF?",
    headingAccent: "AI digitaliserer den på 60 sekunder.",
    sub: "Upload — AI finder kategorier, retter og priser.",
    cta: "Scan menuen →",
  },
  footer: {
    featureLinks: [
      { href: "/da/online-bestillingssystem-restaurant", label: "Online bestillingssystem" },
      { href: "/da/ai-translation", label: "AI-oversættelse" },
      { href: "/da/reservations", label: "Reservationer" },
      { href: "/da/mobile-management", label: "Mobilstyring" },
      { href: "/da/easy-menu", label: "Menu-editor" },
      { href: "/da/custom-design", label: "Video- og fotobaggrunde" },
      { href: "/da/color-scheme", label: "Brandfarver" },
      { href: "/da/multilingual", label: "Flersproget side" },
      { href: "/da/ai-images", label: "AI-billedoptimering" },
      { href: "/da/analytics", label: "Statistik" },
      { href: "/da/instant-setup", label: "Øjeblikkelig opsætning" },
      { href: "/da/personal-support", label: "Personlig support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Priser" }, { href: "#faq", label: "Spørgsmål" },
      { href: "/da/languages", label: "Skift sprog" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle rettigheder forbeholdes.",
  },
};
