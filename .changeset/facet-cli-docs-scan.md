---
"@arcevo/facet-cli": minor
---

feat(cli): facet docs scan — read the repo and draft documentation

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
