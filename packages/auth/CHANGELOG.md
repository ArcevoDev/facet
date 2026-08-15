# @arcevo/facet-auth

## 1.2.0

### Minor Changes

- 9360e93: feat(auth): animated submit buttons on all auth forms (overridable)

  SignUp, LoginForm, ResetPasswordForm, ForgotPasswordForm, MagicLinkForm, and the MFA recovery-codes form now render their primary submit/confirm buttons through `AnimatedButton` (default "shine"), so forms get a consistent animated CTA. Each form accepts a `submitButton` prop:

  - `submitButton.animation`: "sparkle" | "ripple" | "magnetic" | "shine" | "none" (default "shine").
  - `submitButton.renderButton`: fully replace the built-in button with your own component.

  Secondary/utility buttons (back, cancel, recovery, OAuth, outline) stay as plain Button by design.

- 2236aa8: feat(auth): full copy flexibility on forms - every label, placeholder, button, and error is editable

  SignUp, LoginForm, and ResetPasswordForm now accept a `copy` prop that overrides any static text: titles, descriptions, field labels, placeholders, submit/submitting labels, footer links, and in-form error messages (e.g. password mismatch). Each copy object falls back to the existing defaults when omitted, so current consumers are unaffected.

  New exported types + defaults: `SignUpCopy` / `LoginCopy` / `ResetPasswordCopy` (+ `MfaCopy` reserved) and `defaultSignUpCopy` / `defaultLoginCopy` / `defaultResetPasswordCopy` / `defaultMfaCopy`. `slots.title` / `slots.description` still take precedence when both are provided.

  Docs: Sign Up page documents the `copy` prop with an example.

### Patch Changes

- Updated dependencies [9360e93]
- Updated dependencies [8d922f7]
- Updated dependencies [78b6543]
  - @arcevo/facet-components@1.8.0

## 1.1.6

### Patch Changes

- Updated dependencies [d2b43d0]
  - @arcevo/facet-components@1.7.0

## 1.1.5

### Patch Changes

- Updated dependencies [8a7aef3]
  - @arcevo/facet-components@1.6.0

## 1.1.4

### Patch Changes

- Updated dependencies [b95bcb0]
  - @arcevo/facet-sdk@1.1.0

## 1.1.3

### Patch Changes

- Updated dependencies [3554506]
  - @arcevo/facet-components@1.5.0

## 1.1.2

### Patch Changes

- Updated dependencies
  - @arcevo/facet-components@1.4.0

## 1.1.1

### Patch Changes

- Updated dependencies [251a0e4]
- Updated dependencies [865bf7e]
- Updated dependencies [69c1fec]
- Updated dependencies [b878bfd]
- Updated dependencies [6bb55a2]
  - @arcevo/facet-components@1.3.0

## 1.1.0

### Minor Changes

- 568497d: SignIn now supports a controlled `step` + `onStepChange` API: pass `step` to render exactly that step and drive the component from outside (e.g. a live state-machine diagram), and SignIn reports every internal transition via `onStepChange`. Fully backward compatible: when `step` is omitted, SignIn manages its own transitions as before.

### Patch Changes

- Updated dependencies [3de0e04]
  - @arcevo/facet-components@1.2.0

## 1.0.3

### Patch Changes

- Updated dependencies [3752a98]
  - @arcevo/facet-components@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @arcevo/facet-components@1.0.2

## 1.0.1

### Patch Changes

- d94a724: chore: update homepage to facet.arcevocirqle.com.ng
- Updated dependencies [d94a724]
  - @arcevo/facet-components@1.0.1
  - @arcevo/facet-sdk@1.0.1

## 1.0.0

### Major Changes

- e79cbd5: initial publish...

### Patch Changes

- Updated dependencies [e79cbd5]
  - @arcevo/facet-sdk@1.0.0
  - @arcevo/facet-components@1.0.0
