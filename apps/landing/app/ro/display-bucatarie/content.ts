import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ro",
  slug: "display-bucatarie",
  trackPrefix: "l_ro_kds",

  meta: {
    title: "Display bucătărie (KDS) pentru restaurante | IQ Rest",
    description:
      "Display bucătărie (KDS) pentru restaurante: comenzile din sală și meniul QR ajung imediat pe ecranul bucătarului. Coloane pe masă, statusuri În așteptare / În pregătire / Gata / Servit, filtre pe zonă. Funcționează pe tabletă sau telefon.",
    canonical: "https://iq-rest.com/ro/display-bucatarie",
    ogLocale: "ro_RO",
    ogTitle: "Display bucătărie (KDS) — Comenzi pe ecranul bucătarului",
    ogDescription:
      "Comenzi din sală pe ecranul bucătarului. Coloane pe masă, statusuri și cronometru. O atingere schimbă statusul.",
    brandLine: "IQ Rest — Display bucătărie",
  },

  hero: {
    headline: "Display bucătărie: comenzi direct pe ecranul bucătarului.",
    sub: "Bonurile de hârtie nu mai sunt necesare. Comenzile din sală sau din meniul QR ajung imediat pe ecranul de bucătărie — cu note, alergeni și cronometru. O atingere schimbă statusul. Funcționează pe o tabletă la pasajul de servire sau pe un smartphone în buzunarul bucătarului.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Bucătărie profesională cu o tabletă pe un suport de alamă afișând display-ul bucătăriei cu comenzi active",
  },

  scan: {
    heading: "Configurați display-ul bucătăriei",
    headingAccent: "în 5 minute.",
    sub: "Încărcați un meniu pe hârtie sau PDF — AI recunoaște preparatele, categoriile și alergenii. Conectați o tabletă în bucătărie și începeți să primiți comenzi.",
    cta: "Scanează meniu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Controale și filtre",
      heading: "Mai multe ecrane pe zonă: bucătărie și bar.",
      body: "Plasați tablete separate la linia caldă, la bar sau la stația de patiserie — fiecare ecran arată doar preparatele care îi aparțin. Filtrele după status (În așteptare / În pregătire / Gata / Servit) și categorie elimină zgomotul: bucătarul vede doar ceea ce este relevant pentru postul său.",
      bullets: [
        "Mai multe ecrane KDS cu filtre pe categorie.",
        "Filtru de status: afișați doar În pregătire și Gata.",
        "Fiecare zonă vede doar propriul flux de comenzi.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tabletă pe un suport de alamă la pasajul de servire al bucătăriei — KDS cu filtru de status" },
    },
    {
      icon: Timer,
      eyebrow: "Carduri și cronometru",
      heading: "O atingere schimbă statusul. Notele și alergenii evidențiați cu culoare.",
      body: "Cardul preparatului arată opțiunile alese (fără ceapă, bine făcut), nota oaspetelui, alergenii și un cronometru de la momentul plasării comenzii. Atingeți cardul și statusul trece la următorul: În așteptare → În pregătire → Gata → Servit. Lista este sortată după prioritate automat.",
      bullets: [
        "Atingere pe card — schimbare instantanee a statusului.",
        "Opțiuni, note și alergeni evidențiați cu culoare.",
        "Sortare după prioritate: articolele care așteaptă mai mult timp urcă în sus.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tabletă pe un suport de alamă pe tejghea de bar — KDS cu carduri de comenzi pe masă" },
    },
  ],

  faq: {
    sub: "Ce întreabă restauratorii despre display-ul de bucătărie în IQ Rest. Nu găsiți întrebarea dumneavoastră? Scrieți-ne pe WhatsApp.",
    items: [
      { q: "Ce statusuri ale preparatelor există în bucătărie?", a: "Patru statusuri cu culori diferite de card: În așteptare (gri) — comanda a fost acceptată și așteaptă; În pregătire (portocaliu) — preparatul se pregătește; Gata (albastru) — gata pentru servire; Servit (verde) — livrat oaspetelui. Atingerea cardului îl mută la următorul status, fără meniuri sau confirmări." },
      { q: "Pot rula mai multe ecrane KDS în zone diferite?", a: "Da. O tabletă la linia caldă, alta la bar, a treia la patiserie — fiecare cu propriul filtru de categorie. Toate ecranele sunt sincronizate în timp real: un status schimbat pe un ecran se actualizează peste tot." },
      { q: "Ce hardware am nevoie pentru a rula KDS?", a: "KDS este o aplicație web care rulează în orice browser modern. Bucătărie mare — o tabletă pe un suport de alamă la pasajul de servire sau un TV pe perete. Local mic — smartphone-ul bucătarului. Fără hardware special, fără instalare: deschideți un link și autentificați-vă în cont." },
      { q: "De unde vin comenzile pe ecranul bucătăriei?", a: "Din toate sursele: oaspetele care a comandat prin meniul QR la masă; ospătarul care a preluat comanda de pe telefon; oaspetele care a plasat comanda de pe site. Toate ajung pe KDS cu eticheta sursei și numărul mesei. Fără transferuri manuale de la POS." },
      { q: "Ce este afișat pe un card de comandă?", a: "Numele preparatului, modificatorii selectați (fără ceapă, bine făcut, adaugă sos), comentariul oaspetelui, alergenii evidențiați, statusul (În așteptare / În pregătire / Gata / Servit) și un cronometru care arată cât timp așteaptă preparatul. Cardurile sunt sortate după prioritate: cu cât așteptarea este mai lungă, cu atât mai sus în coloană." },
      { q: "Pot filtra cardurile pe ecran?", a: "Da. Două filtre: după status (de exemplu afișați doar În așteptare și În pregătire, ascundeți Servit) și după categorie (doar băuturi la bar, doar feluri principale în bucătărie). Setările sunt salvate pe dispozitiv — fiecare zonă păstrează propriul set." },
    ],
  },
};
