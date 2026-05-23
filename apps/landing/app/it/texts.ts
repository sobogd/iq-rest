import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "it",
  htmlDir: "ltr",

  meta: {
    title: "Menu QR per ristoranti — Ordini diretti, zero commissioni | IQ Rest",
    description:
      "Piattaforma all-in-one per ristoranti: menu digitale, ordini QR, prenotazione tavoli e display di cucina. Online in 5 minuti. 14 giorni gratis, senza carta.",
    canonical: "https://iq-rest.com/it",
    ogLocale: "it_IT",
    ogTitle: "Menu QR per ristoranti — Ordini diretti, zero commissioni",
    ogDescription:
      "Menu digitale, ordini QR, prenotazioni e traduzione con IA. Online in 5 minuti. 14 giorni gratis.",
  },

  ctaText: "Crea il menu digitale",
  demoText: "Guarda la demo",
  microcopy: "14 giorni gratis · Senza carta · Disdici quando vuoi",

  header: {
    navFeatures: "Funzionalità",
    navHow: "Come funziona",
    navPricing: "Prezzi",
    navFaq: "FAQ",
    signIn: "Accedi",
    cta: "Crea il menu",
  },

  hero: {
    verticals: ["Ristoranti", "Bar", "Caffè", "Hotel", "Pizzerie"],
    headline: "Menu digitale per ristoranti. Online in 5 minuti.",
    sub: "Menu digitale per il tuo ristorante in 5 minuti. Tutto incluso: editor senza codice, scansione del menu con IA, codici QR per i tavoli e ordini diretti senza commissioni.",
    dynamicHeadlines: ["0% di commissione.", "35 lingue con IA.", "Ordini online.", "Prenotazioni 24/7.", "Design premium."],
    painBullets: [
      "0% di commissione: ogni ordine va dritto al ristorante.",
      "Traduzione con IA in 35 lingue — i turisti capiscono il menu e ordinano di più.",
      "Prenotazioni 24/7: gli ospiti prenotano da soli, senza telefonate nelle ore di punta.",
      "Prezzi flessibili: le modifiche del menu vanno online in pochi secondi.",
    ],
    rating: "Oltre 500 ristoranti in più di 30 Paesi",
  },

  features: {
    heading: "Tutto quello che serve.",
    headingAccent: "Niente di più.",
    sub: "Pensato per i ristoranti. Usato ogni giorno al tavolo, in cucina e in sala.",
    items: [
      { Icon: Monitor, title: "Menu digitale", desc: "Menu nel browser con foto, prezzi, allergeni e descrizioni. Si aggiorna in tempo reale dal cellulare. Gli ospiti leggono il menu nella loro lingua e il ristorante risparmia sulla stampa.", tag: "Menu digitale", href: "/it/menu-digitale-ristoranti" },
      { Icon: Receipt, title: "Ordini: ospite e cameriere", desc: "QR sul tavolo per l'ospite o cameriere che prende la comanda dal cellulare — entrambi arrivano direttamente in cucina o su WhatsApp. Niente commissioni, con il numero del tavolo su ogni comanda.", tag: "Ordini", href: "/it/sistema-ordinazioni-ristorante" },
      { Icon: CalendarCheck, title: "Prenotazione tavoli 24/7", desc: "Gli ospiti prenotano da soli dal sito o dal menu QR mentre tu sei in sala. Calendario per tavolo, conferme e promemoria automatici. Nessun cliente perso.", tag: "Prenotazioni", href: "/it/prenotazione-tavoli" },
      { Icon: ChefHat, title: "Display di cucina (KDS)", desc: "Addio scontrini di carta. Gli ordini dalla sala arrivano direttamente sullo schermo dello chef — colonne «in cottura / pronto / servito», allergeni e note evidenziati a colori. Su tablet o cellulare.", tag: "KDS", href: "/it/display-cucina" },
    ],
  },

  founder: {
    eyebrow: "Creato da ristoratori",
    quoteStart:
      "Io e mia moglie gestivamo il nostro caffè e sappiamo in prima persona come è fatta davvero la giornata di un ristorante: ordini, prenotazioni, sala e cucina. Volevamo un unico strumento — moderno, semplice da avviare e chiaro a colpo d'occhio —",
    quoteAccent: "così è nata l'idea della piattaforma che sviluppiamo per altri ristoratori.",
    sign: "Bogdan Sokolov · fondatore, ex titolare di un caffè",
    photoAlt: "Bogdan Sokolov, fondatore di IQ Rest",
  },

  how: {
    heading: "Online in 5 minuti",
    sub: "Quattro passaggi rapidi. Senza installazioni né configurazione tecnica.",
    steps: [
      { n: "1", t: "Tipo e nome", d: "Scegli il tipo di locale e inserisci il nome." },
      { n: "2", t: "Salva", d: "Inserisci l'email o accedi con Google." },
      { n: "3", t: "Menu", d: "Aggiungi i piatti a mano oppure carica il menu cartaceo per la scansione IA." },
      { n: "4", t: "Pronto", d: "Condividi il link o il codice QR e inizia a ricevere ordini." },
    ],
  },

  pricing: {
    badge: "Senza commissioni · Senza contratti",
    heading: "Un solo piano.",
    headingAccent: "Tutto incluso.",
    sub: "Menu QR, ordini, traduzione con IA, sito del ristorante e prenotazioni. Un'unica tariffa mensile trasparente.",
    monthlyLabel: "Mensile",
    yearlyLabel: "Annuale",
    saveBadge: "Risparmi il 25%",
    perMonth: "al mese",
    billedAnnually: "Fatturazione annuale: {total}",
    youSave: "Risparmi {amount}",
    trust: { secure: "Pagamento sicuro con Stripe", noCommitment: "Senza vincoli", quick: "Attivo in pochi minuti", restaurants: "Più di 500 ristoranti" },
  },

  faq: {
    eyebrow: "Hai domande?",
    heading: "Domande",
    headingAccent: "frequenti.",
    sub: "Cosa chiedono i ristoratori prima di registrarsi. Non trovi la tua domanda? Scrivici su WhatsApp — rispondono persone vere, non un bot.",
    whatsappCta: "Scrivi su WhatsApp",
    whatsappPrefill: "Salve, ho una domanda su IQ Rest",
    items: [
      { q: "Cosa include la prova gratuita e cosa succede dopo?", a: "Accesso completo a tutte le funzionalità per 14 giorni, senza carta. Trascorsi i 14 giorni l'account viene messo in pausa se non hai aggiunto un metodo di pagamento — non addebitiamo mai automaticamente. Puoi aggiungere il pagamento più tardi e ripartire da dove avevi lasciato. Disdici in un clic." },
      { q: "Prendete una commissione sugli ordini?", a: "No. Ogni ordine dal menu QR arriva direttamente al ristorante — nessuna percentuale per noi, nessuna commissione da aggregatore. Una sola tariffa mensile fissa e nient'altro." },
      { q: "Gli ospiti hanno bisogno di un'app, noi di competenze tecniche?", a: "Gli ospiti non hanno bisogno di nessuna app: inquadrano il QR con la fotocamera del cellulare e il menu si apre nel browser. Anche il ristorante non ha bisogno di competenze tecniche: il pannello di amministrazione funziona in qualsiasi browser moderno — cellulare, tablet o portatile. Tutto a colpi di tocco e trascinamento, senza scrivere codice." },
      { q: "Quanto velocemente si aggiornano i prezzi e si aggiungono i piatti?", a: "Subito. Cambi un prezzo dal cellulare — gli ospiti lo vedono in pochi secondi. Un piatto nuovo? Pochi tocchi: nome, prezzo, foto. Senza ristampe, senza aspettare un grafico." },
      { q: "Quante lingue sono supportate?", a: "35 lingue con traduzione integrata basata su IA. Un tocco e tutto il menu è tradotto; l'IA capisce il contesto gastronomico — i nomi e le descrizioni dei piatti suonano naturali in qualsiasi lingua. I turisti ordinano con più sicurezza quando capiscono davvero il menu." },
    ],
  },

  finalCta: {
    heading: "Online in 5 minuti.",
    headingAccent: "14 giorni gratis.",
    sub: "Senza carta, disdici quando vuoi. Unisciti a oltre 500 ristoranti che usano già IQ Rest.",
  },

  scan: {
    heading: "Hai il menu cartaceo o in PDF?",
    headingAccent: "L'IA lo digitalizza in 60 secondi.",
    sub: "Carica una foto o un documento — l'IA riconosce categorie, piatti e prezzi automaticamente.",
    cta: "Scansiona il menu →",
  },

  pricingHero: {
    chips: ["Senza commissioni", "Senza contratti", "14 giorni gratis"],
    heading: "Prezzi.",
    headingAccent: "Senza costi nascosti.",
    sub: "Un'unica tariffa mensile trasparente. Nessuna percentuale sugli ordini né commissioni da aggregatore. Disdici l'abbonamento quando vuoi.",
    popularBadge: "Più scelto",
    perMonthSuffix: "/mese",
    whenAnnualTemplate: "con pagamento annuale · {total} € all'anno",
    orMonthlyTemplate: "oppure {price} €/mese",
    savingsTemplate: "risparmi {amount} € all'anno",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, ordini QR e traduzione con IA. Online in 5 minuti.",
        features: [
          "Menu QR per ogni tavolo",
          "Menu digitale con foto e allergeni",
          "Traduzione con IA in 35 lingue",
          "Ordini dal menu (opzionale)",
          "Generazione di foto dei piatti con IA",
          "Gestione da cellulare o tablet",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Controllo completo del ristorante: display di cucina e prenotazioni.",
        features: [
          "Tutto ciò che è incluso in Basic",
          "Display di cucina (KDS)",
          "Prenotazione online dei tavoli 24/7",
          "Supporto prioritario su WhatsApp",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/it/menu-digitale-ristoranti", label: "Menu digitale" },
      { href: "/it/sistema-ordinazioni-ristorante", label: "Ordini" },
      { href: "/it/prenotazione-tavoli", label: "Prenotazioni" },
      { href: "/it/display-cucina", label: "Display di cucina" },
    ],
    navLinks: [
      { href: "/it/prezzi", label: "Prezzi" },
      { href: "#faq", label: "FAQ" },
      { href: "/it/languages", label: "Cambia lingua" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tutti i diritti riservati.",
  },
};
