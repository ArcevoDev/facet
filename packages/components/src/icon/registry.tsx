/**
 * @arcevo/facet-components: Icon registry
 *
 * Formalizes lucide-react as a semantic icon registry so consumers and
 * domain presets can override icons without forking components.
 *
 * Three layers:
 *   1. Built-in map: semantic names -> lucide components.
 *   2. registerIcon(name, icon): global overrides/additions.
 *   3. IconProvider: per-app / per-domain overrides via context.
 *
 * Usage:
 *   import { Icon, registerIcon, IconProvider } from "@arcevo/facet-components";
 *
 *   registerIcon("settings", MyCustomSettingsIcon);
 *
 *   <IconProvider overrides={{ logout: Shield }}>   // domain override
 *     <Icon name="logout" className="size-4" />
 *   </IconProvider>
 */

import * as React from "react";
import {
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Check,
  Moon,
  Sun,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Github,
  BookOpen,
  Building2,
  Users,
  Shield,
  CreditCard,
  LayoutDashboard,
  FileText,
  HelpCircle,
  LayoutGrid,
  List,
  TriangleAlert,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────────── */

export type IconComponent = React.ComponentType<{ className?: string; size?: number | string }>;

/** Semantic icon names used across facet components. */
export type IconName =
  | "settings"
  | "logout"
  | "chevronDown"
  | "search"
  | "check"
  | "moon"
  | "sun"
  | "bell"
  | "menu"
  | "close"
  | "chevronLeft"
  | "chevronRight"
  | "arrowRight"
  | "sparkles"
  | "github"
  | "bookOpen"
  | "building"
  | "users"
  | "shield"
  | "creditCard"
  | "dashboard"
  | "document"
  | "help"
  | "grid"
  | "list"
  | "triangleAlert";

/** Partial map used for overrides (IconProvider / registerIcon). */
export type IconOverrides = Partial<Record<IconName, IconComponent>>;

/* ── Built-in map ─────────────────────────────────────────── */

const defaultIcons: Record<IconName, IconComponent> = {
  settings: Settings,
  logout: LogOut,
  chevronDown: ChevronDown,
  search: Search,
  check: Check,
  moon: Moon,
  sun: Sun,
  bell: Bell,
  menu: Menu,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  arrowRight: ArrowRight,
  sparkles: Sparkles,
  github: Github,
  bookOpen: BookOpen,
  building: Building2,
  users: Users,
  shield: Shield,
  creditCard: CreditCard,
  dashboard: LayoutDashboard,
  document: FileText,
  help: HelpCircle,
  grid: LayoutGrid,
  list: List,
  triangleAlert: TriangleAlert,
};

/* ── Global registry ──────────────────────────────────────── */

const globalRegistry: Record<IconName, IconComponent> = { ...defaultIcons };

/** Register (or override) a global semantic icon. */
export function registerIcon(name: IconName, icon: IconComponent): void {
  globalRegistry[name] = icon;
}

/** Get the global icon for a name. */
export function getIcon(name: IconName): IconComponent {
  return globalRegistry[name];
}

/* ── Context (per-app / domain overrides) ─────────────────── */

const IconContext = React.createContext<IconOverrides | null>(null);

export interface IconProviderProps {
  /** Per-app overrides: { settings: MyIcon } */
  overrides?: IconOverrides;
  children: React.ReactNode;
}

export function IconProvider({ overrides, children }: IconProviderProps) {
  const parent = React.useContext(IconContext);
  const merged = React.useMemo(
    () => (parent ? { ...parent, ...overrides } : (overrides ?? null)),
    [parent, overrides],
  );
  return <IconContext.Provider value={merged}>{children}</IconContext.Provider>;
}

/* ── Icon component ───────────────────────────────────────── */

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  size?: number | string;
}

/** Renders the resolved icon for a semantic name (context overrides win). */
export function Icon({ name, className, size, ...props }: IconProps) {
  const overrides = React.useContext(IconContext);
  const Component = overrides?.[name] ?? globalRegistry[name];
  return <Component className={className} size={size} {...props} />;
}
