import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lv",
  slug: "galdu-rezervesana",
  trackPrefix: "l_lv_bookings",

  meta: {
    title: "Galdu rezervēšana 24/7 restorāniem | IQ Rest",
    description:
      "Galdu rezervēšana 24/7 restorāniem: viesi paši rezervē, izmantojot QR ēdienkarti vai vietni. Kalendārs pa galdiem, automātiskas apstiprināšanas un atgādinājumi. Neviena zaudēta viesa. 14 dienas bez maksas.",
    canonical: "https://iq-rest.com/lv/galdu-rezervesana",
    ogLocale: "lv_LV",
    ogTitle: "Galdu rezervēšana 24/7 — viesi rezervē paši",
    ogDescription:
      "Viesi rezervē galdus, izmantojot QR ēdienkarti vai vietni. Kalendārs, automātiskas apstiprināšanas, atgādinājumi. Neviena zaudēta viesa.",
    brandLine: "IQ Rest — Galdu rezervēšana restorāniem",
  },

  hero: {
    headline: "Galdu rezervēšana 24/7 — viesi rezervē paši.",
    cta: "Iestatīt galdiņu rezervācijas",
    sub: "Viesi rezervē galdus, izmantojot QR ēdienkarti vai tiešo saiti. Kalendārs pa galdiem, automātiskas apstiprināšanas un atgādinājumi. Neviena zaudēta viesa un nav zvanu maksimumstundās.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Saimniece pārvalda rezervācijas no planšetdatora pie restorāna ieejas",
  },

  scan: {
    heading: "Sāciet galdu rezervēšanu",
    headingAccent: "5 minūtēs.",
    sub: "Pievienojiet kalendāru, pievienojiet galdus ar fotoattēliem un ietilpību — viesi sāk rezervēt tajā pašā dienā.",
    cta: "Aktivizēt rezervēšanu",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Rezervēšanas veidlapa",
      heading: "Viesi rezervē paši — pēc datuma, laika un personu skaita.",
      body: "Viesis atver QR ēdienkarti vai tiešo saiti, izvēlas datumu, laiku un personu skaitu — un uzreiz redz pieejamos galdus, katru ar fotoattēlu, aprakstu (terase, pie loga, dīvāns blakus bāram) un ietilpību. Apstiprinājums tiek nosūtīts automātiski e-pastā un WhatsApp.",
      bullets: [
        "Galda izvēle pēc fotoattēla, apraksta un ietilpības.",
        "Automātisks apstiprinājums un atgādinājums stundu pirms apmeklējuma.",
        "Minimāli lauki veidlapā: vārds, tālrunis, personu skaits.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Viesis rezervē restorāna galdu no telefona: datums, laiks, personu skaits un galda izvēle" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Rezervāciju kalendārs",
      heading: "Kalendārs pēc dienas un galda — viss vienā acu uzmetienā.",
      body: "Administrēšanas panelis rāda rezervāciju kalendāru, sadalītu pēc galda, dienas, nedēļas un mēneša. Brīvi laika sloti, aizņemti galdi, apstiprinātas un neapstiprinātas rezervācijas vienā ekrānā. Darbojas planšetdatorā zālē un klēpjdatorā birojā.",
      bullets: [
        "Dienas, nedēļas un mēneša skati.",
        "Sadalījums pēc galda: kas, kad, cik viesu.",
        "Rezervācijas pārvietošana, atcelšana vai apstiprināšana ar vienu pieskārienu no telefona.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Rezervāciju kalendārs IQ Rest administrēšanas panelī divos planšetdatoros: ikdienas Gantt pēc galdiem un mēneša skats" },
    },
  ],

  faq: {
    sub: "Ko restorāni jautā par galdu rezervēšanu IQ Rest. Nevarat atrast savu jautājumu? Rakstiet mums WhatsApp.",
    items: [
      { q: "Vai varu izvēlēties, kuras dienas un stundas ir pieejamas rezervēšanai?", a: "Jā. Administrēšanas panelis ļauj iestatīt darba laikus un pieejamās nedēļas dienas — sistēma nerādīs viesiem nepieejamus slotus. Jūs varat aizvērt konkrētu datumu (uzņēmuma pasākums, privāta rezervācija) vai uz laiku izslēgt visu kalendāru." },
      { q: "Vai varu augšupielādēt fotoattēlu katram galdam?", a: "Jā. Katram galdam var būt fotoattēls, apraksts (terase, pie loga, dīvāns blakus bāram) un ietilpība. Viesis redz precīzi to galdu, kuru rezervē, un pieņem informētu lēmumu — tas samazina neizpildītās gaidas." },
      { q: "Vai varu atspējot rezervācijas konkrētos datumos?", a: "Jā. Kalendārs ļauj aizvērt konkrētus datumus (svētkus, privātos pasākumus, remontu) vai veselas nedēļas dienas. Šajos datumos viesi redz ziņojumu „rezervēšana uz laiku nav pieejama“." },
      { q: "Vai varu pielāgot, kādus laukus apkopo no viesa?", a: "Jā. Noklusējuma kopa: vārds, tālrunis, e-pasts, personu skaits. Jūs varat pievienot pielāgotus laukus (iemesls, alerģijas, īpašas prasības) vai noņemt nevajadzīgos, lai veidlapa būtu pēc iespējas īsāka." },
      { q: "Vai varu ierobežot viesu skaitu pie galda?", a: "Jā. Katram galdam ir „ietilpības“ iestatījums — sistēma neļaus 2 vietu galdu rezervēt 6 cilvēkiem. Lielākos galdos jūs varat iestatīt minimumu, lai mazas grupas neaizņemtu „astoņu vietu galdu“ no lielākām kompānijām." },
      { q: "Cik grūta ir rezervēšanas iestatīšana?", a: "Tas aizņem ļoti maz laika. Trīs soļi: (1) pievienojiet galdus ar nosaukumiem, fotoattēliem un ietilpību, (2) aktivizējiet rezervēšanas režīmu iestatījumos, (3) dalieties ar saiti vai QR kodu ar viesiem. Pilna palaišana 5–10 minūtēs." },
      { q: "Vai varu izmantot rezervēšanas sistēmu savā domēnā?", a: "Jā. Mēs atbalstām pielāgotu domēnu ar SSL sertifikātu: viesi rezervē jūsu restorāna adresē (piemēram, rezervacija.jusurestorans.lv). Mēs palīdzam ar DNS iestatīšanu; process aizņem 5–10 minūtes." },
      { q: "Vai varu konfigurēt automātisku vai manuālu apstiprināšanu?", a: "Jā, režīms tiek iestatīts iestatījumos. Ar automātisku apstiprināšanu viesis saņem apstiprinājumu uzreiz pēc veidlapas iesniegšanas un rezervācija tiek uzskatīta par pieņemtu. Ar manuālu apstiprināšanu pieprasījums nonāk administrēšanas panelī ar statusu „gaida apstiprinājumu“ — vadītājs to pārskata un apstiprina vai noraida. Manuālais režīms ir noderīgs, ja ir ierobežots galdu skaits vai stingras viesu politikas." },
      { q: "Vai jūs iekasējat komisiju par rezervācijām?", a: "Nē. Galdu rezervēšana ir pilnībā iekļauta Pro plānā — bez procentiem no viesiem, bez maksas par slotu, bez agregatoru komisijas. Fiksēta ikmēneša maksa un neierobežotas rezervācijas." },
    ],
  },
};
