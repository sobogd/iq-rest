import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Ordini online da menu QR — Ordini ristorante a zero commissioni",
    description:
      "Ricevi ordini diretti dal tuo menu QR. Zero commissioni, niente fetta a Uber Eats / Glovo. Gli ospiti scansionano, ordinano, pagano — direttamente a te. 14 giorni di prova gratuita.",
    canonical: "https://iq-rest.com/it/online-orders",
    ogLocale: "it_IT",
    ogTitle: "Ordini online senza commissioni — Ordini diretti dal tuo menu QR",
    ogDescription:
      "Sostituisci il 30% di commissioni delle app di delivery con ordini diretti. Gli ospiti scansionano il tuo QR, ordinano, pagano — ogni centesimo va a te. 14 giorni di prova gratuita, senza carta.",
  },

  hero: {
    title: "Ordini diretti. Zero commissioni. Direttamente in cucina.",
    subtitle:
      "Smetti di pagare il 30% a Uber Eats, Glovo e Wolt. Con IQ Rest i tuoi ospiti scansionano il QR, costruiscono l'ordine sul telefono e il bon arriva nella tua cucina — ogni centesimo resta con te.",
    trustLine: "500+ ristoranti in 30+ paesi",
  },

  seo: {
    description:
      "Trasforma il tuo menu QR in un sistema completo di ordini online senza cedere il 30% alle app di delivery. Gli ospiti scansionano il tuo codice QR, sfogliano il menu nella loro lingua, costruiscono un carrello, inviano l'ordine — e tu lo ricevi con il numero del tavolo, all'istante. Niente download di app, niente commissioni, nessun terzo tra te e il tuo ospite.",
    fullDescription:
      "La maggior parte dei ristoranti perde soldi prima ancora che il cibo lasci la cucina — Uber Eats prende il 30%, Glovo prende il 30%, Wolt prende il 30%. Gli ordini online tramite IQ Rest funzionano in modo completamente diverso. L'ordine va direttamente dal telefono dell'ospite alla tua dashboard, e tutto il margine è tuo.\n\nL'UX di ordinazione è progettata specificamente per l'uso in ristorante: gli ospiti scelgono un tavolo, sfogliano il tuo menu, aggiungono articoli al carrello, lasciano un commento per la cucina e inviano. Vedi i nuovi ordini in tempo reale sul telefono o sullo schermo della cucina, con numero del tavolo, articoli, modificatori e note. Marchi i piatti come pronti, il tavolo vede lo stato — e risparmi ai camerieri decine di viaggi per servizio.\n\nFunziona anche per asporto e pickup: gli ospiti scansionano l'adesivo QR vicino alla porta, fanno un ordine e pagano — non ti serve un'app di ordinazione separata, un sito separato o un progetto di integrazione Stripe.",
    benefitsHeading: "Perché l'ordine diretto tramite IQ Rest batte le app di delivery",
    benefits: [
      "Zero commissioni su ogni ordine — trattieni il 100% del fatturato",
      "Gli ordini volano nella tua dashboard con numero del tavolo in tempo reale",
      "Niente app per gli ospiti — scansionano il tuo QR e ordinano nel browser",
      "Modificatori, commenti, note dietetiche — tutto catturato in modo pulito",
      "Funziona per sala, asporto e pickup — un menu, tre flussi",
      "Suggerimenti di upsell integrati aumentano il valore medio dell'ordine",
    ],
  },

  pricing: {
    heading: "Un solo piano.",
    headingAccent: "Zero commissioni.",
    sub: "Ordini diretti, menu QR, sito web ristorante e prenotazioni — tutto incluso. Niente costi per ordine, nessun progetto di integrazione Stripe.",
  },

  faq: {
    sub: "Tutto quello che i ristoratori chiedono sugli ordini online. Non vedi la tua domanda? Scrivici su WhatsApp — rispondono persone vere.",
    items: [
      {
        q: "Prendete una commissione sugli ordini?",
        a: "Zero. Ogni ordine dal tuo menu QR va direttamente a te — nessuna fetta per noi, nessuna fee Glovo / Uber Eats. Un solo abbonamento mensile fisso, basta. La matematica è semplice: se fai 5.000 €/mese di ordini sulle app di delivery, perdi 1.500 €. Passa agli ordini diretti e quei 1.500 € restano in tasca tua.",
      },
      {
        q: "Come fanno gli ospiti a fare un ordine — serve un'app?",
        a: "Niente app. Gli ospiti scansionano il tuo codice QR con la fotocamera del telefono, il menu si apre nel browser, scelgono il tavolo, sfogliano, aggiungono al carrello e inviano. Tutto il flusso si fa in due tap dopo la scansione. Niente ricerca App Store, nessuna registrazione, nessun attrito.",
      },
      {
        q: "Come ricevo gli ordini in cucina?",
        a: "Gli ordini compaiono all'istante nella tua dashboard, con numero del tavolo, articoli, modificatori e note. Vedili sul telefono, su un tablet al pass o su uno schermo in cucina. Marchi gli articoli come pronti e il tavolo vede lo stato — meno chiamate « arriva il mio cibo? », rotazione più veloce.",
      },
      {
        q: "Gli ospiti possono pagare tramite il menu QR o solo al tavolo?",
        a: "Entrambi. Possono inviare e pagare in contanti o carta al tavolo nel modo classico, o pagare online con Stripe direttamente dal menu. Decidi tu cosa è abilitato. Il pagamento online è protetto da Stripe — IQ Rest non trattiene mai i soldi, vanno direttamente sul tuo conto Stripe.",
      },
      {
        q: "Funziona per asporto e pickup, non solo in sala?",
        a: "Sì. Attacca un adesivo QR all'ingresso per l'asporto, o condividi il link del tuo menu su Instagram e WhatsApp. Gli ospiti scelgono « pickup », ordinano, pagano — tu prepari, loro ritirano. Stesso sistema, tre flussi di ordinazione diversi: sala, asporto, pickup.",
      },
    ],
  },

  finalCta: {
    heading: "Smetti di nutrire le app di delivery.",
    headingAccent: "Inizia a tenere il 100%.",
    sub: "Sostituisci le tue commissioni del 30% con un canone mensile fisso. 14 giorni di prova gratuita. Senza carta. Disdici in qualsiasi momento.",
  },
};
