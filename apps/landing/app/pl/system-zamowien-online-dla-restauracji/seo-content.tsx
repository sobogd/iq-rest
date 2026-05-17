import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR na stolik, skanuj-i-zamawiaj, bez aplikacji",
  "Zamówienia w czasie rzeczywistym na tablecie kuchni lub menedżera",
  "Lub kierowane na WhatsApp restauracji — Ty wybierasz",
  "Modyfikatory, warianty i alergeny trafiają na bon",
  "Swobodny komentarz gościa w każdym zamówieniu",
  "Dzienna numeracja dla kuchni",
  "Wielojęzyczny checkout w 35 językach, wykrywany z telefonu gościa",
  "Zero prowizji od zamówienia — stała miesięczna subskrypcja",
];

const HOW_STEPS = [
  { title: "Włącz zamówienia w restauracji", desc: "Otwórz ustawienia restauracji, włącz przełącznik Zamówienia i wybierz pola gościa (imię, telefon, adres) do zebrania." },
  { title: "Wybierz kanał dostawy", desc: "Tryb wewnętrzny wysyła nowe zamówienia do zakładki Kuchnia. Tryb WhatsApp formatuje jako wiadomość na WhatsApp lokalu. Lub oba naraz." },
  { title: "Wydrukuj i naklej QR", desc: "Pobierz QR (po jednym na stolik lub jeden na lokal) w PDF lub PNG i naklej na stoliki. Goście skanują natywną kamerą — bez App Store, bez tarcia." },
  { title: "Prowadź serwis", desc: "Zamówienia pojawiają się w zakładce Kuchnia z numerem stolika, daniami, wariantami, alergenami, komentarzem i numerem dnia. Przechodzisz przez nowe → w trakcie → gotowe. Przeglądarka gościa aktualizuje się w czasie rzeczywistym." },
];

const COMPARISON_ROWS = [
  ["Prowizja od zamówienia", "20–30%", "0%", "0% (€6,90/mies. stałe)"],
  ["Cel zamówienia", "Aplikacja agregatora", "Twoja kasa", "Twój tablet kuchni lub WhatsApp"],
  ["Numer stolika na bonie", "Nie", "Ręcznie", "Tak, automatycznie"],
  ["Modyfikatory / warianty", "Ograniczone", "Tak", "Tak, z alergenami"],
  ["Wielojęzyczny checkout", "Język ich aplikacji", "Nie", "35 języków, automatycznie"],
  ["Potrzebny sprzęt", "Tablet agregatora", "Terminal POS", "Każdy tablet z przeglądarką"],
  ["Czas konfiguracji", "Rozmowa onboardingowa", "Dni-tygodnie", "5 minut"],
];

export function SeoContent() {
  return (
    <>
      <Section dataSection="seo-intro">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center">Szczegółowo</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center">
            Czym naprawdę jest system zamówień online{" "}
            <span className="text-muted-foreground">dla restauracji</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center">
            Nie marketplace. Nie agregator dostaw. Bezpośrednia linia z telefonu gościa przy Twoim stoliku do tabletu w kuchni — lub do Twojego WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              <strong>System zamówień online dla restauracji</strong> w rozumieniu IQ Rest to oprogramowanie, które pozwala gościowi siedzącemu przy Twoim stoliku otworzyć menu w telefonie, skompletować koszyk i wysłać zamówienie do Twojej kuchni — bez Uber Eats, Glovo, Pyszne czy innego marketplace. Gość nigdy nie opuszcza Twojego menu QR, nie płacisz prowizji od zamówienia, a bon zawiera prawdziwy numer stolika.
            </p>
            <p>
              IQ Rest działa na dwóch kanałach. Domyślnie <em>tryb wewnętrzny</em>: każde nowe zamówienie trafia do zakładki Kuchnia panelu na tablecie, telefonie lub laptopie przy wydawce — pokazuje numer stolika, dania z wariantami i alergenami, swobodny komentarz gościa i dzienny numer zamówienia. Alternatywnie <em>tryb WhatsApp</em>: to samo zamówienie jest sformatowane jako wiadomość i wysłane na WhatsApp restauracji. Przydatne dla małych zespołów, głównie wynosu lub gdy menedżera nie ma na miejscu. Oba tryby mogą działać jednocześnie.
            </p>
          </div>
        </div>
      </Section>
      <Section dataSection="seo-benefits">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Co naprawdę dostajesz</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {BENEFITS.map((b) => (
              <div key={b} className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Check className="h-4 w-4" strokeWidth={2.5} /></div>
                <p className="text-sm sm:text-base text-foreground/90 leading-snug">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section dataSection="seo-how">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Jak działa przepływ zamówień IQ Rest</h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center">Cztery przełączniki w panelu i jesteś live. Bez instalatora, bez sprzętu POS, bez projektu integracji.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {HOW_STEPS.map((s, i) => (
              <div key={s.title} className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-semibold tracking-tight mb-1">{s.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section dataSection="seo-table">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Agregator, klasyczny POS lub system zamówień</h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">Cecha</th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">Agregator dostaw</th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">Klasyczny POS</th>
                  <th className="text-left font-semibold py-3 text-primary">Zamówienia IQ Rest</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row[0]} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}>
                    <td className="py-3 pr-3 font-medium">{row[0]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[1]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[2]}</td>
                    <td className="py-3 text-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center">
            System zamówień online, który należy do restauracji, zwraca się w pierwszy weekend — każde euro, które gość wydaje w lokalu, zostaje w lokalu, a bon przy wydawce zawsze ma prawdziwy numer stolika.
          </p>
        </div>
      </Section>
    </>
  );
}
