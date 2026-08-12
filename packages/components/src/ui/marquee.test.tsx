import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Marquee } from "./marquee.js";

describe("Marquee", () => {
  it("renders each item twice to form a seamless loop", () => {
    render(
      <Marquee
        items={[
          <span key="a">Alpha</span>,
          <span key="b">Beta</span>,
          <span key="c">Gamma</span>,
        ]}
      />,
    );
    // The track duplicates children: each appears twice.
    expect(screen.getAllByText("Alpha")).toHaveLength(2);
    expect(screen.getAllByText("Beta")).toHaveLength(2);
    expect(screen.getAllByText("Gamma")).toHaveLength(2);
  });

  it("applies a custom duration via inline animation style", () => {
    const { container } = render(<Marquee items={[<span key="x">X</span>]} duration={8} />);
    const track = container.querySelector("[role=marquee] > div");
    expect(track?.getAttribute("style")).toContain("8s linear infinite");
  });

  it("pauses on mouse enter and resumes on leave", () => {
    const { container } = render(<Marquee items={[<span key="x">X</span>]} pauseOnHover />);
    const outer = container.querySelector("[role=marquee]");
    const track = container.querySelector("[role=marquee] > div");
    expect(track?.getAttribute("style")).toContain("animation-play-state: running");
    fireEvent.mouseEnter(outer!);
    expect(track?.getAttribute("style")).toContain("animation-play-state: paused");
    fireEvent.mouseLeave(outer!);
    expect(track?.getAttribute("style")).toContain("animation-play-state: running");
  });
});
