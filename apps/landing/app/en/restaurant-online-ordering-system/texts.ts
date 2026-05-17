import { QrCode, MessageCircle, ChefHat, Settings2, Languages, BarChart3 } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

// /en/restaurant-online-ordering-system targets the broad-match keyword
// "restaurant online ordering system" (1000/mo, LOW competition).
// Positioning: NOT an aggregator competitor. IQ Rest is the restaurant's
// own ordering channel — guests scan the QR menu at the table and the
// order lands directly on the manager's or kitchen's tablet, or is sent
// to the restaurant's WhatsApp number. Stripe payment is available on
// custom request, not enabled by default.
export const TEXTS: LandingTexts = {
  htmlLang: "en",
  htmlDir: "ltr",

  meta: {
    title: "Restaurant Online Ordering System — QR & WhatsApp | IQ Rest",
    description:
      "Restaurant online ordering system that sends every order straight to your kitchen tablet or WhatsApp. QR menu, table number, modifiers and allergens included. No commission. 14 days free, no card.",
    canonical: "https://iq-rest.com/en/restaurant-online-ordering-system",
    ogLocale: "en_US",
    ogTitle: "Restaurant Online Ordering System — Direct to Your Tablet",
    ogDescription:
      "Guests scan the QR menu, build the cart, hit send — the order lands on your kitchen tablet or your WhatsApp. No aggregator, no commission, real table number.",
  },

  ctaText: "Set up my ordering",
  demoText: "See a live demo",
  microcopy: "From €6.90/month · 14 days free · Cancel anytime",

  header: {
    navFeatures: "Features",
    navHow: "How it works",
    navPricing: "Pricing",
    navFaq: "FAQ",
    signIn: "Sign in",
    cta: "Try free",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bistros", "Pizzerias", "Bars", "Taprooms"],
    headline: "Restaurant Online Ordering System.",
    sub: "Guests scan the QR menu at the table, build the cart, send the order — and it lands on your kitchen tablet or your WhatsApp. No aggregator, no commission, real table number on every ticket.",
    dynamicHeadlines: [
      "Order at the table.",
      "Straight to the kitchen tablet.",
      "Or straight to WhatsApp.",
      "No commission.",
      "Real table number.",
    ],
    painBullets: [
      "Restaurant online ordering system the restaurant actually owns — no commission, no middleman.",
      "Orders land on your kitchen or manager tablet with the table number, items, modifiers and notes.",
      "Or have orders go straight to your restaurant WhatsApp — useful for takeaway and small teams.",
      "QR code per table (or one for the whole venue) generated automatically.",
    ],
    rating: "500+ restaurants in 30+ countries",
  },

  features: {
    heading: "A restaurant online ordering system",
    headingAccent: "built around the table.",
    sub: "Real functionality you'll actually use — not a delivery-aggregator clone.",
    items: [
      {
        Icon: QrCode,
        title: "QR menu with cart at every table",
        desc: "Guests scan the table QR, browse the menu in their language, add items with modifiers, leave a note for the kitchen and send. No app to install.",
        tag: "QR ordering",
      },
      {
        Icon: ChefHat,
        title: "Orders on your kitchen tablet",
        desc: "Every new order shows up in the Kitchen tab on whatever tablet you keep by the pass — with table number, items, variants, allergens and the guest's comment. Mark in-progress → completed in one tap.",
        tag: "Kitchen view",
      },
      {
        Icon: MessageCircle,
        title: "Or send orders to WhatsApp",
        desc: "Switch the restaurant to WhatsApp mode (or both modes at once) and every order is delivered to your restaurant's WhatsApp number as a formatted message — perfect for takeaway, small teams or off-site managers.",
        tag: "WhatsApp mode",
      },
      {
        Icon: Settings2,
        title: "Modifiers, variants and allergens",
        desc: "Each item carries its variant groups (size, doneness, add-ons) with price deltas, allergen tags and a free description. The cart respects everything, so the ticket on your tablet is unambiguous.",
        tag: "Real cart",
      },
      {
        Icon: Languages,
        title: "Multilingual checkout",
        desc: "The whole ordering flow — cart, modifiers, comment field, confirmation — is translated into 35 languages and auto-matches the guest's phone. Tourists order with confidence.",
        tag: "35 languages",
      },
      {
        Icon: BarChart3,
        title: "Daily numbering and order log",
        desc: "Every order gets a per-day number for the kitchen, sits in a searchable log with totals and timestamps, and feeds the analytics dashboard. Cancellations are soft-deleted so reports stay clean.",
        tag: "Order log",
      },
    ],
  },

  founder: {
    eyebrow: "Built by a café owner, not a delivery startup",
    quoteStart:
      "My wife and I opened a café and spent weeks looking for a way to take orders from the table that didn't hand 30% to an aggregator or require a €1500 POS system. Everything we tried was either bloated, expensive or missing the basics —",
    quoteAccent: "so we built the ordering system we wished we had.",
    sign: "Bogdan Sokolov · founder, former café owner",
    photoAlt: "Bogdan, founder of IQ Rest",
  },

  how: {
    heading: "Set up your ordering system",
    headingAccent: "in 4 steps",
    sub: "No installation, no integrator, no IT call. Just your phone and 5 minutes.",
    steps: [
      { n: "1", t: "Create the restaurant", d: "Email login or Google — 30 seconds." },
      { n: "2", t: "Add the menu", d: "Drag-and-drop, or scan a paper menu and let AI import it." },
      { n: "3", t: "Choose the channel", d: "Internal kitchen tablet, WhatsApp, or both." },
      { n: "4", t: "Print the QR", d: "Stick one QR per table — guests can start ordering immediately." },
    ],
  },

  pricing: {
    badge: "Unlimited orders · Zero commission",
    heading: "One plan.",
    headingAccent: "No per-order fee.",
    sub: "Online ordering, QR menu, WhatsApp orders, multilingual checkout and analytics — all in one subscription. No per-transaction cut.",
    monthlyLabel: "Monthly",
    yearlyLabel: "Yearly",
    saveBadge: "Save 25%",
    perMonth: "per month",
    billedAnnually: "Billed annually {total}",
    youSave: "You save {amount}",
    trust: {
      secure: "Subscription billed via Stripe",
      noCommitment: "No commitment",
      quick: "Live in minutes",
      restaurants: "+500 restaurants",
    },
  },

  faq: {
    eyebrow: "Restaurant ordering — common questions",
    heading: "About the",
    headingAccent: "ordering system.",
    sub: "What owners ask before turning on online ordering with IQ Rest. Question not here? Message us on WhatsApp — real humans answer.",
    whatsappCta: "Ask on WhatsApp",
    whatsappPrefill: "Hi, I have a question about IQ Rest ordering",
    items: [
      {
        q: "Is this a delivery platform like Uber Eats or Glovo?",
        a: "No, and that's the point. IQ Rest is your restaurant's own ordering channel — guests order from your QR menu, the order lands on your tablet or WhatsApp, you serve it. There's no marketplace, no aggregator catalogue, and we never take a cut of the bill.",
      },
      {
        q: "Where exactly do orders show up?",
        a: "In the Kitchen tab of the IQ Rest dashboard on whatever tablet or phone you keep on the pass or the bar. Each order shows the table number, items with variants and allergens, the guest's comment and the daily order number. You move it through new → in progress → completed with one tap.",
      },
      {
        q: "Can I have the order sent to WhatsApp instead?",
        a: "Yes. Each restaurant has three modes: internal (kitchen tablet only), WhatsApp (the order is sent as a formatted message to your restaurant WhatsApp number) or both at once. The mode is a single setting in the dashboard — switch it any time.",
      },
      {
        q: "What does an order include — just the items?",
        a: "Items with their selected variants and add-ons (price deltas included), allergens, the table number, a free-text comment from the guest and — if you've turned the fields on — the guest's name, phone and address. It's enough to send a takeaway driver or to call the table back about an allergy.",
      },
      {
        q: "Can guests pay online from the menu?",
        a: "Not by default. IQ Rest is built around pay-at-the-table service — guests order, you bring the bill, they pay how they always did. Online card payment can be wired up on request via a Stripe Connect integration; reach out on WhatsApp if you need it for takeaway.",
      },
      {
        q: "Do I need a special tablet, printer or POS hardware?",
        a: "No. Any tablet, laptop or phone with a browser works — open the dashboard, sign in, leave the Kitchen tab open. If you already have a POS, IQ Rest sits alongside it; we don't replace your till.",
      },
      {
        q: "How do guests know the order arrived?",
        a: "They see an in-browser confirmation with the daily order number. The Kitchen tab on your side updates in real time — when you mark the order as in-progress or completed, the guest sees the updated status without refreshing.",
      },
      {
        q: "Can I disable ordering for some restaurants but keep the menu?",
        a: "Yes. Each restaurant has an Orders Enabled toggle. Turn it off and the menu still works — guests can browse, allergens still filter, language still switches — but the cart is hidden. Good for venues that only need the QR menu without the ordering layer.",
      },
      {
        q: "What happens after the 14-day free trial?",
        a: "If you don't add a payment method, the account pauses — we never auto-charge. The menu, orders and settings stay saved; add a card whenever you want to reactivate. Cancel any time, no commitment.",
      },
    ],
  },

  finalCta: {
    heading: "Turn on your ordering system.",
    headingAccent: "Live in 5 minutes.",
    sub: "14 days free, no card required. Cancel any time. Join 500+ restaurants running their own online ordering with IQ Rest.",
  },

  scan: {
    heading: "Paper menu in, ordering system out",
    headingAccent: "in 60 seconds",
    sub: "Upload a photo of your printed menu — AI extracts categories, items and prices straight into the editor. From there the cart and the QR are one click away.",
    cta: "Scan my menu →",
  },

  footer: {
    featureLinks: [
      { href: "/en/ai-translation", label: "AI translation" },
      { href: "/en/reservations", label: "Reservations" },
      { href: "/en/mobile-management", label: "Mobile management" },
      { href: "/en/easy-menu", label: "Menu editor" },
      { href: "/en/custom-design", label: "Video & photo backgrounds" },
      { href: "/en/color-scheme", label: "Brand colours" },
      { href: "/en/multilingual", label: "Multilingual menu" },
      { href: "/en/ai-images", label: "AI image optimisation" },
      { href: "/en/analytics", label: "Analytics" },
      { href: "/en/instant-setup", label: "Instant setup" },
      { href: "/en/personal-support", label: "Personal support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
      { href: "/en/changelog", label: "Changelog" },
      { href: "/en/languages", label: "Languages" },
    ],
    copyrightTemplate: "© {year} IQ Rest. All rights reserved.",
  },
};
