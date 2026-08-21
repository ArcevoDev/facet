---
"@arcevo/facet-components": minor
"@arcevo/facet-cli": minor
"@arcevo/facet-sdk": minor
---

Add 5 new composable UI components: AspectRatio, Carousel, Drawer,
InputGroup, Resizable. Also fix Navbar hamburger (X-icon toggle +
outside-click close) and register new bundled deps in facet-cli.

Carousel: add <CarouselDots> pagination component (uses context API, no extra deps);
update docs preview with dots + loop. Add carousel-vertical variant to docs.
Marquee: add composable `variant` prop ("loop" | "strip"); strip variant
defaults to no pause-on-hover + dedicated className. Add marquee-strip variant to docs.
Resizable: docs preview now shows both horizontal and vertical orientations.

CLI enhancements:
- `facet clean -y` now auto-runs the remove command instead of just printing it
- Auto-update check on CLI startup (pnpm-style notification box, 24h cache, CI skip, --no-update-check)
- `facet self-update`: updates the globally-installed facet-cli
- `facet install <name>`: installs a facet package by shorthand or full name
  (full: `facet install @arcevo/facet-layout`, shorthand: `facet install layout`)
  Supports the scoped-dropped alias `facet-cli` -> `@arcevo/facet-cli` (so any
  `facet-X` alias resolves), and `-g`/`--global` to install globally, e.g.
  `facet install -g facet-cli` runs `npm i -g @arcevo/facet-cli@latest`.
- `facet copy <ComponentName>`: copies a component into your source (shadcn-style) only
  (passing a package name prints a redirect hint to `facet install`)
- `facet latest`: shows latest published versions of all facet packages
- `facet --log`: global verbose flag for detailed command output

SDK: add `OAuthSdk.updateClient(clientId, data)` for full OAuth-client
CRUD (PATCH `/oauth/clients/:clientId`); add `IssueCredentialParams` interface.

