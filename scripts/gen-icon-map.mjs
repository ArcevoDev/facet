/**
 * Generates packages/components/src/icon/icon-map.ts from the installed
 * lucide-react package.
 *
 * Parses lucide-react's export declarations and emits a module
 * with a named import per icon plus a lowercase-name -> component map.
 * Named imports keep the map tree-shakeable: bundlers only keep the icons
 * facet and its consumers actually use.
 *
 * Any icon marked @deprecated in lucide's own .d.ts is EXCLUDED: that
 * covers brand/social icons (github, facebook, ...) plus others like
 * Chrome and Framer that lucide is removing. Facet ships brand icons as
 * inline SVGs in brand-icons.tsx (see registry.tsx -> SemanticIconName).
 *
 * Run:  node scripts/gen-icon-map.mjs
 */

import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(
  fileURLToPath(new URL("../packages/components/package.json", import.meta.url)),
);
const pkgPath = require.resolve("lucide-react/package.json");
const lucideVersion = require("lucide-react/package.json").version;
const pkgDir = dirname(pkgPath);

// Locate type definition file for deprecations and exports parsing
const possibleDtsPaths = [
  join(pkgDir, "dist/lucide-react.d.ts"),
  join(pkgDir, "dist/types/lucide-react.d.ts"),
  join(pkgDir, "lucide-react.d.ts"),
];

let dtsPath = possibleDtsPaths.find((p) => existsSync(p));
let dtsContent = dtsPath ? readFileSync(dtsPath, "utf8") : "";

// 1. Extract deprecated icons from .d.ts
const DEPRECATED = new Set();
if (dtsContent) {
  for (const block of dtsContent.matchAll(/\/\*\*([\s\S]*?)\*\//g)) {
    if (block[1].includes("@deprecated")) {
      const name = block[1].match(/@name (\w+)/);
      if (name) DEPRECATED.add(name[1]);
    }
  }
}

// 2. Parse component export names from ESM build index files or .d.ts
const possibleIndexPaths = [
  join(pkgDir, "dist/esm/icons/index.js"),
  join(pkgDir, "dist/esm/lucide-react.js"),
  join(pkgDir, "dist/esm/icons/index.mjs"),
  join(pkgDir, "dist/lucide-react.js"),
];

let indexContent = "";
let indexPath = possibleIndexPaths.find((p) => existsSync(p));

if (indexPath) {
  indexContent = readFileSync(indexPath, "utf8");
}

let exportNames = [];

if (indexContent) {
  // Matches: export { default as IconName } from ... or export { IconName } from ...
  const matches = indexContent.matchAll(/export\s+\{\s*(?:default\s+as\s+)?([A-Z]\w+)\s*\}/g);
  exportNames = [...matches].map((m) => m[1]);
}

// Fallback: Parse directly from .d.ts if JS index regex yields nothing
if (exportNames.length === 0 && dtsContent) {
  const dtsMatches = dtsContent.matchAll(/declare\s+const\s+([A-Z]\w+)\s*:\s*LucideIcon/g);
  exportNames = [...dtsMatches].map((m) => m[1]);
}

function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

// Map each export name to its canonical lowercase name (first export wins).
const seen = new Map(); // canonical lowercase -> component export name
for (const name of exportNames) {
  if (DEPRECATED.has(name) || name === "LucideIcon" || name === "LucideProps") continue;
  const key = toKebab(name);
  if (!seen.has(key)) seen.set(key, name);
}

const imports = [...seen.values()].map((n) => `  ${n},`).join("\n");
const mapEntries = [...seen.entries()]
  .map(([kebab, name]) => `  "${kebab}": ${name},`)
  .join("\n");

// Drift guard: every lucide component that semantic-icons.ts imports directly
// must still be exported (and not deprecated) by the installed lucide-react.
// lucide renames/deprecates icons between versions (e.g. HelpCircle ->
// CircleQuestionMark in 1.30.0), which used to surface as a confusing
// "not assignable to LucideIconName" type error. Fail here, at
// generation/check time, with the offending import named.
const semanticPath = fileURLToPath(
  new URL("../packages/components/src/icon/semantic-icons.ts", import.meta.url),
);
const semanticSrc = readFileSync(semanticPath, "utf8");
const importBlock = semanticSrc.match(/import\s*\{([\s\S]*?)\}\s*from\s*"lucide-react"/);
const semanticImports = importBlock
  ? [...importBlock[1].matchAll(/\b([A-Z]\w*)\b/g)].map((m) => m[1])
  : [];
const exportSet = new Set(exportNames);
const missingSemantic = semanticImports.filter(
  (n) => !exportSet.has(n) || DEPRECATED.has(n),
);
if (missingSemantic.length > 0) {
  console.error(
    `Drift detected: semantic-icons.ts imports lucide components missing from lucide-react v${lucideVersion}:`,
  );
  for (const n of missingSemantic) console.error(`  - ${n}`);
  console.error(
    `These were renamed/deprecated in lucide v${lucideVersion}. Update the import and its SEMANTIC_ICONS entry in semantic-icons.ts to the current lucide name.`,
  );
  process.exit(1);
}

// --check mode: verify the map + semantic keys are in sync without
// rewriting the generated file (used by the check:icons gate).
const out = `/**
 * AUTO-GENERATED by scripts/gen-icon-map.mjs: DO NOT EDIT BY HAND.
 *
 * Lowercase-name -> lucide-react component map covering every icon lucide
 * ships (${seen.size} icons at v${lucideVersion}).
 * Regenerate with:
 *
 *   node scripts/gen-icon-map.mjs
 */

import {
${imports}
} from "lucide-react";

/** Every icon name lucide ships, in lowercase-kebab form (e.g. "alarm-clock"). */
export type LucideIconName = ${[...seen.keys()].map((k) => `"${k}"`).join(" | ")};

/** Lowercase name -> lucide icon component. */
export const lucideIconMap: Record<LucideIconName, import("lucide-react").LucideIcon> = {
${mapEntries}
};

export const lucideIconNames = Object.keys(lucideIconMap) as LucideIconName[];
`;

const target = fileURLToPath(
  new URL("../packages/components/src/icon/icon-map.ts", import.meta.url),
);

if (process.argv.includes("--check")) {
  const current = readFileSync(target, "utf8");
  if (current === out) {
    console.log(`icon-map.ts is up to date (${seen.size} icons @ lucide v${lucideVersion}).`);
    process.exit(0);
  }
  console.error(
    `icon-map.ts is OUT OF DATE (${seen.size} icons @ lucide v${lucideVersion} vs the file on disk). Run: node scripts/gen-icon-map.mjs`,
  );
  process.exit(1);
}

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, out);
console.log(`Wrote ${target} (${seen.size} icons)`);