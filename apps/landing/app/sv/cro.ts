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
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Restauranger","Kaféer","Barer","Pizzerior"],
    title: "Din restaurang,",
    titleAccent: "helt digital på 5 minuter.",
    sub: "En snygg digital meny, en köksskärm och bokningar dygnet runt — den kompletta plattformen för en modern restaurang.",
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
        ],
      },
    ],
  },
};
