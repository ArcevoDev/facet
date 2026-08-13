import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils.js";

const cardVariants = cva("rounded-xl border shadow", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      glass: "glass-card text-card-foreground",
      frost: "frost text-card-foreground",
      glow: "bg-card text-card-foreground glow-indigo",
      ghost: "border-transparent bg-transparent shadow-none",
      outline: "border bg-transparent text-card-foreground shadow-none",
      elevated: "bg-card text-card-foreground shadow-md",
      interactive:
        "bg-card text-card-foreground shadow transition-colors hover:bg-accent/50 cursor-pointer",
      /** 3D tilt that follows the cursor (pointer handler). */
      tilt: "bg-card text-card-foreground shadow transition-transform duration-200 will-change-transform",
      /** Animated gradient border (pure CSS, mask trick). */
      "gradient-border":
        "relative bg-card text-card-foreground shadow before:absolute before:-inset-px before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-indigo-500 before:via-fuchsia-500 before:to-cyan-400 before:content-['']",
      /** Image cards: first child image zooms on hover. */
      zoom: "group bg-card text-card-foreground shadow overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, onMouseMove, onMouseLeave, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    // 3D tilt: rotate toward the cursor.
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (variant !== "tilt") return;
      const el = innerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
      onMouseMove?.(e);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (variant === "tilt" && innerRef.current) {
        innerRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
      }
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          cardVariants({ variant }),
          variant === "zoom" &&
            "[&_img]:transition-transform [&_img]:duration-500 [&_img]:hover:scale-105",
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  type CardProps,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
