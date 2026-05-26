import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "en",
  htmlDir: "ltr",

  meta: {
    title: "QR Menu for Restaurants — Direct Orders, Zero Commissions | IQ Rest",
    description:
      "All-in-one restaurant platform: digital menu, QR ordering, table booking and kitchen display. Launch in 5 minutes. 14 days free, no card required.",
    canonical: "https://iq-rest.com",
    ogLocale: "en_US",
    ogTitle: "QR Menu for Restaurants — Direct Orders, Zero Commissions",
    ogDescription:
      "Digital menu, QR ordering, table booking and AI translation. Launch in 5 minutes. 14 days free.",
  },

  ctaText: "Start for free",
  homeCtaText: "Build your platform",
  demoText: "Watch demo",
  microcopy: "14 days free · No card required · Cancel anytime",

  header: {
    navFeatures: "Features",
    navHow: "How it works",
    navPricing: "Pricing",
    navFaq: "FAQ",
    signIn: "Sign in",
    viewFeatures: "View features",
    cta: "Start for free",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzerias"],
    headline: "Digital menu for restaurants. Live in 5 minutes.",
    sub: "Digital menu for your restaurant in 5 minutes. Everything included: no-code editor, AI menu scanning, table QR codes and direct orders without commissions.",
    dynamicHeadlines: ["0% commission.", "35 AI languages.", "Online orders.", "24/7 bookings.", "Premium design."],
    painBullets: [
      "0% commission: every order goes directly to your restaurant.",
      "AI translation in 35 languages — tourists understand the menu and order more.",
      "24/7 booking: guests reserve tables themselves, without phone calls during rush hours.",
      "Flexible pricing: menu updates go live in seconds.",
    ],
    rating: "Over 500 restaurants in 30+ countries",
  },

  features: {
    heading: "Everything you need.",
    headingAccent: "Nothing extra.",
    sub: "Built for restaurants. Used every day at the table, in the kitchen and on the floor.",
    items: [
      { Icon: Monitor, title: "Digital menu", desc: "Menu in the browser with photos, prices, allergens and descriptions. Updates in real time from your phone. Guests see the menu in their language; the restaurant saves on print.", tag: "Digital menu", href: "/digital-menu-for-restaurants" },
      { Icon: Receipt, title: "Order taking: guest and waiter", desc: "A QR code at the table for the guest, or the waiter takes the order from a phone — both go straight to the kitchen or WhatsApp. No commissions, with table number on every ticket.", tag: "Order taking", href: "/restaurant-ordering-system" },
      { Icon: CalendarCheck, title: "Table booking 24/7", desc: "Guests reserve tables themselves through the website or QR menu while you're busy on the floor. Calendar by table, automatic confirmations and reminders. Not a single missed guest.", tag: "Booking", href: "/table-booking-system" },
      { Icon: ChefHat, title: "Kitchen display (KDS)", desc: "Paper tickets are no longer needed. Orders from the floor go straight to the chef's screen — columns 'cooking / ready / served', allergens and notes highlighted in colour. Tablet or phone.", tag: "KDS", href: "/kitchen-display-system" },
    ],
  },

  founder: {
    eyebrow: "Built by restaurateurs",
    quoteStart:
      "My wife and I ran our own café and we know first-hand how a restaurant day really works — order taking, bookings, floor and kitchen flow. We wanted a single tool: modern, easy to launch and clear at a glance —",
    quoteAccent: "so we started building the platform we develop for other restaurateurs.",
    sign: "Bogdan Sokolov · founder, former café owner",
    photoAlt: "Bogdan Sokolov, founder of IQ Rest",
  },

  how: {
    heading: "Live in 5 minutes",
    sub: "Four short steps. No installs, no technical setup.",
    steps: [
      { n: "1", t: "Type and name", d: "Choose the venue type and enter the name." },
      { n: "2", t: "Save", d: "Enter your email or sign in with Google." },
      { n: "3", t: "Menu", d: "Add items manually or upload a printed menu for AI scanning." },
      { n: "4", t: "Done", d: "Share a link or QR code and start taking orders." },
    ],
  },

  pricing: {
    badge: "No commissions · No contracts",
    heading: "One plan.",
    headingAccent: "Everything included.",
    sub: "QR menu, order taking, AI translation, restaurant website and booking. One transparent monthly fee.",
    monthlyLabel: "Monthly",
    yearlyLabel: "Annual",
    saveBadge: "Save 25%",
    perMonth: "per month",
    billedAnnually: "Billed annually: {total}",
    youSave: "You save {amount}",
    trust: { secure: "Secure Stripe payment", noCommitment: "No commitment", quick: "Active in minutes", restaurants: "500+ restaurants" },
  },

  faq: {
    eyebrow: "Got questions?",
    heading: "Frequently asked",
    headingAccent: "questions.",
    sub: "What restaurateurs ask before signing up. Can't find your question? Message us on WhatsApp — real people reply, not a bot.",
    whatsappCta: "Ask on WhatsApp",
    whatsappPrefill: "Hi, I have a question about IQ Rest",
    items: [
      { q: "What does the trial include and what happens after?", a: "Full access to every feature for 14 days, no card required. After 14 days the account is paused if no payment method is added — we never charge automatically. You can add payment later and continue from where you left off. Cancel anytime in one click." },
      { q: "Do you take a commission on orders?", a: "No. Every order from the QR menu goes directly to the restaurant — no percentage on our side, no aggregator fees. One fixed monthly fee and nothing else." },
      { q: "Do guests need an app, do we need technical skills?", a: "Guests don't need an app — they point their phone camera at the QR code and the menu opens in the browser. Restaurants don't need technical skills either: the admin panel runs in any modern browser on phone, tablet or laptop. Every action is point-and-click and drag-and-drop, without any code." },
      { q: "How fast do prices change and new dishes appear?", a: "Instantly. Change a price from your phone — guests see it within seconds. A new dish takes a few taps: name, price, photo. No reprints, no waiting for a designer." },
      { q: "How many languages are supported?", a: "35 languages with built-in AI translation. One tap and the entire menu is translated; the AI understands culinary context — names and descriptions sound natural in any language. Tourists order more confidently when they truly understand the menu." },
    ],
  },

  finalCta: {
    heading: "Live in 5 minutes.",
    headingAccent: "14 days free.",
    sub: "No card required, cancel anytime. Join 500+ restaurants already running on IQ Rest.",
  },

  scan: {
    heading: "Got a paper menu or PDF?",
    headingAccent: "AI digitises it in 60 seconds.",
    sub: "Upload a photo or document — AI recognises categories, dishes and prices automatically.",
    cta: "Scan menu →",
  },

  pricingHero: {
    chips: ["No commissions", "No contracts", "14 days free"],
    heading: "Pricing.",
    headingAccent: "No hidden fees.",
    sub: "One transparent monthly fee. No percentage on orders and no aggregator commissions. Cancel the subscription anytime.",
    popularBadge: "Popular",
    perMonthSuffix: "/mo",
    whenAnnualTemplate: "billed annually · €{total} per year",
    orMonthlyTemplate: "or €{price}/mo",
    savingsTemplate: "save €{amount} per year",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, QR ordering and AI translation. Live in 5 minutes.",
        features: [
          "QR menu for every table",
          "Digital menu with photos and allergens",
          "AI translation in 35 languages",
          "Orders from the menu (optional)",
          "AI dish photo generation",
          "Manage from any phone or tablet",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Full restaurant control: kitchen display and bookings.",
        features: [
          "Everything in Basic",
          "Kitchen display (KDS)",
          "Online table booking 24/7",
          "Priority WhatsApp support",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/digital-menu-for-restaurants", label: "Digital menu" },
      { href: "/restaurant-ordering-system", label: "Order taking" },
      { href: "/table-booking-system", label: "Table booking" },
      { href: "/kitchen-display-system", label: "Kitchen display" },
    ],
    navLinks: [
      { href: "/pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
      { href: "/languages", label: "Change language" },
    ],
    copyrightTemplate: "© {year} IQ Rest. All rights reserved.",
  },
};
