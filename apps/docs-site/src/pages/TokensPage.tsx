import { GuidePage, PageNav, H2, P, Code, Pre, Ul, Li } from "../components/Guide.js";

export function TokensPage() {
  return (
    <GuidePage
      title="Design Tokens"
      description="The Alpha Palette: colors, typography, spacing, and radius as CSS variables."
      back={{ label: "Back to Theming", to: "/theming" }}
    >
      <H2>Alpha Palette</H2>
      <P>
        The Alpha Palette is the formal design manual behind facet. Semantic tokens map brand
        colors to roles (<Code>primary</Code>, <Code>muted</Code>, <Code>accent</Code>,
        ...), so themes can swap the palette without touching components.
      </P>

      <H2>Color roles</H2>
      <Ul>
        <Li><Code>--background</Code> / <Code>--foreground</Code>: app surfaces.</Li>
        <Li><Code>--primary</Code> / <Code>--primary-foreground</Code>: brand actions.</Li>
        <Li><Code>--secondary</Code>, <Code>--muted</Code>, <Code>--accent</Code>: layered surfaces.</Li>
        <Li><Code>--destructive</Code>, <Code>--success</Code>, <Code>--warning</Code>: status colors.</Li>
        <Li><Code>--border</Code>, <Code>--input</Code>, <Code>--ring</Code>: outlines and focus rings.</Li>
        <Li><Code>--sidebar-*</Code>: dedicated sidebar surface.</Li>
        <Li><Code>--chart-1..5</Code>: data visualization.</Li>
      </Ul>

      <H2>Typography</H2>
      <Ul>
        <Li><Code>--font-body</Code>: Inter (default sans).</Li>
        <Li><Code>--font-heading</Code>: Montserrat (headings).</Li>
        <Li><Code>--font-mono</Code>: JetBrains Mono (code).</Li>
        <Li><Code>--font-technical</Code>: Rajdhani (technical/labels).</Li>
      </Ul>

      <H2>Radius & spacing</H2>
      <P>
        Radius scales from <Code>--radius-sm</Code> to <Code>--radius-3xl</Code>. Spacing follows
        Tailwind v4 defaults and the <Code>size-*</Code>/<Code>gap-*</Code> utilities.
      </P>

      <H2>Consumption</H2>
      <Pre>{`import "@arcevo/facet-tokens/tokens.css";`}</Pre>
      <P>Or, for Tailwind v4 utility mapping:</P>
      <Pre>{`@import "@arcevo/facet-tokens/tokens.css";
@import "@arcevo/facet-tokens/tailwind.css";`}</Pre>
      <P>
        Sub-brands are supported through <Code>overrideVars</Code> on{" "}
        <Code>ThemeProvider</Code>: see the Theming guide.
      </P>

      <PageNav
        prev={{ label: "Theming", to: "/theming" }}
        next={{ label: "Auth", to: "/auth" }}
      />
    </GuidePage>
  );
}
