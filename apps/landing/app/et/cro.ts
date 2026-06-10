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
    verticals: ["Restoranid","Kohvikud","Baarid","Pitsabaarid"],
    title: "Sinu restoran,",
    titleAccent: "täisdigitaalne 5 minutiga.",
    sub: "Ilus digitaalne menüü, köögiekraan ja broneeringud ööpäev läbi — täielik platvorm kaasaegsele restoranile.",
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
