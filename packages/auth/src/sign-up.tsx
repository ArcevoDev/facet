/**
 * SignUp: registration form component.
 *
 * Calls the ArcProvider register action. Supports appearance overrides,
 * domain config, and slot overrides for title/description.
 */

import * as React from "react";
import { useAuth } from "./provider.js";
import { defaultConfig } from "./types.js";
import type { AuthConfig, Appearance, ComponentSlots } from "./types.js";

import {
  Button,
  Input,
  Label,
  PasswordInput,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@arcevo/facet-components";

/* ── Props ─────────────────────────────────────────────────── */

export interface SignUpProps {
  appearance?: Appearance;
  config?: Partial<AuthConfig>;
  slots?: ComponentSlots;
  onSuccess?: () => void;
}

/* ── Component ─────────────────────────────────────────────── */

export function SignUp({ appearance, config: configOverrides, slots, onSuccess }: SignUpProps) {
  const cfg = { ...defaultConfig, ...configOverrides };
  const { register } = useAuth();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register({ name, email, password });
      if (res.data) {
        onSuccess?.();
      } else {
        setError(res.error?.message ?? "Registration failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
    setIsSubmitting(false);
  };

  return (
    <Card className={appearance?.className}>
      <CardHeader>
        {slots?.title ?? <CardTitle>Create an Account</CardTitle>}
        {slots?.description ?? <CardDescription>Enter your details to get started</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              required
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-password">Password</Label>
            <PasswordInput
              id="signup-password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-confirm">Confirm Password</Label>
            <PasswordInput
              id="signup-confirm"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
          {cfg.requireEmailVerification && (
            <p className="text-xs text-muted-foreground">
              You'll need to verify your email address after signing up.
            </p>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating account…" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        {slots?.footer ?? (
          <span>
            Already have an account?{" "}
            <Button variant="link" className="h-auto p-0 text-sm">
              Sign in
            </Button>
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
