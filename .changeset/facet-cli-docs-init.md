---
"@arcevo/facet-cli": minor
---

- Adds `facet docs init`: an interactive wizard that scaffolds a docs site
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
