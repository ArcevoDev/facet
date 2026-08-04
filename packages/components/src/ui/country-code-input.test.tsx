import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CountryCodeInput, getCountryCode, COMMON_COUNTRY_CODES } from "./country-code-input.js";

describe("getCountryCode", () => {
  it("resolves dial codes from the default list", () => {
    expect(getCountryCode("NG")).toBe("+234");
    expect(getCountryCode("US")).toBe("+1");
  });

  it("falls back to +1 for unknown countries", () => {
    expect(getCountryCode("ZZ")).toBe("+1");
  });
});

describe("CountryCodeInput", () => {
  it("renders the default country and number", () => {
    render(<CountryCodeInput value={{ country: "NG", number: "8012345678" }} />);
    expect(screen.getByPlaceholderText("Phone number")).toHaveValue("8012345678");
  });

  it("renders a label when provided", () => {
    render(<CountryCodeInput label="Mobile" value={{ country: "US", number: "" }} />);
    expect(screen.getByText("Mobile")).toBeInTheDocument();
  });

  it("updates the number and keeps the country", () => {
    const onValueChange = vi.fn();
    render(<CountryCodeInput value={{ country: "US", number: "" }} onValueChange={onValueChange} />);
    fireEvent.change(screen.getByPlaceholderText("Phone number"), {
      target: { value: "5551234" },
    });
    expect(onValueChange).toHaveBeenLastCalledWith({ country: "US", number: "5551234" });
  });

  it("changes the country code via the select", async () => {
    const onValueChange = vi.fn();
    render(<CountryCodeInput value={{ country: "US", number: "123" }} onValueChange={onValueChange} />);
    const trigger = screen.getByLabelText("Country code");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const ng = await screen.findByText("Nigeria (+234)");
    fireEvent.click(ng);
    expect(onValueChange).toHaveBeenLastCalledWith({ country: "NG", number: "123" });
  });

  it("exports the common country list", () => {
    expect(COMMON_COUNTRY_CODES.length).toBeGreaterThan(5);
    expect(COMMON_COUNTRY_CODES.some((c) => c.country === "NG")).toBe(true);
  });
});
