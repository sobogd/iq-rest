import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "da",
  slug: "digitalt-menu-restaurant",
  trackPrefix: "l_da_digital",

  meta: {
    title: "Digitalt menukort til restauranter | IQ Rest",
    description:
      "Digitalt menukort til restauranter: online menukort med billeder, allergener, AI-oversættelse og opdateringer af priser i realtid. 14 dage gratis, intet kort.",
    canonical: "https://iq-rest.com/da/digitalt-menu-restaurant",
    ogLocale: "da_DK",
    ogTitle: "Digitalt menukort til restauranter",
    ogDescription:
      "Onlineversion af dit papirmenukort — billeder, allergener, AI-oversættelse, opdateringer i realtid.",
    brandLine: "IQ Rest — Digitalt menukort til restauranter",
  },

  hero: {
    headline: "Digitalt menukort til restauranter.",
    sub: "Onlineversion af dit papirmenukort med billeder, allergener, beskrivelser og opdateringer af priser i realtid. Gæsterne ser menuen på deres eget sprog; restauranten sparer på tryk.",
    imageSrc: "/landing/hero-digital-menu.webp",
    imageAlt: "Two phones on a wooden restaurant table showing a digital menu with dish photos and prices",
  },

  scan: {
    heading: "Har du et papirmenukort eller en PDF?",
    headingAccent: "AI digitaliserer det på 60 sekunder.",
    sub: "Upload et billede eller dokument — AI'en genkender kategorier, retter og priser automatisk.",
    cta: "Scan menukortet",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI-sprog",
      heading: "35 AI-sprog — hver gæst læser menuen på sit eget.",
      body: "Én QR-kode, 35 sprog. AI'en håndterer den kulinariske kontekst — navne på retter og beskrivelser lyder naturligt. Turister bestiller med større selvtillid, og det gennemsnitlige beløb stiger, uden at en tjener oversætter hver ret.",
      bullets: [
        "35 sprog inkluderet i abonnementet, uden tillæg.",
        "AI med forståelse af kulinarisk kontekst, ikke bare Google Translate.",
        "Gæsten skifter sprog med ét tryk i selve menuen.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "To gæster læser samme digitale menukort på forskellige sprog på deres egne telefoner" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener",
      heading: "Mærker for allergener og kostbehov.",
      body: "Marker retter for gluten, laktose, nødder, skaldyr, veganske og glutenfri muligheder. Gæsterne filtrerer menuen efter deres kostbehov og bestiller med større tillid.",
      bullets: [
        "14 standardkategorier af allergener på hver ret.",
        "Mærker vegansk, vegetarisk og glutenfri med ét klik.",
        "Gæsterne filtrerer menuen efter deres kostbegrænsninger.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gæst filtrerer menuen efter allergener på telefonen, mens ejeren redigerer allergenlisten på en tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Premium design",
      heading: "Premium design med videobaggrund og kontaktside.",
      body: "En video eller et billede på velkomstskærmen, restaurantbeskrivelse, dedikeret kontaktside med kort, telefonnumre og sociale profiler. Det digitale menukort ligner et fuldgyldigt restaurantwebsted, ikke en PDF bag en QR-kode.",
      bullets: [
        "Videobaggrund eller stort billede på velkomstskærmen.",
        "Beskrivelser af restaurant og kategorier — fortæl konceptets historie.",
        "Kontaktside: kort, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "To telefoner på et cafébord: hjemmeskærm af menuen med videobaggrund og kontaktside med kort" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestillinger fra menuen · valgfri",
      heading: "Gæsterne bestiller direkte fra menuen.",
      body: "Gæsterne bygger en kurv i QR-menuen og sender bestillingen — den lander hos tjeneren i serveringen eller på køkkentabletten. Funktionen kan aktiveres eller deaktiveres i indstillingerne når som helst.",
      bullets: [
        "Kurv, kommentarer og bestillingsafsendelse med ét tryk.",
        "Bestillingen lander straks i administrationspanelet, på WhatsApp eller på køkkenskærmen.",
        "Funktionen aktiveres i indstillingerne.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "To telefoner på et bord: kurv med bestilling og bekræftelse af afsendt bestilling" },
    },
  ],

  faq: {
    sub: "Hvad restauratører spørger om det digitale menukort i IQ Rest. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp.",
    items: [
      { q: "Skal jeg have tekniske kundskaber eller CMS-erfaring?", a: "Nej, særlige kundskaber kræves ikke. Hver handling i administrationspanelet er via klik og træk-og-slip — uden kode. Tilføjelse af en ret tager få sekunder: navn, pris, billede. En fuld menuopsætning tager normalt 30 minutter til en time." },
      { q: "Hvad er IQ Rest's digitale menukort?", a: "IQ Rest er en cloud-platform til restauranter. Det digitale menukort er onlineversionen af dit menukort, tilgængelig for gæsterne via QR-kode eller direkte link: billeder af retter, priser, allergener, AI-oversættelse på 35 sprog, opdateringer i realtid. Menukortet hostes på vores servere; du behøver ikke at installere eller vedligeholde software — bare åbn en browser." },
      { q: "Skal gæsterne bruge en app eller specielt hardware?", a: "Nej. Gæsterne retter telefonens kamera mod QR-koden, og menuen åbner i browseren. Restaurantens administrationspanel kører også i enhver moderne browser — telefon, tablet eller computer. QR-koder udskrives på enhver kontorprinter." },
      { q: "Kan jeg hoste menuen på mit eget domæne?", a: "Ja. Vi understøtter et brugerdefineret domæne med SSL-certifikat — gæsterne ser menuen på din restaurants adresse (f.eks. menu.dinrestaurant.dk). Vi hjælper med DNS-opsætning; det tager normalt 5–10 minutter." },
      { q: "Kan jeg administrere flere restauranter fra én konto?", a: "Ja, på forespørgsel. Én konto kan hoste flere restauranter: hvert sted med sit eget menukort, design, QR-koder og analyser. Skriv til os på WhatsApp, og vi aktiverer multi-restaurant-tilstand for din gruppe." },
      { q: "Hvor svært er det at opsætte menukortet fra bunden?", a: "Opsætningen består af tre trin: (1) opret kategorier; (2) tilføj retter med navne, priser og billeder; (3) udskriv QR-koder til bordene. Hvis du allerede har et papirmenukort eller en PDF, så upload det — AI'en genkender kategorier, navne og priser og udfylder kortene automatisk. Et grundlæggende menukort kan være live på 5 minutter; den samlede tid afhænger af antallet af retter." },
      { q: "Hvilken support tilbyder I?", a: "Vi er tilgængelige på WhatsApp i åbningstiden og svarer hurtigt på e-mail. Vi hjælper med den første opsætning, domænekonfiguration, menudesign og enhver ikke-standard situation. Hvis du har brug for en demo eller hands-on-support ved opstart — skriv til os." },
    ],
  },
};
