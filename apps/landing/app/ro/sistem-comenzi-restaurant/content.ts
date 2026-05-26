import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ro",
  slug: "sistem-comenzi-restaurant",
  trackPrefix: "l_ro_orders",

  meta: {
    title: "Sistem de comenzi pentru restaurant — oaspete și ospătar | IQ Rest",
    description:
      "Comenzi de restaurant de pe telefon sau tabletă: plan sală, împărțire notă, statusuri, opțiuni și note. Oaspeții comandă la masă; ospătarul preia comenzi de pe orice dispozitiv. 14 zile gratuit.",
    canonical: "https://iq-rest.com/ro/sistem-comenzi-restaurant",
    ogLocale: "ro_RO",
    ogTitle: "Sistem de comenzi pentru restaurant — oaspete și ospătar",
    ogDescription:
      "Oaspete la masă sau ospătar pe telefon — comanda ajunge imediat în bucătărie. Plan sală, împărțire notă, statusuri, opțiuni și note.",
    brandLine: "IQ Rest — Sistem de comenzi pentru restaurant",
  },

  hero: {
    headline: "Preluare comenzi: oaspete și ospătar — direct în bucătărie.",
    cta: "Configurează comenzile online",
    sub: "Oaspeții comandă prin meniul QR la masă sau ospătarul preia comanda de pe telefon sau tabletă — comanda ajunge pe display-ul bucătăriei în câteva secunde. Plan sală cu mese colorate, împărțire notă, opțiuni flexibile și comentarii. Fără carnețele, fără drumuri la bar.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Ospătar preia o comandă la masă de pe un smartphone — comanda ajunge pe display-ul bucătăriei",
  },

  scan: {
    heading: "Configurați sistemul de comenzi",
    headingAccent: "în 5 minute.",
    sub: "Încărcați un meniu pe hârtie sau PDF — AI recunoaște preparatele, prețurile și categoriile. Conectați o tabletă în sală și începeți să preluați comenzi la mese.",
    cta: "Scanează meniu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Listă și plan sală",
      heading: "Listă comenzi alături de planul sălii.",
      body: "Toate comenzile active în dreapta: status, total, timp, număr de articole. În stânga — planul sălii: mesele colorate în funcție de status — liberă, ocupată, necesită atenție. Atingeți o masă pentru a deschide sau crea o comandă; atingeți un card pentru a deschide vizualizarea detaliată. Fără schimbare de ecrane.",
      bullets: [
        "Plan sală: mesele colorate după statusul comenzii.",
        "Lista de comenzi alături — total, timp, număr de articole.",
        "Atingeți o masă pentru a deschide sau crea o comandă.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tabletă la stația ospătarului: lista de comenzi și plan sală cu mese colorate" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Card comandă",
      heading: "Card comandă: statusuri, duplicare, ștergere — o atingere.",
      body: "Fiecare articol are propriul status (În așteptare / În pregătire / Gata / Servit) — bucătăria și ospătarul văd aceeași imagine în timp real. Atingerea punctului deschide meniul de acțiuni: schimbare status, duplicare articol cu aceleași modificatori și opțiuni, ștergere. Totul în interiorul cardului.",
      bullets: [
        "Status per articol: În așteptare / În pregătire / Gata / Servit.",
        "Duplicați un articol cu o atingere cu aceleași opțiuni.",
        "Ștergeți un articol direct din card.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tabletă cu cardul detaliat al comenzii: statusuri articole, acțiuni de duplicare și ștergere" },
    },
    {
      icon: Receipt,
      eyebrow: "Împărțire notă",
      heading: "Împărțiți nota când oaspeții plătesc separat.",
      body: "Oaspeții au decis să împartă — bifați articolele care trec pe o nouă chitanță; restul rămân pe cea actuală. Sistemul arată imediat ambele totaluri. O atingere pe „Împarte comanda“ și aveți două comenzi independente cu totaluri corecte, ambele încă legate de mesele lor.",
      bullets: [
        "Alegeți articolele pentru împărțire cu casete de selectare.",
        "Ambele totaluri sunt afișate imediat.",
        "O atingere și comanda este împărțită fără calcule manuale.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tabletă pe o masă de restaurant: fereastră de împărțire a notei între oaspeți" },
    },
    {
      icon: Smartphone,
      eyebrow: "Adăugare de pe telefon",
      heading: "Adăugați articole de pe telefon — în trei acțiuni.",
      body: "Ospătarul nu este legat de un singur dispozitiv: deschide preluarea de comenzi pe telefonul său și adaugă un articol în trei pași — categorie, preparat, opțiuni (mărime, grad de gătire, sos sau ingredient suplimentar). Prețul este recalculat automat. Nota pentru bucătărie vine în ultimul pas.",
      bullets: [
        "Trei pași: categorie → preparat → opțiuni.",
        "Opțiuni (mărime, suplimente, extra) cu preț cu un click.",
        "Câmp de notă în ultimul pas.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Patru telefoane cu pașii de adăugare a unui articol de comandă: categorie, preparat, mărime, comentariu" },
    },
  ],

  faq: {
    sub: "Ce întreabă restauratorii despre preluarea comenzilor în IQ Rest. Nu găsiți întrebarea dumneavoastră? Scrieți-ne pe WhatsApp.",
    items: [
      { q: "Pot lucra mai mulți ospătari simultan de pe dispozitive diferite?", a: "Da. Fiecare ospătar se autentifică în contul comun al restaurantului de pe propriul telefon sau tabletă — toți văd aceleași mese, comenzi și statusuri în timp real. Modificările unui ospătar apar imediat la ceilalți, fără conflicte sau blocaje." },
      { q: "Pot ospătarii folosi propriile dispozitive (BYOD)?", a: "Da. Este o aplicație web în browser — nimic de instalat. Ospătarul deschide un link, se autentifică în contul restaurantului de pe iPhone, Android sau tabletă personală și începe să lucreze. La sfârșitul turei pur și simplu se deconectează." },
      { q: "Se pot adăuga opțiuni obligatorii la preparate (mărime, grad de gătire etc.)?", a: "Da. Fiecare preparat poate avea orice număr de grupuri de opțiuni — obligatorii (de exemplu „Mărime“: Mic / Mediu / Mare) și opționale („Grad de gătire“: în sânge / mediu / bine făcut). Opțiunile pot modifica prețul (+1,00 €). Dacă un grup este obligatoriu, sistemul nu va permite oaspetelui sau ospătarului să adauge preparatul fără o alegere." },
      { q: "Pot oaspeții să adauge note sau extra la un preparat (pâine, sos)?", a: "Da. Ultimul pas de adăugare are un câmp pentru notă liberă („fără ceapă“, „bine făcut“, „alergie la nuci“). Extra sunt modificatori separați cu preț („+ sos BBQ +1,50 €“, „+ Pâine +2,00 €“). Notele apar pe display-ul bucătăriei, evidențiate cu culoare." },
      { q: "Există statistici de comenzi?", a: "Da. Secțiunea de analitică afișează: venituri pe zi și oră, nota medie, preparate de top, conversia oaspete → comandă, viteza serviciului (timpul de la În așteptare la Servit). Acest lucru ajută la planificarea turelor, achizițiilor și identificarea preparatelor cu performanțe slabe." },
      { q: "Se pot împărți comenzile sau muta între mese?", a: "Da, ambele scenarii sunt suportate. Pentru a împărți — bifați articolele care trec pe o nouă chitanță (pentru oaspeții care plătesc separat). Pentru a muta — deschideți cardul comenzii, alegeți o nouă masă; toată comanda se mută acolo. Fără calcule manuale, fără părăsirea panoului." },
    ],
  },
};
