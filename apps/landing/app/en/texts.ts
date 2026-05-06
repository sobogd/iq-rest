import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "en",
  htmlDir: "ltr",

  meta: {
    title: "QR Menu for Restaurants — Direct Orders, Zero Commission | IQ Rest",
    description:
      "Replace paper menus and delivery-app commissions. QR menu, direct orders, reservations & multilingual website. 14-day free trial, no credit card.",
    canonical: "https://iq-rest.com/en",
    ogLocale: "en_US",
    ogTitle: "QR Menu for Restaurants — Direct Orders, Zero Commission",
    ogDescription:
      "QR menu, direct orders, reservations & AI translation. Live in 5 minutes. 14-day free trial — no credit card.",
  },

  ctaText: "Try for free", ctaSite: "Create website",
  demoText: "See live demo",
  microcopy: "14-day free trial · No credit card · Cancel anytime",

  header: {
    navFeatures: "Features",
    navHow: "How it works",
    navPricing: "Pricing",
    navFaq: "FAQ",
    signIn: "Sign in",
    cta: "Try for free",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzerias"],
    qr: { headline: "QR Menu in 5 minutes.", sub: "Ready-made restaurant website — no developers, no contractors. Direct orders, bookings, and guest analytics in one subscription." },
    web: { headline: "Restaurant website in 5 min.", sub: "Ready-made restaurant website — no developers, no contractors. Direct orders, bookings, and guest analytics in one subscription." },
    dynamicHeadlines: ["0% commission.", "35 languages with AI.", "Online ordering.", "24/7 Bookings.", "Premium design."],
    painBullets: ["0% Commission: All orders go directly to you.", "AI Translation: 35 languages to boost tourist checks.", "24/7 Bookings: Full house without extra calls.", "Flexible Prices: Update your menu in seconds."],
    rating: "4.9 · 500+ restaurants in 30+ countries",
  },

  features: {
    heading: "Everything you need.",
    headingAccent: "Nothing you don't.",
    sub: "Built for restaurants. Used at the table.",
    items: [
      
      {
        Icon: ScanLine,
        title: "Table Ordering",
        desc: "Orders fly instantly to WhatsApp or your dashboard with table numbers. Faster service, higher spend.",
        tag: "Direct ordering",
      },
      {
        Icon: Languages,
        title: "AI Translator (35 Languages)",
        desc: "Our AI knows gastronomy. Tourists order 20% more when they actually understand the menu.",
        tag: "AI translation",
      },
      {
        Icon: CalendarCheck,
        title: "Table Reservations",
        desc: "The system takes bookings while you're busy in the kitchen. Never miss a customer again.",
        tag: "Reservations",
      },
      {
        Icon: Palette,
        title: "Modern Design",
        desc: "Video backgrounds and juicy photos. Your menu looks premium and triggers appetite instantly.",
        tag: "Custom design",
      },
      {
        Icon: Smartphone,
        title: "Instant Editor",
        desc: "Manage stop-lists and prices right from your smartphone. Changes are live for guests instantly.",
        tag: "Menu editor",
      },
      {
        Icon: ChefHat,
        title: "Coming Soon: Kitchen Display",
        desc: "Forget paper tickets. Orders from the floor go straight to the chef's screen. Pure efficiency.",
        tag: "Coming soon",
      },
    
    ],
  },

  founder: {
    eyebrow: "Built by a restaurant owner",
    quoteStart:
      "My wife and I opened a café and spent weeks looking for a system that could handle online orders, reservations and actually look modern. Everything we tried was clunky, ugly, or missing half the features we needed —",
    quoteAccent: "so we built the one we wished existed.",
    sign: "Bogdan Sokolov · founder, ex-café owner",
    photoAlt: "Bogdan, founder of IQ Rest",
  },

  how: {
    heading: "Live in under 5 minutes",
    sub: "Four short steps. No tech setup, no installs.",
    steps: [
      { n: "1", t: "Type and name", d: "Pick your place type and enter the name." },
      { n: "2", t: "Save", d: "Enter email or sign in with Google." },
      { n: "3", t: "Menu", d: "Build it yourself or scan a paper menu." },
      { n: "4", t: "Done", d: "View, share and start taking orders." },
    ],
  },

  pricing: {
    badge: "No commissions · No contracts",
    heading: "One plan.",
    headingAccent: "Everything included.",
    sub: "QR menu, ordering, AI translation, restaurant website & reservations. One simple price.",
    monthlyLabel: "Monthly",
    yearlyLabel: "Yearly",
    saveBadge: "Save 25%",
    perMonth: "per month",
    billedAnnually: "Billed annually {total}",
    youSave: "You save {amount}",
    trust: {
      secure: "Secure payment with Stripe",
      noCommitment: "No commitment",
      quick: "Active in minutes",
      restaurants: "500+ restaurants",
    },
  },

  faq: {
    eyebrow: "Got questions?",
    heading: "Frequently asked",
    headingAccent: "questions.",
    sub: "Everything restaurant owners ask before signing up. Don't see yours? Ping us on WhatsApp — real humans reply.",
    whatsappCta: "Ask on WhatsApp",
    whatsappPrefill: "Hi, I have a question about IQ Rest",
    items: [
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
        q: "How fast can I update prices and add new dishes?",
        a: "Instantly. Edit a price on your phone, the change is live for guests in seconds. New dish? Tap, type, upload a photo, done — no reprints, no waiting on a designer.",
      },
      {
        q: "How many languages do you support?",
        a: "35 languages with built-in AI translation. One tap translates your entire menu, and the AI understands culinary context — dish names and descriptions read naturally in every language. Tourists order more when they actually understand the menu.",
      },
    ],
  },

  finalCta: {
    heading: "Ready in 5 minutes.",
    headingAccent: "Free for 14 days.",
    sub: "No credit card required. Cancel anytime. Join 500+ restaurants already running on IQ Rest.",
  },

  scan: {
    heading: "Got a paper menu or PDF?",
    headingAccent: "AI digitizes it in 60 seconds.",
    sub: "Upload — AI extracts categories, dishes and prices.",
    cta: "Scan my menu →",
  },
  footer: {
    featureLinks: [
      { href: "/en/online-orders", label: "Online Ordering" },
      { href: "/en/ai-translation", label: "AI Menu Translation" },
      { href: "/en/reservations", label: "Reservations" },
      { href: "/en/mobile-management", label: "Mobile Management" },
      { href: "/en/easy-menu", label: "Menu Editor" },
      { href: "/en/custom-design", label: "Video & Photo Backgrounds" },
      { href: "/en/color-scheme", label: "Custom Color Scheme" },
      { href: "/en/multilingual", label: "Multilingual Website" },
      { href: "/en/ai-images", label: "AI Image Optimization" },
      { href: "/en/analytics", label: "Analytics & Insights" },
      { href: "/en/instant-setup", label: "Instant Setup" },
      { href: "/en/personal-support", label: "Personal Support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "Questions" },
      { href: "/en/changelog", label: "Changelog" },
      { href: "/en/languages", label: "Change language" },
    ],
    copyrightTemplate: "© {year} IQ Rest. All rights reserved.",
  },
};
