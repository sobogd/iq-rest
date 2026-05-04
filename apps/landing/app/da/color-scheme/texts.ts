import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Brandet Restaurantmenu — Tilpasset Farveskema og Tema",
    description:
      "Match dit restaurantbrand med tilpassede accentfarver. Lyse og mørke temaer skifter automatisk med gæstens telefon. Brandet QR-menu på sekunder. 14 dages prøveperiode.",
    canonical: "https://iq-rest.com/da/color-scheme",
    ogLocale: "da_DK",
    ogTitle: "Tilpasset Farveskema — Brandet Restaurantmenu på Sekunder",
    ogDescription:
      "Vælg din accentfarve, få en brandet restaurantmenu. Auto lys/mørk tilstand tilpasser sig hver gæsts telefon. Ingen designværktøjer nødvendige.",
  },

  hero: {
    title: "Din menu. Dine farver. Dit brand.",
    subtitle:
      "Vælg en accentfarve, drop dit logo ind, og din QR-menu ser øjeblikkeligt ud som et rigtigt brand i stedet for en skabelon. Lyse og mørke temaer skifter automatisk med hver gæsts telefon — din menu ser altid intentionel ud.",
    trustLine: "4.9 · 500+ restauranter i 30+ lande",
  },

  seo: {
    description:
      "Et tilpasset farveskema er forskellen mellem en generisk QR-menu og en brandet restaurantoplevelse. IQ Rest lader dig vælge din eksakte accentfarve (eller indsætte en hex-kode fra dine brandretningslinjer), droppe dit logo ind, og hele menuen — knapper, links, fremhævninger, kategorimærker — antager din brandfarve på sekunder.",
    fullDescription:
      "De fleste QR-menubyggere giver dig et fast farveskema: blå eller rød, tag det eller lad det være. IQ Rest behandler dit brand som om det betyder noget — vælg enhver accentfarve fra en farvevælger eller indsæt din eksakte hex-kode fra dine brandretningslinjer (samme orange som dit skilt, samme grøn som dit logo). Hver accent på menuen — primære knapper, links, kategorifremhævninger, den aktive tilstand i din sprogvælger — antager den farve øjeblikkeligt.\n\nLys og mørk tilstand håndteres automatisk. Når en gæsts telefon er i mørk tilstand (de fleste telefoner ved middag), vises din menu i mørk tilstand med din accentfarve fremhævet. Når de er ude i klart sollys i lys tilstand, tilpasser menuen sig. Du vælger ikke lys eller mørk — du vælger en brandfarve, og menuen gør det rigtige på hver enhed.\n\nDit logo sidder øverst på menuen, på QR-mærkat-printskabelonen, på ordrekvitteringen og på reservationsbekræftelsesmailen. Hvert gæstekontaktpunkt føles som det samme brand, fordi det er det samme brand. Ingen designer påkrævet, ingen Photoshop-session, ingen dyr 'restaurant-brandingpakke' — bare en farvevælger og en logo-upload.",
    benefitsHeading: "Hvorfor et brandet farveskema konverterer bedre end et standardtema",
    benefits: [
      "Vælg enhver accentfarve — farvevælger eller indsæt en hex-kode",
      "Auto lys/mørk tilstand der tilpasser sig hver gæsts telefon",
      "Logo-placering på menu, QR-mærkat, kvitteringer og e-mails",
      "Brandet udseende fra første minut — ingen Photoshop eller designer nødvendig",
      "Skift farver når som helst til sæsonkampagner (Valentin rød, jul grøn)",
      "Farve forbliver tilgængelig — kontrastforhold tilpasses automatisk for læsbarhed",
    ],
  },

  pricing: {
    heading: "Ét abonnement.",
    headingAccent: "Dine brandfarver.",
    sub: "Tilpasset farveskema plus QR-menu, online bestilling, AI-oversættelse og reservationer — alt i én fast pris. Branding uden en designer.",
  },

  faq: {
    sub: "Alt hvad restaurantejere spørger om branding af menuen. Kan du ikke se din? Skriv til os på WhatsApp — rigtige mennesker svarer.",
    items: [
      {
        q: "Kan jeg matche min eksakte brandfarve fra mit logo eller skilt?",
        a: "Ja — indsæt din eksakte hex-kode (f.eks. #C24A2D), og menuen bruger den eksakte farve til hver accent. Vi auto-genererer en mørkere nuance til hover-tilstande og en lysere nuance til baggrunde, så en enkelt brandfarve får en fuld UI-palette uden at du gør noget.",
      },
      {
        q: "Understøtter menuen lys og mørk tilstand?",
        a: "Ja, automatisk. Menuen detekterer hver gæsts telefontema og skifter mellem lys og mørk tilstand i realtid. Din accentfarve forbliver den samme; den omgivende UI inverteres. De fleste restauranter sætter aldrig lys vs mørk — de vælger en farve og lader menuen tilpasse sig.",
      },
      {
        q: "Kan jeg ændre mit farveskema senere?",
        a: "Når som helst. Åbn designindstillingerne, vælg en ny farve, gem. Hver side på tværs af din QR-menu, reservationsflow og bestillings-UI opdateres inden for sekunder. Nyttigt til sæsonkampagner (rød til Valentin, grøn til jul, guld til nytår) — skift i en uge, skift tilbage.",
      },
      {
        q: "Hvor vises mit logo?",
        a: "Øverst på din QR-menu (ved siden af dit restaurantnavn), på QR-mærkat-printskabelonen (så mærkaten på borde matcher dit brand), på ordrebekræftelseskvitteringer og i reservationsbekræftelsesmails. Upload det én gang i PNG eller SVG, det bruges overalt automatisk.",
      },
      {
        q: "Hvad hvis min brandfarve er svær at læse mod menubaggrunden?",
        a: "Systemet auto-tjekker kontrast og dæmper eller lyser blidt din farve op til teksttilfælde (så en bleg gul brandfarve ikke fremstår som ulæselig tekst), mens den beholder din eksakte farve til accenter som knapper og fremhævninger. Du behøver ikke tænke på WCAG — menuen gør det for dig.",
      },
    ],
  },

  finalCta: {
    heading: "Vælg en farve.",
    headingAccent: "Lign et rigtigt brand.",
    sub: "Tilpasset farveskema, brandede kvitteringer, auto lys/mørk tilstand. 14 dages gratis prøveperiode, ingen designer, intet kreditkort.",
  },
};
