import { GuidePage, PageNav, H2, P, Code, Pre, Ul, Li } from "../components/Guide.js";

export function IconPage() {
  return (
    <GuidePage
      title="Icon"
      description="Semantic icon registry: built-in lucide map, global overrides, and per-domain context overrides."
      back={{ label: "Back to Components", to: "/components" }}
    >
      <H2>Why a registry</H2>
      <P>
        Rather than importing <Code>lucide-react</Code> icons directly everywhere, facet exposes a
        semantic registry. Components reference icon names (<Code>"settings"</Code>,{" "}
        <Code>"logout"</Code>, ...), and consumers can swap the actual icon per domain without
        forking components.
      </P>

      <H2>Built-in set</H2>
      <P>
        The registry ships with a lucide-based default map: <Code>settings</Code>,{" "}
        <Code>logout</Code>, <Code>chevronDown</Code>, <Code>search</Code>, <Code>check</Code>,{" "}
        <Code>moon</Code>, <Code>sun</Code>, <Code>bell</Code>, <Code>menu</Code>,{" "}
        <Code>close</Code>, <Code>chevronLeft</Code>, <Code>chevronRight</Code>,{" "}
        <Code>arrowRight</Code>, <Code>sparkles</Code>, <Code>github</Code>,{" "}
        <Code>bookOpen</Code>, <Code>building</Code>, <Code>users</Code>, <Code>shield</Code>,{" "}
        <Code>creditCard</Code>, <Code>dashboard</Code>, <Code>document</Code>, <Code>help</Code>,{" "}
        <Code>grid</Code>, <Code>list</Code>.
      </P>

      <H2>Render an icon</H2>
      <Pre>{`import { Icon } from "@arcevo/facet-components";

<Icon name="settings" className="size-4" />`}</Pre>

      <H2>Global override</H2>
      <P>
        <Code>registerIcon</Code> replaces a semantic name everywhere (until the process reloads):
      </P>
      <Pre>{`import { registerIcon } from "@arcevo/facet-components";
import { ShieldAlert } from "lucide-react";

registerIcon("shield", ShieldAlert);`}</Pre>

      <H2>Per-domain override</H2>
      <P>
        <Code>IconProvider</Code> scopes overrides to a subtree, so each domain can customize icons:
      </P>
      <Pre>{`<IconProvider overrides={{ logout: Shield }}>
  <Icon name="logout" className="size-4" />
</IconProvider>`}</Pre>
      <P>
        Provider overrides merge with parent providers, so nested domains can layer overrides.
      </P>

      <H2>Types</H2>
      <Ul>
        <Li><Code>IconName</Code>: the union of semantic names.</Li>
        <Li><Code>IconOverrides</Code>: partial map for overrides.</Li>
        <Li><Code>getIcon(name)</Code>: resolve the current global icon component.</Li>
      </Ul>

      <PageNav
        prev={{ label: "Components", to: "/components" }}
        next={{ label: "Theme", to: "/foundations/theme" }}
      />
    </GuidePage>
  );
}
