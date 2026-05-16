// Heading + subheading shown in the region-prompt modal. Each entry is
// rendered in the locale the visitor currently sits on (i.e. the URL
// locale, not the geo-detected one), so the prompt feels native.
//
// Kept deliberately short — the modal already shows two language tiles
// and there is no value in long marketing copy at this point in the
// funnel.

export interface RegionPromptTexts {
  heading: string;
  sub: string;
}

export const REGION_PROMPT_TEXTS: Record<string, RegionPromptTexts> = {
  ar: { heading: "اختر لغتك", sub: "اختر اللغة التي تود المتابعة بها." },
  bg: { heading: "Изберете език", sub: "Изберете езика, на който искате да продължите." },
  ca: { heading: "Tria el teu idioma", sub: "Tria l'idioma en què vols continuar." },
  cs: { heading: "Vyberte si jazyk", sub: "Vyberte jazyk, ve kterém chcete pokračovat." },
  da: { heading: "Vælg dit sprog", sub: "Vælg det sprog, du vil fortsætte på." },
  de: { heading: "Wähle deine Sprache", sub: "Wähle die Sprache, in der du fortfahren möchtest." },
  el: { heading: "Επιλέξτε γλώσσα", sub: "Επιλέξτε τη γλώσσα στην οποία θέλετε να συνεχίσετε." },
  en: { heading: "Choose your language", sub: "Pick the language you'd like to continue in." },
  es: { heading: "Elige tu idioma", sub: "Elige el idioma en el que prefieres continuar." },
  et: { heading: "Vali oma keel", sub: "Vali keel, milles soovid jätkata." },
  fa: { heading: "زبان خود را انتخاب کنید", sub: "زبانی را که می‌خواهید ادامه دهید انتخاب کنید." },
  fi: { heading: "Valitse kielesi", sub: "Valitse kieli, jolla haluat jatkaa." },
  fr: { heading: "Choisissez votre langue", sub: "Sélectionnez la langue dans laquelle vous souhaitez continuer." },
  ga: { heading: "Roghnaigh do theanga", sub: "Roghnaigh an teanga ar mhaith leat leanúint inti." },
  hr: { heading: "Odaberi svoj jezik", sub: "Odaberi jezik na kojem želiš nastaviti." },
  hu: { heading: "Válassz nyelvet", sub: "Válaszd ki, milyen nyelven szeretnél folytatni." },
  is: { heading: "Veldu tungumálið þitt", sub: "Veldu það tungumál sem þú vilt halda áfram á." },
  it: { heading: "Scegli la tua lingua", sub: "Scegli la lingua in cui vuoi continuare." },
  ja: { heading: "言語を選択", sub: "続けたい言語を選択してください。" },
  ko: { heading: "언어 선택", sub: "계속할 언어를 선택하세요." },
  lt: { heading: "Pasirinkite kalbą", sub: "Pasirinkite kalbą, kuria norite tęsti." },
  lv: { heading: "Izvēlieties valodu", sub: "Izvēlieties valodu, kurā vēlaties turpināt." },
  nl: { heading: "Kies je taal", sub: "Kies de taal waarin je verder wilt." },
  no: { heading: "Velg språk", sub: "Velg språket du vil fortsette på." },
  pl: { heading: "Wybierz język", sub: "Wybierz język, w którym chcesz kontynuować." },
  pt: { heading: "Escolhe o teu idioma", sub: "Escolhe o idioma em que queres continuar." },
  ro: { heading: "Alege limba", sub: "Alege limba în care vrei să continui." },
  ru: { heading: "Выберите язык", sub: "Выберите язык, на котором хотите продолжить." },
  sk: { heading: "Vyberte si jazyk", sub: "Vyberte jazyk, v ktorom chcete pokračovať." },
  sl: { heading: "Izberi svoj jezik", sub: "Izberi jezik, v katerem želiš nadaljevati." },
  sr: { heading: "Изаберите језик", sub: "Изаберите језик на ком желите да наставите." },
  sv: { heading: "Välj språk", sub: "Välj språket du vill fortsätta på." },
  tr: { heading: "Dilini seç", sub: "Devam etmek istediğin dili seç." },
  uk: { heading: "Виберіть мову", sub: "Виберіть мову, якою хочете продовжити." },
  zh: { heading: "选择语言", sub: "选择您希望继续浏览的语言。" },
};

export function getRegionPromptTexts(locale: string): RegionPromptTexts {
  return REGION_PROMPT_TEXTS[locale] ?? REGION_PROMPT_TEXTS.en;
}
