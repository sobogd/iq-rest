// Spain Search campaign — same pattern as Italy/Germany/France.
// "Desde 6,90€/mes" pinned at HEADLINE_2. Per-keyword bids low+10%.

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";
import * as fs from "fs";

config({ path: path.join(process.cwd(), ".env") });

const DRY = process.argv.includes("--dry-run");

const CAMPAIGN_NAME = "ES — Search — Carta QR (auto)";
const DAILY_BUDGET_EUR = 15;
const SPAIN_GEO = "geoTargetConstants/2724";
const SPANISH_LANG = "languageConstants/1003";
const LANDING_URL = "https://iq-rest.com/es";
const PRICE_HEADLINE = "Desde 6,90€/mes";
const PATH1 = "carta-digital";
const PATH2 = "restaurante";
const BUFFER = 1.10;
const FLOOR_EUR = 0.20;

const KW_DATA: Array<{ keyword: string; lowCpc: number | null }> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts/keyword-research-es.json"), "utf-8"),
);
const cpcMap = new Map<string, number>();
for (const r of KW_DATA) if (r.lowCpc != null) cpcMap.set(r.keyword.toLowerCase().trim(), r.lowCpc);

function bidMicrosForKeyword(text: string, fallbackEur: number): number {
  const low = cpcMap.get(text.toLowerCase().trim());
  const base = low != null ? low * BUFFER : fallbackEur;
  const eur = Math.max(base, FLOOR_EUR);
  return Math.round((eur * 1_000_000) / 10_000) * 10_000;
}

type Match = "EXACT" | "PHRASE" | "BROAD";
interface KW { text: string; match: Match; }
interface Group { name: string; defaultCpcEur: number; keywords: KW[]; }

const GROUPS: Group[] = [
  {
    name: "A — QR Intent",
    defaultCpcEur: 1.2,
    keywords: [
      { text: "qr restaurante", match: "EXACT" },
      { text: "qr restaurante", match: "PHRASE" },
      { text: "qr restaurantes", match: "PHRASE" },
      { text: "codigo qr restaurante", match: "PHRASE" },
      { text: "codigos qr restaurante", match: "PHRASE" },
      { text: "carta qr", match: "PHRASE" },
      { text: "qr carta", match: "PHRASE" },
      { text: "carta qr restaurante", match: "PHRASE" },
      { text: "qr carta restaurante", match: "PHRASE" },
      { text: "codigo qr carta restaurante", match: "PHRASE" },
      { text: "qr menú", match: "PHRASE" },
      { text: "menu qr", match: "PHRASE" },
      { text: "carta digital qr", match: "PHRASE" },
    ],
  },
  {
    name: "B — Carta Digital",
    defaultCpcEur: 1.0,
    keywords: [
      { text: "carta digital", match: "EXACT" },
      { text: "carta digital", match: "PHRASE" },
      { text: "carta digital restaurante", match: "EXACT" },
      { text: "carta digital restaurante", match: "PHRASE" },
      { text: "carta digital para restaurante", match: "PHRASE" },
      { text: "menu digital", match: "PHRASE" },
      { text: "menu digital restaurante", match: "PHRASE" },
      { text: "menu digital para restaurantes", match: "PHRASE" },
      { text: "carta restaurante online", match: "PHRASE" },
    ],
  },
  {
    name: "C — Create Intent",
    defaultCpcEur: 0.9,
    keywords: [
      { text: "crear carta digital", match: "PHRASE" },
      { text: "crear menu digital", match: "PHRASE" },
      { text: "crear menú digital", match: "PHRASE" },
      { text: "hacer menu digital", match: "PHRASE" },
      { text: "hacer un menu digital", match: "PHRASE" },
      { text: "crear menu con codigo qr", match: "PHRASE" },
      { text: "crear un menu digital", match: "PHRASE" },
      { text: "como hacer un menú digital", match: "PHRASE" },
    ],
  },
  {
    name: "D — Verticals",
    defaultCpcEur: 1.0,
    keywords: [
      { text: "carta de vinos digital", match: "PHRASE" },
      { text: "menu sin contacto", match: "PHRASE" },
      { text: "carta sin contacto", match: "PHRASE" },
      { text: "restaurante digital", match: "PHRASE" },
      { text: "qr para restaurantes", match: "PHRASE" },
      { text: "carta restaurante app", match: "PHRASE" },
      { text: "menu pizzeria qr", match: "PHRASE" },
    ],
  },
];

const NEGATIVES = [
  // Free seekers (user policy)
  "gratis", "gratuita", "gratuito", "free",
  // Templates / PDF
  "pdf", "plantilla", "plantillas", "template", "word", "excel",
  // Specific chains / individual places (top noise from research)
  "tierra astur", "vips", "telepizza", "foster's hollywood", "papa john",
  "rodilla", "100 montaditos", "ginos",
  // Fast food consumer
  "mcdonalds", "mcdonald", "mcdo", "burger king", "kfc", "subway",
  "domino", "pizza hut", "starbucks", "dunkin",
  // Cooking content
  "receta", "recetas", "cocinar", "cocinar para",
  // HR
  "empleados", "personal", "trabajo", "contrato", "asalariado",
  // Generic noise
  "menú infantil", "menú niños", "menú degustación",
];

const ADS: Record<string, { headlines: string[]; descriptions: string[] }[]> = {
  "A — QR Intent": [
    {
      headlines: [
        "Carta QR Restaurante",
        "Crea Tu Carta QR",
        "Carta QR en 60 Segundos",
        "Sin Imprimir Cartas",
        "IQ Rest Carta QR",
        "14 Días de Prueba",
        "Sin Tarjeta de Crédito",
        "Fotos AI de Platos",
        "Carta Multilingüe",
        "Setup en 2 Minutos",
        "Actualiza en 1 Tap",
        "Sin App Necesaria",
        "Carta QR Pro",
        "Para Todo Restaurante",
      ],
      descriptions: [
        "Carta QR profesional desde 6,90€/mes. Fotos AI de platos incluidas.",
        "Crea tu carta QR en 60 segundos. Desde 6,90€/mes, 14 días de prueba.",
        "Multilingüe 35 idiomas, pedidos directos. Desde 6,90€/mes.",
        "Todo en un tap desde el móvil. Desde 6,90€ al mes.",
      ],
    },
    {
      headlines: [
        "Carta QR Restaurante",
        "Reemplaza Cartas Papel",
        "Carta QR Multilingüe",
        "Fotos AI de Platos",
        "Pedidos QR Directos",
        "Sin Aplicación",
        "Setup en 60 Sec",
        "Ahorra en Imprenta",
        "Restaurantes España",
        "Carta Digital Pro",
        "Carta QR IQ Rest",
        "Pizzería Bar Restaurante",
        "Sin Comisión Glovo",
        "Actualiza Móvil",
      ],
      descriptions: [
        "Reemplaza cartas papel. Carta QR pro desde 6,90€/mes, fotos AI incluidas.",
        "Clientes escanean y piden directo. Sin comisiones. Desde 6,90€/mes.",
        "Setup en 60 segundos desde el móvil. Desde 6,90€/mes, soporte español.",
        "Carta en 35 idiomas con AI. Desde 6,90€/mes, soporte siempre disponible.",
      ],
    },
    {
      headlines: [
        "QR Carta España",
        "Más Pedidos Menos Imprenta",
        "Carta Móvil Rápida",
        "Setup Gratuito 60 Sec",
        "Web Carta Multilingüe",
        "Carta QR IQ Rest",
        "Pizzería, Bar, Resto",
        "Pedidos Sin Comisiones",
        "Fotos AI Incluidas",
        "Carta Digital Lista",
        "Pruébalo Ahora",
        "Traducido 35 Idiomas",
        "Carta Desde Móvil",
        "Carta Vinos Digital",
      ],
      descriptions: [
        "Carta QR lista en 60 segundos para pizzería, bar, restaurante. Desde 6,90€/mes.",
        "Pedidos directos QR, sin Glovo ni Uber Eats. Desde 6,90€/mes.",
        "35 idiomas para clientes turistas. 14 días gratis, luego 6,90€/mes.",
        "Todo incluido: carta, pedidos, reservas. Desde 6,90€/mes.",
      ],
    },
  ],
  "B — Carta Digital": [
    {
      headlines: [
        "Carta Digital Restaurante",
        "Menu Digital Restaurante",
        "Carta Digital en 60 Sec",
        "IQ Rest Carta Digital",
        "14 Días de Prueba",
        "Sin Tarjeta Necesaria",
        "Fotos AI Incluidas",
        "Multilingüe 35 Idiomas",
        "Actualiza en 1 Tap",
        "Setup en 2 Minutos",
        "Carta Bonita Práctica",
        "Todo Desde Móvil",
        "Para Restaurantes y Bares",
        "Siempre Actualizada",
      ],
      descriptions: [
        "Carta digital pro para tu restaurante. Desde 6,90€/mes, fotos AI incluidas.",
        "Actualiza precios en 1 tap. 14 días de prueba, luego 6,90€/mes.",
        "Traducido a 35 idiomas para turistas. Desde 6,90€/mes.",
        "Todo en uno: carta, pedidos, reservas, web. Desde 6,90€/mes.",
      ],
    },
    {
      headlines: [
        "Menu Digital Restaurante",
        "Carta Online Restaurante",
        "Restaurante Smart",
        "Actualiza 1 Tap",
        "Fotos AI Platos",
        "Carta Multilingüe",
        "Setup en 60 Sec",
        "Pruébalo 14 Días",
        "Sin Imprimir",
        "Ahorra Tiempo y Dinero",
        "Siempre en Línea",
        "Pedidos QR Directos",
        "Sin App Que Descargar",
        "Carta España Pro",
      ],
      descriptions: [
        "Carta menu digital actualiza 1 tap. Desde 6,90€/mes, fotos AI incluidas.",
        "Más pedidos, menos comisión. Desde 6,90€/mes, sin tarjeta para probar.",
        "Setup en 60 segundos, sin app. Desde 6,90€/mes, soporte español.",
        "14 días de prueba sin tarjeta. Luego 6,90€/mes, soporte en español siempre.",
      ],
    },
    {
      headlines: [
        "Restaurante Carta Digital",
        "Reemplazar Cartas Papel",
        "Carta Práctica Rápida",
        "QR Code Incluido",
        "Fotos AI Generadas",
        "Cambia Precios 1 Sec",
        "35 Idiomas Traducidos",
        "14 Días de Prueba",
        "Sin Tarjeta Necesaria",
        "Soporte en Español",
        "Todo Desde Móvil",
        "Setup Pocos Clics",
        "Para Cualquier Local",
        "Carta IQ Rest",
      ],
      descriptions: [
        "Reemplaza cartas impresas con carta digital pro. Desde 6,90€/mes.",
        "Cambia precios en tiempo real desde el móvil.",
        "Multilingüe 35 idiomas automático. Perfecto zonas turísticas.",
        "Setup 60 segundos, 14 días de prueba, soporte en español.",
      ],
    },
  ],
  "C — Create Intent": [
    {
      headlines: [
        "Crea Tu Carta Digital",
        "Crea Carta Restaurante",
        "Setup en 60 Segundos",
        "Carta QR Lista Ya",
        "14 Días de Prueba",
        "Sin Tarjeta Necesaria",
        "Fotos AI de Platos",
        "Multilingüe Incluido",
        "Todo Desde Móvil",
        "Carta Profesional",
        "Crea Carta Online",
        "Carta QR Fácil",
        "Sin App",
        "IQ Rest Carta",
      ],
      descriptions: [
        "Crea tu carta digital en 60 segundos. Desde 6,90€/mes, fotos AI.",
        "Setup guiado en 3 pasos. Lista al instante. Desde 6,90€/mes, 14 días gratis.",
        "Multilingüe 35 idiomas, pedidos directos. Todo desde 6,90€/mes.",
        "14 días sin tarjeta. Luego 6,90€/mes, soporte en español.",
      ],
    },
    {
      headlines: [
        "Como Crear Carta QR",
        "Carta QR en 3 Pasos",
        "Setup Rápido y Fácil",
        "Crea Carta Ahora Mismo",
        "Fotos Platos AI",
        "Multilingüe Auto",
        "Lista en 60 Sec",
        "Sin Saber Programar",
        "Para Restaurante o Bar",
        "Carta Pro",
        "Pruébalo 14 Días",
        "Soporte Español",
        "Carta en Móvil",
        "QR Carta IQ Rest",
      ],
      descriptions: [
        "Crea carta QR pro en 3 pasos simples. Desde 6,90€/mes.",
        "Fotos AI generadas para cada plato. Multilingüe. Desde 6,90€/mes.",
        "Actualiza tiempo real móvil. 14 días de prueba, luego 6,90€/mes.",
        "Setup guiado en español. Soporte ES siempre disponible. Desde 6,90€/mes.",
      ],
    },
    {
      headlines: [
        "Crear Carta QR Code",
        "Menu Digital Fácil",
        "3 Clics y Listo",
        "Fotos AI Auto",
        "Setup en 1 Minuto",
        "Sin App Todo Web",
        "14 Días de Prueba",
        "Sin Costes Iniciales",
        "Carta Lista",
        "Multilingüe 35 Idiomas",
        "QR Carta Pro",
        "Pruébalo Online",
        "Para Cualquier Local",
        "Actualiza Tiempo Real",
      ],
      descriptions: [
        "Crea tu carta QR en 3 clics. Desde 6,90€/mes, fotos AI incluidas.",
        "Sin app que instalar, todo vía web. Actualiza en 1 tap. Desde 6,90€/mes.",
        "14 días de prueba sin tarjeta. Luego 6,90€/mes, soporte en español.",
        "Lista en menos de un minuto. Desde 6,90€/mes, todo incluido.",
      ],
    },
  ],
  "D — Verticals": [
    {
      headlines: [
        "Carta Vinos Digital",
        "Menu Sin Contacto",
        "QR Para Restaurante",
        "Carta Pizzería QR",
        "Fotos AI de Platos",
        "Setup en 60 Sec",
        "14 Días de Prueba",
        "Sin Tarjeta Necesaria",
        "Multilingüe 35 Idi",
        "Carta Pro Restaurante",
        "Actualización Móvil",
        "Tap y Online",
        "IQ Rest QR",
        "Para Cualquier Local",
      ],
      descriptions: [
        "Carta de vinos digital. Setup en 60 segundos. Desde 6,90€/mes.",
        "Menu sin contacto, QR para restaurante. Desde 6,90€/mes, fotos AI.",
        "Multilingüe, fotos AI incluidas. Desde 6,90€/mes, soporte español.",
        "Pedidos directos QR, sin comisiones. Desde 6,90€/mes.",
      ],
    },
    {
      headlines: [
        "Carta de Vinos QR",
        "Menu Sin Contacto",
        "QR Restaurante Pro",
        "Carta Bar Digital",
        "Sin Estrés",
        "Setup Rápido",
        "14 Días Gratis",
        "Sin Tarjeta Necesaria",
        "Multilingüe Auto",
        "Fotos AI Platos",
        "Actualiza Móvil",
        "Carta Restaurante Pro",
        "Cocktail Carta Digital",
        "IQ Rest Locales",
      ],
      descriptions: [
        "Menu sin contacto para restaurante, bar, cafetería. Desde 6,90€/mes.",
        "Setup 60 sec, fotos AI, soporte español. Desde 6,90€/mes.",
        "14 días de prueba sin tarjeta. Luego 6,90€/mes, actualizaciones ilimitadas.",
        "Multilingüe 35 idiomas auto. Desde 6,90€/mes.",
      ],
    },
    {
      headlines: [
        "QR Carta Pizzería",
        "Menu Digital Local",
        "Carta de Vinos QR",
        "Carta Multilingüe",
        "Fotos AI de Platos",
        "Setup en 60 Sec",
        "Sin Tarjeta Necesaria",
        "Pruébalo 14 Días",
        "Lista al Instante",
        "Actualiza en 1 Tap",
        "Carta Smart España",
        "IQ Rest Carta Pro",
        "Cualquier Tipo Local",
        "Todo Desde Móvil",
      ],
      descriptions: [
        "QR carta con fotos AI para pizzería. Desde 6,90€/mes, multilingüe incluido.",
        "Setup 60 sec, sin app. Desde 6,90€/mes, soporte en español.",
        "14 días de prueba sin tarjeta. Desde 6,90€/mes, todo incluido.",
        "Actualiza tiempo real desde móvil. Desde 6,90€/mes, fotos AI.",
      ],
    },
  ],
};

const SITELINKS = [
  { text: "Funcionalidades", desc1: "Todo lo que necesitas", desc2: "en una plataforma", url: `${LANDING_URL}#features` },
  { text: "Cómo Funciona", desc1: "Setup en 60 segundos", desc2: "guiado paso a paso", url: `${LANDING_URL}#how` },
  { text: "Precios", desc1: "Desde 6,90€ al mes", desc2: "14 días de prueba", url: `${LANDING_URL}#pricing` },
  { text: "Preguntas Frecuentes", desc1: "Todas las respuestas", desc2: "que buscas", url: `${LANDING_URL}#faq` },
];

const CALLOUTS = [
  "Setup en 60 segundos",
  "Desde 6,90€/mes",
  "14 días de prueba gratis",
  "Sin tarjeta de crédito",
  "Soporte en español",
  "35 idiomas traducidos",
  "Fotos AI de platos",
  "Todo desde móvil",
];

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const customer = client.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  console.log(`\n${DRY ? "DRY-RUN" : "LIVE"} — Spain campaign\n`);

  const existing = await customer.query(
    `SELECT campaign.id FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (existing.length > 0) {
    console.error(`ABORT — campaign exists`);
    process.exit(1);
  }

  console.log(`[1] Budget €${DAILY_BUDGET_EUR}/day`);
  let budgetResource = "customers/X/dry";
  if (!DRY) {
    const r = await customer.campaignBudgets.create([{
      name: `${CAMPAIGN_NAME} — Budget`,
      amount_micros: Math.round(DAILY_BUDGET_EUR * 1_000_000),
      delivery_method: enums.BudgetDeliveryMethod.STANDARD,
      explicitly_shared: false,
    }]);
    budgetResource = r.results[0].resource_name as string;
  }
  console.log(`  ${budgetResource}`);

  console.log(`\n[2] Campaign`);
  let campaignResource = "customers/X/dry";
  if (!DRY) {
    const r = await customer.campaigns.create([{
      name: CAMPAIGN_NAME,
      status: enums.CampaignStatus.ENABLED,
      advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
      manual_cpc: { enhanced_cpc_enabled: false },
      campaign_budget: budgetResource,
      network_settings: {
        target_google_search: true,
        target_search_network: false,
        target_content_network: false,
        target_partner_search_network: false,
      },
      geo_target_type_setting: {
        positive_geo_target_type: enums.PositiveGeoTargetType.PRESENCE_OR_INTEREST,
        negative_geo_target_type: enums.NegativeGeoTargetType.PRESENCE,
      },
      contains_eu_political_advertising:
        enums.EuPoliticalAdvertisingStatus.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING,
    }]);
    campaignResource = r.results[0].resource_name as string;
  }
  console.log(`  ${campaignResource}`);

  console.log(`\n[3] Geo + lang + ${NEGATIVES.length} negatives`);
  const campaignCriteriaOps: any[] = [
    { campaign: campaignResource, location: { geo_target_constant: SPAIN_GEO } },
    { campaign: campaignResource, language: { language_constant: SPANISH_LANG } },
  ];
  for (const neg of NEGATIVES) {
    campaignCriteriaOps.push({
      campaign: campaignResource,
      negative: true,
      keyword: { text: neg, match_type: enums.KeywordMatchType.PHRASE },
    });
  }
  if (!DRY) await customer.campaignCriteria.create(campaignCriteriaOps);

  for (const group of GROUPS) {
    console.log(`\n[4] Ad group "${group.name}" (default €${group.defaultCpcEur})`);
    let adGroupResource = "customers/X/dry";
    if (!DRY) {
      const r = await customer.adGroups.create([{
        campaign: campaignResource,
        name: group.name,
        status: enums.AdGroupStatus.ENABLED,
        type: enums.AdGroupType.SEARCH_STANDARD,
        cpc_bid_micros: Math.round(group.defaultCpcEur * 1_000_000),
      }]);
      adGroupResource = r.results[0].resource_name as string;
    }

    const kwOps: any[] = [];
    for (const kw of group.keywords) {
      const bidMicros = bidMicrosForKeyword(kw.text, group.defaultCpcEur);
      const eur = bidMicros / 1_000_000;
      console.log(`  + "${kw.text}" [${kw.match}] €${eur.toFixed(2)}`);
      kwOps.push({
        ad_group: adGroupResource,
        status: enums.AdGroupCriterionStatus.ENABLED,
        cpc_bid_micros: bidMicros,
        keyword: {
          text: kw.text,
          match_type:
            kw.match === "EXACT" ? enums.KeywordMatchType.EXACT
            : kw.match === "PHRASE" ? enums.KeywordMatchType.PHRASE
            : enums.KeywordMatchType.BROAD,
        },
      });
    }
    if (!DRY) await customer.adGroupCriteria.create(kwOps);

    const rsas = ADS[group.name];
    const adOps = rsas.map((ad) => ({
      ad_group: adGroupResource,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: [LANDING_URL],
        responsive_search_ad: {
          headlines: [
            { text: ad.headlines[0].slice(0, 30) },
            { text: PRICE_HEADLINE.slice(0, 30), pinned_field: enums.ServedAssetFieldType.HEADLINE_2 },
            ...ad.headlines.slice(1).map((h) => ({ text: h.slice(0, 30) })),
          ].slice(0, 15),
          descriptions: ad.descriptions.slice(0, 4).map((d) => ({ text: d.slice(0, 90) })),
          path1: PATH1.slice(0, 15),
          path2: PATH2.slice(0, 15),
        },
      },
    }));
    if (!DRY) await customer.adGroupAds.create(adOps);
    console.log(`  + ${adOps.length} RSAs with "${PRICE_HEADLINE}" pinned`);
  }

  console.log(`\n[5] ${SITELINKS.length} sitelinks + ${CALLOUTS.length} callouts`);
  if (!DRY) {
    const slRes = await customer.assets.create(
      SITELINKS.map((s) => ({
        sitelink_asset: {
          link_text: s.text.slice(0, 25),
          description1: s.desc1.slice(0, 35),
          description2: s.desc2.slice(0, 35),
        },
        final_urls: [s.url],
      })),
    );
    await customer.campaignAssets.create(
      slRes.results.map((r: any) => ({
        campaign: campaignResource,
        asset: r.resource_name,
        field_type: enums.AssetFieldType.SITELINK,
      })),
    );
    const coRes = await customer.assets.create(CALLOUTS.map((c) => ({ callout_asset: { callout_text: c.slice(0, 25) } })));
    await customer.campaignAssets.create(
      coRes.results.map((r: any) => ({
        campaign: campaignResource,
        asset: r.resource_name,
        field_type: enums.AssetFieldType.CALLOUT,
      })),
    );
  }

  console.log(`\n✓ Done. ${DRY ? "DRY" : "LIVE"} — campaign "${CAMPAIGN_NAME}"`);
  console.log(`  https://ads.google.com/aw/campaigns?ocid=${process.env.GOOGLE_ADS_CUSTOMER_ID}`);
}

main().catch((e) => {
  console.error("FAILED:", e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
