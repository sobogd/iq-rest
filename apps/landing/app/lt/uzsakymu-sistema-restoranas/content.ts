import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lt",
  slug: "uzsakymu-sistema-restoranas",
  trackPrefix: "l_lt_orders",

  meta: {
    title: "Užsakymų sistema restoranui — svečias ir padavėjas | IQ Rest",
    description:
      "Restorano užsakymai iš telefono ar planšetės: salės planas, sąskaitos padalijimas, būsenos, parinktys ir pastabos. Svečiai užsako prie staliuko; padavėjas priima užsakymus iš bet kurio įrenginio. 14 dienų nemokamai.",
    canonical: "https://iq-rest.com/lt/uzsakymu-sistema-restoranas",
    ogLocale: "lt_LT",
    ogTitle: "Užsakymų sistema restoranui — svečias ir padavėjas",
    ogDescription:
      "Svečias prie staliuko arba padavėjas telefone — užsakymas iš karto pasiekia virtuvę. Salės planas, sąskaitos padalijimas, būsenos, parinktys ir pastabos.",
    brandLine: "IQ Rest — Užsakymų sistema restoranui",
  },

  hero: {
    headline: "Užsakymų priėmimas: svečias ir padavėjas — tiesiai į virtuvę.",
    cta: "Nustatyti internetinius užsakymus",
    sub: "Svečiai užsako per QR meniu prie staliuko arba padavėjas priima užsakymą iš telefono ar planšetės — užsakymas per sekundes pasiekia virtuvės ekraną. Salės planas su spalvomis pažymėtais staliukais, sąskaitos padalijimas, lanksčios parinktys ir komentarai. Be užrašų knygelių, be vaikščiojimo prie baro.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Padavėjas priima užsakymą prie staliuko iš išmaniojo telefono — užsakymas pasiekia virtuvės ekraną",
  },

  scan: {
    heading: "Nustatykite užsakymų sistemą",
    headingAccent: "per 5 minutes.",
    sub: "Įkelkite popierinį meniu ar PDF — AI atpažįsta patiekalus, kainas ir kategorijas. Prijunkite planšetę salėje ir pradėkite priimti užsakymus prie staliukų.",
    cta: "Skenuoti meniu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Sąrašas ir salės planas",
      heading: "Užsakymų sąrašas šalia salės plano.",
      body: "Visi aktyvūs užsakymai dešinėje: būsena, suma, laikas, prekių skaičius. Kairėje — salės planas: staliukai spalvomis pagal būseną — laisvas, užimtas, reikalauja dėmesio. Bakstelėkite staliuką, kad atidarytumėte arba sukurtumėte užsakymą; bakstelėkite kortelę, kad atidarytumėte detalų vaizdą. Be perėjimų tarp ekranų.",
      bullets: [
        "Salės planas: staliukai pažymėti spalvomis pagal užsakymo būseną.",
        "Užsakymų sąrašas šalia — suma, laikas, prekių skaičius.",
        "Bakstelėkite staliuką, kad atidarytumėte arba sukurtumėte užsakymą.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Planšetė padavėjo stotyje: užsakymų sąrašas ir salės planas su spalvotais staliukais" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Užsakymo kortelė",
      heading: "Užsakymo kortelė: būsenos, dubliavimas, šalinimas — vienas bakstelėjimas.",
      body: "Kiekviena prekė turi savo būseną (Laukia / Ruošiama / Paruošta / Patiekta) — virtuvė ir padavėjas mato tą patį vaizdą realiu laiku. Taško bakstelėjimas atveria veiksmų meniu: būsenos keitimas, prekės dubliavimas su tais pačiais modifikatoriais ir parinktimis, šalinimas. Viskas kortelėje.",
      bullets: [
        "Būsena pagal prekę: Laukia / Ruošiama / Paruošta / Patiekta.",
        "Dubliuokite prekę vienu bakstelėjimu su tomis pačiomis parinktimis.",
        "Pašalinkite prekę tiesiai iš kortelės.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Planšetė su detalia užsakymo kortele: prekių būsenos, dubliavimo ir šalinimo veiksmai" },
    },
    {
      icon: Receipt,
      eyebrow: "Padalinti sąskaitą",
      heading: "Padalinkite sąskaitą, kai svečiai moka atskirai.",
      body: "Svečiai nusprendė padalinti — pažymėkite prekes, kurios pereina į naują kvitą; likusios lieka esamame. Sistema iš karto rodo abi sumas. Vienas bakstelėjimas „Padalinti užsakymą“ ir turite du nepriklausomus užsakymus su teisingomis sumomis, abu vis dar susieti su savo staliukais.",
      bullets: [
        "Pasirinkite prekes padalijimui su žymimaisiais langeliais.",
        "Abi sumos rodomos iš karto.",
        "Vienas bakstelėjimas ir užsakymas padalintas be rankinio skaičiavimo.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Planšetė ant restorano staliuko: sąskaitos padalijimo langas tarp svečių" },
    },
    {
      icon: Smartphone,
      eyebrow: "Pridėjimas iš telefono",
      heading: "Pridėkite prekes iš telefono — trimis veiksmais.",
      body: "Padavėjas nėra surištas su vienu įrenginiu: atidaro užsakymų priėmimą savo telefone ir prideda prekę trimis žingsniais — kategorija, patiekalas, parinktys (dydis, iškepimo laipsnis, papildomas padažas ar ingredientas). Kaina perskaičiuojama automatiškai. Pastaba virtuvei pateikiama paskutiniame žingsnyje.",
      bullets: [
        "Trys žingsniai: kategorija → patiekalas → parinktys.",
        "Parinktys (dydis, priedai, papildomi) su kaina vienu spustelėjimu.",
        "Pastabos laukelis paskutiniame žingsnyje.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Keturi telefonai su užsakymo prekės pridėjimo žingsniais: kategorija, patiekalas, dydis, komentaras" },
    },
  ],

  faq: {
    sub: "Ką restoratoriai klausia apie užsakymų priėmimą IQ Rest. Nerandate savo klausimo? Parašykite mums į WhatsApp.",
    items: [
      { q: "Ar keli padavėjai gali dirbti vienu metu iš skirtingų įrenginių?", a: "Taip. Kiekvienas padavėjas prisijungia prie bendros restorano paskyros iš savo telefono ar planšetės — visi mato tuos pačius staliukus, užsakymus ir būsenas realiu laiku. Vieno padavėjo pakeitimai iš karto rodomi kitiems, be konfliktų ar užrakinimų." },
      { q: "Ar padavėjai gali naudoti savo asmeninius įrenginius (BYOD)?", a: "Taip. Tai yra naršyklės žiniatinklio programa — nieko nereikia diegti. Padavėjas atidaro nuorodą, prisijungia prie restorano paskyros iš savo iPhone, Android ar asmeninės planšetės ir pradeda darbą. Pamainos pabaigoje paprasčiausiai atsijungia." },
      { q: "Ar patiekalams galima pridėti privalomas parinktis (dydis, iškepimo laipsnis ir t. t.)?", a: "Taip. Kiekvienas patiekalas gali turėti bet kokį skaičių parinkčių grupių — privalomas (pvz., „Dydis“: Mažas / Vidutinis / Didelis) ir pasirinktines („Iškepimo laipsnis“: kraujingas / vidutinis / gerai iškeptas). Parinktys gali keisti kainą (+1,00 €). Jei grupė privaloma, sistema neleis svečiui ar padavėjui pridėti patiekalo be pasirinkimo." },
      { q: "Ar svečiai gali pridėti pastabas ar priedus prie patiekalo (duona, padažas)?", a: "Taip. Paskutinis pridėjimo žingsnis turi laisvą pastabos laukelį („be svogūnų“, „gerai iškepta“, „alergija riešutams“). Priedai yra atskiri kainuojami modifikatoriai („+ BBQ padažas +1,50 €“, „+ Duona +2,00 €“). Pastabos rodomos virtuvės ekrane, paryškintos spalva." },
      { q: "Ar yra užsakymų statistika?", a: "Taip. Analizės skyrius rodo: pajamas pagal dieną ir valandą, vidutinį kvitą, populiariausius patiekalus, svečias → užsakymas konversiją, aptarnavimo greitį (laikas nuo Laukia iki Patiekta). Tai padeda planuoti pamainas, pirkimus ir nustatyti prastai veikiančius patiekalus." },
      { q: "Ar galima padalinti užsakymus ar perkelti tarp staliukų?", a: "Taip, abu scenarijai palaikomi. Padalinti — pažymėkite prekes, kurios pereina į naują kvitą (svečiams, mokantiems atskirai). Perkelti — atidarykite užsakymo kortelę, pasirinkite naują staliuką; visas užsakymas persikelia ten. Be rankinio skaičiavimo, be skydelio palikimo." },
    ],
  },
};
