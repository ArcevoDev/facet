import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Badge } from "@arcevo/facet-components";
import { getDocsUrl } from "../lib/docs-url.js";

const STATS = [
  { value: "35+", label: "components" },
  { value: "10", label: "API SDKs" },
  { value: "5", label: "layout shells" },
  { value: "MIT", label: "licensed" },
];

export function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center">
      <Badge
        variant="outline"
        icon={<Sparkles size={12} />}
        className="mb-6 border-primary/30 text-primary text-xs tracking-wider uppercase px-4 py-1"
      >
        Open source &middot; Radix powered &middot; MIT
      </Badge>
      <h1 className="text-gradient text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl font-heading max-w-4xl">
        A component library that ships with auth built in
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Copy-paste ready components for React, TypeScript and Tailwind CSS v4. Radix primitives,
        dark mode, and a pluggable auth flow that fits your domain.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" className="gap-2" onClick={() => window.open(getDocsUrl())}>
          Browse components
          <ArrowRight size={16} />
        </Button>
        <Button
          variant="glass"
          size="lg"
          onClick={() => document.getElementById("install")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get started
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        React 19 &middot; TypeScript &middot; Radix UI &middot; Tailwind CSS v4
      </p>

      <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl px-4 py-6 text-center">
            <div className="text-2xl font-bold text-foreground font-heading">{stat.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
