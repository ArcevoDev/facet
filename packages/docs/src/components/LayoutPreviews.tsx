import { Button, Navbar } from "@arcevo/facet-components";
import { CodeBlock } from "./CodeBlock.js";

function CodeShell({
  title,
  description,
  code,
}: {
  title: string;
  description: string;
  code: string;
}) {
  return (
    <section className="not-prose mt-8">
      <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <CodeBlock title={`${title} usage`} code={code} />
      </div>
    </section>
  );
}

/**
 * Preview blocks for the /layout docs page.
 *
 * Full app shells (ConsoleLayout, AuthLayout, LandingLayout) are documented
 * code-first: their sidebars/topbars use fixed positioning that escapes any
 * CSS container, which would take over the docs shell. The standalone
 * Sidebar + Topbar composition and the pill Navbar are self-contained, so
 * they get live previews.
 */
export function LayoutPreviews() {
  return (
    <div className="space-y-2">
      <CodeShell
        title="ConsoleLayout"
        description={'Dashboard shell: sidebar + topbar + content area. mode="full" is always-labeled; mode="rail" collapses to an icon-only rail. Mobile collapses to a Sheet.'}
        code={`import { ConsoleLayout, defaultLayoutPreset } from "@arcevo/facet-layout";

<ConsoleLayout config={defaultLayoutPreset} mode="full">
  <YourContent />
</ConsoleLayout>`}
      />

      <CodeShell
        title="AuthLayout"
        description="Branded split-panel auth page frame: logo + tagline + benefits on the left, centered card on the right."
        code={`import { AuthLayout, fintechLayoutPreset } from "@arcevo/facet-layout";
import { SignIn, fintechPreset } from "@arcevo/facet-auth";

<AuthLayout config={fintechLayoutPreset}>
  <SignIn config={fintechPreset} />
</AuthLayout>`}
      />

      <CodeShell
        title="Sidebar & Topbar"
        description="Use Sidebar + Topbar standalone with LayoutProvider: this docs site is built from them. Drag the sidebar edge to resize."
        code={`import { Sidebar, Topbar, LayoutProvider, fintechLayoutPreset } from "@arcevo/facet-layout";

<LayoutProvider>
  <div className="flex">
    <Sidebar config={fintechLayoutPreset} />
    <div className="flex-1">
      <Topbar />
      <main className="p-8">Content</main>
    </div>
  </div>
</LayoutProvider>`}
      />

      <CodeShell
        title="LandingLayout"
        description="Full-bleed marketing shell with a glassmorphic hero. Pair with the Navbar pill variant."
        code={`import { LandingLayout } from "@arcevo/facet-layout";
import { Navbar } from "@arcevo/facet-components";

<LandingLayout
  nav={<Navbar variant="pill" brand={brand} links={links} />}
  hero={<h1 className="text-5xl font-bold">Build faster</h1>}
  footer={<footer>© 2026</footer>}
>
  <section>Feature grid</section>
</LandingLayout>`}
      />

      <section className="not-prose mt-8">
        <h2 className="font-heading text-xl font-semibold text-foreground">Navbar pill</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The pill navbar variant is the landing shell's top nav.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2.5">
            <span className="text-xs font-medium text-muted-foreground">Live preview</span>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden bg-background p-4">
            <Navbar
              variant="pill"
              brand={<span className="font-semibold">facet</span>}
              links={[
                { href: "#", label: "Features" },
                { href: "#", label: "Docs" },
              ]}
              actions={
                <div className="flex gap-2">
                  <Button size="sm">Get started</Button>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
