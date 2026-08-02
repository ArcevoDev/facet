/**
 * @arcevo/facet-layout: Layout context
 *
 * Manages sidebar open/close state and the optional RouterAdapter.
 * ConsoleLayout provides this; consumers can call `useLayout()` from
 * any child to toggle the sidebar or read the active router.
 */

import * as React from "react";
import type { LayoutContextValue } from "./types.js";
import { createDefaultAdapter, type RouterAdapter } from "./router.js";

const LayoutContext = React.createContext<LayoutContextValue | null>(null);

/** localStorage key for the rail-mode collapsed state. */
const STORAGE_KEY = "facet:sidebar-collapsed";

/** localStorage key for the resizable sidebar width (px). */
const STORAGE_KEY_WIDTH = "facet:sidebar-width";

/** localStorage key for per-section collapse state. */
const STORAGE_KEY_SECTIONS = "facet:sidebar-sections";

/** Default expanded sidebar width. */
export const DEFAULT_SIDEBAR_WIDTH = 260;

export function LayoutProvider({
  children,
  router,
}: {
  children: React.ReactNode;
  /** Framework-aware navigation. Defaults to window.location + plain <a>. */
  router?: RouterAdapter;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Rail collapse state, persisted so the choice survives reloads.
  const [sidebarCollapsed, setSidebarCollapsedState] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  const setSidebarCollapsed = React.useCallback((collapsed: boolean) => {
    setSidebarCollapsedState(collapsed);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    }
  }, []);

  const toggleSidebarCollapsed = React.useCallback(() => {
    setSidebarCollapsedState((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      }
      return next;
    });
  }, []);

  // Resizable sidebar width (rail mode, desktop). Persisted so the user's
  // preferred width survives reloads. Bounded to [176, 400].
  const [sidebarWidth, setSidebarWidthState] = React.useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_SIDEBAR_WIDTH;
    const stored = Number(window.localStorage.getItem(STORAGE_KEY_WIDTH));
    return stored >= 176 && stored <= 400 ? stored : DEFAULT_SIDEBAR_WIDTH;
  });

  const setSidebarWidth = React.useCallback((width: number) => {
    const clamped = Math.min(400, Math.max(176, width));
    setSidebarWidthState(clamped);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_WIDTH, String(clamped));
    }
  }, []);

  // Per-section collapse state (sidebar group headers). Persisted so the
  // user's open/closed sections survive reloads. Absent key => open.
  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>(
    () => {
      if (typeof window === "undefined") return {};
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY_SECTIONS);
        return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
      } catch {
        return {};
      }
    },
  );

  const toggleSection = React.useCallback((sectionId: string) => {
    setCollapsedSections((prev) => {
      const next = { ...prev, [sectionId]: !prev[sectionId] };
      try {
        window.localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(next));
      } catch {
        // Storage can be unavailable (private mode): non-fatal.
      }
      return next;
    });
  }, []);

  // Keep a stable default adapter so the context value is referentially
  // stable across renders unless the consumer swaps the router.
  const defaultRouter = React.useMemo(() => createDefaultAdapter(), []);
  const activeRouter = router ?? defaultRouter;

  const value: LayoutContextValue = React.useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebarCollapsed,
      sidebarWidth,
      setSidebarWidth,
      collapsedSections,
      toggleSection,
      router: activeRouter,
    }),
    [
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebarCollapsed,
      sidebarWidth,
      setSidebarWidth,
      collapsedSections,
      toggleSection,
      activeRouter,
    ],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout(): LayoutContextValue {
  const ctx = React.useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within a <LayoutProvider>");
  }
  return ctx;
}
