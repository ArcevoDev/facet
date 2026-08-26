import { ChangelogList, type ChangelogRelease } from "@arcevo/facet-components";
import { LightIcon } from "@arcevo/facet-components/light";

/**
 * Facet release log shown on the landing home page. Pulled from the
 * shipped changelog so consumers can verify what's actually published.
 * Updates when `pnpm changeset version` runs and CHANGELOG.md is touched.
 */
const RELEASES: ChangelogRelease[] = [
  {
    version: "1.11.0",
    date: "2026-08-26",
    tag: "release",
    changes: [
      { kind: "added", text: "Stepper primitive (headless useStepper + StepperNav / StepperPanel / StepperFooter)" },
      { kind: "added", text: "KanbanBoard with native HTML5 drag-and-drop, move/add/remove cards" },
      { kind: "added", text: "ChangelogList with filter chips and kind-grouped bullets" },
      { kind: "fixed", text: "SignIn mfa_challenge wired to MfaVerifyForm" },
    ],
  },
  {
    version: "1.10.0",
    date: "2026-08-18",
    tag: "release",
    changes: [
      { kind: "added", text: "AccountSettingsPanel nav + section content" },
      { kind: "added", text: "SecuritySectionCard grid (MFA, passkeys, sessions, audit, webhooks, API keys)" },
      { kind: "added", text: "ActivityFeed + StatCard + PageHeader for console surfaces" },
      { kind: "changed", text: "NotFound component gains gradient animation variant" },
    ],
  },
  {
    version: "1.4.0",
    date: "2026-08-12",
    tag: "release",
    changes: [
      { kind: "added", text: "FaqSection component (drop-in FAQ surface with copy)" },
      { kind: "added", text: "IconRegistry (IconProvider / Icon / registerIcon)" },
      { kind: "fixed", text: "Billing interval toggle now honors the active state" },
      { kind: "removed", text: "Storybook + 48 story fixtures (replaced by docs inventory drift gate)" },
    ],
  },
];

export function ChangelogSection() {
  return (
    <section id="changelog" className="mx-auto max-w-3xl px-8 py-24">
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <LightIcon name="history" size={12} />
          Release log
        </span>
        <h2 className="mt-4 text-3xl font-bold text-foreground font-heading sm:text-4xl">
          What shipped recently
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every release is on npm. The ChangelogList component on this page is the
          same one consumers drop into their own docs sites.
        </p>
      </div>
      <ChangelogList releases={RELEASES} showFilter />
    </section>
  );
}