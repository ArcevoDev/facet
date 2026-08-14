const fs = require("fs");
const css = fs.readFileSync("packages/tokens/src/tokens.css", "utf8");

// Split into :root (dark) and [data-theme="light"] blocks.
const darkBlock = css.slice(css.indexOf(":root"), css.indexOf("[data-theme"));
const lightBlock = css.slice(css.indexOf('[data-theme="light"]'));

const darkTokens = new Set([...darkBlock.matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]));
const lightTokens = new Set([...lightBlock.matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]));

const missingInLight = [...darkTokens].filter((t) => !lightTokens.has(t));
const missingInDark = [...lightTokens].filter((t) => !darkTokens.has(t));

console.log("dark tokens:", darkTokens.size, "| light tokens:", lightTokens.size);
console.log("tokens in dark but MISSING in light:", missingInLight.length);
for (const t of missingInLight) console.log("  -", t);
console.log("tokens in light but MISSING in dark:", missingInDark.length);
for (const t of missingInDark) console.log("  -", t);

// Check core surface tokens exist in BOTH.
const core = [
  "background", "foreground", "card", "card-foreground", "popover",
  "popover-foreground", "primary", "primary-foreground", "secondary",
  "secondary-foreground", "muted", "muted-foreground", "accent",
  "accent-foreground", "destructive", "destructive-foreground", "border",
  "input", "ring", "radius", "sidebar",
];
console.log("\ncore surface parity:");
for (const t of core) {
  const hasDark = darkTokens.has(t);
  const hasLight = lightTokens.has(t);
  if (!hasDark || !hasLight) console.log(`  ${hasDark && hasLight ? "OK" : "MISSING"} --${t} (dark:${hasDark} light:${hasLight})`);
}
console.log("(only missing lines shown; silence = full parity)");
