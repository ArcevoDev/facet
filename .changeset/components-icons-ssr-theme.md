---
"@arcevo/facet-components": minor
---

feat(components): icon set + SSR-safe theme

- Icon: add ArrowLeft, Mail, MessageSquare, MessageCircle, Boxes,
  ShieldCheck, Zap, Terminal, Puzzle, Lock, Ruler, FingerprintPattern to
  the semantic/light icon set, plus aliases (document, grid, grid).
  Remove the `lucideIconMap` / `lucideIconNames` root exports (they were
  a duplicate of the icon registry; consumers should use `Icon` /
  `getIcon` / `registerIcon`).
- ThemeProvider: read the stored theme synchronously in the state
  initializer so the first client render matches the no-flash shell
  script (no wrong-theme flash).
- ThemeToggle: render the icon only after mount (SSR-safe) - fixes the
  server/client hydration mismatch when the toggle is rendered inside
  SSR'd layouts (e.g. Navbar `showThemeToggle` in Next.js).
