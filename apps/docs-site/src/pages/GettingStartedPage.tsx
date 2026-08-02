import { GuidePage, PageNav, H2, P, Code, Pre } from "../components/Guide.js";
import { InstallTabs } from "../components/InstallTabs.js";
import { Kbd } from "@arcevo/facet-components";

export function GettingStartedPage() {
  return (
    <GuidePage
      title="Getting Started"
      description="Install the facet packages and render your first component."
      back={{ label: "Back to Overview", to: "/" }}
    >
      <H2>Install</H2>
      <InstallTabs
        commands={[
          {
            pkg: "@arcevo/facet-components",
            extras: ["@arcevo/facet-sdk", "@arcevo/facet-auth", "@arcevo/facet-layout"],
          },
        ]}
      />
      <P>Tokens and the SDK are optional but recommended:</P>
      <InstallTabs commands={[{ pkg: "@arcevo/facet-tokens" }]} />

      <H2>Import tokens</H2>
      <P>
        The Alpha Palette tokens ship as CSS variables. Import them once at your app root:
      </P>
      <Pre>{`import "@arcevo/facet-tokens/tokens.css";`}</Pre>
      <P>
        If you use Tailwind v4, import the theme extension to map the variables onto utility
        classes (<Code>bg-primary</Code>, <Code>text-foreground</Code>, ...):
      </P>
      <Pre>{`@import "@arcevo/facet-tokens/tailwind.css";`}</Pre>

      <H2>Theme provider</H2>
      <P>Wrap your app in <Code>ThemeProvider</Code> for light/dark/system theming:</P>
      <Pre>{`import { ThemeProvider, ThemeToggle } from "@arcevo/facet-components";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
      <YourApp />
    </ThemeProvider>
  );
}`}</Pre>

      <H2>Render a component</H2>
      <Pre>{`import { Button, Badge } from "@arcevo/facet-components";

<Button variant="default" size="lg">Get started</Button>
<Badge variant="success">Live</Badge>`}</Pre>

      <H2>Auth in 30 seconds</H2>
      <P>
        The auth components compose with domain presets so copy, steps, and behavior adapt per
        sector:
      </P>
      <Pre>{`import { ArcProvider, SignIn, fintechAuthPreset } from "@arcevo/facet-auth";

<ArcProvider client={client} authPreset={fintechAuthPreset}>
  <SignIn />
</ArcProvider>`}</Pre>
      <P>
        See the <Code>Auth</Code> guide for the full state machine and preset table.
      </P>

      <H2>App shells</H2>
      <P>
        The layout package provides framework-agnostic, slot-based shells with no routing
        dependency. Pair <Code>ConsoleLayout</Code> with a router adapter for Next, Remix, or
        react-router. See the <Code>Layout</Code> guide.
      </P>

      <H2>Keyboard shortcuts</H2>
      <P>
        This docs site has a few keyboard shortcuts. On Windows and Linux the modifier key is{" "}
        <Kbd>Ctrl</Kbd>; on macOS it is <Kbd mod /> (Command). Alt works the same on both.
      </P>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 pr-4 font-medium">Shortcut</th>
              <th className="py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-2 pr-4">
                <Kbd mod /> <span className="text-muted-foreground">+</span> <Kbd>K</Kbd>
              </td>
              <td className="py-2">Open command palette</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <Kbd mod /> <span className="text-muted-foreground">+</span> <Kbd>B</Kbd>
              </td>
              <td className="py-2">Toggle sidebar</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <Kbd>Alt</Kbd> <span className="text-muted-foreground">+</span> <Kbd>←</Kbd> /{" "}
                <Kbd>→</Kbd>
              </td>
              <td className="py-2">Previous / next page of components</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <Kbd>Alt</Kbd> <span className="text-muted-foreground">+</span> <Kbd>↑</Kbd> /{" "}
                <Kbd>↓</Kbd>
              </td>
              <td className="py-2">Previous / next component (on a component page)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PageNav
        prev={{ label: "Overview", to: "/" }}
        next={{ label: "Theming", to: "/theming" }}
      />
    </GuidePage>
  );
}
