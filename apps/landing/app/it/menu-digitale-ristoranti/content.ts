import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "it",
  slug: "menu-digitale-ristoranti",
  trackPrefix: "l_it_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Menu digitale per ristoranti | IQ Rest",
    description:
      "Menu digitale per ristoranti: menu online con foto, allergeni, traduzione con IA e aggiornamento dei prezzi in tempo reale. 14 giorni gratis, senza carta.",
    canonical: "https://iq-rest.com/it/menu-digitale-ristoranti",
    ogLocale: "it_IT",
    ogTitle: "Menu digitale per ristoranti",
    ogDescription:
      "Versione online del menu cartaceo — foto, allergeni, traduzione con IA e aggiornamenti in tempo reale.",
    brandLine: "IQ Rest — Menu digitale per ristoranti",
  },

  hero: {
    headline: "Un menu digitale\nche ha tutto",
    cta: "Crea il menù digitale",
    sub: "Foto, allergeni e traduzione in 35 lingue. Più ordini, WhatsApp e prenotazione tavolo — tutto in un solo IQ Rest.",
  },

  scan: {
    heading: "Hai il menu cartaceo o in PDF?",
    headingAccent: "L'IA lo digitalizza in 60 secondi.",
    sub: "Carica una foto o un documento — l'IA riconosce categorie, piatti e prezzi automaticamente.",
    cta: "Scansiona il menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Traduzione con IA",
      heading: "Menu in 35 lingue",
      body: "Un QR, 35 lingue. L'IA traduce con contesto culinario, così ogni piatto suona naturale. I turisti ordinano sicuri.",
      bullets: [
        "35 lingue nel tuo piano",
        "IA culinaria, non Google",
        "Cambio lingua con un tocco",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Due ospiti leggono lo stesso menu digitale in lingue diverse dai propri cellulari" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeni",
      heading: "Allergeni e diete sui piatti",
      body: "Segnala glutine, lattosio, frutta a guscio, vegano e senza glutine. Gli ospiti filtrano il menu sulla dieta e ordinano facile.",
      bullets: [
        "14 categorie di allergeni",
        "Tag vegano e senza glutine",
        "Filtro per dieta",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Ospite filtra il menu per allergeni sul cellulare mentre il titolare modifica l'elenco degli allergeni su un tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Design e brand",
      heading: "Menu premium sul tuo dominio",
      body: "Video di benvenuto, il tuo design e una pagina contatti con mappa e social — sul tuo dominio, non un PDF.",
      bullets: [
        "Video e design premium",
        "Il tuo dominio con SSL",
        "Contatti, mappa e social",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Due cellulari su un tavolino da bar: schermata principale del menu con video di sfondo e pagina contatti con mappa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Ordini",
      heading: "Ordini online, zero commissioni",
      body: "Gli ospiti ordinano dal menu o dritto sul tuo WhatsApp — arriva in sala o in cucina, con 0% trattenuto sugli incassi.",
      bullets: [
        "Dal menu o da WhatsApp",
        "In sala o cucina, 0%",
        "Attivalo nelle impostazioni",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Due cellulari su un tavolo: carrello con l'ordine e schermata di ordine confermato" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Prenotazioni",
      heading: "Prenotazione tavolo, 24/7",
      body: "Gli ospiti prenotano il tavolo da soli dal menu o da un link, tu vedi il calendario per tavolo e confermi auto o a mano.",
      bullets: [
        "Prenotano da soli",
        "Calendario per tavolo",
        "Conferma auto o manuale",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Gestione",
      heading: "Gestiscilo da ovunque",
      body: "Il pannello gira in ogni browser — telefono, tablet o PC. Niente da installare, e un menu base va online in pochi minuti.",
      bullets: [
        "Ogni dispositivo, ogni browser",
        "Niente da installare",
        "Online in pochi minuti",
      ],
    },
  ],

  faq: {
    sub: "Cosa chiedono i ristoratori sul menu digitale di IQ Rest. Non trovi la tua domanda? Scrivici su WhatsApp.",
    items: [
      { q: "Servono competenze tecniche o esperienza con un CMS?", a: "No, non servono competenze particolari. Tutte le azioni nel pannello si fanno con clic e trascinamento, senza codice. Aggiungere un piatto richiede pochi secondi: nome, prezzo, foto. La configurazione completa del menu di solito richiede da 30 minuti a un'ora." },
      { q: "Cos'è il menu digitale di IQ Rest?", a: "IQ Rest è una piattaforma cloud per ristoranti. Il menu digitale è la versione online del tuo menu, accessibile agli ospiti tramite un codice QR o un link diretto: foto dei piatti, prezzi, allergeni, traduzione con IA in 35 lingue e aggiornamenti in tempo reale. Il menu è ospitato sui nostri server — non devi installare o mantenere nulla, basta aprire il browser." },
      { q: "Gli ospiti hanno bisogno di un'app o di hardware speciale?", a: "No. Inquadrano il QR con la fotocamera del cellulare e il menu si apre nel browser. Anche il pannello di amministrazione funziona in qualsiasi browser moderno — cellulare, tablet o portatile. I QR si stampano con una normale stampante da ufficio." },
      { q: "Posso usare il mio dominio?", a: "Sì. Supportiamo un dominio personalizzato con certificato SSL: gli ospiti vedono il menu all'indirizzo del tuo ristorante (ad esempio, menu.tuoristorante.com). Ti aiutiamo con la configurazione DNS; di solito richiede 5–10 minuti." },
      { q: "Posso gestire più ristoranti da un unico account?", a: "Sì, su richiesta. Un unico account può raccogliere più ristoranti: ogni locale con il suo menu, design, codici QR e statistiche. Scrivici su WhatsApp e attiviamo la modalità multiristorante per la tua attività." },
      { q: "Quanto è complicato impostare il menu da zero?", a: "La configurazione si articola in tre passaggi: (1) crea le categorie; (2) aggiungi i piatti con nome, prezzo e foto; (3) stampa i QR per i tavoli. Se hai già un menu cartaceo o un PDF, caricalo: l'IA riconosce categorie, nomi e prezzi e compila le card automaticamente. Un menu base può andare online in 5 minuti; il tempo della configurazione completa dipende dal numero di piatti." },
      { q: "Che tipo di supporto offrite?", a: "Siamo disponibili su WhatsApp negli orari di lavoro e rispondiamo rapidamente via email. Ti aiutiamo con l'attivazione, il collegamento del dominio, il design del menu e qualsiasi situazione fuori dal comune. Se ti serve una demo o un affiancamento in fase di lancio, scrivici." },
    ],
  },
};
