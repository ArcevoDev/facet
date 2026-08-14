---
"@arcevo/facet-cli": minor
---

feat(cli): add `facet icons generate`

New command that scans the consumer repo for icon call sites and emits a
slim generated registry (`icons.generated.tsx`) with direct lucide
imports for exactly the icons used - tree-shaken, with legacy-name
mapping and unresolved-name reporting. Includes `--path` and `-y` flags.

Adds a `lucide-react` dependency for the catalog.
