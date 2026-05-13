import { Check } from "lucide-react";
import { Breadcrumb } from "@/app/_landing/components/breadcrumb";

const BENEFITS = [
  "Igienico: nessun contatto fra tavoli",
  "Niente ristampe quando cambi un prezzo",
  "Foto ad alta risoluzione dei piatti",
  "Filtri per allergeni e preferenze",
  "Versione automatica nella lingua del cliente",
  "Ordini diretti dal tavolo, senza chiamare",
  "Analytics: piatti più visti e ordinati",
  "Aggiornamenti istantanei: stop-list, prezzi, novità",
];

const PRINT_OPTIONS = [
  {
    title: "Stand acrilico o in legno",
    desc: "Formato 8×12 cm con QR plastificato all'interno. Costo 2-4€ a tavolo, lo trovi in tipografia o su Amazon.",
  },
  {
    title: "Vetrofania o sticker",
    desc: "Applicato sul tavolo o sulla vetrata d'ingresso (utile anche per asporto). Resiste a graffi e detergenti.",
  },
  {
    title: "Stampa sul menu cartaceo",
    desc: "Se mantieni il menu fisico, aggiungi il QR sul retro. Il cliente sceglie come ordinare.",
  },
  {
    title: "Tovagliette personalizzate",
    desc: "QR Code stampato sulla tovaglietta usa-e-getta. Visivo, ma con costo ricorrente di stampa.",
  },
];

const COMPARISON_ROWS = [
  ["Costo iniziale per tavolo", "Basso (carta)", "Alto (1-3€/tag)", "Basso (carta)"],
  ["Compatibilità telefoni", "Tutti", "Solo recenti, con NFC", "Tutti"],
  ["Aggiornamento contenuto", "No (ri-stampa)", "Sì, ma re-programma tag", "Sì, istantaneo"],
  ["Foto, filtri, lingue", "No", "Dipende", "Sì, completi"],
  ["Ordini integrati", "No", "No", "Sì, con numero tavolo"],
  ["Durabilità", "Carta — limitata", "Tag fisico — fragile", "Carta o vetro — robusta"],
];

export function SeoContent() {
  return (
    <section data-section="seo-content" className="scroll-mt-16 pt-4 sm:pt-6 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          className="mb-6 justify-center lg:justify-start flex"
          items={[
            { label: "IQ Rest", href: "/it" },
            { label: "Menu QR Code per Ristoranti" },
          ]}
        />
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
          Approfondimento
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {"Cos'è un menu QR Code "}
          <span className="text-muted-foreground">per ristoranti?</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">
          Un codice scansionabile dal tavolo che apre il menu nel browser —
          senza app, senza PDF.
        </p>

        <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed mb-20">
          <p>
            Un <strong>menu QR Code</strong> è un codice grafico stampato sul
            tavolo (su carta plastificata, vetrofania, stand o sticker) che, una
            volta inquadrato con la fotocamera dello smartphone, apre
            direttamente il menu del ristorante nel browser del cliente. Niente
            app da scaricare, niente download di PDF: si scansiona, si legge, si
            ordina.
          </p>
          <p>
            Tecnicamente il QR Code contiene un URL: la qualità del menu dipende
            interamente da cosa c&apos;è dietro quell&apos;URL. Un PDF compresso? Un
            sito mobile lento? Un vero menu interattivo? La differenza tra un{" "}
            <strong>menu con QR Code</strong> mediocre e uno professionale sta
            tutta qui — cosa il cliente vede dopo lo scan.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Vantaggi del menu con QR Code rispetto al cartaceo
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
            Come stampare e applicare il QR Code ai tavoli
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center lg:text-start">
            Dalla dashboard di IQ Rest scarichi il QR Code in PDF o PNG ad alta
            risoluzione, vettoriale e pronto per la stampa. Le opzioni più
            comuni tra i ristoratori italiani:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {PRINT_OPTIONS.map((o) => (
              <div
                key={o.title}
                className="bg-muted/20 border border-border rounded-2xl p-5"
              >
                <div className="text-base sm:text-lg font-semibold tracking-tight mb-2">
                  {o.title}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center lg:text-start">
            Il QR Code generato da IQ Rest non scade e non cambia mai. Cambi
            prezzi, foto, descrizioni o aggiungi piatti — il QR stampato resta
            valido per sempre. Stampi una volta, paghi una volta.
          </p>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Differenza tra QR statico, NFC e menu QR completo
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Caratteristica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    QR statico
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    NFC tag
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    Menu QR completo
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
            Un menu QR Code completo costa meno dell&apos;NFC, funziona su tutti i
            telefoni e dà al ristoratore tutto quello che il QR statico non può
            offrire: aggiornamenti istantanei, ordini diretti e analytics.
          </p>
        </div>
      </div>
    </section>
  );
}
