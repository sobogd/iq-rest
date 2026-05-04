import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Menu ristorante multilingue — 35 lingue, un tap per cambiare",
    description:
      "Servi gli ospiti internazionali nella loro lingua. Menu ristorante in 35 lingue con cambio in un tap. Supporto RTL per arabo e persiano. 14 giorni di prova gratuita.",
    canonical: "https://iq-rest.com/it/multilingual",
    ogLocale: "it_IT",
    ogTitle: "Sito web ristorante con menu multilingue — 35 lingue integrate",
    ogDescription:
      "I turisti scansionano, vedono il tuo menu nella loro lingua automaticamente. 35 lingue, supporto RTL, rilevamento auto dalle impostazioni del telefono. 14 giorni di prova gratuita.",
  },

  hero: {
    title: "Il tuo menu parla la lingua di ogni turista.",
    subtitle:
      "Un menu ristorante multilingue non dovrebbe essere un progetto. Con IQ Rest, il tuo menu QR rileva automaticamente la lingua del telefono di ogni ospite e lo serve in una qualsiasi delle 35 lingue — incluso arabo e persiano con resa da destra a sinistra corretta.",
    trustLine: "4.9 · 500+ ristoranti in 30+ paesi",
  },

  seo: {
    description:
      "Costruisci il menu una volta, servilo in 35 lingue. IQ Rest rileva automaticamente la lingua del telefono di ogni ospite e rende il menu nella loro lingua — niente bandiere da toccare, nessuna barriera linguistica, nessun momento imbarazzante con Google Translate. Dallo spagnolo e tedesco al giapponese, arabo e mandarino, i tuoi ospiti vedono il tuo ristorante come doveva essere visto.",
    fullDescription:
      "La maggior parte dei menu « multilingue » sono PDF di Google Translate rotti, stampati una volta e mai aggiornati. Il sito web ristorante multilingue di IQ Rest è vera i18n: ogni lingua ha la sua copia tradotta correttamente, il suo slug URL, i suoi meta tag per l'indicizzazione Google e il suo routing nell'app menu.\n\nQuando un turista con un iPhone in francese scansiona il tuo codice QR, il menu si apre automaticamente in francese — niente tap, nessuna decisione. Possono passare a qualsiasi altra lingua con il selettore in alto, ma la maggior parte non ne ha bisogno. Lo stesso vale per le etichette dietetiche (« vegan » diventa « vegano » / « vegetarisch » / « ヴィーガン » a seconda della lingua), per i messaggi di errore, per i pulsanti « aggiungi al carrello », per gli scontrini. Ogni stringa UI in 35 lingue, non solo il contenuto del menu.\n\nPer le lingue RTL — arabo e persiano — tutto il layout si capovolge correttamente: il testo si allinea a destra, i menu si aprono da destra, i prezzi compaiono dopo il nome del piatto come previsto. Non è un trucco CSS, è pieno supporto RTL che fa sentire gli ospiti arabi e persiani serviti, non aggiunti dopo.",
    benefitsHeading: "Perché un vero menu multilingue batte una traduzione PDF",
    benefits: [
      "35 lingue con vera traduzione UI — non solo gli elementi del menu",
      "Rileva automaticamente la lingua del telefono dell'ospite — nessun tap richiesto",
      "Selettore di lingua manuale per gli ospiti che preferiscono un'altra lingua",
      "Supporto RTL completo per arabo e persiano — non un trucco CSS",
      "Ogni lingua ha il suo URL — Google indicizza 35 versioni del tuo sito",
      "Cambia la descrizione di un piatto nella tua lingua madre — le traduzioni seguono",
    ],
  },

  pricing: {
    heading: "Un solo piano.",
    headingAccent: "Tutte le 35 lingue incluse.",
    sub: "Menu multilingue, traduzione AI, ordinazione QR e prenotazioni — tutto in un prezzo fisso. Niente costi per lingua, nessun extra per il RTL.",
  },

  faq: {
    sub: "Tutto quello che i ristoratori chiedono su un menu multilingue. Non vedi la tua domanda? Scrivici su WhatsApp — rispondono persone vere.",
    items: [
      {
        q: "Quante lingue supporta il menu?",
        a: "35 lingue inclusi inglese, spagnolo, tedesco, francese, italiano, portoghese, olandese, polacco, ceco, slovacco, ungherese, rumeno, bulgaro, croato, serbo, sloveno, greco, turco, russo, ucraino, lituano, lettone, estone, finlandese, svedese, norvegese, danese, islandese, catalano, gaelico irlandese, arabo, persiano, giapponese, coreano e cinese. Le stringhe UI sono tradotte professionalmente per ognuna.",
      },
      {
        q: "Come cambiano lingua i clienti?",
        a: "In due modi: automatico (il menu si apre nella lingua del loro telefono) e manuale (un selettore di lingua in alto al menu). L'80% dei turisti non tocca mai il selettore manuale — il rilevamento automatico funziona perché il loro telefono già conosce la loro lingua.",
      },
      {
        q: "Supportate le lingue da destra a sinistra come arabo e persiano?",
        a: "Sì, con layout RTL completo. Tutto il menu si capovolge: il testo si allinea a destra, le colonne si invertono, i cassetti di navigazione si aprono dal lato destro, i prezzi compaiono dopo i nomi dei piatti. Questo è vero supporto RTL implementato a livello di layout, non solo trucchetti di direzione CSS.",
      },
      {
        q: "Google indicizzerà il mio menu in tutte le 35 lingue?",
        a: "Sì. Ogni lingua ha il suo slug URL (es. /es, /fr, /de), tag hreflang corretti, meta titoli e descrizioni localizzati e dati strutturati specifici per lingua. Google tratta ogni lingua come una pagina separata per quel locale, il che significa che i turisti che cercano il tuo ristorante nella loro lingua hanno più probabilità di trovarti.",
      },
      {
        q: "E se non voglio tutte le 35 lingue — solo i miei mercati principali?",
        a: "Scegli quali lingue sono attive. Se sei un ristorante sulla spiaggia in Grecia che serve principalmente turisti britannici, tedeschi e italiani, attiva solo inglese, tedesco e italiano — le altre non compaiono nel selettore di lingua o nel rilevamento automatico. Puoi sempre attivarne di più dopo, mentre il tuo mix turistico cambia.",
      },
    ],
  },

  finalCta: {
    heading: "La lingua del telefono di ogni turista.",
    headingAccent: "Già supportata.",
    sub: "Servi un menu multilingue in 35 lingue, inclusi arabo e persiano RTL. 14 giorni di prova gratuita, senza carta, senza costi per lingua.",
  },
};
