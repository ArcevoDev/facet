import { Outlet, useNavigate } from "react-router-dom";
import { ConsoleLayout, CommandPalette } from "@arcevo/facet-layout";
import {
  ThemeToggle,
  useTheme,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Icon,
  type IconName,
} from "@arcevo/facet-components";
import { buildDocsLayoutConfig } from "../lib/nav.js";
import { useDocsRouterAdapter } from "../lib/docs-router.js";
import { useDocsApp } from "../context.js";

/**
 * Docs site shell: facet ConsoleLayout with a collapsible rail sidebar.
 * The shell itself is a live demo of the facet layout system.
 *
 * - Desktop: sidebar resizes via the right-edge drag handle (VS Code
 *   style), collapsing to an icon-only rail at the minimum width. The
 *   rail shows one icon per section (YouTube-style), all together with
 *   no scroll; the full item list only shows when expanded.
 * - Mobile: sidebar becomes an overlay Sheet opened from the hamburger.
 * - The routed page renders in the main area via <Outlet />.
 * - CommandPalette renders its own search bar (icon + placeholder + "Ctrl
 *   K" badge) in the topbar. Clicking it, or pressing Ctrl/Cmd+K, opens an
 *   inline results panel that searches all sidebar routes and quick
 *   actions, grouped by section.
 */
/** Settings gear dropdown: external links, and a theme quick toggle. */
function SettingsMenu({ label, links }: { label: string; links: { label: string; href: string; icon?: IconName }[] }) {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Settings"
          title="Settings"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Icon name="settings" className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              {link.icon && <Icon name={link.icon} className="size-4" />}
              {link.label}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme(isDark ? "light" : "dark")}>
          <Icon name={isDark ? "sun" : "moon"} className="size-4" />
          {isDark ? "Light mode" : "Dark mode"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DocsLayout() {
  const { config, pages, showComponents, topbar, links } = useDocsApp();
  const router = useDocsRouterAdapter();
  const layoutConfig = buildDocsLayoutConfig(config, pages, showComponents);
  const navigate = useNavigate();

  return (
    <ConsoleLayout
      config={layoutConfig}
      router={router}
      mode="rail"
      topbar={
        <>
          <CommandPalette
            config={layoutConfig}
            navigate={(href) => navigate(href)}
            placeholder="Search docs..."
          />
          {topbar}
          <SettingsMenu label={config.brand?.name ?? "Docs"} links={links ?? []} />
          <ThemeToggle />
        </>
      }
    >
      <Outlet />
    </ConsoleLayout>
  );
}
