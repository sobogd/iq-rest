import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "QR-menüü veebitellimused — restorani tellimused ilma vahendustasuta",
    description:
      "Võta otse tellimusi vastu oma QR-menüüst. Nullvahendustasu, ei Wolti ega Uber Eatsi protsenti. Külalised skannivad, tellivad, maksavad — otse sulle. 14-päevane tasuta prooviperiood.",
    canonical: "https://iq-rest.com/et/online-orders",
    ogLocale: "et_EE",
    ogTitle: "Veebitellimused ilma vahendustasuta — otsetellimused QR-menüüst",
    ogDescription:
      "Asenda 30 % tarneäppide vahendustasud otsetellimustega. Külalised skannivad QR-koodi, tellivad, maksavad — iga sent jõuab sinuni. 14-päevane tasuta prooviperiood, kaarti pole vaja.",
  },

  hero: {
    title: "Otsetellimused. Nullvahendustasu. Otse köögi.",
    subtitle:
      "Lõpeta 30 % maksmine Uber Eatsile, Glovole ja Woltile. IQ Restiga skannivad sinu külalised QR-koodi, koostavad oma tellimuse telefonis ja tellimus jõuab sinu kööki — iga sent jääb sulle.",
    trustLine: "4,9 · 500+ restorani 30+ riigis",
  },

  seo: {
    description:
      "Muuda oma QR-menüü täielikuks veebitellimuse süsteemiks loobumata 30 protsendist tarneäppidele. Külalised skannivad QR-koodi, sirvivad menüüd oma keeles, panevad ostukorvi kokku, saadavad tellimuse — ja sina võtad selle vastu lauanumbri kaudu, hetkega. Ei mingit äpilaadimist, ei vahendustasu, ei kolmandat osapoolt sinu ja külalise vahel.",
    fullDescription:
      "Enamik restorane kaotab raha juba enne, kui toit köögist välja jõuab — Uber Eats võtab 30 %, Glovo võtab 30 %, Wolt võtab 30 %. Veebitellimused IQ Resti kaudu töötavad täiesti teisiti. Tellimus läheb otse külalise telefonist sinu juhtpaneelile ja kogu marginaal jääb sulle.\n\nTellimiskogemus on ehitatud just restorani jaoks: külalised valivad laua, sirvivad menüüd, lisavad tooted ostukorvi, jätavad köögile kommentaari ja saadavad. Näed uusi tellimusi reaalajas oma telefonis või köögiekraanil — koos lauanumbri, toodete, lisanditega ja märkmetega. Märgi road valmis ja laud näeb staatust — säästad teenindajatel tosinaid jookse vahetuse kohta.\n\nSee toimib ka kaasa võtmiseks ja järelnoutamiseks: külalised skannivad ukseesise QR-kleebise, esitavad tellimuse ja maksavad — sa ei vaja eraldi tellimisäppi, eraldi veebilehte ega Stripe'i integratsiooniprojekti.",
    benefitsHeading: "Miks IQ Resti otsetellimine on parem kui tarneäpid",
    benefits: [
      "Nullvahendustasu igalt tellimuselt — hoiad 100 % tulust",
      "Tellimused jõuavad juhtpaneelile lauanumbriga reaalajas",
      "Külalised ei vaja äppi — nad skannivad QR-koodi ja tellivad brauseris",
      "Lisandid, kommentaarid, dieedimärkmed — kõik talletatakse korralikult",
      "Töötab kohapeal söömiseks, kaasamüügiks ja järelvõtmiseks — üks menüü, kolm voogu",
      "Sisseehitatud lisamüügi vihjed kasvatavad keskmist tellimuse väärtust",
    ],
  },

  pricing: {
    heading: "Üks pakett.",
    headingAccent: "Nullvahendustasu.",
    sub: "Otsetellimine, QR-menüü, restoranisait ja broneeringud — kõik sees. Ei tellimusepõhiseid tasusid, ei Stripe'i integratsiooniprojekti.",
  },

  faq: {
    sub: "Kõik, mida restoranipidajad veebitellimuste kohta küsivad. Sinu küsimust pole? Kirjuta meile WhatsAppis — vastavad päris inimesed.",
    items: [
      {
        q: "Kas te võtate tellimustelt vahendustasu?",
        a: "Null. Iga tellimus sinu QR-menüüst jõuab otse sulle — meie ei võta osa, ei mingeid Glovo või Uber Eatsi tasusid. Üks kindel kuumakse, ja kõik. Arvutus on lihtne: kui võtad kuus 5 000 € tarneäppide tellimusi, kaotad 1 500 €. Lülitu otsetellimisele ja see 1 500 € jääb sinu taskusse.",
      },
      {
        q: "Kuidas külalised tellimuse esitavad — kas neil on äppi vaja?",
        a: "Äppi pole vaja. Külalised skannivad QR-koodi telefoni kaameraga, menüü avaneb brauseris, nad valivad laua, sirvivad, lisavad ostukorvi ja saadavad. Kogu protsess on pärast skannimist kaks puudutust. Ei mingit App Store'i otsingut, ei registreerimist, ei takistusi.",
      },
      {
        q: "Kuidas ma köögis tellimusi vastu võtan?",
        a: "Tellimused ilmuvad kohe sinu juhtpaneelile, koos lauanumbri, toodete, lisandite ja võimalike märkmetega. Vaata neid telefonis, tahvelarvutis pass'il või köögiekraanil. Märgi tooted valmis ja laud näeb staatust — vähem 'kas mu toit tuleb?' küsimusi, kiiremad ringid.",
      },
      {
        q: "Kas külalised saavad maksta QR-menüü kaudu või ainult lauas?",
        a: "Mõlemad. Nad võivad tellimuse esitada ja maksta lauas sularahas või kaardiga klassikalisel viisil või maksta veebis Stripe'i kaudu otse menüü kaudu. Sina otsustad, mis on lubatud. Veebimakse on tagatud Stripe'i poolt — IQ Rest ei hoia kunagi raha, see läheb otse sinu Stripe'i kontole.",
      },
      {
        q: "Kas see toimib kaasamüügile ja järelnoutamisele, mitte ainult kohapeal söömisele?",
        a: "Jah. Kleebi sissepääsule QR-kleebis kaasamüügiks või jaga oma menüülinki Instagramis ja WhatsAppis. Külalised valivad 'järelvõtmine', tellivad, maksavad — sina valmistad, nemad tulevad järele. Sama süsteem, kolm erinevat tellimisvoogu: kohapeal söömine, kaasamüük, järelvõtmine.",
      },
    ],
  },

  finalCta: {
    heading: "Lõpeta tarneäppide toitmine.",
    headingAccent: "Hakka 100 % hoidma.",
    sub: "Asenda oma 30 % vahendustasud kindla kuumaksuga. 14-päevane tasuta prooviperiood. Krediitkaarti pole vaja. Tühista igal ajal.",
  },
};
