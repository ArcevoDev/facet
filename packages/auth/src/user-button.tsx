/**
 * UserButton: user avatar dropdown trigger.
 *
 * Shows the user's avatar (or initials fallback) with a dropdown
 * menu for profile, settings, and sign out.
 */

import * as React from "react";
import { useAuth } from "./provider.js";
import type { Appearance, ComponentSlots } from "./types.js";

import { Button } from "@arcevo/facet-components";
import { Avatar, AvatarFallback } from "@arcevo/facet-components";
import { getModSymbol } from "@arcevo/facet-components";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@arcevo/facet-components";

/* ── Props ─────────────────────────────────────────────────── */

export interface UserButtonProps {
  appearance?: Appearance;
  slots?: ComponentSlots & {
    /** Override the trigger element entirely */
    trigger?: React.ReactNode;
    /** Override the user's name label */
    label?: React.ReactNode;
  };
  /** Called when user clicks "Sign out" */
  onSignOut?: () => void;
}

/* ── Helpers ───────────────────────────────────────────────── */

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ── Component ─────────────────────────────────────────────── */

export function UserButton({ appearance, slots, onSignOut }: UserButtonProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initials = getInitials(user.name ?? user.email);
  const displayName = user.name ?? user.email;

  const handleSignOut = async () => {
    await logout();
    onSignOut?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {slots?.trigger ?? (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className={appearance?.className}>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            {slots?.label ?? (
              <>
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>
          Profile
          <DropdownMenuShortcut>⇧{getModSymbol()}P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          Settings
          <DropdownMenuShortcut>{getModSymbol()},</DropdownMenuShortcut>
        </DropdownMenuItem>
        {user.memberships && user.memberships.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {user.memberships.map((m, i) => (
              <DropdownMenuItem key={i}>{m.name ?? ""}</DropdownMenuItem>
            ))}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:text-destructive"
        >
          Sign out
          <DropdownMenuShortcut>⇧{getModSymbol()}Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
