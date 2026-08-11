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
    verticals: ["Restaurante","Cafenele","Baruri","Pizzerii"],
    title: "Restaurantul tău, digital",
    titleAccent: "în 5 min",
    sub: "Meniu digital, ecran de bucătărie și rezervări 24/7 — tot ce are nevoie restaurantul tău, gata în 5 minute.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurante" },
      { icon: "cafe", label: "Cafenele" },
      { icon: "bar", label: "Baruri" },
      { icon: "pizza", label: "Pizzerii" },
    ],
    title: "Tot ce îi trebuie",
    titleAccent: "restaurantului tău!",
    sub: "Configurează procesele în 10 minute: lansează meniul online, optimizează bucătăria și ține evidența ocupării meselor.",
    primaryLabel: "Începe gratuit",
    demoLabel: "Vezi demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tabletă cu display de bucătărie: comenzi pe mese, în coloane cu statusuri" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tabletă cu calendarul rezervărilor: vedere lunară și rezervări în așteptarea confirmării" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon cu pagina principală a site-ului unui restaurant: fotografie, rezervări și meniu online" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon cu pagina unui preparat: fotografie, preț și etichete de alergeni" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Funcțional în 10 minute", sub: "Fără echipamente scumpe și configurări lungi" },
    { Icon: MessagesSquare, title: "Suport rapid", sub: "Răspundem pe chat în câteva ore" },
    { Icon: Globe, title: "Alegerea a {count} localuri", sub: "Restaurante și cafenele din peste 15 țări au încredere în noi" },
    { Icon: Palette, title: "100% brandul tău", sub: "Adaptăm designul și interfața la stilul localului tău" },
  ],

  menu: {
    heading: "Site web și meniu digital",
    sub: {
      link: "Mai mult decât un meniu QR!",
      rest: " Primești un site complet, cu design unic, pagină de contact și rezervări de mese.",
    },
    moreLabel: "Află mai multe",
    mockupAlt: "Două telefoane: pagina principală a site-ului unui restaurant și pagina unui preparat",
    bullets: [
      { Icon: Languages, title: "Traducere automată în 35 de limbi", sub: "Servește oaspeții străini fără bariere lingvistice — traducerea automată face totul" },
      { Icon: ClipboardList, title: "Comenzi direct de la masă", sub: "Simplifică serviciul: primește comenzi de la mese rapid și fără ospătar" },
      { Icon: WheatOff, title: "Alergeni și diete", sub: "Marchează alergenii și preferințele (vegan, picant), ca oaspeții să aleagă ușor și în siguranță" },
    ],
  },

  reservations: {
    heading: "Rezervarea meselor",
    sub: {
      link: "Rezervări inteligente de mese!",
      rest: " Un sistem automat de rezervări care urmărește singur mesele libere și programul tău.",
    },
    moreLabel: "Află mai multe",
    mockupAlt: "Tabletă cu calendarul rezervărilor: mese pe zile și intervale orare",
    bullets: [
      { Icon: CalendarCheck, title: "Hartă clară a rezervărilor", sub: "Un grafic vizual pe zile și mese — locurile libere se văd dintr-o privire" },
      { Icon: SlidersHorizontal, title: "Setări flexibile", sub: "Stabilește programul, durata intervalelor, fotografiile meselor și adună dorințele oaspeților" },
      { Icon: Users, title: "Controlul fluxului de oaspeți", sub: "Alege modul de lucru cu rezervările și păstrează controlul total asupra fluxului de oaspeți" },
    ],
  },

  heroMicrocopy: "{count} restaurante · 14 zile gratis · Fără card",
  seeIncluded: "Vezi ce include",

  trust: [
    { kind: "num", value: 35, label: "Limbi" },
    { kind: "text", value: "24/7", label: "Rezervări" },
    { kind: "num", value: 5, suffix: " min", label: "Pornire" },
    { kind: "count", label: "Restaurante" },
  ],

  bundle: {
    heading: "Tot ce ține restaurantul în mișcare.",
    headingAccent: "Într-o singură aplicație.",
    sub: "Meniu, bucătărie și rezervări într-un singur loc — modern, rapid și gândit pentru cum funcționează cu adevărat restaurantele. Fără suplimente, fără plată per funcție.",
  },

  benefits: [
    { Icon: Languages, tag: "Meniu digital", title: "Un meniu care vinde.", bullets: ["35 de limbi cu AI","Design premium","Prețuri actualizate instant"], image: "/landing/feature-design.webp", imageAlt: "Două telefoane pe o masă de cafenea: ecranul de bun venit al meniului digital și pagina de contact cu hartă" },
    { Icon: ChefHat, tag: "Ecran de bucătărie", title: "Gătește mai repede, fără scăpări.", bullets: ["Live pe ecran","Note și alergeni","Tabletă sau telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tabletă pe bar afișând ecranul de bucătărie cu comenzi pe mese" },
    { Icon: CalendarCheck, tag: "Rezervări", title: "Rezervări pe pilot automat.", bullets: ["Rezervare self-service","Confirmare automată","Calendar pe mese"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Două tablete afișând calendarul de rezervări: vizualizare zilnică pe mese și vizualizare lunară" },
    { Icon: Receipt, tag: "Comenzi la masă", title: "Comenzile direct la bucătărie.", bullets: ["Client sau ospătar","Direct la bucătărie","Pornit/oprit oricând"], image: "/landing/feature-orders-map.webp", imageAlt: "Tabletă cu ecranul de comenzi: lista comenzilor și harta sălii cu mese colorate." },
  ],

  seeDetails: "Vezi detalii",

  extras: {
    heading: "Și tot restul inclus.",
    items: [
      { Icon: ScanLine, label: "AI-ul digitalizează meniul pe hârtie în 60 de secunde" },
      { Icon: QrCode, label: "Un cod QR unic pentru fiecare masă" },
      { Icon: Smartphone, label: "Fără aplicație pentru clienți — se deschide în browser" },
      { Icon: Globe, label: "Propriul tău domeniu cu SSL" },
      { Icon: BarChart3, label: "Analize de vânzări: venituri, preparate de top, ore" },
      { Icon: Palette, label: "Etichete de alergeni și diete pentru filtrare" },
    ],
  },

  midCta: {
    heading: "O aplicație în loc de cinci.",
    sub: "Fără să jonglezi cu instrumente separate pentru meniu, bucătărie și rezervări — totul într-un singur loc, pe orice telefon sau tabletă, fără instalare.",
  },

  platform: {
    hardwareTitle: "Lucrează cu propriul echipament",
    hardwareSub: "Nu te obligăm niciodată să cumperi echipamente de la noi. Folosește telefoanele, tabletele și computerele pe care le ai deja.",
    anywhereTitle: "Funcționează oriunde",
    anywhereSub: "Telefon, tabletă, laptop, PC. Android, iOS, Windows, Mac, Linux. Funcționează în orice browser modern, fără instalare.",
  },

  activities: {
    heading: "Un singur sistem,",
    headingAccent: "tot restaurantul tău.",
    sub: "Servire mai rapidă, o bucătărie mai liniștită, costuri mai mici și o experiență pe care clientul o ține minte — totul într-o singură platformă.",
    groups: [
      {
        Icon: Smartphone,
        tag: "La masă — clienți",
        bullets: [
          "Meniu QR în 35 de limbi",
          "Comandă fără să aștepți ospătarul",
          "Cheamă ospătarul sau cere nota",
          "Rezervare de masă 24/7",
          "Un cod QR unic pentru fiecare masă",
          "Fără aplicație pentru clienți — se deschide în browser",
          "Etichete de alergeni și diete pentru filtrare",
        ],
      },
      {
        Icon: ChefHat,
        tag: "În bucătărie",
        bullets: [
          "Comenzile ajung instant pe ecran",
          "Coloane în pregătire / gata / servit",
          "Alergeni și note evidențiate",
          "Tabletă sau telefon — fără bonuri pe hârtie",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Administrare",
        bullets: [
          "Modificări de meniu și prețuri instant",
          "Traducere cu AI dintr-un clic",
          "Analize de vânzări și rapoarte",
          "Mai multe restaurante într-un singur cont",
          "AI-ul digitalizează meniul pe hârtie în 60 de secunde",
          "Propriul tău domeniu cu SSL",
        ],
      },
    ],
  },
};
