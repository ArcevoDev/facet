---
"@arcevo/facet-components": minor
"@arcevo/facet-layout": patch
---

Fix sidebar accordion (singleOpen) collapse, auto-infer ResizableHandle orientation, and export brand icons from the components barrel.

- facet-components: `ResizableHandle` now inherits `orientation` from its parent
  `ResizablePanelGroup` via context (explicit prop still overrides). Exported
  individual brand icon components (`GithubIcon`, `LinkedinIcon`, etc.) from the
  barrel for direct import. Added `ChevronsUp`/`ChevronsDown` to the eagerly-loaded
  semantic icon maps so they render synchronously.
- facet-layout: restored explicit-collapse-wins rule in `NavSectionRenderer.open`
  so active sections can be collapsed (fixes accordion/singleOpen). Auto-open-on-
  navigation moved to a `useEffect` keyed on route change. Added `asPath` to
  `RouterAdapter` interface and default adapter.
