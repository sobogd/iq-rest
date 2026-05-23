import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "et",
  slug: "digitaalne-menuu-restoran",
  trackPrefix: "l_et_digital",

  meta: {
    title: "Digitaalne menüü restoranidele | IQ Rest",
    description:
      "Digitaalne menüü restoranidele: veebipõhine menüü fotode, allergeenide, AI-tõlke ja hindade reaalajauuendustega. 14 päeva tasuta, ilma kaardita.",
    canonical: "https://iq-rest.com/et/digitaalne-menuu-restoran",
    ogLocale: "et_EE",
    ogTitle: "Digitaalne menüü restoranidele",
    ogDescription:
      "Sinu paberitkartmenüü veebiversioon — fotod, allergeenid, AI-tõlge, uuendused reaalajas.",
    brandLine: "IQ Rest — Digitaalne menüü restoranidele",
  },

  hero: {
    headline: "Digitaalne menüü restoranidele.",
    sub: "Sinu paberitkartmenüü veebiversioon fotode, allergeenide, kirjelduste ja hindade reaalajauuendustega. Külalised näevad menüüd omas keeles; restoran säästab trükikuludelt.",
  },

  scan: {
    heading: "On sul paberil menüü või PDF?",
    headingAccent: "AI digiteerib selle 60 sekundiga.",
    sub: "Lae üles foto või dokument — AI tuvastab kategooriad, road ja hinnad automaatselt.",
    cta: "Skanni menüü",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "Menüü ilma fotodeta",
      heading: "Menüü ilma fotodeta näeb samuti hea välja.",
      body: "Mõnel roal ei pruugi fotosid olla — ja see on täiesti korras. IQ Rest kuvab kaardid piltidega ja ilma piltideta ühtlaselt: tüpograafia, allergeenid ja hinnad säilitavad premium-tunde. Roogade segu fotodega ja ilma jääb terviklikuks.",
      bullets: [
        "Fotodeta kaardid ei näe tühjad välja.",
        "Tüpograafia kohandub kaardi sisule.",
        "Ühtlane stiil piltidega ja ilma roogadel.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Kaks telefoni laual: menüü roogade fotodega ja ainult tekstist menüü" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeenid",
      heading: "Allergeenide ja dieetide märgistused.",
      body: "Märgi road gluteeni, laktoosi, pähklite, mereandide, vegan- ja gluteenivabade valikute jaoks. Külalised filtreerivad menüüd oma dieedinõudmiste järgi ja tellivad suurema enesekindlusega.",
      bullets: [
        "14 standardset allergeenikategooriat igal roal.",
        "Vegan-, taimetoidu- ja gluteenivabad märgised ühe klikiga.",
        "Külalised filtreerivad menüüd oma dieedipiirangute järgi.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Külaline filtreerib menüüd allergeenide järgi telefonis, samal ajal kui omanik muudab allergeenide loendit tahvelarvutis" },
    },
    {
      icon: Palette,
      eyebrow: "Premium-disain",
      heading: "Premium-disain video taustaga ja kontaktilehega.",
      body: "Video või foto tervituskuval, restorani kirjeldus, eraldi kontaktileht kaardi, telefoninumbrite ja sotsiaalmeediaprofiilidega. Digitaalne menüü näeb välja nagu täisväärtuslik restorani veebileht, mitte PDF QR-koodi taga.",
      bullets: [
        "Video taust või suur foto tervituskuval.",
        "Restorani ja kategooriate kirjeldused — räägi kontseptsiooni lugu.",
        "Kontaktileht: kaart, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Kaks telefoni kohvikulaual: menüü avakuva video taustaga ja kontaktileht kaardiga" },
    },
    {
      icon: Languages,
      eyebrow: "35 AI-keelt",
      heading: "35 AI-keelt — iga külaline loeb menüüd oma keeles.",
      body: "Üks QR-kood, 35 keelt. AI haldab kulinaarset konteksti — roogade nimed ja kirjeldused kõlavad loomulikult. Turistid tellivad enesekindlamalt ja keskmine arve kasvab, ilma et kelner peaks iga rooga tõlkima.",
      bullets: [
        "35 keelt kuuluvad tellimusesse, ilma lisatasuta.",
        "AI mõistab kulinaarset konteksti, mitte tavaline Google Translate.",
        "Külaline vahetab keelt ühe puudutusega otse menüüs.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Kaks külalist loevad sama digitaalset menüüd erinevates keeltes oma telefonides" },
    },
    {
      icon: Smartphone,
      eyebrow: "Halda igast seadmest",
      heading: "Halda menüüd igast seadmest.",
      body: "Üks paneel avaneb brauseris telefonis, tahvelarvutis või sülearvutis. Muuda hinda, võta roog stopplistilt maha või lisa pakkumine — külalised näevad muudatust sekunditega. Ilma installideta, ilma integratsioonideta.",
      bullets: [
        "Ei mingit rakendust installimiseks — ava brauser ja oled sees.",
        "Hinnad, fotod ja stoppnimekiri — paar puudutust telefonist.",
        "Halda menüüd kõikjalt, kaasa arvatud saalist.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Sülearvuti ja telefon kohvikulaual muudavad sama menüüelementi mõlemas seadmes" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Tellimused menüüst · valikuline",
      heading: "Külalised tellivad otse menüüst.",
      body: "Külalised koostavad korvi QR-menüüs ja saadavad tellimuse — see jõuab saalis olevale kelnerile või köögi tahvelarvutisse. Funktsiooni saab seadetes igal ajal sisse või välja lülitada.",
      bullets: [
        "Korv, kommentaarid ja tellimuse saatmine ühe puudutusega.",
        "Tellimus jõuab kohe halduspaneeli, WhatsAppi või köögiekraanile.",
        "Funktsioon lülitatakse seadetes.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Kaks telefoni laual: korv tellimusega ja tellimuse saatmise kinnitus" },
    },
  ],

  faq: {
    sub: "Mida restoranipidajad küsivad digitaalse menüü kohta IQ Restis. Ei leia oma küsimust? Kirjuta meile WhatsAppi.",
    items: [
      { q: "Kas ma vajan tehnilisi oskusi või CMS-kogemust?", a: "Ei, eriteadmisi pole vaja. Iga toiming halduspaneelis on klikiga ja lohistamisega — ilma koodita. Toote lisamine menüüsse võtab paar sekundit: nimi, hind, foto. Menüü täielik seadistamine võtab tavaliselt 30 minutit kuni tund." },
      { q: "Mis on IQ Resti digitaalne menüü?", a: "IQ Rest on pilvelplatvorm restoranidele. Digitaalne menüü on sinu menüü veebipõhine versioon, mis on külalistele saadaval QR-koodi või otseselt lingi kaudu: roogade fotod, hinnad, allergeenid, AI-tõlge 35 keelde, uuendused reaalajas. Menüüd majutatakse meie serverites; sa ei pea installima ega hooldama tarkvara — ava lihtsalt brauser." },
      { q: "Kas külalised vajavad rakendust või eririistvara?", a: "Ei. Külalised suunavad telefoni kaamera QR-koodile ja menüü avaneb brauseris. Restorani halduspaneel töötab samuti igas kaasaegses brauseris — telefonis, tahvelarvutis või sülearvutis. QR-koodid trükitakse igal bürooprinterilt." },
      { q: "Kas ma saan menüüd majutada oma domeenis?", a: "Jah. Toetame kohandatud domeeni SSL-sertifikaadiga — külalised näevad menüüd sinu restorani aadressil (nt menu.sinurestoran.ee). Aitame DNS-i seadistamisel; see võtab tavaliselt 5–10 minutit." },
      { q: "Kas ma saan ühest kontost mitut restorani hallata?", a: "Jah, soovi korral. Üks konto võib majutada mitut restorani: iga koht oma menüü, disaini, QR-koodide ja analüütikaga. Kirjuta meile WhatsAppi ja me aktiveerime sinu grupile mitme restorani režiimi." },
      { q: "Kui keeruline on menüü algusest peale seadistada?", a: "Seadistus koosneb kolmest sammust: (1) loo kategooriad; (2) lisa tooted nimede, hindade ja fotodega; (3) trüki QR-koodid laudadele. Kui sul on juba paberil menüü või PDF, laadi see üles — AI tunneb kategooriad, nimed ja hinnad ära ning täidab kaardid automaatselt. Põhiline menüü võib veebi minna 5 minutiga; täielik seadistusaeg sõltub toodete arvust." },
      { q: "Millist tuge te pakute?", a: "Oleme WhatsAppis kättesaadavad tööajal ja vastame kiiresti e-posti teel. Aitame esmase seadistuse, domeeni konfiguratsiooni, menüü disaini ja kõikide ebastandardsete olukordadega. Kui vajad demot või praktilist tuge käivitamise ajal — kirjuta meile." },
    ],
  },
};
