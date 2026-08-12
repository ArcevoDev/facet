---
"@arcevo/facet-cli": minor
---

feat(cli): add pkg/doctor/update commands; -y shorthand; help docs link

New commands for inspecting and maintaining a consumer's facet setup:

- `facet pkg`: lists every published @arcevo/facet-* package with the latest
  registry version, the declared range in the consumer's manifests, and the
  resolved installed version. Flags `(update available)` when outdated.
- `facet doctor`: audits the current repo (package manager, monorepo layout,
  facet usage) and suggests best practices (wire facet-tokens when components
  are used without it, swap workspace:* ranges before publishing, run
  `facet update` when packages are stale).
- `facet update`: lists outdated facet packages and prints the exact install
  command for the detected package manager, workspace-aware.

These are the foundation of a shared command core: the registry resolver,
monorepo/workspace detection, and dependency scanning live in reusable lib
modules so future product CLIs (e.g. an arcid CLI) can build on them.

Also: `-y` shorthand for `--yes` on `facet docs init`, and a docs link
(https://docs.facet.arcevocirqle.com.ng/cli) in `facet --help`.
