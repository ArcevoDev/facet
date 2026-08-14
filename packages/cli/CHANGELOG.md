# @arcevo/facet-cli

## 0.4.0

### Minor Changes

- 8595d91: feat(cli): facet docs scan — read the repo and draft documentation

  `facet docs scan` inspects the current repo and drafts a documentation
  layer for review:

  - Detects the stack: package manager, monorepo layout, framework
    (next/remix/react-vite/plain-js/python), language, styling, and
    @arcevo/facet-* usage.
  - Detects the API surface: Fastify + @fastify/swagger (dynamic mode,
    OpenAPI info + a bounded route inventory from route files) or a
    committed openapi.json/swagger.json.
  - Detects existing docs: README, docs/ tree, planning files.
  - Drafts pages (Overview, Getting Started, API Reference with a
    method/path/schema table per route group) + a docs config for the
    facet-docs engine, plus a normalized openapi.json.

  Non-destructive: refuses to overwrite existing files without --yes.
  Then run `facet docs init` to mount the drafted site.

## 0.3.1

### Patch Changes

- 9599bfe: fix(cli): facet up/pkg now detect installed versions correctly

  `readInstalledVersion` built paths ending at the package directory but
  read them as files, so `fs.readFileSync` threw EISDIR and `installed`
  always showed `-` — which made `facet up` report "All up to date" even
  when updates existed (e.g. auth 1.1.1 vs latest 1.1.3). The path now
  appends `package.json`, so `facet pkg` shows real installed versions and
  `facet up` offers the correct updates. Regression tests added.

## 0.3.0

### Minor Changes

- feat(cli): add clean/scripts/prep/up commands + doctor dep detection + alias-aware imports; layout: full/rail sidebar + verified section behavior

  CLI — new commands for consumer-safety and repo hygiene:

  - `facet clean`: detects dependencies already bundled by @arcevo/facet-components
    (radix primitives, lucide-react, cmdk, input-otp, qrcode.react, react-hook-form,
    sonner, class-variance-authority, clsx, tailwind-merge), removes them from the
    consumer's manifests, rewrites shadcn/ui-style imports (and direct radix/lucide
    imports) to `@arcevo/facet-components`, and deletes dead local `ui/` components.
    Safe by default: `--dry-run` shows the plan, prompts for confirmation (or `-y`),
    and prints the exact remove command for the detected package manager instead of
    auto-running it.
  - `facet scripts`: adds useful npm scripts (docs:dev/build/preview, quality
    lint/typecheck/test/build, facet:doctor/clean/prep) to package.json, never
    overwriting scripts the consumer already has.
  - `facet prep`: pre-go-live sync — checks facet deps are current (pkg), audits
    repo health (doctor), and runs the consumer's own typecheck/build/test when the
    scripts exist. Non-destructive.
  - `facet up`: applies the facet package updates (non-dry-run sibling of
    `facet update`) using the detected package manager.
  - `facet doctor` now also reports dependencies that @arcevo/facet-components
    already bundles and suggests `facet clean`.
  - `facet docs init` UX fixes: "Decide for me" now skips the question prompts
    (it previously asked everything then discarded the answers); the summary says
    where files actually land per framework (Next: src/app/docs + src/lib/docs;
    Remix: app/routes/docs + src/lib/docs); and it installs the facet packages
    automatically at the resolved latest versions instead of printing the command.
  - Alias-aware imports: the generators read tsconfig/jsconfig `paths` (and common
    framework aliases like `@/`, `~/`) and emit a configured alias when one fits,
    else a correct relative path. Fixes generated route imports that pointed at
    the wrong location.

  Layout — ConsoleLayout keeps `mode="full"` and `mode="rail"` only (the overlay
  variant is removed; it was never released and did not display as intended). The
  sidebar section expand/collapse + auto-open-active-section behavior is now
  covered by tests, and the mobile Sheet close behavior is verified.

- 502a54c: feat(cli): add pkg/doctor/update commands; -y shorthand; help docs link

  New commands for inspecting and maintaining a consumer's facet setup:

  - `facet pkg`: lists every published @arcevo/facet-* package with the latest
    registry version, the declared range in the consumer's manifests, and the
    resolved installed version. Flags `(update available)` when outdated.
  - `facet doctor`: audits the current repo (package manager, monorepo layout,
    facet usage) and suggests best practices (wire facet-tokens when components
    are used without it, swap workspace:* ranges before publishing, run
    `facet update` when packages are stale).
  - `facet update`: lists outdated facet packages and prints the exact install
    command for the detected package manager, workspace-aware.

  These are the foundation of a shared command core: the registry resolver,
  monorepo/workspace detection, and dependency scanning live in reusable lib
  modules so future product CLIs (e.g. an arcid CLI) can build on them.

  Also: `-y` shorthand for `--yes` on `facet docs init`, and a docs link
  (https://docs.facet.arcevocirqle.com.ng/cli) in `facet --help`.

## 0.2.0

### Minor Changes

- 79ec07a: - Adds `facet docs init`: an interactive wizard that scaffolds a docs site
  in any repo. The wizard opens with a **"Decide for me"** option — detect
  my stack and use the best defaults (also available as `--yes`) — or lets
  the consumer walk through each choice. Asks for the docs site name
  (blank falls back to the default `docs`), location (`.`, `docs/`, or
  `src/docs/` — root recommended), language, framework (React+Vite,
  Next.js, Remix, plain JS, Python), and template kind.
  - Detects the consumer's styling setup (facet tokens / Tailwind / plain
    CSS) and recommends wiring `@arcevo/facet-tokens` so consumers get the
    Alpha Palette theming without restyling every component.
  - Adds a **barrel export decision** (`--barrel auto|always|never`, or a
    wizard prompt): `auto` creates an `index.ts` when it fits the layout,
    `always` forces one, `never` leaves the consumer's tree untouched.
  - Adds **per-framework generators**:
    - **React+Vite**: a thin consumer app exactly like facet's own `apps/docs`
      (config + pages registry + app shell), which doubles as a reference
      implementation.
    - **Next.js**: a real `src/app/docs` route (`"use client"` rendering
      `DocsApp`) plus `src/lib/docs/config` and `src/lib/docs/pages` — the
      docs site mounts at `/docs` in an existing Next app. Next scaffolds
      get `next`/`react` deps and `docs:dev`/`docs:build` scripts.
    - **Remix**: a real `app/routes/docs` route rendering `DocsApp` plus
      `src/lib/docs/config` and `src/lib/docs/pages`, with
      `@remix-run/react` deps and `docs:dev`/`docs:build` scripts.
    - **Plain JS**: a framework-agnostic `pages` registry + markdown content
      pipeline with no React shell.
    - **Python**: a `docs_pipeline.py` markdown → `pages.json` compiler plus
      a starter registry, so a Python repo can own its docs content in
      markdown and hand the JSON to any React host for rendering.
  - Adds `facet add <component>`: a shadcn-style copy-into-source workflow,
    with a recommendation to import from `@arcevo/facet-components` instead.
    Placement is flexible: by default it decides based on what the consumer
    already has (flat into the components root when a barrel exists, else a
    clean `facet/` subdirectory), with `--dir`, `--ui-dir`, `--flat`,
    `--no-barrel`, and `--barrel` for explicit control. An existing barrel
    is merged (never overwritten) so the consumer's own exports stay intact,
    and the generated subdirectory barrel stays in sync across adds.
  - Every wizard prompt and CLI option carries a description of what it does
    or what the choice represents, so consumers know what each step will
    generate before committing.
