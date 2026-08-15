---
"@arcevo/facet-auth": minor
---

feat(auth): full copy flexibility on forms - every label, placeholder, button, and error is editable

SignUp, LoginForm, and ResetPasswordForm now accept a `copy` prop that overrides any static text: titles, descriptions, field labels, placeholders, submit/submitting labels, footer links, and in-form error messages (e.g. password mismatch). Each copy object falls back to the existing defaults when omitted, so current consumers are unaffected.

New exported types + defaults: `SignUpCopy` / `LoginCopy` / `ResetPasswordCopy` (+ `MfaCopy` reserved) and `defaultSignUpCopy` / `defaultLoginCopy` / `defaultResetPasswordCopy` / `defaultMfaCopy`. `slots.title` / `slots.description` still take precedence when both are provided.

Docs: Sign Up page documents the `copy` prop with an example.
