---
"@arcevo/facet-components": minor
---

feat(components): add `timeline` variant to Roadmap

`<Roadmap variant="timeline" />` renders the lighter landing-page look:
a mono uppercase phase label next to the status badge, with a status dot
on the connector line and no card chrome. The `date` field renders as the
phase label. Default (`card`) behavior is unchanged. Added a docs variant
("Timeline") + usage snippet + test.
