import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Ændringslog — IQ Rest opdateringer og nye funktioner",
    description:
      "Hver udgivelse af IQ Rest på ét sted. Nye funktioner, AI-forbedringer og produktlanceringer for restaurant QR-menuer, online bestillinger og reservationer.",
  },
  pageTitle: "Ændringslog",
  pageSubtitle:
    "Hver opdatering vi udgiver for at gøre din restaurants QR-menu, online bestillinger og reservationer mere smidige. Nyeste først.",
  readMore: "Læs mere",
  backToList: "Tilbage til ændringslog",
  publishedOn: "Udgivet",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "AI-rettesfotos til restaurant QR-menu | IQ Rest",
        description:
          "Generér stilistisk konsistente rettesfotos til hele din QR-menu med ét klik. Ingen stockfotos, ingen fotograf, ingen redigering.",
      },
      title: "AI-genererede rettesfotos til hele din QR-menu",
      subtitle:
        "Stop med at lede i stockgallerier og planlægge fotosessioner. IQ Rest genererer nu et komplet sæt mundvandende rettesfotos i én konsistent stil — direkte fra dine retternavne.",
      intro:
        "At fotografere hver ret på menuen er dyrt, langsomt og sjældent konsistent. Stockfotobiblioteker efterlader huller, og stilen passer aldrig helt til dit brand. IQ Rest lukker det hul med indbygget AI-rettsfotografering: skriv et retnavn, få et højkvalitetsfoto der matcher resten af din menus look. Hvert billede genereres specifikt til dig, dimensioneret til både QR-menuen og printbare formater.",
      sections: [
        {
          title: "Én fotostil på tværs af hele menuen",
          body: "Når gæster scroller gennem en menu, ødelægger umatchede stilarter oplevelsen — én lys, én dyster, én skudt fra oven, én fra siden. IQ Rest genererer hvert foto i én brand-konsistent stil: samme lysretning, samme tallerkensprog, samme baggrundsstemning. Resultatet føles som en rigtig fotosession, bortset fra at hver ret blev renderet i det øjeblik du tilføjede den til menuen. Når du tilføjer nye retter, bevares stilen automatisk.",
        },
        {
          title: "Fra retnavn til tallerken på sekunder",
          body: "Der er intet at briefe. Du tilføjer en ret — sig „Trøffel-tagliatelle med vilde svampe“ — og IQ Rest skaber fotoet bag kulisserne. Billedet uploades til din menu, optimeres som WebP, og er klar til visning før du er færdig med at tilføje den næste ret. Hvis et foto ikke helt matcher hvad du havde i tankerne, regenerer det med ét tryk. Hver restaurant får gratis AI-genereringer for at starte, med overkommelige opfyldninger hvis du vil have fotos til en hel 80-rettes menu.",
        },
        {
          title: "Optimeret til mobil og SEO",
          body: "Hvert genereret billede er kodet som komprimeret WebP med 80% kvalitet, derefter serveret fra et Hetzner CDN i Nürnberg med smart subsampling. Sider forbliver hurtige på 4G, ingen skeletter, ingen layoutskift. Fotoene er også indekserbare af Google Images — gæster der søger dine retternavne via foto kan finde din menu direkte.",
        },
      ],
      benefitsTitle: "Hvorfor AI-rettesfotos betyder noget",
      benefits: [
        "Ingen stockfoto-abonnementer og ingen fotografgebyrer",
        "Brand-konsistent stil på tværs af hver ret på menuen",
        "Nye retter får automatisk et matchende foto",
        "Komprimeret WebP — hurtigt på mobil, ingen layout-spring",
        "Gratis genereringer inkluderet med hver plan",
        "Regenerér ethvert foto med ét tryk indtil det er perfekt",
      ],
      conclusionTitle: "Et foto til hver ret, uden produktionen",
      conclusionBody:
        "Restauranter der inkluderer fotos sælger flere højmargin-retter — det er ikke et gæt, det er velkendt indtægtsmekanik. Grunden til at de fleste menuer ikke har fotos er produktionsomkostningerne. IQ Rest fjerner den omkostning helt. Hver ret du tilføjer får et smukt, brand-tilpasset foto før du er færdig med opsætningen. Par det med QR-bestilling og se opsalgsraterne stige uden at løfte et kamera.",
      ctaText: "Generér AI-fotos til hver ret på din menu — gratis under din prøveperiode.",
      ctaButton: "Prøv det gratis",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "AI-restaurantcover baggrundsgenerator | IQ Rest",
        description:
          "Auto-generér et smukt restaurant coverbillede til din QR-menu på sekunder. Matcher dit køkken, stemning og brand — ingen stockfotos.",
      },
      title: "AI-genereret restaurantcover baggrund",
      subtitle:
        "Din QR-menu åbner med den rigtige stemning før gæster scroller. IQ Rest genererer nu en tilpasset coverbaggrund der matcher dit køkken og atmosfære — automatisk.",
      intro:
        "Førstehåndsindtryk betyder noget, især når gæster scanner en QR-kode ved bordet. Et generisk coverbillede underminerer alt hvad du har brugt på interiørdesign. IQ Rest genererer nu et unikt, atmosfærisk coverbillede til hver restaurant — baseret på køkkenet du vælger under tilmelding. Italiensk trattoria, japansk izakaya, spansk tapasbar — hver får et cover der føles rigtigt.",
      sections: [
        {
          title: "Skræddersyet til dit køkken og stemning",
          body: "Når du fuldfører tilmeldingsguiden, tager IQ Rest køkkenet du valgte og genererer et cover der passer. Italiensk får varm trattoria-belysning og pasta i blødt fokus. Japansk får rene linjer og afbalanceret komposition. Mexicansk får levende farver og gadematenergi. Matchet er automatisk, men du kan regenerere coveret når som helst, med din egen kreative retning hvis du vil have noget specifikt.",
        },
        {
          title: "Optimeret til QR-menu hero-sektioner",
          body: "Coverbilleder genereres i det præcise billedforhold brugt af QR-menuens hero — skarpe på hver telefon, ingen akavet beskæring. De er kodet som WebP, serveret hurtigt og lazy-loaded så resten af menuen tegnes først. Coveret sætter tonen, og forsvinder så når gæster begynder at browse retter.",
        },
        {
          title: "Brandkonsistens fra kassen",
          body: "Coverbilledets stil parres automatisk med AI-rettesfoto genereret til din menu — samme lyssprog, samme farvepalet, samme stemning. Gæster opfatter din restaurant som sammenhængende og professionelt designet, selv hvis du satte det hele op på fem minutter fra din telefon.",
        },
      ],
      benefitsTitle: "Hvorfor et AI-cover slår stock",
      benefits: [
        "Unik for din restaurant — ikke et stockfoto hvert andet sted bruger",
        "Matchet til køkkenet du valgte under tilmelding",
        "Samme visuelle sprog som dine AI-genererede rettesfotos",
        "Korrekt størrelse til QR-menuens hero — ingen manuel beskæring",
        "Komprimeret WebP til hurtig mobilindlæsning",
        "Regenerér når som helst med ét tryk",
      ],
      conclusionTitle: "Et cover der siger 'Vi ved hvad vi laver'",
      conclusionBody:
        "Når en gæst scanner din QR-kode, er det første de ser dit cover. Et poleret, atmosfærisk billede signalerer kvalitet før de læser et eneste retnavn. Med IQ Rest er den polering automatisk — genereret gratis under tilmelding, og regenererbar når som helst du skifter mening. Ingen stockgallerier, intet designarbejde, bare et cover der passer.",
      ctaText: "Få et tilpasset AI-cover til din QR-menu på under et minut.",
      ctaButton: "Start gratis prøveperiode",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "3-trins tilmeldingsguide til restaurant QR-menu | IQ Rest",
        description:
          "Vælg køkken, restaurantnavn, e-mail — og IQ Rest bygger din QR-menu. Den hurtigste tilmelding i QR-menubranchen.",
      },
      title: "3-trins tilmeldingsguide: Fra e-mail til arbejdende QR-menu på under et minut",
      subtitle:
        "Vælg dit køkken. Skriv dit restaurantnavn. Bekræft din e-mail. Færdig — din QR-menu er klar, med prøveretter og AI-genererede fotos.",
      intro:
        "Restaurantejere har ikke tid til en tilmeldingsformular på 10 skærme. Så vi skar den ned til tre. Vælg køkkenet der matcher dit sted. Skriv dit restaurantnavn. Bekræft din e-mail. Når du logger ind for første gang, er din QR-menu allerede befolket med køkken-passende prøveretter og matchende AI-fotografering. Du kan servere en gæst inden 60 sekunder efter at have startet tilmelding.",
      sections: [
        {
          title: "Trin 1 — Køkkenvalg",
          body: "Vælg fra en bred liste af køkkener: italiensk, spansk, japansk, mexicansk, fransk, middelhavs, indisk, amerikansk, café, bar, pizzeria og mere. Valget driver hver standard i guiden: prøveretter, AI-coverstil, standardvaluta og startkategoristruktur. Du konfigurerer ikke noget — du vælger et udgangspunkt.",
        },
        {
          title: "Trin 2 — Restaurantnavn",
          body: "Skriv navnet som gæster vil se det. Vi bruger det overalt: QR-menuens hero, sidetitel, SEO-slug, social deling-preview. Der er ingen separat brand-navn vs visningsnavn beslutning — ét felt, én sandhedskilde. Kan springes over hvis du vil udskyde beslutningen; vi udfylder en pladsholder du kan omdøbe senere.",
        },
        {
          title: "Trin 3 — E-mail eller Google-login",
          body: "Bekræft med e-mail + engangskode, eller tryk 'Log ind med Google' for øjeblikkelig kontooprettelse. Ingen adgangskode at huske. I det øjeblik du bekræfter, kører guiden menusåkilden bag kulisserne — kategorier oprettet, prøveretter indsat, AI-fotos genereret, restaurantcover klar. Du lander direkte i dashboardet med en arbejdende menu.",
        },
      ],
      benefitsTitle: "Hvorfor 3-trins tilmelding slår en formular",
      benefits: [
        "Under 60 sekunder fra landingsside til arbejdende QR-menu",
        "Nul beslutninger du ikke kan ændre senere — bare standarder at starte fra",
        "Prøveretter forudfyldt efter køkken — øjeblikkeligt indhold at redigere",
        "AI-fotos og coverbillede klar når du logger ind",
        "Google-login mulighed — ingen adgangskode at administrere",
        "Anonym fremgang gemt hvis du forlader midt i guiden",
      ],
      conclusionTitle: "Den hurtigste QR-menuopsætning, punktum",
      conclusionBody:
        "De fleste QR-menutjenester får dig til at udfylde dusinvis af felter før du ser noget nyttigt. IQ Rest vender det om — vi giver dig en arbejdende menu først, lader dig så tilpasse. Guiden fjerner hver barriere mellem nysgerrighed og et brugbart produkt. Restauranter der fuldfører tilmelding på under 60 sekunder er dramatisk mere tilbøjelige til faktisk at publicere deres menu, tage deres første ordre og forblive abonneret.",
      ctaText: "Start 3-trins guiden nu — din menu vil være live på 60 sekunder.",
      ctaButton: "Start gratis prøveperiode",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "AI-genereret prøvemenu ved tilmelding | IQ Rest",
        description:
          "Spring den tomme tilstand over. IQ Rest auto-genererer en start-QR-menu baseret på dit køkken — kategorier, retter, priser og fotos.",
      },
      title: "AI-bygget prøvemenu lige efter tilmelding",
      subtitle:
        "Ikke mere stirring på et tomt dashboard. IQ Rest sår din konto med køkken-passende kategorier, retter og AI-fotos så du kan redigere, ikke starte fra bunden.",
      intro:
        "Den sværeste del af ethvert nyt værktøj er den tomme tilstand. Nye restaurantejere sætter sig, ser en tom menu og lukker fanen. IQ Rest fikser det ved at befolke din menu i det øjeblik du tilmelder dig. Vælg italiensk — få antipasti, pasta, pizza, dessert. Vælg japansk — få sushi, ramen, donburi, sake. Hver kategori har 6 til 10 startretter med AI-genererede fotos i en konsistent stil. Dit job bliver at redigere priser og justere navne, ikke bygge fra nul.",
      sections: [
        {
          title: "Køkken-bevidste kategorier og retter",
          body: "Sæderen dumper ikke bare tilfældige retter. Den bruger køkkenet du valgte i tilmeldingsguiden til at trække et kurateret sæt kategorier der giver mening for din restaurantstil. Et pizzeria får 'Pizza Classica', 'Pizza Speciale', 'Antipasti', 'Bevande'. En fransk bistro får 'Entrées', 'Plats principaux', 'Fromages', 'Desserts'. Startindholdet matcher konventionen spisende forventer for det køkken.",
        },
        {
          title: "Fotos og priser fra kassen",
          body: "Hver startret kommer med et AI-genereret foto i en konsistent stil og en fornuftig standardpris denomineret i din lokale valuta (auto-detekteret af geolokalisering). Priser er pladsholdere — du vil ændre dem — men de får menuen til at se rigtig ud med det samme, så du kan forhåndsvise QR-menuen og fornemme hvordan det endelige resultat vil se ud. Dette er kritisk for at vise partnere, få feedback eller bare beslutte 'ja, dette er værktøjet vi vil bruge'.",
        },
        {
          title: "Rediger, start ikke fra bunden",
          body: "Når sået, bærer hver ret et isExample-flag. Så snart du redigerer en ret — ændrer dens navn, pris eller beskrivelse — falder flaget af. De resterende eksempelretter skiller sig visuelt ud så du ved hvad der stadig er pladsholderindhold. Denne adskillelse gør det indlysende hvad der er færdigt og hvad der stadig mangler, og gør det tomme tilstandsproblem til et produktivt redigeringsflow.",
        },
      ],
      benefitsTitle: "Hvorfor en præ-bygget menu vinder",
      benefits: [
        "Nul tom tilstand — åbn dashboardet og se en arbejdende menu",
        "Kategorier og retter matcher det køkken du valgte",
        "AI-fotos til hver startret i en samlet stil",
        "Lokal valuta auto-detekteret, standardpriser på plads",
        "Eksempel-flag falmer mens du redigerer — klart fremgangssignal",
        "Vis interessenter en virkelig-udseende menu inden for minutter",
      ],
      conclusionTitle: "Spring den blanke side over",
      conclusionBody:
        "At bygge en menu fra bunden er skræmmende. At redigere en er let. IQ Rest giver dig en komplet startmenu i det øjeblik du tilmelder dig, lader dig så justere den til at matche din rigtige offering. Resultatet: flere restauranter fuldfører opsætning, flere menuer går faktisk live, flere gæster scanner QR-koder der fører til rigtige, redigerede, produktionsmenuer.",
      ctaText: "Tilmeld dig og få en fuldt bygget startmenu i dit køkken.",
      ctaButton: "Byg min menu",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interaktiv menutur for førstegangsbrugere | IQ Rest",
        description:
          "En 7-trins interaktiv guide leder nye restaurantejere gennem QR-menudashboardet — ingen dokumenter, ingen videoer, bare hands-on.",
      },
      title: "7-trins interaktiv menutur ved første besøg",
      subtitle:
        "Vi får dig ikke til at læse dokumentation. Første gang du åbner menuen, leder IQ Rest dig gennem den — tilføj kategori, tilføj ret, rediger, sortér, forhåndsvis, del, alt i syv tryk.",
      intro:
        "De fleste SaaS-produkter begraver onboarding i et hjælpcenter ingen læser. IQ Rest tager den modsatte tilgang: første gang en ny bruger lander på menusiden, fremhæver en interaktiv tur hver nøglehandling i sekvens. Tilføj en kategori. Tilføj din første ret. Rediger den. Skift synlighed. Omarrangér. Forhåndsvis live-menuen. Del med en gæst. Ved trin syv har du brugt hver funktion du vil have brug for 95% af tiden.",
      sections: [
        {
          title: "I produktet, ikke i en vidensbase",
          body: "Hvert trin af turen fremhæver det faktiske UI-element på din skærm. En boble forklarer hvad elementet gør og hvorfor det betyder noget. Der er ingen skærmbilleder — skærmbilledet ER dit dashboard. Mens du trykker, lærer du ved at gøre, ikke ved at læse. Spring over når som helst; turen vedvarer på tværs af sessioner indtil du fuldfører den eller afviser den permanent.",
        },
        {
          title: "Designet omkring det rigtige workflow",
          body: "De syv trin er ikke en funktionsdumping — de mapper til workflowet en ny restaurant faktisk udfører. Tilføj kategorier først (drikkevarer, hovedretter, desserter), så retter, så forfin hver ret, så organisér rækkefølgen de vises i, så forhåndsvis for at sikre det ser rigtigt ud, så del via QR. Til sidst har du fuldført løkken fra tom menu til QR-kode på et trykt bordkort.",
        },
        {
          title: "Lokaliseret på 35 sprog",
          body: "Turteksten er oversat til hvert sprog IQ Rest understøtter — samme som resten af dashboardet. Spansktalende ejere får spanske bobler, tyske ejere får tysk, katalanske ejere får katalansk. Intet i turen antager engelsk læsefærdighed.",
        },
      ],
      benefitsTitle: "Hvorfor en in-product tur slår et hjælpcenter",
      benefits: [
        "Lær ved at gøre, ikke ved at læse dokumenter",
        "7 trin dækker ~95% af workflowet",
        "Afvis når som helst — blokerer aldrig dashboardet",
        "Vedvarer på tværs af sessioner indtil fuldført eller sprunget over",
        "Lokaliseret på 35 sprog — ingen engelsk påkrævet",
        "Ingen videoer at indlæse — øjeblikkelig, native UI-overlay",
      ],
      conclusionTitle: "Fra forvirret til selvsikker i syv trin",
      conclusionBody:
        "Det sværeste øjeblik i ethvert produkt er de første 30 sekunder. Brugeren åbner dashboardet, kigger sig omkring, og enten forstår det eller springer fra. IQ Rests interaktive tur fjerner den risiko — inden for et minut ved hver ny bruger hvor man tilføjer en ret, hvordan man forhåndsviser, hvordan man deler. Tursfuldførelse korrelerer stærkt med succesfuld menupublikation. Vi underviser ikke bare produktet — vi får menuen live.",
      ctaText: "Tilmeld dig og bliv ført gennem din første QR-menu i syv tryk.",
      ctaButton: "Start gratis prøveperiode",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Landlandingssider for restaurant QR-menu | IQ Rest",
        description:
          "Besøgende fra Spanien ser en landingsside skræddersyet til spanske restauranter. Frankrig ser fransk. 35 lande, 35 konverteringstunede sider.",
      },
      title: "Tilpasset landingsside på hvert sprog",
      subtitle:
        "Besøgende får ikke længere en auto-oversat side. Hvert af de 35 understøttede sprog har sin egen landingsside, skrevet til det marked.",
      intro:
        "Auto-oversatte landingssider konverterer dårligt. Grammatikken er forkert, de kulturelle referencer er forkerte, og de lokale betalingsbetingelser føles importerede. IQ Rest sender nu en unik landingsside for hvert af de 35 understøttede sprog — skrevet til markedet, ikke bare oversat. Spanske besøgende får en side om restaurantes y cafeterías. Franske besøgende får cafés et bistrots. Tyske besøgende får Restaurants und Imbisse. Hver side leder med værdiforslaget der betyder mest for det publikum.",
      sections: [
        {
          title: "Én side pr. sprog, ikke auto-oversættelse",
          body: "Hver landing lever på /<locale> som en selvstændig Next.js-rute. Teksterne er i TypeScript-objekter — versioneret, type-tjekket, uafhængigt deploybar. Vi kan A/B-teste en spansk hero-variant uden at røre tysk. Vi kan lokalisere et prisopkald for brasiliansk real uden at påvirke euromarkeder. Resultatet er hurtigere iteration på landings der driver faktisk konvertering.",
        },
        {
          title: "Geolokalisering omdirigerer besøgende automatisk",
          body: "Første gang en besøgende lander på iq-rest.com, læser vores nginx geo-modul deres landekode og omdirigerer til den rigtige /<locale>. Spanske IP'er lander på /es. Tyske lander på /de. Brasilien lander på /pt. Vi router endda katalansktalende dele af Spanien til /ca i stedet for /es. Besøgende ser aldrig en 'vælg dit sprog' modal — de ser deres sprog som standard.",
        },
        {
          title: "Brand-brede hreflang og kanoniske tags",
          body: "Alle 35 landings refererer til hinanden via hreflang-tags så Google indekserer den rigtige for hver forespørgsel. Kanoniske URL'er peger på pr.-locale-URL'en, ikke en generisk rod. Opsætningen følger Googles internationale SEO-retningslinjer nøjagtigt, så hver landing konkurrerer på sit eget sprog uden at kannibalisere de andre.",
        },
      ],
      benefitsTitle: "Hvorfor pr.-land landings konverterer bedre",
      benefits: [
        "Native frasering på hvert marked — ikke auto-oversat",
        "Geo-routing serverer den rigtige side automatisk",
        "Hreflang og kanoniske tags følger Googles retningslinjer",
        "Katalanske besøgende i Catalonien ser katalansk, ikke kastiliansk",
        "Valuta, prissætning og CTA'er lokaliseret pr. marked",
        "Uafhængig A/B-test pr. locale uden krydskontaminering",
      ],
      conclusionTitle: "35 sprog, 35 hoveddøre",
      conclusionBody:
        "Hvis en spansk restaurantejer lander på en halv-oversat engelsk side med amerikansk-stil prissætning, springer de fra. Hvis de lander på en side der taler til dem på spansk, med eurpriser og spanske referencer, konverterer de. IQ Rest gør nu det andet på hvert marked vi server — 35 landings, 35 konverteringstunede hoveddøre, alle automatisk geo-routet.",
      ctaText: "Prøv IQ Rest på dit sprog — landing skræddersyet til dit marked.",
      ctaButton: "Åbn mit sprog",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Log ind med Google for restaurant QR-menu dashboard | IQ Rest",
        description:
          "Spring adgangskoder og e-mailkoder over. Tryk 'Log ind med Google' for at få adgang til din restaurants QR-menu dashboard på et sekund.",
      },
      title: "Log ind med Google — Adgang med ét tryk til din QR-menu",
      subtitle:
        "Spring OTP-e-mails og glemte adgangskoder over. Tryk 'Fortsæt med Google' og du er inde i dashboardet på under et sekund.",
      intro:
        "E-mail + engangskode autentificering er sikker, men langsom. Skriv din e-mail, vent på koden, skift til din indbakke, kopier koden, indsæt, send. Det er et 30-sekunders flow i bedste fald. IQ Rest tilbyder nu Log ind med Google som et alternativ: tryk på en knap, vælg din Google-konto, du er inde. Ingen adgangskode at glemme, ingen indbakke-rundtur, ingen friktion.",
      sections: [
        {
          title: "Native Google OAuth, ikke en omdirigeringsløkke",
          body: "Vi bruger Googles officielle Identity Services SDK med One Tap UI på understøttede browsere. Flowet sker i en native popup, ikke en omdirigering til Googles domæne og tilbage. Det hele tager omkring et sekund efter det første tryk. Vi verificerer Google ID-tokenet server-side mod Googles offentlige nøgler, så flowet er kryptografisk sikkert end-to-end.",
        },
        {
          title: "Samme konto, enhver metode",
          body: "Hvis du tilmeldte dig med e-mail-OTP og senere vælger Google, linker vi kontiene efter e-mail. Du kan skifte mellem metoder ved hver login. Der er ingen 'separat Google-konto' at administrere, og du mister ikke din menu ved at logge ind anderledes. Vi videresender også dit dashboard-locale under Google-login så e-mails til din konto går på det rigtige sprog fra dag ét.",
        },
        {
          title: "Mobile-First — Virker på iOS Safari og Android Chrome",
          body: "Googles officielle SDK har historisk været skrøbelig på mobil. Vi designede rundt om det ved at overlay en rigtig Google-knap oven på vores UI i stedet for at udløse programmatiske klik (som iOS Safari nu blokerer). Resultatet: knappen virker på hver moderne telefonbrowser, ingen installation, ingen app-butik.",
        },
      ],
      benefitsTitle: "Hvorfor Google-login slår e-mail OTP",
      benefits: [
        "Ét tryk for at logge ind — ingen e-mail rundtur",
        "Ingen adgangskode at huske eller nulstille",
        "Samme konto uanset om du bruger e-mail eller Google",
        "Kryptografisk verificeret server-side via Google ID-token",
        "Virker pålideligt på iOS Safari og Android Chrome",
        "Locale videresendt så e-mails forbliver på dit sprog",
      ],
      conclusionTitle: "Den hurtigste vej tilbage til dit dashboard",
      conclusionBody:
        "Restaurantejere tjekker deres menuer dusinvis af gange om ugen — mellem services, efter et trykjob, ved justering af priser. Hvert sekund sparet på login akkumuleres. Google-login forvandler et 30-sekunders OTP-flow til et ét-sekunds tryk. E-mail-OTP forbliver tilgængelig for ejere der foretrækker det, men de fleste brugere vil vælge Google efter at have prøvet det én gang.",
      ctaText: "Spring adgangskoden over — log ind med Google på ét tryk.",
      ctaButton: "Åbn dashboard",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Flersprogede e-mailnotifikationer på 35 sprog | IQ Rest",
        description:
          "Prøveperiode-påmindelser, support-svar, abonnement-e-mails — hver notifikation IQ Rest sender ankommer på dit dashboard-sprog.",
      },
      title: "Flersprogede e-mailnotifikationer på alle 35 sprog",
      subtitle:
        "Hver e-mail IQ Rest sender — support-svar, prøveperiode-påmindelser, abonnement-kvitteringer — ankommer på det sprog du har sat i dit dashboard. Inklusive højre-til-venstre layouts.",
      intro:
        "En e-mail på det forkerte sprog er friktion i bedste fald, sletning i værste. IQ Rest sender nu hver transaktionel e-mail på det sprog du har sat i dit dashboard, på tværs af alle 35 understøttede locales. Velkomst-e-mails, prøveperiode-udløbende påmindelser, abonnement-bekræftelser, support-svar — alle ankommer på dit sprog, med korrekt grammatik og kulturelt passende frasering. Højre-til-venstre sprog som arabisk og persisk får korrekt spejlede layouts.",
      sections: [
        {
          title: "preferredLocale rejser med din konto",
          body: "Hver bruger har et preferredLocale-felt sat første gang de logger ind. Uanset om du tilmeldte dig via e-mail-OTP, Google eller via guiden, fanges dit locale og vedvarer. Hver backend-job der udsender en e-mail — Stripe webhooks, support-svar-notifikationer, planlagte cron-opgaver — trækker brugerens preferredLocale og bruger det til at vælge den rigtige skabelon. Skift locale i dashboardet og den næste e-mail afspejler ændringen.",
        },
        {
          title: "RTL-skabeloner til arabisk og persisk",
          body: "Højre-til-venstre layouts er ikke bare oversættelse — hele det visuelle hierarki vender. Vi sender dedikerede RTL-skabeloner til arabisk og persisk: navigation flyder højre-til-venstre, tal i arabisk-indisk hvor passende, brand-logo positioneret korrekt. Resultatet er en e-mail der føles native for RTL-læsere, ikke en oversat LTR-skabelon med brudt justering.",
        },
        {
          title: "Oversat af eksperter i restaurantbranchen",
          body: "Generiske oversættelsestjenester producerer bogstavelige men stive oversættelser. Vi oversatte hver skabelon ved hjælp af køkken- og hospitality-terminologi der lyder naturligt for restaurantoperatører på hvert marked. 'Trial' bliver 'período de prueba' på spansk (ikke 'juicio'). 'Reservation' bliver 'Reservierung' på tysk (ikke 'Reservation'). Detaljeniveauet akkumuleres — restauranter bemærker når et værktøj taler deres sprog korrekt.",
        },
      ],
      benefitsTitle: "Hvorfor flersprogede e-mails betyder noget",
      benefits: [
        "Alle transaktionelle e-mails på dit dashboard-sprog",
        "preferredLocale vedvarer på tværs af logins",
        "RTL-layouts til arabisk og persisk",
        "Hospitality-passende terminologi pr. sprog",
        "Skift af locale opdaterer fremtidige e-mails øjeblikkeligt",
        "35 sprog inklusive katalansk, slovensk, estisk, lettisk",
      ],
      conclusionTitle: "E-mails der taler dit sprog",
      conclusionBody:
        "Kommunikation der lander på det forkerte sprog er kommunikation der ikke virker. IQ Rest sender hver e-mail på det sprog du faktisk bruger, med layoutet og terminologien der passer. Det lyder lille indtil du er en spansk restaurantejer der får en engelsk-kun prøveperiode-udløbsalarm og misser den. Nu ikke.",
      ctaText: "Tilmeld dig og få dit dashboard plus hver e-mail på dit sprog.",
      ctaButton: "Start gratis prøveperiode",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "iOS-native følelse for mobilt restaurant dashboard | IQ Rest",
        description:
          "Bundfaneblad-navigation, sikker-zone-håndtering, ingen-zoom inputs — IQ Rest mobil-dashboard føles som en native app på iPhone.",
      },
      title: "iOS-native følelse på din telefon",
      subtitle:
        "Bundfaneblad-navigation, fuld sikker-zone-bevidsthed, ingen-zoom formularinputs og øjeblikkelige sideovergange. At administrere din QR-menu på en telefon føles nu som at bruge en native iOS-app.",
      intro:
        "De fleste SaaS-restaurant-dashboards er desktop-first eftertanker på mobil. IQ Rest er det modsatte — designet til ejere der kører deres menu fra deres telefon mellem services. Mobil-dashboardet bruger nu bundfaneblad-navigation, respekterer iPhone sikker-zone-insets, forhindrer iOS-formularinput zoom og bruger næsten øjeblikkelige SPA-overgange. Det ser ud og føles som en native app, bortset fra at der ikke er nogen app at installere.",
      sections: [
        {
          title: "Bundfaneblad-navigation, ikke en hamburger",
          body: "Hamburger-menuer på mobil er langsomme — tryk for at åbne, tryk på elementet, vent på siden. Vi erstattede desktop-sidebaren med en bundfaneblad-bjælke på telefoner: Menu, Ordrer, Reservationer, Indstillinger. Et tommelfingervenligt tryk, øjeblikkelig navigation. Det aktive faneblad bruger din brand-accentfarve så den aktuelle placering altid er åbenbar.",
        },
        {
          title: "Sikker-zone-insets og Home-indikator",
          body: "Moderne iPhones har en Home-indikator i bunden og en notch i toppen. Web-apps der ignorerer dette ender med deres UI overlapppende indikatoren eller skjult bag notchen. Vi bruger env(safe-area-inset-*) overalt — bundnavigationen sidder over Home-indikatoren, indholdspolstring tager højde for dynamic island. Resultatet føles designet til enheden, ikke tilpasset fra en desktop-browser.",
        },
        {
          title: "Ingen-zoom inputs og øjeblikkelig formularaflevering",
          body: "iOS Safari zoomer formularer med inputskriftstørrelse under 16px. Vi hævede hvert input til 16px og konfigurerede viewport med maximum-scale=1, så tryk ikke udløser zoom-og-spring der ødelægger hvert andet web-dashboard. Formularafleveringer er server actions med optimistisk UI — ændringen vises øjeblikkeligt, netværket bekræfter i baggrunden.",
        },
      ],
      benefitsTitle: "Hvorfor native følelse betyder noget på mobil",
      benefits: [
        "Bundfaneblad-nav — adgang med ét tryk til hver sektion",
        "Sikker-zone-bevidst — ingen overlapning med Home-indikator eller notch",
        "16px inputs — ingen iOS zoom-og-spring på formulartryk",
        "Aktivt faneblad bruger din brand-accentfarve",
        "SPA-overgange — ingen fulde sidereindlæsninger mellem sektioner",
        "Ingen app at installere — virker i Safari og Chrome",
      ],
      conclusionTitle: "Et web-dashboard der føles som en app",
      conclusionBody:
        "Linjen mellem web og native er for det meste et spørgsmål om opmærksomhed på detaljer. IQ Rests mobil-dashboard betaler den opmærksomhed — bundnav, sikker zone, ingen zoom, øjeblikkelige overgange — og resultatet er noget du ville sværge blev bygget med Swift. Bortset fra at det også virker på Android, og der er intet at installere eller opdatere gennem en app-butik.",
      ctaText: "Åbn IQ Rest på din telefon og mærk forskellen.",
      ctaButton: "Prøv gratis i 14 dage",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "GDPR cookie-samtykke banner for restaurant-website | IQ Rest",
        description:
          "Lovligt samtykke-banner, AEPD-tilpasset, uden tredjeparts-scripts. Cookieless analytics udløser selv før samtykke.",
      },
      title: "GDPR-kompatibelt cookie-samtykke banner",
      subtitle:
        "Tilpasset bygget samtykke-banner uden tredjeparts CMP, ingen script-tag fra Cookiebot eller OneTrust. Tilpasset AEPD og ePrivacy-vejledning, med cookieless analytics der udløser før samtykke.",
      intro:
        "Hvert kommercielt website i EU har brug for et cookie-samtykke banner. De fleste bruger tredjeparts CMP'er der trækker tunge scripts ind og bremser siden. IQ Rest byggede sit eget, letvægts, AEPD-tilpassede samtykke-banner der er en del af side-bundtet — ingen ekstra DNS-opslag, ingen tredjepartssporing. Besøgende ser et klart Accept / Afvis valg, med begge knapper stylet ens (det mørke mønster med at skjule 'afvis' er ulovligt i mange EU-lande — vi gør det ikke).",
      sections: [
        {
          title: "AEPD og ePrivacy-tilpasset",
          body: "Spansk AEPD og det bredere ePrivacy-direktiv kræver Accept- og Afvis-knapper med lige fremtrædenhed. Mange CMP'er tilbyder et mørkt mønster standard 'kæmpe accept, lille afvis'. Vi afviser det mønster — begge knapper er samme størrelse, samme stil, bare forskellige farver. Besøgende der afviser spores kun via cookieless aggregerede tællere; vi gemmer aldrig en identifikator på deres enhed, så ingen first-party cookie forbliver efter en afvisning.",
        },
        {
          title: "Ingen tredjeparts-scripts",
          body: "De fleste samtykke-bannere indlæser Cookiebot, OneTrust eller lignende fra et CDN. Det tilføjer 50-100KB JavaScript, et ekstra DNS-opslag og et tredjeparts-datadelingsforhold at oplyse i din privatlivspolitik. IQ Rests banner er en del af landingsside-bundtet — ingen eksterne anmodninger, ingen tredjeparts-datadeling, hurtigere sideindlæsning.",
        },
        {
          title: "Privatliv, Cookies og Vilkår i modaler",
          body: "At klikke på 'Privatlivspolitik', 'Cookiepolitik' eller 'Vilkår' i banneret åbner en modal — ingen sidenavigation, ingen mistet scrollposition på landingen. Den fulde juridiske tekst er der, scrollbar, med korrekte overskrifter. Efter læsning, luk modalen og vælg Accept eller Afvis. Flowet er friktionsfrit for brugeren og lader os undgå ekstra side-spring der ville skade landingsside-konvertering.",
        },
      ],
      benefitsTitle: "Hvorfor vores banner slår tredjeparts-CMP'er",
      benefits: [
        "AEPD og ePrivacy tilpasset — Accept/Afvis med lige fremtrædenhed",
        "Ingen tredjeparts-scripts, ingen ekstra DNS-opslag",
        "Privatliv/Cookies/Vilkår i modaler — ingen side-spring",
        "Cookieless analytics udløser selv før samtykke — mister aldrig data",
        "First-party cookie fjernet ved Afvis",
        "Letvægts — del af landings-bundtet",
      ],
      conclusionTitle: "Compliance uden konverteringstræk",
      conclusionBody:
        "Cookie-samtykke er ikke til forhandling i EU, men det behøver ikke at bremse din side eller skade din konvertering. IQ Rests banner er hurtigt, retfærdigt og fuldt kompatibelt. Besøgende der Accepter aktiverer pr.-session analytics; besøgende der Afviser registreres stadig i vores anonyme aggregerede tællere så vi ved hvad der sker på landingen uden nogensinde at identificere dem.",
      ctaText: "Se samtykke-flowet i aktion — åbn IQ Rest i en frisk browser.",
      ctaButton: "Besøg landing",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privatliv og Vilkår i modaler — ingen side-spring | IQ Rest",
        description:
          "Privatlivspolitik, Servicevilkår og Cookiepolitik åbner nu i modaler på landingen — ingen mistet scroll, ingen ekstra navigation.",
      },
      title: "Privatliv, Vilkår og Cookiepolitik i modaler — ingen side-spring",
      subtitle:
        "Klik på ethvert juridisk link på landings- eller auth-siden og politikken åbner i en ren modal. Ingen navigation, ingen mistet scrollposition, ingen brydning af dit konverteringsflow.",
      intro:
        "Selvstændige /privacy, /terms og /cookies sider plejede at være standardmønstret — og standardfejlen. Besøgende klikkede på linket, mistede deres plads på landingen, læste politikken og glemte så at komme tilbage. Konvertering faldt. IQ Rest åbner nu alle tre juridiske dokumenter som in-page modaler: samme scrollposition bevaret, samme landings-oplevelse uafbrudt, fuld juridisk compliance opretholdt.",
      sections: [
        {
          title: "Én Modal-komponent, tre dokumenter",
          body: "Vi bruger en enkelt Modal-komponent med en switch på dokumenttypen. Åbn den fra cookie-banneret, auth-siden, footeren — samme komponent, samme scroll-låsning, samme luk-ved-escape. Den juridiske tekst lever i delte TypeScript-konstanter så opdatering af en klausul én gang propagerer til hvert sted politikken vises. Ingen duplikering, ingen drift.",
        },
        {
          title: "Modal-stak — åbn én indefra en anden",
          body: "Hvis du læser Cookiepolitikken og vil skifte til Privatlivspolitikken, åbner linket inde i modalen den næste modal ovenpå — ikke som en omdirigering. Stakken håndterer tilbage-navigation korrekt, escape lukker den øverste modal, klik udenfor afviser elegant. Interaktionen er hvad brugere forventer fra en native app.",
        },
        {
          title: "Alle 35 locales — samme single-source tekst",
          body: "Den juridiske tekst selv er på engelsk (sproget af vores juridiske entitet, autónomo registreret i Spanien), men modal-chromen — titler, lukkeknap, link-etiketter — er fuldt lokaliseret til alle 35 sprog. Besøgende på spansk, tysk, polsk eller koreansk ser en lokaliseret modal der åbner engelsk juridisk tekst, præcis som vores compliance-tilgang kræver.",
        },
      ],
      benefitsTitle: "Hvorfor modaler slår selvstændige juridiske sider",
      benefits: [
        "Ingen scroll-tab — besøgende bliver på landingen",
        "Højere konvertering — færre utilsigtede frafald",
        "Én komponent, tre dokumenter — ingen duplikering",
        "Modal-stak — åbn én indefra en anden rent",
        "Lokaliseret chrome på 35 sprog",
        "Fuld juridisk compliance bevaret",
      ],
      conclusionTitle: "Juridisk uden friktion",
      conclusionBody:
        "Advokater vil have politikken til at være læselig. Marketingfolk vil have besøgende til at konvertere. Modaler gør begge glade: politikken er ét tryk væk, fuldt læselig, uden indvirkning på landings-flowet. IQ Rests compliance-position forbliver stærk uden konverteringstrækket fra selvstændige juridiske sider.",
      ctaText: "Prøv det nye flow — åbn cookie-banneret og tryk på ethvert politik-link.",
      ctaButton: "Besøg landing",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Auto-katalansk sprog for Catalonien-besøgende | IQ Rest",
        description:
          "Besøgende fra Barcelona, Tarragona, Lleida og Girona ser automatisk IQ Rest på katalansk i stedet for kastiliansk spansk.",
      },
      title: "Auto-katalansk detektering for besøgende fra Catalonien",
      subtitle:
        "Besøgende fra Barcelona, Tarragona, Lleida og Girona lander på den katalanske version af IQ Rest som standard. Resten af Spanien får stadig kastiliansk spansk.",
      intro:
        "Catalonien har en stærk lingvistisk identitet — millioner af katalanere bruger katalansk som deres første sprog, adskilt fra kastiliansk spansk. IQ Rest respekterer nu den distinktion på geo-niveau: besøgende hvis IP geolokaliseres til en katalansk provins får /ca landingssiden automatisk. Kastiliansk spansk forbliver standarden for resten af Spanien. Besøgende kan skifte sprog når som helst via sprogmodalen i footeren.",
      sections: [
        {
          title: "Geo-detektering ved kanten",
          body: "Vi læser besøgendes land og region fra vores nginx geo-modul ved hver anmodning. Hvis landet er Spanien og regionen matcher Barcelona, Tarragona, Lleida eller Girona (eller indeholder 'Catalonia' / 'Catalunya' i regionsnavnet), omdirigerer vi dem til /ca. Ellers følger den besøgende standard land-til-locale routing og lander på den passende sprogside.",
        },
        {
          title: "Locale-cookie tilsidesætter geo",
          body: "Når du har valgt et sprog manuelt via sprog-skifteren, vedvarer dit valg i en cookie der tilsidesætter geo for fremtidige besøg. En katalansk-talende besøgende der foretrækker at læse IQ Rest på engelsk vil ikke fortsætte med at blive omdirigeret til /ca — deres eksplicitte valg vinder altid. Geo er en standard, ikke en begrænsning.",
        },
        {
          title: "Fuld katalansk oversættelse, ikke auto-oversat",
          body: "/ca landingssiden er ikke auto-oversat fra spansk — hvert ord er professionelt oversat af katalansk-talende restaurantbranche-tekstforfattere. Hospitality-terminologi, betalingsbetingelser, kulturelle referencer matcher alle hvordan en katalansk restaurantejer faktisk taler. Siden læses som om den blev skrevet til markedet, fordi den blev det.",
        },
      ],
      benefitsTitle: "Hvorfor auto-katalansk betyder noget",
      benefits: [
        "Besøgende fra Barcelona/Tarragona/Lleida/Girona ser katalansk automatisk",
        "Resten af Spanien får stadig kastiliansk spansk — ingen overrouting",
        "Manuelt sprogvalg vedvarer via cookie",
        "Fuld professionel oversættelse, ikke maskinoversættelse",
        "Geo-detektering sker ved kanten — ingen klient-side flimren",
        "Samme konverteringstunede landing som hvert andet locale",
      ],
      conclusionTitle: "Respekt for lingvistisk identitet",
      conclusionBody:
        "At standardise katalanske besøgende til kastiliansk spansk er en lille ting teknisk men en stor ting politisk og kulturelt. IQ Rests geo-routing behandler nu katalansk som et førsteklasses sprog for Catalonien-besøgende. Resultatet: et højere-konverterende landing for katalansk-talende restaurantejere, der føler sig respekteret fra det første sekund de ser vores website.",
      ctaText: "Besøg IQ Rest fra Catalonien og se siden på dit sprog.",
      ctaButton: "Åbn katalansk landing",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Prøveperiode-udløbet modal — QR-menu forbliver offentlig | IQ Rest",
        description:
          "Når din prøveperiode slutter, forsvinder din menu ikke. Gæster kan stadig scanne og se; du ser en opgraderingsmodal i dashboardet.",
      },
      title: "Prøveperiode udløbet? Din QR-menu forbliver live for gæster",
      subtitle:
        "Prøveperiode-udløb dræber ikke længere din offentlige menu. Gæster kan stadig scanne og se; kun dashboardet beder dig om at opgradere. Ingen overraskelse-nedetid midt i service.",
      intro:
        "Den gamle prøveperiode-udløbsadfærd var hård: når dine 14 dage sluttede, gik din offentlige QR-menu mørk for gæster. Hvis du tilfældigvis var midt i service, var det en katastrofe. Vi ændrede det. Nu viser prøveperiode-udløb dig en modal inde i dashboardet der beder om opgradering, men din offentlige menu fortsætter med at servicere gæster normalt. Du opgraderer når du er klar, ikke når en gæst vifter med en telefon ved QR-koden på bordet.",
      sections: [
        {
          title: "Offentlig menu forbliver live",
          body: "14-dages prøveperioden slutter stille fra gæstens perspektiv. QR-menuen, online bestilling, reservationer — alt fortsætter med at virke. Ejeren ser opgraderingsmodalen ved næste dashboard-login. Denne adskillelse betyder at prøveperiode-udløb aldrig kan bryde en service eller pinligt udsætte dig foran kunder.",
        },
        {
          title: "Modal i dashboard, ikke en hård omdirigering",
          body: "Tidligere omdirigerede prøveperiode-udløb dashboardet til en faktureringsside. Det brød dybe links og forvirrede brugere der blev kastet midt i opgaver. Nu viser vi en ren modal: 'Din prøveperiode er slut. Vælg en plan for at fortsætte med at bruge avancerede funktioner.' Modalen kan afvises; du kan fortsætte med at navigere i dashboardet, men nye handlinger der kræver en betalt plan viser inline opsalg-prompts.",
        },
        {
          title: "Forhåndsvisning altid tilgængelig",
          body: "Selv med prøveperioden udløbet kan du stadig forhåndsvise din QR-menu fra dashboardet. Vi låser dig ikke ude fra at se hvad gæster ser. Rediger menuen, forhåndsvis resultatet — kun publikations-relaterede handlinger antyder opgradering. Dette holder dashboardet produktivt selv midt i beslutning, så du ikke mister adgang mens du sammenligner planer.",
        },
      ],
      benefitsTitle: "Hvorfor en blød udløb slår en hård afskæring",
      benefits: [
        "Offentlig QR-menu forbliver live for gæster",
        "Ingen overraskelse-nedetid midt i service",
        "Modal i dashboard i stedet for tvungen fakturerings-omdirigering",
        "Forhåndsvisning altid tilgængelig uanset planstatus",
        "Inline opsalg-hints erstatter pludselige blokeringer",
        "Ejer opgraderer på sin egen tidsplan",
      ],
      conclusionTitle: "Respekter restaurantens åbningstider",
      conclusionBody:
        "Restauranter kører på stramme marginer og strammere tidsplaner. En QR-menu der går ned fordi en gratis prøveperiode udløb er værre end selve prøveperiode-grænsen — det skader tilliden. Blød udløb holder lysene tændt for gæster mens den stadig skubber ejeren mod en betalt plan. Konverteringer forbliver høje; nedetid falder til nul.",
      ctaText: "Start din 14-dages prøveperiode med vidende at din menu forbliver live uanset hvad.",
      ctaButton: "Start gratis prøveperiode",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Dish: Klarere menueditor-terminologi | IQ Rest",
        description:
          "Vi omdøbte 'Item' til 'Dish' på tværs af dashboardet. Restaurantejere skulle ikke skulle oversætte generisk SaaS-terminologi i deres hoved.",
      },
      title: "Item → Dish: Klarere terminologi på tværs af editoren",
      subtitle:
        "Vi erstattede den generiske 'Item'-etiket med 'Dish' på tværs af hver dashboard-flade. Lille ændring, stor klarhedsboost for restaurantejere der ikke taler SaaS.",
      intro:
        "Software-folk siger 'item'. Restaurantfolk siger 'dish' (ret). Mismatchet var lille men konstant — hver gang vi viste 'Add Item' måtte ejeren oversætte det i hovedet til 'Add Dish'. Vi omdøbte alt: knapper, etiketter, succes-beskeder, fejltilstande, sidetitler. Dashboardet taler nu samme sprog som folkene der bruger det.",
      sections: [
        {
          title: "Hvor omdøbningen gælder",
          body: "Hver brugervendt flade: 'Add Item' blev 'Add Dish'. 'Items'-fanebladet i menuen blev 'Dishes'. 'Item Settings' blev 'Dish Settings'. Succes-toast ('Item created') blev ('Dish created'). Formularvaliderings-fejl, brødkrummer, dashboard-overskrifter — alle opdateret. Den interne database-kolonne hedder stadig 'item' for bagudkompatibilitet, men ingen bruger ser det nogensinde.",
        },
        {
          title: "Oversat på tværs af alle 35 sprog",
          body: "Hvert sprog har sit eget korrekte ord for 'dish' der er adskilt fra 'item'. Spansk 'plato', fransk 'plat', tysk 'Gericht', italiensk 'piatto', katalansk 'plat', japansk '料理'. Vi opdaterede oversættelsesnøglen i hvert locale og verificerede at resultatet læses naturligt på hvert sprog. Ingen maskinoversættelse; modersmålstalende gennemgik hver.",
        },
        {
          title: "Standardkategori auto-oprettet også",
          body: "Mens vi var i editoren auto-oprettede vi også en standardkategori kaldet 'Menu' ved første dashboard-besøg. Gammel adfærd: ejere landede på en tom menu, måtte klikke 'Add Category' før de kunne tilføje en ret, gav ofte op. Ny adfærd: en Menu-kategori eksisterer, du trykker 'Add Dish', du redigerer øjeblikkeligt. En barriere fjernet.",
        },
      ],
      benefitsTitle: "Hvorfor terminologi betyder noget",
      benefits: [
        "'Dish' matcher hvordan restaurantejere faktisk taler",
        "Opdateret på tværs af hver dashboard-flade — knapper, etiketter, toast",
        "Oversat til alle 35 sprog af modersmålsgennemgang",
        "Standardkategori auto-oprettet — ingen tom menu at starte med",
        "Hurtigere fra tilmelding til første ret tilføjet",
        "Mindre mental oversættelse = lavere frafald i onboarding",
      ],
      conclusionTitle: "Tal brugerens sprog",
      conclusionBody:
        "Generisk SaaS-terminologi ('item', 'entity', 'object') er fint for ingeniører. Restaurantejere har brug for ord der matcher hvad de siger på arbejde. IQ Rest taler nu samme sprog som folkene der bruger det — på tværs af hver knap, etiket og notifikation — og konverteringsdataene afspejler allerede ændringen.",
      ctaText: "Tilmeld dig og tilføj din første ret på under et minut.",
      ctaButton: "Byg min menu",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Auto-standardkategori for restaurant menu-onboarding | IQ Rest",
        description:
          "Førstegangsbrugere står ikke længere over for en tom menu. IQ Rest auto-opretter en standardkategori så du kan tilføje din første ret øjeblikkeligt.",
      },
      title: "Auto-standardkategori — Spring den tomme menu over",
      subtitle:
        "Førstegangsbrugere lander på en menu med én standardkategori allerede oprettet. Tryk 'Add Dish' og start redigering. Ikke mere 'opret kategori først' barriere.",
      intro:
        "Den gamle onboarding krævede at brugere oprettede en kategori før de kunne tilføje en ret. Tomme menuer er skræmmende — mange nye brugere gav op på det punkt. IQ Rest auto-opretter nu en standard 'Menu' kategori første gang du åbner dashboardet, så den første handling du tager er at tilføje en ret, ikke at konfigurere et hierarki. Hurtigere, glattere, flere menuer faktisk bygget.",
      sections: [
        {
          title: "Standardkategori oprettet ved login",
          body: "Første gang du logger ind på et frisk dashboard, tjekker IQ Rest om du har nogen kategorier. Hvis ikke, opretter den én kaldet 'Menu' (oversat til dit locale). Kategorien er øjeblikkeligt klar til at modtage retter. Du kan omdøbe den eller tilføje flere kategorier når som helst — men du behøver ikke før du tilføjer din første ret.",
        },
        {
          title: "Omdøbt til at matche dit køkken når du bruger guiden",
          body: "Hvis du brugte 3-trins tilmeldingsguiden, genererer sæderen i stedet køkken-passende kategorier — 'Pizza', 'Pasta', 'Antipasti' for italiensk; 'Sushi', 'Ramen', 'Sake' for japansk. Auto-standard 'Menu' kategorien træder kun i kraft for brugere der sprang guiden over eller tilmeldte sig via Google direkte.",
        },
        {
          title: "Bagudkompatibel med eksisterende menuer",
          body: "Hvis du allerede har kategorier — fra tidligere brug, fra importerede data, fra sæderen — oprettes standarden ikke. Vi griber kun ind når menuen er ægte tom. Eksisterende brugere ser ingen ændring i deres menustruktur.",
        },
      ],
      benefitsTitle: "Hvorfor auto-standard fremskynder onboarding",
      benefits: [
        "Ingen 'opret kategori først' barriere for nye brugere",
        "Tryk 'Add Dish' som første handling, ikke anden",
        "Kategori navngivet på dit locale, ikke engelsk som standard",
        "Guide-flow sår stadig køkken-passende kategorier",
        "Eksisterende menuer urørt",
        "Hurtigere fra login til første ret tilføjet",
      ],
      conclusionTitle: "Eliminer den tomme tilstand",
      conclusionBody:
        "Tomme tilstande er hvor nye brugere falder fra. Hver barriere mellem brugeren og deres første produktive handling koster dig konverteringer. Auto-oprettelse af en standardkategori fjerner sådan en barriere. Det er en lille ændring med målbar indvirkning på hvor hurtigt nye restauranter når til en publikabel menu.",
      ctaText: "Tilmeld dig og start med at tilføje retter øjeblikkeligt.",
      ctaButton: "Byg min menu",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Spring restaurantnavn-trinnet over i onboarding | IQ Rest",
        description:
          "Vi droppede 'restaurantnavn'-trinnet fra onboarding. Sæt det senere i indstillinger — eller direkte fra menu-heroen du alligevel vil redigere.",
      },
      title: "Spring restaurantnavn-trinnet over i onboarding",
      subtitle:
        "Du behøver ikke at skrive dit restaurantnavn for at starte med at bygge en menu. Vi droppede det onboarding-trin — sæt navnet senere fra dashboardet eller via live menu-heroen.",
      intro:
        "Onboarding-flow der kræver information på forhånd føles som formular-udfyldning. Den gamle IQ Rest onboarding spurgte om et restaurantnavn på trin ét. Nye brugere havde ofte ikke besluttet sig for den nøjagtige stavning, brand-variant eller tegnsætning — så de sad fast før de overhovedet så dashboardet. Vi fjernede trinnet. Tilmeld dig, land i dashboardet, sæt navnet når du er klar. Menuen virker stadig fint uden det.",
      sections: [
        {
          title: "Hvad sker der når du springer over",
          body: "Hvis du springer navn-trinnet over, får restauranten en pladsholder ('Your Restaurant') der er skjult som standard på den offentlige menu. Gæster der scanner din QR ser menuen uden et navn i heroen — hvilket ærligt talt er fint for mange hurtig-service steder. Så snart du sætter navnet i indstillinger, vises det i heroen, sidetitlen, SEO-sluggen og sociale delinger.",
        },
        {
          title: "Sæt det fra hvor som helst",
          body: "Navn-feltet er redigerbart fra indstillinger, fra menu-heroen (tryk for at redigere inline) og fra den offentlige forhåndsvisningsskærm. Tre forskellige flader, ét underliggende felt. Vi gjorde det let at udskyde beslutningen og trivielt let at forpligte sig når du er klar.",
        },
        {
          title: "Ingen SEO-straf for default",
          body: "Vi bruger sluggen ('your-restaurant') som fallback for sidetitlen og SEO meta-tags indtil du sætter et rigtigt navn. Søgemaskiner straffer dig ikke — de ser bare en generisk titel. I det øjeblik du sætter et rigtigt navn, opdateres hver meta-tag og Google gencrawler inden for timer.",
        },
      ],
      benefitsTitle: "Hvorfor at springe over fremskynder onboarding",
      benefits: [
        "Intet beslutningstryk på det forkerte tidspunkt",
        "Land hurtigere i dashboardet",
        "Sæt navnet når inspiration rammer — eller når den juridiske entitet er registreret",
        "Inline redigering fra menu-heroen",
        "Offentlig menu virker fint uden navn sat",
        "Ingen SEO-straf for at bruge pladsholderen",
      ],
      conclusionTitle: "Færre beslutninger, mere gjort",
      conclusionBody:
        "Hvert formularfelt i onboarding er en chance for brugeren at falde fra. Ved at fjerne restaurantnavn-feltet fjernede vi en sådan chance. Nye brugere lander nu i dashboardet med en arbejdende menu og friheden til at navngive (eller ikke navngive) deres restaurant på deres egen tidsplan. Konverteringsløftet var øjeblikkeligt.",
      ctaText: "Tilmeld dig på sekunder — intet restaurantnavn påkrævet.",
      ctaButton: "Start gratis prøveperiode",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Prøv restaurant QR-menu før tilmelding — anonymt | IQ Rest",
        description:
          "Byg en prøvemenu før du opretter en konto. Gem din fremgang til e-mail når du vil beholde den. Ingen forpligtelse, ingen friktion.",
      },
      title: "Prøv en QR-menu før du tilmelder dig",
      subtitle:
        "Byg en prøvemenu, se hvordan din QR-kode ser ud, forhåndsvis live-oplevelsen — alt før du opretter en konto. Gem din fremgang via e-maillink når du er klar.",
      intro:
        "De fleste QR-menutjenester kræver at du opretter en konto før du kan gøre noget. Det er den forkerte rækkefølge. Nye restaurantejere vil mærke produktet først — se hvordan en ret ser ud, hvordan QR-scan flowet føles — og kun så forpligte sig til at tilmelde sig. IQ Rest lader dig nu bygge en komplet prøvemenu anonymt. Når du vil beholde den, gemmer vi den til din e-mail. Friktionsfri, forpligtelsesfri.",
      sections: [
        {
          title: "Anonym session gemmer dit arbejde",
          body: "Et anonymt session-ID oprettes ved dit første besøg og gemmes i en cookie. Hver kategori du tilføjer, hver ret du opretter, hvert foto du uploader er forbundet med den session. Du kan forlade siden, komme tilbage, og din menu er stadig der. Vi vedvarer sessionen i 7 dage — rigeligt tid til at evaluere produktet uden pres.",
        },
        {
          title: "Gem fremgang via e-maillink",
          body: "Når du beslutter at du vil beholde menuen, klik 'Save Progress'. Skriv din e-mail. Vi sender dig et magisk link, der ved klik konverterer den anonyme session til en rigtig konto forbundet med din e-mail. Alt dit arbejde overføres automatisk — ingen genindtastning, ingen mistet fremgang, ingen 'ups, det blev slettet'. Konverteringen til betalende kunde sker på dine vilkår.",
        },
        {
          title: "Reducerer tilmeldingsangst til nul",
          body: "Ved at lade brugere prøve før tilmelding vender vi det typiske SaaS-mønster om. Besøgende behøver ikke at beslutte om IQ Rest er deres e-mail værd — de kan se selv. Restauranter der prøver anonymt og så tilmelder sig konverterer højere end restauranter tvunget til at tilmelde sig først, fordi de allerede har investeret i menuen og ikke vil miste den.",
        },
      ],
      benefitsTitle: "Hvorfor anonym onboarding vinder",
      benefits: [
        "Byg en rigtig menu uden at oprette en konto",
        "Anonym session vedvarer 7 dage",
        "Gem fremgang til e-mail når du beslutter at forpligte dig",
        "Ingen genindtastning — arbejde overføres til din rigtige konto",
        "Friktionsfri produktevaluering",
        "Højere overall tilmeldings-konvertering",
      ],
      conclusionTitle: "Lad produktet sælge sig selv",
      conclusionBody:
        "Den bedste måde at overbevise en restaurantejer om at IQ Rest er rigtig for dem er at lade dem bruge det. Anonym onboarding vender en nysgerrig besøgende til en engageret bruger uden at bede om noget i bytte. Når du beder om en e-mail har brugeren allerede investeret tid i deres menu — at gemme den koster dem intet, og de beholder hvad de byggede.",
      ctaText: "Prøv IQ Rest nu — ingen konto nødvendig.",
      ctaButton: "Prøv det gratis",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Gem restaurant menu-fremgang via e-maillink | IQ Rest",
        description:
          "Byggede en prøvemenu anonymt? Gem den til din e-mail og vi sender dig et magisk link til at gøre krav på kontoen.",
      },
      title: "Gem din menu-fremgang via e-maillink",
      subtitle:
        "Byggede en menu anonymt og vil beholde den? Skriv din e-mail. Vi sender et magisk link der konverterer dit anonyme arbejde til en rigtig konto med ét tryk.",
      intro:
        "Når du har brugt fem minutter på at bygge en prøvemenu uden en konto, vil du ikke miste den. IQ Rests 'Save Progress' funktion konverterer din anonyme session til en rigtig konto via et magisk link. Skriv din e-mail, klik på linket i din indbakke, din menu er permanent forbundet med din konto. Ingen adgangskode, ingen tilmeldingsformular, ingen genindtastning af nogen data.",
      sections: [
        {
          title: "Magisk link flow — ingen adgangskode",
          body: "Vi sender et engangslink til din e-mail. Klik på det inden for 10 minutter og du er logget ind på en ny konto der indeholder menuen du byggede anonymt. Ingen adgangskode at vælge, ingen sikkerhedsspørgsmål, intet e-mailverificerings-trin — klikket på linket ER verificeringen. Vi udsteder så en session-cookie og du er inde i dashboardet med alt dit arbejde bevaret.",
        },
        {
          title: "Konflikthåndtering for eksisterende konti",
          body: "Hvis e-mailen du skrev allerede har en konto, overskriver vi den ikke. Vi sender linket, du klikker, og vi spørger om vi skal flette den anonyme menu ind i din eksisterende konto eller kassere den. De fleste brugere vælger flette — dine eksisterende retter forbliver, de nye fra anonym redigering tilføjes. Klart, sikkert, forudsigeligt.",
        },
        {
          title: "Rate-begrænset og spam-resistent",
          body: "Vi rate-begrænser save-progress anmodninger pr. IP og pr. e-mail for at forhindre misbrug. Linket udløber om 10 minutter og er enkelt-brugs. Hvis nogen anden forsøger at gøre krav på din anonyme session, har de brug for adgang til din indbakke — samme sikkerhedsmodel som hvert moderne magisk-link auth flow.",
        },
      ],
      benefitsTitle: "Hvorfor magisk-link gem vinder",
      benefits: [
        "Ingen adgangskode at vælge, huske eller nulstille",
        "Anonymt arbejde overføres intakt til din rigtige konto",
        "Eksisterende konti: vælg at flette eller kassere",
        "Rate-begrænset og tids-bundet — sikker ved design",
        "Ét tryk for at forpligte sig — ingen tilmeldingsformular",
        "E-mailen selv fungerer som verificerings-trinnet",
      ],
      conclusionTitle: "Konvertering uden friktion",
      conclusionBody:
        "Det øjeblik en bruger vil konvertere fra anonym til identificeret er det øjeblik de er mest tilbøjelige til at falde fra på en lang tilmeldingsformular. Magiske links sammenfolder den formular til et enkelt e-mailfelt plus et indbakke-klik. Brugeren bruger 30 sekunder og ender med en rigtig, vedvarende konto der indeholder alt de byggede. Det er det laveste-friktion konverteringsflow i QR-menubranchen.",
      ctaText: "Byg en menu anonymt, gem den så via e-mail når klar.",
      ctaButton: "Prøv det gratis",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Ét-klik Stripe checkout for tilbagevendende brugere | IQ Rest",
        description:
          "Allerede logget ind? Klik på en plan i prissætning og gå direkte til Stripe checkout. Ingen genindtastning af kontoinfo, ingen ekstra skærme.",
      },
      title: "Ét-klik Stripe checkout for tilbagevendende brugere",
      subtitle:
        "Logget-ind bruger klikker på en plan? Direkte til Stripe checkout, ingen ekstra bekræftelsesskærm. To klik fra prisside til abonnement aktivt.",
      intro:
        "Tilbagevendende brugere der allerede har en IQ Rest konto skulle ikke skulle bekræfte noget igen ved opgradering. Vi fjernede hver mellemliggende skærm mellem 'klik på plan i prissætning' og 'land på Stripe checkout'. To klik i alt: vælg planen, indtast kortdetaljer. Abonnementet er aktivt før du er færdig med din kaffe.",
      sections: [
        {
          title: "Detekter logget-ind tilstand på prissætning",
          body: "Vores prisside tjekker for en autentificeret session-cookie ved indlæsning. Hvis du er logget ind, springer plan-knapperne 'tilmeld dig først' omvejen og går direkte til /api/stripe/checkout, der opretter en Stripe Checkout Session og returnerer URL'en for omdirigering. Hvis du ikke er logget ind, tager knapperne dig gennem standard tilmeldingsflowet først — ingen adfærdsændring for nye brugere.",
        },
        {
          title: "UI locale videresendt til Stripe",
          body: "Dit dashboard-locale videresendes til Stripe Checkout via locale-parameteren, så checkout-siden gengives på dit sprog. Spanske brugere ser Stripe på spansk; tyske brugere ser Stripe på tysk. Checkout-flowet føles sømløst fordi det aldrig bryder sprogkontinuiteten fra dit dashboard.",
        },
        {
          title: "Retur-URL lander dig tilbage i dashboard",
          body: "Efter succesfuld betaling omdirigerer Stripe til en retur-URL vi sætter til dashboard-roden i dit locale (f.eks. /es/dashboard). Webhook'en opdaterer din abonnementsstatus server-side før du ankommer, så dashboardet du lander på allerede afspejler den nye plan — ingen 'afventer' tilstand, intet flash af ikke-opgraderet indhold.",
        },
      ],
      benefitsTitle: "Hvorfor ét-klik checkout konverterer",
      benefits: [
        "To klik fra prissætning til abonnement aktivt",
        "Ingen 'bekræft din konto' interstitial for logget-ind brugere",
        "Stripe checkout vises på dit dashboard-sprog",
        "Retur-URL lander dig i det opgraderede dashboard",
        "Webhook opdaterer plan før du ankommer — ingen flimren",
        "Nye brugere får stadig standard tilmelding → opgraderingsflowet",
      ],
      conclusionTitle: "Gør den lette vej trivielt let",
      conclusionBody:
        "Brugeren der allerede er overbevist behøver ikke mere overbevisning — de behøver færre klik. Ét-klik checkout fjerner hver skærm mellem hensigt og betaling for tilbagevendende brugere. Resultatet: højere prøveperiode-til-betalt konvertering, færre forladte opgraderinger, hurtigere indtægtsgenkendelse for abonnementsudvidelse.",
      ctaText: "Allerede en bruger? Vælg din plan og opgrader på to klik.",
      ctaButton: "Se priser",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Dashboard UI redesign: Kort, navigation og formularer | IQ Rest",
        description:
          "IQ Rest dashboard redesignet med konsistente kort-komponenter, vedvarende sidebar-navigation med aktiv side fremhævning og forbedrede formularhandlinger.",
      },
      title: "Dashboard UI redesign: Konsistente kort, navigation og formularhandlinger",
      subtitle:
        "Et poleret dashboard med samlet kort-styling, vedvarende sidebar-navigation, accent-farvede aktive tilstande og bund gem/slet handlinger på hver formularside.",
      intro:
        "IQ Rest har gennemgået en omfattende dashboard UI redesign. Hver side bruger nu konsistent kort-styling med samlede kant-radier, en vedvarende sidebar-navigation med accent-farvede aktive tilstande og forbedrede formularsider med bund gem og slet handlinger. Resultatet er en renere, mere poleret oplevelse for at administrere din restaurants digitale QR-menu.",
      sections: [
        {
          title: "Konsistent kort-design på tværs af alle sider",
          body: "Hver dashboard-side bruger nu en samlet DashboardCard komponent med konsistente afrundede kanter, subtile baggrundsfarver og valgfri sektionsoverskrifter. Analytics, fakturering, indstillinger, kontakter, reservationsindstillinger og alle formularsider deler det samme visuelle sprog. Hint-etiketter med popover tooltips erstatter inline beskrivelsestekst, holder grænsefladen ren mens den stadig giver hjælpsom kontekst når nødvendigt.",
        },
        {
          title: "Vedvarende sidebar-navigation med aktive tilstande",
          body: "På desktop-skærme er en vedvarende sidebar-navigation nu synlig på hver side. Den aktive side fremhæves med en accent-farvet baggrund, hvilket gør det øjeblikkeligt klart hvor du er. Undersider som kategorier, items og ordrer fremhæver korrekt forælder-Menu-elementet. Sidebaren inkluderer hurtig adgang til Menu, Print QR, Reservationer, Analytics, Indstillinger, Kontakter, Fakturering og Support — alt uden at forlade den aktuelle visning.",
        },
        {
          title: "Forbedrede formularsider med bund-handlinger",
          body: "Alle formularsider — kategorier, items, borde, design, indstillinger, kontakter og reservationsindstillinger — har nu en duplikeret gem-knap nederst i accent-farve. Slet-knapper vises på venstre side med en dæmpet stil. Det betyder at du ikke længere behøver at scrolle tilbage til toppen for at gemme dine ændringer. Logout-knappen er flyttet fra sidebaren til bunden af design-siden, holder navigationen fokuseret på essentielle handlinger.",
        },
      ],
      benefitsTitle: "Fordele ved UI-redesignet",
      benefits: [
        "Samlet kort-styling med konsistente kanter og baggrunde på tværs af alle sider",
        "Vedvarende sidebar-navigation på desktop med accent-farvede aktive tilstande",
        "Bund gem-knapper på alle formularer — intet behov for at scrolle op for at gemme",
        "Slet og gem handlinger klart adskilt — slet venstre, gem højre",
        "Sektionsoverskrifter på formular-kort for bedre visuel organisation",
        "Renere analytics-side med DashboardCard wrappers og forbedret enhedsstatistik-layout",
      ],
      conclusionTitle: "En mere poleret dashboard-oplevelse",
      conclusionBody:
        "Dette UI-redesign bringer visuel konsistens og forbedret brugbarhed til hvert hjørne af IQ Rest dashboardet. Uanset om du redigerer menu-items, tjekker analytics eller administrerer reservationer, føles grænsefladen sammenhængende og intuitiv. Kombineret med den vedvarende sidebar-navigation er det hurtigere og mere behageligt end nogensinde at administrere din restaurants digitale QR-menu.",
      ctaText: "Oplev det redesignede dashboard",
      ctaButton: "Åbn Dashboard",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("AI Menu Scanner — Opret en digital QR-menu i ét foto"),
    "redesigned-dashboard-qr-menu-management": stub("Redesignet Dashboard for QR-menu administration"),
    "reservation-emails-analytics-digital-qr-menu": stub("Reservationsemail og analytics for din digitale QR-menu"),
    "multi-currency-geo-pricing-qr-menu": stub("Multi-valuta geo-prissætning for din QR-menu"),
    "support-qr-menu-restaurant-cafe": stub("In-app support for din QR-menu"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Detaljeret analytics for dit QR-menu website"),
    "instant-qr-menu-restaurant-website-generator": stub("Øjeblikkelig QR-menu og restaurant website generator"),
    "subscription-plans-qr-menu-restaurant-website": stub("Abonnementsplaner for din QR-menu"),
    "public-restaurant-qr-menu-website": stub("Offentlig restaurant QR-menu website"),
    "add-items-restaurant-qr-menu-website": stub("Tilføj items til din QR-menu på sekunder"),
    "qr-menu-restaurant-categories": stub("Kategorier for din restaurant QR-menu"),
    "easy-qr-menu-cafe-control-panel": stub("Let QR-menu café kontrolpanel"),
    "faq-page-organization": stub("FAQ side organisation"),
    "free-restaurant-website-improvements": stub("Gratis restaurant website forbedringer"),
    "user-authentication-interface": stub("Brugerautentificeringsgrænseflade"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Fordele",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Prøv IQ Rest",
    ctaButton: "Start gratis prøveperiode",
  };
}
