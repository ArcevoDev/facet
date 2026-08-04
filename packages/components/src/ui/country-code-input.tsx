/**
 * CountryCodeInput: a phone number input with a leading country-code
 * selector (WhatsApp-style). The dial code list is bundled locally so the
 * component works offline; consumers can pass their own list.
 *
 * Usage:
 *   <CountryCodeInput
 *     value={{ code: "+234", number: "8012345678" }}
 *     onValueChange={setPhone}
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

export interface CountryCode {
  /** ISO 3166-1 alpha-2 country code, e.g. "NG". */
  country: string;
  /** Dial code with leading "+", e.g. "+234". */
  code: string;
  /** Display label, e.g. "Nigeria (+234)". */
  label?: string;
}

export const COMMON_COUNTRY_CODES: CountryCode[] = [
  { country: "US", code: "+1", label: "United States (+1)" },
  { country: "GB", code: "+44", label: "United Kingdom (+44)" },
  { country: "NG", code: "+234", label: "Nigeria (+234)" },
  { country: "GH", code: "+233", label: "Ghana (+233)" },
  { country: "KE", code: "+254", label: "Kenya (+254)" },
  { country: "ZA", code: "+27", label: "South Africa (+27)" },
  { country: "IN", code: "+91", label: "India (+91)" },
  { country: "CN", code: "+86", label: "China (+86)" },
  { country: "DE", code: "+49", label: "Germany (+49)" },
  { country: "FR", code: "+33", label: "France (+33)" },
  { country: "BR", code: "+55", label: "Brazil (+55)" },
  { country: "CA", code: "+1", label: "Canada (+1)" },
  { country: "AU", code: "+61", label: "Australia (+61)" },
  { country: "JP", code: "+81", label: "Japan (+81)" },
];

/** Resolve the display code for a given country code (defaults to its entry). */
export function getCountryCode(country: string, list = COMMON_COUNTRY_CODES): string {
  return list.find((c) => c.country === country)?.code ?? "+1";
}

/* ── Props ─────────────────────────────────────────────────── */

export interface CountryCodeValue {
  /** Selected country code, e.g. "NG". */
  country: string;
  /** The phone number digits. */
  number: string;
}

export interface CountryCodeInputProps {
  /** Current value. */
  value?: CountryCodeValue;
  /** Called whenever the country or number changes. */
  onValueChange?: (value: CountryCodeValue) => void;
  /** Country-code list. Defaults to COMMON_COUNTRY_CODES. */
  countries?: CountryCode[];
  /** Placeholder for the number field. Default: "Phone number". */
  placeholder?: string;
  /** Label shown above the input. */
  label?: string;
  disabled?: boolean;
  className?: string;
  /** id/name forwarded to the number input. */
  id?: string;
  name?: string;
}

/* ── Component ─────────────────────────────────────────────── */

export function CountryCodeInput({
  value,
  onValueChange,
  countries = COMMON_COUNTRY_CODES,
  placeholder = "Phone number",
  label,
  disabled = false,
  className,
  id,
  name,
}: CountryCodeInputProps) {
  const selected = value?.country ?? countries[0]?.country ?? "US";
  const dialCode = value?.country ? getCountryCode(value.country, countries) : (countries[0]?.code ?? "+1");

  const setCountry = (country: string) => {
    onValueChange?.({ country, number: value?.number ?? "" });
  };

  const setNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.({ country: selected, number: e.target.value });
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <Select value={selected} onValueChange={setCountry} disabled={disabled}>
          <SelectTrigger
            aria-label="Country code"
            className="h-9 w-[150px] shrink-0 text-sm"
          >
            <SelectValue>
              <span className="flex items-center gap-1.5">
                <span className="uppercase">{selected}</span>
                <span className="text-muted-foreground">{dialCode}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={`${c.country}-${c.code}`} value={c.country}>
                <span className="flex items-center gap-2">
                  <span className="uppercase">{c.country}</span>
                  <span className="text-muted-foreground">{c.code}</span>
                  {c.label && <span className="text-muted-foreground">{c.label}</span>}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          value={value?.number ?? ""}
          onChange={setNumber}
          placeholder={placeholder}
          disabled={disabled}
          className="flex h-9 min-w-0 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
}
