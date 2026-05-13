import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

const D = DEFAULT.features.items;

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  ctaText: "Inizia a creare ora",
  microcopy: "Da 6,90€/mese · 14 giorni gratis · Cancelli quando vuoi",

  meta: {
    title: "Creare Menu Digitale per Ristoranti — 5 Min, Senza Codice | IQ Rest",
    description:
      "Crea il tuo menu digitale o QR Code menu in 5 minuti dal telefono. Senza sviluppatori, senza agenzie. Editor mobile, 35 lingue, ordini diretti. 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/creare-menu-digitale",
    ogLocale: "it_IT",
    ogTitle: "Creare Menu Digitale per Ristoranti — 5 Min, Senza Codice",
    ogDescription:
      "Crea il menu digitale o QR Code menu in 5 minuti dal telefono. Editor mobile, 35 lingue, ordini diretti.",
  },

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Editor creato da un ristoratore",
  },

  hero: {
    ...DEFAULT.hero,
    verticals: ["Ristoranti", "Pizzerie", "Trattorie", "Bar", "Caffè"],
    headline: "Crea il tuo Menu Digitale.",
    sub:
      "Crea il menu digitale o il QR Code menu del tuo ristorante in 5 minuti, direttamente dal telefono. Editor mobile, scansione del menu cartaceo con IA, traduzione automatica in 35 lingue. Senza sviluppatori, senza agenzie.",
    dynamicHeadlines: [
      "In 5 minuti.",
      "Dal telefono.",
      "Senza sviluppatori.",
      "Crea anche il QR Code.",
      "Senza agenzie.",
    ],
    painBullets: [
      "Editor mobile: crea e modifica il menu digitale dal telefono, anche durante il servizio.",
      "Scansiona il menu cartaceo: l'IA digitalizza foto e PDF in 60 secondi.",
      "Crea il QR Code menu in un clic: stampabile per i tavoli, no app per i clienti.",
      "Senza codice: aggiungi piatti con un tap, riordina con drag-and-drop.",
    ],
  },

  features: {
    ...DEFAULT.features,
    heading: "Tutto quello che serve per",
    headingAccent: "creare il menu digitale.",
    sub: "Un editor pensato per ristoratori, non per programmatori.",
    items: [
      {
        Icon: D[4].Icon, // Smartphone
        title: "Editor mobile drag-and-drop",
        desc: "Aggiungi piatti, riordina categorie, modifica prezzi direttamente dal telefono. Niente computer, niente competenze tecniche.",
        tag: "Editor mobile",
      },
      {
        Icon: D[0].Icon, // ScanLine
        title: "Scansiona il menu cartaceo",
        desc: "Carica una foto del menu o un PDF: l'IA estrae categorie, piatti, prezzi e descrizioni in 60 secondi. Risparmi ore di inserimento.",
        tag: "Importazione IA",
      },
      {
        Icon: D[1].Icon, // Languages
        title: "Traduzione automatica (35 lingue)",
        desc: "Crei il menu in italiano, l'IA lo traduce in 35 lingue mantenendo il contesto culinario. I turisti capiscono, ordinano di più.",
        tag: "Multilingue",
      },
      D[3], // Design moderno
      D[2], // Prenotazione tavoli
      D[5], // Display cucina (coming soon)
    ],
  },

  how: {
    ...DEFAULT.how,
    heading: "Crea il tuo menu digitale in 4 passi",
    // sub + steps — наследуются (реальный flow)
  },

  pricing: {
    ...DEFAULT.pricing,
    badge: "Crea senza limiti · Zero commissioni",
    heading: "Un piano per creare",
    headingAccent: "il tuo menu digitale.",
    sub: "Crea menu, QR Code, ordini diretti, traduzioni e prenotazioni. Un prezzo semplice, fatturato al mese o all'anno.",
  },

  faq: {
    ...DEFAULT.faq,
    heading: "Domande su come",
    headingAccent: "creare il menu.",
    sub: "Quello che i ristoratori chiedono prima di iniziare a creare il menu digitale. Non vedi la tua? Scrivici su WhatsApp.",
    items: [
      {
        q: "Quanto tempo serve per creare un menu digitale?",
        a: "Circa 5 minuti per la struttura base (account, nome del locale, prime categorie). Se hai un menu cartaceo già pronto, la scansione IA lo digitalizza in 60 secondi: piatti, prezzi e descrizioni importati in automatico. Il QR Code è generato subito, pronto da stampare per i tavoli.",
      },
      {
        q: "Ho bisogno di competenze tecniche per creare il menu?",
        a: "Zero competenze tecniche. L'editor funziona dal telefono come un'app social: tocca per aggiungere un piatto, tieni premuto per riordinare, scorri per pubblicare. Niente HTML, niente codice, niente impostazioni complicate.",
      },
      {
        q: "Posso creare il menu digitale dal telefono o serve un computer?",
        a: "Tutto si fa dal telefono. La dashboard è ottimizzata per mobile: aggiungi foto direttamente dalla galleria, modifica prezzi mentre sei in sala, attivi la stop-list dalla cucina. Funziona anche dal tablet o dal computer se preferisci.",
      },
      {
        q: "Posso creare anche il QR Code menu insieme al menu digitale?",
        a: "Sì, automaticamente. Quando crei il menu, la piattaforma genera il QR Code stampabile in PDF e PNG, pronto per i tavoli. Puoi avere un QR unico per tutto il locale oppure uno diverso per ogni tavolo per identificare gli ordini.",
      },
      {
        q: "Come faccio a modificare il menu dopo averlo creato?",
        a: "In tempo reale. Cambi un prezzo dal telefono, i clienti che scansionano subito dopo vedono la modifica. Aggiungi un piatto nuovo durante il servizio? Tap, foto, prezzo, fatto — disponibile in pochi secondi. Niente ristampe del QR Code.",
      },
      {
        q: "Posso creare un menu digitale multilingue?",
        a: "Sì, in 35 lingue. Crei il menu nella tua lingua, attivi le traduzioni con un tap e l'IA genera nomi e descrizioni in tutte le altre. L'IA capisce il contesto culinario (orecchiette, cacio e pepe, tiramisù) — niente traduzioni letterali sbagliate.",
      },
      {
        q: "Posso creare il menu digitale gratis prima di pagare?",
        a: "14 giorni di prova gratuita con tutte le funzioni: editor completo, QR Code illimitato, traduzioni IA, ordini, prenotazioni. Senza carta di credito. Dopo 14 giorni l'account si mette in pausa se non aggiungi un metodo di pagamento — il menu rimane salvato.",
      },
      {
        q: "Posso creare più menu (pranzo, cena, asporto)?",
        a: "Sì. Puoi creare menu separati con orari diversi (esempio: menu pranzo lun-ven, menu cena tutti i giorni), oppure menu per evento, asporto o delivery. I clienti vedono automaticamente il menu giusto in base all'orario di accesso.",
      },
      {
        q: "Posso creare il menu digitale per più ristoranti?",
        a: "Sì. Dalla stessa dashboard gestisci più locali (catene, gruppi, locali stagionali). Ogni ristorante ha il suo menu, il suo QR Code, le sue prenotazioni e i suoi analytics. Piano dedicato per i gruppi su richiesta.",
      },
    ],
  },

  finalCta: {
    heading: "Inizia a creare il tuo menu digitale.",
    headingAccent: "Pronto in 5 minuti.",
    sub: "14 giorni gratis, senza carta. Cancelli quando vuoi. Unisciti a 500+ ristoratori che hanno creato il menu digitale con IQ Rest.",
  },

  scan: {
    heading: "Hai già un menu cartaceo?",
    headingAccent: "L'IA lo trasforma in menu digitale in 60 secondi.",
    sub: "Carica una foto o un PDF — l'IA estrae categorie, piatti e prezzi e li importa direttamente nell'editor.",
    cta: "Scansiona il menù →",
  },
};
