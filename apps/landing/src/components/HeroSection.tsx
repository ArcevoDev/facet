import { useNavigate, useLocation } from "react-router-dom";
import { Button, Badge, Icon } from "@arcevo/facet-components";
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
    <div className="relative flex flex-col items-center text-center">
      {/* Tech grid background (fades out toward the edges) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
        }}
      />
      {/* Soft glow behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.58 0.23 273 / 25%), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
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
        <Button size="lg" className="gap-2" onClick={() => window.open(getDocsUrl())}>
          Browse components
          <Icon name="arrow-right" size={16} />
        </Button>
        <Button
          variant="glass"
          size="lg"
          onClick={scrollToInstall}
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
