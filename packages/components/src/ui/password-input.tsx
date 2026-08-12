/**
 * PasswordInput: a password field with a built-in show/hide toggle.
 *
 * Usage:
 *   <PasswordInput value={password} onValueChange={setPassword} label="Password" />
 */

import * as React from "react";
import { cn } from "../utils.js";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Show a label above the input. */
  label?: string;
  /** Show the reveal toggle. Default: true. */
  showToggle?: boolean;
  /** Visible/hidden state. */
  defaultVisible?: boolean;
  /** Controlled visible state. */
  visible?: boolean;
  /** Called when the toggle is clicked. */
  onVisibleChange?: (visible: boolean) => void;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      showToggle = true,
      defaultVisible = false,
      visible: visibleProp,
      onVisibleChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalVisible, setInternalVisible] = React.useState(defaultVisible);
    const visible = visibleProp ?? internalVisible;

    const toggle = () => {
      const next = !visible;
      if (visibleProp === undefined) setInternalVisible(next);
      onVisibleChange?.(next);
    };

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
          {showToggle && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={visible ? "Hide password" : "Show password"}
              onClick={toggle}
              className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {visible ? (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path d="M1.5 1.5 14.5 14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
