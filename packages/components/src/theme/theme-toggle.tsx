/**
 * @arcevo/facet-components: ThemeToggle
 *
 * Single-button theme switcher: by default it inherits the system theme
 * (no explicit choice) and a click toggles between light and dark.
 * Requires a <ThemeProvider> ancestor. The icon reflects the currently
 * applied (resolved) theme.
 */

import * as React from "react";
import { LightIcon } from "../icon/light-icon.js";
import { cn } from "../utils.js";
import { useTheme } from "./theme-provider.js";

export interface ThemeToggleProps {
  className?: string;
  /** Accessible label for the trigger. Default: "Toggle theme" */
  label?: string;
}

export function ThemeToggle({ className, label = "Toggle theme" }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  // SSR-safe: the resolved theme is unknown until the client mounts, so
  // render the icon only after mount to avoid a server/client mismatch.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const TriggerIcon = isDark ? "moon" : "sun";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {mounted ? <LightIcon name={TriggerIcon} className="size-4" /> : <span className="size-4" />}
    </button>
  );
}
