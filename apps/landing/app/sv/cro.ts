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
    verticals: ["Restauranger","Kaféer","Barer","Pizzerior"],
    title: "Din restaurang, digital",
    titleAccent: "på 5 min",
    sub: "Digital meny, köksskärm och bordsbokning 24/7 — allt din restaurang behöver, klart på 5 minuter.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restauranger" },
      { icon: "cafe", label: "Kaféer" },
      { icon: "bar", label: "Barer" },
      { icon: "pizza", label: "Pizzerior" },
    ],
    title: "Allt din",
    titleAccent: "restaurang behöver!",
    sub: "Sätt upp era processer på 10 minuter: lansera onlinemenyn, effektivisera köket och håll koll på bordsbeläggningen.",
    primaryLabel: "Börja gratis",
    demoLabel: "Se demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Surfplatta med köksdisplay: beställningar per bord i kolumner med status" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Surfplatta med bokningskalender: månadsvy och bokningar som väntar på bekräftelse" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon med startsidan för en restaurangwebbplats: foto, bokningar och onlinemeny" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon med en maträttssida: foto, pris och allergenmärkning" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Igång på 10 minuter", sub: "Ingen dyr utrustning, ingen lång installation" },
    { Icon: MessagesSquare, title: "Snabb support", sub: "Vi svarar i chatten inom några timmar" },
    { Icon: Globe, title: "Valet för {count} verksamheter", sub: "Restauranger och kaféer i över 15 länder litar på oss" },
    { Icon: Palette, title: "100 % ditt varumärke", sub: "Vi anpassar design och gränssnitt efter din verksamhets stil" },
  ],

  menu: {
    heading: "Webbplats och digital meny",
    sub: {
      link: "Mer än en QR-meny!",
      rest: " Få en komplett webbplats med unik design, kontaktsida och bordsbokning.",
    },
    moreLabel: "Läs mer",
    mockupAlt: "Två telefoner: startsidan för en restaurangwebbplats och en maträttssida",
    bullets: [
      { Icon: Languages, title: "Automatisk översättning till 35 språk", sub: "Betjäna utländska gäster utan språkbarriär — den automatiska översättningen sköter allt" },
      { Icon: ClipboardList, title: "Beställningar direkt från bordet", sub: "Förenkla servicen: ta emot beställningar från borden, snabbt och utan servitör" },
      { Icon: WheatOff, title: "Allergener och dieter", sub: "Markera allergener och preferenser (veganskt, starkt) så att gästerna väljer enkelt och tryggt" },
    ],
  },

  reservations: {
    heading: "Bordsbokning",
    sub: {
      link: "Smart bordsbokning!",
      rest: " Ett automatiskt bokningssystem som självt håller koll på lediga bord och ditt schema.",
    },
    moreLabel: "Läs mer",
    mockupAlt: "Surfplatta med bokningskalender: bord per dag och tidslucka",
    bullets: [
      { Icon: CalendarCheck, title: "Tydlig bokningskarta", sub: "Ett rutnät per dag och bord — lediga platser syns direkt" },
      { Icon: SlidersHorizontal, title: "Flexibla inställningar", sub: "Ställ in öppettider, luckornas längd och bordsfoton, och samla in gästernas önskemål" },
      { Icon: Users, title: "Kontroll över gästflödet", sub: "Välj hur bokningar hanteras och behåll full kontroll över gästflödet" },
    ],
  },

  heroMicrocopy: "{count} restauranger · 14 dagar gratis · Inget kort",
  seeIncluded: "Se vad som ingår",

  trust: [
    { kind: "num", value: 35, label: "Språk" },
    { kind: "text", value: "24/7", label: "Bokningar" },
    { kind: "num", value: 5, suffix: " min", label: "Igång" },
    { kind: "count", label: "Restauranger" },
  ],

  bundle: {
    heading: "Allt din restaurang går på.",
    headingAccent: "I en app.",
    sub: "Meny, kök och bokningar på ett ställe — modernt, snabbt och byggt för hur restauranger faktiskt jobbar. Inga tillägg, ingen avgift per funktion.",
  },

  benefits: [
    { Icon: Languages, tag: "Digital meny", title: "En meny som säljer.", bullets: ["35 AI-språk","Premiumdesign","Priser direkt"], image: "/landing/feature-design.webp", imageAlt: "Två telefoner på ett kafébord: den digitala menyns startskärm och kontaktsidan med karta" },
    { Icon: ChefHat, tag: "Köksskärm", title: "Laga snabbare, missa inget.", bullets: ["Live på skärmen","Noteringar & allergener","Surfplatta eller telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Surfplatta på baren visar köksskärmen med beställningar per bord" },
    { Icon: CalendarCheck, tag: "Bokningar", title: "Bokningar på autopilot.", bullets: ["Boka själv","Automatisk bekräftelse","Kalender per bord"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Två surfplattor visar bokningskalendern: dagsvy per bord och månadsvy" },
    { Icon: Receipt, tag: "Beställ vid bordet", title: "Beställningar direkt till köket.", bullets: ["Gäst eller servitör","Direkt till köket","På/av när du vill"], image: "/landing/feature-orders-map.webp", imageAlt: "Surfplatta med beställningsskärmen: orderlista och planritning med färgkodade bord." },
  ],

  seeDetails: "Se detaljer",

  extras: {
    heading: "Och allt annat ingår.",
    items: [
      { Icon: ScanLine, label: "AI digitaliserar din pappersmeny på 60 sekunder" },
      { Icon: QrCode, label: "En unik QR-kod för varje bord" },
      { Icon: Smartphone, label: "Ingen app för gäster — öppnas i webbläsaren" },
      { Icon: Globe, label: "Din egen domän med SSL" },
      { Icon: BarChart3, label: "Försäljningsanalys: intäkter, topprätter, timmar" },
      { Icon: Palette, label: "Allergen- och kosttaggar att filtrera på" },
    ],
  },

  midCta: {
    heading: "En app i stället för fem.",
    sub: "Slut på att jonglera separata verktyg för meny, kök och bokningar — allt på ett ställe, på vilken telefon eller surfplatta som helst, utan installation.",
  },

  platform: {
    hardwareTitle: "Arbeta med din egen hårdvara",
    hardwareSub: "Vi tvingar dig aldrig att köpa hårdvara av oss. Använd de telefoner, surfplattor och datorer du redan har.",
    anywhereTitle: "Fungerar överallt",
    anywhereSub: "Mobil, surfplatta, laptop, PC. Android, iOS, Windows, Mac, Linux. Fungerar i alla moderna webbläsare, utan installation.",
  },

  activities: {
    heading: "Ett system,",
    headingAccent: "hela din restaurang.",
    sub: "Snabbare service, ett lugnare kök, lägre kostnader och en gästupplevelse som minns — allt i en plattform.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Vid bordet — gäster",
        bullets: [
          "QR-meny på 35 språk",
          "Beställ utan att vänta på servitören",
          "Kalla på servitören eller be om notan",
          "Boka bord dygnet runt",
          "En unik QR-kod för varje bord",
          "Ingen app för gäster — öppnas i webbläsaren",
          "Allergen- och kosttaggar att filtrera på",
        ],
      },
      {
        Icon: ChefHat,
        tag: "I köket",
        bullets: [
          "Beställningar hamnar direkt på skärmen",
          "Kolumner tillagas / klart / serverat",
          "Allergener och noteringar markerade",
          "Surfplatta eller telefon — inga papperslappar",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Hantering",
        bullets: [
          "Meny- och prisändringar direkt live",
          "AI-översättning med ett klick",
          "Försäljningsanalys och rapporter",
          "Flera restauranger på ett konto",
          "AI digitaliserar din pappersmeny på 60 sekunder",
          "Din egen domän med SSL",
        ],
      },
    ],
  },
};
