# @arcevo/facet-store

## 2.0.0

### Major Changes

- 43ccd14: Bump CLI and store to stable 1.0.0. The store handles auth-critical token-refresh
  state consumed by arc-id in production, so 0.1.0 (alpha) stability is no longer
  acceptable. The CLI is the primary developer tool and all other packages are
  already 1.x — aligning both to 1.0.0 signals release-readiness and removes
  pre-release confusion. Per the handbook rule: "anything release-ready should be
  at 1.0.0".

### Patch Changes

- Updated dependencies [b1da261]
  - @arcevo/facet-sdk@1.2.0

## 0.1.0

### Minor Changes

- b7accc3: feat(store): extract ArcID Zustand auth/tenant stores into @arcevo/facet-store

  Pulls the framework-agnostic state stores (auth session + tenant) out of
  ArcID into a standalone `@arcevo/facet-store` package that is consumable
  across web and React Native. The stores are pure Zustand (`create`, no React
  coupling in the store logic) - React is only required by the auto-generated
  hooks at the consumer boundary, so it stays a peer, not a bundled dependency.

  Consumers share one source of truth: arc-id, the docs preview surface, and
  the RN wallet app. The state layer has zero `any` and zero arc-id-specific
  logic (verified: `grep any src/store` returns no matches); types
  (`User`/`Tenant`) are re-exported from `@arcevo/facet-sdk`.
