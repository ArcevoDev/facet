import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AspectRatio } from "./ui/aspect-ratio.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel.js";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer.js";
import { InputGroup, InputGroupAddon } from "./ui/input-group.js";
import { Input } from "./ui/input.js";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "./ui/resizable.js";

describe("New component imports", () => {
  it("all five new components load without errors", () => {
    expect(AspectRatio).toBeDefined();
    expect(Carousel).toBeDefined();
    expect(Drawer).toBeDefined();
    expect(InputGroup).toBeDefined();
    expect(ResizablePanelGroup).toBeDefined();
  });
});

describe("AspectRatio", () => {
  it("renders children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span data-testid="ar-content">content</span>
      </AspectRatio>,
    );
    expect(screen.getByTestId("ar-content")).toBeInTheDocument();
  });
});

describe("Carousel", () => {
  it("renders items and navigation buttons", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(2);
  });
});

describe("Drawer", () => {
  it("renders trigger (closed by default)", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>Drawer description</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
    expect(screen.queryByText("Drawer title")).not.toBeInTheDocument();
  });

  it("opens drawer on trigger click", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByRole("button", { name: /open/i }));
    expect(await screen.findByText("Drawer title", {}, { timeout: 2000 })).toBeInTheDocument();
  });
});

describe("InputGroup", () => {
  it("renders input with prepend and append addons", () => {
    render(
      <InputGroup>
        <InputGroupAddon>
          <span data-testid="icon">icon</span>
        </InputGroupAddon>
        <Input placeholder="Search..." />
        <InputGroupAddon>
          <span data-testid="action">Go</span>
        </InputGroupAddon>
      </InputGroup>,
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getAllByTestId("icon")).toHaveLength(1);
    expect(screen.getAllByTestId("action")).toHaveLength(1);
  });
});

describe("Resizable", () => {
  it("renders a panel group with panels and handle", () => {
    render(
      <ResizablePanelGroup>
        <ResizablePanel>Panel 1</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel 2</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(screen.getByText("Panel 1")).toBeInTheDocument();
    expect(screen.getByText("Panel 2")).toBeInTheDocument();
  });
});
