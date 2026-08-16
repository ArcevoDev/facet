/**
 * @arcevo/facet-components: OtpVerificationCard
 *
 * A ready-to-use one-time-password verification card: auto-focusing
 * OTP input, resend countdown, error state, and a submit action. Fully
 * customizable via `onVerify`, `onResend`, and `copy`.
 */

import * as React from "react";
import { cn } from "../utils.js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card.js";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp.js";
import { Button } from "./button.js";

export interface OtpVerificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Called with the entered code when the user submits. */
  onVerify: (code: string) => Promise<void> | void;
  /** Optional resend handler. Omit to hide the resend row. */
  onResend?: () => Promise<void> | void;
  /** Number of OTP digits. Default: 6. */
  length?: number;
  /** Seconds to wait before resend re-enables. Default: 30. */
  resendCooldown?: number;
  /** Copy overrides (defaults are provided). */
  copy?: Partial<{
    title: string;
    description: string;
    label: string;
    placeholder: string;
    submit: string;
    resend: string;
    resendActive: string;
    error: string;
    success: string;
    "code resend": string;
  }>;
  /** Render the submit button as anything (e.g. AnimatedButton). */
  submitButton?: (props: {
    children: React.ReactNode;
    type: "submit";
    disabled: boolean;
    className?: string;
  }) => React.ReactNode;
}

/**
 * A self-contained OTP verification card. Handles input state, a resend
 * countdown, error/success messages, and calls `onVerify(code)` on
 * submit. Pass `onResend` to show the resend row.
 */
export function OtpVerificationCard({
  onVerify,
  onResend,
  length = 6,
  resendCooldown = 30,
  copy = {},
  submitButton,
  className,
  ...props
}: OtpVerificationCardProps) {
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(resendCooldown);
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (cooldown <= 0) {
      if (timer.current) clearInterval(timer.current);
      return;
    }
    if (!timer.current) {
      timer.current = setInterval(() => setCooldown((c) => c - 1), 1000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onVerify(code);
      setSuccess(true);
    } catch {
      setError(copy.error ?? "That code did not match. Please try again.");
      setCode("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setCooldown(resendCooldown);
    if (onResend) await onResend();
  };

  const submit = submitButton ? (
    submitButton({
      children: copy.submit ?? "Verify code",
      type: "submit",
      disabled: submitting || code.length !== length,
      className: "w-full",
    })
  ) : (
    <Button
      type="submit"
      className="w-full"
      disabled={submitting || code.length !== length}
    >
      {submitting ? "Verifying..." : (copy.submit ?? "Verify code")}
    </Button>
  );

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader>
        <CardTitle>{copy.title ?? "Check your email"}</CardTitle>
        <CardDescription>
          {copy.description ?? "We sent a 6-digit code. Enter it below to continue."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <div className="flex justify-center">
              <InputOTP
                value={code}
                onChange={(v) => {
                  setCode(v);
                  setError(null);
                }}
                maxLength={length}
                inputMode="numeric"
                pattern="[0-9]*"
              >
                <InputOTPGroup>
                  {Array.from({ length }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && <p className="text-center text-sm text-destructive">{error}</p>}
            {success && (
              <p className="text-center text-sm text-emerald-600">{copy.success ?? "Code verified."}</p>
            )}
          </div>
          {submit}
        </form>
      </CardContent>
      {onResend && (
        <CardFooter className="flex items-center justify-center">
          {cooldown > 0 ? (
            <p className="text-sm text-muted-foreground">
              {copy.resendActive ?? `Resend code in ${cooldown}s`}
            </p>
          ) : (
            <Button type="button" variant="ghost" size="sm" onClick={handleResend}>
              {copy.resend ?? "Resend code"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

OtpVerificationCard.displayName = "OtpVerificationCard";
