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
    verticals: ["Restoranid","Kohvikud","Baarid","Pitsabaarid"],
    title: "Sinu restoran digitaalseks",
    titleAccent: "5 minutiga",
    sub: "Digitaalne menüü, köögiekraan ja broneerimine 24/7 — kõik, mida su restoran vajab, valmis 5 minutiga.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restoranid" },
      { icon: "cafe", label: "Kohvikud" },
      { icon: "bar", label: "Baarid" },
      { icon: "pizza", label: "Pitsakohad" },
    ],
    title: "Kõik, mida sinu",
    titleAccent: "restoran vajab!",
    sub: "Seadista protsessid 10 minutiga: käivita veebimenüü, optimeeri köögi tööd ja hoia laudade täituvusel silma peal.",
    primaryLabel: "Alusta tasuta",
    demoLabel: "Vaata demot",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tahvelarvuti köögiekraaniga: tellimused laudade kaupa veergudes koos staatustega" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tahvelarvuti broneeringute kalendriga: kuuvaade ja kinnitust ootavad broneeringud" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon restorani veebilehe avalehega: foto, broneeringud ja veebimenüü" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon roa lehega: foto, hind ja allergeenimärgised" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Töövalmis 10 minutiga", sub: "Ilma kalli riistvara ja pika seadistamiseta" },
    { Icon: MessagesSquare, title: "Kiire tugi", sub: "Vastame vestluses mõne tunni jooksul" },
    { Icon: Globe, title: "{count} koha valik", sub: "Meid usaldavad restoranid ja kohvikud enam kui 15 riigis" },
    { Icon: Palette, title: "100% sinu bränd", sub: "Kohandame disaini ja liidese sinu koha stiili järgi" },
  ],

  menu: {
    heading: "Veebileht ja digimenüü",
    sub: {
      link: "Rohkem kui QR-menüü!",
      rest: " Saad täisväärtusliku veebilehe ainulaadse disaini, kontaktilehe ja lauabroneeringutega.",
    },
    moreLabel: "Loe lähemalt",
    mockupAlt: "Kaks telefoni: restorani veebilehe avaleht ja roa leht",
    bullets: [
      { Icon: Languages, title: "Automaattõlge 35 keelde", sub: "Teeninda välismaiseid külalisi keelebarjäärita — automaattõlge teeb kõik ise" },
      { Icon: ClipboardList, title: "Tellimused otse laualt", sub: "Lihtsusta teenindust: võta tellimusi laudadelt vastu kiiresti ja ilma teenindajata" },
      { Icon: WheatOff, title: "Allergeenid ja dieedid", sub: "Märgi allergeenid ja eelistused (vegan, vürtsikas), et külalised valiksid lihtsalt ja turvaliselt" },
    ],
  },

  reservations: {
    heading: "Laudade broneerimine",
    sub: {
      link: "Nutikas lauabroneering!",
      rest: " Automaatne broneerimissüsteem, mis jälgib ise vabu laudu ja sinu graafikut.",
    },
    moreLabel: "Loe lähemalt",
    mockupAlt: "Tahvelarvuti broneeringute kalendriga: lauad päevade ja ajavahemike kaupa",
    bullets: [
      { Icon: CalendarCheck, title: "Selge broneeringute kaart", sub: "Ülevaatlik graafik päevade ja laudade kaupa — vabad kohad on kohe näha" },
      { Icon: SlidersHorizontal, title: "Paindlikud seaded", sub: "Määra lahtiolekuajad, aegade pikkus ja laudade fotod ning kogu külaliste soove" },
      { Icon: Users, title: "Külastajavoo juhtimine", sub: "Vali sobiv broneeringute režiim ja hoia külastajavoog täielikult kontrolli all" },
    ],
  },

  heroMicrocopy: "{count} restorani · 14 päeva tasuta · Kaardita",
  seeIncluded: "Mis sisaldub",

  trust: [
    { kind: "num", value: 35, label: "Keelt" },
    { kind: "text", value: "24/7", label: "Broneeringud" },
    { kind: "num", value: 5, suffix: " min", label: "Käivitus" },
    { kind: "count", label: "Restorani" },
  ],

  bundle: {
    heading: "Kõik, mille peal sinu restoran töötab.",
    headingAccent: "Ühes rakenduses.",
    sub: "Menüü, köök ja broneeringud ühes kohas — kaasaegne, kiire ja loodud selle järgi, kuidas restoranid tegelikult töötavad. Ei mingeid lisasid ega tasu funktsiooni eest.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitaalne menüü", title: "Menüü, mis müüb.", bullets: ["35 keelt tehisintellektiga","Premium-disain","Hinnad kohe ajakohased"], image: "/landing/feature-design.webp", imageAlt: "Kaks telefoni kohviku laual: digitaalse menüü tervitusekraan ja kontaktileht kaardiga" },
    { Icon: ChefHat, tag: "Köögiekraan", title: "Valmista kiiremini, ära jää millestki ilma.", bullets: ["Otse ekraanil","Märkused ja allergeenid","Tahvel või telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tahvelarvuti baaril näitab köögiekraani tellimustega laudade kaupa" },
    { Icon: CalendarCheck, tag: "Broneeringud", title: "Broneeringud autopiloodil.", bullets: ["Iseteenindusbroneering","Automaatne kinnitus","Kalender laudade kaupa"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Kaks tahvelarvutit näitavad broneeringukalendrit: päevavaade laudade kaupa ja kuuvaade" },
    { Icon: Receipt, tag: "Tellimused lauas", title: "Tellimused otse kööki.", bullets: ["Külaline või ettekandja","Otse kööki","Sisse/välja igal ajal"], image: "/landing/feature-orders-map.webp", imageAlt: "Tahvelarvuti tellimuste ekraaniga: tellimuste loend ja saaliplaan värvikoodiga laudadega." },
  ],

  seeDetails: "Vaata lähemalt",

  extras: {
    heading: "Ja kõik muu on kaasas.",
    items: [
      { Icon: ScanLine, label: "Tehisintellekt digiteerib pabermenüü 60 sekundiga" },
      { Icon: QrCode, label: "Unikaalne QR-kood igale lauale" },
      { Icon: Smartphone, label: "Külalistele rakendust pole — avaneb brauseris" },
      { Icon: Globe, label: "Sinu enda domeen SSL-iga" },
      { Icon: BarChart3, label: "Müügianalüütika: tulu, top-road, tunnid" },
      { Icon: Palette, label: "Allergeeni- ja dieedisildid filtreerimiseks" },
    ],
  },

  midCta: {
    heading: "Üks rakendus viie asemel.",
    sub: "Pole vaja žongleerida eraldi tööriistadega menüü, köögi ja broneeringute jaoks — kõik ühes kohas, igal telefonil või tahvlil, ilma paigalduseta.",
  },

  platform: {
    hardwareTitle: "Töötage oma riistvaraga",
    hardwareSub: "Me ei sunni teid kunagi meilt riistvara ostma. Kasutage telefone, tahvelarvuteid ja arvuteid, mis teil juba on.",
    anywhereTitle: "Töötab kõikjal",
    anywhereSub: "Telefon, tahvelarvuti, sülearvuti, PC. Android, iOS, Windows, Mac, Linux. Töötab igas kaasaegses brauseris, ilma paigalduseta.",
  },

  activities: {
    heading: "Üks süsteem,",
    headingAccent: "kogu teie restoran.",
    sub: "Kiirem teenindus, rahulikum köök, väiksemad kulud ja külastuskogemus, mida mäletatakse — kõik ühel platvormil.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Laua taga — külalised",
        bullets: [
          "QR-menüü 35 keeles",
          "Telli ilma kelnerit ootamata",
          "Kutsu kelner või palu arvet",
          "Laua broneerimine ööpäev läbi",
          "Unikaalne QR-kood igale lauale",
          "Külalistele rakendust pole — avaneb brauseris",
          "Allergeeni- ja dieedisildid filtreerimiseks",
        ],
      },
      {
        Icon: ChefHat,
        tag: "Köögis",
        bullets: [
          "Tellimused jõuavad kohe ekraanile",
          "Veerud valmistamisel / valmis / serveeritud",
          "Allergeenid ja märkmed esile tõstetud",
          "Tahvelarvuti või telefon — ilma paberitšekkideta",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Haldus",
        bullets: [
          "Menüü- ja hinnamuudatused kohe eetris",
          "Tehisintellekti tõlge ühe klikiga",
          "Müügianalüütika ja aruanded",
          "Mitu restorani ühel kontol",
          "Tehisintellekt digiteerib pabermenüü 60 sekundiga",
          "Sinu enda domeen SSL-iga",
        ],
      },
    ],
  },
};
