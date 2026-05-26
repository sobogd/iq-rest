import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "no",
  slug: "qr-kode-meny-restaurant",
  trackPrefix: "l_no_qr",

  meta: {
    title: "QR-kode meny for restauranter | IQ Rest",
    description:
      "QR-kode meny for restauranter: gjesten skanner QR-koden på bordet, åpner menyen i nettleseren og bestiller på sitt eget språk. 14 dager gratis, uten kort.",
    canonical: "https://iq-rest.com/no/qr-kode-meny-restaurant",
    ogLocale: "no_NO",
    ogTitle: "QR-kode meny for restauranter",
    ogDescription:
      "QR på bordet, meny på telefonen — bilder, allergener, 35 språk og oppdateringer i sanntid.",
    brandLine: "IQ Rest — QR-kode meny for restauranter",
  },

  hero: {
    headline: "QR-kode meny for restauranter.",
    cta: "Lag QR-meny",
    sub: "Gjesten retter kameraet mot QR-koden på bordet, og menyen åpnes umiddelbart i telefonens nettleser: bilder av rettene, allergener, alltid oppdaterte priser og automatisk oversettelse til 35 språk. Uten å laste ned apper, og uten å trykke menyen på nytt ved hver prisendring.",
  },

  scan: {
    heading: "Har du allerede en papir- eller PDF-meny?",
    headingAccent: "KI gjør den om til en QR-meny på 60 sekunder.",
    sub: "Last opp et bilde av menyen eller PDF-en — KI henter ut kategorier, retter og priser og kobler dem rett til QR-menyen.",
    cta: "Lag QR-meny",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Én QR, 35 språk",
      heading: "Én QR-kode, menyen på 35 språk.",
      body: "Gjesten skanner QR-en og velger språk: oversettelsen gjøres av en KI med sans for gastronomi, ikke en generisk oversetter. Slutt på egne menyer for turister og løse ark på bordet.",
      bullets: [
        "Én QR-utskrift dekker 35 språk, inkludert i abonnementet.",
        "KI-en forstår kjøkkenspråket — rettenes navn høres naturlige ut på alle språk.",
        "Gjesten bytter språk inne i menyen, uten å skanne QR-en på nytt.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "To gjester skanner den samme QR-koden på bordet og leser menyen på ulike språk" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener i QR-en",
      heading: "Allergener og kostholdsmerker inne i QR-menyen.",
      body: "Hver rett i menyen som er koblet til QR-en kan ha merker for gluten, laktose, nøtter, skalldyr, veganske og glutenfrie alternativer. Gjesten filtrerer fra telefonen rettene som passer til sine restriksjoner, uten å spørre personalet.",
      bullets: [
        "14 allergenkategorier på rettnivå.",
        "Vegan-, vegetar- og glutenfri-merker med ett klikk i panelet.",
        "Gjesten filtrerer QR-menyen etter sine egne restriksjoner.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gjest filtrerer QR-menyen etter allergener på telefonen mens eieren redigerer listen fra et nettbrett" },
    },
    {
      icon: Palette,
      eyebrow: "Mer enn bare en QR",
      heading: "En QR-meny like gjennomarbeidet som restaurantens nettside.",
      body: "Etter å ha skannet koden lander gjesten ikke på en flat PDF: han ser en velkomstskjerm med video eller fremhevet bilde, beskrivelsen av stedet og en kontaktside med kart, telefonnumre og sosiale lenker. QR-en blir restaurantens inngangsdør på nett.",
      bullets: [
        "Bakgrunnsvideo eller fremhevet bilde på QR-menyens startskjerm.",
        "Plass til å fortelle om stedets og hver kategoris konsept.",
        "Innebygd kontaktside: kart, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "To telefoner på et bord: QR-menyens startskjerm med bakgrunnsvideo og en kontaktside med kart" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestilling fra QR · valgfritt",
      heading: "Fra QR-koden kan gjesten også bestille.",
      body: "I tillegg til å se menyen kan QR-menyen bli en bestillingskanal: gjesten legger retter i handlekurven og sender forespørselen. Bestillingen når servitøren i lokalet, WhatsApp eller kjøkkenskjermen. Funksjonen slås på eller av i innstillingene ved behov.",
      bullets: [
        "Handlekurv, kommentarer og innsending av bestilling rett fra QR-skanningen.",
        "Bestillingen kommer umiddelbart til lokalet, WhatsApp eller kjøkkenskjermen.",
        "Funksjonen kan aktiveres etter tidspunkt, soner eller bestemte restauranter.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "To telefoner på et bord: en handlekurv laget fra QR-menyen og en bekreftelse på sendt bestilling" },
    },
  ],

  faq: {
    sub: "Det restauratører spør om angående QR-menyen fra IQ Rest. Finner du ikke spørsmålet ditt? Skriv til oss på WhatsApp.",
    items: [
      { q: "Hvordan fungerer QR-menyen fra IQ Rest?", a: "Hvert bord har en trykt QR-kode. Gjesten skanner den med telefonkameraet, og nettleseren åpner restaurantens meny — bilder, beskrivelser, allergener og oppdaterte priser. Ingen app er nødvendig, verken for gjesten eller personalet." },
      { q: "Trenger jeg tekniske ferdigheter for å lage QR-menyen?", a: "Nei. Panelet fungerer med klikk og dra-og-slipp, uten kode eller kompliserte innstillinger. Å legge til en rett tar noen sekunder: navn, pris, bilde. Det første oppsettet tar vanligvis 30 minutter til en time; har du allerede en PDF-meny, konverterer KI-en den automatisk." },
      { q: "Må gjestene installere en app for å lese QR-en?", a: "Nei. Det innebygde kameraet på iPhone og Android gjenkjenner QR-koden på sekunder og åpner menyen direkte i nettleseren. Administrasjonspanelet fungerer også fra enhver moderne nettleser — telefon, nettbrett eller laptop." },
      { q: "Hvordan trykkes QR-kodene for bordene?", a: "QR-kodene genereres automatisk i panelet (én per bord eller én for hele stedet) og lastes ned som trykkeklare PDF-er. Alt du trenger er en kontorskriver og en holder: stativ, klistremerke eller brikke." },
      { q: "Kan jeg bruke mitt eget domene for QR-menyen?", a: "Ja. Vi støtter et restaurantdomene med SSL-sertifikat (for eksempel meny.dinrestaurant.no): når gjesten skanner QR-en, ser han restaurantens adresse i stedet for et generisk subdomene. DNS-oppsettet tar 5–10 minutter, og vi veileder deg gjennom det." },
      { q: "Kan jeg administrere QR-kodene for flere restauranter fra én konto?", a: "Ja, på forespørsel. Én konto kan samle flere steder, hvert med sine egne QR-koder, meny, design og analyser. Skriv til oss på WhatsApp, så aktiverer vi multi-restaurant-modus." },
      { q: "Er det vanskelig å starte QR-menyen fra bunnen?", a: "Tre trinn: (1) lag kategoriene; (2) legg til rettene med navn, pris og bilde; (3) trykk QR-kodene og sett dem på bordene. Har du allerede en papir- eller PDF-meny, last den opp — KI-en gjenkjenner kategorier og priser og fyller ut kortene. En grunnleggende meny kan være på nett på 5 minutter." },
    ],
  },
};
