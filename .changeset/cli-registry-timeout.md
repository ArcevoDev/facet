---
"@arcevo/facet-cli": patch
"@arcevo/facet-components": patch
---

Add a 3s fetch timeout to `resolveFacetVersions` and `discoverFacetPackages` so the CLI never hangs on an unreachable or slow npm registry. Add a global `testTimeout: 15000` in the CLI vitest config to absorb slow CI and DTS parsing overhead.

- cli: `resolveFacetVersions()` now uses an `AbortController` with a 3s timeout (was unbounded); `discoverFacetPackages()` timeout reduced from 5s to 3s.
- cli: Add `LUCIDE_ALIASES` entry `alert-circle → circle-alert` so the deprecated lucide name still resolves in generated icon registries.
- components: Add `alert-circle`, `external-link`, `globe`, and `store` to the `@arcevo/facet-components/light` `LightIcon` set (used by the landing and docs sites).
