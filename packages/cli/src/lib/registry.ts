import type { PackageManager } from "./types.js";

/**
 * Every published @arcevo/facet-* package, used by `facet pkg`, `facet
 * doctor`, and `facet update` to check the registry and the consumer's
 * installed deps.
 */
export const ALL_FACET_PACKAGES = [
  "@arcevo/facet-auth",
  "@arcevo/facet-cli",
  "@arcevo/facet-components",
  "@arcevo/facet-docs",
  "@arcevo/facet-layout",
  "@arcevo/facet-sdk",
  "@arcevo/facet-tokens",
] as const;

export type AllFacetPackage = (typeof ALL_FACET_PACKAGES)[number];

/**
 * Facet packages a docs site depends on, with the npm registry name.
 * These are resolved to the CURRENT published version at init time, so a
 * scaffold never pins an outdated or guessed version.
 */
export const FACET_PACKAGES = [
  "@arcevo/facet-docs",
  "@arcevo/facet-tokens",
  "@arcevo/facet-components",
  "@arcevo/facet-layout",
] as const;

export type FacetPackage = (typeof FACET_PACKAGES)[number];

/** Fallback ranges used only when the registry is unreachable. These stay
 * loose (^) so the consumer's installer still pulls the latest compatible. */
const FALLBACK_RANGES: Record<FacetPackage, string> = {
  "@arcevo/facet-docs": "^1.0.0",
  "@arcevo/facet-tokens": "^1.0.0",
  "@arcevo/facet-components": "^1.0.0",
  "@arcevo/facet-layout": "^1.0.0",
};

/**
 * Resolve the current published versions of the facet packages from the
 * npm registry. Returns `name: "^x.y.z"` ranges so the consumer's
 * package manager resolves the latest compatible on install.
 *
 * Falls back to loose fallback ranges on network error. The registry is
 * only consulted for the facet scope (and the doc site's non-facet deps
 * use caret ranges), so we never claim a version we didn't verify.
 */
export async function resolveFacetVersions(): Promise<Record<FacetPackage, string>> {
  const result = { ...FALLBACK_RANGES } as Record<FacetPackage, string>;
  await Promise.all(
    FACET_PACKAGES.map(async (name) => {
      try {
        const res = await fetch(`https://registry.npmjs.org/${name}/latest`);
        if (!res.ok) return;
        const data = (await res.json()) as { version?: string };
        if (data.version) result[name] = `^${data.version}`;
      } catch {
        // Offline or registry hiccup: keep the loose fallback.
      }
    }),
  );
  return result;
}

/** Resolve the latest published version of a single npm package. Returns
 * undefined when the registry is unreachable or the package 404s.
 *
 * Robust against registry flakiness: retries once, then falls back to the
 * full packument's dist-tags.latest (the /latest endpoint can 429 or drop
 * connections under rate limiting). This matters for `facet up`/`facet
 * update` — a missed latest must never be reported as "up to date".
 */
export async function resolveLatestVersion(name: string): Promise<string | undefined> {
  // Try the lightweight /latest endpoint first (2 attempts).
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`https://registry.npmjs.org/${name}/latest`, {
        headers: { "User-Agent": "facet-cli" },
      });
      if (res.ok) {
        const data = (await res.json()) as { version?: string };
        if (data.version) return data.version;
      } else if (res.status !== 429 && res.status !== 503) {
        return undefined; // 404 or other hard error: package not found.
      }
    } catch {
      // network error; retry once below
    }
  }
  // Fallback: full packument -> dist-tags.latest (single retry).
  try {
    const res = await fetch(`https://registry.npmjs.org/${name}`, {
      headers: { "User-Agent": "facet-cli" },
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { "dist-tags"?: { latest?: string } };
    return data["dist-tags"]?.latest;
  } catch {
    return undefined;
  }
}

/** One-line summary of resolved versions for the CLI's "next steps". */
export function formatVersions(versions: Record<FacetPackage, string>): string {
  return Object.entries(versions)
    .map(([name, range]) => `  ${name}@${range}`)
    .join("\n");
}

/** Install command that adds the facet packages with resolved ranges. */
export function facetInstallCommand(
  pm: PackageManager,
  versions: Record<FacetPackage, string>,
): string {
  const pkgs = Object.entries(versions)
    .map(([name, range]) => `${name}@${range}`)
    .join(" ");
  switch (pm) {
    case "pnpm": return `pnpm add ${pkgs}`;
    case "yarn": return `yarn add ${pkgs}`;
    case "bun": return `bun add ${pkgs}`;
    default: return `npm install ${pkgs}`;
  }
}
