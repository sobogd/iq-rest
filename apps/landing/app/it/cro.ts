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
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Ristoranti","Caffè","Bar","Pizzerie"],
    title: "Il tuo ristorante,",
    titleAccent: "100% digitale in 5 minuti.",
    sub: "Un bel menu digitale, un display di cucina e prenotazioni 24/7 — la piattaforma completa per un ristorante moderno.",
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
