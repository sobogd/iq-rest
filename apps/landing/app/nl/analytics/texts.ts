import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurantmenu analytics — QR scans, top gerechten, toeristentalen",
    description:
      "Zie precies hoe gasten je QR menu gebruiken. Dagelijkse scans, meest bekeken gerechten, taalvoorkeuren, piekuren. Datagedreven beslissingen voor je restaurant.",
    canonical: "https://iq-rest.com/nl/analytics",
    ogLocale: "nl_NL",
    ogTitle: "Restaurant analytics — Track QR menu scans, gerechten en talen",
    ogDescription:
      "Weet welke gerechten je gasten daadwerkelijk bekijken, wanneer piekuren zijn en welke toeristennationaliteit vanavond in je eetzaal zit. 14 dagen gratis proefperiode.",
  },

  hero: {
    title: "Stop met gokken. Weet wat gasten echt doen.",
    subtitle:
      "Bekijk restaurantmenu analytics in real-time — QR scans per uur, de gerechten waar gasten bij blijven hangen, de talen die toeristen gebruiken, de traagste weekdag — en gebruik die data om minder menu's te printen, slimmer te plannen, de juiste specials te pushen.",
    trustLine: "4.9 · 500+ restaurants in 30+ landen",
  },

  seo: {
    description:
      "Restaurant analytics die geen data team vereisen. IQ Rest tracked elke scan, view, taalwissel en bestelling vanuit je QR menu, en brengt de patronen naar boven die ertoe doen: meest bekeken gerechten, piekuren van scannen, drukste dag van de week, taaluitsplitsing van je toeristenpubliek. Maak datagedreven beslissingen zonder ooit een spreadsheet te openen.",
    fullDescription:
      "De meeste restaurants draaien op intuïtie — « we hebben het gevoel dat dinsdagen rustig zijn », « ik denk dat de pasta goed verkoopt ». Intuïtie is goed, maar data is beter. IQ Rest tracked elke interactie met je QR menu zodat je niet hoeft te gokken: hoe vaak je QR vandaag is gescand, welke gerechten gasten het langst hebben bekeken, welke gerechten ze in het winkelmandje stopten maar niet bestelden, welke taal toeristen gebruikten.\n\nHet analytics dashboard brengt de antwoorden naar boven in drie weergaven: vandaag (live scans, huidige bestellingen, wat er nu wordt besteld), deze week (top 10 gerechten, drukke uren, taaluitsplitsing, no-shows op reserveringen), en trends (groei maand op maand, seizoensgebondenheid, weekdagpatronen). Je kunt inzoomen op elk gerecht om te zien hoe vaak het wordt bekeken vs besteld (een gerecht 200 keer bekeken maar 5 keer besteld heeft een copy- of foto-probleem), of op elke taal om te zien welke toeristenmix je daadwerkelijk bedient.\n\nHet doel zijn beslissingen, geen dashboards: « volgende dinsdag is historisch traag → start een happy hour push notificatie », « Italiaanse toeristen bestellen 3x meer pasta dan locals → zet pasta vooraan wanneer taal=it », « dit gerecht heeft 90% view rate maar 5% order rate → verbeter de foto ». Echte veranderingen, echte omzet, geen MBA vereist.",
    benefitsHeading: "Waarom restaurants houden van IQ Rest analytics boven Google Analytics",
    benefits: [
      "Live QR scan teller — zie je avond zich vullen in real-time",
      "Top bekeken en bestelde gerechten — herken wat werkt en wat niet",
      "Taaluitsplitsing — weet welke toeristen in je eetzaal zijn",
      "Piekuren en weekdagpatronen — plan slimmer, prep slimmer",
      "View-naar-bestelling conversie per gerecht — fix slechte foto's en zwakke beschrijvingen",
      "Reserverings-analytics — boekingsbronnen, no-show rate, party-size mix",
    ],
  },

  pricing: {
    heading: "Eén plan.",
    headingAccent: "Volledige analytics inbegrepen.",
    sub: "Restaurant analytics, QR bestellen, AI vertaling en reserveringen — alles in één vaste prijs. Geen premium tier voor data, ooit.",
  },

  faq: {
    sub: "Alles wat restauranthouders vragen over menu-analytics. Niet jouw vraag erbij? Stuur ons een bericht op WhatsApp — echte mensen antwoorden.",
    items: [
      {
        q: "Wat kan ik daadwerkelijk zien in het analytics dashboard?",
        a: "Live QR scans (vandaag, deze week, deze maand), meest bekeken gerechten, meest bestelde gerechten, view-naar-bestelling conversie per gerecht, taaluitsplitsing van gasten, piekuren per dag van de week, gemiddelde bestelwaarde, drukste tafels, no-show rate van reserveringen en trends in de tijd. Allemaal op één dashboard, geen setup nodig.",
      },
      {
        q: "Hoe gebruik ik dit om daadwerkelijk omzet te laten groeien?",
        a: "Drie patronen werken voor de meeste restaurants: (1) herorden het menu zodat de best-converterende gerechten eerst verschijnen; (2) fix de foto of beschrijving op gerechten met veel views maar weinig bestellingen; (3) push een happy-hour of special op historisch trage weekdagen/uren. We hebben restaurants weekdagomzet zien verhogen met 15–30% alleen al door deze drie veranderingen.",
      },
      {
        q: "Is dit anoniem of tracken jullie individuen?",
        a: "Anoniem en geaggregeerd. We tracken menu-views en bestellingen per sessie, niet per identificeerbare gebruiker. Geen e-mails, geen telefoonnummers, geen IP-adressen langdurig opgeslagen. Het dashboard toont je patronen (« 200 scans op vrijdag »), geen mensen. Volledig GDPR-conform by design.",
      },
      {
        q: "Kan ik de data exporteren?",
        a: "Ja. Exporteer elke weergave als CSV (top gerechten, dagelijkse scans, uitsplitsing per uur, enz.) en open in Excel of Google Sheets. Handig voor delen met investeerders, accountants, of voor het combineren met je POS-data.",
      },
      {
        q: "Heb ik technische setup nodig om analytics te krijgen?",
        a: "Nul. Analytics staat standaard aan vanaf het moment dat je QR menu live is — elke scan, view en bestelling wordt automatisch gevolgd. Het dashboard maakt deel uit van het standaardabonnement, geen upsell, en je ziet bruikbare data binnen je eerste dag van scannende gasten.",
      },
    ],
  },

  finalCta: {
    heading: "Stop met gokken.",
    headingAccent: "Begin met meten.",
    sub: "Live QR scan analytics, top gerechten, piekuren, toeristentaaluitsplitsing. 14 dagen gratis proef, geen creditcard.",
  },
};
