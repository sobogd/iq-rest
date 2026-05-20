import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "no",
  slug: "digital-meny-restaurant",
  trackPrefix: "l_no_digital",

  meta: {
    title: "Digital meny for restauranter | IQ Rest",
    description:
      "Digital meny for restauranter: online meny med bilder, allergener, AI-oversettelse og live prisoppdateringer. 14 dager gratis, ingen kort.",
    canonical: "https://iq-rest.com/no/digital-meny-restaurant",
    ogLocale: "nb_NO",
    ogTitle: "Digital meny for restauranter",
    ogDescription:
      "Online versjon av papirmenyen din — bilder, allergener, AI-oversettelse, sanntidsoppdateringer.",
    brandLine: "IQ Rest — Digital meny for restauranter",
  },

  hero: {
    headline: "Digital meny for restauranter.",
    sub: "Online versjon av papirmenyen din med bilder, allergener, beskrivelser og live prisoppdateringer. Gjester ser menyen på sitt eget språk; restauranten sparer på trykking.",
  },

  scan: {
    heading: "Har du en papirmeny eller PDF?",
    headingAccent: "AI digitaliserer den på 60 sekunder.",
    sub: "Last opp et bilde eller dokument — AI-en gjenkjenner kategorier, retter og priser automatisk.",
    cta: "Skann meny",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI-språk",
      heading: "35 AI-språk — hver gjest leser menyen på sitt eget.",
      body: "Én QR-kode, 35 språk. AI-en håndterer kulinarisk kontekst — rettnavn og beskrivelser høres naturlige ut. Turister bestiller med større selvtillit og gjennomsnittsregningen vokser uten at en kelner må oversette hver rett.",
      bullets: [
        "35 språk inkludert i abonnementet, uten ekstrakostnad.",
        "AI med forståelse av kulinarisk kontekst, ikke rå Google Translate.",
        "Gjesten bytter språk med ett trykk i menyen.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "To gjester leser samme digitale meny på forskjellige språk på sine egne telefoner" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener",
      heading: "Merker for allergener og kosthold.",
      body: "Merk retter for gluten, laktose, nøtter, sjømat, veganske og glutenfrie alternativer. Gjester filtrerer menyen etter sine kostholdsbehov og bestiller med større tillit.",
      bullets: [
        "14 standard allergenkategorier på hver rett.",
        "Veganske, vegetariske og glutenfrie merker med ett klikk.",
        "Gjester filtrerer menyen etter sine kostholdsbegrensninger.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gjest filtrerer menyen etter allergener på telefonen mens eieren redigerer allergenlisten på et nettbrett" },
    },
    {
      icon: Palette,
      eyebrow: "Premium design",
      heading: "Premium design med videobakgrunn og kontaktside.",
      body: "En video eller bilde på velkomstskjermen, restaurantbeskrivelse, dedikert kontaktside med kart, telefonnumre og sosiale profiler. Den digitale menyen ser ut som en fullverdig restaurantnettside, ikke en PDF bak en QR-kode.",
      bullets: [
        "Videobakgrunn eller stort bilde på velkomstskjermen.",
        "Restaurant- og kategoribeskrivelser — fortell konseptets historie.",
        "Kontaktside: kart, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "To telefoner på et kafébord: hjemmeskjerm for menyen med videobakgrunn og kontaktside med kart" },
    },
    {
      icon: LayoutList,
      eyebrow: "Meny uten bilder",
      heading: "En meny uten bilder ser like bra ut.",
      body: "Noen retter har kanskje ikke bilder — og det er helt greit. IQ Rest viser kortene med og uten bilder konsekvent: typografi, allergener og priser beholder en premium følelse. En blanding av retter med og uten bilder forblir sammenhengende.",
      bullets: [
        "Kort uten bilder ser ikke tomme ut.",
        "Typografien tilpasser seg kortets innhold.",
        "Konsistent stil for retter med og uten bilder.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "To telefoner på et bord: meny med retterbilder og meny med kun tekst" },
    },
    {
      icon: Smartphone,
      eyebrow: "Administrer fra enhver enhet",
      heading: "Administrer menyen fra enhver enhet.",
      body: "Ett panel åpner i nettleseren på telefon, nettbrett eller bærbar PC. Endre en pris, fjern en rett fra stopplisten eller legg til en spesialitet — gjester ser endringen innen sekunder. Ingen installasjoner, ingen integrasjoner.",
      bullets: [
        "Ingen app å installere — åpne en nettleser og du er inne.",
        "Priser, bilder og stoppliste — noen trykk fra telefonen.",
        "Administrer menyen fra hvor som helst, også fra salongen.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Bærbar PC og telefon på et kafébord som redigerer samme menyelement på begge enheter" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestillinger fra menyen · valgfritt",
      heading: "Gjester bestiller direkte fra menyen.",
      body: "Gjester bygger en handlekurv i QR-menyen og sender bestillingen — den lander hos kelneren i salongen eller på kjøkkennettbrettet. Funksjonen kan slås av eller på i innstillingene når som helst.",
      bullets: [
        "Handlekurv, kommentarer og bestillingssending med ett trykk.",
        "Bestillingen lander umiddelbart i administrasjonspanelet, WhatsApp eller på kjøkkenskjermen.",
        "Funksjon kan veksles i innstillingene.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "To telefoner på et bord: handlekurv med bestilling og bekreftelse på sendt bestilling" },
    },
  ],

  faq: {
    sub: "Hva restauratører spør om den digitale menyen i IQ Rest. Finner du ikke spørsmålet ditt? Send oss en melding på WhatsApp.",
    items: [
      { q: "Trenger jeg tekniske ferdigheter eller CMS-erfaring?", a: "Nei, spesielle ferdigheter er ikke nødvendige. Hver handling i administrasjonspanelet er med klikk og dra-og-slipp — uten kode. Å legge til et element i menyen tar noen sekunder: navn, pris, bilde. Et fullt menyoppsett tar vanligvis 30 minutter til en time." },
      { q: "Hva er IQ Rests digitale meny?", a: "IQ Rest er en skyplattform for restauranter. Den digitale menyen er online-versjonen av menyen din, tilgjengelig for gjester via QR-kode eller direkte lenke: retterbilder, priser, allergener, AI-oversettelse til 35 språk, sanntidsoppdateringer. Menyen er hostet på våre servere; du trenger ikke installere eller vedlikeholde programvare — bare åpne en nettleser." },
      { q: "Trenger gjestene en app eller spesiell maskinvare?", a: "Nei. Gjestene retter telefonkameraet mot QR-koden og menyen åpner i nettleseren. Restaurantens administrasjonspanel fungerer også i alle moderne nettlesere — telefon, nettbrett eller bærbar PC. QR-koder skrives ut på enhver kontorprinter." },
      { q: "Kan jeg hoste menyen på mitt eget domene?", a: "Ja. Vi støtter et tilpasset domene med SSL-sertifikat — gjester ser menyen på restaurantens adresse (f.eks. meny.dinrestaurant.no). Vi hjelper med DNS-oppsett; det tar vanligvis 5–10 minutter." },
      { q: "Kan jeg administrere flere restauranter fra én konto?", a: "Ja, på forespørsel. Én konto kan hoste flere restauranter: hvert sted med egen meny, design, QR-koder og analyser. Send oss en melding på WhatsApp og vi aktiverer multirestaurantmodus for din gruppe." },
      { q: "Hvor vanskelig er det å sette opp menyen fra bunnen?", a: "Oppsettet består av tre trinn: (1) opprett kategorier; (2) legg til elementer med navn, priser og bilder; (3) skriv ut QR-koder for bordene. Hvis du allerede har en papirmeny eller PDF, last opp den — AI-en gjenkjenner kategorier, navn og priser og fyller kortene automatisk. En grunnleggende meny kan være live på 5 minutter; den totale tiden avhenger av antall elementer." },
      { q: "Hva slags støtte tilbyr dere?", a: "Vi er tilgjengelige på WhatsApp i åpningstidene og svarer raskt på e-post. Vi hjelper med innledende oppsett, domenekonfigurasjon, menydesign og enhver ikke-standard situasjon. Hvis du trenger en demo eller praktisk støtte ved oppstart — send oss en melding." },
    ],
  },
};
