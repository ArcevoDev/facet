# @arcevo/facet-components

## 1.4.0

### Minor Changes

- DataTable: export consolidated into a single Export dropdown (CSV + pluggable exporters), plus a new overflow (⋯) actions menu for bulk row actions (select-all, mark-as-read, delete-all, custom). NavigationMenuLink is now a padded, hover-styled block link (fixes cramped dropdown items) and supports an optional description. NumberInput gains a built-in currency picker: CURRENCIES list, currencyPicker dropdown, currencyOptions override, and onCurrencyChange.

  New components: DateInput (ISO date validation + native fallback), PasswordInput (show/hide toggle), and InfiniteScroll (vertical/horizontal, IntersectionObserver sentinel).

  CountryCodeInput expands to the full ISO country list with regional restriction filtering (includeRegions/excludeRegions). LocationPicker deepens the country dataset (Nigeria states + LGA/LCDA) and exports typed CountryInput / StateInput / LGAInput sub-inputs. DatePicker adds a year picker. QRCode gains a logo variant with configurable position. DataTable's generic constraint is relaxed so plain interfaces work as row types.

  Docs package: demos, variants, and usage snippets updated for all of the above.

## 1.3.0

### Minor Changes

- 865bf7e: feat(components): add a slim `/light` subpath entry

  `@arcevo/facet-components/light` re-exports only the lightweight,
  high-frequency modules (cn, Button, Icon registry, ThemeProvider/useTheme/
  ThemeToggle, DropdownMenu family, Kbd, Tabs). Consumers whose eager app
  shell only needs those can import from `/light` instead of the full barrel,
  so the heavy components (Dialog, Form, Dropzone, QRCode, InputOTP, ...)
  stay out of the initial bundle.

  ```ts
  import { Icon, ThemeProvider, DropdownMenu } from "@arcevo/facet-components/light";
  ```

- 6bb55a2: feat(components): add `timeline` variant to Roadmap

  `<Roadmap variant="timeline" />` renders the lighter landing-page look:
  a mono uppercase phase label next to the status badge, with a status dot
  on the connector line and no card chrome. The `date` field renders as the
  phase label. Default (`card`) behavior is unchanged. Added a docs variant
  ("Timeline") + usage snippet + test.

### Patch Changes

- 251a0e4: fix: alert success/warning colors, mobile table overflow, auth docs cleanup

  - components: Alert success and warning variants now use their semantic
    text colors (text-success green, text-warning amber) matching the
    destructive variant, instead of text-foreground. Added an alert test.
  - layout: the ConsoleLayout main area gets min-w-0 so wide tables scroll
    inside their own overflow-x-auto container instead of overflowing the
    page on mobile.
  - docs: remove the /auth/forms page (its LoginForm demo rendered a blank
    page) and the redundant /auth/layouts page (covered by the Ecosystem
    Layout page). Cleaned up the login-form manifest entry, variant, and
    usage. Fixed stale docs claims: 52 -> 57 components, added facet-cli to
    the package list, corrected the publishing note (CI is validation-only)
    and the fintechAuthPreset -> fintechPreset snippet name.

- 69c1fec: fix(data-table): relax generic row constraint from `Record<string, unknown>` to `object`

  DataTable/DataTableColumn previously required `T extends Record<string, unknown>`,
  which rejects plain `interface` row types (TS2344: interfaces lack an index
  signature). Consumers had to convert their row interfaces to `type` aliases.
  The constraint is now `object`, with index access isolated behind narrow
  helpers (`cellValue`, `rowKeyValue`), so interfaces and classes both work.

- b878bfd: fix(docs): layout page no longer takes over the shell; back button; marquee

  - docs: the /layout page had live layout demo blocks whose fixed-position
    sidebars escaped and covered the docs shell (the arc-id demo sidebar).
    Removed every live demo block from the page; it is now text + copyable
    code only. Verified in the browser: the facet sidebar renders normally.
  - docs: add a Back button at the top of every content page body (goes back
    in history, falls back to /) so routing between pages is easier.
  - components: Marquee track no longer forces whitespace-nowrap, so card
    children wrap naturally instead of clipping; the default text variant
    wraps its items in nowrap spans.
  - landing: the install steps strip switched from ScrollArea to the facet
    Marquee (pause-on-hover), dogfooding the component internally.

## 1.2.0

### Minor Changes

- 3de0e04: - `AvatarGroup` gains a subtle hover effect (lift + ring) with a `disableHover` opt-out.
  - `Dropzone` gains clipboard paste support (`allowPaste`): pasted files are validated against `accept`, and pasted text is wrapped in a text file when the clipboard carries no files.
  - Adds `tw-animate-css` as a direct dependency so the animation utilities resolve for components consumers.

### Patch Changes

- Updated dependencies [3de0e04]
  - @arcevo/facet-tokens@1.1.0

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
