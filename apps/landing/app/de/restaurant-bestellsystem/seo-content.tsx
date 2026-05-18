import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR pro Tisch, Scannen und Bestellen — keine App nötig",
  "Bestellungen landen in Echtzeit auf dem Küchen- oder Manager-Tablet",
  "Oder werden an die WhatsApp-Nummer des Restaurants geroutet — deine Wahl",
  "Modifikatoren, Varianten und Allergene erscheinen auf dem Bon",
  "Freier Gästekommentar auf jeder Bestellung",
  "Tägliche Nummerierung für die Küche",
  "Mehrsprachiger Checkout in 35 Sprachen, automatisch je Gäste-Handy",
  "Null Provision pro Bestellung — fixes Monatsabo",
];

const HOW_STEPS = [
  {
    title: "Bestellungen am Restaurant aktivieren",
    desc: "Öffne die Einstellungen des Restaurants, schalte den Schalter Bestellungen aktiv ein und wähle, welche Gästedaten (Name, Telefon, Adresse) du erfassen willst.",
  },
  {
    title: "Lieferkanal wählen",
    desc: "Der interne Modus sendet neue Bestellungen an den Küche-Tab des Dashboards. Der WhatsApp-Modus formatiert die Bestellung als Nachricht an die WhatsApp-Nummer des Lokals. Oder beide gleichzeitig.",
  },
  {
    title: "QR drucken und platzieren",
    desc: "Lade den QR (einen pro Tisch oder einen fürs ganze Lokal) als PDF oder PNG herunter und klebe ihn an die Tische. Gäste scannen mit der nativen Kamera — kein App Store, keine Hürde.",
  },
  {
    title: "Service fahren",
    desc: "Die Bestellungen erscheinen im Küche-Tab mit Tischnummer, Gerichten, Varianten, Allergenen, Kommentar und Tages-Nummer. Per Tap: neu → in Arbeit → fertig. Der Browser des Gastes aktualisiert sich in Echtzeit.",
  },
];

const COMPARISON_ROWS = [
  ["Provision pro Bestellung", "20–30 %", "0 %", "0 % (6,90€/Mo. fix)"],
  ["Bestellziel", "Aggregator-App", "Eigene Kasse", "Dein Küchen-Tablet oder WhatsApp"],
  ["Tischnummer auf Bon", "Nein", "Manuell", "Ja, automatisch"],
  ["Modifikatoren / Varianten", "Begrenzt", "Ja", "Ja, mit Allergenen"],
  ["Mehrsprachiger Checkout", "Sprache deren App", "Nein", "35 Sprachen, automatisch"],
  ["Hardware nötig", "Aggregator-Tablet", "POS-Terminal", "Jedes Tablet mit Browser"],
  ["Einrichtungszeit", "Onboarding-Call", "Tage–Wochen", "5 Minuten"],
];

export function SeoContent() {
  return (
    <>
      <Section noContainer dataSection="seo-intro">
        <div className="w-full">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-start">
            Im Detail
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-start">
            Was ein Restaurant Bestellsystem{" "}
            <span className="text-muted-foreground">wirklich ist</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-start">
            Kein Marktplatz. Kein Lieferaggregator. Eine direkte Linie vom
            Handy des Gastes an deinem Tisch zu deinem Küchen-Tablet — oder
            zu deinem WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              Ein <strong>Restaurant Bestellsystem</strong> im Sinne von
              IQ Rest ist die Software, mit der ein Gast an einem deiner
              Tische die Karte am Handy öffnet, einen Warenkorb baut und die
              Bestellung an deine Küche schickt — ohne Lieferando, Uber Eats,
              Wolt oder irgendeinen anderen Marktplatz. Der Gast verlässt nie
              deine QR-Karte, du zahlst keine Provision pro Bestellung, und
              der Bon trägt die echte Tischnummer.
            </p>
            <p>
              IQ Rest baut auf zwei Lieferkanälen. Standardmäßig der{" "}
              <em>interne Modus</em>: Jede neue Bestellung landet im
              Küche-Tab des Dashboards auf dem Tablet, Handy oder Laptop am
              Pass — mit Tischnummer, Gerichten samt Varianten und
              Allergenen, dem freien Gästekommentar und einer Tages-Nummer
              für die Küche. Alternativ der <em>WhatsApp-Modus</em>:
              Dieselbe Bestellung wird als Nachricht formatiert und an die
              WhatsApp-Nummer des Restaurants gesendet — praktisch für
              kleine Teams, für vorwiegend To-Go-Betrieb oder wenn der
              Manager nicht vor Ort ist. Beide Modi können parallel laufen.
            </p>
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-benefits">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Was du wirklich bekommst
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
            So funktioniert der IQ Rest Bestellfluss
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-start">
            Vier Schalter im Dashboard und du bist live. Kein Installateur,
            keine POS-Hardware, kein Integrationsprojekt.
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
            Aggregator, klassisches POS oder Restaurant Bestellsystem
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Merkmal
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Lieferaggregator
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Klassisches POS
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    IQ Rest Bestellungen
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
            Ein Restaurant Bestellsystem, das dem Restaurant gehört, rechnet
            sich am ersten Wochenende — jeder Euro, den ein Gast bei dir
            ausgibt, bleibt bei dir, und der Bon am Pass zeigt immer die
            echte Tischnummer.
          </p>
        </div>
      </Section>
    </>
  );
}
