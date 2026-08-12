/**
 * NumberInput: a numeric input with spin buttons and min/max/step
 * clamping. Built on the facet Input styles.
 *
 * Usage:
 *   <NumberInput value={count} onValueChange={setCount} min={0} max={10} />
 */

import * as React from "react";
import { cn } from "../utils.js";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
  /** Numeric value (number, not string). */
  value?: number | null;
  /** Called with the clamped numeric value. */
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Show a label above the input. */
  label?: string;
  /** Currency symbol rendered as a prefix, e.g. "$" or "₦". */
  currency?: string;
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onValueChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      label,
      currency,
      className,
      ...props
    },
    ref,
  ) => {
    const display = value == null ? "" : String(value);
    const padLeft = currency ? "pl-7" : "pr-16";

    const commit = (next: number | null) => {
      if (next == null) {
        onValueChange?.(null);
        return;
      }
      const rounded = Number.isInteger(step) ? Math.round(next / step) * step : next;
      onValueChange?.(clampNumber(rounded, min, max));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "") {
        onValueChange?.(null);
        return;
      }
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) {
        onValueChange?.(clampNumber(parsed, min, max));
      }
    };

    const stepBy = (dir: 1 | -1) => {
      const base = value == null ? min : value;
      commit(base + dir * step);
    };

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
        )}
        <div className="relative">
          {currency && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
              {currency}
            </span>
          )}
          <input
            ref={ref}
            type="text"
            inputMode="decimal"
            value={display}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== "") {
                commit(Number(e.target.value));
              }
            }}
            className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${padLeft}`}
            {...props}
          />
          <div className="absolute right-1 top-1/2 flex -translate-y-1/2 gap-0.5">
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease value"
              disabled={props.disabled || (value != null && value <= min)}
              onClick={() => stepBy(-1)}
              className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2.5 6H9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase value"
              disabled={props.disabled || (value != null && value >= max)}
              onClick={() => stepBy(1)}
              className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 2.5V9.5M2.5 6H9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";
