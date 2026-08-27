import fs from "node:fs";
const base = "packages/components/src/ui";
const names = [
  "chart","consent-capture","cookie-banner","data-table-page","date-range-picker",
  "empty-state-page","glow-border-card","mention-input","multi-combobox","otp-input",
  "phone-input","pricing-comparison","qr-scanner","range-slider","rating-input",
  "rich-text-editor","shine-border-card","tag-input","tree","wizard-form-page",
];
for (const n of names) {
  const p = `${base}/${n}.tsx`;
  let s = "/* " + p + " */\n";
  try {
    const all = fs.readFileSync(p, "utf8").split("\n");
    // print first 120 lines (props + usage + signature)
    s += all.slice(0, 120).join("\n");
  } catch (e) {
    s += "READ ERROR: " + e.message;
  }
  console.log(s);
  console.log("\n\n=====NEXT=====\n");
}
