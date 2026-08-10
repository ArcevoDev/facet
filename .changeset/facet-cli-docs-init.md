---
"@arcevo/facet-cli": minor
---

- Adds `facet docs init`: an interactive wizard that scaffolds a docs site
  in any repo. Asks for the docs site name (default `docs`), location
  (`.`, `docs/`, or `src/docs/` — root recommended), language, framework
  (React+Vite, Next.js, Remix, plain JS, Python), and template kind.
- Detects the consumer's styling setup (facet tokens / Tailwind / plain
  CSS) and recommends wiring `@arcevo/facet-tokens` so consumers get the
  Alpha Palette theming without restyling every component.
- Adds `facet add <component>`: a shadcn-style copy-into-source workflow,
  with a recommendation to import from `@arcevo/facet-components` instead.
- The React+Vite generator produces a thin consumer app exactly like
  facet's own `apps/docs` (config + pages registry + thin app shell), so
  the scaffold doubles as a reference implementation.
