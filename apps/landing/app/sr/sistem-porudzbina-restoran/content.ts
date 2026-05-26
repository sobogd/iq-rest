import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sr",
  slug: "sistem-porudzbina-restoran",
  trackPrefix: "l_sr_orders",

  meta: {
    title: "Sistem porudžbina za restoran — gost i konobar | IQ Rest",
    description:
      "Porudžbine u restoranu sa telefona ili tableta: plan sale, podela računa, statusi, opcije i napomene. Gosti poručuju za stolom; konobar prima porudžbine sa bilo kog uređaja. 14 dana besplatno.",
    canonical: "https://iq-rest.com/sr/sistem-porudzbina-restoran",
    ogLocale: "sr_RS",
    ogTitle: "Sistem porudžbina za restoran — gost i konobar",
    ogDescription:
      "Gost za stolom ili konobar na telefonu — porudžbina odmah stiže u kuhinju. Plan sale, podela računa, statusi, opcije i napomene.",
    brandLine: "IQ Rest — Sistem porudžbina za restoran",
  },

  hero: {
    headline: "Primanje porudžbina: gost i konobar — direktno u kuhinju.",
    cta: "Подеси онлајн поруџбине",
    sub: "Gosti poručuju preko QR menija za stolom ili konobar prima porudžbinu sa telefona ili tableta — porudžbina stiže na kuhinjski ekran za nekoliko sekundi. Plan sale sa stolovima u bojama, podela računa, fleksibilne opcije i komentari. Bez beležnica, bez šetnje do bara.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Konobar prima porudžbinu za stolom sa pametnog telefona — porudžbina stiže na kuhinjski ekran",
  },

  scan: {
    heading: "Podesite sistem porudžbina",
    headingAccent: "za 5 minuta.",
    sub: "Otpremite papirni meni ili PDF — AI prepoznaje jela, cene i kategorije. Povežite tablet u sali i počnite da primate porudžbine za stolovima.",
    cta: "Skeniraj meni",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lista i plan sale",
      heading: "Lista porudžbina pored plana sale.",
      body: "Sve aktivne porudžbine desno: status, ukupno, vreme, broj stavki. Levo — plan sale: stolovi obojeni prema statusu — slobodan, zauzet, zahteva pažnju. Dodirnite sto da otvorite ili napravite porudžbinu; dodirnite karticu da otvorite detaljni prikaz. Bez prebacivanja između ekrana.",
      bullets: [
        "Plan sale: stolovi obojeni prema statusu porudžbine.",
        "Lista porudžbina pored — ukupno, vreme, broj stavki.",
        "Dodirnite sto da otvorite ili napravite porudžbinu.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet na konobarskoj stanici: lista porudžbina i plan sale sa obojenim stolovima" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Kartica porudžbine",
      heading: "Kartica porudžbine: statusi, dupliranje, brisanje — jedan dodir.",
      body: "Svaka stavka ima svoj status (Čeka / U pripremi / Spremno / Posluženo) — kuhinja i konobar vide istu sliku u realnom vremenu. Dodir na tačku otvara meni akcija: promena statusa, dupliranje stavke sa istim modifikatorima i opcijama, brisanje. Sve unutar kartice.",
      bullets: [
        "Status po stavci: Čeka / U pripremi / Spremno / Posluženo.",
        "Duplirajte stavku jednim dodirom sa istim opcijama.",
        "Obrišite stavku direktno sa kartice.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet sa detaljnom karticom porudžbine: statusi stavki, akcije dupliranja i brisanja" },
    },
    {
      icon: Receipt,
      eyebrow: "Podeli račun",
      heading: "Podelite račun kada gosti plaćaju odvojeno.",
      body: "Gosti su odlučili da podele — označite stavke koje prelaze na novi račun; ostale ostaju na trenutnom. Sistem odmah prikazuje oba zbroja. Jedan dodir na „Podeli porudžbinu“ i imate dve nezavisne porudžbine sa ispravnim zbrojevima, obe i dalje vezane za svoje stolove.",
      bullets: [
        "Izaberite stavke za podelu pomoću polja za potvrdu.",
        "Oba zbroja se odmah prikazuju.",
        "Jedan dodir i porudžbina je podeljena bez ručnog računanja.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet na stolu restorana: prozor za podelu računa između gostiju" },
    },
    {
      icon: Smartphone,
      eyebrow: "Dodavanje sa telefona",
      heading: "Dodajte stavke sa telefona — u tri radnje.",
      body: "Konobar nije vezan za jedan uređaj: otvara primanje porudžbina na svom telefonu i dodaje stavku u tri koraka — kategorija, jelo, opcije (veličina, stepen pečenja, dodatni sos ili sastojak). Cena se automatski preračunava. Napomena za kuhinju dolazi u poslednjem koraku.",
      bullets: [
        "Tri koraka: kategorija → jelo → opcije.",
        "Opcije (veličina, dodaci, ekstra) sa cenom jednim klikom.",
        "Polje za napomenu u poslednjem koraku.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Četiri telefona sa koracima dodavanja stavke porudžbine: kategorija, jelo, veličina, komentar" },
    },
  ],

  faq: {
    sub: "Šta restorateri pitaju o primanju porudžbina u IQ Rest. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Mogu li više konobara raditi istovremeno sa različitih uređaja?", a: "Da. Svaki konobar se prijavljuje na zajednički nalog restorana sa svog telefona ili tableta — svi vide iste stolove, porudžbine i statuse u realnom vremenu. Promene jednog konobara se odmah prikazuju ostalima, bez sukoba ili zaključavanja." },
      { q: "Mogu li konobari koristiti svoje lične uređaje (BYOD)?", a: "Da. To je veb aplikacija u pretraživaču — ništa za instaliranje. Konobar otvara link, prijavljuje se na nalog restorana sa svog iPhone-a, Android-a ili ličnog tableta i počinje da radi. Na kraju smene jednostavno se odjavi." },
      { q: "Mogu li se jelima dodati obavezne opcije (veličina, stepen pečenja itd.)?", a: "Da. Svako jelo može imati bilo koji broj grupa opcija — obavezne (npr. „Veličina“: Mala / Srednja / Velika) i opcione („Stepen pečenja“: krvavo / srednje / dobro pečeno). Opcije mogu menjati cenu (+1,00 €). Ako je grupa obavezna, sistem neće dozvoliti gostu ili konobaru da doda jelo bez izbora." },
      { q: "Mogu li gosti dodati napomene ili dodatke uz jelo (hleb, sos)?", a: "Da. Poslednji korak dodavanja ima polje za slobodnu napomenu („bez luka“, „dobro pečeno“, „alergija na orahe“). Dodaci su odvojeni modifikatori sa cenom („+ BBQ sos +1,50 €“, „+ Hleb +2,00 €“). Napomene se prikazuju na kuhinjskom ekranu, istaknute bojom." },
      { q: "Da li postoji statistika porudžbina?", a: "Da. Analitička sekcija prikazuje: prihode po danu i satu, prosečan račun, top jela, konverziju gost → porudžbina, brzinu usluge (vreme od Čeka do Posluženo). Ovo pomaže pri planiranju smena, nabavki i identifikaciji slabo prodavanih jela." },
      { q: "Mogu li se porudžbine podeliti ili premestiti između stolova?", a: "Da, oba scenarija su podržana. Za podelu — označite stavke koje prelaze na novi račun (za goste koji plaćaju odvojeno). Za premeštanje — otvorite karticu porudžbine, izaberite novi sto; cela porudžbina prelazi tamo. Bez ručnog računanja, bez napuštanja panela." },
    ],
  },
};
