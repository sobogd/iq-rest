import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sl",
  slug: "qr-meni-restavracija",
  trackPrefix: "l_sl_qr",

  meta: {
    title: "QR meni za restavracije | IQ Rest",
    description:
      "QR meni za restavracije: gost skenira QR kodo na mizi, odpre jedilnik v brskalniku in naroči v svojem jeziku. 14 dni brezplačno, brez kartice.",
    canonical: "https://iq-rest.com/sl/qr-meni-restavracija",
    ogLocale: "sl_SI",
    ogTitle: "QR meni za restavracije",
    ogDescription:
      "QR na mizi, jedilnik na telefonu — fotografije, alergeni, 35 jezikov in posodobitve v realnem času.",
    brandLine: "IQ Rest — QR meni za restavracije",
  },

  hero: {
    headline: "QR meni za restavracije.",
    cta: "Ustvari QR meni",
    sub: "Gost usmeri kamero na QR kodo na mizi in jedilnik se takoj odpre v brskalniku telefona: fotografije jedi, alergeni, vedno ažurne cene in samodejni prevod v 35 jezikov. Brez prenašanja aplikacij, brez ponovnega tiskanja jedilnika ob vsaki spremembi cene.",
  },

  scan: {
    heading: "Že imate papirnati ali PDF jedilnik?",
    headingAccent: "UI ga v 60 sekundah spremeni v QR meni.",
    sub: "Naložite fotografijo jedilnika ali PDF — UI prepozna kategorije, jedi in cene ter jih takoj poveže s QR menijem.",
    cta: "Ustvari QR meni",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "En QR, 35 jezikov",
      heading: "Ena QR koda, jedilnik v 35 jezikih.",
      body: "Gost skenira QR in izbere svoj jezik: prevod opravi UI z gastronomskim občutkom, ne splošni prevajalnik. Konec ločenim jedilnikom za turiste in raztresenim listom na mizi.",
      bullets: [
        "Eno tiskanje QR pokrije 35 jezikov, vključeno v naročnino.",
        "UI razume kuhinjski jezik — imena jedi zvenijo naravno v vsakem jeziku.",
        "Gost menja jezik znotraj jedilnika, brez ponovnega skeniranja QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta skenirata isto QR kodo z mize in bereta jedilnik v različnih jezikih" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni v QR",
      heading: "Alergeni in prehranske oznake znotraj QR menija.",
      body: "Vsaka jed v jedilniku, povezanem s QR, lahko nosi oznake za gluten, laktozo, oreščke, morske sadeže, veganske in brezglutenske možnosti. Gost s telefona filtrira jedi, ki ustrezajo njegovim omejitvam, ne da bi vprašal osebje.",
      bullets: [
        "14 kategorij alergenov na ravni jedi.",
        "Veganske, vegetarijanske in brezglutenske oznake z enim klikom v panelu.",
        "Gost filtrira QR meni po svojih omejitvah.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost na telefonu filtrira QR meni po alergenih, medtem ko lastnik ureja seznam na tablici" },
    },
    {
      icon: Palette,
      eyebrow: "Več kot le QR",
      heading: "QR meni, dodelan kot spletna stran restavracije.",
      body: "Po skeniranju kode gost ne naleti na ploski PDF: vidi pozdravni zaslon z videom ali izpostavljeno fotografijo, opis lokala in stran za stik z zemljevidom, telefoni in družbenimi omrežji. QR postane vhodna vrata restavracije na spletu.",
      bullets: [
        "Video v ozadju ali izpostavljena fotografija na začetnem zaslonu QR menija.",
        "Prostor za zgodbo o konceptu lokala in vsake kategorije.",
        "Vgrajena stran za stik: zemljevid, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na mizi: začetni zaslon QR menija z videom v ozadju in stran za stik z zemljevidom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Naročanje iz QR · izbirno",
      heading: "Iz QR kode lahko gost tudi naroči.",
      body: "Poleg ogleda jedilnika lahko QR meni postane kanal za naročila: gost doda jedi v košarico in pošlje zahtevo. Naročilo prispe natakarju v dvorani, na WhatsApp ali na kuhinjski zaslon. Funkcijo po potrebi vklopite ali izklopite v nastavitvah.",
      bullets: [
        "Košarica, opombe in pošiljanje naročila neposredno iz skeniranja QR.",
        "Naročilo takoj prispe v dvorano, na WhatsApp ali na kuhinjski zaslon.",
        "Funkcijo je mogoče aktivirati po urah, dvoranah ali določenih restavracijah.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na mizi: košarica, ustvarjena iz QR menija, in potrditev poslanega naročila" },
    },
  ],

  faq: {
    sub: "Kaj gostinci sprašujejo o QR meniju IQ Rest. Ne najdete svojega vprašanja? Pišite nam na WhatsApp.",
    items: [
      { q: "Kako deluje QR meni IQ Rest?", a: "Vsaka miza ima natisnjeno QR kodo. Gost jo skenira s kamero telefona in brskalnik odpre jedilnik restavracije — fotografije, opisi, alergeni in ažurne cene. Nobena aplikacija ni potrebna, ne za gosta ne za osebje." },
      { q: "Ali za izdelavo QR menija potrebujem tehnično znanje?", a: "Ne. Panel deluje s klikanjem in povleci-spusti, brez kode in zapletenih nastavitev. Dodajanje jedi traja nekaj sekund: ime, cena, fotografija. Začetna nastavitev običajno traja od 30 minut do ene ure; če že imate PDF jedilnik, ga UI samodejno pretvori." },
      { q: "Ali morajo gostje namestiti aplikacijo, da preberejo QR?", a: "Ne. Vgrajena kamera iPhona in Androida prepozna QR kodo v nekaj sekundah in odpre jedilnik neposredno v brskalniku. Skrbniški panel prav tako deluje v vsakem sodobnem brskalniku — telefon, tablica ali prenosnik." },
      { q: "Kako se natisnejo QR kode za mize?", a: "QR kode se v panelu ustvarijo samodejno (ena na mizo ali ena za celoten lokal) in prenesejo kot PDF, pripravljen za tisk. Dovolj sta pisarniški tiskalnik in stojalo: stojalo, nalepka ali podstavek za kozarec." },
      { q: "Ali lahko za QR meni uporabim lastno domeno?", a: "Da. Podpiramo domeno restavracije s SSL potrdilom (na primer meni.vasarestavracija.si): ko gost skenira QR, vidi naslov vaše restavracije namesto splošne poddomene. Nastavitev DNS traja 5–10 minut in vas pri tem vodimo." },
      { q: "Ali lahko z enim računom upravljam QR kode več restavracij?", a: "Da, na zahtevo. En račun lahko združuje več lokalov, vsak s svojimi QR kodami, jedilnikom, oblikovanjem in analitiko. Pišite nam na WhatsApp in vklopili bomo način za več restavracij." },
      { q: "Ali je težko zagnati QR meni iz nič?", a: "Trije koraki: (1) ustvarite kategorije; (2) dodajte jedi z imenom, ceno in fotografijo; (3) natisnite QR kode in jih postavite na mize. Če že imate papirnati ali PDF jedilnik, ga naložite — UI prepozna kategorije in cene ter izpolni kartice. Osnovni jedilnik je lahko na spletu v 5 minutah." },
    ],
  },
};
