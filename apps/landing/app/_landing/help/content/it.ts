import type { HelpDoc } from "../types";

// IT help guide. Section ids shared across locales.
export const it: HelpDoc = {
  metaTitle: "Come usare IQ Rest — guida passo passo",
  metaDescription:
    "Guida completa a IQ Rest: registrazione, menu, ordini, prenotazioni, display cucina e impostazioni — per ristoranti.",
  h1: "Aiuto",
  intro: "Una guida dettagliata a IQ Rest — dalla registrazione alle impostazioni più fini.",
  banner: {
    title: "È più semplice di quanto sembri",
    sub: "Una guida passo passo: dalla registrazione alle impostazioni più fini — ci riesce chiunque.",
    cta: "Come si usa",
  },
  tipLabel: "Consiglio",
  noteLabel: "Importante",
  sections: [
    {
      id: "start",
      title: "1. Per iniziare",
      blocks: [
        { type: "h3", text: "Cos'è questo sistema" },
        {
          type: "p",
          text: "IQ Rest è un servizio per ristoranti: crei un menu online con codice QR, ricevi ordini e prenotazioni dei tavoli direttamente dallo smartphone degli ospiti, mentre in cucina e ai camerieri funzionano dei tablet-terminale. Tutto si gestisce da un unico pannello di amministrazione (la dashboard).",
        },
        { type: "h3", text: "Registrazione e accesso" },
        { type: "p", text: "Puoi accedere in tre modi — scegline uno nella schermata di accesso:" },
        {
          type: "list",
          items: [
            "Con Google — premi “Continua con Google” e scegli l'account.",
            "Con Apple — premi “Continua con Apple”.",
            "Via email — premi “Continua con l'email”, inserisci l'indirizzo e ti invieremo un codice di 6 cifre. Inseriscilo nella schermata successiva. Nessuna password necessaria.",
          ],
        },
        {
          type: "note",
          text: "Via email ricevi solo un codice di accesso monouso — niente spam, niente newsletter.",
        },
        { type: "h3", text: "Creazione del ristorante (onboarding)" },
        {
          type: "p",
          text: "Al primo accesso il sistema ti guida in una configurazione rapida. Dopodiché viene creato automaticamente un ristorante con un menu di esempio che poi sostituirai con il tuo.",
        },
        {
          type: "steps",
          items: [
            "Inserisci il nome del ristorante.",
            "Scegli il tipo di cucina (determina il modello di menu iniziale).",
            "Fatto: entri nella dashboard con un menu di esempio già pronto.",
          ],
        },
        {
          type: "note",
          text: "La valuta viene rilevata automaticamente in base alla tua regione — non serve sceglierla all'inizio. Potrai cambiarla più tardi in Impostazioni → Regione.",
        },
        { type: "h3", text: "Panoramica della dashboard" },
        {
          type: "p",
          text: "La navigazione tra le sezioni: su computer è una barra in alto, su telefono una barra in basso. Sezioni: Menu, Ordini, Prenotazioni, Cucina, Analisi e Impostazioni.",
        },
        {
          type: "list",
          items: [
            "Accanto al nome del ristorante, nella barra in alto, c'è un piccolo indicatore di connessione: un punto verde significa che gli ordini si sincronizzano in tempo reale.",
            "Nella pagina “Menu” in alto c'è il pulsante “Anteprima” — apre il tuo menu come lo vede l'ospite.",
            "Sempre lì il pulsante “Condividi” — mostra il codice QR e il link al menu (puoi copiare il link, scaricare il QR o aprire il menu).",
          ],
        },
        {
          type: "tip",
          text: "Premi “Anteprima” dopo ogni modifica al menu — vedi subito come appare all'ospite.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "La sezione “Menu” è il cuore del sistema. Qui costruisci la struttura: categorie → piatti → opzioni. Aprila dalla navigazione.",
        },
        { type: "h3", text: "Categorie e sottocategorie" },
        {
          type: "steps",
          items: [
            "Premi “Aggiungi categoria” e inserisci un nome (per esempio “Antipasti”).",
            "Per modificare una categoria — passaci sopra e premi “Modifica categoria”.",
            "L'ordine delle categorie si cambia con i pulsanti “Su” / “Giù” — l'ospite le vedrà esattamente in quest'ordine.",
            "Puoi creare un “Gruppo” (con “Aggiungi gruppo”) — una categoria-sezione che contiene altre categorie.",
          ],
        },
        { type: "h3", text: "Aggiungere piatti" },
        {
          type: "steps",
          items: [
            "Espandi una categoria (freccia a sinistra) e premi “Aggiungi piatto”.",
            "Compila nome, prezzo e descrizione.",
            "Aggiungi una foto: “Aggiungi foto” — carica la tua, oppure premi “Genera” e descrivi il piatto a parole perché l'IA crei l'immagine.",
            "Salva. Il piatto compare nella categoria.",
          ],
        },
        {
          type: "tip",
          text: "La foto può essere generata dall'IA: indica l'angolazione, l'illuminazione o lo sfondo (per esempio “Pizza Margherita su un tagliere di legno, vista dall'alto”).",
        },
        { type: "h3", text: "Opzioni e varianti (modificatori)" },
        {
          type: "p",
          text: "Le opzioni sono scelte all'interno di un piatto: dimensione, cottura, ingredienti extra. Ogni opzione ha delle varianti, e a una variante si può aggiungere un sovrapprezzo (per esempio “+1.50 cad.”).",
        },
        {
          type: "list",
          items: [
            "Esempio: un'opzione “Dimensione” con varianti “Piccola / Grande (+2.00)”.",
            "Esempio: un'opzione “Extra” con più varianti tra cui l'ospite ne sceglie una o più.",
          ],
        },
        { type: "h3", text: "Allergeni e diete" },
        {
          type: "p",
          text: "Per un piatto puoi indicare gli allergeni (glutine, frutta a guscio, ecc.) e le etichette dietetiche (vegetariano, vegano). L'ospite li vedrà come icone nel menu pubblico.",
        },
        { type: "h3", text: "Visibilità dei piatti" },
        {
          type: "p",
          text: "Il pulsante “Nascondi piatto” / “Mostra piatto” rimuove temporaneamente una voce dal menu pubblico senza eliminarla — comodo quando un piatto è finito.",
        },
        { type: "h3", text: "Caricare un menu cartaceo (scansione)" },
        {
          type: "p",
          text: "Se hai già un menu come foto o PDF — non inserirlo a mano. Usa la scansione:",
        },
        {
          type: "steps",
          items: [
            "Premi il banner “Carica menu” (o “Carica il tuo menu cartaceo”).",
            "Aggiungi fino a 5 file (foto/scansione, fino a 20 MB ciascuno) e premi “Scansiona”.",
            "Attendi fino a un minuto — l'IA riconosce categorie e piatti.",
            "Controlla ciò che è stato riconosciuto, seleziona le voci desiderate e premi “Continua”.",
            "Scegli: sostituire il menu attuale o aggiungere le nuove voci a quello esistente.",
          ],
        },
        {
          type: "note",
          text: "Gli esempi del modello iniziale vengono rimossi quando salvi il menu scansionato — è normale.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Tavoli e codici QR",
      blocks: [
        {
          type: "p",
          text: "I tavoli servono ad associare ordini e prenotazioni a posti specifici e a stampare codici QR personali. Sezione: Impostazioni → Tavoli.",
        },
        { type: "h3", text: "Creare i tavoli" },
        {
          type: "steps",
          items: [
            "Apri Impostazioni → Tavoli e premi “Aggiungi tavolo”.",
            "Indica il numero del tavolo, i posti e (facoltativo) un nome — per esempio “Finestra”, “Bar”, “Terrazza”.",
            "Aggiungi una foto del tavolo — gli ospiti la vedono e capiscono esattamente dov'è il loro tavolo.",
            "Imposta un colore del tavolo — con quel colore il tavolo viene evidenziato in cucina e nella sezione “Ordini”, così lo staff lo trova in fretta.",
            "Se vuoi, aggiungi una breve descrizione.",
            "Salva.",
          ],
        },
        {
          type: "note",
          text: "La foto del tavolo è per gli ospiti (riferimento “dov'è il mio tavolo”). Il colore è per lo staff (un marcatore visivo rapido del tavolo in cucina e negli ordini).",
        },
        { type: "h3", text: "Codice QR del tavolo" },
        {
          type: "p",
          text: "Ogni tavolo ha il proprio codice QR. L'ospite lo scansiona con il telefono ed entra subito nel menu di quel tavolo — l'ordine viene associato automaticamente al tavolo giusto.",
        },
        {
          type: "steps",
          items: [
            "Premi “Mostra codice QR” sul tavolo che ti serve.",
            "Premi “Scarica QR” per salvare l'immagine.",
            "Stampalo e mettilo sul tavolo (su un supporto, nel menu, su un adesivo).",
          ],
        },
        {
          type: "tip",
          text: "Il “Link del tavolo” è lo stesso link del QR ma come testo. Puoi inviarlo all'ospite in chat.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Ordini",
      blocks: [
        { type: "h3", text: "Come ordina l'ospite" },
        {
          type: "p",
          text: "L'ospite scansiona il QR sul tavolo → si apre il menu → sceglie piatti, opzioni e quantità → invia l'ordine. L'ordine compare subito nella tua dashboard e sul terminale di cucina/cameriere.",
        },
        {
          type: "note",
          text: "Perché gli ospiti possano ordinare, in Impostazioni → Ordini deve essere attivo “Accetta ordini”. Se è disattivo, l'ospite vede il menu ma non c'è il pulsante d'ordine.",
        },
        { type: "h3", text: "Gestire gli ordini nella dashboard" },
        {
          type: "p",
          text: "La sezione “Ordini” mostra la pianta della sala. I tavoli occupati sono evidenziati e mostrano il numero di ordini attivi. Tocca un tavolo per aprire i suoi ordini.",
        },
        {
          type: "steps",
          items: [
            "Tocca un tavolo → “Avvia ordine” (o apri uno esistente).",
            "“Aggiungi voce” → scegli categoria → piatto → opzioni → se serve indica quantità e note (per esempio “senza cipolla”).",
            "Premi “Aggiungi” — la voce entra nell'ordine.",
          ],
        },
        { type: "h3", text: "Stati delle voci" },
        {
          type: "p",
          text: "Ogni voce ha uno stato: In attesa → In preparazione → Pronto → Servito. Tocca una voce per cambiarne lo stato. Gli stati si sincronizzano con la cucina in tempo reale.",
        },
        { type: "h3", text: "Sconti, divisione, cambio tavolo" },
        {
          type: "list",
          items: [
            "Sconto: “Aggiungi sconto” — percentuale o importo fisso, sull'intero ordine o su una singola voce, con motivazione.",
            "Dividi ordine: “Dividi ordine” — scegli le voci che andranno in un nuovo conto separato.",
            "Cambia tavolo: “Cambia tavolo” — sposta l'ordine su un altro tavolo.",
            "Duplica voce: aggiungine rapidamente un'altra uguale.",
          ],
        },
        { type: "h3", text: "Chiudere un ordine" },
        {
          type: "steps",
          items: [
            "Quando tutte le voci sono servite, premi “Chiudi ordine”.",
            "Scegli un metodo di pagamento (se configurati).",
            "L'ordine si chiude ed esce dalla lista degli attivi.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Cucina (KDS)",
      blocks: [
        {
          type: "p",
          text: "Il display di cucina (KDS) è uno schermo su tablet per i cuochi. I nuovi ordini arrivano in tempo reale e il cuoco segna i piatti come pronti.",
        },
        { type: "h3", text: "Cosa mostra il display" },
        {
          type: "list",
          items: [
            "Schede ordine con voci, opzioni e tempo “in linea”.",
            "Indicazione a colori dello stato: cosa è in preparazione, cosa è pronto.",
            "Un segnale sonoro all'arrivo di un nuovo ordine.",
          ],
        },
        { type: "h3", text: "Come si usa" },
        {
          type: "steps",
          items: [
            "Tocca una voce per portarla allo stato successivo (In preparazione → Pronto).",
            "Attiva il suono con il pulsante “Attiva suono” — così i nuovi ordini avranno un avviso sonoro.",
            "Con lo zoom regoli la dimensione delle schede in base al tablet.",
            "Con i filtri puoi mostrare solo le categorie che ti servono (per esempio solo la linea calda).",
          ],
        },
        {
          type: "note",
          text: "Se il tablet perde internet appare l'avviso “Nessuna connessione”. Collega il Wi-Fi e gli ordini ricominceranno ad arrivare.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Prenotazioni",
      blocks: [
        {
          type: "p",
          text: "Gli ospiti possono prenotare un tavolo dal tuo menu, e tu gestisci le prenotazioni nella sezione “Prenotazioni” (vista “Mese” / “Giorno”).",
        },
        { type: "h3", text: "Configurare le prenotazioni" },
        { type: "p", text: "Per prima cosa attiva e configura le prenotazioni: Impostazioni → Prenotazioni." },
        {
          type: "steps",
          items: [
            "Attiva “Abilita prenotazioni”.",
            "Scegli la modalità di conferma: “Automatica” (le prenotazioni si confermano da sole) o “Manuale” (confermi tu ognuna).",
            "Imposta la “Durata della prenotazione” — per quanto il tavolo resta riservato all'ospite.",
            "Compila l'“Orario settimanale”: per ogni giorno — aperto/chiuso, orari, e se serve la pausa pranzo.",
          ],
        },
        {
          type: "note",
          text: "Per accettare prenotazioni servono i tavoli. Se non ce ne sono, il sistema ti chiederà prima di aggiungerli.",
        },
        { type: "h3", text: "Gestire le prenotazioni" },
        {
          type: "list",
          items: [
            "Le nuove prenotazioni in attesa di decisione sono raccolte nel blocco “In attesa di conferma”.",
            "Pulsanti “Conferma” / “Rifiuta” — per ogni prenotazione.",
            "“Completa” — segnala che l'ospite è arrivato e la prenotazione è conclusa.",
            "Passa tra “Mese” e “Giorno”, sfoglia il periodo con “Indietro” / “Avanti”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Dispositivi (tablet)",
      blocks: [
        {
          type: "p",
          text: "I terminali di cucina, cameriere e prenotazioni sono tablet separati che si collegano al tuo account con un codice. Sezione: Impostazioni → Dispositivi.",
        },
        {
          type: "note",
          text: "I dispositivi sono disponibili con un piano a pagamento o durante una prova attiva.",
        },
        { type: "h3", text: "Collegare un tablet (pairing)" },
        {
          type: "steps",
          items: [
            "Nella dashboard: Impostazioni → Dispositivi → “Aggiungi dispositivo”.",
            "Indica un nome (per esempio “Cucina — linea calda”) e un tipo: Cucina, Cameriere o Prenotazioni.",
            "Premi “Genera codice” — compare un codice di 6 cifre (valido 2 minuti).",
            "Sul tablet apri la schermata di collegamento e inserisci questo codice.",
            "Il tablet si collega e inizia subito a lavorare nel ruolo scelto.",
          ],
        },
        { type: "tip", text: "Se il codice è scaduto — premi “Nuovo codice” e inserisci quello fresco." },
        { type: "h3", text: "Gestire i dispositivi" },
        {
          type: "list",
          items: [
            "Stati: Online / Offline / In attesa di collegamento / Revocato.",
            "“Revoca” — scollega il tablet (per esempio se è perso). Per riaccedere serve un nuovo codice.",
            "“Elimina” — rimuove il dispositivo dalla lista in modo definitivo.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analisi",
      blocks: [
        {
          type: "p",
          text: "La sezione “Analisi” mostra i numeri chiave del locale: incasso, numero di ordini e la loro ripartizione (per esempio per metodo di pagamento e per orario). Usala per capire cosa vende meglio e quando.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Impostazioni",
      blocks: [
        {
          type: "p",
          text: "La sezione “Impostazioni” si apre come un insieme di schede-sezione. In alto c'è il selettore del ristorante attivo (se ne hai più di uno). Sotto — ogni scheda in ordine.",
        },
        { type: "h3", text: "Sito" },
        {
          type: "list",
          items: [
            "URL del menu pubblico — l'indirizzo unico del tuo menu (puoi impostare il tuo slug breve e copiare il link).",
            "Il nome (titolo) del locale sul sito pubblico.",
            "Colore d'accento — il colore principale di pulsanti ed evidenziazioni nel menu.",
            "Sfondo — un'immagine o un video nella home; carica il tuo o genera uno sfondo con l'IA da una descrizione.",
            "Layout del menu — come i piatti vengono mostrati all'ospite.",
          ],
        },
        { type: "h3", text: "Contatti e indirizzo" },
        {
          type: "p",
          text: "Telefono, Instagram, WhatsApp e un segnaposto sulla mappa — tutto mostrato all'ospite nella pagina contatti del tuo menu.",
        },
        { type: "h3", text: "Regione" },
        { type: "p", text: "Valuta (usata per tutti i prezzi) e fuso orario del locale." },
        { type: "h3", text: "Tavoli" },
        { type: "p", text: "Pianta della sala, posti e codici QR dei tavoli — in dettaglio nella sezione 3." },
        { type: "h3", text: "Dispositivi" },
        {
          type: "p",
          text: "Collegamento dei tablet per il display di cucina e i terminali camerieri — in dettaglio nella sezione 7.",
        },
        { type: "h3", text: "Ordini" },
        {
          type: "list",
          items: [
            "“Accetta ordini” — l'interruttore principale per ricevere ordini.",
            "“Modalità ordini” — Interna e/o WhatsApp.",
            "“Campi obbligatori” — quali dati l'ospite deve fornire (Nome, Telefono, Indirizzo).",
            "“Metodi di pagamento” — per integrare il sistema di pagamento del ristorante contatta l'assistenza.",
          ],
        },
        { type: "h3", text: "Prenotazioni" },
        {
          type: "p",
          text: "Attivazione delle prenotazioni, conferma automatica o manuale, durata e orari — in dettaglio nella sezione 6.",
        },
        { type: "h3", text: "Lingue" },
        {
          type: "steps",
          items: [
            "Apri Impostazioni → Lingue.",
            "Scegli le lingue in cui viene tradotto il menu pubblico (tocca per aggiungere/rimuovere).",
            "Imposta la lingua predefinita.",
            "I testi si traducono manualmente o col pulsante “Traduci con IA” — il sistema traduce nomi e descrizioni dei piatti nelle lingue scelte.",
          ],
        },
        { type: "h3", text: "Pagamento" },
        { type: "p", text: "Piano di abbonamento, stato della prova e gestione dei pagamenti." },
        {
          type: "list",
          items: [
            "Fatturazione mensile o annuale (l'annuale costa meno).",
            "“Abbonati” / “Cambia” — scegli o cambia piano.",
            "“Gestisci” — cambia il metodo di pagamento o annulla l'abbonamento.",
          ],
        },
        {
          type: "note",
          text: "Il pagamento è in EUR. Per pagare in un'altra valuta contatta l'assistenza.",
        },
        { type: "h3", text: "Assistenza" },
        {
          type: "p",
          text: "Una chat integrata con il nostro team in tempo reale. Scrivi un messaggio — rispondiamo proprio qui.",
        },
        { type: "h3", text: "Cambiare e aggiungere ristoranti" },
        {
          type: "p",
          text: "Se hai più locali, il selettore del ristorante è in cima alla sezione “Impostazioni”.",
        },
        {
          type: "steps",
          items: [
            "Apri il selettore dei ristoranti in cima a “Impostazioni”.",
            "“Aggiungi ristorante” → inserisci un nome.",
            "Scegli “Duplica menu e impostazioni attuali” (avvio rapido) o “Inizia da zero” (un ristorante vuoto).",
            "Crealo — e passa da un ristorante all'altro in qualsiasi momento proprio qui.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Il menu pubblico per gli ospiti",
      blocks: [
        {
          type: "p",
          text: "Il menu pubblico è ciò che vede l'ospite dopo aver scansionato il QR. Si compone automaticamente dal tuo menu, dal branding e dai contatti.",
        },
        {
          type: "list",
          items: [
            "L'indirizzo del menu si imposta in Impostazioni → Regione (“Link del menu”).",
            "Il codice QR generale e il link al menu si ottengono col pulsante “Condividi” nella pagina “Menu”.",
            "Ogni tavolo ha il proprio QR separato (Impostazioni → Tavoli) che porta al menu di quel preciso tavolo.",
            "L'aspetto (sfondo, colore d'accento, layout) si configura nella sezione “Sito”.",
            "Il pulsante “Anteprima” apre il menu come lo vede l'ospite.",
          ],
        },
        {
          type: "tip",
          text: "Dopo ogni modifica a menu/impostazioni premi “Anteprima” per controllare come appare all'ospite.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Domande frequenti e dettagli",
      blocks: [
        { type: "h3", text: "L'ospite non riesce a ordinare" },
        {
          type: "p",
          text: "Controlla Impostazioni → Ordini → “Accetta ordini” (deve essere attivo) e che sia selezionata almeno una modalità d'ordine.",
        },
        { type: "h3", text: "Non arrivano prenotazioni" },
        {
          type: "p",
          text: "Assicurati che le prenotazioni siano attive in Impostazioni → Prenotazioni, che i tavoli siano aggiunti e che il giorno non sia segnato come “Chiuso” nell'orario.",
        },
        { type: "h3", text: "Il tablet non si collega" },
        {
          type: "p",
          text: "Il codice è valido 2 minuti. Se è scaduto — generane uno nuovo in Impostazioni → Dispositivi. Se il dispositivo è stato revocato — crea un nuovo codice.",
        },
        { type: "h3", text: "Un piatto è finito" },
        {
          type: "p",
          text: "Non eliminarlo — premi “Nascondi piatto”. Sparisce dal menu pubblico e lo riporti con “Mostra piatto”.",
        },
        { type: "h3", text: "Servono dispositivi/terminali ma non li hai" },
        {
          type: "p",
          text: "La sezione “Dispositivi” è disponibile con un piano a pagamento o durante una prova attiva. Controlla Impostazioni → Pagamento.",
        },
        { type: "h3", text: "Hai ancora domande" },
        {
          type: "p",
          text: "Scrivici in Impostazioni → Assistenza — è una chat integrata con il nostro team.",
        },
      ],
    },
  ],
};
