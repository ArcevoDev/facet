---
"@arcevo/facet-components": minor
"@arcevo/facet-layout": minor
"@arcevo/facet-tokens": patch
"@arcevo/facet-docs": patch
---

feat(components): MailInput with domain suggestions + Dissolve animation family

### @arcevo/facet-components (minor)

- **MailInput** — email input with a domain-suggestion dropdown. Typing `@` (or
  continuing after it) surfaces common provider domains (gmail.com,
  icloud.com, etc.); click or press Enter to auto-complete. Works controlled
  (RHF/Shadcn forms) and uncontrolled.
- **DissolveText** — 10th text animation (char-by-char dissolve-in). SSR-safe.
- **DissolveButton** — micro-interaction that emits a particle-dissolve burst
  on click. SSR-safe.
- **DissolveCard** — card-surface animation that dissolves in on mount with a
  subtle hover overlay.
- **AnimatedButton** — new `animation="dissolve"` variant.
- **Footer** — new `variant="streamline"` with `steps` (how-it-works grid) and
  `notices` (research notices, cookie callouts) slots; new `FooterStep` type.
- **FaqSection** — `type="multiple"|"single"` accordion behavior + `children`
  slot for footer strips.
- **Roadmap** — `maxHeight` prop for scrollable timeline layouts.
- **BillingPage / PlanCta** — CTA now renders a real `<a>` (via `Button
  asChild`) for accessible, right/middle-clickable links; `renderButton`
  override preserved.
- New `facet-dissolve` CSS keyframe in tokens (shared by DissolveText,
  DissolveButton, DissolveCard, AnimatedButton dissolve variant).

### @arcevo/facet-layout (minor)

- **Sidebar** — new `singleOpen` (accordion) prop; `Collapse all` / `Expand
  all` toolbar buttons; active section scrolls into view.
- **ConsoleLayout** — passes `singleOpen` through to the sidebar (both docked
  and mobile Sheet).
- **LayoutContext** — new `openSection`, `collapseAll`, `expandAll` methods
  (all persisted to localStorage alongside the existing `toggleSection`).
- The docs layout opts into `singleOpen`.

### @arcevo/facet-tokens (patch)

- New `--animate-facet-dissolve` keyframe (500ms ease-out, both fill-mode).

### @arcevo/facet-docs (patch)

- Docs manifest regenerated: `mail-input` added (inputs category);
  `typewriter-text` now documented as tabs on the text-animations page
  instead of a standalone slug.
- Animation sidebar is now a flat list (removed nested Text/Cards parents).
- Variant previews + usage snippets for DissolveText, DissolveButton,
  DissolveCard, AnimatedButton dissolve, and the Footer streamline variant;
  TypewriterText preview moved to the text-animations tab set.
- `check-docs-inventory` drift gate accounts for `typewriter-text`
  (documented elsewhere), `gen-docs-manifest` excludes it from generation.
