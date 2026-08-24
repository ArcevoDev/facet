---
"@arcevo/facet-components": minor
---

Add `hoverDropdowns` prop to Navbar for hover-to-open dropdown menus on desktop, with shared close-timer coordination so only one dropdown is open at a time. Also add optional `icon` field to FooterLink and `lg:px-8` to navbar padding.

- facet-components: Navbar accepts `hoverDropdowns?: boolean` (default `false`). When enabled, desktop dropdown menus open on hover and close on mouse-leave with a short delay; rapid transitions between links cancel the previous close timer. Click still toggles as a fallback on touch devices.
- facet-components: FooterLink now accepts an optional `icon?: IconName` resolved through the icon registry.
