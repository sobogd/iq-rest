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
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

// English home copy for the conversion landing.
//
// Positioning: the core value is the DIGITAL MENU, the KITCHEN DISPLAY and the
// RESERVATIONS manager. Order-taking is secondary — never the hook, and the
// page never leads with "0% commission" or frames the product against delivery
// apps.

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Pizzerias"],
    title: "Your restaurant, digital",
    titleAccent: "in 5 min.",
    sub: "A digital menu, kitchen display and 24/7 bookings — everything your restaurant needs, live in 5 minutes.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurants" },
      { icon: "cafe", label: "Cafés" },
      { icon: "bar", label: "Bars" },
      { icon: "pizza", label: "Pizzerias" },
    ],
    title: "Everything your",
    titleAccent: "restaurant needs!",
    sub: "Set up your processes in 10 minutes: launch the online menu, streamline the kitchen and keep track of seating.",
    primaryLabel: "Start for free",
    demoLabel: "View demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet with the kitchen display: orders by table in columns with statuses" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet with the booking calendar: month view and bookings awaiting confirmation" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Phone with a restaurant website home page: photo, bookings and the online menu" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Phone with a dish card: photo, price and allergen tags" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Live in 10 minutes", sub: "No expensive hardware to buy, no lengthy setup" },
    { Icon: MessagesSquare, title: "Fast support", sub: "We answer in chat within a few hours" },
    { Icon: Globe, title: "Chosen by {count} venues", sub: "Restaurants and cafés in 15+ countries trust us" },
    { Icon: Palette, title: "100% your brand", sub: "We adapt the design and interface to your venue's style" },
  ],

  menu: {
    heading: "Website & digital menu",
    sub: {
      link: "More than a QR menu!",
      rest: " Get a full website with a unique design, a contact page and table booking.",
    },
    moreLabel: "Learn more",
    mockupAlt: "Two phones: a restaurant website home page and a dish page",
    bullets: [
      { Icon: Languages, title: "Auto-translation into 35 languages", sub: "Serve international guests without a language barrier — automatic translation does it all" },
      { Icon: ClipboardList, title: "Orders straight from the table", sub: "Simplify service — take orders at the table, fast and without a waiter" },
      { Icon: WheatOff, title: "Allergens & diets", sub: "Tag allergens and dietary preferences (vegan, spicy) so guests choose safely and easily" },
    ],
  },

  reservations: {
    heading: "Table reservations",
    sub: {
      link: "Smart table booking!",
      rest: " An automatic reservation system that tracks free tables and your schedule by itself.",
    },
    moreLabel: "Learn more",
    mockupAlt: "Tablet with the booking calendar: tables by day and time slot",
    bullets: [
      { Icon: CalendarCheck, title: "A clear booking map", sub: "A visual grid by day and table — free slots are visible at a glance" },
      { Icon: SlidersHorizontal, title: "Flexible booking setup", sub: "Set opening hours, slot length, table photos, and collect guest requests" },
      { Icon: Users, title: "Guest flow control", sub: "Choose how bookings are handled and stay in full control of guest flow" },
    ],
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
          "A unique QR code for every table",
          "No app for guests — opens in the browser",
          "Allergen and diet tags guests filter by",
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
          "AI scans your paper menu in 60 seconds",
          "Your own domain with SSL",
        ],
      },
    ],
  },
};
