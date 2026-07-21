export const meta = {
  name: 'i18n-lang-batch',
  description: 'Fix a batch of dashboard translation files (langs passed via args) against corrected English + glossary',
  phases: [{ title: 'Translate', detail: 'one Fable agent per language in the batch' }],
}

const NAMES = {
  es:'Español', de:'Deutsch', fr:'Français', it:'Italiano', pt:'Português', nl:'Nederlands',
  pl:'Polski', ru:'Русский', uk:'Українська', sv:'Svenska', da:'Dansk', no:'Norsk', fi:'Suomi',
  cs:'Čeština', el:'Ελληνικά', tr:'Türkçe', ro:'Română', hu:'Magyar', bg:'Български', hr:'Hrvatski',
  sk:'Slovenčina', sl:'Slovenščina', et:'Eesti', lv:'Latviešu', lt:'Lietuvių', sr:'Српски',
  ca:'Català', ga:'Gaeilge', is:'Íslenska', fa:'فارسی', ar:'العربية', ja:'日本語', ko:'한국어', zh:'中文',
}

const DIR = '/Users/sobogd/work/iq-rest/iq-rest/apps/dashboard-web/src/locales'

const GLOSSARY = `
CANONICAL CONCEPTS (find the industry-standard equivalent in THE TARGET LANGUAGE — how OpenTable / TheFork / Toast / Square / GloriaFood localize, and how real restaurant staff say it; NOT a literal calque):
- Reservation (table reservation) — NOT a "booking" calque if the language has a proper hospitality term.
- Menu item / item — NOT "dish" if the word excludes drinks/desserts.
- Options & add-ons — ONE consistent term for the variants/add-ons/extras concept across the whole file.
- Order item status: New -> Preparing -> Ready -> Served. ("Preparing", not "Cooking".)
- Order status: New -> In progress -> Completed -> Canceled.
- Guest (a diner) — NOT "client/customer" if hospitality uses "guest".
- Kitchen (nav) / Kitchen display (the KDS screen).
- Floor plan (the table map); Table; Seats.
- Open table = a table with no active order.
- Opening hours (not "working hours" calque).
- QR code; Scan (what a guest does).
- Waiter (device/role); Notes (order comment field).
- Allergens: Milk (not Lactose), Crustaceans, Molluscs — official EU allergen names in the target language.
- Dashboard = the management app (not "admin").
- Brand names verbatim: Yemeksepeti, Trendyol Yemek, Uber Eats, Glovo, Stripe, Instagram, WhatsApp, IBAN.`

const codes = Array.isArray(args) ? args : String(args || '').split(/[,\s]+/).filter(Boolean)
if (!codes.length) throw new Error('no lang codes passed via args')

phase('Translate')

const results = await parallel(codes.map((code) => () => {
  const name = NAMES[code] || code
  return agent(
`You are a NATIVE ${name} (${code}) restaurant-industry copy expert. You audit and FIX the ${name} UI translation of a restaurant SaaS dashboard (IQ Rest): a digital QR menu + kitchen display (KDS) + table reservations + orders product used by restaurant staff.

SOURCE OF TRUTH (corrected English, read fully): ${DIR}/en.json
TARGET FILE TO FIX IN PLACE (${name}): ${DIR}/${code}.json
Both are nested JSON with IDENTICAL key structure. Leaf values are UI strings.

TASK — go key by key. For every leaf where the ${name} value is:
 (a) a mistranslation / wrong meaning vs the English source,
 (b) wrong industry register (sounds like generic machine translation, not real restaurant/hospitality/KDS/reservation software in ${name}),
 (c) off-glossary (different word than the canonical concept below, or internally inconsistent — same concept translated two different ways across the file),
 (d) still left in English when it should be localized (EXCEPT brand names / proper-noun placeholders, which stay),
FIX the value to correct, natural, industry-standard ${name}.

${GLOSSARY}

HARD RULES:
- Edit ONLY leaf string VALUES via the Edit tool. NEVER add, remove, or rename keys. NEVER change JSON structure or 2-space indentation. Parity with en.json must stay exact.
- Preserve every {placeholder}, <tag>, & entity, and brand name exactly.
- Respect ${name} grammar for plural keys (…One / …Other / count forms).
- ${code === 'ar' || code === 'fa' ? 'RTL language — keep text natural RTL; do not add directional marks.' : 'x'}
- Match the EXISTING good style; only change what is actually wrong or off-term. Do NOT rewrite correct strings for taste.
- After editing, the file must remain valid JSON.

Be thorough but precise. Then reply with a SHORT plain-text summary: "${code}: <N> changes" then up to 10 lines of 'key.path: old -> new'. Your file edits are what matters; the summary is secondary.`,
    { label: `lang:${code}`, phase: 'Translate', model: 'fable' }
  ).then(r => `### ${code}\n${r || '(null / failed)'}`).catch(e => `### ${code}\nERROR: ${String(e).slice(0,120)}`)
}))

log(`Batch done: ${codes.join(', ')}`)
return results.filter(Boolean).join('\n\n')
