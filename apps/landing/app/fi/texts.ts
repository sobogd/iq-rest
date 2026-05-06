import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "fi", htmlDir: "ltr",
  meta: {
    title: "QR-ruokalista Ravintoloille — Suorat Tilaukset, Nolla Provisio | IQ Rest",
    description: "Ei enää paperisia ruokalistoja eikä toimitussovellusten provisioita. QR-ruokalista, suorat tilaukset, varaukset ja monikielinen sivusto. 14 päivää ilmaiseksi, ilman korttia.",
    canonical: "https://iq-rest.com/fi", ogLocale: "fi_FI",
    ogTitle: "QR-ruokalista Ravintoloille — Suorat Tilaukset, Nolla Provisio",
    ogDescription: "QR-ruokalista, suorat tilaukset, varaukset ja AI-käännös. Valmis 2 minuutissa. 14 päivää ilmaiseksi — ilman korttia.",
  },
  ctaText: "Kokeile ilmaiseksi", ctaSite: "Luo sivusto",
  demoText: "Katso demo", microcopy: "14 päivää ilmaiseksi · Ei korttia · Peruuta milloin haluat",
  header: { navFeatures: "Ominaisuudet", navHow: "Näin se toimii", navPricing: "Hinnat", navFaq: "FAQ", signIn: "Kirjaudu", cta: "Kokeile ilmaiseksi" },
  hero: {
    verticals: ["Ravintolat", "Kahvilat", "Baarit", "Hotellit", "Pizzeriat"],
    qr: { headline: "QR-menu 5 minuutissa.", sub: "Suorat tilaukset, varaukset ja 35 kieltä. Ei välityspalkkioita tai koodausta." },
    web: { headline: "Ravintolasivut 5 minuutissa.", sub: "Suorat tilaukset, varaukset ja 35 kieltä. Ei välityspalkkioita tai koodausta." },
    dynamicHeadlines: ["0% provisio.", "35 kieltä (AI).", "Online-tilaukset.", "Varaukset 24/7.", "Premium-muotoilu."],
    painBullets: ["0 % provisio: Kaikki tilaukset tulevat suoraan sinulle.", "AI-käännös: 35 kieltä kasvattamaan turistien tilauksia.", "Varaukset 24/7: Täysi tupa ilman puhelurumbaa.", "Joustavat hinnat: Päivitä menu sekunneissa."],
    rating: "4,9 · yli 500 ravintolaa 30+ maassa",
  },
  features: {
    heading: "Kaikki mitä tarvitset.", headingAccent: "Ei mitään turhaa.",
    sub: "Tehty ravintoloille. Käytetty pöydässä.",
    items: [
      
      { Icon: ScanLine, title: "Tilaus pöydästä", desc: "Tilaukset saapuvat heti WhatsAppiin tai hallintapaneeliin pöytänumeron kera. Nopeampi palvelu.", tag: "Suorat tilaukset" },
      { Icon: Languages, title: "AI-kääntäjä (35 kieltä)", desc: "Tekoälymme ymmärtää gastronomiaa. Turistit tilaavat 20 % enemmän, kun he ymmärtävät menun.", tag: "Tekoälykäännös" },
      { Icon: CalendarCheck, title: "Pöytävaraukset", desc: "Järjestelmä ottaa varaukset vastaan, kun olet keittiössä. Ei enää menetettyjä asiakkaita.", tag: "Varaukset" },
      { Icon: Palette, title: "Moderni muotoilu", desc: "Videotaustat ja herkulliset kuvat. Menusi näyttää arvokkaalta ja herättää ruokahalun heti.", tag: "Oma ulkoasu" },
      { Icon: Smartphone, title: "Nopea muokkaus", desc: "Hallitse stop-listaa ja hintoja suoraan puhelimesta. Muutokset näkyvät vieraille heti.", tag: "Ruokalistaeditori" },
      { Icon: ChefHat, title: "Tulossa: Keittiönäyttö", desc: "Unohda paperilaput. Tilaukset salista menevät suoraan kokin näytölle.", tag: "Tulossa pian" },
    
    ],
  },
  founder: {
    eyebrow: "Rakentaa ravintoloitsija",
    quoteStart: "Vaimoni ja minä avasimme kahvilan ja vietimme viikkoja etsien järjestelmää, joka hoitaa online-tilaukset, varaukset ja näyttää modernilta. Kaikki mitä kokeilimme oli kömpelöä, rumaa tai siitä puuttui puolet ominaisuuksista —",
    quoteAccent: "joten rakensimme sen, jonka olisimme itse halunneet.",
    sign: "Bogdan Sokolov · perustaja, ent. kahvilanomistaja",
    photoAlt: "Bogdan, IQ Rest perustaja",
  },
  how: {
    heading: "Live alle 2 minuutissa",
    sub: "Neljä lyhyttä askelta. Ei asennusta, ei teknistä konfigurointia.",
    steps: [
      { n: "1", t: "Rekisteröidy", d: "Sähköposti tai Google. Ei korttia. Valmis 10 sekunnissa." },
      { n: "2", t: "Ravintolan nimi", d: "Kirjoita nimi. Ilmestyy listan yläosaan." },
      { n: "3", t: "Lisää ensimmäinen annos", d: "Kategoria, nimi, hinta, kuva. Siinä se." },
      { n: "4", t: "Valitse kansi ja tulosta QR", d: "Valitse tausta. Hae QR. Liimaa pöytiin." },
    ],
  },
  pricing: {
    badge: "Nolla provisiota · Ei sopimuksia",
    heading: "Yksi suunnitelma.", headingAccent: "Kaikki sisältyy.",
    sub: "QR-ruokalista, tilaukset, AI-käännös, ravintolan sivusto ja varaukset. Yksi yksinkertainen hinta.",
    monthlyLabel: "Kuukausittain", yearlyLabel: "Vuosittain", saveBadge: "Säästä 25%", perMonth: "kuukaudessa",
    billedAnnually: "Veloitetaan vuosittain {total}", youSave: "Säästät {amount}",
    trust: { secure: "Turvallinen Stripe-maksu", noCommitment: "Ei sitoutumista", quick: "Aktiivinen minuuteissa", restaurants: "500+ ravintolaa" },
  },
  faq: {
    eyebrow: "Kysymyksiä?", heading: "Usein kysytyt", headingAccent: "kysymykset.",
    sub: "Mitä ravintoloitsijat kysyvät ennen rekisteröitymistä. Etkö näe omaasi? Kirjoita WhatsAppiin — oikeat ihmiset vastaavat.",
    whatsappCta: "Kysy WhatsAppissa", whatsappPrefill: "Hei, minulla on kysymys IQ Restistä",
    items: [
      { q: "Mitä ilmaiskokeilu sisältää ja mitä sen jälkeen?", a: "14 päivää täysi pääsy, ei korttia. 14 päivän jälkeen tili pysähtyy, jos et lisää maksutapaa — emme veloita koskaan automaattisesti. Lisää maksutiedot myöhemmin aktivoidaksesi. Peruuta yhdellä napsautuksella." },
      { q: "Otatteko provisiota tilauksista?", a: "Nolla. Jokainen tilaus QR-listastasi tulee suoraan sinulle — ei osuutta meille, ei Wolt / Foodora-maksuja. Yksi kiinteä kuukausihinta, siinä se." },
      { q: "Tarvitsevatko asiakkaat sovelluksen? Tarvitsenko tekniset taidot?", a: "Ei sovelluksia asiakkaille — he skannaavat QR:n kameralla, lista avautuu selaimessa. Ei teknisiä taitoja sinulle — koko paneeli toimii puhelimessa, napauta lisätäksesi, vedä järjestääksesi, siinä koko oppimiskäyrä." },
      { q: "Kuinka nopeasti muutan hintoja ja lisään annoksia?", a: "Heti. Vaihda hinta puhelimessa, asiakkaat näkevät sekunneissa. Uusi annos? Napauta, kirjoita, kuva, valmis — ei tulosteita, ei suunnittelijan odotusta." },
      { q: "Kuinka monta kieltä tuetaan?", a: "35 kieltä sisäänrakennetulla AI-käännöksellä. Yksi napsautus kääntää koko listan, AI ymmärtää kulinaarisen kontekstin — nimet ja kuvaukset kuulostavat luonnollisilta jokaisella kielellä. Turistit tilaavat enemmän kun ymmärtävät." },
    ],
  },
  finalCta: { heading: "Valmis 2 minuutissa.", headingAccent: "Ilmaiseksi 14 päivää.", sub: "Ei korttia. Peruuta milloin haluat. Liity 500+ ravintolaan jo IQ Restissä." },
  scan: {
    heading: "Paperinen ruokalista tai PDF?",
    headingAccent: "Tekoäly digitoi sen 60 sekunnissa.",
    sub: "Lataa — tekoäly löytää luokat, annokset ja hinnat.",
    cta: "Skannaa ruokalista →",
  },
  footer: {
    featureLinks: [
      { href: "/fi/online-orders", label: "Online-tilaukset" },
      { href: "/fi/ai-translation", label: "AI-käännös" },
      { href: "/fi/reservations", label: "Varaukset" },
      { href: "/fi/mobile-management", label: "Mobiilihallinta" },
      { href: "/fi/easy-menu", label: "Listan editori" },
      { href: "/fi/custom-design", label: "Video- ja kuvataustat" },
      { href: "/fi/color-scheme", label: "Brändivärit" },
      { href: "/fi/multilingual", label: "Monikielinen sivusto" },
      { href: "/fi/ai-images", label: "AI-kuvaoptimointi" },
      { href: "/fi/analytics", label: "Analytiikka" },
      { href: "/fi/instant-setup", label: "Välitön asennus" },
      { href: "/fi/personal-support", label: "Henkilökohtainen tuki" },
    ],
    navLinks: [
      { href: "#pricing", label: "Hinnat" }, { href: "#faq", label: "Kysymykset" },
      { href: "/fi/languages", label: "Vaihda kieli" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Kaikki oikeudet pidätetään.",
  },
};
