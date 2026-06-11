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
    verticals: ["Restorani","Kafići","Barovi","Pizzerije"],
    title: "Vaš restoran,",
    titleAccent: "potpuno digitalan u 5 minuta.",
    sub: "Lijep digitalni jelovnik, kuhinjski zaslon i rezervacije 24/7 — kompletna platforma za moderni restoran.",
  },

  heroMicrocopy: "{count} restorana · 14 dana besplatno · Bez kartice",
  seeIncluded: "Što je uključeno",

  trust: [
    { kind: "num", value: 35, label: "Jezika" },
    { kind: "text", value: "24/7", label: "Rezervacije" },
    { kind: "num", value: 5, suffix: " min", label: "Pokretanje" },
    { kind: "count", label: "Restorana" },
  ],

  bundle: {
    heading: "Sve na čemu vaš restoran radi.",
    headingAccent: "U jednoj aplikaciji.",
    sub: "Jelovnik, kuhinja i rezervacije na jednom mjestu — moderno, brzo i osmišljeno za način na koji restorani stvarno rade. Bez dodataka, bez naplate po funkciji.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitalni jelovnik", title: "Jelovnik koji prodaje.", bullets: ["35 jezika s UI","Premium dizajn","Cijene odmah ažurne"], image: "/landing/feature-design.webp", imageAlt: "Dva telefona na stolu u kafiću: početni zaslon digitalnog jelovnika i kontakt stranica s kartom" },
    { Icon: ChefHat, tag: "Kuhinjski zaslon", title: "Kuhajte brže, bez propusta.", bullets: ["Uživo na zaslonu","Bilješke i alergeni","Tablet ili telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet na šanku prikazuje kuhinjski zaslon s narudžbama po stolovima" },
    { Icon: CalendarCheck, tag: "Rezervacije", title: "Rezervacije na autopilotu.", bullets: ["Samostalna rezervacija","Automatska potvrda","Kalendar po stolovima"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dva tableta prikazuju kalendar rezervacija: dnevni prikaz po stolovima i mjesečni prikaz" },
    { Icon: Receipt, tag: "Narudžbe za stolom", title: "Narudžbe ravno u kuhinju.", bullets: ["Gost ili konobar","Ravno u kuhinju","Uključite kad želite"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet sa zaslonom narudžbi: popis narudžbi i tlocrt s obojenim stolovima." },
  ],

  seeDetails: "Detalji",

  extras: {
    heading: "I sve ostalo je uključeno.",
    items: [
      { Icon: ScanLine, label: "UI digitalizira vaš papirnati jelovnik u 60 sekundi" },
      { Icon: QrCode, label: "Jedinstveni QR kod za svaki stol" },
      { Icon: Smartphone, label: "Bez aplikacije za goste — otvara se u pregledniku" },
      { Icon: Globe, label: "Vlastita domena sa SSL-om" },
      { Icon: BarChart3, label: "Analitika prodaje: prihod, top jela, sati" },
      { Icon: Palette, label: "Oznake alergena i dijeta za filtriranje" },
    ],
  },

  midCta: {
    heading: "Jedna aplikacija umjesto pet.",
    sub: "Bez žongliranja zasebnim alatima za jelovnik, kuhinju i rezervacije — sve na jednom mjestu, na bilo kojem telefonu ili tabletu, bez instalacije.",
  },

  platform: {
    hardwareTitle: "Radite s vlastitom opremom",
    hardwareSub: "Nikada vas ne prisiljavamo na kupnju opreme od nas. Koristite telefone, tablete i računala koja već imate.",
    anywhereTitle: "Radi svugdje",
    anywhereSub: "Mobitel, tablet, laptop, PC. Android, iOS, Windows, Mac, Linux. Radi u svakom modernom pregledniku, bez instalacije.",
  },

  activities: {
    heading: "Jedan sustav,",
    headingAccent: "cijeli vaš restoran.",
    sub: "Brža usluga, mirnija kuhinja, niži troškovi i iskustvo koje gost pamti — sve na jednoj platformi.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Za stolom — gosti",
        bullets: [
          "QR jelovnik na 35 jezika",
          "Naručivanje bez čekanja konobara",
          "Pozivanje konobara ili traženje računa",
          "Rezervacija stola 24/7",
          "Jedinstveni QR kod za svaki stol",
          "Bez aplikacije za goste — otvara se u pregledniku",
          "Oznake alergena i dijeta za filtriranje",
        ],
      },
      {
        Icon: ChefHat,
        tag: "U kuhinji",
        bullets: [
          "Narudžbe se odmah pojavljuju na ekranu",
          "Stupci u pripremi / gotovo / posluženo",
          "Alergeni i napomene istaknuti",
          "Tablet ili telefon — bez papirnatih računa",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Upravljanje",
        bullets: [
          "Izmjene jelovnika i cijena odmah uživo",
          "AI prijevod jednim klikom",
          "Analitika prodaje i izvješća",
          "Više restorana na jednom računu",
          "UI digitalizira vaš papirnati jelovnik u 60 sekundi",
          "Vlastita domena sa SSL-om",
        ],
      },
    ],
  },
};
