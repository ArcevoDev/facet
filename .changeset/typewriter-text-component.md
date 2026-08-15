---
"@arcevo/facet-components": minor
---

feat: TypewriterText component - a dependency-free type/erase text animation for hero sections and headers

`TypewriterText` cycles through a list of phrases with a type/erase loop and a blinking caret. Zero dependencies (pure React + timeouts), SSR-safe (renders the first phrase synchronously, animates after mount). Props: `phrases`, `typeSpeed`, `eraseSpeed`, `delay`, `showCaret`, `caretClassName`, plus the usual span props.

Used on the landing hero to glimpse the ecosystem (components, auth presets, tokens, layouts, SDK, emails, CLI).
