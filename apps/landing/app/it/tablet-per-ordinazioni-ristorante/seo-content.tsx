import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR per tavolo, scansiona e ordina, nessuna app da installare",
  "Ordini in tempo reale sul tablet di cucina o del responsabile",
  "O instradati al WhatsApp del ristorante — scegli tu",
  "Modificatori, varianti e allergeni arrivano nella comanda",
  "Commento libero del cliente su ogni ordine",
  "Numerazione giornaliera per la cucina",
  "Checkout multilingue in 35 lingue, riconosciuto dal telefono del cliente",
  "Zero commissioni per ordine — abbonamento mensile fisso",
];

const HOW_STEPS = [
  {
    title: "Attiva gli ordini sul ristorante",
    desc: "Apri le impostazioni del ristorante, attiva l'interruttore Ordini attivi e scegli quali dati del cliente (nome, telefono, indirizzo) raccogliere.",
  },
  {
    title: "Scegli il canale di consegna",
    desc: "La modalità interna invia i nuovi ordini alla scheda Cucina del pannello. La modalità WhatsApp li manda come messaggio formattato al WhatsApp del locale. O usa entrambe insieme.",
  },
  {
    title: "Stampa e applica i QR",
    desc: "Scarica il QR (uno per tavolo o uno per tutto il locale) in PDF o PNG e applicalo sui tavoli. I clienti scansionano con la fotocamera nativa — niente app store, niente attriti.",
  },
  {
    title: "Gestisci il servizio",
    desc: "Le comande appaiono nella scheda Cucina con numero del tavolo, piatti, varianti, allergeni, commento e numero del giorno. Le sposti tra nuovo → in lavorazione → completato. Il browser del cliente si aggiorna in tempo reale.",
  },
];

const COMPARISON_ROWS = [
  ["Commissione per ordine", "20–30%", "0%", "0% (€6,90/mese fisso)"],
  ["Destinazione ordine", "App dell'aggregatore", "La tua cassa", "Il tuo tablet di cucina o WhatsApp"],
  ["Numero tavolo sulla comanda", "No", "Manuale", "Sì, automatico"],
  ["Modificatori / varianti", "Limitati", "Sì", "Sì, con allergeni"],
  ["Checkout multilingue", "Lingua della loro app", "No", "35 lingue, automatico"],
  ["Hardware necessario", "Tablet dell'aggregatore", "Terminale POS", "Qualsiasi tablet con browser"],
  ["Tempo di configurazione", "Call di onboarding", "Giorni–settimane", "5 minuti"],
];

export function SeoContent() {
  return (
    <>
      <Section noContainer dataSection="seo-intro">
        <div className="w-full">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-start">
            In dettaglio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-start">
            Cos'è davvero un tablet per ordinazioni ristorante{" "}
            <span className="text-muted-foreground">in IQ Rest</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-start">
            Non un marketplace. Non un aggregatore di delivery. Una linea
            diretta dal telefono del cliente seduto al tuo tavolo al tuo
            tablet di cucina — o al tuo WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              Un <strong>tablet per ordinazioni ristorante</strong> per IQ Rest
              è il software che permette al cliente seduto a uno dei tuoi
              tavoli di aprire il menu sul telefono, comporre un carrello e
              inviare l'ordine alla tua cucina — senza coinvolgere Uber Eats,
              Glovo, Wolt o qualsiasi altro marketplace. Il cliente non lascia
              mai il tuo menu QR, tu non paghi commissioni per ordine, e la
              comanda arriva con il numero del tavolo reale.
            </p>
            <p>
              IQ Rest è costruito su due canali di consegna. Quella di
              default, <em>modalità interna</em>, invia ogni nuovo ordine alla
              scheda Cucina del pannello sul tablet, telefono o portatile che
              tieni al pass — mostra il numero del tavolo, i piatti con le
              loro varianti e allergeni, il commento libero del cliente e un
              numero d'ordine giornaliero per la cucina. L'alternativa,
              <em> modalità WhatsApp</em>, formatta lo stesso ordine come
              messaggio e lo invia al WhatsApp del ristorante — utile quando
              hai un team piccolo, quando l'ordinazione è per lo più asporto o
              quando il responsabile è fuori. Entrambe le modalità possono
              essere attive insieme.
            </p>
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-benefits">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Cosa ottieni davvero
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {BENEFITS.map((b) => (
              <div
                key={b}
                className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-snug">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-how">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Come funziona il flusso ordini di IQ Rest
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-start">
            Quattro interruttori nel pannello e sei live. Niente installatore,
            niente hardware POS, niente progetto di integrazione.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {HOW_STEPS.map((s, i) => (
              <div
                key={s.title}
                className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4"
              >
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-semibold tracking-tight mb-1">
                    {s.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-table">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Aggregatore, POS classico o tablet per ordinazioni ristorante
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Caratteristica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Aggregatore delivery
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    POS classico
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    Ordini IQ Rest
                  </th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={
                      i < COMPARISON_ROWS.length - 1
                        ? "border-b border-border/50"
                        : ""
                    }
                  >
                    <td className="py-3 pr-3 font-medium">{row[0]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[1]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[2]}</td>
                    <td className="py-3 text-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-start">
            Un sistema di ordinazioni che il ristorante controlla davvero si
            ripaga il primo weekend — ogni euro che il cliente spende nel tuo
            locale resta nel tuo locale, e la comanda al pass porta sempre il
            numero del tavolo reale.
          </p>
        </div>
      </Section>
    </>
  );
}
