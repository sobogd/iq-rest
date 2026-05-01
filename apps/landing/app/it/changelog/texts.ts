import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Changelog — Aggiornamenti e nuove funzioni di IQ Rest",
    description:
      "Ogni rilascio di IQ Rest in un unico posto. Nuove funzioni, miglioramenti AI e lanci di prodotto per menù QR, ordini online e prenotazioni.",
  },
  pageTitle: "Changelog",
  pageSubtitle:
    "Ogni aggiornamento che pubblichiamo per rendere più fluidi il tuo menù QR, gli ordini online e le prenotazioni. I più recenti per primi.",
  readMore: "Leggi di più",
  backToList: "Torna al changelog",
  publishedOn: "Pubblicato il",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "Foto dei piatti con AI per menù QR | IQ Rest",
        description:
          "Genera foto dei piatti con uno stile coerente per tutto il tuo menù QR in un clic. Niente foto stock, niente fotografo, niente ritocco.",
      },
      title: "Foto dei piatti generate con AI per tutto il tuo menù QR",
      subtitle:
        "Smetti di cercare nelle gallerie stock e di organizzare servizi fotografici. IQ Rest ora genera un set completo di foto di piatti appetitose, in uno stile unico e coerente — direttamente dai nomi del tuo menù.",
      intro:
        "Fotografare ogni piatto del menù è costoso, lento e raramente coerente. Le librerie di foto stock lasciano buchi e lo stile non si abbina mai del tutto al tuo brand. IQ Rest colma questo divario con la fotografia dei piatti basata su AI integrata: scrivi il nome del piatto, ottieni una foto di alta qualità che si abbina al resto del menù. Ogni immagine è generata appositamente per te, dimensionata sia per il menù QR sia per la stampa.",
      sections: [
        {
          title: "Un solo stile fotografico su tutto il menù",
          body: "Quando un cliente scorre il menù, gli stili discordanti rovinano l'esperienza — uno luminoso, uno cupo, uno dall'alto, uno di lato. IQ Rest genera ogni foto in un unico stile coerente con il brand: stessa direzione di luce, stesso linguaggio del piatto, stessa atmosfera di sfondo. Il risultato sembra un vero servizio fotografico, solo che ogni piatto è stato renderizzato nel momento in cui l'hai aggiunto al menù.",
        },
        {
          title: "Dal nome del piatto al piatto in pochi secondi",
          body: "Niente da spiegare. Aggiungi un piatto — diciamo, «Tagliatelle al tartufo con funghi selvatici» — e IQ Rest crea la foto in background. L'immagine viene caricata sul menù, ottimizzata in WebP e pronta in pochi istanti. Se una foto non è quella che avevi in mente, la rigeneri con un tap. Ogni ristorante riceve generazioni AI gratuite per iniziare, con ricariche convenienti per menù completi.",
        },
        {
          title: "Ottimizzate per mobile e SEO",
          body: "Ogni immagine generata è codificata come WebP compresso all'80% di qualità, poi servita da una CDN Hetzner a Norimberga con sottocampionamento intelligente. Le pagine restano veloci sul 4G, senza skeleton né salti di layout. Le foto sono anche indicizzabili da Google Immagini.",
        },
      ],
      benefitsTitle: "Perché le foto dei piatti con AI contano",
      benefits: [
        "Niente abbonamenti a banche immagini né compensi a fotografi",
        "Stile coerente con il brand su tutti i piatti",
        "I nuovi piatti ricevono automaticamente una foto coordinata",
        "WebP compresso — veloce su mobile, niente salti di layout",
        "Generazioni gratuite incluse in ogni piano",
        "Rigenera qualsiasi foto con un tap finché non è perfetta",
      ],
      conclusionTitle: "Una foto per ogni piatto, senza la produzione",
      conclusionBody:
        "I ristoranti che includono foto vendono più piatti ad alto margine — è una nota meccanica di ricavo. Il motivo per cui la maggior parte dei menù non ha foto è il costo di produzione. IQ Rest elimina del tutto quel costo. Ogni piatto che aggiungi ottiene una bella foto in linea con il brand prima che finisca la configurazione.",
      ctaText: "Genera foto AI per ogni piatto del tuo menù — gratis durante la prova.",
      ctaButton: "Provalo gratis",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "Generatore AI di sfondo copertina ristorante | IQ Rest",
        description:
          "Genera automaticamente una bella immagine di copertina per il tuo menù QR. Adatta alla tua cucina, atmosfera e brand — senza foto stock.",
      },
      title: "Sfondo di copertina del ristorante generato con AI",
      subtitle:
        "Il tuo menù QR trasmette la giusta atmosfera prima ancora che il cliente scorra. IQ Rest ora genera un'immagine di copertina personalizzata che si adatta alla tua cucina e atmosfera — automaticamente.",
      intro:
        "Le prime impressioni contano, soprattutto quando il cliente scansiona un QR al tavolo. Un'immagine di copertina generica vanifica tutto ciò che hai investito nell'arredo. IQ Rest ora genera un'immagine di copertina unica e atmosferica per ogni ristorante — basata sulla cucina che scegli al momento dell'iscrizione.",
      sections: [
        {
          title: "Su misura per la tua cucina e atmosfera",
          body: "Quando completi la procedura guidata, IQ Rest prende la cucina selezionata e genera una copertina coerente. L'italiana riceve calda luce da trattoria con pasta in soft focus. La giapponese riceve linee pulite e composizione equilibrata. La messicana riceve colori vivaci ed energia da street food. Puoi rigenerarla quando vuoi.",
        },
        {
          title: "Ottimizzata per le sezioni hero del menù QR",
          body: "Le immagini di copertina sono generate nel rapporto esatto usato dall'hero del menù QR — nitide su ogni telefono, niente ritagli scomodi. Sono codificate in WebP, servite veloci e con lazy load così il resto del menù si dipinge per primo.",
        },
        {
          title: "Coerenza di brand già pronta",
          body: "Lo stile dell'immagine di copertina è abbinato automaticamente alle foto dei piatti generate con AI per il tuo menù — stesso linguaggio della luce, stessa palette di colori, stessa atmosfera.",
        },
      ],
      benefitsTitle: "Perché una copertina AI batte le stock",
      benefits: [
        "Unica per il tuo ristorante — non una foto stock che usano tutti",
        "Abbinata alla cucina selezionata all'iscrizione",
        "Stesso linguaggio visivo delle foto dei piatti AI",
        "Dimensionata correttamente per l'hero del menù QR",
        "WebP compresso per caricamento veloce su mobile",
        "Rigenerala quando vuoi con un tap",
      ],
      conclusionTitle: "Una copertina che dice «sappiamo quello che facciamo»",
      conclusionBody:
        "Quando un cliente scansiona il tuo QR, la prima cosa che vede è la tua copertina. Un'immagine curata e atmosferica segnala qualità prima che legga il primo nome di piatto. Con IQ Rest, quella cura è automatica — generata gratis all'iscrizione e rigenerabile quando cambi idea.",
      ctaText: "Ottieni una copertina AI personalizzata per il tuo menù QR in meno di un minuto.",
      ctaButton: "Inizia la prova gratuita",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Procedura guidata di iscrizione in 3 passi per menù QR | IQ Rest",
        description:
          "Scegli cucina, nome ristorante, email — e IQ Rest costruisce il tuo menù QR. L'iscrizione più veloce del settore.",
      },
      title: "Procedura guidata in 3 passi: dall'email a un menù QR funzionante in meno di un minuto",
      subtitle:
        "Scegli la cucina. Scrivi il nome del ristorante. Conferma l'email. Fatto — il menù QR è pronto, con piatti di esempio e foto generate con AI.",
      intro:
        "I ristoratori non hanno tempo per un modulo di iscrizione da 10 schermate. Quindi l'abbiamo ridotto a tre. Scegli la cucina, scrivi il nome, conferma l'email. Quando accedi per la prima volta, il menù QR è già popolato di piatti di esempio adatti alla cucina e fotografia AI coerente. Puoi servire un cliente entro 60 secondi dall'inizio dell'iscrizione.",
      sections: [
        {
          title: "Passo 1 — Selezione della cucina",
          body: "Scegli da un'ampia lista: italiana, spagnola, giapponese, messicana, francese, mediterranea, indiana, americana, caffetteria, bar, pizzeria. La scelta guida ogni default: piatti di esempio, stile copertina AI, valuta predefinita e struttura iniziale categorie.",
        },
        {
          title: "Passo 2 — Nome del ristorante",
          body: "Scrivi il nome come lo vedranno i clienti. Lo usiamo ovunque: hero del menù QR, titolo pagina, slug SEO, anteprima social. Saltabile se vuoi rimandare la decisione.",
        },
        {
          title: "Passo 3 — Email o accesso con Google",
          body: "Conferma con email + codice usa-e-getta, o tappa «Accedi con Google» per creazione istantanea. Niente password. Nel momento della conferma, la procedura guidata lancia il seeder del menù in background — categorie create, piatti di esempio inseriti, foto AI generate, copertina pronta.",
        },
      ],
      benefitsTitle: "Perché un'iscrizione in 3 passi batte un modulo",
      benefits: [
        "Meno di 60 secondi dalla landing al menù QR funzionante",
        "Zero decisioni che non puoi cambiare dopo",
        "Piatti di esempio precaricati per cucina",
        "Foto AI e copertina pronte quando accedi",
        "Opzione Google sign-in",
        "Progresso anonimo salvato se abbandoni a metà",
      ],
      conclusionTitle: "L'iscrizione di menù QR più veloce, punto",
      conclusionBody:
        "La maggior parte dei servizi di menù QR ti fa compilare decine di campi prima di vedere qualcosa di utile. IQ Rest inverte la rotta — prima ti diamo un menù funzionante, poi ti facciamo personalizzare. La procedura guidata rimuove ogni barriera tra curiosità e prodotto utilizzabile.",
      ctaText: "Avvia ora la procedura guidata in 3 passi — il tuo menù sarà online in 60 secondi.",
      ctaButton: "Inizia la prova gratuita",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "Menù di esempio generato con AI all'iscrizione | IQ Rest",
        description:
          "Salta lo stato vuoto. IQ Rest genera automaticamente un menù QR iniziale in base alla tua cucina — categorie, piatti, prezzi e foto.",
      },
      title: "Menù di esempio costruito con AI subito dopo l'iscrizione",
      subtitle:
        "Niente più sguardi su un pannello vuoto. IQ Rest semina il tuo account con categorie, piatti e foto AI adeguati alla tua cucina, così editi invece di partire da zero.",
      intro:
        "La parte più difficile di ogni nuovo strumento è lo stato vuoto. I nuovi ristoratori si siedono, vedono un menù vuoto e chiudono la scheda. IQ Rest risolve popolando il menù nel momento dell'iscrizione. Scegli italiana — ottieni antipasti, pasta, pizza, dessert. Scegli giapponese — sushi, ramen, donburi, sake. Ogni categoria ha 6-10 piatti iniziali con foto AI in stile coerente.",
      sections: [
        {
          title: "Categorie e piatti consapevoli della cucina",
          body: "Il seeder usa la cucina che hai scelto per tirare un set curato di categorie sensate per il tuo tipo di ristorante. Una pizzeria riceve «Pizza Classica», «Pizza Speciale», «Antipasti», «Bevande». Un bistrot francese riceve «Entrées», «Plats principaux», «Fromages», «Desserts».",
        },
        {
          title: "Foto e prezzi inclusi",
          body: "Ogni piatto iniziale arriva con una foto AI in stile coerente e un prezzo predefinito ragionevole nella tua valuta locale. I prezzi sono placeholder — li cambierai — ma fanno sembrare il menù reale fin da subito.",
        },
        {
          title: "Edita, non partire da zero",
          body: "Una volta seminati, ogni piatto porta un flag isExample. Non appena modifichi un piatto, il flag cade. I piatti di esempio rimanenti si distinguono visivamente così sai cos'è ancora placeholder.",
        },
      ],
      benefitsTitle: "Perché un menù precaricato vince",
      benefits: [
        "Zero stato vuoto — apri il pannello e vedi un menù funzionante",
        "Categorie e piatti coerenti con la cucina scelta",
        "Foto AI per ogni piatto iniziale in stile unificato",
        "Valuta locale rilevata, prezzi predefiniti già impostati",
        "Il flag di esempio sbiadisce mentre editi",
        "Mostra a stakeholder un menù dall'aspetto reale in pochi minuti",
      ],
      conclusionTitle: "Salta la pagina bianca",
      conclusionBody:
        "Costruire un menù da zero intimorisce. Editarne uno è facile. IQ Rest ti dà un menù iniziale completo nel momento dell'iscrizione, poi ti lascia adattarlo all'offerta reale.",
      ctaText: "Iscriviti e ottieni un menù iniziale completo nella tua cucina.",
      ctaButton: "Costruisci il mio menù",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Tour interattivo del menù per i nuovi utenti | IQ Rest",
        description:
          "Una guida interattiva in 7 passi accompagna i nuovi ristoratori nel pannello del menù QR — niente documentazione, niente video, solo pratica.",
      },
      title: "Tour interattivo del menù in 7 passi alla prima visita",
      subtitle:
        "Non ti facciamo leggere documentazione. La prima volta che apri il menù, IQ Rest ti accompagna — aggiungi categoria, aggiungi piatto, edita, ordina, anteprima, condividi, in sette tap.",
      intro:
        "La maggior parte dei prodotti SaaS seppellisce l'onboarding in un centro assistenza che nessuno legge. IQ Rest fa l'opposto: la prima volta che un nuovo utente atterra sulla pagina del menù, un tour interattivo evidenzia ogni azione chiave in sequenza.",
      sections: [
        {
          title: "Nel prodotto, non in una knowledge base",
          body: "Ogni passo del tour evidenzia l'elemento UI reale sul tuo schermo. Una nuvoletta spiega cosa fa l'elemento e perché conta. Niente screenshot — lo screenshot È il tuo pannello.",
        },
        {
          title: "Progettato attorno al workflow reale",
          body: "I sette passi corrispondono al workflow che un nuovo ristorante esegue davvero. Prima le categorie, poi i piatti, poi rifinire, poi organizzare l'ordine, poi anteprima, poi condivisione via QR.",
        },
        {
          title: "Localizzato in 35 lingue",
          body: "Il testo del tour è tradotto in ogni lingua che IQ Rest supporta. I proprietari ispanofoni ricevono nuvolette in spagnolo, i tedeschi in tedesco, i catalani in catalano.",
        },
      ],
      benefitsTitle: "Perché un tour in-product batte un centro assistenza",
      benefits: [
        "Impara facendo, non leggendo documentazione",
        "7 passi coprono ~95% del workflow",
        "Chiudibile in qualsiasi momento",
        "Persiste tra le sessioni finché completato o saltato",
        "Localizzato in 35 lingue",
        "Niente video da caricare",
      ],
      conclusionTitle: "Da confuso a sicuro in sette passi",
      conclusionBody:
        "Il momento più duro in qualsiasi prodotto sono i primi 30 secondi. Il tour interattivo di IQ Rest rimuove quel rischio — entro un minuto, ogni nuovo utente sa dove aggiungere un piatto, come fare l'anteprima, come condividere.",
      ctaText: "Iscriviti e fatti accompagnare attraverso il tuo primo menù QR in sette tap.",
      ctaButton: "Inizia la prova gratuita",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Landing page specifiche per paese per menù QR | IQ Rest",
        description:
          "I visitatori dall'Italia vedono una landing pensata per ristoranti italiani. La Francia vede la sua. 35 paesi, 35 pagine ottimizzate.",
      },
      title: "Landing page su misura in ogni lingua",
      subtitle:
        "I visitatori non ricevono più una pagina tradotta automaticamente. Ognuna delle 35 lingue supportate ha la sua landing, scritta per quel mercato.",
      intro:
        "Le landing tradotte a macchina convertono male. La grammatica zoppica, i riferimenti culturali sbagliano. IQ Rest ora pubblica una landing unica per ognuna delle 35 lingue supportate — scritta per il mercato, non solo tradotta.",
      sections: [
        {
          title: "Una pagina per lingua, non auto-traduzione",
          body: "Ogni landing vive su /<locale> come route Next.js indipendente. I testi sono in oggetti TypeScript — versionati, type-checked, deployabili separatamente.",
        },
        {
          title: "La geolocalizzazione instrada i visitatori automaticamente",
          body: "La prima volta che un visitatore atterra su iq-rest.com, il nostro modulo geo nginx legge il codice paese e reindirizza alla /<locale> giusta. Indirizziamo perfino le aree catalanofone della Spagna su /ca invece che /es.",
        },
        {
          title: "Tag hreflang e canonici a livello di brand",
          body: "Tutte le 35 landing si riferiscono l'una all'altra via tag hreflang così Google indicizza quella giusta per ogni query. Le URL canoniche puntano alla URL per lingua, non a una root generica.",
        },
      ],
      benefitsTitle: "Perché le landing per paese convertono meglio",
      benefits: [
        "Frasi native per ogni mercato",
        "Il geo-routing serve la pagina giusta automaticamente",
        "hreflang e canoniche seguono le linee guida Google",
        "I visitatori catalani in Catalogna vedono il catalano",
        "Valuta, prezzi e CTA localizzati per mercato",
        "A/B test indipendenti per lingua",
      ],
      conclusionTitle: "35 lingue, 35 porte d'ingresso",
      conclusionBody:
        "Se un ristoratore italiano atterra su una pagina mezza tradotta in inglese con prezzi in stile americano, scappa. Se atterra su una pagina che gli parla in italiano, con prezzi in euro e riferimenti italiani, converte.",
      ctaText: "Prova IQ Rest nella tua lingua — landing su misura per il tuo mercato.",
      ctaButton: "Apri la mia lingua",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Accedi con Google al pannello menù QR | IQ Rest",
        description:
          "Salta password e codici via email. Tappa «Accedi con Google» per accedere al pannello del menù QR in meno di un secondo.",
      },
      title: "Accedi con Google — accesso in un tap al menù QR",
      subtitle:
        "Salta le email OTP e le password dimenticate. Tappa «Continua con Google» e sei nel pannello in meno di un secondo.",
      intro:
        "L'autenticazione email + codice usa-e-getta è sicura ma lenta. IQ Rest ora offre Accedi con Google: tappi un pulsante, scegli l'account Google, sei dentro. Niente password da dimenticare, niente giro nella casella, niente attrito.",
      sections: [
        {
          title: "OAuth Google nativo, non un loop di redirect",
          body: "Usiamo l'SDK ufficiale Google Identity Services con la UI One Tap. Il flusso avviene in un popup nativo, non in un redirect. Verifichiamo l'ID token Google lato server contro le chiavi pubbliche di Google.",
        },
        {
          title: "Stesso account, qualsiasi metodo",
          body: "Se ti sei iscritto con email-OTP e poi scegli Google, colleghiamo gli account per email. Puoi alternare tra metodi a ogni accesso. Inoltro anche la lingua del pannello durante l'accesso Google.",
        },
        {
          title: "Mobile-first — funziona su iOS Safari e Android Chrome",
          body: "Sovrapponiamo un vero pulsante Google sopra la nostra UI invece di scatenare click programmatici. Il pulsante funziona su ogni browser mobile moderno, niente installazione.",
        },
      ],
      benefitsTitle: "Perché Google sign-in batte email OTP",
      benefits: [
        "Un tap per accedere",
        "Niente password da ricordare o resettare",
        "Stesso account che tu usi email o Google",
        "Verificato crittograficamente lato server",
        "Funziona su iOS Safari e Android Chrome",
        "Lingua inoltrata così le email restano nella tua lingua",
      ],
      conclusionTitle: "Il modo più veloce per tornare al pannello",
      conclusionBody:
        "I ristoratori controllano i menù decine di volte a settimana. Google sign-in trasforma un flusso OTP da 30 secondi in un tap da un secondo.",
      ctaText: "Salta la password — accedi con Google in un tap.",
      ctaButton: "Apri pannello",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Notifiche email multilingue in 35 lingue | IQ Rest",
        description:
          "Promemoria di prova, risposte dell'assistenza, email di abbonamento — ogni notifica di IQ Rest arriva nella lingua del tuo pannello.",
      },
      title: "Notifiche email multilingue in tutte le 35 lingue",
      subtitle:
        "Ogni email che IQ Rest invia arriva nella lingua impostata nel pannello. Inclusi i layout da destra a sinistra.",
      intro:
        "Un'email nella lingua sbagliata è attrito nella migliore delle ipotesi. IQ Rest ora invia ogni email transazionale nella lingua impostata nel pannello, su tutte le 35 lingue supportate. Le lingue da destra a sinistra come arabo e persiano ricevono layout correttamente specchiati.",
      sections: [
        {
          title: "preferredLocale viaggia con l'account",
          body: "Ogni utente ha un campo preferredLocale impostato al primo accesso. Ogni job backend che emette un'email preleva preferredLocale dell'utente e lo usa per scegliere il template giusto.",
        },
        {
          title: "Template RTL per arabo e persiano",
          body: "I layout da destra a sinistra non sono solo traduzione — l'intera gerarchia visiva si capovolge. Spediamo template RTL dedicati: navigazione da destra a sinistra, numeri in arabo-indiano, logo posizionato correttamente.",
        },
        {
          title: "Tradotti da esperti del settore",
          body: "Abbiamo tradotto ogni template con terminologia di cucina e ospitalità che suona naturale agli operatori in ogni mercato. «Trial» diventa «periodo di prova» in italiano (non «processo»).",
        },
      ],
      benefitsTitle: "Perché le email multilingue contano",
      benefits: [
        "Tutte le email transazionali nella lingua del pannello",
        "preferredLocale persiste tra gli accessi",
        "Layout RTL per arabo e persiano",
        "Terminologia appropriata all'ospitalità per ogni lingua",
        "Cambiare lingua aggiorna le email future immediatamente",
        "35 lingue inclusi catalano, sloveno, estone, lettone",
      ],
      conclusionTitle: "Email che parlano la tua lingua",
      conclusionBody:
        "La comunicazione che arriva nella lingua sbagliata è comunicazione che non funziona. IQ Rest invia ogni email nella lingua che davvero usi.",
      ctaText: "Iscriviti e ottieni il pannello e ogni email nella tua lingua.",
      ctaButton: "Inizia la prova gratuita",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "Pannello ristorante mobile dal feeling iOS nativo | IQ Rest",
        description:
          "Navigazione a schede in basso, gestione safe-area, input senza zoom — il pannello mobile di IQ Rest si percepisce come un'app nativa su iPhone.",
      },
      title: "Feeling iOS nativo sul telefono",
      subtitle:
        "Navigazione a schede in basso, supporto completo per la safe-area, campi modulo senza zoom e transizioni di pagina istantanee.",
      intro:
        "La maggior parte dei pannelli SaaS per ristoranti sono ripensamenti desktop-first su mobile. IQ Rest è l'opposto — progettato per i proprietari che gestiscono il menù dal telefono tra i servizi.",
      sections: [
        {
          title: "Schede in basso, niente hamburger",
          body: "I menù hamburger su mobile sono lenti. Abbiamo sostituito la sidebar desktop con una barra schede in basso: Menù, Ordini, Prenotazioni, Impostazioni. Un tap a portata di pollice.",
        },
        {
          title: "Safe-area inset e indicatore home",
          body: "Usiamo env(safe-area-inset-*) ovunque — la barra in basso sta sopra l'indicatore home, il padding tiene conto della dynamic island. Si percepisce progettato per il dispositivo.",
        },
        {
          title: "Input senza zoom e invio modulo istantaneo",
          body: "Abbiamo portato ogni input a 16px e configurato il viewport con maximum-scale=1, così i tap non scatenano lo zoom-and-jump che rompe ogni altro pannello web.",
        },
      ],
      benefitsTitle: "Perché il feeling nativo conta su mobile",
      benefits: [
        "Schede in basso — accesso in un tap a ogni sezione",
        "Consapevole della safe-area",
        "Input da 16px — niente zoom-and-jump iOS",
        "Scheda attiva usa il colore d'accento del brand",
        "Transizioni SPA — niente reload completi",
        "Niente app da installare",
      ],
      conclusionTitle: "Un pannello web che si percepisce come un'app",
      conclusionBody:
        "La linea tra web e nativo è soprattutto questione di attenzione al dettaglio. Il pannello mobile di IQ Rest paga questa attenzione e il risultato è qualcosa che giureresti costruita in Swift. Solo che funziona anche su Android.",
      ctaText: "Apri IQ Rest sul telefono e senti la differenza.",
      ctaButton: "Prova gratis 14 giorni",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "Banner di consenso cookie GDPR per sito ristorante | IQ Rest",
        description:
          "Banner di consenso conforme, allineato AEPD, senza script di terze parti. L'analytics cookieless scatta anche prima del consenso.",
      },
      title: "Banner di consenso cookie conforme al GDPR",
      subtitle:
        "Banner costruito su misura senza CMP di terze parti, senza tag script di Cookiebot o OneTrust. Allineato AEPD ed ePrivacy.",
      intro:
        "Ogni sito commerciale nell'UE ha bisogno di un banner di consenso. La maggior parte usa CMP di terze parti che si tirano dietro script pesanti. IQ Rest ha costruito il proprio, leggero, parte del bundle della pagina. I visitatori vedono una scelta chiara Accetta/Rifiuta, con entrambi i pulsanti dello stesso stile.",
      sections: [
        {
          title: "Allineato AEPD ed ePrivacy",
          body: "L'AEPD spagnola e la direttiva ePrivacy richiedono pulsanti della stessa prominenza. Rifiutiamo il dark pattern «accetta enorme, rifiuta minuscolo». I visitatori che rifiutano sono tracciati solo via contatori aggregati cookieless.",
        },
        {
          title: "Niente script di terze parti",
          body: "Niente Cookiebot, niente OneTrust. Il banner è parte del bundle della landing — niente richieste esterne, niente condivisione dati con terzi, caricamento più veloce.",
        },
        {
          title: "Privacy, cookie e termini in modali",
          body: "Cliccare un link legale apre un modale — niente navigazione, niente perdita della posizione di scroll. Il testo legale completo è lì, scrollabile.",
        },
      ],
      benefitsTitle: "Perché il nostro banner batte i CMP di terze parti",
      benefits: [
        "Allineato AEPD ed ePrivacy",
        "Niente script di terze parti",
        "Privacy/Cookie/Termini in modali",
        "Analytics cookieless scatta anche prima del consenso",
        "Cookie di prima parte rimosso al Rifiuto",
        "Leggero — parte del bundle della landing",
      ],
      conclusionTitle: "Conformità senza zavorra di conversione",
      conclusionBody:
        "Il consenso cookie non è negoziabile nell'UE ma non deve rallentare la pagina. Il banner di IQ Rest è veloce, equo e pienamente conforme.",
      ctaText: "Vedi il flusso di consenso in azione — apri IQ Rest in un browser pulito.",
      ctaButton: "Visita la landing",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privacy e termini in modali — niente salti di pagina | IQ Rest",
        description:
          "Privacy, Termini e Cookie Policy ora si aprono in modali sulla landing — niente perdita di scroll, niente navigazione extra.",
      },
      title: "Privacy, termini e cookie policy in modali",
      subtitle:
        "Clicca un qualsiasi link legale e la policy si apre in un modale pulito. Niente navigazione, niente perdita di scroll.",
      intro:
        "Le pagine /privacy, /terms e /cookies autonome erano il pattern standard — e l'errore standard. I visitatori cliccavano, perdevano il posto, leggevano e dimenticavano di tornare. IQ Rest ora apre tutti e tre i documenti come modali in-pagina.",
      sections: [
        {
          title: "Un componente Modal, tre documenti",
          body: "Aprilo dal banner cookie, dalla pagina di auth, dal footer — stesso componente, stesso scroll-locking, stessa chiusura su escape. Il testo legale vive in costanti TypeScript condivise.",
        },
        {
          title: "Stack di modali",
          body: "Se stai leggendo la Cookie Policy e vuoi passare alla Privacy, il link dentro il modale apre il prossimo modale in cima. Lo stack gestisce correttamente la navigazione indietro.",
        },
        {
          title: "Tutte le 35 lingue — stesso testo",
          body: "Il testo legale è in inglese (lingua della nostra entità legale, autónomo registrato in Spagna), ma la chrome del modale è completamente localizzata in tutte le 35 lingue.",
        },
      ],
      benefitsTitle: "Perché i modali battono le pagine legali autonome",
      benefits: [
        "Niente perdita di scroll",
        "Conversione più alta",
        "Componente singolo, tre documenti",
        "Stack di modali",
        "Chrome localizzata in 35 lingue",
        "Conformità legale completa preservata",
      ],
      conclusionTitle: "Legale senza attrito",
      conclusionBody:
        "Gli avvocati vogliono che la policy sia leggibile. I marketer vogliono che il visitatore converta. I modali fanno felici entrambi.",
      ctaText: "Prova il nuovo flusso — apri il banner cookie e tappa un link policy.",
      ctaButton: "Visita la landing",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Catalano automatico per visitatori dalla Catalogna | IQ Rest",
        description:
          "I visitatori da Barcellona, Tarragona, Lleida e Girona vedono automaticamente IQ Rest in catalano invece che in castigliano.",
      },
      title: "Rilevamento automatico del catalano per visitatori dalla Catalogna",
      subtitle:
        "I visitatori da Barcellona, Tarragona, Lleida e Girona atterrano di default sulla versione catalana di IQ Rest. Il resto della Spagna riceve il castigliano.",
      intro:
        "La Catalogna ha una forte identità linguistica — milioni di catalani usano il catalano come prima lingua. IQ Rest ora rispetta questa distinzione a livello geo: i visitatori in una provincia catalana ricevono /ca automaticamente.",
      sections: [
        {
          title: "Geo-rilevamento sull'edge",
          body: "Leggiamo paese e regione del visitatore dal nostro modulo geo nginx a ogni richiesta. Se il paese è la Spagna e la regione corrisponde a Barcellona, Tarragona, Lleida o Girona, reindirizziamo a /ca.",
        },
        {
          title: "Il cookie di lingua sovrascrive il geo",
          body: "Una volta che scegli una lingua manualmente, la scelta è persistita in un cookie che sovrascrive il geo per le visite future. La scelta esplicita vince sempre.",
        },
        {
          title: "Traduzione catalana completa, non auto-tradotta",
          body: "La landing /ca non è auto-tradotta — ogni parola è tradotta professionalmente da copywriter catalanofoni del settore della ristorazione.",
        },
      ],
      benefitsTitle: "Perché l'auto-catalano conta",
      benefits: [
        "Visitatori da Barcellona/Tarragona/Lleida/Girona vedono il catalano automaticamente",
        "Il resto della Spagna riceve il castigliano",
        "La scelta manuale persiste via cookie",
        "Traduzione professionale completa",
        "Geo-rilevamento sull'edge — niente flicker",
        "Stessa landing ottimizzata di ogni altra locale",
      ],
      conclusionTitle: "Rispetto dell'identità linguistica",
      conclusionBody:
        "Mettere di default i visitatori catalani in castigliano è una piccola cosa tecnicamente ma una grande cosa politicamente e culturalmente. Il geo-routing di IQ Rest ora tratta il catalano come lingua di prima classe.",
      ctaText: "Visita IQ Rest dalla Catalogna e vedi la pagina nella tua lingua.",
      ctaButton: "Apri landing catalana",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modale prova scaduta — il menù QR resta pubblico | IQ Rest",
        description:
          "Quando la prova finisce, il menù non sparisce. I clienti possono ancora scansionare; tu vedi un modale di upgrade nel pannello.",
      },
      title: "Prova scaduta? Il menù QR resta online per i clienti",
      subtitle:
        "La scadenza non spegne più il menù pubblico. I clienti possono ancora scansionare; solo il pannello ti invita a fare l'upgrade.",
      intro:
        "Il vecchio comportamento di scadenza prova era duro: quando i tuoi 14 giorni finivano, il menù QR pubblico andava al buio. Se capitava nel mezzo del servizio, era un disastro. L'abbiamo cambiato. Ora la scadenza ti mostra un modale dentro il pannello, ma il menù pubblico continua a servire i clienti normalmente.",
      sections: [
        {
          title: "Il menù pubblico resta online",
          body: "La prova di 14 giorni finisce silenziosamente dal punto di vista del cliente. Il menù QR, gli ordini, le prenotazioni — tutto continua a funzionare. Il proprietario vede il modale al successivo accesso.",
        },
        {
          title: "Modale nel pannello, non un redirect duro",
          body: "Niente più redirect forzato a una pagina di fatturazione. Mostriamo un modale pulito che può essere chiuso; puoi continuare a navigare nel pannello.",
        },
        {
          title: "Anteprima sempre disponibile",
          body: "Anche con la prova scaduta, puoi ancora vedere l'anteprima del menù. Non ti blocchiamo dal vedere ciò che vedono i clienti.",
        },
      ],
      benefitsTitle: "Perché una scadenza morbida batte un cutoff duro",
      benefits: [
        "Il menù QR pubblico resta online",
        "Niente downtime a sorpresa",
        "Modale nel pannello invece di redirect forzato",
        "Anteprima sempre disponibile",
        "Richiami di upsell inline",
        "Il proprietario fa l'upgrade secondo il proprio calendario",
      ],
      conclusionTitle: "Rispetta gli orari del ristorante",
      conclusionBody:
        "I ristoranti operano su margini stretti e calendari ancora più stretti. Una scadenza morbida tiene le luci accese per i clienti mentre comunque spinge il proprietario verso un piano a pagamento.",
      ctaText: "Inizia la prova di 14 giorni sapendo che il menù resta online.",
      ctaButton: "Inizia la prova gratuita",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Piatto: terminologia più chiara | IQ Rest",
        description:
          "Abbiamo rinominato «Item» in «Piatto» in tutto il pannello. I ristoratori non dovrebbero tradurre terminologia SaaS in testa.",
      },
      title: "Item → Piatto: terminologia più chiara in tutto l'editor",
      subtitle:
        "Abbiamo sostituito «Item» con «Piatto» in ogni superficie del pannello. Cambio piccolo, grande boost di chiarezza.",
      intro:
        "Le persone del software dicono «item». Le persone del ristorante dicono «piatto». Abbiamo rinominato tutto: pulsanti, etichette, messaggi di successo, stati di errore, titoli di pagina.",
      sections: [
        {
          title: "Dove si applica la rinomina",
          body: "Ogni superficie utente: pulsanti, etichette, toast di successo, errori di validazione modulo, breadcrumb, intestazioni del pannello — tutti aggiornati. La colonna interna del database si chiama ancora «item» per retro-compatibilità.",
        },
        {
          title: "Tradotto in tutte le 35 lingue",
          body: "Spagnolo «plato», francese «plat», tedesco «Gericht», italiano «piatto», catalano «plat», giapponese «料理». Niente machine translation; revisori madrelingua hanno controllato.",
        },
        {
          title: "Categoria di default auto-creata anche",
          body: "Abbiamo anche auto-creato una categoria di default chiamata «Menù» alla prima visita. Vecchio comportamento: menù vuoto, dovevi cliccare «Aggiungi categoria» prima. Nuovo: una categoria esiste, tappi «Aggiungi piatto».",
        },
      ],
      benefitsTitle: "Perché la terminologia conta",
      benefits: [
        "«Piatto» corrisponde a come parlano i ristoratori",
        "Aggiornato in ogni superficie del pannello",
        "Tradotto in tutte le 35 lingue",
        "Categoria di default auto-creata",
        "Più veloce dall'iscrizione al primo piatto aggiunto",
        "Meno traduzione mentale = bounce più basso",
      ],
      conclusionTitle: "Parla la lingua dell'utente",
      conclusionBody:
        "La terminologia SaaS generica va bene per gli ingegneri. I ristoratori hanno bisogno di parole che corrispondano a quelle che dicono al lavoro.",
      ctaText: "Iscriviti e aggiungi il primo piatto in meno di un minuto.",
      ctaButton: "Costruisci il mio menù",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Categoria di default auto per onboarding menù | IQ Rest",
        description:
          "I nuovi utenti non affrontano più un menù vuoto. IQ Rest auto-crea una categoria di default così puoi aggiungere il primo piatto subito.",
      },
      title: "Categoria di default automatica — salta il menù vuoto",
      subtitle:
        "I nuovi utenti atterrano su un menù con una categoria di default già creata. Tappa «Aggiungi piatto» e inizia a editare.",
      intro:
        "Il vecchio onboarding richiedeva di creare una categoria prima di poter aggiungere un piatto. IQ Rest ora auto-crea una categoria di default «Menù» la prima volta che apri il pannello.",
      sections: [
        {
          title: "Categoria di default creata al sign-in",
          body: "La prima volta che accedi a un pannello fresco, IQ Rest controlla se hai categorie. Se no, ne crea una chiamata «Menù» (tradotta nella tua locale).",
        },
        {
          title: "Rinominata per matchare la cucina con la procedura guidata",
          body: "Se hai usato la procedura guidata in 3 passi, il seeder genera categorie adeguate alla cucina. La categoria di default «Menù» entra in gioco solo per chi ha saltato la procedura.",
        },
        {
          title: "Retrocompatibile",
          body: "Se hai già categorie, la default non viene creata. Interveniamo solo quando il menù è davvero vuoto.",
        },
      ],
      benefitsTitle: "Perché l'auto-default velocizza l'onboarding",
      benefits: [
        "Niente barriera «crea prima la categoria»",
        "Tappa «Aggiungi piatto» come prima azione",
        "Categoria nominata nella tua lingua",
        "Procedura guidata semina ancora categorie adeguate",
        "Menù esistenti intoccati",
        "Più veloce dall'accesso al primo piatto aggiunto",
      ],
      conclusionTitle: "Elimina lo stato vuoto",
      conclusionBody:
        "Gli stati vuoti sono dove i nuovi utenti rimbalzano. Ogni barriera tra l'utente e la prima azione produttiva ti costa conversioni.",
      ctaText: "Iscriviti e inizia ad aggiungere piatti subito.",
      ctaButton: "Costruisci il mio menù",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Salta il passo nome ristorante nell'onboarding | IQ Rest",
        description:
          "Abbiamo eliminato il passo «nome ristorante». Impostalo dopo nelle impostazioni — o direttamente dall'hero del menù.",
      },
      title: "Salta il passo nome ristorante nell'onboarding",
      subtitle:
        "Non devi scrivere il nome del ristorante per iniziare a costruire un menù. Imposta il nome dopo dal pannello.",
      intro:
        "I flussi di onboarding che chiedono informazioni in anticipo sembrano riempire moduli. I nuovi utenti spesso non avevano deciso l'ortografia esatta — quindi si bloccavano. Abbiamo rimosso il passo.",
      sections: [
        {
          title: "Cosa succede quando salti",
          body: "Se salti, il ristorante riceve un placeholder («Il tuo ristorante») nascosto di default. Non appena imposti il nome nelle impostazioni, appare nell'hero, nel titolo, nello slug SEO e nelle condivisioni social.",
        },
        {
          title: "Impostalo da dovunque",
          body: "Il campo nome è editabile dalle impostazioni, dall'hero del menù (tappa per editare inline) e dalla schermata di anteprima pubblica.",
        },
        {
          title: "Niente penalizzazione SEO",
          body: "Usiamo lo slug come fallback per il titolo e i meta tag SEO. I motori di ricerca non ti penalizzano. Quando imposti un nome reale, i meta tag si aggiornano e Google ricrawl in poche ore.",
        },
      ],
      benefitsTitle: "Perché saltare velocizza l'onboarding",
      benefits: [
        "Niente pressione di decisione nel momento sbagliato",
        "Atterri nel pannello più velocemente",
        "Imposta il nome quando arriva l'ispirazione",
        "Edit inline dall'hero del menù",
        "Il menù pubblico funziona senza nome",
        "Niente penalizzazione SEO",
      ],
      conclusionTitle: "Meno decisioni, più fatto",
      conclusionBody:
        "Ogni campo modulo nell'onboarding è una possibilità di rimbalzo. Rimuovendo il campo nome ristorante, abbiamo rimosso una di quelle.",
      ctaText: "Iscriviti in pochi secondi — niente nome ristorante richiesto.",
      ctaButton: "Inizia la prova gratuita",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Prova il menù QR prima dell'iscrizione — Anonimo | IQ Rest",
        description:
          "Costruisci un menù di esempio prima di creare un account. Salva i progressi via email quando vuoi tenerlo.",
      },
      title: "Prova un menù QR prima di iscriverti",
      subtitle:
        "Costruisci un menù di esempio, vedi com'è il QR, vedi l'anteprima live — tutto prima di creare un account.",
      intro:
        "La maggior parte dei servizi di menù QR esige che tu crei un account prima di poter fare qualsiasi cosa. È l'ordine sbagliato. IQ Rest ora ti lascia costruire un menù di esempio completo anonimamente. Quando vuoi tenerlo, te lo salviamo via email.",
      sections: [
        {
          title: "Una sessione anonima conserva il tuo lavoro",
          body: "Un ID di sessione anonimo viene creato alla prima visita. Ogni categoria, piatto, foto è associato a quella sessione. Persistiamo la sessione 7 giorni.",
        },
        {
          title: "Salva il progresso via link email",
          body: "Quando decidi che vuoi tenere il menù, clicca «Salva progresso». Scrivi la tua email. Ti mandiamo un magic link che converte la sessione anonima in un account reale. Tutto si trasferisce automaticamente.",
        },
        {
          title: "Riduce a zero l'ansia da iscrizione",
          body: "I visitatori non devono decidere se IQ Rest vale la loro email — possono vederlo da soli. I ristoranti che provano anonimamente convertono di più di chi è forzato a iscriversi prima.",
        },
      ],
      benefitsTitle: "Perché l'onboarding anonimo vince",
      benefits: [
        "Costruisci un menù reale senza creare un account",
        "La sessione anonima persiste 7 giorni",
        "Salva il progresso all'email quando vuoi",
        "Niente reinserimento — il lavoro si trasferisce",
        "Valutazione del prodotto senza attrito",
        "Conversione complessiva di iscrizione più alta",
      ],
      conclusionTitle: "Lascia che il prodotto si venda da solo",
      conclusionBody:
        "Il modo migliore di convincere un ristoratore che IQ Rest è giusto per lui è lasciarlo usare. L'onboarding anonimo trasforma un visitatore curioso in un utente impegnato senza chiedere nulla in cambio.",
      ctaText: "Prova IQ Rest ora — niente account necessario.",
      ctaButton: "Provalo gratis",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Salva il progresso del menù via link email | IQ Rest",
        description:
          "Costruito un menù di esempio anonimamente? Salvalo alla tua email e ti mandiamo un magic link.",
      },
      title: "Salva il progresso del menù via link email",
      subtitle:
        "Costruito un menù anonimamente e vuoi tenerlo? Scrivi l'email. Mandiamo un magic link che converte il lavoro anonimo in un account reale in un tap.",
      intro:
        "La funzione «Salva progresso» di IQ Rest converte la tua sessione anonima in un account reale via un magic link. Scrivi l'email, clicca il link, il menù è permanentemente associato all'account. Niente password, niente modulo, niente reinserimento.",
      sections: [
        {
          title: "Flusso magic link — niente password",
          body: "Mandiamo un link usa-e-getta. Cliccalo entro 10 minuti e sei loggato in un nuovo account che contiene il menù costruito anonimamente. Niente password da scegliere.",
        },
        {
          title: "Gestione conflitti per account esistenti",
          body: "Se l'email ha già un account, non lo sovrascriviamo. Ti chiediamo se fondere il menù anonimo o scartarlo.",
        },
        {
          title: "Rate-limited e resistente allo spam",
          body: "Limitiamo le richieste per IP e per email. Il link scade in 10 minuti ed è usa-e-getta.",
        },
      ],
      benefitsTitle: "Perché il salvataggio via magic link vince",
      benefits: [
        "Niente password da scegliere o ricordare",
        "Lavoro anonimo si trasferisce intatto",
        "Account esistenti: scegli di fondere o scartare",
        "Rate-limited e a tempo",
        "Un tap per impegnarsi",
        "L'email stessa fa da verifica",
      ],
      conclusionTitle: "Conversione senza attrito",
      conclusionBody:
        "I magic link collassano un modulo di iscrizione lungo in un singolo campo email più un click in casella. È il flusso di conversione con meno attrito del settore.",
      ctaText: "Costruisci un menù anonimamente, poi salvalo via email.",
      ctaButton: "Provalo gratis",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Checkout Stripe in un click per utenti di ritorno | IQ Rest",
        description:
          "Già loggato? Clicca un piano in pricing e vai dritto al checkout Stripe. Niente reinserimento, niente schermate extra.",
      },
      title: "Checkout Stripe in un click per utenti di ritorno",
      subtitle:
        "Utente loggato clicca un piano? Dritto al checkout Stripe. Due click dalla pagina pricing all'abbonamento attivo.",
      intro:
        "Gli utenti di ritorno non dovrebbero dover riconfermare nulla quando fanno upgrade. Abbiamo rimosso ogni schermata intermedia tra «click piano» e «atterra sul checkout». Due click totali.",
      sections: [
        {
          title: "Rilevare lo stato loggato in pricing",
          body: "La pagina pricing controlla un cookie di sessione autenticato al caricamento. Se sei loggato, i pulsanti del piano vanno direttamente a /api/stripe/checkout.",
        },
        {
          title: "Lingua UI inoltrata a Stripe",
          body: "La tua lingua del pannello è inoltrata via il parametro locale, così la pagina di checkout si renderizza nella tua lingua.",
        },
        {
          title: "Return URL ti riporta nel pannello",
          body: "Stripe reindirizza alla root del pannello nella tua lingua. Il webhook aggiorna lo stato di abbonamento prima che arrivi.",
        },
      ],
      benefitsTitle: "Perché il checkout in un click converte",
      benefits: [
        "Due click da pricing ad abbonamento attivo",
        "Niente intersizio per utenti loggati",
        "Stripe checkout nella lingua del pannello",
        "Return URL ti porta al pannello aggiornato",
        "Webhook aggiorna il piano prima dell'arrivo",
        "Nuovi utenti hanno ancora il flusso standard",
      ],
      conclusionTitle: "Rendi banalmente facile la strada facile",
      conclusionBody:
        "L'utente già convinto non ha bisogno di più convinzione — ha bisogno di meno click. Il checkout in un click rimuove ogni schermata tra intenzione e pagamento.",
      ctaText: "Già utente? Scegli il piano e fai upgrade in due click.",
      ctaButton: "Vedi prezzi",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Restyling UI del pannello: card, navigazione, moduli | IQ Rest",
        description:
          "Pannello IQ Rest ridisegnato con componenti card coerenti, navigazione laterale persistente e azioni di modulo migliorate.",
      },
      title: "Restyling UI del pannello: card coerenti, navigazione e azioni di modulo",
      subtitle:
        "Un pannello rifinito con stile card unificato, navigazione laterale persistente, stati attivi in colore d'accento e azioni salva/elimina in basso su ogni pagina di modulo.",
      intro:
        "IQ Rest ha subito un restyling completo della UI del pannello. Ogni pagina ora usa stile card coerente con raggi di bordo unificati, una navigazione laterale persistente con stati attivi in colore d'accento e pagine di modulo migliorate con azioni di salva ed elimina in basso.",
      sections: [
        {
          title: "Design di card coerente in tutte le pagine",
          body: "Ogni pagina del pannello ora usa un componente DashboardCard unificato con bordi arrotondati coerenti, colori di sfondo discreti e intestazioni di sezione opzionali. Analytics, fatturazione, impostazioni, contatti condividono lo stesso linguaggio visivo.",
        },
        {
          title: "Navigazione laterale persistente con stati attivi",
          body: "Sugli schermi desktop, una navigazione laterale persistente è ora visibile su ogni pagina. La pagina attiva è evidenziata con uno sfondo in colore d'accento. Sotto-pagine evidenziano correttamente l'item Menù padre.",
        },
        {
          title: "Pagine di modulo migliorate con azioni in basso",
          body: "Tutte le pagine di modulo presentano un pulsante salva duplicato in basso in colore d'accento. I pulsanti di elimina appaiono sul lato sinistro con stile attenuato. Non devi più scorrere indietro su per salvare.",
        },
      ],
      benefitsTitle: "Benefici del restyling UI",
      benefits: [
        "Stile card unificato su tutte le pagine",
        "Navigazione laterale persistente su desktop",
        "Pulsanti di salvataggio in basso",
        "Azioni elimina e salva chiaramente separate",
        "Intestazioni di sezione su card di modulo",
        "Pagina analytics più pulita",
      ],
      conclusionTitle: "Un'esperienza pannello più rifinita",
      conclusionBody:
        "Questo restyling porta coerenza visiva e usabilità migliorata in ogni angolo del pannello IQ Rest. Combinata con la navigazione laterale persistente, gestire il menù QR è più veloce e gradevole che mai.",
      ctaText: "Vivi il pannello ridisegnato",
      ctaButton: "Apri pannello",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("Scanner di menù con AI — Crea un menù QR digitale da una foto"),
    "redesigned-dashboard-qr-menu-management": stub("Pannello ridisegnato per la gestione del menù QR"),
    "reservation-emails-analytics-digital-qr-menu": stub("Email di prenotazione e analytics per il menù QR digitale"),
    "multi-currency-geo-pricing-qr-menu": stub("Prezzi multi-valuta geo per il menù QR"),
    "support-qr-menu-restaurant-cafe": stub("Supporto integrato per il menù QR"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Analytics dettagliata per il sito di menù QR"),
    "instant-qr-menu-restaurant-website-generator": stub("Generatore istantaneo di menù QR e sito ristorante"),
    "subscription-plans-qr-menu-restaurant-website": stub("Piani di abbonamento per il menù QR"),
    "public-restaurant-qr-menu-website": stub("Sito pubblico di menù QR"),
    "add-items-restaurant-qr-menu-website": stub("Aggiungi piatti al menù QR in pochi secondi"),
    "qr-menu-restaurant-categories": stub("Categorie per il menù QR"),
    "easy-qr-menu-cafe-control-panel": stub("Pannello di controllo facile per caffetteria"),
    "faq-page-organization": stub("Organizzazione della pagina FAQ"),
    "free-restaurant-website-improvements": stub("Miglioramenti del sito ristorante gratuito"),
    "user-authentication-interface": stub("Interfaccia di autenticazione utente"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Benefici",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Prova IQ Rest",
    ctaButton: "Inizia la prova gratuita",
  };
}
