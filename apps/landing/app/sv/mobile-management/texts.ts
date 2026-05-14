import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Driv din restaurang från telefonen — mobil restaurangkontrollpanel",
    description:
      "Lägg till rätter, ändra priser, ladda upp foton, se beställningar — allt från telefonen. Hela IQ Rest-panelen är mobile-first. Ingen dator behövs, någonsin.",
    canonical: "https://iq-rest.com/sv/mobile-management",
    ogLocale: "sv_SE",
    ogTitle: "Mobil restauranghantering — driv din meny från telefonen",
    ogDescription:
      "Uppdatera priser mellan borden. Ladda upp foton från kameran. Se livebeställningar i köket. Hela IQ Rest-panelen körs på din telefon.",
  },

  hero: {
    title: "Driv restaurangen från telefonen. Mellan borden.",
    subtitle:
      "Hela IQ Rest-panelen är byggd mobile-first — lägg till rätter, byt foton, ändra priser och läs livebeställningar från samma telefon i förklädesfickan. Ingen laptop, ingen kontorsdator i köket bak, inga ursäkter.",
    trustLine: "500+ restauranger i 30+ länder",
  },

  seo: {
    description:
      "Restaurangägare sitter inte vid ett skrivbord — de står bakom baren, i köket, på golvet. IQ Rest är byggt för den verkligheten. Varje funktion i panelen, från att lägga till nya rätter till att se livebeställningar, är designad för tummar och små skärmar först. Om du kan använda Instagram kan du driva hela din restaurang från IQ Rest på telefonen.",
    fullDescription:
      "De flesta restaurangsystem är desktop-first med en 'mobilversion' tillagd som eftertanke — pyttesmå knappar, trasiga layouter och funktioner gömda tre menyer ner. IQ Rest är designad tvärtom: varje skärm fungerar perfekt på en telefon, och desktopversionen är bara samma gränssnitt uppskalat.\n\nVad det betyder i praktiken: ta ett foto av dagens special med din telefonkamera och ladda upp det direkt i menyn. Se en stavfel i en rättbeskrivning medan du dukar av ett bord — fixa det på plats, ändringen är live på sekunder. Kock som går? Ta rätten offline från telefonen innan nästa gäst skannar din QR. Ny rätt från köket? Tryck, skriv, knäpp ett foto, sätt ett pris — gäster kan beställa den 30 sekunder senare.\n\nSamma gäller beställningar, bokningar, analys och översättningar. Live-orderlistan uppdateras i realtid. Bokningsbekräftelser är ett tryck. Daglig omsättning, toppställrätter och travlaste timmar får plats på en telefonskärm. Du behöver aldrig gå in på bakkontoret för att hantera något igen.",
    benefitsHeading: "Varför mobile-first hantering förändrar allt",
    benefits: [
      "Full panelåtkomst på vilken smartphone eller surfplatta som helst — ingen app att installera",
      "Ladda upp rättfoton direkt från telefonkameran med två tryck",
      "Uppdatera priser, beskrivningar, öppettider varifrån som helst",
      "Touch-vänlig drag-och-släpp för kategorier och rättordning",
      "Livebeställningar, bokningar och analys får plats på en telefonskärm",
      "Fungerar offline-tolerant — slutför redigering, synkar när du återansluter",
    ],
  },

  pricing: {
    heading: "En plan.",
    headingAccent: "Driv från telefonen.",
    sub: "Mobile-first panel plus QR-meny, onlinebeställning, AI-översättning och bokningar — allt i ett fast pris.",
  },

  faq: {
    sub: "Allt restaurangägare frågar om mobil hantering. Ser du inte din? Skicka oss ett meddelande på WhatsApp — riktiga människor svarar.",
    items: [
      {
        q: "Måste jag installera en mobilapp?",
        a: "Nej. IQ Rest körs i din telefons webbläsare — Safari, Chrome, vad du redan använder. Du kan lägga till den på din hemskärm för en-tryck-åtkomst (det kommer kännas som en native app), men det finns inget att ladda ner från App Store, inga behörigheter att ge, inga versionsuppdateringar att bevaka.",
      },
      {
        q: "Kan jag verkligen ladda upp menyfoton direkt från telefonen?",
        a: "Ja — det är hela poängen. Tryck 'lägg till foto' på en rätt, telefonens kamera öppnas, knäpp eller välj från galleriet, tryck ladda upp. Bilden ändrar storlek automatiskt, optimeras för webben och är live på din meny på sekunder. Ingen Lightroom, inga filöverföringar till en dator, ingen SFTP.",
      },
      {
        q: "Fungerar det på surfplattor och i receptionen?",
        a: "Ja. Panelen är optimerad för telefoner, surfplattor och stationära datorer — samma gränssnitt, samma genvägar, samma hastighet. Många restauranger kör en iPad i värdpasset för bokningar, en telefon i kockens ficka för beställningar och en laptop i bakkontoret för fakturering — alla med samma inloggning.",
      },
      {
        q: "Vad gäller att uppdatera priser under upptagen service?",
        a: "Designad för det. Tryck på en rätt, redigera priset, spara — gäster ser det nya priset inom sekunder utan att uppdatera. Ingen ompublicering, ingen ombyggnad, ingen synkfördröjning. Samma gäller att markera en rätt som 'slutsåld' (den blir grå direkt på menyn) eller att lägga till en daglig special mellan rusningarna.",
      },
      {
        q: "Vad om min telefon dör mitt i redigeringen?",
        a: "Ändringar sparas per fält medan du skriver — om telefonen dör eller internet faller, hittar du dina ändringar när du loggar in igen på vilken enhet som helst. Inget förlorat arbete.",
      },
    ],
  },

  finalCta: {
    heading: "Driv det från förklädesfickan.",
    headingAccent: "Hoppa över bakkontoret.",
    sub: "Hela panelen får plats i din telefon. 14 dagars gratis provperiod, inget kreditkort, ingen app att installera.",
  },
};
