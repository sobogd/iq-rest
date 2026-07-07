import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sl",
  slug: "digitalni-jedilnik-restavracija",
  trackPrefix: "l_sl_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Digitalni jedilnik za restavracije | IQ Rest",
    description:
      "Digitalni jedilnik za restavracije: spletni jedilnik s fotografijami, alergeni, AI prevodom in posodobitvami cen v realnem času. 14 dni brezplačno, brez kartice.",
    canonical: "https://iq-rest.com/sl/digitalni-jedilnik-restavracija",
    ogLocale: "sl_SI",
    ogTitle: "Digitalni jedilnik za restavracije",
    ogDescription:
      "Spletna različica vašega papirnatega jedilnika — fotografije, alergeni, AI prevod, posodobitve v realnem času.",
    brandLine: "IQ Rest — Digitalni jedilnik za restavracije",
  },

  hero: {
    headline: "Digitalni meni,\nki ima vse",
    cta: "Ustvari digitalni meni",
    sub: "Fotografije, alergeni in prevod v 35 jezikov. Plus naročila, WhatsApp in rezervacije miz — vse v enem IQ Rest.",
  },

  scan: {
    heading: "Imate papirnati jedilnik ali PDF?",
    headingAccent: "AI ga digitalizira v 60 sekundah.",
    sub: "Naložite fotografijo ali dokument — AI samodejno prepozna kategorije, jedi in cene.",
    cta: "Skeniraj jedilnik",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Prevod z AI",
      heading: "Meni v 35 jezikih",
      body: "Ena QR, 35 jezikov. AI prevaja s kulinaričnim kontekstom, zato vsaka jed zveni naravno. Turisti naročajo z gotovostjo.",
      bullets: [
        "35 jezikov v paketu",
        "Kulinarični AI, ne Google",
        "Menjava jezika z enim dotikom",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta bereta isti digitalni jedilnik v različnih jezikih na svojih telefonih" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Alergeni in diete pri jedeh",
      body: "Označite gluten, laktozo, oreščke, vegansko in brez glutena. Gostje filtrirajo meni po dieti in naročajo z lahkoto.",
      bullets: [
        "14 kategorij alergenov",
        "Oznake vegansko in brez glutena",
        "Gostje filtrirajo po dieti",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira jedilnik po alergenih na telefonu, medtem ko lastnik ureja seznam alergenov na tablici" },
    },
    {
      icon: Palette,
      eyebrow: "Oblika in znamka",
      heading: "Premium meni na vaši domeni",
      body: "Video pozdravni zaslon, lastna oblika in kontaktna stran z zemljevidom in omrežji — na vaši lastni domeni, ne PDF.",
      bullets: [
        "Video in premium oblika",
        "Vaša domena s SSL",
        "Kontakti, zemljevid in omrežja",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na mizi v kavarni: domači zaslon jedilnika z video ozadjem in kontaktna stran z zemljevidom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Naročila",
      heading: "Spletna naročila, nič provizije",
      body: "Gostje naročajo iz menija ali naravnost na vaš WhatsApp — pride v dvorano ali kuhinjo, z 0 % od prodaje.",
      bullets: [
        "Iz menija ali z WhatsApp",
        "V dvorano ali kuhinjo, 0 %",
        "Preklop v nastavitvah",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na mizi: košarica z naročilom in potrditev poslanega naročila" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervacije",
      heading: "Rezervacija mize, 24/7",
      body: "Gostje sami rezervirajo mizo prek menija ali povezave, vi vidite koledar po mizah in potrdite samodejno ali ročno.",
      bullets: [
        "Gostje rezervirajo sami",
        "Koledar po mizah",
        "Samodejna in ročna potrditev",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Upravljanje",
      heading: "Upravljajte od kjer koli",
      body: "Skrbniška plošča teče v vsakem brskalniku — telefon, tablica ali PC. Nič za namestitev, osnovni meni zaživi v nekaj minutah.",
      bullets: [
        "Katera koli naprava in brskalnik",
        "Nič za namestitev",
        "Zaživi v nekaj minutah",
      ],
    },
  ],

  faq: {
    sub: "Kaj gostinci vprašajo o digitalnem jedilniku v IQ Rest. Ne najdete svojega vprašanja? Pišite nam na WhatsApp.",
    items: [
      { q: "Ali potrebujem tehnične veščine ali izkušnje s CMS?", a: "Ne, posebne veščine niso potrebne. Vsako dejanje v skrbniški plošči je s klikom in povleci-in-spusti — brez kode. Dodajanje postavke v jedilnik traja nekaj sekund: ime, cena, fotografija. Polna nastavitev jedilnika običajno traja od 30 minut do ene ure." },
      { q: "Kaj je digitalni jedilnik IQ Rest?", a: "IQ Rest je platforma v oblaku za restavracije. Digitalni jedilnik je spletna različica vašega jedilnika, na voljo gostom prek QR kode ali neposredne povezave: fotografije jedi, cene, alergeni, AI prevod v 35 jezikov, posodobitve v realnem času. Jedilnik gostimo na naših strežnikih; ni vam treba namestiti ali vzdrževati programske opreme — samo odprite brskalnik." },
      { q: "Ali gostje potrebujejo aplikacijo ali posebno strojno opremo?", a: "Ne. Gostje usmerijo kamero telefona v QR kodo in jedilnik se odpre v brskalniku. Tudi skrbniška plošča restavracije deluje v vsakem sodobnem brskalniku — telefon, tablica ali prenosnik. QR kode se natisnejo na kateri koli pisarniški tiskalnik." },
      { q: "Ali lahko gostim jedilnik na lastni domeni?", a: "Da. Podpiramo lastno domeno s SSL certifikatom — gostje vidijo jedilnik na naslovu vaše restavracije (npr. jedilnik.vasarestavracija.si). Pomagamo z nastavitvijo DNS; običajno traja 5–10 minut." },
      { q: "Ali lahko upravljam več restavracij iz enega računa?", a: "Da, na zahtevo. En račun lahko gosti več restavracij: vsak lokal s svojim jedilnikom, oblikovanjem, QR kodami in analitiko. Pišite nam na WhatsApp in aktivirali bomo način za več restavracij za vašo skupino." },
      { q: "Kako težko je nastaviti jedilnik iz nič?", a: "Nastavitev je sestavljena iz treh korakov: (1) ustvarite kategorije; (2) dodajte postavke z imeni, cenami in fotografijami; (3) natisnite QR kode za mize. Če že imate papirnati jedilnik ali PDF, ga naložite — AI bo prepoznal kategorije, imena in cene ter samodejno izpolnil kartice. Osnovni jedilnik je lahko na spletu v 5 minutah; skupni čas je odvisen od števila postavk." },
      { q: "Kakšno podporo ponujate?", a: "Na voljo smo na WhatsAppu v delovnem času in hitro odgovarjamo po e-pošti. Pomagamo pri začetni nastavitvi, konfiguraciji domene, oblikovanju jedilnika in vseh nestandardnih situacijah. Če potrebujete demo ali praktično podporo pri zagonu — pišite nam." },
    ],
  },
};
