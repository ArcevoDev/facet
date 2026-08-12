#!/usr/bin/env node
import { createRequire } from "node:module";
import { Command } from "commander";
import { runInitWizard } from "./lib/wizard.js";
import { generateReactVite } from "./lib/generators.js";
import { generatePlainJs, generateNext, generatePython, generateRemix, generateComponentAdd, type AddPlacement } from "./lib/generators-plain.js";
import { writeFiles } from "./lib/writer.js";
import {
  detectPackageManager,
  installCommand,
  detectMonorepo,
  type DocsLocation,
  type Framework,
  type Styling,
  type TemplateKind,
} from "./lib/types.js";
import { facetInstallCommand } from "./lib/registry.js";
import {
  collectFacetPackageState,
  formatPackageTable,
  buildDoctorReport,
  planUpdates,
  updateCommand,
} from "./lib/commands.js";

const program = new Command();
const require = createRequire(import.meta.url);
const { version } = require("../package.json") as { version: string };

program
  .name("facet")
  .description("Scaffold and generate @arcevo/facet-docs sites. Framework/language-agnostic.")
  .version(version)
  .addHelpText(
    "after",
    "\nFull docs and examples: https://docs.facet.arcevocirqle.com.ng/cli\n",
  );

// `facet docs init`: a `docs` group with an `init` subcommand. (Commander
// treats a two-word string as a command + required positional, so `docs`
// must be its own command with `init` nested under it.)
program
  .command("docs")
  .description("Docs site commands")
  .command("init")
  .description("Scaffold a docs site in the current repo (interactive wizard)")
  .option("-y, --yes", "Non-interactive: decide the best setup for me (detected framework + styling)")
  .option("--name <name>", "Docs site name (default: docs)")
  .option("--location <location>", "Where the scaffold lives: . (root, recommended), docs, or src/docs (default: .)")
  .option("--language <language>", "TypeScript or JavaScript (default: TypeScript)")
  .option("--framework <framework>", "react-vite, next, remix, plain-js, or python (default: detected)")
  .option("--styling <styling>", "facet-tokens, tailwind, plain-css, or none (default: detected)")
  .option("--no-tokens", "Do not wire @arcevo/facet-tokens theming")
  .option("--template <template>", "component-library, api-reference, or product-docs (default: component-library)")
  .option("--barrel <mode>", "Create a barrel export for the generated site: auto (create when it fits, default), always, or never")
  .action(async (opts: {
    yes?: boolean;
    name?: string;
    location?: string;
    language?: string;
    framework?: string;
    styling?: string;
    tokens?: boolean;
    template?: string;
    barrel?: string;
  }) => {
    const cwd = process.cwd();
    const { answers, decided } = await runInitWizard(cwd, {
      yes: opts.yes,
      name: opts.name,
      location: opts.location as DocsLocation | undefined,
      language: opts.language as "typescript" | "javascript" | undefined,
      framework: opts.framework as Framework | undefined,
      styling: opts.styling as Styling | undefined,
      useFacetTokens: opts.tokens,
      template: opts.template as TemplateKind | undefined,
      barrel:
        opts.barrel === "never" ? false : opts.barrel === "always" ? true : "auto",
    });
    const pm = detectPackageManager(cwd);

    if (decided) {
      console.log("Decide-for-me mode: chose the best setup for your repo.");
      console.log(`  framework: ${answers.framework} (detected)`);
      console.log(`  styling:   ${answers.styling} (detected)`);
      console.log(`  location:  ${answers.location}`);
      console.log(`  barrel:    ${answers.barrel === true ? "always" : answers.barrel === false ? "never" : "auto (create when it fits)"}`);
      console.log("Override any choice with the matching flag (e.g. --framework next).");
    }

    // Tailor the generator to the chosen stack.
    const files =
      answers.framework === "react-vite"
        ? generateReactVite(answers, cwd)
        : answers.framework === "next"
          ? generateNext(answers, cwd)
          : answers.framework === "remix"
            ? generateRemix(answers, cwd)
            : answers.framework === "python"
              ? generatePython(answers, cwd)
              : generatePlainJs(answers, cwd);

    const written = writeFiles(files);

    console.log(`\nScaffolded ${answers.name} docs (${answers.framework}) at ${answers.location}`);
    console.log("Wrote:");
    for (const f of written) console.log(`  ${f}`);
    console.log(`\nNext steps:`);
    console.log(`  ${facetInstallCommand(pm, answers.facetVersions)}`);
    if (answers.framework === "react-vite") {
      console.log(`  ${installCommand(pm)} && pnpm dev   # open the docs site`);
    } else if (answers.framework === "next") {
      console.log(`  ${installCommand(pm)} && pnpm dev   # docs live at /docs`);
    } else if (answers.framework === "remix") {
      console.log(`  ${installCommand(pm)} && pnpm dev   # docs live at /docs`);
    } else if (answers.framework === "python") {
      console.log("  Add markdown under ./content and run: python docs_pipeline.py > pages.json");
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
  .option("--dir <dir>", "Components directory (default: src/components)", "src/components")
  .option("--ui-dir <uiDir>", "Subdirectory that holds the copies (default: facet; ignored with --flat)", "facet")
  .option("--flat", "Place components directly in --dir instead of a subdirectory")
  .option("--no-barrel", "Do not create or update any barrel export")
  .option("--barrel", "Always create a barrel export (even when one does not exist yet)")
  .action(async (component: string, opts: { js?: boolean; dir?: string; uiDir?: string; flat?: boolean; barrel?: boolean }) => {
    const cwd = process.cwd();
    const answers = {
      language: (opts.js ? "javascript" : "typescript") as "typescript" | "javascript",
      target: opts.dir as string,
      placement: (opts.flat ? "flat" : "decide") as AddPlacement,
      dir: opts.uiDir as string,
      barrel: opts.barrel === undefined ? ("auto" as const) : opts.barrel,
    };
    const files = generateComponentAdd(component, cwd, answers);
    const written = writeFiles(files);
    console.log(`Copied ${component} to ${written[0]}`);
    const barrel = written.find((f) => f.endsWith(`/index.${answers.language === "javascript" ? "js" : "ts"}`));
    if (barrel) console.log(`Barrel: ${barrel}`);
    console.log("Note: importing from @arcevo/facet-components is recommended over copying source.");
  });

program
  .command("pkg")
  .description("Show the latest published facet package versions and what this repo has installed")
  .action(async () => {
    const cwd = process.cwd();
    const infos = await collectFacetPackageState(cwd);
    console.log("facet packages");
    console.log("");
    console.log(formatPackageTable(infos));
    console.log("");
    const outdated = infos.filter((i) => i.outdated);
    if (outdated.length) {
      console.log(`${outdated.length} update(s) available. Run \`facet update\` to see how.`);
    } else {
      console.log("All installed facet packages are up to date (or not installed here).");
    }
  });

program
  .command("doctor")
  .description("Audit this repo: monorepo layout, facet deps, and best-practice suggestions")
  .action(async () => {
    const cwd = process.cwd();
    const infos = await collectFacetPackageState(cwd);
    const report = buildDoctorReport(cwd, infos);
    console.log("facet doctor");
    console.log("");
    for (const f of report.findings) console.log(`  ${f}`);
    console.log("");
    if (report.suggestions.length) {
      console.log("Suggestions:");
      for (const s of report.suggestions) console.log(`  - ${s}`);
    } else {
      console.log("No suggestions: your facet setup looks healthy.");
    }
    if (report.monorepo) {
      console.log("");
      console.log("Monorepo detected: run \`facet update\` from the workspace root to update all members.");
    }
  });

program
  .command("update")
  .description("Show (and prepare) updates for installed facet packages")
  .option("--dry-run", "Only print the update commands without running anything", true)
  .action(async (opts: { dryRun?: boolean }) => {
    const cwd = process.cwd();
    const infos = await collectFacetPackageState(cwd);
    const outdated = planUpdates(infos);
    if (!outdated.length) {
      console.log("All installed facet packages are up to date.");
      return;
    }
    const pm = detectPackageManager(cwd);
    const workspace = detectMonorepo(cwd) !== null;
    const targets = outdated
      .filter((i): i is typeof i & { latest: string } => Boolean(i.latest))
      .map((i) => ({ name: i.name, latest: i.latest! }));
    console.log("Updates available:");
    for (const t of targets) {
      const info = infos.find((i) => i.name === t.name);
      console.log(`  ${t.name}: ${info?.installed ?? "not installed"} -> ^${t.latest}`);
    }
    console.log("");
    console.log(updateCommand(pm, targets, workspace));
    if (opts.dryRun) {
      console.log("");
      console.log("(dry run) Run the command above to apply the updates.");
    }
  });

program.parse(process.argv);
