---
"@arcevo/facet-layout": minor
---

Add `CommandPalette` search component: Ctrl+K / search-button command palette derived dynamically from `LayoutConfig.navigation` (one command per nav item, grouped by section title). Supports controlled open state, injected `navigate` for SPA routing, optional async `search` with Skeleton loading rows, and optional `quickActions`. Rail mode sidebar now collapses each nav section to a single icon slot (first item icon or section initial) so all section icons sit together with no scroll; the full item list shows only when the sidebar is expanded.
