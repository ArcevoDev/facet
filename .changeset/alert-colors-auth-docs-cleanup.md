---
"@arcevo/facet-components": patch
"@arcevo/facet-layout": patch
"@arcevo/facet-docs": patch
---

fix: alert success/warning colors, mobile table overflow, auth docs cleanup

- components: Alert success and warning variants now use their semantic
  text colors (text-success green, text-warning amber) matching the
  destructive variant, instead of text-foreground. Added an alert test.
- layout: the ConsoleLayout main area gets min-w-0 so wide tables scroll
  inside their own overflow-x-auto container instead of overflowing the
  page on mobile.
- docs: remove the /auth/forms page (its LoginForm demo rendered a blank
  page) and the redundant /auth/layouts page (covered by the Ecosystem
  Layout page). Cleaned up the login-form manifest entry, variant, and
  usage. Fixed stale docs claims: 52 -> 57 components, added facet-cli to
  the package list, corrected the publishing note (CI is validation-only)
  and the fintechAuthPreset -> fintechPreset snippet name.
