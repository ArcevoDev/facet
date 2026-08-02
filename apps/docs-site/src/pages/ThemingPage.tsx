import { GuidePage, PageNav, H2, P, Code, Pre, Ul, Li } from "../components/Guide.js";

export function ThemingPage() {
  return (
    <GuidePage
      title="Theming"
      description="Light, dark, and system theming via CSS variables on the html element."
      back={{ label: "Back to Getting Started", to: "/getting-started" }}
    >
      <H2>How it works</H2>
      <P>
        facet drives theming with a <Code>data-theme</Code> attribute on <Code>&lt;html&gt;</Code>.
        Design tokens are CSS custom properties; each theme swaps the values. The{" "}
        <Code>ThemeProvider</Code> sets the attribute, persists the choice to{" "}
        <Code>localStorage</Code>, and follows the OS preference when set to{" "}
        <Code>system</Code>.
      </P>

      <H2>ThemeProvider</H2>
      <Pre>{`<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>`}</Pre>
      <P>
        Props: <Code>defaultTheme</Code> (<Code>light | dark | system</Code>),{" "}
        <Code>storageKey</Code>, <Code>enableSystem</Code>, <Code>attribute</Code>,{" "}
        <Code>themes</Code>, and <Code>overrideVars</Code>.
      </P>

      <H2>useTheme</H2>
      <P>
        Access the current theme, toggle it, or read the resolved (non-system) value:
      </P>
      <Pre>{`import { useTheme } from "@arcevo/facet-components";

function MyHeader() {
  const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme();
  return <button onClick={toggleTheme}>{resolvedTheme === "dark" ? "Light" : "Dark"}</button>;
}`}</Pre>

      <H2>Override variables per brand</H2>
      <P>
        Consumers can override any token (e.g. <Code>--primary</Code>,{" "}
        <Code>--sub-brand-accent</Code>) without forking components:
      </P>
      <Pre>{`<ThemeProvider
  defaultTheme="dark"
  overrideVars={{ "--primary": "oklch(0.5 0.2 30)" }}
>
  <App />
</ThemeProvider>`}</Pre>

      <H2>Dark mode utilities</H2>
      <P>
        The Tailwind v4 theme extension registers a <Code>dark:</Code> variant scoped to{" "}
        <Code>[data-theme="dark"]</Code>, so you can write theme-aware utilities:
      </P>
      <Pre>{`<div className="bg-background text-foreground dark:bg-navy-900 dark:text-muted-foreground">
  ...
</div>`}</Pre>

      <H2>Best practices</H2>
      <Ul>
        <Li>Prefer token utilities (<Code>bg-primary</Code>) over hardcoded colors.</Li>
        <Li>Use <Code>ThemeToggle</Code> for a ready-made light/dark switch.</Li>
        <Li>Set <Code>overrideVars</Code> once per brand at the app root.</Li>
      </Ul>

      <PageNav
        prev={{ label: "Getting Started", to: "/getting-started" }}
        next={{ label: "Design Tokens", to: "/tokens" }}
      />
    </GuidePage>
  );
}
