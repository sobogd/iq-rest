import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

const D = DEFAULT.features.items;

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  ctaText: "Crea il tuo menu digitale",
  microcopy: "Da 6,90€/mese · 14 giorni gratis · Cancelli quando vuoi",

  meta: {
    title: "Menu Digitale per Ristoranti — Online in 5 Min | IQ Rest",
    description:
      "Crea il tuo menu digitale per ristorante online in 5 minuti. QR Code stampabile, ordini diretti senza commissioni, 35 lingue con IA. 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/menu-digitale",
    ogLocale: "it_IT",
    ogTitle: "Menu Digitale per Ristoranti — Online in 5 Min",
    ogDescription:
      "Menu digitale online per il tuo ristorante. QR Code, ordini diretti, 35 lingue con IA. Pronto in 5 minuti.",
  },

  hero: {
    ...DEFAULT.hero,
    verticals: ["Ristoranti", "Trattorie", "Pizzerie", "Osterie", "Caffè"],
    headline: "Menu Digitale per Ristoranti.",
    sub:
      "Il tuo menu digitale online per il ristorante, pronto in 5 minuti. QR Code stampabile per i tavoli, ordini diretti senza commissioni, prenotazioni 24/7 e traduzione IA in 35 lingue.",
    dynamicHeadlines: [
      "Menu digitale completo.",
      "QR Code per i tavoli.",
      "Ordini diretti, zero commissioni.",
      "35 lingue con IA.",
      "Prenotazioni 24/7.",
    ],
    painBullets: [
      "Menu digitale online: aggiorni prezzi e piatti in tempo reale.",
      "Zero commissioni: ogni ordine dal menu digitale arriva direttamente a te.",
      "Traduzione IA: 35 lingue per turisti che ordinano di più.",
      "Pronto in 5 minuti: niente agenzie, niente sviluppatori.",
    ],
  },

  features: {
    ...DEFAULT.features,
    heading: "Cosa include un menu digitale",
    headingAccent: "completo.",
    sub: "Tutto quello che serve al tuo ristorante in un'unica piattaforma.",
    items: [
      {
        Icon: D[0].Icon,
        title: "Menu digitale completo",
        desc: "Foto, allergeni, prezzi, varianti e descrizioni in un menu digitale che vive online e si aggiorna in tempo reale.",
        tag: "Menu digitale",
      },
      {
        Icon: D[4].Icon,
        title: "Editor mobile in tempo reale",
        desc: "Gestisci il menu digitale dallo smartphone: aggiungi un piatto, cambia un prezzo, attiva la stop-list — visibile ai clienti in pochi secondi.",
        tag: "Editor menù",
      },
      {
        Icon: D[1].Icon,
        title: "Traduzione IA (35 lingue)",
        desc: "Il tuo menu digitale parla la lingua degli ospiti. L'IA capisce la gastronomia: i turisti ordinano il 20% in più quando comprendono i piatti.",
        tag: "Traduzione IA",
      },
      D[2], // Prenotazione tavoli
      D[3], // Design moderno
      D[5], // Display cucina (coming soon)
    ],
  },

  how: {
    ...DEFAULT.how,
    heading: "Crea il tuo menu digitale in meno di 5 minuti",
    // sub + steps — наследуются (реальный product flow, см. /it/texts.ts)
  },

  pricing: {
    ...DEFAULT.pricing,
    badge: "Menu digitale completo · Zero commissioni",
    heading: "Un piano per il tuo menu digitale.",
    headingAccent: "Tutto incluso.",
    sub: "Menu digitale, QR Code, ordini diretti, traduzione IA e prenotazioni. Un prezzo semplice, fatturato al mese o all'anno.",
  },

  faq: {
    ...DEFAULT.faq,
    heading: "Domande sul",
    headingAccent: "menu digitale.",
    sub: "Quello che i ristoratori chiedono prima di passare al menu digitale. Non vedi la tua? Scrivici su WhatsApp — rispondiamo davvero noi.",
    items: [
      {
        q: "Come creare un menu digitale per il ristorante?",
        a: "In 5 minuti. Registri l'account, scegli il tipo di attività, aggiungi i piatti (a mano o scansionando il menu cartaceo: l'IA lo digitalizza in 60 secondi), personalizzi colori e foto, e ricevi il QR Code da stampare per i tavoli. Niente sviluppatori, niente agenzie — tutto dal telefono.",
      },
      {
        q: "Quanto costa un menu digitale online?",
        a: "Un piano unico: 6,90€/mese (o sconto annuale). Include menu digitale completo, QR Code illimitato, ordini diretti senza commissioni, traduzione IA in 35 lingue, prenotazioni e analytics. 14 giorni di prova gratuita, senza carta.",
      },
      {
        q: "Posso aggiornare il menu digitale in tempo reale?",
        a: "Sì. Cambi un prezzo dal telefono, i clienti lo vedono in pochi secondi. Aggiungi un piatto, attivi la stop-list, modifichi una descrizione — tutto live, senza ristampe e senza attese.",
      },
      {
        q: "Il menu digitale supporta più lingue?",
        a: "35 lingue con traduzione IA integrata. Un tocco traduce tutto il menu digitale e l'IA capisce il contesto culinario: nomi e descrizioni suonano naturali in ogni lingua. I turisti ordinano di più quando capiscono davvero i piatti.",
      },
      {
        q: "I clienti devono scaricare un'app per il menu digitale?",
        a: "Zero app. Il cliente inquadra il QR Code con la fotocamera del telefono, il menu digitale si apre nel browser immediatamente. Compatibile con iPhone, Android e qualsiasi smartphone moderno.",
      },
      {
        q: "Come stampare il QR Code del menu digitale per i tavoli?",
        a: "Dalla dashboard scarichi il QR Code in PDF o PNG pronto per la stampa. Funziona su carta, PVC, vetrofania o stand da tavolo. Se cambi il menu, il QR Code resta lo stesso — non serve ristampare nulla.",
      },
      {
        q: "Posso accettare ordini direttamente dal menu digitale?",
        a: "Sì. I clienti ordinano dal tavolo direttamente nel menu digitale, l'ordine arriva istantaneamente su WhatsApp o nel pannello con il numero del tavolo. Servizio più rapido, meno errori, niente commissioni di Glovo / Just Eat / Deliveroo.",
      },
      {
        q: "Prendete commissioni sugli ordini dal menu digitale?",
        a: "Zero. Ogni ordine che arriva dal tuo menu digitale va direttamente a te — niente quota nostra, niente commissioni di terzi. Paghi solo l'abbonamento mensile fisso.",
      },
      {
        q: "Cosa succede al menu digitale dopo i 14 giorni gratis?",
        a: "Se non aggiungi un metodo di pagamento, l'account si mette in pausa — non addebitiamo mai automaticamente. Il menu digitale rimane salvato; aggiungi i dati di pagamento più tardi per riattivarlo. Cancelli con un clic.",
      },
    ],
  },

  finalCta: {
    heading: "Crea il tuo menu digitale oggi.",
    headingAccent: "Gratis per 14 giorni.",
    sub: "Senza carta. Cancelli quando vuoi. Unisciti a 500+ ristoranti che usano il menu digitale di IQ Rest.",
  },

  scan: {
    heading: "Hai già un menu cartaceo o PDF?",
    headingAccent: "L'IA lo trasforma in menu digitale in 60 secondi.",
    sub: "Carica una foto — l'IA estrae categorie, piatti e prezzi e li importa nel tuo menu digitale.",
    cta: "Scansiona il menù →",
  },
};
