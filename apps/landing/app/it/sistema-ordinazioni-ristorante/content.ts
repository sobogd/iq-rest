import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "it",
  slug: "sistema-ordinazioni-ristorante",
  trackPrefix: "l_it_orders",

  meta: {
    title: "Sistema di ordinazioni per ristorante — Ospite e cameriere | IQ Rest",
    description:
      "Sistema di ordinazioni per ristorante da cellulare o tablet: piantina della sala, divisione del conto, stati, opzioni e note. L'ospite ordina dal tavolo; il cameriere prende la comanda dal suo dispositivo. 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/sistema-ordinazioni-ristorante",
    ogLocale: "it_IT",
    ogTitle: "Sistema di ordinazioni per ristorante — Ospite e cameriere",
    ogDescription:
      "Ospite al tavolo o cameriere dal cellulare — l'ordine arriva subito in cucina. Piantina, divisione del conto, stati, opzioni e note.",
    brandLine: "IQ Rest — Sistema di ordinazioni per ristorante",
  },

  hero: {
    headline: "Ordini: ospite e cameriere — direttamente in cucina.",
    cta: "Configura gli ordini online",
    sub: "L'ospite ordina dal menu QR al tavolo oppure il cameriere prende la comanda dal cellulare o dal tablet — l'ordine arriva sul display di cucina in pochi istanti. Piantina della sala con tavoli colorati per stato, divisione del conto, opzioni flessibili e note. Senza blocchetti e senza viaggi al banco.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Cameriere prende un'ordinazione al tavolo da uno smartphone — la comanda arriva sul display di cucina",
  },

  scan: {
    heading: "Attiva il sistema di ordinazioni",
    headingAccent: "in 5 minuti.",
    sub: "Carica il menu cartaceo o in PDF — l'IA riconosce piatti, prezzi e categorie. Collega un tablet in sala e inizia a ricevere gli ordini dai tavoli.",
    cta: "Scansiona il menu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Elenco e piantina della sala",
      heading: "Elenco degli ordini accanto alla piantina della sala.",
      body: "Tutti gli ordini attivi a destra: stato, totale, orario e numero di righe. A sinistra la piantina della sala: i tavoli sono colorati per stato — libero, occupato, richiede attenzione. Tocca un tavolo per aprire l'ordine; tocca una card per vedere il dettaglio. Senza saltare tra schermate.",
      bullets: [
        "Piantina della sala con tavoli colorati per stato dell'ordine.",
        "Elenco degli ordini accanto — totale, orario, numero di righe.",
        "Tocca un tavolo e apri o crei un nuovo ordine.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet alla postazione del cameriere: elenco degli ordini e piantina della sala con tavoli colorati" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Dettaglio ordine",
      heading: "Dettaglio dell'ordine: stati, duplica ed elimina — con un solo tocco.",
      body: "Ogni riga ha il proprio stato (In attesa / In cottura / Pronto / Servito) — cucina e cameriere vedono la stessa situazione in tempo reale. Toccando il pallino dello stato si apre il menu delle azioni: cambia stato, duplica la riga con gli stessi modificatori e opzioni, eliminala. Tutto direttamente nella card dell'ordine.",
      bullets: [
        "Stato per ogni riga: In attesa / In cottura / Pronto / Servito.",
        "Duplica una riga con un tocco, mantenendo le stesse opzioni.",
        "Elimina una riga direttamente dalla card dell'ordine.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet con la card dettagliata dell'ordine: stati dei piatti, duplicazione ed eliminazione delle righe" },
    },
    {
      icon: Receipt,
      eyebrow: "Divisione del conto",
      heading: "Dividi il conto quando gli ospiti pagano separatamente.",
      body: "Gli ospiti decidono di pagare separatamente — spunta le righe che vanno su un nuovo scontrino; il resto rimane su quello attuale. Il sistema mostra subito entrambi i totali. Un tocco su «Dividi ordine» e hai due ordini indipendenti con i totali corretti, entrambi associati ai loro tavoli.",
      bullets: [
        "Selezione delle righe da dividere con le caselle.",
        "Totale del nuovo scontrino e di quello rimanente subito visibili.",
        "Un tocco e l'ordine è diviso senza calcoli a mano.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet su un tavolo del ristorante: divisione del conto tra gli ospiti" },
    },
    {
      icon: Smartphone,
      eyebrow: "Aggiunta da cellulare",
      heading: "Aggiungi righe dal cellulare — in tre azioni.",
      body: "Il cameriere non è legato a un solo dispositivo: apre gli ordini sul suo cellulare e aggiunge una riga in tre passaggi — categoria, piatto, opzioni (formato, cottura, salsa o ingrediente extra). Il prezzo si ricalcola automaticamente. La nota per la cucina si inserisce nell'ultimo passaggio.",
      bullets: [
        "Tre passaggi: categoria → piatto → opzioni.",
        "Opzioni (formato, aggiunte, ingredienti) con prezzo in un clic.",
        "Campo note nell'ultimo passaggio.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Quattro cellulari con i passaggi per aggiungere una riga all'ordine: categoria, piatto, formato, nota" },
    },
  ],

  faq: {
    sub: "Cosa chiedono i ristoratori sugli ordini in IQ Rest. Non trovi la tua domanda? Scrivici su WhatsApp.",
    items: [
      { q: "Più camerieri possono lavorare contemporaneamente da dispositivi diversi?", a: "Sì. Ogni cameriere accede all'account comune del ristorante dal proprio cellulare o tablet — tutti vedono gli stessi tavoli, gli stessi ordini e gli stessi stati in tempo reale. Le modifiche fatte da un cameriere appaiono subito anche agli altri, senza conflitti né blocchi." },
      { q: "I camerieri possono usare i propri dispositivi personali?", a: "Sì. È un'applicazione web nel browser: non c'è nulla da installare. Il cameriere apre il link, accede all'account del ristorante dal suo iPhone, Android o tablet personale e inizia a lavorare. A fine turno basta uscire dall'account." },
      { q: "Si possono aggiungere opzioni obbligatorie ai piatti (formato, cottura)?", a: "Sì. Su ogni piatto puoi configurare qualsiasi numero di gruppi di opzioni — obbligatorie (ad esempio «Formato»: piccolo / medio / grande) e facoltative («Cottura»: al sangue / media / ben cotta). Le opzioni possono modificare il prezzo (+1,00 €). In un gruppo obbligatorio il sistema non permette di aggiungere il piatto senza scegliere." },
      { q: "Si possono indicare note o aggiunte (pane, salsa) al piatto?", a: "Sì. Nell'ultimo passaggio dell'aggiunta è disponibile un campo libero per le note («senza cipolla», «ben cotta», «allergia alla frutta secca»). Le aggiunte si gestiscono come modificatori a pagamento («+ Salsa BBQ +1,50 €», «+ Pane +2,00 €»). Le note appaiono sul display di cucina evidenziate a colori." },
      { q: "Ci sono statistiche sugli ordini?", a: "Sì. Nella sezione analytics: incassi per giorno e per ora, scontrino medio, piatti più richiesti, conversione menu → ordine, velocità di servizio (tempo da In attesa a Servito). Aiuta a pianificare turni, ordini ai fornitori e a vedere quali piatti girano meno." },
      { q: "Si possono dividere gli ordini o spostarli tra tavoli?", a: "Sì, entrambi gli scenari sono supportati. Per la divisione, spunta le righe che vanno su un nuovo scontrino (quando gli ospiti pagano separatamente). Per lo spostamento, apri la card dell'ordine, scegli il nuovo tavolo e l'ordine si trasferisce completamente. Tutto senza ricalcoli manuali e senza uscire dal pannello." },
    ],
  },
};
