import { useParams } from "react-router-dom";
import { LandingLayout } from "@arcevo/facet-layout";
import { ShineButton, buttonVariants, cn } from "@arcevo/facet-components";
import { LightIcon } from "@arcevo/facet-components/light";
import { ECOSYSTEM, getEcosystemDocsUrl } from "../data/ecosystem.js";
import { Nav } from "../components/Nav.js";
import { Footer } from "../components/Footer.js";

export function EcosystemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = ECOSYSTEM.find((e) => e.slug === slug);

  if (!entry) {
    return (
      <LandingLayout
        nav={<Nav />}
        footer={<Footer />}
        hero={
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/50 ring-1 ring-border">
              <LightIcon name="alert-circle" className="size-5 text-primary" />
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold text-foreground">
              Package not found
            </h1>
            <p className="mt-3 text-muted-foreground">
              We couldn't find an ecosystem package matching that URL.
            </p>
          </div>
        }
      >
        <></>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout
      nav={<Nav />}
      footer={<Footer />}
      hero={
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/50 ring-1 ring-border">
            <LightIcon name={entry.icon} className="size-5 text-primary" />
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{entry.description}</p>
          <p className="mt-2 text-xs text-muted-foreground/70">v{entry.version}</p>
        </div>
      }
    >
      {/* Analysis */}
      <section className="mx-auto max-w-3xl px-8 py-12">
        <h2 className="text-2xl font-bold text-foreground">Overview</h2>
        <div className="mt-4 space-y-4">
          {entry.analysis.map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Key features */}
      <section className="bg-secondary/30 mx-auto max-w-3xl px-8 py-12">
        <h2 className="text-2xl font-bold text-foreground">Key features</h2>
        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {entry.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <LightIcon name="check" className="mt-0.5 size-4 text-green-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Example */}
      <section className="mx-auto max-w-4xl px-8 py-12">
        <h2 className="text-2xl font-bold text-foreground">Example usage</h2>
        <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-4">
          <pre className="overflow-x-auto text-sm">
            <code className="text-foreground/90">{entry.example[0]?.code}</code>
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-8 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Read the full documentation for {entry.name} on the facet docs site.
        </p>
        <ShineButton
          type="button"
          onClick={() => window.open(getEcosystemDocsUrl(entry), "_blank")}
          className={cn(buttonVariants({ variant: "default", size: "default" }), "mt-4")}
        >
          <LightIcon name="external-link" className="mr-2 size-4" />
          Open {entry.name} docs
        </ShineButton>
      </section>
    </LandingLayout>
  );
}
