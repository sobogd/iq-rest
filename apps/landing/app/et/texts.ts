import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "et", htmlDir: "ltr",
  meta: {
    title: "QR-menüü Restoranidele — Otsetellimused, Null Vahendustasu | IQ Rest",
    description: "Lõpp paberist menüüdele ja kullerirakenduste vahendustasudele. QR-menüü, otsetellimused, broneeringud ja mitmekeelne veebileht. 14 päeva tasuta, kaardita.",
    canonical: "https://iq-rest.com/et", ogLocale: "et_EE",
    ogTitle: "QR-menüü Restoranidele — Otsetellimused, Null Vahendustasu",
    ogDescription: "QR-menüü, otsetellimused, broneeringud ja AI tõlge. Valmis 2 minutiga. 14 päeva tasuta — kaardita.",
  },
  ctaText: "Alusta tasuta →", microcopy: "14 päeva tasuta · Ilma kaardita · Tühista millal soovid",
  header: { navFeatures: "Funktsioonid", navHow: "Kuidas töötab", navPricing: "Hinnad", navFaq: "FAQ", signIn: "Logi sisse", cta: "Alusta tasuta →" },
  hero: {
    verticals: ["Restoranid", "Kohvikud", "Baarid", "Hotellid", "Pitsabaarid"],
    variants: [
      { headline: "Lõpeta menüüde printimine.", headlineAccent: "Lõpeta 30% maksmine kullerirakendustele.", sub: "QR-menüü, otsetellimused, broneeringud ja mitmekeelne veebileht. Valmis 2 minutiga — kaardita." },
      { headline: "Sinu restoran väärib enamat kui", headlineAccent: "paberist menüüd ja vastamata kõnesid.", sub: "Otsetellimused, kohesed menüü uuendused ja broneeringud 24/7. Seadistatud 2 minutiga." },
      { headline: "Üks QR-kood.", headlineAccent: "Null vahendustasu. Hüvasti paberile.", sub: "QR-menüü, online tellimused ja broneeringud — kõik ühes kohas. 14 päeva tasuta, kaardita." },
      { headline: "Saa otsetellimusi.", headlineAccent: "Jäta vahendustasu vahele.", sub: "Külalised skannivad, tellivad ja maksavad — otse sulle, ilma Wolt-i osata. Valmis 2 minutiga." },
      { headline: "Rohkem tellimusi. Rohkem broneeringuid.", headlineAccent: "Ilma paberita, ilma rakendusteta.", sub: "QR-menüü + broneeringud + mitmekeelne veebileht autopiloodil. 14-päevane tasuta proov." },
      { headline: "Turistid ei mõista menüüd?", headlineAccent: "Lahendatud 2 minutiga.", sub: "AI tõlgib kogu menüü 35 keelde. Pluss QR tellimused ja broneeringud." },
      { headline: "Paberist menüüst QR-koodiks,", headlineAccent: "enne kui espresso jahtub.", sub: "QR-menüü, otsetellimused ja broneeringud 24/7. Valmis 2 minutiga — kaardita." },
      { headline: "Värskendavalt lihtne QR-menüü.", headlineAccent: "Vaikselt võimas seest.", sub: "Otsetellimused, AI tõlge, broneeringud ja veebileht — kõik ühe puudutusega telefonis." },
    ],
    painBullets: ["Ilma printimiseta — muuda hindu kohe", "Null vahendustasu — tellimused otse sulle", "Ilma vastamata kõnedeta — broneeringud 24/7", "35 keelt — ära kunagi kaota turisti"],
    rating: "4,9 · üle 500 restorani 30+ riigis",
  },
  features: {
    heading: "Kõik mida vajad.", headingAccent: "Mitte midagi muud.",
    sub: "Restoranidele tehtud. Lauas kasutatud.",
    items: [
      { Icon: ScanLine, title: "Hoia 100% igast tellimusest", desc: "Külalised skannivad, tellivad ja maksavad — otse sulle. Ilma rakendusteta, ilma 30% kullerivahendita. Iga tellimus saabub reaalajas lauanumbriga paneeli." },
      { Icon: Languages, title: "Müü turistidele nende keeles", desc: "Üks puudutus tõlgib kogu menüü 35 keelde. AI mõistab kulinaarset konteksti — külalised tellivad rohkem, kui nad tegelikult mõistavad rooga." },
      { Icon: CalendarCheck, title: "Ära kaota broneeringuid kööki kütes", desc: "Külalised broneerivad 24/7, ilma kõnedeta. Auto- või käsitsi kinnitamine, e-posti meeldetuletused — vähem mitteilmumisi, null stressi." },
      { Icon: Palette, title: "Unustamatu 1 sekundiga", desc: "Pane köögivideo või toidufoto menüü taustaks. Külalised lõpetavad kerimise. Sinu bränd jääb meelde." },
      { Icon: Smartphone, title: "Muuda sekunditega, mitte päevadega", desc: "Hinnad, fotod, päeva eripakkumine — telefonist, laudade vahel. Otse külalistele kohe. Kunagi enam printimist." },
      { Icon: ListPlus, title: "Kui oskad WhatsAppi saata, oskad seda kasutada", desc: "Puuduta toidu lisamiseks. Lohista ümberkorraldamiseks. Lülita välja see, mis otsa sai. Ilma juhenditeta, ilma õpetusteta, ilma õppimiskõverata." },
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
    heading: "Live alla 2 minutiga",
    sub: "Neli lühikest sammu. Ilma paigalduseta, ilma tehnilise seadistuseta.",
    steps: [
      { n: "1", t: "Registreeru", d: "E-post või Google. Kaardita. 10 sekundiga valmis." },
      { n: "2", t: "Restorani nimi", d: "Kirjuta nimi. Ilmub menüü ülaossa." },
      { n: "3", t: "Lisa esimene roog", d: "Kategooria, nimi, hind, foto. Ongi kõik." },
      { n: "4", t: "Vali taust ja prindi QR", d: "Vali taust. Võta QR. Kleebi laudadele." },
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
      { q: "Kas saan ühest kontost mitut restorani hallata?", a: "Jah. Pro pakett võimaldab mitut restorani samas kontos — eraldi menüüd, eraldi QR-id, eraldi statistika, üks sisselogimine. Vaheta kahe puudutusega." },
      { q: "Kui kiiresti muudan hindu ja lisan roogasid?", a: "Kohe. Muuda hinda telefonis, külalised näevad sekunditega. Uus roog? Puuduta, kirjuta, foto, valmis — ilma uuesti printimata, ilma disainerit ootamata." },
      { q: "Mitut keelt toetate?", a: "35 keelt sisseehitatud AI tõlkega. Üks puudutus tõlgib kogu menüü ja AI mõistab kulinaarset konteksti — nimed ja kirjeldused kõlavad iga keeles loomulikult. Turistid tellivad rohkem, kui nad tegelikult mõistavad." },
    ],
  },
  finalCta: { heading: "Valmis 2 minutiga.", headingAccent: "Tasuta 14 päeva.", sub: "Kaardita. Tühista millal soovid. Liitu 500+ restoraniga juba IQ Restis." },
  footer: {
    featureLinks: [
      { href: "/et/online-orders", label: "Online tellimused" }, { href: "/et/ai-translation", label: "AI tõlge" },
      { href: "/et/reservations", label: "Broneeringud" }, { href: "/et/mobile-management", label: "Mobiilihaldus" },
      { href: "/et/easy-menu", label: "Menüü redaktor" }, { href: "/et/custom-design", label: "Video- ja fototaustad" },
      { href: "/et/color-scheme", label: "Brändivärvid" }, { href: "/et/multilingual", label: "Mitmekeelne veebileht" },
      { href: "/et/ai-images", label: "AI fotooptimeerimine" }, { href: "/et/analytics", label: "Statistika" },
      { href: "/et/instant-setup", label: "Kohene seadistus" }, { href: "/et/personal-support", label: "Isiklik tugi" },
    ],
    navLinks: [
      { href: "#pricing", label: "Hinnad" }, { href: "#faq", label: "Küsimused" },
      { href: "/et/contacts", label: "Kontakt" }, { href: "/et/changelog", label: "Uudised" },
      { href: "/et/languages", label: "Vaheta keelt" },
    ],
    legalLinks: [
      { href: "/et/terms", label: "Tingimused" }, { href: "/et/privacy", label: "Privaatsus" },
      { href: "/et/cookies", label: "Küpsised" }, { href: "/sitemap.xml", label: "Saidikaart" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Kõik õigused kaitstud.",
  },
};
