import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "et",
  htmlDir: "ltr",

  meta: {
    title: "QR-menüü restoranidele — Otse tellimused, null komisjoni | IQ Rest",
    description:
      "Kõik-ühes platvorm restoranidele: digitaalne menüü, QR-tellimused, laudade broneerimine ja köögiekraan. Käivitub 5 minutiga. 14 päeva tasuta, ilma kaardita.",
    canonical: "https://iq-rest.com/et",
    ogLocale: "et_EE",
    ogTitle: "QR-menüü restoranidele — Otse tellimused, null komisjoni",
    ogDescription:
      "Digitaalne menüü, QR-tellimused, laudade broneerimine ja AI-tõlge. Käivitub 5 minutiga. 14 päeva tasuta.",
  },

  ctaText: "Loo digitaalne menüü",
  demoText: "Vaata demo",
  microcopy: "14 päeva tasuta · Ilma kaardita · Tühista igal ajal",

  header: {
    navFeatures: "Funktsioonid",
    navHow: "Kuidas töötab",
    navPricing: "Hinnad",
    navFaq: "KKK",
    signIn: "Logi sisse",
    cta: "Loo menüü",
  },

  hero: {
    verticals: ["Restoranid", "Kohvikud", "Baarid", "Hotellid", "Pitsabaarid"],
    headline: "Digitaalne menüü restoranidele. Veebis 5 minutiga.",
    sub: "Digitaalne menüü sinu restoranile 5 minutiga. Kõik kaasas: koodita redaktor, AI-tuvastus trükimenüüst, QR-koodid laudadele ja otsetellimused ilma komisjonita.",
    dynamicHeadlines: ["0% komisjon.", "35 AI-keelt.", "Veebitellimused.", "Broneerimine 24/7.", "Premium-disain."],
    painBullets: [
      "0% komisjon: iga tellimus läheb otse sinu restorani.",
      "AI-tõlge 35 keeles — turistid mõistavad menüüd ja tellivad rohkem.",
      "Broneerimine 24/7: külalised broneerivad lauad ise, ilma kõnedeta tipptundidel.",
      "Paindlikud hinnad: menüü uuendused jõuavad veebi sekunditega.",
    ],
    rating: "Üle 500 restorani enam kui 30 riigis",
  },

  features: {
    heading: "Kõik, mida vajad.",
    headingAccent: "Mitte midagi liigset.",
    sub: "Loodud restoranide jaoks. Kasutatakse iga päev lauas, köögis ja saalis.",
    items: [
      { Icon: Monitor, title: "Digitaalne menüü", desc: "Menüü brauseris fotode, hindade, allergeenide ja kirjeldustega. Uueneb reaalajas telefonist. Külalised näevad menüüd oma keeles; restoran hoiab kokku trükikuludelt.", tag: "Digitaalne menüü", href: "/et/digitaalne-menuu-restoran" },
      { Icon: Receipt, title: "Tellimuste vastuvõtmine: külaline ja kelner", desc: "QR-kood lauas külalisele või kelner võtab tellimuse telefonist — mõlemad jõuavad otse kööki või WhatsAppi. Ilma komisjonita, lauanumbriga igal tellimisel.", tag: "Tellimused", href: "/et/tellimissusteem-restoran" },
      { Icon: CalendarCheck, title: "Laudade broneerimine 24/7", desc: "Külalised broneerivad lauad ise veebilehe või QR-menüü kaudu, samal ajal kui sa oled saalis hõivatud. Lauakalender, automaatsed kinnitused ja meeldetuletused. Mitte ühtegi kaotsi läinud külalist.", tag: "Broneerimine", href: "/et/laudade-broneerimine" },
      { Icon: ChefHat, title: "Köögiekraan (KDS)", desc: "Paberitellimusi pole enam vaja. Saali tellimused jõuavad otse koka ekraanile — veerud „valmistatakse / valmis / serveeritud“, allergeenid ja märkused värviga esile tõstetud. Tahvlil või telefonis.", tag: "KDS", href: "/et/kook-ekraan" },
    ],
  },

  founder: {
    eyebrow: "Ehitatud restoranipidajate poolt",
    quoteStart:
      "Mu naine ja mina pidasime omaenda kohvikut ja teame omast käest, kuidas restoranipäev tegelikult kulgeb — tellimuste vastuvõtmine, broneeringud, saali ja köögi voog. Tahtsime ühte tööriista: kaasaegset, kergesti käivitatavat ja esmapilgul arusaadavat —",
    quoteAccent: "nii hakkasime ehitama platvormi, mida nüüd arendame teiste restoranipidajate jaoks.",
    sign: "Bogdan Sokolov · asutaja, endine kohviku omanik",
    photoAlt: "Bogdan Sokolov, IQ Resti asutaja",
  },

  how: {
    heading: "Veebis 5 minutiga",
    sub: "Neli lühikest sammu. Ilma installideta, ilma tehnilise seadistuseta.",
    steps: [
      { n: "1", t: "Tüüp ja nimi", d: "Vali asutuse tüüp ja sisesta nimi." },
      { n: "2", t: "Salvesta", d: "Sisesta oma e-post või logi sisse Google'iga." },
      { n: "3", t: "Menüü", d: "Lisa tooted käsitsi või laadi üles trükitud menüü AI-skannimiseks." },
      { n: "4", t: "Valmis", d: "Jaga linki või QR-koodi ja alusta tellimuste vastuvõtmist." },
    ],
  },

  pricing: {
    badge: "Ilma komisjonita · Ilma lepinguteta",
    heading: "Üks plaan.",
    headingAccent: "Kõik kaasas.",
    sub: "QR-menüü, tellimuste vastuvõtmine, AI-tõlge, restorani veebileht ja broneerimine. Üks läbipaistev kuutasu.",
    monthlyLabel: "Kuus",
    yearlyLabel: "Aastas",
    saveBadge: "Säästa 25%",
    perMonth: "kuus",
    billedAnnually: "Aastane arve: {total}",
    youSave: "Säästad {amount}",
    trust: { secure: "Turvaline Stripe'i makse", noCommitment: "Ilma kohustuseta", quick: "Aktiveerub minutitega", restaurants: "500+ restorani" },
  },

  faq: {
    eyebrow: "Kas sul on küsimusi?",
    heading: "Korduma kippuvad",
    headingAccent: "küsimused.",
    sub: "Mida restoranipidajad enne registreerumist küsivad. Ei leia oma küsimust? Kirjuta meile WhatsAppi — vastavad päris inimesed, mitte bot.",
    whatsappCta: "Küsi WhatsAppis",
    whatsappPrefill: "Tere, mul on küsimus IQ Resti kohta",
    items: [
      { q: "Mida sisaldab prooviperiood ja mis juhtub pärast?", a: "Täielik juurdepääs kõigile funktsioonidele 14 päeva, ilma kaardita. Pärast 14 päeva pannakse konto pausile, kui makseviisi pole lisatud — me ei nõua kunagi automaatselt. Sa võid makse hiljem lisada ja jätkata sealt, kus pooleli jäi. Tühista igal ajal ühe klikiga." },
      { q: "Kas võtate tellimustelt komisjoni?", a: "Ei. Iga tellimus QR-menüüst läheb otse restorani — meie poolt ei mingit protsenti, ei mingeid agregaatorite tasusid. Üks kindel kuutasu ja muud midagi." },
      { q: "Kas külalised vajavad rakendust, kas meil on vaja tehnilisi oskusi?", a: "Külalised ei vaja rakendust — nad suunavad telefoni kaamera QR-koodile ja menüü avaneb brauseris. Restoranid ei vaja samuti tehnilisi oskusi: halduspaneel töötab igas kaasaegses brauseris telefonis, tahvelarvutis või sülearvutis. Iga toiming on klikiga ja lohistamisega, ilma koodita." },
      { q: "Kui kiiresti muutuvad hinnad ja ilmuvad uued road?", a: "Kohe. Muuda hinda telefonist — külalised näevad seda sekundite jooksul. Uus roog võtab paar puudutust: nimi, hind, foto. Ilma uue trükita, ilma disaineri ootamist." },
      { q: "Mitut keelt toetatakse?", a: "35 keelt sisseehitatud AI-tõlkega. Üks puudutus ja kogu menüü on tõlgitud; AI mõistab kulinaarset konteksti — nimed ja kirjeldused kõlavad loomulikult igas keeles. Turistid tellivad enesekindlamalt, kui nad menüüd tõeliselt mõistavad." },
    ],
  },

  finalCta: {
    heading: "Veebis 5 minutiga.",
    headingAccent: "14 päeva tasuta.",
    sub: "Ilma kaardita, tühista igal ajal. Liitu 500+ restoraniga, kes juba kasutavad IQ Resti.",
  },

  scan: {
    heading: "On sul paberil menüü või PDF?",
    headingAccent: "AI digiteerib selle 60 sekundiga.",
    sub: "Lae üles foto või dokument — AI tuvastab kategooriad, road ja hinnad automaatselt.",
    cta: "Skanni menüü →",
  },

  pricingHero: {
    chips: ["Ilma komisjonita", "Ilma lepinguteta", "14 päeva tasuta"],
    heading: "Hinnad.",
    headingAccent: "Mitte mingeid varjatud tasusid.",
    sub: "Üks läbipaistev kuutasu. Mitte mingit protsenti tellimustelt ega agregaatorite komisjoni. Tühista tellimus igal ajal.",
    popularBadge: "Populaarne",
    perMonthSuffix: "/k",
    whenAnnualTemplate: "aastane arve · {total} € aastas",
    orMonthlyTemplate: "või {price} €/k",
    savingsTemplate: "säästad {amount} € aastas",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menüü, QR-tellimused ja AI-tõlge. Veebis 5 minutiga.",
        features: [
          "QR-menüü igale lauale",
          "Digitaalne menüü fotode ja allergeenidega",
          "AI-tõlge 35 keelde",
          "Tellimused menüüst (valikuline)",
          "AI roogade fotode genereerimine",
          "Halda igast telefonist või tahvelarvutist",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Täielik kontroll restorani üle: köögiekraan ja broneeringud.",
        features: [
          "Kõik Basicust",
          "Köögiekraan (KDS)",
          "Veebipõhine laudade broneerimine 24/7",
          "Eelistatud WhatsAppi tugi",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/et/digitaalne-menuu-restoran", label: "Digitaalne menüü" },
      { href: "/et/tellimissusteem-restoran", label: "Tellimused" },
      { href: "/et/laudade-broneerimine", label: "Broneerimine" },
      { href: "/et/kook-ekraan", label: "Köögiekraan" },
    ],
    navLinks: [
      { href: "/et/hinnad", label: "Hinnad" },
      { href: "#faq", label: "KKK" },
      { href: "/et/languages", label: "Muuda keelt" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Kõik õigused kaitstud.",
  },
};
