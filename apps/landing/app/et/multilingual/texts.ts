import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Mitmekeelne Restoranimenüü — 35 Keelt, Üks Puudutus Vahetamiseks",
    description:
      "Teeninda rahvusvahelisi külalisi nende keeles. Restoranimenüü 35 keeles ühe puudutusega vahetamisega. RTL-tugi araabia ja pärsia keele jaoks. 14-päevane tasuta prooviperiood.",
    canonical: "https://iq-rest.com/et/multilingual",
    ogLocale: "et_EE",
    ogTitle: "Mitmekeelne Restoranimenüü Veebileht — 35 Keelt Sisseehitatud",
    ogDescription:
      "Turistid skaneerivad, näevad sinu menüüd nende keeles automaatselt. 35 keelt, RTL-tugi, automaatne tuvastus telefoni seadetest. 14-päevane tasuta prooviperiood.",
  },

  hero: {
    title: "Sinu menüü räägib iga turisti keelt.",
    subtitle:
      "Mitmekeelne restoranimenüü ei peaks olema projekt. IQ Restiga tuvastab sinu QR-menüü automaatselt iga külalise telefoni keele ja serveerib seda mistahes 35 keeles — sealhulgas araabia ja pärsia korralike paremalt-vasakule renderdusega.",
    trustLine: "500+ restorani 30+ riigis",
  },

  seo: {
    description:
      "Ehita oma menüü üks kord, serveeri seda 35 keeles. IQ Rest tuvastab automaatselt iga külalise telefoni keele ja renderdab menüüd nende keeles — pole lipu-puudutusi, pole keelebarjääri, pole ebamugavaid Google Translate'i hetki. Hispaania ja saksa keelest jaapani, araabia ja mandariini keeleni näevad su külalised su restorani nii, nagu see oli mõeldud nähtava.",
    fullDescription:
      "Enamik 'mitmekeelseid' menüüsid on katkise Google Translate'i PDF-id, trükitud üks kord ja kunagi uuendatud. IQ Resti mitmekeelne restoraniveebileht on päris i18n: igal keelel on oma korralikult tõlgitud koopia, oma URL-i slug, oma meta-sildid Google'i indekseerimiseks ja oma marsruutimine menüü rakenduses.\n\nKui prantsuse keele iPhone'iga turist skaneerib su QR-koodi, avaneb menüü automaatselt prantsuse keeles — pole puudutusi, pole otsuseid. Nad saavad lülituda mistahes teisele keelele ülaservas oleva keelevalijaga, kuid enamik ei vaja seda kunagi. Sama kehtib dieedisiltide kohta ('vegan' saab 'vegano' / 'vegetarisch' / 'ヴィーガン' sõltuvalt keelest), veateadete, 'lisa korvi' nuppude ja kviitungite kohta. Iga UI-string 35 keeles, mitte ainult menüü sisu.\n\nRTL-keelte — araabia ja pärsia — jaoks pööratakse kogu paigutus korralikult: tekst joondub paremale, menüüd avanevad paremalt, hinnad ilmuvad roa nime järel, nagu eeldatud. See pole CSS-trikk, see on täielik RTL-tugi, mis paneb araabia ja pärsia külalised tundma teenindatuna, mitte hiljem lisatuna.",
    benefitsHeading: "Miks päris mitmekeelne menüü lööb PDF-tõlke",
    benefits: [
      "35 keelt korraliku UI-tõlkega — mitte ainult menüü sisu",
      "Tuvastab automaatselt külalise telefoni keele — puudutusi pole vaja",
      "Käsitsi keelevahetus külaliste jaoks, kes eelistavad teist keelt",
      "Täielik RTL-tugi araabia ja pärsia keele jaoks — pole CSS-trikk",
      "Igal keelel on oma URL — Google indekseerib 35 versiooni sinu saidist",
      "Vaheta roa kirjeldust oma emakeeles — tõlked järgnevad",
    ],
  },

  pricing: {
    heading: "Üks tellimus.",
    headingAccent: "Kõik 35 keelt sees.",
    sub: "Mitmekeelne menüü, AI-tõlge, QR-tellimine ja broneeringud — kõik ühes fikseeritud hinnas. Pole tasusid keele kohta, pole lisatasusid RTL eest.",
  },

  faq: {
    sub: "Kõik, mida restoranipidajad mitmekeelse menüü kohta küsivad. Ei näe enda oma? Saada meile sõnum WhatsAppis — päris inimesed vastavad.",
    items: [
      {
        q: "Mitut keelt menüü toetab?",
        a: "35 keelt sealhulgas inglise, hispaania, saksa, prantsuse, itaalia, portugali, hollandi, poola, tšehhi, slovaki, ungari, rumeenia, bulgaaria, horvaadi, serbia, sloveenia, kreeka, türgi, vene, ukraina, leedu, läti, eesti, soome, rootsi, norra, taani, islandi, katalaani, iiri gaeli, araabia, pärsia, jaapani, korea ja hiina. UI-stringid on professionaalselt tõlgitud iga keele jaoks.",
      },
      {
        q: "Kuidas kliendid keelt vahetavad?",
        a: "Kaks viisi: automaatne (menüü avaneb nende telefoni keeles) ja käsitsi (keelevalija menüü ülaservas). 80% turistidest ei puuduta käsitsi valijat kunagi — automaatne tuvastus lihtsalt töötab, sest nende telefon teab juba nende keelt.",
      },
      {
        q: "Kas toetate paremalt-vasakule keeli nagu araabia ja pärsia?",
        a: "Jah, täieliku RTL-paigutusega. Kogu menüü pööratakse: tekst joondub paremale, veerud pöörduvad, navigeerimissahtlid avanevad paremalt, hinnad ilmuvad roa nime järel. See on päris RTL-tugi, mis on rakendatud paigutuse tasemel, mitte ainult CSS-suuna trikid.",
      },
      {
        q: "Kas Google indekseerib mu menüü kõigis 35 keeles?",
        a: "Jah. Igal keelel on oma URL-i slug (nt /es, /fr, /de), korralikud hreflang-sildid, lokaliseeritud meta-pealkirjad ja -kirjeldused ning keelespetsiifilised struktureeritud andmed. Google käsitleb iga keelt kui eraldi lehte selle lokaali jaoks, mis tähendab, et turistid, kes otsivad sinu restorani oma keeles, leiavad sind suurema tõenäosusega.",
      },
      {
        q: "Mis siis, kui ma ei taha kõiki 35 keelt — ainult oma peamised turud?",
        a: "Vali, millised keeled on aktiivsed. Kui oled rannarestoran Kreekas, mis teenindab peamiselt Briti, Saksa ja Itaalia turiste, lülita sisse ainult inglise, saksa ja itaalia — ülejäänud ei ilmu keelevalijasse ega automaatsesse tuvastamisse. Saad alati hiljem rohkem lubada, kui su turistide miks muutub.",
      },
    ],
  },

  finalCta: {
    heading: "Iga turisti telefoni keel.",
    headingAccent: "Juba toetatud.",
    sub: "Serveeri mitmekeelset menüüd 35 keeles, sealhulgas RTL araabia ja pärsia. 14-päevane tasuta prooviperiood, krediitkaarti pole vaja, tasusid keele kohta pole.",
  },
};
