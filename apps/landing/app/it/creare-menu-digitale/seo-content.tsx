import { Check } from "lucide-react";
import { Breadcrumb } from "@/app/_landing/components/breadcrumb";

const BENEFITS = [
  "Pronto in 5 minuti, non in settimane",
  "Costo fisso 6,90€/mese, niente preventivi",
  "Modifiche istantanee, senza tecnici esterni",
  "Importazione IA dal menu cartaceo o PDF",
  "QR Code generato e stampabile in un clic",
  "Traduzione automatica in 35 lingue",
  "Indipendenza totale dall'agenzia o dal grafico",
  "Foto, allergeni, varianti, prezzi flessibili",
];

const CREATE_STEPS = [
  {
    title: "Registrati e scegli il tipo di locale",
    desc: "30 secondi: nome del ristorante, email o accesso con Google. L'editor è già pronto.",
  },
  {
    title: "Importa o crea il menu",
    desc: "Carica una foto del menu cartaceo: l'IA lo digitalizza in 60 secondi. Oppure aggiungi piatti uno per uno con drag-and-drop.",
  },
  {
    title: "Personalizza foto, colori, lingue",
    desc: "Carica le foto dei piatti, scegli i colori del brand e attiva la traduzione automatica nelle lingue dei tuoi clienti.",
  },
  {
    title: "Pubblica e stampa il QR Code",
    desc: "Scarica il QR Code in PDF o PNG, stampalo per i tavoli. I clienti scansionano, ordinano direttamente, ricevi tutto in dashboard.",
  },
];

const COMPARISON_ROWS = [
  ["Tempo di realizzazione", "2-6 settimane", "1-3 giorni", "5 minuti"],
  ["Costo iniziale", "700-2.500€", "Gratis con limiti", "0€ (14 giorni gratis)"],
  ["Costo ricorrente", "Manutenzione a ore", "10-30€/mese", "6,90€/mese"],
  ["Competenze richieste", "Nessuna (delega)", "Editing template", "Nessuna"],
  ["Modifiche al menu", "Dipendi dall'agenzia", "Sì, ma manuale", "Istantanee, dal telefono"],
  ["QR Code stampabile", "A richiesta, extra", "Da generare a parte", "Incluso, automatico"],
  ["Traduzione 35 lingue", "Preventivo separato", "No / manuale", "Inclusa, IA"],
  ["Ordini integrati", "Sviluppo extra", "Plugin a parte", "Inclusi, zero commissioni"],
];

export function SeoContent() {
  return (
    <section data-section="seo-content" className="scroll-mt-16 pt-4 sm:pt-6 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          className="mb-6 justify-center lg:justify-start flex"
          items={[
            { label: "IQ Rest", href: "/it" },
            { label: "Creare Menu Digitale per Ristoranti" },
          ]}
        />
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
          Approfondimento
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {"Come creare un menu digitale "}
          <span className="text-muted-foreground">per il tuo ristorante?</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">
          Editor mobile, importazione IA dal cartaceo, QR Code automatico —
          tutto in 5 minuti, senza agenzie.
        </p>

        <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed mb-20">
          <p>
            <strong>Creare un menu digitale</strong> per un ristorante negli
            anni 2020 non significa più contattare un&apos;agenzia, ricevere un
            preventivo di 1.500€ e aspettare quattro settimane. Significa
            aprire la dashboard dal telefono, importare il menu cartaceo
            esistente (l&apos;IA lo digitalizza in un minuto) e ricevere il QR
            Code stampabile per i tavoli prima del prossimo servizio.
          </p>
          <p>
            Lo stesso processo serve per <strong>creare il QR Code menu</strong>
            : non è un&apos;operazione separata. Quando crei il menu digitale, la
            piattaforma genera automaticamente il QR Code univoco, pronto da
            scaricare in PDF o PNG ad alta risoluzione. Stampi, applichi ai
            tavoli, finito. Il ristoratore non ha mai bisogno di toccare un
            programma di grafica.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Vantaggi di creare il menu digitale da soli
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

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            I 4 passi per creare il menu digitale (e il QR Code)
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center lg:text-start">
            Lo stesso flusso permette di creare sia il menu digitale che il QR
            Code menu del ristorante. Tempo totale: meno di 5 minuti dal
            telefono.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {CREATE_STEPS.map((s, i) => (
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

        <div>
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Creare con agenzia, template generico o IQ Rest: cosa cambia
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Caratteristica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Agenzia
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Template generico
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    IQ Rest editor
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
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center lg:text-start">
            Creare il menu digitale con un editor specializzato per ristoranti
            costa meno di un&apos;agenzia, è più veloce di un template generico
            (che comunque non gestisce ordini né QR) e lascia il ristoratore
            completamente autonomo.
          </p>
        </div>
      </div>
    </section>
  );
}
