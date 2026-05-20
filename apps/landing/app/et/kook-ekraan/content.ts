import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "et",
  slug: "kook-ekraan",
  trackPrefix: "l_et_kds",

  meta: {
    title: "Köögiekraan (KDS) restoranidele | IQ Rest",
    description:
      "Köögiekraan (KDS) restoranidele: tellimused saalist ja QR-menüüst jõuavad kohe koka ekraanile. Veerud laudade järgi, olekud Ootel / Valmistatakse / Valmis / Serveeritud, tsoonide järgi filtrid. Toimib tahvelarvutil või telefonis.",
    canonical: "https://iq-rest.com/et/kook-ekraan",
    ogLocale: "et_EE",
    ogTitle: "Köögiekraan (KDS) — tellimused koka ekraanil",
    ogDescription:
      "Tellimused saalist koka ekraanil. Veerud laudade järgi, olekud ja taimer. Üks puudutus muudab olekut.",
    brandLine: "IQ Rest — Köögiekraan",
  },

  hero: {
    headline: "Köögiekraan: tellimused otse koka ekraanile.",
    sub: "Paberitellimusi pole enam vaja. Tellimused saalist või QR-menüüst jõuavad kohe köögiekraanile — märkuste, allergeenide ja taimeriga. Üks puudutus muudab olekut. Toimib tahvelarvutil väljastusletil või nutitelefonil koka taskus.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Professionaalne köök vasalkujul oleva tahvelarvutiga, mis kuvab köögiekraani aktiivsete tellimustega",
  },

  scan: {
    heading: "Seadista köögiekraan",
    headingAccent: "5 minutiga.",
    sub: "Lae üles paberil menüü või PDF — AI tunneb ära road, kategooriad ja allergeenid. Ühenda tahvelarvuti köögis ja hakka tellimusi vastu võtma.",
    cta: "Skanni menüü",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Juhtimine ja filtrid",
      heading: "Mitu ekraani tsooni järgi: köök ja baar.",
      body: "Pane eraldi tahvelarvutid kuumale liinile, baari või kondiitritöö juurde — iga ekraan näitab ainult talle kuuluvaid roogi. Olekute (Ootel / Valmistatakse / Valmis / Serveeritud) ja kategooria filtrid eemaldavad müra: kokk näeb ainult seda, mis on tema postile asjakohane.",
      bullets: [
        "Mitu KDS-ekraani kategooria filtritega.",
        "Olekufilter: kuva ainult Valmistatakse ja Valmis.",
        "Iga tsoon näeb ainult oma tellimuste voolu.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Vasalkujul olev tahvelarvuti köögi väljastusletil — KDS olekufiltriga" },
    },
    {
      icon: Timer,
      eyebrow: "Kaardid ja taimer",
      heading: "Üks puudutus muudab olekut. Märkused ja allergeenid värviga esile tõstetud.",
      body: "Roa kaart näitab valitud valikud (ilma sibulata, hästi küpsetatud), külalise märkust, allergeene ja taimerit alates hetkest, mil tellimus tehti. Puuduta kaarti ja olek liigub järgmisesse: Ootel → Valmistatakse → Valmis → Serveeritud. Loend sorteeritakse automaatselt prioriteedi järgi.",
      bullets: [
        "Puudutus kaardil — kohene oleku muutus.",
        "Valikud, märkused ja allergeenid värviga esile tõstetud.",
        "Prioriteedi järgi sortimine: kauem ootavad kaubad tõusevad üles.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Vasalkujul olev tahvelarvuti baarileti peal — KDS tellimuse kaartidega laudade järgi" },
    },
  ],

  faq: {
    sub: "Mida restoranipidajad küsivad köögiekraani kohta IQ Restis. Ei leia oma küsimust? Kirjuta meile WhatsAppi.",
    items: [
      { q: "Millised roogade olekud on köögis?", a: "Neli olekut erinevate kaardivärvidega: Ootel (hall) — tellimus on vastu võetud ja ootab; Valmistatakse (oranž) — rooga valmistatakse; Valmis (sinine) — valmis serveerimiseks; Serveeritud (roheline) — viidi külalisele. Kaardil puudutamine viib selle järgmisesse olekusse, ilma menüüde ja kinnitusteta." },
      { q: "Kas ma saan mitu KDS-ekraani erinevates tsoonides töötama panna?", a: "Jah. Üks tahvelarvuti kuumal liinil, teine baaris, kolmas kondiitritöö juures — iga oma kategooria filtriga. Kõik ekraanid on reaalajas sünkroniseeritud: ühel ekraanil muudetud olek uuendub kõikjal." },
      { q: "Millist riistvara ma KDS-i jaoks vajan?", a: "KDS on veebirakendus, mis töötab igas kaasaegses brauseris. Suur köök — vasalkujul olev tahvelarvuti väljastusletil või teler seinal. Väike koht — koka nutitelefon. Ei mingit eririistvara, ei mingit installi: ava link ja logi kontosse." },
      { q: "Kust tulevad tellimused köögiekraanile?", a: "Kõigist allikatest: külaline, kes tellis lauas QR-menüü kaudu; kelner, kes võttis tellimuse vastu telefonist; külaline, kes tegi tellimuse veebilehelt. Kõik saabuvad KDS-i allika sildi ja lauanumbriga. Ei mingeid käsitsi ülekandeid POS-ist." },
      { q: "Mida tellimuse kaardil kuvatakse?", a: "Roa nimi, valitud modifikaatorid (ilma sibulata, hästi küpsetatud, lisa kaste), külalise kommentaar, esile tõstetud allergeenid, olek (Ootel / Valmistatakse / Valmis / Serveeritud) ja taimer, mis näitab, kui kaua roog on oodanud. Kaardid sorteeritakse prioriteedi järgi: mida pikem ooteaeg, seda kõrgemal veerus." },
      { q: "Kas ma saan kaarte ekraanil filtreerida?", a: "Jah. Kaks filtrit: oleku järgi (nt kuva ainult Ootel ja Valmistatakse, peida Serveeritud) ja kategooria järgi (ainult joogid baaris, ainult pearoad köögis). Sätted salvestatakse seadme kohta — iga tsoon hoiab oma komplekti." },
    ],
  },
};
