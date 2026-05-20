// Build a proposed PT campaign-negatives list from the existing ES + IT
// negatives. Universal terms (brands, competitor SaaS, generic tech words,
// non-target country names) are carried over verbatim. ES/IT stop-words
// that have a clear PT equivalent are translated. Output is a JSON file
// the next script will read and POST to Google Ads after user approval.

import * as fs from "fs";
import * as path from "path";
import { GoogleAdsApi } from "google-ads-api";
import * as dotenv from "dotenv";
dotenv.config();

const ITALY = "23815769905";
const SPAIN = "23816420290";

async function fetchNegs(campaignId: string) {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const customer = client.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });
  const rows = await customer.query(`
    SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
    FROM campaign_criterion
    WHERE campaign.id = ${campaignId}
      AND campaign_criterion.negative = TRUE
      AND campaign_criterion.type = 'KEYWORD'
      AND campaign_criterion.status != 'REMOVED'
  `);
  return rows.map((r: any) => ({
    text: String(r.campaign_criterion.keyword.text || "").trim(),
    match: r.campaign_criterion.keyword.match_type as number,
  })).filter((r) => r.text);
}

// ES/IT word → PT translation. Empty value = drop (already universal — kept
// in `keep` set below). Anything not matched here is also kept verbatim.
const TRANSLATE: Record<string, string> = {
  // ES core stop words
  "gratis": "grátis",
  "gratuito": "gratuito",
  "gratuita": "gratuita",
  "gratuitamente": "gratuitamente",
  "diseño": "design",
  "diseñadores": "designers",
  "diseño carta": "design de ementa",
  "modelo": "modelo",
  "modelos": "modelos",
  "soporte": "suporte",
  "gestión": "gestão",
  "trabajo": "emprego",
  "empleados": "empregados",
  "asalariado": "assalariado",
  "personal": "pessoal",
  "pegatinas": "autocolantes",
  "pegatina": "autocolante",
  "adhesivo": "adesivo",
  "ejemplos": "exemplos",
  "ejemplo": "exemplo",
  "imprimir": "imprimir",
  "impresión": "impressão",
  "impresora tickets": "impressora de talões",
  "madera": "madeira",
  "cartón": "cartão",
  "plastificado": "plastificado",
  "metacrilato": "acrílico",
  "harinas": "farinhas",
  "contrato": "contrato",
  "receta": "receita",
  "recetas": "receitas",
  "cocinar": "cozinhar",
  "cocinar para": "cozinhar para",
  "como hacer": "como fazer",
  "como ver": "como ver",
  "ver carta": "ver ementa",
  "ver carta restaurante": "ver ementa de restaurante",
  "carta de restaurante": "ementa de restaurante",
  "carta de un restaurante": "ementa de um restaurante",
  "carta de un bar": "ementa de um bar",
  "carta bar": "ementa de bar",
  "carta online": "ementa online",
  "carta digital": "ementa digital",
  "cartas personalizadas": "ementas personalizadas",
  "cartas originales": "ementas originais",
  "cartas desayunos": "ementas pequeno-almoço",
  "cartas creativas": "ementas criativas",
  "creativas": "criativas",
  "cartas de menu creativas": "ementas criativas",
  "modelos para cartas de restaurante": "modelos de ementas de restaurante",
  "menú degustación": "menu degustação",
  "menú niños": "menu crianças",
  "menú infantil": "menu infantil",
  "con precios": "com preços",
  "para tv": "para tv",
  "que carta": "que ementa",
  "leer codigo qr": "ler código qr",
  "leer qr": "ler qr",
  "escáner qr": "scanner qr",
  "escaner qr": "scanner qr",
  "escáner": "scanner",
  "escaner": "scanner",
  "menumaker": "menumaker",
  "domicilio": "domicílio",
  "pedidos": "encomendas",
  "tpv": "tpv",
  "caja registradora": "caixa registadora",
  "carta": "ementa",
  // Italian core stop words
  "lavoro": "trabalho",
  "carriera": "carreira",
  "curriculum": "currículo",
  "assunzione": "contratação",
  "idee": "ideias",
  "scaricabile": "para download",
  "stampa": "impressão",
  "stampare": "imprimir",
  "esempio": "exemplo",
  "esempi": "exemplos",
  "scrivere": "escrever",
  "bevande": "bebidas",
  "carne": "carne",
  "pesce": "peixe",
  "mangiare": "comer",
  "telefono": "telefone",
  "orario": "horário",
  "libero": "grátis",
  "cocktail": "cocktail",
  "modelli": "modelos",
  "gestionale": "gestão",
  "legno": "madeira",
  "terminale": "terminal",
  "asia": "asia",
  "fai da te": "faça você mesmo",
  "espositore": "expositor",
  "personale": "pessoal",
  "dipendenti": "empregados",
  "adesivo": "autocolante",
  "cassa": "caixa",
  "trattoria": "trattoria",
  "osteria": "osteria",
  "oggi": "hoje",
  "colazione": "pequeno-almoço",
  "palmari": "pdas",
  "via": "via",
  "dove": "onde",
  "ordinare": "encomendar",
  "ordini": "encomendas",
  "ricetta": "receita",
  "ricette": "receitas",
  "cucinare": "cozinhar",
  "cartellone": "cartaz",
  "stampato": "impresso",
  "stampante": "impressora",
  "etichette": "etiquetas",
  "cavalletto": "cavalete",
  "menù degustazione": "menu degustação",
  "menù bambini": "menu crianças",
  "leggere qr": "ler qr",
  "scanner codice qr": "scanner código qr",
  "qr lesen": "ler qr",
  "qr code lesen": "ler qr",
  "qr code scanner": "scanner qr code",
  "qr scanner": "scanner qr",
  "scanner qr": "scanner qr",
  // Italian — extended
  "cenare": "jantar",
  "pranzare": "almoçar",
  "prenotare": "reservar",
  "prenotare tavolo": "reservar mesa",
  "prenotazione": "reserva",
  "consegna": "entrega",
  "accesso": "acesso",
  "modello": "modelo",
  "prezzo": "preço",
  "prezzi": "preços",
  "prezzo cena": "preço jantar",
  "assunzioni": "contratações",
  "vedere": "ver",
  "stipendio": "salário",
  "mio menu": "meu menu",
  "porta menu": "porta menu",
  "targhetta": "placa",
  "generatore": "gerador",
  "registratore di cassa": "caixa registadora",
  "sistemi di cassa": "sistemas de caixa",
  "asporto": "take away",
  "menu bar": "menu bar",
  "migliori ristoranti": "melhores restaurantes",
  "cosa mangiare": "o que comer",
  "ristoranti vicino": "restaurantes perto",
  "vicino a me": "perto de mim",
  "stampante comande": "impressora comandas",
  "stampabile": "imprimível",
  "consultare": "consultar",
  "da compilare": "para preencher",
  "creare da zero": "criar do zero",
  "senza costi": "sem custos",
  "ristorante economico": "restaurante económico",
  "come funziona": "como funciona",
  "gratuiti": "gratuitos",
  "scaricare": "baixar",
  "scarica": "baixa",
  "offerte": "ofertas",
  "offerte lavoro": "ofertas emprego",
  "indirizzo": "endereço",
  "indicazioni": "indicações",
  "menù del giorno": "menu do dia",
  "menù": "menu",
  "leggi menu": "ler menu",
  "leggi qr": "ler qr",
  "leggi menù": "ler menu",
  "leggi il menu": "ler o menu",
  "leggere menu": "ler menu",
  "leggere menù": "ler menu",
  "leggere qr code menu": "ler qr code menu",
  "guarda menu": "ver menu",
  "come scannerizzare qr menu": "como digitalizar qr menu",
  "visualizzare menu": "visualizar menu",
  "fac simile": "modelo",
  "cartoncino": "cartão",
  "espositore da tavolo": "expositor de mesa",
  "stampato": "impresso",
  "stampante": "impressora",
  "etichette": "etiquetas",
  "ordini": "encomendas",
  "ricetta": "receita",
  "ricette": "receitas",
  "cucinare": "cozinhar",
  "menù degustazione": "menu degustação",
  "menù bambini": "menu crianças",
  // Spanish — extended
  "tríptico": "tríptico",
  "plantilla": "modelo",
  "cerca de mi": "perto de mim",
  "sabor": "sabor",
  "luminoso": "luminoso",
  "formato": "formato",
  "mira mi carta": "vê a minha ementa",
  "ver el menu": "ver o menu",
  // French residuals (already accidentally negative on ES/IT)
  "voir le menu": "ver o menu",
  "voir menu": "ver menu",
  "consulter menu": "consultar menu",
  "lire qr": "ler qr",
  "lire un qr": "ler um qr",
  "scanneur qr": "scanner qr",
};

// Terms to keep verbatim across markets — brands, competitors, tech words,
// non-target country names, German-language bleed-through guards, etc.
function shouldKeepVerbatim(text: string): boolean {
  const t = text.toLowerCase();
  // Universal short tech / format words
  const TECH = [
    "tv", "pos", "suite", "app", "nfc", "pda", "pdf", "word", "excel",
    "canva", "ia", "generator", "template", "design", "print", "scan",
    "scanner", "download", "free", "html", "json", "api", "csv",
  ];
  // Non-target geos
  const GEO = [
    "mexico", "peru", "argentina", "ecuador", "chile", "colombia", "asia",
    "latam", "subway", // technically brand
  ];
  // Restaurant / SaaS brands & competitors
  const BRANDS = [
    "mcdonalds", "mcdonald", "mcdo", "kfc", "burger king", "pizza hut",
    "papa john", "dunkin", "starbucks", "vapiano", "l'osteria", "l osteria",
    "foster's hollywood", "100 montaditos", "telepizza", "ginos", "viena",
    "deliveroo", "uber eats", "glovo", "just eat", "flipdish", "storyous",
    "agorapos", "zucchetti", "fudo", "holaclick", "olaclick", "smartmenu",
    "smart restaurant", "waitry", "octotable", "queresto", "cheerfy",
    "foodyt", "movilmenu", "infoqr", "menuqr", "menutech", "motopress",
    "numier", "covermanager", "owner com", "zoho", "ordr menu", "menew",
    "menumaker", "maxmenu", "comandero", "comanderos", "agora restaurant",
    "mr restaurant", "gourmeats", "tabaibales", "tierra astur", "el homenaje",
    "block house", "gasthof rose", "osteria ingolstadt", "monte corona",
    "kyffhauser", "kyffhäuser", "hans im glück", "grossharthau", "flachslanden",
    "pliezhausen", "haxenhaus", "arlinger", "großharthau", "haddock",
    "menu board", "menu restaurante", "smart menu", "elefantes", "rodilla", "domino",
    "kostenlose", "kostenloses", "kostenlosen", "asiatisch", "gratuitement",
    "scanneur", "tegel", "l epoque", "l'epoque", "foodyt", "qr code lesen",
    "qr lesen", "kyffhäuser", "kyffhauser",
  ];
  if (TECH.includes(t)) return true;
  if (GEO.includes(t)) return true;
  if (BRANDS.includes(t)) return true;
  // Brand-looking single tokens (camelCase, ends with -menu, etc.)
  if (/^[a-z]{3,}menu$/.test(t)) return true;
  if (/restaurant$/i.test(t) && t.includes(" ")) return true;
  return false;
}

async function main() {
  console.log("Fetching ES + IT negatives...");
  const [es, it] = await Promise.all([fetchNegs(SPAIN), fetchNegs(ITALY)]);
  console.log(`Spain: ${es.length}, Italy: ${it.length}`);

  // Build combined unique set, preferring the broader match type when seen
  // twice. match_type: 2=EXACT 3=PHRASE 4=BROAD (widest = BROAD).
  const merged = new Map<string, { text: string; match: number }>();
  for (const r of [...es, ...it]) {
    const k = r.text.toLowerCase();
    const prev = merged.get(k);
    if (!prev || r.match > prev.match) merged.set(k, { text: r.text, match: r.match });
  }

  // Translate or keep
  const proposed: Array<{ text: string; match: number; via: string }> = [];
  const seen = new Set<string>();
  function add(text: string, match: number, via: string) {
    const k = text.toLowerCase();
    if (seen.has(k)) return;
    seen.add(k);
    proposed.push({ text, match, via });
  }

  for (const [k, r] of merged) {
    if (shouldKeepVerbatim(r.text)) {
      add(r.text, r.match, "keep");
      continue;
    }
    const t = TRANSLATE[k];
    if (t) {
      add(t, r.match, "translate");
      continue;
    }
    // Default — keep verbatim (acts as a safety net for brand-looking terms
    // we didn't enumerate). Reviewer can prune.
    add(r.text, r.match, "fallback");
  }

  const out = {
    fromSpain: es.length,
    fromItaly: it.length,
    combinedUnique: merged.size,
    proposed: proposed.length,
    items: proposed,
  };
  const file = path.resolve(__dirname, "../tmp-pt-negatives-proposal.json");
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  console.log("Wrote", file);
  console.log("Counts:", { keep: proposed.filter(p => p.via === "keep").length, translate: proposed.filter(p => p.via === "translate").length, fallback: proposed.filter(p => p.via === "fallback").length });
}

main().catch((e) => { console.error(e); process.exit(1); });
