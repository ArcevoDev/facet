# @arcevo/facet-cli

Scaffold and generate `@arcevo/facet-docs` sites. Framework and
language-agnostic: the init wizard asks for your stack and tailors what it
generates, so TypeScript, JavaScript, React+Vite, Next.js, Remix, plain JS,
and even Python repos all get a docs scaffold that fits.

## Install

```bash
pnpm add -g @arcevo/facet-cli
# or
npx @arcevo/facet-cli
```

## How it stays current

The scaffold never pins hardcoded versions. At `docs init` time the CLI:

1. **Detects your frontend stack** (Next.js, Remix, Vite, plain JS, Python).
   Backend frameworks (Fastify, Express, Nest, ...) are ignored — docs are a
   frontend concern, so a fullstack repo like arc-id (Next.js + Fastify)
   scaffolds for the frontend.
2. **Detects your package manager** from the lockfile (`pnpm` / `yarn` /
   `bun` / `npm`) and recommends the matching install command.
3. **Resolves the current published versions** of the facet packages from
   the npm registry, so your `package.json` always gets the latest
   compatible release, never a stale pinned guess.
4. **Patches your existing `package.json`** if one is present — your own
   scripts, deps, name, and metadata are preserved. The docs scripts are
   added under distinct names (`docs:dev`, `docs:build`, ...) so nothing
   you already have is overwritten. If no `package.json` exists, a fresh
   minimal one is created and your package manager generates the lockfile
   on first install.

## Commands

### `facet docs init`

Interactive wizard that scaffolds a docs site in the current repo. It asks
for:

- **Name** (default `docs`)
- **Location** (`.` recommended, or `docs/`, `src/docs/`)
- **Language** (TypeScript / JavaScript)
- **Framework** (React+Vite, Next.js, Remix, plain JS, Python)
- **Styling** (detected from your repo; facet tokens recommended)
- **Template kind** (component library / API reference / product docs)

For React+Vite it generates a complete thin-consumer app (like facet's own
`apps/docs`): `package.json`, Vite config, `src/main`, `src/app`, and a
`src/pages` registry. For plain JS / Python it generates a framework-agnostic
`pages` registry + a markdown content pipeline with no React shell.

**The scaffold never copies facet's own docs.** You get the engine
(`@arcevo/facet-docs`) and an empty `pages` registry to fill with your
content.

### `facet add <component>`

Copy a component into your source (shadcn-style). **Recommended:** import
from `@arcevo/facet-components` instead — you get updates, tree-shaking,
and the token system. Copying source means you own every future fix. This
exists for consumers who prefer a copy-into-source workflow.

## Theming

When you choose facet tokens, the scaffold wires `@arcevo/facet-tokens`
(tokens.css + tailwind.css) and the `ThemeProvider` + `overrideVars` story,
so you get the whole Alpha Palette system (dark mode, frost/glass surfaces)
with one import instead of restyling every component.

## Development

```bash
pnpm build      # tsup -> dist
pnpm typecheck
```

## Why a CLI?

The `@arcevo/facet-docs` package is an engine: it ships the shell, gallery,
and block types, but no authored content. `facet docs init` gives consumers
a starting point without forking or cloning — the engine stays installable,
the content stays theirs.
