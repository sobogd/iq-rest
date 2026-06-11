import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ro",
  slug: "meniu-digital-restaurant",
  trackPrefix: "l_ro_digital",

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
    headline: "Meniu digital pentru restaurante.",
    cta: "Creează meniul digital",
    sub: "Versiune online a meniului dumneavoastră pe hârtie cu fotografii, alergeni, descrieri și actualizări de prețuri în timp real. Oaspeții văd meniul în propria lor limbă; restaurantul economisește la tipărire.",
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
      heading: "35 limbi AI — fiecare oaspete citește meniul în limba sa.",
      body: "Un singur cod QR, 35 de limbi. AI gestionează contextul culinar — numele preparatelor și descrierile sună natural. Turiștii comandă cu mai multă încredere și nota de plată medie crește fără ca ospătarul să fie nevoit să traducă fiecare preparat.",
      bullets: [
        "35 de limbi incluse în abonament, fără cost suplimentar.",
        "AI cu înțelegere a contextului culinar, nu Google Translate brut.",
        "Oaspetele schimbă limba cu o singură atingere în meniu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Doi oaspeți citesc același meniu digital în limbi diferite pe telefoanele lor" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Etichete pentru alergeni și diete.",
      body: "Marcați preparatele pentru gluten, lactoză, nuci, fructe de mare, opțiuni vegane și fără gluten. Oaspeții filtrează meniul în funcție de nevoile lor alimentare și comandă cu mai multă încredere.",
      bullets: [
        "14 categorii standard de alergeni pe fiecare preparat.",
        "Etichete vegan, vegetarian și fără gluten cu un singur click.",
        "Oaspeții filtrează meniul în funcție de restricțiile lor alimentare.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Oaspete filtrează meniul după alergeni pe telefon în timp ce proprietarul editează lista de alergeni pe o tabletă" },
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Design premium cu fundal video și pagină de contact.",
      body: "Un video sau o fotografie pe ecranul de bun venit, descriere a restaurantului, pagină de contact dedicată cu hartă, numere de telefon și profiluri sociale. Meniul digital arată ca un site complet de restaurant, nu ca un PDF în spatele unui cod QR.",
      bullets: [
        "Fundal video sau fotografie mare pe ecranul de bun venit.",
        "Descrieri ale restaurantului și categoriilor — spuneți povestea conceptului.",
        "Pagină de contact: hartă, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Două telefoane pe o masă de cafenea: ecranul de pornire al meniului cu fundal video și pagina de contact cu hartă" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comenzi din meniu · opțional",
      heading: "Oaspeții plasează comenzi direct din meniu.",
      body: "Oaspeții construiesc un coș în meniul QR și trimit comanda — ajunge la ospătarul din sală sau pe tableta din bucătărie. Funcționalitatea poate fi activată sau dezactivată în setări oricând.",
      bullets: [
        "Coș, comentarii și trimitere comandă cu o singură atingere.",
        "Comanda ajunge imediat în panoul de administrare, pe WhatsApp sau pe display-ul de bucătărie.",
        "Funcționalitate comutabilă în setări.",
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
