import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "en",
  slug: "kitchen-display-system",
  trackPrefix: "l_en_kds",

  meta: {
    title: "Kitchen Display System (KDS) for Restaurants | IQ Rest",
    description:
      "Kitchen display (KDS) for restaurants: orders from the floor and QR menu land on the chef's screen instantly. Columns by table, statuses Pending / Cooking / Ready / Served, zone filters. Runs on tablet or phone.",
    canonical: "https://iq-rest.com/kitchen-display-system",
    ogLocale: "en_US",
    ogTitle: "Kitchen Display System (KDS) — Orders on the chef's screen",
    ogDescription:
      "Orders from the floor on the chef's screen. Columns by table, statuses and timer. One tap changes the status.",
    brandLine: "IQ Rest — Kitchen Display System",
  },

  hero: {
    headline: "Kitchen display: orders straight to the chef's screen.",
    cta: "Set Up Kitchen Display",
    sub: "Paper tickets are no longer needed. Orders from the floor or the QR menu land on the kitchen screen instantly — with notes, allergens and a timer. One tap changes the status. Works on a tablet at the pass or a smartphone in the chef's pocket.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Professional kitchen with a tablet on a brass stand showing the kitchen display with active orders",
  },

  scan: {
    heading: "Set up the kitchen display",
    headingAccent: "in 5 minutes.",
    sub: "Upload a paper menu or PDF — AI recognises dishes, categories and allergens. Connect a tablet in the kitchen and start receiving orders.",
    cta: "Scan menu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Controls and filters",
      heading: "Multiple screens by zone: kitchen and bar.",
      body: "Place separate tablets at the hot line, the bar or the pastry station — each screen shows only the dishes that belong to it. Filters by status (Pending / Cooking / Ready / Served) and by category remove the noise: the chef only sees what's relevant to their station.",
      bullets: [
        "Multiple KDS screens with category filters.",
        "Status filter: show only cooking and ready.",
        "Each zone sees only its own flow of orders.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet on a brass stand at the kitchen pass — KDS with a status filter" },
    },
    {
      icon: Timer,
      eyebrow: "Cards and timer",
      heading: "One tap changes the status. Notes and allergens highlighted in colour.",
      body: "The dish card shows the chosen options (no onions, well done), the guest's note, the allergens and a timer from the moment the order was placed. Tap the card and the status moves to the next: Pending → Cooking → Ready → Served. The list is sorted by priority automatically.",
      bullets: [
        "Tap on the card — instant status change.",
        "Options, notes and allergens highlighted in colour.",
        "Priority sorting: items waiting longer rise to the top.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet on a brass stand on the bar counter — KDS with order cards by table" },
    },
  ],

  faq: {
    sub: "What restaurateurs ask about the kitchen display in IQ Rest. Can't find your question? Message us on WhatsApp.",
    items: [
      { q: "What dish statuses does the kitchen have?", a: "Four statuses with different card colours: Pending (grey) — the order is accepted and waiting; Cooking (orange) — the dish is being prepared; Ready (blue) — ready to serve; Served (green) — delivered to the guest. Tapping the card moves it to the next status, without menus or confirmations." },
      { q: "Can I run multiple KDS screens in different zones?", a: "Yes. One tablet on the hot line, another on the bar, a third on the pastry station — each with its own category filter. All screens are synchronised in real time: a status changed on one screen updates everywhere." },
      { q: "What hardware do I need to run the KDS?", a: "KDS is a web app that runs in any modern browser. A big kitchen — a tablet on a brass stand at the pass or a TV on the wall. A small venue — the chef's smartphone. No special hardware, no installation: open a link and sign into the account." },
      { q: "Where do orders on the kitchen screen come from?", a: "From every source: the guest who ordered through the QR menu at the table; the waiter who took the order from their phone; the guest who placed the order from the website. All of them arrive on the KDS with a source label and the table number. No manual transfers from a POS." },
      { q: "What is shown on an order card?", a: "Dish name, selected modifiers (no onions, well done, add sauce), guest comment, highlighted allergens, status (Pending / Cooking / Ready / Served) and a timer showing how long the dish has been waiting. Cards are sorted by priority: the longer the wait, the higher in the column." },
      { q: "Can I filter the cards on the screen?", a: "Yes. Two filters: by status (e.g. show only Pending and Cooking, hide Served) and by category (only drinks on the bar, only mains on the kitchen). The settings are saved per device — each zone keeps its own set." },
    ],
  },
};
