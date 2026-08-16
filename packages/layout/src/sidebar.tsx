/**
 * @arcevo/facet-layout: Sidebar
 *
 * Fixed-width navigation panel for desktop.
 * Renders sections and items from LayoutConfig.navigation.
 * Uses the LayoutProvider RouterAdapter when provided (Next/react-router
 * aware links + active detection); falls back to window.location + <a>.
 *
 * Rail mode: collapses to an icon-only rail; the expanded width is
 * resizable via the drag handle on the right edge (VS Code style).
 */

import * as React from "react";
import { useLayout, DEFAULT_SIDEBAR_WIDTH } from "./layout-context.js";
import {
  ScrollArea,
  Skeleton,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@arcevo/facet-components";
import type { LayoutConfig, NavItem, NavSection } from "./types.js";
import type { RouterAdapter } from "./router.js";

/* ── Props ────────────────────────────────────────────────── */

export interface SidebarProps {
  config: LayoutConfig;
  isLoading?: boolean;
  /** Rail mode: render icon-only with tooltip labels. Default: false */
  collapsed?: boolean;
  /** Current expanded sidebar width in px. Default: 260 */
  width?: number;
  /** Accordion mode: opening a section closes the others. Default: false */
  singleOpen?: boolean;
}

/* ── Component ────────────────────────────────────────────── */

export function Sidebar({ config, isLoading, collapsed = false, width = DEFAULT_SIDEBAR_WIDTH, singleOpen = false }: SidebarProps) {
  const { setSidebarOpen, router, setSidebarWidth, setSidebarCollapsed, collapseAll, expandAll } = useLayout();

  const handleNav = React.useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const sidebarWidth = collapsed ? 68 : width;

  // VS Code style resize: dragging the right edge resizes the sidebar.
  // Dragging below the min width collapses it to the rail; dragging the
  // rail's handle (or the chevron) expands it again.
  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (collapsed) return;
      event.preventDefault();
      const startX = event.clientX;
      const startWidth = width;
      const onMove = (moveEvent: PointerEvent) => {
        const next = startWidth + (moveEvent.clientX - startX);
        if (next <= 96) {
          // Below min width: collapse to rail.
          setSidebarCollapsed(true);
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
          return;
        }
        setSidebarWidth(next);
      };
      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [collapsed, width, setSidebarWidth, setSidebarCollapsed],
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r bg-sidebar transition-[width] duration-200 ${
        collapsed ? "w-[68px]" : ""
      }`}
      style={collapsed ? undefined : { width: `${sidebarWidth}px` }}
    >
      {/* Resize handle (VS Code style, right edge) */}
      {!collapsed && (
        <div
          onPointerDown={handlePointerDown}
          className="absolute right-0 top-0 z-10 h-full w-1.5 cursor-col-resize bg-transparent transition-colors hover:bg-primary/60 active:bg-primary/80"
          aria-hidden="true"
        />
      )}

      {/* Brand */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        {config.brand.logo ?? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-primary"
          >
            <path
              d="M12 2L4 6V12C4 17.52 7.58 22.48 12 24C16.42 22.48 20 17.52 20 12V6L12 2Z"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M12 6L8 8V12C8 14.5 9.67 16.8 12 17.5C14.33 16.8 16 14.5 16 12V8L12 6Z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        )}
        {!collapsed && (
          <span className="truncate font-semibold text-sidebar-foreground">{config.brand.name}</span>
        )}
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 px-3 py-4">
        {isLoading ? (
          <SidebarSkeleton collapsed={collapsed} />
        ) : config.navigation.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <p className="px-2 text-center text-sm text-sidebar-foreground/40">No navigation items</p>
            {!collapsed && (
              <SidebarToolbar
                sectionIds={config.navigation.map((s) => s.id ?? s.title)}
                onCollapseAll={collapseAll}
                onExpandAll={expandAll}
              />
            )}
          </div>
        ) : (
          <nav className={collapsed ? "flex flex-col items-center gap-1" : "space-y-6"}>
            {!collapsed && (
              <SidebarToolbar
                sectionIds={config.navigation.map((s) => s.id ?? s.title)}
                onCollapseAll={collapseAll}
                onExpandAll={expandAll}
              />
            )}
            {config.navigation.map((section) => (
              <NavSectionRenderer
                key={section.title}
                section={section}
                router={router}
                onNav={handleNav}
                onExpand={() => setSidebarCollapsed(false)}
                collapsed={collapsed}
                singleOpen={singleOpen}
              />
            ))}
          </nav>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        {collapsed ? (
          <p className="text-center text-xs text-sidebar-foreground/40">
            {config.brand.name.slice(0, 1).toUpperCase()}
          </p>
        ) : (
          <p className="text-center text-xs text-sidebar-foreground/40">
            {config.brand.name} v1.0.0
          </p>
        )}
      </div>
    </aside>
  );
}

/* ── Nav section (internal) ───────────────────────────────── */

/** True when an item (or any nested child) matches the active route. */
function isItemActive(
  item: NavItem,
  isActive: (href: string) => boolean,
): boolean {
  if (isActive(item.href)) return true;
  return item.children?.some((child) => isItemActive(child, isActive)) ?? false;
}

function sectionHasActiveItem(
  section: NavSection,
  isActive: (href: string) => boolean,
): boolean {
  return section.items.some((item) => isItemActive(item, isActive));
}

function NavSectionRenderer({
  section,
  router,
  onNav,
  collapsed,
  onExpand,
  singleOpen = false,
}: {
  section: NavSection;
  router: RouterAdapter | undefined;
  onNav: () => void;
  collapsed: boolean;
  onExpand: () => void;
  singleOpen?: boolean;
}) {
  // Storybook-style section: the header toggles the whole group.
  // Open by default; collapse state is persisted via layout context.
  const { collapsedSections, toggleSection, openSection } = useLayout();
  const sectionKey = section.id ?? section.title;
  const isActive = router ? router.isActive : (href: string) => href === window.location.pathname;
  const hasActive = sectionHasActiveItem(section, isActive);
  // A section containing the active page stays open regardless of the
  // persisted collapse state (unless the user explicitly collapsed it).
  const open = hasActive ? true : !collapsedSections[sectionKey];

  // In single-open (accordion) mode the active section is always visible:
  // scroll it into view on mount/update so it isn't cut off at the bottom
  // of the scrollable rail.
  const sectionRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (open && hasActive && sectionRef.current) {
      sectionRef.current.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }
  }, [open, hasActive]);

  // Header toggle: accordion (openSection) when singleOpen, else multi-open.
  const handleToggle = () => {
    if (singleOpen) {
      openSection(sectionKey);
    } else {
      toggleSection(sectionKey);
    }
  };

  // Collapsed rail (YouTube-style): one icon slot per section, not a list.
  // All section icons stack together with no scroll; the full item list
  // only shows when the sidebar is expanded.
  if (collapsed) {
    const first = section.items[0];
    const icon = first?.icon;
    return (
      <div>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onExpand}
                aria-label={section.title}
                className="flex h-9 w-9 items-center justify-center rounded-md text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {icon ? (
                  <span className="size-4 shrink-0">{icon}</span>
                ) : (
                  <span className="text-sm font-semibold">
                    {section.title.charAt(0).toUpperCase()}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{section.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="mb-2 flex w-full items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground/80"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        {section.title}
      </button>
      {open && (
        <ul className="space-y-1">
          {section.items.map((item) => (
            <NavItemRenderer
              key={item.href}
              item={item}
              router={router}
              onNav={onNav}
              onExpand={onExpand}
              depth={0}
              collapsed={collapsed}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Nav item (internal): supports nested collapsible groups ─ */

function NavItemRenderer({
  item,
  router,
  onNav,
  onExpand,
  depth,
  collapsed,
}: {
  item: NavItem;
  router: RouterAdapter | undefined;
  onNav: () => void;
  onExpand: () => void;
  depth: number;
  collapsed: boolean;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const children = item.children;
  const hasChildren = children?.length;
  const getActive = router ? router.isActive : (href: string) => href === window.location.pathname;
  // Auto-expand a collapsible group when one of its children is the
  // active page, so the current location is always visible.
  const childActive = hasChildren
    ? children.some((child) => isItemActive(child, getActive))
    : false;
  const open = childActive ? true : internalOpen;

  // Group item: toggles its children inline (full mode) or shows icon-only trigger
  if (hasChildren) {
    return (
      <li>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => (collapsed ? onExpand() : setInternalOpen((v) => !v))}
                aria-expanded={collapsed ? undefined : open}
                aria-label={collapsed ? item.label : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  collapsed ? "justify-center px-0" : ""
                }`}
                style={collapsed ? undefined : { paddingLeft: `${8 + depth * 12}px` }}
              >
                {item.icon && collapsed && <span className="size-4 shrink-0">{item.icon}</span>}
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!collapsed && item.badge != null && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    {item.badge}
                  </span>
                )}
                {!collapsed && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`shrink-0 text-sidebar-foreground/40 transition-transform ${open ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        {!collapsed && open && (
          <ul className="mt-1 space-y-1">
            {children.map((child) => (
              <NavItemRenderer
                key={child.href}
                item={child}
                router={router}
                onNav={onNav}
                onExpand={onExpand}
                depth={depth + 1}
                collapsed={collapsed}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Leaf item: framework-aware link when an adapter is provided.
  const isActive = router ? router.isActive(item.href) : defaultIsActive(item.href);
  const Link = router?.Link ?? DefaultAnchor;
  return (
    <li key={item.href}>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              onClick={(event) => {
                if (collapsed) {
                  event.preventDefault();
                  onExpand();
                  return;
                }
                onNav();
              }}
              aria-label={collapsed ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-0" : ""
              } ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              {item.icon && collapsed && <span className="size-4 shrink-0">{item.icon}</span>}
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge != null && (
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}

/* ── Sidebar toolbar: collapse / expand all (with tooltips) ── */

interface SidebarToolbarProps {
  sectionIds: string[];
  onCollapseAll: (ids: string[]) => void;
  onExpandAll: (ids: string[]) => void;
}

function SidebarToolbar({ sectionIds, onCollapseAll, onExpandAll }: SidebarToolbarProps) {
  return (
    <div className="mb-4 flex items-center gap-1">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => onCollapseAll(sectionIds)}
              aria-label="Collapse all sections"
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M5 6h14M5 18h14" /></svg>
              <span>Collapse all</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Collapse all sections</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => onExpandAll(sectionIds)}
              aria-label="Expand all sections"
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6h14M5 12h14M5 18h14" /></svg>
              <span>Expand all</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Expand all sections</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

/* ── Default (no adapter) behavior ────────────────────────── */

function defaultIsActive(href: string): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return path === href || path.startsWith(href + "/");
}

function DefaultAnchor({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

/* ── Skeleton ─────────────────────────────────────────────── */

function SidebarSkeleton({ collapsed }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-9 w-9 rounded-md" />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <div className="space-y-1">
            {[1, 2].map((j) => (
              <Skeleton key={j} className="h-8 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
