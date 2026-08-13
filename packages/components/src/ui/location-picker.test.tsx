import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  LocationPicker,
  CountryInput,
  StateInput,
  LGAInput,
  DEFAULT_REGIONS,
  DEFAULT_COUNTRIES,
  DEFAULT_LOCALITIES,
} from "./location-picker.js";

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

  it("covers every African country", () => {
    for (const c of [
      "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD", "KM",
      "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET", "GA", "GM",
      "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR",
      "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL",
      "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "ZM", "ZW",
    ]) {
      expect(DEFAULT_COUNTRIES.some((x) => x.code === c), `missing ${c}`).toBe(true);
    }
  });

  it("lists all 36 Nigerian states + FCT", () => {
    expect(DEFAULT_REGIONS.NG).toHaveLength(37);
    for (const s of ["lagos", "kano", "rivers", "oyo", "anambra", "enugu", "delta", "fct"]) {
      expect(DEFAULT_REGIONS.NG!.some((r) => r.id === s), `missing ${s}`).toBe(true);
    }
  });

  it("has full LGA depth for all Nigerian states", () => {
    // The full official dataset: 36 states + FCT, ~774 LGAs.
    expect(DEFAULT_LOCALITIES.NG!.lagos!.length).toBeGreaterThan(10);
    expect(DEFAULT_LOCALITIES.NG!.fct!.some((l) => l.id === "fct-bwari")).toBe(true);
    // Spot-check a few states have LGA lists now.
    expect(DEFAULT_LOCALITIES.NG!.kaduna!.length).toBeGreaterThan(5);
    expect(DEFAULT_LOCALITIES.NG!.kano!.length).toBeGreaterThan(10);
    // Every state in DEFAULT_REGIONS.NG has a localities entry.
    for (const region of DEFAULT_REGIONS.NG!) {
      expect(
        DEFAULT_LOCALITIES.NG![region.id]?.length,
        `missing LGAs for ${region.id}`,
      ).toBeGreaterThan(0);
    }
    // Roughly the official 774 (we ship 775 with the FCT municipality).
    const total = Object.values(DEFAULT_LOCALITIES.NG!).reduce(
      (sum, list) => sum + list.length,
      0,
    );
    expect(total).toBeGreaterThanOrEqual(774);
  });
});

describe("CountryInput / StateInput / LGAInput", () => {
  it("CountryInput lists countries and reports the selection", async () => {
    const onValueChange = vi.fn();
    render(<CountryInput value="NG" onValueChange={onValueChange} />);
    const trigger = screen.getByLabelText("Country");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.click(await screen.findByText("Ghana"));
    expect(onValueChange).toHaveBeenLastCalledWith("GH");
  });

  it("StateInput shows a country's states once a country is given", async () => {
    render(<StateInput country="GH" />);
    const trigger = screen.getByLabelText("Region");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(await screen.findByText("Greater Accra")).toBeInTheDocument();
  });

  it("StateInput renders a resolved country tag on the trigger", () => {
    render(<StateInput country="NG" />);
    // The trigger shows the country code badge resolved from DEFAULT_COUNTRIES.
    expect(screen.getByLabelText("Region")).toHaveTextContent("NG");
    expect(screen.getByLabelText("Region")).toHaveTextContent("Nigeria");
  });

  it("LGAInput renders a resolved country tag", () => {
    render(<LGAInput country="NG" region="lagos" />);
    expect(screen.getByLabelText("Locality")).toHaveTextContent("NG");
    expect(screen.getByLabelText("Locality")).toHaveTextContent("Nigeria");
  });

  it("StateInput is inert without a country", () => {
    render(<StateInput />);
    expect(screen.getByLabelText("Region")).toBeDisabled();
  });

  it("LGAInput lists localities for a country + state", async () => {
    render(<LGAInput country="NG" region="lagos" />);
    const trigger = screen.getByLabelText("Locality");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(await screen.findByText("Ikeja")).toBeInTheDocument();
  });

  it("LGAInput is inert without a state", () => {
    render(<LGAInput country="NG" />);
    expect(screen.getByLabelText("Locality")).toBeDisabled();
  });
});
