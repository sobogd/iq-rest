import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

// English home copy for the conversion landing.
//
// Positioning: the core value is the DIGITAL MENU, the KITCHEN DISPLAY and the
// RESERVATIONS manager. Order-taking is secondary — never the hook, and the
// page never leads with "0% commission" or frames the product against delivery
// apps.

export const CRO: CroCopy = {
  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Pizzerias"],
    title: "Your restaurant,",
    titleAccent: "fully digital in 5 minutes.",
    sub: "A beautiful digital menu, a kitchen display and 24/7 table bookings — the complete platform for a modern restaurant.",
  },

  heroMicrocopy: "{count} restaurants · 14 days free · No card",
  seeIncluded: "See what's included",

  trust: [
    { kind: "num", value: 35, label: "Languages" },
    { kind: "text", value: "24/7", label: "Reservations" },
    { kind: "num", value: 5, suffix: " min", label: "Setup" },
    { kind: "count", label: "Restaurants" },
  ],

  bundle: {
    heading: "Everything your restaurant runs on.",
    headingAccent: "In one app.",
    sub: "Menu, kitchen and reservations in a single place — modern, fast and built for the way restaurants actually work. No add-ons, no per-feature pricing.",
  },

  benefits: [
    {
      Icon: Languages,
      tag: "Digital menu",
      title: "A menu that sells.",
      bullets: ["35 AI languages", "Premium design", "Instant price updates"],
      image: "/landing/feature-design.webp",
      imageAlt: "Two phones on a cafe table: the digital menu welcome screen with video background and the contact page with a map",
    },
    {
      Icon: ChefHat,
      tag: "Kitchen display",
      title: "Cook faster, miss nothing.",
      bullets: ["Live on the screen", "Notes & allergens", "Tablet or phone"],
      image: "/landing/feature-kds-cards.webp",
      imageAlt: "Tablet on a bar counter showing the kitchen display: order cards by table with cooking, ready and served statuses",
    },
    {
      Icon: CalendarCheck,
      tag: "Reservations",
      title: "Bookings on autopilot.",
      bullets: ["Self-service booking", "Auto confirmations", "Calendar by table"],
      image: "/landing/feature-booking-calendar.webp",
      imageAlt: "Two tablets on a table showing the booking calendar: daily timeline by table and monthly view",
    },
    {
      Icon: Receipt,
      tag: "Orders at the table",
      title: "Orders straight to the kitchen.",
      bullets: ["Guest or waiter", "Straight to kitchen", "On / off anytime"],
      image: "/landing/feature-orders-map.webp",
      imageAlt: "Tablet with the orders screen: order list and floor map with colour-coded tables.",
    },
  ],

  seeDetails: "See details",

  extras: {
    heading: "And everything else included.",
    items: [
      { Icon: ScanLine, label: "AI scans your paper menu in 60 seconds" },
      { Icon: QrCode, label: "A unique QR code for every table" },
      { Icon: Smartphone, label: "No app for guests — opens in the browser" },
      { Icon: Globe, label: "Your own domain with SSL" },
      { Icon: BarChart3, label: "Sales analytics: revenue, top dishes, hours" },
      { Icon: Palette, label: "Allergen and diet tags guests filter by" },
    ],
  },

  midCta: {
    heading: "One app instead of five.",
    sub: "No juggling separate tools for the menu, the kitchen and the bookings — it all lives in a single place, on any phone or tablet, with nothing to install.",
  },

  platform: {
    hardwareTitle: "Work with your own hardware",
    hardwareSub: "We never force you to buy hardware from us. Use the phones, tablets and computers you already have.",
    anywhereTitle: "Built to run anywhere",
    anywhereSub: "Mobile, tablet, laptop, PC. Android, iOS, Windows, Mac, Linux. Works in any modern browser, no install.",
  },

  activities: {
    heading: "One system,",
    headingAccent: "your whole restaurant.",
    sub: "Faster service, a calmer kitchen, lower costs and a guest experience they remember — all in one platform.",
    groups: [
      {
        Icon: Smartphone,
        tag: "At the table — guests",
        bullets: [
          "QR menu in 35 languages",
          "Order without waving for a waiter",
          "Call the waiter or ask for the bill",
          "Book a table 24/7",
        ],
      },
      {
        Icon: ChefHat,
        tag: "In the kitchen",
        bullets: [
          "Orders land on the screen instantly",
          "Cooking / ready / served columns",
          "Allergens and notes highlighted",
          "Tablet or phone — no paper tickets",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Management",
        bullets: [
          "Menu and price edits go live instantly",
          "AI translation in one click",
          "Sales analytics and reports",
          "Run several restaurants from one account",
        ],
      },
    ],
  },
};
