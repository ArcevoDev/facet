/**
 * LocationPicker: cascading Country → State/Region → LGA/Locality
 * selects. Ships with a bundled static dataset (no network), and
 * supports async `loadRegions`/`loadLocalities` for real APIs.
 *
 * Usage:
 *   <LocationPicker
 *     value={location}
 *     onValueChange={setLocation}
 *     showLocality
 *   />
 *
 * Standalone levels:
 *   <CountryInput value={c} onValueChange={setC} />
 *   <StateInput country="NG" value={s} onValueChange={setS} />
 *   <LGAInput country="NG" region="lagos" value={l} onValueChange={setL} />
 */

import * as React from "react";
import { cn } from "../utils.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select.js";

/* ── Data ──────────────────────────────────────────────────── */

export interface Country {
  /** ISO alpha-2 country code. */
  code: string;
  name: string;
}

export interface Region {
  /** Region/state id within the country. */
  id: string;
  name: string;
}

export interface Locality {
  /** Locality/LGA id within the region. */
  id: string;
  name: string;
}

/**
 * Bundled static dataset — every African country plus the major
 * non-African markets. Locality (LGA) data is illustrative; swap in
 * your own via the async props for production.
 */
export const DEFAULT_COUNTRIES: Country[] = [
  /* Africa (all 54) */
  { code: "DZ", name: "Algeria" },
  { code: "AO", name: "Angola" },
  { code: "BJ", name: "Benin" },
  { code: "BW", name: "Botswana" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "CM", name: "Cameroon" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "DR Congo" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "DJ", name: "Djibouti" },
  { code: "EG", name: "Egypt" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GH", name: "Ghana" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "KE", name: "Kenya" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "ML", name: "Mali" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "NA", name: "Namibia" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "RW", name: "Rwanda" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "SN", name: "Senegal" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" },
  { code: "SD", name: "Sudan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TG", name: "Togo" },
  { code: "TN", name: "Tunisia" },
  { code: "UG", name: "Uganda" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  /* Rest of the world */
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
];

export const DEFAULT_REGIONS: Record<string, Region[]> = {
  /* Nigeria — all 36 states + FCT */
  NG: [
    { id: "abia", name: "Abia" },
    { id: "adamawa", name: "Adamawa" },
    { id: "akwa-ibom", name: "Akwa Ibom" },
    { id: "anambra", name: "Anambra" },
    { id: "bauchi", name: "Bauchi" },
    { id: "bayelsa", name: "Bayelsa" },
    { id: "benue", name: "Benue" },
    { id: "borno", name: "Borno" },
    { id: "cross-river", name: "Cross River" },
    { id: "delta", name: "Delta" },
    { id: "ebonyi", name: "Ebonyi" },
    { id: "edo", name: "Edo" },
    { id: "ekiti", name: "Ekiti" },
    { id: "enugu", name: "Enugu" },
    { id: "gombe", name: "Gombe" },
    { id: "imo", name: "Imo" },
    { id: "jigawa", name: "Jigawa" },
    { id: "kaduna", name: "Kaduna" },
    { id: "kano", name: "Kano" },
    { id: "katsina", name: "Katsina" },
    { id: "kebbi", name: "Kebbi" },
    { id: "kogi", name: "Kogi" },
    { id: "kwara", name: "Kwara" },
    { id: "lagos", name: "Lagos" },
    { id: "nasarawa", name: "Nasarawa" },
    { id: "niger", name: "Niger" },
    { id: "ogun", name: "Ogun" },
    { id: "ondo", name: "Ondo" },
    { id: "osun", name: "Osun" },
    { id: "oyo", name: "Oyo" },
    { id: "plateau", name: "Plateau" },
    { id: "rivers", name: "Rivers" },
    { id: "sokoto", name: "Sokoto" },
    { id: "taraba", name: "Taraba" },
    { id: "yobe", name: "Yobe" },
    { id: "zamfara", name: "Zamfara" },
    { id: "fct", name: "FCT Abuja" },
  ],
  US: [
    { id: "ca", name: "California" },
    { id: "ny", name: "New York" },
    { id: "tx", name: "Texas" },
    { id: "fl", name: "Florida" },
    { id: "il", name: "Illinois" },
  ],
  GB: [
    { id: "eng", name: "England" },
    { id: "sct", name: "Scotland" },
    { id: "wal", name: "Wales" },
    { id: "nir", name: "Northern Ireland" },
  ],
  GH: [
    { id: "accra", name: "Greater Accra" },
    { id: "ashanti", name: "Ashanti" },
    { id: "west", name: "Western" },
    { id: "central", name: "Central" },
  ],
  KE: [
    { id: "nairobi", name: "Nairobi" },
    { id: "mombasa", name: "Mombasa" },
    { id: "nakuru", name: "Nakuru" },
    { id: "kisumu", name: "Kisumu" },
  ],
  ZA: [
    { id: "gauteng", name: "Gauteng" },
    { id: "wc", name: "Western Cape" },
    { id: "kzn", name: "KwaZulu-Natal" },
    { id: "ec", name: "Eastern Cape" },
  ],
  EG: [
    { id: "cairo", name: "Cairo" },
    { id: "alex", name: "Alexandria" },
    { id: "giza", name: "Giza" },
  ],
  ET: [
    { id: "addis", name: "Addis Ababa" },
    { id: "amhara", name: "Amhara" },
    { id: "oromia", name: "Oromia" },
  ],
  TZ: [
    { id: "dar", name: "Dar es Salaam" },
    { id: "dodoma", name: "Dodoma" },
    { id: "arusha", name: "Arusha" },
  ],
  UG: [
    { id: "kampala", name: "Kampala" },
    { id: "wakiso", name: "Wakiso" },
    { id: "mbarara", name: "Mbarara" },
  ],
  RW: [
    { id: "kigali", name: "Kigali" },
    { id: "east", name: "Eastern Province" },
    { id: "west", name: "Western Province" },
  ],
  IN: [
    { id: "dl", name: "Delhi" },
    { id: "mh", name: "Maharashtra" },
    { id: "ka", name: "Karnataka" },
    { id: "tn", name: "Tamil Nadu" },
  ],
  CN: [
    { id: "bj", name: "Beijing" },
    { id: "sh", name: "Shanghai" },
    { id: "gd", name: "Guangdong" },
  ],
  BR: [
    { id: "sp", name: "São Paulo" },
    { id: "rj", name: "Rio de Janeiro" },
    { id: "mg", name: "Minas Gerais" },
  ],
  SA: [
    { id: "riyadh", name: "Riyadh" },
    { id: "jeddah", name: "Jeddah" },
    { id: "mecca", name: "Mecca" },
  ],
  AE: [
    { id: "dxb", name: "Dubai" },
    { id: "auh", name: "Abu Dhabi" },
    { id: "shj", name: "Sharjah" },
  ],
};

export const DEFAULT_LOCALITIES: Record<string, Record<string, Locality[]>> = {
  NG: {
    lagos: [
      { id: "agege", name: "Agege" },
      { id: "ajeromi", name: "Ajeromi-Ifelodun" },
      { id: "alimosho", name: "Alimosho" },
      { id: "amuwo", name: "Amuwo-Odofin" },
      { id: "apapa", name: "Apapa" },
      { id: "badagry", name: "Badagry" },
      { id: "epe", name: "Epe" },
      { id: "eti-osa", name: "Eti-Osa" },
      { id: "ibeju", name: "Ibeju-Lekki" },
      { id: "ifako", name: "Ifako-Ijaiye" },
      { id: "ikeja", name: "Ikeja" },
      { id: "ikorodu", name: "Ikorodu" },
      { id: "kosofe", name: "Kosofe" },
      { id: "lagos-island", name: "Lagos Island" },
      { id: "lagos-mainland", name: "Lagos Mainland" },
      { id: "mushin", name: "Mushin" },
      { id: "ojo", name: "Ojo" },
      { id: "oshodi", name: "Oshodi-Isolo" },
      { id: "shomolu", name: "Shomolu" },
      { id: "surulere", name: "Surulere" },
    ],
    fct: [
      { id: "abaji", name: "Abaji" },
      { id: "bwari", name: "Bwari" },
      { id: "gwagwalada", name: "Gwagwalada" },
      { id: "kuje", name: "Kuje" },
      { id: "kwali", name: "Kwali" },
      { id: "municipal", name: "AMAC (Abuja Municipal)" },
    ],
    rivers: [
      { id: "port-harcourt", name: "Port Harcourt" },
      { id: "obio-akpor", name: "Obio-Akpor" },
      { id: "eleme", name: "Eleme" },
      { id: "ikwerre", name: "Ikwerre" },
      { id: "okrika", name: "Okrika" },
      { id: "opobo", name: "Opobo-Nkoro" },
      { id: "bonny", name: "Bonny" },
    ],
    kano: [
      { id: "fagge", name: "Fagge" },
      { id: "dala", name: "Dala" },
      { id: "nassarawa", name: "Nassarawa" },
      { id: "municipal", name: "Kano Municipal" },
      { id: "gwale", name: "Gwale" },
      { id: "tarauni", name: "Tarauni" },
    ],
    kaduna: [
      { id: "kaduna-north", name: "Kaduna North" },
      { id: "kaduna-south", name: "Kaduna South" },
      { id: "chikun", name: "Chikun" },
      { id: "zaria", name: "Zaria" },
      { id: "sabon-gari", name: "Sabon Gari" },
    ],
    oyo: [
      { id: "ibadan-north", name: "Ibadan North" },
      { id: "ibadan-south", name: "Ibadan South-West" },
      { id: "akinyele", name: "Akinyele" },
      { id: "egbeda", name: "Egbeda" },
      { id: "lagelu", name: "Lagelu" },
      { id: "ogbomoso", name: "Ogbomoso North" },
    ],
    ogun: [
      { id: "abeokuta-north", name: "Abeokuta North" },
      { id: "abeokuta-south", name: "Abeokuta South" },
      { id: "ijebu-ode", name: "Ijebu Ode" },
      { id: "sagamu", name: "Sagamu" },
      { id: "adobe-ota", name: "Ado-Odo/Ota" },
    ],
    anambra: [
      { id: "awka", name: "Awka North" },
      { id: "onitsha", name: "Onitsha North" },
      { id: "nnewi", name: "Nnewi North" },
      { id: "idemili", name: "Idemili North" },
    ],
    enugu: [
      { id: "enugu-north", name: "Enugu North" },
      { id: "enugu-south", name: "Enugu South" },
      { id: "nsukka", name: "Nsukka" },
      { id: "udi", name: "Udi" },
    ],
    delta: [
      { id: "warri", name: "Warri South" },
      { id: "ughelli", name: "Ughelli North" },
      { id: "asaba", name: "Oshimili South" },
      { id: "sapele", name: "Sapele" },
    ],
    "akwa-ibom": [
      { id: "uyo", name: "Uyo" },
      { id: "ikot-ekpene", name: "Ikot Ekpene" },
      { id: "oron", name: "Oron" },
    ],
    imo: [
      { id: "owerri", name: "Owerri Municipal" },
      { id: "okigwe", name: "Okigwe" },
      { id: "orlu", name: "Orlu" },
    ],
    "cross-river": [
      { id: "calabar", name: "Calabar Municipal" },
      { id: "akpabuyo", name: "Akpabuyo" },
      { id: "ikom", name: "Ikom" },
    ],
    benue: [
      { id: "makurdi", name: "Makurdi" },
      { id: "gboko", name: "Gboko" },
      { id: "otukpo", name: "Otukpo" },
    ],
    plateau: [
      { id: "jos", name: "Jos North" },
      { id: "jos-south", name: "Jos South" },
      { id: "barkin", name: "Barkin Ladi" },
    ],
    borno: [
      { id: "maiduguri", name: "Maiduguri" },
      { id: "jere", name: "Jere" },
      { id: "kaga", name: "Kaga" },
    ],
    sokoto: [
      { id: "sokoto-north", name: "Sokoto North" },
      { id: "sokoto-south", name: "Sokoto South" },
      { id: "wamako", name: "Wamako" },
    ],
    katsina: [
      { id: "katsina", name: "Katsina" },
      { id: "daura", name: "Daura" },
      { id: "funtua", name: "Funtua" },
    ],
    zamfara: [
      { id: "gusau", name: "Gusau" },
      { id: "talata", name: "Talata Mafara" },
      { id: "anka", name: "Anka" },
    ],
  },
};

/* ── Props ─────────────────────────────────────────────────── */

export interface LocationValue {
  country?: string;
  region?: string;
  locality?: string;
}

export interface LocationPickerProps {
  value?: LocationValue;
  onValueChange?: (value: LocationValue) => void;
  /** Countries to offer. Defaults to DEFAULT_COUNTRIES. */
  countries?: Country[];
  /** Sync region data (used when loadRegions is not provided). */
  regions?: Record<string, Region[]>;
  /** Async region loader (e.g. a geolocation API). */
  loadRegions?: (country: string) => Promise<Region[]>;
  /** Async locality loader. */
  loadLocalities?: (country: string, region: string) => Promise<Locality[]>;
  /** Show the locality/LGA select. Default: false. */
  showLocality?: boolean;
  /** Placeholder text for each level. */
  placeholders?: { country?: string; region?: string; locality?: string };
  disabled?: boolean;
  className?: string;
}

/* ── Standalone level inputs ───────────────────────────────── */

interface CountryInputProps {
  value?: string;
  onValueChange?: (country: string) => void;
  countries?: Country[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/** A single country select. */
export function CountryInput({
  value,
  onValueChange,
  countries = DEFAULT_COUNTRIES,
  placeholder = "Select country",
  disabled = false,
  className,
}: CountryInputProps) {
  return (
    <Select value={value ?? ""} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger aria-label="Country" className={cn("h-9 w-full text-sm", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {countries.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface StateInputProps {
  value?: string;
  onValueChange?: (region: string) => void;
  /** Country whose states/regions to list. */
  country?: string;
  regions?: Record<string, Region[]>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/** A single state/region select for a given country. */
export function StateInput({
  value,
  onValueChange,
  country,
  regions = DEFAULT_REGIONS,
  placeholder = "Select state / region",
  disabled = false,
  className,
}: StateInputProps) {
  const list = country ? regions[country] : undefined;
  return (
    <Select value={value ?? ""} onValueChange={onValueChange} disabled={disabled || !country}>
      <SelectTrigger aria-label="Region" className={cn("h-9 w-full text-sm", className)}>
        <SelectValue placeholder={list?.length ? placeholder : "Select a country first"} />
      </SelectTrigger>
      <SelectContent>
        {list?.length ? (
          list.map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="__none" disabled>
            {country ? "No regions available" : "Select a country first"}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

interface LGAInputProps {
  value?: string;
  onValueChange?: (locality: string) => void;
  /** Country whose localities to list. */
  country?: string;
  /** State/region whose localities to list. */
  region?: string;
  localities?: Record<string, Record<string, Locality[]>>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/** A single locality/LGA select for a given country + state. */
export function LGAInput({
  value,
  onValueChange,
  country,
  region,
  localities = DEFAULT_LOCALITIES,
  placeholder = "Select LGA / locality",
  disabled = false,
  className,
}: LGAInputProps) {
  const list = country && region ? localities[country]?.[region] : undefined;
  return (
    <Select value={value ?? ""} onValueChange={onValueChange} disabled={disabled || !list}>
      <SelectTrigger aria-label="Locality" className={cn("h-9 w-full text-sm", className)}>
        <SelectValue placeholder={list?.length ? placeholder : "Select a state first"} />
      </SelectTrigger>
      <SelectContent>
        {list?.length ? (
          list.map((l) => (
            <SelectItem key={l.id} value={l.id}>
              {l.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="__none" disabled>
            {country && region ? "No localities available" : "Select a state first"}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

/* ── Component ─────────────────────────────────────────────── */

export function LocationPicker({
  value,
  onValueChange,
  countries = DEFAULT_COUNTRIES,
  regions: staticRegions = DEFAULT_REGIONS,
  loadRegions,
  loadLocalities,
  showLocality = false,
  placeholders = {},
  disabled = false,
  className,
}: LocationPickerProps) {
  const [asyncRegions, setAsyncRegions] = React.useState<Region[] | null>(null);
  const [asyncLocalities, setAsyncLocalities] = React.useState<Locality[] | null>(null);
  const [loadingRegions, setLoadingRegions] = React.useState(false);
  const [loadingLocalities, setLoadingLocalities] = React.useState(false);

  const setValue = (patch: Partial<LocationValue>) => {
    onValueChange?.({ ...value, ...patch });
  };

  // When the country changes, reset the dependent levels.
  const handleCountry = (country: string) => {
    setValue({ country, region: undefined, locality: undefined });
    setAsyncRegions(null);
    setAsyncLocalities(null);
    if (loadRegions) {
      setLoadingRegions(true);
      loadRegions(country)
        .then(setAsyncRegions)
        .finally(() => setLoadingRegions(false));
    }
  };

  const handleRegion = (region: string) => {
    setValue({ ...value, region, locality: undefined });
    setAsyncLocalities(null);
    if (showLocality && loadLocalities && value?.country) {
      setLoadingLocalities(true);
      loadLocalities(value.country, region)
        .then(setAsyncLocalities)
        .finally(() => setLoadingLocalities(false));
    }
  };

  const regionList: Region[] | null = loadRegions
    ? asyncRegions
    : (value?.country ? staticRegions[value.country] : null) ?? null;

  const localityList: Locality[] | null = loadLocalities
    ? asyncLocalities
    : (value?.country && value.region
        ? DEFAULT_LOCALITIES[value.country]?.[value.region]
        : null) ?? null;

  return (
    <div className={cn("space-y-2", className)}>
      <Select
        value={value?.country ?? ""}
        onValueChange={handleCountry}
        disabled={disabled}
      >
        <SelectTrigger aria-label="Country" className="h-9 w-full text-sm">
          <SelectValue placeholder={placeholders.country ?? "Select country"} />
        </SelectTrigger>
        <SelectContent>
          {countries.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value?.country && (
        <Select
          value={value?.region ?? ""}
          onValueChange={handleRegion}
          disabled={disabled || loadingRegions}
        >
          <SelectTrigger aria-label="Region" className="h-9 w-full text-sm">
            <SelectValue placeholder={placeholders.region ?? "Select state / region"} />
          </SelectTrigger>
          <SelectContent>
            {regionList?.length ? (
              regionList.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="__none" disabled>
                {loadingRegions ? "Loading..." : "No regions available"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      )}

      {showLocality && value?.region && (
        <Select
          value={value?.locality ?? ""}
          onValueChange={(locality) => setValue({ ...value, locality })}
          disabled={disabled || loadingLocalities}
        >
          <SelectTrigger aria-label="Locality" className="h-9 w-full text-sm">
            <SelectValue placeholder={placeholders.locality ?? "Select LGA / locality"} />
          </SelectTrigger>
          <SelectContent>
            {localityList?.length ? (
              localityList.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="__none" disabled>
                {loadingLocalities ? "Loading..." : "No localities available"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
