import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "da",
  slug: "bestillingssystem-restaurant",
  trackPrefix: "l_da_orders",

  meta: {
    title: "Bestillingssystem til restaurant — gæst og tjener | IQ Rest",
    description:
      "Restaurantbestillinger fra telefon eller tablet: bordoversigt, opdeling af regning, statusser, valgmuligheder og noter. Gæsterne bestiller ved bordet; tjeneren tager bestillinger fra enhver enhed. 14 dage gratis.",
    canonical: "https://iq-rest.com/da/bestillingssystem-restaurant",
    ogLocale: "da_DK",
    ogTitle: "Bestillingssystem til restaurant — gæst og tjener",
    ogDescription:
      "Gæst ved bordet eller tjener på telefonen — bestillingen lander straks i køkkenet. Bordoversigt, opdeling af regning, statusser, valgmuligheder og noter.",
    brandLine: "IQ Rest — Bestillingssystem til restaurant",
  },

  hero: {
    headline: "Bestillingsmodtagelse: gæst og tjener — direkte til køkkenet.",
    cta: "Opsæt onlinebestilling",
    sub: "Gæsterne bestiller gennem QR-menuen ved bordet, eller tjeneren tager bestillingen fra en telefon eller tablet — bestillingen lander på køkkenskærmen på få sekunder. Bordoversigt med farvekodede borde, opdeling af regning, fleksible valgmuligheder og kommentarer. Ingen blokke, ingen ture til baren.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Tjener tager en bestilling ved bordet fra en smartphone — bestillingen lander på køkkenskærmen",
  },

  scan: {
    heading: "Opsæt bestillingssystemet",
    headingAccent: "på 5 minutter.",
    sub: "Upload et papirmenukort eller en PDF — AI'en genkender retter, priser og kategorier. Tilslut en tablet i restauranten og begynd at tage bestillinger ved bordene.",
    cta: "Scan menukortet",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Liste og bordoversigt",
      heading: "Bestillingsliste ved siden af bordoversigten.",
      body: "Alle aktive bestillinger til højre: status, total, tid, antal varer. Til venstre — bordoversigten: borde farvet efter status — ledigt, optaget, kræver opmærksomhed. Tryk på et bord for at åbne eller oprette en bestilling; tryk på et kort for at åbne detaljevisningen. Ingen skift mellem skærme.",
      bullets: [
        "Bordoversigt: borde farvekodede efter bestillingens status.",
        "Bestillingsliste ved siden af — total, tid, antal varer.",
        "Tryk på et bord for at åbne eller oprette en bestilling.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet ved tjenerstationen: bestillingsliste og bordoversigt med farvekodede borde" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Bestillingskort",
      heading: "Bestillingskort: statusser, dubler, slet — ét tryk.",
      body: "Hver vare har sin egen status (Afventer / Tilberedes / Klar / Serveret) — køkken og tjener ser det samme billede i realtid. Tryk på prikken åbner handlingsmenuen: skift status, dubler varen med samme modifikatorer og valgmuligheder, slet. Alt inden i kortet.",
      bullets: [
        "Status pr. vare: Afventer / Tilberedes / Klar / Serveret.",
        "Dubler en vare med ét tryk og samme valgmuligheder.",
        "Slet en vare direkte fra kortet.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet med bestillingsdetalje-kortet: varestatusser, handlinger til at duplikere og slette" },
    },
    {
      icon: Receipt,
      eyebrow: "Opdel regningen",
      heading: "Opdel regningen, når gæsterne betaler hver for sig.",
      body: "Gæsterne har besluttet at opdele — markér de varer, der flyttes til en ny bon; resten bliver på den nuværende. Systemet viser straks begge totaler. Ét tryk på „Opdel bestilling“, og du har to uafhængige bestillinger med korrekte totaler, begge stadig knyttet til deres borde.",
      bullets: [
        "Vælg varer at opdele med afkrydsningsfelter.",
        "Begge totaler vises straks.",
        "Ét tryk og bestillingen er opdelt uden manuel regning.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet på et restaurantbord: opdelings-modal mellem gæster" },
    },
    {
      icon: Smartphone,
      eyebrow: "Mobil tilføjelse",
      heading: "Tilføj varer fra en telefon — i tre handlinger.",
      body: "Tjeneren er ikke bundet til én enhed: åbn bestillingsmodtagelsen på telefonen og tilføj en vare i tre trin — kategori, ret, valgmuligheder (størrelse, stegning, ekstra sauce eller ingrediens). Prisen genberegnes automatisk. Noten til køkkenet kommer i det sidste trin.",
      bullets: [
        "Tre trin: kategori → ret → valgmuligheder.",
        "Valgmuligheder (størrelse, tilvalg, ekstra) prissat med ét klik.",
        "Notefelt i det sidste trin.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Fire telefoner med trinene til at tilføje en vare til bestillingen: kategori, ret, størrelse, kommentar" },
    },
  ],

  faq: {
    sub: "Hvad restauratører spørger om bestillingsmodtagelse i IQ Rest. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp.",
    items: [
      { q: "Kan flere tjenere arbejde samtidig fra forskellige enheder?", a: "Ja. Hver tjener logger ind på den fælles restaurantkonto fra sin egen telefon eller tablet — alle ser de samme borde, bestillinger og statusser i realtid. Ændringer foretaget af én tjener vises straks for de andre, uden konflikter eller låse." },
      { q: "Kan tjenere bruge deres personlige enheder (BYOD)?", a: "Ja. Det er en webapp i browseren — intet at installere. Tjeneren åbner et link, logger ind på restaurantkontoen fra sin iPhone, Android eller personlige tablet og begynder at arbejde. Ved skiftets afslutning logger han eller hun ud." },
      { q: "Kan der tilføjes obligatoriske valgmuligheder til retter (størrelse, stegning osv.)?", a: "Ja. Hver ret kan have et hvilket som helst antal valggrupper — obligatoriske (f.eks. „Størrelse“: Lille / Medium / Stor) og valgfri („Stegning“: rare / medium / well done). Valgmuligheder kan ændre prisen (+1,00 €). Hvis en gruppe er obligatorisk, lader systemet ikke gæsten eller tjeneren tilføje retten uden valg." },
      { q: "Kan gæsterne tilføje noter eller ekstra til en ret (brød, sauce)?", a: "Ja. Sidste trin i tilføjelsen har et frit notefelt („uden løg“, „well done“, „allergisk over for nødder“). Ekstra er separate prissatte modifikatorer („+ BBQ-sauce +1,50 €“, „+ Brød +2,00 €“). Noter vises på køkkenskærmen, fremhævet med farver." },
      { q: "Er der bestillingsstatistik?", a: "Ja. Analyseafsnittet viser: omsætning pr. dag og time, gennemsnitlig regning, bedst sælgende retter, gæst → bestilling-konvertering, servicehastighed (tid fra Afventer til Serveret). Det hjælper med at planlægge vagter, indkøb og spotte underperformerende retter." },
      { q: "Kan bestillinger opdeles eller flyttes mellem borde?", a: "Ja, begge scenarier understøttes. For at opdele — markér varer, der flyttes til en ny bon (for gæster, der betaler hver for sig). For at flytte — åbn bestillingskortet, vælg et nyt bord; hele bestillingen flyttes dertil. Ingen manuel regning, ingen forlader panelet." },
    ],
  },
};
