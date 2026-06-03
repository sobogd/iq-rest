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
    sub: "La piattaforma completa per gestire un ristorante moderno — bella, tutto in un unico posto, senza competenze tecniche.",
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
    { Icon: Languages, tag: "Menu digitale", title: "Un menu che sembra un sito, non un PDF.", bullets: ["35 lingue con IA","Design premium","Prezzi aggiornati subito"], image: "/landing/feature-design.webp", imageAlt: "Due telefoni sul tavolo di un bar: la schermata di benvenuto del menu digitale e la pagina contatti con la mappa" },
    { Icon: ChefHat, tag: "Display di cucina", title: "La cucina, finalmente senza carta.", bullets: ["Live sullo schermo","Note e allergeni","Tablet o telefono"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet sul bancone che mostra il display di cucina con le comande per tavolo" },
    { Icon: CalendarCheck, tag: "Prenotazioni", title: "Tavoli che si prenotano da soli, 24/7.", bullets: ["Prenotazione autonoma","Conferma automatica","Calendario per tavolo"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Due tablet che mostrano il calendario prenotazioni: vista giornaliera per tavolo e vista mensile" },
    { Icon: Receipt, tag: "Ordini al tavolo", title: "Prendi le comande senza blocchetto — opzionale.", bullets: ["Cliente o cameriere","Dritto in cucina","Attivalo quando vuoi"], image: "/landing/feature-orders.webp", imageAlt: "Un cameriere prende un ordine al tavolo dal telefono, arriva sul display di cucina" },
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

  how: {
    heading: "Pronto in 5 minuti",
    sub: "Quattro passi. Nessuna installazione, nessuna configurazione tecnica, nessuna carta.",
    steps: [
      { n: "1", t: "Tipo e nome", d: "Tipo di locale e nome — è tutta qui la registrazione." },
      { n: "2", t: "Accedi", d: "Email o Google. Senza carta." },
      { n: "3", t: "Aggiungi il menu", d: "Scrivilo o lascia che l'IA scansioni il menu cartaceo." },
      { n: "4", t: "Sei online", d: "Menu, cucina e prenotazioni — pronti." },
    ],
  },
};
