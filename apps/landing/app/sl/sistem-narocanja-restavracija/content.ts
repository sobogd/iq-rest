import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sl",
  slug: "sistem-narocanja-restavracija",
  trackPrefix: "l_sl_orders",

  meta: {
    title: "Sistem naročanja za restavracijo — gost in natakar | IQ Rest",
    description:
      "Naročila v restavraciji s telefona ali tablice: tloris dvorane, delitev računa, statusi, možnosti in opombe. Gostje naročajo pri mizi; natakar sprejema naročila s katere koli naprave. 14 dni brezplačno.",
    canonical: "https://iq-rest.com/sl/sistem-narocanja-restavracija",
    ogLocale: "sl_SI",
    ogTitle: "Sistem naročanja za restavracijo — gost in natakar",
    ogDescription:
      "Gost pri mizi ali natakar na telefonu — naročilo takoj prispe v kuhinjo. Tloris dvorane, delitev računa, statusi, možnosti in opombe.",
    brandLine: "IQ Rest — Sistem naročanja za restavracijo",
  },

  hero: {
    headline: "Sprejemanje naročil: gost in natakar — neposredno v kuhinjo.",
    cta: "Nastavi spletno naročanje",
    sub: "Gostje naročajo prek QR jedilnika pri mizi ali natakar sprejme naročilo s telefona ali tablice — naročilo prispe na kuhinjski zaslon v nekaj sekundah. Tloris dvorane z barvno označenimi mizami, delitev računa, prilagodljive možnosti in komentarji. Brez beležk, brez sprehodov do šanka.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Natakar sprejema naročilo pri mizi s pametnega telefona — naročilo prispe na kuhinjski zaslon",
  },

  scan: {
    heading: "Nastavite sistem naročanja",
    headingAccent: "v 5 minutah.",
    sub: "Naložite papirnati jedilnik ali PDF — AI prepozna jedi, cene in kategorije. Povežite tablico v dvorani in začnite sprejemati naročila pri mizah.",
    cta: "Skeniraj jedilnik",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Seznam in tloris dvorane",
      heading: "Seznam naročil ob tlorisu dvorane.",
      body: "Vsa aktivna naročila desno: status, vsota, čas, število postavk. Levo — tloris dvorane: mize obarvane glede na status — prosta, zasedena, potrebuje pozornost. Dotaknite se mize, da odprete ali ustvarite naročilo; dotaknite se kartice, da odprete podroben prikaz. Brez preklapljanja med zasloni.",
      bullets: [
        "Tloris dvorane: mize obarvane glede na status naročila.",
        "Seznam naročil ob njem — vsota, čas, število postavk.",
        "Dotaknite se mize, da odprete ali ustvarite naročilo.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablica na natakarski postaji: seznam naročil in tloris dvorane z barvno označenimi mizami" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Kartica naročila",
      heading: "Kartica naročila: statusi, podvajanje, brisanje — en dotik.",
      body: "Vsaka postavka ima svoj status (Čaka / V pripravi / Pripravljeno / Postreženo) — kuhinja in natakar vidita isto sliko v realnem času. Dotik pike odpre meni akcij: sprememba statusa, podvajanje postavke z istimi modifikatorji in možnostmi, brisanje. Vse znotraj kartice.",
      bullets: [
        "Status na postavko: Čaka / V pripravi / Pripravljeno / Postreženo.",
        "Podvojite postavko z enim dotikom z istimi možnostmi.",
        "Izbrišite postavko neposredno s kartice.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablica s podrobno kartico naročila: statusi postavk, akcije podvajanja in brisanja" },
    },
    {
      icon: Receipt,
      eyebrow: "Razdeli račun",
      heading: "Razdelite račun, ko gostje plačujejo ločeno.",
      body: "Gostje so se odločili razdeliti — označite postavke, ki prehajajo na nov račun; ostale ostanejo na trenutnem. Sistem takoj prikaže obe vsoti. En dotik na „Razdeli naročilo“ in imate dve neodvisni naročili s pravilnimi vsotami, obe še vedno povezani s svojimi mizami.",
      bullets: [
        "Izberite postavke za delitev s potrditvenimi polji.",
        "Obe vsoti se prikažeta takoj.",
        "En dotik in naročilo je razdeljeno brez ročnega računanja.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablica na mizi restavracije: okno delitve računa med gosti" },
    },
    {
      icon: Smartphone,
      eyebrow: "Dodajanje s telefona",
      heading: "Dodajte postavke s telefona — v treh dejanjih.",
      body: "Natakar ni vezan na eno napravo: odpre sprejemanje naročil na svojem telefonu in doda postavko v treh korakih — kategorija, jed, možnosti (velikost, stopnja pečenosti, dodatna omaka ali sestavina). Cena se samodejno preračuna. Opomba za kuhinjo pride v zadnjem koraku.",
      bullets: [
        "Trije koraki: kategorija → jed → možnosti.",
        "Možnosti (velikost, dodatki, ekstra) z ceno z enim klikom.",
        "Polje opombe v zadnjem koraku.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Štirje telefoni s koraki dodajanja postavke naročila: kategorija, jed, velikost, komentar" },
    },
  ],

  faq: {
    sub: "Kaj gostinci vprašajo o sprejemanju naročil v IQ Rest. Ne najdete svojega vprašanja? Pišite nam na WhatsApp.",
    items: [
      { q: "Ali lahko več natakarjev dela hkrati z različnih naprav?", a: "Da. Vsak natakar se prijavi v skupni račun restavracije s svojega telefona ali tablice — vsi vidijo iste mize, naročila in statuse v realnem času. Spremembe enega natakarja se takoj prikažejo drugim, brez konfliktov ali zaklepanja." },
      { q: "Ali lahko natakarji uporabljajo svoje osebne naprave (BYOD)?", a: "Da. Gre za spletno aplikacijo v brskalniku — nič za namestiti. Natakar odpre povezavo, se prijavi v račun restavracije s svojega iPhona, Androida ali osebne tablice in začne delo. Na koncu izmene se preprosto odjavi." },
      { q: "Ali se lahko k jedem dodajo obvezne možnosti (velikost, stopnja pečenosti itd.)?", a: "Da. Vsaka jed ima lahko poljubno število skupin možnosti — obvezne (npr. „Velikost“: Mala / Srednja / Velika) in izbirne („Stopnja pečenosti“: krvavo / srednje / dobro pečeno). Možnosti lahko spreminjajo ceno (+1,00 €). Če je skupina obvezna, sistem gostu ali natakarju ne dovoli dodati jedi brez izbire." },
      { q: "Ali lahko gostje dodajo opombe ali ekstra k jedi (kruh, omaka)?", a: "Da. Zadnji korak dodajanja ima polje za prosto opombo („brez čebule“, „dobro pečeno“, „alergija na oreščke“). Ekstra so ločeni cenovni modifikatorji („+ BBQ omaka +1,50 €“, „+ Kruh +2,00 €“). Opombe se prikažejo na kuhinjskem zaslonu, poudarjene z barvo." },
      { q: "Ali obstaja statistika naročil?", a: "Da. Analitični del prikazuje: prihodke po dnevu in uri, povprečen račun, najboljše jedi, gost → naročilo konverzijo, hitrost postrežbe (čas od Čaka do Postreženo). To pomaga pri načrtovanju izmen, nakupov in prepoznavanju slabo uspešnih jedi." },
      { q: "Ali se lahko naročila razdelijo ali prenesejo med mizami?", a: "Da, oba scenarija sta podprta. Za razdelitev — označite postavke, ki prehajajo na nov račun (za goste, ki plačujejo ločeno). Za prenos — odprite kartico naročila, izberite novo mizo; celotno naročilo se prenese tja. Brez ročnega računanja, brez zapuščanja plošče." },
    ],
  },
};
