import * as React from "react";
import { Button } from "@arcevo/facet-components";
import { Check, Copy } from "lucide-react";

export interface CodeBlockProps {
  /** Optional heading above the code block. */
  title?: string;
  /** Source code to display. */
  code: string;
}

/** Plain code block with a copy-to-clipboard button. */
export function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable (e.g. non-secure context); ignore.
    }
  }, [code]);

  return (
    <div>
      {title && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{title}</span>
          <Button size="sm" variant="outline" onClick={handleCopy} className="h-7 gap-1.5 text-xs">
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-[13px] leading-6 text-foreground">
        {code}
      </pre>
    </div>
  );
}
