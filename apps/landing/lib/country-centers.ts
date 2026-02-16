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

// Country code (ISO 3166-1 alpha-2) → capital coordinates
// Used for default restaurant location based on Cloudflare geo_country
export const COUNTRY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Europe
  GB: { lat: 51.5074, lng: -0.1278 },   // London
  IE: { lat: 53.3498, lng: -6.2603 },   // Dublin
  ES: { lat: 40.4168, lng: -3.7038 },   // Madrid
  PT: { lat: 38.7223, lng: -9.1393 },   // Lisbon
  FR: { lat: 48.8566, lng: 2.3522 },    // Paris
  DE: { lat: 52.52, lng: 13.405 },      // Berlin
  AT: { lat: 48.2082, lng: 16.3738 },   // Vienna
  CH: { lat: 46.9481, lng: 7.4474 },    // Bern
  IT: { lat: 41.9028, lng: 12.4964 },   // Rome
  NL: { lat: 52.3676, lng: 4.9041 },    // Amsterdam
  BE: { lat: 50.8503, lng: 4.3517 },    // Brussels
  LU: { lat: 49.6116, lng: 6.1319 },    // Luxembourg
  PL: { lat: 52.2297, lng: 21.0122 },   // Warsaw
  CZ: { lat: 50.0755, lng: 14.4378 },   // Prague
  SK: { lat: 48.1486, lng: 17.1077 },   // Bratislava
  HU: { lat: 47.4979, lng: 19.0402 },   // Budapest
  RO: { lat: 44.4268, lng: 26.1025 },   // Bucharest
  BG: { lat: 42.6977, lng: 23.3219 },   // Sofia
  HR: { lat: 45.815, lng: 15.9819 },    // Zagreb
  SI: { lat: 46.0569, lng: 14.5058 },   // Ljubljana
  RS: { lat: 44.7866, lng: 20.4489 },   // Belgrade
  BA: { lat: 43.8563, lng: 18.4131 },   // Sarajevo
  ME: { lat: 42.4304, lng: 19.2594 },   // Podgorica
  AL: { lat: 41.3275, lng: 19.8187 },   // Tirana
  MK: { lat: 41.9973, lng: 21.428 },    // Skopje
  GR: { lat: 37.9838, lng: 23.7275 },   // Athens
  CY: { lat: 35.1856, lng: 33.3823 },   // Nicosia
  TR: { lat: 41.0082, lng: 28.9784 },   // Istanbul
  SE: { lat: 59.3293, lng: 18.0686 },   // Stockholm
  NO: { lat: 59.9139, lng: 10.7522 },   // Oslo
  DK: { lat: 55.6761, lng: 12.5683 },   // Copenhagen
  FI: { lat: 60.1699, lng: 24.9384 },   // Helsinki
  EE: { lat: 59.437, lng: 24.7536 },    // Tallinn
  LV: { lat: 56.9496, lng: 24.1052 },   // Riga
  LT: { lat: 54.6872, lng: 25.2797 },   // Vilnius
  IS: { lat: 64.1466, lng: -21.9426 },  // Reykjavik
  MT: { lat: 35.8997, lng: 14.5147 },   // Valletta
  AD: { lat: 42.5063, lng: 1.5218 },    // Andorra la Vella
  MC: { lat: 43.7384, lng: 7.4246 },    // Monaco
  SM: { lat: 43.9424, lng: 12.4578 },   // San Marino
  LI: { lat: 47.166, lng: 9.5554 },     // Vaduz
  UA: { lat: 50.4501, lng: 30.5234 },   // Kyiv
  MD: { lat: 47.0105, lng: 28.8638 },   // Chisinau
  BY: { lat: 53.9045, lng: 27.5615 },   // Minsk
  RU: { lat: 55.7558, lng: 37.6173 },   // Moscow

  // North America
  US: { lat: 38.9072, lng: -77.0369 },  // Washington DC
  CA: { lat: 45.4215, lng: -75.6972 },  // Ottawa

  // Latin America
  MX: { lat: 19.4326, lng: -99.1332 },  // Mexico City
  GT: { lat: 14.6349, lng: -90.5069 },  // Guatemala City
  HN: { lat: 14.072, lng: -87.1921 },   // Tegucigalpa
  SV: { lat: 13.6929, lng: -89.2182 },  // San Salvador
  NI: { lat: 12.1364, lng: -86.2514 },  // Managua
  CR: { lat: 9.9281, lng: -84.0907 },   // San Jose
  PA: { lat: 8.9824, lng: -79.5199 },   // Panama City
  CU: { lat: 23.1136, lng: -82.3666 },  // Havana
  DO: { lat: 18.4861, lng: -69.9312 },  // Santo Domingo
  PR: { lat: 18.4655, lng: -66.1057 },  // San Juan
  CO: { lat: 4.711, lng: -74.0721 },    // Bogota
  VE: { lat: 10.4806, lng: -66.9036 },  // Caracas
  EC: { lat: -0.1807, lng: -78.4678 },  // Quito
  PE: { lat: -12.0464, lng: -77.0428 }, // Lima
  BO: { lat: -16.4897, lng: -68.1193 }, // La Paz
  CL: { lat: -33.4489, lng: -70.6693 }, // Santiago
  AR: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
  UY: { lat: -34.9011, lng: -56.1645 }, // Montevideo
  PY: { lat: -25.2637, lng: -57.5759 }, // Asuncion
  BR: { lat: -15.7975, lng: -47.8919 }, // Brasilia
  GQ: { lat: 3.75, lng: 8.7833 },       // Malabo

  // Africa
  ZA: { lat: -25.7479, lng: 28.2293 },  // Pretoria
  NG: { lat: 9.0765, lng: 7.3986 },     // Abuja
  KE: { lat: -1.2921, lng: 36.8219 },   // Nairobi
  GH: { lat: 5.6037, lng: -0.187 },     // Accra
  SN: { lat: 14.7167, lng: -17.4677 },  // Dakar
  CI: { lat: 6.8276, lng: -5.2893 },    // Yamoussoukro
  CM: { lat: 3.848, lng: 11.5021 },     // Yaounde
  MA: { lat: 33.9716, lng: -6.8498 },   // Rabat
  DZ: { lat: 36.7538, lng: 3.0588 },    // Algiers
  TN: { lat: 36.8065, lng: 10.1815 },   // Tunis
  EG: { lat: 30.0444, lng: 31.2357 },   // Cairo
  ET: { lat: 9.0249, lng: 38.7469 },    // Addis Ababa
  TZ: { lat: -6.7924, lng: 39.2083 },   // Dar es Salaam
  UG: { lat: 0.3476, lng: 32.5825 },    // Kampala
  RW: { lat: -1.9403, lng: 29.8739 },   // Kigali
  MG: { lat: -18.8792, lng: 47.5079 },  // Antananarivo
  AO: { lat: -8.839, lng: 13.2894 },    // Luanda
  MZ: { lat: -25.9692, lng: 32.5732 },  // Maputo
  CD: { lat: -4.4419, lng: 15.2663 },   // Kinshasa
  SD: { lat: 15.5007, lng: 32.5599 },   // Khartoum
  LY: { lat: 32.8872, lng: 13.1913 },   // Tripoli

  // Middle East
  SA: { lat: 24.7136, lng: 46.6753 },   // Riyadh
  AE: { lat: 24.4539, lng: 54.3773 },   // Abu Dhabi
  QA: { lat: 25.2854, lng: 51.531 },    // Doha
  KW: { lat: 29.3759, lng: 47.9774 },   // Kuwait City
  BH: { lat: 26.0667, lng: 50.5577 },   // Manama
  OM: { lat: 23.588, lng: 58.3829 },    // Muscat
  JO: { lat: 31.9454, lng: 35.9284 },   // Amman
  LB: { lat: 33.8938, lng: 35.5018 },   // Beirut
  IQ: { lat: 33.3152, lng: 44.3661 },   // Baghdad
  IR: { lat: 35.6892, lng: 51.389 },    // Tehran
  IL: { lat: 31.7683, lng: 35.2137 },   // Jerusalem

  // Asia & Oceania
  IN: { lat: 28.6139, lng: 77.209 },    // New Delhi
  PK: { lat: 33.6844, lng: 73.0479 },   // Islamabad
  CN: { lat: 39.9042, lng: 116.4074 },  // Beijing
  JP: { lat: 35.6762, lng: 139.6503 },  // Tokyo
  KR: { lat: 37.5665, lng: 126.978 },   // Seoul
  SG: { lat: 1.3521, lng: 103.8198 },   // Singapore
  MY: { lat: 3.139, lng: 101.6869 },    // Kuala Lumpur
  PH: { lat: 14.5995, lng: 120.9842 },  // Manila
  TH: { lat: 13.7563, lng: 100.5018 },  // Bangkok
  VN: { lat: 21.0278, lng: 105.8342 },  // Hanoi
  ID: { lat: -6.2088, lng: 106.8456 },  // Jakarta
  AU: { lat: -35.2809, lng: 149.13 },   // Canberra
  NZ: { lat: -41.2924, lng: 174.7787 }, // Wellington
  KZ: { lat: 51.1694, lng: 71.4491 },   // Astana
  UZ: { lat: 41.2995, lng: 69.2401 },   // Tashkent
  GE: { lat: 41.7151, lng: 44.8271 },   // Tbilisi
  AM: { lat: 40.1872, lng: 44.5152 },   // Yerevan
  AZ: { lat: 40.4093, lng: 49.8671 },   // Baku
};

export function getCoordinatesByCountry(countryCode: string | null): { lat: number; lng: number } | null {
  if (!countryCode) return null;
  return COUNTRY_COORDINATES[countryCode.toUpperCase()] || null;
}
