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
  locale: "da",
  slug: "digitalt-menu-restaurant",
  trackPrefix: "l_da_digital",
  hideFeatureHeading: true,

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
    headline: "Et digitalt menukort\nder har det hele",
    cta: "Opret digital menu",
    sub: "Billeder, allergener og oversættelse til 35 sprog. Plus bestillinger, WhatsApp og bordbestilling — alt i én IQ Rest.",
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
      eyebrow: "AI-oversættelse",
      heading: "Menu på 35 sprog",
      body: "Én QR, 35 sprog. AI oversætter med kulinarisk kontekst, så hver ret lyder naturligt. Turister bestiller med tryghed.",
      bullets: [
        "35 sprog i dit abonnement",
        "Kulinarisk AI, ikke Google",
        "Skift sprog med ét tryk",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "To gæster læser samme digitale menukort på forskellige sprog på deres egne telefoner" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener",
      heading: "Allergener og diæter på retterne",
      body: "Marker gluten, laktose, nødder, vegansk og glutenfri. Gæsterne filtrerer menuen efter deres diæt og bestiller med lethed.",
      bullets: [
        "14 allergenkategorier",
        "Vegansk og glutenfri-mærker",
        "Gæster filtrerer efter diæt",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gæst filtrerer menuen efter allergener på telefonen, mens ejeren redigerer allergenlisten på en tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Design og brand",
      heading: "Premium-menu på dit domæne",
      body: "Videovelkomstskærm, dit eget design og en kontaktside med kort og sociale medier — på dit eget domæne, ikke en PDF.",
      bullets: [
        "Video og premium-design",
        "Dit domæne med SSL",
        "Kontakt, kort og sociale medier",
      ],
      image: { src: "/landing/feature-design.webp", alt: "To telefoner på et cafébord: hjemmeskærm af menuen med videobaggrund og kontaktside med kort" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestillinger",
      heading: "Onlinebestillinger, nul kommission",
      body: "Gæsterne bestiller fra menuen eller direkte til din WhatsApp — det lander i salen eller køkkenet, med 0% taget af salget.",
      bullets: [
        "Fra menuen eller WhatsApp",
        "Til sal eller køkken, 0%",
        "Slå det til i indstillinger",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "To telefoner på et bord: kurv med bestilling og bekræftelse af afsendt bestilling" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reservationer",
      heading: "Bordbestilling, 24/7",
      body: "Gæsterne booker selv et bord via menuen eller et link, du ser kalenderen pr. bord og bekræfter automatisk eller manuelt.",
      bullets: [
        "Gæster booker selv",
        "Kalender på tværs af borde",
        "Auto- og manuel bekræftelse",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Administration",
      heading: "Styr det hvor som helst fra",
      body: "Administrationspanelet kører i enhver browser — telefon, tablet eller PC. Intet at installere, og en basismenu er live på få minutter.",
      bullets: [
        "Enhver enhed, enhver browser",
        "Intet at installere",
        "Live på få minutter",
      ],
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
