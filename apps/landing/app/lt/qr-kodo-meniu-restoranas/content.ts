import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lt",
  slug: "qr-kodo-meniu-restoranas",
  trackPrefix: "l_lt_qr",

  meta: {
    title: "QR kodo meniu restoranams | IQ Rest",
    description:
      "QR kodo meniu restoranams: svečias nuskaito QR kodą ant stalo, atveria meniu naršyklėje ir užsisako savo kalba. 14 dienų nemokamai, be kortelės.",
    canonical: "https://iq-rest.com/lt/qr-kodo-meniu-restoranas",
    ogLocale: "lt_LT",
    ogTitle: "QR kodo meniu restoranams",
    ogDescription:
      "QR ant stalo, meniu telefone — nuotraukos, alergenai, 35 kalbos ir atnaujinimai realiu laiku.",
    brandLine: "IQ Rest — QR kodo meniu restoranams",
  },

  hero: {
    headline: "QR kodo meniu restoranams.",
    cta: "Sukurti QR meniu",
    sub: "Svečias nukreipia kamerą į QR kodą ant stalo ir meniu iškart atsiveria telefono naršyklėje: patiekalų nuotraukos, alergenai, visada atnaujintos kainos ir automatinis vertimas į 35 kalbas. Nereikia atsisiųsti programėlių ir iš naujo spausdinti meniu kaskart pasikeitus kainai.",
  },

  scan: {
    heading: "Jau turite popierinį ar PDF meniu?",
    headingAccent: "DI per 60 sekundžių paverčia jį QR meniu.",
    sub: "Įkelkite meniu nuotrauką arba PDF — DI atpažįsta kategorijas, patiekalus ir kainas ir iškart susieja juos su QR meniu.",
    cta: "Sukurti QR meniu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Vienas QR, 35 kalbos",
      heading: "Vienas QR kodas, meniu 35 kalbomis.",
      body: "Svečias nuskaito QR ir pasirenka savo kalbą: vertimą atlieka gastronomiją išmanantis DI, o ne bendras vertėjas. Pamirškite atskirus meniu turistams ir palaidus lapelius ant stalo.",
      bullets: [
        "Vienas QR spaudinys apima 35 kalbas, įskaičiuota į prenumeratą.",
        "DI supranta virtuvės kalbą — patiekalų pavadinimai skamba natūraliai kiekviena kalba.",
        "Svečias keičia kalbą meniu viduje, iš naujo nenuskaitydamas QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Du svečiai nuskaito tą patį QR kodą ant stalo ir skaito meniu skirtingomis kalbomis" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergenai QR kode",
      heading: "Alergenai ir mitybos žymos QR meniu viduje.",
      body: "Kiekvienas su QR susietas meniu patiekalas gali turėti žymas glitimui, laktozei, riešutams, jūros gėrybėms, veganiškoms ir be glitimo parinktims. Svečias telefone atsifiltruoja jo apribojimus atitinkančius patiekalus, neklausdamas personalo.",
      bullets: [
        "14 alergenų kategorijų patiekalo lygiu.",
        "Veganiškos, vegetariškos ir be glitimo žymos vienu spustelėjimu skydelyje.",
        "Svečias filtruoja QR meniu pagal savo apribojimus.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Svečias telefone filtruoja QR meniu pagal alergenus, o savininkas redaguoja sąrašą planšetėje" },
    },
    {
      icon: Palette,
      eyebrow: "Daugiau nei tik QR",
      heading: "QR meniu, prižiūrėtas kaip restorano svetainė.",
      body: "Nuskaitęs kodą svečias nepatenka į plokščią PDF: jis mato pasveikinimo ekraną su vaizdo įrašu ar pagrindine nuotrauka, vietos aprašymą ir kontaktų puslapį su žemėlapiu, telefonais ir socialiniais tinklais. QR tampa restorano įėjimo durimis internete.",
      bullets: [
        "Fono vaizdo įrašas arba pagrindinė nuotrauka QR meniu pradžios ekrane.",
        "Vieta papasakoti vietos ir kiekvienos kategorijos koncepciją.",
        "Integruotas kontaktų puslapis: žemėlapis, telefonas, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Du telefonai ant stalo: QR meniu pradžios ekranas su fono vaizdo įrašu ir kontaktų puslapis su žemėlapiu" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Užsakymas iš QR · pasirinktinai",
      heading: "Iš QR kodo svečias gali ir užsisakyti.",
      body: "Be meniu peržiūros, QR meniu gali tapti užsakymų kanalu: svečias įdeda patiekalus į krepšelį ir išsiunčia užklausą. Užsakymas pasiekia padavėją salėje, WhatsApp arba virtuvės ekraną. Funkcija prireikus įjungiama arba išjungiama nustatymuose.",
      bullets: [
        "Krepšelis, pastabos ir užsakymo siuntimas tiesiai iš QR nuskaitymo.",
        "Užsakymas iškart pasiekia salę, WhatsApp arba virtuvės ekraną.",
        "Funkciją galima aktyvuoti pagal laiką, sales ar konkrečius restoranus.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Du telefonai ant stalo: iš QR meniu sukurtas krepšelis ir išsiųsto užsakymo patvirtinimas" },
    },
  ],

  faq: {
    sub: "Ką restoranų savininkai klausia apie IQ Rest QR meniu. Neradote savo klausimo? Parašykite mums WhatsApp.",
    items: [
      { q: "Kaip veikia IQ Rest QR meniu?", a: "Ant kiekvieno stalo yra atspausdintas QR kodas. Svečias nuskaito jį telefono kamera ir naršyklė atveria restorano meniu — nuotraukos, aprašymai, alergenai ir atnaujintos kainos. Jokios programėlės nereikia nei svečiui, nei personalui." },
      { q: "Ar reikia techninių žinių QR meniu sukurti?", a: "Ne. Skydelis veikia spustelint ir vilkdant, be kodo ir sudėtingų nustatymų. Pridėti patiekalą užtrunka kelias sekundes: pavadinimas, kaina, nuotrauka. Pradinis nustatymas paprastai trunka nuo 30 minučių iki valandos; jei jau turite PDF meniu, DI jį konvertuoja automatiškai." },
      { q: "Ar svečiai turi įdiegti programėlę QR nuskaityti?", a: "Ne. Įmontuota iPhone ir Android kamera atpažįsta QR kodą per kelias sekundes ir atveria meniu tiesiai naršyklėje. Administravimo skydelis taip pat veikia bet kurioje šiuolaikinėje naršyklėje — telefone, planšetėje ar nešiojamajame kompiuteryje." },
      { q: "Kaip spausdinami stalų QR kodai?", a: "QR kodai skydelyje generuojami automatiškai (po vieną kiekvienam stalui arba vienas visai įstaigai) ir atsisiunčiami kaip spaudai paruošti PDF. Pakanka biuro spausdintuvo ir stovo: stovas, lipdukas arba padėkliukas." },
      { q: "Ar galiu QR meniu naudoti savo domeną?", a: "Taip. Palaikome restorano domeną su SSL sertifikatu (pavyzdžiui meniu.jusurestoranas.lt): kai svečias nuskaito QR, jis mato jūsų restorano adresą, o ne bendrą subdomeną. DNS nustatymas trunka 5–10 minučių ir mes jus palydime." },
      { q: "Ar galiu valdyti kelių restoranų QR kodus iš vienos paskyros?", a: "Taip, pagal pageidavimą. Viena paskyra gali sujungti kelias įstaigas, kiekviena su savo QR kodais, meniu, dizainu ir analitika. Parašykite mums WhatsApp ir įjungsime kelių restoranų režimą." },
      { q: "Ar sunku paleisti QR meniu nuo nulio?", a: "Trys žingsniai: (1) sukurkite kategorijas; (2) pridėkite patiekalus su pavadinimu, kaina ir nuotrauka; (3) atspausdinkite QR kodus ir padėkite ant stalų. Jei jau turite popierinį ar PDF meniu, įkelkite jį — DI atpažįsta kategorijas ir kainas ir užpildo korteles. Pagrindinis meniu gali būti internete per 5 minutes." },
    ],
  },
};
