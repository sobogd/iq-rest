import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

const D = DEFAULT.features.items;

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  ctaText: "Genera il QR Code gratis",
  microcopy: "Da 6,90€/mese · 14 giorni gratis · Cancelli quando vuoi",

  meta: {
    title: "Menu QR Code per Ristoranti — Stampabile, Senza App | IQ Rest",
    description:
      "Genera il menu con QR Code per il tuo ristorante. Stampabile per i tavoli, i clienti scansionano senza app. Ordini diretti, 35 lingue, 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/menu-qr-code",
    ogLocale: "it_IT",
    ogTitle: "Menu QR Code per Ristoranti — Stampabile, Senza App",
    ogDescription:
      "Menu con QR Code per ristoranti, bar e caffè. Stampabile per i tavoli, scansione senza app, ordini diretti.",
  },

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Menu QR Code creato da un ristoratore",
  },

  hero: {
    ...DEFAULT.hero,
    verticals: ["Ristoranti", "Bar", "Caffè", "Pizzerie", "Trattorie", "Pub"],
    headline: "Menu QR Code per Ristoranti.",
    sub:
      "Genera il menu con QR Code in 5 minuti. Stampabile per i tavoli, i clienti scansionano con la fotocamera — senza app, senza download. Ordini diretti, 35 lingue, prenotazioni 24/7.",
    dynamicHeadlines: [
      "QR Code stampabile.",
      "Scansione senza app.",
      "Ordini dal tavolo.",
      "Menu con QR Code in 5 min.",
      "Zero commissioni.",
    ],
    painBullets: [
      "QR Code stampabile: PDF/PNG pronti per stand, vetrofania o carta plastificata.",
      "Senza app: il cliente inquadra il QR con la fotocamera, il menu si apre subito.",
      "Ordini dal tavolo: ogni ordine arriva con il numero del tavolo, zero commissioni.",
      "Aggiorni il menu, il QR Code resta lo stesso: niente ristampe.",
    ],
  },

  features: {
    ...DEFAULT.features,
    heading: "Tutto quello che serve a un",
    headingAccent: "menu QR Code completo.",
    sub: "Generazione, stampa, scansione e ordini in un'unica piattaforma.",
    items: [
      {
        Icon: D[0].Icon,
        title: "QR Code stampabile per i tavoli",
        desc: "Scarica il QR Code in PDF o PNG pronto per stand, vetrofania, carta plastificata o stickers. Un QR unico o uno per tavolo.",
        tag: "QR Code stampabile",
      },
      {
        Icon: D[2].Icon,
        title: "Scansione senza app",
        desc: "Il cliente inquadra il QR con la fotocamera del telefono, il menu si apre nel browser in meno di un secondo. Compatibile con iPhone e Android.",
        tag: "Senza app",
      },
      {
        Icon: D[4].Icon,
        title: "Aggiornamenti senza ristampa",
        desc: "Cambi prezzi, attivi stop-list o aggiungi un piatto dal telefono: il QR Code resta valido, i clienti vedono subito le modifiche.",
        tag: "Editor mobile",
      },
      D[1], // Traduttore IA
      D[3], // Design moderno
      D[5], // Display cucina (coming soon)
    ],
  },

  how: {
    ...DEFAULT.how,
    heading: "Crea il tuo menu QR Code in meno di 5 minuti",
    // sub + steps — наследуются (реальный flow)
  },

  pricing: {
    ...DEFAULT.pricing,
    badge: "Menu QR Code completo · Zero commissioni",
    heading: "Un piano per il tuo menu QR Code.",
    headingAccent: "Tutto incluso.",
    sub: "QR Code illimitato, ordini diretti, traduzione IA, prenotazioni e analytics. Un prezzo semplice, fatturato al mese o all'anno.",
  },

  faq: {
    ...DEFAULT.faq,
    heading: "Domande sul",
    headingAccent: "menu QR Code.",
    sub: "Quello che ristoratori, bar e caffè chiedono prima di adottare il menu con QR Code. Non vedi la tua? Scrivici su WhatsApp.",
    items: [
      {
        q: "Come generare il QR Code per il menu del ristorante?",
        a: "Registri l'account in 30 secondi, aggiungi i piatti (manualmente o scansionando il menu cartaceo: l'IA lo digitalizza in 60 secondi) e la piattaforma genera automaticamente il QR Code stampabile. Puoi scegliere un QR unico per tutto il locale oppure uno diverso per ogni tavolo.",
      },
      {
        q: "In quali formati posso scaricare il QR Code?",
        a: "PDF e PNG ad alta risoluzione, pronti per la stampa. Funzionano su carta plastificata, vetrofania, PVC, stand da tavolo, sticker o stampa diretta sul menu cartaceo. Vettoriale per stampe grandi su vetrina.",
      },
      {
        q: "Se aggiorno il menu, devo ristampare il QR Code?",
        a: "No. Il QR Code punta a un URL che resta sempre lo stesso. Modifichi prezzi, piatti e descrizioni dal telefono, i clienti vedono le modifiche al prossimo scan — il QR stampato continua a funzionare.",
      },
      {
        q: "I clienti devono scaricare un'app per scansionare il QR Code?",
        a: "Zero app. Tutti gli smartphone moderni (iPhone da iOS 11, Android da versione 8) leggono il QR Code direttamente dalla fotocamera. Il menu si apre nel browser in meno di un secondo.",
      },
      {
        q: "Posso accettare ordini direttamente dal menu con QR Code?",
        a: "Sì. Il cliente scansiona il QR al tavolo, sfoglia il menu, aggiunge piatti al carrello e invia l'ordine. L'ordine arriva istantaneamente nella tua dashboard e su WhatsApp, con il numero del tavolo già indicato.",
      },
      {
        q: "Funziona anche per bar e caffè o solo per ristoranti?",
        a: "Funziona per qualsiasi attività di somministrazione: ristoranti, trattorie, pizzerie, bar, caffetterie, pub, hotel con bar interno. La struttura del menu si adatta — categorie, varianti, allergeni, orari.",
      },
      {
        q: "Quanto costa un menu con QR Code?",
        a: "6,90€ al mese (o sconto annuale) per tutto: QR Code illimitato, menu completo, ordini diretti senza commissioni, 35 lingue con IA, prenotazioni e analytics. 14 giorni di prova gratuita, senza carta.",
      },
      {
        q: "Posso avere un QR Code diverso per ogni tavolo?",
        a: "Sì. Puoi generare un QR Code distinto per ogni tavolo: quando il cliente ordina, l'ordine arriva nella dashboard già associato al numero del tavolo. Servizio più rapido per il personale, zero confusione in cucina.",
      },
      {
        q: "Il QR Code funziona offline?",
        a: "Il QR stampato è sempre leggibile, ma per aprire il menu il cliente deve avere connessione (Wi-Fi del locale o dati mobili). Consigliamo Wi-Fi gratuito per gli ospiti — aumenta anche il tempo di permanenza.",
      },
    ],
  },

  finalCta: {
    heading: "Crea il tuo menu QR Code oggi.",
    headingAccent: "Gratis per 14 giorni.",
    sub: "Senza carta. Cancelli quando vuoi. Unisciti a 500+ locali che usano il menu QR Code di IQ Rest.",
  },

  scan: {
    heading: "Hai già un menu cartaceo o PDF?",
    headingAccent: "Trasformalo in menu QR Code in 60 secondi.",
    sub: "Carica una foto del menu — l'IA estrae piatti, prezzi e categorie e li converte in un menu con QR Code pronto da stampare.",
    cta: "Scansiona il menù →",
  },
};
