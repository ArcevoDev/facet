import * as React from "react";
import { cn } from "../utils.js";
import { GripHorizontal, GripVertical } from "lucide-react";
import {
  Group as RrpGroup,
  Panel as RrpPanel,
  Separator as RrpSeparator,
} from "react-resizable-panels";

/**
 * ResizablePanelGroup
 *
 * A composable split-pane layout built on `react-resizable-panels`. Combine
 * {@link ResizablePanelGroup} with any number of {@link ResizablePanel}
 * children and optional {@link ResizableHandle} separators.
 *
 * @example
 * <ResizablePanelGroup orientation="horizontal">
 *   <ResizablePanel defaultSize={50}>
 *     <Sidebar />
 *   </ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={50}>
 *     <MainContent />
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 */
const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof RrpGroup>, "elementRef">
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <RrpGroup
    elementRef={ref}
    orientation={orientation}
    className={cn(
      "flex h-full w-full",
      orientation === "vertical" ? "flex-col" : "flex-row",
      className,
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

/**
 * ResizableHandle
 *
 * Optional gutter between two {@link ResizablePanel} children. Dragging it
 * resizes the adjacent panels. Pass `withHandle` for a visible grip icon.
 */
const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof RrpSeparator>, "elementRef"> & {
    withHandle?: boolean;
    orientation?: "horizontal" | "vertical";
  }
>(({ className, withHandle, orientation = "horizontal", ...props }, ref) => (
  <RrpSeparator
    elementRef={ref}
    className={cn(
      "relative flex items-center justify-center rounded-sm bg-border hover:bg-accent",
      orientation === "vertical"
        ? "h-1.5 w-full cursor-row-resize"
        : "w-1.5 h-full cursor-col-resize",
      className,
    )}
    {...props}
  >
    {withHandle &&
      (orientation === "vertical" ? (
        <GripHorizontal className="h-4 w-4 text-muted-foreground" />
      ) : (
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      ))}
  </RrpSeparator>
));
ResizableHandle.displayName = "ResizableHandle";

/**
 * ResizablePanel
 *
 * A single panel inside a {@link ResizablePanelGroup}. Use `defaultSize`
 * (0–100) and `minSize`/`maxSize` to control flexible layouts.
 */
const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof RrpPanel>, "elementRef">
>(({ className, ...props }, ref) => (
  <RrpPanel
    elementRef={ref}
    className={cn("h-full w-full", className)}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

export { ResizablePanelGroup, ResizableHandle, ResizablePanel };
