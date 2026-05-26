import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "en",
  slug: "qr-code-menu-for-restaurants",
  trackPrefix: "l_en_qr",

  meta: {
    title: "QR Code Menu for Restaurants | IQ Rest",
    description:
      "QR code menu for restaurants: the guest scans the table QR, opens the menu in the browser and orders in their own language. 14 days free, no card.",
    canonical: "https://iq-rest.com/qr-code-menu-for-restaurants",
    ogLocale: "en_US",
    ogTitle: "QR Code Menu for Restaurants",
    ogDescription:
      "QR on the table, menu on the phone — photos, allergens, 35 languages and real-time updates.",
    brandLine: "IQ Rest — QR Code Menu for Restaurants",
  },

  hero: {
    headline: "QR code menu for restaurants.",
    cta: "Create QR Menu",
    sub: "The guest points the camera at the table QR code and the menu opens instantly in the phone browser: dish photos, allergens, prices always up to date and automatic translation into 35 languages. No app downloads, no reprinting menus every time a price changes.",
  },

  scan: {
    heading: "Already have a paper or PDF menu?",
    headingAccent: "AI turns it into a QR menu in 60 seconds.",
    sub: "Upload a photo of the menu or the PDF — AI extracts categories, dishes and prices and wires them straight into the QR menu.",
    cta: "Create the QR menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "One QR, 35 languages",
      heading: "One QR code, the menu in 35 languages.",
      body: "The guest scans the QR and picks a language: translation is handled by an AI with culinary judgement, not a generic translator. Forget separate menus for tourists and loose printed sheets on the table.",
      bullets: [
        "A single QR print covers 35 languages, included in the subscription.",
        "The AI understands culinary language — dish names sound natural in every language.",
        "The guest switches language inside the menu, without rescanning the QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Two guests scan the same table QR code and read the menu in different languages" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergens in the QR",
      heading: "Allergens and dietary labels inside the QR menu.",
      body: "Every dish in the QR-linked menu can carry labels for gluten, lactose, nuts, seafood, vegan and gluten-free options. The guest filters the dishes that match their restrictions right from the phone, without asking the staff.",
      bullets: [
        "14 allergen categories at the dish level.",
        "Vegan, vegetarian and gluten-free labels with one click in the panel.",
        "The guest filters the QR menu by their own restrictions.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Guest filters the QR menu by allergens on the phone while the owner edits the list from a tablet" },
    },
    {
      icon: Palette,
      eyebrow: "More than just a QR",
      heading: "A QR menu polished like the restaurant's own website.",
      body: "After scanning the code the guest doesn't hit a flat PDF: they see a welcome screen with a video or featured photo, the venue description and a contact page with map, phone numbers and social links. The QR becomes the front door to the restaurant online.",
      bullets: [
        "Background video or featured photo on the QR menu's opening screen.",
        "Room to tell the story of the venue and of each category.",
        "Built-in contact page: map, phone, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Two phones on a table: QR menu opening screen with background video and a contact page with a map" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Ordering from the QR · optional",
      heading: "From the QR code the guest can order too.",
      body: "Besides browsing the menu, the QR menu can become an ordering channel: the guest adds dishes to the cart and sends the request. The order reaches the waiter on the floor, WhatsApp or the kitchen screen. The feature is switched on or off in the settings whenever needed.",
      bullets: [
        "Cart, notes and order submission straight from the QR scan.",
        "The order arrives instantly on the floor, WhatsApp or kitchen screen.",
        "Feature toggled by hours, rooms or specific restaurants.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Two phones on a table: a cart built from the QR menu and an order-sent confirmation" },
    },
  ],

  faq: {
    sub: "What restaurateurs ask about the IQ Rest QR code menu. Can't find your question? Message us on WhatsApp.",
    items: [
      { q: "How does the IQ Rest QR code menu work?", a: "Each table carries a printed QR code. The guest scans it with the phone camera and the browser opens the restaurant menu — photos, descriptions, allergens and up-to-date prices. No app to download, neither for the guest nor the staff." },
      { q: "Do I need technical skills to build the QR menu?", a: "No. The panel works with clicks and drag-and-drop, no code or complex setup. Adding a dish takes a few seconds: name, price, photo. Initial setup usually takes 30 minutes to an hour; if you already have a PDF menu, AI converts it automatically." },
      { q: "Do guests have to install an app to read the QR?", a: "No. The native iPhone and Android camera recognises the QR code in seconds and opens the menu directly in the browser. The admin panel also runs from any modern browser — phone, tablet or laptop." },
      { q: "How are the QR codes for the tables printed?", a: "QR codes are generated automatically in the panel (one per table or a single one for the whole venue) and download as print-ready PDFs. All you need is an office printer and a stand: easel, sticker or coaster." },
      { q: "Can I use my own domain for the QR menu?", a: "Yes. We support a restaurant domain with an SSL certificate (for example menu.yourrestaurant.com): when the guest scans the QR they see your restaurant's address instead of a generic subdomain. DNS setup takes 5–10 minutes and we guide you through it." },
      { q: "Can I manage the QR codes of several restaurants from one account?", a: "Yes, on request. One account can group several venues, each with its own QR codes, menu, design and analytics. Message us on WhatsApp and we'll enable multi-restaurant mode." },
      { q: "Is it hard to launch the QR menu from scratch?", a: "Three steps: (1) create the categories; (2) add the dishes with name, price and photo; (3) print the QRs and place them on the tables. If you already have a paper or PDF menu, upload it — AI recognises categories and prices and fills in the cards. A basic menu can be online in 5 minutes." },
    ],
  },
};
