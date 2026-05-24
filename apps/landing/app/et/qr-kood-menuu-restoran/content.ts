import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "et",
  slug: "qr-kood-menuu-restoran",
  trackPrefix: "l_et_qr",

  meta: {
    title: "QR-kood menüü restoranidele | IQ Rest",
    description:
      "QR-kood menüü restoranidele: külaline skannib laual oleva QR-koodi, avab menüü brauseris ja tellib oma keeles. 14 päeva tasuta, kaardita.",
    canonical: "https://iq-rest.com/et/qr-kood-menuu-restoran",
    ogLocale: "et_EE",
    ogTitle: "QR-kood menüü restoranidele",
    ogDescription:
      "QR laual, menüü telefonis — fotod, allergeenid, 35 keelt ja reaalajas uuendused.",
    brandLine: "IQ Rest — QR-kood menüü restoranidele",
  },

  hero: {
    headline: "QR-kood menüü restoranidele.",
    sub: "Külaline suunab kaamera laual olevale QR-koodile ja menüü avaneb kohe telefoni brauseris: roogade fotod, allergeenid, alati ajakohased hinnad ja automaatne tõlge 35 keelde. Ilma rakendusi alla laadimata ja ilma menüüd iga hinnamuudatuse korral uuesti trükkimata.",
  },

  scan: {
    heading: "Kas sul on juba paber- või PDF-menüü?",
    headingAccent: "Tehisintellekt muudab selle 60 sekundiga QR-menüüks.",
    sub: "Laadi üles menüü foto või PDF — tehisintellekt eraldab kategooriad, road ja hinnad ning ühendab need kohe QR-menüüga.",
    cta: "Loo QR-menüü",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Üks QR, 35 keelt",
      heading: "Üks QR-kood, menüü 35 keeles.",
      body: "Külaline skannib QR-koodi ja valib oma keele: tõlke teeb gastronoomiat tajuv tehisintellekt, mitte üldine tõlkija. Lõpp eraldi menüüdele turistidele ja lahtistele paberitele laual.",
      bullets: [
        "Üks QR-trükk katab 35 keelt, sisaldub tellimuses.",
        "Tehisintellekt mõistab köögikeelt — roogade nimed kõlavad igas keeles loomulikult.",
        "Külaline vahetab keelt menüü sees, QR-koodi uuesti skannimata.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Kaks külalist skannivad sama laua QR-koodi ja loevad menüüd eri keeltes" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeenid QR-is",
      heading: "Allergeenid ja dieedimärgised QR-menüü sees.",
      body: "Iga roog QR-iga ühendatud menüüs võib kanda märgiseid gluteeni, laktoosi, pähklite, mereandide, vegan- ja gluteenivabade valikute kohta. Külaline filtreerib telefonist oma piirangutele sobivad road, personali küsimata.",
      bullets: [
        "14 allergeenikategooriat roa tasandil.",
        "Vegan-, taimetoidu- ja gluteenivaba märgised ühe klikiga paneelis.",
        "Külaline filtreerib QR-menüüd oma piirangute järgi.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Külaline filtreerib telefonis QR-menüüd allergeenide järgi, samal ajal kui omanik muudab nimekirja tahvelarvutis" },
    },
    {
      icon: Palette,
      eyebrow: "Enam kui lihtsalt QR",
      heading: "QR-menüü, viimistletud nagu restorani enda veebileht.",
      body: "Pärast koodi skannimist ei satu külaline lameda PDF-i peale: ta näeb tervitusekraani video või esiletõstetud fotoga, koha kirjeldust ja kontaktilehte kaardi, telefoninumbrite ja sotsiaalmeedia linkidega. QR-ist saab restorani uksesissepääs internetis.",
      bullets: [
        "Taustavideo või esiletõstetud foto QR-menüü avaekraanil.",
        "Ruum jutustada koha ja iga kategooria kontseptsioonist.",
        "Sisseehitatud kontaktileht: kaart, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Kaks telefoni laual: QR-menüü avaekraan taustavideoga ja kontaktileht kaardiga" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Tellimine QR-ist · valikuline",
      heading: "QR-koodist saab külaline ka tellida.",
      body: "Lisaks menüü vaatamisele võib QR-menüü muutuda tellimiskanaliks: külaline lisab road ostukorvi ja saadab päringu. Tellimus jõuab ettekandjani saalis, WhatsAppi või köögiekraanile. Funktsiooni saab vajadusel seadetes sisse või välja lülitada.",
      bullets: [
        "Ostukorv, märkused ja tellimuse saatmine otse QR-skannimisest.",
        "Tellimus jõuab kohe saali, WhatsAppi või köögiekraanile.",
        "Funktsiooni saab aktiveerida kellaaegade, saalide või kindlate restoranide kaupa.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Kaks telefoni laual: QR-menüüst loodud ostukorv ja saadetud tellimuse kinnitus" },
    },
  ],

  faq: {
    sub: "Mida restoranipidajad IQ Resti QR-menüü kohta küsivad. Ei leia oma küsimust? Kirjuta meile WhatsAppis.",
    items: [
      { q: "Kuidas IQ Resti QR-menüü töötab?", a: "Igal laual on trükitud QR-kood. Külaline skannib selle telefoni kaameraga ja brauser avab restorani menüü — fotod, kirjeldused, allergeenid ja ajakohased hinnad. Ühtegi rakendust pole vaja, ei külalisele ega personalile." },
      { q: "Kas QR-menüü loomiseks on vaja tehnilisi oskusi?", a: "Ei. Paneel töötab klikkimise ja lohistamisega, ilma koodi ja keeruliste seadeteta. Roa lisamine võtab paar sekundit: nimi, hind, foto. Esmane seadistus võtab tavaliselt 30 minutit kuni tund; kui sul on juba PDF-menüü, teisendab tehisintellekt selle automaatselt." },
      { q: "Kas külalised peavad QR-i lugemiseks rakenduse paigaldama?", a: "Ei. iPhone'i ja Androidi sisseehitatud kaamera tuvastab QR-koodi sekunditega ja avab menüü otse brauseris. Halduspaneel töötab samuti igas kaasaegses brauseris — telefon, tahvelarvuti või sülearvuti." },
      { q: "Kuidas laudade QR-koode trükitakse?", a: "QR-koodid genereeritakse paneelis automaatselt (üks laua kohta või üks kogu koha jaoks) ja laaditakse alla trükivalmis PDF-ina. Vaja on vaid kontoriprinterit ja alust: alus, kleebis või klaasialus." },
      { q: "Kas saan QR-menüü jaoks kasutada oma domeeni?", a: "Jah. Toetame SSL-sertifikaadiga restorani domeeni (näiteks menüü.sinurestoran.ee): kui külaline skannib QR-i, näeb ta sinu restorani aadressi üldise alamdomeeni asemel. DNS-i seadistamine võtab 5–10 minutit ja me juhendame sind." },
      { q: "Kas saan ühe kontoga hallata mitme restorani QR-koode?", a: "Jah, soovi korral. Üks konto võib koondada mitu kohta, igaühel oma QR-koodid, menüü, disain ja analüütika. Kirjuta meile WhatsAppis ja lülitame sisse mitme restorani režiimi." },
      { q: "Kas QR-menüü nullist käivitamine on keeruline?", a: "Kolm sammu: (1) loo kategooriad; (2) lisa road nime, hinna ja fotoga; (3) trüki QR-koodid ja pane lauale. Kui sul on juba paber- või PDF-menüü, laadi see üles — tehisintellekt tuvastab kategooriad ja hinnad ning täidab kaardid. Põhimenüü võib olla internetis 5 minutiga." },
    ],
  },
};
