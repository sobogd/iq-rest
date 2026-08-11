import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Ristoranti","Caffè","Bar","Pizzerie"],
    title: "Il tuo ristorante, digitale",
    titleAccent: "in 5 min.",
    sub: "Menu digitale, display cucina e prenotazioni 24/7 — tutto ciò che serve al tuo ristorante, pronto in 5 minuti.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Ristoranti" },
      { icon: "cafe", label: "Caffè" },
      { icon: "bar", label: "Bar" },
      { icon: "pizza", label: "Pizzerie" },
    ],
    title: "Tutto ciò che serve",
    titleAccent: "al tuo ristorante!",
    sub: "Configura i processi in 10 minuti: lancia il menù online, ottimizza il lavoro della cucina e la gestione dei tavoli.",
    primaryLabel: "Inizia gratis",
    demoLabel: "Guarda la demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet con il display di cucina: ordini per tavolo in colonne con stati" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet con il calendario delle prenotazioni: vista mensile e prenotazioni in attesa di conferma" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefono con la home del sito di un ristorante: foto, prenotazioni e menù online" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefono con la scheda di un piatto: foto, prezzo ed etichette degli allergeni" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Operativo in 10 minuti", sub: "Senza hardware costoso né lunghe configurazioni" },
    { Icon: MessagesSquare, title: "Supporto rapido", sub: "Rispondiamo in chat nel giro di poche ore" },
    { Icon: Globe, title: "La scelta di {count} locali", sub: "Ristoranti e caffetterie in oltre 15 paesi si fidano di noi" },
    { Icon: Palette, title: "100% col tuo brand", sub: "Adattiamo design e interfaccia allo stile del tuo locale" },
  ],

  menu: {
    heading: "Sito web e menù digitale",
    sub: {
      link: "Più di un menù QR!",
      rest: " Un sito completo con design unico, pagina contatti e prenotazione dei tavoli.",
    },
    moreLabel: "Scopri di più",
    mockupAlt: "Due telefoni: la home del sito di un ristorante e la pagina di un piatto",
    bullets: [
      { Icon: Languages, title: "Traduzione automatica in 35 lingue", sub: "Servi gli ospiti stranieri senza barriere linguistiche: la traduzione automatica fa tutto da sola" },
      { Icon: ClipboardList, title: "Ordini direttamente dal tavolo", sub: "Semplifica il servizio: ricevi gli ordini dal tavolo, in fretta e senza camerieri" },
      { Icon: WheatOff, title: "Allergeni e diete", sub: "Segnala allergeni e preferenze (vegano, piccante) così scegliere è facile e sicuro" },
    ],
  },

  reservations: {
    heading: "Prenotazione dei tavoli",
    sub: {
      link: "Prenotazioni intelligenti!",
      rest: " Un sistema di prenotazione automatico che controlla da solo i tavoli liberi e i tuoi orari.",
    },
    moreLabel: "Scopri di più",
    mockupAlt: "Tablet con il calendario delle prenotazioni: tavoli per giorno e fascia oraria",
    bullets: [
      { Icon: CalendarCheck, title: "Mappa delle prenotazioni", sub: "Una griglia per giorni e tavoli: i posti liberi si vedono a colpo d'occhio" },
      { Icon: SlidersHorizontal, title: "Impostazioni flessibili", sub: "Definisci orari, durata degli slot, foto dei tavoli e raccogli le richieste degli ospiti" },
      { Icon: Users, title: "Controllo del flusso ospiti", sub: "Scegli come gestire le prenotazioni e tieni sotto controllo il flusso degli ospiti" },
    ],
  },

  heroMicrocopy: "{count} ristoranti · 14 giorni gratis · Senza carta",
  seeIncluded: "Cosa è incluso",

  trust: [
    { kind: "num", value: 35, label: "Lingue" },
    { kind: "text", value: "24/7", label: "Prenotazioni" },
    { kind: "num", value: 5, suffix: " min", label: "Avvio" },
    { kind: "count", label: "Ristoranti" },
  ],

  bundle: {
    heading: "Tutto ciò che fa funzionare il tuo ristorante.",
    headingAccent: "In un'unica app.",
    sub: "Menu, cucina e prenotazioni in un unico posto — moderno, veloce e pensato per come lavorano davvero i ristoranti. Niente extra, nessun costo per funzione.",
  },

  benefits: [
    { Icon: Languages, tag: "Menu digitale", title: "Un menu che vende.", bullets: ["35 lingue con IA","Design premium","Prezzi aggiornati subito"], image: "/landing/feature-design.webp", imageAlt: "Due telefoni sul tavolo di un bar: la schermata di benvenuto del menu digitale e la pagina contatti con la mappa" },
    { Icon: ChefHat, tag: "Display di cucina", title: "Cucina più in fretta, senza errori.", bullets: ["Live sullo schermo","Note e allergeni","Tablet o telefono"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet sul bancone che mostra il display di cucina con le comande per tavolo" },
    { Icon: CalendarCheck, tag: "Prenotazioni", title: "Prenotazioni in automatico.", bullets: ["Prenotazione autonoma","Conferma automatica","Calendario per tavolo"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Due tablet che mostrano il calendario prenotazioni: vista giornaliera per tavolo e vista mensile" },
    { Icon: Receipt, tag: "Ordini al tavolo", title: "Ordini dritti in cucina.", bullets: ["Cliente o cameriere","Dritto in cucina","Attivalo quando vuoi"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet con la schermata ordini: lista ordini e mappa della sala con tavoli colorati." },
  ],

  seeDetails: "Vedi dettagli",

  extras: {
    heading: "E tutto il resto incluso.",
    items: [
      { Icon: ScanLine, label: "L'IA digitalizza il tuo menu cartaceo in 60 secondi" },
      { Icon: QrCode, label: "Un QR code unico per ogni tavolo" },
      { Icon: Smartphone, label: "Nessuna app per i clienti — si apre nel browser" },
      { Icon: Globe, label: "Il tuo dominio con SSL" },
      { Icon: BarChart3, label: "Analisi delle vendite: ricavi, piatti top, orari" },
      { Icon: Palette, label: "Tag allergeni e diete con cui filtrare" },
    ],
  },

  midCta: {
    heading: "Un'app invece di cinque.",
    sub: "Niente più giocoleria tra strumenti separati per menu, cucina e prenotazioni — tutto in un unico posto, su qualsiasi telefono o tablet, senza installare nulla.",
  },

  platform: {
    hardwareTitle: "Lavora con il tuo hardware",
    hardwareSub: "Non ti obblighiamo mai ad acquistare hardware da noi. Usa telefoni, tablet e computer che hai già.",
    anywhereTitle: "Funziona ovunque",
    anywhereSub: "Cellulare, tablet, laptop, PC. Android, iOS, Windows, Mac, Linux. Funziona in qualsiasi browser moderno, senza installazioni.",
  },

  activities: {
    heading: "Un solo sistema,",
    headingAccent: "tutto il tuo ristorante.",
    sub: "Servizio più veloce, una cucina più tranquilla, costi più bassi e un’esperienza che i clienti ricordano — tutto in un’unica piattaforma.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Al tavolo — clienti",
        bullets: [
          "Menu QR in 35 lingue",
          "Ordinare senza aspettare il cameriere",
          "Chiamare il cameriere o chiedere il conto",
          "Prenotare un tavolo 24/7",
          "Un QR code unico per ogni tavolo",
          "Nessuna app per i clienti — si apre nel browser",
          "Tag allergeni e diete con cui filtrare",
        ],
      },
      {
        Icon: ChefHat,
        tag: "In cucina",
        bullets: [
          "Gli ordini arrivano subito sullo schermo",
          "Colonne in preparazione / pronto / servito",
          "Allergeni e note evidenziati",
          "Tablet o telefono — niente comande di carta",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Gestione",
        bullets: [
          "Modifiche a menu e prezzi in tempo reale",
          "Traduzione con IA in un clic",
          "Analisi delle vendite e report",
          "Più ristoranti in un unico account",
          "L'IA digitalizza il tuo menu cartaceo in 60 secondi",
          "Il tuo dominio con SSL",
        ],
      },
    ],
  },
};
