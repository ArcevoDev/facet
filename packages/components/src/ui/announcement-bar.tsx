/**
 * @arcevo/facet-components: AnnouncementBar
 *
 * A dismissible top announcement banner, persisted in localStorage by
 * default so it only shows once per visitor. Fully customizable.
 */

import * as React from "react";
import { cn } from "../utils.js";

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** localStorage key for dismissal persistence. Default: "facet-announcement-dismissed". */
  storageKey?: string;
  /** Show a close button. Default: true. */
  dismissible?: boolean;
  /** Callback when dismissed. */
  onDismiss?: () => void;
  /** Background classes. Default: "bg-primary text-primary-foreground". */
  className?: string;
}

/**
 * A slim, dismissible announcement bar pinned to the top of the page.
 * Dismissal persists to localStorage (per storageKey) so the banner only
 * reappears for a new visitor or when the key changes.
 */
export function AnnouncementBar({
  children,
  storageKey = "facet-announcement-dismissed",
  dismissible = true,
  onDismiss,
  className,
  ...props
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(storageKey) === "1") setDismissed(true);
    } catch {
      // localStorage unavailable (private mode): ignore.
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // ignore
    }
    onDismiss?.();
  };

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center gap-3 px-4 py-2 text-center text-sm font-medium",
        className ?? "bg-primary text-primary-foreground",
      )}
      role="region"
      aria-label="Announcement"
      {...props}
    >
      <div className="flex-1">{children}</div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

AnnouncementBar.displayName = "AnnouncementBar";
