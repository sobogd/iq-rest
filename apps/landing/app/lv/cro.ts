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
    verticals: ["Restorāni","Kafejnīcas","Bāri","Picērijas"],
    title: "Jūsu restorāns,",
    titleAccent: "pilnībā digitāls 5 minūtēs.",
    sub: "Skaista digitālā ēdienkarte, virtuves ekrāns un rezervācijas visu diennakti — pilnīga platforma modernam restorānam.",
  },

  heroMicrocopy: "{count} restorāni · 14 dienas bez maksas · Bez kartes",
  seeIncluded: "Kas iekļauts",

  trust: [
    { kind: "num", value: 35, label: "Valodas" },
    { kind: "text", value: "24/7", label: "Rezervācijas" },
    { kind: "num", value: 5, suffix: " min", label: "Palaišana" },
    { kind: "count", label: "Restorāni" },
  ],

  bundle: {
    heading: "Viss, uz kā balstās jūsu restorāns.",
    headingAccent: "Vienā lietotnē.",
    sub: "Ēdienkarte, virtuve un rezervācijas vienuviet — moderni, ātri un veidots tam, kā restorāni patiešām strādā. Bez papildinājumiem, bez maksas par funkciju.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitālā ēdienkarte", title: "Ēdienkarte, kas pārdod.", bullets: ["35 valodas ar MI","Premium dizains","Cenas uzreiz aktuālas"], image: "/landing/feature-design.webp", imageAlt: "Divi telefoni uz kafejnīcas galda: digitālās ēdienkartes sākuma ekrāns un kontaktu lapa ar karti" },
    { Icon: ChefHat, tag: "Virtuves ekrāns", title: "Gatavojiet ātrāk, nepalaidiet garām neko.", bullets: ["Tiešraidē ekrānā","Piezīmes un alergēni","Planšete vai telefons"], image: "/landing/feature-kds-cards.webp", imageAlt: "Planšete pie bāra rāda virtuves ekrānu ar pasūtījumiem pa galdiem" },
    { Icon: CalendarCheck, tag: "Rezervācijas", title: "Rezervācijas autopilotā.", bullets: ["Pašapkalpošanās rezervācija","Automātisks apstiprinājums","Kalendārs pa galdiem"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Divas planšetes rāda rezervāciju kalendāru: dienas skats pa galdiem un mēneša skats" },
    { Icon: Receipt, tag: "Pasūtījumi pie galda", title: "Pasūtījumi tieši uz virtuvi.", bullets: ["Viesis vai viesmīlis","Tieši uz virtuvi","Ieslēdziet jebkurā laikā"], image: "/landing/feature-orders-map.webp", imageAlt: "Planšete ar pasūtījumu ekrānu: pasūtījumu saraksts un zāles plāns ar krāsainiem galdiem." },
  ],

  seeDetails: "Skatīt vairāk",

  extras: {
    heading: "Un viss pārējais iekļauts.",
    items: [
      { Icon: ScanLine, label: "MI digitalizē jūsu papīra ēdienkarti 60 sekundēs" },
      { Icon: QrCode, label: "Unikāls QR kods katram galdam" },
      { Icon: Smartphone, label: "Viesiem nav vajadzīga lietotne — atveras pārlūkā" },
      { Icon: Globe, label: "Jūsu paša domēns ar SSL" },
      { Icon: BarChart3, label: "Pārdošanas analītika: ieņēmumi, top ēdieni, stundas" },
      { Icon: Palette, label: "Alergēnu un diētu birkas filtrēšanai" },
    ],
  },

  midCta: {
    heading: "Viena lietotne piecu vietā.",
    sub: "Vairs nav jāžonglē ar atsevišķiem rīkiem ēdienkartei, virtuvei un rezervācijām — viss vienuviet, jebkurā telefonā vai planšetē, bez instalēšanas.",
  },

  platform: {
    hardwareTitle: "Strādājiet ar savu aprīkojumu",
    hardwareSub: "Mēs nekad nepiespiežam iegādāties aprīkojumu no mums. Izmantojiet tālruņus, planšetdatorus un datorus, kas jums jau ir.",
    anywhereTitle: "Darbojas jebkur",
    anywhereSub: "Tālrunis, planšetdators, klēpjdators, PC. Android, iOS, Windows, Mac, Linux. Darbojas jebkurā mūsdienīgā pārlūkā, bez instalēšanas.",
  },

  activities: {
    heading: "Viena sistēma,",
    headingAccent: "viss jūsu restorāns.",
    sub: "Ātrāka apkalpošana, mierīgāka virtuve, zemākas izmaksas un pieredze, ko viesis atceras — viss vienā platformā.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Pie galda — viesi",
        bullets: [
          "QR ēdienkarte 35 valodās",
          "Pasūtīšana, negaidot viesmīli",
          "Viesmīļa izsaukšana vai rēķina pieprasīšana",
          "Galda rezervēšana 24/7",
          "Unikāls QR kods katram galdam",
          "Viesiem nav vajadzīga lietotne — atveras pārlūkā",
          "Alergēnu un diētu birkas filtrēšanai",
        ],
      },
      {
        Icon: ChefHat,
        tag: "Virtuvē",
        bullets: [
          "Pasūtījumi uzreiz parādās ekrānā",
          "Kolonnas gatavojas / gatavs / pasniegts",
          "Alergēni un piezīmes izceltas",
          "Planšetdators vai tālrunis — bez papīra čekiem",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Pārvaldība",
        bullets: [
          "Ēdienkartes un cenu izmaiņas uzreiz tiešraidē",
          "Mākslīgā intelekta tulkojums ar vienu klikšķi",
          "Pārdošanas analīze un atskaites",
          "Vairāki restorāni vienā kontā",
          "MI digitalizē jūsu papīra ēdienkarti 60 sekundēs",
          "Jūsu paša domēns ar SSL",
        ],
      },
    ],
  },
};
