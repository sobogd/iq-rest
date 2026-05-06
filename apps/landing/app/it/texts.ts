import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "it",
  htmlDir: "ltr",

  meta: {
    title: "Menu QR per Ristoranti — Ordini Diretti, Zero Commissioni | IQ Rest",
    description:
      "Basta menu di carta e commissioni delle app di delivery. Menu QR, ordini diretti, prenotazioni e sito multilingue. 14 giorni gratis, senza carta.",
    canonical: "https://iq-rest.com/it",
    ogLocale: "it_IT",
    ogTitle: "Menu QR per Ristoranti — Ordini Diretti, Zero Commissioni",
    ogDescription:
      "Menu QR, ordini diretti, prenotazioni e traduzione AI. Pronto in 5 minuti. 14 giorni gratis — senza carta.",
  },

  ctaText: "Prova gratis", ctaSite: "Crea sito",
  demoText: "Vedi la demo",
  microcopy: "14 giorni gratis · Senza carta · Cancelli quando vuoi",

  header: {
    navFeatures: "Funzionalità",
    navHow: "Come funziona",
    navPricing: "Prezzi",
    navFaq: "FAQ",
    signIn: "Accedi",
    cta: "Prova gratis",
  },

  hero: {
    verticals: ["Ristoranti", "Caffè", "Bar", "Hotel", "Pizzerie"],
    qr: { headline: "Menu QR in 5 minuti.", sub: "Sito web pronto per il tuo ristorante — senza sviluppatori né appaltatori. Ordini diretti, prenotazioni e analisi degli ospiti in un unico abbonamento." },
    web: { headline: "Sito ristorante in 5 minuti.", sub: "Sito web pronto per il tuo ristorante — senza sviluppatori né appaltatori. Ordini diretti, prenotazioni e analisi degli ospiti in un unico abbonamento." },
    dynamicHeadlines: ["0% commissioni.", "35 lingue con IA.", "Ordini online.", "Prenotazioni 24/7.", "Design premium."],
    painBullets: ["0% Commissioni: Tutti gli ordini arrivano direttamente a te.", "Traduzione IA: 35 lingue per aumentare lo scontrino dei turisti.", "Prenotazioni 24/7: Sala piena senza chiamate inutili.", "Prezzi flessibili: Aggiorna il menu in pochi secondi."],
    rating: "4,9 · oltre 500 ristoranti in 30+ paesi",
  },

  features: {
    heading: "Tutto ciò che serve.",
    headingAccent: "Niente di superfluo.",
    sub: "Pensato per i ristoranti. Usato a tavola.",
    items: [
      
      {
        Icon: ScanLine,
        title: "Ordini dal tavolo",
        desc: "Gli ordini arrivano istantaneamente su WhatsApp o nel pannello con il numero del tavolo. Servizio più rapido.",
        tag: "Ordini diretti",
      },
      {
        Icon: Languages,
        title: "Traduttore IA (35 lingue)",
        desc: "La nostra IA capisce la gastronomia. I turisti ordinano il 20% in più quando comprendono i piatti.",
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
        Icon: Smartphone,
        title: "Editor rapido",
        desc: "Gestisci stop-list e prezzi direttamente dallo smartphone. Modifiche subito visibili agli ospiti.",
        tag: "Editor menù",
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
    heading: "Pronto in meno di 5 minuti",
    sub: "Quattro passi brevi. Niente installazioni, niente configurazioni tecniche.",
    steps: [
      { n: "1", t: "Tipo e nome", d: "Scegli il tipo e inserisci il nome." },
      { n: "2", t: "Salva", d: "Email o accedi con Google." },
      { n: "3", t: "Menu", d: "Crealo o scansiona quello cartaceo." },
      { n: "4", t: "Pronto", d: "Visualizza, condividi e ricevi ordini." },
    ],
  },

  pricing: {
    badge: "Zero commissioni · Zero contratti",
    heading: "Un piano.",
    headingAccent: "Tutto incluso.",
    sub: "Menu QR, ordini, traduzione AI, sito ristorante e prenotazioni. Un prezzo semplice.",
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
    heading: "Domande",
    headingAccent: "frequenti.",
    sub: "Quello che i ristoratori chiedono prima di iscriversi. Non vedi la tua? Scrivici su WhatsApp — rispondiamo davvero noi.",
    whatsappCta: "Chiedi su WhatsApp",
    whatsappPrefill: "Ciao, ho una domanda su IQ Rest",
    items: [
      {
        q: "Cosa include la prova gratuita e cosa succede dopo?",
        a: "14 giorni, accesso completo, senza carta. Dopo 14 giorni il tuo account si mette in pausa se non aggiungi un metodo di pagamento — non addebitiamo mai automaticamente. Aggiungi i dati di pagamento più tardi per riattivare. Cancelli con un clic.",
      },
      {
        q: "Prendete commissioni sugli ordini?",
        a: "Zero. Ogni ordine dal tuo menu QR va direttamente a te — niente quota nostra, niente commissioni Glovo / Just Eat. Un prezzo mensile fisso, fine.",
      },
      {
        q: "I miei clienti hanno bisogno di un'app? Io devo essere bravo col PC?",
        a: "Zero app per i clienti — scansionano il QR con la fotocamera, il menu si apre nel browser. Zero competenze tecniche per te — tutta la dashboard funziona dal telefono, tocca per aggiungere, trascina per riordinare, fine.",
      },
      {
        q: "Quanto velocemente posso cambiare prezzi e aggiungere piatti?",
        a: "All'istante. Cambi un prezzo dal telefono, i clienti lo vedono in pochi secondi. Piatto nuovo? Tocca, scrivi, foto, fatto — niente ristampe, niente attesa del grafico.",
      },
      {
        q: "Quante lingue supportate?",
        a: "35 lingue con traduzione AI integrata. Un tocco traduce tutto il menu, e l'AI capisce il contesto culinario — nomi e descrizioni suonano naturali in ogni lingua. I turisti ordinano di più quando capiscono davvero.",
      },
    ],
  },

  finalCta: {
    heading: "Pronto in 5 minuti.",
    headingAccent: "Gratis per 14 giorni.",
    sub: "Senza carta. Cancelli quando vuoi. Unisciti a 500+ ristoranti già su IQ Rest.",
  },

  scan: {
    heading: "Menù cartaceo o PDF?",
    headingAccent: "L'IA lo digitalizza in 60 secondi.",
    sub: "Carica — l'IA estrae categorie, piatti e prezzi.",
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
