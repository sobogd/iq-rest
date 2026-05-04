import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Flersproget Restaurantmenu — 35 Sprog, Ét Tryk For at Skifte",
    description:
      "Betjen internationale gæster på deres sprog. Restaurantmenu på 35 sprog med ét-tryks skift. RTL-understøttelse for arabisk og persisk. 14 dages gratis prøveperiode.",
    canonical: "https://iq-rest.com/da/multilingual",
    ogLocale: "da_DK",
    ogTitle: "Flersproget Restaurantmenu-Hjemmeside — 35 Sprog Indbygget",
    ogDescription:
      "Turister scanner, ser din menu på deres sprog automatisk. 35 sprog, RTL-understøttelse, auto-detekt fra telefonindstillinger. 14 dages gratis prøveperiode.",
  },

  hero: {
    title: "Din menu taler hver turists sprog.",
    subtitle:
      "En flersproget restaurantmenu burde ikke være et projekt. Med IQ Rest auto-detekterer din QR-menu hver gæsts telefonsprog og leverer den på ét af 35 sprog — inklusive arabisk og persisk med korrekt højre-mod-venstre-gengivelse.",
    trustLine: "4.9 · 500+ restauranter i 30+ lande",
  },

  seo: {
    description:
      "Byg din menu én gang, server den på 35 sprog. IQ Rest auto-detekterer hver gæsts telefonsprog og gengiver menuen på deres tungemål — ingen flag-tryk, ingen sprogbarriere, ingen akavede Google Translate-øjeblikke. Fra spansk og tysk til japansk, arabisk og mandarin ser dine gæster din restaurant, som den var meningen, den skulle ses.",
    fullDescription:
      "De fleste 'flersprogede' menuer er PDF'er af ødelagt Google Translate, trykt én gang og aldrig opdateret. IQ Rests flersprogede restaurantwebsted er ægte i18n: hvert sprog har sin egen korrekt oversatte tekst, sin egen URL-slug, sine egne meta-tags så Google kan indeksere, og sin egen routing inde i menu-appen.\n\nNår en turist med en fransksproget iPhone scanner din QR-kode, åbner menuen automatisk på fransk — ingen tryk, ingen beslutninger. De kan skifte til ethvert andet sprog med sprogvælgeren øverst, men de fleste behøver aldrig. Det samme gælder kostmærker ('vegan' bliver til 'vegano' / 'vegetarisch' / 'ヴィーガン' afhængigt af sproget), fejlmeddelelser, 'tilføj til kurv'-knapper og kvitteringer. Hver UI-streng på 35 sprog, ikke kun menuindhold.\n\nFor RTL-sprog — arabisk og persisk — vendes hele layoutet korrekt: tekst justeres til højre, menuer åbner fra højre, priser vises efter rettens navn som forventet. Dette er ikke et CSS-hack, det er fuld RTL-understøttelse, der får arabiske og persiske gæster til at føle sig betjent, ikke eftermonteret.",
    benefitsHeading: "Hvorfor en ægte flersproget menu slår en PDF-oversættelse",
    benefits: [
      "35 sprog med korrekt UI-oversættelse — ikke kun menupunkter",
      "Auto-detekterer gæstens telefonsprog — ingen tryk nødvendige",
      "Manuel sprogvælger til gæster, der foretrækker et andet sprog",
      "Fuld RTL-understøttelse for arabisk og persisk — ikke et CSS-hack",
      "Hvert sprog har sin egen URL — Google indekserer 35 versioner af dit websted",
      "Skift en retbeskrivelse på dit modersmål — oversættelser følger med",
    ],
  },

  pricing: {
    heading: "Ét abonnement.",
    headingAccent: "Alle 35 sprog inkluderet.",
    sub: "Flersproget menu, AI-oversættelse, QR-bestilling og reservationer — alt i én fast pris. Ingen gebyrer per sprog, ingen ekstra for RTL.",
  },

  faq: {
    sub: "Alt hvad restaurantejere spørger om en flersproget menu. Kan du ikke se din? Skriv til os på WhatsApp — rigtige mennesker svarer.",
    items: [
      {
        q: "Hvor mange sprog understøtter menuen?",
        a: "35 sprog inklusive engelsk, spansk, tysk, fransk, italiensk, portugisisk, hollandsk, polsk, tjekkisk, slovakisk, ungarsk, rumænsk, bulgarsk, kroatisk, serbisk, slovensk, græsk, tyrkisk, russisk, ukrainsk, litauisk, lettisk, estisk, finsk, svensk, norsk, dansk, islandsk, catalansk, irsk gælisk, arabisk, persisk, japansk, koreansk og kinesisk. UI-strenge er professionelt oversat for hvert af dem.",
      },
      {
        q: "Hvordan skifter kunder sprog?",
        a: "To måder: automatisk (menuen åbner på deres telefonsprog) og manuelt (en sprogvælger øverst på menuen). 80% af turister rører aldrig den manuelle vælger — auto-detekt fungerer bare, fordi deres telefon allerede kender deres sprog.",
      },
      {
        q: "Understøtter I højre-mod-venstre-sprog som arabisk og persisk?",
        a: "Ja, med fuldt RTL-layout. Hele menuen vendes: tekst justeres til højre, kolonner vendes, navigationsdrawere åbner fra højre side, priser vises efter rettens navn. Dette er ægte RTL-understøttelse implementeret på layoutniveau, ikke bare CSS-direction-tricks.",
      },
      {
        q: "Vil Google indeksere min menu på alle 35 sprog?",
        a: "Ja. Hvert sprog har sin egen URL-slug (f.eks. /es, /fr, /de), korrekte hreflang-tags, lokaliserede meta-titler og -beskrivelser og sprogspecifikke strukturerede data. Google behandler hvert sprog som en separat side for den lokalitet, hvilket betyder, at turister, der søger efter din restaurant på deres sprog, har større sandsynlighed for at finde dig.",
      },
      {
        q: "Hvad hvis jeg ikke vil have alle 35 sprog — bare mine hovedmarkeder?",
        a: "Vælg hvilke sprog der er aktive. Hvis du er en strandrestaurant i Grækenland, der primært betjener britiske, tyske og italienske turister, aktiver kun engelsk, tysk og italiensk — resten vises ikke i sprogvælgeren eller auto-detekt. Du kan altid aktivere flere senere, efterhånden som dit turistmiks ændrer sig.",
      },
    ],
  },

  finalCta: {
    heading: "Hver turists telefonsprog.",
    headingAccent: "Allerede understøttet.",
    sub: "Server en flersproget menu på 35 sprog, inklusive RTL arabisk og persisk. 14 dages gratis prøveperiode, intet kreditkort, ingen gebyrer per sprog.",
  },
};
