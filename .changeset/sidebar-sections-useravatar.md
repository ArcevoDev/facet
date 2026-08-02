---
"@arcevo/facet-layout": minor
---

- Sidebar nav sections now persist their collapsed state per section (`NavSection.id`, stored in localStorage), Storybook-style.
- `UserMenu` now renders the shared `UserAvatar` from `@arcevo/facet-components` (picture support, Settings link via the layout router adapter), replacing the duplicated inline avatar/dropdown.
