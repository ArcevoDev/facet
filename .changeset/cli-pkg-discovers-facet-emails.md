---
"@arcevo/facet-cli": minor
---

feat(cli): dynamically discover facet packages + auto-apply updates

- `facet pkg` / `facet doctor` / `facet update` now discover `@arcevo/facet-*` packages dynamically from the npm registry scope (`/-/v1/search?text=scope:arcevo`, 5s timeout, falls back to the static baseline) merged with whatever the consumer declares. A newly published facet package (e.g. `@arcevo/facet-emails`) shows up without a CLI release.
- `facet update` now applies updates by default (confirmation prompt unless `-y`), with `--dry-run` to only print the command. `facet up` remains the always-apply variant.
