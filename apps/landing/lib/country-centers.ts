// Map of locale codes to country center coordinates
// Used as fallback when restaurant location is not set

interface CountryCenter {
  lat: number;
  lng: number;
  zoom: number;
}

// World center (Atlantic Ocean)
export const WORLD_CENTER: CountryCenter = {
  lat: 20,
  lng: 0,
  zoom: 2,
};

// Country centers by locale code
export const COUNTRY_CENTERS: Record<string, CountryCenter> = {
  en: { lat: 51.5074, lng: -0.1278, zoom: 5 }, // UK (London)
  es: { lat: 40.4168, lng: -3.7038, zoom: 5 }, // Spain (Madrid)
  de: { lat: 52.52, lng: 13.405, zoom: 5 }, // Germany (Berlin)
  fr: { lat: 48.8566, lng: 2.3522, zoom: 5 }, // France (Paris)
  it: { lat: 41.9028, lng: 12.4964, zoom: 5 }, // Italy (Rome)
  pt: { lat: 38.7223, lng: -9.1393, zoom: 5 }, // Portugal (Lisbon)
  nl: { lat: 52.3676, lng: 4.9041, zoom: 6 }, // Netherlands (Amsterdam)
  pl: { lat: 52.2297, lng: 21.0122, zoom: 5 }, // Poland (Warsaw)
  ru: { lat: 55.7558, lng: 37.6173, zoom: 4 }, // Russia (Moscow)
  uk: { lat: 50.4501, lng: 30.5234, zoom: 5 }, // Ukraine (Kyiv)
  tr: { lat: 41.0082, lng: 28.9784, zoom: 5 }, // Turkey (Istanbul)
  ar: { lat: 24.7136, lng: 46.6753, zoom: 5 }, // Saudi Arabia (Riyadh)
  fa: { lat: 35.6892, lng: 51.389, zoom: 5 }, // Iran (Tehran)
  zh: { lat: 39.9042, lng: 116.4074, zoom: 4 }, // China (Beijing)
  ja: { lat: 35.6762, lng: 139.6503, zoom: 5 }, // Japan (Tokyo)
  ko: { lat: 37.5665, lng: 126.978, zoom: 6 }, // South Korea (Seoul)
  el: { lat: 37.9838, lng: 23.7275, zoom: 6 }, // Greece (Athens)
  bg: { lat: 42.6977, lng: 23.3219, zoom: 6 }, // Bulgaria (Sofia)
  ro: { lat: 44.4268, lng: 26.1025, zoom: 6 }, // Romania (Bucharest)
  hu: { lat: 47.4979, lng: 19.0402, zoom: 6 }, // Hungary (Budapest)
  cs: { lat: 50.0755, lng: 14.4378, zoom: 6 }, // Czech Republic (Prague)
  sk: { lat: 48.1486, lng: 17.1077, zoom: 6 }, // Slovakia (Bratislava)
  sl: { lat: 46.0569, lng: 14.5058, zoom: 7 }, // Slovenia (Ljubljana)
  hr: { lat: 45.815, lng: 15.9819, zoom: 6 }, // Croatia (Zagreb)
  sr: { lat: 44.7866, lng: 20.4489, zoom: 6 }, // Serbia (Belgrade)
  sv: { lat: 59.3293, lng: 18.0686, zoom: 5 }, // Sweden (Stockholm)
  no: { lat: 59.9139, lng: 10.7522, zoom: 5 }, // Norway (Oslo)
  da: { lat: 55.6761, lng: 12.5683, zoom: 6 }, // Denmark (Copenhagen)
  fi: { lat: 60.1699, lng: 24.9384, zoom: 5 }, // Finland (Helsinki)
  et: { lat: 59.437, lng: 24.7536, zoom: 6 }, // Estonia (Tallinn)
  lv: { lat: 56.9496, lng: 24.1052, zoom: 6 }, // Latvia (Riga)
  lt: { lat: 54.6872, lng: 25.2797, zoom: 6 }, // Lithuania (Vilnius)
  is: { lat: 64.1466, lng: -21.9426, zoom: 5 }, // Iceland (Reykjavik)
  ga: { lat: 53.3498, lng: -6.2603, zoom: 6 }, // Ireland (Dublin)
  ca: { lat: 41.3851, lng: 2.1734, zoom: 6 }, // Catalonia (Barcelona)
};

export function getCountryCenter(locale: string): CountryCenter {
  return COUNTRY_CENTERS[locale] || WORLD_CENTER;
}
