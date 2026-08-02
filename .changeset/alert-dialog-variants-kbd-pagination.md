---
"@arcevo/facet-components": minor
---

- `UserAvatar` gains a `variant` prop (`"auth"` default / `"default"` plain avatar), plus `settingsHref`/`settingsLabel`/`renderSettingsLink` for a router-aware Settings item.
- `AlertDialogContent` accepts a `variant="destructive"` tinted surface; `AlertDialogAction` accepts a `variant` (default/destructive) built on `buttonVariants`; new `AlertDialogIcon` warning-icon component. Alert dialogs now close when the overlay (outside) is clicked.
- New `isMac()`/`getModSymbol()` platform helpers and a `mod` prop on `Kbd` for platform-aware shortcut hints (⌘ on macOS, Ctrl elsewhere).
- Buttons now render with `cursor-pointer`.
- `Pagination` spacing/glyph alignment tightened (`gap-1.5`, `shrink-0` icons).
- Icon registry adds `triangleAlert`.
