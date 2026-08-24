---
"@arcevo/facet-docs": patch
---

Remove the collapsible/vertical-collapsible docs gallery variants for Resizable (were never wired to the variants.tsx list, leaving dead code in previews.tsx and usage.ts). Make the horizontal variant as polished as the vertical by adding the same height constraint and proper border separation.
