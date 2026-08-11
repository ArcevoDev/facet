import type { IconName } from "@arcevo/facet-components";

/** Live library stats, verified against the packages on every release. */
export const STATS = [
  { value: "57", label: "components" },
  { value: "10", label: "API SDKs" },
  { value: "5", label: "layout shells" },
  { value: "5", label: "auth presets" },
] as const;

export interface Package {
  name: string;
  desc: string;
  version: string;
  /** Semantic icon name resolved through @arcevo/facet-components' Icon registry. */
  icon: IconName;
}

/** The six published packages (versions verified 2026-08 against npm). */
export const PACKAGES: Package[] = [
  {
    name: "@arcevo/facet-components",
    desc: "57 styled, accessible React components built on Radix primitives.",
    version: "1.1.0",
    icon: "boxes",
  },
  {
    name: "@arcevo/facet-docs",
    desc: "Installable docs engine: mount <DocsApp> with your own brand, nav, and pages.",
    version: "1.1.0",
    icon: "book-open",
  },
  {
    name: "@arcevo/facet-auth",
    desc: "SignIn, SignUp, Guard, MFA and forms with per-domain presets.",
    version: "1.0.3",
    icon: "shield-check",
  },
  {
    name: "@arcevo/facet-layout",
    desc: "Console, auth and landing shells with a collapsible icon rail.",
    version: "1.1.0",
    icon: "building",
  },
  {
    name: "@arcevo/facet-sdk",
    desc: "Typed fetch client for arc-id: 10 domain SDKs, zero React.",
    version: "1.0.1",
    icon: "zap",
  },
  {
    name: "@arcevo/facet-tokens",
    desc: "Alpha Palette design tokens: color, type, spacing, surfaces.",
    version: "1.0.1",
    icon: "palette",
  },
];

export interface Feature {
  title: string;
  desc: string;
  /** Semantic icon name resolved through the Icon registry. */
  icon: IconName;
}

export const FEATURES: Feature[] = [
  {
    title: "Radix quality",
    desc: "Accessible primitives with keyboard support and focus management, so you don't have to build them.",
    icon: "puzzle",
  },
  {
    title: "Themeable tokens",
    desc: "CSS variables for colors and spacing. Dark mode included. Swap into any project without changing markup.",
    icon: "palette",
  },
  {
    title: "Auth orchestration",
    desc: "A sign-in flow with MFA, passkeys and magic links that works with your backend.",
    icon: "lock",
  },
  {
    title: "Typed SDK",
    desc: "A TypeScript client for your identity API. Call it from the browser, not just the server.",
    icon: "zap",
  },
  {
    title: "Layout shells",
    desc: "Console, app and landing shells with sidebar, topbar and mobile support. Bring your own router.",
    icon: "ruler",
  },
  {
    title: "Your domain",
    desc: "Presets for fintech, healthcare and education. Extend them or build your own.",
    icon: "building",
  },
  {
    title: "Passkeys & MFA",
    desc: "WebAuthn passkeys, TOTP and recovery codes wired straight into the auth flow.",
    icon: "fingerprint-pattern",
  },
];

export interface InstallStep {
  num: string;
  label: string;
  code: string;
}

export const INSTALL_STEPS: InstallStep[] = [
  {
    num: "01",
    label: "Install",
    code: "pnpm add @arcevo/facet-components @arcevo/facet-auth @arcevo/facet-layout @arcevo/facet-sdk @arcevo/facet-docs",
  },
  {
    num: "02",
    label: "Import tokens",
    code: '@import "@arcevo/facet-tokens/tokens.css"',
  },
  {
    num: "03",
    label: "Use components",
    code: `import { Button, Card } from "@arcevo/facet-components"`,
  },
  {
    num: "04",
    label: "Wire auth",
    code: "<ArcProvider client={client}>...</ArcProvider>",
  },
  {
    num: "05",
    label: "Deploy",
    code: "pnpm build && pnpm changeset publish",
  },
];

export const BUTTON_VARIANTS: Array<
  "default" | "outline" | "secondary" | "ghost" | "glass" | "glow"
> = ["default", "outline", "secondary", "ghost", "glass", "glow"];

export const BADGE_VARIANTS: Array<
  "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
> = ["default", "secondary", "outline", "success", "warning", "destructive"];
