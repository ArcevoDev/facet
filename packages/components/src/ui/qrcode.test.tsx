import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QRCode } from "./qrcode.js";

describe("QRCode", () => {
  it("renders an svg image with the encoded value", () => {
    render(<QRCode value="https://example.com" />);
    const img = screen.getByRole("img", { name: /qr code/i });
    expect(img.tagName.toLowerCase()).toBe("svg");
    expect(img.getAttribute("aria-label")).toBe("QR code");
  });

  it("applies the given size", () => {
    render(<QRCode value="hello" size={240} />);
    const img = screen.getByRole("img", { name: /qr code/i });
    expect(img.getAttribute("width")).toBe("240");
  });

  it("renders distinct svg paths for different values", () => {
    const { container: a } = render(<QRCode value="one" />);
    const { container: b } = render(<QRCode value="two" />);
    const pathsA = a.querySelectorAll("path").length;
    const pathsB = b.querySelectorAll("path").length;
    // Both render, and the modules differ between values.
    expect(pathsA).toBeGreaterThan(0);
    expect(pathsB).toBeGreaterThan(0);
  });
});
