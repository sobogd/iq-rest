import { Check } from "lucide-react";

const BENEFITS = [
  "Zero costi di stampa e ristampa",
  "Aggiornamento prezzi in tempo reale",
  "Supporto a 35 lingue con traduzione IA",
  "Foto dei piatti e descrizioni dettagliate",
  "Ordini diretti senza commissioni",
  "Prenotazioni tavolo integrate 24/7",
  "Gestione allergeni e varianti",
  "Analytics: piatti più visti e ordinati",
];

const COMPARISON_ROWS = [
  ["Aggiornamento prezzi", "Lento (ricarica file)", "Lento", "In tempo reale"],
  ["Multilingue", "No", "No", "35 lingue con IA"],
  ["Ordini diretti", "No", "No", "Sì, senza commissioni"],
  ["Filtri allergeni", "No", "No", "Sì"],
  ["Analytics", "No", "No", "Piatti più visti e ordinati"],
];

export function SeoContent() {
  return (
    <section data-section="seo-content" className="scroll-mt-16 pt-4 sm:pt-6 pb-16">
      <div className="container mx-auto px-4">
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
          Approfondimento
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {"Cos'è un menu digitale "}
          <span className="text-muted-foreground">per ristoranti?</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">
          La versione online del menu cartaceo — più veloce, multilingue e con
          ordini integrati.
        </p>

        <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed mb-20">
          <p>
            Un <strong>menu digitale per ristoranti</strong> è la versione online
            del menu cartaceo, accessibile dal telefono del cliente tramite un{" "}
            <strong>QR Code</strong> stampato sul tavolo o tramite un link
            diretto. Il cliente inquadra il codice con la fotocamera, il menu
            digitale si apre nel browser e mostra piatti, foto, prezzi, allergeni
            e descrizioni tradotte nella sua lingua. Niente app da scaricare,
            niente PDF pesanti.
          </p>
          <p>
            A differenza di un PDF, il menu digitale online si aggiorna in tempo
            reale: cambi un prezzo, attivi una stop-list o aggiungi un piatto dal
            telefono, e i clienti vedono la modifica immediatamente. Per il
            ristorante significa zero ristampe, controllo totale e — con la
            piattaforma giusta — anche ordini diretti senza commissioni di
            delivery.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Vantaggi del menu digitale online
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
            Come funziona il menu digitale del ristorante
          </h3>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              Il ristoratore crea il menu digitale dalla dashboard: aggiunge le
              categorie (antipasti, primi, secondi, dolci, bevande), inserisce i
              piatti con nome, prezzo, foto e allergeni, e personalizza i colori
              del brand. La piattaforma genera automaticamente un QR Code
              stampabile per ogni tavolo o uno unico per tutto il locale.
            </p>
            <p>
              Quando il cliente scansiona il QR, il menu digitale online si apre
              nel browser, con possibilità di filtrare per allergeni, vedere le
              foto in alta risoluzione, leggere le descrizioni nella propria
              lingua e aggiungere i piatti al carrello. L&apos;ordine arriva al
              ristorante via WhatsApp o nella dashboard con il numero del tavolo,
              pronto per essere preparato in cucina.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Differenza tra menu digitale, menu QR e menu PDF
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Caratteristica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Menu PDF
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    QR statico
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    Menu digitale
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
            Un menu digitale vero non è un PDF dietro un QR Code: è un sito web
            intelligente, pensato per il ristorante, che riduce i costi operativi
            e aumenta lo scontrino medio — soprattutto con i turisti.
          </p>
        </div>
      </div>
    </section>
  );
}
