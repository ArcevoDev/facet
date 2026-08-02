# facet: Engineering Handbook

## Overview

facet is the shared UI layer for the Arcevo ecosystem (arc-id, arcbase, arc-wallet).
It replaces ~100 duplicated shadcn components between projects with a single,
domain-customizable auth-first component system.

**Key constraint:** Auth components must be domain-customizable (fintech vs med vs edu): not one-size-fits-all.

## Architecture

Every component follows a 4-layer architecture:

1. **Primitive**: Radix/headless (unstyled, accessible)
2. **Styled Base**: Primitive + Alpha Palette tokens + animation
3. **Composed**: Multiple Layer-2 components wired into a flow
4. **Domain Preset**: Layer-3 with domain-specific defaults

Three customization axes: `appearance` (style), `config` (behavior flags), `slots` (render props).

## Package Layout

```
packages/tokens/       ← Design tokens (finished)
packages/sdk/          ← arc-id SDK (finished)
packages/components/   ← 47 styled Radix components (shadcn-style, Radix + tailwind-merge)
packages/auth/         ← Auth components + presets
packages/layout/       ← Domain-configurable app shell (ConsoleLayout, AuthLayout, LandingLayout)
apps/docs/             ← Documentation site
apps/landing/          ← Landing page
```

## Code Standards

- TypeScript strict mode, ESM-only
- React 19, functional components with hooks
- Tailwind CSS v4 for styling (unless overridden by `appearance` API)
- `clsx` + `tailwind-merge` for className merging (use `cn()`)
- Every component accepts `className` for override
- Exports: named exports only (no default exports)
- File naming: kebab-case (e.g., `sign-in.tsx`, `use-session.ts`)
- Barrel exports from package `index.ts`

## SDK Architecture

`@arcevo/facet-sdk` is a pure fetch client. No React, no axios. Each API domain
gets its own class that takes `ArcIdClient` in its constructor. Consumers
instantiate the modules they need:

```ts
const client = new ArcIdClient({ baseUrl });
const auth = new AuthSdk(client);
const { data, error } = await auth.signIn({ email, password });
```

## Auth State Machine

The `SignIn` component is a configurable state machine:

```
IDLE → CHECK_SESSION → (authenticated → REDIRECT)
                      → (unauthenticated → SELECT_METHOD)

SELECT_METHOD → (email_password → LOGIN_FORM)
              → (magic_link → MAGIC_LINK_FORM)
              → (social → SOCIAL_LOGIN)
              → (passkey → PASSKEY_AUTH)

LOGIN_FORM → (success → CHECK_MFA)
           → (error → LOGIN_FORM)

CHECK_MFA → (mfa_not_required → COMPLETE)
          → (mfa_required → MFA_CHALLENGE)

MFA_CHALLENGE → (verified → COMPLETE)
              → (error → MFA_CHALLENGE)

COMPLETE → (onSuccess callback) → redirect
         → (step_up_required → STEP_UP)
```

## Domain Presets

| Feature      | Fintech | Med    | Edu   | Enterprise |
| ------------ | ------- | ------ | ----- | ---------- |
| MFA required | ✅      | ✅     | ❌    | ✅         |
| Passkeys     | ❌      | ❌     | ✅    | optional   |
| Session TTL  | 15 min  | 30 min | 24 hr | 8 hr       |
| Magic link   | ✅      | ❌     | ✅    | ❌         |

## Build Status (2026-08-01)

1. ✅ `packages/tokens/`: Complete
2. ✅ `packages/sdk/`: Complete, strict domain types (`sdk/src/types.ts`)
3. ✅ `packages/components/`: 47 styled Radix components + theme system + IconRegistry
4. ✅ `packages/auth/`: ArcProvider, SignIn, SignUp, UserButton, Guard, MfaDialog, 7 standalone forms
5. ✅ `packages/layout/`: ConsoleLayout (full + rail modes), AuthLayout (renamed from AppLayout, alias kept), LandingLayout, 5 presets
6. ✅ `apps/docs/`: Storybook 10.5.5, 50+ story files + 5 MDX docs, mock SDK decorator
7. ✅ Changesets + npm publish pipeline
8. ✅ `apps/landing/`: rebuilt public-facing site (vite + tailwind v4)
9. ✅ Layout stories: ConsoleLayout, AuthLayout, Sidebar, Topbar, PageHeader, LandingLayout
10. ✅ Tests: vitest workspace, 108 tests across sdk/components/auth/layout (12 files)
11. ✅ SignIn mfa_challenge wired to MfaVerifyForm
12. ✅ Verified 2026-08-01: `pnpm build` green, `pnpm test` green, `pnpm typecheck` green (after fixing docs mock-sdk.ts to strict SDK types). `pnpm lint` hangs on this machine (environment issue).
13. ✅ Publish pipeline in place: `@arcevo/facet-*` scope on npm, Changesets + GitHub Actions on `main` with `NPM_TOKEN`.

## Known Gaps for arc-id Consumption

When arc-id adopts facet as its frontend, these need resolution:

**Resolved blockers (were blockers, now fixed):**

1. ✅ **SDK 401 auto-refresh**: Added `onTokenRefresh` callback to `ArcIdClient` (`client.ts:113-124`). Automatic retry on 401.
2. ✅ **Placeholder handlers**: `handlePasskeyAuth` now calls `passkeySdk.authenticationOptions()` → `navigator.credentials.get()` → `passkeySdk.authenticate()`. `handleForgotPasswordSubmit` calls `authSdk.forgotPassword()`. No longer stubs.
3. ✅ **Test infrastructure**: Vitest workspace, 108 tests across sdk/components/auth/layout (12 files).
4. ✅ **SignIn MFA challenge**: Wired to `MfaVerifyForm` (2026-07-31).
5. ✅ **Duplicate dropdowns**: `layout/UserMenu` now uses `@arcevo/facet-components` `DropdownMenu`.
6. ✅ **Type strictness**: SDK now has strict domain interfaces in `sdk/src/types.ts`; `Record<string, unknown>` eliminated.
7. ✅ **Sidebar router coupling**: `RouterAdapter` pattern (`router.tsx`) supports Next.js App Router, Remix, and React Router.
8. ✅ **Theme switching**: `ThemeProvider`/`useTheme`/`ThemeToggle` with localStorage persistence + system preference detection.
9. ✅ **OAuth provider buttons**: SignIn renders provider buttons from `config.oauthProviders` and calls `onOAuth`.
10. ✅ **Form validation**: Auth forms integrate react-hook-form + zod with inline errors.
11. ✅ **Domain preset registry**: `registerPreset`/`getPreset`/`resolvePreset` in auth and layout.
12. ✅ **Docs mock types**: `apps/docs/src/stories/mock-sdk.ts` now typed against strict SDK types (User/Membership, TokenBundle), so `pnpm typecheck` is green repo-wide.
13. ✅ **Icon library registry**: `IconRegistry` shipped in 1.0.2 (`icon/registry.tsx`): `IconProvider`/`Icon`/`registerIcon`/`getIcon` with lucide-react as the default set and domain overrides supported.

**Still open (not blockers):** 1. **No Tailwind config**: No `tailwind.config.*`. Relies on CSS variables. Consumers need `tailwindcss-animate` plugin. 2. **Bundle optimization**: tsup uses CLI flags, not config files; no code-splitting or tree-shake analysis. 3. **CSS build pipeline**: Tokens CSS is copied via inline `fs.cpSync` instead of a proper build step (PostCSS + autoprefixer + minification). 4. **Turbo validation**: `turbo.json` exists but hasn't been validated with a real run. 5. **Component a11y audit**: Radix primitives provide baseline accessibility, but compounded components (SignIn state machine, MfaDialog phases) need keyboard navigation and screen reader testing before third-party use.

## Consumption Target

arc-id will consume facet as npm-published packages:

- `src/components/ui/*` → replace with `@arcevo/facet-components`
- `src/components/auth/*` → replace with `@arcevo/facet-auth`
- `src/sdk/*` → replace with `@arcevo/facet-sdk`
- `globals.css :root` → replace with `@arcevo/facet-tokens/tokens.css`

arc-id keeps: Zustand stores, hooks, providers (tenant hydration), pages, layout components (until replacing with `@arcevo/facet-layout`).

## Commands

```sh
pnpm install              # Install all workspace dependencies
pnpm build                # Build all packages
pnpm build:tokens         # Build tokens only
pnpm build:sdk            # Build SDK only
pnpm dev:docs             # Start documentation site
pnpm typecheck            # TypeScript check all packages
pnpm lint                 # ESLint all packages
pnpm format               # Prettier format all files
```

## AGENTS.md

Always read `AGENTS.md` at the start of every session. It contains the
compressed AI-agent rules that override or supplement this handbook.
