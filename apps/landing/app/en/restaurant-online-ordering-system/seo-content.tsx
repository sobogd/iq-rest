import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR per table, scan-to-order, no app to install",
  "Orders land on the kitchen or manager tablet in real time",
  "Or routed to the restaurant's WhatsApp number — your choice",
  "Item modifiers, variants and allergens carried through to the ticket",
  "Free-text comment from the guest on every order",
  "Daily order numbering for the kitchen",
  "Multilingual checkout in 35 languages, auto-detected per guest phone",
  "Zero per-order commission — flat monthly subscription",
];

const HOW_STEPS = [
  {
    title: "Enable ordering on the restaurant",
    desc: "Open the restaurant's settings, flip the Orders Enabled toggle on and choose which guest fields (name, phone, address) you want to collect.",
  },
  {
    title: "Pick the delivery channel",
    desc: "Internal mode sends new orders to the Kitchen tab in the dashboard. WhatsApp mode formats the order as a message and sends it to your venue's WhatsApp number. Or run both at once.",
  },
  {
    title: "Print and place the QR codes",
    desc: "Download the QR (one per table or one for the whole venue) as PDF or PNG and stick it on the tables. Guests scan with the native camera — no app store, no friction.",
  },
  {
    title: "Run the service",
    desc: "Orders pop up in the Kitchen tab with the table number, items, variants, allergens, comment and daily number. Tap to move through new → in progress → completed. The guest's browser updates in real time.",
  },
];

const COMPARISON_ROWS = [
  ["Per-order commission", "20–30%", "0%", "0% (flat €6.90/mo)"],
  ["Order destination", "Aggregator app", "Your own till", "Your kitchen tablet or WhatsApp"],
  ["Table number on ticket", "No", "Manual", "Yes, automatic"],
  ["Modifiers / variants", "Limited", "Yes", "Yes, with allergens"],
  ["Multilingual checkout", "Their app's locale", "No", "35 languages, auto-detected"],
  ["Hardware required", "Aggregator tablet", "POS terminal", "Any tablet with a browser"],
  ["Setup time", "Onboarding call", "Days–weeks", "5 minutes"],
];

export function SeoContent() {
  return (
    <>
      <Section dataSection="seo-intro">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center">
            In depth
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center">
            What a restaurant online ordering system{" "}
            <span className="text-muted-foreground">really is</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center">
            Not a marketplace. Not a delivery aggregator. A direct line from
            the guest's phone at your table to your kitchen tablet — or your
            WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              A <strong>restaurant online ordering system</strong> in the IQ Rest
              sense is the software that lets a guest sitting at one of your
              tables open the menu on their phone, build a cart and send the
              order to your kitchen — without involving Uber Eats, Glovo, Wolt
              or any other marketplace. The guest never leaves your QR menu,
              you never pay a per-order fee, and the order arrives with the
              real table number on it.
            </p>
            <p>
              IQ Rest is built around two delivery channels. The default,
              <em> internal mode</em>, sends every new order to the Kitchen tab
              of the dashboard on whatever tablet, phone or laptop you keep on
              the pass — it shows the table number, the items with their
              variants and allergens, the guest's free-text comment and a daily
              order number for the kitchen. The alternative, <em>WhatsApp mode</em>,
              formats the same order as a message and sends it to your
              restaurant's WhatsApp number — useful when you have a small
              team, when ordering is mostly takeaway, or when the manager is
              off-site. Both modes can run at the same time.
            </p>
          </div>
        </div>
      </Section>

      <Section dataSection="seo-benefits">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">
            What you actually get
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

      <Section dataSection="seo-how">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">
            How the IQ Rest ordering flow works
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center">
            Four switches inside the dashboard and you're live. No installer,
            no POS hardware, no integration project.
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

      <Section dataSection="seo-table">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">
            Aggregator, classic POS, or a restaurant online ordering system
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Characteristic
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Delivery aggregator
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Classic POS
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    IQ Rest ordering
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
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center">
            A restaurant online ordering system you actually own pays itself
            back the first weekend — every euro a guest spends in your venue
            stays in your venue, and the ticket on the pass always shows the
            real table number.
          </p>
        </div>
      </Section>
    </>
  );
}
