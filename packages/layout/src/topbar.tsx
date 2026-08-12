/**
 * @arcevo/facet-layout: Topbar
 *
 * Sticky top bar with mobile hamburger, tenant switcher, and user menu.
 */

import * as React from "react";
import { useLayout } from "./layout-context.js";
import { UserMenu } from "./user-menu.js";
import { TenantSwitcher } from "./tenant-switcher.js";
import type { Tenant } from "./types.js";

export interface TopbarProps {
  tenants?: Tenant[];
  activeTenant?: Tenant | null;
  onTenantSwitch?: (tenantId: string) => void;
  /** Rendered after the user menu (notifications, theme toggle, etc.) */
  children?: React.ReactNode;
  /** Path to settings page */
  settingsPath?: string;
  /** Override sign out handler */
  onSignOut?: () => void;
  /** Rail mode: show the desktop collapse toggle. Default: "full" */
  mode?: "full" | "rail";
}

export function Topbar({
  tenants = [],
  activeTenant = null,
  onTenantSwitch,
  children,
  settingsPath,
  onSignOut,
  mode = "full",
}: TopbarProps) {
  const { toggleSidebar, sidebarCollapsed, toggleSidebarCollapsed } = useLayout();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger (opens the sheet) */}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1 text-foreground/60 hover:bg-accent lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Rail-mode collapse toggle (desktop) */}
        {mode === "rail" && (
          <button
            onClick={toggleSidebarCollapsed}
            className="hidden rounded-md p-1 text-foreground/60 hover:bg-accent lg:inline-flex"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={sidebarCollapsed}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {sidebarCollapsed ? <path d="m9 18 6-6-6-6" /> : <path d="m15 18-6-6 6-6" />}
            </svg>
          </button>
        )}

        <TenantSwitcher
          tenants={tenants}
          activeTenant={activeTenant}
          onSwitch={onTenantSwitch ?? (() => {})}
        />
      </div>

      <div className="flex items-center gap-3">
        {children}
        <UserMenu settingsPath={settingsPath} onSignOut={onSignOut} />
      </div>
    </header>
  );
}
