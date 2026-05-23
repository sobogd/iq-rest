import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "en",
  slug: "digital-menu-for-restaurants",
  trackPrefix: "l_en_digital",

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
    headline: "Digital menu for restaurants.",
    sub: "Online version of your paper menu with photos, allergens, descriptions and live price updates. Guests see the menu in their own language; the restaurant saves on print.",
  },

  scan: {
    heading: "Got a paper menu or PDF?",
    headingAccent: "AI digitises it in 60 seconds.",
    sub: "Upload a photo or document — AI recognises categories, dishes and prices automatically.",
    cta: "Scan menu",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "Menu without photos",
      heading: "A photoless menu looks just as good.",
      body: "Some items might not have photos — and that is perfectly fine. IQ Rest renders cards with and without images consistently: typography, allergens and prices keep a premium feel. A mix of items with and without photos stays cohesive.",
      bullets: [
        "Cards without photos do not look empty.",
        "Typography adapts to the card content.",
        "Consistent style for items with and without images.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Two phones on a table: menu with dish photos and a text-only menu" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergens",
      heading: "Allergen and dietary tags.",
      body: "Mark dishes for gluten, lactose, nuts, seafood, vegan and gluten-free options. Guests filter the menu by their dietary needs and order with greater confidence.",
      bullets: [
        "14 standard allergen categories on every dish.",
        "Vegan, vegetarian and gluten-free tags in a single click.",
        "Guests filter the menu by their dietary constraints.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Guest filters menu by allergens on phone while owner edits the allergen list on a tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Premium design",
      heading: "Premium design with video background and contact page.",
      body: "A video or photo on the welcome screen, restaurant description, dedicated contact page with map, phone numbers and social profiles. The digital menu looks like a full restaurant website, not a PDF behind a QR code.",
      bullets: [
        "Video background or large photo on the welcome screen.",
        "Restaurant and category descriptions — tell the story of the concept.",
        "Contact page: map, phone, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Two phones on a café table: home screen of the menu with a video background and the contact page with a map" },
    },
    {
      icon: Languages,
      eyebrow: "35 AI languages",
      heading: "35 AI languages — every guest reads the menu in their own.",
      body: "One QR code, 35 languages. The AI handles culinary context — dish names and descriptions sound natural. Tourists order with more confidence and average ticket grows without a waiter translating each item.",
      bullets: [
        "35 languages included in the subscription, no upcharge.",
        "Culinary-aware AI, not raw Google Translate.",
        "Guest switches language with a single tap inside the menu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Two guests reading the same digital menu in different languages on their own phones" },
    },
    {
      icon: Smartphone,
      eyebrow: "Manage from any device",
      heading: "Manage the menu from any device.",
      body: "A single panel opens in the browser on phone, tablet or laptop. Change a price, take a dish off the stop list or add a special — guests see the change within seconds. No installs, no integrations.",
      bullets: [
        "No app to install — open a browser and you are in.",
        "Prices, photos and stop list — a few taps from the phone.",
        "Manage the menu from anywhere, including the floor.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Laptop and phone on a café table editing the same menu item on both devices" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Orders from the menu · optional",
      heading: "Guests place orders straight from the menu.",
      body: "Guests build a cart in the QR menu and send the order — it lands with the waiter on the floor or on the kitchen tablet. The feature can be enabled or disabled in settings at any time.",
      bullets: [
        "Cart, comments and order sending with a single tap.",
        "Order lands instantly in the admin panel, WhatsApp or on the kitchen display.",
        "Feature is toggled in settings.",
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
