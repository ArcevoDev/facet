/**
 * @arcevo/facet-components: SecuritySectionCard
 *
 * A ready-to-use security features grid: each item is a clickable card
 * with an icon, title, and description. Great as the landing surface of
 * a security area (2FA, passkeys, sessions, audit log...). Data-driven.
 */

import * as React from "react";
import { cn } from "../utils.js";
import { Card, CardHeader, CardTitle, CardDescription } from "./card.js";

export interface SecurityFeature {
  /** Unique id. */
  id: string;
  title: string;
  description: string;
  /** Icon name; render via `iconRenderer` if provided. */
  icon?: string;
  /** Optional status badge text (e.g. "Enabled"). */
  badge?: string;
}

export interface SecuritySectionCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  features: SecurityFeature[];
  /** Called when a feature card is clicked. */
  onSelect?: (feature: SecurityFeature) => void;
  /** Render the icon for a feature. */
  iconRenderer?: (icon: string) => React.ReactNode;
  /** Render the status badge. */
  badgeRenderer?: (badge: string) => React.ReactNode;
  /** Grid columns on md+. Default: 2. */
  columns?: 1 | 2 | 3;
}

/**
 * A responsive grid of security feature cards. Each card is a link-style
 * surface: hover lifts the border, and clicking calls `onSelect`.
 */
export function SecuritySectionCard({
  features,
  onSelect,
  iconRenderer,
  badgeRenderer,
  columns = 2,
  className,
  ...props
}: SecuritySectionCardProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {features.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onSelect?.(f)}
          className="group text-left"
        >
          <Card className="h-full transition-colors group-hover:border-primary/50">
            <CardHeader>
              {iconRenderer && f.icon && (
                <span className="mb-2 inline-flex text-primary">{iconRenderer(f.icon)}</span>
              )}
              <CardTitle className="text-base">{f.title}</CardTitle>
              <CardDescription>{f.description}</CardDescription>
              {f.badge && badgeRenderer && (
                <span className="mt-1">{badgeRenderer(f.badge)}</span>
              )}
            </CardHeader>
          </Card>
        </button>
      ))}
    </div>
  );
}

SecuritySectionCard.displayName = "SecuritySectionCard";
