import { useNavigate, useLocation } from "react-router-dom";
import { Button, Badge, Icon, GridPattern, Aurora, Beams, SparkleButton } from "@arcevo/facet-components";
import { getDocsUrl } from "../lib/docs-url.js";
import { STATS } from "../data/features.js";

export function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToInstall = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="relative flex flex-col items-center overflow-hidden text-center">
      {/* Animated layers: aurora + beams + masked grid (zero-dep facet
          animated surfaces). */}
      <Aurora className="absolute inset-0 -z-20" />
      <Beams count={3} className="absolute inset-0 -z-10" />
      <GridPattern className="absolute inset-0 -z-10" />
      {/* Spotlight follows the cursor over the headline */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Badge
        variant="outline"
        icon={<Icon name="sparkles" size={12} />}
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
        <SparkleButton
          label="Browse components"
          onClick={() => window.open(getDocsUrl())}
          className="h-10 px-8"
        />
        <Button
          variant="glass"
          size="lg"
          onClick={scrollToInstall}
        >
          Get started
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        React 18/19 &middot; TypeScript &middot; Radix UI &middot; Tailwind CSS v4
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
