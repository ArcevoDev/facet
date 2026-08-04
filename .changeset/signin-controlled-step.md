---
"@arcevo/facet-auth": minor
---

SignIn now supports a controlled `step` + `onStepChange` API: pass `step` to render exactly that step and drive the component from outside (e.g. a live state-machine diagram), and SignIn reports every internal transition via `onStepChange`. Fully backward compatible: when `step` is omitted, SignIn manages its own transitions as before.
