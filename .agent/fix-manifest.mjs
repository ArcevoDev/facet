import fs from "node:fs";
const p = "scripts/gen-docs-manifest.mjs";
let s = fs.readFileSync(p, "utf8");
const before = s.slice(0, 0);
s = s
  .replace(/^  consent-capture:/m, '  "consent-capture":')
  .replace(/^  cookie-banner:/m, '  "cookie-banner":')
  .replace(/^  qr-scanner:/m, '  "qr-scanner":');
fs.writeFileSync(p, s, "utf8");
// echo a tiny confirmation
const fixed = s.match(/^\s*"consent-capture":/m) && s.match(/^\s*"cookie-banner":/m) && s.match(/^\s*"qr-scanner":/m);
console.log("quotes fixed:", !!fixed);
