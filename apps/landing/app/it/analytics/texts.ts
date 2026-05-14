import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analytics menu ristorante — Scansioni QR, top piatti, lingue dei turisti",
    description:
      "Vedi esattamente come gli ospiti usano il tuo menu QR. Scansioni giornaliere, piatti più visualizzati, preferenze linguistiche, ore di punta. Decisioni data-driven per il tuo ristorante.",
    canonical: "https://iq-rest.com/it/analytics",
    ogLocale: "it_IT",
    ogTitle: "Analytics ristorante — Traccia scansioni di menu QR, piatti e lingue",
    ogDescription:
      "Sappi quali piatti i tuoi ospiti guardano davvero, quando sono le ore di punta e quale nazionalità di turista è nella tua sala stasera. 14 giorni di prova gratuita.",
  },

  hero: {
    title: "Smetti di indovinare. Sappi cosa fanno davvero gli ospiti.",
    subtitle:
      "Vedi le analytics del menu del ristorante in tempo reale — scansioni QR per ora, i piatti su cui gli ospiti si soffermano, le lingue che usano i turisti, il giorno feriale più lento — e usa quei dati per stampare meno menu, programmare più intelligentemente, spingere le specialità giuste.",
    trustLine: "500+ ristoranti in 30+ paesi",
  },

  seo: {
    description:
      "Analytics ristorante che non richiedono un team di dati. IQ Rest traccia ogni scansione, visualizzazione, cambio di lingua e ordine dal tuo menu QR, e fa emergere i pattern che contano: piatti più visualizzati, ore di punta delle scansioni, giorno più impegnato della settimana, distribuzione linguistica della tua clientela turistica. Prendi decisioni data-driven senza mai aprire un foglio di calcolo.",
    fullDescription:
      "La maggior parte dei ristoranti va a istinto — « ci sembra che il martedì sia lento », « credo che la pasta venda bene ». L'istinto va bene, ma i dati vanno meglio. IQ Rest traccia ogni interazione con il tuo menu QR così non devi indovinare: quante volte il tuo QR è stato scansionato oggi, quali piatti gli ospiti hanno guardato più a lungo, quali piatti hanno aggiunto al carrello ma non hanno ordinato, quale lingua hanno usato i turisti.\n\nLa dashboard di analytics fa emergere le risposte in tre viste: oggi (scansioni live, ordini correnti, cosa si sta ordinando ora), questa settimana (top 10 piatti, ore impegnate, distribuzione linguistica, no-show sulle prenotazioni) e tendenze (crescita mese su mese, stagionalità, pattern feriali). Puoi entrare nel dettaglio di ogni piatto per vedere quanto spesso è visualizzato vs ordinato (un piatto visualizzato 200 volte ma ordinato 5 ha un problema di copy o di foto), o di ogni lingua per vedere che mix turistico stai davvero servendo.\n\nL'obiettivo sono le decisioni, non le dashboard: « il prossimo martedì è storicamente lento → lancia una push notification di happy hour », « i turisti italiani ordinano pasta 3 volte più dei locali → metti la pasta per prima quando lingua=it », « questo piatto ha tasso di visualizzazione del 90% ma tasso di ordine del 5% → migliora la foto ». Cambiamenti reali, fatturato reale, niente MBA richiesto.",
    benefitsHeading: "Perché i ristoranti amano le analytics IQ Rest rispetto a Google Analytics",
    benefits: [
      "Contatore live di scansioni QR — vedi la tua serata riempirsi in tempo reale",
      "Top piatti visualizzati e ordinati — individua cosa funziona e cosa no",
      "Distribuzione linguistica — sappi quali turisti sono nella tua sala",
      "Ore di punta e pattern feriali — programma più intelligentemente, prepara più intelligentemente",
      "Conversione visualizzazione-a-ordine per piatto — sistema foto brutte e descrizioni deboli",
      "Analytics di prenotazione — fonti di booking, tasso di no-show, mix di party-size",
    ],
  },

  pricing: {
    heading: "Un solo piano.",
    headingAccent: "Analytics complete incluse.",
    sub: "Analytics ristorante, ordinazione QR, traduzione AI e prenotazioni — tutto in un prezzo fisso. Niente tier premium per i dati, mai.",
  },

  faq: {
    sub: "Tutto quello che i ristoratori chiedono sulle analytics del menu. Non vedi la tua domanda? Scrivici su WhatsApp — rispondono persone vere.",
    items: [
      {
        q: "Cosa posso davvero vedere nella dashboard di analytics?",
        a: "Scansioni QR live (oggi, questa settimana, questo mese), piatti più visualizzati, piatti più ordinati, conversione visualizzazione-a-ordine per piatto, distribuzione linguistica degli ospiti, ore di punta per giorno della settimana, valore medio dell'ordine, tavoli più impegnati, tasso di no-show delle prenotazioni e tendenze nel tempo. Tutto su una dashboard, senza configurazione necessaria.",
      },
      {
        q: "Come uso questo per far davvero crescere il fatturato?",
        a: "Tre pattern funzionano per la maggior parte dei ristoranti: (1) riordinare il menu così i piatti che convertono meglio compaiono per primi; (2) sistemare la foto o la descrizione sui piatti con molte visualizzazioni ma pochi ordini; (3) spingere un happy-hour o uno speciale nei giorni/ore storicamente lenti. Abbiamo visto ristoranti aumentare il fatturato dei giorni feriali del 15–30% solo da questi tre cambiamenti.",
      },
      {
        q: "È anonimo o tracciate gli individui?",
        a: "Anonimo e aggregato. Tracciamo le visualizzazioni del menu e gli ordini per sessione, non per utente identificabile. Niente email, niente numeri di telefono, nessun indirizzo IP memorizzato a lungo termine. La dashboard ti mostra pattern (« 200 scansioni il venerdì »), non persone. Pienamente conforme al GDPR by design.",
      },
      {
        q: "Posso esportare i dati?",
        a: "Sì. Esporta qualsiasi vista come CSV (top piatti, scansioni giornaliere, distribuzione oraria, ecc.) e apri in Excel o Google Sheets. Utile per condividere con investitori, commercialisti, o per combinare con i dati POS.",
      },
      {
        q: "Mi serve qualche configurazione tecnica per avere le analytics?",
        a: "Zero. Le analytics sono attive di default dal momento in cui il tuo menu QR è online — ogni scansione, visualizzazione e ordine è tracciato automaticamente. La dashboard fa parte dell'abbonamento standard, non un upsell, e vedrai dati utili entro il tuo primo giorno di scansioni degli ospiti.",
      },
    ],
  },

  finalCta: {
    heading: "Smetti di indovinare.",
    headingAccent: "Inizia a misurare.",
    sub: "Analytics live di scansioni QR, top piatti, ore di punta, distribuzione linguistica dei turisti. 14 giorni di prova gratuita, senza carta.",
  },
};
