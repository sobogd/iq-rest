import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "it",
  slug: "display-cucina",
  trackPrefix: "l_it_kds",

  meta: {
    title: "Display di cucina (KDS) per ristoranti | IQ Rest",
    description:
      "Display di cucina KDS per ristoranti: gli ordini dalla sala e dal menu QR arrivano subito sullo schermo dello chef. Colonne per tavolo, stati In attesa / In cottura / Pronto / Servito, filtri per zona. Funziona su tablet o cellulare.",
    canonical: "https://iq-rest.com/it/display-cucina",
    ogLocale: "it_IT",
    ogTitle: "Display di cucina (KDS) — Ordini sullo schermo dello chef",
    ogDescription:
      "Ordini dalla sala sullo schermo dello chef. Colonne per tavolo, stati e timer. Un tocco cambia lo stato.",
    brandLine: "IQ Rest — Display di cucina per ristoranti",
  },

  hero: {
    headline: "Display di cucina: gli ordini direttamente sullo schermo dello chef.",
    cta: "Configura il monitor di cucina",
    sub: "Addio scontrini di carta. Gli ordini dalla sala o dal menu QR arrivano subito sul display di cucina — con note, allergeni e timer. Un tocco cambia lo stato. Funziona sia su un tablet al pass sia sullo smartphone del responsabile di cucina.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Cucina professionale con un tablet su supporto in ottone che mostra il display di cucina con gli ordini attivi",
  },

  scan: {
    heading: "Attiva il display di cucina",
    headingAccent: "in 5 minuti.",
    sub: "Carica il menu cartaceo o in PDF — l'IA riconosce piatti, categorie e allergeni. Collega un tablet in cucina e inizia a ricevere gli ordini.",
    cta: "Scansiona il menu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Controllo e filtri",
      heading: "Più schermi per zona: cucina e bar.",
      body: "Posiziona tablet separati sulla linea calda, al bar o in pasticceria — ogni schermo mostra solo i piatti che lo riguardano. I filtri per stato (In attesa / In cottura / Pronto / Servito) e per categoria tolgono il rumore dallo schermo: chi è in cucina vede solo ciò che riguarda la sua postazione.",
      bullets: [
        "Più schermi KDS con filtro per categoria di piatti.",
        "Filtro per stato: mostra solo «in cottura» e «pronto».",
        "Ogni zona vede solo il proprio flusso di ordini.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet su supporto in ottone al pass della cucina — KDS con filtro per stato dei piatti" },
    },
    {
      icon: Timer,
      eyebrow: "Card e timer",
      heading: "Un tocco cambia lo stato. Note e allergeni evidenziati a colori.",
      body: "La card del piatto mostra le opzioni scelte (senza cipolla, ben cotta), la nota dell'ospite, gli allergeni e un timer dal momento dell'ordine. Toccando la card lo stato passa al successivo: In attesa → In cottura → Pronto → Servito. L'elenco si ordina automaticamente per priorità di tempo.",
      bullets: [
        "Tocco sulla card — cambio di stato immediato.",
        "Opzioni, note e allergeni evidenziati a colori.",
        "Ordinamento per priorità: le righe che attendono di più salgono in cima.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet su supporto in ottone al banco bar — KDS con card degli ordini per tavolo" },
    },
  ],

  faq: {
    sub: "Cosa chiedono i ristoratori sul display di cucina di IQ Rest. Non trovi la tua domanda? Scrivici su WhatsApp.",
    items: [
      { q: "Quali stati hanno le righe in cucina?", a: "Quattro stati con colori diversi sulla card: In attesa (grigio) — l'ordine è accettato e attende; In cottura (arancione) — il piatto è in preparazione; Pronto (blu) — pronto da servire; Servito (verde) — consegnato all'ospite. Toccando la card si passa allo stato successivo, senza menu o conferme." },
      { q: "Si possono mettere più schermi KDS in zone diverse?", a: "Sì. Un tablet sulla linea calda, un altro al bar, un altro in pasticceria — ciascuno con il suo filtro per categoria. Tutti gli schermi sono sincronizzati in tempo reale: uno stato cambiato su uno schermo si aggiorna su tutti." },
      { q: "Che hardware serve per il KDS?", a: "Il KDS è un'app web che funziona in qualsiasi browser moderno. Per una cucina grande, un tablet su supporto al pass o una TV a parete. Per un piccolo locale basta lo smartphone del responsabile di cucina. Non servono hardware speciali né installazioni: si apre un link e si accede all'account." },
      { q: "Da dove arrivano gli ordini al display di cucina?", a: "Da tutte le fonti: l'ospite che ha ordinato dal menu QR al tavolo, il cameriere che ha preso la comanda dal suo cellulare, l'ospite che ha inviato l'ordine dal sito. Arrivano tutti sul KDS con l'etichetta della provenienza e il numero di tavolo. Senza trasferimenti manuali da un POS." },
      { q: "Cosa è visibile nella card di un ordine?", a: "Il nome del piatto, i modificatori scelti (senza cipolla, ben cotta, aggiungere salsa), la nota dell'ospite, gli allergeni evidenziati, lo stato (In attesa / In cottura / Pronto / Servito) e un timer con il tempo di attesa. Le card sono ordinate per priorità: più aspettano, più salgono in alto." },
      { q: "Si possono filtrare le card sullo schermo?", a: "Sì. Due filtri: per stato (ad esempio mostrare solo In attesa e In cottura, nascondendo Servito) e per categoria (solo bevande al bar, solo primi e secondi in cucina). Le impostazioni si salvano per dispositivo, così ogni zona mantiene il proprio set." },
    ],
  },
};
