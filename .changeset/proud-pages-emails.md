---
"@arcevo/facet-components": minor
"@arcevo/facet-emails": minor
---

feat: config-driven billing pages, footer variants, and the new @arcevo/facet-emails package

**@arcevo/facet-components**

- New billing / pricing page components, all consuming a shared config-driven plan model (`BillingPageConfig` + `BillingPlan`) so tiers (Free / Starter / Pro / Enterprise / any other names), prices, intervals, feature lists, and CTAs are plain data:
  - `BillingPage` - a responsive card grid with a monthly/yearly toggle, per-plan icons, highlighted "Most popular" treatment, and feature bullets.
  - `BillingPageTable` - a full feature comparison table (rows = features, columns = plans, check/cross/string per cell, highlighted recommended column).
  - `BillingPageFreemium` - a free/paid split: hero pitch for the free tier + one featured paid plan, then a compact card list for the rest.
- `Footer` gains a `variant` prop: `default` (unchanged), `minimal`, `columns`, `newsletter`, and `split`, plus an optional `newsletter` capture slot. Existing consumers are unaffected.

**@arcevo/facet-emails** (new package)

- Framework-agnostic email template renderer: render plain, serializable template trees (`{ tag, props, children }`) to email-safe HTML and plain text with zero runtime dependencies.
- Optional React bridge: write emails in JSX with `EmailLayout`, `EmailButton`, `EmailText`, `EmailCodeBlock`, `EmailDivider`, `EmailLink`, `EmailSecurityNotice`, and `EmailList`, all compiled down to template trees.
- Brand token injection (colors, fonts, radius) through the render options.
- Dependency-light dev preview server (`@arcevo/facet-emails/server`) with a template index and per-template HTML/text previews.
