import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "en",
  slug: "restaurant-ordering-system",
  trackPrefix: "l_en_orders",

  meta: {
    title: "Restaurant Ordering System — Guest and Waiter | IQ Rest",
    description:
      "Restaurant ordering from a phone or tablet: floor map, bill splitting, statuses, options and notes. Guests order at the table; the waiter takes orders from any device. 14 days free.",
    canonical: "https://iq-rest.com/en/restaurant-ordering-system",
    ogLocale: "en_US",
    ogTitle: "Restaurant Ordering System — Guest and Waiter",
    ogDescription:
      "Guest at the table or waiter on the phone — order lands instantly on the kitchen. Floor map, bill split, statuses, options and notes.",
    brandLine: "IQ Rest — Restaurant Ordering System",
  },

  hero: {
    headline: "Order taking: guest and waiter — straight to the kitchen.",
    sub: "Guests order through the QR menu at the table or the waiter takes the order from a phone or tablet — the order lands on the kitchen display in seconds. Floor map with colour-coded tables, bill splitting, flexible options and comments. No notepads, no trips to the bar.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Waiter takes an order at the table from a smartphone — the order lands on the kitchen display",
  },

  scan: {
    heading: "Set up the ordering system",
    headingAccent: "in 5 minutes.",
    sub: "Upload a paper menu or PDF — AI recognises dishes, prices and categories. Connect a tablet in the dining room and start taking orders at the tables.",
    cta: "Scan menu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "List and floor map",
      heading: "Order list next to the floor map.",
      body: "All active orders on the right: status, total, time, item count. On the left — the floor map: tables coloured by status — empty, taken, needs attention. Tap a table to open or create an order; tap a card to open the detail view. No screen-hopping.",
      bullets: [
        "Floor map: tables colour-coded by order status.",
        "Order list alongside — total, time, item count.",
        "Tap a table to open or create an order.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet at the waiter station: order list and floor map with colour-coded tables" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Order card",
      heading: "Order card: statuses, duplicate, delete — one tap.",
      body: "Each item has its own status (Pending / Cooking / Ready / Served) — kitchen and waiter see the same picture in real time. Tapping the dot opens the action menu: change status, duplicate the item with the same modifiers and options, delete. Everything inside the card.",
      bullets: [
        "Per-item status: Pending / Cooking / Ready / Served.",
        "Duplicate an item in one tap with the same options.",
        "Delete an item directly from the card.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet with the order detail card: item statuses, duplicate and delete actions" },
    },
    {
      icon: Receipt,
      eyebrow: "Split bill",
      heading: "Split the bill when guests pay separately.",
      body: "Guests decided to split — tick the items that move to a new ticket; the rest stays on the current one. The system instantly shows both totals. One tap on 'Split order' and you have two independent orders with correct totals, both still tied to their tables.",
      bullets: [
        "Pick items to split with checkboxes.",
        "Both totals shown instantly.",
        "One tap and the order is split without manual maths.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet on a restaurant table: split-bill modal between guests" },
    },
    {
      icon: Smartphone,
      eyebrow: "Mobile add flow",
      heading: "Add items from a phone — in three actions.",
      body: "The waiter isn't tied to one device: open ordering on their phone and add an item in three steps — category, dish, options (size, doneness, extra sauce or ingredient). Price is recalculated automatically. The note for the kitchen goes on the last step.",
      bullets: [
        "Three steps: category → dish → options.",
        "Options (size, add-ons, extras) priced in one click.",
        "Note field on the final step.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Four phones with the steps for adding an order item: category, dish, size, comment" },
    },
  ],

  faq: {
    sub: "What restaurateurs ask about order taking in IQ Rest. Can't find your question? Message us on WhatsApp.",
    items: [
      { q: "Can several waiters work at the same time from different devices?", a: "Yes. Each waiter signs into the shared restaurant account from their own phone or tablet — everyone sees the same tables, orders and statuses in real time. Changes made by one waiter appear instantly for the others, without conflicts or locks." },
      { q: "Can waiters use their personal devices (BYOD)?", a: "Yes. It's a browser web app — nothing to install. The waiter opens a link, signs into the restaurant account from their iPhone, Android or personal tablet, and starts working. At the end of the shift they simply sign out." },
      { q: "Can required options be added to dishes (size, doneness, etc.)?", a: "Yes. Every dish can have any number of option groups — required (e.g. 'Size': Small / Medium / Big) and optional ('Doneness': rare / medium / well done). Options can change the price (+€1.00). If a group is required, the system won't let the guest or waiter add the dish without choosing." },
      { q: "Can guests add notes or extras to a dish (bread, sauce)?", a: "Yes. The last step of adding has a free-text note field ('no onions', 'well done', 'allergic to nuts'). Extras are separate priced modifiers ('+ BBQ sauce +€1.50', '+ Bread +€2.00'). Notes are shown on the kitchen display, highlighted in colour." },
      { q: "Is there order statistics?", a: "Yes. The analytics section shows: revenue by day and hour, average ticket, top dishes, guest → order conversion, service speed (time from Pending to Served). This helps plan shifts, purchases and spot underperforming dishes." },
      { q: "Can orders be split or moved between tables?", a: "Yes, both scenarios are supported. To split — tick the items that go into a new ticket (for guests paying separately). To move — open the order card, pick a new table; the entire order moves there. No manual maths, no leaving the panel." },
    ],
  },
};
