---
"@arcevo/facet-components": minor
"@arcevo/facet-layout": minor
"@arcevo/facet-docs": minor
---

Animated surfaces + page components + full location dataset.

Components:
- Button gains `shine` (hover sweep) and `ripple` (click ink burst)
  variants plus a `magnetic` prop (button gravitates toward the cursor).
- Card gains `tilt` (3D cursor-follow), `gradient-border`, `zoom`
  (image hover), and `flip` (state-driven 3D reveal: flips on hover,
  returns on mouse-out, click toggles for touch; `flipDirection`
  horizontal/vertical; `CardFlipBack` back-face component).
- New `animated` module: Spotlight (cursor glow), Aurora (conic
  gradient motion), Beams (sweeping light), GridPattern (masked grid),
  SparkleButton (click sparkle burst). Zero-dependency, backed by new
  facet-* keyframes in the tokens tailwind.css.
- New `Footer` (config-driven site footer: brand, link columns,
  socials, bottom links, legal, bottomBar override) and `FeedbackPage`
  (ready-to-use feedback/contact page: mailto form, config channels,
  form override).
- `SelectSearch` added to the Select component: a sticky search input
  that stays pinned while the option list scrolls. The LocationPicker's
  searchable selects use it (Country/State/LGA type-to-filter).
- LocationPicker: DEFAULT_COUNTRIES + DEFAULT_REGIONS regenerated from
  the dr5hn countries-states dataset (ODbL) - 168 countries, ~3,600
  states/regions (was 16). Nigeria's full 774-LGA layer preserved.
  Dynamic region labels (state/county/province/governorate/emirate)
  resolve per country.

Layout:
- Topbar + ConsoleLayout gain a `themeToggle` prop that renders the
  built-in ThemeToggle (requires a ThemeProvider ancestor), so apps no
  longer hand-wire theme switching.
- AuthLayout default brand panel is theme-token + config driven (no
  hardcoded Arcevo colors or footer text); `brand.footerText` and
  `brandPanel`/`brandPanelClassName` cover customization.

Docs:
- New dedicated "Pages" section (sidebar + /pages route) for full-page
  components (FeedbackPage, Footer) with live previews, usage, and
  customization docs. New page components land there automatically.
- Card variants (tilt/gradient-border/zoom/flip) + SelectSearch +
  animated surfaces documented with usage snippets.
