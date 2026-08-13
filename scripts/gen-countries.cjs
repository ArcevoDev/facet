// Expands DEFAULT_COUNTRIES to cover every country that has regions in
// DEFAULT_REGIONS. Reads the dr5hn snapshot (name per ISO code) and the
// current DEFAULT_REGIONS keys, and prints the country entries.
const fs = require("fs");

const snap = JSON.parse(fs.readFileSync("scripts/data/countries-states.json", "utf8"));
const data = fs.readFileSync("packages/components/src/ui/location-data.ts", "utf8");

const ri = data.indexOf("export const DEFAULT_REGIONS");
const rj = data.indexOf("export const DEFAULT_LOCALITIES");
const regs = data.slice(ri, rj);
const regionCodes = [...regs.matchAll(/^\s{2}([A-Z]{2}): \[/gm)].map((m) => m[1]);

// Complete country-name -> ISO code map for every region we ship.
const NAME_TO_CODE = {
  "United Arab Emirates": "AE", "Antigua and Barbuda": "AG", "Anguilla": "AI",
  "Albania": "AL", "Armenia": "AM", "Angola": "AO", "American Samoa": "AS",
  "Australia": "AU", "Aruba": "AW", "Aland Islands": "AX", "Azerbaijan": "AZ",
  "Bosnia and Herzegovina": "BA", "Barbados": "BB", "Bangladesh": "BD",
  "Burkina Faso": "BF", "Bulgaria": "BG", "Bahrain": "BH", "Burundi": "BI",
  "Benin": "BJ", "Bermuda": "BM", "Brunei": "BN", "Bolivia": "BO",
  "Bonaire, Sint Eustatius and Saba": "BQ", "Brazil": "BR", "Bahamas": "BS",
  "Bhutan": "BT", "Botswana": "BW", "Belarus": "BY", "Belize": "BZ",
  "Canada": "CA", "DR Congo": "CD", "Central African Republic": "CF",
  "Congo": "CG", "Switzerland": "CH", "Ivory Coast": "CI", "Chile": "CL",
  "Cameroon": "CM", "China": "CN", "Colombia": "CO", "Costa Rica": "CR",
  "Cuba": "CU", "Cabo Verde": "CV", "Curaçao": "CW", "Cyprus": "CY",
  "Germany": "DE", "Djibouti": "DJ", "Denmark": "DK", "Dominica": "DM",
  "Dominican Republic": "DO", "Algeria": "DZ", "Ecuador": "EC",
  "Egypt": "EG", "Eritrea": "ER", "Ethiopia": "ET", "Fiji Islands": "FJ",
  "Micronesia": "FM", "Faroe Islands": "FO", "France": "FR",
  "Gabon": "GA", "United Kingdom": "GB", "Grenada": "GD", "Georgia": "GE",
  "French Guiana": "GF", "Guernsey": "GG", "Ghana": "GH", "Greenland": "GL",
  "Gambia": "GM", "Guinea": "GN", "Equatorial Guinea": "GQ",
  "Greece": "GR", "Guatemala": "GT", "Guam": "GU", "Guinea-Bissau": "GW",
  "Guyana": "GY", "Hong Kong S.A.R.": "HK", "Honduras": "HN",
  "Croatia": "HR", "Haiti": "HT", "Hungary": "HU", "Indonesia": "ID",
  "Ireland": "IE", "Israel": "IL", "India": "IN", "Iraq": "IQ",
  "Iran": "IR", "Iceland": "IS", "Italy": "IT", "Jamaica": "JM",
  "Jordan": "JO", "Japan": "JP", "Kenya": "KE", "Kyrgyzstan": "KG",
  "Cambodia": "KH", "Kiribati": "KI", "Comoros": "KM",
  "Saint Kitts and Nevis": "KN", "North Korea": "KP", "South Korea": "KR",
  "Kosovo": "XK", "Kuwait": "KW", "Cayman Islands": "KY",
  "Kazakhstan": "KZ", "Laos": "LA", "Lebanon": "LB",
  "Saint Lucia": "LC", "Liechtenstein": "LI", "Sri Lanka": "LK",
  "Liberia": "LR", "Lesotho": "LS", "Lithuania": "LT",
  "Luxembourg": "LU", "Latvia": "LV", "Libya": "LY", "Morocco": "MA",
  "Monaco": "MC", "Moldova": "MD", "Montenegro": "ME",
  "Madagascar": "MG", "Marshall Islands": "MH", "North Macedonia": "MK",
  "Mali": "ML", "Myanmar": "MM", "Mongolia": "MN", "Macau S.A.R.": "MO",
  "Mauritania": "MR", "Montserrat": "MS", "Malta": "MT",
  "Mauritius": "MU", "Maldives": "MV", "Malawi": "MW", "Mexico": "MX",
  "Malaysia": "MY", "Mozambique": "MZ", "Namibia": "NA",
  "New Caledonia": "NC", "Niger": "NE", "Nigeria": "NG", "Nicaragua": "NI",
  "Netherlands": "NL", "Norway": "NO", "Nepal": "NP", "Nauru": "NR",
  "Niue": "NU", "New Zealand": "NZ", "Oman": "OM", "Panama": "PA",
  "Peru": "PE", "Papua New Guinea": "PG", "Philippines": "PH",
  "Pakistan": "PK", "Poland": "PL", "Puerto Rico": "PR",
  "Palestinian Territory Occupied": "PS", "Portugal": "PT", "Palau": "PW",
  "Paraguay": "PY", "Qatar": "QA", "Romania": "RO", "Serbia": "RS",
  "Russia": "RU", "Rwanda": "RW", "Saudi Arabia": "SA",
  "Solomon Islands": "SB", "Seychelles": "SC", "Sudan": "SD",
  "Sweden": "SE", "Singapore": "SG", "Slovenia": "SI", "Slovakia": "SK",
  "Sierra Leone": "SL", "San Marino": "SM", "Senegal": "SN",
  "Somalia": "SO", "Suriname": "SR", "South Sudan": "SS",
  "São Tomé and Príncipe": "ST", "El Salvador": "SV", "Sint Maarten": "SX",
  "Syria": "SY", "Eswatini": "SZ", "Turks and Caicos Islands": "TC",
  "Chad": "TD", "Togo": "TG", "Thailand": "TH", "Tajikistan": "TJ",
  "Turkmenistan": "TM", "Tunisia": "TN", "Tonga": "TO", "Turkey": "TR",
  "Trinidad and Tobago": "TT", "Tuvalu": "TV", "Taiwan": "TW",
  "Tanzania": "TZ", "Ukraine": "UA", "Uganda": "UG", "United States": "US",
  "Uruguay": "UY", "Uzbekistan": "UZ", "Saint Vincent and the Grenadines": "VC",
  "Venezuela": "VE", "British Virgin Islands": "VG", "Vietnam": "VN",
  "Vanuatu": "VU", "Samoa": "WS", "Kosovo": "XK", "Mayotte": "YT",
  "South Africa": "ZA", "Zambia": "ZM", "Zimbabwe": "ZW",
  "Guadeloupe": "GP", "Man (Isle of)": "IM", "Jersey": "JE",
  "Martinique": "MQ", "French Polynesia": "PF",
};

// Snapshot name -> code (invert the map above).
const snapNameToCode = {};
for (const [name, code] of Object.entries(NAME_TO_CODE)) {
  snapNameToCode[name] = code;
}

// Build code -> display name from the snapshot, falling back to the map.
const codeToName = {};
for (const entry of snap) {
  const code = snapNameToCode[entry.name];
  if (code && !codeToName[code]) codeToName[code] = entry.name;
}

const out = [];
for (const code of regionCodes) {
  const name = codeToName[code] || code;
  out.push({ code, name });
}
out.sort((a, b) => a.code.localeCompare(b.code));

console.log(`// ${out.length} countries`);
for (const { code, name } of out) {
  console.log(`  { code: "${code}", name: "${name}" },`);
}
