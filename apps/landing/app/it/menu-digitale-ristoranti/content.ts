import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "it",
  slug: "menu-digitale-ristoranti",
  trackPrefix: "l_it_digital",

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
    headline: "Menu digitale per ristoranti.",
    sub: "Versione online del menu cartaceo con foto, allergeni, descrizioni e aggiornamento dei prezzi in tempo reale. Gli ospiti leggono il menu nella loro lingua e il ristorante risparmia sulla stampa.",
    imageSrc: "/landing/hero-digital-menu.webp",
    imageAlt: "Two phones on a wooden restaurant table showing a digital menu with dish photos and prices",
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
      eyebrow: "35 lingue con IA",
      heading: "35 lingue con IA — ogni ospite legge il menu nella sua.",
      body: "Un solo QR, 35 lingue. L'IA tiene conto del contesto gastronomico — i nomi e le descrizioni dei piatti suonano naturali. I turisti ordinano con più sicurezza e lo scontrino medio cresce senza che un cameriere debba tradurre piatto per piatto.",
      bullets: [
        "35 lingue incluse nell'abbonamento, senza costi aggiuntivi.",
        "IA con sensibilità culinaria, non un banale Google Translate.",
        "L'ospite cambia lingua con un tocco direttamente nel menu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Due ospiti leggono lo stesso menu digitale in lingue diverse dai loro cellulari" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeni",
      heading: "Allergeni ed etichette dietetiche.",
      body: "Contrassegna i piatti con glutine, lattosio, frutta a guscio, frutti di mare, opzioni vegane e senza glutine. Gli ospiti filtrano il menu in base alle loro esigenze e ordinano con maggiore tranquillità.",
      bullets: [
        "14 categorie standard di allergeni su ogni piatto.",
        "Etichette vegan, vegetarian e gluten-free con un solo clic.",
        "L'ospite filtra il menu in base alle proprie esigenze.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Ospite filtra il menu per allergeni sul cellulare mentre il titolare modifica l'elenco degli allergeni su un tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Design premium con video di sfondo e pagina contatti.",
      body: "Un video o una foto sulla schermata di benvenuto, la descrizione del ristorante, una pagina contatti dedicata con mappa, numeri di telefono e social. Il menu digitale appare come un vero sito del ristorante, non come un PDF dietro un QR.",
      bullets: [
        "Video di sfondo o foto in primo piano sulla schermata principale.",
        "Descrizione del ristorante e delle categorie — racconta il concept.",
        "Pagina contatti: mappa, telefono, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Due cellulari su un tavolino da bar: schermata principale del menu con video di sfondo e pagina contatti con mappa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Ordini dal menu · opzionale",
      heading: "L'ospite ordina direttamente dal menu.",
      body: "L'ospite compone il carrello nel menu QR e invia l'ordine — arriva al cameriere in sala o sul tablet della cucina. La funzione si attiva o disattiva nelle impostazioni in qualsiasi momento.",
      bullets: [
        "Carrello, note e invio dell'ordine con un solo tocco.",
        "L'ordine arriva subito sul pannello, su WhatsApp o sul display di cucina.",
        "Funzionalità opzionale, attivabile o disattivabile nelle impostazioni.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Due cellulari su un tavolo: carrello con l'ordine e schermata di ordine confermato" },
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
