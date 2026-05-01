import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Changelog — IQ Rest Updates & New Features",
    description:
      "Every release of IQ Rest in one place. New features, AI improvements and product launches for restaurant QR menus, online orders and reservations.",
  },
  pageTitle: "Changelog",
  pageSubtitle:
    "Every update we ship to make your restaurant QR menu, online orders and reservations smoother. Newest first.",
  readMore: "Read more",
  backToList: "Back to changelog",
  publishedOn: "Published on",

  entries: {
    // ──────────────────────────────────────────────────────────────────────
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "AI Dish Photos for Restaurant QR Menu | IQ Rest",
        description:
          "Generate stylistically consistent dish photos for your entire QR menu in one click. No stock photos, no photographer, no editing.",
      },
      title: "AI-Generated Dish Photos for Your Entire QR Menu",
      subtitle:
        "Stop searching stock galleries and stop scheduling photo shoots. IQ Rest now generates a complete set of mouth-watering dish photos in a single, consistent style — straight from your menu names.",
      intro:
        "Photographing every dish on your menu is expensive, slow and rarely consistent. Stock photo libraries leave gaps and the styling never quite matches your brand. IQ Rest closes that gap with built-in AI dish photography: type a dish name, get a high-quality photo that matches the rest of your menu's look. Every image is generated specifically for you, sized for both the QR menu and printable formats.",
      sections: [
        {
          title: "One Photo Style Across the Entire Menu",
          body: "When guests scroll through a menu, mismatched styles break the experience — one bright, one moody, one shot from above, one from the side. IQ Rest generates every photo in a single brand-consistent style: same lighting direction, same plate language, same background mood. The result feels like a real photo shoot, except every dish was rendered the moment you added it to the menu. As you add new dishes, the style is preserved automatically.",
        },
        {
          title: "From Dish Name to Plate in Seconds",
          body: "There is nothing to brief. You add a dish — say, 'Truffle Tagliatelle with Wild Mushrooms' — and IQ Rest creates the photo behind the scenes. The image is uploaded to your menu, optimized as WebP, and ready to display before you finish adding the next dish. If a photo doesn't quite match what you had in mind, regenerate it with one tap. Each restaurant gets free AI generations to start, with affordable top-ups if you want photos for an entire 80-dish menu.",
        },
        {
          title: "Optimized for Mobile and SEO",
          body: "Every generated image is encoded as a compressed WebP at 80% quality, then served from a Hetzner CDN in Nuremberg with smart subsampling. Pages stay fast on 4G, no skeletons, no layout shift. The photos are also indexable by Google Images — guests searching your dish names by photo can find your menu directly.",
        },
      ],
      benefitsTitle: "Why AI Dish Photos Matter",
      benefits: [
        "No stock photo subscriptions and no photographer fees",
        "Brand-consistent style across every dish on the menu",
        "New dishes get a matching photo automatically",
        "Compressed WebP — fast on mobile, no layout jumps",
        "Free generations included with every plan",
        "Regenerate any photo with one tap until it's perfect",
      ],
      conclusionTitle: "A Photo for Every Dish, Without the Production",
      conclusionBody:
        "Restaurants that include photos sell more high-margin dishes — that's not a guess, it's well-known revenue mechanics. The reason most menus don't have photos is the production cost. IQ Rest removes that cost entirely. Every dish you add gets a beautiful, brand-aligned photo before you finish setup. Pair it with QR ordering and watch upsell rates climb without lifting a camera.",
      ctaText: "Generate AI photos for every dish on your menu — free during your trial.",
      ctaButton: "Try it free",
    },

    // ──────────────────────────────────────────────────────────────────────
    "ai-restaurant-cover-background": {
      meta: {
        title: "AI Restaurant Cover Background Generator | IQ Rest",
        description:
          "Auto-generate a beautiful restaurant cover image for your QR menu in seconds. Matches your cuisine, mood and brand — no stock photos.",
      },
      title: "AI-Generated Restaurant Cover Background",
      subtitle:
        "Your QR menu opens with the right vibe even before guests scroll. IQ Rest now generates a custom cover background that matches your cuisine and atmosphere — automatically.",
      intro:
        "First impressions matter, especially when guests scan a QR code at the table. A generic cover image undermines everything you spent on interior design. IQ Rest now generates a unique, atmospheric cover image for every restaurant — based on the cuisine you pick during signup. Italian trattoria, Japanese izakaya, Spanish tapas bar — each gets a cover that feels right.",
      sections: [
        {
          title: "Tailored to Your Cuisine and Mood",
          body: "When you complete the signup wizard, IQ Rest takes the cuisine you selected and generates a cover that fits. Italian gets warm trattoria lighting and pasta in soft focus. Japanese gets clean lines and balanced composition. Mexican gets vibrant colours and street-food energy. The match is automatic but you can regenerate the cover any time, with your own creative direction if you want something specific.",
        },
        {
          title: "Optimized for QR Menu Hero Sections",
          body: "Cover images are generated at the exact aspect ratio used by the QR menu hero — sharp on every phone, no awkward cropping. They're encoded as WebP, served fast and lazy-loaded so the rest of the menu paints first. The cover sets the tone, then disappears as guests start browsing dishes.",
        },
        {
          title: "Brand Consistency Out of the Box",
          body: "The cover image style is paired automatically with the AI dish photos generated for your menu — same lighting language, same colour palette, same mood. Guests perceive your restaurant as cohesive and professionally designed, even if you set the whole thing up in five minutes from your phone.",
        },
      ],
      benefitsTitle: "Why an AI Cover Beats Stock",
      benefits: [
        "Unique to your restaurant — not a stock photo every other place is using",
        "Matched to the cuisine you selected during signup",
        "Same visual language as your AI-generated dish photos",
        "Sized correctly for the QR menu hero — no manual cropping",
        "Compressed WebP for fast mobile loading",
        "Regenerate any time with one tap",
      ],
      conclusionTitle: "A Cover That Says 'We Know What We're Doing'",
      conclusionBody:
        "When a guest scans your QR code, the first thing they see is your cover. A polished, atmospheric image signals quality before they read a single dish name. With IQ Rest, that polish is automatic — generated for free during signup, and regeneratable whenever you change your mind. No stock galleries, no design work, just a cover that fits.",
      ctaText: "Get a custom AI cover for your QR menu in under a minute.",
      ctaButton: "Start free trial",
    },

    // ──────────────────────────────────────────────────────────────────────
    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "3-Step Signup Wizard for Restaurant QR Menu | IQ Rest",
        description:
          "Pick cuisine, restaurant name, email — and IQ Rest builds your QR menu. The fastest signup in the QR menu industry.",
      },
      title: "3-Step Signup Wizard: From Email to Working QR Menu in Under a Minute",
      subtitle:
        "Pick your cuisine. Type your restaurant name. Confirm your email. Done — your QR menu is ready, with sample dishes and AI-generated photos.",
      intro:
        "Restaurant owners don't have time for a 10-screen signup form. So we cut it down to three. Pick the cuisine that matches your place. Type your restaurant name. Confirm your email. By the time you sign in for the first time, your QR menu is already populated with cuisine-appropriate sample dishes and matching AI photography. You can serve a guest within 60 seconds of starting signup.",
      sections: [
        {
          title: "Step 1 — Cuisine Selection",
          body: "Pick from a wide list of cuisines: Italian, Spanish, Japanese, Mexican, French, Mediterranean, Indian, American, café, bar, pizzeria and more. The choice drives every default in the wizard: sample dishes, AI cover style, default currency and starter category structure. You're not configuring anything — you're picking a starting point.",
        },
        {
          title: "Step 2 — Restaurant Name",
          body: "Type the name as guests will see it. We use it everywhere: the QR menu hero, the page title, the SEO slug, the social share preview. There is no separate brand-name vs display-name decision — one field, one source of truth. Skip-able if you want to defer the decision; we'll fill in a placeholder you can rename later.",
        },
        {
          title: "Step 3 — Email or Google Sign-In",
          body: "Confirm with email + one-time code, or tap 'Sign in with Google' for instant account creation. No password to remember. The moment you confirm, the wizard runs the menu seeder behind the scenes — categories created, sample dishes inserted, AI photos generated, restaurant cover ready. You land directly in the dashboard with a working menu.",
        },
      ],
      benefitsTitle: "Why a 3-Step Signup Beats a Form",
      benefits: [
        "Under 60 seconds from landing page to working QR menu",
        "Zero decisions you can't change later — just defaults to start from",
        "Sample dishes pre-populated by cuisine — instant content to edit",
        "AI photos and cover image ready by the time you sign in",
        "Google sign-in option — no password to manage",
        "Anonymous progress saved if you bounce mid-wizard",
      ],
      conclusionTitle: "The Fastest QR Menu Setup, Period",
      conclusionBody:
        "Most QR menu services make you fill in dozens of fields before you see anything useful. IQ Rest reverses that — we give you a working menu first, then let you customize. The wizard removes every barrier between curiosity and a usable product. Restaurants that finish signup in under 60 seconds are dramatically more likely to actually publish their menu, take their first order and stay subscribed.",
      ctaText: "Start the 3-step wizard now — your menu will be live in 60 seconds.",
      ctaButton: "Start free trial",
    },

    // ──────────────────────────────────────────────────────────────────────
    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "AI-Generated Sample Menu on Signup | IQ Rest",
        description:
          "Skip the empty-state. IQ Rest auto-generates a starter QR menu based on your cuisine — categories, dishes, prices, and photos.",
      },
      title: "AI-Built Sample Menu Right After Signup",
      subtitle:
        "No more staring at an empty dashboard. IQ Rest seeds your account with cuisine-appropriate categories, dishes and AI photos so you can edit, not start from scratch.",
      intro:
        "The hardest part of any new tool is the empty-state. New restaurant owners sit down, see a blank menu and close the tab. IQ Rest fixes that by populating your menu the moment you sign up. Pick Italian — get antipasti, pasta, pizza, dessert. Pick Japanese — get sushi, ramen, donburi, sake. Each category has 6 to 10 starter dishes with AI-generated photos in a consistent style. Your job becomes editing prices and tweaking names, not building from zero.",
      sections: [
        {
          title: "Cuisine-Aware Categories and Dishes",
          body: "The seeder doesn't just dump random dishes. It uses the cuisine you picked in the signup wizard to pull a curated set of categories that make sense for your style of restaurant. A pizzeria gets 'Pizza Classica', 'Pizza Speciale', 'Antipasti', 'Bevande'. A French bistro gets 'Entrées', 'Plats principaux', 'Fromages', 'Desserts'. The starter content matches the convention diners expect for that cuisine.",
        },
        {
          title: "Photos and Prices Out of the Box",
          body: "Every starter dish comes with an AI-generated photo in a consistent style and a sensible default price denominated in your local currency (auto-detected by geolocation). Prices are placeholders — you'll change them — but they make the menu look real immediately, so you can preview the QR menu and feel what the final result will look like. This is critical for showing partners, getting feedback or just deciding 'yes, this is the tool we want to use'.",
        },
        {
          title: "Edit, Don't Start From Scratch",
          body: "Once seeded, every dish carries an isExample flag. As soon as you edit a dish — change its name, price, or description — the flag drops off. The remaining example dishes stand out visually so you know what's still placeholder content. This separation makes it obvious what's done and what's still to do, turning the empty-state problem into a productive editing flow.",
        },
      ],
      benefitsTitle: "Why a Pre-Built Menu Wins",
      benefits: [
        "Zero empty-state — open the dashboard and see a working menu",
        "Categories and dishes match the cuisine you picked",
        "AI photos for every starter dish in a unified style",
        "Local currency auto-detected, default prices in place",
        "Example flag fades as you edit — clear progress signal",
        "Show stakeholders a real-looking menu within minutes",
      ],
      conclusionTitle: "Skip the Blank Page",
      conclusionBody:
        "Building a menu from scratch is intimidating. Editing one is easy. IQ Rest gives you a complete starter menu the moment you sign up, then lets you adjust it to match your real offering. The result: more restaurants finish setup, more menus actually go live, more guests scan QR codes that lead to real, edited, production menus.",
      ctaText: "Sign up and get a fully-built starter menu in your cuisine.",
      ctaButton: "Build my menu",
    },

    // ──────────────────────────────────────────────────────────────────────
    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interactive Menu Tour for First-Time Users | IQ Rest",
        description:
          "A 7-step interactive guide walks new restaurant owners through the QR menu dashboard — no docs, no videos, just hands-on.",
      },
      title: "7-Step Interactive Menu Tour on First Visit",
      subtitle:
        "We don't make you read documentation. The first time you open the menu, IQ Rest walks you through it — add category, add dish, edit, sort, preview, share, all in seven taps.",
      intro:
        "Most SaaS products bury onboarding in a help center nobody reads. IQ Rest takes the opposite approach: the first time a new user lands on the menu page, an interactive tour spotlights each key action in sequence. Add a category. Add your first dish. Edit it. Toggle visibility. Reorder. Preview the live menu. Share with a guest. By step seven, you've used every feature you'll need 95% of the time.",
      sections: [
        {
          title: "In-Product, Not in a Knowledge Base",
          body: "Every step of the tour highlights the actual UI element on your screen. A bubble explains what the element does and why it matters. There are no screenshots — the screenshot IS your dashboard. As you tap through, you're learning by doing, not by reading. Skip at any time; the tour persists across sessions until you complete it or dismiss it permanently.",
        },
        {
          title: "Designed Around the Real Workflow",
          body: "The seven steps are not a feature dump — they map to the workflow a new restaurant actually performs. Add categories first (drinks, mains, desserts), then dishes, then refine each dish, then organize the order they appear, then preview to make sure it looks right, then share via QR. By the end, you've completed the loop from empty menu to QR code on a printed table card.",
        },
        {
          title: "Localized in 35 Languages",
          body: "The tour copy is translated into every language IQ Rest supports — same as the rest of the dashboard. Spanish-speaking owners get Spanish bubbles, German owners get German, Catalan owners get Catalan. Nothing in the tour assumes English literacy.",
        },
      ],
      benefitsTitle: "Why an In-Product Tour Beats a Help Center",
      benefits: [
        "Learn by doing, not by reading docs",
        "7 steps cover ~95% of the workflow",
        "Dismiss any time — never blocks the dashboard",
        "Persists across sessions until completed or skipped",
        "Localized in 35 languages — no English required",
        "No videos to load — instant, native UI overlay",
      ],
      conclusionTitle: "From Confused to Confident in Seven Steps",
      conclusionBody:
        "The hardest moment in any product is the first 30 seconds. The user opens the dashboard, looks around, and either gets it or bounces. IQ Rest's interactive tour removes that risk — within a minute, every new user knows where to add a dish, how to preview, how to share. Tour completion correlates strongly with successful menu publication. We're not just teaching the product — we're getting the menu live.",
      ctaText: "Sign up and get walked through your first QR menu in seven taps.",
      ctaButton: "Start free trial",
    },

    // ──────────────────────────────────────────────────────────────────────
    "custom-landing-page-per-country": {
      meta: {
        title: "Country-Specific Landing Pages for Restaurant QR Menu | IQ Rest",
        description:
          "Visitors from Spain see a landing page tailored to Spanish restaurants. France sees French. 35 countries, 35 conversion-tuned pages.",
      },
      title: "Custom-Tailored Landing Page in Every Language",
      subtitle:
        "Visitors don't get an auto-translated page anymore. Each of the 35 supported languages has its own landing page, written for that market.",
      intro:
        "Auto-translated landing pages convert badly. The grammar is off, the cultural references are wrong, and the local payment terms feel imported. IQ Rest now ships a unique landing page for each of the 35 supported languages — written for the market, not just translated. Spanish visitors get a page about restaurantes y cafeterías. French visitors get cafés et bistrots. German visitors get Restaurants und Imbisse. Each page leads with the value proposition that matters most to that audience.",
      sections: [
        {
          title: "One Page Per Language, Not Auto-Translation",
          body: "Each landing lives at /<locale> as a standalone Next.js route. The texts are in TypeScript objects — versioned, type-checked, deployable independently. We can A/B test a Spanish hero variant without touching German. We can localize a pricing call-out for Brazilian Real without affecting Euro markets. The result is faster iteration on the landings that drive actual conversion.",
        },
        {
          title: "Geolocation Auto-Routes Visitors",
          body: "The first time a visitor lands on iq-rest.com, our nginx geo module reads their country code and redirects to the right /<locale>. Spanish IPs land on /es. German IPs land on /de. Brazil lands on /pt. We even route Catalan-speaking parts of Spain to /ca instead of /es. Visitors never see a 'pick your language' modal — they see their language by default.",
        },
        {
          title: "Brand-Wide hreflang and Canonical Tags",
          body: "All 35 landings reference each other via hreflang tags so Google indexes the right one for each query. Canonical URLs point to the per-locale URL, not a generic root. The setup follows Google's international SEO guidelines exactly, so each landing competes in its own language without cannibalizing the others.",
        },
      ],
      benefitsTitle: "Why Per-Country Landings Convert Better",
      benefits: [
        "Native phrasing in each market — not auto-translated",
        "Geo-routing serves the right page automatically",
        "hreflang and canonical tags follow Google guidelines",
        "Catalan visitors in Catalonia see Catalan, not Castilian",
        "Currency, pricing and CTAs localized per market",
        "Independent A/B testing per locale without cross-contamination",
      ],
      conclusionTitle: "35 Languages, 35 Front Doors",
      conclusionBody:
        "If a Spanish restaurant owner lands on a half-translated English page with US-style pricing, they bounce. If they land on a page that speaks to them in Spanish, with Euro pricing and Spanish references, they convert. IQ Rest now does the second thing in every market we serve — 35 landings, 35 conversion-tuned front doors, all geo-routed automatically.",
      ctaText: "Try IQ Rest in your language — landing tailored to your market.",
      ctaButton: "Open my language",
    },

    // ──────────────────────────────────────────────────────────────────────
    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Sign in with Google for Restaurant QR Menu Dashboard | IQ Rest",
        description:
          "Skip passwords and email codes. Tap 'Sign in with Google' to access your restaurant QR menu dashboard in one second.",
      },
      title: "Sign in with Google — One-Tap Access to Your QR Menu",
      subtitle:
        "Skip OTP emails and forgotten passwords. Tap 'Continue with Google' and you're inside the dashboard in under a second.",
      intro:
        "Email + one-time code authentication is secure but slow. Type your email, wait for the code, switch to your inbox, copy the code, paste, submit. That's a 30-second flow at best. IQ Rest now offers Sign in with Google as an alternative: tap one button, pick your Google account, you're inside. No password to forget, no inbox round-trip, no friction.",
      sections: [
        {
          title: "Native Google OAuth, Not a Redirect Loop",
          body: "We use Google's official Identity Services SDK with the One Tap UI on supported browsers. The flow happens in a native popup, not a redirect to Google's domain and back. The whole thing takes about a second after the first tap. We verify the Google ID token server-side against Google's public keys, so the flow is cryptographically secure end to end.",
        },
        {
          title: "Same Account, Either Method",
          body: "If you signed up with email-OTP and later choose Google, we link the accounts by email. You can switch between methods on every sign-in. There's no 'separate Google account' to manage, and you don't lose your menu by signing in differently. We also forward your dashboard locale during Google sign-in so emails to your account go in the right language from day one.",
        },
        {
          title: "Mobile-First — Works on iOS Safari and Android Chrome",
          body: "Google's official SDK has historically been brittle on mobile. We engineered around that by overlaying a real Google button on top of our UI rather than triggering programmatic clicks (which iOS Safari now blocks). The result: the button works on every modern phone browser, no installation, no app store.",
        },
      ],
      benefitsTitle: "Why Google Sign-In Beats Email OTP",
      benefits: [
        "One tap to sign in — no email round-trip",
        "No password to remember or reset",
        "Same account whether you use email or Google",
        "Cryptographically verified server-side via Google ID token",
        "Works reliably on iOS Safari and Android Chrome",
        "Locale forwarded so emails stay in your language",
      ],
      conclusionTitle: "The Fastest Way Back Into Your Dashboard",
      conclusionBody:
        "Restaurant owners check their menus dozens of times a week — between services, after a print job, when adjusting prices. Every second saved on sign-in compounds. Google sign-in turns a 30-second OTP flow into a one-second tap. Email-OTP stays available for owners who prefer it, but most users will choose Google after trying it once.",
      ctaText: "Skip the password — sign in with Google in one tap.",
      ctaButton: "Open dashboard",
    },

    // ──────────────────────────────────────────────────────────────────────
    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Multilingual Email Notifications in 35 Languages | IQ Rest",
        description:
          "Trial reminders, support replies, subscription emails — every notification IQ Rest sends arrives in your dashboard language.",
      },
      title: "Multilingual Email Notifications in All 35 Languages",
      subtitle:
        "Every email IQ Rest sends — support replies, trial reminders, subscription receipts — arrives in the language you set in your dashboard. Including right-to-left layouts.",
      intro:
        "An email in the wrong language is friction at best, a deletion at worst. IQ Rest now sends every transactional email in the language you set in your dashboard, across all 35 supported locales. Welcome emails, trial-expiring reminders, subscription confirmations, support replies — all arrive in your language, with proper grammar and culturally appropriate phrasing. Right-to-left languages like Arabic and Persian get correctly mirrored layouts.",
      sections: [
        {
          title: "preferredLocale Travels With Your Account",
          body: "Each user has a preferredLocale field set the first time they sign in. Whether you signed up via email-OTP, Google or via the wizard, your locale is captured and persisted. Every backend job that emits an email — Stripe webhooks, support reply notifications, scheduled cron tasks — pulls the user's preferredLocale and uses it to pick the right template. Switch locale in the dashboard and the next email reflects the change.",
        },
        {
          title: "RTL Templates for Arabic and Persian",
          body: "Right-to-left layouts aren't just translation — the entire visual hierarchy flips. We ship dedicated RTL templates for Arabic and Persian: navigation flows right-to-left, numbers in Arabic-Indic where appropriate, brand logo positioned correctly. The result is an email that feels native to RTL readers, not a translated LTR template with broken alignment.",
        },
        {
          title: "Translated by Restaurant Industry Experts",
          body: "Generic translation services produce literal but stilted translations. We translated every template using cuisine and hospitality terminology that sounds natural to restaurant operators in each market. 'Trial' becomes 'período de prueba' in Spanish (not 'juicio'). 'Reservation' becomes 'Reservierung' in German (not 'Reservation'). The level of detail compounds — restaurants notice when a tool speaks their language properly.",
        },
      ],
      benefitsTitle: "Why Multilingual Emails Matter",
      benefits: [
        "All transactional emails in your dashboard language",
        "preferredLocale persists across sign-ins",
        "RTL layouts for Arabic and Persian",
        "Hospitality-appropriate terminology per language",
        "Switching locale updates future emails immediately",
        "35 languages including Catalan, Slovenian, Estonian, Latvian",
      ],
      conclusionTitle: "Emails That Speak Your Language",
      conclusionBody:
        "Communication that lands in the wrong language is communication that doesn't work. IQ Rest sends every email in the language you actually use, with the layout and terminology that fits. It sounds small until you're a Spanish restaurant owner getting an English-only trial expiry alert and missing it. Now you don't.",
      ctaText: "Sign up and get your dashboard plus every email in your language.",
      ctaButton: "Start free trial",
    },

    // ──────────────────────────────────────────────────────────────────────
    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "iOS-Native Mobile Restaurant Dashboard | IQ Rest",
        description:
          "Bottom tab navigation, safe-area handling, no-zoom inputs — the IQ Rest mobile dashboard feels like a native app on iPhone.",
      },
      title: "iOS-Native Feel on Your Phone",
      subtitle:
        "Bottom tab navigation, full safe-area awareness, no-zoom form inputs and instant page transitions. Managing your QR menu on a phone now feels like using a native iOS app.",
      intro:
        "Most restaurant SaaS dashboards are desktop-first afterthoughts on mobile. IQ Rest is the opposite — designed for owners who run their menu from their phone between services. The mobile dashboard now uses bottom tab navigation, respects iPhone safe-area insets, prevents the iOS form-input zoom and uses near-instant SPA transitions. It looks and feels like a native app, except there's no app to install.",
      sections: [
        {
          title: "Bottom Tab Navigation, Not a Hamburger",
          body: "Hamburger menus on mobile are slow — tap to open, tap the item, wait for the page. We replaced the desktop sidebar with a bottom tab bar on phones: Menu, Orders, Reservations, Settings. One thumb-friendly tap, instant navigation. The active tab uses your brand accent colour so the current location is always obvious.",
        },
        {
          title: "Safe-Area Insets and Home Indicator",
          body: "Modern iPhones have a home indicator at the bottom and a notch at the top. Web apps that ignore this end up with their UI overlapping the indicator or hidden behind the notch. We use env(safe-area-inset-*) everywhere — bottom nav sits above the home indicator, content padding accounts for the dynamic island. The result feels designed for the device, not adapted from a desktop browser.",
        },
        {
          title: "No-Zoom Inputs and Instant Form Submit",
          body: "iOS Safari zooms forms with input font-size below 16px. We bumped every input to 16px and configured the viewport with maximum-scale=1, so taps don't trigger the zoom-and-jump that breaks every other web dashboard. Form submissions are server actions with optimistic UI — the change appears immediately, network confirms in the background.",
        },
      ],
      benefitsTitle: "Why Native-Feel Matters on Mobile",
      benefits: [
        "Bottom tab nav — one-tap access to every section",
        "Safe-area aware — no overlap with home indicator or notch",
        "16px inputs — no iOS zoom-and-jump on form taps",
        "Active tab uses your brand accent colour",
        "SPA transitions — no full page reloads between sections",
        "No app to install — works in Safari and Chrome",
      ],
      conclusionTitle: "A Web Dashboard That Feels Like an App",
      conclusionBody:
        "The line between web and native is mostly a question of attention to detail. IQ Rest's mobile dashboard pays that attention — bottom nav, safe-area, no-zoom, instant transitions — and the result is something you'd swear was built with Swift. Except it works on Android too, and there's nothing to install or update through an app store.",
      ctaText: "Open IQ Rest on your phone and feel the difference.",
      ctaButton: "Try free for 14 days",
    },

    // ──────────────────────────────────────────────────────────────────────
    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "GDPR Cookie Consent Banner for Restaurant Website | IQ Rest",
        description:
          "Lawful consent banner, AEPD-aligned, with no third-party scripts. Cookieless analytics fire even before consent.",
      },
      title: "GDPR-Compliant Cookie Consent Banner",
      subtitle:
        "Custom-built consent banner with no third-party CMP, no script tag from Cookiebot or OneTrust. Aligned with AEPD and ePrivacy guidance, with cookieless analytics that fire before consent.",
      intro:
        "Every commercial website in the EU needs a cookie consent banner. Most use third-party CMPs that drag in heavy scripts and slow the page. IQ Rest built its own, lightweight, AEPD-aligned consent banner that's part of the page bundle — no extra DNS lookups, no third-party tracking. Visitors see a clear Accept / Reject choice, with both buttons styled equally (the dark pattern of hiding 'reject' is illegal in many EU countries — we don't do it).",
      sections: [
        {
          title: "AEPD and ePrivacy Aligned",
          body: "Spanish AEPD and the broader ePrivacy directive require equal-prominence Accept and Reject buttons. Many CMPs offer a dark-pattern 'huge accept, tiny reject' default. We refuse that pattern — both buttons are the same size, same style, just different colours. Visitors who reject are tracked via cookieless aggregate counters only; we never store an identifier on their device, so no first-party cookie remains after a reject.",
        },
        {
          title: "No Third-Party Scripts",
          body: "Most consent banners load Cookiebot, OneTrust or similar from a CDN. That adds 50-100KB of JavaScript, an extra DNS lookup and a third-party data-sharing relationship to disclose in your privacy policy. IQ Rest's banner is part of the landing-page bundle — no external requests, no third-party data sharing, faster page load.",
        },
        {
          title: "Privacy, Cookie and Terms in Modals",
          body: "Clicking 'Privacy Policy', 'Cookie Policy' or 'Terms' in the banner opens a modal — no page navigation, no losing your scroll position on the landing. The full legal text is right there, scrollable, with proper headings. After reading, close the modal and pick Accept or Reject. The flow is friction-free for the user and lets us avoid extra page jumps that would hurt landing-page conversion.",
        },
      ],
      benefitsTitle: "Why Our Banner Beats Third-Party CMPs",
      benefits: [
        "AEPD and ePrivacy aligned — equal-prominence Accept/Reject",
        "No third-party scripts, no extra DNS lookups",
        "Privacy/Cookie/Terms in modals — no page jumps",
        "Cookieless analytics fire even before consent — never lose data",
        "First-party cookie removed on Reject",
        "Lightweight — part of the landing bundle",
      ],
      conclusionTitle: "Compliance Without Conversion Drag",
      conclusionBody:
        "Cookie consent is non-negotiable in the EU but it doesn't have to slow your page or hurt your conversion. IQ Rest's banner is fast, fair and fully compliant. Visitors who Accept enable per-session analytics; visitors who Reject still register in our anonymous aggregate counters so we know what's happening on the landing without ever identifying them.",
      ctaText: "See the consent flow in action — open IQ Rest on a fresh browser.",
      ctaButton: "Visit landing",
    },

    // ──────────────────────────────────────────────────────────────────────
    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privacy & Terms in Modals — No Page Jumps | IQ Rest",
        description:
          "Privacy Policy, Terms of Service and Cookie Policy now open in modals on the landing — no losing your scroll, no extra navigation.",
      },
      title: "Privacy, Terms and Cookie Policy in Modals — No Page Jumps",
      subtitle:
        "Click any legal link on the landing or auth page and the policy opens in a clean modal. No navigation, no losing your scroll position, no breaking your conversion flow.",
      intro:
        "Standalone /privacy, /terms and /cookies pages used to be the standard pattern — and the standard mistake. Visitors clicked the link, lost their place on the landing, read the policy, then forgot to come back. Conversion dropped. IQ Rest now opens all three legal documents as in-page modals: same scroll position preserved, same landing experience uninterrupted, full legal compliance maintained.",
      sections: [
        {
          title: "One Modal Component, Three Documents",
          body: "We use a single Modal component with a switch on the document type. Open it from the cookie banner, the auth page, the footer — same component, same scroll-locking, same close-on-escape. The legal text lives in shared TypeScript constants so updating a clause once propagates to every place the policy is shown. No duplication, no drift.",
        },
        {
          title: "Modal Stack — Open One From Inside Another",
          body: "If you're reading the Cookie Policy and want to switch to the Privacy Policy, the link inside the modal opens the next modal on top — not as a redirect. The stack handles back navigation correctly, escape closes the top modal, clicking outside dismisses gracefully. The interaction is what users expect from a native app.",
        },
        {
          title: "All 35 Locales — Same Single-Source Text",
          body: "The legal text itself is in English (the language of our legal entity, autónomo registered in Spain), but the modal chrome — titles, close button, link labels — is fully localized into all 35 languages. Visitors in Spanish, German, Polish or Korean see a localized modal that opens English legal text, exactly as our compliance approach requires.",
        },
      ],
      benefitsTitle: "Why Modals Beat Standalone Legal Pages",
      benefits: [
        "No scroll loss — visitors stay on the landing",
        "Higher conversion — fewer unintended bounces",
        "Single component, three documents — no duplication",
        "Modal stack — open one from inside another cleanly",
        "Localized chrome in 35 languages",
        "Full legal compliance preserved",
      ],
      conclusionTitle: "Legal Without Friction",
      conclusionBody:
        "Lawyers want the policy to be readable. Marketers want the visitor to convert. Modals make both happy: the policy is one tap away, fully readable, with no impact on the landing flow. IQ Rest's compliance posture stays strong without the conversion drag of standalone legal pages.",
      ctaText: "Try the new flow — open the cookie banner and tap any policy link.",
      ctaButton: "Visit landing",
    },

    // ──────────────────────────────────────────────────────────────────────
    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Auto-Catalan Language for Catalonia Visitors | IQ Rest",
        description:
          "Visitors from Barcelona, Tarragona, Lleida and Girona automatically see IQ Rest in Catalan instead of Castilian Spanish.",
      },
      title: "Auto-Catalan Detection for Visitors from Catalonia",
      subtitle:
        "Visitors from Barcelona, Tarragona, Lleida and Girona land on the Catalan version of IQ Rest by default. The rest of Spain still gets Castilian Spanish.",
      intro:
        "Catalonia has a strong linguistic identity — millions of Catalans use Catalan as their first language, distinct from Castilian Spanish. IQ Rest now respects that distinction at the geo level: visitors whose IP geolocates to a Catalan province get the /ca landing page automatically. Castilian Spanish remains the default for the rest of Spain. Visitors can switch language at any time via the language modal in the footer.",
      sections: [
        {
          title: "Geo-Detection at the Edge",
          body: "We read the visitor's country and region from our nginx geo module on every request. If the country is Spain and the region matches Barcelona, Tarragona, Lleida or Girona (or contains 'Catalonia' / 'Catalunya' in the region name), we redirect them to /ca. Otherwise the visitor follows the standard country-to-locale routing and lands on the appropriate language page.",
        },
        {
          title: "Locale Cookie Overrides Geo",
          body: "Once you pick a language manually via the language switcher, your choice is persisted in a cookie that overrides geo for future visits. A Catalan-speaking visitor who prefers reading IQ Rest in English won't keep being redirected to /ca — their explicit choice always wins. Geo is a default, not a constraint.",
        },
        {
          title: "Full Catalan Translation, Not Auto-Translated",
          body: "The /ca landing page isn't auto-translated from Spanish — every word is professionally translated by Catalan-speaking restaurant industry copywriters. Hospitality terminology, payment terms, cultural references all match how a Catalan restaurant owner actually speaks. The page reads like it was written for the market, because it was.",
        },
      ],
      benefitsTitle: "Why Auto-Catalan Matters",
      benefits: [
        "Visitors from Barcelona/Tarragona/Lleida/Girona see Catalan automatically",
        "Rest of Spain still gets Castilian Spanish — no over-routing",
        "Manual language choice persists via cookie",
        "Full professional translation, not machine translation",
        "Geo-detection happens at the edge — no client-side flicker",
        "Same conversion-tuned landing as every other locale",
      ],
      conclusionTitle: "Respecting Linguistic Identity",
      conclusionBody:
        "Defaulting Catalan visitors to Castilian Spanish is a small thing technically but a big thing politically and culturally. IQ Rest's geo-routing now treats Catalan as a first-class language for Catalonia visitors. The result: a higher-converting landing for Catalan-speaking restaurant owners, who feel respected from the first second they see our website.",
      ctaText: "Visit IQ Rest from Catalonia and see the page in your language.",
      ctaButton: "Open Catalan landing",
    },

    // ──────────────────────────────────────────────────────────────────────
    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Trial Expired Modal — QR Menu Stays Public | IQ Rest",
        description:
          "When your trial ends, your menu doesn't disappear. Guests can still scan and view; you see an upgrade modal in the dashboard.",
      },
      title: "Trial Expired? Your QR Menu Stays Live for Guests",
      subtitle:
        "Trial expiry no longer kills your public menu. Guests can still scan and view; only the dashboard prompts you to upgrade. No surprise downtime in the middle of service.",
      intro:
        "The old trial expiry behaviour was harsh: when your 14 days ended, your public QR menu went dark for guests. If you happened to be mid-service, that was a disaster. We changed it. Now, trial expiry shows you a modal inside the dashboard prompting upgrade, but your public menu continues to serve guests normally. You upgrade when you're ready, not when a guest is waving a phone at the QR code on the table.",
      sections: [
        {
          title: "Public Menu Stays Live",
          body: "The 14-day trial ends quietly from the guest's perspective. The QR menu, online ordering, reservations — everything continues to work. The owner sees the upgrade modal on next dashboard sign-in. This decoupling means trial expiry can never break a service or embarrass you in front of customers.",
        },
        {
          title: "Modal in Dashboard, Not a Hard Redirect",
          body: "Previously, trial expiry redirected the dashboard to a billing page. That broke deep links and confused users who got bounced mid-task. Now we show a clean modal: 'Your trial has ended. Pick a plan to keep using advanced features.' The modal can be dismissed; you can keep navigating the dashboard, but new actions that require a paid plan show inline upsell prompts.",
        },
        {
          title: "Preview Always Available",
          body: "Even with the trial expired, you can still preview your QR menu from the dashboard. We don't lock you out of seeing what guests see. Edit the menu, preview the result — only publish-related actions hint at upgrade. This keeps the dashboard productive even mid-decision, so you don't lose access while comparing plans.",
        },
      ],
      benefitsTitle: "Why a Soft Expiry Beats a Hard Cutoff",
      benefits: [
        "Public QR menu stays live for guests",
        "No surprise downtime mid-service",
        "Modal in dashboard instead of forced billing redirect",
        "Preview always available regardless of plan state",
        "Inline upsell hints replace abrupt blocks",
        "Owner upgrades on their own schedule",
      ],
      conclusionTitle: "Respect the Restaurant's Operating Hours",
      conclusionBody:
        "Restaurants run on tight margins and tighter schedules. A QR menu going down because a free trial expired is worse than the trial limit itself — it damages trust. Soft expiry keeps the lights on for guests while still nudging the owner toward a paid plan. Conversions stay high; downtime drops to zero.",
      ctaText: "Start your 14-day trial knowing your menu stays live no matter what.",
      ctaButton: "Start free trial",
    },

    // ──────────────────────────────────────────────────────────────────────
    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Dish: Clearer Menu Editor Terminology | IQ Rest",
        description:
          "We renamed 'Item' to 'Dish' across the dashboard. Restaurant owners shouldn't have to translate generic SaaS terminology in their head.",
      },
      title: "Item → Dish: Clearer Terminology Across the Editor",
      subtitle:
        "We replaced the generic 'Item' label with 'Dish' across every dashboard surface. Small change, big clarity boost for restaurant owners who don't speak SaaS.",
      intro:
        "Software people say 'item'. Restaurant people say 'dish'. The mismatch was small but constant — every time we showed 'Add Item', the owner had to translate it in their head to 'Add Dish'. We renamed everything: buttons, labels, success messages, error states, page titles. The dashboard now speaks the same language as the people using it.",
      sections: [
        {
          title: "Where the Rename Applies",
          body: "Every user-facing surface: 'Add Item' became 'Add Dish'. 'Items' tab in the menu became 'Dishes'. 'Item Settings' became 'Dish Settings'. Success toasts ('Item created') became ('Dish created'). Form validation errors, breadcrumbs, dashboard headings — all updated. The internal database column is still named 'item' for backwards compatibility, but no user ever sees that.",
        },
        {
          title: "Translated Across All 35 Languages",
          body: "Each language has its own correct word for 'dish' that's distinct from 'item'. Spanish 'plato', French 'plat', German 'Gericht', Italian 'piatto', Catalan 'plat', Japanese '料理'. We updated the translation key in every locale and verified the result reads naturally in each language. No machine translation; native speakers reviewed each.",
        },
        {
          title: "Default Category Auto-Created Too",
          body: "While we were in the editor, we also auto-create a default category called 'Menu' on first dashboard visit. Old behaviour: owners landed on an empty menu, had to click 'Add Category' before they could add a dish, often gave up. New behaviour: a Menu category exists, you tap 'Add Dish', you're editing immediately. One barrier removed.",
        },
      ],
      benefitsTitle: "Why Terminology Matters",
      benefits: [
        "'Dish' matches how restaurant owners actually speak",
        "Updated across every dashboard surface — buttons, labels, toasts",
        "Translated into all 35 languages by native reviewers",
        "Default category auto-created — no empty menu to start with",
        "Faster from signup to first dish added",
        "Less mental translation = lower bounce in onboarding",
      ],
      conclusionTitle: "Speak the User's Language",
      conclusionBody:
        "Generic SaaS terminology ('item', 'entity', 'object') is fine for engineers. Restaurant owners need words that match what they say at work. IQ Rest now speaks the same language as the people using it — across every button, label and notification — and the conversion data already reflects the change.",
      ctaText: "Sign up and add your first dish in under a minute.",
      ctaButton: "Build my menu",
    },

    // ──────────────────────────────────────────────────────────────────────
    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Auto-Default Category for Restaurant Menu Onboarding | IQ Rest",
        description:
          "First-time users no longer face an empty menu. IQ Rest auto-creates a default category so you can add your first dish immediately.",
      },
      title: "Auto-Default Category — Skip the Empty Menu",
      subtitle:
        "First-time users land on a menu with one default category already created. Tap 'Add Dish' and start editing. No more 'create category first' barrier.",
      intro:
        "The old onboarding required users to create a category before they could add a dish. Empty menus are intimidating — many new users gave up at that point. IQ Rest now auto-creates a default 'Menu' category the first time you open the dashboard, so the first action you take is adding a dish, not configuring a hierarchy. Faster, smoother, more menus actually built.",
      sections: [
        {
          title: "Default Category Created on Sign-In",
          body: "The first time you sign in to a fresh dashboard, IQ Rest checks if you have any categories. If not, it creates one called 'Menu' (translated to your locale). The category is immediately ready to receive dishes. You can rename it or add more categories at any time — but you don't have to before adding your first dish.",
        },
        {
          title: "Renamed to Match Your Cuisine When You Use the Wizard",
          body: "If you used the 3-step signup wizard, the seeder generates cuisine-appropriate categories instead — 'Pizza', 'Pasta', 'Antipasti' for Italian; 'Sushi', 'Ramen', 'Sake' for Japanese. The auto-default 'Menu' category only kicks in for users who skipped the wizard or signed up via Google directly.",
        },
        {
          title: "Backwards Compatible With Existing Menus",
          body: "If you already have categories — from past usage, from imported data, from the seeder — the default isn't created. We only intervene when the menu is genuinely empty. Existing users see no change to their menu structure.",
        },
      ],
      benefitsTitle: "Why Auto-Default Speeds Onboarding",
      benefits: [
        "No 'create category first' barrier for new users",
        "Tap 'Add Dish' as the first action, not the second",
        "Category named in your locale, not English by default",
        "Wizard flow still seeds cuisine-appropriate categories",
        "Existing menus untouched",
        "Faster from sign-in to first dish added",
      ],
      conclusionTitle: "Eliminate the Empty State",
      conclusionBody:
        "Empty states are where new users bounce. Every barrier between the user and their first productive action costs you conversions. Auto-creating a default category removes one such barrier. It's a small change with a measurable impact on how fast new restaurants get to a publishable menu.",
      ctaText: "Sign up and start adding dishes immediately.",
      ctaButton: "Build my menu",
    },

    // ──────────────────────────────────────────────────────────────────────
    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Skip Restaurant Name Step in Onboarding | IQ Rest",
        description:
          "We dropped the 'restaurant name' step from onboarding. Set it later in settings — or right from the menu hero you'll edit anyway.",
      },
      title: "Skip the Restaurant Name Step in Onboarding",
      subtitle:
        "You don't need to type your restaurant name to start building a menu. We dropped that onboarding step — set the name later from the dashboard, or via the live menu hero.",
      intro:
        "Onboarding flows that demand information up front feel like form-filling. The old IQ Rest onboarding asked for a restaurant name on step one. New users often hadn't decided on the exact spelling, brand variant or punctuation — so they got stuck before even seeing the dashboard. We removed the step. Sign up, land in the dashboard, set the name when you're ready. The menu still works fine without it.",
      sections: [
        {
          title: "What Happens When You Skip",
          body: "If you skip the name step, the restaurant gets a placeholder ('Your Restaurant') that's hidden by default on the public menu. Guests scanning your QR see the menu without a name in the hero — which is honestly fine for many quick-service places. As soon as you set the name in settings, it appears in the hero, the page title, the SEO slug and social shares.",
        },
        {
          title: "Set It from Anywhere",
          body: "The name field is editable from settings, from the menu hero (tap to edit inline), and from the public preview screen. Three different surfaces, one underlying field. We made it easy to defer the decision and trivially easy to commit when you're ready.",
        },
        {
          title: "No SEO Penalty for Defaulting",
          body: "We use the slug ('your-restaurant') as a fallback for the page title and SEO meta tags until you set a real name. Search engines don't penalize you — they just see a generic title. The moment you set a real name, every meta tag updates and Google re-crawls within hours.",
        },
      ],
      benefitsTitle: "Why Skipping Speeds Onboarding",
      benefits: [
        "No decision pressure at the wrong moment",
        "Land in the dashboard faster",
        "Set the name when inspiration strikes — or when the legal entity is registered",
        "Inline edit from the menu hero",
        "Public menu works fine without a name set",
        "No SEO penalty for using the placeholder",
      ],
      conclusionTitle: "Fewer Decisions, More Done",
      conclusionBody:
        "Every form field in onboarding is a chance for the user to bounce. By removing the restaurant name field, we removed one such chance. New users now land in the dashboard with a working menu and the freedom to name (or not name) their restaurant on their own schedule. The conversion lift was immediate.",
      ctaText: "Sign up in seconds — no restaurant name required.",
      ctaButton: "Start free trial",
    },

    // ──────────────────────────────────────────────────────────────────────
    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Try Restaurant QR Menu Before Sign Up — Anonymous | IQ Rest",
        description:
          "Build a sample menu before creating an account. Save your progress to email when you want to keep it. No commitment, no friction.",
      },
      title: "Try a QR Menu Before You Sign Up",
      subtitle:
        "Build a sample menu, see what your QR code looks like, preview the live experience — all before creating an account. Save your progress via email link when you're ready.",
      intro:
        "Most QR menu services demand you create an account before you can do anything. That's the wrong order. New restaurant owners want to feel the product first — see how a dish looks, what the QR scan flow feels like — and only then commit to signing up. IQ Rest now lets you build a complete sample menu anonymously. When you want to keep it, we save it to your email. Friction-free, commitment-free.",
      sections: [
        {
          title: "Anonymous Session Stores Your Work",
          body: "An anonymous session ID is created on your first visit and stored in a cookie. Every category you add, every dish you create, every photo you upload is associated with that session. You can leave the page, come back, and your menu is still there. We persist the session for 7 days — plenty of time to evaluate the product without pressure.",
        },
        {
          title: "Save Progress via Email Link",
          body: "When you decide you want to keep the menu, click 'Save Progress'. Type your email. We send you a magic link that, when clicked, converts the anonymous session into a real account associated with your email. All your work transfers automatically — no re-entry, no lost progress, no 'oops it deleted'. The conversion to paid customer happens on your terms.",
        },
        {
          title: "Reduces Signup Anxiety to Zero",
          body: "By letting users try before signing up, we reverse the typical SaaS pattern. Visitors don't need to decide whether IQ Rest is worth their email — they can see for themselves. Restaurants that try anonymously and then sign up convert higher than restaurants forced to sign up first, because they've already invested in the menu and don't want to lose it.",
        },
      ],
      benefitsTitle: "Why Anonymous Onboarding Wins",
      benefits: [
        "Build a real menu without creating an account",
        "Anonymous session persists 7 days",
        "Save progress to email when you decide to commit",
        "No re-entry — work transfers to your real account",
        "Friction-free product evaluation",
        "Higher overall signup conversion",
      ],
      conclusionTitle: "Let the Product Sell Itself",
      conclusionBody:
        "The best way to convince a restaurant owner that IQ Rest is right for them is to let them use it. Anonymous onboarding turns a curious visitor into an engaged user without asking for anything in return. By the time you ask for an email, the user has already invested time in their menu — saving it costs them nothing, and they keep what they built.",
      ctaText: "Try IQ Rest now — no account needed.",
      ctaButton: "Try it free",
    },

    // ──────────────────────────────────────────────────────────────────────
    "save-menu-progress-via-email-link": {
      meta: {
        title: "Save Restaurant Menu Progress via Email Link | IQ Rest",
        description:
          "Built a sample menu anonymously? Save it to your email and we'll send you a magic link to claim the account.",
      },
      title: "Save Your Menu Progress via Email Link",
      subtitle:
        "Built a menu anonymously and want to keep it? Type your email. We send a magic link that converts your anonymous work into a real account in one tap.",
      intro:
        "When you've spent five minutes building a sample menu without an account, you don't want to lose it. IQ Rest's 'Save Progress' feature converts your anonymous session into a real account via a magic link. Type your email, click the link in your inbox, your menu is permanently associated with your account. No password, no signup form, no re-entry of any data.",
      sections: [
        {
          title: "Magic Link Flow — No Password",
          body: "We send a one-time link to your email. Click it within 10 minutes and you're signed in to a new account that contains the menu you built anonymously. No password to choose, no security questions, no email verification step — the click of the link IS the verification. We then issue a session cookie and you're inside the dashboard with all your work preserved.",
        },
        {
          title: "Conflict Handling for Existing Accounts",
          body: "If the email you typed already has an account, we don't overwrite it. We send the link, you click, and we ask whether to merge the anonymous menu into your existing account or discard it. Most users choose merge — your existing dishes stay, the new ones from anonymous editing are added. Clear, safe, predictable.",
        },
        {
          title: "Rate-Limited and Spam-Resistant",
          body: "We rate-limit save-progress requests per IP and per email to prevent abuse. The link expires in 10 minutes and is single-use. If someone else tries to claim your anonymous session, they need access to your inbox — same security model as every modern magic-link auth flow.",
        },
      ],
      benefitsTitle: "Why Magic-Link Save Wins",
      benefits: [
        "No password to choose, remember or reset",
        "Anonymous work transfers to your real account intact",
        "Existing accounts: choose to merge or discard",
        "Rate-limited and time-bounded — secure by design",
        "One tap to commit — no signup form",
        "Email itself acts as the verification step",
      ],
      conclusionTitle: "Conversion Without Friction",
      conclusionBody:
        "The moment a user wants to convert from anonymous to identified is the moment they're most likely to bounce on a long signup form. Magic links collapse that form into a single email field plus an inbox click. The user spends 30 seconds and ends up with a real, persisted account that contains everything they built. It's the lowest-friction conversion flow in the QR menu industry.",
      ctaText: "Build a menu anonymously, then save it via email when ready.",
      ctaButton: "Try it free",
    },

    // ──────────────────────────────────────────────────────────────────────
    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "One-Click Stripe Checkout for Returning Users | IQ Rest",
        description:
          "Already signed in? Click a plan in pricing and go straight to Stripe checkout. No re-entering account info, no extra screens.",
      },
      title: "One-Click Stripe Checkout for Returning Users",
      subtitle:
        "Logged-in user clicks a plan? Straight to Stripe checkout, no extra confirmation screen. Two clicks from pricing page to subscription active.",
      intro:
        "Returning users who already have an IQ Rest account shouldn't have to re-confirm anything when upgrading. We removed every intermediate screen between 'click plan in pricing' and 'land on Stripe checkout'. Two clicks total: pick the plan, enter card details. The subscription is active before you finish your coffee.",
      sections: [
        {
          title: "Detect Logged-In State on Pricing",
          body: "Our pricing page checks for an authenticated session cookie on load. If you're logged in, the plan buttons skip the 'sign up first' detour and go directly to /api/stripe/checkout, which creates a Stripe Checkout Session and returns the URL for redirect. If you're not logged in, the buttons take you through the standard signup flow first — no behavioural change for new users.",
        },
        {
          title: "UI Locale Forwarded to Stripe",
          body: "Your dashboard locale is forwarded to Stripe Checkout via the locale parameter, so the checkout page renders in your language. Spanish users see Stripe in Spanish; German users see Stripe in German. The checkout flow feels seamless because it never breaks language continuity from your dashboard.",
        },
        {
          title: "Return URL Lands You Back in Dashboard",
          body: "After successful payment, Stripe redirects to a return URL we set to the dashboard root in your locale (e.g. /es/dashboard). The webhook updates your subscription status server-side before you arrive, so the dashboard you land on already reflects the new plan — no 'pending' state, no flash of un-upgraded content.",
        },
      ],
      benefitsTitle: "Why One-Click Checkout Converts",
      benefits: [
        "Two clicks from pricing to subscription active",
        "No 'confirm your account' interstitial for logged-in users",
        "Stripe checkout shows in your dashboard language",
        "Return URL lands you in the upgraded dashboard",
        "Webhook updates plan before you arrive — no flicker",
        "New users still get the standard signup → upgrade flow",
      ],
      conclusionTitle: "Make the Easy Path Trivially Easy",
      conclusionBody:
        "The user who's already convinced doesn't need more convincing — they need fewer clicks. One-click checkout removes every screen between intent and payment for returning users. The result: higher trial-to-paid conversion, fewer abandoned upgrades, faster revenue recognition for subscription expansion.",
      ctaText: "Already a user? Pick your plan and upgrade in two clicks.",
      ctaButton: "See pricing",
    },

    // ────────────────── EXISTING ENTRIES (ported from i18n) ─────────────────

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Dashboard UI Redesign: Cards, Navigation & Forms | IQ Rest",
        description:
          "IQ Rest dashboard redesigned with consistent card components, persistent sidebar navigation with active page highlighting, and improved form actions.",
      },
      title: "Dashboard UI Redesign: Consistent Cards, Navigation & Form Actions",
      subtitle:
        "A polished dashboard with unified card styling, persistent sidebar navigation, accent-colored active states, and bottom save/delete actions on every form page.",
      intro:
        "IQ Rest has undergone a comprehensive dashboard UI redesign. Every page now uses consistent card styling with unified border radii, a persistent sidebar navigation with accent-colored active states, and improved form pages with bottom save and delete actions. The result is a cleaner, more polished experience for managing your restaurant's digital QR menu.",
      sections: [
        {
          title: "Consistent Card Design Across All Pages",
          body: "Every dashboard page now uses a unified DashboardCard component with consistent rounded borders, subtle background colors, and optional section headers. Analytics, billing, settings, contacts, reservation settings, and all form pages share the same visual language. Hint labels with popover tooltips replace inline description text, keeping the interface clean while still providing helpful context when needed.",
        },
        {
          title: "Persistent Sidebar Navigation with Active States",
          body: "On desktop screens, a persistent sidebar navigation is now visible on every page. The active page is highlighted with an accent color background, making it immediately clear where you are. Sub-pages like categories, items, and orders correctly highlight the parent Menu item. The sidebar includes quick access to Menu, Print QR, Reservations, Analytics, Settings, Contacts, Billing, and Support — all without leaving the current view.",
        },
        {
          title: "Improved Form Pages with Bottom Actions",
          body: "All form pages — categories, items, tables, design, settings, contacts, and reservation settings — now feature a duplicate save button at the bottom in accent color. Delete buttons appear on the left side with a muted style. This means you no longer need to scroll back to the top to save your changes. The logout button has been moved from the sidebar to the bottom of the design page, keeping the navigation focused on essential actions.",
        },
      ],
      benefitsTitle: "Benefits of the UI Redesign",
      benefits: [
        "Unified card styling with consistent borders and backgrounds across all pages",
        "Persistent sidebar navigation on desktop with accent-colored active states",
        "Bottom save buttons on all forms — no need to scroll up to save",
        "Delete and save actions clearly separated — delete left, save right",
        "Section headers on form cards for better visual organization",
        "Cleaner analytics page with DashboardCard wrappers and improved device stats layout",
      ],
      conclusionTitle: "A More Polished Dashboard Experience",
      conclusionBody:
        "This UI redesign brings visual consistency and improved usability to every corner of the IQ Rest dashboard. Whether you're editing menu items, checking analytics, or managing reservations, the interface feels cohesive and intuitive. Combined with the persistent sidebar navigation, managing your restaurant's digital QR menu is faster and more enjoyable than ever.",
      ctaText: "Experience the redesigned dashboard",
      ctaButton: "Open Dashboard",
    },

    // The remaining 15 existing entries are auto-ported by scripts/port-changelog-from-i18n.ts.
    // Until then, they fall back to a stub so the list page still renders.
    "ai-menu-scanner-create-digital-qr-menu": stub("AI Menu Scanner — Create a Digital QR Menu in One Photo"),
    "redesigned-dashboard-qr-menu-management": stub("Redesigned Dashboard for QR Menu Management"),
    "reservation-emails-analytics-digital-qr-menu": stub("Reservation Emails & Analytics for Your Digital QR Menu"),
    "multi-currency-geo-pricing-qr-menu": stub("Multi-Currency Geo-Pricing for Your QR Menu"),
    "support-qr-menu-restaurant-cafe": stub("In-App Support for Your QR Menu"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Detailed Analytics for Your QR Menu Website"),
    "instant-qr-menu-restaurant-website-generator": stub("Instant QR Menu & Restaurant Website Generator"),
    "subscription-plans-qr-menu-restaurant-website": stub("Subscription Plans for Your QR Menu"),
    "public-restaurant-qr-menu-website": stub("Public Restaurant QR Menu Website"),
    "add-items-restaurant-qr-menu-website": stub("Add Items to Your QR Menu in Seconds"),
    "qr-menu-restaurant-categories": stub("Categories for Your Restaurant QR Menu"),
    "easy-qr-menu-cafe-control-panel": stub("Easy QR Menu Café Control Panel"),
    "faq-page-organization": stub("FAQ Page Organization"),
    "free-restaurant-website-improvements": stub("Free Restaurant Website Improvements"),
    "user-authentication-interface": stub("User Authentication Interface"),
  },
};

// Stub generator for entries pending migration from messages/<locale>.json.
// Once the porter script populates real content these get replaced.
function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Benefits",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Try IQ Rest",
    ctaButton: "Start free trial",
  };
}
