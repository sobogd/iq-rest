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
    sub: "Täielik platvorm kaasaegse restorani juhtimiseks — ilus, kõik ühes kohas, ilma tehniliste teadmisteta.",
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
    { Icon: Receipt, tag: "Tellimused lauas", title: "Tellimused otse kööki.", bullets: ["Külaline või ettekandja","Otse kööki","Sisse/välja igal ajal"], image: "/landing/feature-orders.webp", imageAlt: "Ettekandja võtab lauas tellimuse telefonist, see jõuab köögiekraanile" },
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

  how: {
    heading: "Valmis 5 minutiga",
    sub: "Neli sammu. Ei mingit paigaldust, tehnilist seadistust ega kaarti.",
    steps: [
      { n: "1", t: "Tüüp ja nimi", d: "Koha tüüp ja nimi — see ongi kogu registreerimine." },
      { n: "2", t: "Logi sisse", d: "E-post või Google. Kaardita." },
      { n: "3", t: "Lisa menüü", d: "Sisesta see või lase tehisintellektil pabermenüü skannida." },
      { n: "4", t: "Oled live'is", d: "Menüü, köök ja broneeringud — valmis." },
    ],
  },
};
