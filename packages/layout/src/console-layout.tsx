/**
 * @arcevo/facet-layout: ConsoleLayout
 *
 * Dashboard shell: fixed sidebar + topbar + content area.
 * On mobile the sidebar is a click-to-open Sheet; the brand trigger in the
 * topbar opens it, and clicking outside (or the trigger again) closes it.
 * Uses LayoutProvider for sidebar state.
 */

import * as React from "react";
import { useOptionalAuth } from "@arcevo/facet-auth";
import { Sheet, SheetContent } from "@arcevo/facet-components";
import { useLayout, LayoutProvider } from "./layout-context.js";
import { Sidebar } from "./sidebar.js";
import { Topbar } from "./topbar.js";
import type { ConsoleLayoutMode, LayoutConfig, Tenant } from "./types.js";
import type { RouterAdapter } from "./router.js";

/** True when the viewport is at the desktop (lg) breakpoint or wider. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export interface ConsoleLayoutProps {
  config: LayoutConfig;
  tenants?: Tenant[];
  activeTenant?: Tenant | null;
  onTenantSwitch?: (tenantId: string) => void;
  /** Sidebar mode. "full" = always-labeled, "rail" = collapsible icon-only. Default: "full" */
  mode?: ConsoleLayoutMode;
  /** Framework-aware navigation (Next <Link>, react-router <Link>, ...). */
  router?: RouterAdapter;
  /** Extra content rendered at the right side of the topbar (links, toggles). */
  topbar?: React.ReactNode;
  /** Render the built-in theme toggle in the topbar (needs a ThemeProvider ancestor). */
  themeToggle?: boolean;
  /**
   * Accordion mode: opening a sidebar section closes the others. Default: false
   * (sections stay independently open). Recommended for doc-style sidebars
   * and narrow rail layouts.
   */
  singleOpen?: boolean;
  children: React.ReactNode;
}

function ConsoleLayoutInner({
  config,
  tenants,
  activeTenant,
  onTenantSwitch,
  mode = "full",
  topbar,
  themeToggle = false,
  singleOpen = false,
  children,
}: ConsoleLayoutProps) {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, sidebarWidth, toggleSidebarCollapsed } =
    useLayout();
  const isDesktop = useIsDesktop();

  // Ctrl/Cmd+B toggles the rail sidebar collapse (VS Code style). Ignored
  // while the user is typing in an input, textarea, or contenteditable.
  React.useEffect(() => {
    if (mode !== "rail") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.isContentEditable)
        ) {
          return;
        }
        event.preventDefault();
        toggleSidebarCollapsed();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, toggleSidebarCollapsed]);

  // Auth is optional. Without an <ArcProvider>, treat the user as
  // authenticated so the shell works for docs/static sites that have
  // no auth context.
  const auth = useOptionalAuth();
  const isAuthenticated = auth?.isAuthenticated ?? true;
  const isLoading = auth?.isLoading ?? false;

  // Show loading state while auth resolves
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not authenticated: render children directly (let Guard or SignIn handle it)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const sidebarWidthPx = mode === "rail" && sidebarCollapsed ? 68 : sidebarWidth;

  // Click-outside closes the mobile sidebar.
  React.useEffect(() => {
    if (!sidebarOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-sidebar]")) return;
      setSidebarOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [sidebarOpen, setSidebarOpen]);

  // Classic mode: the sidebar is persistent and pushes content (full/rail).
  const classicDesktop = isDesktop;
  const padLeft = classicDesktop ? sidebarWidthPx : 0;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Classic mode: persistent adjustable sidebar (full / rail) */}
      {classicDesktop && (
        <div className="hidden lg:block">
          <Sidebar
            config={config}
            collapsed={mode === "rail" && sidebarCollapsed}
            width={sidebarWidth}
            singleOpen={singleOpen}
          />
        </div>
      )}

      {/* Classic mode mobile: Sheet overlay */}
      {!isDesktop && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-[260px] p-0" data-sidebar>
            <Sidebar config={config} singleOpen={singleOpen} />
          </SheetContent>
        </Sheet>
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col transition-[padding] duration-200"
        style={padLeft > 0 ? { paddingLeft: `${padLeft}px` } : undefined}
      >
        <Topbar
          tenants={tenants}
          activeTenant={activeTenant}
          onTenantSwitch={onTenantSwitch}
          mode={mode}
          themeToggle={themeToggle}
          onMobileSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        >
          {topbar}
        </Topbar>
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function ConsoleLayout(props: ConsoleLayoutProps) {
  return (
    <LayoutProvider router={props.router}>
      <ConsoleLayoutInner {...props} />
    </LayoutProvider>
  );
}
