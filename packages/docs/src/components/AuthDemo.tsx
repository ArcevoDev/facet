import * as React from "react";
import { ArcProvider, SignIn } from "@arcevo/facet-auth";
import type { SignInStep } from "@arcevo/facet-auth";
import { ArcIdClient } from "@arcevo/facet-sdk";
import {
  Checkbox,
  Label,
  Switch,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@arcevo/facet-components";
import { CodeBlock } from "./CodeBlock.js";

const OAUTH_PROVIDERS = ["google", "github", "microsoft"] as const;

export interface AuthDemoProps {
  /** Default config shown in the demo + code sample. */
  initialConfig?: {
    allowMagicLink?: boolean;
    allowPasskey?: boolean;
    oauthProviders?: string[];
    requireMfa?: boolean;
  };
}

export interface AuthDemoConfig {
  allowMagicLink: boolean;
  allowPasskey: boolean;
  requireMfa: boolean;
  oauthProviders: string[];
}

/** The step the live <SignIn> preview is driven to. */
export type AuthDemoStep = Exclude<SignInStep, "idle" | "check_session" | "check_mfa">;

/** Method name -> the SignIn step that renders that method's form. */
const METHOD_STEPS = {
  "Email + password": "login_form",
  "Magic link": "magic_link_form",
  Passkey: "passkey_auth",
  OAuth: "login_form",
  "Forgot password": "forgot_password",
} as const satisfies Record<string, AuthDemoStep>;

/** Whether a method is offered under the current config. */
function methodEnabled(config: AuthDemoConfig, method: keyof typeof METHOD_STEPS): boolean {
  switch (method) {
    case "Email + password":
    case "Forgot password":
      return true;
    case "Magic link":
      return config.allowMagicLink;
    case "Passkey":
      return config.allowPasskey;
    case "OAuth":
      return config.oauthProviders.length > 0;
    default:
      return false;
  }
}

/**
 * Live, configurable auth demo: a method switcher next to a real <SignIn>,
 * with toggles for the exact auth methods and OAuth providers consumers pick
 * at runtime. The generated config object updates in real time so the docs
 * page doubles as a working example of @arcevo/facet-auth's configuration
 * surface. The code sample below always matches the selected method.
 *
 * The demo is intentionally client-free: <ArcProvider> bootstraps signed
 * out (no stored token -> no network call), and <SignIn> renders its
 * method forms purely from `config`. Consumers wiring a real ArcIdClient
 * get the full login/MFA flow.
 */
export function AuthDemo({ initialConfig }: AuthDemoProps) {
  const [config, setConfig] = React.useState<AuthDemoConfig>({
    allowMagicLink: initialConfig?.allowMagicLink ?? true,
    allowPasskey: initialConfig?.allowPasskey ?? true,
    requireMfa: initialConfig?.requireMfa ?? false,
    oauthProviders: initialConfig?.oauthProviders ?? ["google"],
  });
  const [step, setStep] = React.useState<AuthDemoStep>("login_form");

  // No network: bootstrap stays signed out because no token is stored.
  // A real consumer passes their own ArcIdClient here.
  const client = React.useMemo(() => new ArcIdClient({ baseUrl: "https://demo.invalid" }), []);

  const selectMethod = (method: keyof typeof METHOD_STEPS) => {
    setStep(METHOD_STEPS[method]);
  };

  const activeMethod = (Object.keys(METHOD_STEPS) as (keyof typeof METHOD_STEPS)[]).find(
    (m) => METHOD_STEPS[m] === step,
  );

  const toggleProvider = (provider: string) => {
    setConfig((prev) => ({
      ...prev,
      oauthProviders: prev.oauthProviders.includes(provider)
        ? prev.oauthProviders.filter((p) => p !== provider)
        : [...prev.oauthProviders, provider],
    }));
  };

  const configCode = `<SignIn
  config={{
    allowMagicLink: ${config.allowMagicLink},
    allowPasskey: ${config.allowPasskey},
    requireMfa: ${config.requireMfa},
    oauthProviders: ${JSON.stringify(config.oauthProviders)},
  }}
/>`;

  const methodCode: Record<keyof typeof METHOD_STEPS, string> = {
    "Email + password": `<SignIn
  config={config}
  initialStep="login_form"
/>`,
    "Magic link": `<SignIn
  config={{ ...config, allowMagicLink: true }}
  initialStep="magic_link_form"
/>`,
    Passkey: `<SignIn
  config={{ ...config, allowPasskey: true }}
  initialStep="passkey_auth"
/>`,
    OAuth: `<SignIn
  config={{ ...config, oauthProviders: ${JSON.stringify(config.oauthProviders)} }}
/>`,
    "Forgot password": `<SignIn
  config={config}
  step="forgot_password"
  onStepChange={setStep}
/>`,
  };

  return (
    <div className="not-prose space-y-6">
      <AuthDemoControls
        config={config}
        onToggleProvider={toggleProvider}
        onSetConfig={setConfig}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Method switcher */}
        <Card>
          <CardHeader>
            <CardTitle>Sign-in methods</CardTitle>
            <CardDescription>
              Pick a method to preview it. Disabled methods are turned off in the config below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {(Object.keys(METHOD_STEPS) as (keyof typeof METHOD_STEPS)[]).map((method) => {
              const enabled = methodEnabled(config, method);
              return (
                <button
                  key={method}
                  type="button"
                  disabled={!enabled}
                  onClick={() => selectMethod(method)}
                  aria-pressed={activeMethod === method}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeMethod === method
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : "border-border bg-background text-foreground hover:bg-accent/40"
                  } ${!enabled ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <span>{method}</span>
                  {!enabled && (
                    <span className="text-xs font-normal text-muted-foreground">off</span>
                  )}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Live preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>
              Renders the {activeMethod ?? "selected"} step from `config` alone, no backend required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ArcProvider client={client}>
              <SignIn
                config={config}
                step={step}
                onStepChange={(next) => setStep(next as AuthDemoStep)}
                slots={{ complete: <p className="text-sm text-success">Signed in!</p> }}
              />
            </ArcProvider>
          </CardContent>
        </Card>
      </div>

      <CodeBlock code={activeMethod ? methodCode[activeMethod] : configCode} />
    </div>
  );
}

function AuthDemoControls({
  config,
  onToggleProvider,
  onSetConfig,
}: {
  config: AuthDemoConfig;
  onToggleProvider: (provider: string) => void;
  onSetConfig: React.Dispatch<React.SetStateAction<AuthDemoConfig>>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>Choose the methods and providers your app offers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label htmlFor="auth-magic-link">Magic link</Label>
            <p className="text-xs text-muted-foreground">Email a sign-in link</p>
          </div>
          <Switch
            id="auth-magic-link"
            checked={config.allowMagicLink}
            onCheckedChange={(v) => onSetConfig((prev) => ({ ...prev, allowMagicLink: v }))}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label htmlFor="auth-passkey">Passkeys</Label>
            <p className="text-xs text-muted-foreground">WebAuthn sign-in</p>
          </div>
          <Switch
            id="auth-passkey"
            checked={config.allowPasskey}
            onCheckedChange={(v) => onSetConfig((prev) => ({ ...prev, allowPasskey: v }))}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label htmlFor="auth-mfa">Require MFA</Label>
            <p className="text-xs text-muted-foreground">Force a second factor</p>
          </div>
          <Switch
            id="auth-mfa"
            checked={config.requireMfa}
            onCheckedChange={(v) => onSetConfig((prev) => ({ ...prev, requireMfa: v }))}
          />
        </div>
        <div className="space-y-2 border-t border-border pt-3">
          <p className="text-sm font-medium">OAuth providers</p>
          {OAUTH_PROVIDERS.map((provider) => (
            <div key={provider} className="flex items-center gap-2">
              <Checkbox
                id={`oauth-${provider}`}
                checked={config.oauthProviders.includes(provider)}
                onCheckedChange={() => onToggleProvider(provider)}
              />
              <Label htmlFor={`oauth-${provider}`} className="text-sm font-normal">
                {provider}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
