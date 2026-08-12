---
"@arcevo/facet-components": patch
---

fix(data-table): relax generic row constraint from `Record<string, unknown>` to `object`

DataTable/DataTableColumn previously required `T extends Record<string, unknown>`,
which rejects plain `interface` row types (TS2344: interfaces lack an index
signature). Consumers had to convert their row interfaces to `type` aliases.
The constraint is now `object`, with index access isolated behind narrow
helpers (`cellValue`, `rowKeyValue`), so interfaces and classes both work.
