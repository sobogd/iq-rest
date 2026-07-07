import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "no",
  slug: "digital-meny-restaurant",
  trackPrefix: "l_no_digital",
  hideFeatureHeading: true,

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
    headline: "En digital meny\nsom har alt",
    cta: "Lag digital meny",
    sub: "Bilder, allergener og oversettelse til 35 språk. Pluss bestillinger, WhatsApp og bordbestilling — alt i én IQ Rest.",
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
      heading: "35 språk hver gjest forstår",
      body: "Én QR, 35 språk. AI oversetter med kulinarisk kontekst, så hver rett høres naturlig ut. Turister bestiller med trygghet.",
      bullets: [
        "35 språk i abonnementet",
        "Kulinarisk AI, ikke Google",
        "Bytt språk med ett trykk",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "To gjester leser samme digitale meny på forskjellige språk på sine egne telefoner" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener",
      heading: "Allergener og kosthold på hver rett",
      body: "Merk gluten, laktose, nøtter, vegansk og glutenfritt. Gjestene filtrerer menyen etter sitt kosthold og bestiller med letthet.",
      bullets: [
        "14 allergenkategorier",
        "Vegansk- og glutenfri-merker",
        "Gjester filtrerer på kosthold",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gjest filtrerer menyen etter allergener på telefonen mens eieren redigerer allergenlisten på et nettbrett" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Enhver enhet",
      heading: "Styr det fra enhver enhet",
      body: "Administrasjonspanelet kjører i nettleseren — rediger meny, priser og bilder hvor som helst. Ingenting å installere.",
      bullets: [
        "Kjører i enhver nettleser",
        "Telefon, nettbrett eller PC",
        "Ingenting å installere",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Ingen provisjon",
      heading: "Null provisjon, ingen tillegg",
      body: "Ett gjennomsiktig abonnement. Vi tar ingen andel av omsetningen din og skjuler ingen gebyrer — alt blir hos restauranten.",
      bullets: [
        "Null prosent på bestillinger",
        "Ingen skjulte tillegg",
        "Én fast pris",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Eget domene",
      heading: "Meny på ditt eget domene",
      body: "Vi kobler domenet ditt med SSL — gjestene ser menyen på restaurantens adresse. Vi hjelper med DNS på 10 minutter.",
      bullets: [
        "Ditt domene med SSL",
        "meny.dinrestaurant.no",
        "Vi hjelper med DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Ditt design",
      heading: "Fleksibelt design som passer deg",
      body: "Flere ferdige oppsett og stiler — velg forsiden, fargene og rettpresentasjonen som passer stedet ditt.",
      bullets: [
        "Flere ferdige oppsett",
        "Din forside og dine farger",
        "Nytt utseende på få klikk",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Kontakt",
      heading: "Kontakt og sosiale medier i menyen",
      body: "En egen side med kart, telefon og lenker til Instagram og WhatsApp — gjestene finner deg med ett trykk.",
      bullets: [
        "Kart, telefon og adresse",
        "Instagram og WhatsApp",
        "Nå deg med ett trykk",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp-bestillinger",
      heading: "Ta imot bestillinger via WhatsApp",
      body: "Gjestene bygger en handlekurv og sender bestillingen rett til din WhatsApp — ingen egen app, i chatten de allerede bruker.",
      bullets: [
        "Bestilling til din WhatsApp",
        "Ingen egen app",
        "Chat som vanlig",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reservasjoner",
      heading: "Bordbestilling uten anrop",
      body: "Gjestene booker bord selv via menyen eller en lenke, du ser kalenderen per bord og bekrefter automatisk eller manuelt.",
      bullets: [
        "Booking 24/7, uten anrop",
        "Kalender på tvers av bord",
        "Auto- og manuell bekreftelse",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium design",
      heading: "Ser ut som en nettside, ikke en PDF",
      body: "Videobakgrunn på velkomstskjermen, konseptet ditt beskrevet og en egen kontaktside med kart og sosiale medier.",
      bullets: [
        "Video på forsiden",
        "Konsept og retter beskrevet",
        "Egen kontaktside",
      ],
      image: { src: "/landing/feature-design.webp", alt: "To telefoner på et kafébord: hjemmeskjerm for menyen med videobakgrunn og kontaktside med kart" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestillinger · valgfritt",
      heading: "Bestillinger rett fra menyen",
      body: "Gjestene bygger en handlekurv og sender bestillingen — den lander i salongen, på WhatsApp eller på kjøkkenskjermen. Valgfritt.",
      bullets: [
        "Handlekurv og send med ett trykk",
        "Til sal, WhatsApp eller kjøkken",
        "Slå det på i innstillinger",
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
