import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Večjezični restavracijski meni — 35 jezikov, en tap za preklop",
    description:
      "Postrežite mednarodne goste v njihovem jeziku. Restavracijski meni v 35 jezikih z enotapnim preklapljanjem. RTL podpora za arabščino in perzijščino. 14-dnevno brezplačno preizkusno obdobje.",
    canonical: "https://iq-rest.com/sl/multilingual",
    ogLocale: "sl_SI",
    ogTitle: "Večjezična spletna stran restavracijskega menija — 35 jezikov vgrajenih",
    ogDescription:
      "Turisti skenirajo, vidijo vaš meni samodejno v svojem jeziku. 35 jezikov, RTL podpora, samodejno zaznavanje iz nastavitev telefona. 14-dnevno brezplačno preizkusno obdobje.",
  },

  hero: {
    title: "Vaš meni govori jezik vsakega turista.",
    subtitle:
      "Večjezični restavracijski meni ne bi smel biti projekt. Z IQ Rest vaš QR meni samodejno zazna jezik telefona vsakega gosta in ga postreže v katerem koli od 35 jezikov — vključno z arabščino in perzijščino s pravilnim izrisom z desne proti levi.",
    trustLine: "500+ restavracij v 30+ državah",
  },

  seo: {
    description:
      "Zgradite svoj meni enkrat, postrezite ga v 35 jezikih. IQ Rest samodejno zazna jezik telefona vsakega gosta in izriše meni v njegovem jeziku — brez tapanja zastavic, brez jezikovnih ovir, brez nerodnih trenutkov z Google Translate. Od španščine in nemščine do japonščine, arabščine in mandarinščine, vaši gostje vidijo vašo restavracijo tako, kot je bila zamišljena.",
    fullDescription:
      "Večina 'večjezičnih' menijev so PDF-ji polomljenega Google Translate, natisnjeni enkrat in nikoli posodobljeni. Večjezična spletna stran restavracije IQ Rest je pravi i18n: vsak jezik ima svojo pravilno prevedeno kopijo, svojo lastno URL pripono, svoje meta oznake, da jih Google indeksira, in svojo usmerjevanje znotraj aplikacije menija.\n\nKo turist s francosko nastavljenim iPhonom skenira vašo QR kodo, se meni samodejno odpre v francoščini — brez tapov, brez odločitev. Lahko preklopijo na katerikoli drug jezik z izbirnikom jezikov na vrhu, vendar tega večina ne potrebuje. Isto velja za prehranske oznake ('vegan' postane 'vegansko' / 'vegetarisch' / 'ヴィーガン' odvisno od jezika), za sporočila o napakah, za gumbe 'dodaj v košarico', za račune. Vsak niz uporabniškega vmesnika v 35 jezikih, ne le vsebina menija.\n\nZa RTL jezike — arabščino in perzijščino — se celotna postavitev pravilno obrne: besedilo se poravna desno, meniji se odpirajo z desne, cene se pojavijo za imenom jedi, kot je pričakovano. To ni CSS trik, to je polna RTL podpora, zaradi katere se arabski in perzijski gostje počutijo postreženi, ne nadgrajeni.",
    benefitsHeading: "Zakaj pravi večjezični meni premaga PDF prevod",
    benefits: [
      "35 jezikov s pravilnim prevodom uporabniškega vmesnika — ne le elementi menija",
      "Samodejno zazna jezik telefona gosta — brez potrebnih tapov",
      "Ročni preklopnik jezikov za goste, ki imajo raje drug jezik",
      "Polna RTL podpora za arabščino in perzijščino — ne CSS trik",
      "Vsak jezik ima svoj URL — Google indeksira 35 različic vaše strani",
      "Spremenite opis jedi v svojem materinem jeziku — prevodi sledijo",
    ],
  },

  pricing: {
    heading: "En paket.",
    headingAccent: "Vseh 35 jezikov vključenih.",
    sub: "Večjezični meni, AI prevajanje, QR naročanje in rezervacije — vse v eni enotni ceni. Brez provizij na jezik, brez doplačil za RTL.",
  },

  faq: {
    sub: "Vse, kar lastniki restavracij sprašujejo o večjezičnem meniju. Ne najdete svojega vprašanja? Pišite nam na WhatsApp — odgovorijo pravi ljudje.",
    items: [
      {
        q: "Koliko jezikov podpira meni?",
        a: "35 jezikov, vključno z angleškim, španskim, nemškim, francoskim, italijanskim, portugalskim, nizozemskim, poljskim, češkim, slovaškim, madžarskim, romunskim, bolgarskim, hrvaškim, srbskim, slovenskim, grškim, turškim, ruskim, ukrajinskim, litovskim, latvijskim, estonskim, finskim, švedskim, norveškim, danskim, islandskim, katalonskim, irskim galskim, arabskim, perzijskim, japonskim, korejskim in kitajskim. Nizi uporabniškega vmesnika so profesionalno prevedeni za vsakega.",
      },
      {
        q: "Kako stranke zamenjajo jezik?",
        a: "Dva načina: samodejno (meni se odpre v jeziku njihovega telefona) in ročno (izbirnik jezikov na vrhu menija). 80 % turistov se nikoli ne dotakne ročnega izbirnika — samodejno zaznavanje preprosto deluje, ker njihov telefon že pozna njihov jezik.",
      },
      {
        q: "Ali podpirate jezike z desne proti levi, kot sta arabski in perzijski?",
        a: "Da, s polno RTL postavitvijo. Celoten meni se obrne: besedilo se poravna desno, stolpci se obrnejo, navigacijski predalčki se odpirajo z desne strani, cene se pojavijo za imeni jedi. To je prava RTL podpora, implementirana na ravni postavitve, ne le triki s smerjo CSS.",
      },
      {
        q: "Ali bo Google indeksiral moj meni v vseh 35 jezikih?",
        a: "Da. Vsak jezik ima svojo URL pripono (npr. /es, /fr, /de), pravilne hreflang oznake, lokalizirane meta naslove in opise ter strukturirane podatke za jezik. Google obravnava vsak jezik kot ločeno stran za to lokalizacijo, kar pomeni, da imajo turisti, ki iščejo vašo restavracijo v svojem jeziku, večjo verjetnost, da vas najdejo.",
      },
      {
        q: "Kaj če ne želim vseh 35 jezikov — samo svoje glavne trge?",
        a: "Izberite, kateri jeziki so aktivni. Če ste obmorska restavracija v Grčiji, ki streže predvsem britanske, nemške in italijanske turiste, omogočite samo angleščino, nemščino in italijanščino — ostali se ne pojavijo v izbirniku jezikov ali samodejnem zaznavanju. Kasneje lahko vedno omogočite več, ko se vaša turistična mešanica spremeni.",
      },
    ],
  },

  finalCta: {
    heading: "Jezik telefona vsakega turista.",
    headingAccent: "Že podprt.",
    sub: "Postrezite večjezični meni v 35 jezikih, vključno z arabščino in perzijščino RTL. 14-dnevno brezplačno preizkusno obdobje, brez kreditne kartice, brez provizij na jezik.",
  },
};
