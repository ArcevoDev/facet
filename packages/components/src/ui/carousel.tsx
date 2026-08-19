/**
 * Carousel: a composable, embla-based carousel.
 *
 * Drop in <Carousel> + <CarouselContent> + <CarouselItem> for a
 * zero-config horizontal scroller, or use <CarouselNext /> and
 * <CarouselPrevious /> for manual navigation. Supports horizontal
 * and vertical orientations.
 */
import * as React from "react";
import { cn } from "../utils.js";
import { Button } from "./button.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];
type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
}

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi | undefined;
  opts: CarouselOptions;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnapList: number[];
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within a <Carousel>");
  return ctx;
}

/**
 * Carousel
 *
 * A composable, customizable carousel built on Embla. Drop in the preset
 * `<Carousel>` + `<CarouselContent>` + `<CarouselItem>` combo for a
 * zero-config horizontal scroller, or use `<CarouselNext />` and
 * `<CarouselPrevious />` for manual navigation.
 *
 * @example
 * <Carousel orientation="horizontal" opts={{ loop: true }}>
 *   <CarouselContent>
 *     {items.map((item) => (
 *       <CarouselItem key={item.id}>{item.content}</CarouselItem>
 *     ))}
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ opts, plugins, orientation = "horizontal", className, children, ...props }, forwardedRef) => {
    const [carouselRef, api] = useEmblaCarousel(
      { axis: orientation === "vertical" ? "y" : "x", ...opts },
      plugins,
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(true);
    const [canScrollNext, setCanScrollNext] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnapList, setScrollSnapList] = React.useState<number[]>([]);

    React.useEffect(() => {
      if (!api) return;

      const update = () => {
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
        setSelectedIndex(api.selectedScrollSnap());
        setScrollSnapList(api.scrollSnapList());
      };

      update();
      api.on("reInit", update);
      api.on("select", update);
      return () => {
        api?.off("reInit", update);
        api?.off("select", update);
      };
    }, [api]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts: { axis: orientation === "vertical" ? "y" : "x", ...opts },
          orientation,
          scrollPrev: () => api?.scrollPrev(),
          scrollNext: () => api?.scrollNext(),
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnapList,
        }}
      >
        <div
          ref={forwardedRef}
          className={cn("relative mx-auto", className)}
          {...props}
        >
          <div ref={carouselRef} className="overflow-hidden">
            <div className={cn("flex", orientation === "vertical" && "flex-col")}>{children}</div>
          </div>
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          "overflow-hidden",
          orientation === "vertical" ? "flex-col" : "flex",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselContent.displayName = "Carousel.Content";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        className={cn(orientation === "vertical" ? "min-h-0" : "min-w-0", "shrink-0 grow-0 basis-full", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "Carousel.Item";

const carouselNavButton = cn(
  "absolute flex h-8 w-8 items-center justify-center rounded-full border bg-background text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50",
);

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { orientation?: "horizontal" | "vertical" }
>(({ className, variant = "outline", size = "icon", orientation = "horizontal", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        carouselNavButton,
        orientation === "horizontal"
          ? "left-2 top-1/2 -translate-y-1/2 rotate-0"
          : "top-2 left-1/2 -translate-x-1/2 -rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
});
CarouselPrevious.displayName = "Carousel.Previous";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { orientation?: "horizontal" | "vertical" }
>(({ className, variant = "outline", size = "icon", orientation = "horizontal", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        carouselNavButton,
        orientation === "horizontal"
          ? "right-2 top-1/2 -translate-y-1/2 rotate-0"
          : "bottom-2 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
});
CarouselNext.displayName = "Carousel.Next";

const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { api, selectedIndex, scrollSnapList } = useCarousel();

    if (!api) return null;

    const handleClick = (index: number) => {
      api.scrollTo(index);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute bottom-2 flex w-full justify-center gap-1.5",
          className,
        )}
        {...props}
      >
        {scrollSnapList.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-foreground/30 transition-all hover:bg-foreground/50",
              selectedIndex === index && "w-3 bg-foreground",
            )}
          />
        ))}
      </div>
    );
  },
);
CarouselDots.displayName = "Carousel.Dots";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
};
export type { CarouselApi, CarouselProps, CarouselOptions, CarouselPlugin };
