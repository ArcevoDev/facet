---
"@arcevo/facet-cli": major
"@arcevo/facet-store": major
---

Bump CLI and store to stable 1.0.0. The store handles auth-critical token-refresh
state consumed by arc-id in production, so 0.1.0 (alpha) stability is no longer
acceptable. The CLI is the primary developer tool and all other packages are
already 1.x - aligning both to 1.0.0 signals release-readiness and removes
pre-release confusion. Per the handbook rule: "anything release-ready should be
at 1.0.0".
