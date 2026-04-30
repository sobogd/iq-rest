import { ChevronDown, MessageCircle } from "lucide-react";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "What does the free trial include — and what happens after?",
    a: "14 days, full access, no credit card needed. After 14 days your account simply pauses if you don't add a payment method — we never charge you automatically. Add billing details anytime to reactivate. Cancel in one click whenever you want.",
  },
  {
    q: "Do you take a commission on orders?",
    a: "Zero. Every order from your QR menu goes straight to you — no cut for us, no Glovo / Uber Eats fees. One flat monthly price, that's it.",
  },
  {
    q: "Do my guests need an app? Do I need any tech skills?",
    a: "Zero apps for guests — they scan the QR with their phone camera and the menu opens in the browser. Zero tech skills for you — the whole dashboard works on your phone, tap to add a dish, drag to reorder, that's the entire learning curve.",
  },
  {
    q: "Can I manage multiple restaurants from one account?",
    a: "Yes. The Pro plan lets you run multiple restaurants under a single account — separate menus, separate QR codes, separate analytics, one login. Switch between them in two taps.",
  },
  {
    q: "How fast can I update prices and add new dishes?",
    a: "Instantly. Edit a price on your phone, the change is live for guests in seconds. New dish? Tap, type, upload a photo, done — no reprints, no waiting on a designer.",
  },
  {
    q: "How many languages do you support?",
    a: "35 languages with built-in AI translation. One tap translates your entire menu, and the AI understands culinary context — dish names and descriptions read naturally in every language. Tourists order more when they actually understand the menu.",
  },
];

export function Faq() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-24 text-center lg:text-left">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground mb-4">
            Got questions?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 leading-[1.15]">
            Frequently asked{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              questions.
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto lg:mx-0 leading-snug mb-5">
            Everything restaurant owners ask before signing up. Don&apos;t see yours? Ping us on WhatsApp — real humans reply.
          </p>
          <a
            href="https://wa.me/34637621754?text=Hi%2C%20I%20have%20a%20question%20about%20IQ%20Rest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            Ask on WhatsApp
          </a>
        </div>

        <div className="flex flex-col gap-2">
          {ITEMS.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-card border border-border rounded-2xl px-5 py-4 open:bg-card/80 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm font-medium tracking-tight">
                <span>{q}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
