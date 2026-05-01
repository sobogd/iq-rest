import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Changelog — Updates en nieuwe functies van IQ Rest",
    description:
      "Elke release van IQ Rest op één plek. Nieuwe functies, AI-verbeteringen en productlanceringen voor QR-menu's, online bestellen en reserveringen.",
  },
  pageTitle: "Changelog",
  pageSubtitle:
    "Elke update die we uitbrengen om je QR-menu, online bestellingen en reserveringen soepeler te maken. Nieuwste eerst.",
  readMore: "Lees meer",
  backToList: "Terug naar changelog",
  publishedOn: "Gepubliceerd op",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "AI-gerechtfoto's voor QR-menu | IQ Rest",
        description:
          "Genereer in één klik consistente gerechtfoto's voor je hele QR-menu. Geen stockfoto's, geen fotograaf, geen bewerking.",
      },
      title: "AI-gegenereerde gerechtfoto's voor je hele QR-menu",
      subtitle:
        "Stop met zoeken in stockgalerijen en het plannen van fotoshoots. IQ Rest genereert nu een volledige set smakelijke gerechtfoto's in één consistente stijl — direct uit de namen van je menu.",
      intro:
        "Elk gerecht op je menu fotograferen is duur, traag en zelden consistent. Stockfoto-bibliotheken laten gaten en de styling past nooit echt bij je merk. IQ Rest dicht dat gat met ingebouwde AI-gerechtfotografie.",
      sections: [
        {
          title: "Eén fotostijl voor het hele menu",
          body: "Wanneer gasten door een menu scrollen, breken niet-passende stijlen de ervaring. IQ Rest genereert elke foto in één consistente stijl: dezelfde lichtrichting, dezelfde bordtaal, dezelfde achtergrondsfeer.",
        },
        {
          title: "Van gerechtnaam naar bord in seconden",
          body: "Niets te briefen. Je voegt een gerecht toe en IQ Rest maakt de foto op de achtergrond, geüpload als geoptimaliseerde WebP. Past de foto niet, regenereer met één tik.",
        },
        {
          title: "Geoptimaliseerd voor mobiel en SEO",
          body: "Elke afbeelding is gecodeerd als gecomprimeerde WebP, geserveerd vanuit een Hetzner-CDN in Neurenberg. Pagina's blijven snel op 4G. Foto's zijn ook indexeerbaar door Google Afbeeldingen.",
        },
      ],
      benefitsTitle: "Waarom AI-gerechtfoto's belangrijk zijn",
      benefits: [
        "Geen stockfoto-abonnementen of fotograafkosten",
        "Merkconsistente stijl voor alle gerechten",
        "Nieuwe gerechten krijgen automatisch een passende foto",
        "Gecomprimeerde WebP — snel op mobiel",
        "Gratis generaties inbegrepen in elk plan",
        "Regenereer elke foto met één tik tot perfect",
      ],
      conclusionTitle: "Een foto voor elk gerecht, zonder de productie",
      conclusionBody:
        "Restaurants met foto's verkopen meer gerechten met hoge marge. De reden dat de meeste menu's geen foto's hebben zijn de productiekosten. IQ Rest verwijdert die kosten volledig.",
      ctaText: "Genereer AI-foto's voor elk gerecht — gratis tijdens je proefperiode.",
      ctaButton: "Probeer gratis",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "AI-generator voor restaurant-omslagachtergrond | IQ Rest",
        description:
          "Genereer automatisch een mooie omslagafbeelding voor je QR-menu in seconden.",
      },
      title: "AI-gegenereerde omslagachtergrond voor restaurants",
      subtitle:
        "Je QR-menu draagt de juiste sfeer over voordat gasten scrollen. IQ Rest genereert nu een aangepaste omslagafbeelding die past bij je keuken — automatisch.",
      intro:
        "Eerste indrukken tellen, vooral wanneer gasten een QR aan tafel scannen. Een generieke omslagafbeelding ondermijnt alles wat je in je interieur stopte.",
      sections: [
        {
          title: "Op maat van je keuken en sfeer",
          body: "Wanneer je de aanmeldingswizard voltooit, neemt IQ Rest de gekozen keuken en genereert een passende omslag. Italiaans krijgt warm trattoria-licht. Japans krijgt strakke lijnen. Mexicaans krijgt levendige kleuren.",
        },
        {
          title: "Geoptimaliseerd voor QR-menu hero-secties",
          body: "Omslagafbeeldingen worden gegenereerd in de exacte verhouding die door de QR-menu hero wordt gebruikt — scherp op elke telefoon. Gecodeerd als WebP, lazy-loaded.",
        },
        {
          title: "Merkconsistentie out of the box",
          body: "De stijl van de omslagafbeelding wordt automatisch gekoppeld aan de AI-gegenereerde gerechtfoto's voor je menu — dezelfde lichttaal, hetzelfde kleurenpalet.",
        },
      ],
      benefitsTitle: "Waarom een AI-omslag stockfoto's verslaat",
      benefits: [
        "Uniek voor jouw restaurant",
        "Aangepast aan de keuken die je koos",
        "Dezelfde visuele taal als je AI-gerechtfoto's",
        "Correct dimensioneerd voor de QR-menu hero",
        "Gecomprimeerde WebP voor snel mobiel laden",
        "Regenereer wanneer je wilt met één tik",
      ],
      conclusionTitle: "Een omslag die zegt: 'we weten wat we doen'",
      conclusionBody:
        "Wanneer een gast je QR scant, is het eerste wat ze zien je omslag. Een gepolijst, sfeervol beeld signaleert kwaliteit nog voor ze één gerechtnaam lezen.",
      ctaText: "Krijg een aangepaste AI-omslag voor je QR-menu in minder dan een minuut.",
      ctaButton: "Start gratis proefperiode",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Aanmeldingswizard in 3 stappen voor QR-menu | IQ Rest",
        description:
          "Kies keuken, restaurantnaam, e-mail — en IQ Rest bouwt je QR-menu. De snelste aanmelding in de QR-menu-industrie.",
      },
      title: "Aanmeldingswizard in 3 stappen: van e-mail naar werkend QR-menu in minder dan een minuut",
      subtitle:
        "Kies je keuken. Typ je restaurantnaam. Bevestig je e-mail. Klaar — je QR-menu is klaar.",
      intro:
        "Restauranthouders hebben geen tijd voor een aanmeldingsformulier van 10 schermen. Tegen de tijd dat je voor het eerst inlogt, is je QR-menu al gevuld met keukenpassende voorbeeldgerechten en bijpassende AI-fotografie.",
      sections: [
        {
          title: "Stap 1 — Keukenkeuze",
          body: "Kies uit een brede lijst keukens: Italiaans, Spaans, Japans, Mexicaans, Frans, mediterraan, Indiaas, Amerikaans, café, bar, pizzeria.",
        },
        {
          title: "Stap 2 — Restaurantnaam",
          body: "Typ de naam zoals gasten hem zullen zien. We gebruiken hem overal: QR-menu hero, paginatitel, SEO-slug, social-share-voorbeeld.",
        },
        {
          title: "Stap 3 — E-mail of Google-aanmelding",
          body: "Bevestig met e-mail + eenmalige code, of tik 'Aanmelden met Google' voor onmiddellijke accountcreatie. Het moment dat je bevestigt, draait de wizard de menu-seeder op de achtergrond.",
        },
      ],
      benefitsTitle: "Waarom een aanmelding in 3 stappen een formulier verslaat",
      benefits: [
        "Onder 60 seconden van landingspagina naar werkend QR-menu",
        "Nul beslissingen die je later niet kunt veranderen",
        "Voorbeeldgerechten voorgevuld per keuken",
        "AI-foto's en omslag klaar tegen de tijd dat je inlogt",
        "Google sign-in optie",
        "Anonieme voortgang opgeslagen als je halverwege stopt",
      ],
      conclusionTitle: "De snelste QR-menu-instelling, punt",
      conclusionBody:
        "De meeste QR-menu-diensten laten je tientallen velden invullen voordat je iets nuttigs ziet. IQ Rest keert dat om.",
      ctaText: "Start de wizard van 3 stappen nu — je menu staat in 60 seconden online.",
      ctaButton: "Start gratis proefperiode",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "AI-gegenereerd voorbeeldmenu bij aanmelding | IQ Rest",
        description:
          "Sla de lege staat over. IQ Rest genereert automatisch een start-QR-menu op basis van je keuken.",
      },
      title: "AI-gebouwd voorbeeldmenu direct na aanmelding",
      subtitle:
        "Geen starend kijken meer naar een leeg dashboard. IQ Rest zaait je account met keukenpassende categorieën, gerechten en AI-foto's.",
      intro:
        "Het moeilijkste deel van elke nieuwe tool is de lege staat. IQ Rest lost dit op door je menu te vullen op het moment van aanmelding.",
      sections: [
        {
          title: "Keukenbewuste categorieën en gerechten",
          body: "De seeder gebruikt de keuken die je koos om een gecureerde set categorieën te trekken. Een pizzeria krijgt 'Pizza Classica', 'Antipasti', 'Bevande'.",
        },
        {
          title: "Foto's en prijzen out of the box",
          body: "Elk startgerecht komt met een AI-gegenereerde foto en een redelijke standaardprijs in je lokale valuta. Prijzen zijn placeholders maar maken het menu meteen echt.",
        },
        {
          title: "Bewerk, begin niet vanaf nul",
          body: "Eenmaal gezaaid, draagt elk gerecht een isExample-vlag. Zodra je een gerecht bewerkt, valt de vlag eraf.",
        },
      ],
      benefitsTitle: "Waarom een vooraf gebouwd menu wint",
      benefits: [
        "Geen lege staat",
        "Categorieën en gerechten passend bij de gekozen keuken",
        "AI-foto's voor elk startgerecht",
        "Lokale valuta automatisch gedetecteerd",
        "Voorbeeldvlag vervaagt terwijl je bewerkt",
        "Toon stakeholders een echt ogend menu binnen minuten",
      ],
      conclusionTitle: "Sla de lege pagina over",
      conclusionBody:
        "Een menu vanaf nul bouwen is intimiderend. Eén bewerken is makkelijk. IQ Rest geeft je een compleet startmenu op het moment van aanmelding.",
      ctaText: "Meld je aan en krijg een volledig opgebouwd startmenu in jouw keuken.",
      ctaButton: "Bouw mijn menu",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interactieve menutour voor nieuwe gebruikers | IQ Rest",
        description:
          "Een interactieve gids in 7 stappen begeleidt nieuwe restauranthouders door het QR-menu-dashboard.",
      },
      title: "Interactieve menutour in 7 stappen bij eerste bezoek",
      subtitle:
        "We laten je geen documentatie lezen. De eerste keer dat je het menu opent, leidt IQ Rest je rond — categorie toevoegen, gerecht toevoegen, bewerken, sorteren, voorbeeld, delen, in zeven tikken.",
      intro:
        "De meeste SaaS-producten begraven onboarding in een helpcentrum dat niemand leest. IQ Rest doet het tegenovergestelde.",
      sections: [
        {
          title: "In het product, niet in een kennisbank",
          body: "Elke stap van de tour licht het echte UI-element op je scherm uit. Geen screenshots — de screenshot IS je dashboard.",
        },
        {
          title: "Ontworpen rond de echte workflow",
          body: "De zeven stappen volgen de workflow die een nieuw restaurant daadwerkelijk uitvoert. Eerst categorieën, dan gerechten, dan elk gerecht verfijnen, dan ordenen, dan voorbeeld, dan delen via QR.",
        },
        {
          title: "Gelokaliseerd in 35 talen",
          body: "De tourtekst is vertaald in elke taal die IQ Rest ondersteunt.",
        },
      ],
      benefitsTitle: "Waarom een in-product-tour een helpcentrum verslaat",
      benefits: [
        "Leer door doen, niet door documentatie te lezen",
        "7 stappen dekken ~95% van de workflow",
        "Op elk moment te sluiten",
        "Blijft over sessies heen tot voltooid",
        "Gelokaliseerd in 35 talen",
        "Geen video's om te laden",
      ],
      conclusionTitle: "Van verward naar zelfverzekerd in zeven stappen",
      conclusionBody:
        "Het moeilijkste moment in elk product zijn de eerste 30 seconden. IQ Rest's interactieve tour verwijdert dat risico.",
      ctaText: "Meld je aan en laat je in zeven tikken door je eerste QR-menu leiden.",
      ctaButton: "Start gratis proefperiode",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Landingspagina's per land voor QR-menu | IQ Rest",
        description:
          "Bezoekers uit Nederland zien een landingspagina afgestemd op Nederlandse restaurants. 35 landen, 35 conversie-geoptimaliseerde pagina's.",
      },
      title: "Op maat gemaakte landingspagina in elke taal",
      subtitle:
        "Bezoekers krijgen niet meer een automatisch vertaalde pagina. Elk van de 35 ondersteunde talen heeft een eigen landingspagina.",
      intro:
        "Automatisch vertaalde landingspagina's converteren slecht. IQ Rest verzendt nu een unieke landingspagina voor elk van de 35 ondersteunde talen — geschreven voor de markt.",
      sections: [
        {
          title: "Eén pagina per taal, geen automatische vertaling",
          body: "Elke landing leeft op /<locale> als zelfstandige Next.js-route. De teksten zitten in TypeScript-objecten — versiebeheerd, type-checked, onafhankelijk te deployen.",
        },
        {
          title: "Geolocatie routeert bezoekers automatisch",
          body: "De eerste keer dat een bezoeker op iq-rest.com landt, leest onze nginx geo-module hun landcode en stuurt hen door naar de juiste /<locale>.",
        },
        {
          title: "Merkbrede hreflang- en canonieke tags",
          body: "Alle 35 landingspagina's verwijzen naar elkaar via hreflang-tags zodat Google de juiste indexeert.",
        },
      ],
      benefitsTitle: "Waarom landingspagina's per land beter converteren",
      benefits: [
        "Native verwoording in elke markt",
        "Geo-routing serveert automatisch de juiste pagina",
        "hreflang en canoniek volgen Google-richtlijnen",
        "Catalaanse bezoekers zien Catalaans",
        "Valuta, prijzen en CTA's gelokaliseerd per markt",
        "Onafhankelijk A/B-testen per taal",
      ],
      conclusionTitle: "35 talen, 35 voordeuren",
      conclusionBody:
        "Als een Nederlandse restauranthouder op een halfvertaalde Engelse pagina landt, vertrekt hij. Landt hij op een pagina die hem in het Nederlands aanspreekt, dan converteert hij.",
      ctaText: "Probeer IQ Rest in jouw taal — landing op maat van jouw markt.",
      ctaButton: "Open mijn taal",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Aanmelden met Google bij QR-menu-dashboard | IQ Rest",
        description:
          "Sla wachtwoorden en e-mailcodes over. Tik 'Aanmelden met Google' om in minder dan een seconde toegang te krijgen.",
      },
      title: "Aanmelden met Google — toegang in één tik tot je QR-menu",
      subtitle:
        "Sla OTP-e-mails en vergeten wachtwoorden over. Tik 'Doorgaan met Google' en je bent in minder dan een seconde in het dashboard.",
      intro:
        "E-mail + eenmalige code-authenticatie is veilig maar traag. IQ Rest biedt nu Aanmelden met Google.",
      sections: [
        {
          title: "Native Google OAuth, geen redirect-loop",
          body: "We gebruiken Google's officiële Identity Services SDK met de One Tap UI. We verifiëren het Google ID-token server-side tegen Google's publieke sleutels.",
        },
        {
          title: "Hetzelfde account, beide methodes",
          body: "Als je je hebt aangemeld met e-mail-OTP en later Google kiest, koppelen we de accounts via e-mail.",
        },
        {
          title: "Mobile-first — werkt op iOS Safari en Android Chrome",
          body: "We hebben een echte Google-knop over onze UI gelegd in plaats van programmatische clicks te activeren.",
        },
      ],
      benefitsTitle: "Waarom Google sign-in e-mail OTP verslaat",
      benefits: [
        "Eén tik om aan te melden",
        "Geen wachtwoord om te onthouden",
        "Hetzelfde account",
        "Cryptografisch server-side geverifieerd",
        "Werkt betrouwbaar op iOS Safari en Android Chrome",
        "Taal doorgestuurd voor e-mails",
      ],
      conclusionTitle: "De snelste weg terug naar je dashboard",
      conclusionBody:
        "Restauranthouders controleren hun menu's tientallen keren per week. Google sign-in maakt van een 30-seconden OTP-flow een tik van één seconde.",
      ctaText: "Sla het wachtwoord over — meld je aan met Google in één tik.",
      ctaButton: "Open dashboard",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Meertalige e-mailmeldingen in 35 talen | IQ Rest",
        description:
          "Proefperiode-herinneringen, supportantwoorden, abonnement-e-mails — elke melding van IQ Rest komt in de taal van je dashboard.",
      },
      title: "Meertalige e-mailmeldingen in alle 35 talen",
      subtitle:
        "Elke e-mail die IQ Rest verstuurt komt in de taal die je in je dashboard hebt ingesteld. Inclusief rechts-naar-links layouts.",
      intro:
        "Een e-mail in de verkeerde taal is wrijving in het beste geval, verwijdering in het ergste. IQ Rest verstuurt nu elke transactionele e-mail in de taal die in je dashboard is ingesteld.",
      sections: [
        {
          title: "preferredLocale reist met je account mee",
          body: "Elke gebruiker heeft een preferredLocale-veld dat bij eerste aanmelding wordt ingesteld.",
        },
        {
          title: "RTL-templates voor Arabisch en Perzisch",
          body: "Rechts-naar-links layouts zijn niet alleen vertaling. We leveren toegewijde RTL-templates.",
        },
        {
          title: "Vertaald door experts uit de horecasector",
          body: "We vertaalden elke template met keuken- en horecaterminologie die natuurlijk klinkt voor restaurantbeheerders in elke markt.",
        },
      ],
      benefitsTitle: "Waarom meertalige e-mails belangrijk zijn",
      benefits: [
        "Alle transactionele e-mails in je dashboard-taal",
        "preferredLocale blijft over aanmeldingen heen",
        "RTL-layouts voor Arabisch en Perzisch",
        "Horeca-passende terminologie per taal",
        "Taal wisselen werkt onmiddellijk door",
        "35 talen inclusief Catalaans, Sloveens, Estisch, Lets",
      ],
      conclusionTitle: "E-mails die jouw taal spreken",
      conclusionBody:
        "Communicatie die in de verkeerde taal aankomt is communicatie die niet werkt. IQ Rest verstuurt elke e-mail in de taal die je daadwerkelijk gebruikt.",
      ctaText: "Meld je aan en krijg je dashboard plus elke e-mail in jouw taal.",
      ctaButton: "Start gratis proefperiode",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "iOS-native mobiel restaurantdashboard | IQ Rest",
        description:
          "Tabnavigatie onderaan, safe-area beheer, geen-zoom inputs — het mobiele dashboard van IQ Rest voelt als een native app op iPhone.",
      },
      title: "iOS-native gevoel op je telefoon",
      subtitle:
        "Tabnavigatie onderaan, volledige safe-area-bewustheid, formulierinputs zonder zoom en directe paginatransities.",
      intro:
        "De meeste restaurant-SaaS-dashboards zijn desktop-first nadenkertjes op mobiel. IQ Rest is het tegenovergestelde.",
      sections: [
        {
          title: "Tabbalk onderaan, geen hamburger",
          body: "Hamburgermenu's op mobiel zijn traag. We vervingen de desktop-sidebar door een onderste tabbalk op telefoons: Menu, Bestellingen, Reserveringen, Instellingen.",
        },
        {
          title: "Safe-area insets en home-indicator",
          body: "We gebruiken env(safe-area-inset-*) overal — de onderste balk zit boven de home-indicator.",
        },
        {
          title: "Geen-zoom inputs en directe formulierinzending",
          body: "We hebben elke input naar 16px gezet en het viewport geconfigureerd met maximum-scale=1.",
        },
      ],
      benefitsTitle: "Waarom native gevoel op mobiel telt",
      benefits: [
        "Tabbalk onderaan — toegang in één tik",
        "Safe-area bewust",
        "16px inputs — geen iOS zoom-and-jump",
        "Actieve tab gebruikt je merk-accentkleur",
        "SPA-transities — geen volledige reloads",
        "Geen app om te installeren",
      ],
      conclusionTitle: "Een web-dashboard dat aanvoelt als een app",
      conclusionBody:
        "De lijn tussen web en native is grotendeels een kwestie van aandacht voor detail. IQ Rest's mobiele dashboard betaalt die aandacht.",
      ctaText: "Open IQ Rest op je telefoon en voel het verschil.",
      ctaButton: "Probeer 14 dagen gratis",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "AVG cookietoestemmingsbanner voor restaurantwebsite | IQ Rest",
        description:
          "Wettige toestemmingsbanner, AEPD-uitgelijnd, zonder scripts van derden.",
      },
      title: "AVG-conforme cookietoestemmingsbanner",
      subtitle:
        "Op maat gebouwde toestemmingsbanner zonder CMP van derden, zonder scripttag van Cookiebot of OneTrust.",
      intro:
        "Elke commerciële website in de EU heeft een cookietoestemmingsbanner nodig. De meeste gebruiken CMP's van derden die zware scripts meeslepen. IQ Rest bouwde de zijne, lichtgewicht.",
      sections: [
        {
          title: "AEPD- en ePrivacy-uitgelijnd",
          body: "We weigeren het dark pattern 'enorm accepteren, klein weigeren'. Beide knoppen hebben dezelfde grootte.",
        },
        {
          title: "Geen scripts van derden",
          body: "Geen Cookiebot, geen OneTrust. De banner is onderdeel van de landingsbundle — geen externe verzoeken.",
        },
        {
          title: "Privacy, cookies en voorwaarden in modals",
          body: "Klikken op een juridische link opent een modal — geen navigatie, geen verlies van je scrollpositie.",
        },
      ],
      benefitsTitle: "Waarom onze banner CMP's van derden verslaat",
      benefits: [
        "AEPD- en ePrivacy-uitgelijnd",
        "Geen scripts van derden",
        "Privacy/Cookies/Voorwaarden in modals",
        "Cookieless analytics werkt zelfs vóór toestemming",
        "First-party cookie verwijderd bij Weigeren",
        "Lichtgewicht",
      ],
      conclusionTitle: "Naleving zonder conversie-rem",
      conclusionBody:
        "Cookietoestemming is in de EU niet onderhandelbaar maar hoeft je pagina niet te vertragen. IQ Rest's banner is snel, eerlijk en volledig conform.",
      ctaText: "Zie de toestemmingsflow in actie.",
      ctaButton: "Bezoek landing",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privacy en voorwaarden in modals — geen paginasprongen | IQ Rest",
        description:
          "Privacybeleid, Servicevoorwaarden en Cookiebeleid openen nu in modals op de landing.",
      },
      title: "Privacy, voorwaarden en cookiebeleid in modals",
      subtitle:
        "Klik op een juridische link en het beleid opent in een schoon modal. Geen navigatie, geen verlies van scrollpositie.",
      intro:
        "Zelfstandige /privacy-, /terms- en /cookies-pagina's waren het standaardpatroon — en de standaardfout. IQ Rest opent nu alle drie als in-page modals.",
      sections: [
        {
          title: "Eén Modal-component, drie documenten",
          body: "De juridische tekst leeft in gedeelde TypeScript-constanten zodat één update overal doorwerkt.",
        },
        {
          title: "Modal-stack",
          body: "Als je het Cookiebeleid leest en wilt overschakelen naar het Privacybeleid, opent de link binnen het modal het volgende modal erbovenop.",
        },
        {
          title: "Alle 35 talen — zelfde single-source tekst",
          body: "De juridische tekst is in het Engels (taal van onze juridische entiteit, autónomo geregistreerd in Spanje), maar de modal-chrome is volledig gelokaliseerd.",
        },
      ],
      benefitsTitle: "Waarom modals zelfstandige juridische pagina's verslaan",
      benefits: [
        "Geen scrollverlies",
        "Hogere conversie",
        "Eén component, drie documenten",
        "Modal-stack",
        "Gelokaliseerde chrome in 35 talen",
        "Volledige juridische naleving behouden",
      ],
      conclusionTitle: "Juridisch zonder wrijving",
      conclusionBody:
        "Advocaten willen dat het beleid leesbaar is. Marketers willen dat de bezoeker converteert. Modals maken beiden blij.",
      ctaText: "Probeer de nieuwe flow.",
      ctaButton: "Bezoek landing",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Automatisch Catalaans voor bezoekers uit Catalonië | IQ Rest",
        description:
          "Bezoekers uit Barcelona, Tarragona, Lleida en Girona zien IQ Rest automatisch in het Catalaans.",
      },
      title: "Automatische Catalaans-detectie voor bezoekers uit Catalonië",
      subtitle:
        "Bezoekers uit Barcelona, Tarragona, Lleida en Girona landen standaard op de Catalaanse versie van IQ Rest.",
      intro:
        "Catalonië heeft een sterke linguïstische identiteit. IQ Rest respecteert nu dat onderscheid op geo-niveau.",
      sections: [
        {
          title: "Geo-detectie aan de edge",
          body: "We lezen het land en de regio van de bezoeker uit onze nginx geo-module. Als de regio overeenkomt met Catalonië, sturen we door naar /ca.",
        },
        {
          title: "Taalcookie overschrijft geo",
          body: "Zodra je handmatig een taal kiest, wordt je keuze in een cookie opgeslagen die geo overschrijft.",
        },
        {
          title: "Volledige Catalaanse vertaling",
          body: "De /ca-landing is niet automatisch vertaald — elk woord is professioneel vertaald door Catalaans sprekende copywriters.",
        },
      ],
      benefitsTitle: "Waarom auto-Catalaans belangrijk is",
      benefits: [
        "Bezoekers uit Catalonië zien Catalaans automatisch",
        "Rest van Spanje krijgt Castiliaans",
        "Handmatige taalkeuze blijft via cookie",
        "Volledige professionele vertaling",
        "Geo-detectie aan de edge",
        "Dezelfde geoptimaliseerde landing",
      ],
      conclusionTitle: "Respect voor linguïstische identiteit",
      conclusionBody:
        "Catalaanse bezoekers standaard op Castiliaans Spaans zetten is technisch klein maar politiek en cultureel groot.",
      ctaText: "Bezoek IQ Rest vanuit Catalonië en zie de pagina in jouw taal.",
      ctaButton: "Open Catalaanse landing",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modal voor verlopen proefperiode — QR-menu blijft openbaar | IQ Rest",
        description:
          "Wanneer je proefperiode afloopt, verdwijnt je menu niet. Gasten kunnen blijven scannen.",
      },
      title: "Proefperiode verlopen? Je QR-menu blijft live voor gasten",
      subtitle:
        "Het verlopen van de proefperiode dood niet meer je openbare menu. Gasten kunnen blijven scannen.",
      intro:
        "Het oude verloopgedrag was hard. We hebben het veranderd. Nu toont het verlopen van de proefperiode een modal in het dashboard, maar je openbare menu blijft normaal werken.",
      sections: [
        {
          title: "Openbaar menu blijft live",
          body: "De 14-daagse proefperiode eindigt stilletjes vanuit het perspectief van de gast. Het QR-menu, online bestellen, reserveringen — alles blijft werken.",
        },
        {
          title: "Modal in dashboard, geen harde redirect",
          body: "We tonen een schoon modal: 'Je proefperiode is afgelopen. Kies een plan.' Het modal kan gesloten worden.",
        },
        {
          title: "Voorbeeld altijd beschikbaar",
          body: "Zelfs met een verlopen proefperiode kun je je QR-menu nog steeds bekijken.",
        },
      ],
      benefitsTitle: "Waarom een zachte verloop een harde cutoff verslaat",
      benefits: [
        "Openbaar QR-menu blijft live voor gasten",
        "Geen verrassings-downtime midden in de service",
        "Modal in dashboard",
        "Voorbeeld altijd beschikbaar",
        "Inline upsell-hints",
        "Eigenaar upgradet op eigen schema",
      ],
      conclusionTitle: "Respecteer de openingsuren van het restaurant",
      conclusionBody:
        "Restaurants draaien op krappe marges. Een zachte verloop houdt de lichten aan voor gasten terwijl het de eigenaar nog steeds richting een betaald plan duwt.",
      ctaText: "Start je 14-daagse proefperiode wetende dat je menu live blijft.",
      ctaButton: "Start gratis proefperiode",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Gerecht: duidelijkere terminologie | IQ Rest",
        description:
          "We hebben 'Item' hernoemd naar 'Gerecht' in het hele dashboard.",
      },
      title: "Item → Gerecht: duidelijkere terminologie in de hele editor",
      subtitle:
        "We vervingen het generieke 'Item'-label door 'Gerecht' op elk dashboard-oppervlak.",
      intro:
        "Software-mensen zeggen 'item'. Restaurantmensen zeggen 'gerecht'. We hebben alles hernoemd.",
      sections: [
        {
          title: "Waar de hernoeming geldt",
          body: "Elk gebruikersoppervlak: knoppen, labels, toasts, breadcrumbs, koppen — allemaal bijgewerkt. De interne database-kolom heet nog steeds 'item' voor backwards-compatibiliteit.",
        },
        {
          title: "Vertaald in alle 35 talen",
          body: "Spaans 'plato', Frans 'plat', Duits 'Gericht', Italiaans 'piatto', Catalaans 'plat', Japans '料理'.",
        },
        {
          title: "Standaardcategorie ook automatisch aangemaakt",
          body: "We maken automatisch een standaardcategorie 'Menu' aan bij het eerste dashboardbezoek.",
        },
      ],
      benefitsTitle: "Waarom terminologie ertoe doet",
      benefits: [
        "'Gerecht' komt overeen met hoe restauranthouders spreken",
        "Bijgewerkt op elk dashboard-oppervlak",
        "Vertaald in alle 35 talen",
        "Standaardcategorie automatisch aangemaakt",
        "Sneller van aanmelding tot eerste gerecht",
        "Minder mentale vertaling",
      ],
      conclusionTitle: "Spreek de taal van de gebruiker",
      conclusionBody:
        "Generieke SaaS-terminologie is prima voor engineers. Restauranthouders hebben woorden nodig die overeenkomen met wat ze op het werk zeggen.",
      ctaText: "Meld je aan en voeg je eerste gerecht toe in minder dan een minuut.",
      ctaButton: "Bouw mijn menu",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Automatische standaardcategorie voor menu-onboarding | IQ Rest",
        description:
          "Nieuwe gebruikers staan niet meer voor een leeg menu. IQ Rest maakt automatisch een standaardcategorie aan.",
      },
      title: "Automatische standaardcategorie — sla het lege menu over",
      subtitle:
        "Nieuwe gebruikers landen op een menu met een standaardcategorie al aangemaakt.",
      intro:
        "De oude onboarding vereiste dat gebruikers een categorie aanmaakten voordat ze een gerecht konden toevoegen. IQ Rest maakt nu automatisch een standaardcategorie 'Menu' aan.",
      sections: [
        {
          title: "Standaardcategorie aangemaakt bij aanmelden",
          body: "De eerste keer dat je je aanmeldt, controleert IQ Rest of je categorieën hebt. Zo niet, dan maakt het er een aan.",
        },
        {
          title: "Hernoemd om bij je keuken te passen",
          body: "Als je de wizard gebruikte, genereert de seeder keukenpassende categorieën in plaats daarvan.",
        },
        {
          title: "Backwards-compatibel",
          body: "Als je al categorieën hebt, wordt de standaard niet aangemaakt.",
        },
      ],
      benefitsTitle: "Waarom auto-default onboarding versnelt",
      benefits: [
        "Geen 'maak eerst categorie aan' barrière",
        "Tik 'Gerecht toevoegen' als eerste actie",
        "Categorie genoemd in jouw taal",
        "Wizard-flow zaait nog steeds keukenpassende categorieën",
        "Bestaande menu's onaangetast",
        "Sneller van aanmelden tot eerste gerecht",
      ],
      conclusionTitle: "Elimineer de lege staat",
      conclusionBody:
        "Lege staten zijn waar nieuwe gebruikers afketsen. Auto-aanmaken van een standaardcategorie verwijdert zo'n barrière.",
      ctaText: "Meld je aan en begin direct met het toevoegen van gerechten.",
      ctaButton: "Bouw mijn menu",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Sla de restaurantnaam-stap over | IQ Rest",
        description:
          "We hebben de 'restaurantnaam'-stap uit onboarding verwijderd.",
      },
      title: "Sla de restaurantnaam-stap over in onboarding",
      subtitle:
        "Je hoeft je restaurantnaam niet te typen om een menu te bouwen.",
      intro:
        "Onboarding-flows die vooraf informatie eisen voelen als formulieren invullen. We hebben de stap verwijderd.",
      sections: [
        {
          title: "Wat er gebeurt als je overslaat",
          body: "Als je de naamstap overslaat, krijgt het restaurant een placeholder ('Jouw restaurant') standaard verborgen op het openbare menu.",
        },
        {
          title: "Stel het in vanaf overal",
          body: "Het naamveld is bewerkbaar vanuit instellingen, vanuit de menu-hero (tik om inline te bewerken).",
        },
        {
          title: "Geen SEO-straf voor standaardwaarde",
          body: "We gebruiken de slug als fallback voor de paginatitel en SEO-meta-tags.",
        },
      ],
      benefitsTitle: "Waarom overslaan onboarding versnelt",
      benefits: [
        "Geen beslissingsdruk",
        "Land sneller in het dashboard",
        "Stel de naam in wanneer inspiratie komt",
        "Inline bewerking",
        "Openbaar menu werkt zonder ingestelde naam",
        "Geen SEO-straf",
      ],
      conclusionTitle: "Minder beslissingen, meer gedaan",
      conclusionBody:
        "Elk formulierveld in onboarding is een kans voor de gebruiker om af te ketsen.",
      ctaText: "Meld je aan in seconden — geen restaurantnaam vereist.",
      ctaButton: "Start gratis proefperiode",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Probeer QR-menu vóór aanmelding — Anoniem | IQ Rest",
        description:
          "Bouw een voorbeeldmenu voordat je een account aanmaakt.",
      },
      title: "Probeer een QR-menu voordat je je aanmeldt",
      subtitle:
        "Bouw een voorbeeldmenu, zie hoe je QR-code eruitziet, bekijk de live ervaring — alles voordat je een account aanmaakt.",
      intro:
        "De meeste QR-menu-diensten eisen dat je een account aanmaakt voordat je iets kunt doen. IQ Rest laat je nu een volledig voorbeeldmenu anoniem bouwen.",
      sections: [
        {
          title: "Anonieme sessie bewaart je werk",
          body: "Een anoniem sessie-ID wordt aangemaakt bij je eerste bezoek. We bewaren de sessie 7 dagen.",
        },
        {
          title: "Bewaar voortgang via e-mailink",
          body: "Wanneer je besluit dat je het menu wilt behouden, klik 'Voortgang bewaren'. We sturen een magische link.",
        },
        {
          title: "Reduceert aanmeldingsangst tot nul",
          body: "Restaurants die anoniem proberen converteren hoger dan restaurants die gedwongen worden zich eerst aan te melden.",
        },
      ],
      benefitsTitle: "Waarom anonieme onboarding wint",
      benefits: [
        "Bouw een echt menu zonder een account aan te maken",
        "Anonieme sessie blijft 7 dagen",
        "Bewaar voortgang naar e-mail",
        "Geen herinvoer",
        "Wrijvingsloze productevaluatie",
        "Hogere algemene aanmeldconversie",
      ],
      conclusionTitle: "Laat het product zichzelf verkopen",
      conclusionBody:
        "De beste manier om een restauranthouder te overtuigen is hen het te laten gebruiken.",
      ctaText: "Probeer IQ Rest nu — geen account nodig.",
      ctaButton: "Probeer gratis",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Bewaar menu-voortgang via e-mailink | IQ Rest",
        description:
          "Anoniem een voorbeeldmenu gebouwd? Bewaar het naar je e-mail.",
      },
      title: "Bewaar je menu-voortgang via e-mailink",
      subtitle:
        "Anoniem een menu gebouwd en wil je het behouden? Typ je e-mail. We sturen een magische link.",
      intro:
        "De 'Voortgang bewaren' functie van IQ Rest zet je anonieme sessie om in een echt account via een magische link.",
      sections: [
        {
          title: "Magische-link-flow — geen wachtwoord",
          body: "We sturen een eenmalige link. Klik binnen 10 minuten en je bent ingelogd in een nieuw account dat het anoniem gebouwde menu bevat.",
        },
        {
          title: "Conflictbeheer voor bestaande accounts",
          body: "Als de e-mail al een account heeft, vragen we of je wilt samenvoegen of weggooien.",
        },
        {
          title: "Rate-limited en spam-resistent",
          body: "We rate-limiten verzoeken per IP en per e-mail. De link verloopt in 10 minuten.",
        },
      ],
      benefitsTitle: "Waarom magische-link-bewaren wint",
      benefits: [
        "Geen wachtwoord",
        "Anoniem werk wordt intact overgedragen",
        "Bestaande accounts: kies samenvoegen of weggooien",
        "Rate-limited en tijdgebonden",
        "Eén tik om te committeren",
        "De e-mail zelf fungeert als verificatie",
      ],
      conclusionTitle: "Conversie zonder wrijving",
      conclusionBody:
        "Magische links laten een lang aanmeldformulier ineenzakken tot één e-mailveld plus een inboxklik.",
      ctaText: "Bouw een menu anoniem, bewaar het dan via e-mail.",
      ctaButton: "Probeer gratis",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Eén-klik Stripe-checkout voor terugkerende gebruikers | IQ Rest",
        description:
          "Al ingelogd? Klik een plan in pricing en ga rechtstreeks naar de Stripe-checkout.",
      },
      title: "Eén-klik Stripe-checkout voor terugkerende gebruikers",
      subtitle:
        "Ingelogde gebruiker klikt een plan? Rechtstreeks naar de Stripe-checkout. Twee klikken van pricing tot abonnement actief.",
      intro:
        "Terugkerende gebruikers zouden niets moeten herbevestigen bij upgrade. We hebben elk tussenscherm verwijderd.",
      sections: [
        {
          title: "Detecteer ingelogde status",
          body: "Onze pricing-pagina controleert bij laden op een geauthenticeerd sessiecookie. Als je ingelogd bent, gaan de plan-knoppen rechtstreeks naar /api/stripe/checkout.",
        },
        {
          title: "UI-taal doorgestuurd naar Stripe",
          body: "Je dashboard-taal wordt doorgestuurd naar Stripe Checkout via de locale-parameter.",
        },
        {
          title: "Return-URL brengt je terug naar het dashboard",
          body: "Stripe stuurt door naar de dashboard-root in jouw taal. De webhook werkt je abonnementsstatus server-side bij voordat je arriveert.",
        },
      ],
      benefitsTitle: "Waarom eén-klik checkout converteert",
      benefits: [
        "Twee klikken",
        "Geen interstitial voor ingelogde gebruikers",
        "Stripe checkout in dashboard-taal",
        "Return-URL brengt je naar het ge-upgradet dashboard",
        "Webhook werkt het plan bij vóór aankomst",
        "Nieuwe gebruikers hebben standaard flow",
      ],
      conclusionTitle: "Maak het makkelijke pad triviaal makkelijk",
      conclusionBody:
        "De gebruiker die al overtuigd is heeft niet meer overtuiging nodig — hij heeft minder klikken nodig.",
      ctaText: "Al gebruiker? Kies je plan en upgrade in twee klikken.",
      ctaButton: "Bekijk prijzen",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Dashboard UI-redesign: kaarten, navigatie, formulieren | IQ Rest",
        description:
          "IQ Rest dashboard opnieuw ontworpen met consistente kaartcomponenten, persistente sidebar-navigatie en verbeterde formulieracties.",
      },
      title: "Dashboard UI-redesign: consistente kaarten, navigatie en formulieracties",
      subtitle:
        "Een gepolijst dashboard met geünificeerde kaartstijl, persistente sidebar-navigatie, accentkleur actieve staten.",
      intro:
        "IQ Rest heeft een uitgebreide dashboard UI-redesign ondergaan. Elke pagina gebruikt nu consistente kaartstijl.",
      sections: [
        {
          title: "Consistent kaartontwerp op alle pagina's",
          body: "Elke dashboardpagina gebruikt nu een geünificeerd DashboardCard-component met consistente afgeronde randen.",
        },
        {
          title: "Persistente sidebar-navigatie met actieve staten",
          body: "Op desktop is een persistente sidebar-navigatie nu zichtbaar op elke pagina. De actieve pagina wordt gemarkeerd met een accentkleur achtergrond.",
        },
        {
          title: "Verbeterde formulierpagina's met onderste acties",
          body: "Alle formulierpagina's hebben nu een gedupliceerde opslaan-knop onderaan in accentkleur.",
        },
      ],
      benefitsTitle: "Voordelen van de UI-redesign",
      benefits: [
        "Geünificeerde kaartstijl op alle pagina's",
        "Persistente sidebar-navigatie op desktop",
        "Onderste opslaan-knoppen op alle formulieren",
        "Verwijder- en opslaan-acties duidelijk gescheiden",
        "Sectiekoppen op formulierkaarten",
        "Schonere analytics-pagina",
      ],
      conclusionTitle: "Een gepolijstere dashboard-ervaring",
      conclusionBody:
        "Deze UI-redesign brengt visuele consistentie en verbeterde bruikbaarheid in elke hoek van het IQ Rest-dashboard.",
      ctaText: "Beleef het opnieuw ontworpen dashboard",
      ctaButton: "Open dashboard",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("AI-menuscanner — Maak een digitaal QR-menu uit één foto"),
    "redesigned-dashboard-qr-menu-management": stub("Opnieuw ontworpen dashboard voor QR-menu-beheer"),
    "reservation-emails-analytics-digital-qr-menu": stub("Reservering-e-mails en analytics voor je digitale QR-menu"),
    "multi-currency-geo-pricing-qr-menu": stub("Multi-valuta geo-prijzen voor je QR-menu"),
    "support-qr-menu-restaurant-cafe": stub("Geïntegreerde ondersteuning voor je QR-menu"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Gedetailleerde analytics voor je QR-menu-website"),
    "instant-qr-menu-restaurant-website-generator": stub("Onmiddellijke QR-menu en restaurantwebsite-generator"),
    "subscription-plans-qr-menu-restaurant-website": stub("Abonnementsplannen voor je QR-menu"),
    "public-restaurant-qr-menu-website": stub("Openbare restaurant-QR-menu-website"),
    "add-items-restaurant-qr-menu-website": stub("Voeg gerechten toe aan je QR-menu in seconden"),
    "qr-menu-restaurant-categories": stub("Categorieën voor je restaurant-QR-menu"),
    "easy-qr-menu-cafe-control-panel": stub("Eenvoudig QR-menu café bedieningspaneel"),
    "faq-page-organization": stub("FAQ-pagina-organisatie"),
    "free-restaurant-website-improvements": stub("Verbeteringen van de gratis restaurantwebsite"),
    "user-authentication-interface": stub("Gebruikersauthenticatie-interface"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Voordelen",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Probeer IQ Rest",
    ctaButton: "Start gratis proefperiode",
  };
}
