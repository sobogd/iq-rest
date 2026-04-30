import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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
      "QR menu, direct orders, reservations & AI translation. Live in 2 minutes. 14-day free trial — no credit card.",
  },

  ctaText: "Start my free trial →",
  demoText: "See live demo",
  microcopy: "14-day free trial · No credit card · Cancel anytime",

  header: {
    navFeatures: "Features",
    navHow: "How it works",
    navPricing: "Pricing",
    navFaq: "FAQ",
    signIn: "Sign in",
    cta: "Start free trial →",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzerias"],
    variants: [
      {
        headline: "Stop reprinting menus.",
        headlineAccent: "Stop paying 30% to delivery apps.",
        sub: "QR menu, direct orders, reservations & multilingual website. Live in 2 minutes — no credit card.",
      },
      {
        headline: "Your restaurant deserves more than",
        headlineAccent: "paper menus and missed calls.",
        sub: "Direct orders, instant menu updates and 24/7 reservations. Set it up in 2 minutes.",
      },
      {
        headline: "One QR code.",
        headlineAccent: "Zero commissions. No more printed menus.",
        sub: "QR menu, online orders and reservations — all in one place. 14-day free trial, no card required.",
      },
      {
        headline: "Get direct orders.",
        headlineAccent: "Skip the commission.",
        sub: "Guests scan, order and pay — straight to you, no Uber Eats cut. Live in 2 minutes.",
      },
      {
        headline: "More orders. More bookings.",
        headlineAccent: "No paper, no apps.",
        sub: "QR menu + reservations + multilingual website on autopilot. Free 14-day trial.",
      },
      {
        headline: "Tourists can't read your menu?",
        headlineAccent: "Fix it in 2 minutes.",
        sub: "AI translates your entire menu into 35 languages. Plus QR ordering and reservations included.",
      },
      {
        headline: "From paper menu to QR code,",
        headlineAccent: "before your espresso gets cold.",
        sub: "QR menu, direct orders and 24/7 reservations. Live in 2 minutes — no credit card.",
      },
      {
        headline: "Refreshingly simple QR menu.",
        headlineAccent: "Quietly powerful underneath.",
        sub: "Direct orders, AI translation, reservations and a website — all from one tap on your phone.",
      },
    ],
    painBullets: [
      "No printed menus — update prices instantly",
      "No commissions — orders go straight to you",
      "No missed calls — bookings 24/7",
      "35 languages — never lose a tourist again",
    ],
    rating: "4.9 · 500+ restaurants in 30+ countries",
  },

  features: {
    heading: "Everything you need.",
    headingAccent: "Nothing you don't.",
    sub: "Built for restaurants. Used at the table.",
    items: [
      {
        Icon: ScanLine,
        title: "Keep 100% of every order",
        desc: "Guests scan, order and pay — straight to you. No app downloads, no 30% delivery cut. Every order hits your dashboard with the table number in real time.",
      },
      {
        Icon: Languages,
        title: "Sell to tourists in their language",
        desc: "One tap translates your full menu into 35 languages. AI nails culinary context — guests order more when they actually understand the dish.",
      },
      {
        Icon: CalendarCheck,
        title: "Stop missing bookings while you cook",
        desc: "Guests book tables 24/7, no phone calls. Auto or manual confirmation, email reminders included — fewer no-shows, zero hassle.",
      },
      {
        Icon: Palette,
        title: "Look unforgettable in 1 second",
        desc: "Drop in a video of your kitchen or a hero food shot as your menu background. Guests stop scrolling. Your brand sticks.",
      },
      {
        Icon: Smartphone,
        title: "Update in seconds, not days",
        desc: "Change prices, swap photos, add today's specials — from your phone, between tables. Live for guests instantly. Never reprint a menu again.",
      },
      {
        Icon: ListPlus,
        title: "If you can text, you can use it",
        desc: "Tap to add a dish. Drag to reorder. Toggle off when sold out. No manuals, no tutorials, no learning curve.",
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
    heading: "Live in under 2 minutes",
    sub: "Four short steps. No tech setup, no installs.",
    steps: [
      { n: "1", t: "Sign up", d: "Email or Google. No credit card. Done in 10 seconds." },
      { n: "2", t: "Name your restaurant", d: "Just type the name. It shows on top of your menu." },
      { n: "3", t: "Add your first dish", d: "Category, dish name, price, photo. That's it." },
      { n: "4", t: "Pick a cover & print your QR", d: "Choose a background. Get your QR. Stick it on tables." },
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
    ],
  },

  finalCta: {
    heading: "Ready in 2 minutes.",
    headingAccent: "Free for 14 days.",
    sub: "No credit card required. Cancel anytime. Join 500+ restaurants already running on IQ Rest.",
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
    legalLinks: [
      { href: "/en/terms", label: "Terms and Conditions" },
      { href: "/en/privacy", label: "Privacy Policy" },
      { href: "/en/cookies", label: "Cookies Policy" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
    copyrightTemplate: "© {year} IQ Rest. All rights reserved.",
  },
};
