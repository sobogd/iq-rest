import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurantmenu-Analyse — QR-Scanninger, Top Retter, Turistsprog",
    description:
      "Se præcis hvordan gæster bruger din QR-menu. Daglige scanninger, mest sete retter, sprogpræferencer, peak-timer. Datadrevne beslutninger til din restaurant.",
    canonical: "https://iq-rest.com/da/analytics",
    ogLocale: "da_DK",
    ogTitle: "Restaurantanalyse — Spor QR-Menuscanninger, Retter og Sprog",
    ogDescription:
      "Vid hvilke retter dine gæster faktisk kigger på, hvornår peak-timer er, og hvilken turist-nationalitet er i din spisesal i aften. 14 dages gratis prøveperiode.",
  },

  hero: {
    title: "Stop med at gætte. Vid hvad gæster faktisk gør.",
    subtitle:
      "Se restaurantmenu-analyse i realtid — QR-scanninger per time, retter gæster dvæler ved, sprog turister bruger, den langsomste hverdag — og brug de data til at trykke færre menuer, planlægge smartere, skubbe de rigtige specialiteter.",
    trustLine: "4.9 · 500+ restauranter i 30+ lande",
  },

  seo: {
    description:
      "Restaurantanalyse, der ikke kræver et datateam. IQ Rest sporer hver scanning, visning, sprogskift og bestilling fra din QR-menu og bringer mønstrene, der betyder noget, frem: mest sete retter, peak scan-timer, travleste dag i ugen, sprogfordeling af din turistmasse. Tag datadrevne beslutninger uden nogensinde at åbne et regneark.",
    fullDescription:
      "De fleste restauranter kører på instinkt — 'vi føler tirsdage er langsomme', 'jeg tror pastaen sælger godt'. Instinkt er godt, men data er bedre. IQ Rest sporer hver interaktion med din QR-menu, så du ikke behøver at gætte: hvor mange gange din QR blev scannet i dag, hvilke retter gæster så længst på, hvilke retter de tilføjede til kurven, men ikke bestilte, hvilket sprog turister brugte.\n\nAnalyse-dashboardet bringer svarene frem i tre visninger: i dag (live scanninger, aktuelle bestillinger, hvad bestilles lige nu), denne uge (top 10 retter, travle timer, sprogfordeling, udeblivelser på reservationer) og tendenser (måned-over-måned vækst, sæsonbetingethed, hverdagsmønstre). Du kan grave dig ned i enhver ret for at se, hvor ofte den ses vs bestilles (en ret set 200 gange men bestilt 5 gange har et tekst- eller fotoproblem), eller ethvert sprog for at se, hvilken turistmiks du faktisk betjener.\n\nMålet er beslutninger, ikke dashboards: 'næste tirsdag er historisk langsom → kør en happy hour push-notifikation', 'italienske turister bestiller pasta 3x mere end lokale → sæt pasta først når sprog=it', 'denne ret har 90% visningsrate men 5% bestillingsrate → forbedr fotoet'. Rigtige ændringer, rigtig omsætning, ingen MBA påkrævet.",
    benefitsHeading: "Hvorfor restauranter elsker IQ Rest-analyse frem for Google Analytics",
    benefits: [
      "Live QR-scanningstæller — se din aften fyldes op i realtid",
      "Mest sete og mest bestilte retter — spot hvad der virker og hvad ikke",
      "Sprogfordeling — vid hvilke turister er i din spisesal",
      "Peak-timer og hverdagsmønstre — planlæg smartere, prep smartere",
      "Visning-til-bestilling konvertering per ret — fix dårlige fotos og svage beskrivelser",
      "Reservationsanalyse — bookingkilder, udeblivelsesrate, selskabsstørrelsesmiks",
    ],
  },

  pricing: {
    heading: "Ét abonnement.",
    headingAccent: "Fuld analyse inkluderet.",
    sub: "Restaurantanalyse, QR-bestilling, AI-oversættelse og reservationer — alt i én fast pris. Ingen premium-niveau for data, nogensinde.",
  },

  faq: {
    sub: "Alt hvad restaurantejere spørger om menu-analyse. Kan du ikke se din? Skriv til os på WhatsApp — rigtige mennesker svarer.",
    items: [
      {
        q: "Hvad kan jeg faktisk se i analyse-dashboardet?",
        a: "Live QR-scanninger (i dag, denne uge, denne måned), mest sete retter, mest bestilte retter, visning-til-bestilling konvertering per ret, sprogfordeling af gæster, peak-timer per ugedag, gennemsnitlig ordreværdi, travleste borde, reservations-udeblivelsesrate og tendenser over tid. Alt på ét dashboard, ingen opsætning nødvendig.",
      },
      {
        q: "Hvordan bruger jeg dette til faktisk at vækste omsætningen?",
        a: "Tre mønstre virker for de fleste restauranter: (1) omarranger menuen så top-konverterende retter vises først; (2) fix fotoet eller beskrivelsen på retter med høje visninger men lave bestillinger; (3) skub en happy-hour eller specialitet på historisk langsomme hverdage/timer. Vi har set restauranter øge hverdagsomsætning med 15–30% fra disse tre ændringer alene.",
      },
      {
        q: "Er dette anonymt, eller sporer I individer?",
        a: "Anonymt og samlet. Vi sporer menuvisninger og bestillinger per session, ikke per identificerbar bruger. Ingen e-mails, ingen telefonnumre, ingen IP-adresser gemt langsigtet. Dashboardet viser dig mønstre ('200 scanninger fredag'), ikke folk. Fuldt GDPR-kompatibelt af design.",
      },
      {
        q: "Kan jeg eksportere dataene?",
        a: "Ja. Eksporter enhver visning som CSV (top retter, daglige scanninger, timefordeling osv.) og åbn i Excel eller Google Sheets. Nyttigt til at dele med investorer, revisorer eller til at kombinere med dine POS-data.",
      },
      {
        q: "Skal jeg lave teknisk opsætning for at få analyse?",
        a: "Nul. Analyse er aktiveret som standard, så snart din QR-menu er live — hver scanning, visning og bestilling spores automatisk. Dashboardet er en del af standardabonnementet, ikke et tillæg, og du vil se nyttige data inden for din første dag, hvor gæster scanner.",
      },
    ],
  },

  finalCta: {
    heading: "Stop med at gætte.",
    headingAccent: "Begynd at måle.",
    sub: "Live QR-scanningsanalyse, top retter, peak-timer, turistsprogfordeling. 14 dages gratis prøveperiode, intet kreditkort.",
  },
};
