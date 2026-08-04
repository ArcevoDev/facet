import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("renders a pause-on-hover group class when enabled", () => {
    const { container } = render(<Marquee items={[<span key="x">X</span>]} pauseOnHover />);
    const track = container.querySelector("[role=marquee] > div");
    expect(track?.className).toContain("group-hover:[animation-play-state:paused]");
  });
});
