/**
 * LocationPicker: cascading Country → State/Region → LGA/Locality
 * selects. Ships with a small bundled static dataset (no network), and
 * supports async `loadStates`/`loadLocalities` for real APIs.
 *
 * Usage:
 *   <LocationPicker
 *     value={location}
 *     onValueChange={setLocation}
 *     showLocality
 *   />
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

/** Bundled static dataset. Locality (LGA) data is illustrative; swap in
 *  your own via the async props for production. */
export const DEFAULT_COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "GH", name: "Ghana" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "IN", name: "India" },
];

export const DEFAULT_REGIONS: Record<string, Region[]> = {
  NG: [
    { id: "lagos", name: "Lagos" },
    { id: "abuja", name: "FCT Abuja" },
    { id: "rivers", name: "Rivers" },
    { id: "kaduna", name: "Kaduna" },
  ],
  US: [
    { id: "ca", name: "California" },
    { id: "ny", name: "New York" },
    { id: "tx", name: "Texas" },
  ],
  GB: [
    { id: "eng", name: "England" },
    { id: "sct", name: "Scotland" },
    { id: "wal", name: "Wales" },
  ],
  GH: [
    { id: "accra", name: "Greater Accra" },
    { id: "ashanti", name: "Ashanti" },
  ],
  KE: [
    { id: "nairobi", name: "Nairobi" },
    { id: "mombasa", name: "Mombasa" },
  ],
  ZA: [
    { id: "gauteng", name: "Gauteng" },
    { id: "wc", name: "Western Cape" },
  ],
  IN: [
    { id: "dl", name: "Delhi" },
    { id: "mh", name: "Maharashtra" },
    { id: "ka", name: "Karnataka" },
  ],
};

export const DEFAULT_LOCALITIES: Record<string, Record<string, Locality[]>> = {
  NG: {
    lagos: [
      { id: "ikeja", name: "Ikeja" },
      { id: "lagos-island", name: "Lagos Island" },
      { id: "epe", name: "Epe" },
    ],
    abuja: [
      { id: "amac", name: "AMAC" },
      { id: "bwari", name: "Bwari" },
    ],
    rivers: [{ id: "port-harcourt", name: "Port Harcourt" }],
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
