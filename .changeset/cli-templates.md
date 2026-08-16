---
"@arcevo/facet-cli": minor
---

feat(cli): consumer templates + `--use-template` merge

New `facet templates` command group discovers and inspects template
directories in a consumer repo (under `./templates/`, `./docs/templates/`,
or `./emails/templates/`, optionally described by a `template.json`
manifest):

- `facet templates list` - list template dirs found in the repo.
- `facet templates describe <name>` - show a template's manifest and files.

`facet docs init --use-template <name>` and
`facet emails init --use-template <name>` merge the named template over the
generated scaffold. The merge is never destructive by default:

- new paths are copied in,
- identical existing files are skipped,
- `package.json` is merged with the consumer's fields winning,
- code files containing a `// @facet-merge` marker get the marker's
  contents appended before the file's final `}` (an opt-in way to merge the
  implementation in),
- any other existing file is left untouched (reported as a conflict).

Also: the docs starters are now template-aware. `--template api-reference`
and `--template product-docs` emit starter pages that match the chosen kind
(endpoints/types pages, or getting-started/guides/faq) instead of the same
generic Overview page for every kind.
