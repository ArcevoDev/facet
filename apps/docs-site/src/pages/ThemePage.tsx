import { GuidePage, PageNav, H2, P, Code, Pre } from "../components/Guide.js";

export function ThemePage() {
  return (
    <GuidePage
      title="Theme"
      description="ThemeProvider, useTheme, and ThemeToggle for light/dark/system theming."
      back={{ label: "Back to Icon", to: "/foundations/icon" }}
    >
      <H2>ThemeProvider</H2>
      <Pre>{`<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>`}</Pre>
      <P>
        Sets a <Code>data-theme</Code> attribute on <Code>&lt;html&gt;</Code>, persists to{" "}
        <Code>localStorage</Code> (<Code>"facet-theme"</Code>), and follows the OS preference in{" "}
        <Code>system</Code> mode.
      </P>

      <H2>useTheme</H2>
      <Pre>{`const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme();`}</Pre>
      <P>
        <Code>resolvedTheme</Code> is the concrete <Code>"light" | "dark"</Code> value after{" "}
        <Code>system</Code> resolution, handy for conditional rendering.
      </P>

      <H2>ThemeToggle</H2>
      <P>
        A ready-made light/dark switch that reads the current theme and toggles it. Drop it in any
        toolbar or navbar.
      </P>

      <H2>Brand overrides</H2>
      <Pre>{`<ThemeProvider overrideVars={{ "--primary": "oklch(0.5 0.2 30)" }}>
  <App />
</ThemeProvider>`}</Pre>
      <P>
        Per-brand token overrides apply on <Code>&lt;html&gt;</Code> so every component inherits
        them. See the Theming guide for details.
      </P>

      <PageNav
        prev={{ label: "Icon", to: "/foundations/icon" }}
        next={{ label: "arc-id", to: "/arc-id" }}
      />
    </GuidePage>
  );
}
