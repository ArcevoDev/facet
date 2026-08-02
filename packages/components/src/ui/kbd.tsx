import * as React from "react";
import { cn } from "../utils.js";

export interface KbdProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Kbd = React.forwardRef<HTMLSpanElement, KbdProps>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
