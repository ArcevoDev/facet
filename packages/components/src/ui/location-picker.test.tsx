import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LocationPicker, DEFAULT_REGIONS, DEFAULT_COUNTRIES } from "./location-picker.js";

describe("LocationPicker", () => {
  it("renders the country select first", () => {
    render(<LocationPicker />);
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("shows regions after a country is picked", async () => {
    const onValueChange = vi.fn();
    render(<LocationPicker value={{ country: "NG" }} onValueChange={onValueChange} />);
    expect(screen.getByLabelText("Region")).toBeInTheDocument();
    // Radix Select portals its listbox to document.body.
    const region = screen.getByLabelText("Region");
    region.focus();
    fireEvent.keyDown(region, { key: "ArrowDown" });
    expect(await screen.findByText("Lagos")).toBeInTheDocument();
  });

  it("resets region and locality when the country changes", async () => {
    const onValueChange = vi.fn();
    render(
      <LocationPicker
        value={{ country: "NG", region: "lagos", locality: "ikeja" }}
        onValueChange={onValueChange}
        showLocality
      />,
    );
    const country = screen.getByLabelText("Country");
    country.focus();
    fireEvent.keyDown(country, { key: "ArrowDown" });
    const ghana = await screen.findByText("Ghana");
    fireEvent.click(ghana);
    expect(onValueChange).toHaveBeenLastCalledWith({
      country: "GH",
      region: undefined,
      locality: undefined,
    });
  });

  it("shows locality select only when showLocality is set", async () => {
    render(<LocationPicker value={{ country: "NG", region: "lagos" }} />);
    expect(screen.queryByLabelText("Locality")).not.toBeInTheDocument();

    render(
      <LocationPicker value={{ country: "NG", region: "lagos" }} showLocality />,
    );
    expect(screen.getByLabelText("Locality")).toBeInTheDocument();
  });

  it("lists localities for a selected region", async () => {
    render(<LocationPicker value={{ country: "NG", region: "lagos" }} showLocality />);
    const locality = screen.getByLabelText("Locality");
    locality.focus();
    fireEvent.keyDown(locality, { key: "ArrowDown" });
    expect(await screen.findByText("Ikeja")).toBeInTheDocument();
  });

  it("uses async loadRegions when provided", async () => {
    const loadRegions = vi.fn(async () => [{ id: "tx", name: "Texas" }]);
    function Harness() {
      const [value, setValue] = React.useState<{ country?: string; region?: string }>({});
      return (
        <LocationPicker value={value} onValueChange={setValue} loadRegions={loadRegions} />
      );
    }
    render(<Harness />);
    // Pick a country; the controlled value updates and loadRegions fires.
    const country = screen.getByLabelText("Country");
    country.focus();
    fireEvent.keyDown(country, { key: "ArrowDown" });
    fireEvent.click(await screen.findByText("United States"));
    expect(loadRegions).toHaveBeenCalledWith("US");
    // The region select becomes available after a country is chosen.
    await waitFor(() => expect(screen.getByLabelText("Region")).toBeInTheDocument());
  });

  it("exports the bundled datasets", () => {
    expect(DEFAULT_COUNTRIES.some((c) => c.code === "NG")).toBe(true);
    expect(DEFAULT_REGIONS.NG?.length).toBeGreaterThan(0);
  });
});
