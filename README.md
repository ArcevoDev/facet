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
| `@arcevo/facet-components` | 57 styled UI components (Radix + tailwind-merge + variants)                               | ✅ 1.1.0 |
| `@arcevo/facet-auth`       | Auth components + domain presets: SignIn, SignUp, Guard, MfaDialog, forms                           | ✅ 1.0.3 |
| `@arcevo/facet-layout`     | Domain-configurable app shell: ConsoleLayout, AuthLayout, LandingLayout, Sidebar, Topbar, 5 presets | ✅ 1.1.0 |
| `@arcevo/facet-docs`       | Installable docs engine: mount `<DocsApp>` with your own brand, nav, pages                          | 📦 1.1.0 |
| `@arcevo/facet-cli`        | Scaffold a docs site (`facet docs init`) + copy components (`facet add`)                            | 🧪 0.1.0 |

Published to npm: components/layout at 1.1.0, auth at 1.0.3, tokens/sdk at 1.0.1, docs at 1.1.0.
Components 1.1.0 shipped 11 new components (color-picker, country-code-input, data-table, date-picker, dropzone, form, location-picker, marquee, number-input, qrcode, roadmap) and removed `notification-bell`.

## Sites

- Landing: https://facet.arcevocirqle.com.ng
- Demo-Docs (component gallery + docs): https://docs.facet.arcevocirqle.com.ng

## Documentation

The docs site (`apps/docs`) is a thin consumer of the installable
`@arcevo/facet-docs` engine, the same package any project can mount with its
own brand, nav, and pages. Guides cover getting started, auth, layout,
theming, tokens, and the docs package itself; the component gallery shows all
57 components with live demos and usage tabs.

```sh
pnpm dev:docs-site  # run the docs site locally (Vite, port 5173)
```

### Docs CLI

Scaffold a docs site in any repo (framework-agnostic) with the interactive
wizard, or copy a component into your source:

```sh
npx @arcevo/facet-cli docs init   # pick name, location, stack, styling
npx @arcevo/facet-cli add button  # shadcn-style copy (package import recommended)
```

The wizard detects your frontend framework (ignoring backend stacks), your
package manager, and your styling (facet tokens / Tailwind / plain CSS),
then resolves the current facet package versions from npm and patches your
existing `package.json` rather than overwriting it. See
`packages/cli/README.md` for the full flow.

## Quick Start

```sh
pnpm install
pnpm build
pnpm test      # vitest workspace (sdk/components/auth/layout)
pnpm typecheck # all 8 projects
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
Publishing is done **locally** by the maintainer — run `pnpm changeset publish`
from a terminal authenticated with npm (no CI publish job). The GitHub
Actions workflow (`.github/workflows/ci-cd.yml`) is a validation gate only:
it builds, typechecks, and runs the docs inventory check on `main`/PRs, but
never publishes. The previous automated publish job was removed after it hit
repo-fetch errors in CI; re-enabling it is tracked as a follow-up.

```sh
pnpm changeset publish   # ships unpublished packages at their current version
```

## Dev Preview

```sh
pnpm dev:docs-site  # Docs demo site → http://localhost:5173 (local)
pnpm dev:landing    # Landing → http://localhost:5173 (local)
```

## License

MIT: ArcevoCirqle
