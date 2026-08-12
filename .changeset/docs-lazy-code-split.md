---
"@arcevo/facet-docs": minor
---

perf(docs): lazy-load the layout shell, component gallery, and demo blocks

The docs engine now code-splits its heavy surfaces so the initial bundle
stays small for consumers:

- `DocsLayout` (ConsoleLayout + CommandPalette) is lazy-loaded.
- The `/components`, `/components/:slug`, and `/ready-to-use` routes are
  lazy-loaded.
- The auth/layout demo blocks (`AuthDemo`, `AuthPreviews`,
  `LayoutPreviews`) are lazy-loaded inside the content page.
- `InteractiveDemo` lazy-loads the heavy `variants` preview graph.
- The barrel no longer statically re-exports the heavy internal demo/page
  modules (ComponentsPage, ComponentPage, AuthDemo, Playground, ...) which
  were never part of the public contract.

Measured on the facet docs site: initial-load JS dropped ~33% (1.44 MB to
~960 KB), and the heavy component-preview code now only downloads when a
user visits the component gallery.
