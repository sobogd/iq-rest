import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR per tafel, scan-en-bestel, geen app nodig",
  "Bestellingen in real time op de keuken- of manager-tablet",
  "Of routering naar de WhatsApp van het restaurant — jouw keuze",
  "Modifiers, varianten en allergenen komen op de bon",
  "Vrije opmerking van de gast op elke bestelling",
  "Dagelijkse nummering voor de keuken",
  "Meertalige checkout in 35 talen, gedetecteerd via telefoon gast",
  "Nul commissie per bestelling — vaste maandelijkse abonnement",
];

const HOW_STEPS = [
  { title: "Bestellen op het restaurant inschakelen", desc: "Open de restaurantinstellingen, zet de Bestellingen-schakelaar aan en kies welke gastvelden (naam, telefoon, adres) je wilt verzamelen." },
  { title: "Kies het leveringskanaal", desc: "Interne modus stuurt nieuwe bestellingen naar het Keuken-tabblad. WhatsApp-modus stuurt ze als geformatteerd bericht naar het WhatsApp-nummer. Of beide parallel." },
  { title: "Druk en plak de QR-codes", desc: "Download de QR (één per tafel of één voor het hele restaurant) als PDF of PNG en plak op de tafels. Gasten scannen met de native camera — geen App Store, geen wrijving." },
  { title: "Doe de service", desc: "Bestellingen verschijnen in het Keuken-tabblad met tafelnummer, gerechten, varianten, allergenen, opmerking en dagnummer. Je beweegt door nieuw → in behandeling → voltooid. De browser van de gast werkt in real time bij." },
];

const COMPARISON_ROWS = [
  ["Commissie per bestelling", "20–30%", "0%", "0% (€6,90/maand vast)"],
  ["Bestemming bestelling", "App van aggregator", "Eigen kassa", "Eigen keuken-tablet of WhatsApp"],
  ["Tafelnummer op bon", "Nee", "Handmatig", "Ja, automatisch"],
  ["Modifiers / varianten", "Beperkt", "Ja", "Ja, met allergenen"],
  ["Meertalige checkout", "Taal van hun app", "Nee", "35 talen, automatisch"],
  ["Vereiste hardware", "Tablet van aggregator", "POS-terminal", "Elke tablet met browser"],
  ["Opzettijd", "Onboarding-call", "Dagen-weken", "5 minuten"],
];

export function SeoContent() {
  return (
    <>
      <Section dataSection="seo-intro">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center">In detail</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center">Wat een online bestelsysteem voor restaurants <span className="text-muted-foreground">écht is</span></h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center">Geen marktplaats. Geen bezorgaggregator. Een directe lijn van de telefoon van de gast aan je tafel naar je keuken-tablet — of je WhatsApp.</p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p><strong>Online bestelsysteem voor restaurants</strong> in IQ Rest-zin is de software waarmee een gast aan je tafel het menu op zijn telefoon kan openen, een winkelmandje samenstellen en de bestelling naar je keuken sturen — zonder Thuisbezorgd, Uber Eats of een andere marktplaats. De gast verlaat je QR-menu nooit, je betaalt geen commissie per bestelling, en de bon komt met het echte tafelnummer.</p>
            <p>IQ Rest werkt met twee kanalen. Standaard <em>interne modus</em>: elke nieuwe bestelling komt in het Keuken-tabblad van het dashboard op de tablet, telefoon of laptop bij de doorgeefluik — met tafelnummer, gerechten met varianten en allergenen, vrije opmerking en dagnummer. Alternatief <em>WhatsApp-modus</em>: dezelfde bestelling als geformatteerd bericht naar het WhatsApp-nummer van het restaurant. Handig voor kleine teams, voornamelijk afhaal of als de manager elders is. Beide modi kunnen parallel draaien.</p>
          </div>
        </div>
      </Section>
      <Section dataSection="seo-benefits"><div className="max-w-4xl mx-auto"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Wat je écht krijgt</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">{BENEFITS.map((b) => (<div key={b} className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3"><div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Check className="h-4 w-4" strokeWidth={2.5} /></div><p className="text-sm sm:text-base text-foreground/90 leading-snug">{b}</p></div>))}</div></div></Section>
      <Section dataSection="seo-how"><div className="max-w-4xl mx-auto"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Hoe de IQ Rest-bestelflow werkt</h3><p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center">Vier schakelaars in het dashboard en je bent live. Geen installer, geen POS-hardware, geen integratieproject.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">{HOW_STEPS.map((s, i) => (<div key={s.title} className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4"><div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">{i + 1}</div><div className="flex-1 min-w-0"><div className="text-base sm:text-lg font-semibold tracking-tight mb-1">{s.title}</div><p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p></div></div>))}</div></div></Section>
      <Section dataSection="seo-table"><div className="max-w-4xl mx-auto"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Aggregator, klassieke POS of online bestelsysteem</h3><div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto"><table className="w-full text-sm sm:text-base border-collapse"><thead><tr className="border-b border-border"><th className="text-left font-semibold py-3 pr-3 text-foreground">Kenmerk</th><th className="text-left font-semibold py-3 pr-3 text-muted-foreground">Bezorgaggregator</th><th className="text-left font-semibold py-3 pr-3 text-muted-foreground">Klassieke POS</th><th className="text-left font-semibold py-3 text-primary">IQ Rest bestellingen</th></tr></thead><tbody className="text-foreground/90">{COMPARISON_ROWS.map((row, i) => (<tr key={row[0]} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}><td className="py-3 pr-3 font-medium">{row[0]}</td><td className="py-3 pr-3 text-muted-foreground">{row[1]}</td><td className="py-3 pr-3 text-muted-foreground">{row[2]}</td><td className="py-3 text-foreground">{row[3]}</td></tr>))}</tbody></table></div><p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center">Een online bestelsysteem dat het restaurant écht bezit verdient zichzelf in het eerste weekend terug — elke euro die de gast in je zaak uitgeeft blijft in je zaak, en de bon bij het doorgeefluik draagt altijd het echte tafelnummer.</p></div></Section>
    </>
  );
}
