---
"@arcevo/facet-cli": patch
---

fix(cli): facet up/pkg now detect installed versions correctly

`readInstalledVersion` built paths ending at the package directory but
read them as files, so `fs.readFileSync` threw EISDIR and `installed`
always showed `-` — which made `facet up` report "All up to date" even
when updates existed (e.g. auth 1.1.1 vs latest 1.1.3). The path now
appends `package.json`, so `facet pkg` shows real installed versions and
`facet up` offers the correct updates. Regression tests added.
