/**
 * @arcevo/facet-components: Icon registry
 *
 * Resolves semantic + lowercase kebab lucide icon names to components, so
 * consumers and domain presets can override icons without forking
 * components — and never need lucide-react installed themselves.
 *
 * Naming is lucide-style kebab-case throughout:
 *   <Icon name="settings" /> <Icon name="chevron-down" /> <Icon name="heart" />
 * (camelCase aliases like "chevronDown" still resolve for back-compat.)
 *
 * Resolution order:
 *   1. IconProvider context overrides (per-app / per-domain).
 *   2. registerIcon global overrides/additions.
 *   3. Built-in semantic map (settings, logout, github, ...).
 *   4. Lowercase lucide name map (any of lucide's 1.5k+ icons, e.g. "heart").
 *
 * Usage:
 *   import { Icon, registerIcon, IconProvider } from "@arcevo/facet-components";
 *
 *   registerIcon("settings", MyCustomSettingsIcon);
 *
 *   <IconProvider overrides={{ logout: Shield }}>   // domain override
 *     <Icon name="logout" size={16} />
 *   </IconProvider>
 *
 *   <Icon name="heart" />                          // any lucide icon
 */

import * as React from "react";
import { X, Building2, Trash2 } from "lucide-react";
import { lucideIconMap, type LucideIconName } from "./icon-map.js";
import { brandIcons } from "./brand-icons.js";

export type { LucideIconName } from "./icon-map.js";

/* ── Types ────────────────────────────────────────────────── */

export type IconComponent = React.ComponentType<{ className?: string; size?: number | string }>;

/**
 * Icon names accepted by the registry: the built-in semantic names (shown
 * for autocomplete) plus any lowercase lucide icon name. The `string & {}`
 * keeps the literals autocompleting while allowing any name at compile time.
 */
export type IconName = SemanticIconName | (string & {});

/** The built-in semantic names (lucide-style kebab-case). */
export type SemanticIconName =
  | "settings"
  | "logout"
  | "chevron-down"
  | "search"
  | "check"
  | "moon"
  | "sun"
  | "bell"
  | "menu"
  | "close"
  | "chevron-left"
  | "chevron-right"
  | "arrow-right"
  | "sparkles"
  | "github"
  | "book-open"
  | "building"
  | "users"
  | "shield"
  | "credit-card"
  | "dashboard"
  | "document"
  | "help"
  | "grid"
  | "list"
  | "triangle-alert"
  | "copy"
  | "chevron-up-down"
  | "compass"
  | "layers"
  | "palette"
  | "key-round"
  | "user"
  | "upload"
  | "qrcode"
  | "trash"
  /* Brand icons (inline SVG, independent of lucide) */
  | "linkedin"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "whatsapp"
  | "x"
  | "twitter"
  | "youtube"
  | "slack"
  | "discord"
  | "telegram"
  | "figma"
  | "spotify";

/** Partial map used for overrides (IconProvider / registerIcon). */
export type IconOverrides = Partial<Record<IconName, IconComponent>>;

/* ── Built-in map ─────────────────────────────────────────── */

/**
 * Semantic name -> lucide kebab key. Most semantic names match their
 * kebab form in lucide, but a few use lucide's own key (log-out, qr-code,
 * layout-dashboard, ...). `close` and `x` are the same glyph (X), and
 * building/trash use the -2 variants for the person/side variants. The
 * map is resolved through lucideIconMap (single import surface), so the
 * three exceptions above are the only direct lucide imports needed.
 */
const SEMANTIC_LUCIDE_KEYS: Partial<Record<SemanticIconName, LucideIconName>> = {
  settings: "settings",
  logout: "log-out",
  "chevron-down": "chevron-down",
  search: "search",
  check: "check",
  moon: "moon",
  sun: "sun",
  bell: "bell",
  menu: "menu",
  "chevron-left": "chevron-left",
  "chevron-right": "chevron-right",
  "arrow-right": "arrow-right",
  sparkles: "sparkles",
  "book-open": "book-open",
  building: "building",
  users: "users",
  shield: "shield",
  "credit-card": "credit-card",
  dashboard: "layout-dashboard",
  document: "file-text",
  help: "circle-question-mark",
  grid: "layout-grid",
  list: "list",
  "triangle-alert": "triangle-alert",
  copy: "copy",
  "chevron-up-down": "chevrons-up-down",
  compass: "compass",
  layers: "layers",
  palette: "palette",
  "key-round": "key-round",
  user: "user",
  upload: "upload",
  qrcode: "qr-code",
  trash: "trash",
};

/** Icons that don't resolve through the lucide name map (X glyph, -2 variants). */
const SEMANTIC_DIRECT: Partial<Record<SemanticIconName, IconComponent>> = {
  close: X,
  building: Building2,
  trash: Trash2,
};

const defaultIcons: Partial<Record<IconName, IconComponent>> = {
  ...Object.fromEntries(
    (Object.keys(SEMANTIC_LUCIDE_KEYS) as SemanticIconName[]).map((name) => {
      const key = SEMANTIC_LUCIDE_KEYS[name]!;
      return [name, lucideIconMap[key]];
    }),
  ),
  ...SEMANTIC_DIRECT,
  ...brandIcons,
};

/* ── Global registry ──────────────────────────────────────── */

const globalRegistry: Partial<Record<IconName, IconComponent>> = { ...defaultIcons };

/** Normalize camelCase (or mixed) names to the lucide kebab form: "chevronDown" -> "chevron-down". */
export function toKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/** Resolve a raw name (as typed) through the full lookup chain. */
function resolveIcon(name: string): IconComponent | undefined {
  return (
    globalRegistry[name] ??
    globalRegistry[toKebab(name)] ??
    lucideIconMap[name as LucideIconName] ??
    lucideIconMap[toKebab(name) as LucideIconName]
  );
}

/** Register (or override) a global icon. */
export function registerIcon(name: IconName, icon: IconComponent): void {
  globalRegistry[name] = icon;
}

/** Get the global icon for a name (semantic, registered, or lucide). */
export function getIcon(name: IconName): IconComponent | undefined {
  return resolveIcon(name);
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
  // Normalize override keys (camelCase -> kebab) so consumers can pass either.
  const normalized = React.useMemo(() => {
    if (!overrides) return null;
    const out: IconOverrides = {};
    for (const [key, icon] of Object.entries(overrides)) out[toKebab(key)] = icon;
    return out;
  }, [overrides]);
  const merged = React.useMemo(
    () => (parent ? { ...parent, ...normalized } : normalized),
    [parent, normalized],
  );
  return <IconContext.Provider value={merged}>{children}</IconContext.Provider>;
}

/* ── Icon component ───────────────────────────────────────── */

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  size?: number | string;
}

/** Renders the resolved icon for a name (context overrides win, then global, then lucide). */
export function Icon({ name, className, size, ...props }: IconProps) {
  const overrides = React.useContext(IconContext);
  const kebab = toKebab(name);
  const Component =
    overrides?.[kebab] ?? overrides?.[name] ?? resolveIcon(name);
  if (!Component) return null;
  return <Component className={className} size={size} {...props} />;
}
