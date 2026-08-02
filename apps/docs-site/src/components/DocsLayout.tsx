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
} from "@arcevo/facet-components";
import { buildDocsLayoutConfig } from "../lib/nav.js";
import { useDocsRouterAdapter } from "../lib/docs-router.js";

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
 * - GitHub link + theme toggle live in the topbar, not the page body.
 * - CommandPalette renders its own search bar (icon + placeholder + "Ctrl
 *   K" badge) in the topbar. Clicking it, or pressing Ctrl/Cmd+K, opens an
 *   inline results panel that searches all sidebar routes and quick
 *   actions, grouped by section.
 */
/** Settings gear dropdown: landing, GitHub, and theme quick toggle. */
function SettingsMenu() {
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
        <DropdownMenuLabel>facet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="https://facet.arcevocirqle.com.ng"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <Icon name="sparkles" className="size-4" />
            About facet
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="https://github.com/arcevodev/facet"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <Icon name="github" className="size-4" />
            GitHub
          </a>
        </DropdownMenuItem>
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
  const router = useDocsRouterAdapter();
  const config = buildDocsLayoutConfig();
  const navigate = useNavigate();

  return (
    <ConsoleLayout
      config={config}
      router={router}
      mode="rail"
      topbar={
        <>
          <CommandPalette
            config={config}
            navigate={(href) => navigate(href)}
            placeholder="Search docs..."
          />
          <a
            href="https://github.com/arcevodev/facet"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            GitHub
          </a>
          <SettingsMenu />
          <ThemeToggle />
        </>
      }
    >
      <Outlet />
    </ConsoleLayout>
  );
}
