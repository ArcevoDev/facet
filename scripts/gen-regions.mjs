/**
 * Generator: expands DEFAULT_REGIONS for EVERY country using the dr5hn
 * countries-states-cities-database (ODbL).
 *
 * Reads the vendored snapshot at scripts/data/countries-states.json and
 * maps each country name to its ISO alpha-2 code (from the existing
 * DEFAULT_COUNTRIES in location-data.ts, falling back to a manual map for
 * names the dataset uses differently).
 *
 * Run: node scripts/gen-regions.mjs > /tmp/regions.txt
 * Then splice the output into packages/components/src/ui/location-data.ts
 * replacing the DEFAULT_REGIONS body.
 */

import fs from "node:fs";
import path from "node:path";

const SNAPSHOT = path.join(process.cwd(), "scripts/data/countries-states.json");
const LOCATION_DATA = path.join(
  process.cwd(),
  "packages/components/src/ui/location-data.ts",
);

/** Country name (as the dataset spells it) -> ISO alpha-2 code. */
const EXTRA_NAME_TO_CODE = {
  "United States": "US",
  "United Kingdom": "GB",
  "South Korea": "KR",
  "DR Congo": "CD",
  "Congo": "CG",
  "Ivory Coast": "CI",
  "Vietnam": "VN",
  "Taiwan": "TW",
  "Syria": "SY",
  "North Korea": "KP",
  "Laos": "LA",
  "Brunei": "BN",
  "East Timor": "TL",
  "Fiji Islands": "FJ",
  "Palestinian Territory Occupied": "PS",
  "Hong Kong S.A.R.": "HK",
  "Macau S.A.R.": "MO",
  "Man (Isle of)": "IM",
  "Réunion": "RE",
  "Guadeloupe": "GP",
  "Martinique": "MQ",
  "French Guiana": "GF",
  "Mayotte": "YT",
  "Curaçao": "CW",
  "Saint Martin": "MF",
  "Bonaire, Sint Eustatius and Saba": "BQ",
  "Sint Maarten": "SX",
  "Kosovo": "XK",
  "Aland Islands": "AX",
  "Faroe Islands": "FO",
  "Greenland": "GL",
  "Falkland Islands": "FK",
  "Pitcairn Island": "PN",
  "Tokelau": "TK",
  "Cook Islands": "CK",
  "Niue": "NU",
  "New Caledonia": "NC",
  "French Polynesia": "PF",
  "Wallis and Futuna": "WF",
  "American Samoa": "AS",
  "Guam": "GU",
  "Northern Mariana Islands": "MP",
  "Puerto Rico": "PR",
  "U.S. Virgin Islands": "VI",
  "British Virgin Islands": "VG",
  "Turks and Caicos Islands": "TC",
  "Cayman Islands": "KY",
  "Bermuda": "BM",
  "Bahamas": "BS",
  "Barbados": "BB",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  "Grenada": "GD",
  "Antigua and Barbuda": "AG",
  "Dominica": "DM",
  "Saint Kitts and Nevis": "KN",
  "Montserrat": "MS",
  "Anguilla": "AI",
  "Aruba": "AW",
  "Jersey": "JE",
  "Guernsey": "GG",
  "Gibraltar": "GI",
  "Isle of Man": "IM",
  "Vatican City": "VA",
  "Monaco": "MC",
  "San Marino": "SM",
  "Andorra": "AD",
  "Liechtenstein": "LI",
  "Luxembourg": "LU",
  "Malta": "MT",
  "Cyprus": "CY",
  "Iceland": "IS",
  "Moldova": "MD",
  "North Macedonia": "MK",
  "Montenegro": "ME",
  "Bosnia and Herzegovina": "BA",
  "Slovenia": "SI",
  "Croatia": "HR",
  "Serbia": "RS",
  "Albania": "AL",
  "Belarus": "BY",
  "Ukraine": "UA",
  "Georgia": "GE",
  "Armenia": "AM",
  "Azerbaijan": "AZ",
  "Kazakhstan": "KZ",
  "Uzbekistan": "UZ",
  "Turkmenistan": "TM",
  "Kyrgyzstan": "KG",
  "Tajikistan": "TJ",
  "Mongolia": "MN",
  "Nepal": "NP",
  "Bhutan": "BT",
  "Sri Lanka": "LK",
  "Maldives": "MV",
  "Myanmar": "MM",
  "Cambodia": "KH",
  "Papua New Guinea": "PG",
  "Solomon Islands": "SB",
  "Vanuatu": "VU",
  "Samoa": "WS",
  "Tonga": "TO",
  "Kiribati": "KI",
  "Marshall Islands": "MH",
  "Micronesia": "FM",
  "Palau": "PW",
  "Nauru": "NR",
  "Tuvalu": "TV",
  "Honduras": "HN",
  "El Salvador": "SV",
  "Belize": "BZ",
  "Panama": "PA",
  "Costa Rica": "CR",
  "Nicaragua": "NI",
  "Guatemala": "GT",
  "Cuba": "CU",
  "Jamaica": "JM",
  "Haiti": "HT",
  "Dominican Republic": "DO",
  "Trinidad and Tobago": "TT",
  "Guyana": "GY",
  "Suriname": "SR",
  "Uruguay": "UY",
  "Paraguay": "PY",
  "Bolivia": "BO",
  "Ecuador": "EC",
  "Peru": "PE",
  "Chile": "CL",
  "Colombia": "CO",
  "Venezuela": "VE",
  "Morocco": "MA",
  "Algeria": "DZ",
  "Tunisia": "TN",
  "Libya": "LY",
  "Sudan": "SD",
  "South Sudan": "SS",
  "Mauritania": "MR",
  "Senegal": "SN",
  "Gambia": "GM",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Sierra Leone": "SL",
  "Liberia": "LR",
  "Mali": "ML",
  "Burkina Faso": "BF",
  "Niger": "NE",
  "Chad": "TD",
  "Central African Republic": "CF",
  "Gabon": "GA",
  "Equatorial Guinea": "GQ",
  "São Tomé and Príncipe": "ST",
  "Cameroon": "CM",
  "Nigeria": "NG",
  "Benin": "BJ",
  "Togo": "TG",
  "Ghana": "GH",
  "Côte d'Ivoire": "CI",
  "Burundi": "BI",
  "Rwanda": "RW",
  "Uganda": "UG",
  "Kenya": "KE",
  "Tanzania": "TZ",
  "Ethiopia": "ET",
  "Somalia": "SO",
  "Djibouti": "DJ",
  "Eritrea": "ER",
  "Mozambique": "MZ",
  "Zambia": "ZM",
  "Zimbabwe": "ZW",
  "Malawi": "MW",
  "Botswana": "BW",
  "Namibia": "NA",
  "South Africa": "ZA",
  "Lesotho": "LS",
  "Eswatini": "SZ",
  "Madagascar": "MG",
  "Mauritius": "MU",
  "Seychelles": "SC",
  "Comoros": "KM",
  "Cabo Verde": "CV",
};

/** Build name->code from location-data.ts DEFAULT_COUNTRIES, then extras. */
function buildNameToCode() {
  const src = fs.readFileSync(LOCATION_DATA, "utf8");
  const m = src.match(/DEFAULT_COUNTRIES: Country\[\] = \[([\s\S]*?)\n\];/);
  const map = { ...EXTRA_NAME_TO_CODE };
  if (m) {
    for (const [, code, name] of m[1].matchAll(/\{ code: "([A-Z]{2})", name: "([^"]+)" \}/g)) {
      map[name] = code;
    }
  }
  return map;
}

const kebab = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function main() {
  const raw = fs.readFileSync(SNAPSHOT, "utf8");
  const data = JSON.parse(raw);
  const nameToCode = buildNameToCode();

  const out = [];
  for (const entry of data) {
    const code = nameToCode[entry.name];
    if (!code) continue;
    const states = (entry.states || []).map((name) => ({ id: kebab(name), name }));
    // Skip empty-state countries (tiny territories, no subdivisions).
    if (states.length === 0) continue;
    out.push({ code, states });
  }

  out.sort((a, b) => a.code.localeCompare(b.code));

  console.log(
    `// Generated from dr5hn countries-states-cities-database (ODbL) via scripts/gen-regions.mjs\n` +
      `// ${out.length} countries, ${out.reduce((n, c) => n + c.states.length, 0)} states total\n`,
  );
  for (const { code, states } of out) {
    console.log(`  ${code}: [`);
    for (const s of states) {
      console.log(`    { id: ${JSON.stringify(s.id)}, name: ${JSON.stringify(s.name)} },`);
    }
    console.log("  ],");
  }
}

main();
