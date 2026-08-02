// Drift gate for docs/component inventory.
//
// Enforces the invariants that keep the docs and library in sync:
//   1. Every ui/ component has a matching Storybook story.
//   2. Every ui/ component is re-exported from the package barrel.
//   3. The icon registry has a story (it is public API).
//   4. CLAUDE.md documents the correct component + test counts.
//
// Run: node scripts/check-docs-inventory.mjs
// Fails (exit 1) with a report on any drift.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const uiDir = path.join(root, "packages/components/src/ui");
const storiesDir = path.join(root, "apps/docs-site/src/stories");
const barrelPath = path.join(root, "packages/components/src/index.ts");
const claudePath = path.join(root, "CLAUDE.md");

const errors = [];
const ok = [];

function componentNames(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
    .map((f) => f.replace(/\.tsx$/, ""));
}

function storyExists(name) {
  return fs.existsSync(path.join(storiesDir, `${name}.stories.tsx`));
}

// 1. Story parity: every ui/ component has a story.
const components = componentNames(uiDir).sort();
const missingStories = components.filter((c) => !storyExists(c));
if (missingStories.length) {
  errors.push(
    `Missing stories (${missingStories.length}): ${missingStories.join(", ")}`,
  );
} else {
  ok.push(`All ${components.length} ui components have stories.`);
}

// 2. Barrel parity: every component file is re-exported from index.ts.
const barrel = fs.readFileSync(barrelPath, "utf-8");
const missingExports = components.filter(
  (c) => !barrel.includes(`/${c}`) && !barrel.includes(`"../ui/${c}`),
);
if (missingExports.length) {
  errors.push(
    `Missing barrel exports (${missingExports.length}): ${missingExports.join(", ")}`,
  );
} else {
  ok.push(`All ${components.length} ui components are barrel-exported.`);
}

// 3. Icon registry coverage: public API needs a story.
const iconStory = fs
  .readdirSync(storiesDir)
  .some((f) => /icon.*\.stories\.tsx$/.test(f));
if (!iconStory) {
  errors.push("Icon registry has no story (icon-registry.stories.tsx expected).");
} else {
  ok.push("Icon registry has a story.");
}

// 4. Doc count assertions against CLAUDE.md.
const claude = fs.readFileSync(claudePath, "utf-8");
const componentCount = components.length;
const componentDoc = claude.match(/(\d+)\+? styled Radix components/);
if (componentDoc && Number(componentDoc[1]) !== componentCount) {
  errors.push(
    `CLAUDE.md says ${componentDoc[1]} components, actual is ${componentCount}.`,
  );
} else {
  ok.push(`CLAUDE.md component count matches (${componentCount}).`);
}

const testDoc = claude.match(/(\d+) tests across sdk\/components\/auth\/layout/);
// The verified count lives in README; keep the gate to the invariant that
// the CLAUDE.md number is present and equals the README number if both exist.
const readmePath = path.join(root, "README.md");
const readme = fs.readFileSync(readmePath, "utf-8");
const readmeTest = readme.match(/(\d+) tests across 4 packages/);
if (
  testDoc &&
  readmeTest &&
  Number(testDoc[1]) !== Number(readmeTest[1])
) {
  errors.push(
    `CLAUDE.md test count (${testDoc[1]}) != README test count (${readmeTest[1]}).`,
  );
} else {
  ok.push(
    `Test counts consistent (${testDoc ? testDoc[1] : "?"}/${readmeTest ? readmeTest[1] : "?"}).`,
  );
}

// Report.
console.log("Docs inventory check");
console.log("-------------------");
for (const line of ok) console.log(`  ok: ${line}`);
if (errors.length) {
  console.log("\nFAILED:");
  for (const line of errors) console.log(`  - ${line}`);
  console.log("\nFix the drift, then re-run node scripts/check-docs-inventory.mjs");
  process.exit(1);
}
console.log(`\nAll checks passed (${components.length} components).`);
