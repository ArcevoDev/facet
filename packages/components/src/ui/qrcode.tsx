/**
 * QRCode: render a value as a scannable QR code.
 */
import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "../utils.js";

export interface QRCodeProps {
  /** The value to encode. */
  value: string;
  /** Render size in pixels. Default: 160 */
  size?: number;
  /** Foreground color (any CSS color). Default: currentColor */
  fgColor?: string;
  /** Background color. Default: transparent */
  bgColor?: string;
  /** Include a quiet zone around the code. Default: true */
  includeMargin?: boolean;
  /** Error correction level. Default: "M" */
  level?: "L" | "M" | "Q" | "H";
  className?: string;
  /** Accessible label for the generated image. */
  label?: string;
}

/**
 * A lightweight QR code renderer built on qrcode.react. Encodes any string
 * into a crisp SVG that inherits the current text color by default.
 */
const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      value,
      size = 160,
      fgColor = "currentColor",
      bgColor = "transparent",
      includeMargin = true,
      level = "M",
      className,
      label = "QR code",
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("inline-block rounded-md border border-border bg-background p-2", className)}
    >
      <QRCodeSVG
        value={value}
        size={size}
        fgColor={fgColor}
        bgColor={bgColor}
        includeMargin={includeMargin}
        level={level}
        aria-label={label}
        role="img"
        style={{ display: "block", width: size, height: size }}
      />
    </div>
  ),
);
QRCode.displayName = "QRCode";

export { QRCode };
