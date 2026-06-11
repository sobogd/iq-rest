import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "it",
  slug: "prenotazione-tavoli",
  trackPrefix: "l_it_bookings",

  meta: {
    title: "Prenotazione tavoli 24/7 per ristoranti | IQ Rest",
    description:
      "Prenotazione tavoli 24/7 per ristoranti: gli ospiti prenotano da soli dal menu QR o dal sito. Calendario per tavolo, conferme automatiche e promemoria. Nessun cliente perso. 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/prenotazione-tavoli",
    ogLocale: "it_IT",
    ogTitle: "Prenotazione tavoli 24/7 — gli ospiti prenotano da soli",
    ogDescription:
      "Gli ospiti prenotano il tavolo dal menu QR o dal sito. Calendario, conferme automatiche, promemoria. Nessun cliente perso.",
    brandLine: "IQ Rest — Prenotazione tavoli per ristoranti",
  },

  hero: {
    headline: "Prenotazione tavoli 24/7 — gli ospiti prenotano da soli.",
    cta: "Configura le prenotazioni",
    sub: "Gli ospiti prenotano dal menu QR o da un link diretto. Calendario per tavolo, conferme automatiche e promemoria. Nessun cliente perso e nessuna telefonata nelle ore di punta.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostess gestisce le prenotazioni da un tablet all'ingresso del ristorante",
  },

  scan: {
    heading: "Attiva le prenotazioni dei tavoli",
    headingAccent: "in 5 minuti.",
    sub: "Collega il calendario, aggiungi i tavoli con foto e capienza — gli ospiti iniziano a prenotare lo stesso giorno.",
    cta: "Attiva le prenotazioni",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Modulo di prenotazione",
      heading: "Gli ospiti prenotano da soli — per data, ora e numero di persone.",
      body: "L'ospite apre il menu QR o un link diretto, sceglie data, ora e numero di persone — e vede subito i tavoli disponibili: con foto, descrizione (terrazza, vicino alla finestra, divano del bar) e capienza. La conferma viene inviata in automatico via email e WhatsApp.",
      bullets: [
        "Scelta del tavolo per foto, descrizione e capienza.",
        "Conferma automatica e promemoria un'ora prima della visita.",
        "Minimi campi nel modulo: nome, telefono, numero di persone.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Ospite prenota un tavolo dal cellulare: data, ora, numero di persone e scelta del tavolo" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Calendario delle prenotazioni",
      heading: "Calendario per giorni e tavoli — tutto in un'unica vista.",
      body: "Nel pannello di amministrazione il calendario delle prenotazioni è suddiviso per tavolo, giorno, settimana e mese. Slot liberi, tavoli occupati, prenotazioni confermate e in attesa di conferma — tutto in un'unica schermata. Funziona su tablet in sala e su portatile in ufficio.",
      bullets: [
        "Viste per giorno, settimana e mese.",
        "Dettaglio per tavolo: chi, quando e in quanti.",
        "Sposta, annulla o conferma una prenotazione con un solo tocco dal cellulare.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Calendario delle prenotazioni nel pannello di IQ Rest su due tablet: vista giornaliera per tavoli e vista mensile" },
    },
  ],

  faq: {
    sub: "Cosa chiedono i ristoratori sulla prenotazione dei tavoli in IQ Rest. Non trovi la tua domanda? Scrivici su WhatsApp.",
    items: [
      { q: "Posso scegliere i giorni e gli orari in cui sono possibili le prenotazioni?", a: "Sì. Dal pannello imposti gli orari di apertura e i giorni della settimana disponibili — il sistema non mostra agli ospiti gli slot non disponibili. Puoi anche chiudere una singola data (evento aziendale, prenotazione privata) o disattivare temporaneamente l'intero calendario." },
      { q: "Posso caricare una foto per ogni tavolo?", a: "Sì. Ogni tavolo può avere foto, descrizione (terrazza, vicino alla finestra, divano del bar) e capienza. L'ospite vede esattamente quale tavolo sta prenotando e sceglie con cognizione di causa — questo riduce le aspettative deluse." },
      { q: "Posso disattivare le prenotazioni in date specifiche?", a: "Sì. Dal calendario puoi chiudere date specifiche (feste, eventi privati, lavori) o interi giorni della settimana. In quelle date gli ospiti vedranno un messaggio «prenotazioni temporaneamente non disponibili»." },
      { q: "Posso personalizzare quali dati raccogliere dall'ospite?", a: "Sì. Il set standard: nome, telefono, email, numero di persone. Puoi aggiungere campi personalizzati (occasione, allergie, richieste particolari) oppure rimuovere quelli non necessari per mantenere il modulo più corto possibile." },
      { q: "Posso limitare il numero di ospiti per tavolo?", a: "Sì. Ogni tavolo ha un parametro «capienza» — il sistema non permette di prenotare un tavolo da 2 per 6 persone. Sui tavoli più grandi puoi anche impostare un minimo, così i gruppi piccoli non occupano un tavolo da otto quando servirebbe per gruppi più numerosi." },
      { q: "È facile configurare il sistema?", a: "La configurazione richiede poco tempo. Tre passaggi: (1) aggiungi i tavoli con nome, foto e capienza, (2) attiva la modalità prenotazioni nelle impostazioni, (3) condividi il link o il QR con gli ospiti. L'attivazione completa richiede 5–10 minuti." },
      { q: "Posso usare il sistema sul mio dominio?", a: "Sì. Supportiamo un dominio personalizzato con certificato SSL: gli ospiti prenotano all'indirizzo del tuo ristorante (ad esempio, prenotazioni.tuoristorante.com). Ti aiutiamo con la configurazione DNS; di solito richiede 5–10 minuti." },
      { q: "Posso impostare la conferma automatica o manuale?", a: "Sì, la modalità si sceglie nelle impostazioni. Con la conferma automatica l'ospite riceve la conferma subito dopo aver inviato il modulo e la prenotazione è considerata accettata. Con la conferma manuale la richiesta arriva nel pannello con stato «in attesa di conferma» — il responsabile la rivede e la conferma o la rifiuta. La modalità manuale è utile con pochi tavoli o con una politica di accoglienza particolare." },
      { q: "Prendete una commissione su ogni prenotazione?", a: "No. La prenotazione dei tavoli è completamente inclusa nel piano Pro — nessuna percentuale sugli ospiti, nessun costo per slot e nessuna commissione da aggregatore. Una sola tariffa mensile fissa e prenotazioni illimitate." },
    ],
  },
};
