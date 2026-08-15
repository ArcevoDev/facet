---
"@arcevo/facet-emails": minor
"@arcevo/facet-cli": minor
---

feat: email template primitives (Section/Row/Column, variants, code grid) + `facet emails init`

**@arcevo/facet-emails**

- New `EmailSection` / `EmailRow` / `EmailColumn` primitives (table-based containers matching react-email Section/Row/Column), so consumers can build grid/detail layouts.
- `EmailSecurityNotice` gains a `variant` prop (`warning` | `danger` | `info`) and a children/callout form in addition to the IP/device table form.
- `EmailCodeBlock` now supports a `codes: string[]` + `columns: 1 | 2` grid path for recovery-code style emails, alongside the existing single-code path.
- All primitives continue to accept inline `style` objects and inherit the `brand` tokens (primary, background, surface, text, muted, fontFamily, radius, brandName) passed to `renderEmail`, so consumers can fully re-brand without forking.

**@arcevo/facet-cli**

- New `facet emails init` command that detects the consumer's mail setup (react-email, mjml, nodemailer, resend, sendgrid, SES, postmark) from the manifests and either:
  - offers a migration path when an existing renderer is found, or
  - scaffolds a fresh `emails/` dir (brand tokens, layout wrapper, template registry with a sample welcome template, dev preview server, provider `send.ts` for resend/nodemailer, and `.env.example`).
- Auto-installs `@arcevo/facet-emails` plus the provider SDK via the detected package manager (fails soft printing the exact command), and prints the setup guide (provider keys, preview URL, how to send).
- Flags: `-y`, `--framework`, `--migrate` / `--fresh`, `--provider resend|nodemailer|none`, `--location`, `--name`.

**Consumer validation**

- arc-id's mail system (13 templates, components, engine, preview route) now renders through `@arcevo/facet-emails` with ArcID's own design tokens mapped into the brand option; all templates verified rendering valid HTML + plain text with no `undefined`. react-email is removed from arc-id; resend stays for delivery.
