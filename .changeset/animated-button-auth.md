---
"@arcevo/facet-auth": minor
---

feat(auth): animated submit buttons on all auth forms (overridable)

SignUp, LoginForm, ResetPasswordForm, ForgotPasswordForm, MagicLinkForm, and the MFA recovery-codes form now render their primary submit/confirm buttons through `AnimatedButton` (default "shine"), so forms get a consistent animated CTA. Each form accepts a `submitButton` prop:

- `submitButton.animation`: "sparkle" | "ripple" | "magnetic" | "shine" | "none" (default "shine").
- `submitButton.renderButton`: fully replace the built-in button with your own component.

Secondary/utility buttons (back, cancel, recovery, OAuth, outline) stay as plain Button by design.
