import { QrCode, MessageCircle, ChefHat, Settings2, Languages, BarChart3 } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

// /it/tablet-per-ordinazioni-ristorante targets the broad-match Italian
// keyword "tablet per ordinazioni ristorante" (best available B2B-intent
// term: 30/mo, LOW competition idx 26). NOT a delivery-aggregator
// competitor: the order goes from the guest's QR menu to your kitchen
// tablet or to your restaurant's WhatsApp number. Online card payment is
// opt-in custom integration, not enabled by default.
export const TEXTS: LandingTexts = {
  htmlLang: "it",
  htmlDir: "ltr",

  meta: {
    title: "Tablet per Ordinazioni Ristorante — QR e WhatsApp | IQ Rest",
    description:
      "Tablet per ordinazioni ristorante: il cliente scansiona il QR, ordina, l'ordine arriva diretto al tuo tablet di cucina o al tuo WhatsApp. Niente commissioni, numero del tavolo incluso. 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/tablet-per-ordinazioni-ristorante",
    ogLocale: "it_IT",
    ogTitle: "Tablet per Ordinazioni Ristorante — Diretto in Cucina",
    ogDescription:
      "Il cliente scansiona il QR al tavolo, compone l'ordine e arriva al tuo tablet o al tuo WhatsApp — niente aggregatore, niente commissioni, numero del tavolo su ogni comanda.",
  },

  ctaText: "Attiva i miei ordini",
  demoText: "Vedi demo live",
  microcopy: "Da 6,90€/mese · 14 giorni gratis · Cancelli quando vuoi",

  header: {
    navFeatures: "Funzionalità",
    navHow: "Come funziona",
    navPricing: "Prezzi",
    navFaq: "FAQ",
    signIn: "Accedi",
    cta: "Prova gratis",
  },

  hero: {
    verticals: ["Ristoranti", "Caffè", "Bistrot", "Pizzerie", "Bar", "Trattorie"],
    headline: "Tablet per Ordinazioni Ristorante.",
    sub: "Il cliente scansiona il QR al tavolo, compone l'ordine dal telefono e la comanda arriva diretta al tablet in cucina o al WhatsApp del locale. Niente aggregatore, niente commissioni, numero del tavolo su ogni ticket.",
    dynamicHeadlines: [
      "Ordini al tavolo.",
      "Diretto al tablet di cucina.",
      "O diretto a WhatsApp.",
      "Zero commissioni.",
      "Numero del tavolo incluso.",
    ],
    painBullets: [
      "Tablet per ordinazioni ristorante che il ristorante controlla davvero — nessun intermediario, nessuna commissione.",
      "Gli ordini arrivano sul tablet di cucina o del responsabile con numero del tavolo, modificatori, allergeni e note.",
      "Oppure inviati direttamente al WhatsApp del ristorante — perfetto per asporto o team piccoli.",
      "QR per ogni tavolo (o uno unico per tutto il locale) generato automaticamente.",
    ],
    rating: "+500 ristoranti in 30 paesi",
  },

  features: {
    heading: "Un sistema di ordinazioni",
    headingAccent: "pensato per il tavolo.",
    sub: "Funzionalità reale, non un clone degli aggregatori di delivery.",
    items: [
      {
        Icon: QrCode,
        title: "Menu QR con carrello su ogni tavolo",
        desc: "Il cliente scansiona il QR del tavolo, naviga il menu nella sua lingua, aggiunge piatti con modificatori, lascia una nota per la cucina e invia. Nessuna app da installare.",
        tag: "Ordini QR",
      },
      {
        Icon: ChefHat,
        title: "Comande sul tablet di cucina",
        desc: "Ogni nuovo ordine appare nella scheda Cucina del pannello — sul tablet che tieni al pass — con numero del tavolo, piatti, varianti, allergeni e nota del cliente. Lo sposti da in lavorazione a completato con un tocco.",
        tag: "Vista cucina",
      },
      {
        Icon: MessageCircle,
        title: "O invia gli ordini a WhatsApp",
        desc: "Imposta il ristorante in modalità WhatsApp (o usa entrambe insieme) e ogni ordine arriva al WhatsApp del locale come messaggio formattato — ideale per asporto, team piccoli o quando il responsabile è fuori.",
        tag: "Modalità WhatsApp",
      },
      {
        Icon: Settings2,
        title: "Modificatori, varianti e allergeni",
        desc: "Ogni piatto porta i suoi gruppi di varianti (taglia, cottura, aggiunte) con differenza di prezzo, tag allergeni e descrizione libera. Il carrello rispetta tutto, quindi la comanda sul tablet non ha ambiguità.",
        tag: "Carrello reale",
      },
      {
        Icon: Languages,
        title: "Checkout multilingue",
        desc: "Tutto il flusso d'ordine — carrello, modificatori, commento, conferma — è tradotto in 35 lingue e si adatta automaticamente alla lingua del telefono del cliente. I turisti ordinano con sicurezza.",
        tag: "35 lingue",
      },
      {
        Icon: BarChart3,
        title: "Numerazione giornaliera e log",
        desc: "Ogni ordine riceve il numero del giorno per la cucina, finisce in un registro con totali e timestamp, alimenta l'analitica. Le cancellazioni sono soft-deleted per non sporcare i report.",
        tag: "Log ordini",
      },
    ],
  },

  founder: {
    eyebrow: "Costruito da un proprietario di caffè, non da una startup del delivery",
    quoteStart:
      "Io e mia moglie abbiamo aperto un caffè e abbiamo passato settimane cercando un modo di prendere gli ordini dal tavolo che non desse il 30% a un aggregatore né richiedesse un POS da 1500€. Tutto quello che provavamo era pesante, caro o privo delle basi —",
    quoteAccent: "così abbiamo costruito il sistema di ordinazioni che avremmo voluto avere.",
    sign: "Bogdan Sokolov · fondatore, ex proprietario di caffè",
    photoAlt: "Bogdan, fondatore di IQ Rest",
  },

  how: {
    heading: "Attiva il tuo sistema di ordinazioni",
    headingAccent: "in 4 passi",
    sub: "Nessuna installazione, nessun integratore, nessuna chiamata all'informatico. Solo il telefono e 5 minuti.",
    steps: [
      { n: "1", t: "Crea il ristorante", d: "Registrazione email o Google — 30 secondi." },
      { n: "2", t: "Aggiungi il menu", d: "Drag-and-drop o scansione IA del menu cartaceo." },
      { n: "3", t: "Scegli il canale", d: "Tablet di cucina, WhatsApp o entrambi insieme." },
      { n: "4", t: "Stampa il QR", d: "Un QR per tavolo: i clienti iniziano a ordinare subito." },
    ],
  },

  pricing: {
    badge: "Ordini illimitati · Zero commissioni",
    heading: "Un piano.",
    headingAccent: "Nessun costo per ordine.",
    sub: "Ordini online, menu QR, modalità WhatsApp, checkout multilingue e analitica — tutto in un solo abbonamento. Nessuna percentuale per transazione.",
    monthlyLabel: "Mensile",
    yearlyLabel: "Annuale",
    saveBadge: "Risparmia 25%",
    perMonth: "al mese",
    billedAnnually: "Fatturato annualmente {total}",
    youSave: "Risparmi {amount}",
    trust: {
      secure: "Abbonamento gestito da Stripe",
      noCommitment: "Nessun vincolo",
      quick: "Attivo in minuti",
      restaurants: "+500 ristoranti",
    },
  },

  faq: {
    eyebrow: "Sistema di ordinazioni — domande frequenti",
    heading: "Sul sistema di",
    headingAccent: "ordinazioni.",
    sub: "Quello che chiedono i ristoratori prima di attivare gli ordini online con IQ Rest. Non vedi la tua? Scrivici su WhatsApp — rispondono persone vere.",
    whatsappCta: "Chiedi su WhatsApp",
    whatsappPrefill: "Ciao, ho una domanda sugli ordini di IQ Rest",
    items: [
      {
        q: "È una piattaforma di delivery tipo Uber Eats o Glovo?",
        a: "No, ed è proprio il punto. IQ Rest è il canale di ordinazione del ristorante stesso — il cliente ordina dal tuo QR, la comanda arriva al tuo tablet o WhatsApp, tu la servi. Niente marketplace, niente catalogo aggregatore, e non prendiamo mai parte del conto.",
      },
      {
        q: "Dove arrivano esattamente gli ordini?",
        a: "Nella scheda Cucina del pannello IQ Rest, su qualsiasi tablet o telefono che tieni al pass o al banco. Ogni ordine mostra il numero del tavolo, i piatti con varianti e allergeni, il commento del cliente e il numero d'ordine giornaliero. Lo sposti da nuovo → in lavorazione → completato con un tocco.",
      },
      {
        q: "Posso ricevere gli ordini su WhatsApp invece?",
        a: "Sì. Ogni ristorante ha tre modalità: interna (solo tablet di cucina), WhatsApp (l'ordine arriva come messaggio formattato al WhatsApp del locale) o entrambe insieme. La modalità è un singolo interruttore nel pannello — la cambi quando vuoi.",
      },
      {
        q: "Cosa include un ordine — solo i piatti?",
        a: "Piatti con le loro varianti e aggiunte (differenza di prezzo inclusa), allergeni, numero del tavolo, commento libero del cliente e — se attivi i campi — nome, telefono e indirizzo del cliente. Abbastanza per gestire un asporto o richiamare il tavolo per un allergene.",
      },
      {
        q: "I clienti possono pagare online dal menu?",
        a: "Non di default. IQ Rest è pensato per il pagamento al tavolo — il cliente ordina, porti il conto, paga come sempre. Se ti serve il pagamento con carta online (tipico per asporto) si può integrare Stripe Connect su richiesta; scrivici su WhatsApp.",
      },
      {
        q: "Serve un tablet speciale, stampante o hardware POS?",
        a: "No. Va bene qualsiasi tablet, portatile o telefono con browser — apri il pannello, fai login, lasci aperta la scheda Cucina. Se hai già un POS, IQ Rest convive con esso; non sostituisce la cassa.",
      },
      {
        q: "Come fa il cliente a sapere che l'ordine è arrivato?",
        a: "Vede una conferma nel browser con il numero d'ordine giornaliero. La scheda Cucina si aggiorna in tempo reale — quando lo segni in lavorazione o completato, il cliente vede lo stato senza ricaricare.",
      },
      {
        q: "Posso disattivare gli ordini su un locale e tenere solo il menu?",
        a: "Sì. Ogni ristorante ha un interruttore Ordini attivi. Lo disattivi e il menu continua a funzionare — si può navigare, filtrare per allergeni, cambiare lingua — ma il carrello sparisce. Utile per locali che vogliono solo il menu QR senza il flusso ordini.",
      },
      {
        q: "Cosa succede dopo i 14 giorni gratis?",
        a: "Se non aggiungi un metodo di pagamento, l'account va in pausa — non addebitiamo mai automaticamente. Menu, ordini e impostazioni restano salvati; aggiungi i dati quando vuoi per riattivare. Cancelli con un clic, nessun vincolo.",
      },
    ],
  },

  finalCta: {
    heading: "Attiva il tuo sistema di ordinazioni.",
    headingAccent: "Pronto in 5 minuti.",
    sub: "14 giorni gratis, nessuna carta richiesta. Cancelli quando vuoi. Unisciti a 500+ ristoranti che gestiscono gli ordini con IQ Rest.",
  },

  scan: {
    heading: "Da menu cartaceo a sistema di ordinazioni",
    headingAccent: "in 60 secondi",
    sub: "Carica una foto del menu — l'IA estrae categorie, piatti e prezzi e li porta nell'editor. Da lì il carrello e il QR sono a un clic.",
    cta: "Scansiona il mio menu →",
  },

  footer: {
    featureLinks: [
      { href: "/it/ai-translation", label: "Traduzione IA" },
      { href: "/it/reservations", label: "Prenotazioni" },
      { href: "/it/mobile-management", label: "Gestione mobile" },
      { href: "/it/easy-menu", label: "Editor menu" },
      { href: "/it/custom-design", label: "Sfondi video e foto" },
      { href: "/it/color-scheme", label: "Colori del brand" },
      { href: "/it/multilingual", label: "Menu multilingue" },
      { href: "/it/ai-images", label: "Ottimizzazione foto IA" },
      { href: "/it/analytics", label: "Analitica" },
      { href: "/it/instant-setup", label: "Setup istantaneo" },
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
