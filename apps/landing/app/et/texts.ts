import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "et", htmlDir: "ltr",
  meta: {
    title: "QR-menüü Restoranidele — Otsetellimused, Null Vahendustasu | IQ Rest",
    description: "Lõpp paberist menüüdele ja kullerirakenduste vahendustasudele. QR-menüü, otsetellimused, broneeringud ja mitmekeelne veebileht. 14 päeva tasuta, kaardita.",
    canonical: "https://iq-rest.com/et", ogLocale: "et_EE",
    ogTitle: "QR-menüü Restoranidele — Otsetellimused, Null Vahendustasu",
    ogDescription: "QR-menüü, otsetellimused, broneeringud ja AI tõlge. Valmis 5 minutiga. 14 päeva tasuta — kaardita.",
  },
  ctaText: "Proovi tasuta",
  demoText: "Vaata demo", microcopy: "14 päeva tasuta · Ilma kaardita · Tühista millal soovid",
  header: { navFeatures: "Funktsioonid", navHow: "Kuidas töötab", navPricing: "Hinnad", navFaq: "FAQ", signIn: "Logi sisse", cta: "Proovi tasuta" },
  hero: {
    verticals: ["Restoranid", "Kohvikud", "Baarid", "Hotellid", "Pitsabaarid"],
    headline: "QR-menüü 5 minutiga.",
    sub: "Valmis veebisait teie restoranile — ilma arendajate ja alltöövõtjateta. Otsetellimused, broneeringud ja külaliste analüütika ühes tellimuses.",
    dynamicHeadlines: ["0% vahendustasu.", "35 keelt tehisintellektiga.", "Online tellimused.", "Broneeringud 24/7.", "Premium disain."],
    painBullets: ["0% vahendustasu: Kõik tellimused lähevad otse teile.", "AI-tõlge: 35 keelt turistide keskmise arve suurendamiseks.", "Broneeringud 24/7: Täis saal ilma liigsete kõnedeta.", "Paindlikud hinnad: Uuendage menüüd sekunditega."],
    rating: "Üle 500 restorani 30+ riigis",
  },
  features: {
    heading: "Kõik mida vajad.", headingAccent: "Mitte midagi muud.",
    sub: "Restoranidele tehtud. Lauas kasutatud.",
    items: [
      
      { Icon: QrCode, title: "Tellimine lauast", desc: "Tellimused saabuvad kohe WhatsAppi või paneeli koos lauanumbriga. Kiirem teenindus.", tag: "Otsetellimused", href: "/et/online-tellimissusteem-restoranile" },
      { Icon: Languages, title: "AI-tõlkija (35 keelt)", desc: "Meie AI tunneb gastronoomiat. Turistid tellivad 20% rohkem, kui nad saavad menüüst aru.", tag: "AI-tõlge" },
      { Icon: CalendarCheck, title: "Laudade broneerimine", desc: "Süsteem võtab broneeringuid vastu, kui olete köögis ametis. Mitte ühtegi kaotatud klienti.", tag: "Broneeringud" },
      { Icon: Palette, title: "Moodne disain", desc: "Videotaustad ja isuäratavad fotod. Teie menüü näeb välja kallis ja kutsub tellima.", tag: "Oma kujundus" },
      { Icon: Smartphone, title: "Kiire redaktor", desc: "Hallake stop-listi ja hindu otse nutitelefonist. Muudatused on kohe nähtavad.", tag: "Menüü-redaktor" },
      { Icon: ChefHat, title: "Varsti: Köögiekrann", desc: "Unustage paberšekid. Saalist tulevad tellimused lähevad otse koka ekraanile.", tag: "Tulekul" },
    
    ],
  },
  founder: {
    eyebrow: "Tehtud restoranipidaja poolt",
    quoteStart: "Mu naine ja mina avasime kohviku ja otsisime nädalaid süsteemi, mis tegeleks online tellimustega, broneeringutega ja näeks ka kaasaegne välja. Kõik mida proovisime, oli kohmakas, kole või puudusid pooled funktsioonid —",
    quoteAccent: "nii et ehitasime selle, mida ise oleksime tahtnud.",
    sign: "Bogdan Sokolov · asutaja, endine kohviku omanik",
    photoAlt: "Bogdan, IQ Resti asutaja",
  },
  how: {
    heading: "Live alla 5 minutiga",
    sub: "Neli lühikest sammu. Ilma paigalduseta, ilma tehnilise seadistuseta.",
    steps: [
      { n: "1", t: "Tüüp ja nimi", d: "Vali tüüp ja sisesta nimi." },
      { n: "2", t: "Salvestamine", d: "E-post või sisselogimine Google'iga." },
      { n: "3", t: "Menüü", d: "Loo ise või skanni paberkandjal." },
      { n: "4", t: "Valmis", d: "Vaata, jaga ja võta tellimusi vastu." },
    ],
  },
  pricing: {
    badge: "Null vahendustasu · Ilma lepinguteta",
    heading: "Üks pakett.", headingAccent: "Kõik sees.",
    sub: "QR-menüü, tellimused, AI tõlge, restorani veebileht ja broneeringud. Üks lihtne hind.",
    monthlyLabel: "Kuu", yearlyLabel: "Aasta", saveBadge: "Säästa 25%", perMonth: "kuus",
    billedAnnually: "Aastane arveldus {total}", youSave: "Säästad {amount}",
    trust: { secure: "Turvaline makse Stripe'ga", noCommitment: "Ilma kohustuseta", quick: "Aktiivne minutitega", restaurants: "500+ restorani" },
  },
  faq: {
    eyebrow: "Küsimused?", heading: "Korduma kippuvad", headingAccent: "küsimused.",
    sub: "Mida restoranipidajad küsivad enne registreerumist. Ei näe oma? Kirjuta WhatsAppis — vastavad päris inimesed.",
    whatsappCta: "Küsi WhatsAppist", whatsappPrefill: "Tere, mul on küsimus IQ Resti kohta",
    items: [
      { q: "Mida sisaldab tasuta prooviperiood ja mis juhtub pärast?", a: "14 päeva täielik juurdepääs, kaardita. Pärast 14 päeva konto peatub, kui ei lisa makseviisi — me ei võta kunagi automaatselt. Lisa hiljem makseandmed, et taasaktiveerida. Tühista ühe klõpsuga." },
      { q: "Kas võtate tellimuste pealt vahendustasu?", a: "Null. Iga tellimus sinu QR-menüüst läheb otse sulle — meie osa pole, Wolt / Bolt Food tasud puuduvad. Üks fikseeritud kuumakse, ongi kõik." },
      { q: "Kas külalistel on rakendust vaja? Kas mul on tehnilisi oskusi vaja?", a: "Külalistele rakendust pole — skannivad QR-i kaameraga, menüü avaneb brauseris. Sulle tehnilisi oskusi pole — kogu paneel töötab telefonis, puuduta lisamiseks, lohista ümberkorraldamiseks, ongi kogu kõver." },
      { q: "Kui kiiresti muudan hindu ja lisan roogasid?", a: "Kohe. Muuda hinda telefonis, külalised näevad sekunditega. Uus roog? Puuduta, kirjuta, foto, valmis — ilma uuesti printimata, ilma disainerit ootamata." },
      { q: "Mitut keelt toetate?", a: "35 keelt sisseehitatud AI tõlkega. Üks puudutus tõlgib kogu menüü ja AI mõistab kulinaarset konteksti — nimed ja kirjeldused kõlavad iga keeles loomulikult. Turistid tellivad rohkem, kui nad tegelikult mõistavad." },
    ],
  },
  finalCta: { heading: "Valmis 5 minutiga.", headingAccent: "Tasuta 14 päeva.", sub: "Kaardita. Tühista millal soovid. Liitu 500+ restoraniga juba IQ Restis." },
  scan: {
    heading: "Paber-menüü või PDF?",
    headingAccent: "Tehisintellekt digiteerib 60 sekundiga.",
    sub: "Lae üles — AI tunneb ära kategooriad, road ja hinnad.",
    cta: "Skanni menüü →",
  },
  footer: {
    featureLinks: [
      { href: "/et/online-tellimissusteem-restoranile", label: "Online tellimissüsteem" }, { href: "/et/ai-translation", label: "AI tõlge" },
      { href: "/et/reservations", label: "Broneeringud" }, { href: "/et/mobile-management", label: "Mobiilihaldus" },
      { href: "/et/easy-menu", label: "Menüü redaktor" }, { href: "/et/custom-design", label: "Video- ja fototaustad" },
      { href: "/et/color-scheme", label: "Brändivärvid" }, { href: "/et/multilingual", label: "Mitmekeelne veebileht" },
      { href: "/et/ai-images", label: "AI fotooptimeerimine" }, { href: "/et/analytics", label: "Statistika" },
      { href: "/et/instant-setup", label: "Kohene seadistus" }, { href: "/et/personal-support", label: "Isiklik tugi" },
    ],
    navLinks: [
      { href: "#pricing", label: "Hinnad" }, { href: "#faq", label: "Küsimused" },
      { href: "/et/languages", label: "Vaheta keelt" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Kõik õigused kaitstud.",
  },
};
