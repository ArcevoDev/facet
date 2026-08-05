---
"@arcevo/facet-docs": minor
---

- Adds the interactive `AuthDemo` component and `authDemo` docs block: a configurable live `<SignIn>` with method/OAuth toggles that generates the exact `config` code for the selected method.
- Adds the reusable `InteractiveDemo` component and `demo` docs block: a variant/method switcher drives a live preview and a copyable code snippet for any manifest slug (auth, layout, and forms guide pages).
- Adds the `keyboardShortcuts` docs block (Kbd-chip shortcuts table).
- Splits the gallery: base UI components, the auth/layout surfaces, and the "Ready to Use" extras (Dropzone, ColorPicker, QRCode, Marquee, Roadmap, Form) each get their own sidebar section or guide page with live previews and copyable usage snippets.
- All new blocks are exported from the package barrel and documented in the docs package README block table.
