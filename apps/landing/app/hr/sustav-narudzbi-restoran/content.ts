import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hr",
  slug: "sustav-narudzbi-restoran",
  trackPrefix: "l_hr_orders",

  meta: {
    title: "Sustav narudžbi za restoran — gost i konobar | IQ Rest",
    description:
      "Narudžbe u restoranu s telefona ili tableta: plan sale, podjela računa, statusi, opcije i napomene. Gosti naručuju za stolom; konobar prima narudžbe s bilo kojeg uređaja. 14 dana besplatno.",
    canonical: "https://iq-rest.com/hr/sustav-narudzbi-restoran",
    ogLocale: "hr_HR",
    ogTitle: "Sustav narudžbi za restoran — gost i konobar",
    ogDescription:
      "Gost za stolom ili konobar na telefonu — narudžba odmah stiže u kuhinju. Plan sale, podjela računa, statusi, opcije i napomene.",
    brandLine: "IQ Rest — Sustav narudžbi za restoran",
  },

  hero: {
    headline: "Primanje narudžbi: gost i konobar — izravno u kuhinju.",
    sub: "Gosti naručuju putem QR jelovnika za stolom ili konobar prima narudžbu s telefona ili tableta — narudžba stiže na kuhinjski ekran u sekundama. Plan sale s obojenim stolovima, podjela računa, fleksibilne opcije i komentari. Bez blokova, bez odlazaka do šanka.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Konobar prima narudžbu za stolom sa smartphonea — narudžba stiže na kuhinjski ekran",
  },

  scan: {
    heading: "Postavite sustav narudžbi",
    headingAccent: "za 5 minuta.",
    sub: "Učitajte papirni jelovnik ili PDF — AI prepoznaje jela, cijene i kategorije. Spojite tablet u sali i počnite primati narudžbe za stolovima.",
    cta: "Skeniraj jelovnik",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Popis i plan sale",
      heading: "Popis narudžbi uz plan sale.",
      body: "Sve aktivne narudžbe desno: status, ukupno, vrijeme, broj stavki. Lijevo — plan sale: stolovi obojeni prema statusu — slobodan, zauzet, treba pažnju. Dodirnite stol za otvaranje ili stvaranje narudžbe; dodirnite karticu za otvaranje detaljnog prikaza. Bez skakanja između zaslona.",
      bullets: [
        "Plan sale: stolovi obojeni prema statusu narudžbe.",
        "Popis narudžbi uz njega — ukupno, vrijeme, broj stavki.",
        "Dodirnite stol za otvaranje ili stvaranje narudžbe.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet na konobarskoj stanici: popis narudžbi i plan sale s obojenim stolovima" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Kartica narudžbe",
      heading: "Kartica narudžbe: statusi, dupliciranje, brisanje — jedan dodir.",
      body: "Svaka stavka ima svoj status (Čeka / U pripremi / Spremno / Posluženo) — kuhinja i konobar vide istu sliku u stvarnom vremenu. Dodir točke otvara izbornik radnji: promjena statusa, dupliciranje stavke s istim modifikatorima i opcijama, brisanje. Sve unutar kartice.",
      bullets: [
        "Status po stavci: Čeka / U pripremi / Spremno / Posluženo.",
        "Duplicirajte stavku jednim dodirom s istim opcijama.",
        "Obrišite stavku izravno s kartice.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet s detaljnom karticom narudžbe: statusi stavki, radnje dupliciranja i brisanja" },
    },
    {
      icon: Receipt,
      eyebrow: "Podjela računa",
      heading: "Podijelite račun kad gosti plaćaju zasebno.",
      body: "Gosti su odlučili podijeliti — označite stavke koje idu na novi račun; ostalo ostaje na trenutnom. Sustav odmah prikazuje oba zbroja. Jedan dodir na „Podijeli narudžbu“ i imate dvije neovisne narudžbe s ispravnim zbrojevima, obje i dalje vezane uz svoje stolove.",
      bullets: [
        "Odaberite stavke za podjelu s potvrdnim okvirima.",
        "Oba zbroja se odmah prikazuju.",
        "Jedan dodir i narudžba je podijeljena bez ručnog računanja.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet na restoranskom stolu: prozor za podjelu računa između gostiju" },
    },
    {
      icon: Smartphone,
      eyebrow: "Dodavanje s telefona",
      heading: "Dodajte stavke s telefona — u tri radnje.",
      body: "Konobar nije vezan za jedan uređaj: otvara primanje narudžbi na svom telefonu i dodaje stavku u tri koraka — kategorija, jelo, opcije (veličina, stupanj pečenja, dodatni umak ili sastojak). Cijena se automatski preračunava. Napomena za kuhinju dolazi u zadnjem koraku.",
      bullets: [
        "Tri koraka: kategorija → jelo → opcije.",
        "Opcije (veličina, dodaci, ekstra) s cijenom u jednom kliku.",
        "Polje za napomenu u završnom koraku.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Četiri telefona s koracima dodavanja stavke narudžbe: kategorija, jelo, veličina, komentar" },
    },
  ],

  faq: {
    sub: "Što restoratori pitaju o primanju narudžbi u IQ Restu. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Mogu li više konobara raditi istovremeno s različitih uređaja?", a: "Da. Svaki konobar prijavi se u zajednički račun restorana sa svog telefona ili tableta — svi vide iste stolove, narudžbe i statuse u stvarnom vremenu. Promjene jednog konobara odmah se prikazuju ostalima, bez sukoba ili zaključavanja." },
      { q: "Mogu li konobari koristiti vlastite uređaje (BYOD)?", a: "Da. To je web aplikacija u pregledniku — nema ništa za instalirati. Konobar otvara link, prijavi se u račun restorana sa svog iPhonea, Androida ili osobnog tableta i počinje raditi. Na kraju smjene jednostavno se odjavi." },
      { q: "Mogu li se dodati obvezne opcije jelima (veličina, stupanj pečenja itd.)?", a: "Da. Svako jelo može imati bilo koji broj grupa opcija — obvezne (npr. „Veličina“: Mala / Srednja / Velika) i opcionalne („Stupanj pečenja“: krvavo / srednje / dobro pečeno). Opcije mogu mijenjati cijenu (+1,00 €). Ako je grupa obvezna, sustav neće dopustiti gostu ili konobaru dodavanje jela bez odabira." },
      { q: "Mogu li gosti dodati napomene ili ekstra jelu (kruh, umak)?", a: "Da. Zadnji korak dodavanja ima polje za slobodnu napomenu („bez luka“, „dobro pečeno“, „alergija na orašaste plodove“). Ekstra su zasebni modifikatori s cijenom („+ BBQ umak +1,50 €“, „+ Kruh +2,00 €“). Napomene se prikazuju na kuhinjskom ekranu, istaknute bojom." },
      { q: "Postoji li statistika narudžbi?", a: "Da. Analitička sekcija prikazuje: prihod po danu i satu, prosječan račun, najprodavanija jela, konverzija gost → narudžba, brzina usluge (vrijeme od Čeka do Posluženo). To pomaže pri planiranju smjena, nabave i otkrivanju jela s lošim učinkom." },
      { q: "Mogu li se narudžbe podijeliti ili premjestiti između stolova?", a: "Da, oba scenarija su podržana. Za podjelu — označite stavke koje idu na novi račun (za goste koji plaćaju zasebno). Za premještanje — otvorite karticu narudžbe, odaberite novi stol; cijela narudžba se premješta tamo. Bez ručnog računanja, bez napuštanja panela." },
    ],
  },
};
