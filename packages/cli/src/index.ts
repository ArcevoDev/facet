#!/usr/bin/env node
import { Command } from "commander";
import { runInitWizard } from "./lib/wizard.js";
import { generateReactVite } from "./lib/generators.js";
import { generatePlainJs, generateComponentAdd } from "./lib/generators-plain.js";
import { writeFiles } from "./lib/writer.js";
import { detectPackageManager, installCommand } from "./lib/types.js";
import { facetInstallCommand } from "./lib/registry.js";

const program = new Command();

program
  .name("facet")
  .description("Scaffold and generate @arcevo/facet-docs sites. Framework/language-agnostic.")
  .version("0.1.0");

program
  .command("docs init")
  .description("Scaffold a docs site in the current repo (interactive wizard)")
  .action(async () => {
    const cwd = process.cwd();
    const answers = await runInitWizard(cwd);
    const pm = detectPackageManager(cwd);

    // Tailor the generator to the chosen stack.
    const files =
      answers.framework === "react-vite"
        ? generateReactVite(answers, cwd)
        : generatePlainJs(answers, cwd);

    const written = writeFiles(files);

    console.log(`\nScaffolded ${answers.name} docs (${answers.framework}) at ${answers.location}`);
    console.log("Wrote:");
    for (const f of written) console.log(`  ${f}`);
    console.log(`\nNext steps:`);
    console.log(`  ${facetInstallCommand(pm, answers.facetVersions)}`);
    if (answers.framework === "react-vite") {
      console.log(`  ${installCommand(pm)} && pnpm dev   # open the docs site`);
    } else {
      console.log("  Add markdown under ./content and run the content pipeline.");
    }
    if (answers.useFacetTokens) {
      console.log("  Theming: @arcevo/facet-tokens is wired via ThemeProvider + overrideVars.");
    }
    console.log("\nFacet packages resolved from the npm registry at init time (no pinned versions):");
    for (const [name, range] of Object.entries(answers.facetVersions)) {
      console.log(`  ${name}@${range}`);
    }
  });

program
  .command("add <component>")
  .description("Copy a component into your source (shadcn-style). Recommended: import from the package instead.")
  .option("--js", "Generate JavaScript instead of TypeScript")
  .action(async (component: string, opts: { js?: boolean }) => {
    const cwd = process.cwd();
    const answers = {
      language: (opts.js ? "javascript" : "typescript") as "typescript" | "javascript",
      target: "src/components" as string,
    };
    const files = generateComponentAdd(component, cwd, answers);
    const written = writeFiles(files);
    console.log(`Copied ${component} to ${written[0]}`);
    console.log("Note: importing from @arcevo/facet-components is recommended over copying source.");
  });

program.parse(process.argv);
