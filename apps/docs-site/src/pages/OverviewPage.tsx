import { GuidePage, H2, P, Code, Pre, Ul, Li } from "../components/Guide.js";

export function OverviewPage() {
  return (
    <GuidePage
      title="facet"
      description="Domain-customizable, auth-first component system for the Arcevo ecosystem."
    >
      <P>
        facet is what you get when you own the identity backend (arc-id), have a formal design
        manual (Alpha Palette), and your auth requirements differ per sector (fintech vs med vs edu
        vs enterprise).
      </P>

      <H2>Packages</H2>
      <Ul>
        <Li>
          <Code>@arcevo/facet-tokens</Code>: Alpha Palette design tokens, typography, spacing, CSS
          variables.
        </Li>
        <Li>
          <Code>@arcevo/facet-sdk</Code>: arc-id API client (pure fetch, typed, 10 domain SDKs).
        </Li>
        <Li>
          <Code>@arcevo/facet-components</Code>: 47 styled UI components (Radix + tailwind-merge +
          variants).
        </Li>
        <Li>
          <Code>@arcevo/facet-auth</Code>: auth components + domain presets: SignIn, SignUp, Guard,
          MfaDialog, forms.
        </Li>
        <Li>
          <Code>@arcevo/facet-layout</Code>: domain-configurable app shell: ConsoleLayout,
          AuthLayout, LandingLayout, Sidebar, Topbar, 5 presets.
        </Li>
      </Ul>

      <H2>Architecture</H2>
      <P>
        Every component follows 4 layers: <strong>Primitive → Styled Base → Composed → Domain
        Preset</strong>. Customization runs along 3 axes: <Code>appearance</Code> (style),{" "}
        <Code>config</Code> (behavior), and <Code>slots</Code> (render props).
      </P>

      <H2>Quick start</H2>
      <Pre>{`pnpm install
pnpm build
pnpm test      # 108 tests across 4 packages (vitest)
pnpm typecheck # all projects`}</Pre>

      <P>Consume in your app:</P>
      <Pre>{`import { ConsoleLayout, enterpriseLayoutPreset } from "@arcevo/facet-layout";
import { AuthGuard } from "@arcevo/facet-auth";

function App() {
  return (
    <ConsoleLayout config={enterpriseLayoutPreset} tenants={tenants}>
      <AuthGuard>
        <YourRoutes />
      </AuthGuard>
    </ConsoleLayout>
  );
}`}</Pre>

      <H2>Publishing</H2>
      <P>
        Packages publish to npm under the <Code>@arcevo/facet-*</Code> scope via Changesets. The
        GitHub Actions workflow runs <Code>pnpm changeset publish</Code> on <Code>main</Code> using
        the <Code>NPM_TOKEN</Code> secret.
      </P>
    </GuidePage>
  );
}
