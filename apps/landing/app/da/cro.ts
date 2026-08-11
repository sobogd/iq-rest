import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restauranter","Caféer","Barer","Pizzeriaer"],
    title: "Din restaurant, digital",
    titleAccent: "på 5 min",
    sub: "Digitalt menukort, køkkenskærm og bordbestilling 24/7 — alt til din restaurant, klar på 5 minutter.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restauranter" },
      { icon: "cafe", label: "Caféer" },
      { icon: "bar", label: "Barer" },
      { icon: "pizza", label: "Pizzeriaer" },
    ],
    title: "Alt til",
    titleAccent: "din restaurant!",
    sub: "Sæt jeres processer op på 10 minutter: lancér onlinemenuen, optimér køkkenet og hold styr på bordbelægningen.",
    primaryLabel: "Start gratis",
    demoLabel: "Se demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet med køkkendisplay: bestillinger pr. bord i kolonner med status" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet med bookingkalender: månedsvisning og reservationer, der afventer bekræftelse" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon med forsiden af en restauranthjemmeside: foto, reservationer og onlinemenu" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon med en retside: foto, pris og allergenmærkning" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "I gang på 10 minutter", sub: "Intet dyrt udstyr og ingen lang opsætning" },
    { Icon: MessagesSquare, title: "Hurtig support", sub: "Vi svarer i chatten inden for få timer" },
    { Icon: Globe, title: "Valget for {count} steder", sub: "Restauranter og caféer i mere end 15 lande stoler på os" },
    { Icon: Palette, title: "100 % dit brand", sub: "Vi tilpasser design og interface til dit steds stil" },
  ],

  menu: {
    heading: "Hjemmeside og digital menu",
    sub: {
      link: "Mere end en QR-menu!",
      rest: " Få en komplet hjemmeside med unikt design, kontaktside og bordreservation.",
    },
    moreLabel: "Læs mere",
    mockupAlt: "To telefoner: forsiden af en restauranthjemmeside og en retside",
    bullets: [
      { Icon: Languages, title: "Automatisk oversættelse til 35 sprog", sub: "Betjen udenlandske gæster uden sprogbarriere — den automatiske oversættelse klarer det hele" },
      { Icon: ClipboardList, title: "Bestillinger direkte fra bordet", sub: "Gør servicen enklere: modtag bestillinger fra bordene hurtigt og uden tjener" },
      { Icon: WheatOff, title: "Allergener og diæter", sub: "Markér allergener og præferencer (vegansk, stærk), så gæsterne vælger nemt og trygt" },
    ],
  },

  reservations: {
    heading: "Bordreservation",
    sub: {
      link: "Smart bordreservation!",
      rest: " Et automatisk reservationssystem, der selv holder styr på ledige borde og din tidsplan.",
    },
    moreLabel: "Læs mere",
    mockupAlt: "Tablet med bookingkalender: borde pr. dag og tidsinterval",
    bullets: [
      { Icon: CalendarCheck, title: "Overskueligt bookingkort", sub: "Et skema pr. dag og bord — ledige pladser ses med det samme" },
      { Icon: SlidersHorizontal, title: "Fleksibel opsætning", sub: "Indstil åbningstider, slotlængde og bordfotos, og saml gæsternes ønsker" },
      { Icon: Users, title: "Styr på gæsteflowet", sub: "Vælg hvordan reservationer håndteres, og bevar fuld kontrol over gæsteflowet" },
    ],
  },

  heroMicrocopy: "{count} restauranter · 14 dage gratis · Intet kort",
  seeIncluded: "Se hvad der er med",

  trust: [
    { kind: "num", value: 35, label: "Sprog" },
    { kind: "text", value: "24/7", label: "Reservationer" },
    { kind: "num", value: 5, suffix: " min", label: "I gang" },
    { kind: "count", label: "Restauranter" },
  ],

  bundle: {
    heading: "Alt det din restaurant kører på.",
    headingAccent: "I én app.",
    sub: "Menu, køkken og reservationer ét sted — moderne, hurtigt og bygget til, hvordan restauranter faktisk arbejder. Ingen tilkøb, ingen pris pr. funktion.",
  },

  benefits: [
    { Icon: Languages, tag: "Digital menu", title: "En menu der sælger.", bullets: ["35 AI-sprog","Premium-design","Priser opdateret straks"], image: "/landing/feature-design.webp", imageAlt: "To telefoner på et cafébord: den digitale menus velkomstskærm og kontaktsiden med kort" },
    { Icon: ChefHat, tag: "Køkkenskærm", title: "Lav mad hurtigere, mis intet.", bullets: ["Live på skærmen","Noter & allergener","Tablet eller telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet på baren viser køkkenskærmen med bestillinger pr. bord" },
    { Icon: CalendarCheck, tag: "Reservationer", title: "Reservationer på autopilot.", bullets: ["Reservér selv","Automatisk bekræftelse","Kalender pr. bord"], image: "/landing/feature-booking-calendar.webp", imageAlt: "To tablets viser reservationskalenderen: dagsvisning pr. bord og månedsvisning" },
    { Icon: Receipt, tag: "Bestil ved bordet", title: "Bestillinger direkte til køkkenet.", bullets: ["Gæst eller tjener","Direkte til køkkenet","Til/fra når som helst"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet med bestillingsskærmen: ordreliste og plantegning med farvekodede borde." },
  ],

  seeDetails: "Se detaljer",

  extras: {
    heading: "Og alt det andet er med.",
    items: [
      { Icon: ScanLine, label: "AI digitaliserer din papirmenu på 60 sekunder" },
      { Icon: QrCode, label: "En unik QR-kode til hvert bord" },
      { Icon: Smartphone, label: "Ingen app for gæster — åbner i browseren" },
      { Icon: Globe, label: "Dit eget domæne med SSL" },
      { Icon: BarChart3, label: "Salgsanalyse: omsætning, topretter, timer" },
      { Icon: Palette, label: "Allergen- og diættags at filtrere på" },
    ],
  },

  midCta: {
    heading: "Én app i stedet for fem.",
    sub: "Slut med at jonglere separate værktøjer til menu, køkken og reservationer — alt ét sted, på enhver telefon eller tablet, uden at installere noget.",
  },

  platform: {
    hardwareTitle: "Arbejd med din egen hardware",
    hardwareSub: "Vi tvinger dig aldrig til at købe hardware hos os. Brug de telefoner, tablets og computere, du allerede har.",
    anywhereTitle: "Virker overalt",
    anywhereSub: "Mobil, tablet, laptop, PC. Android, iOS, Windows, Mac, Linux. Virker i enhver moderne browser, uden installation.",
  },

  activities: {
    heading: "Ét system,",
    headingAccent: "hele din restaurant.",
    sub: "Hurtigere service, et roligere køkken, lavere omkostninger og en gæsteoplevelse, der huskes — alt i én platform.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Ved bordet — gæster",
        bullets: [
          "QR-menu på 35 sprog",
          "Bestil uden at vente på tjeneren",
          "Kald på tjeneren eller bed om regningen",
          "Book bord døgnet rundt",
          "En unik QR-kode til hvert bord",
          "Ingen app for gæster — åbner i browseren",
          "Allergen- og diættags at filtrere på",
        ],
      },
      {
        Icon: ChefHat,
        tag: "I køkkenet",
        bullets: [
          "Ordrer rammer skærmen med det samme",
          "Kolonner under tilberedning / klar / serveret",
          "Allergener og noter fremhævet",
          "Tablet eller telefon — ingen papirsedler",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Administration",
        bullets: [
          "Menu- og prisændringer live med det samme",
          "AI-oversættelse med ét klik",
          "Salgsanalyser og rapporter",
          "Flere restauranter på én konto",
          "AI digitaliserer din papirmenu på 60 sekunder",
          "Dit eget domæne med SSL",
        ],
      },
    ],
  },
};
