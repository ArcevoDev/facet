---
"@arcevo/facet-components": minor
---

- `AvatarGroup` gains a subtle hover effect (lift + ring) with a `disableHover` opt-out.
- `Dropzone` gains clipboard paste support (`allowPaste`): pasted files are validated against `accept`, and pasted text is wrapped in a text file when the clipboard carries no files.
- Adds `tw-animate-css` as a direct dependency so the animation utilities resolve for components consumers.
