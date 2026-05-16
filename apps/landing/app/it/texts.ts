import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "it",
  htmlDir: "ltr",

  meta: {
    title: "Menu Digitale per Ristoranti — Online in 5 Minuti | IQ Rest",
    description:
      "Crea il tuo menu digitale per ristorante online in 5 minuti. QR Code stampabile per i tavoli, ordini diretti senza commissioni, 35 lingue con IA. 14 giorni gratis, senza carta.",
    canonical: "https://iq-rest.com/it",
    ogLocale: "it_IT",
    ogTitle: "Menu Digitale per Ristoranti — Online in 5 Minuti",
    ogDescription:
      "Menu digitale online per il tuo ristorante. QR Code, ordini diretti, 35 lingue con IA. Pronto in 5 minuti — 14 giorni gratis, senza carta.",
  },

  ctaText: "Crea il mio menu digitale",
  demoText: "Vedi la demo",
  microcopy: "14 giorni gratis · Senza carta · Cancelli quando vuoi",

  header: {
    navFeatures: "Funzionalità",
    navHow: "Come funziona",
    navPricing: "Prezzi",
    navFaq: "FAQ",
    signIn: "Accedi",
    cta: "Crea il menu digitale",
  },

  hero: {
    verticals: ["Ristoranti", "Trattorie", "Pizzerie", "Osterie", "Caffè"],
    headline: "Menu digitale per ristoranti.",
    sub: "Menu digitale online per il tuo ristorante in 5 minuti. QR Code, ordini diretti senza commissioni, prenotazioni e traduzione IA in 35 lingue.",
    dynamicHeadlines: [
      "Menu digitale completo.",
      "QR Code per i tavoli.",
      "Ordini diretti.",
      "35 lingue con IA.",
      "Prenotazioni 24/7.",
    ],
    painBullets: [
      "Menu digitale online: aggiorni prezzi e piatti in tempo reale.",
      "Zero commissioni: ogni ordine dal menu digitale arriva direttamente a te.",
      "Traduzione IA: 35 lingue per turisti che ordinano di più.",
      "Pronto in 5 minuti: niente agenzie, niente sviluppatori.",
    ],
    rating: "Usato da 500+ ristoranti — menu digitale pronto in 5 minuti",
  },

  features: {
    heading: "Cosa include un menu",
    headingAccent: "digitale completo.",
    sub: "Tutto quello che serve al tuo ristorante in un'unica piattaforma.",
    items: [
      {
        Icon: ScanLine,
        title: "Menu digitale completo",
        desc: "Foto, allergeni, prezzi, varianti e descrizioni in un menu digitale che vive online e si aggiorna in tempo reale.",
        tag: "Menu digitale",
      },
      {
        Icon: Smartphone,
        title: "Editor mobile in tempo reale",
        desc: "Gestisci il menu digitale dallo smartphone: aggiungi un piatto, cambia un prezzo, attiva la stop-list — visibile ai clienti in pochi secondi.",
        tag: "Editor menù",
      },
      {
        Icon: Languages,
        title: "Traduzione IA (35 lingue)",
        desc: "Il tuo menu digitale parla la lingua degli ospiti. L'IA capisce la gastronomia: i turisti ordinano il 20% in più quando comprendono i piatti.",
        tag: "Traduzione IA",
      },
      {
        Icon: CalendarCheck,
        title: "Prenotazione tavoli",
        desc: "Il sistema accetta prenotazioni mentre sei in cucina. Nessun cliente perso.",
        tag: "Prenotazioni",
      },
      {
        Icon: Palette,
        title: "Design moderno",
        desc: "Sfondi video e foto invitanti. Il tuo menu appare premium e stuzzica l'appetito al primo sguardo.",
        tag: "Design personalizzato",
      },
      {
        Icon: ChefHat,
        title: "Prossimamente: Display cucina",
        desc: "Dimentica le comande cartacee. Gli ordini dalla sala vanno direttamente sullo schermo dello chef.",
        tag: "In arrivo",
      },
    ],
  },

  founder: {
    eyebrow: "Costruito da un ristoratore",
    quoteStart:
      "Io e mia moglie abbiamo aperto un caffè e abbiamo passato settimane a cercare un sistema che gestisse ordini online, prenotazioni e che fosse anche moderno. Tutto quello che abbiamo provato era pesante, brutto, o mancava metà delle funzioni —",
    quoteAccent: "così abbiamo costruito quello che avremmo voluto.",
    sign: "Bogdan Sokolov · fondatore, ex titolare di caffè",
    photoAlt: "Bogdan, fondatore di IQ Rest",
  },

  how: {
    heading: "Crea il tuo menu digitale",
    headingAccent: "in meno di 5 minuti",
    sub: "Quattro passi brevi. Niente installazioni, niente configurazioni tecniche.",
    steps: [
      { n: "1", t: "Tipo e nome", d: "Scegli il tipo e inserisci il nome." },
      { n: "2", t: "Salva", d: "Email o accedi con Google." },
      { n: "3", t: "Menu", d: "Crealo o scansiona quello cartaceo." },
      { n: "4", t: "Pronto", d: "Visualizza, condividi e ricevi ordini." },
    ],
  },

  pricing: {
    badge: "Menu digitale completo · Zero commissioni",
    heading: "Un piano per il tuo menu digitale.",
    headingAccent: "Tutto incluso.",
    sub: "Menu digitale, QR Code, ordini diretti, traduzione IA e prenotazioni. Un prezzo semplice, fatturato al mese o all'anno.",
    monthlyLabel: "Mensile",
    yearlyLabel: "Annuale",
    saveBadge: "Risparmi 25%",
    perMonth: "al mese",
    billedAnnually: "Fatturazione annuale {total}",
    youSave: "Risparmi {amount}",
    trust: {
      secure: "Pagamento sicuro con Stripe",
      noCommitment: "Senza vincoli",
      quick: "Attivo in pochi minuti",
      restaurants: "500+ ristoranti",
    },
  },

  faq: {
    eyebrow: "Domande?",
    heading: "Domande sul",
    headingAccent: "menu digitale.",
    sub: "Quello che i ristoratori chiedono prima di passare al menu digitale. Non vedi la tua? Scrivici su WhatsApp — rispondiamo davvero noi.",
    whatsappCta: "Chiedi su WhatsApp",
    whatsappPrefill: "Ciao, ho una domanda su IQ Rest",
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
    heading: "Da carta a digitale",
    headingAccent: "in 60 secondi",
    sub: "Carica una foto — l'IA estrae categorie, piatti e prezzi e li importa nel tuo menu digitale.",
    cta: "Scansiona il menù →",
  },
  footer: {
    featureLinks: [
      { href: "/it/online-orders", label: "Ordini online" },
      { href: "/it/ai-translation", label: "Traduzione AI" },
      { href: "/it/reservations", label: "Prenotazioni" },
      { href: "/it/mobile-management", label: "Gestione da mobile" },
      { href: "/it/easy-menu", label: "Editor del menu" },
      { href: "/it/custom-design", label: "Sfondi video e foto" },
      { href: "/it/color-scheme", label: "Colori del brand" },
      { href: "/it/multilingual", label: "Sito multilingue" },
      { href: "/it/ai-images", label: "Ottimizzazione foto AI" },
      { href: "/it/analytics", label: "Analytics" },
      { href: "/it/instant-setup", label: "Configurazione istantanea" },
      { href: "/it/personal-support", label: "Supporto personale" },
    ],
    navLinks: [
      { href: "#pricing", label: "Prezzi" },
      { href: "#faq", label: "Domande" },
      { href: "/it/changelog", label: "Novità" },
      { href: "/it/languages", label: "Cambia lingua" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tutti i diritti riservati.",
  },
};
