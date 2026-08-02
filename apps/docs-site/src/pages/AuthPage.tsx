import { GuidePage, PageNav, H2, P, Code, Pre, Ul, Li } from "../components/Guide.js";

export function AuthPage() {
  return (
    <GuidePage
      title="Auth"
      description="Domain-customizable authentication: SignIn, SignUp, Guard, MfaDialog, and standalone forms."
      back={{ label: "Back to Design Tokens", to: "/tokens" }}
    >
      <H2>ArcProvider</H2>
      <P>
        Wrap your app in <Code>ArcProvider</Code> with an <Code>ArcIdClient</Code> to get session
        context and auth actions:
      </P>
      <Pre>{`import { ArcProvider } from "@arcevo/facet-auth";
import { ArcIdClient } from "@arcevo/facet-sdk";

const client = new ArcIdClient({ baseUrl: "https://id.example.com" });

<ArcProvider client={client}>
  <App />
</ArcProvider>`}</Pre>

      <H2>SignIn state machine</H2>
      <P>
        <Code>SignIn</Code> is a configurable state machine:
      </P>
      <Pre>{`IDLE → CHECK_SESSION → (authenticated → REDIRECT)
                      → (unauthenticated → SELECT_METHOD)

SELECT_METHOD → (email_password → LOGIN_FORM)
              → (magic_link → MAGIC_LINK_FORM)
              → (social → SOCIAL_LOGIN)
              → (passkey → PASSKEY_AUTH)

CHECK_MFA → (mfa_not_required → COMPLETE)
          → (mfa_required → MFA_CHALLENGE)

MFA_CHALLENGE → (verified → COMPLETE)
              → (error → MFA_CHALLENGE)

COMPLETE → (onSuccess callback) → redirect
         → (step_up_required → STEP_UP)`}</Pre>

      <H2>Standalone forms</H2>
      <P>Forms are independently importable:</P>
      <Ul>
        <Li><Code>LoginForm</Code>: email + password.</Li>
        <Li><Code>MagicLinkForm</Code>: passwordless email link.</Li>
        <Li><Code>ForgotPasswordForm</Code> / <Code>ResetPasswordForm</Code>.</Li>
        <Li><Code>MfaVerifyForm</Code> / <Code>MfaSetupForm</Code> / <Code>MfaRecoveryForm</Code>.</Li>
      </Ul>
      <P>All use react-hook-form + zod with inline errors.</P>

      <H2>Guards</H2>
      <Pre>{`<Guard fallback={<SignIn />}>
  <ProtectedPage />
</Guard>`}</Pre>

      <H2>Domain presets</H2>
      <P>
        Presets customize every copy, step, and behavior per sector. Combine an auth preset with a
        matching layout preset:
      </P>
      <Pre>{`<SignIn authPreset={fintechAuthPreset} layoutPreset={fintechLayoutPreset} />`}</Pre>
      <P>Available: <Code>fintech</Code>, <Code>med</Code>, <Code>edu</Code>, <Code>enterprise</Code>, <Code>default</Code>.</P>

      <H2>Preset differences</H2>
      <Ul>
        <Li>Fintech: MFA required, passkeys off, 15 min session TTL.</Li>
        <Li>Med: MFA required, HIPAA-aware, audit-first.</Li>
        <Li>Edu: passkeys on, no MFA, 24 hr session TTL, social login.</Li>
        <Li>Enterprise: SSO-first, optional passkeys, 8 hr session TTL.</Li>
      </Ul>

      <H2>OAuth & passkeys</H2>
      <P>
        Provider buttons render from <Code>config.oauthProviders</Code> and call{" "}
        <Code>onOAuth</Code>. Passkey auth hits the real SDK
        (<Code>passkeySdk.authenticationOptions()</Code> →{" "}
        <Code>navigator.credentials.get()</Code> → <Code>passkeySdk.authenticate()</Code>).
      </P>

      <PageNav
        prev={{ label: "Design Tokens", to: "/tokens" }}
        next={{ label: "Layout", to: "/layout" }}
      />
    </GuidePage>
  );
}
