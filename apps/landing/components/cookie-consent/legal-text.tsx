// Hardcoded English legal text shown inside the cookie consent secondary modals.
// Kept in TypeScript (not JSON i18n) on purpose — translating legal documents requires lawyer
// review and is more risk than benefit. The English version is canonical and binding.
//
// Operator data sourced from the existing Privacy Policy (messages/en.json → privacy.sections).

export const OPERATOR = {
  // The legal person behind the IQ Rest brand. In Spain this is an "autónomo"
  // (a registered self-employed individual) — rendered in the docs as
  // "individual entrepreneur (autónomo)" so it reads clearly internationally
  // while staying legally precise. GDPR requires the controller's real
  // identity + tax ID, so the personal name stays; the copy just leads with
  // the brand.
  legalName: "Bogdan Sokolov",
  status: "individual entrepreneur (autónomo) registered in Spain",
  brand: "IQ Rest",
  domain: "iq-rest.com",
  contactEmail: "support@iq-rest.com",
  fiscalAddress: "Calle Boca Del Rio 2, 1A, Oviedo, 33010, Asturias, Spain",
  taxId: "ESZ1894474S",
  hostingProvider: "Hetzner Online GmbH, Nuremberg, Germany",
};

/** Cookie Policy modal body. Plain text segments rendered with paragraph spacing.
 *  Scope: the MAIN site (iq-rest.com + dashboard) only. */
export const COOKIE_POLICY_TITLE = "Cookie Policy";

// Each document carries its own revision date.
export const COOKIE_LAST_UPDATED = "August 10, 2026";

export const COOKIE_POLICY_SECTIONS: { heading?: string; paragraphs: string[] }[] = [
  {
    paragraphs: [
      `Last updated: ${COOKIE_LAST_UPDATED}`,
      `This Cookie Policy explains how ${OPERATOR.brand} — a service operated by ${OPERATOR.legalName}, ${OPERATOR.status} ("${OPERATOR.brand}", "we", "us") — uses cookies and similar technologies on the main ${OPERATOR.brand} website at ${OPERATOR.domain} and the dashboard ("the Site"). This policy should be read together with our Terms of Service.`,
    ],
  },
  {
    heading: "1. What cookies are",
    paragraphs: [
      `Cookies are small text files that a website places on your device when you visit. They allow the site to remember your choices, keep you signed in, and understand how the site is used. On the Site we only use cookies that are strictly necessary to operate it, so no cookie consent banner is shown.`,
    ],
  },
  {
    heading: "2. Who we are and where data is processed",
    paragraphs: [
      `${OPERATOR.brand} is operated by ${OPERATOR.legalName}, ${OPERATOR.status}, with fiscal address at ${OPERATOR.fiscalAddress} (Tax ID: ${OPERATOR.taxId}). All data we collect is stored on our own servers operated by ${OPERATOR.hostingProvider}. We do not use Google Analytics, PostHog, Facebook Pixel, or any other third-party analytics or advertising tracker. All analytics processing happens first-party, on infrastructure under our direct control.`,
    ],
  },
  {
    heading: "3. Strictly necessary cookies",
    paragraphs: [
      `These are the only cookies the Site sets. They are required to sign you in, show the right language, and display prices in the right currency. They are set automatically and do not require consent under Article 5(3) of the ePrivacy Directive (the "strictly necessary" exemption).`,
      `The cookies we use on the Site:`,
      `• iqr_session, iqr_email — keep you signed in to the dashboard`,
      `• geo_country, geo_locale, geo_currency — country detected from your IP via Cloudflare, and the language and billing currency derived from it`,
      `• NEXT_LOCALE — remembers the language you explicitly chose`,
    ],
  },
  {
    heading: "4. Analytics on the Site — no cookies on your device",
    paragraphs: [
      `We measure how the main website is used through anonymous first-party events sent to our own server. On the Site, no analytics-specific cookie is stored on your device, no cross-site identifier exists, and the events cannot be linked back to you as an individual. Each event records only the action name (e.g. "l_pricing_view"), the moment it occurred, and approximate geo (country and region from your IP via Cloudflare). Lawful under ePrivacy because nothing is written to your device beyond the strictly necessary cookies above.`,
    ],
  },
  {
    heading: "5. Ad-click identifiers (gclid, fbclid)",
    paragraphs: [
      `If you arrive at the Site by clicking one of our own ads, the ad platform includes a click identifier in the URL (Google Ads: gclid; Meta: fbclid). We store this identifier in our own database for up to 90 days and use it to report conversions back to the ad platform (server-to-server) so we can measure which ads work. This relies on our legitimate interest in evaluating advertising effectiveness (GDPR Art. 6(1)(f)). It does not require a cookie banner because no cookie is set on your device for this purpose. You may object at any time by emailing ${OPERATOR.contactEmail} with the click identifier from your original ad URL.`,
    ],
  },
  {
    heading: "6. No marketing or third-party trackers",
    paragraphs: [
      `We do not use advertising cookies, retargeting pixels, third-party marketing trackers, Google Analytics, Facebook Pixel, Hotjar, or similar services. The only advertising-related data leaving our servers is the server-to-server conversion reporting described above.`,
    ],
  },
  {
    heading: "7. Your rights",
    paragraphs: [
      `Under the GDPR you have the right to access, correct, delete, restrict, or port the personal data we hold about you, and to object to processing. To exercise these rights, contact us at ${OPERATOR.contactEmail}. You also have the right to lodge a complaint with your national data protection authority — for Spain, this is the Agencia Española de Protección de Datos (AEPD, www.aepd.es).`,
    ],
  },
  {
    heading: "8. Changes to this policy",
    paragraphs: [
      `We may update this Cookie Policy from time to time to reflect changes in the cookies we use or in legal requirements. The date at the top of this page indicates when it was last updated. Continued use of the Site after the update constitutes acceptance of the revised policy.`,
    ],
  },
  {
    heading: "9. Contact",
    paragraphs: [
      `Questions about this Cookie Policy can be sent to ${OPERATOR.contactEmail}.`,
    ],
  },
];

/** Privacy Policy modal body. Enumerates every personal-data field the platform stores,
 *  per GDPR Article 13/14 transparency requirements. */
export const PRIVACY_POLICY_TITLE = "Privacy Policy";

export const PRIVACY_LAST_UPDATED = "August 10, 2026";

export const PRIVACY_POLICY_SECTIONS: { heading?: string; paragraphs: string[] }[] = [
  {
    paragraphs: [
      `Last updated: ${PRIVACY_LAST_UPDATED}`,
      `This Privacy Policy explains how ${OPERATOR.brand} — a service operated by ${OPERATOR.legalName}, ${OPERATOR.status}, with fiscal address at ${OPERATOR.fiscalAddress} (Tax ID: ${OPERATOR.taxId}) ("${OPERATOR.brand}", "we", "us") — collects, uses, stores and protects your personal data when you use the ${OPERATOR.brand} platform at ${OPERATOR.domain} and its subdomains.`,
      `The short version: everything you and your guests enter into the Service lives in our own database, on our own servers in the European Union. We run no third-party analytics or advertising trackers, and our own usage tracking contains no personal data.`,
      `We comply with the General Data Protection Regulation (GDPR), the Spanish Organic Law on Data Protection and Guarantee of Digital Rights (LOPDGDD), and the ePrivacy Directive.`,
    ],
  },
  {
    heading: "1. Data Controller",
    paragraphs: [
      `${OPERATOR.brand} is operated by ${OPERATOR.legalName}, ${OPERATOR.status}, who is the data controller responsible for your personal data (Tax ID: ${OPERATOR.taxId}, fiscal address ${OPERATOR.fiscalAddress}).`,
      `For guest data submitted to a specific restaurant through the Service (orders, reservations), the restaurant is the data controller and we act as its processor — see section 7 of the Terms of Service.`,
      `For any privacy inquiries, including the exercise of your data subject rights, contact ${OPERATOR.contactEmail}.`,
    ],
  },
  {
    heading: "2. Data we collect",
    paragraphs: [
      `We collect only the data needed to operate the Service. The categories below cover everything stored in our database.`,
      `Account data — when you register: email address (used for one-time-code sign-in and operational notices); preferred dashboard language; the cuisine type and restaurant name you provide during signup.`,
      `Authentication data — short-lived one-time codes (OTPs), hashed session tokens, count of failed verification attempts. Sign-in is passwordless (email code, Google, or Apple); no passwords are stored.`,
      `Billing data — your subscription status, selected features and billing interval, and Stripe customer/subscription identifiers. Payment cards are handled entirely by Stripe; we never see or store card details.`,
      `Restaurant profile — restaurant name, subtitle, description, public address (slug), currency, brand color, cover image, postal address, geo coordinates, phone number, Instagram handle, WhatsApp number, languages, working hours, timezone, table and reservation settings.`,
      `Menu content — categories, dishes (name, description, price, photo, allergens, options, translations), tables (number, capacity, zone, floor position).`,
      `Reservations — for each booking: guest name, guest email, guest phone (optional), party size, date, time, duration, table assignment, status, internal notes.`,
      `Orders — for each order: customer name (optional), customer phone (optional), comment, table number, items ordered, discounts, total amount, currency, status.`,
      `Connected devices — if you pair tablets (kitchen display, waiter board, reservation board): device name, device type, and last-seen time. No personal data of the staff using the tablet is collected.`,
      `Support and messaging — content of messages you exchange with our support team, including messages sent over WhatsApp if you contact us there.`,
      `Usage tracking — tracking only, without personal data: anonymous first-party events consisting of an action name (e.g. "pricing_view"), a timestamp, and an approximate region (country/region derived from IP). No name, no email, no cross-site identifier — the events cannot identify you as a person. See section 5.`,
    ],
  },
  {
    heading: "3. Legal basis for processing",
    paragraphs: [
      `Each category is processed under one of the legal bases in GDPR Article 6:`,
      `Contract performance (Art. 6(1)(b)) — account data, authentication data, billing data, restaurant profile, menu content, reservations, orders, connected devices, support messages. Required to provide the Service you signed up for.`,
      `Legitimate interest (Art. 6(1)(f)) — anonymous usage tracking, short-term operational logs, fraud and abuse prevention, measurement of our own advertising (section 6). Balanced against your rights; you can object at any time by emailing ${OPERATOR.contactEmail}.`,
      `Legal obligation (Art. 6(1)(c)) — invoicing data we are required to retain by Spanish tax law.`,
    ],
  },
  {
    heading: "4. How we use your data",
    paragraphs: [
      `Provide and maintain the Service: run your dashboard and public menu pages, generate QR codes, process orders and reservations, power kitchen and waiter displays.`,
      `Authenticate you: send sign-in codes by email, validate Google/Apple sign-in, manage sessions.`,
      `Bill you: process subscription payments through Stripe, send invoices.`,
      `Assist you with AI features: if you import a menu from photos or use automatic translation, the images or menu text you submit are processed by an AI model to produce the draft menu or translation. The results are stored only in your own menu.`,
      `Communicate with you: account and service notices, support replies, important changes to the Service. We do not send marketing emails without your separate consent.`,
      `Improve the platform: anonymous usage tracking, debugging, performance monitoring.`,
      `Comply with legal obligations: tax records, regulatory reporting when required.`,
    ],
  },
  {
    heading: "5. Usage tracking — no personal data",
    paragraphs: [
      `We measure how the main website and the dashboard are used with our own first-party events stored in our own database. Tracking is limited to what happened, not who did it: each event records an action name, the moment it occurred, and an approximate region. No analytics cookie is placed on your device, no advertising identifier is created, no data is shared with any analytics company, and the events contain no personal data.`,
      `Actions performed inside your own dashboard while signed in may additionally be associated with your account — solely so we can help you in support cases and detect abuse, never for advertising.`,
    ],
  },
  {
    heading: "6. Advertising measurement (ad-click identifiers)",
    paragraphs: [
      `If you arrive at our site by clicking one of our own ads, the ad platform appends a click identifier to the URL (Google Ads: gclid; Meta: fbclid). We store that identifier in our own database and, if you later sign up, report the conversion back to the ad platform server-to-server so we can tell which ads work. No pixel, tag, or tracker from these platforms runs on our site, and the identifier is not linked to your name or email in these reports.`,
      `This processing relies on our legitimate interest in measuring our own advertising (GDPR Art. 6(1)(f)). You may object at any time by emailing ${OPERATOR.contactEmail} (include the click identifier from your original ad URL if you want past attribution excluded).`,
    ],
  },
  {
    heading: "7. Where data is stored",
    paragraphs: [
      `All customer data — your account, restaurant content, orders, reservations, usage events — is stored in one place: our own database on a dedicated server operated for us by ${OPERATOR.hostingProvider}, under our direct control. Primary processing does not leave the European Union.`,
      `Backups are encrypted and stored in the same EU region.`,
      `Data is encrypted in transit using TLS and at rest using disk-level encryption.`,
    ],
  },
  {
    heading: "8. Service providers",
    paragraphs: [
      `We do not sell, rent, or share your personal data with anyone for their own purposes, and we run no third-party analytics or advertising trackers. A small number of infrastructure providers are technically necessary to deliver the Service:`,
      `Stripe — payment processing. Receives your billing email and the amount and product of each transaction. Privacy: https://stripe.com/privacy`,
      `Hetzner Online GmbH — hosts our server (Germany, EU). A data processor under a Data Processing Agreement; cannot access database contents in normal operation.`,
      `Cloudflare — CDN and DDoS protection in front of our server; sees inbound requests as any network carrier does. A data processor.`,
      `Google — only in three narrow cases: if you choose "Sign in with Google" (standard OAuth: email, name, picture); if you use the AI menu-import or translation features (the submitted images/text are processed by Google's AI API and not used to train models); and server-to-server ad-conversion reports described in section 6.`,
      `Apple — only if you choose "Sign in with Apple" (standard OAuth scope).`,
      `Meta — only if you message us on WhatsApp (WhatsApp relays the messages, as with any WhatsApp conversation) and for the server-to-server ad-conversion reports described in section 6.`,
    ],
  },
  {
    heading: "9. International data transfers",
    paragraphs: [
      `All primary processing happens within the European Union. Where a provider listed above (Stripe, Cloudflare, Google, Apple, Meta) transfers data to the United States, the transfer is covered by the EU-US Data Privacy Framework or by Standard Contractual Clauses.`,
    ],
  },
  {
    heading: "10. How long we keep your data",
    paragraphs: [
      `Account data — for as long as your account is active. Within 30 days of account deletion, all personal data is permanently removed from our database. Backups are overwritten within 90 days.`,
      `OTPs — deleted immediately on successful verification or after 15 minutes (whichever comes first).`,
      `Reservations and orders — retained for as long as you keep your restaurant in the Service (they power your order history and statistics), then removed with the account.`,
      `Anonymous usage events — retained without a fixed limit; they contain no personal data.`,
      `Ad-click identifiers — used for conversion reporting for up to 90 days after the click.`,
      `Invoicing data — retained for 6 years as required by Spanish tax law (Ley General Tributaria).`,
      `Support messages — retained for 24 months after the last reply.`,
    ],
  },
  {
    heading: "11. Your rights",
    paragraphs: [
      `Under the GDPR you have the right to:`,
      `Access — request a copy of the personal data we hold about you.`,
      `Rectification — correct inaccurate or incomplete data.`,
      `Erasure ("right to be forgotten") — request deletion of your data; we will comply unless retention is required by law.`,
      `Restriction — pause processing while a complaint is investigated.`,
      `Portability — receive your data in a structured, machine-readable format and transfer it to another provider.`,
      `Object — object to processing based on legitimate interest, including advertising measurement (section 6). Email ${OPERATOR.contactEmail}.`,
      `Lodge a complaint — file a complaint with the Spanish data protection authority, the Agencia Española de Protección de Datos (AEPD), at www.aepd.es.`,
      `To exercise any of these rights, email ${OPERATOR.contactEmail}. We respond within 30 days.`,
    ],
  },
  {
    heading: "12. Children",
    paragraphs: [
      `The Service is not intended for individuals under 18. We do not knowingly collect personal data from children. If you believe a child has provided us data, contact us and we will remove it.`,
    ],
  },
  {
    heading: "13. Security",
    paragraphs: [
      `We apply technical and organizational measures appropriate to the risk: TLS for all traffic, encryption at rest, hashed session tokens, rate-limiting, automated backups, restricted server access, and regular dependency updates. No system is 100% secure; if we become aware of a personal-data breach affecting you, we will notify you and the AEPD within 72 hours as required by GDPR Article 33.`,
    ],
  },
  {
    heading: "14. Changes to this policy",
    paragraphs: [
      `We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the most recent revision. Continued use of the Service after a change constitutes acceptance.`,
    ],
  },
  {
    heading: "15. Contact",
    paragraphs: [
      `Questions, complaints, or requests regarding this Privacy Policy can be sent to ${OPERATOR.contactEmail}. We respond within 30 days.`,
    ],
  },
];

/** Terms of Service modal body. Structure follows common restaurant-SaaS terms
 *  (modular per-venue subscription, guest/diner carve-out, AI-assist disclaimer,
 *  data-processing clause, EU consumer carve-outs). */
export const TERMS_TITLE = "Terms of Service";

export const TERMS_LAST_UPDATED = "August 10, 2026";

export const TERMS_SECTIONS: { heading?: string; paragraphs: string[] }[] = [
  {
    paragraphs: [
      `Last updated: ${TERMS_LAST_UPDATED}`,
    ],
  },
  {
    heading: "Overview",
    paragraphs: [
      `${OPERATOR.brand} is a software-as-a-service platform that lets restaurants create digital QR menus, accept orders, manage table reservations, run kitchen and waiter displays, and view analytics ("the Service"). It is provided through the website at ${OPERATOR.domain} and its subdomains, and operated by ${OPERATOR.legalName}, ${OPERATOR.status}, with fiscal address at ${OPERATOR.fiscalAddress} (Tax ID: ${OPERATOR.taxId}) ("${OPERATOR.brand}", "we", "us").`,
      `By visiting our site or using the Service, you accept these Terms of Service ("Terms"). If you do not agree to all of these Terms, please do not use the site or the Service.`,
      `These Terms apply to all visitors and users: restaurants and their staff subscribing to the Service ("Venues") and end customers browsing menus, placing orders, or making reservations ("Guests").`,
      `If you use the Service as a consumer, nothing in these Terms limits or excludes any rights you have under mandatory consumer-protection law that cannot be waived by contract.`,
    ],
  },
  {
    heading: "1. Eligibility and accounts",
    paragraphs: [
      `You must be at least 18 years old (or the age of majority in your jurisdiction) to register for an account. By registering you confirm that the information you provide is accurate and that you are entitled to bind any business you sign up on behalf of.`,
      `You are responsible for safeguarding access to your account and for any activity that takes place under it, including activity by staff members you invite. Notify us immediately at ${OPERATOR.contactEmail} if you suspect unauthorized access.`,
    ],
  },
  {
    heading: "2. Acceptable use",
    paragraphs: [
      `You agree not to use the Service for any unlawful purpose; not to upload malicious code, viruses, or content that is illegal, misleading, or infringes third-party rights; not to attempt to circumvent rate limits, security controls, quotas, or billing; and not to scrape, mirror, or otherwise systematically extract data from the Service.`,
      `Violation of these rules may result in immediate suspension or termination of your account.`,
    ],
  },
  {
    heading: "3. Free trial, subscription and billing",
    paragraphs: [
      `Free trial. New accounts receive a free trial period (currently 14 days) with full access to the Service. No payment card is required to start the trial.`,
      `Modular pricing. You build your own plan: the digital QR menu is the base, and you add only the features you need (such as table reservations, the kitchen display with order taking, or a custom domain). The price is calculated per restaurant, and volume discounts apply automatically from the second restaurant on the same account. The exact recurring price, billing interval, and currency are always shown to you before you confirm the purchase.`,
      `Billing. Subscriptions are billed monthly or yearly and renew automatically until cancelled. Yearly billing carries a discount over monthly billing. Payments are processed securely by our payment provider (Stripe); we never receive or store your full card details. Where agreed individually, we may instead invoice you for payment by bank transfer.`,
      `No commission. We do not charge any commission or percentage on orders placed through the Service. Your only cost is the subscription fee.`,
      `Cancellation. You may cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period; the Service remains available until then. We do not refund the unused portion of a billing period, except where mandatory consumer law provides otherwise.`,
      `Pause. If your subscription ends or lapses, your public menu goes offline, but your data — menu, photos, order history, reservations, settings, statistics — is preserved in full. Subscribing again restores everything as it was.`,
      `Price changes. We may change pricing with at least 30 days' notice; the new price applies from your next renewal. If you do not agree with a price change, you may cancel before it takes effect.`,
    ],
  },
  {
    heading: "4. Your content",
    paragraphs: [
      `You retain ownership of all content you upload to the Service (menu items, photos, restaurant details, etc.). By uploading you grant us a limited, non-exclusive license to host, store, transmit, display and back up that content for the sole purpose of providing the Service to you and your Guests.`,
      `You are solely responsible for ensuring that your content is accurate, does not infringe any third-party rights, and complies with applicable food labelling, allergen, pricing, and consumer-information regulations in your jurisdiction.`,
    ],
  },
  {
    heading: "5. AI-assisted features",
    paragraphs: [
      `Some features of the Service use artificial intelligence to save you time — for example, importing a menu from photos and automatic translation of menu content into other languages.`,
      `AI-generated output may contain errors or omissions. It is provided as a draft for your review: you are responsible for checking and correcting imported or translated content — in particular dish names, prices, and allergen information — before publishing it to Guests.`,
    ],
  },
  {
    heading: "6. Guests (end customers)",
    paragraphs: [
      `Guests may browse menus, place orders, and request reservations without creating an account. Any order or reservation made through the Service is a transaction between the Guest and the Venue: the Venue alone is responsible for accepting, preparing, and fulfilling orders and reservations, for the quality and safety of its food and service, and for the accuracy of its menu, prices, and allergen information.`,
      `${OPERATOR.brand} provides the software platform only and is not a party to any transaction between a Guest and a Venue.`,
    ],
  },
  {
    heading: "7. Data, privacy and hosting",
    paragraphs: [
      `All customer data — accounts, menu content, orders, reservations, and analytics — is stored on our own servers located in the European Union, under our direct control. We do not use third-party analytics or advertising trackers on the Service.`,
      `Where Guests submit personal data to a Venue through the Service (for example when placing an order or booking a table), the Venue is the controller of that data and we process it on the Venue's behalf, solely to provide the Service, in accordance with our Privacy Policy.`,
      `For full details on how personal data and cookies are handled, see our Privacy Policy and Cookie Policy, which form part of these Terms.`,
    ],
  },
  {
    heading: "8. Service availability and modifications",
    paragraphs: [
      `We aim for high availability but make no guarantee of uninterrupted, error-free operation. We may perform scheduled maintenance with prior notice when possible.`,
      `We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with reasonable notice for material changes affecting paid features.`,
    ],
  },
  {
    heading: "9. Intellectual property",
    paragraphs: [
      `The ${OPERATOR.brand} name, logo, code, designs, and any other materials provided through the Service (excluding content you upload) are the intellectual property of ${OPERATOR.legalName} and protected by applicable copyright and trademark laws.`,
    ],
  },
  {
    heading: "10. Disclaimer of warranties",
    paragraphs: [
      `The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that any defects will be corrected. Your use of the Service is at your own risk.`,
    ],
  },
  {
    heading: "11. Limitation of liability",
    paragraphs: [
      `To the maximum extent permitted by law, ${OPERATOR.legalName} shall not be liable for any indirect, incidental, special, consequential or punitive damages, lost profits, lost revenue, lost data, or business interruption arising out of or in connection with the Service. Total liability for any claim arising under these Terms is limited to the amount you paid in the 12 months preceding the claim, or EUR 100, whichever is greater.`,
      `Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for wilful misconduct or gross negligence, or the statutory rights of consumers.`,
    ],
  },
  {
    heading: "12. Indemnification",
    paragraphs: [
      `You agree to indemnify and hold ${OPERATOR.legalName} harmless from any claim or demand made by any third party due to your breach of these Terms or your violation of any law or third-party rights.`,
    ],
  },
  {
    heading: "13. Termination",
    paragraphs: [
      `Either party may terminate this agreement at any time. You may terminate by closing your account from the dashboard. We may terminate immediately and without notice for breach of these Terms, suspected fraud, abuse, or illegal activity.`,
      `Upon termination, your right to access the Service ends immediately. We will retain a backup of your data for up to 30 days, after which it is permanently deleted, except for records we are required to retain by law (such as invoicing data under Spanish tax law).`,
    ],
  },
  {
    heading: "14. Governing law and jurisdiction",
    paragraphs: [
      `These Terms are governed by the laws of the Kingdom of Spain. Any dispute arising from these Terms shall be settled in the competent courts of the city of Oviedo, Spain.`,
      `If you are a consumer resident in the European Union, this clause does not deprive you of the protection of mandatory provisions of the law of your country of residence, nor of your right to bring or defend proceedings in the courts of that country.`,
    ],
  },
  {
    heading: "15. Changes to these Terms",
    paragraphs: [
      `We may update these Terms from time to time. The most current version is always available on this page. Material changes will be communicated via email or in-app notice at least 30 days before they take effect. Continued use of the Service after the change constitutes acceptance of the revised Terms.`,
    ],
  },
  {
    heading: "16. Contact",
    paragraphs: [
      `Questions about these Terms can be sent to ${OPERATOR.contactEmail}.`,
    ],
  },
];
