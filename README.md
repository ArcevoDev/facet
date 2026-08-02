# facet

Domain-customizable auth-first component system for the ArcevoCirqle ecosystem.

facet is what you get when you own the identity backend (arc-id), have a formal
design manual (Alpha Palette), and your auth requirements differ per sector
(fintech vs med vs edu vs enterprise).

## Packages

| Package              | Description                                                                                         | Status  |
| -------------------- | --------------------------------------------------------------------------------------------------- | ------- |
| `@arcevo/facet-tokens`     | Design tokens: Alpha Palette, typography, spacing, CSS vars                                         | ✅ 1.0.1 |
| `@arcevo/facet-sdk`        | arc-id API client (pure fetch, typed, 10 domain SDKs)                                               | ✅ 1.0.1 |
| `@arcevo/facet-components` | 45+ styled UI components (Radix + tailwind-merge + variants)                                        | ✅ 1.0.2 |
| `@arcevo/facet-auth`       | Auth components + domain presets: SignIn, SignUp, Guard, MfaDialog, forms                           | ✅ 1.0.2 |
| `@arcevo/facet-layout`     | Domain-configurable app shell: ConsoleLayout, AuthLayout, LandingLayout, Sidebar, Topbar, 5 presets | ✅ 1.0.2 |

Published to npm: components/auth/layout at 1.0.2, tokens/sdk at 1.0.1.

## Sites

- Landing: https://facet.arcevocirqle.com.ng
- Docs: https://docs.facet.arcevocirqle.com.ng

## Quick Start

```sh
pnpm install
pnpm build
pnpm test      # 108 tests across 4 packages (vitest)
pnpm typecheck # all 7 projects
```

Consume in your app:

```tsx
import { ConsoleLayout, enterpriseLayoutPreset } from "@arcevo/facet-layout";
import { AuthGuard } from "@arcevo/facet-auth";

function App() {
  return (
    <ConsoleLayout config={enterpriseLayoutPreset} tenants={tenants}>
      <AuthGuard>
        <YourRoutes />
      </AuthGuard>
    </ConsoleLayout>
  );
}
```

## Architecture

Every component follows 4 layers: **Primitive → Styled Base → Composed → Domain Preset**.
Customization via 3 axes: `appearance` (style), `config` (behavior), `slots` (render props).

### Layout Shell

Framework-agnostic slot-based shells: no routing dependency:

- **ConsoleLayout**: sidebar + topbar + content area, mobile sheet, auth-aware.
  Two sidebar versions: `mode="full"` (always-labeled sidebar) and
  `mode="rail"` (collapsible to an icon-only rail, choice persisted in
  localStorage). Both are screen responsive (mobile collapses to a Sheet).
- **AuthLayout**: branded split-panel auth page frame (login/register/MFA,
  forgot-password) with brand logo, tagline, and benefits on the left panel
  and a centered card on the right. Mobile shows a compact centered layout.
  Formerly named AppLayout; the old name remains as a deprecated alias.
- **LandingLayout**: full-bleed marketing page, glassmorphic hero, glow CTAs.
  Pair it with the `Navbar` `pill` variant for a floating frosted-glass bar.
- **5 domain presets**: fintech, med, edu, enterprise, default

### Auth System

```tsx
import { fintechAuthPreset, SignIn, MfaVerifyForm } from "@arcevo/facet-auth";

// Domain presets customise every copy, step, and behaviour
<SignIn authPreset={fintechAuthPreset} layoutPreset={fintechLayoutPreset} />;
```

Forms are independently importable: `LoginForm`, `MagicLinkForm`, `ForgotPasswordForm`,
`MfaVerifyForm`, `MfaSetupForm`, `MfaRecoveryForm`.

## Publishing

Packages publish to npm under the `@arcevo/facet-*` scope via Changesets.
The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs
`pnpm changeset publish` on `main` using the `NPM_TOKEN` secret.

```sh
pnpm changeset publish   # ships unpublished packages at their current version
```

## Dev Preview

```sh
pnpm dev:docs   # Storybook → http://localhost:6006 (local)
pnpm dev:landing # Landing → http://localhost:5173 (local)
```

## License

MIT: ArcevoCirqle
