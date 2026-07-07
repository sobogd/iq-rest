import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lt",
  slug: "skaitmeninis-meniu-restoranas",
  trackPrefix: "l_lt_digital",
  hideFeatureHeading: true,

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
    headline: "Skaitmeninis meniu,\nkuriame yra viskas",
    cta: "Sukurti skaitmeninį meniu",
    sub: "Nuotraukos, alergenai ir vertimas į 35 kalbas. Plius užsakymai, WhatsApp ir staliukų rezervacija — viskas viename IQ Rest.",
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
      heading: "35 kalbos kiekvienam svečiui",
      body: "Vienas QR, 35 kalbos. AI verčia su kulinariniu kontekstu, tad kiekvienas patiekalas skamba natūraliai. Turistai užsako drąsiai.",
      bullets: [
        "35 kalbos jūsų plane",
        "Kulinarinis AI, ne Google",
        "Kalba vienu bakstelėjimu",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Du svečiai savo telefonuose skaito tą patį skaitmeninį meniu skirtingomis kalbomis" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergenai",
      heading: "Alergenai ir dietos prie kiekvieno patiekalo",
      body: "Pažymėkite glitimą, laktozę, riešutus, veganišką ir be glitimo. Svečiai filtruoja meniu pagal dietą ir užsako be rūpesčių.",
      bullets: [
        "14 alergenų kategorijų",
        "Veganiška ir be glitimo",
        "Svečiai filtruoja pagal dietą",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Svečias telefone filtruoja meniu pagal alergenus, o savininkas planšetėje redaguoja alergenų sąrašą" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Bet koks įrenginys",
      heading: "Valdykite iš bet kurio įrenginio",
      body: "Administravimo skydelis veikia naršyklėje — keiskite meniu, kainas ir nuotraukas iš bet kur. Nieko nereikia diegti.",
      bullets: [
        "Veikia bet kurioje naršyklėje",
        "Telefonas, planšetė ar PC",
        "Nieko diegti nereikia",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Jokių komisinių",
      heading: "Nulis komisinių, be priedų",
      body: "Viena skaidri prenumerata. Neimame dalies iš jūsų pajamų ir neslepiame mokesčių — viskas lieka restoranui.",
      bullets: [
        "Nulis procentų nuo užsakymų",
        "Jokių slaptų priedų",
        "Viena fiksuota kaina",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Savas domenas",
      heading: "Meniu jūsų domene",
      body: "Prijungiame jūsų domeną su SSL — svečiai mato meniu restorano adresu. Padedame su DNS per 10 minučių.",
      bullets: [
        "Jūsų domenas su SSL",
        "menu.jusurestoranas.lt",
        "Padedame su DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Jūsų dizainas",
      heading: "Lankstus dizainas pagal jus",
      body: "Keli paruošti šablonai ir stiliai — pasirinkite viršelį, spalvas ir patiekalų pateikimą, tinkantį jūsų vietai.",
      bullets: [
        "Keli paruošti šablonai",
        "Jūsų viršelis ir spalvos",
        "Perstyling per kelis paspaudimus",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Kontaktai",
      heading: "Kontaktai ir soc. tinklai meniu",
      body: "Atskiras puslapis su žemėlapiu, telefonu ir nuorodomis į Instagram bei WhatsApp — svečiai jus randa vienu bakstelėjimu.",
      bullets: [
        "Žemėlapis, telefonas, adresas",
        "Instagram ir WhatsApp",
        "Susisiekite vienu bakstelėjimu",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Užsakymai per WhatsApp",
      heading: "Priimkite užsakymus per WhatsApp",
      body: "Svečiai sudaro krepšelį ir siunčia užsakymą tiesiai į jūsų WhatsApp — be atskiros programėlės, jiems įprastame pokalbyje.",
      bullets: [
        "Užsakymas į jūsų WhatsApp",
        "Be atskiros programėlės",
        "Įprastas pokalbis",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervacijos",
      heading: "Staliukų rezervacija be skambučių",
      body: "Svečiai patys rezervuoja staliuką per meniu ar nuorodą, jūs matote kalendorių pagal staliukus ir patvirtinate automatiškai ar rankiniu būdu.",
      bullets: [
        "Rezervacija 24/7, be skambučių",
        "Kalendorius pagal staliukus",
        "Auto ir rankinis patvirtinimas",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium dizainas",
      heading: "Atrodo kaip svetainė, ne PDF",
      body: "Vaizdo fonas pasveikinimo ekrane, aprašyta jūsų koncepcija ir atskiras kontaktų puslapis su žemėlapiu bei soc. tinklais.",
      bullets: [
        "Vaizdo įrašas pradžios ekrane",
        "Aprašyta koncepcija ir patiekalai",
        "Atskiras kontaktų puslapis",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Du telefonai ant kavinės staliuko: meniu pradžios ekranas su vaizdo fonu ir kontaktų puslapis su žemėlapiu" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Užsakymai · pasirinktinai",
      heading: "Užsakymai tiesiai iš meniu",
      body: "Svečiai sudaro krepšelį ir siunčia užsakymą — jis patenka į salę, WhatsApp ar virtuvės ekraną. Pasirinktinai.",
      bullets: [
        "Krepšelis ir siuntimas bakstelėjus",
        "Į salę, WhatsApp ar virtuvę",
        "Įjungiama nustatymuose",
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
