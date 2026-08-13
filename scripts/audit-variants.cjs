const fs = require("fs");
const variants = fs.readFileSync("packages/docs/src/lib/variants.tsx", "utf8");
const manifest = fs.readFileSync("packages/docs/src/manifest.ts", "utf8");

// Slugs in the manifest (ui components).
const slugs = [...manifest.matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1]);

// Which slugs have a variantCells case.
const cases = new Set([...variants.matchAll(/case "([^"]+)":/g)].map((m) => m[1]));

console.log("Components WITHOUT a variantCells case (missing variants):");
const missing = slugs.filter((s) => !cases.has(s));
for (const s of missing) console.log("  -", s);
console.log("total missing:", missing.length, "of", slugs.length);
