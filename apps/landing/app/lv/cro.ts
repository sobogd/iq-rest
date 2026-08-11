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
    verticals: ["Restorāni","Kafejnīcas","Bāri","Picērijas"],
    title: "Restorāns digitāli",
    titleAccent: "5 minūtēs",
    sub: "Digitāla ēdienkarte, virtuves ekrāns un rezervācija 24/7 — viss, kas restorānam vajadzīgs, 5 minūtēs.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restorāni" },
      { icon: "cafe", label: "Kafejnīcas" },
      { icon: "bar", label: "Bāri" },
      { icon: "pizza", label: "Picērijas" },
    ],
    title: "Viss, kas nepieciešams",
    titleAccent: "jūsu restorānam!",
    sub: "Iestatiet procesus 10 minūtēs: palaidiet tiešsaistes ēdienkarti, optimizējiet virtuves darbu un sekojiet galdiņu noslodzei.",
    primaryLabel: "Sākt bez maksas",
    demoLabel: "Skatīt demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Planšete ar virtuves displeju: pasūtījumi pa galdiņiem kolonnās ar statusiem" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Planšete ar rezervāciju kalendāru: mēneša skats un apstiprinājumu gaidošas rezervācijas" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Tālrunis ar restorāna vietnes sākumlapu: foto, rezervācijas un tiešsaistes ēdienkarte" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Tālrunis ar ēdiena lapu: foto, cena un alergēnu atzīmes" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Darbībā 10 minūtēs", sub: "Bez dārga aprīkojuma un ilgas iestatīšanas" },
    { Icon: MessagesSquare, title: "Ātrs atbalsts", sub: "Čatā atbildam dažu stundu laikā" },
    { Icon: Globe, title: "{count} vietu izvēle", sub: "Mums uzticas restorāni un kafejnīcas vairāk nekā 15 valstīs" },
    { Icon: Palette, title: "100 % jūsu zīmols", sub: "Dizainu un saskarni pielāgojam jūsu vietas stilam" },
  ],

  menu: {
    heading: "Vietne un digitālā ēdienkarte",
    sub: {
      link: "Vairāk nekā QR ēdienkarte!",
      rest: " Iegūstiet pilnvērtīgu vietni ar unikālu dizainu, kontaktiem un galdiņu rezervāciju.",
    },
    moreLabel: "Uzzināt vairāk",
    mockupAlt: "Divi tālruņi: restorāna vietnes sākumlapa un ēdiena lapa",
    bullets: [
      { Icon: Languages, title: "Automātisks tulkojums 35 valodās", sub: "Apkalpojiet ārvalstu viesus bez valodas barjeras — automātiskais tulkojums izdarīs visu" },
      { Icon: ClipboardList, title: "Pasūtījumi tieši no galdiņa", sub: "Vienkāršojiet apkalpošanu: pieņemiet pasūtījumus no galdiņiem ātri un bez viesmīļa" },
      { Icon: WheatOff, title: "Alergēni un diētas", sub: "Atzīmējiet alergēnus un preferences (vegānisks, ass), lai viesi izvēlētos viegli un droši" },
    ],
  },

  reservations: {
    heading: "Galdiņu rezervācija",
    sub: {
      link: "Vieda galdiņu rezervācija!",
      rest: " Automātiska rezervāciju sistēma, kas pati seko brīvajiem galdiņiem un jūsu grafikam.",
    },
    moreLabel: "Uzzināt vairāk",
    mockupAlt: "Planšete ar rezervāciju kalendāru: galdiņi pa dienām un laika intervāliem",
    bullets: [
      { Icon: CalendarCheck, title: "Pārskatāma rezervāciju karte", sub: "Uzskatāms grafiks pa dienām un galdiņiem — brīvās vietas redzamas uzreiz" },
      { Icon: SlidersHorizontal, title: "Elastīgi iestatījumi", sub: "Iestatiet darba laiku, intervālu ilgumu, galdiņu fotoattēlus un apkopojiet viesu vēlmes" },
      { Icon: Users, title: "Viesu plūsmas kontrole", sub: "Izvēlieties ērtu rezervāciju režīmu un pilnībā kontrolējiet viesu plūsmu" },
    ],
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
