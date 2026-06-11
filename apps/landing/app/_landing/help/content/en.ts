import type { HelpDoc } from "../types";

// EN help guide. Section ids shared across locales; labels match the English
// dashboard UI.
export const en: HelpDoc = {
  metaTitle: "How to use IQ Rest — step-by-step guide",
  metaDescription:
    "Complete IQ Rest guide: sign-up, menu, orders, reservations, kitchen display and settings — for restaurants.",
  h1: "Help",
  intro: "A detailed guide to IQ Rest — from sign-up to the finer settings.",
  banner: {
    title: "It's simpler than it looks",
    sub: "A step-by-step guide: from sign-up to the finer settings — anyone can do it.",
    cta: "How to use it",
  },
  tipLabel: "Tip",
  noteLabel: "Note",
  sections: [
    {
      id: "start",
      title: "1. Getting started",
      blocks: [
        { type: "h3", text: "What this system is" },
        {
          type: "p",
          text: "IQ Rest is a service for restaurants: you create an online menu with a QR code, take orders and table reservations straight from your guests' phones, while the kitchen and waiters work on tablet terminals. Everything is managed from a single admin panel (the dashboard).",
        },
        { type: "h3", text: "Sign-up and login" },
        { type: "p", text: "You can sign in three ways — pick any on the login screen:" },
        {
          type: "list",
          items: [
            "With Google — click “Continue with Google” and choose your account.",
            "With Apple — click “Continue with Apple”.",
            "By email — click “Continue with email”, enter your address, and we'll send a 6-digit code. Enter it on the next screen. No password needed.",
          ],
        },
        {
          type: "note",
          text: "By email you only get a one-time sign-in code — no spam, no newsletters.",
        },
        { type: "h3", text: "Creating a restaurant (onboarding)" },
        {
          type: "p",
          text: "On your first login the system walks you through a quick setup. After that a restaurant is created automatically with a sample menu template you'll later replace with your own.",
        },
        {
          type: "steps",
          items: [
            "Enter the restaurant name.",
            "Choose the cuisine type (it determines the starting menu template).",
            "Done: you land in the dashboard with a sample menu already filled in.",
          ],
        },
        {
          type: "note",
          text: "The currency is detected automatically from your region — no need to pick it at the start. You can change it later in Settings → Region.",
        },
        { type: "h3", text: "Dashboard overview" },
        {
          type: "p",
          text: "Navigation between sections: on desktop it's a top bar, on mobile a bottom bar. Sections: Menu, Orders, Reservations, Kitchen, Analytics and Settings.",
        },
        {
          type: "list",
          items: [
            "Next to the restaurant name in the top bar is a small connection indicator: a green dot means orders are syncing in real time.",
            "On the “Menu” page there's a “Preview” button — it opens your menu the way a guest sees it.",
            "Right there is a “Share” button — it shows the QR code and link to your menu (copy the link, download the QR or open the menu).",
          ],
        },
        {
          type: "tip",
          text: "Hit “Preview” after every menu change — you instantly see how it looks to a guest.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "The “Menu” section is the heart of the system. Here you build the structure: categories → dishes → options. Open it from the navigation.",
        },
        { type: "h3", text: "Categories and subcategories" },
        {
          type: "steps",
          items: [
            "Click “Add category” and enter a name (for example “Starters”).",
            "To edit a category — hover over it and click “Edit category”.",
            "Reorder categories with the “Up” / “Down” buttons — guests see them in exactly that order.",
            "You can create a “Group” (via “Add group”) — a section-category that holds other categories inside it.",
          ],
        },
        { type: "h3", text: "Adding dishes" },
        {
          type: "steps",
          items: [
            "Expand a category (arrow on the left) and click “Add dish”.",
            "Fill in the name, price and description.",
            "Add a photo: “Add photo” — upload your own, or click “Generate” and describe the dish in words for the AI to draw an image.",
            "Save. The dish appears in the category.",
          ],
        },
        {
          type: "tip",
          text: "A photo can be AI-generated: mention the angle, lighting or background (for example “Margherita pizza on a wooden board, top view”).",
        },
        { type: "h3", text: "Options and variants (modifiers)" },
        {
          type: "p",
          text: "Options are choices within a dish: size, doneness, extra ingredients. Each option has variants, and a variant can add a price surcharge (for example “+1.50 each”).",
        },
        {
          type: "list",
          items: [
            "Example: a “Size” option with variants “Small / Large (+2.00)”.",
            "Example: an “Extras” option with several variants where the guest picks one or more.",
          ],
        },
        { type: "h3", text: "Allergens and diets" },
        {
          type: "p",
          text: "For a dish you can mark allergens (gluten, nuts, etc.) and dietary labels (vegetarian, vegan). The guest sees them as icons in the public menu.",
        },
        { type: "h3", text: "Dish visibility" },
        {
          type: "p",
          text: "The “Hide dish” / “Show dish” button temporarily removes an item from the public menu without deleting it — handy when a dish has run out.",
        },
        { type: "h3", text: "Uploading a paper menu (scan)" },
        {
          type: "p",
          text: "If you already have a menu as a photo or PDF — don't type it in by hand. Use scanning:",
        },
        {
          type: "steps",
          items: [
            "Click the “Upload menu” banner (or “Upload your paper menu”).",
            "Add up to 5 files (photo/scan, up to 20 MB each) and click “Scan”.",
            "Wait up to a minute — the AI recognizes categories and dishes.",
            "Review what was recognized, check the items you want and click “Continue”.",
            "Choose: replace the current menu or add the new items to the existing one.",
          ],
        },
        {
          type: "note",
          text: "Examples from the starter template are removed when you save the scanned menu — that's normal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Tables and QR codes",
      blocks: [
        {
          type: "p",
          text: "Tables let you tie orders and reservations to specific spots and print personal QR codes. Section: Settings → Tables.",
        },
        { type: "h3", text: "Creating tables" },
        {
          type: "steps",
          items: [
            "Open Settings → Tables and click “Add table”.",
            "Enter the table number, number of seats and (optionally) a name — for example “Window”, “Bar”, “Terrace”.",
            "Add a table photo — guests see it and understand exactly where their table is.",
            "Set a table color — the table is highlighted in that color on the kitchen display and in the “Orders” section so staff find it quickly.",
            "Optionally add a short description.",
            "Save.",
          ],
        },
        {
          type: "note",
          text: "The table photo is for guests (a “where's my table” cue). The color is for staff (a quick visual marker of the table on the kitchen and in orders).",
        },
        { type: "h3", text: "Table QR code" },
        {
          type: "p",
          text: "Each table has its own QR code. A guest scans it with their phone and lands straight in that table's menu — the order is automatically tied to the right table.",
        },
        {
          type: "steps",
          items: [
            "Click “Show QR code” on the table you need.",
            "Click “Download QR” to save the image.",
            "Print it and place it on the table (on a stand, in the menu, on a sticker).",
          ],
        },
        {
          type: "tip",
          text: "The “Table link” is the same link as in the QR but as text. You can send it to a guest in a messenger.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Orders",
      blocks: [
        { type: "h3", text: "How a guest orders" },
        {
          type: "p",
          text: "The guest scans the QR on the table → the menu opens → they pick dishes, options and quantity → place the order. The order instantly appears in your dashboard and on the kitchen/waiter terminal.",
        },
        {
          type: "note",
          text: "For guests to be able to order, “Accept orders” must be enabled in Settings → Orders. If it's off, the guest sees the menu but there's no order button.",
        },
        { type: "h3", text: "Handling orders in the dashboard" },
        {
          type: "p",
          text: "The “Orders” section shows the floor plan. Occupied tables are highlighted and show the number of active orders. Tap a table to open its orders.",
        },
        {
          type: "steps",
          items: [
            "Tap a table → “Start order” (or open an existing one).",
            "“Add item” → choose category → dish → options → set quantity and notes if needed (for example “no onions”).",
            "Click “Add” — the item goes into the order.",
          ],
        },
        { type: "h3", text: "Item statuses" },
        {
          type: "p",
          text: "Each item has a status: Pending → Cooking → Ready → Served. Tap an item to switch its status. Statuses sync with the kitchen in real time.",
        },
        { type: "h3", text: "Discounts, splitting, changing table" },
        {
          type: "list",
          items: [
            "Discount: “Add discount” — a percentage or fixed amount, on the whole order or a single item, with a reason.",
            "Split order: “Split order” — pick the items that go into a new, separate check.",
            "Change table: “Change table” — move the order to another table.",
            "Duplicate item: quickly add the same one again.",
          ],
        },
        { type: "h3", text: "Completing an order" },
        {
          type: "steps",
          items: [
            "When all items are served, click “Complete order”.",
            "Choose a payment method (if payment methods are configured).",
            "The order closes and leaves the active list.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kitchen (KDS)",
      blocks: [
        {
          type: "p",
          text: "The kitchen display (KDS) is a screen on a tablet for the cooks. New orders drop onto it in real time, and the cook marks dishes as ready.",
        },
        { type: "h3", text: "What the display shows" },
        {
          type: "list",
          items: [
            "Order cards with items, options and the time “on the pass”.",
            "Color-coded status: what's cooking, what's ready.",
            "A sound alert when a new order arrives.",
          ],
        },
        { type: "h3", text: "How to use it" },
        {
          type: "steps",
          items: [
            "Tap an item to move it to the next status (Cooking → Ready).",
            "Turn on sound with the “Enable sound” button — then new orders come with an audio alert.",
            "Use zoom to adjust card size to the tablet.",
            "Use filters to show only the categories you need (for example only the hot station).",
          ],
        },
        {
          type: "note",
          text: "If the tablet loses internet, a “No connection” warning appears. Connect Wi-Fi and orders will start coming again.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reservations",
      blocks: [
        {
          type: "p",
          text: "Guests can book a table through your menu, and you manage bookings in the “Reservations” section (“Month” / “Day” view).",
        },
        { type: "h3", text: "Setting up reservations" },
        { type: "p", text: "First enable and configure bookings: Settings → Reservations." },
        {
          type: "steps",
          items: [
            "Turn on “Enable reservations”.",
            "Choose the confirmation mode: “Automatic” (bookings confirm themselves) or “Manual” (you confirm each one).",
            "Set the “Booking duration” — how long the table is held for a guest.",
            "Fill in the “Weekly schedule”: for each day — open/closed, working hours, and a lunch break if needed.",
          ],
        },
        {
          type: "note",
          text: "You need tables to accept bookings. If there are none, the system will ask you to add tables first.",
        },
        { type: "h3", text: "Handling bookings" },
        {
          type: "list",
          items: [
            "New bookings awaiting a decision are gathered in the “Awaiting confirmation” block.",
            "“Confirm” / “Reject” buttons — for each booking.",
            "“Complete” — mark that the guest arrived and the booking is done.",
            "Switch between “Month” and “Day”, flip through the period with “Prev” / “Next”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Devices (tablets)",
      blocks: [
        {
          type: "p",
          text: "The kitchen, waiter and reservation terminals are separate tablets that connect to your account with a code. Section: Settings → Devices.",
        },
        {
          type: "note",
          text: "Devices are available on a paid plan or during an active trial.",
        },
        { type: "h3", text: "Connecting a tablet (pairing)" },
        {
          type: "steps",
          items: [
            "In the dashboard: Settings → Devices → “Add device”.",
            "Enter a name (for example “Kitchen — hot line”) and a type: Kitchen, Waiter or Reservations.",
            "Click “Generate code” — a 6-digit code appears (valid for 2 minutes).",
            "On the tablet, open the pairing screen and enter this code.",
            "The tablet connects and immediately starts working in the chosen role.",
          ],
        },
        { type: "tip", text: "If the code expired — just click “New code” and enter the fresh one." },
        { type: "h3", text: "Managing devices" },
        {
          type: "list",
          items: [
            "Statuses: Online / Offline / Awaiting pairing / Revoked.",
            "“Revoke” — disconnect the tablet (for example if it's lost). A new code is needed to sign in again.",
            "“Delete” — remove the device from the list permanently.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analytics",
      blocks: [
        {
          type: "p",
          text: "The “Analytics” section shows the key numbers for your venue: revenue, order count and their breakdown (for example by payment method and time). Use it to understand what sells best and when.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Settings",
      blocks: [
        {
          type: "p",
          text: "The “Settings” section opens as a set of section cards. At the top is the active-restaurant switcher (if you have more than one). Below — each card in order.",
        },
        { type: "h3", text: "Website" },
        {
          type: "list",
          items: [
            "Public menu URL — your unique menu address (you can set your own short slug and copy the link).",
            "The venue name (heading) on the public site.",
            "Accent color — the main color of buttons and highlights in the menu.",
            "Background — an image or video on the home screen; upload your own or generate a background with AI from a description.",
            "Menu layout — how dishes are displayed to the guest.",
          ],
        },
        { type: "h3", text: "Contacts and address" },
        {
          type: "p",
          text: "Phone, Instagram, WhatsApp and a map marker — all shown to the guest on your menu's contacts page.",
        },
        { type: "h3", text: "Region" },
        { type: "p", text: "Currency (used for all prices) and the venue's time zone." },
        { type: "h3", text: "Tables" },
        { type: "p", text: "Floor plan, seats and table QR codes — see section 3 in detail." },
        { type: "h3", text: "Devices" },
        {
          type: "p",
          text: "Pairing tablets for the kitchen display and waiter terminals — see section 7 in detail.",
        },
        { type: "h3", text: "Orders" },
        {
          type: "list",
          items: [
            "“Accept orders” — the main switch for taking orders.",
            "“Order mode” — Internal and/or WhatsApp.",
            "“Required fields” — what data the guest must provide (Name, Phone, Address).",
            "“Payment methods” — to integrate your restaurant's payment provider, contact support.",
          ],
        },
        { type: "h3", text: "Reservations" },
        {
          type: "p",
          text: "Enabling bookings, automatic or manual confirmation, duration and working hours — see section 6 in detail.",
        },
        { type: "h3", text: "Languages" },
        {
          type: "steps",
          items: [
            "Open Settings → Languages.",
            "Choose the languages your public menu is translated into (tap to add/remove).",
            "Set the default language.",
            "Texts are translated manually or with the “Translate with AI” button — the system translates dish names and descriptions into the chosen languages.",
          ],
        },
        { type: "h3", text: "Billing" },
        { type: "p", text: "Subscription plan, trial status and payment management." },
        {
          type: "list",
          items: [
            "Billed monthly or yearly (yearly is cheaper).",
            "“Subscribe” / “Switch” — pick or change a plan.",
            "“Manage” — change the payment method or cancel the subscription.",
          ],
        },
        {
          type: "note",
          text: "Billing is in EUR. To pay in another currency, contact support.",
        },
        { type: "h3", text: "Support" },
        {
          type: "p",
          text: "A built-in chat with our team in real time. Send a message — we'll reply right here.",
        },
        { type: "h3", text: "Switching and adding restaurants" },
        {
          type: "p",
          text: "If you have several venues, the restaurant switcher is at the top of the “Settings” section.",
        },
        {
          type: "steps",
          items: [
            "Open the restaurant switcher at the top of “Settings”.",
            "“Add restaurant” → enter a name.",
            "Choose “Duplicate current menu and settings” (quick start) or “Start from scratch” (an empty restaurant).",
            "Create it — and switch between restaurants anytime right here.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. The public menu for guests",
      blocks: [
        {
          type: "p",
          text: "The public menu is what a guest sees after scanning the QR. It's assembled automatically from your menu, branding and contacts.",
        },
        {
          type: "list",
          items: [
            "The menu address is set in Settings → Region (“Menu link”).",
            "Get the general QR code and menu link via the “Share” button on the “Menu” page.",
            "Each table has its own separate QR (Settings → Tables) that leads to that exact table's menu.",
            "The look (background, accent color, layout) is configured in the “Website” section.",
            "The “Preview” button opens the menu the way a guest sees it.",
          ],
        },
        {
          type: "tip",
          text: "After any menu/settings change, hit “Preview” to check how it looks to a guest.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. FAQ and nuances",
      blocks: [
        { type: "h3", text: "A guest can't place an order" },
        {
          type: "p",
          text: "Check Settings → Orders → “Accept orders” (must be on) and that at least one order mode is selected.",
        },
        { type: "h3", text: "Bookings aren't coming in" },
        {
          type: "p",
          text: "Make sure reservations are enabled in Settings → Reservations, tables are added, and the day isn't marked “Closed” in the schedule.",
        },
        { type: "h3", text: "The tablet won't connect" },
        {
          type: "p",
          text: "The code is valid for 2 minutes. If it expired — generate a new one in Settings → Devices. If the device was revoked — create a new code.",
        },
        { type: "h3", text: "A dish has run out" },
        {
          type: "p",
          text: "Don't delete it — click “Hide dish”. It disappears from the public menu, and you bring it back with “Show dish”.",
        },
        { type: "h3", text: "You need devices/terminals but don't have them" },
        {
          type: "p",
          text: "The “Devices” section is available on a paid plan or during an active trial. Check Settings → Billing.",
        },
        { type: "h3", text: "Still have questions" },
        {
          type: "p",
          text: "Write to us in Settings → Support — it's a built-in chat with our team.",
        },
      ],
    },
  ],
};
