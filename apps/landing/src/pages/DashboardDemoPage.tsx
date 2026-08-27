import {
  PageHeader,
  StatCard,
  ActivityFeed,
  BorderBeamCard,
  SpotlightCard,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
} from "@arcevo/facet-components";
import { LandingLayout } from "@arcevo/facet-layout";
import { LightIcon } from "@arcevo/facet-components/light";
import { Nav } from "../components/Nav.js";
import { Footer } from "../components/Footer.js";
import { DASHBOARD_STATS_FULL, DASHBOARD_ACTIVITY } from "../data/dashboard-demo.js";
import { getDocsUrl } from "../lib/docs-url.js";

/**
 * /dashboard-demo - a full console surface demo. Shows everything the
 * ready-to-use facet stack provides for the "console" use case:
 *   - PageHeader (breadcrumb + title + actions)
 *   - StatCard grid (KPI cards with deltas)
 *   - ActivityFeed (grouped + relative time)
 *   - BorderBeamCard / SpotlightCard framing
 *   - Tabs to switch between feed / table views
 *
 * Data is the same demo set as the home-page preview but with the
 * StatCard grid expanded to 8 and the table view shown alongside the
 * feed view.
 */
export function DashboardDemoPage() {
  return (
    <LandingLayout
      nav={<Nav />}
      footer={<Footer />}
      hero={
        <div className="mx-auto max-w-4xl">
          <PageHeader
            layout="row"
            title="Identity operations console"
            description="A full console surface built from ready-to-use facet components. The same shells ship in the docs engine and the layout package's ConsoleLayout."
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Dashboard demo" },
            ]}
            actions={
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                live demo
              </span>
            }
          />
        </div>
      }
    >
      {/* KPI grid */}
      <section className="mx-auto max-w-7xl px-8 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_STATS_FULL.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} icon={s.icon} hint={s.hint} />
          ))}
        </div>
      </section>

      {/* Activity + quick stats */}
      <section className="mx-auto max-w-7xl px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <BorderBeamCard className="lg:col-span-2">
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Recent activity
                </h2>
                <Tabs defaultValue="feed">
                  <TabsList>
                    <TabsTrigger value="feed">Feed</TabsTrigger>
                    <TabsTrigger value="log">Log</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Tabs defaultValue="feed">
                <TabsContent value="feed">
                  <ActivityFeed items={DASHBOARD_ACTIVITY} groupByDay />
                </TabsContent>
                <TabsContent value="log">
                  <ActivityFeed items={DASHBOARD_ACTIVITY} groupByDay={false} />
                </TabsContent>
              </Tabs>
            </div>
          </BorderBeamCard>

          <SpotlightCard>
            <CardHeader>
              <CardTitle>System health</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Identity API", status: "operational", color: "bg-emerald-500" },
                { label: "Webhook delivery", status: "operational", color: "bg-emerald-500" },
                { label: "Token refresh", status: "operational", color: "bg-emerald-500" },
                { label: "Audit log export", status: "degraded", color: "bg-amber-500" },
                { label: "OAuth introspection", status: "operational", color: "bg-emerald-500" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-md border border-border p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${row.color}`} />
                    <span className="text-sm font-medium text-foreground">{row.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{row.status}</span>
                </div>
              ))}
            </CardContent>
          </SpotlightCard>
        </div>
      </section>

      {/* Card animation family demo */}
      <section className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="text-2xl font-bold text-foreground">Card animation family</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every card below is one of the 11 motion surfaces in
          <code className="ml-1 rounded bg-secondary/50 px-1.5 py-0.5 text-xs">
            @arcevo/facet-components
          </code>
          . Same Card primitive, motion bolted on.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SpotlightCard>
            <CardHeader>
              <CardTitle className="text-sm">SpotlightCard</CardTitle>
              <CardDescription>Cursor-following highlight</CardDescription>
            </CardHeader>
          </SpotlightCard>
          <BorderBeamCard>
            <CardHeader>
              <CardTitle className="text-sm">BorderBeamCard</CardTitle>
              <CardDescription>Animated gradient beam around the border</CardDescription>
            </CardHeader>
          </BorderBeamCard>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-sm">TiltCard</CardTitle>
              <CardDescription>Cursor-driven 3D tilt</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Hover any tile to feel the effect.</p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-sm">FlipCard</CardTitle>
              <CardDescription>Click to flip - front / back</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Doc pointer */}
      <section className="mx-auto max-w-3xl px-8 py-12 text-center">
        <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
          <LightIcon name="terminal" size={12} className="mr-1.5" />
          Ship it
        </Badge>
        <p className="text-sm text-muted-foreground">
          Every component on this page is a typed, named export. Copy the
          <code className="mx-1 rounded bg-secondary/50 px-1.5 py-0.5 text-xs">
            PageHeader
          </code>
          ,
          <code className="mx-1 rounded bg-secondary/50 px-1.5 py-0.5 text-xs">
            StatCard
          </code>
          , and
          <code className="mx-1 rounded bg-secondary/50 px-1.5 py-0.5 text-xs">
            ActivityFeed
          </code>
          imports straight into your app.
        </p>
        <a
          href={getDocsUrl()}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <LightIcon name="book-open" size={14} />
          Browse the docs
        </a>
      </section>
    </LandingLayout>
  );
}