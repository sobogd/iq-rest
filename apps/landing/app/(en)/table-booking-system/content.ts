import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "en",
  slug: "table-booking-system",
  trackPrefix: "l_en_bookings",

  meta: {
    title: "Table Booking 24/7 for Restaurants | IQ Rest",
    description:
      "Table booking 24/7 for restaurants: guests reserve themselves through the QR menu or website. Calendar by table, automatic confirmations and reminders. Not a single missed guest. 14 days free.",
    canonical: "https://iq-rest.com/table-booking-system",
    ogLocale: "en_US",
    ogTitle: "Table Booking 24/7 — guests book themselves",
    ogDescription:
      "Guests reserve tables via the QR menu or website. Calendar, automatic confirmations, reminders. Not a single missed guest.",
    brandLine: "IQ Rest — Table Booking for Restaurants",
  },

  hero: {
    headline: "Table booking 24/7 — guests reserve themselves.",
    cta: "Set Up Table Booking",
    sub: "Guests book tables through the QR menu or a direct link. Calendar by table, automatic confirmations and reminders. Not a single missed guest and no rush-hour phone calls.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostess managing reservations from a tablet at the restaurant entrance",
  },

  scan: {
    heading: "Launch table booking",
    headingAccent: "in 5 minutes.",
    sub: "Connect the calendar, add tables with photos and capacity — guests start booking the same day.",
    cta: "Enable booking",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Booking form",
      heading: "Guests book themselves — by date, time and party size.",
      body: "The guest opens the QR menu or a direct link, picks the date, time and party size — and immediately sees the available tables, each with a photo, description (terrace, by the window, banquette near the bar) and capacity. Confirmation is sent automatically by email and WhatsApp.",
      bullets: [
        "Pick a table by photo, description and capacity.",
        "Automatic confirmation and a reminder one hour before the visit.",
        "Minimum fields in the form: name, phone, party size.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Guest books a restaurant table from a phone: date, time, party size and table picker" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Booking calendar",
      heading: "Calendar by day and table — see everything at a glance.",
      body: "The admin panel shows a calendar of bookings broken down by table, day, week and month. Free slots, taken tables, confirmed and unconfirmed reservations all on a single screen. Works on a tablet on the floor and a laptop in the office.",
      bullets: [
        "Day, week and month views.",
        "Break down by table: who, when, how many guests.",
        "Move, cancel or confirm a booking with a single tap from the phone.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Booking calendar in the IQ Rest admin panel on two tablets: daily Gantt by tables and monthly view" },
    },
  ],

  faq: {
    sub: "What restaurateurs ask about table booking in IQ Rest. Can't find your question? Message us on WhatsApp.",
    items: [
      { q: "Can I choose which days and hours are available for booking?", a: "Yes. The admin panel lets you set working hours and available weekdays — the system won't show unavailable slots to guests. You can close a specific date (corporate event, private booking) or turn the whole calendar off temporarily." },
      { q: "Can I upload a photo for each table?", a: "Yes. Each table can have a photo, description (terrace, by the window, banquette by the bar) and capacity. The guest sees the exact table they are booking and makes an informed choice — this reduces unmet expectations." },
      { q: "Can I disable booking on specific dates?", a: "Yes. The calendar lets you close specific dates (holidays, private events, refurbishment) or whole weekdays. On those dates guests see a 'booking temporarily unavailable' message." },
      { q: "Can I customise which fields are collected from the guest?", a: "Yes. The default set: name, phone, email, party size. You can add custom fields (occasion, allergies, special requests) or remove unnecessary ones to keep the form as short as possible." },
      { q: "Can I limit the number of guests per table?", a: "Yes. Each table has a 'capacity' setting — the system won't let a 2-seater be booked for 6. On larger tables you can set a minimum so small groups don't take the 'eight-seater' away from larger parties." },
      { q: "How hard is the booking setup?", a: "It takes very little time. Three steps: (1) add tables with names, photos and capacity, (2) enable booking mode in settings, (3) share the link or QR code with guests. Full launch takes 5–10 minutes." },
      { q: "Can I use the booking system on my own domain?", a: "Yes. We support a custom domain with an SSL certificate: guests book on your restaurant's address (e.g. booking.yourrestaurant.com). We help with the DNS setup; the process takes 5–10 minutes." },
      { q: "Can I configure automatic or manual confirmation?", a: "Yes, the mode is set in the settings. With automatic confirmation, the guest receives a confirmation immediately after submitting the form and the booking is considered accepted. With manual confirmation, the request lands in the admin panel with 'awaiting confirmation' status — the manager reviews it and either confirms or declines. Manual mode is useful for limited table counts or strict guest policies." },
      { q: "Do you take a commission on bookings?", a: "No. Table booking is fully included in the Pro plan — no percentage on guests, no per-slot fee, no aggregator commissions. One fixed monthly fee and unlimited bookings." },
    ],
  },
};
