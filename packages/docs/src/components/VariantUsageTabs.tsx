import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@arcevo/facet-components";
import { CodeBlock } from "./CodeBlock.js";
import { variantUsage } from "../lib/usage.js";

export interface VariantUsageTabsProps {
  slug: string;
}

/**
 * Usage section with one tab per variant. Each tab shows that variant's
 * usage code with a copy button. Falls back to a single "Default" tab for
 * components without a variant gallery.
 */
export function VariantUsageTabs({ slug }: VariantUsageTabsProps) {
  const tabs = variantUsage(slug);
  const [active, setActive] = React.useState(tabs[0]?.label ?? "Default");

  // If the slug changes (Alt+Arrow navigation), keep the active tab in sync.
  // Note: depend on `slug` only (`tabs` is a fresh array every render and
  // would reset the active tab to the first one on every click).
  React.useEffect(() => {
    setActive(variantUsage(slug)[0]?.label ?? "Default");
  }, [slug]);

  return (
    <section className="mt-8">
      <h2 className="font-heading text-xl font-semibold text-foreground">Usage</h2>
      <Tabs value={active} onValueChange={setActive} className="mt-4">
        <TabsList className="h-auto w-auto flex-wrap justify-start gap-1 rounded-lg bg-muted/40 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              className="h-7 rounded-md px-2.5 text-xs font-medium"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label}>
            <CodeBlock code={tab.code} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
