import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sl",
  slug: "rezervacija-miz",
  trackPrefix: "l_sl_bookings",

  meta: {
    title: "Rezervacija miz 24/7 za restavracije | IQ Rest",
    description:
      "Rezervacija miz 24/7 za restavracije: gostje sami rezervirajo prek QR jedilnika ali spletne strani. Koledar po mizi, samodejne potrditve in opomniki. Niti enega izgubljenega gosta. 14 dni brezplačno.",
    canonical: "https://iq-rest.com/sl/rezervacija-miz",
    ogLocale: "sl_SI",
    ogTitle: "Rezervacija miz 24/7 — gostje rezervirajo sami",
    ogDescription:
      "Gostje rezervirajo mize prek QR jedilnika ali spletne strani. Koledar, samodejne potrditve, opomniki. Niti enega izgubljenega gosta.",
    brandLine: "IQ Rest — Rezervacija miz za restavracije",
  },

  hero: {
    headline: "Rezervacija miz 24/7 — gostje rezervirajo sami.",
    sub: "Gostje rezervirajo mize prek QR jedilnika ali neposredne povezave. Koledar po mizi, samodejne potrditve in opomniki. Niti enega izgubljenega gosta in brez klicev v konicah.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostesa upravlja rezervacije s tablice pri vhodu v restavracijo",
  },

  scan: {
    heading: "Zaženite rezervacijo miz",
    headingAccent: "v 5 minutah.",
    sub: "Povežite koledar, dodajte mize s fotografijami in zmogljivostjo — gostje začnejo rezervirati še isti dan.",
    cta: "Aktiviraj rezervacijo",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Obrazec za rezervacijo",
      heading: "Gostje rezervirajo sami — po datumu, uri in številu oseb.",
      body: "Gost odpre QR jedilnik ali neposredno povezavo, izbere datum, uro in število oseb — in takoj vidi razpoložljive mize, vsaka s fotografijo, opisom (terasa, pri oknu, kavč ob baru) in zmogljivostjo. Potrditev se pošlje samodejno po e-pošti in WhatsApp.",
      bullets: [
        "Izbira mize po fotografiji, opisu in zmogljivosti.",
        "Samodejna potrditev in opomnik eno uro pred obiskom.",
        "Minimalna polja v obrazcu: ime, telefon, število oseb.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gost rezervira mizo v restavraciji s telefona: datum, ura, število oseb in izbira mize" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Koledar rezervacij",
      heading: "Koledar po dnevu in mizi — vse na en pogled.",
      body: "Skrbniška plošča prikazuje koledar rezervacij razdeljen po mizi, dnevu, tednu in mesecu. Prosti termini, zasedene mize, potrjene in nepotrjene rezervacije na enem zaslonu. Deluje na tablici v dvorani in na prenosniku v pisarni.",
      bullets: [
        "Dnevni, tedenski in mesečni pogledi.",
        "Razdelitev po mizi: kdo, kdaj, koliko gostov.",
        "Premik, preklic ali potrditev rezervacije z enim dotikom s telefona.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Koledar rezervacij v skrbniški plošči IQ Rest na dveh tablicah: dnevni Gantt po mizah in mesečni pogled" },
    },
  ],

  faq: {
    sub: "Kaj gostinci vprašajo o rezervaciji miz v IQ Rest. Ne najdete svojega vprašanja? Pišite nam na WhatsApp.",
    items: [
      { q: "Ali lahko izberem, v katerih dneh in urah je rezervacija na voljo?", a: "Da. Skrbniška plošča omogoča nastavitev odpiralnih ur in razpoložljivih dni v tednu — sistem gostom ne bo prikazoval nerazpoložljivih terminov. Lahko zaprete določen datum (poslovni dogodek, zasebna rezervacija) ali začasno izklopite celoten koledar." },
      { q: "Ali lahko naložim fotografijo za vsako mizo?", a: "Da. Vsaka miza ima lahko fotografijo, opis (terasa, pri oknu, kavč ob baru) in zmogljivost. Gost vidi točno mizo, ki jo rezervira, in sprejme ozaveščeno odločitev — to zmanjša neizpolnjena pričakovanja." },
      { q: "Ali lahko izklopim rezervacije na določene datume?", a: "Da. Koledar omogoča zaprtje določenih datumov (prazniki, zasebni dogodki, obnova) ali celih dni v tednu. Na te datume gostje vidijo sporočilo „rezervacija začasno ni na voljo“." },
      { q: "Ali lahko prilagodim, katera polja se zbirajo od gosta?", a: "Da. Privzeti niz: ime, telefon, e-pošta, število oseb. Lahko dodate prilagojena polja (priložnost, alergije, posebne zahteve) ali odstranite nepotrebne, da bo obrazec čim krajši." },
      { q: "Ali lahko omejim število gostov na mizo?", a: "Da. Vsaka miza ima nastavitev „zmogljivost“ — sistem ne dovoli, da bi se miza za 2 rezervirala za 6. Na večjih mizah lahko nastavite minimum, da male skupine ne zasedejo „mize za osem“ večjim družbam." },
      { q: "Kako težka je nastavitev rezervacije?", a: "Traja zelo malo časa. Trije koraki: (1) dodajte mize z imeni, fotografijami in zmogljivostjo, (2) aktivirajte rezervacijski način v nastavitvah, (3) delite povezavo ali QR kodo z gosti. Popoln zagon v 5–10 minutah." },
      { q: "Ali lahko uporabljam rezervacijski sistem na lastni domeni?", a: "Da. Podpiramo lastno domeno s SSL certifikatom: gostje rezervirajo na naslovu vaše restavracije (npr. rezervacija.vasarestavracija.si). Pomagamo z nastavitvijo DNS; postopek traja 5–10 minut." },
      { q: "Ali lahko nastavim samodejno ali ročno potrditev?", a: "Da, način je nastavljen v nastavitvah. Pri samodejni potrditvi gost prejme potrditev takoj po oddaji obrazca in rezervacija velja za sprejeto. Pri ročni potrditvi zahteva prispe v skrbniško ploščo s statusom „čaka na potrditev“ — vodja jo pregleda in potrdi ali zavrne. Ročni način je uporaben pri omejenem številu miz ali strogih politikah za goste." },
      { q: "Ali pobirate provizijo od rezervacij?", a: "Ne. Rezervacija miz je v celoti vključena v paket Pro — brez odstotka od gostov, brez nadomestila za termin, brez provizij agregatorjev. Fiksna mesečna naročnina in neomejene rezervacije." },
    ],
  },
};
