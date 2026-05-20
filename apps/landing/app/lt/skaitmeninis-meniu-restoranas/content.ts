import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lt",
  slug: "skaitmeninis-meniu-restoranas",
  trackPrefix: "l_lt_digital",

  meta: {
    title: "Skaitmeninis meniu restoranams | IQ Rest",
    description:
      "Skaitmeninis meniu restoranams: internetinis meniu su nuotraukomis, alergenais, AI vertimu ir realaus laiko kainų atnaujinimais. 14 dienų nemokamai, be kortelės.",
    canonical: "https://iq-rest.com/lt/skaitmeninis-meniu-restoranas",
    ogLocale: "lt_LT",
    ogTitle: "Skaitmeninis meniu restoranams",
    ogDescription:
      "Popierinio meniu internetinė versija — nuotraukos, alergenai, AI vertimas, realaus laiko atnaujinimai.",
    brandLine: "IQ Rest — Skaitmeninis meniu restoranams",
  },

  hero: {
    headline: "Skaitmeninis meniu restoranams.",
    sub: "Popierinio meniu internetinė versija su nuotraukomis, alergenais, aprašymais ir realaus laiko kainų atnaujinimais. Svečiai mato meniu savo kalba; restoranas taupo spausdinimui.",
  },

  scan: {
    heading: "Turite popierinį meniu ar PDF?",
    headingAccent: "AI suskaitmenina jį per 60 sekundžių.",
    sub: "Įkelkite nuotrauką ar dokumentą — AI automatiškai atpažįsta kategorijas, patiekalus ir kainas.",
    cta: "Skenuoti meniu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI kalbos",
      heading: "35 AI kalbos — kiekvienas svečias skaito meniu savo kalba.",
      body: "Vienas QR kodas, 35 kalbos. AI tvarko kulinarinį kontekstą — patiekalų pavadinimai ir aprašymai skamba natūraliai. Turistai užsako su didesniu pasitikėjimu ir vidutinis kvitas auga, nereikalaujant padavėjo versti kiekvieno patiekalo.",
      bullets: [
        "35 kalbos įtrauktos į prenumeratą, be papildomų mokesčių.",
        "AI, suprantantis kulinarinį kontekstą, ne neapdorotas Google Translate.",
        "Svečias keičia kalbą vienu bakstelėjimu pačiame meniu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Du svečiai skaito tą patį skaitmeninį meniu skirtingomis kalbomis savo telefonuose" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergenai",
      heading: "Alergenų ir dietinių režimų žymos.",
      body: "Pažymėkite patiekalus dėl glitimo, laktozės, riešutų, jūros gėrybių, veganiškų ir be glitimo galimybių. Svečiai filtruoja meniu pagal savo dietinius poreikius ir užsako su didesniu pasitikėjimu.",
      bullets: [
        "14 standartinių alergenų kategorijų kiekviename patiekale.",
        "Veganiškos, vegetariškos ir be glitimo žymos vienu spustelėjimu.",
        "Svečiai filtruoja meniu pagal dietinius apribojimus.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Svečias filtruoja meniu pagal alergenus telefone, o savininkas redaguoja alergenų sąrašą planšetėje" },
    },
    {
      icon: Palette,
      eyebrow: "Premium dizainas",
      heading: "Premium dizainas su vaizdo fonu ir kontaktų puslapiu.",
      body: "Vaizdo įrašas ar nuotrauka pasveikinimo ekrane, restorano aprašymas, atskiras kontaktų puslapis su žemėlapiu, telefono numeriais ir socialinio tinklo profiliais. Skaitmeninis meniu atrodo kaip pilna restorano svetainė, o ne PDF už QR kodo.",
      bullets: [
        "Vaizdo fonas arba didelė nuotrauka pasveikinimo ekrane.",
        "Restorano ir kategorijų aprašymai — papasakokite koncepcijos istoriją.",
        "Kontaktų puslapis: žemėlapis, telefonas, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Du telefonai ant kavinės staliuko: meniu pradžios ekranas su vaizdo fonu ir kontaktų puslapis su žemėlapiu" },
    },
    {
      icon: LayoutList,
      eyebrow: "Meniu be nuotraukų",
      heading: "Meniu be nuotraukų atrodo lygiai taip pat gerai.",
      body: "Kai kurios prekės gali neturėti nuotraukų — ir tai visiškai gerai. IQ Rest rodo korteles su vaizdais ir be jų nuosekliai: tipografija, alergenai ir kainos išlaiko premium jausmą. Prekių su nuotraukomis ir be jų mišinys lieka vientisas.",
      bullets: [
        "Kortelės be nuotraukų neatrodo tuščios.",
        "Tipografija prisitaiko prie kortelės turinio.",
        "Nuoseklus stilius prekėms su vaizdais ir be jų.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Du telefonai ant staliuko: meniu su patiekalų nuotraukomis ir meniu tik su tekstu" },
    },
    {
      icon: Smartphone,
      eyebrow: "Valdykite iš bet kurio įrenginio",
      heading: "Valdykite meniu iš bet kurio įrenginio.",
      body: "Vienas skydelis atsidaro naršyklėje telefone, planšetėje ar nešiojamajame kompiuteryje. Pakeiskite kainą, pašalinkite patiekalą iš stop sąrašo arba pridėkite specialų pasiūlymą — svečiai mato pakeitimą per sekundes. Be diegimo, be integracijų.",
      bullets: [
        "Be diegtinos programėlės — atidarykite naršyklę ir esate viduje.",
        "Kainos, nuotraukos ir stop sąrašas — keli bakstelėjimai iš telefono.",
        "Valdykite meniu iš bet kur, įskaitant salę.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Nešiojamasis ir telefonas ant kavinės staliuko redaguoja tą patį meniu elementą abiejuose įrenginiuose" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Užsakymai iš meniu · pasirinktinai",
      heading: "Svečiai užsako tiesiogiai iš meniu.",
      body: "Svečiai sukuria krepšelį QR meniu ir siunčia užsakymą — jis pasiekia padavėją salėje arba virtuvės planšetėje. Funkciją galima įjungti arba išjungti nustatymuose bet kuriuo metu.",
      bullets: [
        "Krepšelis, komentarai ir užsakymo siuntimas vienu bakstelėjimu.",
        "Užsakymas iš karto pasiekia administravimo skydelį, WhatsApp arba virtuvės ekraną.",
        "Funkcija perjungiama nustatymuose.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Du telefonai ant staliuko: krepšelis su užsakymu ir užsakymo išsiuntimo patvirtinimas" },
    },
  ],

  faq: {
    sub: "Ką restoratoriai klausia apie skaitmeninį meniu IQ Rest. Nerandate savo klausimo? Parašykite mums į WhatsApp.",
    items: [
      { q: "Ar man reikia techninių įgūdžių ar CMS patirties?", a: "Ne, specialių įgūdžių nereikia. Kiekvienas veiksmas administravimo skydelyje atliekamas spustelėjimu ir vilkimu — be kodo. Prekės pridėjimas į meniu užtrunka kelias sekundes: pavadinimas, kaina, nuotrauka. Pilnas meniu nustatymas paprastai užtrunka nuo 30 minučių iki valandos." },
      { q: "Kas yra IQ Rest skaitmeninis meniu?", a: "IQ Rest yra debesų platforma restoranams. Skaitmeninis meniu yra jūsų meniu internetinė versija, prieinama svečiams per QR kodą ar tiesioginę nuorodą: patiekalų nuotraukos, kainos, alergenai, AI vertimas į 35 kalbas, realaus laiko atnaujinimai. Meniu talpinamas mūsų serveriuose; nereikia diegti ar prižiūrėti programinės įrangos — tiesiog atidarykite naršyklę." },
      { q: "Ar svečiams reikia programėlės ar specialios įrangos?", a: "Ne. Svečiai nukreipia telefono kamerą į QR kodą ir meniu atsidaro naršyklėje. Restorano administravimo skydelis taip pat veikia bet kurioje moderniojoje naršyklėje — telefone, planšetėje ar nešiojamajame kompiuteryje. QR kodai spausdinami bet kuriame biuro spausdintuve." },
      { q: "Ar galiu talpinti meniu savo domene?", a: "Taip. Palaikome pasirinktinį domeną su SSL sertifikatu — svečiai mato meniu jūsų restorano adrese (pvz., menu.jusurestoranas.lt). Padedame su DNS nustatymu; paprastai užtrunka 5–10 minučių." },
      { q: "Ar galiu valdyti kelis restoranus iš vienos paskyros?", a: "Taip, pagal pageidavimą. Viena paskyra gali talpinti kelis restoranus: kiekviena vieta su savo meniu, dizainu, QR kodais ir analize. Parašykite mums į WhatsApp ir aktyvuosime daugelio restoranų režimą jūsų grupei." },
      { q: "Kaip sunku nustatyti meniu nuo nulio?", a: "Nustatymas susideda iš trijų žingsnių: (1) sukurti kategorijas; (2) pridėti prekes su pavadinimais, kainomis ir nuotraukomis; (3) atspausdinti QR kodus staliukams. Jei jau turite popierinį meniu ar PDF, įkelkite jį — AI atpažins kategorijas, pavadinimus ir kainas ir užpildys korteles automatiškai. Pagrindinis meniu gali būti internete per 5 minutes; bendras laikas priklauso nuo prekių skaičiaus." },
      { q: "Kokią pagalbą siūlote?", a: "Esame pasiekiami WhatsApp darbo valandomis ir greitai atsakome el. paštu. Padedame su pradiniu nustatymu, domeno konfigūracija, meniu dizainu ir bet kokia nestandartine situacija. Jei reikia demonstracijos ar praktinės pagalbos paleidžiant — parašykite mums." },
    ],
  },
};
