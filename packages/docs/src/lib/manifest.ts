/**
 * Extended gallery manifest.
 *
 * The auto-generated `docsManifest` covers the 57 UI components in
 * `@arcevo/facet-components`. The gallery should also preview auth and
 * layout surfaces, so this module merges hand-written entries for the
 * `@arcevo/facet-auth` and `@arcevo/facet-layout` packages into a single
 * `extendedManifest` that the gallery (index + detail pages + sidebar
 * section) consumes.
 *
 * The foundations entries (Icon, Theme) stay in `docsManifest` but are
 * excluded from the Components sidebar: they have their own guide pages
 * under the Foundations section.
 */

import { docsManifest, type DocsManifestEntry } from "../manifest.js";

export type { DocsManifestEntry } from "../manifest.js";

/** Auth + layout entries that are previewable in the gallery. */
export const extendedEntries: DocsManifestEntry[] = [
  // ── Auth (@arcevo/facet-auth) ────────────────────────────────
  {
    name: "Sign In",
    slug: "sign-in",
    description:
      "Configurable sign-in state machine: email + password, magic link, passkey, OAuth, and forgot password.",
    category: "auth",
  },
  {
    name: "Sign Up",
    slug: "sign-up",
    description: "Account creation with appearance / config / slots customization.",
    category: "auth",
  },
  {
    name: "MFA Dialog",
    slug: "mfa-dialog",
    description: "The MFA challenge in a dialog, with verify / setup / recovery phases.",
    category: "auth",
  },
  {
    name: "Guard",
    slug: "guard",
    description: "Renders its children only when a session is present; falls back otherwise.",
    category: "auth",
  },
  // ── Layout (@arcevo/facet-layout) ────────────────────────────
  {
    name: "Console Layout",
    slug: "console-layout",
    description: "Dashboard shell: sidebar + topbar + content area, full or rail mode.",
    category: "layout",
  },
  {
    name: "Auth Layout",
    slug: "auth-layout",
    description: "Branded split-panel auth page frame: logo + tagline + benefits on the left.",
    category: "layout",
  },
  {
    name: "Landing Layout",
    slug: "landing-layout",
    description: "Full-bleed marketing shell with a glassmorphic hero.",
    category: "layout",
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    description: "Collapsible, resizable navigation rail driven by a LayoutConfig.",
    category: "layout",
  },
  {
    name: "Topbar",
    slug: "topbar",
    description: "Application top bar with breadcrumb, search, and actions.",
    category: "layout",
  },
];

/** All previewable gallery entries: components + auth + layout. */
export const extendedManifest: DocsManifestEntry[] = [...docsManifest, ...extendedEntries];
