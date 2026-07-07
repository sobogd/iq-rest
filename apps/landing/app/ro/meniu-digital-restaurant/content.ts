import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ro",
  slug: "meniu-digital-restaurant",
  trackPrefix: "l_ro_digital",
  featureHeading: {
    heading: "Mai mult decât un meniu",
    sub: "Tot ce transformă un meniu QR într-un serviciu pentru salonul și bucătăria ta.",
  },

  meta: {
    title: "Meniu digital pentru restaurante | IQ Rest",
    description:
      "Meniu digital pentru restaurante: meniu online cu fotografii, alergeni, traducere AI și actualizări de prețuri în timp real. 14 zile gratuit, fără card.",
    canonical: "https://iq-rest.com/ro/meniu-digital-restaurant",
    ogLocale: "ro_RO",
    ogTitle: "Meniu digital pentru restaurante",
    ogDescription:
      "Versiune online a meniului dumneavoastră pe hârtie — fotografii, alergeni, traducere AI, actualizări în timp real.",
    brandLine: "IQ Rest — Meniu digital pentru restaurante",
  },

  hero: {
    headline: "Meniu digital\ncare are tot",
    cta: "Creează meniul digital",
    sub: "Poze, alergeni și traducere în 35 de limbi. Plus comenzi, WhatsApp și rezervări la masă — totul într-un singur IQ Rest.",
  },

  scan: {
    heading: "Aveți un meniu pe hârtie sau PDF?",
    headingAccent: "AI îl digitalizează în 60 de secunde.",
    sub: "Încărcați o fotografie sau un document — AI recunoaște categoriile, preparatele și prețurile automat.",
    cta: "Scanează meniu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Traducere AI",
      heading: "Meniu în 35 de limbi",
      body: "Un QR, 35 de limbi. AI traduce cu context culinar, așa că fiecare preparat sună natural. Turiștii comandă cu încredere.",
      bullets: [
        "35 de limbi în abonament",
        "AI culinar, nu Google",
        "Schimbi limba dintr-o atingere",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Doi oaspeți citesc același meniu digital în limbi diferite pe telefoanele lor" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Alergeni și diete pe preparate",
      body: "Marcați gluten, lactoză, nuci, vegan și fără gluten. Oaspeții filtrează meniul după dieta lor și comandă ușor.",
      bullets: [
        "14 categorii de alergeni",
        "Etichete vegan și fără gluten",
        "Oaspeții filtrează după dietă",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Oaspete filtrează meniul după alergeni pe telefon în timp ce proprietarul editează lista de alergeni pe o tabletă" },
    },
    {
      icon: Palette,
      eyebrow: "Design și brand",
      heading: "Meniu premium pe domeniul tău",
      body: "Ecran video de bun venit, designul tău propriu și o pagină de contact cu hartă și social — pe domeniul tău, nu un PDF.",
      bullets: [
        "Video și design premium",
        "Domeniul tău cu SSL",
        "Contacte, hartă și social",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Două telefoane pe o masă de cafenea: ecranul de pornire al meniului cu fundal video și pagina de contact cu hartă" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comenzi",
      heading: "Comenzi online, zero comision",
      body: "Oaspeții comandă din meniu sau direct pe WhatsApp-ul tău — ajunge în sală sau bucătărie, cu 0% luat din vânzări.",
      bullets: [
        "Din meniu sau WhatsApp",
        "În sală sau bucătărie, 0%",
        "Îl activezi din setări",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Două telefoane pe o masă: coș cu comandă și confirmare a trimiterii comenzii" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervări",
      heading: "Rezervări la masă, 24/7",
      body: "Oaspeții rezervă singuri o masă din meniu sau un link, tu vezi calendarul pe mese și confirmi auto sau manual.",
      bullets: [
        "Oaspeții rezervă singuri",
        "Calendar pe mese",
        "Confirmare auto și manuală",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Administrare",
      heading: "Gestionezi de oriunde",
      body: "Panoul de administrare rulează în orice browser — telefon, tabletă sau PC. Nu instalezi nimic, iar un meniu de bază pornește în minute.",
      bullets: [
        "Orice dispozitiv, orice browser",
        "Nu instalezi nimic",
        "Pornești în minute",
      ],
    },
  ],

  faq: {
    sub: "Ce întreabă restauratorii despre meniul digital în IQ Rest. Nu găsiți întrebarea dumneavoastră? Scrieți-ne pe WhatsApp.",
    items: [
      { q: "Am nevoie de abilități tehnice sau experiență CMS?", a: "Nu, abilități speciale nu sunt necesare. Fiecare acțiune în panoul de administrare se face prin click și tragere — fără cod. Adăugarea unui articol în meniu durează câteva secunde: nume, preț, fotografie. Configurarea completă a unui meniu durează de obicei între 30 de minute și o oră." },
      { q: "Ce este meniul digital IQ Rest?", a: "IQ Rest este o platformă cloud pentru restaurante. Meniul digital este versiunea online a meniului dumneavoastră, disponibilă pentru oaspeți prin cod QR sau link direct: fotografii ale preparatelor, prețuri, alergeni, traducere AI în 35 de limbi, actualizări în timp real. Meniul este găzduit pe serverele noastre; nu trebuie să instalați sau să mențineți software — pur și simplu deschideți un browser." },
      { q: "Oaspeții au nevoie de aplicație sau hardware special?", a: "Nu. Oaspeții îndreaptă camera telefonului spre codul QR și meniul se deschide în browser. Panoul de administrare al restaurantului funcționează de asemenea în orice browser modern — telefon, tabletă sau laptop. Codurile QR se tipăresc pe orice imprimantă de birou." },
      { q: "Pot găzdui meniul pe propriul meu domeniu?", a: "Da. Suportăm un domeniu personalizat cu certificat SSL — oaspeții văd meniul la adresa restaurantului dumneavoastră (de exemplu meniu.restaurantuldvs.ro). Vă ajutăm cu configurarea DNS; durează de obicei 5–10 minute." },
      { q: "Pot gestiona mai multe restaurante dintr-un singur cont?", a: "Da, la cerere. Un cont poate găzdui mai multe restaurante: fiecare local cu propriul meniu, design, coduri QR și analitică. Scrieți-ne pe WhatsApp și vom activa modul multi-restaurant pentru grupul dumneavoastră." },
      { q: "Cât de dificilă este configurarea meniului de la zero?", a: "Configurarea constă în trei pași: (1) creați categoriile; (2) adăugați articolele cu nume, prețuri și fotografii; (3) tipăriți codurile QR pentru mese. Dacă aveți deja un meniu pe hârtie sau PDF, încărcați-l — AI va recunoaște categoriile, numele și prețurile și va completa automat cardurile. Un meniu de bază poate fi online în 5 minute; timpul total depinde de numărul de articole." },
      { q: "Ce fel de suport oferiți?", a: "Suntem disponibili pe WhatsApp în timpul programului de lucru și răspundem rapid prin e-mail. Vă ajutăm cu configurarea inițială, configurarea domeniului, designul meniului și orice situație non-standard. Dacă aveți nevoie de o demonstrație sau suport practic la lansare — scrieți-ne." },
    ],
  },
};
