import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ro",
  slug: "meniu-digital-restaurant",
  trackPrefix: "l_ro_digital",
  hideFeatureHeading: true,

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
      eyebrow: "35 limbi AI",
      heading: "35 de limbi pentru orice oaspete",
      body: "Un QR, 35 de limbi. AI traduce cu context culinar, așa că fiecare preparat sună natural. Turiștii comandă fără ezitare.",
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
      heading: "Alergeni și diete pe fiecare preparat",
      body: "Marcați gluten, lactoză, nuci, vegan și fără gluten. Oaspeții filtrează meniul după dieta lor și comandă ușor.",
      bullets: [
        "14 categorii de alergeni",
        "Etichete vegan și fără gluten",
        "Oaspeții filtrează după dietă",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Oaspete filtrează meniul după alergeni pe telefon în timp ce proprietarul editează lista de alergeni pe o tabletă" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Orice dispozitiv",
      heading: "Gestionați de pe orice dispozitiv",
      body: "Panoul de administrare rulează în browser — editați meniul, prețurile și pozele de oriunde. Nu instalați nimic.",
      bullets: [
        "Rulează în orice browser",
        "Telefon, tabletă sau PC",
        "Nu instalați nimic",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Fără comision",
      heading: "Zero comision, fără extra",
      body: "Un singur abonament transparent. Nu luăm parte din încasări și nu ascundem taxe — totul rămâne la restaurant.",
      bullets: [
        "Zero la sută pe comenzi",
        "Fără extra ascunse",
        "Un singur preț fix",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Domeniu propriu",
      heading: "Meniul pe domeniul tău",
      body: "Conectăm domeniul tău cu SSL — oaspeții văd meniul la adresa restaurantului tău. Ajutăm cu DNS în 10 minute.",
      bullets: [
        "Domeniul tău cu SSL",
        "menu.restaurantultau.com",
        "Ajutăm la configurarea DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Designul tău",
      heading: "Design flexibil pe gustul tău",
      body: "Câteva șabloane și stiluri gata făcute — alegeți coperta, culorile și prezentarea preparatelor potrivite localului.",
      bullets: [
        "Câteva șabloane gata făcute",
        "Coperta și culorile tale",
        "Restilizezi din câteva clicuri",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Contacte",
      heading: "Contacte și social în meniu",
      body: "O pagină dedicată cu hartă, telefon și linkuri către Instagram și WhatsApp — oaspeții te găsesc dintr-o atingere.",
      bullets: [
        "Hartă, telefon și adresă",
        "Instagram și WhatsApp",
        "Te contactează dintr-o atingere",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Comenzi WhatsApp",
      heading: "Primiți comenzi prin WhatsApp",
      body: "Oaspeții fac un coș și trimit comanda direct pe WhatsApp-ul tău — fără aplicație separată, în chatul pe care îl folosesc deja.",
      bullets: [
        "Comanda pe WhatsApp-ul tău",
        "Fără aplicație separată",
        "Chat ca de obicei",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervări",
      heading: "Rezervări la masă fără apeluri",
      body: "Oaspeții rezervă singuri o masă din meniu sau un link, tu vezi calendarul pe mese și confirmi auto sau manual.",
      bullets: [
        "Rezervări 24/7, fără apeluri",
        "Calendar pe mese",
        "Confirmare auto și manuală",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Arată ca un site, nu un PDF",
      body: "Fundal video pe ecranul de bun venit, conceptul descris și o pagină separată de contact cu hartă și social.",
      bullets: [
        "Video pe ecranul principal",
        "Concept și preparate descrise",
        "Pagină separată de contact",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Două telefoane pe o masă de cafenea: ecranul de pornire al meniului cu fundal video și pagina de contact cu hartă" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comenzi · opțional",
      heading: "Comenzi direct din meniu",
      body: "Oaspeții fac un coș și trimit comanda — ajunge în sală, pe WhatsApp sau pe ecranul din bucătărie. Opțional.",
      bullets: [
        "Coș și trimitere dintr-o atingere",
        "În sală, WhatsApp sau bucătărie",
        "Îl activezi din setări",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Două telefoane pe o masă: coș cu comandă și confirmare a trimiterii comenzii" },
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
