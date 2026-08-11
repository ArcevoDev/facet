# @arcevo/facet-docs

## 1.2.0

### Minor Changes

- 568497d: - Adds the interactive `AuthDemo` component and `authDemo` docs block: a configurable live `<SignIn>` with method/OAuth toggles that generates the exact `config` code for the selected method.
  - Adds the reusable `InteractiveDemo` component and `demo` docs block: a variant/method switcher drives a live preview and a copyable code snippet for any manifest slug (auth, layout, and forms guide pages).
  - Adds the `keyboardShortcuts` docs block (Kbd-chip shortcuts table).
  - Splits the gallery: base UI components, the auth/layout surfaces, and the "Ready to Use" extras (Dropzone, ColorPicker, QRCode, Marquee, Roadmap, Form) each get their own sidebar section or guide page with live previews and copyable usage snippets.
  - All new blocks are exported from the package barrel and documented in the docs package README block table.

### Patch Changes

- Updated dependencies [3de0e04]
- Updated dependencies [568497d]
- Updated dependencies [3de0e04]
  - @arcevo/facet-components@1.2.0
  - @arcevo/facet-auth@1.1.0
  - @arcevo/facet-tokens@1.1.0
  - @arcevo/facet-layout@1.1.1

## 1.1.0

### Minor Changes

- - Initial publish: installable, config-driven docs site engine. Mount `<DocsApp config={...} pages={...} />` with your own brand, nav, content pages, and ecosystem links, without forking.
  - Ships a searchable sidebar shell (VS Code-style collapsible rail), paginated component gallery with per-component variant pages, per-variant usage tabs, install tabs for pnpm/npm/yarn/bun, and an optional ecosystem links section.
  - Pages and nav derive from a single pages registry; the component manifest is auto-generated from `packages/components/src/ui`.

### Patch Changes

- Updated dependencies [3752a98]
- Updated dependencies [3752a98]
- Updated dependencies [3752a98]
- Updated dependencies [3752a98]
  - @arcevo/facet-components@1.1.0
  - @arcevo/facet-layout@1.1.0
  - @arcevo/facet-auth@1.0.3
