import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurant Reservation System — 24/7 Table Bookings, No Phone Calls",
    description:
      "Accept restaurant table reservations 24/7 from your QR menu and website. White-label booking widget, email reminders, fewer no-shows. 14-day free trial.",
    canonical: "https://iq-rest.com/en/reservations",
    ogLocale: "en_US",
    ogTitle: "Restaurant Reservations — 24/7 Table Booking System for Restaurants",
    ogDescription:
      "Stop missing bookings while you cook. Guests book 24/7 from your QR menu, get email reminders, and you cut no-shows. 14-day free trial.",
  },

  hero: {
    title: "Stop missing bookings while you cook.",
    subtitle:
      "Accept restaurant table reservations 24/7 — directly from your QR menu, website and Instagram. Guests pick a date, time and party size, you confirm in one tap, email reminders go out automatically. Fewer phone calls, fewer no-shows, more covers per night.",
    trustLine: "4.9 · 500+ restaurants in 30+ countries",
  },

  seo: {
    description:
      "A full restaurant reservation system built into your QR menu. Guests book a table from your menu, your website, your Instagram bio link or a Google Maps button — anytime, day or night. You see new bookings in real time, confirm or decline in one tap, and the system sends email reminders that drastically cut no-shows. No OpenTable cut, no commission per cover, no contract.",
    fullDescription:
      "Phone reservations are dying. Tourists won't call (different country code, language barrier), millennials won't call (text-first generation), and you lose half the bookings during service when nobody picks up. IQ Rest reservations live where your guests already are: on your menu, in their phone's browser, on your Instagram bio link.\n\nThe booking flow is two screens — pick date and party size, leave a name and phone, optionally add a note ('birthday', 'allergy: nuts', 'high chair please'). You receive the booking instantly with a one-tap confirm/decline. Confirmed guests get an automatic email reminder 24h before, which alone cuts no-shows by ~30%. You can also set max covers per slot, blackout dates, and which tables are bookable vs walk-in only.\n\nUnlike OpenTable or TheFork, there's no per-cover commission, no separate app to download, and no third party between you and the guest. The booking is yours, the data is yours, and the system is part of your subscription — not a per-reservation tax.",
    benefitsHeading: "Why restaurants ditch OpenTable for IQ Rest reservations",
    benefits: [
      "24/7 bookings from QR menu, website, Instagram, Google Maps button",
      "No commission per cover — flat subscription, keep 100% of revenue",
      "Auto email reminders cut no-shows by ~30% on average",
      "One-tap confirm / decline from your phone, no waiting room",
      "Max-covers-per-slot, blackout dates, table-level booking rules",
      "Special requests (allergies, birthdays) captured cleanly with each booking",
    ],
  },

  pricing: {
    heading: "One plan.",
    headingAccent: "Unlimited bookings.",
    sub: "Reservations, QR menu, online ordering and AI translation — all in one flat price. No per-cover fees, no commission, no contract.",
  },

  faq: {
    sub: "Everything restaurant owners ask about online reservations. Don't see yours? Ping us on WhatsApp — real humans reply.",
    items: [
      {
        q: "Do you take a commission per booking like OpenTable or TheFork?",
        a: "Zero. Reservations are part of your flat monthly subscription — book 10 covers a day or 1,000, the price is identical. No per-cover fee, no per-reservation tax, no take from your revenue. Compared to OpenTable's €1–€2.50 per cover, a 50-cover-a-day restaurant saves €1,500–€3,750 a month.",
      },
      {
        q: "How do guests book — do they need to download an app?",
        a: "No app. They scan your QR or click your booking link — date, time, party size, name, phone, optional note. Done. The whole flow is under 30 seconds and works on any browser. You can also embed the booking form directly on your website or share a clean booking URL on Instagram.",
      },
      {
        q: "Can I confirm bookings manually or do they auto-confirm?",
        a: "Both modes — your choice per slot or per day. Auto-confirm if you trust your availability and want to look responsive 24/7. Manual confirm if you want to vet bookings (busy weekends, special events). You receive the booking instantly and confirm with one tap from your phone.",
      },
      {
        q: "How does the system handle no-shows?",
        a: "Automatic email reminders go out 24h and (optionally) 2h before the booking — this alone cuts no-shows by ~30% versus calls or no-reminder systems. You can also require a phone number, mark guests as 'no-show' in the dashboard, and over time the system flags repeat offenders.",
      },
      {
        q: "Can I limit how many covers I take per night?",
        a: "Yes. Set max covers per time slot, max covers per day, and blackout dates (closures, private events). You can even mark specific tables as 'bookable' vs 'walk-in only', so your prime window seats stay free for serendipity. Tourists and locals book from the same system without ever stepping on your floor plan.",
      },
    ],
  },

  finalCta: {
    heading: "Bookings while you cook.",
    headingAccent: "Reminders so they show up.",
    sub: "Accept reservations 24/7 from your QR menu, website and Instagram. 14-day free trial, no credit card, no per-cover commission.",
  },
};
