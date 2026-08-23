---
"@arcevo/facet-components": minor
---

Rebuild the Resizable component for react-resizable-panels v4 compatibility and
flexibility:

- **Fix defaultSize bug**: react-resizable-panels v4 interprets bare numbers as
  pixels (e.g. `defaultSize={50}` → 50 px), but facet docs and examples all
  pass `defaultSize={50}` expecting 50 %. The component now normalizes 0–100
  numbers to percentage strings automatically (`normalizeSize`).
- **Add `useResizable` hook** for imperative control — `groupRef`, `panelRef`,
  `getLayout`, `setLayout`, `collapse`, `expand`, `isCollapsed`, `resize`,
  `getSize`.
- **Add `useResizableLayout` hook** wrapping v4's `useDefaultLayout` for
  localStorage persistence of panel sizes.
- **Export TypeScript types**: `ResizablePanelGroupProps`,
  `ResizablePanelProps`, `ResizableHandleProps`, `ResizableImperativeHandle`.
- **Expose collapsible panel support** (`collapsible` / `collapsedSize` props)
  via v4 pass-through.
- **Fix** stale manifest description and **add** a collapsible variant to the
  docs gallery.
- **Fix** flaky `docs-app.test.tsx` — lazy-loaded `DocsLayout` needs >1000 ms
  under load; `findByTestId` timeout raised to 5000 ms.
