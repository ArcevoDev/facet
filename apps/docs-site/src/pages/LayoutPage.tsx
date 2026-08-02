import { GuidePage, PageNav, H2, P, Code, Pre } from "../components/Guide.js";

export function LayoutPage() {
  return (
    <GuidePage
      title="Layout"
      description="Framework-agnostic, slot-based app shells with no routing dependency."
      back={{ label: "Back to Auth", to: "/auth" }}
    >
      <H2>ConsoleLayout</H2>
      <P>
        Dashboard shell: sidebar + topbar + content area. Two sidebar versions:{" "}
        <Code>mode="full"</Code> (always-labeled) and <Code>mode="rail"</Code> (collapsible to an
        icon-only rail, persisted in localStorage). Mobile collapses to a Sheet.
      </P>
      <Pre>{`<ConsoleLayout config={defaultLayoutPreset} mode="full">
  <YourContent />
</ConsoleLayout>`}</Pre>

      <H2>AuthLayout</H2>
      <P>
        Branded split-panel auth page frame (login/register/MFA) with brand logo, tagline, and
        benefits on the left, centered card on the right. Formerly <Code>AppLayout</Code>; the old
        name remains as a deprecated alias.
      </P>

      <H2>LandingLayout</H2>
      <P>
        Full-bleed marketing page with glassmorphic hero and glow CTAs. Pair with the{" "}
        <Code>Navbar</Code> <Code>pill</Code> variant for a floating frosted bar.
      </P>

      <H2>Sidebar & Topbar</H2>
      <P>
        Use <Code>Sidebar</Code> (driven by a <Code>LayoutConfig</Code>{" "}
        <Code>navigation</Code>) and <Code>Topbar</Code> standalone with{" "}
        <Code>LayoutProvider</Code>. This docs site is itself built from these components.
      </P>

      <H2>Domain presets</H2>
      <P>
        Five <Code>LayoutConfig</Code> presets ship ready-made and match the auth presets:{" "}
        <Code>fintechLayoutPreset</Code>, <Code>medLayoutPreset</Code>,{" "}
        <Code>eduLayoutPreset</Code>, <Code>enterpriseLayoutPreset</Code>,{" "}
        <Code>defaultLayoutPreset</Code>.
      </P>
      <P>
        Register and resolve custom presets via <Code>registerLayoutPreset</Code> /{" "}
        <Code>getLayoutPreset</Code> / <Code>resolveLayoutPreset</Code>.
      </P>

      <H2>Router adapter</H2>
      <P>
        facet never imports a router. Pass a <Code>RouterAdapter</Code> (or{" "}
        <Code>createDefaultAdapter()</Code>) so Sidebar, Navbar, and UserMenu render framework-native
        links and detect the active route. Adapters exist for Next.js App Router, Remix, and React
        Router.
      </P>
      <Pre>{`<ConsoleLayout config={config} router={myRouterAdapter}>
  ...
</ConsoleLayout>`}</Pre>

      <PageNav
        prev={{ label: "Auth", to: "/auth" }}
        next={{ label: "Components", to: "/components" }}
      />
    </GuidePage>
  );
}
