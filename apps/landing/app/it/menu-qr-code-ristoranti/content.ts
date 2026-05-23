import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "it",
  slug: "menu-qr-code-ristoranti",
  trackPrefix: "l_it_qr",

  meta: {
    title: "Menù QR code per ristoranti | IQ Rest",
    description:
      "Menù con QR code per ristoranti: l'ospite inquadra il codice sul tavolo, apre la carta nel browser, ordina nella sua lingua. 14 giorni gratis, senza carta.",
    canonical: "https://iq-rest.com/it/menu-qr-code-ristoranti",
    ogLocale: "it_IT",
    ogTitle: "Menù QR code per ristoranti",
    ogDescription:
      "QR code sul tavolo, menu nel browser dell'ospite — foto, allergeni, 35 lingue e aggiornamento in tempo reale.",
    brandLine: "IQ Rest — Menù QR code per ristoranti",
  },

  hero: {
    headline: "Menù QR code per ristoranti.",
    sub: "L'ospite inquadra il QR code sul tavolo e apre subito la carta nel browser del cellulare: foto dei piatti, allergeni, prezzi sempre aggiornati e traduzione automatica in 35 lingue. Niente app da scaricare, niente menu cartacei da ristampare a ogni cambio prezzo.",
  },

  scan: {
    heading: "Hai già un menu cartaceo o un PDF?",
    headingAccent: "L'IA lo converte in QR code in 60 secondi.",
    sub: "Carica una foto della carta o il file PDF — l'IA estrae categorie, piatti e prezzi e li collega subito al menu del QR code.",
    cta: "Crea il menu QR",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "QR menu anche senza foto",
      heading: "Il menu QR resta elegante anche senza foto di ogni piatto.",
      body: "Non sempre è possibile fotografare tutti i piatti — soprattutto in cucine stagionali. IQ Rest dispone le card del menu QR in modo coerente: piatti con immagine e piatti solo testo convivono nello stesso layout pulito, senza spazi vuoti o disallineamenti.",
      bullets: [
        "Le card senza foto restano leggibili e ordinate.",
        "La tipografia si adatta al contenuto della singola card.",
        "Mix di piatti con e senza foto senza compromettere il design.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Due cellulari su un tavolo che mostrano lo stesso menu QR: una versione con foto dei piatti e una solo testuale" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeni nel QR menu",
      heading: "Allergeni ed etichette dietetiche dentro il menù QR.",
      body: "Ogni piatto del menù collegato al QR code può portare le etichette di glutine, lattosio, frutta a guscio, frutti di mare, opzioni vegane e gluten-free. L'ospite filtra direttamente dal cellulare i piatti compatibili con le sue esigenze, senza chiedere allo staff.",
      bullets: [
        "14 categorie di allergeni gestite a livello di singolo piatto.",
        "Etichette vegan, vegetarian e gluten-free con un clic dal pannello.",
        "L'ospite filtra il menu QR in base alle proprie restrizioni.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "L'ospite filtra il menu QR per allergeni sul cellulare mentre il titolare aggiorna l'elenco da un tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Più di un semplice QR",
      heading: "Un menù QR code curato come il sito del ristorante.",
      body: "Dopo lo scan del codice, l'ospite non trova un PDF spoglio: vede una schermata di benvenuto con video o foto in primo piano, la descrizione del locale e una pagina contatti con mappa, telefoni e profili social. Il QR diventa la porta d'ingresso al ristorante online.",
      bullets: [
        "Video di sfondo o foto grande sulla schermata iniziale del menu QR.",
        "Spazio per raccontare il concept del locale e delle singole categorie.",
        "Pagina contatti integrata: mappa, telefono, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Due cellulari su un tavolino: schermata iniziale del menu QR con video di sfondo e pagina contatti con mappa" },
    },
    {
      icon: Languages,
      eyebrow: "Un QR, 35 lingue",
      heading: "Un solo QR code, il menù in 35 lingue.",
      body: "L'ospite scansiona il QR code e sceglie la propria lingua: la traduzione è gestita da un'IA con sensibilità gastronomica, non da un traduttore generico. Niente menu separati per turisti, niente fogli aggiuntivi sui tavoli.",
      bullets: [
        "Una sola stampa del QR copre 35 lingue, incluse nell'abbonamento.",
        "L'IA conosce il lessico culinario — i piatti suonano naturali in ogni lingua.",
        "L'ospite cambia lingua direttamente dal menu, senza riaprire il QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Due ospiti scansionano lo stesso QR code sul tavolo e leggono il menu in lingue diverse" },
    },
    {
      icon: Smartphone,
      eyebrow: "Pannello da cellulare",
      heading: "Aggiorni il menu QR dal cellulare, in tempo reale.",
      body: "Il pannello di gestione del menu QR si apre nel browser di cellulare, tablet o portatile. Cambi un prezzo, togli un piatto dalla stop list o aggiungi una proposta del giorno: gli ospiti che hanno il QR già aperto vedono la modifica in pochi secondi.",
      bullets: [
        "Nessuna app: il pannello vive nel browser, come il menu QR.",
        "Prezzi, foto e disponibilità modificabili dal telefono in sala.",
        "Il QR resta sempre lo stesso — è il menu collegato a cambiare.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Portatile e cellulare su un tavolino: lo stesso piatto del menu QR aggiornato in parallelo" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Ordini dal QR · opzionale",
      heading: "Dal QR code l'ospite può anche ordinare.",
      body: "Oltre alla consultazione, il menu QR può diventare un canale d'ordine: l'ospite aggiunge i piatti al carrello e invia la richiesta. L'ordine arriva al cameriere in sala, su WhatsApp o sul display di cucina. La funzione si attiva o disattiva nelle impostazioni quando serve.",
      bullets: [
        "Carrello, note e invio dell'ordine direttamente dallo scan del QR.",
        "L'ordine raggiunge subito sala, WhatsApp o display di cucina.",
        "Funzione attivabile per orari, sale o ristoranti specifici.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Due cellulari su un tavolo: carrello costruito dal menu QR e conferma dell'ordine inviato" },
    },
  ],

  faq: {
    sub: "Le domande più frequenti dei ristoratori sul menù con QR code di IQ Rest. Manca la tua domanda? Scrivici su WhatsApp.",
    items: [
      { q: "Come funziona il menù QR code di IQ Rest?", a: "Ogni tavolo ha un QR code stampato. L'ospite lo inquadra con la fotocamera del telefono, il browser apre il menu del ristorante — foto, descrizioni, allergeni e prezzi aggiornati. Non serve scaricare alcuna app, né per l'ospite né per lo staff." },
      { q: "Servono competenze tecniche per creare il menu QR?", a: "No. Il pannello funziona con clic e trascinamento, senza codice né configurazioni complesse. Aggiungere un piatto richiede pochi secondi: nome, prezzo, foto. La prima configurazione richiede di solito da 30 minuti a un'ora; se hai già un PDF del menu, l'IA lo converte automaticamente." },
      { q: "Gli ospiti devono installare un'app per leggere il QR?", a: "No. La fotocamera nativa di iPhone e Android riconosce il QR code in pochi secondi e apre direttamente il menu nel browser. Anche il pannello di amministrazione funziona da browser — cellulare, tablet o portatile." },
      { q: "Come si stampano i QR per i tavoli?", a: "I QR code si generano automaticamente nel pannello (uno per tavolo o uno unico per il locale) e si scaricano in PDF pronti per la stampa. Bastano una stampante da ufficio e un supporto: cavalletto, sticker, sottobicchiere." },
      { q: "Posso usare un dominio personalizzato per il menu QR?", a: "Sì. Supportiamo un dominio del ristorante con certificato SSL (per esempio menu.tuoristorante.it): quando l'ospite scansiona il QR vede l'indirizzo del locale anziché un sottodominio generico. La configurazione DNS richiede 5–10 minuti e ti seguiamo passo passo." },
      { q: "Posso gestire i QR di più ristoranti da un unico account?", a: "Sì, su richiesta. Un solo account può raccogliere più locali, ciascuno con i propri QR code, menu, design e statistiche. Scrivici su WhatsApp e attiviamo la modalità multiristorante." },
      { q: "Quanto è complicato lanciare il menu QR da zero?", a: "Tre passaggi: (1) crea le categorie; (2) inserisci i piatti con nome, prezzo e foto; (3) stampa i QR e mettili sui tavoli. Se hai già un menu cartaceo o un PDF, caricalo: l'IA riconosce categorie e prezzi e popola le card. Un menu base è pronto in 5 minuti." },
    ],
  },
};
