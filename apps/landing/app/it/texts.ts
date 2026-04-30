import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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
      "Menu QR, ordini diretti, prenotazioni e traduzione AI. Pronto in 2 minuti. 14 giorni gratis — senza carta.",
  },

  ctaText: "Inizia gratis →",
  demoText: "Vedi la demo",
  microcopy: "14 giorni gratis · Senza carta · Cancelli quando vuoi",

  header: {
    navFeatures: "Funzionalità",
    navHow: "Come funziona",
    navPricing: "Prezzi",
    navFaq: "FAQ",
    signIn: "Accedi",
    cta: "Inizia gratis →",
  },

  hero: {
    verticals: ["Ristoranti", "Caffè", "Bar", "Hotel", "Pizzerie"],
    variants: [
      {
        headline: "Basta ristampare i menu.",
        headlineAccent: "Basta pagare il 30% alle app di delivery.",
        sub: "Menu QR, ordini diretti, prenotazioni e sito multilingue. Pronto in 2 minuti — senza carta.",
      },
      {
        headline: "Il tuo ristorante merita più di",
        headlineAccent: "menu di carta e chiamate perse.",
        sub: "Ordini diretti, aggiornamenti istantanei e prenotazioni 24/7. Pronto in 2 minuti.",
      },
      {
        headline: "Un codice QR.",
        headlineAccent: "Zero commissioni. Mai più carta.",
        sub: "Menu QR, ordini online e prenotazioni — tutto in un posto. 14 giorni gratis, senza carta.",
      },
      {
        headline: "Ricevi ordini diretti.",
        headlineAccent: "Salta la commissione.",
        sub: "I clienti scansionano, ordinano e pagano — direttamente a te, senza la fetta di Glovo. Pronto in 2 minuti.",
      },
      {
        headline: "Più ordini. Più prenotazioni.",
        headlineAccent: "Zero carta, zero app.",
        sub: "Menu QR + prenotazioni + sito multilingue in automatico. 14 giorni di prova gratis.",
      },
      {
        headline: "I turisti non leggono il menu?",
        headlineAccent: "Risolto in 2 minuti.",
        sub: "L'AI traduce tutto il menu in 35 lingue. E include ordini QR e prenotazioni.",
      },
      {
        headline: "Da menu di carta a QR code,",
        headlineAccent: "prima che si freddi il caffè.",
        sub: "Menu QR, ordini diretti e prenotazioni 24/7. Pronto in 2 minuti — senza carta.",
      },
      {
        headline: "Menu QR sorprendentemente semplice.",
        headlineAccent: "Tranquillamente potente.",
        sub: "Ordini diretti, traduzione AI, prenotazioni e sito web — tutto con un tocco sul telefono.",
      },
    ],
    painBullets: [
      "Niente stampe — cambi i prezzi all'istante",
      "Zero commissioni — ordini diretti a te",
      "Niente chiamate perse — prenotazioni 24/7",
      "35 lingue — non perdi più nemmeno un turista",
    ],
    rating: "4,9 · oltre 500 ristoranti in 30+ paesi",
  },

  features: {
    heading: "Tutto ciò che serve.",
    headingAccent: "Niente di superfluo.",
    sub: "Pensato per i ristoranti. Usato a tavola.",
    items: [
      {
        Icon: ScanLine,
        title: "Tieni il 100% di ogni ordine",
        desc: "I clienti scansionano, ordinano e pagano — direttamente a te. Niente app da scaricare, niente 30% per il delivery. Ogni ordine arriva nella dashboard con numero di tavolo in tempo reale.",
      },
      {
        Icon: Languages,
        title: "Vendi ai turisti nella loro lingua",
        desc: "Un tocco traduce tutto il menu in 35 lingue. L'AI capisce il contesto culinario — i clienti ordinano di più quando capiscono davvero il piatto.",
      },
      {
        Icon: CalendarCheck,
        title: "Niente prenotazioni perse mentre cucini",
        desc: "I clienti prenotano 24/7, senza chiamate. Conferma automatica o manuale, promemoria via email — meno no-show, zero stress.",
      },
      {
        Icon: Palette,
        title: "Indimenticabile in 1 secondo",
        desc: "Metti un video della cucina o una foto da copertina come sfondo del menu. I clienti smettono di scrollare. Il tuo brand resta.",
      },
      {
        Icon: Smartphone,
        title: "Modifichi in secondi, non in giorni",
        desc: "Cambi i prezzi, cambi le foto, aggiungi il piatto del giorno — dal telefono, tra un tavolo e l'altro. In diretta per i clienti all'istante. Mai più ristampe.",
      },
      {
        Icon: ListPlus,
        title: "Se sai mandare un WhatsApp, sai usarlo",
        desc: "Tocca per aggiungere un piatto. Trascina per riordinare. Spegni quello esaurito. Niente manuali, niente tutorial, niente curva di apprendimento.",
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
    heading: "Pronto in meno di 2 minuti",
    sub: "Quattro passi brevi. Niente installazioni, niente configurazioni tecniche.",
    steps: [
      { n: "1", t: "Registrati", d: "Email o Google. Senza carta. Fatto in 10 secondi." },
      { n: "2", t: "Nome del ristorante", d: "Scrivi il nome. Appare in cima al menu." },
      { n: "3", t: "Aggiungi il primo piatto", d: "Categoria, nome, prezzo, foto. Tutto qui." },
      { n: "4", t: "Scegli la copertina e stampa il QR", d: "Scegli lo sfondo. Prendi il QR. Mettilo sui tavoli." },
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
        q: "Posso gestire più ristoranti da un solo account?",
        a: "Sì. Il piano Pro permette più ristoranti in un singolo account — menu separati, QR separati, statistiche separate, un login. Cambi tra uno e l'altro in due tocchi.",
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
    heading: "Pronto in 2 minuti.",
    headingAccent: "Gratis per 14 giorni.",
    sub: "Senza carta. Cancelli quando vuoi. Unisciti a 500+ ristoranti già su IQ Rest.",
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
    legalLinks: [
      { href: "/it/terms", label: "Termini e condizioni" },
      { href: "/it/privacy", label: "Privacy" },
      { href: "/it/cookies", label: "Cookie" },
      { href: "/sitemap.xml", label: "Mappa del sito" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tutti i diritti riservati.",
  },
};
