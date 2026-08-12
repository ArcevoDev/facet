---
"@arcevo/facet-components": patch
"@arcevo/facet-docs": patch
---

fix(docs): layout page no longer takes over the shell; back button; marquee

- docs: the /layout page had live layout demo blocks whose fixed-position
  sidebars escaped and covered the docs shell (the arc-id demo sidebar).
  Removed every live demo block from the page; it is now text + copyable
  code only. Verified in the browser: the facet sidebar renders normally.
- docs: add a Back button at the top of every content page body (goes back
  in history, falls back to /) so routing between pages is easier.
- components: Marquee track no longer forces whitespace-nowrap, so card
  children wrap naturally instead of clipping; the default text variant
  wraps its items in nowrap spans.
- landing: the install steps strip switched from ScrollArea to the facet
  Marquee (pause-on-hover), dogfooding the component internally.
