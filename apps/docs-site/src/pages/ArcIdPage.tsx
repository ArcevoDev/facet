import { GuidePage, H2, P, Code, Pre, Ul, Li } from "../components/Guide.js";

export function ArcIdPage() {
  return (
    <GuidePage
      title="arc-id"
      description="Sovereign identity engine for the Arcevo ecosystem. Documentation lands here."
    >
      <H2>What is arc-id?</H2>
      <P>
        arc-id is the identity backend behind facet. It exposes typed domain SDKs for auth,
        sessions, passkeys, MFA, tenants, and more. facet's auth and layout presets are tuned to
        match arc-id's API contracts.
      </P>

      <H2>SDK</H2>
      <P>
        <Code>@arcevo/facet-sdk</Code> is a pure fetch client. No React, no axios. Each API domain
        gets its own class taking <Code>ArcIdClient</Code>:
      </P>
      <Pre>{`import { ArcIdClient, AuthSdk } from "@arcevo/facet-sdk";

const client = new ArcIdClient({ baseUrl });
const auth = new AuthSdk(client);
const { data, error } = await auth.signIn({ email, password });`}</Pre>

      <H2>Domain SDKs</H2>
      <Ul>
        <Li>Auth, sessions, passkeys, MFA, tenants, users, memberships, OAuth apps, webhooks, audit.</Li>
      </Ul>

      <H2>Coming soon</H2>
      <P>
        Full arc-id documentation (setup, architecture, API reference, self-hosting) will live in
        this section. The site's section model is designed so arc-id docs add pages and sidebar
        entries without touching the component library.
      </P>
    </GuidePage>
  );
}
