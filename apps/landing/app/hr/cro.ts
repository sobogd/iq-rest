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
    verticals: ["Restorani","Kafići","Barovi","Pizzerije"],
    title: "Vaš restoran, digitalno",
    titleAccent: "za 5 min",
    sub: "Digitalni jelovnik, kuhinjski ekran i rezervacije 24/7 — sve za restoran, spremno za 5 minuta.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restorani" },
      { icon: "cafe", label: "Kafići" },
      { icon: "bar", label: "Barovi" },
      { icon: "pizza", label: "Pizzerije" },
    ],
    title: "Sve što vašem",
    titleAccent: "restoranu treba!",
    sub: "Postavite procese za 10 minuta: pokrenite online meni, optimizirajte kuhinju i pratite popunjenost stolova.",
    primaryLabel: "Počnite besplatno",
    demoLabel: "Pogledajte demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet s kuhinjskim zaslonom: narudžbe po stolovima u stupcima sa statusima" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet s kalendarom rezervacija: mjesečni prikaz i rezervacije koje čekaju potvrdu" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon s početnom stranicom web-stranice restorana: fotografija, rezervacije i online meni" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon sa stranicom jela: fotografija, cijena i oznake alergena" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Pokretanje za 10 minuta", sub: "Bez skupe opreme i dugog postavljanja" },
    { Icon: MessagesSquare, title: "Brza podrška", sub: "U chatu odgovaramo u roku od nekoliko sati" },
    { Icon: Globe, title: "Izbor {count} lokala", sub: "Vjeruju nam restorani i kafići u više od 15 zemalja" },
    { Icon: Palette, title: "100 % vaš brend", sub: "Dizajn i sučelje prilagođavamo stilu vašeg lokala" },
  ],

  menu: {
    heading: "Web-stranica i digitalni meni",
    sub: {
      link: "Više od QR menija!",
      rest: " Dobijte potpunu web-stranicu s jedinstvenim dizajnom, kontaktima i rezervacijom stolova.",
    },
    moreLabel: "Saznajte više",
    mockupAlt: "Dva telefona: početna stranica web-stranice restorana i stranica jela",
    bullets: [
      { Icon: Languages, title: "Automatski prijevod na 35 jezika", sub: "Poslužujte strane goste bez jezične barijere — automatski prijevod sve odrađuje sam" },
      { Icon: ClipboardList, title: "Narudžbe izravno sa stola", sub: "Pojednostavite uslugu: primajte narudžbe sa stolova brzo i bez konobara" },
      { Icon: WheatOff, title: "Alergeni i prehrana", sub: "Označite alergene i preferencije (vegansko, ljuto) kako bi gosti birali lako i sigurno" },
    ],
  },

  reservations: {
    heading: "Rezervacija stolova",
    sub: {
      link: "Pametna rezervacija stolova!",
      rest: " Automatski sustav rezervacija koji sam prati slobodne stolove i vaš raspored.",
    },
    moreLabel: "Saznajte više",
    mockupAlt: "Tablet s kalendarom rezervacija: stolovi po danima i terminima",
    bullets: [
      { Icon: CalendarCheck, title: "Pregledna karta rezervacija", sub: "Zoran raspored po danima i stolovima — slobodna mjesta vide se odmah" },
      { Icon: SlidersHorizontal, title: "Fleksibilne postavke", sub: "Postavite radno vrijeme, trajanje termina, fotografije stolova i prikupljajte želje gostiju" },
      { Icon: Users, title: "Kontrola protoka gostiju", sub: "Odaberite način rada s rezervacijama i imajte potpunu kontrolu nad protokom gostiju" },
    ],
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
