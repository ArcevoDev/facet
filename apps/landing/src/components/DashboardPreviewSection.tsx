import {
  StatCard,
  ActivityFeed,
  GradientBorderCard,
  PageHeader,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@arcevo/facet-components";
import { LightIcon } from "@arcevo/facet-components/light";
import { DASHBOARD_STATS, DASHBOARD_ACTIVITY } from "../data/dashboard-demo.js";
import { getDocsUrl } from "../lib/docs-url.js";

/**
 * Live dashboard preview. Shows the StatCard + ActivityFeed surfaces that
 * arc-id-style consoles get out of the box. Uses GradientBorderCard to frame
 * the activity feed so the page preview reads as a console, not a blog.
 */
export function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
          <LightIcon name="layout-dashboard" size={12} className="mr-1.5" />
          Ready-to-use dashboard
        </Badge>
        <h2 className="text-3xl font-bold text-foreground font-heading sm:text-4xl">
          Console surfaces that ship with facet
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          <code className="rounded bg-secondary/50 px-1.5 py-0.5 text-xs">StatCard</code>,{" "}
          <code className="rounded bg-secondary/50 px-1.5 py-0.5 text-xs">ActivityFeed</code>,{" "}
          <code className="rounded bg-secondary/50 px-1.5 py-0.5 text-xs">PageHeader</code>,{" "}
          <code className="rounded bg-secondary/50 px-1.5 py-0.5 text-xs">GradientBorderCard</code>, and{" "}
          <code className="rounded bg-secondary/50 px-1.5 py-0.5 text-xs">Tabs</code>,
          the primitives every console needs, wired together.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 lg:p-8">
        <PageHeader
          layout="row"
          title="Identity operations"
          description="Live snapshot of the arc-id console - KPI cards above, activity feed below."
          crumbs={[
            { label: "Console", href: "#" },
            { label: "Operations" },
          ]}
          actions={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
              <span className="size-1.5 animate-[facet-glow-pulse_2s_ease-in-out_infinite] rounded-full bg-emerald-500" />
              live
            </span>
          }
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_STATS.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} icon={s.icon} hint={s.hint} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <GradientBorderCard className="lg:col-span-2">
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold text-foreground">Recent activity</h3>
                <a
                  href={getDocsUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <LightIcon name="book-open" size={12} />
                  docs
                </a>
              </div>
              <ActivityFeed items={DASHBOARD_ACTIVITY} />
            </div>
          </GradientBorderCard>

          <GradientBorderCard>
            <div className="p-5">
              <h3 className="font-heading text-base font-semibold text-foreground">Quick links</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Open the dashboard demo to interact with the full panel.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { icon: "shield-check", label: "Security & MFA" },
                  { icon: "key-round", label: "API keys" },
                  { icon: "webhook", label: "Webhook deliveries" },
                  { icon: "file-down", label: "Audit export" },
                  { icon: "users", label: "Identity directory" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={getDocsUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent/40"
                    >
                      <LightIcon name={l.icon as never} size={14} className="text-primary" />
                      <span className="flex-1">{l.label}</span>
                      <LightIcon name="chevron-right" size={12} className="text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                All blocks are{" "}
                <code className="rounded bg-secondary/50 px-1 py-0.5 text-[10px]">{"<Tabs>"}</code>-
                friendly for the full /dashboard-demo page.
              </p>
              <Tabs defaultValue="feed" className="mt-3">
                <TabsList className="w-full">
                  <TabsTrigger value="feed" className="flex-1">
                    Feed
                  </TabsTrigger>
                  <TabsTrigger value="log" className="flex-1">
                    Log
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="feed" className="text-xs text-muted-foreground">
                  Day-grouped, relative timestamps, click-through.
                </TabsContent>
                <TabsContent value="log" className="text-xs text-muted-foreground">
                  Same feed, flat - no day headers.
                </TabsContent>
              </Tabs>
            </div>
          </GradientBorderCard>
        </div>
      </div>
    </section>
  );
}
