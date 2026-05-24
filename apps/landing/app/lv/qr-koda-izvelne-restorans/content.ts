import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lv",
  slug: "qr-koda-izvelne-restorans",
  trackPrefix: "l_lv_qr",

  meta: {
    title: "QR koda ēdienkarte restorāniem | IQ Rest",
    description:
      "QR koda ēdienkarte restorāniem: viesis noskenē QR kodu uz galda, atver ēdienkarti pārlūkā un pasūta savā valodā. 14 dienas bez maksas, bez kartes.",
    canonical: "https://iq-rest.com/lv/qr-koda-izvelne-restorans",
    ogLocale: "lv_LV",
    ogTitle: "QR koda ēdienkarte restorāniem",
    ogDescription:
      "QR uz galda, ēdienkarte telefonā — fotoattēli, alergēni, 35 valodas un atjauninājumi reāllaikā.",
    brandLine: "IQ Rest — QR koda ēdienkarte restorāniem",
  },

  hero: {
    headline: "QR koda ēdienkarte restorāniem.",
    sub: "Viesis pavērš kameru uz QR kodu uz galda, un ēdienkarte uzreiz atveras telefona pārlūkā: ēdienu fotoattēli, alergēni, vienmēr aktuālas cenas un automātisks tulkojums 35 valodās. Bez lietotņu lejupielādes un bez ēdienkartes atkārtotas drukāšanas pie katras cenas maiņas.",
  },

  scan: {
    heading: "Vai jums jau ir papīra vai PDF ēdienkarte?",
    headingAccent: "MI to 60 sekundēs pārvērš par QR ēdienkarti.",
    sub: "Augšupielādējiet ēdienkartes fotoattēlu vai PDF — MI izgūst kategorijas, ēdienus un cenas un uzreiz savieno tās ar QR ēdienkarti.",
    cta: "Izveidot QR ēdienkarti",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Viens QR, 35 valodas",
      heading: "Viens QR kods, ēdienkarte 35 valodās.",
      body: "Viesis noskenē QR un izvēlas savu valodu: tulkojumu veic MI ar gastronomisku izpratni, nevis vispārējs tulkotājs. Beigas atsevišķām ēdienkartēm tūristiem un izklaidītām lapām uz galda.",
      bullets: [
        "Viena QR izdruka aptver 35 valodas, iekļauta abonementā.",
        "MI saprot virtuves valodu — ēdienu nosaukumi katrā valodā skan dabiski.",
        "Viesis maina valodu ēdienkartes iekšienē, atkārtoti neskenējot QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Divi viesi noskenē vienu un to pašu QR kodu uz galda un lasa ēdienkarti dažādās valodās" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergēni QR kodā",
      heading: "Alergēni un uztura marķējumi QR ēdienkartes iekšienē.",
      body: "Katram ēdienam ar QR savienotajā ēdienkartē var būt marķējumi glutēnam, laktozei, riekstiem, jūras veltēm, vegāniskām un bezglutēna iespējām. Viesis telefonā filtrē saviem ierobežojumiem atbilstošos ēdienus, nejautājot personālam.",
      bullets: [
        "14 alergēnu kategorijas ēdiena līmenī.",
        "Vegāniska, veģetāra un bezglutēna marķējumi ar vienu klikšķi panelī.",
        "Viesis filtrē QR ēdienkarti pēc saviem ierobežojumiem.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Viesis telefonā filtrē QR ēdienkarti pēc alergēniem, kamēr īpašnieks rediģē sarakstu planšetdatorā" },
    },
    {
      icon: Palette,
      eyebrow: "Vairāk nekā tikai QR",
      heading: "QR ēdienkarte, izstrādāta kā restorāna mājaslapa.",
      body: "Pēc koda noskenēšanas viesis nenonāk pie plakana PDF: viņš redz sveiciena ekrānu ar video vai izceltu fotoattēlu, vietas aprakstu un kontaktu lapu ar karti, tālruņiem un sociālajiem tīkliem. QR kļūst par restorāna ieejas durvīm tiešsaistē.",
      bullets: [
        "Fona video vai izcelts fotoattēls QR ēdienkartes sākuma ekrānā.",
        "Vieta pastāstīt par vietas un katras kategorijas koncepciju.",
        "Iebūvēta kontaktu lapa: karte, tālrunis, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Divi telefoni uz galda: QR ēdienkartes sākuma ekrāns ar fona video un kontaktu lapa ar karti" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pasūtīšana no QR · pēc izvēles",
      heading: "No QR koda viesis var arī pasūtīt.",
      body: "Papildus ēdienkartes apskatei QR ēdienkarte var kļūt par pasūtījumu kanālu: viesis pievieno ēdienus grozam un nosūta pieprasījumu. Pasūtījums nonāk pie viesmīļa zālē, WhatsApp vai virtuves ekrānā. Funkciju pēc vajadzības ieslēdz vai izslēdz iestatījumos.",
      bullets: [
        "Grozs, piezīmes un pasūtījuma nosūtīšana tieši no QR skenēšanas.",
        "Pasūtījums uzreiz nonāk zālē, WhatsApp vai virtuves ekrānā.",
        "Funkciju var aktivizēt pēc laikiem, zālēm vai konkrētiem restorāniem.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Divi telefoni uz galda: no QR ēdienkartes izveidots grozs un nosūtīta pasūtījuma apstiprinājums" },
    },
  ],

  faq: {
    sub: "Ko restorānu īpašnieki jautā par IQ Rest QR ēdienkarti. Neatrodat savu jautājumu? Rakstiet mums WhatsApp.",
    items: [
      { q: "Kā darbojas IQ Rest QR ēdienkarte?", a: "Uz katra galda ir izdrukāts QR kods. Viesis to noskenē ar telefona kameru, un pārlūks atver restorāna ēdienkarti — fotoattēli, apraksti, alergēni un aktuālās cenas. Nav vajadzīga nekāda lietotne, ne viesim, ne personālam." },
      { q: "Vai man vajadzīgas tehniskas zināšanas, lai izveidotu QR ēdienkarti?", a: "Nē. Panelis darbojas ar klikšķiem un vilkšanu, bez koda un sarežģītiem iestatījumiem. Ēdiena pievienošana aizņem dažas sekundes: nosaukums, cena, fotoattēls. Sākotnējā iestatīšana parasti aizņem no 30 minūtēm līdz stundai; ja jums jau ir PDF ēdienkarte, MI to pārveido automātiski." },
      { q: "Vai viesiem jāinstalē lietotne, lai nolasītu QR?", a: "Nē. iPhone un Android iebūvētā kamera dažu sekunžu laikā atpazīst QR kodu un atver ēdienkarti tieši pārlūkā. Administrēšanas panelis arī darbojas jebkurā mūsdienīgā pārlūkā — telefonā, planšetdatorā vai klēpjdatorā." },
      { q: "Kā tiek drukāti galdu QR kodi?", a: "QR kodi panelī tiek ģenerēti automātiski (viens katram galdam vai viens visai vietai) un lejupielādēti kā drukai gatavi PDF. Pietiek ar biroja printeri un statīvu: statīvs, uzlīme vai paliktnis." },
      { q: "Vai QR ēdienkartei varu izmantot savu domēnu?", a: "Jā. Mēs atbalstām restorāna domēnu ar SSL sertifikātu (piemēram, izvelne.jusurestorans.lv): kad viesis noskenē QR, viņš redz jūsu restorāna adresi, nevis vispārēju apakšdomēnu. DNS iestatīšana aizņem 5–10 minūtes, un mēs jūs pavadām." },
      { q: "Vai varu pārvaldīt vairāku restorānu QR kodus no viena konta?", a: "Jā, pēc pieprasījuma. Viens konts var apvienot vairākas vietas, katra ar saviem QR kodiem, ēdienkarti, dizainu un analītiku. Rakstiet mums WhatsApp, un mēs ieslēgsim vairāku restorānu režīmu." },
      { q: "Vai QR ēdienkarti grūti palaist no nulles?", a: "Trīs soļi: (1) izveidojiet kategorijas; (2) pievienojiet ēdienus ar nosaukumu, cenu un fotoattēlu; (3) izdrukājiet QR kodus un novietojiet tos uz galdiem. Ja jums jau ir papīra vai PDF ēdienkarte, augšupielādējiet to — MI atpazīst kategorijas un cenas un aizpilda kartiņas. Pamata ēdienkarte var būt tiešsaistē 5 minūtēs." },
    ],
  },
};
