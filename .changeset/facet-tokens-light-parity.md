---
"@arcevo/facet-tokens": patch
---

fix(tokens): complete light-theme token parity

The light theme (`[data-theme="light"]`) was missing 28 tokens that exist
in the dark `:root` block — consuming apps got undefined/fallback values
for light mode:

- `success` / `success-foreground` and `warning` / `warning-foreground`
  (light-optimized hues).
- Chart palette `chart-1..5` (light-optimized, higher contrast).
- `sidebar-ring`.
- `radius` + the `radius-sm..3xl` scale (declared so a light-only subtree
  is self-contained).
- `sub-brand-accent` / `sub-brand-accent-foreground`.
- Alpha palette (`alpha-*`) and font families (`font-*`) — theme-
  independent tokens that were previously `:root`-only.

The light theme is now fully self-contained: a consumer applying
`[data-theme="light"]` on a subtree gets every token arc-id/components
expect, with no fallback to undefined.
