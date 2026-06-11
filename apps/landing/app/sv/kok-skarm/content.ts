import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sv",
  slug: "kok-skarm",
  trackPrefix: "l_sv_kds",

  meta: {
    title: "Köksskärm (KDS) för restauranger | IQ Rest",
    description:
      "Köksskärm (KDS) för restauranger: beställningar från salen och QR-menyn landar omedelbart på kockens skärm. Kolumner per bord, statusar Väntar / Tillagas / Klar / Serverad, zonfilter. Fungerar på surfplatta eller telefon.",
    canonical: "https://iq-rest.com/sv/kok-skarm",
    ogLocale: "sv_SE",
    ogTitle: "Köksskärm (KDS) — beställningar på kockens skärm",
    ogDescription:
      "Beställningar från salen på kockens skärm. Kolumner per bord, statusar och timer. Ett tryck ändrar status.",
    brandLine: "IQ Rest — Köksskärm",
  },

  hero: {
    headline: "Köksskärm: beställningar direkt till kockens skärm.",
    cta: "Konfigurera köksdisplay",
    sub: "Pappersnotor behövs inte längre. Beställningar från salen eller QR-menyn landar omedelbart på köksskärmen — med anteckningar, allergener och timer. Ett tryck ändrar status. Fungerar på en surfplatta vid passet eller en smartphone i kockens ficka.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Professionellt kök med en surfplatta på ett mässingsstativ som visar köksskärmen med aktiva beställningar",
  },

  scan: {
    heading: "Ställ in köksskärmen",
    headingAccent: "på 5 minuter.",
    sub: "Ladda upp en pappersmeny eller PDF — AI:n känner igen rätter, kategorier och allergener. Anslut en surfplatta i köket och börja ta emot beställningar.",
    cta: "Skanna meny",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Kontroller och filter",
      heading: "Flera skärmar per zon: kök och bar.",
      body: "Placera separata surfplattor vid hot line, baren eller bakverksstationen — varje skärm visar bara de rätter som tillhör den. Filter efter status (Väntar / Tillagas / Klar / Serverad) och efter kategori tar bort bruset: kocken ser bara det som är relevant för sin station.",
      bullets: [
        "Flera KDS-skärmar med kategorifilter.",
        "Statusfilter: visa bara „tillagas“ och „klar“.",
        "Varje zon ser bara sitt eget beställningsflöde.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Surfplatta på ett mässingsstativ vid köksetsat — KDS med statusfilter" },
    },
    {
      icon: Timer,
      eyebrow: "Kort och timer",
      heading: "Ett tryck ändrar status. Anteckningar och allergener markerade med färg.",
      body: "Rättkortet visar valda alternativ (utan lök, genomstekt), gästens anteckning, allergener och en timer från det ögonblick beställningen lades. Tryck på kortet och status flyttas till nästa: Väntar → Tillagas → Klar → Serverad. Listan sorteras automatiskt efter prioritet.",
      bullets: [
        "Tryck på kortet — omedelbar statusändring.",
        "Alternativ, anteckningar och allergener markerade med färg.",
        "Prioritetssortering: rätter som väntat längre stiger till toppen.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Surfplatta på ett mässingsstativ på bardisken — KDS med beställningskort per bord" },
    },
  ],

  faq: {
    sub: "Vad restauratörer frågar om köksskärmen i IQ Rest. Hittar du inte din fråga? Skriv till oss på WhatsApp.",
    items: [
      { q: "Vilka rättsstatusar har köket?", a: "Fyra statusar med olika kortfärger: Väntar (grå) — beställningen är accepterad och väntar; Tillagas (orange) — rätten förbereds; Klar (blå) — redo att serveras; Serverad (grön) — levererad till gästen. Tryck på kortet flyttar det till nästa status, utan menyer eller bekräftelser." },
      { q: "Kan jag köra flera KDS-skärmar i olika zoner?", a: "Ja. En surfplatta på hot line, en annan på baren, en tredje på bakverksstationen — var och en med sitt eget kategorifilter. Alla skärmar synkroniseras i realtid: en status som ändras på en skärm uppdateras överallt." },
      { q: "Vilken hårdvara behöver jag för att köra KDS?", a: "KDS är en webbapp som körs i vilken modern webbläsare som helst. Ett stort kök — en surfplatta på ett mässingsstativ vid passet eller en TV på väggen. Ett litet ställe — kockens smartphone. Ingen särskild hårdvara, ingen installation: öppna en länk och logga in på kontot." },
      { q: "Var kommer beställningarna på köksskärmen ifrån?", a: "Från alla källor: gästen som beställde via QR-menyn vid bordet; servitören som tog beställningen från sin telefon; gästen som lade beställningen från webbplatsen. Alla kommer fram på KDS med en källetikett och bordsnumret. Inga manuella överföringar från ett POS." },
      { q: "Vad visas på ett beställningskort?", a: "Rättens namn, valda modifierare (utan lök, genomstekt, lägg till sås), gästens kommentar, markerade allergener, status (Väntar / Tillagas / Klar / Serverad) och en timer som visar hur länge rätten har väntat. Kort sorteras efter prioritet: ju längre väntetid, desto högre i kolumnen." },
      { q: "Kan jag filtrera korten på skärmen?", a: "Ja. Två filter: efter status (t.ex. visa bara Väntar och Tillagas, dölj Serverad) och efter kategori (bara drinkar på baren, bara huvudrätter i köket). Inställningarna sparas per enhet — varje zon håller sin egen uppsättning." },
    ],
  },
};
