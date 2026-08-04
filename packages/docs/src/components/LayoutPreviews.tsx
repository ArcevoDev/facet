import * as React from "react";
import {
  ConsoleLayout,
  AuthLayout,
  LandingLayout,
  Sidebar,
  Topbar,
  LayoutProvider,
  defaultLayoutPreset,
  fintechLayoutPreset,
} from "@arcevo/facet-layout";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Navbar } from "@arcevo/facet-components";
import { CodeBlock } from "./CodeBlock.js";

function PreviewShell({
  title,
  description,
  code,
  children,
  tall = false,
}: {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
  tall?: boolean;
}) {
  const [showCode, setShowCode] = React.useState(false);
  return (
    <section className="not-prose mt-8">
      <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 overflow-hidden rounded-lg border border-border">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2.5">
          <span className="text-xs font-medium text-muted-foreground">Live preview</span>
          <button
            type="button"
            onClick={() => setShowCode((v) => !v)}
            aria-expanded={showCode}
            className="rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
          >
            {showCode ? "Hide code" : "View code"}
          </button>
        </div>
        <div
          className={
            tall
              ? "flex items-start justify-center overflow-hidden bg-background p-0"
              : "flex items-center justify-center bg-background p-6"
          }
        >
          {children}
        </div>
        {showCode && (
          <div className="border-t border-border">
            <CodeBlock code={code} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Preview blocks for the /layout docs page. */
export function LayoutPreviews() {
  return (
    <div className="space-y-2">
      <PreviewShell
        title="ConsoleLayout"
        description={'Dashboard shell: sidebar + topbar + content area. mode="full" is always-labeled; mode="rail" collapses to an icon-only rail.'}
        code={`import { ConsoleLayout, defaultLayoutPreset } from "@arcevo/facet-layout";

<ConsoleLayout config={defaultLayoutPreset} mode="full">
  <YourContent />
</ConsoleLayout>`}
        tall
      >
        <div className="h-96 w-full">
          <ConsoleLayout config={defaultLayoutPreset} mode="full">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Your content renders here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the content area inside ConsoleLayout.
                </p>
              </CardContent>
            </Card>
          </ConsoleLayout>
        </div>
      </PreviewShell>

      <PreviewShell
        title="AuthLayout"
        description="Branded split-panel auth page frame: logo + tagline + benefits on the left, centered card on the right."
        code={`import { AuthLayout, fintechLayoutPreset } from "@arcevo/facet-layout";
import { SignIn, fintechPreset } from "@arcevo/facet-auth";

<AuthLayout config={fintechLayoutPreset}>
  <SignIn config={fintechPreset} />
</AuthLayout>`}
        tall
      >
        <div className="h-96 w-full overflow-hidden rounded-md border border-border">
          <AuthLayout config={fintechLayoutPreset}>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Sign in</p>
              <div className="space-y-2">
                <input className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" placeholder="you@company.com" />
                <input className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" placeholder="Password" type="password" />
              </div>
              <Button className="w-full">Sign in</Button>
            </div>
          </AuthLayout>
        </div>
      </PreviewShell>

      <PreviewShell
        title="Sidebar & Topbar"
        description="Use Sidebar + Topbar standalone with LayoutProvider — this docs site is built from them."
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
        tall
      >
        <div className="h-96 w-full overflow-hidden rounded-md border border-border">
          <LayoutProvider>
            <div className="flex h-full">
              <Sidebar config={fintechLayoutPreset} />
              <div className="flex flex-1 flex-col">
                <Topbar />
                <main className="flex-1 bg-background p-6">
                  <p className="text-sm text-muted-foreground">
                    Sidebar + Topbar composed manually. Drag the sidebar edge to resize.
                  </p>
                </main>
              </div>
            </div>
          </LayoutProvider>
        </div>
      </PreviewShell>

      <PreviewShell
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
        tall
      >
        <div className="h-96 w-full overflow-hidden rounded-md border border-border">
          <LandingLayout
            nav={
              <Navbar
                variant="pill"
                brand={<span className="font-semibold">facet</span>}
                links={[
                  { href: "#", label: "Features" },
                  { href: "#", label: "Docs" },
                ]}
              />
            }
            hero={
              <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="font-heading text-4xl font-bold text-foreground">Build faster</h1>
                <p className="max-w-md text-muted-foreground">
                  A glassmorphic hero with a glow CTA, ready for your marketing site.
                </p>
                <div className="flex gap-3">
                  <Button className="glow-indigo">Get started</Button>
                  <Button variant="outline">Learn more</Button>
                </div>
              </div>
            }
            footer={
              <div className="px-8 py-4 text-sm text-muted-foreground">
                © {new Date().getFullYear()} ArcevoCirqle Ecosystem
              </div>
            }
          >
            <div className="px-8 py-12">
              <Card>
                <CardHeader>
                  <CardTitle>Feature section</CardTitle>
                  <CardDescription>Your marketing content goes here.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </LandingLayout>
        </div>
      </PreviewShell>
    </div>
  );
}
