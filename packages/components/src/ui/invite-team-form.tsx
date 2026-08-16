/**
 * @arcevo/facet-components: InviteTeamForm
 *
 * A ready-to-use team invite form: add multiple email addresses, pick a
 * role, and send. Handles per-email validation and duplicate detection.
 * Controlled via `onInvite` so consumers own the API call.
 */

import * as React from "react";
import { cn } from "../utils.js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card.js";
import { Button } from "./button.js";
import { Input } from "./input.js";
import { Label } from "./label.js";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select.js";

export interface Invitee {
  email: string;
  role: string;
}

export interface InviteTeamFormProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Roles available in the role select. Default: ["Member", "Admin", "Owner"]. */
  roles?: string[];
  /** Called with the validated invitees. Return a rejected promise to show an error. */
  onInvite: (invitees: Invitee[]) => Promise<void> | void;
  /** Copy overrides. */
  copy?: Partial<{
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    roleLabel: string;
    add: string;
    send: string;
    sending: string;
    added: string;
    invalidEmail: string;
    duplicate: string;
    empty: string;
    remove: string;
    error: string;
  }>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A team invite form: type an email, pick a role, add it to the list,
 * then send all pending invites. Invalid or duplicate emails are flagged
 * inline instead of submitting.
 */
export function InviteTeamForm({
  roles = ["Member", "Admin", "Owner"],
  onInvite,
  copy = {},
  className,
  ...props
}: InviteTeamFormProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState(roles[0] ?? "Member");
  const [invitees, setInvitees] = React.useState<Invitee[]>([]);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  const addEmail = () => {
    const value = email.trim().toLowerCase();
    if (!value) return;
    if (!EMAIL_RE.test(value)) {
      setError(copy.invalidEmail ?? "That doesn't look like a valid email.");
      return;
    }
    if (invitees.some((i) => i.email === value)) {
      setError(copy.duplicate ?? "That email is already in the list.");
      return;
    }
    setError(null);
    setInvitees((prev) => [...prev, { email: value, role }]);
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invitees.length === 0) {
      setError(copy.empty ?? "Add at least one email first.");
      return;
    }
    setSending(true);
    setError(null);
    setSent(false);
    try {
      await onInvite(invitees);
      setSent(true);
      setInvitees([]);
    } catch (err) {
      setError(copy.error ?? (err instanceof Error ? err.message : "Failed to send invites."));
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader>
        <CardTitle>{copy.title ?? "Invite your team"}</CardTitle>
        <CardDescription>
          {copy.description ?? "Send email invites. Each person picks their own password on first sign-in."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <div className="space-y-1">
              <Label htmlFor="invite-email">{copy.emailLabel ?? "Email"}</Label>
              <Input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addEmail();
                  }
                }}
                placeholder={copy.emailPlaceholder ?? "teammate@company.com"}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="invite-role">{copy.roleLabel ?? "Role"}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="invite-role" className="w-full sm:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addEmail}>
            {copy.add ?? "Add email"}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {invitees.length > 0 && (
          <ul className="space-y-2">
            {invitees.map((inv) => (
              <li key={inv.email} className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{inv.email}</p>
                  <p className="text-xs text-muted-foreground">Role: {inv.role}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setInvitees((prev) => prev.filter((i) => i.email !== inv.email))}
                >
                  {copy.remove ?? "Remove"}
                </Button>
              </li>
            ))}
          </ul>
        )}

        {sent && <p className="text-sm text-emerald-600">{copy.added ?? "Invites sent."}</p>}

        <Button className="w-full" onClick={handleSubmit} disabled={sending || invitees.length === 0}>
          {sending
            ? (copy.sending ?? "Sending...")
            : `${copy.send ?? "Send"} ${invitees.length > 0 ? `(${invitees.length})` : ""}`.trim()}
        </Button>
      </CardContent>
    </Card>
  );
}

InviteTeamForm.displayName = "InviteTeamForm";
