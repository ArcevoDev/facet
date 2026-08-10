/**
 * Shared types and helpers for the facet docs scaffold.
 *
 * The scaffold is intentionally framework/language-agnostic: the wizard
 * asks for the consumer's stack up front and the generator tailors the
 * output accordingly. Not everyone uses TypeScript or React+Vite.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export type Language = "typescript" | "javascript";

/** Frontend frameworks only. Backend stacks (Fastify, Express, Nest, ...)
 * don't affect the docs scaffold — docs are a frontend concern. */
export type Framework =
  | "react-vite"
  | "next"
  | "remix"
  | "plain-js"
  | "python";

/**
 * Where the generated docs live. Root (`.`) is recommended; consumers who
 * prefer their docs under the source tree choose `src/docs` or `docs`.
 */
export type DocsLocation = "." | "src/docs" | "docs";

/**
 * Where `facet add <component>` drops the copied source. A free-form
 * relative dir (default `src/components`), because it targets the
 * consumer's source tree, not the docs site.
 */
export type AddTarget = string;

/** What kind of documentation the consumer is publishing. */
export type TemplateKind = "component-library" | "api-reference" | "product-docs";

/** Styling setup detected in the consumer's repo. */
export type Styling =
  | "facet-tokens"
  | "tailwind"
  | "plain-css"
  | "none";

export interface DocsAnswers {
  /** Docs site name (defaults to "docs"). */
  name: string;
  /** Where the scaffold lands. "." recommended. */
  location: DocsLocation;
  /** Consumer's language. */
  language: Language;
  /** Consumer's framework. */
  framework: Framework;
  /** Consumer's styling setup. */
  styling: Styling;
  /** Whether to wire @arcevo/facet-tokens (recommended). */
  useFacetTokens: boolean;
  /** Docs template kind. */
  template: TemplateKind;
  /** Resolved current versions of the facet packages (npm registry). */
  facetVersions: Record<string, string>;
}

export interface GeneratedFile {
  /** Absolute path to write. */
  path: string;
  /** File contents. */
  content: string;
}

/**
 * Detect the consumer's styling setup from the cwd. Returns what's found
 * on disk so the wizard can recommend the facet path accurately.
 */
export function detectStyling(cwd: string): Styling {
  const has = (p: string) => existsSync(path.join(cwd, p));
  const read = (p: string) => {
    try {
      return readFileSync(path.join(cwd, p), "utf8");
    } catch {
      return "";
    }
  };
  const readJson = (p: string): Record<string, any> => {
    try {
      return JSON.parse(read(p)) as Record<string, any>;
    } catch {
      return {};
    }
  };

  // Facet tokens: tokens.css imported or @arcevo/facet-tokens in deps.
  const pkg = has("package.json") ? readJson("package.json") : {};
  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) } as Record<
    string,
    string
  >;
  if (deps["@arcevo/facet-tokens"] || read("src/app.css").includes("facet-tokens")) {
    return "facet-tokens";
  }
  if (deps.tailwindcss || has("tailwind.config.js") || has("tailwind.config.ts")) {
    return "tailwind";
  }
  if (has("src") && readdirSafe(path.join(cwd, "src")).some((f) => f.endsWith(".css"))) {
    return "plain-css";
  }
  return "none";
}

/** Package manager, detected so the "next steps" recommend the right
 * install command and the lockfile is generated fresh by the real tool. */
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

/**
 * Detect the consumer's package manager from lockfiles in cwd. Falls back
 * to npm (the safest default). Used to recommend the correct install
 * command after scaffolding instead of assuming pnpm.
 */
export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(cwd, "bun.lockb")) || existsSync(path.join(cwd, "bun.lock"))) return "bun";
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

/** Human-readable install command for the detected package manager. */
export function installCommand(pm: PackageManager): string {
  switch (pm) {
    case "pnpm": return "pnpm install";
    case "yarn": return "yarn install";
    case "bun": return "bun install";
    default: return "npm install";
  }
}

/**
 * Detect the consumer's FRONTEND framework from cwd. Backend-only markers
 * (fastify, express, nest, etc.) are deliberately ignored — a fullstack
 * repo like arc-id (Next.js + Fastify) should be detected as Next.js, and
 * the docs scaffold is a frontend concern.
 */
export function detectFramework(cwd: string): Framework {
  const has = (p: string) => existsSync(path.join(cwd, p));
  const read = (p: string) => {
    try {
      return readFileSync(path.join(cwd, p), "utf8");
    } catch {
      return "";
    }
  };
  const readJson = (p: string): Record<string, any> => {
    try {
      return JSON.parse(read(p)) as Record<string, any>;
    } catch {
      return {};
    }
  };
  const pkg = has("package.json") ? readJson("package.json") : {};
  const deps = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
  } as Record<string, string>;

  // Frontend-only signals, checked in priority order.
  if (deps.next || has("next.config.js") || has("next.config.mjs") || has("next.config.ts")) {
    return "next";
  }
  if (deps.remix || has("remix.config.js") || has("remix.config.mjs") || has("app/root.tsx")) {
    return "remix";
  }
  if (deps.vite || has("vite.config.ts") || has("vite.config.js") || has("vite.config.mjs")) {
    return "react-vite";
  }
  // If a package.json exists but no frontend framework is detected, the
  // repo is backend-only or unknown — plain-js is the safe fallback.
  if (has("package.json")) {
    return "plain-js";
  }
  if (has("pyproject.toml") || has("requirements.txt") || has("Pipfile")) {
    return "python";
  }
  return "plain-js";
}

/** Dev-server script for the detected frontend framework. */
export function devCommand(framework: Framework): string {
  switch (framework) {
    case "next": return "pnpm dev";
    case "remix": return "pnpm dev";
    case "react-vite": return "pnpm dev";
    default: return "Run the content pipeline";
  }
}

function readdirSafe(p: string): string[] {
  try {
    return readdirSync(p);
  } catch {
    return [];
  }
}
