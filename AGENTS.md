# facet: Agent Session Rules

This file is loaded at the start of every session.
It overrides/supplements CLAUDE.md for AI agents.

## Session Protocol

1. Always write analysis and planning output to `.agent/output.txt` first,
   so the user can read from that file instead of scrolling the terminal.
2. After every significant milestone, update `.agent/output.txt` status dashboard.
3. When starting a new package, read any existing `.agent/**` planning files
   first before writing code.
4. `.agent/` is gitignored (tracker is local-only); any important details
   must be synced into the tracked README before a session ends.

## Architecture Rules

- Auth components must be domain-customizable (different configs for
  fintech vs med vs edu): not one-size-fits-all.
- Include a welcoming landing page and deployed documentation site alongside
  the component library.
- Build a differentiated component library wired to arc-id SDK, not a generic
  clone of existing UI libraries.

## File Structure Rules

- Every package has: `src/`, `package.json`, `tsconfig.json`
- Every package exports from `src/index.ts` as barrel
- Re-export types alongside implementations

## Current Build Status

See `CLAUDE.md` and the README for the verified build/test/typecheck state.
`.agent/output.txt` is the local-only live dashboard.

The working tree carries a large UNCOMMITTED changeset (docs engine
`packages/docs`, rebuilt consumer `apps/docs`, +11 components, landing
rework, changesets). The three P0 breakages from the previous analysis
(storiesDir path, missing @storybook/react, root tsconfig reference) are
fixed as of 2026-08-03: Storybook is fully purged and the drift gate is a
barrel + manifest check. See `.agent/analysis-current-state.md` for the
current priority backlog.

## Publish Status

Packages publish to npm under the `@arcevo/facet-*` scope via Changesets
(`pnpm changeset publish`). The GitHub Actions workflow publishes on `main`
using the `NPM_TOKEN` secret. See the README Publishing section.
