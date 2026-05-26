import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "da",
  slug: "kokken-skaerm",
  trackPrefix: "l_da_kds",

  meta: {
    title: "Køkkenskærm (KDS) til restauranter | IQ Rest",
    description:
      "Køkkenskærm (KDS) til restauranter: bestillinger fra serveringen og QR-menuen lander straks på kokkens skærm. Kolonner pr. bord, statusser Afventer / Tilberedes / Klar / Serveret, filtre pr. zone. Kører på tablet eller telefon.",
    canonical: "https://iq-rest.com/da/kokken-skaerm",
    ogLocale: "da_DK",
    ogTitle: "Køkkenskærm (KDS) — Bestillinger på kokkens skærm",
    ogDescription:
      "Bestillinger fra serveringen på kokkens skærm. Kolonner pr. bord, statusser og timer. Ét tryk ændrer status.",
    brandLine: "IQ Rest — Køkkenskærm",
  },

  hero: {
    headline: "Køkkenskærm: bestillinger direkte til kokkens skærm.",
    cta: "Opsæt køkkenskærm",
    sub: "Papirbon er ikke længere nødvendig. Bestillinger fra serveringen eller QR-menuen lander straks på køkkenskærmen — med noter, allergener og timer. Ét tryk ændrer status. Fungerer på en tablet ved passet eller en smartphone i kokkens lomme.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Professionelt køkken med en tablet på en messingstander, der viser køkkenskærmen med aktive bestillinger",
  },

  scan: {
    heading: "Opsæt køkkenskærmen",
    headingAccent: "på 5 minutter.",
    sub: "Upload et papirmenukort eller en PDF — AI'en genkender retter, kategorier og allergener. Tilslut en tablet i køkkenet og begynd at modtage bestillinger.",
    cta: "Scan menukortet",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Kontroller og filtre",
      heading: "Flere skærme pr. zone: køkken og bar.",
      body: "Placér separate tablets ved den varme linje, i baren eller ved konditoriet — hver skærm viser kun de retter, der hører til den. Filtre efter status (Afventer / Tilberedes / Klar / Serveret) og kategori fjerner støjen: kokken ser kun det, der er relevant for hans station.",
      bullets: [
        "Flere KDS-skærme med kategorifiltre.",
        "Statusfilter: vis kun Tilberedes og Klar.",
        "Hver zone ser kun sit eget flow af bestillinger.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet på en messingstander ved køkkenets pass — KDS med statusfilter" },
    },
    {
      icon: Timer,
      eyebrow: "Kort og timer",
      heading: "Ét tryk ændrer status. Noter og allergener fremhævet med farver.",
      body: "Rettens kort viser de valgte muligheder (uden løg, well done), gæstens note, allergener og en timer fra det øjeblik, bestillingen blev oprettet. Tryk på kortet, og status går videre: Afventer → Tilberedes → Klar → Serveret. Listen sorteres automatisk efter prioritet.",
      bullets: [
        "Tryk på kortet — øjeblikkelig statusændring.",
        "Valgmuligheder, noter og allergener fremhævet med farver.",
        "Prioritetssortering: varer, der venter længere, stiger til toppen.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet på en messingstander på bardisken — KDS med bestillingskort pr. bord" },
    },
  ],

  faq: {
    sub: "Hvad restauratører spørger om køkkenskærmen i IQ Rest. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp.",
    items: [
      { q: "Hvilke retstatusser er der i køkkenet?", a: "Fire statusser med forskellige kortfarver: Afventer (grå) — bestillingen er modtaget og venter; Tilberedes (orange) — retten er under tilberedning; Klar (blå) — klar til servering; Serveret (grøn) — leveret til gæsten. Tryk på kortet flytter det til næste status, uden menuer eller bekræftelser." },
      { q: "Kan jeg køre flere KDS-skærme i forskellige zoner?", a: "Ja. En tablet på den varme linje, en anden i baren, en tredje i konditoriet — hver med sit eget kategorifilter. Alle skærme er synkroniseret i realtid: en status, der ændres på én skærm, opdateres alle steder." },
      { q: "Hvilken hardware har jeg brug for til at køre KDS?", a: "KDS er en webapp, der kører i enhver moderne browser. Stort køkken — en tablet på en messingstander ved passet eller et tv på væggen. Lille sted — kokkens smartphone. Ingen særlig hardware, ingen installation: åbn et link og log ind på kontoen." },
      { q: "Hvor kommer bestillingerne på køkkenskærmen fra?", a: "Fra alle kilder: gæsten, der bestilte via QR-menuen ved bordet; tjeneren, der tog bestillingen fra sin telefon; gæsten, der afgav bestillingen fra hjemmesiden. Alle ankommer til KDS med kildemærke og bordnummer. Ingen manuelle overførsler fra et POS." },
      { q: "Hvad vises på et bestillingskort?", a: "Rettens navn, valgte modifikatorer (uden løg, well done, tilføj sauce), gæstens kommentar, fremhævede allergener, status (Afventer / Tilberedes / Klar / Serveret) og en timer, der viser, hvor længe retten har ventet. Kortene er sorteret efter prioritet: jo længere ventetid, jo højere i kolonnen." },
      { q: "Kan jeg filtrere kortene på skærmen?", a: "Ja. To filtre: efter status (f.eks. vis kun Afventer og Tilberedes, skjul Serveret) og efter kategori (kun drikkevarer i baren, kun hovedretter i køkkenet). Indstillingerne gemmes pr. enhed — hver zone har sit eget sæt." },
    ],
  },
};
