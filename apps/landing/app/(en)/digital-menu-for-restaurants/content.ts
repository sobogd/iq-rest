import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "en",
  slug: "digital-menu-for-restaurants",
  trackPrefix: "l_en_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Digital Menu for Restaurants | IQ Rest",
    description:
      "Digital menu for restaurants: online card with photos, allergens, AI translation and live price updates. 14 days free, no card required.",
    canonical: "https://iq-rest.com/digital-menu-for-restaurants",
    ogLocale: "en_US",
    ogTitle: "Digital Menu for Restaurants",
    ogDescription:
      "Online version of your paper menu — photos, allergens, AI translation, real-time updates.",
    brandLine: "IQ Rest — Digital Menu for Restaurants",
  },

  hero: {
    headline: "A digital menu\nthat has it all",
    cta: "Create Digital Menu",
    sub: "Photos, allergens and translation into 35 languages. Plus orders, WhatsApp and table booking — all in one IQ Rest.",
  },

  scan: {
    heading: "Got a paper menu or PDF?",
    headingAccent: "AI digitises it in 60 seconds.",
    sub: "Upload a photo or document — AI recognises categories, dishes and prices automatically.",
    cta: "Scan menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI languages",
      heading: "35 languages every guest reads",
      body: "One QR, 35 languages. AI translates with culinary context, so every dish sounds natural. Tourists order with confidence.",
      bullets: [
        "35 languages in your plan",
        "Culinary AI, not Google",
        "One-tap language switch",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Two guests reading the same digital menu in different languages on their own phones" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergens",
      heading: "Allergens and diets on every dish",
      body: "Tag gluten, lactose, nuts, vegan and gluten-free. Guests filter the menu to fit their diet and order with ease.",
      bullets: [
        "14 allergen categories",
        "Vegan and gluten-free tags",
        "Guests filter by diet",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Guest filters menu by allergens on phone while owner edits the allergen list on a tablet" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Any device",
      heading: "Manage it from any device",
      body: "The admin panel runs in the browser — edit menu, prices and photos from anywhere. Nothing to install.",
      bullets: [
        "Runs in any browser",
        "Phone, tablet or PC",
        "Nothing to install",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "No commission",
      heading: "Zero commission, no add-ons",
      body: "One transparent subscription. We take no cut of your revenue and hide no fees — it all stays with the restaurant.",
      bullets: [
        "Zero percent on orders",
        "No hidden add-ons",
        "One flat price",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Custom domain",
      heading: "Menu on your own domain",
      body: "We connect your domain with SSL — guests see the menu on your restaurant's address. We help with DNS in 10 minutes.",
      bullets: [
        "Your domain with SSL",
        "menu.yourrestaurant.com",
        "We help with DNS setup",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Your design",
      heading: "Flexible design to match you",
      body: "Several ready layouts and styles — pick the cover, colors and dish presentation that fit your venue.",
      bullets: [
        "Several ready layouts",
        "Your cover and colors",
        "Restyle in a few clicks",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Contacts",
      heading: "Contacts and socials in the menu",
      body: "A dedicated page with map, phone and links to Instagram and WhatsApp — guests find you in a single tap.",
      bullets: [
        "Map, phone and address",
        "Instagram and WhatsApp",
        "Reach you in one tap",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp orders",
      heading: "Take orders through WhatsApp",
      body: "Guests build a cart and send the order straight to your WhatsApp — no separate app, in the chat they already use.",
      bullets: [
        "Order to your WhatsApp",
        "No separate app",
        "Chat as usual",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reservations",
      heading: "Table booking without calls",
      body: "Guests book a table themselves via the menu or a link, you see the calendar by table and confirm auto or manually.",
      bullets: [
        "Booking 24/7, no calls",
        "Calendar across tables",
        "Auto and manual confirm",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium design",
      heading: "Looks like a site, not a PDF",
      body: "Video background on the welcome screen, your concept described and a separate contact page with map and socials.",
      bullets: [
        "Video on the home screen",
        "Concept and dishes described",
        "Separate contact page",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Two phones on a café table: home screen of the menu with a video background and the contact page with a map" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Orders · optional",
      heading: "Orders straight from the menu",
      body: "Guests build a cart and send the order — it lands in the hall, WhatsApp or the kitchen screen. Optional.",
      bullets: [
        "Cart and send in a tap",
        "To hall, WhatsApp or kitchen",
        "Toggle it in settings",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Two phones on a table: cart with an order and the order-placed confirmation" },
    },
  ],

  faq: {
    sub: "What restaurateurs ask about the digital menu in IQ Rest. Can't find your question? Message us on WhatsApp.",
    items: [
      { q: "Do I need technical skills or CMS experience?", a: "No, special skills are not required. Every action in the admin panel is point-and-click and drag-and-drop — without any code. Adding a menu item takes a few seconds: name, price, photo. A full menu setup usually takes 30 minutes to an hour." },
      { q: "What is IQ Rest digital menu?", a: "IQ Rest is a cloud platform for restaurants. The digital menu is the online version of your menu, available to guests via a QR code or a direct link: dish photos, prices, allergens, AI translation in 35 languages, real-time updates. The menu is hosted on our servers; you don't have to install or maintain software — just open a browser." },
      { q: "Do guests need an app or special hardware?", a: "No. Guests point their phone camera at the QR code and the menu opens in the browser. The admin panel for the restaurant also runs in any modern browser — phone, tablet or laptop. QR codes print on any office printer." },
      { q: "Can I host the menu on my own domain?", a: "Yes. We support a custom domain with an SSL certificate — guests see the menu on your restaurant's address (e.g. menu.yourrestaurant.com). We help with the DNS setup; it usually takes 5–10 minutes." },
      { q: "Can I manage multiple restaurants from one account?", a: "Yes, on request. One account can host several restaurants: each venue with its own menu, design, QR codes and analytics. Message us on WhatsApp and we'll enable the multi-restaurant mode for your group." },
      { q: "How hard is it to set up the menu from scratch?", a: "The setup consists of three steps: (1) create categories; (2) add items with names, prices and photos; (3) print QR codes for the tables. If you already have a paper menu or a PDF, upload it — the AI will recognise categories, names and prices and fill the cards automatically. A basic menu can go live in 5 minutes; the full setup time depends on the number of items." },
      { q: "What kind of support do you offer?", a: "We are available on WhatsApp during business hours and reply quickly by email. We help with the initial setup, domain configuration, menu design and any non-standard situations. If you need a demo or hands-on support during launch — message us." },
    ],
  },
};
