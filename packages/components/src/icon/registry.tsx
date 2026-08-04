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
  Copy,
  ChevronsUpDown,
  Compass,
  Layers,
  Palette,
  KeyRound,
  User,
  Upload,
  QrCode,
  Trash2,
} from "lucide-react";

/* ── Brand icons (inline SVG) ────────────────────────────── */

/**
 * GitHub mark as an inline SVG. lucide-react deprecated brand icons
 * (Github, Linkedin, Instagram, Facebook, ...), so we keep the semantic
 * "github" icon available without relying on them.
 */
function GithubIcon({ className, size }: { className?: string; size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="GitHub"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

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
  | "triangleAlert"
  | "copy"
  | "chevronUpDown"
  | "compass"
  | "layers"
  | "palette"
  | "keyRound"
  | "user"
  | "upload"
  | "qrcode"
  | "trash";

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
  github: GithubIcon,
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
  copy: Copy,
  chevronUpDown: ChevronsUpDown,
  compass: Compass,
  layers: Layers,
  palette: Palette,
  keyRound: KeyRound,
  user: User,
  upload: Upload,
  qrcode: QrCode,
  trash: Trash2,
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
