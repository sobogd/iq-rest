import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sl",
  slug: "digitalni-jedilnik-restavracija",
  trackPrefix: "l_sl_digital",

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
    headline: "Digitalni jedilnik za restavracije.",
    sub: "Spletna različica vašega papirnatega jedilnika s fotografijami, alergeni, opisi in posodobitvami cen v realnem času. Gostje vidijo jedilnik v svojem jeziku; restavracija prihrani pri tisku.",
  },

  scan: {
    heading: "Imate papirnati jedilnik ali PDF?",
    headingAccent: "AI ga digitalizira v 60 sekundah.",
    sub: "Naložite fotografijo ali dokument — AI samodejno prepozna kategorije, jedi in cene.",
    cta: "Skeniraj jedilnik",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "Jedilnik brez fotografij",
      heading: "Jedilnik brez fotografij izgleda enako dobro.",
      body: "Nekatere postavke morda nimajo fotografij — in to je popolnoma v redu. IQ Rest prikazuje kartice s slikami in brez njih dosledno: tipografija, alergeni in cene ohranjajo premium občutek. Mešanica postavk s fotografijami in brez njih ostane skladna.",
      bullets: [
        "Kartice brez fotografij ne izgledajo prazne.",
        "Tipografija se prilagodi vsebini kartice.",
        "Dosleden slog za postavke s slikami in brez njih.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Dva telefona na mizi: jedilnik s fotografijami jedi in jedilnik samo z besedilom" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Oznake alergenov in diet.",
      body: "Označite jedi za gluten, laktozo, oreščke, morske sadeže, veganske in brezglutenske možnosti. Gostje filtrirajo jedilnik glede na svoje dietne potrebe in naročajo z večjo gotovostjo.",
      bullets: [
        "14 standardnih kategorij alergenov pri vsaki jedi.",
        "Oznake vegansko, vegetarijansko in brezglutensko z enim klikom.",
        "Gostje filtrirajo jedilnik glede na svoje dietne omejitve.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira jedilnik po alergenih na telefonu, medtem ko lastnik ureja seznam alergenov na tablici" },
    },
    {
      icon: Palette,
      eyebrow: "Premium oblika",
      heading: "Premium oblika z video ozadjem in stranjo za stik.",
      body: "Video ali fotografija na pozdravnem zaslonu, opis restavracije, namenska kontaktna stran z zemljevidom, telefonskimi številkami in profili na družbenih omrežjih. Digitalni jedilnik je videti kot polna spletna stran restavracije, ne kot PDF za QR kodo.",
      bullets: [
        "Video ozadje ali velika fotografija na pozdravnem zaslonu.",
        "Opisi restavracije in kategorij — povejte zgodbo koncepta.",
        "Kontaktna stran: zemljevid, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na mizi v kavarni: domači zaslon jedilnika z video ozadjem in kontaktna stran z zemljevidom" },
    },
    {
      icon: Languages,
      eyebrow: "35 AI jezikov",
      heading: "35 AI jezikov — vsak gost bere jedilnik v svojem.",
      body: "Ena QR koda, 35 jezikov. AI obvladuje kulinarični kontekst — imena jedi in opisi zvenijo naravno. Turisti naročajo z večjo gotovostjo in povprečen račun raste, ne da bi natakar moral prevajati vsako jed.",
      bullets: [
        "35 jezikov vključenih v naročnino, brez doplačila.",
        "AI z razumevanjem kulinaričnega konteksta, ne surov Google Translate.",
        "Gost spremeni jezik z enim dotikom v samem jedilniku.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta bereta isti digitalni jedilnik v različnih jezikih na svojih telefonih" },
    },
    {
      icon: Smartphone,
      eyebrow: "Upravljanje s katere koli naprave",
      heading: "Upravljajte jedilnik s katere koli naprave.",
      body: "Ena plošča se odpre v brskalniku na telefonu, tablici ali prenosniku. Spremenite ceno, odstranite jed s seznama stop ali dodajte specialiteto — gostje vidijo spremembo v nekaj sekundah. Brez namestitev, brez integracij.",
      bullets: [
        "Brez aplikacije za namestitev — odprite brskalnik in ste notri.",
        "Cene, fotografije in seznam stop — nekaj dotikov s telefona.",
        "Upravljajte jedilnik od koder koli, tudi iz dvorane.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Prenosnik in telefon na mizi v kavarni urejata isto postavko jedilnika na obeh napravah" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Naročila iz jedilnika · izbirno",
      heading: "Gostje naročajo neposredno iz jedilnika.",
      body: "Gostje sestavijo košarico v QR jedilniku in pošljejo naročilo — pride do natakarja v dvorani ali na tablico v kuhinji. Funkcijo lahko v nastavitvah kadar koli vklopite ali izklopite.",
      bullets: [
        "Košarica, komentarji in pošiljanje naročila z enim dotikom.",
        "Naročilo takoj prispe v skrbniško ploščo, na WhatsApp ali na kuhinjski zaslon.",
        "Funkcija se preklopi v nastavitvah.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na mizi: košarica z naročilom in potrditev poslanega naročila" },
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
