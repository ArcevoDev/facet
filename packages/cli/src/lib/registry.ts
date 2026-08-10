import type { PackageManager } from "./types.js";

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
        // Offline or registry hiccup — keep the loose fallback.
      }
    }),
  );
  return result;
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
