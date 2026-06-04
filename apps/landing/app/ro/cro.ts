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
    verticals: ["Restaurante","Cafenele","Baruri","Pizzerii"],
    title: "Restaurantul tău,",
    titleAccent: "complet digital în 5 minute.",
    sub: "Un meniu digital frumos, un ecran de bucătărie și rezervări 24/7 — platforma completă pentru un restaurant modern.",
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

  how: {
    heading: "Gata în 5 minute",
    sub: "Patru pași. Fără instalare, fără configurare tehnică, fără card.",
    steps: [
      { n: "1", t: "Tip și nume", d: "Tipul localului și numele — asta e toată înregistrarea." },
      { n: "2", t: "Conectează-te", d: "E-mail sau Google. Fără card." },
      { n: "3", t: "Adaugă meniul", d: "Scrie-l sau lasă AI-ul să-ți scaneze meniul pe hârtie." },
      { n: "4", t: "Ești live", d: "Meniu, bucătărie și rezervări — gata." },
    ],
  },
};
