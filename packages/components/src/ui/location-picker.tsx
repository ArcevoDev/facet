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

import {
  DEFAULT_COUNTRIES,
  DEFAULT_REGIONS,
  DEFAULT_LOCALITIES,
  type Country,
  type Region,
  type Locality,
} from "./location-data.js";

export { DEFAULT_COUNTRIES, DEFAULT_REGIONS, DEFAULT_LOCALITIES };
export type { Country, Region, Locality };


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
  /** Country list used to resolve the country tag on the trigger. */
  countries?: Country[];
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
  countries = DEFAULT_COUNTRIES,
  placeholder = "Select state / region",
  disabled = false,
  className,
}: StateInputProps) {
  const list = country ? regions[country] : undefined;
  const countryName = country
    ? countries.find((c) => c.code === country)?.name
    : undefined;
  return (
    <Select value={value ?? ""} onValueChange={onValueChange} disabled={disabled || !country}>
      <SelectTrigger
        aria-label="Region"
        className={cn("h-9 w-full text-sm", className)}
      >
        {countryName ? (
          <span className="inline-flex items-center gap-1.5 truncate">
            <span className="rounded-sm border border-border bg-muted/40 px-1.5 py-px text-[11px] font-medium uppercase text-muted-foreground">
              {country}
            </span>
            <SelectValue placeholder={list?.length ? placeholder : "No regions available"} />
          </span>
        ) : (
          <SelectValue placeholder={list?.length ? placeholder : "Select a country first"} />
        )}
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
  /** Country list used to resolve the country tag on the trigger. */
  countries?: Country[];
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
  countries = DEFAULT_COUNTRIES,
  placeholder = "Select LGA / locality",
  disabled = false,
  className,
}: LGAInputProps) {
  const list = country && region ? localities[country]?.[region] : undefined;
  const countryName = country
    ? countries.find((c) => c.code === country)?.name
    : undefined;
  return (
    <Select value={value ?? ""} onValueChange={onValueChange} disabled={disabled || !list}>
      <SelectTrigger aria-label="Locality" className={cn("h-9 w-full text-sm", className)}>
        {countryName ? (
          <span className="inline-flex items-center gap-1.5 truncate">
            <span className="rounded-sm border border-border bg-muted/40 px-1.5 py-px text-[11px] font-medium uppercase text-muted-foreground">
              {country}
            </span>
            <SelectValue placeholder={list?.length ? placeholder : "No localities available"} />
          </span>
        ) : (
          <SelectValue placeholder={list?.length ? placeholder : "Select a state first"} />
        )}
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
