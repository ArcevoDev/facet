---
"@arcevo/facet-components": minor
"@arcevo/facet-tokens": patch
---

Polish pass: SpotlightCard default spotlight now uses color-mix for a visible semi-transparent glow (was a flat var(--primary) that was barely visible); BorderBeamCard beam refined with soft entry/exit ramps for a cleaner sweep; AnimatedButton default animation changed from shine to sparkle (consistent with BillingPageConfig's existing default); tokens CSS hides scrollbars globally across all facet apps (code blocks, tables, tabs, etc.) so interfaces look clean on mobile and medium screens.
