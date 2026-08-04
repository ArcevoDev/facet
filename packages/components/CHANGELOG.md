# @arcevo/facet-components

## 1.1.0

### Minor Changes

- 3752a98: - `UserAvatar` gains a `variant` prop (`"auth"` default / `"default"` plain avatar), plus `settingsHref`/`settingsLabel`/`renderSettingsLink` for a router-aware Settings item.
  - `AlertDialogContent` accepts a `variant="destructive"` tinted surface; `AlertDialogAction` accepts a `variant` (default/destructive) built on `buttonVariants`; new `AlertDialogIcon` warning-icon component. Alert dialogs now close when the overlay (outside) is clicked.
  - New `isMac()`/`getModSymbol()` platform helpers and a `mod` prop on `Kbd` for platform-aware shortcut hints (⌘ on macOS, Ctrl elsewhere).
  - Buttons now render with `cursor-pointer`.
  - `Pagination` spacing/glyph alignment tightened (`gap-1.5`, `shrink-0` icons).
  - Icon registry adds `triangleAlert`.

## 1.0.2

### Patch Changes

- feat: wire internal components through the Icon registry; Icon spreads SVG props for pass-through overrides
- fix: navbar mobile menu closes when an item is tapped (custom mobileMenu included)

## 1.0.1

### Patch Changes

- d94a724: chore: update homepage to facet.arcevocirqle.com.ng
- Updated dependencies [d94a724]
  - @arcevo/facet-tokens@1.0.1

## 1.0.0

### Major Changes

- e79cbd5: initial publish...

### Patch Changes

- Updated dependencies [e79cbd5]
  - @arcevo/facet-tokens@1.0.0
