import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "fi",
  htmlDir: "ltr",

  meta: {
    title: "QR-ruokalista ravintoloille — Suorat tilaukset, nolla komissiota | IQ Rest",
    description:
      "Kaikki yhdessä -alusta ravintoloille: digitaalinen ruokalista, QR-tilaukset, pöytävaraus ja keittiön näyttö. Käyntiin 5 minuutissa. 14 päivää ilmaiseksi, ilman korttia.",
    canonical: "https://iq-rest.com/fi",
    ogLocale: "fi_FI",
    ogTitle: "QR-ruokalista ravintoloille — Suorat tilaukset, nolla komissiota",
    ogDescription:
      "Digitaalinen ruokalista, QR-tilaukset, pöytävaraus ja tekoälykäännös. Käyntiin 5 minuutissa. 14 päivää ilmaiseksi.",
  },

  ctaText: "Luo digitaalinen ruokalista",
  demoText: "Katso demo",
  microcopy: "14 päivää ilmaiseksi · Ilman korttia · Peruutus koska tahansa",

  header: {
    navFeatures: "Ominaisuudet",
    navHow: "Miten se toimii",
    navPricing: "Hinnat",
    navFaq: "UKK",
    signIn: "Kirjaudu sisään",
    cta: "Luo ruokalista",
  },

  hero: {
    verticals: ["Ravintolat", "Kahvilat", "Baarit", "Hotellit", "Pizzeriat"],
    headline: "Digitaalinen ruokalista ravintoloille. Käytössä 5 minuutissa.",
    sub: "Digitaalinen ruokalista ravintoloosi 5 minuutissa. Kaikki mukana: koodaamaton editori, ruokalistan AI-tunnistus, QR-koodit pöytiin ja suorat tilaukset ilman komissiota.",
    dynamicHeadlines: ["0 % komissiota.", "35 tekoälykieltä.", "Verkkotilaukset.", "Varaukset 24/7.", "Premium-suunnittelu."],
    painBullets: [
      "0 % komissiota: jokainen tilaus menee suoraan ravintolaasi.",
      "Tekoälykäännös 35 kielelle — turistit ymmärtävät ruokalistan ja tilaavat enemmän.",
      "Varaus 24/7: vieraat varaavat pöydät itse, ilman puheluita ruuhka-aikoina.",
      "Joustava hinnoittelu: muutokset ruokalistaan tulevat näkyviin sekunneissa.",
    ],
    rating: "Yli 500 ravintolaa yli 30 maassa",
  },

  features: {
    heading: "Kaikki mitä tarvitset.",
    headingAccent: "Ei mitään ylimääräistä.",
    sub: "Tehty ravintoloille. Käytössä joka päivä pöydässä, keittiössä ja salissa.",
    items: [
      { Icon: Monitor, title: "Digitaalinen ruokalista", desc: "Ruokalista selaimessa kuvilla, hinnoilla, allergeeneilla ja kuvauksilla. Päivittyy reaaliajassa puhelimesta. Vieraat näkevät ruokalistan omalla kielellään; ravintola säästää tulostuksessa.", tag: "Digitaalinen ruokalista", href: "/fi/digitaalinen-ruokalista-ravintola" },
      { Icon: Receipt, title: "Tilausten vastaanotto: vieras ja tarjoilija", desc: "QR-koodi pöydässä vieraalle tai tarjoilija ottaa tilauksen puhelimesta — molemmat menevät suoraan keittiöön tai WhatsAppiin. Ilman komissiota, pöytänumero jokaisessa tositteessa.", tag: "Tilaukset", href: "/fi/tilausjarjestelma-ravintola" },
      { Icon: CalendarCheck, title: "Pöytävaraus 24/7", desc: "Vieraat varaavat pöydät itse sivuston tai QR-ruokalistan kautta, kun olet kiireinen salissa. Pöytäkalenteri, automaattiset vahvistukset ja muistutukset. Ei yhtään menetettyä vierasta.", tag: "Varaus", href: "/fi/poytavaraus" },
      { Icon: ChefHat, title: "Keittiön näyttö (KDS)", desc: "Paperilappuja ei enää tarvita. Tilaukset salista menevät suoraan kokin näyttöön — sarakkeet ”valmistuksessa / valmis / tarjoiltu”, allergeenit ja muistiinpanot korostetaan värillä. Tabletilla tai puhelimella.", tag: "KDS", href: "/fi/keittion-naytto" },
    ],
  },

  founder: {
    eyebrow: "Ravintoloitsijoiden rakentama",
    quoteStart:
      "Vaimoni kanssa pyöritimme omaa kahvilaamme ja tiedämme omakohtaisesti, miltä ravintolapäivä todella näyttää — tilausten otto, varaukset, salin ja keittiön virtaus. Halusimme yhden ainoan työkalun: modernin, helposti käyntiin saatavan ja heti ymmärrettävän —",
    quoteAccent: "niin aloimme rakentaa alustaa, jota nyt kehitämme muille ravintoloitsijoille.",
    sign: "Bogdan Sokolov · perustaja, entinen kahvilanomistaja",
    photoAlt: "Bogdan Sokolov, IQ Restin perustaja",
  },

  how: {
    heading: "Käytössä 5 minuutissa",
    sub: "Neljä lyhyttä vaihetta. Ei asennuksia, ei teknistä asetusta.",
    steps: [
      { n: "1", t: "Tyyppi ja nimi", d: "Valitse paikan tyyppi ja syötä nimi." },
      { n: "2", t: "Tallenna", d: "Syötä sähköpostisi tai kirjaudu Googlella." },
      { n: "3", t: "Ruokalista", d: "Lisää tuotteet käsin tai lataa painettu ruokalista AI-skannaukseen." },
      { n: "4", t: "Valmis", d: "Jaa linkki tai QR-koodi ja aloita tilausten vastaanotto." },
    ],
  },

  pricing: {
    badge: "Ei komissiota · Ei sopimuksia",
    heading: "Yksi paketti.",
    headingAccent: "Kaikki mukana.",
    sub: "QR-ruokalista, tilausten vastaanotto, AI-käännös, ravintolan verkkosivu ja varaus. Yksi läpinäkyvä kuukausimaksu.",
    monthlyLabel: "Kuukausittain",
    yearlyLabel: "Vuosittain",
    saveBadge: "Säästä 25 %",
    perMonth: "kuukaudessa",
    billedAnnually: "Vuosilaskutus: {total}",
    youSave: "Säästät {amount}",
    trust: { secure: "Turvallinen Stripe-maksu", noCommitment: "Ei sitoutumista", quick: "Aktiivinen muutamassa minuutissa", restaurants: "500+ ravintolaa" },
  },

  faq: {
    eyebrow: "Onko kysyttävää?",
    heading: "Usein kysytyt",
    headingAccent: "kysymykset.",
    sub: "Mitä ravintoloitsijat kysyvät ennen rekisteröitymistä. Etkö löydä omaa kysymystäsi? Kirjoita meille WhatsAppissa — vastaa oikeat ihmiset, ei botti.",
    whatsappCta: "Kysy WhatsAppissa",
    whatsappPrefill: "Hei, minulla on kysymys IQ Restistä",
    items: [
      { q: "Mitä kokeilujakso sisältää ja mitä tapahtuu sen jälkeen?", a: "Täysi pääsy kaikkiin ominaisuuksiin 14 päivän ajan, ilman korttia. 14 päivän jälkeen tili keskeytetään, jos maksutapaa ei lisätä — emme veloita koskaan automaattisesti. Voit lisätä maksun myöhemmin ja jatkaa siitä mihin jäit. Peruutus koska tahansa yhdellä klikkauksella." },
      { q: "Otatteko provisiota tilauksista?", a: "Emme. Jokainen tilaus QR-ruokalistalta menee suoraan ravintolalle — ei prosenttia meidän puolelta, ei välityspalkkioita. Yksi kiinteä kuukausimaksu ja ei muuta." },
      { q: "Tarvitsevatko vieraat sovelluksen, tarvitsemmeko teknisiä taitoja?", a: "Vieraat eivät tarvitse sovellusta — he osoittavat puhelimen kameraa QR-koodia kohti ja ruokalista aukeaa selaimessa. Ravintolat eivät myöskään tarvitse teknisiä taitoja: hallintapaneeli toimii missä tahansa modernissa selaimessa puhelimessa, tabletissa tai läppärillä. Jokainen toiminto on klikkaamalla ja raahaamalla, ilman koodia." },
      { q: "Kuinka nopeasti hinnat muuttuvat ja uudet ruoat ilmestyvät?", a: "Heti. Vaihda hintaa puhelimesta — vieraat näkevät sen sekunneissa. Uusi ruoka vie muutaman näpäytyksen: nimi, hinta, kuva. Ei uudelleenpainatusta, ei suunnittelijan odottelua." },
      { q: "Kuinka monta kieltä tuetaan?", a: "35 kieltä sisäänrakennetulla AI-käännöksellä. Yksi näpäytys ja koko ruokalista on käännetty; AI ymmärtää kulinaarisen kontekstin — nimet ja kuvaukset kuulostavat luonnollisilta kaikilla kielillä. Turistit tilaavat varmemmin, kun he todella ymmärtävät ruokalistan." },
    ],
  },

  finalCta: {
    heading: "Käytössä 5 minuutissa.",
    headingAccent: "14 päivää ilmaiseksi.",
    sub: "Ilman korttia, peruutus koska tahansa. Liity 500+ ravintolaan, jotka jo käyttävät IQ Restiä.",
  },

  scan: {
    heading: "Onko sinulla paperinen ruokalista tai PDF?",
    headingAccent: "AI digitoi sen 60 sekunnissa.",
    sub: "Lataa kuva tai dokumentti — AI tunnistaa kategoriat, ruoat ja hinnat automaattisesti.",
    cta: "Skannaa ruokalista →",
  },

  pricingHero: {
    chips: ["Ei komissiota", "Ei sopimuksia", "14 päivää ilmaiseksi"],
    heading: "Hinnat.",
    headingAccent: "Ei piilokuluja.",
    sub: "Yksi läpinäkyvä kuukausimaksu. Ei prosenttia tilauksista eikä välityspalkkioita. Peruuta tilaus koska tahansa.",
    popularBadge: "Suosittu",
    perMonthSuffix: "/kk",
    whenAnnualTemplate: "vuosilaskutus · {total} € vuodessa",
    orMonthlyTemplate: "tai {price} €/kk",
    savingsTemplate: "säästä {amount} € vuodessa",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Ruokalista, QR-tilaukset ja AI-käännös. Käytössä 5 minuutissa.",
        features: [
          "QR-ruokalista jokaiseen pöytään",
          "Digitaalinen ruokalista kuvilla ja allergeeneilla",
          "AI-käännös 35 kielelle",
          "Tilaukset ruokalistalta (valinnainen)",
          "AI-ruokakuvien generointi",
          "Hallinta mistä tahansa puhelimesta tai tabletista",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Täysi hallinta ravintolasta: keittiön näyttö ja varaukset.",
        features: [
          "Kaikki Basicista",
          "Keittiön näyttö (KDS)",
          "Verkkopöytävaraus 24/7",
          "Prioriteetti-WhatsApp-tuki",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/fi/digitaalinen-ruokalista-ravintola", label: "Digitaalinen ruokalista" },
      { href: "/fi/tilausjarjestelma-ravintola", label: "Tilaukset" },
      { href: "/fi/poytavaraus", label: "Varaus" },
      { href: "/fi/keittion-naytto", label: "Keittiön näyttö" },
    ],
    navLinks: [
      { href: "/fi/hinnat", label: "Hinnat" },
      { href: "#faq", label: "UKK" },
      { href: "/fi/languages", label: "Vaihda kieli" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Kaikki oikeudet pidätetään.",
  },
};
