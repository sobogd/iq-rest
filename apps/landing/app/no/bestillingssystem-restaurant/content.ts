import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "no",
  slug: "bestillingssystem-restaurant",
  trackPrefix: "l_no_orders",

  meta: {
    title: "Bestillingssystem for restaurant — gjest og kelner | IQ Rest",
    description:
      "Restaurantbestillinger fra telefon eller nettbrett: salongplan, regningsdeling, statuser, alternativer og notater. Gjester bestiller ved bordet; kelneren tar bestillinger fra enhver enhet. 14 dager gratis.",
    canonical: "https://iq-rest.com/no/bestillingssystem-restaurant",
    ogLocale: "nb_NO",
    ogTitle: "Bestillingssystem for restaurant — gjest og kelner",
    ogDescription:
      "Gjest ved bordet eller kelner på telefonen — bestillingen lander umiddelbart i kjøkkenet. Salongplan, regningsdeling, statuser, alternativer og notater.",
    brandLine: "IQ Rest — Bestillingssystem for restaurant",
  },

  hero: {
    headline: "Bestillingsmottak: gjest og kelner — direkte til kjøkkenet.",
    cta: "Sett opp nettbestilling",
    sub: "Gjester bestiller via QR-menyen ved bordet eller kelneren tar bestillingen fra en telefon eller nettbrett — bestillingen lander på kjøkkenskjermen på sekunder. Salongplan med fargekodede bord, regningsdeling, fleksible alternativer og kommentarer. Ingen notisblokker, ingen turer til baren.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Kelner tar en bestilling ved bordet fra en smarttelefon — bestillingen lander på kjøkkenskjermen",
  },

  scan: {
    heading: "Sett opp bestillingssystemet",
    headingAccent: "på 5 minutter.",
    sub: "Last opp en papirmeny eller PDF — AI-en gjenkjenner retter, priser og kategorier. Koble til et nettbrett i salongen og begynn å ta imot bestillinger ved bordene.",
    cta: "Skann meny",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Liste og salongplan",
      heading: "Bestillingsliste ved siden av salongplanen.",
      body: "Alle aktive bestillinger til høyre: status, totalt, tid, antall varer. Til venstre — salongplanen: bord fargelagt etter status — ledig, opptatt, krever oppmerksomhet. Trykk på et bord for å åpne eller opprette en bestilling; trykk på et kort for å åpne detaljvisningen. Ingen skjermbytter.",
      bullets: [
        "Salongplan: bord fargekodet etter bestillingsstatus.",
        "Bestillingsliste ved siden — totalt, tid, antall varer.",
        "Trykk på et bord for å åpne eller opprette en bestilling.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Nettbrett på kelnerstasjonen: bestillingsliste og salongplan med fargekodede bord" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Bestillingskort",
      heading: "Bestillingskort: statuser, duplisering, sletting — ett trykk.",
      body: "Hver vare har sin egen status (Venter / Tilberedes / Klar / Servert) — kjøkken og kelner ser samme bilde i sanntid. Å trykke på prikken åpner handlingsmenyen: statusendring, duplisering av varen med samme modifikatorer og alternativer, sletting. Alt inni kortet.",
      bullets: [
        "Status per vare: Venter / Tilberedes / Klar / Servert.",
        "Dupliser en vare med ett trykk med samme alternativer.",
        "Slett en vare direkte fra kortet.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Nettbrett med detaljert bestillingskort: varestatuser, duplisering og sletting handlinger" },
    },
    {
      icon: Receipt,
      eyebrow: "Del regningen",
      heading: "Del regningen når gjester betaler separat.",
      body: "Gjestene bestemte seg for å dele — kryss av varene som flyttes til en ny kvittering; resten blir på den nåværende. Systemet viser umiddelbart begge totalene. Ett trykk på „Del bestilling“ og du har to uavhengige bestillinger med riktige totaler, begge fortsatt knyttet til sine bord.",
      bullets: [
        "Velg varer å dele med avmerkingsbokser.",
        "Begge totalene vises umiddelbart.",
        "Ett trykk og bestillingen er delt uten manuell regning.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Nettbrett på et restaurantbord: regningsdelingsmodal mellom gjester" },
    },
    {
      icon: Smartphone,
      eyebrow: "Mobil tillegging",
      heading: "Legg til varer fra en telefon — i tre handlinger.",
      body: "Kelneren er ikke bundet til én enhet: åpner bestillingsmottak på telefonen og legger til en vare i tre trinn — kategori, rett, alternativer (størrelse, stekegrad, ekstra saus eller ingrediens). Prisen omberegnes automatisk. Notatet til kjøkkenet kommer i det siste trinnet.",
      bullets: [
        "Tre trinn: kategori → rett → alternativer.",
        "Alternativer (størrelse, tillegg, ekstra) priset med ett klikk.",
        "Notatfelt i det siste trinnet.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Fire telefoner med trinnene for å legge til en bestillingsvare: kategori, rett, størrelse, kommentar" },
    },
  ],

  faq: {
    sub: "Hva restauratører spør om bestillingsmottak i IQ Rest. Finner du ikke spørsmålet ditt? Send oss en melding på WhatsApp.",
    items: [
      { q: "Kan flere kelnere arbeide samtidig fra forskjellige enheter?", a: "Ja. Hver kelner logger inn på den delte restaurantkontoen fra sin egen telefon eller nettbrett — alle ser samme bord, bestillinger og statuser i sanntid. Endringer fra én kelner vises umiddelbart for de andre, uten konflikter eller låsninger." },
      { q: "Kan kelnere bruke sine personlige enheter (BYOD)?", a: "Ja. Det er en webapp i nettleseren — ingenting å installere. Kelneren åpner en lenke, logger inn på restaurantkontoen fra sin iPhone, Android eller personlige nettbrett og begynner å arbeide. Ved skifteslutt logger han bare ut." },
      { q: "Kan obligatoriske alternativer legges til retter (størrelse, stekegrad osv.)?", a: "Ja. Hver rett kan ha et hvilket som helst antall alternativgrupper — obligatoriske (f.eks. „Størrelse“: Liten / Middels / Stor) og valgfrie („Stekegrad“: rå / medium / godt stekt). Alternativer kan endre prisen (+1,00 €). Hvis en gruppe er obligatorisk, lar systemet ikke gjesten eller kelneren legge til retten uten et valg." },
      { q: "Kan gjester legge til notater eller ekstra til en rett (brød, saus)?", a: "Ja. Det siste trinnet for tillegging har et fritt notatfelt („uten løk“, „godt stekt“, „nøtteallergi“). Ekstra er separate prissatte modifikatorer („+ BBQ-saus +1,50 €“, „+ Brød +2,00 €“). Notater vises på kjøkkenskjermen, fremhevet med farge." },
      { q: "Finnes det bestillingsstatistikk?", a: "Ja. Analyseseksjonen viser: inntekt per dag og time, gjennomsnittsregning, toppretter, gjest → bestilling konvertering, servicehastighet (tid fra Venter til Servert). Dette hjelper med å planlegge skift, innkjøp og identifisere underpresterende retter." },
      { q: "Kan bestillinger deles eller flyttes mellom bord?", a: "Ja, begge scenarier støttes. For å dele — kryss av varene som flyttes til en ny kvittering (for gjester som betaler separat). For å flytte — åpne bestillingskortet, velg et nytt bord; hele bestillingen flyttes dit. Ingen manuell regning, ingen forlater panelet." },
    ],
  },
};
