---
"@arcevo/facet-emails": patch
---

fix(react): wrapped components no longer drop React-element children

`EmailLayout`/`EmailText`/`EmailButton` (and the other `wrap()`-based React
components) silently dropped React-element children passed into them, e.g.
`<EmailLayout><EmailText>Hello</EmailText><EmailButton>Go</EmailButton></EmailLayout>`
rendered the heading and footer but lost the body. The `toReactNode` bridge
only understood raw template nodes (`{tag, props, children}`); a React element
has `type`/`props` and no `tag`, so it became `React.createElement(undefined)`
and vanished.

`toReactNode` now converts React-element children through the React bridge
before rendering, so composed children survive the round-trip. The framework
agnostic core (`render.ts` + `emailLayout`/`emailButton`/...) is untouched and
still has zero React dependency.

Also fixes the emails test config: `vitest.config.ts` only included
`src/**/*.test.ts`, so the `.tsx` React-bridge tests never ran (the bug slipped
through). Include now matches `.ts` and `.tsx`, and a regression test pins the
wrapped-children case.
