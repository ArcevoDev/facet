---
"@arcevo/facet-store": minor
---

feat(store): extract ArcID Zustand auth/tenant stores into @arcevo/facet-store

Pulls the framework-agnostic state stores (auth session + tenant) out of
ArcID into a standalone `@arcevo/facet-store` package that is consumable
across web and React Native. The stores are pure Zustand (`create`, no React
  coupling in the store logic) - React is only required by the auto-generated
hooks at the consumer boundary, so it stays a peer, not a bundled dependency.

Consumers share one source of truth: arc-id, the docs preview surface, and
the RN wallet app. The state layer has zero `any` and zero arc-id-specific
logic (verified: `grep any src/store` returns no matches); types
(`User`/`Tenant`) are re-exported from `@arcevo/facet-sdk`.
