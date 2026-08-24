---
"@arcevo/facet-auth": patch
"@arcevo/facet-store": patch
---

Phase 0 security fix: warn developers when `defaultStorage` (localStorage) is used for tokens, surface the XSS risk prominently, and add an optional `persist` adapter so consumers can plug in a cookie-backed strategy.

- facet-auth: `<ArcProvider>` now emits a dev-time `console.warn` when no explicit `storage` prop is provided (fires once per page-load). `defaultStorage` and the `TokenStorage` type now carry a prominent JSDoc security warning documenting the XSS risk of storing tokens in `localStorage`.
- facet-store: `createZustandTokenStorage` gains an optional `persist` adapter argument so consumers can plug in a cookie-backed persistence strategy for the access token. The refresh token is never passed through the persist adapter.
