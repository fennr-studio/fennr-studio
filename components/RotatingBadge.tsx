"use client";

import { useId } from "react";

type Props = {
  text?: string;
  size?: number;
  bg?: string;
  textColor?: string;
  centerLabel?: string;
  centerColor?: string;
  speed?: "slow" | "fast";
  className?: string;
};

export default function RotatingBadge({
  text = "SCROLL TO SEE MORE * SCROLL TO SEE MORE * ",
  size = 120,
  bg = "transparent",
  textColor = "currentColor",
  centerLabel = "*",
  centerColor = "currentColor",
  speed = "slow",
  className = "",
}: Props) {
  const r = size / 2 - 12;
  const id = useId().replace(/[:]/g, "");
  const animClass = speed === "fast" ? "animate-spin-slow" : "animate-spin-slower";

  return (
    <div
      className={`relative inline-grid place-items-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {bg && bg !== "transparent" && (
        <span className="absolute inset-0 rounded-full" style={{ background: bg }} />
      )}

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`absolute inset-0 ${animClass}`}
      >
        <defs>
          <path
            id={`circle-${id}`}
            d={`M ${size / 2}, ${size / 2} m -${r}, 0 a ${r},${r} 0 1,1 ${
              r * 2
            },0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          fill={textColor}
          style={{
            fontFamily: "var(--font-display), Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#circle-${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>

      <span className="relative numeral text-2xl" style={{ color: centerColor }}>
        {centerLabel}
      </span>
    </div>
  );
}
