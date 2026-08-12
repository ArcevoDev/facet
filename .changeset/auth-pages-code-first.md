---
"@arcevo/facet-docs": patch
---

fix(docs): auth pages render again; remove crashing live demos

The SignUp, MFA, and Guard pages rendered a blank screen because their live
demos wrapped auth forms in ArcProvider with a dead demo endpoint, which
suspended the render without an error. Converted those pages to code-first
documentation (accurate importable snippets + full prose) and removed the
crashing sign-up/mfa-dialog/guard entries from the gallery manifest,
variant cells, and usage snippets. SignIn keeps its working live demo.

Verified in the browser: /auth/sign-up, /auth/mfa, and /auth/guard all
render their content again.
