import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Menu ristorante brandizzato — Schema colori e tema personalizzati",
    description:
      "Allinea il tuo brand ristorante con colori d'accento personalizzati. Temi chiaro e scuro si cambiano automaticamente con il telefono dell'ospite. Menu QR brandizzato in pochi secondi. 14 giorni di prova.",
    canonical: "https://iq-rest.com/it/color-scheme",
    ogLocale: "it_IT",
    ogTitle: "Schema colori personalizzato — Menu ristorante brandizzato in pochi secondi",
    ogDescription:
      "Scegli il tuo colore d'accento, ottieni un menu ristorante brandizzato. Modalità auto chiara/scura si adatta al telefono di ogni ospite. Niente strumenti di design.",
  },

  hero: {
    title: "Il tuo menu. I tuoi colori. Il tuo brand.",
    subtitle:
      "Scegli un colore d'accento, metti il tuo logo, e il tuo menu QR sembra istantaneamente un vero brand invece di un template. Temi chiaro e scuro si cambiano automaticamente con il telefono di ogni ospite — il tuo menu sembra sempre voluto.",
    trustLine: "500+ ristoranti in 30+ paesi",
  },

  seo: {
    description:
      "Uno schema colori personalizzato è la differenza tra un menu QR generico e un'esperienza ristorante brandizzata. IQ Rest ti permette di scegliere il tuo colore d'accento esatto (o incollare un codice hex dalle linee guida del tuo brand), mettere il tuo logo, e tutto il menu — pulsanti, link, evidenziazioni, etichette di categoria — adotta il colore del tuo brand in pochi secondi.",
    fullDescription:
      "La maggior parte dei costruttori di menu QR ti dà uno schema colori fisso: blu o rosso, prendere o lasciare. IQ Rest tratta il tuo brand come se contasse — scegli qualsiasi colore d'accento da un selettore di colori o incolla il tuo codice hex esatto dalle linee guida del brand (lo stesso arancione della tua insegna, lo stesso verde del tuo logo). Ogni accento del menu — pulsanti primari, link, evidenziazioni di categoria, lo stato attivo nel tuo selettore di lingua — adotta quel colore all'istante.\n\nLe modalità chiara e scura sono gestite automaticamente. Quando il telefono di un ospite è in modalità scura (la maggior parte dei telefoni a cena), il tuo menu si mostra in modalità scura con il tuo colore d'accento accentuato. Quando sono fuori sotto il sole intenso in modalità chiara, il menu si adatta. Tu non scegli chiaro o scuro — scegli un colore di brand, e il menu fa la cosa giusta su ogni dispositivo.\n\nIl tuo logo sta in alto al menu, sul template di stampa dell'adesivo QR, sullo scontrino dell'ordine e sull'email di conferma della prenotazione. Ogni punto di contatto con l'ospite sembra lo stesso brand perché è lo stesso brand. Niente designer richiesto, nessuna sessione Photoshop, nessun costoso « pacchetto di branding per ristorante » — solo un selettore di colori e un upload del logo.",
    benefitsHeading: "Perché uno schema colori brandizzato converte meglio di un tema di default",
    benefits: [
      "Scegli qualsiasi colore d'accento — selettore di colori o incolla un codice hex",
      "Modalità auto chiara/scura che si adatta al telefono di ogni ospite",
      "Posizionamento del logo su menu, adesivo QR, scontrini e email",
      "Look brandizzato dal primo minuto — niente Photoshop o designer",
      "Cambia colori in qualsiasi momento per promo stagionali (rosso San Valentino, verde Natale)",
      "Il colore resta accessibile — i rapporti di contrasto si auto-aggiustano per la leggibilità",
    ],
  },

  pricing: {
    heading: "Un solo piano.",
    headingAccent: "I colori del tuo brand.",
    sub: "Schema colori personalizzato più menu QR, ordini online, traduzione AI e prenotazioni — tutto in un prezzo fisso. Branding senza designer.",
  },

  faq: {
    sub: "Tutto quello che i ristoratori chiedono sul branding del menu. Non vedi la tua domanda? Scrivici su WhatsApp — rispondono persone vere.",
    items: [
      {
        q: "Posso abbinare il colore esatto del mio brand dal logo o dall'insegna?",
        a: "Sì — incolla il tuo codice hex esatto (es. #C24A2D) e il menu usa quel colore esatto per ogni accento. Auto-generiamo una sfumatura più scura per gli stati hover e una sfumatura più chiara per gli sfondi, così un singolo colore di brand ottiene una palette UI completa senza che tu faccia nulla.",
      },
      {
        q: "Il menu supporta modalità chiara e scura?",
        a: "Sì, automaticamente. Il menu rileva il tema del telefono di ogni ospite e cambia tra modalità chiara e scura in tempo reale. Il tuo colore d'accento resta lo stesso; l'UI circostante si inverte. La maggior parte dei ristoranti non imposta mai chiaro vs scuro — scelgono un colore e lasciano che il menu si adatti.",
      },
      {
        q: "Posso cambiare lo schema colori più tardi?",
        a: "In qualsiasi momento. Apri le impostazioni di design, scegli un nuovo colore, salva. Ogni pagina del tuo menu QR, del flusso di prenotazione e dell'UI di ordinazione si aggiorna in pochi secondi. Utile per promozioni stagionali (rosso per San Valentino, verde per Natale, oro per Capodanno) — cambi per una settimana, cambi indietro.",
      },
      {
        q: "Dove appare il mio logo?",
        a: "In alto al tuo menu QR (accanto al nome del tuo ristorante), sul template di stampa dell'adesivo con il codice QR (così l'adesivo sui tavoli si abbina al tuo brand), sugli scontrini di conferma ordine e nelle email di conferma prenotazione. Caricalo una volta in PNG o SVG, è usato ovunque automaticamente.",
      },
      {
        q: "E se il colore del mio brand è difficile da leggere sullo sfondo del menu?",
        a: "Il sistema controlla automaticamente il contrasto e scurisce o schiarisce delicatamente il tuo colore per i casi d'uso testuali (così un colore di brand giallo pallido non appare come testo illeggibile), mantenendo il tuo colore esatto per accenti come pulsanti ed evidenziazioni. Non devi pensare al WCAG — il menu lo fa per te.",
      },
    ],
  },

  finalCta: {
    heading: "Scegli un colore.",
    headingAccent: "Sembra un vero brand.",
    sub: "Schema colori personalizzato, scontrini brandizzati, modalità auto chiara/scura. 14 giorni di prova gratuita, senza designer, senza carta.",
  },
};
